// Chọn một trong các lá số (xuất thân, linh căn, mệnh cách) để đầu thai.
import { Html, PS } from '../html';

export function ManChonKiep() {
  const { G, ORIGIN, TRAIT, ROOT } = PS;
  return (
    <div className="birth">
      <h2>Chọn một kiếp</h2>
      <p className="hint">Mỗi lá số là một xuất thân, một linh căn, một mệnh cách. Chọn rồi không đổi được.</p>
      <div className="fates">
        {G.birth.cards.map((c, i) => {
          const og = ORIGIN.find(o => o.id === c.origin), tr = TRAIT.find(t => t.id === c.trait), R0 = ROOT.find(x => x.id === c.root.id);
          return (
            <button key={i} className="fate" data-act="born" data-arg={i}>
              <span className="f-n"><b>{c.ten}</b><small>{c.g === 'nam' ? 'nam' : 'nữ'} · quê {c.que}</small></span>
              <span className="f-r"><i>Xuất thân</i><b>{og.n}</b><small>{og.d}</small></span>
              <span className="f-r"><i>Linh căn</i><Html as="b" h={c.root.els.map(e => PS.elSeal(e)).join('') + ' ' + PS.esc(R0.n)} /><small>{R0.d}</small></span>
              <span className="f-r"><i>Mệnh cách</i><b>{tr.n}</b><small>{tr.d}</small></span>
            </button>
          );
        })}
      </div>
      <button className="lnk" data-act="screen" data-arg="title">Quay lại</button>
    </div>
  );
}
