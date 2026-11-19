// ================= Đ10: ĐẠI MỘNG — Mộng Ấn, ba tri thức, Người Gác Bến, Bến Vong Xuyên, nghi thức, tám kết thúc =================
// Bảng: content/rules/dai-mong.js (MONG_AN, TRI_THUC, DM_VIEC, GAC_BEN, KET_THUC, NGHI_THUC, DM_CFG) · chữ: content/text/dai-mong.json (dm.*) ·
// lời văn GPT: content/dai-mong/** → DM_DATA (src/game/data/08-dai-mong-du-lieu.js); thiếu tệp thì dùng lời dự phòng trong dm.*.
// Sổ luân hồi (G.meta, giữ qua kiếp — ngoại lệ của "quên sạch", HN mục 7): mong [mã], mongK {kiếp: số Mộng Ấn đã nhặt}, tri {TRI0x:[nguồn]},
//   gb {n số kiếp đã gặp, kiep [kiếp đã gặp], nk [kiếp đã nhận ra], np1, np2}, tkGap {tên thiên kiêu: kiếp gặp đầu}, ends [{id,kiep,ten,y}], ketHet, daTinh.
// Đời này (G.run): gbHen/gbXong/gbDang/gbTruoc, dmKhao {LOC: 1}, ends [mã], ng01, end02/end03/end06, dietThieu.
// Thế giới (W().ng, qua các kiếp vẫn còn vì là công trình có thật): NG02 {mo, tu{LOC}, chay}, NG03 {xm{LOC}, chot{LOC}, hen}, khoa {LOC}.
// Bản lưu cũ: mọi trường đọc kiểu x||0; dmM() dựng sổ khi thiếu.
FEAT.mong=1;
function dmM(){const M=G.meta;if(!M)return null;if(!Array.isArray(M.mong))M.mong=[];if(!M.mongK||typeof M.mongK!=='object')M.mongK={};
  if(!M.tri||typeof M.tri!=='object')M.tri={};if(!M.gb||typeof M.gb!=='object')M.gb={};const g=M.gb;g.n=g.n||0;if(!Array.isArray(g.kiep))g.kiep=[];if(!Array.isArray(g.nk))g.nk=[];
  if(!M.tkGap||typeof M.tkGap!=='object')M.tkGap={};if(!Array.isArray(M.ends))M.ends=[];return M;}
function dmKiep(){const r=G.run;if(r)return r.kiep||1;const o=G.over;return o&&o.life?o.life.k||1:1;}
function dmD(){return typeof DM_DATA!=='undefined'&&DM_DATA?DM_DATA:{};}
// chọn một biến thể cố định theo hạt (không động R())
function dmPick(L,seed){if(!Array.isArray(L)||!L.length)return null;let h=0;const s=String(seed||'');for(let i=0;i<s.length;i++)h=(h*31+s.charCodeAt(i))|0;return L[Math.abs(h)%L.length];}
function dmT(s,ten){if(typeof s!=='string')return '';if(ten!=null)s=s.replace(/\{ten\}/g,ten);return typeof tyT==='function'?tyT(s):s;}
function dmSay(m,k){if(!G.run||!m)return;log(m);if(typeof note==='function')note(m,k||'up');}
// ---------- tri thức ----------
function triSrc(id){const M=dmM();if(!Array.isArray(M.tri[id]))M.tri[id]=[];return M.tri[id];}
function triCo(id){const T=TRI_THUC[id];return !!T&&new Set(triSrc(id)).size>=T.can;}
function tri3(){return Object.keys(TRI_THUC).every(triCo);}
function triDem(){return Object.keys(TRI_THUC).filter(triCo).length;}
function triThem(id,src){if(!TRI_THUC[id]||!src)return false;const L=triSrc(id);if(L.includes(src))return false;const truoc=triCo(id);L.push(src);dbg('dm.tri',{id,src,n:L.length});
  if(!truoc&&triCo(id)){dbg('dm.triDat',{id});dmSay(contentText('dm.triDat',[TRI_THUC[id].n]));}else dmSay(contentText('dm.triDau',[TRI_THUC[id].n]),'');
  return true;}
// ---------- Mộng Ấn ----------
function mongCo(id){return dmM().mong.includes(id);}
function mongNhat(id,kiep){const M=dmM(),A=MONG_AN[id];if(!A||M.mong.includes(id))return false;kiep=kiep||dmKiep();
  const k=M.mongK[kiep]||0;if(k>=DM_CFG.mongMoiKiep){dbg('dm.mongDay',{id,kiep});return false;}
  M.mongK[kiep]=k+1;M.mong.push(id);dbg('dm.mong',{id,kiep});dmSay(contentText('dm.mongNhat',[A.n,A.he]));triThem(A.tri,id);return true;}
function mongLoi(id){const D=dmD().mong||{},x=D[id];const A=MONG_AN[id];return (x&&dmPick(x.nhat,id+dmKiep()))||contentText('dm.mongLoi',[A.n,A.he]);}
// ---------- Người Gác Bến (mỗi kiếp hiện một lần, dạng khác nhau) ----------
function gbBac(){const g=dmM().gb;return Math.min(3,g.nk.length)+(g.np2?1:0);}
function gbDangTen(d){return contentText('dm.gbD.'+d);}
function gbData(d){const D=dmD().gb||{};return D[d]||null;}
function gbLoi(d){const x=gbData(d),b=gbBac();return x&&x.loi&&x.loi[b]?x.loi[b]:contentText('dm.gbLoi'+b);}
function gbTick(){const r=G.run;if(!r||!feat('mong')||r.gbXong||r.scene||r._inBq||G.screen!=='map'||!W())return;
  if(r.gbHen==null){r.gbHen=W().t+ri(DM_CFG.gbThang[0],DM_CFG.gbThang[1])*HM;return;}
  if(W().t>=r.gbHen)gbHien();}
function gbHien(){const r=G.run,g=dmM().gb;if(!r||r.gbXong)return false;r.gbXong=1;r.gbDang=GAC_BEN[g.n%GAC_BEN.length];r.gbTruoc=g.kiep.some(k=>k<(r.kiep||1))?1:0;
  g.n++;if(!g.kiep.includes(r.kiep||1))g.kiep.push(r.kiep||1);dbg('dm.gb',{dang:r.gbDang,truoc:r.gbTruoc,n:g.n});kyStart(gbEv());return true;}
function gbEv(){let ev=KYNGO.find(x=>x.id==='dm_gacben');if(!ev){ev={id:'dm_gacben',sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  const r=G.run,d=r.gbDang||GAC_BEN[0],x=gbData(d);ev.n=contentText('dm.gbN');
  ev.t=dmT((x&&dmPick(x.hien,'h'+r.kiep))||contentText('dm.gbHien',[gbDangTen(d)]));
  ev.c=[];if(r.gbTruoc)ev.c.push({l:contentText('dm.gbNhanL'),go:()=>gbChon('nhan')});
  ev.c.push({l:contentText('dm.gbHoiL'),go:()=>gbChon('hoi')},{l:contentText('dm.gbDiL'),go:()=>gbChon('di')});return ev;}
function gbChon(o){const r=G.run,g=dmM().gb,d=r.gbDang||GAC_BEN[0],x=gbData(d);dbg('dm.gbChon',{o});
  if(o==='di')return {t:contentText('dm.gbDiT')};
  let t='';if(o==='nhan'){const k=r.kiep||1;if(!g.nk.includes(k))g.nk.push(k);t=dmT((x&&dmPick(x.nhan,'n'+k))||contentText('dm.gbNhanT'))+'\n\n';
    if(g.nk.length>=DM_CFG.gbNhan)mongNhat('MA02');}
  t+=dmT(gbLoi(d));if(tri3())t+='\n\n'+contentText('dm.gbKhuyen');return {t};}
// ---------- nguồn Mộng Ấn rải trong đời ----------
// MA03: viếng mộ mình kiếp trước (mọi mộ trên bản đồ là mộ của các kiếp trước của người chơi)
{const _vg=visitGrave;visitGrave=function(n){const x=_vg.apply(this,arguments);const r=G.run;if(r&&n&&n.grave&&n.grave.ten!==r.ten&&!mongCo('MA03'))mongNhat('MA03');return x;};}
// MA06: một thiên kiêu đã gặp ở kiếp trước gặp lại
function dmTk(ten){const r=G.run;if(!r||!ten||!W())return;if(!(W().rivals||[]).some(v=>v&&v.ten===ten))return;const M=dmM();const k=M.tkGap[ten];
  if(k==null){M.tkGap[ten]=r.kiep||1;return;}if(k<(r.kiep||1)&&!mongCo('MA06'))mongNhat('MA06');}
{const _gn=gapNguoi;gapNguoi=function(ten){const x=_gn.apply(this,arguments);try{dmTk(ten);}catch(e){dbg('dm.loi',{m:String(e.message||e)});}return x;};}
// MA08: qua hồi 4 đại lộ Tỉnh Mộng
{const _td=tyDong;tyDong=function(S){const A=S&&TUYEN[S.id],N=A&&A.nut[S.i];const x=_td.apply(this,arguments);const M8=MONG_AN.MA08;
  if(S&&N&&S.id===M8.tuyen&&N.id===M8.nut&&G.run)mongNhat('MA08');return x;};}
// ---------- nghi thức: tiến độ ở thế giới ----------
function ngW(){const w=W();const g=w.ng||(w.ng={});g.NG02=g.NG02||{};g.NG02.tu=g.NG02.tu||{};g.NG03=g.NG03||{};g.NG03.xm=g.NG03.xm||{};g.NG03.chot=g.NG03.chot||{};g.khoa=g.khoa||{};return g;}
function ngDu(o){return NG_NOI.every(l=>o&&o[l]);}
// ---------- kết thúc ----------
function dmKetGhi(id,ten,kiep){const M=dmM();const y=tYear(W().t);M.ends.push({id,kiep:kiep||dmKiep(),ten:ten||'',y});dbg('dm.ket',{id});return y;}
// kết ghi theo đời (END01/02/03/06): đời vẫn tiếp
function dmKetDoi(id){const r=G.run;if(!r)return '';r.ends=r.ends||[];if(r.ends.includes(id))return '';r.ends.push(id);dmKetGhi(id,r.ten,r.kiep);
  suLuocAdd(contentText('dm.suKet',[r.ten,KET_THUC[id].n]),'ket');const m=contentText('dm.ketDoi',[KET_THUC[id].n]);dmSay(m);
  const x=(dmD().ket||{})[id];return (x&&x.canh?dmT(dmPick(x.canh,id+r.kiep)):'')+(x&&x.canh?'\n\n':'')+KET_THUC[id].cau;}
// kết khép hành trình (END04/05/07/08): màn kết, rồi Tân Mộng
function dmKetHet(id,L){const M=dmM(),K=KET_THUC[id];const r=G.run;const ten=r?r.ten:(L&&L.ten)||'';const kiep=r?r.kiep:(L&&L.k)||dmKiep();
  const y=dmKetGhi(id,ten,kiep);M.daTinh=1;const x=(dmD().ket||{})[id];
  const hau=[contentText('dm.hauKiep',[kiep]),contentText('dm.hauMong',[M.mong.length]),contentText('dm.hauNam',[y])].concat(((x&&x.hau)||[]).map(s=>dmT(s,ten)));
  const ng=Object.keys(NGHI_THUC).find(k=>NGHI_THUC[k].ket===id);const canh=[ng?dmNgLoi(ng,'xong'):'',x&&x.canh?dmT(dmPick(x.canh,id+kiep),ten):''].filter(Boolean).join('\n\n');
  M.ketHet={id,ten,kiep,y,canh,hau};
  if(r){suLuocAdd(contentText('dm.suKet',[ten,K.n]),'ket');const life={_mr:r.maxRegion||0,k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:qualName(r.maxRealm,(r.quality||[])[r.maxRealm]||0),cause:'ket',lines:[K.cau],ep:K.n,pts:0,origin:r.origin,y};
    M.lives.unshift(life);if(M.lives.length>40)M.lives.pop();G.run=null;}
  G.over=null;G.screen='ket';if(typeof saveSoon==='function')saveSoon();return true;}
// Tân Mộng: hồ sơ mới, giữ dấu "đã tỉnh" và danh sách kết đã đạt (lộ trình Đ10)
function dmTanMong(){const M=G.meta;const ends=(M.ends||[]).slice(),opt=M.opt||{};G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};G.meta.daTinh=1;G.meta.endsCu=ends;G.meta.opt=opt;dbg('dm.tanMong',{n:ends.length});}
// END01: một đời đã sống — có sinh kế, quan hệ tự nguyện hay mục đích theo tới kết quả; đời quá ngắn: "Đời chưa kịp gọi tên"
function dmEnd01(r,cause){if(!r||cause==='phithang')return null;const tuoi=Math.floor(r.age||0);
  if(cause!=='quyan'&&tuoi<DM_CFG.end01Tuoi)return 'chua';
  const ma=typeof ngChinh==='function'?ngChinh(r):null;const ke=(ma&&ngheBac(ma,r)>=1)||!!(r.flags&&r.flags.tongmon);
  const qh=(r.family||[]).some(x=>x&&x.song)||(r.party||[]).length>0||(r.gapVai&&Object.keys(r.gapVai).length>=3);
  const md=!!(r.arc&&r.arc.xt&&r.arc.xt.xong&&r.arc.xt.ket&&r.arc.xt.ket!=='ngoai')||(r.ends||[]).length>0;
  return ke||qh||md?'END01':'chua';}
// ---------- điều kiện từng việc lớn (trả về [[chữ, đạt]]) ----------
function dmDk(id){const r=G.run;const L=[];const add=(k,ok,a)=>L.push([contentText('dm.dk.'+k,a||[]),!!ok]);
  if(id==='END02'){const v=vaiNow('NP04');add('ngai',!(v&&v.song)||faQhBac('FA01')>=6);add('kho',faMinh('FA04')||faQhBac('FA04')>=DM_CFG.minhBac);
    add('quan',faMinh('FA10')||faQhBac('FA10')>=DM_CFG.minhBac);add('congNhan',['FA02','FA04','FA08','FA10'].filter(faMinh).length>=DM_CFG.end02Minh,[DM_CFG.end02Minh]);
    add('luong',(r.bac||0)>=DM_CFG.end02Bac,[fmtBac(DM_CFG.end02Bac)]);}
  if(id==='END03'){const v=vaiNow('NP13');add('huyetAn',!(v&&v.song)||faQhBac('FA05')>=6);add('dieuUoc',Object.keys(THE_LUC).filter(faMinh).length>=DM_CFG.end03Minh,[DM_CFG.end03Minh]);
    add('nguon',(r.st||0)>=DM_CFG.end03St,[DM_CFG.end03St]);}
  if(id==='END06'){const ma=ngChinh(r);add('nghe',ma&&ngheBac(ma,r)>=DM_CFG.end06Bac,[ma&&NGHE[ma]?NGHE[ma].ranks[DM_CFG.end06Bac]:'']);add('tuoi',(r.age||0)>=DM_CFG.end06Tuoi,[DM_CFG.end06Tuoi]);}
  if(id==='NG01'){const N=NGHI_THUC.NG01;add('tri3',tri3());add('canh',!r.pham&&r.realm>=N.realm,[REALM[N.realm]]);add('st',(r.st||0)>=N.st,[N.st]);}
  if(id==='NG04'){const N=NGHI_THUC.NG04,K=ngW().khoa;add('tri3',tri3());add('khoa',Object.keys(K).filter(k=>K[k]).length>=N.khoa,[N.khoa]);add('st',(r.st||0)>=N.st,[N.st]);
    add('suc',r.hp>=S().maxHp*N.hpMin);}
  return L;}
function dmDkOk(L){return L.every(x=>x[1]);}
function dmDkChu(L){return L.map(x=>(x[1]?'✓ ':'✗ ')+x[0]).join('\n');}
// ---------- mục "Đại sự" ở nơi neo ----------
VENUE_N.daisu=contentText('dm.vN');VENUE_IN.daisu=[contentText('dm.vIn1'),contentText('dm.vIn2')];
function dmLocAt(n){return n&&n.anchor&&LOC_NEO[n.anchor]?n.anchor:null;}
function dmNo(c){return c?c:'';}
function dmOpt(id,l,d,o){return Object.assign({id,l,d:d||'',h:0,st:0,g:{},no:''},o||{});}
function dmKhaoLoi(loc,id){const D=dmD().khao||{},x=D[loc];return x&&x.muc&&x.muc[id]?dmT(x.muc[id]):'';}
function dmOpts(n){const r=G.run;const L=[];if(!r||!n||!W())return L;const loc=dmLocAt(n),M=dmM(),NG=ngW();
  if(loc){
    for(const id in DM_VIEC){const V=DM_VIEC[id];if(V.loc!==loc)continue;
      if(V.k==='khao'){if(triCo(V.tri)||triSrc(V.tri).includes(loc))continue;
        const no=V.can&&!triCo(V.can)?contentText('dm.canTri',[TRI_THUC[V.can].n]):(r.dmKhao||{})[loc]?contentText('dm.daKhao'):(r.bac||0)<V.bac?contentText('no.khongDu'):'';
        L.push(dmOpt(id,contentText('dm.v.'+id),contentText('dm.khaoD',[V.ngay]),{h:V.ngay*HD,bac:V.bac||0,no}));continue;}
      if(V.k==='mong'){if(mongCo(V.mong))continue;let no='';
        if(id==='tuong'&&!(G.meta.lives||[]).length)no=contentText('dm.tuongChua');
        if(id==='que'&&(r.kiep||1)<2)no=contentText('dm.queChua');
        if(id==='troi'&&!clkView().some(c=>MONG_AN.MA07.clk.includes(c.id)))no=contentText('dm.troiChua');
        if(!no&&(r.bac||0)<V.bac)no=contentText('no.khongDu');
        L.push(dmOpt(id,contentText('dm.v.'+id),contentText('dm.vD.'+id),{h:V.ngay*HD,bac:V.bac||0,no}));continue;}
      if(V.k==='khoa'){if(NG.khoa[loc])continue;if(!triCo('TRI01'))continue;
        L.push(dmOpt(id,contentText('dm.v.khoa'),contentText('dm.khoaD'),{h:V.ngay*HD,no:triCo(V.can)?'':contentText('dm.canTri',[TRI_THUC[V.can].n])}));continue;}
      if(V.k==='np12'){const v=vaiNow('NP12');if(!(v&&v.song))continue;
        if(id==='np12a'&&!(M.gb.nk.length>=1&&!M.gb.np1))continue;if(id==='np12b'&&!(M.gb.np1&&!M.gb.np2&&triDem()>=2))continue;
        L.push(dmOpt(id,contentText('dm.v.'+id,[v.ten]),contentText('dm.vD.np12'),{h:V.ngay*HD}));continue;}}
    // kết minh với thế lực của nơi này (Sửa-N faKetMinh)
    const fa=LOC_NEO[loc].fa;if(fa&&THE_LUC[fa]&&faAlive(fa)&&!faMinh(fa)){const b=faQhBac(fa);
      if(b>=DM_CFG.minhBac-1)L.push(dmOpt('minh',contentText('dm.v.minh',[THE_LUC[fa].n]),contentText('dm.minhD'),{h:HD,no:b>=DM_CFG.minhBac?'':contentText('dm.minhChua')}));}
    if(loc==='LOC02'&&!(r.ends||[]).includes('END02')){const D=dmDk('END02');L.push(dmOpt('end02',contentText('dm.v.end02'),contentText('dm.dkD',[dmDkChu(D)]),{h:3*HM,no:dmDkOk(D)?'':contentText('dm.thieuDk')}));}
    if(loc==='LOC07'&&!(r.ends||[]).includes('END03')){const D=dmDk('END03');L.push(dmOpt('end03',contentText('dm.v.end03'),contentText('dm.dkD',[dmDkChu(D)]),{h:HM,no:dmDkOk(D)?'':contentText('dm.thieuDk')}));}
    // nghi thức
    if(NG_NOI.includes(loc)&&tri3()){const N2=NGHI_THUC.NG02,N3=NGHI_THUC.NG03;
      if(loc==='LOC15'&&!r.ng01){const D=dmDk('NG01');L.push(dmOpt('ng01',contentText('dm.v.ng01'),contentText('dm.ng01D',[dmDkChu(D)]),{h:NGHI_THUC.NG01.ngay*HD,st:NGHI_THUC.NG01.st,no:dmDkOk(D)?'':contentText('dm.thieuDk')}));}
      if(loc==='LOC15'&&!NG.NG02.mo)L.push(dmOpt('ng02m',contentText('dm.v.ng02m'),contentText('dm.ng02mD'),{h:N2.moHinh.ngay*HD,st:N2.moHinh.st,no:(r.st||0)>=N2.moHinh.st?'':contentText('dat.thieuLt')}));
      if(NG.NG02.mo&&!NG.NG02.tu[loc])L.push(dmOpt('ng02t',contentText('dm.v.ng02t'),contentText('dm.ng02tD'),{h:N2.tu.ngay*HD,st:N2.tu.st,no:(r.st||0)>=N2.tu.st?'':contentText('dat.thieuLt')}));
      if(loc==='LOC15'&&ngDu(NG.NG02.tu)&&!NG.NG02.chay)L.push(dmOpt('ng02c',contentText('dm.v.ng02c'),contentText('dm.ng02cD',[N2.chuKy]),{h:HD}));
      if(loc==='LOC15'&&NG.NG02.chay)L.push(dmOpt('ng02x',contentText('dm.v.ng02x'),contentText('dm.xacNhan',[contentText('dm.hq.END05')]),{h:HD,no:W().t-NG.NG02.chay>=N2.chuKy*HD?'':contentText('dm.ng02Cho')}));
      if(!NG.NG03.xm[loc])L.push(dmOpt('ng03x',contentText('dm.v.ng03x'),contentText('dm.ng03xD'),{h:N3.xm.ngay*HD}));
      else if(!NG.NG03.chot[loc])L.push(dmOpt('ng03c',contentText('dm.v.ng03c'),contentText('dm.ng03cD'),{h:N3.chot.ngay*HD,st:N3.chot.st,no:!ngDu(NG.NG03.xm)?contentText('dm.ng03CanXm'):(r.st||0)>=N3.chot.st?'':contentText('dat.thieuLt')}));
      if(ngDu(NG.NG03.chot)&&!NG.NG03.hen)L.push(dmOpt('ng03h',contentText('dm.v.ng03h',[N3.henNgay]),contentText('dm.xacNhan',[contentText('dm.hq.END07')]),{h:1}));
      if(NG.NG03.hen)L.push(dmOpt('ng03w',contentText('dm.v.ng03w',[fmtNgay(NG.NG03.hen-W().t)]),'',{h:0,no:contentText('dm.ng03Dang')}));}
    if(loc==='LOC15'&&!r.dietThieu){const D=dmDk('NG04'),N=NGHI_THUC.NG04;
      if(dmDkOk(D))L.push(dmOpt('ng04',contentText('dm.v.ng04'),contentText('dm.xacNhan',[contentText('dm.hq.END08')])+'\n\n'+dmDkChu(D),{h:N.ngay*HD,st:N.st}));
      else if(!r.pham&&r.realm>=2)L.push(dmOpt('ng04t',contentText('dm.v.ng04t'),contentText('dm.ng04tD',[N.thieuKhu])+'\n\n'+dmDkChu(D),{h:N.ngay*HD,st:Math.round(N.st*0.3),no:(r.st||0)>=Math.round(N.st*0.3)?'':contentText('dat.thieuLt')}));}
  }
  // truyền nghề (END06): ở thôn trấn / thành hoặc nơi neo
  if((loc||['tran','thanh'].includes(n.type))&&!(r.ends||[]).includes('END06')&&typeof ngChinh==='function'&&ngChinh(r)){const D=dmDk('END06');
    if(D[0][1])L.push(dmOpt('truyen',contentText('dm.v.truyen'),contentText('dm.truyenD',[DM_CFG.end06Thang])+'\n\n'+dmDkChu(D),{h:DM_CFG.end06Thang*HM,no:dmDkOk(D)?'':contentText('dm.thieuDk')}));}
  return L;}
function fmtNgay(h){return Math.max(1,Math.ceil(h/HD))+' ngày';}
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='daisu')return dmOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='daisu')return dmDo(id);return _vd.apply(this,arguments);};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(!G.run||!n||n.state==='ruin'&&!dmLocAt(n)||L.some(x=>x.a==='daisu'))return L;
  if(dmOpts(n).length)L.push({a:'daisu',i:'🕯️',l:contentText('dm.vN'),h:0,tip:contentText('dm.vTip'),dis:false,x:''});return L;};}
// chạy thời gian của một việc; trả false nếu đời đã hết giữa chừng
function dmTre(h){if(h>0)advanceTime(h);return !!G.run;}
function dmDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=dmOpts(n).find(x=>x.id===id);if(!o||o.no)return false;
  const loc=dmLocAt(n),NG=ngW();let msg=[];const ch=[];dbg('dm.lam',{id,loc});
  if(o.bac){bacAdd(-o.bac,'dm');ch.push(bacChip(-o.bac));}if(o.st){r.st-=o.st;ch.push(chip('💎','−'+o.st,VENUE_N.daisu,'dn'));}
  if(!dmTre(o.h))return true;
  const V=DM_VIEC[id];
  if(V&&V.k==='khao'){r.dmKhao=r.dmKhao||{};r.dmKhao[loc]=1;msg.push(dmKhaoLoi(loc,id)||contentText('dm.khaoT',[TRI_THUC[V.tri].n]));triThem(V.tri,loc);
    msg.push(triCo(V.tri)?contentText('dm.triDat',[TRI_THUC[V.tri].n]):contentText('dm.triDau',[TRI_THUC[V.tri].n]));}
  else if(V&&V.k==='mong'){const got=mongNhat(V.mong);msg.push(dmKhaoLoi(loc,id)||contentText('dm.vD.'+id));msg.push(got?mongLoi(V.mong):contentText('dm.mongDay'));}
  else if(V&&V.k==='khoa'){NG.khoa[loc]=1;msg.push(dmKhaoLoi(loc,id)||contentText('dm.khoaT'));}
  else if(V&&V.k==='np12'){const g=dmM().gb;if(id==='np12a')g.np1=1;else g.np2=1;msg.push(dmKhaoLoi(loc,id)||contentText('dm.'+id+'T'));}
  else if(id==='minh'){const fa=LOC_NEO[loc].fa;faKetMinh(fa,1);msg.push(contentText('dm.minhT',[THE_LUC[fa].n]));}
  else if(id==='end02'){bacAdd(-DM_CFG.end02Bac,'dm');ch.push(bacChip(-DM_CFG.end02Bac));msg.push(dmKetDoi('END02'));}
  else if(id==='end03'){r.st-=DM_CFG.end03St;msg.push(dmKetDoi('END03'));}
  else if(id==='truyen'){msg.push(dmKetDoi('END06'));}
  else if(id==='ng01'){r.ng01=1;msg.push(dmNgLoi('NG01','chuanBi')||contentText('dm.ng01T'));}
  else if(id==='ng02m'){NG.NG02.mo=1;msg.push(dmNgLoi('NG02','chuanBi')||contentText('dm.ng02mT'));if(dmM().gb.n)msg.push(contentText('dm.gbKhuyen'));}
  else if(id==='ng02t'){NG.NG02.tu[loc]=1;msg.push(contentText('dm.ng02tT',[NG_NOI.filter(l=>NG.NG02.tu[l]).length]));}
  else if(id==='ng02c'){NG.NG02.chay=W().t;msg.push(contentText('dm.ng02cT'));}
  else if(id==='ng02x'){dmKetHet('END05');return true;}
  else if(id==='ng03x'){NG.NG03.xm[loc]=1;msg.push(contentText('dm.ng03xT',[NG_NOI.filter(l=>NG.NG03.xm[l]).length]));}
  else if(id==='ng03c'){NG.NG03.chot[loc]=1;msg.push(contentText('dm.ng03cT',[NG_NOI.filter(l=>NG.NG03.chot[l]).length]));}
  else if(id==='ng03h'){NG.NG03.hen=W().t+NGHI_THUC.NG03.henNgay*HD;msg.push(dmNgLoi('NG03','chuanBi')||contentText('dm.ng03hT'));}
  else if(id==='ng04'){const N=NGHI_THUC.NG04;const mx=S().maxHp;for(let i=0;i<3;i++)r.hp=Math.max(1,r.hp-Math.round(mx*N.xung));dbg('dm.xung',{hp:r.hp});dmKetHet('END08');return true;}
  else if(id==='ng04t'){r.dietThieu=1;const z=maVucTao(null,NGHI_THUC.NG04.thieuKhu);if(typeof demDaiTang==='function')demDaiTang(1,'dm');dbg('dm.dietThieu',{khu:z.length});
    msg.push(dmNgLoi('NG04','hong')||contentText('dm.ng04tT',[z.length]));suLuocAdd(contentText('dm.suDiet',[r.ten]),'ma');}
  sc.msg=msg.filter(Boolean);sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;if(typeof saveSoon==='function')saveSoon();return true;}
function dmNgLoi(ma,k){const D=dmD().ng||{},x=D[ma];return x&&x[k]?dmT(x[k]):'';}
// thời gian: Người Gác Bến tới hẹn, chốt NG03 tới giờ
function dmTick(){const r=G.run;if(!r||!W())return;const NG=W().ng;
  if(NG&&NG.NG03&&NG.NG03.hen&&W().t>=NG.NG03.hen){if(ngDu(NG.NG03.chot)){dbg('dm.ngat',{});dmKetHet('END07');return;}NG.NG03.hen=0;dmSay(dmNgLoi('NG03','hong')||contentText('dm.ng03Hong'),'dn');}
  gbTick();}
{const _adv=advanceTime;advanceTime=function(h){const o=_adv.apply(this,arguments);if(!G.run)return o;try{dmTick();}catch(e){dbg('dm.loi',{m:String(e.message||e)});}return o;};}
// ---------- chết: END01, phi thăng (END04 / mộng trong mộng), Bến Vong Xuyên ----------
{const _d=die;die=function(cause){const r=G.run;if(!r)return _d.apply(this,arguments);dmM();
  const e1=dmEnd01(r,cause);const end4=cause==='phithang'&&!!r.ng01&&tri3();const ends=(r.ends||[]).slice();const ten=r.ten,kiep=r.kiep||1,ng01=!!r.ng01;
  const x=_d.apply(this,arguments);const o=G.over;if(!o)return x;
  if(e1==='END01'){ends.push('END01');dmKetGhi('END01',ten,kiep);const x1=(dmD().ket||{}).END01;o.ketCanh=(x1&&x1.canh?dmT(dmPick(x1.canh,'e1'+kiep),ten)+'\n\n':'')+KET_THUC.END01.cau;}
  o.ends=ends;o.end01=e1;if(o.life){o.life.ends=ends;if(e1==='chua')o.life.chuaTen=1;}
  if(end4){dmKetHet('END04',o.life);return x;}
  if(cause==='phithang')o.mim=1;
  if(ng01&&cause!=='phithang')o.ngHong=dmNgLoi('NG01','hong')||contentText('dm.ng01Hong');
  o.ben={st:'chon',kiep};dbg('dm.ben',{kiep,mim:!!o.mim});return x;};}
// Bến: "Uống canh, đi ngay" / "Ngồi đợi" (nghe Người Gác Bến, có thể nhặt Mộng Ấn #1; ngồi đợi thì khoảng luân hồi dài thêm)
function benData(){return dmD().ben||{};}
function benUong(){const o=G.over;if(!o||!o.ben||o.ben.st!=='chon')return false;o.ben.st='uong';o.ben.t=dmPick(benData().uong,'u'+o.ben.kiep)||contentText('dm.benUongT');dbg('dm.benChon',{c:'uong'});return true;}
function benDoi(){const o=G.over;if(!o||!o.ben||o.ben.st!=='chon')return false;const y=ri(DM_CFG.doiNam[0],DM_CFG.doiNam[1]);worldGap(y);o.gap=(o.gap||0)+y;o.ben.them=y;
  const B=benData();const dau=!mongCo('MA01');const L=(dau?B.doi:B.doiLai)||[];o.ben.L=(L.length?L:[contentText(dau?'dm.benDoi1':'dm.benDoiLai')]).slice();o.ben.i=0;o.ben.st='doi';dbg('dm.benChon',{c:'doi',y,dau});return true;}
function benTiep(){const o=G.over,b=o&&o.ben;if(!b||b.st!=='doi')return false;if(b.i<b.L.length-1){b.i++;return true;}
  b.st='xong';if(!mongCo('MA01')){b.mong=mongNhat('MA01',b.kiep)?'MA01':'';b.t=b.mong?mongLoi('MA01'):contentText('dm.mongDay');}else b.t=contentText('dm.benXong');return true;}
function benView(){const o=G.over,b=o&&o.ben;if(!b)return null;const B=benData();
  return {st:b.st,vao:dmPick(B.vao,'v'+b.kiep)||contentText('dm.benVao'),t:b.t||'',dong:b.st==='doi'?b.L[b.i]:'',con:b.st==='doi'&&b.i<b.L.length-1,them:b.them||0,
    mim:o.mim?(dmPick(B.mim,'m'+b.kiep)||contentText('dm.mimT')):'',mong:b.mong&&MONG_AN[b.mong]?contentText('dm.mongNhat',[MONG_AN[b.mong].n,MONG_AN[b.mong].he]):''};}
// ---------- xem (Bến Vong Xuyên: thẻ Đại Mộng; màn hết kiếp; màn kết) ----------
function dmView(){const M=dmM();
  return {mong:Object.keys(MONG_AN).map(id=>({id,n:MONG_AN[id].n,he:MONG_AN[id].he,co:M.mong.includes(id),tri:TRI_THUC[MONG_AN[id].tri].n})),
    tri:Object.keys(TRI_THUC).map(id=>{const c=new Set(triSrc(id)).size;return {id,n:TRI_THUC[id].n,co:triCo(id),muc:contentText('dm.triMuc.'+Math.min(2,c))};}),
    gb:{n:M.gb.n,nhan:M.gb.nk.length},ends:M.ends.map(e=>({id:e.id,n:KET_THUC[e.id]?KET_THUC[e.id].n:e.id,kiep:e.kiep,ten:e.ten,y:e.y})),daTinh:!!M.daTinh,endsCu:(M.endsCu||[]).length};}
function dmKetView(){const K=G.meta&&G.meta.ketHet;if(!K)return null;const D=KET_THUC[K.id];return {id:K.id,n:D.n,cau:D.cau,canh:K.canh,hau:K.hau||[],ten:K.ten,y:K.y};}
function dmEndsName(L){return (L||[]).map(id=>KET_THUC[id]?KET_THUC[id].n:id);}
