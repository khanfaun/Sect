// ĐỢT 11: nghề tu mở rộng (HN A.8, B §7.4–§7.5) và bí truyền ngoại lệ luân hồi (HN A.16).
// Bảng: content/rules/nghe-tu-mo-rong.js (thêm TU17–TU25 vào TU_NGHE; TU_BI; TU_MR). Chữ: content/text/nghe-tu-mo-rong.json.
// Bộ máy học / hợp đồng / tầng / tài nguyên riêng dùng chung core2/51-nghe-tu.js. Ở đây chỉ thêm phần riêng:
//   Nho tu cần Hành Đạo nghiêng chính; bái học Thi tu, Thôn phệ nghiêng tà, Phật/Nho/Lôi nghiêng chính (TU_NGHE.dh)
//   Phật tu: giới sát (Phật quang tắt), giữ của lớn thì nguyện lực ngừng tăng · Nho tu: văn tâm nứt / vỡ
//   Thiên cơ sư: thuật tổn thọ, thiên khiển, Khuy Mệnh · Thương tu: hợp đồng lời thêm · Cổ sư: nuôi cổ mỗi tháng · Thôn phệ: nuốt tu vi, tâm ma
//   Khoá chiêu mới: vsF, needSum, dinh, tho, ltCost, huyenPhan, mpDrain, devour (docs/thiet-ke/anh-xa-fx.md mục Đ11)
//   Ngoại lệ luân hồi: Luân Hồi Chuyển Thế Kinh, Bất Muội Linh Quang Quyết (TU_BI), Túc Mạng Thông (dòng tầng bốn Phật tu), Khuy Mệnh, Túc Tuệ Đăng nhớ nghề.
// Trường lưu (đọc kiểu r.x||0, bản lưu cũ không có vẫn chạy): r.tuBi={lhct,bmlq}, r.tuKhuy, r.tuPhatTat, r.tuTho, r.tuTc={y,n}, r.tuCoDoi, r.tu.k.TU20.nut;
//   G.meta.tuMem={id,src} (nhớ một nghề), G.meta.tucMang=[mã TU] (học lại nhanh) — chỉ dùng ở kiếp liền sau.
FEAT.tuMr=1;
function mrT(k,a){return contentText('tumr.'+k,a);}
function mrHas(id,r){r=r||G.run;return !!(r&&tuHas(id,r)&&tuArtOf(id,r));}
function mrLv(id,r){const a=tuArtOf(id,r);return a?a.lv||0:0;}
function mrLocNode(c){const id=Object.keys(TU_NGHE).find(k=>TU_NGHE[k].loc===c);if(id)return tuNode(id);const n=typeof anchorNode==='function'&&anchorNode(c);return n?n.id:null;}
function mrMem(id){const M=G.meta;return !!(M&&M.tuMem&&M.tuMem.id===id);}
function mrHalf(id){const M=G.meta;return mrMem(id)||!!(M&&(M.tucMang||[]).includes(id));}
// ---------- bái học ----------
{const _w=tuWhyHoc;tuWhyHoc=function(id,luu){const w=_w.apply(this,arguments);if(w)return w;const N=TU_NGHE[id];
  if(N&&N.hdMax!=null&&hdLvIdx(G.run)>N.hdMax)return mrT('canChinh');return '';};}
{const _p=tuPhi;tuPhi=function(id,luu){if(mrMem(id))return 0;return _p.apply(this,arguments);};}
{const _h=tuHoc;tuHoc=function(id,luu){const r=G.run;if(!r||tuWhyHoc(id,luu))return _h.apply(this,arguments);
  const N=TU_NGHE[id];const half=mrHalf(id),mem=mrMem(id);const k0=TU_TANG[0].ngay;if(half)TU_TANG[0].ngay=Math.ceil(k0/2);
  let res;try{res=_h.apply(this,arguments);}finally{TU_TANG[0].ngay=k0;}
  if(res&&G.run&&tuArtOf(id)){
    if(half){if(mem)delete G.meta.tuMem;if(G.meta.tucMang)G.meta.tucMang=G.meta.tucMang.filter(x=>x!==id);res.t=(res.t||'')+' '+mrT('nhoLai');dbg('tumr.nhoLai',{id,mem});}
    if(N.dh==='chinh')hdAdd(HD_W.vua,0,'tu:'+id);else if(N.dh==='ta')hdAdd(0,HD_W.vua,'tu:'+id);}
  return res;};}
// ---------- hợp đồng: lời thêm (Thương tu), hành vi, tài nguyên, thọ, tâm ma ----------
function mrResAdd(id,n){const r=G.run;r.tuRes=r.tuRes||{};if(id==='TU19'&&(r.st||0)>TU_MR.phatGiau){dbg('tumr.phatGiau',{});return;}
  if(id==='TU19'&&mrPhatTat(r))return;r.tuRes[id]=clamp((r.tuRes[id]|0)+n,0,TU_CFG.resMax);}
function mrTho(y){const r=G.run;if(!r||!(y>0))return [];r.tuTho=(r.tuTho||0)+y;let mat=0;while(r.tuTho>=1){r.tuTho-=1;r.lifeAdj=(r.lifeAdj||0)-1;mat++;}
  const yr=Math.floor(W().t/HY);if(!r.tuTc||r.tuTc.y!==yr)r.tuTc={y:yr,n:0};r.tuTc.n++;
  if(r.tuTc.n>TU_MR.tcNam&&chance(TU_MR.tcKhien)){addWound('than','tk');note(mrT('thienKhien'),'dn');log(mrT('thienKhienLog'));dbg('tumr.thienKhien',{n:r.tuTc.n});}
  dbg('tumr.tho',{y,mat});return [chip('⏳',mrT('thoChip'),mrT('thoTip'),'dn')];}
{const _hd=tuHd;tuHd=function(id){const r=G.run;const n=r&&nodeById(r.at);if(!r||tuWhyHd(id,n))return _hd.apply(this,arguments);
  const H=TU_NGHE[id].hd;const st0=r.st||0;const res=_hd.apply(this,arguments);if(!res||!G.run)return res;
  const ok=(r.st||0)>st0-H.von;const ch=res.ch=res.ch||[];
  if(ok){const lai=aggFx().thuongLai||0;if(lai){const g=Math.max(1,Math.round(H.cong*lai/100));r.st+=g;ch.push(chip('💎','+'+g,mrT('laiTip'),'up'));dbg('tumr.lai',{g});}
    if(H.deed&&typeof deed==='function')ch.push(...deed(H.deed,{why:'tu'}));
    if(H.res)mrResAdd(id,H.res);}
  if(H.tho)ch.push(...mrTho(H.tho));
  if(H.tamma){r.tamma=clamp((r.tamma||0)+H.tamma,0,100);ch.push(chip('😈',mrT('tamChip'),mrT('tamTip'),'dn'));dbg('tumr.tamma',{id});}
  return res;};}
// ---------- Phật tu: giới sát, Phật quang tắt ----------
function mrPhatTat(r){r=r||G.run;return !!(r&&r.tuPhatTat&&W().t<r.tuPhatTat);}
{const _d=deed;deed=function(id,o){const r=G.run;const out=_d.apply(this,arguments);
  if(r&&G.run===r&&TU_MR.phatGioi.includes(id)&&mrHas('TU19',r)){r.tuPhatTat=W().t+TU_MR.phatTat*HD;r.tuRes=r.tuRes||{};r.tuRes.TU19=0;
    note(mrT('phatTat'),'dn');log(mrT('phatTatLog'));dbg('tumr.phatGioi',{id});}
  return out;};}
// ---------- Nho tu: văn tâm nứt, vỡ ----------
function mrBo(id){const r=G.run,T=tuSt(r);const a=tuArtOf(id);
  if(a){r.arts=r.arts.filter(x=>x!==a);for(let j=0;j<(r.chu||[]).length;j++)if(r.chu[j]&&r.chu[j].k==='a'&&r.chu[j].u===a.u)r.chu[j]=null;}
  if(T.chinh===id){T.chinh=T.phu||null;T.phu=null;}else if(T.phu===id)T.phu=null;delete T.k[id];if(r.tuRes)delete r.tuRes[id];syncSkills();}
{const _h=hdAdd;hdAdd=function(p,t,why){const r=G.run;const out=_h.apply(this,arguments);
  if(r&&G.run===r&&(t||0)>=TU_MR.nhoNut&&mrHas('TU20',r)){const k=tuK('TU20');k.nut=(k.nut||0)+1;r.tuRes=r.tuRes||{};r.tuRes.TU20=Math.floor((r.tuRes.TU20||0)/2);
    if(k.nut>=TU_MR.nhoVo){mrBo('TU20');note(mrT('nhoVo'),'dn');log(mrT('nhoVoLog'));dbg('tumr.nhoVo',{});}
    else{note(mrT('nhoNut'),'dn');log(mrT('nhoNutLog'));dbg('tumr.nhoNut',{nut:k.nut});}}
  return out;};}
// ---------- Cổ sư: nuôi cổ mỗi tháng ----------
{const _m=ccMonth;ccMonth=function(){const out=_m.apply(this,arguments);const r=G.run;
  if(r&&mrHas('TU17',r)){if((r.st||0)>=TU_MR.coNuoi){r.st-=TU_MR.coNuoi;r.tuCoDoi=0;}
    else{r.tuCoDoi=(r.tuCoDoi||0)+1;if(r.tuCoDoi>=TU_MR.coDoi){r.tuCoDoi=0;addWound('doc','co');note(mrT('coCan'),'dn');log(mrT('coCanLog'));dbg('tumr.coCan',{});}}}
  return out;};}
// ---------- bí truyền (HN A.16) và Khuy Mệnh ----------
function tuWhyBi(bid){const r=G.run,B=TU_BI[bid];if(!r||!B)return '?';if((r.tuBi||{})[bid])return mrT('biDa');
  if(!B.nghe.some(id=>tuHas(id)&&tuK(id).tang>=TU_TANG.length))return mrT('biCan',[B.nghe.map(id=>TU_NGHE[id].n).join(contentText('tumr.hoac'))]);
  if(woundSevere())return contentText('tu.thuong');if((r.st||0)<B.phi)return contentText('tu.thieuLt',[B.phi]);return '';}
function tuBiHoc(bid){const r=G.run,B=TU_BI[bid];if(tuWhyBi(bid))return null;r.st-=B.phi;ccTime(B.ngay*HD,0);if(!G.run)return {t:''};
  r.tuBi=r.tuBi||{};r.tuBi[bid]=1;log(mrT('biLog',[B.n]));dbg('tumr.bi',{bid});saveSoon();
  return {t:mrT('biT.'+bid,[B.n]),ch:[chip('📘',B.n,mrT('biTip.'+bid),'up'),chip('💎',String(-B.phi),contentText('tu.lt'),'dn')]};}
function tuWhyKhuy(){const r=G.run;if(!r)return '?';if(r.tuKhuy)return mrT('khuyDa');if(mrLv('TU21')<7)return mrT('khuyTang');
  if((r.realm||0)<TU_MR.khuy.realm)return contentText('tu.canCanh',[REALM[TU_MR.khuy.realm]]);
  if(S().life-r.age<=TU_MR.khuy.tho+1)return mrT('khuyTho');return '';}
function tuKhuy(){const r=G.run;if(tuWhyKhuy())return null;r.lifeAdj=(r.lifeAdj||0)-TU_MR.khuy.tho;r.tuKhuy=1;log(mrT('khuyLog'));dbg('tumr.khuy',{});saveSoon();
  return {t:mrT('khuyT'),ch:[chip('⏳',mrT('thoChip'),mrT('thoTip'),'dn')]};}
{const _o=tuOpts;tuOpts=function(n){const L=_o.apply(this,arguments);const r=G.run;if(!r||!n||n.state==='ruin')return L;
  for(const o of L){const m=/^(hoc|luu):(TU\d\d)$/.exec(o.id);if(m&&mrHalf(m[2])){o.l+=mrT('nhoTag');o.d=mrT(mrMem(m[2])?'nhoMemD':'nhoD');}}
  for(const [bid,B] of Object.entries(TU_BI)){if(!B.nghe.some(id=>tuArtOf(id)))continue;if((r.tuBi||{})[bid])continue;
    if(!B.loc.some(c=>mrLocNode(c)===n.id))continue;L.push({id:'bi:'+bid,l:mrT('oBi',[B.n,B.phi,B.ngay]),d:mrT('oBiD.'+bid),no:tuWhyBi(bid)||undefined});}
  if(mrLv('TU21')>=7&&!r.tuKhuy)L.push({id:'khuy',l:mrT('oKhuy',[TU_MR.khuy.tho]),d:mrT('oKhuyD'),no:tuWhyKhuy()||undefined});
  return L;};}
{const _d=tuDo;tuDo=function(n,id){if(id&&id.startsWith('bi:'))return tuBiHoc(id.slice(3));if(id==='khuy')return tuKhuy();return _d.apply(this,arguments);};}
// chết: ghi điều kiếp sau được nhớ (chạy trước các bọc die cũ)
{const _d=die;die=function(){const r=G.run;if(r&&G.meta&&feat('tuMr')){const M=G.meta;delete M.tuMem;delete M.tucMang;const T=tuSt(r);const main=T.chinh&&tuArtOf(T.chinh,r)?T.chinh:null;
    const qi=r.qitems||[];
    if(main&&qi.includes('tuc_tue_dang')&&!(r.arts&&tuOf(arts()))){M.tuMem={id:main,src:'den'};qi.splice(qi.indexOf('tuc_tue_dang'),1);dbg('tumr.mem',{id:main,src:'den'});}
    if(main&&!M.tuMem&&(r.tuBi||{}).bmlq){M.tuMem={id:main,src:'bmlq'};dbg('tumr.mem',{id:main,src:'bmlq'});}
    if(mrLv('TU19',r)>=7){const L=Object.keys(T.k).filter(x=>tuArtOf(x,r)&&x!==(M.tuMem||{}).id&&chance(TU_MR.tucMang));if(L.length){M.tucMang=L;dbg('tumr.tucMang',{L});}}}
  return _d.apply(this,arguments);};}
{const _p=dtPickWhy;dtPickWhy=function(r){const L=_p.apply(this,arguments);r=r||G.run;if(r){if((r.tuBi||{}).lhct)L.push('lhct');if(r.tuKhuy)L.push('khuy');}return L;};}
// ---------- trong trận: khoá chiêu mới ----------
{const _rs=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){const f=(sk&&sk.fx)||{};const t=tg&&tg[0];let m=1,s2=sk;
  if(f.vsF&&t&&t.f===f.vsF[0]){m*=f.vsF[1];dbg('fx.vsF',{t:t.name});}
  let sum=null;if(f.needSum){sum=fxmSum(sc,u,f.needSum);if(!sum){m*=0.5;fxmLog(sc,u,mrT('khongSum'));}dbg(sum?'fx.needSum':'fx.needSum0',{});}
  if(u&&u.isMain&&tuOfSk(sk&&sk.id)==='TU19'&&mrPhatTat()){m*=TU_MR.phatX;dbg('tumr.phatYeu',{});}
  let phan=false;if(f.huyenPhan&&t&&(t.realm||0)>(u.realm||0)){phan=true;s2=Object.assign({},sk,{fx:Object.assign({},f,{stun:0})});}
  const r0=u&&u.isMain&&u.tuRes?(u.tuRes.TU19|0):null;
  if(m!==1)qm=(qm||1)*m;
  const out=_rs.call(this,sc,u,s2,lv,tg,qm,offs);
  if(r0!=null&&u.tuRes&&(u.tuRes.TU19|0)>r0&&G.run&&((G.run.st||0)>TU_MR.phatGiau||mrPhatTat())){u.tuRes.TU19=r0;dbg('tumr.phatGiau',{});}
  if(sum){sum.gone=1;sum.hp=0;sum.phase='down';sc.rev=(sc.rev||0)+1;}
  if(phan&&u.hp>0){u.stunT=STUN_S;fxmLog(sc,u,mrT('phanAo',[fxmWho(u)]));dbg('fx.huyenPhan',{});}
  if(f.mpDrain&&t&&u.hp>0){let g=Math.min(t.mp||0,Math.round((t.maxMp||0)*f.mpDrain/100));if(g>0)t.mp-=g;else g=Math.round((u.maxMp||0)*f.mpDrain/200);
    u.mp=Math.min(u.maxMp||0,(u.mp||0)+g);if(g)fxmLog(sc,u,mrT('phe',[fxmWho(u)]));dbg('fx.mpDrain',{g});}
  if(f.devour&&u.isMain&&t&&t.hp<=0&&G.run){addTv(f.devour);fxmLog(sc,u,mrT('thon'));
    if(chance(TU_MR.thonTam)){G.run.tamma=clamp((G.run.tamma||0)+TU_MR.thonTamV,0,100);fxmLog(sc,u,mrT('thonTam'));}dbg('fx.devour',{v:f.devour});}
  return out;};}
{const _fa=fxmAfter;fxmAfter=function(sc,u,sk,tg,pre){const f=(sk&&sk.fx)||{};let s2=sk;
  if(f.ltCost&&u.isMain){const r=G.run;if((r.st||0)>=f.ltCost){r.st-=f.ltCost;dbg('fx.ltCost',{n:f.ltCost});}
    else{s2=Object.assign({},sk,{fx:Object.assign({},f,{fleeUp:0,blockH:0})});fxmLog(sc,u,mrT('thieuLt'));dbg('fx.ltCost',{thieu:1});}}
  if(f.tho&&u.isMain){mrTho(f.tho);fxmLog(sc,u,mrT('thoLog'));}
  const t=tg&&tg[0];
  if(f.dinh&&t&&t.hp>0&&!t.immune){const d=(t.realm||0)-(u.realm||0);const p=d<0?1:d===0?0.4:0;
    if(p&&chance(p*(t.boss?0.5:1))){t.stunT=STUN_S;if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);t.pos=75;}doneAct(sc,t);fxmLog(sc,u,mrT('dinh',[fxmWho(t)]));}
    else fxmLog(sc,u,mrT('dinh0',[fxmWho(t)]));dbg('fx.dinh',{d});}
  return _fa.call(this,sc,u,s2,tg,pre);};}
{const _st=skillTip;skillTip=function(sk,lv){let s=_st.apply(this,arguments);const f=(sk&&sk.fx)||{};const L=[];
  if(f.vsF)L.push(mrT('tip.vsF',[contentText('tumr.f.'+f.vsF[0]),Math.round((f.vsF[1]-1)*100)]));
  for(const k of ['needSum','dinh','huyenPhan'])if(f[k])L.push(mrT('tip.'+k));
  if(f.mpDrain)L.push(mrT('tip.mpDrain',[f.mpDrain]));if(f.devour)L.push(mrT('tip.devour'));
  if(f.tho)L.push(mrT('tip.tho'));if(f.ltCost)L.push(mrT('tip.ltCost',[f.ltCost]));
  if(L.length){const i=s.lastIndexOf('\n');s=i>=0?s.slice(0,i)+'\n'+L.join('\n')+s.slice(i):s+'\n'+L.join('\n');}
  return s;};}
