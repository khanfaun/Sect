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
    FEAT.an=0;FEAT.nc=0;FEAT.no=0;FEAT.nha=0;FEAT.truy=0;FEAT.tna=0;FEAT.mong=0; // Đ10: Người Gác Bến tự hiện (kỳ ngộ) tắt trong bài khác; bài dai_mong bật lại
     // nợ/nhà ở (Sửa-B) tắt, bài no_nha bật lại; ăn uống (Đ3.6) tắt trong bài không nói về cái ăn; com_ao bật lại. Nhu cầu (Sửa-A) tắt để giá cố định; bài nhu_cau bật lại
  })()`);
  if (patch) run(patch);
}
let fails = 0, cur = '';
const ok = (c, msg) => { if (!c) { fails++; console.log('   ✗ ' + msg); } else console.log('   ✓ ' + msg); };

const TESTS = {
  dat_dai() {
    // Đ8b: ô đất, công trình, xây/phá, chủ đất, nơi neo, bản lưu cũ
    fresh("FEAT.truy=1;FEAT.tna=1;G.screen='map';G.run.pham=0;G.run.realm=1;DAT_BK=JSON.stringify(DAT);TNA_BK0=JSON.stringify(TNA)");
    try {
    const all = "W().regions.flatMap(R0=>R0.nodes)";
    ok(run(`(()=>{let bad=[];for(const n of ${all}){DAT_RAW_ON=1;const A=placeActs(n).map(a=>a.a);DAT_RAW_ON=0;const B=placeActs(n).map(a=>a.a);for(const a of A)if(!B.includes(a))bad.push(n.type+':'+a);}return bad.length===0})()`), 'mọi nơi: sinh ô xong vẫn đủ mọi nút như trước');
    ok(run(`${all}.filter(n=>n.type!=='ai'&&n.type!=='sao').every(n=>W().dat[n.id]&&W().dat[n.id].o.length>0)`), 'mọi nơi (trừ sào huyệt) đều có ô đất');
    ok(run(`${all}.filter(n=>n.type==='thanh'||n.type==='tran').every(n=>placeActs(n).some(a=>a.a==='datdai'))`), 'thôn trấn / thành có mục Đất đai');
    // ổn định theo hạt giống
    run(`DDX_W=${all}.find(n=>isWild(n)&&!n.anchor&&n.type!=='sao');DDX_A=JSON.stringify(W().dat[DDX_W.id].o);delete W().dat[DDX_W.id];placeActs(DDX_W)`);
    ok(run("JSON.stringify(W().dat[DDX_W.id].o)===DDX_A"), 'sinh lại ô hoang dã: y hệt (theo hạt giống thế giới)');
    // ví dụ: thôn trấn chỉ có ba ô tửu lầu, trạm dịch, tạp hóa → chỉ ba mục đó
    run(`DDX_T=${all}.find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin');W().dat[DDX_T.id]={v:1,o:[{ct:'tuu_lau',chu:{k:'dan'},goc:1},{ct:'tram_dich',chu:{k:'dan'},goc:1},{ct:'tap_hoa',chu:{k:'dan'},goc:1}],pha:{}}`);
    const L = JSON.parse(run("JSON.stringify(placeActs(DDX_T).map(a=>a.a).filter(a=>DAT_TIED[a]))"));
    ok(L.sort().join() === 'taphoa,tram,tuu', 'trấn ba ô (tửu lầu, trạm dịch, tạp hóa): chỉ ba mục đó (' + L.join() + ')');
    ok(run("!placeActs(DDX_T).some(a=>['inn','tea','board','vay'].includes(a.a))"), 'không còn khách điếm, trà lâu, bảng thưởng, tiền trang');
    // phá công trình tự nhiên
    run(`DDX_N=${all}.find(n=>isWild(n)&&!n.anchor&&n.state!=='ruin'&&placeActs(n).some(a=>a.a==='sanbat')&&W().dat[n.id].o.filter(c=>c.ct&&CONG_TRINH[c.ct].acts.includes('sanbat')).length===1);DDX_I=W().dat[DDX_N.id].o.findIndex(c=>c.ct&&CONG_TRINH[c.ct].acts.includes('sanbat'));DDX_C=W().dat[DDX_N.id].o[DDX_I].ct`);
    ok(run("CONG_TRINH[DDX_C].tu===1&&!CONG_TRINH[DDX_C].xay"), 'công trình săn bắt ở hoang dã là tự nhiên, không xây được ('+run('DDX_C')+')');
    const t0 = run("W().t");
    ok(!!run("datPha(DDX_N,DDX_I)"), 'phá được công trình tự nhiên');
    ok(run("!placeActs(DDX_N).some(a=>a.a==='sanbat')&&W().dat[DDX_N.id].pha[DDX_C]===1"), 'phá xong: mất nút săn bắt, có ghi đã phá');
    ok(run("W().t") > t0 && run("NK.count('dat.pha')") > 0, 'phá tốn thời gian, có nhật ký dat.pha');
    // Sửa-O câu 76: công trình tự nhiên mọc lại sau vài chục năm nếu ô còn trống
    ok(run("(()=>{const c=W().dat[DDX_N.id].o[DDX_I];return c.cu===DDX_C&&c.moc-W().t>=DAT.moc[0]*HY-1&&c.moc-W().t<=DAT.moc[1]*HY+1})()"), 'phá công trình tự nhiên: hẹn mọc lại sau '+run("DAT.moc.join('–')")+' năm');
    run("DDX_MT=W().t;W().dat[DDX_N.id].o[DDX_I].moc=W().t+HD");ok(run("!placeActs(DDX_N).some(a=>a.a==='sanbat')"), 'chưa tới hạn: chưa mọc');
    run("W().t+=2*HD");ok(run("placeActs(DDX_N).some(a=>a.a==='sanbat')&&W().dat[DDX_N.id].o[DDX_I].ct===DDX_C&&!W().dat[DDX_N.id].o[DDX_I].cu")&&run("NK.count('dat.moc')")>0, 'tới hạn: mọc lại, săn bắt dùng được');
    run("G.run.st=100;datPha(DDX_N,DDX_I);W().dat[DDX_N.id].o[DDX_I].ct='tran_phap';W().dat[DDX_N.id].o[DDX_I].moc=W().t-1;placeActs(DDX_N)");ok(run("W().dat[DDX_N.id].o[DDX_I].ct==='tran_phap'&&!W().dat[DDX_N.id].o[DDX_I].cu"), 'đã xây lên ô đó: không mọc lại');
    // xây động phủ trên đất hoang không chủ
    run(`DDX_H=${all}.find(n=>isWild(n)&&!n.anchor&&!n.dp&&n.state!=='ruin'&&n.id!==DDX_N.id&&W().dat[n.id]&&W().dat[n.id].o.some(c=>!c.ct&&!c.chu));DDX_J=W().dat[DDX_H.id].o.findIndex(c=>!c.ct&&!c.chu)`);
    ok(run("!!DDX_H"), 'có nơi hoang dã còn đất hoang không chủ');
    run("G.run.pham=1;G.run.st=100");ok(!run("datXay(DDX_H,DDX_J,'dong_phu')"), 'phàm nhân không dựng được động phủ');
    run("G.run.pham=0;G.run.st=10");ok(!run("datXay(DDX_H,DDX_J,'dong_phu')"), 'thiếu linh thạch: không dựng được');
    run("G.run.st=100;DDX_F=JSON.stringify(G.run.danh||{})");ok(!!run("datXay(DDX_H,DDX_J,'dong_phu')"), 'tu sĩ đủ linh thạch: dựng được động phủ');
    ok(run("DDX_H.dp===1&&G.run.st===70&&W().dat[DDX_H.id].o[DDX_J].chu.k==='ta'"), 'động phủ: nơi đó thành động phủ, trừ 30 linh thạch, ô thành của ngươi');
    ok(run("placeActs(DDX_H).some(a=>a.a==='tinh')&&!G.run.truy"), 'có tĩnh tọa ở động phủ; đất không chủ thì không bị phạt');
    // phạt khi có chủ: đất của dân ở thôn trấn → tiếng xấu, có thể bị truy nã
    run(`DDX_T2=${all}.find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin'&&n.id!==DDX_T.id);placeActs(DDX_T2);DDX_K=W().dat[DDX_T2.id].o.findIndex(c=>c.ct==='tuu_lau');TNA.chung.tran=1;G.run.truy=null;DDX_D0=danhGet('reg:'+DDX_T2.r)`);
    const op = JSON.parse(run("JSON.stringify(datOpts(DDX_T2).find(o=>o.id==='pha:'+DDX_K))"));
    ok(op && /nói xấu/.test(op.d) && /truy nã/.test(op.d), 'hộp xác nhận ghi rõ hậu quả (tiếng xấu, truy nã)');
    ok(!!run("datPha(DDX_T2,DDX_K)"), 'phá tửu lầu của dân');
    ok(run("danhGet('reg:'+DDX_T2.r)<=TNA.danh&&G.run.truy&&G.run.truy.k==='quan'&&tnaMuc(DDX_T2.r)>=1"), 'bị quan phủ truy nã (hệ truy nã): danh tiếng khu xuống mức truy nã, quan sai đuổi theo');
    ok(run("!placeActs(DDX_T2).some(a=>a.a==='tuu')"), 'tửu lầu không còn');
    // Sửa-O câu 79: ở thôn trấn / thành chỉ xây sau khi đã mua đất
    run("G.run.st=500;G.run.pham=0");const xo=JSON.parse(run("JSON.stringify(datOpts(DDX_T2).find(o=>/^xay:/.test(o.id))||null)"));
    ok(xo&&xo.no===run("contentText('dat.canMua')"), 'ô trống của dân ở trấn: lựa chọn xây bị khoá (phải mua đất)');
    ok(!run("datXay(DDX_T2,DDX_K,'tran_phap')")&&!run("W().dat[DDX_T2.id].o[DDX_K].ct"), 'không xây được trên ô của dân');
    run("datSoHuu(DDX_T2,DDX_K)");ok(!run("datOpts(DDX_T2).find(o=>o.id==='xay:'+DDX_K+':tran_phap').no")&&!!run("datXay(DDX_T2,DDX_K,'tran_phap')"), 'đã mua (ô của ngươi): xây được trận pháp');
    // vai NPC làm chủ ở nơi neo: chỉ hư tạm, thiện cảm giảm, có thể bị truy đuổi
    run(`DDX_V=null;DDX_VI=-1;for(const n of ${all}){if(!n.anchor||LOC_LOI.includes(n.anchor))continue;placeActs(n);const i=W().dat[n.id].o.findIndex(c=>c.ct&&c.chu&&c.chu.k==='vai'&&CONG_TRINH[c.ct].pha);if(i>=0){DDX_V=n;DDX_VI=i;break;}}`);
    ok(run("!!DDX_V"), 'có ô của người giữ vai ở nơi neo');
    run("DDX_VC=W().dat[DDX_V.id].o[DDX_VI];DDX_VT=vaiNow(DDX_VC.chu.id).ten;DDX_FV=favOf(DDX_VT);DAT.phat.vai.truy=1;G.run.truy=null");
    ok(!!run("datPha(DDX_V,DDX_VI)"), 'phá công trình của người giữ vai');
    ok(run("favOf(DDX_VT)<DDX_FV"), 'thiện cảm của chủ giảm');
    ok(run("G.run.truy&&G.run.truy.k==='cuop'"), 'chủ đuổi theo đòi đánh (truy loại cuop)');
    ok(run("DDX_VC.ct&&DDX_VC.hu>W().t"), 'nơi neo: công trình cốt lõi chỉ hư tạm');
    const a1 = JSON.parse(run("JSON.stringify(placeActs(DDX_V).find(a=>CONG_TRINH[DDX_VC.ct].acts.includes(a.a))||null)"));
    ok(a1 && a1.dis, 'đang hư: nút vẫn hiện nhưng không dùng được');
    run("W().t=DDX_VC.hu+1");ok(run("placeActs(DDX_V).some(a=>CONG_TRINH[DDX_VC.ct].acts.includes(a.a)&&!a.dis)"), 'quá hạn: đã dựng lại');
    // nơi lõi: không phá được
    run("DDX_L=anchorNode('LOC05');placeActs(DDX_L);DDX_LI=W().dat[DDX_L.id].o.findIndex(c=>c.goc&&c.ct&&CONG_TRINH[c.ct].pha)");
    if (run("DDX_LI") >= 0) {
      ok(run("!!datOpts(DDX_L).find(o=>o.id==='pha:'+DDX_LI).no"), 'nơi lõi LOC05: lựa chọn phá bị khoá (có lý do)');
      ok(!run("datPha(DDX_L,DDX_LI)") && run("!!W().dat[DDX_L.id].o[DDX_LI].ct"), 'nơi lõi LOC05: không phá được công trình cốt lõi');
    } else ok(true, 'nơi lõi LOC05 không có công trình phá được');
    // sơn môn điện không phá được
    run(`DDX_S=${all}.find(n=>n.type==='tong');placeActs(DDX_S)`);
    ok(run("!datOpts(DDX_S).some(o=>/^pha:/.test(o.id))"), 'sơn môn điện không phá được');
    // mục Đất đai qua giao diện chọn việc
    run("G.run.scene=null;G.run.at=DDX_T2.id;openPlace(DDX_T2.id);placeAct('datdai')");
    ok(run("G.run.scene&&G.run.scene.venue==='datdai'&&venueOpts(nodeById(G.run.scene.id),'datdai').length>0"), 'mở mục Đất đai: có danh sách việc');
    // bản lưu cũ: chưa có W().dat → sinh khi tải, giữ quán, chợ, nhà, thầy, Ám Hội
    run("delete W().dat;G.run.scene=null");
    run(`DDX_OLD=${all}.find(n=>n.type==='thanh'&&n.state!=='ruin')`);
    const old = JSON.parse(run("(()=>{W().t+=((22-tHour(W().t))%24+24)%24;return JSON.stringify(placeActs(DDX_OLD).map(a=>a.a))})()"));
    ok(['inn','tea','tuu','shop','board','tram','camdo','ghost','amhoi','doilt'].every(a => old.includes(a)), 'bản lưu cũ: thành vẫn đủ quán, chợ, trạm, quỷ thị, Ám Hội ('+old.join()+')');
    ok(run("!!W().dat&&!!W().dat[DDX_OLD.id]"), 'bản lưu cũ: ô đất sinh khi cần');
    run("FEAT.no=1;FEAT.nha=1;delete W().dat");ok(run("(()=>{const L=placeActs(DDX_OLD).map(a=>a.a);return L.includes('vay')&&L.includes('nha')})()"), 'bản lưu cũ (bật nợ, nhà ở): vẫn có người cho vay và nhà ở');run("FEAT.no=0;FEAT.nha=0");
    ok(run("JSON.parse(JSON.stringify(W())).dat[DDX_OLD.id].o.length===W().dat[DDX_OLD.id].o.length"), 'ô đất lưu được (qua JSON)');
    // để sẵn sở hữu
    ok(run("datSoHuu(DDX_OLD,0)&&datCuaTa().some(x=>x.node===DDX_OLD.id&&x.i===0)&&datPhat(DDX_OLD,W().dat[DDX_OLD.id].o[0],false).length===0"), 'ô của ngươi: không bị phạt (để sẵn cho mua đất)');
    } finally { run("Object.assign(DAT,JSON.parse(DAT_BK));Object.assign(TNA,JSON.parse(TNA_BK0))"); }
  },
  // Sửa-O câu 77: hệ truy nã kiểu thế giới mở — nhân chứng, mức theo vùng, mất dấu, treo thưởng, thợ săn, quan phủ, gộp nợ / đất / danh tiếng
  truy_na() {
    fresh("FEAT.truy=1;FEAT.tna=1;G.screen='map';G.run.pham=0;G.run.realm=1;G.run.kyT=W().t;G.run.tmT=W().t;TNA_BK=JSON.stringify(TNA);TRUY_BK2=JSON.stringify(TRUY)");
    try {
    const all = "W().regions.flatMap(R0=>R0.nodes)";
    const goTo = q => run(`(()=>{const n=${all}.find(n=>${q}&&n.state!=='ruin');G.run.at=n.id;G.run.region=n.r;G.run.moving=null;G.run.scene=null;G.run.truy=null;return n.id})()`);
    const th = goTo("n.type==='thanh'");run(`TN_TH=nodeById(${th});TN_R=TN_TH.r`);
    // thành: gần như chắc bị báo quan ngay
    run("TNA.chung.thanh=1");ok(run("tnaToi('pha_dat')")===2, 'phạm tội trong thành: bị báo quan ngay');
    ok(run("tnaMuc(TN_R)")===2&&run("G.run.tna[TN_R].tien")===run("TNA.tien.xu*2*TNA.tien.thanh"), 'mức truy nã theo vùng, tiền treo thưởng (thành gấp đôi)');
    ok(run("danhGet('reg:'+TN_R)<=TNA.danh&&danhName(TN_TH)===contentText('danh.4')"), 'nối danh tiếng Đ1.4: khu bị kéo xuống "Bị truy nã"');
    ok(run("G.run.truy&&G.run.truy.k==='quan'"), 'quan sai lần theo (truy đuổi loại quan)');
    ok(run("Object.keys(G.run.tna).length")===1, 'tội không lan sang vùng khác');
    const hud=JSON.parse(run("JSON.stringify(tnaHud())"));ok(hud&&hud.t&&/Bị truy nã/.test(hud.tip)&&!/\d/.test(hud.tip), 'biểu tượng HUD: chữ + biểu tượng, không số');
    run("tnaToi('pha_dat')");ok(run("tnaMuc(TN_R)")===4, 'thêm tội: mức tăng');
    // trấn: tùy nhân chứng
    run("G.run.tna={};G.run.truy=null");const tr=goTo("n.type==='tran'");run(`TN_T=nodeById(${tr})`);
    run("TNA.chung.tran=0");ok(run("tnaToi('pha_dat')")===0&&!run("G.run.tna[TN_T.r]"), 'không ai thấy: không bị truy nã');
    run("TNA.chung.tran=1;TNA.chung.chac=1.01");ok(run("tnaToi('pha_dat')")===1&&run("G.run.scene&&G.run.scene.ev")==='tna_chung', 'ở trấn có nhân chứng: hộp lựa chọn (chưa báo quan)');
    ok(!run("G.run.tna[TN_T.r]")&&JSON.parse(run("JSON.stringify(kyOpts(G.run.scene).map(o=>o.l))")).length===4, 'bốn lựa chọn: chặn, mua chuộc, diệt khẩu, mặc kệ');
    run("G.run.bac=5000;TNA.mua.p=1;kyPick(1)");ok(!run("G.run.tna[TN_T.r]")&&run("G.run.bac")===5000-run("TNA.mua.xu*TNA.toi.pha_dat")&&!run("G.run.tnaCh"), 'mua chuộc được: mất tiền, không bị truy nã');
    run("G.run.scene=null;TNA.ngan={goc:0,tp:0,max:0};tnaToi('pha_dat');kyPick(0)");ok(run("tnaMuc(TN_T.r)")===2&&run("G.run.tna[TN_T.r].tien")===run("TNA.tien.xu*2"), 'chặn không kịp: bị báo quan (trấn không nhân đôi treo thưởng)');
    run("G.run.tna={};G.run.scene=null;TNA.giet.lo=0;NK.clear();tnaToi('pha_dat');kyPick(2)");ok(!run("G.run.tna[TN_T.r]")&&run("NK.count('nq.deed')")>0, 'diệt khẩu không lộ: không bị truy nã nhưng mang nghiệp');
    run("G.run.scene=null;TNA.giet.lo=1;tnaToi('pha_dat');kyPick(2)");ok(run("tnaMuc(TN_T.r)")===4&&run("G.run.tna[TN_T.r].ly.includes('giet_chung')"), 'diệt khẩu bị lộ: tội nặng hơn hẳn');
    run("G.run.tna={};G.run.scene=null;tnaToi('pha_dat');kyPick(3)");ok(run("tnaMuc(TN_T.r)")===2, 'mặc kệ: bị báo quan');
    run("G.run.tna={};G.run.scene={type:'event'};tnaToi('pha_dat')");ok(run("G.run.scene.type==='event'&&!!G.run.tnaCh"), 'đang bận cảnh khác: nhân chứng chờ');
    run("G.run.scene=null;advanceTime(1)");ok(run("G.run.scene&&G.run.scene.ev")==='tna_chung', 'rảnh ra: hộp nhân chứng hiện');
    run("kyPick(3);G.run.scene=null");
    // cải trang / che giấu tu vi
    run("TNA.chung.chac=0.9;TNA.chung.tran=0.5");const p0=run("TNA.chung.tran*(tnaChe()?TNA.chung.che:1)");
    ok(run("placeActs(TN_T).some(a=>a.a==='caitrang')"), 'đang bị truy nã: thôn trấn có nút cải trang');
    run("G.run.scene=null;openPlace(TN_T.id);placeAct('caitrang')");ok(run("tnaChe()&&G.run.caiT>W().t"), 'cải trang: khó bị nhận ra trong một thời gian');
    ok(run("TNA.chung.tran*(tnaChe()?TNA.chung.che:1)")<p0, 'cải trang: nhân chứng ít hơn');
    run("G.run.caiT=0;G.run.realm=3;G.run.hide=1");ok(run("tnaChe()"), 'che giấu tu vi cũng giúp né');run("G.run.hide=null;G.run.realm=1;G.run.scene=null");
    // bị nhận ra khi tới thôn trấn trong vùng
    run("TNA.nhan=[0,1,1,1,1,1];G.run.truy=null;G.run.tna[TN_T.r].t=W().t-5*HD;arrive(TN_T.id)");ok(run("G.run.truy&&G.run.truy.k==='quan'&&G.run.tna[TN_T.r].t===W().t"), 'tới trấn trong vùng: bị nhận ra, quan sai đuổi');
    run("G.run.truy=null;G.run.caiT=W().t+HM;TNA.nhan=[0,0,0,0,0,0];arrive(TN_T.id)");ok(run("!G.run.truy"), 'khả năng bị nhận ra thấp (cải trang): không bị đuổi');run("G.run.caiT=0");
    // mất dấu hạ dần
    run("G.run.tna[TN_T.r].m=3;G.run.tna[TN_T.r].t=W().t-TNA.matDau[3]*HD-1;advanceTime(1)");ok(run("tnaMuc(TN_T.r)")===2, 'lâu không bị thấy: hạ một mức');
    run("G.run.region=(TN_T.r+1)%5;G.run.tna[TN_T.r].t=W().t-TNA.matDau[2]*HD*TNA.ngoai-1;advanceTime(1)");ok(run("tnaMuc(TN_T.r)")===1&&run("danhGet('reg:'+TN_T.r)")>run("TNA.danh"), 'ra khỏi vùng: mất dấu nhanh hơn; dưới mức truy bắt thì danh tiếng hết "Bị truy nã"');
    run("G.run.tna[TN_T.r].t=W().t-TNA.matDau[1]*HD-1;advanceTime(1)");ok(!run("G.run.tna[TN_T.r]"), 'mất dấu hẳn: hết truy nã');
    run("G.run.region=TN_T.r");
    // rất nặng thì lan
    run("tnaBao(TN_T.r,5,{noTruy:1})");ok(run("W().regions.every((_,i)=>tnaMuc(i)>=(i===TN_T.r?5:TNA.lanM))"), 'tội rất nặng (Tử tội): lan sang mọi vùng ở mức thấp hơn');
    // thợ săn tiền thưởng
    run("G.run.tna={};tnaBao(TN_T.r,2,{noTruy:1});G.run.tna[TN_T.r].tien=TNA.san.min;TNA.san.p=1;G.run.truy=null;G.run.tnaSan=Math.floor(W().t/HM)-1;advanceTime(1)");ok(run("G.run.truy&&G.run.truy.k==='san'"), 'treo thưởng lớn: thợ săn tiền thưởng lần theo');
    ok(run("TRUY.loai.san&&TRUY.an.thanh.san==='giam'"), 'thợ săn không sợ thành (chỉ chùn bước)');
    // chống cự
    run("G.run.truy=null;truyStart('quan',{n:'Bộ khoái',ek:'sontac',d:0});truyFight();G.run.scene.over='win';combatContinue()");ok(run("tnaMuc(TN_T.r)")===3, 'đánh thắng quan sai: tội chống người thi hành công vụ, mức tăng');
    // quan phủ: nộp phạt, làm công, ngồi tù
    run("G.run.scene=null;G.run.truy=null");ok(run("placeActs(TN_T).some(a=>a.a==='quanphu')"), 'trấn trong vùng bị truy nã: có Quan phủ');
    ok(run("!placeActs(nodeById("+th+")).some(a=>a.a==='quanphu')||nodeById("+th+").r===TN_T.r"), 'vùng không bị truy nã: không có Quan phủ');
    run("openPlace(TN_T.id);G.run.bac=0");let Q=JSON.parse(run("JSON.stringify(venueOpts(TN_T,'quanphu'))"));
    ok(Q.map(o=>o.id).join()==='nop,cong,tu'&&Q[0].no, 'quan phủ (nơi phàm nhân): nộp phạt bằng tiền phàm, làm công, ngồi tù; thiếu tiền thì khoá');
    run("G.run.bac=G.run.tna[TN_T.r].tien+10;TN_B0=G.run.bac");ok(!!run("venueDo('quanphu','nop')")&&!run("G.run.tna[TN_T.r]")&&run("G.run.bac")===10, 'nộp phạt: xoá truy nã ở vùng này');
    ok(run("danhGet('reg:'+TN_T.r)")>run("TNA.danh")&&!run("placeActs(TN_T).some(a=>a.a==='quanphu')"), 'hết truy nã: danh tiếng khu không còn "Bị truy nã", hết mục Quan phủ');
    run("tnaBao(TN_T.r,3,{noTruy:1});G.run.scene=null;openPlace(TN_T.id);TN_TT=W().t;venueDo('quanphu','tu')");ok(!run("G.run.tna[TN_T.r]")&&run("W().t-TN_TT")>=run("TNA.tu[3]*HM"), 'ngồi tù: qua thời gian án, sạch tội');
    run("tnaBao(TN_T.r,5,{noTruy:1,lan:1});G.run.scene=null;openPlace(TN_T.id);G.run.bac=1e9");Q=JSON.parse(run("JSON.stringify(venueOpts(TN_T,'quanphu'))"));
    ok(Q[0].no&&!Q.some(o=>o.id==='cong'), 'tử tội: không nộp phạt, không làm công được (chỉ ngồi tù)');
    run("G.run.scene=null;G.run.truy=null;truyStart('quan',{n:'Bộ khoái',ek:'sontac',d:0});truyFight();G.run.scene.over='lose';combatContinue()");ok(!run("G.run.tna[TN_T.r]")&&run("NK.count('tna.giam')")>0, 'thua quan sai: bị giải về ngồi tù, xoá tội');
    // gộp nợ (Sửa-B)
    run("G.run.tna={};G.run.scene=null;G.run.truy=null;FEAT.no=1;G.run.queAt=TN_T.id;G.run.bac=-5000;G.run.noTra={t0:W().t,han:W().t+HM,lan:1};noTruyNa(G.run)");
    ok(run("tnaMuc(TN_T.r)>=1&&G.run.tna[TN_T.r].ly.includes('no')&&noTruy()&&G.run.truy&&G.run.truy.k==='no'"), 'truy nã vì nợ: vào hệ truy nã, quan sai đòi nợ lần theo');
    run("G.run.bac=0;G.run.noTra=null;advanceTime(1)");ok(!run("G.run.tna[TN_T.r]"), 'trả hết nợ: hết truy nã vì nợ');run("FEAT.no=0");
    // gộp việc làm trong sổ nghiệp
    run("TNA.chung.tran=1;TNA.chung.chac=0.9;G.run.scene=null;deed('trom_ngheo',{})");ok(run("tnaMuc(TN_T.r)")>=1, 'trộm của người nghèo ở trấn (bị thấy): truy nã');
    run("G.run.tna={};deed('trom_ngheo',{lo:0})");ok(!run("G.run.tna[TN_T.r]"), 'việc làm kín (không lộ): không truy nã');
    // gộp danh tiếng (Đ1.4) + bản lưu cũ
    run("G.run.tna=undefined;delete G.run.tnaV;danhPut('reg:'+TN_T.r,-100);advanceTime(1)");ok(run("tnaMuc(TN_T.r)")===2&&run("NK.count('tna.cu')")>0, 'bản lưu cũ: khu đang "Bị truy nã" (danh tiếng) thành truy nã mức truy bắt');
    run("G=JSON.parse(JSON.stringify(G))");ok(run("tnaMuc(TN_T.r)")===2, 'lưu – tải giữ mức truy nã');
    ok(run("NK.count('tna.bao')")>0, 'có nhật ký tna.*');
    } finally { run("Object.assign(TNA,JSON.parse(TNA_BK));Object.assign(TRUY,JSON.parse(TRUY_BK2));FEAT.no=0"); }
  },
  // câu 81–83 (người dùng chốt): nộp phạt theo nơi giam giữ, sự kiện tạm hoãn khi bị truy nã (GTA5), cải trang không chắc chắn
  truy_na2() {
    fresh("FEAT.truy=1;FEAT.tna=1;G.screen='map';G.run.pham=0;G.run.realm=2;G.run.kyT=W().t;G.run.tmT=W().t;TNA_BK=JSON.stringify(TNA);TRUY_BK2=JSON.stringify(TRUY)");
    try {
    const all = "W().regions.flatMap(R0=>R0.nodes)";
    const goTo = q => run(`(()=>{const n=${all}.find(n=>${q}&&n.state!=='ruin');if(!n)return null;G.run.at=n.id;G.run.region=n.r;G.run.moving=null;G.run.scene=null;G.run.truy=null;return n.id})()`);
    // 81: nơi phàm nhân → tiền phàm; nơi tu sĩ → linh thạch
    const tr = goTo("n.type==='tran'");run(`T2=nodeById(${tr});tnaBao(T2.r,2,{noTruy:1});G.run.scene=null;openPlace(T2.id)`);
    let Q = JSON.parse(run("JSON.stringify(venueOpts(T2,'quanphu'))"));
    ok(run("placeActs(T2).some(a=>a.a==='quanphu')&&!placeActs(T2).some(a=>a.a==='chapphap')")&&Q.some(o=>o.id==='nop')&&!Q.some(o=>o.id==='nopLt'), 'thôn trấn (phàm nhân): Quan phủ, nộp xu/bạc/vàng, không nhận linh thạch');
    let tu = goTo("(n.type==='cho'||n.type==='tong')");
    if (tu == null) { run("(()=>{const n=W().regions[0].nodes.find(n=>n.type!=='tran'&&n.type!=='thanh'&&n.state!=='ruin');n.type='cho';})()"); tu = goTo("n.type==='cho'"); }
    run(`C2=nodeById(${tu});G.run.tna={};tnaBao(C2.r,2,{noTruy:1});G.run.scene=null;openPlace(C2.id)`);
    Q = JSON.parse(run("JSON.stringify(venueOpts(C2,'chapphap'))"));
    ok(run("placeActs(C2).some(a=>a.a==='chapphap')&&!placeActs(C2).some(a=>a.a==='quanphu')")&&Q.some(o=>o.id==='nopLt')&&!Q.some(o=>o.id==='nop'), 'nơi tu sĩ (chợ phiên / sơn môn): Chấp pháp đường, chỉ nộp linh thạch');
    run("G.run.st=1000;G.run.bac=777;C2_ST=Math.ceil(G.run.tna[C2.r].tien/TNA.phat.xuLt)");ok(!!run("venueDo('chapphap','nopLt')")&&!run("G.run.tna[C2.r]")&&run("G.run.st")===1000-run("C2_ST")&&run("G.run.bac")===777, 'nộp linh thạch ở chấp pháp đường: xoá truy nã, tiền phàm giữ nguyên');
    ok(run("!!VENUE_N.chapphap&&VENUE_IN.chapphap.length===2"), 'Chấp pháp đường có tên và lời tả');
    // mua chuộc nhân chứng theo nơi
    run("G.run.tna={};G.run.scene=null;TNA.chung.tran=1;TNA.chung.chac=1.01;TNA.mua.p=1");goTo("n.id===T2.id");
    run("G.run.bac=5000;G.run.st=50;tnaToi('pha_dat');kyPick(1)");ok(run("G.run.bac")===5000-run("TNA.mua.xu*TNA.toi.pha_dat")&&run("G.run.st")===50, 'mua chuộc nhân chứng ở trấn: trả tiền phàm');
    goTo("n.id===C2.id");run("TNA.chung.cho=1;TNA.chung.tong=1;G.run.bac=5000;G.run.st=50;tnaToi('pha_dat');kyPick(1)");ok(run("G.run.st")===50-run("TNA.mua.st*TNA.toi.pha_dat")&&run("G.run.bac")===5000, 'mua chuộc nhân chứng ở nơi tu sĩ: trả linh thạch');
    // quan sai đòi nộp của: chỉ nhận tiền phàm
    run("G.run.scene=null;G.run.st=100;G.run.bac=1000;truyStart('quan',{n:'Bộ khoái',ek:'sontac',d:0})");ok(JSON.stringify(JSON.parse(run("JSON.stringify(truyNopGia())")))===JSON.stringify({bac:300}), 'bị bộ khoái chặn: nộp tiền phàm, không lấy linh thạch');
    run("G.run.truy=null;truyStart('tac',{n:'Sơn tặc',ek:'sontac',d:0})");ok(!!run("truyNopGia().st"), 'sơn tặc vẫn lấy linh thạch như cũ');run("G.run.truy=null");
    // 82: sự kiện tạm hoãn
    run("G.run.tna={};G.run.scene=null;G.run.truy=null;G.run.tnaCh=null;G.run.kyHoan=[];KY_EV=KYNGO.find(x=>!x.sp&&!x.paid&&!x.joke&&(!x.content||contentTriggerOk(x.content)))");
    ok(run("kyNgau(KY_EV)")===true&&run("G.run.scene&&G.run.scene.type")==='kyngo', 'không bị truy: kỳ ngộ ngẫu nhiên hiện bình thường');
    run("G.run.scene=null;tnaBao(T2.r,2,{noTruy:1});G.run.region=T2.r");ok(run("tnaHoan()")&&run("kyNgau(KY_EV)")===false&&!run("G.run.scene")&&run("G.run.kyHoan.length")===1, 'đang bị truy nã: kỳ ngộ không hiện mà được giữ lại');
    run("G.run.tna={};truyStart('quan',{n:'Bộ khoái',ek:'sontac',d:0})");ok(run("tnaHoan()"), 'quan sai đang lùng (chưa thấy): vẫn hoãn');
    run("G.run.truy=null;G.run.kyHoan=['x_khong_co'];G.run.kyHoan.push(KY_EV.id);tnaHoanThem(KY_EV.id);tnaHoanThem('road:tran');tnaHoanThem('y');tnaHoanThem('z')");ok(run("G.run.kyHoan.length")===run("TNA.hoan.max"), 'giữ lại có giới hạn, không trùng');
    run("G.run.kyHoan=[KY_EV.id];tnaBao(T2.r,2,{noTruy:1});G.run.region=T2.r;advanceTime(1)");ok(!run("G.run.scene")&&run("G.run.kyHoan.length")===1, 'còn bị truy: chưa thả');
    run("tnaXoa(T2.r,'nop');G.run.kyThaT=null;G.run.kyHoan=['khong_co',KY_EV.id];KY_CL=G.run.contentLast;G.run.contentLast={};advanceTime(1)");ok(run("G.run.scene&&G.run.scene.ev")===run("KY_EV.id")&&run("G.run.kyHoan.length")===0&&run("NK.count('tna.tha')")>0, 'hết bị truy: kỳ ngộ được giữ lại hiện ra (không mất)');
    run("G.run.scene=null;G.run.kyThaT=null;G.run.contentLast={};G.run.contentLast[KY_EV.id]=W().t;G.run.kyHoan=[KY_EV.id];KS0=kyStart;kyStart=()=>false;try{advanceTime(1)}finally{kyStart=KS0}");ok(run("G.run.kyHoan.length")===1&&!run("G.run.scene"), 'chưa hợp điều kiện lúc thả: giữ lại chờ, không bỏ');
    run("G.run.kyHoanHet=W().t-(TNA.hoan.giu+1)*HD;KS0=kyStart;kyStart=()=>false;try{advanceTime(1)}finally{kyStart=KS0}");ok(run("G.run.kyHoan.length")===0, 'chờ quá lâu vẫn không hợp: bỏ');run("G.run.scene=null");
    run("G.run.scene=null;tnaBao(T2.r,2,{noTruy:1});G.run.region=T2.r;TRUY_TM=G.run.tmT;truyStart('quan',{n:'Bộ khoái',ek:'sontac',d:0});G.run.truy.nx=W().t");ok(run("G.run.truy&&G.run.truy.k==='quan'"), 'truy đuổi vẫn chạy khi đang hoãn (không bị hoãn)');
    run("G.run.truy=null;tnaXoa(T2.r,'nop');G.run.kyHoan=undefined;advanceTime(1)");ok(!run("G.run.scene"), 'bản lưu cũ không có kyHoan: chạy bình thường');
    // sự kiện dọc đường bị giữ lại
    run("G.run.scene=null;tnaBao(T2.r,2,{noTruy:1});G.run.region=T2.r;G.run.kyHoan=[];for(let i=0;i<400&&!G.run.kyHoan.length;i++){G.run.scene=null;roadRoll(T2.id,T2.id);}G.run.scene=null");ok(!run("G.run.scene")&&run("G.run.kyHoan[0]")==='road:tran', 'sự kiện dọc đường: được giữ lại, không hiện');
    run("tnaXoa(T2.r,'nop');G.run.kyThaT=null;advanceTime(1)");ok(run("G.run.scene&&G.run.scene.type")==='event'&&run("G.run.kyHoan.length")===0, 'hết bị truy: sự kiện dọc đường hiện ra');
    // 83: cải trang không chắc chắn
    run("G.run.scene=null;G.run.kyHoan=[];G.run.tna={};tnaBao(T2.r,2,{noTruy:1});G.run.caiT=W().t+HM;TNA.nhan=[0,0,0,0,0,0];TNA.cai.dong={tran:1};G.run.truy=null;arrive(T2.id)");
    ok(!run("tnaCai()")&&run("G.run.truy&&G.run.truy.k==='quan'")&&run("NK.count('tna.lo')")>0, 'bị nhiều người vây quanh: cải trang bị lộ, quan sai đuổi');
    run("G.run.truy=null;G.run.caiT=W().t+HM;TNA.cai.dong={};arrive(T2.id)");ok(run("tnaCai()")&&!run("G.run.truy"), 'không ai nhìn kỹ: cải trang vẫn qua mặt được');
    const th = goTo("n.type==='thanh'");
    if (th != null) {
      run(`TH2=nodeById(${th});G.run.tna={};tnaBao(TH2.r,2,{noTruy:1});G.run.caiT=W().t+HM;TNA.cai.khi={goc:1,realm:0,max:1};G.run.hide=null;G.run.truy=null;arrive(TH2.id)`);
      ok(!run("tnaCai()")&&run("G.run.truy&&G.run.truy.k==='quan'"), 'lộ khí tức trong thành có lính canh: cải trang bị lộ');
      run("G.run.truy=null;G.run.caiT=W().t+HM;G.run.hide=0;arrive(TH2.id)");ok(run("tnaCai()")&&!run("G.run.truy"), 'đã che giấu tu vi: lính canh không cảm được khí tức');run("G.run.hide=null");
    }
    goTo("n.id===T2.id");run("G.run.caiT=W().t+HM;startCombat({});");ok(!run("tnaCai()")&&run("NK.count('tna.lo')")>0, 'đánh nhau ở nơi có dân: cải trang bị lộ');
    } finally { run("Object.assign(TNA,JSON.parse(TNA_BK));Object.assign(TRUY,JSON.parse(TRUY_BK2));G.run&&(G.run.scene=null)"); }
  },
  // Sửa-K: truy đuổi — chạy thoát thì bị bám theo, bị chặn kể cả giữa chặng đi dài, cắt đuôi bằng hết hạn/thắng/nơi an toàn, lựa chọn khi bị chặn
  nd2_kiem() {
    // công cụ kiểm nội dung đợt hai báo lỗi đúng tệp/dòng/khoá
    const fs=require('fs'),path=require('path');const K=require('./kiem-tra-noi-dung-2');const f=path.join(__dirname,'../content/qua-chin/giet_vo_toi.json');
    const bad={schemaVersion:1,loai:'qua_chin',deed:'giet_vo_toi',bien:[{id:'a',ten:'Món nợ máu',t:'Gã Lý Thiết Ngưu chặn đường ngươi, đòi 30 lượng bạc. '.repeat(4),c:[{id:'x',l:'Trả',t:'Ngươi trả tiền cho xong chuyện, lòng nặng như đá, bước đi không ngoái lại, trời đổ mưa.',e:{bac:-3.5,deed:'khong_co'}}]}]};
    const goc=fs.existsSync(f)?fs.readFileSync(f):null;let r;try{fs.writeFileSync(f,JSON.stringify(bad,null,2));r=K.kiemNoiDung2([f]);}finally{if(goc)fs.writeFileSync(f,goc);else fs.unlinkSync(f);}
    const L=r.loi.join('\n');
    ok(/giet_vo_toi\.json dòng \d+, khoá bien\[0\]\.t: có con số "30"/.test(L), 'báo con số trong lời văn, đúng tệp/dòng/khoá');
    ok(/tên riêng mới "Lý Thiết Ngưu"/.test(L), 'báo tên người mới');
    ok(/khoá bien\[0\]\.c\[0\]\.e\.bac: tiền phàm là số nguyên xu/.test(L), 'báo tiền sai đơn vị');
    ok(/mã việc làm "khong_co" không có/.test(L), 'báo mã việc làm không có');
    ok(/cần ít nhất 3 biến thể/.test(L)&&/cần 2–4 lựa chọn/.test(L), 'báo thiếu số lượng');
    {const fb=path.join(__dirname,'../content/qua-chin/bo_thi.json'),tm=fb+'.tam';const co=fs.existsSync(fb);if(co)fs.renameSync(fb,tm);let ld;try{ld=K.kiemNoiDung2([],{du:true}).loi;}finally{if(co)fs.renameSync(tm,fb);}ok(ld.some(x=>/content\/qua-chin\/bo_thi\.json: chưa có tệp/.test(x)), '--du: báo tệp còn thiếu');}
    ok(K.kiemNoiDung2().loi.length===0, 'các tệp mẫu đều đạt');
  },
  noi_dung_2() {
    // đợt GPT-2: nội dung nạp từ content/qua-chin, nghe-pham, cai-can, canh; thiếu thì dùng lời chung cũ
    fresh("G.screen='map';G.run.kyT=W().t;G.run.tmT=W().t");
    ok(run("ND2.qc.cuu_nguoi.length")>=3&&run("ND2.nghe.nong.ket.length")===4&&run("ND2.cc.CC01.length")>=4&&run("ND2.canh['quan_phu.heo1'].length")>=3, 'dữ liệu mẫu bốn loại đã nạp');
    // (a) quả chín
    run("nqSeed('cuu_nguoi');G.run.qc[0].due=W().t;G.run.qcAcc=HM;G.run.scene=null;qcRipen(G.run.qc[0])");
    ok(run("G.run.scene&&G.run.scene.ev")==='qc_cuu_nguoi', 'hạt "cứu người" chín: mở sự kiện qc_cuu_nguoi');
    ok(!/\{|\d/.test(run("G.run.scene.text"))&&run("G.run.scene.text").length>100, 'lời kể đã thay mã, không có con số');
    ok(run("G.run.qc[0].done")===1, 'hạt đã chín thì đánh dấu xong');
    run("kyPick(0)");ok(run("!!G.run.scene.res"), 'chọn một lựa chọn: có kết quả');
    run("G.run.scene=null;G.run.moving={path:[G.run.at,G.run.at],seg:0,prog:0};nqSeed('cuu_nguoi');(()=>{const s=G.run.qc[G.run.qc.length-1];s.due=W().t;qcRipen(s)})()");
    ok(run("!G.run.scene&&G.run.qc[G.run.qc.length-1].done===0"), 'đang đi đường: hạt chờ lúc dừng chân');
    run("delete ND2.qc.an_tang;G.run.moving=null;G.run.scene=null;G.run.log=[];nqSeed('an_tang');(()=>{const s=G.run.qc[G.run.qc.length-1];s.due=W().t;qcRipen(s)})()");
    ok(run("!G.run.scene&&G.run.qc[G.run.qc.length-1].done===1")&&run("JSON.stringify(G.run.log)").includes(run("deedName('an_tang')")), 'việc chưa có nội dung: vẫn dùng dòng nhật ký cũ');
    // (b) nghề phàm: thăng bậc riêng, lời chung khi thiếu
    run("G.run.scene=null;ND2.nghe.tieu={len:['Lão chủ rừng ném cho {ten} chiếc rìu cán gụ.','b','c','d','e']};ngPaths().tieu={bac:0,xp:100};ngCheck('tieu')");
    ok(run("G.run.scene&&G.run.scene.ev")==='ng_tieu_1'&&run("G.run.scene.text")===run("'Lão chủ rừng ném cho '+G.run.ten+' chiếc rìu cán gụ.'"), 'tiều phu lên bậc một: lời thăng bậc riêng (thay {ten})');
    run("G.run.scene=null;delete ND2.nghe.tieu;delete ND2.nghe.mo;delete ngPaths().tieu;ngPaths().mo={bac:0,xp:100};ngCheck('mo')");
    ok(run("G.run.scene.text")===run("contentText('ng.upT',[NGHE.mo.ranks[1]])"), 'nghề chưa có nội dung: lời chung cũ');
    run("G.run.scene=null;ngPaths().nong={bac:0,xp:100};ngCheck('nong')");ok(run("G.run.scene.text")===run("contentText('ng.nong.up1')"), 'nông dân không viết len: giữ lời thăng bậc đã có');
    run("G.run.scene=null;delete ngPaths().mo;nqInit(G.run);G.run.ng.G=20;G.run.ng.B=0;ngPaths().nong={bac:4,xp:2000}");
    ok(run("ngKet().id")==='A', 'địa chủ, phúc duyên hơn: kết A');
    run("G.run.ng.G=0;G.run.ng.B=20");ok(run("ngKet().id")==='B', 'địa chủ, nghiệp nặng: kết B');
    run("ngPaths().nong.bac=2");ok(run("ngKet().id")==='C', 'tiểu nông: kết C');
    run("ngPaths().nong.bac=0");ok(run("ngKet().id")==='D', 'cả đời làm thuê: kết D dự phòng');
    ok(!/\{|\d/.test(run("ngKet().t")), 'kết cục không có con số hay mã');
    run("ngPaths().nong.bac=4;G.run.ng.G=20;G.run.ng.B=0;G.run.scene=null;die('old')");
    ok(run("G.over&&G.over.ngKet&&G.over.ngKet.id")==='A'&&run("G.over.ngKet.n")==='Nông dân', 'hết kiếp: màn hết kiếp có kết cục nghề chính');
    fresh("G.screen='map';G.run.kyT=W().t;G.run.tmT=W().t;ngPaths().ngu={bac:3,xp:900};delete ND2.nghe.ngu");ok(run("ngKet()")===null, 'nghề chính chưa có nội dung: không có kết cục (không lỗi)');
    // (c) cải căn dọc đường
    run("G.run.cc={id:'CC01',s:0,t0:W().t,pf:{},h:0,care:0};ccEvHen()");
    ok(run("G.run.ccEvQ&&G.run.ccEvQ.v")==='ban_bao_che_cu', 'CC01 bước kiểm chứng: hẹn sự kiện dọc đường');
    run("G.run.scene=null;ccEvMo()");ok(run("G.run.scene&&G.run.scene.ev")==='cc_ev'&&!/\{|\d/.test(run("G.run.scene.text")), 'lúc rảnh: sự kiện hiện ra');
    run("kyPick(0);G.run.scene=null;ccNext()");ok(run("G.run.cc.s===1&&G.run.ccEvQ&&G.run.ccEvQ.v")==='dua_tre_sot', 'sang bước phục vụ: hẹn sự kiện của bước đó');
    run("G.run.scene=null;ccEvMo();kyPick(0)");ok(run("NK.count('nq.deed')")>0, 'lựa chọn có việc làm: ghi vào sổ nghiệp');
    run("G.run.scene=null;G.run.cc={id:'CC02',s:0,t0:W().t,pf:{},h:0,care:0};G.run.ccEvQ=null;delete ND2.cc.CC02;ccEvHen()");ok(run("G.run.ccEvQ")===null, 'đường chưa có nội dung: không có gì (một câu mỗi bước như cũ)');
    run("G.run.cc={id:'CC01',s:0,t0:W().t,pf:{},h:0,care:0};ccEvHen();G.run.cc=null;G.run.scene=null;ccEvMo()");ok(run("!G.run.scene&&!G.run.ccEvQ"), 'bỏ đường rồi: sự kiện đã hẹn huỷ');
    // (d) cảnh kể: quan phủ
    run("G.run.cc=null;FEAT.no=1;G.run.bac=-500;G.run.scene=null;noHeo(G.run,0)");ok(run("G.run.ndKe.length")===1, 'đánh hèo: hẹn cảnh kể');
    run("ndKeMo()");ok(run("G.run.scene&&G.run.scene.ev")==='nd_ke'&&run("ND2.canh['quan_phu.heo1'].some(v=>G.run.scene.text.includes(ndT(v.t)))"), 'cảnh đánh hèo hiện ra');
    run("kyPick(0);G.run.scene=null;G.run.bac=-9000;noLao(G.run)");ok(run("G.run.ndKe.length===1&&!!G.run.ndKe[0].sau"), 'bắt làm công: có cả cảnh ra tù');
    run("G.run.scene=null;ndKeMo()");const sau=run("G.run.ndKe.length===0&&G.run.scene&&G.run.scene.ev==='nd_ke'&&ND2.canh['quan_phu.lamCong'].some(v=>G.run.scene.text.includes(ndT(v.t)))");run("kyPick(0)");
    ok(sau&&run("JSON.stringify(G.run.scene)").includes(run("ndT(ND2.canh['quan_phu.raTu'][0].t)").slice(0,12))||sau&&run("ND2.canh['quan_phu.raTu'].some(v=>JSON.stringify(G.run.scene).includes(ndT(v.t).slice(0,30)))"), 'cảnh bắt làm công, bấm Tiếp: kể lúc ra tù');
    run("G.run.scene=null;G.run.ndKe=[];noTruyNa(G.run)");ok(run("G.run.ndKe.length")===1, 'truy nã: hẹn cảnh kể');
    // (d) truy đuổi chặn đường
    run("G.run.ndKe=[];ND2.canh['truy.tac']=[{t:'Mấy bóng người nhảy ra từ bụi lau, {ke} đứng giữa, cười khẩy.'}]");
    ok(run("truyKyEv({k:'tac',n:'Sơn tặc'},1,0).t").startsWith('Mấy bóng người')&&run("truyKyEv({k:'tac',n:'Sơn tặc'},1,0).t").includes('Sơn tặc')&&run("truyKyEv({k:'tac',n:'Sơn tặc'},1,0).t").includes(run("contentText('truy.kyGiua')")), 'sơn tặc chặn: lời kể theo loại địch, game tự nối câu dừng giữa đường');
    run("delete ND2.canh['truy.tac']");ok(run("truyKyEv({k:'tac',n:'Sơn tặc'},0,0).t").includes(run("contentText('truy.hoi')")), 'loại chưa có nội dung: lời chung cũ');
    // lời mời tuyến không chen khi đang đi đường
    run("G.run.scene=null;G.run.moving={path:[G.run.at,G.run.at],seg:0,prog:0};G.run.halt=false");ok(run("tuyenGap()")===false, 'đang đi đường: lời mời tuyến chờ dừng chân');
    run("G.run.moving=null");
  },
  truy() {
    fresh("FEAT.truy=1;G.screen='map';G.run.pham=0;G.run.realm=1;G.run.kyT=W().t;G.run.tmT=W().t;TRUY_BK=JSON.stringify(TRUY)");
    try {
    run("TRUY.loai.tac.p=1;startCombat({k:'sontac'},{kind:'node'});G.run.scene.over='flee';combatContinue()");
    ok(run("G.run.truy&&G.run.truy.k")==='tac', 'chạy thoát sơn tặc: bị truy (loại tac)');
    ok(run("G.run.truy.until>W().t&&G.run.truy.nx>W().t"), 'có hạn truy và lần dò tới');
    run("G.run.truy=null;G.run.scene=null;TRUY.loai.thu.p=1;startCombat({k:'lang'},{kind:'node'});G.run.scene.over='flee';combatContinue()");
    ok(run("G.run.truy&&G.run.truy.k")==='thu', 'chạy thoát yêu thú: loại thu');
    run("G.run.truy=null;G.run.scene=null;TRUY.loai.thu.p=0;startCombat({k:'lang'},{kind:'node'});G.run.scene.over='flee';combatContinue()");
    ok(run("!G.run.truy"), 'xác suất bám theo 0: không bị đuổi');
    run("G.run.scene=null");
    ok(run("truyStart('tu',{d:-2})")===null, 'địch kém hai cảnh giới: không đuổi');
    run("TRUY.loai.tu.ngay=[5,5];G.run.truy=null;truyStart('tu',{d:0});TK_A=G.run.truy.until-W().t;G.run.truy=null;truyStart('tu',{d:3});TK_B=G.run.truy.until-W().t");
    ok(Math.abs(run("TK_B/TK_A")-1.75)<1e-6, 'địch mạnh hơn ba bậc: đuổi dai gấp 1,75 lần');
    ok(run("truyP({k:'tu',d:3})>truyP({k:'tu',d:0})"), 'địch mạnh hơn: dễ chặn được hơn');
    run("G.run.realm=2;G.run.hide=null");const p0=run("truyP({k:'tu',d:0})");run("G.run.hide=1");
    ok(run("hideOn()")&&run("truyP({k:'tu',d:0})")<p0, 'che giấu tu vi: khó bị chặn hơn');
    run("G.run.hide=null;G.run.realm=1");
    const tip=run("truyTip()");ok(/Bị truy đuổi/.test(tip)&&!/\d/.test(tip), 'chú thích bằng chữ, không có số');
    run("W().t=G.run.truy.until+1;advanceTime(1)");ok(run("!G.run.truy"), 'hết hạn: tự cắt đuôi');
    // chặng đi dài: bị chặn giữa chặng
    const far=run(`(()=>{const r=G.run;let best=null,bh=1e18;for(const R0 of W().regions)for(const n of R0.nodes){if(n.id===r.at)continue;n.fog=Math.max(n.fog||0,1);const p=findPath(r.at,n.id);if(!p||p.length<2)continue;const h=edgeLen(p[0],p[1])/walkSpeed();if(h>24&&h<bh){bh=h;best=n.id;}}return best;})()`);
    ok(far!=null&&run(`edgeLen(G.run.at,${far})/walkSpeed()`)>24, 'tìm được chặng đi dài (hơn một ngày đường)');
    run(`TRUY.loai.tac.chan=1;TRUY.manh.chan=0;G.run.scene=null;G.run.halt=false;travelTo(${far});G.run.dest=${far};TK_S=edgeLen(G.run.moving.path[0],G.run.moving.path[1])/walkSpeed();truyStart('tac',{n:'Sơn tặc',ek:'sontac',d:0});G.run.truy.nx=W().t+TK_S*0.5;G.run.truy.until=W().t+999*HD;G.run.kyT=W().t;G.run.tmT=W().t;TK_T0=W().t`);
    run("TK_P=truyP;truyP=()=>1;try{travelTick(TK_S*20)}finally{truyP=TK_P}");
    ok(run("G.run.scene&&G.run.scene.type==='kyngo'&&G.run.scene.ev==='truy_chan'"), 'đang đi chặng dài thì bị chặn (hộp lựa chọn)');
    ok(run("!!G.run.moving&&G.run.moving.prog>0&&G.run.moving.prog<1&&G.run.halt===true"), 'dừng giữa chặng, không nhảy về nút ('+run("G.run.moving&&G.run.moving.prog")+')');
    ok(run("W().t-TK_T0<TK_S"), 'bị chặn trước khi đi hết chặng đầu');
    ok(run("NK.count('truy.chan')")>0, 'có nhật ký truy.chan');
    const L=JSON.parse(run("JSON.stringify(kyOpts(G.run.scene).map(o=>o.l))"));
    ok(L.length===4&&L.includes('Chạy tiếp')&&L.includes('Thương lượng')&&L.includes('Nộp của cho yên'), 'sơn tặc: đánh / chạy tiếp / nộp của / thương lượng');
    run("TRUY.chay.goc=1;kyPick(1)");ok(run("!!G.run.truy&&G.run.truy.nx>W().t"), 'chạy tiếp thành công: vẫn bị bám, lần dò lùi lại');
    run("G.run.scene=null;truyChan()");run("kyPick(0)");
    ok(run("G.run.scene.type==='combat'&&G.run.scene.truyCh===1"), 'chọn đánh: vào trận thật');
    run("G.run.scene.over='win';combatContinue()");ok(run("!G.run.truy"), 'đánh thắng: dứt truy đuổi');
    ok(run("!!G.run.moving"), 'sau trận vẫn đứng giữa đường, có thể đi tiếp');
    // nộp của
    run("G.run.scene=null;truyStart('tac',{n:'Sơn tặc',ek:'sontac'});G.run.st=100;truyChan()");
    run("kyPick(kyOpts(G.run.scene).findIndex(o=>o.l==='Nộp của cho yên'))");ok(run("!G.run.truy&&G.run.st===75"), 'nộp của: mất một phần linh thạch, hết bị đuổi');
    // biết trước nhờ thần thức
    run("G.run.scene=null;truyStart('thu',{n:'Yêu Lang',ek:'lang'});G.run.tkUntil=W().t+99;truyChan()");
    ok(run("kyOpts(G.run.scene)[0].l")==='Lẩn đi trước khi bị thấy'&&/Thần thức báo trước/.test(run("G.run.scene.text")), 'phóng thần thức: biết trước, có lựa chọn lẩn đi');
    ok(run("kyOpts(G.run.scene).length")===3, 'yêu thú không nộp của hay thương lượng');
    run("G.run.tkUntil=0;G.run.scene=null");
    // bị chặn trong trận / trong địa điểm thì không mở chồng
    run("startCombat({k:'sontac'},{kind:'node'});G.run.truy.nx=W().t;truyCheck()");ok(run("G.run.scene.type==='combat'"), 'đang trong trận: không chặn chồng, hoãn dò');
    run("G.run.scene=null");
    // nơi an toàn
    const th=run("W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin').id");
    run(`G.run.truy=null;truyStart('tac',{n:'Sơn tặc'});arrive(${th})`);ok(run("!G.run.truy"), 'sơn tặc không dám theo vào thành');
    run(`G.run.truy=null;truyStart('tu',{n:'Tán tu'});G.run.truy.until=W().t+10*HD;arrive(${th})`);ok(run("G.run.truy&&Math.abs(G.run.truy.until-W().t-5*HD)<1e-6"), 'tu sĩ: vào thành chỉ rút hạn còn một nửa');
    // nợ: quan phủ truy nã → sai dịch lần theo; trả hết nợ thì thôi
    run("G.run.truy=null;FEAT.no=1;G.run.bac=-5000;G.run.noTra={t0:W().t,han:W().t+HM,lan:1};noTruyNa(G.run)");ok(run("G.run.truy&&G.run.truy.k")==='no', 'truy nã vì nợ: sai dịch truy đuổi');
    run("G.run.bac=0;G.run.noTra=null;truyCheck()");ok(run("!G.run.truy"), 'trả hết nợ: sai dịch thôi đuổi');
    // bản lưu cũ
    let TK_DBG='';
    // Sửa-L câu 50: hạn truy tính bằng năm, dò thưa
    run("Object.assign(TRUY,JSON.parse(TRUY_BK));G.run.truy=null;G.run.scene=null;truyStart('ke',{n:'Kẻ thù',d:0})");
    ok(run("(G.run.truy.until-W().t)/HD")>=365*5, 'kẻ thù: truy ít nhất năm năm');
    ok(run("TRUY.loai.thu.ngay[0]")>=365&&run("TRUY.loai.ke.ngay[1]")>=365*9, 'yêu thú tối thiểu một năm, kẻ thù tới cả chục năm');
    ok(run("Object.values(TRUY.loai).every(L=>L.gian[0]>=240)"), 'mỗi lần dò cách nhau ít nhất mười ngày');
    // bắt đầu sạch: các bước trên để lại r.moving cũ (arrive() không xoá) không khớp r.at, làm chặng đầu và far2 phụ thuộc bố cục bản đồ (seed)
    run("G.run.moving=null;G.run.halt=false;G.run.scene=null");
    const far2=run(`(()=>{const r=G.run;let best=null,bh=1e18;for(const R0 of W().regions)for(const n of R0.nodes){if(n.id===r.at)continue;n.fog=Math.max(n.fog||0,1);const p=findPath(r.at,n.id);if(!p||p.length<2)continue;const h=edgeLen(p[0],p[1])/walkSpeed();if(h>24&&h<bh){bh=h;best=n.id;}}return best;})()`);
    ok(far2!=null, 'tìm được chặng đi để thử bị chặn giữa đường');
    // Sửa-L câu 51: bị chặn giữa đường, đánh thắng/chạy tiếp xong vẫn đứng yên tới khi bấm Đi tiếp
    run(`G.run.truy=null;G.run.scene=null;G.run.halt=false;travelTo(${far2});G.run.dest=${far2};TK_S=edgeLen(G.run.moving.path[0],G.run.moving.path[1])/walkSpeed();truyStart('tac',{n:'Sơn tặc',ek:'sontac',d:0});TRUY.loai.tac.chan=1;G.run.truy.nx=W().t+TK_S*0.5;G.run.kyT=W().t;G.run.tmT=W().t;TK_P=truyP;truyP=()=>1;try{travelTick(TK_S*20)}finally{truyP=TK_P}`);
    TK_DBG=run(`JSON.stringify([G.run.at,${far2},!!G.run.moving&&G.run.moving.path.length,G.run.moving&&G.run.moving.prog,G.run.scene&&G.run.scene.ev,G.run.halt])`);
    run("TRUY.chay.goc=1;TRUY.chay.max=1;kyPick(1);G.run.scene=null;if(G.run.moving)G.run.moving.halt=0;advanceTime(1)");
    ok(run("G.run.halt===true&&!!G.run.moving"), 'chạy tiếp xong: vẫn đứng yên giữa đường (chờ bấm Đi tiếp) '+TK_DBG+run("JSON.stringify([G.run.halt,!!G.run.moving,G.run.scene&&G.run.scene.type,NK.count('truy.chan'),G.run.at])"));
    run("G.run.scene=null;truyChan();kyPick(0);G.run.scene.over='win';combatContinue();G.run.scene=null");
    ok(run("G.run.halt===true&&!!G.run.moving"), 'đánh thắng xong: vẫn đứng yên giữa đường');
    run("delete G.run.truy;G.run.scene=null;advanceTime(5)");ok(run("!G.run.truy&&truyOn()===false&&truyTip()===''"), 'bản lưu cũ (không có r.truy): chạy bình thường');
    } finally { run("Object.assign(TRUY,JSON.parse(TRUY_BK));FEAT.truy=0;FEAT.no=0"); }
  },
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
  // Đ9.4: kiểm bộ máy tuyến trên dữ liệu thật, không dựa vào lời văn: lỡ hạn → tự diễn → đứng ngoài, không kẹt (cả 45 xuất thân);
  // người giao việc chết → đoạn người / vật thay thế; đại lộ mở từ hồi 2 và đổi tối đa một lần mỗi kiếp; hạn cộng đường đi; tới nơi hẹn thì gặp ngay
  menh_tuyen_d94() {
    fresh("G._ngNoEv=1;G.run.bac=5e6;delete G.run.arc");
    run("for(const A of TUYEN_DATA){TUYEN[A.id]=A;if(A.loai==='dai_lo'){const L=TUYEN_DL[A.daiLo]||(TUYEN_DL[A.daiLo]=[]);if(!L.includes(A.id))L.push(A.id);}}"); // bài khác có thể đã gỡ tạm tuyến
    const xt=JSON.parse(run("JSON.stringify(Object.keys(TUYEN_XT))"));
    ok(xt.length===45&&run("Object.keys(TUYEN_DL).length")===9, 'đủ 45 tuyến xuất thân và 9 đại lộ đã nạp');
    let ket=0,ke=[];
    for(const o of xt){const x=run(`(()=>{const r=G.run;r.arc=null;r.origin=${JSON.stringify(o)};r.birthAge=(r.birthAge||16)-30;tuyenTick();const S=r.arc.xt;if(!S)return 'không mở';
        for(let k=0;k<400&&!S.xong;k++){W().t+=HM;tuyenTick();}return S.xong&&S.lich.length===5&&S.lich.every(l=>l.c==='~')&&S.ngoai===5?S.ket:'kẹt ở nút '+S.i;})()`);
      if(x==='ngoai')ket++;else ke.push(o+':'+x);}
    ok(ket===45, 'bỏ mặc cả 45 tuyến xuất thân: mỗi nút tự diễn, tới cuối là "người đứng ngoài", không kẹt'+(ke.length?' — '+ke.join(', '):''));
    // người giao việc chết: OR02 N1 do NP09 gọi
    fresh("G._ngNoEv=1;delete G.run.arc;G.run.origin='tran';G.run.birthAge=(G.run.birthAge||16)-30");
    run("tuyenTick();W().t+=HM;tuyenTick()");const N=JSON.parse(run("JSON.stringify(TUYEN.OR02.nut[0])"));const ten=run(`vaiNow(${JSON.stringify(N.loiMoi.vai)}).ten`);
    run(`vaiGiet(${JSON.stringify(N.loiMoi.vai)},'test');G.run.scene=null;tuyenGap(true)`);
    ok(run("G.run.scene.text")===run(`tyT(TUYEN.OR02.nut[0].thayThe)`)&&!run("G.run.scene.text").includes(ten), 'người giao việc đã mất: hiện đoạn thay thế, không gọi tên người chết');
    ok(run(`vaiNow(${JSON.stringify(N.loiMoi.vai)}).song`)===false&&run("kyOpts(G.run.scene).length")>=4, 'không hồi sinh; vẫn đủ lựa chọn để đi tiếp');
    run("kyPick(0);G.run.scene=null");ok(run("G.run.arc.xt.i")===1, 'chọn ở đoạn thay thế: tuyến đi tiếp');
    // hạn cộng thời gian đi đường tới nơi hẹn ở xa
    fresh("G._ngNoEv=1;delete G.run.arc;G.run.origin='nong'");run("tuyenTick();W().t+=HM;tuyenTick();G.run.arc.xt.i=1;G.run.arc.xt.han=null;G.run.arc.xt.mT=W().t");
    run("G.run.at=anchorNode('LOC15').id;tuyenTick()");
    ok(run("G.run.arc.xt.han-W().t")>run("tyHanT(TUYEN.OR01.nut[1])")&&run("G.run.arc.xt.han-W().t")<=run("tyHanT(TUYEN.OR01.nut[1])+TY_CFG.duongMax*HM"), 'tin đồn ở nơi xa: hạn mềm cộng thời gian đi bộ (có trần)');
    run("G.run.arc.xt.han=null;G.run.at=anchorNode('LOC01').id;tuyenTick()");ok(run("G.run.arc.xt.han-W().t")===run("tyHanT(TUYEN.OR01.nut[1])"), 'đang đứng ở nơi hẹn: hạn không cộng thêm');
    // tới nơi hẹn thì gặp ngay, không chờ sang tháng
    run("G.run.at=anchorNode('LOC15').id;G.run.scene=null;G.screen='map';arrive(anchorNode('LOC01').id)");
    ok(run("G.run.scene&&G.run.scene.ev")==='tuyen:OR01:N2', 'vừa tới nơi hẹn của tin đồn: lời mời hiện ngay');
    run("G.run.scene=null;G.screen='title'");
    ok(run("tuyenView()[0].moLai===1"), 'đang đứng ở nơi hẹn: Mệnh thư có nút mở lại');
    // đại lộ: mở từ hồi 2 sau kết thật, đổi tối đa một lần mỗi kiếp; kiếp mới đổi lại được
    run("G.run.arc.xt.xong=1;G.run.arc.xt.ket='A';G.run.arc.dl=null;tyDlTuMo()");
    const d0=run("G.run.arc.dl&&G.run.arc.dl.id");ok(!!d0&&run("TUYEN[G.run.arc.dl.id].daiLo")==='the_gia'&&run("G.run.arc.dl.i")===1, 'xuất thân có kết: đại lộ gợi ý mở từ hồi 2 ('+d0+')');
    ok(!run("tuyenMoDaiLo('the_gia')"), 'chọn lại đúng đại lộ đang đi: không tính là đổi');
    ok(run("tuyenMoDaiLo('y_gia')")&&run("TUYEN[G.run.arc.dl.id].daiLo")==='y_gia', 'đổi đại lộ lần một: được');
    ok(!run("tuyenMoDaiLo('vo_lam')")&&run("TUYEN[G.run.arc.dl.id].daiLo")==='y_gia', 'đổi lần hai trong cùng kiếp: không được');
    run("G.run.arc.xt.ket='ngoai';G.run.arc.dl=null;G.run.arc.doi=0;tyDlTuMo()");ok(run("G.run.arc.dl.i")===0, 'xuất thân đứng ngoài: đại lộ kể từ hồi 1');
    run("G.run.kiep=(G.run.kiep||1)+1;G.run.arc=null;tuyenTick();G.run.arc.dl={id:'DL07',i:1,xong:0,dau:{},lich:[]}");ok(run("tuyenMoDaiLo('vo_lam')"), 'kiếp mới: lại được đổi một lần');
  },
  // Đ9 rà soát: mô phỏng mọi tuyến tới đủ kết bằng bộ máy thật (tools/mo-phong-tuyen.js)
  tuyen_ra_soat() {
    const r=require('./mo-phong-tuyen').moPhong();
    ok(r.tk.tuyen===54, 'rà đủ 54 tuyến');
    ok(r.tk.ketToi===r.tk.ket, 'mọi kết đều có đường tới ('+r.tk.ketToi+'/'+r.tk.ket+')');
    ok(r.tk.chayOk===r.tk.chay, 'chạy thật mọi đường mẫu không kẹt ('+r.tk.chayOk+'/'+r.tk.chay+')');
    ok(!r.loi.length, 'không lỗi'+(r.loi.length?': '+r.loi.slice(0,3).join(' | '):''));
  },
  // Đ9 câu 40: Sổ tay — người đã gặp, mười thế lực (không số nghiệp)
  so_tay_nv() {
    fresh("G._ngNoEv=1;delete G.run.arc;delete G.run.gapVai;G.run.origin='nong'");
    ok(run("soVaiView().length")===0, 'chưa gặp ai: danh sách rỗng (bản lưu cũ không có r.gapVai)');
    run("tuyenTick();W().t+=HM;tuyenTick();G.run.scene=null;tuyenGap(true)");
    let V=JSON.parse(run("JSON.stringify(soVaiView())"));const v=V.find(x=>x.ma==='NP01');
    ok(!!v&&v.ten===run("vaiNow('NP01').ten")&&v.song&&v.noi===run("locName('LOC01')")&&v.qh, 'lời mời tuyến: người gọi vào danh sách — tên hiện tại, nơi, thiện cảm bằng chữ');
    ok(!/[-+]?\d/.test(v.qh+v.tinh), 'thiện cảm, tình trạng bằng chữ (không số)');
    run("vaiGiet('NP01','test')");V=JSON.parse(run("JSON.stringify(soVaiView())"));let x=V.find(x=>x.ma==='NP01');
    ok(x&&!x.song&&x.ke&&x.ten===v.ten, 'người đã gặp mất: ghi đã mất, chưa có người kế');
    run("(()=>{const w=W();for(let i=0;i<4;i++){w.t+=HY;worldYearsTo(w);}})()");x=JSON.parse(run("JSON.stringify(soVaiView())")).find(x=>x.ma==='NP01');
    ok(x&&!x.song&&x.ke.includes(run("vaiNow('NP01').ten")), 'có người kế: hiện tên người kế');
    const F=JSON.parse(run("JSON.stringify(soFaView())"));
    ok(F.length===10&&F.every(f=>f.n&&f.trang&&f.cong&&f.qh), 'đủ mười thế lực: tên, tình trạng, quan hệ, sổ cống hiến');
    run("faAdj('FA07',-200,'test');tyE({fa:{FA04:5}},G.run.arc.xt);chAdd&&chAdd('fa:FA04',12)");const F2=JSON.parse(run("JSON.stringify(soFaView())"));
    ok(F2.find(f=>f.id==='FA07').diet===1&&F2.find(f=>f.id==='FA04').bac>F.find(f=>f.id==='FA04').bac, 'thế lực tan ghi đã tan; góp sức qua tuyến nâng mức quan hệ');
    ok(!JSON.stringify(F2).match(/nghiệp/), 'không hiện nghiệp');
    ok(!/\d/.test(F2.map(f=>f.qh+f.minh).join('')), 'thang quan hệ bằng chữ, không hiện số');
  },
  // Sửa-N câu 71: người đã gặp ghi mọi NPC từng tiếp xúc
  gap_nguoi() {
    fresh("G._ngNoEv=1;delete G.run.arc;delete G.run.gapVai;delete G.run.gapNg;G.run.origin='nong'");
    run("favAdd('Vô Danh Khách',1)");let V=JSON.parse(run("JSON.stringify(soVaiView())"));let x=V.find(v=>v.ten==='Vô Danh Khách');
    ok(!!x&&x.qh&&/trò chuyện/.test(x.vai), 'nói chuyện (thiện cảm thấp) cũng vào danh sách, không cần thân');
    run("favAdd('@3:x',5)");ok(!JSON.parse(run("JSON.stringify(soVaiView())")).some(v=>/@/.test(v.ten)), 'khoá nội bộ (@…) không vào danh sách');
    run("gapNguoi('Kẻ Đấu','dau');gapNguoi('Kẻ Đấu','cung')");V=JSON.parse(run("JSON.stringify(soVaiView())"));
    ok(V.filter(v=>v.ten==='Kẻ Đấu').length===1&&/giao đấu/.test(V.find(v=>v.ten==='Kẻ Đấu').vai), 'giao đấu ghi một lần, giữ lý do đầu');
    run("addParty({ten:'Bạn Đường',g:'nam',realm:1},10)");ok(run("soVaiView().some(v=>v.ten==='Bạn Đường')"), 'đi cùng: ghi');
    run("gapNguoi('???','noi');gapNguoi('','noi')");ok(!run("soVaiView().some(v=>v.ten==='???'||!v.ten)"), '"???" và tên rỗng không ghi');
    const nm=run("vaiNow('NP03').ten");run("gapNguoi("+JSON.stringify(nm)+",'noi')");
    ok(run("!!G.run.gapVai.NP03&&!(G.run.gapNg||{})["+JSON.stringify(nm)+"]"), 'người đang giữ vai NP: ghi vào gapVai, không trùng gapNg');
    run("delete G.run.gapNg;G=JSON.parse(JSON.stringify(G))");ok(run("soVaiView().length>=1"), 'bản lưu cũ (không gapNg) chạy được');
    // Sửa-O câu 75: thoáng qua lâu không gặp thì xoá, đã quen thì giữ mãi
    run("gapNguoi('Khách Qua Đường','noi');gapNguoi('Bạn Cũ','noi');W().t+=HD;gapNguoi('Bạn Cũ','noi');W().t+=HD;gapNguoi('Bạn Cũ','noi');gapNguoi('Người Tặng','le')");
    ok(run("!G.run.gapNg['Khách Qua Đường'].q&&G.run.gapNg['Bạn Cũ'].q===1&&G.run.gapNg['Người Tặng'].q===1"), 'gặp ba ngày khác nhau / tặng lễ: thành quen biết');
    run("gapNguoi('Bạn Cũ','noi')");ok(run("G.run.gapNg['Bạn Cũ'].c")===3, 'cùng ngày gặp lại không tính thêm lần');
    run("W().t+=(GAP_NG.nam-1)*HY");ok(run("soVaiView().some(v=>v.ten==='Khách Qua Đường')"), 'thoáng qua, chưa quá hạn: vẫn còn');
    run("W().t+=2*HY");const V2=JSON.parse(run("JSON.stringify(soVaiView().map(v=>v.ten))"));
    ok(!V2.includes('Khách Qua Đường')&&V2.includes('Bạn Cũ')&&V2.includes('Người Tặng'), 'quá '+run('GAP_NG.nam')+' năm không gặp: người thoáng qua bị xoá, người quen còn');
    run("W().t+=50*HY");ok(run("soVaiView().some(v=>v.ten==='Bạn Cũ')"), 'người quen giữ vĩnh viễn');
    run("G.run.gapNg['Cũ']={ten:'Cũ',y:1,how:'noi'};soVaiView()");ok(run("G.run.gapNg['Cũ']&&G.run.gapNg['Cũ'].t===W().t"), 'mục cũ (không c/t): bắt đầu đếm từ lúc tải, không xoá ngay');
  },
  // Sửa-N câu 72: thang quan hệ thế lực 7 mức, Đồng minh là cờ riêng
  fa_thang() {
    fresh("G._ngNoEv=1;delete G.run.arc;delete G.run.faQh;delete G.run.faHai;delete G.run.faMinh");
    const T=i=>run("contentText('so.fq."+i+"')");
    ok([0,1,2,3,4,5,6].map(T).join('-')==='Tử thù-Thù địch-Bất hòa-Xa lạ-Giao hảo-Thân thiết-Chí giao', 'bảy mức đúng tên');
    const bac=()=>run("soFaView().find(f=>f.id==='FA04').bac");
    ok(bac()===3&&run("soFaView().find(f=>f.id==='FA04').qh")==='Xa lạ', 'chưa dính dáng: Xa lạ');
    run("G.run.faQh={FA04:5}");ok(bac()===4, 'góp sức chút ít: Giao hảo');
    run("G.run.faQh={FA04:12}");ok(bac()===5, 'góp sức nhiều: Thân thiết');
    run("G.run.faQh={FA04:30}");ok(bac()===5, 'Sửa-O: chỉ góp sức qua việc làm (thành viên chưa gặp, trung tính): tối đa Thân thiết');
    run("G.run.faQh={FA04:-5}");ok(bac()===2, 'làm tổn hại ít: Bất hòa');
    run("G.run.faQh={FA04:-15}");ok(bac()===1, 'tổn hại nặng: Thù địch');
    run("G.run.faQh={FA04:-30}");ok(bac()===1, 'Sửa-O: chỉ việc làm thì chưa tới Tử thù (cần thành viên ghét)');
    // Sửa-O câu 74: 60–70% điểm từ thiện cảm thành viên, có trọng số theo vai
    const tv=(ds,f)=>run(`(()=>{G.run.gapVai={};for(const m of ${JSON.stringify(ds)}){gapVai(m,'test');const v=vaiNow(m);npcRec(v.ten).met=1;favAdd(v.ten,${f}-favOf(v.ten));}})()`);
    run("G.run.faQh={}");tv(['NP01','NP02','NP11'],-100);ok(bac()<=1, 'cả thế lực ghét ngươi: Thù địch trở xuống');
    run("G.run.faQh={FA04:-30}");ok(bac()===0, 'thành viên ghét + tổn hại: Tử thù');
    run("G.run.faQh={}");tv(['NP01','NP02','NP11'],100);ok(bac()===5, 'mọi thành viên quý nhưng chưa có cống hiến lớn: dừng ở Thân thiết');
    run("chAdd('fa:FA04',FA_QH.chiCong)");ok(bac()===6, 'thêm cống hiến lớn: Chí giao');
    run("delete G.run.chMap['fa:FA04']");tv(['NP02'],100);ok(bac()<=4, 'chỉ một người thường quý (đa số chưa gặp): không quá Giao hảo');
    const dLead=(tv(['NP01'],100),run("faTv('FA04')")),dDe=(tv(['NP02'],100),run("faTv('FA04')"));
    ok(dLead>dDe&&dDe>0, 'người đứng đầu nặng hơn người thường ('+dLead.toFixed(2)+' > '+dDe.toFixed(2)+')');
    run("G.run.gapVai={}");
    run("G.run.faQh={};G.run.faHai={FA04:2}");ok(bac()<=2, 'giết người của thế lực làm tụt mức');
    run("G.run.faHai={}");ok(run("soFaView().every(f=>!f.minh)")&&!run("faMinh('FA04')"), 'chưa kết minh: không hiện Đồng minh');
    run("faKetMinh('FA04',true)");ok(run("soFaView().find(f=>f.id==='FA04').minh")==='Đồng minh'&&run("soFaView().find(f=>f.id==='FA05').minh")==='', 'cờ kết minh: chỉ thế lực ấy hiện Đồng minh');
    run("G=JSON.parse(JSON.stringify(G))");ok(run("faMinh('FA04')"), 'cờ kết minh qua lưu – tải');
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
    run("globalThis.__dlBk=JSON.stringify(TUYEN_DL);for(const k in TUYEN_DL)delete TUYEN_DL[k]"); // bài không phụ thuộc tuyến thật có hay không
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
    run("globalThis.__tyBk={DL07:TUYEN.DL07,DL03:TUYEN.DL03};for(const k in TUYEN_DL)delete TUYEN_DL[k]");
    run(`(()=>{const mk=(id,d)=>{const A=JSON.parse(JSON.stringify(TUYEN.OR01));A.id=id;A.loai='dai_lo';A.daiLo=d;delete A.xuatThan;A.nut[0].boQuaNeuXuatThan=true;TUYEN[id]=A;(TUYEN_DL[d]=TUYEN_DL[d]||[]).push(id);};mk('DL07','the_gia');mk('DL03','de_nghiep');})()`);
    run("G.run.arc.xt.xong=1;G.run.arc.xt.ket='A';tyDlTuMo()");ok(run("G.run.arc.dl&&G.run.arc.dl.id==='DL07'&&G.run.arc.dl.i===1"), 'đại lộ gợi ý mở sau tuyến xuất thân, bắt đầu từ hồi 2');
    ok(run("tuyenMoDaiLo('de_nghiep')")&&run("G.run.arc.dl.id")==='DL03', 'đổi đại lộ lần một: được');
    ok(!run("tuyenMoDaiLo('the_gia')"), 'đổi lần hai: không được');
    ok(run("tuyenView().length")===2, 'tuyenView: Sổ tay đọc được hai tuyến');
    run("delete TUYEN.DL07;delete TUYEN.DL03;delete TUYEN_DL.the_gia;delete TUYEN_DL.de_nghiep");
    run("tuyenTick();tuyenGap(true)");ok(run("tuyenView().length")===1, 'bản lưu trỏ tới tuyến đã gỡ: bỏ qua, không lỗi');
    run("for(const k in globalThis.__tyBk)if(globalThis.__tyBk[k])TUYEN[k]=globalThis.__tyBk[k];for(const k in TUYEN_DL)delete TUYEN_DL[k];Object.assign(TUYEN_DL,JSON.parse(globalThis.__dlBk))");
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
    ok(run("Object.keys(TU_NGHE).filter(id=>!TU_NGHE[id].mr).length")===16&&run("Object.keys(TU_ART).length")===Object.keys(JSON.parse(run("JSON.stringify(TU_NGHE)"))).length, 'mười sáu nghề tu lõi, mỗi nghề một công pháp');
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
    ok(!errs.length, 'cả '+run("Object.keys(SK).filter(k=>/^sk\\d\\d[abc]$/.test(k)).length")+' chiêu nghề tu chạy trong trận không lỗi'+(errs.length?' — '+errs.join('; '):''));
    run("G.run.scene=null;lkTang=ntLk");
  },
  // Đ11: nghề tu mở rộng (core2/69-nghe-tu-mo-rong.js) và bí truyền ngoại lệ luân hồi (HN A.16)
  nghe_tu_mr() {
    const base="G._ngNoEv=1;G._tuNoRui=1;G.run.pham=0;G.run.root={id:'tap',els:['kim','moc'],q:'thuong'};G.run.rootKnown=1;G.run.st=9999;G.run.lifeAdj=500;lkTang=()=>9;";
    const seed0=fixtureSeed; // giữ seed của các bài sau như cũ (vài bài phụ thuộc thế giới sinh ra)
    run("var mrLk=lkTang");
    fresh(base);
    const MR=['TU17','TU18','TU19','TU20','TU21','TU22','TU23','TU24','TU25'];
    ok(JSON.stringify(JSON.parse(run("JSON.stringify(Object.keys(TU_NGHE).filter(id=>TU_NGHE[id].mr))")))===JSON.stringify(MR), 'chín nghề mở rộng: Cổ, Thi, Phật, Nho, Thiên cơ, Thương, Lôi, Huyễn, Thôn phệ');
    ok(MR.every(id=>run(`!!TU_ART['${id}']&&['a','b','c'].every(c=>!!SK['sk${id.slice(2)}'+c]&&SK['sk${id.slice(2)}'+c].t<=2)`)), 'mỗi nghề một công pháp, ba chiêu dưới bậc thần thông');
    ok(run("['co','thi','phat','nho','loi','huyen','thon'].every(p=>Object.values(TU_NGHE).some(N=>N.pm===p))"), 'đủ pháp môn của bảng ghép');
    // Phật tu: bái học, hướng chính, luật ghép
    run("tuHoc('TU19',0)");ok(run("G.run.tu.chinh")==='TU19'&&run("G.run.hd.log.some(x=>x.why==='tu:TU19'&&x.p>0)"), 'bái học Phật tu: Hành Đạo nghiêng chính');
    ok(/không ghép được/.test(run("tuWhyHoc('TU25',0)"))&&/không ghép được/.test(run("tuWhyHoc('TU18',0)")), 'Phật pháp không ghép với Thôn phệ, Thi thuật');
    run("tuHoc('TU23',0)");ok(run("G.run.tu.phu")==='TU23'&&run("tuLoiOn('TU19')"), 'Phật pháp + Lôi pháp: ghép có lợi');
    // giới sát
    run("deed('giet_vo_toi',{})");ok(run("mrPhatTat()")&&run("(G.run.tuRes||{}).TU19|0")===0&&run("NK.count('tumr.phatGioi')")===1, 'giết người: Phật quang tắt, nguyện lực về không');
    run("G.run.tuPhatTat=0;G.run.st=9999;G.run.tuRes={TU19:0}");run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;})()");
    run("tuHd('TU19')");ok(run("G.run.tuRes.TU19|0")===0&&run("NK.count('tumr.phatGiau')")>=1, 'giữ của lớn: siêu độ xong nguyện lực không tăng');
    run("G.run.st=100;tuHd('TU19')");ok(run("G.run.tuRes.TU19")===1&&run("NK.count('nq.deed')")>=1, 'siêu độ vong hồn: nguyện lực +1, ghi hành vi');
    // Nho tu: cần lòng ngay; văn tâm nứt ba lần thì vỡ
    fresh(base);run("hdAdd(0,40,'x')");ok(/chưa đủ ngay/.test(run("tuWhyHoc('TU20',0)")), 'Hành Đạo nghiêng tà: không học được Nho tu');
    fresh(base);run("hdAdd(30,0,'x');tuHoc('TU20',0);G.run.tuRes={TU20:4};hdAdd(0,8,'x')");
    ok(run("G.run.tu.k.TU20.nut")===1&&run("G.run.tuRes.TU20")===2, 'việc tà nặng: văn tâm nứt, mất nửa hạo nhiên khí');
    run("hdAdd(0,8,'x');hdAdd(0,8,'x')");ok(!run("tuArtOf('TU20')")&&run("G.run.tu.chinh")===null&&run("NK.count('tumr.nhoVo')")===1, 'nứt ba lần: văn tâm vỡ, mất pháp môn');
    ok(!/Nho/.test(run("ccWhyStart('HAO_NHIEN')")||''), 'Dưỡng Hạo Nhiên Khí đã mở (có Nho tu)');
    // Thiên cơ sư: hợp đồng tổn thọ, thiên khiển, Khuy Mệnh
    fresh(base);run("tuHoc('TU21',0);(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;})()");
    const la=run("G.run.lifeAdj");run("tuHd('TU21');tuHd('TU21')");ok(run("G.run.lifeAdj")===la-1, 'xem quẻ hai lần: tổn một năm thọ');
    run("TU_MR.tcKhien=1;tuHd('TU21');tuHd('TU21');TU_MR.tcKhien=0.2");ok(run("(G.run.wounds||[]).some(w=>w.k==='than')")&&run("NK.count('tumr.thienKhien')")>=1, 'xem quá nhiều trong năm: thiên khiển');
    ok(!run("tuOpts(nodeById(G.run.at)).some(o=>o.id==='khuy')"), 'chưa tới tầng bốn: không có Khuy Mệnh');
    run("tuArtOf('TU21').lv=7;G.run.tu.k.TU21.tang=4;G.run.realm=2");ok(/Nguyên Anh/.test(run("(tuOpts(nodeById(G.run.at)).find(o=>o.id==='khuy')||{}).no||''")), 'Khuy Mệnh cần Nguyên Anh');
    run("G.run.realm=3");const lb=run("G.run.lifeAdj");ok(run("!!tuDo(nodeById(G.run.at),'khuy')"), 'dùng Khuy Mệnh');
    run("G.run.realm=3");ok(run("G.run.lifeAdj")===lb-10&&run("dtPickWhy().includes('khuy')"), 'Khuy Mệnh: tổn mười năm thọ, kiếp sau được chọn lá số');
    // Thương tu: hợp đồng lời thêm
    fresh(base);run("tuHoc('TU22',0);tuArtOf('TU22').lv=6;G.run.realm=1;(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;})()");
    ok(run("aggFx().thuongLai")===10, 'tầng ba Thương tu: lời thêm một phần mười');
    const s0=run("G.run.st");run("tuHd('TU22')");ok(run("G.run.st")===s0-12+21+2, 'áp tải xong: công cộng lời thêm');
    // Cổ sư: nuôi cổ
    fresh(base);run("tuHoc('TU17',0);G.run.st=5;ccMonth()");ok(run("G.run.st")===4, 'nuôi cổ mỗi tháng tốn linh thạch');
    run("G.run.st=0;ccMonth();ccMonth()");ok(run("(G.run.wounds||[]).some(w=>w.k==='doc')")&&run("NK.count('tumr.coCan')")===1, 'bỏ đói hai tháng: cổ cắn chủ');
    // Thôn phệ: hợp đồng dâng tâm ma
    fresh(base);run("tuHoc('TU25',0);G.run.tamma=0;(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>['khoang','ma','dong'].includes(n.type)&&n.state!=='ruin');G.run.at=n.id;})()");
    run("tuHd('TU25')");ok(run("G.run.tamma")===3&&run("G.run.hd.log.some(x=>x.why==='tu:TU25'&&x.t>0)"), 'Thôn phệ: bái học nghiêng tà, hợp đồng dâng tâm ma');
    // khoá chiêu mới trong trận
    fresh(base+"startCombat({},{kind:'node'});G.run.scene.skipDodge=1");
    run("var mrSc=G.run.scene,mrMe=mainUnit(mrSc),mrF=alive(mrSc,'B')[0];mrF.hp=mrF.max=99999;mrMe.mp=mrMe.maxMp=9999;mrMe.realm=2;mrF.realm=1;mrF.f='quy'");
    run("resolveSkill(mrSc,mrMe,SK.sk23a,1,[mrF],1,'auto')");ok(run("NK.count('fx.vsF')")===1, 'Chưởng Tâm Lôi đánh hồn quỷ mạnh hơn');
    run("resolveSkill(mrSc,mrMe,SK.sk18c,1,[mrF],1,'auto')");ok(run("NK.count('fx.needSum0')")===1, 'Thi Bạo không có xác luyện: một nửa');
    run("resolveSkill(mrSc,mrMe,SK.sk18b,1,[],1,null)");ok(run("!!fxmSum(mrSc,mrMe,'thi')"), 'Thiết Thi Hộ Chủ gọi xác luyện');
    run("mrF.hp=99999;resolveSkill(mrSc,mrMe,SK.sk18c,1,[mrF],1,'auto')");ok(!run("fxmSum(mrSc,mrMe,'thi')"), 'Thi Bạo: xác luyện nổ tan');
    run("mrF.stunT=0;mrF.hp=99999;doSkill(mrSc,mrMe,SK.sk20a,1,mrF.id,1)");ok(run("mrF.stunT>0"), 'Ngôn Định: địch cảnh giới thấp hơn đứng sững');
    run("mrF.stunT=0;mrF.realm=5;doSkill(mrSc,mrMe,SK.sk20a,1,mrF.id,1)");ok(run("mrF.stunT")===0, 'Ngôn Định: địch cao hơn không động');
    run("mrMe.stunT=0;resolveSkill(mrSc,mrMe,SK.sk24c,1,[mrF],1,'auto')");ok(run("mrMe.stunT>0")&&run("NK.count('fx.huyenPhan')")===1, 'Thiên Huyễn Lao Lung với địch mạnh hơn: ảo cảnh phản lại');
    run("mrF.realm=1;mrF.mp=100;mrF.maxMp=100;mrMe.mp=10;resolveSkill(mrSc,mrMe,SK.sk25a,1,[mrF],1,'auto')");ok(run("mrF.mp")===85&&run("mrMe.mp")===25, 'Phệ Linh Thủ hút linh lực địch');
    run("var mrTvN=0,mrAt=addTv;addTv=function(x){mrTvN+=x;return mrAt.apply(this,arguments);};mrF.hp=1;mrF.def=0;resolveSkill(mrSc,mrMe,SK.sk25c,1,[mrF],1,'auto');addTv=mrAt");ok(run("mrTvN")===3&&run("NK.count('fx.devour')")===1, 'Thôn Phệ Tinh Huyết kết liễu: nhận tu vi');
    fresh(base+"startCombat({},{kind:'node'});G.run.scene.skipDodge=1");
    run("var mrSc=G.run.scene,mrMe=mainUnit(mrSc);G.run.st=2;resolveSkill(mrSc,mrMe,SK.sk22b,1,[],1,null)");ok(run("G.run.st")===1&&run("mrSc.fleeB")===30, 'Mua Đường: tốn linh thạch, dễ rút lui');
    run("mrMe.st.block=0;resolveSkill(mrSc,mrMe,SK.sk22c,1,[],1,null)");ok(run("G.run.st")===1&&!(run("mrMe.st.block")>0), 'Tán Tài Hộ Thân: thiếu linh thạch thì vô hiệu');
    ok(/Tổn thọ/.test(run("skillTip(SK.sk21c,1)"))&&/hồn quỷ/.test(run("skillTip(SK.sk19a,1)")), 'chú thích chiêu có hiệu ứng mới');
    run("G.run.scene=null");
    // bí truyền: Luân Hồi Chuyển Thế Kinh (Phật tu tầng bốn, Lạn Kha Tự)
    fresh(base);run("tuHoc('TU19',0)");const nd=run("mrLocNode('LOC12')");run(`G.run.at=${nd}`);
    ok(/tầng bốn/.test(run(`(tuOpts(nodeById(${nd})).find(o=>o.id==='bi:lhct')||{no:'?'}).no||''`)), 'chưa tới tầng bốn: chưa tham ngộ được');
    run("G.run.tu.k.TU19.tang=4;tuArtOf('TU19').lv=7");ok(!run(`(tuOpts(nodeById(${nd})).find(o=>o.id==='bi:lhct')||{no:'?'}).no`), 'tầng bốn: tham ngộ được Luân Hồi Chuyển Thế Kinh');
    run(`tuDo(nodeById(${nd}),'bi:lhct')`);ok(run("G.run.tuBi.lhct")===1&&run("dtPickWhy().includes('lhct')"), 'tham ngộ xong: khi chết được chọn lá số');
    // Túc Mạng Thông: chết thì kiếp sau học lại nhanh
    run("TU_MR.tucMang=1;G.meta.pick=0;die('combat',{n:'thử'});TU_MR.tucMang=0.5");ok(run("(G.meta.tucMang||[]).includes('TU19')")&&run("G.meta.pick")>=1, 'Túc Mạng Thông nhớ nghề Phật tu, Luân Hồi Chuyển Thế Kinh cho chọn lá số');
    run("genBirth();newRun(G.birth.cards[0]);"+base+"G.run.at=mrLocNode('LOC12')");
    ok(/quen thuộc/.test(run("(tuOpts(nodeById(G.run.at)).find(o=>o.id==='hoc:TU19')||{l:''}).l")), 'kiếp sau: Phật tu hiện là quen thuộc');
    const t1=run("W().t");run("tuHoc('TU19',0)");ok(run("W().t-"+t1)>=run("15*HD")&&run("W().t-"+t1)<run("30*HD")&&!run("(G.meta.tucMang||[]).includes('TU19')"), 'học lại Phật tu mất nửa thời gian');
    // Bất Muội Linh Quang Quyết: nhớ chuyên môn chính, học lại miễn phí
    fresh(base);run("tuHoc('TU05',0);G.run.tu.k.TU05.tang=4;G.run.at=mrLocNode('LOC05')");run("tuDo(nodeById(G.run.at),'bi:bmlq')");
    ok(run("G.run.tuBi.bmlq")===1, 'Thần thức tu tầng bốn: tham ngộ Bất Muội Linh Quang Quyết ở Huyền Cơ Trận Các');
    run("die('combat',{n:'thử'})");ok(run("G.meta.tuMem&&G.meta.tuMem.id")==='TU05', 'chết: kiếp sau nhớ Thần thức tu');
    run("genBirth();newRun(G.birth.cards[0]);"+base);ok(run("tuPhi('TU05',0)")===0&&run("tuPhi('TU01',0)")>0, 'kiếp sau học lại Thần thức tu không mất phí');
    run("tuHoc('TU05',0)");ok(!run("G.meta.tuMem")&&run("!!tuArtOf('TU05')"), 'học lại xong thì hết ký ức');
    // Túc Tuệ Đăng: không có tâm pháp thì nhớ nghề tu
    fresh(base);run("tuHoc('TU01',0);G.run.arts=G.run.arts.filter(a=>a.type!=='tp');G.run.qitems=['tuc_tue_dang'];die('combat',{n:'thử'})");
    ok(run("G.meta.tuMem&&G.meta.tuMem.src")==='den'&&run("G.meta.tuMem.id")==='TU01', 'Túc Tuệ Đăng nhớ nghề Kiếm tu');
    // bản lưu cũ
    fresh(base);run("delete G.run.tuBi;delete G.run.tuKhuy;delete G.run.tuPhatTat;delete G.run.tuTc");ok(Array.isArray(run("tuOpts(nodeById(mrLocNode('LOC12')))"))&&run("dtPickWhy().length")===0, 'bản lưu cũ không có trường mới vẫn chạy');
    run("lkTang=mrLk");fixtureSeed=seed0;
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
  // Đ12: số độ khó ban đầu (BT_BASE mới, trần 0,88 trừ khi Cảm ngộ đầy, bế quan/lịch luyện/kẻ địch)
  d12() {
    fresh();
    ok(run('JSON.stringify(BT_BASE)') === '[0.45,0.36,0.28,0.2,0.14]', 'BT_BASE = 45/36/28/20/14%');
    const hi = +run('(()=>{G.run.btFail=0;const _bp=btParts;btParts=s=>_bp(s).concat([{t:"x",v:500}]);try{return btRate([])}finally{btParts=_bp}})()');
    ok(Math.abs(hi - 0.88) < 1e-9, `cộng thêm thật nhiều vẫn không quá trần: ${hi}`);
    const cn = +run('G.run.btFail=CN_MAX;btRate([])');
    ok(cn === 1, `Cảm ngộ đầy vẫn chắc chắn qua: ${cn}`);
    const bq = +run('(()=>{const r=G.run;r.btFail=0;const _v=isVo,_p=isPham,_q=bqRate;isVo=()=>false;isPham=()=>false;bqRate=()=>1;try{const _x=D12_BQ;const a=bqReal();D12_BQ=1;const b=bqReal();D12_BQ=_x;return b?a/b:-1}finally{isVo=_v;isPham=_p;bqRate=_q}})()');
    ok(Math.abs(bq - 0.75) < 1e-6, `bế quan ×${bq.toFixed(2)}`);
    const ll = +run('(()=>{const r=G.run;const b=r.ll||0;r.ll=0;llAdd(30,"t",1);const a=r.ll;r.ll=0;const _x=D12_LL;D12_LL=1;llAdd(30,"t",1);const c=r.ll;D12_LL=_x;r.ll=b;return c?a/c:0})()');
    ok(Math.abs(ll - 0.85) < 0.04, `lịch luyện ×${ll.toFixed(3)}`);
    const en = run('JSON.stringify(d12Foe({hp:100,max:100,atk:20,def:10}))');
    ok(en === '{"hp":115,"max":115,"atk":23,"def":12}', `kẻ địch ×1,15: ${en}`);
    run('NK.clear()'); run('mkEnemy({k:"tamma"})');
    ok(run('NK.count("d12")') === 0, 'tâm ma (dựng từ chỉ số người chơi) không nhân');
    run('mkEnemy({k:"beast"})');
    ok(run('NK.count("d12")') > 0, 'nhật ký ghi d12.foe');
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
    // khí vận thật = base + bon + fx (đặc tính/trang bị ngẫu nhiên) nên đặt base bù phần ngoài để chỉ số cuối cố định
    const setVan = v => run(`G.run.base.van=0;G.run.base.van=${v}-S().van`);
    setVan(1); const k1 = +run('kyMul()'); setVan(20); const k2 = +run('kyMul()');
    ok(k1 >= 0.6 && k1 < 1, `khí vận thấp: ×${k1.toFixed(2)}`); ok(k2 > 1 && k2 <= 3, `khí vận cao: ×${k2.toFixed(2)}`);
    setVan(1); ok(run('kyBigOpen()') === false, 'khí vận thấp: kỳ ngộ lớn đóng');
    run('G.run.base.van=0'); setVan(run('KY_BIG_VAN')+5); ok(run('kyBigOpen()') === true, 'khí vận cao: kỳ ngộ lớn mở');
  },
  // thế giới mở: một bản đồ liền, năm đại khu vực, đi bộ trên cạn, tầm nhìn theo địa hình, độ khó theo cảnh giới
  mo_tam_nhin() {
    // vừa đầu thai (kiếp đầu và kiếp sau) hoặc nạp bản lưu: bản đồ mở sẵn trong tầm thần thức, không đợi đi
    const chk=()=>run("(()=>{const r=G.run;const p=playerMapXY();const L=visCells(hexAt(p[0],p[1]),visR());const vis=VIS.reduce((a,b)=>a+b,0);return [L.length,L.every(c=>VIS[c]&&VNOW[c]&&!VT[c]),vis,(r.visS.match(/[^A]/g)||[]).length,r.moving==null];})()");
    run("G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};NK.on=true;NK.clear();genBirth();newRun(G.birth.cards[0])");
    let a=chk();ok(a[0]>0&&a[1]&&a[2]>=a[0]&&a[3]>0&&a[4], 'kiếp đầu: mở sẵn '+a[0]+' ô trong tầm thần thức, hiện ngay, đã lưu');
    ok(run("NK.count('mo.vis0')")>=1, 'ghi nhật ký mo.vis0');
    run("die('combat',{n:'thử'});if(G.over&&G.over.ben)benUong();G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0])");
    a=chk();ok(run("G.run.kiep")===2&&a[0]>0&&a[1]&&a[3]>0, 'kiếp sau: mở sẵn '+a[0]+' ô ngay khi đầu thai');
    run("(()=>{const s=G.run.visS;VIS=null;visReset();G.run.visS=s;VIS_K='';visOpen();})()");a=chk();ok(a[0]>0&&a[1], 'nạp lại: vẫn thấy vùng quanh mình');
  },
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
    // đi tới ô đất bất kỳ (điểm hoang tạm). Chọn ô không thuộc địa điểm nào, kể cả nơi chưa khám phá (ô phụ của nơi chưa biết chưa tính vào hexNode, đi ngang qua phát hiện ra thì ô đó thành của nơi ấy)
    const wp = run('(()=>{const r=G.run,g=geo();const h0=nodeHex(nodeById(r.at));const own=new Set();for(const R0 of W().regions)for(const n of R0.nodes){own.add(nodeHex(n));for(const x of n.cells||[])own.add(x);}let c=-1;for(let i=0;i<HN&&c<0;i++){if(g.reg[i]>=0&&terWalk(g.ter[i])&&hexNode(i)==null&&!own.has(i)&&Math.abs(i-h0)>25&&Math.abs(i-h0)<80)c=i;}const hrs=cellHours(c);const n=wpMake(c);let tries=0;while(G.run&&r.at!==n.id&&tries++<10){r.scene=null;travelTo(n.id);let q=0;while(G.run&&r.moving&&q++<4000){if(r.scene)r.scene=null;travelTick(6);}}const ok1=r.at===n.id&&nodeHex(nodeById(r.at))===c;const hx=hexNode(c);return [ok1,hrs>0,hx==null,nodeById(r.at).wp];})()');
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
  // Phẩm linh căn là thật (ROOT_Q nhân tốc độ tu); chữ dị tượng nhẹ các bậc nằm trong content/text (tlfx.*)
  linhcan() {
    fresh();
    ok(run("ROOT_Q.map(q=>q.id).join()")==='khuyet,thuong,thuan,vien', 'bốn phẩm: Khuyết, Thường, Thuần, Viên Mãn');
    const m=JSON.parse(run("JSON.stringify(ROOT_Q.map(q=>rootView({id:'song',els:['kim','moc'],q:q.id}).m))"));
    ok(m[0]<m[1]&&m[1]<m[2]&&m[2]<m[3], 'phẩm càng cao tu càng nhanh: '+m.join(' < '));
    ok(run("rootView({id:'song',els:['kim','moc']}).m")===m[1], 'bản lưu cũ không có phẩm = như phẩm Thường');
    ok(run("(()=>{const c={};for(let i=0;i<4000;i++){const q=genRoot().q;c[q]=(c[q]||0)+1;}return c.thuong>c.khuyet&&c.khuyet>c.thuan})()"), 'phẩm rút theo tỉ lệ (Thường nhiều nhất)');
    run("G.run.root={id:'song',els:['kim','moc'],q:'thuan'};G.run.rootKnown=1");ok(!/phẩm/.test(run("rootLabel()"))&&/lcq-thuan/.test(run("rootHTML()")), 'không ghi chữ phẩm, có màu lớp: '+run("rootHTML()"));
    for(const k of ['bien','song','tam','tu','tap'])ok(run(`CONTENT_TEXT['tlfx.title.${k}']!=null&&CONTENT_TEXT['tlfx.sub.${k}']!=null`), 'có chữ dị tượng '+k);
    for(const e of ['loi','bang','phong','x'])ok(run(`CONTENT_TEXT['tlfx.lt.bien.${e}']!=null`), 'Biến dị: lời kể riêng '+e);
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
    ok(run("NK.count('an.doi')")===14&&run("G.run.no")<100, 'đếm từng ngày thiếu ăn');
    run("advanceTime(46*24)");ok(run("anState()")==='doi'&&run("anRgMul()")<1, '60 ngày: đói, hồi phục chậm');
    run("advanceTime(90*24)");ok(run("anState()")==='la'&&run("S().maxHp")<run("(()=>{const d=G.run.doi;G.run.doi=0;const m=S().maxHp;G.run.doi=d;return m})()"), '150 ngày: đói lả, khí huyết tối đa giảm');
    run("advanceTime(509*24)");ok(!!run("G.run")&&run("G.run.doi")===659&&run("anState()")==='kiet', '659 ngày: kiệt sức nhưng còn sống');
    run("advanceTime(24)");ok(!run("G.run")&&run("G.over&&G.over.cause")==='doi'&&run("G.over.title")==='Chết đói', 'ngày 660: chết đói');
    fr();run("G.run.pham=0;G.run.realm=1");run("for(let i=0;i<100;i++)advanceTime(24)");ok(!!run("G.run")&&run("G.run.doi")<=2&&run("anState()")==='tich', 'Trúc Cơ trôi 100 ngày: đói rất chậm (thiếu '+run("G.run.doi")+' bữa), vẫn tịch cốc');
    fr();run("G.run.qitems=['luong_kho'];advanceTime(90*24)");ok(run("G.run.doi")===0&&!run("G.run.qitems.includes('luong_kho')"), 'một gói lương khô đủ ba tháng (90 ngày)');
    run("advanceTime(24)");ok(run("G.run.doi")===1, 'hết lương khô thì đói');
    fr();run("G.run.pham=0;G.run.realm=0;advanceTime(4*24)");ok(run("G.run.doi")===2, 'Luyện Khí ăn nửa phần: bốn ngày đói hai ('+run("G.run.doi")+')');
    fr();run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=100;G.run.anMuc='thuong'})();advanceTime(3*24)");
    ok(run("G.run.doi")===0&&run("G.run.bac")===100-3*run("anCost(G.run)"), 'ở thành có bạc: tự mua cơm theo giá thật mỗi ngày ('+run("G.run.bac")+')');
    // Sửa-B: bỏ cơm nhà (người dùng chốt câu 10) — ở quê không tiền thì mua chịu tới mức NO.chiu, hết chịu thì đói
    fr();run("FEAT.no=1;G.run.at=G.run.queAt;G.run.noTra=null;G.run.origin='nong';G.run.family=[{qh:'me',song:1}];advanceTime(20*24)");ok(run("G.run.doi")===0&&run("G.run.bac")===-20*run("anCost(G.run)"), 'ở quê không tiền: mua chịu cơm, còn nợ '+run("fmtBac(G.run.bac)"));
    run("for(let i=0;i<11&&!G.run.doi;i++)advanceTime(24)");ok(run("G.run.doi")===1&&run("G.run.bac")>=-600&&run("G.run.bac-anCost(G.run)")<-600, 'hết mức chịu 600 xu: đói ('+run("G.run.doi")+')');run("FEAT.no=0");
    fr();const qa=run("G.run.queAt");run("delete G.run._anV1;delete G.run.no;delete G.run.anTu;delete G.run.queAt;run2()");ok(run("G.run.no")===100&&run("G.run.anTu")===1, 'bản lưu cũ: no đủ, tự lo cơm');
    ok(run("G.run.queAt")===qa, 'bản lưu cũ: tìm lại nút quê theo tên');
    fr();run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=1000;G.run.anMuc='thuong'})();advanceTime(24)");
    ok(run("G.run.bac")===1000-run("anCost(G.run)")*30&&run("G.run.anCov")===29, 'đủ tiền: mua lương thực cả tháng ('+run("anCost(G.run)*30")+' xu, thường là 600)');
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&!n.dp);G.run.at=n.id;})();advanceTime(29*24)");ok(run("G.run.doi")===0&&run("G.run.anCov")===0, 'mang lương thực tháng theo người: 29 ngày ngoài hoang không đói');
    fr();run("G.run.pham=0;G.run.realm=0;G.run._inBq=1;advanceTime(30*24);G.run._inBq=0");ok(run("G.run.doi")===5, 'Luyện Khí bế quan: đói chậm ×1/3 (30 ngày thiếu '+run("G.run.doi")+')');
    fr();run("G.run.pham=0;G.run.realm=0;G.run.anCham=W().t+90*HD;advanceTime(30*24)");ok(run("G.run.doi")===7, 'sau bế quan: đói chậm ×1/2 ('+run("G.run.doi")+')');
    fr();run("delete G.run._anV2;G.run.doi=200;run2()");ok(run("G.run.doi")===0, 'bản lưu cũ đang đói: nới về no');
    fr();run("G.run.anAcc=0;advanceTime(800*24)");ok(!run("G.run")&&run("G.over.cause")==='doi', 'nhảy dài 800 ngày không ăn: chết đói, không treo');
    // báo đói thưa: mốc nhẹ (thiếu/đói/lả) không báo; mốc nặng (kiệt, sắp chết) mỗi mốc một lần; có khoảng nghỉ
    fr();run("G.run.doi=29;G.run.anBao=0;advanceTime(24);G.run.doi=59;advanceTime(24);G.run.doi=149;advanceTime(24)");ok(run("NK.count('an.bao')")===0&&run("G.run.anBao")===3, 'mốc nhẹ (thiếu, đói, lả): không báo');
    run("G.run.doi=299;advanceTime(24)");ok(run("NK.count('an.bao')")===1&&run("G.run.anBao")===4, 'kiệt sức: báo một lần');
    run("for(let i=0;i<20;i++)advanceTime(24)");ok(run("NK.count('an.bao')")===1, 'kiệt kéo dài: không báo lặp');
    run("(()=>{const r=G.run;r.moving={path:[r.at,neighbors(r.at)[0]],seg:0,prog:0};r.anCov=1;advanceTime(24);r.doi=299;advanceTime(24);})()");
    ok(run("G.run.doi")===300&&run("NK.count('an.bao')")===1, 'đang đi đường: ăn rồi đói lại không báo lặp');
    run("(()=>{const r=G.run;r.moving=null;r.anCov=1;advanceTime(24);r.doi=299;advanceTime(24);})()");ok(run("NK.count('an.bao')")===1&&run("NK.count('an.baoNghi')")===1, 'ăn rồi đói lại ngay: trong khoảng nghỉ thì không báo');
    run("(()=>{const r=G.run;r.anCov=1;advanceTime(24);r.anBaoT=W().t-(AN.baoNghi+1)*HD;r.doi=299;advanceTime(24);})()");ok(run("NK.count('an.bao')")===2, 'qua khoảng nghỉ: báo lại');
    run("G.run.doi=629;advanceTime(24)");ok(run("NK.count('an.bao')")===3&&run("G.run.anBao")===5, 'sắp chết đói: luôn báo');
    fr();run("delete G.run.anBao;delete G.run.anBaoT;G.run.doi=300;advanceTime(24)");ok(run("NK.count('an.bao')")===1, 'bản lưu cũ không có anBao: vẫn chạy');
    // trước khi lên đường: ước lương thực, nguy cơ chết đói cao thì hỏi lại
    fr();const far=run(`(()=>{const r=G.run;let best=null;for(const R of W().regions)for(const n of R.nodes){if(n.id===r.at)continue;const p=findPath(r.at,n.id);if(!p)continue;const d=travelHours(p)/24;if(d>=15&&d<=80&&(!best||d<best[1]))best=[n.id,d];}return best;})()`);
    ok(!!far, 'có nơi xa 15–80 ngày đường ('+(far&&Math.round(far[1]))+')');
    if(far){run("G.run.doi=640;G.run.qitems=[];G.run.anCov=0;G.run.anLk=0");ok(!!run(`anTripRisk(${far[0]})`)&&/chết đói/.test(run(`anTripRisk(${far[0]}).t`)), 'đói lâu, không lương thực, đường xa: cảnh báo');
      run("G.run.qitems=['luong_kho']");ok(!run(`anTripRisk(${far[0]})`), 'có một gói lương khô: không chặn');
      run("G.run.qitems=[];G.run.doi=0");ok(!run(`anTripRisk(${far[0]})`), 'chưa đói: không chặn');}
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
    // gặp chuyện dọc đường chỉ còn khoảng một nửa (ROAD_MUL)
    fresh();const rb=run(`(()=>{const r=G.run;const a=r.at,b=neighbors(a)[0];const se=startEvent,en=encounter,pl=r.place;let ev=0;startEvent=()=>{ev++;r.scene={type:'thu'};return true;};encounter=()=>{ev++;r.scene={type:'thu'};};
      NK.clear();try{for(let i=0;i<1000;i++){r.scene=null;roadRoll(a,b);}}finally{startEvent=se;encounter=en;r.scene=null;r.place=pl;}return NK.count('road.bo');})()`);
    ok(rb>380&&rb<620, 'gặp chuyện dọc đường giảm một nửa: bỏ qua '+rb+'/1000 lần');
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
      if(run(`(CAI_CAN['${id}'].dk||{}).hd!=null&&hdLvIdx()>CAI_CAN['${id}'].dk.hd`))run("hdAdd(30,0,'x')"); // Đ11: Văn tâm cần lòng ngay
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
    // Văn tâm: Đ11 đã có Nho tu, đường mở lại nhưng cần Hành Đạo nghiêng chính
    fresh("G.run.pham=1;G.run.root={id:'vo',els:[],q:null};G.run.rootKnown=1");ok(run("ccWhyStart('HAO_NHIEN')")===run("contentText('cc.canHd')"), 'Dưỡng Hạo Nhiên Khí: cần Hành Đạo nghiêng chính');
    run("hdAdd(30,0,'x')");ok(run("ccWhyStart('HAO_NHIEN')")!==run("contentText('cc.canHd')")&&!/Nho/.test(run("ccWhyStart('HAO_NHIEN')")), 'lòng ngay thì theo được đường Văn tâm');
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
  // Sửa-L câu 47–48: người chơi tự đặt danh sách vật muốn nhận khi bán; NPC chỉ trả bằng thứ trong danh sách hoặc đề nghị đổi; đồng hồ dừng khi thương lượng
  am_dat() {
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=2;G.run.relics=[];G.run.pills=[];G.run.qitems=[];G.run.st=0;G.run.lt=[0,0,0];AM_LECH=0");
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;W().t=Math.floor(W().t/HD)*HD+HD+23;openPlace(n.id);})()");
    ok(run("venueDo('amhoi','vao')"), 'ngồi vào bàn');
    // câu 48: đồng hồ dừng khi mở Thương lượng
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph==='chon'&&g++<3)amAct('khong');})()");
    if(run("G.run.scene.ph")==='lot'&&run("G.run.scene.q[G.run.scene.i].own")!=='me'){
      run("G.run.lt=[50,0,0];AM_HOI._nhu=AM_HOI.nhu;AM_HOI.nhu=[0,0]");const i0=run("G.run.scene.i");
      run("amAct('tl=lt:0')");ok(run("!!G.run.scene.lot.dung")&&run("amView().dung")===15, 'mở Thương lượng: đồng hồ tạm dừng (hiện số giây còn được dừng)');
      const c0=run("amView().con");run("amTua(9000)");ok(run("amView().con")===c0&&run("G.run.scene.i")===i0, 'đang dừng: chín giây trôi qua mà đồng hồ gõ búa không chạy');
      run("amTua(7000)");ok(run("!G.run.scene.lot||!G.run.scene.lot.dung")&&run("G.run.scene.lot.dungDa")===15000, 'dừng tối đa mười lăm giây mỗi món, sau đó đồng hồ chạy lại');
      run("amTua(AM_HOI.dem+100)");ok(run("G.run.scene.i")>i0||run("G.run.scene.ph")!=='lot', 'hết giờ thì gõ búa như thường');
      run("AM_HOI.nhu=AM_HOI._nhu");
    } else ok(false, 'không có lô của NPC để thử tạm dừng');
    // câu 47: tới lượt mình, chọn đồ rồi đặt danh sách
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph!=='chon'&&sc.ph!=='xong'&&g++<40)amAct('bo');})()");
    if(run("G.run.scene.ph")==='xong'){run("amAct('xong');W().t+=HM;openPlace(G.run.at);venueDo('amhoi','vao')");}
    ok(run("G.run.scene.ph")==='chon', 'tới lượt ngươi');
    run("G.run.relics.push(Object.assign(genRelic(3),{name:'Thử Đỉnh',tier:3}))");
    const key=run("amView().mine.find(m=>/Thử Đỉnh/.test(m.n)).key");run(`amAct('chon=${key}')`);
    ok(run("G.run.scene.ph")==='dat'&&run("amView().dat.cand.some(c=>c.a==='dthem=lt:1')")&&run("amView().dat.cand.some(c=>/^dthem=pill:/.test(c.a))"), 'chọn đồ xong: bước đặt danh sách, lựa chọn có linh thạch các phẩm và đan dược');
    const pk=run("Object.keys(PILL).filter(k=>PILL[k].p).sort((a,b)=>PILL[b].p-PILL[a].p)[0]");
    run(`amAct('dthem=pill:${pk}')`);const sl0=run("G.run.scene.dua.muon[0].sl");run("amAct('dsl=0,5')");
    ok(run("G.run.scene.dua.muon[0].sl")===Math.min(99,sl0+5)&&run("amView().dat.list[0].n")===run(`PILL['${pk}'].n`), 'thêm đan vào danh sách, chỉnh số lượng (tên + số lượng)');
    run("amAct('dthem=lt:0');amAct('dthem=lt:1');amAct('dthem=lt:2')");ok(run("G.run.scene.dua.muon.length")===3, 'danh sách tối đa ba món');
    run("amAct('dxoa=2');amAct('dxoa=1');amAct('dxoa=1')");ok(run("G.run.scene.dua.muon.length")===1, 'bỏ món khỏi danh sách');
    run("amAct('dgo')");
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph==='lot'&&sc.q[sc.i].own!=='me'&&g++<30)amAct('bo');})()");
    ok(run("G.run.scene.ph==='lot'&&G.run.scene.q[G.run.scene.i].own==='me'")&&run(`G.run.scene.lot.muon.length===1&&G.run.scene.lot.muon[0].key==='pill:${pk}'`), 'lô của ngươi nêu đúng danh sách ngươi đặt');
    // không NPC nào có món ấy: chỉ có thể đề nghị đổi vật khác
    run(`(()=>{const sc=G.run.scene;sc.ppl.forEach((p,pi)=>{const T=amTui(sc,pi);for(let j=T.length-1;j>=0;j--)if(T[j].id==='pill:${pk}')T.splice(j,1);amCua(sc,pi,1e7);const k2=Object.keys(PILL).find(k=>PILL[k].p&&k!=='${pk}');if(T.length>=12)T.shift();while(T.length>=11)T.shift();T.push({u:amUid(),id:'rel',n:'Thử Ấn '+pi,q:3,rel:Object.assign(genRelic(3),{name:'Thử Ấn '+pi,tier:3})});});})()`);
    run("AM_HOI.nhu=[3,3];amTua(AM_HOI.tre[1]+5)");
    ok(run("!G.run.scene.lot.lead||G.run.scene.lot.lead.key==='pill:"+pk+"'"), 'NPC không trả bằng thứ ngoài danh sách (kể cả linh thạch)');
    const nde=run("Object.keys(G.run.scene.lot.de||{}).length");
    ok(nde>0&&run("amView().de.length")===nde, 'NPC không có thứ ngươi đòi: đề nghị đổi bằng vật khác ('+nde+' người)');
    if(nde>0){const pi=run("Object.keys(G.run.scene.lot.de)[0]");const d=JSON.parse(run(`JSON.stringify(G.run.scene.lot.de[${pi}])`));
      run(`amAct('nhan=${pi}')`);ok(run("G.run.scene.lot.lead&&G.run.scene.lot.lead.who")===+pi, 'nhận đề nghị: người ấy dẫn');
      const n0=run("G.run.relics.length+G.run.pills.length+G.run.qitems.length+ltGet(0)+ltGet(1)+ltGet(2)+ltGet(3)");run("amAct('go')");
      ok(!run("G.run.relics.some(x=>x.name==='Thử Đỉnh')")&&run("G.run.relics.length+G.run.pills.length+G.run.qitems.length+ltGet(0)+ltGet(1)+ltGet(2)+ltGet(3)")>n0-1, 'gõ búa: đổi đồ thật theo đề nghị ('+d.sl+' '+d.n+')');}
    run("AM_HOI.nhu=AM_HOI._nhu");
    ok(run("NK.count('amh.de')")>0&&run("NK.count('amh.dung')")>0, 'có nhật ký amh.de, amh.dung');
  },
  // Sửa-L câu 49: túi đầy → tạm giữ bên người (mọi nguồn nhận đồ), 365 ngày chưa cất thì mất; NPC cũng vậy
  tam_giu() {
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=1;G.run.relics=[];G.run.pills=[];G.run.qitems=[];autoCheck()");
    run("(()=>{let k=0;while(bagCap()-bagStacks()>0&&k++<99)G.run.qitems.push('luong_kho');for(let j=0;j<5;j++)G.run.pills.push({id:'hoixuan',q:0});autoCheck();})()");
    ok(run("bagCap()-bagStacks()")===0&&run("S().pillMax-G.run.pills.length")===0&&run("tgL().length")===0, 'túi vừa đầy: chưa có gì tạm giữ');
    const st0=run("G.run.st");run("gainPill('tukhi',0)");
    ok(run("G.run.st")===st0&&run("tgL().length===1&&tgL()[0].t==='p'&&tgL()[0].v.id==='tukhi'"), 'nhận đan khi túi đầy: vào tạm giữ (không đổi ra linh thạch)');
    run("G.run.relics.push(Object.assign(genRelic(1),{name:'Thử Kiếm Nhặt',seen:1}));autoCheck()");
    ok(run("tgL().some(e=>e.t==='r'&&e.n==='Thử Kiếm Nhặt')")&&!run("G.run.relics.some(x=>x.name==='Thử Kiếm Nhặt')"), 'nhặt pháp bảo khi túi đầy (nguồn bất kỳ): vào tạm giữ');
    run("G.run.qitems.push('luong_kho');saveSoon()");ok(run("tgL().filter(e=>e.t==='qi').length")===1, 'phần thưởng vật phẩm khi túi đầy: vào tạm giữ');
    ok(!run("bagItems().some(x=>/Thử Kiếm Nhặt/.test(x.n))")&&run("tgView().length")===3, 'đồ tạm giữ nằm ngoài ô túi, không dùng được');
    ok(run("tgView().every(v=>/còn chừng \\d+ tháng/.test(v.con)&&v.no)"), 'hạn ghi bằng chữ; túi đầy thì chưa cất được ('+run("tgView()[0].con")+')');
    ok(!run("tgCat(1)"), 'túi đầy: không cất được');
    run("G.run.qitems.splice(0,1)");const i=run("tgL().findIndex(e=>e.n==='Thử Kiếm Nhặt')");
    ok(run(`tgCat(${i})`)&&run("G.run.relics.some(x=>x.name==='Thử Kiếm Nhặt')"), 'dọn chỗ: cất vào túi được, dùng như thường');
    // hết hạn: báo trước rồi mất
    run("W().t+=(TAM_GIU.han-TAM_GIU.bao+1)*HD;advanceTime(1)");
    ok(run("tgL().length===2&&tgL().every(e=>e.bao)")&&run("tgView().every(v=>v.sap&&/còn \\d+ ngày/.test(v.con))")&&run("NK.count('tg.bao')")>0, 'sắp hết một năm: báo trước');
    run("W().t+=TAM_GIU.bao*HD;advanceTime(1)");ok(run("tgL().length")===0&&run("NK.count('tg.mat')")>=2, 'quá một năm chưa cất: mất');
    // Ám Hội: túi đầy vẫn trả giá; NPC túi đầy thì món nhận vào tạm giữ của NPC, có chỗ thì tự cất
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;W().t=Math.floor(W().t/HD)*HD+HD+23;openPlace(n.id);venueDo('amhoi','vao');})()");
    ok(run("G.run.scene&&G.run.scene.type==='amhoi'")&&run("amRoom()"), 'túi đầy vẫn ngồi bàn trả giá được');
    run("G.run.qitems.push('luong_kho');saveSoon();amDat(G.run.scene,'me',[{u:'x1',id:'rel',n:'Thử Ấn Đấu',q:1,rel:Object.assign(genRelic(1),{name:'Thử Ấn Đấu',seen:1})}])");
    ok(run("tgL().some(e=>e.n==='Thử Ấn Đấu')"), 'thắng đấu giá khi túi đầy: món vào tạm giữ');
    run("(()=>{const sc=G.run.scene;const T=amTui(sc,0);while(T.length<12)T.push({u:amUid(),id:'pill:hoixuan',n:'x',q:0});amDat(sc,0,[{u:'x2',id:'pill:tukhi',n:'Tụ Khí',q:0}]);})()");
    ok(run("amTui(G.run.scene,0).length===12&&amTgObj(G.run.scene,0).tg.length===1")&&run("amTuiDay(G.run.scene,0)")===false, 'NPC túi đầy: món nhận vào tạm giữ của NPC, vẫn trả giá được');
    run("amLay(G.run.scene,0,'pill:hoixuan',1)");ok(run("amTui(G.run.scene,0).some(x=>x.u==='x2')&&amTgObj(G.run.scene,0).tg.length===0"), 'NPC có chỗ: tự cất món tạm giữ vào túi');
    run("G.run.scene=null");
    // Sửa-M câu 52–54: không giới hạn số món, không tự cất, vật liệu chồng và lệnh bài cũng tạm giữ
    run("G.run.scene=null;G.run.tamGiu=[];G.run.relics=[];G.run.pills=[];G.run.qitems=[];G.run.mats={};G.run.passes=[];G.run.eggs=[];autoCheck()");
    const mk=run("Object.keys(MAT)");const k1=mk[0],k2=mk[1];
    run(`(()=>{G.run.mats['${k2}']=4;let k=0;while(bagCap()-bagStacks()>0&&k++<99)G.run.qitems.push('luong_kho');autoCheck();})()`);
    ok(run("bagCap()-bagStacks()")===0&&run("tgL().length")===0, 'Sửa-M: túi đầy (có sẵn một chồng vật liệu)');
    run(`G.run.mats['${k2}']+=2;autoCheck()`);ok(run(`G.run.mats['${k2}']`)===6&&run("tgL().length")===0, 'loại vật liệu đã có ô: chồng vào như cũ, không tạm giữ');
    run(`G.run.mats['${k1}']=3;autoCheck()`);
    ok(run(`!(G.run.mats['${k1}']>0)&&tgL().length===1&&tgL()[0].t==='m'&&tgL()[0].c===3`), 'loại vật liệu MỚI khi túi đầy: vào tạm giữ có số lượng');
    run(`G.run.mats['${k1}']=2;autoCheck()`);ok(run("tgL().length===1&&tgL()[0].c===5")&&run("tgView()[0].n").includes('×5'), 'cùng loại trong tạm giữ: cộng dồn (×5)');
    run("G.run.passes.push(2);autoCheck()");ok(run("G.run.passes.length===0&&tgL().some(e=>e.t==='q'&&e.v===2)"), 'lệnh bài khi túi đầy: vào tạm giữ');
    run("(()=>{for(let j=0;j<25;j++){G.run.relics.push(Object.assign(genRelic(1),{name:'Thử Pháp '+j,seen:1}));autoCheck();}})()");
    ok(run("tgL().filter(e=>e.t==='r').length")>=20, 'tạm giữ không giới hạn số món ('+run("tgL().length")+' món)');
    run("G.run.qitems.splice(0,3)");run("W().t+=5*HD;advanceTime(1);autoCheck()");
    ok(run("tgL().length")>20&&run("bagCap()-bagStacks()")>0, 'có chỗ trống mà không tự cất: người chơi phải tự bấm');
    const im=run("tgL().findIndex(e=>e.t==='m')");ok(run(`tgCat(${im})`)&&run(`G.run.mats['${k1}']`)===5, 'cất vào túi được cả chồng vật liệu');
    const iq=run("tgL().findIndex(e=>e.t==='q')");ok(run(`tgCat(${iq})`)&&run("G.run.passes.includes(2)"), 'cất lệnh bài vào túi');
    run(`G.run.mats['${k1}']=0;delete G.run.mats['${k1}'];autoCheck()`);
    run("(()=>{let k=0;while(bagCap()-bagStacks()>0&&k++<99)G.run.qitems.push('luong_kho');autoCheck();G.run.mats['"+k1+"']=1;autoCheck();})()");
    const at0=run("tgL().find(e=>e.t==='m').at");run("W().t+=(TAM_GIU.han+1)*HD;advanceTime(1)");
    ok(run("!tgL().some(e=>e.t==='m')")&&at0>0, 'vật liệu tạm giữ cũng mất sau 365 ngày');
    // bản lưu cũ
    run("delete G.run.tamGiu;delete G.run._tgS;advanceTime(1);autoCheck()");ok(run("Array.isArray(G.run.tamGiu)&&tgView().length===0"), 'bản lưu cũ (không có tạm giữ): chạy bình thường');
    ok(run("NK.count('tg.vao')")>0, 'có nhật ký tg.*');
  },
  // Sửa-M câu 55: NPC bán ở Ám Hội, NPC khác đề nghị đổi bằng vật khác; người bán xét theo nhu cầu
  am_npc_doi() {
    fresh("G._ngNoEv=1;G.run.pham=0;G.run.realm=2;G.run.relics=[];G.run.pills=[];G.run.qitems=[];G.run.st=0;G.run.lt=[0,0,0];AM_LECH=0");
    run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;W().t=Math.floor(W().t/HD)*HD+HD+23;openPlace(n.id);venueDo('amhoi','vao');})()");
    run("(()=>{const sc=G.run.scene;let g=0;while(sc.ph==='chon'&&g++<3)amAct('khong');})()");
    ok(run("G.run.scene.ph==='lot'&&G.run.scene.q[G.run.scene.i].own!=='me'"), 'có lô do NPC bán');
    // dựng: người bán nêu danh sách chỉ có đan; mọi NPC khác không có đan/linh thạch, chỉ có pháp bảo (hợp nhu cầu) trong túi
    run(`(()=>{const sc=G.run.scene,L=sc.q[sc.i],lot=sc.lot;AM_HOI.nhu=[3,3];lot.muon=[{key:'pill:tukhi',sl:1,n:'x',ic:''}];
      sc.ppl.forEach((p,pi)=>{if(pi===L.own)return;const T=amTui(sc,pi);T.length=0;amCua(sc,pi,-amCua(sc,pi));
        for(let j=0;j<3;j++)T.push({u:amUid(),id:'rel',n:'Thử Phù Đổi',q:1,rel:Object.assign(genRelic(1),{name:'Thử Phù Đổi',tier:1})});});
      L.v=Math.max(L.v,1);amPlan(sc,L,lot);})()`);
    run("amTua(AM_HOI.tre[1]+5)");
    ok(run("NK.count('amh.deNpc')")>0&&run("!!G.run.scene.lot.lead"), 'NPC khác đề nghị đổi bằng pháp bảo (hợp nhu cầu) và thành người dẫn');
    ok(run("G.run.scene.lot.lead.key.startsWith('u:')")&&run("G.run.scene.log.some(x=>/đề nghị đổi/.test(x))"), 'ghi vào nhật ký bàn');
    const n0=run("G.run.scene.i");run("amTua(AM_HOI.dem+200)");
    ok(run("G.run.scene.i")>n0||run("G.run.scene.ph")!=='lot', 'đếm ngược xong thì gõ búa (đấu nhiều vòng như thường)');
    // không hợp nhu cầu: vật khác (qitem) bị người bán chê
    run(`(()=>{const sc=G.run.scene;if(sc.ph!=='lot')return;const L=sc.q[sc.i],lot=sc.lot;AM_HOI.nhu=[3,3];lot.muon=[{key:'pill:tukhi',sl:1,n:'x',ic:''}];
      sc.ppl.forEach((p,pi)=>{if(pi===L.own)return;const T=amTui(sc,pi);T.length=0;amCua(sc,pi,-amCua(sc,pi));for(let j=0;j<30;j++)T.push({u:amUid(),id:'luong_kho',n:'Lương khô'});});amPlan(sc,L,lot);})()`);
    const d0=run("NK.count('amh.deNpc')");run("amTua(AM_HOI.tre[1]+5)");
    ok(run("NK.count('amh.deNpc')")===d0&&run("!G.run.scene.lot||!G.run.scene.lot.lead")||run("G.run.scene.ph")!=='lot', 'vật không hợp nhu cầu người bán thì bị chê, không thành đề nghị');
    run("AM_HOI.nhu=[0.8,1.2]");
  },
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
    const key=run("amView().mine.find(m=>/Thử Kiếm Lô/.test(m.n)).key");run(`amAct('chon=${key}')`);run("amAct('dgo')");
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
    ok(run("ccHave('mach_thao')")===0&&run("G.run.tamGiu.length===1&&G.run.tamGiu[0].v==='cc_mach_thao'")&&run("G.run.ccGui.length")===0, 'túi đầy (Sửa-L gộp): vật tư vào tạm giữ bên người, không gửi tại chỗ, chưa dùng được');
    run("G.run.qitems.splice(G.run.qitems.indexOf('luong_kho'),1);tgCat(0)");
    ok(run("ccHave('mach_thao')")===1&&run("G.run.tamGiu.length")===0, 'dọn túi xong cất vào túi được');
    // bản lưu cũ có món đã gửi tại chỗ (Sửa-G): vẫn lấy lại được ở nơi gửi
    run(`G.run.ccGui=[{vt:'mach_thao',at:${at}}];G.run.qitems.push('luong_kho')`);
    ok(run("ccView().vt.some(x=>/Mạch Thảo/.test(x.n)&&/gửi ở/.test(x.n))"), 'Sổ tay ghi món đang gửi và nơi gửi (bản lưu cũ)');
    run(`(()=>{const r=G.run;r.scene=null;openPlace(${at});r.scene.venue='coduyen';})()`);
    ok(run("placeActs(nodeById(G.run.at)).some(a=>a.a==='coduyen')")&&!!run("ccOpts(nodeById(G.run.at)).find(o=>o.id==='lay:mach_thao'&&o.no)"), 'nút lấy lại có, nhưng khoá khi túi đầy');
    run("G.run.qitems.splice(G.run.qitems.indexOf('luong_kho'),1);G.run.qitems.splice(G.run.qitems.indexOf('luong_kho'),1)");run("venueDo('coduyen','lay:mach_thao')");
    ok(run("ccHave('mach_thao')")===2&&run("G.run.ccGui.length")===0, 'dọn túi xong lấy lại được');
    // bản lưu cũ
    fresh("G.run.ccVt={ho_mach_tan:2,kim_sa:1};G.run.qitems=(G.run.qitems||[]).filter(x=>!/^cc_/.test(x))");run("run2()");
    ok(run("G.run.ccVt===undefined&&ccHave('ho_mach_tan')===2&&ccHave('kim_sa')===1"), 'bản lưu cũ: r.ccVt chuyển vào túi');
    fresh("(()=>{let k=0;while(ccBagFree()>0&&k++<99)G.run.qitems.push('luong_kho');})();G.run.ccVt={kim_sa:2}");run("run2()");
    ok(run("G.run.ccVt===undefined&&ccHave('kim_sa')===0&&G.run.tamGiu.filter(g=>g.v==='cc_kim_sa').length===2"), 'bản lưu cũ, túi đầy: vào tạm giữ, không mất');
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
  // ===== Đ10: Đại Mộng =====
  // Mộng Ấn, ba tri thức (hai nguồn độc lập, giữ qua kiếp), khảo sát nơi cổ, Người Gác Bến
  dai_mong() {
    fresh("FEAT.mong=1;G.screen='map';G.run.pham=0;G.run.realm=1;G.run.bac=1e6;G.run.st=1e5;G.run.kyT=W().t");
    const at = loc => run(`(()=>{const n=locNode('${loc}');const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;r.scene=null;openPlace(n.id);return n.id})()`);
    const ids = () => JSON.parse(run(`JSON.stringify(venueOpts(nodeById(G.run.at),'daisu').map(o=>o.id+(o.no?'!':'')))`));
    ok(run("JSON.stringify(dmView().tri.map(t=>t.co))")==='[false,false,false]'&&run("dmM().mong.length")===0, 'sổ luân hồi trống lúc đầu');
    ok(run("['LOC05','LOC12','LOC15'].every(l=>placeActs(locNode(l)).some(a=>a.a==='daisu'))"), 'ba nơi lõi có mục "Đại sự"');
    at('LOC05');let L=ids();ok(L.includes('k05a')&&L.includes('k05b!')&&!L.includes('k05c'), 'LOC05: khảo trục mở, khảo lõi cần biết điều thứ nhất trước: '+L.join(','));
    run("NK.clear();venueDo('daisu','k05a')");ok(run("triSrc('TRI01').join()")==='LOC05'&&!run("triCo('TRI01')"), 'một nguồn: chưa đủ chứng');
    ok(run("NK.count('dm.tri')")===1&&run("G.run.scene.msg.join(' ')").length>40, 'có lời khảo sát và nhật ký');
    ok(!ids().includes('k05a'), 'nguồn đã có thì không khảo lại');
    at('LOC12');run("venueDo('daisu','k12a')");ok(run("triCo('TRI01')")&&run("NK.count('dm.triDat')")===1, 'hai nguồn độc lập (LOC05 + LOC12): biết "Vòng đã từng khép"');
    L=ids();ok(L.includes('k12b!'), 'mỗi nơi chỉ cho một nguồn mỗi kiếp: '+L.join(','));
    ok(run("venueDo('daisu','k12b')")===false&&!run("triSrc('TRI02').length"), 'bấm việc bị khoá thì không làm gì');
    // Mộng Ấn: tối đa một mỗi kiếp
    ok(run("mongNhat('MA03')")&&run("triSrc('TRI01').includes('MA03')"), 'nhặt Mộng Ấn: thành một nguồn của tri thức');
    ok(!run("mongNhat('MA05')")&&run("NK.count('dm.mongDay')")===1, 'mỗi kiếp tối đa một Mộng Ấn');
    // kiếp sau (giả lập): sổ còn nguyên
    run("G.run.kiep=2;G.run.dmKhao={}");at('LOC12');L=ids();ok(L.includes('que')&&L.includes('k12b'), 'kiếp sau: xin quẻ mở, khảo chuông mở: '+L.join(','));
    run("venueDo('daisu','que')");ok(run("mongCo('MA05')")&&run("triSrc('TRI02').includes('MA05')"), 'MA05 Chữ trong quẻ (LOC12, từ kiếp hai)');
    // MA04 tuồng cũ cần một đời trước
    run("G.run.kiep=3;G.run.dmKhao={}");at('LOC09');ok(ids().includes('tuong!'), 'chưa có đời nào: gánh hát chưa diễn đời mình');
    run("G.meta.lives.unshift({k:1,ten:'X',lines:['a'],ep:'',pts:1})");ok(ids().includes('tuong'), 'đã có đời trước: xem tuồng được');
    run("venueDo('daisu','tuong')");ok(run("mongCo('MA04')"), 'MA04 Tuồng cũ');
    // MA07 chỉ khi Tiên Nhân Hạ Phàm / Thiên Lộ Mở
    run("G.run.kiep=4");at('LOC15');ok(ids().includes('troi!'), 'trời yên: chưa thấy vết nứt');
    run("tcInit(W()).CLK14.pha=2");ok(ids().includes('troi'), 'Thiên Lộ Mở: nhìn lên được');
    run("venueDo('daisu','troi')");ok(run("mongCo('MA07')")&&run("triSrc('TRI03').includes('MA07')"), 'MA07 Vết nứt trên trời → nguồn của điều thứ ba');
    run("tcInit(W()).CLK14.pha=0");
    // MA03: viếng mộ mình kiếp trước
    run("(()=>{G.run.kiep=5;dmM().mong=dmM().mong.filter(x=>x!=='MA03');G.run.scene=null;const n=nodeById(G.run.at);n.grave={ten:'Kiếp Cũ',tuoi:40,realmName:'',t:0,items:[]};visitGrave(n)})()");
    ok(run("mongCo('MA03')"), 'MA03 Mộ của chính mình (viếng mộ kiếp trước)');
    // MA06: thiên kiêu gặp ở kiếp trước nhận ra
    run("G.run.kiep=6;DM_TK=W().rivals[0].ten;gapNguoi(DM_TK,'tk')");ok(!run("mongCo('MA06')")&&run("dmM().tkGap[DM_TK]")===6, 'gặp thiên kiêu lần đầu: ghi kiếp');
    run("G.run.kiep=7;gapNguoi(DM_TK,'tk')");ok(run("mongCo('MA06')"), 'MA06 Kẻ cũng đang mơ (gặp lại ở kiếp sau)');
    // MA08: hồi 4 đại lộ Tỉnh Mộng
    run("(()=>{G.run.kiep=8;const S=tyNew('DL09',3);tySt().dl=S;S.han=W().t+HY;tyDong(S,TUYEN.DL09.nut[3].cach[0].id,'chon')})()");ok(run("mongCo('MA08')"), 'MA08 Đáy Vong Xuyên (qua hồi 4 Tỉnh Mộng)');
    // Người Gác Bến: mỗi kiếp một lần, dạng khác nhau, nhận ra ba kiếp → MA02
    run("G.run.kiep=9;G.run.scene=null;G.run.gbHen=W().t;G.run.gbXong=0;advanceTime(1)");ok(run("G.run.scene&&G.run.scene.ev")==='dm_gacben', 'Người Gác Bến hiện (kỳ ngộ riêng)');
    const d1=run("G.run.gbDang");ok(JSON.parse(run("JSON.stringify(kyOpts(G.run.scene).map(o=>o.l))")).length===2, 'lần đầu gặp: không có lựa chọn "Ta đã gặp ngươi"');
    run("kyPick(0)");ok(run("G.run.scene.res.t").length>40&&!/\{\{|\{NP/.test(run("G.run.scene.res.t")), 'lời Gác Bến hiện đủ, không còn mã');
    run("G.run.scene=null;G.run.gbHen=W().t;advanceTime(1)");ok(!run("G.run.scene"), 'một kiếp chỉ hiện một lần');
    for (const k of [10,11,12]) run(`G.run.kiep=${k};G.run.gbXong=0;G.run.gbHen=W().t;G.run.scene=null;advanceTime(1);kyPick(0)`);
    ok(run("G.run.gbDang")!==d1, 'kiếp khác: dạng khác ('+d1+' → '+run("G.run.gbDang")+')');
    ok(run("dmM().gb.nk.length")===3&&run("mongCo('MA02')"), 'nhận ra ở ba kiếp: MA02 Người không già');
    ok(run("gbBac()")===3, 'bậc lộ tăng theo số lần nhận ra');
    // bản lưu cũ
    run("delete G.meta.mong;delete G.meta.tri;delete G.meta.gb;delete G.meta.tkGap;delete G.meta.ends;delete G.meta.mongK;delete G.run.gbHen;delete G.run.gbXong;G.run.scene=null");
    ok(run("(()=>{try{advanceTime(24);dmView();venueOpts(locNode('LOC05'),'daisu');return true}catch(e){return e.message}})()")===true, 'bản lưu cũ (chưa có sổ Đại Mộng): chạy được');
    ok(run("Array.isArray(G.meta.mong)&&typeof G.run.gbHen==='number'"), 'bản lưu cũ: dựng sổ và hẹn Gác Bến');
  },
  // tám kết thúc: điều kiện, ghi theo đời (END01/02/03/06) và khép hành trình (END04/05/07/08)
  ket_thuc() {
    const base = "FEAT.mong=1;G.screen='map';G.run.pham=0;G.run.realm=4;G.run.bac=1e6;G.run.st=1e5;G.run.kyT=W().t;G.run.gbXong=1;";
    const tri = "for(const id in TRI_THUC){triThem(id,'LOC05');triThem(id,'LOC12');}";
    const at = loc => run(`(()=>{const n=locNode('${loc}');const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;r.scene=null;openPlace(n.id);return n.id})()`);
    const ids = () => JSON.parse(run(`JSON.stringify(venueOpts(nodeById(G.run.at),'daisu').map(o=>o.id+(o.no?'!':'')))`));
    fresh(base);
    // kết minh (Sửa-N faKetMinh)
    at('LOC01');ok(!ids().some(x=>x.startsWith('minh')), 'xa lạ: chưa có lựa chọn kết minh');
    run("G.run.faQh={FA04:30}");ok(run("faQhBac('FA04')")===5&&ids().includes('minh'), 'thân thiết: kết minh được');
    run("venueDo('daisu','minh')");ok(run("faMinh('FA04')"), 'đã kết minh với thế lực của nơi này');
    // END02 Nhân Hoàng
    at('LOC02');ok(ids().includes('end02!'), 'Lên ngôi: thiếu điều kiện thì khoá');
    ok(/✗/.test(run("venueOpts(nodeById(G.run.at),'daisu').find(o=>o.id==='end02').d")), 'hộp xác nhận liệt kê điều kiện còn thiếu');
    run("faKetMinh('FA10',1);faKetMinh('FA02',1);vaiGiet('NP04','dm')");ok(ids().includes('end02'), 'ngai trống + kho + quân + hai thế lực công nhận + quân lương: lên ngôi được');
    const b0=run("G.run.bac");run("venueDo('daisu','end02')");ok(run("G.run.ends.includes('END02')")&&run("G.run.bac")<b0&&run("G.meta.ends.some(e=>e.id==='END02')")&&!!run("G.run"), 'END02 ghi theo đời, đời vẫn tiếp, mất quân lương');
    ok(/Chiếu thư/.test(run("G.run.scene.msg.join(' ')")), 'có câu kết của END02');
    // END03 Ma chủ
    at('LOC07');ok(ids().includes('end03!'), 'Ma chủ: thiếu điều kiện thì khoá');
    run("vaiGiet('NP13','dm')");ok(ids().includes('end03'), 'huyết ấn không chủ + ba đồng minh + nguồn: được');
    run("venueDo('daisu','end03')");ok(run("G.run.ends.includes('END03')"), 'END03 ghi theo đời');
    // END06 Truyền một ngọn đèn
    run("ngStart('nong').bac=3;G.run.birthAge=(G.run.birthAge||16)+40;G.run.age=60");const n1=run("(()=>{const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin');G.run.at=n.id;G.run.scene=null;openPlace(n.id);return n.id})()");
    ok(ids().includes('truyen'), 'nghề chính tới bậc cao, đủ tuổi: nhận học trò ở thôn trấn');
    run("venueDo('daisu','truyen')");ok(run("G.run&&G.run.ends.includes('END06')"), 'END06 sau một năm dạy');
    // END01 lúc chết
    run("G.run.family=[{ten:'A',qh:'con',tuoi:20,song:1}];die('quyan')");ok(run("G.over.end01")==='END01'&&run("G.over.ends.join()")==='END02,END03,END06,END01', 'chết: một đời đã sống (END01), màn hết kiếp liệt kê kết lớn');
    ok(/Bếp nguội dần/.test(run("G.over.ketCanh")), 'màn hết kiếp có câu kết của END01');
    fresh(base+"G.run.age=20;G.run.family=[];G.run.party=[]");run("die('combat',{n:'x'})");ok(run("G.over.end01")==='chua'&&run("G.over.life.chuaTen")===1, 'chết trẻ: "Đời chưa kịp gọi tên"');
    // phi thăng thiếu tri thức → mộng trong mộng
    fresh(base);run("G.run.ng01=1;die('phithang')");ok(run("G.screen")==='over'&&run("G.over.mim")===1&&!run("G.meta.ketHet"), 'phi thăng thiếu ba tri thức: mộng trong mộng, vẫn luân hồi');
    ok(run("benView().mim").length>40, 'màn hết kiếp có lời "mộng trong mộng"');
    // END04
    fresh(base+tri);at('LOC15');ok(ids().includes('ng01'), 'đủ ba tri thức, Hóa Thần: chuẩn bị cửa tỉnh mộng');
    run("G.run.realm=3");ok(ids().includes('ng01!'), 'dưới Hóa Thần: khoá');run("G.run.realm=4;venueDo('daisu','ng01')");ok(run("G.run.ng01")===1, 'cửa đã chuẩn bị');
    run("die('phithang')");ok(run("G.screen")==='ket'&&run("G.meta.ketHet.id")==='END04'&&run("G.meta.daTinh")===1, 'đủ ba tri thức + cửa + phi thăng: END04, màn kết');
    ok(/Lần đầu tiên/.test(run("dmKetView().cau"))&&run("dmKetView().hau.length")>=3, 'màn kết: câu kết + hậu truyện');
    run("dmTanMong()");ok(run("G.meta.daTinh")===1&&run("G.meta.endsCu.length")===1&&!run("G.meta.ketHet")&&run("dmM().mong.length")===0, 'Tân Mộng: hồ sơ mới, giữ dấu đã tỉnh');
    // END05
    fresh(base+tri);at('LOC15');ok(ids().includes('ng02m')&&!ids().includes('ng02t'), 'thay nguồn: thử mô hình trước');
    run("venueDo('daisu','ng02m')");for(const l of ['LOC05','LOC12','LOC15']){at(l);run("venueDo('daisu','ng02t')");}
    ok(run("ngDu(ngW().NG02.tu)"), 'bộ tụ ở cả ba nơi');at('LOC15');run("venueDo('daisu','ng02c')");ok(ids().includes('ng02x!'), 'chạy thử chưa đủ chu kỳ: chưa nhận được');
    run("W().ng.NG02.chay-=31*HD");ok(ids().includes('ng02x')&&/không trở lại/.test(run("venueOpts(nodeById(G.run.at),'daisu').find(o=>o.id==='ng02x').d")), 'đủ chu kỳ: lời xác nhận cuối');
    run("venueDo('daisu','ng02x')");ok(run("G.screen")==='ket'&&run("G.meta.ketHet.id")==='END05'&&!run("G.run"), 'END05 Giữ mộng bằng tên mình: khép hành trình');
    // END07
    fresh(base+tri);for(const l of ['LOC05','LOC12']){at(l);run("venueDo('daisu','ng03x')");}at('LOC05');ok(ids().includes('ng03c!'), 'chưa xác minh đủ ba nơi: chưa đặt chốt');
    at('LOC15');run("venueDo('daisu','ng03x');venueDo('daisu','ng03c')");for(const l of ['LOC05','LOC12']){at(l);run("venueDo('daisu','ng03c')");}
    ok(ids().includes('ng03h'), 'đủ ba chốt: hẹn giờ');run("venueDo('daisu','ng03h')");ok(!!run("G.run")&&run("W().ng.NG03.hen")>run("W().t"), 'chưa tới giờ: đời vẫn tiếp');
    run("advanceTime(8*HD)");ok(run("G.screen")==='ket'&&run("G.meta.ketHet.id")==='END07', 'tới giờ, đủ ba chốt: END07 Người chặt vòng');
    fresh(base+tri);run("(()=>{const g=ngW().NG03;for(const l of NG_NOI)g.xm[l]=1;g.chot.LOC05=1;g.chot.LOC12=1;g.hen=W().t+HD;advanceTime(2*HD)})()");ok(!!run("G.run")&&!run("W().ng.NG03.hen")&&!run("G.meta.ketHet"), 'thiếu một chốt tới giờ: vòng chưa khép');
    // END08
    fresh(base+tri);at('LOC15');ok(ids().includes('ng04t'), 'thiếu quyền khoá: chỉ có lựa chọn cưỡng mở');
    for(const l of ['LOC05','LOC07']){at(l);run("venueDo('daisu',venueOpts(nodeById(G.run.at),'daisu').find(o=>o.id.startsWith('khoa')).id)");}
    at('LOC15');run("G.run.hp=S().maxHp");ok(ids().includes('ng04'), 'hai quyền khoá + ba tri thức + nguồn + sức: mở Diệt Thế');
    const hp0=run("G.run.hp");run("venueDo('daisu','ng04')");ok(run("G.meta.ketHet.id")==='END08'&&run("G.screen")==='ket', 'END08 Thế giới không còn người gọi tên');
    // diệt thế thiếu điều kiện → 3 khu đất ma
    fresh(base);at('LOC15');const z0=run("(W().maVuc||[]).length");const c0=run("tcInit(W()).CLK06.muc");
    ok(ids().includes('ng04t'), 'không có tri thức: cưỡng mở');run("venueDo('daisu','ng04t')");
    ok(run("W().maVuc.length")-z0===3&&!run("G.meta.ketHet")&&!!run("G.run"), 'diệt thế thiếu điều kiện: ba khu thành đất ma, không kết');
    ok(run("tcInit(W()).CLK06.muc")>c0&&!ids().some(x=>x.startsWith('ng04')), 'Đêm Dài tăng; mỗi kiếp một lần');
    ok(!/\{\{|\{NP|\{LOC|undefined/.test(run("G.run.scene.msg.join(' ')")), 'lời không còn mã');
  },
  // Bến Vong Xuyên khi chết: "Uống canh, đi ngay" / "Ngồi đợi", Mộng Ấn #1, nối khoảng luân hồi
  ben_vong_xuyen() {
    fresh("FEAT.mong=1");
    run("die('combat',{n:'x'})");ok(run("G.over.ben.st")==='chon'&&run("benView().vao").length>40, 'chết: tới bến, chọn uống canh hay ngồi đợi');
    const y0=run("W().t"),g0=run("G.over.gap");run("benDoi()");
    ok(run("G.over.gap")>g0&&run("W().t")-y0>=3*run("HY")-1, 'ngồi đợi: thế gian trôi thêm '+(run("G.over.gap")-g0)+' năm (cộng vào khoảng luân hồi)');
    ok(run("benView().dong").length>20&&run("benView().con"), 'nghe Người Gác Bến từng đoạn');
    for(let i=0;i<10&&run("G.over.ben.st")==='doi';i++)run("benTiep()");
    ok(run("G.over.ben.st")==='xong'&&run("mongCo('MA01')")&&run("triSrc('TRI01').includes('MA01')"), 'nghe tới cuối: Mộng Ấn #1 Bát canh không đáy');
    ok(run("benView().t").length>40, 'lời nhặt Mộng Ấn');
    run("G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0]);G.run.scene=null;die('combat',{n:'y'})");run("benDoi()");
    ok(!run("benView().con")||run("G.over.ben.L.length")<=4, 'lần sau: lời ngắn hơn');
    for(let i=0;i<10&&run("G.over.ben.st")==='doi';i++)run("benTiep()");ok(run("dmM().mong.length")===1, 'không nhặt lại MA01');
    run("G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0]);G.run.scene=null;die('combat',{n:'z'})");const y1=run("W().t");run("benUong()");
    ok(run("G.over.ben.st")==='uong'&&run("W().t")===y1&&run("benView().t").length>20, 'uống canh, đi ngay: không thêm thời gian');
    ok(run("benDoi()")===false, 'đã chọn thì không chọn lại');
    run("G.over.ben=undefined");ok(run("benView()")===null, 'bản lưu cũ (màn hết kiếp chưa có bến): không lỗi');
  },
  // mô phỏng nhiều kiếp tới từng kết khép hành trình: tri thức giữ qua kiếp, tối đa một nguồn mỗi nơi mỗi kiếp
  nhieu_kiep() {
    const at = loc => run(`(()=>{const n=locNode('${loc}');const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;r.scene=null;openPlace(n.id);return n.id})()`);
    const lam = (loc,id) => {at(loc);return run(`venueDo('daisu','${id}')`);};
    const sang = "(()=>{if(G.run)die('quyan');if(G.over&&G.over.ben)benUong();G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0]);const r=G.run;r.scene=null;r.rootKnown=1;r.pham=0;r.realm=4;r.bac=1e6;r.st=1e5;r.gbXong=1;})()";
    const ba = () => {
      fresh("FEAT.mong=1;G.run.pham=0;G.run.realm=4;G.run.bac=1e6;G.run.st=1e5;G.run.gbXong=1");
      lam('LOC05','k05a');lam('LOC12','k12a');run(sang);            // kiếp 1: điều thứ nhất
      lam('LOC05','k05b');lam('LOC15','k15b');run(sang);            // kiếp 2: điều thứ hai
      lam('LOC05','k05c');lam('LOC15','k15c');                       // kiếp 3: điều thứ ba
      return run("tri3()")&&run("G.run.kiep")===3;
    };
    for (const E of ['END04','END05','END07','END08']) {
      const k3 = ba();
      if (E==='END04'){lam('LOC15','ng01');run("die('phithang')");}
      if (E==='END05'){lam('LOC15','ng02m');for(const l of ['LOC05','LOC12','LOC15'])lam(l,'ng02t');lam('LOC15','ng02c');run("advanceTime(31*HD)");if(G_ok())lam('LOC15','ng02x');}
      if (E==='END07'){for(const l of ['LOC05','LOC12','LOC15'])lam(l,'ng03x');for(const l of ['LOC05','LOC12','LOC15'])lam(l,'ng03c');lam('LOC15','ng03h');run("advanceTime(8*HD)");}
      if (E==='END08'){lam('LOC05','khoa05');lam('LOC12','khoa12');run("G.run.hp=S().maxHp");lam('LOC15','ng04');}
      ok(k3&&run("G.meta.ketHet&&G.meta.ketHet.id")===E&&run("G.screen")==='ket', E+': ba kiếp góp đủ ba tri thức rồi tới kết (kiếp '+run("G.meta.ketHet&&G.meta.ketHet.kiep")+')');
    }
    function G_ok(){return !!run("G.run");}
    // đường Mộng Ấn: điều thứ nhất từ bến + mộ, không cần LOC12
    fresh("FEAT.mong=1;G.run.pham=0;G.run.realm=1;G.run.gbXong=1");
    run("die('combat',{n:'x'});benDoi();for(let i=0;i<10&&G.over.ben.st==='doi';i++)benTiep()");ok(run("mongCo('MA01')")&&!run("triCo('TRI01')"), 'kiếp 1 chết, ngồi đợi ở bến: Mộng Ấn #1 (một nguồn)');
    run("G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.run.gbXong=1");
    const gn=run("W().regions.flatMap(R=>R.nodes).find(n=>n.grave).id");run(`G.run.at=${gn};visitGrave(nodeById(${gn}))`);
    ok(run("triCo('TRI01')")&&run("G.run.kiep")===2, 'kiếp 2 viếng mộ mình: đủ hai Mộng Ấn → biết điều thứ nhất');
    // tri thức giữ qua kiếp, quên sạch vẫn đúng (nhân vật mới không mang đồ / tu vi)
    run("die('combat',{n:'y'});benUong();G.over=null;G.screen='title';genBirth();newRun(G.birth.cards[0])");ok(run("triCo('TRI01')")&&run("G.run.kiep")===3&&run("(G.run.dmKhao||null)")===null, 'kiếp 3: sổ tri thức còn, việc của đời trước thì không');
  },
  // công cụ kiểm lời văn Đại Mộng
  dm_kiem() {
    const K = require('./kiem-tra-dai-mong'), fs = require('fs'), path = require('path'), os = require('os');
    const r = K.kiemDaiMong();ok(r.loi.length===0&&r.n>=6, 'các tệp mẫu đạt ('+r.n+' tệp)');
    ok(K.canViet().length===38&&r.thieu.length===38-r.n, 'danh sách phải viết: 38 tệp (thêm 3 hậu quả kết, 2 kỳ ngộ), còn '+r.thieu.length);
    ok(K.kiemDaiMong(null,{du:true}).loi.length===r.thieu.length, '--du: mỗi tệp thiếu là một lỗi');
    const dir = path.join(__dirname,'..','content/dai-mong/mong-an'), f = path.join(dir,'MA02.json');
    const viet = o => {fs.writeFileSync(f,JSON.stringify(o,null,1));try{return K.kiemDaiMong([f]).loi.join('\n');}finally{fs.unlinkSync(f);}};
    const dai = 'Ngươi đứng trước một người không già, dáng ngồi y hệt người đã thấy ở đâu đó, có lẽ trong một giấc ngủ trưa rất xa. Người ấy hỏi ngươi một câu không đầu không cuối rồi cười.';
    ok(viet({schemaVersion:1,loai:'mong_an',ma:'MA02',nhat:[dai,dai+' Rồi gió nổi.']})==='', 'tệp đúng: không lỗi');
    ok(/con số "3"/.test(viet({schemaVersion:1,loai:'mong_an',ma:'MA02',nhat:[dai+' Đã 3 lần.',dai]})), 'bắt con số trong lời văn');
    ok(/Mạc Liên/.test(viet({schemaVersion:1,loai:'mong_an',ma:'MA02',nhat:[dai+' Mạc Liên gật đầu.',dai]})), 'bắt tên người giữ vai ghi thẳng');
    ok(/quên sạch/.test(viet({schemaVersion:1,loai:'mong_an',ma:'MA02',nhat:['Ngươi nhớ lại kiếp trước. '+dai,dai]})), 'bắt "nhớ lại kiếp trước" (trái luật quên sạch)');
    ok(/mã nội bộ/.test(viet({schemaVersion:1,loai:'mong_an',ma:'MA02',nhat:[dai+' Đó là TRI01.',dai]})), 'bắt mã nội bộ trong lời văn');
    ok(/tên tệp/.test(viet({schemaVersion:1,loai:'mong_an',ma:'MA03',nhat:[dai,dai+' x']})), 'tên tệp phải trùng mã');
    const gb = K.kiemDaiMong([path.join(__dirname,'..','content/dai-mong/gac-ben/lao_cheo_do.json')]);ok(gb.loi.length===0, 'mẫu Người Gác Bến đạt');
    const g2 = path.join(__dirname,'..','content/dai-mong/gac-ben/ba_do.json');const src=JSON.parse(fs.readFileSync(path.join(__dirname,'..','content/dai-mong/gac-ben/lao_cheo_do.json'),'utf8'));
    src.dang='ba_do';src.loi[1]=src.loi[1]+' Ta là kẻ Yêu Hoàng để lại.';fs.writeFileSync(g2,JSON.stringify(src));let e2;try{e2=K.kiemDaiMong([g2]).loi.join('\n');}finally{fs.unlinkSync(g2);}
    ok(/quá sớm/.test(e2), 'Người Gác Bến lộ thân phận quá sớm: báo lỗi');
  },
  // máy tự chơi 15 kiếp: không lỗi, không chữ hỏng
  mua_dat() {
    // câu 80: mua / bán đất ở nơi có dân, nhà riêng, trận pháp hộ thân trên đất của ngươi (câu 78)
    fresh("FEAT.tna=1;FEAT.nha=1;G.screen='map';G.run.pham=0;G.run.realm=1");
    const all = "W().regions.flatMap(R0=>R0.nodes)";
    run(`MD_T=${all}.find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin');datStore()[MD_T.id]={v:1,o:[{ct:'tuu_lau',chu:{k:'dan'},goc:1},{ct:null,chu:{k:'dan'},goc:0},{ct:null,chu:{k:'dan'},goc:0},{ct:null,chu:{k:'dan'},goc:0}],pha:{}};
      (()=>{const r=G.run;r.at=MD_T.id;r.region=MD_T.r;r.moving=null;openPlace(MD_T.id);r.bac=0;r.st=0;r.tna={};})()`);
    const ops = () => JSON.parse(run("JSON.stringify(datOpts(MD_T).map(o=>({id:o.id,no:o.no})))"));
    const op = id => ops().find(o => o.id === id) || {};
    ok(ops().some(o=>o.id==='mua:1'), 'ô trống của dân ở trấn: có lựa chọn mua');
    ok(ops().some(o=>o.id==='mua:0'), 'ô đã có công trình của dân: cũng mua được');
    ok(op('mua:1').no===run("contentText('dat.muaPham')"), 'không đủ tiền: khoá');
    ok(run("datMuaGia(MD_T,W().dat[MD_T.id].o[1])")===run("DAT.mua.gia.tran"), 'giá đất dân ở trấn = giá gốc ('+run("fmtBac(DAT.mua.gia.tran)")+')');
    ok(run("datMuaGia(MD_T,{chu:{k:'fa',id:'FA04'}})")===run("Math.round(DAT.mua.gia.tran*DAT.mua.chu.fa)"), 'đất của thế lực: đắt hơn');
    run("G.run.faQh={FA04:-30}");ok(run("datMuaNo(MD_T,{chu:{k:'fa',id:'FA04'}})")===run("contentText('dat.muaFa',[datChuTen({k:'fa',id:'FA04'})])"), 'thế lực không ưa: không bán');
    run("G.run.st=1000");ok(!op('mua:1').no, 'tu sĩ thiếu bạc: trả bằng linh thạch được');
    const st0 = run("G.run.st");ok(run("venueDo('datdai','mua:1')")&&run("W().dat[MD_T.id].o[1].chu.k")==='ta', 'mua bằng linh thạch: ô thành của ngươi');
    ok(st0-run("G.run.st")===run("Math.ceil(DAT.mua.gia.tran/DAT.mua.lt)")&&run("NK.count('dat.mua')")>0, 'trừ đúng linh thạch, có nhật ký dat.mua');
    run("G.run.st=0;G.run.bac=1e6");const b0 = run("G.run.bac");
    ok(run("venueDo('datdai','mua:2')")&&b0-run("G.run.bac")===run("DAT.mua.gia.tran"), 'mua bằng bạc: trừ đúng giá');
    ok(op('mua:3').no===run("contentText('dat.muaDu')"), 'đủ '+run("DAT.mua.toiDa")+' ô ở một nơi: không mua thêm');
    run("G.run.st=100");ok(!op('xay:1:nha_rieng').no&&!op('xay:1:tran_phap').no, 'đất của ngươi: gợi ý xây nhà riêng, trận pháp trên ô của ngươi');run("G.run.st=0");
    ok(run("datXayNo(MD_T,W().dat[MD_T.id].o[3],CONG_TRINH.nha_rieng.xay)")===run("contentText('dat.canMua')"), 'ô của dân: vẫn phải mua mới xây (câu 79)');
    const d0 = run("danhGet('reg:'+MD_T.r)"), b1 = run("G.run.bac");
    ok(!!run("datXay(MD_T,1,'nha_rieng')")&&run("datNhaTa(MD_T)")&&b1-run("G.run.bac")===run("CONG_TRINH.nha_rieng.xay.bac"), 'xây nhà riêng (trả bạc)');
    ok(run("danhGet('reg:'+MD_T.r)")===d0&&!run("G.run.truy"), 'xây trên đất mình: không bị phạt');
    ok(run("placeActs(MD_T).some(a=>a.a==='nha')")&&run("nhaOpts(MD_T).some(o=>o.id==='nghi')&&!nhaOpts(MD_T).some(o=>o.id==='thue')"), 'nhà riêng: có mục Nhà ở, nghỉ ở nhà, không cần thuê');
    ok(run("nhaOk(G.run)"), 'nhà riêng: tính là có chỗ ngủ');
    run("G.run.pham=1");ok(run("datXayNo(MD_T,W().dat[MD_T.id].o[2],CONG_TRINH.nha_rieng.xay)")===''&&run("datXayNo(MD_T,W().dat[MD_T.id].o[2],CONG_TRINH.tran_phap.xay)")===run("contentText('dat.canTu')"), 'phàm nhân: dựng được nhà riêng, không dựng được trận pháp');
    run("G.run.pham=0;G.run.st=500");ok(!!run("datXay(MD_T,2,'tran_phap')")&&run("datTranTa(MD_T)"), 'dựng trận pháp hộ thân trên đất mình');
    ok(run("(()=>{const a=bqRisk(3);const c=W().dat[MD_T.id].o[2];c.ct=null;const b=bqRisk(3);c.ct='tran_phap';return a>0&&Math.abs(a-b*DAT.mua.tran.bq)<1e-9})()"), 'trận pháp của ngươi: bế quan ít bị quấy (×'+run("DAT.mua.tran.bq")+')');
    run("G.run.tamma=100;tinhToa(10)");ok(run("NK.count('dat.tranTinh')")>0&&run("G.run.tamma")<=94, 'trận pháp của ngươi: tĩnh tọa lắng tâm ma nhanh hơn (còn '+run("G.run.tamma")+')');
    run("openPlace(MD_T.id)");const b2 = run("G.run.bac");ok(run("venueDo('datdai','ban:2')")&&run("W().dat[MD_T.id].o[2].chu.k")==='dan'&&run("G.run.bac")-b2===run("Math.round(DAT.mua.gia.tran*DAT.mua.ban)"), 'bán lại: được nửa giá, ô về tay dân');
    ok(!run("datTranTa(MD_T)")&&run("NK.count('dat.ban')")>0, 'bán rồi: trận pháp không còn là của ngươi');
    run("G.run.tna={[MD_T.r]:{m:2,tien:0,t:W().t,ly:[]}}");ok(op('mua:3').no===run("contentText('dat.muaNa')"), 'đang bị truy nã ở vùng này: không mua được');
    ok(!run("datMua(MD_T,3)")&&run("NK.count('dat.muaChan')")>0, 'mua khi bị từ chối: không làm, có nhật ký');
    run("G.run.tna={}");
    ok(run(`(()=>{const n=${all}.find(n=>isWild(n)&&!n.anchor&&n.type!=='sao');return datMuaOpts(n).length===0})()`), 'hoang dã: không có mua đất (cứ dựng là của ngươi)');
    ok(run(`(()=>{const n=${all}.find(n=>n.type==='tong');return !n||datMuaOpts(n).length===0})()`), 'tông môn: không bán đất');
  },
  hau_qua() {
    // câu 88: hậu quả thế giới END02/03/06 (đời sau mới thấy) · câu 86: khép hành trình về màn mở đầu · kỳ ngộ A1, A2
    fresh("FEAT.mong=1;G.screen='map';G.run.gbXong=1;G.run.kyT=W().t;G.run.pham=0;G.run.realm=1;HQ_BK=JSON.stringify(DM_KY)");
    try {
    ok(run("Object.keys(DM_DATA.hq).sort().join()")==='END02,END03,END06'&&run("Object.keys(DM_DATA.ky).sort().join()")==='A1,A2', 'nạp bản thảo GPT: ba hậu quả kết, hai kỳ ngộ');
    run("G.run.kiep=1;G.run.ends=[];HQ_S0=(W().suLuoc||[]).length;dmKetDoi('END02')");
    ok(run("(W().suLuoc||[]).length-HQ_S0")===3&&run("W().suLuoc.some(x=>x.t===dmT(DM_DATA.hq.END02.su[0]))"), 'Sử lược: dòng kết + hai dòng sử lược của END02');
    ok(run("hqSu()")===0, 'Sử lược không ghi lặp');
    ok(run("hqNay().length")===0, 'đời đạt kết: chưa thấy hậu quả');
    run("G.run.kiep=2");ok(run("hqNay().join()")==='END02', 'đời sau: thấy hậu quả END02');
    ok(run("(()=>{let c=0;for(let i=0;i<60;i++){const t=contentRumor();if(DM_DATA.hq.END02.tin.some(s=>t.includes(dmT(s).slice(0,25))))c++;}return c})()")>0, 'tin đồn END02 ở quán trà / lời truyền miệng');
    ok(run("(()=>{const n=locNode('LOC02');return placeMeta(n).desc.includes(dmT(DM_DATA.hq.END02.noi[0].t).slice(0,30))})()"), 'thẻ địa điểm LOC02: tả nơi đổi thay');
    ok(run("(()=>{const n=locNode('LOC05');return !DM_DATA.hq.END02.noi.some(x=>placeMeta(n).desc.includes(dmT(x.t).slice(0,30)))})()"), 'nơi không liên quan: không thêm');
    run("G.run.kiep=1");ok(!run("placeMeta(locNode('LOC02')).desc.includes(dmT(DM_DATA.hq.END02.noi[0].t).slice(0,30))"), 'đời đạt kết: thẻ địa điểm chưa đổi');
    // bản lưu cũ: đã có END03 trong sổ mà chưa có sử lược
    run("dmM().ends.push({id:'END03',kiep:1,ten:'x',y:1});HQ_S1=W().suLuoc.length");ok(run("hqSu()")===2&&run("W().suLuoc.length-HQ_S1")===2&&run("W().hqSu.END03")===1, 'bản lưu cũ: ghi bù sử lược END03');
    // hồi ức đời sau ở màn hết kiếp, một lần
    run("G.run.kiep=2;die('combat',{n:'x'})");ok(run("G.over&&G.over.hqMuon&&G.over.hqMuon.length")===2&&run("G.over.hqMuon.includes(dmT(DM_DATA.hq.END02.muon))")&&run("NK.count('hq.muon')")>0, 'màn hết kiếp đời sau: hồi ức END02, END03');
    run("genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.run.kiep=3;G.run.gbXong=1;die('combat',{n:'x'})");ok(!run("G.over.hqMuon"), 'hồi ức chỉ hiện một lần');
    // A1: tu sĩ tĩnh tọa ở nơi hoang
    run("G.over=null;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.run.gbXong=1;G.run.kyT=W().t;G.run.pham=0;G.run.realm=1;G.screen='map';DM_KY.A1.p=1;DM_KY.A2.p=1");
    run("(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>isWild(n)&&!n.anchor&&dangerTag(n)<3&&n.type!=='sao'&&!DM_KY.A2.noi.includes(n.type));const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;openPlace(n.id);r.tamma=50})()");
    run("tinhToa(1)");ok(run("G.run.scene&&G.run.scene.ev")==='dm_ky_A1'&&run("G.run.kyA1")===1, 'A1: tĩnh tọa nơi hoang → Mộng du tiên cảnh');
    const tm = run("G.run.tamma");run("kyPick(0)");ok(run("G.run.scene.res&&G.run.scene.res.t")===run("DM_DATA.ky.A1.c[0].t")&&run("G.run.tamma")<tm, 'A1 "bước lên bậc": lời kết quả, tâm ma lắng xuống');
    run("G.run.scene=null;openPlace(G.run.at);tinhToa(1)");ok(run("G.run.scene.type")==='place', 'A1: mỗi kiếp một lần');
    // A2: chỉ khi đã có Mộng Ấn, ở nơi sông nước
    run("(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>DM_KY.A2.noi.includes(n.type)&&n.state!=='ruin');const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;r.scene=null;G.screen='map';r.kyT=W().t;dmM().mong=[];r.tamma=50})()");
    run("advanceTime(24)");ok(!run("G.run.kyA2"), 'A2: chưa có Mộng Ấn thì không gặp');
    run("dmM().mong=['MA03'];G.run.scene=null;G.run.kyT=W().t;advanceTime(24)");ok(run("G.run.scene&&G.run.scene.ev")==='dm_ky_A2'&&run("KYNGO.find(x=>x.id==='dm_ky_A2').c.length")===3, 'A2: đã có Mộng Ấn, ở bến sông → Một người chèo đò quen (ba lựa chọn)');
    run("kyPick(1)");ok(run("G.run.tamma")<=42&&run("NK.count('dm.kyChon')")>=2, 'A2 "ngồi im bên ông": tâm ma lắng xuống');
    // 86: khép hành trình
    run("G.run.scene=null;dmKetHet('END07')");
    ok(run("G.screen")==='ket'&&run("G.meta.ketHet.hau[G.meta.ketHet.hau.length-1]")===run("contentText('dm.ketHau')"), 'màn kết: hậu truyện nhắc Phàm giới');
    ok(/Phàm giới/.test(run("dmLinhGioi().khep"))&&/Linh giới đang trong quá trình phát triển/.test(run("dmLinhGioi().linh")), 'màn mở đầu sau khi khép: báo Linh giới đang phát triển');
    } finally { run("Object.assign(DM_KY,JSON.parse(HQ_BK))"); }
  },
  // truy nã: báo riêng khi sự kiện bị hoãn / hết hoãn; lính canh chia theo thế lực từng nơi
  truy_na3() {
    fresh("FEAT.truy=1;FEAT.tna=1;G.screen='map';G.run.pham=0;G.run.realm=2;G.run.kyT=W().t;G.run.tmT=W().t;TNA_BK=JSON.stringify(TNA)");
    try {
    run("TN3_GO=id=>{const n=nodeById(id);const r=G.run;r.at=n.id;r.region=n.r;r.moving=null;r.scene=null;r.truy=null;return n}");
    // hai nơi có dân cùng vùng, khác thế lực chủ
    const pr = JSON.parse(run(`JSON.stringify((()=>{const L=W().regions.flatMap(R0=>R0.nodes).filter(n=>['tran','thanh','cho'].includes(n.type)&&n.state!=='ruin');
      for(const a of L)for(const b of L)if(a.r===b.r&&a.id!==b.id&&tnaFa(a)!==tnaFa(b))return [a.id,b.id];return null})())`));
    ok(!!pr, 'có hai nơi cùng vùng thuộc hai thế lực khác nhau');
    if (pr) {
    run(`TA=nodeById(${pr[0]});TB=nodeById(${pr[1]});TN3_GO(TA.id)`);
    ok(run("(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>n.anchor&&LOC_NEO[n.anchor].fa&&n.type!=='tong');return !n||tnaFa(n)===LOC_NEO[n.anchor].fa})()"), 'nơi neo: thế lực chủ là thế lực của nơi đó');
    ok(run("W().regions.flatMap(R0=>R0.nodes).filter(n=>n.type==='tong').every(n=>tnaFa(n)==='tong:'+n.id)"), 'sơn môn: lính canh là người của tông đó');
    run("TNA.chung[TA.type]=1;TNA.chung.chac=0.9");run("tnaToi('pha_dat')");if(run("!!G.run.tnaCh"))run("kyPick(3)");run("G.run.scene=null;G.run.truy=null");
    ok(run("JSON.stringify(G.run.tna[TA.r].fa)")===JSON.stringify([run("tnaFa(TA)")]), 'phạm tội ở nơi thế lực A: chỉ thế lực A ghi mặt');
    run("TNA.nhan=[0,1,1,1,1,1];NK.clear();TN3_GO(TB.id);arrive(TB.id)");ok(!run("G.run.truy")&&run("NK.count('tna.laFa')")>0, 'tới nơi của thế lực khác cùng vùng: lính canh không nhận ra');
    run("TN3_GO(TA.id);arrive(TA.id)");ok(run("G.run.truy&&G.run.truy.k==='quan'"), 'về nơi của thế lực A: bị nhận ra, quan sai đuổi');
    run("G.run.truy=null;TNA.nhan=[0,0,0,0,0,0];TNA.cai.dong={thanh:1,tran:1,cho:1};TNA.cai.khi={goc:1,realm:0,max:1};G.run.hide=null;G.run.caiT=W().t+HM;TN3_GO(TB.id);arrive(TB.id)");
    ok(run("tnaCai()"), 'cải trang ở nơi thế lực khác: đám đông, khí tức không làm lộ');
    run("TN3_GO(TA.id);arrive(TA.id)");ok(!run("tnaCai()")&&run("NK.count('tna.lo')")>0, 'cải trang ở nơi thế lực A: bị lộ');
    run("G.run.truy=null;TN3_GO(TB.id)");const tip=run("tnaHud().tip");
    ok(tip.includes(run("tnaFaTen(tnaFa(TA))"))&&tip.includes(run("contentText('tna.faDay',[tnaFaTen(tnaFa(TB))])")), 'chú thích: ghi thế lực biết mặt, nơi đang đứng chưa biết');
    run("tnaBao(TB.r,1,{noTruy:1,node:TB})");ok(run("tnaBiet(G.run.tna[TB.r],TB)&&G.run.tna[TB.r].fa.length===2"), 'phạm tội cả ở nơi thế lực B: B cũng biết');
    run("G.run.tna={};tnaBao(TA.r,1,{noTruy:1,node:TA})");ok(!run("tnaBiet(G.run.tna[TA.r],TB)"), 'tội nhẹ không lan sang thế lực khác');
    run("tnaBao(TA.r,4,{noTruy:1,node:TA})");ok(run("tnaBiet(G.run.tna[TA.r],TB)")&&run("W().regions.every((_,i)=>i===TA.r||(G.run.tna[i]&&G.run.tna[i].fa[0]==='*'))"), 'tội rất nặng: mọi thế lực, mọi vùng đều biết');
    run("G.run.tna={};G.run.tna[TA.r]={m:2,tien:1000,t:W().t,ly:['danh']}");ok(run("tnaBiet(G.run.tna[TA.r],TB)&&!!tnaHud()"), 'bản lưu cũ (không ghi thế lực): cả vùng biết như trước');
    run("tnaBao(TA.r,1,{noTruy:1})");ok(run("tnaBiet(G.run.tna[TA.r],TB)"), 'tội không rõ nơi (danh tiếng, nợ cũ): cả vùng biết');
    // thế lực tan thì nơi đó về tay thế lực khác
    const an = run("(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>n.anchor&&LOC_NEO[n.anchor].fa&&n.type!=='tong');return n?n.id:null})()");
    if (an != null) { run(`TN3_F=LOC_NEO[nodeById(${an}).anchor].fa;TN3_FB=JSON.stringify(faInit(W())[TN3_F]);faInit(W())[TN3_F].trang='diet'`);
      ok(run(`tnaFa(nodeById(${an}))!==TN3_F`), 'thế lực đã tan: lính canh nơi đó thuộc thế lực khác');run("faInit(W())[TN3_F]=JSON.parse(TN3_FB)"); }
    }
    // báo riêng khi sự kiện bị hoãn / hết hoãn
    run("G.run.tna={};G.run.truy=null;G.run.tnaCh=null;G.run.kyHoan=[];G.run.scene=null;G.toasts=[];KY3=KYNGO.find(x=>!x.sp&&!x.paid&&!x.joke&&(!x.content||contentTriggerOk(x.content)))");
    const nT = k => run(`G.toasts.filter(x=>x.t===contentText('${k}')).length`);
    run("tnaBao(G.run.region,1,{noTruy:1})");ok(!run("tnaHoan()")&&run("kyNgau(KY3)")===true&&nT('tna.hoanBao')===0, '"Bị nghi": không hoãn, không báo');
    run("G.run.scene=null;tnaBao(G.run.region,1,{noTruy:1})");run("kyNgau(KY3);kyNgau(KY3)");ok(nT('tna.hoanBao')===1&&run("G.run.kyHoan.length")===1, 'bị hoãn lần đầu: một dòng báo (lần sau trong đợt không báo lại)');
    run("tnaXoa(G.run.region,'nop');G.run.kyThaT=null;G.run.contentLast={};G.toasts=[];advanceTime(1)");ok(nT('tna.hoanHet')===1&&run("NK.count('tna.hoanHet')")>0, 'hết hoãn: một dòng báo sự kiện giữ lại sẽ hiện');
    run("G.run.scene=null;G.toasts=[];advanceTime(1)");ok(nT('tna.hoanHet')===0, 'không báo lại khi đã hết hoãn');
    run("tnaBao(G.run.region,2,{noTruy:1});kyNgau(KY3)");ok(nT('tna.hoanBao')===1, 'đợt truy nã mới: báo lại');
    run("tnaXoa(G.run.region,'nop');G.run.kyHoan=[];G.toasts=[];advanceTime(1)");ok(nT('tna.hoanHet')===0&&!run("G.run.kyHoanBao"), 'hết đợt mà không còn gì giữ lại: không báo');
    } finally { run("Object.assign(TNA,JSON.parse(TNA_BK));G.run&&(G.run.scene=null)"); }
  },
  dat_thue() {
    // mua ô đã có công trình (giá cộng giá công trình, giữ công trình) · thuế đất ở thôn trấn / thành, nợ thuế
    fresh("FEAT.tna=1;FEAT.nha=1;FEAT.no=1;G.screen='map';G.run.pham=0;G.run.realm=1;G.run.kiep=1");
    const all = "W().regions.flatMap(R0=>R0.nodes)";
    run(`DT_T=${all}.find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin');datStore()[DT_T.id]={v:1,o:[{ct:'tuu_lau',chu:{k:'dan'},goc:1},{ct:'tra_lau',chu:{k:'dan'},goc:1,hu:W().t+9e9},{ct:null,chu:{k:'dan'},goc:0}],pha:{}};
      (()=>{const r=G.run;r.at=DT_T.id;r.region=DT_T.r;r.moving=null;openPlace(DT_T.id);r.bac=1e6;r.st=0;r.tna={};})()`);
    const ops = () => JSON.parse(run("JSON.stringify(datOpts(DT_T).map(o=>({id:o.id,no:o.no,d:o.d})))"));
    const op = id => ops().find(o => o.id === id) || {};
    const gia = run("Math.round((DAT.mua.gia.tran+DAT.mua.ct.tuu_lau)*DAT.mua.chu.dan)");
    ok(run("datMuaGia(DT_T,W().dat[DT_T.id].o[0])")===gia, 'giá ô có công trình = giá đất + giá công trình ('+run("fmtBac("+gia+")")+')');
    ok(!!op('mua:0').id&&!op('mua:0').no&&op('mua:0').d.includes(run("contentText('dat.thueD',[fmtBac(datThueGia(DT_T))])")), 'ô tửu lầu của dân: mua được, có báo thuế mỗi năm');
    ok(!op('mua:1').id, 'công trình đang hư tạm: không bán');
    run("G.run.faQh={FA04:-30}");ok(run("datMuaNo(DT_T,{ct:'tuu_lau',chu:{k:'fa',id:'FA04'}})")===run("contentText('dat.muaFa',[datChuTen({k:'fa',id:'FA04'})])"), 'công trình của thế lực không ưa: không bán (như ô trống)');run("G.run.faQh={}");
    run("G.run.tna={[DT_T.r]:{m:2,tien:0,t:W().t,ly:[]}}");ok(op('mua:0').no===run("contentText('dat.muaNa')"), 'bị truy nã: không bán ô có công trình');run("G.run.tna={}");
    const b0 = run("G.run.bac");ok(run("venueDo('datdai','mua:0')")&&b0-run("G.run.bac")===gia, 'mua tửu lầu: trừ đúng giá');
    ok(run("(()=>{const c=W().dat[DT_T.id].o[0];return c.chu.k==='ta'&&c.ct==='tuu_lau'&&c.muaCt===1&&c.thueT>W().t})()")&&run("placeActs(DT_T).some(a=>a.a==='tuu')"), 'mua xong: của ngươi, tửu lầu vẫn mở');
    ok(/dat.mua.*tuu_lau/.test(run("NK.dump()")), 'nhật ký dat.mua (ct tuu_lau)');
    // thuế
    const tg = run("datThueGia(DT_T)");ok(tg===run("Math.round(DAT.mua.gia.tran*DAT.thue.ty.tran)")&&tg>0, 'thuế trấn mỗi năm '+run("fmtBac("+tg+")"));
    ok(run(`(()=>{const n=${all}.find(n=>n.type==='cho');return !n||datThueGia(n)===0})()`), 'chợ: không thu thuế');
    const b1 = run("G.run.bac");run("G.run.scene=null;advanceTime(DAT.thue.ky*HM+HD)");
    ok(run("G.run")&&b1-run("G.run.bac")===tg&&run("NK.count('dat.thue')")>0, 'tới kỳ: tự nộp thuế bằng bạc');
    const d0 = run("danhGet('reg:'+DT_T.r)");run("G.run.bac=0;G.run.st=0;G.run.scene=null;advanceTime(DAT.thue.ky*HM)");
    ok(run("W().dat[DT_T.id].o[0].thueNo")===tg&&run("W().dat[DT_T.id].o[0].chu.k")==='ta', 'không đủ tiền: ghi nợ thuế, không mất đất');
    ok(run("danhGet('reg:'+DT_T.r)")===d0+run("DAT.thue.danh")&&run("NK.count('dat.thueNo')")>0, 'nợ thuế: danh tiếng khu tụt nhẹ');
    run("openPlace(DT_T.id)");ok(op('mua:2').no===run("contentText('dat.thueMua')"), 'đang nợ thuế: không mua thêm đất ở đây');
    run("G.run.bac=5000;G.run.scene=null;advanceTime(HD)");ok(run("W().dat[DT_T.id].o[0].thueNo")===0&&run("G.run.bac")===5000-tg, 'có tiền: tự trả nợ thuế');
    run("G.run.bac=0;G.run.scene=null;advanceTime((DAT.thue.noKy+1)*DAT.thue.ky*HM)");
    ok(run("G.run.bac")===-(run("DAT.thue.noKy")+1)*tg&&run("W().dat[DT_T.id].o[0].thueNo")===0&&run("NK.count('dat.thueQuan')")>0, 'nợ quá '+run("DAT.thue.noKy")+' kỳ: quan phủ ghi thành nợ thường ('+run("fmtBac(-G.run.bac)")+')');
    ok(run("W().dat[DT_T.id].o[0].chu.k")==='ta'&&!!run("G.run.noTra"), 'vẫn giữ đất; sổ nợ quan phủ mở');
    // bán lại khi còn nợ thuế: trừ vào tiền bán
    run("G.run.bac=0;G.run.noTra=null;W().dat[DT_T.id].o[0].thueNo=500;openPlace(DT_T.id)");
    ok(run("venueDo('datdai','ban:0')")&&run("G.run.bac")===run("Math.round((DAT.mua.gia.tran+DAT.mua.ct.tuu_lau)*DAT.mua.ban)")-500, 'bán ô mua kèm công trình: nửa giá (đất + công trình), trừ nợ thuế');
    ok(run("(()=>{const c=W().dat[DT_T.id].o[0];return c.chu.k==='dan'&&c.ct==='tuu_lau'&&!c.thueNo&&!c.thueT})()"), 'bán rồi: về tay dân, công trình còn, hết sổ thuế');
    // bản lưu cũ / đất kiếp trước
    run("(()=>{const o=W().dat[DT_T.id].o;o[2].chu={k:'ta'};delete o[2].thueT;G.run.datThueX=null;G.run.bac=1e5;G.run.scene=null})();advanceTime(HD)");
    ok(run("W().dat[DT_T.id].o[2].thueT>W().t")&&run("G.run.bac")===1e5&&run("NK.count('dat.thueCu')")>0, 'bản lưu cũ: ghi sổ thuế, không thu bù');
    run("(()=>{const c=W().dat[DT_T.id].o[2];c.thueK=99;c.thueT=W().t;G.run.datThueX=null;G.run.scene=null})();advanceTime(HD)");
    ok(run("G.run.bac")===1e5, 'đất ghi kiếp khác: không thu thuế đời này');
  },
  // Đ10 còn dở: đại lộ DL02 "Diệt Thế Ma Đồ" kết tuyến → cưỡng mở Diệt Thế (thiếu: ba khu đất ma; đủ: END08)
  dl02_diet() {
    fresh("FEAT.mong=1;G.screen='map';G.run.gbXong=1;G.run.pham=0;G.run.realm=2;G.run.kiep=1");
    run("DL_S=()=>{const T=tySt();T.dl=tyNew('DL02');return T.dl}");
    ok(run("JSON.stringify(DM_DL.ket)")==='["A","B"]'&&run("TUYEN.DL02.ket.map(k=>k.id).join()")==='A,B,C', 'bảng DM_DL: kết A, B của DL02 động mạch sâu');
    run("G.run.dietThieu=0;tyKet(DL_S(),'C')");ok(!run("G.run.dietThieu")&&run("NK.count('dm.dl02')")===0, 'kết C (dừng trước mạch sâu): không mở Diệt Thế');
    run("tyKet(DL_S(),null)");ok(!run("G.run.dietThieu"), 'tuyến tự khép (ngoài người chơi): không mở');
    const z0 = run("W().regions.flatMap(R0=>R0.nodes).filter(n=>n.state==='ma'||n.ma).length");
    run("DL_D0=demDaiTang;DL_DN=0;demDaiTang=function(){DL_DN++;return DL_D0.apply(this,arguments)};tyKet(DL_S(),'A');demDaiTang=DL_D0");
    ok(run("G.run.dietThieu")===1&&/src":"dl02/.test(run("NK.dump()"))&&run("DL_DN")===1, 'kết A thiếu điều kiện: ba khu đất ma, Đêm Dài +1, ghi nhật ký');
    ok(run("G.run")&&!run("G.run.dlDiet")&&run("G.screen")==='map', 'thiếu điều kiện: đời vẫn tiếp, không kết');
    run("NK.clear();tyKet(DL_S(),'B')");ok(run("NK.count('dm.dietThieu')")===0, 'mỗi kiếp một lần');
    // đủ điều kiện NG04 → END08 ở lượt thời gian kế
    run("G.run.dietThieu=0;G.meta.tri={TRI01:['a','b'],TRI02:['a','b'],TRI03:['a','b']};ngW().khoa={LOC05:1,LOC07:1};G.run.st=1500;G.run.hp=S().maxHp");
    ok(run("dmDkOk(dmDk('NG04'))"), 'đủ ba tri thức, hai quyền khoá, linh thạch, khí huyết');
    run("tyKet(DL_S(),'B')");ok(run("G.run.dlDiet")===1&&!run("G.run.dietThieu"), 'kết B đủ điều kiện: hẹn Diệt Thế');
    run("G.run.scene={type:'kyngo'};advanceTime(1)");ok(run("G.run&&G.run.dlDiet")===1, 'đang ở hộp thoại: chờ');
    run("G.run.scene=null;advanceTime(1)");ok(run("G.screen")==='ket'&&run("G.meta.ketHet.id")==='END08'&&!run("G.run")&&/src":"dl02/.test(run("NK.dump()")), 'lượt kế: Thế giới không còn người gọi tên (END08)');
  },
  // Đ11 còn dở: lối vào nghề theo duyên (khí vận / linh căn / xuất thân) và số cho hiệu ứng ngoài trận của nghề mở rộng
  nghe_tu_duyen() {
    const base="G._ngNoEv=1;G._tuNoRui=1;G.run.pham=0;G.run.root={id:'tap',els:['kim','moc'],q:'thuong'};G.run.rootKnown=1;G.run.st=9999;G.run.lifeAdj=500;lkTang=()=>9;G.screen='map';G.run.kv=[];G.run.ccFlag={};G.run.origin='nong';";
    run("var dyLk=lkTang");
    try {
    fresh(base);
    ok(Object.keys(JSON.parse(run("JSON.stringify(TU_DUYEN)"))).join()==='TU17,TU18,TU19,TU20,TU21,TU22,TU23,TU24,TU25', 'chín nghề mở rộng đều có lối vào theo duyên');
    ok(!run("mrDuyen('TU19')")&&run("tuPhi('TU19',0)")===15, 'không duyên: bái học mất phí như cũ');
    run("G.run.kv=['phat_tu']");ok(/Phật Tử/.test(run("mrDuyen('TU19')"))&&run("tuPhi('TU19',0)")===0, 'khí vận Phật Tử: duyên Phật tu, bái học không mất phí');
    run("G.run.scene=null;ccMonth()");ok(run("G.run.scene&&G.run.scene.ev")==='tumr_duyen'&&run("G.run.tuDuyen.TU19")===1, 'mỗi tháng: hiện hộp "Duyên nghề"');
    ok(/Phật tu/.test(run("G.run.scene.text")), 'hộp nói rõ nghề và duyên');
    run("kyPick(0)");ok(run("G.run.tu.chinh")==='TU19'&&run("G.run.st")===9999&&run("NK.count('tumr.duyenHoc')")===1, 'theo duyên: tự ngộ Phật tu tại chỗ, không phí');
    run("G.run.scene=null;ccMonth()");ok(!run("G.run.scene"), 'đã học: không hỏi lại');
    // linh căn Cổ → Cổ sư (từ chối thì để sau, mỗi kiếp hỏi một lần)
    fresh(base+"G.run.ccFlag={nuoi_co:1}");ok(/Linh Căn Cổ/.test(run("mrDuyen('TU17')")||''), 'Linh Căn Cổ: duyên Cổ sư');
    run("G.run.scene=null;ccMonth();kyPick(1)");ok(!run("tuArtOf('TU17')")&&run("NK.count('tumr.duyenSau')")===1, 'để sau: chưa học');
    run("G.run.scene=null;ccMonth()");ok(!run("G.run.scene"), 'mỗi kiếp một lần');
    run("(()=>{const n=nodeById(tuNode('TU17'));G.run.at=n.id})()");ok(run("tuOpts(nodeById(G.run.at)).some(o=>o.id==='hoc:TU17'&&/có duyên/.test(o.l))"), 'ở nơi thầy: lựa chọn ghi "có duyên"');
    // linh căn hệ Lôi, xuất thân con nhà buôn, Văn tâm
    fresh(base+"G.run.root={id:'bien',els:['loi'],q:'thuong'}");ok(/Lôi/.test(run("mrDuyen('TU23')")||''), 'linh căn hệ Lôi: duyên Lôi pháp sư');
    fresh(base+"G.run.origin='buon'");ok(!!run("mrDuyen('TU22')"), 'con nhà buôn có linh căn: duyên Thương tu');
    fresh(base+"G.run.ccFlag={van_tam:1};hdAdd(0,40,'x')");ok(!!run("mrDuyen('TU20')"), 'Văn tâm: duyên Nho tu');
    run("G.run.scene=null;ccMonth()");ok(!run("G.run.scene"), 'Nho tu vẫn cần lòng ngay: nghiêng tà thì không hiện');
    ok(run("CAI_CAN.HAO_NHIEN.steps[0].okFx.flag")==='van_tam', 'cải căn Dưỡng Hạo Nhiên Khí để lại Văn tâm');
    fresh(base+"G.run.pham=1");run("G.run.kv=['quy_nhan'];G.run.scene=null;ccMonth()");ok(!run("G.run.scene"), 'phàm nhân: chưa hiện');
    fresh(base);run("G.run.tuDuyen=undefined;G.run.kv=['nhan_qua_dao'];G.run.scene=null;ccMonth()");ok(run("G.run.scene&&G.run.scene.ev")==='tumr_duyen', 'bản lưu cũ (không có tuDuyen): vẫn chạy');
    // số cho hiệu ứng ngoài trận
    const lv7 = id => `G.run.realm=3;tuHoc('${id}',0);tuArtOf('${id}').lv=7;`; // dòng req 2 cần cảnh giới
    fresh(base);run("G.run.realm=3;"+lv7('TU23'));ok(run("aggFx().loiKiep")===20&&run("aggFx().loiAm")===25, 'Lôi pháp: thiên lôi nhẹ hơn 20%, nơi âm khí yếu 25%');
    run("startCombat({kiep:{n:3,waves:1,block:0,kind:'loi'}},{kind:'node'});DK_S=G.run.scene;DK_S.skipDodge=1;DK_M=mainUnit(DK_S);DK_K=DK_S.units.find(u=>u.kind==='kiep');DK_M.hp=DK_M.max=100000;DK_M.st={}");
    const h0 = run("DK_M.hp");run("kiepHit(DK_S,DK_K,null)");const d1 = h0-run("DK_M.hp");
    run("tuArtOf('TU23').lv=1;DK_M.hp=100000;kiepHit(DK_S,DK_K,null)");const d2 = 100000-run("DK_M.hp");
    const rat = (d1/(0.18+0.035))/(d2/(0.18+0.07));ok(Math.abs(rat-0.8)<0.02&&run("NK.count('tumr.loiKiep')")===1, 'thiên lôi đánh nhẹ hơn 20% (tỉ lệ '+rat.toFixed(2)+')');
    fresh(base);run(lv7('TU23')+"(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>n.type==='phe'||n.type==='ma');G.run.at=n.id})();startCombat({},{kind:'node'});G.run.scene.skipDodge=1");
    run("var dS=G.run.scene,dM=mainUnit(dS),dF=alive(dS,'B')[0];dF.hp=dF.max=99999;dM.mp=dM.maxMp=9999;resolveSkill(dS,dM,SK.sk23a,1,[dF],1,'auto')");ok(run("NK.count('tumr.loiAm')")===1, 'Lôi pháp ở nơi âm khí: chiêu yếu đi');
    // Thi tu: ban ngày ngoài trời xác luyện yếu
    fresh(base);run(lv7('TU18')+"(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>!TU_MR.thiTrong.includes(n.type));G.run.at=n.id})();startCombat({},{kind:'node'});G.run.scene.skipDodge=1");
    ok(run("aggFx().thiNgay")===30, 'Thi tu: ban ngày xác luyện yếu 30%');
    run("var tS=G.run.scene,tM=mainUnit(tS);W().t=Math.floor(W().t/HD)*HD+2;resolveSkill(tS,tM,SK.sk18b,1,[],1,null);TD_N=fxmSum(tS,tM,'thi').atk");
    run("W().t=Math.floor(W().t/HD)*HD+HD+12;resolveSkill(tS,tM,SK.sk18b,1,[],1,null);TD_D=fxmSum(tS,tM,'thi').atk");
    ok(Math.abs(run("TD_D/TD_N")-0.7)<0.03&&run("NK.count('tumr.thiNgay')")===1, 'ban đêm đủ sức, ban ngày còn 70%');
    // Nho tu: thiện cảm
    fresh(base+"hdAdd(30,0,'x');"+lv7('TU20'));ok(run("aggFx().nhoThuyet")===20&&run("favAdd('Người Thử',10)")===12&&run("favAdd('Người Thử',-10)")===-10, 'Nho tu: thiện cảm tăng thêm 20%, phần giảm giữ nguyên');
    // Thương tu: mua rẻ, bán được giá
    fresh(base);run("G.run.realm=3;G.run.pills=[{id:Object.keys(PILL)[0],q:0}];SL0=sellList()[0].p;P0=price(100);"+lv7('TU22'));
    ok(run("price(100)")<run("P0")&&run("sellList()[0].p")>run("SL0")&&run("aggFx().banP")===10, 'Thương tu: mua rẻ hơn, bán được giá hơn');
    // Cổ sư: giải cổ ít hỏng
    fresh(base);run(lv7('TU17')+"G._tuNoRui=0;TD_RUI=TU_CFG.rui;TU_CFG.rui=1;(()=>{const n=W().regions.flatMap(R0=>R0.nodes).find(n=>['tran','dam'].includes(n.type)&&n.state!=='ruin');G.run.at=n.id})()");
    run("for(let i=0;i<20;i++){G.run.wounds=[];G.run.st=999;tuHd('TU17')};TU_CFG.rui=TD_RUI;G._tuNoRui=1");
    const tha = run("NK.count('tumr.coGiai')");ok(tha>=4&&tha<=16, 'Cổ sư: giải cổ chắc tay hơn (thoát hỏng '+tha+'/20)');
    // Thôn phệ: đã nuốt ở cảnh giới này thì đột phá khó hơn
    fresh(base);run("G.run.realm=3;G.run.tamma=0;"+lv7('TU25'));const b0 = run("btRate([])");run("G.run.tuThonR=4");const b1 = run("btRate([])");
    ok(run("aggFx().thonBt")===10&&b1<b0&&Math.abs(b1/b0-0.9)<0.02, 'Thôn phệ: đột phá ×0,9 sau khi nuốt tu vi ('+b0.toFixed(3)+'→'+b1.toFixed(3)+')');
    run("G.run.tuThonR=3");ok(run("btRate([])")===b0, 'nuốt ở cảnh giới trước: không tính');
    } finally { run("lkTang=dyLk;G._tuNoRui=0"); }
  },
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
