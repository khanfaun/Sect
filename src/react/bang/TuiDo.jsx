// Thẻ túi đồ trong bảng nhân vật: hình người mặc trang bị, pháp bảo, đan điền uẩn dưỡng,
// pháp khí tùy thân; bên phải là bộ lọc và lưới ô đồ.
import { Html, PS } from '../html';
import { DdSel, Ic, SlotX, Stone, Tranh, pcs, tah, tip } from '../chung';

// Một ô trang bị: bấm mở hộp chọn, nút × ở góc để tháo (giống eqCell())
function OTrangBi({ k, label, rel, o = {} }) {
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

function PhuongTien({ k, n }) {
  const { G, ASSET } = PS;
  const r = G.run, m = PS.mountOf(), off = r.vehOff || r.rentOff;
  const t = m ? m.n + (m.d ? '\n' + m.d : '') + '\nTốc độ ×' + PS.numVN(m.m || 1) : off ? 'Đang tháo ' + off.n + (off.v ? off.v.n : '') + '. Chạm để dùng lại.' : 'Chưa có phương tiện. Sắm ở Trạm dịch trong thôn trấn.';
  return (
    <div className={'eqc' + (m ? ' on' : '')} style={m ? pcs(m.tier || 1) : undefined} data-act={off && !m ? 'vehOn' : undefined} {...tip(t)}>
      {m && m.k && ASSET.veh && ASSET.veh[m.k] ? <img className="asset" src={ASSET.veh[m.k]} alt="" /> : <Html style={{ display: 'contents' }} h={PS.slotIcon(k)} />}
      <small>{m ? m.n : n}</small>
      {m && <SlotX act="vehOff" arg="" t="Tháo phương tiện" />}
    </div>
  );
}

const Help = ({ t }) => <span className="qhelp" {...tip(t)}><Ic n="info" cls="sm" /></span>;

function CotTrai() {
  const { REALM, PB_SLOTS, PB_REQ, DD_N, SLOTS, SPEC } = PS;
  const r = PS.run2(), E = PS.eqOf(), dn = DD_N[r.realm], po = PS.pbOpen();
  return (
    <div className="eqwrap">
      <div className="doll">
        <Tranh seed={'doll' + r.ten} reg={r.region} type="" cls="dollbg" figs="nhan:0.5:0.92:0:doll" />
        <div className="dgrid">{SLOTS.map(([k, n]) => <OTrangBi key={k} k={'E' + k} label={n} rel={E[k]} o={{ ic: k, x: ['eqOff', k, 'Tháo ra'] }} />)}</div>
      </div>
      <div className="ddpair">
        <div className="ddg">
          <h4 className="sgrp">Pháp bảo <small>{PB_SLOTS.filter(k => E[k]).length}/{po}</small><span className="grow"></span><Help t="Pháp bảo đang mang theo người: cho chỉ số. Ô thứ nhất mở ở Trúc Cơ, ô thứ hai ở Kết Đan, ô thứ ba ở Nguyên Anh." /></h4>
          <div className="ddrow three">
            {PB_SLOTS.map((k, j) => j < po
              ? <OTrangBi key={k} k={'E' + k} label="Pháp bảo" rel={E[k]} o={{ ic: 'phapbao', x: ['eqOff', k, 'Tháo ra'] }} />
              : <OTrangBi key={k} k={'E' + k} label={REALM[PB_REQ[j]]} rel={null} o={{ lock: 1, ic: 'phapbao', tip: 'Mở khi đạt ' + REALM[PB_REQ[j]] + '.' }} />)}
          </div>
          <h4 className="sgrp">Đan điền · uẩn dưỡng <small>{r.dd.length}/{dn}</small><span className="grow"></span><Help t="Vũ khí, pháp bảo nuôi trong đan điền mỗi năm mạnh thêm 5% (tối đa gấp đôi), vẫn cho chỉ số, và trong trận tế ra đánh được một lần." /></h4>
          <div className="ddrow">
            {[0, 1, 2, 3].map(j => {
              const d = r.dd[j];
              if (d) return <OTrangBi key={j} k={'D' + j} label="" rel={d.rel} o={{ badge: '+' + Math.round((PS.ddMul(d) - 1) * 100) + '%', x: ['ddTake', j, 'Lấy ra'] }} />;
              const need = DD_N.findIndex(x => x > j);
              return <OTrangBi key={j} k={'D' + j} label={j < dn ? 'Trống' : REALM[need]} rel={null} o={{ lock: j >= dn, ic: 'phapbao', tip: j < dn ? 'Chạm để chọn vũ khí hoặc pháp bảo đưa vào uẩn dưỡng.' : 'Mở khi đạt ' + REALM[need] + '.' }} />;
            })}
          </div>
        </div>
        <div className="ddg">
          <h4 className="sgrp">Pháp khí tùy thân</h4>
          <div className="ddrow five">
            {SPEC.map(([k, n]) => k === 'phuongtien' ? <PhuongTien key={k} k={k} n={n} /> : <OTrangBi key={k} k={'E' + k} label={n} rel={E[k]} o={{ ic: k, x: ['eqOff', k, 'Tháo ra'] }} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

const SORT = ['Phẩm cao', 'Phẩm thấp', 'Tên A–Z', 'Loại'];
const SORTF = [(a, b) => b.tier - a.tier || a.n.localeCompare(b.n), (a, b) => a.tier - b.tier || a.n.localeCompare(b.n), (a, b) => a.n.localeCompare(b.n), (a, b) => a.cat.localeCompare(b.cat) || b.tier - a.tier];

// Nhãn yêu cầu cảnh giới góc ô (bí tịch chưa đủ cảnh giới, đồ chưa dùng được)
function YeuCau({ x, r }) {
  const rl = x.ref && x.ref.t === 'rel' && r.relics[x.ref.i];
  if (rl && rl.k === 'book' && rl.art && r.realm < rl.art.req) return <em className="rq">{PS.reqName(rl.art.req)}</em>;
  return rl && rl.k !== 'book' && !PS.relOk(rl) ? <em className="rq">{PS.LV_NAME[PS.relReq(rl)]}</em> : null;
}

function CotPhai({ items }) {
  const { BAG_CAT, PHAM, BAG_MAX } = PS;
  const r = PS.run2(), B = PS.bagSt();
  const cnt = c => c === 'all' ? items.length : items.filter(x => x.cat === c).length;
  const V = items.filter(x => (B.tab === 'all' || x.cat === B.tab) && (B.pham < 0 || x.tier === B.pham)).sort(SORTF[B.sort]);
  const cap = PS.bagCap(), full = B.tab === 'all' && B.pham < 0;
  const emp = full ? Math.max(0, cap - V.length) : Math.max(0, Math.ceil(Math.max(V.length, 10) / 6) * 6 - V.length);
  const locked = full ? Math.max(0, BAG_MAX - Math.max(cap, V.length)) : 0;
  return <>
    <div className="bfil">
      <DdSel act="bagTab" label="Loại" opts={Object.keys(BAG_CAT).map(c => ({ v: c, h: PS.esc(BAG_CAT[c]) + (cnt(c) ? ` <small>${cnt(c)}</small>` : '') }))} cur={B.tab} />
      <DdSel act="bagPham" label="Phẩm" opts={[{ v: -1, h: 'Mọi phẩm' }].concat(PHAM.map((p, i) => ({ v: i, h: PS.qName(p, i) })))} cur={B.pham} />
      <DdSel act="bagSort" label="Sắp xếp" opts={SORT.map((n, i) => ({ v: i, h: n }))} cur={B.sort} />
    </div>
    <div className="bscroll">
      <div className="bgrid">
        {V.map(x => (
          <button key={x.key} className={'bc on' + (B.sel === x.key ? ' sel' : '')} data-act="bagSel" data-arg={x.key} style={pcs(x.tier)} {...tah(PS.itemTip(x))}>
            <Html style={{ display: 'contents' }} h={PS.itemArt(x)} />
            {x.cnt > 1 && <i>{x.cnt}</i>}
            {PS.itemLocked(x) && <em className="lk"><Ic n="lock" /></em>}
            <YeuCau x={x} r={r} />
          </button>
        ))}
        {Array.from({ length: emp }, (_, i) => <span key={'e' + i} className="bc"></span>)}
        {Array.from({ length: locked }, (_, i) => <span key={'l' + i} className="bc lock" {...tip('Ô bị khóa. Lên cảnh giới hoặc đeo túi trữ vật tốt hơn để mở.')}><Ic n="lock" /></span>)}
      </div>
    </div>
    {!V.length && items.length > 0 && <p className="hint">Không có món nào khớp bộ lọc.</p>}
  </>;
}

export function TuiDo() {
  const r = PS.run2(), items = PS.bagItems();
  return <>
    <div className="bagtop">
      <div className="bst" {...tip('Linh thạch: tiền tệ của giới tu tiên')}><span><small>Linh thạch</small><Stone v={r.st} /></span></div>
      <div className="bcap" {...tip('Sức chứa tăng theo cảnh giới và túi trữ vật đang đeo.\nTối đa ' + PS.BAG_MAX + ' ô.')}><small>Túi đồ</small><b>{items.length} / {PS.bagCap()} ô</b></div>
      <button className="icb" data-act="phamHelp" aria-label="Các phẩm" {...tip('Bảng màu các phẩm')}>?</button>
    </div>
    <div className="bagwrap">
      <div className="bagL"><CotTrai /></div>
      <div className="bagR"><CotPhai items={items} /><p className="hint">Chạm một món để xem và dùng. Ô trang bị: chạm để chọn đồ, dấu × ở góc để tháo.</p></div>
    </div>
  </>;
}
