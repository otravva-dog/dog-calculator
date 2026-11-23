<?php
declare(strict_types=1);
if(!isset($db,$owner,$route,$method))exit;
if($route==='dogs'){
 if(!Nutrition\Support\Database::mysql($db)){if($method!=='GET')fail('Несколько собак доступны после переноса на MySQL.',409);respond(['dogs'=>[],'available'=>false]);}
 $dogs=new Nutrition\Modules\Dogs\Repository($db,$owner);
 if($method==='GET'){$first=$dogs->first();respond(['dogs'=>$dogs->all(),'defaultId'=>$first,'available'=>true]);}
 if($method!=='POST')fail('Method not allowed',405);
 $input=body();$name=trim((string)($input['name']??''));if($name===''||strlen($name)>400)fail('Укажите кличку собаки.');if(count($dogs->all())>=20)fail('Не более 20 собак в аккаунте.',409);
 $id=$dogs->create($name);respond(['id'=>$id,'name'=>$name],201);
}
