// Màn khí vận sau khi đột phá / xung kích thành công: lóe sáng → (chọn hậu thiên khí vận) → kết quả.
// Và hộp chọn tiên thiên khí vận sau khi đột phá đại cảnh giới.
import { Html, PS } from '../html';
import { tah } from '../chung';

// Khung nền; key theo bước để mỗi bước dựng lại từ đầu, hiệu ứng chạy lại như bản cũ
function Khung({ k, ph, children }) {
  return <div className={'asc asc-' + k + ' ph-' + ph}><div className="asc-bg"></div>{children}</div>;
}

export function KhiVan() {
  const { G, UI, CFG, HTMAP, HT_RANK } = PS;
  const r = G.run, a = r.asc;
  if (!a._id) a._id = Date.now();
  // lần đầu thấy màn này: lóe sáng, rung màn, hẹn giờ chuyển sang bước sau (giống ascHTML())
  if (UI.ascId !== a._id) {
    UI.ascId = a._id; UI.ascPh = 'flash'; UI.ascSel = null; clearTimeout(UI.ascT);
    const ms = CFG.anim === false ? 200 : a.k === 'bt' ? 3000 : 1600;
    document.documentElement.dataset.ascShake = a.k;
    setTimeout(() => { delete document.documentElement.dataset.ascShake; }, ms);
    UI.ascT = setTimeout(() => { UI.ascPh = a.k === 'bt' && r.htPick ? 'pick' : 'res'; PS.render(); }, ms);
  }
  const ph = UI.ascPh;
  if (ph === 'flash') return <Khung key={ph} k={a.k} ph={ph}><div className="asc-glow"></div>{a.k === 'bt' && <div className="asc-rays"></div>}</Khung>;
  if (ph === 'pick') {
    const sel = UI.ascSel, x = sel != null ? HTMAP[r.htPick[sel]] : null;
    return (
      <Khung key={ph} k={a.k} ph={ph}>
        <div className="asc-in">
          <small>Thiên địa cảm ứng</small><h2>Hậu thiên khí vận</h2>
          <p>{a.kiep ? 'Kiếp nạn đã qua, cơ' : 'Quan ải đã phá, cơ'} duyên hiện trước mắt. Ba luồng khí vận lơ lửng giữa không trung, chỉ có thể nắm lấy một.</p>
          <div className="htp">
            {r.htPick.map((id, i) => {
              const h = HTMAP[id];
              return (
                <button key={i} className={'hto r' + h.r + (sel === i ? ' sel' : '')} data-act="ascSel" data-arg={i}>
                  <small>{HT_RANK[h.r]}</small><b>{h.n}</b>
                  <p>{PS.htFxText(h).map((t, k) => [k > 0 && <br key={'b' + k} />, t])}</p>
                </button>
              );
            })}
          </div>
        </div>
        {x && (
          <div className="asc-cf"><div className="mbox">
            <h3>Nắm lấy {x.n}?</h3>
            <p>{PS.htFxText(x).map((t, k) => [k > 0 && <br key={'b' + k} />, t])}</p>
            <p className="hint">Chọn rồi không đổi được.</p>
            <div className="mb-f"><button className="btn" data-act="ascSel" data-arg="-1">Nghĩ lại</button><span className="grow"></span><button className="btn pri" data-act="ascPick">Xác nhận</button></div>
          </div></div>
        )}
      </Khung>
    );
  }
  const img = a.k === 'bt' ? PS.ascPlaceImg(a) : '';
  const ht = a.ht && HTMAP[a.ht];
  return (
    <Khung key={ph} k={a.k} ph={ph}>
      <div className="asc-in res">
        {img && <div className="asc-img"><img src={img} alt="" /></div>}
        <small>{a.k === 'bt' ? 'Đột phá thành công' : 'Xung kích thành công'}</small>
        <h2 className="asc-to"><span>{a.to}</span></h2>
        <div className="asc-st">{PS.ascStory(a).map((t, i) => <p key={i}>{t}</p>)}</div>
        {ht && <p className="asc-ht">Hậu thiên khí vận <span className={'ht-tag r' + ht.r} {...tah(PS.htTipH(ht))}>{ht.n}</span></p>}
        <Html style={{ display: 'contents' }} h={PS.ascDiffHTML(a)} />
        <button className="btn pri big" data-act="ascDone">Tiếp tục</button>
      </div>
    </Khung>
  );
}

export function ChonTienThien() {
  const { G, TT_DEST, TT_COL, TT_RANK } = PS;
  return (
    <div className="mbox kvpick">
      <h3>Khí vận hội tụ</h3>
      <p className="hint">Đột phá thành công, thiên địa cảm ứng. Chọn một tiên thiên khí vận.</p>
      <div className="kvp">
        {G.run.kvPick.map((id, i) => {
          const d = TT_DEST[id];
          return (
            <button key={i} className="kvo" data-act="kvPick" data-arg={i} style={{ '--pc': TT_COL[d.rank] }}>
              <span className="kvh"><b>{d.name}</b><small>{TT_RANK[d.rank]}</small></span>
              <p>{d.description}</p>
              <p className="kvf">{PS.ttFxText(d).map((t, k) => [k > 0 && <br key={'b' + k} />, t])}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
