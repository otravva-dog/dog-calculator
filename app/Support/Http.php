<?php
declare(strict_types=1);
function respond(array $value,int $status=200): never {http_response_code($status);echo json_encode($value,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);exit;}
function fail(string $message,int $status=400): never {respond(['error'=>$message],$status);}
function body(): array {
 if(!str_starts_with($_SERVER['CONTENT_TYPE']??'','application/json'))fail('JSON required',415);
 if((int)($_SERVER['CONTENT_LENGTH']??0)>150000)fail('Too large',413);
 $text=file_get_contents('php://input',false,null,0,150001);if(strlen($text)>150000)fail('Too large',413);
 try{$data=json_decode($text,true,40,JSON_THROW_ON_ERROR);}catch(Throwable){fail('Invalid JSON');}if(!is_array($data))fail('Invalid JSON');return $data;
}
function rate(PDO $db,string $scope,string $who,int $max,int $seconds): void {
 $now=time();$key=hash('sha256',$who);$db->beginTransaction();
 try{
  $sql=Nutrition\Support\Database::mysql($db)?'INSERT INTO limits(scope,who,attempts,expires) VALUES(?,?,1,?) ON DUPLICATE KEY UPDATE attempts=IF(expires<?,1,attempts+1),expires=IF(expires<?,VALUES(expires),expires)':'INSERT INTO limits(scope,who,attempts,expires) VALUES(?,?,1,?) ON CONFLICT(scope,who) DO UPDATE SET attempts=CASE WHEN expires<? THEN 1 ELSE attempts+1 END,expires=CASE WHEN expires<? THEN excluded.expires ELSE expires END';
  $db->prepare($sql)->execute([$scope,$key,$now+$seconds,$now,$now]);$q=$db->prepare('SELECT attempts FROM limits WHERE scope=? AND who=?');$q->execute([$scope,$key]);$count=(int)$q->fetchColumn();$db->commit();
 }catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 if($count>$max){header('Retry-After: '.$seconds);fail('Слишком много попыток. Попробуйте позже.',429);}
}
function loginSession(array $user): void {
 session_regenerate_id(true);$_SESSION['user_id']=(int)$user['id'];$_SESSION['version']=(int)$user['session_version'];$_SESSION['csrf']=bin2hex(random_bytes(24));
 Nutrition\Modules\Audit\Log::record($GLOBALS['nutritionDb'],(int)$user['id'],'auth.login');
}
