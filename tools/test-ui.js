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
let contentTestURL;
const http = require('node:http'), fs = require('node:fs');
const ok = (c, m) => { if (!c) fails++; console.log('   ' + (c ? '✓ ' : '✗ ') + m); };

// mở game, sinh nhân vật, vào bản đồ. Trả về trang đã sẵn sàng.
async function boot(b, w = 400, h = 800) {
  const p = await b.newPage({ viewport: { width: w, height: h } });
  p.errs = []; p.on('pageerror', e => p.errs.push(e.message)); p.on('console', m => { if (m.type() === 'error') p.errs.push(m.text().slice(0, 200)); });
  await p.route(/^https:\/\/fonts\.(googleapis|gstatic)\.com\//,r=>r.fulfill({status:200,contentType:'text/css',body:''}));
  await p.route('**/favicon.ico',r=>r.fulfill({status:204,body:''}));
  await p.goto(contentTestURL + '?debug=1');
  await p.waitForTimeout(300);
  await (await p.waitForSelector('[data-act="birth"]')).click();
  await (await p.waitForSelector('[data-act="lifeGo"]', { timeout: 30000 })).click();
  await p.waitForTimeout(1200);
  // chờ hết hiệu ứng chuyển màn (mực loang) và đã vào bản đồ; bấm lại nếu cú bấm đầu rơi vào lúc chưa sẵn sàng
  for (let i = 0; i < 25 && await p.evaluate(() => G.screen !== 'map' || UI.inkBusy); i++) { const b = await p.$('[data-act="lifeGo"]'); if (b) await b.click().catch(() => {}); await p.waitForTimeout(400); }
  await p.evaluate(() => { G.run.scene = null; G.run.gbXong = 1; }); // Đ10: Người Gác Bến không tự hiện giữa bài khác (bài dai_mong kiểm riêng)
  return p;
}
const ev = (p, f, a) => p.evaluate(f, a);
const shot = async (p, name) => { if (SHOT) await p.screenshot({ path: path.join(SHOT, name + '.png') }); };

const TESTS = {
  async content(p) {
    await ev(p, () => {
      const r=G.run;r.pham=0;r.realm=1;r.st=10000;r.evCount={};r.evRecent=[];r.contentLast={};
      const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');
      r.at=n.id;r.region=n.r;arrive(n.id);openPlace(n.id);W().t+=((9-tHour(W().t)+24)%24);render();
    });
    await p.locator('[data-act="pact"][data-arg="tea"]').click();
    await p.locator('[data-act="vopt"][data-arg="content-story"]').click();
    await p.locator('[data-act="vgo"][data-arg="tea:content-story"]').click();
    await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.scene.type==='event'&&G.run.scene.id==='tra_lau'), 'vào trà lâu rồi mới mở đúng truyện của quán');
    ok((await p.locator('.story').innerText()).length>20, 'lời kể mới hiển thị trên giao diện');
    const item = await ev(p, () => {const r=G.run;r.scene=null;r.pham=1;r.realm=0;r.relics=[];const x=catRelic(CAT.relics.find(x=>slotOf(x)==='phapbao'));r.relics.push(x);ACT.bagOpen();render();const it=bagItems().find(i=>i.ref.t==='rel'&&r.relics[i.ref.i]===x);UI.modal={k:'item',key:it.key};render();return {req:relReq(x),label:relicWhy(x)};});
    ok(item.req>=2&&/Trúc Cơ/.test(item.label), 'pháp bảo ghi đúng yêu cầu Trúc Cơ');
    ok(await ev(p, () => [...document.querySelectorAll('.imod button')].filter(b=>/mặc vào/i.test(b.innerText)).every(b=>b.disabled)), 'phàm nhân không mặc được pháp bảo');
    await ev(p, () => {UI.modal=null;UI.panel=null;const r=G.run;r.realm=3;r.pham=0;r.mp=S().maxMp;r.st=1e6;const n=nodeById(r.at);n.type='ma';r.place={n:n.name,t:'ma'};r.scene=null;startEvent('ch_vet_khau_duoi_lop_da_3');render();});
    await p.locator('[data-act="choose"][data-arg="0"]').click();
    ok(await ev(p, () => G.run.scene.type==='combat'), 'lựa chọn giao đấu mở màn chiến đấu thật');
    await ev(p, () => {G.run.scene.over='win';combatContinue();render();});
    ok(await ev(p, () => skChains().vet_khau_duoi_lop_da.results['3']===true), 'kết quả thắng lưu vào lịch sử chuỗi');
    ok(p.errs.length===0, 'không có lỗi JavaScript trong luồng nội dung');
  },

  // túi trữ vật khoá khi hết linh lực; mũi tên tăng/giảm; tên riêng có chú thích
  async dot32(p) {
    const b = p; // trang đã mở sẵn
    const r = await ev(b, () => {const r=G.run;r.pham=0;r.relics=[];r.pills=[];eqOf().tuivat={k:'tui',name:'Túi thử',tier:0,fx:{},slots:0};
      for(let i=0;i<14;i++)r.relics.push(genRelic(0));r.mp=0;ACT.bagOpen();render();return 1;});
    await b.waitForTimeout(500);
    ok(await ev(b, () => document.querySelectorAll('.bc.tlk').length) === 4, 'túi khoá: 4 món trong ô túi mờ đi, có ổ khoá');
    ok(await ev(b, () => [...document.querySelectorAll('.hint')].some(x => /Túi trữ vật đang khoá/.test(x.innerText))), 'túi khoá: có dòng nhắc');
    const tk = await ev(b, () => [document.querySelectorAll('.bc.tkh').length, tuiSlots(), document.querySelector('.bcap').innerText]);
    ok(tk[0] === tk[1] - 4 && /ô túi đang khoá/.test(tk[2]), 'túi khoá: ô trống của túi cũng hiện dấu khoá, dòng đếm ô báo túi đang khoá (' + tk[0] + '/' + tk[1] + ')');
    await ev(b, () => {G.run.mp=10;render();});await b.waitForTimeout(200);
    ok(await ev(b, () => document.querySelectorAll('.bc.tkh').length === 0 && !/đang khoá/.test(document.querySelector('.bcap').innerText)), 'có linh lực: hết khoá');
    // xe chuyến cho phàm nhân: giá bằng xu
    const xe = await ev(b, () => {const r=G.run;r.pham=1;r.realm=0;r.bac=500;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin'&&regionOf(idReg(n.id)).nodes.filter(x=>x.id!==n.id&&isTownT(x.type)).length);
      r.at=n.id;r.region=idReg(n.id);for(const x of regionOf(r.region).nodes)if(isTownT(x.type))x.fog=3;r.scene=null;UI.panel=null;UI.modal={k:'tram'};render();return 1;});
    await b.waitForTimeout(300);
    ok(await ev(b, () => {const rows=[...document.querySelectorAll('.tram [data-act="stage"]')];return rows.length>0&&rows.every(x=>/🪙/.test(x.innerText)&&!x.disabled);}), 'trạm dịch (phàm nhân): xe chuyến ghi giá bằng xu, đủ xu thì bấm được');
    await ev(b, () => {UI.modal=null;render();});
    const h = await ev(b, () => emoTxt('+130% lịch luyện') + '|' + emoTxt('−20% tu vi'));
    ok(/chev gain c3/.test(h) && /chev gain c1 dn/.test(h) && !/130%<\//.test(h), 'mũi tên: +130% ra 3 mũi xanh, −20% ra 1 mũi đỏ');
    // vật phẩm chưa đủ cảnh giới: nút Mặc vào khoá, món vừa sức thì dùng được
    const bt = await ev(b, () => {const r=G.run;r.relics=[];const x=genRelic(2);x.k='kiem';x.req=3;const y=genRelic(0);y.k='kiem';y.req=0;r.relics.push(x,y);ACT.bagOpen();render();
      const f=q=>{const it=bagItems().find(i=>i.ref.t==='rel'&&r.relics[i.ref.i]===q);UI.modal={k:'item',key:it.key};render();return [...document.querySelectorAll('.imod button')].find(z=>/mặc vào/i.test(z.innerText)).disabled;};
      return [f(x),f(y)];});
    ok(bt[0] === true && bt[1] === false, 'món chưa đủ cảnh giới: nút Mặc vào khoá; món vừa sức: dùng được');
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
    // thẻ chuẩn bị trận: đối thủ là người có dòng "Tâm trí" cạnh "Tiềm chất"
    await ev(p, () => { openPlace(G.run.at); startCombat({ k: 'human' }, { kind: 'node' }); render(); });
    await p.waitForTimeout(300);
    ok(await ev(p, () => [...document.querySelectorAll('.pp-u.foe .u-av')].some(x => /Tâm trí: /.test(x.getAttribute('data-tip') || ''))), 'đối thủ là người: thẻ có dòng "Tâm trí"');
    await ev(p, () => { G.run.scene = null; openPlace(G.run.at); startCombat({ cnt: 1 }, { kind: 'node' }); render(); });
    await p.waitForTimeout(400); await (await p.waitForSelector('.btn.pri')).click();
    let txt = ''; for (let i = 0; i < 25 && !txt; i++) { await p.waitForTimeout(150); txt = await ev(p, () => (document.querySelector('.fx-banner') || {}).textContent || ''); }
    ok(!!txt, 'chữ báo đầu trận: "' + txt + '"'); await shot(p, 'combat');
  },
  // tĩnh toạ: thẻ riêng trong hộp bế quan, bấm thì hồi máu và thời gian trôi
  async tinhtoa(p) {
    await ev(p, () => { G.run.hp = 1; G.run.bac = 5000; /* Sửa-B: bỏ cơm nhà, tĩnh toạ dài ngày phải có tiền ăn */ openPlace(G.run.at); UI.modal = { k: 'bq', tab: 'tt' }; render(); });
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
    await ev(p, () => { Map2.locate(); CFG.confirmDanger = false; const n = regionOf(G.run.region).nodes.find(x => x.id !== G.run.at && x.type === 'tran' && x.fog !== undefined && findPath(G.run.at, x.id)) || regionOf(G.run.region).nodes.find(x => x.id !== G.run.at && findPath(G.run.at, x.id)); window.__tnId = n.id; n.fog = 2; geo().nodeAt = null; const q = nodeById(n.id); Map2.focus(q.x, q.y); mapHold(q, nodeHex(q), [q.x, q.y]); });
    await p.waitForTimeout(700);
    const r = await ev(p, () => { const e = document.querySelector('#dock .np'); if (!e) return null; const b = e.getBoundingClientRect(); return { vis: getComputedStyle(e).visibility, l: b.left, t: b.top, r: b.right, b: b.bottom, go: (e.querySelector('.np-k:last-of-type') || {}).textContent, dg: !!e.querySelector('.np-dg'), W: innerWidth, H: innerHeight, txt: e.innerText }; });
    ok(!!r && r.vis === 'visible', 'thẻ địa điểm nổi hiện ra');
    ok(r && r.l >= 0 && r.t >= 0 && r.r <= r.W && r.b <= r.H, 'thẻ nằm trong màn hình');
    ok(r && /Đường đi/.test(r.go || ''), 'giữ chuột: thẻ có thời gian đường đi: ' + (r && r.go));
    ok(r && r.dg && !/Linh khí|dặm|Quy mô/.test(r.txt), 'có cụm an toàn/nguy hiểm, bỏ linh khí, dặm, quy mô');
    // thả tay: đánh dấu tuyến; chạm lại đúng chỗ: lên đường
    const mk = await ev(p, () => { const q = nodeById(window.__tnId); G.run.scene = null; G.run.moving = null; UI.mark = null; mapHoldEnd(); const c = nodeHex(q); mapTap(q, c, [q.x, q.y], 0.6); const a = !!UI.mark; UI.anOk = 1; mapTap(q, c, [q.x, q.y], 0.6); return [a, !!G.run.moving, !UI.mark, !!G.run.scene, UI.modal && UI.modal.k, G.run.pham, q.fog, q.id, G.run.at, !!findPath(G.run.at,q.id)]; });
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
  // Đ1.3: bảng nhân vật hiện Hành đạo / Thiện duyên / Nghiệp chướng bằng chữ, không có chữ số
  async hanhdao(p) {
    await ev(p, () => {deed('cuu_nguoi');deed('giet_vo_toi');UI.modal=null;UI.panel='char';UI.tab.char='base';render();});
    await p.waitForTimeout(150);
    const rows = await ev(p, () => [...document.querySelectorAll('.kr')].map(e=>[e.querySelector('span').innerText.trim(),e.querySelector('b').innerText.trim()]));
    for (const n of ['Hành đạo','Thiện duyên','Nghiệp chướng']) {
      const r = rows.find(x=>x[0].includes(n));
      ok(!!r && r[1].length>2 && !/\d/.test(r[1]), n+': '+(r?r[1]:'không thấy'));
    }
    ok(!rows.some(x=>x[0].includes('Nhân quả')), 'không còn dòng Nhân quả');
    ok(p.errs.length===0, 'không lỗi JavaScript');
  },
  // Đ1.7 + Đ1.4: thẻ Nghiệp duyên trong sổ tay; danh tiếng ở thẻ địa điểm
  async nghiepduyen(p) {
    await ev(p, () => {deed('cuu_nguoi');UI.modal=null;UI.panel='journal';UI.tab.journal='nq';render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.nq-so')||{}).innerText||'');
    ok(/Cứu người/.test(t) && /thiện duyên/.test(t), 'sổ nghiệp duyên liệt kê việc: '+t.slice(0,60));
    await ev(p, () => {UI.panel=null;const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;G.run.region=n.r;arrive(n.id);openPlace(n.id);render();});
    await p.waitForTimeout(150);
    const k = await ev(p, () => (document.querySelector('.pl-kv')||{}).innerText||'');
    ok(/danh tiếng nơi này/i.test(k), 'thẻ địa điểm có danh tiếng: '+k.replace(/\s+/g,' ').slice(0,80));
    ok(p.errs.length===0, 'không lỗi JavaScript');
  },
  // Đ2.3: vô linh căn — không có nút bế quan, bảng nhân vật báo chưa thể tu luyện
  async vo_hud(p) {
    await ev(p, () => {G.run.root={id:'vo',els:[]};G.run.rootKnown=1;UI.modal=null;UI.panel=null;render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => { const q = document.querySelector('.mbl [data-act="hudBq"]'); return !!q && q.disabled; }), 'nút bế quan hiện nhưng mờ (không bấm được)');
    await ev(p, () => {UI.panel='char';UI.tab.char='base';render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => /Vô linh căn — chưa thể tu luyện/.test(document.body.innerText)), 'bảng nhân vật: chưa thể tu luyện');
  },
  // Đ2.4: chưa trắc linh thì bảng nhân vật không lộ linh căn
  async traclinh(p) {
    await ev(p, () => {G.run.rootKnown=0;UI.modal=null;UI.panel='char';UI.tab.char='base';render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => document.body.innerText);
    ok(/Chưa trắc/.test(t) && /Chưa biết mình có tiên duyên/.test(t), 'hiện Chưa trắc');
    const nm = await ev(p, () => rootView(G.run.root).n);
    ok(!t.includes(nm), 'không lộ tên linh căn');
  },
  // Đ2.5: đầu thai ngẫu nhiên, còn lượt chọn thì hiện màn chọn lá số
  async dau_thai(p) {
    await ev(p, () => {G.meta.pick=0;ACT.birth();render();});
    ok(await ev(p, () => G.screen!=='birth' && !!G.run), 'không có lượt chọn: vào thẳng kiếp mới ('+await ev(p, () => G.screen)+')');
    await ev(p, () => {G.run=null;G.meta.pick=1;G.meta.nlife=Math.max(1,G.meta.nlife);ACT.birth();render();});
    await p.waitForTimeout(200);
    ok(await ev(p, () => G.screen==='birth' && G.meta.pick===0), 'có lượt chọn: hiện màn chọn, trừ lượt');
    for (let i = 0; i < 20 && !(await p.$('.birth')); i++) { await ev(p, () => render()); await p.waitForTimeout(200); }
    const bt = await ev(p, () => (document.querySelector('.birth')||{}).innerText||('NO .birth '+G.screen+' '+!!G.run));
    ok(/Chưa trắc/.test(bt), 'thẻ ghi linh căn Chưa trắc: '+bt.slice(0,120).replace(/\s+/g,' '));
  },
  // Đ2.6: bản lưu có Ký ức công pháp được hoàn điểm khi tải
  async quen_sach(p) {
    const r = await ev(p, () => {const d=JSON.parse(JSON.stringify({meta:G.meta,run:G.run,screen:'map'}));d.meta.upg.ky=2;const p0=d.meta.pts||0;loadData(d);return {ky:G.meta.upg.ky,dp:G.meta.pts-p0};});
    ok(r.ky == null && r.dp === 36, 'tải bản lưu: bỏ ky, hoàn 36 điểm ('+JSON.stringify(r)+')');
  },
  // Đ2.7: tooltip thể chất / khí vận có dòng Theo năm tháng, không có chữ số
  async tuebien(p) {
    await ev(p, () => {G.run.the=['hoa_linh_the'];G.run.kv=['than_the_khoe_manh'];UI.modal=null;UI.panel='char';UI.tab.char='base';render();});
    await p.waitForTimeout(200);
    const L = await ev(p, () => [...document.querySelectorAll('[data-tiph]')].map(e=>e.getAttribute('data-tiph')).filter(h=>/Theo năm tháng/.test(h)).map(h=>{const d=document.createElement('div');d.innerHTML=h;const t=d.querySelector('.tue');return t?t.innerText:'';}));
    ok(L.length >= 2, 'tooltip có dòng Theo năm tháng ('+L.length+')');
    ok(L.every(t => t && !/\d/.test(t)), 'dòng tuế biến không có chữ số: '+L.join(' | ').slice(0,120));
  },
  // Đ3.1: hầu bao trên HUD có linh thạch và bạc
  async tien_hud(p) {
    await ev(p, () => {G.run.bac=3200;G.run.st=1;UI.modal=null;UI.panel=null;render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => [...document.querySelectorAll('.hs-bac')].map(e=>e.innerText).join('|'));
    ok(/3,2 lượng/.test(t), 'HUD hiện tiền phàm (Sửa-A: lượng bạc thay quan): '+t);
  },
  // Đ3.2: khách điếm ghi giá bằng bạc
  async tien_quan(p) {
    await ev(p, () => {const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'||n.type==='thanh');G.run.at=n.id;G.run.bac=500;UI.modal=null;UI.panel=null;openPlace(n.id);G.run.scene.venue='inn';render();});
    await p.waitForTimeout(200);
    const t = await ev(p, () => (document.querySelector('.venue')||{}).innerText||'');
    ok(/12 xu/.test(t) && /6 xu/.test(t), 'khách điếm: phòng 12 xu, giường 6 xu (Sửa-A)');
    await ev(p, () => {G.run.scene=null;render();});
  },
  // Sửa-A: tiền trang bỏ; thành có đổi linh thạch và hiệu cầm đồ (nhóm Mua bán)
  async tien_trang(p) {
    await ev(p, () => {const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.st=500;UI.modal=null;UI.panel=null;openPlace(n.id);render();});
    await p.waitForTimeout(200);
    const pl = await ev(p, () => (document.querySelector('.place')||document.body).innerText);
    ok(!/Tiền trang/.test(pl) && /Đổi linh thạch/.test(pl) && /Hiệu cầm đồ/.test(pl), 'thẻ thành: không còn Tiền trang, có Đổi linh thạch + Hiệu cầm đồ');
    await ev(p, () => {G.run.scene.venue='doilt';render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.venue')||{}).innerText||'');
    ok(/Hạ phẩm/.test(t) && /Trung phẩm/.test(t) && /nhu cầu/i.test(t), 'danh sách đổi phẩm có nhu cầu: '+t.slice(90,260).replace(/\s+/g,' '));
    await ev(p, () => {G.run.scene=null;render();});
  },
  // Sửa-B: nút Người cho vay / Nhà ở ở thẻ thành, tiền âm trên HUD, chọn vay trong hộp nơi chọn việc
  async no_nha(p) {
    await ev(p, () => {FEAT.no=1;FEAT.nha=1;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.bac=0;G.run.vay=null;G.run.noTra=null;UI.modal=null;UI.panel=null;openPlace(n.id);render();});
    await p.waitForTimeout(200);
    const pl = await ev(p, () => (document.querySelector('.place')||document.body).innerText);
    ok(/Người cho vay/.test(pl) && /Nhà ở/.test(pl), 'thẻ thành có Người cho vay và Nhà ở');
    await ev(p, () => {G.run.scene.venue='vay';render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.venue')||{}).innerText||'');
    ok(/Vay 1 lượng bạc/.test(t) && /trả trọn 1 lượng bạc 180 xu/.test(t) && await ev(p, () => /Lãi trọn gói 180 xu/.test(venueOpts(nodeById(G.run.at),'vay')[0].d)), 'danh sách vay: '+t.slice(0,160).replace(/\s+/g,' '));
    await ev(p, () => {G.run.scene=null;G.run.bac=-50;G.run.noTra={t0:W().t,han:W().t+20*HD,lan:0,bao:0};render();});
    await p.waitForTimeout(150);
    const h = await ev(p, () => [...document.querySelectorAll('.hs-bac')].map(e=>e.innerText+(e.classList.contains('no')?'!':'')).join('|'));
    ok(/-50 xu!/.test(h), 'HUD hiện tiền âm, tô đỏ: '+h);
    ok(await ev(p, () => /Nợ: 50 xu · hạn còn 20 ngày/.test(noTip(G.run)) && /Nhà:/.test(noTip(G.run))), 'chú thích hầu bao có nợ, hạn, nhà ở');
    await ev(p, () => {G.run.bac=0;G.run.noTra=null;G.run.scene=null;render();});
  },
  // Đ3.5: hộp thoại Thưởng Các
  async thuongcac(p) {
    await ev(p, () => {const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.thuongLenh=7;UI.panel=null;openPlace(n.id);ACT.pact('thuongcac');render();});
    await p.waitForTimeout(200);
    const t = await ev(p, () => (document.querySelector('.tcac')||{}).innerText||'');
    ok(/Thưởng Các/.test(t) && /7/.test(t) && /Hồi Xuân Đan/.test(t) && /Vô danh/.test(t), 'hộp thoại Thưởng Các: '+t.slice(0,80).replace(/\s+/g,' '));
    await ev(p, () => {ACT.tcBuy(THUONG_CAC.findIndex(x=>x.id==='hoixuan'));render();});
    ok(await ev(p, () => G.run.thuongLenh===5), 'đổi Hồi Xuân Đan trừ hai thẻ');
    await ev(p, () => {UI.modal=null;G.run.scene=null;render();});
  },
  // Đ3.6: HUD báo đói, chạm đổi mức ăn
  // Việc 3: hộp thư lời công trình
  // Việc 9: xem tận mắt các màn mới (chụp ảnh khi có --shot): chú giải, thẻ thành tu sĩ, nắm quyền, hộp thư, báo đói giữa đường
  async man_moi(p) {
    await ev(p, () => {UI.modal=null;UI.panel='more';UI.tab.more='legend';render();});await p.waitForTimeout(200);
    ok(await ev(p, () => /trấn tu sĩ|thành tu sĩ/i.test(document.querySelector('#panel').innerText)), 'chú giải có thành trấn tu sĩ');await shot(p,'1-chu-giai');
    await ev(p, () => {const r=G.run;r.pham=0;r.realm=1;const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tuthanh'&&n.state!=='ruin');r.at=n.id;r.region=n.r;arrive(n.id);UI.panel=null;r.scene=null;UI.sel=n.id;render();});await p.waitForTimeout(250);
    await shot(p,'2-the-thanh-tu');
    await ev(p, () => {openPlace(G.run.at);G.run.scene.venue='quyen';render();});await p.waitForTimeout(200);
    ok(await ev(p, () => /Đánh chiếm|Mua lại/.test(document.body.innerText)), 'màn Nắm quyền hiện cách đánh chiếm, mua lại');await shot(p,'3-nam-quyen');
    await ev(p, () => {const r=G.run;r.scene=null;r.hopThu=[{m:1,L:[{node:r.at,noi:'Thử Trấn',ct:'khach_diem',bac:320,lt:2,an:['com_nam'],pill:[],vat:{},tin:[]}]}];ACT.hopThu();render();});await p.waitForTimeout(200);
    await shot(p,'4-hop-thu');
    await ev(p, () => {const r=G.run;UI.modal=null;r.hopThu=[];r.pham=1;r.qitems=[];r.moving={path:[r.at,neighbors(r.at)[0]],seg:0,prog:0.3};r.doi=49.9;advanceTime(24);render();});await p.waitForTimeout(250);
    ok(await ev(p, () => G.run.scene&&G.run.scene.ev==='an_dung'&&/kiếm cái ăn/.test(document.body.innerText)), 'hộp báo đói giữa đường hiện trên màn');await shot(p,'5-bao-doi');
  },
  async hop_thu(p) {
    await ev(p, () => {const r=G.run;r.hopThu=[{m:1,L:[{node:r.at,noi:'Thử Trấn',ct:'khach_diem',bac:320,lt:0,an:['com_nam'],pill:[],vat:{},tin:[]}]}];UI.modal=null;UI.panel=null;r.scene=null;render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !!document.querySelector('[data-act="hopThu"]')), 'có thư: hiện nút hộp thư trên thanh trên');
    await ev(p, () => {ACT.hopThu();render();});await p.waitForTimeout(150);
    ok(await ev(p, () => {const b=document.querySelector('.mbox.hopthu');return !!b&&/Khách điếm/.test(b.innerText)&&/Thử Trấn/.test(b.innerText)&&!!b.querySelector('[data-act="hopNhan"]');}), 'hộp thư liệt kê công trình, nơi, nút Nhận hết');
    const b0=await ev(p, () => G.run.bac||0);
    await ev(p, () => {document.querySelector('[data-act="hopNhan"]').click();});await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.hopThu.length===0&&!document.querySelector('[data-act="hopThu"]')&&G.run.qitems.includes('com_nam')), 'bấm Nhận hết: nhận tiền, đồ; nút hộp thư ẩn');
    ok(await ev(p, () => G.run.bac||0)===b0+320, 'cộng đúng 320 xu');
  },
  async an_hud(p) {
    await ev(p, () => {G.run.pham=1;G.run.doi=80; // ăn uống bản mới: đói lả từ 70 tới 100
    G.run.anMuc='thuong';UI.modal=null;UI.panel=null;G.run.scene=null;render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => [...document.querySelectorAll('.hs.an')].map(e=>e.innerText).join('|'));
    ok(/Đói lả/.test(t), 'HUD hiện Đói lả: '+t);
    await ev(p, () => {ACT.anMuc();render();});
    ok(await ev(p, () => G.run.anMuc==='kha'), 'chạm đổi mức ăn');
    await ev(p, () => {G.run.doi=0;G.run.anMuc='thuong';render();});
  },
  // Đ3.7: nhóm Mưu sinh và hộp thoại việc làm thuê
  async muusinh(p) {
    await ev(p, () => {const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='thanh'&&n.state!=='ruin');G.run.at=n.id;G.run.lamNgay=null;UI.panel=null;UI.modal=null;openPlace(n.id);render();});
    await p.waitForTimeout(200);
    ok(await ev(p, () => /Mưu sinh/.test((document.querySelector('.place')||document.body).innerText)), 'thẻ thành có nhóm Mưu sinh');
    await ev(p, () => {ACT.pact('muusinh');render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.mmsinh')||{}).innerText||'');
    ok(/Bốc vác/.test(t) && /xu/.test(t), 'hộp thoại việc làm: '+t.slice(0,70).replace(/\s+/g,' '));
    const b0 = await ev(p, () => G.run.bac||0);
    await ev(p, () => {ACT.vtGo('boc_vac');render();});
    ok(await ev(p, () => G.run.bac||0) > b0, 'làm bốc vác: có tiền công ('+b0+' → '+await ev(p, () => G.run.bac)+')');
    await ev(p, () => {UI.modal=null;G.run.scene=null;render();});
  },
  // Đ5.1: nút luyện võ trong nhóm Tu luyện; phàm nhân thấy "Nội lực"; bảng nhân vật có dòng Võ học
  async vodao(p) {
    await ev(p, () => {const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tuthanh'&&n.state!=='ruin');G.run.at=n.id;G.run.pham=1;voOf(G.run).bac=1;UI.panel=null;UI.modal=null;openPlace(n.id);render();});
    await p.waitForTimeout(200);
    ok(await ev(p, () => !!document.querySelector('[data-act="pact"][data-arg="luyenvo"]') && !!document.querySelector('[data-act="pact"][data-arg="loidai"]')), 'thẻ thành tu sĩ có nút Luyện võ, Đấu lôi đài');
    await ev(p, () => {ACT.pact('luyenvo');render();});await p.waitForTimeout(100);
    if (await ev(p, () => UI.modal&&UI.modal.k==='pconf')) { await ev(p, () => {const a=UI.modal.a;UI.modal=null;placeAct(a);render();}); }
    ok(await ev(p, () => G.run.vo.xp>=1), 'luyện võ một buổi');
    await ev(p, () => {G.run.scene=null;UI.panel='char';UI.tab.char='base';render();});await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.panel')||document.body).innerText);
    ok(/Nội lực/.test(t) && /Võ học/.test(t) && /Tam lưu/.test(t), 'bảng nhân vật: Nội lực, Võ học Tam lưu');
    await ev(p, () => {UI.panel=null;G.run.pham=0;render();});
  },
  // Đ5.2: hộp Mưu sinh có việc của nghề hợp mùa; bảng nhân vật có thẻ Đạo đồ
  async nghe(p) {
    await ev(p, () => {G._ngNoEv=1;let k=0;while(seasonOf(W().t)!=='xuan'&&k++<400)W().t+=HD;const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');G.run.at=n.id;G.run.lamNgay=null;G.run.paths={};UI.panel=null;UI.modal=null;openPlace(n.id);ACT.pact('muusinh');render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => (document.querySelector('.mmsinh')||{}).innerText||'');
    ok(/Gieo mạ · Nông dân/.test(t), 'Mưu sinh có việc Gieo mạ của nghề nông');
    await ev(p, () => {ACT.vtGo('ng:nong:gieo');render();});
    ok(await ev(p, () => !!G.run.paths.nong && G.run.paths.nong.xp>0), 'làm việc nghề: có kinh nghiệm');
    await ev(p, () => {G.run.scene=null;UI.modal=null;UI.panel='char';UI.tab.char='dao';render();});await p.waitForTimeout(150);
    const d = await ev(p, () => (document.querySelector('.daodo')||{}).innerText||'');
    ok(/Nông dân/.test(d) && /Làm thuê/.test(d) && !/\d/.test(d), 'thẻ Đạo đồ: '+d.replace(/\s+/g,' ').slice(0,60));
    ok(/Năng lực/.test(d) && /Thương lượng/.test(d) && /Nhẫn nại/.test(d), 'Đạo đồ có năng lực hỗ trợ (bằng chữ)');
    await ev(p, () => {UI.panel=null;render();});
  },
  // Đ6: nút Cơ duyên ở nơi neo, hộp lựa chọn, thẻ Cơ duyên trong Sổ tay (chữ, không số)
  // Đ7.2: nghề tu — hộp Pháp môn, thanh tài nguyên riêng trong trận, Đạo đồ
  async nghe_tu(p) {
    await ev(p, () => {const r=G.run;r.pham=0;r.root={id:'tap',els:['kim','moc'],q:'thuong'};r.rootKnown=1;r.st=999;r.scene=null;UI.modal=null;UI.panel=null;
      const id=tuNode('TU01');r.at=id;openPlace(id);render();});
    await p.waitForTimeout(150);
    ok(/Pháp môn/.test(await ev(p, () => document.body.innerText)), 'nơi thầy dạy có nút Pháp môn');
    await ev(p, () => {ACT.pact('tumon');render();});await p.waitForTimeout(100);
    ok(/Dư Phong Kiếm Lục/.test(await ev(p, () => (document.querySelector('.venue')||{}).innerText||'')), 'hộp Pháp môn có Dư Phong Kiếm Lục');
    await ev(p, () => {if(typeof lkTang==='function'){window._lk=lkTang;lkTang=()=>1;}ACT.vgo('tumon:hoc:TU01');if(window._lk)lkTang=window._lk;G.run.scene=null;UI.panel='char';UI.tab.char='dao';render();});await p.waitForTimeout(150);
    ok(/Kiếm tu/.test(await ev(p, () => document.body.innerText)), 'Đạo đồ có nghề Kiếm tu');
    await ev(p, () => {UI.panel=null;UI.modal=null;G.run.tuRes={TU01:3};openPlace(G.run.at);startCombat({cnt:1},{kind:'node'});CFG.autoFight=0;render();});
    await p.waitForTimeout(400); await p.click('[data-act="cbGo"]'); await p.waitForSelector('.cb-ally', { timeout: 8000 }).catch(() => {});
    ok(await ev(p, () => !!document.querySelector('.tures')) && /Kiếm ý/.test(await ev(p, () => (document.querySelector('.tures')||{}).innerText||'')), 'trong trận có thanh Kiếm ý');
    await ev(p, () => {G.run.scene=null;UI.modal=null;render();});
  },
  // Đ11: nghề tu mở rộng — Phật tu ở Lạn Kha Tự, bí truyền Luân Hồi Chuyển Thế Kinh, thanh Nguyện lực
  async nghe_tu_mr(p) {
    await ev(p, () => {const r=G.run;r.pham=0;r.root={id:'tap',els:['kim','moc'],q:'thuong'};r.rootKnown=1;r.st=999;r.scene=null;UI.modal=null;UI.panel=null;r.tu={chinh:null,phu:null,k:{}};
      r.arts=(r.arts||[]).filter(a=>!a.tu);const id=mrLocNode('LOC12');r.at=id;openPlace(id);ACT.pact('tumon');render();});
    await p.waitForTimeout(150);
    ok(/Bát Nhã Tâm Kinh/.test(await ev(p, () => (document.querySelector('.venue')||{}).innerText||'')), 'hộp Pháp môn ở Lạn Kha Tự có Bát Nhã Tâm Kinh');
    await ev(p, () => {window._lk=lkTang;lkTang=()=>1;ACT.vgo('tumon:hoc:TU19');lkTang=window._lk;G.run.tu.k.TU19.tang=4;tuArtOf('TU19').lv=7;openPlace(G.run.at);ACT.pact('tumon');render();});
    await p.waitForTimeout(150);
    ok(/Luân Hồi Chuyển Thế Kinh/.test(await ev(p, () => (document.querySelector('.venue')||{}).innerText||'')), 'Phật tu tầng bốn: thấy bí truyền Luân Hồi Chuyển Thế Kinh');
    await ev(p, () => {G.run.scene=null;UI.modal=null;UI.panel='char';UI.tab.char='dao';render();});await p.waitForTimeout(150);
    ok(/Phật tu/.test(await ev(p, () => document.body.innerText)), 'Đạo đồ có nghề Phật tu');
    await ev(p, () => {UI.panel=null;UI.modal=null;G.run.tuRes={TU19:2};openPlace(G.run.at);startCombat({cnt:1},{kind:'node'});CFG.autoFight=0;render();});
    await p.waitForTimeout(400); await p.click('[data-act="cbGo"]'); await p.waitForSelector('.cb-ally', { timeout: 8000 }).catch(() => {});
    ok(/Nguyện lực/.test(await ev(p, () => (document.querySelector('.tures')||{}).innerText||'')), 'trong trận có thanh Nguyện lực');
    await ev(p, () => {G.run.scene=null;UI.modal=null;render();});
  },
  async cai_can(p) {
    await ev(p, () => {const r=G.run;r.pham=1;r.root={id:'vo',els:[],q:null};r.rootKnown=1;r.bac=50000;r.scene=null;UI.modal=null;UI.panel=null;
      const id=ccSrc('CC01').node;r.at=id;openPlace(id);render();});
    await p.waitForTimeout(150);
    const t = await ev(p, () => document.body.innerText);
    ok(/Cơ duyên/.test(t), 'thẻ địa điểm có nút Cơ duyên');
    await ev(p, () => {ACT.pact('coduyen');render();});await p.waitForTimeout(100);
    ok(/Hỏi chuyện lạ/.test(await ev(p, () => (document.querySelector('.venue')||{}).innerText||'')), 'hộp Cơ duyên: hỏi chuyện lạ');
    await ev(p, () => {ACT.vgo('coduyen:hoi');render();});await p.waitForTimeout(100);
    ok(await ev(p, () => !!G.run.ccHeard.CC01), 'hỏi xong: nghe dấu vết Tái Mạch Đan');
    await ev(p, () => {ccStart('CC01');G.run.scene=null;UI.modal=null;UI.panel='journal';UI.tab.journal='cc';render();});await p.waitForTimeout(150);
    const d = await ev(p, () => (document.querySelector('.cc-so')||{}).innerText||'');
    ok(/Tái Mạch Đan/.test(d) && /Kiểm chứng/.test(d) && !/\d/.test(d), 'Sổ tay thẻ Cơ duyên: '+d.replace(/\s+/g,' ').slice(0,70));
    await ev(p, () => {UI.panel=null;G.run.cc=null;render();});
  },
  // Sửa-I câu 39 + Sửa-J 42b: hộp thoại U Minh Ám Hội — món, danh sách vật muốn nhận, đếm ngược, trả giá, thương lượng, bỏ cuộc
  // Sửa-L câu 49: túi đầy → mục "Tạm giữ bên người" trong túi đồ, hạn bằng chữ, cất vào khi có chỗ
  async tam_giu(p) {
    await ev(p, () => {const r=G.run;r.scene=null;UI.modal=null;r.tamGiu=[{t:'qi',v:'luong_kho',n:'Lương khô thử',at:W().t}];
      UI.panel='char';UI.tab.char='bag';render();});
    await p.waitForTimeout(200);
    const t = await ev(p, () => (document.querySelector('#panel .tam-giu')||{}).innerText||'');
    ok(/Tạm giữ bên người/.test(t) && /Lương khô thử/.test(t) && /còn chừng \d+ tháng/.test(t) && /Cất vào túi/i.test(t), 'túi đồ hiện mục tạm giữ, hạn bằng chữ: '+t.replace(/\s+/g,' ').slice(-90));
    await ev(p, () => {const r=G.run;while(bagCap()-bagStacks()<=0&&r.qitems.length)r.qitems.pop();render();});await p.waitForTimeout(120);
    await ev(p, () => {const b=document.querySelector('#panel .tam-giu [data-act="tgCat"]');if(b)b.click();});await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.tamGiu.length===0&&G.run.qitems.includes('luong_kho')&&!document.querySelector('#panel .tam-giu')), 'bấm cất: món vào túi, mục tạm giữ ẩn đi');
    await ev(p, () => {UI.panel=null;render();});
    ok(p.errs.length===0, 'không lỗi JavaScript ' + p.errs.join(' '));
  },
  async am_hoi(p) {
    await ev(p, () => {const r=G.run;r.pham=0;r.realm=Math.max(1,r.realm||0);r.lt=[0,0,50];r.st=20000;r.scene=null;UI.modal=null;UI.panel=null;AM_LECH=0;
      const n=W().regions.flatMap(R=>R.nodes).find(n=>n.type==='tuthanh'&&n.state!=='ruin');r.at=n.id;W().t=Math.floor(W().t/HD)*HD+HD+23;openPlace(n.id);
      if(W().amhoi)delete W().amhoi[n.id];r.scene.venue='amhoi';venueDo('amhoi','vao');render();});
    await p.waitForTimeout(150);
    let t = await ev(p, () => (document.querySelector('.amhoi')||{}).innerText||'');
    ok(/U Minh Ám Hội/.test(t) && /Lượt \d+\/\d+/.test(t) && /Giá trị/.test(t), 'hộp Ám Hội: lượt, món, giá trị theo nhu cầu');
    ok(/muốn nhận/.test(t) && /Trả \d+ /.test(t), 'hiện danh sách vật người bán muốn nhận + nút trả');
    ok(/Gõ búa sau (9|10) giây/.test(t), 'đếm ngược hiện trên hộp thoại');
    const ban = await ev(p, () => (document.querySelector('.amhoi .am-ban')||{}).innerText||'');
    ok(/Quanh bàn/.test(ban) && /Khách đeo/.test(ban) && (/tu vi bị che/.test(ban) || /\(là /.test(ban)), 'người ngồi bàn hóa trang, che tu vi: '+ban.slice(0,90));
    await shot(p, 'am_hoi');
    await p.waitForTimeout(1300);
    t = await ev(p, () => (document.querySelector('.amhoi .am-dem')||{}).innerText||'');
    ok(/Gõ búa sau [5-9] giây/.test(t), 'đồng hồ chạy theo thời gian thật ('+t+')');
    ok(/thương lượng/i.test(await ev(p, () => document.querySelector('.amhoi').innerText)), 'có phần thương lượng (chọn vật trong túi)');
    await ev(p, () => {const b=document.querySelector('.amhoi .am-tui [data-arg^="tl="]');if(b)b.click();});await p.waitForTimeout(120);
    t = await ev(p, () => (document.querySelector('.amhoi .am-tl')||{}).innerText||'');
    ok(/định giá/.test(t) && /\+1/.test(t) && /Đưa giá thương lượng/i.test(t), 'chọn vật thương lượng: chỉnh số lượng, người bán định giá');
    ok(/Đồng hồ tạm dừng/.test(await ev(p, () => document.querySelector('.amhoi').innerText)), 'mở Thương lượng: hiện đồng hồ tạm dừng (câu 48)');
    await ev(p, () => {const b=document.querySelector('.amhoi .am-tl [data-arg="tl="]');if(b)b.click();});await p.waitForTimeout(80);
    const tra = await ev(p, () => {const b=document.querySelector('.amhoi .am-muon [data-arg="tra=0"]');if(b&&!b.disabled){b.click();return 1;}return 0;});
    await p.waitForTimeout(120);
    ok(tra && await ev(p, () => G.run.scene.lot.lead&&G.run.scene.lot.lead.who==='me'), 'bấm trả: ngươi đang dẫn');
    t = await ev(p, () => (document.querySelector('.amhoi')||{}).innerText||'');
    ok(/đang dẫn: Ngươi/.test(t), 'hộp hiện người đang dẫn');
    await ev(p, () => {const sc=G.run.scene;amTua(AM_HOI.dem+50);let g=0;while(sc.ph==='lot'&&g++<30){if(sc.q[sc.i].own==='me')amAct('rut');else amAct('bo');}
      G.run.relics.push(Object.assign(genRelic(2),{name:'Thử Ấn Bày'}));render();});
    await p.waitForTimeout(120);
    t = await ev(p, () => (document.querySelector('.amhoi')||{}).innerText||'');
    ok(/Tới lượt ngươi/.test(t) && /Thử Ấn Bày/.test(t), 'tới lượt ngươi: hiện đồ trong túi để đưa ra');
    const btn = await ev(p, () => {const b=[...document.querySelectorAll('.amhoi [data-act="am"]')].find(x=>/Thử Ấn Bày/.test(x.innerText));if(b)b.click();return !!b;});
    await p.waitForTimeout(150);
    t = await ev(p, () => (document.querySelector('.amhoi')||{}).innerText||'');
    ok(btn && /Chọn thứ ngươi muốn nhận/.test(t) && /Thêm vào danh sách/.test(t) && /Thượng phẩm/.test(t), 'bấm món: bước đặt danh sách vật muốn nhận (câu 47)');
    await ev(p, () => {const b=document.querySelector('.amhoi .am-dat-cand [data-arg="dthem=lt:1"]');if(b)b.click();});await p.waitForTimeout(100);
    await ev(p, () => {const b=document.querySelector('.amhoi .am-dat-mon [data-arg="dsl=0,5"]');if(b)b.click();});await p.waitForTimeout(100);
    t = await ev(p, () => (document.querySelector('.amhoi .am-dat')||{}).innerText||'');
    ok(/Ngươi muốn nhận/.test(t) && /\d+ Trung phẩm/.test(t) && await ev(p, () => G.run.scene.dua.muon[0].key==='lt:1'), 'danh sách hiện tên + số lượng, chỉnh được: '+t.replace(/\s+/g,' ').slice(0,80));
    await ev(p, () => {const b=[...document.querySelectorAll('.amhoi [data-act="am"]')].find(x=>/Đưa ra bàn với danh sách/.test(x.innerText));if(b)b.click();});await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.scene&&G.run.scene.q.some(l=>l.own==='me'&&l.muon&&l.muon[0].key==='lt:1')), 'đưa ra bàn: món của ngươi lên bàn với danh sách đã đặt');
    await ev(p, () => {const b=[...document.querySelectorAll('.amhoi [data-act="am"]')].find(x=>/Rời bàn/.test(x.innerText));if(b)b.click();});
    await p.waitForTimeout(120);
    ok(await ev(p, () => !G.run.scene || G.run.scene.type!=='amhoi'), 'rời bàn: đóng hộp thoại');
  },
  // Sửa-J câu 44: Sổ tay thẻ Mệnh thư — lời mời chưa trả lời, mở lại trước hạn
  async menh_thu(p) {
    await ev(p, () => {const r=G.run;r.origin='nong';delete r.arc;r.scene=null;UI.modal=null;tuyenTick();W().t+=HM;tuyenTick();tuyenGap(true);kyPick(kyOpts(r.scene).length-1);r.scene=null;
      UI.panel='journal';UI.tab.journal='ty';render();});
    await p.waitForTimeout(150);
    const d = await ev(p, () => (document.querySelector('.menh-thu')||{}).innerText||'');
    ok(/mở lại lời mời/i.test(d) && /chưa trả lời/.test(d), 'Sổ tay thẻ Mệnh thư: '+d.replace(/\s+/g,' ').slice(0,160));
    await ev(p, () => {const b=document.querySelector('.menh-thu [data-act="tyMoLai"]');if(b)b.click();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !!G.run.scene&&/^tuyen:/.test(G.run.scene.ev||'')&&!UI.panel), 'bấm mở lại: hiện lời mời, đóng Sổ tay');
    await ev(p, () => {G.run.scene=null;delete G.run.arc;render();});
  },
  // Đ9 câu 40: Sổ tay — thẻ Người đã gặp và Thế lực
  async so_tay_nv(p) {
    await ev(p, () => {const r=G.run;r.origin='nong';delete r.arc;delete r.gapVai;r.scene=null;UI.modal=null;tuyenTick();W().t+=HM;tuyenTick();tuyenGap(true);r.scene=null;
      UI.panel='journal';UI.tab.journal='ng';render();});
    await p.waitForTimeout(150);
    const ten = await ev(p, () => vaiNow('NP01').ten);
    const d = await ev(p, () => (document.querySelector('.so-ng')||{}).innerText||'');
    ok(d.includes(ten) && /còn sống/.test(d) && /Xa lạ|Quen biết|Thân thiện/.test(d), 'Sổ tay thẻ Người đã gặp: '+d.replace(/\s+/g,' ').slice(0,120));
    await ev(p, () => {gapNguoi('Vô Danh Khách','noi');render();});await p.waitForTimeout(100);
    const d2 = await ev(p, () => (document.querySelector('.so-ng')||{}).innerText||'');
    ok(/Vô Danh Khách/.test(d2) && /từng trò chuyện/.test(d2), 'Người đã gặp: NPC không giữ vai cũng hiện');
    await ev(p, () => {G.run.faQh={FA04:12};faKetMinh('FA04',true);UI.tab.journal='fa';render();});await p.waitForTimeout(150);
    const f = await ev(p, () => ({n:document.querySelectorAll('.so-fa .so-the-luc').length,t:(document.querySelector('.so-fa')||{}).innerText||''}));
    ok(f.n===10 && /sổ cống hiến/.test(f.t) && /đang vững/.test(f.t) && !/nghiệp/i.test(f.t) && /Thân thiết/.test(f.t) && /Đồng minh/.test(f.t) && /Xa lạ/.test(f.t), 'Sổ tay thẻ Thế lực: đủ mười, có tình trạng và sổ cống hiến');
    await ev(p, () => {UI.panel=null;G.run.scene=null;delete G.run.arc;render();});
  },
  // Đ8: Sổ tay thẻ Sử lược — chuyện thế giới khi vắng mặt, đồng hồ đang diễn ra
  async su_luoc(p) {
    await ev(p, () => {const w=W();w.suLuoc=[{y:1200,t:'Thế kỷ thứ ba: chuyện cũ.',k:'gop'},{y:1250,t:'Lương Kinh thất thủ; triều mới do một phe lập.',k:'clk'}];const s=w.thoiCuc.CLK07;s.pha=2;s.tPha=tYear(w.t);
      G.run.scene=null;UI.modal=null;UI.panel='journal';UI.tab.journal='su';render();});await p.waitForTimeout(150);
    const d = await ev(p, () => (document.querySelector('.su-luoc')||{}).innerText||'');
    ok(/Lương Kinh thất thủ/.test(d) && /Đang diễn ra/.test(d) && /Đại Hội Thiên Kiêu/.test(d) && /thế kỷ/.test(d), 'Sổ tay thẻ Sử lược: '+d.replace(/\s+/g,' ').slice(0,80));
    await ev(p, () => {UI.panel=null;const s=W().thoiCuc.CLK07;s.pha=0;render();});
  },
  // Đ3.8: bảng Giao tình có mục Người nhà
  async gia_dinh(p) {
    await ev(p, () => {G.run.family=[{ten:'Lâm Đại Hữu',qh:'cha',tuoi:48,suc:'khoe',thai:'thuong',song:1,lc:0}];UI.modal=null;G.run.scene=null;UI.panel='bonds';UI.tab.bonds='an';render();});
    await p.waitForTimeout(200);
    const t = await ev(p, () => document.body.innerText);
    ok(/Người nhà/.test(t) && /Lâm Đại Hữu/.test(t) && /48 tuổi/.test(t), 'mục Người nhà có cha');
    await ev(p, () => {UI.panel=null;render();});
  },
  // Đ4: khung tân thủ — hiện, bỏ qua hỏi lại, bấm thẻ dẫn đúng chỗ, ẩn/hiện
  async tanthu(p) {
    await ev(p, () => {G.run.scene=null;UI.modal=null;UI.panel=null;G.run.tut=tutNew(G.run);tutFill();render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !!document.querySelector('.tut .tut-c') && /Biết mình còn gì/.test(document.querySelector('.tut').innerText)), 'khung tân thủ hiện HD01');
    await p.locator('.tut-sk').first().click();await p.waitForTimeout(100);
    const t = await ev(p, () => (document.querySelector('.mbox')||{}).innerText||'');
    ok(/Bỏ qua nhiệm vụ\?/.test(t) && /Bỏ qua «Biết mình còn gì» thì sẽ không nhận lại phần thưởng/.test(t), 'hộp xác nhận đúng chữ');
    await p.locator('.mbox [data-act="modalX"]').click();await p.waitForTimeout(100);
    ok(await ev(p, () => !G.run.tut.skip.HD01 && !UI.modal), 'Giữ lại: chưa bỏ');
    await p.locator('.tut-go').first().click();await p.waitForTimeout(150);
    ok(await ev(p, () => UI.panel==='char' && !!G.run.tut.ready.HD01), 'bấm HD01 mở bảng nhân vật và xong việc');
    await ev(p, () => {UI.panel=null;render();});await p.waitForTimeout(100);
    await p.locator('.tut [data-act="tutClaim"]').click();await p.waitForTimeout(100);
    ok(await ev(p, () => !!G.run.tut.done.HD01 && G.run.tut.open[0]==='HD02'), 'nhận thưởng HD01, mở HD02');
    ok(await ev(p, () => !UI.modal && /Nhận thưởng: Lương khô/.test(document.body.innerText)), 'nhận thưởng: không mở hộp, chỉ hiện thông báo phần thưởng');
    ok(await ev(p, () => !/Tân thủ \(/.test(document.body.innerText) && !!document.querySelector('.tut-tg .ic')), 'không còn nút chữ "Tân thủ", thay bằng nút biểu tượng');
    await ev(p, () => {UI.modal=null;render();});
    await p.locator('.tut-tg').click();await p.waitForTimeout(100);
    ok(await ev(p, () => !document.querySelector('.tut-c') && !!document.querySelector('.tut-tg')), 'nút ẩn làm khung biến mất, nút còn');
    await p.locator('.tut-tg').click();await p.waitForTimeout(100);
    ok(await ev(p, () => !!document.querySelector('.tut-c')), 'bấm lại hiện khung');
    // dẫn tới nơi có nút: HD04 tìm việc
    await ev(p, () => {const T=G.run.tut;T.open=['HD04'];W().regions.flatMap(R=>R.nodes).forEach(n=>{if(n.type==='thanh')n.fog=Math.max(n.fog,1);});render();});
    await p.locator('.tut-go').first().click();await p.waitForTimeout(150);
    ok(await ev(p, () => UI.sel!=null && !!UI.tutFlash && /muusinh/.test(UI.tutFlash.sel)), 'HD04 chọn nơi có Mưu sinh và nhấp nháy nút');
    await ev(p, () => {UI.modal={k:'wish'};render();});await p.waitForTimeout(100);
    await p.locator('[data-act="wishSet"][data-arg="du_song"]').click();await p.waitForTimeout(100);
    ok(await ev(p, () => G.run.wish==='du_song' && !UI.modal), 'chọn nguyện vọng');
        await ev(p, () => {G.run.tut.hide=1;UI.sel=null;UI.tutFlash=null;render();});
  },
  // Sửa-C.18: trắc ra Thiên linh căn — ẩn mọi thứ, dị tượng toàn màn, sau đó mới hiện kết quả; Sửa-C.11: nút săn bắt ở hoang dã
  async tlfx(p) {
    await ev(p, () => {CFG.anim=true;const r=G.run;r.root={id:'thien',els:['hoa'],q:'thuong'};r.rootKnown=0;r.scene=null;UI.modal=null;tlOpen('tl_thach');render();});
    await p.locator('[data-act="kyPick"][data-arg="0"], .kyngo [data-arg="0"]').first().click();
    await p.waitForTimeout(400);
    await p.waitForTimeout(2200);await shot(p,'tlfx');
    ok(await p.locator('.tlfx.tlfx-thien').count()===1, 'hiện dị tượng Thiên linh căn');
    ok(await ev(p, () => document.documentElement.dataset.tlfx==='thien'&&getComputedStyle(document.getElementById('hud')).visibility==='hidden'&&getComputedStyle(document.getElementById('sheet')).visibility==='hidden'), 'ẩn thanh trên, hộp thoại kỳ ngộ');
    ok(await ev(p, () => getComputedStyle(document.getElementById('dock')).visibility==='hidden'), 'ẩn chân trang');
    ok(/Thiên linh căn/.test(await p.locator('.tlfx').innerText()), 'có lời kể');
    await p.waitForTimeout(11500);
    ok(await p.locator('.tlfx').count()===0&&await ev(p, () => !G.run.tlFx&&!document.documentElement.dataset.tlfx), 'hết hiệu ứng thì đóng');
    ok(await ev(p, () => getComputedStyle(document.getElementById('hud')).visibility!=='hidden'&&G.run.rootKnown===1), 'hiện lại giao diện và kết quả');
    await ev(p, () => {const r=G.run;r.scene=null;const n=W().regions.flatMap(R=>R.nodes).find(n=>isWild(n)&&n.state!=='ruin');r.at=n.id;r.region=n.r;arrive(n.id);openPlace(n.id);render();});
    ok(await p.locator('[data-act="pact"][data-arg="sanbat"]').count()===1, 'hoang dã có nút săn bắt, hái lượm');
    ok(p.errs.length===0, 'không có lỗi trang: '+p.errs.join(' | '));
  },
  // dị tượng trắc linh theo thứ bậc: Thiên > Địa > Biến dị > Song > Tam > Tứ > Tạp
  async tlfx_bac(p) {
    ok(await ev(p, () => TL_FX.thien.ms>TL_FX.dia.ms&&TL_FX.dia.ms>TL_FXL.bien.ms), 'Thiên > Địa > Biến dị (thời gian)');
    const order=['bien','song','tam','tu','tap'];const info={};
    for(const k of order){
      await ev(p, (k) => {CFG.anim=true;const r=G.run;r.scene=null;UI.modal=null;r.tlFx=null;r.root={id:k,els:k==='bien'?['loi']:k==='song'?['kim','moc']:k==='tam'?['kim','moc','thuy']:k==='tu'?['kim','moc','thuy','hoa']:NGUHANH.slice(),q:'thuong'};r.rootKnown=0;tlResult('dusi');render();}, k);
      await p.waitForTimeout(150);
      info[k]=await ev(p, (k) => {const d=document.querySelector('.tlfx.tlfx-lt.tlfx-'+k);return d?{rk:+d.dataset.rk,rays:d.querySelectorAll('.lt-rays i').length,rings:d.querySelectorAll('.lt-ring').length,orbs:d.querySelectorAll('.lt-orbit i').length,ms:TL_FXL[k].ms,beam:d.querySelectorAll('.lt-beam,.lt-flash').length,txt:d.innerText,de:document.documentElement.dataset.tlfx}:null;}, k);
      ok(!!info[k]&&info[k].de===k, 'hiện dị tượng '+k);
      await ev(p, () => {ACT.tlFxDone();render();});
    }
    ok(order.every((k,i)=>!i||(info[order[i-1]].rk>info[k].rk&&info[order[i-1]].ms>info[k].ms)), 'bậc và thời gian giảm dần Biến dị→Tạp');
    ok(order.every((k,i)=>!i||info[order[i-1]].rays>=info[k].rays&&info[order[i-1]].rings>=info[k].rings), 'tia sáng, vòng sáng không tăng khi bậc giảm');
    ok(info.bien.beam===2&&info.bien.rays>info.song.rays&&info.bien.orbs>=6&&/Biến dị linh căn/.test(info.bien.txt)&&/điện/.test(info.bien.txt), 'Biến dị (lôi): cột sáng + chớp, nhiều tia nhất, lời kể riêng');
    ok(/Ngũ hành tạp linh căn/.test(info.tap.txt)&&info.tap.rays===0, 'Tạp: yếu nhất, không có tia');
    ok(await ev(p, () => !document.querySelector('.tlfx')&&!G.run.tlFx), 'đóng hết hiệu ứng');
    ok(p.errs.length===0, 'không có lỗi trang: '+p.errs.join(' | '));
  },
  // Sửa-D: chú thích nằm sát chỗ rê/bấm ở cỡ máy tính (trước đây lệch vì #tip bị zoom --dz mà left/top không chia lại)
  async tooltip_vitri(p) {
    for (const [w, h] of [[1440, 900], [1920, 1080], [1280, 720]]) {
      await p.setViewportSize({ width: w, height: h }); await p.waitForTimeout(300);
      await ev(p, () => { G.run.scene = null; UI.modal = null; UI.panel = 'char'; UI.tab.char = 'base'; render(); });
      await p.waitForTimeout(300);
      const els = await p.$$('#panel [data-tip]');
      ok(els.length >= 5, w + 'x' + h + ': tab Căn cơ có ' + els.length + ' chỗ có chú thích');
      let bad = 0, worst = 0;
      for (const el of els.slice(0, 12)) {
        const bb = await el.boundingBox(); if (!bb) continue;
        const cx = bb.x + Math.min(bb.width / 2, 40), cy = bb.y + bb.height / 2;
        await p.mouse.move(cx - 3, cy - 3); await p.mouse.move(cx, cy); await p.waitForTimeout(60);
        const r = await ev(p, () => { const t = document.querySelector('#tip'); if (t.hidden) return null; const b = t.getBoundingClientRect(); return { l: b.left, t: b.top, r: b.right, b: b.bottom, W: innerWidth, H: innerHeight }; });
        if (!r) { continue; }
        const dx = Math.max(r.l - cx, 0, cx - r.r), dy = Math.max(r.t - cy, 0, cy - r.b), d = Math.hypot(dx, dy);
        worst = Math.max(worst, d);
        if (d > 40 || r.l < 0 || r.t < 0 || r.r > r.W || r.b > r.H) bad++;
      }
      ok(bad === 0, w + 'x' + h + ': chú thích sát con trỏ (xa nhất ' + Math.round(worst) + 'px) và không tràn màn, lỗi ' + bad);
      const q = await ev(p, () => { const el = document.querySelector('#panel [data-tip]'); showTip(el, false); const e = el.getBoundingClientRect(), t = document.querySelector('#tip').getBoundingClientRect(); hideTip(); return Math.max(e.top - t.bottom, t.top - e.bottom, 0) + Math.max(e.left - t.right, t.left - e.right, 0); });
      ok(q < 40, w + 'x' + h + ': chú thích kiểu chạm cách phần tử ' + Math.round(q) + 'px');
    }
    for (const tb of ['bag', 'hoc', 'kn']) {
      await ev(p, k => { UI.panel = 'char'; UI.tab.char = k; render(); }, tb); await p.waitForTimeout(200);
      const el = await p.$('#panel [data-tip]'); if (!el) continue;
      const bb = await el.boundingBox(); const cx = bb.x + bb.width / 2, cy = bb.y + bb.height / 2;
      await p.mouse.move(cx - 3, cy - 3); await p.mouse.move(cx, cy); await p.waitForTimeout(60);
      const d = await ev(p, ([cx, cy]) => { const t = document.querySelector('#tip'); if (t.hidden) return -1; const b = t.getBoundingClientRect(); return Math.hypot(Math.max(b.left - cx, 0, cx - b.right), Math.max(b.top - cy, 0, cy - b.bottom)); }, [cx, cy]);
      ok(d >= 0 && d < 40, 'tab ' + tb + ': chú thích sát chỗ rê (' + Math.round(d) + 'px)');
    }
  },
  // Sửa-D (câu 20): chữ nhỏ báo thiện cảm đổi, góc trái dưới, trên chân trang
  async thiencam_chu(p) {
    await ev(p, () => { G.run.scene = null; UI.modal = null; UI.panel = null; render(); NK.clear(); });
    await p.waitForTimeout(200);
    await ev(p, () => { favAdd('Lý Mặc', 2); favAdd('Tô Vân', 6); favAdd('Hàn Phong', 15); favAdd('Kẻ Địch', -12); });
    const a = await ev(p, () => [...document.querySelectorAll('#favpop .favrow')].map(e => ({ t: e.innerText, up: e.classList.contains('up'), n: e.querySelectorAll('svg').length, col: getComputedStyle(e.querySelector('svg')).fill, bg: getComputedStyle(e).backgroundColor, bd: getComputedStyle(e).borderTopWidth })));
    ok(a.length === 4, 'bốn dòng cùng lúc xếp dòng (' + a.length + ')');
    ok(a[0].n === 1 && a[1].n === 2 && a[2].n === 3 && a[3].n === 3, 'số mũi tên theo mức: ' + a.map(x => x.n).join(','));
    ok(a[0].up && !a[3].up && a[0].col === 'rgb(47, 154, 78)' && a[3].col === 'rgb(192, 57, 43)', 'tăng xanh, giảm đỏ: ' + a[0].col + ' / ' + a[3].col);
    ok(/Lý Mặc/.test(a[0].t) && a.every(x => x.bg === 'rgba(0, 0, 0, 0)' && x.bd === '0px'), 'có tên NPC, không nền không khung');
    const g = await ev(p, () => { const b = document.getElementById('favpop').getBoundingClientRect(), rs = [...document.querySelectorAll('#favpop .favrow')].map(e => e.getBoundingClientRect()); const nv = document.getElementById('nav').getBoundingClientRect(); return { bottom: b.bottom, navTop: nv.top, left: b.left, ov: rs.some((r, i) => rs.some((s, j) => j > i && r.bottom > s.top + 1)) }; });
    ok(g.bottom <= g.navTop && g.left < 30 && !g.ov, 'nằm trên chân trang, sát trái, không đè nhau ' + JSON.stringify(g));
    ok(await ev(p, () => NK.count('thiencam') === 4), 'nhật ký thiencam.hien đủ 4 dòng');
    await p.waitForTimeout(2300);
    ok(await ev(p, () => document.querySelectorAll('#favpop .favrow').length === 0), 'biến mất sau chừng 2 giây');
  },
  // Sửa-K: đang bị truy đuổi — biểu tượng trên bản đồ có chú thích chữ, không số; bị chặn giữa đường mở hộp lựa chọn, chọn đánh vào trận
  async dat_dai(p) {
    // Đ8b: hộp địa điểm chỉ hiện mục theo công trình trên ô đất; phá / xây qua mục Đất đai, hộp xác nhận ghi hậu quả
    await ev(p, () => {const r=G.run;r.pham=0;r.realm=1;r.st=1000;UI.modal=null;UI.panel=null;r.truy=null;
      const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tran'&&!n.anchor&&n.state!=='ruin');window.DT=n;
      datStore()[n.id]={v:1,o:[{ct:'tuu_lau',chu:{k:'dan'},goc:1},{ct:'tram_dich',chu:{k:'dan'},goc:1},{ct:'tap_hoa',chu:{k:'dan'},goc:1}],pha:{}};
      r.at=n.id;r.region=n.r;r.scene=null;openPlace(n.id);render();});
    await p.waitForTimeout(150);
    const acts = await ev(p, () => [...document.querySelectorAll('[data-act="pact"]')].map(b=>b.getAttribute('data-arg')).filter(a=>DAT_TIED[a]).sort());
    ok(acts.join() === 'taphoa,tram,tuu', 'trấn ba ô: hộp địa điểm chỉ có tửu lầu, trạm dịch, tạp hóa (' + acts.join() + ')');
    ok(await ev(p, () => !!document.querySelector('[data-act="pact"][data-arg="datdai"]')), 'có nút Đất đai');
    await p.locator('[data-act="pact"][data-arg="datdai"]').click();
    await p.waitForTimeout(150);
    const opts = await p.locator('[data-act="vopt"]').allInnerTexts();
    ok(opts.filter(x => /phá/.test(x)).length === 3 && opts.filter(x => /· mua /.test(x)).length === 3 && /phá/.test(opts[0]), 'mục Đất đai liệt kê ba ô để phá (mua ô có công trình xếp sau) ' + JSON.stringify(opts));
    await p.locator('[data-act="vopt"][data-arg="pha:0"]').click();
    await p.waitForTimeout(150);
    const md = await ev(p, () => (document.querySelector('.mbox')||{}).innerText||'');
    ok(/nói xấu/.test(md) && /truy nã/.test(md), 'hộp xác nhận ghi rõ hậu quả trước khi phá');
    await ev(p, () => {TNA.chung.tran=0;});
    await p.locator('[data-act="vgo"]').click();
    await p.waitForTimeout(200);
    ok(await ev(p, () => !W().dat[DT.id].o[0].ct && !document.querySelector('[data-act="pact"][data-arg="tuu"]')), 'phá xong: mất tửu lầu trên hộp địa điểm');
    // xây động phủ trên đất hoang không chủ
    await ev(p, () => {const r=G.run;r.scene=null;const n=W().regions.flatMap(x=>x.nodes).find(n=>isWild(n)&&!n.anchor&&!n.dp&&n.state!=='ruin'&&(placeActs(n),W().dat[n.id].o.some(c=>!c.ct&&!c.chu)));window.DH=n;
      r.at=n.id;r.region=n.r;openPlace(n.id);render();});
    await p.waitForTimeout(150);
    await p.locator('[data-act="pact"][data-arg="datdai"]').click();
    await p.waitForTimeout(150);
    const xid = await ev(p, () => {const o=venueOpts(DH,'datdai').find(o=>/:dong_phu$/.test(o.id));return o&&o.id;});
    ok(!!xid, 'đất hoang: có lựa chọn xây động phủ');
    await p.locator(`[data-act="vopt"][data-arg="${xid}"]`).click();
    await p.waitForTimeout(150);
    await p.locator('[data-act="vgo"]').click();
    await p.waitForTimeout(200);
    ok(await ev(p, () => DH.dp===1 && W().dat[DH.id].o.some(c=>c.ct==='dong_phu'&&c.chu&&c.chu.k==='ta')), 'dựng được động phủ, ô thành của ngươi');
    ok(await ev(p, () => NK.count('dat') > 0), 'có nhật ký dat.*');
    // câu 80: mua đất trống của dân ở trấn rồi mới dựng nhà riêng
    await ev(p, () => {const r=G.run;r.scene=null;r.bac=1e6;r.tna={};r.at=DT.id;r.region=DT.r;openPlace(DT.id);render();});
    await p.waitForTimeout(150);
    await p.locator('[data-act="pact"][data-arg="datdai"]').click();await p.waitForTimeout(150);
    ok(await p.locator('[data-act="vopt"][data-arg="mua:0"]').count() === 1, 'ô trống của dân: có lựa chọn mua đất');
    await p.locator('[data-act="vopt"][data-arg="mua:0"]').click();await p.waitForTimeout(150);
    ok(/Giá/.test(await ev(p, () => (document.querySelector('.mbox')||{}).innerText||'')), 'hộp xác nhận ghi giá đất');
    await p.locator('[data-act="vgo"]').click();await p.waitForTimeout(200);
    ok(await ev(p, () => W().dat[DT.id].o[0].chu.k === 'ta' && datOpts(DT).some(o => o.id === 'xay:0:nha_rieng' && !o.no)), 'mua xong: ô của ngươi, dựng được nhà riêng');
    await ev(p, () => {TNA.chung.tran=0.5;G.run.scene=null;render();});
    ok(p.errs.length===0, 'không lỗi JavaScript ' + p.errs.join(' '));
  },
  // Sửa-O câu 77: truy nã — biểu tượng chữ trên bản đồ, nhân chứng mở hộp lựa chọn, Quan phủ trong hộp địa điểm
  // Đ10: mục Đại sự ở nơi cổ, Bến Vong Xuyên khi chết, thẻ Đại Mộng, màn kết + Tân Mộng
  async dai_mong(p) {
    const settle = async () => { await p.waitForTimeout(150); for (let i = 0; i < 40 && await ev(p, () => UI.inkBusy); i++) await p.waitForTimeout(100); await p.waitForTimeout(100); };
    await ev(p, () => {FEAT.mong=1;const r=G.run;r.pham=0;r.realm=1;r.bac=1e6;r.st=1e5;r.scene=null;r.gbXong=1;UI.modal=null;UI.panel=null;
      const n=locNode('LOC05');r.at=n.id;r.region=n.r;r.moving=null;openPlace(n.id);render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !!document.querySelector('[data-act="pact"][data-arg="daisu"]')), 'nơi cổ có nút "Đại sự"');
    await p.locator('[data-act="pact"][data-arg="daisu"]').click();await p.waitForTimeout(120);
    const opts = await p.locator('[data-act="vopt"]').allInnerTexts();
    ok(opts.some(x => /Khảo trục quan trắc/.test(x)), 'mục Đại sự liệt kê việc khảo sát ' + JSON.stringify(opts));
    await p.locator('[data-act="vopt"][data-arg="k05a"]').click();await p.waitForTimeout(120);
    await p.locator('[data-act="vgo"]').click();await p.waitForTimeout(150);
    ok(await ev(p, () => triSrc('TRI01').includes('LOC05')), 'khảo xong: ghi một nguồn vào sổ luân hồi');
    ok(/sổ luân hồi|lặp lại/.test(await ev(p, () => document.body.innerText)), 'lời khảo sát hiện trên thẻ địa điểm');
    // chết → bến
    await ev(p, () => {die('combat',{n:'x'});render();});await settle();
    ok(await ev(p, () => !!document.querySelector('[data-act="benDoi"]') && !!document.querySelector('[data-act="benUong"]') && !document.querySelector('[data-act="overNext"]')), 'màn hết kiếp: hai lựa chọn ở bến, chưa luân hồi ngay');
    await p.locator('[data-act="benDoi"]').click();await p.waitForTimeout(120);
    for (let i = 0; i < 8 && await p.$('[data-act="benTiep"]'); i++) { await p.locator('[data-act="benTiep"]').click(); await p.waitForTimeout(80); }
    ok(await ev(p, () => mongCo('MA01')) && /Bát canh không đáy/.test(await ev(p, () => document.body.innerText)), 'ngồi đợi nghe hết: Mộng Ấn #1 hiện trên màn');
    ok(await ev(p, () => !!document.querySelector('[data-act="overNext"]')), 'nghe xong mới có nút Luân hồi');
    await ev(p, () => {G.over=null;G.screen='meta';UI.tab.meta='mong';render();});await settle();
    const mt = await ev(p, () => document.body.innerText);
    ok(/Mộng Ấn/.test(mt) && /Bát canh không đáy/.test(mt) && /Người Gác Bến/.test(mt), 'Bến Vong Xuyên: thẻ Đại Mộng (Mộng Ấn, tri thức, Người Gác Bến)');
    // màn kết
    await ev(p, () => {genBirth();newRun(G.birth.cards[0]);G.run.scene=null;dmKetHet('END07');render();});await settle();
    const kt = await ev(p, () => document.body.innerText);
    ok(/Người chặt vòng/.test(kt) && /Nước thôi chảy ngược/.test(kt), 'màn kết: tên kết + câu kết');
    ok(/Phàm giới/.test(kt) && !(await p.$('[data-act="tanMong"]')), 'màn kết: nhắc Phàm giới, không còn nút Tân Mộng (câu 86)');
    await p.locator('[data-act="ketVe"]').click();await settle();const tt = await ev(p, () => document.body.innerText);
    ok(await ev(p, () => G.screen==='title' && !!G.meta.ketHet) && /Linh giới đang trong quá trình phát triển/.test(tt) && /Phàm giới đã khép/.test(tt), 'về màn mở đầu: báo Linh giới đang phát triển, giữ hồ sơ');
    ok(!(await p.$('[data-act="birth"]')) && !!(await p.$('[data-act="screen"][data-arg="ket"]')), 'màn mở đầu: không luân hồi tiếp, xem lại được màn kết');
    // câu 88: hồi ức đời sau ở màn hết kiếp
    await ev(p, () => {G.meta.ketHet=null;genBirth();newRun(G.birth.cards[0]);G.run.scene=null;G.run.gbXong=1;dmM().ends.push({id:'END06',kiep:1,ten:'x',y:1});G.run.kiep=5;delete (G.meta.hqMuon||{}).END06;die('combat',{n:'x'});render();});await settle();
    ok(/Chuyện kể của đời sau/.test(await ev(p, () => document.body.innerText)), 'màn hết kiếp đời sau: hồi ức của kết truyền nghề');
    ok(p.errs.length === 0, 'không lỗi JavaScript ' + p.errs.slice(0, 2).join(' | '));
  },
  async truy_na(p) {
    await ev(p, () => {FEAT.truy=1;FEAT.tna=1;const r=G.run;r.pham=0;r.realm=1;r.scene=null;UI.modal=null;UI.panel=null;r.truy=null;r.tna={};
      const n=W().regions.flatMap(x=>x.nodes).find(n=>n.type==='tran'&&n.state!=='ruin');window.TN=n;r.at=n.id;r.region=n.r;r.moving=null;
      tnaBao(n.r,1,{noTruy:1});render();});
    await p.waitForTimeout(150);
    const tp = await ev(p, () => {const e=document.querySelector('.wi.na');return e?e.getAttribute('data-tip')+'|'+e.innerText:'';});
    ok(/Bị truy nã/.test(tp) && !/\d/.test(tp), 'biểu tượng truy nã trên bản đồ, chú thích bằng chữ, không số');
    await ev(p, () => {TNA_UB=JSON.stringify(TNA);TNA.chung.tran=1;TNA.chung.chac=1.01;tnaToi('pha_dat');render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.scene&&G.run.scene.ev==='tna_chung'), 'nhân chứng: mở hộp lựa chọn');
    const kt = await ev(p, () => document.body.innerText);
    ok(/Giết nhân chứng/.test(kt) && /Để hắn đi/.test(kt), 'hộp nhân chứng hiện các lựa chọn');
    await ev(p, () => {kyPick(3);G.run.scene=null;Object.assign(TNA,JSON.parse(TNA_UB));G.run.truy=null;openPlace(TN.id);render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !!document.querySelector('[data-act="pact"][data-arg="quanphu"]')), 'hộp địa điểm có nút Quan phủ');
    await p.locator('[data-act="pact"][data-arg="quanphu"]').click();
    await p.waitForTimeout(150);
    const opts = await p.locator('[data-act="vopt"]').allInnerTexts();
    ok(opts.length >= 3 && opts.some(x => /Nộp .*tiền phạt/.test(x)) && opts.some(x => /Làm công/.test(x)) && opts.some(x => /Chịu giam/.test(x)), 'mục Quan phủ: nộp phạt, làm công, ngồi tù ' + JSON.stringify(opts));
    await ev(p, () => {G.run.bac=tnaE(TN.r).tien+1;render();});
    await p.locator('[data-act="vopt"][data-arg="nop"]').click();
    await p.waitForTimeout(150);
    await p.locator('[data-act="vgo"]').click();
    await p.waitForTimeout(200);
    ok(await ev(p, () => !tnaE(TN.r) && !document.querySelector('.wi.na')), 'nộp phạt xong: hết truy nã, mất biểu tượng');
    await ev(p, () => {G.run.scene=null;render();});
    ok(p.errs.length===0, 'không lỗi JavaScript ' + p.errs.join(' '));
  },
  async truy(p) {
    await ev(p, () => {FEAT.truy=1;const r=G.run;r.pham=0;r.realm=1;r.scene=null;UI.modal=null;UI.panel=null;r.truy=null;truyStart('tac',{n:'Sơn tặc',ek:'sontac',d:0});render();});
    await p.waitForTimeout(150);
    const tp = await ev(p, () => {const e=[...document.querySelectorAll('.wi.truy')][0];return e?e.getAttribute('data-tip')+'|'+e.innerText:'';});
    ok(/Bị truy đuổi/.test(tp) && /Sơn tặc/.test(tp), 'biểu tượng bị truy đuổi trên bản đồ, chú thích bằng chữ');
    ok(!/\d/.test(tp), 'không hiện con số');
    await ev(p, () => {const r=G.run;const far=W().regions.flatMap(R=>R.nodes).filter(n=>n.id!==r.at).sort((a,b)=>edgeLen(r.at,b.id)-edgeLen(r.at,a.id))[0];far.fog=Math.max(far.fog||0,1);r.halt=false;travelTo(far.id);r.dest=far.id;
      TRUY.loai.tac.chan=1;r.truy.until=W().t+999*HD;r.truy.nx=W().t+edgeLen(r.moving.path[0],r.moving.path[1])/walkSpeed()*0.4;r.kyT=W().t;r.tmT=W().t;travelTick(9999);render();});
    await p.waitForTimeout(200);
    ok(await ev(p, () => G.run.scene&&G.run.scene.ev==='truy_chan'&&G.run.moving&&G.run.moving.prog>0&&G.run.moving.prog<1), 'bị chặn giữa chặng đi dài, đứng lại giữa đường');
    const bt = await p.locator('[data-act="kyPick"]').allInnerTexts();
    ok(bt.length===4 && bt.some(x=>/Chạy tiếp/.test(x)) && bt.some(x=>/Nộp của/.test(x)), 'hộp chặn đường có các lựa chọn ' + JSON.stringify(bt));
    await p.locator('[data-act="kyPick"][data-arg="0"]').click();
    await p.waitForTimeout(200);
    ok(await ev(p, () => G.run.scene&&G.run.scene.type==='combat'&&G.run.scene.truyCh===1), 'chọn đánh: vào trận');
    await ev(p, () => {G.run.scene.over='win';combatContinue();render();});
    await p.waitForTimeout(150);
    ok(await ev(p, () => !G.run.truy && !document.querySelector('.wi.truy')), 'thắng: hết bị truy, biểu tượng tắt');
    ok(await ev(p, () => NK.count('truy') > 0), 'có nhật ký truy.*');
    await ev(p, () => {if(G.run.scene&&G.run.scene.type!=='combat')G.run.scene=null;render();});
    await p.waitForTimeout(400);
    ok(await ev(p, () => G.run.halt===true&&!!G.run.moving&&!!document.querySelector('[data-act="goOn"]')), 'sau trận vẫn đứng giữa đường, có nút Đi tiếp (câu 51)');
    await ev(p, () => {TRUY.loai.tac.chan=0.4;});
    ok(p.errs.length===0, 'không lỗi JavaScript ' + p.errs.join(' '));
  },
  async nhatky(p) {
    ok(await ev(p, () => NK.on === true), 'nhật ký bật nhờ ?debug=1');
    ok(await ev(p, () => NK.buf.length > 0 || (dbg('thu', {}), NK.buf.length > 0)), 'nhật ký có dòng');
  },
  // gói GPT đợt năm: sự kiện nghề tu hiện bằng khung kỳ ngộ; kết cục nghề tu ở màn hết kiếp
  async nghe_tu_sk(p) {
    await ev(p, () => {const r=G.run;r.pham=0;r.rootKnown=1;r.root={id:'tap',els:['kim','moc'],q:'thuong'};r.st=9999;r.scene=null;G._ngNoEv=1;lkTang=()=>9;UI.modal=null;UI.panel=null;
      tuHoc('TU17',0);r.scene=null;G.screen='map';ntMo('TU17',0);render();});
    await p.waitForTimeout(200);
    const t = await ev(p, () => document.body.innerText);
    ok(/Vò cổ đầu/.test(t) && !/\{LOC/.test(t), 'hộp sự kiện nghề "Vò cổ đầu" hiện, mã nơi đã thay chữ');
    ok(await ev(p, () => document.querySelectorAll('[data-act="kyPick"]').length) === 2, 'hai lựa chọn');
    await p.locator('[data-act="kyPick"][data-arg="0"]').click();await p.waitForTimeout(150);
    ok(await ev(p, () => G.run.ntu.c['TU17.S01']===0 && document.body.innerText.includes(tyT(NTU_DATA.TU17.sk[0].c[0].t).slice(0,30))), 'chọn xong: lời kết quả hiện');
    await ev(p, () => {const r=G.run;r.scene=null;hdAdd(40,0,'x');r.ntu.c={'TU17.S01':0,'TU17.S02':0,'TU17.S03':0};r.gbXong=1;die('toahoa');render();});
    for (let i = 0; i < 40 && await ev(p, () => UI.inkBusy); i++) await p.waitForTimeout(100);
    await p.waitForTimeout(300);
    const o = await ev(p, () => document.body.innerText), ten = await ev(p, () => NTU_DATA.TU17.ket.K03.ten);
    ok(/Kết cục nghề tu/.test(o) && o.includes(ten), 'màn hết kiếp: kết cục nghề tu "' + ten + '"');
  },
};

(async () => {
  if (args.includes('--list')) { console.log(Object.keys(TESTS).join('\n')); return; }
  const server=http.createServer((req,res)=>{const u=new URL(req.url,'http://localhost');const rel=decodeURIComponent(u.pathname).replace(/^\//,'');const file=path.resolve(__dirname,'..',rel);const base=path.resolve(__dirname,'..');if(!file.startsWith(base+path.sep)||!fs.existsSync(file)||!fs.statSync(file).isFile()){res.statusCode=404;res.end();return;}res.setHeader('Content-Type',file.endsWith('.html')?'text/html; charset=utf-8':file.endsWith('.webp')?'image/webp':'application/octet-stream');res.end(fs.readFileSync(file));});
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));contentTestURL=process.env.PS_TEST_URL||'http://127.0.0.1:'+server.address().port+'/phu-sinh.html';
  const b = await chromium.launch({executablePath:process.env.PS_CHROMIUM || (require('fs').existsSync('/usr/bin/chromium')?'/usr/bin/chromium':undefined),args:['--no-sandbox']});
  for (const k of (names.length ? names : Object.keys(TESTS))) {
    if (!TESTS[k]) { console.log('Không có bài: ' + k); fails++; continue; }
    console.log('▶ ' + k); const f0 = fails; let p;
    try { p = await boot(b); await TESTS[k](p); ok(p.errs.length === 0, 'không có lỗi trang' + (p.errs.length ? ': ' + p.errs.join(' | ') : '')); }
    catch (e) { fails++; console.log('   ✗ NGOẠI LỆ: ' + e.message.split('\n')[0]); }
    if (p && (LOG || fails > f0)) { try { console.log('   --- nhật ký ---\n' + (await ev(p, () => NK.dump(20))).split('\n').map(l => '   ' + l).join('\n')); } catch (e) {} }
    if (p) await p.close();
  }
  await b.close();server.close(); console.log(fails ? `\n${fails} lỗi` : '\nTất cả đạt'); process.exit(fails ? 1 : 0);
})();
