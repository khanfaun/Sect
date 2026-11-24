// Thẻ Trang bị (kiểu tab trang bị của bản mẫu): ô trang bị hai bên, nhân vật ở giữa;
// bên dưới là pháp bảo, đan điền uẩn dưỡng, pháp khí tùy thân (máy tính: 3 cột), bộ trang bị và tổng hợp chỉ số (bằng chữ; máy tính: cạnh nhân vật).
import { PS } from '../html';
import { tip } from '../chung';
import { OTrangBi, PhuongTien, Help } from './TuiDo';
import { NhanVatThien } from '../giao-dien/NhanVatThien';
import { I } from '../giao-dien/anh';

const TRAI = ['vukhi', 'non', 'giap', 'dai'], PHAI = ['gang', 'giay', 'nhan1', 'boi'];

function O({ k, E, N }) {
  return <div className="tb-o"><OTrangBi k={'E' + k} label={N[k]} rel={E[k]} o={{ ic: k, x: ['eqOff', k, 'Tháo ra'] }} />{E[k] && E[k].bo && PS.BO_TB[E[k].bo] && <i className="tb-bo" {...tip(PS.BO_TB[E[k].bo].n)}>Bộ</i>}<small className="lbl">{N[k]}</small></div>;
}

function BoTrangBi() {
  const L = PS.boView();
  return <>
    <h4 className="sgrp">Bộ trang bị</h4>
    {!L.length && <p className="hint">Chưa mặc món nào thuộc một bộ. Trang bị có chữ "Bộ" ở góc là đồ trong bộ: mặc đủ 2 hoặc 4 món cùng bộ sẽ được thêm sức mạnh.</p>}
    {L.map(b => (
      <div key={b.id} className="tb-bộ">
        <div className="tb-bh"><b>{b.n}</b><small>đang mặc {b.co} món</small></div>
        {b.muc.map(m => (
          <div key={m.can} className={'kv tb-kv' + (m.on ? ' on' : '')}><span>{m.can} món</span>
            <b>{m.on ? Object.entries(m.fx).map(([k, v]) => (PS.tbTen(k) || k) + ' ' + PS.tbMuc(k, v).toLowerCase()).join(', ') : 'Chưa kích hoạt'}</b></div>
        ))}
      </div>
    ))}
  </>;
}

function TongHop() {
  const L = PS.tbTongHop();
  return <>
    <h4 className="sgrp">Chỉ số từ trang bị</h4>
    {!L.length ? <p className="hint">Chưa có trang bị nào cho thêm chỉ số.</p> :
      <div className="tb-th">{L.map(x => <div key={x.k} className="kv"><span>{x.n}</span><b className={x.tang ? 'good' : 'bad'}>{x.t}</b></div>)}</div>}
  </>;
}

// vị trí ô pháp bảo: rải đều trên một cung tròn phía trên nhân vật (trái -> phải), % theo khung ảnh
function cungPB(n) {
  const L = [];
  for (let i = 0; i < n; i++) {
    const t = n === 1 ? 0.5 : i / (n - 1), g = Math.PI * (1 - t) * 0.84 + Math.PI * 0.08; // từ ~165° tới ~15°
    L.push({ left: 50 + Math.cos(g) * 38 + '%', top: 50 - Math.sin(g) * 30 + '%' });
  }
  return L;
}

function PhapBaoCung({ E }) {
  const { REALM, PB_SLOTS, PB_REQ } = PS, po = PS.pbOpen(), P = cungPB(PB_SLOTS.length);
  return <div className="tb-pbc" data-n={PB_SLOTS.length}>
    {PB_SLOTS.map((k, j) => <div key={k} className={'tb-pb' + (j < po ? '' : ' khoa')} style={P[j]}>
      {j < po
        ? <OTrangBi k={'E' + k} label="Pháp bảo" rel={E[k]} o={{ ic: 'phapbao', x: ['eqOff', k, 'Tháo ra'] }} />
        : <OTrangBi k={'E' + k} label={REALM[PB_REQ[j]]} rel={null} o={{ lock: 1, ic: 'phapbao', tip: 'Pháp bảo: mở khi đạt ' + REALM[PB_REQ[j]] + '.' }} />}
    </div>)}
  </div>;
}

// gop: máy tính, thẻ Căn cơ gộp vào đây (canCo = các mục chỉ số, đặt cột trái)
export function TrangBi({ gop, canCo }) {
  const { REALM, PB_SLOTS, DD_N, SPEC } = PS;
  const r = PS.run2(), E = PS.eqOf(), dn = DD_N[r.realm], po = PS.pbOpen();
  const N = Object.fromEntries(PS.SLOTS);
  const hinh = (
    <div className="tb-doll">
      <div className="tb-col">{TRAI.map(k => <O key={k} k={k} E={E} N={N} />)}</div>
      <div className="tb-giua">
        <b className="tag"><img src={I('sk-sword')} alt="" />Lực chiến {PS.fmtN(Math.round(PS.lucChien()))}</b>
        {gop && <div className="tb-tal" dangerouslySetInnerHTML={{ __html: PS.talCardHTML() }} />}
        <NhanVatThien />
        <PhapBaoCung E={E} />
        <small className="tag2">{PS.realmLabel()} · pháp bảo {PB_SLOTS.filter(k => E[k]).length}/{po}</small>
      </div>
      <div className="tb-col">{PHAI.map(k => <O key={k} k={k} E={E} N={N} />)}</div>
    </div>
  );
  const duoi = (
    <div className={gop ? 'tb-duoi2' : 'tb-duoi'}>
      <section className="tb-nhom">
      <h4 className="sgrp">Đan điền · uẩn dưỡng <small>{r.dd.length}/{dn}</small><span className="grow"></span><Help t="Vũ khí, pháp bảo nuôi trong đan điền mỗi năm mạnh thêm, vẫn cho chỉ số, và trong trận tế ra đánh được một lần." /></h4>
      <div className="ddrow">
        {[0, 1, 2, 3].map(j => {
          const d = r.dd[j];
          if (d) return <OTrangBi key={j} k={'D' + j} label="" rel={d.rel} o={{ badge: '+' + Math.round((PS.ddMul(d) - 1) * 100) + '%', x: ['ddTake', j, 'Lấy ra'] }} />;
          const need = DD_N.findIndex(x => x > j);
          return <OTrangBi key={j} k={'D' + j} label={j < dn ? 'Trống' : REALM[need]} rel={null} o={{ lock: j >= dn, ic: 'phapbao', tip: j < dn ? 'Chạm để chọn vũ khí hoặc pháp bảo đưa vào uẩn dưỡng.' : 'Mở khi đạt ' + REALM[need] + '.' }} />;
        })}
      </div>
      </section>
      <section className="tb-nhom">
      <h4 className="sgrp">Pháp khí tùy thân</h4>
      <div className="ddrow five">
        {SPEC.map(([k, n]) => k === 'phuongtien' ? <PhuongTien key={k} k={k} n={n} /> : <OTrangBi key={k} k={'E' + k} label={n} rel={E[k]} o={{ ic: k, x: ['eqOff', k, 'Tháo ra'] }} />)}
      </div>
      </section>
    </div>
  );
  // bộ trang bị + chỉ số từ trang bị: chung một thanh trượt riêng
  const ben = <div className="tb-ben tb-cuon"><BoTrangBi /><TongHop /></div>;
  if (gop) return (
    <div className="tb-gop">
      <div className="tb-trai">{canCo}{ben}</div>
      <div className="tb-phai">{hinh}{duoi}</div>
    </div>
  );
  return <div className="tb-wrap">{hinh}{ben}{duoi}</div>;
}
