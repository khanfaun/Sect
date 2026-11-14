// Các bảng mở từ thanh dưới (UI.panel). Bảng nào chưa có ở đây thì dùng bản cũ.
import { LinhThu } from './LinhThu';
import { SoTay, BangThienHa } from './SoTay';
import { GiaoTinh } from './GiaoTinh';
import { LuyenChe } from './LuyenChe';
import { Them, TongMon } from './Them';
import { NhanVat } from './NhanVat';

export const BANG = {
  pets: LinhThu,
  journal: SoTay,
  affairs: BangThienHa,
  bonds: GiaoTinh,
  craft: LuyenChe,
  more: Them,
  tong: TongMon,
  char: NhanVat,
};
