const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const {JSDOM}=require('jsdom');
const source=()=>fs.readFileSync(__dirname+'/alive.js','utf8');
function fixture(reduce=false){
 const d=new JSDOM('<body class="alive-ui"><main></main></body>',{runScripts:'outside-only'}),w=d.window,frames=new Map();let now=0,id=0,listener;
 const media={matches:reduce,addEventListener:(type,fn)=>{listener=fn;}};
 w.matchMedia=()=>media;w.performance.now=()=>now;w.requestAnimationFrame=fn=>{frames.set(++id,fn);return id;};w.cancelAnimationFrame=i=>frames.delete(i);
 w.eval(source());const root=w.document.querySelector('main');
 return {w,root,frames,media,render:o=>w.RostokAlive.render(root,o),tick:n=>{now=n;const f=[...frames.values()];frames.clear();f.forEach(fn=>fn(now));},reduce:()=>{media.matches=true;listener();},close:()=>w.close()};
}
const markup=n=>'<span data-alive-count="'+n+'" data-alive-key="today">'+n+'</span><i data-alive-fill=".5"></i><svg><circle data-alive-ring=".5" r="17"/></svg><i data-alive-bar=".6"></i>';
test('Alive counts on entry and user action, but a background render shows final values immediately',()=>{
 const b=fixture();try{b.root.innerHTML=markup(30);b.render({screen:'today'});assert.equal(b.root.querySelector('span').textContent,'0');assert.ok(b.frames.size);b.tick(600);assert.equal(b.root.querySelector('span').textContent,'30');
 b.root.innerHTML=markup(30);b.render({screen:'today'});assert.equal(b.frames.size,0);assert.equal(b.root.querySelector('[data-alive-motion]'),null);
 b.root.innerHTML=markup(45);b.render({screen:'today',action:{kind:'task',xp:15,id:'eng'}});assert.equal(b.root.querySelector('span').textContent,'30');b.tick(1200);assert.equal(b.root.querySelector('span').textContent,'45');
 }finally{b.close();}
});
test('Alive confetti occurs once for a first completion, never for repeated or historic results',()=>{
 const b=fixture();try{b.render({screen:'complete',reward:{key:'lesson:e1:first',first:true}});assert.equal(b.root.querySelectorAll('.alive-confetti i').length,40);b.root.innerHTML='';b.render({screen:'complete',reward:{key:'lesson:e1:first',first:true}});assert.equal(b.root.querySelector('.alive-confetti'),null);b.render({screen:'result',reward:{key:'exam:x1:repeat',first:false}});assert.equal(b.root.querySelector('.alive-confetti'),null);}finally{b.close();}
});
test('Reduced motion disables counters, rings, shake and confetti, including a preference change mid-animation',()=>{
 const b=fixture(true);try{b.root.innerHTML=markup(30)+'<div class="feedback no"></div>';b.render({screen:'today',action:{kind:'wrong'},reward:{key:'first',first:true}});assert.equal(b.frames.size,0);assert.equal(b.root.querySelector('span').textContent,'30');assert.equal(b.root.querySelector('[data-alive-motion],.alive-confetti'),null);}finally{b.close();}
 const a=fixture();try{a.root.innerHTML=markup(50);a.render({screen:'today',reward:{key:'first',first:true}});assert.ok(a.frames.size);a.reduce();assert.equal(a.frames.size,0);assert.equal(a.root.querySelector('span').textContent,'50');assert.equal(a.root.querySelector('[data-alive-motion],.alive-confetti'),null);}finally{a.close();}
});
test('Alive task feedback uses the actual XP and only a new incorrect answer shakes',()=>{
 const b=fixture();try{b.root.innerHTML='<li class="task" data-alive-task="eng"><button class="chk"></button></li><div class="feedback no"></div>';b.render({screen:'today',action:{kind:'task',id:'eng',xp:15}});assert.match(b.root.querySelector('.alive-xp-pop').textContent,/\+15 XP/);b.root.innerHTML='<div class="feedback no"></div>';b.render({screen:'lesson',action:{kind:'wrong'}});assert.equal(b.root.querySelector('.feedback.no').dataset.aliveMotion,'shake');b.root.innerHTML='<div class="feedback no"></div>';b.render({screen:'lesson'});assert.equal(b.root.querySelector('[data-alive-motion]'),null);}finally{b.close();}
});
test('A new wrong answer shakes the current visible answer, not a previous sidebar error',()=>{
 const b=fixture();try{b.root.innerHTML='<ol class="lesson-steps"><li><button class="wrong" data-lv="1">Earlier error</button></li></ol><div class="exercise-card" hidden><button class="opt wrong">Earlier answer</button></div><div class="exercise-card"><button class="opt wrong" id="current-error">Current answer</button></div>';b.render({screen:'lesson',action:{kind:'wrong'}});assert.equal(b.root.querySelector('#current-error').dataset.aliveMotion,'shake');assert.equal(b.root.querySelector('.lesson-steps [data-alive-motion]'),null);}finally{b.close();}
});
