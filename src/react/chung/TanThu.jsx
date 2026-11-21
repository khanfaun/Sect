// Khung nhiệm vụ tân thủ (Đ4, chỉ kiếp đầu). Luật: src/game/core2/40-tan-thu.js; hành động: src/game/ui/26-tan-thu.js
import { PS } from '../html';
import { tip, Ic } from './index';

export function TanThu() {
  const r = PS.G.run;
  if (!r || !r.tut) return null;
  const L = PS.tutView(), T = r.tut;
  const nReady = L.filter(x => x.ready).length;
  // không còn nút chữ "Tân thủ": một nút biểu tượng thu gọn / mở rộng
  return (
    <div className={'tut' + (T.hide ? ' tut-off' : '')}>
      <div className="tut-h">
        {!T.hide && <b className="tut-tt">Nhiệm vụ tân thủ</b>}
        <button className={'tut-tg' + (nReady ? ' hi' : '')} data-act="tutHide" {...tip(T.hide ? 'Mở nhiệm vụ tân thủ' : 'Thu gọn nhiệm vụ tân thủ')}>
          <Ic n={T.hide ? 'scroll' : 'down'} />{T.hide && nReady > 0 ? <i className="tut-n">{nReady}</i> : null}
        </button>
      </div>
      {!T.hide && (
        <div className="tut-l">
          {!L.length && <p className="tut-d">Đã đi hết đường của kẻ mới tới.</p>}
          {L.map(x => (
            <div key={x.id} className={'tut-c' + (x.ready ? ' ok' : '')}>
              <div className="tut-top">
                <b>{x.n}</b>
                {!x.ready && <button className="tut-go" data-act="tutGo" data-arg={x.id} {...tip('Dẫn đường tới chỗ làm việc này')}><Ic n="walk" /></button>}
              </div>
              <span className="tut-d">{x.d}</span>
              <span className="tut-bar"><i style={{ width: Math.round(100 * x.prog / Math.max(1, x.need)) + '%' }} /><em>{x.prog}/{x.need}</em></span>
              {x.rw.length > 0 && <span className="tut-rw">Thưởng: {x.rw.join(', ')}</span>}
              <span className="tut-f">
                {x.ready && <button className="btn sm pri" data-act="tutClaim" data-arg={x.id}>Nhận thưởng</button>}
                {!x.ready && <button className="tut-sk" data-act="tutSkip" data-arg={x.id}>Bỏ qua</button>}
              </span>
            </div>
          ))}
        </div>
      )}
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
