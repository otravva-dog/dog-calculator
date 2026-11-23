<?php
declare(strict_types=1);
namespace Nutrition\Support;
use PDO;
use RuntimeException;
final class Database {
 public static function configuration(string $private): array {
  $file=$private.'/database-config.php';$config=is_file($file)?require $file:[];
  if(!is_array($config))throw new RuntimeException('Invalid database configuration');
  $driver=getenv('NUTRITION_DB_DRIVER')?:($config['driver']??'sqlite');
  if(!in_array($driver,['sqlite','mysql'],true))throw new RuntimeException('Unsupported database driver');
  $config['driver']=$driver;return $config;
 }
 public static function connect(string $private,?array $config=null,bool $checkSchema=true): PDO {
  $config??=self::configuration($private);
  $options=[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC];
  if($config['driver']==='mysql'){
   foreach(['host','database','username','password'] as $key)if(!isset($config[$key])||!is_string($config[$key]))throw new RuntimeException('Incomplete MySQL configuration');
   if(!preg_match('/^[a-zA-Z0-9_.:-]+$/D',$config['host'])||!preg_match('/^[a-zA-Z0-9_]+$/D',$config['database']))throw new RuntimeException('Invalid MySQL host/database');
   $port=(int)($config['port']??3306);if($port<1||$port>65535)throw new RuntimeException('Invalid MySQL port');
   $options[PDO::ATTR_EMULATE_PREPARES]=false;
   if(isset($config['ssl_ca'])){$options[PDO::MYSQL_ATTR_SSL_CA]=$config['ssl_ca'];$options[PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT]=true;}
   $db=new PDO('mysql:host='.$config['host'].';port='.$port.';dbname='.$config['database'].';charset=utf8mb4',$config['username'],$config['password'],$options);
   $db->exec("SET time_zone = '+00:00'");
   if($checkSchema)self::assertSchema($db);
   return $db;
  }
  $db=new PDO('sqlite:'.$private.'/recipes.sqlite',null,null,$options);$db->exec('PRAGMA busy_timeout=5000');$db->exec('PRAGMA foreign_keys=ON');
  self::legacySchema($db);@chmod($private.'/recipes.sqlite',0600);return $db;
 }
 public static function mysql(PDO $db): bool {return $db->getAttribute(PDO::ATTR_DRIVER_NAME)==='mysql';}
 public static function assertSchema(PDO $db): void {
  $versions=$db->query('SELECT version,application FROM schema_migrations ORDER BY version')->fetchAll();
  if(count($versions)!==1||(int)$versions[0]['version']!==1||$versions[0]['application']!=='gavstronomiya')throw new RuntimeException('Database schema does not match this release');
 }
 private static function legacySchema(PDO $db): void {
  // Existing SQLite installations stay compatible until an explicit MySQL cutover.
  $tables=$db->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll(PDO::FETCH_COLUMN);
  if(!array_diff(['users','recipes','preferences','limits','account_tokens'],$tables)){
   $columns=$db->query('PRAGMA table_info(users)')->fetchAll(PDO::FETCH_COLUMN,1);if(in_array('email_verified_at',$columns,true))return;
  }
  $db->exec('CREATE TABLE IF NOT EXISTS users(id INTEGER PRIMARY KEY,username TEXT NOT NULL UNIQUE,password_hash TEXT NOT NULL,recovery_hash TEXT NOT NULL,session_version INTEGER NOT NULL DEFAULT 1)');
  $columns=$db->query('PRAGMA table_info(users)')->fetchAll(PDO::FETCH_COLUMN,1);foreach(['email'=>'TEXT','email_verified_at'=>'TEXT'] as $column=>$type)if(!in_array($column,$columns,true))$db->exec('ALTER TABLE users ADD COLUMN '.$column.' '.$type);
  $db->exec('CREATE UNIQUE INDEX IF NOT EXISTS users_email_unique ON users(email) WHERE email IS NOT NULL');
  $db->exec('CREATE TABLE IF NOT EXISTS account_tokens(token_hash TEXT PRIMARY KEY,user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,email TEXT NOT NULL,purpose TEXT NOT NULL,expires INTEGER NOT NULL,session_version INTEGER NOT NULL)');
  $db->exec('CREATE INDEX IF NOT EXISTS account_tokens_user ON account_tokens(user_id,purpose)');
  $db->exec('CREATE TABLE IF NOT EXISTS recipes(user_id INTEGER NOT NULL REFERENCES users(id),id TEXT NOT NULL,name TEXT NOT NULL,payload TEXT NOT NULL,revision INTEGER NOT NULL,updated_at TEXT NOT NULL,PRIMARY KEY(user_id,id))');
  $db->exec('CREATE TABLE IF NOT EXISTS preferences(user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,payload TEXT NOT NULL,revision INTEGER NOT NULL,updated_at TEXT NOT NULL)');
  $db->exec('CREATE TABLE IF NOT EXISTS limits(scope TEXT NOT NULL,who TEXT NOT NULL,attempts INTEGER NOT NULL,expires INTEGER NOT NULL,PRIMARY KEY(scope,who))');
 }
}
