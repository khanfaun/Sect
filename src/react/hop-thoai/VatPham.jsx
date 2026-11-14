// Hộp thoại xem một món: vật phẩm trong túi (dùng, mặc, học, vứt, khóa), công pháp đã học,
// tiểu huyệt (khai thông), bảng màu các phẩm. Các thẻ chi tiết vẫn dùng bản HTML cũ.
import { Html, PS } from '../html';
import { Ic, pcs, tip } from '../chung';

const NutDong = () => <div className="mb-h"><span className="grow"></span><button className="xb" data-act="modalX" aria-label="Đóng"><Ic n="close" /></button></div>;

export function XemVatPham({ m }) {
  const { UI } = PS;
  const r = PS.run2(), B = PS.bagSt(), it = PS.bagItems().find(x => x.key === m.key);
  if (!it) return null;
  const dn = PS.DD_N[r.realm], lk = PS.itemLocked(it);
  const rel = it.ref.t === 'rel' ? r.relics[it.ref.i] : null;
  const act = [];
  if (rel && rel.k === 'book') {
    const why = PS.learnWhy(rel), lt = PS.durH(PS.learnTime(rel.art));
    act.push(<button key="l" className="btn pri" data-act="learn" data-arg={it.ref.i} disabled={!!why} {...tip(why || 'Tham ngộ mất ' + lt)}><Ic n="book" /> Học · {lt}</button>);
  } else if (rel) {
    act.push(<button key="e" className="btn pri" data-act="eqOn" data-arg={it.ref.i}>Mặc vào</button>);
    if (PS.ddCan(rel)) act.push(<button key="d" className="btn" data-act="ddPut" data-arg={it.ref.i} disabled={r.dd.length >= dn} {...tip(dn ? 'Đưa vào đan điền uẩn dưỡng' : 'Phải đạt Trúc Cơ mới uẩn dưỡng được')}>Uẩn dưỡng</button>);
  } else if (it.use) act.push(<button key="u" className="btn pri" data-act="bagUse">Dùng{B.n > 1 ? ' ' + B.n : ''}</button>);
  if (it.ref.t === 'egg') act.push(<button key="p" className="btn" data-act="panel" data-arg="pets">Xem ở Linh thú</button>);
  const n = PS.clamp(B.n || 1, 1, it.cnt); B.n = n;
  const canDrop = it.ref.t !== 'pass';
  return (
    <div className="mbox imod">
      <NutDong />
      <Html style={{ display: 'contents' }} h={PS.itemTip(it)} />
      {it.cnt > 1 && (
        <div className="qty">
          <button className="btn sm" data-act="bagN" data-arg="-1">−</button><b>{n}</b>
          <button className="btn sm" data-act="bagN" data-arg="1">+</button>
          <button className="btn sm" data-act="bagN" data-arg="all">Tất cả</button>
        </div>
      )}
      {act.length > 0 && <div className="bact">{act}</div>}
      <div className="bact sub">
        <button className="btn sm" data-act="bagLock" {...tip(lk ? 'Mở khóa' : 'Khóa lại: không vứt nhầm được')}><Ic n={lk ? 'unlock' : 'lock'} /> {lk ? 'Mở khóa' : 'Khóa'}</button>
        {canDrop && <button className="btn sm" data-act="bagDrop" disabled={!!lk}><Ic n="trash" /> {UI.confirm === 'drop' ? 'Chắc chứ?' : 'Vứt' + (n > 1 ? ' ' + n : '')}</button>}
        <button className="btn sm" disabled {...tip('Phân giải: sắp có')}>Phân giải</button>
        <button className="btn sm" disabled {...tip('Tăng giai: sắp có')}>Tăng giai</button>
      </div>
    </div>
  );
}

export function XemCongPhap({ m }) {
  const a = PS.artBy(+m.u);
  if (!a) return null;
  return <div className="mbox imod"><NutDong /><Html style={{ display: 'contents' }} h={PS.artCard(a)} /></div>;
}

export function CacPham() {
  const { PHAM, PHAM_M, PHAM_FROM } = PS;
  return (
    <div className="mbox">
      <div className="mb-h"><h3>Các phẩm</h3><button className="xb" data-act="modalX" aria-label="Đóng"><Ic n="close" /></button></div>
      <div className="plist">
        {PHAM.map((p, i) => (
          <div key={i} className="pl" style={pcs(i)}><i className="qsw"></i>
            <span><b className="qt" style={pcs(i)}>{p}</b> công dụng ×{String(PHAM_M[i]).replace('.', ',')} · từ {PHAM_FROM[i]}</span>
          </div>
        ))}
      </div>
      <p className="hint">Màu chữ và màu khung của mọi vật phẩm, công pháp, chiêu thức đều theo phẩm.</p>
    </div>
  );
}

export function TieuHuyet({ m }) {
  const { G, EL } = PS;
  const i = +m.i, r = G.run, el = PS.thEl(i), f = PS.TH_FX[el], on = PS.thList().includes(i);
  const v = PS.chuView(), j = PS.thNear(i, v.n), it = v.it[j], c = PS.thCost(), why = PS.thWhy(i);
  const same = it && PS.chuBase(it.el) === el;
  return (
    <div className="mbox imod">
      <div className="mb-h"><h3>Tiểu huyệt · hành {EL[el].n}</h3><button className="xb" data-act="modalX" aria-label="Đóng"><Ic n="close" /></button></div>
      <div className="kv">
        <div><span>Trạng thái</span><b className={on ? 'good' : ''}>{on ? 'Đã khai thông' : 'Còn bế tắc'}</b></div>
        <div><span>Công dụng</span><b>{f[2].replace('{v}', PS.numFx(f[1]))}</b></div>
        <div><span>Đại huyệt gần nhất</span><b>{it ? it.n : 'ô ' + (j + 1) + ' đang trống'}</b></div>
        <div><span>Cộng hưởng</span><b className={same && on ? 'good' : ''}>{same ? 'cùng hành: môn ở đó +8%' : 'khác hành: không cộng hưởng'}</b></div>
      </div>
      {!on && <>
        <p className="hint">Khai thông tốn {c.tv}% tu vi, {c.st} linh thạch và {PS.durH(c.h)}. {PS.realmName()} khai tối đa {PS.TH_MAX[PS.clamp(r.realm, 0, 5)]} tiểu huyệt (đã khai {PS.thList().length}).</p>
        {why && <p className="hint bad">{why}</p>}
        <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act="thOpen" data-arg={i} disabled={!!why}>Khai huyệt</button></div>
      </>}
    </div>
  );
}
