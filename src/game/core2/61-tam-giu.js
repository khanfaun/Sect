// Sửa-L câu 49: TẠM GIỮ BÊN NGƯỜI. Bảng TAM_GIU: content/rules/tam-giu.js · chữ: content/text/tam-giu.json (tg.*).
// r.tamGiu=[{t:'r'|'p'|'qi'|'e', v: món (pháp bảo / {id,q} viên đan / mã vật / trứng), n: tên, at: lúc vào tạm giữ, bao: đã báo sắp mất}]
// Cách bắt chung cho mọi nguồn nhận đồ: sau mỗi lần nhận (tgSweep chạy trong autoCheck, saveSoon, sau gõ búa Ám Hội, khi nhận đan),
// so với lần đếm trước (r._tgS): loại nào vừa tăng mà túi vượt sức chứa thì món mới nhất (cuối mảng) chuyển sang tạm giữ.
// Đồ vượt sức chứa vì túi nhỏ đi (tháo túi trữ vật…) không bị chuyển (giữ như cũ). Sửa-M: vật liệu chồng theo loại (t:'m', v: mã, c: số lượng, cộng dồn) và lệnh bài (t:'q') cũng bắt; không tự cất, người chơi tự bấm.
// NPC (người giữ vai, thiên kiêu): túi 12 món đầy thì món nhận thêm vào o.tg=[{x,at}], tự cất lại khi túi có chỗ; quá hạn thì mất.
let TG_IN=0;
function tgL(){const r=G.run;if(!r)return [];if(!Array.isArray(r.tamGiu))r.tamGiu=[];return r.tamGiu;}
function tgSnap(r){const m={};for(const k in (r.mats||{}))if(r.mats[k]>0)m[k]=r.mats[k];return {r:r.relics.length,p:r.pills.length,qi:(r.qitems||[]).length,e:(r.eggs||[]).length,q:(r.passes||[]).length,m};}
// sức chứa như phần còn lại của túi: đồ (pháp bảo, vật, trứng…) theo bagStacks/bagCap; đan theo S().pillMax (mỗi viên một ô, luôn chừa ít nhất 5)
function tgFree(t,v){const r=G.run;if(t==='p')return S().pillMax-r.pills.length;if(t==='m'&&v&&(r.mats||{})[v]>0)return 99;return bagCap()-bagStacks();}
function tgName(e){if(e.t==='r')return e.v.name;if(e.t==='p'){const P=PILL[e.v.id];return P?((e.v.q?PQ[e.v.q]+' ':'')+P.n):e.v.id;}if(e.t==='qi'){const C=CAT.byId&&CAT.byId[e.v];return (C&&C.n)||e.v;}if(e.t==='e')return contentText("core2_05-tui-do-gom-moi_js.bagItems.008")+(e.v.n||'');if(e.t==='m'){const M=MAT[e.v];return ((M&&M.n)||e.v)+' ×'+e.c;}if(e.t==='q')return contentText("core2_05-tui-do-gom-moi_js.bagItems.011")+(REG[e.v]?REG[e.v].n:e.v);return '?';}
function tgSweep(why){const r=G.run;if(!r||!r.relics||!r.pills)return 0;const L=tgL();
  if(r._tgS&&r.relics.length>r._tgS.r&&tgFree('r')<0&&typeof eqAuto==='function'&&!TG_IN){TG_IN=1;try{eqAuto();}finally{TG_IN=0;}} // túi tràn vì pháp bảo mới: mặc được thì mặc trước
  const cur=tgSnap(r),prev=r._tgS;let moved=[];
  if(prev){
    for(const t of ['qi','p','r','e']){let grow=cur[t]-(prev[t]||0);
      while(grow>0&&tgFree(t)<0){let v=null;
        if(t==='qi')v=r.qitems.pop();else if(t==='p')v=r.pills.pop();else if(t==='r'){v=r.relics.pop();}else v=r.eggs.pop();
        if(v==null)break;const e={t,v,at:W().t};e.n=tgName(e);L.push(e);moved.push(e.n);grow--;}}
    // Sửa-M câu 54: lệnh bài túi đầy → tạm giữ; vật liệu chồng theo loại: loại MỚI mà túi đầy → cả phần mới nhận sang tạm giữ (cộng dồn cùng loại), loại đã có ô thì chồng vào như cũ
    let gq=cur.q-(prev.q||0);while(gq>0&&tgFree('q')<0&&r.passes.length){const v=r.passes.pop();const e={t:'q',v,at:W().t};e.n=tgName(e);L.push(e);moved.push(e.n);gq--;}
    if(prev.m)for(const k in r.mats){const was=prev.m[k]||0,d=r.mats[k]-was;if(was>0||!(d>0)||bagCap()-bagStacks()>=0)continue;
      delete r.mats[k];let e=L.find(x=>x.t==='m'&&x.v===k);if(e)e.c+=d;else{e={t:'m',v:k,c:d,at:W().t};L.push(e);}e.n=tgName(e);moved.push(MAT[k]?MAT[k].n+' ×'+d:k);}}
  r._tgS=tgSnap(r);
  if(moved.length){const s=moved.join(', ');note(contentText('tg.vao',[s]),'dn');log(contentText('tg.vaoLog',[moved.length,s]));dbg('tg.vao',{n:moved.length,why:why||'',ds:s});}
  return moved.length;}
// cất một món tạm giữ vào túi (khi có chỗ)
function tgCat(i){const r=G.run,L=tgL();const e=L[i];if(!e||tgFree(e.t,e.v)<=0)return false;L.splice(i,1);
  if(e.t==='m'){r.mats=r.mats||{};r.mats[e.v]=(r.mats[e.v]||0)+e.c;}else if(e.t==='q'){if(!r.passes.includes(e.v))r.passes.push(e.v);}else if(e.t==='r')r.relics.push(e.v);else if(e.t==='p')r.pills.push(e.v);else if(e.t==='qi')(r.qitems=r.qitems||[]).push(e.v);else if(e.t==='e')r.eggs.push(e.v);
  r._tgS=tgSnap(r);note(contentText('tg.cat',[e.n]),'up');dbg('tg.cat',{n:e.n});
  if(e.t==='qi'&&String(e.v).startsWith('cc_')&&r.cc&&typeof ccAuto==='function')ccAuto();saveSoon();return true;}
function tgBo(i){const L=tgL();const e=L[i];if(!e)return false;L.splice(i,1);log(contentText('tg.mat',[e.n]));dbg('tg.bo',{n:e.n});saveSoon();return true;}
function tgCon(e){const d=Math.max(0,(e.at+TAM_GIU.han*HD-W().t)/HD);return d>60?contentText('tg.conThang',[Math.round(d/30)]):contentText('tg.conNgay',[Math.max(1,Math.ceil(d))]);}
function tgView(){const L=tgL();return L.map((e,i)=>({i,n:e.n,con:tgCon(e),sap:W().t>=e.at+(TAM_GIU.han-TAM_GIU.bao)*HD,no:tgFree(e.t,e.v)>0?'':contentText('tg.day')}));}
// hết hạn: báo trước, rồi mất
function tgTick(){const r=G.run;if(!r||!Array.isArray(r.tamGiu)||!r.tamGiu.length)return;const t=W().t,H=TAM_GIU.han*HD,B=TAM_GIU.bao*HD;
  for(let i=r.tamGiu.length-1;i>=0;i--){const e=r.tamGiu[i];
    if(t>=e.at+H){r.tamGiu.splice(i,1);const m=contentText('tg.mat',[e.n]);note(m,'dn');log(m);dbg('tg.mat',{n:e.n});}
    else if(!e.bao&&t>=e.at+H-B){e.bao=1;const m=contentText('tg.bao',[e.n]);note(m,'dn');log(m);dbg('tg.bao',{n:e.n});}}}
{const _ac=autoCheck;autoCheck=function(){const o=_ac.apply(this,arguments);if(G.run)tgSweep('auto');return o;};}
{const _ss=saveSoon;saveSoon=function(){if(G.run&&G.run.relics)tgSweep('save');return _ss.apply(this,arguments);};}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(G.run){tgSweep('time');tgTick();}return o;};}
// nhận đan khi túi đầy: không đổi ra linh thạch nữa mà vào tạm giữ
{const _gp=gainPill;gainPill=function(id,q){const r=G.run,p=PILL[id];if(!r||!p||r.pills.length<S().pillMax)return _gp.apply(this,arguments);
  if(!r._tgS)r._tgS=tgSnap(r);r.pills.push({id,q:q||0});tgSweep('dan');return chip(p.i,(q?PQ[q]+' ':'')+p.n+' '+contentText('tg.chip'),pillTip(id,q||0),'item');};}
// Sửa-G gộp: vật tư cải căn nhận khi túi đầy cũng vào tạm giữ (không gửi lại tại chỗ nữa); r.ccGui cũ vẫn lấy lại được ở nơi gửi
{const _cv=ccVtAdd;ccVtAdd=function(vt,n,why){const r=G.run;if(!(n>0)||!r)return _cv.apply(this,arguments);if(!r._tgS)r._tgS=tgSnap(r);const q=ccQid(vt);
  for(let i=0;i<n;i++)r.qitems.push(q);tgSweep('cc');dbg('cc.vt',{vt,n,why:why||''});};}
// ---------- NPC ----------
function amTgObj(sc,who){const p=sc.ppl[who];if(!p)return null;if(p.k==='vai')return vaiInit(W())[p.ma]||null;if(p.k==='tk'){amRvTui(amRv(p),p.i);return amRv(p);}return p;}
function amTgDon(sc,who){const o=amTgObj(sc,who);if(!o||!Array.isArray(o.tg)||!o.tg.length)return;const T=amTui(sc,who);const t=W().t;
  o.tg=o.tg.filter(g=>t<g.at+TAM_GIU.han*HD);while(o.tg.length&&T.length<VAI_TUI_MAX)T.push(o.tg.shift().x);}
{const _ad=amDat;amDat=function(sc,who,recs){if(who==='me'){if(G.run&&!G.run._tgS)G.run._tgS=tgSnap(G.run);const o=_ad.apply(this,arguments);tgSweep('amhoi');return o;}
  const o=amTgObj(sc,who);for(const x of recs||[]){if(x.lt!=null||!o){_ad.call(this,sc,who,[x]);continue;}const T=amTui(sc,who);
    if(T.length<VAI_TUI_MAX)T.push(x);else{(o.tg=o.tg||[]).push({x,at:W().t});dbg('amh.tg',{ai:amTen(sc,who),n:x.n});}}};}
{const _al=amLay;amLay=function(sc,who){const o=_al.apply(this,arguments);if(who!=='me'&&o)amTgDon(sc,who);return o;};}
// NPC túi đầy vẫn trả giá được (món nhận thêm vào tạm giữ)
amTuiDay=function(){return false;};
// người chơi túi đầy vẫn trả giá được ở Ám Hội (món thắng vào tạm giữ)
amRoom=function(){return true;};
// buổi họp mới: NPC dọn tạm giữ (hết hạn thì mất, có chỗ thì cất)
{const _as=amStart;amStart=function(n){const o=_as.apply(this,arguments);const sc=G.run&&G.run.scene;if(o&&sc&&sc.type==='amhoi')sc.ppl.forEach((p,pi)=>amTgDon(sc,pi));return o;};}
