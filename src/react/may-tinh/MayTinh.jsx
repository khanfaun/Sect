// Giao diện riêng cho máy tính (màn rộng, xem laPC() ở ui/35-giao-dien-moi.js):
// cột trái chỉ có các mục (thu gọn / mở rộng được), thanh dưới chứa nhân vật (chân dung lớn ở giữa, thông tin chia hai bên),
// bản đồ chiếm phần còn lại. Bảng, địa điểm, tu luyện mở ở vùng giữa (CSS: may-tinh.css).
import { Html, PS } from '../html';
import { Ic, Rt, tip } from '../chung';
import { TanThu } from '../chung/TanThu';
import { I } from '../giao-dien/anh';
import { NhanDotPha } from '../ban-do/Hud';
import { DaiVetThuong, TienIco } from '../ban-do/NutBanDo';
import './may-tinh.css';

export const laPC = () => typeof PS.laPC === 'function' && PS.laPC();

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

// ---------- tiền tệ trên thanh dưới: dòng trên tiền phàm, dòng dưới 4 phẩm linh thạch (biểu tượng + tên + số) ----------
function TienPC({ r }) {
  const T = PS.TIEN, d = Math.round(r.bac || 0), no = d < 0, a = Math.abs(d);
  const vang = Math.floor(a / T.vang), bac = Math.floor((a % T.vang) / T.luong), xu = a % T.luong;
  const noT = no && PS.noTip ? '\n' + PS.noTip(r) : '';
  const phàm = [['xu', xu, 'Xu', 'Tiền lẻ của phàm nhân, dùng mua đồ rẻ.' + noT], ['bac', bac, 'Lượng bạc', 'Bằng ' + T.luong + ' xu.'], ['vang', vang, 'Lượng vàng', 'Bằng ' + T.vang / T.luong + ' lượng bạc.']];
  const lt = [['Hạ phẩm', 'Linh thạch thường, dùng hằng ngày.'], ['Trung phẩm', 'Gấp 100 lần hạ phẩm.'], ['Thượng phẩm', 'Gấp 100 lần trung phẩm.'], ['Cực phẩm', 'Quý nhất, gấp 100 lần thượng phẩm.']];
  return (
    <div className={'pc-tien' + (no ? ' no' : '')}>
      <div className="pc-th">{phàm.map(([k, v, n, t]) => <span key={k} className={'pc-tc t-' + k + (v ? '' : ' z')} {...tip(n + ': ' + (no && k === 'xu' ? '−' : '') + v + '\n' + t)}><TienIco k={k} /><em>{n}</em><b>{no && k === 'xu' ? '−' : ''}{PS.fmtN(v)}</b></span>)}</div>
      <div className="pc-th">{lt.map(([n, t], k) => { const v = PS.ltGet(k, r) || 0; return <span key={k} className={'pc-tc lt' + k + (v ? '' : ' z')} {...tip('Linh thạch ' + n.toLowerCase() + ': ' + PS.fmtN(v) + '\n' + t)}><TienIco k={k} /><em>{n}</em><b>{PS.fmtN(v)}</b></span>; })}</div>
    </div>
  );
}

// ---------- thanh dưới: [chỉ số + cái ăn][khí huyết, linh lực] (chân dung) [tu vi, lịch luyện][tiền tệ]; trạng thái nổi phía trên hai bên chân dung ----------
export function ChanTrang() {
  const r = PS.G.run, s = PS.S();
  const left = s.life - r.age, warn = left < s.life * 0.12;
  const tal = PS.playerTal(), tm = r.tamma || 0, voK = PS.voKnown();
  const an = (PS.anShow ? PS.anShow(r) : PS.needFood && PS.needFood(r));
  const vt = DaiVetThuong(), vtL = vt.slice(0, 4), vtR = vt.slice(4);
  const mpN = s.maxMp > 0 ? PS.mpName() : 'Linh lực';
  return (
    <div className="pc-day">
      <div className="pc-ben trai">
        <div className="pc-info">
          <div className="pc-cs">
            <span {...tip('Lực chiến: so với người cùng cảnh giới, tính từ chỉ số chiến đấu và trang bị.')}><img src={I('sk-sword')} alt="" /><em className="pc-cl">Lực chiến</em><Rt k="lc" v={PS.lucChien()} /></span>
            <span {...tip('Tu luyện: tốc độ tu luyện khi bế quan ở chỗ đang đứng')}><img src={I('cau-tu')} alt="" /><em className="pc-cl">Tu luyện</em><Rt k="bq" v={PS.bqReal()} kind="toc" /></span>
            <span {...tip('Đạo tâm: chống ảo cảnh, tâm ma; giúp đột phá')}><img src={I('it-sen')} alt="" /><em className="pc-cl">Đạo tâm</em><Rt k="tam" v={s.tam} kind="muc" /></span>
            <span className={tm >= 60 ? 'hi' : ''} {...tip('Tâm ma ' + Math.round(tm) + '/100. Đầy sẽ phải đối mặt với chính mình.')}><img src={I('cau-ma')} alt="" /><em className="pc-cl">Tâm ma</em><b>{PS.tmWord(tm)}</b></span>
          </div>
          {an && <div className="pc-an" data-act="anMuc" {...tip('Cái ăn: no ' + (r.no != null ? r.no : 100) + '/100\nMức ăn: ' + PS.anMuc(r).n + '\nChạm để đổi mức ăn')}><Thanh n="Cái ăn" v={r.no != null ? r.no : 100} max={100} cls={'an' + (PS.anState(r) !== 'no' ? ' low' : '')} txt={PS.contentText('an.' + PS.anState(r))} /></div>}
        </div>
        <div className="pc-bars">
          <Thanh n="Khí huyết" v={r.hp} max={s.maxHp} cls={'hp' + (r.hp < s.maxHp * 0.35 ? ' low' : '')} t="Khí huyết: về 0 là thua trận" />
          <Thanh n={mpN} v={s.maxMp > 0 ? r.mp : 0} max={Math.max(1, s.maxMp)} cls="mp" txt={s.maxMp > 0 ? undefined : 'chưa có'} t={s.maxMp > 0 ? mpN + ': dùng để ra chiêu' : 'Chưa có linh lực: bước vào tu luyện mới có'} />
        </div>
      </div>
      <div className="pc-giua">
        <button className={'pc-av' + PS.talCls(tal)} data-act="navChar" {...tip('Mở bảng nhân vật (phím 2)')}>
          <Html className="pc-avi" h={PS.avatarMe ? PS.avatarMe() : ''} />
          {tal && tal.tier >= 0 && <Html className="tfr" h={PS.talFrameSVG(tal, 'pctf')} />}
        </button>
        <b className="pc-ten">{r.ten}</b>
        <span className="pc-cg">{PS.realmLabel()}</span>
        <small className={'pc-tuoi' + (warn ? ' bad' : '')}>{Math.floor(r.age)} tuổi · còn {Math.max(0, Math.floor(left))} năm</small>
      </div>
      <div className="pc-ben phai">
        <div className="pc-bars">
          {!voK && PS.rootKnown() ? <Thanh n="Tu vi" v={PS.tvShow()} max={100} cls="tv" txt={PS.btReadyTv() ? 'viên mãn' : PS.tvShow() + '%'} t="Tu vi: đầy thì đủ sức đột phá" />
            : <Thanh n="Tu vi" v={0} max={100} cls="tv" txt={voK ? 'vô linh căn' : 'chưa rõ tiên duyên'} t="Chưa tu luyện được" />}
          <Thanh n="Lịch luyện" v={voK ? 0 : PS.llShow()} max={100} cls="ll" txt={voK ? '—' : PS.llShow() + '%'} t="Lịch luyện: có được nhờ thực chiến, tới nơi mới, quen người mới, làm xong việc. Muốn đột phá cần đầy." />
        </div>
        <TienPC r={r} />
      </div>
      <div className="pc-vt l">{vtL}</div>
      <div className="pc-vt r">{vtR}<NhanDotPha /></div>
    </div>
  );
}

// [khoá, ảnh, chữ, data-act, data-arg, phím]
const MENU = [
  ['bag', 'it-ruong', 'Túi đồ', 'bagOpen', '', '1'],
  ['char', 'it-ao-lam', 'Nhân vật', 'navChar', '', '2'],
  ['tong', 'it-co', 'Tông môn', 'panel', 'tong', '3'],
  ['map', 'cau-tu', 'Bản đồ', 'closePanel', '', '4'],
  ['pets', 'it-trung', 'Linh thú', 'panel', 'pets', '5'],
  ['journal', 'it-bi-kip', 'Sổ tay', 'panel', 'journal', '6'],
  ['bonds', 'it-lenh-ngoc', 'Giao tình', 'panel', 'bonds', '7'],
  ['bq', 'it-sen', 'Tu luyện', 'hudBq', '', 'B'],
  ['craft', 'it-lo-dan', 'Luyện chế', 'panel', 'craft', 'L'],
];

// ---------- cột trái: chỉ có các mục ----------
export function CotTrai() {
  const { G, UI } = PS;
  const r = G.run, thu = !!UI.pcThu;
  const bqNo = PS.bqCan() || (PS.voKnown() ? 'Vô linh căn: chưa thể bế quan' : '');
  const on = k => k === 'map' ? !UI.panel && !(UI.modal && UI.modal.k === 'bq') : k === 'bag' ? UI.panel === 'char' && UI.tab.char === 'bag' : k === 'char' ? UI.panel === 'char' && UI.tab.char !== 'bag' : k === 'bq' ? !!(UI.modal && /^(bq|cg)/.test(UI.modal.k || '')) : UI.panel === k;
  const dot = { journal: r.quests.some(q => q.state === 'open'), pets: r.eggs && r.eggs.length > 0, bq: PS.canBreak() };
  const dis = { bq: !!bqNo, craft: !!r.moving };
  return (
    <div className={'pc-trai' + (thu ? ' thu' : '')}>
      <button className="pc-thu" data-act="pcThu" {...tip(thu ? 'Mở rộng' : 'Thu gọn')} aria-label={thu ? 'Mở rộng' : 'Thu gọn'}><Ic n={thu ? 'right' : 'left'} /></button>
      {MENU.map(([k, im, n, act, arg, ph]) => (
        <button key={k} className={'pc-mi nv-' + k + (on(k) ? ' on' : '') + (k === 'bq' && dot.bq ? ' glow' : '')} data-act={act} data-arg={arg || undefined} disabled={!!dis[k]}
          {...tip(thu ? n + ' (phím ' + ph + ')' + (k === 'bq' && bqNo ? '\n' + bqNo : '') : k === 'bq' && bqNo ? bqNo : '')}>
          <img src={I(im)} alt="" draggable="false" /><span>{n}</span>
          {dot[k] && <em className="dot" />}
          <kbd>{ph}</kbd>
        </button>
      ))}
      <div className="pc-cuoi">
        {PS.hopL && PS.hopL(r).length > 0 && <button className="pc-mi hi" data-act="hopThu" {...tip(thu ? 'Hộp thư' : 'Lời công trình gửi về')}><span className="pc-emi">📮</span><span>Hộp thư</span><em className="dot" /></button>}
        {!!PS.DEV && <button className="pc-mi" data-act="devOpen" {...tip(thu ? 'Dev test' : '')}><span className="pc-emi"><Ic n="bolt" /></span><span>Dev test</span></button>}
        <button className={'pc-mi' + (UI.panel === 'more' ? ' on' : '')} data-act="panel" data-arg="more" {...tip(thu ? 'Thêm: cấu hình, chú giải, ghi chú' : 'Cấu hình, chú giải, ghi chú, cách chơi')}><img src={I('it-lenh-bai')} alt="" /><span>Thêm</span></button>
      </div>
    </div>
  );
}

// ngày tháng năm giờ: cụm ngang riêng ở giữa đầu màn hình
function NgayTren() {
  const t = PS.W().t, pa = PS.PART[PS.partOf(t)];
  return (
    <div className="pc-ngay-top" {...tip(PS.dateText(t) + '\nBuổi ' + pa.n + ', mùa ' + PS.SEASON[PS.seasonOf(t)])}>
      <Html as="div" className="hud-clk3" id="clk" h={PS.clkStr(t)} />
    </div>
  );
}

// ---------- trên bản đồ: công cụ góc trên trái, nhiệm vụ góc trên phải ----------
export function CongCuBanDo() {
  const { CFG, UI } = PS;
  return <>
    <div className="pc-cong">
      <button className={'pc-cb' + (CFG.grid ? ' on' : '')} data-act="gridT"><Ic n="hex" /><span>Lưới ô</span></button>
      <button className={'pc-cb' + (UI.panel === 'more' && UI.tab.more === 'legend' ? ' on' : '')} data-act="legendOpen"><Ic n="list" /><span>Chú giải</span></button>
      {!PS.isPham() && <button className={'pc-cb' + (PS.tkActive() ? ' on' : '')} data-act="tkUse" disabled={!!PS.tkWhy() && !PS.tkActive()} {...tip(PS.tkWhy() || 'Phóng thần thức: nhìn xa hơn một lúc')}><Ic n="eye" /><span>Thần thức</span></button>}
      <button className="pc-cb" data-act="zoomAll"><Ic n="globe" /><span>Toàn đồ</span></button>
      <button className="pc-cb" data-act="center"><Ic n="target" /><span>Về chỗ</span></button>
    </div>
    <NgayTren />
    <div className="pc-nvu"><TanThu /></div>
  </>;
}
