// ================= TÂM TRÍ NPC (độ khôn) =================
// Bảng số: content/rules/tri-npc.js (TRI). Áp cho người có tên: thiên kiêu, đồng hành, kẻ địch là người, khách/thương nhân/tuần tra trên bản đồ.
// Yêu thú, quỷ vật, thiên kiếp giữ cách cũ.
// 1) Chỉ số: mỗi NPC có đủ chỉ số như nhân vật chính (npcChiSo), cố định theo tên. Tâm trí 0–100 = ngộ tính + tiềm chất + đạo tâm.
// 2) Đánh nhau (triQuyet): kẻ khôn thủ thế khi bị tụ lực nhắm vào, hồi máu đúng lúc, đánh kẻ yếu nhất, sắp chết thì bỏ chạy; kẻ dại đánh bừa.
// 3) Ngoài thế giới (triNam, mỗi năm): thiên kiêu tu theo tư chất/ngộ tính; kẻ khôn chờ chắc mới đột phá, ít chết, hay gặp cơ duyên; kẻ dại vội, dễ tẩu hỏa.
// 4) Với người chơi (triGapTk, gặp trên bản đồ / thuyết phục trong sự kiện): kẻ thù khôn chỉ ra tay khi chiếm thế; kẻ khôn khó thuyết phục, khó lừa, biết kết giao.
// Bài kiểm tra có thể ép tâm trí: TRI_EP[khoá]=số.
const TRI_C={},TRI_EP={};
function triFmt(s,n){return String(s||'').replace('{0}',n||'');}
function triRvIdx(n){const w=W();if(!w||!n)return -1;return (w.rivals||[]).findIndex(x=>x&&x.ten===n);}
function triMinTier(key){if(String(key).startsWith('rv:')){const i=triRvIdx(String(key).slice(3));const rv=i>=0&&W().rivals[i];return rv?(rv.tal>=1.2?4:3):0;}return 0;}
// đủ chỉ số như nhân vật chính: linh căn, tư chất, ngộ tính, đạo tâm, khí vận, thân pháp, thể chất, tiên thiên khí vận, đạo cơ
function npcChiSo(key){if(!key)return null;const k='cs|'+key;if(TRI_C[k])return TRI_C[k];
  const p=npcTalProfile(key),tal=npcTal(key,triMinTier(key)),R2=seedRng('cs:'+key);
  const o={root:p.root,tuchat:p.tcv,ngo:p.ngo,tam:6+Math.floor(R2()*7),van:2+Math.floor(R2()*5),tp:4+Math.floor(R2()*5),kvMax:p.kvMax,the:p.th,dao:p.dao,tiem:tal.tier};
  const W0=TRI.w,sNgo=clamp((o.ngo-8)/7,0,1)*100,sTal=o.tiem/4*100,sTam=clamp((o.tam-6)/6,0,1)*100;
  o.tri=Math.round(clamp(W0.ngo*sNgo+W0.tal*sTal+W0.tam*sTam+(R2()*2-1)*TRI.lech,0,100));
  TRI_C[k]=o;return o;}
function triOf(key){if(!key)return null;if(TRI_EP[key]!=null)return TRI_EP[key];const c=npcChiSo(key);return c?c.tri:null;}
function triBac(t){for(const x of TRI.bac)if(t>=x[0])return x[1];return TRI.bac[TRI.bac.length-1][1];}
// khoá NPC của một đơn vị trong trận (giống unitTal; người trùng tên thiên kiêu thì là thiên kiêu ấy)
function triKeyU(u){if(!u||u.isMain||u.kind==='kiep'||u.immune)return null;
  if(u.side==='A'){if(u.ally===-7||u.ctrl!=='ai')return null;return 'ally:'+u.name;}
  if(u.f&&u.f!=='nhan')return null;const n=u.realName||u.name;const i=triRvIdx(n);return i>=0?'rv:'+n:'foe:'+n;}
function triU(u){if(!u)return null;if(u._triK===undefined)u._triK=triKeyU(u);return u._triK?triOf(u._triK):null;}
function triKeyRv(i){const w=W();const wr=w&&w.rivals[i];return wr?'rv:'+wr.ten:null;}
// giao diện: "Tâm trí: Mưu trí"
function triTxtU(u){const t=triU(u);return t==null?'':'Tâm trí: '+triBac(t);}
// tiềm chất hiện trên thẻ trận: người trùng tên thiên kiêu lấy đúng tiềm chất thiên kiêu
{const _ut=unitTal;unitTal=function(u){if(u&&u.side==='B'&&!u.immune&&(!u.f||u.f==='nhan')){const i=triRvIdx(u.realName||u.name);if(i>=0)return rivalTal(i);}return _ut.apply(this,arguments);};}

// ---------------- 2) ĐÁNH NHAU ----------------
function triQuyet(sc,u){const t=triU(u);if(t==null)return null;const C=TRI.tran;
  const foes=alive(sc,foeSide(u.side));if(!foes.length)return null;const hpR=u.hp/Math.max(1,u.max);
  // kẻ mưu trí sắp chết, đối phương còn khoẻ: bỏ chạy (không áp cho trùm, tỉ thí)
  if(t>=TRI.muu&&u.side==='B'&&!u.boss&&!sc.boss&&!sc.spar&&hpR<C.chay.mau&&foes.some(f=>f.hp>f.max*C.chay.taMau)&&chance(C.chay.p))return {flee:1,t};
  let it=u.intent||'atk',why=null,tgt=null;const pat=u.pat||[];
  if(t>=TRI.khon){
    if(hpR<C.hoiMau&&pat.includes('heal')&&it!=='heal'){it='heal';why='hoi';}
    else{const ch=foes.find(f=>f.phase==='charge'&&f.pending&&(f.pending.tid==null||f.pending.tid===u.id));
      if(ch&&it!=='block'&&chance(t/100*C.thuThe)){it='block';why='thu';}}
    // đối phương đang thủ thế: không đánh vào khiên, đổi sang đòn hiểm hoặc tụ lực chờ hết thế thủ
    if(!why&&(it==='atk'||it==='multi')&&foes.some(f=>f.phase==='guard')){const deb=pat.filter(x=>['poison','burn','weak','vuln'].includes(x));it=deb.length?pick(deb):'heavy';}
    // nhắm kẻ còn ít máu nhất (theo tỉ lệ) để hạ cho nhanh
    tgt=foes.slice().sort((a,b)=>a.hp/a.max-b.hp/b.max)[0];
  }else if(t<TRI.ngu){tgt=pick(foes);if(chance(C.danhBua)&&it!=='atk'){it='atk';why='bua';}}
  return {it,tgt:tgt?tgt.id:null,why,t};}
{const _ai=aiAct;aiAct=function(sc,u){
  if(!u||u.hp<=0||u.dazed||!sc||sc.kiep||u.ctrl!=='ai'||u.kind==='kiep')return _ai.apply(this,arguments);
  const q=triQuyet(sc,u);if(!q)return _ai.apply(this,arguments);
  if(q.flee){u.gone=1;u.phase='down';clog(sc,triFmt(TRI.txt.chay,u.name),'fl');dbg('tri.chay',{n:u.name,t:q.t});return;}
  if(q.it!==u.intent){u.intent=q.it;if(q.why)clog(sc,triFmt(TRI.txt[q.why],u.name),u.side==='A'?'me':'en');}
  if(q.why)dbg('tri.tran',{n:u.name,t:q.t,why:q.why,it:q.it});
  u._tTgt=q.tgt;try{return _ai.apply(this,arguments);}finally{u._tTgt=null;}};}
{const _bs=beginSkill;beginSkill=function(sc,u,sk,lv,tid){if(u&&u._tTgt!=null&&sk&&sk.fx&&!sk.fx.eheal&&!sk.fx.eblock){const x=U_(sc,u._tTgt);if(x&&x.hp>0&&!x.gone)tid=x.id;}return _bs.call(this,sc,u,sk,lv,tid);};}

// ---------------- 3) NGOÀI THẾ GIỚI (thiên kiêu) ----------------
const TRI_TD=[14,6,2.6,1.2,.5,.3]; // tốc độ tiến độ theo cảnh giới (như cũ)
function triTuMul(c){const D=TRI.doi;return (D.tuMin+(D.tuMax-D.tuMin)*clamp(c.tuchat,0,100)/100)*(1+(c.ngo-10)/D.ngoMoi);}
function triDpRate(t,prog){const D=TRI.doi;return clamp(D.dpGoc+D.dpTri*t/100+(prog>=100+D.cho*0.5?D.dpCho:0),0.05,0.99);}
function triCho(t){return t>=TRI.khon?TRI.doi.cho*t/100:0;}
function triNews(k,rv){const w=W();const wr=w.rivals[rv.i];if(wr)pushNews(triFmt(TRI.txt[k],wr.ten));}
function triNam(rv,dy){const r=G.run,w=W();const wr=w.rivals[rv.i];if(!wr||!rv.alive)return;const D=TRI.doi;
  const key='rv:'+wr.ten,c=npcChiSo(key),t=triOf(key);
  let g=dy*wr.tal*TRI_TD[rv.realm]*triTuMul(c);
  if(chance(Math.min(.5,dy*D.coDuyen*t/100))){g+=ri(D.coDuyenTd[0],D.coDuyenTd[1]);if(chance(.4))triNews('coDuyen',rv);dbg('tri.coDuyen',{n:wr.ten,t});}
  rv.prog+=g;
  const song=()=>r.rivals.filter(x=>x.alive).length;
  if(rv.realm<4&&rv.prog>=100+triCho(t)){
    if(chance(triDpRate(t,rv.prog))){rv.realm++;rv.prog=ri(0,15);dbg('tri.dp',{n:wr.ten,t,realm:rv.realm});
      if(chance(.6))pushNews(T(pick(RUMOR.tien.filter(x=>x.includes('{$cg}'))),rumorV(rv)));}
    else{rv.prog-=ri(D.hong[0],D.hong[1]);
      if(t<TRI.ngu&&song()>3&&chance(D.tauHoa)){rv.alive=false;triNews('tauHoa',rv);dbg('tri.tauHoa',{n:wr.ten,t});return;}
      dbg('tri.hong',{n:wr.ten,t});if(chance(.3))triNews('hong',rv);}}
  // kẻ dại liều mạng: thêm nguy cơ bỏ mạng
  if(rv.realm>=1&&t<50&&song()>3&&chance(dy*D.lieu*(50-t)/50)){rv.alive=false;pushNews(T(RUMOR.tu,rumorV(rv)));dbg('tri.lieuChet',{n:wr.ten,t});}}
// tin đồn đọc cảnh giới thật khi đang tạm che (xem bên dưới)
{const _rv=rumorV;rumorV=function(rv,extra){if(rv&&rv._re!=null){const s=rv.realm;rv.realm=rv._re;try{return _rv.apply(this,arguments);}finally{rv.realm=s;}}return _rv.apply(this,arguments);};}
// thay phần tu luyện/đột phá của worldTick cũ bằng triNam; nạn bất ngờ (của worldTick cũ) kẻ khôn có phần thoát
{const _wt=worldTick;worldTick=function(dy){const r=G.run,w=W();if(!r||!w||!r.rivals)return _wt.apply(this,arguments);
  const st=[];for(const rv of r.rivals){if(!rv.alive)continue;const k=triKeyRv(rv.i),t=k?triOf(k):50;
    const thoat=t>50&&chance((t-50)/100*TRI.doi.thoatChet);st.push([rv,rv.prog,rv.realm]);rv.prog=-1e9;if(thoat&&rv.realm>=1){rv._re=rv.realm;rv.realm=0;}}
  let o;try{o=_wt.apply(this,arguments);}finally{for(const [rv,p,re] of st){rv.prog=p;rv.realm=re;delete rv._re;}}
  if(!G.run)return o;for(const [rv] of st)triNam(rv,dy||0);return o;};}
// thiên kiêu đi trên bản đồ: kẻ khôn tìm tới nơi có dị tượng (cơ duyên), kẻ dại hay đi lang thang
{const _ei=entIdle;entIdle=function(e){const o=_ei.apply(this,arguments);if(e&&e.type==='thienkieu'&&e.data&&e.data.rv!=null){const k=triKeyRv(e.data.rv),t=k?triOf(k):50;
  if(t<TRI.ngu&&chance(.5))setRoute(e,pick(regionOf(e.r).nodes).id);}return o;};}

// ---------------- 4) VỚI NGƯỜI CHƠI ----------------
function triRaTay(ten,m){const r=G.run;if(r.moving)r.moving=null;startCombat({k:'human',m:m||1},{kind:'node'});const sc=G.run.scene;
  if(sc&&sc.units){const u=sc.units.find(x=>x.side==='B');if(u){u.name=ten;u.realName=ten;u._triK=undefined;}if(sc.en)sc.en.n=ten;}}
// gặp thiên kiêu trên bản đồ
function triGapTk(e){const r=G.run,w=W();if(!r||r.scene||!e||e.data==null||e.data.rv==null)return false;
  const rv=(r.rivals||[]).find(x=>x.i===e.data.rv&&x.alive);const wr=w.rivals[e.data.rv];if(!rv||!wr)return false;
  const t=triOf('rv:'+wr.ten),fav=Math.round((rv.rel||0)*10),N=TRI.nguoi;
  if(fav<=N.thu){
    const theManh=rv.realm>r.realm||(rv.realm===r.realm&&r.hp<S().maxHp*0.6);
    if(t<TRI.khon){note(triFmt(TRI.txt.lieu,wr.ten),'dn');dbg('tri.gap',{n:wr.ten,t,k:'lieu'});triRaTay(wr.ten,clamp(1.05+(rv.realm-r.realm)*0.45,0.85,1.8));return true;}
    if(theManh){note(triFmt(TRI.txt.raTay,wr.ten),'dn');dbg('tri.gap',{n:wr.ten,t,k:'raTay'});triRaTay(wr.ten,clamp(1.05+(rv.realm-r.realm)*0.45,0.85,1.8));return true;}
    note(triFmt(TRI.txt.tranh,wr.ten),'');dbg('tri.gap',{n:wr.ten,t,k:'tranh'});return false;}
  if(fav>=0&&t>=TRI.khon&&r.realm>rv.realm){const y=tYear(w.t);if((rv.kgY||-99)+N.ketGiao.nam<=y){rv.kgY=y;rv.rel=(rv.rel||0)+N.ketGiao.rel;
    if(typeof favPop==='function')favPop(wr.ten,N.ketGiao.rel*10);note(triFmt(TRI.txt.ketGiao,wr.ten),'up');dbg('tri.gap',{n:wr.ten,t,k:'ketGiao'});}}
  return false;}
// khách, thương nhân, tuần tra... có thù: kẻ khôn chỉ ra tay khi ngươi đang yếu (dưới 60% máu); kẻ dại đang ghét là gây sự
function triGapEnt(e){const r=G.run;if(!r||!e||!e.name||!['khach','tuantra','thuong'].includes(e.type))return null;
  const o=npcRec(e.name);if(!o)return null;const t=triOf('ent:'+e.id+':'+e.name);if(t==null)return null;
  if(o.fav<=TRI.nguoi.thu&&t>=TRI.khon&&r.hp>=S().maxHp*0.6)return 'tranh';
  if(o.fav<=-30&&o.fav>TRI.nguoi.thu&&t<TRI.ngu&&!r.moving)return 'lieu';return null;}
{const _me=meetEnt;meetEnt=function(e){const r=G.run;
  const k=r&&e?triGapEnt(e):null;
  if(k==='tranh'){const o=npcRec(e.name),f0=o.fav;o.fav=TRI.nguoi.thu+1;let res;try{res=_me.apply(this,arguments);}finally{const o2=npcRec(e.name);if(o2)o2.fav=f0;}
    if(G.run&&!G.run.scene)note(triFmt(TRI.txt.tranh,e.name),'');dbg('tri.gap',{n:e.name,k});return res;}
  const res=_me.apply(this,arguments);if(!G.run||G.run.scene)return res;
  if(k==='lieu'){note(triFmt(TRI.txt.lieu,e.name),'dn');dbg('tri.gap',{n:e.name,k});triRaTay(e.name,1);return res;}
  if(e&&e.type==='thienkieu')triGapTk(e);return res;};}
// thuyết phục / lừa gạt một thiên kiêu trong sự kiện: kẻ khôn khó xiêu lòng, khó bị lừa
const TRI_LUA=/lừa|gạt|dối|bịp|giả vờ|giả làm|dụ /i;
function triThuyet(l,rvi){const k=triKeyRv(rvi);if(!k||!l)return 0;const t=triOf(k);const lua=TRI_LUA.test(l),mi=MI_RX.test(l);if(!lua&&!mi)return 0;
  return -(t-50)*TRI.nguoi.thuyet*(lua?TRI.nguoi.lua:1);}
{const _ch=choose;choose=function(i){const r=G.run,sc=r&&r.scene;let bump=0;
  if(sc&&sc.type==='event'&&sc.v&&sc.v.rvi!=null){const e=EVMAP[sc.id];const L=(e&&resolveP(e,sc.cur))||[];const c=L[i];if(c&&c.chk)bump=triThuyet(T(c.l||'',sc.v),sc.v.rvi);}
  if(!bump)return _ch(i);dbg('tri.thuyet',{rvi:sc.v.rvi,bump:+bump.toFixed(3)});const _cc=chkChance;chkChance=function(k){return clamp(_cc(k)+bump,0.03,0.97);};try{return _ch(i);}finally{chkChance=_cc;}};}
