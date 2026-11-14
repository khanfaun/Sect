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
  // cấu hình: nút nhật ký gỡ lỗi
  async nhatky(p) {
    ok(await ev(p, () => NK.on === true), 'nhật ký bật nhờ ?debug=1');
    ok(await ev(p, () => NK.buf.length > 0 || (dbg('thu', {}), NK.buf.length > 0)), 'nhật ký có dòng');
  },
  // nút Quay về vùng cũ hiện ở giao diện thẻ địa điểm
  async goback(p) {
    await ev(p, () => { G.run.region = 1; G.run.maxRegion = 1; arrive(regionOf(1).entry); openPlace(regionOf(1).entry); render(); });
    await p.waitForTimeout(500);
    const btn = await p.$('[data-act="pact"][data-arg="goback"]');
    ok(!!btn, 'nút Quay về có trên giao diện');
    if (btn) {
      await btn.click(); await p.waitForTimeout(300);
      const c = await p.$('.mbox [data-act="pactGo"], .mbox .btn.pri'); if (c) { await c.click(); await p.waitForTimeout(500); }
      ok(await ev(p, () => G.run.region === 0), 'bấm nút thì về vùng 1'); ok(await ev(p, () => NK.count('region.back') === 1), 'nhật ký ghi region.back');
    }
    await shot(p, 'goback');
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
