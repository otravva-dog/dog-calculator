<?php
declare(strict_types=1);
if(!defined('NUTRITION_ENTRY')){http_response_code(404);exit;}
require_once __DIR__.'/autoload.php';require_once __DIR__.'/Support/Http.php';require_once __DIR__.'/Modules/Recipes/validation.php';require_once __DIR__.'/Modules/Profiles/validation.php';
ini_set('display_errors','0');header('Content-Type: application/json; charset=utf-8');header('Cache-Control: no-store');header('X-Content-Type-Options: nosniff');header('Referrer-Policy: no-referrer');
try {
 $host=$_SERVER['HTTP_HOST']??'';if(!preg_match('/^[a-zA-Z0-9.:-]+$/D',$host))fail('Invalid host',400);
 $local=(bool)preg_match('/^(localhost|127\.0\.0\.1)(:\d+)?$/D',$host);$https=!empty($_SERVER['HTTPS'])&&$_SERVER['HTTPS']!=='off';if(!$https&&!$local)fail('Требуется HTTPS.',400);
 // The default location remains identical to v31; existing sessions/configuration survive an upgrade.
 $base=getenv('NUTRITION_DATA_DIR')?:dirname(__DIR__,2).'/nutrition-private-'.substr(hash('sha256',dirname(__DIR__)),0,12);
 if(!is_dir($base)&&!mkdir($base,0700,true))throw new RuntimeException('Private directory unavailable');
 $private=realpath($base);$public=realpath($_SERVER['DOCUMENT_ROOT']??dirname(__DIR__));if(!$private||($public&&($private===$public||str_starts_with($private,$public.DIRECTORY_SEPARATOR))))throw new RuntimeException('Data directory must be outside document root');
 if(is_file($base.'/maintenance.lock')){header('Retry-After: 60');fail('Идёт обновление сайта. Повторите через минуту.',503);}
 $GLOBALS['base']=$base;if(!is_dir($base.'/sessions'))mkdir($base.'/sessions',0700,true);session_save_path($base.'/sessions');
 ini_set('session.use_strict_mode','1');ini_set('session.use_only_cookies','1');ini_set('session.gc_maxlifetime','2592000');session_name('nutrition_session');session_set_cookie_params(['lifetime'=>2592000,'path'=>'/','secure'=>!$local,'httponly'=>true,'samesite'=>'Lax']);session_start();
 if(isset($_SESSION['last_seen'])&&$_SESSION['last_seen']<time()-604800){$_SESSION=[];session_regenerate_id(true);}$_SESSION['last_seen']=time();$_SESSION['csrf']??=bin2hex(random_bytes(24));
 $db=Nutrition\Support\Database::connect($base);$GLOBALS['nutritionDb']=$db;$mysql=Nutrition\Support\Database::mysql($db);$user=null;
 if(isset($_SESSION['user_id'])){$q=$db->prepare('SELECT id,username,email,email_verified_at,session_version FROM users WHERE id=?');$q->execute([$_SESSION['user_id']]);$user=$q->fetch()?:null;if(!$user||(int)$user['session_version']!==($_SESSION['version']??0)){unset($_SESSION['user_id'],$_SESSION['version']);$user=null;}}
 $method=$_SERVER['REQUEST_METHOD']??'GET';$route=trim((string)($_GET['path']??''),'/');
 if($method==='GET'&&$route==='session')respond(['authenticated'=>(bool)$user,'userId'=>$user?(int)$user['id']:null,'username'=>$user['username']??null,'email'=>$user['email']??null,'emailVerified'=>(bool)($user['email_verified_at']??null),'authMode'=>'password','csrf'=>$_SESSION['csrf'],'features'=>['multipleDogs'=>$mysql]]);
 if(!in_array($method,['GET','POST','PUT','DELETE'],true))fail('Method not allowed',405);
 if($method!=='GET'){$origin=$_SERVER['HTTP_ORIGIN']??'';$expected=($https?'https':'http').'://'.$host;if($origin!==$expected)fail('Origin mismatch',403);if(!hash_equals($_SESSION['csrf'],$_SERVER['HTTP_X_CSRF_TOKEN']??''))fail('Обновите страницу и повторите.',403);if(($_SERVER['HTTP_SEC_FETCH_SITE']??'')==='cross-site')fail('Cross-site request denied',403);}
 require __DIR__.'/Modules/Auth/routes.php';
 if($route==='auth/logout'&&$method==='POST'){Nutrition\Modules\Audit\Log::record($db,$user?(int)$user['id']:null,'auth.logout');$_SESSION=[];session_regenerate_id(true);respond(['ok'=>true]);}
 require __DIR__.'/Modules/Catalog/routes.php';
 if(!$user)fail('Нужен вход.',401);$owner=(int)$user['id'];$dogId=null;
 require __DIR__.'/Modules/Dogs/routes.php';
 if($mysql){$dogs=new Nutrition\Modules\Dogs\Repository($db,$owner);$requested=$_SERVER['HTTP_X_NUTRITION_DOG']??'';if($requested!==''&&(!preg_match('/^[A-Za-z0-9_-]{1,64}$/D',$requested)||!$dogs->owned($requested)))fail('Собака не найдена.',404);$dogId=$requested!==''?$requested:$dogs->first();}
 require __DIR__.'/Modules/Profiles/routes.php';require __DIR__.'/Modules/Recipes/routes.php';fail('Not found',404);
}catch(Throwable $e){error_log('Nutrition API: '.$e->getMessage());fail('Серверное хранилище недоступно. Проверьте настройки подключения, PHP и установленную схему базы.',503);}
