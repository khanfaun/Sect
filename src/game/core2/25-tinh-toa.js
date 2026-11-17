// ================= TĨNH TOẠ =================
// Ngồi yên dưỡng thân: không tăng tu vi, hồi khí huyết, linh lực nhanh gấp TT_MUL lần bình thường, giảm nhẹ tâm ma.
// Đổi lại thời gian trôi (mất tuổi thọ). Làm ở đâu cũng được trừ tử địa.
const TT_MUL=3,TT_MAXM=120;
function ttWhy(){const r=G.run;if(!r)return contentText("core2_25-tinh-toa_js.ttWhy.001");if(r.moving)return contentText("core2_25-tinh-toa_js.ttWhy.002");if(dangerTag(curNode())>=3)return contentText("core2_25-tinh-toa_js.ttWhy.003");return '';}
function ttLeftM(){const r=G.run;return Math.max(0,Math.floor((S().life-r.age)*12));}
function ttPreview(m){const r=G.run,s=S();const rate=rgMonthRate()*TT_MUL;const hp=Math.min(s.maxHp-r.hp,Math.round(s.maxHp*rate*m/100));
  const mp=isPham()?0:Math.min(s.maxMp-r.mp,Math.round(s.maxMp*rate*m/100));return {hp:Math.max(0,hp),mp:Math.max(0,mp),tamma:Math.min(r.tamma||0,Math.floor(m*0.3)),over:m>=ttLeftM()};}
function tinhToa(m){const r=G.run;m=Math.max(1,Math.min(TT_MAXM,Math.round(+m||0)));if(ttWhy())return false;
  if(!r.scene)openPlace(r.at);const P=ttPreview(m);const s=S();
  advanceTime(m*HM);if(!G.run)return true;   // tọa hóa giữa chừng thì thôi
  const g=G.run;const extra=(TT_MUL-1)*rgMonthRate()*m/100;
  g.hp=Math.min(s.maxHp,g.hp+Math.round(s.maxHp*extra));if(!isPham())g.mp=Math.min(s.maxMp,g.mp+Math.round(s.maxMp*extra));
  g.tamma=Math.max(0,(g.tamma||0)-P.tamma);
  log(contentText("core2_25-tinh-toa_js.tinhToa.004")+durH(m*HM)+'.');note(contentText("core2_25-tinh-toa_js.tinhToa.005")+durH(m*HM)+contentText("core2_25-tinh-toa_js.tinhToa.006"),'up');dbg('tinhtoa',{m,hp:g.hp,tamma:g.tamma});return true;}
