// Hộp chọn dùng chung cho: ô trang bị (E…), ô đan điền (D…), đại huyệt chu thiên (C…), ô chiêu (K…),
// ô công pháp / tâm pháp (L…). Trên: món đang dùng; giữa: lưới ứng viên; dưới: chi tiết món đang chọn.
// Các thẻ chi tiết (relDetail, artTipH, skTipH…) vẫn dùng bản HTML cũ.
import { Html, PS } from '../html';
import { Ic, pcs, tah } from '../chung';

// Dựng danh sách ứng viên theo loại ô, giống hệt pickModalHTML()
function ungVien(m) {
  const r = PS.run2(), E = PS.eqOf(), k = m.key, ic = PS.ic;
  let title = '', cur = '', C = [], empty = '';
  const relC = (x, i, act) => ({ t: x.tier || 0, cell: PS.relIcon(x), tip: PS.relTip(x), det: PS.relTip(x), act, arg: i, btn: act === 'eqPut' ? 'Mặc vào' : act === 'ddPutM' ? 'Uẩn dưỡng' : 'Chọn' });
  const byTier = (a, b) => (b.x.tier || 0) - (a.x.tier || 0);
  if (k[0] === 'E') {
    const s = k.slice(1); title = PS.SLOT_N[s.replace(/[123]$/, '')] || 'Trang bị'; const rel = E[s];
    if (rel) cur = PS.relDetail(rel, `<button class="btn sm" data-act="eqOff" data-arg="${s}">${ic('close')} Tháo ra</button>`);
    C = r.relics.map((x, i) => ({ x, i })).filter(o => o.x.k !== 'book' && PS.slotsFor(o.x).includes(s)).sort(byTier).map(o => relC(o.x, o.i, 'eqPut'));
    empty = 'Trong túi không có món nào hợp ô này.';
  } else if (k[0] === 'D') {
    const j = +k.slice(1), d = r.dd[j]; title = 'Đan điền · ô ' + (j + 1);
    if (d) cur = PS.relDetail(d.rel, `<span class="hint">Đã uẩn dưỡng ${PS.durH(Math.max(1, PS.W().t - d.t0))} · +${Math.round((PS.ddMul(d) - 1) * 100)}%</span><button class="btn sm" data-act="ddTake" data-arg="${j}">${ic('close')} Lấy ra</button>`);
    else C = r.relics.map((x, i) => ({ x, i })).filter(o => o.x.k !== 'book' && PS.ddCan(o.x)).sort(byTier).map(o => relC(o.x, o.i, 'ddPutM'));
    empty = d ? '' : 'Chỉ vũ khí và pháp bảo uẩn dưỡng được. Trong túi chưa có món nào.';
  } else if (k[0] === 'C') {
    const i = +k.slice(1), v = PS.chuView(), it = v.it[i];
    title = 'Đại huyệt ' + (i + 1) + (PS.chuHuyet().includes(i) ? ' · huyệt đạo (×1,5)' : '');
    if (it) { const a = PS.artBy(it.u); cur = `<div class="pdet">${PS.artTipH(a, PS.chuPot(v, i))}<div class="bact"><button class="btn sm" data-act="chuDel" data-arg="${i}">${ic('close')} Gỡ ra</button></div></div>`; }
    C = PS.chuPool().map((c, j) => ({ a: PS.artBy(c.u), j })).filter(o => o.a).sort((x, y) => y.a.tier - x.a.tier)
      .map(({ a, j }) => ({ t: a.tier, cell: PS.artArt(a), tip: PS.artTipH(a), det: PS.artTipH(a), act: 'chuPut', arg: j, btn: 'Vận hành' }));
    empty = 'Mọi môn đã học đều đang vận hành.';
  } else if (k[0] === 'K') {
    const [c, iS] = k.slice(1).split(':'), i = +iS; PS.syncSkills();
    const L = r.kn[c] || [], av = PS.knAvail(c), SK = PS.SK; title = PS.CAT_N[c]; const id = L[i];
    if (id && SK[id]) cur = `<div class="pdet">${PS.skTipH(SK[id], av[id] || 1)}<div class="bact"><button class="btn sm" data-act="knDel" data-arg="${c}:${i}">${ic('close')} Gỡ khỏi ô</button></div></div>`;
    C = Object.keys(av).filter(x => x !== id).sort((a, b) => SK[b].t - SK[a].t)
      .map(x => ({ t: SK[x].t, cell: PS.skArt(SK[x]), tip: PS.skTipH(SK[x], av[x]), det: PS.skTipH(SK[x], av[x]), act: 'knPut', arg: x, btn: L.includes(x) ? 'Đổi chỗ vào ô này' : 'Gắn vào ô', name: SK[x].n }));
    empty = `Chưa có chiêu ${PS.CAT_N[c].toLowerCase()} nào khác từ các công pháp đang vận hành.`;
  } else if (k[0] === 'L') {
    const ty = k.slice(1); title = 'Chọn ' + (ty === 'cp' ? 'công pháp' : 'tâm pháp');
    // trong kho (đã học, đã tháo ra) trước, rồi tới bí tịch trong túi
    C = PS.artKho().filter(a => a.type === ty).sort((a, b) => b.tier - a.tier)
      .map(a => ({ t: a.tier, cell: PS.artArt(a) + '<i class="pk-tag">kho</i>', tip: PS.artTipH(a), det: PS.artTipH(a) + '<p class="hint">Đã học, đang cất trong kho. Lắp vào ngay, không tốn thời gian.</p>', act: 'artUnstash', arg: a.u, btn: 'Lắp vào ô', name: a.n }))
      .concat(r.relics.map((x, i) => ({ x, i })).filter(o => o.x.k === 'book' && o.x.art.type === ty).sort((a, b) => b.x.tier - a.x.tier).map(o => {
        const why = PS.learnWhy(o.x);
        return { t: o.x.tier, cell: PS.artArt(o.x.art), tip: PS.artTipH(o.x.art), det: PS.artTipH(o.x.art) + (why ? `<p class="hint bad">${PS.esc(why)}</p>` : ''), act: 'learn', arg: o.i, btn: 'Học · ' + PS.durH(PS.learnTime(o.x.art)), dis: !!why };
      }));
    empty = 'Trong kho và trong túi không có bí tịch ' + (ty === 'cp' ? 'công pháp' : 'tâm pháp') + ' nào. Tìm ở phường thị, Tàng Kinh Các, kỳ ngộ.';
  }
  return { title, cur, C, empty };
}


export function HopChon({ m }) {
  const { title, cur, C, empty } = ungVien(m);
  const sel = PS.clamp(m.sel || 0, 0, Math.max(0, C.length - 1)), S0 = C[sel];
  return (
    <div className="mbox pick">
      <div className="mb-h"><h3>{title}</h3><button className="xb" data-act="modalX" aria-label="Đóng"><Ic n="close" /></button></div>
      {cur && <><h4 className="sgrp">Đang dùng</h4><Html style={{ display: 'contents' }} h={cur} /></>}
      {(C.length > 0 || !!empty) && <h4 className="sgrp">{cur ? 'Đổi sang' : 'Chọn'} <small>{C.length}</small></h4>}
      {C.length ? (
        <div className="pgrid">
          {C.map((c, j) => <button key={j} className={'bc on' + (j === sel ? ' sel' : '')} data-act="pickSel" data-arg={j} style={pcs(c.t)} {...tah(c.tip)} dangerouslySetInnerHTML={{ __html: c.cell }} />)}
        </div>
      ) : (empty ? <p className="hint">{empty}</p> : null)}
      {S0 && (
        <div className="pdet">
          <Html style={{ display: 'contents' }} h={S0.det} />
          <div className="bact"><button className="btn pri" data-act={S0.act} data-arg={S0.arg} disabled={!!S0.dis}>{S0.btn}</button></div>
        </div>
      )}
    </div>
  );
}
