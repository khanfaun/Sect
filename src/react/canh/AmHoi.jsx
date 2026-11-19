// Sửa-I câu 39 + Sửa-J câu 42/42b: U Minh Ám Hội — lần lượt từng món trên bàn, đấu nhiều vòng, đếm ngược thời gian thật.
// Dữ liệu do amView() (core2/58-am-hoi.js) dựng sẵn; đồng hồ chạy bằng amTick() mỗi phần tư giây.
import { useEffect, useState } from 'react';
import { PS } from '../html';
import { Card } from './Khung';

export function AmHoi() {
  const [, setN] = useState(0);
  useEffect(() => {
    const iv = setInterval(() => { if (PS.amTick()) PS.render(); else setN(n => n + 1); }, 250);
    return () => clearInterval(iv);
  }, []);
  const V = PS.amView();
  if (!V) return null;
  const T = PS.contentText;
  const head = <span className="am-luot">{V.luot}</span>;
  return (
    <Card title={T('amh.n')} sub={V.ltTxt} head={head} cls="amhoi">
      {V.lo && (
        <div className="am-lo">
          <p className="am-ai">{V.lo.ai}</p>
          <p className="am-mon"><span className="am-ic">{V.lo.ic}</span> <b>{V.lo.n}</b> {V.lo.nghi && <span className="no">{V.lo.nghi}</span>}</p>
          <p className="am-gia">{T('amh.gia')}: <b>{V.lo.gia}</b> · <small>{V.lo.dan}</small></p>
          {V.con != null && <p className="am-dem"><b>{T('amh.dem', [V.con])}</b></p>}
        </div>
      )}
      {V.muon.length > 0 && <>
        <p className="hint">{T('amh.muon')}</p>
        <div className="choices am-muon">
          {V.muon.map(m => (
            <button key={m.a} className={'ch' + (m.no ? ' soft' : '')} data-act="am" data-arg={m.a} disabled={!!m.no}>
              <span className="cn">{m.ic}</span><span className="ct">{m.l}</span>
              {m.no && m.no !== '-' && <span className="cx no">{m.no}</span>}
            </button>
          ))}
        </div>
      </>}
      {V.tl && (
        <div className="am-tl">
          <p className="hint">{T('amh.thuong')}</p>
          <p><span className="am-ic">{V.tl.ic}</span> <b>{V.tl.n}</b> ×{V.tl.sl} <small>/ {V.tl.max}</small></p>
          <p><small>{T('amh.tlGia', [V.tl.gia, V.tl.can])}</small></p>
          <div className="choices am-sl">
            {[-5, -1, 1, 5].map(d => <button key={d} className="ch soft" data-act="am" data-arg={'tlsl=' + d}><span className="ct">{d > 0 ? '+' + d : d}</span></button>)}
            <button className={'ch' + (V.tl.no ? ' soft' : '')} data-act="am" data-arg="tlgo" disabled={!!V.tl.no}><span className="ct">{T('amh.tlTra')}</span>{V.tl.no && <span className="cx no">{V.tl.no}</span>}</button>
            <button className="ch soft" data-act="am" data-arg="tl="><span className="ct">{T('amh.tlDoi')}</span></button>
          </div>
        </div>
      )}
      {V.hoi && <p className="hint">{V.hoi}</p>}
      {V.mine.length > 0 && <>
        {V.ph === 'lot' && <p className="hint">{T('amh.thuong')}</p>}
        <div className="choices am-tui">
          {V.mine.map(m => (
            <button key={m.key} className={'ch' + (m.no ? ' soft' : '')} data-act="am" data-arg={m.a} disabled={!!m.no}>
              <span className="cn">{m.ic}</span><span className="ct">{m.n}</span>
              {m.no && <span className="cx no">{m.no}</span>}
            </button>
          ))}
        </div>
      </>}
      <div className="choices am-nut">
        {V.btn.map((b, i) => (
          <button key={b.a} className={'ch' + (b.no ? ' soft' : '')} data-act="am" data-arg={b.a} disabled={!!b.no}>
            <span className="cn">{i + 1}.</span><span className="ct">{b.l}</span>
            {b.no && <span className="cx no">{b.no}</span>}
          </button>
        ))}
        {V.ph !== 'xong' && <button className="ch soft" data-act="am" data-arg="roi"><span className="cn">×</span><span className="ct">{T('amh.roi')}</span></button>}
      </div>
      <div className="story am-log">{V.log.map((t, i) => <p key={i} className={i === V.log.length - 1 ? 'new' : ''}>{t}</p>)}</div>
    </Card>
  );
}
