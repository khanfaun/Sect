// Các nút nổi trên bản đồ: vết thương bên trái, lưới/chú giải/về chỗ mình bên phải,
// góc trái dưới: luyện chế, túi đồ, bế quan (sáng lên khi đủ điều kiện đột phá), cảnh giới.
import { PS } from '../html';
import { Ic, tip } from '../chung';

function Nut({ act, arg, icon, t, on, dis, cls }) {
  return (
    <button className={'mb' + (on ? ' on' : '') + (cls ? ' ' + cls : '')} data-act={act} data-arg={arg} disabled={!!dis} {...tip(t)}>
      <Ic n={icon} />
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
  if (PS.entsHere(r.region).some(e => e.type === 'truysat')) L.push({ k: 'truy', t: '', tip: 'Bị truy đuổi\nCó kẻ đang lần theo dấu ngươi.', cls: '' });
  return L.map((x, i) => (
    <div key={i} className={'wi ' + x.cls} {...tip(x.tip)}><svg viewBox="0 0 24 24"><path d={WICON[x.k]} /></svg><small>{x.t}</small></div>
  ));
}

export function NutBanDo() {
  const { G, CFG } = PS;
  const r = G.run, bqNo = PS.bqCan(), brk = PS.canBreak();
  const dev = !!PS.DEV;
  return <>
    <div className="mleft wb"><DaiVetThuong /></div>
    <div className="mright">
      <Nut act="gridT" icon="hex" t={CFG.grid ? 'Ẩn lưới ô' : 'Hiện lưới ô'} on={CFG.grid} />
      <Nut act="legendOpen" icon="list" t="Chú giải ký hiệu trên bản đồ" />
      <Nut act="center" icon="target" t="Về chỗ ngươi" />
    </div>
    <div className="mbl">
      <Nut act="panel" arg="craft" icon="flask" t="Luyện chế: luyện đan, luyện khí từ vật liệu" dis={r.moving} />
      <Nut act="bagOpen" icon="bag" t="Túi đồ" />
      <Nut act="hudBq" icon="seat" cls={brk ? 'glow' : ''} dis={bqNo} t={bqNo || (brk ? 'Bế quan · tu vi viên mãn: vào để đột phá' : 'Bế quan tu luyện ngay tại đây')} />
      <Nut act="cgOpen" icon="yin" t="Cảnh giới: các đại cảnh giới, tiểu cảnh giới, phẩm và đột phá" />
      {dev && <Nut act="devOpen" icon="bolt" cls="dev" t="Dev test: thử hiệu ứng" />}
    </div>
  </>;
}
