// Bến Vong Xuyên: tiêu điểm luân hồi, xem lại các kiếp, điển tích, thành tựu.
import { Html, PS, Tabs, Tranh } from '../html';

const TABS = [['upg', 'Khắc vào chân linh'], ['lives', 'Các kiếp'], ['lore', 'Điển tích'], ['ach', 'Thành tựu']];

function KhacChanLinh({ M }) {
  return (
    <div className="rows">
      {PS.UPG.map(u => {
        const lv = M.upg[u.id] || 0, mx = lv >= u.max, c = mx ? 0 : u.c[lv];
        return (
          <div className="row" key={u.id}>
            <span className="r-t"><b>{u.n}</b><small>{u.d}</small><span className="pips">{'●'.repeat(lv)}{'○'.repeat(u.max - lv)}</span></span>
            {mx ? <span className="r-x">đã đủ</span>
              : <button className="btn sm" data-act="upg" data-arg={u.id} disabled={M.pts < c}>Khắc · {c} điểm</button>}
          </div>
        );
      })}
    </div>
  );
}

function CacKiep({ M }) {
  if (!M.lives.length) return <p className="empty">Chưa có kiếp nào kết thúc.</p>;
  return M.lives.map((L, i) => (
    <details className="life" key={i}>
      <summary><b>{L.ten}</b><small>{PS.kiepName(L.k)} · {L.tuoi} tuổi · {L.realm}</small></summary>
      <p className="ep">{L.ep}</p>
      {L.lines.map((l, j) => <p key={j}>{l}</p>)}
    </details>
  ));
}

function DienTich({ M }) {
  const LORE = PS.LORE, ks = Object.keys(LORE);
  return <>
    <p className="hint">Đã biết {M.lore.length}/{ks.length}</p>
    {ks.map(k => M.lore.includes(k)
      ? <details className="life" key={k}><summary><b>{LORE[k].n}</b></summary><p>{LORE[k].t}</p></details>
      : <div className="life lock" key={k}>chưa biết</div>)}
  </>;
}

function ThanhTuu({ M }) {
  const ACH = PS.ACH;
  return <>
    <p className="hint">Đạt {M.ach.length}/{ACH.length}</p>
    <div className="rows">
      {ACH.map(a => {
        const got = M.ach.includes(a.id);
        return (
          <div className={'row' + (got ? ' taken' : ' dim')} key={a.id}>
            <Html className="r-i" h={got ? PS.ic('check') : ''} />
            <span className="r-t"><b>{a.n}</b><small>{a.d}</small></span>
          </div>
        );
      })}
    </div>
  </>;
}

export function ManBenVongXuyen() {
  const { G, UI } = PS;
  const M = G.meta, tab = UI.tab.meta || 'upg';
  const body = { upg: KhacChanLinh, lives: CacKiep, lore: DienTich, ach: ThanhTuu }[tab];
  const Body = body || (() => null);
  return (
    <div className="meta">
      <Tranh seed="ben-vong-xuyen" reg={3} type="song" cls="m-art" figs="nhan:0.62:0.42:1:laodo" />
      <section className="win tall">
        <header className="win-h"><h2>Bến Vong Xuyên</h2><span className="m-pts">{M.pts} điểm luân hồi</span></header>
        <div className="win-b">
          <p className="m-in">Lão Đò neo thuyền bên bến, chờ ngươi bày ra những gì còn mang theo được.</p>
          <Tabs k="meta" list={TABS} cur={tab} />
          <Body M={M} />
        </div>
        <footer className="win-f"><span className="grow"></span><button className="btn pri" data-act="screen" data-arg="title">Rời bến</button></footer>
      </section>
    </div>
  );
}
