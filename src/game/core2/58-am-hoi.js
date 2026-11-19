// Sửa-I câu 39 + Sửa-J câu 42/42b/43: U Minh Ám Hội — buổi họp kín, mỗi người đưa VẬT ĐANG CÓ ra; cả bàn ĐẤU nhiều vòng.
// Bảng AM_HOI: content/rules/am-hoi.js · chữ: content/text/am-hoi.json (amh.*).
// Giá trị một vật = giá gốc × hệ số nhu cầu của thế giới tại nơi họp (ncGet, như cửa hàng). Linh thạch cũng là một "vật" (lt:k).
// Người bán nêu DANH SÁCH vật muốn nhận (tên + số lượng). Trả giá = một món trong danh sách đủ số lượng, hoặc "Thương lượng" (tự chọn vật + số lượng;
// người bán xét hợp nhu cầu + tổng giá trị). Mỗi lần trả phải hấp dẫn hơn mức đang dẫn; bỏ cuộc thì không trả lại trong món đó.
// Đếm ngược AM_HOI.dem ms thời gian thật (amNow; bài kiểm tua bằng amTua). Hết giờ không ai trả cao hơn: người đang dẫn thắng.
// Không món nào rời túi trước khi gõ búa; gõ búa thì vật đấu và vật trả đổi tay thật (túi người chơi / túi NPC / của cải NPC).
// G.run.scene={type:'amhoi',node,seed,ppl:[người ngồi bàn],q:[lô],i,meAt,meDone,ph:'chon'|'lot'|'xong',lot,log,tl}
// lô: {own,u,it,v}; lot: {i,v,mo,muon:[{key,n,ic,sl}],lead:{who,key,n,sl,v}|null,bo:{},t0,hen,plan:{pi:t},nb}
const AMV=[1,100,10000,1000000]; // một viên linh thạch mỗi phẩm, quy ra Hạ phẩm (giá gốc)
function amH(sc,k){return wHash((sc?sc.seed:'')+'|'+k);}
let AM_W=null; // thế giới đang lập túi (vaiInit có thể chạy trước khi G.meta.world được gán)
let AM_LECH=0; // tua đồng hồ (chỉ bài kiểm dùng)
function amNow(){return Date.now()+AM_LECH;}
function amUid(){const w=AM_W||(G.meta&&G.meta.world);if(!w)return 'u'+Math.floor(Math.random()*1e9);w.amU=(w.amU||0)+1;return 'u'+w.amU;}
function amFmt(v){v=Math.max(0,Math.round(v));const L=[];for(let k=3;k>=0;k--){const x=Math.floor(v/AMV[k]);if(x){L.push(fmtN(x)+' '+ltName(k).replace(' phẩm',''));v-=x*AMV[k];}}return L.length?L.join(' · '):'0 '+ltName(0).replace(' phẩm','');}
function amLtTot(){let s=0;for(let k=0;k<4;k++)s+=ltGet(k)*AMV[k];return s;}
function amNode(){const sc=G.run&&G.run.scene;return sc&&sc.type==='amhoi'?sc.node:(G.run?G.run.at:null);}
// ---------- giá gốc (Hạ phẩm) và khoá nhu cầu ----------
function amIdOf(it){return typeof it==='string'?it:String(it&&it.id);}
function amBase(it,that){if(!it)return 0;const id=amIdOf(it);
  if(id.startsWith('lt:'))return AMV[+id.slice(3)]||0;
  if(id==='rel')return Math.round(AM_HOI.relic*Math.pow(3,clamp(it.q||0,0,6)));
  if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?Math.max(1,Math.round((P.p||10)*(1+((it&&it.q)||0)))):0;}
  const D=typeof ccDoParse==='function'?ccDoParse(id):null;
  if(D){if(D.k==='x')return 0;if(D.k==='g'&&that)return 0;return Math.round(CC_DO[D.p].st*(D.k==='t'?1.1:1));}
  if(id.startsWith('cc_')&&typeof CC_VT!=='undefined'){const V=CC_VT[id.slice(3)];if(V)return Math.round((V.st||Math.max(5,Math.round((V.gia||0)/100)))*CC_CFG.amX);}
  const C=CAT.byId&&CAT.byId[id];return C?Math.max(1,Math.round(C.p||20)):0;}
function amNcKey(it){const id=amIdOf(it);if(id.startsWith('lt:'))return 'lt'+id.slice(3);if(id==='rel')return 'pb';if(id.startsWith('pill:'))return 'dan:'+id.slice(5);return 'qi:'+id;}
// giá trị theo nhu cầu của thế giới tại nơi họp (that=1: giá trị thật, đồ dởm = 0)
function amVal(it,that,nid){const b=amBase(it,that);if(!b)return 0;return Math.max(1,Math.round(b*ncGet(nid!=null?nid:amNode(),amNcKey(it))));}
function amFake(it){const D=typeof ccDoParse==='function'?ccDoParse(it&&it.id):null;return !!(D&&(D.k==='g'||D.k==='x'));}
function amIcon(it){const id=amIdOf(it);if(id.startsWith('lt:'))return '💎';if(id==='rel')return '🏺';if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?P.i:'💊';}const C=CAT.byId&&CAT.byId[id];return (C&&C.i)||'📦';}
function amName(it){const id=amIdOf(it);if(id.startsWith('lt:'))return ltName(+id.slice(3));if(id==='rel')return it.n+' ('+GRADE[clamp(it.q||0,0,4)]+')';if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?P.n:it.n;}const C=CAT.byId&&CAT.byId[id];return (C&&C.n)||(it&&it.n)||id;}
// pháp bảo dựng không dùng R() (túi NPC lập theo hạt giống thế giới)
function amRelic(h,tier){const K0=RELIC_K.filter(k=>k.k!=='hap'&&k.k!=='tui'&&Array.isArray(k.b));const K=K0[Math.floor(h(1)*K0.length)%K0.length];
  const el=h(2)<0.45?'vo':NGUHANH[Math.floor(h(3)*NGUHANH.length)%NGUHANH.length];const P=RELIC_PRE[el]||RELIC_PRE.vo;const pre=P[Math.floor(h(4)*P.length)%P.length];const base=K.b[Math.floor(h(5)*K.b.length)%K.b.length];
  return {name:pre+' '+base,k:K.k,tier,el,fx:Object.assign({},K.fx),lore:''};}
// một túi đồ: n món, phẩm quanh t
function amTuiLap(h,n,t,opt){const L=[];const PI=Object.keys(PILL).filter(k=>PILL[k].p);
  for(let j=0;j<n;j++){const x=k=>h(j*31+k);const u=amUid();
    if(opt&&opt.vt&&j===0){L.push({u,id:'cc_'+opt.vt,n:CC_VT[opt.vt].n});continue;}
    if(opt&&opt.fake&&j===n-1){const p=1+Math.floor(x(7)*3);L.push({u,id:'ccg_'+p,n:CC_DO[p].n});continue;}
    if(opt&&opt.that){let hit=0;for(const p in CC_DO)if(!hit&&x(10+(+p))<CC_DO[p].dg*AM_HOI.that){L.push({u,id:'ccd_'+p,n:CC_DO[p].n});hit=1;}if(hit)continue;}
    if(x(0)<0.45){const tier=clamp(t+(x(8)<0.3?1:x(8)>0.8?-1:0),0,4);const rel=amRelic(k=>x(40+k),tier);L.push({u,id:'rel',n:rel.name,q:tier,rel});}
    else{const id=PI[Math.floor(x(9)*PI.length)%PI.length];L.push({u,id:'pill:'+id,n:PILL[id].n,q:0});}}
  return L;}
// ---------- túi NPC giữ vai: lập một lần (tu sĩ), theo hạt giống thế giới ----------
{const _vi=vaiInit;vaiInit=function(w){const V=_vi.apply(this,arguments);if(!w)try{w=W();}catch(e){w=null;}if(!V||!w)return V;
  for(const ma in V){const v=V[ma],P=VAI_NP[ma];if(!P||v.tuiS||P.tu<1)continue;v.tuiS=1;if(v.tui.length)continue;const h=k=>wRnd(w,'amtui|'+ma+'|'+k);
    const A=AM_HOI.vaiTui;const n=A[0]+Math.floor(h(0)*(A[1]-A[0]+1));AM_W=w;try{v.tui=amTuiLap(h,n,clamp(P.tu-1,0,4),{fake:h(1)<0.15}).slice(0,VAI_TUI_MAX);}finally{AM_W=null;}
    v.cua=(v.cua||0)+Math.round(AM_HOI.vaiCua*Math.pow(4,clamp(P.tu,0,5))*(0.5+h(2)));}
  return V;};}
// ---------- người ngồi bàn (Sửa-J câu 43): chỉ NPC thật — người giữ vai (tu sĩ) và thiên kiêu còn sống; hóa trang, che tu vi ----------
// p={k:'vai',ma}|{k:'tk',i (chỉ số trong G.run.rivals)}, an: tên hóa trang, nhan: 1 nếu người chơi nhận ra
function amRv(p){return p&&p.k==='tk'?(G.run.rivals||[])[p.i]:null;}
// túi thiên kiêu: lập một lần theo hạt giống thế giới (bản lưu cũ lập khi cần)
function amRvTui(rv,i){if(!rv)return [];if(!rv.tuiS){rv.tuiS=1;const w=W();const h=k=>wRnd(w,'amtk|'+i+'|'+k);const A=AM_HOI.tkTui;const n=A[0]+Math.floor(h(0)*(A[1]-A[0]+1));
    rv.tui=amTuiLap(h,n,clamp(rv.realm||0,0,4),{fake:h(1)<AM_HOI.gia,that:1}).slice(0,VAI_TUI_MAX);rv.cua=(rv.cua||0)+Math.round(AM_HOI.vaiCua*Math.pow(4,clamp((rv.realm||0)+1,0,5))*(0.5+h(2)));}
  return rv.tui||(rv.tui=[]);}
function amTui(sc,pi){const p=sc.ppl[pi];if(!p)return [];if(p.k==='vai')return vaiTui(p.ma);if(p.k==='tk')return amRvTui(amRv(p),p.i);return p.tui||[];}
function amCua(sc,pi,d){const p=sc.ppl[pi];if(!p)return 0;const o=p.k==='vai'?(vaiInit(W())[p.ma]||{}):p.k==='tk'?(amRvTui(amRv(p),p.i),amRv(p)||{}):p;if(d)o.cua=Math.max(0,(o.cua||0)+Math.round(d));return o.cua||0;}
function amThat(p){if(p.k==='vai'){const v=vaiNow(p.ma);return {ten:v&&v.song?v.ten:'?',sub:v?v.vai:'',cg:REALM[clamp(VAI_NP[p.ma].tu,0,5)]};}
  const rv=amRv(p),wr=rv&&W().rivals[rv.i];return {ten:wr?wr.ten:'?',sub:contentText('amh.tk'),cg:REALM[clamp(rv?rv.realm:0,0,5)]};}
function amTen(sc,pi){if(pi==='me')return contentText('amh.me');const p=sc.ppl[pi];if(!p)return '?';if(!p.nhan)return p.an;const t=amThat(p);return contentText('amh.nhanTen',[p.an,t.ten]);}
function amTuiDay(sc,pi){return amTui(sc,pi).length>=VAI_TUI_MAX;}
// khả năng nhận ra người hóa trang: thần thức (chỉ khi tu vi người kia không cao hơn), khảo vật, giao tình với thiên kiêu
function amNhanP(p){const r=G.run,C=AM_HOI.nhan;const cg=p.k==='vai'?VAI_NP[p.ma].tu:(amRv(p)||{}).realm||0;let x=C.goc;
  if(cg<=(r.realm||0)){x+=clamp(((S().than||10)-10)*C.than,0,C.thanMax);if(typeof tkActive==='function'&&tkActive())x+=C.tk;}
  x+=nangV('khao')/100*C.khao;const rv=amRv(p);if(rv&&(rv.rel||0)>=C.gt)x+=C.gtCong;return clamp(x,0,C.max);}
function amStart(n){const r=G.run;if(!amOpen(n)||!amLeft(n))return false;const w=W(),m=ncMonth();const seed='am|'+n.id+'|'+m+'|'+(w.seed||0);const h=k=>wHash(seed+'|'+k);
  const ppl=[];const V=vaiInit(w);
  const cand=Object.keys(VAI_NP).filter(ma=>VAI_NP[ma].tu>=1&&V[ma]&&V[ma].song&&!VAI_NP[ma].bat&&vaiTui(ma).length).sort((a,b)=>h('v'+a)-h('v'+b)).slice(0,AM_HOI.vai);
  for(const ma of cand)ppl.push({k:'vai',ma});
  const tk=(r.rivals||[]).map((rv,i)=>({rv,i})).filter(x=>x.rv&&x.rv.alive).sort((a,b)=>h('t'+a.i)-h('t'+b.i)).slice(0,AM_HOI.tk);
  for(const x of tk)ppl.push({k:'tk',i:x.i});
  const MAT=contentText('amh.mat').split('|');const m0=Math.floor(h('mat')*MAT.length);
  ppl.forEach((p,j)=>{p.an=contentText('amh.khachTen',[MAT[(m0+j)%MAT.length]]);p.nhan=h('nhan'+j)<amNhanP(p)?1:0;});
  const sc={type:'amhoi',node:n.id,seed,ppl,q:[],i:0,meAt:0,meDone:0,ph:'',lot:null,tl:null,log:[]};
  // Sửa-G: vật tư cải căn đang thiếu nằm trong túi một người ngồi bàn (họ mang tới, không tạo trên bàn)
  const vt=typeof ccAmVt==='function'?ccAmVt(n):null;
  if(vt&&ppl.length&&!ppl.some((p,pi)=>amTui(sc,pi).some(x=>x.id==='cc_'+vt))){const pi=Math.floor(h('vt')*ppl.length)%ppl.length;const T=amTui(sc,pi);if(T.length>=VAI_TUI_MAX)T.shift();T.push({u:amUid(),id:'cc_'+vt,n:CC_VT[vt].n});}
  // mỗi người đưa một món (vật tư cải căn trước, rồi đồ dởm muốn tống đi); vật quý về cuối buổi
  ppl.forEach((p,pi)=>{const T=amTui(sc,pi);if(!T.length)return;let it=T.find(x=>String(x.id).startsWith('cc_'))||T.find(x=>/^ccg_/.test(x.id))||T[Math.floor(h('o'+pi)*T.length)%T.length];
    sc.q.push({own:pi,u:it.u,it:JSON.parse(JSON.stringify(it)),v:amVal(it,0,n.id)});});
  sc.q.sort((a,b)=>a.v-b.v);sc.meAt=Math.floor(sc.q.length/2);
  if(!w.amhoi)w.amhoi={};if(!w.amhoi[n.id]||w.amhoi[n.id].m!==m)w.amhoi[n.id]={m,n:0};w.amhoi[n.id].n++;
  sc.log.push(contentText('amh.ngoi',[ppl.map((p,i)=>amTen(sc,i)).join(', ')]));
  r.scene=sc;amNext(sc);dbg('amh.mo',{n:n.id,ppl:ppl.length,lo:sc.q.length,vai:cand.length,tk:tk.length,nhan:ppl.filter(p=>p.nhan).length});return true;}
// danh sách người ngồi bàn cho hộp thoại: tên hóa trang; nhận ra thì hiện tên thật + tu vi, không thì "tu vi bị che"
function amBan(sc){return sc.ppl.map((p,pi)=>{const t=amThat(p);return {an:p.an,ten:p.nhan?t.ten+' · '+t.sub:'',cg:p.nhan?t.cg:contentText('amh.che')};});}
function amLog(sc,k,a){sc.log.push(contentText('amh.log.'+k,a));if(sc.log.length>10)sc.log.shift();}
function amStep(L){return Math.max(1,Math.round(L.v*AM_HOI.buoc));}
// ---------- của cải theo từng người: chồng vật {key,id,n,ic,sl,it} ----------
// người chơi: lt:k, pill:<id>, mã vật trong túi (gộp theo mã), r:<i> pháp bảo (mỗi cái một chồng)
function amHold(sc,who){const r=G.run;const L=[];
  if(who==='me'){for(let k=0;k<4;k++)if(ltGet(k)>0)L.push({key:'lt:'+k,it:{id:'lt:'+k},sl:ltGet(k)});
    r.relics.forEach((x,i)=>L.push({key:'r:'+i,it:{id:'rel',n:x.name,q:x.tier||0},sl:1}));
    const P={};r.pills.forEach(x=>{if(PILL[x.id])P[x.id]=(P[x.id]||0)+1;});for(const id in P)L.push({key:'pill:'+id,it:{id:'pill:'+id,n:PILL[id].n,q:0},sl:P[id]});
    const Q={};(r.qitems||[]).forEach(id=>{Q[id]=(Q[id]||0)+1;});for(const id in Q){const it={id,n:(CAT.byId[id]||{}).n||id};if(amBase(it,0)>0)L.push({key:id,it,sl:Q[id]});}}
  else{const c=amCua(sc,who);for(let k=3;k>=0;k--){const x=Math.floor(c/AMV[k]);if(x>0)L.push({key:'lt:'+k,it:{id:'lt:'+k},sl:x,cua:1});}
    const G2={};for(const x of amTui(sc,who)){const key=x.id==='rel'?'u:'+x.u:x.id;if(!G2[key])G2[key]={key,it:x,sl:0};G2[key].sl++;}L.push(...Object.values(G2));}
  for(const x of L){x.n=amName(x.it);x.ic=amIcon(x.it);}
  return L;}
function amHas(sc,who,key){if(who!=='me'&&String(key).startsWith('u:'))return amTui(sc,who).some(x=>x.u===key.slice(2))?1:0;if(who!=='me'&&String(key).startsWith('lt:'))return Math.floor(amCua(sc,who)/AMV[+key.slice(3)]);const h=amHold(sc,who).find(x=>x.key===key);return h?h.sl:0;}
function amItOf(sc,who,key){if(String(key).startsWith('lt:'))return {id:key};if(who!=='me'&&String(key).startsWith('u:'))return amTui(sc,who).find(x=>x.u===key.slice(2))||null;const h=amHold(sc,who).find(x=>x.key===key);return h?h.it:null;}
// lấy sl vật khỏi người who → bản ghi để giao cho người khác
function amLay(sc,who,key,sl){key=String(key);if(amHas(sc,who,key)<sl)return null;
  if(key.startsWith('lt:')){const k=+key.slice(3);if(who==='me')ltAdd(k,-sl,'amhoi');else amCua(sc,who,-sl*AMV[k]);return [{lt:k,sl}];}
  const out=[];
  if(who==='me'){for(let j=0;j<sl;j++){let it=null;
      if(key.startsWith('r:'))it=amTakeMine(key);
      else if(key.startsWith('pill:')){const i=G.run.pills.findIndex(x=>x.id===key.slice(5));if(i>=0)it=amTakeMine('p:'+i);}
      else{const i=(G.run.qitems||[]).indexOf(key);if(i>=0)it=amTakeMine('q:'+i);}
      if(it)out.push(it);}
    return out;}
  const T=amTui(sc,who);for(let j=0;j<sl;j++){const i=key.startsWith('u:')?T.findIndex(x=>x.u===key.slice(2)):T.findIndex(x=>x.id===key);if(i>=0)out.push(T.splice(i,1)[0]);}
  return out;}
function amDat(sc,who,recs){for(const x of recs||[]){
  if(x.lt!=null){if(who==='me')ltAdd(x.lt,x.sl,'amhoi');else amCua(sc,who,x.sl*AMV[x.lt]);continue;}
  if(who==='me')amGiveMe(x);else{const T=amTui(sc,who);if(T.length<VAI_TUI_MAX)T.push(x);else dbg('amh.tran',{ai:amTen(sc,who),n:x.n});}}}
// ---------- danh sách vật người bán muốn nhận ----------
// linh thạch phẩm vừa tầm + 1–2 thứ người bán đang cần (đan / vật tư thế giới đang thiếu, người bán chưa có), số lượng đủ giá mở
function amMuon(sc,L){const nid=sc.node,mo=Math.max(1,Math.round(L.v*AM_HOI.gia0));const out=[];
  if(L.own==='me'&&Array.isArray(L.muon)&&L.muon.length){for(const m of L.muon){const it={id:m.key};out.push({key:m.key,sl:m.sl,n:amName(it),ic:amIcon(it),dat:1});}return out;}
  let k=0;for(let j=3;j>=0;j--)if(amVal('lt:'+j,0,nid)<=mo){k=j;break;}const u=amVal('lt:'+k,0,nid);out.push({key:'lt:'+k,sl:Math.max(1,Math.ceil(mo/u))});
  if(L.own!=='me'){const co=new Set(amTui(sc,L.own).map(x=>x.id));
    const PI=Object.keys(PILL).filter(id=>PILL[id].p&&!co.has('pill:'+id)).map(id=>{const key='pill:'+id;const uv=amVal(key,0,nid);return {key,uv,s:ncGet(nid,amNcKey(key))+amH(sc,'muon|'+L.u+'|'+id)*0.5};})
      .filter(x=>Math.ceil(mo/x.uv)<=AM_HOI.slMax).sort((a,b)=>b.s-a.s);
    for(const x of PI.slice(0,AM_HOI.muonN))out.push({key:x.key,sl:Math.max(1,Math.ceil(mo/x.uv))});}
  for(const x of out){const it={id:x.key};x.n=amName(it);x.ic=amIcon(it);}
  return out;}
// độ hợp nhu cầu của người bán với một vật: có trong danh sách 1; linh thạch phẩm khác 1; cùng loại hop.cung; pháp bảo hop.pb; vật khác hop.khac (dưới hopMin thì không nhận)
function amLoai(key){key=String(key);if(key.startsWith('lt:'))return 'lt';if(key.startsWith('pill:'))return 'dan';if(key.startsWith('r:')||key.startsWith('u:'))return 'pb';return 'vat';}
function amHop(sc,lot,key){if(lot.muon.some(m=>m.key===key))return 1;const l=amLoai(key);if(lot.muon.some(m=>amLoai(m.key)===l))return l==='lt'?1:AM_HOI.hop.cung;return l==='pb'?AM_HOI.hop.pb:AM_HOI.hop.khac;}
// giá trị một lần trả (theo mắt người bán): đơn giá theo nhu cầu × số lượng × độ hợp; đồ dởm bị nhìn ra = 0
function amBidVal(sc,L,lot,who,key,sl){const it=amItOf(sc,who,key);if(!it)return 0;
  if(amFake(it)&&amH(sc,'sb|'+L.u+'|'+key)<AM_HOI.bietGia)return 0;return Math.floor(amVal(it,0,sc.node)*sl*amHop(sc,lot,key));}
function amNeed(L,lot){return lot.lead?lot.lead.v+amStep(L):lot.mo;}
// số lượng tối thiểu của một vật để vượt mức đang dẫn (không ít hơn số lượng người bán nêu)
function amSlCan(sc,L,lot,who,key){const it=amItOf(sc,who,key)||{id:key};const one=amVal(it,0,sc.node)*amHop(sc,lot,key);if(one<=0)return Infinity;const m=lot.muon.find(x=>x.key===key);
  return Math.max(m?m.sl:1,Math.ceil(amNeed(L,lot)/one-1e-9));}
// ---------- đấu: mở lô, NPC trả giá theo đồng hồ, gõ búa ----------
function amNext(sc){sc.lot=null;sc.tl=null;
  if(!sc.meDone&&sc.i>=sc.meAt){sc.ph='chon';return;}
  if(sc.i>=sc.q.length){sc.ph='xong';sc.log.push(contentText('amh.xong'));dbg('amh.tan',{});return;}
  const L=sc.q[sc.i];const T=L.own==='me'?null:amTui(sc,L.own);if(T?!T.some(x=>x.u===L.u):!amMineFind(L.it)){sc.i++;return amNext(sc);}
  L.v=amVal(L.it,0,sc.node);
  const lot={i:sc.i,v:L.v,mo:Math.max(1,Math.round(L.v*AM_HOI.gia0)),muon:[],lead:null,bo:{},t0:amNow(),hen:0,plan:{},nb:0};
  lot.hen=lot.t0+AM_HOI.dem;lot.muon=amMuon(sc,L);sc.lot=lot;sc.ph='lot';
  L.nghi=amFake(L.it)&&L.own!=='me'&&amH(sc,'nghi|'+L.u)<(typeof ccNhanP==='function'?ccNhanP():0)?1:0;
  amLog(sc,'mo',[amTen(sc,L.own),amName(L.it),lot.muon.map(m=>m.sl+' '+m.n).join(' / ')]);
  amPlan(sc,L,lot);dbg('amh.lo',{n:L.it.n,v:L.v,muon:lot.muon.map(m=>m.key+'×'+m.sl).join(',')});}
// mức NPC chịu trả: giá trị họ thấy × nhu cầu riêng (băm), đồ dởm nhìn ra thì 0, túi đầy thì 0
function amCap(sc,L,pi){if(amTuiDay(sc,pi))return 0;const fake=amFake(L.it)&&amH(sc,'b'+pi+'|'+L.u)<AM_HOI.bietGia;if(fake)return 0;const N=AM_HOI.nhu;
  return Math.round(L.v*(N[0]+amH(sc,'n'+pi+'|'+L.u)*(N[1]-N[0])));}
// lựa cách trả của NPC: món trong danh sách họ có đủ (ưu tiên vật trong túi, rồi linh thạch)
function amNpcBid(sc,L,lot,pi){const cap=amCap(sc,L,pi);const need=amNeed(L,lot);if(cap<need)return null;
  const M=lot.muon.filter(m=>amLoai(m.key)!=='lt').map(m=>m.key);const lt=lot.muon.find(m=>amLoai(m.key)==='lt');
  if(L.own==='me'&&L.muon&&L.muon.length){for(const m of lot.muon)if(amLoai(m.key)==='lt')M.push(m.key);}
  else if(lt)for(let k=+lt.key.slice(3);k>=0;k--)M.push('lt:'+k); // linh thạch: phẩm nêu, hoặc đếm bằng phẩm thấp hơn cho vừa giá
  for(const key of M){const m={key};const sl=amSlCan(sc,L,lot,pi,m.key);if(!isFinite(sl)||amHas(sc,pi,m.key)<sl)continue;const v=amBidVal(sc,L,lot,pi,m.key,sl);if(v>=need&&v<=cap*1.15)return {key:m.key,sl,v};}
  return L.own!=='me'?amNpcDoi(sc,L,lot,pi,cap,need):null;}
// Sửa-M câu 55: người bán là NPC → NPC khác cũng được đề nghị đổi bằng vật khác (ngoài danh sách người bán nêu).
// Người bán xét theo nhu cầu của mình: độ hợp nhu cầu >= hopMin và giá trị (đã nhân độ hợp) vượt mức đang dẫn thì mới nhận; lời đề nghị đi vào đấu giá như một lần trả giá (nhiều vòng, đếm ngược)
function amNpcDoi(sc,L,lot,pi,cap,need){let best=null,tu=null;
  for(const h of amHold(sc,pi)){if(h.cua||lot.muon.some(m=>m.key===h.key))continue;const hop=amHop(sc,lot,h.key);
    if(hop<AM_HOI.hopMin){if(!tu)tu=h;continue;}
    const sl=amSlCan(sc,L,lot,pi,h.key);if(!isFinite(sl)||sl>h.sl)continue;const v=amBidVal(sc,L,lot,pi,h.key,sl);
    if(v>=need&&v<=cap*1.15&&(!best||v<best.v))best={key:h.key,sl,v,n:h.n};}
  if(best){amLog(sc,'deNpc',[amTen(sc,pi),best.sl+' '+best.n,amTen(sc,L.own)]);dbg('amh.deNpc',{ai:amTen(sc,pi),key:best.key,sl:best.sl,v:best.v});return best;}
  if(tu&&!(lot.deTu=lot.deTu||{})[pi]){lot.deTu[pi]=1;amLog(sc,'deTu',[amTen(sc,L.own),tu.n,amTen(sc,pi)]);dbg('amh.deTu',{ai:amTen(sc,pi),key:tu.key});}
  return null;}
function amPlan(sc,L,lot){lot.plan={};const T=AM_HOI.tre;sc.ppl.forEach((p,pi)=>{if(pi===L.own||lot.bo[pi]||(lot.lead&&lot.lead.who===pi))return;
  lot.plan[pi]=lot.t0+Math.round(T[0]+amH(sc,'tre|'+L.u+'|'+pi+'|'+lot.nb)*(T[1]-T[0]));});}
function amBid(sc,L,lot,who,key,sl,v,t){const it=amItOf(sc,who,key)||{id:key};lot.lead={who,key,sl,v,n:amName(it)};lot.nb++;lot.t0=t!=null?t:amNow();lot.hen=lot.t0+AM_HOI.dem;
  amLog(sc,'tra',[amTen(sc,who),sl+' '+amName(it)]);dbg('amh.tra',{ai:who==='me'?'me':amTen(sc,who),key,sl,v});amPlan(sc,L,lot);}
// chạy đồng hồ tới bây giờ: NPC tới lượt thì trả hoặc bỏ cuộc; hết giờ thì gõ búa. trả true nếu có gì đổi.
function amTick(){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='amhoi')return false;let ch=false,g=0;if(sc.lot&&sc.lot.dung)amDung(sc.lot,amNow());
  while(sc.ph==='lot'&&sc.lot&&g++<200){const L=sc.q[sc.i],lot=sc.lot,now=amNow();
    let pi=null,ta=Infinity;for(const k in lot.plan)if(lot.plan[k]<ta){ta=lot.plan[k];pi=+k;}
    if(pi!=null&&ta<=now&&ta<=lot.hen){delete lot.plan[pi];const b=amNpcBid(sc,L,lot,pi);
      if(b)amBid(sc,L,lot,pi,b.key,b.sl,b.v,ta);else{lot.bo[pi]=1;if(L.own==='me')amNpcDe(sc,L,lot,pi);}ch=true;continue;}
    if(now>=lot.hen){amResolve(sc,L,lot);ch=true;if(sc.lot)sc.lot.t0=now,sc.lot.hen=now+AM_HOI.dem,amPlan(sc,sc.q[sc.i],sc.lot);continue;}
    break;}
  if(ch)saveSoon();return ch;}
function amTua(ms){AM_LECH+=ms;return amTick();}
function amResolve(sc,L,lot){const nm=amName(L.it);const ld=lot.lead;
  if(!ld){amLog(sc,'e',[nm]);}
  else{const pay=amLay(sc,ld.who,ld.key,ld.sl);let item=null;
    if(pay&&pay.length){item=L.own==='me'?amLay(sc,'me',amMineFind(L.it),1):amLay(sc,L.own,'u:'+L.u,1);}
    if(pay&&item&&item.length){amDat(sc,L.own,pay);amDat(sc,ld.who,item);
      amLog(sc,'ban',[amTen(sc,ld.who),nm,ld.sl+' '+ld.n]);dbg(ld.who==='me'?'amh.mua':L.own==='me'?'amh.ban':'amh.npc',{n:L.it.n,key:ld.key,sl:ld.sl,v:ld.v,gia:amFake(L.it)?1:0});}
    else{if(pay)amDat(sc,ld.who,pay);if(item)amDat(sc,L.own,item);amLog(sc,'e',[nm]);}}
  sc.i++;amNext(sc);}

// ---------- Sửa-L câu 48: đồng hồ tạm dừng khi người chơi mở Thương lượng (tối đa AM_HOI.dung ms mỗi món) ----------
// lot.dung={l: mốc đã tính tới}, lot.dungDa: số ms đã dừng trong món này
function amDungCon(lot){return Math.max(0,AM_HOI.dung-(lot.dungDa||0));}
function amDung(lot,now){const D=lot.dung;if(!D)return;const upto=Math.min(now,D.l+amDungCon(lot));const d=upto-D.l;
  if(d>0){lot.hen+=d;lot.t0+=d;for(const k in lot.plan)lot.plan[k]+=d;D.l=upto;lot.dungDa=(lot.dungDa||0)+d;}
  if(amDungCon(lot)<=0){lot.dung=null;dbg('amh.dungHet',{});}}
function amDungMo(lot){if(lot.dung||amDungCon(lot)<=0)return;lot.dung={l:amNow()};dbg('amh.dung',{con:amDungCon(lot)});}
function amDungTat(lot){if(!lot||!lot.dung)return;amDung(lot,amNow());lot.dung=null;}
// ---------- Sửa-L câu 47: NPC không có vật trong danh sách ngươi đặt thì có thể đề nghị đổi bằng vật khác (ngươi tự quyết nhận hay không) ----------
// lot.de[pi]={key,sl,v,n}: đề nghị, v = giá trị theo nhu cầu nơi họp (ngươi tự xét)
function amNpcDe(sc,L,lot,pi){const cap=amCap(sc,L,pi);const need=amNeed(L,lot);if(cap<need)return;let best=null;
  for(const h of amHold(sc,pi)){if(h.cua||lot.muon.some(m=>m.key===h.key))continue;const one=amVal(h.it,0,sc.node);if(one<=0||amFake(h.it))continue;
    const sl=Math.ceil(need/one-1e-9);if(sl>h.sl)continue;const v=one*sl;if(v>cap*1.15)continue;if(!best||v<best.v)best={key:h.key,sl,v,n:h.n};}
  if(!best)return;(lot.de=lot.de||{})[pi]=best;amLog(sc,'de',[amTen(sc,pi),best.sl+' '+best.n]);dbg('amh.de',{ai:amTen(sc,pi),key:best.key,sl:best.sl});}
// ---------- Sửa-L câu 47: danh sách vật người chơi muốn nhận khi đưa đồ ra bán ----------
// lựa chọn: linh thạch các phẩm, đan dược có giá, vật tư cải căn; sc.dua={key,it,v,muon:[{key,sl}]}
function amDatCand(){const L=[];for(let k=0;k<4;k++)L.push('lt:'+k);for(const id in PILL)if(PILL[id].p)L.push('pill:'+id);
  if(typeof CC_VT!=='undefined')for(const v in CC_VT)L.push('cc_'+v);return L;}
function amDatSl0(sc,key,v){const one=amVal({id:key},0,sc.node);return clamp(Math.ceil(Math.max(1,Math.round(v*AM_HOI.gia0))/Math.max(1,one)),1,AM_HOI.datSl);}
// ---------- vật trong túi người chơi ----------
function amMine(){const r=G.run;const L=[];
  r.relics.forEach((x,i)=>L.push({key:'r:'+i,it:{id:'rel',n:x.name,q:x.tier||0}}));
  r.pills.forEach((x,i)=>{if(PILL[x.id])L.push({key:'p:'+i,it:{id:'pill:'+x.id,n:PILL[x.id].n,q:x.q||0}});});
  (r.qitems||[]).forEach((id,i)=>{const it={id,n:(CAT.byId[id]||{}).n||id};if(amBase(it,0)>0)L.push({key:'q:'+i,it});});
  for(const x of L){x.v=amVal(x.it,0);x.n=amName(x.it);x.ic=amIcon(x.it);}
  return L.filter(x=>x.v>0);}
function amMineFind(it){const r=G.run;const id=String(it.id);
  if(id==='rel'){const i=r.relics.findIndex(x=>x.name===it.n&&(x.tier||0)===(it.q||0));return i<0?null:'r:'+i;}
  if(id.startsWith('pill:'))return r.pills.some(x=>x.id===id.slice(5))?id:null;
  return (r.qitems||[]).includes(id)?id:null;}
// lấy món khỏi túi người chơi theo vị trí (r:/p:/q:), trả về bản ghi để sang túi người khác
function amTakeMine(key){const r=G.run;const [k,s]=String(key).split(':');const i=+s;
  if(k==='r'){const rel=r.relics[i];if(!rel)return null;r.relics.splice(i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();return {u:amUid(),id:'rel',n:rel.name,q:rel.tier||0,rel};}
  if(k==='p'){const p=r.pills[i];if(!p)return null;r.pills.splice(i,1);return {u:amUid(),id:'pill:'+p.id,n:PILL[p.id].n,q:p.q||0};}
  if(k==='q'){const id=(r.qitems||[])[i];if(id==null)return null;r.qitems.splice(i,1);return {u:amUid(),id,n:(CAT.byId[id]||{}).n||id};}
  return null;}
function amGiveMe(it){const r=G.run;const id=String(it.id);
  if(id==='rel'){r.relics.push(it.rel||amRelic(k=>wHash(it.u+'|'+k),it.q||0));return;}
  if(id.startsWith('pill:')){r.pills.push({id:id.slice(5),q:it.q||0});return;}
  const D=ccDoParse(id);if(D&&(D.k==='g'||D.k==='d')){ccDoAdd(D.p,D.k==='g'?1:0,'amhoi');return;}
  if(id.startsWith('cc_')){ccVtAdd(id.slice(3),1,'amhoi');if(r.cc&&typeof ccAuto==='function')ccAuto();return;}
  (r.qitems=r.qitems||[]).push(id);}
function amRoom(){return bagCap()-bagStacks()>0;}
// ---------- hành động của người chơi ----------
function amMeBid(sc,L,lot,key,sl){if(lot.bo.me||L.own==='me'||(lot.lead&&lot.lead.who==='me'))return false;if(!amRoom())return false;
  sl=Math.floor(sl);if(!(sl>=1)||amHas(sc,'me',key)<sl)return false;const v=amBidVal(sc,L,lot,'me',key,sl);
  if(lot.muon.every(m=>m.key!==key)&&amHop(sc,lot,key)<AM_HOI.hopMin)return false;
  if(v<amNeed(L,lot)){amLog(sc,'kemHon',[sl+' '+amName(amItOf(sc,'me',key)||{id:key})]);return 'kem';}
  amBid(sc,L,lot,'me',key,sl,v);return true;}
function amAct(a){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='amhoi')return false;const s=String(a),j=s.indexOf('='),k=j<0?s:s.slice(0,j),arg=j<0?'':s.slice(j+1);let ok=false;
  if(k==='roi'){r.scene=null;dbg('amh.roi',{});saveSoon();return true;}
  amTick();const L=sc.q[sc.i],lot=sc.lot;
  if(sc.ph==='chon'){
    if(k==='khong'){sc.meDone=1;ok=true;}
    else if(k==='chon'){const M=amMine().find(x=>x.key===arg);if(M){sc.dua={key:M.key,it:M.it,v:M.v,muon:[]};sc.ph='dat';if(saveSoon)saveSoon();return true;}}
    if(ok)amNext(sc);}
  else if(sc.ph==='dat'&&sc.dua){const D=sc.dua;
    if(k==='dthem'){if(D.muon.length<AM_HOI.datN&&!D.muon.some(m=>m.key===arg)&&amDatCand().includes(arg)){D.muon.push({key:arg,sl:amDatSl0(sc,arg,D.v)});ok=true;}}
    else if(k==='dsl'){const [i,d]=arg.split(',').map(Number);const m=D.muon[i];if(m){m.sl=clamp(m.sl+(d||0),1,AM_HOI.datSl);ok=true;}}
    else if(k==='dxoa'){if(D.muon[+arg]){D.muon.splice(+arg,1);ok=true;}}
    else if(k==='dthoi'){sc.dua=null;sc.ph='chon';ok=true;}
    else if(k==='dgo'){const M=amMine().find(x=>x.key===D.key);if(M){sc.meDone=1;const lo={own:'me',u:'me',it:M.it,v:M.v,muon:D.muon.map(m=>({key:m.key,sl:m.sl}))};const rest=sc.q.slice(sc.i).concat([lo]).sort((x,y)=>x.v-y.v);sc.q=sc.q.slice(0,sc.i).concat(rest);
      sc.dua=null;dbg('amh.dua',{n:M.n,v:M.v,muon:lo.muon.map(m=>m.key+'×'+m.sl).join(',')});amNext(sc);ok=true;}}}
  else if(sc.ph==='lot'&&L&&lot){
    if(k==='tra'){const m=lot.muon[+arg];if(m){const sl=amSlCan(sc,L,lot,'me',m.key);ok=amMeBid(sc,L,lot,m.key,sl)===true;if(ok){sc.tl=null;amDungTat(lot);}}}
    else if(k==='tl'){if(arg&&L.own!=='me')amDungMo(lot);else amDungTat(lot);sc.tl=arg?{key:arg,sl:Math.min(amHas(sc,'me',arg),Math.max(1,isFinite(amSlCan(sc,L,lot,'me',arg))?amSlCan(sc,L,lot,'me',arg):1))}:null;ok=true;}
    else if(k==='tlsl'&&sc.tl){sc.tl.sl=clamp(sc.tl.sl+(+arg||0),1,Math.max(1,amHas(sc,'me',sc.tl.key)));ok=true;}
    else if(k==='tlgo'&&sc.tl){ok=amMeBid(sc,L,lot,sc.tl.key,sc.tl.sl)===true;if(ok){sc.tl=null;amDungTat(lot);}}
    else if(k==='nhan'&&L.own==='me'&&lot.de&&lot.de[arg]){const d=lot.de[arg];delete lot.de[arg];if(d.v>=amNeed(L,lot)&&amHas(sc,+arg,d.key)>=d.sl){amBid(sc,L,lot,+arg,d.key,d.sl,d.v);dbg('amh.nhanDe',{key:d.key,sl:d.sl});ok=true;}}
    else if(k==='bo'&&L.own!=='me'&&!(lot.lead&&lot.lead.who==='me')){lot.bo.me=1;sc.tl=null;amDungTat(lot);amLog(sc,'boCuoc',[amTen(sc,'me')]);
      // ngồi xem tới khi gõ búa (tua nhanh phần còn lại của món này)
      const i0=sc.i;let g=0;while(sc.ph==='lot'&&sc.i===i0&&g++<400){const t=Math.min(...Object.values(sc.lot.plan),sc.lot.hen);AM_LECH+=Math.max(0,t-amNow())+1;amTick();}ok=true;}
    else if(k==='go'&&L.own==='me'&&lot.lead){amResolve(sc,L,lot);ok=true;}
    else if(k==='rut'&&L.own==='me'){amLog(sc,'rut',[amName(L.it)]);sc.i++;amNext(sc);ok=true;}}
  else if(sc.ph==='xong'&&k==='xong'){r.scene=null;ok=true;}
  if(ok)saveSoon();return ok;}
// ---------- dữ liệu cho hộp thoại ----------
function amView(){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='amhoi')return null;const L=sc.q[sc.i],lot=sc.lot;
  const V={ph:sc.ph,luot:contentText('amh.luot',[Math.min(sc.i+1,sc.q.length),sc.q.length]),log:sc.log.slice(-6),ltTxt:ltTxt(),ban:amBan(sc),btn:[],mine:[],muon:[],tl:null,con:null,de:[],dat:null,dung:null};
  const btn=(a,l,no)=>V.btn.push({a,l,no:no||''});
  if(L&&lot&&sc.ph==='lot'){const me=L.own==='me',dan=lot.lead&&lot.lead.who==='me',bo=!!lot.bo.me;
    V.con=Math.max(0,Math.ceil((lot.hen-amNow())/1000));
    V.lo={ic:amIcon(L.it),n:amName(L.it),ai:contentText('amh.nguoiBan',[amTen(sc,L.own)]),nghi:L.nghi?contentText('amh.nghi'):'',gia:amFmt(L.v),
      dan:lot.lead?contentText('amh.dan',[amTen(sc,lot.lead.who),lot.lead.sl+' '+lot.lead.n]):contentText('amh.chuaAi')};
    const no0=me?'':bo?contentText('amh.daBo'):dan?contentText('amh.dangDan'):!amRoom()?contentText('amh.day'):'';
    V.muon=lot.muon.map((m,i)=>{const sl=me?m.sl:amSlCan(sc,L,lot,'me',m.key);return {a:'tra='+i,ic:m.ic,l:contentText('amh.traMon',[isFinite(sl)?sl:m.sl,m.n]),
      no:me?'-':no0||(amHas(sc,'me',m.key)<sl?contentText('amh.khongDu',[amHas(sc,'me',m.key)]):'')};});
    if(!me&&!bo&&!dan){
      if(sc.tl){const h=amHold(sc,'me').find(x=>x.key===sc.tl.key);const v=h?amBidVal(sc,L,lot,'me',sc.tl.key,sc.tl.sl):0;const hop=amHop(sc,lot,sc.tl.key);
        V.tl={n:h?h.n:'?',ic:h?h.ic:'',sl:sc.tl.sl,max:h?h.sl:0,gia:amFmt(v),can:amFmt(amNeed(L,lot)),no:no0||(hop<AM_HOI.hopMin?contentText('amh.khongHop'):v<amNeed(L,lot)?contentText('amh.chuaDu'):'')};}
      else V.mine=amHold(sc,'me').map(h=>({key:h.key,ic:h.ic,n:h.n+' ×'+h.sl,a:'tl='+h.key,no:amHop(sc,lot,h.key)<AM_HOI.hopMin?contentText('amh.khongHop'):''}));}
    if(lot.dung)V.dung=Math.ceil(amDungCon(lot)/1000);
    if(me&&lot.de)V.de=Object.keys(lot.de).map(pi=>{const d=lot.de[pi];return {a:'nhan='+pi,l:contentText('amh.nhanDe',[amTen(sc,+pi),d.sl+' '+d.n]),gia:amFmt(d.v),no:d.v<amNeed(L,lot)?contentText('amh.chuaDu'):''};});
    if(me){if(lot.lead)btn('go',contentText('amh.goBan',[amTen(sc,lot.lead.who),lot.lead.sl+' '+lot.lead.n]));btn('rut',contentText('amh.rut'));}
    else if(!bo&&!dan)btn('bo',contentText('amh.boCuoc'));}
  if(sc.ph==='chon'){V.hoi=contentText('amh.luotMe');V.mine=amMine().map(M=>({key:M.key,n:M.n,ic:M.ic,a:'chon='+M.key,no:''}));btn('khong',contentText('amh.khongDua'));}
  if(sc.ph==='dat'&&sc.dua){const D=sc.dua;V.hoi=contentText('amh.datHoi',[amName(D.it),amFmt(D.v)]);
    V.dat={n:amName(D.it),ic:amIcon(D.it),list:D.muon.map((m,i)=>({i,n:amName({id:m.key}),ic:amIcon({id:m.key}),sl:m.sl,gia:amFmt(amVal({id:m.key},0,sc.node)*m.sl)})),
      cand:amDatCand().filter(k=>!D.muon.some(m=>m.key===k)).map(k=>({a:'dthem='+k,n:amName({id:k}),ic:amIcon({id:k}),no:D.muon.length>=AM_HOI.datN?'-':''}))};
    btn('dgo',contentText(D.muon.length?'amh.datGo':'amh.datGoLt'));btn('dthoi',contentText('amh.datThoi'));}
  if(sc.ph==='xong')btn('xong',contentText('amh.roi'));
  return V;}
// ---------- nối vào hộp U Minh Ám Hội cũ ----------
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='amhoi')return _vo.apply(this,arguments);const left=amLeft(n);
  return [{id:'vao',l:contentText('amh.vao'),d:contentText('amh.vaoD'),h:1,st:0,no:left?'':contentText('amh.het')}];};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='amhoi')return _vd.apply(this,arguments);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place'||id!=='vao')return false;
  const n=nodeById(sc.id);if(!amOpen(n))return false;return amStart(n);};}
