// Hộp thoại thông tin ngắn: tử địa, ghi chú bản đồ, kết quả, diễn biến trận, trận dang dở, dev test, nhân sự tông môn.
import { Html, PS } from '../html';
import { Chips, Ic } from '../chung';

export const Nut = {
  thoi: <button className="btn" data-act="modalX">Thôi</button>,
  dong: <button className="btn" data-act="modalX">Đóng</button>,
};

export function TuDia({ m }) {
  const n = PS.nodeById(m.id);
  return (
    <div className="mbox">
      <h3>Tử địa</h3>
      <p>{n.name}: {PS.dangerWhy(n)} Với {PS.realmName()} của ngươi, Bước vào đó, sơ sẩy là hết kiếp này.</p>
      <div className="mb-f">{Nut.thoi}<button className="btn pri" data-act="goSure" data-arg={n.id}>Vẫn đi</button></div>
    </div>
  );
}

export function GhiChu({ m }) {
  const n = PS.nodeById(m.id);
  return (
    <div className="mbox">
      <h3>Ghi chú · {n.name}</h3>
      <p className="hint">Ghim chỉ để nhớ, không đổi đường đi. Để trống rồi lưu là gỡ ghim.</p>
      <input id="noteIn" maxLength={80} defaultValue={PS.noteOf(n.id)} placeholder="vd: có động phủ, quay lại khi Trúc Cơ" />
      <div className="mb-f">{Nut.thoi}<button className="btn pri" data-act="noteSave" data-arg={n.id}>Lưu</button></div>
    </div>
  );
}

export function KetQua({ m }) {
  return (
    <div className="mbox">
      <h3>{m.title}</h3><p>{m.t}</p><Chips list={m.chips} />
      <div className="mb-f"><span className="grow"></span><button className="btn pri" data-act="modalX">Tiếp tục</button></div>
    </div>
  );
}

export function DienBienTran() {
  const sc = PS.G.run.scene;
  return (
    <div className="mbox">
      <h3>Diễn biến trận</h3>
      <div className="logl">{(sc.log || []).slice().reverse().map((l, i) => <p key={i} className={l.c ? 'lg-' + l.c : ''}>{l.t}</p>)}</div>
      <div className="mb-f"><span className="grow"></span><button className="btn pri" data-act="modalX">Đóng</button></div>
    </div>
  );
}

export function TranDangDo() {
  const sc = PS.G.run && PS.G.run.scene, en = sc && sc.en ? sc.en.n : 'kẻ địch';
  return (
    <div className="mbox cbres">
      <h3><Ic n="sword" /> Trận chiến đang dang dở</h3>
      <p>Ngươi vẫn đang giao chiến với <b>{en}</b>. Trận đánh tạm ngưng chờ ngươi trở lại.</p>
      <div className="mb-f"><span className="grow"></span><button className="btn pri big" data-act="cbResumeGo">Tiếp tục trận chiến</button><span className="grow"></span></div>
    </div>
  );
}

const DEV_FX = [['bt', 'Đột phá'], ['xk', 'Xung kích'], ['talup', 'Tiềm chất lên Thiên kiêu'], ['taldn', 'Tiềm chất giảm'], ['rldn', 'Rớt cảnh giới'], ['lowhp', 'Máu thấp'], ['heal', 'Hồi phục']];
export function DevTest() {
  return (
    <div className="mbox dev">
      <h3><Ic n="bolt" /> Dev test</h3>
      <p className="hint">Chỉ để xem hiệu ứng, nhân vật không thay đổi gì.</p>
      <h4 className="sgrp">Hiệu ứng</h4>
      <div className="devg">{DEV_FX.map(([k, n]) => <button key={k} className="btn" data-act="fxDemo" data-arg={k}>{n}</button>)}</div>
      <div className="mb-f"><span className="grow"></span>{Nut.dong}</div>
    </div>
  );
}

export function NhanSu() {
  const n = PS.nodeById(PS.G.run.at), L = PS.sectPeople(n);
  return (
    <div className="mbox">
      <h3>Nhân sự · {n.name}</h3>
      <div className="rows">
        {L.length ? L.map((x, i) => (
          <div key={i} className={'row' + (x.alive ? '' : ' dim')}>
            <Html className="r-i" h={PS.elSeal(x.el)} />
            <span className="r-t"><b>{x.ten}</b><small>{x.tt}</small></span>
            <span className="r-x">{x.alive ? PS.REALM[x.realm] : 'đã mất'}</span>
          </div>
        )) : <p className="empty">Chưa nghe danh ai nổi bật ở đây.</p>}
      </div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Đóng</button></div>
    </div>
  );
}
