// Nhân vật chính ngồi thiền (nhiều lớp ảnh, chuyển động bằng CSS) — dùng ở bế quan, bảng nhân vật.
// Từ 70 tuổi (nam) dùng lão giả; hạt châu vàng khi đủ điều kiện đột phá, còn lại xanh ngọc.
import { PS } from '../html';
import { I } from './anh';
import './doll3.css';

export function NhanVatThien({ orb, cls }) {
  const r = PS.G.run;
  const st = r && r.age >= 70 ? 'e1' : 'r1', of = st === 'e1' ? 'e1' : 'hero';
  const o = I('ch-of-' + of), h = I('ch-head-' + st), v = I('ch-hmv-' + st);
  const gold = orb || (PS.canBreak && PS.canBreak() ? 'gold' : 'teal');
  if (r && r.g === 'nu') return (
    <div className={'doll3 nu ' + (cls || '')} aria-hidden="true"><div className="shd" /><img className="nu-i" src={I('de-tu-1')} alt="" /><div className={'hal ' + gold} /></div>
  );
  const mk = { WebkitMaskImage: `url(${v})`, maskImage: `url(${v})` };
  return (
    <div className={'doll3 ' + (cls || '')} aria-hidden="true">
      <div className="shd" />
      <img className="ost" src={o} alt="" /><img className="ofl" src={o} alt="" /><img className="ofr" src={o} alt="" /><img className="och" src={o} alt="" />
      <div className={'hg s-' + st}><img src={h} alt="" /></div>
      <div className={'hg hair s-' + st} style={mk}><img src={h} alt="" /></div>
      <div className={'hal ' + gold} />
      <div className="glw"><img className="gl" src={I('ch-glow-' + gold)} alt="" /></div>
      <div className={'hco ' + gold} />
      <img src={I('ch-hands')} alt="" />
    </div>
  );
}
