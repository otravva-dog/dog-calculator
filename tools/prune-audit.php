<?php
declare(strict_types=1);
require dirname(__DIR__).'/app/Support/Cli.php';
try{$o=cliOptions();$db=cliMySql($o);if(!Nutrition\Support\Database::mysql($db))throw new RuntimeException('MySQL audit required');$before=gmdate('c',time()-90*86400);$q=$db->prepare('SELECT COUNT(*) FROM audit_events WHERE created_at<?');$q->execute([$before]);$count=(int)$q->fetchColumn();if(isset($o['apply'])){$q=$db->prepare('DELETE FROM audit_events WHERE created_at<?');$q->execute([$before]);}echo json_encode(['dryRun'=>!isset($o['apply']),'olderThan'=>$before,'records'=>$count],JSON_PRETTY_PRINT).PHP_EOL;}catch(Throwable $e){fwrite(STDERR,$e->getMessage().PHP_EOL);exit(1);}
