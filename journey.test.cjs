const {test}=require('node:test');
const assert=require('node:assert/strict');
const J=require('./journey.js');
const courses=[{id:'wordpress',cat:'code',type:'path',steps:[{id:'one',t:'Страница'},{id:'exam',t:'Проверка',exam:true,covers:['one']},{id:'two',t:'Каталог'}]}];
function state(){const route=J.createRoute({kind:'shop-wp',title:'Мой магазин',deadline:'2026-12-01',budget:45},'2026-10-30','goal1');return {checks:{},lessons:{},practice:{},exams:{},journeys:{goal1:route},activeJourney:'goal1',extraTasks:{},dayPlans:{},reviews:{}};}
test('A route rejects impossible dates and budgets without changing existing progress',()=>{
 for(const input of [{budget:0},{budget:241},{deadline:'2026-02-30'},{deadline:'2026-10-29'},{title:' '}])assert.throws(()=>J.createRoute({kind:'shop-wp',title:'Сайт',deadline:'2026-12-01',budget:45,...input},'2026-10-30','a'));
 assert.deepEqual(J.createRoute({kind:'shop-wp',title:' Сайт ',deadline:'2026-12-01',budget:30},'2026-10-30','a').courses,['wordpress']);
});
test('A study route stops at a prerequisite exam before suggesting the next module',()=>{
 const s=state();assert.equal(J.nextStep(s,courses,s.journeys.goal1).step.id,'one');s.lessons.one='2026-10-30';assert.equal(J.nextStep(s,courses,s.journeys.goal1).step.id,'exam');s.exams.exam={passed:true};assert.equal(J.nextStep(s,courses,s.journeys.goal1).step.id,'two');
});
test('Daily tasks fit the budget and shrink on shift days',()=>{
 const s=state();for(const mode of ['free','shift','light']){const p=J.buildDay(s,courses,'2026-10-30',mode);assert.ok(p.items.length);assert.ok(p.items.reduce((n,t)=>n+t.min,0)<=p.budget);}
 assert.equal(J.buildDay(s,courses,'2026-10-30','shift').budget,20);
 s.extraTasks['2026-10-30']=[{id:'u-1',t:'Своё',min:40}];assert.ok(J.buildDay(s,courses,'2026-10-30','free').items.reduce((n,t)=>n+t.min,0)<=5);
});
test('Replanning keeps completed task text and minutes even after switching goals',()=>{
 const s=state(),p=J.buildDay(s,courses,'2026-10-30','free');s.dayPlans['2026-10-30']=p;const old=p.items[0];s.checks['2026-10-30']={[old.id]:1};s.lessons.one='2026-10-30';s.journeys.goal2=J.createRoute({kind:'music',title:'Трек',deadline:'2026-12-01',budget:30},'2026-10-30','goal2');s.activeJourney='goal2';
 const next=J.buildDay(s,courses,'2026-10-30','free');assert.deepEqual(next.items[0],old);assert.ok(next.items.reduce((n,t)=>n+t.min,0)<=30);
});
test('Spaced review uses calendar dates and same-day successes cannot accelerate it',()=>{
 const s=state();J.recordReview(s,'lesson:one',true,'2026-10-30');assert.equal(s.reviews['lesson:one'].due,'2026-10-31');J.recordReview(s,'lesson:one',true,'2026-10-30');assert.equal(s.reviews['lesson:one'].due,'2026-10-31');J.recordReview(s,'lesson:one',true,'2026-10-31');assert.equal(s.reviews['lesson:one'].due,'2026-11-03');J.recordReview(s,'lesson:one',false,'2026-11-03');assert.equal(s.reviews['lesson:one'].due,'2026-11-04');assert.equal(s.reviews['lesson:one'].level,0);
});
test('Old finished lessons become due without overwriting the old completion date',()=>{
 const s=state();s.lessons.one='2026-10-28';const due=J.dueReviews(s,courses,'2026-10-30');assert.equal(due[0].key,'lesson:one');assert.equal(s.lessons.one,'2026-10-28');assert.deepEqual(s.reviews,{});
});
test('Word review prioritises due words and remembers each answer',()=>{
 const s=state(),words=[['cat','кэт','кот'],['dog','дог','собака']];J.recordReview(s,'word:cat',true,'2026-10-30');assert.equal(J.selectWords(s,words,'2026-10-30',10)[0][0],'dog');J.recordReview(s,'word:dog',false,'2026-10-30');assert.equal(s.reviews['word:dog'].due,'2026-10-31');
});
test('Seen lessons do not become tested mastery merely by finishing or correcting a failed attempt',()=>{
 const s=state();s.lessons.one='2026-10-30';assert.equal(J.mastery(s,'one'),'seen');s.practice.one={last:1,n:5,wrong:[]};assert.equal(J.mastery(s,'one'),'seen');s.practice.one={last:4,n:5,wrong:[]};assert.equal(J.mastery(s,'one'),'checked');
});
test('Work requires evidence and every criterion before self-acceptance',()=>{
 const s=state(),stage=J.presets['shop-wp'].stages[0];assert.throws(()=>J.acceptWork(s,'goal1',0,stage.checks.map(()=>true),'2026-10-30'));J.saveWork(s,'goal1',0,'Страницы созданы','https://example.com','2026-10-30');assert.throws(()=>J.acceptWork(s,'goal1',0,[true],'2026-10-30'));J.acceptWork(s,'goal1',0,stage.checks.map(()=>true),'2026-10-30');assert.equal(s.journeys.goal1.works[0].accepted,'2026-10-30');assert.equal(J.nextStage(s.journeys.goal1),1);
});
test('Editing accepted evidence keeps versions and resets its acceptance',()=>{
 const s=state();J.saveWork(s,'goal1',0,'Первая версия','https://example.com','2026-10-30');J.acceptWork(s,'goal1',0,J.presets['shop-wp'].stages[0].checks.map(()=>true),'2026-10-30');J.saveWork(s,'goal1',0,'Исправленная версия','','2026-10-31');const w=s.journeys.goal1.works[0];assert.equal(w.versions.length,2);assert.equal(w.versions[0].text,'Первая версия');assert.equal(w.accepted,null);assert.deepEqual(w.checks,[]);
});
test('Work rejects executable links while allowing text-only evidence',()=>{
 const s=state();for(const url of ['javascript:alert(1)','data:text/html,x','https://user:password@example.com'])assert.throws(()=>J.saveWork(s,'goal1',0,'Работа',url,'2026-10-30'));J.saveWork(s,'goal1',0,'Экспорт на компьютере: mix-v1.wav','','2026-10-30');assert.equal(s.journeys.goal1.works[0].url,'');
});
test('Validation allows legacy state and rejects malformed nested new fields',()=>{
 assert.equal(J.validate({checks:{}}),true);const s=state();assert.equal(J.validate(s),true);
 for(const change of [{reviews:{x:{due:'tomorrow'}}},{journeys:[]},{dayPlans:{today:{items:'oops'}}},{actualMinutes:{'2026-10-30':-1}},{activeJourney:'missing'}])assert.equal(J.validate({...s,...change}),false);
 J.saveWork(s,'goal1',0,'Работа','','2026-10-30');s.journeys.goal1.works[0].url='javascript:alert(1)';assert.equal(J.validate(s),false);
});
test('Overdue words precede new words and future words stay out of the session',()=>{
 const s=state();s.reviews={'word:cat':{due:'2026-10-28',last:'2026-10-27',level:0,correct:false},'word:bird':{due:'2026-11-01',last:'2026-10-29',level:1,correct:true}};
 assert.deepEqual(J.selectWords(s,[['dog','д','собака'],['cat','к','кот'],['bird','б','птица']],'2026-10-30',10).map(w=>w[0]),['cat','dog']);
});
test('Unknown prototype names in imported route kinds are rejected without throwing',()=>{
 const s=state();for(const kind of ['constructor','__proto__','toString']){s.journeys.goal1.kind=kind;assert.equal(J.validate(s),false);}
});
