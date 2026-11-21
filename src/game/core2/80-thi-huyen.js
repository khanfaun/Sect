// ---------------- VIỆC 8: THI TU ĐÀO MỘ · HUYỄN THUẬT CẮT DẤU (bảng THH: content/rules/thi-huyen.js) ----------------
function thhCo(id){const r=G.run;return !!r&&typeof tuHas==='function'&&tuHas(id,r)&&tuK(id,r).tang>=THH.tang;}
function thhDaoLoai(n){const D=THH.dao;return n&&n.state!=='ruin'?(D.noiVoChu.includes(n.type)?'vo':D.noiNguoi.includes(n.type)?'nguoi':null):null;}
function thhDaoCho(n){const r=G.run;const m=(r.thhDao||{})[n.id];return m!=null&&ncMonth()-m<THH.dao.cach;}
function thhDao(){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const k=thhDaoLoai(n);if(!thhCo('TU18')||!k||thhDaoCho(n))return false;
  const D=THH.dao,i=k==='vo'?0:1;advanceTime(D.h);if(!G.run)return true;(r.thhDao||(r.thhDao={}))[n.id]=ncMonth();
  mrResAdd('TU18',D.res[i]);const g=tuXp('TU18',D.xp[i]);const ch=[chip('⚰️','+'+D.res[i],contentText('thh.res'),'up')];if(g)ch.push(chip('📘','+'+g,'','up'));
  const msg=[contentText(k==='vo'?'thh.daoVo':'thh.daoNguoi')];if(k==='nguoi'){const L=deed('dao_mo',{});if(Array.isArray(L))msg.push(...L);}
  sc.msg=msg;sc.chips=ch;sc.seq=(sc.seq||0)+1;log(msg[0]);dbg('thh.dao',{id:n.id,k});return true;}
function thhAo(){const r=G.run;if(!thhCo('TU24')||!truyOn())return false;const s=S(),c=Math.round(s.maxMp*THH.ao.mp);if((r.mp||0)<c)return false;
  r.mp-=c;advanceTime(THH.ao.h);if(!G.run)return true;const sc=r.scene;let t;
  if(R()<THH.ao.p){truyEnd('aocanh',1);t=contentText('thh.aoOk');}else{t=contentText('thh.aoHong');if(G.run.truy){G.run.truy.d=(G.run.truy.d||0)+1;}}
  log(t);note(t,G.run.truy?'dn':'up');if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('💧','−'+c,contentText('thh.mp'),'dn')];sc.seq=(sc.seq||0)+1;}dbg('thh.ao',{ok:!G.run.truy});return true;}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(!G.run||!n)return L;
  if(thhCo('TU18')&&thhDaoLoai(n)&&!L.some(a=>a.a==='daomo')){const cho=thhDaoCho(n),k=thhDaoLoai(n);L.push({a:'daomo',i:'⚰️',l:contentText('thh.dao'),h:THH.dao.h,tip:contentText(k==='vo'?'thh.daoVoTip':'thh.daoNguoiTip'),dis:cho,x:cho?contentText('thh.daoCho'):''});}
  if(thhCo('TU24')&&truyOn()&&!L.some(a=>a.a==='aocanh')){const c=Math.round(S().maxMp*THH.ao.mp),thieu=(G.run.mp||0)<c;L.push({a:'aocanh',i:'🪞',l:contentText('thh.ao'),h:THH.ao.h,tip:contentText('thh.aoTip',[Math.round(THH.ao.p*100)]),dis:thieu,x:thieu?contentText('thh.thieuMp'):''});}
  return L;};}
{const _p=placeAct;placeAct=function(a){if(a==='daomo'){thhDao();return;}if(a==='aocanh'){thhAo();return;}return _p.apply(this,arguments);};}
