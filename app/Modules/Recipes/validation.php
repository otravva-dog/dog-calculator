<?php
declare(strict_types=1);
function validState(mixed $s): bool {
 if(!is_array($s)||!isset($s['rows'],$s['targets'],$s['batch'])||!is_array($s['rows'])||count($s['rows'])>40||!is_int($s['batch'])||$s['batch']<1||$s['batch']>100)return false;
 foreach($s['rows'] as $r){if(!is_array($r)||!is_string($r['key']??null)||!preg_match('/^[a-z0-9_]{1,80}$/D',$r['key'])||!is_numeric($r['g']??null)||!is_finite((float)$r['g'])||$r['g']<0||$r['g']>10000)return false;if(isset($r['data']))foreach(['kcal','p','f','c'] as $k)if(!is_numeric($r['data'][$k]??null)||!is_finite((float)$r['data'][$k])||$r['data'][$k]<0||$r['data'][$k]>1000)return false;}
 foreach(['kcal','p','f','c'] as $k){$range=$s['targets'][$k]??null;if(!is_array($range)||count($range)!==2)return false;foreach($range as $n)if($n!==null&&(!is_numeric($n)||!is_finite((float)$n)||$n<0||$n>10000))return false;if($k!=='c'&&in_array(null,$range,true))return false;if($range[0]!==null&&$range[1]!==null&&$range[0]>$range[1])return false;}
 return true;
}
