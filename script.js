const products = {
    proteins: {
        'turkey_breast': { name: 'Индейка (грудка)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_thigh': { name: 'Индейка (бедро)', kcal: 140, p: 21, f: 6, c: 0 },
        'turkey_tenderloin': { name: 'Индейка (малое филе)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_indilight_thigh': { name: 'Индейка Индилайт (филе бедра)', kcal: 113, p: 19.5, f: 4, c: 0 },
        'turkey_indilight_tenderloin': { name: 'Индейка Индилайт (малое филе)', kcal: 110, p: 23, f: 2, c: 0 },
        'turkey_indilight_breast': { name: 'Индейка Индилайт (филе грудки)', kcal: 110, p: 23, f: 2, c: 0 },
        'duck_breast': { name: 'Утка (грудка)', kcal: 140, p: 20, f: 7, c: 0 },
        'duck_thigh': { name: 'Утка (бедро)', kcal: 160, p: 19, f: 9, c: 0 },
        'beef_tenderloin': { name: 'Говядина (вырезка)', kcal: 120, p: 20, f: 3, c: 0 },
        'beef_shoulder': { name: 'Говядина (лопатка)', kcal: 250, p: 18, f: 20, c: 0 },
        'beef_shank': { name: 'Говядина (голяшка)', kcal: 190, p: 20, f: 11, c: 0 },
        'rabbit': { name: 'Кролик', kcal: 150, p: 21, f: 7, c: 0 },
        'lamb_lean': { name: 'Баранина', kcal: 210, p: 19, f: 14, c: 0 },
        'salmon_murmansk': { name: 'Семга (Мурманская)', kcal: 205, p: 20, f: 13.5, c: 0 },
        'salmon_generic': { name: 'Лосось', kcal: 210, p: 20, f: 14, c: 0 },
        'sockeye': { name: 'Нерка', kcal: 160, p: 22, f: 8, c: 0 },
        'trout': { name: 'Форель', kcal: 140, p: 21, f: 6, c: 0 },
        'cod': { name: 'Треска', kcal: 80, p: 17, f: 1, c: 0 },
        'hake': { name: 'Хек', kcal: 85, p: 17, f: 1, c: 0 },
        'pollock': { name: 'Минтай', kcal: 75, p: 16, f: 1, c: 0 },
        'sea_bass': { name: 'Морской окунь', kcal: 90, p: 18, f: 2, c: 0 }
    },
    mainVeggies: {
        'broccoli_fresh': { name: 'Брокколи (свеж.)', kcal: 34, p: 2.8, f: 0.4, c: 7 },
        'broccoli_frozen': { name: 'Брокколи (замор.)', kcal: 23, p: 2.0, f: 0.3, c: 5 },
        'cauliflower_fresh': { name: 'Цветная (свеж.)', kcal: 30, p: 2.5, f: 0.3, c: 5 },
        'cauliflower_frozen': { name: 'Цветная (замор.)', kcal: 20, p: 1.8, f: 0.2, c: 4 },
        'pumpkin': { name: 'Тыква', kcal: 26, p: 1, f: 0.1, c: 7 },
        'sweet_potato': { name: 'Батат', kcal: 86, p: 1.6, f: 0.1, c: 20 }
    },
    extraVeggies: {
        'zucchini': { name: 'Цуккини', kcal: 20, p: 1.2, f: 0.3, c: 3.1 },
        'zucchini_regular': { name: 'Кабачки', kcal: 24, p: 0.6, f: 0.1, c: 4 },
        'carrot': { name: 'Морковь', kcal: 41, p: 0.9, f: 0.2, c: 9 },
        'paprika': { name: 'Перец', kcal: 31, p: 1, f: 0.3, c: 6 },
        'pepper_ramiro': { name: 'Перец Рамиро', kcal: 28, p: 1, f: 0.3, c: 5.5 },
        'apple': { name: 'Яблоко', kcal: 52, p: 0.3, f: 0.2, c: 14 },
        'cranberry_fresh': { name: 'Брусника (свеж.)', kcal: 43, p: 0.7, f: 0.5, c: 8 },
        'cranberry_frozen': { name: 'Брусника (замор.)', kcal: 38, p: 0.6, f: 0.4, c: 7 },
        'raspberry_fresh': { name: 'Малина (свеж.)', kcal: 46, p: 1.2, f: 0.7, c: 12 },
        'raspberry_frozen': { name: 'Малина (замор.)', kcal: 40, p: 1.0, f: 0.6, c: 10 },
        'wakame': { name: 'Вакаме', kcal: 300, p: 10, f: 1, c: 50, max_g: 5 }
    }
};
const catalog={...products.proteins,...products.mainVeggies,...products.extraVeggies,
 chicken_breast:{name:'Курица, грудка без кожи',kcal:120,p:22.5,f:2.6,c:0},pork_lean:{name:'Свинина, нежирная вырезка',kcal:120,p:21,f:3.5,c:0},blueberry:{name:'Голубика',kcal:57,p:.7,f:.3,c:14.5},strawberry:{name:'Клубника',kcal:32,p:.7,f:.3,c:7.7},pear:{name:'Груша без семян',kcal:57,p:.4,f:.1,c:15},cucumber:{name:'Огурец',kcal:15,p:.7,f:.1,c:3.6},green_beans:{name:'Фасоль стручковая',kcal:31,p:1.8,f:.2,c:7},oil:{name:'Оливковое масло',kcal:900,p:0,f:100,c:0}};
const proteinKeys=[...Object.keys(products.proteins),'chicken_breast','pork_lean'];
const plantKeys=Object.keys(catalog).filter(k=>!proteinKeys.includes(k)&&k!=='oil');
const $=id=>document.getElementById(id),keys=['kcal','p','f','c'],labels={kcal:'Калории',p:'Белок',f:'Жир',c:'Углеводы'};
const defaultState=()=>({targets:{kcal:[270,285],p:[20,25],f:[8,12],c:[null,null]},rows:[{key:'turkey_thigh',g:100,locked:false},{key:'pumpkin',g:100,locked:false},{key:'zucchini',g:80,locked:false}],batch:1,profile:{}});
let state=defaultState(),recipes=[];let canStore=true;
try{const raw=JSON.parse(localStorage.getItem('evening_v2')||'null');if(raw&&valid(raw))state=raw;recipes=JSON.parse(localStorage.getItem('evening_recipes_v2')||'[]');if(!Array.isArray(recipes))recipes=[];}catch{canStore=false;}
function valid(s){return s&&Array.isArray(s.rows)&&s.rows.length<=40&&s.rows.every(r=>catalog[r.key]&&Number.isFinite(r.g)&&r.g>=0&&r.g<=10000&&(!r.data||keys.every(k=>Number.isFinite(r.data[k])&&r.data[k]>=0)))&&s.targets&&keys.every(k=>Array.isArray(s.targets[k])&&s.targets[k].length===2&&s.targets[k].every(n=>n===null||Number.isFinite(n)&&n>=0))&&Number.isInteger(s.batch)&&s.batch>=1&&s.batch<=100;}
function data(r){return r.data||catalog[r.key];}
function totals(rows=state.rows){return rows.reduce((a,r)=>{keys.forEach(k=>a[k]+=data(r)[k]*r.g/100);return a;},{kcal:0,p:0,f:0,c:0});}
function persist(){try{localStorage.setItem('evening_v2',JSON.stringify(state));localStorage.setItem('evening_recipes_v2',JSON.stringify(recipes));$('storageStatus').textContent='Сохранено в этом браузере';}catch{$('storageStatus').textContent='Хранилище недоступно. Используйте экспорт.';}}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function number(value,min=0,step=1){const n=document.createElement('input');n.type='number';n.min=min;n.step=step;n.value=value??'';return n;}
function makeLabel(text,input){const l=el('label',text);l.append(input);return l;}
function targetError(){return keys.some(k=>{const [lo,hi]=state.targets[k];return (k!=='c'&&(lo===null||hi===null))||(lo!==null&&hi!==null&&lo>hi);});}
function renderTargets(){$('targets').replaceChildren();keys.forEach(k=>{const box=el('div');box.append(el('label',labels[k]+(k==='kcal'?' · ккал':' · г')));const grid=el('div',undefined,'fields');['От','До'].forEach((name,i)=>{const n=number(state.targets[k][i],0,k==='kcal'?1:.1);n.setAttribute('aria-label',`${labels[k]} ${name}`);n.placeholder=k==='c'?'Не задано':name;n.addEventListener('input',()=>{if(n.value!==''&&!n.validity.valid)return;state.targets[k][i]=n.value===''?null:n.valueAsNumber;update();});grid.append(n);});box.append(grid);$('targets').append(box);});}
function renderRows(){$('ingredients').replaceChildren();state.rows.forEach((r,i)=>{const card=el('article',undefined,'ingredient'),row=el('div',undefined,'row'),sel=document.createElement('select');const opts=r.key==='oil'?['oil']:proteinKeys.includes(r.key)?proteinKeys:plantKeys;opts.forEach(k=>sel.add(new Option(catalog[k].name,k)));sel.value=r.key;sel.setAttribute('aria-label','Продукт '+(i+1));sel.onchange=()=>{r.key=sel.value;delete r.data;if(r.key==='wakame'){r.g=0;r.locked=true;}renderRows();update();};const weight=number(r.g,0,r.key==='oil'?.1:1);weight.max=10000;weight.oninput=()=>{if(!weight.validity.valid||weight.value==='')return;r.g=weight.valueAsNumber;update();};const remove=el('button','×','remove');remove.setAttribute('aria-label','Удалить '+catalog[r.key].name);remove.onclick=()=>{state.rows.splice(i,1);renderRows();update();};row.append(makeLabel('Продукт',sel),makeLabel('Сырой вес, г',weight),remove);card.append(row);const lock=document.createElement('input');lock.type='checkbox';lock.checked=r.locked;lock.disabled=r.key==='wakame';lock.onchange=()=>{r.locked=lock.checked;persist();};const ll=el('label',undefined,'lock');ll.append(lock,document.createTextNode(r.key==='wakame'?'Вакаме: ручной ввод после проверки йода':'Закрепить вес при подборе'));card.append(ll);const details=document.createElement('details');details.append(el('summary','КБЖУ на 100 г · редактировать'));const fields=el('div',undefined,'fields');keys.forEach(k=>{const n=number(data(r)[k],0,.1);n.oninput=()=>{if(!n.validity.valid||n.value==='')return;r.data={...data(r),[k]:n.valueAsNumber};update();};fields.append(makeLabel(labels[k],n));});details.append(fields);const reset=el('button','Вернуть справочник','secondary');reset.onclick=()=>{delete r.data;renderRows();update();};details.append(reset,el('p','Калории редактируются отдельно: формула 4/9/4 не заменяет этикетку. Дополнительные продукты имеют ориентировочные значения.','muted'));card.append(details);$('ingredients').append(card);});}
function update(){const t=totals();$('mass').textContent=state.rows.reduce((a,r)=>a+r.g,0).toFixed(1)+' г';$('metrics').replaceChildren();keys.forEach(k=>{const [lo,hi]=state.targets[k],ok=(lo===null||t[k]>=lo)&&(hi===null||t[k]<=hi);const m=el('div',undefined,'metric'),top=el('div',undefined,'metric-top');top.append(el('span',labels[k]),el('strong',t[k].toFixed(1)+(k==='kcal'?'':' г')));m.append(top,el('small',lo===null&&hi===null?'Без целевого ограничения':`${lo??'—'}–${hi??'—'} ${k==='kcal'?'ккал':'г'}`));let msg=ok?'В диапазоне':lo!==null&&t[k]<lo?`Ниже на ${(lo-t[k]).toFixed(1)}`:`Выше на ${(t[k]-hi).toFixed(1)}`;if(lo===null&&hi===null)msg='Справочно';m.append(el('div',msg,'status '+(ok?'ok':'')));const track=el('div',undefined,'track'),fill=el('div',undefined,'fill '+(ok?'ok':''));fill.style.width=Math.min(100,t[k]/(hi||lo||Math.max(t[k],1))*100)+'%';track.append(fill);m.append(track);$('metrics').append(m);});$('shopping').replaceChildren(el('p',`На ${state.batch} порц. · сырой вес`,'muted'));state.rows.filter(r=>r.g>0).forEach(r=>$('shopping').append(el('div',`${catalog[r.key].name}: ${(r.g*state.batch).toFixed(r.key==='oil'?1:0)} г`,'shopping')));estimate();if(targetError())$('fitMessage').textContent='Проверьте цели: обязательны калории, белок и жир; минимум не должен превышать максимум.';persist();}
function add(key,g){if(state.rows.length>=40)return;state.rows.push({key,g,locked:false});renderRows();update();}
$('addProtein').onclick=()=>add('turkey_breast',50);$('addPlant').onclick=()=>add('zucchini',30);$('addOil').onclick=()=>add('oil',0);
// Minimize normalized distance outside intervals; retain starting composition within feasible range.
function fitRows(rows,targets){const scales={kcal:15,p:2,f:1,c:3},start=rows.map(r=>r.g),free=rows.map((r,i)=>!r.locked&&r.key!=='wakame'?i:-1).filter(i=>i>=0);const vector=rows.map(r=>keys.map(k=>data(r)[k]/100));const score=w=>{const t=[0,0,0,0];w.forEach((g,i)=>vector[i].forEach((v,k)=>t[k]+=v*g));return keys.reduce((s,k,j)=>{const [lo,hi]=targets[k],d=lo!==null&&t[j]<lo?lo-t[j]:hi!==null&&t[j]>hi?t[j]-hi:0;return s+(d/scales[k])**2;},0)+w.reduce((s,g,i)=>s+((g-start[i])/Math.max(30,start[i]))**2,0)*.000001;};
let best=start.slice(),bestScore=score(best);for(const factor of [1,.5,1.5,2]){let w=start.map((g,i)=>free.includes(i)?g*factor:g);for(const step of [50,20,10,5,1,.1]){let changed=true;for(let pass=0;changed&&pass<100;pass++){changed=false;let current=score(w);for(const i of free){const original=w[i];for(const direction of [-1,1]){const candidate=Math.round(Math.max(0,Math.min(10000,original+direction*step))*10)/10;w[i]=candidate;const next=score(w);if(next<current-1e-12){current=next;changed=true;break;}w[i]=original;}}}}const s=score(w);if(s<bestScore){best=w;bestScore=s;}}best=best.map((g,i)=>rows[i].locked?g:Math.round(g*(rows[i].key==='oil'?10:1))/(rows[i].key==='oil'?10:1));
for(let pass=0;pass<200;pass++){let changed=false,current=score(best);for(const i of free){const original=best[i],step=rows[i].key==='oil'?.1:1;for(const d of [-1,1]){best[i]=Math.round(Math.max(0,Math.min(10000,original+d*step))*10)/10;const next=score(best);if(next<current-1e-12){current=next;changed=true;break;}best[i]=original;}}if(!changed)break;}
return rows.map((r,i)=>({...r,g:best[i]}));}
$('fit').onclick=()=>{if(targetError())return;state.rows=fitRows(state.rows,state.targets);renderRows();update();const t=totals(),ok=keys.every(k=>{const [a,b]=state.targets[k];return(a===null||t[k]>=a)&&(b===null||t[k]<=b);});$('fitMessage').textContent=ok?'Подобрано в диапазоны. Закреплённые строки сохранены.':'Найден приближённый вариант. Проверьте отклонения: измените состав или снимите закрепление. Алгоритм не гарантирует глобально лучший результат.';};
$('batch').value=state.batch;$('batch').oninput=()=>{if($('batch').validity.valid&&$('batch').value){state.batch=$('batch').valueAsNumber;update();}};
const profileIds=['breed','dogWeight','age','neutered','activity','season','weather','share','dryGrams','dryKcal'];
function estimate(){const weight=+$('dogWeight').value,share=+$('share').value/100,age=+$('age').value;const validInputs=profileIds.filter(k=>!['breed','season','dryGrams','dryKcal'].includes(k)).every(k=>$(k).validity.valid&&$(k).value!=='');if(!validInputs||age<1){$('estimate').textContent='Проверьте профиль. Расчёт предназначен для взрослых собак от года.';return null;}const rer=70*Math.pow(weight,.75),daily=rer*+$('neutered').value*+$('activity').value*(1+ +$('weather').value/100);let text=`RER ≈ ${Math.round(rer)} ккал; ориентир за день ≈ ${Math.round(daily)} ккал; домашняя часть ${Math.round(share*100)}% ≈ ${Math.round(daily*share)} ккал.`;const dry=+$('dryGrams').value*+$('dryKcal').value/100;if(dry>0)text+=` Указанный сухой корм: ${Math.round(dry)} ккал; с текущим домашним рецептом: ${Math.round(dry+totals().kcal)} ккал/сутки.`;$('estimate').textContent=text;return daily*share;}
profileIds.forEach(id=>{if(state.profile?.[id]!==undefined)$(id).value=state.profile[id];$(id).addEventListener('input',()=>{state.profile=Object.fromEntries(profileIds.map(k=>[k,$(k).value]));estimate();persist();});});$('applyEstimate').onclick=()=>{const n=estimate();if(n===null)return;state.targets.kcal=[Math.round(n*.95),Math.round(n*1.05)];renderTargets();update();};
function renderRecipes(){$('recipes').replaceChildren();recipes.forEach((r,i)=>{if(!r||!valid(r.state))return;const line=el('div',undefined,'recipe'),load=el('button',String(r.name||'Без названия')),remove=el('button','×','secondary');load.onclick=()=>{state=structuredClone(r.state);renderTargets();renderRows();$('batch').value=state.batch;profileIds.forEach(k=>{if(state.profile?.[k]!==undefined)$(k).value=state.profile[k];});$('recipeName').value=r.name;update();estimate();};remove.setAttribute('aria-label','Удалить рецепт');remove.onclick=()=>{recipes.splice(i,1);renderRecipes();persist();};line.append(load,remove);$('recipes').append(line);});}
$('saveRecipe').onclick=()=>{if(!valid(state)||targetError())return;const name=$('recipeName').value.trim()||'Моя порция';recipes.unshift({name,state:structuredClone(state)});renderRecipes();persist();};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify({version:2,state,recipes},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download='evening-recipes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onchange=async e=>{try{const file=e.target.files[0];if(!file)return;if(file.size>2000000)throw Error();const v=JSON.parse(await file.text());if(v.version!==2||!valid(v.state)||!Array.isArray(v.recipes)||v.recipes.length>500||!v.recipes.every(r=>typeof r.name==='string'&&valid(r.state)))throw Error();state=v.state;recipes=v.recipes;renderTargets();renderRows();renderRecipes();$('batch').value=state.batch;profileIds.forEach(k=>{if(state.profile?.[k]!==undefined)$(k).value=state.profile[k];});update();$('fitMessage').textContent='Импорт выполнен.';}catch{$('fitMessage').textContent='Файл не импортирован: нужен корректный экспорт версии 2 до 2 МБ.';}e.target.value='';};
renderTargets();renderRows();renderRecipes();update();estimate();
