<?php
declare(strict_types=1);
if(!isset($db,$route,$method))exit;
if($route==='catalog'){
 if($method!=='GET')fail('Method not allowed',405);$kind=$_GET['kind']??null;if($kind!==null&&!in_array($kind,['raw_food','dry_food','supplement'],true))fail('Unknown catalog kind',400);
 respond(['schemaVersion'=>1,'items'=>(new Nutrition\Modules\Catalog\Repository($db))->all($kind)]);
}
