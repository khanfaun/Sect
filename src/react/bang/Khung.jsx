// Khung cửa sổ của các bảng (giống win() bản cũ): tiêu đề, nút đóng, thân cuộn, chân.
import { Ic } from '../chung';

export function Win({ title, cls, extra, noClose, close, foot, children }) {
  return (
    <section className={'win ' + (cls || '')}>
      <header className="win-h">
        <h2>{title}</h2>{extra}
        {!noClose && <button className="xb" data-act={close || 'closePanel'} aria-label="Đóng"><Ic n="close" /></button>}
      </header>
      <div className="win-b">{children}</div>
      {foot && <footer className="win-f">{foot}</footer>}
    </section>
  );
}
