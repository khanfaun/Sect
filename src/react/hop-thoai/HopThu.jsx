// Hộp thư: lời công trình ngươi sở hữu gửi về mỗi tháng; nhận ở đâu cũng được (core2/77-loi-ct-hop-thu.js).
import { PS } from '../html';

export function HopThu() {
  const r = PS.G.run, T = PS.hopTong(r);
  const vat = [];
  if (T.an.length) vat.push(T.an.length + ' món ăn');
  if (T.pill.length) vat.push(T.pill.length + ' viên đan');
  const nv = Object.values(T.vat).reduce((a, b) => a + b, 0);
  if (nv) vat.push(nv + ' vật liệu');
  if (T.tin.length) vat.push(T.tin.length + ' tin về nơi chốn');
  return (
    <div className="mbox hopthu">
      <h3>{PS.contentText('hop.ten')}</h3>
      {!T.so ? <p className="hint">{PS.contentText('hop.trong')}</p> : <>
        <p className="hint">{T.so} tháng lời đang chờ nhận.</p>
        <ul className="hop-ds">
          {T.dong.map((d, i) => <li key={i}><b>{d.ct}</b> ở {d.noi}: {[d.bac ? PS.fmtBac(d.bac) : '', d.lt ? d.lt + ' linh thạch' : ''].filter(Boolean).join(', ')}</li>)}
        </ul>
        <p className="pc-row"><small>Tổng</small>{[T.bac ? PS.fmtBac(T.bac) : '', T.lt ? T.lt + ' linh thạch' : ''].concat(vat).filter(Boolean).join(' · ')}</p>
      </>}
      <div className="mb-f"><button className="btn" data-act="modalX">Đóng</button>{T.so > 0 && <button className="btn pri" data-act="hopNhan">Nhận hết</button>}</div>
    </div>
  );
}
