// Sửa-I câu 39: U Minh Ám Hội — buổi họp kín, lần lượt từng món trên bàn; dữ liệu do amView() (core2/58-am-hoi.js) dựng sẵn.
import { PS } from '../html';
import { Card } from './Khung';

export function AmHoi() {
  const V = PS.amView();
  if (!V) return null;
  const head = <span className="am-luot">{V.luot}</span>;
  return (
    <Card title={PS.contentText('amh.n')} sub={V.ltTxt} head={head} cls="amhoi">
      {V.lo && (
        <div className="am-lo">
          <p className="am-ai">{V.lo.ai}</p>
          <p className="am-mon"><span className="am-ic">{V.lo.ic}</span> <b>{V.lo.n}</b> {V.lo.nghi && <span className="no">{V.lo.nghi}</span>}</p>
          <p className="am-gia">{PS.contentText('amh.gia')}: <b>{V.lo.gia}</b> · <small>{V.lo.dan}</small></p>
        </div>
      )}
      {V.hoi && <p className="hint">{V.hoi}</p>}
      {V.mine.length > 0 && (
        <div className="choices am-tui">
          {V.mine.map((m, i) => (
            <button key={m.key} className={'ch' + (m.no ? ' soft' : '')} data-act="am" data-arg={m.a} disabled={!!m.no}>
              <span className="cn">{m.ic}</span><span className="ct">{m.n}</span>
              {m.no && <span className="cx no">{m.no}</span>}
            </button>
          ))}
        </div>
      )}
      <div className="choices am-nut">
        {V.btn.map((b, i) => (
          <button key={b.a} className={'ch' + (b.no ? ' soft' : '')} data-act="am" data-arg={b.a} disabled={!!b.no}>
            <span className="cn">{i + 1}.</span><span className="ct">{b.l}</span>
            {b.no && <span className="cx no">{b.no}</span>}
          </button>
        ))}
        {V.ph !== 'xong' && <button className="ch soft" data-act="am" data-arg="roi"><span className="cn">×</span><span className="ct">{PS.contentText('amh.roi')}</span></button>}
      </div>
      <div className="story am-log">{V.log.map((t, i) => <p key={i} className={i === V.log.length - 1 ? 'new' : ''}>{t}</p>)}</div>
    </Card>
  );
}
