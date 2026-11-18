// ĐỢT 1.6: Thiên kiếp công bằng (HN A.5) — nghiệp chướng làm kiếp dữ hơn nhưng vượt được thì tôi thể. Đọc theo BẬC (NQ_BAC, content/rules/nghiep.js).
function nqK(){return NQ_BAC_KIEP[ngBacB()]||1;}           // sức kiếp
function nqKiepBonus(){return NQ_BAC_KBON[ngBacB()]||0;}   // thưởng khi vượt (trần 10%)
{const _kh=kiepHit;kiepHit=function(sc,k,off){if(feat('nq')&&sc&&sc.kiep){const m=1+0.75*(nqK()-1);sc.kiep.uy=(sc.kiep.uy||1)*m;if(m>1)dbg('nq.kiep',{m});}return _kh.apply(this,arguments);};}
{const _bf=btFinish;btFinish=function(){const r=G.run,to=r&&r.bt&&r.bt.to;const res=_bf.apply(this,arguments);const r2=G.run;
  if(feat('nq')&&r2&&to&&to<5&&!(r2.kiepBon||{})[to]){const b=nqKiepBonus();if(b>0){r2.kiepBon=r2.kiepBon||{};r2.kiepBon[to]=1;const x=Math.round(b*100);
    r2.bon.hpP+=x;r2.bon.atkP+=x;r2.bon.defP+=x;const sc=r2.scene;if(sc&&sc.chips)sc.chips.push(chip('🔥',contentText('nq.kiep.bon'),contentText('nq.kiep.bonTip'),'up'));dbg('nq.kiepBon',{to,x});}}
  return res;};}
// lời báo trước kiếp (không số)
function nqKiepWarn(){return feat('nq')&&ngB()>=15?contentText('nq.kiep.warn'):'';}
