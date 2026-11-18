// Sửa-C.18: dị tượng khi trắc ra Địa linh căn (tím) / Thiên linh căn (cam vàng, mạnh hơn nhiều).
// Mọi hộp thoại, chân trang, biểu tượng đã ẩn (data-asc, data-tlfx). Hết thời gian thì tự đóng, hộp kết quả trắc linh hiện lại.
import { PS } from '../html';

export function TracLinh() {
  const { G, UI, CFG, TL_FX } = PS;
  const r = G.run, fx = r.tlFx;
  if (!fx) return null;
  const T = TL_FX[fx.k] || { ms: 6000 };
  const ms = CFG.anim === false ? 300 : T.ms;
  if (UI.tlFxId !== fx.id) {
    UI.tlFxId = fx.id; clearTimeout(UI.tlFxT);
    UI.tlFxT = setTimeout(() => { PS.ACT.tlFxDone(); PS.render(); }, ms);
  }
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
