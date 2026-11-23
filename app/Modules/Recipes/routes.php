<?php
declare(strict_types=1);
if(!isset($db,$owner,$route,$method))exit;
$recipeStore=new Nutrition\Modules\Recipes\Repository($db,$owner,$dogId);
if($route==='recipes'&&$method==='GET')respond(['recipes'=>$recipeStore->all()]);
if(preg_match('#^recipes/([A-Za-z0-9_-]{1,100})$#D',$route,$match)){
 $id=$match[1];
 if($method==='DELETE'){if(!$recipeStore->remove($id,$_SERVER['HTTP_IF_MATCH']??''))fail('Рецепт изменён на другом устройстве.',409);http_response_code(204);exit;}
 if($method!=='PUT')fail('Method not allowed',405);
 $input=body();$state=$input['state']??null;$name=trim((string)($input['name']??''));if(($input['id']??'')!==$id||$name===''||strlen($name)>400||!validState($state))fail('Проверьте рецепт.');
 try{respond($recipeStore->save($id,$name,$state,isset($input['revision'])?(int)$input['revision']:null));}catch(RuntimeException $e){if($e->getMessage()==='conflict')fail('Рецепт изменён на другом устройстве.',409);if($e->getMessage()==='limit')fail('Не более 500 рецептов.',409);throw $e;}
}
