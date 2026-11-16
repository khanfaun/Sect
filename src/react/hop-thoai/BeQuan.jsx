// Hộp thoại bế quan (thẻ "Bế quan") và cảnh giới (thẻ "Cảnh giới").
// Lưu ý: khi kéo thanh trượt, game cập nhật thẳng các ô có id bqY, bqG, bqS, bqL, bqN, bqHint, bqGoB
// (hàm bqUpd) cho nhanh. Vì vậy mỗi ô đó chỉ chứa đúng một chuỗi chữ.
import { useLayoutEffect, useRef } from 'react';
import { Html, PS } from '../html';
import { Ic, Tranh, tip } from '../chung';

function Tabs({ m }) {
  return (
    <div className="tabs bq-tabs">
      <button className={m.tab !== 'cg' && m.tab !== 'tt' ? 'on' : ''} data-act="bqTab" data-arg="bq">Bế quan</button>
      <button className={m.tab === 'tt' ? 'on' : ''} data-act="bqTab" data-arg="tt">Tĩnh toạ</button>
      <button className={m.tab === 'cg' ? 'on' : ''} data-act="bqTab" data-arg="cg">Cảnh giới</button>
    </div>
  );
}

// Ô báo đột phá / tu vi viên mãn
function OBaoDotPha({ cn }) {
  const cw = PS.tuCapWhy();
  if (PS.btReadyTv() && cw) return <div className="bt-box"><b><Ic n="spark" /> Tu vi đã viên mãn</b><p className="hint bad">{cw}</p></div>;
  const ph = PS.isPham();
  const bth = ph ? 'Đủ để xung kích Luyện Khí tầng 1' : PS.lkOn() ? 'Luyện Khí tầng ' + PS.lkTang() + ', đủ để đột phá' : 'Tu vi đã viên mãn';
  if (PS.btReadyTv() && PS.llOf() < PS.llNeedBt()) return <div className="bt-box"><b><Ic n="spark" /> {bth}</b><p className="hint bad">Lịch luyện chưa theo kịp nên chưa đột phá được. Hãy ra ngoài lịch luyện.</p></div>;
  if (!PS.canBreak()) return null;
  const atDp = (cn && cn.dp) || ph;
  return (
    <div className={'bt-box' + (atDp ? ' on' : '')}>
      <b><Ic n="spark" /> {bth}</b>
      <p className="hint">{ph ? 'Có thể dẫn khí nhập thể ngay tại đây.' : atDp ? 'Nơi này có động phủ, có thể đột phá ngay.' : 'Phải tới nơi có động phủ mới đột phá được.'}</p>
      <button className={'btn ' + (atDp ? 'pri glow' : '')} data-act="cgGo" disabled={!atDp}>{ph ? 'Xung kích' : 'Đột phá'}</button>
    </div>
  );
}

// Ô xung kích tầng / kỳ kế tiếp
function OXungKich() {
  const X = PS.lkXkState();
  if (!X) return null;
  const g = PS.sgGate();
  return (
    <div className={'bt-box' + (X.ok ? ' on' : '')}>
      <b><Ic n="spark" /> Xung kích {X.nx}</b>
      <p className={'hint' + (X.ok ? '' : ' bad')}>{X.ok ? 'Thanh tu vi ' + PS.sgName(g) + ' đã đầy. Dồn linh lực phá quan để lên ' + X.nx + ' (mất chừng một tháng).' + (X.why ? ' ' + X.why : '') : X.why}</p>
      <button className={'btn ' + (X.ok ? 'pri' : '')} data-act="cgGo" disabled={!X.ok}>Xung kích</button>
    </div>
  );
}

function ThanhTruot({ y, mx, capP }) {
  const ref = useRef(null);
  // thanh trượt tự do (không khóa theo React) để kéo mượt; khi bấm nút chọn nhanh thì đặt lại giá trị
  useLayoutEffect(() => { if (ref.current && +ref.current.value !== y) ref.current.value = y; }, [y]);
  return <input ref={ref} type="range" id="bqR" min="0" max={mx} step="0.25" defaultValue={y} style={{ '--cap': capP + '%', '--val': (mx > 0 ? y / mx * 100 : 0) + '%' }} />;
}

// Bầu trời bế quan: tranh động phủ phủ màu theo giờ hiện tại (cùng màu với bản đồ)
const PHAN = { sang: 'Ban ngày', chieu: 'Ban ngày', toi: 'Ban ngày', dem: 'Ban đêm' };
function TroiBeQuan({ G }) {
  const w = PS.W(), h = PS.tHour(w.t);
  const on = !PS.CFG || PS.CFG.daynight !== false;
  const c = on ? PS.dnTint(h, !!(PS.C && PS.C.dark)) : [0, 0, 0, 0];
  const ph = PS.partOf(w.t);
  return (
    <div className="bq-sky">
      <Tranh seed={'bequan' + G.run.at} reg={G.run.region} type="dong" cls="mart" figs="nhan:0.5:0.5:0:bq" />
      <i className="bq-tint" style={{ background: `rgba(${c[0] | 0},${c[1] | 0},${c[2] | 0},${Math.min(0.5, c[3] * 2.2).toFixed(3)})` }} />
      <small className="bq-time">{PHAN[ph]} · {Math.floor(h)}h</small>
    </div>
  );
}

// Thanh tiến độ: tu vi (còn bao xa tới đột phá) và lịch luyện
function ThanhBQ({ n, v, cls, t, note }) {
  const p = Math.max(0, Math.min(100, v));
  return (
    <div className="hrow tvrow" {...tip(t)}>
      <span className="hn">{n}</span>
      <div className={'hb ' + cls}><i style={{ width: p + '%' }} /></div>
      <span className="hv">{note || v + '%'}</span>
    </div>
  );
}

function TheBeQuan({ m }) {
  const { G, HY } = PS;
  const I = PS.bqInfo(), mx = Math.min(5, I.maxY);
  const y = PS.clamp(m.y == null ? Math.min(1, mx) : m.y, 0, mx); m.y = y;
  const cn = PS.curNode(), B = PS.bqBits(y, I), cap = PS.bqCapY();
  const capP = cap != null && mx > 0 ? Math.min(100, cap / mx * 100) : 100;
  const sgLabel = PS.sgOn() && PS.sgGate() < PS.sgTh().length ? 'Tới đầy ' + (PS.lkOn() ? 'tầng' : 'kỳ') : null;
  return (
    <div className="mbox bq">
      <Tabs m={m} />
      <TroiBeQuan G={G} />
      <h3>Bế quan</h3>
      <div className="kv">
        <div><span>Nơi bế quan</span><Html style={{ display: 'contents' }} h={PS.lkTag(cn)} /></div>
      </div>
      <ThanhBQ n="Tu vi" v={PS.tvShow()} cls="tv" note={PS.btReadyTv() ? 'Viên mãn' : 'Còn ' + (100 - PS.tvShow()) + '%'} t={'Tu vi ' + PS.tvShow() + '%\nĐầy thì đủ sức đột phá.'} />
      <ThanhBQ n="Lịch luyện" v={PS.llShow()} cls="ll" t={'Lịch luyện ' + PS.llShow() + '%\nCó được nhờ thực chiến, tới nơi mới, quen người mới, làm xong việc.\nTu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần. Muốn đột phá cần lịch luyện đầy.'} />
      <label className="rng"><span>Thời gian: <b id="bqY">{y > 0 ? PS.durH(y * HY) : '0 tháng'}</b></span><ThanhTruot y={y} mx={mx} capP={capP} /></label>
      <div className="hbtns">
        <button data-act="bqSet" data-arg="0.25">3 tháng</button>
        <button data-act="bqSet" data-arg="0.5" disabled={mx < 0.5}>6 tháng</button>
        <button data-act="bqSet" data-arg="1" disabled={mx < 1}>1 năm</button>
        <button data-act="bqSet" data-arg={Math.min(mx, PS.bqNeedY())} disabled={!!I.full}>{sgLabel || 'Tới viên mãn'}</button>
      </div>
      <div className="bq-res" {...tip('Hên xui: mỗi lần bế quan nhận được một số trong khoảng này. Đã gồm phần thổ nạp.')}><small>Nhận được</small><b className="tu-c" id="bqG">{B.g}</b></div>
      <p className={'bq-ll ' + B.sc} id="bqS">{B.s}</p>
      <div className="kv">
        <div><span>Thọ nguyên còn lại</span><b id="bqL" className={B.lc}>{B.l}</b></div>
        <div><span>{sgLabel ? sgLabel + ' còn' : 'Tới viên mãn còn'}</span><b id="bqN">{B.n}</b></div>
      </div>
      <p className="hint" id="bqHint">{B.h}</p>
      {y > 0 && y * 12 >= PS.ttLeftM() && <p className="bad"><b>Vượt thọ nguyên:</b> sẽ tọa hóa trước khi xuất quan (theo thọ nguyên hiện tại).</p>}
      <OBaoDotPha cn={cn} />
      <OXungKich />
      {!!m.warn && (
        <div className="bq-warn">
          <p><b>Lịch luyện không đủ</b></p>
          <p>Bế quan quá {PS.durH(cap * HY)} thì gần như không tăng thêm tu vi nữa. Nên ra ngoài lịch luyện trước.</p>
          <p>Vẫn tiếp tục bế quan {PS.durH(y * HY)}?</p>
          <div className="mb-f"><button className="btn" data-act="bqWarnX">Thôi</button><button className="btn pri" data-act="bqWarnOk">Xác nhận, tiếp tục</button></div>
        </div>
      )}
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" id="bqGoB" data-act="bqGo" disabled={!(y > 0 && !PS.bqFullNow())}>Nhập định</button></div>
    </div>
  );
}

// Thẻ tĩnh toạ: không tăng tu vi, hồi khí huyết/linh lực nhanh hơn, giảm tâm ma; đổi bằng thời gian (tuổi thọ)
function TheTinhToa({ m }) {
  const left = PS.ttLeftM(), why = PS.ttWhy();
  const mx = Math.max(1, Math.min(PS.TT_MAXM, left + 1));
  const v = Math.max(1, Math.min(mx, m.tt || 3)); m.tt = v;
  const P = PS.ttPreview(v), s = PS.S(), r = PS.G.run;
  return (
    <div className="mbox bq">
      <Tabs m={m} />
      <TroiBeQuan G={PS.G} />
      <h3>Tĩnh toạ</h3>
      <p className="hint">Ngồi yên dưỡng thân. Không tăng tu vi; khí huyết, linh lực hồi nhanh gấp {PS.TT_MUL} lần, tâm ma lắng xuống. Thời gian vẫn trôi.</p>
      <label className="rng"><span>Thời gian: <b>{PS.durH(v * PS.HM)}</b></span>
        <input type="range" min="1" max={mx} step="1" value={v} onChange={e => { m.tt = +e.target.value; PS.render(); }} /></label>
      <div className="kv">
        <div><span>Khí huyết</span><b>+{P.hp} <small>({Math.round(r.hp)}/{s.maxHp})</small></b></div>
        {!PS.isPham() && <div><span>Linh lực</span><b>+{P.mp}</b></div>}
        <div><span>Tâm ma</span><b>−{P.tamma}</b></div>
        <div><span>Thọ nguyên còn lại</span><b className={P.over ? 'bad' : ''}>{PS.durH(left * PS.HM)}</b></div>
      </div>
      {P.over && <p className="bad"><b>Vượt thọ nguyên:</b> sẽ tọa hóa trước khi xả toạ (theo thọ nguyên hiện tại).</p>}
      {!!why && <p className="bad">{why}</p>}
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act="ttGo" data-arg={v} disabled={!!why}>{P.over ? 'Vẫn tĩnh toạ' : 'Tĩnh toạ'}</button></div>
    </div>
  );
}

export function BeQuan({ m }) {
  if (!PS.G.run) return null;
  if (m.tab === 'tt') return <TheTinhToa m={m} />;
  if (m.tab === 'cg') return (
    <div className="mbox bq cgbox">
      <Tabs m={m} />
      <Html style={{ display: 'contents' }} h={PS.cgTabHTML()} />
      <div className="mb-f"><span className="grow"></span><button className="btn" data-act="modalX">Đóng</button></div>
    </div>
  );
  return <TheBeQuan m={m} />;
}
