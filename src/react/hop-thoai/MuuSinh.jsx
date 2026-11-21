// Mưu sinh: danh sách việc làm thuê hợp nơi đang đứng (Đ3.7). Dữ liệu: content/venues/viec-thue.js
import { PS } from '../html';
import { tip } from '../chung';

export function MuuSinh() {
  const r = PS.G.run;
  if (!r || !r.scene || r.scene.type !== 'place') return null;
  const n = PS.nodeById(r.scene.id), L = PS.vtList(n);
  const cong = c => c[0] === c[1] ? PS.fmtBac(c[0]) : c[0] + '–' + PS.fmtBac(c[1]);
  return (
    <div className="mbox mmsinh">
      <h3>Tìm việc làm thuê</h3>
      <p className="hint">Trong túi: 🪙{PS.fmtBac(r.bac || 0)}</p>
      <div className="rows">
        {L.map(x => (
          <button key={x.id} className={'row' + (x.why ? ' dim' : '')} data-act="vtGo" data-arg={x.id} disabled={!!x.why} {...tip(x.why || ('Làm ' + PS.durH(x.h) + ', công ' + cong(x.cong)))}>
            <span className="r-t"><b>{x.n}</b><small>{x.why || [PS.durH(x.h), x.an ? 'có cơm' : '', x.ngu ? 'có chỗ ngủ' : '', x.rui ? 'có rủi ro' : ''].filter(Boolean).join(' · ')}</small></span>
            <span className="r-x">🪙{cong(x.cong)}</span>
          </button>
        ))}
      </div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Thôi</button></div>
    </div>
  );
}
