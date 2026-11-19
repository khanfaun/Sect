// Đ10: màn kết — một trong bốn kết khép hành trình (END04, END05, END07, END08). Sau đó là Tân Mộng (hồ sơ mới, giữ dấu "đã tỉnh").
import { PS, Tranh } from '../html';

export function ManKet() {
  const K = PS.dmKetView();
  if (!K) return null;
  const c = PS.UI.confirm === 'tanMong';
  return (
    <div className="over ket">
      <Tranh seed={'ket' + K.id} reg={4} type="thien" cls="o-art" />
      <section className="scard">
        <header className="sc-h"><h2>{K.n}</h2><small>{K.ten}</small></header>
        <div className="sc-b">
          {K.canh && K.canh.split('\n\n').map((t, i) => <p key={i}>{t}</p>)}
          <p className="ep ket-cau">{K.cau}</p>
          <ul className="ket-hau">{K.hau.map((t, i) => <li key={i}>{t}</li>)}</ul>
        </div>
        <footer className="sc-f">
          <button className="btn" data-act="screen" data-arg="meta">Xem lại các kiếp</button>
          <button className="btn pri" data-act="tanMong">{c ? 'Bấm lần nữa: mở giấc mộng mới' : 'Tân Mộng'}</button>
        </footer>
      </section>
    </div>
  );
}
