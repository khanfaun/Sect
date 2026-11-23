// Thanh điều hướng dưới cùng (kiểu bản mẫu Ngọc Hành Trình): 7 ô có ảnh, ô giữa (Bản đồ) nổi lên.
// Túi đồ / Nhân vật cùng mở bảng nhân vật (khác thẻ); "Thêm" nằm ở nút bánh răng trên thẻ trạng thái.
import { PS } from '../html';
import { tip } from '../chung';
import { I } from '../giao-dien/anh';
import { CotTrai, laPC } from '../may-tinh/MayTinh';

// [khoá, ảnh, chữ, data-act, data-arg]
const ITEMS = [
  ['bag', 'it-ruong', 'Túi đồ', 'bagOpen'],
  ['char', 'it-ao-lam', 'Nhân vật', 'navChar'],
  ['tong', 'it-co', 'Tông môn', 'panel', 'tong'],
  ['map', 'cau-tu', 'Bản đồ', 'closePanel'],
  ['pets', 'it-trung', 'Linh thú', 'panel', 'pets'],
  ['journal', 'it-bi-kip', 'Sổ tay', 'panel', 'journal'],
  ['bonds', 'it-lenh-ngoc', 'Giao tình', 'panel', 'bonds'],
];

export function Nav() {
  if (laPC()) return <CotTrai />;
  const { G, UI } = PS;
  const r = G.run;
  const dot = { journal: r && r.quests.some(q => q.state === 'open'), pets: r && r.eggs && r.eggs.length > 0 };
  const on = k => k === 'map' ? !UI.panel : k === 'bag' ? UI.panel === 'char' && UI.tab.char === 'bag' : k === 'char' ? UI.panel === 'char' && UI.tab.char !== 'bag' : UI.panel === k;
  return ITEMS.map(([k, im, n, act, arg]) => (
    <button key={k} className={'nv nv-' + k + (k === 'map' ? ' c' : '') + (on(k) ? ' on' : '')} data-act={act} data-arg={arg} aria-label={n}>
      <i className="nv-i"><img src={I(im)} alt="" draggable="false" /></i><span>{n}</span>
      {dot[k] && <em className="dot soft" {...tip(k === 'journal' ? 'Đang có nhiệm vụ chưa xong' : 'Có trứng linh thú đang ấp')} />}
    </button>
  ));
}
