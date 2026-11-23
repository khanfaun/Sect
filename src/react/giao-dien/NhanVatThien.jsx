// Nhân vật chính ngồi thiền (nhiều lớp ảnh, chuyển động bằng CSS như bản mẫu):
// vạt áo trái/phải đung đưa (.ofl/.ofr), ngực thở (.och), tóc lay (.hair, mặt nạ tóc), hạt châu xoay + hào quang thở.
// Ngoại hình (độ tuổi, tóc, áo, hạt châu) lấy từ ngoaiHinh() ở core2/84-ngoai-hinh.js nên lớn tuổi là tự đổi hình.
import { PS } from '../html';
import { I } from './anh';
import './doll3.css';

// nut: nút đặt ngay trên hạt châu (vd nút Đột phá / Xung kích khi đủ điều kiện)
export function NhanVatThien({ orb, cls, nut }) {
  const N = PS.ngoaiHinh ? PS.ngoaiHinh() : { toc: 'r1', ao: 'hero', chau: 'teal', hien: 'young' };
  const chau = orb || N.chau;
  if (N.nu) return (
    <div className={'doll3 nu ' + (cls || '')} aria-hidden="true" data-tuoi={N.tuoi}><div className="shd" /><img className="nu-i" src={I('de-tu-1')} alt="" /><div className={'hal ' + chau} />{nut && <div className="doll-nut">{nut}</div>}</div>
  );
  const o = I('ch-of-' + N.ao), h = I('ch-head-' + N.toc), v = I('ch-hmv-' + N.toc);
  const mk = { WebkitMaskImage: `url(${v})`, maskImage: `url(${v})` };
  return (
    <div className={'doll3 ' + (cls || '')} aria-hidden="true" data-tuoi={N.tuoi} data-toc={N.toc} data-ao={N.ao} data-chau={chau}>
      <div className="shd" />
      <img className="ost" src={o} alt="" /><img className="ofl" src={o} alt="" /><img className="ofr" src={o} alt="" /><img className="och" src={o} alt="" />
      <div className={'hg s-' + N.toc}><img src={h} alt="" /></div>
      <div className={'hg hair s-' + N.toc} style={mk}><img src={h} alt="" /></div>
      <div className={'hal ' + chau} />
      <div className="glw"><img className="gl" src={I('ch-glow-' + chau)} alt="" /></div>
      <div className={'hco ' + chau} />
      <img src={I('ch-hands')} alt="" />
      {nut && <div className="doll-nut">{nut}</div>}
    </div>
  );
}

// Chân dung tròn: cắt phần đầu của chính hình nhân vật ngồi thiền, nên luôn khớp ngoại hình (tuổi, tóc, áo) ở thẻ Trang bị / túi đồ.
// Trả về chuỗi HTML để dùng cả trong giao diện cũ (trận đánh) lẫn React.
export function avatarHTML() {
  const N = PS.ngoaiHinh ? PS.ngoaiHinh() : { toc: 'r1', ao: 'hero', hien: 'young' };
  if (N.nu) return `<span class="avd nu"><span class="doll3 av-doll"><img class="nu-i" src="${I('de-tu-1')}" alt=""></span></span>`;
  const o = I('ch-of-' + N.ao), h = I('ch-head-' + N.toc), v = I('ch-hmv-' + N.toc);
  const mk = `-webkit-mask-image:url(${v});mask-image:url(${v})`;
  return `<span class="avd t-${N.toc}"><span class="doll3 av-doll"><img class="ost" src="${o}" alt=""><span class="hg s-${N.toc}"><img src="${h}" alt=""></span><span class="hg hair s-${N.toc}" style="${mk}"><img src="${h}" alt=""></span></span></span>`;
}
if (typeof window !== 'undefined') window.avatarMe = avatarHTML; // PS là Proxy đọc theo tên toàn cục, nên gắn vào window
