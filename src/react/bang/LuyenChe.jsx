// Bảng luyện chế: kho vật liệu và các công thức (tỉ lệ thành công, thời gian).
import { PS } from '../html';
import { tip } from '../chung';
import { Win } from './Khung';

export function LuyenChe() {
  const { MAT, CRAFT } = PS;
  const r = PS.run2(), m = r.mats;
  return (
    <Win title="Luyện chế" cls="tall">
      <p className="hint">Vật liệu nhặt được khi thăm dò và hạ yêu thú. Luyện chế tốn thời gian; thất bại mất nửa vật liệu.</p>
      <div className="grid">
        {Object.keys(MAT).map(k => (
          <div key={k} className="cell" {...tip(MAT[k].n + '\n' + MAT[k].d)}><span className="c-i">{MAT[k].i}</span><span className="c-n">{MAT[k].n}</span><span className="c-p">{m[k] || 0}</span></div>
        ))}
      </div>
      <div className="rows">
        {CRAFT.map(c => (
          <button key={c.id} className="row" data-act="craft" data-arg={c.id} disabled={!(PS.craftOk(c) && !r.moving)} {...tip(c.d)}>
            <span className="r-i">{c.i}</span>
            <span className="r-t">
              <b>{c.n}</b>
              <small>{Object.entries(c.cost).map(([k, v], i) => [i > 0 && ' + ', <span key={k} className={m[k] < v ? 'bad' : ''}>{v} {MAT[k].n.toLowerCase()}</span>])} · {PS.durH(c.h)}</small>
              <small>{c.d}</small>
            </span>
            <span className="r-x">{Math.round(PS.craftRate(c) * 100)}%</span>
          </button>
        ))}
      </div>
    </Win>
  );
}
