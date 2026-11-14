// ================= TÂM MA VÀ ĐẠO TÂM =================
// Đạo tâm thấp, tâm ma cao thì tâm ma tìm đến nhiều hơn (kiểm mỗi tháng, cách nhau ít nhất TM_CD tháng).
// Hai dạng: ảo giác thành trận đánh với Tâm Ma, hoặc lời dụ dỗ làm việc xấu.
// Chống được: đạo tâm tăng, tâm ma giảm. Nghe theo: được lợi trước mắt, nhân quả nghiêng về ác, tâm ma tăng.
const TM_CD=6;
function tmChance(){const r=G.run,s=S();return clamp((12-(s.tam||10))*0.012+(r.tamma||0)*0.002,0,0.15);}
function tmGain(tam,tamma){const r=G.run;if(tam)r.base.tam=(r.base.tam||0)+tam;r.tamma=Math.max(0,(r.tamma||0)+tamma);}
// lời dụ dỗ: dùng khung kỳ ngộ có sẵn (sp:1 để không lẫn vào kỳ ngộ ngẫu nhiên)
KYNGO.push(
 {id:'tm_du',sp:1,n:'Tâm ma thì thầm',t:'Đêm khuya, một giọng nói vang lên trong đầu ngươi, giọng của chính ngươi: “Lão già bán thuốc dưới chân núi giàu lắm. Giết lão, lấy hết, ai biết được?”',
  c:[{l:'Định thần, xua nó đi',cost:'cần đạo tâm vững',go:()=>{const ok=R()<clamp(0.35+(S().tam-10)*0.05,0.1,0.95);if(ok){tmGain(1,-6);return {t:'Ngươi ngồi thẳng lưng, thở đều. Giọng nói tắt dần như ngọn nến trước gió. Lòng sáng hơn một chút.',ch:[chip('🪷','đạo tâm +1','Chống được tâm ma','up'),chip('🌑','tâm ma −6','','up')]};}
      tmGain(0,4);return {t:'Ngươi cố xua nhưng giọng nói cứ bám riết tới sáng. Đầu nặng trĩu.',ch:[chip('🌑','tâm ma +4','Không xua được','dn')]};}},
     {l:'Nghe theo',cost:'nhân quả xấu đi, tâm ma tăng',go:()=>{const r=G.run;const g=price(40);r.st+=g;r.karma=(r.karma||0)-6;tmGain(0,8);return {t:'Sáng hôm sau, trong tay ngươi có một túi linh thạch nặng trĩu. Ngươi không nhớ rõ đêm qua đã làm gì.',ch:[chip('💎','+'+g,'Linh thạch','up'),chip('⚖️','nhân quả −6','Nghiêng về ác','dn'),chip('🌑','tâm ma +8','','dn')]};}}]},
 {id:'tm_quyen',sp:1,n:'Tâm ma dụ dỗ',t:'Trong mơ, ngươi thấy mình ngồi trên ngai cao, vạn người quỳ lạy. Một bóng đen thì thầm: “Chỉ cần uống máu kẻ yếu, ngươi sẽ có tất cả.”',
  c:[{l:'Tỉnh lại, giữ vững bản tâm',cost:'cần đạo tâm vững',go:()=>{const ok=R()<clamp(0.35+(S().tam-10)*0.05,0.1,0.95);if(ok){tmGain(1,-6);return {t:'Ngươi bừng tỉnh, mồ hôi ướt đẫm. Nhưng tâm cảnh vững vàng hơn trước.',ch:[chip('🪷','đạo tâm +1','Chống được tâm ma','up')]};}tmGain(0,4);return {t:'Giấc mơ cứ lặp đi lặp lại. Ngươi tỉnh dậy mệt mỏi.',ch:[chip('🌑','tâm ma +4','','dn')]};}},
     {l:'Đón nhận',cost:'nhân quả xấu đi, tâm ma tăng',go:()=>{const r=G.run;r.karma=(r.karma||0)-5;tmGain(0,8);return {t:'Một luồng sức mạnh lạnh lẽo chảy vào kinh mạch. Ngươi thấy mình mạnh hơn, và lạnh hơn.',ch:applyE({tv:6,tvMajor:1}).concat([chip('⚖️','nhân quả −5','Nghiêng về ác','dn'),chip('🌑','tâm ma +8','','dn')])};}}]});
function tmVisit(){const r=G.run;if(!r||r.scene||G.screen!=='map'||r.moving||isPham())return false;
  if(W().t-(r.tmT||-1e9)<TM_CD*HM)return false;if(!chance(tmChance()))return false;r.tmT=W().t;dbg('tamma.visit',{tam:S().tam,tamma:r.tamma});
  if(chance(.5)){r._tmFight=1;startCombat({k:'tamma'},{kind:'node'});const sc=G.run.scene;if(sc){sc.tmVision=1;clog(sc,'Trước mắt nhoè đi. Từ bóng tối bước ra một kẻ mang khuôn mặt của chính ngươi.','en');}}
  else kyStart(pick(KYNGO.filter(x=>x.id.startsWith('tm_'))));return true;}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&h>0){r.tmAcc=(r.tmAcc||0)+h;if(r.tmAcc>=HM){r.tmAcc=0;tmVisit();}}return o;};}
// kết quả trận ảo giác
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);const r=G.run;
  if(r&&sc&&sc.tmVision&&!sc._tmDone){sc._tmDone=1;if(sc.over==='win'){tmGain(1,-8);clog(sc,'Ảo giác tan biến. Đạo tâm +1, tâm ma giảm.','win');}else{tmGain(0,6);clog(sc,'Ngươi bừng tỉnh, người đầy mồ hôi lạnh. Tâm ma tăng.','en');}dbg('tamma.fight',{over:sc.over});}return x;};}
