<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/Support/Cli.php';
try{
 $o=cliOptions();if(!isset($o['source']))throw new RuntimeException('Use --source=/absolute/path/to/SQLite-backup');$migration=new Nutrition\Support\LegacyMigration($o['source']);
 if(!isset($o['apply'])&&!isset($o['verify'])){$result=['dryRun'=>true,...$migration->summary()];}
 else{$db=cliMySql($o,false);if(isset($o['apply'])){Nutrition\Support\Schema::apply($db);$result=$migration->apply($db);}else $result=$migration->verify($db);}
 echo json_encode($result,JSON_PRETTY_PRINT|JSON_UNESCAPED_UNICODE).PHP_EOL;
}catch(Throwable $e){fwrite(STDERR,'Migration stopped: '.$e->getMessage().PHP_EOL);exit(1);}
