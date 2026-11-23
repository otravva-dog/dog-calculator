<?php
declare(strict_types=1);
if(!isset($db,$owner,$route,$method))exit;
if($route==='preferences'){
 $profiles=new Nutrition\Modules\Profiles\Repository($db,$owner,$dogId);
 if($method==='GET')respond($profiles->get());if($method!=='PUT')fail('Method not allowed',405);
 $input=body();$data=$input['data']??null;$revision=$input['revision']??null;
 if(!is_int($revision)||$revision<0||!is_array($data)||!is_array($data['profile']??null)||!is_array($data['microPlan']??null)||!in_array($data['targetMode']??'', ['manual','profile'],true))fail('Проверьте настройки.');
 $data=validatedPreferences($data);if(strlen(json_encode($data,JSON_THROW_ON_ERROR))>30000)fail('Настройки слишком велики.');
 try{respond(['ok'=>true,'revision'=>$profiles->save($data,$revision)]);}catch(RuntimeException $e){if($e->getMessage()==='conflict')fail('Профиль изменён на другом устройстве.',409);throw $e;}
}
