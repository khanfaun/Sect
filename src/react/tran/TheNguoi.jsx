// Thẻ các bên trong trận: thanh hành động, thẻ kẻ địch / đồng hành, thẻ nhân vật chính.
// Vòng lặp khung hình của game tự dời vị trí avatar trên thanh hành động (#av<id>) mỗi khung.
import { Html, PS } from '../html';
import { Ic, tip } from '../chung';

export function CBar({ cur, max, cls }) {
  return <div className={'cbar ' + cls}><i style={{ width: PS.clamp(cur / Math.max(1, max) * 100, 0, 100) + '%' }} /></div>;
}
const H = ({ h, cls }) => <Html className={cls} style={cls ? undefined : { display: 'contents' }} h={h} />;

export function ThanhHanhDong({ sc }) {
  return (
    <div className="track">
      <i className="mk m0"></i><i className="mk m50"><em>ra chiêu</em></i><i className="mk m75"><em>phát lực</em></i><i className="mk m100"></i>
      {sc.units.filter(u => !(u.hp <= 0 && !u.immune)).map(u => (
        <Html key={u.id} className={'av ' + u.side + (u.isMain ? ' me' : '')} id={'av' + u.id} style={{ left: Math.min(100, u.pos) + '%' }} h={u.immune ? u.icon : PS.uAvatar(u)} />
      ))}
    </div>
  );
}

const hpCls = u => { const p = u.hp / Math.max(1, u.max); return p > 0.5 ? 'hp' : p > 0.2 ? 'hp mid' : 'hp low'; };
const dlOf = u => u.dl == null ? 100 : u.dl;

// Vòng thần lực quanh avatar
function Vong({ th, cls }) {
  const RC = 2 * Math.PI * 29;
  return (
    <svg className={'tl-ring ' + cls} viewBox="0 0 64 64">
      <circle className="bg" cx="32" cy="32" r="29" />
      <circle className="fg" cx="32" cy="32" r="29" strokeDasharray={(RC * th / 100).toFixed(1) + ' ' + RC.toFixed(1)} />
    </svg>
  );
}

// Thẻ kẻ địch / đồng hành. compact: chỉ avatar, thanh khí huyết, định lực, trạng thái
export function TheNguoi({ sc, u, pickMode, compact }) {
  const dead = u.hp <= 0 && !u.immune, foe = u.side === 'B', tgt = pickMode && foe && !dead && !u.immune;
  const cls = 'ucard ' + (foe ? 'foe' : 'ally') + (dead ? ' dead' : '') + (tgt ? ' tg' : '') + (sc.cur === u.id ? ' cur' : '') + (compact ? ' cmp' : '');
  const sub = u.sub || (foe ? (sc.elite ? 'Tinh anh' : sc.boss ? 'Thủ lĩnh' : 'Đối thủ') : 'Đồng hành');
  const box = { className: cls, id: 'uc' + u.id, 'data-act': tgt ? 'tgt' : undefined, 'data-arg': tgt ? u.id : undefined };
  if (foe && !dead && !PS.canSee(u)) {
    const av0 = <Html className="u-av fav" {...tip('Thần thức không đủ để dò xét đối phương')} h={u.immune ? u.icon : PS.uAvatar(u)} />;
    const nb = <small className="u-s nosee">Thần thức không dò thấu</small>;
    return compact ? <div {...box}>{av0}{nb}</div> : <div {...box}>{av0}<div className="u-b"><div className="u-nm"><b>{u.name}</b></div>{nb}</div></div>;
  }
  let bars;
  if (u.immune) {
    const k = sc.kiep;
    bars = <small className="u-s">{k ? 'Đạo ' + Math.min(k.n, k.done + 1) + '/' + k.n + (k.waves > 1 ? ' · đợt ' + k.wave : '') : ''}{k && k.uy < 1 ? ' · uy ' + Math.round(k.uy * 100) + '%' : ''}</small>;
  } else bars = <>
    <div className="brow" {...tip('Khí huyết ' + PS.pctOf(Math.max(0, u.hp), u.max))}><CBar cur={Math.max(0, u.hp)} max={u.max} cls={hpCls(u)} />{!compact && <b>{PS.pctOf(Math.max(0, u.hp), u.max)}</b>}</div>
    <div className="brow thin" {...tip('Định lực ' + Math.round(dlOf(u)) + '%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt.')}><CBar cur={dlOf(u)} max={100} cls="dl" /></div>
  </>;
  const th = u.fpt ? 100 : PS.clamp(u.than || 0, 0, 100);
  const avTip = foe && !u.immune ? (u.fpt ? u.fpt.n + '\nLượt tới nó sẽ tung đòn tối thượng!' : 'Thần lực ' + Math.round(th) + '%\nĐầy thì hiển hóa pháp tướng, lượt sau tung đòn tối thượng.') : (compact ? u.name + '\n' + sub : '');
  const av = (
    <span className={'u-av' + (foe ? ' fav' : ' al') + (u.fpt ? ' fpt' : '')} {...tip(avTip)}>
      {foe && !u.immune && <Vong th={th} cls={u.fpt ? 'burn' : th >= 100 ? 'full' : ''} />}
      <Html className="fav-in" h={PS.uAvatar(u)} /><H h={PS.phBadge(u)} />{!!u.fpt && <i className="flame"></i>}
    </span>
  );
  if (compact) return <div {...box}>{av}{bars}<H h={PS.stIcons(u.st)} /></div>;
  return (
    <div {...box}>
      {av}
      <div className="u-b"><div className="u-nm"><b>{u.name}</b><small><H h={PS.elSeal(u.el || 'vo')} /> {sub}</small></div>{bars}<H h={PS.stIcons(u.st)} /></div>
    </div>
  );
}

// Thẻ nhân vật chính: avatar có vòng thần lực (chạm để hiển hóa pháp tướng / tung đòn tối thượng)
export function TheMinh({ sc, u }) {
  const { CFG, PT, SK } = PS;
  const than = sc.pt ? 100 : PS.clamp(u.than || 0, 0, 100), full = than >= 100, rp = PS.readyPlayer(sc), V = PS.ptPreview();
  const st = sc.pt ? 'burn' : full ? 'full' : '';
  const t = sc.kiep ? 'Trong thiên kiếp không hiển hóa được pháp tướng.' : sc.pt
    ? (sc.pt.n + (sc.pt.left > 0 ? ' · còn ' + sc.pt.left + ' lượt' : ' · tới hết trận') + '\n' + PT[sc.pt.el].d + (sc.pt.sk ? '\n\nChạm để tung đòn tối thượng: ' + SK[sc.pt.sk].n + '\nTung xong, pháp tướng tan và thần lực về 0.' : '\n\nChưa gắn thần thông nên không có đòn tối thượng.'))
    : ('Thần lực ' + Math.round(than) + '%\nĐánh trúng hoặc bị đánh trúng thì nạp.\n' + (full ? 'Đã đầy: chạm để hiển hóa ' : 'Đầy thì chạm để hiển hóa ') + V.P.n + '\n' + V.P.d + (V.P.turns ? ' · ' + V.P.turns + ' lượt' : ' · tới hết trận') + (V.sk ? '\nĐòn tối thượng: ' + V.sk.n : ''));
  const ok = rp && !u.dazed && !CFG.autoFight && !sc.kiep && (sc.pt ? !!sc.pt.sk : full);
  const pct = (a, b) => PS.pctOf(a, b);
  return (
    <div className={'ucard me' + (sc.cur === u.id ? ' cur' : '')} id={'uc' + u.id}>
      <button className={'ult-av ' + st + (ok ? ' ok' : '')} data-act="ult" aria-disabled={ok ? undefined : 'true'} {...tip(t)}>
        <Vong th={than} cls={st} />
        {!!sc.pt && <><i className="flame"></i><i className="flame f2"></i></>}
        <Html className="ult-in" h={PS.uAvatar(u)} /><H h={PS.phBadge(u)} />
      </button>
      <div className="u-b">
        <div className="u-nm"><b>{u.name}</b><small>{PS.realmLabel()}</small></div>
        <div className="brow" {...tip('Khí huyết')}><span className="bl"><Ic n="heart" /></span><CBar cur={Math.max(0, u.hp)} max={u.max} cls={hpCls(u)} /><b>{pct(Math.max(0, u.hp), u.max)}</b></div>
        <div className="brow2 mpnl">
          <span {...tip('Linh lực ' + (u.maxMp ? pct(u.mp, u.maxMp) : 'chưa có') + '\nThi triển pháp thuật')}><span className="bl"><Ic n="drop" /></span><CBar cur={u.mp} max={u.maxMp} cls="mp" /><b>{u.maxMp ? pct(u.mp, u.maxMp) : '—'}</b></span>
          <span {...tip('Niệm lực ' + pct(u.nl || 0, u.maxNl || 1) + '\nSức thần thức trong trận. Dùng vật phẩm, tế pháp bảo, đòn thần thức đều tốn niệm lực.\nVào trận thì đầy.')}><span className="bl"><Ic n="brain" /></span><CBar cur={u.nl || 0} max={u.maxNl || 1} cls="nl" /><b>{pct(u.nl || 0, u.maxNl || 1)}</b></span>
        </div>
        <div className="brow2">
          <span {...tip('Thể lực ' + Math.round(u.tl) + '%\nNé tốn 25%, đỡ được đòn tốn 30%.\nHồi 20% mỗi khi về mốc đầu')}><span className="bl"><Ic n="run" /></span><CBar cur={u.tl} max={100} cls="tl" /></span>
          <span {...tip('Định lực ' + Math.round(dlOf(u)) + '%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt, rồi hồi đầy.')}><span className="bl"><Ic n="lotus" /></span><CBar cur={dlOf(u)} max={100} cls="dl" /></span>
        </div>
        <H h={PS.stIcons(u.st)} />
      </div>
    </div>
  );
}
