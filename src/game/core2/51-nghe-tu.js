// ĐỢT 7.2: 16 nghề tu lõi (HN C §10 P.1–P.4; B §7.5). Bảng TU_NGHE, TU_TANG, TU_CFG, TU_PM_CAM, TU_PM_LOI: content/rules/nghe-tu.js; chữ: content/text/nghe-tu.json
// r.tu={chinh:mã TU, phu:mã TU|null, k:{TUxx:{xp, tang:0..4, hd:{lúc làm hợp đồng cuối (để tính 30 ngày)}, hdT: tầng lúc làm hợp đồng cuối, n}}}
//   tối đa hai chuyên môn (chính nhận đủ tiến bộ, phụ một nửa); học công pháp thứ hai phải hợp luật ghép B §7.5.
// r.tuRes={TUxx:0..5} tài nguyên riêng (kiếm ý, huyết khí…) giữ qua trận, ra trận còn một nửa.
// Thế giới: W().tuSrc[LOC]=mã nút thầy dạy (chốt một lần, như nơi neo cải căn).
FEAT.tu=1;
// chiêu nghề tu không lọt vào kho chiêu ngẫu nhiên, công pháp nghề tu không lọt vào kho công pháp ngẫu nhiên
for(let i=SK_RAW.length-1;i>=0;i--){if(/^sk\d\d[abc]$/.test(SK_RAW[i][0]))SK_RAW.splice(i,1);}
const TU_ART={};CAT.arts=CAT.arts.filter(a=>{if(a.tu){TU_ART[a.tu]=a;return false;}return true;});
function tuOfSk(skId){const m=/^sk(\d\d)[abc]$/.exec(skId||'');return m?'TU'+m[1]:null;}
// dòng công pháp ghi số thật (raw): không nhân theo phẩm
{const _lv=lineVal;lineVal=function(a,x,pot){if(x&&x.raw)return x.v;return _lv.apply(this,arguments);};}
{const _S=S;S=function(){const s=_S();if(s.fx&&s.fx.cx)s.cx+=s.fx.cx;return s;};}
// ---------- trạng thái ----------
function tuSt(r){r=r||G.run;if(!r)return null;if(!r.tu||typeof r.tu!=='object')r.tu={chinh:null,phu:null,k:{}};if(!r.tu.k)r.tu.k={};return r.tu;}
function tuK(id,r){const T=tuSt(r);if(!T.k[id])T.k[id]={xp:0,tang:0,hd:0,hdT:-1,n:0};return T.k[id];}
function tuHas(id,r){const T=tuSt(r);return T.chinh===id||T.phu===id;}
function tuList(r){const T=tuSt(r);return [T.chinh,T.phu].filter(Boolean);}
function tuBacN(xp){const B=TU_CFG.bac;let i=0;for(let k=0;k<B.length;k++)if(xp>=B[k])i=k;return contentText('tu.bac.'+i);}
function tuGhepCam(a,b){return TU_PM_CAM.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));}
function tuGhepLoi(a,b){return a!==b&&TU_PM_LOI.some(([x,y])=>(x===a&&y===b)||(x===b&&y===a));}
// học công pháp thứ hai: pháp môn không ghép được với chuyên môn đang có thì từ chối
function tuGhepWhy(id,r){const T=tuSt(r);const pm=TU_NGHE[id].pm;for(const o of tuList(r)){if(o===id)continue;const po=TU_NGHE[o].pm;if(tuGhepCam(pm,po))return contentText('tu.camGhep',[TU_NGHE[o].n]);}return '';}
function tuXp(id,x){const r=G.run;if(!tuHas(id,r)||!(x>0))return 0;const T=tuSt(r);const g=Math.round(x*(T.chinh===id?1:TU_CFG.phu)*10)/10;const k=tuK(id);
  const b0=tuBacN(k.xp);k.xp=Math.min(TU_CFG.xpMax,(k.xp||0)+g);const b1=tuBacN(k.xp);if(b1!==b0){note(contentText('tu.lenBac',[TU_NGHE[id].n,b1]),'up');log(contentText('tu.lenBacLog',[TU_NGHE[id].n,b1]));}
  dbg('tu.xp',{id,g,xp:k.xp});return g;}
// ---------- nơi thầy dạy ----------
function tuNode(id){const w=W();w.tuSrc=w.tuSrc||{};const N=TU_NGHE[id];if(w.tuSrc[N.loc]==null||!nodeById(w.tuSrc[N.loc]))w.tuSrc[N.loc]=ccPin({loc:N.loc,t:N.t});return w.tuSrc[N.loc];}
function tuArtMake(id){const r=G.run;const a0=TU_ART[id];r.aid=(r.aid||0)+1;
  return {u:r.aid,type:'cp',tu:id,n:a0.n,el:'vo',tier:a0.t,req:0,lv:TU_TANG[0].lv,v:2,cid:a0.id,lore:a0.d,src:'tu',
    lines:a0.lines.map(x=>x.sk?{sk:x.sk,req:x.req}:{fx:x.fx,v:x.v,req:x.req,raw:1,d:x.d})};}
function tuArtOf(id,r){r=r||G.run;return (r.arts||[]).find(a=>a.tu===id);}
function tuCanTu(r){r=r||G.run;return !!(r&&!r.pham&&rootKnown(r)&&!isVo(r));}
function tuWhyHoc(id,luu){const r=G.run;if(!tuCanTu(r))return contentText(isVo(r)?'tu.voCan':'tu.canDanKhi');
  if(tuArtOf(id))return contentText('tu.daHoc');const T=tuSt(r);
  if(!tuHas(id)&&T.chinh&&T.phu)return contentText('tu.duHai');
  const g=tuGhepWhy(id);if(g)return g;
  if(typeof lkTang==='function'&&r.realm===0&&lkTang()<TU_TANG[0].lk)return contentText('tu.canLk',[TU_TANG[0].lk]);
  if(woundSevere())return contentText('tu.thuong');
  const phi=tuPhi(id,luu);if((r.st||0)<phi)return contentText('tu.thieuLt',[phi]);return '';}
function woundSevere(){return typeof woundLv==='function'?woundLv()>=3:false;}
function tuPhi(id,luu){return Math.ceil(TU_NGHE[id].phi*(luu?TU_CFG.luuPhi:1));}
function tuHoc(id,luu){const r=G.run;if(tuWhyHoc(id,luu))return null;const N=TU_NGHE[id],T=tuSt(r);const phi=tuPhi(id,luu);
  r.st-=phi;const ngay=TU_TANG[0].ngay*(luu?TU_CFG.luu:1);ccTime(ngay*HD,0);if(!G.run)return {t:''};
  const a=tuArtMake(id);r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  if(!T.chinh)T.chinh=id;else if(!T.phu&&T.chinh!==id)T.phu=id;const k=tuK(id);k.tang=1;
  syncSkills();log(contentText('tu.hocLog',[a.n,N.n]));dbg('tu.hoc',{id,luu:!!luu,phi,ngay});if(typeof tutTick==='function')tutTick('role');saveSoon();
  return {t:contentText(luu?'tu.hocLuuT':'tu.hocT',[a.n,ngay]),ch:[chip('📘',a.n,N.n,'up'),chip('💎',String(-phi),contentText('tu.lt'),'dn')]};}
// ---------- hợp đồng ----------
function tuWhyHd(id,n){const r=G.run,N=TU_NGHE[id];if(!tuHas(id)||!tuArtOf(id))return contentText('tu.chuaHoc');if(!n||!N.hd.noi.includes(n.type))return contentText('vt.khongNoi');
  if(woundSevere())return contentText('tu.thuong');if((r.st||0)<N.hd.von)return contentText('tu.thieuLt',[N.hd.von]);
  if(r.scene&&r.scene.type==='combat')return contentText('vt.ban');return '';}
function tuHd(id){const r=G.run;const n=nodeById(r.at);if(tuWhyHd(id,n))return null;const N=TU_NGHE[id],H=N.hd,k=tuK(id);
  r.st-=H.von;if(H.hp){const s=S();r.hp=Math.max(1,r.hp-Math.round(s.maxHp*H.hp/100));}
  ccTime(H.ngay*HD,0);if(!G.run)return {t:''};
  const t=W().t;const hong=chance(TU_CFG.rui)&&!G._tuNoRui;const ch=[];let txt;
  const moi=!k.hd||t-k.hd>=TU_CFG.cho*HD;
  if(hong){addWound('ngoai','tu');txt=contentText('tu.hdHong',[H.l.toLowerCase()]);ch.push(chip('💎',String(-H.von),contentText('tu.lt'),'dn'));
    if(moi)tuXp(id,TU_CFG.hd/2);dbg('tu.hd',{id,hong:1});}
  else{r.st+=H.cong;ch.push(chip('💎','+'+(H.cong-H.von),contentText('tu.ltLai'),'up'));txt=contentText('tu.hdXong',[H.l.toLowerCase(),H.cong]);
    if(moi){const g=tuXp(id,TU_CFG.hd);if(g)ch.push(chip('🧭',N.n,contentText('tu.xpTip'),'up'));k.hd=t;k.hdT=k.tang;}else txt+=' '+contentText('tu.hdLap');
    k.n=(k.n||0)+1;dbg('tu.hd',{id,moi,xp:k.xp});}
  ch.push(chip('⏳',durH(H.ngay*HD),contentText('vt.gio'),''));saveSoon();return {t:txt,ch};}
// ---------- nghiên cứu tầng tiếp ----------
function tuWhyTang(id){const r=G.run;const a=tuArtOf(id),k=tuK(id);if(!a)return contentText('tu.chuaHoc');if(!tuHas(id))return contentText('tu.khongChuyen');
  const nt=k.tang;if(nt>=TU_TANG.length)return contentText('tu.daDu');const C=TU_TANG[nt];
  if(r.realm<C.realm)return contentText('tu.canCanh',[REALM[C.realm]]);
  if(C.lk&&r.realm===0&&typeof lkTang==='function'&&lkTang()<C.lk)return contentText('tu.canLk',[C.lk]);
  if((k.xp||0)<C.xp)return contentText('tu.canNghe',[tuBacN(C.xp)]);
  if(k.hdT<nt||!k.hd)return contentText('tu.canHd');
  if(woundSevere())return contentText('tu.thuong');return '';}
function tuTang(id){const r=G.run;if(tuWhyTang(id))return null;const k=tuK(id),C=TU_TANG[k.tang];const a=tuArtOf(id);
  ccTime(C.ngay*HD,0);if(!G.run)return {t:''};k.tang++;a.lv=Math.max(a.lv,C.lv);syncSkills();
  log(contentText('tu.tangLog',[a.n,k.tang]));dbg('tu.tang',{id,tang:k.tang});saveSoon();
  return {t:contentText('tu.tangT',[a.n,contentText('tu.tang.'+k.tang)]),ch:[chip('📘',a.n,contentText('tu.tang.'+k.tang),'up')]};}
function tuDoiPhu(){const r=G.run,T=tuSt(r);if(!T.phu)return null;const old=T.phu;ccTime(TU_CFG.doiPhu*HD,0);if(!G.run)return {t:''};T.phu=null;
  dbg('tu.doiPhu',{old});log(contentText('tu.doiPhuLog',[TU_NGHE[old].n]));return {t:contentText('tu.doiPhuT',[TU_NGHE[old].n])};}
// ---------- nơi chốn: venue "tumon" ----------
VENUE_N.tumon=contentText('tu.venue');VENUE_IN.tumon=[contentText('tu.in1'),contentText('tu.in2')];
function tuHere(n){return n?Object.keys(TU_NGHE).filter(id=>tuNode(id)===n.id):[];}
function tuOpts(n){const r=G.run,L=[];if(!r||!n||n.state==='ruin')return L;
  for(const id of tuHere(n)){const N=TU_NGHE[id],a0=TU_ART[id];if(tuArtOf(id))continue;
    L.push({id:'hoc:'+id,l:contentText('tu.oHoc',[a0.n,N.n,N.phi,TU_TANG[0].ngay]),d:contentText('tu.oHocD',[N.n,N.hd.l.toLowerCase()]),no:tuWhyHoc(id,0)||undefined});
    L.push({id:'luu:'+id,l:contentText('tu.oLuu',[a0.n,tuPhi(id,1),TU_TANG[0].ngay*TU_CFG.luu]),d:contentText('tu.oLuuD'),no:tuWhyHoc(id,1)||undefined});}
  for(const id of tuList(r)){const N=TU_NGHE[id];if(!tuArtOf(id))continue;
    if(N.hd.noi.includes(n.type))L.push({id:'hd:'+id,l:contentText('tu.oHd',[N.hd.l,N.hd.ngay,N.hd.von,N.hd.cong]),d:contentText('tu.oHdD'),no:tuWhyHd(id,n)||undefined});
    const k=tuK(id);if(k.tang<TU_TANG.length)L.push({id:'tang:'+id,l:contentText('tu.oTang',[tuArtOf(id).n,contentText('tu.tang.'+(k.tang+1)),TU_TANG[k.tang].ngay]),no:tuWhyTang(id)||undefined});}
  const T=tuSt(r);if(T.phu)L.push({id:'doiphu',l:contentText('tu.oDoiPhu',[TU_NGHE[T.phu].n,TU_CFG.doiPhu]),d:contentText('tu.oDoiPhuD')});
  return L;}
function tuShow(n){const r=G.run;if(!feat('tu')||!r||!n||n.state==='ruin'||r.pham)return false;return tuOpts(n).length>0;}
function tuDo(n,id){const [a,b]=id.split(':');if(a==='hoc')return tuHoc(b,0);if(a==='luu')return tuHoc(b,1);if(a==='hd')return tuHd(b);if(a==='tang')return tuTang(b);if(a==='doiphu')return tuDoiPhu();return null;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(tuShow(n)&&!L.some(x=>x.a==='tumon'))L.push({a:'tumon',i:'📘',l:contentText('tu.venue'),h:0,tip:contentText('tu.tip'),dis:false,x:''});return L;};}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='tumon')return _vo.apply(this,arguments);return tuOpts(n);};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='tumon')return _vd.apply(this,arguments);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place')return false;
  const n=nodeById(sc.id);const o=tuOpts(n).find(x=>x.id===id);if(!o||o.no)return false;const res=tuDo(n,id);if(!res)return false;const sc2=G.run&&G.run.scene;
  if(sc2===sc){sc.msg=[res.t||''];sc.chips=res.ch||[];if(!tuShow(n))sc.venue=null;sc.seq=(sc.seq||0)+1;}saveSoon();return true;};}
// ---------- trong trận: tài nguyên riêng, ghép có lợi ----------
{const _pu=playerUnit;playerUnit=function(){const u=_pu.apply(this,arguments);const r=G.run;if(u&&r){const L=tuList(r);if(L.length){u.tuRes={};for(const id of L)u.tuRes[id]=clamp((r.tuRes||{})[id]|0,0,TU_CFG.resMax);}}return u;};}
{const _fc=finishCombat;finishCombat=function(sc){const me=sc&&mainUnit(sc);const r=G.run;if(me&&me.tuRes&&r&&!sc._tuDone){sc._tuDone=1;r.tuRes=r.tuRes||{};for(const id in me.tuRes)r.tuRes[id]=Math.floor(me.tuRes[id]/2);}
  return _fc.apply(this,arguments);};}
function tuLoiOn(id,r){const L=tuList(r);if(!L.includes(id))return false;const pm=TU_NGHE[id].pm;return L.some(o=>o!==id&&tuGhepLoi(pm,TU_NGHE[o].pm));}
{const _rs=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){const id=u&&u.isMain&&tuOfSk(sk&&sk.id);
  if(id&&u.tuRes&&u.tuRes[id]!=null){const r=G.run;let m=1;
    if(u.tuRes[id]>=TU_CFG.resMax){m*=TU_CFG.resX;u.tuRes[id]=0;clog(sc,contentText('tu.resDon',[TU_NGHE[id].res]),'fl');dbg('tu.res',{id,don:1});}
    else u.tuRes[id]++;
    if(tuLoiOn(id,r)){m*=TU_CFG.loi;dbg('tu.loi',{id});}
    if(m!==1)qm=(qm||1)*m;}
  return _rs.call(this,sc,u,sk,lv,tg,qm,offs);};}
function tuResView(u){if(!u||!u.tuRes)return [];return Object.keys(u.tuRes).filter(id=>TU_NGHE[id]).map(id=>({id,n:TU_NGHE[id].res,v:u.tuRes[id],max:TU_CFG.resMax}));}
// ---------- Dẫn Dược (SK09A): dùng một viên đan hồi có thật, lượng hồi thêm 15% ----------
{const _rs2=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){const f=sk&&sk.fx;if(!(f&&f.pillBoost&&u&&u.isMain))return _rs2.apply(this,arguments);
  const r=G.run;const HOI=['hoixuan','baohuyet'];const i=(r.pills||[]).findIndex(p=>PILL[p.id]&&(HOI.includes(p.id)||HOI.includes(PILL[p.id].eff)));
  if(i<0){clog(sc,contentText('tu.khongDan'),'me');dbg('fx.pillBoost',{co:0});return _rs2.apply(this,arguments);}
  syncMain(sc);const h0=r.hp;try{usePill(i,true);}catch(e){}if(!G.run)return;const g=Math.max(0,r.hp-h0);u.hp=Math.min(u.max,r.hp+Math.round(g*f.pillBoost/100));u.mp=Math.min(u.maxMp,r.mp);syncMain(sc);
  dbg('fx.pillBoost',{co:1,g});return _rs2.apply(this,arguments);};}
// ---------- Đạo đồ: hiện nghề tu bằng chữ ----------
function tuView(){const r=G.run;if(!r)return [];const T=tuSt(r);return tuList(r).map(id=>{const k=tuK(id);return {id,n:TU_NGHE[id].n,vai:contentText(T.chinh===id?'tu.chinh':'tu.phu'),bac:tuBacN(k.xp),tang:contentText('tu.tang.'+(k.tang||0)),cp:(tuArtOf(id)||{}).n||''};});}
// bản lưu cũ / kiếp mới: r.tu tạo khi cần (tuSt); kiếp mới không mang nghề tu
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);if(G.run){G.run.tu={chinh:null,phu:null,k:{}};G.run.tuRes={};}return res;};}
