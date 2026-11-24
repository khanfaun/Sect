// Nhân vật chính ngồi thiền (một ảnh nguyên vẹn, chuyển động bằng CSS):
// ảnh đứng yên (đã bỏ lớp vạt áo đung đưa và lớp thở: lệch mép thành vệt), hạt châu xoay + hào quang thở.
// Ngoại hình (độ tuổi, tóc, áo, hạt châu) lấy từ ngoaiHinh() ở core2/84-ngoai-hinh.js nên lớn tuổi là tự đổi hình.
import { PS } from '../html';
import { I } from './anh';
import './doll3.css';

// nut: nút đặt ngay trên hạt châu (vd nút Đột phá / Xung kích khi đủ điều kiện)
// Mỗi ngoại hình là MỘT ảnh nguyên vẹn (đủ áo và bàn tay) nv-<tuổi>-<áo>[-<tóc>] (tools/nv-comfy.py), cùng ảnh đó dùng 4 lần
// với mặt nạ khác nhau để vạt áo trái/phải đung đưa và ngực thở.
const MAC = { hien: 'young', ao: 'pho', toc: 'den', anh: 'nv-young-pho-den-duoi', chau: 'teal' };

export function NhanVatThien({ orb, cls, nut }) {
  const N = PS.ngoaiHinh ? PS.ngoaiHinh() : MAC;
  const chau = orb || N.chau;
  if (N.nu) return (
    <div className={'doll3 nu ' + (cls || '')} aria-hidden="true" data-tuoi={N.tuoi}><div className="shd" /><img className="nu-i" src={I('de-tu-1')} alt="" /><div className={'hal ' + chau} />{nut && <div className="doll-nut">{nut}</div>}</div>
  );
  const o = I(N.anh) || I(MAC.anh);
  return (
    <div className={'doll3 ' + (cls || '')} aria-hidden="true" data-tuoi={N.hien} data-toc={N.toc} data-ao={N.ao} data-anh={N.anh} data-chau={chau}>
      <div className="shd" />
      <div className="nvk"><img className="ost" src={o} alt="" /></div>
      <div className={'hal ' + chau} />
      <div className="glw"><img className="gl" src={I('ch-glow-' + chau)} alt="" /></div>
      <div className={'hco ' + chau} />
      {nut && <div className="doll-nut">{nut}</div>}
    </div>
  );
}

// Chân dung tròn: chính ảnh nhân vật, đứng yên, cắt lấy đầu và vai. Trả về chuỗi HTML (dùng cả trong trận đánh lẫn React).
export function avatarHTML() {
  const N = PS.ngoaiHinh ? PS.ngoaiHinh() : MAC;
  if (N.nu) return `<span class="avd nu"><span class="doll3 av-doll"><img class="nu-i" src="${I('de-tu-1')}" alt=""></span></span>`;
  return `<span class="avd t-${N.hien}"><span class="doll3 av-doll" data-tuoi="${N.hien}"><span class="nvk"><img src="${I(N.anh) || I(MAC.anh)}" alt=""></span></span></span>`;
}
if (typeof window !== 'undefined') window.avatarMe = avatarHTML; // PS là Proxy đọc theo tên toàn cục, nên gắn vào window
