<?php
declare(strict_types=1);
function validatedPreferences(array $data): array {
 if(count($data['profile'])>40)fail('Слишком много полей профиля.');
 foreach($data['profile'] as $key=>$value)if(!is_string($key)||!preg_match('/^[A-Za-z][A-Za-z0-9]{0,39}$/D',$key)||!is_string($value)||strlen($value)>400)fail('Некорректное поле профиля.');
 $micro=$data['microPlan'];if(!in_array($micro['dryBasis']??'', ['100','1000'],true)||!is_array($micro['dryValues']??null)||!is_array($micro['supplements']??null)||count($micro['supplements'])>10||!is_array($micro['foodOverrides']??null)||count($micro['foodOverrides'])>100)fail('Проверьте состав рациона.');
 $checkValues=static function(mixed $values): bool {if(!is_array($values)||count($values)>30)return false;foreach($values as $key=>$value)if(!is_string($key)||!preg_match('/^[a-z][a-z0-9]{0,15}$/D',$key)||($value!==null&&(!is_int($value)&&!is_float($value)||!is_finite((float)$value)||$value<0||$value>1e8)))return false;return true;};
 if(!$checkValues($micro['dryValues']))fail('Проверьте данные корма.');
 foreach($micro['supplements'] as $s)if(!is_array($s)||!is_string($s['name']??null)||strlen($s['name'])>400||!is_numeric($s['dose']??null)||!is_finite((float)$s['dose'])||$s['dose']<0||$s['dose']>1000||!in_array($s['unit']??'', ['г','мл','табл.'],true)||!$checkValues($s['values']??null))fail('Проверьте добавку.');

 foreach($micro['supplements'] as $s){
  if(isset($s['schedule'])&&!in_array($s['schedule'],['daily','alternate','course'],true))fail('Проверьте режим добавки.');
  if(isset($s['phase'])&&!in_array($s['phase'],[0,1],true))fail('Проверьте чередование.');
  if(isset($s['catalogId'])&&(!is_string($s['catalogId'])||strlen($s['catalogId'])>80))fail('Проверьте добавку.');
  foreach(['startDate','endDate'] as $field)if(isset($s[$field])&&(!is_string($s[$field])||strlen($s[$field])>10))fail('Проверьте даты курса.');
 }
 if(isset($micro['assessment'])){$a=$micro['assessment'];if(!is_array($a)||!in_array($a['mode']??'', ['first','second','calendar'],true))fail('Проверьте день оценки.');foreach(['anchorDate','date'] as $field)if(!is_string($a[$field]??null)||strlen($a[$field])>10)fail('Проверьте дату оценки.');}
 foreach($micro['foodOverrides'] as $key=>$values)if(!is_string($key)||!preg_match('/^[a-z0-9_]{1,80}$/D',$key)||!$checkValues($values))fail('Проверьте данные продуктов.');
 $data['profile']=(object)$data['profile'];$data['microPlan']['dryValues']=(object)$data['microPlan']['dryValues'];foreach($data['microPlan']['supplements'] as &$supplement)$supplement['values']=(object)$supplement['values'];unset($supplement);foreach($data['microPlan']['foodOverrides'] as &$values)$values=(object)$values;unset($values);$data['microPlan']['foodOverrides']=(object)$data['microPlan']['foodOverrides'];
 return $data;
}
