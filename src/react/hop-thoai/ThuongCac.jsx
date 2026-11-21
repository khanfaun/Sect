// Thưởng Các: đổi Thưởng Lệnh lấy hàng (Đ3.5). Dữ liệu: content/venues/thuong-cac.js
import { PS } from '../html';
import { tip } from '../chung';

export function ThuongCac() {
  const r = PS.G.run;
  if (!r || !r.scene || r.scene.type !== 'place') return null;
  const n = PS.nodeById(r.scene.id), L = PS.tcList(n), b = PS.tcBac(r), B = PS.TC_BAC;
  const nx = B[b + 1];
  return (
    <div className="mbox tcac">
      <h3>Thưởng Các</h3>
      <p className="hint">Đang có <b>{r.thuongLenh || 0}</b> Thưởng Lệnh · bậc <b>{B[b].n}</b>{nx ? ' (tới ' + nx.n + ' còn ' + Math.max(0, nx.v - (r.thuongTong || 0)) + ' thẻ)' : ''}</p>
      <div className="rows">
        {L.map(x => (
          <button key={x.id} className={'row' + (x.why ? ' dim' : '')} data-act="tcBuy" data-arg={x.i} disabled={!!x.why} {...tip(x.why || ('Đổi ' + x.p + ' Thưởng Lệnh'))}>
            <span className="r-i">{x.k === 'pill' ? PS.PILL[x.id].i : ((PS.CAT.byId[x.id] || {}).i || '🎋')}</span>
            <span className="r-t"><b>{x.n}</b><small>{x.why || (x.left === Infinity ? 'không giới hạn' : 'còn ' + x.left)}</small></span>
            <span className="r-x">{x.p} thẻ</span>
          </button>
        ))}
      </div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Xong</button></div>
    </div>
  );
}
