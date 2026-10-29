const {test} = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {JSDOM} = require('jsdom');
const root = __dirname;
function boot(seed, backup, raw, setup, extraCourses) {
  const dom = new JSDOM(fs.readFileSync(path.join(root,'index.html'),'utf8'), {url:'https://example.test/rostok/',runScripts:'outside-only',pretendToBeVisual:true});
  const w=dom.window; w.scrollTo=()=>{}; w.HTMLElement.prototype.scrollIntoView=()=>{}; w.confirm=()=>true;
  if(seed)w.localStorage.setItem('dnevnik-state',JSON.stringify(seed));
  if(raw!==undefined)w.localStorage.setItem('dnevnik-state',raw);
  if(backup)w.localStorage.setItem('dnevnik-state-backup',JSON.stringify(backup));
  if(setup)setup(w);
  for(const file of ['plan.js','courses.js','app.js']){w.eval(fs.readFileSync(path.join(root,file),'utf8'));if(file==='courses.js'&&extraCourses)w.COURSES.push(...JSON.parse(JSON.stringify(extraCourses)));}
  return {w,doc:w.document,close:()=>w.close(),state:()=>JSON.parse(w.localStorage.getItem('dnevnik-state')||'{}')};
}
function click(b,sel){const el=b.doc.querySelector(sel);assert.ok(el,'Missing '+sel);el.click();}
test('Inner appearance is scoped away from home across navigation and learning screens',()=>{
 const b=boot();try{
  const home=b.doc.querySelector('.home-view').outerHTML;
  assert.equal(b.doc.body.classList.contains('sections-ui'),false);
  for(const tab of ['learn','plan','habits','notes','goals','growth','library','tools','settings','more']){
   click(b,'[data-tab="'+tab+'"]');
   assert.ok(b.doc.body.classList.contains('sections-ui'),tab);
  }
  openLesson(b);assert.ok(b.doc.body.classList.contains('sections-ui'));
  click(b,'[data-tab="today"]');
  assert.equal(b.doc.body.classList.contains('sections-ui'),false);
  assert.equal(b.doc.querySelector('.home-view').outerHTML,home);
 }finally{b.close();}
});
test('Catalog search finds course names and goals and keeps favourite controls usable',()=>{
 const b=boot();try{
  click(b,'[data-tab="learn"]');
  const input=b.doc.querySelector('#course-query');assert.ok(input);
  input.value='витрина';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));
  const shown=[...b.doc.querySelectorAll('.ccard')].filter(e=>!e.hidden&&!e.classList.contains('add-card'));
  assert.equal(shown.length,1);assert.ok(shown[0].querySelector('[data-course="vitrina"]'));
  shown[0].querySelector('[data-fav]').click();
  assert.ok(b.state().fav.vitrina);
  assert.equal(b.doc.querySelector('#course-query').value,'витрина');
  const missing=b.doc.querySelector('#course-query');missing.value='нет-такого-курса';missing.dispatchEvent(new b.w.Event('input',{bubbles:true}));
  assert.equal(b.doc.querySelector('#catalog-empty').hidden,false);
  const again=b.doc.querySelector('#course-query');again.value='';again.dispatchEvent(new b.w.Event('input',{bubbles:true}));
  assert.ok([...b.doc.querySelectorAll('.ccard')].filter(e=>!e.hidden).length>3);
  assert.equal(b.doc.querySelector('#catalog-empty').hidden,true);
  click(b,'[data-course="vitrina"]');assert.match(b.doc.body.textContent,/Своя витрина/);
 }finally{b.close();}
});
test('Lesson note rail isolates notes, escapes user content and updates immediately after saving',()=>{
 const b=boot({checks:{},notes:{
  one:{t:'Моя заметка',x:'<img src=x onerror=alert(1)>',ref:'eng:0',d:'2026-10-29',at:2},
  other:{t:'Другая',x:'Не этот урок',ref:'eng:1',d:'2026-10-29',at:1}
 }});try{
  openLesson(b);
  const rail=b.doc.querySelector('.lesson-notes');assert.ok(rail);
  assert.match(rail.textContent,/<img src=x onerror=alert\(1\)>/);
  assert.equal(rail.querySelector('img'),null);assert.doesNotMatch(rail.textContent,/Не этот урок/);
  click(b,'.lesson-notes [data-act="lessonnote"]');
  b.doc.querySelector('#lnote-text').value='Важное правило';
  click(b,'[data-act="savelnote"]');
  assert.match(b.doc.querySelector('.lesson-notes').textContent,/Важное правило/);
  assert.ok(Object.values(b.state().notes).some(n=>n.ref==='eng:0'&&n.x==='Важное правило'));
 }finally{b.close();}
});
function sceneSetup(clock, preference) {
  return w => {
    w.Date.prototype.getHours = () => clock.hour;
    if (preference !== undefined) w.localStorage.setItem('rostok-theme', preference);
    const interval = w.setInterval.bind(w);
    w.setInterval = (fn, ms, ...args) => {
      if (ms === 60000) clock.tick = fn;
      return interval(fn, ms, ...args);
    };
  };
}
test('Automatic scene follows device-hour boundaries without saving a manual theme', () => {
  for (const [hour, expected] of [[6,'night'],[7,'day'],[19,'day'],[20,'night']]) {
    const b = boot(null,null,undefined,sceneSetup({hour}));
    try {
      assert.equal(b.doc.documentElement.dataset.scene, expected, 'hour '+hour);
      assert.equal(b.w.localStorage.getItem('rostok-theme'), null);
      assert.match(b.doc.querySelector('[data-act="homescene"]').getAttribute('aria-label'), expected==='day' ? /ноч/ : /днев/);
    } finally { b.close(); }
  }
});
test('Home theme toggle persists manual choice without changing progress and can return to automatic', () => {
  let b = boot({checks:{},lessons:{e1:'2026-10-26'}},null,undefined,sceneSetup({hour:12}));
  try {
    const before = b.w.localStorage.getItem('dnevnik-state');
    const toggle = b.doc.querySelector('[data-act="homescene"]');
    assert.ok(toggle); toggle.focus(); toggle.click();
    assert.equal(b.doc.documentElement.dataset.scene, 'night');
    assert.equal(b.w.localStorage.getItem('rostok-theme'), 'dark');
    assert.equal(b.doc.activeElement, toggle);
    assert.equal(b.w.localStorage.getItem('dnevnik-state'), before);
    toggle.click();
    assert.equal(b.doc.documentElement.dataset.scene, 'day');
    assert.equal(b.w.localStorage.getItem('rostok-theme'), 'light');
  } finally { b.close(); }
  b = boot(null,null,undefined,sceneSetup({hour:23},'light'));
  try {
    assert.equal(b.doc.documentElement.dataset.scene, 'day');
    click(b,'[data-tab="settings"]');
    click(b,'.theme-card [data-theme=""]');
    assert.equal(b.doc.documentElement.dataset.scene, 'night');
    assert.equal(b.w.localStorage.getItem('rostok-theme'), null);
    assert.equal(b.doc.querySelector('.theme-card [data-theme=""]').getAttribute('aria-pressed'), 'true');
  } finally { b.close(); }
});
test('Automatic refresh crosses evening boundary without replacing a lesson or changing answers', () => {
  const clock={hour:19}, b=boot(null,null,undefined,sceneSetup(clock));
  try {
    openLesson(b); answer(b,0,false);
    const lesson=b.doc.querySelector('.lesson-view'), before=b.w.localStorage.getItem('dnevnik-state');
    const focused=lesson.querySelector('[data-act="lnext"]'); focused.focus();
    assert.equal(typeof clock.tick, 'function');
    clock.hour=20; clock.tick();
    assert.equal(b.doc.documentElement.dataset.scene,'night');
    assert.equal(b.doc.querySelector('.lesson-view'),lesson);
    assert.equal(b.doc.activeElement,focused);
    assert.equal(b.w.localStorage.getItem('dnevnik-state'),before);
    clock.hour=8;
    b.doc.dispatchEvent(new b.w.Event('visibilitychange'));
    assert.equal(b.doc.documentElement.dataset.scene,'day');
    assert.equal(b.doc.querySelector('.lesson-view'),lesson);
  } finally { b.close(); }
});
test('Manual scene survives clock changes and invalid stored preference falls back to automatic', () => {
  const clock={hour:12}, b=boot(null,null,undefined,sceneSetup(clock,'dark'));
  try {
    assert.equal(b.doc.documentElement.dataset.scene,'night');
    assert.equal(typeof clock.tick,'function');
    clock.hour=8; clock.tick();
    assert.equal(b.doc.documentElement.dataset.scene,'night');
    b.w.localStorage.setItem('rostok-theme','light');
    b.w.dispatchEvent(new b.w.StorageEvent('storage',{key:'rostok-theme',newValue:'light',storageArea:b.w.localStorage}));
    assert.equal(b.doc.documentElement.dataset.scene,'day');
  } finally { b.close(); }
  const a=boot(null,null,undefined,sceneSetup({hour:12},'invalid'));
  try { assert.equal(a.doc.documentElement.dataset.scene,'day'); }
  finally { a.close(); }
});
test('Theme storage failure keeps the home switch usable without altering saved learning', () => {
  const b=boot({checks:{},lessons:{e1:'2026-10-26'}},null,undefined,w=>{
    sceneSetup({hour:12})(w);
    const proto=w.Storage.prototype, get=proto.getItem, set=proto.setItem;
    proto.getItem=function(k){if(k==='rostok-theme')throw Error('blocked');return get.call(this,k);};
    proto.setItem=function(k,v){if(k==='rostok-theme')throw Error('blocked');return set.call(this,k,v);};
  });
  try {
    const before=b.w.localStorage.getItem('dnevnik-state');
    click(b,'[data-act="homescene"]');
    assert.equal(b.doc.documentElement.dataset.scene,'night');
    click(b,'[data-act="homescene"]');
    assert.equal(b.doc.documentElement.dataset.scene,'day');
    assert.equal(b.w.localStorage.getItem('dnevnik-state'),before);
  } finally { b.close(); }
});
function openLesson(b,cid='eng',i=0){click(b,'[data-tab="learn"]');click(b,'[data-course="'+cid+'"]');if(i!==0)click(b,'[data-step="'+i+'"]');click(b,'[data-lopen="'+cid+':'+i+'"]');}
function answer(b,qi,right=true){const c=b.w.COURSES.find(c=>c.id==='eng'),q=c.steps[0].ex[qi];const buttons=[...b.doc.querySelectorAll('[data-lp^="'+qi+':"]')];const choice=buttons.find(e=>right?e.textContent===q.options[0]:e.textContent!==q.options[0]);assert.ok(choice);choice.click();}
function answerExam(b,q,correct=true){
 if(q.k==='choice'){const button=[...b.doc.querySelectorAll('[data-pick]')].find(e=>correct?e.textContent===q.options[0]:e.textContent!==q.options[0]);assert.ok(button);button.click();}
 if(q.k==='input'){const input=b.doc.querySelector('#ans');input.value=correct?q.a[0]:'неверный ответ';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));}
 if(q.k==='order'){for(const word of q.a.split(' ')){const el=[...b.doc.querySelectorAll('[data-build]')].find(e=>e.textContent===word);assert.ok(el,'word '+word);el.click();}}
 click(b,'[data-act="check"]');click(b,'[data-act="nextq"]');
}
test('Home contains only the shared circular course map and keeps saved plan checks accessible from Profile',()=>{let b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{const home=b.doc.querySelector('.home-view');assert.ok(home);assert.ok(home.querySelector('.orbit-map'));assert.equal(home.querySelector('.tree-landscape,.tree-day,.tree-night'),null);assert.equal(home.querySelectorAll('.orbit-node').length,5);assert.equal(home.querySelector('.orbit-home').classList.contains('only-m'),false);assert.equal(home.querySelector('.dirs,.hero,.rank-card,.tree-profile,.tree-metrics,.tree-resume,.tree-quick,.today-panel,.tree-top,[data-sel]'),null);assert.ok(b.doc.querySelector('#tabbar .bottom [data-tab="today"]'));click(b,'[data-tab="more"]');click(b,'.more-view [data-tab="plan"]');const rows=b.doc.querySelectorAll('.plan-view .task');assert.ok(rows.length>=4);assert.match(rows[0].querySelector('.t-label').textContent,/ — /);assert.match(rows[0].querySelector('.t-min').textContent,/мин/);const id=rows[0].querySelector('[data-task]').getAttribute('data-task');rows[0].querySelector('[data-task]').click();const seed=b.state();assert.ok(Object.values(seed.checks).some(x=>x[id]));assert.equal(seed.lessons.e1,'2026-10-26');click(b,'[data-tab="today"]');assert.equal(b.doc.querySelector('.today-panel'),null);b.close();b=boot(seed);assert.ok(Object.values(b.state().checks).some(x=>x[id]));assert.ok(b.doc.querySelector('.orbit-map'));}finally{b.close();}});
test('Desktop navigation reaches Profile and resume and keeps one active side tab',()=>{const b=boot();try{click(b,'#tabbar .side [data-tab="more"]');assert.ok(b.doc.querySelector('.more-view .rank-card'));click(b,'.more-view [data-act="resume"]');assert.ok(b.doc.querySelector('.lesson-view'));click(b,'#tabbar .side [data-tab="plan"]');assert.equal(b.doc.querySelectorAll('#tabbar .side [aria-current="page"]').length,1);assert.equal(b.doc.querySelector('#tabbar .side [aria-current="page"]').getAttribute('data-tab'),'plan');click(b,'#tabbar .side [data-tab="settings"]');assert.equal(b.doc.querySelectorAll('#tabbar .side [aria-current="page"]').length,1);}finally{b.close();}});
test('An unfinished lesson resumes with answered questions after reload',()=>{let b=boot();openLesson(b,'eng');answer(b,0,false);const saved=b.state();b.close();b=boot(saved);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.match(b.doc.body.textContent,/I am/);assert.ok(b.doc.querySelector('[data-lp^="0:"].right'));assert.ok(b.doc.querySelector('[data-lp^="0:"][disabled]'));}finally{b.close();}});
test('Wrong answers show an explanation from the lesson rule',()=>{const b=boot();try{openLesson(b);answer(b,0,false);assert.match(b.doc.querySelector('.feedback.no').textContent,/Почему так/);assert.match(b.doc.querySelector('.feedback.no').textContent,/am/);}finally{b.close();}});
test('Repeat mode contains only missed questions and keeps first-attempt score',()=>{const b=boot();try{openLesson(b);answer(b,0,false);for(let i=1;i<5;i++)answer(b,i,true);click(b,'[data-act="retrywrong"]');assert.equal(b.doc.querySelectorAll('.exercise-card').length,1);answer(b,0,true);click(b,'[data-act="lessondone"]');const result=b.state().practice.e1;assert.equal(result.last,4);assert.equal(result.n,5);assert.equal(b.state().lessons.e1!=null,true);}finally{b.close();}});
test('Finished lesson offers the next available lesson',()=>{const b=boot();try{openLesson(b);for(let i=0;i<5;i++)answer(b,i,true);click(b,'[data-act="lessondone"]');assert.ok(b.doc.querySelector('[data-act="nextlesson"]'));click(b,'[data-act="nextlesson"]');assert.match(b.doc.body.textContent,/Приветствия и знакомство/);}finally{b.close();}});
test('A corrupted primary state recovers from a valid backup',()=>{const b=boot(null,{checks:{},lessons:{e1:'2026-10-26'}},'{broken');try{assert.match(b.doc.body.textContent,/восстановлен/i);click(b,'[data-tab="learn"]');assert.match(b.doc.querySelector('[data-course="eng"]').textContent,/1 из 12/);}finally{b.close();}});
test('Invalid JSON is preserved rather than overwritten with an empty state',()=>{const b=boot(null,null,'{broken');try{click(b,'[data-tab="plan"]');click(b,'[data-task]');click(b,'[data-tab="today"]');assert.equal(b.w.localStorage.getItem('dnevnik-state'),'{broken');assert.ok(b.doc.querySelector('.storage-alert'));}finally{b.close();}});
test('Saving a change leaves the previous good state in a backup',()=>{const initial={checks:{},lessons:{e1:'2026-10-26'}};const b=boot(initial);try{click(b,'[data-tab="plan"]');click(b,'[data-task]');click(b,'[data-tab="today"]');const old=JSON.parse(b.w.localStorage.getItem('dnevnik-state-backup'));assert.equal(old.lessons.e1,'2026-10-26');assert.equal(Object.keys(old.checks).length,0);}finally{b.close();}});
test('Storage write failure is visible and leaves the original saved progress intact',()=>{const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{const before=b.w.localStorage.getItem('dnevnik-state');const proto=b.w.Storage.prototype,original=proto.setItem;proto.setItem=function(k,v){if(k==='dnevnik-state')throw new Error('quota');return original.call(this,k,v);};click(b,'[data-tab="plan"]');click(b,'[data-task]');click(b,'[data-tab="today"]');assert.equal(b.w.localStorage.getItem('dnevnik-state'),before);assert.match(b.doc.querySelector('.storage-alert').textContent,/не сохран/i);}finally{b.close();}});
test('Selected week has its own comparison and keeps editable reflection in that week',()=>{const b=boot();try{click(b,'[data-tab="growth"]');click(b,'[data-stab="activity"]');click(b,'[data-week="1"]');assert.match(b.doc.querySelector('.week-summary').textContent,/Неделя 2/);assert.match(b.doc.querySelector('.week-summary').textContent,/прошл/i);const input=b.doc.querySelector('[data-rf="a"]');input.value='Неделя два';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));assert.equal(b.state().reflect['1'].a,'Неделя два');click(b,'[data-week="0"]');assert.match(b.doc.querySelector('.week-summary').textContent,/Первая неделя/);}finally{b.close();}});
test('Growth displays weak lesson topics and the full exam attempt history',()=>{const b=boot({checks:{},practice:{e1:{last:2,n:5,wrong:[0,1,2],attempts:[{d:'2026-10-26',ok:2,n:5}]}},exams:{}});try{click(b,'[data-tab="growth"]');click(b,'[data-stab="courses"]');assert.match(b.doc.querySelector('.weak-topics').textContent,/Глагол to be/);assert.ok(b.doc.querySelector('.exam-history'));assert.match(b.doc.querySelector('.exam-history').textContent,/Пока нет попыток/);}finally{b.close();}});
test('Import rejects foreign JSON without changing progress',async()=>{const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({state:{checks:{},lessons:{}}})],'fake.json',{type:'application/json'})]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,50));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/i);}finally{b.close();}});
test('Legacy Rostok backup imports with a recovery copy of existing progress',async()=>{const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',v:'3.3',state:{checks:{},lessons:{r1:'2026-10-27'}}})],'rostok.json',{type:'application/json'})]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,50));assert.equal(b.state().lessons.r1,'2026-10-27');assert.equal(JSON.parse(b.w.localStorage.getItem('dnevnik-state-backup')).lessons.e1,'2026-10-26');}finally{b.close();}});
test('Malformed nested backup is rejected without crashing the app',async()=>{const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state:{checks:{},tracks:[null],booksAdded:[null],reflect:{0:null}}})],'broken.json',{type:'application/json'})]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,50));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/i);}finally{b.close();}});
test('A completed exam records the attempt and unlocks the next lesson',()=>{const b=boot();try{const c=b.w.COURSES.find(c=>c.id==='eng'),ei=c.steps.findIndex(s=>s.exam),s=c.steps[ei];const seed={checks:{},lessons:{}};s.covers.forEach(id=>seed.lessons[id]='2026-10-26');b.close();const a=boot(seed);try{click(a,'[data-tab="learn"]');click(a,'[data-course="eng"]');click(a,'[data-exam="eng:'+ei+'"]');for(const q of s.q)answerExam(a,q,true);assert.equal(a.state().exams[s.id].last,s.q.length);assert.equal(a.state().exams[s.id].attempts.length,1);assert.ok(a.doc.querySelector('[data-next-course="eng"]'));click(a,'[data-tab="growth"]');click(a,'[data-stab="courses"]');assert.match(a.doc.querySelector('.exam-history').textContent,/сдан/);}finally{a.close();}}finally{b.close();}});
test('Review of an exam mistake does not alter its original score or attempt history',()=>{const temp=boot(),c=temp.w.COURSES.find(c=>c.id==='eng'),ei=c.steps.findIndex(s=>s.exam),s=c.steps[ei],q=s.q.find(q=>q.k==='choice');temp.close();const seed={checks:{},lessons:{},exams:{}};s.covers.forEach(id=>seed.lessons[id]='2026-10-26');seed.exams[s.id]={best:s.q.length-1,last:s.q.length-1,n:s.q.length,passed:true,wrong:[{q:q.q,s:q.s,your:q.options[1],right:q.options[0]}],attempts:[{d:'2026-10-26',ok:s.q.length-1,n:s.q.length}],by:{}};const b=boot(seed);try{click(b,'[data-tab="learn"]');click(b,'[data-course="eng"]');click(b,'[data-step="'+ei+'"]');click(b,'[data-result="eng:'+ei+'"]');click(b,'[data-repeat-exam="eng:'+ei+'"]');answerExam(b,q,true);assert.equal(b.state().exams[s.id].best,s.q.length-1);assert.equal(b.state().exams[s.id].attempts.length,1);}finally{b.close();}});
test('Corrupted local progress blocks background sync rather than uploading an empty state',async()=>{const calls=[];const b=boot(null,null,'{broken',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opts)=>{calls.push(opts.method);return {ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:{checks:{}}})}}})};};});try{await new Promise(r=>setTimeout(r,25));assert.deepEqual(calls,[]);assert.equal(b.w.localStorage.getItem('dnevnik-state'),'{broken');}finally{b.close();}});
test('Sync rejects a malformed remote state without changing local progress',async()=>{const calls=[];const b=boot({checks:{},lessons:{e1:'2026-10-26'}},null,undefined,w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opts)=>{calls.push(opts.method);return {ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:{checks:{},tracks:[null]}})}}})};};});try{await new Promise(r=>setTimeout(r,25));assert.equal(b.state().lessons.e1,'2026-10-26');assert.deepEqual(calls,['GET']);}finally{b.close();}});
test('Sync merges remote lessons when daily checks are empty',async()=>{const b=boot({checks:{}},null,undefined,w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async()=>({ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:{checks:{},lessons:{e1:'2026-10-26'}}})}}})});});try{await new Promise(r=>setTimeout(r,30));assert.equal(b.state().lessons.e1,'2026-10-26');}finally{b.close();}});
test('Malformed exam attempts and topic scores cannot be imported',async()=>{for(const malformed of [{attempts:[null]},{by:{e1:null}},{wrong:[null]}]){const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{const exam=b.w.COURSES[0].steps.find(s=>s.exam);click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');const state={checks:{},exams:{[exam.id]:{n:1,best:0,last:0,wrong:[],...malformed}}};Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state})],'broken.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,35));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/i);}finally{b.close();}}});
test('Sync keeps the unfinished lesson and last-study pointer local to each device',async()=>{let b=boot();openLesson(b);answer(b,0,false);const local=b.state();local.lessons={c1:'2026-10-26'};b.close();b=boot();openLesson(b,'eng',1);const remote=b.state();remote.lessons={r1:'2026-10-27'};b.close();let uploaded;const a=boot(local,null,undefined,w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>{if(opt.method==='PATCH'){uploaded=JSON.parse(JSON.parse(opt.body).files['rostok-state.json'].content).state;return{ok:true,status:200,json:async()=>({id:'test-id'})};}return{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:remote})}}})};};});try{await new Promise(r=>setTimeout(r,35));assert.equal(a.state().session.i,0);assert.equal(a.state().session.qs[0].q,local.session.qs[0].q);assert.equal(a.state().lastStudy.sid,'e1');assert.equal(a.state().lessons.r1,'2026-10-27');assert.ok(uploaded);assert.equal(uploaded.session,undefined);assert.equal(uploaded.lastStudy,undefined);}finally{a.close();}});
test('Impossible saved scores are discarded and cannot poison progress on reload',()=>{let b=boot();openLesson(b);const seed=b.state();seed.session.firstScore=100000;b.close();b=boot(seed);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');for(let i=0;i<5;i++)answer(b,i,true);click(b,'[data-act="lessondone"]');assert.equal(b.state().practice.e1.last,5);}finally{b.close();}});
test('A retry session must not hide an unanswered question',()=>{let b=boot();openLesson(b);const seed=b.state();seed.session.retry=true;seed.session.retrySet=[];b.close();b=boot(seed);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.equal(b.doc.querySelectorAll('.exercise-card').length,5);}finally{b.close();}});
test('A newer exam weakness is not erased by an older successful lesson attempt',()=>{const temp=boot(),exam=temp.w.COURSES[0].steps.find(s=>s.exam);temp.close();const b=boot({checks:{},practice:{e1:{last:5,n:5,wrong:[],attempts:[{d:'2026-10-26',ok:5,n:5}]}},exams:{[exam.id]:{n:1,best:0,last:0,wrong:[],attempts:[{d:'2026-10-27',ok:0,n:1}],by:{e1:[0,1]}}}});try{click(b,'[data-tab="growth"]');click(b,'[data-stab="courses"]');assert.match(b.doc.querySelector('.weak-topics').textContent,/Глагол to be/);}finally{b.close();}});
test('Imported state cannot contain keys that alter object prototypes during sync',async()=>{const b=boot({checks:{},lessons:{e1:'2026-10-26'}});try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');const json='{"app":"dnevnik","state":{"checks":{},"reflect":{"__proto__":{"a":"injected"}}}}';Object.defineProperty(input,'files',{value:[new b.w.File([json],'unsafe.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,35));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/i);}finally{b.close();}});
test('Day plan adds a custom task with minutes and removes it again',()=>{const b=boot();try{click(b,'[data-tab="plan"]');b.doc.querySelector('#new-task').value='Проверить тормоза';b.doc.querySelector('#new-task-min').value='20';click(b,'[data-act="addtask"]');const key=Object.keys(b.state().extraTasks)[0];assert.equal(b.state().extraTasks[key][0].t,'Проверить тормоза');assert.equal(b.state().extraTasks[key][0].min,20);assert.match(b.doc.querySelector('.timeline').textContent,/Проверить тормоза/);click(b,'[data-deltask]');assert.equal(b.state().extraTasks[key].length,0);}finally{b.close();}});
test('Theme choice is stored and applied after reload',()=>{let b=boot();try{click(b,'[data-tab="settings"]');click(b,'.theme-card [data-theme="dark"]');assert.equal(b.doc.documentElement.getAttribute('data-theme'),'dark');assert.equal(b.w.localStorage.getItem('rostok-theme'),'dark');}finally{b.close();}b=boot(null,null,undefined,w=>w.localStorage.setItem('rostok-theme','light'));try{assert.equal(b.doc.documentElement.getAttribute('data-theme'),'light');}finally{b.close();}});
test('Lesson search and plan date navigation remain accessible away from home',()=>{const b=boot();try{click(b,'[data-tab="learn"]');const input=b.doc.querySelector('#search-input');input.value='глагол';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));assert.ok(b.doc.querySelector('.search-item'));click(b,'.search-item');assert.match(b.doc.querySelector('h1').textContent,/Глагол/);click(b,'[data-act="endlesson"]');click(b,'[data-tab="more"]');click(b,'.more-view [data-tab="plan"]');const date=b.doc.querySelector('.pd-date').textContent;const move=b.doc.querySelector('[data-act="prev"]:not([disabled])')||b.doc.querySelector('[data-act="next"]:not([disabled])');assert.ok(move);move.click();assert.notEqual(b.doc.querySelector('.pd-date').textContent,date);}finally{b.close();}});
test('Notes can be added, found by search and deleted after confirmation',()=>{const b=boot();try{click(b,'[data-tab="notes"]');b.doc.querySelector('#note-title').value='Идея';b.doc.querySelector('#note-text').value='Раздел про тормоза';click(b,'[data-act="addnote"]');const ids=Object.keys(b.state().notes);assert.equal(ids.length,1);assert.equal(b.state().notes[ids[0]].x,'Раздел про тормоза');const input=b.doc.querySelector('#search-input');input.value='тормоз';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));assert.ok(b.doc.querySelector('[data-gonote]'));click(b,'[data-delnote]');assert.equal(Object.keys(b.state().notes).length,1);click(b,'[data-delnote]');assert.equal(Object.keys(b.state().notes).length,0);}finally{b.close();}});
test('Lesson moves step by step with Next and Back and keeps answers',()=>{const b=boot();try{openLesson(b);assert.ok(!b.doc.querySelector('.lsec').hidden);click(b,'[data-act="lnext"]');assert.match(b.doc.querySelector('.lsec.exercise-card:not([hidden])').textContent,/Вопрос 1/);answer(b,0,true);click(b,'[data-act="lnext"]');assert.match(b.doc.querySelector('.lsec.exercise-card:not([hidden])').textContent,/Вопрос 2/);click(b,'[data-act="lprev"]');assert.ok(b.doc.querySelector('.lsec.exercise-card:not([hidden]) [data-lp^="0:"].right'));}finally{b.close();}});
test('Habits mark today and favourites filter the course list',()=>{const b=boot();try{click(b,'[data-tab="habits"]');const h=b.doc.querySelector('[data-htask]:not([disabled])');const id=h.getAttribute('data-htask');h.click();const day=Object.keys(b.state().checks).find(k=>b.state().checks[k][id]);assert.ok(day);click(b,'[data-tab="learn"]');click(b,'[data-fav="ai"]');assert.equal(b.state().fav.ai,1);click(b,'[data-status="fav"]');const cards=b.doc.querySelectorAll('.ccard:not(.add-card)');assert.equal(cards.length,1);assert.match(cards[0].textContent,/ИИ и агенты/);}finally{b.close();}});
test('Notes and favourites survive export validation',()=>{const b=boot({checks:{},notes:{n1:{t:'a',x:'b',d:'2026-10-27',at:1}},fav:{eng:1}});try{click(b,'[data-tab="notes"]');assert.match(b.doc.querySelector('.note-card').textContent,/b/);click(b,'[data-tab="learn"]');click(b,'[data-status="fav"]');assert.equal(b.doc.querySelectorAll('.ccard:not(.add-card)').length,1);}finally{b.close();}});
test('Profile sprout grows with completed plan tasks and becomes a full tree at 100%',()=>{const ids=['book','code','eng','music','plan','poem','read','rus','x1'];const b0=boot();try{click(b0,'[data-tab="more"]');assert.ok(b0.doc.querySelector('.profile-tree svg.plant'));assert.match(b0.doc.querySelector('.grow').textContent,/Семечко в земле/);assert.match(b0.doc.querySelector('.grow').textContent,/0%/);}finally{b0.close();}const checks={};for(let i=0;i<35;i++){const d=new Date(Date.UTC(2026,9,26+i)).toISOString().slice(0,10);checks[d]={};ids.forEach(x=>checks[d][x]=1);}const b=boot({checks});try{click(b,'[data-tab="more"]');assert.match(b.doc.querySelector('.grow').textContent,/Пышное дерево/);assert.match(b.doc.querySelector('.grow').textContent,/100%/);assert.ok(b.doc.querySelectorAll('.profile-tree .plant-leaf').length>=80);}finally{b.close();}});
test('Profile ranks count existing lessons and task XP and survive reload',()=>{let b=boot();try{click(b,'[data-tab="more"]');assert.match(b.doc.querySelector('.rank-card').textContent,/Пыль/);click(b,'.more-view [data-tab="plan"]');click(b,'[data-task]');click(b,'[data-tab="more"]');assert.doesNotMatch(b.doc.querySelector('.rank-card h2').textContent,/^Пыль$/);const seed=b.state();b.close();b=boot(seed);click(b,'[data-tab="more"]');assert.doesNotMatch(b.doc.querySelector('.rank-card h2').textContent,/^Пыль$/);}finally{b.close();}b=boot({checks:{},lessons:{e1:'2026-10-27',e2:'2026-10-27',e3:'2026-10-27',e4:'2026-10-27',e5:'2026-10-27'}});try{click(b,'[data-tab="more"]');assert.match(b.doc.querySelector('.rank-card h2').textContent,/Червяк с амбициями/);assert.match(b.doc.querySelector('.rank-card').textContent,/100 XP/);assert.ok(b.doc.querySelector('.profile-tree .plant-leaf'));assert.match(b.doc.querySelector('.grow').textContent,/2%/);}finally{b.close();}});
test('Profile rank details show all milestones and final rank has no impossible next target',()=>{const b=boot();try{click(b,'[data-tab="more"]');assert.equal(b.doc.querySelectorAll('.rank-ladder li').length,8);assert.match(b.doc.querySelector('.rank-card').textContent,/30 XP/);}finally{b.close();}const checks={};for(let i=0;i<35;i++){checks[new Date(Date.UTC(2026,9,26+i)).toISOString().slice(0,10)]={book:1,code:1,eng:1,music:1,plan:1,poem:1,read:1,rus:1};}const c=boot({checks});try{click(c,'[data-tab="more"]');assert.match(c.doc.querySelector('.rank-card h2').textContent,/Древо мудрости/);assert.match(c.doc.querySelector('.rank-next').textContent,/Высшая ступень/);}finally{c.close();}});

test('Profile growth preview changes only the illustration and keeps earned progress',()=>{const b=boot();try{click(b,'[data-tab="more"]');const before=b.w.localStorage.getItem('dnevnik-state');const rank=b.doc.querySelector('.rank-card h2').textContent;const input=b.doc.querySelector('#growth-preview');input.value='100';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));assert.equal(b.doc.querySelector('#preview-value').textContent,'100%');assert.ok(b.doc.querySelectorAll('.preview-tree .plant-leaf').length>=80);assert.equal(b.doc.querySelector('.rank-card h2').textContent,rank);assert.equal(b.w.localStorage.getItem('dnevnik-state'),before);assert.equal(b.doc.querySelectorAll('.profile-tree .plant-leaf').length,3);}finally{b.close();}});

test('Vitrina course exposes the interactive source and review from its course page',()=>{
 const b=boot();try{
  click(b,'[data-tab="learn"]');click(b,'[data-course="vitrina"]');
  const links=[...b.doc.querySelectorAll('.course-resources a')];
  assert.ok(links.some(a=>a.getAttribute('href')==='vitrina/index.html'));
  assert.ok(links.some(a=>a.getAttribute('href')==='vitrina/review.html'));
  for(const a of links)assert.ok(fs.existsSync(path.join(root,a.getAttribute('href'))));
 }finally{b.close();}
});
test('Vitrina lesson saves its own completion without changing existing course progress',()=>{
 let b=boot({checks:{},lessons:{c1:'2026-10-26'}});let seed;try{
  openLesson(b,'vitrina');
  const s=b.w.COURSES.find(c=>c.id==='vitrina').steps[0];
  for(let i=0;i<s.ex.length;i++){
   const button=[...b.doc.querySelectorAll('[data-lp^="'+i+':"]')].find(e=>e.textContent===s.ex[i].options[0]);
   assert.ok(button);button.click();
  }
  click(b,'[data-act="lessondone"]');seed=b.state();
  assert.equal(seed.lessons.c1,'2026-10-26');assert.ok(seed.lessons['vitrina-01']);
  assert.equal(seed.practice['vitrina-01'].last,s.ex.length);
 }finally{b.close();}
 b=boot(seed);try{click(b,'[data-tab="learn"]');click(b,'[data-course="vitrina"]');assert.match(b.doc.querySelector('.path').textContent,/пройден/);assert.equal(b.state().lessons.c1,'2026-10-26');}finally{b.close();}
});

test('Profile keeps real saved XP while home remains only a circular course map',()=>{const b=boot({checks:{},lessons:{e1:'2026-10-27',r1:'2026-10-27'}});try{assert.equal(b.doc.querySelector('.home-view .tree-profile,.home-view .rank-card'),null);click(b,'[data-tab="more"]');assert.match(b.doc.querySelector('.rank-card').textContent,/40 XP/);assert.equal(b.state().lessons.e1,'2026-10-27');}finally{b.close();}});
test('Circular destinations open the matching existing courses including Russian and Vitrina',()=>{const b=boot();try{click(b,'.orbit-node[data-learnfilter="lang"]');assert.ok(b.doc.querySelector('[data-course="rus"]'));assert.ok(b.doc.querySelector('[data-course="eng"]'));assert.equal(b.doc.querySelector('[data-course="ai"]'),null);click(b,'[data-tab="today"]');click(b,'.orbit-node[data-learnfilter="code"]');assert.ok(b.doc.querySelector('[data-course="vitrina"]'));click(b,'[data-tab="today"]');click(b,'.orbit-node[data-course="music"]');assert.match(b.doc.querySelector('h1').textContent,/Музыка/);click(b,'[data-tab="today"]');click(b,'.orbit-node[data-course="ai"]');assert.match(b.doc.querySelector('h1').textContent,/ИИ/);click(b,'[data-tab="today"]');click(b,'.orbit-node[data-learnfilter="art"]');assert.ok(b.doc.querySelector('[data-course="poemlib"]'));}finally{b.close();}});
test('Profile keeps real favourites, plan and awards reachable after home simplification',()=>{const b=boot({checks:{},fav:{vitrina:1}});try{click(b,'[data-tab="more"]');click(b,'.more-view [data-act="treefav"]');assert.equal(b.doc.querySelectorAll('.ccard:not(.add-card)').length,1);assert.match(b.doc.querySelector('.ccard').textContent,/Своя витрина/);click(b,'[data-tab="more"]');click(b,'.more-view [data-tab="plan"]');assert.ok(b.doc.querySelector('.plan-view'));click(b,'[data-tab="more"]');click(b,'.more-view [data-act="treeawards"]');assert.ok(b.doc.querySelector('.awards'));}finally{b.close();}});
test('Mobile notes navigation has exactly one active tab',()=>{const b=boot();try{click(b,'#tabbar .bottom [data-tab="notes"]');assert.equal(b.doc.querySelectorAll('#tabbar .bottom [aria-current="page"]').length,1);assert.equal(b.doc.querySelector('#tabbar .bottom [aria-current="page"]').getAttribute('data-tab'),'notes');}finally{b.close();}});
test('Learning screen keeps its notifications available after tree home simplification',()=>{const b=boot();try{click(b,'[data-tab="learn"]');assert.ok(b.doc.querySelector('#bell-pop').hidden);click(b,'[data-act="bell"]');assert.equal(b.doc.querySelector('#bell-pop').hidden,false);click(b,'[data-act="bell"]');assert.equal(b.doc.querySelector('#bell-pop').hidden,true);}finally{b.close();}});


// Lesson fixtures are injected in memory; courses.js belongs to Claude.
const typedCourse={id:'typed',cat:'code',name:'Typed lesson fixture',goal:'Проверить ответы',unit:'урок',type:'path',prompt:'Урок {n}: {t}',steps:[{id:'typed-01',t:'Теги и атрибуты',plan:'Написать ответ',theory:{rule:'Правило для запасного пояснения',ex:[['<h1>Пример</h1>','главный заголовок']]},ex:[
 {k:'choice',q:'Язык разметки?',options:['HTML','CSS']},
 {k:'input',q:'Напиши тег заголовка',a:['h1','<h1>'],explanation:'Заголовок задаёт тег h1.'},
 {k:'order',q:'Собери a b a',words:['a','a','b'],a:'a b a',why:'Повторяющиеся слова используются по одному разу.'}
]}]};
function bootTyped(seed,fixture=typedCourse){return boot(seed,null,undefined,null,[fixture]);}
function typeLesson(b,qi,value){const el=b.doc.querySelector('[data-linput="'+qi+'"]');assert.ok(el);el.value=value;el.dispatchEvent(new b.w.Event('input',{bubbles:true}));}
function buildLesson(b,qi,words){for(const word of words){const el=[...b.doc.querySelectorAll('[data-lbuild^="'+qi+':"]')].find(x=>x.textContent===word&&!x.disabled);assert.ok(el,'Word '+word);el.click();}}
function chooseTyped(b){const el=[...b.doc.querySelectorAll('[data-lp^="0:"]')].find(x=>x.textContent==='HTML');assert.ok(el);el.click();}
test('Input lesson accepts all declared answers through norm and Enter, preserving practice shape',()=>{const b=bootTyped();try{openLesson(b,'typed');chooseTyped(b);typeLesson(b,1,'  <H1>!! ');const el=b.doc.querySelector('[data-linput="1"]');el.dispatchEvent(new b.w.KeyboardEvent('keydown',{key:'Enter',bubbles:true,cancelable:true}));assert.match(b.doc.querySelector('[data-linput="1"]').closest('.exercise-card').textContent,/Верно.*Заголовок задаёт/s);assert.ok(b.doc.querySelector('[data-linput="1"]').disabled);buildLesson(b,2,['a','b','a']);click(b,'[data-lcheck="2"]');click(b,'[data-act="lessondone"]');const p=b.state().practice['typed-01'];assert.deepEqual(Object.keys(p).sort(),['attempts','last','n','wrong']);assert.equal(p.last,3);assert.equal(p.n,3);assert.deepEqual(p.wrong,[]);assert.ok(b.state().lessons['typed-01']);}finally{b.close();}});
test('Input lesson blocks empty submission and shows escaped wrong answer with theory fallback',()=>{const f=JSON.parse(JSON.stringify(typedCourse));delete f.steps[0].ex[1].explanation;const b=bootTyped(null,f);try{openLesson(b,'typed');typeLesson(b,1,'   ');click(b,'[data-lcheck="1"]');assert.equal(b.doc.querySelector('[data-linput="1"]').disabled,false);assert.equal(b.state().session.qs[1].checked,false);typeLesson(b,1,'<img src=x onerror=alert(1)>');click(b,'[data-lcheck="1"]');const card=b.doc.querySelector('[data-linput="1"]').closest('.exercise-card');assert.match(card.textContent,/Правильный ответ: h1/);assert.match(card.textContent,/Правило для запасного пояснения/);assert.match(card.textContent,/<h1>Пример<\/h1>/);assert.equal(card.querySelector('img'),null);assert.equal(b.doc.querySelector('[data-act="lessondone"]'),null);assert.equal(b.state().lessons['typed-01'],undefined);}finally{b.close();}});
test('Order lesson supports removal and duplicate tokens without reusing an index',()=>{const b=bootTyped();try{openLesson(b,'typed');click(b,'[data-lcheck="2"]');assert.equal(b.state().session.qs[2].checked,false);buildLesson(b,2,['a','a']);click(b,'[data-lunbuild="2:1"]');assert.equal(b.state().session.qs[2].built.length,1);buildLesson(b,2,['b','a']);click(b,'[data-lcheck="2"]');const card=b.doc.querySelector('[data-lcheck="2"]')?.closest('.exercise-card')||b.doc.querySelectorAll('.exercise-card')[2];assert.match(card.textContent,/Верно/);assert.match(card.textContent,/Повторяющиеся слова/);assert.ok([...card.querySelectorAll('[data-lunbuild]')].every(x=>x.disabled));}finally{b.close();}});
test('Typed lesson restores draft text, built word indices and checked feedback after reload',()=>{let b=bootTyped();openLesson(b,'typed');chooseTyped(b);typeLesson(b,1,'h');buildLesson(b,2,['a','b']);const seed=b.state();b.close();b=bootTyped(seed);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.equal(b.doc.querySelector('[data-linput="1"]').value,'h');assert.equal(b.state().session.qs[2].built.length,2);typeLesson(b,1,'h1');click(b,'[data-lcheck="1"]');buildLesson(b,2,['a']);click(b,'[data-lcheck="2"]');const checked=b.state();b.close();b=bootTyped(checked);click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.ok(b.doc.querySelector('[data-linput="1"]').disabled);assert.match(b.doc.querySelector('[data-linput="1"]').closest('.exercise-card').textContent,/Верно/);click(b,'[data-act="lessondone"]');assert.equal(b.state().practice['typed-01'].last,3);}finally{b.close();}});
test('Retry input and order mistakes preserves the original first score across reload',()=>{let b=bootTyped();openLesson(b,'typed');chooseTyped(b);typeLesson(b,1,'h2');click(b,'[data-lcheck="1"]');buildLesson(b,2,['b','a','a']);click(b,'[data-lcheck="2"]');click(b,'[data-act="retrywrong"]');const seed=b.state();b.close();b=bootTyped(seed);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.equal(b.doc.querySelectorAll('.exercise-card').length,2);assert.equal(b.doc.querySelector('[data-linput="1"]').value,'');typeLesson(b,1,'h1');click(b,'[data-lcheck="1"]');buildLesson(b,2,['a','b','a']);click(b,'[data-lcheck="2"]');click(b,'[data-act="lessondone"]');const p=b.state().practice['typed-01'];assert.equal(p.last,1);assert.equal(p.n,3);assert.deepEqual(p.wrong,[]);assert.equal(p.attempts.length,1);}finally{b.close();}});
test('Pre-4.13 choice sessions without k resume with the same answered options',()=>{let b=boot();openLesson(b);answer(b,0,true);const seed=b.state();for(const q of seed.session.qs)delete q.k;const options=seed.session.qs[0].options;b.close();b=boot(seed);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.deepEqual(b.state().session.qs[0].options,options);assert.ok(b.doc.querySelector('[data-lp^="0:"][disabled]'));}finally{b.close();}});
test('Typed session discards changed answer keys and invalid duplicate built indices',()=>{let b=bootTyped();openLesson(b,'typed');typeLesson(b,1,'h1');buildLesson(b,2,['a']);const seed=b.state();b.close();for(const mutate of [x=>{x.qs[1].a=['h2'];},x=>{x.qs[2].built=[0,0];},x=>{x.qs[2].words=['hacked','a','b'];},x=>{x.qs[1].k='order';}]){const s=JSON.parse(JSON.stringify(seed));mutate(s.session);b=bootTyped(s);try{click(b,'[data-tab="more"]');click(b,'[data-act="resume"]');assert.equal(b.doc.querySelector('[data-linput="1"]').value,'');assert.deepEqual(b.state().session.qs[2].built,[]);}finally{b.close();}}});
test('Wrong typed answers mark lesson steps and persist original question indices',()=>{const b=bootTyped();try{openLesson(b,'typed');chooseTyped(b);typeLesson(b,1,'h2');click(b,'[data-lcheck="1"]');buildLesson(b,2,['b','a','a']);click(b,'[data-lcheck="2"]');assert.ok(b.doc.querySelector('.lesson-steps [data-lv="2"]').classList.contains('wrong'));assert.ok(b.doc.querySelector('.lesson-steps [data-lv="3"]').classList.contains('wrong'));click(b,'[data-act="lessondone"]');assert.deepEqual(b.state().practice['typed-01'].wrong,[1,2]);assert.equal(b.state().practice['typed-01'].last,1);}finally{b.close();}});
test('Order lesson compares the assembled phrase through the same norm as exams',()=>{const f=JSON.parse(JSON.stringify(typedCourse));f.steps[0].ex[2].words=['ЁЖ','дом','ёж!'];f.steps[0].ex[2].a='ёж ёж дом';const b=bootTyped(null,f);try{openLesson(b,'typed');buildLesson(b,2,['ЁЖ','ёж!','дом']);click(b,'[data-lcheck="2"]');assert.match(b.doc.querySelectorAll('.exercise-card')[2].querySelector('.feedback.ok').textContent,/Верно/);}finally{b.close();}});
