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
{const _ts=ttShape;ttShape=function(root,ids){if(root&&root.id==='vo')return root;const o=_ts.apply(this,arguments);if(o&&root&&root.q&&o.q==null)o.q=root.q;return o;};}
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
// ---------- Đ2.3: vô căn không tu luyện được ----------
{const _pu=phamUp;phamUp=function(){if(isVo())return;return _pu.apply(this,arguments);};}
{const _at=addTv;addTv=function(x){const r=G.run;if(r&&isVo(r)&&x>0){if(r.vo&&typeof r.vo==='object')r.vo.xp=(r.vo.xp||0)+x*0.5;dbg('vo.tv',{x});return;}return _at.apply(this,arguments);};}
{const _bq=bqReal;bqReal=function(){if(isVo())return 0;return _bq.apply(this,arguments);};}
{const _S=S;S=function(){const s=_S.apply(this,arguments);if(isVo())s.maxMp=0;return s;};}
{const _cb=canBreak;canBreak=function(){if(isVo())return false;return _cb.apply(this,arguments);};}
// tu vi từ sự kiện: vô căn không nhận, thay bằng một chip
{const _ae=applyE;applyE=function(e,v){if(!(e&&e.tv>0&&isVo()))return _ae.apply(this,arguments);const e2=Object.assign({},e);delete e2.tv;delete e2.tvMajor;
  const ch=[chip('🌫️',contentText('vo.noTv'),contentText('vo.noTvTip'),'')];const rest=_ae.call(this,e2,v);return ch.concat(rest||[]);};}
// ---------- Đ2.4: trắc linh — từ kiếp 2 linh căn giấu tới khi trắc (HN B §5.3, A.16) ----------
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.rootKnown=feat('vo')&&r.kiep>1?0:1;r.tlAcc=0;r.tlM=0;}return res;};}
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._rkV1){r._rkV1=1;if(r.rootKnown==null)r.rootKnown=1;}return r;};}
function rootKnown(r){r=r||G.run;return !r||r.rootKnown==null||!!r.rootKnown;}
function voKnown(r){r=r||G.run;return isVo(r)&&rootKnown(r);}
// tên linh căn để HIỂN THỊ (rootView vẫn dùng cho công thức)
function rootLabel(r,root){r=r||G.run;root=root||(r&&r.root);if(!root)return '';if(r&&!rootKnown(r))return contentText('tl.chua');
  const Q=rootQ(root);const n=rootView(root).n;return Q&&root.id!=='vo'?n+' · '+contentText('tl.pham',[Q.n]):n;}
function rootElsLabel(r){r=r||G.run;if(!rootKnown(r)||isVo(r))return '';return r.root.els.map(e=>EL[e]?EL[e].n:e).join(', ');}
function tlCat(root){if(!root||root.id==='vo')return 'vo';return ['song','thien','bien','cuc'].includes(root.id)?'tot':'thuong';}
function tlResult(cach){const r=G.run;if(!r)return {t:''};const cat=tlCat(r.root);r.rootKnown=1;
  dbg('tl.done',{cach,root:r.root.id});log(contentText('tl.log',[rootLabel(r)]));
  return {t:contentText('event.tl_'+cach+'.'+cat),ch:[chip(cat==='vo'?'🪨':'🌱',rootLabel(r),contentText('tl.chipTip'),cat==='vo'?'dn':'up')]};}
function tlEv(id){return KYNGO.find(x=>x.id===id);}
function tlOpen(id){const ev=tlEv(id);if(!ev)return false;kyStart(ev);dbg('tl.open',{id});return true;}
function tlSectNear(){const r=G.run;const here=nodeById(r.at);if(!here)return false;
  return W().regions.flatMap(R=>R.nodes||[]).some(n=>n.type==='tong'&&n.state!=='ruin'&&travelHours([here.id,n.id])<=3*HD);}
function tlFree(){const r=G.run;return r&&!r.scene&&G.screen==='map'&&!r.moving;}
// kiểm mỗi lần qua tháng; đang bận thì dời sang lần sau
function tlCheck(){const r=G.run;if(!r||rootKnown(r)||!tlFree())return;const m=Math.floor((r.tlAcc||0)/HM);
  while((r.tlM||0)<m&&G.run&&!rootKnown(r)&&tlFree()){r.tlM=(r.tlM||0)+1;const k=r.tlM;
    if(k<=2&&!r.tlTd){r.tlTd=1;if(tlSectNear()&&tlOpen('tl_tuyendo'))return;}
    if(k>=3){tlOpen('tl_laodao');return;}
    const n=nodeById(r.at);if(n&&['tran','thanh'].includes(n.type)&&chance(.3)&&tlOpen('tl_dusi'))return;}}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&h>0&&!rootKnown(r)){r.tlAcc=(r.tlAcc||0)+h;tlCheck();}
  // Tự biết: vô căn có tâm pháp mà luyện mãi không được, hoặc qua TP_Y năm
  const r2=G.run;if(r2&&isVo(r2)&&!rootKnown(r2)&&!r2.tlTb&&tlFree()&&((typeof hasTp==='function'&&hasTp())||(r2.age-r2.birthAge)>=TP_Y)){r2.tlTb=1;tlOpen('tl_tubiet');}
  return o;};}
// chưa trắc thì chưa dẫn khí được
{const _pu=phamUp;phamUp=function(){if(!rootKnown())return;return _pu.apply(this,arguments);};}
// Trắc Linh Thạch: dùng trong túi
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&it.ref.id==='trac_linh_thach')it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){if(key==='vtrac_linh_thach'){const r=G.run;const i=(r.qitems||[]).indexOf('trac_linh_thach');if(i<0)return 0;
  r.qitems.splice(i,1);if(rootKnown(r)){note(contentText('tl.daBiet'),'');return 1;}tlOpen('tl_thach');return 1;}return _bu.apply(this,arguments);};}
// ---------- Đ2.5: lượt tự chọn lá số (G.meta.pick) ----------
{const _d=die;die=function(){const r=G.run;if(r&&G.meta&&feat('vo')&&(r.qitems||[]).includes('dinh_menh_chau')){r.qitems.splice(r.qitems.indexOf('dinh_menh_chau'),1);G.meta.pick=(G.meta.pick||0)+1;dbg('dt.chau',{pick:G.meta.pick});}return _d.apply(this,arguments);};}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;const u=U('menh');
  if(r&&G.meta&&feat('vo')&&u>0&&r.kiep%(u>=2?3:4)===0){G.meta.pick=(G.meta.pick||0)+1;dbg('dt.menh',{kiep:r.kiep,pick:G.meta.pick});}return res;};}
