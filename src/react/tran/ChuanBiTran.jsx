// Màn chuẩn bị trước trận: hai phe (lực chiến, nghiền ép), chiêu đang gắn, chỉnh chiêu / dùng đồ, tốc chiến, bắt đầu.
import { Html, PS } from '../html';
import { Ic, tip } from '../chung';
import { Card } from '../canh/Khung';
import { CBar } from './TheNguoi';

const H = ({ h }) => <Html style={{ display: 'contents' }} h={h} />;

// Một dòng người trong màn chuẩn bị (giống prepUnitRow(), kể cả lớp "thần thức không dò thấu")
function DongNguoi({ u, me }) {
  const { G, TAL_N } = PS;
  const foe = u.side === 'B';
  if (foe && !PS.canSee(u)) return (
    <div className="pp-u foe">
      <Html className="u-av" {...tip('Thần thức không đủ để dò xét')} h={PS.uAvatar(u)} />
      <div className="pp-t"><div className="pp-nl"><span className="pp-n">{u.name}</span></div><small className="u-s nosee">Thần thức không dò thấu</small></div>
    </div>
  );
  const kp = u.kind === 'kiep', sub = me ? PS.realmLabel() : kp ? 'Thiên kiếp' : u.sub || (foe ? 'Đối thủ' : 'Đồng hành');
  const sc = G.run.scene, S0 = me ? PS.S() : null;
  const hp = me ? G.run.hp : u.hp, mh = me ? S0.maxHp : u.max, mp = me ? G.run.mp : (u.mp || 0), mm = me ? S0.maxMp : (u.maxMp || 0);
  const V = sc ? PS.crushVictims(sc, u) : [];
  const tal = PS.unitTal(u);
  return (
    <div className={'pp-u' + (foe ? ' foe' : '')}>
      <Html className="u-av" {...tip(tal ? 'Tiềm chất: ' + TAL_N[tal.tier] : '')} h={PS.uAvatar(u)} />
      <div className="pp-t">
        <div className="pp-nl">
          <span className="pp-n">{u.name}<small className="pp-sub"><H h={PS.elSeal(u.el || 'vo')} /> {sub}</small></span>
          {V.length > 0 && <b className="lc-c ne" {...tip('Nghiền ép ' + V.map(x => x.isMain ? 'ngươi' : x.name).join(', ') + ': lực chiến hơn hẳn một đại cảnh giới.\nBên bị nghiền ép chịu uy áp, đòn đánh vào người này gần như vô dụng.')}><span className="ne-i"><Ic n="skull" /></span>Nghiền ép</b>}
        </div>
        <div className="pp-row2">
          <div className="pp-bars">
            <span {...tip('Khí huyết')}><Ic n="heart" /><CBar cur={hp} max={mh} cls={'hp' + (hp < mh * 0.3 ? ' low' : hp < mh * 0.6 ? ' mid' : '')} /></span>
            <span {...tip(mm ? 'Linh lực' : 'Chưa có linh lực')}><Ic n="drop" /><CBar cur={mp} max={mm || 1} cls="mp" /></span>
          </div>
          {/* thiên kiếp không so lực chiến như một đối thủ */}
          <div className="pp-lc" {...tip(foe ? 'Lực chiến của kẻ này, so với người ở cảnh giới của ngươi' : 'Lực chiến so với người cùng cảnh giới')}>
            {kp ? <b className="lc-c st">Gục là chết</b> : <H h={PS.RT('lc', PS.pLc(u))} />}
          </div>
        </div>
      </div>
    </div>
  );
}

const CAT = [['atk', 'Công'], ['move', 'Thân pháp'], ['def', 'Thủ'], ['ult', 'Thần thông']];

export function ChuanBiTran({ sc }) {
  const { G, UI, PILL, SK } = PS;
  const r = G.run, A = sc.units.filter(u => u.side === 'A'), B = sc.units.filter(u => u.side === 'B');
  const kn = r.kn || {}, cp = r.pills.filter(p => PILL[p.id].w !== 'bt').length;
  const cmp = A.length + B.length > 2, T = PS.teamCmp(sc);
  const solo = !cmp && (T.side === 'A' ? A : B).some(u => PS.crushVictims(sc, u).length); // 1 đấu 1 đã có nghiền ép thì khỏi nhãn đội
  const Head = ({ n, side, L }) => (
    <p className="pp-h"><span>{n}{cmp ? ' · ' + L.length + ' người' : ''}</span>
      {T.side === side && !solo && <b className={'lc-c ' + T.c} {...tip(cmp ? 'So tổng lực chiến hai đội' : 'So lực chiến hai bên')}>{T.t}</b>}
    </p>
  );
  const nK = CAT.reduce((x, [c]) => x + (kn[c] || []).filter(id => SK[id]).length, 0), open = UI.ppKn != null ? UI.ppKn : !cmp;
  return (
    <Card title="Sắp giao chiến" sub={sc.en.n + (sc.boss ? ' · thủ lĩnh' : sc.elite ? ' · tinh anh' : '')} cls="tall cbprep"
      head={PS.crushAny(sc) ? <button className="btn sm cb-quick" data-act="cbQuick" {...tip('Bỏ qua trận đánh: hệ thống tự đánh thay ngươi và tính kết quả.\nKhí huyết, linh lực, đồ dùng, chiến lợi phẩm vẫn thay đổi như đánh thật.')}>Tốc chiến</button> : null}
      foot={<><span className="grow"></span><button className="btn pri big" data-act="cbGo">Bắt đầu</button><span className="grow"></span></>}>
      <div className="pp-sides pp-cmp">
        <div><Head n="Phe ta" side="A" L={A} />{A.map(u => <DongNguoi key={u.id} u={u} me={u.isMain} />)}</div>
        <div><Head n="Phe địch" side="B" L={B} />{B.map(u => <DongNguoi key={u.id} u={u} me={false} />)}</div>
      </div>
      <button className="pp-h pp-tg" data-act="ppKn"><span>Chiêu thức đang gắn · {nK ? nK + ' chiêu' : 'trống'}</span><small>{open ? 'thu gọn ▲' : 'mở rộng ▼'}</small></button>
      {open && (
        <div className="pp-kn">
          {CAT.map(([c, n]) => (
            <div key={c}><small>{n}</small>
              {(kn[c] || []).length ? kn[c].map((id, i) => SK[id] ? <span key={i}><H h={PS.elSeal(SK[id].el)} /> {SK[id].n}</span> : null) : <span className="hint">trống</span>}
            </div>
          ))}
        </div>
      )}
      <div className="pp-act"><button className="btn" data-act="prepKn"><Ic n="scroll" /> Chỉnh chiêu thức</button><button className="btn" data-act="prepBag"><Ic n="bag" /> Túi đồ · {cp} món</button></div>
      <p className="hint">Dùng đồ lúc này không tốn niệm lực. Vào trận rồi, mỗi lần dùng tốn {PS.pctOf(PS.NL_PILL, PS.S().nl || 1)} niệm lực.</p>
    </Card>
  );
}
