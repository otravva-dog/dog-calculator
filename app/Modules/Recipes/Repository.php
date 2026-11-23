<?php
declare(strict_types=1);
namespace Nutrition\Modules\Recipes;
use PDO;
use RuntimeException;
use Nutrition\Support\Database;
use Nutrition\Modules\Audit\Log;
final class Repository {
 public function __construct(private PDO $db,private int $owner,private ?string $dog){}
 private function scope(): array {return [$this->owner,...($this->dog!==null?[$this->dog]:[])];}
 private function where(): string {return 'user_id=?'.($this->dog!==null?' AND dog_id=?':'');}
 public function all(): array {
  $q=$this->db->prepare('SELECT id,name,payload,revision,updated_at FROM recipes WHERE '.$this->where().' ORDER BY updated_at DESC LIMIT 500');$q->execute($this->scope());$out=[];
  foreach($q as $r)$out[]=['id'=>$r['id'],'name'=>$r['name'],'state'=>json_decode($r['payload'],true,40,JSON_THROW_ON_ERROR),'revision'=>(string)$r['revision'],'updatedAt'=>$r['updated_at']];return $out;
 }
 public function remove(string $id,string $revision): bool {
  $this->db->beginTransaction();try{$q=$this->db->prepare('DELETE FROM recipes WHERE '.$this->where().' AND id=? AND revision=?');$q->execute([...$this->scope(),$id,$revision]);$ok=(bool)$q->rowCount();if($ok)Log::record($this->db,$this->owner,'recipe.deleted',$id);$this->db->commit();return $ok;}catch(\Throwable $e){if($this->db->inTransaction())$this->db->rollBack();throw $e;}
 }
 public function save(string $id,string $name,array $state,?int $expected): array {
  $payload=json_encode($state,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);$now=gmdate('c');$this->db->beginTransaction();
  try{
   if($expected!==null){$q=$this->db->prepare('UPDATE recipes SET name=?,payload=?,revision=revision+1,updated_at=? WHERE '.$this->where().' AND id=? AND revision=?');$q->execute([$name,$payload,$now,...$this->scope(),$id,$expected]);if(!$q->rowCount())throw new RuntimeException('conflict');$revision=$expected+1;}
   else{
    // Serialize the per-user cap with account ownership, including concurrent creates.
    if(Database::mysql($this->db)){$q=$this->db->prepare('SELECT id FROM users WHERE id=? FOR UPDATE');$q->execute([$this->owner]);}
    $q=$this->db->prepare('SELECT COUNT(*) FROM recipes WHERE user_id=?');$q->execute([$this->owner]);if((int)$q->fetchColumn()>=500)throw new RuntimeException('limit');
    $cols=$this->dog!==null?'user_id,dog_id,id,name,payload,revision,updated_at':'user_id,id,name,payload,revision,updated_at';$values=[...$this->scope(),$id,$name,$payload,1,$now];$q=$this->db->prepare('INSERT INTO recipes('.$cols.') VALUES('.implode(',',array_fill(0,count($values),'?')).')');$q->execute($values);$revision=1;
   }
   if(Database::mysql($this->db))self::snapshot($this->db,$this->owner,$id,$revision,$name,$state,$now);
   Log::record($this->db,$this->owner,$expected===null?'recipe.created':'recipe.updated',$id);$this->db->commit();return ['id'=>$id,'revision'=>(string)$revision,'updatedAt'=>$now];
  }catch(\Throwable $e){if($this->db->inTransaction())$this->db->rollBack();if($e instanceof \PDOException&&$e->getCode()==='23000')throw new RuntimeException('conflict');throw $e;}
 }
 public static function snapshot(PDO $db,int $owner,string $id,int $revision,string $name,array $state,string $now): void {
  $db->prepare('INSERT INTO recipe_versions(user_id,recipe_id,revision,name,payload,created_at) VALUES(?,?,?,?,?,?)')->execute([$owner,$id,$revision,$name,json_encode($state,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR),$now]);
  $q=$db->prepare('INSERT INTO recipe_items(user_id,recipe_id,revision,position,product_key,grams,nutrient_snapshot) VALUES(?,?,?,?,?,?,?)');
  foreach($state['rows'] as $i=>$row)$q->execute([$owner,$id,$revision,$i,$row['key'],$row['g'],isset($row['data'])?json_encode($row['data'],JSON_THROW_ON_ERROR):null]);
 }
}
