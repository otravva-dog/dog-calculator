<?php
declare(strict_types=1);
namespace Nutrition\Modules\Catalog;
use PDO;
use Nutrition\Support\Database;
final class Repository {
 public function __construct(private PDO $db){}
 public static function source(): array {
  $dir=dirname(__DIR__,3).'/data/';$read=static fn($n)=>json_decode(file_get_contents($dir.$n.'.json'),true,64,JSON_THROW_ON_ERROR);
  $raw=$read('raw-foods');$micro=$read('nutrients');$out=[];
  foreach($raw['items'] as $key=>$value)$out[]=['kind'=>'raw_food','key'=>$key,'name'=>$value['name'],'data'=>$value,'nutrients'=>$micro['items'][$key]['values']??[],'source'=>$value['sourceNote']??''];
  foreach($read('dry-foods')['items'] as $value)$out[]=['kind'=>'dry_food','key'=>$value['id'],'name'=>$value['name'],'data'=>$value,'nutrients'=>$value['totals']??[],'source'=>$value['source']??[]];
  foreach($read('supplements')['items'] as $value)$out[]=['kind'=>'supplement','key'=>$value['id'],'name'=>$value['name'],'data'=>$value,'nutrients'=>$value['values']??[],'source'=>$value['source']??[]];return $out;
 }
 public function all(?string $kind=null): array {
  if(!Database::mysql($this->db))return array_values(array_filter(self::source(),static fn($v)=>$kind===null||$v['kind']===$kind));
  $q=$this->db->prepare('SELECT p.kind,p.item_key AS itemKey,p.name,r.id AS revision,r.payload FROM catalog_products p JOIN catalog_active_revisions a ON a.product_id=p.id JOIN catalog_revisions r ON r.id=a.revision_id'.($kind!==null?' WHERE p.kind=?':'').' ORDER BY p.kind,p.item_key');$q->execute($kind!==null?[$kind]:[]);$out=[];foreach($q as $r){$item=json_decode($r['payload'],true,64,JSON_THROW_ON_ERROR);$item['revision']=$r['revision'];$out[]=$item;}return $out;
 }
 public function import(): array {
  if(!Database::mysql($this->db))throw new \RuntimeException('Catalog import requires MySQL');
  $items=self::source();$meta=json_decode(file_get_contents(dirname(__DIR__,3).'/data/nutrients.json'),true,64,JSON_THROW_ON_ERROR);$units=['energy'=>'ккал','protein'=>'г','fat'=>'г','carbohydrate'=>'г'];foreach($meta['definitions'] as $d)$units[$d[0]]=$d[2];$now=gmdate('c');$this->db->beginTransaction();
  try{foreach($items as $item){
   $id=$item['kind'].':'.$item['key'];$payload=json_encode($item,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR);$revision=hash('sha256',$payload);$sourceId=hash('sha256',json_encode($item['source'],JSON_THROW_ON_ERROR));$source=is_array($item['source'])?$item['source']:['title'=>$item['source']];
   $this->db->prepare('INSERT IGNORE INTO catalog_sources(id,title,url,checked_at,metadata) VALUES(?,?,?,?,?)')->execute([$sourceId,(string)($source['title']??$source['basis']??$item['name']),$source['url']??null,$source['checked']??null,json_encode($source,JSON_UNESCAPED_UNICODE|JSON_THROW_ON_ERROR)]);
   $this->db->prepare('INSERT INTO catalog_products(id,kind,item_key,name) VALUES(?,?,?,?) ON DUPLICATE KEY UPDATE name=VALUES(name)')->execute([$id,$item['kind'],$item['key'],$item['name']]);
   $this->db->prepare('INSERT IGNORE INTO catalog_revisions(id,product_id,source_id,payload,created_at) VALUES(?,?,?,?,?)')->execute([$revision,$id,$sourceId,$payload,$now]);
   $this->db->prepare('INSERT INTO catalog_active_revisions(product_id,revision_id) VALUES(?,?) ON DUPLICATE KEY UPDATE revision_id=VALUES(revision_id)')->execute([$id,$revision]);
   $macros=$item['kind']==='raw_food'?array_intersect_key($item['data'],array_flip(['kcal','p','f','c'])):($item['kind']==='dry_food'?['kcal'=>$item['data']['kcal']??null,'p'=>$item['data']['protein']??null,'f'=>$item['data']['fat']??null,'c'=>$item['data']['carbs']??null]:[]);
   $map=['kcal'=>'energy','p'=>'protein','f'=>'fat','c'=>'carbohydrate'];$normalizedMacros=[];foreach($macros as $code=>$value)$normalizedMacros[$map[$code]]=$value;$values=array_merge($normalizedMacros,$item['nutrients']);$q=$this->db->prepare('INSERT IGNORE INTO catalog_nutrients(revision_id,nutrient_code,value,unit,value_type,basis) VALUES(?,?,?,?,?,?)');
   foreach($values as $code=>$value)$q->execute([$revision,$code,$value,$units[$code]??'?', $item['kind']==='supplement'?'normalized':($item['kind']==='raw_food'?'typical':'total'),$item['kind']==='supplement'?'per_unit':'per_100g']);if($item['kind']==='supplement')foreach($item['data']['declaredPerTablet']??[] as $declared)$q->execute([$revision,$declared['key'],$declared['value'],$declared['unit'],'declared','per_unit']);
  }$this->db->commit();return ['products'=>count($items),'revisions'=>(int)$this->db->query('SELECT COUNT(*) FROM catalog_revisions')->fetchColumn()];}catch(\Throwable $e){if($this->db->inTransaction())$this->db->rollBack();throw $e;}
 }
}
