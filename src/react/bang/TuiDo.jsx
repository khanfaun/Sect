// Thẻ túi đồ trong bảng nhân vật: hình người mặc trang bị, pháp bảo, đan điền uẩn dưỡng,
// pháp khí tùy thân; bên phải là bộ lọc và lưới ô đồ.
import { Html, PS } from '../html';
import { DdSel, Ic, SlotX, pcs, tah, tip } from '../chung';
import { CumTien } from '../ban-do/NutBanDo';

// Một ô trang bị: bấm mở hộp chọn, nút × ở góc để tháo (giống eqCell())
export function OTrangBi({ k, label, rel, o = {} }) {
  const t = rel ? tah(PS.relTip(rel)) : tip(o.tip || label + ': trống. Chạm để chọn.');
  if (o.lock && !rel) return <span className="eqc lock" {...t}><Ic n="lock" /><small>{label}</small></span>;
  const icon = rel ? PS.relIcon(rel) : o.lock ? PS.ic('lock') : PS.slotIcon(o.ic || 'phapbao');
  return (
    <button className={'eqc' + (rel ? ' on' : '') + (o.lock ? ' lock' : '')} data-act="slotPick" data-arg={k} disabled={!!o.lock} style={rel ? pcs(rel.tier) : undefined} {...t}>
      <Html style={{ display: 'contents' }} h={icon} />
      <small>{rel ? rel.name : label}</small>
      {o.badge && <i>{o.badge}</i>}
      {rel && o.x && <SlotX act={o.x[0]} arg={o.x[1]} t={o.x[2]} />}
    </button>
  );
}

export function PhuongTien({ k, n }) {
  const { G, ASSET } = PS;
  const r = G.run, m = PS.mountOf(), off = r.vehOff || r.rentOff;
  const t = m ? m.n + (m.d ? '\n' + m.d : '') + '\nTốc độ ×' + PS.numVN(m.m || 1) : off ? 'Đã cất ' + off.n + (off.v ? off.v.n : '') + '. Chạm để dùng lại.' : 'Chưa có phương tiện. Sắm ở Trạm dịch trong thôn trấn.';
  return (
    <div className={'eqc' + (m ? ' on' : '')} style={m ? pcs(m.tier || 1) : undefined} data-act={off && !m ? 'vehOn' : undefined} {...tip(t)}>
      {m && m.k && ASSET.veh && ASSET.veh[m.k] ? <img className="asset" src={ASSET.veh[m.k]} alt="" /> : <Html style={{ display: 'contents' }} h={PS.slotIcon(k)} />}
      <small>{m ? m.n : n}</small>
      {m && <SlotX act="vehOff" arg="" t="Tháo phương tiện" />}
    </div>
  );
}

export const Help = ({ t }) => <span className="qhelp" {...tip(t)}><Ic n="info" cls="sm" /></span>;

const SORT = ['Phẩm cao', 'Phẩm thấp', 'Tên A–Z', 'Loại'];
const SORTF = [(a, b) => b.tier - a.tier || a.n.localeCompare(b.n), (a, b) => a.tier - b.tier || a.n.localeCompare(b.n), (a, b) => a.n.localeCompare(b.n), (a, b) => a.cat.localeCompare(b.cat) || b.tier - a.tier];

// Nhãn yêu cầu cảnh giới góc ô (bí tịch chưa đủ cảnh giới, đồ chưa dùng được)
function YeuCau({ x, r }) {
  const rl = x.ref && x.ref.t === 'rel' && r.relics[x.ref.i];
  if (rl && rl.k === 'book' && rl.art && r.realm < rl.art.req) return <em className="rq">{PS.reqName(rl.art.req)}</em>;
  return rl && rl.k !== 'book' && !PS.relOk(rl) ? <em className="rq">{PS.LV_NAME[PS.relReq(rl)]}</em> : null;
}

// lý do túi trữ vật khoá, bằng lời thường
function tuiKhoaWhy() {
  return PS.isPham() ? 'phàm nhân chưa có linh lực để mở túi' : 'linh lực đã cạn, hồi linh lực để mở lại';
}

function CotPhai({ items }) {
  const { BAG_CAT, PHAM, BAG_MAX } = PS;
  const r = PS.run2(), B = PS.bagSt();
  const cnt = c => c === 'all' ? items.length : items.filter(x => x.cat === c).length;
  const V = items.filter(x => (B.tab === 'all' || x.cat === B.tab) && (B.pham < 0 || x.tier === B.pham)).sort(SORTF[B.sort]);
  const cap = PS.bagCap(), full = B.tab === 'all' && B.pham < 0;
  const emp = full ? Math.max(0, cap - V.length) : Math.max(0, Math.ceil(Math.max(V.length, 10) / 6) * 6 - V.length);
  const locked = full ? Math.max(0, BAG_MAX - Math.max(cap, V.length)) : 0;
  // ô trống thuộc túi trữ vật đang khoá (phàm nhân / hết linh lực): hiện riêng, có dấu khoá
  const lay = PS.bagLayout ? PS.bagLayout() : null, tk = full && lay ? Math.min(emp, lay.slots.filter(x => x.locked && !x.unit).length) : 0;
  const tkWhy = tuiKhoaWhy();
  return <>
    <div className="bfil">
      <DdSel act="bagTab" label="Loại" opts={Object.keys(BAG_CAT).map(c => ({ v: c, h: PS.esc(BAG_CAT[c]) + (cnt(c) ? ` <small>${cnt(c)}</small>` : '') }))} cur={B.tab} />
      <DdSel act="bagPham" label="Phẩm" opts={[{ v: -1, h: 'Mọi phẩm' }].concat(PHAM.map((p, i) => ({ v: i, h: PS.qName(p, i) })))} cur={B.pham} />
      <DdSel act="bagSort" label="Sắp xếp" opts={SORT.map((n, i) => ({ v: i, h: n }))} cur={B.sort} />
    </div>
    <div className="bscroll">
      <div className="bgrid">
        {V.map(x => (
          <button key={x.key} className={'bc on' + (B.sel === x.key ? ' sel' : '') + (x.locked || x.lockedN > 0 ? ' tlk' : '')} data-act="bagSel" data-arg={x.key} style={pcs(x.tier)} {...tah(PS.itemTip(x))}>
            <Html style={{ display: 'contents' }} h={PS.itemArt(x)} />
            {x.cnt > 1 && <i>{x.cnt}</i>}
            {(PS.itemLocked(x) || x.locked || x.lockedN > 0) && <em className="lk"><Ic n="lock" /></em>}
            <YeuCau x={x} r={r} />
          </button>
        ))}
        {Array.from({ length: emp - tk }, (_, i) => <span key={'e' + i} className="bc"></span>)}
        {Array.from({ length: tk }, (_, i) => <span key={'t' + i} className="bc tkh" {...tip('Ô túi trữ vật đang khoá: ' + tkWhy)}><Ic n="lock" /></span>)}
        {Array.from({ length: locked }, (_, i) => <span key={'l' + i} className="bc lock" {...tip('Ô bị khóa. Lên cảnh giới hoặc đeo túi trữ vật tốt hơn để mở.')}><Ic n="lock" /></span>)}
      </div>
    </div>
    {!V.length && items.length > 0 && <p className="hint">Không có món nào khớp bộ lọc.</p>}
    {PS.tuiSlots && PS.tuiSlots() > 0 && !PS.tuiOn() && <p className="hint tkh-h"><Ic n="lock" /> Túi trữ vật đang khoá ({PS.tuiSlots()} ô): {tkWhy}. Đồ trong túi không mất, chỉ chưa lấy ra dùng được.</p>}
  </>;
}

// Sửa-L câu 49: đồ nhận khi túi đầy nằm ở "tạm giữ bên người", ngoài các ô túi; hạn ghi bằng chữ
function TamGiu() {
  const L = PS.tgView ? PS.tgView() : [];
  if (!L.length) return null;
  const T = PS.contentText;
  return (
    <div className="tam-giu">
      <p><b>{T('tg.head')}</b> <small>{T('tg.d')}</small></p>
      {L.map(e => (
        <div key={e.i} className="tg-mon">
          <span>{e.n}</span> <small className={e.sap ? 'no' : ''}>{e.sap ? T('tg.sapMat') + ', ' : ''}{e.con}</small>
          <button className={'btn' + (e.no ? '' : ' pri')} data-act="tgCat" data-arg={e.i} disabled={!!e.no}>{T('tg.catBtn')}{e.no ? ' (' + e.no + ')' : ''}</button>
          <button className="btn" data-act="tgBo" data-arg={e.i}>{T('tg.bo')}</button>
        </div>
      ))}
    </div>
  );
}

export function TuiDo() {
  const r = PS.run2(), items = PS.bagItems();
  return <>
    <div className="bagtop">
      <div className="bst bst-tien" {...tip('Hầu bao: tiền phàm (xu, lượng bạc, lượng vàng) và linh thạch bốn phẩm' + (r.thuongLenh ? '\nThưởng Lệnh: ' + r.thuongLenh : ''))}><small>Tiền tệ</small><CumTien r={r} />{!!r.thuongLenh && <small className="tl">Thưởng Lệnh {r.thuongLenh}</small>}</div>
      <div className="bcap" {...tip('Sức chứa tăng theo cảnh giới và túi trữ vật đang đeo.\nTối đa ' + PS.BAG_MAX + ' ô.')}><small>Túi đồ</small><b>{items.length} / {PS.bagCap()} ô</b>{PS.tuiSlots && PS.tuiSlots() > 0 && !PS.tuiOn() && <small className="tkh-n"><Ic n="lock" /> {PS.tuiSlots()} ô túi đang khoá</small>}</div>
      <button className="icb" data-act="phamHelp" aria-label="Các phẩm" {...tip('Bảng màu các phẩm')}>?</button>
    </div>
    <div className="bagwrap bag-only">
      <div className="bagR"><CotPhai items={items} /><p className="hint">Chạm món đồ để xem cách dùng. Mặc, tháo trang bị ở thẻ Trang bị.</p><TamGiu /></div>
    </div>
  </>;
}
