const {test}=require('node:test'),assert=require('node:assert/strict'),fs=require('node:fs'),vm=require('node:vm');
function courses(){const w={window:{}};vm.createContext(w);vm.runInContext(fs.readFileSync(__dirname+'/courses.js','utf8'),w);return w.window.COURSES;}
test('Direct and SEO add independent case exams and self-entered practice without replacing old steps',()=>{
 for(const id of ['direct','seo']){const c=courses().find(c=>c.id===id),e=c.steps.find(s=>s.id===id+'-case-final');assert.ok(e,id);assert.equal(e.pass,.8);assert.ok(e.q.length>=12);assert.ok(e.q.some(q=>q.k==='input'));const lessons=c.steps.filter(s=>!s.exam);for(const q of e.q){assert.ok(e.covers.includes(q.s));assert.ok(q.explanation);assert.ok(!lessons.some(s=>s.ex.some(x=>x.q===q.q)));}assert.equal(c.steps.filter(s=>s.id.startsWith(id+'-practice-')).length,2);}
});
test('Numeric case answers match their supplied data',()=>{const d=courses().find(c=>c.id==='direct'),q=d.steps.find(s=>s.id==='direct-practice-01');assert.ok(q);assert.deepEqual(Array.from(q.ex.filter(q=>q.k==='input').map(q=>q.a[0])),['900','20','4']);});
