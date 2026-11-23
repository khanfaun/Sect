// Giao diện riêng cho máy tính (màn rộng, xem laPC() ở ui/35-giao-dien-moi.js):
// thanh trên ngang màn (ngày giờ, tiền tệ, nút), cột trái nhân vật + chỉ số + menu có phím tắt,
// cột phải nhiệm vụ / trạng thái / công cụ bản đồ. Bảng, địa điểm, bế quan mở thành cửa sổ ở vùng giữa (CSS: may-tinh.css).
import { Html, PS } from '../html';
import { Ic, Rt, tip } from '../chung';
import { TanThu } from '../chung/TanThu';
import { I } from '../giao-dien/anh';
import { NhanDotPha } from '../ban-do/Hud';
import { CumTien, DaiVetThuong } from '../ban-do/NutBanDo';
import './may-tinh.css';

export const laPC = () => typeof PS.laPC === 'function' && PS.laPC();

// ---------- thanh trên ----------
export function ThanhTren() {
  const r = PS.G.run, t = PS.W().t, pa = PS.PART[PS.partOf(t)];
  return (
    <div className="pc-top">
      <div className="pc-brand"><img src={I('cau-tu')} alt="" /><b>Phù Sinh</b></div>
      <div className="pc-ngay" {...tip(PS.dateText(t) + '\nBuổi ' + pa.n + ', mùa ' + PS.SEASON[PS.seasonOf(t)])}>
        <Html as="div" className="hud-clk3" id="clk" h={PS.clkStr(t)} />
        <small>Buổi {pa.n.toLowerCase()} · mùa {PS.SEASON[PS.seasonOf(t)].toLowerCase()}</small>
      </div>
      <div className="pc-tien"><CumTien r={r} /></div>
      <div className="pc-nut">
        {PS.hopL && PS.hopL(r).length > 0 && <button className="pc-ib hi" data-act="hopThu" {...tip('Hộp thư: lời công trình gửi về')}>📮<em>{PS.hopL(r).length}</em></button>}
        {!!PS.DEV && <button className="pc-ib" data-act="devOpen" {...tip('Dev test')}><Ic n="bolt" /></button>}
        <button className="pc-ib" data-act="panel" data-arg="more" {...tip('Thêm: cấu hình, chú giải, ghi chú, cách chơi')}><img src={I('it-lenh-bai')} alt="" /></button>
      </div>
    </div>
  );
}

// thanh có số
function Thanh({ n, v, max, cls, txt, t }) {
  const p = max > 0 ? Math.max(0, Math.min(100, 100 * v / max)) : 0;
  return (
    <div className={'pc-bar ' + cls} {...tip(t)}>
      <span className="pc-bn">{n}</span>
      <span className="pc-bt">{txt != null ? txt : Math.round(v) + ' / ' + Math.round(max)}</span>
      <i><b style={{ width: p + '%' }} /></i>
    </div>
  );
}

const MENU = [
  ['bag', 'it-ruong', 'Túi đồ', 'bagOpen', '', '1'],
  ['char', 'it-ao-lam', 'Nhân vật', 'navChar', '', '2'],
  ['tong', 'it-co', 'Tông môn', 'panel', 'tong', '3'],
  ['map', 'cau-tu', 'Bản đồ', 'closePanel', '', '4'],
  ['pets', 'it-trung', 'Linh thú', 'panel', 'pets', '5'],
  ['journal', 'it-bi-kip', 'Sổ tay', 'panel', 'journal', '6'],
  ['bonds', 'it-lenh-ngoc', 'Giao tình', 'panel', 'bonds', '7'],
];

// ---------- cột trái: nhân vật, chỉ số, việc nhanh, menu ----------
export function CotTrai() {
  const { G, UI } = PS;
  const r = G.run, s = PS.S(), left = s.life - r.age, warn = left < s.life * 0.12;
  const tal = PS.playerTal(), tm = r.tamma || 0, voK = PS.voKnown();
  const W0 = PS.wounds(), hurt = W0.length ? PS.WOUND[W0[0].k].n + (W0.length > 1 ? ' +' + (W0.length - 1) : '') : '';
  const bqNo = PS.bqCan(), brk = PS.canBreak();
  const on = k => k === 'map' ? !UI.panel : k === 'bag' ? UI.panel === 'char' && UI.tab.char === 'bag' : k === 'char' ? UI.panel === 'char' && UI.tab.char !== 'bag' : UI.panel === k;
  const dot = { journal: r.quests.some(q => q.state === 'open'), pets: r.eggs && r.eggs.length > 0 };
  const an = (PS.anShow ? PS.anShow(r) : PS.needFood && PS.needFood(r));
  return (
    <div className="pc-trai">
      <div className="pc-nv">
        <button className={'pc-av' + PS.talCls(tal)} data-act="navChar" {...tip('Mở bảng nhân vật (phím 2)')}>
          <Html className="pc-avi" h={PS.assetImg('hero', 'me', `<span class="av-txt">${PS.esc((r.ten.split(' ').pop() || '?')[0])}</span>`)} />
          {tal && tal.tier >= 0 && <Html className="tfr" h={PS.talFrameSVG(tal, 'pctf')} />}
        </button>
        <div className="pc-id">
          <b className="pc-ten">{r.ten}</b>
          <span className="pc-cg">{PS.realmLabel()}</span>
          <small className={warn ? 'bad' : ''}>{Math.floor(r.age)} tuổi · còn {Math.max(0, Math.floor(left))} năm</small>
          {hurt && <small className="bad">{hurt}</small>}
          <NhanDotPha />
        </div>
      </div>
      <div className="pc-bars">
        <Thanh n="Khí huyết" v={r.hp} max={s.maxHp} cls={'hp' + (r.hp < s.maxHp * 0.35 ? ' low' : '')} t="Khí huyết: về 0 là thua trận" />
        {s.maxMp > 0 && <Thanh n={PS.mpName()} v={r.mp} max={s.maxMp} cls="mp" t={PS.mpName() + ': dùng để ra chiêu'} />}
        {!voK && PS.rootKnown() && <Thanh n="Tu vi" v={PS.tvShow()} max={100} cls="tv" txt={PS.btReadyTv() ? 'viên mãn' : PS.tvShow() + '%'} t="Tu vi: đầy thì đủ sức đột phá" />}
        {!voK && <Thanh n="Lịch luyện" v={PS.llShow()} max={100} cls="ll" txt={PS.llShow() + '%'} t="Lịch luyện: có được nhờ thực chiến, tới nơi mới, quen người mới, làm xong việc. Muốn đột phá cần đầy." />}
      </div>
      <div className="pc-cs">
        <div {...tip('So với người cùng cảnh giới, tính từ chỉ số chiến đấu và trang bị.')}><img src={I('sk-sword')} alt="" /><span>Lực chiến</span><Rt k="lc" v={PS.lucChien()} /></div>
        <div {...tip('Tốc độ tu luyện khi bế quan ở chỗ đang đứng')}><img src={I('cau-tu')} alt="" /><span>Tu luyện</span><Rt k="bq" v={PS.bqReal()} kind="toc" /></div>
        <div {...tip('Chống ảo cảnh, tâm ma; giúp đột phá')}><img src={I('it-sen')} alt="" /><span>Đạo tâm</span><Rt k="tam" v={s.tam} kind="muc" /></div>
        <div className={tm >= 60 ? 'hi' : ''} {...tip('Tâm ma ' + Math.round(tm) + '/100. Đầy sẽ phải đối mặt với chính mình.')}><img src={I('cau-ma')} alt="" /><span>Tâm ma</span><b>{PS.tmWord(tm)}</b></div>
        {an && <button data-act="anMuc" className={PS.anState(r) !== 'no' ? 'hi' : ''} {...tip('Cái ăn: no ' + (r.no != null ? r.no : 100) + '/100\nMức ăn: ' + PS.anMuc(r).n + '\nChạm để đổi mức ăn')}><i className="pc-em">🍚</i><span>Cái ăn</span><b>{PS.contentText('an.' + PS.anState(r))}</b></button>}
      </div>
      <div className="pc-viec">
        <button className={'pc-vb' + (brk ? ' glow' : '')} data-act="hudBq" disabled={!!bqNo || voK} {...tip(voK ? 'Vô linh căn: chưa thể bế quan' : bqNo || 'Bế quan, tĩnh toạ, xem cảnh giới (phím B)')}><img src={I('it-sen')} alt="" /><span>Tu luyện</span></button>
        <button className={'pc-vb' + (UI.panel === 'craft' ? ' on' : '')} data-act="panel" data-arg="craft" disabled={r.moving} {...tip('Luyện đan, luyện khí từ vật liệu')}><img src={I('it-lo-dan')} alt="" /><span>Luyện chế</span></button>
      </div>
      <div className="pc-menu">
        {MENU.map(([k, im, n, act, arg, ph]) => (
          <button key={k} className={'pc-mi nv-' + k + (on(k) ? ' on' : '')} data-act={act} data-arg={arg || undefined}>
            <img src={I(im)} alt="" draggable="false" /><span>{n}</span>
            {dot[k] && <em className="dot" />}
            <kbd>{ph}</kbd>
          </button>
        ))}
      </div>
    </div>
  );
}

// ---------- cột phải (chỉ khi đang xem bản đồ) ----------
export function CotPhai() {
  const { CFG, UI } = PS;
  const vt = DaiVetThuong();
  return <>
    <div className="pc-cong">
      <button className={'pc-cb' + (CFG.grid ? ' on' : '')} data-act="gridT"><Ic n="hex" /><span>Lưới ô</span></button>
      <button className={'pc-cb' + (UI.panel === 'more' && UI.tab.more === 'legend' ? ' on' : '')} data-act="legendOpen"><Ic n="list" /><span>Chú giải</span></button>
      {!PS.isPham() && <button className={'pc-cb' + (PS.tkActive() ? ' on' : '')} data-act="tkUse" disabled={!!PS.tkWhy() && !PS.tkActive()} {...tip(PS.tkWhy() || 'Phóng thần thức: nhìn xa hơn một lúc')}><Ic n="eye" /><span>Thần thức</span></button>}
      <button className="pc-cb" data-act="zoomAll"><Ic n="globe" /><span>Toàn đồ</span></button>
      <button className="pc-cb" data-act="center"><Ic n="target" /><span>Về chỗ</span></button>
    </div>
    <div className="pc-phai">
      <section className="pc-sec">
        <h4>Trạng thái</h4>
        {vt.length ? <div className="pc-vt">{vt}</div> : <p className="pc-trong">Bình an, không có gì đáng lo.</p>}
      </section>
      <section className="pc-sec pc-nvu"><TanThu /></section>
    </div>
  </>;
}
