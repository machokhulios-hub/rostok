const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs'),path=require('node:path'),vm=require('node:vm');
const ctx={window:{}};vm.runInNewContext(fs.readFileSync(path.join(__dirname,'courses.js'),'utf8'),ctx);
const courses=JSON.parse(JSON.stringify(ctx.window.COURSES));
test('Video generation section has complete lessons, answerable exercises and balanced module exams',()=>{
 const c=courses.find(c=>c.id==='video');assert.ok(c);assert.equal(c.cat,'ai');assert.equal(c.exampleFormat,'text');
 const lessons=c.steps.filter(s=>!s.exam),exams=c.steps.filter(s=>s.exam);assert.equal(lessons.length,16);assert.equal(exams.length,2);
 const check=q=>{assert.ok(q.q&&q.why&&q.why.length>15);if(q.k==='choice'){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options.every(s=>typeof s==='string'&&s.trim()));}else{assert.equal(q.k,'input');assert.ok(q.a.length&&q.a.every(s=>typeof s==='string'&&s.trim()));}};
 lessons.forEach((s,i)=>{assert.equal(s.id,'vid-'+String(i+1).padStart(2,'0'));assert.equal(typeof s.plan,'string');assert.ok(s.theory.rule.split(/\s+/).length>=170);assert.equal(s.theory.ex.length,5);assert.ok(s.theory.ex.every(e=>e.length===2&&e.every(x=>typeof x==='string'&&x.length>10)));assert.equal(s.ex.length,6);assert.equal(s.ex.filter(q=>q.k==='input').length,1);s.ex.forEach(check);});
 exams.forEach((e,i)=>{assert.equal(e.id,'vid-x'+(i+1));assert.equal(e.pass,.8);assert.equal(e.q.length,20);assert.deepEqual(e.covers,lessons.slice(i*8,i*8+8).map(s=>s.id));e.q.forEach(q=>{assert.ok(e.covers.includes(q.s));check(q);});e.covers.forEach(id=>assert.ok(e.q.filter(q=>q.s===id).length>=2,id));});
 assert.ok(c.resources.some(r=>r.href==='video/guide.html'));assert.ok(fs.existsSync(path.join(__dirname,'video/guide.html')));
});
test('Video tools directory retains official sources and review date without making retired Sora a current tool',()=>{
 const data=JSON.parse(fs.readFileSync(path.join(__dirname,'video/tools.json'),'utf8'));assert.equal(data.checkedAt,'2026-10-30');assert.ok(data.tools.length>=10);assert.ok(data.tools.every(t=>t.name&&t.role&&/^https:\/\//.test(t.url)&&t.sources.length));assert.equal(data.tools.some(t=>/sora/i.test(t.name)),false);assert.ok(data.retired.some(t=>/sora/i.test(t.name)));assert.ok(data.tools.some(t=>/Flow/.test(t.name)&&/Росс/.test(t.accessNote)));
});
