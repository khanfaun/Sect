// Ảnh công trình cho từng việc ở địa điểm (khoá việc trong PGROUP, ui/08-cac-canh-hien-de.js).
// Tạm dùng ảnh công trình / vật phẩm của bản mẫu; sau này có ảnh riêng (vd bd-tra-lau.webp) thì chỉ cần đổi tên ở đây.
// nho: 1 = ảnh vật nhỏ (không phải toà nhà) → vẽ nhỏ hơn, có đế tròn.
import { I } from './anh';

const CT = {
  // Sự vụ
  board: 'bd-truyen-cong', thuongcac: 'bd-chinh-dien', vay: ['it-nguyen-bao', 1], quanphu: 'bd-chinh-dien', chapphap: ['it-lenh-bai', 1],
  // Tông môn
  congmon: 'bd-chinh-dien', join: 'bd-chinh-dien', lib: 'bd-tang-kinh', nhansu: 'bd-truyen-cong', tongviec: 'bd-truyen-cong', conghien: 'bd-truyen-cong', tinhthat: 'bd-tu-linh',
  // Mua bán
  laibuon: 'bd-luyen-khi', taphoa: 'bd-luyen-khi', shop: 'bd-luyen-khi', doilt: ['it-linh-thach', 1], camdo: ['it-dong-tien', 1], ghost: 'bd-dong-thien', amhoi: 'bd-dong-thien',
  // Mưu sinh
  muusinh: 'bd-linh-thu',
  // Nghỉ chân
  nha: 'bd-dong-thien', tea: 'bd-linh-dien', inn: 'bd-tang-kinh', tuu: 'bd-dan-phong', tinh: 'bd-tu-linh', heal: 'bd-dan-phong',
  // Đi lại
  tram: 'bd-vo-truong', goback: ['it-ban-do', 1],
  // Tu luyện
  khaiphu: 'bd-dong-thien', thinhgiao: 'bd-truyen-cong', tumon: 'bd-chinh-dien', luyenvo: 'bd-vo-truong', loidai: 'bd-vo-truong',
  // Hoang dã
  sanbat: 'bd-linh-thu', sanyeu: 'bd-linh-thu', haithuoc: 'bd-linh-dien', daokhoang: 'bd-dong-thien',
  // Việc khác
  coduyen: ['it-sen', 1], grave: ['it-giay', 1], patron: ['it-lenh-ngoc', 1], bury: ['it-ruong', 1], quyan: ['it-kiem', 1], datdai: ['it-ban-do', 1],
  quyen: ['it-co', 1], dungdau: ['it-lenh-bai', 1], daomo: ['it-quang-lam', 1], aocanh: ['it-bua', 1], caitrang: ['it-ao-tim', 1], daisu: ['it-truc-thu', 1],
  // chuyện lớn
  boss: ['mo-huyet-ma', 1], cross: ['it-co', 1],
};
// theo nhóm khi việc chưa có trong bảng
const NHOM = { 'Sự vụ': 'bd-truyen-cong', 'Tông môn': 'bd-chinh-dien', 'Mua bán': 'bd-luyen-khi', 'Mưu sinh': 'bd-linh-thu', 'Nghỉ chân': 'bd-linh-dien', 'Đi lại': 'bd-vo-truong', 'Tu luyện': 'bd-tu-linh', 'Hoang dã': 'bd-linh-thu', 'Việc khác': ['it-ruong', 1] };

export function anhCongTrinh(k, nhom) {
  const v = CT[k] || NHOM[nhom] || ['it-ruong', 1];
  const [im, nho] = Array.isArray(v) ? v : [v, 0];
  return { src: I(im), nho: !!nho, ten: im };
}
