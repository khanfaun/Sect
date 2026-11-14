// Các cảnh hiện đè lên bản đồ, theo loại cảnh (sc.type). Loại nào chưa có ở đây thì dùng bản cũ.
import { SuKien, GioiThieuVung } from './SuKien';
import { ChamTran, SaoHuyet } from './ChamTran';
import { ChienLoiPham, PhuongThi, LinhNgo } from './ChienLoiPham';
import { DiaDiem } from './DiaDiem';
import { DocDuong, KyNgo } from './KyNgo';
import { ChuanBiDotPha } from './ChuanBiDotPha';
import { ChuanBiTran } from '../tran/ChuanBiTran';
import { QuanAi, KetQuaDotPha, BangTreoThuong, ChonDo } from './ViecKhac';

export const CANH = {
  event: SuKien,
  region: GioiThieuVung,
  enc: ChamTran,
  boss: SaoHuyet,
  reward: ChienLoiPham,
  shop: PhuongThi,
  swap: LinhNgo,
  place: DiaDiem,
  pass: QuanAi,
  btres: KetQuaDotPha,
  board: BangTreoThuong,
  bury: ChonDo,
  qev: DocDuong,
  kyngo: KyNgo,
  prep: ChuanBiDotPha,
  combat: ChuanBiTran,
};
