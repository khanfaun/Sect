// Khung nhiệm vụ tân thủ (Đ4, chỉ kiếp đầu). Luật: src/game/core2/40-tan-thu.js; hành động: src/game/ui/26-tan-thu.js
import { PS } from '../html';
import { tip, Ic } from './index';
import { TienIco } from '../ban-do/NutBanDo';

// phần thưởng làm nổi: biểu tượng + số + tên, có màu; chạm / rê chuột ra chú thích loại tiền
function ThuongChip({ k, v, ten, d }) {
  return <span className={'tut-chip c-' + k} {...tip(ten + ': ' + v + '\n' + d)}><TienIco k={k} /><b>{v}</b><em>{ten}</em></span>;
}
function Thuong({ x }) {
  const rw = (x.t && x.t.rw) || {}, T = PS.TIEN, C = [];
  if (rw.bac) {
    const d = Math.round(rw.bac), vang = Math.floor(d / T.vang), bac = Math.floor((d % T.vang) / T.luong), xu = d % T.luong;
    if (vang) C.push(<ThuongChip key="v" k="vang" v={vang} ten="lượng vàng" d={'Bằng ' + T.vang / T.luong + ' lượng bạc.'} />);
    if (bac) C.push(<ThuongChip key="b" k="bac" v={bac} ten="lượng bạc" d={'Bằng ' + T.luong + ' xu.'} />);
    if (xu || (!vang && !bac)) C.push(<ThuongChip key="x" k="xu" v={xu} ten="xu" d="Tiền lẻ của phàm nhân, dùng mua đồ rẻ." />);
  }
  if (rw.st) C.push(<ThuongChip key="st" k={0} v={rw.st} ten="linh thạch hạ phẩm" d="Linh thạch thường, dùng hằng ngày." />);
  const skip = (rw.bac ? 1 : 0) + (rw.st ? 1 : 0);
  x.rw.slice(skip).forEach((t, i) => C.push(<span key={'o' + i} className="tut-chip c-o"><b>{t}</b></span>));
  if (!C.length) return null;
  return <span className="tut-rw"><small>Thưởng</small>{C}</span>;
}

export function TanThu() {
  const r = PS.G.run;
  if (!r || !r.tut) return null;
  const L = PS.tutView(), T = r.tut;
  const nReady = L.filter(x => x.ready).length;
  const nut = (
    <button className={'tut-tg' + (nReady ? ' hi' : '')} data-act="tutHide" {...tip(T.hide ? 'Mở nhiệm vụ tân thủ' : 'Thu gọn')}>
      <Ic n={T.hide ? 'scroll' : 'down'} />{T.hide && nReady > 0 ? <i className="tut-n">{nReady}</i> : null}
    </button>
  );
  if (T.hide) return <div className="tut tut-off">{nut}</div>;
  return (
    <div className="tut">
      {nut}
      <div className="tut-l">
        {!L.length && <p className="tut-d">Đã đi hết đường của kẻ mới tới.</p>}
        {L.map(x => (
          <div key={x.id} className={'tut-c' + (x.ready ? ' ok' : '')}>
            <div className="tut-top">
              <b>{x.n}</b>
              {!x.ready && <button className="tut-go" data-act="tutGo" data-arg={x.id} {...tip('Dẫn đường tới chỗ làm việc này')}><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.5 20.5 21 12 16.6 3.5 21z" /></svg></button>}
            </div>
            <span className="tut-d">{x.d}</span>
            <span className="tut-bar"><i style={{ width: Math.round(100 * x.prog / Math.max(1, x.need)) + '%' }} /><em>{x.prog}/{x.need}</em></span>
            <Thuong x={x} />
            <span className="tut-f">
              {x.ready && <button className="btn sm pri" data-act="tutClaim" data-arg={x.id}>Nhận thưởng</button>}
              {!x.ready && <button className="tut-sk" data-act="tutSkip" data-arg={x.id}>Bỏ qua</button>}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Hộp xác nhận bỏ qua (UI.modal={k:'tutSkip',id})
export function BoQuaTanThu({ m }) {
  const t = PS.tutById(m.id);
  if (!t) return null;
  return (
    <div className="mbox pconf">
      <h3>Bỏ qua nhiệm vụ?</h3>
      <p>Bỏ qua «{t.n}» thì sẽ không nhận lại phần thưởng của nhiệm vụ này.</p>
      <div className="mb-f"><button className="btn" data-act="modalX">Giữ lại</button><button className="btn pri" data-act="tutSkipGo" data-arg={t.id}>Bỏ qua</button></div>
    </div>
  );
}

// Chọn nguyện vọng (UI.modal={k:'wish'})
export function NguyenVong() {
  const r = PS.G.run;
  if (!r) return null;
  return (
    <div className="mbox">
      <h3>Điều ta muốn</h3>
      <p className="hint">Chỉ là một lời ghi cho kiếp này. Đổi lúc nào cũng được, không mất gì.</p>
      <div className="rows">
        {PS.TUT_WISH.map(([id, n]) => (
          <button key={id} className={'row' + (r.wish === id ? ' on' : '')} data-act="wishSet" data-arg={id}><span className="r-t"><b>{n}</b></span></button>
        ))}
      </div>
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button></div>
    </div>
  );
}
