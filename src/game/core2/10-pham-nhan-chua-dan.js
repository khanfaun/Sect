// ----- phàm nhân chưa dẫn khí: không có linh lực, không thúc được pháp bảo (từ linh phẩm trở lên), chưa dùng chiêu thức, chưa mở Khí Hải -----
function phamLock(rel){return isPham()&&rel&&(rel.tier||0)>=1&&rel.k!=='book';}
{const _S20=S;S=function(){const s=_S20();if(isPham()){s.maxMp=0;}return s;};}
{const _eq20=equip;equip=function(i){const rel=G.run.relics[i];if(phamLock(rel)){note('Phàm nhân chưa có linh lực, không thúc được pháp bảo này. Dẫn khí nhập thể rồi hãy dùng.');return;}return _eq20(i);};}
{const _et20=equipTo;equipTo=function(i,s){const rel=G.run.relics[i];if(phamLock(rel)){note('Phàm nhân chưa có linh lực, không thúc được pháp bảo này. Dẫn khí nhập thể rồi hãy dùng.');return;}return _et20(i,s);};}
{const _ea20=eqAuto;eqAuto=function(){if(!isPham())return _ea20();const r=G.run;const keep=r.relics.filter(x=>!x.seen&&phamLock(x));keep.forEach(x=>x.seen=1);const res=_ea20();keep.forEach(x=>x.seen=1);return res;};}
// trong trận: chỉ đánh thường, thủ thế, đỡ đòn, dùng đồ; chưa có thần thông
{const _pa20=playerAct;playerAct=function(id,t){if(isPham()&&id&&id[0]!=='_')return false;return _pa20(id,t);};}
{const _pu20=playerUlt;playerUlt=function(){if(isPham())return false;return _pu20();};}
// tháo, lắp lại phương tiện
function vehOff(){const r=G.run;const m=mountOf();if(!m)return;if(m.rented){r.rentOff=r.rent;r.rent=null;}else{r.vehOff=r.veh||null;r.veh=null;if(r.mount){r.vehOff=MOUNT.find(x=>x.id===r.mount);r.mount=null;}}note('Đã tháo '+m.n+'. Chạm ô phương tiện để dùng lại.');}
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
const TU_M=[0.7,1,1.25,1.5,1.8,2.1,2.5],TP_Y=5;
function tpMax(a){return clamp(a.tier,0,5);}
function tuOf(L){return L.filter(a=>a&&a.type==='tp').sort((x,y)=>y.tier-x.tier)[0]||null;}
function tuArt(){const r=G.run;if(!r)return null;run2();return tuOf(isPham()?arts():activeArts());}
function tuMul(){const a=tuArt();if(!a)return 0;const r=G.run;return TU_M[clamp(a.tier,0,6)]*(a.el!=='vo'&&r.root.els.includes(a.el)?1.1:1);}
function hasTp(){const r=G.run;return arts().some(a=>a.type==='tp')||r.relics.some(x=>x.k==='book'&&x.art&&x.art.type==='tp');}
function tuWhy(){if(tuArt())return '';return arts().some(a=>a.type==='tp')?'Chưa vận hành tâm pháp nào trong Khí Hải: linh khí vào thân rồi lại tản mất.':'Chưa có tâm pháp tu luyện: không biết cách dẫn linh khí vào thân. Tìm ở tạp hóa, tông môn, cao nhân, hoặc chờ cơ duyên.';}
function tuCapWhy(){const r=G.run;const a=tuArt();if(!a||isPham())return '';return tpMax(a)<r.realm+1?a.n+' ('+PHAM[a.tier]+') chỉ đưa tới '+REALM[tpMax(a)]+' viên mãn. Muốn lên '+REALM[clamp(r.realm+1,0,5)]+' phải có tâm pháp '+PHAM[r.realm+1]+' trở lên đang vận hành.':'';}
{const _br21=bqRate;bqRate=function(){return _br21()*tuMul();};}
{const _tn21=thonapPct;thonapPct=function(){return _tn21()*tuMul();};}
{const _bn21=bqNeedY;bqNeedY=function(){return bqReal()>0?_bn21():99;};}
{const _bc21=bqCan;bqCan=function(){return _bc21()||tuWhy();};}
{const _at21=addTv;addTv=function(x){const r=G.run;if(r&&x>0&&!tuArt()){G._tvLost=1;return;}return _at21(x);};}
{const _ae21=applyE;applyE=function(e,v){G._tvLost=0;const was=G.run&&G.run.flags&&G.run.flags.tongmon;const ch=_ae21(e,v);
  if(G.run&&Array.isArray(ch)){if(G._tvLost&&e&&e.tv>0)ch.push(chip('✨','linh khí tản mất','Chưa có tâm pháp tu luyện vận hành nên không giữ được tu vi','dn'));
    if(!was&&G.run.flags.tongmon){const c=tpSect();if(c)ch.push(c);}}G._tvLost=0;return ch;};}
{const _cb21=canBreak;canBreak=function(){return _cb21()&&!tuCapWhy()&&!!tuArt();};}
// học thẳng một tâm pháp (truyền khẩu, tự ngộ): vào sở học và ô vận hành ngay
function tpLearn(tier,o){const r=run2();o=o||{};const a=genArt('tp',tier,null,{req:0,el:o.el});if(o.n)a.n=o.n;a.req=0;a.lines[0]={fx:'tvP',v:6+3*a.tier,n:'Tu luyện',d:'Tu vi nhận thêm {v}%'};
  a.lines.forEach((x,i)=>{x.req=i?Math.max(x.req||0,0):0;});a.src=o.src||'';r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  syncSkills();log('Có tâm pháp tu luyện: '+a.n+(o.src?' ('+o.src+')':'')+'.');saveSoon();return a;}
function tpChip(a){return chip('📖',a.n,PHAM[a.tier]+' · tâm pháp · tốc độ tu luyện ×'+numFx(TU_M[a.tier]),'item');}
function tpSect(){const r=G.run;if(r.flags.sectTp)return null;r.flags.sectTp=1;const a=tpLearn(1,{el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:'tông môn truyền'});a.n=pick(RELIC_PRE[a.el]||RELIC_PRE.vo)+' Nhập Môn Tâm Kinh';return tpChip(a);}
// bỏ tâm pháp tự cấp cho mọi kiếp; xuất thân gia truyền, ký ức kiếp trước
const TP_ORIGIN={thegia:1,tran:0,daodong:0,mieu:0};
for(const id in TP_ORIGIN){const o=ORIGIN.find(x=>x.id===id);if(o)o.d+=', có tâm pháp gia truyền';}
UPG.push({id:'kytp',n:'Khắc tâm pháp vào chân linh',i:'🪷',max:2,c:[12,28],d:'Đầu thai nhớ lại tâm pháp tốt nhất kiếp trước: bậc 1 giảm một phẩm (tối đa Hoàng phẩm), bậc 2 giữ nguyên phẩm (tối đa Huyền phẩm)'});
{const _die21=die;die=function(cause,info){const r=G.run;if(r&&r.arts){const a=tuOf(arts());if(a)G.meta.tpMem={n:a.n,tier:a.tier,el:a.el};}return _die21(cause,info);};}
{const _nr21=newRun;newRun=function(c){const res=_nr21(c);const r=G.run;if(!r||!r.pham)return res;run2();
  const old=r.arts.filter(a=>a.start).map(a=>a.u);r.arts=r.arts.filter(a=>!a.start);for(let j=0;j<8;j++)if(r.chu[j]&&old.includes(r.chu[j].u))r.chu[j]=null;
  const og=TP_ORIGIN[r.origin];const mem=G.meta.tpMem,k=U('kytp');
  if(og!=null){const a=tpLearn(og,{src:'gia truyền'});if(r.origin==='tran')a.lines[0].v+=4;}
  else if(mem&&k){const t=k>=2?Math.min(mem.tier,2):Math.min(Math.max(0,mem.tier-1),1);tpLearn(t,{n:mem.n,el:mem.el,src:'ký ức kiếp trước'});}
  syncSkills();const s=S();r.hp=s.maxHp;r.mp=s.maxMp;return res;};}
// tạp hóa: còn chưa có tâm pháp thì luôn bày một bản chép tay rẻ
{const _se21=shopExtra;shopExtra=function(items,n){_se21(items,n);const r=G.run;if(!isPham()||hasTp())return;const a=genArt('tp',0,null,{req:0,el:'vo'});a.n='Dẫn Khí Quyết (chép tay)';a.lines[0]={fx:'tvP',v:4,n:'Tu luyện',d:'Tu vi nhận thêm {v}%'};a.lines.forEach(x=>x.req=0);
  items.unshift({k:'relic',rel:bookOf(a),p:price(15)});};}
// cao nhân, tự ngộ, lão nhân: kỳ ngộ riêng, không rơi vào vòng ngẫu nhiên
KYNGO.push(
 {id:'tp_ansi',sp:1,n:'Ẩn sĩ bên suối',t:'Bên con suối có túp lều tranh. Lão ẩn sĩ chân yếu đang loay hoay với đống củi ướt. Thấy ngươi, lão nheo mắt: “Hậu sinh, thân thể ngươi chưa có lấy một sợi linh khí.”',
  c:[{l:'Ở lại giúp lão ba tháng',cost:'3 tháng',go:()=>{const a=tpLearn(chance(.3)?1:0,{src:'ẩn sĩ truyền'});advanceTime(3*HM);return {t:'Ngươi bổ củi, gánh nước, sắc thuốc cho lão. Tối nào lão cũng đọc cho ngươi vài câu khẩu quyết. Ngày đi, lão chỉ nói: “Nhớ thở cho đúng.”',ch:[chip('⏳','3 tháng','Thời gian trôi qua',''),tpChip(a)].concat(applyE({karma:3}))};}},
     {l:'Đang vội, cáo từ',go:()=>({t:'Lão phẩy tay: “Duyên chưa tới thì thôi.”'})}]},
 {id:'tp_laonhan',sp:1,g:1,pop:'Một lão nhân đi ngang, dừng lại nhìn ngươi rất lâu rồi đọc cho ngươi một bài khẩu quyết.',n:'Lão nhân dưới gốc tùng',t:'Lão nhân áo vải ngồi dưới gốc tùng như đã chờ từ lâu: “Năm năm rồi mà ngươi vẫn chưa biết dẫn khí. Trời không tuyệt đường người. Ngồi xuống đây.”',
  c:[{l:'Ngồi xuống nghe giảng',go:()=>{const a=tpLearn(0,{n:'Dẫn Khí Quyết',src:'lão nhân truyền'});advanceTime(2*HD);return {t:'Lão giảng suốt hai ngày hai đêm, giọng đều như tiếng gió. Lúc ngươi mở mắt, gốc tùng chỉ còn lại một chiếc lá khô.',ch:[chip('⏳','2 ngày','Thời gian trôi qua',''),tpChip(a)]};}},
     {l:'Hỏi lão là ai',go:()=>{const a=tpLearn(0,{n:'Dẫn Khí Quyết',src:'lão nhân truyền'});return {t:'Lão cười: “Người qua đường.” Rồi đọc một mạch khẩu quyết. Ngươi nhớ được hết, như thể đã từng học ở đâu đó.',ch:[tpChip(a)]};}}]},
 {id:'tp_cothu',n:'Thạch thất cổ nhân',t:'Mưa lở một mảng vách núi, lộ ra thạch thất của cổ nhân. Trên bàn đá có một quyển sách lụa, chữ vẫn còn rõ.',
  c:[{l:'Cất quyển sách',go:()=>{const r=G.run;const b=gainBookTp(clamp(r.region+1+(chance(.3)?1:0),1,5));return {t:'Trang đầu ghi: “Người hữu duyên tự học.” Ngươi cẩn thận gói lại.',ch:[chip('📖',b.name,PHAM[b.tier]+'\n'+b.lore,'item')]};}}]}
);
{const _adv21=advanceTime;advanceTime=function(h){const o=_adv21(h);const r=G.run;if(!r||!r.pham||!(h>0))return o;if(hasTp()){r.tpAcc=0;return o;}
  r.tpAcc=(r.tpAcc||0)+h;const y=r.age-r.birthAge;const free=()=>!r.scene&&G.screen==='map';
  if(y>=TP_Y-0.5&&free()){kyStart(tpGuarPick());r.tpAcc=0;return o;}
  while(r.tpAcc>=HM&&G.run&&!hasTp()){r.tpAcc-=HM;
    if(S().ngo>=14&&chance(.03)){const a=tpLearn(0,{n:'Tĩnh Tọa Tự Ngộ Quyết',el:pick(r.root.els.filter(e=>EL[e]))||'vo',src:'tự ngộ'});tpPop(a,'Tự ngộ tâm pháp','Đêm ấy ngồi nhìn trăng, hơi thở bỗng theo một nhịp lạ. Ngươi tự ngộ ra cách dẫn khí.');break;}
    if(y>=1&&free()&&chance(.04+.03*y)){kyStart(KYNGO.find(x=>x.id==='tp_ansi'));break;}}
  if(G.run&&!hasTp()&&y>=TP_Y){const v=tpGuarPick();const a=tpGuarLearn(v);tpPop(a,v.n,v.pop);}
  return o;};}
function tpPop(a,title,text){note(text+' Có tâm pháp: '+a.n+'.','up');G.qpop=G.qpop||[];G.qpop.push({kind:'done',text:a.n,grade:a.tier+1,ch:[tpChip(a)],title});}

// ----- tình huống bảo đảm có tâm pháp: nhiều kiểu gặp gỡ, kiếp sau ưu tiên kiểu chưa gặp -----
// Mỗi tình huống: ai cũng truyền được tâm pháp, chỉ khác cái giá và cái được thêm tùy lựa chọn.
function tpGuarPick(){const M=G.meta;const all=KYNGO.filter(x=>x.g);const seen=M.tpSeen||(M.tpSeen=[]);let L=all.filter(x=>!seen.includes(x.id));if(!L.length){M.tpSeen=seen.slice(-2);L=all.filter(x=>!M.tpSeen.includes(x.id));}
  const v=pick(L);M.tpSeen.push(v.id);return v;}
function tpGuarLearn(v){const sp=v.tp||{n:['Dẫn Khí Quyết']};const r=G.run;const el=sp.el==='root'?(pick(r.root.els.filter(e=>EL[e]))||'vo'):sp.el;return tpLearn(0,{n:pick(sp.n),el,src:sp.src||'được truyền'});}
function tpGv(id,n,t,pop,tp,c){KYNGO.push({id,sp:1,g:1,n,t,pop,tp,c:c.map(o=>({l:o.l,cost:o.cost,need:o.need,go:()=>{const v=KYNGO.find(x=>x.id===id);const a=tpGuarLearn(v);let ch=[];
  if(o.h){advanceTime(o.h);ch.push(chip('⏳',durH(o.h),'Thời gian trôi qua',''));}if(!G.run)return {t:o.t};ch.push(tpChip(a));if(o.fx){const e=Object.assign({},typeof o.fx==='function'?o.fx():o.fx);if(e._st){ch.push(chip('💎',(e._st>0?'+':'')+e._st,'Linh thạch',e._st>0?'up':'dn'));delete e._st;}ch=ch.concat(applyE(e));}if(o.ll)llAdd(o.ll,'đường xa',1);return {t:o.t,ch};}}))});}
tpGv('tp_hoathuong','Hòa thượng hành cước','Một hòa thượng gầy gò, bình bát sứt mẻ, đứng chắn giữa đường. Ông chắp tay: “Thí chủ hít thở rối loạn như ngựa hoang. Để bần tăng chỉ cho một cách thở.”',
  'Một hòa thượng hành cước ghé xin nước, tiện tay chỉ cho ngươi cách điều hòa hơi thở.',{n:['Tĩnh Tâm Thiền Quyết','Bát Nhã Điều Tức Pháp','Thanh Tịnh Tọa Thiền Kinh'],el:'vo',src:'hòa thượng truyền'},
  [{l:'Theo sư phụ đi một đoạn đường',cost:'1 tháng',h:HM,fx:{karma:3,tamma:-6},t:'Suốt một tháng ngươi khất thực, ngủ miếu cùng ông. Tối nào ông cũng ngồi thiền, ngươi ngồi theo. Lúc chia tay, ông chỉ nói: “Tâm yên thì khí tự về.”'},
   {l:'Xin khẩu quyết rồi đi ngay',t:'Ông cười hiền, đọc chậm ba lần. Ngươi nhẩm theo tới khi thuộc làu.'}]);
tpGv('tp_ysu','Nữ y sư giữa làng dịch','Làng bên đường đang có dịch. Một nữ y sư áo xanh chạy đôn chạy đáo giữa các mái nhà. Nàng liếc ngươi: “Thân thể khỏe mạnh mà không có chút linh khí… Phụ ta một tay, ta dạy cho ngươi cách dưỡng khí.”',
  'Một nữ y sư đi ngang, bắt mạch cho ngươi rồi viết lên giấy một bài dưỡng khí quyết.',{n:['Thanh Mộc Dưỡng Sinh Quyết','Hồi Xuân Dưỡng Khí Thiên','Bách Thảo Điều Tức Pháp'],el:'moc',src:'y sư truyền'},
  [{l:'Ở lại phụ chữa bệnh',cost:'10 ngày',h:10*HD,fx:{karma:5},ll:4,t:'Mười ngày sắc thuốc, đun nước, khiêng người. Dịch lui, nàng giữ lời, đêm cuối ngồi dạy ngươi từng nhịp thở.'},
   {l:'Xin học ngay, ta còn đường xa',t:'Nàng thở dài, vẫn viết cho ngươi bài khẩu quyết: “Học được thì nhớ quay lại giúp người.”',fx:{karma:-1}}]);
tpGv('tp_xactu','Xác tu sĩ trong khe núi','Dưới khe núi có một xác người mặc đạo bào đã khô quắt, tay vẫn ôm chặt một quyển sách mỏng trước ngực.',
  'Ngươi tình cờ thấy xác một tu sĩ, trong ngực áo còn quyển tâm pháp nhập môn.',{n:['Huyền Môn Nhập Đạo Thiên','Dẫn Khí Sơ Giải','Vân Du Tâm Pháp'],el:'root',src:'di vật cổ nhân'},
  [{l:'Chôn cất tử tế rồi mới lấy sách',cost:'1 ngày',h:HD,fx:{karma:4,tamma:-2},t:'Ngươi đào huyệt, đắp mộ, cắm một cành cây làm bia. Lúc mở sách, trang đầu ghi: “Người chôn ta, sách này tặng ngươi.”'},
   {l:'Lấy sách, lục luôn túi áo',fx:()=>{const v=ri(2,5);G.run.st+=v;return {karma:-3,tamma:3,_st:v};},t:'Ngươi lấy sách, lại moi được mấy viên linh thạch. Đêm ấy nằm mơ thấy có người đứng nhìn ngươi rất lâu.'}]);
tpGv('tp_mong','Giấc mộng giữa đêm','Đêm ấy ngươi mơ thấy mình ngồi trên đỉnh núi mây. Một bóng người không rõ mặt ngồi đối diện, giọng như tiếng chuông xa: “Nghe cho kỹ, ta chỉ nói một lần.”',
  'Một đêm nằm mộng, có người không rõ mặt giảng cho ngươi một bài khẩu quyết. Tỉnh dậy vẫn nhớ từng chữ.',{n:['Mộng Trung Dẫn Khí Quyết','Vân Đỉnh Tâm Kinh','Thái Hư Mộng Đạo Thiên'],el:'root',src:'mộng truyền'},
  [{l:'Bật dậy chép lại ngay',t:'Ngươi thắp đèn, chép một mạch tới sáng. Đọc lại thấy câu nào cũng đúng.'},
   {l:'Nằm yên, cố mơ tiếp',cost:'3 ngày',h:3*HD,fx:{ngo:1,tamma:2},t:'Ba đêm liền ngươi mơ cùng một giấc mơ. Đêm thứ ba bóng người ấy gật đầu rồi tan đi. Đầu óc ngươi sáng hẳn ra, chỉ là đôi khi giật mình không biết đâu là mộng.'}]);
tpGv('tp_nguong','Ngư ông hát chèo','Bên sông, một ngư ông buông câu, miệng hát bài chèo nghe rất lạ: hít vào ba nhịp, thở ra chín nhịp, lời hát cứ xoáy vào tai ngươi.',
  'Một ngư ông bên sông hát đi hát lại một bài chèo. Nghe mãi ngươi mới biết lời hát là khẩu quyết dẫn khí.',{n:['Thủy Nguyệt Điều Tức Ca','Ngư Ca Dẫn Khí Quyết','Trường Giang Tâm Pháp'],el:'thuy',src:'ngư ông truyền'},
  [{l:'Ngồi câu cá cùng ông tới tối',cost:'nửa ngày',h:12,fx:{tamma:-4},t:'Tới khi mặt trời lặn, ngươi đã hát theo được cả bài. Ông thu cần: “Hát đúng nhịp thì khí tự theo.”'},
   {l:'Hỏi thẳng lời hát là gì',t:'Ông cười khà: “Hỏi thì ta hát chậm lại.” Hát chậm lại ba lần, ngươi nhớ hết.'}]);
tpGv('tp_tantu','Tán tu trọng thương','Bên vệ đường một tán tu mình đầy máu, thều thào: “Đưa ta qua núi… người của chúng đang đuổi… ta không có gì ngoài một quyển tâm pháp.”',
  'Ngươi băng bó cho một tán tu bị thương. Trước khi đi, hắn để lại một quyển tâm pháp nhập môn.',{n:['Liệt Hỏa Luyện Khí Quyết','Kim Cương Dẫn Khí Thiên','Phong Lôi Sơ Thức Pháp'],el:'root',src:'tán tu tặng'},
  [{l:'Cõng hắn qua núi',cost:'7 ngày',h:7*HD,fx:{karma:4},ll:6,t:'Bảy ngày băng rừng, hai lần suýt bị phát hiện. Qua được núi, hắn dúi quyển sách vào tay ngươi: “Ân này ta nhớ.”'},
   {l:'Băng bó rồi đi đường mình',t:'Hắn nhìn ngươi một lúc, rồi vẫn ném cho ngươi quyển sách: “Cầm lấy, ta sợ chết rồi không ai đọc.”'}]);
tpGv('tp_mieuhoang','Vách khắc trong miếu hoang','Mưa to, ngươi chui vào một ngôi miếu hoang trú tạm. Sau tượng thần đổ nát, trên vách đá có khắc chi chít chữ: một bài khẩu quyết dẫn khí.',
  'Trú mưa trong miếu hoang, ngươi đọc được bài khẩu quyết dẫn khí khắc sau tượng thần.',{n:['Hậu Thổ Thạch Bích Quyết','Cổ Miếu Dẫn Khí Văn','Thạch Khắc Tâm Kinh'],el:'tho',src:'vách khắc cổ'},
  [{l:'Thắp hương rồi mới đọc',fx:{karma:2},t:'Ngươi dọn sạch bàn thờ, thắp mấy nén hương cỏ. Đọc tới đâu thuộc tới đó.'},
   {l:'Đọc cả đêm cho thuộc',cost:'1 ngày',h:HD,fx:{ngo:1},t:'Ngươi đọc đi đọc lại tới sáng, còn ngộ ra mấy chỗ người khắc viết sai.'}]);
tpGv('tp_tre','Sách lót chuồng trâu','Đứa bé chăn trâu chìa ra một quyển sách cũ: “Người có bánh không? Đổi cái này. Nhà em lấy lót chuồng, mà chữ đẹp lắm.”',
  'Một đứa bé chăn trâu đổi cho ngươi quyển sách lót chuồng. Mở ra mới biết là một bài tâm pháp.',{n:['Dẫn Khí Quyết (bản cũ)','Mục Đồng Tâm Pháp','Thanh Ngưu Điều Tức Thiên'],el:'vo',src:'đổi được'},
  [{l:'Đổi bánh lấy sách',t:'Thằng bé cầm bánh chạy biến. Quyển sách hơi mùi trâu, nhưng chữ vẫn đọc được.'},
   {l:'Cho thêm ít tiền',need:()=>G.run.st>=1?'':'Không có linh thạch',fx:()=>{G.run.st=Math.max(0,G.run.st-1);return {karma:3,_st:-1};},t:'Ngươi dúi thêm cho nó một viên linh thạch. Nó tròn mắt, chạy về khoe cả làng.'}]);
tpGv('tp_kyuc','Ký ức chợt về','Đi ngang một khúc sông, ngươi bỗng đứng sững: cảnh này đã từng thấy. Trong đầu vang lên một bài khẩu quyết, như của ai đó, mà cũng như của chính mình.',
  'Một hôm đi ngang khúc sông quen lạ, trong đầu ngươi bỗng vang lên một bài khẩu quyết từ kiếp nào.',{n:['Túc Tuệ Dẫn Khí Quyết','Luân Hồi Tâm Ấn','Vong Xuyên Tàn Thiên'],el:'root',src:'ký ức kiếp trước'},
  [{l:'Nhắm mắt nhớ lại',t:'Từng câu hiện lên rõ dần. Ngươi không biết mình đã học nó ở đâu, chỉ biết là đúng.'},
   {l:'Ngồi bên sông cả ngày',cost:'1 ngày',h:HD,fx:{tam:1},t:'Ngươi ngồi tới khi trăng lên. Bài khẩu quyết đã thuộc, lòng cũng yên hẳn.'}]);
