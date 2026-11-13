// Thanh điều hướng dưới cùng trên bản đồ: tông môn, linh thú, sổ tay, giao tình, thêm.
import { PS } from '../html';
import { Ib, tip } from '../chung';

const ITEMS = [['tong', 'flag', 'Tông môn'], ['pets', 'paw', 'Linh thú'], ['journal', 'book', 'Sổ tay'], ['bonds', 'people', 'Giao tình'], ['more', 'more', 'Thêm']];

export function Nav() {
  const { G, UI } = PS;
  const r = G.run;
  const dot = { journal: r && r.quests.some(q => q.state === 'open'), pets: r && r.eggs && r.eggs.length > 0 };
  return ITEMS.map(([k, i, n]) => (
    <button key={k} className={'nv' + (UI.panel === k ? ' on' : '')} data-act="panel" data-arg={k}>
      <Ib n={i} /><span>{n}</span>
      {dot[k] && <i className="dot soft" {...tip(k === 'journal' ? 'Đang có nhiệm vụ chưa xong' : 'Có trứng linh thú đang ấp')} />}
    </button>
  ));
}
