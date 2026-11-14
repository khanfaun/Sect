// Các hộp thoại theo loại (UI.modal.k). Loại nào chưa có ở đây thì dùng bản cũ.
import { TuDia, GhiChu, KetQua, DienBienTran, TranDangDo, DevTest, NhanSu } from './ThongTin';
import { DienCongHien, LaiBuon, TramDich } from './MuaBan';
import { ThamDo } from './ThamDo';

export const HOP_THOAI = {
  danger: TuDia,
  note: GhiChu,
  res: KetQua,
  clog: DienBienTran,
  cbResume: TranDangDo,
  dev: DevTest,
  nhansu: NhanSu,
  conghien: DienCongHien,
  laibuon: LaiBuon,
  tram: TramDich,
  vehi: TramDich,
  explore: ThamDo,
};
