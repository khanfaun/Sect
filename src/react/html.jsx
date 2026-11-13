// Chèn một đoạn HTML do phần game cũ tạo ra (biểu tượng, ô chú thích…) vào giữa JSX.
// Dùng tạm trong lúc các mảnh nhỏ đó chưa được chuyển sang React.
export function Html({ as: Tag = 'span', h, ...rest }) {
  return <Tag {...rest} dangerouslySetInnerHTML={{ __html: h }} />;
}
// Đọc biến chung của game (G, UI, CFG, ORIGIN, các hàm…)
export const PS = new Proxy({}, { get: (_, k) => window.PS[k] });

// Khung tranh thủy mặc (game tự vẽ vào sau mỗi lần cập nhật màn hình) — giống sceneCv() bản cũ.
export function Tranh({ seed, reg, type, cls, figs }) {
  const { G } = PS;
  const night = G.meta && G.meta.world && PS.partOf(PS.W().t) === 'dem' ? 1 : 0;
  return <canvas className={'art ' + (cls || '')} data-scene={[seed, reg, type || '', night, figs || ''].join('~')} />;
}

// Thanh thẻ chọn mục — giống tabsHTML() bản cũ.
export function Tabs({ k, list, cur }) {
  return (
    <div className="tabs">
      {list.map(([id, n]) => <button key={id} data-act="tab" data-arg={k + ':' + id} className={id === cur ? 'on' : ''}>{n}</button>)}
    </div>
  );
}
