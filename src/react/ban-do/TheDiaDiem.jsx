// Thẻ dưới bản đồ: đang đi đường, dừng giữa đường, thẻ một quận. Thẻ địa điểm và đại khu vực nổi gần icon.
import { PS } from '../html';
import { Ic, tip, Ke } from '../chung';

function NutDiHoacVao({ n, here }) {
  const r = PS.G.run;
  if (here) return <button className="btn pri" data-act="enter">{PS.ENTER_L[n.type] || 'Vào'}</button>;
  const p = PS.findPath(r.at, n.id);
  return <button className="btn pri" data-act="go" data-arg={n.id} disabled={!p}>Đi tới{p && <span className="go-t">{' · ' + PS.durH(PS.travelHours(p))}</span>}</button>;
}

const TER_DESC = [
  'Mây biển cuồn cuộn, không có đường bộ.',
  'Đất bằng, đường dễ đi.',
  'Rừng rậm, đi chậm và dễ lạc hướng.',
  'Núi cao hiểm trở, lên dốc rất tốn sức.',
  'Sông nước, lội qua rất chậm.',
  'Hồ nước mênh mông, không đi bộ được.',
  'Đồi thoai thoải, đi hơi chậm.',
  'Đầm lầy sình lún, đi chậm và nhiều hiểm họa.',
];
const TER_COL = ['#8fa9bd', '#c9b27a', '#58a46f', '#8a8f98', '#4797bb', '#5f8fb3', '#b59a5a', '#7c8a5a'];

// Nút thu gọn / nút đóng dùng chung cho thẻ nổi
function NutThe({ n, hold }) {
  if (hold) return null;
  const min = !!PS.UI.npMin;
  return (
    <div className="np-x">
      {n && <button className="icb" data-act="noteEdit" data-arg={n.id} {...tip('Ghi chú: ghim một dòng lên điểm này')} aria-label="Ghi chú"><Ic n="pen" /></button>}
      <button className="icb" data-act="npMin" {...tip(min ? 'Mở rộng thẻ' : 'Thu gọn thẻ')} aria-label="Thu gọn"><Ic n={min ? 'down' : 'up'} /></button>
      <button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button>
    </div>
  );
}

// Thẻ một quận (khi xem ở mức thấy quận)
function TheQuan({ c }) {
  const g = PS.geo(), I = PS.hexInfo(c), [cx, cy] = PS.hexCenter(c);
  if (I.sea) return (
    <div className="dock card np" data-ax={cx} data-ay={cy}>
      <div className="np-h"><div className="np-t"><b className="np-nm">Vân Hải</b><small>mây biển, không có đường bộ</small></div><NutThe /></div>
    </div>
  );
  const d = g.dist[c], cells = [];
  for (let i = 0; i < g.dist.length; i++) if (g.dist[i] === d && g.reg[i] === I.reg) cells.push(i);
  const tc = {};
  for (const i of cells) { const t = PS.TER_N[g.ter[i]]; tc[t] = (tc[t] || 0) + 1; }
  const ter = Object.keys(tc).sort((a, b) => tc[b] - tc[a]).slice(0, 3);
  const all = PS.regionOf(I.reg).nodes.filter(n => g.dist[PS.nodeHex(n)] === d), kn = all.filter(n => n.fog >= 2 || n.memory);
  const dg = kn.length ? Math.max(...kn.map(PS.dangerTag)) : 0;
  const luc = kn.find(n => n.type === 'tong') || kn.find(n => n.type === 'thanh') || kn.find(n => n.type === 'tran');
  return (
    <div className={'dock card np' + (PS.UI.npMin ? ' min' : '')} data-ax={cx} data-ay={cy}>
      <div className="np-h"><div className="np-t"><b className="np-nm">{I.dist || 'Vùng vô danh'}</b><small>quận thuộc {I.regName}</small></div><NutThe /></div>
      <div className={'np-dg dg' + dg}><i></i>{kn.length ? PS.DTAG[dg] : 'Chưa rõ an nguy'}</div>
      {!PS.UI.npMin && <>
        <p className="np-k"><small>Địa thế</small>{ter.join(', ')}</p>
        <p className="np-k"><small>Trấn giữ</small>{luc ? PS.placeMeta(luc).luc : 'chưa rõ'}</p>
      </>}
    </div>
  );
}

// Thẻ một ô đất bất kỳ (không phải địa điểm): mô tả và nút đi tới
function TheO({ c, hold }) {
  const g = PS.geo(), I = PS.hexInfo(c), [cx, cy] = PS.hexCenter(c), t = g.ter[c], min = !!PS.UI.npMin;
  const walk = !I.sea && PS.terWalk(t), seen = PS.hexSeen(c), d = walk ? PS.wpDraft(c) : null;
  const dg = d ? PS.dangerTag(d) : 0, h = walk ? PS.cellHours(c) : null;
  const here = h === 0;
  return (
    <div className={'dock card np' + (min && !hold ? ' min' : '') + (hold ? ' hold' : '')} data-ax={hold ? hold.x : cx} data-ay={hold ? hold.y : cy} data-ic={hold ? 46 : undefined}>
      <div className="np-h">
        <div className="np-pic ter" style={{ background: TER_COL[t] }}><Ic n="hex" /></div>
        <div className="np-t">
          <b className="np-nm">{seen || !walk ? PS.TER_N[t] : 'Vùng chưa khám phá'}</b>
          <small>{[I.dist, I.regName].filter(Boolean).join(' · ')}</small>
        </div>
        <NutThe hold={hold} />
      </div>
      {d && <div className={'np-dg dg' + dg} {...tip('Mức nguy hiểm so với tu vi của ngươi')}><i></i>{PS.DTAG[dg]}{seen ? '' : '?'}</div>}
      {(!min || hold) && <p className="np-d">{seen || !walk ? TER_DESC[t] : 'Chưa ai biết ở đó có gì. Đi tới mới rõ.'}</p>}
      {hold ? (walk && !here && <p className="np-k"><small>Đường đi</small>{PS.durH(h)}</p>) : <div className="np-b">
        {!walk ? <button className="btn" disabled>Không đi được</button>
          : here ? <button className="btn" disabled>Ngươi đang ở đây</button>
          : <button className="btn pri" data-act="goCell" data-arg={c}>Đi tới<span className="go-t">{' · ' + PS.durH(h)}</span></button>}
      </div>}
    </div>
  );
}

// Thẻ địa điểm: nổi gần icon trên bản đồ (game tự đặt vị trí theo data-ax/data-ay)
function TheNoi({ n, hold }) {
  const { G, ASSET } = PS;
  const r = G.run, I = PS.nodeInfo(n), here = n.id === r.at, dg = PS.dangerTag(n);
  const nt = PS.noteOf(n.id), M = I.sure ? PS.placeMeta(n) : null;
  const where = I.sure ? PS.hexInfo(PS.nodeHex(n)).dist : '';
  const pimg = ASSET.place[n.type];
  return (
    <div className={'dock card np' + (PS.UI.npMin && !hold ? ' min' : '') + (hold ? ' hold' : '')} data-ax={hold ? hold.x : n.x} data-ay={hold ? hold.y : n.y} data-ic={hold ? 46 : undefined}>
      <div className="np-h">
        <div className={'np-pic' + (I.sure ? '' : ' rum')}>{pimg && <img src={pimg} alt="" />}{!I.sure && <b>?</b>}</div>
        <div className="np-t">
          <b className="np-nm">{n.name + (I.sure ? '' : '?')}</b>
          <small>{[I.info, where].filter(Boolean).join(' · ')}</small>
        </div>
        <NutThe n={n} hold={hold} />
      </div>
      <div className={'np-dg dg' + dg} {...tip(PS.dangerWhy(n))}><i></i>{PS.DTAG[dg]}{I.sure ? '' : '?'}</div>
      {(!PS.UI.npMin || hold) && <>
        {M ? <>
          <p className="np-k"><small>Tọa trấn</small>{M.luc}</p>
          <Ke className="np-d" t={M.desc} />
        </> : <p className="np-d">Mới nghe đồn, chưa tận mắt thấy.</p>}
        {I.tags.length > 0 && <p className="nc-tags">{I.tags.map((t, i) => <span key={i}>{t}</span>)}</p>}
        {nt && <p className="nc-n"><Ic n="pin" /> {nt}</p>}
      </>}
      {hold ? (!here && <p className="np-k"><small>Đường đi</small>{PS.durH(PS.travelHours(PS.findPath(r.at, n.id)))}</p>) : <div className="np-b"><NutDiHoacVao n={n} here={here} /></div>}
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
  if (UI.hold) { const h = UI.hold; return h.n != null ? <TheNoi n={PS.nodeById(h.n)} hold={h} /> : <TheO c={h.c} hold={h} />; }
  const n = UI.sel != null && PS.nodeById(UI.sel);
  if (n && n.fog >= 1) return <TheNoi n={n} />;
  if (UI.pop) return <TheVung pop={UI.pop} />;
  if (UI.cell != null) return PS.Map2.zf < 0.5 ? <TheQuan c={UI.cell} /> : <TheO c={UI.cell} />;
  return null;
}
