// ================= NỘI DUNG ĐỢT HAI (GPT viết, Claude kiểm) =================
// Dữ liệu: ND2_DATA (data/07-noi-dung-2-du-lieu.js, sinh từ content/qua-chin, content/nghe-pham, content/cai-can, content/canh).
// Kiểm: tools/kiem-tra-noi-dung-2.js (npm run content:gpt). Thiếu dữ liệu ở đâu thì chỗ đó dùng lời chung cũ.
//  (a) quả chín: hạt r.qc chín → hộp kỳ ngộ qc_<mã việc làm>, chọn một biến thể hợp điều kiện.
//  (b) nghề phàm: lời thăng bậc riêng (len[bậc−1]); hết kiếp → kết cục của nghề chính (A/B/C theo điều kiện, D dự phòng).
//  (c) cải căn: vào một bước của đường → hẹn một sự kiện dọc đường (buoc = số thứ tự bước), hiện lúc rảnh.
//  (d) cảnh kể: quan phủ đánh hèo / truy nã / bắt làm công / ra tù; bị truy đuổi chặn đường theo loại địch.
const ND2=typeof ND2_DATA!=='undefined'?ND2_DATA:{qc:{},nghe:{},cc:{},canh:{}};
function ndT(s,x){let t=tyT(s);if(x)for(const k in x)t=t.split('{'+k+'}').join(x[k]);return t;}
function ndDk(dk){return dk?tyDk(dk,{dau:{}}):'';}
// chọn biến thể hợp điều kiện bằng băm (không động R() để không lệch chuỗi ngẫu nhiên của luật khác)
function ndPick(L,key){const C=(L||[]).filter(v=>!ndDk(v.dk));if(!C.length)return null;return C[Math.floor(ncHash(key+'|'+Math.floor(W().t))*C.length)%C.length];}
function ndE(e,src){const r=G.run;let ch=[];if(!e||!r)return ch;
  if(e.bac){const x=bacAdd(e.bac,src);if(x)ch.push(chip('🪙',(x>0?'+':'−')+fmtBac(Math.abs(x)),contentText('ty.tien'),x>0?'up':'dn'));}
  for(const id of [].concat(e.deed||[]))ch=ch.concat(deed(id,{src}));
  const base={};for(const k of ['hp','h','tamma','nang'])if(e[k]!=null)base[k]=e[k];if(Object.keys(base).length&&G.run)ch=ch.concat(applyE(base)||[]);
  return ch;}
function ndKy(id,n,t,c){let ev=KYNGO.find(x=>x.id===id);if(!ev){ev={id,sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}ev.n=n;ev.t=t;ev.c=c;return ev;}
function ndChon(L,src){return (L||[]).map(c=>({l:ndT(c.l),need:c.dk?()=>ndDk(c.dk):null,go:()=>{const ch=ndE(c.e,src);dbg('nd2.chon',{src,c:c.id});return {t:ndT(c.t),ch};}}));}
function ndBusy(){const r=G.run;return !r||!!r.scene||G.screen!=='map'||(r.moving&&!r.halt)||!!r._inBq||(typeof NO_BUSY!=='undefined'&&!!NO_BUSY);}

// ---------- (a) quả chín ----------
{const _q=qcRipen;qcRipen=function(s){const r=G.run;const L=s&&ND2.qc[s.id];if(!r||!L)return _q.apply(this,arguments);
  if(ndBusy())return; // chờ lúc rảnh, tháng sau xét lại
  const v=ndPick(L,'qc:'+s.id+':'+s.at);s.done=1;
  if(!v){log(contentText('nq.qc.log',[deedName(s.id)||s.id]));dbg('nq.qc',{id:s.id,ev:false});return;}
  kyStart(ndKy('qc_'+s.id,ndT(v.ten),ndT(v.t),ndChon(v.c,'qc:'+s.id)));dbg('nq.qc',{id:s.id,ev:true,v:v.id});};}

// ---------- (b) nghề phàm ----------
{const _c=ngCheck;ngCheck=function(ma){const D=ND2.nghe[ma];if(D&&D.len&&ngReady(ma)){const nb=(ngPaths()[ma].bac|0)+1;const ev=KYNGO.find(x=>x.id==='ng_'+ma+'_'+nb);
    if(ev&&D.len[nb-1])ev.t=ndT(D.len[nb-1]);}return _c.apply(this,arguments);};}
function ngKetOk(dk,r,p){if(!dk)return true;const b=p.bac|0;
  if(dk.bacNgheTu!=null&&b<dk.bacNgheTu)return false;if(dk.bacNgheDen!=null&&b>dk.bacNgheDen)return false;
  if(dk.nghiep==='thien'&&!(ngG(r)>ngB(r)))return false;if(dk.nghiep==='ac'&&!(ngB(r)>ngG(r)))return false;
  if(dk.hanhDao){const h=hdSum(r);if(dk.hanhDao==='chinh'&&!(h.P>h.T))return false;if(dk.hanhDao==='ta'&&!(h.T>h.P))return false;}
  if(dk.nang){const N=nangOf(r)||{};for(const k in dk.nang)if((N[k]||0)<dk.nang[k])return false;}
  if(dk.bacTu!=null&&(r.bac||0)<dk.bacTu)return false;if(dk.pham!=null&&!!r.pham!==dk.pham)return false;if(dk.tuoiTu!=null&&(r.age||0)<dk.tuoiTu)return false;
  return true;}
// nghề chính: bậc cao nhất, rồi nhiều kinh nghiệm nhất
function ngChinh(r){r=r||G.run;const P=ngPaths(r);const L=Object.keys(P).filter(k=>NGHE[k]&&((P[k].xp||0)>0||(P[k].bac|0)>0));if(!L.length)return null;
  L.sort((a,b)=>((P[b].bac|0)-(P[a].bac|0))||((P[b].xp||0)-(P[a].xp||0)));return L[0];}
function ngKet(r){r=r||G.run;if(!r)return null;const ma=ngChinh(r);const D=ma&&ND2.nghe[ma];if(!D||!D.ket)return null;const p=ngPaths(r)[ma];
  const K=D.ket.find(k=>ngKetOk(k.dk,r,p));if(!K)return null;const N=NGHE[ma];
  return {ma,id:K.id,n:N.n,bac:N.ranks[p.bac|0],ten:ndT(K.ten),t:ndT(K.t)};}
{const _d=die;die=function(){let K=null;try{K=ngKet(G.run);}catch(e){K=null;}if(K){log(K.ten+' — '+K.t);dbg('nghe.ket',{ma:K.ma,id:K.id});}
  const res=_d.apply(this,arguments);if(G.over&&K)G.over.ngKet=K;return res;};}

// ---------- (c) cải căn dọc đường ----------
function ccEvHen(){const r=G.run;if(!r||!r.cc)return;const L=ND2.cc[r.cc.id];if(!L)return;const s=r.cc.s;const C=L.filter(v=>v.buoc===s);if(!C.length)return;
  const v=C[Math.floor(ncHash('cc:'+r.cc.id+':'+s+':'+Math.floor(r.cc.t0||0))*C.length)%C.length];r.ccEvQ={id:r.cc.id,s,v:v.id};dbg('cc.evHen',{id:r.cc.id,s,v:v.id});}
function ccEvMo(){const r=G.run;const Q=r&&r.ccEvQ;if(!Q)return false;if(!r.cc||r.cc.id!==Q.id){r.ccEvQ=null;return false;}if(ndBusy())return false;
  const v=(ND2.cc[Q.id]||[]).find(x=>x.id===Q.v);r.ccEvQ=null;if(!v)return false;
  kyStart(ndKy('cc_ev',ndT(v.ten),ndT(v.t),ndChon(v.c,'cc:'+Q.id)));dbg('cc.ev',{id:Q.id,s:Q.s,v:v.id});return true;}
{const _s=ccStart;ccStart=function(){const o=_s.apply(this,arguments);if(o)ccEvHen();return o;};}
{const _n=ccNext;ccNext=function(){const o=_n.apply(this,arguments);ccEvHen();return o;};}

// ---------- (d) cảnh kể ----------
function ndCanh(k,sau){const r=G.run;if(!r)return false;const v=ndPick(ND2.canh[k],k);if(!v)return false;const x={t:ndT(v.t)};
  if(sau){const w=ndPick(ND2.canh[sau],sau);if(w)x.sau=ndT(w.t);}
  r.ndKe=(r.ndKe||[]).concat([x]).slice(-4);dbg('nd2.ke',{k});return true;}
function ndKeMo(){const r=G.run;if(!r||!(r.ndKe&&r.ndKe.length)||ndBusy())return false;const L=r.ndKe;r.ndKe=[];
  const sau=L.map(x=>x.sau).filter(Boolean).join('\n\n');
  kyStart(ndKy('nd_ke',contentText('nd2.keN'),L.map(x=>x.t).join('\n\n'),[{l:contentText('nd2.tiep'),go:()=>({t:sau,ch:[]})}]));return true;}
{const _h=noHeo;noHeo=function(r,lv){const o=_h.apply(this,arguments);ndCanh('quan_phu.heo'+(lv?2:1));return o;};}
{const _t=noTruyNa;noTruyNa=function(){const o=_t.apply(this,arguments);ndCanh('quan_phu.truyNa');return o;};}
{const _l=noLao;noLao=function(){const o=_l.apply(this,arguments);if(G.run)ndCanh('quan_phu.lamCong','quan_phu.raTu');return o;};}
{const _k=truyKyEv;truyKyEv=function(T,giua,biet){const ev=_k.apply(this,arguments);const v=ndPick(ND2.canh['truy.'+T.k],'truy.'+T.k);
  if(v){ev.t=ndT(v.t,{ke:T.n||contentText('truy.noTen')})+(biet?' '+contentText('truy.kyBiet'):'')+(giua?' '+contentText('truy.kyGiua'):'');dbg('nd2.ke',{k:'truy.'+T.k});}
  return ev;};}

// lúc rảnh: mở cảnh kể / sự kiện cải căn đang hẹn
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(G.run&&!ndBusy()){if(!ndKeMo())ccEvMo();}return o;};}
{const _ar=arrive;arrive=function(){const o=_ar.apply(this,arguments);if(G.run&&!ndBusy()){if(!ndKeMo())ccEvMo();}return o;};}
