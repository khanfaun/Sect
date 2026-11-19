// Đ8b — Đất đai (phần 1): mỗi địa điểm có N ô đất, mỗi ô mang 0–1 công trình; nút trong hộp địa điểm sinh từ công trình.
// Bảng CONG_TRINH, DAT: content/rules/dat-dai.js. Chữ: content/text/dat-dai.json (khoá dat.*).
// Dữ liệu: W().dat[id nút] = {v, o:[{ct, chu, goc, hu}], pha:{ct:số lần}} (lưu theo thế giới, qua các kiếp).
//   ct = mã công trình hoặc null (ô trống) · chu = null (không chủ) | {k:'vai',id:'NPxx'} | {k:'fa',id:'FAxx'} | {k:'dan'} | {k:'tong',n} | {k:'ta'} (người chơi, để dành)
//   goc = 1 công trình sinh sẵn (cốt lõi) · hu = thời điểm dựng lại xong nếu đang hư tạm (chỉ ở nơi neo)
// Sinh ô lần đầu khi nút được hỏi tới (cả bản lưu cũ): DAT.goc theo loại nơi + mọi nút đang có (để không mất dịch vụ nào) +
// công trình tự nhiên chọn theo địa hình quanh nút và hạt giống thế giới (wRnd, ổn định qua tải lại).
FEAT.dat=1;
const DAT_V=1;
// nút gắn công trình: chỉ những nút này mới bị lọc; nút khác (thăm dò, bế quan, dưỡng thương, nhà mình…) hiện như cũ
const DAT_TIED={};for(const id in CONG_TRINH)for(const a of CONG_TRINH[id].acts)(DAT_TIED[a]=DAT_TIED[a]||[]).push(id);
const DAT_SETTLE=['tran','thanh','cho','ancu','tong'];
function datStore(){const w=W();return w?(w.dat||(w.dat={})):null;}
function datCt(c){return c&&c.ct?CONG_TRINH[c.ct]:null;}
function datHas(n,ct){const d=datStore()&&datStore()[n.id];return !!d&&d.o.some(c=>c.ct===ct);}
// các nút "lẽ ra phải có" ở nơi này, kể cả khi đang hoang tàn (để sinh ô cho đủ khi nơi đó hồi lại)
function datNeed(n,L){const S=new Set((L||[]).map(a=>a.a));const t=n.type;
  if(typeof isWild==='function'&&isWild(n)){S.add('sanbat');S.add('sanyeu');if(WILD.includes(t)||n.dp)S.add('tinh');
    let mt='';try{mt=t==='duoc'?'thao':t==='khoang'?'khoang':exploreStats(n).mat;}catch(e){}if(mt==='thao')S.add('haithuoc');if(mt==='khoang')S.add('daokhoang');}
  return S;}
// trọng số địa hình quanh nút: số ô mỗi loại đất trong nút và sáu ô kề
function datTer(n){const C={};try{const g=geo(),h=nodeHex(n);for(const i of [h].concat(hexNb(h))){const t=g.ter[i];if(t!=null)C[t]=(C[t]||0)+1;}}catch(e){}return C;}
function datPickNat(n,a,C,k,skip){const w=W();const L=(DAT.hoang[a]||[]).filter(x=>!skip||!skip.includes(x[0]));if(!L.length)return null;
  const wt=L.map(([id,tw])=>{let s=0.2;for(const t in tw)s+=(C[t]||0)*tw[t];if(CONG_TRINH[id].noi.includes(n.type))s*=3;return s;});
  let x=wRnd(w,k)*wt.reduce((p,q)=>p+q,0);for(let i=0;i<L.length;i++){x-=wt[i];if(x<=0)return L[i][0];}return L[L.length-1][0];}
function datGen(n,L){const w=W(),t=n.type,o=[];const key=s=>'dat:'+n.id+':'+s;
  const add=ct=>{if(ct&&CONG_TRINH[ct]&&!o.some(c=>c.ct===ct))o.push({ct,chu:null,goc:1});};
  const covered=a=>o.some(c=>c.ct&&CONG_TRINH[c.ct].acts.includes(a));
  if(n.dp)add('dong_phu');
  for(const ct of DAT.goc[t]||[])add(ct);
  const need=datNeed(n,L),C=datTer(n);
  for(const a of Object.keys(DAT_TIED)){if(!need.has(a)||covered(a))continue;
    add(DAT.hoang[a]?datPickNat(n,a,C,key(a)):DAT_TIED[a][0]);}
  const wild=!DAT_SETTLE.includes(t);
  if(wild){const [p,mx]=DAT.them;let m=0;for(const a of Object.keys(DAT.hoang)){if(m>=mx||!need.has(a))continue;
      if(wRnd(w,key('them:'+a))<p){const ct=datPickNat(n,a,C,key('them2:'+a),o.map(c=>c.ct));if(ct){add(ct);m++;}}}}
  const tr=DAT.trong[wild?'hoang':t]||[0,0];const ne=tr[0]+Math.floor(wRnd(w,key('trong'))*(tr[1]-tr[0]+1));
  for(let i=0;i<ne;i++)o.push({ct:null,chu:null,goc:0});
  datChuGan(n,o);
  return {v:DAT_V,o,pha:{}};}
// chủ đất: sơn môn của tông; nơi neo thì thế lực giữ nơi đó và người giữ vai ở đó; còn lại ở thôn trấn/thành là đất của dân; hoang dã không chủ
function datChuGan(n,o){const t=n.type;const code=n.anchor,Lc=code&&typeof LOC_NEO!=='undefined'&&LOC_NEO[code];
  const fa=Lc&&Lc.fa&&typeof THE_LUC!=='undefined'&&THE_LUC[Lc.fa]?Lc.fa:null;
  if(t==='tong'){for(const c of o)c.chu={k:'tong',n:n.owner||n.name};return;}
  if(DAT_SETTLE.includes(t)){const vai=code&&typeof VAI_NP!=='undefined'?Object.keys(VAI_NP).filter(m=>VAI_NP[m].noi===code).sort():[];let vi=0;
    for(const c of o){if(fa&&['tram_dich','tien_trang','bang_thuong'].includes(c.ct))c.chu={k:'fa',id:fa};
      else if(c.ct&&vi<vai.length)c.chu={k:'vai',id:vai[vi++]};else c.chu={k:'dan'};}
    return;}
  for(const c of o)c.chu=fa&&c.ct?{k:'fa',id:fa}:null;}
// lấy ô của một nút (sinh nếu chưa có). L = danh sách nút CHƯA lọc (nếu có sẵn) để sinh đủ dịch vụ đang có
function datOf(n,L){const D=datStore();if(!D||!n)return null;let d=D[n.id];
  if(!d||!Array.isArray(d.o)){if(!L){DAT_RAW_ON=1;try{L=placeActs(n);}finally{DAT_RAW_ON=0;}}d=D[n.id]=datGen(n,L);dbg('dat.sinh',{id:n.id,type:n.type,o:d.o.map(c=>c.ct||'-').join(',')});}
  if(!d.pha)d.pha={};datMoc(n,d);return d;}
// Sửa-O (câu 76): công trình tự nhiên bị phá (c.cu = mã cũ, c.moc = lúc mọc lại) tự mọc lại nếu ô vẫn trống; đã xây gì lên thì thôi
function datMoc(n,d){const t=W().t;for(const c of d.o){if(!c.cu)continue;if(c.ct){delete c.cu;delete c.moc;continue;}
  if(t>=c.moc){c.ct=c.cu;delete c.cu;delete c.moc;dbg('dat.moc',{id:n.id,ct:c.ct});}}}
// bản lưu cũ / nơi đổi loại: sinh lại ô thì vẫn giữ những gì đã phá (d.pha) và chủ đã đổi
let DAT_RAW_ON=0;
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(DAT_RAW_ON||!feat('dat')||!G.run||!n||n.type==='ai'||n.type==='sao'||!W())return L;
  const d=datOf(n,L);if(!d)return L;const t=W().t;const out=[];
  for(const a of L){const ids=DAT_TIED[a.a];if(!ids){out.push(a);continue;}
    const cs=d.o.filter(c=>c.ct&&ids.includes(c.ct));if(!cs.length)continue;
    if(cs.every(c=>c.hu>t)){a.dis=true;a.x=contentText('dat.huX');}out.push(a);}
  if(d.o.length&&!out.some(x=>x.a==='datdai'))out.push({a:'datdai',i:'🏞️',l:contentText('dat.n'),h:0,tip:contentText('dat.tip',[d.o.length]),dis:false,x:''});
  return out;};}
// khai phủ xong (n.dp=1) thì ô trống đầu tiên thành động phủ (hoặc thêm ô)
{const _p=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;const n=sc&&sc.type==='place'&&nodeById(sc.id);const dp0=n&&n.dp;
  const o=_p.apply(this,arguments);if(a==='khaiphu'&&n&&!dp0&&n.dp)datDatDongPhu(n);return o;};}
function datDatDongPhu(n){const d=datOf(n);if(!d||d.o.some(c=>c.ct==='dong_phu'))return;const e=d.o.find(c=>!c.ct&&!c.chu);
  if(e){e.ct='dong_phu';e.chu=G.run&&!G.run.pham?{k:'ta'}:null;}else d.o.push({ct:'dong_phu',chu:{k:'ta'},goc:0});dbg('dat.dongphu',{id:n.id});}
// danh sách ô để hiện / kiểm: [{i, ct, ten, chu, chuTen, hu}]
function datView(n){const d=datOf(n);if(!d)return [];const t=W().t;
  return d.o.map((c,i)=>({i,ct:c.ct,ten:c.ct?CONG_TRINH[c.ct].n:contentText(c.chu?'dat.trongChu':'dat.trong'),tu:c.ct?CONG_TRINH[c.ct].tu:0,chu:c.chu,chuTen:datChuTen(c.chu),hu:c.hu>t}));}
function datChuTen(chu){if(!chu)return contentText('dat.khongChu');
  if(chu.k==='vai'){const v=typeof vaiNow==='function'&&vaiNow(chu.id);return v&&v.song?v.ten:contentText('dat.chuVang');}
  if(chu.k==='fa'){const f=typeof faNow==='function'&&faNow(chu.id);return f&&f.n||(THE_LUC[chu.id]||{}).n||chu.id;}
  if(chu.k==='tong')return chu.n||contentText('dat.chuTong');
  if(chu.k==='ta')return contentText('dat.chuTa');
  return contentText('dat.chuDan');}
