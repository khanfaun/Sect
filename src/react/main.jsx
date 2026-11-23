// Lối vào phần giao diện React. Phần luật chơi và các màn chưa chuyển vẫn nằm ở src/game/.
// Mỗi màn React đăng ký tên ở đây; src/game/ui/22-cau-noi-react.js gọi RX.show để vẽ.
import { useLayoutEffect, useRef } from 'react';
import { createRoot } from 'react-dom/client';
import { flushSync } from 'react-dom';
import { ManMoDau, ManChonKiep, ManHetKiep, ManBenVongXuyen, ManMoDauKiep, ManKet } from './man-ngoai';
import { Hud } from './ban-do/Hud';
import { Nav } from './ban-do/Nav';
import { NutBanDo } from './ban-do/NutBanDo';
import { TheDiaDiem } from './ban-do/TheDiaDiem';
import { CANH } from './canh';
import { HOP_THOAI } from './hop-thoai';
import { BANG } from './bang';
import { TranDau } from './tran/TranDau';
import { PS } from './html';
import { ganAnh } from './giao-dien/anh';
import './giao-dien/giao-dien.css';

ganAnh();

const VIEWS = {
  Title: ManMoDau,
  Birth: ManChonKiep,
  Over: ManHetKiep,
  Ket: ManKet,
  Meta: ManBenVongXuyen,
  Life: ManMoDauKiep,
  Hud,
  Nav,
  NutBanDo,
  TheDiaDiem,
  TranDau,
};
// Các cảnh: 'Canh:<loại>' vẽ cảnh đang mở (G.run.scene)
// Hộp thoại: 'HopThoai:<loại>' vẽ hộp thoại đang mở (UI.modal)
// hộp nổi mở từ địa điểm: thêm nút X ở góc trên để đóng (chỉ đóng hộp, vẫn ở địa điểm)
const CO_X = new Set(['nhansu', 'conghien', 'laibuon', 'tram', 'vehi', 'explore', 'pconf', 'board', 'thuongcac', 'muusinh', 'vconf', 'vreq', 'hopthu']);
function CoX({ C }) {
  const ref = useRef(null);
  useLayoutEffect(() => {
    const b = ref.current && ref.current.nextElementSibling;
    const box = b && (b.classList.contains('mbox') ? b : b.querySelector('.mbox'));
    if (box && !box.querySelector(':scope > .mb-x')) {
      const x = document.createElement('button');
      x.className = 'mb-x'; x.dataset.act = 'modalX'; x.setAttribute('aria-label', 'Đóng'); x.title = 'Đóng'; x.textContent = '×';
      box.prepend(x);
    }
  });
  return <><i ref={ref} hidden /><C m={PS.UI.modal} /></>;
}
for (const [k, C] of Object.entries(HOP_THOAI)) VIEWS['HopThoai:' + k] = CO_X.has(k) ? () => <CoX C={C} /> : () => <C m={PS.UI.modal} />;
// Bảng: 'Bang:<tên>' vẽ bảng đang mở (UI.panel)
for (const [k, C] of Object.entries(BANG)) VIEWS['Bang:' + k] = C;
for (const [k, C] of Object.entries(CANH)) VIEWS['Canh:' + k] = () => <C sc={PS.G.run.scene} />;

window.RX = {
  has: name => !!VIEWS[name],
  // vẽ ngay (đồng bộ) để phần vẽ tranh của game chạy sau đó thấy được khung mới
  // key đổi (sang cảnh khác) thì dựng lại từ đầu, giống bản cũ thay hẳn nội dung
  show(el, name, key) {
    if (!el._rx) { el.innerHTML = ''; el._rx = createRoot(el); }
    const View = VIEWS[name];
    flushSync(() => el._rx.render(<View key={name + '|' + key} />));
  },
  hide(el) {
    if (el._rx) { el._rx.unmount(); el._rx = null; }
  },
};

// game đã vẽ màn đầu bằng bản cũ trước khi React nạp xong: vẽ lại bằng React
if (typeof window.render === 'function') window.render();
