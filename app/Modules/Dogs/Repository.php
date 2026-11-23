<?php
declare(strict_types=1);
namespace Nutrition\Modules\Dogs;
use PDO;
use Nutrition\Modules\Audit\Log;
final class Repository {
 public function __construct(private PDO $db,private int $owner){}
 public static function legacyId(int $owner): string {return 'dog_'.substr(hash('sha256','legacy-owner:'.$owner),0,32);}
 public function all(): array {$q=$this->db->prepare('SELECT id,name,revision,created_at AS createdAt FROM dogs WHERE user_id=? ORDER BY created_at,id');$q->execute([$this->owner]);return $q->fetchAll();}
 public function owned(string $id): bool {$q=$this->db->prepare('SELECT id FROM dogs WHERE user_id=? AND id=?');$q->execute([$this->owner,$id]);return (bool)$q->fetchColumn();}
 public function first(): string {$list=$this->all();return $list?$list[0]['id']:$this->create('',self::legacyId($this->owner));}
 public function create(string $name,?string $id=null): string {
  $id??='dog_'.bin2hex(random_bytes(16));$now=gmdate('c');
  $q=$this->db->prepare('INSERT INTO dogs(id,user_id,name,revision,created_at,updated_at) VALUES(?,?,?,1,?,?)');$q->execute([$id,$this->owner,$name,$now,$now]);Log::record($this->db,$this->owner,'dog.created',$id);return $id;
 }
}
