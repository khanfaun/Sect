// ================= TÂM MA VÀ ĐẠO TÂM =================
// Đạo tâm thấp, tâm ma cao thì tâm ma tìm đến nhiều hơn (kiểm mỗi tháng, cách nhau ít nhất TM_CD tháng).
// Hai dạng: ảo giác thành trận đánh với Tâm Ma, hoặc lời dụ dỗ làm việc xấu.
// Chống được: đạo tâm tăng, tâm ma giảm. Nghe theo: được lợi trước mắt, nhân quả nghiêng về ác, tâm ma tăng.
const TM_CD=6;
function tmChance(){const r=G.run,s=S();return clamp((12-(s.tam||10))*0.012+(r.tamma||0)*0.002,0,0.15);}
function tmGain(tam,tamma){const r=G.run;if(tam)r.base.tam=(r.base.tam||0)+tam;r.tamma=Math.max(0,(r.tamma||0)+tamma);}
// lời dụ dỗ: dùng khung kỳ ngộ có sẵn (sp:1 để không lẫn vào kỳ ngộ ngẫu nhiên)
// Kỳ ngộ/hộp thoại: content/events/opportunities/.
function tmVisit(){const r=G.run;if(!r||r.scene||G.screen!=='map'||r.moving||isPham())return false;
  if(W().t-(r.tmT||-1e9)<TM_CD*HM)return false;if(!chance(tmChance()))return false;r.tmT=W().t;dbg('tamma.visit',{tam:S().tam,tamma:r.tamma});
  if(chance(.5)){r._tmFight=1;startCombat({k:'tamma'},{kind:'node'});const sc=G.run.scene;if(sc){sc.tmVision=1;clog(sc,contentText("core2_27-tam-ma_js.tmVisit.001"),'en');}}
  else kyStart(pick(KYNGO.filter(x=>x.id.startsWith('tm_'))));return true;}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&h>0){r.tmAcc=(r.tmAcc||0)+h;if(r.tmAcc>=HM){r.tmAcc=0;tmVisit();}}return o;};}
// kết quả trận ảo giác
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);const r=G.run;
  if(r&&sc&&sc.tmVision&&!sc._tmDone){sc._tmDone=1;if(sc.over==='win'){tmGain(1,-8);clog(sc,contentText("core2_27-tam-ma_js.002"),'win');}else{tmGain(0,6);clog(sc,contentText("core2_27-tam-ma_js.003"),'en');}dbg('tamma.fight',{over:sc.over});}return x;};}
