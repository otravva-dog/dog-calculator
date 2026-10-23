<?php
declare(strict_types=1);
// Included only by index.php after session, CSRF and database setup.
if(!isset($db,$route,$method)) {http_response_code(404);exit;}
function normalizedEmail(string $value): string {
 $email=strtolower(trim($value));
 if(strlen($email)>254||!filter_var($email,FILTER_VALIDATE_EMAIL)||preg_match('/[^\x21-\x7e]/',$email))fail('Укажите корректный email.');
 return $email;
}
function strongPassword(string $password): bool {return strlen($password)<=72&&(bool)preg_match('/^.{12,}$/usD',$password);}
function mailSettings(): array {
 static $config=null;if($config===null){$config=[];$file=$GLOBALS['base'].'/mail-config.php';if(is_file($file)){try{$config=require $file;}catch(Throwable){fail('Проверьте настройки отправки писем у владельца сайта.',503);}if(!is_array($config))fail('Проверьте настройки отправки писем у владельца сайта.',503);}}$url=rtrim((string)(getenv('NUTRITION_APP_URL')?:($config['app_url']??'')),'/');$from=(string)(getenv('NUTRITION_MAIL_FROM')?:($config['from']??''));$parts=parse_url($url);
 $localUrl=is_array($parts)&&in_array($parts['host']??'',['localhost','127.0.0.1'],true);
 if(!$parts||isset($parts['user'])||isset($parts['pass'])||isset($parts['query'])||isset($parts['fragment'])||!isset($parts['host'])||(!in_array($parts['scheme']??'',['https'],true)&&!(($parts['scheme']??'')==='http'&&$localUrl))||!filter_var($from,FILTER_VALIDATE_EMAIL)||preg_match('/[\r\n]/',$from)||!function_exists('mail'))fail('Отправка писем пока не настроена. Обратитесь к владельцу сайта.',503);
 return [$url,$from];
}
function sendAccountLink(string $email,string $purpose,string $token): bool {
 [$url,$from]=mailSettings();$reset=$purpose==='reset';$subject=$reset?'Восстановление пароля':'Подтверждение email';
 $link=$url.'/#'.($reset?'reset':'verify').'='.$token;
 $text="Конструктор питания\n\n".($reset?'Чтобы задать новый пароль, откройте ссылку:':'Подтвердите почту для восстановления доступа:')."\n".$link."\n\nСсылка действует ".($reset?'30 минут':'24 часа')." и используется один раз.\nЕсли вы не запрашивали это письмо, ничего делать не нужно.\n";
 $headers=['From'=>$from,'MIME-Version'=>'1.0','Content-Type'=>'text/plain; charset=UTF-8','Content-Transfer-Encoding'=>'8bit'];
 $accepted=@mail($email,'=?UTF-8?B?'.base64_encode($subject.' · Конструктор питания').'?=',$text,$headers);
 if(!$accepted)error_log('Nutrition mail: delivery transport rejected account email');return $accepted;
}
function issueEmailToken(PDO $db,int $userId,string $email,string $purpose,int $version): string {
 $db->prepare('DELETE FROM account_tokens WHERE expires<? OR (user_id=? AND purpose=?)')->execute([time(),$userId,$purpose]);
 $token=bin2hex(random_bytes(32));$db->prepare('INSERT INTO account_tokens(token_hash,user_id,email,purpose,expires,session_version) VALUES(?,?,?,?,?,?)')->execute([hash('sha256',$token),$userId,$email,$purpose,time()+($purpose==='reset'?1800:86400),$version]);return $token;
}
function findEmailToken(PDO $db,string $token,string $purpose): array {
 if(!preg_match('/^[a-f0-9]{64}$/D',$token))fail('Ссылка недействительна или устарела. Запросите новую.');
 $q=$db->prepare('SELECT t.*,u.session_version AS current_version FROM account_tokens t JOIN users u ON u.id=t.user_id WHERE token_hash=? AND purpose=?');$q->execute([hash('sha256',$token),$purpose]);$row=$q->fetch();
 if(!$row||(int)$row['expires']<=time()||(int)$row['session_version']!==(int)$row['current_version'])fail('Ссылка недействительна или устарела. Запросите новую.');return $row;
}
$authIp=$_SERVER['REMOTE_ADDR']??'';
if($method==='POST'&&$route==='auth/forgot'){
 mailSettings();$input=body();$email=normalizedEmail((string)($input['email']??''));
 rate($db,'forgot-ip',$authIp,10,3600);rate($db,'forgot-email',$email,3,3600);
 $q=$db->prepare('SELECT id,email,session_version FROM users WHERE email=?');$q->execute([$email]);$account=$q->fetch();
 if($account){$token=issueEmailToken($db,(int)$account['id'],$email,'reset',(int)$account['session_version']);sendAccountLink($email,'reset',$token);}
 respond(['ok'=>true,'message'=>'Если для этой почты есть аккаунт, мы отправили ссылку. Проверьте также папку «Спам».']);
}
if($method==='POST'&&$route==='auth/reset'){
 $input=body();rate($db,'reset-ip',$authIp,20,900);$password=(string)($input['password']??'');if(!strongPassword($password))fail('Пароль: не менее 12 символов и не более 72 байт.');
 $hash=password_hash($password,PASSWORD_DEFAULT);$db->beginTransaction();
 try{$token=findEmailToken($db,(string)($input['token']??''),'reset');$q=$db->prepare('UPDATE users SET password_hash=?,recovery_hash=?,email_verified_at=?,session_version=session_version+1 WHERE id=? AND session_version=?');$q->execute([$hash,hash('sha256',random_bytes(32)),gmdate('c'),$token['user_id'],$token['session_version']]);if(!$q->rowCount())throw new RuntimeException('Token version changed');$db->prepare('DELETE FROM account_tokens WHERE user_id=?')->execute([$token['user_id']]);$db->commit();}catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 // Do not automatically sign in from a reset link. Revoke every previous session.
 unset($_SESSION['user_id'],$_SESSION['version']);session_regenerate_id(true);$_SESSION['csrf']=bin2hex(random_bytes(24));
 respond(['ok'=>true,'csrf'=>$_SESSION['csrf'],'message'=>'Пароль изменён. Войдите с новым паролем.']);
}
if($method==='POST'&&$route==='auth/verify-email'){
 $input=body();rate($db,'verify-ip',$authIp,20,900);$db->beginTransaction();
 try{$token=findEmailToken($db,(string)($input['token']??''),'verify');
 $q=$db->prepare('SELECT id FROM users WHERE id<>? AND (email=? OR username=?)');$q->execute([$token['user_id'],$token['email'],$token['email']]);if($q->fetch())fail('Эта почта уже привязана к другому аккаунту.',409);
 $db->prepare('UPDATE users SET email=?,email_verified_at=? WHERE id=?')->execute([$token['email'],gmdate('c'),$token['user_id']]);$db->prepare('DELETE FROM account_tokens WHERE user_id=?')->execute([$token['user_id']]);$db->commit();}catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 respond(['ok'=>true,'message'=>'Email подтверждён. Теперь пароль можно восстановить письмом.']);
}
if($method==='POST'&&$route==='auth/email'){
 if(!$user)fail('Нужен вход.',401);mailSettings();$input=body();$email=normalizedEmail((string)($input['email']??''));rate($db,'bind-ip',$authIp,10,3600);rate($db,'bind-user',(string)$user['id'],5,3600);
 $q=$db->prepare('SELECT password_hash FROM users WHERE id=?');$q->execute([$user['id']]);if(!password_verify((string)($input['password']??''),(string)$q->fetchColumn()))fail('Неверный текущий пароль.',401);
 $q=$db->prepare('SELECT id FROM users WHERE id<>? AND (email=? OR username=?)');$q->execute([$user['id'],$email,$email]);if($q->fetch())fail('Эта почта уже привязана к другому аккаунту.',409);
 $token=issueEmailToken($db,(int)$user['id'],$email,'verify',(int)$user['session_version']);if(!sendAccountLink($email,'verify',$token))fail('Не удалось отправить письмо. Попробуйте позже.',503);
 respond(['ok'=>true,'message'=>'Письмо отправлено. Откройте ссылку, чтобы подтвердить почту.']);
}
if($method==='POST'&&in_array($route,['auth/login','auth/register'],true)){
 $input=body();$name=strtolower(trim((string)($input['username']??'')));$password=(string)($input['password']??'');
 rate($db,'auth-ip',$authIp,30,900);rate($db,'auth-user',$name,15,900);
 if(strlen($name)>254||(!filter_var($name,FILTER_VALIDATE_EMAIL)&&!preg_match('/^[a-z0-9][a-z0-9_.@-]{2,63}$/D',$name))||strlen($password)<1||strlen($password)>72)fail('Проверьте email или логин и пароль.');
 $q=$db->prepare('SELECT * FROM users WHERE username=? OR (email=? AND email_verified_at IS NOT NULL)');$q->execute([$name,$name]);$existing=$q->fetch();
 if($route==='auth/register'){
  mailSettings();$name=normalizedEmail($name);rate($db,'register',$authIp,5,3600);if(!strongPassword($password))fail('Пароль: не менее 12 символов и не более 72 байт.');
  $q=$db->prepare('SELECT id FROM users WHERE username=? OR email=?');$q->execute([$name,$name]);if($q->fetch())fail('Не удалось создать аккаунт с этой почтой. Попробуйте вход или восстановление.',409);
  try{$q=$db->prepare('INSERT INTO users(username,password_hash,recovery_hash,email) VALUES(?,?,?,?)');$q->execute([$name,password_hash($password,PASSWORD_DEFAULT),hash('sha256',random_bytes(32)),$name]);}catch(PDOException $e){if($e->getCode()==='23000')fail('Не удалось создать аккаунт с этой почтой.',409);throw $e;}
  $user=['id'=>(int)$db->lastInsertId(),'session_version'=>1];$token=issueEmailToken($db,$user['id'],$name,'verify',1);$sent=sendAccountLink($name,'verify',$token);loginSession($user);
  respond(['authenticated'=>true,'csrf'=>$_SESSION['csrf'],'email'=>$name,'verificationSent'=>$sent]);
 }
 $hash=$existing['password_hash']??'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi';
 if(!password_verify($password,$hash)||!$existing)fail('Неверный email, логин или пароль.',401);
 loginSession($existing);respond(['authenticated'=>true,'csrf'=>$_SESSION['csrf'],'email'=>$existing['email']?:$existing['username']]);
}
