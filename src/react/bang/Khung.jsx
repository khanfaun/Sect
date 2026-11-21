// Khung bảng (giao diện mới): toàn màn trên điện thoại, đầu bảng có nút quay lại bên trái, hoạ tiết mây chìm.
import { Ic } from '../chung';
import { May } from '../chung/HoaVan';

export function Win({ title, cls, extra, noClose, close, foot, children }) {
  return (
    <section className={'win x-win ' + (cls || '')}>
      <header className="win-h">
        {!noClose && <button className="xb x-back" data-act={close || 'closePanel'} aria-label="Quay lại"><Ic n="left" /></button>}
        <h2>{title}</h2>{extra}
        <May cls="x-win-may" />
      </header>
      <div className="win-b">{children}</div>
      {foot && <footer className="win-f">{foot}</footer>}
    </section>
  );
}
