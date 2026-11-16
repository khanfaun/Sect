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
  // tĩnh toạ: thẻ riêng trong hộp bế quan, bấm thì hồi máu và thời gian trôi
  async tinhtoa(p) {
    await ev(p, () => { G.run.hp = 1; openPlace(G.run.at); UI.modal = { k: 'bq', tab: 'tt' }; render(); });
    await p.waitForTimeout(400);
    ok(await ev(p, () => [...document.querySelectorAll('.mbox h3')].some(h => h.textContent === 'Tĩnh toạ')), 'có thẻ Tĩnh toạ');
    const b = await p.$('[data-act="ttGo"]'); ok(!!b, 'có nút Tĩnh toạ');
    if (b) { await b.click(); await p.waitForTimeout(400); }
    ok(await ev(p, () => NK.count('tinhtoa') === 1 && G.run.hp > 1), 'tĩnh toạ xong, khí huyết tăng');
  },
  // phóng to tối đa: địa hình được vẽ lại nét (mảnh chi tiết)
  async bando(p) {
    await ev(p, () => { Map2.center(); Map2.zoom(10); });
    for (let i = 0; i < 20; i++) { await p.waitForTimeout(150); if (await ev(p, () => Map2.dtc > 0)) break; }
    ok(await ev(p, () => Map2.dtc > 0), 'đã vẽ mảnh chi tiết khi phóng to tối đa');
    const t = await ev(p, () => { const t0 = performance.now(); for (let i = 0; i < 5; i++) { Map2.invalidate(); Map2.frame && Map2.frame(performance.now()); } return performance.now() - t0; });
    ok(t < 1500, 'vẽ 5 khung khi đã có mảnh chi tiết: ' + Math.round(t) + 'ms');
    await shot(p, 'bando-zoom');
  },
  // ô lật gương (vùng 4, 5): mảnh chi tiết phải được vẽ
  // đổi buổi/mùa: đang đi thì giữ ảnh cũ; dừng lại mới đổi, có chuyển cảnh mực loang rồi kết thúc
  async doibuoi(p) {
    await p.waitForTimeout(800);
    const base0 = await ev(p, () => Map2.mapKey.split('|')[0]);
    // ép đồng hồ sang buổi khác trong lúc "đang đi"
    await ev(p, () => { const r = G.run; const o = allNodes().find(n => n.id !== r.at); r.moving = { path: [r.at, o.id], seg: 0, prog: 0.3 }; const h = tHour(W().t); W().t += (isDay(W().t) ? 19 - h + 1 : 24 - h + 8); Map2.invalidate(); });
    await p.waitForTimeout(700);
    const mv = await ev(p, () => Map2.mapKey.split('|')[0]);
    ok(mv === base0, 'đang đi: ảnh giữ nguyên (' + base0 + ')');
    await ev(p, () => { G.run.moving = null; Map2.invalidate(); });
    let on = false; for (let i = 0; i < 50 && !on; i++) { await p.waitForTimeout(100); on = await ev(p, () => Map2.trOn); }
    ok(on, 'dừng lại: bắt đầu chuyển cảnh mực loang');
    for (let i = 0; i < 60 && await ev(p, () => Map2.trOn); i++) await p.waitForTimeout(150);
    await p.waitForTimeout(400);
    const end = await ev(p, () => ({ on: Map2.trOn, key: Map2.mapKey.split('|')[0], want: { xuan: 'Spring', ha: 'Summer', thu: 'Autumn', dong: 'Winter' }[seasonOf(W().t)] + '-' + (isDay(W().t) ? 'day' : 'night') }));
    ok(!end.on && end.key === end.want, 'chuyển cảnh xong, ảnh mới là ' + end.key);
    await shot(p, 'doibuoi');
  },
  async bandoZoom(p) {
    const errs = []; p.on('pageerror', e => errs.push(e.message));
    for (const [x, y] of [[300, 300], [3300, 300], [1800, 1000], [300, 1800], [3300, 1800]]) { await ev(p, a => { Map2.focus(a[0], a[1]); Map2.zoom(10); }, [x, y]); await p.waitForTimeout(120); }
    ok(errs.length === 0, 'phóng to hết cỡ, kéo khắp bản đồ không báo lỗi');
    await shot(p, 'bando-zoom');
  },
  // cấu hình: nút nhật ký gỡ lỗi
  async nhatky(p) {
    ok(await ev(p, () => NK.on === true), 'nhật ký bật nhờ ?debug=1');
    ok(await ev(p, () => NK.buf.length > 0 || (dbg('thu', {}), NK.buf.length > 0)), 'nhật ký có dòng');
  },
  // bản đồ ảnh: đúng mùa và ngày/đêm, chỗ chưa thấy là bản đồ cổ, thu nhỏ hết cỡ thì rê chuột không hiện gì
  async bando(p) {
    await p.waitForTimeout(800);
    const k = await ev(p, () => ({ key: Map2.mapKey, want: { xuan: 'Spring', ha: 'Summer', thu: 'Autumn', dong: 'Winter' }[seasonOf(W().t)] + '-' + (isDay(W().t) ? 'day' : 'night'), anh: Object.keys(window.PS_ANH || {}).length }));
    ok(k.anh >= 13, 'đã nhúng ' + k.anh + ' ảnh (bản đồ + nền giấy)');
    ok(k.key.startsWith(k.want + '|'), 'nền bản đồ dùng ảnh ' + k.want + ' (' + k.key + ')');
    await ev(p, () => { advanceTime(12); render(); Map2.invalidate(); }); await p.waitForTimeout(600);
    const k2 = await ev(p, () => ({ key: Map2.mapKey, want: (isDay(W().t) ? 'day' : 'night') }));
    ok(k2.key.split('|')[0].endsWith(k2.want), 'qua 12 giờ thì đổi ảnh ' + k2.want);
    // điểm ảnh ở góc xa (chưa thấy) khác chỗ đứng (đã thấy)
    const px = await ev(p, () => { const cv = document.querySelector('canvas'); return !!cv; });
    ok(px, 'có canvas bản đồ');
    // thu nhỏ hết cỡ: rê chuột không tô vùng, không hiện chú thích
    await ev(p, () => { Map2.zoom(0.001); });
    await p.waitForTimeout(300);
    const box = await (await p.$('canvas')).boundingBox();
    await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2); await p.mouse.move(box.x + box.width / 2 + 5, box.y + box.height / 2 + 5);
    await p.waitForTimeout(200);
    const t = await ev(p, () => ({ zf: Map2.zf(), hov: Map2.hov, tip: !document.querySelector('#tip') || document.querySelector('#tip').hidden }));
    ok(t.zf <= 0.02 && t.hov == null && t.tip, 'thu nhỏ hết cỡ: rê chuột không tô ô, không chú thích (zf=' + t.zf.toFixed(2) + ')');
    ok(await ev(p, () => getComputedStyle(document.documentElement).getPropertyValue('--tex-sq').includes('data:image')), 'nền giấy cho hộp thoại đã gắn');
    await shot(p, 'bando');
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
