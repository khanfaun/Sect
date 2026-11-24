// Hộp Dev test: các tab con thử nghiệm (luật ở core2/83-dev-test.js, nút ở ui/34-dev-test.js).
import { Html, PS } from '../html';
import { Ic, pcs, tip } from '../chung';
import { NhanVatThien } from '../giao-dien/NhanVatThien';

const TABS = [['nv', 'Nhân vật'], ['ai', 'Tự chơi'], ['tran', 'Dàn trận'], ['cg', 'Cảnh giới'], ['map', 'Bản đồ'], ['vat', 'Vật phẩm'], ['kv', 'Khí vận'], ['thuong', 'Thương thế'], ['fx', 'Hiệu ứng']];
const DEV_FX = [['bt', 'Đột phá'], ['xk', 'Xung kích'], ['talup', 'Tiềm chất lên Thiên kiêu'], ['taldn', 'Tiềm chất giảm'], ['rldn', 'Rớt cảnh giới'], ['lowhp', 'Máu thấp'], ['heal', 'Hồi phục']];
const KV_TABS = [['tt', 'Tiên thiên khí vận'], ['the', 'Thể chất'], ['ht', 'Hậu thiên khí vận']];
const realmOpts = (pham) => (pham ? [[-1, 'Phàm nhân']] : []).concat(PS.REALM.map((n, i) => [i, n]));

// Thẻ Nhân vật (giống DEV của bản mẫu): độ tuổi, tuổi, kiểu tóc + gương mặt, trang phục, hạt châu.
// Đổi độ tuổi là đổi tuổi thật của nhân vật (thọ nguyên còn lại đổi theo).
// đổi lựa chọn: gọi thẳng hàm luật rồi vẽ lại (select có giá trị React giữ nên không dùng data-chg)
const doiNh = e => { PS.ACT[e.target.dataset.nh](e.target.value); PS.dbg('nh.ui', { k: e.target.dataset.nh, v: e.target.value }); PS.render(); };

function NgoaiHinh() {
  const r = PS.G.run, s = PS.S(), N = PS.ngoaiHinh(), T = PS.NH_TUOI, H = T[N.hien];
  const con = Math.max(0, s.life - r.age);
  return <>
    <div className="dev-nv">
      <div className="dev-nv-xem"><NhanVatThien /></div>
      <div className="dev-nv-ds">
        <p><b>{Math.floor(r.age)} tuổi</b> · thọ nguyên {s.life} năm · còn <b className={con < s.life * 0.12 ? 'bad' : ''}>{Math.floor(con)} năm</b></p>
        <p className="hint">Độ tuổi hiện tại: {T[N.tuoi].n}{N.hien !== N.tuoi ? ' (chưa có ảnh, đang mượn hình ' + H.n.toLowerCase() + ')' : ''}{N.nu ? ' · nhân vật nữ chưa có bộ ảnh ngồi thiền' : ''}</p>
        <label>Cảnh giới
          <select data-nh="devNhRealm" value={r.pham ? -1 : r.realm} onChange={doiNh}>
            <option value={-1}>Phàm nhân</option>{PS.REALM.map((n, i) => <option key={i} value={i}>{n}</option>)}
          </select></label>
        {r.devNh && <p className="hint" data-nh="devNh">Đang ép hình {T[r.devNh].n.toLowerCase()} (tuổi thật không đổi)</p>}
        <label>Độ tuổi
          <select data-nh="devNhTuoi" value={N.tuoi} onChange={doiNh}>
            {Object.entries(T).map(([k, x]) => <option key={k} value={k}>{x.n}{r.pham ? ' (' + x.tu + (x.den < 1e8 ? '–' + (x.den - 1) : '+') + ')' : ''}{PS.nhCo(k) ? '' : ' – chưa có ảnh'}{r.pham && x.mau >= s.life ? ' – vượt thọ nguyên (chỉ đổi hình)' : ''}</option>)}
          </select></label>
        <label>Tuổi: {Math.floor(r.age)}
          <input type="range" min="1" max={Math.max(1, Math.floor(s.life - 1))} step="1" value={Math.floor(r.age)} onChange={e => { PS.ACT.devNhAge(+e.target.value); PS.render(); }} /></label>
        <label>Màu tóc
          <select data-nh="devNhToc" value={N.toc} onChange={doiNh}>{H.toc.map(([v, n]) => <option key={v} value={v}>{n}</option>)}</select></label>
        {N.hien === 'young' && <p className="hint" data-nh="kieuToc">Kiểu tóc theo cảnh giới: {(PS.NH_KIEU_TOC.find(x => x[0] === N.kieu) || [0, N.kieu])[1]}</p>}
        {N.truNhan && <p className="hint" data-nh="truNhan">Đã uống Trú Nhan Đan: dung nhan giữ ở {T[N.hien].n}</p>}
        <label>Trang phục
          <select data-nh="devNhAo" value={N.ao} onChange={doiNh}>{N.aoDs.map(([v, n]) => <option key={v} value={v}>{n}</option>)}</select></label>
        <label>Hạt châu
          <select data-nh="devNhChau" value={N.chauChon} onChange={doiNh}>{PS.NH_CHAU.map(([v, n]) => <option key={v} value={v}>{n}</option>)}</select></label>
      </div>
    </div>
    <p className="hint">Mỗi ngoại hình là một ảnh nguyên vẹn nv-&lt;tuổi&gt;-&lt;áo&gt;[-&lt;tóc&gt;] trong src/assets/nv (tạo bằng tools/nv-comfy.py); khai báo ở NH_TUOI (core2/84-ngoai-hinh.js).</p>
  </>;
}

function TuChoi() {
  const on = PS.devAiOn(), I = PS.devAiInfo();
  return <>
    <p className="hint">Máy điều khiển nhân vật chính theo chiến lược thông minh nhất: giữ mạng trước, rồi đột phá, tu luyện, tích luỹ, tiến vùng, tranh cơ duyên, khám phá. Ăn uống, làm thuê, mua lương khô cũng tự lo.</p>
    {on ? <p><b>Đang tự chơi</b> · nhanh ×{I.toc} · đã đi {I.buoc} bước</p> : null}
    <div className="devg">
      {[1, 5, 20, 100].map(t => <button key={t} className="btn pri" data-act="devAiGo" data-arg={t}>Tự chơi ×{t}</button>)}
      {on && <button className="btn" data-act="devAiStop">Dừng</button>}
    </div>
    <p className="hint">Muốn dừng: bấm lại nút Dev test (tia sét) trên bản đồ. Hết kiếp thì máy tự dừng.</p>
  </>;
}

function ChonCanhGioi({ act, side, i, re, pham, keep }) {
  return (
    <select data-chg={act} data-arg={side != null ? side + ':' + i : undefined} value={re == null ? '' : re} onChange={() => {}}>
      {keep && <option value="">Giữ hiện tại</option>}
      {realmOpts(pham).map(([v, n]) => <option key={v} value={v}>{n}</option>)}
    </select>
  );
}

function DanTran({ d }) {
  const L = PS.devCbList(), byV = Object.fromEntries(L.map(x => [x.v, x]));
  const nhom = [...new Set(L.map(x => x.nhom))];
  const Phe = ({ s, t }) => (
    <div className="dev-phe">
      <h4 className="sgrp">{t} <small>{d.cb[s].length}/4</small></h4>
      {d.cb[s].length ? d.cb[s].map((x, i) => {
        const o = byV[x.v] || { n: x.v };
        return (
          <div key={i} className="row dev-u">
            <span className="r-t"><b>{o.em ? o.em + ' ' : ''}{o.n}</b><small>{o.nhom}{o.sub ? ' · ' + o.sub : ''}</small></span>
            <ChonCanhGioi act="devCbRe" side={s} i={i} re={x.re} pham={x.v === 'main'} keep={x.v === 'main'} />
            <button className="btn" data-act="devCbDel" data-arg={s + ':' + i} aria-label="Bỏ">×</button>
          </div>
        );
      }) : <p className="empty">Chưa có ai.</p>}
      <button className="btn" data-act="devCbAdd" data-arg={s}>+ Thêm vào {t.toLowerCase()}</button>
    </div>
  );
  return <>
    <p className="hint">Chọn người hoặc yêu thú cho hai phe, chỉnh cảnh giới từng người. Trận thử không chết; đánh xong trả lại khí huyết, linh lực và cảnh giới như trước.</p>
    <div className="dev-them">
      <select data-chg="devCbPick" value={d.cbAdd} onChange={() => {}}>
        {nhom.map(g => <optgroup key={g} label={g}>{L.filter(x => x.nhom === g).map(x => <option key={x.v} value={x.v}>{x.em ? x.em + ' ' : ''}{x.n}</option>)}</optgroup>)}
      </select>
      {d.cbAdd !== 'main' && <ChonCanhGioi act="devCbRePick" re={d.cbRe} />}
    </div>
    <div className="dev-2phe"><Phe s="A" t="Phe ta" /><Phe s="B" t="Phe địch" /></div>
    <div className="devg"><button className="btn pri big" data-act="devCbGo">Vào trận</button></div>
  </>;
}

function CanhGioi({ d }) {
  const r = PS.G.run, n = PS.devTangMax(d.re);
  const hien = r.pham ? 'Phàm nhân' : PS.REALM[r.realm] + ' · ' + (r.realm === 0 ? 'tầng ' + PS.lkTang() : PS.TIEU[PS.tieu()]);
  return <>
    <p>Hiện tại: <b>{hien}</b></p>
    <div className="dev-them">
      <ChonCanhGioi act="devRe" re={d.re} pham />
      {n > 0 && (
        <select data-chg="devG" value={d.g} onChange={() => {}}>
          {Array.from({ length: n }, (_, i) => <option key={i} value={i + 1}>{d.re === 0 ? 'Tầng ' + (i + 1) : PS.TIEU[i]}</option>)}
        </select>
      )}
      <button className="btn pri" data-act="devReGo">Đổi cảnh giới</button>
    </div>
    <p className="hint">Đổi xong khí huyết, linh lực được hồi đầy.</p>
  </>;
}

function VatPham({ d }) {
  const L = PS.devLoc(), nSel = Object.keys(d.sel).length, all = L.length > 0 && L.every(x => d.sel[x.id]);
  return <>
    <div className="tabs dev-sub">{PS.DEV_LOAI.map(([k, n]) => <button key={k} className={d.loai === k ? 'on' : ''} data-act="devLoai" data-arg={k}>{n}</button>)}</div>
    <div className="dev-them">
      <input type="search" data-devq="1" placeholder="Tìm theo tên…" defaultValue={d.q} />
      <button className="btn" data-act="devSelAll">{all ? 'Bỏ chọn hết' : 'Chọn hết'}</button>
      <button className="btn pri" data-act="devGive" disabled={!nSel}>Nhận {nSel || ''} món đã chọn</button>
      <button className="btn" data-act="devGiveAll">Nhận cả {L.length} món</button>
    </div>
    <div className="bscroll dev-scroll">
      <div className="bgrid">
        {L.slice(0, 400).map(x => (
          <button key={x.id} className={'bc on' + (d.sel[x.id] ? ' sel' : '')} data-act="devSel" data-arg={x.id} style={pcs(x.t)} {...tip(x.n + (x.sub ? ' · ' + x.sub : ''))}>
            <Html style={{ display: 'contents' }} h={PS.devIcon(d.loai, x)} />
            {d.sel[x.id] && <em className="lk dev-ok"><Ic n="check" /></em>}
          </button>
        ))}
      </div>
      {L.length > 400 && <p className="hint">Đang hiện 400/{L.length} món: gõ tên để lọc bớt. "Nhận cả" vẫn đưa đủ.</p>}
    </div>
  </>;
}

function KhiVan({ d }) {
  const L = PS.devKvList(d.kv), co = PS.devKvCo(d.kv);
  return <>
    <div className="tabs dev-sub">{KV_TABS.map(([k, n]) => <button key={k} className={d.kv === k ? 'on' : ''} data-act="devKv" data-arg={k}>{n}</button>)}</div>
    <div className="rows dev-scroll">
      {L.map(x => {
        const has = co.includes(x.id);
        return (
          <div key={x.id} className={'row' + (has ? ' taken' : '')} style={pcs(x.t)}>
            <span className="r-t"><b>{x.n}</b><small>{x.d}</small></span>
            {has ? <button className="btn" data-act="devKvDel" data-arg={x.id}>Xoá</button> : <button className="btn pri" data-act="devKvAdd" data-arg={x.id}>Thêm</button>}
          </div>
        );
      })}
    </div>
  </>;
}

function ThuongThe() {
  const L = PS.devWList(), co = PS.devWCo();
  const BAC = ['', 'Nhẹ', 'Nặng', 'Trọng thương'];
  return <>
    <div className="devg"><button className="btn pri" data-act="devWDel" disabled={!co.length}>Chữa hết thương thế</button></div>
    <div className="rows">
      {L.map(x => {
        const has = co.includes(x.k);
        return (
          <div key={x.k} className={'row' + (has ? ' taken' : '')}>
            <span className="r-t"><b>{x.n}</b><small>{BAC[x.lv] || ''}{has ? ' · đang mang' : ''}</small></span>
            {has ? <button className="btn" data-act="devWDel" data-arg={x.k}>Chữa</button> : <button className="btn" data-act="devWAdd" data-arg={x.k}>Thêm</button>}
          </div>
        );
      })}
    </div>
  </>;
}

export function DevTest() {
  const d = PS.devSt();
  return (
    <div className="mbox dev">
      <h3><Ic n="bolt" /> Dev test</h3>
      <div className="tabs dev-tabs">{TABS.map(([k, n]) => <button key={k} className={d.tab === k ? 'on' : ''} data-act="devTab" data-arg={k}>{n}</button>)}</div>
      <div className="dev-body">
        {d.tab === 'nv' && <NgoaiHinh />}
        {d.tab === 'ai' && <TuChoi />}
        {d.tab === 'tran' && <DanTran d={d} />}
        {d.tab === 'cg' && <CanhGioi d={d} />}
        {d.tab === 'map' && <><p className="hint">Hiện toàn bộ bản đồ và mọi địa điểm.</p><div className="devg"><button className="btn pri" data-act="devMap">Mở toàn bộ bản đồ</button></div></>}
        {d.tab === 'vat' && <VatPham d={d} />}
        {d.tab === 'kv' && <KhiVan d={d} />}
        {d.tab === 'thuong' && <ThuongThe />}
        {d.tab === 'fx' && <><p className="hint">Chỉ để xem hiệu ứng, nhân vật không thay đổi gì.</p><div className="devg">{DEV_FX.map(([k, n]) => <button key={k} className="btn" data-act="fxDemo" data-arg={k}>{n}</button>)}</div></>}
      </div>
      <div className="mb-f"><span className="grow"></span><button className="btn" data-act="modalX">Đóng</button></div>
    </div>
  );
}
