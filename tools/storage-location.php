<?php
declare(strict_types=1);
if(PHP_SAPI!=='cli'){http_response_code(404);exit;}
$root=dirname(__DIR__);$base=getenv('NUTRITION_DATA_DIR')?:dirname($root).'/nutrition-private-'.substr(hash('sha256',$root),0,12);
echo json_encode(['privateDirectory'=>$base,'legacyDatabaseExists'=>is_file($base.'/recipes.sqlite'),'mysqlConfigExists'=>is_file($base.'/database-config.php')],JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES).PHP_EOL;
