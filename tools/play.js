// Mở phu-sinh.html trong trình duyệt không màn hình, bấm theo kịch bản, chụp ảnh từng bước.
// Dùng: node tools/play.js <thư mục ảnh> [kịch bản]
const { chromium } = require('playwright');
const path = require('path');
const out = process.argv[2] || '.', plan = process.argv[3] || 'start';
(async () => {
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 400, height: 800 }, deviceScaleFactor: 1 });
  const errs = [];
  p.on('pageerror', e => errs.push('PAGE ' + e.message));
  p.on('console', m => { if (m.type() === 'error') errs.push('CON ' + m.text().slice(0, 300)); });
  await p.goto('file://' + path.join(__dirname, '..', 'phu-sinh.html'));
  await p.waitForTimeout(400);
  let n = 0;
  const shot = async name => { await p.waitForTimeout(250); await p.screenshot({ path: path.join(out, String(++n).padStart(2, '0') + '-' + name + '.png') }); };
  const act = async (a, arg) => { const s = arg == null ? `[data-act="${a}"]` : `[data-act="${a}"][data-arg="${arg}"]`; const el = await p.$(s); if (!el) { errs.push('MISSING ' + s); return false; } await el.click({ force: true }); await p.waitForTimeout(120); return true; };
  const ev = f => p.evaluate(f);
  await shot('title'); await act('titleCfg'); await shot('title-cfg'); await act('closePanel');
  await act('birth'); await shot('birth');
  await p.waitForTimeout(2600); await shot('intro');
  await act('regionGo'); await shot('map');
  if (plan !== 'start') {
    await ev(() => { UI.sel = G.run.at; UI.cardMin = false; render(); }); await act('enter'); await shot('place'); await ev(() => { ACT.wait('sang'); const a = tHour(W().t); ACT.wait('toi'); const b = tHour(W().t); if (a !== 7 || b !== 19) console.error('WAIT sai ' + a + ' ' + b); render(); });
    await act('exStat'); await shot('explore-stat'); await act('modalX'); await act('evGo', 0); await shot('explore');
    // đi hết sự kiện bằng cách luôn chọn lựa chọn đầu
    for (let i = 0; i < 12; i++) {
      const t = await ev(() => { const sc = G.run && G.run.scene; return sc ? sc.type + ':' + (sc.phase || '') + ':' + (sc.done ? 'd' : '') : G.screen; });
      if (t.startsWith('event:choose')) { const c = await p.$('.ch:not([disabled])'); await c.click(); }
      else if (t.startsWith('event')) await act('next');
      else if (t.startsWith('enc')) { if (!(await p.$('[data-act="enc"]'))) await act('next'); else await act('enc', 'fight'); }
      else if (t.startsWith('combat')) break;
      else if (t.startsWith('reward')) { await shot('reward'); await act('rcont'); }
      else if (t.startsWith('swap')) await act('swap', -1);
      else if (t.startsWith('place')) break; else break;
      await p.waitForTimeout(150);
    }
    await shot('after-explore');
    // ép một trận để xem màn chiến đấu
    await ev(() => { if (G.run && !(G.run.scene && G.run.scene.type === 'combat')) { if (!G.run.scene) openPlace(G.run.at); startCombat({ cnt: 2 }, { kind: 'node' }); render(); } });
    await shot('combat');
    await ev(() => { ACT.menu('atk'); render(); }); await shot('combat-atk');
    await ev(() => { cfgSet('autoFight', true); cfgSet('cspeed', 3); syncDodge(); render(); });
    for (let i = 0; i < 80; i++) { await p.waitForTimeout(250); if (await ev(() => !G.run || !G.run.scene || G.run.scene.type !== 'combat' || G.run.scene.done)) break; }
    await shot('combat-end');
    await ev(() => { cfgSet('autoFight', false); cfgSet('cspeed', 1); syncDodge(); if (G.run && G.run.scene && G.run.scene.type === 'combat' && G.run.scene.done) { ACT.cont(); } render(); });
    await shot('after-combat');
    await ev(() => { if (G.run) { G.run.scene = null; G.run.hp = S().maxHp; G.run.mats = { thao: 9, khoang: 9, dan: 4 }; G.run.eggs.push({ k: 'lang', n: 'Tiểu Lang', i: '🐺', el: 'moc', t: 0 }); autoCheck(); G.run.scene = null; render(); } });
    for (const k of ['char', 'pets', 'journal', 'bonds', 'more']) { await act('panel', k); await shot('panel-' + k); if (k === 'char') { await act('tab', 'char:bag'); await shot('bag'); await act('tab', 'char:hoc'); await act('chuAuto'); await shot('hoc'); await act('tab', 'char:kn'); await shot('kn'); } if (k === 'more') { await act('tab', 'more:cfg'); await shot('cfg'); await act('tab', 'more:legend'); await shot('legend'); } }
    await act('closePanel');
    await act('panel', 'craft'); await shot('craft'); await act('craft', 'dan1'); await shot('craft-res'); await act('modalX'); await act('closePanel');
    // chọn một điểm kề rồi đi tới
    await ev(() => { const r = G.run; const nb = neighbors(r.at)[0]; UI.sel = nb; UI.cardMin = false; render(); });
    await shot('node-card');
    await ev(() => { const r = G.run; const dp = regionOf(0).nodes.find(n => n.dp); r.at = dp.id; arrive(dp.id); Map2.center(); openPlace(dp.id); UI.modal = { k: 'bq' }; render(); });
    await shot('bequan');
    await act('bqGo'); await shot('bequan-done');
    await ev(() => { cfgSet('theme', 'dark'); Art.clear(); G.run.scene = null; render(); }); await p.waitForTimeout(300); await shot('dark-map');
    await ev(() => { cfgSet('theme', 'light'); Art.clear(); die('combat', { n: 'Bạch Hạc Linh', k: 'lang', i: '🐺', el: 'moc' }); render(); }); await shot('over');
    await act('overNext'); await p.waitForTimeout(6500); await shot('narr');
    await act('screen', 'meta'); await shot('ben');
  }
  console.log(errs.length ? errs.join('\n') : 'no errors');
  await b.close();
})();
