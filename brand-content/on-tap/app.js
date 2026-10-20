(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const store={
  get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},
  set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}
};
const TOPICS={
  intro:'Brand Content vs Content Marketing',
  da:'Direction artistique & prise de vue',
  codes:'Univers & codes de marque',
  strat:'Cible, objectifs & Big Idea',
  story:'Storytelling & case studies',
  eco:'Écosystème de contenus & formats natifs',
  offline:'Formats offline',
  online:'Phygital & formats online'
};
const SEANCE={intro:'S1',da:'S1',codes:'S2',strat:'S2',story:'S2',eco:'S3',offline:'S4',online:'S4'};
const TYPE={s:'Một đáp án',m:'Nhiều đáp án',tf:'Vrai / Faux'};
const LET='ABCDEFG';

const ALL=QB.list.map(q=>{
  if(q.t==='tf'){q.o=['Vrai — Đúng','Faux — Sai'];q.a=[q.a?0:1];q.k=1}
  else q.ov=q.ov||QV[q.id]||null;
  return q;
});
const byId=Object.fromEntries(ALL.map(q=>[q.id,q]));
function shuffle(a){a=a.slice();for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
const byTopic=t=>ALL.filter(q=>q.topic===t);
function balanced(n){
  const per=Math.ceil(n/Object.keys(TOPICS).length);
  let out=[];Object.keys(TOPICS).forEach(t=>{out=out.concat(shuffle(byTopic(t)).slice(0,per))});
  return shuffle(out).slice(0,n);
}

let wrong=new Set(store.get('bc2-wrong',[]).filter(id=>byId[id]));
let best=store.get('bc2-best',{});
const saveWrong=()=>{store.set('bc2-wrong',[...wrong]);$('#wrongN').textContent=wrong.size};

const bySeance=s=>ALL.filter(q=>SEANCE[q.topic]===s);
const DESC={
  intro:'Brand centric vs user centric, định nghĩa, packshot vs mise en scène.',
  da:'Avant le shooting, règles de mise en scène, mosaïque Insta, rushes, hero shot.',
  codes:'Audit (est / dit / montre / fait), brand culture, faire évoluer ses codes, Coca-Cola Real Magic.',
  strat:'Cibles, persona, insights, 6 objectifs, 3 questions, Big Idea S-F-P-D-M, schéma Aqualys.',
  story:'Définition, rôle de la marque, quelqu\'un / veut / mais / alors / à la fin, Dove, BMW, Johnnie Walker.',
  eco:'Content design, 5 fonctions, dupliquer / adapter / décliner, contenu maître, natif, 9:16, Netflix OITNB.',
  offline:'Format / support / contenu, affichage, print, packaging, guérilla, ambush, pop-up, événement.',
  online:'Phygital, DOOH, FOOH, interstitiels, scrollytelling, AR/VR, formats hybrides, checklist finale.'
};
const GROUPS=[
  {name:'Đề theo chủ đề (bám từng phần của slide)',items:Object.keys(TOPICS).map((t,i)=>({id:t,k:SEANCE[t]+' · Đề '+(i+1),name:TOPICS[t],d:DESC[t],pick:()=>shuffle(byTopic(t)),size:byTopic(t).length,mode:'practice'}))},
  {name:'Đề theo buổi học',items:['S1','S2','S3','S4'].map(s=>({id:'seance-'+s,k:'Séance '+s.slice(1),name:'Toàn bộ buổi '+s.slice(1),d:'Mọi câu hỏi thuộc séance '+s.slice(1)+', trộn ngẫu nhiên.',pick:()=>shuffle(bySeance(s)),size:bySeance(s).length,mode:'practice'}))},
  {name:'Đề tổng hợp (trộn toàn bộ kiến thức)',items:[
    {id:'exam',k:'Thi thử',name:'11 câu QCM · 12 phút',d:'Giống phần QCM của đề thật (11 câu, 11 điểm): bấm giờ 12 phút để còn ~18 phút cho 3 câu mở, chỉ chấm khi nộp, hết giờ tự nộp. Mỗi lần là một đề mới.',pick:()=>balanced(11),size:11,mode:'exam',time:12*60,dark:1},
    {id:'mixB',k:'Tổng hợp A',name:'24 câu chia đều chủ đề',d:'Mỗi chủ đề góp 3 câu, giúp phát hiện phần còn yếu.',pick:()=>balanced(24),size:24,mode:'practice'},
    {id:'mixA',k:'Tổng hợp B',name:'40 câu ngẫu nhiên',d:'Bốc ngẫu nhiên từ toàn bộ ngân hàng, mỗi lần làm là một đề mới.',pick:()=>shuffle(ALL).slice(0,40),size:40,mode:'practice'},
    {id:'all',k:'Toàn bộ',name:'Tất cả câu hỏi',d:'Làm hết ngân hàng câu hỏi theo thứ tự ngẫu nhiên.',pick:()=>shuffle(ALL),size:ALL.length,mode:'practice'}
  ]},
  {name:'Luyện theo dạng câu hỏi',items:[
    {id:'tf',k:'Đề nhanh',name:'Chỉ câu Vrai / Faux',d:'Bấm là chấm, luyện phản xạ với các khẳng định dễ gây nhầm.',pick:()=>shuffle(ALL.filter(q=>q.t==='tf')),size:ALL.filter(q=>q.t==='tf').length,mode:'practice'},
    {id:'multi',k:'Đề khó',name:'Chỉ câu nhiều đáp án',d:'Phải chọn đủ và đúng tất cả đáp án mới được tính điểm.',pick:()=>shuffle(ALL.filter(q=>q.t==='m')),size:ALL.filter(q=>q.t==='m').length,mode:'practice'},
    {id:'apply',k:'Tình huống',name:'Câu ví dụ và tình huống',d:'Nhìn một ví dụ cụ thể rồi gọi đúng khái niệm: format hay support, message hay slogan, dupliquer hay décliner…',pick:()=>shuffle(ALL.filter(q=>q.c)),size:ALL.filter(q=>q.c).length,mode:'practice'}
  ]}
];
const EX_WRONG={id:'wrong',k:'Ôn câu sai',name:'Những câu bạn từng làm sai',mode:'practice',pick:()=>shuffle(ALL.filter(q=>wrong.has(q.id)))};

/* ---------- views ---------- */
const VIEWS=['learn','exams','case','quiz','result','wrong'];
function show(v){
  VIEWS.forEach(n=>{$('#view-'+n).hidden=n!==v});
  const tabV=v==='quiz'||v==='result'?'exams':v;
  document.querySelectorAll('.tab').forEach(b=>b.setAttribute('aria-selected',b.dataset.view===tabV?'true':'false'));
  if(v==='learn'||v==='exams'||v==='wrong'||v==='case')store.set('bc2-tab',v);
  if(v==='case')renderCase();
  if(v==='wrong')renderWrong();
  if(v==='exams')renderExams();
  window.scrollTo(0,0);
}
document.querySelectorAll('.tab').forEach(b=>b.addEventListener('click',()=>{
  show(b.dataset.view);
}));

/* ---------- notes ---------- */
function renderLearn(){
  $('#toc').innerHTML=SUMMARY.map(s=>`<a href="#${s.id}">${esc(s.title)}</a>`).join('');
  $('#notes').innerHTML=SUMMARY.map((s,i)=>`<section class="sec" id="${s.id}"><div class="eyebrow">Phần ${i+1} · ${esc(s.en)}</div><h2>${esc(s.title)}</h2>${s.html}</section>`).join('');
  $('#toc').addEventListener('click',e=>{const a=e.target.closest('a');if(!a)return;e.preventDefault();const el=document.getElementById(a.getAttribute('href').slice(1));if(el)el.scrollIntoView({behavior:'smooth'})});
}

/* ---------- exam list ---------- */
function renderExams(){
  $('#qTotal').textContent=ALL.length;
  $('#examGroups').innerHTML=GROUPS.map((g,gi)=>`<div class="group eyebrow">${esc(g.name)}</div><div class="grid">${g.items.map((e,ei)=>{
    const b=best[e.id];
    const d=e.d||('Toàn bộ câu hỏi chủ đề "'+e.name+'", luyện tập có giải thích.');
    return `<button class="ex${e.dark?' dark':''}" data-g="${gi}" data-e="${ei}"><span class="eyebrow">${esc(e.k)}</span><span class="n">${esc(e.name)}</span><span class="d">${esc(d)}</span><span class="meta"><span>${e.size} câu${e.mode==='exam'?' · chấm cuối':''}</span>${b!=null?`<span class="best">Tốt nhất ${b}%</span>`:'<span>Chưa làm</span>'}</span></button>`}).join('')}</div>`).join('');
}
$('#examGroups').addEventListener('click',e=>{const b=e.target.closest('.ex');if(!b)return;startExam(GROUPS[+b.dataset.g].items[+b.dataset.e])});

/* ---------- quiz ---------- */
let S=null,tick=null;
function startExam(ex,list){
  const src=list||ex.pick();
  if(!src.length){show('wrong');return}
  S={ex,i:0,mode:ex.mode||'practice',submitted:false,end:ex.time?Date.now()+ex.time*1000:0,
     qs:src.map(q=>({q,order:q.k?q.o.map((_,i)=>i):shuffle(q.o.map((_,i)=>i)),sel:new Set(),done:false}))};
  clearInterval(tick);$('#timer').hidden=!S.end;
  if(S.end){updTimer();tick=setInterval(updTimer,1000)}
  show('quiz');renderQ();
}
const isRight=x=>x.sel.size===x.q.a.length&&x.q.a.every(i=>x.sel.has(i));
const revealed=x=>S.mode==='practice'?x.done:S.submitted;
function letters(x,idx){return x.order.map((oi,p)=>idx.includes(oi)?LET[p]:null).filter(Boolean)}

function renderQ(){
  const x=S.qs[S.i],q=x.q,rev=revealed(x),multi=q.t==='m';
  $('#qPos').textContent=`Câu ${S.i+1} / ${S.qs.length}`;
  $('#qTitle').textContent=S.ex.k+' · '+S.ex.name;
  const doneN=S.qs.filter(y=>S.mode==='practice'?y.done:y.sel.size).length;
  $('#prog').style.width=(doneN/S.qs.length*100)+'%';
  $('#qChips').innerHTML=`<span class="chip">${esc(TOPICS[q.topic])}</span><span class="chip${multi?' multi':''}">${TYPE[q.t]}</span>${wrong.has(q.id)&&!rev?'<span class="chip">Từng làm sai</span>':''}`;
  $('#qText').textContent=q.q;
  $('#qHint').textContent=multi?'Có thể có nhiều đáp án đúng. Chọn tất cả rồi bấm Kiểm tra.':q.t==='tf'?'Khẳng định sau đúng hay sai?':'Chọn một đáp án đúng nhất.';
  const opts=$('#opts');opts.className='opts'+(multi?' m':'');
  opts.innerHTML=x.order.map((oi,p)=>{
    let c='opt',tag='';
    if(rev){
      const ok=q.a.includes(oi);
      if(ok){c+=' right';tag=x.sel.has(oi)?'Đáp án đúng':(multi?'Bạn bỏ sót':'Đáp án đúng')}
      else if(x.sel.has(oi)){c+=' wrong';tag='Bạn chọn'}
    }else if(x.sel.has(oi))c+=' sel';
    return `<button class="${c}" data-oi="${oi}" ${rev?'disabled':''} aria-pressed="${x.sel.has(oi)}"><span class="L">${LET[p]}</span><span class="otx"><span>${esc(q.o[oi])}</span>${q.ov&&(rev||ovAlways)?`<span class="ov">${esc(q.ov[oi])}</span>`:''}</span>${tag?`<span class="tag">${tag}</span>`:''}</button>`;
  }).join('');
  if(rev){
    const ok=isRight(x),none=!x.sel.size;
    const ans=letters(x,q.a).map(l=>{const oi=x.order[LET.indexOf(l)];return `<b>${l}.</b> ${esc(q.o[oi])}${q.ov?`<span class="ans-vi">→ ${esc(q.ov[oi])}</span>`:''}`}).join(q.ov?'':'<br>');
    $('#fb').innerHTML=`<div class="fb ${ok?'ok':'bad'}"><div class="fb-h">${ok?'✓ Chính xác!':none?'Chưa trả lời':'✗ Chưa đúng'}</div><p><span class="lbl">Đáp án đúng</span><br>${ans}</p><p><span class="lbl">Dịch câu hỏi</span>${esc(q.vi)}</p><p><span class="lbl">Giải thích</span>${q.e}</p></div>`;
  }else $('#fb').innerHTML='';
  $('#prevBtn').disabled=S.i===0;
  const last=S.i===S.qs.length-1,mb=$('#mainBtn');mb.disabled=false;
  if(S.mode==='practice'){
    if(!x.done){mb.textContent='Kiểm tra';mb.disabled=!x.sel.size}
    else mb.textContent=last?'Xem kết quả':'Câu tiếp theo →';
  }else{
    if(!S.submitted)mb.textContent=last?'Nộp bài':'Câu tiếp theo →';
    else mb.textContent=last?'Về bảng kết quả':'Câu tiếp theo →';
  }
  $('#finishBtn').textContent=S.mode==='exam'&&!S.submitted?'Nộp bài':S.submitted||S.mode==='practice'?'Xem kết quả':'Kết thúc';
  $('#dots').innerHTML=S.qs.map((y,j)=>{
    let c='dot';const r=revealed(y);
    if(r&&(y.done||S.submitted))c+=isRight(y)?' ok':' bad';else if(y.sel.size)c+=' ans';
    if(j===S.i)c+=' cur';
    return `<button class="${c}" data-j="${j}" aria-label="Câu ${j+1}">${j+1}</button>`;
  }).join('');
}
function record(x){if(isRight(x))wrong.delete(x.q.id);else wrong.add(x.q.id)}
function pick(oi){
  const x=S.qs[S.i];if(revealed(x))return;
  if(x.q.t==='m'){x.sel.has(oi)?x.sel.delete(oi):x.sel.add(oi)}
  else{x.sel=new Set([oi]);if(S.mode==='practice'){x.done=true;record(x);saveWrong()}}
  renderQ();
}
function go(j){if(j<0||j>=S.qs.length)return;S.i=j;renderQ();$('#view-quiz').scrollIntoView({block:'start'})}
function main(){
  const x=S.qs[S.i],last=S.i===S.qs.length-1;
  if(S.mode==='practice'){
    if(!x.done){if(!x.sel.size)return;x.done=true;record(x);saveWrong();renderQ();return}
    last?finish():go(S.i+1);
  }else{
    if(!S.submitted&&last){submit();return}
    if(S.submitted&&last){renderResult();return}
    go(S.i+1);
  }
}
function submit(){
  if(S.submitted)return;
  S.submitted=true;clearInterval(tick);$('#timer').hidden=true;
  S.qs.forEach(x=>{x.done=true;record(x)});saveWrong();renderResult();
}
function finish(){if(S.mode==='exam'&&!S.submitted)submit();else renderResult()}
function updTimer(){
  const rem=Math.max(0,Math.round((S.end-Date.now())/1000));
  const t=$('#timer');t.textContent=String(Math.floor(rem/60)).padStart(2,'0')+':'+String(rem%60).padStart(2,'0');
  t.classList.toggle('low',rem<=120);
  if(rem<=0)submit();
}
$('#opts').addEventListener('click',e=>{const b=e.target.closest('.opt');if(b&&!b.disabled)pick(+b.dataset.oi)});
$('#dots').addEventListener('click',e=>{const b=e.target.closest('.dot');if(b)go(+b.dataset.j)});
$('#prevBtn').addEventListener('click',()=>go(S.i-1));
$('#mainBtn').addEventListener('click',main);
$('#finishBtn').addEventListener('click',finish);
let ovAlways=store.get('bc2-ov',false);
$('#ovBtn').setAttribute('aria-pressed',String(ovAlways));
$('#ovBtn').addEventListener('click',()=>{ovAlways=!ovAlways;store.set('bc2-ov',ovAlways);$('#ovBtn').setAttribute('aria-pressed',String(ovAlways));if(S)renderQ()});
document.addEventListener('keydown',e=>{
  if($('#view-quiz').hidden||e.metaKey||e.ctrlKey||e.altKey)return;
  const k=e.key.toUpperCase();const x=S.qs[S.i];
  let p=-1;if(/^[1-7]$/.test(k))p=+k-1;else if(/^[A-G]$/.test(k))p=LET.indexOf(k);
  if(p>=0&&p<x.order.length){e.preventDefault();pick(x.order[p]);return}
  if(e.key==='Enter'&&!e.target.closest('button')){e.preventDefault();main()}
  else if(e.key==='ArrowRight')go(S.i+1);else if(e.key==='ArrowLeft')go(S.i-1);
});

/* ---------- result ---------- */
function renderResult(){
  clearInterval(tick);
  const total=S.qs.length,right=S.qs.filter(x=>x.done&&isRight(x)).length,pct=Math.round(right/total*100);
  const skipped=S.qs.filter(x=>!x.done).length;
  best[S.ex.id]=Math.max(best[S.ex.id]||0,pct);store.set('bc2-best',best);
  const tps={};S.qs.forEach(x=>{const t=x.q.topic;tps[t]=tps[t]||{n:0,r:0};tps[t].n++;if(x.done&&isRight(x))tps[t].r++});
  const bad=S.qs.map((x,j)=>({x,j})).filter(o=>!(o.x.done&&isRight(o.x)));
  const v=pct>=80?['ok','Rất tốt, sẵn sàng đi thi']:pct>=60?['ok','Khá, ôn lại các câu sai']:['bad','Cần đọc lại phần kiến thức'];
  $('#view-result').innerHTML=`<div class="eyebrow">${esc(S.ex.k)} · ${esc(S.ex.name)}</div><h1>Kết quả</h1>
  <div class="score"><span class="big">${pct}%</span><span class="of">${right} / ${total} câu đúng${skipped?` · ${skipped} câu chưa làm`:''}</span><span class="verdict ${v[0]}">${v[1]}</span></div>
  <div class="eyebrow">Theo chủ đề</div>
  <div class="rows">${Object.keys(tps).map(t=>`<div class="row"><span>${esc(TOPICS[t])}</span><span class="bar"><i style="width:${tps[t].r/tps[t].n*100}%"></i></span><span class="v">${tps[t].r}/${tps[t].n}</span></div>`).join('')}</div>
  <div class="actions" style="justify-content:flex-start"><button class="btn pri" id="rAgain">Làm lại đề này</button>${bad.length?'<button class="btn" id="rWrong">Làm lại '+bad.length+' câu sai</button>':''}<button class="btn" id="rReview">Xem lại bài làm</button><button class="btn ghost" id="rBack">Về danh sách đề</button></div>
  ${bad.length?`<div class="group eyebrow">Câu sai hoặc bỏ trống · bấm để xem giải thích</div><ul class="qlist">${bad.map(o=>`<li><button data-j="${o.j}"><span class="i">${o.j+1}</span><span>${esc(o.x.q.q)}</span></button></li>`).join('')}</ul>`:''}`;
  $('#rAgain').onclick=()=>startExam(S.ex);
  if($('#rWrong'))$('#rWrong').onclick=()=>startExam({...S.ex,id:'retry',k:'Làm lại',name:'Các câu vừa sai',mode:'practice',time:0},bad.map(o=>o.x.q));
  $('#rReview').onclick=()=>{S.i=0;show('quiz');renderQ()};
  $('#rBack').onclick=()=>show('exams');
  $('#view-result').querySelector('.qlist')?.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;S.i=+b.dataset.j;show('quiz');renderQ()});
  show('result');
}

/* ---------- mini cas ---------- */
let caseBuilt=false;
function renderCase(){
  if(caseBuilt||!window.MINICAS)return;caseBuilt=true;
  $('#caseQs').innerHTML=MINICAS.questions.map((c,i)=>`<details${i===0?' open':''}><summary>${esc(c.q)}<span class="vi">${esc(c.vi)}</span></summary><ol>${c.plan.map((p,j)=>`<li>${esc(p)}${c.planvi?`<br><span style="color:var(--muted);font-size:13px">${esc(c.planvi[j])}</span>`:''}</li>`).join('')}</ol><p class="model"><span class="eyebrow">Ví dụ mẫu · NIVEA Creme</span><br>${esc(c.ex)}${c.exvi?`<br><br><span class="eyebrow">Dịch</span><br>${esc(c.exvi)}`:''}</p></details>`).join('');
  const draft=store.get('bc2-case',{});
  $('#caseForm').innerHTML=MINICAS.fields.map(([k,l,ph])=>`<label for="case-${k}">${esc(l)}<textarea id="case-${k}" data-k="${k}" rows="2" placeholder="${esc(ph||'')}">${esc(draft[k]||'')}</textarea></label>`).join('')+'<span class="saved" id="caseSaved">Tự lưu khi bạn gõ.</span>';
  let tm=null;
  $('#caseForm').addEventListener('input',e=>{
    const t=e.target.closest('textarea');if(!t)return;
    draft[t.dataset.k]=t.value;clearTimeout(tm);
    tm=setTimeout(()=>{store.set('bc2-case',draft);$('#caseSaved').textContent='Đã lưu trên trình duyệt này.'},400);
  });
  $('#caseForm').addEventListener('submit',e=>e.preventDefault());
}

/* ---------- wrong list ---------- */
let clearArmed=false;
function renderWrong(){
  const list=ALL.filter(q=>wrong.has(q.id));
  const el=$('#view-wrong');
  if(!list.length){el.innerHTML=`<div class="eyebrow">Sổ tay câu sai</div><h1>Chưa có câu sai nào</h1><div class="empty">Mỗi câu bạn trả lời sai trong bất kỳ đề nào sẽ được lưu ở đây (trên trình duyệt này). Khi làm lại đúng, câu đó tự biến mất khỏi danh sách. <a href="#" id="toEx">Bắt đầu một đề</a>.</div>`;$('#toEx').onclick=e=>{e.preventDefault();show('exams')};return}
  el.innerHTML=`<div class="eyebrow">Sổ tay câu sai</div><h1>${list.length} câu cần ôn lại</h1><p class="lede">Mở từng câu để xem đáp án và giải thích, hoặc làm thành một đề riêng. Trả lời đúng thì câu sẽ được gỡ khỏi danh sách.</p>
  <div class="actions" style="justify-content:flex-start;margin-bottom:18px"><button class="btn pri" id="wDo">Làm đề ${list.length} câu sai</button><button class="btn ghost" id="wClear">Xoá danh sách</button></div>
  <div style="display:grid;gap:8px">${list.map(q=>{const ans=q.a.map(i=>esc(q.o[i])+(q.ov?` <span style="font-weight:400;color:var(--muted)">(${esc(q.ov[i])})</span>`:'')).join(' · ');return `<details class="wq"><summary><span class="chip">${esc(TOPICS[q.topic])}</span>${esc(q.q)}</summary><div class="body"><p><span class="eyebrow">Đáp án</span> <b>${ans}</b></p><p><span class="eyebrow">Dịch</span> ${esc(q.vi)}</p><p><span class="eyebrow">Giải thích</span> ${q.e}</p></div></details>`}).join('')}</div>`;
  $('#wDo').onclick=()=>startExam(EX_WRONG);
  $('#wClear').onclick=function(){
    if(!clearArmed){clearArmed=true;this.textContent='Bấm lần nữa để xoá hết';setTimeout(()=>{clearArmed=false;if(this.isConnected)this.textContent='Xoá danh sách'},4000);return}
    clearArmed=false;wrong.clear();saveWrong();renderWrong();
  };
}

renderLearn();saveWrong();
const start=store.get('bc2-tab','exams');
show(VIEWS.includes(start)&&start!=='quiz'&&start!=='result'?start:'exams');
})();
