// Các mảnh giao diện dùng chung: biểu tượng, thanh, chú thích khi chạm/rê chuột.
import { PS } from '../html';
export { Tabs, Tranh } from '../html';

// tip('...') → thuộc tính data-tip (game tự hiện ô chú thích), viết hoa chữ đầu như bản cũ.
export const tip = s => (s ? { 'data-tip': String(s)[0].toUpperCase() + String(s).slice(1) } : {});

// Chú thích dạng HTML có định dạng (giống tah())
export const tah = h => (h ? { 'data-tip': '1', 'data-tiph': h } : {});

// Biểu tượng nét vẽ (giống ic() bản cũ)
export function Ic({ n, cls }) {
  return <svg className={'ic' + (cls ? ' ' + cls : '')} viewBox="0 0 24 24" aria-hidden="true"><path d={PS.ICP[n] || PS.ICP.info} /></svg>;
}
// Biểu tượng trong khung (giống ib())
export function Ib({ n, c }) {
  return <span className={'ib' + (c ? ' ib-' + c : '')}><Ic n={n} /></span>;
}
// Mức đánh giá có màu (giống RT())
export function Rt({ k, v, kind }) {
  const o = PS.rateOf(k, v, kind);
  return <span className={'rt rt' + o.lv}>{o.t}</span>;
}

// Màu theo phẩm (giống pcs())
export const pcs = t => ({ '--pc': PS.PCOL[PS.clamp(t || 0, 0, 6)] });

// Linh thạch kèm biểu tượng
export function Stone({ v }) {
  return <span className="stone"><i className="rh"></i>{v}</span>;
}

// Dải "chip" kết quả (được/mất): biểu tượng + chữ, màu theo phẩm nếu có
export function Chips({ list }) {
  if (!list || !list.length) return null;
  return (
    <div className="chips">
      {list.map((c, i) => (
        <span key={i} className={'chip ' + (c.c || '') + (c.tier != null ? ' tq' : '')} style={c.tier != null ? pcs(c.tier) : undefined}
          {...tip(c.tip)} data-tiph={c.h || undefined}
          dangerouslySetInnerHTML={{ __html: PS.emoIc(c.i) + ' ' + PS.emoTxt(PS.esc(c.t)) }} />
      ))}
    </div>
  );
}

// Thời gian + linh thạch phải tốn (giống costHTML())
export function Cost({ h, st }) {
  return <>
    {!!h && <span className="cost-t"><Ic n="hour" />{PS.durH(h)}</span>}
    {!!st && <span className="cost-s"><i className="rh"></i>{st}</span>}
  </>;
}

// Hộp thả xuống tự vẽ (giống ddSel()): mỗi lựa chọn {v, h} với h là chuỗi HTML
export function DdSel({ act, label, opts, cur }) {
  const o = opts.find(x => String(x.v) === String(cur)) || opts[0], open = PS.UI.dd === act;
  return (
    <div className={'ddw' + (open ? ' open' : '')}>
      <small>{label}</small>
      <button className="dds" data-act="ddOpen" data-arg={act}><span dangerouslySetInnerHTML={{ __html: o.h }} /><Ic n={open ? 'up' : 'down'} /></button>
      {open && (
        <div className="ddl">
          {opts.map(x => <button key={String(x.v)} className={'ddo' + (String(x.v) === String(cur) ? ' on' : '')} data-act={act} data-arg={x.v} dangerouslySetInnerHTML={{ __html: x.h }} />)}
        </div>
      )}
    </div>
  );
}

// Nút × nhỏ ở góc ô để gỡ / tháo (giống slotX())
export function SlotX({ act, arg, t }) {
  return <span className="slx" data-act={act} data-arg={arg} role="button" aria-label={t || 'Gỡ'} {...tip(t || 'Gỡ ra')}><Ic n="close" /></span>;
}
