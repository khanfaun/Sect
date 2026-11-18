// ----- phàm nhân chưa dẫn khí: không có linh lực, không thúc được pháp bảo (từ linh phẩm trở lên), chưa dùng chiêu thức, chưa mở Khí Hải -----
function phamLock(rel){return isPham()&&rel&&(rel.tier||0)>=1&&rel.k!=='book';}
{const _S20=S;S=function(){const s=_S20();if(isPham()){s.maxMp=0;}return s;};}
{const _eq20=equip;equip=function(i){const rel=G.run.relics[i];if(phamLock(rel)){note(contentText("core2_10-pham-nhan-chua-dan_js.001"));return;}return _eq20(i);};}
{const _et20=equipTo;equipTo=function(i,s){const rel=G.run.relics[i];if(phamLock(rel)){note(contentText("core2_10-pham-nhan-chua-dan_js.002"));return;}return _et20(i,s);};}
{const _ea20=eqAuto;eqAuto=function(){if(!isPham())return _ea20();const r=G.run;const keep=r.relics.filter(x=>!x.seen&&phamLock(x));keep.forEach(x=>x.seen=1);const res=_ea20();keep.forEach(x=>x.seen=1);return res;};}
// trong trận: chỉ đánh thường, thủ thế, đỡ đòn, dùng đồ; chưa có thần thông
{const _pa20=playerAct;playerAct=function(id,t){if(isPham()&&id&&id[0]!=='_')return false;return _pa20(id,t);};}
{const _pu20=playerUlt;playerUlt=function(){if(isPham())return false;return _pu20();};}
// tháo, lắp lại phương tiện
function vehOff(){const r=G.run;const m=mountOf();if(!m)return;if(m.rented){r.rentOff=r.rent;r.rent=null;}else{r.vehOff=r.veh||null;r.veh=null;if(r.mount){r.vehOff=MOUNT.find(x=>x.id===r.mount);r.mount=null;}}note(contentText("core2_10-pham-nhan-chua-dan_js.vehOff.003")+m.n+contentText("core2_10-pham-nhan-chua-dan_js.vehOff.004"));}
function vehOn(){const r=G.run;if(r.vehOff){r.veh=r.vehOff;r.vehOff=null;return true;}if(r.rentOff&&r.rentOff.until>W().t){r.rent=r.rentOff;r.rentOff=null;return true;}return false;}

// ================= ĐỢT 21: TÂM PHÁP LÀ CON TÀU =================
// Mọi việc tu luyện (bế quan, thổ nạp, mọi nguồn tu vi) đều cần một tâm pháp đang vận hành.
// Phàm nhân: tâm pháp đã học tự chạy ở ô dẫn khí (Khí Hải chưa mở). Từ Luyện Khí: tâm pháp phải nằm trong Khí Hải.
// Phẩm tâm pháp quyết định tốc độ tu luyện và cảnh giới tối đa nó đưa tới được (phàm phẩm: tới Luyện Khí viên mãn).
// Hệ trùng linh căn: nhanh thêm 10%.
// Có tâm pháp đầu tiên: xuất thân gia truyền, bái nhập tông môn, mua bản chép tay ở tạp hóa, cao nhân truyền dạy,
// kỳ ngộ, khắc vào chân linh từ kiếp trước (Bến Vong Xuyên), tự ngộ (ngộ tính từ 14).
// Bảo đảm: phàm nhân không bao giờ quá 5 năm mà chưa có tâm pháp; từ năm thứ nhất cơ hội gặp cao nhân tăng dần,
// tới 4 năm rưỡi gặp chắc chắn ngay khi rảnh, tròn 5 năm thì được truyền thẳng dù đang làm gì.
// Bảng TU_M, TP_Y: content/rules/tu-m.js
function tpMax(a){return clamp(a.tier,0,5);}
function tuOf(L){return L.filter(a=>a&&a.type==='tp').sort((x,y)=>y.tier-x.tier)[0]||null;}
function tuArt(){const r=G.run;if(!r)return null;run2();return tuOf(isPham()?arts():activeArts());}
function tuMul(){const a=tuArt();if(!a)return 0;const r=G.run;return TU_M[clamp(a.tier,0,6)]*(a.el!=='vo'&&r.root.els.includes(a.el)?1.1:1);}
function hasTp(){const r=G.run;return arts().some(a=>a.type==='tp')||r.relics.some(x=>x.k==='book'&&x.art&&x.art.type==='tp');}
function tuWhy(){if(tuArt())return '';return arts().some(a=>a.type==='tp')?contentText("core2_10-pham-nhan-chua-dan_js.tuWhy.005"):contentText("core2_10-pham-nhan-chua-dan_js.tuWhy.006");}
function tuCapWhy(){const r=G.run;const a=tuArt();if(!a||isPham())return '';return tpMax(a)<r.realm+1?a.n+' ('+PHAM[a.tier]+contentText("core2_10-pham-nhan-chua-dan_js.tuCapWhy.007")+REALM[tpMax(a)]+contentText("core2_10-pham-nhan-chua-dan_js.tuCapWhy.008")+REALM[clamp(r.realm+1,0,5)]+contentText("core2_10-pham-nhan-chua-dan_js.tuCapWhy.009")+PHAM[r.realm+1]+contentText("core2_10-pham-nhan-chua-dan_js.tuCapWhy.010"):'';}
{const _br21=bqRate;bqRate=function(){return _br21()*tuMul();};}
{const _tn21=thonapPct;thonapPct=function(){return _tn21()*tuMul();};}
{const _bn21=bqNeedY;bqNeedY=function(){return bqReal()>0?_bn21():99;};}
{const _bc21=bqCan;bqCan=function(){return _bc21()||tuWhy();};}
{const _at21=addTv;addTv=function(x){const r=G.run;if(r&&x>0&&!tuArt()){G._tvLost=1;return;}return _at21(x);};}
{const _ae21=applyE;applyE=function(e,v){G._tvLost=0;const was=G.run&&G.run.flags&&G.run.flags.tongmon;const ch=_ae21(e,v);
  if(G.run&&Array.isArray(ch)){if(G._tvLost&&e&&e.tv>0)ch.push(chip('✨',contentText("core2_10-pham-nhan-chua-dan_js.011"),contentText("core2_10-pham-nhan-chua-dan_js.012"),'dn'));
    if(!was&&G.run.flags.tongmon){const c=tpSect();if(c)ch.push(c);}}G._tvLost=0;return ch;};}
{const _cb21=canBreak;canBreak=function(){return _cb21()&&!tuCapWhy()&&!!tuArt();};}
// học thẳng một tâm pháp (truyền khẩu, tự ngộ): vào sở học và ô vận hành ngay
function tpLearn(tier,o){const r=run2();o=o||{};const a=genArt('tp',tier,null,{req:0,el:o.el});if(o.n)a.n=o.n;a.req=0;a.lines[0]={fx:'tvP',v:6+3*a.tier,n:contentText("core2_10-pham-nhan-chua-dan_js.tpLearn.013"),d:contentText("core2_10-pham-nhan-chua-dan_js.tpLearn.014")};
  a.lines.forEach((x,i)=>{x.req=i?Math.max(x.req||0,0):0;});a.src=o.src||'';r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  syncSkills();log(contentText("core2_10-pham-nhan-chua-dan_js.tpLearn.015")+a.n+(o.src?' ('+o.src+')':'')+'.');saveSoon();return a;}
function tpChip(a){return chip('📖',a.n,PHAM[a.tier]+contentText("core2_10-pham-nhan-chua-dan_js.tpChip.016")+numFx(TU_M[a.tier]),'item');}
function tpSect(){const r=G.run;if(r.flags.sectTp)return null;r.flags.sectTp=1;const a=tpLearn(1,{el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:contentText("core2_10-pham-nhan-chua-dan_js.tpSect.017")});a.n=pick(RELIC_PRE[a.el]||RELIC_PRE.vo)+contentText("core2_10-pham-nhan-chua-dan_js.tpSect.018");return tpChip(a);}
// bỏ tâm pháp tự cấp cho mọi kiếp; xuất thân gia truyền, ký ức kiếp trước
// Bảng TP_ORIGIN: content/characters/tp-origin.js
for(const id in TP_ORIGIN){const o=ORIGIN.find(x=>x.id===id);if(o)o.d+=contentText("core2_10-pham-nhan-chua-dan_js.019");}
// (Đ2.6) bỏ nâng cấp Ký ức tâm pháp: đầu thai quên sạch (HN A.16). Điểm đã mua được hoàn ở migrateX (core2/37).
{const _nr21=newRun;newRun=function(c){const res=_nr21(c);const r=G.run;if(!r||!r.pham)return res;run2();
  const old=r.arts.filter(a=>a.start).map(a=>a.u);r.arts=r.arts.filter(a=>!a.start);for(let j=0;j<8;j++)if(r.chu[j]&&old.includes(r.chu[j].u))r.chu[j]=null;
  const og=TP_ORIGIN[r.origin];const mem=G.meta.tpMem,k=U('kytp');
  if(og!=null){const a=tpLearn(og,{src:contentText("core2_10-pham-nhan-chua-dan_js.022")});if(r.origin==='tran')a.lines[0].v+=4;}
  else if(mem&&k){const t=k>=2?Math.min(mem.tier,2):Math.min(Math.max(0,mem.tier-1),1);tpLearn(t,{n:mem.n,el:mem.el,src:contentText("core2_10-pham-nhan-chua-dan_js.023")});}
  syncSkills();const s=S();r.hp=s.maxHp;r.mp=s.maxMp;return res;};}
// tạp hóa: còn chưa có tâm pháp thì luôn bày một bản chép tay rẻ
{const _se21=shopExtra;shopExtra=function(items,n){_se21(items,n);const r=G.run;if(!isPham()||hasTp())return;const a=genArt('tp',0,null,{req:0,el:'vo'});a.n=contentText("core2_10-pham-nhan-chua-dan_js.024");a.lines[0]={fx:'tvP',v:4,n:contentText("core2_10-pham-nhan-chua-dan_js.025"),d:contentText("core2_10-pham-nhan-chua-dan_js.026")};a.lines.forEach(x=>x.req=0);
  items.unshift({k:'relic',rel:bookOf(a),p:price(15)});};}
// cao nhân, tự ngộ, lão nhân: kỳ ngộ riêng, không rơi vào vòng ngẫu nhiên
// Kỳ ngộ/hộp thoại: content/events/opportunities/.
{const _adv21=advanceTime;advanceTime=function(h){const o=_adv21(h);const r=G.run;if(!r||!r.pham||!(h>0)||isVo(r))return o; // vô căn: không có tâm pháp bảo đảm (Đ2.3)
 if(hasTp()){r.tpAcc=0;return o;}
  r.tpAcc=(r.tpAcc||0)+h;const y=r.age-r.birthAge;const free=()=>!r.scene&&G.screen==='map';
  if(y>=TP_Y-0.5&&free()){kyStart(tpGuarPick());r.tpAcc=0;return o;}
  while(r.tpAcc>=HM&&G.run&&!hasTp()){r.tpAcc-=HM;
    if(S().ngo>=14&&chance(.03)){const a=tpLearn(0,{n:contentText("core2_10-pham-nhan-chua-dan_js.027"),el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:contentText("core2_10-pham-nhan-chua-dan_js.028")});tpPop(a,contentText("core2_10-pham-nhan-chua-dan_js.029"),contentText("core2_10-pham-nhan-chua-dan_js.030"));break;}
    if(y>=1&&free()&&chance(.04+.03*y)){const candidate=KYNGO.find(x=>x.id==='tp_ansi');if(!candidate.content||contentTriggerOk(candidate.content))kyStart(candidate);break;}}
  if(G.run&&!hasTp()&&y>=TP_Y){const v=tpGuarPick();const a=tpGuarLearn(v);tpPop(a,v.n,v.pop);}
  return o;};}
function tpPop(a,title,text){note(text+contentText("core2_10-pham-nhan-chua-dan_js.tpPop.031")+a.n+'.','up');G.qpop=G.qpop||[];G.qpop.push({kind:'done',text:a.n,grade:a.tier+1,ch:[tpChip(a)],title});}

// ----- tình huống bảo đảm có tâm pháp: nhiều kiểu gặp gỡ, kiếp sau ưu tiên kiểu chưa gặp -----
// Mỗi tình huống: ai cũng truyền được tâm pháp, chỉ khác cái giá và cái được thêm tùy lựa chọn.
function tpGuarPick(){const M=G.meta;const all=KYNGO.filter(x=>x.g&&(!x.content||contentTriggerOk(x.content)));const seen=M.tpSeen||(M.tpSeen=[]);let L=all.filter(x=>!seen.includes(x.id));if(!L.length){M.tpSeen=seen.slice(-2);L=all.filter(x=>!M.tpSeen.includes(x.id));}
  if(!L.length)L=all;const v=pick(L);M.tpSeen.push(v.id);return v;}
function tpGuarLearn(v){const sp=v.tp||{n:[contentText("core2_10-pham-nhan-chua-dan_js.tpGuarLearn.032")]};const r=G.run;const el=sp.el==='root'?(pick(r.root.els.filter(e=>EL[e]))||'vo'):sp.el;return tpLearn(0,{n:pick(sp.n),el,src:sp.src||contentText("core2_10-pham-nhan-chua-dan_js.tpGuarLearn.033")});}
function tpGv(id,n,t,pop,tp,c){KYNGO.push({id,sp:1,g:1,n,t,pop,tp,c:c.map(o=>({l:o.l,cost:o.cost,need:o.need,go:()=>{const v=KYNGO.find(x=>x.id===id);const a=tpGuarLearn(v);let ch=[];
  if(o.h){advanceTime(o.h);ch.push(chip('⏳',durH(o.h),contentText("core2_10-pham-nhan-chua-dan_js.tpGv.034"),''));}if(!G.run)return {t:o.t};ch.push(tpChip(a));if(o.fx){const e=Object.assign({},typeof o.fx==='function'?o.fx():o.fx);if(e._st){ch.push(chip('💎',(e._st>0?'+':'')+e._st,contentText("core2_10-pham-nhan-chua-dan_js.tpGv.035"),e._st>0?'up':'dn'));delete e._st;}ch=ch.concat(applyE(e));}if(o.ll)llAdd(o.ll,contentText("core2_10-pham-nhan-chua-dan_js.tpGv.036"),1);return {t:o.t,ch};}}))});}
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
// Nội dung truyền tâm pháp: content/events/opportunities/intro.json.
