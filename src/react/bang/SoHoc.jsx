// Thẻ sở học (công pháp, tâm pháp, Khí Hải) và thẻ kỹ năng (ô chiêu, thần thức, nội tại) trong bảng nhân vật.
// Hình Khí Hải (chuHTML) là hình vẽ, vẫn dùng bản cũ.
import { Html, PS } from '../html';
import { Ib, Ic, SlotX, pcs, tah, tip } from '../chung';

// Khóa cho phàm nhân (giống PHAM_LOCK)
const KhoaPham = ({ t, d }) => <div className="pham-lock"><Ic n="lock" /><b>{t}</b><p>{d}</p></div>;

function LuoiCongPhap({ type }) {
  const { REALM, ART_MAX, ART_CAP } = PS;
  const r = PS.run2();
  const A = PS.arts().filter(a => a.type === type).sort((a, b) => (PS.artSlot(b) >= 0) - (PS.artSlot(a) >= 0) || b.tier - a.tier);
  const cap = PS.artCap(type);
  const books = r.relics.filter(x => x.k === 'book' && x.art.type === type).length + PS.artKho().filter(x => x.type === type).length;
  const cells = A.map(a => (
    <button key={a.u} className={'acell' + (PS.artSlot(a) >= 0 ? ' run' : '')} data-act="artOpen" data-arg={a.u} style={pcs(a.tier)} {...tah(PS.artTipH(a))}>
      <span className="qi"><Html style={{ display: 'contents' }} h={PS.artArt(a)} /><i className="alv" {...tip('Tầng ' + a.lv + ' / ' + a.lines.length)}>{a.lv}</i></span>
      <b className="qt">{a.n}</b>
      <SlotX act="artStash" arg={a.u} t="Tháo ra, cất vào kho công pháp" />
    </button>
  ));
  for (let i = A.length; i < cap; i++) cells.push(
    <button key={'e' + i} className="acell emp" data-act="slotPick" data-arg={'L' + type} {...tip(books ? 'Có ' + books + ' môn trong kho và trong túi. Chạm để chọn.' : 'Ô trống. Tìm bí tịch để học.')}>
      <span className="qi"><Ic n="plus" /></span><small>{books ? books + ' môn chờ' : 'trống'}</small>
    </button>
  );
  // luôn bày đủ 10 ô (2 hàng × 5); ô chưa mở ghi cảnh giới cần
  for (let i = Math.max(A.length, cap); i < ART_MAX; i++) {
    const nx = ART_CAP[type].findIndex(x => x > i);
    cells.push(<span key={'l' + i} className="acell lockc" {...tip('Mở khi đạt ' + REALM[nx])}><span className="qi"><Ic n="lock" /></span><small>{REALM[nx]}</small></span>);
  }
  return <div className="agrid2">{cells}</div>;
}

export function SoHoc() {
  const A = PS.arts(), v = PS.chuView();
  const Head = ({ icn, t, type }) => <h4 className="sgrp"><Ib n={icn} c="soft" />{t} <small>{A.filter(a => a.type === type).length}/{PS.artCap(type)}</small></h4>;
  return (
    <div className="hocwrap">
      <div className="hocR">
        <Head icn="sword" t="Công pháp" type="cp" /><LuoiCongPhap type="cp" />
        <Head icn="lotus" t="Tâm pháp" type="tp" /><LuoiCongPhap type="tp" />
      </div>
      <div className="hocL">
        {PS.isPham() ? <KhoaPham t="Khí Hải chưa mở" d="Phàm nhân chưa dẫn khí vào thân, đan điền còn trống. Dẫn khí nhập thể rồi mới vận hành công pháp trong Khí Hải được." /> : <>
          <h4 className="sgrp"><Ib n="cycle" c="soft" />Khí Hải <small>{v.it.filter(Boolean).length}/{PS.chuSlots()} · tiểu huyệt {PS.thList().length}/{PS.TH_N}</small><span className="grow"></span>
            <span className="qhelp" {...tip('Khí Hải là đan điền và các huyệt quanh nó.\nĐại huyệt (ô lớn): đặt công pháp, tâm pháp để vận hành. Mỗi cảnh giới mở thêm một ô.\nHai đại huyệt cạnh nhau: hành trước sinh hành sau thì mạnh lên, khắc thì yếu đi (Mộc → Hỏa → Thổ → Kim → Thủy → Mộc).\nChấm vàng: huyệt đạo, mạnh gấp rưỡi.\nTiểu huyệt (chấm nhỏ): khai bằng tu vi và linh thạch, mỗi cái cho một chỉ số nhỏ; cùng hành với môn ở đại huyệt gần nó thì môn đó mạnh thêm 8%.')}><Ic n="info" cls="sm" /></span>
          </h4>
          <Html style={{ display: 'contents' }} h={PS.chuHTML()} />
        </>}
      </div>
    </div>
  );
}

const CAT_IC = { atk: 'sword', def: 'shield', move: 'wind', ult: 'spark' };

export function KyNang() {
  if (PS.isPham()) return <KhoaPham t="Chưa dẫn khí nhập thể" d="Phàm nhân chưa có linh lực nên chưa dùng được chiêu thức. Trong trận chỉ đánh thường, thủ thế, đỡ đòn và dùng đồ. Đủ tu vi để dẫn khí nhập thể, bước vào Luyện Khí thì mở." />;
  const { CAT_MAX, CAT_N, SK } = PS;
  const r = PS.run2(); PS.syncSkills();
  const m = PS.mindArt();
  const P = [], vv = PS.chuView();
  vv.it.forEach((it, i) => { if (!it) return; const a = PS.artBy(it.u); PS.artFxList(a, PS.chuPot(vv, i)).forEach(x => P.push([a, (x.n ? x.n + ': ' : '') + x.t.replace('{v}', PS.numFx(x.v))])); });
  return <>
    <div className="knwrap">
      {Object.keys(CAT_MAX).map(c => {
        const av = PS.knAvail(c), L = r.kn[c];
        return (
          <div key={c} className="knline">
            <div className="kn-c"><Ib n={CAT_IC[c]} c="soft" /><b>{CAT_N[c]}</b><small>{L.length}/{CAT_MAX[c]}</small></div>
            <div className="knrow">
              {Array.from({ length: CAT_MAX[c] }, (_, i) => {
                const id = L[i], sk = id && SK[id];
                return (
                  <button key={i} className={'kns' + (sk ? ' on' : '')} data-act="knPick" data-arg={c + ':' + i} style={sk ? pcs(sk.t) : undefined} {...(sk ? tah(PS.skTipH(sk, av[id])) : tip('Ô trống. Chạm để chọn chiêu.'))}>
                    {sk ? <>
                      <span className="qi"><Html style={{ display: 'contents' }} h={PS.skArt(sk)} /></span>
                      <span className="at-t"><b className="qt">{sk.n}</b><small>{PS.skillCost(sk)} linh lực</small></span>
                      <SlotX act="knDel" arg={c + ':' + i} t="Gỡ chiêu" />
                    </> : <><span className="kn-e"><Ic n="plus" /></span><small>{Object.keys(av).length ? 'chọn chiêu' : 'trống'}</small></>}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
    <p className="hint">Chiêu lấy từ các công pháp đang vận hành. Trong trận, Tấn công và Thân pháp nằm ở nút Tấn công; Phòng thủ nằm ở nút Phòng thủ. Thần thông: khi thần lực đầy, chạm avatar để hiển hóa pháp tướng, chạm lần nữa để tung đòn tối thượng.</p>
    {m && <>
      <h4 className="sgrp"><Ib n="eye" c="soft" />Thần thức</h4>
      <div className="row"><span className="r-i"><Ic n="eye" /></span><span className="r-t"><b>Thần Thức Thứ</b><small>Từ <b className="qt" style={pcs(m.tier)}>{m.n}</b> · tốn 30% linh lực · niệm lực {PS.S().than}: hơn đối thủ thì làm choáng</small></span></div>
    </>}
    <h4 className="sgrp"><Ib n="cycle" c="soft" />Nội tại đang vận hành <small>{P.length}</small></h4>
    {P.length ? <div className="kvl">{P.map(([a, t], i) => <div key={i} className="kr"><span>{t}</span><b className="qt sm" style={pcs(a.tier)}>{a.n}</b></div>)}</div> : <p className="hint">Chưa có.</p>}
  </>;
}
