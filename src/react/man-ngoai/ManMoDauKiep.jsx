// Trang mở đầu kiếp: tên, từng dòng chuyện hiện dần, nút lên đường. Bấm vào để hiện hết.
import { PS } from '../html';

export function ManMoDauKiep() {
  const { G, UI, LIFE_D } = PS;
  const r = G.run, L = r.story || [];
  const d = i => ({ animationDelay: (UI.lifeAll ? 0 : i * LIFE_D + 0.9).toFixed(2) + 's' });
  return (
    <div className={'lsx' + (UI.lifeAll ? ' all' : '')} data-act="lifeAll">
      <div className="lsx-b">
        <small className="lsx-k" style={d(-0.5)}>{PS.kiepName(r.kiep)}</small>
        <h1 className="lsx-h" style={d(-0.3)}>{r.ten}</h1>
        <div className="lsx-t">{L.map((x, i) => <p key={i} style={d(i)}>{x}</p>)}</div>
        <div className="lsx-go" style={d(L.length + 0.2)}><button className="btn pri big" data-act="lifeGo">Lên đường</button></div>
      </div>
    </div>
  );
}
