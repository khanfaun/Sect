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

// Cụm tiền tệ: xu, lượng bạc, lượng vàng rồi tới 4 phẩm linh thạch (cuối cùng), dàn ngang
function CumTien({ r }) {
  const T = PS.TIEN, d = Math.max(0, Math.round(r.bac || 0));
  const vang = Math.floor(d / T.vang), bac = Math.floor((d % T.vang) / T.luong), xu = d % T.luong;
  const C = [['xu', xu, 'Xu'], ['bac', bac, 'Lượng bạc'], ['vang', vang, 'Lượng vàng']];
  const tp = ['Hạ phẩm', 'Trung phẩm', 'Thượng phẩm', 'Cực phẩm'];
  return (
    <div className={'tien-cum' + ((r.bac || 0) < 0 ? ' no' : '')} {...tip('Hầu bao\nLinh thạch: ' + PS.ltTxt(r) + '\nTiền phàm: ' + PS.fmtBac(r.bac || 0) + '\nThưởng Lệnh: ' + (r.thuongLenh || 0) + (PS.noTip ? PS.noTip(r) : ''))}>
      {C.map(([k, v, n]) => <span key={k} className={'tc' + (v ? '' : ' z')} title={n}><i className={'cn cn-' + k} />{v}</span>)}
      {tp.map((n, k) => { const v = PS.ltGet(k, r) || 0; return <span key={'l' + k} className={'tc lt' + (v ? '' : ' z')} title={n}><i className={'rh lt-' + k} />{PS.fmtN(v)}</span>; })}
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
      {!PS.voKnown() && <Nut act="hudBq" icon="seat" l="Bế quan" cls={brk ? 'glow' : ''} dis={bqNo} t={bqNo || (brk ? 'Bế quan · tu vi viên mãn: vào để đột phá' : 'Bế quan tu luyện ngay tại đây')} />}
      <Nut act="cgOpen" icon="yin" l="Cảnh giới" on={!!(UI.modal && /cg/.test(UI.modal.k || ''))} t="Cảnh giới: các đại cảnh giới, tiểu cảnh giới, phẩm và đột phá" />
    </div>
  </>;
}
