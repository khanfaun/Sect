// Các nút nổi trên bản đồ: vết thương bên trái, lưới/chú giải/về chỗ mình bên phải,
// góc trái dưới: luyện chế, túi đồ, bế quan (sáng lên khi đủ điều kiện đột phá), cảnh giới.
import { PS } from '../html';
import { Ic, tip } from '../chung';

function Nut({ act, arg, icon, t, on, dis, cls, l }) {
  return (
    <button className={'mb' + (on ? ' on' : '') + (cls ? ' ' + cls : '')} data-act={act} data-arg={arg} disabled={!!dis} {...tip(t)}>
      <Ic n={icon} />{l && <span className="mb-l">{l}</span>}
    </button>
  );
}

// Dải biểu tượng vết thương, tâm ma, thọ nguyên, bị truy đuổi
function DaiVetThuong() {
  const { G, WOUND, WICON } = PS;
  const r = G.run, s = PS.S(), w = PS.W();
  const L = [];
  for (const x of PS.wounds()) {
    const D = WOUND[x.k];
    L.push({ k: x.k, t: x.perm ? '∞' : x.k === 'nguy' ? PS.durShort(Math.max(1, x.dl - w.t)) : PS.durShort(Math.max(1, x.until - w.t)),
      tip: D.n + '\n' + D.d + '\n' + PS.woundText(x) + (x.perm || x.k === 'doc' ? '' : '\nĐang mang thương: thua trận nữa là chết.'), cls: x.k === 'nguy' ? 'crit' : x.perm ? 'perm' : '' });
  }
  if (r.tamma >= 60) L.push({ k: 'ma', t: PS.tmWord(r.tamma), tip: 'Tâm ma dày\nĐủ 100 sẽ phải đối mặt với chính mình. Tĩnh tọa, dưỡng thương, bế quan để giảm.', cls: '' });
  if (s.life - r.age < s.life * 0.12) L.push({ k: 'tho', t: PS.durShort(Math.max(0, s.life - r.age) * PS.HY), tip: 'Thọ nguyên sắp cạn\nĐột phá để sống lâu hơn.', cls: 'crit' });
  const na = PS.tnaHud && PS.tnaHud();
  if (na) L.push({ k: 'na', t: na.t, tip: na.tip, cls: 'na' + (na.m >= 4 ? ' crit' : '') });
  if (PS.truyOn && PS.truyOn()) L.push({ k: 'truy', t: 'đuổi', tip: PS.truyTip(), cls: 'truy' });
  else if (PS.entsHere(r.region).some(e => e.type === 'truysat')) L.push({ k: 'truy', t: '', tip: 'Bị truy đuổi\nCó kẻ đang lần theo dấu ngươi.', cls: '' });
  return L.map((x, i) => (
    <div key={i} className={'wi ' + x.cls} {...tip(x.tip)}><svg viewBox="0 0 24 24"><path d={WICON[x.k]} /></svg><small>{x.t}</small></div>
  ));
}

// Biểu tượng tiền: SVG nhỏ, phẩm linh thạch càng cao càng nhiều mặt và chi tiết
const TIEN_ICO = {
  xu: <><circle cx="8" cy="8" r="7" fill="#b56f35" stroke="#6b3d17" strokeWidth="1" /><circle cx="8" cy="8" r="5.3" fill="none" stroke="#e0a468" strokeWidth=".8" /><rect x="6" y="6" width="4" height="4" fill="#fbf3e2" stroke="#6b3d17" strokeWidth=".9" /></>,
  bac: <><path d="M1 5.5Q3 4 4.5 5.2H11.5Q13 4 15 5.5L12.8 12H3.2Z" fill="#cfd5de" stroke="#6c7480" strokeWidth="1" strokeLinejoin="round" /><path d="M4.5 5.2H11.5L10.8 8H5.2Z" fill="#f4f7fb" /><path d="M3.2 12H12.8L12.2 10H3.8Z" fill="#9aa3af" /></>,
  vang: <><path d="M2 12.5L3.6 6H12.4L14 12.5Z" fill="#e8b92f" stroke="#8a6410" strokeWidth="1" strokeLinejoin="round" /><path d="M3.6 6H12.4L11.8 8.2H4.2Z" fill="#fff0a8" /><path d="M2 12.5H14L13.6 10.6H2.4Z" fill="#c4901a" /></>,
  0: <><polygon points="8,2 12.5,6 11,13.5 5,13.5 3.5,6" fill="#9fb0a6" stroke="#5f6f66" strokeWidth="1" strokeLinejoin="round" /><polygon points="8,2 12.5,6 8,7.5" fill="#c8d4cc" /></>,
  1: <><polygon points="8,1.5 13,5.5 12,12.5 8,14.5 4,12.5 3,5.5" fill="#3f9a5a" stroke="#1f5c33" strokeWidth="1" strokeLinejoin="round" /><polygon points="8,1.5 13,5.5 8,7" fill="#79d08f" /><polygon points="3,5.5 8,7 8,14.5 4,12.5" fill="#2c7a45" /><polygon points="8,7 13,5.5 12,12.5 8,14.5" fill="#4fb36e" /></>,
  2: <><polygon points="8,1 12.5,3.5 14,8 11.5,13.5 8,15 4.5,13.5 2,8 3.5,3.5" fill="#3a78c8" stroke="#1d4a8a" strokeWidth="1" strokeLinejoin="round" /><polygon points="8,1 12.5,3.5 8,6 3.5,3.5" fill="#8cc0ff" /><polygon points="12.5,3.5 14,8 8,6" fill="#5b9aee" /><polygon points="3.5,3.5 8,6 2,8" fill="#4a88de" /><polygon points="8,6 14,8 11.5,13.5 8,15" fill="#2f66b0" /><polygon points="8,6 2,8 4.5,13.5 8,15" fill="#3a78c8" /><path d="M5 3.8L6.6 3 6 5Z" fill="#fff" opacity=".85" /></>,
  3: <><polygon points="8,.5 12,2.2 15,6 13.5,11.5 10.5,14.8 8,15.5 5.5,14.8 2.5,11.5 1,6 4,2.2" fill="#9a4ac8" stroke="#ffd45a" strokeWidth="1" strokeLinejoin="round" /><polygon points="8,.5 12,2.2 8,5 4,2.2" fill="#e0b3ff" /><polygon points="12,2.2 15,6 8,5" fill="#c37cf0" /><polygon points="4,2.2 8,5 1,6" fill="#b25fe0" /><polygon points="8,5 15,6 13.5,11.5 8,10" fill="#7a2fa8" /><polygon points="8,5 1,6 2.5,11.5 8,10" fill="#8a3cb8" /><polygon points="8,10 13.5,11.5 10.5,14.8 8,15.5" fill="#5e1f88" /><polygon points="8,10 2.5,11.5 5.5,14.8 8,15.5" fill="#6d2a98" /><path d="M8 5.6L8.6 7.4L10.4 8L8.6 8.6L8 10.4L7.4 8.6L5.6 8L7.4 7.4Z" fill="#fff6c0" className="spk" /></>,
};
function TienIco({ k }) {
  return <svg className={'ti ti-' + k} viewBox="0 0 16 16" aria-hidden="true">{TIEN_ICO[k]}</svg>;
}

// Cụm tiền tệ: xu, lượng bạc, lượng vàng rồi tới 4 phẩm linh thạch (cuối cùng), dàn ngang
function CumTien({ r }) {
  const T = PS.TIEN, d = Math.max(0, Math.round(r.bac || 0));
  const vang = Math.floor(d / T.vang), bac = Math.floor((d % T.vang) / T.luong), xu = d % T.luong;
  const C = [['xu', xu, 'Xu', 'Tiền lẻ của phàm nhân, dùng mua đồ rẻ.'], ['bac', bac, 'Lượng bạc', 'Bằng ' + T.luong + ' xu.'], ['vang', vang, 'Lượng vàng', 'Bằng ' + T.vang / T.luong + ' lượng bạc.']];
  const noT = (r.bac || 0) < 0 ? (PS.noTip ? PS.noTip(r) : '') : '';
  const tp = ['Hạ phẩm', 'Trung phẩm', 'Thượng phẩm', 'Cực phẩm'], tpd = ['Linh thạch thường, dùng hằng ngày.', 'Gấp 100 lần hạ phẩm.', 'Gấp 100 lần trung phẩm.', 'Quý nhất, gấp 100 lần thượng phẩm.'];
  return (
    <div className={'tien-cum' + ((r.bac || 0) < 0 ? ' no' : '')}>
      {C.map(([k, v, n, d]) => <span key={k} className={'tc' + (v ? '' : ' z') + (k === 'xu' ? ' xu' : '')} {...tip(n + ': ' + v + '\n' + d + (k === 'xu' ? noT : ''))}><TienIco k={k} />{v}</span>)}
      <u className="tc-sep" />
      {tp.map((n, k) => { const v = PS.ltGet(k, r) || 0; return <span key={'l' + k} className={'tc lt lt' + k + (v ? '' : ' z')} {...tip('Linh thạch ' + n.toLowerCase() + ': ' + PS.fmtN(v) + '\n' + tpd[k])}><TienIco k={k} />{PS.fmtN(v)}</span>; })}
    </div>
  );
}

export function NutBanDo() {
  const { G, CFG, UI } = PS;
  const r = G.run, bqNo = PS.bqCan(), brk = PS.canBreak();
  const dev = !!PS.DEV;
  return <>
    <CumTien r={r} />
    <div className="mleft wb"><DaiVetThuong />{dev && <Nut act="devOpen" icon="bolt" cls="dev" t="Dev test: thử hiệu ứng" />}</div>
    <div className="mright">
      <Nut act="gridT" icon="hex" l="Lưới ô" t={CFG.grid ? 'Ẩn lưới ô' : 'Hiện lưới ô'} on={CFG.grid} />
      <Nut act="legendOpen" icon="list" l="Chú giải" t="Chú giải ký hiệu trên bản đồ" on={UI.panel === 'more' && UI.tab.more === 'legend'} />
      {!PS.isPham() && <Nut act="tkUse" icon="eye" l="Thần thức" on={PS.tkActive()} dis={!!PS.tkWhy() && !PS.tkActive()} t={'Phóng thần thức: tầm nhìn gấp ' + PS.TK_MUL + ' lần trong ' + PS.durH(PS.TK_DUR) + ', tốn ' + PS.TK_MP + '% linh lực, chờ ' + PS.TK_CD + ' ngày mới dùng lại.\nTầm hiện tại: ' + PS.senseR() + (PS.tkWhy() ? '\n' + PS.tkWhy() : '')} />}
      <Nut act="zoomAll" icon="globe" l="Toàn đồ" t="Thu nhỏ hết cỡ: xem cả bản đồ" />
      <Nut act="center" icon="target" l="Về chỗ" t="Về chỗ ngươi" />
    </div>
    <div className="mbl">
      <Nut act="panel" arg="craft" icon="flask" l="Luyện chế" t="Luyện chế: luyện đan, luyện khí từ vật liệu" on={UI.panel === 'craft'} dis={r.moving} />
      <Nut act="bagOpen" icon="bag" l="Túi đồ" t="Túi đồ" on={UI.panel === 'char' && UI.tab.char === 'bag'} />
      <Nut act="hudBq" icon="seat" l="Bế quan" cls={brk ? 'glow' : ''} dis={!!bqNo || PS.voKnown()} t={PS.voKnown() ? 'Vô linh căn: chưa thể bế quan tu luyện' : bqNo || (brk ? 'Bế quan · tu vi viên mãn: vào để đột phá' : 'Bế quan tu luyện ngay tại đây')} />
      <Nut act="cgOpen" icon="yin" l="Cảnh giới" on={!!(UI.modal && /cg/.test(UI.modal.k || ''))} t="Cảnh giới: các đại cảnh giới, tiểu cảnh giới, phẩm và đột phá" />
    </div>
  </>;
}
