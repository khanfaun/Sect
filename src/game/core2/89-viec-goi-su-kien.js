// Việc ở địa điểm gọi thẳng một sự kiện (Cổng sơn môn → cong_son_mon, Quỷ thị → quy_thi).
// Lỗi cũ: sự kiện có bộ lọc "gặp ngẫu nhiên" (cấp vùng, loại nơi, giờ) và thời gian chờ 30 ngày, nên bấm Đồng ý
// lần thứ hai (hoặc ở nơi/cấp không khớp) thì mất 1 giờ mà không thấy gì. Giờ: bỏ qua bộ lọc ngẫu nhiên khi người chơi
// tự chọn việc; còn đang trong thời gian chờ thì khoá nút, ghi rõ bao lâu nữa; lỡ không mở được thì báo bằng lời kể.
const PA_EV={congmon:'cong_son_mon',ghost:'quy_thi'};
const PA_EV_CHO={congmon:'Đệ tử canh cổng vừa tiếp chuyện ngươi, chưa muốn gặp lại. Chừng {0} nữa hãy quay lại.',ghost:'Quỷ thị vừa tan, các sạp đã dọn. Chừng {0} nữa mới họp lại.'};
let PA_EV_ON=null;
function paEvCho(a){const r=G.run,id=PA_EV[a],e=id&&EVMAP[id];if(!r||!e||!e.content)return 0;const tr=e.content.trigger||{};const cd=tr.cooldownHours||0;
  const t0=(r.contentLast||{})[id];if(!cd||t0==null)return 0;return Math.max(0,t0+cd-W().t);}
function paEvChoTxt(a,h){return (PA_EV_CHO[a]||'Chưa tới lúc. Chừng {0} nữa hãy quay lại.').replace('{0}',durH(h));}
{const _ct=contentTriggerOk;contentTriggerOk=function(d){if(PA_EV_ON&&d&&d.id===PA_EV_ON)return true;return _ct.apply(this,arguments);};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);for(const x of L){if(!PA_EV[x.a]||x.dis)continue;const h=paEvCho(x.a);
    if(h>0){x.dis=true;x.why=paEvChoTxt(x.a,h);x.tip=x.why;x.cho=durH(h);}}return L;};}
{const _p=placeAct;placeAct=function(a){const id=PA_EV[a];if(!id)return _p.apply(this,arguments);
  const r=G.run,sc=r&&r.scene;const h=paEvCho(a);
  if(h>0){if(sc&&sc.type==='place'){sc.msg=[paEvChoTxt(a,h)];sc.chips=[];}dbg('pa.ev.cho',{a,h});return;}
  PA_EV_ON=id;let o;try{o=_p.apply(this,arguments);}finally{PA_EV_ON=null;}
  const r2=G.run;if(r2&&r2.scene&&r2.scene.type==='place'&&r2.scene===sc&&!(sc.msg&&sc.msg.length)){sc.msg=['Chờ một lúc mà không gặp được ai.'];dbg('pa.ev.hut',{a,id});}
  else dbg('pa.ev.mo',{a,id});
  return o;};}
