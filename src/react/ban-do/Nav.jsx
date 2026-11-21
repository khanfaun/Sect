// Thanh dưới cùng (giao diện mới): Nhân vật · Túi đồ · [Tu luyện ở giữa] · Sổ tay · Mục lục.
// "Mục lục" mở một lưới ô lớn gom các bảng còn lại (tông môn, linh thú, giao tình, luyện chế, cảnh giới…).
import { useState } from 'react';
import { PS } from '../html';
import { Ic, tip } from '../chung';
import { CauTuLuyen, May } from '../chung/HoaVan';

function Tab({ act, arg, ic, l, on, dot, dotT, dis }) {
  return (
    <button className={'x-tab' + (on ? ' on' : '')} data-act={act} data-arg={arg} disabled={!!dis}>
      <span className="x-tab-i"><Ic n={ic} />{dot && <i className="dot soft" {...tip(dotT)} />}</span>
      <span className="x-tab-l">{l}</span>
    </button>
  );
}

// Chỗ đặt sẵn cho tính năng chưa làm (lấy ý từ các game tu tiên treo máy): bấm chỉ báo "sắp có".
const SAP_CO = [
  ['walk', 'Hóa thân', 'Phân thân vân du, nhặt nhạnh giùm'],
  ['hex', 'Tụ linh trận', 'Trận pháp động phủ, tăng tốc tu'],
  ['hour', 'Bế quan dài', 'Rời game vẫn tu, về nhận thành quả'],
  ['medal', 'Phong vân bảng', 'Xếp hạng cao thủ thiên hạ'],
  ['scroll', 'Thư tín', 'Thư từ bạn cũ, đồng môn gửi tới'],
  ['feather', 'Kỷ sự', 'Biên niên một kiếp, đọc lại như truyện'],
  ['paw', 'Động phủ', 'Linh thú giữ nhà, tự luyện tự dọn'],
  ['star', 'Thiên cơ', 'Bói quẻ: đoán kỳ ngộ sắp tới'],
];

// Lưới mục lục
function MucLuc({ close }) {
  const { G, UI } = PS;
  const r = G.run;
  const L = [
    ['panel', 'tong', 'flag', 'Tông môn', 'Môn phái, chức vụ, cống hiến'],
    ['panel', 'pets', 'paw', 'Linh thú', r.eggs && r.eggs.length ? 'Có trứng đang ấp' : 'Bạn đồng hành'],
    ['panel', 'bonds', 'people', 'Giao tình', 'Người quen, ân oán'],
    ['panel', 'craft', 'flask', 'Luyện chế', 'Luyện đan, luyện khí'],
    ['cgOpen', '', 'yin', 'Cảnh giới', 'Các bậc tu hành'],
    ['panel', 'affairs', 'globe', 'Thiên hạ', 'Thế sự các nơi'],
    ['legendOpen', '', 'list', 'Chú giải', 'Ký hiệu bản đồ'],
    ['panel', 'more', 'gear', 'Thêm', 'Lưu, cấu hình, ghi chú'],
  ];
  return (
    <div className="x-ml" onClick={e => { if (e.target === e.currentTarget) close(); }}>
      <div className="x-ml-k">
        <May cls="x-ml-may" />
        <header className="x-ml-h"><b>Mục lục</b><button className="xb" onClick={close} aria-label="Đóng"><Ic n="close" /></button></header>
        <div className="x-ml-g">
          {L.map(([act, arg, ic, n, d]) => (
            <button key={n} className={'x-ml-o' + (UI.panel === arg && arg ? ' on' : '')} data-act={act} data-arg={arg || undefined}
              disabled={act === 'panel' && arg === 'craft' && !!r.moving} onClick={close}>
              <span className="x-ml-i"><Ic n={ic} /></span><b>{n}</b><small>{d}</small>
            </button>
          ))}
          <p className="x-ml-sub">Sắp mở</p>
          {SAP_CO.map(([ic, n, d]) => (
            <button key={n} className="x-ml-o soon" onClick={() => { PS.note(n + ': ' + d + ' — sẽ mở ở bản sau.'); PS.toastFlush(); }}>
              <span className="x-ml-i"><Ic n={ic} /></span><b>{n}</b><small>{d}</small><em className="x-soon">sắp có</em>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

// Con dấu tròn một chữ (kiểu ấn triện) — mở các bảng
function Dau({ act, arg, ch, l, on, dot, onClick }) {
  return (
    <button className={'sk-dau' + (on ? ' on' : '')} data-act={act} data-arg={arg} onClick={onClick} aria-label={l}>
      <b>{ch}</b><small>{l}</small>{dot && <i className="dot soft" />}
    </button>
  );
}

// Không còn thanh dưới: cột con dấu ở mép phải; nút son "Tu luyện / Đột phá" nằm ở góc đáy phải.
export function Nav() {
  const { G, UI } = PS;
  const r = G.run;
  const [mo, setMo] = useState(false);
  const bqNo = PS.bqCan(), brk = PS.canBreak(), vo = PS.voKnown();
  const quest = r && r.quests.some(q => q.state === 'open');
  const otherOn = ['tong', 'pets', 'bonds', 'affairs', 'more'].includes(UI.panel);
  return <>
    {mo && <MucLuc close={() => setMo(false)} />}
    <div className="x-dau">
      <Dau act="panel" arg="char" ch="Nhân" l="Nhân vật" on={UI.panel === 'char' && UI.tab.char !== 'bag'} />
      <Dau act="bagOpen" ch="Túi" l="Túi đồ" on={UI.panel === 'char' && UI.tab.char === 'bag'} />
      <Dau act="panel" arg="journal" ch="Sổ" l="Sổ tay" on={UI.panel === 'journal'} dot={quest} />
      <Dau act="panel" arg="craft" ch="Đan" l="Luyện chế" on={UI.panel === 'craft'} />
      <Dau ch="Thêm" l="Mục lục" on={mo || otherOn} dot={r && r.eggs && r.eggs.length > 0} onClick={() => setMo(!mo)} />
    </div>
    <button className={'sk-btn son x-tu2' + (brk ? ' ready' : '')} data-act="hudBq" disabled={!!bqNo || vo}
      {...tip(vo ? 'Vô linh căn: chưa thể bế quan tu luyện' : bqNo || (brk ? 'Tu vi viên mãn: vào để đột phá' : 'Bế quan tu luyện ngay tại đây'))}>
      <CauTuLuyen /><span className="lab"><b>{brk ? 'Đột phá' : 'Tu luyện'}</b><i>{vo ? 'vô linh căn' : bqNo ? 'chưa thể' : brk ? 'tu vi viên mãn' : 'bế quan tại chỗ'}</i></span>
    </button>
  </>;
}
