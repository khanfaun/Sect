// Thẻ dưới bản đồ: đang đi đường, dừng giữa đường, thẻ một địa điểm (thu gọn / mở rộng), thẻ một quận.
import { PS } from '../html';
import { Ic, tip } from '../chung';

function NutDiHoacVao({ n, here }) {
  const r = PS.G.run;
  if (here) return <button className="btn pri" data-act="enter">{PS.ENTER_L[n.type] || 'Vào'}</button>;
  return <button className="btn pri" data-act="go" data-arg={n.id} disabled={!PS.findPath(r.at, n.id)}>Đi tới</button>;
}

// Thông tin một quận (khi chạm ô đất trống)
function TheQuan({ c }) {
  const g = PS.geo(), I = PS.hexInfo(c);
  const close = <button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button>;
  if (I.sea) return (
    <div className="dock card nc">
      <div className="nc-top"><div className="nc-tt"><b>Vô Tận Hải</b><small>biển khơi</small></div>{close}</div>
      <p className="nc-d">Không có đường bộ. Đi ngang qua tốn gấp sáu lần đồng bằng.</p>
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
    <div className="dock card nc">
      <div className="nc-top"><div className="nc-tt"><b>{I.dist || 'Vùng vô danh'}</b><small>quận thuộc {I.regName}</small></div>{close}</div>
      <p className="nc-m">
        <span className={'nc-g dg' + dg}><i></i>{kn.length ? PS.DTAG[dg] : 'chưa rõ'}</span>
        <span>linh khí {kn.length ? PS.LK_N[lk].toLowerCase() : 'chưa rõ'}</span>
        <span>rộng {cells.length} ô</span>
      </p>
      <div className="nc-kv">
        <div><small>Địa thế</small><b>{ter.join(', ')}</b></div>
        <div><small>Trấn giữ</small><b>{luc ? PS.placeMeta(luc).luc : 'Chưa rõ'}</b></div>
      </div>
      <p className="nc-d sm" style={{ WebkitLineClamp: 3 }}>
        {kn.length ? 'Nơi đã biết (' + kn.length + '/' + all.length + '): ' + kn.map(n => n.name).join(', ')
          : 'Chưa biết nơi nào trong quận này' + (all.length ? ' (nghe nói có ' + all.length + ' nơi).' : '.')}
      </p>
      <p className="nc-d sm">Ô đang chọn: {I.ter.toLowerCase()}, đi qua tốn {PS.numVN(PS.TER_COST[g.ter[c]])} lần đồng bằng.</p>
    </div>
  );
}

// Thẻ địa điểm mở rộng
function TheNoi({ n }) {
  const { G, ASSET } = PS;
  const r = G.run, I = PS.nodeInfo(n), here = n.id === r.at, dg = PS.dangerTag(n);
  const nt = PS.noteOf(n.id), M = I.sure ? PS.placeMeta(n) : null;
  let mid = null;
  if (!here) { const p = PS.findPath(r.at, n.id); mid = p ? <span><Ic n="pin" />~{Math.round(PS.pathLen(p))} dặm · {PS.durH(PS.travelHours(p))}</span> : <span>Chưa biết đường</span>; }
  const eb = [I.info, I.sure ? PS.hexInfo(PS.nodeHex(n)).dist : ''].filter(Boolean).join(' · ');
  const pimg = ASSET.place[n.type];
  return (
    <div className="dock card nc">
      <div className="nc-head">
        <div className={'nc-pic' + (I.sure ? '' : ' rum')}>{pimg && <img src={pimg} alt="" />}{!I.sure && <b>?</b>}</div>
        <div className="nc-info">
          <small className="nc-eb">{eb}</small>
          <b className="nc-nm">{n.name + (I.sure ? '' : '?')}</b>
          <div className="nc-chips">
            <span className={'nc-g dg' + dg} {...tip(PS.dangerWhy(n))}><i></i>{PS.DTAG[dg]}{I.sure ? '' : '?'}</span>
            {I.sure && <span>Linh khí {PS.LK_N[PS.lkOf(n)].toLowerCase()}</span>}
            {mid}
          </div>
        </div>
        <div className="nc-btns">
          <button className="icb" data-act="noteEdit" data-arg={n.id} {...tip('Ghi chú: ghim một dòng lên điểm này')} aria-label="Ghi chú"><Ic n="pen" /></button>
          <button className="icb" data-act="cardMin" {...tip('Thu gọn')} aria-label="Thu gọn"><Ic n="down" /></button>
          <button className="icb" data-act="unsel" aria-label="Đóng"><Ic n="close" /></button>
        </div>
      </div>
      {M ? <>
        <div className="nc-kv2"><div><small>Tọa trấn</small><span>{M.luc}</span></div><div><small>Quy mô</small><span>{M.quy}</span></div></div>
        {M.desc && <p className="nc-d">{M.desc}</p>}
      </> : <p className="nc-d">Mới nghe đồn, chưa tận mắt thấy.</p>}
      {I.tags.length > 0 && <p className="nc-tags">{I.tags.map((t, i) => <span key={i}>{t}</span>)}</p>}
      {nt && <p className="nc-n"><Ic n="pin" /> {nt}</p>}
      <div className="nc-b"><NutDiHoacVao n={n} here={here} /></div>
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
  if (n && n.fog >= 1 && Math.floor(n.id / 100) === r.region) {
    if (!UI.cardMin) return <TheNoi n={n} />;
    const here = n.id === r.at;
    return (
      <div className="dock loc">
        {ASSET.place[n.type] && <span className={'loc-pic' + (n.fog >= 2 || n.memory ? '' : ' rum')}><img src={ASSET.place[n.type]} alt="" /></span>}
        <span className="lc-n">{n.name}</span>
        <NutDiHoacVao n={n} here={here} />
        <button className="icb" data-act="cardMax" {...tip('Mở rộng')} aria-label="Mở rộng"><Ic n="up" /></button>
      </div>
    );
  }
  if (UI.cell != null) return <TheQuan c={UI.cell} />;
  return null;
}
