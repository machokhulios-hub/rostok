(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RostokJourney = factory();
})(typeof window === 'object' ? window : this, function () {
  'use strict';
  function stage(title, checks) { return {title:title, checks:checks}; }
  var presets = {
    'shop-code': {name:'Магазин на коде',courses:['code','vitrina'],stages:[
      stage('Витрина', ['Есть главная страница и карточки товаров','Страница читается на телефоне','Сохранены исходники и ссылка или описание проверки']),
      stage('Каталог и корзина', ['Товар добавляется и удаляется','Количество и итог пересчитываются','Проверены пустая корзина и неверные данные']),
      stage('Заказ и запуск', ['Учебный заказ проходит весь путь','Проверены ошибки и повторная отправка','Есть опубликованная версия и список оставшихся ограничений'])]},
    'shop-wp': {name:'Магазин на WordPress',courses:['wordpress'],stages:[
      stage('Сайт и страницы', ['Работают главная, меню и контакты','На телефоне нет обрезанного содержимого','Есть резервная копия учебного сайта']),
      stage('Товары и доставка', ['Товар и его варианты добавляются в корзину','Стоимость и способы доставки проверены','Есть тестовые сценарии для отсутствующего товара']),
      stage('Учебный заказ', ['В тестовом режиме создан заказ','Статусы, письма и возврат проверены','Перед боевым запуском записаны вопросы по оплате, документам и данным'])]},
    video: {name:'Готовый видеоролик',courses:['video'],stages:[
      stage('Бриф и раскадровка', ['Определены зритель и цель ролика','Первый кадр и последовательность сцен описаны','Выбран доступный инструмент и лимит попыток']),
      stage('Черновой монтаж', ['Кадры собраны в последовательность','Звук и титры читаемы и согласованы','Проверены лица, текст, предметы и права на исходники']),
      stage('Готовый ролик', ['Экспорт открывается и воспроизводится','Проверены формат, звук и отсутствие лишних кадров','Есть сравнение результата с исходным брифом'])]},
    music: {name:'Выпустить трек',courses:['music'],stages:[
      stage('Идея', ['Сохранён проект и выбран темп','Есть основной мотив или грув на 8–16 тактов','Сделан короткий аудиоэкспорт']),
      stage('Аранжировка', ['Есть начало, развитие и завершение','Переходы прослушаны от начала до конца','Сохранена новая версия проекта и черновой экспорт']),
      stage('Сведение', ['Баланс проверен на небольшой громкости','Проверены низ, вокал или основной инструмент и моно','Есть сравнение с референсом при сопоставимой громкости']),
      stage('Мастеринг', ['Нет слышимых перегрузок и случайных пиков','Экспорт прослушан целиком','Сохранены исходная и финальная версии']),
      stage('Выпуск', ['Подготовлены название, обложка и сведения об авторах','Проверены требования выбранной площадки','Сохранена ссылка на релиз или готовый пакет для публикации'])]},
    course: {name:'Свой учебный результат',courses:[],stages:[
      stage('Самостоятельная работа', ['Задача сформулирована своими словами','Работа сделана с опорой на изученное','Записаны способ проверки, результат и следующий шаг'])]}
  };
  function plain(x) { return !!x && typeof x === 'object' && !Array.isArray(x); }
  function text(x,n) { return typeof x === 'string' && x.length <= n; }
  function date(x) { if (!text(x,10) || !/^\d{4}-\d{2}-\d{2}$/.test(x)) return false; var d=new Date(x+'T12:00:00'); return !isNaN(d) && d.getFullYear()===+x.slice(0,4) && d.getMonth()+1===+x.slice(5,7) && d.getDate()===+x.slice(8); }
  function addDays(x,n) { var d=new Date(x+'T12:00:00');d.setDate(d.getDate()+n);return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
  function safeUrl(x) { if (!x) return true;try { var u=new URL(x);return x.length<=2000 && ['http:','https:'].indexOf(u.protocol)>=0 && !u.username && !u.password; } catch(e) { return false; } }
  function current(s) { return s.journeys && s.journeys[s.activeJourney] || null; }
  function createRoute(input,today,id) {
    var p=presets[input.kind],title=String(input.title || '').trim(),budget=Number(input.budget);
    if (!p || !title || title.length>120 || !date(today) || !date(input.deadline) || input.deadline<today || !Number.isInteger(budget) || budget<15 || budget>240 || !/^[a-zA-Z0-9_-]{1,64}$/.test(id)) throw Error('Проверь название, срок и время: от 15 до 240 минут в день.');
    if (input.kind==='course' && !/^[a-zA-Z0-9_-]{1,64}$/.test(input.course || '')) throw Error('Выбери курс.');
    return {id:id,kind:input.kind,title:title,start:today,deadline:input.deadline,budget:budget,courses:input.kind==='course'?[input.course]:p.courses.slice(),works:{}};
  }
  function nextStage(r) { return presets[r.kind].stages.findIndex(function(x,i){return !r.works[i] || !r.works[i].accepted;}); }
  function nextStep(s,courses,r) {
    for (var ci=0;ci<r.courses.length;ci++) {
      var c=courses.find(function(c){return c.id===r.courses[ci];});if(!c || c.type!=='path')continue;
      for(var i=0;i<c.steps.length;i++){var q=c.steps[i];if(q.exam ? !(s.exams && s.exams[q.id] && s.exams[q.id].passed) : !(s.lessons && s.lessons[q.id]))return {course:c,index:i,step:q};}
    }
    return null;
  }
  function mastery(s,id) { var p=s.practice && s.practice[id];return p && p.n>0 && p.last/p.n>=.8 && Array.isArray(p.wrong) && !p.wrong.length ? 'checked' : s.lessons && s.lessons[id] ? 'seen' : 'new'; }
  var intervals=[1,3,7,14,30];
  function recordReview(s,key,correct,today) {
    if(!s.reviews)s.reviews={};var old=s.reviews[key],level=old?old.level:0;
    if(old && old.last===today && correct)return;
    if(!correct)level=0;else if(old && today>=old.due)level=Math.min(intervals.length-1,level+1);
    s.reviews[key]={due:addDays(today,intervals[level]),last:today,level:level,correct:!!correct};
  }
  function dueReviews(s,courses,today) {
    var out=[];
    courses.forEach(function(c){if(c.type!=='path')return;c.steps.forEach(function(q,i){if(q.exam || !(s.lessons && s.lessons[q.id]))return;var key='lesson:'+q.id,r=s.reviews && s.reviews[key],due=r?r.due:addDays(s.lessons[q.id],1);if(date(due) && due<=today)out.push({key:key,type:'lesson',cid:c.id,index:i,title:q.t,due:due});});});
    return out.sort(function(a,b){return a.due.localeCompare(b.due) || a.key.localeCompare(b.key);});
  }
  function selectWords(s,words,today,limit) {
    var used={};return words.filter(function(w){var key='word:'+w[0].toLowerCase();if(used[key])return false;used[key]=true;var r=s.reviews && s.reviews[key];return !r || r.due<=today;}).sort(function(a,b){var ar=s.reviews && s.reviews['word:'+a[0].toLowerCase()],br=s.reviews && s.reviews['word:'+b[0].toLowerCase()];return (ar?ar.due:'0000').localeCompare(br?br.due:'0000');}).slice(0,limit);
  }
  function buildDay(s,courses,today,mode) {
    var r=current(s);if(!r)return null;
    var budget=mode==='shift'?Math.min(20,r.budget):mode==='light'?Math.min(30,r.budget):r.budget;
    var previous=s.dayPlans && s.dayPlans[today],checks=s.checks && s.checks[today] || {},items=previous?previous.items.filter(function(t){return !!checks[t.id];}).map(function(t){return Object.assign({},t);}):[];
    var spent=items.reduce(function(n,t){return n+t.min;},0)+(s.extraTasks && s.extraTasks[today] || []).reduce(function(n,t){return n+t.min;},0),left=Math.max(0,budget-spent);
    function push(t,want) {if(left<5 || items.some(function(x){return x.id===t.id;}))return;t.min=Math.min(want,left);t.routeId=r.id;items.push(t);left-=t.min;}
    var due=dueReviews(s,courses,today).filter(function(d){return r.courses.indexOf(d.cid)>=0;}),next=nextStep(s,courses,r),stageIndex=nextStage(r);
    if(due.length)push({id:'j-'+r.id+'-rev-'+due[0].key,kind:'review',cat:next && next.course.cat || 'plan',cid:due[0].cid,step:due[0].index,t:'Повторить: '+due[0].title},5);
    if(next)push({id:'j-'+r.id+'-'+next.step.id,kind:next.step.exam?'exam':'lesson',cat:next.course.cat,cid:next.course.id,step:next.index,t:next.step.t},stageIndex<0?left:Math.min(25,Math.max(5,left-10)));
    if(stageIndex>=0)push({id:'j-'+r.id+'-work-'+stageIndex,kind:'work',cat:r.kind==='music'?'music':'plan',stage:stageIndex,t:'Практика: '+presets[r.kind].stages[stageIndex].title},left);
    return {routeId:r.id,budget:budget,items:items};
  }
  function saveWork(s,id,index,body,url,today) {
    var r=s.journeys && s.journeys[id];if(!r || !Number.isInteger(index) || !presets[r.kind].stages[index])throw Error('Этап не найден.');
    body=String(body || '').trim();url=String(url || '').trim();
    if((!body && !url) || body.length>10000 || !safeUrl(url))throw Error('Опиши результат или добавь ссылку http/https без пароля.');
    var old=r.works[index];if(old && old.text===body && old.url===url)return old;
    return r.works[index]={text:body,url:url,versions:(old?old.versions:[]).concat([{text:body,url:url,at:today}]).slice(-20),accepted:null,checks:[]};
  }
  function acceptWork(s,id,index,checks,today) {
    var r=s.journeys && s.journeys[id],w=r && r.works[index],p=r && presets[r.kind].stages[index];
    if(!w || !p || !Array.isArray(checks) || checks.length!==p.checks.length || !checks.every(function(x){return x===true;}))throw Error('Сначала сохрани работу и проверь каждый критерий.');
    w.checks=checks.slice();w.accepted=today;return w;
  }
  function validate(s) {
    function map(x,n,test) {return x==null || plain(x) && Object.keys(x).length<=n && Object.keys(x).every(function(k){return test(x[k],k);});}
    function work(w,r,i) {var stage=presets[r.kind].stages[i];return !!stage && plain(w) && text(w.text,10000) && text(w.url,2000) && safeUrl(w.url) && !!(w.text.trim() || w.url) && Array.isArray(w.versions) && w.versions.length<=20 && w.versions.every(function(v){return plain(v) && text(v.text,10000) && text(v.url,2000) && safeUrl(v.url) && date(v.at);}) && Array.isArray(w.checks) && w.checks.every(function(c){return typeof c==='boolean';}) && (w.accepted==null || date(w.accepted) && w.checks.length===stage.checks.length && w.checks.every(Boolean));}
    return map(s.journeys,100,function(r,id){return plain(r) && /^[a-zA-Z0-9_-]{1,64}$/.test(id) && r.id===id && !!presets[r.kind] && text(r.title,120) && !!r.title.trim() && date(r.start) && date(r.deadline) && r.deadline>=r.start && Number.isInteger(r.budget) && r.budget>=15 && r.budget<=240 && Array.isArray(r.courses) && r.courses.length<=10 && r.courses.every(function(c){return text(c,64) && /^[a-zA-Z0-9_-]+$/.test(c);}) && plain(r.works) && Object.keys(r.works).every(function(i){return /^\d+$/.test(i) && work(r.works[i],r,+i);});}) &&
      (s.activeJourney==null || typeof s.activeJourney==='string' && !!(s.journeys && s.journeys[s.activeJourney])) &&
      map(s.reviews,20000,function(r,k){return /^(lesson|word):/.test(k) && k.length<=200 && plain(r) && date(r.due) && date(r.last) && r.due>=r.last && Number.isInteger(r.level) && r.level>=0 && r.level<intervals.length && typeof r.correct==='boolean';}) &&
      map(s.actualMinutes,5000,function(n,k){return date(k) && Number.isInteger(n) && n>=0 && n<=1440;}) &&
      map(s.dayPlans,5000,function(p,k){return date(k) && plain(p) && text(p.routeId,64) && !!(s.journeys && s.journeys[p.routeId]) && Number.isInteger(p.budget) && p.budget>=15 && p.budget<=240 && Array.isArray(p.items) && p.items.length<=100 && p.items.every(function(t){return plain(t) && text(t.id,200) && text(t.t,200) && text(t.cat,64) && ['lesson','exam','work','review','words'].indexOf(t.kind)>=0 && Number.isInteger(t.min) && t.min>0 && t.min<=240 && text(t.routeId,64) && !!(s.journeys && s.journeys[t.routeId]) && (t.kind==='work'?Number.isInteger(t.stage) && !!presets[s.journeys[t.routeId].kind].stages[t.stage]:text(t.cid,64) && Number.isInteger(t.step) && t.step>=0);});});
  }
  return {presets:presets,current:current,createRoute:createRoute,nextStage:nextStage,nextStep:nextStep,mastery:mastery,recordReview:recordReview,dueReviews:dueReviews,selectWords:selectWords,buildDay:buildDay,saveWork:saveWork,acceptWork:acceptWork,validate:validate,addDays:addDays};
});
