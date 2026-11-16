<?php
declare(strict_types=1);
if(!isset($db,$route,$method)){http_response_code(404);exit;}
function validNewPassword(string $password): bool {return strlen($password)<=72&&(bool)preg_match('/^.{4,}$/usD',$password);}
if($method==='POST'&&in_array($route,['auth/login','auth/register'],true)){
 $input=body();$name=strtolower(trim((string)($input['username']??'')));$password=(string)($input['password']??'');
 rate($db,'auth-ip',$_SERVER['REMOTE_ADDR']??'',30,900);rate($db,'auth-user',$name,10,900);
 if($name===''||strlen($name)>254||$password===''||strlen($password)>72)fail('Проверьте логин и пароль.');
 $q=$db->prepare('SELECT * FROM users WHERE username=? OR (email=? AND email_verified_at IS NOT NULL)');$q->execute([$name,$name]);$existing=$q->fetch();
 if($route==='auth/register'){
  rate($db,'register',$_SERVER['REMOTE_ADDR']??'',5,3600);
  if(!preg_match('/^[a-z0-9][a-z0-9_.-]{2,63}$/D',$name))fail('Логин: 3–64 символа, латинские буквы, цифры, точка, дефис или подчёркивание.');
  if(!validNewPassword($password))fail('Пароль: от 4 символов, максимум 72 байта.');
  if($existing)fail('Этот логин уже занят.',409);
  try{$q=$db->prepare('INSERT INTO users(username,password_hash,recovery_hash) VALUES(?,?,?)');$q->execute([$name,password_hash($password,PASSWORD_DEFAULT),hash('sha256',random_bytes(32))]);}catch(PDOException $e){if($e->getCode()==='23000')fail('Этот логин уже занят.',409);throw $e;}
  $account=['id'=>(int)$db->lastInsertId(),'session_version'=>1];loginSession($account);respond(['authenticated'=>true,'username'=>$name,'csrf'=>$_SESSION['csrf']]);
 }
 $hash=$existing['password_hash']??'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi';
 if(!password_verify($password,$hash)||!$existing)fail('Неверный логин или пароль.',401);
 loginSession($existing);respond(['authenticated'=>true,'username'=>$existing['username'],'csrf'=>$_SESSION['csrf']]);
}
if($method==='POST'&&$route==='auth/password'){
 if(!$user)fail('Нужен вход.',401);$input=body();rate($db,'password-user',(string)$user['id'],5,900);
 $current=(string)($input['currentPassword']??'');$password=(string)($input['password']??'');
 if(!validNewPassword($password))fail('Пароль: от 4 символов, максимум 72 байта.');
 $q=$db->prepare('SELECT * FROM users WHERE id=?');$q->execute([$user['id']]);$account=$q->fetch();
 if(strlen($current)>72||!password_verify($current,$account['password_hash']))fail('Неверный текущий пароль.',401);
 $db->beginTransaction();try{$q=$db->prepare('UPDATE users SET password_hash=?,session_version=session_version+1 WHERE id=? AND session_version=?');$q->execute([password_hash($password,PASSWORD_DEFAULT),$user['id'],$user['session_version']]);if(!$q->rowCount()){$db->rollBack();fail('Сеанс устарел. Войдите снова.',401);}$db->prepare('DELETE FROM account_tokens WHERE user_id=?')->execute([$user['id']]);$db->commit();}catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 $account['session_version']=(int)$account['session_version']+1;loginSession($account);respond(['ok'=>true,'csrf'=>$_SESSION['csrf'],'message'=>'Пароль изменён.']);
}
