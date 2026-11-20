// ĐỢT 8.4: mười bốn đồng hồ thế giới (HN A.9.2). Bảng THOI_CUC, QUOC_MOI: content/world/thoi-cuc.js; chữ tc.*, tg.* ở content/text/the-gioi.json.
// w.thoiCuc[id]={pha (0 yên, 1–3 giai đoạn), tPha, tNext, lan, canThiep, ketQua:[{y,kq,md}], muc (CLK06)}.
// Chạy trong worldYear (mỗi năm thế giới). Khi không ai can thiệp: áp macDinh, ghi Sử lược (Luật 3 HN A.17).
function tcInit(w){w=w||W();if(!w)return null;const S=w.thoiCuc||(w.thoiCuc={});const y0=tYear(w.t||0);
  for(const id in THOI_CUC)if(!S[id]){const D=THOI_CUC[id];const x=wRnd(w,'tc0:'+id);
    let nx=D.dau?1000+D.dau[0]+Math.floor(x*(D.dau[1]-D.dau[0]+1)):null;if(D.lap===0&&!D.mot)nx=null;
    if(nx!=null&&nx<=y0)nx=y0+1+Math.floor(x*(D.lap?D.lap[0]:20));
    S[id]={pha:0,tPha:null,tNext:nx,lan:0,canThiep:null,ketQua:[],muc:0};}
  return S;}
function tcNext(D,id,y,w,lan){return y+D.lap[0]+Math.floor(wRnd(w,'tcN:'+id+':'+lan)*(D.lap[1]-D.lap[0]+1));}
function clkYear(w,y,o){const S=tcInit(w);const gop=!!(o&&o.gop);
  for(const id in THOI_CUC){const D=THOI_CUC[id],s=S[id];
    if(D.lap===0&&!D.mot){if(s.muc>=4&&s.tPha!=null&&y-s.tPha>=D.dai[2]){clkResolve(id,w,y,o);s.muc=2;s.pha=1;s.tPha=null;}continue;}
    if(s.tNext==null&&s.pha===0)continue;
    if(gop&&D.lap&&D.lap[1]<10){if(y%10!==9)continue;if(s.tNext<=y){s.canThiep=null;clkResolve(id,w,y,o);s.pha=0;s.tPha=null;s.tNext=tcNext(D,id,y,w,s.lan);}continue;}
    if(s.pha===0){if(y<s.tNext)continue;s.pha=1;s.tPha=y;s.canThiep=null;if(!gop&&G.run)chronQuiet(contentText('tc.batDau',[D.n,D.giaiDoan[0]]));dbg('tc.mo',{id,y});}
    while(s.pha>0&&y-s.tPha>=D.dai[s.pha-1]){s.tPha+=D.dai[s.pha-1];s.pha++;
      if(s.pha>3){clkResolve(id,w,y,o);s.pha=0;s.tPha=null;s.tNext=D.mot?null:tcNext(D,id,y,w,s.lan);break;}
      if(!gop&&G.run)chronQuiet(contentText('tc.batDau',[D.n,D.giaiDoan[s.pha-1]]));}}}
function clkResolve(id,w,y,o){const D=THOI_CUC[id],s=tcInit(w)[id];const ct=s.canThiep;let kq,md=0;
  if(ct&&ct.kq)kq=ct.kq;else{md=1;kq=clkMacDinh(id,w,y,o);}
  s.ketQua.push({y,kq:String(kq).slice(0,200),md});if(s.ketQua.length>5)s.ketQua.shift();s.lan++;s.canThiep=null;
  if(md){suLuocAdd(kq,'clk',w);if(G.run&&!(o&&o.gop))chron(kq);}dbg('tc.xong',{id,md,y});return kq;}
// kết quả mặc định của từng đồng hồ (đọc fx trong bảng)
function clkMacDinh(id,w,y,o){const D=THOI_CUC[id],fx=D.fx||{};let t=D.macDinh;const r=G.run;
  if(fx.toan&&wRnd(w,'toan:'+y)<fx.toan){t=D.macDinh2;for(const f in THE_LUC)faAdj(f,-4,id,w);}
  if(fx.fa)for(const f in fx.fa)faAdj(f,fx.fa[f],id,w);
  if(fx.loc)locHu(fx.loc,w,y,fx.ruin?fx.ruin[0]+Math.floor(wRnd(w,'ru:'+id+y)*(fx.ruin[1]-fx.ruin[0]+1)):0);
  if(fx.ruinTran){const R=fx.ruinTran;const L=w.regions[R.kv].nodes.filter(n=>n.type==='tran'&&n.state!=='ruin'&&!n.anchor&&(!r||n.id!==r.at)).sort((a,b)=>a.id-b.id);
    const k=R.n[0]+Math.floor(wRnd(w,'rt:'+y)*(R.n[1]-R.n[0]+1));for(let i=0;i<k&&L.length;i++){const n=L.splice(Math.floor(wRnd(w,'rt'+i+':'+y)*L.length),1)[0];n.state='ruin';n.stateUntil=w.t+(R.y[0]+Math.floor(wRnd(w,'ry'+i+y)*(R.y[1]-R.y[0]+1)))*HY;}}
  if(fx.tong){const sOf=n=>w.sects.find(s=>s.n===n.owner);const side=s=>s&&(s.al==='ma'||s.al==='ta')?'ma':'chinh';
    const T=[];for(const R0 of w.regions)for(const n of R0.nodes)if(n.type==='tong'&&n.owner&&sOf(n)&&(!r||n.id!==r.at))T.push(n);
    if(T.length){const c={ma:T.filter(n=>side(sOf(n))==='ma').length,chinh:T.filter(n=>side(sOf(n))==='chinh').length};
      const thua=id==='CLK08'?(c.ma<=c.chinh?'ma':'chinh'):(wRnd(w,'tg:'+y)<0.5?'ma':'chinh');
      const L=T.filter(n=>side(sOf(n))===thua).sort((a,b)=>a.id-b.id);const S2=w.sects.filter(s=>side(s)!==thua);
      if(L.length&&S2.length){const n=wPick(w,L,'tn:'+id+y),s2=wPick(w,S2,'ts:'+id+y);n.owner=s2.n;t+=' '+contentText('tc.tong',[n.name,s2.n]);}}}
  if(fx.vetNut)w.vetNut=(w.vetNut||0)+1;
  if(fx.doiNgoi){w.trieu=w.trieu||[{n:w.quoc,tu:1000}];const L=QUOC_MOI.filter(q=>q!==w.quoc);const q=wPick(w,L,'quoc:'+y);
    w.trieu[w.trieu.length-1].den=y;w.trieu.push({n:q,tu:y});if(w.trieu.length>20)w.trieu.splice(1,1);w.quoc=q;t+=' '+contentText('tc.quoc',[q]);
    const v=vaiInit(w).NP04;if(v.song)vaiMat('NP04','doi_ngoi',w);v.keThay=1;v.cho=y;
    const f=faInit(w).FA01;if(f.trang==='diet'){f.trang='song';f.lap++;}f.suc=Math.max(f.suc,55);f.tien=40;}
  if(fx.dich){let k=0;for(const ma in VAI_NP){const P=VAI_NP[ma],v=w.vai&&w.vai[ma];if(!v||!v.song||P.tu>=0||P.bat)continue;
      if(fx.dich.kv.includes(LOC_NEO[P.noi].kv)&&wRnd(w,'dich:'+ma+y)<fx.dich.p){vaiMat(ma,'dich',w);k++;}}
    const F=faInit(w);for(const f in THE_LUC)if(fx.dich.kv.includes(THE_LUC[f].noi?LOC_NEO[THE_LUC[f].noi].kv:THE_LUC[f].kv))F[f].dan=Math.round(F[f].dan*(1-fx.dich.p));if(k)t+=' '+contentText('tc.dich',[k]);}
  if(fx.longMach){w.lkMod=w.lkMod||{};const k=Math.floor(wRnd(w,'lm:'+y)*5);w.lkMod[k]=Math.max(0.4,(w.lkMod[k]==null?1:w.lkMod[k])-fx.longMach);t+=' '+contentText('tc.long',[REG[k].n]);}
  if(fx.maVuc&&typeof maVucTao==='function'){const n=anchorOf(w,D.noi);maVucTao(n?n.id:null,fx.maVuc,w);}
  return t;}

// Luật 2: nơi neo bị phá chỉ đi theo các trạng thái đã viết (LOC_NEO.pha). Nơi lõi (LOC_LOI) không bao giờ hoang hẳn.
function locHu(code,w,y,ruinY){const n=anchorOf(w,code),L=LOC_NEO[code];if(!n||!L)return;
  const st=n.locPhaY!=null&&y-n.locPhaY<50?Math.min(L.pha.length,(n.locPha||0)+1):1;n.locPha=st;n.locPhaY=y;
  if(ruinY&&!L.loi&&!(G.run&&G.run.at===n.id)){n.state='ruin';n.stateUntil=w.t+ruinY*HY;}
  suLuocAdd(contentText('tg.locPha',[n.name,L.pha[st-1]]),'loc',w);dbg('neo.pha',{code,st});}
function locYear(w,y){for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor&&n.locPha&&n.state!=='ruin'&&y-n.locPhaY>=30){n.locPha=0;suLuocAdd(contentText('tg.locLanh',[n.name]),'loc',w);}}
function locPhaT(code){const n=locNode(code),L=LOC_NEO[code];return n&&n.locPha?L.pha[n.locPha-1]:'';}
// flipNode (đổi chủ / gặp nạn ngẫu nhiên) chạm nơi neo → đi theo trạng thái đã viết; nơi lõi không hoang
{const _fn=flipNode;flipNode=function(){const w=W();const was=new Set();for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor&&n.state==='ruin')was.add(n.id);
  _fn.apply(this,arguments);for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor&&n.state==='ruin'&&!was.has(n.id)){const L=LOC_NEO[n.anchor];
    if(L.loi){n.state='ok';n.stateUntil=0;}locHu(n.anchor,w,tYear(w.t),0);}};}

// Đêm Dài (CLK06): chỉ tăng vì hành động; tới nấc Ma chủ tỉnh mà năm năm không ai ngăn → ba khu đất ma
function demDaiTang(k,ly){const w=W(),s=tcInit(w).CLK06,D=THOI_CUC.CLK06;const m0=s.muc;s.muc=clamp(s.muc+(k||1),0,5);
  s.pha=s.muc>=4?3:s.muc>=3?2:s.muc>=1?1:0;if(s.muc>=4&&s.tPha==null)s.tPha=tYear(w.t);
  if(s.pha&&s.muc>m0)chron(contentText('tc.demDai',[D.giaiDoan[s.pha-1]]));dbg('tc.demDai',{muc:s.muc,ly:ly||''});return s.muc;}
function demDaiGiam(k){const w=W(),s=tcInit(w).CLK06;s.muc=clamp(s.muc-(k||1),0,5);s.pha=s.muc>=4?3:s.muc>=3?2:s.muc>=1?1:0;if(s.muc<4)s.tPha=null;chron(contentText('tc.demDaiLui'));return s.muc;}
// can thiệp (Đ9 dùng): chỉ khi đồng hồ đang diễn ra
function clkCanThiep(id,kq){const s=tcInit(W())[id];if(!s||!s.pha)return false;s.canThiep={kq,y:tYear(W().t)};dbg('tc.can',{id});return true;}
function clkView(){const S=tcInit(W());return Object.keys(THOI_CUC).filter(id=>S[id].pha>0).map(id=>({id,n:THOI_CUC[id].n,giai:THOI_CUC[id].giaiDoan[S[id].pha-1],pha:S[id].pha}));}
function thienLoMo(){const s=tcInit(W()).CLK14;return !!s&&s.pha===2;}
function biCanhMo(){const s=tcInit(W()).CLK11;return !!s&&s.pha===2;}
// linh khí theo khu (Long Mạch Đứt): hồi rất chậm
function lkModAt(n){const w=W();if(!n||!w.lkMod)return 1;const v=w.lkMod[idReg(n.id)];return v==null?1:v;}
function lkYear(w){if(!w.lkMod)return;for(const k in w.lkMod){w.lkMod[k]=Math.min(1,w.lkMod[k]+0.0005);if(w.lkMod[k]>=1)delete w.lkMod[k];}}
{const _bq=bqRate;bqRate=function(){return _bq.apply(this,arguments)*lkModAt(curNode());};}
{const _wy=worldYear;worldYear=function(y,o,w){_wy(y,o,w);w=w||W();clkYear(w,y,o);locYear(w,y);lkYear(w);};}
{const _ni=worldNeoInit;worldNeoInit=function(w){_ni(w);if(w&&w.regions)tcInit(w);};}
