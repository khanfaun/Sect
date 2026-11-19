// Sửa-I câu 39: U Minh Ám Hội làm lại — buổi họp kín, mỗi người đưa VẬT ĐANG CÓ ra đấu giá / đổi vật.
// Bảng AM_HOI: content/rules/am-hoi.js · chữ: content/text/am-hoi.json (amh.*).
// Món trong túi NPC / khách: {u,id,n,q?,rel?} — id 'rel' (pháp bảo, rel là vật), 'pill:<id>' (đan), còn lại là mã vật trong túi (qitems: ccd_/ccg_/cct_, cc_<vật tư>…).
// Không có món nào bị lấy khỏi túi cho tới khi bán xong (rời bàn giữa chừng không mất đồ). Đồ bán đi rời túi người bán, sang túi người mua.
// G.run.scene={type:'amhoi',node,seed,ppl:[{k:'vai',ma}|{k:'khach',ten,tui,cua}],q:[lô],i,meAt,ph:'lot'|'chon'|'ban'|'doi'|'xong',lot,log}
const AMV=[1,100,10000,1000000]; // giá trị một viên linh thạch mỗi phẩm, quy ra Hạ phẩm
function amH(sc,k){return wHash((sc?sc.seed:'')+'|'+k);}
let AM_W=null; // thế giới đang lập túi (vaiInit có thể chạy trước khi G.meta.world được gán)
function amUid(){const w=AM_W||(G.meta&&G.meta.world);if(!w)return 'u'+Math.floor(Math.random()*1e9);w.amU=(w.amU||0)+1;return 'u'+w.amU;}
function amFmt(v){v=Math.max(0,Math.round(v));const L=[];for(let k=3;k>=0;k--){const x=Math.floor(v/AMV[k]);if(x){L.push(fmtN(x)+' '+ltName(k).replace(' phẩm',''));v-=x*AMV[k];}}return L.length?L.join(' · '):'0 '+ltName(0).replace(' phẩm','');}
function amLtTot(){let s=0;for(let k=0;k<4;k++)s+=ltGet(k)*AMV[k];return s;}
function amPay(v){if(amLtTot()<v)return false;let rem=v;for(let k=0;k<4&&rem>0;k++){const t=Math.min(ltGet(k),Math.ceil(rem/AMV[k]));if(t){ltAdd(k,-t,'amhoi');rem-=t*AMV[k];}}if(rem<0)ltAdd(0,-rem,'amhoi');return true;}
function amGet(v){v=Math.round(v);for(let k=3;k>=0;k--){const x=Math.floor(v/AMV[k]);if(x){ltAdd(k,x,'amhoi');v-=x*AMV[k];}}}
// ---------- giá trị một món (Hạ phẩm) ----------
function amVal(it,that){if(!it)return 0;const id=String(it.id);
  if(id==='rel')return Math.round(AM_HOI.relic*Math.pow(3,clamp(it.q||0,0,6)));
  if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?Math.max(1,Math.round((P.p||10)*(1+(it.q||0)))):0;}
  const D=typeof ccDoParse==='function'?ccDoParse(id):null;
  if(D){if(D.k==='x')return 0;if(D.k==='g'&&that)return 0;return Math.round(CC_DO[D.p].st*(D.k==='t'?1.1:1));}
  if(id.startsWith('cc_')&&typeof CC_VT!=='undefined'){const V=CC_VT[id.slice(3)];if(V)return Math.round((V.st||Math.max(5,Math.round((V.gia||0)/100)))*CC_CFG.amX);}
  const C=CAT.byId&&CAT.byId[id];return C?Math.max(1,Math.round(C.p||20)):0;}
function amFake(it){const D=typeof ccDoParse==='function'?ccDoParse(it&&it.id):null;return !!(D&&(D.k==='g'||D.k==='x'));}
function amIcon(it){const id=String(it.id);if(id==='rel')return '🏺';if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?P.i:'💊';}const C=CAT.byId&&CAT.byId[id];return (C&&C.i)||'📦';}
function amName(it){const id=String(it.id);if(id==='rel')return it.n+' ('+GRADE[clamp(it.q||0,0,4)]+')';if(id.startsWith('pill:')){const P=PILL[id.slice(5)];return P?P.n:it.n;}const C=CAT.byId&&CAT.byId[id];return (C&&C.n)||it.n||id;}
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
// ---------- người ngồi bàn ----------
function amTui(sc,pi){const p=sc.ppl[pi];if(!p)return [];return p.k==='vai'?vaiTui(p.ma):p.tui;}
function amCua(sc,pi,d){const p=sc.ppl[pi];if(!p)return 0;const o=p.k==='vai'?(vaiInit(W())[p.ma]||{}):p;if(d)o.cua=Math.max(0,(o.cua||0)+Math.round(d));return o.cua||0;}
function amTen(sc,pi){if(pi==='me')return contentText('amh.me');const p=sc.ppl[pi];if(!p)return '?';if(p.k==='vai'){const v=vaiNow(p.ma);return v&&v.song?v.ten+' ('+v.vai+')':contentText('amh.khach');}return p.ten;}
function amTuiDay(sc,pi){const p=sc.ppl[pi];return p&&p.k==='vai'?vaiTui(p.ma).length>=VAI_TUI_MAX:(amTui(sc,pi).length>=AM_HOI.toiDa+4);}
function amStart(n){const r=G.run;if(!amOpen(n)||!amLeft(n))return false;const w=W(),m=ncMonth();const seed='am|'+n.id+'|'+m+'|'+(w.seed||0);const h=k=>wHash(seed+'|'+k);
  const ppl=[];const V=vaiInit(w);
  const cand=Object.keys(VAI_NP).filter(ma=>VAI_NP[ma].tu>=1&&V[ma]&&V[ma].song&&!VAI_NP[ma].bat&&vaiTui(ma).length).sort((a,b)=>h('v'+a)-h('v'+b)).slice(0,AM_HOI.vai);
  for(const ma of cand)ppl.push({k:'vai',ma});
  const K=AM_HOI.khach;const nk=K[0]+Math.floor(h('nk')*(K[1]-K[0]+1));const MAT=contentText('amh.mat').split('|');const vt=typeof ccAmVt==='function'?ccAmVt(n):null;
  for(let j=0;j<nk;j++){const x=k=>h('k'+j+'|'+k);const A=AM_HOI.khachTui;const ni=A[0]+Math.floor(x(0)*(A[1]-A[0]+1));
    const C=AM_HOI.khachCua;const cua=Math.round((C[0]+x(1)*(C[1]-C[0]))*SC[rT()]/SC[0]);
    ppl.push({k:'khach',ten:contentText('amh.khachTen',[MAT[(Math.floor(h('mat')*MAT.length)+j)%MAT.length]]),cua,tui:amTuiLap(x,ni,clamp(rT(),0,4),{fake:x(2)<AM_HOI.gia,that:1,vt:j===0?vt:null})});}
  // mỗi người đưa một món (khách đem món vật tư cải căn ra trước tiên); vật quý về cuối buổi
  const q=[];ppl.forEach((p,pi)=>{const T=amTui(sc0(ppl),pi);if(!T.length)return;let it=T.find(x=>String(x.id).startsWith('cc_'))||(p.k==='khach'&&T.find(x=>/^ccg_/.test(x.id)))||T[Math.floor(h('o'+pi)*T.length)%T.length];
    q.push({own:pi,u:it.u,it:JSON.parse(JSON.stringify(it)),v:amVal(it,0)});});
  q.sort((a,b)=>a.v-b.v);
  if(!w.amhoi)w.amhoi={};if(!w.amhoi[n.id]||w.amhoi[n.id].m!==m)w.amhoi[n.id]={m,n:0};w.amhoi[n.id].n++;
  const sc={type:'amhoi',node:n.id,seed,ppl,q,i:0,meAt:Math.floor(q.length/2),meDone:0,ph:'',lot:null,log:[contentText('amh.ngoi',[ppl.map((p,i)=>amTen({ppl},i)).join(', ')])]};
  r.scene=sc;amNext(sc);dbg('amh.mo',{n:n.id,ppl:ppl.length,lo:q.length,vai:cand.length});return true;}
function sc0(ppl){return {ppl};}
function amLog(sc,k,a){sc.log.push(contentText('amh.log.'+k,a));if(sc.log.length>8)sc.log.shift();}
function amStep(p){return Math.max(1,Math.round(p*AM_HOI.buoc));}
// người trả giá cho một lô (trừ người bán): mức chịu trả = giá trị họ thấy × nhu cầu, không quá của cải
function amWills(sc,L){const out=[];sc.ppl.forEach((p,pi)=>{if(pi===L.own)return;const x=amH(sc,'n'+pi+'|'+L.u);const N=AM_HOI.nhu;
  const fake=amFake(L.it)&&amH(sc,'b'+pi+'|'+L.u)<AM_HOI.bietGia;const v=fake?0:amVal(L.it,0);let w=Math.round(v*(N[0]+x*(N[1]-N[0])));
  if(amTuiDay(sc,pi))w=0;out.push({pi,w:Math.min(w,amCua(sc,pi)),wv:w});});return out.sort((a,b)=>b.w-a.w);}
function amNext(sc){sc.lot=null;
  if(!sc.meDone&&sc.i>=sc.meAt){sc.ph='chon';return;}
  if(sc.i>=sc.q.length){sc.ph='xong';sc.log.push(contentText('amh.xong'));dbg('amh.tan',{});return;}
  const L=sc.q[sc.i];const T=L.own==='me'?null:amTui(sc,L.own);if(T?!T.some(x=>x.u===L.u):!amMineFind(L.it)){sc.i++;return amNext(sc);}
  const W2=amWills(sc,L);const p0=Math.max(1,Math.round(L.v*AM_HOI.gia0));
  const lot={i:sc.i,p:p0,lead:null,pay:null,ep:0};
  if(W2[0]&&W2[0].w>=p0){lot.lead=W2[0].pi;lot.p=Math.max(p0,Math.min(W2[0].w,W2[1]&&W2[1].w>=p0?W2[1].w+amStep(W2[1].w):p0));amLog(sc,'tra',[amTen(sc,lot.lead),amFmt(lot.p)]);}
  sc.lot=lot;
  if(L.own==='me'){sc.ph='ban';const o=amDoiOffer(sc,L,W2);lot.doi=o;}else sc.ph='lot';
  L.nghi=amFake(L.it)&&L.own!=='me'&&amH(sc,'nghi|'+L.u)<(typeof ccNhanP==='function'?ccNhanP():0)?1:0;}
// lời đổi vật cho món của người chơi: một người trên bàn đưa một món trong túi họ, đáng chừng giá đang có
function amDoiOffer(sc,L,W2){for(const o of W2){if(o.wv<=0)continue;const T=amTui(sc,o.pi);const c=T.filter(x=>x.u!==undefined&&amVal(x,1)>0&&amVal(x,1)<=o.wv*1.05&&amVal(x,1)>=L.v*0.5).sort((a,b)=>amVal(b,1)-amVal(a,1))[0];
  if(c)return {pi:o.pi,u:c.u};}return null;}
// ---------- vật trong túi người chơi ----------
function amMine(){const r=G.run;const L=[];
  r.relics.forEach((x,i)=>L.push({key:'r:'+i,it:{id:'rel',n:x.name,q:x.tier||0}}));
  r.pills.forEach((x,i)=>{if(PILL[x.id])L.push({key:'p:'+i,it:{id:'pill:'+x.id,n:PILL[x.id].n,q:x.q||0}});});
  (r.qitems||[]).forEach((id,i)=>{const it={id,n:(CAT.byId[id]||{}).n||id};if(amVal(it,0)>0)L.push({key:'q:'+i,it});});
  for(const x of L){x.v=amVal(x.it,0);x.n=amName(x.it);x.ic=amIcon(x.it);}
  return L.filter(x=>x.v>0);}
function amMineFind(it){const r=G.run;const id=String(it.id);
  if(id==='rel'){const i=r.relics.findIndex(x=>x.name===it.n&&(x.tier||0)===(it.q||0));return i<0?null:'r:'+i;}
  if(id.startsWith('pill:')){const i=r.pills.findIndex(x=>x.id===id.slice(5));return i<0?null:'p:'+i;}
  const i=(r.qitems||[]).indexOf(id);return i<0?null:'q:'+i;}
// lấy món khỏi túi người chơi, trả về bản ghi để sang túi người khác
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
function amMove(sc,from,to,u){const T=amTui(sc,from);const j=T.findIndex(x=>x.u===u);if(j<0)return null;const it=T.splice(j,1)[0];
  if(to==='me')amGiveMe(it);else{const T2=amTui(sc,to);if(sc.ppl[to].k==='vai'){if(!vaiTuiAdd(sc.ppl[to].ma,it))T.push(it);}else T2.push(it);}return it;}
// ---------- hành động ----------
function amAct(a){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='amhoi')return false;const [k,arg]=String(a).split('=');const L=sc.q[sc.i],lot=sc.lot;let ok=false;
  if(k==='roi'){r.scene=null;dbg('amh.roi',{});saveSoon();return true;}
  if(sc.ph==='chon'){
    if(k==='khong'){sc.meDone=1;ok=true;}
    else if(k==='chon'){const M=amMine().find(x=>x.key===arg);if(M){sc.meDone=1;const lo={own:'me',u:'me',it:M.it,v:M.v};const rest=sc.q.slice(sc.i).concat([lo]).sort((x,y)=>x.v-y.v);sc.q=sc.q.slice(0,sc.i).concat(rest);ok=true;dbg('amh.dua',{n:M.n,v:M.v});}}
    if(ok)amNext(sc);}
  else if(sc.ph==='lot'&&L&&lot){
    if(k==='tra'){const np=lot.lead==null?lot.p:lot.p+amStep(lot.p);if(amLtTot()<np||!amRoom())return false;lot.p=np;lot.lead='me';lot.pay=null;amLog(sc,'tra',[amTen(sc,'me'),amFmt(np)]);amCounter(sc,L,lot);ok=true;}
    else if(k==='doi'){sc.ph='doi';ok=true;}
    else if(k==='bo'){amResolve(sc,L,lot);ok=true;}}
  else if(sc.ph==='doi'&&L&&lot){
    if(k==='huy'){sc.ph='lot';ok=true;}
    else if(k==='vat'){const M=amMine().find(x=>x.key===arg);const need=lot.lead==null?lot.p:lot.p+amStep(lot.p);const sv=M&&amSellerVal(sc,L,M.it);
      if(M&&sv>=need&&amRoom()){lot.lead='me';lot.p=sv;lot.pay={it:M.it};amLog(sc,'doi',[amTen(sc,'me'),M.n]);sc.ph='lot';amCounter(sc,L,lot);ok=true;}}}
  else if(sc.ph==='ban'&&L&&lot){
    if(k==='ban'&&lot.lead!=null){const key=amMineFind(L.it);const it=key&&amTakeMine(key);if(it){const T=amTui(sc,lot.lead);if(sc.ppl[lot.lead].k==='vai')vaiTuiAdd(sc.ppl[lot.lead].ma,it);else T.push(it);amCua(sc,lot.lead,-lot.p);amGet(lot.p);
      amLog(sc,'meBan',[amName(L.it),amTen(sc,lot.lead),amFmt(lot.p)]);dbg('amh.ban',{n:L.it.n,p:lot.p,ai:amTen(sc,lot.lead)});}sc.i++;amNext(sc);ok=true;}
    else if(k==='doiNhan'&&lot.doi){const key=amMineFind(L.it);const o=lot.doi;const T=amTui(sc,o.pi);const c=T.find(x=>x.u===o.u);
      if(key&&c){const it=amTakeMine(key);T.splice(T.indexOf(c),1);if(sc.ppl[o.pi].k==='vai')vaiTuiAdd(sc.ppl[o.pi].ma,it);else T.push(it);amGiveMe(c);
        amLog(sc,'doiXong',[amTen(sc,'me'),amName(c),amName(L.it)]);dbg('amh.doiNhan',{lay:c.n,dua:L.it.n});}sc.i++;amNext(sc);ok=true;}
    else if(k==='them'&&!lot.ep&&lot.lead!=null){const W2=amWills(sc,L);const np=lot.p+amStep(lot.p);const b=W2.find(o=>o.w>=np);
      if(b){lot.p=np;lot.lead=b.pi;amLog(sc,'doiThemOk',[amTen(sc,b.pi),amFmt(np)]);}else{lot.ep=1;amLog(sc,'doiThemNo',[]);}ok=true;}
    else if(k==='rut'){amLog(sc,'rut',[amName(L.it)]);sc.i++;amNext(sc);ok=true;}}
  else if(sc.ph==='xong'&&k==='xong'){r.scene=null;ok=true;}
  if(ok)saveSoon();return ok;}
function amSellerVal(sc,L,it){const fake=amFake(it)&&amH(sc,'sb|'+L.u+'|'+it.id)<AM_HOI.bietGia;return fake?0:amVal(it,0);}
// người trên bàn trả lại khi người chơi vừa trả
function amCounter(sc,L,lot){const W2=amWills(sc,L);const b=W2[0];if(!b)return;const np=lot.p+amStep(lot.p);if(b.w>=np){lot.p=np;lot.lead=b.pi;lot.pay=null;amLog(sc,'tra',[amTen(sc,b.pi),amFmt(np)]);}}
function amResolve(sc,L,lot){const nm=amName(L.it);
  if(lot.lead==null){amLog(sc,'e',[nm]);}
  else if(lot.lead==='me'){
    if(lot.pay){const key=amMineFind(lot.pay.it);const it=key&&amTakeMine(key);if(it){const T=amTui(sc,L.own);if(sc.ppl[L.own].k==='vai')vaiTuiAdd(sc.ppl[L.own].ma,it);else T.push(it);amMove(sc,L.own,'me',L.u);amLog(sc,'doiXong',[amTen(sc,'me'),nm,amName(it)]);dbg('amh.doi',{lay:L.it.n,dua:it.n});}}
    else if(amPay(lot.p)){amCua(sc,L.own,lot.p);amMove(sc,L.own,'me',L.u);amLog(sc,'mua',[nm,amFmt(lot.p)]);dbg('amh.mua',{n:L.it.n,p:lot.p,gia:amFake(L.it)?1:0});}}
  else{if(amMove(sc,L.own,lot.lead,L.u)){amCua(sc,lot.lead,-lot.p);amCua(sc,L.own,lot.p);amLog(sc,'ban',[amTen(sc,lot.lead),nm,amFmt(lot.p)]);dbg('amh.npc',{n:L.it.n,p:lot.p});}}
  sc.i++;amNext(sc);}
// ---------- dữ liệu cho hộp thoại ----------
function amView(){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='amhoi')return null;const L=sc.q[sc.i],lot=sc.lot;
  const V={ph:sc.ph,luot:contentText('amh.luot',[Math.min(sc.i+1,sc.q.length),sc.q.length]),log:sc.log.slice(-6),ltTxt:ltTxt(),btn:[],mine:[]};
  if(L&&lot&&(sc.ph==='lot'||sc.ph==='doi'||sc.ph==='ban')){V.lo={ic:amIcon(L.it),n:amName(L.it),ai:contentText('amh.nguoiBan',[amTen(sc,L.own)]),nghi:L.nghi?contentText('amh.nghi'):'',
    gia:amFmt(lot.p),dan:lot.lead==null?contentText('amh.chuaAi'):contentText('amh.dan',[amTen(sc,lot.lead)])};}
  const btn=(a,l,no)=>V.btn.push({a,l,no:no||''});
  if(sc.ph==='lot'){const np=lot.lead==null?lot.p:lot.p+amStep(lot.p);
    if(lot.lead!=='me')btn('tra',contentText('amh.tra',[amFmt(np)]),!amRoom()?contentText('amh.day'):amLtTot()<np?contentText('amh.thieu'):'');
    if(lot.lead!=='me')btn('doi',contentText('amh.doi'),!amRoom()?contentText('amh.day'):'');
    btn('bo',lot.lead==='me'?contentText('amh.go'):contentText('amh.boQua'));}
  if(sc.ph==='doi'){const need=lot.lead==null?lot.p:lot.p+amStep(lot.p);V.mine=amMine().map(M=>({key:M.key,n:M.n,ic:M.ic,a:'vat='+M.key,no:amSellerVal(sc,L,M.it)<need?contentText('amh.thieu'):''}));btn('huy',contentText('amh.boQua'));}
  if(sc.ph==='chon'){V.hoi=contentText('amh.luotMe');V.mine=amMine().map(M=>({key:M.key,n:M.n,ic:M.ic,a:'chon='+M.key,no:''}));btn('khong',contentText('amh.khongDua'));}
  if(sc.ph==='ban'){if(lot.lead!=null){btn('ban',contentText('amh.ban',[amTen(sc,lot.lead),amFmt(lot.p)]));btn('them',contentText('amh.doiThem'),lot.ep?contentText('amh.log.doiThemNo'):'');}else V.hoi=contentText('amh.khongAiMua');
    if(lot.doi){const c=amTui(sc,lot.doi.pi).find(x=>x.u===lot.doi.u);if(c)btn('doiNhan',contentText('amh.doiNhan',[amTen(sc,lot.doi.pi),amName(c)]));}btn('rut',contentText('amh.rut'));}
  if(sc.ph==='xong')btn('xong',contentText('amh.roi'));
  return V;}
// ---------- nối vào hộp U Minh Ám Hội cũ ----------
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='amhoi')return _vo.apply(this,arguments);const left=amLeft(n);
  return [{id:'vao',l:contentText('amh.vao'),d:contentText('amh.vaoD'),h:1,st:0,no:left?'':contentText('amh.het')}];};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='amhoi')return _vd.apply(this,arguments);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place'||id!=='vao')return false;
  const n=nodeById(sc.id);if(!amOpen(n))return false;return amStart(n);};}
