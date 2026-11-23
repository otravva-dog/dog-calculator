<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/Support/Cli.php';
try{$o=cliOptions();$db=cliMySql($o);$store=new Nutrition\Modules\Catalog\Repository($db);if(!isset($o['apply'])){$items=$store::source();echo json_encode(['dryRun'=>true,'products'=>count($items)],JSON_PRETTY_PRINT).PHP_EOL;exit;}echo json_encode($store->import(),JSON_PRETTY_PRINT).PHP_EOL;}catch(Throwable $e){fwrite(STDERR,'Catalog import failed: '.$e->getMessage().PHP_EOL);exit(1);}
