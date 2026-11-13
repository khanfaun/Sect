// Lối vào phần giao diện React. Phần luật chơi và các màn chưa chuyển vẫn nằm ở src/game/.
// Mỗi màn React đăng ký tên ở đây; src/game/ui/22-cau-noi-react.js gọi RX.show để vẽ.
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { ManMoDau, ManChonKiep, ManHetKiep, ManBenVongXuyen, ManMoDauKiep } from './man-ngoai';

const VIEWS = {
  Title: ManMoDau,
  Birth: ManChonKiep,
  Over: ManHetKiep,
  Meta: ManBenVongXuyen,
  Life: ManMoDauKiep,
};

window.RX = {
  has: name => !!VIEWS[name],
  // vẽ ngay (đồng bộ) để phần vẽ tranh của game chạy sau đó thấy được khung mới
  show(el, name) {
    if (!el._rx) { el.innerHTML = ''; el._rx = createRoot(el); }
    const View = VIEWS[name];
    flushSync(() => el._rx.render(<View />));
  },
  hide(el) {
    if (el._rx) { el._rx.unmount(); el._rx = null; }
  },
};

// game đã vẽ màn đầu bằng bản cũ trước khi React nạp xong: vẽ lại bằng React
if (typeof window.render === 'function') window.render();
