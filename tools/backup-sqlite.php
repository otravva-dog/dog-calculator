<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/Support/Cli.php';
try{
 $o=cliOptions();$base=realpath($o['private']);if(!is_file($base.'/maintenance.lock'))throw new RuntimeException('Create maintenance.lock in the live private directory first');
 $source=$base.'/recipes.sqlite';if(!is_file($source))throw new RuntimeException('Legacy SQLite database not found');
 $folder=$base.'/backups';if(!is_dir($folder)&&!mkdir($folder,0700,true))throw new RuntimeException('Backup directory unavailable');
 $output=$o['output']??($folder.'/recipes-'.gmdate('Ymd-His').'.sqlite');$parent=realpath(dirname($output));if(!$parent||($parent!==$base&&!str_starts_with($parent,$base.DIRECTORY_SEPARATOR))||is_file($output))throw new RuntimeException('Use a new backup path inside the private directory');
 $db=new PDO('sqlite:'.$source,null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION]);$db->exec('PRAGMA busy_timeout=5000');$result=$db->query('PRAGMA wal_checkpoint(TRUNCATE)')->fetch(PDO::FETCH_NUM);if((int)$result[0]!==0)throw new RuntimeException('Database is still busy; retry after active requests finish');
 $locked=false;try{$db->exec('BEGIN IMMEDIATE');$locked=true;if(!copy($source,$output)||hash_file('sha256',$source)!==hash_file('sha256',$output))throw new RuntimeException('Backup copy failed');@chmod($output,0600);$db->exec('COMMIT');$locked=false;}catch(Throwable $e){if($locked)$db->exec('ROLLBACK');if(is_file($output))unlink($output);throw $e;}
 $copy=new PDO('sqlite:'.$output);if($copy->query('PRAGMA integrity_check')->fetchColumn()!=='ok')throw new RuntimeException('Backup integrity check failed');echo json_encode(['backup'=>$output,'sha256'=>hash_file('sha256',$output),'integrity'=>'ok'],JSON_PRETTY_PRINT|JSON_UNESCAPED_SLASHES).PHP_EOL;
}catch(Throwable $e){fwrite(STDERR,'Backup stopped: '.$e->getMessage().PHP_EOL);exit(1);}
