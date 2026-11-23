/* Printed recipe. Figma Dog / 2185:1011 is the layout reference (23.11.2026).
 * Weights and cooking data are supplied by the same preparation model as the screen.
 * This module owns print layout, pagination and browser print lifecycle only.
 */
function printHalf(recipeState,name,date,kind){
 const half=el('section',undefined,'print-half print-half-'+kind),head=el('div',undefined,'print-half-header'),main=el('div',undefined,'print-header-main'),meta=el('div',undefined,'print-header-meta');
 main.append(el('h1',name),el('h2',kind==='batch'?'Подготовка партии':'Фасовка пакетов','print-stage-title'));
 meta.append(el('span',displayPreparationDate(date),'print-date'),el('strong',kind==='batch'?preparationBatch(recipeState):'1 порция','print-stage-amount'));head.append(main,meta);half.append(head);
 const stage=el('div',undefined,'print-stage '+(kind==='batch'?'print-batch-stage':'print-packet-stage')),cards=kind==='batch'?batchCards(recipeState):packetCards(recipeState);
 if(kind==='portion')for(const card of cards.children){
  if(card.dataset.keys==='oil'){card.querySelector('.prep-name').textContent=shortProductName('oil');card.querySelector('.packet-ingredient>span').textContent='При подаче';}
  const content=el('div',undefined,'print-packet-content');for(const node of [...card.children])if(!node.matches('.packet-cooking'))content.append(node);card.prepend(content);
 }
 stage.append(cards);half.append(stage);return half;
}
function ensureRecipePageRule(){let rule=$('recipePageRule');if(!rule){rule=el('style');rule.id='recipePageRule';rule.media='print';document.head.append(rule);}rule.textContent='@page { size: A4 portrait; margin: 8mm; }';}
function removeRecipePageRule(){$('recipePageRule')?.remove();}
$('printLabelSheet').addEventListener('click',removeRecipePageRule,{capture:true});
function printRecipe(saved=null){
 const recipeState=saved?.state||state,date=preparedDate();if(!date)return;if(!recipeState.rows.some(r=>r.g>0)){notice('Добавьте продукты для печати.');return;}
 const name=cleanName(saved?.name||$('recipeName').value)||'Рецепт',root=$('printRecipe');root.className='fold-print';for(const key of ['--prep-card-height','--packet-mode-height','--packet-footer-height'])root.style.removeProperty(key);
 const sheet=el('div',undefined,'fold-sheet');sheet.append(printHalf(recipeState,name,date,'batch'),printHalf(recipeState,name,date,'portion'));root.replaceChildren(sheet);
 const previous=document.title;document.title=name;window.addEventListener('afterprint',()=>{document.title=previous;removeRecipePageRule();},{once:true});ensureRecipePageRule();paginateFoldRecipe();window.print();
}
function printContentFits(half){const style=getComputedStyle(half),available=half.clientHeight-parseFloat(style.paddingTop)-parseFloat(style.paddingBottom),head=half.querySelector('.print-half-header'),stage=half.querySelector('.print-stage');return head.getBoundingClientRect().height+parseFloat(style.rowGap)+stage.getBoundingClientRect().height<=available+0.6;}
function fitPrintedNumbers(root){
 for(const box of root.querySelectorAll('.prep-weight')){const value=box.querySelector('.prep-batch-weight');value.style.removeProperty('font-size');const unit=box.querySelector('.prep-unit'),available=box.clientWidth-unit.getBoundingClientRect().width-4;let size=parseFloat(getComputedStyle(value).fontSize);if(value.getBoundingClientRect().width>available){size=Math.max(16*96/72,size*available/value.getBoundingClientRect().width);value.style.fontSize=size+'px';}}
}
function paginateFoldRecipe(){
 const root=$('printRecipe');if(!root.classList.contains('fold-print')||getComputedStyle(root).display==='none')return;
 const first=root.querySelector('.fold-sheet');if(!first)return;
 // Merge the previous pagination before a repeated print or font/layout change.
 for(const kind of ['batch','portion']){const target=first.querySelector('.print-half-'+kind+' .prep-layout');for(const sheet of [...root.children].slice(1))for(const card of [...sheet.querySelectorAll('.print-half-'+kind+' .prep-item')])target.append(card);}
 for(const sheet of [...root.children].slice(1))sheet.remove();
 for(const half of first.children){half.classList.toggle('print-long-title',half.querySelector('.print-half-header').getBoundingClientRect().height>130);}
 // Packet continuations keep at most three plant rows: the same readable row rhythm
 // as Figma. Every ingredient stays in the document, even for a very long recipe.
 const packets=first.querySelector('.print-half-portion .prep-layout');
 for(const card of [...packets.children]){const list=card.querySelector('.packet-ingredients');if(!list||list.children.length<=3)continue;const rows=[...list.children],next=card.nextSibling;list.replaceChildren(...rows.slice(0,3));for(let n=3;n<rows.length;n+=3){const more=card.cloneNode(true);more.querySelector('.packet-ingredients').replaceChildren(...rows.slice(n,n+3));more.dataset.continuation='true';packets.insertBefore(more,next);}}
 const templates=[...first.children].map(h=>{const c=h.cloneNode(true);c.querySelector('.prep-layout').replaceChildren();return c;});
 const getSheet=index=>{while(root.children.length<=index){const page=el('div',undefined,'fold-sheet');for(const template of templates)page.append(template.cloneNode(true));root.append(page);}return root.children[index];};
 for(const kind of ['batch','portion']){
  const source=first.querySelector('.print-half-'+kind),cards=[...source.querySelectorAll('.prep-item')];source.querySelector('.prep-layout').replaceChildren();let pageIndex=0,half=source;
  for(const card of cards){let list=half.querySelector('.prep-layout');list.append(card);fitPrintedNumbers(half);if(!printContentFits(half)&&list.children.length>1){card.remove();half=getSheet(++pageIndex).querySelector('.print-half-'+kind);half.querySelector('.prep-layout').append(card);fitPrintedNumbers(half);}}
 }
}
window.addEventListener('beforeprint',paginateFoldRecipe);
