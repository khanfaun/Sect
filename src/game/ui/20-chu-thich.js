// ---------- chú thích ----------
let tipT=null,tipEl=null;
// đặt chú thích cạnh con trỏ; chạm mép phải/dưới thì lật sang phía bên kia
// cảm ứng: đặt ngay phía trên đầu ngón tay (không che chỗ chạm), không đủ chỗ thì ngay phía dưới; căn giữa theo ngón tay
function placeTipTouch(x,y){const tip=$('#tip');const tw=tip.offsetWidth,th=tip.offsetHeight,W=window.innerWidth,H=window.innerHeight;
  let L=Math.max(8,Math.min(W-tw-8,x-tw/2)),T=y-th-22;if(T<8)T=Math.min(H-th-8,y+28);tip.style.left=L+'px';tip.style.top=T+'px';}
function placeTip(x,y){const tip=$('#tip');const tw=tip.offsetWidth,th=tip.offsetHeight,W=window.innerWidth,H=window.innerHeight;
  let L=x+14,T=y+16;if(L+tw>W-6)L=x-tw-12;if(L<6)L=Math.max(6,Math.min(W-tw-6,x-tw/2));if(T+th>H-6)T=y-th-12;if(T<6)T=Math.max(6,Math.min(H-th-6,y+16));
  tip.style.left=L+'px';tip.style.top=T+'px';}
function showTip(el,toggle,xy,touch){
  const tip=$('#tip');const txt=el.dataset.tip;if(!txt)return;
  if(toggle&&tipEl===el&&!tip.hidden){hideTip();return;}
  tipEl=el;if(el.dataset.tiph){tip.innerHTML=el.dataset.tiph;tip.className='rich';}else{tip.textContent=txt;tip.className='';}tip.style.left='0px';tip.style.top='0px';tip.hidden=false;
  if(xy&&touch){placeTipTouch(xy[0],xy[1]);return;}
  if(xy){placeTip(xy[0],xy[1]);return;}
  // chạm (không có con trỏ): đặt trên phần tử, không đủ chỗ thì xuống dưới
  const r=el.getBoundingClientRect(),tw=tip.offsetWidth,th=tip.offsetHeight;
  let x=r.left+Math.min(r.width/2,60)-tw/2;x=Math.max(6,Math.min(window.innerWidth-tw-6,x));
  let y=r.top-th-8;if(y<6)y=Math.min(window.innerHeight-th-6,r.bottom+8);
  tip.style.left=x+'px';tip.style.top=y+'px';
}
function hideTip(){const t=$('#tip');if(t){t.hidden=true;}tipEl=null;}
document.addEventListener('pointerover',e=>{if(e.pointerType!=='mouse')return;const t=e.target.closest('[data-tip]');if(t){if(t!==tipEl)showTip(t,false,[e.clientX,e.clientY]);}else if(tipEl)hideTip();});
document.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||!tipEl)return;const tip=$('#tip');if(!tip.hidden&&tipEl.contains(e.target))placeTip(e.clientX,e.clientY);});
// cảm ứng: chạm nhanh vào chữ có chú thích (không phải nút) là hiện ngay, không chờ sự kiện click (iPhone hay nuốt mất);
// nút có chú thích thì giữ 0,35 giây; ngón tay xê dịch dưới 12px không hủy; chạm chỗ khác thì ẩn
let tipTouch=null,tipTapAt=0;
document.addEventListener('pointerdown',e=>{if(e.pointerType==='mouse')return;clearTimeout(tipT);const t=e.target.closest('[data-tip]');
  if(!e.target.closest('#tip')&&!t)hideTip();tipTouch={x:e.clientX,y:e.clientY,t:performance.now(),el:t};if(!t)return;
  const ax=e.clientX,ay=e.clientY;if(tipActOf(t))tipT=setTimeout(()=>{UI.suppress=true;showTip(t,false,[ax,ay],1);tipTouch=null;},350);},true);
document.addEventListener('pointermove',e=>{if(e.pointerType==='mouse'||!tipTouch)return;if(Math.hypot(e.clientX-tipTouch.x,e.clientY-tipTouch.y)>12){clearTimeout(tipT);tipTouch=null;}},true);
document.addEventListener('pointercancel',()=>{clearTimeout(tipT);tipTouch=null;},true);
document.addEventListener('pointerup',e=>{if(e.pointerType==='mouse')return;clearTimeout(tipT);const T=tipTouch;tipTouch=null;if(!T||!T.el)return;
  if(tipActOf(T.el))return;if(performance.now()-T.t>800)return;tipTapAt=performance.now();showTip(T.el,true,[e.clientX,e.clientY],1);},true);
// phần tử có hành động thật (không bị tắt) thì chạm là bấm, giữ mới xem chú thích; ô khóa, nút tắt: chạm là xem
function tipActOf(t){const a=t.closest('[data-act]');return a&&!a.disabled&&!a.classList.contains('lock')?a:null;}
document.addEventListener('scroll',()=>{if(tipEl)hideTip();},{passive:true,capture:true});
document.addEventListener('keydown',e=>{if(e.key==='Escape'){if(UI.modal&&UI.modal.k==='cbResume')return;if(UI.modal)UI.modal=null;else if(UI.panel)UI.panel=null;else return;render();}});

// ---------- lưu ----------
const KEY='phusinh2_save_v1';
function snapshot(){return {v:SAVE_V,ts:Date.now(),meta:G.meta,run:G.run,over:G.over,birth:G.birth,screen:G.screen};}
function encodeSave(){return 'PS1.'+btoa(unescape(encodeURIComponent(JSON.stringify(snapshot()))));}
function decodeSave(s){s=s.trim();if(s.startsWith('PS1.'))s=s.slice(4);return JSON.parse(decodeURIComponent(escape(atob(s))));}
// điền giá trị mặc định cho trường mới; bản lưu của các lần chỉnh sửa trước vẫn tải được
function migrate(d){
  if(!d||!d.meta||!d.meta.world||!d.meta.world.regions)throw new Error('bad');
  d.v=d.v||1;
  if(d.v<2&&d.run){const r=d.run;r.dao=r.dao||0;r.daoSk=0;r.daoPill=0;r.quality=r.quality||[0,0,0,0,0];
    if(r.realm>=2&&r.danQ)r.quality[2]=r.danQ;delete r.danQ;
    if(r.scene&&(r.scene.type==='combat'||r.scene.type==='rest'))r.scene=null;}
  if(d.meta&&!d.meta.opt)d.meta.opt={};
  if(d.v<3){const w=d.meta.world;w.ents=w.ents||[];w.legacy=w.legacy||[];w.chron=w.chron||[];
    if(!w.rstate)w.rstate=(d.run&&d.run.rivals?d.run.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:18})):w.rivals.map((x,i)=>({i,realm:0,prog:20,alive:true,age:18})));
    if(d.run){d.run.party=d.run.party||[];d.run.quests=d.run.quests||[];}}
  if(typeof migrateX==='function')migrateX(d);
  d.v=SAVE_V;d.meta.v=SAVE_V;
  return d;
}
function loadData(d){d=migrate(d);G={meta:d.meta,run:d.run||null,over:d.over||null,birth:d.birth||null,screen:d.screen||'title'};
  if((G.screen==='map'||G.screen==='run')&&!G.run)G.screen='title';if(G.screen==='run')G.screen='map';if(G.screen==='codex')G.screen='meta';if(G.screen==='over'&&!G.over)G.screen='title';if(G.screen==='birth'&&!G.birth)G.screen='title';
  if(!G.meta.world)G.meta.world=genWorld();
  extendWorld(G.meta.world);snapWorld(G.meta.world);entsRescale(G.meta.world);if(G.run)run2();syncDodge();
  const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat'){if(sc.dodge)dodgeResolve(null);if(sc.qte)qteResolve(null);}}
let DB=null,dbBusy=false,dbPending=false,dbTimer=null;
saveSoon=function(){
  try{localStorage.setItem(KEY,JSON.stringify(snapshot()));}catch(e){}
  if(DB){clearTimeout(dbTimer);dbTimer=setTimeout(dbWrite,1500);}
};
async function dbWrite(){if(!DB)return;if(dbBusy){dbPending=true;return;}dbBusy=true;
  try{await DB.set({ts:Date.now(),data:JSON.stringify(snapshot())});}catch(e){}
  dbBusy=false;if(dbPending){dbPending=false;dbWrite();}}
async function initDB(){
  try{
    if(!window.claude||!window.claude.use)return;
    const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(!db||!user)return;const id=await user.id();if(!id)return;
    const ref=db.collection('data/users/'+id).doc('save');
    let snap=null;try{snap=await ref.get();}catch(e){}
    DB=ref;
    if(snap&&snap.exists){const d=snap.data();let local=0;try{const l=JSON.parse(localStorage.getItem(KEY)||'null');local=l?l.ts:0;}catch(e){}
      if(d&&d.data&&d.ts>local){try{loadData(JSON.parse(d.data));render();}catch(e){}}}
  }catch(e){DB=null;}
}

// ---------- khởi động ----------
(function boot(){
  gfxDetect();cfgLoad();
  let ok=false;
  try{const l=JSON.parse(localStorage.getItem(KEY)||'null');if(l){loadData(l);ok=true;}}catch(e){}
  if(!ok){G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};syncDodge();}
  UI.narrSkip=false;if((G.screen==='map'||G.screen==='life')&&G.run)G.screen='title';if(G.screen==='life')G.screen='title';
  try{Map2.setFont(getComputedStyle(document.body).fontFamily);}catch(e){}
  Map2.attach($('#mapcv'));
  render();
  initDB();
  requestAnimationFrame(loop);
})();

// chuyển cảnh: vết mực loang phủ kín màn hình rồi tan dần để lộ cảnh mới
// vệt mực vẽ bằng đường cong ngẫu nhiên (không dùng bộ lọc để chạy mượt)
function inkBlob(r,cx,cy,rough){const n=18,P=[];const ph=[Math.random()*6,Math.random()*6,Math.random()*6];
  for(let i=0;i<n;i++){const a=i/n*6.283;const k=1+rough*(0.5*Math.sin(3*a+ph[0])+0.3*Math.sin(5*a+ph[1])+0.2*Math.sin(9*a+ph[2]))+(Math.random()-.5)*rough*.5;P.push([cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k]);}
  let d='';for(let i=0;i<n;i++){const p0=P[(i-1+n)%n],p1=P[i],p2=P[(i+1)%n],p3=P[(i+2)%n];
    if(!i)d+=`M${p1[0].toFixed(1)} ${p1[1].toFixed(1)}`;
    d+=`C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;}
  return d+'Z';}
function inkEl(){let d=document.getElementById('ink');if(!d){d=document.createElement('div');d.id='ink';document.body.appendChild(d);}
  d.innerHTML=`<svg viewBox="-100 -100 200 200"><path class="b b1" d="${inkBlob(46,-8,6,.32)}"/><path class="b b2" d="${inkBlob(38,10,-6,.3)}"/><path class="b b3" d="${inkBlob(30,0,2,.28)}"/><path class="b b4" d="${inkBlob(30,3,-2,.22)}"/></svg>`;
  return d;}
function inkCover(done){const d=inkEl();void d.offsetWidth;d.className='on cover';setTimeout(()=>requestAnimationFrame(done),1600);}
function inkReveal(){const d=document.getElementById('ink');requestAnimationFrame(()=>requestAnimationFrame(()=>{d.className='on reveal';}));setTimeout(()=>{if(d.className==='on reveal')d.className='';},1000);}

// bảng thông báo nhiệm vụ: xong, thất bại, thất hứa. Tự tắt sau chừng 2,5 giây; chạm để tắt ngay.
function qpopFlush(){const L=G.qpop;if(!L||!L.length||document.querySelector('.qpop'))return;const q=L.shift();const app=document.getElementById('app');if(!app)return;
  const T={done:['Hoàn thành nhiệm vụ','ok'],fail:['Nhiệm vụ thất bại','bad'],late:['Thất hứa · quá hạn','bad']}[q.kind];if(q.title)T[0]=q.title;
  const d=document.createElement('div');d.className='qpop '+T[1];d.style.cssText=qpc(q.grade);
  d.innerHTML=`<b>${T[0]}</b><p>${esc(q.text)}</p>${q.ch&&q.ch.length?chipsHTML(q.ch):''}`;d.addEventListener('pointerdown',()=>{d.remove();qpopFlush();});
  app.appendChild(d);setTimeout(()=>{d.classList.add('out');setTimeout(()=>{d.remove();qpopFlush();},400);},2500);}
// mỗi kiếp mới: tắt tự đánh, tốc độ trận và tốc độ bản đồ về ×1 (mở lại game cũng vậy, xem cfgLoad)
function speedReset(){CFG.autoFight=false;CFG.autoBlk=false;CFG.autoDg=false;UI.autoOpen=false;CFG.cspeed=1;cfgSave();UI.speed=1;UI.paused=false;if(G.meta)syncDodge();}
{const _nrU=newRun;newRun=function(c){const res=_nrU(c);speedReset();if(G.run&&G.run.story){G.screen='life';UI.lifeT=performance.now();UI.lifeAll=false;lifeScroll();}return res;};}
// trang mở đầu kiếp: dòng chữ hiện dần, cuộn theo dòng mới nhất
const LIFE_D=1.7;
function lifeScroll(){clearInterval(UI.lifeIv);UI.lifeIv=setInterval(()=>{if(G.screen!=='life'){clearInterval(UI.lifeIv);return;}const P=document.querySelectorAll('.lsx-t p');const k=UI.lifeAll?P.length:Math.floor((performance.now()-UI.lifeT)/1000/LIFE_D);
  const el=UI.lifeAll||k>=P.length?document.querySelector('.lsx-go'):P[k];if(el)el.scrollIntoView({block:'nearest',behavior:'smooth'});if(UI.lifeAll||k>P.length)clearInterval(UI.lifeIv);},500);}
Object.assign(ACT,{lifeGo:()=>{G.screen='map';clearInterval(UI.lifeIv);saveSoon();if(typeof Map2!=='undefined')Map2.center();},
  lifeAll:()=>{if(UI.lifeAll)return;UI.lifeAll=true;const b=document.querySelector('.lsx');if(b)b.classList.add('all');setTimeout(()=>{const g=document.querySelector('.lsx-go');if(g)g.scrollIntoView({block:'nearest',behavior:'smooth'});},50);}});
// công pháp/tâm pháp vượt cảnh giới: chưa đủ điều kiện thì không cho vận hành
{const _ar=ACT.artRun;ACT.artRun=u=>{const a=artBy(+u);const w=typeof artUseWhy==='function'&&artUseWhy(a);if(w){note(w,'dn');return;}_ar(u);};}

ACT.bbLearn=i=>{const e=bbForceLearn(+i);if(e){UI.modal={k:'bbLearn',err:e};return;}UI.modal=bbBooks().length?{k:'bbLearn'}:null;note('Thức hải rạn nứt, thần thức suy giảm. Nhưng tâm pháp mới đã khắc vào lòng.','dn');};

ACT.bbAsk2=i=>{UI.modal={k:'bbLearn2',i:+i};};
ACT.bbBack=()=>{UI.modal=bbBooks().length?{k:'bbLearn'}:null;};
ACT.bbLearn2=a=>{const [i,g]=String(a).split(',').map(Number);const e=bbForceLearn2(i,g);if(e==='dead'){UI.modal=null;return;}if(e){UI.modal={k:'bbLearn',err:e};return;}UI.modal=bbBooks().length?{k:'bbLearn'}:null;note('Vật bảo mệnh vỡ tan, hộ trì thức hải. Thêm một môn đã khắc vào lòng.','dn');};
// ================= Lột xác: hiệu ứng sau xung kích / đột phá =================
function chevIc(n){return `<span class="chev c${n}">${'<svg viewBox="0 0 20 13"><path d="M1 7L10 1L19 7V12L10 6L1 12Z"/></svg>'.repeat(n)}</span>`;}
function ascPlaceImg(a){const P=ASSET.place||{};return P[a.place]||P.dongphu||P.dong||P.nui||Object.values(P)[0]||'';}
function ascStory(a){const r=G.run;const x=a.ht&&HTMAP[a.ht];const L=[];
  L.push(a.k==='bt'?`${a.kiep==='loi'?'Lôi vân tan dần.':a.kiep==='tamma'?'Bóng tâm ma tan vào hư không.':'Linh khí quanh thân lắng xuống.'} ${r.ten} mở mắt, thấy trời đất như vừa được gột rửa: núi xanh hơn, gió trong hơn, từng sợi linh khí hiện rõ như tơ.`:`Một tiếng “rắc” khẽ vang trong kinh mạch. Linh lực dồn nén bao lâu nay ào qua quan ải.`);
  if(x)L.push(x.st.replace(/\{ten\}/g,r.ten));return L;}
function ascDiffHTML(a){return `<div class="asc-diff">${a.diff.length?a.diff.map(d=>`<div class="ad"><span>${esc(d.n)}</span>${chevIc(d.lv)}</div>`).join(''):'<p class="hint">Căn cơ vững lại, chưa thấy đổi khác rõ rệt.</p>'}</div>`;}
function ascHTML(){const r=G.run,a=r.asc;if(!a._id)a._id=Date.now();
  if(UI.ascId!==a._id){UI.ascId=a._id;UI.ascPh='flash';UI.ascSel=null;clearTimeout(UI.ascT);
    const ms=CFG.anim===false?200:a.k==='bt'?3000:1600;document.documentElement.dataset.ascShake=a.k;setTimeout(()=>{delete document.documentElement.dataset.ascShake;},ms);
    UI.ascT=setTimeout(()=>{UI.ascPh=a.k==='bt'&&r.htPick?'pick':'res';render();},ms);}
  const ph=UI.ascPh;let h=`<div class="asc asc-${a.k} ph-${ph}"><div class="asc-bg"></div>`;
  if(ph==='flash')return h+`<div class="asc-glow"></div>${a.k==='bt'?'<div class="asc-rays"></div>':''}</div>`;
  if(ph==='pick'){const sel=UI.ascSel;h+=`<div class="asc-in"><small>Thiên địa cảm ứng</small><h2>Hậu thiên khí vận</h2><p>${(G.run.asc&&G.run.asc.kiep)?'Kiếp nạn đã qua, cơ':'Quan ải đã phá, cơ'} duyên hiện trước mắt. Ba luồng khí vận lơ lửng giữa không trung, chỉ có thể nắm lấy một.</p>
    <div class="htp">${r.htPick.map((id,i)=>{const x=HTMAP[id];return `<button class="hto r${x.r}${sel===i?' sel':''}" data-act="ascSel" data-arg="${i}"><small>${HT_RANK[x.r]}</small><b>${esc(x.n)}</b><p>${htFxText(x).map(esc).join('<br>')}</p></button>`;}).join('')}</div></div>`;
    if(sel!=null){const x=HTMAP[r.htPick[sel]];h+=`<div class="asc-cf"><div class="mbox"><h3>Nắm lấy ${esc(x.n)}?</h3><p>${htFxText(x).map(esc).join('<br>')}</p><p class="hint">Chọn rồi không đổi được.</p><div class="mb-f"><button class="btn" data-act="ascSel" data-arg="-1">Nghĩ lại</button><span class="grow"></span><button class="btn pri" data-act="ascPick">Xác nhận</button></div></div></div>`;}
    return h+'</div>';}
  const img=a.k==='bt'?ascPlaceImg(a):'';
  h+=`<div class="asc-in res">${img?`<div class="asc-img"><img src="${esc(img)}" alt=""></div>`:''}<small>${a.k==='bt'?'Đột phá thành công':'Xung kích thành công'}</small><h2 class="asc-to"><span>${esc(a.to)}</span></h2>
    <div class="asc-st">${ascStory(a).map(t=>`<p>${esc(t)}</p>`).join('')}</div>${a.ht&&HTMAP[a.ht]?`<p class="asc-ht">Hậu thiên khí vận <span class="ht-tag r${HTMAP[a.ht].r}"${tah(htTipH(HTMAP[a.ht]))}>${esc(HTMAP[a.ht].n)}</span></p>`:''}
    ${ascDiffHTML(a)}<button class="btn pri big" data-act="ascDone">Tiếp tục</button></div>`;
  return h+'</div>';}
{const _mh=modalHTML;modalHTML=function(){const r=G.run;if(r&&r.asc&&G.screen==='map'&&!(r.scene&&r.scene.type==='combat')){if(!UI.modal||UI.modal.k!=='asc')UI.modal={k:'asc'};document.documentElement.dataset.asc='1';return ascHTML();}
  delete document.documentElement.dataset.asc;if(UI.modal&&UI.modal.k==='asc')UI.modal=null;return _mh();};}
ACT.ascSel=i=>{UI.ascSel=+i<0?null:+i;};
ACT.ascPick=()=>{const r=G.run;if(UI.ascSel==null||!r.htPick)return;const id=htChoose(UI.ascSel);if(r.asc)r.asc.ht=id;UI.ascSel=null;UI.ascPh='res';};
ACT.ascDone=()=>{const r=G.run;const a=r.asc;if(!a)return;r.asc=null;UI.modal=null;delete document.documentElement.dataset.asc;const now=performance.now();
  UI.realmAnim={from:a.from,to:a.to,t0:now};UI.lvGlow={t0:now,t1:now+3600,c:'up'};setTimeout(()=>hnote((a.k==='bt'?'Đột phá thành công · ':'Xung kích thành công · ')+a.to,'up'),500);setTimeout(()=>{UI.realmAnim=null;render();},3400);
  const sc=r.scene;if(sc&&sc.type==='btres')endScene();if(G.run&&G.run.scene&&G.run.scene.type==='place')G.run.scene=null;UI.panel=null;saveSoon();};
// thanh đầu: dòng cảnh giới chuyển từ cũ sang mới
{const _hh=hudHTML;hudHTML=function(){let h=_hh();const A=UI.realmAnim;if(A&&G.run){const cur=esc(realmLabel());h=h.replace('>'+cur+'</span>','><span class="rl-anim'+(A.down?' dn':'')+'"><i class="o">'+esc(A.from)+'</i><i class="n">'+esc(A.to)+'</i></span></span>');}
  if(UI.talA)h=h.replace('class="hud-av hud-av2','class="hud-av hud-av2 talchg');else if(UI.talNew)h=h.replace('class="hud-av hud-av2','class="hud-av hud-av2 talnew');return h;};}
// thiên phú đổi bậc: frame cũ lóe sáng rồi mới đổi sang frame mới
{const _ptR=playerTal;playerTal=function(){let t=_ptR();if(!t||typeof UI==='undefined')return t;if(UI.talFake){if(performance.now()<UI.talFake.until)t=Object.assign({},t,{tier:UI.talFake.tier});else{UI.talFake=null;UI.talS=t.tier;}}if(UI.talS==null)UI.talS=t.tier;
  if(t.tier!==UI.talS&&!UI.talA&&!(G.run&&G.run.asc)&&!UI.realmAnim){UI.talA={from:UI.talS,to:t.tier};{const up=t.tier>UI.talS;const nw=performance.now();if(up){document.documentElement.dataset.ascShake='xk';setTimeout(()=>{delete document.documentElement.dataset.ascShake;},950);}UI.lvGlow={t0:nw,t1:nw+3000,c:up?'up':'down'};setTimeout(()=>hnote(up?'Tiềm chất thăng lên · '+TAL_N[t.tier]:'Tiềm chất suy giảm · '+TAL_N[t.tier],up?'up':'down'),50);}setTimeout(()=>{if(UI.talA)UI.talS=UI.talA.to;UI.talA=null;UI.talNew=performance.now();render();setTimeout(()=>{UI.talNew=0;render();},1300);},1700);}
  return t.tier===UI.talS?t:Object.assign({},t,{tier:UI.talS});};}
{const _tc2=talCardHTML;talCardHTML=function(){const h=_tc2();return UI.talA?h.replace('class="tal-wrap','class="talchg tal-wrap'):UI.talNew?h.replace('class="tal-wrap','class="talnew tal-wrap'):h;};}
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&G.run&&G.run.asc){e.stopImmediatePropagation();}},true);

// xem thử hiệu ứng (không đổi gì ở nhân vật)
ACT.fxDemo=k=>{const r=G.run;if(!r)return;UI.panel=null;UI.modal=null;
  if(k==='lowhp'){UI.devLow=performance.now()+8000;return;}if(k==='heal'){edgeHeal();return;}
  if(k==='talup'){const t=playerTal();UI.talFake={tier:4,until:performance.now()+5000};if(t&&t.tier===4)UI.talS=3;UI.talA=null;return;}
  if(k==='talup'||k==='taldn'){const t=playerTal();if(t){UI.talS=k==='talup'?t.tier-1:t.tier+1;UI.talA=null;}return;}
  if(k==='rldn'){const r=G.run;const t=tieu();const hi=isPham()?'Luyện Khí tầng 1':lkOn()?'Luyện Khí tầng '+Math.min(13,lkTang()+1):t<3?REALM[r.realm]+' '+TIEU[t+1]:REALM[Math.min(5,r.realm+1)]+' sơ kỳ';rlDrop(hi,realmLabel());return;}
  const lb=realmLabel();const D=ASC_K.map(([kk,n],i)=>({k:kk,n,lv:1+(i*7)%3}));
  if(k==='bt'){r.asc={k:'bt',demo:1,from:lb,to:lb,diff:D,place:'dong'};r.htPick=htOffer(3,r.realm+1);r._htDemo=1;}else r.asc={k:'xk',demo:1,from:lb,to:lb,diff:D.map(d=>Object.assign({},d,{lv:1}))};};
{const _ap=ACT.ascPick;ACT.ascPick=()=>{const r=G.run;if(r&&r._htDemo&&r.asc&&r.asc.demo){if(UI.ascSel==null||!r.htPick)return;r.asc.ht=r.htPick[UI.ascSel];r.htPick=null;r._htDemo=0;UI.ascSel=null;UI.ascPh='res';return;}_ap();};}
