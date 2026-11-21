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
const LEGACY_CATALOG=structuredClone(catalog);
const FOOD_REFERENCE={
"turkey_breast":{"kcal": 114.0, "p": 23.34, "f": 2.33, "c": 0.0, "sourceNote": "USDA SR, NDB 05710. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"turkey_thigh":{"kcal": 116.0, "p": 20.6, "f": 3.69, "c": 0.0, "sourceNote": "USDA SR, NDB 05717. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"turkey_tenderloin":{"kcal": 114.0, "p": 23.34, "f": 2.33, "c": 0.0, "sourceNote": "USDA SR, NDB 05710. Аналог: филе грудки; уточните этикетку."},
"beef_tenderloin":{"kcal": 138.0, "p": 20.85, "f": 6.11, "c": 0.0, "sourceNote": "USDA SR, NDB 23294. Вырезка без видимого жира, травяной откорм."},
"beef_shoulder":{"kcal": 130.0, "p": 21.39, "f": 4.97, "c": 0.0, "sourceNote": "USDA SR, NDB 23000. Лопатка, видимый наружный жир срезан."},
"beef_shank":{"kcal": 128.0, "p": 21.75, "f": 3.85, "c": 0.0, "sourceNote": "USDA SR, NDB 13227. Голяшка: только мясо, без кости и наружного жира."},
"rabbit":{"kcal": 136.0, "p": 20.05, "f": 5.55, "c": 0.0, "sourceNote": "USDA SR, NDB 17177. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"lamb_lean":{"kcal": 134.0, "p": 20.29, "f": 5.25, "c": 0.0, "sourceNote": "USDA SR, NDB 17003. Нежирное мясо, видимый жир срезан."},
"salmon_murmansk":{"kcal": 208.0, "p": 20.42, "f": 13.42, "c": 0.0, "sourceNote": "USDA SR, NDB 15236. Аналог: атлантический лосось, выращенный; происхождение не определяет жирность."},
"salmon_generic":{"kcal": 208.0, "p": 20.42, "f": 13.42, "c": 0.0, "sourceNote": "USDA SR, NDB 15236. Атлантический лосось, выращенный."},
"sockeye":{"kcal": 131.0, "p": 22.25, "f": 4.69, "c": 0.0, "sourceNote": "USDA SR, NDB 15085. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"trout":{"kcal": 141.0, "p": 19.94, "f": 6.18, "c": 0.0, "sourceNote": "USDA SR, NDB 15240. Радужная форель, выращенная."},
"cod":{"kcal": 82.0, "p": 17.81, "f": 0.67, "c": 0.0, "sourceNote": "USDA SR, NDB 15015. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"pollock":{"kcal": 56.0, "p": 12.19, "f": 0.41, "c": 0.0, "sourceNote": "USDA SR, NDB 15066. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"sea_bass":{"kcal": 79.0, "p": 15.31, "f": 1.54, "c": 0.0, "sourceNote": "USDA SR, NDB 15057. Атлантический морской окунь (Sebastes), не сибас."},
"broccoli_fresh":{"kcal": 34.0, "p": 2.82, "f": 0.37, "c": 6.64, "sourceNote": "USDA SR, NDB 11090. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"broccoli_frozen":{"kcal": 26.0, "p": 2.81, "f": 0.29, "c": 4.78, "sourceNote": "USDA SR, NDB 11092. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"cauliflower_fresh":{"kcal": 25.0, "p": 1.92, "f": 0.28, "c": 4.97, "sourceNote": "USDA SR, NDB 11135. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"cauliflower_frozen":{"kcal": 24.0, "p": 2.01, "f": 0.27, "c": 4.68, "sourceNote": "USDA SR, NDB 11137. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"pumpkin":{"kcal": 26.0, "p": 1.0, "f": 0.1, "c": 6.5, "sourceNote": "USDA SR, NDB 11422. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"sweet_potato":{"kcal": 86.0, "p": 1.57, "f": 0.05, "c": 20.12, "sourceNote": "USDA SR, NDB 11507. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"zucchini":{"kcal": 17.0, "p": 1.21, "f": 0.32, "c": 3.11, "sourceNote": "USDA SR, NDB 11477. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"zucchini_regular":{"kcal": 17.0, "p": 1.21, "f": 0.32, "c": 3.11, "sourceNote": "USDA SR, NDB 11477. Аналог: цуккини с кожицей."},
"carrot":{"kcal": 41.0, "p": 0.93, "f": 0.24, "c": 9.58, "sourceNote": "USDA SR, NDB 11124. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"paprika":{"kcal": 31.0, "p": 0.99, "f": 0.3, "c": 6.03, "sourceNote": "USDA SR, NDB 11821. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"pepper_ramiro":{"kcal": 31.0, "p": 0.99, "f": 0.3, "c": 6.03, "sourceNote": "USDA SR, NDB 11821. Аналог: красный сладкий перец."},
"apple":{"kcal": 52.0, "p": 0.26, "f": 0.17, "c": 13.81, "sourceNote": "USDA SR, NDB 09003. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"raspberry_fresh":{"kcal": 52.0, "p": 1.2, "f": 0.65, "c": 11.94, "sourceNote": "USDA SR, NDB 09302. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"raspberry_frozen":{"kcal": 52.0, "p": 1.2, "f": 0.65, "c": 11.94, "sourceNote": "USDA SR, NDB 09518. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"chicken_breast":{"kcal": 120.0, "p": 22.5, "f": 2.62, "c": 0.0, "sourceNote": "USDA SR, NDB 05062. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"pork_lean":{"kcal": 109.0, "p": 20.95, "f": 2.17, "c": 0.0, "sourceNote": "USDA SR, NDB 10060. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"blueberry":{"kcal": 57.0, "p": 0.74, "f": 0.33, "c": 14.49, "sourceNote": "USDA SR, NDB 09050. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"strawberry":{"kcal": 32.0, "p": 0.67, "f": 0.3, "c": 7.68, "sourceNote": "USDA SR, NDB 09316. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"pear":{"kcal": 57.0, "p": 0.36, "f": 0.14, "c": 15.23, "sourceNote": "USDA SR, NDB 09252. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"cucumber":{"kcal": 15.0, "p": 0.65, "f": 0.11, "c": 3.63, "sourceNote": "USDA SR, NDB 11205. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
"green_beans":{"kcal": 31.0, "p": 1.83, "f": 0.22, "c": 6.97, "sourceNote": "USDA SR, NDB 11052. Сырой продукт; без кожи и костей для мяса/рыбы, без сахара для заморозки."},
};
for(const [key,values]of Object.entries(FOOD_REFERENCE))Object.assign(catalog[key],values);
for(const key of ['duck_breast','duck_thigh','hake','cranberry_fresh','cranberry_frozen','wakame','turkey_indilight_thigh','turkey_indilight_breast','turkey_indilight_tenderloin'])catalog[key].sourceNote='Исходные значения: точная этикетка не подтверждена. Уточните КБЖУ на упаковке.';
catalog.wakame.name='Вакаме (сухие)';catalog.wakame.sourceNote+=' Сухие и размоченные водоросли не взаимозаменяемы.';catalog.beef_shoulder.name='Говядина (лопатка без наружного жира)';catalog.beef_shank.name='Говядина (голяшка без кости и жира)';catalog.lamb_lean.name='Баранина (нежирная)';catalog.salmon_generic.name='Лосось атлантический (выращенный)';catalog.sea_bass.name='Морской окунь (атлантический)';
const SHORT_PRODUCT_NAMES={
 turkey_breast:'Грудка индейки',turkey_indilight_breast:'Грудка индейки',turkey_thigh:'Бедро индейки',turkey_indilight_thigh:'Бедро индейки',turkey_tenderloin:'Филе индейки',turkey_indilight_tenderloin:'Филе индейки',
 duck_breast:'Грудка утки',duck_thigh:'Бедро утки',chicken_breast:'Куриная грудка',beef_tenderloin:'Говяжья вырезка',beef_shoulder:'Говяжья лопатка',beef_shank:'Говяжья голяшка',pork_lean:'Свинина',
 salmon_murmansk:'Сёмга',salmon_generic:'Лосось',cauliflower_fresh:'Цветная капуста',cauliflower_frozen:'Цветная капуста',pear:'Груша'
};
function shortProductName(key){return SHORT_PRODUCT_NAMES[key]||catalog[key].name.replace(/\s*\([^)]*\)/gu,'').replace(/\s+/gu,' ').trim();}
function snapshotRecipe(record){if(record.state.foodSchema!==6){record.state.rows.forEach(row=>{if(!row.data)row.data=Object.fromEntries(['kcal','p','f','c'].map(k=>[k,LEGACY_CATALOG[row.key][k]]));});record.state.foodSchema=6;}return record;}
const PRODUCT_GROUPS=[
 ['Индейка',proteinKeys.filter(k=>k.startsWith('turkey'))],['Утка',proteinKeys.filter(k=>k.startsWith('duck'))],['Курица',['chicken_breast']],['Мясо',['beef_tenderloin','beef_shoulder','beef_shank','rabbit','lamb_lean','pork_lean']],['Лососёвые',['salmon_murmansk','salmon_generic','sockeye','trout']],['Белая рыба',['cod','hake','pollock','sea_bass']],
 ['Овощи · капустные',['broccoli_fresh','broccoli_frozen','cauliflower_fresh','cauliflower_frozen']],['Овощи · тыквенные',['pumpkin','zucchini','zucchini_regular','cucumber']],['Овощи · корнеплоды',['carrot','sweet_potato']],['Овощи · перец и фасоль',['paprika','pepper_ramiro','green_beans']],['Фрукты',['apple','pear']],['Ягоды',['blueberry','strawberry','cranberry_fresh','cranberry_frozen','raspberry_fresh','raspberry_frozen']],['Водоросли · ручной подбор',['wakame']],['Масло',['oil']]];
const BREED_GROUPS=[['Небольшие · обычно до 10 кг',['Чихуахуа','Померанский шпиц','Йоркширский терьер','Русский той','Мальтезе','Бишон фризе','Карликовый пудель','Папильон','Пекинес','Мопс','Джек-рассел-терьер','Такса']],['Средние · обычно 10–25 кг',['Русский охотничий спаниель','Английский кокер-спаниель','Американский кокер-спаниель','Бигль','Вельш-корги пемброк','Вельш-корги кардиган','Французский бульдог','Сиба-ину','Бордер-колли','Стаффордширский бультерьер']],['Крупные · обычно 25–45 кг',['Лабрадор-ретривер','Золотистый ретривер','Немецкая овчарка','Восточноевропейская овчарка','Бельгийская овчарка малинуа','Сибирский хаски','Самоед','Акита-ину','Американский стаффордширский терьер','Доберман','Ротвейлер','Далматин','Курцхаар','Дратхаар','Русская псовая борзая']],['Очень крупные · обычно от 45 кг',['Кане-корсо','Среднеазиатская овчарка','Кавказская овчарка','Немецкий дог','Сенбернар','Ньюфаундленд','Бернский зенненхунд']],['Другие',['Метис','Другая порода']]];

'use strict';
const $=id=>document.getElementById(id),keys=['kcal','p','f','c'],labels={kcal:'Ккал',p:'Белок',f:'Жир',c:'Углеводы'};
const uid=()=>globalThis.crypto?.randomUUID?.()||`r-${Date.now()}-${Math.random().toString(36).slice(2)}`;
const REFERENCE={kcal:277.5,p:[22,33],f:[9,22]};
const round1=n=>Math.round(n*10)/10;
function scaledTargets(center=320){const factor=center/REFERENCE.kcal;return {kcal:[Math.round(center*310/320),Math.round(center*330/320)],p:REFERENCE.p.map(x=>Math.round(x*factor)),f:REFERENCE.f.map(x=>Math.round(x*factor)),c:[null,null]};}
const initialTargets=()=>scaledTargets(320);
const MACRO_ENERGY={p:27.5*4/277.5,f:15.5*9/277.5,c:(277.5-27.5*4-15.5*9)/277.5};
const macroProfile=kcal=>({kcal,p:kcal*MACRO_ENERGY.p/4,f:kcal*MACRO_ENERGY.f/9,c:kcal*MACRO_ENERGY.c/4});
const defaultState=()=>({targets:initialTargets(),rows:[{key:'turkey_thigh',g:100,locked:false},{key:'pumpkin',g:100,locked:false},{key:'zucchini',g:80,locked:false},{key:'oil',g:5,locked:false}],batch:1,profile:{},thickness:30,targetSchema:5});
let state=defaultState(),recipes=[],activeId=null,openedRecord=null,openedBaseline=null,lastCompositionKey=null,customName=false,cloudReady=false,cloudBusy=false,localOK=true,apiMode='rest',csrfToken=null,authMode='login';
const valid=s=>!!s&&Array.isArray(s.rows)&&s.rows.length<=40&&s.rows.every(r=>Object.hasOwn(catalog,r.key)&&Number.isFinite(r.g)&&r.g>=0&&r.g<=10000&&(!r.data||keys.every(k=>Number.isFinite(r.data[k])&&r.data[k]>=0&&r.data[k]<=1000)))&&s.targets&&keys.every(k=>Array.isArray(s.targets[k])&&s.targets[k].length===2&&s.targets[k].every(n=>n===null||Number.isFinite(n)&&n>=0&&n<=10000))&&Number.isInteger(s.batch)&&s.batch>=1&&s.batch<=100&&(!s.profile||typeof s.profile==='object')&&(!s.thickness||[10,15,20,25,30].includes(s.thickness));
const weightStep=r=>r.key==='oil'?1:5;
const quantize=(r,g)=>Math.round(g/weightStep(r))*weightStep(r);
try{const raw=JSON.parse(localStorage.getItem('nutrition_v3')||'null');if(valid(raw?.state)){state=raw.state;activeId=null;customName=!!raw.customName;}else{const old=JSON.parse(localStorage.getItem('evening_v2')||'null');if(valid(old)){state=old;state.targets.p=[22,33];state.targets.f=[9,22];state.thickness=10;state.rows.forEach(r=>r.g=quantize(r,r.g));}}recipes=JSON.parse(localStorage.getItem('nutrition_recipes_v3')||'null')||JSON.parse(localStorage.getItem('evening_recipes_v2')||'[]');if(!Array.isArray(recipes))recipes=[];recipes=recipes.filter(r=>r&&typeof r.name==='string'&&r.name.length<=100&&valid(r.state)).map(r=>({...r,id:r.id||uid(),updatedAt:r.updatedAt||new Date().toISOString(),origin:r.origin||'local'})).map(snapshotRecipe);}catch{localOK=false;}
if(state.targetSchema!==5){state.targets=initialTargets();state.targetSchema=5;}
const data=r=>r.data||catalog[r.key];
function totals(rows=state.rows){return rows.reduce((a,r)=>{keys.forEach(k=>a[k]+=data(r)[k]*r.g/100);return a;},{kcal:0,p:0,f:0,c:0});}
function el(tag,text,cls){const n=document.createElement(tag);if(text!==undefined)n.textContent=text;if(cls)n.className=cls;return n;}
function number(value,min=0,step=1){const n=el('input');n.type='number';n.min=min;n.step=step;n.value=value??'';return n;}
function makeLabel(text,input){const n=el('label',text);n.append(input);return n;}
const fruitKeys=['apple','pear','blueberry','strawberry','cranberry_fresh','cranberry_frozen','raspberry_fresh','raspberry_frozen'];
function recipeTitle(){const sum=new Map;state.rows.filter(r=>r.g>0).forEach(r=>sum.set(r.key,(sum.get(r.key)||0)+r.g));const largest=filter=>[...sum].filter(([k])=>filter(k)).sort((a,b)=>b[1]-a[1])[0]?.[0];const p=largest(k=>proteinKeys.includes(k));const v=largest(k=>plantKeys.includes(k)&&!fruitKeys.includes(k)&&k!=='wakame')||largest(k=>fruitKeys.includes(k));const name=k=>catalog[k].name.replace(/\s*\([^)]*\)/g,'').replace('Индейка Индилайт','Индейка').split(',')[0];return [p,v].filter(Boolean).map(k=>name(k)).join(' + ')||'Новый рецепт';}
function cleanName(name){return String(name||'').replace(/[\p{Extended_Pictographic}\uFE0F]/gu,'').replace(/\s+/g,' ').trim();}
function compositionKey(){return JSON.stringify([state.rows.map(r=>r.key),recipeTitle()]);}
function recipeFingerprint(recipeState,name){return JSON.stringify({rows:recipeState.rows.map(r=>({key:r.key,g:r.g,data:keys.map(k=>data(r)[k])})),batch:recipeState.batch,name:cleanName(name)});}
function syncRecipeActions(){const current=recipes.find(r=>r.id===activeId);if(activeId&&!current){activeId=null;openedRecord=null;openedBaseline=null;}
$('saveRecipe').textContent='Сохранить новый рецепт';$('saveRecipe').disabled=cloudBusy;$('updateRecipe').hidden=!activeId;$('updateRecipe').disabled=cloudBusy||!openedBaseline||openedBaseline===recipeFingerprint(state,$('recipeName').value);
$('recipeContext').textContent=activeId?`Открыт «${cleanName(current.name)}». Исходный рецепт изменится только по кнопке «Обновить открытый».`:'';
$('addOil').disabled=state.rows.some(r=>r.key==='oil');$('addOil').title=$('addOil').disabled?'Масло уже добавлено':'';}
function notice(text){$('fitMessage').textContent=text;}
function persist(){state.autoName=!customName;try{localStorage.setItem('nutrition_v3',JSON.stringify({state,customName,name:$('recipeName').value}));localStorage.setItem('nutrition_recipes_v3',JSON.stringify(recipes.filter(r=>r.origin!=='cloud')));}catch{localOK=false;}$('storageStatus').textContent=cloudBusy?'Синхронизация…':cloudReady?'Сохранение в облако':localOK?'На этом устройстве':'Хранилище недоступно — сделайте экспорт';}
function targetError(){return keys.some(k=>{const [lo,hi]=state.targets[k];return(k!=='c'&&(lo===null||hi===null))||(lo!==null&&hi!==null&&lo>hi);});}
function syncMacroTargetsFromCalories(){const [lo,hi]=state.targets.kcal;if(lo===null||hi===null||!Number.isFinite(lo)||!Number.isFinite(hi)||lo>hi)return;const suggested=scaledTargets((lo+hi)/2);for(const key of ['p','f']){state.targets[key]=suggested[key];state.targets[key].forEach((value,index)=>{const field=document.querySelector(`[data-target="${key}-${index}"]`);if(field)field.value=value;});}}
function renderTargets(){$('targets').replaceChildren();keys.forEach(k=>{const box=el('div',undefined,'target-item'),range=el('div',undefined,'target-inputs');box.append(el('label',labels[k]));[0,1].forEach(i=>{if(i)range.append(el('span','–'));const n=number(state.targets[k][i],0,1);n.max=10000;n.placeholder='—';n.setAttribute('aria-label',`${labels[k]} ${i?'максимум':'минимум'}`);n.dataset.target=`${k}-${i}`;n.oninput=()=>{markManualTargets();if(n.value!==''&&(!Number.isFinite(n.valueAsNumber)||n.valueAsNumber<0||n.valueAsNumber>10000))return;state.targets[k][i]=n.value===''?null:n.valueAsNumber;if(k==='kcal')syncMacroTargetsFromCalories();update();};n.onchange=()=>{if(n.value!==''&&Number.isFinite(n.valueAsNumber)){state.targets[k][i]=Math.round(n.valueAsNumber);n.value=state.targets[k][i];if(k==='kcal')syncMacroTargetsFromCalories();update();}};range.append(n);});box.append(range,el('small',k==='kcal'?'':'г'));$('targets').append(box);});}
function renderRows(){$('ingredients').replaceChildren();state.rows.forEach((r,i)=>{const card=el('article',undefined,'ingredient'),row=el('div',undefined,'ingredient-main'),select=el('select');const options=r.key==='oil'?['oil']:proteinKeys.includes(r.key)?proteinKeys:plantKeys;PRODUCT_GROUPS.forEach(([title,list])=>{const matching=list.filter(k=>options.includes(k));if(matching.length){const group=el('optgroup');group.label=title;matching.forEach(k=>group.append(new Option(catalog[k].name,k)));select.append(group);}});select.value=r.key;select.title=catalog[r.key].name;select.setAttribute('aria-label',`Продукт ${i+1}`);select.onchange=()=>{r.key=select.value;delete r.data;if(r.key==='wakame'){r.g=0;r.locked=true;}renderRows();update();};
const weight=number(r.g,0,weightStep(r));weight.max=10000;weight.setAttribute('aria-label',`Вес ${catalog[r.key].name}, г`);const control=el('div',undefined,'weight-control');for(const direction of [-1,1]){const b=el('button',direction<0?'−':'+');b.setAttribute('aria-label',`${direction<0?'Уменьшить':'Увеличить'} вес на ${weightStep(r)} г`);b.onclick=()=>{r.g=Math.max(0,Math.min(10000,r.g+direction*weightStep(r)));weight.value=r.g;update();};if(direction<0)control.append(b,weight);else control.append(b);}weight.oninput=()=>{if(weight.value===''||!Number.isFinite(weight.valueAsNumber)||weight.valueAsNumber<0||weight.valueAsNumber>10000)return;r.g=weight.valueAsNumber;update();};weight.onchange=()=>{r.g=quantize(r,r.g);weight.value=r.g;update();};
const lock=el('input');lock.type='checkbox';lock.checked=!!r.locked;lock.disabled=r.key==='wakame';lock.setAttribute('aria-label','Закрепить вес '+catalog[r.key].name);lock.onchange=()=>{r.locked=lock.checked;persist();};const ll=el('label',undefined,'lock');ll.append(lock);const remove=el('button','×','remove');remove.setAttribute('aria-label','Удалить '+catalog[r.key].name);remove.onclick=()=>{state.rows.splice(i,1);renderRows();update();};const picker=el('div',undefined,'product-picker');picker.append(foodIcon(r.key,28),select);row.append(picker,control,ll,remove);card.append(row);
const details=el('details',undefined,'ingredient-details');details.append(el('summary',r.key==='wakame'?'КБЖУ / 100 г · йод: только ручной ввод':'КБЖУ / 100 г'+(r.data?' · сохранено':'')));const fields=el('div',undefined,'kbju-fields');keys.forEach(k=>{const n=number(data(r)[k],0,.1);n.max=1000;n.oninput=()=>{if(!n.validity.valid||n.value==='')return;r.data={...data(r),[k]:n.valueAsNumber};update();};fields.append(makeLabel(labels[k],n));});const reset=el('button','Сбросить','text-button');reset.onclick=()=>{delete r.data;renderRows();update();};fields.append(reset);details.append(fields);card.append(details);$('ingredients').append(card);});}
function add(key,g){if(state.rows.length>=40){notice('Не более 40 строк.');return;}state.rows.push({key,g,locked:false});renderRows();update();}
$('addProtein').onclick=()=>add('turkey_breast',50);$('addPlant').onclick=()=>add('zucchini',30);$('addOil').onclick=()=>{if(state.rows.some(r=>r.key==='oil')){notice('Масло уже в составе.');return;}add('oil',0);};
function update(){const signature=compositionKey();if(lastCompositionKey!==null&&signature!==lastCompositionKey)customName=false;lastCompositionKey=signature;const t=totals();$('mass').textContent=`${state.rows.reduce((s,r)=>s+r.g,0)} г / порция`;$('metrics').replaceChildren();keys.forEach(k=>{const [lo,hi]=state.targets[k],ok=(lo===null||t[k]>=lo-1e-8)&&(hi===null||t[k]<=hi+1e-8),m=el('div',undefined,'metric'),top=el('div',undefined,'metric-top');top.append(el('span',labels[k]),el('strong',t[k].toFixed(1)+(k==='kcal'?'':' г')));m.append(top,el('small',lo===null&&hi===null?'Без ограничения':`${lo??'—'}–${hi??'—'} ${k==='kcal'?'ккал':'г'}`));const track=el('div',undefined,'track'),fill=el('div',undefined,'fill '+(ok?'ok':''));fill.style.width=Math.min(100,t[k]/(hi||lo||Math.max(t[k],1))*100)+'%';track.append(fill);m.append(track,el('div',lo===null&&hi===null?'Справочно':ok?'✓ В диапазоне':lo!==null&&t[k]<lo?`−${(lo-t[k]).toFixed(1)} до цели`:`+${(t[k]-hi).toFixed(1)} сверх цели`,'status '+(ok?'ok':'')));$('metrics').append(m);});if(!customName)$('recipeName').value=recipeTitle();syncRecipeActions();$('shopping').replaceChildren();const list=el('div',undefined,'shopping-list');const grouped=new Map;state.rows.filter(r=>r.g>0).forEach(r=>grouped.set(r.key,(grouped.get(r.key)||0)+r.g*state.batch));for(const [key,g]of grouped){const item=el('span',undefined,'shopping-item');item.append(foodIcon(key,24),document.createTextNode(`${catalog[key].name}: ${g.toFixed(0)} г`));list.append(item);}$('shopping').append(list);renderCooking();estimate();renderNutrition();const invalidProfile=state.targetMode==='profile'&&!lastEnergyModel;$('fit').disabled=invalidProfile;$('targetProfileStatus').textContent=invalidProfile?'Проверьте профиль или переключите цели на ручные.':'';if(targetError())notice('Проверьте диапазоны целей.');persist();}
// Search uses kitchen-measurable increments, never fractional oil or vegetables.
function fitRows(rows,targets){const scales={kcal:15,p:3,f:2,c:3},start=rows.map(r=>quantize(r,r.g)),free=rows.map((r,i)=>!r.locked&&r.key!=='wakame'?i:-1).filter(i=>i>=0),vectors=rows.map(r=>keys.map(k=>data(r)[k]/100));
const score=w=>{const t=[0,0,0,0];w.forEach((g,i)=>vectors[i].forEach((v,k)=>t[k]+=v*g));return keys.reduce((s,k,j)=>{const [lo,hi]=targets[k],d=lo!==null&&t[j]<lo?lo-t[j]:hi!==null&&t[j]>hi?t[j]-hi:0;return s+(d/scales[k])**2;},0)+w.reduce((s,g,i)=>s+((g-start[i])/Math.max(30,start[i]))**2,0)*1e-7;};
const seeds=[1,.5,1.5,2].map(factor=>rows.map((r,i)=>free.includes(i)?quantize(r,start[i]*factor):r.g));
const proteinFree=free.filter(i=>proteinKeys.includes(rows[i].key)),oilFree=free.filter(i=>rows[i].key==='oil');
// Build nutrition-informed starts as well as local weight variations. This avoids filling an energy deficit with low-energy vegetables.
for(const desiredP of [targets.p[0],(targets.p[0]+targets.p[1])/2,targets.p[1]]){const w=rows.map(r=>r.g),baseP=w.reduce((sum,g,i)=>sum+(proteinFree.includes(i)?0:vectors[i][1]*g),0),proteinP=proteinFree.reduce((sum,i)=>sum+vectors[i][1]*Math.max(start[i],5),0);if(proteinP>0){const factor=Math.max(0,desiredP-baseP)/proteinP;proteinFree.forEach(i=>w[i]=quantize(rows[i],Math.min(10000,Math.max(start[i],5)*factor)));}
if(oilFree.length){oilFree.forEach(i=>w[i]=0);const kcal=w.reduce((sum,g,i)=>sum+vectors[i][0]*g,0),fat=w.reduce((sum,g,i)=>sum+vectors[i][2]*g,0),i=oilFree[0],needed=Math.max(0,((targets.kcal[0]+targets.kcal[1])/2-kcal)/Math.max(vectors[i][0],.001),(targets.f[0]-fat)/Math.max(vectors[i][2],.001));w[i]=quantize(rows[i],Math.min(10000,needed));}seeds.push(w);}
let best=rows.map(r=>r.g),bestScore=score(best);for(const seed of seeds){const w=seed.slice();for(const jump of [50,20,10,5,1]){for(let pass=0;pass<80;pass++){let changed=false,current=score(w);for(const i of free){const original=w[i],step=Math.max(weightStep(rows[i]),Math.round(jump/weightStep(rows[i]))*weightStep(rows[i]));for(const direction of [-1,1]){w[i]=Math.max(0,Math.min(10000,original+direction*step));const next=score(w);if(next<current-1e-12){current=next;changed=true;break;}w[i]=original;}}if(!changed)break;}}const s=score(w);if(s<bestScore){best=w.slice();bestScore=s;}}
// Paired moves escape local minima introduced by 5 g rounding.
for(let pass=0;pass<25;pass++){let improved=false;outer:for(const i of free)for(const j of free){if(j<=i)continue;for(const di of [-1,1])for(const dj of [-1,1]){const w=best.slice();w[i]=Math.max(0,Math.min(10000,w[i]+di*weightStep(rows[i])));w[j]=Math.max(0,Math.min(10000,w[j]+dj*weightStep(rows[j])));const s=score(w);if(s<bestScore-1e-12){best=w;bestScore=s;improved=true;break outer;}}}if(!improved)break;}
for(let pass=0;pass<12;pass++){let changed=false;outer:for(const i of free)for(const j of free){if(j<=i)continue;for(const nutrient of [0,1,2]){if(vectors[i][nutrient]<=0||vectors[j][nutrient]<=0)continue;const si=weightStep(rows[i]),sj=weightStep(rows[j]),balanced=Math.min(10000,Math.max(sj,Math.round(si*vectors[i][nutrient]/vectors[j][nutrient]/sj)*sj));for(const d of [-1,1]){const w=best.slice();w[i]=Math.max(0,Math.min(10000,w[i]+d*si));w[j]=Math.max(0,Math.min(10000,w[j]-d*balanced));const next=score(w);if(next<bestScore-1e-12){best=w;bestScore=next;changed=true;break outer;}}}}if(!changed)break;}
return rows.map((r,i)=>({...r,g:r.locked?r.g:quantize(r,best[i])}));}
$('fit').onclick=()=>{if(targetError())return;if(!state.rows.length){notice('Добавьте белок или овощи для расчёта.');return;}if(!state.rows.some(r=>!r.locked&&r.key!=='wakame')){notice('Нет свободных строк для подбора.');return;}state.rows=fitRows(state.rows,state.targets);renderRows();update();const t=totals(),ok=keys.every(k=>{const [a,b]=state.targets[k];return(a===null||t[k]>=a-1e-8)&&(b===null||t[k]<=b+1e-8);});notice(ok?'✓ Подобрано. Шаг: продукты 5 г, масло 1 г.':'Ближайший найденный вариант: проверьте отклонения.'+(t.f<(state.targets.f[0]??0)&&!state.rows.some(r=>r.key==='oil')?' Для достижения цели по жиру можно добавить масло.':' Измените состав или цели.'));};
$('resetTargets').onclick=()=>{markManualTargets();state.targets=initialTargets();renderTargets();update();};$('recipeName').oninput=()=>{customName=$('recipeName').value.trim()!=='';syncRecipeActions();persist();};$('batch').value=state.batch;$('batch').oninput=()=>{if($('batch').validity.valid&&$('batch').value){state.batch=$('batch').valueAsNumber;update();}};
BREED_GROUPS.forEach(([title,names])=>{const group=el('optgroup');group.label=title;names.forEach(name=>{const option=new Option(name,name);option.defaultSelected=name==='Русский охотничий спаниель';option.selected=option.defaultSelected;group.append(option);});$('breed').append(group);});
function localDateValue(date=new Date()){return `${date.getFullYear()}-${String(date.getMonth()+1).padStart(2,'0')}-${String(date.getDate()).padStart(2,'0')}`;}
function validPreparationDate(value){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return false;const [y,m,d]=value.split('-').map(Number),date=new Date(0);date.setFullYear(y,m-1,d);date.setHours(12,0,0,0);return y>=1900&&y<=9999&&date.getFullYear()===y&&date.getMonth()===m-1&&date.getDate()===d;}
function displayPreparationDate(value){return value.split('-').reverse().join('.');}
function parsePreparationDate(value){if(!/^\d{2}\.\d{2}\.\d{4}$/.test(value))return null;const iso=value.split('.').reverse().join('-');return validPreparationDate(iso)?iso:null;}
function formatRussianDateInput(input){const start=input.selectionStart??input.value.length,count=(input.value.slice(0,start).match(/\d/g)||[]).length,digits=input.value.replace(/\D/g,'').slice(0,8),value=digits.slice(0,2)+(digits.length>2?'.'+digits.slice(2,4):'')+(digits.length>4?'.'+digits.slice(4):'');input.value=value;let position=0,seen=0;while(position<value.length&&seen<count){if(/\d/.test(value[position]))seen++;position++;}input.setSelectionRange(position,position);}

function preparedDate(){const value=parsePreparationDate($('preparedDate').value);if(!value){notice('Введите дату приготовления: ДД.ММ.ГГГГ.');return null;}return value;}
$('preparedDate').value=displayPreparationDate(localDateValue());$('preparedDate').oninput=()=>formatRussianDateInput($('preparedDate'));$('pdf').onclick=()=>printRecipe();
function renderRecipes(){$('recipes').replaceChildren();$('recipes').className='recipe-list';for(const r of recipes){const line=el('div',undefined,'recipe'+(r.id===activeId?' active':'')),load=el('button',undefined,'recipe-load'),icons=el('span',undefined,'product-icons');[...new Set(r.state.rows.filter(row=>row.g>0).map(row=>row.key))].slice(0,4).forEach(k=>icons.append(foodIcon(k,30)));load.append(icons,el('span',cleanName(r.name),'recipe-title'));load.onclick=()=>loadRecipe(r.id);const pdf=el('button',undefined,'secondary recipe-pdf');pdf.append(documentIcon());pdf.setAttribute('aria-label','PDF '+cleanName(r.name));pdf.title='Печать / PDF';pdf.onclick=()=>printRecipe(r);const remove=el('button','×','remove');remove.setAttribute('aria-label','Удалить '+r.name);remove.onclick=()=>removeRecipe(r.id);line.append(load,pdf,remove);$('recipes').append(line);}$('libraryStatus').textContent=recipes.length?'':cloudReady?'Сохраните понравившийся расчёт в «Итоге».':'Сохраните понравившийся расчёт в «Итоге». Пока рецепты доступны на этом устройстве.';}
function loadRecipe(id){if(cloudBusy){notice('Дождитесь завершения сохранения.');return;}const r=recipes.find(x=>x.id===id);if(!r)return;const loaded=structuredClone(r.state);state.rows=loaded.rows;state.rows.forEach(row=>row.g=quantize(row,row.g));state.batch=loaded.batch;state.thickness=loaded.thickness||10;activeId=r.id;openedRecord=structuredClone(r);customName=loaded.autoName!==true;$('recipeName').value=cleanName(r.name);lastCompositionKey=compositionKey();if(!customName)$('recipeName').value=recipeTitle();openedBaseline=recipeFingerprint(state,$('recipeName').value);renderRows();applyProfile();update();renderRecipes();notice('');}
async function saveRecipe(mode='new'){if(state.targetMode==='profile'&&!lastEnergyModel){notice('Проверьте профиль или выберите ручные цели.');return;}if(!valid(state)||targetError()){notice('Проверьте значения перед сохранением.');return;}if(!state.rows.some(r=>r.g>0)||totals().kcal<=0){notice('Добавьте продукты с положительным весом.');return;}if(cloudBusy)return;const updating=mode==='update',old=updating?openedRecord:null;if(updating&&(!old||!activeId)){notice('Сначала откройте рецепт из списка.');return;}const name=cleanName($('recipeName').value)||recipeTitle(),fingerprint=recipeFingerprint(state,name);
if(!updating&&recipes.some(r=>recipeFingerprint(r.state,r.name)===fingerprint)){notice('Такой рецепт уже сохранён. Измените состав, граммы или название для нового варианта.');return;}
state.autoName=!customName;const recipeState=structuredClone(state);recipeState.foodSchema=6;recipeState.rows.forEach(row=>{row.data=Object.fromEntries(keys.map(k=>[k,data(row)[k]]));});const recipe={id:updating?activeId:uid(),name,state:recipeState,updatedAt:new Date().toISOString(),origin:'local'};if(updating&&old.revision)recipe.revision=old.revision;
if(cloudReady){cloudBusy=true;syncRecipeActions();persist();try{const saved=await cloudRequest('/api/recipes/'+encodeURIComponent(recipe.id),{method:'PUT',body:JSON.stringify(recipe)});recipe.revision=saved.revision;recipe.updatedAt=saved.updatedAt||recipe.updatedAt;recipe.origin='cloud';}catch(e){cloudBusy=false;syncRecipeActions();persist();notice(e.status===409?'Рецепт изменён на другом устройстве. Откройте свежую версию после синхронизации или сохраните новый рецепт.':'Не удалось сохранить в облако. Черновик остаётся на устройстве; повторите сохранение.');return;}cloudBusy=false;}
const index=recipes.findIndex(r=>r.id===recipe.id);if(index>=0)recipes[index]=recipe;else recipes.unshift(recipe);
if(updating){openedRecord=structuredClone(recipe);openedBaseline=fingerprint;}else{activeId=null;openedRecord=null;openedBaseline=null;}
renderRecipes();update();notice(`${updating?'Рецепт обновлён':'Новый рецепт сохранён'}${cloudReady?' в облако':' на устройстве'}.`);}
$('saveRecipe').onclick=()=>saveRecipe('new');$('updateRecipe').onclick=()=>saveRecipe('update');
async function removeRecipe(id){const r=recipes.find(x=>x.id===id);if(!r||!confirm(`Удалить «${r.name}»?`))return;if(cloudBusy)return;if(r.origin==='cloud'){if(!cloudReady){notice('Для удаления облачного рецепта нужен вход.');return;}try{await cloudRequest('/api/recipes/'+encodeURIComponent(id),{method:'DELETE',headers:{'If-Match':r.revision||''}});}catch(e){notice(e.status===409?'Рецепт изменён на другом устройстве. Синхронизируйте.':'Удалить не удалось.');return;}}recipes=recipes.filter(x=>x.id!==id);if(activeId===id){activeId=null;openedRecord=null;openedBaseline=null;}renderRecipes();update();}
$('newRecipe').onclick=()=>{if(cloudBusy)return;state.rows=[];state.batch=1;$('batch').value=1;activeId=null;openedRecord=null;openedBaseline=null;customName=false;lastCompositionKey=null;renderRows();update();renderRecipes();notice('Новый расчёт. Цели и профиль сохранены.');};
$('export').onclick=()=>{const blob=new Blob([JSON.stringify({version:3,state,recipes},null,2)],{type:'application/json'}),url=URL.createObjectURL(blob),a=el('a');a.href=url;a.download='nutrition-recipes.json';a.click();setTimeout(()=>URL.revokeObjectURL(url),1000);};
$('import').onchange=async e=>{if(cloudBusy){e.target.value='';return;}try{const file=e.target.files[0];if(!file)return;if(file.size>2000000)throw Error();const v=JSON.parse(await file.text());if(![2,3].includes(v.version)||!valid(v.state)||!Array.isArray(v.recipes)||v.recipes.length>500||!v.recipes.every(r=>typeof r.name==='string'&&r.name.length<=100&&valid(r.state)))throw Error();state.rows=structuredClone(v.state.rows);state.batch=v.state.batch;state.thickness=v.state.thickness||10;state.rows.forEach(r=>r.g=quantize(r,r.g));activeId=null;openedRecord=null;openedBaseline=null;customName=false;lastCompositionKey=null;const added=v.recipes.map(r=>snapshotRecipe({id:uid(),name:r.name,state:r.state,origin:'local',updatedAt:new Date().toISOString()}));recipes=[...added,...recipes];renderTargets();renderRows();applyProfile();update();renderRecipes();notice('Импортировано на устройство. Откройте рецепт и сохраните в облако.');}catch{notice('Нужен корректный JSON-экспорт до 2 МБ.');}e.target.value='';};
async function cloudRequest(path,options={}){const controller=new AbortController(),timeout=setTimeout(()=>controller.abort(),15000);try{const headers={'Content-Type':'application/json',...(csrfToken?{'X-CSRF-Token':csrfToken}:{}),...(options.headers||{})};let endpoint=path;if(apiMode==='php'){const url=new URL('api/index.php',document.baseURI);url.searchParams.set('path',path.replace(/^\/api\//,''));endpoint=url.href;}const response=await fetch(endpoint,{credentials:'same-origin',...options,headers,signal:controller.signal});if(!response.ok){let msg='Ошибка сервера';try{msg=(await response.json()).error||msg;}catch{}const e=Error(msg);e.status=response.status;throw e;}return response.status===204?null:await response.json();}finally{clearTimeout(timeout);}}
async function refreshCloud(){if(!cloudReady||cloudBusy)return;cloudBusy=true;persist();try{const result=await cloudRequest('/api/recipes');if(!Array.isArray(result.recipes)||!result.recipes.every(r=>typeof r.name==='string'&&valid(r.state)))throw Error();const local=recipes.filter(r=>r.origin!=='cloud');const cloud=result.recipes.map(r=>snapshotRecipe({...r,origin:'cloud'}));recipes=[...cloud,...local.filter(r=>!cloud.some(c=>c.id===r.id))];renderRecipes();$('libraryStatus').textContent='Рецепты синхронизированы.';}catch{$('libraryStatus').textContent='Не удалось загрузить облачные рецепты. Повторите синхронизацию.';}finally{cloudBusy=false;syncRecipeActions();persist();}}
function accountNotice(text){$('accountMessage').textContent=text;$('accountMessage').hidden=false;}
function setAuthMode(mode){authMode=mode;const login=mode==='login',register=mode==='register',forgot=mode==='forgot',reset=mode==='reset',bind=mode==='email',change=mode==='password';$('authTitle').textContent=register?'Регистрация':forgot?'Восстановить пароль':reset?'Новый пароль':bind?'Привязать почту':change?'Сменить пароль':'Вход';$('authSubmit').textContent=register?'Создать аккаунт':forgot?'Отправить ссылку':reset||change?'Сохранить пароль':bind?'Подтвердить почту':'Войти';$('authTabs').hidden=reset||bind||change;$('resetHelp').hidden=!reset;$('usernameLabel').hidden=reset||bind||change;$('authUsername').disabled=reset||bind||change;$('authUsername').required=login||register||forgot;$('authUsername').maxLength=254;$('authUsername').removeAttribute('pattern');$('authUsername').type=login?'text':'email';$('authUsername').autocomplete=login?'username':'email';$('authUsername').placeholder=login?'Email или прежний логин':'name@example.ru';$('usernameText').textContent=login?'Email или прежний логин':'Email';$('passwordLabel').hidden=forgot;$('authPassword').disabled=forgot;$('authPassword').required=!forgot;$('authPassword').minLength=register||reset||change?15:1;$('authPassword').placeholder=register||reset||change?'Не менее 15 символов':bind?'Текущий пароль':'';$('authPassword').autocomplete=login||bind?'current-password':'new-password';$('passwordText').textContent=bind?'Текущий пароль':reset||change?'Новый пароль':'Пароль';$('currentPasswordLabel').hidden=!change;$('authCurrentPassword').disabled=!change;$('authCurrentPassword').required=change;$('confirmLabel').hidden=!(register||reset||change);$('authConfirm').disabled=!(register||reset||change);$('authConfirm').required=register||reset||change;$('emailLabel').hidden=!bind;$('authEmail').disabled=!bind;$('authEmail').required=bind;$('authMessage').textContent='';$('authHint').textContent=register?'Подтвердите почту по ссылке в письме.':forgot?'Укажите почту регистрации или подтверждённый адрес аккаунта.':bind?'Войдите по старому логину, привяжите и подтвердите email — рецепты сохранятся.':'';}
function openAuth(mode){setAuthMode(mode);if(!$('authDialog').open)$('authDialog').showModal();}
let resetToken=null;
$('passwordSignIn').onclick=()=>openAuth('login');$('changePassword').onclick=()=>openAuth('password');$('manageEmail').onclick=()=>openAuth('email');$('closeAuth').onclick=()=>$('authDialog').close();$('authDialog').addEventListener('close',()=>{for(const id of ['authPassword','authConfirm','authCurrentPassword'])$(id).value='';resetToken=null;});document.querySelectorAll('[data-auth-mode]').forEach(button=>button.onclick=()=>{resetToken=null;setAuthMode(button.dataset.authMode);});
$('authForm').onsubmit=async event=>{event.preventDefault();const mode=authMode;if(['register','reset','password'].includes(mode)&&$('authPassword').value!==$('authConfirm').value){$('authMessage').textContent='Пароли не совпадают.';return;}$('authSubmit').disabled=true;try{const body=mode==='forgot'?{email:$('authUsername').value}:mode==='reset'?{token:resetToken,password:$('authPassword').value}:mode==='email'?{email:$('authEmail').value,password:$('authPassword').value}:mode==='password'?{currentPassword:$('authCurrentPassword').value,password:$('authPassword').value}:{username:$('authUsername').value,password:$('authPassword').value};const result=await cloudRequest('/api/auth/'+mode,{method:'POST',body:JSON.stringify(body)});if(result.csrf)csrfToken=result.csrf;for(const id of ['authPassword','authConfirm','authCurrentPassword'])$(id).value='';if(mode==='forgot'||mode==='email'){$('authMessage').textContent=result.message;return;}if(mode==='reset'){resetToken=null;recipes=recipes.filter(r=>r.origin!=='cloud');state=defaultState();resetAccountPreferences();activeId=null;openedRecord=null;openedBaseline=null;customName=false;lastCompositionKey=null;renderTargets();renderRows();applyProfile();update();renderRecipes();await initCloud();setAuthMode('login');$('authMessage').textContent=result.message;return;}await initCloud();$('authDialog').close();if(mode==='register')accountNotice(result.verificationSent?'Аккаунт создан. Проверьте почту.':'Аккаунт создан. Письмо не отправлено; повторите через «Подтвердить почту».');if(mode==='password')notice('Пароль изменён.');}catch(e){$('authMessage').textContent=e.message;}finally{$('authSubmit').disabled=false;}};
$('signOut').onclick=async()=>{try{await cloudRequest('/api/auth/logout',{method:'POST',body:'{}'});cloudReady=false;csrfToken=null;recipes=recipes.filter(r=>r.origin!=='cloud');state=defaultState();resetAccountPreferences();activeId=null;openedRecord=null;openedBaseline=null;customName=false;lastCompositionKey=null;$('signOut').hidden=true;$('changePassword').hidden=true;$('manageEmail').hidden=true;renderTargets();renderRows();applyProfile();update();renderRecipes();await initCloud();}catch{notice('Выйти не удалось. Повторите.');}};
async function handleAccountLink(){const hash=location.hash;if(!/^#(?:reset|verify)=/.test(hash))return;history.replaceState(null,'',location.pathname+location.search);const match=hash.match(/^#(reset|verify)=([a-f0-9]{64})$/);if(!match){accountNotice('Ссылка недействительна. Запросите новую.');return;}if(!csrfToken){accountNotice('Для этой ссылки нужен сайт с подключённым сервером.');return;}if(match[1]==='reset'){resetToken=match[2];openAuth('reset');return;}try{const result=await cloudRequest('/api/auth/verify-email',{method:'POST',body:JSON.stringify({token:match[2]})});await initCloud();accountNotice(result.message);}catch(e){accountNotice(e.message);}}
$('refreshCloud').onclick=refreshCloud;

function alignRecipeLibrary(){const picker=document.querySelector('.product-picker'),ingredient=document.querySelector('.ingredient'),scroll=$('recipesScroll');if(!picker||!ingredient)return;scroll.style.marginTop='0px';if(matchMedia('(min-width:801px)').matches){scroll.style.marginTop=Math.max(0,picker.getBoundingClientRect().top-scroll.getBoundingClientRect().top)+'px';}document.querySelector('.library').style.setProperty('--recipe-pitch',ingredient.getBoundingClientRect().height+'px');}
new ResizeObserver(()=>requestAnimationFrame(alignRecipeLibrary)).observe(document.querySelector('.composition'));
window.addEventListener('resize',alignRecipeLibrary);document.fonts.ready.then(alignRecipeLibrary);


const profileIds=['dogName','breed','dogWeight','birthDate','age','sex','neutered','lifeStage','matingDate','birthLitterDate','puppies','preWeight','puppySolids','adultWeight','energyMethod','activity','customK','housing','weather','share','homeMeals','dryName','dryGrams','dryKcal','dryProtein','dryFat','dryCarbs'];
const PROFILE_DEFAULTS=Object.fromEntries(profileIds.map(k=>[k,$(k).value]));
let profileRevision=0,profileDirty=false,profileSaving=false,profileSaveTimer=null,profileConflict=false,profileOwner=null;
function calendarAge(value,today=localDateValue()){
 value=value?.includes('.')?parsePreparationDate(value):value;if(!value||!validPreparationDate(value)||value>today)return null;
 const [y,m,d]=value.split('-').map(Number),[ty,tm,td]=today.split('-').map(Number);
 const days=Math.floor((Date.UTC(ty,tm-1,td)-Date.UTC(y,m-1,d))/86400000);let months=(ty-y)*12+tm-m;if(td<d)months--;
 const completeYears=ty-y-((tm<m||tm===m&&td<d)?1:0),anniversary=Date.UTC(y+completeYears,m-1,d),next=Date.UTC(y+completeYears+1,m-1,d),years=completeYears+(Date.UTC(ty,tm-1,td)-anniversary)/(next-anniversary);return {years,days,months,text:months>=12?`${Math.floor(months/12)} г. ${months%12} мес.`:months>0?`${months} мес.`:`${days} дн.`};
}
function elapsedDays(value,today=localDateValue()){value=value?.includes('.')?parsePreparationDate(value):value;if(!value||!validPreparationDate(value)||value>today)return null;return Math.floor((Date.parse(today+'T12:00:00Z')-Date.parse(value+'T12:00:00Z'))/86400000);}
function energyModel(p){
 const metabolic=p.weight**.75,rer=70*metabolic;let k=110,description='',base,daily;
 if(p.stage==='pregnant'){
  if(p.age<1)throw Error('Для растущей беременной собаки нужен индивидуальный расчёт рациона.');
  if(p.sex!=='female'||p.neutered!=='intact')throw Error('Беременность доступна для нестерилизованной суки.');
  const day=elapsedDays(p.matingDate);if(day===null||day>70)throw Error('Проверьте дату вязки: нужен текущий срок беременности.');
  if(!(p.preWeight>0))throw Error('Укажите вес до беременности.');
  base=132*p.preWeight**.75+(day>=28?26*p.preWeight:0);k=null;description=`FEDIAF · беременность · ${day+1}-й день`;
 }else if(p.stage==='lactating'){
  if(p.age<1)throw Error('Для растущей кормящей собаки нужен индивидуальный расчёт рациона.');
  if(p.sex!=='female'||p.neutered!=='intact')throw Error('Лактация доступна для нестерилизованной суки.');
  const day=elapsedDays(p.birthLitterDate);if(day===null)throw Error('Укажите дату родов.');
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
 daily=base*(1+p.weather/100);const naturalDaily=daily*p.share/100,portion=naturalDaily/(p.homeMeals||1);
 return {daily,rer,portion,naturalDaily,k,base,description,dayMacros:macroProfile(daily),portionMacros:macroProfile(portion),stage:p.stage,age:p.age};
}
function readProfile(){
 const dob=$('birthDate').value,age=dob?calendarAge(dob):null;
 if(dob&&(!age||age.years>30))throw Error('Проверьте дату рождения.');
 const legacy=Number(state.profile?.age)||1.5;
 $('age').value=age?age.years:legacy;$('ageDisplay').textContent=age?age.text:`≈ ${legacy.toLocaleString('ru-RU')} года · уточните дату рождения`;
 const ids=['dogWeight','weather','share','homeMeals',...($('energyMethod').value==='custom'?['customK']:[])];
 if(ids.some(id=>!$(id).validity.valid||$(id).value===''))throw Error('Проверьте вес, долю кормления и корректировку.');
 return {weight:+$('dogWeight').value,age:age?.years??legacy,ageDays:age?.days??legacy*365.2425,method:$('energyMethod').value,activity:+$('activity').value,customK:+$('customK').value,weather:+$('weather').value,share:+$('share').value,homeMeals:+$('homeMeals').value,sex:$('sex').value,neutered:$('neutered').value,stage:$('lifeStage').value,matingDate:$('matingDate').value,birthLitterDate:$('birthLitterDate').value,puppies:+$('puppies').value,preWeight:+$('preWeight').value,adultWeight:+$('adultWeight').value};
}
function profileFields(){
 const stage=$('lifeStage').value,method=$('energyMethod').value;
 $('pregnancyFields').hidden=stage!=='pregnant';$('lactationFields').hidden=stage!=='lactating';
 $('customK').disabled=method!=='custom';$('activity').disabled=method==='fediaf-age'||method==='custom'||method==='rer-state'||stage!=='normal';
 const age=$('birthDate').value?calendarAge($('birthDate').value):null;$('growthFields').hidden=!age||age.years>=1;
 $('profileExplanation').textContent=stage!=='normal'?'Беременность и лактация используют отдельные формулы FEDIAF. Учитывайте состояние собаки и полноценность всего дня.':method==='rer-state'?'Стерилизация учтена в множителе RER: 1,6 после стерилизации, 1,8 без неё.':`k выбирается по ${method==='fediaf-age'?'возрастному ориентиру':method==='custom'?'индивидуальной настройке':'уровню активности'}. В этом методе нет отдельного множителя стерилизации. Порода сама по себе не задаёт универсальную норму.`;
 $('housingExplanation').textContent=$('housing').value==='outdoor-cold'?'Холод при содержании на улице может повышать потребность. Универсальной зимней надбавки нет: индивидуальный процент задаётся ниже.':'Для домашней собаки календарный сезон сам по себе не меняет норму. Учитывайте фактические прогулки и динамику веса.';
}
let lastEnergyModel=null;
function estimate(){
 profileFields();let p,model;
 try{p=readProfile();model=energyModel(p);if(state.targetMode==='profile'&&scaledTargets(model.portion).kcal[1]>10000)throw Error('Натуральная порция превышает 10 000 ккал. Разделите её на большее число кормлений или задайте цели вручную.');lastEnergyModel=model;}
 catch(error){lastEnergyModel=null;$('estimate').textContent=error.message;$('energyCards').replaceChildren();$('profileMacros').replaceChildren();$('portionComparison').textContent='';$('dryBudget').textContent='';return null;}
 $('profileSummary').textContent=`${$('dogName').value.trim()?$('dogName').value.trim()+' · ':''}${$('breed').value} · ${p.weight.toLocaleString('ru-RU')} кг · ${$('ageDisplay').textContent}`;
 $('energyCards').replaceChildren();for(const [label,value,detail]of [['Суточный MER',model.daily,model.description],['Покой RER',model.rer,'70 × вес⁰·⁷⁵ · справочно'],['Натуральная порция',model.portion,`${p.share}% суток / ${p.homeMeals} кормл.`]]){const card=el('div',undefined,'energy-card');card.append(el('span',label),el('strong',`${Math.round(value)} ккал`),el('small',detail));$('energyCards').append(card);}
 $('estimate').textContent=model.k===null?`${model.description}: ${Math.round(model.daily)} ккал/сутки.`:`MER = ${round1(model.k).toLocaleString('ru-RU')} × ${p.weight.toLocaleString('ru-RU')}⁰·⁷⁵${p.weather?` × ${(1+p.weather/100).toLocaleString('ru-RU')}`:''} = ${round1(model.daily).toLocaleString('ru-RU')} ккал/сутки.`;
 const read=id=>$(id).value!==''&&$(id).validity.valid?$(id).valueAsNumber:null,g=read('dryGrams'),density=read('dryKcal');
 const dry={kcal:g===0?0:g!==null&&density!==null?g*density/100:null,p:null,f:null,c:null};for(const [k,id]of [['p','dryProtein'],['f','dryFat'],['c','dryCarbs']]){const value=read(id);dry[k]=g===0?0:g!==null&&value!==null?g*value/100:null;}
 const known=['dryProtein','dryFat','dryCarbs'].map(read).filter(v=>v!==null),bad=known.reduce((a,b)=>a+b,0)>100+1e-8;$('dryWarning').textContent=bad?'Сумма БЖУ на этикетке превышает 100 г.':'';if(bad&&g!==0)for(const k of ['p','f','c'])dry[k]=null;
 const t=totals(),actual=Object.fromEntries(keys.map(k=>[k,dry[k]===null?null:dry[k]+t[k]*p.homeMeals]));
 $('profileMacros').replaceChildren();for(const [label,hint,values]of [['Сутки · ориентир','MER и ваши пропорции БЖУ',model.dayMacros],['Натуральное кормление',`${p.share}% MER`,model.portionMacros],['Сухой корм · факт',g===null?'Укажите массу корма':`${g} г/сутки`,dry],['Весь день · факт','Корм + текущая домашняя порция',actual]]){const row=el('tr'),name=el('td',label);name.append(el('small',hint));row.append(name);keys.forEach(k=>row.append(el('td',values[k]===null?'—':round1(values[k]).toLocaleString('ru-RU'))));$('profileMacros').append(row);}
 const center=(state.targets.kcal[0]+state.targets.kcal[1])/2;$('portionComparison').textContent=`Цель рецепта: ${state.targets.kcal[0]}–${state.targets.kcal[1]} ккал · около ${round1(center/model.daily*100).toLocaleString('ru-RU')}% MER. По профилю: ${Math.round(model.portion)} ккал.`;
 const remaining=model.daily-t.kcal*p.homeMeals;$('dryBudget').textContent=remaining<0?'Домашняя порция превышает расчётную суточную энергию.':`На остальной рацион остаётся около ${Math.round(remaining)} ккал${density?` — примерно ${Math.round(remaining/density*100)} г указанного сухого корма`:''}.`;
 return model.portion;
}
function applyProfile(){
 const profile={...(state.profile||{})};if(profile.activity==='1')profile.activity='110';if(profile.activity==='0.85')profile.activity='95';if(profile.activity==='1.25')profile.activity='125';if(profile.neutered==='1.8')profile.neutered='intact';if(profile.neutered==='1.6')profile.neutered='neutered';
 if(profile.breed&&![...$('breed').options].some(o=>o.value===profile.breed))$('breed').append(new Option(String(profile.breed).slice(0,100),String(profile.breed).slice(0,100)));
 profileIds.forEach(k=>{$(k).value=profile[k]??PROFILE_DEFAULTS[k];if($(k).tagName==='SELECT'&&!$(k).value)$(k).value=PROFILE_DEFAULTS[k];});$('batch').value=state.batch;$('targetMode').value=state.targetMode||'manual';
}
function profileTargetUpdate(){if((state.targetMode||'manual')!=='profile')return;const kcal=estimate();if(kcal===null)return;const proposed=scaledTargets(kcal);if(proposed.kcal[1]>10000){notice('Проверьте профиль: цель превышает 10 000 ккал.');return;}state.targets=proposed;renderTargets();}
profileIds.forEach(id=>{$(id).oninput=()=>{if(['birthDate','matingDate','birthLitterDate'].includes(id))formatRussianDateInput($(id));state.profile=Object.fromEntries(profileIds.map(k=>[k,$(k).value]));profileTargetUpdate();update();queueProfileSave();};});
$('targetMode').onchange=()=>{state.targetMode=$('targetMode').value;profileTargetUpdate();update();queueProfileSave();};
$('applyEstimate').onclick=()=>{if(estimate()===null)return;state.targetMode='profile';$('targetMode').value='profile';profileTargetUpdate();update();queueProfileSave();};

// FEDIAF 2025 table III-3b, per 1000 kcal. Values are reference levels, not supplement prescriptions.
const MICRO_META=[
 ['ca','Кальций','г',1.45,1.25,2.5,6.25],['p','Фосфор','г',1.16,1,2.25,4],['mg','Магний','г',.20,.18,.10],['k','Калий','г',1.45,1.25,1.10],['na','Натрий','г',.29,.25,.55],
 ['fe','Железо','мг',10.4,9,22],['zn','Цинк','мг',20.8,18,25],['cu','Медь','мг',2.08,1.8,2.75],['mn','Марганец','мг',1.67,1.44,1.4],['se','Селен','мкг',67.5,57.5,100],['i','Йод','мкг',300,260,380],
 ['a','A · ретинол','МЕ',1754,1515,1250,100000],['d','D','МЕ',159,138,138,800],['e','E','МЕ',10.4,9,12.5],['b1','B1','мг',.62,.54,.45],['b2','B2','мг',1.74,1.5,1.05],['b3','B3','мг',4.74,4.09,3.4],['b5','B5','мг',4.11,3.55,3],['b6','B6','мг',.42,.36,.30],['b9','B9 · фолат','мкг',74.7,64.5,54],['b12','B12','мкг',9.68,8.36,7],['choline','Холин','мг',474,409,425]
];
function microDefaults(){return {dryBasis:'100',dryValues:{},supplements:[],foodOverrides:{}};}
let microPlan=microDefaults();try{const saved=JSON.parse(localStorage.getItem('nutrition_micro_v1')||'null');if(validMicroPlan(saved))microPlan=saved;}catch{}
function validMicroValues(values){return values&&typeof values==='object'&&!Array.isArray(values)&&Object.entries(values).every(([k,v])=>MICRO_META.some(n=>n[0]===k)&&(v===null||Number.isFinite(v)&&v>=0&&v<=1e8));}
function validMicroPlan(plan){return !!plan&&['100','1000'].includes(plan.dryBasis)&&validMicroValues(plan.dryValues)&&Array.isArray(plan.supplements)&&plan.supplements.length<=10&&plan.supplements.every(s=>typeof s.name==='string'&&s.name.length<=100&&Number.isFinite(s.dose)&&s.dose>=0&&s.dose<=1000&&['г','мл','табл.'].includes(s.unit)&&validMicroValues(s.values))&&plan.foodOverrides&&typeof plan.foodOverrides==='object'&&Object.entries(plan.foodOverrides).every(([k,v])=>Object.hasOwn(catalog,k)&&validMicroValues(v));}
function persistMicro(){try{localStorage.setItem('nutrition_micro_v1',JSON.stringify(microPlan));}catch{}queueProfileSave();}
function microNumber(value,change){const input=number(value??'',0,'any');input.max=1e8;input.placeholder='Нет данных';input.oninput=()=>{if(input.value!==''&&!input.validity.valid)return;change(input.value===''?null:input.valueAsNumber);persistMicro();renderNutrition();};return input;}
function microFields(container,values,changed){container.replaceChildren();for(const [key,title,unit]of MICRO_META){const input=microNumber(values[key],value=>{values[key]=value;changed?.();});input.setAttribute('aria-label',`${title}, ${unit}`);container.append(makeLabel(`${title}, ${unit}`,input));}}
function renderMicroInputs(){
 $('dryMicroBasis').value=microPlan.dryBasis;microFields($('dryMicroFields'),microPlan.dryValues);
 $('supplementList').replaceChildren();microPlan.supplements.forEach((s,index)=>{
  const section=el('details',undefined,'supplement');const title=el('summary',s.name||`Добавка ${index+1}`),fields=el('div',undefined,'micro-fields'),name=el('input');name.value=s.name;name.maxLength=100;name.placeholder='Название добавки';name.oninput=()=>{s.name=name.value;title.textContent=s.name||`Добавка ${index+1}`;persistMicro();};
  const dose=number(s.dose,0,'any');dose.max=1000;dose.oninput=()=>{if(dose.value!==''&&dose.validity.valid){s.dose=dose.valueAsNumber;persistMicro();renderNutrition();}};
  const unit=el('select');for(const x of ['г','мл','табл.'])unit.append(new Option(x,x));unit.value=s.unit;unit.onchange=()=>{s.unit=unit.value;persistMicro();};
  const top=el('div',undefined,'supplement-top');top.append(makeLabel('Название',name),makeLabel('В сутки',dose),makeLabel('Единица',unit));microFields(fields,s.values);
  const remove=el('button','Удалить добавку','text-button');remove.onclick=()=>{microPlan.supplements.splice(index,1);persistMicro();renderMicroInputs();renderNutrition();};
  section.append(title,top,el('p','Содержание в 1 г, 1 мл или 1 таблетке — по выбранной единице. Неуказанные вещества остаются неизвестными.','muted'),fields,remove);$('supplementList').append(section);
 });
 const select=$('microFood');const previous=select.value;select.replaceChildren();for(const key of [...new Set(state.rows.filter(r=>r.g>0).map(r=>r.key))])select.append(new Option(catalog[key].name,key));if([...select.options].some(o=>o.value===previous))select.value=previous;renderFoodMicro();
}
function renderFoodMicro(){const key=$('microFood').value;$('foodMicroFields').replaceChildren();if(!key)return;const ref=MICRO_DATA[key]?.values||{},override=microPlan.foodOverrides[key]||{};
 $('foodMicroSource').textContent=MICRO_DATA[key]?`USDA SR · NDB ${MICRO_DATA[key].ndb} · сырой продукт, 100 г.`:'Справочных микронутриентов нет. Можно внести данные производителя.';
 for(const [id,title,unit]of MICRO_META){const value=Object.hasOwn(override,id)?override[id]:ref[id],input=microNumber(value,v=>{microPlan.foodOverrides[key]||={};microPlan.foodOverrides[key][id]=v;});input.setAttribute('aria-label',`${title}, ${unit}, продукт`);$('foodMicroFields').append(makeLabel(`${title}, ${unit}`,input));}
}
function microFoodValue(key,id){const override=microPlan.foodOverrides[key];return override&&Object.hasOwn(override,id)?override[id]:MICRO_DATA[key]?.values[id]??null;}
function nutrientDay(id){
 let home=0,homeComplete=true;const missing=[];
 for(const row of state.rows.filter(r=>r.g>0)){const v=microFoodValue(row.key,id);if(v===null){homeComplete=false;missing.push(shortProductName(row.key));}else home+=v*row.g/100;}
 home*=Number($('homeMeals').value)||1;
 const grams=$('dryGrams').value!==''&&$('dryGrams').validity.valid?+$('dryGrams').value:null,per=microPlan.dryValues[id];const dry=grams===0?0:grams!==null&&Number.isFinite(per)?grams*per/Number(microPlan.dryBasis):null;
 let supplements=0,supplementsComplete=true;for(const s of microPlan.supplements.filter(s=>s.dose>0)){const v=s.values[id];if(!Number.isFinite(v)){supplementsComplete=false;missing.push(s.name||'Добавка');}else supplements+=v*s.dose;}
 return {home,dry,supplements,complete:homeComplete&&dry!==null&&supplementsComplete,total:home+(dry||0)+supplements,homeComplete,supplementsComplete,missing};
}
function renderNutrition(){
 const body=$('microTable');if(!body)return;const select=$('microFood'),foodKeys=[...new Set(state.rows.filter(r=>r.g>0).map(r=>r.key))];if([...select.options].map(o=>o.value).join(',')!==foodKeys.join(',')){const previous=select.value;select.replaceChildren(...foodKeys.map(k=>new Option(catalog[k].name,k)));if(foodKeys.includes(previous))select.value=previous;renderFoodMicro();}body.replaceChildren();const model=lastEnergyModel,repro=model&&model.stage!=='normal',adult=model&&model.age>=1,energy=model?.daily||0;const col=repro?5:model&&model.k!==null&&model.k<=95?3:4,short=[],unknown=[],excess=[];
 const fmt=v=>v.toLocaleString('ru-RU',{maximumFractionDigits:3});
 for(const meta of MICRO_META){const [key,title,unit]=meta,d=nutrientDay(key),ref=model&&(adult||repro)?meta[col]*energy/1000:null,ratio=ref?d.total/ref:null,row=el('tr');row.append(el('th',`${title}, ${unit}`));
  for(const text of [(d.homeComplete?'':'≥ ')+fmt(d.home),d.dry===null?'Нет данных':fmt(d.dry),(d.supplementsComplete?'':'≥ ')+fmt(d.supplements),(d.complete?'':'≥ ')+fmt(d.total),ref===null?'—':fmt(ref)])row.append(el('td',text));
  let status;if(!d.complete){status='Неполные данные';unknown.push(title);}else if(meta[6]&&model&&(adult&&!repro||['a','d'].includes(key))&&d.total>meta[6]*energy/1000){status='Выше пищевого максимума';excess.push(title);}else if(!ref){status='Нет ориентира';}else if(ratio<1){status=`Ниже ориентира · ${Math.round(ratio*100)}%`;short.push(title);}else status='Не ниже ориентира';
  row.append(el('td',status));body.append(row);
 }
 const ca=nutrientDay('ca'),ph=nutrientDay('p'),ratio=ph.total>0?ca.total/ph.total:null;
 $('calciumRatio').textContent=ca.complete&&ph.complete&&ratio!==null?`Ca : P = ${ratio.toFixed(2).replace('.',',')} : 1 · ориентир ${repro?'1–1,6':'1–2'} : 1`:'Ca : P — нужны полные данные кальция и фосфора.';
 const messages=[];if(unknown.length)messages.push('Оценка дня неполная: заполните суммарное содержание в корме, добавках и продуктах. «≥» — известная часть, не полный итог.');
 if(short.length)messages.push(`Расчётно ниже ориентира: ${short.join(', ')}. Для домашней части нужен премикс, который закрывает именно эти вещества; дозу подбирают по его полному составу и всему дневному рациону.`);
 if(excess.length)messages.push(`Выше пищевого максимума: ${excess.join(', ')}. Дополнительно эти вещества не добавлять до проверки рациона.`);
 if(ca.complete&&ph.complete&&ratio!==null&&(ratio<1||ratio>(repro?1.6:2)))messages.push('Соотношение кальция и фосфора вне ориентира. Проверьте кальциевую составляющую всего дня с ветеринарным диетологом.');
 if(!model)messages.push('Для сравнения с ориентирами нужен корректно заполненный профиль.');
 if(model&&!adult&&!repro)messages.push('Для щенков нужны нормы с учётом возраста и взрослого размера; здесь показано содержание без автоматического подбора добавок.');
 if(!messages.length)messages.push('По учтённым веществам расчёт не ниже ориентиров. Это не проверка полноценности по всем аминокислотам, жирным кислотам и другим нутриентам.');
 $('microAdvice').replaceChildren(...messages.map(s=>el('p',s)));
 $('microBasis').textContent=model?`Ориентиры FEDIAF 2025 · ${repro?'репродукция':'взрослая собака'} · ${Math.round(energy)} ккал/сутки. Селен — ориентир влажного рациона.`:'Для сравнения с ориентирами заполните корректный профиль.';
}
$('dryMicroBasis').onchange=()=>{const next=$('dryMicroBasis').value,factor=Number(next)/Number(microPlan.dryBasis);for(const key of Object.keys(microPlan.dryValues))if(Number.isFinite(microPlan.dryValues[key]))microPlan.dryValues[key]*=factor;microPlan.dryBasis=next;persistMicro();renderMicroInputs();renderNutrition();};
$('addSupplement').onclick=()=>{if(microPlan.supplements.length>=10)return;microPlan.supplements.push({name:'',dose:1,unit:'г',values:{}});persistMicro();renderMicroInputs();renderNutrition();};
$('microFood').onchange=renderFoodMicro;
$('resetFoodMicro').onclick=()=>{const key=$('microFood').value;if(key){delete microPlan.foodOverrides[key];persistMicro();renderFoodMicro();renderNutrition();}};

function cookingPlan(recipeState=state){const active=recipeState.rows.filter(r=>r.g>0),groups=new Map,hasPumpkin=active.some(r=>r.key==='pumpkin'),hasLingonberry=active.some(r=>['cranberry_fresh','cranberry_frozen'].includes(r.key));
function group(id,row,mode,time,note){if(!groups.has(id))groups.set(id,{names:[],mode,time,note});const g=groups.get(id);if(!g.names.includes(catalog[row.key].name))g.names.push(catalog[row.key].name);}
for(const r of active){const k=r.key;
if(k==='oil'){group('serving',r,'Перед подачей','Без нагрева','Добавить к готовой порции.');continue;}
if(['cranberry_fresh','cranberry_frozen'].includes(k)){group('pumpkinberries',r,'85 °C','Около 60 мин',hasPumpkin?'Тыкву и вымытую бруснику можно готовить в одном пакете до мягкости. Сок — в корм.':'Вымыть, готовить до размягчения. Сок — в корм.');continue;}
if(k==='apple'||k==='pear'){group('cooked-fruit',r,'85 °C','45–60 мин','Вымыть, удалить сердцевину с семенами, нарезать небольшими кусочками. Готовить до мягкости; сок — в корм.');continue;}
if(k==='raspberry_fresh'||k==='raspberry_frozen'){group('cooked-raspberry',r,'85 °C','30–60 мин','Свежую промыть, замороженную разморозить в холодильнике. Сок — в корм. Можно готовить с тыквой около 60 мин; ягоды разварятся.');continue;}
if(k==='strawberry'){group('strawberry',r,'Перед подачей','Свежей','Вымыть, убрать зелёные чашелистики, нарезать.');continue;}
if(fruitKeys.includes(k)){group('fresh-berries',r,'Перед подачей','Свежими','Вымыть; крупные ягоды разрезать. Добавить в готовую порцию.');continue;}
if(k==='wakame'){group('wakame',r,'Отдельная проверка','Йод','Уточнить сухой/размоченный вес и дозу.');continue;}
if(k==='beef_shank'){group('shank',r,'85 °C','6–8 ч','Без кости, кусочки 1,5–2 см поперёк волокон; пакет слоем 2–3 см. После 6 ч проверить: мясо легко режется вилкой, соединительная ткань мягкая. Если жёстко — ещё 1–2 ч. Сок — в корм.');continue;}
if(k==='beef_shoulder'){group('shoulder',r,'80 °C','12 ч','Для мягкой тушёной текстуры; отдельный пакет.');continue;}
if(['salmon_murmansk','salmon_generic','sockeye','trout'].includes(k)){group('fatfish',r,'55 °C','2 см: 4 ч 45 мин · 3 см: 5 ч 15 мин','Альтернатива 58 °C: 2 см — 2 ч, 3 см — 2 ч 30 мин. Время включает прогрев.');continue;}
if(['cod','hake','pollock','sea_bass'].includes(k)){group('leanfish',r,'55 °C','2 см: 3 ч · 3 см: 3 ч 45 мин','Альтернатива 58 °C: 2 см — 1 ч 30 мин, 3 см — 2 ч. Время включает прогрев.');continue;}
if(k.includes('thigh')&&(k.startsWith('turkey')||k.startsWith('duck'))){group('poultry-thigh',r,'73 °C','Кусочки: 60 мин · цельное филе: 90 мин','Бескостное бедро, слой 2–3 см. Контроль: центр ≥70 °C не менее 2 мин.');continue;}
if(k.startsWith('turkey')){group('turkey-breast',r,'65 °C','2 ч','Грудка и малое филе, слой 2–3 см.');continue;}
if(k==='chicken_breast'){group('chicken-breast',r,'65 °C','2 см: 60 мин · 3 см: 75 мин','Бескостное филе, слой 2–3 см.');continue;}
if(k==='duck_breast'){group('duck-breast',r,'58 °C','2 см: 2 ч · 3 см: 2 ч 45 мин','Бескостная грудка, слой 2–3 см.');continue;}
if(k==='pork_lean'){group('pork',r,'65 °C','2 ч','Вырезка, слой 2–3 см.');continue;}
if(k==='beef_tenderloin'){group('beef-tenderloin',r,'62 °C','2 ч','Вырезка без кости, слой 2–3 см.');continue;}
if(k==='rabbit'){group('rabbit',r,'75 °C','90 мин','Кусочки слоем 2–3 см. Контроль центра ≥74 °C.');continue;}
if(proteinKeys.includes(k)){group('other-meat',r,'65 °C','2 см: 60 мин · 3 см: 75 мин','Нежирное мясо без костей, слой 2–3 см.');continue;}
if(k==='pumpkin'){group('pumpkinberries',r,'85 °C','Около 60 мин',hasLingonberry?'Тыкву и вымытую бруснику можно готовить в одном пакете до мягкости. Сок — в корм.':'Небольшие кусочки до мягкости; сок — в корм.');continue;}
if(k==='sweet_potato'||k==='carrot'){group('denseplants',r,'85 °C','60–90 мин','Небольшие кусочки до полной готовности и мягкости. Можно подавать кусочками; разминать по желанию.');continue;}
if(k==='green_beans'){group('beans',r,'85 °C','60 мин','До полной готовности и мягкости.');continue;}
if(k.startsWith('cauliflower')){group('cauliflower',r,'85 °C','45–60 мин','До мягкости; можно подавать кусочками.');continue;}
group('greenplants',r,'85 °C','30–60 мин','Небольшие кусочки до мягкости. Нежные овощи можно вынуть раньше корнеплодов; разминать по желанию.');
}
return [...groups.values()].map(g=>({...g,title:g.names.join(' + ')}));}

let preparationMode='batch';try{preparationMode=localStorage.getItem('nutrition_preparation_mode')==='portion'?'portion':'batch';}catch{}
function groupedIngredients(recipeState){const sums=new Map;for(const row of recipeState.rows.filter(r=>r.g>0))sums.set(row.key,(sums.get(row.key)||0)+row.g);return [...sums].map(([key,g])=>({key,g}));}
function ingredientGroups(recipeState){const groups=[{title:'Белок',kind:'protein',rows:[]},{title:'Овощи и фрукты',kind:'plants',rows:[]},{title:'Добавки',kind:'extras',rows:[]}];for(const row of groupedIngredients(recipeState))groups[proteinKeys.includes(row.key)?0:row.key==='oil'||row.key==='wakame'?2:1].rows.push(row);return groups;}
function preparationBatch(recipeState){const n=recipeState.batch,word={one:'порция',few:'порции',many:'порций',other:'порции'}[new Intl.PluralRules('ru').select(n)];return `${n} ${word}`;}
function cookingSpec(row,recipeState){
 const key=row.key,source=cookingPlan(recipeState).find(g=>g.names.includes(catalog[key].name));
 if(!source)return null;
 if(source.mode==='Перед подачей'||key==='wakame')return {temp:null,min:0,max:0,note:source.note,source};
 let min,max;
 if(key==='beef_shank')[min,max]=[360,480];else if(key==='beef_shoulder')[min,max]=[720,720];
 else if(['salmon_murmansk','salmon_generic','sockeye','trout'].includes(key))[min,max]=[315,315];
 else if(['cod','hake','pollock','sea_bass'].includes(key))[min,max]=[225,225];
 else if(key.includes('thigh')&&(key.startsWith('turkey')||key.startsWith('duck')))[min,max]=[60,60];
 else if(key.startsWith('turkey')||key==='pork_lean'||key==='beef_tenderloin')[min,max]=[120,120];
 else if(key==='duck_breast')[min,max]=[165,165];else if(key==='rabbit')[min,max]=[90,90];
 else if(proteinKeys.includes(key))[min,max]=[75,75];
 else if(['pumpkin','cranberry_fresh','cranberry_frozen','green_beans'].includes(key))[min,max]=[60,60];
 else if(['sweet_potato','carrot'].includes(key))[min,max]=[60,90];
 else if(key.startsWith('cauliflower')||['apple','pear'].includes(key))[min,max]=[45,60];
 else [min,max]=[30,60];
 return {temp:parseFloat(source.mode),min,max,note:source.note,source};
}
function minutesText(min,max=min){const one=n=>n>=120&&n%60===0?`${n/60} ч`:n>=120?`${Math.floor(n/60)} ч ${n%60} мин`:`${n} мин`;if(min===max)return one(min);return min%60===0&&max%60===0?`${min/60}–${max/60} ч`:`${min}–${max} мин`;}
function recipePackets(recipeState){
 const proteins=[],plants=[],serving=[];
 for(const row of groupedIngredients(recipeState)){
  const spec=cookingSpec(row,recipeState);if(!spec)continue;
  if(spec.temp===null){serving.push({...row,spec});continue;}
  if(proteinKeys.includes(row.key)){proteins.push({kind:'protein',title:shortProductName(row.key),rows:[row],...spec});continue;}
  const packet=plants.find(p=>p.temp===spec.temp&&Math.max(p.min,spec.min)<=Math.min(p.max,spec.max));
  if(packet){packet.rows.push(row);packet.min=Math.max(packet.min,spec.min);packet.max=Math.min(packet.max,spec.max);packet.notes.push(spec.note);}
  else plants.push({kind:'plants',title:'Овощной пакет',rows:[row],temp:spec.temp,min:spec.min,max:spec.max,notes:[spec.note]});
 }
 for(const p of plants){p.time=p.max;p.title=p.rows.every(r=>fruitKeys.includes(r.key))?'Фрукты и ягоды':'Овощной пакет';p.note=[...new Set(p.notes)].join(' ');}
 const result=[...proteins,...plants];if(serving.length)result.push({kind:'extras',title:'Перед подачей',rows:serving,temp:null,min:0,max:0,note:serving.map(r=>r.spec.note).join(' ')});return result;
}
function weightElement(value,className=''){const text=round1(value).toLocaleString('ru-RU'),box=el('div',undefined,'prep-weight '+className);if(text.length>8)box.classList.add('prep-weight-long');box.append(el('span',text,'prep-batch-weight'),el('span','г','prep-unit'));return box;}
function batchCards(recipeState){
 const root=el('div',undefined,'prep-layout prep-equalize batch-layout'),groups=ingredientGroups(recipeState),single=groups[0].rows.length===1;
 for(const group of single?[groups[0],groups[2],groups[1]]:groups){if(!group.rows.length)continue;const section=el('section',undefined,`prep-group prep-${group.kind}${single&&group.kind==='protein'?' prep-single':''}${single&&group.kind==='extras'?' prep-side':''}`),grid=el('div',undefined,'prep-grid');grid.dataset.count=group.rows.length;section.append(el('h3',group.title,'prep-group-title'));
  for(const row of group.rows){const card=el('article',undefined,'prep-item');card.dataset.key=row.key;card.append(el('h4',shortProductName(row.key),'prep-name'),weightElement(row.g*recipeState.batch));grid.append(card);}section.append(grid);root.append(section);
 }return root;
}
function packetCards(recipeState){
 const root=el('div',undefined,'prep-layout prep-equalize packet-layout'),packets=recipePackets(recipeState);root.dataset.count=packets.length;
 for(const packet of packets){const card=el('article',undefined,'prep-item packet-card prep-'+packet.kind);card.append(el('h4',packet.title,'prep-name'));card.dataset.keys=packet.rows.map(r=>r.key).join(',');
  if(packet.kind==='protein')card.append(weightElement(packet.rows[0].g));
  else {const rows=el('div',undefined,'packet-ingredients');for(const row of packet.rows){const item=el('div',undefined,'packet-ingredient');item.append(el('span',shortProductName(row.key)),el('span',`${round1(row.g).toLocaleString('ru-RU')} г`,'packet-grams'));rows.append(item);}card.append(rows);}
  if(packet.temp!==null){const mode=el('div',undefined,'prep-mode');mode.append(el('span',`${packet.temp} °C`),el('span','·','prep-dot'),el('span',minutesText(packet.time??packet.min,packet.time??packet.max)));card.append(mode);}
  if(packet.note){const detail=el('details',undefined,'prep-detail');detail.append(el('summary','Подробнее'),el('p',packet.note));card.append(detail);}root.append(card);
 }return root;
}
function equalizePreparationCards(root){
 const scopes=root.matches('.prep-equalize')?[root]:[...root.querySelectorAll('.prep-equalize')];
 for(const scope of scopes){scope.style.removeProperty('--prep-card-height');if(getComputedStyle(scope).display==='none')continue;const cards=[...scope.querySelectorAll('.prep-item')];if(cards.length)scope.style.setProperty('--prep-card-height',Math.ceil(Math.max(...cards.map(c=>c.getBoundingClientRect().height)))+'px');}
}
function renderCooking(){
 $('preparationBatch').textContent=preparationMode==='batch'?preparationBatch(state):'На 1 порцию';$('cookPlan').replaceChildren();
 document.querySelectorAll('[data-preparation-mode]').forEach(button=>{const selected=button.dataset.preparationMode===preparationMode;button.setAttribute('aria-selected',String(selected));button.classList.toggle('active',selected);});
 $('thicknessNote').textContent='Охлаждённые продукты · плоский слой 2–3 см · время для слоя до 3 см.';
 if(!state.rows.some(r=>r.g>0)){$('cookPlan').append(el('p','Добавьте продукты.','muted'));return;}
 $('cookPlan').append(preparationMode==='batch'?batchCards(state):packetCards(state));equalizePreparationCards($('cookPlan'));
}
document.querySelectorAll('[data-preparation-mode]').forEach((button,index,buttons)=>{button.onclick=()=>{preparationMode=button.dataset.preparationMode;try{localStorage.setItem('nutrition_preparation_mode',preparationMode);}catch{}renderCooking();};button.onkeydown=event=>{if(['ArrowLeft','ArrowRight','Home','End'].includes(event.key)){event.preventDefault();const n=event.key==='Home'?0:event.key==='End'?buttons.length-1:(index+(event.key==='ArrowRight'?1:-1)+buttons.length)%buttons.length;buttons[n].focus();buttons[n].click();}};});
function printRecipe(saved=null){
 const recipeState=saved?.state||state,date=preparedDate();if(!date)return;if(!recipeState.rows.some(r=>r.g>0)){notice('Добавьте продукты для печати.');return;}
 const name=cleanName(saved?.name||$('recipeName').value)||'Рецепт',root=$('printRecipe');root.className='';root.style.removeProperty('--prep-card-height');const title=el('div',undefined,'print-title-row');title.append(el('h1',name),el('span',preparationBatch(recipeState),'print-batch'));root.replaceChildren(title);
 const summary=el('div',undefined,'print-summary'),t=totals(recipeState.rows);for(const key of keys){const metric=el('div');metric.append(el('span',key==='kcal'?'Ккал / порция':labels[key]),el('strong',`${round1(t[key]).toLocaleString('ru-RU')}${key==='kcal'?'':' г'}`));summary.append(metric);}root.append(summary);
 const batch=el('section',undefined,'print-stage print-batch-stage');batch.append(el('h2','Подготовка партии','print-stage-title'),batchCards(recipeState));const packing=el('section',undefined,'print-stage print-packet-stage');packing.append(el('h2','Фасовка · на 1 порцию','print-stage-title'),packetCards(recipeState));root.append(batch,packing,el('p',displayPreparationDate(date),'print-footer'));
 const previous=document.title;document.title=name;window.addEventListener('afterprint',()=>{document.title=previous;},{once:true});window.print();
}
let preparationWidth=0;new ResizeObserver(entries=>{const width=entries[0].contentRect.width;if(width!==preparationWidth){preparationWidth=width;requestAnimationFrame(()=>equalizePreparationCards($('cookPlan')));}}).observe($('cookPlan'));
document.fonts.ready.then(()=>equalizePreparationCards($('cookPlan')));window.addEventListener('beforeprint',()=>equalizePreparationCards($('printRecipe')));

function preferencePayload(){return {profile:state.profile||{},microPlan,targetMode:state.targetMode||'manual'};}
function setProfileStatus(text){$('profileSyncStatus').textContent=text;}
function queueProfileSave(){profileDirty=true;profileConflict=false;try{localStorage.setItem('nutrition_preferences_pending_'+(profileOwner??'local'),JSON.stringify({owner:profileOwner,payload:preferencePayload(),revision:profileRevision}));}catch{}clearTimeout(profileSaveTimer);if(cloudReady)profileSaveTimer=setTimeout(saveProfileCloud,900);}
async function saveProfileCloud(){
 if(!cloudReady||profileSaving||profileConflict||!profileDirty)return;
 profileSaving=true;const snapshot=JSON.stringify(preferencePayload()),owner=profileOwner;
 try{const result=await cloudRequest('/api/preferences',{method:'PUT',body:JSON.stringify({revision:profileRevision,data:JSON.parse(snapshot)})});if(profileOwner!==owner)return;profileRevision=Number(result.revision);if(JSON.stringify(preferencePayload())===snapshot){profileDirty=false;try{localStorage.removeItem('nutrition_preferences_pending_'+(profileOwner??'local'));}catch{}setProfileStatus('Профиль и данные рациона сохранены в аккаунте.');}else profileSaveTimer=setTimeout(saveProfileCloud,100);}
 catch(e){if(e.status===409){profileConflict=true;$('resolveProfile').hidden=false;setProfileStatus('Профиль изменён на другом устройстве. Ваши правки сохранены локально; выберите «Загрузить профиль аккаунта» в меню.');}else setProfileStatus(e.status===404?'Для сохранения профиля обновите папку api на сервере.':'Профиль сохранён на устройстве. Отправим при восстановлении соединения.');}
 finally{profileSaving=false;}
}
async function loadProfileCloud(force=false){
 if(!cloudReady||profileSaving||profileDirty&&!force)return;
 const owner=profileOwner,result=await cloudRequest('/api/preferences');if(profileOwner!==owner||profileDirty&&!force)return;profileRevision=Number(result.revision)||0;
 if(!result.data){if(force)return;queueProfileSave();await saveProfileCloud();return;}
 const data=result.data;if(!data.profile||typeof data.profile!=='object'||!validMicroPlan(data.microPlan))throw Error('Некорректный профиль аккаунта.');
 profileDirty=false;profileConflict=false;$('resolveProfile').hidden=true;state.profile=structuredClone(data.profile);state.targetMode=data.targetMode==='profile'?'profile':'manual';microPlan=structuredClone(data.microPlan);
 try{localStorage.removeItem('nutrition_preferences_pending_'+(profileOwner??'local'));localStorage.setItem('nutrition_micro_v1',JSON.stringify(microPlan));}catch{}
 applyProfile();renderMicroInputs();profileTargetUpdate();update();setProfileStatus('Профиль синхронизирован.');
}
let syncRunning=false,lastSync=0;
async function autoSync(force=false){
 if(!cloudReady||cloudBusy||syncRunning||document.hidden||!navigator.onLine)return;
 if(!force&&Date.now()-lastSync<10000)return;syncRunning=true;lastSync=Date.now();
 try{await refreshCloud();if(profileDirty)await saveProfileCloud();else if(!document.activeElement?.closest('.profile,.micronutrients'))await loadProfileCloud();}catch{}finally{syncRunning=false;}
}
async function initCloud(){
 if(location.protocol==='file:')return;let session;try{session=await cloudRequest('/api/session');}catch{try{apiMode='php';session=await cloudRequest('/api/session');}catch{$('accountStatus').textContent='На устройстве · сервер не подключён';return;}}
 csrfToken=session.csrf||null;
 if(session.authenticated){
  const nextOwner=session.userId??session.username??session.email;if(profileOwner!==nextOwner){profileRevision=0;profileOwner=nextOwner;profileConflict=false;try{const pending=JSON.parse(localStorage.getItem('nutrition_preferences_pending_'+profileOwner)||'null');if(pending&&pending.owner===profileOwner&&pending.payload&&validMicroPlan(pending.payload.microPlan)){state.profile=pending.payload.profile;microPlan=pending.payload.microPlan;state.targetMode=pending.payload.targetMode;profileRevision=pending.revision;profileDirty=true;applyProfile();renderMicroInputs();update();}else profileDirty=false;}catch{}}
  cloudReady=true;$('accountStatus').textContent=session.email||session.username||'Мои рецепты';$('accountMenu').hidden=false;$('refreshCloud').hidden=false;$('passwordSignIn').hidden=true;$('signOut').hidden=session.authMode!=='password';$('changePassword').hidden=session.authMode!=='password';$('manageEmail').hidden=session.authMode!=='password';$('manageEmail').textContent=session.emailVerified?'Почта':'Подтвердить почту';await refreshCloud();
  try{if(profileDirty)await saveProfileCloud();else await loadProfileCloud();}catch(e){setProfileStatus(e.status===404?'Обновите папку api для синхронизации профиля.':'Профиль пока на устройстве.');}
 }else{cloudReady=false;profileOwner=null;profileRevision=0;profileDirty=false;$('manageEmail').hidden=true;$('changePassword').hidden=true;$('signOut').hidden=true;$('refreshCloud').hidden=true;$('accountMenu').hidden=true;if(session.authMode==='password')$('passwordSignIn').hidden=false;else if(session.signInPath){$('signIn').href=session.signInPath;$('signIn').hidden=false;}$('accountStatus').textContent='Войдите для синхронизации';}
}
$('resolveProfile').onclick=async()=>{try{await loadProfileCloud(true);$('accountMenu').open=false;}catch{setProfileStatus('Не удалось загрузить профиль. Правки остались на устройстве.');}};
window.addEventListener('focus',()=>autoSync());document.addEventListener('visibilitychange',()=>{if(!document.hidden)autoSync();});window.addEventListener('online',()=>autoSync(true));setInterval(()=>autoSync(),60000);
document.addEventListener('click',event=>{if(!$('accountMenu').contains(event.target))$('accountMenu').open=false;});document.addEventListener('keydown',event=>{if(event.key==='Escape')$('accountMenu').open=false;});


function markManualTargets(){if((state.targetMode||'manual')==='profile'){state.targetMode='manual';$('targetMode').value='manual';queueProfileSave();}}
function resetAccountPreferences(){clearTimeout(profileSaveTimer);profileDirty=false;profileConflict=false;microPlan=microDefaults();try{localStorage.removeItem('nutrition_micro_v1');}catch{}renderMicroInputs();}
applyProfile();renderTargets();renderRows();renderRecipes();renderMicroInputs();
if(customName){try{const saved=JSON.parse(localStorage.getItem('nutrition_v3')||'null');if(saved?.name)$('recipeName').value=cleanName(saved.name);}catch{}}
profileTargetUpdate();update();const initialCloud=initCloud();initialCloud.then(handleAccountLink);window.addEventListener('hashchange',()=>initialCloud.then(handleAccountLink));
