// ĐỢT 2: Linh căn mới (HN A.2, A.16) — phẩm chất linh căn, vô linh căn (từ kiếp 2), mọi thẻ đầu thai chung một linh căn.
// Bảng ROOT_W1, VO_*, ROOT_Q: content/rules/root-rate.js
FEAT.vo=1;
function isVo(r){r=r||G.run;return !!(r&&r.root&&r.root.id==='vo');}
// tỉ lệ vô căn (%) theo BẬC nghiệp duyên kiếp trước
function voRate(){const L=(G.meta&&G.meta.lastNq)||{B:0,G:0};let x=VO_BASE+(VO_BAC_B[ngBac(L.B)]||0)+(VO_BAC_G[ngBac(L.G)]||0);
  x-=4*U('tuccan');return clamp(x,VO_MIN,VO_MAX);}
// genRoot gốc ở core/04-loi-tro-choi.js — thay hẳn (không gọi gốc)
{const _g0=genRoot;genRoot=function(){if(!feat('vo'))return _g0();const first=((G.meta&&G.meta.nlife)||0)===0;
  if(!first&&chance(voRate()/100)){dbg('vo.root',{vo:1});return {id:'vo',els:[],q:null};}
  const ids=Object.keys(ROOT_W1).filter(k=>ROOT.some(x=>x.id===k));const id=wpick(ids,k=>ROOT_W1[k]);let els;
  if(id==='bien')els=[pick(['loi','bang','phong'])];else if(id==='cuc')els=NGUHANH.slice();
  else els=shuffle(NGUHANH.slice()).slice(0,ROOT.find(x=>x.id===id).k);
  const q=wpick(ROOT_Q,x=>x.w).id;return {id,els,q};};}
function rootQ(root){return root&&ROOT_Q.find(q=>q.id===root.q)||null;}
// hệ số tu theo phẩm chất (bản lưu cũ không có q: như cũ)
{const _rv=rootView;rootView=function(x){const v=_rv(x);const Q=rootQ(x);if(Q)v.m=+(v.m*Q.m).toFixed(3);return v;};}
// vô căn không bị khí vận nắn lại
{const _ts=ttShape;ttShape=function(root,ids){if(root&&root.id==='vo')return root;return _ts.apply(this,arguments);};}
// kiếp đầu không rút khí vận Vô Căn
{const _tr=ttRoll;ttRoll=function(){const L=_tr.apply(this,arguments);if(feat('vo')&&((G.meta&&G.meta.nlife)||0)===0)return L.filter(k=>k!=='vo_can');return L;};}
// từ kiếp 2: mọi thẻ chung một linh căn; khí vận Vô Căn đi đúng với vô linh căn
{const _gb=genBirth;genBirth=function(){const res=_gb.apply(this,arguments);if(!feat('vo')||!G.birth)return res;const cards=G.birth.cards;
  if(((G.meta&&G.meta.nlife)||0)>0&&cards.length){const R0=cards[0].root;for(const c of cards)c.root=JSON.parse(JSON.stringify(R0));}
  for(const c of cards){c.kv=c.kv||[];const vo=c.root&&c.root.id==='vo';
    if(!vo&&c.kv.includes('vo_can'))c.kv=c.kv.filter(k=>k!=='vo_can');
    if(vo&&!c.kv.includes('vo_can')&&TT_DEST.vo_can)c.kv.push('vo_can');}
  dbg('vo.birth',{root:cards[0]&&cards[0].root.id});return res;};}
// mệnh cách Lôi Thần thêm hệ lôi: vô căn thì không
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r&&isVo(r))r.root.els=[];return res;};}
