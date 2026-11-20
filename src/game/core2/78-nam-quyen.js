// ---------------- NẮM QUYỀN THÀNH TRẤN · NPC HỎI MUA CÔNG TRÌNH · TỊCH BIÊN (bảng NQ2: content/rules/nam-quyen.js) ----------------
// n.quyen = {k:'ta', t, cach:'quan'|'chu'|'chiem'|'mua', fa0} — chỉ thế giới mới (n.fa có chủ).
function nqTa(n){return !!(n&&n.quyen&&n.quyen.k==='ta');}
function nqPham(n){return n&&(n.type==='tran'||n.type==='thanh');}
function nqTu(n){return n&&(n.type==='tutran'||n.type==='tuthanh');}
function nqCo(n){return !!(n&&W()&&W().v2&&n.fa&&(nqPham(n)||nqTu(n))&&n.state!=='ruin');}
function nqGia(n){return Math.round(datGoc(n)*NQ2.giaX);}
function nqGiaLt(n,x){return Math.ceil(nqGia(n)*(x||1)/DAT.mua.lt);}
function nqCam(n){const r=G.run;return ((r.nqCam||{})[n.id]||0)>W().t;}
// cống hiến với Hoàng quốc: đứng ở thành trấn phàm của nước nào thì sổ cống hiến là của nước đó
{const _ck=chKey;chKey=function(){const k=_ck.apply(this,arguments);if(k)return k;const r=G.run;const n=r&&nodeById(r.at);if(n&&nqPham(n)&&n.fa&&W().v2&&!String(n.fa).startsWith('tong:')&&faAlive(n.fa))return 'fa:'+n.fa;return k;};} // nơi neo của thế lực riêng / tông môn ưu tiên
function nqDanh(n){return typeof danhOf==='function'?danhOf(n):0;}
function nqOpts(n){const r=G.run,L=[];if(!nqCo(n))return L;const chu=chuTen(n.fa);
  if(nqTa(n)){L.push({id:'xem',l:contentText('nq2.daNam',[n.name]),d:contentText('nq2.daNamD'),h:0,st:0,g:{},no:''});return L;}
  if(nqPham(n)){const can=NQ2.cong[n.type]||NQ2.cong.tran,co=chGet('fa:'+n.fa);
    L.push({id:'quan',l:contentText('nq2.quan',[chu]),d:contentText('nq2.quanD',[chu,n.name,co,can]),h:24,st:0,g:{txt:contentText('nq2.gNam')},
      no:co<can?contentText('nq2.thieuCong',[co,can]):nqDanh(n)<NQ2.danhMin?contentText('nq2.danhXau'):''});return L;}
  // tu sĩ
  if((r.chuFa||[]).includes(n.fa))L.push({id:'chu',l:contentText('nq2.chu',[chu]),d:contentText('nq2.chuD',[chu,n.name]),h:24,st:0,g:{txt:contentText('nq2.gNam')},no:''});
  L.push({id:'chiem',l:contentText('nq2.chiem',[chu]),d:contentText('nq2.chiemD',[chu,n.name]),h:6,st:0,g:{txt:contentText('nq2.gNam')},no:isPham()?contentText('dat.canTu'):''});
  NQ2.mac.forEach(([x,p],k)=>{const g=nqGiaLt(n,x);L.push({id:'mua:'+k,l:contentText(k?'nq2.macCa':'nq2.mua',[chu,Math.round(x*100)]),d:contentText('nq2.muaD',[chu,n.name,g,Math.round(p*100)]),h:12,st:g,g:{txt:contentText('nq2.gNam')},
    no:nqCam(n)?contentText('nq2.cam'):(r.st||0)<g?contentText('dat.thieuLt'):''});});
  return L;}
function nqLay(n,cach){const r=G.run;n.quyen={k:'ta',t:W().t,cach,fa0:n.fa,kiep:r.kiep||0};log(contentText('nq2.xong',[n.name]));note(contentText('nq2.xong',[n.name]),'up');dbg('nq2.nam',{id:n.id,cach});}
function nqDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=nqOpts(n).find(x=>x.id===id);if(!o||o.no||id==='xem')return false;
  const msg=[];
  if(id==='quan'){advanceTime(24);if(!G.run)return true;nqLay(n,'quan');msg.push(contentText('nq2.quanXong',[chuTen(n.fa),n.name]));}
  else if(id==='chu'){advanceTime(24);if(!G.run)return true;nqLay(n,'chu');msg.push(contentText('nq2.xong',[n.name]));}
  else if(id==='chiem'){advanceTime(6);if(!G.run)return true;dbg('nq2.chiemDanh',{id:n.id});startCombat({elite:true,cnt:NQ2.chiemCnt},{kind:'node',nqChiem:n.id});return true;}
  else if(id.startsWith('mua:')){const k=+id.slice(4),[x,p]=NQ2.mac[k],g=nqGiaLt(n,x);advanceTime(12);if(!G.run)return true;
    if(R()<p){r.st-=g;nqLay(n,'mua');msg.push(contentText('nq2.muaXong',[chuTen(n.fa),n.name,g]));}
    else{(r.nqCam||(r.nqCam={}))[n.id]=W().t+NQ2.camThang*HM;msg.push(contentText('nq2.tuChoi',[chuTen(n.fa)]));dbg('nq2.tuChoi',{id:n.id,k});}}
  if(G.run&&G.run.scene===sc){sc.msg=msg;sc.chips=[];sc.venue=null;sc.seq=(sc.seq||0)+1;}saveSoon();return true;}
// đánh chiếm: thắng thì nắm, thế lực bị chiếm truy nã ngươi
{const _fc=finishCombat;finishCombat=function(sc){const first=sc&&!sc._nqC;if(sc)sc._nqC=1;const res=_fc.apply(this,arguments);
  if(first&&sc&&sc.after&&sc.after.nqChiem!=null&&G.run){const n=nodeById(sc.after.nqChiem);
    if(sc.over==='win'&&n&&!nqTa(n)){nqLay(n,'chiem');if(typeof tnaBao==='function')try{tnaBao(tnaK(n),2,{});}catch(e){}const R1=G.run;R1.faQh=R1.faQh||{};R1.faQh[n.fa]=(R1.faQh[n.fa]||0)-50;dbg('nq2.chiem',{id:n.id});}}
  return res;};}
VENUE_N.quyen=contentText('nq2.n');VENUE_IN.quyen=[contentText('nq2.in1'),contentText('nq2.in2')];
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='quyen')return nqOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='quyen')return nqDo(id);return _vd.apply(this,arguments);};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(G.run&&nqCo(n)&&!L.some(a=>a.a==='quyen'))L.push({a:'quyen',i:'🏛️',l:contentText('nq2.n'),h:0,tip:contentText(nqTa(n)?'nq2.tipTa':'nq2.tip'),dis:false,x:''});return L;};}
{const _pm=placeMeta;placeMeta=function(n){const o=_pm.apply(this,arguments);if(o&&nqTa(n))o.luc=contentText('nq2.luc');return o;};}
// đã nắm quyền: phá không bị phạt, không cần mua ô, xây được mọi công trình hợp nơi
{const _p=datPhat;datPhat=function(n,c,apply){if(nqTa(n))return [];return _p.apply(this,arguments);};}
{const _cm=datCanMua;datCanMua=function(n,c){if(nqTa(n))return false;return _cm.apply(this,arguments);};}
function nqXayGia(ct){return Math.round(datCtGia(ct)*NQ2.xayX);}
{const _o=datOpts;datOpts=function(n){let L=_o.apply(this,arguments);if(!nqTa(n))return L;const d=datOf(n);const i=d?d.o.findIndex(c=>!c.ct):-1;if(i<0)return L;
  L=L.filter(o=>o.id!=='xem');
  for(const id in CONG_TRINH){const C=CONG_TRINH[id];if(C.xay||!C.noi.includes(n.type))continue;const g=nqXayGia(id);
    L.push({id:'nqxay:'+i+':'+id,l:contentText('dat.oXay',[i+1,C.n,contentText('nq2.luc')]),d:contentText('nq2.xayD',[C.n,fmtBac(g)]),h:NQ2.xayH,st:0,g:{txt:fmtBac(g)},no:(r=>(r.bac||0)<g?contentText('no.khongDu'):'')(G.run)});}
  return L;};}
{const _d=datDo;datDo=function(id){const p=String(id||'').split(':');if(p[0]!=='nqxay')return _d.apply(this,arguments);
  const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);if(!nqTa(n))return false;const d=datOf(n),c=d&&d.o[+p[1]],ct=p[2],C=CONG_TRINH[ct];
  if(!c||c.ct||!C||!C.noi.includes(n.type))return false;const g=nqXayGia(ct);if((r.bac||0)<g)return false;bacAdd(-g,'nq.xay');advanceTime(NQ2.xayH);if(!G.run)return true;
  c.ct=ct;c.goc=0;delete c.cu;delete c.moc;const msg=[contentText('dat.xongXay',[C.n])];log(msg[0]);dbg('nq2.xay',{id:n.id,ct});
  if(G.run.scene===sc){sc.msg=msg;sc.chips=[bacChip(-g)];sc.venue=null;sc.seq=(sc.seq||0)+1;}saveSoon();return true;};}
// sinh lời: nơi đã nắm quyền thì mọi công trình (không phải của ngươi sẵn) cũng gửi lời
{const _lt=loiThang;loiThang=function(m){const t0=_lt.apply(this,arguments);const r=G.run;if(!r)return t0;const L=[];
  for(const R0 of W().regions)for(const n of R0.nodes){if(!nqTa(n))continue;const d=datStore()[n.id];if(!d)continue;for(const c of d.o){if(c.chu&&c.chu.k==='ta')continue;const o=loiDong(n,c,m);if(o)L.push(o);}}
  if(!L.length)return t0;const H=hopL(r);if(t0)t0.L.push(...L);else{H.push({m,L});while(H.length>LOI_CT.giu){const a=H.shift();H[0].L=a.L.concat(H[0].L);}}
  return H[H.length-1];};}

// ---------- việc 5: NPC hỏi mua công trình của ngươi; NPC tự mua công trình của dân ----------
const NQ_HOI={id:'nq_hoi_mua',sp:1,n:'',t:'',c:[]};KYNGO.push(NQ_HOI);
function nqHoiBan(k){const r=G.run,o=r.nqHoi;if(!o)return {t:''};const n=nodeById(o.node),d=n&&datStore()[n.id],c=d&&d.o[o.i];r.nqHoi=null;
  if(!c||!(c.chu&&c.chu.k==='ta'))return {t:contentText('nq2.hoiMat')};
  let g=o.gia;if(k===1){if(R()<NQ2.macHoiP)g=Math.round(g*(1+NQ2.macHoi));else{dbg('nq2.hoiBo',{});return {t:contentText('nq2.hoiBo',[o.ten])};}}
  c.chu={k:'vai',id:o.vai};bacAdd(g,'nq.ban');dbg('nq2.ban',{node:o.node,i:o.i,g});log(contentText('nq2.daBan',[CONG_TRINH[c.ct].n,n.name,fmtBac(g)]));return {t:contentText('nq2.daBan',[CONG_TRINH[c.ct].n,n.name,fmtBac(g)])};}
function nqHoiMo(){const r=G.run,o=r.nqHoi;const n=nodeById(o.node);const C=CONG_TRINH[o.ct];
  NQ_HOI.n=contentText('nq2.hoiN');NQ_HOI.t=contentText('nq2.hoiT',[o.ten,C?C.n:'',n?n.name:'',fmtBac(o.gia)]);
  NQ_HOI.c=[{l:contentText('nq2.hoiC0',[fmtBac(o.gia)]),go:()=>nqHoiBan(0)},{l:contentText('nq2.hoiC1'),go:()=>nqHoiBan(1)},{l:contentText('nq2.hoiC2'),go:()=>{G.run.nqHoi=null;return {t:contentText('nq2.hoiKhong')};}}];
  kyStart(NQ_HOI);}
function nqHoiThang(m){const r=G.run;if(!r||r.nqHoi||typeof datCuaTa!=='function')return;const V=Object.keys(W().vai||{}).filter(k=>W().vai[k].song);if(!V.length)return;
  for(const x of datCuaTa()){if(!x.ct||LOI_CT.boQua.includes(x.ct))continue;const h=wHash('hoi|'+x.node+'|'+x.i+'|'+m);if(h>=NQ2.hoiMua)continue;
    const n=nodeById(x.node);const c=datStore()[n.id].o[x.i];const vai=V[Math.floor(wHash('hoiv|'+m+x.node)*V.length)%V.length];
    const g=Math.round(datBanGia(n,Object.assign({muaCt:1},c))*(NQ2.hoiGia[0]+wHash('hoig|'+m)*(NQ2.hoiGia[1]-NQ2.hoiGia[0])));
    r.nqHoi={node:n.id,i:x.i,ct:x.ct,gia:g,vai,ten:W().vai[vai].ten,het:m+NQ2.hoiHan};dbg('nq2.hoi',{node:n.id,i:x.i,g});return;}}
function nqNpcMua(y){const w=W();const V=Object.keys(w.vai||{}).filter(k=>w.vai[k].song);if(!V.length)return;const D=datStore()||{};let k=0;
  for(const id in D){const n=nodeById(+id);if(!n||!isTownT(n.type)||nqTa(n))continue;D[id].o.forEach((c,i)=>{if(!c.ct||!c.chu||c.chu.k!=='dan')return;if(wHash('npcm|'+id+'|'+i+'|'+y)>=NQ2.npcMua)return;
    c.chu={k:'vai',id:V[Math.floor(wHash('npcv|'+id+i+y)*V.length)%V.length]};k++;});}
  if(k)dbg('nq2.npcMua',{y,k});}
{const _at=advanceTime;advanceTime=function(h){const m0=G.run&&W()?ncMonth():null,y0=m0!=null?tYear(W().t):null;const o=_at.apply(this,arguments);const r=G.run;if(!r||m0==null||!(h>0))return o;
  const m1=ncMonth();for(let m=m0+1;m<=Math.min(m1,m0+240);m++)nqHoiThang(m);
  if(r.nqHoi&&m1>r.nqHoi.het){dbg('nq2.hoiHet',{});r.nqHoi=null;}
  if(r.nqHoi&&!r.scene&&!r.moving&&G.screen==='map')nqHoiMo();
  const y1=tYear(W().t);for(let y=y0+1;y<=Math.min(y1,y0+50);y++)nqNpcMua(y);return o;};}

// ---------- việc 6: tịch biên khi nợ thuế lâu ----------
function nqTich(n,c,i){const r=G.run;c.chu=n.fa&&!String(n.fa).startsWith('tong:')?{k:'fa',id:n.fa}:{k:'dan'};c.thueNo=0;c.thueKy=0;c.noQuan=0;
  const C=CONG_TRINH[c.ct];const t=contentText('nq2.tich',[n.name,C?C.n:contentText('nq2.oDat')]);note(t,'dn');log(t);dbg('nq2.tich',{id:n.id,i});}
{const _x=datThueXet;datThueXet=function(){const r=G.run;const D=(r&&datStore())||{};const truoc={};
  for(const id in D)(D[id].o||[]).forEach((c,i)=>{if(c.chu&&c.chu.k==='ta')truoc[id+':'+i]=c.thueKy||0;});
  const o=_x.apply(this,arguments);if(!G.run)return o;
  for(const id in D){const n=nodeById(+id);(D[id].o||[]).forEach((c,i)=>{if(!(c.chu&&c.chu.k==='ta'))return;const k0=truoc[id+':'+i];
    if(k0!=null&&k0>DAT.thue.noKy-1&&(c.thueKy||0)===0&&!c.thueNo&&(r.bac||0)<0)c.noQuan=(c.noQuan||0)+1; // vừa bị chuyển sang nợ quan phủ
    if((r.bac||0)>=0)c.noQuan=0;
    if((c.thueKy||0)>=NQ2.tichKy||(c.noQuan||0)>=NQ2.noQuanTich)nqTich(n,c,i);});}
  return o;};}
