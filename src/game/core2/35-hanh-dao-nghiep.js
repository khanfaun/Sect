// ĐỢT 1: Hành Đạo (cách hành xử, kiếp này), Nghiệp Duyên (hậu quả có chủ thể), gương r.karma cho mã cũ.
// Dữ liệu: content/rules/hanh-dao.js (HD_LV), nghiep.js (NQ_*), deed.js (DEED).
function nqInit(r){if(!r)return;if(!r.hd)r.hd={log:[],lv:2};if(!r.hd.log)r.hd.log=[];if(!r.ng)r.ng={G:0,B:0,so:[]};if(!r.ng.so)r.ng.so=[];if(!r.danh)r.danh={};}
function hdSum(r){r=r||G.run;let P=0,T=0;if(r&&r.hd)for(const x of r.hd.log){P+=x.p||0;T+=x.t||0;}return {P,T};}
function hdP(r){r=r||G.run;if(!r)return 0.5;nqInit(r);const s=hdSum(r);return s.P+s.T>0?s.P/(s.P+s.T):0.5;}
function hdE(r){return 2*(hdP(r)-0.5);} // -1..1
function hdLvIdx(r){r=r||G.run;if(!r)return 2;nqInit(r);const p=hdP(r);let i=HD_LV.findIndex(x=>p>=x.min);if(i<0)i=HD_LV.length-1;
  const cur=r.hd.lv==null?i:r.hd.lv;if(i!==cur){const edge=i<cur?HD_LV[i].min:HD_LV[cur].min;if(Math.abs(p-edge)<HD_HYS)i=cur;}
  r.hd.lv=i;return i;}
function hdName(){const r=G.run;if(!r)return HD_LV[2].n;return HD_LV[hdLvIdx(r)].n;}
function hdTip(){const r=G.run;if(!r)return HD_LV[2].d;return HD_LV[hdLvIdx(r)].d;}
function karmaMirror(r){return Math.round((hdP(r)-0.5)*200);} // gương −100..100 cho mã cũ
function hdAdd(p,t,why){const r=G.run;if(!r)return;nqInit(r);p=p||0;t=t||0;
  const lv0=hdLvIdx(r);r.hd.log.push({p,t,why:why||'',y:ageY(r)});while(r.hd.log.length>HD_KEEP)r.hd.log.shift();
  // làm trái hướng: đạo tâm dao động (HN B §8.5); "Chính tà đan xen" (lv 2) không bị
  if((lv0<2&&t>0)||(lv0>2&&p>0)){const w=lv0<2?t:p;r.tamma=clamp((r.tamma||0)+w,0,100);dbg('nq.trai',{lv0,w});}
  r.karma=karmaMirror(r);dbg('nq.hd',{p,t,why,lv:hdLvIdx(r)});}
function ngVal(muc,yd,tn){return muc*(NQ_YD[yd||'chu_dich']??1)*(NQ_TN[tn||'truc_tiep']??1);}
function ngAdd(kind,muc,o){const r=G.run;if(!r||!muc)return;nqInit(r);o=o||{};const v=ngVal(muc,o.yd,o.tn);
  if(kind==='G')r.ng.G+=v;else r.ng.B+=v;
  r.ng.so.push({k:kind,v:+v.toFixed(2),id:o.id||'',ai:o.ai||'',why:o.why||'',y:ageY(r),t:W().t,mo:1});
  if(r.ng.so.length>300)r.ng.so.splice(0,r.ng.so.length-300);dbg('nq.ng',{kind,v,id:o.id});}
function ngB(r){r=r||G.run;return r&&r.ng?r.ng.B||0:0;} // nghiệp chướng chưa giải
function ngG(r){r=r||G.run;return r&&r.ng?r.ng.G||0:0;}
function ngName(k){const v=k==='G'?ngG():ngB();const L=k==='G'?NQ_LV_G:NQ_LV_B;return (L.find(x=>v>=x[0])||L[L.length-1])[1];}
function nqChip(p,t){return chip('☯️',p>t?contentText('nq.chip.chinh'):t>p?contentText('nq.chip.ta'):contentText('nq.chip.nd'),contentText('nq.chip.tip'),'');}
// một hành vi theo bảng DEED; o = {yd,tn,ai,why,lo}
function deed(id,o){const D=DEED[id];if(!D){dbg('nq.deed.missing',{id});return [];}const r=G.run;if(!r)return [];nqInit(r);o=o||{};
  const p=D.p?HD_W[D.p]:0,t=D.t?HD_W[D.t]:0;if(p||t)hdAdd(p,t,id);
  if(D.g)ngAdd('G',D.g,Object.assign({id},o));if(D.b)ngAdd('B',D.b,Object.assign({id},o));
  if(D.bPct)r.ng.B=Math.max(0,r.ng.B*(1+D.bPct/100));
  if(typeof danhDeed==='function')danhDeed(id,D,o); // Đ1.4
  if(D.seed&&typeof nqSeed==='function')nqSeed(id,o);  // Đ1.7
  dbg('nq.deed',{id,P:hdSum(r).P,T:hdSum(r).T,G:r.ng.G,B:r.ng.B});
  return [nqChip(p,t)];}
// chuyển một giá trị karma cũ (−100..100) thành một mục sổ. Không làm tròn P để gương r.karma giữ đúng giá trị cũ.
function nqFromLegacy(r,k){if(!r)return;nqInit(r);k=clamp(+k||0,-100,100);const P=+((0.5+k/200)*10).toFixed(3),T=+(10-P).toFixed(3);r.hd.log=[{p:P,t:T,why:'cu',y:ageY(r)}];r.hd.lv=null;
  r.ng.G=Math.max(0,k)*0.3;r.ng.B=Math.max(0,-k)*0.3;r.karma=karmaMirror(r);hdLvIdx(r);}

// applyE: khóa mới deed/hd/ng; khóa cũ karma thành bút toán tạm (Đ1.8 rà dần các sự kiện)
{const _ae=applyE;applyE=function(e,v){const r=G.run;if(!e||!r||!feat('nq'))return _ae(e,v);
  let ch=[];e=Object.assign({},e);
  if(e.deed){ch=ch.concat(deed(e.deed,e.deedO||{}));}
  delete e.deed;delete e.deedO;
  if(e.hd){hdAdd(e.hd.p||0,e.hd.t||0,e.hd.why||'ev');ch.push(nqChip(e.hd.p||0,e.hd.t||0));delete e.hd;}
  if(e.ng){if(e.ng.g)ngAdd('G',e.ng.g,e.ng);if(e.ng.b)ngAdd('B',e.ng.b,e.ng);if(!ch.length)ch.push(nqChip(0,0));delete e.ng;}
  if(e.karma){const k=e.karma;delete e.karma;
    hdAdd(k>0?Math.min(8,k):0,k<0?Math.min(8,-k):0,'legacy');ngAdd(k>0?'G':'B',Math.max(1,Math.round(Math.abs(k)/4)),{id:'legacy'});
    ch.push(nqChip(k>0?1:0,k<0?1:0));}
  const rest=_ae(e,v);return ch.concat(rest||[]);};}
// kiếp mới: karma xuất thân + karmaAdj khí vận đã nằm trong r.karma → chuyển một lần
{const _nr=newRun;newRun=function(){const res=_nr.apply(this,arguments);const r=G.run;if(r){nqFromLegacy(r,r.karma||0);r._nqV1=1;}return res;};}
// bản lưu cũ
{const _r=run2;run2=function(){const r=_r();if(r&&!r._nqV1){r._nqV1=1;if(!r.hd)nqFromLegacy(r,r.karma||0);else nqInit(r);}return r;};}
// Bật hệ: giao diện đã đọc hdName/ngName (Đ1.3)
FEAT.nq=1;
// bậc của một giá trị nghiệp duyên (0..5)
function ngBac(v){let i=0;for(let k=0;k<NQ_BAC.length;k++)if((v||0)>=NQ_BAC[k])i=k;return i;}
function ngBacB(r){return ngBac(ngB(r));}
function ngBacG(r){return ngBac(ngG(r));}
// thành tựu Thiện nhân / Ma đầu theo hệ mới (Đ1.5)
function nqAch(){const r=G.run;if(!r||!r.hd||typeof ach!=='function')return;const L=hdLvIdx(r);if(L===0&&ngG(r)>=50)ach('thien');if(L===4&&ngB(r)>=50)ach('ma');}
{const _d=deed;deed=function(){const ch=_d.apply(this,arguments);nqAch();return ch;};}
