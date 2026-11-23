<?php
declare(strict_types=1);
if(!isset($db,$route,$method)){http_response_code(404);exit;}
require __DIR__.'/email-auth.php';
if($method==='POST'&&$route==='auth/password'){
 if(!$user)fail('Нужен вход.',401);$input=body();rate($db,'password-user',(string)$user['id'],5,900);
 $current=(string)($input['currentPassword']??'');$password=(string)($input['password']??'');
 if(!strongPassword($password))fail('Пароль: не менее 15 символов, максимум 72 байта.');
 $q=$db->prepare('SELECT * FROM users WHERE id=?');$q->execute([$user['id']]);$account=$q->fetch();
 if(strlen($current)>72||!password_verify($current,$account['password_hash']))fail('Неверный текущий пароль.',401);
 $db->beginTransaction();try{$q=$db->prepare('UPDATE users SET password_hash=?,session_version=session_version+1 WHERE id=? AND session_version=?');$q->execute([password_hash($password,PASSWORD_DEFAULT),$user['id'],$user['session_version']]);if(!$q->rowCount()){$db->rollBack();fail('Сеанс устарел. Войдите снова.',401);}$db->prepare('DELETE FROM account_tokens WHERE user_id=?')->execute([$user['id']]);Nutrition\Modules\Audit\Log::record($db,(int)$user['id'],'auth.password_changed');$db->commit();}catch(Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 $account['session_version']=(int)$account['session_version']+1;loginSession($account);respond(['ok'=>true,'csrf'=>$_SESSION['csrf'],'message'=>'Пароль изменён.']);
}
