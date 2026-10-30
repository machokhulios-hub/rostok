/* Motion for mockup 38. All memory stays outside saved learning progress. */
(function (w) {
  'use strict';
  var media = w.matchMedia ? w.matchMedia('(prefers-reduced-motion: reduce)') : {matches:false};
  var screen = null, values = Object.create(null), celebrated = new Set(), frames = [], timers = [], activeRoot = null;
  function enabled() { return !media.matches && w.document.body.classList.contains('alive-ui'); }
  function clamp(n) { return Math.max(0, Math.min(1, Number(n) || 0)); }
  function cancel() { frames.forEach(function(id){w.cancelAnimationFrame(id);}); frames=[];timers.forEach(function(id){w.clearTimeout(id);});timers=[]; }
  function frame(fn) { var id=w.requestAnimationFrame(fn);frames.push(id); }
  function mark(el,kind) { el.setAttribute('data-alive-motion',kind); }
  function settle(root) {
    cancel();root=root || activeRoot;if(!root)return;
    root.querySelectorAll('[data-alive-count]').forEach(function(el){el.textContent=el.dataset.aliveCount;values[el.dataset.aliveKey]=Number(el.dataset.aliveCount);});
    root.querySelectorAll('[data-alive-motion]').forEach(function(el){el.removeAttribute('data-alive-motion');});
    root.querySelectorAll('.alive-confetti,.alive-xp-pop').forEach(function(el){el.remove();});
  }
  function count(el,from,to) {
    var start=w.performance.now(),key=el.dataset.aliveKey;
    if(from===to)return;
    mark(el,'count');el.textContent=Math.round(from);values[key]=from;
    function step(now) {
      if(!el.isConnected)return;
      var p=clamp((now-start)/600),v=Math.round(from+(to-from)*(1-Math.pow(1-p,3)));
      el.textContent=v;values[key]=v;
      if(p<1)frame(step);else el.removeAttribute('data-alive-motion');
    }
    frame(step);
  }
  function confetti(root,key) {
    if(celebrated.has(key))return;
    celebrated.add(key);
    var layer=w.document.createElement('div'),colours=['#FFD166','#FF7A59','#00D2FF','#6C5CE7','#4ADE80'];
    layer.className='alive-confetti';layer.setAttribute('aria-hidden','true');
    for(var i=0;i<40;i++){
      var p=w.document.createElement('i');p.style.left=(i*29%100)+'%';p.style.background=colours[i%colours.length];
      p.style.setProperty('--drift',((i*37%160)-80)+'px');p.style.setProperty('--spin',(i*83%720-360)+'deg');p.style.setProperty('--delay',-(i%7)*.025+'s');layer.appendChild(p);
    }
    root.appendChild(layer);timers.push(w.setTimeout(function(){layer.remove();},1200));
  }
  function render(root,options) {
    options=options || {};cancel();activeRoot=root;
    var entry=screen!==options.screen,action=options.action || {},motion=enabled(),old=Object.assign({},values);
    screen=options.screen;
    root.querySelectorAll('[data-alive-count]').forEach(function(el){
      var target=Number(el.dataset.aliveCount)||0,key=el.dataset.aliveKey;
      values[key]=target;el.textContent=target;
      if(motion && (entry || action.kind==='task'))count(el,old[key]==null?0:old[key],target);
    });
    root.querySelectorAll('[data-alive-fill]').forEach(function(el){
      var target=clamp(el.dataset.aliveFill);el.style.setProperty('--alive-to',target);
      if(motion && (entry || action.kind==='task' || options.reward)){
        el.style.setProperty('--alive-from',clamp(el.dataset.aliveFrom || (action.kind==='task' && action.fromFill) || 0));mark(el,'fill');
      }
    });
    root.querySelectorAll('[data-alive-ring]').forEach(function(el,i){
      var radius=Number(el.getAttribute('r'))||17,c=2*Math.PI*radius;
      el.setAttribute('stroke-dasharray',String(c));el.setAttribute('stroke-dashoffset',String(c*(1-clamp(el.dataset.aliveRing))));
      el.style.setProperty('--ring-length',c);el.style.setProperty('--ring-offset',c*(1-clamp(el.dataset.aliveRing)));el.style.setProperty('--alive-delay',(i*40)+'ms');
      if(motion && entry)mark(el,'ring');
    });
    root.querySelectorAll('[data-alive-bar]').forEach(function(el,i){el.style.setProperty('--alive-to',clamp(el.dataset.aliveBar));el.style.setProperty('--alive-delay',i*60+'ms');if(motion && entry)mark(el,'bar');});
    if(!motion)return;
    if(action.kind==='task' && action.xp>0){
      var task=Array.from(root.querySelectorAll('[data-alive-task]')).find(function(el){return el.dataset.aliveTask===action.id;});
      if(task){var pop=w.document.createElement('span');pop.className='alive-xp-pop';pop.setAttribute('aria-hidden','true');pop.textContent='+'+action.xp+' XP';task.appendChild(pop);var check=task.querySelector('.chk');if(check)mark(check,'task');timers.push(w.setTimeout(function(){pop.remove();},700));}
    }
    if(action.kind==='wrong'){var wrong=Array.from(root.querySelectorAll('.opt.wrong,.feedback.no')).find(function(el){return !el.closest('[hidden]');});if(wrong)mark(wrong,'shake');}
    if(options.reward){
      var reward=root.querySelector('.alive-reward-number');if(reward)mark(reward,'reward');
      if(options.reward.first)confetti(root,options.reward.key);
    }
  }
  if(media.addEventListener)media.addEventListener('change',function(){if(media.matches)settle();});
  else if(media.addListener)media.addListener(function(){if(media.matches)settle();});
  w.RostokAlive={render:render,settle:settle};
})(window);
