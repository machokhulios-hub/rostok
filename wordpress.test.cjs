const {test}=require('node:test');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const vm=require('node:vm');
const path=require('node:path');
const ctx={window:{}};
vm.runInNewContext(fs.readFileSync(path.join(__dirname,'courses.js'),'utf8'),ctx);
const courses=JSON.parse(JSON.stringify(ctx.window.COURSES));
test('WordPress curriculum has complete lessons, usable answers and balanced exams with stable unique IDs',()=>{
 const ids=courses.flatMap(c=>[c.id,...(c.steps||[]).map(s=>s.id)]);
 assert.equal(new Set(ids).size,ids.length,'course/step ids must be unique');
 const c=courses.find(c=>c.id==='wordpress');assert.ok(c);assert.equal(c.cat,'code');assert.equal(c.exampleFormat,'text');
 const lessons=c.steps.filter(s=>!s.exam),exams=c.steps.filter(s=>s.exam);assert.equal(lessons.length,24);assert.equal(exams.length,3);
 const check=q=>{
  assert.ok(typeof q.q==='string'&&q.q.trim());assert.ok(q.why&&q.why.length>20,q.q);
  if(q.k==='choice'){assert.equal(q.options.length,4);assert.equal(new Set(q.options).size,4);assert.ok(q.options.every(s=>typeof s==='string'&&s.trim()));}
  else if(q.k==='input'){assert.ok(Array.isArray(q.a)&&q.a.length>0);assert.ok(q.a.every(s=>typeof s==='string'&&s.trim()));}
  else {assert.equal(q.k,'order');assert.deepEqual(q.words.flatMap(s=>s.split(' ')).sort(),q.a.split(' ').sort());}
 };
 lessons.forEach((s,i)=>{assert.equal(s.id,'wp-'+String(i+1).padStart(2,'0'));assert.equal(typeof s.plan,'string');assert.ok(s.theory.rule.split(/\s+/).length>=180);assert.equal(s.theory.ex.length,5);assert.ok(s.theory.ex.every(e=>e.length===2&&e.every(x=>typeof x==='string'&&x.length>10)));assert.equal(s.ex.length,6);s.ex.forEach(check);});
 exams.forEach((e,i)=>{assert.equal(e.id,'wp-x'+(i+1));assert.equal(e.pass,.8);assert.equal(e.q.length,20);assert.deepEqual(e.covers,lessons.slice(i*8,i*8+8).map(s=>s.id));e.q.forEach(q=>{assert.ok(e.covers.includes(q.s));check(q);});e.covers.forEach(id=>assert.ok(e.q.filter(q=>q.s===id).length>=2,id));});
 assert.ok(c.resources.some(r=>r.href==='wordpress/guide.html'));assert.ok(fs.existsSync(path.join(__dirname,'wordpress/guide.html')));
});
