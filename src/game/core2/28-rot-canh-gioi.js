// ================= RỚT CẢNH GIỚI VĨNH VIỄN VÀ THỌ CẠN =================
// realmDrop(lý do): tụt một đại cảnh giới (Luyện Khí thì về phàm nhân: không dùng được linh lực).
// Thọ nguyên tối đa giảm theo cảnh giới mới. Nếu tuổi đã chạm thọ nguyên: cho chọn
//   - chết ngay, hoặc
//   - sống tạm: mỗi tháng mất TC_LOSS% khí huyết tối đa, tới khi cạn thì chết. Đan, công pháp, đồ tăng khí huyết tối đa kéo dài thêm.
// Hiện có một nguồn gây rớt: thua ảo giác tâm ma khi tâm ma từ TC_TAMMA trở lên (tẩu hỏa nhập ma).
const TC_LOSS=4,TC_TAMMA=80;
function realmDrop(why){const r=G.run;if(!r)return false;
  if(r.pham)return false;
  if(r.realm>0){r.realm--;r.tv=60;r.sg=null;}else{r.pham=1;r.tv=0;r.mp=0;}
  r.realmDrop=(r.realmDrop||0)+1;clampHp();log('Rớt cảnh giới'+(why?' ('+why+')':'')+': còn '+realmLabel()+'.');note('Rớt cảnh giới! Còn '+realmLabel()+'.','dn');
  bio(`Năm ${Math.floor(r.age)} tuổi, ${why||'tu vi tan rã'}, rớt xuống ${realmLabel()}.`);dbg('realm.drop',{why,realm:r.realm,pham:r.pham,life:S().life,age:Math.floor(r.age)});
  if(r.age>=S().life)thoCan();return true;}
// lựa chọn khi thọ cạn: dùng khung kỳ ngộ (sp:1)
KYNGO.push({id:'tho_can',sp:1,n:'Thọ nguyên đã cạn',t:'Cảnh giới tụt xuống, thọ nguyên co lại theo. Ngươi cảm thấy sinh cơ trong người đang tắt dần như ngọn đèn cạn dầu.',
  c:[{l:'Buông tay, nhắm mắt',cost:'chết ngay',go:()=>{const r=G.run;r._tcPend=0;r._tcDie=1;setTimeout0(()=>{if(G.run)die('toahoa');});return {t:'Ngươi thở ra một hơi dài, rồi không hít vào nữa.'};}},
     {l:'Cưỡng ép giữ mạng',cost:'mỗi tháng mất '+TC_LOSS+'% khí huyết tối đa tới khi chết',go:()=>{const r=G.run;r._tcPend=0;r.borrow={loss:0,t0:W().t};dbg('tho.borrow',{});return {t:'Ngươi đốt tinh huyết, níu kéo từng hơi thở. Mỗi tháng trôi qua, thân thể lại khô héo thêm.'};}}]});
function setTimeout0(f){if(typeof setTimeout==='function')setTimeout(f,0);else f();}
function thoCan(){const r=G.run;if(!r||r.borrow||r._tcPend)return;r._tcPend=1;kyStart(KYNGO.find(x=>x.id==='tho_can'));}
// tọa hóa: nếu vì rớt cảnh giới thì hỏi trước; đang sống tạm thì không chết vì tuổi mà chết vì cạn khí huyết
{const _d=die;die=function(cause){const r=G.run;
  if(cause==='toahoa'&&r&&!r._tcDie&&r.realmDrop){if(r.borrow)return;if(!r._tcPend){thoCan();}return;}
  return _d.apply(this,arguments);};}
{const _agg=aggFx;aggFx=function(){const fx=_agg();const r=G.run;if(r&&r.borrow)fx.hpP=(fx.hpP||0)-r.borrow.loss;return fx;};}
function borrowTick(m){const r=G.run;if(!r||!r.borrow)return;
  if(r.age<S().life){r.borrow=null;note('Thọ nguyên đã đủ lại, không còn phải đốt tinh huyết.','up');return;} // đột phá lại được hoặc dùng đan tăng thọ
  r.borrow.loss+=TC_LOSS*m;const fx=aggFx();clampHp();dbg('tho.loss',{loss:r.borrow.loss,hpP:fx.hpP});
  if((fx.hpP||0)<=-95||S().maxHp<=1){r._tcDie=1;die('toahoa');}}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;
  if(r&&r.borrow&&h>0){r.bAcc=(r.bAcc||0)+h;const m=Math.floor(r.bAcc/HM);if(m>0){r.bAcc-=m*HM;borrowTick(m);}}return o;};}
// đang sống tạm: không bế quan dài
{const _bc=bqCan;bqCan=function(){const r=G.run;if(r&&r.borrow)return 'Đang đốt tinh huyết giữ mạng, không thể bế quan.';return _bc();};}
// nguồn rớt: thua ảo giác tâm ma khi tâm ma quá nặng
{const _fc=finishCombat;finishCombat=function(sc){const x=_fc.apply(this,arguments);const r=G.run;
  if(r&&sc&&sc.tmVision&&sc.over!=='win'&&!sc._tmDrop&&(r.tamma||0)>=TC_TAMMA){sc._tmDrop=1;realmDrop('tẩu hỏa nhập ma');}return x;};}
