// Sự kiện dọc đường khi làm nhiệm vụ, và kỳ ngộ: một đoạn kể, vài lựa chọn, rồi kết quả.
import { Html, PS } from '../html';
import { Chips, Cost } from '../chung';
import { Card, GoBtn } from './Khung';

// Kết quả sau khi chọn: lựa chọn đã chọn + lời kể + phần được/mất
function KetQua({ sc }) {
  return <>
    <div className="story"><div className="ev-q"><p className="ev-c">› {sc.res.l}</p><Html as="p" h={PS.txt(sc.res.t)} /></div></div>
    <Chips list={sc.chips} />
  </>;
}

export function DocDuong({ sc }) {
  const r = PS.G.run, q = r.quests.find(x => x.id === sc.q);
  const head = <>
    <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} /></div>
    {q && <p className="hint">Nhiệm vụ: {q.text}</p>}
  </>;
  if (sc.res) return <Card title="Trên đường làm nhiệm vụ" sub={r.place.n} foot={<GoBtn act="qevDone" label="Tiếp tục" />}>{head}<KetQua sc={sc} /></Card>;
  return (
    <Card title="Trên đường làm nhiệm vụ" sub={r.place.n}>
      {head}
      <div className="choices">
        {PS.qevOpts(sc).map((o, i) => {
          const off = o.lack || o.no;
          return (
            <button key={i} className={'ch' + (off ? ' soft' : '')} data-act="qevPick" data-arg={i} disabled={!!off}>
              <span className="cn">{i + 1}.</span><span className="ct">{o.l}</span>
              {o.fight && <span className="cx">phải đánh</span>}
              {(o.h || o.st) ? <span className="cx"><Cost h={o.h} st={o.st} /></span> : null}
              {o.lack && <span className="cx no">{o.lack}</span>}
            </button>
          );
        })}
      </div>
    </Card>
  );
}

export function KyNgo({ sc }) {
  const ev = PS.KYNGO.find(x => x.id === sc.ev);
  // loại vớ vẩn cũng ghi "hữu duyên" cho người chơi mắc lừa
  const head = <>
    <p className={'ky-tag' + (ev.paid ? ' paid' : '')}>{ev.paid ? 'Kỳ ngộ · phải trả giá' : 'Kỳ ngộ · hữu duyên'}</p>
    <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} /></div>
  </>;
  if (sc.res) return <Card title={ev.n} sub="" cls="kyngo" foot={<GoBtn act="kyDone" label="Tiếp tục" />}>{head}<KetQua sc={sc} /></Card>;
  return (
    <Card title={ev.n} sub="" cls="kyngo">
      {head}
      <div className="choices">
        {PS.kyOpts(sc).map((o, i) => (
          <button key={i} className={'ch' + (o.no ? ' soft' : '')} data-act="kyPick" data-arg={i} disabled={!!o.no}>
            <span className="cn">{i + 1}.</span><span className="ct">{o.l}</span>
            {o.cost && <span className="cx no">{o.cost}</span>}
            {o.no && <span className="cx no">{o.no}</span>}
          </button>
        ))}
      </div>
    </Card>
  );
}
