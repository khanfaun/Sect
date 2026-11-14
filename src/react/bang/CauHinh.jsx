// Cấu hình: đồ họa, hiển thị, lối chơi, dữ liệu (lưu/nạp mã, chơi mới, xóa).
import { PS } from '../html';
import { Ic, tip } from '../chung';

// Nút chọn một trong vài giá trị cấu hình (giống seg())
export function Seg({ k, opts }) {
  const CFG = PS.CFG;
  return (
    <div className="seg">
      {opts.map(([v, n]) => <button key={String(v)} data-act="cfg" data-arg={k + '=' + JSON.stringify(v)} className={CFG[k] === v ? 'on' : ''}>{n}</button>)}
    </div>
  );
}
export const OnOff = ({ k }) => <Seg k={k} opts={[[false, 'Tắt'], [true, 'Bật']]} />;

// Một dòng cài đặt: tên (có chú thích) + nút điều khiển
export function SetRow({ n, t, children }) {
  return <div className="set"><span {...tip(t)}>{n}{t && <> <Ic n="info" cls="sm" /></>}</span>{children}</div>;
}

function DoHoa() {
  const lv = PS.gfxLv();
  return <>
    <SetRow n="Mức đồ họa" t={'Tự động: game tự đo máy và hạ mức khi máy đuối.\nTiết kiệm: không hiệu ứng, chỉ vẽ lại khi có thay đổi; mát máy nhất.'}><Seg k="gfx" opts={[['auto', 'Tự động'], ['low', 'Tiết kiệm'], ['mid', 'Cân bằng'], ['high', 'Đẹp']]} /></SetRow>
    <p className="hint">Đang chạy ở mức <b>{['tiết kiệm', 'cân bằng', 'đẹp'][lv]}</b>.</p>
    <SetRow n="Khung hình mỗi giây" t="Thấp hơn thì mát máy, đỡ tốn pin. 30 là đủ mượt cho game này."><Seg k="fps" opts={[[20, '20'], [30, '30'], [45, '45'], [60, '60']]} /></SetRow>
    <SetRow n="Độ nét" t="Độ nét của bản đồ. Càng nét càng nặng trên màn hình độ phân giải cao."><Seg k="dpr" opts={[[0, 'Tự động'], [1, 'Thường'], [1.5, 'Nét'], [2, 'Rất nét']]} /></SetRow>
    <SetRow n="Mây trôi" t="Bóng mây lướt trên bản đồ"><OnOff k="clouds" /></SetRow>
    <SetRow n="Hạt theo mùa" t="Hoa rơi mùa xuân, đom đóm đêm hè, lá thu, tuyết đông"><OnOff k="fx" /></SetRow>
    <SetRow n="Sắc trời theo buổi" t="Bản đồ ngả màu theo sáng, chiều, tối, đêm"><OnOff k="daynight" /></SetRow>
    <SetRow n="Chuyển động giao diện" t="Hiệu ứng trượt, mờ dần của các bảng"><OnOff k="anim" /></SetRow>
    <SetRow n="Hiện số khung hình"><OnOff k="showFps" /></SetRow>
    <SetRow n="Nhật ký gỡ lỗi" t="Ghi lại các sự kiện chính để gửi cho người sửa game khi gặp lỗi. Tắt thì không tốn máy."><span>
      <button className="btn" data-act="nkToggle">{PS.NK.on ? 'Đang bật' : 'Đang tắt'}</button>{' '}
      <button className="btn" data-act="nkCopy" disabled={!PS.NK.on}>Sao chép</button></span></SetRow>
  </>;
}

function HienThi() {
  return <>
    <SetRow n="Cỡ chữ"><Seg k="font" opts={[['m', 'Vừa'], ['l', 'Lớn'], ['xl', 'Rất lớn']]} /></SetRow>
    <SetRow n="Tên địa danh"><OnOff k="names" /></SetRow>
    <SetRow n="Thực thể qua lại" t="Thương đội, thú triều, tuần tra, thiên kiêu, dị tượng trên bản đồ"><OnOff k="ents" /></SetRow>
    <SetRow n="Dấu ghi chú"><OnOff k="notes" /></SetRow>
    <SetRow n="Địa hình vẽ tay"><OnOff k="terrain" /></SetRow>
  </>;
}

function LoiChoi() {
  const ad = PS.G.meta.opt && PS.G.meta.opt.userDodge;
  return <>
    <SetRow n="Tự né" t={'Bật thì không cần nhấn nút Né.\nLuôn tính như né ở mức khá, trừ đi 10%.'}>
      <div className="seg"><button data-act="autoDodge" data-arg="0" className={ad ? '' : 'on'}>Tắt</button><button data-act="autoDodge" data-arg="1" className={ad ? 'on' : ''}>Bật</button></div>
    </SetRow>
    <SetRow n="Tự đánh" t="Máy tự chọn chiêu và tự né trong trận"><OnOff k="autoFight" /></SetRow>
    <SetRow n="Tốc độ trận"><Seg k="cspeed" opts={[[1, '×1'], [2, '×2'], [3, '×3']]} /></SetRow>
    <SetRow n="Hỏi lại khi vào tử địa"><OnOff k="confirmDanger" /></SetRow>
    <SetRow n="Đồng hồ tự chạy" t={'Bật: đứng ở bản đồ thì 1 giây = 1 giờ.\nTắt: thời gian chỉ trôi khi ngươi làm việc gì đó.'}><OnOff k="clockIdle" /></SetRow>
  </>;
}

function DuLieu() {
  const UI = PS.UI;
  return <>
    <div className="menu">
      <button className="row" data-act="exp"><span className="r-i"><Ic n="book" /></span><span className="r-t"><b>Lấy mã lưu</b><small>Sao chép để cất hoặc chuyển sang máy khác</small></span></button>
      <button className="row" data-act="imp"><span className="r-i"><Ic n="down" /></span><span className="r-t"><b>Nạp mã lưu</b></span></button>
      <button className="row" data-act="newGame"><span className="r-i"><Ic n="cycle" /></span><span className="r-t"><b className="bad">{UI.confirm === 'newGame' ? 'Bấm lần nữa để chơi lại từ đầu, không hoàn tác' : 'Chơi mới từ đầu'}</b><small>Xóa kiếp này, thế giới và mọi thứ tích lũy, rồi đầu thai lại</small></span></button>
      <button className="row" data-act="wipe"><span className="r-i"><Ic n="trash" /></span><span className="r-t"><b className="bad">{UI.confirm === 'wipe' ? 'Bấm lần nữa để xóa hết, không hoàn tác' : 'Xóa toàn bộ dữ liệu'}</b></span></button>
    </div>
    {UI.code != null && <>
      <textarea id="code" rows="4" placeholder="Dán mã lưu vào đây" defaultValue={UI.code} key={UI.code} />
      {UI.codeMode === 'imp' && <button className="btn pri wide" data-act="impGo">Nạp</button>}
    </>}
    {UI.msg && <p className="hint">{UI.msg}</p>}
  </>;
}

export function CauHinh() {
  const st = PS.UI.tab.cfg || 'gfx';
  return <>
    <div className="tabs sub">
      {[['gfx', 'Đồ họa'], ['view', 'Hiển thị'], ['play', 'Lối chơi'], ['data', 'Dữ liệu']].map(([k, n]) => <button key={k} data-act="tab" data-arg={'cfg:' + k} className={k === st ? 'on' : ''}>{n}</button>)}
    </div>
    {/* bản cũ: thẻ Dữ liệu nằm sau một khung .sets rỗng và trước một khung rỗng */}
    {st === 'data' ? <><div className="sets" /><DuLieu /><div /></> : <div className="sets">{st === 'gfx' && <DoHoa />}{st === 'view' && <HienThi />}{st === 'play' && <LoiChoi />}</div>}
    <p className="hint ver">Phù Sinh · bản 3 · cấu hình đồ họa lưu riêng trên từng máy.</p>
  </>;
}
