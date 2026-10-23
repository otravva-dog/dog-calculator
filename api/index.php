<?php
declare(strict_types=1);
// PHP 8.1+ / PDO_SQLITE. Private data is kept OUTSIDE the web root.
ini_set('display_errors','0');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');
function respond(array $value,int $status=200): never {http_response_code($status);echo json_encode($value,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);exit;}
function fail(string $message,int $status=400): never {respond(['error'=>$message],$status);}
try {
 $host=$_SERVER['HTTP_HOST']??'';
 if(!preg_match('/^[a-zA-Z0-9.:-]+$/D',$host))fail('Invalid host',400);
 $local=(bool)preg_match('/^(localhost|127\.0\.0\.1)(:\d+)?$/D',$host);
 $https=(!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!=='off');
 if(!$https&&!$local)fail('Требуется HTTPS.',400);
 $base=getenv('NUTRITION_DATA_DIR')?:dirname(__DIR__,2).'/nutrition-private-'.substr(hash('sha256',dirname(__DIR__)),0,12);
 if(!is_dir($base)&&!mkdir($base,0700,true))throw new RuntimeException('Private directory unavailable');
 $private=realpath($base);$public=realpath($_SERVER['DOCUMENT_ROOT']??dirname(__DIR__));
 if(!$private||($public&&($private===$public||str_starts_with($private,$public.DIRECTORY_SEPARATOR))))throw new RuntimeException('Data directory must be outside document root');
 if(!is_dir($base.'/sessions'))mkdir($base.'/sessions',0700,true);
 session_save_path($base.'/sessions');
 ini_set('session.use_strict_mode','1');ini_set('session.use_only_cookies','1');ini_set('session.gc_maxlifetime','2592000');
 session_name('nutrition_session');session_set_cookie_params(['lifetime'=>2592000,'path'=>'/','secure'=>!$local,'httponly'=>true,'samesite'=>'Lax']);session_start();
 if(isset($_SESSION['last_seen'])&&$_SESSION['last_seen']<time()-604800){$_SESSION=[];session_regenerate_id(true);}
 $_SESSION['last_seen']=time();$_SESSION['csrf']??=bin2hex(random_bytes(24));
 $db=new PDO('sqlite:'.$base.'/recipes.sqlite',null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);
 $db->exec('PRAGMA busy_timeout=5000');$db->exec('PRAGMA foreign_keys=ON');
 $db->exec('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,recovery_hash TEXT NOT NULL,session_version INTEGER NOT NULL DEFAULT 1)');
 $db->exec('CREATE TABLE IF NOT EXISTS recipes(user_id INTEGER NOT NULL REFERENCES users(id),id TEXT NOT NULL,name TEXT NOT NULL,payload TEXT NOT NULL,revision INTEGER NOT NULL,updated_at TEXT NOT NULL,PRIMARY KEY(user_id,id))');
 $db->exec('CREATE TABLE IF NOT EXISTS limits(scope TEXT NOT NULL,who TEXT NOT NULL,attempts INTEGER NOT NULL,expires INTEGER NOT NULL,PRIMARY KEY(scope,who))');
 @chmod($base.'/recipes.sqlite',0600);
 $user=null;
 if(isset($_SESSION['user_id'])){$q=$db->prepare('SELECT id,username,session_version FROM users WHERE id=?');$q->execute([$_SESSION['user_id']]);$user=$q->fetch()?:null;if(!$user||(int)$user['session_version']!==($_SESSION['version']??0)){unset($_SESSION['user_id'],$_SESSION['version']);$user=null;}}
 $method=$_SERVER['REQUEST_METHOD']??'GET';$route=trim((string)($_GET['path']??''),'/');
 if($method==='GET'&&$route==='session')respond(['authenticated'=>(bool)$user,'email'=>$user['username']??null,'authMode'=>'password','csrf'=>$_SESSION['csrf']]);
 if(!in_array($method,['GET','POST','PUT','DELETE'],true))fail('Method not allowed',405);
 if($method!=='GET'){
  $origin=$_SERVER['HTTP_ORIGIN']??'';$expected=($https?'https':'http').'://'.$host;
  if($origin!==$expected)fail('Origin mismatch',403);
  if(!hash_equals($_SESSION['csrf'],$_SERVER['HTTP_X_CSRF_TOKEN']??''))fail('Обновите страницу и повторите.',403);
  if(($_SERVER['HTTP_SEC_FETCH_SITE']??'')==='cross-site')fail('Cross-site request denied',403);
 }
 function body(): array {
  if(!str_starts_with($_SERVER['CONTENT_TYPE']??'','application/json'))fail('JSON required',415);
  if((int)($_SERVER['CONTENT_LENGTH']??0)>150000)fail('Too large',413);
  $text=file_get_contents('php://input',false,null,0,150001);if(strlen($text)>150000)fail('Too large',413);
  try{$data=json_decode($text,true,40,JSON_THROW_ON_ERROR);}catch(Throwable){fail('Invalid JSON');}
  if(!is_array($data))fail('Invalid JSON');return $data;
 }
 function rate(PDO $db,string $scope,string $who,int $max,int $seconds): void {
  $now=time();$key=hash('sha256',$who);$db->beginTransaction();
  try{$q=$db->prepare('INSERT INTO limits(scope,who,attempts,expires) VALUES(?,?,1,?) ON CONFLICT(scope,who) DO UPDATE SET attempts=CASE WHEN expires<? THEN 1 ELSE attempts+1 END,expires=CASE WHEN expires<? THEN excluded.expires ELSE expires END');$q->execute([$scope,$key,$now+$seconds,$now,$now]);$q=$db->prepare('SELECT attempts FROM limits WHERE scope=? AND who=?');$q->execute([$scope,$key]);$count=(int)$q->fetchColumn();$db->commit();}catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
  if($count>$max){header('Retry-After: '.$seconds);fail('Слишком много попыток. Попробуйте позже.',429);}
 }
 function loginSession(array $user): void {session_regenerate_id(true);$_SESSION['user_id']=(int)$user['id'];$_SESSION['version']=(int)$user['session_version'];$_SESSION['csrf']=bin2hex(random_bytes(24));}
 if($method==='POST'&&in_array($route,['auth/login','auth/register','auth/recover'],true)){
  $input=body();$name=strtolower(trim((string)($input['username']??'')));$password=(string)($input['password']??'');
  rate($db,'auth-ip',$_SERVER['REMOTE_ADDR']??'',30,900);rate($db,'auth-user',$name,15,900);
  if(!preg_match('/^[a-z0-9][a-z0-9_.@-]{2,63}$/D',$name)||strlen($password)<1||strlen($password)>72)fail('Логин: 3–64 латинских символа. Пароль: до 72 байт.');
  $q=$db->prepare('SELECT * FROM users WHERE username=?');$q->execute([$name]);$existing=$q->fetch();
  if($route==='auth/register'){
   rate($db,'register',$_SERVER['REMOTE_ADDR']??'',5,3600);
   if(strlen($password)<12)fail('Пароль должен содержать не менее 12 символов.');
   if($existing)fail('Этот логин недоступен.',409);
   $recovery=bin2hex(random_bytes(20));$hash=password_hash($password,PASSWORD_DEFAULT);
   try{$q=$db->prepare('INSERT INTO users(username,password_hash,recovery_hash) VALUES(?,?,?)');$q->execute([$name,$hash,hash('sha256',$recovery)]);}catch(PDOException $e){if($e->getCode()==='23000')fail('Этот логин недоступен.',409);throw $e;}
   $user=['id'=>(int)$db->lastInsertId(),'session_version'=>1];loginSession($user);respond(['authenticated'=>true,'csrf'=>$_SESSION['csrf'],'recoveryCode'=>$recovery,'email'=>$name]);
  }
  if($route==='auth/recover'){
   $recovery=(string)($input['recoveryCode']??'');
   if(!$existing||strlen($password)<12||!hash_equals($existing['recovery_hash'],hash('sha256',$recovery)))fail('Неверный логин или код восстановления.',401);
   $newCode=bin2hex(random_bytes(20));$q=$db->prepare('UPDATE users SET password_hash=?,recovery_hash=?,session_version=session_version+1 WHERE id=?');$q->execute([password_hash($password,PASSWORD_DEFAULT),hash('sha256',$newCode),$existing['id']]);$existing['session_version']=(int)$existing['session_version']+1;loginSession($existing);respond(['authenticated'=>true,'csrf'=>$_SESSION['csrf'],'recoveryCode'=>$newCode,'email'=>$name]);
  }
  // Execute password verification even for missing users to reduce timing differences.
  $hash=$existing['password_hash']??'$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2uheWG/igi';
  if(!password_verify($password,$hash)||!$existing)fail('Неверный логин или пароль.',401);
  loginSession($existing);respond(['authenticated'=>true,'csrf'=>$_SESSION['csrf'],'email'=>$name]);
 }
 if($route==='auth/logout'&&$method==='POST'){$_SESSION=[];session_regenerate_id(true);respond(['ok'=>true]);}
 if(!$user)fail('Нужен вход.',401);
 $owner=(int)$user['id'];
 if($route==='recipes'&&$method==='GET'){$q=$db->prepare('SELECT id,name,payload,revision,updated_at FROM recipes WHERE user_id=? ORDER BY updated_at DESC LIMIT 500');$q->execute([$owner]);$out=[];foreach($q as $r)$out[]=['id'=>$r['id'],'name'=>$r['name'],'state'=>json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR),'revision'=>(string)$r['revision'],'updatedAt'=>$r['updated_at']];respond(['recipes'=>$out]);}
 if(!preg_match('#^recipes/([A-Za-z0-9_-]{1,100})$#D',$route,$match))fail('Not found',404);
 $id=$match[1];
 if($method==='DELETE'){$revision=$_SERVER['HTTP_IF_MATCH']??'';$q=$db->prepare('DELETE FROM recipes WHERE user_id=? AND id=? AND revision=?');$q->execute([$owner,$id,$revision]);if(!$q->rowCount())fail('Рецепт изменён на другом устройстве.',409);http_response_code(204);exit;}
 if($method!=='PUT')fail('Method not allowed',405);
 $input=body();$state=$input['state']??null;$name=trim((string)($input['name']??''));
 if(($input['id']??'')!==$id||$name===''||strlen($name)>400||!validState($state))fail('Проверьте рецепт.');
 $payload=json_encode($state,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);$updated=gmdate('Y-m-d\TH:i:s\Z');
 if(isset($input['revision'])){$revision=(int)$input['revision'];$q=$db->prepare('UPDATE recipes SET name=?,payload=?,revision=revision+1,updated_at=? WHERE user_id=? AND id=? AND revision=?');$q->execute([$name,$payload,$updated,$owner,$id,$revision]);if(!$q->rowCount())fail('Рецепт изменён на другом устройстве.',409);$revision++;}
 else{$db->beginTransaction();try{$q=$db->prepare('SELECT COUNT(*) FROM recipes WHERE user_id=?');$q->execute([$owner]);if((int)$q->fetchColumn()>=500){$db->rollBack();fail('Не более 500 рецептов.',409);}$q=$db->prepare('INSERT INTO recipes(user_id,id,name,payload,revision,updated_at) VALUES(?,?,?,?,1,?)');$q->execute([$owner,$id,$name,$payload,$updated]);$db->commit();$revision=1;}catch(PDOException $e){if($db->inTransaction())$db->rollBack();if($e->getCode()==='23000')fail('Рецепт уже существует. Синхронизируйте.',409);throw $e;}}
 respond(['id'=>$id,'revision'=>(string)$revision,'updatedAt'=>$updated]);
} catch(Throwable $e){error_log('Nutrition API: '.$e->getMessage());fail('Серверное хранилище недоступно. Проверьте PHP 8.1+, PDO_SQLITE и доступ к закрытой папке данных.',503);}
function validState(mixed $s): bool {
 if(!is_array($s)||!isset($s['rows'],$s['targets'],$s['batch'])||!is_array($s['rows'])||count($s['rows'])>40||!is_int($s['batch'])||$s['batch']<1||$s['batch']>100)return false;
 foreach($s['rows'] as $r){if(!is_array($r)||!is_string($r['key']??null)||!preg_match('/^[a-z0-9_]{1,80}$/D',$r['key'])||!is_numeric($r['g']??null)||!is_finite((float)$r['g'])||$r['g']<0||$r['g']>10000)return false;if(isset($r['data']))foreach(['kcal','p','f','c'] as $k)if(!is_numeric($r['data'][$k]??null)||!is_finite((float)$r['data'][$k])||$r['data'][$k]<0||$r['data'][$k]>1000)return false;}
 foreach(['kcal','p','f','c'] as $k){$range=$s['targets'][$k]??null;if(!is_array($range)||count($range)!==2)return false;foreach($range as $n)if($n!==null&&(!is_numeric($n)||!is_finite((float)$n)||$n<0||$n>10000))return false;if($k!=='c'&&in_array(null,$range,true))return false;if($range[0]!==null&&$range[1]!==null&&$range[0]>$range[1])return false;}
 return true;
}
