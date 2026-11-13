// Các mảnh giao diện dùng chung: biểu tượng, thanh, chú thích khi chạm/rê chuột.
import { PS } from '../html';

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
