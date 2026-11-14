// Trà lâu, khách điếm, tửu phường…: lời giới thiệu và danh sách việc có thể làm.
import { Html, PS } from '../html';
import { Cost, Ic } from '../chung';

export function NoiChonViec({ n, v }) {
  const L = PS.venueOpts(n, v);
  // câu giới thiệu chọn một lần rồi giữ cố định cho nơi đó
  const vi = (n.vin && n.vin[v]) || (n.vin = n.vin || {}, n.vin[v] = PS.pick(PS.VENUE_IN[v]));
  return (
    <div className="venue">
      <div className="vn-h"><b>{PS.VENUE_N[v]}</b><button className="xb sm" data-act="vclose" aria-label="Rời đi"><Ic n="close" /></button></div>
      <Html as="p" className="vn-in" h={PS.txt(vi)} />
      <div className="vn-l">
        {L.map((o, i) => (
          <button key={o.id} className={'vn-o' + (o.spec ? ' spec' : '') + (o.lack || o.no ? ' dim' : '')} data-act="vopt" data-arg={o.id}>
            <span className="vn-t"><span className="vn-k">{i + 1}.</span>{o.l}</span>
            <span className="vn-c">
              {!!o.spec && <span className="vn-sp"><Ic n="hour" />còn {PS.durH(o.spec)}</span>}
              <Cost h={o.h} st={o.st} />
              {o.req && <span className={'vn-rq' + (o.lack ? ' bad' : '')}>{o.req[2]} {o.req[1]}</span>}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}
