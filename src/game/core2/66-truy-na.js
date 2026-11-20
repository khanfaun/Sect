// ================= SỬA-O (câu 77): HỆ TRUY NÃ KIỂU THẾ GIỚI MỞ =================
// Bảng TNA: content/rules/truy-na.js · chữ: content/text/truy-na.json (tna.*). Cờ FEAT.tna (bật; test.js `fresh` tắt, bài `truy_na` bật lại).
// r.tna = {[khoá]: {m mức 1..5, tien xu treo thưởng, t lần sau cùng bị quan sai nhận ra, ly [các loại tội], fa [thế lực biết mặt]}}.
//   Khoá: 'q<số quận>' = sổ của quan phủ một QUẬN (g.dist / g.dnames, core2/04) — tội ở thôn trấn, thành, chợ, hoang dã…;
//         'f:<thế lực>' = sổ riêng của một tông môn ('f:tong:<id nơi>') hoặc căn cứ thế lực ('f:FAxx', nơi neo là trụ sở, không phải trấn/thành);
//         'r<vùng>' = dự phòng khi nơi không thuộc quận nào. Bản lưu cũ có khoá số (vùng) → tnaFix chép sang mọi quận của vùng đó.
//   Xoá tội (nộp phạt, làm công, ngồi tù, bị bắt) chỉ xoá đúng sổ của nơi đó: quan phủ → quận; chấp pháp đường tông môn / căn cứ → riêng thế lực đó.
// r.tnaCh = {reg, loai, nang, node, t}: nhân chứng đang chạy đi báo quan (chờ ngươi chọn: ngăn, mua chuộc, giết, mặc kệ).
// r.caiT = cải trang tới lúc này. r.tnaV = 1: đã chuyển bản lưu cũ (danh tiếng khu ≤ −60 = đang bị truy nã mức 2).
// Gộp: nợ (noTruyNa, Sửa-B) → tội 'no'; phá đất dân (datPhat, Đ8b) → tội 'pha_dat' qua nhân chứng; danh tiếng khu tụt tới mức truy nã (Đ1.4) → tội 'danh';
//      truy đuổi (Sửa-K): quan sai (truy loại quan / no) và thợ săn tiền thưởng (truy loại san) là kẻ bám theo.
FEAT.tna=1;
let TNA_BUSY=0;
const TNA_I=['','👁','📜','⛓','🔥','☠'];
function tnaOn(){return feat('tna')&&!!G.run&&!!W();}
function tnaS(){const r=G.run;if(!r.tna)r.tna={};return tnaFix();}
function tnaReg(n){return n&&n.r!=null?n.r:(G.run.region||0);}
// ---- quận (đơn vị hành chính) và căn cứ thế lực ----
function tnaQI(){const g=geo();if(!g._tq){const reg={},by={};for(let i=0;i<g.dist.length;i++){const d=g.dist[i],k=g.reg[i];if(d<0||k<0||reg[d]!=null)continue;reg[d]=k;(by[k]||(by[k]=[])).push(d);}
  for(const k in by)by[k].sort((a,b)=>a-b);g._tq={reg,by};}return g._tq;}
function tnaQ(n){if(!n)return tnaKey(G.run.region||0);const d=geo().dist[nodeHex(n)];return d>=0?'q'+d:'r'+tnaReg(n);}
function tnaQs(){return Object.keys(tnaQI().reg).map(d=>'q'+d);}
// tông môn → 'tong:id'; trụ sở thế lực còn sống (THE_LUC.noi) mà không phải thôn trấn / thành → mã thế lực; nơi khác → null (thuộc quan phủ quận)
function tnaCanCu(n){if(!n)return null;if(n.type==='tong')return 'tong:'+n.id;
  if(['tran','thanh'].includes(n.type)||!n.anchor||typeof THE_LUC==='undefined'||typeof LOC_NEO==='undefined')return null;
  const L=LOC_NEO[n.anchor],fa=L&&L.fa;return fa&&THE_LUC[fa]&&THE_LUC[fa].noi===n.anchor&&faAlive(fa)?fa:null;}
// khoá sổ ghi tội cho việc làm ở nơi n
function tnaK(n){const b=tnaCanCu(n);return b?'f:'+b:tnaQ(n);}
function tnaIsF(k){return typeof k==='string'&&k.startsWith('f:');}
// số (vùng, kiểu cũ) → quận của nơi đang đứng nếu ở vùng đó, không thì quận đầu của vùng
function tnaKey(x){if(x==null)return null;if(typeof x==='string'&&!/^\d+$/.test(x))return x;const k=+x;const r=G.run,n=r&&nodeById(r.at);
  if(n&&tnaReg(n)===k)return tnaQ(n);const L=tnaQI().by[k];return L&&L.length?'q'+L[0]:'r'+k;}
function tnaKReg(k){if(k[0]==='q')return tnaQI().reg[+k.slice(1)];if(k[0]==='r')return +k.slice(1);const f=k.slice(2);
  if(f.startsWith('tong:')){const n=nodeById(+f.slice(5));return n?n.r:-1;}const a=THE_LUC[f]&&anchorOf(W(),THE_LUC[f].noi);return a?tnaReg(a):-1;}
function tnaKTen(k){k=tnaKey(k);if(tnaIsF(k))return tnaFaTen(k.slice(2));if(k[0]==='r')return tnaRegTen(+k.slice(1));return geo().dnames[+k.slice(1)]||tnaRegTen(tnaKReg(k));}
function tnaRegCo(i){const T=G.run.tna||{};return Object.keys(T).some(k=>!tnaIsF(k)&&tnaKReg(k)===i);}
// các sổ liên quan nơi đang đứng: căn cứ (nếu đứng ở căn cứ) rồi quận
function tnaHereK(){const r=G.run;const reg=r.region||0,n=nodeById(r.at);const L=[tnaKey(reg)];if(n&&tnaReg(n)===reg){const b=tnaCanCu(n);if(b)L.unshift('f:'+b);}return L;}
// bản lưu cũ: sổ theo vùng (khoá số) → chép sang mọi quận của vùng (tiền treo thưởng chia đều); nhân chứng cũ thêm khoá
function tnaFix(){const r=G.run;const T=r&&r.tna;if(!T)return T;
  for(const k of Object.keys(T)){if(!/^\d+$/.test(k))continue;const E=T[k];delete T[k];const L=(tnaQI().by[+k]||[]).map(d=>'q'+d);if(!L.length)L.push('r'+k);
    for(const q of L)if(!T[q]){const F=Object.assign({},E,{tien:Math.ceil((E.tien||0)/L.length),ly:(E.ly||[]).slice()});if(E.fa)F.fa=E.fa.slice();else delete F.fa;T[q]=F;}
    dbg('tna.quyQuan',{reg:+k,n:L.length});}
  const C=r.tnaCh;if(C&&C.k==null)C.k=C.node!=null&&nodeById(C.node)?tnaK(nodeById(C.node)):tnaKey(C.reg||0);
  return T;}
function tnaE(k){const r=G.run;if(!r||!r.tna)return null;tnaFix();return r.tna[tnaKey(k)]||null;}
function tnaMuc(k){const E=tnaE(k);return E?E.m:0;}
function tnaMax(){const r=G.run;if(r&&r.tna)tnaFix();let m=0;for(const k in (r&&r.tna)||{})m=Math.max(m,r.tna[k].m);return m;}
function tnaTruyK(k){const T=G.run.truy;if(T&&['quan','san','no'].includes(T.k))T.tk=k;}
function tnaChe(){const r=G.run;return !!r&&((typeof hideOn==='function'&&hideOn())||(r.caiT||0)>W().t);}
function tnaTen(m){return contentText('tna.m.'+m);}
function tnaRegTen(reg){return (REG[reg]&&REG[reg].n)||'';}
function tnaTienChu(x){return contentText('tna.tien.'+(x<1000?0:x<3000?1:x<8000?2:3));}
// câu 81: nơi của thế lực tu sĩ (chợ phiên tu sĩ, sơn môn, thảo lư) → linh thạch; nơi phàm nhân → tiền phàm (xu / bạc / vàng)
function tnaTuNoi(n){return !!n&&(TNA.tuNoi.includes(n.type)||!!tnaCanCu(n));}
function tnaQpV(n){return tnaTuNoi(n)?'chapphap':'quanphu';}
function tnaNoi(n){return n&&TNA.chung[n.type]!=null&&!['chac','che','hoang'].includes(n.type)?n.type:n&&tnaCanCu(n)?'tong':'hoang';}
// danh tiếng khu (vùng chứa quận): bị truy nã (mức ≥ 2) thì kéo xuống mức "Bị truy nã" của Đ1.4; hết truy nã (không còn quận nào trong vùng từ mức 2) thì nâng lên "bị ghét"
// sổ riêng của tông môn / thế lực không đụng danh tiếng khu
function tnaDanhXuong(q){if(tnaIsF(q))return;const k='reg:'+tnaKReg(q),v=danhGet(k);if(v>TNA.danh)danhPut(k,TNA.danh-v);}
function tnaDanhLen(q){if(tnaIsF(q))return;const reg=tnaKReg(q),T=G.run.tna||{};if(Object.keys(T).some(x=>x!==q&&!tnaIsF(x)&&tnaKReg(x)===reg&&T[x].m>=2))return;
  const k='reg:'+reg,v=danhGet(k);if(v<=TNA.danh)danhPut(k,TNA.danhSau-v);}
// quan phủ quận / chấp pháp thế lực ghi tội: tăng mức, cộng tiền treo thưởng, quan sai lần theo (nếu ngươi đang ở đó)
function tnaBao(k0,nang,o){const r=G.run;if(!r||!nang||!W())return null;o=o||{};const T=tnaS(),t=W().t;const reg=tnaKey(k0);
  const E=T[reg]||(T[reg]={m:0,tien:0,t,ly:[],fa:[]});const m0=E.m;E.m=clamp(E.m+nang,1,5);
  const nd=o.node;tnaFaGhi(E,o.lan?'*':o.faK||(nd?tnaFa(nd):'*'));E.tien+=Math.round(TNA.tien.xu*nang*(nd&&nd.type==='thanh'?TNA.tien.thanh:1));E.t=t;if(o.ly&&!E.ly.includes(o.ly))E.ly.push(o.ly);
  if(E.m>=TNA.lan)E.fa=['*'];if(E.m>=2)tnaDanhXuong(reg);
  // tội rất nặng: lan sang mọi quận khác (sổ thế lực khác không lan)
  if(E.m>=TNA.lan&&!o.lan)for(const q of tnaQs()){if(q===reg)continue;const F=T[q];if(!F||F.m<TNA.lanM)tnaBao(q,TNA.lanM-(F?F.m:0),{ly:'lan',lan:1,quiet:1,noTruy:1});}
  const f=tnaIsF(reg);if(!o.quiet){const m=contentText(f?(m0?'tna.tangF':'tna.baoF'):(m0?'tna.tang':'tna.bao'),[tnaKTen(reg),tnaTen(E.m)]);note(m,'dn');log(m);}
  if(!o.noTruy&&feat('truy')&&(o.luon||tnaHereK().includes(reg))){truyStart(o.k||'quan',{n:contentText(o.k==='no'?'truy.noTen':'tna.quanTen'),i:'👮',ek:'sontac',d:clamp(E.m-2,0,3)});tnaTruyK(reg);}
  dbg('tna.bao',{k:reg,m0,m:E.m,nang,ly:o.ly||'',tien:E.tien,fa:(E.fa||['*']).join()});return E;}
// xoá truy nã ở một sổ (quận hoặc thế lực: nộp phạt, ngồi tù, làm công, mất dấu hết)
function tnaXoa(k0,why){const r=G.run;const E=tnaE(k0);if(!E)return false;const reg=tnaKey(k0);delete r.tna[reg];tnaDanhLen(reg);
  if(r.truy&&['quan','san'].includes(r.truy.k)&&(!r.truy.tk||r.truy.tk===reg)&&(why!=='matdau'||tnaHereK().includes(reg)))truyEnd(why,1);
  dbg('tna.xoa',{k:reg,why,f:tnaIsF(reg)?1:0});return true;}
// phạm tội ở nơi đang đứng. Trả 0 không ai thấy · 1 có nhân chứng (chờ ngươi chọn) · 2 bị báo quan ngay
function tnaToi(loai,o){const r=G.run;if(!tnaOn())return 0;o=o||{};const n=o.node||nodeById(r.at);const nang=o.nang||TNA.toi[loai]||TNA.deed[loai]||1;
  const reg=tnaReg(n),sk=n?tnaK(n):tnaKey(reg),k=tnaNoi(n);let p=TNA.chung[k];const che=tnaChe();if(che)p*=TNA.chung.che;
  if(!(R()<p)){dbg('tna.khong',{loai,k,p:Math.round(p*100)});return 0;}
  if(TNA.chung[k]>=TNA.chung.chac&&!che){tnaBao(sk,nang,{ly:loai,node:n,luon:1});return 2;}
  r.tnaCh={reg,k:sk,loai,nang,node:n?n.id:null,t:W().t};dbg('tna.chung',{loai,k,sk});tnaChMo();return 1;}
// hộp lựa chọn khi có nhân chứng chạy đi báo quan (mở ngay nếu rảnh, không thì lúc rảnh đầu tiên)
function tnaChMo(){const r=G.run;const C=r&&r.tnaCh;if(!C||r.scene||r._inBq||TNA_BUSY)return false;kyStart(tnaChEv(C));return true;}
function tnaMuaGia(C){const M=TNA.mua;return tnaTuNoi(nodeById(C.node))?{st:M.st*C.nang}:{xu:M.xu*C.nang};}
function tnaChEv(C){let ev=KYNGO.find(x=>x.id==='tna_chung');if(!ev){ev={id:'tna_chung',sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  const n=nodeById(C.node);ev.n=contentText('tna.chN');ev.t=contentText('tna.chT',[n?n.name:'']);const g=tnaMuaGia(C);
  ev.c=[{l:contentText('tna.chNgan'),go:()=>tnaChPick('ngan')},
    {l:g.st?contentText('tna.chMuaLt',[g.st]):contentText('tna.chMua',[fmtBac(g.xu)]),need:()=>(g.st?(G.run.st||0)>=g.st:(G.run.bac||0)>=g.xu)?'':contentText('truy.nopThieu'),go:()=>tnaChPick('mua')},
    {l:contentText('tna.chGiet'),go:()=>tnaChPick('giet')},
    {l:contentText('tna.chMac'),go:()=>tnaChPick('mac')}];return ev;}
function tnaChBao(C,them,ly){G.run.tnaCh=null;tnaBao(C.k!=null?C.k:tnaKey(C.reg||0),C.nang+(them||0),{ly:ly||C.loai,node:nodeById(C.node),luon:1});}
function tnaChPick(o){const r=G.run,C=r.tnaCh;if(!C)return {t:''};dbg('tna.chon',{o});
  if(o==='ngan'){const N=TNA.ngan;if(chance(Math.min(N.max,N.goc+N.tp*(S().tp||0)))){r.tnaCh=null;return {t:contentText('tna.nganOk')};}tnaChBao(C);return {t:contentText('tna.nganHong')};}
  if(o==='mua'){const g=tnaMuaGia(C);if(g.xu&&(r.bac||0)>=g.xu)bacAdd(-g.xu,'tna.mua');else if(g.st&&(r.st||0)>=g.st)r.st-=g.st;else return {t:''};dbg('tna.mua',g);
    if(chance(TNA.mua.p)){r.tnaCh=null;return {t:contentText('tna.muaOk')};}tnaChBao(C);return {t:contentText('tna.muaHong')};}
  if(o==='giet'){if(typeof deed==='function'&&DEED.diet_khau)deed('diet_khau',{lo:0});
    if(chance(TNA.giet.lo*(tnaChe()?TNA.giet.che:1))){tnaChBao(C,TNA.toi.giet_chung,'giet_chung');return {t:contentText('tna.gietLo')};}r.tnaCh=null;return {t:contentText('tna.gietOk')};}
  tnaChBao(C);return {t:contentText('tna.macT')};}
// thời gian trôi: mất dấu hạ mức, nợ trả xong thì thôi, danh tiếng tụt tới mức truy nã thì bị ghi tội, thợ săn tiền thưởng, nhân chứng đang chờ
function tnaTick(){const r=G.run;if(!tnaOn()||TNA_BUSY)return;const t=W().t,T=tnaS();
  // danh tiếng khu tụt tới mức truy nã mà vùng chưa có quận nào ghi tội → ghi vào quận đang đứng (hoặc quận đầu của vùng)
  if(r.tnaV!==1){r.tnaV=1;for(let i=0;i<W().regions.length;i++)if(!tnaRegCo(i)&&danhGet('reg:'+i)<=TNA.danh){const q=tnaKey(i);T[q]={m:2,tien:TNA.tien.xu*2,t,ly:['danh']};dbg('tna.cu',{reg:i,k:q});}}
  for(let i=0;i<W().regions.length;i++)if(!tnaRegCo(i)&&danhGet('reg:'+i)<=TNA.danh)tnaBao(tnaKey(i),TNA.toi.danh,{ly:'danh',noTruy:1});
  const H=tnaHereK();
  for(const k of Object.keys(T)){const E=T[k];if(!E)continue;
    if(E.ly.length&&E.ly.every(x=>x==='no')&&(r.bac||0)>=0&&!r.noTra&&!r.vay){tnaXoa(k,'tra');continue;}
    const need=TNA.matDau[E.m]*HD*(!H.includes(k)?TNA.ngoai:1);
    if(t-E.t>=need){E.m--;E.t=t;dbg('tna.ha',{k,m:E.m});if(E.m<2)tnaDanhLen(k);const f=tnaIsF(k);
      if(E.m<=0){tnaXoa(k,'matdau');const m=contentText(f?'tna.matHetF':'tna.matHet',[tnaKTen(k)]);note(m,'up');log(m);}else note(contentText(f?'tna.matDauF':'tna.matDau',[tnaKTen(k),tnaTen(E.m)]),'up');}}
  const mo=Math.floor(t/HM);if(r.tnaSan!==mo){const lan=r.tnaSan!=null;r.tnaSan=mo;
    if(lan&&feat('truy')&&!r.truy)for(const k in T){const E=T[k];if(E.tien>=TNA.san.min&&chance(TNA.san.p)){
      truyStart('san',{n:contentText('tna.sanTen'),i:'🏹',ek:'tantu',d:clamp(E.m-2,0,3)});tnaTruyK(k);dbg('tna.san',{k,tien:E.tien});break;}}}
  if(r.tnaCh)tnaChMo();}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(G.run&&!TNA_BUSY)tnaTick();return o;};}
// tới thôn trấn / thành / chợ trong quận đang bị truy nã (hoặc căn cứ thế lực đang ghi tội ngươi): có thể bị nhận ra (cải trang, che giấu tu vi giúp né)
{const _ar=arrive;arrive=function(id){const o=_ar.apply(this,arguments);const r=G.run;if(!tnaOn())return o;const n=nodeById(id);
  if(!n||n.state==='ruin')return o;const b=tnaCanCu(n);if(!b&&!['tran','thanh','cho'].includes(n.type))return o;
  const reg=b?'f:'+b:tnaQ(n),E=tnaE(reg);if(!E)return o;
  if(!b&&!tnaBiet(E,n)){dbg('tna.laFa',{k:reg,fa:tnaFa(n)});return o;}
  const lo=tnaCaiThu(n);const p=lo?1:TNA.nhan[E.m]*(tnaChe()?TNA.chung.che:1);const hit=lo||chance(p);dbg('tna.nhan',{reg,p:Math.round(p*100),hit,lo:lo||''});
  if(hit){E.t=W().t;const m=contentText('tna.nhanRa',[n.name]);note(m,'dn');log(m);
    if(feat('truy')){truyStart('quan',{n:contentText('tna.quanTen'),i:'👮',ek:'sontac',d:clamp(E.m-2,0,3)});tnaTruyK(reg);}}
  return o;};}
// chống lại quan sai / thợ săn: thắng thì tội nặng thêm; thua thì bị giải về quan phủ, ngồi tù
{const _cc=combatContinue;combatContinue=function(){const r=G.run,sc=r&&r.scene;const T=r&&r.truy;
  const res=sc&&sc.type==='combat'&&sc.over&&sc.truyCh&&T&&['quan','san'].includes(T.k)&&tnaOn()?sc.over:null;
  // sổ của kẻ đang truy (T.tk); không rõ thì quận nơi đang đứng
  const reg=res?(T.tk&&tnaE(T.tk)?T.tk:tnaKey(r.region||0)):null;
  const o=_cc.apply(this,arguments);if(!res||!G.run)return o;
  const nd=nodeById(r.at),nd2=nd&&tnaK(nd)===reg?nd:null;
  if(res==='win')tnaBao(reg,TNA.toi.chong,{ly:'chong',node:nd2});
  else if(res==='lose'){const E=tnaE(reg)||tnaBao(reg,1,{ly:'chong',quiet:1,noTruy:1,node:nd2});tnaGiam(reg,'tu',1);}
  return o;};}
// gộp nợ (Sửa-B): truy nã ở quê vì nợ = tội 'no' ở vùng quê
function tnaNo(r){const n=noQue(r);if(!n)return false;tnaBao(tnaQ(n),TNA.toi.no,{ly:'no',k:'no',luon:1,quiet:1,faK:tnaFa(n)});return true;}
{const _nt=noTruy;noTruy=function(r){if(_nt.apply(this,arguments))return true;if(!tnaOn())return false;const n=noQue(r);return !!n&&tnaMuc(tnaQ(n))>0;};}
// gộp việc làm trong sổ nghiệp: phạm luật ở nơi có dân (không phải việc làm kín) → có thể bị truy nã
{const _d=deed;deed=function(id,o){const res=_d.apply(this,arguments);const r=G.run;
  if(r&&tnaOn()&&TNA.deed[id]&&!(o&&o.lo===0)&&!TNA_BUSY){const n=nodeById(r.at);if(tnaNoi(n)!=='hoang')tnaToi(id,{nang:TNA.deed[id],node:n});}return res;};}
// ngồi tù / làm công: thời gian trôi, xoá truy nã ở sổ đó (quận hoặc thế lực)
function tnaGiam(k0,kieu,bat){const r=G.run;const E=tnaE(k0);const reg=tnaKey(k0);if(!E)return false;const th=(kieu==='cong'?TNA.cong:TNA.tu)[E.m];if(!th)return false;
  r.scene=null;r.moving=null;if(r.truy&&['quan','san'].includes(r.truy.k))r.truy=null;
  TNA_BUSY=1;NO_BUSY=1;VT_AN=1;NGU_OK=1;try{advanceTime(th*HM);}finally{TNA_BUSY=0;NO_BUSY=0;VT_AN=0;NGU_OK=0;}if(!G.run)return true;
  tnaXoa(reg,kieu);const m=contentText(bat?'tna.biBat':kieu==='cong'?'tna.congXong':'tna.tuXong',[th]);note(m,'dn');log(m);dbg('tna.giam',{k:reg,kieu,th});return true;}
// ---------- Quan phủ (thôn trấn / thành của vùng đang bị truy nã) và cải trang ----------
VENUE_N.quanphu=contentText('tna.qpN');VENUE_IN.quanphu=[contentText('tna.qpIn1'),contentText('tna.qpIn2')];
VENUE_N.chapphap=contentText('tna.cpN');VENUE_IN.chapphap=[contentText('tna.cpIn1'),contentText('tna.cpIn2')];
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);const r=G.run;if(!tnaOn()||!n||n.state==='ruin')return L;
  const qv=tnaQpV(n),tu=qv==='chapphap',b=tnaCanCu(n);
  // quan phủ (quận) ở nơi giam giữ thường; tông môn / căn cứ thế lực chỉ xử sổ riêng của mình
  if((b||TNA.quan.includes(n.type))&&tnaE(tnaK(n))&&!L.some(x=>x.a===qv))L.push({a:qv,i:'⚖️',l:contentText(tu?'tna.cpN':'tna.qpN'),h:0,tip:contentText(tu?'tna.cpTip':'tna.qpTip'),dis:false,x:''});
  if(['tran','thanh','cho'].includes(n.type)&&tnaMax()>0&&!L.some(x=>x.a==='caitrang'))L.push({a:'caitrang',i:'🎭',l:contentText('tna.caiN'),h:1,tip:contentText('tna.caiTip',[TNA.cai.ngay]),dis:(r.bac||0)<TNA.cai.xu,x:(r.bac||0)<TNA.cai.xu?contentText('no.khongDu'):''});
  return L;};}
{const _p=placeAct;placeAct=function(a){if(a!=='caitrang')return _p.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place'||(r.bac||0)<TNA.cai.xu)return;
  bacAdd(-TNA.cai.xu,'tna.cai');advanceTime(1);if(!G.run)return;r.caiT=W().t+TNA.cai.ngay*HD;sc.msg=[contentText('tna.caiXong',[TNA.cai.ngay])];sc.chips=[bacChip(-TNA.cai.xu)];dbg('tna.cai',{den:r.caiT});};}
function tnaQpOpts(n){const r=G.run,E=tnaE(tnaK(n));if(!E)return [];const L=[];const P=TNA.phat;const st=Math.ceil(E.tien/P.xuLt);const cam=E.m>=P.phatMax?contentText('tna.qpNang'):'';
  // câu 81: nộp phạt tuỳ nơi giam giữ — quan phủ phàm nhân nhận tiền phàm, chấp pháp đường của tu sĩ nhận linh thạch
  if(!tnaTuNoi(n))L.push({id:'nop',l:contentText('tna.qpNop',[fmtBac(E.tien)]),d:contentText('tna.qpNopD',[tnaTen(E.m)]),h:1,st:0,g:{txt:fmtBac(E.tien)},no:cam||((r.bac||0)>=E.tien?'':contentText('no.khongDu'))});
  else L.push({id:'nopLt',l:contentText('tna.qpNopLt',[st]),d:contentText('tna.cpNopD',[tnaTen(E.m)]),h:1,st:0,g:{txt:st+' 💎'},no:cam||((r.st||0)>=st?'':contentText('dat.thieuLt'))});
  if(TNA.cong[E.m])L.push({id:'cong',l:contentText('tna.qpCong',[TNA.cong[E.m]]),d:contentText(tnaTuNoi(n)?'tna.cpCongD':'tna.qpCongD'),h:0,st:0,g:{},no:''});
  L.push({id:'tu',l:contentText('tna.qpTu',[TNA.tu[E.m]]),d:contentText('tna.qpTuD'),h:0,st:0,g:{},no:''});
  return L;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='quanphu'||v==='chapphap')return tnaQpOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='quanphu'||v==='chapphap')return tnaQpDo(id);return _vd.apply(this,arguments);};}
function tnaQpDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const reg=tnaK(n),E=tnaE(reg);
  const o=tnaQpOpts(n).find(x=>x.id===id);if(!o||o.no||!E)return false;let ch=[];
  if(id==='nop'){const x=E.tien;bacAdd(-x,'tna.phat');ch=[bacChip(-x)];}
  else if(id==='nopLt'){const x=Math.ceil(E.tien/TNA.phat.xuLt);r.st-=x;ch=[chip('💎','−'+x,contentText('tna.qpN'),'dn')];}
  if(id==='nop'||id==='nopLt'){advanceTime(1);if(!G.run)return true;tnaXoa(reg,'nop');dbg('tna.nop',{k:reg,id,tu:tnaTuNoi(n)?1:0,f:tnaIsF(reg)?1:0});sc.msg=[contentText(id==='nopLt'?'tna.nopXongLt':'tna.nopXong')];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;}
  tnaGiam(reg,id);if(G.run){openPlace(n.id);}saveSoon();return true;}
// HUD: biểu tượng truy nã (chữ + biểu tượng, không số)
function tnaHud(){const r=G.run;if(!tnaOn()||!r.tna)return null;tnaFix();let reg=tnaHereK().find(k=>r.tna[k]),E=reg&&r.tna[reg];
  if(!E){let b=null;for(const k in r.tna)if(!b||r.tna[k].m>r.tna[b].m)b=k;if(b==null)return null;reg=b;E=r.tna[b];}
  const L=[contentText('tna.hudN'),contentText('tna.hudT',[tnaKTen(reg),tnaTen(E.m),tnaTienChu(E.tien)])];
  const khac=Object.keys(r.tna).filter(k=>k!==reg).map(k=>tnaKTen(k)+': '+tnaTen(r.tna[k].m));if(khac.length)L.push(contentText('tna.hudKhac',[khac.slice(0,4).join(', ')+(khac.length>4?'…':'')]));
  L.push(tnaFaHud(E,reg));
  if(tnaChe())L.push(contentText('tna.hudChe'));if(tnaHoan())L.push(contentText('tna.hudHoan'));L.push(contentText('tna.hudCach'));
  return {t:TNA_I[E.m],tip:L.join('\n'),m:E.m};}
// ---------- Câu 83: cải trang qua mặt được nhưng không chắc chắn ----------
// Bị lộ (hết cải trang) khi: đánh nhau ở nơi có dân · bị nhiều người vây quanh nhìn kỹ (TNA.cai.dong) · lộ khí tức (chưa che giấu tu vi) ở nơi có lính canh (TNA.cai.canh).
function tnaCai(){const r=G.run;return !!r&&(r.caiT||0)>W().t;}
function tnaLo(why){const r=G.run;if(!tnaCai())return false;r.caiT=0;const m=contentText('tna.lo.'+why);note(m,'dn');log(m);dbg('tna.lo',{why});return true;}
// tới nơi có người khi đang cải trang: trả lý do bị lộ ('dong' / 'khi') hoặc ''
function tnaCaiThu(n){const r=G.run,C=TNA.cai;if(!tnaCai()||!n)return '';
  if(chance(C.dong[n.type]||0)){tnaLo('dong');return 'dong';}
  if(C.canh.includes(n.type)&&!isPham()&&(r.realm||0)>=1&&!hideOn()&&chance(Math.min(C.khi.max,C.khi.goc+C.khi.realm*r.realm))){tnaLo('khi');return 'khi';}
  return '';}
// đánh nhau ở nơi có dân: cải trang rách, ai đang truy ngươi ở vùng này thì biết ngươi ở đây
{const _sc=startCombat;startCombat=function(spec){const r=G.run;
  if(r&&tnaOn()&&tnaCai()&&!(spec&&spec.kiep)&&!r.moving&&tnaNoi(nodeById(r.at))!=='hoang'){tnaLo('danh');for(const k of tnaHereK()){const E=tnaE(k);if(E)E.t=W().t;}}
  return _sc.apply(this,arguments);};}
// ---------- Câu 82: sự kiện tạm hoãn kiểu GTA5 ----------
// Đang bị truy nã ở vùng đang đứng (từ TNA.hoan.m), đang bị quan sai / thợ săn lùng, hoặc nhân chứng đang đi báo quan:
// kỳ ngộ / sự kiện ngẫu nhiên (vòng kỳ ngộ hằng ngày, sự kiện dọc đường, kỳ ngộ phàm nhân) không hiện mà được giữ lại trong r.kyHoan
// (tối đa TNA.hoan.max), hết trạng thái đó thì lần lượt hiện lại. Truy đuổi, nhân chứng, cốt truyện chính, tâm ma, thọ cạn… không bị hoãn.
function tnaHoan(){const r=G.run;if(!r||!tnaOn())return false;
  return !!(r.tnaCh||(r.truy&&['quan','san','no'].includes(r.truy.k))||tnaHereK().some(k=>tnaMuc(k)>=TNA.hoan.m));}
kyHoanNow=function(){return tnaHoan();};
function tnaHoanThem(id){const r=G.run;const Q=Array.isArray(r.kyHoan)?r.kyHoan:(r.kyHoan=[]);
  if(Q.length<TNA.hoan.max&&!Q.includes(id))Q.push(id);dbg('tna.hoan',{id,n:Q.length});
  if(!r.kyHoanBao){r.kyHoanBao=1;note(contentText('tna.hoanBao'),'dn');dbg('tna.hoanBao',{id});}}
{const _kn=kyNgau;kyNgau=function(ev){const r=G.run;if(!ev||!tnaHoan())return _kn.apply(this,arguments);
  tnaHoanThem(ev.id);r.kyT=W().t;return false;};}
// sự kiện dọc đường: đang hoãn thì phần "sự kiện" được giữ lại, phần chạm trán đánh nhau vẫn như cũ (cùng xác suất với roadRoll gốc, core/09)
{const _rr=roadRoll;roadRoll=function(a,b){if(!tnaHoan())return _rr.apply(this,arguments);const r=G.run;const nb=nodeById(b);
  const dg=Math.max(nodeById(a).danger,nb.danger);let p=0.08+0.06*dg;if(partOf(W().t)==='dem')p*=1.5;if(!chance(p))return;
  if(chance(.55)){tnaHoanThem('road:'+nb.type);return;}
  r.place={n:contentText("core_09-ban-do_js.roadRoll.008")+nb.name,t:nb.type};encounter({type:dg>=3&&chance(.3)?'elite':'combat'});r.scene.back=null;};}
// hết trạng thái: thả từng cái, cách nhau ít nhất TNA.hoan.gian ngày. Cái nào điều kiện chưa hợp (nơi chốn, hồi chiêu) thì giữ lại chờ,
// quá TNA.hoan.giu ngày sau khi hết bị truy mà vẫn chưa hợp thì mới bỏ. r.kyHoanHet = lúc hết bị truy.
function tnaHoanThu(id){if(id.startsWith('road:')){const eid=pickEvent(id.slice(5),'road');return !!eid&&!!startEvent(eid)&&!!G.run.scene;}
  const ev=KYNGO.find(x=>x.id===id);if(!ev)return null;if(ev.g&&hasTp())return null;kyStart(ev);return !!G.run.scene;}
function tnaHoanTha(){const r=G.run;if(!r)return false;const Q=r.kyHoan,co=Array.isArray(Q)&&Q.length>0;
  if(tnaHoan()){if(co)r.kyHoanHet=null;return false;}
  // hết đợt bị truy: báo một dòng (chỉ khi đợt này có cái bị giữ lại), đợt sau báo lại từ đầu
  if(r.kyHoanBao){r.kyHoanBao=0;if(co){note(contentText('tna.hoanHet'),'up');dbg('tna.hoanHet',{n:Q.length});}}
  if(!co)return false;
  const t=W().t;if(r.kyHoanHet==null)r.kyHoanHet=t;
  if(r.scene||r._inBq||r.moving||G.screen!=='map'||TNA_BUSY)return false;
  if(t-(r.kyThaT==null?-1e9:r.kyThaT)<TNA.hoan.gian*HD)return false;
  const het=t-r.kyHoanHet>TNA.hoan.giu*HD;
  for(let i=0;i<Q.length;i++){const id=Q[i];const k=tnaHoanThu(id);
    if(k===true){Q.splice(i,1);r.kyThaT=t;r.kyT=t;dbg('tna.tha',{id,con:Q.length});return true;}
    if(k===null||het){Q.splice(i,1);i--;dbg('tna.bo',{id});}}
  return false;}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(G.run&&!TNA_BUSY&&tnaOn())tnaHoanTha();return o;};}
// ---------- Lính canh chia theo thế lực từng nơi ----------
// Mỗi nơi có một thế lực chủ (tnaFa): nơi neo của thế lực còn sống → thế lực đó; sơn môn → chính tông đó ('tong:id');
// nơi khác → thế lực còn sống có căn cứ gần nhất trong cùng đại khu (THE_LUC, Đ8.3); không có thì quan phủ địa phương ('reg:vùng').
// E.fa = [các thế lực đã biết mặt ngươi] trong bản ghi truy nã của vùng; '*' = cả vùng (tội không rõ nơi, danh tiếng tụt, bản lưu cũ không có fa, tội lan).
// Bị nhận ra / cải trang bị lộ chỉ do lính canh của thế lực nơi đang đứng, nếu thế lực đó biết mặt ngươi. Tội rất nặng (từ TNA.lan) thì mọi thế lực đều biết.
function tnaFa(n){if(!n)return null;const w=W();if(n.type==='tong')return 'tong:'+n.id;const reg=tnaReg(n);
  if(typeof THE_LUC==='undefined'||typeof anchorOf!=='function')return 'reg:'+reg;
  const L=n.anchor&&typeof LOC_NEO!=='undefined'&&LOC_NEO[n.anchor];if(L&&L.fa&&THE_LUC[L.fa]&&faAlive(L.fa))return L.fa;
  let best=null,bd=1e18;for(const id of Object.keys(THE_LUC).sort()){if(!faAlive(id))continue;const a=anchorOf(w,THE_LUC[id].noi);if(!a||tnaReg(a)!==reg)continue;
    const d=Math.hypot((a.x||0)-(n.x||0),(a.y||0)-(n.y||0));if(d<bd){bd=d;best=id;}}
  return best||'reg:'+reg;}
function tnaFaTen(k){if(!k)return '';if(k==='*')return contentText('tna.faKhap');
  if(k.startsWith('tong:')){const n=nodeById(+k.slice(5));return n?n.name:'';}
  if(k.startsWith('reg:'))return contentText('tna.faQuan',[tnaRegTen(+k.slice(4))]);
  const f=typeof faNow==='function'&&THE_LUC[k]&&faNow(k);return f&&f.n||(THE_LUC[k]||{}).n||k;}
function tnaFaGhi(E,k){if(!E.fa)return;if(E.fa.includes('*'))return;k=k||'*';if(k==='*')E.fa=['*'];else if(!E.fa.includes(k))E.fa.push(k);}
// thế lực chủ nơi n có biết mặt ngươi không (bản ghi cũ không có fa = cả vùng)
function tnaBiet(E,n){if(!E)return false;if(!E.fa||E.fa.includes('*')||E.m>=TNA.lan)return true;return E.fa.includes(tnaFa(n));}
function tnaFaHud(E,reg){const r=G.run;if(tnaIsF(reg))return contentText('tna.faBiet',[tnaKTen(reg)]);if(!E.fa||E.fa.includes('*')||E.m>=TNA.lan)return contentText('tna.faKhap');
  let s=contentText('tna.faBiet',[E.fa.map(tnaFaTen).join(', ')]);const n=nodeById(r.at);
  if(n&&tnaQ(n)===reg&&!tnaCanCu(n)&&!tnaBiet(E,n))s+=' '+contentText('tna.faDay',[tnaFaTen(tnaFa(n))]);return s;}
