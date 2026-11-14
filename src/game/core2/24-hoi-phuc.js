// ================= HỒI PHỤC =================
// Trong trận, mỗi lượt người chơi: hồi theo % mức tối đa, tối thiểu 1 điểm.
//   Nền: phàm nhân 0,5% (chỉ khí huyết), Luyện Khí 0,7%, mỗi đại cảnh giới sau +0,2%. Mỗi nguồn hồi phục (đồ, công pháp) +0,2%.
// Ngoài trận, mỗi tháng: khí huyết và linh lực (linh lực chỉ khi đã tu luyện).
//   Nền: phàm nhân 1,5%, mỗi đại cảnh giới đã đột phá +1%. Mỗi nguồn +0,2%.
//   Cộng dồn: mỗi tháng liên tiếp không bị thương, không mất khí huyết thì hồi thêm 0,2% so với tháng trước (không trần).
//   Bị thương hoặc mất khí huyết thì cộng dồn về 0. Đầy thì không hồi thêm nhưng cộng dồn vẫn tăng.
// Số nguồn ước theo tổng chỉ số hồi phục trên đồ (mỗi dòng hồi khí huyết ~1,5%, hồi linh lực ~3%), tối đa RG_SRC_MAX.
const RG_SRC_MAX=8;
function rgSrc(fx){return {hp:Math.min(RG_SRC_MAX,Math.round((fx.regenHp||0)/1.5)),mp:Math.min(RG_SRC_MAX,Math.round((fx.regenMp||0)/3))};}
function rgTurnRate(){const r=G.run;return isPham()?0.5:0.7+0.2*(r.realm||0);}
function rgMonthRate(){const r=G.run;return isPham()?1.5:2.5+(r.realm||0);}
function regenTurn(u,fx){const n=rgSrc(fx);const b=rgTurnRate();
  let hr=b+0.2*n.hp+(u.st.regen>0?6:0);if(u.st.regen>0)u.st.regen--;
  if(u.hp<u.max)u.hp=Math.min(u.max,u.hp+Math.max(1,Math.round(u.max*hr/100)));
  if(!isPham()&&u.maxMp&&u.mp<u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.max(1,Math.round(u.maxMp*(b+0.2*n.mp)/100)));}
// ngoài trận: thay hồi theo giờ cũ bằng hồi theo tháng
worldStep=function(h){const r=G.run;if(r){worldTick(h/HY);}nodeRecover();};
function rgMark(){const r=G.run;if(!r)return;if(r._hpLast!=null&&r.hp<r._hpLast-0.5)r.rgLost=1;r._hpLast=r.hp;}
function rgMonths(n){const r=G.run;if(!r||n<=0)return;const s=S(),fx=aggFx(),src=rgSrc(fx),base=rgMonthRate();
  for(let i=0;i<n&&G.run;i++){
    if(r.rgLost||injured()){r.rgStreak=0;r.rgLost=0;}else r.rgStreak=(r.rgStreak||0)+1;
    const bon=0.2*r.rgStreak;
    if(r.hp<s.maxHp)r.hp=Math.min(s.maxHp,r.hp+Math.max(1,Math.round(s.maxHp*(base+0.2*src.hp+bon)/100)));
    if(!isPham()&&r.mp<s.maxMp)r.mp=Math.min(s.maxMp,r.mp+Math.max(1,Math.round(s.maxMp*(base+0.2*src.mp+bon)/100)));}
  r._hpLast=r.hp;}
// đếm tháng trôi qua (cả khi bế quan nhiều năm): làm theo vòng lặp có giới hạn, không lặp vô hạn
{const _at=advanceTime;advanceTime=function(h){rgMark();const o=_at.apply(this,arguments);const r=G.run;
  if(r&&h>0&&!(r.scene&&r.scene.type==='combat')){if(r.hp>S().maxHp)r.hp=S().maxHp;r.rgAcc=(r.rgAcc||0)+h;const m=Math.floor(r.rgAcc/HM);
    if(m>0){r.rgAcc-=m*HM;rgMonths(Math.min(m,1200));dbg('regen.month',{m,streak:r.rgStreak,hp:r.hp});}}
  if(G.run)rgMark();return o;};}
// mất máu trong trận, bị thương: cộng dồn về 0
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);const r=G.run;if(r){const me=sc&&mainUnit(sc);if(me&&me.hp<me.max)r.rgLost=1;r._hpLast=r.hp;}return x;};}
{const _aw=addWound;addWound=function(){const r=G.run;if(r){r.rgLost=1;r.rgStreak=0;}return _aw.apply(this,arguments);};}
function rgInfo(){const r=G.run;const src=rgSrc(aggFx());return {turn:+(rgTurnRate()+0.2*src.hp).toFixed(1),month:+(rgMonthRate()+0.2*src.hp+0.2*(r.rgStreak||0)).toFixed(1),streak:r.rgStreak||0};}
