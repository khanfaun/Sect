// Hộp thoại mua bán: điện cống hiến tông môn, lái buôn thu mua, trạm dịch (xe, thú cưỡi, xe chuyến).
import { Html, PS } from '../html';
import { Ic, Stone, pcs, tip } from '../chung';

export function DienCongHien() {
  const r = PS.run2(), { CH_GIVE, MAT } = PS;
  return (
    <div className="mbox">
      <h3>Điện cống hiến</h3>
      <p className="hint">Đang có <b>{r.ch || 0}</b> cống hiến.</p>
      <h4 className="sgrp">Nộp vật liệu</h4>
      <div className="rows">
        {Object.keys(CH_GIVE).map(k => (
          <button key={k} className="row" data-act="chGive" data-arg={k} disabled={!r.mats[k]}>
            <span className="r-i">{MAT[k].i}</span>
            <span className="r-t"><b>{MAT[k].n}</b><small>đang có {r.mats[k] || 0}</small></span>
            <span className="r-x">+{CH_GIVE[k]} cống hiến</span>
          </button>
        ))}
      </div>
      <h4 className="sgrp">Đổi thưởng</h4>
      <div className="rows">
        <button className="row" data-act="chTrade" disabled={(r.ch || 0) < 15 || r.pills.length >= PS.S().pillMax}>
          <span className="r-t"><b>Một viên đan trung phẩm</b><small>ngẫu nhiên</small></span><span className="r-x">15 cống hiến</span>
        </button>
      </div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Xong</button></div>
    </div>
  );
}

export function LaiBuon() {
  const L = PS.sellList();
  return (
    <div className="mbox">
      <h3>Lái buôn thu mua</h3>
      <p className="hint">Giá bằng chừng nửa giá mua. Trong túi: <Stone v={PS.G.run.st} /></p>
      <div className="rows">
        {L.length ? L.map((x, i) => (
          <button key={i} className="row" data-act="sell" data-arg={x.k + ':' + x.i}>
            <Html className="r-i" h={x.ic} />
            <span className="r-t"><b>{x.n}</b><small>{x.sub}</small></span>
            <span className="r-x">bán <Stone v={x.p} /></span>
          </button>
        )) : <p className="empty">Không có gì để bán.</p>}
      </div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Xong</button></div>
    </div>
  );
}

// Ảnh phương tiện (nếu có ảnh) hoặc biểu tượng
function AnhXe({ v, icon }) {
  const A = PS.ASSET.veh;
  return A && A[v.k] ? <img src={A[v.k]} alt="" /> : <Ic n={icon || v.ic} />;
}

function MotXe({ m, L }) {
  const r = PS.G.run, v = L[m.i], cur = PS.mountOf();
  if (!v) return null;
  const lock = r.realm < v.realm, cb = PS.vehBuy(v), cr = PS.vehRent(v);
  return (
    <div className="mbox veh">
      <div className="vh-top">
        <span className="vslot big" style={pcs(v.tier)}><AnhXe v={v} /></span>
        <div><h3 className="qt" style={pcs(v.tier)}>{v.n}</h3><small>{PS.GRADE[v.tier]} · còn {v.qty}</small></div>
      </div>
      <div className="kv">
        <div><span>Tốc độ đi đường</span><b>×{PS.numVN(v.m)}</b></div>
        <div><span>Đang dùng</span><b>{cur ? cur.n + ' ×' + PS.numVN(cur.m) + (cur.rented ? ' (thuê)' : '') : 'đi bộ'}</b></div>
        {lock && <div><span>Yêu cầu</span><b className="bad">{PS.REALM[v.realm]}</b></div>}
      </div>
      <div className="veh-b">
        <button className="btn" data-act="vehGo" data-arg={m.i + ':rent'} disabled={lock || v.qty <= 0 || r.st < cr}><span>Thuê 1 tháng</span><span className="cost-s"><i className="rh"></i>{cr}</span></button>
        <button className="btn pri" data-act="vehGo" data-arg={m.i + ':buy'} disabled={lock || v.qty <= 0 || r.st < cb}><span>Mua</span><span className="cost-s"><i className="rh"></i>{PS.fmtN(cb)}</span></button>
      </div>
      <div className="mb-f"><span className="grow">Trong túi: <Stone v={r.st} /></span><button className="btn" data-act="tramBack">Quay lại</button></div>
    </div>
  );
}

export function TramDich({ m }) {
  const r = PS.G.run, n = PS.nodeById(r.at), L = PS.tramStock(n);
  if (m.k === 'vehi') return <MotXe m={m} L={L} />;
  const cur = PS.mountOf(), now = PS.W().t;
  const S0 = PS.stageList(n), rl = r.rent && r.rent.until > now ? r.rent : null;
  return (
    <div className="mbox tram">
      <h3>Trạm dịch</h3>
      <div className="vh-cur">
        <span className={'vslot' + (cur ? '' : ' empty')} style={cur ? pcs(cur.tier || 0) : undefined}>{cur ? <AnhXe v={cur} icon={cur.ic || 'run'} /> : <Ic n="walk" />}</span>
        <div><b>{cur ? cur.n : 'Đi bộ'}</b><small>{cur ? 'Tốc độ ×' + PS.numVN(cur.m) + (cur.rented && rl ? ' · thuê, còn ' + PS.durH(rl.until - now) : '') : 'Chưa có phương tiện'}</small></div>
      </div>
      <h4 className="sgrp">Hàng ở trạm<small>đổi hàng sau {PS.durH(PS.tramResetIn())}</small></h4>
      <div className="vgrid">
        {L.map((v, i) => (
          <button key={i} className={'vcell' + (v.qty <= 0 ? ' out' : '') + (r.realm < v.realm ? ' lock' : '')} data-act="vehi" data-arg={i} style={pcs(v.tier)} {...tip(v.n + ' · ' + PS.GRADE[v.tier] + '\nTốc độ ×' + PS.numVN(v.m))}>
            <span className="vslot" style={pcs(v.tier)}><AnhXe v={v} /></span>
            <span className="vn">{v.n}</span><span className="vq">{v.qty > 0 ? 'còn ' + v.qty : 'hết'}</span>
          </button>
        ))}
      </div>
      <h4 className="sgrp">Thuê xe chuyến</h4>
      <div className="rows">
        {S0.length ? S0.map(x => (
          <button key={x.id} className="row" data-act="stage" data-arg={x.id} disabled={r.st < x.c}>
            <span className="r-t"><b>{x.n}</b><small>{PS.durH(x.h)} đường · nhanh gấp ba, không bị chặn</small></span>
            <span className="r-x"><Stone v={x.c} /></span>
          </button>
        )) : <p className="empty">Chưa tới thôn trấn nào khác trong vùng.</p>}
      </div>
      <div className="mb-f"><span className="grow">Trong túi: <Stone v={r.st} /></span><button className="btn" data-act="modalX">Đóng</button></div>
    </div>
  );
}
