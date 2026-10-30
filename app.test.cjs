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
  for(const file of ['plan.js','courses.js','journey.js','app.js']){w.eval(fs.readFileSync(path.join(root,file),'utf8'));if(file==='courses.js'&&extraCourses)w.COURSES.push(...JSON.parse(JSON.stringify(extraCourses)));}
  return {w,doc:w.document,close:()=>w.close(),state:()=>JSON.parse(w.localStorage.getItem('dnevnik-state')||'{}')};
}
function click(b,sel){const el=b.doc.querySelector(sel);assert.ok(el,'Missing '+sel);el.click();}
test('Programming lessons can use readable prose examples without converting instructions to code',()=>{
 const fixture={id:'prose-code',cat:'code',type:'path',name:'Текстовая практика',exampleFormat:'text',unit:'урок',prompt:'{t}',steps:[{id:'prose-01',t:'Админка',plan:'Практика',theory:{rule:'Порядок действий',ex:[['Создай страницу и проверь её в браузере.','Практика']],tip:'Проверяй результат'},ex:[{k:'choice',q:'Где проверить страницу?',options:['В браузере','В письме']}]}]};
 const b=boot(null,null,undefined,null,[fixture]);try{openLesson(b,'prose-code');assert.equal(b.doc.querySelector('.lesson-main .code-block'),null);assert.match(b.doc.querySelector('.ex-list').textContent,/Создай страницу/);}finally{b.close();}
});
test('WordPress course is reachable from programming and saves its own answers and completion',()=>{
 let b=boot({checks:{},lessons:{c1:'2026-10-26'}});try{
  click(b,'.orbit-node[data-learnfilter="code"]');assert.ok(b.doc.querySelector('[data-course="wordpress"]'));click(b,'[data-course="wordpress"]');
  assert.ok(b.doc.querySelector('a[href="wordpress/guide.html"]'));click(b,'[data-lopen="wordpress:0"]');
  const s=b.w.COURSES.find(c=>c.id==='wordpress').steps[0];assert.equal(b.doc.querySelector('.lesson-main .code-block'),null);
  s.ex.forEach((q,i)=>{if(q.k==='input'){typeLesson(b,i,q.a[0]);click(b,'[data-lcheck="'+i+'"]');}else if(q.k==='order'){buildLesson(b,i,q.a.split(' '));click(b,'[data-lcheck="'+i+'"]');}else{const button=[...b.doc.querySelectorAll('[data-lp^="'+i+':"]')].find(e=>e.textContent===q.options[0]);assert.ok(button);button.click();}});
  click(b,'[data-act="lessondone"]');const saved=b.state();assert.ok(saved.lessons['wp-01']);assert.equal(saved.practice['wp-01'].last,s.ex.length);assert.equal(saved.lessons.c1,'2026-10-26');b.close();b=boot(saved);click(b,'[data-tab="learn"]');click(b,'[data-course="wordpress"]');assert.match(b.doc.querySelector('.path').textContent,/пройден/);
 }finally{b.close();}
});
test('WordPress module exam accepts answers and unlocks the next module without resetting existing progress',()=>{
 const first=boot();const c=first.w.COURSES.find(c=>c.id==='wordpress');first.close();assert.ok(c,'WordPress course exists');const i=c.steps.findIndex(s=>s.exam),exam=c.steps[i];
 const seed={checks:{},lessons:{c1:'2026-10-26'}};exam.covers.forEach(id=>seed.lessons[id]='2026-10-30');const b=boot(seed);try{click(b,'[data-tab="learn"]');click(b,'[data-course="wordpress"]');click(b,'[data-exam="wordpress:'+i+'"]');for(const q of exam.q)answerExam(b,q,true);assert.equal(b.state().exams[exam.id].last,exam.q.length);assert.equal(b.state().lessons.c1,'2026-10-26');assert.ok(b.doc.querySelector('[data-next-course="wordpress"]'));}finally{b.close();}
});
test('AI direction exposes both the existing course and video generation without mixing other directions',()=>{
 const b=boot();try{click(b,'.orbit-node[data-learnfilter="ai"]');assert.ok(b.doc.querySelector('[data-course="ai"]'));assert.ok(b.doc.querySelector('[data-course="video"]'));assert.equal(b.doc.querySelector('[data-course="wordpress"]'),null);click(b,'[data-course="ai"]');assert.match(b.doc.querySelector('h1').textContent,/ИИ/);}finally{b.close();}
});
test('Video generation lesson opens readable practice and persists completion without touching prior lessons',()=>{
 let b=boot({checks:{},lessons:{c1:'2026-10-26'}});try{click(b,'[data-tab="learn"]');click(b,'[data-course="video"]');assert.ok(b.doc.querySelector('a[href="video/guide.html"]'));click(b,'[data-lopen="video:0"]');const s=b.w.COURSES.find(c=>c.id==='video').steps[0];assert.ok(b.doc.querySelector('.ex-list'));assert.equal(b.doc.querySelector('.lesson-main .code-block'),null);s.ex.forEach((q,i)=>{if(q.k==='input'){typeLesson(b,i,q.a[0]);click(b,'[data-lcheck="'+i+'"]');}else{const el=[...b.doc.querySelectorAll('[data-lp^="'+i+':"]')].find(e=>e.textContent===q.options[0]);assert.ok(el);el.click();}});click(b,'[data-act="lessondone"]');const saved=b.state();assert.ok(saved.lessons['vid-01']);assert.equal(saved.practice['vid-01'].last,6);assert.equal(saved.lessons.c1,'2026-10-26');b.close();b=boot(saved);click(b,'[data-tab="learn"]');click(b,'[data-course="video"]');assert.match(b.doc.querySelector('.path').textContent,/пройден/);}finally{b.close();}
});
test('Video module exam saves the score and unlocks the next module',()=>{
 const first=boot();const c=first.w.COURSES.find(c=>c.id==='video');first.close();assert.ok(c);const i=c.steps.findIndex(s=>s.exam),exam=c.steps[i],seed={checks:{},lessons:{c1:'2026-10-26'}};exam.covers.forEach(id=>seed.lessons[id]='2026-10-30');const b=boot(seed);try{click(b,'[data-tab="learn"]');click(b,'[data-course="video"]');click(b,'[data-exam="video:'+i+'"]');for(const q of exam.q)answerExam(b,q,true);assert.equal(b.state().exams[exam.id].last,20);assert.equal(b.state().lessons.c1,'2026-10-26');assert.ok(b.doc.querySelector('[data-next-course="video"]'));}finally{b.close();}
});
test('Inner appearance is scoped away from home across navigation and learning screens',()=>{
 const b=boot();try{
  const home=b.doc.querySelector('.orbit-map').outerHTML;
  assert.equal(b.doc.body.classList.contains('sections-ui'),false);
  for(const tab of ['learn','plan','habits','notes','goals','growth','library','tools','settings','more']){
   click(b,'[data-tab="'+tab+'"]');
   assert.ok(b.doc.body.classList.contains('sections-ui'),tab);
  }
  openLesson(b);assert.ok(b.doc.body.classList.contains('sections-ui'));
  click(b,'[data-tab="today"]');
  assert.equal(b.doc.body.classList.contains('sections-ui'),false);
  assert.equal(b.doc.querySelector('.orbit-map').outerHTML,home);
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
      assert.equal(b.doc.body.classList.contains('sections-dark'),expected==='night');
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
    assert.ok(b.doc.body.classList.contains('sections-dark'));
    assert.equal(b.doc.querySelector('.lesson-view'),lesson);
    assert.equal(b.doc.activeElement,focused);
    assert.equal(b.w.localStorage.getItem('dnevnik-state'),before);
    clock.hour=8;
    b.doc.dispatchEvent(new b.w.Event('visibilitychange'));
    assert.equal(b.doc.documentElement.dataset.scene,'day');
    assert.equal(b.doc.body.classList.contains('sections-dark'),false);
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
test('A corrupted primary state recovers from a valid backup',()=>{const b=boot(null,{checks:{},lessons:{e1:'2026-10-26'}},'{broken');try{assert.match(b.doc.body.textContent,/восстановлен/i);click(b,'[data-tab="learn"]');assert.match(b.doc.querySelector('[data-course="eng"]').textContent,/1 из \d+/);}finally{b.close();}});
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
test('Circular destinations open the matching existing courses including Russian and Vitrina',()=>{const b=boot();try{click(b,'.orbit-node[data-learnfilter="lang"]');assert.ok(b.doc.querySelector('[data-course="rus"]'));assert.ok(b.doc.querySelector('[data-course="eng"]'));assert.equal(b.doc.querySelector('[data-course="ai"]'),null);click(b,'[data-tab="today"]');click(b,'.orbit-node[data-learnfilter="code"]');assert.ok(b.doc.querySelector('[data-course="vitrina"]'));click(b,'[data-tab="today"]');click(b,'.orbit-node[data-course="music"]');assert.match(b.doc.querySelector('h1').textContent,/Музыка/);click(b,'[data-tab="today"]');click(b,'.orbit-node[data-learnfilter="ai"]');assert.ok(b.doc.querySelector('[data-course="ai"]'));assert.ok(b.doc.querySelector('[data-course="video"]'));click(b,'[data-tab="today"]');click(b,'.orbit-node[data-learnfilter="art"]');assert.ok(b.doc.querySelector('[data-course="poemlib"]'));}finally{b.close();}});
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

function routeClock(day='2026-10-30',extra){return w=>{const Real=w.Date;w.Date=class extends Real{constructor(...a){super(...(a.length?a:[day+'T12:00:00']));}static now(){return new Real(day+'T12:00:00').getTime();}};if(extra)extra(w);};}
function setRoute(b,kind='shop-wp',budget=45){click(b,'[data-tab="goals"]');if(!b.doc.querySelector('#journey-kind'))click(b,'[data-act="journeysetup"]');b.doc.querySelector('#journey-kind').value=kind;b.doc.querySelector('#journey-title').value='Мой результат';b.doc.querySelector('#journey-deadline').value='2026-12-01';b.doc.querySelector('#journey-budget').value=String(budget);click(b,'[data-act="savejourney"]');}
test('Personal route creates a bounded today plan and survives reload with legacy progress',()=>{
 let b=boot({checks:{'2026-10-26':{eng:1}},lessons:{e1:'2026-10-26'}},null,undefined,routeClock());try{
  setRoute(b);const saved=b.state();assert.ok(saved.activeJourney);assert.equal(saved.journeys[saved.activeJourney].budget,45);click(b,'[data-tab="plan"]');assert.ok(b.doc.querySelector('.journey-day'));assert.ok([...b.doc.querySelectorAll('.task .t-min')].reduce((n,e)=>n+parseInt(e.textContent),0)<=45);assert.equal(b.state().checks['2026-10-26'].eng,1);assert.equal(b.state().lessons.e1,'2026-10-26');b.close();b=boot(saved,null,undefined,routeClock());assert.match(b.doc.querySelector('.home-focus').textContent,/Мой результат/);click(b,'[data-act="journeynext"]');assert.ok(b.doc.querySelector('.lesson-view'));assert.match(b.doc.querySelector('h1').textContent,/WordPress/);
 }finally{b.close();}
});
test('Practice self-check requires saved evidence and resets after a changed version',()=>{
 const b=boot(null,null,undefined,routeClock());try{setRoute(b,'music',30);assert.ok(b.doc.querySelector('.work-editor'));click(b,'[data-act="acceptwork"]');assert.match(b.doc.querySelector('#toast').textContent,/сохрани|Сохрани/);b.doc.querySelector('#work-text').value='<img src=x onerror=alert(1)> mix-v1.wav';click(b,'[data-act="savework"]');assert.equal(b.doc.querySelector('.work-history img'),null);for(const e of b.doc.querySelectorAll('.work-criterion'))e.checked=true;click(b,'[data-act="acceptwork"]');let r=b.state().journeys[b.state().activeJourney];assert.equal(r.works[0].accepted,'2026-10-30');assert.match(b.doc.querySelector('.journey-route').textContent,/Самопроверка/);click(b,'[data-work-stage="0"]');b.doc.querySelector('#work-text').value='mix-v2.wav';click(b,'[data-act="savework"]');r=b.state().journeys[b.state().activeJourney];assert.equal(r.works[0].accepted,null);assert.equal(r.works[0].versions.length,2);assert.equal(b.doc.querySelectorAll('.work-criterion:checked').length,0);}finally{b.close();}
});
test('Changing goals retains completed daily work and prior evidence',()=>{
 const b=boot(null,null,undefined,routeClock());try{setRoute(b);const old=b.state().activeJourney;click(b,'[data-tab="plan"]');const first=b.doc.querySelector('[data-task]'),id=first.getAttribute('data-task');first.click();setRoute(b,'video',45);const saved=b.state();assert.ok(saved.journeys[old]);assert.notEqual(saved.activeJourney,old);click(b,'[data-tab="plan"]');assert.ok(b.doc.querySelector('[data-task="'+id+'"]'));assert.equal(b.doc.querySelector('[data-task="'+id+'"]').getAttribute('aria-pressed'),'true');}finally{b.close();}
});
test('Review after a completed lesson is dated and remains separate from tested mastery',()=>{
 const b=boot(null,null,undefined,routeClock());try{openLesson(b);b.w.COURSES[0].steps[0].ex.forEach((q,i)=>answer(b,i,false));click(b,'[data-act="lessondone"]');assert.equal(b.state().reviews['lesson:e1'].due,'2026-10-31');click(b,'[data-tab="today"]');assert.equal(b.doc.querySelector('[data-review-count]').textContent,'0');click(b,'[data-tab="learn"]');click(b,'[data-course="eng"]');assert.match(b.doc.querySelector('.mastery-summary').textContent,/0.*Проверено|Проверено.*0/);}finally{b.close();}
});
test('Due lesson is reachable from home without resetting its previous completion',()=>{
 const b=boot({checks:{},lessons:{e1:'2026-10-27'}},null,undefined,routeClock());try{assert.equal(b.doc.querySelector('[data-review-count]').textContent,'1');click(b,'[data-act="reviewdue"]');assert.ok(b.doc.querySelector('.lesson-view'));assert.equal(b.state().lessons.e1,'2026-10-27');}finally{b.close();}
});
test('Actual minutes are saved independently of planned minutes',()=>{
 const b=boot(null,null,undefined,routeClock());try{setRoute(b);click(b,'[data-tab="plan"]');b.doc.querySelector('#actual-minutes').value='22';click(b,'[data-act="saveactual"]');assert.equal(b.state().actualMinutes['2026-10-30'],22);assert.match(b.doc.querySelector('.actual-time').textContent,/Фактически/);assert.match(b.doc.querySelector('.plan-view').textContent,/45/);b.doc.querySelector('#actual-minutes').value='-3';click(b,'[data-act="saveactual"]');assert.equal(b.state().actualMinutes['2026-10-30'],22);}finally{b.close();}
});
test('Yesterday manual tasks carry once and old plan dates remain unchanged',()=>{
 const b=boot({checks:{},extraTasks:{'2026-10-29':[{id:'u-old',cat:'plan',t:'Закончить обложку',min:10}]}},null,undefined,routeClock());try{setRoute(b);click(b,'[data-tab="plan"]');click(b,'[data-act="carrytasks"]');click(b,'[data-act="carrytasks"]');const today=b.state().extraTasks['2026-10-30'];assert.equal(today.filter(t=>t.t==='Закончить обложку').length,1);assert.equal(b.state().extraTasks['2026-10-29'].length,1);assert.ok([...b.doc.querySelectorAll('.task .t-min')].reduce((n,e)=>n+parseInt(e.textContent),0)<=45);}finally{b.close();}
});
test('The calendar reaches today after the original five-week plan ends',()=>{
 const b=boot(null,null,undefined,routeClock('2026-12-10'));try{click(b,'[data-tab="plan"]');assert.match(b.doc.querySelector('.pd-date').textContent,/10 декабря, 2026/);click(b,'[data-act="next"]');assert.match(b.doc.querySelector('.pd-date').textContent,/11 декабря/);}finally{b.close();}
});
test('Malformed route backup is rejected without replacing existing learning',async()=>{
 const b=boot({checks:{},lessons:{e1:'2026-10-26'}},null,undefined,routeClock());try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state:{checks:{},journeys:{x:{kind:'music',works:[]}}}})],'bad.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,35));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/);}finally{b.close();}
});
test('System file transfer includes routes but never includes GitHub credentials',async()=>{
 let sent;const b=boot(null,null,undefined,routeClock('2026-10-30',w=>{w.navigator.canShare=()=>true;w.navigator.share=async data=>{sent=data;};}));try{setRoute(b);b.w.localStorage.setItem('rostok-sync',JSON.stringify({token:'secret-never-export'}));click(b,'[data-tab="tools"]');click(b,'[data-act="transferprogress"]');await new Promise(r=>setTimeout(r,10));assert.equal(sent.files.length,1);const content=await new Promise(resolve=>{const r=new b.w.FileReader();r.onload=()=>resolve(r.result);r.readAsText(sent.files[0]);});const saved=JSON.parse(content);assert.ok(saved.state.journeys[saved.state.activeJourney]);assert.doesNotMatch(content,/secret-never-export/);}finally{b.close();}
});
test('A requested Vitrina lesson opens the corresponding real lesson in the app',()=>{
 const b=boot(null,null,undefined,routeClock('2026-10-30',w=>w.history.replaceState({},'','?course=vitrina&lesson=2#learn')));try{assert.ok(b.doc.querySelector('.course-view'));assert.match(b.doc.querySelector('.hero').textContent,/HTML|страниц|структур/i);assert.ok(b.doc.querySelector('[data-lopen="vitrina:1"]'));}finally{b.close();}
});
test('Concurrent sync keeps a whole practical work version instead of mixing two devices',async()=>{
 const seed=boot(null,null,undefined,routeClock());setRoute(seed);let local=seed.state(),id=local.activeJourney;seed.w.RostokJourney.saveWork(local,id,0,'Локальная полная работа с описанием','https://local.test','2026-10-30');const remote=JSON.parse(JSON.stringify(local));seed.w.RostokJourney.saveWork(remote,id,0,'Другая работа','https://long-remote.example.test/version-two','2026-10-30');seed.close();
 const expected=[JSON.stringify(local.journeys[id].works[0]),JSON.stringify(remote.journeys[id].works[0])];
 const b=boot(local,null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>opt.method==='PATCH'?{ok:true,status:200,json:async()=>({id:'test-id'})}:{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:remote})}}})};}));try{await new Promise(r=>setTimeout(r,40));assert.ok(expected.includes(JSON.stringify(b.state().journeys[id].works[0])));}finally{b.close();}
});
test('A carried manual task retains its identity across calendar days',()=>{
 const b=boot({checks:{},extraTasks:{'2026-10-29':[{id:'u-old',cat:'plan',t:'Монтаж',min:10}]}},null,undefined,routeClock());try{setRoute(b);click(b,'[data-tab="plan"]');click(b,'[data-act="carrytasks"]');assert.equal(b.state().extraTasks['2026-10-30'][0].id,'u-old');}finally{b.close();}
});
test('An English card answer survives reload and is not immediately offered again',()=>{
 let b=boot({checks:{},lessons:{e1:'2026-10-27'}},null,undefined,routeClock());try{click(b,'.home-focus [data-act="cards"]');const word=b.doc.querySelector('.flash .w').textContent;click(b,'[data-act="show"]');click(b,'[data-card="0"]');const saved=b.state();assert.equal(saved.reviews['word:'+word.toLowerCase()].due,'2026-10-31');b.close();b=boot(saved,null,undefined,routeClock());click(b,'.home-focus [data-act="cards"]');assert.notEqual(b.doc.querySelector('.flash .w').textContent,word);}finally{b.close();}
});
test('A route and accepted evidence survive importing a backup into a legacy profile',async()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',30);source.doc.querySelector('#work-text').value='Экспорт idea-v1.wav';click(source,'[data-act="savework"]');for(const c of source.doc.querySelectorAll('.work-criterion'))c.checked=true;click(source,'[data-act="acceptwork"]');const backup=source.state();source.close();
 const b=boot({checks:{},lessons:{e1:'2026-10-27'}},null,undefined,routeClock());try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state:backup})],'good.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,35));assert.equal(b.state().journeys[backup.activeJourney].works[0].accepted,'2026-10-30');assert.equal(b.w.RostokJourney.validate(b.state()),true);assert.match(b.doc.querySelector('#toast').textContent,/восстановлен/);}finally{b.close();}
});
test('A newly created route with no work yet syncs to another device',async()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',30);const remote=source.state(),id=remote.activeJourney;source.close();
 const b=boot({checks:{},lessons:{e1:'2026-10-27'}},null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>opt.method==='PATCH'?{ok:true,status:200,json:async()=>({id:'test-id'})}:{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:remote})}}})};}));try{await new Promise(r=>setTimeout(r,40));assert.equal(b.state().activeJourney,id);assert.deepEqual(b.state().journeys[id].works,{});assert.equal(b.state().lessons.e1,'2026-10-27');}finally{b.close();}
});
test('Creating the first route retains completed legacy minutes and XP for today',()=>{
 const b=boot({checks:{'2026-10-30':{eng:1}}},null,undefined,routeClock());try{click(b,'[data-tab="plan"]');assert.match(b.doc.querySelector('.topbar').textContent,/45 мин/);click(b,'[data-tab="more"]');const xp=b.doc.querySelector('.rank-meter-label>b').textContent;setRoute(b,'music',30);click(b,'[data-tab="plan"]');assert.equal(b.doc.querySelector('[data-task="eng"]').getAttribute('aria-pressed'),'true');assert.match(b.doc.querySelector('.topbar').textContent,/45 мин/);click(b,'[data-tab="more"]');assert.equal(b.doc.querySelector('.rank-meter-label>b').textContent,xp);assert.equal(b.w.RostokJourney.validate(b.state()),true);}finally{b.close();}
});
test('Background sync errors preserve an unsaved practical draft independently of saved versions',async()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',30);let seed=source.state(),id=seed.activeJourney;source.w.RostokJourney.saveWork(seed,id,0,'Сохранённая версия','','2026-10-30');source.close();let rejectNetwork;
 let b=boot(seed,null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=()=>new Promise((resolve,reject)=>{rejectNetwork=reject;});}));try{await new Promise(r=>setTimeout(r,0));click(b,'[data-tab="goals"]');const input=b.doc.querySelector('#work-text');input.value='Новый длинный черновик, ещё не версия';input.dispatchEvent(new b.w.Event('input',{bubbles:true}));input.blur();rejectNetwork(new Error('offline'));await new Promise(r=>setTimeout(r,30));assert.equal(b.doc.querySelector('#work-text').value,'Новый длинный черновик, ещё не версия');assert.equal(b.state().journeys[id].works[0].text,'Сохранённая версия');const saved=b.state();b.close();b=boot(saved,null,undefined,routeClock());click(b,'[data-tab="goals"]');assert.equal(b.doc.querySelector('#work-text').value,'Новый длинный черновик, ещё не версия');}finally{b.close();}
});

test('Saving in another open tab preserves the first tabs note with or without a storage event',()=>{
 for(const deliverEvent of [true,false]){
  const a=boot(null,null,undefined,routeClock()),b=boot(null,null,undefined,routeClock());
  try{click(a,'[data-tab="notes"]');a.doc.querySelector('#note-text').value='Заметка из первой вкладки';click(a,'[data-act="addnote"]');const raw=a.w.localStorage.getItem('dnevnik-state');b.w.localStorage.setItem('dnevnik-state',raw);if(deliverEvent)b.w.dispatchEvent(new b.w.StorageEvent('storage',{key:'dnevnik-state',newValue:raw}));click(b,'[data-tab="notes"]');b.doc.querySelector('#note-text').value='Заметка из второй вкладки';click(b,'[data-act="addnote"]');const texts=Object.values(b.state().notes).map(n=>n.x);assert.ok(texts.includes('Заметка из первой вкладки'));assert.ok(texts.includes('Заметка из второй вкладки'));}finally{a.close();b.close();}
 }
});
test('Cross-tab saving keeps a remote deletion and an unrelated local addition',()=>{
 const seed={checks:{},notes:{a:{x:'Удалить'},b:{x:'Оставить'}}},a=boot(seed,null,undefined,routeClock()),b=boot(seed,null,undefined,routeClock());
 try{click(a,'[data-tab="notes"]');click(a,'[data-delnote="a"]');click(a,'[data-delnote="a"]');b.w.localStorage.setItem('dnevnik-state',a.w.localStorage.getItem('dnevnik-state'));click(b,'[data-tab="notes"]');b.doc.querySelector('#note-text').value='Новая';click(b,'[data-act="addnote"]');assert.equal(b.state().notes.a,undefined);assert.equal(b.state().notes.b.x,'Оставить');assert.ok(Object.values(b.state().notes).some(n=>n.x==='Новая'));}finally{a.close();b.close();}
});
test('A completed custom task is counted only once when creating the first route',()=>{
 const b=boot({checks:{'2026-10-30':{'u-own':1}},extraTasks:{'2026-10-30':[{id:'u-own',cat:'plan',t:'Своя практика',min:30}]}},null,undefined,routeClock());
 try{click(b,'[data-tab="more"]');const xp=b.doc.querySelector('.rank-meter-label>b').textContent;assert.equal(xp,'30 XP');setRoute(b,'music',45);click(b,'[data-tab="plan"]');assert.equal(b.doc.querySelectorAll('[data-task="u-own"]').length,1);click(b,'[data-tab="more"]');assert.equal(b.doc.querySelector('.rank-meter-label>b').textContent,xp);}finally{b.close();}
});
test('Private work drafts never enter the outgoing Gist state',async()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',30);source.doc.querySelector('#work-text').value='Локальный черновик';source.doc.querySelector('#work-text').dispatchEvent(new source.w.Event('input',{bubbles:true}));const seed=source.state();source.close();let uploaded;
 const b=boot(seed,null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>{if(opt.method==='PATCH'){uploaded=JSON.parse(JSON.parse(opt.body).files['rostok-state.json'].content).state;return{ok:true,status:200,json:async()=>({id:'test-id'})};}return{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:{checks:{}}})}}})};};}));try{await new Promise(r=>setTimeout(r,40));assert.ok(uploaded);assert.equal(uploaded.workDrafts,undefined);assert.ok(Object.values(b.state().workDrafts).some(d=>d.text==='Локальный черновик'));}finally{b.close();}
});
test('Leaving a direct lesson link removes its course override while retaining the release query',()=>{
 const b=boot(null,null,undefined,routeClock('2026-10-30',w=>w.history.replaceState({},'','?v=4.36&course=vitrina&lesson=2#learn')));try{click(b,'[data-tab="today"]');const q=new URLSearchParams(b.w.location.search);assert.equal(q.get('course'),null);assert.equal(q.get('lesson'),null);assert.equal(q.get('v'),'4.36');assert.ok(b.doc.querySelector('.home-view'));}finally{b.close();}
});
test('An empty word review shows a clear end state rather than an impossible question count',()=>{
 const first=boot(null,null,undefined,routeClock()),words=first.w.COURSES[0].steps[0].words;first.close();const reviews={};for(const w of words)reviews['word:'+w[0].toLowerCase()]={due:'2026-11-01',last:'2026-10-30',level:1,correct:true};const b=boot({checks:{},lessons:{e1:'2026-10-27'},reviews},null,undefined,routeClock());try{click(b,'[data-tab="learn"]');click(b,'[data-course="eng"]');click(b,'[data-act="cards"]');assert.match(b.doc.querySelector('.flash').textContent,/сегодня.*повторены|сегодня.*повторять/i);assert.equal(b.doc.querySelector('.view [data-act="cards"]'),null);assert.doesNotMatch(b.doc.querySelector('.view').textContent,/1 из 0/);}finally{b.close();}
});
test('Loading an older route snapshot removes duplicate legacy custom tasks without losing their checks',()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',45);const seed=source.state(),id=seed.activeJourney;source.close();seed.extraTasks['2026-10-30']=[{id:'u-old',cat:'plan',t:'Своё дело',min:30}];seed.checks['2026-10-30']={'u-old':1};seed.dayPlans['2026-10-30'].items=[{id:'u-old',kind:'legacy',routeId:id,cat:'plan',t:'Своё дело',min:30}];
 const b=boot(seed,null,undefined,routeClock());try{click(b,'[data-tab="plan"]');assert.equal(b.doc.querySelectorAll('[data-task="u-old"]').length,1);assert.equal(b.doc.querySelector('[data-task="u-old"]').getAttribute('aria-pressed'),'true');click(b,'[data-act="replanday"]');assert.equal(b.state().dayPlans['2026-10-30'].items.some(t=>t.id==='u-old'),false);assert.equal(b.state().dayPlans['2026-10-30'].items.reduce((n,t)=>n+t.min,0),15);click(b,'[data-tab="more"]');assert.equal(b.doc.querySelector('.rank-meter-label>b').textContent,'30 XP');}finally{b.close();}
});
test('A progress event from another tab does not replace an active lesson or its answers',()=>{
 const a=boot(null,null,undefined,routeClock()),b=boot(null,null,undefined,routeClock());try{openLesson(b);answer(b,0,false);const lesson=b.doc.querySelector('.lesson-view'),answerBefore=b.state().session.qs[0].pick;a.w.localStorage.setItem('dnevnik-state',b.w.localStorage.getItem('dnevnik-state'));click(a,'[data-tab="notes"]');a.doc.querySelector('#note-text').value='Из другой вкладки';click(a,'[data-act="addnote"]');const raw=a.w.localStorage.getItem('dnevnik-state');b.w.localStorage.setItem('dnevnik-state',raw);b.w.dispatchEvent(new b.w.StorageEvent('storage',{key:'dnevnik-state',newValue:raw}));assert.equal(b.doc.querySelector('.lesson-view'),lesson);answer(b,1,true);assert.equal(b.state().session.qs[0].pick,answerBefore);assert.ok(Object.values(b.state().notes).some(n=>n.x==='Из другой вкладки'));}finally{a.close();b.close();}
});
test('Explicit backup restore replaces a stale tabs state instead of merging unwanted records',async()=>{
 const b=boot({checks:{},notes:{old:{x:'Старое'}}},null,undefined,routeClock());try{b.w.localStorage.setItem('dnevnik-state',JSON.stringify({checks:{},notes:{remote:{x:'Из другой вкладки'}}}));click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state:{checks:{},notes:{replacement:{x:'Из копии'}}}})],'copy.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,35));assert.equal(b.state().notes.remote,undefined);assert.equal(b.state().notes.old,undefined);assert.equal(b.state().notes.replacement.x,'Из копии');}finally{b.close();}
});
test('Imported book identifiers are rendered as text attributes and cannot insert markup',()=>{
 const id='book\"><img data-audit-book src=x onerror=\"window.__audit=1\">',b=boot({checks:{},booksAdded:[{id,t:'Книга'}]},null,undefined,routeClock());try{click(b,'[data-tab="learn"]');click(b,'[data-course="read"]');assert.equal(b.doc.querySelector('[data-audit-book]'),null);const input=[...b.doc.querySelectorAll('[data-book]')].find(e=>e.getAttribute('data-book')===id);assert.ok(input);input.value='3';input.dispatchEvent(new b.w.Event('change',{bubbles:true}));assert.equal(b.state().books[id].page,3);}finally{b.close();}
});
test('Book identifiers that target object prototypes cannot be imported',async()=>{
 for(const id of ['__proto__','constructor','prototype']){const b=boot({checks:{},lessons:{e1:'2026-10-26'}},null,undefined,routeClock());try{click(b,'[data-tab="tools"]');const input=b.doc.querySelector('#importFile');Object.defineProperty(input,'files',{value:[new b.w.File([JSON.stringify({app:'dnevnik',state:{checks:{},booksAdded:[{id,t:'Книга'}]}})],'bad-book.json')]});input.dispatchEvent(new b.w.Event('change',{bubbles:true}));await new Promise(r=>setTimeout(r,25));assert.equal(b.state().lessons.e1,'2026-10-26');assert.match(b.doc.querySelector('#toast').textContent,/не файл/);}finally{b.close();}}
});
test('An existing Gist with private drafts is sanitized even when shared progress is unchanged',async()=>{
 const source=boot(null,null,undefined,routeClock());setRoute(source,'music',30);source.doc.querySelector('#work-text').value='Приватный черновик';source.doc.querySelector('#work-text').dispatchEvent(new source.w.Event('input',{bubbles:true}));const remote=source.state(),local=JSON.parse(JSON.stringify(remote));delete local.workDrafts;source.close();let uploaded;
 const b=boot(local,null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>{if(opt.method==='PATCH'){uploaded=JSON.parse(JSON.parse(opt.body).files['rostok-state.json'].content).state;return{ok:true,status:200,json:async()=>({id:'test-id'})};}return{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:remote})}}})};};}));try{await new Promise(r=>setTimeout(r,40));assert.ok(uploaded);assert.equal(uploaded.workDrafts,undefined);}finally{b.close();}
});
test('Cross-tab note saves preserve duplicate music track names and their separate stages',()=>{
 const seed={checks:{},tracks:[{name:'Демо',stage:5},{name:'Демо',stage:0}]},a=boot(seed,null,undefined,routeClock()),b=boot(seed,null,undefined,routeClock());try{click(a,'[data-tab="notes"]');a.doc.querySelector('#note-text').value='Новая заметка';click(a,'[data-act="addnote"]');const raw=a.w.localStorage.getItem('dnevnik-state');b.w.localStorage.setItem('dnevnik-state',raw);b.w.dispatchEvent(new b.w.StorageEvent('storage',{key:'dnevnik-state',newValue:raw}));click(b,'[data-tab="notes"]');b.doc.querySelector('#note-text').value='Другая заметка';click(b,'[data-act="addnote"]');assert.deepEqual(b.state().tracks,seed.tracks);}finally{a.close();b.close();}
});
test('A device receiving music tracks from Gist retains two tracks with the same name',async()=>{
 const remote={checks:{},tracks:[{name:'Демо',stage:5},{name:'Демо',stage:0}]};const b=boot({checks:{}},null,undefined,routeClock('2026-10-30',w=>{w.localStorage.setItem('rostok-sync',JSON.stringify({token:'test-only',gistId:'test-id',base:{},at:0}));w.fetch=async(url,opt)=>opt.method==='PATCH'?{ok:true,status:200,json:async()=>({id:'test-id'})}:{ok:true,status:200,json:async()=>({files:{'rostok-state.json':{content:JSON.stringify({state:remote})}}})};}));try{await new Promise(r=>setTimeout(r,40));assert.deepEqual(b.state().tracks,remote.tracks);}finally{b.close();}
});
test('Two tabs can append different music tracks without losing either addition',()=>{
 const a=boot({checks:{},tracks:[]},null,undefined,routeClock()),b=boot({checks:{},tracks:[]},null,undefined,routeClock());try{for(const [app,name] of [[a,'Первый'],[b,'Второй']]){click(app,'[data-tab="learn"]');click(app,'[data-course="music"]');app.doc.querySelector('#new-track').value=name;if(app===b)b.w.localStorage.setItem('dnevnik-state',a.w.localStorage.getItem('dnevnik-state'));click(app,'[data-act="addtrack"]');}assert.deepEqual(b.state().tracks.map(t=>t.name),['Первый','Второй']);}finally{a.close();b.close();}
});
test('Stale tabs can update different existing track stages without undoing the other stage',()=>{
 const seed={checks:{},tracks:[{name:'Первый',stage:0},{name:'Второй',stage:0}]},a=boot(seed,null,undefined,routeClock()),b=boot(seed,null,undefined,routeClock());try{for(const app of [a,b]){click(app,'[data-tab="learn"]');click(app,'[data-course="music"]');}click(a,'[data-track="0"][data-stage="2"]');b.w.localStorage.setItem('dnevnik-state',a.w.localStorage.getItem('dnevnik-state'));click(b,'[data-track="1"][data-stage="3"]');assert.deepEqual(b.state().tracks.map(t=>t.stage),[3,4]);}finally{a.close();b.close();}
});

test('Store promotion opens from home and filters exactly its three courses',()=>{
 const b=boot();try{click(b,'[data-learnfilter="marketing"]');const cards=[...b.doc.querySelectorAll('.course-grid [data-course]')].map(e=>e.dataset.course);assert.deepEqual(cards,['marketing-basics','direct','seo']);for(const id of cards)assert.ok(b.w.COURSES.find(c=>c.id===id));}finally{b.close();}
});
test('Promotion lesson completion persists without replacing old progress',()=>{
 let b=boot({checks:{},lessons:{c1:'2026-10-26'}});try{click(b,'[data-tab="learn"]');click(b,'[data-course="marketing-basics"]');click(b,'[data-lopen="marketing-basics:0"]');const s=b.w.COURSES.find(c=>c.id==='marketing-basics').steps[0];for(let j=0;j<s.ex.length;j++){click(b,'[data-lv="'+(j+1)+'"]');const q=s.ex[j];const btn=[...b.doc.querySelectorAll('[data-lp]')].find(e=>e.textContent===q.options[0]);assert.ok(btn);btn.click();}click(b,'[data-lv="'+(s.ex.length+1)+'"]');click(b,'[data-act="lessondone"]');const seed=b.state();assert.ok(seed.lessons['mkt-01']);assert.equal(seed.lessons.c1,'2026-10-26');b.close();b=boot(seed);assert.ok(b.state().lessons['mkt-01']);}finally{b.close();}
});
test('Promotion exams cover existing lessons and retain explanations',()=>{
 const b=boot();try{for(const id of ['marketing-basics','direct','seo']){const c=b.w.COURSES.find(c=>c.id===id);assert.ok(c,id);const lessons=c.steps.filter(s=>!s.exam),exams=c.steps.filter(s=>s.exam);assert.equal(exams.length,2);const covered=new Set();for(const e of exams){assert.equal(e.pass,.8);for(const sid of e.covers){assert.ok(lessons.some(s=>s.id===sid));covered.add(sid);}for(const q of e.q){assert.ok(e.covers.includes(q.s));assert.ok(q.explanation);}}assert.equal(covered.size,lessons.length);}}finally{b.close();}
});
test('Store promotion route persists its three courses and schedules marketing work',()=>{
 const b=boot(null,null,undefined,routeClock());try{setRoute(b,'marketing',45);const seed=b.state(),r=seed.journeys[seed.activeJourney];assert.deepEqual(r.courses,['marketing-basics','direct','seo']);assert.equal(r.kind,'marketing');click(b,'[data-tab="plan"]');assert.ok([...b.doc.querySelectorAll('[data-task]')].length);click(b,'[data-tab="goals"]');assert.match(b.doc.querySelector('#work-text').closest('.card').textContent,/План продвижения и аналитика/);assert.equal(b.w.RostokJourney.validate(seed),true);}finally{b.close();}
});
