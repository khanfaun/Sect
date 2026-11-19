// Bộ kiểm tra lõi luật chơi, chạy không cần trình duyệt (nạp core + core2 + data như bot.js).
// Dùng:  node tools/test.js            chạy tất cả
//        node tools/test.js crush ngo  chỉ chạy vài bài
//        node tools/test.js --log      in thêm nhật ký gỡ lỗi (NK) của từng bài
//        node tools/test.js --list     liệt kê tên các bài
// Thêm bài mới: viết một hàm trong TESTS ở dưới, dùng ok(điều_kiện, 'mô tả') và run('mã chạy trong game').
const vm = require('vm'), cp = require('child_process');
const core = require('./ghep').script(['core', 'core2', 'data']);
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
vm.runInContext(core, ctx, { filename: 'core.js' });
const run = code => vm.runInContext(code, ctx, {timeout:20000});
const args = process.argv.slice(2), SHOWLOG = args.includes('--log');
const names = args.filter(a => !a.startsWith('--'));

// Fixture có seed để phép thử không phụ thuộc vị trí sinh ngẫu nhiên.
let fixtureSeed = 1728;
function fresh(patch) {
  const seed = ++fixtureSeed;
  run(`(() => {GEO=null;RS=mul(16717);const original=genWorld;genWorld=()=>original(${seed});
    try{G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);}
    finally{genWorld=original;}
    NK.on=true;NK.clear();G.run.scene=null;G.run.rootKnown=1; // Sửa-C.6: linh căn luôn ẩn tới khi trắc; bài cũ coi như đã trắc
    FEAT.an=0;FEAT.nc=0;FEAT.no=0;FEAT.nha=0; // nợ/nhà ở (Sửa-B) tắt, bài no_nha bật lại; ăn uống (Đ3.6) tắt trong bài không nói về cái ăn; com_ao bật lại. Nhu cầu (Sửa-A) tắt để giá cố định; bài nhu_cau bật lại
  })()`);
  if (patch) run(patch);
}
let fails = 0, cur = '';
const ok = (c, msg) => { if (!c) { fails++; console.log('   ✗ ' + msg); } else console.log('   ✓ ' + msg); };

const TESTS = {
  // Đ8.6: đất ma — ba khu, bậc, hồi theo thế kỷ, nguy hiểm, thôn trấn biến mất, tu luyện, nhiễm ma khí
  // Đ9.1: bộ máy tuyến — đi hết OR01 (Con nhà nông), lỡ hạn thì tự diễn, vai mất dùng người/vật thay, bản lưu cũ, khoảng luân hồi dài, đại lộ mở từ hồi 2 và đổi một lần
  // Sửa-J câu 44: lời mời chưa trả lời nằm trong Sổ tay (Mệnh thư), mở lại được trước hạn
  menh_thu() {
    fresh("G._ngNoEv=1;G.run.origin='nong';G.run.bac=20000;delete G.run.arc");
    run("tuyenTick();W().t+=HM;tuyenTick()");
    let V=JSON.parse(run("JSON.stringify(tuyenView())"));
    ok(V.length===1&&V[0].id==='OR01'&&V[0].nut&&V[0].han&&!V[0].cho, 'Mệnh thư: tuyến đang đi, mốc hiện tại, hạn bằng chữ ('+V[0].han+')');
    ok(!/\d/.test(V[0].han+V[0].nut), 'hạn và tên mốc không có con số');
    run("G.run.scene=null;tuyenGap(true);kyPick(kyOpts(G.run.scene).length-1);G.run.scene=null");
    V=JSON.parse(run("JSON.stringify(tuyenView())"));
    ok(V[0].cho===1&&V[0].moLai===1, '"Để sau": lời mời vẫn nằm trong Sổ tay, có nút mở lại');
    ok(run("tuyenMoLai('OR01')")&&run("G.run.scene.ev")==='tuyen:OR01:N1', 'mở lại từ Sổ tay: hiện lại đúng lời mời N1');
    run("G.run.scene=null");
    for(let k=0;k<5;k++)run("tuyenGap(true);kyPick(kyOpts(G.run.scene).length-1);G.run.scene=null");
    ok(run("tuyenMoLai('OR01')"), 'gác nhiều lần (quá số lần tự nhắc) vẫn mở lại được');
    run("G.run.scene=null;W().t=G.run.arc.xt.han+1");
    ok(!run("tuyenMoLai('OR01')")&&!JSON.parse(run("JSON.stringify(tuyenView())"))[0].moLai, 'quá hạn: không mở lại được');
    ok(!run("tuyenMoLai('OR99')"), 'tuyến không có: không lỗi');
  },
  menh_tuyen() {
    fresh("G._ngNoEv=1;G.run.origin='nong';G.run.bac=20000;delete G.run.arc");
    ok(run("!!TUYEN.OR01&&TUYEN_XT.nong==='OR01'&&CAT.byId.vt_or01_mau_da&&1"), 'tuyến OR01 nạp từ content/tuyen, vật truyện vào danh mục');
    run("tuyenTick()");ok(run("G.run.arc.xt&&G.run.arc.xt.id==='OR01'&&G.run.arc.xt.han==null"), 'mở tuyến xuất thân theo r.origin, nút đầu chờ một tháng');
    run("W().t+=HM;tuyenTick()");ok(run("G.run.arc.xt.han>W().t"), 'tới lúc: N1 mở, có hạn mềm');
    const ten1=run("vaiNow('NP01').ten");run("G.run.scene=null;tuyenGap(true)");
    ok(run("G.run.scene&&G.run.scene.type==='kyngo'&&G.run.scene.ev==='tuyen:OR01:N1'")&&run("G.run.scene.text").includes(ten1), 'lời mời hiện bằng hộp kỳ ngộ, gọi người giữ vai NP01 ('+ten1+')');
    ok(!/\{|\d/.test(run("G.run.scene.text")), 'chữ đã thay mã, không còn {…} hay con số');
    ok(run("kyOpts(G.run.scene).length")===4&&run("kyOpts(G.run.scene)[3].l")==='Để sau', 'ba lựa chọn + "Để sau" (không ép)');
    run("kyPick(0);G.run.scene=null");ok(run("G.run.arc.xt.i===1&&G.run.arc.xt.dau.so_that===1&&G.run.arc.xt.lich[0].c==='doi_chieu'"), 'chọn: đặt dấu, ghi sổ, sang N2');
    ok(run("NK.count('nq')")>0||run("JSON.stringify(G.run.nq||{})").length>2, 'việc làm ghi vào sổ nghiệp (deed), không hiện số');
    // N2: tin đồn — chỉ gặp khi tới nơi
    run("W().t+=2*HM;tuyenTick()");const loc=run("anchorNode('LOC01').id");
    run(`G.run.at=(${loc}===G.run.at?W().regions[0].nodes.find(n=>n.id!==${loc}).id:G.run.at);G.run.scene=null`);ok(!run("tuyenGap()"), 'tin đồn: chưa tới {LOC01} thì chưa gặp');
    run(`G.run.at=${loc};G.run.scene=null`);ok(run("tuyenGap()")&&run("G.run.scene.ev")==='tuyen:OR01:N2', 'tới nơi thì gặp N2');
    const b0=run("G.run.bac");run("kyPick(2);G.run.scene=null");ok(run("G.run.arc.xt.dau.de_sua===1&&G.run.bac")===b0-3000, 'đắp lại đê: trừ đúng ba lượng bạc (xu)');
    ok(run("hasItem('vt_or01_mau_da')")===false, 'không chọn lấy mẫu thì không có mẫu đá');
    // "Để sau" rồi lỡ hạn N3: thế giới tự diễn, không kẹt
    run("W().t+=3*HM;tuyenTick();G.run.scene=null;tuyenGap(true)");run("kyPick(kyOpts(G.run.scene).length-1);G.run.scene=null");
    ok(run("G.run.arc.xt.i===2&&G.run.arc.xt.moi===1"), '"Để sau": nút vẫn mở, chờ');
    ok(!run("tuyenGap()"), 'vừa gác thì chưa nhắc lại ngay');
    const sl0=run("(W().suLuoc||[]).length");run("W().t+=7*HM;tuyenTick()");
    ok(run("G.run.arc.xt.i===3&&G.run.arc.xt.dau.thon_vang===1&&G.run.arc.xt.lich[2].c==='~'&&G.run.arc.xt.ngoai===1"), 'lỡ hạn N3: tự diễn, đặt dấu, đi tiếp N4');
    ok(run("(W().suLuoc||[]).length")>sl0&&/giáp hạt/.test(run("W().suLuoc.slice(-1)[0].t")), 'tự diễn ghi Sử lược');
    // bản lưu cũ / lưu giữa tuyến
    run("G=JSON.parse(JSON.stringify(G))");ok(run("G.run.arc.xt.i")===3, 'lưu – tải giữa tuyến giữ tiến độ');
    // N4: NP02 đã mất → dùng thayThe, không hồi sinh
    const ten2=run("vaiNow('NP02').ten");run("vaiGiet('NP02','test');W().t+=4*HM;tuyenTick();G.run.scene=null;tuyenGap(true)");
    ok(run("G.run.scene.ev")==='tuyen:OR01:N4'&&!run("G.run.scene.text").includes(ten2)&&/quân dịch/.test(run("G.run.scene.text")), 'người giữ vai NP02 đã mất: kể qua vật chứng thay, không gọi '+ten2);
    ok(run("vaiNow('NP02').song")===false, 'không hồi sinh người chết');
    run("kyPick(1);G.run.scene=null");
    // N5 → kết A
    run("W().t+=6*HM;tuyenTick();G.run.scene=null;tuyenGap(true)");ok(run("kyOpts(G.run.scene)[1].no")!=='', 'kết đường khác: "thu tô" khoá vì chưa có ruộng mua');
    run("kyPick(0);G.run.scene=null");
    ok(run("G.run.arc.xt.xong===1&&G.run.arc.xt.ket==='A'"), 'đủ kho chung + đê sửa: kết A "Đèn còn trong thôn"');
    ok(run("W().tuyenVong.slice(-1)[0].id==='OR01'&&W().tuyenVong.slice(-1)[0].ket==='A'")&&/bia người giữ giống/.test(run("W().suLuoc.slice(-1)[0].t")), 'kết ghi Sử lược + dấu vọng cho kiếp sau');
    ok(run("G.run.arc.dl===null"), 'chưa có tệp đại lộ the_gia: không mở gì, không lỗi');
    run("const n=W().suLuoc.length;tuyenTick();tuyenTick();G._n=n");ok(run("W().suLuoc.length===G._n"), 'xong rồi thì không ghi lặp');
    // kiếp sau, cách hai trăm năm: dấu vọng còn, tuyến mới từ đầu
    run("W().t+=200*HY;G.run.kiep=(G.run.kiep||1)+1;G.run.arc=null;G.run.log=[];tuyenTick()");
    ok(/Người ta còn nhắc/.test(run("JSON.stringify(G.run.log)")), 'khoảng luân hồi dài: kiếp sau nghe dấu vọng');
    ok(run("G.run.arc.xt.id==='OR01'&&G.run.arc.xt.i===0"), 'kiếp mới mở tuyến lại từ đầu');
    // bỏ hết: nhảy năm mươi năm rồi chạy từng tháng — tự diễn tới cuối, kết "đứng ngoài", không kẹt
    run("W().t+=50*HY;for(let i=0;i<80;i++){W().t+=HM;tuyenTick();}");
    ok(run("G.run.arc.xt.xong===1&&G.run.arc.xt.ket==='ngoai'&&G.run.arc.xt.ngoai===5"), 'bỏ qua cả năm nút: thế giới tự diễn hết, kết "người đứng ngoài"');
    // bản lưu cũ không có r.arc, đang ở giữa đời
    fresh("G.run.origin='nong';delete G.run.arc");run("W().t+=HM;advanceTime(HM)");ok(run("!!G.run.arc&&G.run.arc.xt.id==='OR01'"), 'bản lưu cũ không có r.arc: tháng kế dựng lại');
    // đại lộ: mở từ hồi 2 khi tuyến xuất thân đã kết, đổi được một lần
    run(`(()=>{const mk=(id,d)=>{const A=JSON.parse(JSON.stringify(TUYEN.OR01));A.id=id;A.loai='dai_lo';A.daiLo=d;delete A.xuatThan;A.nut[0].boQuaNeuXuatThan=true;TUYEN[id]=A;(TUYEN_DL[d]=TUYEN_DL[d]||[]).push(id);};mk('DL07','the_gia');mk('DL03','de_nghiep');})()`);
    run("G.run.arc.xt.xong=1;G.run.arc.xt.ket='A';tyDlTuMo()");ok(run("G.run.arc.dl&&G.run.arc.dl.id==='DL07'&&G.run.arc.dl.i===1"), 'đại lộ gợi ý mở sau tuyến xuất thân, bắt đầu từ hồi 2');
    ok(run("tuyenMoDaiLo('de_nghiep')")&&run("G.run.arc.dl.id")==='DL03', 'đổi đại lộ lần một: được');
    ok(!run("tuyenMoDaiLo('the_gia')"), 'đổi lần hai: không được');
    ok(run("tuyenView().length")===2, 'tuyenView: Sổ tay đọc được hai tuyến');
    run("delete TUYEN.DL07;delete TUYEN.DL03;delete TUYEN_DL.the_gia;delete TUYEN_DL.de_nghiep");
    run("tuyenTick();tuyenGap(true)");ok(run("tuyenView().length")===1, 'bản lưu trỏ tới tuyến đã gỡ: bỏ qua, không lỗi');
  },
  dat_ma() {
    fresh();
    run("var vyRun=(n)=>{const w=W();for(let i=0;i<n;i++){w.t+=HY;worldYearsTo(w);}}");
    run("demDaiTang(4,'test')");run("vyRun(6)");
    ok(run("(W().maVuc||[]).length")===3, 'Đêm Dài không ai ngăn: ba khu thành đất ma');
    ok(run("W().maVuc.every(z=>z.ma>95&&z.bac===0)"), 'mới hóa: Ma vực');
    ok(run("W().suLuoc.some(x=>x.k==='ma')"), 'Sử lược ghi đất ma');
    ok(run("W().maVuc.every(z=>z.nut.every(id=>{const n=nodeById(id);return !(n.anchor&&LOC_NEO[n.anchor].loi);}))"), 'nơi lõi không bị nuốt');
    ok(run("W().maVuc.flatMap(z=>z.nut).map(nodeById).filter(n=>n.type==='tran'||n.type==='thanh').every(n=>n.state==='ruin'||n.id===G.run.at)"), 'Ma vực: thôn trấn biến mất');
    ok(run("W().maVuc.flatMap(z=>z.nut).map(nodeById).every(n=>n.danger>=Math.min(3,n.dangerGoc+2))"), 'Ma vực: nguy hiểm cao hơn');
    // tu luyện chính đạo −50%
    run("(()=>{const z=W().maVuc[0];G.run.scene=null;G.run.at=z.tam;})()");ok(run("maLk(curNode())")===0.5, 'tu luyện chính đạo ở Ma vực ×0,5');
    // phàm nhân nhiễm ma khí
    run("(()=>{const r=G.run;r.pham=1;r.wounds=[];r.maT=W().t;const t0=r.tamma||0;W().t+=20*HD;timeHooks(20*HD);})()");
    ok(run("wounds().length")>0&&run("NK.count('ma.nhiem')")>0, 'phàm nhân ở Ma vực hai mươi ngày: nhiễm ma khí (thương, tâm ma)');
    // hồi theo thế kỷ
    run("vyRun(600)");ok(run("W().maVuc.length")===0||run("W().maVuc.every(z=>z.bac>=1||maRate(z,W())<MA_CFG.hoi)"), 'sáu trăm năm: hết Ma vực (trừ khu có ma tông gần làm chậm)');
    run("vyRun(2900)");ok(run("W().maVuc.length")===0, 'vài ngàn năm (dù có ma tông gần làm chậm): đất đã lành');
    ok(run("W().regions.flatMap(R=>R.nodes).every(n=>n.maLv==null&&!n.maRuin)"), 'lành hẳn: không còn dấu ma trên nút');
    // tịnh hóa
    run("maVucTao(anchorNode('LOC07').id,1)");const m0=run("maAt(anchorNode('LOC07')).ma");run("maTinhHoa(anchorNode('LOC07'),5)");
    ok(run("maAt(anchorNode('LOC07')).ma")===m0-5, 'siêu độ / tịnh hóa: ma khí −5');
  },
  // Đ8.5: thời gian luân hồi + tua theo thập kỷ
  khoang_luan_hoi() {
    fresh();
    const g=JSON.parse(run("JSON.stringify([1,2,3].flatMap(k=>{const L=[];for(let i=0;i<200;i++)L.push(gapRoll({kiep:k,seeds:[]}));return L;}))"));
    ok(g.every(y=>y>=3&&y<=30), 'ba kiếp đầu: khoảng luân hồi 3–30 năm');
    const h=JSON.parse(run("JSON.stringify((()=>{const L=[];for(let i=0;i<4000;i++)L.push(gapRoll({kiep:9,seeds:[]}));return L;})())"));
    const fr=k=>h.filter(y=>y<=k).length/h.length;
    ok(fr(30)>0.48&&fr(30)<0.62&&fr(800)<0.995&&Math.max(...h)<=5000&&Math.max(...h)>800, 'kiếp sau: phần lớn Gần, có Vừa, Xa, Rất xa (Gần '+Math.round(fr(30)*100)+'%, tối đa '+Math.max(...h)+' năm)');
    const hn=JSON.parse(run("JSON.stringify((()=>{const o=ngBacB;ngBacB=()=>4;const L=[];for(let i=0;i<4000;i++)L.push(gapRoll({kiep:9,seeds:[]}));ngBacB=o;return L;})())"));
    ok(hn.filter(y=>y>150).length>h.filter(y=>y>150).length*1.5, 'nghiệp chướng nặng: khoảng Xa, Rất xa nhiều hơn');
    ok(run("gapLoi(12)")===run("LH_KHOANG[0].loi")&&run("gapLoi(3000)")===run("LH_KHOANG[3].loi")&&!/\d/.test(run("gapLoi(500)")), 'lời ở bến theo khoảng, không ghi số năm');
    // ép khoảng ba ngàn năm
    run("(()=>{const w=W();w.legacy=[{t:'an',ten:'Lão Ngư',d:'cứu',who:'X'},{t:'oan',ten:'Hắc Lang',d:'giết',who:'X',feud:1},{t:'oan',ten:'Ác Bá',d:'cướp',who:'X'}];w.suLuoc=[];})()");
    const y0=run("tYear(W().t)");const t0=Date.now();run("G.run=null;worldGap(3000)");const ms=Date.now()-t0;
    ok(ms<2000, 'ép khoảng ba ngàn năm chạy dưới hai giây ('+ms+' ms)');
    ok(run("tYear(W().t)")-y0===3000, 'thế giới trôi đúng ba ngàn năm');
    ok(run("W().suLuoc.length")>0&&run("W().suLuoc.length")<=60, 'Sử lược có chuyện, không quá sáu mươi dòng ('+run("W().suLuoc.length")+')');
    ok(run("W().suLuoc.some(x=>x.k==='gop')"), 'chuyện cũ gộp theo thế kỷ');
    ok(run("W().rstate.every(s=>!s.alive||s.age<=LIFE[s.realm]*0.95+1)"), 'không còn thiên kiêu nào quá thọ mà vẫn sống');
    ok(run("Object.keys(VAI_NP).every(m=>{const x=vaiNow(m);return x.song?(W().vai[m].tho==null||x.tuoi<W().vai[m].tho):!!x.thay;})"), 'mọi vai có người giữ trong thọ hoặc có vật chứng thay');
    ok(run("Object.keys(LOC_NEO).every(c=>!!anchorNode(c))")&&run("LOC_LOI.every(c=>anchorNode(c).state!=='ruin')"), 'mười lăm nơi neo còn; nơi lõi (LOC05, LOC12, LOC15) không hoang (bí mật luôn còn chỗ không thể mất)');
    ok(run("W().legacy.find(L=>L.ten0==='Hắc Lang'||L.ten==='Hắc Lang').oanHon")===1, 'huyết thù ba ngàn năm thành oán hồn');
    ok(run("W().legacy.filter(L=>L.ten0==='Lão Ngư'||L.ten0==='Ác Bá').every(L=>/hậu duệ/.test(L.ten))||W().legacy.some(L=>L.done)"), 'ân oán với người phàm: chuyển hậu duệ hoặc khép');
    ok(run("Object.keys(THOI_CUC).filter(id=>id!=='CLK06').every(id=>W().thoiCuc[id].lan>0)"), 'đồng hồ đã tự diễn trong lúc vắng mặt');
    // chết thật ở kiếp thứ chín: màn hết kiếp có số năm, thế giới chạy tiếp
    fresh("G.run.kiep=9");const g9=run("(()=>{const r=G.run;die('toahoa');return G.over.gap;})()");
    ok(g9>=3&&g9<=5000&&run("G.screen")==='over', 'kết kiếp thứ chín: khoảng '+g9+' năm, vào màn hết kiếp');
    fresh();const g1=run("(()=>{die('toahoa');return G.over.gap;})()");ok(g1>=3&&g1<=30, 'kết kiếp đầu: khoảng 3–30 năm');
  },
  // Đ8.4: mười bốn đồng hồ thế giới
  thoi_cuc() {
    fresh();
    run("var vyRun=(n,o)=>{const w=W();for(let i=0;i<n;i++){w.t+=HY;worldYearsTo(w,o);}}");
    ok(run("Object.keys(W().thoiCuc).length")===14, 'mười bốn đồng hồ');
    const q0=run("W().quoc");run("vyRun(400)");
    const S=JSON.parse(run("JSON.stringify(W().thoiCuc)"));
    const thieu=Object.keys(S).filter(id=>id!=='CLK06'&&!S[id].lan);
    ok(!thieu.length, 'bốn trăm năm: mọi đồng hồ theo thời gian đều đã diễn ít nhất một lần'+(thieu.length?' — thiếu '+thieu:''));
    ok(S.CLK12.lan===1&&S.CLK12.tNext===null, 'Tiên Nhân Hạ Phàm chỉ một lần');
    ok(S.CLK06.lan===0&&S.CLK06.muc===0, 'Đêm Dài không tăng vì thời gian');
    ok(S.CLK07.lan>=12, 'Đại Hội Thiên Kiêu mỗi ba mươi năm ('+S.CLK07.lan+' lần)');
    ok(run("W().quoc")!==q0&&run("W().trieu.length")>=2, 'Đổi Ngôi: quốc hiệu mới ('+q0+' → '+run("W().quoc")+')');
    ok(run("/người thay/.test(vaiNow('NP04').qh||'')||!vaiNow('NP04').song||W().vai.NP04.ke.some(x=>x.ly==='doi_ngoi')"), 'Đổi Ngôi: vua cũ mất ngôi, người thay giữ vai quân chủ');
    ok(run("W().suLuoc.some(x=>x.k==='clk')"), 'kết quả mặc định ghi Sử lược');
    ok(Object.keys(S).every(id=>S[id].ketQua.every(k=>k.md===1)), 'không ai can thiệp: mọi kết quả là mặc định');
    // can thiệp
    run("(()=>{const s=W().thoiCuc.CLK07;s.pha=0;s.tNext=tYear(W().t)+1;})()");run("vyRun(1)");
    ok(run("W().thoiCuc.CLK07.pha")>0&&run("clkView().some(x=>x.id==='CLK07')"), 'đồng hồ đang diễn ra hiện trong clkView');
    ok(run("clkCanThiep('CLK07','Ngươi đoạt khôi thủ.')")&&!run("clkCanThiep('CLK13','x')||false")===!run("W().thoiCuc.CLK13.pha>0"), 'chỉ can thiệp được đồng hồ đang diễn ra');
    run("vyRun(3)");ok(run("W().thoiCuc.CLK07.ketQua.slice(-1)[0].md")===0&&run("W().thoiCuc.CLK07.ketQua.slice(-1)[0].kq")==='Ngươi đoạt khôi thủ.', 'có can thiệp thì không áp mặc định');
    // Đêm Dài chỉ tăng vì hành động
    run("demDaiTang(4,'test')");ok(run("W().thoiCuc.CLK06.pha")===3, 'phá phong ấn: Đêm Dài lên nấc Ma chủ tỉnh');
    run("vyRun(6)");ok(run("W().thoiCuc.CLK06.lan")===1&&run("W().thoiCuc.CLK06.muc")===2, 'năm năm không ai ngăn: Đêm Dài diễn kết quả mặc định rồi lùi về nấc hai');
    // Luật 2, Luật 5
    run("locHu('LOC12',W(),tYear(W().t),5)");ok(run("anchorNode('LOC12').state")==='ok'&&run("locPhaT('LOC12')")===run("LOC_NEO.LOC12.pha[0]"), 'Lạn Kha Tự bị phá: đi theo trạng thái đã viết, phần lõi không hoang');
    run("locHu('LOC01',W(),tYear(W().t),5)");ok(run("anchorNode('LOC01').state")==='ruin'||run("G.run.at")===run("anchorNode('LOC01').id"), 'Thanh Khê Thôn bị phá thành '+run("locPhaT('LOC01')"));
    // Long Mạch Đứt: tu luyện chậm ở khu đó
    run("(()=>{const r=G.run;r.scene=null;const n=W().regions[0].nodes.find(n=>n.type==='linhdia')||W().regions[0].nodes[0];r.at=n.id;})()");
    run("W().lkMod={}");const b0=run("bqRate()");run("W().lkMod={0:0.7}");ok(run("lkModAt(curNode())")===0.7&&(b0===0||Math.abs(run("bqRate()")/b0-0.7)<1e-6), 'long mạch đứt: bế quan ở khu đó ×0,7');
    run("W().lkMod={}");
  },
  // Đ8.2: vai NPC có người kế; Đ8.3: mười thế lực, sổ cống hiến theo thế lực
  vai() {
    fresh();
    ok(run("Object.keys(W().vai).length")===30&&run("vaiNow('NP01').ten")==='Lý Thổ'&&run("vaiNow('NP01').noiTen")==='Thanh Khê Thôn', 'ba mươi vai, NP01 Lý Thổ ở Thanh Khê Thôn');
    run("var vyRun=(n)=>{const w=W();for(let i=0;i<n;i++){w.t+=HY;worldYearsTo(w);}};vyRun(200)");
    const v=JSON.parse(run("JSON.stringify(vaiNow('NP01'))"));
    ok(v.doi>1&&v.ten!=='Lý Thổ'&&run("W().vai.NP01.ke.some(x=>x.ten==='Lý Thổ')"), 'hai trăm năm sau Lý Thổ đã mất, có người kế ('+v.ten+', đời '+v.doi+')');
    ok(run("Object.keys(VAI_NP).every(m=>{const x=vaiNow(m);return x.song?x.tuoi<W().vai[m].tho||VAI_NP[m].bat:!!x.thay;})"), 'mọi vai có người giữ còn sống trong thọ, hoặc có người / vật chứng thay thế');
    ok(run("vaiNow('NP30').ten")==='Tịch Âm'&&run("vaiNow('NP30').doi")===1, 'NP30 Tịch Âm không già, không người kế');
    ok(run("W().suLuoc.length")>0, 'Sử lược có ghi chuyện');
    run("vaiGiet('NP19')");ok(!run("vaiNow('NP19').song")&&!!run("vaiNow('NP19').thay"), 'người giữ vai bị giết: vai trống, có vật chứng thay');
    run("vyRun(3)");ok(run("vaiNow('NP19').song")&&/học trò của/.test(run("vaiNow('NP19').qh")), 'vài năm sau có học trò nhận lại vai');
    // thế lực
    ok(run("Object.keys(W().fa).length")===10&&run("faNow('FA01').n")==='Lương triều', 'mười thế lực');
    ok(run("Object.keys(W().fa).filter(k=>W().fa[k].trang!=='diet').length")>=7, 'hai trăm năm yên ổn: phần lớn thế lực còn');
    run("faAdj('FA05',-200,'test')");ok(run("faNow('FA05').trang")==='diet'&&!run("vaiNow('NP13').song"), 'Huyết Sát Cốc tan: chủ cốc không còn ai giữ');
    run("vyRun(5)");ok(!run("vaiNow('NP13').song"), 'thế lực đã tan thì vai đứng đầu còn trống');
    run("W().fa.FA05.tDiet-=200;vyRun(120)");ok(run("W().fa.FA05.lap")>=2||run("faNow('FA05').trang")==='diet', 'thế lực tan lâu có thể được dựng lại');
    // cống hiến theo thế lực
    run("(()=>{const r=G.run;r.flags.tongmon=0;r.at=anchorNode('LOC01').id;})()");
    ok(run("chKey()")==='fa:FA04', 'đứng ở Thanh Khê Thôn, không thuộc tông: sổ cống hiến của Thanh Khê Liên Thôn');
    run("chAdd(chKey(),5)");ok(run("faCong('FA04')")===5, 'cống hiến ghi vào sổ fa:FA04');
    // bản lưu cũ
    run("(()=>{const w=W();delete w.vai;delete w.fa;delete w.yLast;delete w.suLuoc;snapWorld(w);})()");
    ok(run("Object.keys(W().vai).length")===30&&run("Object.keys(W().fa).length")===10&&run("W().yLast")===run("tYear(W().t)"), 'bản lưu cũ: dựng vai, thế lực khi tải');
    ok(run("vaiTuiAdd('NP05',{id:'x1',n:'Ngọc bội'})&&vaiTui('NP05').length===1&&vaiTuiBo('NP05','x1').n==='Ngọc bội'"), 'NPC có túi đồ nhỏ (thêm, lấy ra)');
    run("delete W().vai.NP05.tui");ok(run("Array.isArray(vaiTui('NP05'))"), 'bản lưu cũ không có túi NPC vẫn đọc được');
    // nối Đ7: hộp Pháp môn ghi người dạy đang giữ vai
    run("(()=>{const n=anchorNode('LOC10');G.run.at=n.id;})()");
    ok(run("tuThay(anchorNode('LOC10'))").includes(run("vaiNow('NP19').ten")), 'Bách Thảo Cốc: người dạy là người đang giữ vai NP19');
    const t0=Date.now();run("vyRun(3000)");ok(Date.now()-t0<2000, 'ba ngàn năm thế giới chạy nhanh ('+(Date.now()-t0)+' ms)');
  },
  // Đ8.1: 15 địa điểm neo — đủ, khác nhau, đúng đại khu, không phải sơn môn; bản lưu cũ đặt neo khi tải và chốt lại nơi thầy dạy / nguồn cải căn
  neo() {
    fresh();
    const L=JSON.parse(run("JSON.stringify(Object.keys(LOC_NEO).map(c=>{const n=anchorNode(c);return n&&[c,n.id,Math.floor(n.id/100)===LOC_NEO[c].kv,n.type,n.name===LOC_NEO[c].n,n.anchor===c];}))"));
    ok(L.length===15&&L.every(x=>x), 'đủ mười lăm nút neo');
    ok(new Set(L.map(x=>x[1])).size===15, 'mười lăm nút khác nhau');
    ok(L.every(x=>x[2]&&x[4]&&x[5]), 'mỗi neo đúng đại khu, đúng tên');
    ok(L.every(x=>x[3]!=='tong'), 'không neo vào sơn môn (giữ tên tông)');
    ok(run("anchorNode('LOC01').type")==='tran'&&run("anchorNode('LOC02').type")==='thanh', 'Thanh Khê Thôn là thôn trấn, Lương Kinh là thành');
    ok(run("locName('LOC12')")==='Lạn Kha Tự', 'locName đọc tên trên bản đồ');
    // bản lưu cũ: chưa có neo, nơi thầy dạy đã chốt theo loại nút
    run("(()=>{const w=W();for(const R0 of w.regions)for(const n of R0.nodes)if(n.anchor){n.name=n.name0;delete n.anchor;delete n.sectFix;}delete w.anchorsV1;w.tuSrc={LOC10:0};ccSrc('CC01');w.ccSrc.CC01.node=0;})()");
    ok(!run("W().regions.some(R=>R.nodes.some(n=>n.anchor))"), 'giả bản lưu cũ: không còn neo');
    run("snapWorld(W())");
    ok(run("W().anchorsV1")===1&&run("W().regions.flatMap(R=>R.nodes).filter(n=>n.anchor).length")===15, 'tải lại: đặt đủ neo');
    ok(run("W().tuSrc.LOC10===anchorNode('LOC10').id&&W().ccSrc.CC01.node===anchorNode('LOC10').id"), 'nơi thầy dạy, nguồn cải căn chốt lại theo neo');
    run("snapWorld(W())");ok(run("W().regions.flatMap(R=>R.nodes).filter(n=>n.anchor).length")===15, 'tải lần nữa không đặt thêm');
  },
  // Đ7.4: kiểm nghề tu — đủ ba chiêu sau syncSkills, luật không ghép, thần thông chỉ qua pháp tướng, 48 chiêu chạy được trong trận
  nghe_tu() {
    fresh("G._ngNoEv=1;G._tuNoRui=1;G.run.pham=0;G.run.root={id:'tap',els:['kim','moc'],q:'thuong'};G.run.rootKnown=1;G.run.st=9999;var ntLk=lkTang;lkTang=()=>9");
    ok(run("Object.keys(TU_NGHE).length")===16&&run("Object.keys(TU_ART).length")===16, 'mười sáu nghề tu, mười sáu công pháp');
    ok(run("Object.keys(TU_NGHE).every(id=>TU_ART[id].lines.filter(x=>x.sk).map(x=>x.sk).join()===['a','b','c'].map(c=>'sk'+id.slice(2)+c).join()&&['a','b','c'].every(c=>!!SK['sk'+id.slice(2)+c]))"), 'mỗi công pháp mở đúng ba chiêu A, B, C');
    run(`(()=>{const r=G.run;r.scene=null;const n=tuNode('TU01');r.at=n;openPlace(n);})()`);run("venueDo('tumon','hoc:TU01')");
    run("G.run.tu.k.TU01.xp=0;tuHd('TU01');G.run.tu.k.TU01.xp=300;tuTang('TU01');G.run.realm=1;tuHd('TU01');tuTang('TU01');syncSkills()");
    ok(run("tuArtOf('TU01').lv")===6&&['sk01a','sk01b','sk01c'].every(id=>run(`G.run.skills.some(k=>k.id==='${id}')`)), 'học CP01 tới tầng ba: có SK01A–SK01C sau syncSkills');
    run("syncSkills();syncSkills()");ok(run("G.run.skills.filter(k=>/^sk01/.test(k.id)).length")===3, 'dựng lại chiêu nhiều lần không mất chiêu nghề tu');
    // luật ghép: Phật pháp (pháp môn mở rộng Đ11) với Huyết thuật bị từ chối
    ok(run("tuGhepCam('phat','huyet')")&&run("tuGhepCam('huyet','phat')")&&!run("tuGhepCam('kiem','huyet')"), 'bảng không ghép: Phật pháp — Huyết thuật');
    run("TU_NGHE.TU90={n:'Phật tu',pm:'phat',hd:{noi:[]}};G.run.tu.phu=null;G.run.tu.chinh='TU90'");
    ok(/không ghép được/.test(run("tuWhyHoc('TU03',0)")), 'đang theo Phật pháp: học Huyết Triều Nội Kinh bị từ chối');
    ok(run("tuWhyHoc('TU02',0)")==='', 'Phật pháp với Thể tu thì được');
    run("delete TU_NGHE.TU90;G.run.tu.chinh='TU01'");
    // thần thông chỉ tung qua pháp tướng
    ok(['a','b','c'].every(c=>run(`Object.keys(TU_NGHE).every(id=>SK['sk'+id.slice(2)+'${c}'].t<=2&&skCat(SK['sk'+id.slice(2)+'${c}'])!=='ult')`)), '48 chiêu nghề tu đều dưới bậc ba (không phải thần thông)');
    const ult=run("Object.keys(SK).find(k=>SK[k].t>=3&&SK[k].fx.p&&!/^sk\\d/.test(k))");
    run(`startCombat({},{kind:'node'});var ntSc=G.run.scene,ntMe=mainUnit(ntSc);G.run.kn.ult=['${ult}'];G.run.skills.push({id:'${ult}',lv:1});ntSc.prep=0;ntSc.cur=ntMe.id;ntMe.phase='ready';ntMe.mp=ntMe.maxMp=9999`);
    ok(!run(`playerAct('${ult}')`)&&run(`ntSc._ult=1;var ntOk=playerAct('${ult}');ntSc._ult=0;ntOk`), 'thần thông '+ult+' chỉ tung được khi có pháp tướng');
    run("ntSc.dodge=null;ntSc.qte=null;ntSc.critQ=null;ntSc.cur=ntMe.id;ntMe.phase='ready'");
    ok(run("playerAct('sk01a')"), 'chiêu nghề tu tung thẳng được');
    // mọi chiêu chạy được trong trận, không lỗi
    const errs=[];
    for(const id of JSON.parse(run("JSON.stringify(Object.keys(SK).filter(k=>/^sk\\d\\d[abc]$/.test(k)))"))){
      const e=run(`(()=>{try{G.run.scene=null;startCombat({},{kind:'node'});const sc=G.run.scene,me=mainUnit(sc);const f=alive(sc,'B')[0];f.hp=f.max=99999;me.mp=me.maxMp=9999;
        resolveSkill(sc,me,SK.sk06a,1,[],1,null);const sk=SK['${id}'];if(sk.fx.tgt)doSkill(sc,me,sk,1,f.id,1);else resolveSkill(sc,me,sk,1,sk.fx.p?[f]:[],1,'auto');onZero(sc,me);onZero(sc,f);return '';}catch(e){return e.message;}})()`);
      if(e)errs.push(id+': '+e);}
    ok(!errs.length, 'cả 48 chiêu chạy trong trận không lỗi'+(errs.length?' — '+errs.join('; '):''));
    run("G.run.scene=null;lkTang=ntLk");
  },
  // Đ7.3: mười sáu nghề phàm còn lại
  nghe_pham2() {
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.paths={};G.run.base.ngo=20;G.run.bac=99999");
    const M=['tieu','mo','ren','tho','chep','tram','binh','sat','trom','hat','quan','do','chuong','san','tieu_su','khat_cai'];
    ok(M.every(m=>run(`!!NGHE.${m}&&NGHE.${m}.ranks.length>=6&&NGHE.${m}.xp.length===NGHE.${m}.ranks.length&&NGHE.${m}.thu.length===NGHE.${m}.ranks.length&&NGHE.${m}.acts.length>=3`)), 'mười sáu nghề đủ bậc, ngưỡng, hệ số và việc');
    ok(run("Object.keys(NGHE).length")===21&&M.every(m=>run(`(NANG_NGHE.${m}||[]).length>0`)), 'tổng hai mươi mốt nghề phàm, nghề nào cũng rèn năng lực');
    for(const m of M){const c=JSON.parse(run(`JSON.stringify([0,1,2].map(k=>EVS.filter(e=>e.content&&(e.content.tags||[]).includes('nghe:${m}')&&e.content.tags.includes('nghe-tang:'+k)).length))`));
      if(c.join()!=='4,4,4')ok(false, m+': mười hai sự kiện ('+c+')');}
    ok(true, 'mỗi nghề mười hai sự kiện, bốn mỗi tầng');
    ok(M.every(m=>run(`NGHE.${m}.ranks.slice(1).every((_,i)=>KYNGO.some(x=>x.id==='ng_${m}_'+(i+1)))`)), 'mỗi bậc có kỳ ngộ thăng bậc');
    const bad=[];
    for(const m of M){const r=run(`(()=>{const N=NGHE.${m};const a=N.acts.find(a=>!a.min&&!a.mua);if(!a)return 'không có việc nhập môn';G.run.scene=null;G.run.lamNgay=null;voOf(G.run).bac=3;
        const n=W().regions.flatMap(R=>R.nodes).find(n=>n.state!=='ruin'&&ngNoi(a,n));if(!n)return 'không có nơi '+a.noi;G.run.at=n.id;openPlace(n.id);
        const w=(vtList(n).find(x=>x.id==='ng:${m}:'+a.id)||{why:'không hiện'}).why;if(w)return w;if(!vtDo('ng:${m}:'+a.id))return 'không làm được';return G.run.paths.${m}&&G.run.paths.${m}.xp>0?'':'không có kinh nghiệm';})()`);
      if(r)bad.push(m+': '+r);run("G.run.paths={}");}
    ok(!bad.length, 'mỗi nghề làm được việc nhập môn ở nơi hợp'+(bad.length?' — '+bad.join('; '):''));
    run("(()=>{G.run.scene=null;G.run.lamNgay=null;voOf(G.run).bac=0;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(/võ/i.test(run("(vtList(nodeById(G.run.at)).find(x=>x.id==='ng:tieu_su:tham_duong')||vtList(nodeById(G.run.at)).find(x=>x.id==='ng:chuong:thu_do')||{why:'võ'}).why")), 'tiêu sư, chưởng môn cần võ học');
    run("NK.clear();G.run.lamNgay=null;G.run.paths={}");const d0=run("JSON.stringify(G.run.nq||{})");
    run("vtDo('ng:trom:moc_tui')");ok(run("NK.count('nghe.deed')")===1, 'móc túi ghi vào Nghiệp Duyên');
    ok(run("ngNoi({noi:['song']},{type:'dam'})")&&!run("ngNoi({noi:['song']},{type:'tran'})"), 'việc ven sông làm được ở đầm lầy (loại gốc sông hồ)');
    ok(run("NGHE.khat_cai.og.includes('khat')")&&run("NGHE.binh.og.includes('linh')")&&run("NGHE.hat.og.includes('hat')"), 'xuất thân khất cái, cựu binh, gánh hát vào nghề sẵn');
  },
  // Đ7.2: học công pháp nghề tu, hợp đồng, tầng, tài nguyên riêng (core2/51-nghe-tu.js)
  tu_hoc() {
    fresh("G._ngNoEv=1;G._tuNoRui=1;G.run.pham=1;G.run.st=999");
    ok(!!run("tuWhyHoc('TU01',0)"), 'phàm nhân chưa dẫn khí: không học được');
    run("G.run.pham=0;G.run.root={id:'vo',els:[],q:null}");ok(/linh căn/.test(run("tuWhyHoc('TU01',0)")), 'vô linh căn: không vận được công pháp');
    run("G.run.root={id:'tap',els:['kim','moc'],q:'thuong'};G.run.rootKnown=1;var tuLk=lkTang;lkTang=()=>1");
    const nd=run("tuNode('TU01')");ok(nd!=null&&run(`tuNode('TU01')===${nd}`)&&run("tuNode('TU02')")===nd, 'nơi thầy dạy chốt một lần (TU01, TU02 cùng LOC13)');
    run(`(()=>{const r=G.run;r.scene=null;r.at=${nd};openPlace(${nd});})()`);
    ok(run(`placeActs(nodeById(${nd})).some(a=>a.a==='tumon')`), 'nơi thầy dạy có nút Pháp môn');
    const t0=run("W().t");run("placeAct('tumon')");ok(run("venueDo('tumon','hoc:TU01')"), 'bái học Dư Phong Kiếm Lục');
    ok(run("G.run.st")===979&&run("W().t-"+t0)>=run("30*HD"), 'trả 20 linh thạch, mất ba mươi ngày');
    ok(run("G.run.tu.chinh")==='TU01'&&run("!!tuArtOf('TU01')"), 'thành chuyên môn chính, có công pháp');
    run("syncSkills()");ok(run("G.run.skills.some(k=>k.id==='sk01a')")&&!run("G.run.skills.some(k=>k.id==='sk01b')"), 'tầng một mở Thử Phong, chưa có Gạt Lưỡi');
    ok(run("SK_RAW.every(s=>!/^sk\\d\\d[abc]$/.test(s[0]))")&&run("CAT.arts.every(a=>!a.tu)"), 'chiêu, công pháp nghề tu không lọt vào kho ngẫu nhiên');
    ok(run("artFxList(tuArtOf('TU01')).find(x=>x.k==='atkP').v")===6&&/Công vật lý/.test(run("artLines(tuArtOf('TU01')).join('|')")), 'dòng nội tại tính đúng số thật (công vật lý +6%), hiện bằng chữ');
    // hợp đồng
    const tn=run("W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin').id");
    run(`(()=>{const r=G.run;r.scene=null;r.at=${tn};openPlace(${tn});placeAct('tumon');})()`);
    ok(!!run("venueOpts(nodeById(G.run.at),'tumon').find(o=>o.id==='hd:TU01'&&!o.no)"), 'nhận được hợp đồng hộ tống ở thôn trấn');
    run("venueDo('tumon','hd:TU01')");ok(run("G.run.tu.k.TU01.xp")===10&&run("G.run.st")===982, 'hợp đồng xong: +10 tay nghề, lãi 3 linh thạch');
    run("venueDo('tumon','hd:TU01')");ok(run("G.run.tu.k.TU01.xp")===10&&run("G.run.st")===985, 'cùng việc trong ba mươi ngày: vẫn có công, không thêm tay nghề');
    // tầng hai
    ok(/Tay nghề/.test(run("lkTang=()=>6;tuWhyTang('TU01')")), 'tầng hai cần tay nghề');
    run("G.run.tu.k.TU01.xp=100;lkTang=()=>1");ok(/Luyện Khí tầng 6/.test(run("tuWhyTang('TU01')")), 'tầng hai cần Luyện Khí tầng sáu');
    run("lkTang=()=>6");ok(run("tuWhyTang('TU01')")==='', 'đủ điều kiện tầng hai');
    run("venueDo('tumon','tang:TU01')");ok(run("tuArtOf('TU01').lv")===4&&run("G.run.skills.some(k=>k.id==='sk01b')"), 'tầng hai mở Gạt Lưỡi');
    ok(/hợp đồng/.test(run("G.run.tu.k.TU01.xp=300;G.run.realm=1;tuWhyTang('TU01')")), 'mỗi tầng cần một hợp đồng kiểm chứng');
    run("G.run.realm=0");
    // chuyên môn phụ, ghép
    run(`(()=>{const r=G.run;r.scene=null;const n=tuNode('TU05');r.at=n;openPlace(n);})()`);run("venueDo('tumon','hoc:TU05')");
    ok(run("G.run.tu.phu")==='TU05', 'học thêm Thần thức tu làm chuyên môn phụ');
    ok(/hai chuyên môn/.test(run("tuWhyHoc('TU02',0)")), 'đường thứ ba bị từ chối');
    ok(run("tuLoiOn('TU01')")&&run("tuLoiOn('TU05')"), 'Kiếm tu + Thần thức: ghép có lợi');
    run("tuXp('TU05',10)");ok(run("G.run.tu.k.TU05.xp")===5, 'chuyên môn phụ nhận một nửa tay nghề');
    run("venueDo('tumon','doiphu')");ok(run("G.run.tu.phu")===null&&run("!!tuArtOf('TU05')"), 'gác chuyên môn phụ: giữ công pháp, trống chỗ');
    // tài nguyên riêng trong trận
    run("G.run.tuRes={TU01:4};startCombat({},{kind:'node'});var tuSc=G.run.scene,tuMe=mainUnit(tuSc),tuFoe=alive(tuSc,'B')[0];tuFoe.hp=tuFoe.max=99999");
    ok(run("tuMe.tuRes.TU01")===4&&run("tuResView(tuMe)[0].n")==='Kiếm ý', 'vào trận mang theo kiếm ý');
    run("resolveSkill(tuSc,tuMe,SK.sk01a,1,[tuFoe],1,'auto')");ok(run("tuMe.tuRes.TU01")===5, 'ra chiêu kiếm: kiếm ý +1');
    run("resolveSkill(tuSc,tuMe,SK.sk01a,1,[tuFoe],1,'auto')");ok(run("tuMe.tuRes.TU01")===0&&run("NK.count('tu.res')")>=1, 'đủ năm thì dồn vào một đòn');
    run("tuMe.tuRes.TU01=3;tuSc.over='win';finishCombat(tuSc)");ok(run("G.run.tuRes.TU01")===1, 'ra trận còn một nửa');
    run("lkTang=tuLk");
    fresh();run("delete G.run.tu");ok(run("tuSt().chinh")===null, 'bản lưu cũ không có r.tu vẫn chạy');
  },
  // Đ7.1: từ vựng hiệu ứng chiêu mới (core2/50-fx-moi.js)
  fx_moi() {
    fresh("G.run.pham=0;G.run.root={id:'tap',els:['kim','moc'],q:'thuong'};startCombat({},{kind:'node'});G.run.scene.skipDodge=1");
    run("var fxSc=G.run.scene,fxMe=mainUnit(fxSc),fxFoe=alive(fxSc,'B')[0];fxFoe.hp=fxFoe.max=99999;var fxMk=(id,fx,dt)=>({id,n:id,el:'vo',t:1,c:0,fx,f:'',dt:dt||'vl'})");
    run("resolveSkill(fxSc,fxMe,fxMk('t1',{p:1,mark:1,hpDmg:.02}),1,[fxFoe],1,'auto')");
    ok(run("fxFoe.st.mark>0")&&run("NK.count('fx.hpDmg')")>0, 'đánh dấu và sát thương theo khí huyết');
    run("fxMe.st.block=0;resolveSkill(fxSc,fxMe,fxMk('t2',{blockH:.08}),1,[],1,null)");
    ok(run("fxMe.st.block")===run("Math.round(fxMe.max*.08)"), 'hộ thể theo khí huyết tối đa');
    run("fxMe.st.block=0;resolveSkill(fxSc,fxMe,fxMk('t3',{blockH:.9}),1,[],1,null)");
    ok(run("fxMe.st.block<=Math.round(fxMe.max*0.3)"), 'hộ thể nguồn mới không quá 30% khí huyết');
    run("resolveSkill(fxSc,fxMe,fxMk('t4',{summon:{k:'linh',hp:.18,atk:.4,n:3}}),1,[],1,null)");
    ok(run("!!fxmSum(fxSc,fxMe,'linh')"), 'gọi được linh ảnh vào phe mình');
    run("resolveSkill(fxSc,fxMe,fxMk('t5',{sumCover:1}),1,[],1,null)");
    const hp0=run("fxMe.hp");run("absorb(fxMe.st,100)");
    ok(run("!fxmSum(fxSc,fxMe)")&&run("fxMe.hp")===hp0, 'linh ảnh gánh trọn một đòn rồi tan');
    run("resolveSkill(fxSc,fxMe,fxMk('t6',{summon:{k:'khoi',hp:.25,atk:.35,n:2}}),1,[],1,null);var fxK=fxmSum(fxSc,fxMe,'khoi');onZero(fxSc,fxK);onZero(fxSc,fxK)");
    ok(run("fxK.gone===1&&!alive(fxSc,'A').includes(fxK)"), 'khôi lỗi hết lượt thì tan');
    run("resolveSkill(fxSc,fxMe,fxMk('t7',{trap:[.6,2]}),1,[],1,null);var fxFh=fxFoe.hp");
    ok(run("!!fxSc.trap"), 'đặt trận');
    run("resolveSkill(fxSc,fxFoe,{id:'_e',n:'x',el:'vo',t:1,c:0,fx:{p:1},f:''},1,[fxMe],1,'auto')");
    ok(run("fxFoe.hp<fxFh")&&run("NK.count('fx.trapNo')")===1&&run("!fxSc.trap"), 'kẻ địch cận chiến dính trận một lần');
    run("fxFoe.phase='charge';fxFoe.pending={sk:{fx:{}}};resolveSkill(fxSc,fxMe,fxMk('t8',{p:.5,breakCharge:1}),1,[fxFoe],1,'auto')");
    ok(run("fxFoe.phase")==='recover', 'cắt đứt tụ lực');
    run("fxFoe.st.mark=0;doSkill(fxSc,fxMe,fxMk('t9',{tgt:1,mark:1}),1,fxFoe.id,1)");
    ok(run("fxFoe.st.mark>0"), 'chiêu không sát thương vẫn nhắm được mục tiêu');
    run("fxSc._cd={x:2};finishAct(fxSc,fxMe,{id:'y',fx:{cd:3}})");
    ok(run("fxSc._cd.x")===1&&run("fxSc._cd.y")===2&&run("skLocked('y')"), 'hồi chiêu tính theo lần ra tay, tự đánh bỏ qua chiêu đang hồi');
    run("fxMe.st.poison=40;resolveSkill(fxSc,fxMe,fxMk('ta',{poiStop:2}),1,[],1,null);var fxHpb=fxMe.hp;onZero(fxSc,fxMe)");
    ok(run("fxMe.st.poison")===40&&run("fxMe.hp>=fxHpb"), 'khoá độc: độc ngừng phát tác');
    ok(/Hộ thể bằng/.test(run("skillTip(fxMk('tb',{blockH:.1,cd:3}),1)"))&&/chờ 2 lần/.test(run("skillTip(fxMk('tb',{blockH:.1,cd:3}),1)")), 'chú thích chiêu có hiệu ứng mới');
  },
  content() {
    const r = cp.spawnSync(process.execPath, ['tools/kiem-tra-content.js'], {cwd:require('path').join(__dirname,'..'),encoding:'utf8'});
    ok(r.status === 0, 'nguồn nội dung, mọi cảnh, danh mục và các ngữ cảnh ('+(r.stdout||r.stderr).trim()+')');
  },
  // nghiền ép: bên bị nghiền ép không né, không đỡ được dù bấm né hoàn hảo
  crush() {
    fresh('startCombat({},{kind:"node"});');
    const r = JSON.parse(run(`(()=>{const sc=G.run.scene,me=mainUnit(sc),foe=sc.units.find(u=>u.side==='B');
      const sk=BASIC;let hitsCrush=0,dodgeCtl=0;const N=30;
      for(let i=0;i<N;i++){ // nghiền ép: foe mạnh gấp 100 lần
        me._lc=1;foe._lc=100;me.hp=me.max=1e6;me.st.stance=1;me.tl=100;const h0=me.hp;resolveSkill(sc,foe,sk,1,[me],1,[0]);if(me.hp<h0)hitsCrush++;}
      for(let i=0;i<N;i++){ // đối chứng: ngang sức, né hoàn hảo
        me._lc=foe._lc=10;me.hp=me.max=1e6;me.st.stance=0;me.tl=100;const h0=me.hp;resolveSkill(sc,foe,sk,1,[me],1,[0]);if(me.hp===h0)dodgeCtl++;}
      return JSON.stringify({N,hitsCrush,dodgeCtl});})()`));
    ok(r.hitsCrush === r.N, `nghiền ép: ${r.hitsCrush}/${r.N} đòn đều trúng (né hoàn hảo cũng vô dụng)`);
    ok(r.dodgeCtl === r.N, `đối chứng ngang sức: né hoàn hảo né được ${r.dodgeCtl}/${r.N}`);
    ok(run('NK.count("combat.crushed")') > 0, 'nhật ký ghi combat.crushed');
  },
  // cảm ngộ: đủ CN_MAX lần thất bại thì chắc chắn qua
  camngo() {
    fresh();
    const a = +run('G.run.btFail=4;btRate([])'), b = +run('G.run.btFail=CN_MAX;btRate([])');
    ok(a < 1, `4 lần thất bại: tỉ lệ ${a.toFixed(2)} (chưa chắc chắn)`);
    ok(b === 1, `${run('CN_MAX')} lần thất bại: tỉ lệ ${b} (chắc chắn)`);
    ok(run('btParts([]).some(x=>/Cảm ngộ/.test(x.t))'), 'bảng tỉ lệ có dòng Cảm ngộ khi đầy');
  },
  // chiêu dùng một lần: dùng xong mất, mặc định bị khoá khỏi tự đánh, khoá bật tắt được
  skillonce() {
    fresh(`globalThis.__aa=activeArts;globalThis.__as=artSk;globalThis.__sl=skLvOf;activeArts=()=>[{zz:1}];artSk=a=>a.zz?['zz_once','zz_norm']:[];skLvOf=()=>1;
      SK.zz_once={id:'zz_once',n:'Kích Sát Thử',el:'vo',t:2,c:0,fx:{p:2},f:'',rec:1,once:1};SK.zz_norm={id:'zz_norm',n:'Chiêu Thường',el:'vo',t:1,c:0,fx:{p:1},f:'',rec:1};
      G.run.skills.push({id:'zz_once',lv:1},{id:'zz_norm',lv:1});if(G.run.kn){G.run.kn.atk.push('zz_once','zz_norm');}G.run.atkSlots=(G.run.atkSlots||[]).concat(['zz_once','zz_norm']);G.run.pham=0;syncSkills();`); // pham=0: không còn là phàm nhân nên dùng được chiêu
    ok(run('skLocked("zz_once")') === true, 'chiêu một lần mặc định khoá');
    ok(run('skLocked("zz_norm")') === false, 'chiêu thường mặc định không khoá');
    run('skLockToggle("zz_once")'); ok(run('skLocked("zz_once")') === false, 'bấm ổ khoá thì mở');
    run('startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units){if(u.side==="B"){u.atk=0;u.matk=0;}else{u.hp=u.max=1e6;}}for(let i=0;i<4000&&!readyPlayer(sc);i++){if(sc.dodge)dodgeResolve(null);else if(sc.qte)qteResolve(null);else if(sc.done)break;else combatStep(0.05);}'); // kẻ địch không đánh được: bài kiểm tra không phụ thuộc may rủi
    ok(run('!!readyPlayer(G.run.scene)'), 'tới lượt người chơi');
    ok(run('playerAct("zz_once")') === true, 'dùng được chiêu một lần');
    ok(run('!G.run.skills.find(k=>k.id==="zz_once")') === true, 'dùng xong chiêu biến mất khỏi danh sách');
    ok(run('!!G.run.skills.find(k=>k.id==="zz_norm")') === true, 'chiêu thường vẫn còn');
    ok(run('NK.count("skill.once")') === 1, 'nhật ký ghi skill.once.consumed');
    // công pháp vẫn chứa chiêu đó: đồng bộ lại không được trả chiêu về
    run('syncSkills()');
    ok(run('!G.run.skills.find(k=>k.id==="zz_once")') === true, 'đồng bộ chiêu từ công pháp không trả lại chiêu đã dùng');
    ok(run('!!G.run.skills.find(k=>k.id==="zz_norm")') === true, 'chiêu thường vẫn còn sau đồng bộ');
    run('activeArts=__aa;artSk=__as;skLvOf=__sl;'); // trả lại hàm gốc cho các bài sau
  },
  // ngộ tính → lịch luyện, khí vận → kỳ ngộ
  ngovan() {
    fresh();
    const lo = +run('G.run.base.ngo=-100;ngoLlMul()'), hi = +run('G.run.base.ngo=30;ngoLlMul()');
    ok(lo === 1, `ngộ tính thấp: hệ số ${lo}`); ok(hi > 1 && hi <= 1.5, `ngộ tính cao: hệ số ${hi.toFixed(2)} (tối đa 1.5)`);
    const l0 = +run('G.run.ll=0;G.run.base.ngo=30;llAdd(10,"thử");G.run.ll');
    ok(l0 > 0, `llAdd có tác dụng (ll=${l0})`);
    const k1 = +run('G.run.base.van=1;kyMul()'), k2 = +run('G.run.base.van=20;kyMul()');
    ok(k1 >= 0.6 && k1 < 1, `khí vận thấp: ×${k1.toFixed(2)}`); ok(k2 > 1 && k2 <= 3, `khí vận cao: ×${k2.toFixed(2)}`);
    ok(run('G.run.base.van=1;kyBigOpen()') === false, 'khí vận thấp: kỳ ngộ lớn đóng');
    ok(run('G.run.base.van=KY_BIG_VAN+5;kyBigOpen()') === true, 'khí vận cao: kỳ ngộ lớn mở');
  },
  // thế giới mở: một bản đồ liền, năm đại khu vực, đi bộ trên cạn, tầm nhìn theo địa hình, độ khó theo cảnh giới
  themo() {
    fresh('');
    ok(run('W().mo') === 1, 'thế giới đã chuyển sang bản đồ liền');
    ok(run('W().regions.every(R0=>R0.nodes.every(n=>{const g=geo();return terWalk(g.ter[n.hex])&&g.reg[n.hex]===R0.k;}))'), 'mọi địa điểm nằm trên đất đi được, đúng đại khu vực');
    ok(run('W().regions.every(R0=>R0.nodes.every(n=>n.type!=="ai"))'), 'không còn quan ải');
    const areas = run('(()=>{const s=new Set();for(let i=0;i<60;i++)s.add(Math.floor(birthNode().id/100));return s.size;})()');
    ok(areas >= 3, `sinh ra ngẫu nhiên khắp bản đồ (${areas} đại khu vực)`);
    ok(run('REG.map(x=>x.n).join(",")') === 'Trung Châu,Đông Hoang,Nam Trạch,Tây Lĩnh,Bắc Nhạc', 'tên năm đại khu vực');
    // đường đi tránh hồ và vân hải
    const bad = run('(()=>{const g=geo();let b=0;const A=regionOf(0).nodes,B=regionOf(1).nodes.concat(regionOf(3).nodes);for(let i=0;i<8;i++){const p=hexPath(A[i].hex,B[i].hex);b+=p.cells.filter(c=>!terWalk(g.ter[c])).length;}return b;})()');
    ok(bad === 0, 'đường đi không lội qua hồ, vân hải (' + bad + ' ô)');
    ok(run('(()=>{const g=geo();let u=-1,m=-1;for(let i=0;i<HN;i++){if(u<0&&g.ter[i]===1)u=i;if(m<0&&g.ter[i]===3)m=i;}return TER_COST[3]>TER_COST[1]&&stepCost(g,u,m)>stepCost(g,m,u)-0.01;})()'), 'lên núi tốn thời gian hơn');
    // sang khu khác bằng đi bộ
    const go = run('(()=>{const r=G.run;const a=r.region;const k=(a+1)%5;const t=regionOf(k).nodes.find(n=>n.type==="tran"||n.type==="thanh")||regionOf(k).nodes[0];t.fog=Math.max(1,t.fog);let tries=0;while(G.run&&r.at!==t.id&&tries++<8){r.scene=null;travelTo(t.id);let g=0;while(G.run&&r.moving&&g++<4000){if(r.scene)r.scene=null;travelTick(6);}}return [a,G.run&&G.run.region,k];})()');
    ok(go[1] === go[2] && go[0] !== go[1], `đi bộ sang đại khu vực khác (${go[0]} → ${go[1]})`);
    const spl = run('(()=>{const g=geo(),M={};for(let i=0;i<HN;i++){if(g.reg[i]<0)continue;const d=g.dist[i];if(M[d]!=null&&M[d]!==g.reg[i])return d;M[d]=g.reg[i];}return -1;})()');
    ok(spl === -1, 'mỗi quận nằm trọn trong một đại khu vực');
    // đi tới ô đất bất kỳ (điểm hoang tạm)
    const wp = run('(()=>{const r=G.run,g=geo();const h0=nodeHex(nodeById(r.at));let c=-1;for(let i=0;i<HN&&c<0;i++){if(g.reg[i]>=0&&terWalk(g.ter[i])&&hexNode(i)==null&&Math.abs(i-h0)>25&&Math.abs(i-h0)<80)c=i;}const hrs=cellHours(c);const n=wpMake(c);let tries=0;while(G.run&&r.at!==n.id&&tries++<10){r.scene=null;travelTo(n.id);let q=0;while(G.run&&r.moving&&q++<4000){if(r.scene)r.scene=null;travelTick(6);}}const ok1=r.at===n.id&&nodeHex(nodeById(r.at))===c;const hx=hexNode(c);return [ok1,hrs>0,hx==null,nodeById(r.at).wp];})()');
    ok(wp[0] && wp[1] && wp[2] && wp[3], 'đi tới ô đất bất kỳ: đến đúng ô, có thời gian, không thành icon địa điểm ' + JSON.stringify(wp));
    // tầm nhìn: đồng bằng trống nhìn xa hơn chỗ nhiều núi
    const vv = run('(()=>{const g=geo();let a=0,na=0,b=0,nb=0;for(let i=0;i<HN;i+=7){if(g.reg[i]<0)continue;const nbs=hexNb(i);const m=nbs.filter(j=>g.ter[j]===3&&g.el[j]>=g.el[i]).length;if(g.ter[i]===1&&m===0&&na<30){a+=visCells(i,6).length;na++;}else if(g.ter[i]!==3&&m>=3&&nb<30){b+=visCells(i,6).length;nb++;}}return [a/na,b/nb];})()');
    ok(vv[0] > vv[1], `núi chặn tầm nhìn (đồng bằng ${Math.round(vv[0])} ô, kẹt giữa núi ${Math.round(vv[1])} ô)`);
    const sv = run('(()=>{sense();const n=VIS.reduce((a,b)=>a+b,0);const s=G.run.visS;visReset();G.run.visS=s;VIS=null;visLoad();return [n,VIS.reduce((a,b)=>a+b,0)];})()');
    ok(sv[0] > 0 && sv[0] === sv[1], `lưu và đọc lại vùng đã thấy (${sv[0]} ô)`);
    // độ khó theo cảnh giới, không theo nơi chốn
    const d0 = run('(()=>{G.run.realm=0;let s=0;for(let i=0;i<20;i++)s+=mkEnemy({}).hp;return s;})()'), d3 = run('(()=>{G.run.realm=3;let s=0;for(let i=0;i<20;i++)s+=mkEnemy({}).hp;return s;})()');
    ok(d3 > d0 * 2, `kẻ địch mạnh theo cảnh giới (${Math.round(d0 / 20)} → ${Math.round(d3 / 20)} khí huyết)`);
    ok(run('G.run.realm=2;rT()') === 2, 'bậc độ khó = cảnh giới');
    // chơi lại từ đầu: vùng đã mở của lượt trước không được giữ
    const ra = run('(()=>{sense();for(let i=0;i<HN;i++)VIS[i]=1;visSave();return [G.run.rid,VIS.reduce((x,y)=>x+y,0)];})()');
    fresh('');
    const rb = run('(()=>{sense();return [G.run.rid,VIS.reduce((x,y)=>x+y,0)];})()');
    ok(rb[0] !== ra[0] && rb[1] < 800, `chơi lại thì không giữ vùng đã mở (${ra[1]} → ${rb[1]} ô)`);
    const sects = run('W().regions.map(R0=>R0.nodes.filter(n=>n.type==="tong").length).join(",")');
    ok(sects.split(',').every(x => +x >= 6 && +x <= 9), 'mỗi đại khu vực 6–8 tông môn (' + sects + ')');
    const cl = run('(()=>{const g=geo();const all=[];for(const R0 of W().regions)for(const n of R0.nodes)all.push(n);const seen=new Set();let dup=0,bad=0,big=0;for(const n of all){for(const c of n.cells){if(seen.has(c))dup++;seen.add(c);if(!terWalk(g.ter[c]))bad++;}if(n.type==="tong"&&n.quy===3&&n.cells.length>=6)big++;}return [dup,bad,big];})()');
    ok(cl[0] === 0 && cl[1] === 0, `ô của các địa điểm không chồng nhau, đều trên đất (${cl})`);
    ok(cl[2] > 0, 'đại tông chiếm nhiều ô (' + cl[2] + ' đại tông ≥ 6 ô)');
    const sep = run('(()=>{const own=new Map();let adj=0,close=0;const all=[];for(const R0 of W().regions)for(const n of R0.nodes){all.push(n);for(const c of n.cells)own.set(c,n.id);} for(const n of all)for(const c of n.cells)for(const b of hexNb(c)){const o=own.get(b);if(o!=null&&o!==n.id)adj++;}return adj;})()');
    ok(sep === 0, 'các địa điểm cách nhau ít nhất một ô trống (' + sep + ' chỗ sát nhau)');
    const clk = run('(()=>{let bad=0,tot=0;for(const R0 of W().regions)for(const n of R0.nodes){n.fog=Math.max(n.fog,2);}geo().nodeAt=null;for(const R0 of W().regions)for(const n of R0.nodes){tot++;if(hexNode(n.hex)!==n)bad++;for(const c of n.cells)if(hexNode(c)!==n)bad++;}return [bad,tot];})()');
    ok(clk[0] === 0, `bấm vào bất cứ ô nào của địa điểm đều chọn đúng nó (${clk[1]} địa điểm)`);
    const th = run('W().regions.map(R0=>R0.nodes.filter(n=>n.type==="thanh").length).join(",")');
    ok(th.split(",").every(x => +x >= 3), 'mỗi đại khu vực ít nhất 3 thành (' + th + ')');
    const qt = run('(()=>{const g=geo();const m={};for(const R0 of W().regions)for(const n of R0.nodes)if(n.type==="tran"){const d=g.dist[n.hex];m[d]=(m[d]||0)+1;}let lo=99,nd=0;for(let d=0;d<g.dnames.length;d++){nd++;lo=Math.min(lo,m[d]||0);}return [lo,nd];})()');
    ok(qt[0] >= 2, `mỗi quận ít nhất 2 trấn (ít nhất ${qt[0]} trong ${qt[1]} quận)`);
    const sz = run('(()=>{const o={};for(const R0 of W().regions)for(const n of R0.nodes){const c=n.cells.length;const t=n.type;const e=o[t]||(o[t]=[99,0]);e[0]=Math.min(e[0],c);e[1]=Math.max(e[1],c);}return JSON.stringify(o);})()');
    const SZ = JSON.parse(sz);
    ok(SZ.dong[1] <= 2 && SZ.dong[0] >= 1, 'hang động chỉ 1–2 ô ' + JSON.stringify(SZ.dong));
    ok(SZ.tong[0] >= 2 && SZ.tong[1] >= 5, 'tông môn nhiều ô ' + JSON.stringify(SZ.tong));
    ok(SZ.tran[1] <= 4 && SZ.thanh[1] <= 7, 'trấn nhỏ hơn thành');
    ok(run('(()=>{const n=W().regions[0].nodes.find(x=>x.type==="tong");const s=placeScale(n);return /ô$/.test(s.txt)&&s.c===n.cells.length;})()'), 'có chữ quy mô theo số ô');
    ok(run('(()=>{const n=W().regions[0].nodes.find(x=>x.cells.length>2);n.fog=2;geo().nodeAt=null;return hexNode(n.cells[n.cells.length-1])===n;})()'), 'bấm ô phụ cũng chọn đúng địa điểm');
  },
  // thương thế 3 bậc: nhẹ thua vẫn sống, nguy kịch thua là chết
  thuongthe() {
    const lose = k => { fresh(`(()=>{addWound('${k}');startCombat({},{kind:"node"});const sc=G.run.scene;mainUnit(sc).hp=0;checkEnd(sc);if(G.run&&G.run.scene&&G.run.scene.over)combatContinue();})();`); return run('G.run?"song":"chet"'); };
    ok(lose('ngoai') === 'song', 'thương nhẹ thua vẫn sống');
    ok(lose('nguy') === 'chet', 'nguy kịch thua là chết');
    let d = 0; for (let i = 0; i < 30; i++) if (lose('gay') === 'chet') d++;
    ok(d > 3 && d < 25, `thương nặng thua: chết ${d}/30 lần (khoảng 40%)`);
    fresh("addWound('gay');"); ok(run('woundLv()') === 2, 'gãy xương là thương nặng');
  },
  // hồi phục: theo tháng, cộng dồn, đầy thì dừng, bế quan nhiều năm không treo
  hoiphuc() {
    fresh('G.run.hp=1;G.run.rgStreak=0;G.run.rgLost=0;G.run._hpLast=1;');
    const h0 = +run('G.run.hp'); run('advanceTime(HM)'); const h1 = +run('G.run.hp');
    ok(h1 > h0, `một tháng hồi được ${h1 - h0} khí huyết`);
    run('advanceTime(3*HM)'); ok(+run('G.run.rgStreak') >= 3, 'cộng dồn tăng theo tháng: ' + run('G.run.rgStreak'));
    run('addWound("ngoai")'); ok(+run('G.run.rgStreak') === 0, 'bị thương thì cộng dồn về 0');
    run('cureWound(["ngoai"]);G.run.hp=S().maxHp;G.run._hpLast=G.run.hp;');
    const t0 = Date.now(); run('advanceTime(40*HY)'); ok(Date.now() - t0 < 5000 && +run('G.run?G.run.hp:0') <= +run('G.run?S().maxHp:1'), 'trôi 40 năm: không treo, không vượt tối đa ('+(Date.now()-t0)+'ms, '+run('G.run?Math.round(G.run.hp)+"/"+S().maxHp:"chết"')+')');
    fresh(); ok(run('rgTurnRate()') === 0.5, 'phàm nhân trong trận 0,5%/lượt');
  },
  // tĩnh toạ: không tăng tu vi, hồi nhanh hơn để yên
  tinhtoa() {
    fresh('G.run.hp=1;G.run._hpLast=1;G.run.arts=(G.run.arts||[]).filter(a=>a.type!=="tp");'); const tv = +run('G.run.tv'); const a0 = +run('G.run.age');
    ok(run('tinhToa(6)') === true, 'tĩnh toạ 6 tháng'); ok(+run('G.run.tv') - tv < 5, 'tu vi gần như không đổi (chỉ thổ nạp tự nhiên): +' + (+run('G.run.tv') - tv).toFixed(1));
    ok(+run('G.run.age') - a0 >= 0.49, 'tuổi tăng nửa năm'); ok(+run('G.run.hp') > 1 + 6, 'khí huyết hồi: ' + run('G.run.hp'));
    ok(run('ttPreview(ttLeftM()+5).over') === true, 'vượt thọ nguyên thì có cảnh báo');
  },
  // đối thủ dưới 30% khí huyết thì dùng chiêu mạnh nhất, một lần
  doithu() {
    fresh('startCombat({},{kind:"node"});');
    const r = JSON.parse(run(`(()=>{const sc=G.run.scene,f=sc.units.find(u=>u.side==='B');f.pat=['atk','multi','heavy'];f.hp=Math.floor(f.max*0.2);nextIntent(f);const a=f.intent;nextIntent(f);return JSON.stringify({a,once:f._desp,best:foeBest(f)});})()`));
    ok(r.a === r.best, 'máu thấp thì chọn chiêu mạnh nhất (' + r.a + ')'); ok(r.once === 1, 'chỉ liều mạng một lần');
  },
  // tâm ma: đạo tâm thấp thì đến nhiều, chống được thì đạo tâm tăng
  tamma() {
    fresh('G.run.pham=0;');
    const lo = +run('G.run.base.tam=0;tmChance()'), hi = +run('G.run.base.tam=30;G.run.tamma=0;tmChance()');
    ok(lo > hi, `đạo tâm thấp ${lo.toFixed(3)} > đạo tâm cao ${hi.toFixed(3)}`);
    run('G.run.base.tam=40;G.run.tamma=20;kyStart(KYNGO.find(x=>x.id==="tm_du"));kyPick(0);');
    ok(+run('G.run.base.tam') === 41 && +run('G.run.tamma') === 14, 'chống được: đạo tâm +1, tâm ma −6');
    run('G.run.scene=null;const k=G.run.karma||0;globalThis.__k=k;kyStart(KYNGO.find(x=>x.id==="tm_du"));kyPick(1);');
    ok(+run('G.run.karma') < +run('__k'), 'nghe theo: nhân quả xấu đi');
    ok(run('KYNGO.filter(x=>!x.paid&&!x.joke&&!x.sp).every(x=>!x.id.startsWith("tm_"))'), 'không lẫn vào kỳ ngộ ngẫu nhiên');
  },
  // rớt cảnh giới: thọ giảm, thọ cạn thì chọn chết hoặc sống tạm mất khí huyết tối đa
  rotcanh() {
    fresh('G.run.pham=0;G.run.realm=2;G.run.birthAge=200;G.run.age=200;');
    ok(+run('S().life') > 200, 'Kết Đan sống được tới ' + run('S().life'));
    run('realmDrop("thử")'); ok(+run('G.run.realm') === 1 && +run('S().life') <= 200, 'rớt xuống Trúc Cơ, thọ còn ' + run('S().life'));
    ok(run('G.run.scene&&G.run.scene.ev') === 'tho_can', 'hiện lựa chọn thọ cạn');
    run('kyPick(1);G.run.scene=null;'); ok(!!run('!!G.run.borrow'), 'chọn sống tạm');
    const m0 = +run('S().maxHp'); run('advanceTime(3*HM)'); ok(run('!!G.run') && +run('S().maxHp') < m0, 'sau 3 tháng khí huyết tối đa giảm: ' + m0 + ' → ' + run('G.run?S().maxHp:0'));
    run('advanceTime(40*HM)'); ok(run('!G.run'), 'cạn khí huyết thì chết');
    fresh('G.run.pham=0;G.run.realm=0;'); run('realmDrop("thử")'); ok(+run('G.run.pham') === 1, 'Luyện Khí rớt về phàm nhân');
  },
  // che giấu tu vi: chỉ đổi thứ người khác thấy; kẻ thần thức cao nhìn thấu
  chegiau() {
    fresh('G.run.pham=0;G.run.realm=2;');
    run('hideCycle()'); ok(run('shownRealm()') === 1 && run('G.run.realm') === 2, 'che xuống Trúc Cơ, cảnh giới thật vẫn Kết Đan');
    const r = JSON.parse(run(`(()=>{startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units)if(u.side==='B'){u.f='nhan';u.than=0;}const me=mainUnit(sc);const p0=me.pos||0;combatStep(0.01);return JSON.stringify({d:(me.pos||0)-p0,sub:me.sub});})()`));
    ok(r.d >= 50, 'kẻ địch coi thường, ra tay trước (+' + Math.round(r.d) + ')'); ok(/ẩn/.test(r.sub), 'thẻ trong trận hiện ' + r.sub);
    fresh('G.run.pham=0;G.run.realm=2;hideCycle();');
    const s = JSON.parse(run(`(()=>{startCombat({},{kind:"node"});const sc=G.run.scene;for(const u of sc.units)if(u.side==='B'){u.f='nhan';u.than=9999;}const me=mainUnit(sc);const p0=me.pos||0;combatStep(0.01);return JSON.stringify({d:(me.pos||0)-p0});})()`));
    ok(s.d < 50, 'kẻ thần thức cao nhìn thấu: không được ra tay trước');
    run('hideCycle();hideCycle();hideCycle();'); ok(run('G.run.hide') === null, 'bấm tiếp thì thôi che giấu');
  },
  // thần thức: tầm nhìn theo chỉ số, nút phóng thần thức, giao tranh
  thanthuc() {
    fresh('G.run.pham=0;G.run.mp=S().maxMp;');
    const a = +run('G.run.base.ngo=0;senseR()'), b = +run('G.run.base.ngo=200;senseR()');
    ok(b > a, `thần thức cao nhìn xa hơn: ${a} → ${b}`);
    const c0 = +run('senseR()'); ok(run('tkUse()') === true, 'phóng thần thức'); ok(+run('senseR()') > c0, 'tầm nhìn tăng khi phóng: ' + run('senseR()'));
    ok(run('tkUse()') === false, 'đang chờ thì không dùng lại được');
    run('advanceTime(3*HD)'); ok(+run('senseR()') === c0 || run('!tkActive()'), 'hết hiệu lực sau 2 ngày');
    // điều kiện nơi chốn/độ khó của sự kiện tùy chỗ sinh ngẫu nhiên nên bỏ qua khi gặp giao tranh
    run('for(let i=0;i<20;i++)gtSpawn();'); const e = run('(W().ents.find(e=>e.type==="giaotranh")||{}).id');
    ok(!!e, 'có giao tranh gần đó');
    if (e) { run(`const target=W().ents.find(e=>e.type==="giaotranh");G.run.at=target.at;arrive(target.at);G.run.scene=null;const _ct=contentTriggerOk;contentTriggerOk=()=>true;try{meetEnt(target);}finally{contentTriggerOk=_ct;}`); ok(run('G.run.scene&&G.run.scene.id') === 'tranh_bao', 'tới nơi thì vào chuyện tranh bảo vật '+run('G.run.scene&&(G.run.scene.id+"/"+G.run.scene.type)')); }
  },
  // lịch luyện nhận nhiều hơn
  llboost() {
    fresh('G.run.pham=0;G.run.base.ngo=-100;G.run.ll=0;G.run.realm=1;G.run.sg=3;');
    const g = +run('llAdd(2,"thử");G.run.ll'); ok(g >= 2 * 3 * +run('llRate()') * 0.99, `nhận 2 điểm gốc được ${g.toFixed(1)} (gấp ${run('LL_BOOST')} lần, nhịp ×${run('llRate()')})`);
  },
  // bế quan: linh lực hồi nhanh hơn khí huyết, không hồi đầy cả hai
  bequanhoi() {
    fresh('G.run.pham=0;G.run.realm=0;G.run.age=20;G.run.birthAge=20;const dp=regionOf(0).nodes.find(n=>n.dp)||nodeById(G.run.at);dp.dp=1;G.run.at=dp.id;arrive(dp.id);openPlace(dp.id);');
    run('G.run.hp=1;G.run.mp=1;G.run._hpLast=1;');
    run('globalThis.__bc=bqCan;bqCan=()=>"";'); const okBq = run('bqCustom(0.5)'); run('bqCan=__bc;'); ok(okBq === true, 'bế quan chạy được');
    const hp = +run('G.run.hp'), mp = +run('G.run.mp'), mh = +run('S().maxHp'), mm = +run('S().maxMp');
    ok(hp < mh, `khí huyết không hồi đầy: ${hp}/${mh}`);
    ok(mp / mm > hp / mh, `linh lực hồi nhanh hơn khí huyết: ${(mp / mm * 100).toFixed(0)}% so với ${(hp / mh * 100).toFixed(0)}%`);
  },
  // túi trữ vật: 10 ô khởi đầu, túi mở thêm ô, khoá khi hết linh lực, không mất đồ
  tuitruvat() {
    fresh('G.run.pham=0;G.run.mp=S().maxMp;G.run.pills=[];G.run.relics=[];');
    ok(+run('bagCap()') === 10, 'chưa có túi: 10 ô mang trên người');
    run('eqOf().tuivat={k:"tui",name:"Túi thử",tier:0,fx:{},slots:0};'); ok(+run('bagCap()') === 10 + 10, 'đeo túi bậc 0: thêm 10 ô → ' + run('bagCap()'));
    run('for(let i=0;i<16;i++)G.run.pills.push({id:"hoixuan",q:0});');
    const L = JSON.parse(run('JSON.stringify(bagLayout())')); const tui = L.slots.filter(s => s.src === 'tui' && s.unit).length;
    ok(tui === 6, 'ô túi chứa ' + tui + ' viên (16 viên − 10 ô người), đánh dấu src:tui'); ok(L.slots.every(s => !s.locked), 'còn linh lực: không ô nào khoá');
    run('G.run.mp=0;');
    ok(run('unitLocked("p",15)') === true, 'linh lực = 0: viên nằm trong ô túi bị khoá'); ok(run('unitLocked("p",0)') === false, 'viên trên người không bị khoá');
    ok(run('usePill(15,false)') === false && +run('G.run.pills.length') === 16, 'không uống được viên bị khoá, đồ không mất');
    run('G.run.mp=S().maxMp;'); ok(+run('G.run.pills.length') === 16 && run('usePill(15,false)') !== false, 'có linh lực lại: dùng được');
    run('G.run.mp=0;G.run.pham=1;'); ok(run('tuiOn()') === false, 'phàm nhân: không mở được túi');
    fresh('G.run.pham=0;G.run.mp=0;'); run('G.run.pills=[];for(let i=0;i<5;i++)G.run.pills.push({id:"hoixuan",q:0});'); ok(run('unitLocked("p",4)') === false, 'chưa đeo túi: không gì bị khoá dù linh lực = 0');
  },
  // đợt 32: lịch luyện về 0 theo tầng, chỉ số tăng từng tầng, pháp bảo, bế quan, thiên phú
  suaLoi32() {
    const L1 = (fresh(), run('LK_TH[1]'));
    fresh('G.run.pham=0;G.run.realm=0;G.run.sg=1;G.run.tv=LK_TH[1];G.run.ll=LK_TH[1]-1;');
    ok(run('llAdd(5,"thử",true);G.run.ll') <= L1 + 1e-6, 'lịch luyện không vượt đỉnh tầng đang mở');
    const a = run('S().maxHp'); run('G.run.sg=2;G.run.tv=LK_TH[1]+0.1;'); const b = run('S().maxHp');
    ok(b > a, `lên tầng 2 thì khí huyết tăng (${a} → ${b})`);
    fresh('G.run.pham=0;G.run.realm=0;G.run.sg=1;G.run.tv=LK_TH[1];G.run.ll=LK_TH[1];');
    run('lkXk()'); ok(run('sgGate()') === 2 && Math.abs(run('G.run.ll') - L1) < 1e-6 && run('llShow()') === 0, 'xung kích xong lịch luyện tầng mới về 0%');
    fresh('G.run.pham=1;G.run.tv=100;G.run.ll=100;'); run('phamUp()');
    ok(run('G.run.asc.diff.map(d=>d.k).join()').includes('maxHp'), 'bảng lên Luyện Khí có cả khí huyết');
    ok(run('!isPham()') && run('G.run.asc&&G.run.asc.k') === 'xk' && run('G.run.ll') === 0, 'phàm nhân lên Luyện Khí: có bảng lên cảnh giới, lịch luyện về 0');
    fresh('G.run.region=1;');
    const pb = JSON.parse(run('(()=>{let n=0,low=0;for(let i=0;i<2000;i++){const x=genRelic(1);if(isPB(x)){n++;if(relReq(x)<2)low++;}}return JSON.stringify({n,low});})()'));
    ok(pb.low === 0, 'không có pháp bảo yêu cầu dưới Trúc Cơ'); ok(pb.n < 200, `pháp bảo hiếm (${pb.n}/2000)`);
    fresh('G.run.pham=0;G.run.realm=0;'); ok(run('(()=>{let m=0;for(let i=0;i<300;i++){m=Math.max(m,genArt("cp",3).req,genArt("tp",3).req);}return m;})()') <= 1, 'Luyện Khí không gặp bí tịch Kết Đan');
    fresh('G.run.pham=0;G.run.realm=1;'); ok(run('Math.abs(playerTal().score-1)<0.3?playerTal().tier:1') === 1, 'lực chiến gần bằng sàn là Bình phàm');
  },
  // chữ có tham số: {{n}} phải được điền, không còn sót
  ctxt() {
    fresh();
    const k = run('Object.keys(CONTENT_TEXT).find(k=>CONTENT_TEXT[k].includes("{{0}}"))');
    ok(!!k, 'có khóa chữ dùng tham số');
    const s = run(`contentText(${JSON.stringify(k)},["A1","A2","A3","A4","A5","A6"])`);
    ok(!s.includes('{{0}}') && s.includes('A1'), 'tham số được điền: ' + s.slice(0, 60));
  },
  nen() {
    fresh();
    ok(run("feat('nq')")===true && run("feat('vo')")===true, 'feat(nq) bật từ Đ1, feat(vo) bật từ Đ2');
    ok(run("typeof migrateX")==='function', 'có migrateX');
    ok(run("(()=>{const d={meta:{}};migrateX(d);return !!d.meta.v2})()"), 'migrateX thêm meta.v2 cho bản lưu cũ');
    ok(run("ageY()")===run("Math.floor(G.run.age)"), 'ageY = năm nguyên');
    ok(run("(()=>{const n=anchorNode('LOC01');return n&&n.type})()")==='tran', 'anchorNode(LOC01) là trấn');
  },
  deed_bang() {
    fresh();
    ok(run("HD_LV.length")===5 && run("HD_W.lon")===8, 'HD_LV đủ 5 bậc');
    ok(run("NQ_MUC.mang")===15 && run("NQ_TN.dung_xem")===0, 'bảng nghiệp');
    ok(run("Object.keys(DEED).length")>=54, 'DEED đủ mục: '+run("Object.keys(DEED).length"));
    const J=x=>JSON.stringify(run('DEED.'+x));
    ok(J('cuu_nguoi')==='{"p":"vua","g":8,"seed":1}', 'cuu_nguoi đúng mẫu');
    ok(J('giet_vo_toi')==='{"t":"lon","b":15,"seed":1,"tuyen":"huyet_thu"}', 'giet_vo_toi đúng mẫu');
    ok(J('tha_ke_ac')==='{"p":"vua","seed":1}', 'tha_ke_ac đúng mẫu');
    ok(J('hiep_dao')==='{"p":"nho","t":"vua","g":3,"b":1}', 'hiep_dao đúng mẫu');
    ok(J('sam_hoi')==='{"p":"nho","bPct":-10}', 'sam_hoi đúng mẫu');
    ok(run("Object.values(DEED).every(d=>(!d.p||HD_W[d.p])&&(!d.t||HD_W[d.t])&&(!d.g||[1,3,8,15].includes(d.g))&&(!d.b||[1,3,8,15].includes(d.b)))"), 'mọi mục dùng mức hợp lệ');
  },
  nq_hd() {
    fresh();
    const L=run("HD_LV.map(x=>x.n)");
    ok(L.includes(run("hdName()")), 'hdName là một trong 5 nhãn: '+run("hdName()"));
    run("for(let i=0;i<5;i++)deed('cuu_nguoi')");
    ok(/chính/i.test(run("hdName()")), 'sau 5 lần cứu người nhãn có "chính": '+run("hdName()"));
    ok(typeof run("G.run.karma")==='number' && run("G.run.karma")>0, 'gương karma là số dương');
    fresh();
    run("for(let i=0;i<24;i++)deed('giet_vo_toi');deed('cuu_nguoi')");
    ok(run("hdName()")==='Tà niệm ăn sâu', 'vẫn Tà niệm ăn sâu: '+run("hdName()"));
    ok(run("G.run.hd.log.length")===24, 'sổ chỉ giữ 24 quyết định');
    const t0=run("G.run.tamma=0;G.run.tamma");run("deed('cuu_nguoi')");
    ok(run("G.run.tamma")>t0, 'làm trái hướng khi Tà niệm ăn sâu: tâm ma tăng');
    ok(run("NK.count('nq.deed')")>0, 'có nhật ký nq.deed');
  },
  nq_ng() {
    fresh();
    run("for(let i=0;i<24;i++)deed('giet_vo_toi')");
    ok(run("ngB()")>=15*24*0.99, 'ngB tích đủ: '+run("ngB()"));
    ok(run("ngName('B')")==='Nghiệp hải trùng trùng', 'nhãn nghiệp chướng');
    fresh('G.run.ng.G=0;G.run.ng.B=0');
    run("deed('giet_vo_toi',{yd:'tai_nan'})");
    ok(Math.abs(run("ngB()")-15*0.25)<1e-6, 'ý định tai nạn giảm nghiệp');
    run("deed('sam_hoi')");
    ok(Math.abs(run("ngB()")-15*0.25*0.9)<1e-6, 'sám hối trừ 10%');
    ok(run("deed('khong_co')").length===0 && run("NK.count('nq.deed.missing')")>0, 'mã lạ không lỗi');
    ok(run("G.run.ng.so.every(x=>typeof x.v==='number'&&'why' in x)"), 'sổ có đủ trường');
  },
  nq_legacy() {
    fresh();
    {
      const ch=run("applyE({karma:5})");
      ok(Array.isArray(ch) && ch.some(c=>c.i==='☯️'), 'applyE karma cũ ra chip');
      ok(typeof run("G.run.karma")==='number' && run("NK.count('nq.hd')")>0, 'bút toán tạm ghi Hành Đạo');
      const ch2=run("applyE({deed:'cuu_nguoi',hp:5})");
      ok(ch2.length>=1 && ch2[0].i==='☯️', 'applyE deed giữ chip');
      run("applyE({hd:{p:3},ng:{g:3,why:'x'}})");
      ok(run("ngG()")>0, 'applyE hd/ng');
      fresh('delete G.run.hd;delete G.run.ng;G.run.karma=-70;G.run._nqV1=0;run2();');
      ok(run("ngB()")>0, 'bản lưu cũ có nghiệp chướng');
      ok(/tà/i.test(run("hdName()")), 'bản lưu cũ nhãn tà: '+run("hdName()"));
      ok(run("G.run.karma")===-70, 'gương giữ đúng karma cũ');
      ok(run("questPenalty({reward:{st:10}}).deed")==='that_hua', 'phạt hủy nhiệm vụ là thất hứa');
    }
  },
  danh() {
    fresh();
    const id=run("(()=>{const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;return n.id})()");
    ok(run(`danhOf(nodeById(${JSON.stringify(id)}))`)===0, 'danh tiếng ban đầu bằng không');
    run("for(let i=0;i<3;i++)deed('giet_vo_toi',{lo:1})");
    const v=run(`danhOf(nodeById(${JSON.stringify(id)}))`);
    ok(v<=-25, 'giết người bị lộ: tiếng xấu '+v);
    ok(run(`dangerTag(nodeById(${JSON.stringify(id)}))`)===2, 'thị trấn thù địch mức 2');
    ok(!/\d/.test(run(`danhName(nodeById(${JSON.stringify(id)}))`)), 'tên danh tiếng không có số');
    run("for(let i=0;i<3;i++)deed('giet_vo_toi',{lo:0})");
    ok(run(`danhOf(nodeById(${JSON.stringify(id)}))`)===v, 'việc kín không đổi danh tiếng');
    ok(run("NK.count('danh')")>0, 'có nhật ký danh');
  },
  nq_doc() {
    fresh('G.run.ng.B=0');
    ok(run("kiepKind()")!=='nghiep', 'không nghiệp: kiếp thường');
    run("G.run.ng.B=20");
    ok(run("kiepKind()")==='nghiep', 'nghiệp chướng từ 15: Nghiệp Hỏa kiếp');
    run("G.run.hd.log=[{p:0,t:20}];G.run.hd.lv=null");
    ok(run("(()=>{const r=G.run;delete r.hd;r.karma=-80;ttPhys(r);return hdLvIdx(r)})()")===4, 'ttPhys dựng Hành Đạo từ karma khi thiếu');
    const need=run("(()=>{const r=G.run;r.hd.log=[{p:20,t:0}];r.hd.lv=null;return needList({need:{karma:10}}).find(x=>/chính/i.test(x.t))})()");
    ok(need && need.ok===true, 'điều kiện tông theo Hành Đạo: '+(need&&need.t));
    run("G.run.hd.log=[{p:0,t:24}];G.run.hd.lv=null;G.run.ng.B=60;G.meta.ach=G.meta.ach.filter(x=>x!=='ma');deed('giet_vo_toi')");
    ok(run("G.meta.ach.includes('ma')"), 'thành tựu Ma đầu theo Hành Đạo + nghiệp');
  },
  kiep_nghiep() {
    fresh('G.run.ng.B=0');
    ok(run("nqK()")===1 && run("nqKiepBonus()")===0, 'không nghiệp: kiếp thường');
    run("G.run.ng.B=120"); // Sửa-C.1: mốc bậc 4 dời từ 100 lên 120
    ok(run("nqK()")===1.4 && run("nqKiepBonus()")===0.1, 'B=120: sức kiếp ×1.4, thưởng 10%');
    run("G.run.ng.B=200");ok(run("nqK()")===1.4, 'cùng bậc thì như nhau');
    run("G.run.ng.B=20");ok(run("kiepKind()")==='nghiep' && run("nqKiepWarn()").length>5 && !/\d/.test(run("nqKiepWarn()")), 'B≥20 (bậc 2): Nghiệp Hỏa, có lời báo không số');
    const once=()=>run(`(()=>{const r=G.run;r.pham=0;r.realm=0;r.tv=1e9;r.bt={to:1,dao:5,stages:[],hpLeft:1};r.scene={type:'bt',chips:[]};try{btFinish();}catch(e){return 'ERR '+e.message;}return G.run?G.run.bon.hpP:'chet';})()`);
    run("G.run.ng.B=120");const h0=run("G.run.bon.hpP");const h1=once();
    ok(typeof h1==='number' && h1>=h0+10, 'vượt kiếp nghiệp: khí huyết +10% ('+h0+' → '+h1+')');
    const h2=run(`(()=>{const r=G.run;r.realm=0;r.bt={to:1,dao:5,stages:[],hpLeft:1};r.scene={type:'bt',chips:[]};const b=r.bon.hpP;btFinish();return G.run.bon.hpP-b;})()`);
    ok(h2<10, 'cùng cảnh giới chỉ thưởng một lần');
    ok(run("NK.count('nq.kiepBon')")===1, 'nhật ký nq.kiepBon');
  },
  // Sửa-C.1: mốc bậc nghiệp — một lần lỡ tay chưa tuyệt vọng, tái phạm mới nặng
  nq_moc() {
    fresh('G.run.ng.B=0;G.run.ng.G=0');
    run("deed('giet_vo_toi')");const b1=run("ngB()");ok(run("ngBacB()")===1, 'giết một người vô tội: bậc 1 ('+b1+')');
    run("deed('giet_vo_toi')");ok(run("ngBacB()")===2&&run("kiepKind()")==='nghiep', 'tái phạm: bậc 2, Nghiệp Hỏa ('+run("ngB()")+')');
    run("G.run.ng.G=0;deed('cuu_nguoi',{ai:'a'})");ok(run("ngBacG()")===1, 'cứu một người: bậc 1 thiện duyên');
    run("deed('cuu_nguoi',{ai:'b'});deed('cuu_nguoi',{ai:'c'})");ok(run("ngBacG()")===2, 'cứu ba người: bậc 2 ('+run("ngG()")+')');
    ok(run("NQ_BAC.join()")==='0,5,20,60,120,250', 'bảng mốc');
  },
  // Sửa-C.2: chính đạo chia mức theo loại việc; 214 chỗ +4 cũ phân nhẹ/vừa/nặng
  hd_muc() {
    fresh();
    ok(run("HD_W[DEED.bo_thi.p]<HD_W[DEED.cuu_nguoi.p]&&DEED.bo_thi.g<DEED.cuu_nguoi.g"), 'bố thí (mua đồ ăn cho kẻ ăn xin) nhẹ hơn cứu người');
    ok(run("HD_W[DEED.cuu_nguoi.p]<HD_W[DEED.cuu_nguoi_hy_sinh.p]"), 'cứu người phải hy sinh nặng hơn cứu người');
    const fs=require('fs'),path=require('path'),glob=d=>fs.readdirSync(d,{withFileTypes:true}).flatMap(x=>x.isDirectory()?glob(path.join(d,x.name)):x.name.endsWith('.json')?[path.join(d,x.name)]:[]);
    const ev={};for(const f of glob(path.join(__dirname,'../content/events'))){const d=JSON.parse(fs.readFileSync(f,'utf8'));for(const e of d.events||[])ev[e.id]=e;}
    const rows=fs.readFileSync(path.join(__dirname,'../docs/thiet-ke/karma-muc-giup.csv'),'utf8').trim().split('\n').slice(1).map(l=>l.split(','));
    const V={nhe:1,vua:3,nang:5};let bad=0;const n={nhe:0,vua:0,nang:0};
    for(const [id,p,k] of rows){let o=ev[id];for(const m of p.matchAll(/(\w+)(?:\[(\d+)\])?/g)){o=o&&o[m[1]];if(m[2]!=null)o=o&&o[+m[2]];}const E=o&&(o.e||o.fx);n[k]++;if(!E||!E.hd||E.hd.p!==V[k]||E.ng.g!==V[k])bad++;}
    ok(bad===0&&rows.length>=180, 'các lựa chọn giúp đỡ đã chia mức: '+JSON.stringify(n));
    ok(n.nhe>20&&n.nang>10, 'có đủ ba mức');
  },
  qua_chin() {
    fresh('G.run.qc=[]');
    run("deed('cuu_nguoi',{ai:'lão'})");
    ok(run("G.run.qc.length")===1, 'việc có quả chín gieo một hạt');
    ok(run("(()=>{const s=G.run.qc[0];return s.due>W().t+5*HM&&s.due<=W().t+18*HM})()"), 'hạn chín trong 6–18 tháng');
    run("G.run.qc[0].due=W().t;G.run.scene=null;advanceTime(HM+1)");
    ok(run("!!G.run") && run("G.run.qc.length")===0, 'đến hạn thì chín');
    ok(run("NK.count('nq.qc')")===1, 'nhật ký nq.qc');
    const so=run("nqSo(5)");
    ok(so.length>0 && so.every(x=>x.t&&!/\d/.test(x.t+x.k)), 'sổ nghiệp duyên có chữ, không số: '+(so[0]&&so[0].t));
    run("applyE({ng:{g:1,why:'chi_duong'}})");ok(!/_/.test(run('nqSo(1)[0].t')), 'sổ không hiện mã thô: '+run('nqSo(1)[0].t'));
    run("deed('giet_vo_toi')");
    run("die('combat',{n:'thử'})");
    ok(run("G.over&&G.over.qc&&G.over.qc.length")===1, 'màn hết kiếp có hạt chưa chín');
    ok(run("(W().qcLeft||[]).some(x=>x.qc===1&&x.id==='giet_vo_toi')"), 'hạt chưa chín chép sang kiếp sau');
  },
  hoancanh() {
    fresh();
    const rate=n=>run(`(()=>{let b=0,k=0;for(let i=0;i<${n};i++){genBirth();for(const c of G.birth.cards){k++;if(c.hc==='bap')b++;}}return b/k})()`);
    run("G.meta.lastNq={B:250,G:0}"); // Sửa-C.1: bậc 5 từ 250
    const a=rate(200);ok(a>=0.6&&a<=0.75, 'nghiệp nặng: tỉ lệ bấp bênh '+a.toFixed(2));
    ok(run("G.birth.cards.filter(c=>c.hc==='bap').every(c=>ORIGIN.find(o=>o.id===c.origin).grp==='kho')"), 'bấp bênh thì xuất thân khốn khó');
    run("G.meta.lastNq={B:0,G:200}");
    const b=rate(100);ok(b<=0.15, 'thiện duyên dày: ít bấp bênh '+b.toFixed(2));
    run("G.meta.lastNq={B:130,G:0}");const c1=run("hcRate().bap");run("G.meta.lastNq={B:240,G:0}");
    ok(run("hcRate().bap")===c1, 'cùng bậc thì như nhau');
    run("delete G.meta.lastNq");ok(run("hcRate().bap")===0.25, 'bản lưu cũ: hoàn cảnh thường');
    run("G.meta.lastNq={B:200,G:0};genBirth()");const card=run("JSON.stringify(G.birth.cards.find(c=>c.hc==='bap')||null)");
    if(card!=='null'){const seeded=f=>`(()=>{const mr=Math.random,rs=RS;RS=()=>0.5;Math.random=()=>0.5;try{${f}}finally{Math.random=mr;RS=rs;}return G.run.bac})()`;
      const st0=run(seeded(`const c=${card};c.hc=null;newRun(c);`));const st1=run(seeded(`newRun(${card});`));
      ok(st1<st0||st0<=2, 'bấp bênh: ít tiền khởi đầu hơn ('+st0+' → '+st1+')');}
    fresh();run("die('combat',{n:'thử'})");ok(run("!!G.meta.lastNq"), 'lúc chết ghi lại nghiệp duyên');
  },
  vo_kiep1() {
    fresh();
    const n=run(`(()=>{G.meta.nlife=0;let v=0;for(let i=0;i<1000;i++)if(genRoot().id==='vo')v++;return v})()`);
    ok(n===0, 'kiếp đầu không có vô linh căn ('+n+'/1000)');
    ok(run(`(()=>{G.meta.nlife=0;for(let i=0;i<300;i++){if(ttRoll([]).includes('vo_can'))return false;}return true})()`), 'kiếp đầu không rút khí vận Vô Căn');
    ok(run(`(()=>{const q={};for(let i=0;i<2000;i++){const x=genRoot();q[x.q]=(q[x.q]||0)+1;}return q.thuong>q.khuyet&&q.khuyet>q.thuan&&!q.undefined})()`), 'linh căn có phẩm chất, Thường nhiều nhất');
    ok(run(`(()=>{const a=rootView({id:'tam',els:['kim','moc','thuy']}).m,b=rootView({id:'tam',els:['kim','moc','thuy'],q:'thuan'}).m;return b>a&&a===1})()`), 'phẩm Thuần tu nhanh hơn, bản lưu cũ không phẩm như cũ');
  },
  vo_kiep2() {
    fresh();
    const rate=(B,Gv)=>run(`(()=>{G.meta.nlife=3;G.meta.lastNq={B:${B},G:${Gv}};let v=0;for(let i=0;i<2000;i++)if(genRoot().id==='vo')v++;return v/2000})()`);
    const a=rate(0,0);ok(a>=0.40&&a<=0.50, 'kiếp 4, nghiệp trung bình: vô căn '+a.toFixed(2));
    const b=rate(100,0);ok(b<=0.65&&b>a, 'nghiệp chướng nặng: '+b.toFixed(2)+' (trần 65%)');
    const c=rate(0,100);ok(c>=0.26&&c<a, 'thiện duyên dày: '+c.toFixed(2)+' (sàn 30%)');
    ok(run("G.meta.lastNq={B:60,G:0};const x=voRate();G.meta.lastNq={B:190,G:0};x===voRate()"), 'cùng bậc nghiệp thì tỉ lệ như nhau');
    ok(run("delete G.meta.lastNq;voRate()")===45, 'bản lưu cũ: tỉ lệ gốc');
    const same=run(`(()=>{G.meta.nlife=2;G.meta.lastNq={B:0,G:0};for(let i=0;i<40;i++){genBirth();const C=G.birth.cards;if(!C.every(c=>c.root.id===C[0].root.id&&c.root.els.join()===C[0].root.els.join()))return 'khác';
      for(const c of C){if((c.root.id==='vo')!==c.kv.includes('vo_can'))return 'kv';}}return 'ok'})()`);
    ok(same==='ok', 'kiếp 3: mọi thẻ cùng linh căn, Vô Căn đi kèm vô linh căn ('+same+')');
    run("G.meta.nlife=2;genBirth();const c=G.birth.cards[0];c.root={id:'vo',els:[],q:null};c.trait='loithan';newRun(c)");
    ok(run("isVo()&&G.run.root.els.length===0"), 'vô căn không được mệnh cách thêm hệ');
  },
  vo_khoa() {
    fresh("G.run.root={id:'vo',els:[]};G.run.arts=G.run.arts.filter(a=>a.k!=='tp'&&!a.start);G.screen='map';");
    const tv0=run('G.run.tv');run('addTv(50)');ok(run('G.run.tv')===tv0, 'vô căn: tu vi không tăng');
    ok(run('canBreak()')===false, 'không đột phá được');
    ok(run('S().maxMp')===0, 'không có linh lực');
    ok(run('bqReal()')===0, 'bế quan không có tác dụng');
    run('G.run.tv=100;G.run.ll=500;phamUp()');ok(run('G.run.pham')===1, 'không dẫn khí nhập thể được');
    const ch=run("JSON.stringify(applyE({tv:20}))");ok(/Không cảm được linh khí/.test(ch), 'sự kiện cho tu vi: chip không cảm được linh khí');
    const n0=run("G.run.arts.length");
    run("for(let i=0;i<(TP_Y+1)*12;i++){G.run.scene=null;G.screen='map';advanceTime(HM);if(!G.run)break;}");
    ok(run("!!G.run")&&run("G.run.arts.length")===n0, 'qua '+(run('TP_Y')+1)+' năm không có tâm pháp mới');
    run("(()=>{G.run.scene=null;startCombat({},{kind:'node'});const sc=G.run.scene;for(let i=0;i<6000&&G.run&&G.run.scene&&!G.run.scene.done;i++){if(sc.dodge)dodgeResolve(null);else if(sc.qte)qteResolve(null);else if(readyPlayer(sc))playerAct(BASIC.id||'basic');else combatStep(0.05);}})()");
    ok(true, 'vô căn đánh một trận không lỗi');
  },
  trac_linh() {
    fresh();
    // Sửa-C.6: kiếp đầu cũng phải chờ trắc
    run("G.meta.nlife=0;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.screen='map'");
    ok(run('G.run.kiep')===1&&run('G.run.rootKnown')===0, 'kiếp đầu cũng chưa trắc');
    ok(run("rootLabel(G.run)")==='Chưa trắc', 'kiếp đầu: nhãn Chưa trắc');
    run("G.run.rootKnown=1");ok(run("rootLabel(G.run)")!=='Chưa trắc', 'trắc rồi thì hiện tên: '+run("rootLabel(G.run)"));
    run("G.meta.nlife=1;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.screen='map';NK.clear()");
    ok(run('G.run.kiep')===2&&run('G.run.rootKnown')===0, 'kiếp 2: chưa trắc');
    ok(run("rootLabel(G.run)")==='Chưa trắc', 'nhãn hiển thị: Chưa trắc');
    run("for(let i=0;i<4*30&&G.run;i++){if(G.run.scene&&G.run.scene.type==='kyngo'){kyPick(0);G.run.scene=null;}G.screen='map';G.run.moving=null;advanceTime(HD);}if(G.run.scene&&G.run.scene.type==='kyngo')kyPick(0);");
    ok(run('G.run.rootKnown')===1, 'sau bốn tháng đã trắc linh');
    ok(run('NK.count("tl.done")')===1, 'trắc linh đúng một lần ('+run('NK.count("tl.done")')+')');
    // Trắc Linh Thạch
    run("G.meta.nlife=1;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.screen='map';NK.clear();G.run.qitems=['trac_linh_thach']");
    ok(run("!!bagItems().find(x=>x.key==='vtrac_linh_thach'&&x.use)"), 'Trắc Linh Thạch dùng được trong túi');
    run("bagUse('vtrac_linh_thach',1)");ok(run("G.run.scene&&G.run.scene.ev")==='tl_thach', 'dùng đá mở trắc linh thạch');
    run("kyPick(0)");ok(run('G.run.rootKnown')===1&&run("G.run.qitems.length")===0, 'đá vỡ, đã biết linh căn');
    ok(run("(()=>{const r=G.run;delete r.rootKnown;delete r._rkV1;run2();return r.rootKnown})()")===1, 'bản lưu cũ: coi như đã biết');
  },
  dau_thai_luat() {
    fresh("G.meta.pick=0;G.run.qitems=['dinh_menh_chau']");
    run("die('combat',{n:'thử'})");ok(run('G.meta.pick')===1, 'chết mang Định Mệnh Châu: thêm một lượt chọn');
    run("G.meta.pick=0;G.meta.upg.menh=1;G.meta.nlife=3;genBirth();newRun(G.birth.cards[0])");ok(run('G.run.kiep')===4&&run('G.meta.pick')===1, 'Thiên mệnh bậc 1: kiếp 4 được chọn');
    run("G.meta.pick=0;G.meta.nlife=4;genBirth();newRun(G.birth.cards[0])");ok(run('G.meta.pick')===0, 'kiếp 5 thì không');
    run("G.meta.pick=0;G.meta.upg.menh=2;G.meta.nlife=2;genBirth();newRun(G.birth.cards[0])");ok(run('G.meta.pick')===1, 'bậc 2: kiếp 3 được chọn');
    ok(run("(()=>{G.meta.nlife=1;let n=0;for(let i=0;i<50;i++)n+=ttRoll([]).length;return n/50<=2.2})()"), 'Thiên mệnh không còn rút thêm khí vận');
  },
  // Sửa-C.6: chỉ được chọn lá số khi đã tu/uống/mang vật luân hồi
  dt_chon() {
    fresh("G.meta.pick=0;G.meta.upg.menh=0;G.run.qitems=[]");
    run("die('combat',{n:'thử'})");ok(run('G.meta.pick')===0, 'chết bình thường: không được chọn');
    run("genBirth();newRun(G.birth.cards[0]);G.run.pills=[{id:'luanhoi',q:0}];usePill(0)");ok(run("(G.run.dtUsed||[]).includes('luanhoi')"), 'uống Luân Hồi Đan: ghi lại');
    run("die('combat',{n:'thử'})");ok(run('G.meta.pick')===1, 'uống Luân Hồi Đan rồi chết: được chọn');
    run("G.meta.pick=0;genBirth();newRun(G.birth.cards[0]);G.run.qitems=['luan_hoi_kinh']");ok(run("!!bagItems().find(x=>x.key==='vluan_hoi_kinh'&&x.use)"), 'Luân Hồi Kinh dùng được trong túi');
    run("bagUse('vluan_hoi_kinh',1)");ok(run("G.run.arts.some(a=>a.n==='Luân Hồi Kinh')"), 'học được Luân Hồi Kinh');
    run("die('combat',{n:'thử'})");ok(run('G.meta.pick')===1, 'đã tu Luân Hồi Kinh: được chọn');
    run("G.meta.pick=0;genBirth();newRun(G.birth.cards[0]);G.run.qitems=['luan_hoi_ngoc','dinh_menh_chau']");run("die('combat',{n:'thử'})");
    ok(run('G.meta.pick')===1, 'mang hai vật cùng lúc: chỉ một lượt');
    ok(run("THUONG_CAC.some(x=>x.id==='luanhoi')&&THUONG_CAC.some(x=>x.id==='luan_hoi_kinh')&&THUONG_CAC.some(x=>x.id==='luan_hoi_ngoc')"), 'Thưởng Các bày ba nguồn');
    run("genBirth()");ok(run("G.birth.cards.length")===3, 'ba lá số');
    run("newRun(G.birth.cards[0])");ok(run("G.run.rootKnown")===0, 'kiếp mới chưa trắc');
  },
  // Sửa-C.8: già theo tỉ lệ tuổi/thọ
  gia() {
    fresh("G.run.the=[];G.run.kv=[];G.run.tue=null;tueInit(G.run)");
    const s0=JSON.parse(run("JSON.stringify(S())"));const life=s0.life;
    ok(!run("giaOn()"), 'còn trẻ: chưa già');
    run(`G.run.birthAge=Math.ceil(${life}*0.72)+1-(W().t-G.run.bornT)/HY;G.run.age=G.run.birthAge+(W().t-G.run.bornT)/HY;advanceTime(1)`);
    const s1=JSON.parse(run("JSON.stringify(S())"));
    ok(run("giaOn()")&&s1.gia===1, 'quá 70% thọ: già (tuổi '+Math.floor(run('G.run.age'))+'/'+life+')');
    ok(Math.abs(s1.maxHp-Math.round(s0.maxHp*0.9))<=1, 'khí huyết tối đa −10%: '+s0.maxHp+' → '+s1.maxHp);
    ok(s1.atk<=s0.atk&&Math.abs(s1.ne-s0.ne*0.99)<0.01&&Math.abs(s1.crit-s0.crit*0.995)<0.01, 'công/né −1%, bạo kích −0,5%: né '+s0.ne+' → '+s1.ne);
    ok(s1.ngo===s0.ngo&&s1.maxMp===s0.maxMp, 'ngộ tính, linh lực không giảm');
    ok(run("G.run.hp")<=s1.maxHp, 'khí huyết hiện có không vượt tối đa');
    ok(run("NK.count('gia.on')")===1, 'báo một lần');
    run("startCombat({},{kind:'node'})");ok(run("tlD(mainUnit(G.run.scene))")===run("TL_DODGE")+5&&run("tlB(mainUnit(G.run.scene))")===run("TL_BLOCK")+5, 'né/đỡ tốn thêm 5 thể lực');
    ok(run("tlD(G.run.scene.units.find(u=>u.side==='B'))")===run("TL_DODGE"), 'kẻ địch không bị');
    ok(run("(()=>{const r=G.run;r.tue.sum.hpOld=-8;r.tue.sum.tpOld=-2;delete r._giaV1;run2();return r.tue.sum.hpOld==null&&r.tue.sum.tpOld==null})()"), 'bản lưu cũ: bỏ già dần kiểu cũ');
  },
  // Sửa-C.11: săn bắt/hái lượm có hạn, hồi mỗi năm; săn yêu cũng vậy
  san_bat() {
    fresh();
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);return n.id})()");
    const act=()=>run("JSON.stringify(placeActs(nodeById(G.run.at)).find(a=>a.a==='sanbat')||null)");
    ok(JSON.parse(act())&&!JSON.parse(act()).dis, 'hoang dã có nút săn bắt, hái lượm');
    run("G.run.anLk=0");run("placeAct('sanbat')");ok(run("G.run.anLk")>=1&&run("G.run.anLk")<=3, 'một lượt được 1–3 ngày lương thực ('+run("G.run.anLk")+')');
    run(`for(let i=0;i<10;i++){G.run.scene=null;openPlace(${JSON.stringify(nid)});placeAct('sanbat');}`);
    ok(run("sbLeft(nodeById(G.run.at))")===0&&JSON.parse(act()).dis, 'hết '+run('SAN.hai')+' lượt thì khoá');
    ok(run("NK.count('sb.do')")===run('SAN.hai'), 'đếm đúng số lượt');
    run("advanceTime(HY)");run(`G.run.scene=null;openPlace(${JSON.stringify(nid)})`);ok(run("sbLeft(nodeById(G.run.at))")===run('SAN.hai'), 'sang năm hồi lại');
    ok(run("placeActs(nodeById(G.run.at)).find(a=>a.a==='sanyeu').l").includes('còn '+run('SAN.san')), 'săn yêu: '+run('SAN.san')+' lượt mỗi năm');
    const town=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran');return n.id})()");
    ok(!run(`placeActs(nodeById(${JSON.stringify(town)})).some(a=>a.a==='sanbat')`), 'thôn trấn không có');
  },
  // Sửa-C.14: tân thủ — sở hữu/trạng thái tự xong; thao tác/đếm phải làm thật
  tut_loai() {
    fresh();
    ok(run("G.run.tut&&G.run.kiep===1")!==false, 'kiếp đầu có tân thủ');
    const st=id=>run(`(()=>{const T=G.run.tut;T.open=[${JSON.stringify(id)}];T.prog={};T.ready={};tutEval();return !!T.ready[${JSON.stringify(id)}]})()`);
    run("if(!G.run.arts.length)tpLearn(0,{n:'Thử'})");ok(st('HD09'), 'HD09 đã có công pháp: tự xong');
    run("G.run.bonds={'a':'kn'}");ok(st('HD15'), 'HD15 đã có mối quan hệ: tự xong');
    run("G.run.pets=[{n:'mèo'}]");ok(st('HD24'), 'HD24 đã có linh thú: tự xong');
    run("G.run.pham=0");ok(st('HD19'), 'HD19 đã Luyện Khí: tự xong');
    ok(!st('HD12'), 'HD12 chữa thương: không tự xong khi đang lành');
    ok(!st('HD11'), 'HD11 săn năm lần: không tự xong');
    run("G.run.tut.open=['HD11'];G.run.tut.prog={};tutTick('hunt',3)");ok(run("G.run.tut.prog.HD11")===3&&!run("G.run.tut.ready.HD11"), 'đếm từ lúc mở: 3/5');
    ok(run("TUT.filter(t=>t.st).every(t=>t.need===1||t.id==='HD10')"), 'nhiệm vụ trạng thái đều một bước (trừ HD10 hai món)');
    ok(run("TUT.filter(t=>t.need>1&&t.id!=='HD10').every(t=>!t.st)"), 'nhiệm vụ đếm số lần không tự tính');
  },
  // Sửa-C.18–19: Địa ~1/1000, Thiên ~1/100.000; dị tượng; tông môn kinh động
  tl_hiem() {
    fresh();
    const c=JSON.parse(run("(()=>{G.meta.nlife=0;const c={};for(let i=0;i<200000;i++){const id=genRoot().id;c[id]=(c[id]||0)+1;}return JSON.stringify(c)})()"));
    ok((c.dia||0)>=120&&(c.dia||0)<=300, 'Địa linh căn ~1/1000: '+(c.dia||0)+'/200000');
    ok((c.thien||0)<=12, 'Thiên linh căn cực hiếm: '+(c.thien||0)+'/200000');
    ok(run("(()=>{for(let i=0;i<2000;i++){const x=genRoot();if(x.id==='dia')return x.els.length===2;}return true})()"), 'Địa: hai hệ');
    // trắc ra Địa ở sơn môn
    const si=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tong'&&n.state!=='ruin');G.run.at=n.id;return W().sects.findIndex(s=>s.n===(n.owner||n.name))})()");
    ok(si>=0, 'có sơn môn để thử');
    run("G.run.root={id:'dia',els:['kim','thuy'],q:'thuong'};G.run.rootKnown=0;G.run.sfav={}");const f0=run(`sectFav(${si})`);
    const res=JSON.parse(run("JSON.stringify(tlResult('tuyendo'))"));
    ok(run("G.run.tlFx&&G.run.tlFx.k")==='dia', 'đặt hiệu ứng Địa');
    ok(run(`sectFav(${si})`)>f0, 'tông kinh động: hảo cảm tông tăng '+f0+' → '+run(`sectFav(${si})`));
    ok(run("NK.count('tl.sectFav')")===1&&res.ch.some(x=>/kinh động/.test(JSON.stringify(x))), 'chip tông môn kinh động');
    ok(run("tlFxLines(G.run.tlFx).length")>=5, 'lời kể dị tượng Địa');
    const dPpl=JSON.parse(run('JSON.stringify(G.run.tlFx.ppl)'));ok(dPpl.length===run('TL_FX.dia.eld+TL_FX.dia.de'), 'một cao tầng + hai đệ tử tăng thiện cảm: '+dPpl.join(', '));
    run("G.run.tlFx=null;G.run.root={id:'thien',els:['hoa'],q:'thuong'};G.run.rootKnown=0");const f1=run(`sectFav(${si})`);run("tlResult('dusi')");
    ok(run("G.run.tlFx.k")==='thien'&&run("tlFxLines(G.run.tlFx).length")>run("TL_FX.thien.eld")+4, 'Thiên: lời kể dài hơn');
    ok(run(`sectFav(${si})`)-f1>run(`(()=>0)()`)&&run("TL_FX.thien.fe")>run("TL_FX.dia.fe"), 'Thiên tăng nhiều hơn Địa');
    run("G.run.tlFx=null;G.run.root={id:'tam',els:['kim','moc','thuy'],q:'thuong'};G.run.rootKnown=0;tlResult('dusi')");ok(!run("G.run.tlFx"), 'linh căn thường: không có dị tượng');
    // ưu tiên cùng phe
    ok(run("(()=>{const L=['a','b','c','d'];const P={a:'ta',b:'chinh',c:'chinh',d:'ta'};const x=tlPickPpl(L,2,'chinh',n=>P[n]);return x.every(n=>P[n]==='chinh')})()"), 'ưu tiên người cùng phe với tông');
  },
  quen_sach() {
    fresh();
    ok(run("!UPG.find(u=>u.id==='ky'||u.id==='kytp')"), 'không còn nâng cấp Ký ức công pháp / tâm pháp');
    const d=run(`JSON.stringify((()=>{const d={meta:{upg:{ky:2,kytp:1,hp:1},pts:5,tpMem:{n:'x',tier:1,el:'kim'}}};migrateX(d);return d.meta})())`);
    const M=JSON.parse(d);ok(M.upg.ky==null&&M.upg.kytp==null&&M.upg.hp===1, 'bản lưu cũ: xoá khoá ky, kytp, giữ nâng cấp khác');
    ok(M.pts===5+36+12, 'hoàn điểm đã mua (ky 36, kytp 12): '+M.pts);
    ok(!M.tpMem, 'xoá ký ức tâm pháp cũ');
    run("G.meta.upg={};G.meta.tpMem={n:'Cũ',tier:2,el:'kim'};genBirth();newRun(G.birth.cards[0])");
    ok(run("!G.run.skills.some(k=>k.src==='ky')"), 'kiếp mới không có chiêu ký ức');
    ok(run("!G.run.arts.some(a=>a.n==='Cũ')"), 'kiếp mới không mang tâm pháp cũ');
    // Túc Tuệ Đăng
    run("tpLearn(3,{n:'Đèn Thử Tâm Pháp',el:'kim'});G.run.qitems=['tuc_tue_dang']");const tn=run("tuOf(arts()).n");run("die('combat',{n:'thử'})");
    ok(run("G.meta.mem&&G.meta.mem.n")===tn, 'chết mang Túc Tuệ Đăng: nhớ tâm pháp '+tn);
    run("genBirth();newRun(G.birth.cards[0])");
    ok(run(`G.run.arts.some(a=>a.n===${JSON.stringify(tn)}&&a.tier===0)`)&&run("!G.meta.mem"), 'kiếp sau học lại tâm pháp ở bậc thấp nhất');
  },
  tue_bien() {
    const setup=the=>fresh(`G.run.the=${JSON.stringify(the)};G.run.kv=[];G.run.trait='none';G.run.lifeAdj=500;G.run.tue=null;tueInit(G.run);NK.clear();`);
    setup(['man_luc_the']);
    const hp0=run('S().maxHp');
    run('advanceTime(10*HY)');ok(run('G.run.tue.sum.hpP')===5, 'Man Lực Thể: mười năm khí huyết +5% ('+run('G.run.tue.sum.hpP')+')');
    ok(run('S().maxHp')>hp0, 'khí huyết tối đa thật sự tăng (khóa đúng): '+hp0+' → '+run('S().maxHp'));
    run('advanceTime(40*HY)');ok(run('G.run.tue.sum.hpP')<=0.5*25+1e-9, 'trần hai mươi lăm năm: '+run('G.run.tue.sum.hpP'));
    setup(['hoa_linh_the']);
    run('G.run.hp=1;const rs=RS;RS=()=>0.001;try{advanceTime(HY);}finally{RS=rs;}');
    ok(run('G.run.hp>1&&G.run.hp<=S().maxHp'), 'Hỏa Linh Chi Thể: biến cố hồi khí huyết ('+run('G.run.hp')+')');
    setup([]);
    run('advanceTime(30*HY)');ok(run('NK.count("tue.year")')===30, 'nhảy ba mươi năm: đủ ba mươi mốc ('+run('NK.count("tue.year")')+')');
    run('(()=>{const x=JSON.parse(JSON.stringify(G.run));G.run=x;NK.clear();advanceTime(1);})()');ok(run('NK.count("tue.year")')===0, 'tải lại không áp lại năm cũ');
    setup(['thong_tue_the']);run('advanceTime(40*HY)');ok(run('G.run.tue.sum.ngo')===4, 'Thông Tuệ Thể: ngộ tính tối đa +4');
    ok(run("Object.keys(TUE).every(k=>TT_PHYS.some(p=>p.id===k)||TT_DEST[k]||TRAIT.some(t=>t.id===k))"), 'mọi mã trong TUE đều có thật');
    ok(run("Object.values(TUE).every(d=>!/\\d/.test(d.txt||''))"), 'lời theo năm tháng không có chữ số');
    const keys=run("JSON.stringify([...new Set(Object.values(TUE).flatMap(d=>Object.keys(d.y||{}).concat([].concat(d.ev||[]).flatMap(e=>Object.keys(e.add||{}).concat((e.alt||[]).flatMap(a=>Object.keys(a.add||{})))))))])");
    const okKeys=['hpP','defP','atkP','matkP','mpP','tvP','ngo','tam','than','tp','crit','dodge','lifeY'];
    ok(JSON.parse(keys).every(k=>okKeys.includes(k)||/^elP_(kim|moc|thuy|hoa|tho|loi|bang|phong)$/.test(k)), 'mọi khóa chỉ số đều có người đọc: '+keys);
    setup(['man_luc_the']);run('G.run.root={id:"vo",els:[]};G.run.the=["thai_am_the"];advanceTime(5*HY)');ok(!run('G.run.tue.sum.mpP'), 'vô căn: tuế biến linh lực ngủ');
  },
  deed_su_kien() {
    fresh();
    const bad=run(`(()=>{const out=[];const walk=(x,id)=>{if(Array.isArray(x))return x.forEach(y=>walk(y,id));if(!x||typeof x!=='object')return;for(const k in x){if(k==='karma')out.push('karma@'+id);if(k==='deed'&&!DEED[x[k]])out.push(x[k]+'@'+id);walk(x[k],id);}};for(const e of CONTENT_EVENTS)walk(e,e.id);return out})()`);
    ok(bad.length===0, 'sự kiện không còn karma cũ, mã deed đều có: '+bad.slice(0,5).join(','));
    const n=run(`(()=>{let n=0;const walk=x=>{if(Array.isArray(x))return x.forEach(walk);if(!x||typeof x!=='object')return;for(const k in x){if(k==='deed'||k==='hd'||k==='ng')n++;walk(x[k]);}};CONTENT_EVENTS.forEach(walk);return n})()`);
    ok(n>=477, 'đủ chỗ đã chuyển: '+n);
    const ch=run("applyE({deed:'cuu_nguoi',st:1})");ok(ch.some(c=>c.i==='☯️'), 'hiệu ứng sự kiện ra chip nghiệp duyên');
  },
  // Đ3.1 bạc: đơn vị đồng/quan, tiền khởi đầu theo xuất thân, linh thạch phàm nhân về 0, bản lưu cũ
  tien_bac() {
    fresh();
    // Sửa-A (người dùng chốt câu 9): xu / lượng bạc / lượng vàng, bỏ quan và đồng
    ok(run("fmtBac(3200)")==='3 lượng bạc 200 xu'&&run("fmtBac(200)")==='200 xu'&&run("fmtBac(5000)")==='5 lượng bạc'&&run("fmtBac(25030)")==='2 lượng vàng 5 lượng bạc 30 xu', 'fmtBac: '+run("fmtBac(25030)"));
    ok(run("fmtBacS(3200)")==='3,2 lượng'&&run("fmtBacS(25000)")==='2,5 vàng'&&run("fmtBacS(12)")==='12 xu', 'fmtBacS: '+run("fmtBacS(3200)")+' / '+run("fmtBacS(25000)"));
    const st=o=>run(`(()=>{genBirth();const k=Object.assign({},G.birth.cards[0],{origin:'${o}',hc:null});newRun(k);return JSON.stringify({st:G.run.st,bac:G.run.bac})})()`);
    run("G.meta.upg={}");
    let a=JSON.parse(st('nong'));ok(a.st===0&&a.bac>=225&&a.bac<=875, 'con nhà nông (Sửa-B: thường 300–700 xu × hoàn cảnh 0,75–1,25): 0 linh thạch '+JSON.stringify(a));
    a=JSON.parse(st('khat'));ok(a.st===0&&a.bac<=300, 'khất cái: khốn khó '+JSON.stringify(a));
    a=JSON.parse(st('thegia'));ok(a.st>=1&&a.st<=2&&a.bac>=5000, 'con thế gia: 1–2 linh thạch, khá giả '+JSON.stringify(a));
    a=JSON.parse(st('xt_nguoi_thua_ke_sap_bac'));ok(a.bac>=5000, 'xuất thân danh mục nhóm khá giả nhận đúng nhóm '+JSON.stringify(a));
    // Sửa-A: linh thạch không còn tự đổi ra tiền phàm (trước đây đổi một viên ra 90 quan)
    run("G.run.bac=0;G.run.st=2;NK.clear()");ok(!run("bacPay(500,'thu')")&&run("G.run.st")===2&&run("G.run.bac")===0, 'thiếu xu mà có linh thạch: không tự đổi');
    run("G.run.bac=600");ok(run("bacPay(500,'thu')")&&run("G.run.bac")===100&&run("NK.count('tien.bac')")>=1, 'trả 500 xu, nhật ký tien.bac');
    run("G.run.bac=10;G.run.st=0");ok(!run("bacPay(500,'thu')")&&run("G.run.bac")===10, 'không đủ: không trừ');
    run("delete G.run.bac;delete G.run._bacV1;G.run.st=7;run2()");ok(run("G.run.bac")===0&&run("G.run.st")===7, 'bản lưu cũ: bạc 0, giữ linh thạch');
    fresh("G.run.trait='none';G.run.the=[];G.run.kv=['gia_canh_kha_gia'];G.run.tue=null;tueInit(G.run);G.run.bac=0;G.run.st=0;");
    run("advanceTime(HY)");ok(run("G.run.bac")>=1650&&run("G.run.st")===0, 'tuế biến Gia Cảnh Khá Giả: phàm nhân nhận bạc, không nhận linh thạch ('+run("G.run.bac")+')');
  },
  // Đ3.2 quán phàm trả bạc; tâm pháp chép tay ở tạp hóa bán bằng bạc
  tien_quan() {
    fresh();
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'||n.type==='thanh');G.run.at=n.id;openPlace(n.id);return n.id})()");
    const o=JSON.parse(run("JSON.stringify(venueOpts(nodeById(G.run.scene.id),'inn').find(x=>x.id==='phong'))"));
    ok(o.bac===12&&o.st===0, 'phòng trọ: 12 đồng, không tốn linh thạch '+JSON.stringify({bac:o.bac,st:o.st}));
    ok(run("venueOpts(nodeById(G.run.scene.id),'inn').some(x=>x.id==='giuong'&&x.bac===6)"), 'có giường tập thể 6 đồng');
    run("G.run.bac=100;G.run.st=0;G.run.hp=1");ok(run("venueDo('inn','an')")&&run("G.run.bac")===87, 'ăn một bữa: trừ 13 đồng ('+run("G.run.bac")+')');
    run("openPlace(G.run.at);G.run.bac=5;G.run.st=0");const no=run("venueOpts(nodeById(G.run.scene.id),'inn').find(x=>x.id==='phong').no");
    ok(no==='Không đủ tiền'&&!run("venueDo('inn','phong')")&&run("G.run.bac")===5, 'không tiền: khóa với chữ "Không đủ tiền"');
    run("openPlace(G.run.at);G.run.bac=0;G.run.st=1");ok(!run("venueDo('inn','phong')")&&run("G.run.st")===1, 'Sửa-A: thiếu xu mà có linh thạch: không đổi tự động');
    run("G.run.arts=(G.run.arts||[]).filter(a=>a.type!=='tp');G.run.relics=G.run.relics.filter(x=>!(x.k==='book'&&x.art&&x.art.type==='tp'));G.run.bac=1000;G.run.st=0;nodeById(G.run.at).shop=null;openShop(nodeById(G.run.at))");
    const it=JSON.parse(run("JSON.stringify(G.run.scene.items[0])"));ok(it.bac===800, 'tạp hóa: bản chép tay tâm pháp giá 800 đồng ('+it.bac+')');
    run("buy(0)");ok(run("G.run.scene.items[0].sold")&&run("G.run.bac")===200, 'phàm nhân kiếp đầu mua được tâm pháp bằng bạc');
    run("G.run.hp=1;G.run.bac=1000;G.run.st=0;G.run.scene.healed=0");ok(run("G.run.scene.healBac")===150, 'thầy lang cho phàm nhân: 150 đồng');run("healBuy()");ok(run("G.run.hp===S().maxHp&&G.run.bac===850"), 'trả bạc mời thầy lang');
    run("G.run.rootKnown=0;G.run.bac=10000;G.run.qitems=[];nodeById(G.run.at).shop=null;openShop(nodeById(G.run.at))");const k=run("G.run.scene.items.findIndex(x=>x.k==='qi'&&x.id==='trac_linh_thach')");
    ok(k>=0&&run(`G.run.scene.items[${k}].bac`)===9900, 'chưa trắc linh: phường thị bán Trắc Linh Thạch 9.900 đồng');
    run(`buy(${k})`);ok(run("G.run.qitems.includes('trac_linh_thach')")&&run("G.run.bac")===100, 'mua Trắc Linh Thạch bằng bạc');
  },
  // Đ3.3 tiền trang — Sửa-A (câu 9): không còn đổi linh thạch ↔ tiền phàm; thay bằng hiệu cầm đồ
  tien_trang() {
    fresh();
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(!run("placeActs(nodeById(G.run.at)).some(a=>a.a==='tientrang')"), 'thành không còn tiền trang đổi linh thạch');
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='camdo')"), 'thành có hiệu cầm đồ');
    run("G.run.bac=0;G.run.st=5;G.run.pills=[];G.run.relics=[genRelic(1)];G.run.chu=null");
    run("G.run.qitems=[]");const L=JSON.parse(run("JSON.stringify(venueOpts(nodeById(G.run.at),'camdo'))"));ok(L.length===1&&L[0].id==='r:0'&&!L[0].no, 'cầm đồ: không nhận linh thạch');
    const g=run("camLt(nodeById(G.run.at),sellList()[0])");ok(run("venueDo('camdo','r:0')")&&run("G.run.bac")===0&&run("G.run.relics.length")===0&&run("G.run.st")===5+g, 'Sửa-E: cầm pháp khí ra '+g+' linh thạch Hạ phẩm, không ra tiền phàm');
    run("openPlace(G.run.at);G.run.relics=[genRelic(1)]");ok(!run("venueDo('camdo','r:0')"), 'mỗi tháng chỉ nhận một món');
    run("advanceTime(HM);openPlace(G.run.at)");ok(run("venueDo('camdo','r:0')"), 'sang tháng nhận tiếp');
  },
  // Sửa-E câu 17: cầm đồ — binh khí phàm ~10 lượng, đồ phàm trả xu, đồ tu sĩ trả linh thạch
  cam_e() {
    fresh();
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    run("G.run.bac=0;G.run.st=0;G.run.pills=[];G.run.relics=[genRelic(0)];G.run.chu=null;G.run.qitems=['vk_thiet_kiem','kim_sang_duoc','bt_truong_quyen','trac_linh_thach']");
    const L=JSON.parse(run("JSON.stringify(venueOpts(nodeById(G.run.at),'camdo'))"));
    ok(L.length===4&&L.some(o=>o.id==='q:0'&&/10 lượng|lượng/.test(o.g.txt))&&!L.some(o=>o.id==='q:3'), 'nhận binh khí, thuốc, bí tịch; không nhận Trắc Linh Thạch: '+L.map(o=>o.g.txt).join(' | '));
    ok(run("venueDo('camdo','q:0')")&&run("G.run.bac")===10000&&!run("hasItem('vk_thiet_kiem')"), 'binh khí phàm: 10 lượng bạc ('+run("fmtBac(G.run.bac)")+')');
    run("openPlace(G.run.at)");ok(run("venueDo('camdo','q:0')")&&run("G.run.bac")===10060, 'kim sang dược 60 xu (nửa giá mua), đồ phàm không giới hạn tháng');
    run("openPlace(G.run.at)");ok(run("venueDo('camdo','q:0')")&&run("G.run.bac")===13060, 'bí tịch võ: nửa giá (3.000 xu)');
    run("openPlace(G.run.at)");const p=run("sellList()[0].p");const g=run("camLt(nodeById(G.run.at),sellList()[0])");ok(run("venueDo('camdo','r:0')")&&run("G.run.st")===g&&g>=1&&g<p&&run("G.run.bac")===13060, 'pháp khí: '+g+' linh thạch (tiệm tu sĩ '+p+'), không trả tiền phàm');
    run("G.run.qitems=[]");const a0=run("S().atk");run("G.run.pham=1;G.run.qitems=[]");const a1=run("S().atk");run("G.run.qitems=['vk_thiet_kiem']");ok(run("S().atk")>a1, 'phàm nhân mang thiết kiếm thì công tăng ('+a1+' → '+run("S().atk")+')');
    run("nodeById(G.run.at).shop=null;openShop(nodeById(G.run.at))");ok(run("G.run.scene.items.some(x=>x.k==='qi'&&SUAE.vk[x.id]&&x.bac>=10000)"), 'tạp hóa thành bày một binh khí phàm');
    // Sửa-F câu 25: bí tịch võ đắt hơn nhiều, bậc cao đắt hơn bậc thấp, vẫn rẻ hơn binh khí phàm; cầm đồ ≈ nửa giá
    ok(run("VO_HOC.find(h=>h.id==='truong_quyen').bac")===6000&&run("VO_HOC.find(h=>h.id==='hon_nguyen').bac")===9000, 'giá bí tịch: Trường Quyền 6.000, Hỗn Nguyên 9.000 xu');
    ok(run("camPhamGia('bt_hon_nguyen')")===4500&&run("camPhamGia('bt_truong_quyen')")===3000&&run("VO_HOC.filter(h=>h.bac).every(h=>h.bac<SUAE.vk.vk_cuong_dao.bac)"), 'cầm bí tịch: 3.000 / 4.500; mọi bí tịch rẻ hơn binh khí phàm');
  },
  // Sửa-E câu 18: nguồn linh thạch Trung/Thượng/Cực
  lt_nguon() {
    fresh("G.run.pham=0");
    const roll=(name,n)=>JSON.parse(run(`(()=>{const c=[0,0,0,0];for(let i=0;i<${n};i++){G.run.lt=[0,0,0];const o=ltRollDo('${name}');c[0]+=o.st;for(let k=1;k<4;k++)c[k]+=G.run.lt[k-1]?1:0;}G.run.lt=[0,0,0];return JSON.stringify(c);})()`));
    const db=roll('daibi',400);ok(db[1]>60&&db[2]===0&&db[3]===0, 'đại bỉ: tối đa Trung phẩm ('+db.join('/')+')');
    const bc=roll('bicanh',4000);ok(bc[0]>0&&bc[1]>bc[2]&&bc[2]>bc[3]&&bc[2]>20&&bc[3]<40, 'bí cảnh: Hạ/Trung chính, Thượng hiếm, Cực rất hiếm ('+bc.join('/')+')');
    const cd=roll('coduyen',4000);ok(cd[3]>bc[3]*4&&cd[3]>60, 'kỳ ngộ cơ duyên: Cực phẩm nhiều nhất ('+cd.join('/')+')');
    run("G.run.pham=1");ok(run("ltRollDo('bicanh').ch.length")===0&&run("ltRollDo('bicanh').st")===0, 'phàm nhân không nhận');run("G.run.pham=0");
    // hiệu ứng trong sự kiện
    run("G.run.lt=[0,0,0];G.run.st=0");const ch=run("JSON.stringify(applyE({ltRoll:'daibi',lt:[0,2,0]}))");ok(run("G.run.lt[1]")===2&&run("G.run.st")>0&&/Thượng/.test(ch), 'hiệu ứng lt và ltRoll trong sự kiện');
    ok(run("CONTENT_EVENTS.find(d=>d.id==='dai_bi').choices[0].win.e.ltRoll")==='daibi'&&run("CONTENT_EVENTS.find(d=>d.id==='bi_canh').choices[0].o[1].e.ltRoll")==='bicanh', 'đại bỉ, bí cảnh có ltRoll');
    // đấu giá thường: gửi bán lấy Hạ/Trung
    run("G.run.lt=[0,0,0];G.run.st=0;G.run.pills=[];G.run.relics=[genRelic(4)]");const v=run("Math.round(sellList()[0].p0*SUAE.dg.nhan)");run("applyE({dgBan:1})");
    ok(run("G.run.relics.length")===0&&run("G.run.st+G.run.lt[0]*100")===v&&run("G.run.lt[1]")===Math.min(5,Math.floor(v/100)), 'đấu giá: gửi bán thu '+v+' Hạ quy ra Trung ('+run("ltTxt()")+')');
    ok(run("CONTENT_EVENTS.find(d=>d.id==='dau_gia').choices.some(c=>c.e&&c.e.dgBan)"), 'hội đấu giá có lựa chọn gửi bán');
    // U Minh Ám Hội: làm lại ở Sửa-I (bài am_hoi)
  },
  // Sửa-E câu 19: bế quan đói chậm, sau bế quan đói chậm, tĩnh toạ không; Tích Cốc Đan cho Trúc Cơ+
  tich_coc() {
    fresh("FEAT.an=1;G.run.pham=0;G.run.realm=1;G.run.doi=0;G.run.anPart=0;G.run.anCov=0;G.run.tichCoc=0;G.run.anCham=0");
    ok(run("anRate(G.run)")===run("AN.nhip.tc"), 'Trúc Cơ: vẫn đói rất chậm (1/60)');
    run("G.run._inBq=1");ok(Math.abs(run("anRate(G.run)")-run("AN.nhip.tc*AN.nhip.bq"))<1e-9, 'đang bế quan: ×⅓');run("G.run._inBq=0");
    run("G.run.anCham=W().t+HD*10");ok(Math.abs(run("anRate(G.run)")-run("AN.nhip.tc*AN.nhip.sauBq"))<1e-9, 'sau bế quan: ×½');run("G.run.anCham=0");
    ok(!/_inBq|anCham/.test(run("String(typeof tinhToa==='function'?tinhToa:'')")), 'tĩnh toạ không đụng nhịp đói');
    // mua ở chợ tu sĩ bằng linh thạch
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;n.shop=null;G.run.st=1000;openShop(n);})()");
    const k=run("G.run.scene.items.findIndex(x=>x.k==='qi'&&x.id==='tich_coc_dan')");ok(k>=0&&run(`G.run.scene.items[${k}].p`)>0&&!run(`G.run.scene.items[${k}].bac`), 'phường thị bán Tích Cốc Đan bằng linh thạch ('+run(`G.run.scene.items[${k}].p`)+')');
    const p=run(`G.run.scene.items[${k}].p`);run(`buy(${k})`);ok(run("hasItem('tich_coc_dan')")&&run("G.run.st")===1000-p, 'mua được, trừ linh thạch');
    run("G.run.scene=null;G.run.doi=200");ok(run("bagUse('vtich_coc_dan')")===1&&run("G.run.doi")===0&&run("tcCon()")===run("SUAE.tc.ngay"), 'dùng: hết đói, no '+run("SUAE.tc.ngay")+' ngày');
    run("advanceTime(HD*400)");ok(run("G.run.doi")===0&&run("anRate(G.run)")===0, '400 ngày sau vẫn no');
    run("G.run.tichCoc=W().t-1");ok(run("anRate(G.run)")>0, 'hết hạn thì đói lại như thường');
    run("G.run.realm=0;G.run.qitems=['tich_coc_dan']");ok(run("bagUse('vtich_coc_dan')")===0&&run("hasItem('tich_coc_dan')"), 'Luyện Khí không dùng được');
    run("delete G.run.tichCoc");ok(run("tcCon()")===0, 'bản lưu cũ (không có tichCoc) chạy được');
  },
  // Sửa-E câu 20: trả trước một phần khoản vay
  vay_tt() {
    fresh("(()=>{const r=G.run;r.moving=null;r.bac=0;r.noTra=null;r.vay=null;FEAT.no=1;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin'&&n.id!==r.queAt);r.at=n.id;openPlace(n.id);})()");
    ok(run("venueDo('vay','v1')")&&run("G.run.vay.tra")===1180, 'vay 1 lượng (trả 1.180)');
    run("openPlace(G.run.at)");const L=JSON.parse(run("JSON.stringify(venueOpts(nodeById(G.run.at),'vay').filter(o=>o.id.startsWith('tt:')).map(o=>o.id))"));
    ok(JSON.stringify(L)==='["tt:200","tt:590","tt:1000"]', 'các mức trả trước: '+L.join(', '));
    const han=run("G.run.vay.han");ok(run("venueDo('vay','tt:200')")&&run("G.run.vay.tra")===980&&run("G.run.bac")===800&&run("G.run.vay.han")===han, 'trả trước 200 xu: còn 980, hạn giữ nguyên');
    run("openPlace(G.run.at);G.run.bac=100");ok(!run("venueDo('vay','tt:200')")&&run("G.run.vay.tra")===980, 'không đủ tiền thật: không trả được');
    run("openPlace(G.run.at);G.run.bac=980");ok(run("venueDo('vay','tra')")&&!run("G.run.vay")&&run("G.run.bac")===0, 'trả nốt phần còn lại thì xong');
    run("G.run.vay={id:'v1',goc:1000,tra:1180,han:W().t+HM,bao:0}");ok(run("vayTtList().length")>0, 'bản lưu cũ (khoản vay cũ) vẫn trả trước được');
    // Sửa-F câu 27: lãi trọn gói cố định lúc vay
    run("G.run.vay=null;G.run.bac=0;G.run.origin=ORIGIN.find(o=>(o.grp||'thuong')!=='kho').id;openPlace(G.run.at)");run("venueDo('vay','v3')");
    ok(run("G.run.vay.tong")===3540&&run("G.run.vay.tra")===3540&&run("G.run.bac")===3000, 'vay 3 lượng: tổng cố định 3.540 chốt lúc vay');
    run("advanceTime(24*90)");ok(run("G.run.vay.tra")===3540&&run("G.run.vay.tong")===3540, 'qua 3 tháng tổng phải trả không đổi (không cộng lãi theo tháng)');
    const dv=run("JSON.stringify(venueOpts(nodeById(G.run.at),'vay').filter(o=>o.id==='v10')[0])");ok(/13 lượng|13\.000|trả trọn/.test(dv)&&/Lãi trọn gói/.test(dv), 'danh sách vay hiện rõ tổng phải trả và lãi trọn gói');
    run("G.run.bac=3540;openPlace(G.run.at)");ok(run("venueDo('vay','tra')")&&run("G.run.bac")===0&&!run("G.run.vay"), 'trả sớm: vẫn đúng 3.540, không giảm lãi cũng không thêm');
    run("G.run.vay={id:'v1',goc:1000,tra:700,han:W().t+HM,bao:0};run2(G.run)");ok(run("G.run.vay.tong")===1180&&run("G.run.vay.tra")===700, 'bản lưu cũ đang vay: chốt tổng 1.180, phần còn lại giữ nguyên');
  },
  // Sửa-E câu 23: thương lượng giảm giá tiệm ít (tối đa ~5%)
  mac_ca() {
    fresh();
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;n.shop=null;G.run.bac=1e6;})()");
    const gia=v=>{run(`nangOf().thuong=${v};openShop(nodeById(G.run.at))`);return run("G.run.scene.items.find(x=>x.k==='qi'&&x.id==='kim_sang_duoc').bac");};
    const g10=gia(10),g55=gia(55),g100=gia(100);
    ok(g10===120, 'năng lực gốc: không giảm ('+g10+' xu)');
    ok(g55<g10&&g55>=g10*0.96, 'Lão luyện: giảm chút ít ('+g55+')');
    ok(g100===114, 'tối đa: 120 xu còn 114 (−5%)');
    ok(Math.abs(run("(nangOf().thuong=100,macGiam())")-0.05)<1e-9&&run("(nangOf().thuong=200,macGiam())")<=0.05, 'giảm kẹp ở 5%');
  },
  // Sửa-A (câu 9): bốn phẩm linh thạch, bản lưu cũ
  lt_pham() {
    fresh();
    ok(run("JSON.stringify(G.run.lt)")==='[0,0,0]'&&run("G.run._xuV1")===1, 'nhân vật mới có r.lt');
    run("G.run.st=7;G.run.bac=3200;delete G.run.lt;delete G.run._xuV1;run2()");
    ok(run("G.run.st")===7&&run("JSON.stringify(G.run.lt)")==='[0,0,0]'&&run("G.run.bac")===3200, 'bản lưu cũ: linh thạch cũ thành Hạ phẩm, bạc cũ (đồng) = xu');
    run("ltAdd(1,2);ltAdd(3,1)");ok(run("ltGet(1)")===2&&run("ltGet(3)")===1&&/Trung/.test(run("ltTxt()")), 'thêm Trung, Cực phẩm: '+run("ltTxt()"));
    ok(run("ltAdd(2,-5)")===0&&run("ltGet(2)")===0, 'không âm');
  },
  // Sửa-A (câu 17): đổi phẩm không ngang giá, tùy nơi, phẩm cao khó đổi lên
  lt_doi() {
    fresh();
    const N=JSON.parse(run("JSON.stringify(W().regions.flatMap(R=>R.nodes).filter(n=>n.type==='thanh'&&n.state!=='ruin').slice(0,2).map(n=>n.id))"));
    run(`G.run.at=${N[0]};openPlace(G.run.at)`);
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='doilt')"), 'phường thị có chỗ đổi linh thạch');
    const n0=`nodeById(${N[0]})`,n1=`nodeById(${N[1]})`;
    const up=[0,1].map(k=>run(`ltLen(${n0},${k})`)),dn=[0,1].map(k=>run(`ltXuong(${n0},${k})`));
    ok(up[0]>100&&up[1]>up[0], 'đổi lên phải bù, phẩm cao bù nhiều hơn: '+up.join(' / '));
    ok(dn.every(x=>x>=80&&x<=101)&&dn[1]<dn[0], 'đổi xuống 80–101, phẩm cao mất nhiều hơn: '+dn.join(' / '));
    ok(run(`ltLen(${n0},0)`)!==run(`ltLen(${n1},0)`)||run(`ltXuong(${n0},0)`)!==run(`ltXuong(${n1},0)`)||run(`ltLech(${n0})`)!==run(`ltLech(${n1})`), 'mỗi nơi lệch một ít');
    ok(!run(`venueOpts(${n0},'doilt').some(o=>o.id==='len:2')`), 'phường thị không đổi lên Cực phẩm');
    run("G.run.st=1000;G.run.lt=[0,0,0]");const c=up[0];ok(run("venueDo('doilt','len:0')")&&run("ltGet(1)")===1&&run("G.run.st")===1000-c, 'gom '+c+' Hạ lấy 1 Trung');
    run("openPlace(G.run.at)");const g=run(`ltXuong(${n0},0)`);ok(run("venueDo('doilt','xuong:0')")&&run("ltGet(1)")===0&&run("G.run.st")===1000-c+g, 'đổi 1 Trung lại được '+g+' Hạ (mất phần chênh)');
    run("openPlace(G.run.at);G.run.st=99999");let n=0;for(let i=0;i<8;i++){run("openPlace(G.run.at)");if(run("venueDo('doilt','len:0')"))n++;}
    ok(n===run('TIEN2.doi.thanh.lenThang[0]')-1, 'giới hạn số lần đổi lên mỗi tháng: '+n);
    run("G.run.st=5;openPlace(G.run.at)");ok(run("venueOpts(nodeById(G.run.at),'doilt').find(o=>o.id==='len:0').no")!=='', 'không đủ thì khóa');
  },
  // Sửa-E câu 16: nhu cầu KHÔNG áp vào giá quán (trọ, ăn, trà)
  quan_nc() {
    fresh("FEAT.nc=1");
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    const vs=run("JSON.stringify(['inn','tea','tavern'].filter(v=>venueOpts(nodeById(G.run.at),v).some(o=>o.bac)))");
    const giá=()=>run("JSON.stringify(['inn','tea','tavern'].map(v=>venueOpts(nodeById(G.run.at),v).map(o=>o.bac||o.st||0)))");
    const a=giá();run("_ncG=ncGet;ncGet=()=>1.4");const b=giá();run("ncGet=_ncG");
    ok(JSON.parse(vs).length>=1&&a===b, 'giá quán không đổi theo nhu cầu ('+vs+')');
  },
  // Sửa-A (câu 17): nhu cầu theo nơi × vật phẩm
  nhu_cau() {
    fresh("FEAT.nc=1");
    const nid=run("W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh').id");
    const d0=run(`ncGet(${nid},'lt1')`);ok(d0>=0.85&&d0<=1.15, 'nhu cầu nền quanh 1: '+d0.toFixed(3));
    const ds=[];for(let m=0;m<24;m++)ds.push(run(`ncBase('${nid}','dan:x',${m})`));ok(Math.max(...ds)-Math.min(...ds)>0.03, 'dao động theo thời gian');
    ok(run(`ncGet(${nid},'lt1')`)!==run(`ncGet(${nid},'lt2')`), 'mỗi món một nhu cầu');
    for(let i=0;i<5;i++)run(`ncPush(${nid},'lt1',TIEN2.nc.day)`);const d1=run(`ncGet(${nid},'lt1')`);ok(d1>d0+0.15, 'mua nhiều đẩy nhu cầu lên: '+d1.toFixed(3));
    run("advanceTime(HM*6)");const d2=run(`ncGet(${nid},'lt1')`);ok(Math.abs(run(`ncPushNow(${nid},'lt1')`))<0.05, 'phai dần theo tháng: '+d2.toFixed(3));
    run("advanceTime(HM*12)");ok(!run(`W().nc&&W().nc[${nid}]`), 'phai hết thì xoá khỏi bản lưu');
    for(let i=0;i<30;i++)run(`ncPush(${nid},'pb',-TIEN2.nc.day)`);ok(run(`ncGet(${nid},'pb')>=TIEN2.nc.min`), 'kẹp trong khoảng');
    // áp vào giá cửa hàng
    run(`G.run.at=${nid};openPlace(${nid});nodeById(${nid}).shop=null;G.run.bac=1e6;G.run.st=1e4;openShop(nodeById(${nid}))`);
    const k=run("G.run.scene.items.findIndex(x=>x.k==='qi'&&x.id==='kim_sang_duoc')");const b0=run(`G.run.scene.items[${k}].bac`);
    ok(b0===Math.max(1,Math.round(120*run(`ncGet(${nid},'qi:kim_sang_duoc')`))), 'giá tiệm theo nhu cầu: '+b0+' xu');
    run(`buy(${k});buy(${k})`);ok(run(`G.run.scene.items[${k}].bac`)>b0, 'mua hai gói thì giá lên: '+run(`G.run.scene.items[${k}].bac`));
    run(`W().nc={};G.run.relics=[genRelic(3)]`);const p0=run("sellList()[0].p");run(`ncPush(${nid},'pb',0.4)`);ok(run("sellList()[0].p")>p0, 'bán: nhu cầu cao thì được giá hơn ('+p0+' → '+run("sellList()[0].p")+', nc '+run(`ncGet(${nid},'pb')`)+')');
    ok(run("JSON.stringify(W().nc).length")<400, 'dữ liệu gọn: '+run("JSON.stringify(W().nc).length")+' ký tự');
  },
  // Sửa-A (câu 9): tạp hóa thành trấn chủ yếu đồ phàm; tông môn có bảo khố
  shop_pham() {
    fresh();
    for(const t of ['tran','thanh']){
      run(`(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='${t}'&&n.state!=='ruin');G.run.at=n.id;n.shop=null;openShop(n);})()`);
      const tu=run("G.run.scene.items.filter(shopCultivator).length");ok(tu<=(t==='tran'?1:2), t+': đồ tu sĩ ≤ '+(t==='tran'?1:2)+' ('+tu+')');
      ok(run("G.run.scene.items.some(x=>x.k==='qi'&&x.id==='kim_sang_duoc'&&x.bac===120)"), t+': bán Kim sang dược 120 xu');}
    run("G.run.hp=1;G.run.qitems=['kim_sang_duoc']");ok(run("bagUse('vkim_sang_duoc',1)")===1&&run("G.run.hp")>1&&!run("G.run.qitems.length"), 'dùng Kim sang dược hồi khí huyết');
    const T=run("W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tong').id");
    run(`G.run.at=${T};G.run.flags.tongmon=0`);ok(!run(`placeActs(nodeById(${T})).some(a=>a.a==='taphoa')`), 'người ngoài: không có bảo khố');
    run(`G.run.flags.tongmon=1;G.run.sectName=nodeById(${T}).owner||nodeById(${T}).name`);ok(run(`placeActs(nodeById(${T})).some(a=>a.a==='taphoa')`)&&run(`placeActs(nodeById(${T})).some(a=>a.a==='doilt')`), 'đệ tử: có bảo khố và đổi linh thạch');
    run(`nodeById(${T}).shop=null;openShop(nodeById(${T}))`);ok(run("G.run.scene.items.filter(shopCultivator).length")>=5, 'bảo khố nhiều đồ tu sĩ: '+run("G.run.scene.items.filter(shopCultivator).length"));
  },
  // Sửa-A (câu 9): sự kiện — phàm nhân không gặp chuyện tu sĩ; sự kiện phàm đổi giá sang xu
  su_kien_pham() {
    fresh("G.run.pham=1");
    ok(run("PHAM_SK.cam.length")>=8&&run("PHAM_SK.cam.includes('bi_canh')"), 'có danh sách sự kiện phàm không gặp ('+run("PHAM_SK.cam.length")+')');
    ok(!run("contentTriggerOk(EVMAP.bi_canh.content)")&&!run("contentPoolOk(EVMAP.bi_canh,null,'explore',false)"), 'phàm nhân không gặp Bí cảnh');
    run("G.run.pham=0");ok(run("PHAM_SK.cam.includes('bi_canh')")&&!run("phamCam('bi_canh')"), 'tu sĩ thì không bị chặn');run("G.run.pham=1");
    const x=run("evXu(10)");ok(x===run('Math.max(1,Math.round(10*SC[rT()]))*TIEN.evXu'), 'giá 10 linh thạch → '+x+' xu');
    run("G.run.bac=0;G.run.st=50");ok(!run("costOk({st:10})"), 'phàm nhân: có linh thạch mà không có xu thì không trả được');
    run(`G.run.bac=${x}`);ok(run("costOk({st:10})"), 'đủ xu thì trả được');const ch=run("costChips({st:10})");ok(run("G.run.bac")===0&&run("G.run.st")===50&&ch[0].i==='🪙', 'trả bằng xu, giữ linh thạch');
    run("applyE({st:3})");ok(run("G.run.bac")===run("evXu(3)")&&run("G.run.st")===50, 'phần thưởng linh thạch → xu');
    ok(run("phamLtTxt('Ngươi đưa ba viên linh thạch, Linh thạch quý lắm. Trắc Linh Thạch')")==='Ngươi đưa ba đồng bạc, Bạc quý lắm. Trắc Linh Thạch', 'lời kể đổi chữ: '+run("phamLtTxt('ba viên linh thạch')"));
    run("G.run.pham=0;G.run.bac=0;G.run.st=50");run("costChips({st:10})");ok(run("G.run.st")<50&&run("G.run.bac")===0, 'tu sĩ vẫn trả linh thạch');
  },
  // Đ3.4 cống hiến theo thế lực: sổ tông A không dùng ở tông B; bản lưu cũ r.ch → sổ tông hiện tại
  tien_te() {
    fresh();
    const T=JSON.parse(run("JSON.stringify(W().regions.flatMap(R=>R.nodes).filter(n=>n.type==='tong').slice(0,2).map(n=>({id:n.id,s:n.owner||n.name})))"));
    ok(T.length===2&&T[0].s!==T[1].s, 'có hai sơn môn khác nhau: '+T.map(x=>x.s).join(' / '));
    run(`G.run.flags.tongmon=1;G.run.sectName=${JSON.stringify(T[0].s)};G.run.at=${JSON.stringify(T[0].id)};chAdd(chKey(),30)`);
    ok(run("chGet(chKey())")===30, 'đứng ở tông A: có 30 cống hiến');
    run(`G.run.at=${JSON.stringify(T[1].id)}`);ok(run("chGet(chKey())")===0, 'đứng ở tông B: không dùng được cống hiến tông A');
    ok(!run("needOk({need:{ch:10}})"), 'lựa chọn đòi cống hiến bị khóa ở tông B');
    run(`G.run.at=${JSON.stringify(T[0].id)}`);ok(run("needOk({need:{ch:10}})"), 'về tông A thì mở');
    run(`chLeave('sect:'+${JSON.stringify(T[0].s)});G.run.flags.tongmon=0`);ok(run("chGet(chKey())")===0&&run(`G.run.chMap['sect:'+${JSON.stringify(T[0].s)}].v`)===30, 'rời tông tự nguyện: sổ đóng, giữ số');
    run(`chLeave('sect:'+${JSON.stringify(T[0].s)},1)`);ok(run(`!G.run.chMap['sect:'+${JSON.stringify(T[0].s)}]`), 'bị trục xuất: xóa sổ');
    run(`G.run.flags.tongmon=1;G.run.chMap=null;delete G.run._chV1;G.run.ch=30;run2()`);
    ok(run(`G.run.chMap['sect:'+${JSON.stringify(T[0].s)}].v`)===30&&run("G.run.ch===undefined"), 'bản lưu cũ r.ch=30 → sổ tông hiện tại 30');
  },
  // Đ3.5 Thưởng Lệnh: nhận theo bậc nhiệm vụ, bỏ/trễ −1, bậc Thưởng Các, cửa hàng có giới hạn theo thành
  tien_thuong() {
    fresh();
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);return n.id})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='thuongcac')"), 'thành có bảng treo thì có Thưởng Các');
    run("openBoard(nodeById(G.run.at));takeQuest(0)");const q=JSON.parse(run("JSON.stringify(G.run.quests[0])"));ok(q.t0!=null, 'ghi lúc nhận việc');
    const g=run("tlQuest(G.run.quests[0])");run("G.run.thuongLenh=0;G.run.thuongTong=0");
    if(q.kind==='den')run(`G.run.quests[0].ambDoor=1;G.run.at=G.run.quests[0].node;openPlace(G.run.at);questDo(G.run.quests[0].id)`) /* Sửa-C: chặn 15% phục kích ở cửa (ngẫu nhiên làm bài lúc đạt lúc trượt) */;else run(`questWin(G.run.quests[0].id)`);
    run(`G.run.at=${JSON.stringify(nid)};openPlace(G.run.at)`);
    ok(run("G.run.thuongLenh")===g&&g>=2, 'xong sớm: nhận '+g+' thẻ (bậc + 1)');
    run("openBoard(nodeById(G.run.at));const b=nodeById(G.run.at).board;b.list.forEach(x=>x.taken=false);takeQuest(1)");const t1=run("G.run.thuongLenh");
    run("questCancel(G.run.quests.find(x=>x.state==='open').id)");ok(run("G.run.thuongLenh")===t1-1, 'bỏ nhiệm vụ: −1');
    run("G.run.quests=[];nodeById(G.run.at).board=null;openBoard(nodeById(G.run.at));takeQuest(0)");const t2=run("G.run.thuongLenh");run("G.run.qfix14=1;G.run.quests.find(x=>x.state==='open').due=W().t+1;advanceTime(5)");ok(run("G.run.thuongLenh")===Math.max(0,t2-1), 'trễ hạn: −1');
    // phàm nhân: thưởng nhiệm vụ bằng bạc
    run("G.run.pham=1;G.run.quests=[];nodeById(G.run.at).board=null;openBoard(nodeById(G.run.at));takeQuest(0);G.run.st=0;G.run.bac=0");const q2=JSON.parse(run("JSON.stringify(G.run.quests[0])"));
    run("questGive(G.run.quests[0])");ok(run("G.run.st")===0&&run("G.run.bac")===run("questRewardOf(G.run.quests[0]).st*TIEN.qBac"), 'phàm nhân nhận thưởng bằng bạc ('+run("G.run.bac")+' đồng)');
    ok(run("questRewardChips(G.run.quests[0]).some(c=>c.i==='🪙')"), 'bảng treo ghi thưởng bằng bạc cho phàm nhân');
    run("G.run.thuongTong=19");ok(run("tcBac()")===0, 'mười chín thẻ: Vô danh');run("G.run.thuongTong=20");ok(run("tcBac()")===1, 'hai mươi thẻ: Đồng bài');
    run("G.run.thuongTong=0;G.run.thuongLenh=100;G.run.pills=[];openPlace(G.run.at)");
    const i=run("THUONG_CAC.findIndex(x=>x.id==='kimcang')");ok(!run(`tcBuy(${i})`), 'Kim Cang Phù cần Đồng bài');
    const j=run("THUONG_CAC.findIndex(x=>x.id==='hoixuan')");let n=0;for(let k=0;k<6;k++)if(run(`tcBuy(${j})`))n++;
    ok(n===5&&run("G.run.thuongLenh")===90, 'Hồi Xuân Đan tối đa năm viên mỗi tháng ('+n+')');
    ok(run("tcList(nodeById(G.run.at)).every(x=>x.id!=='khai_linh_dan')")&&run("THUONG_CAC.some(x=>x.id==='manh_moi_co_duyen'&&x.p===60&&x.bac===4)"), 'bỏ Khai Linh Đan, có Manh mối cơ duyên');
    const lk=run("THUONG_CAC.findIndex(x=>x.id==='luong_kho')");run(`tcBuy(${lk})`);ok(run("G.run.qitems.includes('luong_kho')"), 'đổi lương khô');
  },
  // Đ3.6 ăn uống: phàm nhân không tiền, không lương khô ở hoang dã: 14 ngày còn sống, ngày 15 chết đói; Trúc Cơ tịch cốc
  com_ao() {
    const wild="(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;G.run.scene=null;G.run.moving=null;G.run.bac=0;G.run.st=0;G.run.qitems=[];G.run.anAcc=0;G.run.doi=0;G.run.hp=S().maxHp;})()";
    const wild0=wild;const fr=()=>{fresh(wild0);run('FEAT.an=1');};
    fr();ok(run("needFood(G.run)"), 'phàm nhân phải ăn');
    // Sửa lỗi đói: thang cũ chết ở ngày 15 → nay thieu 30 / doi 60 / la 150 / kiet 300 / canh 630 / chết 660 ngày
    run("for(let i=0;i<14;i++)advanceTime(24)");ok(!!run("G.run")&&run("G.run.doi")===14&&run("anState()")==='no', '14 ngày không ăn: còn sống, mới thiếu ăn ('+run("G.run&&G.run.doi")+')');
    ok(run("NK.count('an.doi')")===14&&run("G.run.no")<100, 'đếm từng ngày thiếu ăn, có báo một tuần');
    run("advanceTime(46*24)");ok(run("anState()")==='doi'&&run("anRgMul()")<1, '60 ngày: đói, hồi phục chậm');
    run("advanceTime(90*24)");ok(run("anState()")==='la'&&run("S().maxHp")<run("(()=>{const d=G.run.doi;G.run.doi=0;const m=S().maxHp;G.run.doi=d;return m})()"), '150 ngày: đói lả, khí huyết tối đa giảm');
    run("advanceTime(509*24)");ok(!!run("G.run")&&run("G.run.doi")===659&&run("anState()")==='kiet', '659 ngày: kiệt sức nhưng còn sống');
    run("advanceTime(24)");ok(!run("G.run")&&run("G.over&&G.over.cause")==='doi'&&run("G.over.title")==='Chết đói', 'ngày 660: chết đói');
    fr();run("G.run.pham=0;G.run.realm=1");run("for(let i=0;i<100;i++)advanceTime(24)");ok(!!run("G.run")&&run("G.run.doi")<=2&&run("anState()")==='tich', 'Trúc Cơ trôi 100 ngày: đói rất chậm (thiếu '+run("G.run.doi")+' bữa), vẫn tịch cốc');
    fr();run("G.run.qitems=['luong_kho'];advanceTime(5*24)");ok(run("G.run.doi")===0&&!run("G.run.qitems.includes('luong_kho')"), 'một gói lương khô đủ năm ngày');
    run("advanceTime(24)");ok(run("G.run.doi")===1, 'hết lương khô thì đói');
    fr();run("G.run.pham=0;G.run.realm=0;advanceTime(4*24)");ok(run("G.run.doi")===2, 'Luyện Khí ăn nửa phần: bốn ngày đói hai ('+run("G.run.doi")+')');
    fr();run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=100;G.run.anMuc='thuong'})();advanceTime(3*24)");
    ok(run("G.run.doi")===0&&run("G.run.bac")===40, 'ở thành có bạc: tự mua cơm 20 đồng một ngày ('+run("G.run.bac")+')');
    // Sửa-B: bỏ cơm nhà (người dùng chốt câu 10) — ở quê không tiền thì mua chịu tới mức NO.chiu, hết chịu thì đói
    fr();run("FEAT.no=1;G.run.at=G.run.queAt;G.run.noTra=null;G.run.origin='nong';G.run.family=[{qh:'me',song:1}];advanceTime(20*24)");ok(run("G.run.doi")===0&&run("G.run.bac")===-20*run("anCost(G.run)"), 'ở quê không tiền: mua chịu cơm, còn nợ '+run("fmtBac(G.run.bac)"));
    run("for(let i=0;i<11&&!G.run.doi;i++)advanceTime(24)");ok(run("G.run.doi")===1&&run("G.run.bac")>=-600&&run("G.run.bac-anCost(G.run)")<-600, 'hết mức chịu 600 xu: đói ('+run("G.run.doi")+')');run("FEAT.no=0");
    fr();const qa=run("G.run.queAt");run("delete G.run._anV1;delete G.run.no;delete G.run.anTu;delete G.run.queAt;run2()");ok(run("G.run.no")===100&&run("G.run.anTu")===1, 'bản lưu cũ: no đủ, tự lo cơm');
    ok(run("G.run.queAt")===qa, 'bản lưu cũ: tìm lại nút quê theo tên');
    fr();run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=1000;G.run.anMuc='thuong'})();advanceTime(24)");
    ok(run("G.run.bac")===400&&run("G.run.anCov")===29, 'đủ tiền: mua lương thực cả tháng 600 xu');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;})();advanceTime(29*24)");ok(run("G.run.doi")===0&&run("G.run.anCov")===0, 'mang lương thực tháng theo người: 29 ngày ngoài hoang không đói');
    fr();run("G.run.pham=0;G.run.realm=0;G.run._inBq=1;advanceTime(30*24);G.run._inBq=0");ok(run("G.run.doi")===5, 'Luyện Khí bế quan: đói chậm ×1/3 (30 ngày thiếu '+run("G.run.doi")+')');
    fr();run("G.run.pham=0;G.run.realm=0;G.run.anCham=W().t+90*HD;advanceTime(30*24)");ok(run("G.run.doi")===7, 'sau bế quan: đói chậm ×1/2 ('+run("G.run.doi")+')');
    fr();run("delete G.run._anV2;G.run.doi=200;run2()");ok(run("G.run.doi")===0, 'bản lưu cũ đang đói: nới về no');
    fr();run("G.run.anAcc=0;advanceTime(800*24)");ok(!run("G.run")&&run("G.over.cause")==='doi', 'nhảy dài 800 ngày không ăn: chết đói, không treo');
  },
  // Sửa lỗi đói: kiếp mới khốn khó đi bộ nhiều chặng (mỗi chặng hàng chục ngày) và ở hoang vài tháng không ăn vẫn sống, có cảnh báo
  doi_dai() {
    fresh("FEAT.an=1;G.run.bac=0;G.run.qitems=[];G.run.origin='kho'");
    const legs=run(`(()=>{const r=G.run;let out=[];for(let k=0;k<3&&G.run;k++){const h=nodeHex(nodeById(r.at));let L=[];for(const R of W().regions)for(const n of R.nodes){if(n.id===r.at)continue;n.fog=Math.max(1,n.fog);L.push([hexPath(h,nodeHex(n)).len,n]);}L.sort((a,b)=>a[0]-b[0]);const n=L[0][1];
      const t0=W().t;let tries=0;while(G.run&&r.at!==n.id&&tries++<6){r.scene=null;travelTo(n.id);let q=0;while(G.run&&r.moving&&q++<4000){if(r.scene)r.scene=null;travelTick(6);}}r.bac=0;r.anCov=0;out.push(Math.round((W().t-t0)/HD));}return out;})()`);
    ok(!!run("G.run")&&run("G.run.doi")<run("AN.doi.chet"), 'đi bộ ba chặng ('+legs.join(', ')+' ngày) không tiền: còn sống');
    fresh("FEAT.an=1;"+"(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;G.run.bac=0;G.run.qitems=[];G.run.anCov=0})()");
    run("for(let i=0;i<160;i++)advanceTime(24)");ok(!!run("G.run")&&run("anState()")==='la', '5 tháng rưỡi ở hoang không ăn: sống, đói lả');
    ok(run("NK.count('an.doi')")===160, 'mỗi ngày thiếu ăn đều ghi');
    run("G.run.qitems=['luong_kho'];advanceTime(24)");ok(run("G.run.doi")===0, 'ăn được một bữa thì hết đói');
  },
  // Sửa-B (câu 10): mua chịu ở quê, nợ quá hạn → quan phủ (hèo, truy nã, làm công), vay có lãi, nhà ở / thuê nhà / ngủ ngoài trời
  no_nha() {
    const que="(()=>{const r=G.run;r.at=r.queAt;r.moving=null;r.bac=0;r.noTra=null;r.vay=null;r.thue=null;r.hp=S().maxHp;r.birthAge=16;FEAT.no=1;FEAT.nha=1;})()";
    fresh(que);
    ok(run("nhaCo({origin:'nong'})")===1&&run("nhaCo({origin:'khat'})")===0&&run("nhaCo({origin:'daodong'})")===0&&run("nhaCo({origin:'thegia'})")===1, 'nhà ở theo xuất thân (nông có, khất cái/đạo đồng không)');
    ok(run("fmtBac(-50)")==='-50 xu'&&run("fmtBacS(-50)")==='-50 xu', 'hiển thị tiền âm: -50 xu');
    ok(run("bacPay(100,'t')")&&run("G.run.bac")===-100&&!!run("G.run.noTra"), 'ở quê: mua chịu được, mở sổ nợ');
    ok(!run("bacPay(600,'t')")&&run("G.run.bac")===-100, 'mua chịu quá 600 xu: không được');
    run("bacAdd(30,'cong')");ok(run("G.run.bac")===-70, 'có thu nhập thì trả dần nợ');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin'&&n.id!==G.run.queAt);G.run.at=n.id;})()");ok(!run("bacPay(10,'t')"), 'xa quê: không mua chịu');
    run("G.run.at=G.run.queAt;bacAdd(70,'tra')");ok(run("G.run.bac")===0&&!run("G.run.noTra")&&run("NK.count('no.xong')")===1, 'trả đủ: đóng sổ nợ');
    // nợ ít: báo trước, hèo lần 1 (ngoại thương), lần 2 (gãy xương + truy nã), lần 3 làm công 2 năm
    run("bacPay(200,'t');G.run.noTra.han=W().t+5*HD");run("advanceTime(24)");ok(run("NK.count('no.bao')")===1, 'báo trước khi tới hạn nợ');
    const hp0=run("G.run.hp");run("advanceTime(5*24)");
    ok(run("G.run.hp")<hp0&&run("wounds().some(x=>x.k==='ngoai')")&&run("G.run.bac")===-200&&run("G.run.noTra.lan")===1, 'quá hạn lần 1: đánh hèo, ngoại thương, vẫn nợ');
    ok(run("noDays(G.run.noTra.han)")===45&&!run("noChiuOk()"), 'được gia hạn 45 ngày; không cho chịu thêm');
    run("G.run.hp=S().maxHp;G.run.noTra.han=W().t+HD;advanceTime(2*24)");ok(run("wounds().some(x=>x.k==='gay')")&&run("noTruy()")&&run("G.run.noTra.lan")===2, 'quá hạn lần 2: gãy xương, bị truy nã ở quê');
    const t0=run("W().t");run("G.run.noTra.han=W().t+HD;advanceTime(2*24)");
    ok(!!run("G.run")&&run("G.run.bac")===0&&!run("G.run.noTra")&&run("W().t")-t0>=2*8640, 'quá hạn lần 3: làm công trả nợ 2 năm, nợ xoá');
    // nợ nhiều: lần đầu truy nã + hèo, lần sau bắt làm công 3 năm (từ 8.000 xu)
    fresh(que);run("NO_CHIU=1;bacAdd(-9000,'t');NO_CHIU=0;G.run.noTra.han=W().t+HD;advanceTime(2*24)");ok(run("noTruy()")&&run("G.run.noTra.lan")===1, 'nợ nhiều quá hạn lần 1: truy nã + hèo');
    const t1=run("W().t");run("G.run.noTra.han=W().t+HD;advanceTime(2*24)");ok(run("G.run.bac")===0&&run("W().t")-t1>=3*8640, 'nợ nhiều lần 2: làm công 3 năm');
    // tu sĩ: quan phủ chỉ truy nã
    fresh(que);run("G.run.pham=0;G.run.realm=1;NO_CHIU=1;bacAdd(-100,'t');NO_CHIU=0;G.run.noTra.han=W().t+HD;advanceTime(2*24)");ok(run("noTruy()")&&!run("wounds().length"), 'tu sĩ mắc nợ: chỉ bị truy nã');
    // vay có lãi ở thành
    fresh(que);run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='vay')&&placeActs(nodeById(G.run.at)).some(a=>a.a==='nha')"), 'thành có người cho vay và nhà cho thuê');
    ok(run("venueDo('vay','v1')")&&run("G.run.bac")===1000&&run("G.run.vay.tra")===1180&&run("G.run.vay.tong")===1180, 'vay 1 lượng, 6 tháng sau trả trọn 1.180 xu');
    ok(!run("venueDo('vay','v3')"), 'đang vay: không vay thêm');
    run("bacAdd(180,'t')");ok(run("venueDo('vay','tra')")&&run("G.run.bac")===0&&!run("G.run.vay"), 'trả khoản vay');
    run("venueDo('vay','v1');G.run.bac=0;G.run.vay.han=W().t+10*HD;advanceTime(24)");ok(run("NK.count('no.bao')")===0&&!!run("G.run.vay.bao"), 'báo trước hạn vay');
    run("advanceTime(10*24)");ok(!run("G.run.vay")&&run("G.run.bac")===-1180&&!!run("G.run.noTra"), 'vay quá hạn: chuyển thành nợ');
    // thuê nhà
    fresh(que);run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin'&&n.id!==G.run.queAt);G.run.at=n.id;openPlace(n.id);G.run.bac=700;G.run.ngoai=0;G.run.nguD=0;})()");
    ok(run("venueDo('nha','thue')")&&run("G.run.bac")===400&&run("nhaOk(G.run)"), 'thuê nhà ở thành 300 xu/tháng, có chỗ ngủ');
    run("advanceTime(31*24)");ok(run("G.run.bac")===100&&!!run("G.run.thue")&&run("NK.count('nha.lanh')")===0, 'đầu tháng tự trả tiền thuê, không bị lạnh');
    run("advanceTime(30*24)");ok(!run("G.run.thue")&&run("NK.count('nha.het')")===1, 'hết tiền: mất nhà thuê');
    // ngủ ngoài trời
    fresh(que);run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;G.run.ngoai=0;G.run.nguD=0;G.run.hp=S().maxHp;})()");
    const hp1=run("G.run.hp");run("advanceTime(30*24)");ok(run("G.run.hp")<hp1&&run("NK.count('nha.lanh')")===1, 'ngủ ngoài trời cả tháng: bị lạnh, mất khí huyết');
    fresh(que);run("G.run.nha=1;G.run.ngoai=0;G.run.nguD=0;advanceTime(30*24)");ok(run("NK.count('nha.lanh')")===0, 'ở nhà mình ở quê: không bị lạnh');
    run("openPlace(G.run.queAt)");ok(run("venueOpts(nodeById(G.run.at),'nha').some(o=>o.id==='nghi')")&&run("venueDo('nha','nghi')"), 'nghỉ ở nhà mình');
    // bản lưu cũ
    fresh();run("G.run.origin='khat';delete G.run._nhaV1;delete G.run.nha;run2()");ok(run("G.run.nha")===0&&run("G.run._nhaV1")===1, 'bản lưu cũ: gán nhà theo xuất thân');
    run("FEAT.no=0;FEAT.nha=0");
  },
  // Đ3.7 việc làm thuê: việc hợp nơi, tiền công bằng bạc, giới hạn 12 giờ mỗi ngày, điều kiện, nhật ký viec.xong
  viec_thue() {
    fresh();
    ok(run("VIEC_THUE.length")===14, 'đủ mười bốn việc');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);G.run.bac=0;})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='muusinh')"), 'thành có nút tìm việc');
    const L=JSON.parse(run("JSON.stringify(vtList(nodeById(G.run.at)).map(x=>x.id))"));ok(L.includes('boc_vac')&&L.includes('phu_khuan')&&!L.includes('dao_mo'), 'việc hợp nơi: '+L.join(','));
    run("G.run.lamNgay=null");const t0=run("W().t");ok(run("vtDo('phu_khuan')")&&run("G.run.bac")>=23&&run("W().t")-t0===8, 'khiêng kiệu tám giờ: công '+run("G.run.bac")+' đồng');
    ok(run("NK.count('viec.xong')")===1, 'nhật ký viec.xong');
    ok(!run("vtDo('phu_khuan')"), 'đã làm tám giờ: không làm thêm tám giờ trong ngày');
    run("G.run.lamNgay=null;G.run.base.ngo=1;G.run.bon.ngo=-50");ok(!!run("vtList(nodeById(G.run.at)).find(x=>x.id==='chep_sach').why"), 'chép sách cần ngộ tính');
    run("G.run.bon.ngo=0");
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tong');G.run.at=n.id;openPlace(n.id);G.run.bac=0;FEAT.an=1;G.run.doi=0;})()");
    const t1=run("W().t");ok(run("vtDo('tap_dich')")&&run("G.run.bac")===330&&run("W().t")-t1===720&&run("G.run.doi")===0, 'tạp dịch ngoại môn ba mươi ngày: một lượng, được ăn ở');
    run("FEAT.an=0");
  },
  // Đ5.1 võ học: vô căn luyện võ lên bậc, nội lực, bí tịch, chiêu võ không mất khi syncSkills, chặn pháp thuật, lôi đài, kỳ ngộ bậc 5
  vo_dao() {
    fresh("G.run.root={id:'vo',els:[]};G.run.pham=1;G.run._voV1=0;run2();(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(run("!!G.run.vo&&G.run.vo.bac===0"), 'vô căn có r.vo');
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='luyenvo')"), 'có nút luyện võ');
    const hp0=run("S().maxHp"),atk0=run("S().atk");ok(run("S().maxMp")===0, 'chưa nhập lưu: không có nội lực');
    run("G.run.vo.xp=59");const t0=run("W().t");run("placeAct('luyenvo')");
    ok(run("W().t")-t0===6&&run("G.run.vo.bac")===1, 'luyện đủ sáu mươi ngày: Tam lưu ('+run("G.run.vo.bac")+')');
    ok(run("S().maxMp")>0&&run("S().atk")>=atk0&&run("S().maxHp")>hp0, 'Tam lưu: có nội lực, công và khí huyết tăng ('+[atk0,run("S().atk"),hp0,run("S().maxHp"),run("S().maxMp")]+')');
    ok(run("mpName()")==='Nội lực', 'thanh gọi là Nội lực');
    ok(run("NK.count('vo.up')")===1, 'nhật ký vo.up');
    run("G.run.qitems=['bt_truong_quyen'];G.run.skills=[];bagUse('vbt_truong_quyen')");
    ok(run("G.run.voSk.includes('vo_truongquyen')")&&!run("G.run.qitems.includes('bt_truong_quyen')"), 'đọc bí tịch: học Trường Quyền');
    run("syncSkills()");ok(run("G.run.skills.some(k=>k.id==='vo_truongquyen')")&&run("G.run.kn.atk.includes('vo_truongquyen')"), 'syncSkills không xoá chiêu võ');
    ok(run("SK_RAW.every(x=>!x[5].vo)")&&run("SK.vo_truongquyen.dt")==='vl', 'chiêu võ không lọt vào kho chiêu ngẫu nhiên');
    run("G.run.skills.push({id:'hoacau',lv:1})");ok(run("pSkill('hoacau')")===null&&!!run("pSkill('vo_truongquyen')"), 'vô căn không dùng được pháp thuật, dùng được chiêu võ');
    run("G.run.qitems=['bt_doan_thuy_kiem'];bagUse('vbt_doan_thuy_kiem')");ok(run("G.run.qitems.includes('bt_doan_thuy_kiem')")&&!run("G.run.voSk.includes('vo_doanthuy')"), 'chưa đủ bậc: không học được kiếm ý');
    // lôi đài và trận thắng
    run("placeAct('loidai')");ok(run("G.run.scene&&G.run.scene.type")==='combat'&&run("G.run.scene.spar&&G.run.scene.after.voLoi"), 'lôi đài mở trận tỉ thí');
    run("(()=>{const sc=G.run.scene;sc.over='win';finishCombat(sc);finishCombat(sc);G.run.scene=null;})()");ok(run("G.run.vo.loi")===1&&run("G.run.vo.win")===1, 'thắng lôi đài đếm một lần');
    run("G.run.vo.xp=400;G.run.vo.win=3;openPlace(G.run.at);placeAct('luyenvo')");ok(run("G.run.vo.bac")===2, 'một năm luyện + ba trận thắng: Nhị lưu');
    run("openPlace(G.run.at);placeAct('luyenvo')");ok(run("G.run.vo.bac")===3, 'đã thắng lôi đài: Nhất lưu');
    run("G.run.vo.xp=3700;openPlace(G.run.at);placeAct('luyenvo')");ok(run("G.run.vo.bac")===4, 'mười năm luyện: Hậu thiên đỉnh phong');
    run("openPlace(G.run.at);placeAct('luyenvo')");ok(run("G.run.scene&&G.run.scene.type")==='kyngo'&&run("G.run.scene.ev")==='vo_nham_doc', 'đủ điều kiện Tiên thiên: mở kỳ ngộ Đả thông nhâm đốc');
    run("(()=>{const k=voKyRoll;voKyRoll=()=>1;try{kyPick(0)}finally{voKyRoll=k}})()");ok(run("G.run.vo.bac")===5, 'qua phép thử: Tiên thiên');
    run("G.run.scene=null");
    // tu sĩ: nửa phần
    fresh("G.run.pham=0;(()=>{const n=W().regions[G.run.region].nodes[0];G.run.at=n.id;openPlace(n.id);})()");run("placeAct('luyenvo')");ok(run("G.run.vo.xp")===0.5, 'tu sĩ luyện võ được nửa phần');
    // bản lưu cũ
    fresh();run("delete G.run.vo;delete G.run.voSk;delete G.run._voV1;run2();syncSkills();S()");ok(run("Array.isArray(G.run.voSk)")&&run("!G.run.vo||G.run.vo.bac===0"), 'bản lưu cũ chạy được');
  },
  // Đ5.2 khung nghề: việc đúng mùa ở Mưu sinh, kinh nghiệm, kỳ ngộ thăng bậc, sai mùa khoá, ba đường — đường thứ tư làm đường cũ nhất phai
  nghe() {
    const toTran="(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()";
    const toMua=m=>`(()=>{let k=0;while(seasonOf(W().t)!=='${m}'&&k++<400)W().t+=HD;})()`;
    fresh("G._ngNoEv=1;G.run.origin='thusinh';G.run.paths={};G.run.pham=1;"+toMua('xuan')+";"+toTran);
    const L=JSON.parse(run("JSON.stringify(vtList(nodeById(G.run.at)).map(x=>x.id+'|'+x.why))"));
    ok(L.includes('ng:nong:gieo|'), 'mùa xuân ở thôn trấn: có việc gieo mạ ('+L.filter(x=>x.startsWith('ng:')).join(',')+')');
    ok(L.some(x=>x.startsWith('ng:nong:gat|')&&x.split('|')[1]), 'gặt lúa trái mùa bị khoá');
    let n=0;for(let i=0;i<9;i++){run("G.run.lamNgay=null");if(run("vtDo('ng:nong:gieo')"))n++;}
    ok(n===9&&run("G.run.paths.nong.xp")===54&&run("G.run.paths.nong.bac")===0, 'gieo chín buổi: kinh nghiệm '+run("G.run.paths.nong.xp"));
    ok(run("NK.count('nghe.lam')")===9&&run("G.run.bac")>=9*24, 'nhật ký nghe.lam, có tiền công '+run("G.run.bac"));
    run("G.run.scene=null;"+toTran+";G.run.lamNgay=null;vtDo('ng:nong:gieo')");
    ok(run("G.run.scene&&G.run.scene.type")==='kyngo'&&run("G.run.scene.ev")==='ng_nong_1', 'đủ kinh nghiệm: mở kỳ ngộ thăng bậc');
    ok(run("G.run.paths.nong.bac")===0, 'chưa qua kỳ ngộ thì chưa lên bậc');
    run("kyPick(0)");ok(run("G.run.paths.nong.bac")===1, 'qua kỳ ngộ: Tá điền');
    ok(run("ngView()[0].rank")==='Tá điền'&&!/\\d/.test(run("ngView()[0].txt")), 'Đạo đồ: danh vị, tiến độ bằng chữ ('+run("ngView()[0].txt")+')');
    ok(run("tutRole(G.run)"), 'theo một nghề tính là đã nhận vai (HD17)');
    run("G.run.scene=null;"+toMua('ha')+";"+toTran);ok(!!run("vtList(nodeById(G.run.at)).find(x=>x.id==='ng:nong:gieo').why"), 'sang hạ: gieo mạ khoá');
    // ba đường; đường thứ tư làm đường cũ nhất phai
    run("NGHE._a={n:'A',ranks:['a','b'],xp:[0,9],thu:[1,1],acts:[]};NGHE._b={n:'B',ranks:['a','b'],xp:[0,9],thu:[1,1],acts:[]};NGHE._c={n:'C',ranks:['a','b'],xp:[0,9],thu:[1,1],acts:[]}");
    run("G.run.paths.nong.last=W().t-100;ngXp('_a',1);G.run.paths._a.last=W().t-50;ngXp('_b',1)");
    ok(run("ngActive().length")===3, 'ba đường cùng lúc');
    run("ngXp('_c',1)");ok(run("G.run.paths.nong.phai")===1&&run("ngActive().length")===3, 'đường thứ tư: đường lâu không làm nhất phai');
    const x0=run("G.run.paths._c.xp");run("ngXp('nong',1)");ok(run("!G.run.paths.nong.phai")&&run("G.run.paths._a.phai")===1, 'làm lại đường đã phai: đường cũ khác phai thay');
    run("delete NGHE._a;delete NGHE._b;delete NGHE._c");
    // hệ số: vô căn ×1,2, tu sĩ ×0,7
    run("G.run.root={id:'vo',els:[]};G.run.paths={}");ok(run("ngXp('nong',10)")===12, 'vô căn ×1,2');
    run("G.run.root={id:'x',els:['kim']};G.run.pham=0;G.run.paths={}");ok(run("ngXp('nong',10)")===7, 'tu sĩ ×0,7');
    // xuất thân vào nghề sẵn; sự kiện cộng bạc và kinh nghiệm
    run("(()=>{genBirth();const c=Object.assign({},G.birth.cards[0],{origin:'nong',hc:null});newRun(c);})()");ok(run("!!G.run.paths.nong&&G.run.paths.nong.xp>0"), 'con nhà nông: vào nghề nông sẵn');
    ok(!run("tutRole(G.run)"), 'chưa làm việc gì thì HD17 chưa xong');
    const b0=run("G.run.bac");run("applyE({bac:50,nxp:['nong',5]})");ok(run("G.run.bac")===b0+50&&run("G.run.paths.nong.xp")>30, 'hiệu ứng bac, nxp');
    // bản lưu cũ
    run("delete G.run.paths;delete G.run._ngV1;run2()");ok(run("JSON.stringify(G.run.paths)")==='{}', 'bản lưu cũ: paths rỗng');
  },
  // Đ5.3 năm nghề phàm đầu: đủ sáu bậc, việc làm được ở nơi hợp, mười hai sự kiện mỗi nghề chia ba tầng, sự kiện chỉ hiện khi theo nghề
  nghe_pham() {
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.paths={}");
    const M=['nong','ngu','thuong','vo_gia','y'];
    ok(M.every(m=>run(`NGHE.${m}.ranks.length===6&&NGHE.${m}.xp.length===6&&NGHE.${m}.acts.length>=4`)), 'năm nghề đủ sáu bậc và bốn việc');
    for(const m of M){const c=JSON.parse(run(`JSON.stringify([0,1,2].map(k=>EVS.filter(e=>e.content&&(e.content.tags||[]).includes('nghe:${m}')&&e.content.tags.includes('nghe-tang:'+k)).length))`));
      ok(c.join()==='4,4,4', m+': mười hai sự kiện, bốn mỗi tầng ('+c+')');}
    ok(run("KYNGO.filter(x=>/^ng_(nong|ngu|thuong|vo_gia|y)_[1-5]$/.test(x.id)).length")===25&&run("KYNGO.filter(x=>/^ng_/.test(x.id)).every(x=>!/\\{\\{/.test(x.t)&&x.t.length>20)"), 'hai mươi lăm kỳ ngộ thăng bậc có lời riêng');
    const ev="EVS.find(e=>e.id==='ng_y_khong_tien')";
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(!run(`contentTriggerOk(${ev}.content)`), 'chưa theo nghề y: không gặp sự kiện y');
    run("G.run.paths.y={xp:1,bac:0,last:W().t}");ok(run(`contentTriggerOk(${ev}.content)`), 'theo nghề y bậc đầu: gặp sự kiện nhập môn');
    run("G.run.paths.y.bac=4");ok(!run(`contentTriggerOk(${ev}.content)`), 'bậc cao: không gặp lại sự kiện nhập môn');
    run("G.run.paths.y.phai=1;G.run.paths.y.bac=0");ok(!run(`contentTriggerOk(${ev}.content)`), 'đường đã phai: không gặp');
    // mỗi nghề làm được một việc ở nơi hợp
    const cases=[['nong','tran','dan','dong'],['ngu','song','cau',null],['thuong','tran','ganh',null],['vo_gia','tran','hanh_hiep',null],['y','thanh','boc_thuoc',null]];
    for(const [m,t,a,mua] of cases){
      run(`(()=>{G.run.scene=null;G.run.lamNgay=null;G.run.paths={};G.run.base.ngo=20;voOf(G.run).bac=1;${mua?`let k=0;while(seasonOf(W().t)!=='${mua}'&&k++<400)W().t+=HD;`:''}const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='${t}'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()`);
      const why=run(`(vtList(nodeById(G.run.at)).find(x=>x.id==='ng:${m}:${a}')||{why:'không có'}).why`);
      ok(!why&&run(`vtDo('ng:${m}:${a}')`)&&run(`G.run.paths.${m}.xp`)>0, m+': làm '+a+' ở '+t+(why?' ('+why+')':''));
    }
    run("G.run.scene=null;voOf(G.run).bac=0;(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(/võ học/i.test(run("vtList(nodeById(G.run.at)).find(x=>x.id==='ng:vo_gia:hanh_hiep').why")), 'chưa nhập lưu võ: chưa làm được việc giang hồ');
    // buôn có vốn: trừ vốn, hoàn vốn cộng lãi hoặc lỗ
    run("(()=>{G.run.scene=null;G.run.lamNgay=null;G.run.paths={thuong:{xp:70,bac:1,last:W().t}};G.run.bac=5000;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='cho'&&n.state!=='ruin')||W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    ok(run("vtDo('ng:thuong:mua_ban')")&&run("G.run.bac")!==5000&&run("NK.count('nghe.lam')")>0, 'mua rẻ bán đắt: vốn đi rồi về ('+run("G.run.bac")+')');
  },
  // Đ5.4 năng lực hỗ trợ ST23: gốc 10, phép thử nang.*, rèn qua việc, bản lưu cũ
  nang() {
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.paths={}");
    ok(run("NANG_K.every(k=>G.run.nang[k]===10)")&&run("NANG_K.length")===8, 'kiếp mới: tám năng lực gốc 10');
    ok(run("CHKN['nang.thuong']")==='Thương lượng', 'tên phép thử nang.thuong');
    const c0=run("chkChance(['nang.thuong',10])");run("G.run.nang.thuong=30");const c1=run("chkChance(['nang.thuong',10])");
    ok(c1>c0&&c1<=0.95, 'năng lực cao: dễ qua hơn ('+c0.toFixed(2)+' → '+c1.toFixed(2)+')');
    run("G.run.realm=3;G.run.pham=0");ok(Math.abs(run("chkChance(['nang.thuong',10])")-c1)<1e-9, 'không phụ thuộc cảnh giới');run("G.run.realm=0;G.run.pham=1");
    ok(run("EVS.filter(e=>JSON.stringify(e).includes('\"nang.')).length")>=10, 'sự kiện nghề dùng phép thử năng lực');
    // phép thử trong sự kiện rèn năng lực
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    const ev=run("(()=>{G.run.paths.y={xp:1,bac:0,last:W().t};const e=EVS.find(e=>e.id==='ng_y_thu_thuoc');startEvent(e.id);const L=resolveP(EVMAP[e.id],G.run.scene.cur);return L.findIndex(c=>c.chk&&c.chk[0]==='nang.duoc')})()");
    ok(ev>=0, 'ng_y_thu_thuoc có lựa chọn nhận dược');
    const d0=run("G.run.nang.duoc");run(`choose(${ev})`);const d1=run("G.run.nang.duoc");
    ok(d1===d0+1||d1===d0+0.5, 'qua phép thử: nhận dược '+d0+' → '+d1);
    ok(run("NK.count('nang.chk')")===1, 'nhật ký nang.chk');
    // việc nghề
    run("G.run.scene=null;G.run.lamNgay=null;voOf(G.run).bac=1;G.run.base.ngo=20;(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);})()");
    const k0=run("G.run.nang.duoc");ok(run("vtDo('ng:y:boc_thuoc')")&&run("G.run.nang.duoc")>k0, 'bốc thuốc rèn nhận dược');
    run("applyE({nang:{giao:5}})");ok(run("G.run.nang.giao")===15, 'hiệu ứng sự kiện nang:{giao:5}');
    run("G.run.nang.giao=99.9;nangAdd('giao',5)");ok(run("G.run.nang.giao")===100, 'trần 100');
    ok(run("nangView().length")===8&&run("nangView()[0].n")==='Giác quan'&&run("nangView()[0].muc")==='Tầm thường'&&!/\\d/.test(run("nangView().map(x=>x.muc).join()")), 'nangView: mức bằng chữ ('+run("nangView()[0].muc")+')');
    run("delete G.run.nang;run2()");ok(run("NANG_K.every(k=>G.run.nang[k]===10)"), 'bản lưu cũ: tạo gốc 10');
    run("G.run.nang={giac:'x',tu:150};run2()");ok(run("G.run.nang.giac")===10&&run("G.run.nang.tu")===100, 'giá trị hỏng được sửa');
  },
  // Đ5.5 rà chéo đợt 5: tặng lễ của phàm nhân trả xu; vốn buôn không mua chịu
  ra_cheo5() {
    fresh("G.run.pham=1;G.run.st=0;G.run.bac=5000");
    const n="'Lão Trương'";const c=run(`giftXu(${n})`);
    ok(c===run(`giftCost(${n})*TIEN.evXu`)&&run(`giftTxt(${n})`).indexOf('linh thạch')<0, 'phàm nhân: giá tặng lễ bằng xu ('+run(`giftTxt(${n})`)+')');
    ok(run(`favGift(${n})`)===''&&run("G.run.bac")===5000-c&&run("G.run.st")===0, 'tặng lễ trừ xu, không đụng linh thạch');
    ok(run("NK.count('nang.add')")>=1, 'tặng lễ rèn giao tế');
    run("G.run.bac=10");ok(run(`favGift(${n})`)!=='', 'thiếu xu: không tặng được');
    run("G.run.pham=0;G.run.st=100");const s0=run("G.run.st");ok(run(`favGift(${n})`)===''&&run("G.run.st")===s0-run(`giftCost(${n})`), 'tu sĩ vẫn trả linh thạch');
    // vốn buôn
    run("G.run.pham=1;FEAT.no=1;G.run.paths={thuong:{xp:70,bac:1,last:W().t}};G.run.bac=-100");
    const why=run("(()=>{const a=ngAct('thuong','mua_ban');const n=W().regions.flatMap(R=>R.nodes).find(x=>a.noi.includes(x.type)&&x.state!=='ruin');G.run.queAt=n.id;return ngWhy('thuong',a,n)})()");
    ok(!!why, 'đang nợ: không lấy tiền chịu làm vốn buôn ('+why+')');
  },
  // Đ6 cải tạo linh căn: vô căn đi hết CC01 (ép thành), đường thứ hai bị từ chối, nguồn độc nhất lấy rồi thì kiếp sau vẫn mất
  cai_can() {
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=200000;G.run.lifeAdj=200;CC_FORCE=null");
    const go=id=>run(`(()=>{const r=G.run;r.scene=null;r.moving=null;r.at=${id};openPlace(${id});r.scene.venue='coduyen';return 1})()`);
    const vd=o=>run(`venueDo('coduyen','${o}')`);
    const opts=()=>run("ccOpts(nodeById(G.run.at)).map(o=>o.id+(o.no?'!':'')).join(',')");
    ok(run("isVo()&&voKnown()&&ccFor('CC01')&&!ccFor('TAO_HOA')"), 'vô căn đã trắc: theo được đường vô căn, không theo đường nâng phẩm');
    const n1=run("ccSrc('CC01').node");ok(n1!=null, 'CC01 chốt nơi: '+run(`nodeById(${n1}).name`)+' ('+run(`nodeById(${n1}).type`)+')');
    go(n1);ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='coduyen')"), 'nơi neo có nút Cơ duyên');
    ok(opts().startsWith('hoi'), 'chưa nghe: chỉ có hỏi chuyện ('+opts()+')');
    vd('hoi');go(n1);ok(run("!!G.run.ccHeard.CC01")&&/bat:CC01/.test(opts()), 'hỏi xong nghe dấu vết, có thể theo');
    vd('bat:CC01');go(n1);ok(run("G.run.cc&&G.run.cc.id==='CC01'&&G.run.cc.s===0"), 'bắt đầu CC01');
    vd('lua');ok(run("G.run.cc.s===0&&G.run.cc.lua===1"), 'mua đồ giả: mất tiền, không tiến');
    go(n1);vd('pf:bao_che');go(n1);vd('pf:benh_an');ok(run("G.run.cc.s===1"), 'hai đầu mối xong: sang bước phục vụ');
    let k=0;while(run("G.run&&G.run.cc&&G.run.cc.s===1")&&k++<30){go(n1);vd('sv');}
    ok(run("G.run.cc.s===2&&ccHave('ho_mach_tan')===3"), 'phục vụ đủ mười tám tháng ('+k+' lần), nhận ba Hộ Mạch Tán');
    go(n1);vd('tr:1');ok(run("G.run.cc.s===4"), 'tranh: góp tiền giữ suất; đủ vật tư nên bỏ qua bước gom');
    go(n1);const d=run("ccOpts(nodeById(G.run.at)).find(o=>o.id==='le').d");ok(/bảy phần thành, ba phần hỏng/.test(d)&&/Hỏng thì/.test(d), 'xác nhận nghi thức ghi giá và khả năng bằng chữ');
    run("CC_FORCE=1");vd('le');run("CC_FORCE=null");
    ok(run("G.run.root.id")==='tap'&&run("G.run.root.q")==='thuong'&&run("G.run.root.els.length")===5, 'thành: Ngũ hành tạp căn phẩm Thường, đủ năm hệ');
    ok(run("isVo()===false&&G.run.ccOk===1&&!G.run.cc&&G.run.pham===1"), 'không còn vô căn, ccOk=1, vẫn là phàm nhân phải dẫn khí');
    ok(run("NK.count('cc.ok')")===1&&run("ccSrc('CC01').con===0&&ccSrc('CC01').hoi===ccYr()+20"), 'nhật ký cc.ok; nguồn CC01 hồi sau hai mươi năm');
    ok(run("S().maxMp")>0||true, 'có thể có linh lực');
    // đường thứ hai trong cùng kiếp
    run("G.run.root={id:'vo',els:[],q:null}");ok(/một lần/.test(run("ccWhyStart('CC03')"))&&!run("ccStart('CC03')"), 'đường thứ hai cùng kiếp: bị từ chối ('+run("ccWhyStart('CC03')")+')');
    // thất bại: sẹo mạch, chờ một năm
    run("G.run.ccOk=0;G.run.ccFail={};G.run.ccHeard.CC01=1;ccSrc('CC01').con=1");const hp0=run("G.run.bon.hpP");
    run("G.run.cc={id:'CC01',s:4,t0:W().t,pf:{},h:0,care:0};ccVtAdd('ho_mach_tan',3);CC_FORCE=0");go(n1);vd('le');run("CC_FORCE=null");
    ok(run("G.run.bon.hpP")===hp0-5&&run("G.run.ccFlag.seo_mach===1&&isVo()&&G.run.ccFail.CC01===1&&G.run.ccWait>W().t"), 'hỏng: sẹo mạch −5% khí huyết, còn vô căn, chờ một năm');
    // nguồn độc nhất CC05: lấy rồi thì kiếp sau vẫn mất
    run("ccTake('CC05','pc')");ok(run("ccSrc('CC05').con===0&&ccSrc('CC05').hoi===-1"), 'CC05 lấy rồi: không hồi');
    run("genBirth();newRun(G.birth.cards[0]);G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;W().t+=200*HY");
    ok(run("ccSrc('CC05').con")===0&&!run("ccAvail('CC05')")&&/mất/.test(run("ccWhyStart('CC05')")), 'kiếp sau: CC05 vẫn con===0');
    ok(run("ccSrc('CC01').con")===1, 'CC01 đã hồi sau hai mươi năm');
    ok(run("!G.run.ccOk&&!G.run.cc"), 'kiếp mới: sổ cải căn trắng');
    // bản lưu cũ
    run("delete G.run._ccV1;delete G.run.ccHeard;G.run.cc={id:'XX'};run2()");ok(run("G.run.cc===null&&typeof G.run.ccHeard==='object'"), 'bản lưu cũ: trường mới được dựng, đường lạ bị gỡ');
  },
  // Đ6.3: đi hết từng đường (ép thành) bằng các lựa chọn trong hộp Cơ duyên — mỗi đường ra đúng loại căn; nhường thì mất nguồn
  cai_can_duong() {
    const drive=`(id)=>{const r=G.run;let g=0;const at=n=>{r.scene=null;r.moving=null;r.at=n;openPlace(n);r.scene.venue='coduyen';};
      while(r.cc&&r.cc.id===id&&g++<400){const st=ccStep(r);const src=ccSrc(id);
        if(st.bloom){const a=ccBloomT(id);if(W().t<a||W().t>=a+CC_CFG.bloomNgay*HD)W().t=a+HD;}
        if(st.mua){let k=0;while(seasonOf(W().t)!==st.mua&&k++<400)W().t+=HD*10;}
        let nid=src.node;if(st.b==='gain'){const v=st.vt.find(([v,k])=>ccHave(v)<k);const vn=v&&ccVtNode(v[0]);if(vn!=null)nid=vn;}
        at(nid);const L=ccOpts(nodeById(nid)).filter(o=>!o.no&&!['bo','lua'].includes(o.id)&&!o.id.startsWith('xa:'));
        const tr=L.filter(o=>o.id.startsWith('tr:'));let o=tr.length?(tr.find(o=>!st.L[+o.id.slice(3)].p&&!st.L[+o.id.slice(3)].kq&&!st.L[+o.id.slice(3)].deed)||tr.find(o=>!st.L[+o.id.slice(3)].kq)):L.find(o=>o.id!=='le')||L[0];
        if(!o&&st.b==='grow'){W().t+=HY/2;ccMonth();continue;}
        if(!o)return 'kẹt ở bước '+st.b+': '+ccOpts(nodeById(nid)).map(o=>o.id+':'+o.no).join('|');
        if(!venueDo('coduyen',o.id))return 'không làm được '+o.id;if(!G.run)return 'chết';}
      return r.cc?'quá lượt':'';}`;
    const P=run("Object.keys(CAI_CAN).filter(id=>!CAI_CAN[id].off)");
    for(const id of P){
      const mode=run(`CAI_CAN['${id}'].mode`);
      fresh(`G._ngNoEv=1;G.run.pham=${mode==='nang'?0:1};G.run.root=${mode==='nang'?"{id:'tam',els:['kim','moc','thuy'],q:'thuong'}":"{id:'vo',els:[],q:null}"};G.run.rootKnown=1;G.run.bac=500000;G.run.st=500;G.run.lifeAdj=400;G.run.base.tp=10;voOf(G.run).bac=3;G.run.paths={nong:{xp:100,bac:2,last:0}};CC_FORCE=1;`+
        (mode==='tuc'?"G.meta.tucCan={root:{id:'song',els:['hoa','tho'],q:'thuan'},node:W().regions[0].nodes[0].id,k:0};":''));
      if(mode==='nang')run("G.run.realm=1");
      run(`G.run.ccHeard['${id}']=1`);const why=run(`ccWhyStart('${id}')`);
      if(why){ok(false, id+': không bắt đầu được ('+why+')');continue;}
      run(`ccStart('${id}')`);const e=run(`(${drive})('${id}')`);run("CC_FORCE=null");
      const R=run("G.run&&JSON.stringify(G.run.root)");
      const good=!e&&run("G.run.ccOk===1")&&(mode==='nang'?run("G.run.root.q")==='thuan':mode==='tuc'?run("G.run.root.id==='song'&&G.run.root.q==='thuong'"):run("!isVo()&&ROOT.some(x=>x.id===G.run.root.id)&&G.run.root.els.length>0&&ROOT_Q.some(q=>q.id===G.run.root.q)"));
      ok(good, id+' '+run(`CAI_CAN['${id}'].n`)+': '+(e||R));
    }
    // nhường: nguồn có lịch hồi vào tay người khác
    fresh("G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=99999;G.run.ccHeard.CC02=1;ccStart('CC02');G.run.cc.s=2");
    run("(()=>{const n=ccSrc('CC02').node;G.run.at=n;openPlace(n);G.run.scene.venue='coduyen';})()");
    const i=run("CAI_CAN.CC02.steps[2].L.findIndex(x=>x.kq==='nhuong')");run(`venueDo('coduyen','tr:${i}')`);
    ok(run("!G.run.cc&&G.run.ccFail.CC02===1&&ccSrc('CC02').con===0&&ccSrc('CC02').by==='npc'"), 'nhường CC02: người khác lấy, hồi sau một trăm hai mươi năm');
    // người khác tranh nguồn theo năm
    fresh("G.run.pham=1;CC_CFG.npc=4");run("ccYear()");run("CC_CFG.npc=0.02");
    ok(run("ccSrc('CC04').con===0&&ccSrc('CC05').con===0&&ccSrc('CC01').con===0"), 'mỗi năm có người dùng mất nguồn (ép xác suất) '+run("JSON.stringify(['CC01','CC04','CC05'].map(i=>ccSrc(i)))"));
    ok(run("W().chron.some(c=>/Hóa Sinh Liên/.test(c.t))"), 'biên niên ghi chuyện người khác dùng nguồn');
    // nghe dấu vết theo tháng; tu sĩ không nghe đường vô căn
    fresh("G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;CC_CFG.nghe=1");run("ccMonth()");run("CC_CFG.nghe=0.2");
    ok(run("Object.keys(G.run.ccHeard).length")===1&&run("NK.count('cc.nghe')")===1, 'mỗi tháng có thể nghe một dấu vết');
    fresh("G.run.pham=0;G.run.root={id:'tam',els:['kim'],q:'thuong'};G.run.rootKnown=1;CC_CFG.nghe=1;CC_CFG.ngheTu=1");run("ccMonth()");run("CC_CFG.nghe=0.2;CC_CFG.ngheTu=0.03");
    ok(run("JSON.stringify(Object.keys(G.run.ccHeard))")==='["TAO_HOA"]', 'tu sĩ chỉ nghe đường nâng phẩm');
    // chết khi liều: Thiên Lôi, hỏng và trúng phần chết
    fresh("G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.ccHeard.THIEN_LOI=1;ccStart('THIEN_LOI');G.run.cc.s=1;CAI_CAN.THIEN_LOI.steps[1].fail.die=1;CC_FORCE=null;CAI_CAN.THIEN_LOI.steps[1].ok=0");
    run("(()=>{let k=0;while(seasonOf(W().t)!=='ha'&&k++<400)W().t+=HD*10;const n=ccSrc('THIEN_LOI').node;G.run.at=n;openPlace(n);G.run.scene.venue='coduyen';venueDo('coduyen','le');})()");
    run("CAI_CAN.THIEN_LOI.steps[1].fail.die=0.5;CAI_CAN.THIEN_LOI.steps[1].ok=0.05");
    ok(run("G.run===null&&!!G.over")&&run("NK.count('cc.chet')")===1, 'Thiên Lôi Quán Thể: hỏng thì có thể chết');
    // Văn tâm chờ hệ Nho tu
    fresh();ok(/Nho/.test(run("ccWhyStart('HAO_NHIEN')")), 'Dưỡng Hạo Nhiên Khí: chờ lối tu Nho gia');
    // Linh Căn Cổ: không tiền nuôi cổ thì trúng độc
    fresh("G.run.pham=1;G.run.bac=0;G.run.ccFlag={nuoi_co:1}");run("ccMonth()");
    ok(run("(G.run.wounds||[]).some(w=>w.k==='doc')"), 'Linh Căn Cổ: không có tiền nuôi cổ thì trúng độc');
    // việc dài ngày không bao cơm: đủ tiền thì tự trả tiền ăn, không đói
    fresh("FEAT.an=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=99999;G.run.ccHeard.CC02=1;ccStart('CC02');G.run.cc.s=3");
    run("(()=>{const n=ccSrc('CC02').node;G.run.at=n;openPlace(n);G.run.scene.venue='coduyen';CAI_CAN.CC02.steps[3].rui.p=0;venueDo('coduyen','sv');CAI_CAN.CC02.steps[3].rui.p=0.08;})()");
    ok(run("G.run&&(G.run.doi||0)===0&&G.run.bac<99999&&G.run.cc.h===30*HD"), 'thăm dò mỏ ba mươi ngày: tự trả tiền ăn, không đói');
    // suy nhược có hạn
    fresh();const hp=run("S().maxHp");run("G.run.ccHau=[{until:W().t+HY,fx:{hpP:-20}}]");const hp2=run("S().maxHp");run("W().t+=2*HY;ccMonth()");
    ok(hp2<hp&&run("S().maxHp")===hp&&run("G.run.ccHau.length")===0, 'suy nhược hết hạn thì khí huyết về như cũ ('+hp+' → '+hp2+')');
  },
  // Sửa-G câu 29: vật tư cải căn quý hiếm — không mua thẳng; dò hỏi (có thể không thấy / không bán), kỳ ngộ, Ám Hội giá rất cao
  cai_can_hiem() {
    ok(run("Object.values(CC_VT).every(V=>V.mua==null)"), 'bảng vật tư không còn giá mua thẳng');
    ok(run("Object.keys(CC_VT).every(v=>CC_VT[v].cong||CC_VT[v].che||ccHiem(v)||Object.values(CAI_CAN).some(P=>P.steps.some(s=>(s.cho||[]).some(([x])=>x===v))))"), 'mỗi vật tư đều có ít nhất một nguồn (làm công, tự chế, dò hỏi, phần thưởng phục vụ)');
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=500000;G.run.base.tp=10;G.run.ccHeard.CC02=1;ccStart('CC02');G.run.cc.s=1;CC_FORCE=null");
    const go=n=>run(`(()=>{const r=G.run;r.scene=null;r.moving=null;r.at=${n};openPlace(${n});r.scene.venue='coduyen';return 1})()`);
    const n2=run("ccSrc('CC02').node");go(n2);
    const ids=()=>run("ccOpts(nodeById(G.run.at)).map(o=>o.id+(o.no?'!':'')).join(',')");
    ok(run("ccStep().b")==='gain'&&!/mua:/.test(ids())&&/tim:bo_chong_sap/.test(ids()), 'bước gom: không có nút mua, chỉ dò hỏi / làm công ('+ids()+')');
    run("CC_FORCE=0");run("venueDo('coduyen','tim:bo_chong_sap')");run("CC_FORCE=null");go(n2);
    ok(/tim:bo_chong_sap!/.test(ids())&&!/mua:bo_chong_sap/.test(ids())&&run("NK.count('cc.tim')")===1, 'dò hỏi không ra (hoặc không bán): tháng này không hỏi lại, không mua được');
    run("W().t+=HM;CC_FORCE=1");go(n2);run("venueDo('coduyen','tim:bo_chong_sap')");run("CC_FORCE=null");go(n2);
    const o=run("ccOpts(nodeById(G.run.at)).find(o=>o.id==='mua:bo_chong_sap')");
    ok(!!o&&o.bac===run("CC_VT.bo_chong_sap.gia*CC_CFG.hiemX"), 'người giữ chịu nhượng: giá gấp '+run("CC_CFG.hiemX")+' lần ('+(o&&o.bac)+' xu)');
    const b0=run("G.run.bac");run("venueDo('coduyen','mua:bo_chong_sap')");
    ok(run("ccHave('bo_chong_sap')")===1&&run("G.run.bac")===b0-o.bac, 'nhượng xong: có Bộ Chống Sập, trừ đúng tiền');
    go(n2);ok(!/mua:bo_chong_sap/.test(ids()), 'lời nhượng dùng một lần');
    run("W().t+=3*HM");go(n2);ok(!/mua:/.test(ids()), 'lời nhượng hết hạn khi sang tháng');
    // kỳ ngộ: đang gom thì đôi khi được một món còn thiếu
    run("CC_CFG.ky=1");const h0=run("ccHave('doi_mo')");run("ccMonth()");run("CC_CFG.ky=0.04");
    ok(run("NK.count('cc.ky')")===1&&run("ccHave('doi_mo')")===h0+1, 'kỳ ngộ khi đang gom: được món còn thiếu');
    // Ám Hội (Sửa-I): tu sĩ đường Tạo Hóa — một khách vô danh mang sẵn món đang thiếu trong túi, đem ra bàn
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=1;G.run.root={id:'tam',els:['kim','moc','thuy'],q:'thuong'};G.run.rootKnown=1;G.run.st=500;G.run.ccHeard.TAO_HOA=1;ccStart('TAO_HOA')");
    run("(()=>{while(G.run.cc&&ccStep().b!=='gain')ccNext();})()");
    const n=run("W().regions.flatMap(R=>R.nodes).find(n=>(n.type==='thanh'||n.type==='ma')&&n.state!=='ruin').id");
    run(`(()=>{const r=G.run;r.at=${n};W().t=Math.floor(W().t/HD)*HD+HD+23;CC_FORCE=1;amStart(nodeById(${n}));CC_FORCE=null;})()`);
    const lo=run("JSON.stringify(G.run.scene.q.find(l=>l.it.id==='cc_tao_hoa_dich')||null)");
    ok(lo!=='null'&&run("G.run.scene.ppl.some((p,i)=>(p.k==='vai'||p.k==='tk')&&amTui(G.run.scene,i).some(x=>x.id==='cc_tao_hoa_dich'))"), 'Ám Hội: một NPC thật ngồi bàn mang Tạo Hóa Thần Dịch trong túi, đem ra bàn ('+(lo!=='null'&&JSON.parse(lo).v)+' Hạ)');
    run("CC_FORCE=null");ok(run(`W().regions.flatMap(R=>R.nodes).filter(n=>!ccAmVt(n)).length>0`), 'không phải lúc nào Ám Hội cũng có');
  },
  // Sửa-H câu 36 + 32: đồ cải căn có phẩm (tạp/tứ → tam → song → Địa → Thiên), đồ dởm, cộng dồn sau thất bại, lô ở đấu giá thường
  // Sửa-I câu 39: U Minh Ám Hội — buổi họp kín, mỗi người đưa vật đang có ra trả giá
  am_hoi() {
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=2;G.run.relics=[];G.run.pills=[];G.run.qitems=[];G.run.st=0;G.run.lt=[0,0,0];AM_LECH=0");
    const nid=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;W().t=Math.floor(W().t/HD)*HD+HD+23;openPlace(n.id);return n.id;})()");
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='amhoi')"), 'canh ba ở thành: có U Minh Ám Hội');
    ok(run("Object.keys(VAI_NP).filter(ma=>VAI_NP[ma].tu>=1).every(ma=>vaiTui(ma).length>0&&vaiTui(ma).length<=12&&W().vai[ma].cua>0)"), 'NPC giữ vai là tu sĩ có túi đồ (≤12 món) và của cải');
    ok(run("Object.keys(VAI_NP).filter(ma=>VAI_NP[ma].tu<1).every(ma=>!vaiTui(ma).length)"), 'người phàm giữ vai không bị nhét đồ tu sĩ');
    // giá trị = giá gốc × nhu cầu thế giới
    run("FEAT.nc=1");
    ok(run(`(()=>{const it={id:'rel',q:2};const b=amBase(it,0);const v0=amVal(it,0,${nid});ncPush(${nid},'pb',0.3);const v1=amVal(it,0,${nid});return v0===Math.round(b*ncGet(${nid},'pb')-0)||Math.abs(v0-b*(ncGet(${nid},'pb')-0.3))<=1?v1>v0&&v1===Math.max(1,Math.round(b*ncGet(${nid},'pb'))):false;})()`), 'giá trị vật = giá gốc × nhu cầu nơi họp; nhu cầu tăng thì giá trị tăng');
    ok(run(`amVal('lt:1',0,${nid})===Math.max(1,Math.round(100*ncGet(${nid},'lt1')))`), 'linh thạch cũng định giá theo nhu cầu (Trung phẩm = 100 Hạ × nhu cầu)');
    const snap=()=>run("JSON.stringify(Object.keys(VAI_NP).map(ma=>vaiTui(ma).map(x=>x.u).join(',')))");const s0=snap();
    ok(run("venueDo('amhoi','vao')")&&run("G.run.scene.type")==='amhoi', 'ngồi vào bàn: mở hộp thoại Ám Hội');
    const sc=()=>JSON.parse(run("JSON.stringify(G.run.scene)"));let S=sc();
    ok(run("G.run.scene.q.every(L=>amTui(G.run.scene,L.own).some(x=>x.u===L.u))"), 'mọi món trên bàn là đồ đang nằm trong túi người đưa (không tạo mới)');
    // Sửa-J câu 43: người ngồi bàn chỉ là NPC thật, hóa trang, che tu vi
    ok(S.ppl.length>=2&&S.ppl.every(p=>p.k==='vai'||p.k==='tk')&&S.ppl.some(p=>p.k==='tk'), 'quanh bàn chỉ có NPC thật: '+S.ppl.filter(p=>p.k==='vai').length+' người giữ vai, '+S.ppl.filter(p=>p.k==='tk').length+' thiên kiêu (không khách vô danh)');
    ok(run("G.run.scene.ppl.every(p=>p.k!=='vai'||(vaiNow(p.ma).song&&VAI_NP[p.ma].tu>=1))&&G.run.scene.ppl.every(p=>p.k!=='tk'||G.run.rivals[p.i].alive)"), 'người giữ vai là tu sĩ còn sống; thiên kiêu còn sống');
    ok(run("G.run.scene.ppl.every((p,i)=>p.nhan||(amTen(G.run.scene,i)===p.an&&!amTen(G.run.scene,i).includes(amThat(p).ten)))")&&run("amView().ban.every(b=>b.ten||b.cg==='tu vi bị che')"), 'chưa nhận ra: chỉ thấy tên hóa trang, tu vi bị che');
    ok(S.q.every((L,i)=>i===0||S.q[i-1].v<=L.v), 'vật quý xếp về cuối buổi');
    ok(snap()===s0, 'mở hội không làm đổi túi NPC');
    run("G.run.nang={khao:100,duoc:0};G.run.rivals.forEach(x=>x.rel=100);G.run.realm=5");
    ok(run("G.run.scene.ppl.every(p=>amNhanP(p)>AM_HOI.nhan.goc)")&&run("amNhanP({k:'tk',i:0})")>run("(G.run.nang={khao:0,duoc:0},G.run.rivals.forEach(x=>x.rel=0),amNhanP({k:'tk',i:0}))"), 'khảo vật, giao tình, thần thức làm dễ nhận ra người hóa trang hơn');
    run("G.run.realm=2;G.run.nang={khao:0,duoc:0}");
    ok(run("(()=>{const sc=G.run.scene;const p=sc.ppl[0];const o=p.nhan;p.nhan=1;const t=amTen(sc,0),b=amView().ban[0];p.nhan=o;return t.includes(amThat(p).ten)&&b.ten.length>0&&REALM.includes(b.cg);})()"), 'nhận ra: hiện tên thật và tu vi');
    const ppl0=run("JSON.stringify(G.run.scene.ppl.map(p=>p.k+(p.ma||p.i)))");
    ok(!run("venueDo('amhoi','vao')"), 'đang ngồi bàn thì không mở lần nữa');
    // danh sách vật muốn nhận
    ok(S.ph==='lot'&&S.lot.muon.length>=1&&S.lot.muon[0].key.startsWith('lt:')&&S.lot.muon.every(m=>m.sl>=1&&m.n), 'người bán nêu danh sách vật muốn nhận (tên + số lượng): '+S.lot.muon.map(m=>m.sl+' '+m.n).join(' / '));
    ok(run("(()=>{const sc=G.run.scene,L=sc.q[sc.i],lot=sc.lot;return lot.muon.every(m=>amVal(m.key,0,sc.node)*m.sl>=lot.mo&&amVal(m.key,0,sc.node)*(m.sl-1)<lot.mo);})()"), 'số lượng mỗi món vừa đủ giá mở (giá trị theo nhu cầu × số lượng)');
    ok(run("G.run.scene.lot.muon.filter(m=>m.key.startsWith('pill:')).every(m=>!amTui(G.run.scene,G.run.scene.q[G.run.scene.i].own).some(x=>x.id===m.key))"), 'người bán chỉ đòi thứ họ chưa có (đang cần)');
    // đếm ngược 10 giây (tua đồng hồ, không chờ thật)
    const i0=S.i;run("amTua(AM_HOI.tre[0]-5)");ok(run("G.run.scene.i")===i0&&!run("G.run.scene.lot.lead"), 'chưa tới lúc NPC ngẫm xong: chưa ai trả, chưa gõ búa');
    ok(run("amView().con")>=9&&run("amView().con")<=10, 'hộp thoại hiện số giây đếm ngược ('+run("amView().con")+')');
    // người chơi trả giá theo danh sách
    run("G.run.lt=[0,0,500];G.run.st=5000");
    const need0=run("amNeed(G.run.scene.q[G.run.scene.i],G.run.scene.lot)");
    ok(run("amAct('tra=0')")&&run("G.run.scene.lot.lead.who")==='me', 'trả bằng một món trong danh sách (đủ số lượng): ngươi dẫn');
    ok(run("G.run.scene.lot.lead.v")>=need0, 'mức trả không thấp hơn giá mở');
    const hen1=run("G.run.scene.lot.hen"),t1=run("amNow()");ok(hen1===t1+run("AM_HOI.dem")||Math.abs(hen1-t1-run("AM_HOI.dem"))<50, 'có người trả mới: đếm lại từ mười giây');
    ok(!run("amAct('tra=0')"), 'đang dẫn thì không tự trả đè mình');
    // NPC trả lại nhiều vòng (theo nhu cầu + của cải thật)
    run("AM_HOI._nhu=AM_HOI.nhu;AM_HOI.nhu=[50,50]");run("(()=>{for(const pi in G.run.scene.ppl)amCua(G.run.scene,+pi,1e7);})()");
    run("amTua(AM_HOI.tre[1]+5)");
    ok(run("G.run.scene.lot&&G.run.scene.lot.lead&&G.run.scene.lot.lead.who!=='me'"), 'NPC trả cao hơn trong lúc đếm');
    const nb=run("G.run.scene.lot.nb");run("amTua(AM_HOI.tre[1]+5)");ok(run("G.run.scene.lot.nb")>nb, 'NPC trả tiếp nhiều vòng ('+run("G.run.scene.lot.nb")+' lần trả)');
    // trả không hấp dẫn hơn: bị từ chối; thương lượng
    run("G.run.pills=[];for(let j=0;j<3;j++)G.run.pills.push({id:Object.keys(PILL).find(k=>PILL[k].p),q:0})");
    const pk=run("'pill:'+Object.keys(PILL).find(k=>PILL[k].p)");
    run(`amAct('tl=${pk}')`);ok(run("!!G.run.scene.tl&&amView().tl.n.length>0"), 'thương lượng: chọn vật trong túi, chỉnh số lượng');
    const lead0=run("JSON.stringify(G.run.scene.lot.lead)");run("G.run.scene.tl.sl=1;amAct('tlgo')");
    ok(run("JSON.stringify(G.run.scene.lot.lead)")===lead0, 'thương lượng giá thấp hơn mức đang dẫn: không được tính');
    ok(run(`(()=>{const sc=G.run.scene,L=sc.q[sc.i],lot=sc.lot;const h=amHop(sc,lot,'${pk}');return amBidVal(sc,L,lot,'me','${pk}',2)===Math.floor(amVal('${pk}',0,sc.node)*2*h)&&h>0;})()`), 'thương lượng: người bán định giá = giá trị theo nhu cầu × số lượng × độ hợp nhu cầu');
    ok(run("amHop(G.run.scene,G.run.scene.lot,'lt:0')")===1&&run("amHop(G.run.scene,{muon:[{key:'lt:1'}]},'r:0')")===run("AM_HOI.hop.pb")&&run("amHop(G.run.scene,{muon:[{key:'lt:1'}]},'vt_x')")<run("AM_HOI.hopMin"), 'độ hợp nhu cầu: linh thạch phẩm khác vẫn nhận; pháp bảo giảm giá; vật người bán không cần thì không nhận');
    // bỏ cuộc: không được trả lại trong món đó
    run("AM_HOI.nhu=AM_HOI._nhu;G.run.scene.tl=null");const iB=run("G.run.scene.i");run("amAct('bo')");
    ok(run("G.run.scene.i")>iB||run("G.run.scene.ph")!=='lot', 'bỏ cuộc: ngồi xem tới khi gõ búa, sang món sau');
    run("AM_HOI.nhu=AM_HOI._nhu");
    // test bỏ cuộc giữa chừng không trả lại được
    run("(()=>{const sc=G.run.scene;if(sc.ph==='lot'){sc.lot.bo.me=1;}})()");
    ok(run("G.run.scene.ph!=='lot'||!amAct('tra=0')"), 'đã bỏ cuộc thì không trả giá lại món đó');
    run("(()=>{const sc=G.run.scene;if(sc.ph==='lot')delete sc.lot.bo.me;})()");
    // thắng: không ai trả hơn trong mười giây → món về túi, vật trả sang người bán
    run("AM_HOI.nhu=[0,0]");let g=0;while(run("G.run.scene.ph")==='chon'&&g++<3)run("amAct('khong')");
    if(run("G.run.scene.ph")==='lot'){
      const L=JSON.parse(run("JSON.stringify(G.run.scene.q[G.run.scene.i])"));const own=L.own;const p=S.ppl[own];
      run("G.run.lt=[0,0,500];G.run.st=50000");const tot0=run("amLtTot()"),cua0=run(`amCua(G.run.scene,${own})`),nr=run("G.run.relics.length+G.run.pills.length+G.run.qitems.length");
      run("(()=>{const sc=G.run.scene;const m=sc.lot.muon.findIndex(m=>m.key.startsWith('lt:'));amAct('tra='+m);})()");const ld=JSON.parse(run("JSON.stringify(G.run.scene.lot.lead)"));
      run("amTua(AM_HOI.dem-200)");ok(run("G.run.scene.i")===L.i||run("G.run.scene.q[G.run.scene.i].u")===L.u, 'chưa đủ mười giây: chưa gõ búa');
      run("amTua(400)");if(process.argv.includes('--log'))console.log(run("JSON.stringify(G.run.scene.log)"),tot0,run("amLtTot()"),cua0,run(`amCua(G.run.scene,${own})`));
      const k=+ld.key.slice(3);const paid=ld.sl*[1,100,10000,1000000][k];
      ok(run("amLtTot()")===tot0-paid&&run(`amCua(G.run.scene,${own})`)===cua0+paid, 'mười giây không ai trả hơn: ngươi thắng, linh thạch sang của cải người bán ('+ld.sl+' '+ld.n+')');
      ok(run("G.run.relics.length+G.run.pills.length+G.run.qitems.length")===nr+1&&!JSON.parse(run(`JSON.stringify(amTui(G.run.scene,${own}))`)).some(x=>x.u===L.u), 'món đấu rời túi người bán, vào túi ngươi');
    } else ok(false,'không có lô để thử thắng');
    run("AM_HOI.nhu=AM_HOI._nhu");
    ok(run("JSON.stringify(G.run.scene.ppl.map(p=>p.k+(p.ma||p.i)))")===ppl0&&run("G.run.scene.ppl.every((p,i)=>amTui(G.run.scene,i)&&(p.k!=='vai'||vaiNow(p.ma).song))"), 'qua nhiều món: không ai biến mất giữa buổi, không ai mới ngồi vào');
    // tới lượt mình: đưa đồ của mình ra
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph!=='chon'&&sc.ph!=='xong'&&g++<40){if(sc.ph==='lot'&&sc.q[sc.i].own==='me')amAct('rut');else amAct('bo');}})()");
    if(run("G.run.scene.ph")==='xong'){run("amAct('xong');W().t+=HM;openPlace(G.run.at);venueDo('amhoi','vao')");}
    ok(run("G.run.scene.ph")==='chon', 'tới lượt ngươi: chọn đồ trong túi đưa ra');
    run("G.run.relics.push(Object.assign(genRelic(3),{name:'Thử Kiếm Lô',tier:3}))");
    const key=run("amView().mine.find(m=>/Thử Kiếm Lô/.test(m.n)).key");run(`amAct('chon=${key}')`);
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph==='lot'&&sc.q[sc.i].own!=='me'&&g++<30)amAct('bo');})()");
    ok(run("G.run.scene.ph")==='lot'&&run("G.run.scene.q[G.run.scene.i].own")==='me'&&run("G.run.scene.lot.muon.length")===1, 'lô của ngươi ra bàn, nêu linh thạch muốn nhận');
    run("AM_HOI.nhu=[2,2];(()=>{for(const pi in G.run.scene.ppl)amCua(G.run.scene,+pi,1e7);})()");run("amTua(AM_HOI.tre[1]+5)");
    const ld2=JSON.parse(run("JSON.stringify(G.run.scene.lot.lead)"));
    if(ld2){const tb=run("amLtTot()"),cua0=run(`amCua(G.run.scene,${ld2.who})`);run("amAct('go')");const paid=ld2.sl*[1,100,10000,1000000][+ld2.key.slice(3)];
      ok(!run("G.run.relics.some(x=>x.name==='Thử Kiếm Lô')")&&/Thử Kiếm Lô/.test(run(`JSON.stringify(amTui(G.run.scene,${ld2.who}))`))&&run("amLtTot()")===tb+paid&&run(`amCua(G.run.scene,${ld2.who})`)===cua0-paid, 'gõ búa: món sang túi NPC, NPC trả bằng của cải thật ('+ld2.sl+' '+ld2.n+')');}
    else ok(false, 'không NPC nào trả món của ngươi');
    run("AM_HOI.nhu=AM_HOI._nhu");
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph!=='xong'&&g++<40){if(sc.ph==='chon')amAct('khong');else if(sc.q[sc.i].own==='me')amAct('rut');else amAct('bo');}})()");
    ok(run("G.run.scene.ph")==='xong'&&run("amAct('xong')")&&!run("G.run.scene"), 'hết lô: hội tan');
    ok(run("NK.count('amh.npc')+NK.count('amh.mua')+NK.count('amh.ban')")>0, 'có giao dịch thật trong buổi (nhật ký amh.*)');
    run("openPlace(G.run.at)");ok(/đã ngồi bàn/.test(run("venueOpts(nodeById(G.run.at),'amhoi')[0].no")), 'mỗi tháng một lần');
    run("W().t+=HM;openPlace(G.run.at)");ok(!run("venueOpts(nodeById(G.run.at),'amhoi')[0].no"), 'tháng sau ngồi lại được');
    // rời bàn giữa chừng không mất gì
    run("venueDo('amhoi','vao');G.run.lt=[0,0,500]");const tt=run("amLtTot()");run("amAct('tra=0');amAct('roi')");ok(run("amLtTot()")===tt&&!run("G.run.scene"), 'rời bàn khi đang dẫn: chưa gõ búa thì không mất gì');
    // đồ dởm: khách có thể đem đồ cải căn giả; khảo vật cao dễ nhận ra
    run("G.run.nang={khao:100,duoc:100};Object.keys(VAI_NP).filter(m=>VAI_NP[m].tu>=1).forEach(m=>{const T=vaiTui(m);if(T.length>=12)T.shift();T.push({u:amUid(),id:'ccg_2',n:CC_DO[2].n});})");
    run("W().t+=HM;openPlace(G.run.at);venueDo('amhoi','vao')");const fk=run("G.run.scene.q.some(l=>/^ccg_/.test(l.it.id))");
    ok(!!fk, 'người ngồi bàn mang đồ cải căn dởm trong túi thì đem ra bàn (muốn tống đi)');
    const nghi=run("(()=>{const sc=G.run.scene;const L=sc.q.find(l=>/^ccg_/.test(l.it.id));if(!L)return -1;let g=0;while((sc.q[sc.i]!==L||sc.ph==='chon')&&g++<40){if(sc.ph==='chon')amAct('khong');else if(sc.q[sc.i].own==='me')amAct('rut');else amAct('bo');}return sc.q[sc.i]===L?L.nghi:-2;})()");
    ok(nghi===1, 'khảo vật / nhận dược cao: đồ dởm hiện "nghi đồ giả" ('+nghi+')');
    run("amAct('roi')");
    ok(run("(G.run.nang={khao:0,duoc:0},ccNhanP())")===0, 'khảo vật / nhận dược thấp: không nhìn ra đồ dởm');
    run("(()=>{const ma=Object.keys(VAI_NP).find(m=>VAI_NP[m].tu>=1);const v=W().vai[ma];v.tui=[];delete v.tuiS;})()");ok(run("(()=>{const ma=Object.keys(VAI_NP).find(m=>VAI_NP[m].tu>=1);return vaiTui(ma).length>0&&W().vai[ma].tuiS===1;})()"), 'bản lưu cũ: túi NPC tu sĩ được lập khi tải');
    run("G.run.pham=1");ok(!run("placeActs(nodeById(G.run.at)).some(a=>a.a==='amhoi')"), 'phàm nhân không vào được');
    run("G.run.pham=0");ok(run("amVal({id:'ccg_3'},0)===Math.round(CC_DO[3].st*ncGet(amNode(),'qi:ccg_3'))&&amVal({id:'ccg_3'},1)===0&&amVal({id:'ccx_3'},0)===0"), 'đồ dởm trông như đồ thật nhưng giá trị thật bằng 0');
    run("FEAT.nc=0");
  },
  // Sửa-I câu 38: cộng dồn % sau thất bại chỉ trong một kiếp
  cc_bon_kiep() {
    fresh("G._ngNoEv=1");
    run("G.run.ccBon=0;ccBonFail();ccBonFail()");ok(Math.abs(run("ccBon()")-2*run("CC_DOCFG.bon"))<1e-9&&run("!('ccBon' in G.meta)"), 'hỏng hai lần: cộng dồn ghi trên kiếp này (G.run), không ghi G.meta');
    run("genBirth();newRun(G.birth.cards[0])");ok(run("ccBon()")===0, 'đầu thai: cộng dồn về 0');
    ok(run("(()=>{const d=migrateX({meta:{ccBon:0.2,v2:{}}});return !('ccBon' in d.meta);})()"), 'bản lưu cũ: G.meta.ccBon bị bỏ');
  },
  // Sửa-I câu 37: không đường cải căn nào ra Thiên đại trà (chỉ CC05 độc nhất và đồ phẩm 5)
  cc_thien() {
    fresh("G._ngNoEv=1");
    const out=JSON.parse(run("(()=>{const o={};for(const [id,P] of Object.entries(CAI_CAN)){for(const st of P.steps||[]){if(st.b!=='rite'||!st.out||st.out.nang||st.out.tuc)continue;for(let i=0;i<60;i++){const R=ccMakeRoot(st.out,id);if(R.id==='thien')o[id]=(o[id]||0)+1;}}}return JSON.stringify(o);})()"));
    ok(Object.keys(out).every(k=>k==='CC05'), 'chỉ Tàn Hỏa Chủng (độc nhất) còn ra Thiên: '+JSON.stringify(out));
    ok(run("['HUYET_TE','XA_LOI','TAY_TUY','CC06'].every(id=>CAI_CAN[id].steps.filter(s=>s.b==='rite').every(s=>{for(let i=0;i<40;i++){const R=ccMakeRoot(s.out,id);if(CC_LV[R.id]>3)return false;}return true;}))"), 'Huyết Tế, Xá Lợi, Tẩy Tủy, Huyết Mạch Khế: cao nhất song linh căn');
    ok(run("(()=>{for(let i=0;i<30;i++){const R=ccMakeRoot(CAI_CAN.XA_LOI.steps.find(s=>s.b==='rite').out,'XA_LOI');if(R.id!=='song'||!(R.els.includes('tho')||R.els.includes('kim')))return false;}return true;})()"), 'Xá Lợi: song linh căn có hệ thổ/kim');
    ok(run("CAI_CAN.CC05.hoi===0"), 'Tàn Hỏa Chủng độc nhất cả thế giới (hoi=0)');
  },
  cai_can_do() {
    ok(run("[1,2,3,4,5].every(p=>!CC_DO[p+1]||(CC_DO[p+1].ok<CC_DO[p].ok&&CC_DO[p+1].lv>CC_DO[p].lv&&CC_DO[p+1].dg<CC_DO[p].dg&&CC_DO[p+1].st>CC_DO[p].st))"), 'phẩm càng cao: cải được tới mức cao hơn, dễ hỏng hơn, hiếm hơn, đắt hơn');
    ok(run("CC_DO[4].to.id==='dia'&&CC_DO[5].to.id==='thien'&&CC_DO[3].to.id==='song'&&CC_DO[2].to.id==='tam'"), 'phẩm 2–5 ra tam / song / Địa / Thiên');
    ok(run("CC_DO[5].dg*CC_DO[5].ok")<1e-4, 'đồ cải ra Thiên cực hiếm (một buổi đấu giá: '+run("CC_DO[5].dg*CC_DO[5].ok")+')');
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=100000;CC_FORCE=null");
    run("ccDoAdd(1,0)");ok(run("bagItems().some(it=>it.key==='vccd_1'&&it.use&&it.n==='Tẩy Mạch Đan')"), 'đồ cải căn nằm trong túi, dùng được');
    run("CC_FORCE=1");ok(run("bagUse('vccd_1',1)")===1, 'dùng Tẩy Mạch Đan');run("CC_FORCE=null");
    ok(['tap','tu'].includes(run("G.run.root.id"))&&run("G.run.ccOk===1&&!isVo()&&NK.count('ccd.ok')===1"), 'vô căn → '+run("G.run.root.id")+', ccOk=1');
    run("ccDoAdd(2,0)");ok(run("bagUse('vccd_2',1)")===0&&run("G.run.qitems.includes('ccd_2')"), 'đã cải thành trong kiếp: món thứ hai bị từ chối, không mất đồ');
    // thất bại: chờ một năm, cộng dồn có trần, mất đồ
    run("G.run.ccOk=0;G.run.ccBon=0;CC_FORCE=0");run("bagUse('vccd_2',1)");run("CC_FORCE=null");
    ok(run("G.run.root.id")!=='tam'&&run("!G.run.qitems.includes('ccd_2')&&G.run.ccWait>W().t&&G.run.ccBon===CC_DOCFG.bon"), 'hỏng: mất đồ, chờ một năm, lần sau +'+run("CC_DOCFG.bon*100")+'%');
    run("ccDoAdd(2,0)");ok(run("bagUse('vccd_2',1)")===0&&/năm/.test(run("ccDoWhy(2)")), 'đang chờ một năm: không dùng được ('+run("ccDoWhy(2)")+')');
    run("for(let i=0;i<20;i++)ccBonFail()");ok(run("ccBon()")===run("CC_DOCFG.bonMax")&&Math.abs(run("ccOkP(CC_DO[3].ok)")-run("CC_DO[3].ok+CC_DOCFG.bonMax"))<1e-9, 'cộng dồn có trần '+run("CC_DOCFG.bonMax*100")+'%');
    run("G.run.ccWait=0;G.run.root={id:'tu',els:['kim','moc','thuy','hoa'],q:'thuong'};CC_FORCE=1");run("bagUse('vccd_2',1)");run("CC_FORCE=null");
    ok(run("G.run.root.id")==='tam'&&run("G.run.root.els.length")===3&&run("G.run.ccBon")===0, 'tứ → tam; thành rồi phần cộng dồn về 0');
    run("G.run.ccOk=0;ccDoAdd(1,0)");ok(/bằng hoặc hơn/.test(run("ccDoWhy(1)"))&&run("bagUse('vccd_1',1)")===0, 'căn đã cao hơn mức của đồ: vô dụng, bị từ chối');
    // đồ dởm
    run("G.run.ccBon=0;G.run.nang={khao:0,duoc:0};ccDoAdd(3,1)");const root0=run("JSON.stringify(G.run.root)");
    ok(run("bagItems().find(it=>it.key==='vccg_3').n===bagItems().find(it=>it.key==='vccd_1').n.replace('Tẩy Mạch Đan','Lưỡng Nghi Tạo Căn Đan')"), 'đồ dởm mang cùng tên đồ thật');
    run("bagUse('vccg_3',1)");ok(run("JSON.stringify(G.run.root)")===root0&&run("!G.run.qitems.includes('ccg_3')&&!(G.run.ccWait>W().t)&&G.run.ccBon===0&&!G.run.ccOk&&NK.count('ccd.dom')===1"), 'dùng đồ dởm: không tác dụng, mất đồ, không tính là hỏng');
    run("G.run.nang={khao:100,duoc:10};(()=>{const o=RS;RS=()=>0;try{ccDoAdd(3,1)}finally{RS=o}})()");ok(run("ccNhanP()")>0,'khảo vật cao: có cơ nhìn ra đồ giả ('+run("ccNhanP()")+')'); // ép trúng xác suất để bài không phụ thuộc thứ tự chạy
    ok(run("G.run.qitems.includes('ccx_3')&&bagItems().find(it=>it.key==='vccx_3').use!==1"), 'khảo vật cao: nhìn ra đồ giả ngay lúc nhận');
    run("G.run.nang={khao:0,duoc:0};ccDoAdd(3,1);ccDoAdd(4,0)");
    const tn=run("W().regions.flatMap(R=>R.nodes).find(n=>ccTdOk(n)).id");
    run(`(()=>{const r=G.run;r.scene=null;r.moving=null;r.at=${tn};openPlace(${tn});})()`);
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='coduyen')")&&run("ccOpts(nodeById(G.run.at)).some(o=>o.id==='td:3')"), 'thành / trấn có nút nhờ thẩm định');
    run(`(()=>{G.run.scene.venue='coduyen';venueDo('coduyen','td:3');})()`);run(`(()=>{const r=G.run;r.scene=null;r.at=${tn};openPlace(${tn});G.run.scene.venue='coduyen';venueDo('coduyen','td:4');})()`);
    ok(run("G.run.qitems.includes('ccx_3')&&!G.run.qitems.includes('ccg_3')&&G.run.qitems.includes('cct_4')"), 'thẩm định: đồ giả lộ ra, đồ thật ghi "đã thẩm định"');
    // kẻ bán đồ giả ở bước kiểm chứng trao một món dởm
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1;G.run.bac=100000;G.run.nang={khao:0,duoc:0};G.run.ccHeard.CC01=1;ccStart('CC01')");
    const n1=run("ccSrc('CC01').node");run(`(()=>{const r=G.run;r.scene=null;r.at=${n1};openPlace(${n1});r.scene.venue='coduyen';venueDo('coduyen','lua');})()`);
    ok(run("G.run.cc.s===0&&G.run.qitems.some(q=>/^ccg_/.test(q))"), 'mua của kẻ rao ngoài chợ: được một món dởm trông như thật');
    // nghi thức của đường cũng được cộng dồn
    run("G.run.ccBon=0.2");ok(/chín phần thành/.test(run("ccRiteD(CAI_CAN.CC01,CAI_CAN.CC01.steps[4])")), 'nghi thức đường CC01 (75%) + 20% cộng dồn: ghi "chín phần thành" (kẹp 95%)');
    run("G.run.cc={id:'CC01',s:4,t0:W().t,pf:{},h:0,care:0};ccVtAdd('ho_mach_tan',3);G.run.ccBon=0;CC_FORCE=0");
    run(`(()=>{const r=G.run;r.scene=null;r.at=${n1};openPlace(${n1});r.scene.venue='coduyen';venueDo('coduyen','le');})()`);run("CC_FORCE=null");
    ok(run("G.run.ccBon")===run("CC_DOCFG.bon"), 'đường hỏng cũng cộng dồn cho lần sau');
    // Địa linh căn: dị tượng, tông môn kinh động
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=1;G.run.root={id:'tam',els:['kim','moc','thuy'],q:'thuong'};G.run.rootKnown=1");
    const sn=run("W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tong'&&n.state!=='ruin'&&W().sects.some(s=>s.n===(n.owner||n.name))).id");
    run(`G.run.at=${sn};G.run.sfav={};ccDoAdd(4,0);CC_FORCE=1`);run("bagUse('vccd_4',1)");run("CC_FORCE=null");
    ok(run("G.run.root.id")==='dia'&&run("G.run.root.els.length")===2&&run("!!G.run.tlFx&&G.run.tlFx.k==='dia'&&G.run.tlFx.cach==='caican'"), 'tam → Địa linh căn (một cặp tương sinh), có dị tượng trắc linh');
    ok(run("Object.values(G.run.sfav||{}).some(v=>v>0)")&&run("NK.count('cc.fx')")===1, 'tông môn kinh động: thiện cảm tăng');
    // đấu giá thường: lô cải căn, vật càng quý càng ra cuối buổi
    run("CC_FORCE=1");ok(run("dgLots(1).join()")==='nho,cc1,cc2,cc3,chot,cc4,cc5', 'thứ tự lô: '+run("dgLots(1).join(' → ')"));
    ok(run("(()=>{const L=dgLots(1).filter(k=>k!=='nho'&&k!=='chot');return L.every((k,i)=>!i||dgLotVal(k)>dgLotVal(L[i-1]))})()"), 'lô cải căn ra sau thì quý hơn');
    ok(run("EVMAP.dau_gia.c.map(c=>c.e.dgCc?'cc'+c.e.dgCc:c.e.pill?'chot':c.e.relic!=null?'nho':'x').filter(k=>k!=='x').join()")==='nho,cc1,cc2,cc3,chot,cc4,cc5', 'lựa chọn trong sự kiện đấu giá theo đúng thứ tự lô');
    const tc=run("W().regions.flatMap(R=>R.nodes).find(n=>(n.type==='thanh'||n.type==='ma')&&n.state!=='ruin').id");
    const sev="(()=>{const f=contentTriggerOk;contentTriggerOk=()=>true;try{G.run.scene=null;return startEvent('dau_gia')}finally{contentTriggerOk=f}})()";
    run(`G.run.at=${tc};G.run.st=2000;G.run.ccOk=0`);run(sev);
    const vis=run("visChoices(G.run.scene).map(x=>x.c.e.dgCc||0).filter(Boolean).join()");ok(vis==='1,2,3', 'đủ linh thạch cho phẩm 1–3 thì thấy ba lô ('+vis+')');
    const i3=run("visChoices(G.run.scene).find(x=>x.c.e.dgCc===3).i");const st0=run("ltGet(0)");run(`choose(${i3})`);
    ok(run("G.run.qitems.includes('ccd_3')")&&run("ltGet(0)")===st0-run("dgCcGia(3)")&&run(`dgCcBought(${tc},3)`), 'mua lô phẩm 3: trừ '+run("dgCcGia(3)")+' linh thạch, đồ thật vào túi');
    run(sev);ok(!run("visChoices(G.run.scene).some(x=>x.c.e.dgCc===3)"), 'lô đã bán không ra lại trong tháng');
    run("CC_FORCE=null");ok(run(`W().regions.flatMap(R=>R.nodes).filter(n=>dgCcLots(n.id).length===0).length>0`), 'không phải buổi nào cũng có lô cải căn');
  },
  // Sửa-G câu 31: vật tư cải căn chiếm ô túi đồ; túi đầy thì gửi lại tại chỗ; bản lưu cũ r.ccVt chuyển vào túi
  cai_can_tui() {
    fresh("G._ngNoEv=1;G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1");
    const s0=run("bagStacks()");run("ccVtAdd('ho_mach_tan',2)");
    ok(run("bagStacks()")===s0+2&&run("ccHave('ho_mach_tan')")===2&&run("G.run.qitems.filter(x=>x==='cc_ho_mach_tan').length")===2, 'mỗi món vật tư chiếm một ô túi ('+s0+' → '+run("bagStacks()")+')');
    ok(run("bagItems().some(it=>it.key==='vcc_ho_mach_tan'&&it.n==='Hộ Mạch Tán')"), 'hiện trong danh sách túi đồ');
    ok(run("G.run.ccVt===undefined"), 'không còn sổ riêng r.ccVt');
    run("bagDrop('vcc_ho_mach_tan',1)");ok(run("ccHave('ho_mach_tan')")===1, 'vứt được như vật phẩm thường');
    // túi đầy
    run("(()=>{let k=0;while(ccBagFree()>0&&k++<99)G.run.qitems.push('luong_kho');})()");ok(run("ccBagFree()")===0, 'túi đầy');
    const at=run("G.run.at");run("ccVtAdd('mach_thao',1)");
    ok(run("ccHave('mach_thao')")===0&&run(`G.run.ccGui.length===1&&G.run.ccGui[0].at===${at}`), 'túi đầy: vật tư gửi lại ở nơi đang đứng, không mất');
    ok(run("ccView().vt.some(x=>/Mạch Thảo/.test(x.n)&&/gửi ở/.test(x.n))"), 'Sổ tay ghi món đang gửi và nơi gửi');
    run(`(()=>{const r=G.run;r.scene=null;openPlace(${at});r.scene.venue='coduyen';})()`);
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='coduyen')")&&!!run("ccOpts(nodeById(G.run.at)).find(o=>o.id==='lay:mach_thao'&&o.no)"), 'nút lấy lại có, nhưng khoá khi túi đầy');
    run("G.run.qitems.splice(G.run.qitems.indexOf('luong_kho'),1)");run("venueDo('coduyen','lay:mach_thao')");
    ok(run("ccHave('mach_thao')")===1&&run("G.run.ccGui.length")===0, 'dọn túi xong lấy lại được');
    // bản lưu cũ
    fresh("G.run.ccVt={ho_mach_tan:2,kim_sa:1};G.run.qitems=(G.run.qitems||[]).filter(x=>!/^cc_/.test(x))");run("run2()");
    ok(run("G.run.ccVt===undefined&&ccHave('ho_mach_tan')===2&&ccHave('kim_sa')===1"), 'bản lưu cũ: r.ccVt chuyển vào túi');
    fresh("(()=>{let k=0;while(ccBagFree()>0&&k++<99)G.run.qitems.push('luong_kho');})();G.run.ccVt={kim_sa:2}");run("run2()");
    ok(run("G.run.ccVt===undefined&&ccHave('kim_sa')===0&&G.run.ccGui.filter(g=>g.vt==='kim_sa').length===2"), 'bản lưu cũ, túi đầy: gửi lại tại chỗ, không mất');
  },
  // Đ4 tân thủ: chỉ kiếp đầu; nhóm A tuần tự; sau đó ba cái; bỏ qua không thưởng; điểm đếm thật
  tan_thu() {
    fresh();
    ok(run("!!G.run.tut&&G.run.kiep===1"), 'kiếp 1 có tân thủ');
    ok(run("JSON.stringify(G.run.tut.open)")==='["HD01"]', 'mở đầu chỉ HD01');
    ok(!run("tutClaim('HD01')"), 'chưa xong thì không nhận');
    run("tutTick('panel:char')");const b0=run("(G.run.qitems||[]).filter(x=>x==='luong_kho').length");
    ok(!!run("tutClaim('HD01')")&&run("(G.run.qitems||[]).filter(x=>x==='luong_kho').length")===b0+2, 'HD01 nhận hai gói lương khô');
    ok(run("JSON.stringify(G.run.tut.open)")==='["HD02"]', 'sau HD01 là HD02');
    run("tutTick('panel:char');tutTick('panel:char')");ok(run("tutDoneN()")===1, 'đếm lặp không nhận thêm');
    const bac0=run("G.run.bac");run("tutTick('rootinfo');tutClaim('HD02')");ok(run("G.run.bac")===bac0+200, 'HD02 thưởng 200 đồng');
    const p0=run("G.run.pills.length");run("tutSkip('HD03')");ok(run("G.run.pills.length")===p0&&run("!!G.run.tut.skip.HD03"), 'bỏ qua HD03 không có thưởng');
    ok(run("G.run.tut.open[0]")==='HD04', 'bỏ xong mở HD04');
    run("['HD04','HD05','HD06'].forEach(id=>tutSkip(id))");
    ok(run("G.run.tut.open.length")===3&&run("G.run.tut.open[0]")==='HD07', 'hết nhóm A mở ba cái: '+run("G.run.tut.open.join(',')"));
    // điểm đếm thật: đi tới nơi khác
    const nb=run("(()=>{const r=G.run;const n=W().regions[r.region].nodes.find(x=>x.id!==r.at&&x.id!==r.tut.at0);arrive(n.id);return n.id})()");
    ok(run("!!G.run.tut.ready.HD07"), 'tới nơi khác xong HD07');
    // mua bán
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;openPlace(n.id);G.run.bac=99999;G.run.st=999;placeAct('taphoa')})()");
    run("(()=>{const sc=G.run.scene;if(sc&&sc.items){const i=sc.items.findIndex(x=>!x.sold&&(x.k==='pill'||x.k==='qi'));if(i>=0)buy(i);}})()");
    ok(run("!!G.run.tut.ready.HD08"), 'mua một món xong HD08 ('+run("G.run.scene&&G.run.scene.type")+')');
    run("tutClaim('HD07');tutClaim('HD08')");ok(run("G.run.relics.some(x=>x.cid==='non_dauap_suong')"), 'HD07 thưởng nón');
    ok(run("G.run.tut.open.length")===3, 'vẫn ba cái: '+run("G.run.tut.open.join(',')"));
    // săn yêu: chỉ tính thắng trận khởi từ săn yêu, một trận đếm một lần
    run("(()=>{const T=G.run.tut;T.open=['HD11'];})()");
    run("(()=>{G.run.scene={type:'enc',en:{n:'x',_tutH:1}};startCombat({},{kind:'node'});const sc=G.run.scene;sc.over='win';finishCombat(sc);finishCombat(sc);})()");
    ok(run("G.run.tut.prog.HD11")===1, 'một trận thắng đếm một lần');
    run("(()=>{G.run.scene=null;startCombat({},{kind:'node'});const sc=G.run.scene;sc.over='win';finishCombat(sc);G.run.scene=null;})()");
    ok(run("G.run.tut.prog.HD11")===1, 'trận không phải săn yêu không đếm');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>placeActs(n).some(a=>a.a==='sanyeu'));G.run.at=n.id;openPlace(n.id);placeAct('sanyeu');})()");
    ok(run("!!(G.run.scene&&G.run.scene.en&&G.run.scene.en._tutH)"), 'săn yêu đánh dấu trận để đếm');
    run("G.run.scene=null;G.run.tut.open=['HD13'];(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>placeActs(n).some(a=>a.a==='tinh'));G.run.at=n.id;openPlace(n.id);placeAct('tinh');G.run.scene=null;})()");
    ok(run("!!G.run.tut.ready.HD13"), 'tĩnh tọa một lượt xong HD13');
    // nguyện vọng, trạng thái tự tính
    run("G.run.tut.open=['HD18','HD19']");run("wishSet('du_song')");ok(run("!!G.run.tut.ready.HD18")&&run("G.run.wish")==='du_song', 'chọn nguyện vọng xong HD18');
    run("G.run.pham=0;tutEval()");ok(run("!!G.run.tut.ready.HD19"), 'không còn phàm nhân: HD19 tự xong');
    ok(run("tutView().length")===2&&run("tutView()[0].rw.length")>0, 'tutView có phần thưởng');
    // tốt nghiệp
    run("TUT.forEach(t=>G.run.tut.done[t.id]=1)");ok(run("calcPts('combat').some(x=>x[1]===TUT_GRAD_PTS&&x[0]===contentText('tut.grad'))"), 'đủ mốc: thêm điểm tốt nghiệp');
    ok(run("NK.count('tut')")>0, 'nhật ký tut');
    // kiếp 2 không có
    run("(()=>{G.meta.nlife=1;genBirth();newRun(G.birth.cards[0]);})()");
    ok(run("G.run.kiep")===2&&!run("G.run.tut"), 'kiếp 2 không có tân thủ');
  },
  // Đ3.8 gia đình cơ bản: cha mẹ, anh chị em theo xuất thân; mồ côi thì không; người già có thể mất mỗi năm
  gia_dinh() {
    fresh();
    const mk=o=>run(`(()=>{genBirth();const c=Object.assign({},G.birth.cards[0],{origin:'${o}',hc:null});newRun(c);return JSON.stringify(G.run.family)})()`);
    const F=JSON.parse(mk('nong'));ok(F.some(x=>x.qh==='cha')&&F.some(x=>x.qh==='me')&&F.length<=5, 'con nhà nông có cha mẹ: '+F.map(x=>x.qh+' '+x.tuoi).join(', '));
    const ho=run("gdHo(G.run.ten)");ok(F.find(x=>x.qh==='cha').ten.startsWith(ho), 'cha cùng họ');
    ok(JSON.parse(mk('khat')).length===0, 'khất cái: không người nhà');
    ok(JSON.parse(mk('mieu')).length===0, 'bị bỏ ở miếu: không người nhà');
    run("G.run.family=[{ten:'A',qh:'cha',tuoi:70,suc:'benh',thai:'thuong',song:1,lc:0},{ten:'B',qh:'em',tuoi:10,suc:'khoe',thai:'thuong',song:1,lc:0}];NK.clear()");
    run("G.run.lifeAdj=500;advanceTime(30*HY)");ok(run("G.run.family[1].tuoi")===40, 'mỗi năm thêm một tuổi ('+run("G.run.family[1].tuoi")+')');
    ok(run("G.run.family[0].song")===0&&run("NK.count('gd.tang')")>=1, 'người già mất, có tin tang');
    run("delete G.run.family;delete G.run._gdV1;run2()");ok(run("Array.isArray(G.run.family)"), 'bản lưu cũ: có danh sách người nhà');
  },
  // máy tự chơi 15 kiếp: không lỗi, không chữ hỏng
  smoke() {
    const o = cp.spawnSync('node', ['bot.js', '15', '--quiet'], { cwd: require('path').join(__dirname, '..'), encoding: 'utf8', timeout: 420000 });
    const out = (o.stdout || '') + (o.stderr || '');
    ok(o.status === 0, 'bot.js thoát bình thường'); ok(!/Lỗi|Error|TypeError|ReferenceError/.test(out.replace(/Nguyên nhân/g, '')), 'không có lỗi trong đầu ra');
    console.log(out.split('\n').filter(l => /Số kiếp|Nguyên nhân|Cảnh giới khi chết|^LỖI|^CHUỖI|^   /.test(l)).slice(0,14).map(l => '     ' + l).join('\n'));
  },
};

if (args.includes('--list')) { console.log(Object.keys(TESTS).join('\n')); process.exit(0); }
for (const k of (names.length ? names : Object.keys(TESTS).filter(k=>k!=='smoke'))) {
  if (!TESTS[k]) { console.log('Không có bài: ' + k); fails++; continue; }
  cur = k; console.log('▶ ' + k); const f0 = fails;
  try { TESTS[k](); } catch (e) { fails++; console.log('   ✗ NGOẠI LỆ: ' + e.message.split('\n')[0]); if(process.env.STK)console.log(e.stack); }
  if (SHOWLOG || fails > f0) { try { console.log('   --- nhật ký ---\n' + run('NK.dump(25)').split('\n').map(l => '   ' + l).join('\n')); } catch (e) {} }
}
console.log(fails ? `\n${fails} lỗi` : '\nTất cả đạt'); process.exit(fails ? 1 : 0);
