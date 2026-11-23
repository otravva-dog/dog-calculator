/* Account dog context. Enabled only by the MySQL API capability flag. */
const NutritionDogs={
 enabled:false,activeId:null,owner:null,items:[],switching:false,
 storageKey(base){return this.enabled&&this.activeId?`${base}_${this.owner}_${this.activeId}`:base;},
 scope(){return this.enabled&&this.activeId?`${this.owner}:${this.activeId}`:this.owner;},
 stash(){if(!this.enabled||!this.activeId)return;try{localStorage.setItem(this.storageKey('nutrition_v3'),JSON.stringify({state,customName,name:$('recipeName').value}));localStorage.setItem(this.storageKey('nutrition_recipes_v3'),JSON.stringify(recipes.filter(r=>r.origin!=='cloud')));}catch{}},
 restoreDraft(){try{const draft=JSON.parse(localStorage.getItem(this.storageKey('nutrition_v3'))||'null');if(valid(draft?.state)){const profile=state.profile;state=structuredClone(draft.state);state.profile=profile;customName=!!draft.customName;$('recipeName').value=cleanName(draft.name);renderTargets();renderRows();}$('batch').value=state.batch;const savedText=localStorage.getItem(this.storageKey('nutrition_recipes_v3')),saved=savedText===null?null:JSON.parse(savedText);if(Array.isArray(saved))recipes=saved.filter(r=>r&&typeof r.name==='string'&&valid(r.state)).map(snapshotRecipe);}catch{}},
 async initialize(session){
  const previous=this.enabled?this.scope():null;if(!session.features?.multipleDogs){this.reset();return session.userId??session.username??session.email;}
  this.owner=session.userId;this.enabled=true;const response=await cloudRequest('/api/dogs');this.items=response.dogs;
  let remembered;try{remembered=localStorage.getItem('nutrition_active_dog_'+this.owner);}catch{}
  this.activeId=this.items.some(d=>d.id===remembered)?remembered:response.defaultId;
  if(previous!==this.scope()){
   if(previous!==null){state=defaultState();microPlan=microDefaults();activeId=null;openedRecord=null;openedBaseline=null;recipes=[];customName=false;}
   this.restoreDraft();
   // Move an old unsent profile to the migrated first dog without discarding it.
   if(this.activeId===response.defaultId)try{const oldKey='nutrition_preferences_pending_'+this.owner,newKey='nutrition_preferences_pending_'+this.scope(),pending=JSON.parse(localStorage.getItem(oldKey)||'null');if(!localStorage.getItem(newKey)&&pending&&String(pending.owner)===String(this.owner)){pending.owner=this.scope();localStorage.setItem(newKey,JSON.stringify(pending));localStorage.removeItem(oldKey);}}catch{}
  }
  this.render();return this.scope();
 },
 reset(){this.enabled=false;this.activeId=null;this.owner=null;this.items=[];this.switching=false;const box=$('dogSwitcher');if(box)box.hidden=true;},
 render(){const root=$('dogSwitcher');if(!root)return;root.hidden=!this.enabled;if(!this.enabled)return;const select=$('dogSelector');select.replaceChildren(...this.items.map((d,i)=>new Option(d.name||`Собака ${i+1}`,d.id)));select.value=this.activeId;select.disabled=this.switching;$('addDog').disabled=this.switching;},
 updateName(){if(!this.enabled||this.switching)return;const current=this.items.find(d=>d.id===this.activeId);if(current&&current.name!==$('dogName').value){current.name=$('dogName').value;this.render();}},
 async switchTo(id){
  if(id===this.activeId||!this.items.some(d=>d.id===id))return;
  if(cloudBusy||profileSaving||syncRunning||this.switching){notice('Дождитесь завершения сохранения.');this.render();return;}
  this.switching=true;this.render();
  try{
   if(profileDirty)await saveProfileCloud();if(profileDirty)throw Error('Сначала сохраните изменения профиля или разрешите конфликт.');
   this.stash();clearTimeout(profileSaveTimer);this.activeId=id;try{localStorage.setItem('nutrition_active_dog_'+this.owner,id);}catch{}
   profileOwner=this.scope();profileRevision=0;profileDirty=false;profileConflict=false;activeId=null;openedRecord=null;openedBaseline=null;customName=false;recipes=[];
   state=defaultState();const dog=this.items.find(d=>d.id===id);state.profile={...PROFILE_DEFAULTS,dogName:dog.name,dogWeight:'',birthDate:'',breed:'Другая порода',dryFoodId:'',dryFoodRevision:'',dryName:'',dryGrams:'',dryKcal:'',dryProtein:'',dryFat:'',dryCarbs:''};microPlan=microDefaults();
   this.restoreDraft();applyProfile();renderTargets();renderRows();renderRecipes();renderMicroInputs();update();
   let pending=null;try{pending=JSON.parse(localStorage.getItem('nutrition_preferences_pending_'+profileOwner)||'null');}catch{}if(pending&&pending.owner===profileOwner&&validMicroPlan(pending.payload?.microPlan)){state.profile=pending.payload.profile;state.targetMode=pending.payload.targetMode;microPlan=pending.payload.microPlan;profileRevision=pending.revision;profileDirty=true;applyProfile();renderMicroInputs();update();await saveProfileCloud();}else await loadProfileCloud();
   await refreshCloud();notice('');
  }catch(error){notice(error.message);}finally{this.switching=false;this.render();}
 }
};
document.addEventListener('DOMContentLoaded',()=>{
$('dogSelector').onchange=()=>NutritionDogs.switchTo($('dogSelector').value);
$('addDog').onclick=()=>{$('newDogName').value='';$('newDogStatus').textContent='';$('dogDialog').showModal();$('newDogName').focus();};
$('closeDog').onclick=()=>$('dogDialog').close();
$('newDogForm').onsubmit=async event=>{event.preventDefault();const name=$('newDogName').value.trim();if(!name)return;$('confirmDog').disabled=true;try{if(cloudBusy||profileSaving||syncRunning||NutritionDogs.switching)throw Error('Дождитесь завершения синхронизации.');if(profileDirty)await saveProfileCloud();if(profileDirty)throw Error('Сначала сохраните изменения текущего профиля.');const dog=await cloudRequest('/api/dogs',{method:'POST',body:JSON.stringify({name})});NutritionDogs.items.push(dog);$('dogDialog').close();await NutritionDogs.switchTo(dog.id);document.querySelector('.dog-details').open=true;$('dogWeight').focus();}catch(error){$('newDogStatus').textContent=error.message;}finally{$('confirmDog').disabled=false;}};

});
