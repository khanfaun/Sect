// ================= CHE GIẤU TU VI =================
// Từ Trúc Cơ trở lên có thể che tu vi, để người khác thấy mình ở cảnh giới thấp hơn (r.hide: chỉ số cảnh giới hiện ra, -1 là phàm nhân).
// Chỉ đổi thứ người khác nhìn thấy, sức mạnh thật không đổi. Kẻ có thần thức cao hơn mình nhìn xuyên được.
// Tác dụng: kẻ địch người tu tiên không nhìn thấu thì coi thường, ngươi ra tay trước (thanh hành động tiến thêm HIDE_FIRST).
// Đổi lại: quan ải không thể "lấy tu vi mà qua" theo cảnh giới thật nếu đang che xuống thấp hơn yêu cầu.
const HIDE_FIRST=60;
function hideOn(){const r=G.run;return !!(r&&r.hide!=null&&!isPham()&&r.hide<r.realm);}
function shownRealm(){const r=G.run;return hideOn()?r.hide:(isPham()?-1:r.realm);}
function shownName(){const k=shownRealm();return k<0?'Phàm nhân':REALM[k];}
function hideCycle(){const r=G.run;if(!r||isPham()||r.realm<1){note('Phải từ Trúc Cơ mới che giấu được tu vi.','dn');return;}
  if(r.hide==null)r.hide=r.realm-1;else if(r.hide>-1)r.hide--;else r.hide=null;
  note(r.hide==null?'Thôi che giấu tu vi.':'Người ngoài nhìn ngươi như '+shownName()+'.','');dbg('hide.set',{hide:r.hide});}
// kẻ địch nhìn thấu khi thần thức (u.than) cao hơn thần thức của ngươi
function seesThrough(u){return (u.than||0)>(S().than||0);}
// quan ải: dùng cảnh giới người ta thấy
{const _po=passOpts;passOpts=function(){const L=_po();const r=G.run;if(hideOn()){const o=L.find(x=>x.a==='realm');if(o&&shownRealm()<r.scene.k){o.ok=false;o.tip='Đang che giấu tu vi: lính gác chỉ thấy '+shownName()+'.';}}return L;};}
// vào trận: kẻ địch người tu tiên coi thường, ngươi được ra tay trước; ai thần thức cao hơn thì nhìn thấu
{const _cs=combatStep;combatStep=function(dt){const sc=G.run&&G.run.scene;
  if(sc&&sc.type==='combat'&&!sc.prep&&!sc._hide&&!sc.kiep&&hideOn()){sc._hide=1;const me=mainUnit(sc);
    const hum=sc.units.filter(u=>u.side==='B'&&!u.immune&&u.f!=='thu'&&u.f!=='vat'&&u.f!=='quy');
    const see=hum.filter(seesThrough);
    if(me&&hum.length&&!see.length){me.pos=Math.min(PHAT-1,(me.pos||0)+HIDE_FIRST);clog(sc,'Đối phương tưởng ngươi chỉ là '+shownName()+', lơ là cảnh giác. Ngươi ra tay trước!','me');dbg('hide.first',{});}
    else if(see.length)clog(sc,see[0].name+' nheo mắt: “Che giấu tu vi à? Thần thức của ta nhìn thấu cả rồi.”','en');}
  return _cs(dt);};}
// thẻ của ngươi trong trận: người ngoài thấy cảnh giới đã che
{const _pu=playerUnit;playerUnit=function(){const u=_pu.apply(this,arguments);if(hideOn()&&u)u.sub=shownName()+' (ẩn)';return u;};}
