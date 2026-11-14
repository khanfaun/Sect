// Các hộp thoại theo loại (UI.modal.k). Loại nào chưa có ở đây thì dùng bản cũ.
import { TuDia, GhiChu, KetQua, DienBienTran, TranDangDo, DevTest, NhanSu } from './ThongTin';
import { DienCongHien, LaiBuon, TramDich } from './MuaBan';
import { ThamDo } from './ThamDo';
import { HopChon } from './HopChon';
import { BeQuan } from './BeQuan';
import { LinhNgoGap, LinhNgoThem } from './LinhNgoGap';
import { KhiVan, ChonTienThien } from './KhiVan';
import { XemVatPham, XemCongPhap, CacPham, TieuHuyet } from './VatPham';
import { XacNhanViec, XacNhanNoiChon, LamNhiemVu, HuyNhiemVu } from './XacNhan';

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
  pconf: XacNhanViec,
  vconf: XacNhanNoiChon,
  vreq: XacNhanNoiChon,
  qdo: LamNhiemVu,
  qdrop: HuyNhiemVu,
  pick: HopChon,
  bq: BeQuan,
  bbLearn: LinhNgoGap,
  bbLearn2: LinhNgoThem,
  asc: KhiVan,
  kvPick: ChonTienThien,
  item: XemVatPham,
  art: XemCongPhap,
  pham: CacPham,
  th: TieuHuyet,
};
