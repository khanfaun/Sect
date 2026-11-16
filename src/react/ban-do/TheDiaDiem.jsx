// Thẻ dưới bản đồ: đang đi đường, dừng giữa đường, thẻ một quận. Thẻ địa điểm và đại khu vực nổi gần icon.
import { PS } from '../html';
import { Ic, tip } from '../chung';

function NutDiHoacVao({ n, here }) {
  const r = PS.G.run;
  if (here) return <button className="btn pri" data-act="enter">{PS.ENTER_L[n.type] || 'Vào'}</button>;
  const p = PS.findPath(r.at, n.id);
  return <button className="btn pri" data-act="go" data-arg={n.id} disabled={!p}>Đi tới{p && <span className="go-t">{' · ' + PS.durH(PS.travelHours(p))}</span>}</button>;
}

// Thông tin một quận (khi chạm ô đất trống)
function TheQuan({ c }) {
  const g = PS.geo(), I = PS.hexInfo(c);
  const close = <button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button>;
  if (I.sea) return (
    <div className="dock card nc ncs">
      <div className="nc-top"><div className="nc-tt"><b>Vân Hải</b><small>mây biển, không có đường bộ</small></div>{close}</div>
    </div>
  );
  const d = g.dist[c], cells = [];
  for (let i = 0; i < g.dist.length; i++) if (g.dist[i] === d && g.reg[i] === I.reg) cells.push(i);
  const tc = {};
  for (const i of cells) { const t = PS.TER_N[g.ter[i]]; tc[t] = (tc[t] || 0) + 1; }
  const ter = Object.keys(tc).sort((a, b) => tc[b] - tc[a]).slice(0, 3);
  const all = PS.regionOf(I.reg).nodes.filter(n => g.dist[PS.nodeHex(n)] === d), kn = all.filter(n => n.fog >= 2 || n.memory);
  const dg = kn.length ? Math.max(...kn.map(PS.dangerTag)) : 0;
  const lk = kn.length ? Math.round(kn.reduce((a, n) => a + PS.lkOf(n), 0) / kn.length) : 1;
  const luc = kn.find(n => n.type === 'tong') || kn.find(n => n.type === 'thanh') || kn.find(n => n.type === 'tran');
  return (
    <div className="dock card nc ncs">
      <div className="nc-top"><div className="nc-tt"><b>{I.dist || 'Vùng vô danh'}</b><small>quận thuộc {I.regName}</small></div>{close}</div>
      <p className="ncs-r">
        <span className={'nc-g dg' + dg}><i></i>{kn.length ? PS.DTAG[dg] : 'Chưa rõ an nguy'}</span>
        <span>Linh khí {kn.length ? PS.LK_N[lk].toLowerCase() : 'chưa rõ'}</span>
      </p>
      <p className="ncs-r">
        <span>Địa thế: <b>{ter.join(', ')}</b></span>
        <span>Trấn giữ: <b>{luc ? PS.placeMeta(luc).luc : 'chưa rõ'}</b></span>
      </p>
    </div>
  );
}

// Thẻ địa điểm: nổi gần icon trên bản đồ (game tự đặt vị trí theo data-ax/data-ay)
function TheNoi({ n }) {
  const { G, ASSET } = PS;
  const r = G.run, I = PS.nodeInfo(n), here = n.id === r.at, dg = PS.dangerTag(n);
  const nt = PS.noteOf(n.id), M = I.sure ? PS.placeMeta(n) : null;
  const where = I.sure ? PS.hexInfo(PS.nodeHex(n)).dist : '';
  const pimg = ASSET.place[n.type];
  return (
    <div className="dock card np" data-ax={n.x} data-ay={n.y}>
      <div className="np-h">
        <div className={'np-pic' + (I.sure ? '' : ' rum')}>{pimg && <img src={pimg} alt="" />}{!I.sure && <b>?</b>}</div>
        <div className="np-t">
          <b className="np-nm">{n.name + (I.sure ? '' : '?')}</b>
          <small>{[I.info, where].filter(Boolean).join(' · ')}</small>
        </div>
        <div className="np-x">
          <button className="icb" data-act="noteEdit" data-arg={n.id} {...tip('Ghi chú: ghim một dòng lên điểm này')} aria-label="Ghi chú"><Ic n="pen" /></button>
          <button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button>
        </div>
      </div>
      <div className={'np-dg dg' + dg} {...tip(PS.dangerWhy(n))}><i></i>{PS.DTAG[dg]}{I.sure ? '' : '?'}</div>
      {M ? <>
        <p className="np-k"><small>Tọa trấn</small>{M.luc}</p>
        {M.desc && <p className="np-d">{M.desc}</p>}
      </> : <p className="np-d">Mới nghe đồn, chưa tận mắt thấy.</p>}
      {I.tags.length > 0 && <p className="nc-tags">{I.tags.map((t, i) => <span key={i}>{t}</span>)}</p>}
      {nt && <p className="nc-n"><Ic n="pin" /> {nt}</p>}
      <div className="np-b"><NutDiHoacVao n={n} here={here} /></div>
    </div>
  );
}

// Thẻ mô tả một đại khu vực (khi thu nhỏ hết cỡ)
function TheVung({ pop }) {
  const R = PS.REG[pop.k], st = PS.areaStat(pop.k), cols = ['#d9a441', '#58a46f', '#4797bb', '#9a74c9', '#8196b3'];
  return (
    <div className="dock card np npv" data-area="1" data-ax={pop.wx} data-ay={pop.wy}>
      <div className="np-h">
        <div className="np-pic area" style={{ background: cols[pop.k] }}><b>{R.seal}</b></div>
        <div className="np-t"><b className="np-nm">{R.n}</b><small>{R.sub}</small></div>
        <div className="np-x"><button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button></div>
      </div>
      <p className="np-k"><small>Địa thế</small>{st.ter.join(', ')}</p>
      <p className="np-k"><small>Gồm</small>{st.quan} quận · đã khám phá {st.pct}%</p>
    </div>
  );
}

export function TheDiaDiem() {
  const { G, UI, ASSET } = PS;
  const r = G.run;
  if (r.scene && UI.evMin) {
    const e = PS.EVMAP[r.scene.id];
    return <div className="dock loc"><span className="lc-n">Đang dở: {e && e.n || 'một chuyện'}</span><button className="btn pri" data-act="evBack">Quay lại</button></div>;
  }
  if (r.dest != null && !r.moving && r.dest !== r.at) {
    const d = PS.nodeById(r.dest);
    return (
      <div className="dock go">
        <div className="dk-t"><small>Bị cản giữa đường</small><b>{d.name}</b></div>
        <button className="btn pri" data-act="goSure" data-arg={d.id}>Đi tiếp</button><button className="btn" data-act="destX">Thôi</button>
      </div>
    );
  }
  if (r.moving && r.halt) {
    const m = r.moving, dest = PS.nodeById(m.path[m.path.length - 1]), from = PS.nodeById(m.path[m.seg]);
    const I = PS.hexInfo(PS.hexAt(...PS.playerMapXY()));
    return (
      <div className="dock card">
        <div className="nc-h"><b>Dừng chân giữa đường</b><small>{I.ter} · {I.dist}</small></div>
        <p className="nc-d">Đang trên đường tới {dest.name}. Thời gian vẫn trôi.</p>
        <div className="nc-b"><button className="btn pri" data-act="goOn">Đi tiếp</button><button className="btn" data-act="turnBack">Quay lại {from.name}</button></div>
      </div>
    );
  }
  if (r.moving) {
    const m = r.moving, dest = PS.nodeById(m.path[m.path.length - 1]);
    let L = 0;
    for (let i = m.seg; i < m.path.length - 1; i++) L += PS.edgeLen(m.path[i], m.path[i + 1]) * (i === m.seg ? 1 - m.prog : 1);
    // số dặm còn lại được vòng lặp khung hình của game cập nhật thẳng vào #mvLeft
    return (
      <div className="dock go">
        <div className="dk-t"><small>Đang trên đường tới</small><b>{dest.name}</b><small id="mvLeft" dangerouslySetInnerHTML={{ __html: 'còn ' + Math.round(L) + ' dặm' }} /></div>
        <button className="btn" data-act="stop">Dừng lại</button>
      </div>
    );
  }
  const n = UI.sel != null && PS.nodeById(UI.sel);
  if (n && n.fog >= 1) return <TheNoi n={n} />;
  if (UI.pop) return <TheVung pop={UI.pop} />;
  if (UI.cell != null) return <TheQuan c={UI.cell} />;
  return null;
}
