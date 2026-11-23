<?php
declare(strict_types=1);
namespace Nutrition\Modules\Profiles;
use PDO;
use RuntimeException;
use Nutrition\Modules\Audit\Log;
final class Repository {
 public const PLAN_FIELDS=['energyMethod','activity','customK','housing','weather','share','homeMeals','dryFoodId','dryFoodRevision','dryName','dryGrams','dryKcal','dryProtein','dryFat','dryCarbs','dayMode','manualDaily','treatKcal','dryAllocation'];
 public function __construct(private PDO $db,private int $owner,private ?string $dog){}
 public function get(): array {
  if($this->dog===null){$q=$this->db->prepare('SELECT payload,revision FROM preferences WHERE user_id=?');$q->execute([$this->owner]);$r=$q->fetch();return ['data'=>$r?json_decode($r['payload'],false,40,JSON_THROW_ON_ERROR):null,'revision'=>$r?(int)$r['revision']:0];}
  $q=$this->db->prepare('SELECT p.payload,p.revision,d.name,f.settings FROM dog_preferences p JOIN dogs d ON d.id=p.dog_id AND d.user_id=p.user_id JOIN feeding_plans f ON f.dog_id=p.dog_id AND f.user_id=p.user_id WHERE p.user_id=? AND p.dog_id=?');$q->execute([$this->owner,$this->dog]);$r=$q->fetch();if(!$r)return ['data'=>null,'revision'=>0];
  $data=json_decode($r['payload'],false,40,JSON_THROW_ON_ERROR);$plan=json_decode($r['settings'],false,40,JSON_THROW_ON_ERROR);$data->profile=(object)array_merge((array)$data->profile,(array)$plan->profile,['dogName'=>$r['name']]);$data->targetMode=$plan->targetMode;
  $q=$this->db->prepare('SELECT payload FROM dog_supplement_regimens WHERE user_id=? AND dog_id=? ORDER BY position');$q->execute([$this->owner,$this->dog]);$data->microPlan->supplements=array_map(static fn($r)=>json_decode($r['payload'],false,40,JSON_THROW_ON_ERROR),$q->fetchAll());return ['data'=>$data,'revision'=>(int)$r['revision']];
 }
 public function save(array $data,int $revision,?string $now=null,?int $restoredRevision=null): int {
  $now??=gmdate('c');$next=$restoredRevision??($revision+1);$ownTransaction=!$this->db->inTransaction();if($ownTransaction)$this->db->beginTransaction();try{
   if($this->dog===null){$payload=json_encode($data,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);if($revision===0){$this->db->prepare('INSERT INTO preferences(user_id,payload,revision,updated_at) VALUES(?,?,1,?)')->execute([$this->owner,$payload,$now]);}else{$q=$this->db->prepare('UPDATE preferences SET payload=?,revision=revision+1,updated_at=? WHERE user_id=? AND revision=?');$q->execute([$payload,$now,$this->owner,$revision]);if(!$q->rowCount())throw new RuntimeException('conflict');}}
   else{
    $base=$data;$profile=(array)$data['profile'];$plan=['profile'=>(object)array_intersect_key($profile,array_flip(self::PLAN_FIELDS)),'targetMode'=>$data['targetMode']];$base['profile']=(object)array_diff_key($profile,array_flip([...self::PLAN_FIELDS,'dogName']));unset($base['targetMode'],$base['microPlan']['supplements']);$payload=json_encode($base,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);
    if($revision===0)$this->db->prepare('INSERT INTO dog_preferences(user_id,dog_id,payload,revision,updated_at) VALUES(?,?,?,?,?)')->execute([$this->owner,$this->dog,$payload,$next,$now]);
    else{$q=$this->db->prepare('UPDATE dog_preferences SET payload=?,revision=revision+1,updated_at=? WHERE user_id=? AND dog_id=? AND revision=?');$q->execute([$payload,$now,$this->owner,$this->dog,$revision]);if(!$q->rowCount())throw new RuntimeException('conflict');}
    $this->db->prepare('INSERT INTO feeding_plans(user_id,dog_id,settings,revision,updated_at) VALUES(?,?,?,?,?) ON DUPLICATE KEY UPDATE settings=VALUES(settings),revision=VALUES(revision),updated_at=VALUES(updated_at)')->execute([$this->owner,$this->dog,json_encode($plan,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR),$next,$now]);
    $this->db->prepare('DELETE FROM dog_supplement_regimens WHERE user_id=? AND dog_id=?')->execute([$this->owner,$this->dog]);$q=$this->db->prepare('INSERT INTO dog_supplement_regimens(user_id,dog_id,position,payload) VALUES(?,?,?,?)');foreach($data['microPlan']['supplements'] as $i=>$supplement)$q->execute([$this->owner,$this->dog,$i,json_encode($supplement,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR)]);
    $name=(string)($profile['dogName']??'');$this->db->prepare('UPDATE dogs SET name=?,revision=revision+1,updated_at=? WHERE user_id=? AND id=? AND name<>?')->execute([$name,$now,$this->owner,$this->dog,$name]);
    $this->db->prepare('INSERT INTO dog_profile_versions(user_id,dog_id,revision,payload,created_at) VALUES(?,?,?,?,?)')->execute([$this->owner,$this->dog,$next,json_encode($data,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR),$now]);
    Log::record($this->db,$this->owner,'profile.updated',$this->dog);
   }
   if($ownTransaction)$this->db->commit();return $next;
  }catch(\Throwable $e){if($ownTransaction&&$this->db->inTransaction())$this->db->rollBack();if($e instanceof \PDOException&&$e->getCode()==='23000')throw new RuntimeException('conflict');throw $e;}
 }
}
