<?php
declare(strict_types=1);
if(!isset($db,$route,$method,$user)||!$user){http_response_code(404);exit;}
if($route==='preferences'){
 $owner=(int)$user['id'];
 if($method==='GET'){$q=$db->prepare('SELECT payload,revision FROM preferences WHERE user_id=?');$q->execute([$owner]);$r=$q->fetch();respond(['data'=>$r?json_decode($r['payload'],false,40,JSON_THROW_ON_ERROR):null,'revision'=>$r?(int)$r['revision']:0]);}
 if($method!=='PUT')fail('Method not allowed',405);
 $input=body();$data=$input['data']??null;$revision=$input['revision']??null;
 if(!is_int($revision)||$revision<0||!is_array($data)||!is_array($data['profile']??null)||!is_array($data['microPlan']??null)||!in_array($data['targetMode']??'', ['manual','profile'],true))fail('Проверьте настройки.');
 if(count($data['profile'])>40)fail('Слишком много полей профиля.');
 foreach($data['profile'] as $key=>$value)if(!is_string($key)||!preg_match('/^[A-Za-z][A-Za-z0-9]{0,39}$/D',$key)||!is_string($value)||strlen($value)>400)fail('Некорректное поле профиля.');
 $micro=$data['microPlan'];if(!in_array($micro['dryBasis']??'', ['100','1000'],true)||!is_array($micro['dryValues']??null)||!is_array($micro['supplements']??null)||count($micro['supplements'])>10||!is_array($micro['foodOverrides']??null)||count($micro['foodOverrides'])>100)fail('Проверьте состав рациона.');
 $checkValues=static function(mixed $values): bool {if(!is_array($values)||count($values)>30)return false;foreach($values as $key=>$value)if(!is_string($key)||!preg_match('/^[a-z][a-z0-9]{0,15}$/D',$key)||($value!==null&&(!is_int($value)&&!is_float($value)||!is_finite((float)$value)||$value<0||$value>1e8)))return false;return true;};
 if(!$checkValues($micro['dryValues']))fail('Проверьте данные корма.');
 foreach($micro['supplements'] as $s)if(!is_array($s)||!is_string($s['name']??null)||strlen($s['name'])>400||!is_numeric($s['dose']??null)||!is_finite((float)$s['dose'])||$s['dose']<0||$s['dose']>1000||!in_array($s['unit']??'', ['г','мл','табл.'],true)||!$checkValues($s['values']??null))fail('Проверьте добавку.');
 foreach($micro['foodOverrides'] as $key=>$values)if(!is_string($key)||!preg_match('/^[a-z0-9_]{1,80}$/D',$key)||!$checkValues($values))fail('Проверьте данные продуктов.');
 $data['profile']=(object)$data['profile'];$data['microPlan']['dryValues']=(object)$data['microPlan']['dryValues'];foreach($data['microPlan']['supplements'] as &$supplement)$supplement['values']=(object)$supplement['values'];unset($supplement);foreach($data['microPlan']['foodOverrides'] as &$values)$values=(object)$values;unset($values);$data['microPlan']['foodOverrides']=(object)$data['microPlan']['foodOverrides'];
 $payload=json_encode($data,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);if(strlen($payload)>30000)fail('Настройки слишком велики.');
 if($revision===0){try{$q=$db->prepare('INSERT INTO preferences(user_id,payload,revision,updated_at) VALUES(?,?,1,?)');$q->execute([$owner,$payload,gmdate('c')]);}catch(PDOException $e){if($e->getCode()==='23000')fail('Профиль изменён на другом устройстве.',409);throw $e;}}
 else{$q=$db->prepare('UPDATE preferences SET payload=?,revision=revision+1,updated_at=? WHERE user_id=? AND revision=?');$q->execute([$payload,gmdate('c'),$owner,$revision]);if(!$q->rowCount())fail('Профиль изменён на другом устройстве.',409);}
 respond(['ok'=>true,'revision'=>$revision+1]);
}
