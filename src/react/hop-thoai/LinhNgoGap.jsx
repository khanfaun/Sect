// Lĩnh ngộ gấp bí tịch cảnh giới kế trước giờ độ kiếp (bán bộ), và cưỡng ép lĩnh ngộ thêm môn thứ hai.
import { Html, PS } from '../html';
import { Ic, tah } from '../chung';

export function LinhNgoGap({ m }) {
  const { G, REALM, PHAM } = PS;
  const L = PS.bbBooks(), r = G.run, n = PS.bbCount();
  return (
    <div className="mbox">
      <h3><Ic n="book" /> Lĩnh ngộ gấp trước giờ độ kiếp?</h3>
      <p>Ngươi đang ở bán bộ {REALM[r.realm + 1]}. Trong túi có {L.length > 1 ? 'những ' : ''}bí tịch {REALM[r.realm + 1]}. Cưỡng ép lĩnh ngộ ngay thì dùng được trong lúc độ kiếp, nhưng phải trả giá:</p>
      <ul className="bb-cost"><li>Thức hải trọng thương (vài tháng)</li><li>Thần thức, niệm lực chỉ còn bốn phần mười: khó dò xét kiếp vân, khó dùng vật phẩm, pháp bảo</li></ul>
      <div className="rows">
        {L.map(o => (
          <button key={o.i} className="row" data-act={n ? 'bbAsk2' : 'bbLearn'} data-arg={o.i} {...tah(PS.artTipH(o.x.art))}>
            <Html className="r-i" h={PS.artArt(o.x.art)} />
            <span className="r-t"><b>{o.x.art.n}</b><small>{PHAM[o.x.art.tier]} · {o.x.art.type === 'cp' ? 'công pháp' : 'tâm pháp'}</small></span>
            <span className="r-x">{n ? 'Học thêm…' : 'Học ngay'}</span>
          </button>
        ))}
      </div>
      {n ? <p className="bad">Đã cưỡng ép lĩnh ngộ một môn. Môn thứ hai cần vật bảo mệnh và thần thức đủ, không thì chết.</p>
        : <p className="hint">Chỉ nên chọn một môn. Môn thứ hai cần vật bảo mệnh và thần thức đủ, không thì thần thức tan vỡ mà chết.</p>}
      {m.err && <p className="bad">{m.err}</p>}
      <div className="mb-f"><span className="grow"></span><button className="btn" data-act="modalX">Không, giữ thần thức</button></div>
    </div>
  );
}

export function LinhNgoThem({ m }) {
  const { G, PILL } = PS;
  const rel = G.run.relics[m.i], Gd = PS.bbGuards(), need = PS.bb2Need(), th = PS.S().than;
  return (
    <div className="mbox">
      <h3><Ic n="flame" /> Cưỡng ép lĩnh ngộ thêm {rel && rel.art ? rel.art.n : ''}?</h3>
      <p className="bad">Thức hải đã rạn nứt. Lĩnh ngộ thêm một môn nữa, thần thức sẽ tan vỡ mà chết, trừ khi có vật bảo mệnh hộ trì <b>và</b> thần thức còn từ {need} (đang có {th}).</p>
      {th < need && <p className="bad">Thần thức hiện không đủ: dù có vật bảo mệnh cũng không giữ nổi.</p>}
      <h4 className="sgrp">Vật bảo mệnh trong túi</h4>
      {Gd.length ? (
        <div className="rows">
          {Gd.map(o => (
            <button key={o.i} className="row" data-act="bbLearn2" data-arg={m.i + ',' + o.i}>
              <span className="r-i">{PILL[o.p.id].i}</span>
              <span className="r-t"><b>{PILL[o.p.id].n}</b><small>Dùng một lần, dùng xong là mất</small></span><span className="r-x">Dùng</span>
            </button>
          ))}
        </div>
      ) : <p className="hint">Không tìm thấy vật bảo mệnh nào.</p>}
      <div className="mb-f"><button className="btn bad" data-act="bbLearn2" data-arg={m.i + ',-1'}>Cưỡng ép không hộ trì (chết)</button><span className="grow"></span><button className="btn" data-act="bbBack">Thôi</button></div>
    </div>
  );
}
