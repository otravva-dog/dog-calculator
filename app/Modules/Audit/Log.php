<?php
declare(strict_types=1);
namespace Nutrition\Modules\Audit;
use PDO;
use Nutrition\Support\Database;
final class Log {
 public static function record(PDO $db,?int $owner,string $event,?string $object=null): void {
  if(!Database::mysql($db))return;
  $q=$db->prepare('INSERT INTO audit_events(user_id,event_type,object_id,created_at) VALUES(?,?,?,?)');$q->execute([$owner,$event,$object,gmdate('c')]);
 }
}
