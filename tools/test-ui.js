// Kiểm tra giao diện bằng trình duyệt không màn hình, dựa chủ yếu vào chữ (DOM + nhật ký NK), ảnh chỉ chụp khi cần.
// Dùng:  node tools/test-ui.js              chạy tất cả
//        node tools/test-ui.js bequan       chỉ vài bài
//        node tools/test-ui.js --log        in thêm nhật ký NK
//        node tools/test-ui.js --shot DIR   chụp thêm ảnh từng bài vào thư mục DIR (dùng thưa thôi)
//        node tools/test-ui.js --list
// Cần đã build: npm run build (đọc phu-sinh.html). Trang mở với ?debug=1 nên nhật ký NK tự bật.
const { chromium } = require('playwright');
const path = require('path');
const args = process.argv.slice(2), LOG = args.includes('--log'), si = args.indexOf('--shot'), SHOT = si >= 0 ? args[si + 1] : null;
const names = args.filter((a, i) => !a.startsWith('--') && (si < 0 || i !== si + 1));
let fails = 0;
const ok = (c, m) => { if (!c) fails++; console.log('   ' + (c ? '✓ ' : '✗ ') + m); };

// mở game, sinh nhân vật, vào bản đồ. Trả về trang đã sẵn sàng.
async function boot(b, w = 400, h = 800) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text().slice(0, 200)); });
  await p.goto('file://' + path.join(__dirname, '..', 'phu-sinh.html') + '?debug=1');
  await p.waitForTimeout(300);
  await (await p.waitForSelector('[data-act="birth"]')).click();
  await (await p.waitForSelector('[data-act="lifeGo"]', { timeout: 30000 })).click();
  await p.waitForTimeout(1200);
  await p.evaluate(() => { G.run.scene = null; });
  return p;
}
const ev = (p, f, a) => p.evaluate(f, a);
const shot = async (p, name) => { if (SHOT) await p.screenshot({ path: path.join(SHOT, name + '.png') }); };

const TESTS = {
  // túi trữ vật khoá khi hết linh lực; mũi tên tăng/giảm; tên riêng có chú thích
  async dot32(p) {
    const b = p; // trang đã mở sẵn
    const r = await ev(b, () => {const r=G.run;r.pham=0;r.relics=[];r.pills=[];eqOf().tuivat={k:'tui',name:'Túi thử',tier:0,fx:{},slots:0};
      for(let i=0;i<14;i++)r.relics.push(genRelic(0));r.mp=0;ACT.bagOpen();render();return 1;});
    await b.waitForTimeout(500);
    ok(await ev(b, () => document.querySelectorAll('.bc.tlk').length) === 4, 'túi khoá: 4 món trong ô túi mờ đi, có ổ khoá');
    ok(await ev(b, () => [...document.querySelectorAll('.hint')].some(x => /Túi trữ vật đang khoá/.test(x.innerText))), 'túi khoá: có dòng nhắc');
    const h = await ev(b, () => emoTxt('+130% lịch luyện') + '|' + emoTxt('−20% tu vi'));
    ok(/chev gain c3/.test(h) && /chev gain c1 dn/.test(h) && !/130%<\//.test(h), 'mũi tên: +130% ra 3 mũi xanh, −20% ra 1 mũi đỏ');
    const g = await ev(b, () => {const w=G.meta.world;return txt(w.sects[0].n+' và '+w.rivals[0].ten);});
    ok((g.match(/class="gl"/g) || []).length >= 2, 'tên tông môn và thiên kiêu có chú thích');
  },
  // màn bế quan: có bầu trời theo giờ, hai thanh tu vi và lịch luyện
  async bequan(p) {
    await ev(p, () => { const dp = regionOf(0).nodes.find(n => n.dp); G.run.at = dp.id; arrive(dp.id); openPlace(dp.id); UI.modal = { k: 'bq' }; render(); });
    await p.waitForTimeout(500);
    const r = await ev(p, () => ({ sky: !!document.querySelector('.bq-sky'), tint: !!document.querySelector('.bq-tint'), time: (document.querySelector('.bq-time') || {}).textContent, bars: document.querySelectorAll('.mbox.bq .hb').length, slider: !!document.querySelector('#bqR') }));
    ok(r.sky && r.tint, 'có bầu trời ngày đêm (' + r.time + ')'); ok(r.bars >= 2, 'có ' + r.bars + ' thanh tiến độ (tu vi, lịch luyện)'); ok(r.slider, 'có thanh trượt thời gian');
    ok(await ev(p, () => !document.querySelector('.tvrow .hb.ll') || !!document.querySelector('.mbox.bq .hb.ll')), 'lịch luyện nằm trong màn bế quan');
    await shot(p, 'bequan');
  },
  // đầu trận có chữ báo; vào trận thật bằng bấm nút
  async combat(p) {
    await ev(p, () => { openPlace(G.run.at); startCombat({ cnt: 1 }, { kind: 'node' }); render(); });
    await p.waitForTimeout(400); await (await p.waitForSelector('.btn.pri')).click();
    let txt = ''; for (let i = 0; i < 25 && !txt; i++) { await p.waitForTimeout(150); txt = await ev(p, () => (document.querySelector('.fx-banner') || {}).textContent || ''); }
    ok(!!txt, 'chữ báo đầu trận: "' + txt + '"'); await shot(p, 'combat');
  },
  // tĩnh toạ: thẻ riêng trong hộp bế quan, bấm thì hồi máu và thời gian trôi
  async tinhtoa(p) {
    await ev(p, () => { G.run.hp = 1; openPlace(G.run.at); UI.modal = { k: 'bq', tab: 'tt' }; render(); });
    await p.waitForTimeout(400);
    ok(await ev(p, () => [...document.querySelectorAll('.mbox h3')].some(h => h.textContent === 'Tĩnh toạ')), 'có thẻ Tĩnh toạ');
    const b = await p.$('[data-act="ttGo"]'); ok(!!b, 'có nút Tĩnh toạ');
    if (b) { await b.click(); await p.waitForTimeout(400); }
    ok(await ev(p, () => NK.count('tinhtoa') === 1 && G.run.hp > 1), 'tĩnh toạ xong, khí huyết tăng');
  },
  // bản đồ ảnh: nền "chưa tới" + vệt mực "đã thấy"; phóng to hết cỡ thì rê chuột không hiện chú thích
  async bando(p) {
    for (let i = 0; i < 30; i++) { await p.waitForTimeout(150); if (await ev(p, () => Map2.imgOk >= 2 && Map2.ink)) break; }
    ok(await ev(p, () => Map2.imgOk >= 2), 'đã tải ảnh bản đồ (' + await ev(p, () => Map2.imgOk) + ' ảnh)');
    ok(await ev(p, () => Map2.ink), 'có lớp "đã thấy" quanh nhân vật');
    await ev(p, () => { Map2.center(); Map2.zoom(10); });
    await p.waitForTimeout(300);
    const box = await (await p.$('canvas')).boundingBox();
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.move(box.x + box.width / 2 + 9, box.y + box.height / 2 + 7);
    await p.waitForTimeout(200);
    ok(await ev(p, () => { const t = document.querySelector('#tip'); return !t || !t.classList.contains('on') && getComputedStyle(t).display === 'none' || t.style.display === 'none' || !t.textContent.trim() || getComputedStyle(t).opacity === '0'; }), 'phóng to hết cỡ: không hiện chú thích khi rê chuột');
    const t = await ev(p, () => { const t0 = performance.now(); for (let i = 0; i < 5; i++) { Map2.invalidate(); Map2.frame && Map2.frame(performance.now() + i * 100); } return performance.now() - t0; });
    ok(t < 1500, 'vẽ 5 khung: ' + Math.round(t) + 'ms');
    await ev(p, () => cfgSet('gfx', 'low'));
    for (let i = 0; i < 30; i++) { await p.waitForTimeout(150); if (await ev(p, () => Map2.imgOk >= 1)) break; }
    ok(await ev(p, () => Map2.imgOk >= 1), 'mức Tiết kiệm dùng ảnh nén');
    await shot(p, 'bando-zoom');
  },
  // chọn địa điểm ở đại khu vực khác: thẻ địa điểm phải hiện; có nút thu nhỏ hết cỡ
  async chonxa(p) {
    const r = await ev(p, () => { const k = (G.run.region + 1) % 5; const n = regionOf(k).nodes.find(x => x.type === 'tran'); n.fog = 2; geo().nodeAt = null; mapTap(hexNode(n.hex), n.hex); return { ok: UI.sel === n.id, name: n.name }; });
    await p.waitForTimeout(500);
    ok(r.ok, 'bấm ô địa điểm ở khu khác thì chọn đúng nó');
    ok(await ev(p, n => !!document.querySelector('.dock.loc, .dock .nc-tt, .dock.card'), 0), 'thẻ địa điểm hiện');
    ok(await ev(p, () => !!document.querySelector('[data-act="zoomAll"]')), 'có nút thu nhỏ hết cỡ');
    await ev(p, () => { Map2.zoomOutAll(); }); await p.waitForTimeout(200);
    ok(await ev(p, () => Map2.cam.z < 0.8), 'thu nhỏ hết cỡ');
  },
  // thẻ địa điểm nổi gần icon: có nút đi tới kèm thời gian, nằm trong vùng nhìn thấy; chạm đại khu vực khi thu nhỏ hết cỡ
  async thenoi(p) {
    await ev(p, () => { Map2.locate(); const n = regionOf(G.run.region).nodes.find(x => x.id !== G.run.at && x.type === 'tran'); n.fog = 2; geo().nodeAt = null; const q = nodeById(n.id); Map2.focus(q.x, q.y); mapHold(q, nodeHex(q), [q.x, q.y]); });
    await p.waitForTimeout(700);
    const r = await ev(p, () => { const e = document.querySelector('#dock .np'); if (!e) return null; const b = e.getBoundingClientRect(); return { vis: getComputedStyle(e).visibility, l: b.left, t: b.top, r: b.right, b: b.bottom, go: (e.querySelector('.np-k:last-of-type') || {}).textContent, dg: !!e.querySelector('.np-dg'), W: innerWidth, H: innerHeight, txt: e.innerText }; });
    ok(!!r && r.vis === 'visible', 'thẻ địa điểm nổi hiện ra');
    ok(r && r.l >= 0 && r.t >= 0 && r.r <= r.W && r.b <= r.H, 'thẻ nằm trong màn hình');
    ok(r && /Đường đi/.test(r.go || ''), 'giữ chuột: thẻ có thời gian đường đi: ' + (r && r.go));
    ok(r && r.dg && !/Linh khí|dặm|Quy mô/.test(r.txt), 'có cụm an toàn/nguy hiểm, bỏ linh khí, dặm, quy mô');
    // thả tay: đánh dấu tuyến; chạm lại đúng chỗ: lên đường
    const mk = await ev(p, () => { const n = regionOf(G.run.region).nodes.find(x => x.id !== G.run.at && x.type === 'tran'); const q = nodeById(n.id); mapHoldEnd(); const c = nodeHex(q); mapTap(q, c, [q.x, q.y], 0.6); const a = !!UI.mark; mapTap(q, c, [q.x, q.y], 0.6); return [a, !!G.run.moving, !UI.mark]; });
    ok(mk[0] && mk[1] && mk[2], 'chạm đánh dấu tuyến, chạm lại thì lên đường ' + JSON.stringify(mk));
    await ev(p, () => { G.run.moving = null; G.run.dest = null; UI.sel = null; Map2.zoomOutAll(); const c = hexAt(WORLD_W / 2, WORLD_H / 2); mapTap(null, c, [WORLD_W / 2, WORLD_H / 2], Map2.zf); });
    await p.waitForTimeout(600);
    ok(await ev(p, () => !!document.querySelector('#dock .np.npv') && getComputedStyle(document.querySelector('#dock .np.npv')).visibility === 'visible'), 'thu nhỏ hết cỡ: chạm đại khu vực hiện thẻ mô tả khu');
  },
  // lăn chuột chỉ tới mức chuẩn; nút thu nhỏ xuống mức chiều ngang; zoom vào rồi ra lại được tới khi chạm mức chuẩn
  async thunho(p) {
    const r = await ev(p, () => { const m0 = (() => { Map2.zoom(0.001); return Map2.cam.z; })(); Map2.zoomOutAll(); const zw = Map2.cam.z; Map2.zoom(1.3); const a = Map2.cam.z; Map2.zoom(1 / 1.3); const b = Map2.cam.z; Map2.zoom(0.5); const c = Map2.cam.z;
      Map2.zoomOutAll(); Map2.zoom(m0 / zw * 1.5); Map2.zoom(0.5); const d = Map2.cam.z; return { m0, zw, a, b, c, d, wide: Map2.wide }; });
    ok(r.zw <= r.m0 + 1e-9, `nút thu nhỏ xuống ${r.zw.toFixed(3)} ≤ mức chuẩn ${r.m0.toFixed(3)}`);
    ok(Math.abs(r.b - r.zw) < 1e-6 && Math.abs(r.c - r.zw) < 1e-6, 'sau khi bấm nút, lăn ra lại vẫn tới mức rộng bằng màn hình');
    ok(Math.abs(r.d - r.m0) < 1e-6, 'zoom vào quá mức chuẩn rồi thì không lăn ra thấp hơn mức chuẩn nữa');
  },
  // bản lưu cũ (bản đồ năm ô vuông): dựng lại thế giới, đưa nhân vật về một trấn, không lỗi
  async luucu(p) {
    const r = await ev(p, () => { const d = JSON.parse(JSON.stringify(snapshot())); delete d.meta.world.mo; for (const R0 of d.meta.world.regions) for (const n of R0.nodes) { delete n.wc; n.x = R0.k * 1000 + 500; n.y = 500; } loadData(d); render(); return { mo: G.meta.world.mo, at: !!nodeById(G.run.at), t: nodeById(G.run.at).type }; });
    ok(r.mo === 1 && r.at, 'bản lưu cũ được chuyển sang bản đồ mới (đứng ở ' + r.t + ')');
    ok(await ev(p, () => NK.count('mo.migrate') === 1), 'nhật ký ghi mo.migrate');
  },
  // cấu hình: nút nhật ký gỡ lỗi
  async nhatky(p) {
    ok(await ev(p, () => NK.on === true), 'nhật ký bật nhờ ?debug=1');
    ok(await ev(p, () => NK.buf.length > 0 || (dbg('thu', {}), NK.buf.length > 0)), 'nhật ký có dòng');
  },
};

(async () => {
  if (args.includes('--list')) { console.log(Object.keys(TESTS).join('\n')); return; }
  const b = await chromium.launch();
  for (const k of (names.length ? names : Object.keys(TESTS))) {
    if (!TESTS[k]) { console.log('Không có bài: ' + k); fails++; continue; }
    console.log('▶ ' + k); const f0 = fails; let p;
    try { p = await boot(b); await TESTS[k](p); ok(p.errs.length === 0, 'không có lỗi trang' + (p.errs.length ? ': ' + p.errs.join(' | ') : '')); }
    catch (e) { fails++; console.log('   ✗ NGOẠI LỆ: ' + e.message.split('\n')[0]); }
    if (p && (LOG || fails > f0)) { try { console.log('   --- nhật ký ---\n' + (await ev(p, () => NK.dump(20))).split('\n').map(l => '   ' + l).join('\n')); } catch (e) {} }
    if (p) await p.close();
  }
  await b.close(); console.log(fails ? `\n${fails} lỗi` : '\nTất cả đạt'); process.exit(fails ? 1 : 0);
})();
