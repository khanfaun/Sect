// ----- thông báo nhỏ dưới thanh đầu, tự tắt sau chừng 1 giây -----
function hnote(t,c){let box=document.getElementById('hnote');if(!box){box=document.createElement('div');box.id='hnote';document.body.appendChild(box);}
  const hd=document.getElementById('hud');const top=(hd&&!hd.hidden&&hd.offsetHeight?hd.getBoundingClientRect().bottom:0)+8;box.style.top=top+'px';
  const d=document.createElement('div');d.className='hn '+(c||'');d.textContent=t;box.appendChild(d);while(box.children.length>4)box.firstChild.remove();setTimeout(()=>d.classList.add('out'),1100);setTimeout(()=>d.remove(),1500);}
// ----- nhận hoặc mất vật phẩm: so túi đồ giữa hai lần vẽ -----
function invSig(){const r=G.run;const M={};const add=(n,c)=>{if(n)M[n]=(M[n]||0)+(c||1);};
  for(const x of r.relics||[])add(x.k==='book'&&x.art?x.art.n:x.name);for(const x of Object.values(r.eq||{}))if(x)add(x.k==='book'&&x.art?x.art.n:x.name);for(const d of r.dd||[])if(d&&d.rel)add(d.rel.name);
  for(const p of r.pills||[])add((p.q?PQ[p.q]+' ':'')+PILL[p.id].n);for(const k in (r.mats||{}))if(r.mats[k]>0&&MAT[k])add(MAT[k].n,r.mats[k]);return M;}
{const _rd=render;render=function(){_rd();try{const r=G.run;if(!r||G.screen!=='map'){UI.invPrev=null;return;}const now=invSig();const P=UI.invPrev;UI.invPrev=now;if(!P||UI.invRun!==r){UI.invRun=r;return;}
  const sc=r.scene;if(sc&&sc.type==='combat')return;let n=0;
  for(const k in now){const d=now[k]-(P[k]||0);if(d>0&&n<3){hnote('Nhận được '+k+(d>1?' ×'+d:''),'up');n++;}}
  for(const k in P){const d=P[k]-(now[k]||0);if(d>0&&n<3){hnote('Mất '+k+(d>1?' ×'+d:''),'down');n++;}}}catch(e){}};}
// ----- rìa màn hình tỏa sáng theo hiệu ứng nhân vật -----
setInterval(()=>{const g=UI.lvGlow;const on=g&&performance.now()<g.t1&&G.screen==='map'&&G.run&&!G.run.asc;const v=on?g.c||'up':'';if(document.documentElement.dataset.edge!==v){if(v)document.documentElement.dataset.edge=v;else delete document.documentElement.dataset.edge;}},150);

// ----- rớt cảnh giới: hiệu ứng u ám -----
function rlDrop(from,to){const now=performance.now();UI.realmAnim={from,to,t0:now,down:1};UI.lvGlow={t0:now,t1:now+3200,c:'down'};setTimeout(()=>{UI.realmAnim=null;render();},3400);setTimeout(()=>hnote('Cảnh giới tụt xuống · '+to,'down'),300);render();}
function rlRank(){const r=G.run;if(!r)return 0;return (isPham()?-1:r.realm)*100+(lkOn()?lkTang():tieu()*10);}
{const _rd2=render;render=function(){_rd2();try{const r=G.run;if(!r||G.screen!=='map'){UI.rlPrev=null;return;}const k=rlRank(),lb=realmLabel();const P=UI.rlPrev;UI.rlPrev={r,k,lb};
  if(P&&P.r===r&&k<P.k&&!r.asc)rlDrop(P.lb,lb);}catch(e){}};}

const DEV=true; // bản chính thức: đặt false để ẩn Dev test
ACT.devOpen=()=>{UI.panel=null;UI.modal={k:'dev'};};
// ----- máu thấp: rìa màn hình nhấp nháy u ám chậm rãi; thoát mức đỏ hoặc hết trọng thương: thở phào màu xanh -----
function hpRatio(){const r=G.run;if(!r)return 1;const sc=r.scene;if(sc&&sc.type==='combat'&&sc.units){const me=sc.units.find(u=>u.isMain);if(me)return me.hp/Math.max(1,me.max);}return r.hp/Math.max(1,S().maxHp);}
function edgeHeal(){UI.healT=performance.now()+2600;}
setInterval(()=>{if(!G.run||G.screen!=='map'){UI.lowPrev=null;UI.injPrev=null;return;}const now=performance.now();
  const low=hpRatio()<=0.2||(UI.devLow&&now<UI.devLow);const inj=injured();
  if(UI.lowPrev&&!low)edgeHeal();if(UI.injPrev&&!inj)edgeHeal();UI.lowPrev=low;UI.injPrev=inj;
  const el=document.getElementById('lowfx')||(()=>{const d=document.createElement('div');d.id='lowfx';document.body.appendChild(d);return d;})();
  const st=G.run.asc?'':UI.healT&&now<UI.healT?'heal':low?'low':'';if(el.dataset.s!==st){el.dataset.s=st;el.className=st;}},250);
// số khung hình: chỉ hiện ở bản đồ chính, đo số khung bản đồ thật sự được vẽ (không phải nhịp màn hình)
setInterval(()=>{const el=document.getElementById('fpsb')||(()=>{const d=document.createElement('div');d.id='fpsb';document.body.appendChild(d);return d;})();
  const on=CFG.showFps&&G.run&&!G.run.scene&&!UI.modal&&!UI.panel&&!document.hidden;el.hidden=!on;if(!on)return;
  el.textContent=Map2.fps+'FPS';
  const hd=document.getElementById('hud');el.style.top=((hd&&hd.offsetHeight?hd.getBoundingClientRect().bottom:0)+6)+'px';},500);

ACT.favGift=n=>{UI.bondOpen=n;const w=favGift(n);if(w)note(w,'dn');else note('Đã tặng lễ cho '+(n.replace(/^@\d+:/,'')),'up');};
ACT.relMake=a=>{const i=a.lastIndexOf('|');const n=a.slice(0,i),k=a.slice(i+1);UI.bondOpen=n;const w=relMake(n,k,npcInfo(n));if(w)note(w,'dn');else hnote('Kết '+REL_T[k].n.toLowerCase()+' · '+n.replace(/^@\d+:/,''),'up');};
ACT.relBreak=n=>{UI.bondOpen=n;relBreak(n);};

// ================= HỆ THỐNG CẢNH GIỚI (tab trong bảng bế quan) =================
// Thông tin chỉ mở khi người chơi đã nghe ngóng được (trà lâu, tửu phường, Tàng Kinh Các) hoặc đã tự trải qua.
const CG_R=[
 {i:-1,n:'Phàm nhân',d:'Thân xác phàm tục, chưa dẫn được linh khí vào người. Sống chết theo lẽ thường.',brk:'Tìm được tâm pháp dẫn khí, ngồi yên dẫn sợi linh khí đầu tiên vào thân.'},
 {i:0,n:'Luyện Khí',d:'Dẫn linh khí vào kinh mạch, rèn thân thành bình chứa. Mười ba tầng, phần lớn người tu cả đời không qua tầng chín.',brk:'Tu vi đầy từ tầng chín trở lên, lịch luyện theo kịp, ngồi ở nơi có động phủ.'},
 {i:1,n:'Trúc Cơ',d:'Đắp nền cho đại đạo. Nền vững thì đường sau rộng, nền lệch thì cả đời vá víu.',brk:'Tới đỉnh phong, lịch luyện đủ, ở động phủ, vượt qua tâm ma kiếp.'},
 {i:2,n:'Kết Đan',d:'Ngưng chân nguyên thành kim đan trong đan điền. Từ đây mới thật sự bước vào hàng tu sĩ.',brk:'Tới đỉnh phong, lịch luyện đủ, vượt sáu đạo lôi kiếp rồi tâm ma kiếp.'},
 {i:3,n:'Nguyên Anh',d:'Phá đan thành anh, nguyên thần có hình có dạng. Thân xác hỏng còn có thể tái tạo.',brk:'Tới đỉnh phong, lịch luyện đủ, vượt chín đạo lôi kiếp.'},
 {i:4,n:'Hóa Thần',d:'Nguyên anh hóa thần, cảm ứng thiên địa. Đã đứng ở đỉnh nhân gian.',brk:'Viên mãn Hóa Thần, tìm tới nơi trời đất mỏng nhất để độ kiếp phi thăng.'},
 {i:5,n:'Độ Kiếp',d:'Lời đồn kể rằng qua được cửa này là rời khỏi nhân gian. Chưa ai quay về kể lại.',brk:''}];
const LK_LEG={10:'Tầng mười: các bậc tiền bối kể rằng chuyện đã xảy ra từ rất lâu về trước, từng có người tu tới tầng này.',11:'Tầng mười một: chỉ còn trong truyền thuyết. Nghe nói thuở xa xưa có người đạt được, nhưng không ai còn nhớ là ai.',12:'Tầng mười hai: chưa từng nghe ai nói có người đạt tới. Chỉ là một cái tên ghi trong sách cổ.'};
function cgK(){const m=G.meta;return m.cgK||(m.cgK=[]);}
function cgKnow(k){return cgK().includes(k);}
function cgReached(i){const r=G.run;const cur=isPham()?-1:r.realm;return i<=cur;}
// mục nào được biết: đã trải qua thì tự biết; còn lại phải nghe ngóng
function cgOk(k,i){if(i!=null&&cgReached(i))return true;return cgKnow(k);}
const CG_KEYS=()=>{const L=[];for(const R of CG_R){if(R.i>=0)L.push('R'+R.i+'b');if(R.i>=1&&R.i<=4)L.push('Q'+R.i);}L.push('lk10','lk11','lk12');return L;};
function cgLearn(why){const r=G.run;if(!r)return false;const cur=isPham()?-1:r.realm;const L=CG_KEYS().filter(k=>!cgKnow(k)&&!(/^R(-?\d)b$/.test(k)&&cgReached(+k.slice(1,-1)))&&!(/^Q(\d)$/.test(k)&&cgReached(+k.slice(1))));
  if(!L.length)return false;const near=L.filter(k=>{const m=/(-?\d+)/.exec(k);return k.startsWith('lk')||!m||+m[1]<=cur+2;});const k=pick(near.length?near:L);cgK().push(k);
  const T=k.startsWith('lk')?'truyền thuyết Luyện Khí '+k.slice(2).replace('10','tầng mười').replace('11','tầng mười một').replace('12','tầng mười hai'):k[0]==='R'?'cách đột phá '+(CG_R.find(x=>x.i===+k.slice(1,-1))||{}).n:'các phẩm '+REALM[+k.slice(1)];
  if(typeof note==='function')note('Nghe ngóng được: '+T+'. Xem trong mục Cảnh giới.','up');return true;}
{const _th=teaHouse;teaHouse=function(n){const res=_th.apply(this,arguments);if(chance(0.3))cgLearn('tea');return res;};}
{const _pa=placeAct;placeAct=function(a){const res=_pa.apply(this,arguments);if(a==='lib'&&chance(0.6))cgLearn('lib');return res;};}
const Q_DESC={1:[['Nhân đạo','Đột phá ở tầng chín.'],['Hoàn mỹ','Đột phá từ tầng mười, đạo cơ từ ba.'],['Địa đạo','Từ tầng mười, đạo cơ từ sáu, không dùng Trúc Cơ Đan, tâm pháp Địa phẩm đã học trọn.'],['Thiên đạo','Tầng mười ba, đạo cơ từ mười, tâm pháp Thiên phẩm học trọn, luyện thể tầng mười. Sẽ gặp ba đạo lôi kiếp.']]};
function qDescs(i){return Q_DESC[i]||[['Nhân đạo','Đạo cơ từ ba lúc đột phá.'],['Địa đạo','Đạo cơ từ sáu lúc đột phá.'],['Thiên đạo','Đạo cơ từ mười lúc đột phá.']];}
function cgListHTML(){const r=G.run;const cur=isPham()?-1:r.realm;
  return `<div class="cg-list">${CG_R.slice().reverse().map(R=>{const st=R.i<cur?'done':R.i===cur?'cur':'fut';const q=R.i>=1&&R.i<=cur?(r.quality||[])[R.i]:null;
    return `<button class="cg-it ${st}" data-act="cgSel" data-arg="${R.i}"><b>${R.n}</b>${st==='done'?`<span class="cg-st">Đã đột phá${q?' · '+QNAME[q]:''}</span>`:st==='cur'?'<span class="cg-st now">Hiện tại</span>':''}</button>`;}).join('')}</div>`;}
function cgDetailHTML(i){const r=G.run;const R=CG_R.find(x=>x.i===i);if(!R)return '';const cur=isPham()?-1:r.realm;const here=i===cur;
  let h=`<div class="cg-det"><button class="btn sm" data-act="cgSel" data-arg="">‹ Các cảnh giới</button><h3>${R.n}${here?' <small class="cg-st now">Hiện tại</small>':''}</h3><p class="cg-d">${esc(R.d)}</p>`;
  if(i>=0)h+=`<div class="kv"><div><span>Thọ nguyên</span><b>${i<=cur+1?'chừng '+LIFE[i]+' năm':'?'}</b></div></div>`;
  // tiểu cảnh giới
  if(i===0){const past=i<cur,lt=here?lkTang():past?99:0;let rows='';for(let g=1;g<=9;g++)rows+=`<div class="cg-t${here&&lt===g?' on':''}${lt>g?' ok':''}">Tầng ${g}<small>${g<=3?'sơ kỳ':g<=6?'trung kỳ':'hậu kỳ'}</small></div>`;
    for(const g of [10,11,12])rows+=`<div class="cg-t leg${here&&lkTang()===g?' on':''}${here&&lkTang()>g?' ok':''}">${cgOk('lk'+g)||(here&&lkTang()>=g)?esc(LK_LEG[g]):'<span class="fog">? ? ? ? ? ?</span>'}</div>`;
    rows+=`<div class="cg-t fog13">${here&&lkTang()>=13?'Bán bộ Trúc Cơ':'<span class="fog">? ? ? ? ? ? ? ? ? ?</span>'}</div>`;h+=`<h4 class="sgrp">Các tầng</h4><div class="cg-ts">${rows}</div>`;}
  else if(i>0&&i<5){const t=here?tieu():i<cur?4:-1;h+=`<h4 class="sgrp">Tiểu cảnh giới</h4><div class="cg-ts">${['Sơ kỳ','Trung kỳ','Hậu kỳ','Đỉnh phong'].map((n,k)=>`<div class="cg-t${t===k?' on':''}${t>k?' ok':''}">${n}</div>`).join('')}<div class="cg-t${here&&dvm()?' on':''}">Đại viên mãn<small>đỉnh phong, không trọng thương, tâm ma thấp, đạo tâm cao</small></div></div>`;}
  // phẩm
  if(i>=1&&i<=4){const got=i<=cur?(r.quality||[])[i]:null;h+=`<h4 class="sgrp">Phẩm khi đột phá</h4><div class="cg-q">${qDescs(i).map(([n,d])=>{const qi=QNAME.indexOf(n);return `<div class="cg-qi${got===qi?' got':''}"><b>${n}${got===qi?' ✓':''}</b><small>${cgOk('Q'+i,i)?esc(d):'? ? ?'}</small></div>`;}).join('')}</div>`;}
  // cách đột phá lên cảnh giới sau
  const nx=CG_R.find(x=>x.i===i+1);if(nx&&R.brk)h+=`<h4 class="sgrp">Đột phá lên ${nx.n}</h4><p class="cg-d">${cgOk('R'+i+'b',i+1)||here&&cgKnow('R'+i+'b')?esc(R.brk):'Chưa rõ. Có lẽ phải nghe ngóng ở trà lâu, tửu phường, hoặc tìm đọc trong Tàng Kinh Các.'}</p>`;
  if(here){const X=typeof lkXkState==='function'&&lkXkState();const brk=canBreak();
    h+=`<div class="cg-act">${X?`<button class="btn${X.ok?' pri':''}" data-act="xkGo"${X.ok?'':' disabled'}${ta(X.ok?'':X.why||'')}>${ic('spark')} Xung kích ${esc(X.nx)}</button>`:''}${brk?`<button class="btn pri" data-act="hudBt">${ic('spark')} Đột phá</button>`:''}</div>`;}
  return h+'</div>';}
function cgTabHTML(){const s=UI.cgSel;return s===''||s==null?cgListHTML():cgDetailHTML(+s);}
// bảng lớn: hai tab Bế quan / Cảnh giới
{const _mh2=modalHTML;modalHTML=function(){const m=UI.modal;if(!m||m.k!=='bq'||!G.run)return _mh2();
  const tabs=`<div class="tabs bq-tabs"><button class="${m.tab!=='cg'?'on':''}" data-act="bqTab" data-arg="bq">Bế quan</button><button class="${m.tab==='cg'?'on':''}" data-act="bqTab" data-arg="cg">Cảnh giới</button></div>`;
  if(m.tab==='cg')return `<div class="mbox bq cgbox">${tabs}${cgTabHTML()}<div class="mb-f"><span class="grow"></span><button class="btn" data-act="modalX">Đóng</button></div></div>`;
  let h=_mh2();h=h.replace('<div class="mbox bq">','<div class="mbox bq">'+tabs).replace(/data-act="hudBt"/g,'data-act="cgGo"').replace(/data-act="xkGo"/g,'data-act="cgGo"');return h;};}
ACT.bqTab=t=>{const m=UI.modal;if(!m)return;if(t==='bq'&&m.tab==='cg'){const r=G.run;if(!r.scene||r.scene.type!=='place'){const w=bqCan();if(w){note(w,'dn');return;}openBq();if(UI.modal)UI.modal.tab='bq';return;}}m.tab=t;if(t==='cg'&&UI.cgSel==null)UI.cgSel='';};
ACT.cgGo=()=>{const r=G.run;UI.modal=Object.assign(UI.modal||{k:'bq'},{tab:'cg'});UI.cgSel=String(isPham()?-1:r.realm);};
ACT.cgSel=a=>{UI.cgSel=a;};
ACT.cgOpen=()=>{UI.panel=null;const r=G.run;UI.modal={k:'bq',tab:'cg'};UI.cgSel=String(isPham()?-1:r.realm);};
