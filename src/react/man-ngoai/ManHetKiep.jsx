// Một đời đã hết: lời kết, văn bia, điểm luân hồi nhận được.
import { Html, PS, Tranh } from '../html';

// Bến Vong Xuyên (Đ10): "Uống canh, đi ngay" / "Ngồi đợi" (nghe Người Gác Bến, có thể nhặt Mộng Ấn #1)
function BenVongXuyen() {
  const b = PS.benView();
  if (!b) return null;
  return (
    <div className="ben-vx">
      <h4>Bến Vong Xuyên</h4>
      {b.mim && <p className="ben-mim">{b.mim}</p>}
      <p className="ben-vao">{b.vao}</p>
      {b.st === 'chon' && <div className="ben-chon">
        <button className="btn" data-act="benUong">Uống canh, đi ngay</button>
        <button className="btn" data-act="benDoi">Ngồi đợi</button>
      </div>}
      {b.st === 'doi' && <>
        <p className="ben-dong">{b.dong}</p>
        <button className="btn sm" data-act="benTiep">{b.con ? 'Nghe tiếp' : 'Ngồi tới khi đò tới'}</button>
      </>}
      {(b.st === 'uong' || b.st === 'xong') && <p className="ben-t">{b.t}</p>}
      {b.mong && <p className="ben-mong"><b>{b.mong}</b></p>}
      {b.them > 0 && b.st !== 'chon' && <p className="hint">Ngồi đợi bên bến, thế gian bên kia trôi thêm một quãng.</p>}
    </div>
  );
}

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
          {!!o.gap && <p className="hint gap-loi">{PS.gapLoi(o.gap)} Thế gian vẫn tiếp tục. Nay là năm {PS.tYear(PS.W().t)}.</p>}
          <Html as="div" className="kvl" h={rows} />
          {o.ends && o.ends.length > 0 && <div className="dm-ends"><h4>Kết lớn của đời này</h4><ul>{PS.dmEndsName(o.ends).map((t, i) => <li key={i}>{t}</li>)}</ul></div>}
          {o.ketCanh && <div className="dm-ket1">{o.ketCanh.split('\n\n').map((t, i) => <p key={i} className={i ? 'ep' : ''}>{t}</p>)}</div>}
          {o.end01 === 'chua' && <p className="hint dm-chua">Đời chưa kịp gọi tên.</p>}
          {o.ngHong && <p className="hint">{o.ngHong}</p>}
          {o.hqMuon && o.hqMuon.length > 0 && <div className="dm-muon"><h4>{PS.contentText('dm.hqMuonH')}</h4>{o.hqMuon.map((t, i) => <p key={i} className="ep">{t}</p>)}</div>}
          {o.ngKet && <div className="ng-ket"><h4>{PS.contentText('nd2.ngKet')}: {o.ngKet.n} — {o.ngKet.bac}</h4><p><b>{o.ngKet.ten}</b></p><p>{o.ngKet.t}</p></div>}
          {o.tuKet && <div className="ng-ket tu-ket"><h4>{PS.contentText('ntu.ketH')}: {o.tuKet.n}</h4><p><b>{o.tuKet.ten}</b></p>{o.tuKet.canh.map((t, i) => <p key={i}>{t}</p>)}</div>}
          {o.qc && o.qc.length > 0 && <div className="qc-left"><h4>{PS.contentText('nq.qc.title')}</h4><p className="hint">{PS.contentText('nq.qc.hint')}</p><ul>{o.qc.map((t, i) => <li key={i}>{t}</li>)}</ul></div>}
          <BenVongXuyen />
        </div>
        <footer className="sc-f">{(!o.ben || o.ben.st === 'uong' || o.ben.st === 'xong') && <button className="btn pri wide" data-act="overNext">Luân hồi</button>}</footer>
      </section>
    </div>
  );
}
