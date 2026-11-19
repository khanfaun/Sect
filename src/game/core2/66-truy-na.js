// ================= SỬA-O (câu 77): HỆ TRUY NÃ KIỂU THẾ GIỚI MỞ =================
// Bảng TNA: content/rules/truy-na.js · chữ: content/text/truy-na.json (tna.*). Cờ FEAT.tna (bật; test.js `fresh` tắt, bài `truy_na` bật lại).
// r.tna = {[vùng]: {m mức 1..5, tien xu treo thưởng, t lần sau cùng bị quan sai nhận ra, ly [các loại tội]}} — mỗi vùng (đại khu vực) riêng.
// r.tnaCh = {reg, loai, nang, node, t}: nhân chứng đang chạy đi báo quan (chờ ngươi chọn: ngăn, mua chuộc, giết, mặc kệ).
// r.caiT = cải trang tới lúc này. r.tnaV = 1: đã chuyển bản lưu cũ (danh tiếng khu ≤ −60 = đang bị truy nã mức 2).
// Gộp: nợ (noTruyNa, Sửa-B) → tội 'no'; phá đất dân (datPhat, Đ8b) → tội 'pha_dat' qua nhân chứng; danh tiếng khu tụt tới mức truy nã (Đ1.4) → tội 'danh';
//      truy đuổi (Sửa-K): quan sai (truy loại quan / no) và thợ săn tiền thưởng (truy loại san) là kẻ bám theo.
FEAT.tna=1;
let TNA_BUSY=0;
const TNA_I=['','👁','📜','⛓','🔥','☠'];
function tnaOn(){return feat('tna')&&!!G.run&&!!W();}
function tnaS(){const r=G.run;return r.tna||(r.tna={});}
function tnaReg(n){return n&&n.r!=null?n.r:(G.run.region||0);}
function tnaE(reg){const r=G.run;return r&&r.tna&&r.tna[reg]||null;}
function tnaMuc(reg){const E=tnaE(reg);return E?E.m:0;}
function tnaMax(){const r=G.run;let m=0;for(const k in (r&&r.tna)||{})m=Math.max(m,r.tna[k].m);return m;}
function tnaChe(){const r=G.run;return !!r&&((typeof hideOn==='function'&&hideOn())||(r.caiT||0)>W().t);}
function tnaTen(m){return contentText('tna.m.'+m);}
function tnaRegTen(reg){return (REG[reg]&&REG[reg].n)||'';}
function tnaTienChu(x){return contentText('tna.tien.'+(x<1000?0:x<3000?1:x<8000?2:3));}
function tnaNoi(n){return n&&TNA.chung[n.type]!=null&&!['chac','che','hoang'].includes(n.type)?n.type:'hoang';}
// danh tiếng khu: bị truy nã (mức ≥ 2) thì kéo xuống mức "Bị truy nã" của Đ1.4; hết truy nã thì nâng lên "bị ghét"
function tnaDanhXuong(reg){const k='reg:'+reg,v=danhGet(k);if(v>TNA.danh)danhPut(k,TNA.danh-v);}
function tnaDanhLen(reg){const k='reg:'+reg,v=danhGet(k);if(v<=TNA.danh)danhPut(k,TNA.danhSau-v);}
// quan phủ ghi tội: tăng mức, cộng tiền treo thưởng, quan sai lần theo (nếu ngươi đang ở vùng đó)
function tnaBao(reg,nang,o){const r=G.run;if(!r||!nang||!W())return null;o=o||{};const T=tnaS(),t=W().t;
  const E=T[reg]||(T[reg]={m:0,tien:0,t,ly:[]});const m0=E.m;E.m=clamp(E.m+nang,1,5);
  const nd=o.node;E.tien+=Math.round(TNA.tien.xu*nang*(nd&&nd.type==='thanh'?TNA.tien.thanh:1));E.t=t;if(o.ly&&!E.ly.includes(o.ly))E.ly.push(o.ly);
  if(E.m>=2)tnaDanhXuong(reg);
  if(E.m>=TNA.lan&&!o.lan)for(let i=0;i<W().regions.length;i++){if(i===+reg)continue;const F=T[i];if(!F||F.m<TNA.lanM)tnaBao(i,TNA.lanM-(F?F.m:0),{ly:'lan',lan:1,quiet:1,noTruy:1});}
  if(!o.quiet){const m=contentText(m0?'tna.tang':'tna.bao',[tnaRegTen(reg),tnaTen(E.m)]);note(m,'dn');log(m);}
  if(!o.noTruy&&feat('truy')&&(o.luon||G.run.region===+reg))truyStart(o.k||'quan',{n:contentText(o.k==='no'?'truy.noTen':'tna.quanTen'),i:'👮',ek:'sontac',d:clamp(E.m-2,0,3)});
  dbg('tna.bao',{reg:+reg,m0,m:E.m,nang,ly:o.ly||'',tien:E.tien});return E;}
// xoá truy nã ở một vùng (nộp phạt, ngồi tù, làm công, mất dấu hết)
function tnaXoa(reg,why){const r=G.run;const E=tnaE(reg);if(!E)return false;delete r.tna[reg];tnaDanhLen(reg);
  if(r.truy&&['quan','san'].includes(r.truy.k)&&(why!=='matdau'||G.run.region===+reg))truyEnd(why,1);
  dbg('tna.xoa',{reg:+reg,why});return true;}
// phạm tội ở nơi đang đứng. Trả 0 không ai thấy · 1 có nhân chứng (chờ ngươi chọn) · 2 bị báo quan ngay
function tnaToi(loai,o){const r=G.run;if(!tnaOn())return 0;o=o||{};const n=o.node||nodeById(r.at);const nang=o.nang||TNA.toi[loai]||TNA.deed[loai]||1;
  const reg=tnaReg(n),k=tnaNoi(n);let p=TNA.chung[k];const che=tnaChe();if(che)p*=TNA.chung.che;
  if(!(R()<p)){dbg('tna.khong',{loai,k,p:Math.round(p*100)});return 0;}
  if(TNA.chung[k]>=TNA.chung.chac&&!che){tnaBao(reg,nang,{ly:loai,node:n,luon:1});return 2;}
  r.tnaCh={reg,loai,nang,node:n?n.id:null,t:W().t};dbg('tna.chung',{loai,k,reg});tnaChMo();return 1;}
// hộp lựa chọn khi có nhân chứng chạy đi báo quan (mở ngay nếu rảnh, không thì lúc rảnh đầu tiên)
function tnaChMo(){const r=G.run;const C=r&&r.tnaCh;if(!C||r.scene||r._inBq||TNA_BUSY)return false;kyStart(tnaChEv(C));return true;}
function tnaMuaGia(C){const M=TNA.mua;return {xu:M.xu*C.nang,st:M.st*C.nang};}
function tnaChEv(C){let ev=KYNGO.find(x=>x.id==='tna_chung');if(!ev){ev={id:'tna_chung',sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  const n=nodeById(C.node);ev.n=contentText('tna.chN');ev.t=contentText('tna.chT',[n?n.name:'']);const g=tnaMuaGia(C);
  ev.c=[{l:contentText('tna.chNgan'),go:()=>tnaChPick('ngan')},
    {l:contentText('tna.chMua',[fmtBac(g.xu),g.st]),need:()=>((G.run.bac||0)>=g.xu||(G.run.st||0)>=g.st)?'':contentText('truy.nopThieu'),go:()=>tnaChPick('mua')},
    {l:contentText('tna.chGiet'),go:()=>tnaChPick('giet')},
    {l:contentText('tna.chMac'),go:()=>tnaChPick('mac')}];return ev;}
function tnaChBao(C,them,ly){G.run.tnaCh=null;tnaBao(C.reg,C.nang+(them||0),{ly:ly||C.loai,node:nodeById(C.node),luon:1});}
function tnaChPick(o){const r=G.run,C=r.tnaCh;if(!C)return {t:''};dbg('tna.chon',{o});
  if(o==='ngan'){const N=TNA.ngan;if(chance(Math.min(N.max,N.goc+N.tp*(S().tp||0)))){r.tnaCh=null;return {t:contentText('tna.nganOk')};}tnaChBao(C);return {t:contentText('tna.nganHong')};}
  if(o==='mua'){const g=tnaMuaGia(C);if((r.bac||0)>=g.xu)bacAdd(-g.xu,'tna.mua');else if((r.st||0)>=g.st)r.st-=g.st;else return {t:''};
    if(chance(TNA.mua.p)){r.tnaCh=null;return {t:contentText('tna.muaOk')};}tnaChBao(C);return {t:contentText('tna.muaHong')};}
  if(o==='giet'){if(typeof deed==='function'&&DEED.diet_khau)deed('diet_khau',{lo:0});
    if(chance(TNA.giet.lo*(tnaChe()?TNA.giet.che:1))){tnaChBao(C,TNA.toi.giet_chung,'giet_chung');return {t:contentText('tna.gietLo')};}r.tnaCh=null;return {t:contentText('tna.gietOk')};}
  tnaChBao(C);return {t:contentText('tna.macT')};}
// thời gian trôi: mất dấu hạ mức, nợ trả xong thì thôi, danh tiếng tụt tới mức truy nã thì bị ghi tội, thợ săn tiền thưởng, nhân chứng đang chờ
function tnaTick(){const r=G.run;if(!tnaOn()||TNA_BUSY)return;const t=W().t,T=tnaS();
  if(r.tnaV!==1){r.tnaV=1;for(let i=0;i<W().regions.length;i++)if(!T[i]&&danhGet('reg:'+i)<=TNA.danh){T[i]={m:2,tien:TNA.tien.xu*2,t,ly:['danh']};dbg('tna.cu',{reg:i});}}
  for(let i=0;i<W().regions.length;i++)if(!T[i]&&danhGet('reg:'+i)<=TNA.danh)tnaBao(i,TNA.toi.danh,{ly:'danh',noTruy:1});
  for(const k of Object.keys(T)){const E=T[k];
    if(E.ly.length&&E.ly.every(x=>x==='no')&&(r.bac||0)>=0&&!r.noTra&&!r.vay){tnaXoa(k,'tra');continue;}
    const need=TNA.matDau[E.m]*HD*(r.region!==+k?TNA.ngoai:1);
    if(t-E.t>=need){E.m--;E.t=t;dbg('tna.ha',{reg:+k,m:E.m});if(E.m<2)tnaDanhLen(k);
      if(E.m<=0){tnaXoa(k,'matdau');const m=contentText('tna.matHet',[tnaRegTen(k)]);note(m,'up');log(m);}else note(contentText('tna.matDau',[tnaRegTen(k),tnaTen(E.m)]),'up');}}
  const mo=Math.floor(t/HM);if(r.tnaSan!==mo){const lan=r.tnaSan!=null;r.tnaSan=mo;
    if(lan&&feat('truy')&&!r.truy)for(const k in T){const E=T[k];if(E.tien>=TNA.san.min&&chance(TNA.san.p)){
      truyStart('san',{n:contentText('tna.sanTen'),i:'🏹',ek:'tantu',d:clamp(E.m-2,0,3)});dbg('tna.san',{reg:+k,tien:E.tien});break;}}}
  if(r.tnaCh)tnaChMo();}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(G.run&&!TNA_BUSY)tnaTick();return o;};}
// tới thôn trấn / thành trong vùng đang bị truy nã: có thể bị nhận ra (cải trang, che giấu tu vi giúp né)
{const _ar=arrive;arrive=function(id){const o=_ar.apply(this,arguments);const r=G.run;if(!tnaOn())return o;const n=nodeById(id);
  if(!n||n.state==='ruin'||!['tran','thanh','cho'].includes(n.type))return o;const reg=tnaReg(n),E=tnaE(reg);if(!E)return o;
  const p=TNA.nhan[E.m]*(tnaChe()?TNA.chung.che:1);const hit=chance(p);dbg('tna.nhan',{reg,p:Math.round(p*100),hit});
  if(hit){E.t=W().t;const m=contentText('tna.nhanRa',[n.name]);note(m,'dn');log(m);
    if(feat('truy'))truyStart('quan',{n:contentText('tna.quanTen'),i:'👮',ek:'sontac',d:clamp(E.m-2,0,3)});}
  return o;};}
// chống lại quan sai / thợ săn: thắng thì tội nặng thêm; thua thì bị giải về quan phủ, ngồi tù
{const _cc=combatContinue;combatContinue=function(){const r=G.run,sc=r&&r.scene;const T=r&&r.truy;
  const res=sc&&sc.type==='combat'&&sc.over&&sc.truyCh&&T&&['quan','san'].includes(T.k)&&tnaOn()?sc.over:null;const reg=r?r.region||0:0;
  const o=_cc.apply(this,arguments);if(!res||!G.run)return o;
  if(res==='win')tnaBao(reg,TNA.toi.chong,{ly:'chong'});
  else if(res==='lose'){const E=tnaE(reg)||tnaBao(reg,1,{ly:'chong',quiet:1,noTruy:1});tnaGiam(reg,'tu',1);}
  return o;};}
// gộp nợ (Sửa-B): truy nã ở quê vì nợ = tội 'no' ở vùng quê
function tnaNo(r){const n=noQue(r);if(!n)return false;tnaBao(tnaReg(n),TNA.toi.no,{ly:'no',k:'no',luon:1,quiet:1});return true;}
{const _nt=noTruy;noTruy=function(r){if(_nt.apply(this,arguments))return true;if(!tnaOn())return false;const n=noQue(r);return !!n&&tnaMuc(tnaReg(n))>0;};}
// gộp việc làm trong sổ nghiệp: phạm luật ở nơi có dân (không phải việc làm kín) → có thể bị truy nã
{const _d=deed;deed=function(id,o){const res=_d.apply(this,arguments);const r=G.run;
  if(r&&tnaOn()&&TNA.deed[id]&&!(o&&o.lo===0)&&!TNA_BUSY){const n=nodeById(r.at);if(tnaNoi(n)!=='hoang')tnaToi(id,{nang:TNA.deed[id],node:n});}return res;};}
// ngồi tù / làm công: thời gian trôi, xoá truy nã ở vùng đó
function tnaGiam(reg,kieu,bat){const r=G.run;const E=tnaE(reg);if(!E)return false;const th=(kieu==='cong'?TNA.cong:TNA.tu)[E.m];if(!th)return false;
  r.scene=null;r.moving=null;if(r.truy&&['quan','san'].includes(r.truy.k))r.truy=null;
  TNA_BUSY=1;NO_BUSY=1;VT_AN=1;NGU_OK=1;try{advanceTime(th*HM);}finally{TNA_BUSY=0;NO_BUSY=0;VT_AN=0;NGU_OK=0;}if(!G.run)return true;
  tnaXoa(reg,kieu);const m=contentText(bat?'tna.biBat':kieu==='cong'?'tna.congXong':'tna.tuXong',[th]);note(m,'dn');log(m);dbg('tna.giam',{reg,kieu,th});return true;}
// ---------- Quan phủ (thôn trấn / thành của vùng đang bị truy nã) và cải trang ----------
VENUE_N.quanphu=contentText('tna.qpN');VENUE_IN.quanphu=[contentText('tna.qpIn1'),contentText('tna.qpIn2')];
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);const r=G.run;if(!tnaOn()||!n||n.state==='ruin')return L;
  if(TNA.quan.includes(n.type)&&tnaE(tnaReg(n))&&!L.some(x=>x.a==='quanphu'))L.push({a:'quanphu',i:'⚖️',l:contentText('tna.qpN'),h:0,tip:contentText('tna.qpTip'),dis:false,x:''});
  if(['tran','thanh','cho'].includes(n.type)&&tnaMax()>0&&!L.some(x=>x.a==='caitrang'))L.push({a:'caitrang',i:'🎭',l:contentText('tna.caiN'),h:1,tip:contentText('tna.caiTip',[TNA.cai.ngay]),dis:(r.bac||0)<TNA.cai.xu,x:(r.bac||0)<TNA.cai.xu?contentText('no.khongDu'):''});
  return L;};}
{const _p=placeAct;placeAct=function(a){if(a!=='caitrang')return _p.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place'||(r.bac||0)<TNA.cai.xu)return;
  bacAdd(-TNA.cai.xu,'tna.cai');advanceTime(1);if(!G.run)return;r.caiT=W().t+TNA.cai.ngay*HD;sc.msg=[contentText('tna.caiXong',[TNA.cai.ngay])];sc.chips=[bacChip(-TNA.cai.xu)];dbg('tna.cai',{den:r.caiT});};}
function tnaQpOpts(n){const r=G.run,reg=tnaReg(n),E=tnaE(reg);if(!E)return [];const L=[];const P=TNA.phat;const st=Math.ceil(E.tien/P.xuLt);const cam=E.m>=P.phatMax?contentText('tna.qpNang'):'';
  L.push({id:'nop',l:contentText('tna.qpNop',[fmtBac(E.tien)]),d:contentText('tna.qpNopD',[tnaTen(E.m)]),h:1,st:0,g:{txt:fmtBac(E.tien)},no:cam||((r.bac||0)>=E.tien?'':contentText('no.khongDu'))});
  L.push({id:'nopLt',l:contentText('tna.qpNopLt',[st]),d:contentText('tna.qpNopD',[tnaTen(E.m)]),h:1,st:0,g:{txt:st+' 💎'},no:cam||((r.st||0)>=st?'':contentText('dat.thieuLt'))});
  if(TNA.cong[E.m])L.push({id:'cong',l:contentText('tna.qpCong',[TNA.cong[E.m]]),d:contentText('tna.qpCongD'),h:0,st:0,g:{},no:''});
  L.push({id:'tu',l:contentText('tna.qpTu',[TNA.tu[E.m]]),d:contentText('tna.qpTuD'),h:0,st:0,g:{},no:''});
  return L;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='quanphu')return tnaQpOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='quanphu')return tnaQpDo(id);return _vd.apply(this,arguments);};}
function tnaQpDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const reg=tnaReg(n),E=tnaE(reg);
  const o=tnaQpOpts(n).find(x=>x.id===id);if(!o||o.no||!E)return false;let ch=[];
  if(id==='nop'){const x=E.tien;bacAdd(-x,'tna.phat');ch=[bacChip(-x)];}
  else if(id==='nopLt'){const x=Math.ceil(E.tien/TNA.phat.xuLt);r.st-=x;ch=[chip('💎','−'+x,contentText('tna.qpN'),'dn')];}
  if(id==='nop'||id==='nopLt'){advanceTime(1);if(!G.run)return true;tnaXoa(reg,'nop');sc.msg=[contentText('tna.nopXong')];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;}
  tnaGiam(reg,id);if(G.run){openPlace(n.id);}saveSoon();return true;}
// HUD: biểu tượng truy nã (chữ + biểu tượng, không số)
function tnaHud(){const r=G.run;if(!tnaOn()||!r.tna)return null;let reg=r.region||0,E=tnaE(reg);
  if(!E){let b=null;for(const k in r.tna)if(!b||r.tna[k].m>r.tna[b].m)b=k;if(b==null)return null;reg=+b;E=r.tna[b];}
  const L=[contentText('tna.hudN'),contentText('tna.hudT',[tnaRegTen(reg),tnaTen(E.m),tnaTienChu(E.tien)])];
  const khac=Object.keys(r.tna).filter(k=>+k!==reg).map(k=>tnaRegTen(k)+': '+tnaTen(r.tna[k].m));if(khac.length)L.push(contentText('tna.hudKhac',[khac.join(', ')]));
  if(tnaChe())L.push(contentText('tna.hudChe'));L.push(contentText('tna.hudCach'));
  return {t:TNA_I[E.m],tip:L.join('\n'),m:E.m};}
