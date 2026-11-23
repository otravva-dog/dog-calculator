/* Pure calculation functions. No DOM, account or storage dependencies. */
(function(root){'use strict';
const REFERENCE={kcal:277.5,p:[22,33],f:[9,22]};
const round1=n=>Math.round(n*10)/10;
function scaledTargets(center=320){const factor=center/REFERENCE.kcal,kcal=[Math.round(center*310/320),Math.round(center*330/320)],p=REFERENCE.p.map(x=>Math.round(x*factor)),f=REFERENCE.f.map(x=>Math.round(x*factor));return {kcal,p,f,c:[Math.max(0,Math.floor((kcal[0]-4*p[1]-9*f[1])/4)),Math.max(0,Math.ceil((kcal[1]-4*p[0]-9*f[0])/4))]};}
const MACRO_ENERGY={p:27.5*4/277.5,f:15.5*9/277.5,c:(277.5-27.5*4-15.5*9)/277.5};
const macroProfile=kcal=>({kcal,p:kcal*MACRO_ENERGY.p/4,f:kcal*MACRO_ENERGY.f/9,c:kcal*MACRO_ENERGY.c/4});
function energyModel(p,timeline={}){
 const metabolic=p.weight**.75,rer=70*metabolic;let k=110,description='',base,daily;
 if(p.dayMode==='manual'){base=p.manualDaily;k=null;description='Своя суточная норма';}
 else if(p.stage==='pregnant'){
  if(p.age<1)throw Error('Для растущей беременной собаки нужен индивидуальный расчёт рациона.');
  if(p.sex!=='female'||p.neutered!=='intact')throw Error('Беременность доступна для нестерилизованной суки.');
  const day=timeline.matingDays;if(day===null||day>70)throw Error('Проверьте дату вязки: нужен текущий срок беременности.');
  if(!(p.preWeight>0))throw Error('Укажите вес до беременности.');
  base=132*p.preWeight**.75+(day>=28?26*p.preWeight:0);k=null;description=`FEDIAF · беременность · ${day+1}-й день`;
 }else if(p.stage==='lactating'){
  if(p.age<1)throw Error('Для растущей кормящей собаки нужен индивидуальный расчёт рациона.');
  if(p.sex!=='female'||p.neutered!=='intact')throw Error('Лактация доступна для нестерилизованной суки.');
  if(p.puppySolids==='yes')throw Error('При прикорме щенков укажите индивидуальную суточную норму.');const day=timeline.litterDays;if(day===null)throw Error('Укажите дату родов.');
  if(day>27)throw Error('После 4-й недели лактации потребность зависит от прикорма и отъёма. Используйте индивидуальные цели.');
  if(!Number.isInteger(p.puppies)||p.puppies<1||p.puppies>8)throw Error('Формула FEDIAF рассчитана на 1–8 кормящихся щенков. Для большего помёта нужны индивидуальные цели.');
  const L=[.75,.95,1.1,1.2][Math.floor(day/7)],n=p.puppies,milk=n<=4?24*n:96+12*(n-4);
  base=145*metabolic+milk*p.weight*L;k=null;description=`FEDIAF · лактация · ${Math.floor(day/7)+1}-я неделя · ${n} щенков`;
 }else if(p.age<1){
  if(p.ageDays<56)throw Error('До 8 недель этот калькулятор не рассчитывает рацион щенка.');
  if(!(p.adultWeight>=p.weight))throw Error('Укажите ожидаемый взрослый вес не меньше текущего.');
  k=254.1-135*(p.weight/p.adultWeight);base=k*metabolic;description='FEDIAF · рост с 8 недель до 1 года';
 }else{
  if(p.method==='fediaf-age'){k=p.age<3?130:p.age<=7?110:95;description='FEDIAF · возрастной ориентир';}
  else if(p.method==='nrc-wsava'){k=p.activity===95?95:130;description='NRC / WSAVA · '+(k===95?'низкая активность':'активная взрослая');}
  else if(p.method==='rer-state'){k=70*(p.neutered==='neutered'?1.6:1.8);description='MER по RER · '+(p.neutered==='neutered'?'1,6 × RER':'1,8 × RER');}
  else if(p.method==='custom'){k=p.customK;description='Индивидуальный коэффициент';}
  else {k=p.activity;description='FEDIAF · активность';}
  base=k*metabolic;
 }
 daily=p.dayMode==='manual'?p.manualDaily:base*(1+p.weather/100);const budget=daily-(Number(p.treatKcal)||0);if(budget<0)throw Error('Лакомства превышают цель на день.');const naturalDaily=budget*p.share/100,portion=naturalDaily/(p.homeMeals||1),dryEnergy=budget-naturalDaily;
 return {daily,rer,portion,naturalDaily,dryEnergy,budget,k,base,description,dayMacros:macroProfile(daily),portionMacros:macroProfile(portion),stage:p.stage,age:p.age};
}
function totals(rows,foods){
 const result={kcal:0,p:0,f:0,c:0},correction={kcal:0,p:0,f:0,c:0};
 for(const row of rows){const values=row.data||foods[row.key];for(const key of Object.keys(result)){const term=values[key]*row.g/100-correction[key],sum=result[key]+term;correction[key]=(sum-result[key])-term;result[key]=sum;}}
 return result;
}
const api=Object.freeze({VERSION:32,REFERENCE,round1,scaledTargets,macroProfile,energyModel,totals});if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.NutritionCore=api;
})(globalThis);
