<?php
declare(strict_types=1);
namespace Nutrition\Support;
use PDO;
final class Schema {
 public static function apply(PDO $db): void {
  if(!Database::mysql($db))throw new \RuntimeException('MySQL required');
  $tables=$db->query('SHOW TABLES')->fetchAll(PDO::FETCH_COLUMN);if(in_array('schema_migrations',$tables,true)){Database::assertSchema($db);return;}
  if($tables)throw new \RuntimeException('Use an empty dedicated database; an incomplete or unrelated schema needs review');
  $sql=file_get_contents(dirname(__DIR__,2).'/database/mysql/001_initial.sql');$sql=preg_replace('/^--.*$/m','',$sql);foreach(explode(';',$sql) as $statement)if(trim($statement)!=='')$db->exec($statement);
 }
}
