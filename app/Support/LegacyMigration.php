<?php
declare(strict_types=1);
namespace Nutrition\Support;
use PDO;
use RuntimeException;
use Nutrition\Modules\Dogs\Repository as Dogs;
use Nutrition\Modules\Profiles\Repository as Profiles;
use Nutrition\Modules\Recipes\Repository as Recipes;
use Nutrition\Modules\Audit\Log;
final class LegacyMigration {
 private array $tables=[];
 public readonly string $digest;
 public function __construct(string $path){
  if(!is_file($path)||!is_readable($path))throw new RuntimeException('Source SQLite file not found');
  $source=new PDO('sqlite:'.$path,null,null,[PDO::ATTR_ERRMODE=>PDO::ERRMODE_EXCEPTION,PDO::ATTR_DEFAULT_FETCH_MODE=>PDO::FETCH_ASSOC]);$source->exec('PRAGMA query_only=ON');$source->beginTransaction();
  $names=$source->query("SELECT name FROM sqlite_master WHERE type='table'")->fetchAll(PDO::FETCH_COLUMN);if(!in_array('users',$names,true)||!in_array('recipes',$names,true))throw new RuntimeException('Source does not contain the expected legacy tables');
  $unknown=array_diff($names,['users','recipes','preferences','account_tokens','limits','sqlite_sequence']);if($unknown)throw new RuntimeException('Additional source tables need an explicit mapping: '.implode(', ',$unknown));
  foreach(['users','recipes','preferences','account_tokens','limits'] as $table)$this->tables[$table]=in_array($table,$names,true)?$source->query('SELECT * FROM '.$table.' ORDER BY '.(['users'=>'id','recipes'=>'user_id,id','preferences'=>'user_id','account_tokens'=>'token_hash','limits'=>'scope,who'][$table]))->fetchAll():[];
  $source->commit();$this->validate();$this->digest=hash('sha256',json_encode($this->tables,JSON_THROW_ON_ERROR));
 }
 private function validate(): void {
  $owners=[];foreach($this->tables['users'] as $u){if(!is_numeric($u['id'])||(int)$u['id']<1||!is_string($u['password_hash']??null)||!is_string($u['username']??null))throw new RuntimeException('Invalid source account');$owners[(int)$u['id']]=true;}
  foreach(['recipes','preferences','account_tokens'] as $table)foreach($this->tables[$table] as $r)if(!isset($owners[(int)$r['user_id']]))throw new RuntimeException('Orphan source record in '.$table);
  foreach($this->tables['recipes'] as $r){$state=json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR);if(!is_array($state['rows']??null)||!preg_match('/^[A-Za-z0-9_-]{1,100}$/D',$r['id'])||strlen($r['name'])>400||(int)$r['revision']<1)throw new RuntimeException('Unsupported source recipe');foreach($state['rows'] as $row)if(!is_numeric($row['g']??null)||$row['g']<0||$row['g']>10000||!is_string($row['key']??null))throw new RuntimeException('Invalid source ingredient');}
  foreach($this->tables['preferences'] as $r){$p=json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR);if(!is_array($p['profile']??null)||!is_array($p['microPlan']??null)||!in_array($p['targetMode']??'', ['manual','profile'],true))throw new RuntimeException('Unsupported source preferences; update/validate them before migration');}
 }
 public function summary(): array {return ['sourceDigest'=>$this->digest,'counts'=>array_map('count',$this->tables),'sourceReadOnly'=>true];}
 public function apply(PDO $db): array {
  if(!Database::mysql($db))throw new RuntimeException('Target must be MySQL');
  $q=$db->prepare('SELECT summary FROM migration_imports WHERE source_digest=?');$q->execute([$this->digest]);if($q->fetchColumn())return ['alreadyImported'=>true,...$this->summary()];
  foreach(['users','dogs','recipes','limits','account_tokens'] as $t)if((int)$db->query('SELECT COUNT(*) FROM '.$t)->fetchColumn()>0)throw new RuntimeException('Target is not empty; refusing to merge or overwrite accounts');
  $db->beginTransaction();try{
   $q=$db->prepare('INSERT INTO users(id,username,password_hash,recovery_hash,session_version,email,email_verified_at) VALUES(?,?,?,?,?,?,?)');foreach($this->tables['users'] as $u)$q->execute([$u['id'],$u['username'],$u['password_hash'],$u['recovery_hash']??'',(int)($u['session_version']??1),$u['email']??null,$u['email_verified_at']??null]);
   $prefs=[];foreach($this->tables['preferences'] as $r)$prefs[(int)$r['user_id']]=$r;
   foreach($this->tables['users'] as $u){$owner=(int)$u['id'];$r=$prefs[$owner]??null;$p=$r?json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR):null;$name=(string)($p['profile']['dogName']??'');$dog=(new Dogs($db,$owner))->create($name,Dogs::legacyId($owner));if($p!==null)(new Profiles($db,$owner,$dog))->save($p,0,$r['updated_at'],(int)$r['revision']);}
   $q=$db->prepare('INSERT INTO recipes(user_id,dog_id,id,name,payload,revision,updated_at) VALUES(?,?,?,?,?,?,?)');foreach($this->tables['recipes'] as $r){$owner=(int)$r['user_id'];$q->execute([$owner,Dogs::legacyId($owner),$r['id'],$r['name'],$r['payload'],$r['revision'],$r['updated_at']]);Recipes::snapshot($db,$owner,$r['id'],(int)$r['revision'],$r['name'],json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR),$r['updated_at']);}
   foreach(['account_tokens'=>['token_hash','user_id','email','purpose','expires','session_version'],'limits'=>['scope','who','attempts','expires']] as $table=>$fields){$q=$db->prepare('INSERT INTO '.$table.'('.implode(',',$fields).') VALUES('.implode(',',array_fill(0,count($fields),'?')).')');foreach($this->tables[$table] as $r)$q->execute(array_map(static fn($f)=>$r[$f],$fields));}
   $summary=$this->summary();$db->prepare('INSERT INTO migration_imports(source_digest,summary,created_at) VALUES(?,?,?)')->execute([$this->digest,json_encode($summary,JSON_THROW_ON_ERROR),gmdate('c')]);Log::record($db,null,'migration.completed');$this->verify($db);$db->commit();return ['imported'=>true,...$summary];
  }catch(\Throwable $e){if($db->inTransaction())$db->rollBack();throw $e;}
 }
 public function verify(PDO $db): array {
  foreach($this->tables['users'] as $source){$q=$db->prepare('SELECT * FROM users WHERE id=?');$q->execute([$source['id']]);$target=$q->fetch();foreach(['username','password_hash','recovery_hash','email','email_verified_at','session_version'] as $key)if((string)($source[$key]??($key==='session_version'?1:''))!==(string)($target[$key]??''))throw new RuntimeException('Account verification failed');}
  foreach($this->tables['recipes'] as $r){$q=$db->prepare('SELECT payload,name,dog_id,revision FROM recipes WHERE user_id=? AND id=?');$q->execute([$r['user_id'],$r['id']]);$t=$q->fetch();if(!$t||$t['payload']!==$r['payload']||$t['name']!==$r['name']||(int)$t['revision']!==(int)$r['revision']||$t['dog_id']!==Dogs::legacyId((int)$r['user_id']))throw new RuntimeException('Recipe verification failed');}
  foreach($this->tables['preferences'] as $r){$source=json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR);$target=(new Profiles($db,(int)$r['user_id'],Dogs::legacyId((int)$r['user_id'])))->get();$data=json_decode(json_encode($target['data'],JSON_THROW_ON_ERROR),true,40,JSON_THROW_ON_ERROR);if(!array_key_exists('dogName',$source['profile']))unset($data['profile']['dogName']);if(self::canonical($source)!==self::canonical($data)||(int)$target['revision']!==(int)$r['revision'])throw new RuntimeException('Preferences verification failed');}
  return ['verified'=>true,...$this->summary()];
 }
 private static function canonical(mixed $v): string {
  $sort=static function(mixed $value)use(&$sort): mixed {if(is_array($value)){if(!array_is_list($value))ksort($value);foreach($value as &$item)$item=$sort($item);}return $value;};return json_encode($sort($v),JSON_THROW_ON_ERROR);
 }
}
