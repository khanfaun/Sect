// Các mảnh giao diện dùng chung: biểu tượng, thanh, chú thích khi chạm/rê chuột.
import { PS } from '../html';
export { Tabs, Tranh } from '../html';

// tip('...') → thuộc tính data-tip (game tự hiện ô chú thích), viết hoa chữ đầu như bản cũ.
export const tip = s => (s ? { 'data-tip': String(s)[0].toUpperCase() + String(s).slice(1) } : {});

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
