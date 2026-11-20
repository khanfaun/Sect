// Sửa-C.18: dị tượng khi trắc ra Địa linh căn (tím) / Thiên linh căn (cam vàng, mạnh hơn nhiều).
// Mọi hộp thoại, chân trang, biểu tượng đã ẩn (data-asc, data-tlfx). Hết thời gian thì tự đóng, hộp kết quả trắc linh hiện lại.
import { PS } from '../html';

// Dị tượng nhẹ cho song / tam / tứ / tạp linh căn: các quầng sáng theo hệ quay quanh viên đá, càng nhiều hệ càng rực (trừ tạp: đục)
function TracLinhNhe({ fx, L, ms }) {
  const { EL_COL, ACT, render } = PS;
  const els = (fx.els && fx.els.length ? fx.els : Array.from({ length: L.n }, () => 'vo')).slice(0, 5);
  const col = e => (EL_COL && EL_COL[e]) || '#c9b27a';
  return (
    <div className={'tlfx tlfx-lt tlfx-' + fx.k} style={{ '--tlms': ms + 'ms', '--c1': col(els[0]), '--c2': col(els[1] || els[0]) }} onClick={() => { ACT.tlFxDone(); render(); }}>
      <div className="lt-wash"></div>
      {fx.k === 'tu' && <div className="lt-rays">{Array.from({ length: 8 }, (_, i) => <i key={i} style={{ '--a': i * 45 + 'deg' }} />)}</div>}
      <div className="lt-orbit">{els.map((e, i) => <i key={i} style={{ '--a': i * 360 / els.length + 'deg', '--oc': col(e), '--od': i * 0.12 + 's' }} />)}</div>
      {fx.k !== 'song' && <div className="lt-ring r1"></div>}{(fx.k === 'tu' || fx.k === 'tap') && <div className="lt-ring r2"></div>}
      <div className="tlfx-in">
        <small>{L.s}</small>
        <h2>{L.t}</h2>
        {L.l.map((t, i) => <p key={i} style={{ animationDelay: '.5s' }}>{t}</p>)}
      </div>
    </div>
  );
}

export function TracLinh() {
  const { G, UI, CFG, TL_FX, TL_FXL } = PS;
  const r = G.run, fx = r.tlFx;
  if (!fx) return null;
  const L = fx.lt && TL_FXL && TL_FXL[fx.k];
  const T = TL_FX[fx.k] || L || { ms: 6000 };
  const ms = CFG.anim === false ? 300 : T.ms;
  if (UI.tlFxId !== fx.id) {
    UI.tlFxId = fx.id; clearTimeout(UI.tlFxT);
    UI.tlFxT = setTimeout(() => { PS.ACT.tlFxDone(); PS.render(); }, ms);
  }
  if (L) return <TracLinhNhe fx={fx} L={L} ms={ms} />;
  const lines = PS.tlFxLines(fx);
  const step = (ms * 0.78) / Math.max(1, lines.length); // các dòng hiện dần
  const rays = fx.k === 'thien' ? 24 : 10;
  return (
    <div className={'tlfx tlfx-' + fx.k} style={{ "--tlms": ms + "ms" }}>
      <div className="tlfx-bg"></div>
      <div className="tlfx-rays">{Array.from({ length: rays }, (_, i) => <i key={i} style={{ '--a': (i * 360 / rays) + 'deg', '--d': (i % 5) * 0.13 + 's' }} />)}</div>
      <div className="tlfx-beam"></div>
      <div className="tlfx-ring r1"></div><div className="tlfx-ring r2"></div>{fx.k === 'thien' && <><div className="tlfx-ring r3"></div><div className="tlfx-ring r4"></div></>}
      <div className="tlfx-in">
        <small>{PS.contentText('tlfx.sub.' + fx.k)}</small>
        <h2>{PS.contentText('tlfx.title.' + fx.k)}</h2>
        {lines.map((t, i) => <p key={i} style={{ animationDelay: (0.6 + i * step / 1000) + 's' }}>{t}</p>)}
      </div>
    </div>
  );
}
