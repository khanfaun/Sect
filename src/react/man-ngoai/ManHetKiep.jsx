// Một đời đã hết: lời kết, văn bia, điểm luân hồi nhận được.
import { Html, PS, Tranh } from '../html';

export function ManHetKiep() {
  const { G } = PS;
  const o = G.over, L = o.life, phi = o.cause === 'phithang';
  const rows = o.pts.map(([n, v]) => PS.kvRow(PS.esc(n), '+' + v)).join('')
    + PS.kvRow('Một kiếp khổ cũng là một kiếp', '+1')
    + PS.kvRow('<b>Điểm luân hồi</b>', '<b>+' + L.pts + '</b>', '', 'tot');
  return (
    <div className="over">
      <Tranh seed={'over' + L.ten} reg={phi ? 4 : (L._mr || 0)} type={phi ? 'thien' : 'phe'} cls="o-art" />
      <section className="scard">
        <header className="sc-h"><h2>{L.ten} — một đời đã hết</h2><small>{o.title}</small></header>
        <div className="sc-b">
          <p>{L.lines[L.lines.length - 1]}</p>
          <p className="ep">{L.ep}</p>
          {!!o.gap && <p className="hint">{o.gap} năm sau, thế gian vẫn tiếp tục. Nay là năm {PS.tYear(PS.W().t)}.</p>}
          <Html as="div" className="kvl" h={rows} />
        </div>
        <footer className="sc-f"><button className="btn pri wide" data-act="overNext">Luân hồi</button></footer>
      </section>
    </div>
  );
}
