// ĐỢT 6: cải tạo linh căn (HN A.3; C §5.3). Bảng CAI_CAN, CC_VT, CC_CFG: content/rules/cai-can.js; chữ: content/text/cai-can.json
// Người chơi: r.cc={id,s:bước,t0:lúc vào bước,pf:{đầu mối đã kiểm},h:giờ đã phục vụ,care:số năm đã chăm,lua} — chỉ một đường đang làm.
//   r.ccHeard={id:1} dấu vết đã nghe · r.ccOk=1 đã cải căn thành công trong kiếp (mỗi kiếp một lần) · r.ccFail={id:1} đường đã hỏng/bỏ trong kiếp
//   r.ccWait thời điểm hết chờ sau thất bại · vật tư nằm trong túi (r.qitems 'cc_'+mã, Sửa-G) · r.ccGui=[{vt,at}] món gửi lại khi túi đầy · r.ccHau=[{until,fx}] suy nhược có hạn · r.ccFlag={seo_mach,bong_mach,huyet_can,nuoi_co,di_nguyen}
// Thế giới: W().ccSrc[id]={con:1|0,hoi:năm hồi (-1 không hồi),node,el,bloomY} — nguồn có thật, người khác có thể dùng mất; chết đi không sinh lại.
// G.meta.tucCan={root,node} vật bản mệnh chôn ở kiếp trước.
FEAT.cc=1;
const CC_SO=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín','mười'];
function ccYr(){return Math.floor(W().t/HY);}
function ccAll(){return W().regions.flatMap(R=>R.nodes||[]);}
// chọn theo băm (không rút số ngẫu nhiên: mở nơi chốn không làm lệch chuỗi ngẫu nhiên của trò chơi)
function ccFp(){const all=ccAll();return all.length+':'+all.slice(0,6).map(n=>Math.round(n.x)+','+Math.round(n.y)).join(';');}
function ccPick(L,k){return L[Math.floor(ncHash(ccFp()+'|'+k)*L.length)%L.length];}
function ccPin(spec){const all=ccAll();if(spec.meta){const T=G.meta&&G.meta.tucCan;return T&&nodeById(T.node)?T.node:null;}
  const a=all.find(n=>n.anchor===spec.loc);if(a)return a.id;
  for(const pass of [1,0])for(const t of spec.t||[]){const L=all.filter(n=>n.type===t&&n.state!=='ruin'&&(!pass||!spec.re||spec.re.test(n.name||'')));if(L.length)return ccPick(L,spec.loc+t).id;}
  const n=anchorNode(spec.loc);return n?n.id:null;}
function ccSrc(id){const w=W();w.ccSrc=w.ccSrc||{};let s=w.ccSrc[id];const P=CAI_CAN[id];if(!P)return null;
  if(!s){s=w.ccSrc[id]={con:1,hoi:0,node:ccPin(P.noi)};
    if(id==='CC06')s.el=ccPick(NGUHANH.concat(['loi','bang','phong']),id);
    if(id==='CC08')s.el=ccPick(['bang','phong','loi'],id);
    if(P.steps.some(x=>x.bloom))s.bloomY=ccYr()+1+Math.floor(ncHash(ccFp()+id)*12);}
  if(P.noi.meta)s.node=ccPin(P.noi);
  if(s.node!=null&&!nodeById(s.node))s.node=ccPin(P.noi);
  if(!s.con&&s.hoi>0&&ccYr()>=s.hoi){s.con=1;s.hoi=0;dbg('cc.hoi',{id});}
  return s;}
function ccVtNode(vt){const V=CC_VT[vt];if(!V||!V.loc)return null;const w=W();w.ccVtN=w.ccVtN||{};
  if(w.ccVtN[vt]==null||!nodeById(w.ccVtN[vt])){const n=anchorNode(V.loc);w.ccVtN[vt]=n?n.id:null;}return w.ccVtN[vt];}
function ccSt(r){r=r||G.run;if(!r)return null;if(!r.ccHeard||typeof r.ccHeard!=='object')r.ccHeard={};if(!r.ccFail||typeof r.ccFail!=='object')r.ccFail={};
  if(!Array.isArray(r.ccHau))r.ccHau=[];if(!r.ccFlag||typeof r.ccFlag!=='object')r.ccFlag={};if(!Array.isArray(r.qitems))r.qitems=[];if(!Array.isArray(r.ccGui))r.ccGui=[];
  // Sửa-G (câu 31): bản lưu cũ có sổ riêng r.ccVt → chuyển vào túi đồ; túi đầy thì gửi lại ở nơi đang đứng (r.ccGui)
  if(r.ccVt&&typeof r.ccVt==='object'&&r===G.run){const old=r.ccVt;delete r.ccVt;for(const v in old)if(CC_VT[v]&&(old[v]|0)>0)ccVtAdd(v,old[v]|0,'cu');}
  return r;}
// Sửa-G (câu 31): vật tư cải căn là vật trong túi (r.qitems, mã 'cc_'+vật), mỗi món một ô như vật phẩm thường
for(const v in CC_VT)CAT.byId['cc_'+v]={id:'cc_'+v,n:CC_VT[v].n,i:'📦',d:contentText('cc.vtTip'),use:contentText('cc.vtUse')};
function ccQid(vt){return 'cc_'+vt;}
function ccHave(vt){const r=ccSt();const q=ccQid(vt);return r.qitems.filter(x=>x===q).length;}
function ccBagFree(){return Math.max(0,bagCap()-bagStacks());}
function ccVtAdd(vt,n,why){const r=ccSt();const q=ccQid(vt);let gui=0;
  if(n>0)for(let i=0;i<n;i++){if(ccBagFree()>0)r.qitems.push(q);else{r.ccGui.push({vt,at:r.at!=null?r.at:r.queAt});gui++;}}
  else for(let i=0;i<-n;i++){const j=r.qitems.indexOf(q);if(j<0)break;r.qitems.splice(j,1);}
  if(gui){const nd=nodeById(r.at!=null?r.at:r.queAt);note(contentText('cc.guiNote',[CC_VT[vt].n,nd?nd.name:'']),'dn');log(contentText('cc.guiLog',[CC_VT[vt].n,gui,nd?nd.name:'']));}
  dbg('cc.vt',{vt,n,gui,why:why||''});}
// lấy lại món đã gửi ở nơi này (khi túi có chỗ)
function ccGuiOpts(n){const r=G.run;const L=[];const seen={};for(const g of r.ccGui||[]){if(g.at!==n.id||seen[g.vt])continue;seen[g.vt]=1;
  const k=r.ccGui.filter(x=>x.at===n.id&&x.vt===g.vt).length;
  L.push({id:'lay:'+g.vt,l:contentText('cc.lay',[CC_VT[g.vt].n]),d:contentText('cc.layD',[k]),h:0,st:0,no:ccBagFree()>0?'':contentText('cc.tuiDay')});}return L;}
function ccLay(n,vt){const r=G.run;const i=r.ccGui.findIndex(g=>g.at===n.id&&g.vt===vt);if(i<0||ccBagFree()<=0)return false;r.ccGui.splice(i,1);r.qitems.push(ccQid(vt));dbg('cc.lay',{vt});
  if(r.cc)ccAuto();return ccRes(contentText('cc.layT',[CC_VT[vt].n]),[chip('📦',CC_VT[vt].n,contentText('cc.vtTip'),'up')]);}
function ccOdds(p){if(p>=1)return contentText('cc.chac');const k=Math.floor(p*10+1e-9);if(k<=0)return contentText('cc.oddsIt');return contentText('cc.odds',[CC_SO[k],CC_SO[10-k]]);}
function ccNodeName(id){const s=ccSrc(id);const n=s&&nodeById(s.node);return n?n.name:contentText('cc.noiLa');}
// ai được theo: người vô căn đã trắc (vo), tu sĩ có căn chưa Viên Mãn (nang), có vật bản mệnh kiếp trước (tuc)
function ccFor(id,r){r=r||G.run;const P=CAI_CAN[id];if(!r||!P||P.off)return false;
  if(P.mode==='nang')return !r.pham&&!isVo(r)&&rootKnown(r)&&r.root&&r.root.q!=='vien';
  if(P.mode==='tuc')return voKnown(r)&&!!(G.meta&&G.meta.tucCan);
  return voKnown(r);}
function ccAvail(id){const P=CAI_CAN[id],s=ccSrc(id);if(!s||s.node==null)return false;if(P.hoi==null)return true;return !!s.con;}
function ccWhyStart(id){const r=ccSt(),P=CAI_CAN[id];if(!P||!r)return '?';const s=S();if(P.off)return contentText('cc.off.'+P.off);
  if(r.ccOk)return contentText('cc.daOk');if(r.cc)return r.cc.id===id?contentText('cc.dangTheo'):contentText('cc.motDuong');
  if(r.ccFail[id])return contentText('cc.daHong');if((r.ccWait||0)>W().t)return contentText('cc.cho',[durH(r.ccWait-W().t)]);
  if(!ccFor(id,r))return contentText('cc.khongHop.'+P.mode);if(!ccAvail(id))return contentText('cc.matNguon');
  const D=P.dk||{};if(D.tp&&(s.tp||0)<D.tp)return contentText('cc.canTp');if(D.vo&&voBac(r)<D.vo)return contentText('cc.canVo',[voBacN(D.vo)]);
  if(D.hd!=null&&hdLvIdx(r)>D.hd)return contentText('cc.canHd');if(D.nghe&&!ccSkillMem(r))return contentText('cc.canNghe');
  if(D.tu&&r.pham)return contentText('cc.canTu');if(woundLv()>=2)return contentText('cc.trongThuong');return '';}
// "ký ức kỹ năng" để hy sinh ở CC08: một nghề hoặc võ học từ bậc một
function ccSkillMem(r){r=r||G.run;return voBac(r)>=1||Object.values(r.paths||{}).some(p=>(p.bac|0)>=1);}
function ccStep(r){r=r||G.run;if(!r||!r.cc)return null;const P=CAI_CAN[r.cc.id];return P?P.steps[r.cc.s]||null:null;}
function ccNext(){const r=G.run;r.cc.s++;r.cc.t0=W().t;r.cc.h=0;r.cc.care=0;r.cc.wait=0;dbg('cc.buoc',{id:r.cc.id,s:r.cc.s,b:(ccStep()||{}).b});ccAuto();}
// bước tự xong (đã đủ vật tư từ trước)
function ccAuto(){const r=G.run,st=ccStep(r);if(!st)return;if(st.b==='gain'&&st.vt.every(([v,n])=>ccHave(v)>=n))ccNext();
  else if(st.b==='grow'&&W().t-r.cc.t0>=st.nam*HY&&r.cc.care>=st.nam){note(contentText('cc.growXong'),'up');ccNext();}}
// việc dài ngày: nơi bao cơm thì no; không thì tự trả tiền ăn theo ngày (đủ tiền thì ăn ở chỗ làm, thiếu thì như thường — có thể đói)
function ccAnGia(h){const r=G.run;if(!feat('an')||!(h>=HD)||typeof anCost!=='function')return 0;return Math.round(anCost(r)*h/HD);}
function ccTime(h,an){if(!(h>0))return;const c=an?0:ccAnGia(h);if(c&&bacCan(c)){bacPay(c,'an.caican');an=1;}if(an)VT_AN=1;try{advanceTime(h);}finally{VT_AN=0;}}
function ccStart(id){const r=ccSt();if(ccWhyStart(id))return false;r.cc={id,s:0,t0:W().t,pf:{},h:0,care:0};r.ccHeard[id]=1;
  log(contentText('cc.batLog',[CAI_CAN[id].n]));dbg('cc.start',{id});ccAuto();return true;}
function ccStop(why){const r=G.run;if(!r||!r.cc)return;const id=r.cc.id;r.ccFail[id]=1;r.cc=null;dbg('cc.bo',{id,why:why||''});}
// nguồn bị lấy (người chơi hoặc người khác)
function ccTake(id,by){const P=CAI_CAN[id],s=ccSrc(id);if(!s||P.hoi==null)return;s.con=0;s.hoi=P.hoi>0?ccYr()+P.hoi:-1;s.by=by;
  if(s.bloomY!=null)s.bloomY+=30;dbg('cc.lay',{id,by});}
function ccHear(id,quiet){const r=ccSt();if(r.ccHeard[id])return false;r.ccHeard[id]=1;const t=contentText('cc.ngheLog',[CAI_CAN[id].clue.replace('{{0}}',ccNodeName(id))]);
  log(t);if(!quiet)note(contentText('cc.ngheNote',[CAI_CAN[id].n]),'up');dbg('cc.nghe',{id});return true;}
// CC04: kỳ nở 60 ngày vào giữa hạ của năm nở
function ccBloomT(id){const s=ccSrc(id);return s.bloomY*HY+4*HM;}
function ccBloomOpen(id){const t=W().t,a=ccBloomT(id);return t>=a&&t<a+CC_CFG.bloomNgay*HD;}
// ---------- vật tư ----------
function ccVtOpts(vt,need,n,L){const V=CC_VT[vt];if(!V)return;const have=ccHave(vt);if(have>=need)return;const vn=ccVtNode(vt);
  const here=vn!=null?n.id===vn:n.id===ccSrc(G.run.cc.id).node;
  if(!here){if(vn!=null&&n.id===ccSrc(G.run.cc.id).node)L.push({id:'xa:'+vt,l:contentText('cc.oNoi',[V.n,nodeById(vn)?nodeById(vn).name:'']),d:'',h:0,st:0,no:contentText('cc.oNoiNo')});return;}
  const lbl=contentText('cc.co',[V.n,have,need]);const of=ccOf(vt),m=ncMonth();
  // Sửa-G (câu 29): không mua thẳng — chỉ khi đã dò ra người giữ và họ chịu nhượng (trong tháng)
  if(of&&of.m===m&&of.ok){const g=ccGia(vt,CC_CFG.hiemX);L.push({id:'mua:'+vt,l:contentText('cc.muaGiu',[V.n]),d:lbl+' '+contentText('cc.muaGiuD'),h:1,st:g.st||0,bac:g.bac||0,no:ccGiaCan(g)?'':g.st?contentText('cc.thieuSt'):contentText('tien.khongDu')});}
  if(V.cong)L.push({id:'cong:'+vt,l:V.cong.l,d:lbl,h:V.cong.ngay*HD,st:0});
  if(V.che){const ok=V.che.can.every(([x,k])=>ccHave(x)>=k);const b=CC_CFG.bep*V.che.ngay;
    L.push({id:'che:'+vt,l:contentText('cc.che',[V.n]),d:contentText('cc.cheD',[V.che.can.map(([x,k])=>k+' '+CC_VT[x].n).join(', ')]),h:V.che.ngay*HD,st:0,bac:b,
      no:!ok?contentText('cc.cheThieu'):bacCan(b)?'':contentText('tien.khongDu')});
    for(const [x,k] of V.che.can)if(!L.some(o=>o.id.endsWith(':'+x)))ccVtOpts(x,k*Math.max(1,need-have),n,L);}
  if(ccHiem(vt)&&!(of&&of.m===m&&of.ok))L.push({id:'tim:'+vt,l:contentText('cc.tim',[V.n]),d:lbl+' '+contentText('cc.timD'),h:CC_CFG.timNgay*HD,st:0,no:of&&of.m===m?contentText('cc.timRoi'):''});}
// vật quý có giá (gặp người chịu nhượng); vật chỉ có ở một nơi (sao_ha, sao_thuong) thì không dò hỏi được
function ccHiem(vt){const V=CC_VT[vt];return !!V&&!V.loc&&!!(V.gia||V.st);}
function ccOf(vt){const r=G.run;r.ccOf=r.ccOf&&typeof r.ccOf==='object'?r.ccOf:{};return r.ccOf[vt]||null;}
function ccGia(vt,x){const V=CC_VT[vt];return V.st?{st:Math.ceil(V.st*x)}:{bac:Math.round((V.gia||0)*x)};}
function ccGiaCan(g){return g.st?ltGet(0)>=g.st:bacCan(g.bac);}
function ccGiaPay(g,why){if(g.st){if(ltGet(0)<g.st)return false;ltAdd(0,-g.st,why);return true;}return bacPay(g.bac,why);}
function ccGiaChip(g){return g.st?ltChip(0,-g.st):bacChip(-g.bac);}
function ccVtDo(kind,vt){const V=CC_VT[vt];if(!V)return false;
  if(kind==='tim'){const r=G.run,m=ncMonth();ccTime(CC_CFG.timNgay*HD);if(!G.run)return true;
    const f=CC_FORCE===1?true:CC_FORCE===0?false:chance(CC_CFG.tim);const ok=f&&(CC_FORCE===1?true:CC_FORCE===0?false:chance(CC_CFG.ban));
    r.ccOf[vt]={m,ok:ok?1:0};dbg('cc.tim',{vt,thay:f?1:0,ban:ok?1:0});
    return {t:contentText(!f?'cc.timKhong':!ok?'cc.timTuChoi':'cc.timDuoc',[V.n]),ch:[]};}
  if(kind==='mua'){const of=ccOf(vt);if(!of||of.m!==ncMonth()||!of.ok)return false;const g=ccGia(vt,CC_CFG.hiemX);if(!ccGiaPay(g,'caican'))return false;
    delete G.run.ccOf[vt];ccTime(1);if(!G.run)return true;ccVtAdd(vt,1);return [ccGiaChip(g),chip('📦',V.n,contentText('cc.vtTip'),'up')];}
  if(kind==='cong'){ccTime(V.cong.ngay*HD,1);if(!G.run)return true;ccVtAdd(vt,1);return [chip('📦',V.n,contentText('cc.vtTip'),'up')];}
  if(kind==='che'){const b=CC_CFG.bep*V.che.ngay;if(!V.che.can.every(([x,k])=>ccHave(x)>=k)||!bacPay(b,'caican'))return false;for(const [x,k] of V.che.can)ccVtAdd(x,-k);
    ccTime(V.che.ngay*HD);if(!G.run)return true;ccVtAdd(vt,1);return [chip('⚗️',V.n,contentText('cc.vtTip'),'up')];}
  return false;}
// vật tư còn thiếu ở bước gom hiện tại (kể cả nguyên liệu để tự chế), chỉ những món quý có thể gặp ở nơi khác
function ccThieu(){const r=G.run,st=ccStep(r);if(!st||st.b!=='gain')return [];const out=[];
  const add=(v,k)=>{if(ccHave(v)>=k)return;if(ccHiem(v)&&!out.includes(v))out.push(v);const V=CC_VT[v];if(V&&V.che)for(const [x,q] of V.che.can)add(x,q);};
  for(const [v,k] of st.vt)add(v,k);return out;}
// ---------- lựa chọn tại nơi (venue "coduyen") ----------
function ccHereIds(n){if(!n)return [];return Object.keys(CAI_CAN).filter(id=>{const P=CAI_CAN[id];if(P.off)return false;const s=ccSrc(id);return s&&s.node===n.id;});}
function ccRiteD(P,st){const r=G.run,s=S();const L=[contentText('cc.leKq',[ccOutTxt(st.out)]),contentText('cc.leOdds',[ccOdds(st.ok)])];
  const c=st.cost||{};if(c.lifePct)L.push(contentText('cc.leGiaThoPct',[CC_SO[Math.round(c.lifePct/10)]||'']));if(c.life)L.push(contentText('cc.leGiaTho',[c.life]));
  if(st.okFx&&st.okFx.life)L.push(contentText('cc.leGiaTho',[-st.okFx.life]));if(st.okFx&&st.okFx.tam)L.push(contentText('cc.leGiaYeu',[st.okFx.tam.nam]));
  if(st.deed)L.push(contentText('cc.leNghiep'));
  L.push(contentText('cc.leHong',[ccFailTxt(st.fail||{})]));if(st.vt&&st.vt.length)L.push(contentText('cc.leMat'));
  const left=s.life-r.age-(st.ngay||0)/360;if(left<P.tuoi)L.push(contentText('cc.leTho',[P.tuoi]));
  return L.join(' ');}
function ccOutTxt(o){if(o.nang)return contentText('cc.kqNang');if(o.tuc)return contentText('cc.kqTuc');
  const id=o.id||'';const R=ROOT.find(x=>x.id===id);const Q=ROOT_Q.find(x=>x.id===o.q);
  return (o.pick?contentText('cc.kqPick'):R?R.n:'')+'';}
function ccFailTxt(f){const L=[];if(f.die)L.push(contentText('cc.hChet'));if(f.hpP)L.push(contentText('cc.hHp'));if(f.tam)L.push(contentText('cc.hYeu',[f.tam.nam>=1?f.tam.nam+' năm':Math.round(f.tam.nam*12)+' tháng']));
  if(f.life)L.push(contentText('cc.hTho',[-f.life]));if(f.wound)L.push(contentText('cc.hThuong',[WOUND[f.wound]?WOUND[f.wound].n.toLowerCase():'']));if(f.ngheDown)L.push(contentText('cc.hNghe'));
  return L.length?L.join(', '):contentText('cc.hKhong');}
function ccOpts(n){const r=ccSt();const L=[];if(!r||!n)return L;L.push(...ccGuiOpts(n));
  if(!r.cc){const here=ccHereIds(n).filter(id=>ccFor(id,r));
    if(here.some(id=>!r.ccHeard[id]))L.push({id:'hoi',l:contentText('cc.hoi'),d:contentText('cc.hoiD'),h:2,st:0});
    for(const id of here.filter(id=>r.ccHeard[id])){const P=CAI_CAN[id];L.push({id:'bat:'+id,l:contentText('cc.bat',[P.n]),d:P.clue.replace('{{0}}',n.name)+' '+contentText('cc.batD'),h:0,st:0,no:ccWhyStart(id)});}
    // chôn vật bản mệnh ở quê (cho kiếp sau)
    if(ccChonOk(n))L.push({id:'chon',l:contentText('cc.chon'),d:contentText('cc.chonD'),h:HD,st:0,bac:CC_CFG.chon||300,no:bacCan(CC_CFG.chon||300)?'':contentText('tien.khongDu')});
    return L;}
  const id=r.cc.id,P=CAI_CAN[id],st=ccStep(r),src=ccSrc(id),atSrc=src.node===n.id;if(!st)return L;
  if(st.b==='gain'){if(atSrc||st.vt.some(([v])=>ccVtNode(v)===n.id))for(const [v,k] of st.vt)ccVtOpts(v,k,n,L);}
  else if(atSrc){
    if(st.b==='proof'){for(const x of st.L)if(!r.cc.pf[x.id])L.push({id:'pf:'+x.id,l:x.l,d:contentText('cc.pfD',[Object.keys(r.cc.pf).length,st.L.length]),h:x.ngay*HD,st:0,bac:x.bac||0,no:x.bac&&!bacCan(x.bac)?contentText('tien.khongDu'):''});
      if(st.lua&&!r.cc.lua)L.push({id:'lua',l:st.lua.l,d:contentText('cc.luaD'),h:2,st:0,bac:st.lua.bac,no:bacCan(st.lua.bac)?'':contentText('tien.khongDu')});}
    if(st.b==='tranh'){st.L.forEach((x,i)=>{let no='';if(x.bac&&!bacCan(x.bac))no=contentText('tien.khongDu');if(x.st&&ltGet(0)<x.st)no=contentText('cc.thieuSt');if((r.cc.wait||0)>W().t&&x.p)no=contentText('cc.doiThang');
      L.push({id:'tr:'+i,l:x.l,d:st.t+(x.p?' '+contentText('cc.trRui',[ccOdds(Math.min(0.95,x.p+(x.vo?0.1*voBac(r):0)))]):'')+(x.deed?' '+contentText('cc.leNghiep'):''),h:(x.ngay||0.1)*HD,st:x.st||0,bac:x.bac||0,no});});}
    if(st.b==='serve'){const tot=ccServeH(st);L.push({id:'sv',l:contentText('cc.sv',[st.l]),d:contentText('cc.svD',[durH(Math.max(0,tot-r.cc.h))])+(st.an?' '+contentText('cc.svAn'):ccAnGia(st.chunk*HD)?' '+contentText('cc.tuAn',[fmtBac(ccAnGia(st.chunk*HD))]):''),h:Math.min(st.chunk*HD,Math.max(1,tot-r.cc.h)),st:0});
      if(st.alt&&!r.cc.alt)L.push({id:'svAlt',l:st.alt.l,d:contentText('cc.svAltD'),h:1,st:0,bac:st.alt.bac,no:bacCan(st.alt.bac)?'':contentText('tien.khongDu')});}
    if(st.b==='grow'){const need=ccGrowNeed(st);if(r.cc.care<need)L.push({id:'cham',l:st.l,d:contentText('cc.growD',[st.nam,r.cc.care]),h:st.ngay*HD,st:0});}
    if(st.b==='rite'){let no='';if(st.vt&&!st.vt.every(([v,k])=>ccHave(v)>=k))no=contentText('cc.leThieu');
      if(st.mua&&seasonOf(W().t)!==st.mua)no=contentText('cc.leMua.'+st.mua);
      if(st.bloom&&!ccBloomOpen(id))no=contentText('cc.leChoNo',[durH(Math.max(HD,ccBloomT(id)-W().t))]);
      if(P.mode==='nang'&&!ccFor(id,r))no=contentText('cc.khongHop.nang');
      L.push({id:'le',l:st.l,d:ccRiteD(P,st),h:(st.ngay||0)*HD,st:0,no});}}
  if(atSrc)L.push({id:'bo',l:contentText('cc.bo',[P.n]),d:contentText('cc.boD'),h:0,st:0});
  return L;}
function ccServeH(st){return st.thang?st.thang*HM:st.ngay*HD;}
function ccGrowNeed(st){const r=G.run;return Math.min(st.nam,Math.floor((W().t-r.cc.t0)/HY)+1);}
function ccRes(t,ch){return {t,ch:ch||[]};}
function ccDo(n,oid){const r=ccSt();const o=ccOpts(n).find(x=>x.id===oid);if(!o||o.no)return false;const p=oid.split(':');
  if(p[0]==='hoi'){ccTime(2);if(!G.run)return ccRes('');const L=ccHereIds(n).filter(id=>ccFor(id,r)&&!r.ccHeard[id]);for(const id of L)ccHear(id,1);
    return ccRes(L.map(id=>CAI_CAN[id].clue.replace('{{0}}',n.name)).join(' '));}
  if(p[0]==='bat'){ccStart(p[1]);return ccRes(contentText('cc.batT',[CAI_CAN[p[1]].n]));}
  if(p[0]==='chon')return ccChon(n);
  if(p[0]==='lay')return ccLay(n,p[1]);
  const id=r.cc.id,P=CAI_CAN[id],st=ccStep(r);
  if(p[0]==='bo'){ccStop('bo');log(contentText('cc.boLog',[P.n]));return ccRes(contentText('cc.boT'));}
  if(p[0]==='tim'){const o2=ccVtDo('tim',p[1]);if(!o2)return false;return o2===true?ccRes(''):ccRes(o2.t,o2.ch);}
  if(['mua','cong','che'].includes(p[0])){const ch=ccVtDo(p[0],p[1]);if(!ch)return false;if(G.run&&G.run.cc)ccAuto();return ccRes(contentText('cc.vtT',[CC_VT[p[1]].n]),ch===true?[]:ch);}
  if(p[0]==='pf'){const x=st.L.find(z=>z.id===p[1]);if(x.bac&&!bacPay(x.bac,'caican'))return false;ccTime(x.ngay*HD);if(!G.run)return ccRes('');
    r.cc.pf[x.id]=1;dbg('cc.pf',{id,pf:x.id});const done=st.L.every(z=>r.cc.pf[z.id]);if(done)ccNext();
    return ccRes(contentText(done?'cc.pfXong':'cc.pfMot'),x.bac?[bacChip(-x.bac)]:[]);}
  if(p[0]==='lua'){bacPay(st.lua.bac,'caican');ccTime(2);r.cc.lua=1;dbg('cc.lua',{id});return ccRes(contentText('cc.luaT'),[bacChip(-st.lua.bac)]);}
  if(p[0]==='tr')return ccTranh(st,+p[1]);
  if(p[0]==='sv'){const tot=ccServeH(st),h=Math.min(st.chunk*HD,Math.max(1,tot-r.cc.h));ccTime(h,st.an);if(!G.run||!G.run.cc)return ccRes('');r.cc.h+=h;const ch=[];let t=contentText('cc.svMot');
    if(st.rui&&chance(st.rui.p)){const s=S();if(st.rui.wound)addWound(st.rui.wound,'caican');if(st.rui.hpP)r.hp=Math.max(1,r.hp-Math.round(s.maxHp*st.rui.hpP/100));t=st.rui.t||contentText('cc.svRui');dbg('cc.rui',{id});}
    if(r.cc.h>=tot){for(const [v,k] of st.cho||[]){ccVtAdd(v,k);ch.push(chip('📦',CC_VT[v].n+' ×'+k,contentText('cc.vtTip'),'up'));}if(st.deed)ch.push(...deed(st.deed,{who:P.n}));t=contentText('cc.svXong');ccNext();}
    return ccRes(t,ch);}
  if(p[0]==='svAlt'){if(!bacPay(st.alt.bac,'caican'))return false;r.cc.alt=1;const tot=ccServeH(st);const cut=st.alt.thang?st.alt.thang*HM:tot;r.cc.h=Math.min(tot,r.cc.h+cut);ccTime(1);if(!G.run)return ccRes('');
    if(r.cc.h>=tot){for(const [v,k] of st.cho||[])ccVtAdd(v,k);ccNext();}return ccRes(contentText('cc.svAltT'),[bacChip(-st.alt.bac)]);}
  if(p[0]==='cham'){ccTime(st.ngay*HD);if(!G.run||!G.run.cc)return ccRes('');r.cc.care++;dbg('cc.cham',{id,care:r.cc.care});
    if(W().t-r.cc.t0>=st.nam*HY&&r.cc.care>=st.nam){ccNext();return ccRes(contentText('cc.growXong'));}return ccRes(contentText('cc.growMot'));}
  if(p[0]==='le')return ccRite(P,st);
  return false;}
function ccTranh(st,i){const r=G.run,x=st.L[i],P=CAI_CAN[r.cc.id];const id=r.cc.id;
  if(x.kq==='nhuong'){ccTake(id,'npc');ccStop('nhuong');log(contentText('cc.nhuongLog',[P.n]));return ccRes(contentText('cc.nhuongT'));}
  if(x.bac&&!bacPay(x.bac,'caican'))return false;if(x.st){if(ltGet(0)<x.st)return false;ltAdd(0,-x.st,'caican');}
  ccTime((x.ngay||0.1)*HD);if(!G.run||!G.run.cc)return ccRes('');const ch=[];if(x.bac)ch.push(bacChip(-x.bac));
  if(x.p){let p=x.p+(x.vo?0.1*voBac(r):0);if(x.nang&&typeof nangV==='function')p+=Math.max(-0.1,(nangV(x.nang)-10)/200);
    if(!chance(Math.min(0.95,p))){if(x.wound)addWound(x.wound,'caican');r.cc.wait=W().t+HM;dbg('cc.tranh',{id,i,ok:0});return ccRes(contentText('cc.trHong'),[]);}}
  if(x.deed)ch.push(...deed(x.deed,{who:P.n}));dbg('cc.tranh',{id,i,ok:1});ccNext();return ccRes(x.t||contentText('cc.trOk'),ch);}
// ---------- nghi thức ----------
function ccFx(f,ch){const r=G.run;if(!f||!r)return;const t=W().t;
  if(f.hpP){r.bon.hpP=(r.bon.hpP||0)+f.hpP;ch.push(chip('❤️',contentText('cc.cHp'),contentText('cc.cHpTip'),'dn'));}
  if(f.tam){r.ccHau.push({until:t+Math.round(f.tam.nam*HY),fx:f.tam.fx});ch.push(chip('🩹',contentText('cc.cYeu'),contentText('cc.cYeuTip'),'dn'));}
  if(f.life){r.lifeAdj=(r.lifeAdj||0)+f.life;ch.push(chip('⏳',contentText('cc.cTho',[-f.life]),contentText('cc.cThoTip'),'dn'));}
  if(f.wound&&WOUND[f.wound]){addWound(f.wound,'caican');ch.push(chip('🩸',WOUND[f.wound].n,'','dn'));}
  if(f.flag)r.ccFlag[f.flag]=1;
  if(f.ngheDown){const P=Object.entries(r.paths||{}).filter(([k,p])=>(p.bac|0)>=1).sort((a,b)=>b[1].bac-a[1].bac)[0];
    if(P){P[1].bac--;ch.push(chip('🧭',NGHE[P[0]]?NGHE[P[0]].n:P[0],contentText('cc.cNghe'),'dn'));}else if(voBac(r)>=1){voOf(r).bac--;ch.push(chip('🥋',contentText('cc.cVo'),contentText('cc.cNghe'),'dn'));}}
  clampHp();}
function ccMakeRoot(o,id){const r=G.run,s=ccSrc(id)||{};const qi=q=>ROOT_Q.findIndex(x=>x.id===q);
  if(o.nang){const k=Math.min(ROOT_Q.length-1,Math.max(0,qi(r.root.q||'thuong'))+1);return Object.assign({},r.root,{els:r.root.els.slice(),q:ROOT_Q[k].id});}
  if(o.tuc){const T=G.meta.tucCan.root;const k=Math.max(0,qi(T.q||'thuong')-1);return {id:T.id,els:T.els.slice(),q:ROOT_Q[k].id};}
  let rid=o.id||pick(o.pick);let el=o.el||(o.pick_el&&pick(o.pick_el))||null;
  if(o.elSrc){el=s.el||pick(NGUHANH);rid=o.lim&&o.id?o.id:NGUHANH.includes(el)?'thien':'bien';}
  let els;if(rid==='tap')els=NGUHANH.slice();else if(rid==='thien')els=[el||pick(NGUHANH)];else if(rid==='bien')els=[el||pick(['loi','bang','phong'])];
  else if(rid==='song'){const SP=[['kim','thuy'],['thuy','moc'],['moc','hoa'],['hoa','tho'],['tho','kim']];els=o.els?o.els.slice():pick(el&&NGUHANH.includes(el)?SP.filter(x=>x.includes(el)):SP).slice();}
  else els=shuffle(NGUHANH.slice()).slice(0,(ROOT.find(x=>x.id===rid)||{k:3}).k);
  return {id:rid,els,q:o.q||'thuong'};}
let CC_FORCE=null; // bài kiểm: ép kết quả (1 thành, 0 hỏng)
function ccRite(P,st){const r=G.run,id=r.cc.id,ch=[];
  for(const [v,k] of st.vt||[])ccVtAdd(v,-k);
  const c=st.cost||{};if(c.lifePct){const left=Math.max(0,S().life-r.age);r.lifeAdj=(r.lifeAdj||0)-Math.round(left*c.lifePct/100);ch.push(chip('⏳',contentText('cc.cThoPct'),contentText('cc.cThoTip'),'dn'));}
  if(c.life){r.lifeAdj=(r.lifeAdj||0)-c.life;ch.push(chip('⏳',contentText('cc.cTho',[c.life]),contentText('cc.cThoTip'),'dn'));}
  if(st.deed)ch.push(...deed(st.deed,{who:P.n}));
  ccTime((st.ngay||0)*HD);if(!G.run)return ccRes('');
  const ok=CC_FORCE!=null?!!CC_FORCE:chance(st.ok);ccTake(id,'pc');r.cc=null;
  if(ok){r.root=ccMakeRoot(st.out,id);r.rootKnown=1;r.ccOk=1;ccFx(st.okFx,ch);
    if(P.mode==='tuc'&&G.meta)delete G.meta.tucCan;
    log(contentText('cc.okLog',[P.n,rootLabel(r)]));bio(contentText('cc.okBio',[P.n,rootLabel(r)]));dbg('cc.ok',{id,root:r.root.id,q:r.root.q});
    ch.unshift(chip('🌱',rootLabel(r),contentText('tl.chipTip'),'up'));clampHp();saveSoon();return ccRes(st.okT||contentText('cc.okT'),ch);}
  r.ccFail[id]=1;r.ccWait=W().t+CC_CFG.cho*HY;const f=st.fail||{};
  if(P.mode==='tuc'&&G.meta)delete G.meta.tucCan;
  log(contentText('cc.failLog',[P.n]));dbg('cc.fail',{id});
  if(f.die&&(CC_FORCE===0?false:chance(f.die))){dbg('cc.chet',{id});die('caican',{n:P.n});return ccRes(st.failT||'');}
  ccFx(f,ch);saveSoon();return ccRes(st.failT||contentText('cc.failT'),ch);}
// ---------- túc căn: chôn vật bản mệnh ở quê để kiếp sau tìm lại ----------
function ccChonOk(n){const r=G.run;return !!r&&!!n&&r.root&&!isVo(r)&&rootKnown(r)&&r.queAt===n.id&&!(G.meta&&G.meta.tucCan&&G.meta.tucCan.k===r.kiep);}
function ccChon(n){const r=G.run,b=CC_CFG.chon||300;if(!bacPay(b,'caican'))return false;ccTime(HD);if(!G.run)return ccRes('');
  G.meta.tucCan={root:{id:r.root.id,els:r.root.els.slice(),q:r.root.q||'thuong'},node:n.id,k:r.kiep};dbg('cc.chon',{node:n.id});log(contentText('cc.chonLog'));return ccRes(contentText('cc.chonT'),[bacChip(-b)]);}
// ---------- nơi chốn: venue "coduyen" ----------
VENUE_N.coduyen=contentText('cc.venue');VENUE_IN.coduyen=[contentText('cc.in1'),contentText('cc.in2')];
function ccShow(n){const r=G.run;if(!feat('cc')||!r||!n||n.state==='ruin')return false;
  if(!r.cc&&!voKnown(r)&&!(rootKnown(r)&&!r.pham)&&r.queAt!==n.id)return false;return ccOpts(n).length>0;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(ccShow(n)&&!L.some(x=>x.a==='coduyen'))L.push({a:'coduyen',i:'🌱',l:contentText('cc.venue'),h:0,tip:contentText('cc.tip'),dis:false,x:''});return L;};}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='coduyen')return _vo.apply(this,arguments);return ccOpts(n);};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='coduyen')return _vd.apply(this,arguments);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place')return false;
  const n=nodeById(sc.id);const res=ccDo(n,id);if(!res)return false;const sc2=G.run&&G.run.scene;
  if(sc2===sc){sc.msg=[res.t||contentText('cc.xong')];sc.chips=res.ch||[];if(!ccShow(n))sc.venue=null;sc.seq=(sc.seq||0)+1;}saveSoon();return true;};}
// ---------- mỗi tháng: nghe dấu vết, người khác tranh nguồn, nuôi cổ, suy nhược hết hạn ----------
function ccMonth(){const r=ccSt();if(!r)return;const t=W().t;
  r.ccHau=r.ccHau.filter(x=>x.until>t);if(r.cc)ccAuto();
  if(!r.ccOk&&!r.cc){const L=Object.keys(CAI_CAN).filter(id=>!r.ccHeard[id]&&ccFor(id,r)&&ccAvail(id));
    const tuc=L.find(id=>CAI_CAN[id].mode==='tuc');if(tuc)ccHear(tuc);
    else if(L.length){const vo=L.filter(id=>CAI_CAN[id].mode==='vo'),na=L.filter(id=>CAI_CAN[id].mode==='nang');
      if(vo.length&&chance(CC_CFG.nghe))ccHear(pick(vo));else if(na.length&&chance(CC_CFG.ngheTu))ccHear(pick(na));}}
  // Sửa-G: đang gom vật tư thì đôi khi gặp kỳ ngộ được một món còn thiếu (chỉ gặp, không cầu)
  if(r.cc){const T=ccThieu();if(T.length&&chance(CC_CFG.ky)){const v=pick(T);ccVtAdd(v,1);log(contentText('cc.kyLog',[CC_VT[v].n]));note(contentText('cc.kyNote',[CC_VT[v].n]),'up');dbg('cc.ky',{vt:v});ccAuto();}}
  if(r.ccFlag.nuoi_co){if(!bacPay(CC_CFG.coThang,'nuoi_co')){addWound('doc','caican');note(contentText('cc.coDoi'),'dn');dbg('cc.co',{doi:1});}}
  // kỳ nở CC04 trôi qua không ai hái: người giữ hồ nhận đài sen, đợi kỳ sau
  for(const id in (W().ccSrc||{})){const s=W().ccSrc[id];if(s.bloomY!=null&&t>=ccBloomT(id)+CC_CFG.bloomNgay*HD){s.bloomY+=30;dbg('cc.no',{id,y:s.bloomY});}}}
function ccYear(){const r=G.run;for(const id in CAI_CAN){const P=CAI_CAN[id];if(P.hoi==null||P.off)continue;if(r&&r.cc&&r.cc.id===id)continue;const s=ccSrc(id);if(!s||!s.con)continue;
  if(chance(P.hoi>0?CC_CFG.npc:CC_CFG.npc/4)){ccTake(id,'npc');chron(contentText('cc.npcChron',[P.n,ccNodeName(id)]));}}}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(!r||!feat('cc')||!G.meta||!W())return o;
  const m=Math.floor(W().t/HM);if(r.ccM==null)r.ccM=m;
  while(r.ccM<m&&G.run){r.ccM++;ccMonth();if(r.ccM%12===0)ccYear();}return o;};}
// suy nhược có hạn
{const _ag=aggFx;aggFx=function(){const fx=_ag();const r=G.run;if(r&&Array.isArray(r.ccHau)&&G.meta&&W()){const t=W().t;for(const x of r.ccHau)if(x.until>t)for(const k in x.fx)fx[k]=(fx[k]||0)+x.fx[k];}return fx;};}
// chết vì cải căn
{const _ls=lifeSummary;lifeSummary=function(cause,info){const L=_ls.apply(this,arguments);if(cause==='caican'&&G.run)L.push(contentText('cc.lifeEnd',[Math.floor(G.run.age),G.run.ten,(info&&info.n)||'']));return L;};}
// ---------- Sổ tay: thẻ "Cơ duyên" (chữ, không số trừ thời gian) ----------
function ccView(){const r=ccSt();if(!r)return null;const cur=r.cc&&CAI_CAN[r.cc.id];
  const heard=Object.keys(r.ccHeard).filter(id=>CAI_CAN[id]&&!(r.cc&&r.cc.id===id)).map(id=>({id,n:CAI_CAN[id].n,noi:ccNodeName(id),t:r.ccFail[id]?contentText('cc.vHong'):!ccAvail(id)?contentText('cc.matNguon'):ccFor(id,r)?contentText('cc.vCo'):contentText('cc.khongHop.'+CAI_CAN[id].mode)}));
  let act=null;if(cur){const st=ccStep(r);act={id:r.cc.id,n:cur.n,noi:ccNodeName(r.cc.id),buoc:contentText('cc.b.'+st.b),goi:ccHint(st)};}
  return {ok:!!r.ccOk,act,heard,vt:ccVtList(r)};}
function ccVtList(r){const L=[];for(const v in CC_VT){const k=ccHave(v);const g=r.ccGui.filter(x=>x.vt===v);
  if(k)L.push({n:CC_VT[v].n,k});const by={};for(const x of g)by[x.at]=(by[x.at]||0)+1;
  for(const at in by){const nd=nodeById(+at);L.push({n:CC_VT[v].n+' '+contentText('cc.guiO',[nd?nd.name:'']),k:by[at]});}}return L;}
function ccHint(st){const r=G.run;if(st.b==='proof')return contentText('cc.g.proof',[CC_SO[Object.keys(r.cc.pf).length]||'',CC_SO[st.L.length]]);
  if(st.b==='gain')return contentText('cc.g.gain',[st.vt.filter(([v,k])=>ccHave(v)<k).map(([v])=>CC_VT[v].n+(CC_VT[v].loc&&ccVtNode(v)!=null?' ('+nodeById(ccVtNode(v)).name+')':'')).join(', ')]);
  if(st.b==='serve')return contentText('cc.g.serve',[st.l.toLowerCase(),durH(Math.max(0,ccServeH(st)-r.cc.h))]);
  if(st.b==='grow')return contentText('cc.g.grow',[durH(Math.max(0,r.cc.t0+st.nam*HY-W().t))]);
  if(st.b==='tranh')return st.t;
  if(st.b==='rite'){if(st.bloom&&!ccBloomOpen(r.cc.id))return contentText('cc.leChoNo',[durH(Math.max(HD,ccBloomT(r.cc.id)-W().t))]);if(st.mua&&seasonOf(W().t)!==st.mua)return contentText('cc.leMua.'+st.mua);return contentText('cc.g.rite');}
  return '';}
// ---------- bản lưu cũ ----------
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&r.ccVt)ccSt(r);if(r&&!r._ccV1){r._ccV1=1;ccSt(r);if(r.cc&&!CAI_CAN[r.cc.id])r.cc=null;}return r;};}
{const _mx=migrateX;migrateX=function(d){d=_mx.apply(this,arguments);const w=d&&d.meta&&d.meta.world;if(w&&w.ccSrc&&typeof w.ccSrc!=='object')w.ccSrc={};return d;};}
// ---------- Sửa-G: U Minh Ám Hội đôi khi có một món cải căn đang thiếu, giá rất cao ----------
function ccAmVt(n){const r=G.run;if(!r||!r.cc||!n)return null;const T=ccThieu();if(!T.length)return null;const m=ncMonth();
  const h=ncHash('am|'+n.id+'|'+m+'|'+r.cc.id);if(CC_FORCE!==1&&h>=CC_CFG.am)return null;return T[Math.floor(ncHash('amv|'+n.id+'|'+m)*T.length)%T.length];}
{const _ao=amOpts;amOpts=function(n){const L=_ao.apply(this,arguments);const v=ccAmVt(n);if(!v)return L;const left=amLeft(n);const g=ccGia(v,CC_CFG.amX);
  L.push({id:'cc:'+v,l:contentText('cc.amMua',[CC_VT[v].n,g.st?g.st+' '+ltName(0):fmtBac(g.bac)]),d:contentText('cc.amMuaD'),h:1,st:g.st||0,bac:g.bac||0,
    no:!left?contentText('am.het'):ccGiaCan(g)?'':g.st?contentText('cc.thieuSt'):contentText('tien.khongDu')});return L;};}
{const _ad=amDo;amDo=function(n,id){if(!String(id).startsWith('cc:'))return _ad.apply(this,arguments);const o=amOpts(n).find(x=>x.id===id);if(!o||o.no)return false;
  const v=id.slice(3);const g=ccGia(v,CC_CFG.amX);if(!ccGiaPay(g,'amhoi'))return false;ccVtAdd(v,1);
  const w=W(),m=ncMonth();const T=(w.amhoi=w.amhoi||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;dbg('cc.am',{vt:v});if(G.run.cc)ccAuto();
  return [ccGiaChip(g),chip('📦',CC_VT[v].n,contentText('cc.vtTip'),'up')];};}
