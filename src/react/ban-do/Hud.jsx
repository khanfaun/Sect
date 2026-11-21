// Thanh trên khi xem bản đồ (chế độ Hành tẩu): nút về Động phủ, nơi đang đứng, giờ, khí huyết/linh lực gọn.
import { Html, PS } from '../html';
import { tip } from '../chung';
import { TanThu } from '../chung/TanThu';
import { Anh } from '../dong-phu/TrangChu';

export function Hud() {
  const { G, clamp } = PS;
  const r = G.run, s = PS.S(), t = PS.W().t, pa = PS.PART[PS.partOf(t)];
  const hp = clamp(r.hp / Math.max(1, s.maxHp), 0, 1), mp = clamp(r.mp / Math.max(1, s.maxMp), 0, 1);
  const n = PS.nodeById(r.at), I = n ? PS.hexInfo(PS.nodeHex(n)) : {};
  return <div className="z-mtop">
    <button className="z-ve" data-act="xemHome" aria-label="Về động phủ"><Anh n="nut-quay-lai" cls="z-ve-a" /><span>Động phủ</span></button>
    <div className="z-mtop-t">
      <b>{n && !n.wp ? n.name : I.ter || 'Chốn hoang'}</b>
      <small>{[I.dist, I.regName].filter(Boolean).join(' · ')}</small>
      <span className="z-hm" {...tip('Khí huyết ' + PS.pctOf(r.hp, s.maxHp) + '\n' + PS.mpName() + ' ' + (s.maxMp ? PS.pctOf(r.mp, s.maxMp) : 'chưa có'))}>
        <i className="hp"><b style={{ width: hp * 100 + '%' }} /></i><i className="mp"><b style={{ width: mp * 100 + '%' }} /></i>
      </span>
    </div>
    <Html as="div" className="z-clk" id="clk" {...tip(PS.dateText(t) + '\nBuổi ' + pa.n + ', mùa ' + PS.SEASON[PS.seasonOf(t)])} h={PS.clkStr(t)} />
    <TanThu />
  </div>;
}
