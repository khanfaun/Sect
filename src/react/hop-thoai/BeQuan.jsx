// Màn bế quan (toàn màn hình, giống màn tu luyện của bản mẫu) gồm hai thẻ: "Bế quan" (chọn Bế quan hoặc Tĩnh toạ) và "Cảnh giới".
// Nhân vật ngồi đúng trên bậc thềm của ảnh nền (KhungBeQuan tự canh ảnh nền theo chỗ ngồi).
// Đủ điều kiện đột phá / xung kích: hạt châu giữa người thành nút bấm.
// Lưu ý: khi kéo thanh trượt bế quan, game cập nhật thẳng các ô có id bqY, bqG, bqS, bqL, bqN, bqHint, bqGoB, bqYn (hàm bqUpd).
import { useLayoutEffect, useRef } from 'react';
import { Html, PS } from '../html';
import { Ic, tip } from '../chung';
import { I } from '../giao-dien/anh';
import { NhanVatThien } from '../giao-dien/NhanVatThien';

// ảnh nền nen-tu-luyen: 780×1045, tâm mặt bậc thềm ở (50%, 67.5%), mặt thềm rộng chừng 47% bề ngang ảnh
const NEN = { w: 780, h: 1045, x: 0.5, y: 0.675, rong: 0.566 }; // rong: bề ngang nhân vật / bề ngang ảnh nền, đo từ bản mẫu (356 / 628)

function Tabs({ m }) {
  const noBq = PS.bqNoWhy();
  const cg = m.tab === 'cg';
  return (
    <div className="tabs bq-tabs">
      <button className={!cg ? 'on' : ''} data-act="bqTab" data-arg="bq" disabled={!!noBq && cg} {...(noBq ? tip(noBq) : {})}>Tu luyện</button>
      <button className={cg ? 'on' : ''} data-act="bqTab" data-arg="cg">Cảnh giới</button>
    </div>
  );
}

// Chọn kiểu ngồi: bế quan (tăng tu vi) hoặc tĩnh toạ (hồi phục, giảm tâm ma)
function ChonKieu({ tt }) {
  return (
    <div className="bq-kieu" role="radiogroup">
      <button className={'bq-k' + (!tt ? ' on' : '')} role="radio" aria-checked={!tt} data-act="bqTab" data-arg="bq">
        <i className="bq-tick" /><span><b>Bế quan</b><small>Tăng tu vi. Thời gian trôi qua.</small></span>
      </button>
      <button className={'bq-k' + (tt ? ' on' : '')} role="radio" aria-checked={tt} data-act="bqTab" data-arg="tt">
        <i className="bq-tick" /><span><b>Tĩnh toạ</b><small>Không tăng tu vi. Hồi khí huyết, linh lực; tâm ma lắng xuống.</small></span>
      </button>
    </div>
  );
}

// Ghi chú dưới thẻ cảnh giới: vì sao chưa đột phá / xung kích được, hoặc báo đã đủ điều kiện
function ghiChu(cn) {
  const L = [], X = PS.lkXkState && PS.lkXkState(), ph = PS.isPham();
  if (PS.voKnown()) return [['bad', 'Vô linh căn: chưa thể tu luyện.']];
  const cw = PS.tuCapWhy && PS.tuCapWhy();
  if (PS.btReadyTv() && cw) L.push(['bad', cw]);
  else if (PS.btReadyTv() && PS.llOf() < PS.llNeedBt()) L.push(['bad', 'Thiếu lịch luyện để ' + (ph ? 'xung kích' : 'đột phá') + ': hãy ra ngoài đánh trận, đi đây đó, làm việc.']);
  else if (PS.canBreak()) L.push((cn && cn.dp) || ph ? ['ok', 'Đủ điều kiện ' + (ph ? 'xung kích' : 'đột phá') + ': chạm hạt châu giữa người.'] : ['bad', 'Đủ tu vi đột phá, nhưng phải tới nơi có động phủ mới đột phá được.']);
  if (X) {
    if (X.ok) L.push(['ok', 'Đủ điều kiện xung kích ' + X.nx + ': chạm hạt châu giữa người.']);
    else if (X.ll) L.push(['bad', 'Thiếu lịch luyện để xung kích ' + X.nx + '.']);
  }
  const B = PS.bqFullNow && PS.bqFullNow();
  if (!L.length && B) L.push(['mid', 'Tu vi đã đầy, bế quan thêm không tăng.']);
  return L;
}

// nút trên hạt châu khi đủ điều kiện
function NutHatChau({ cn }) {
  const X = PS.lkXkState && PS.lkXkState(), ph = PS.isPham(), vo = PS.voKnown();
  const dp = PS.canBreak() && ((cn && cn.dp) || ph) && !vo;
  if (!dp && !(X && X.ok)) return null;
  const t = X && X.ok && !dp ? 'Xung kích' : ph ? 'Xung kích' : 'Đột phá';
  return <button className="hc-nut" data-act="cgGo" {...tip(t + (X && X.ok && !dp ? ' lên ' + X.nx : ''))}><b>{t}</b></button>;
}

// Canh ảnh nền để tâm bậc thềm trùng chỗ ngồi (bóng dưới người), ảnh luôn phủ kín màn
function useCanhNen(root) {
  useLayoutEffect(() => {
    const el = root.current; if (!el) return;
    const go = () => {
      const nen = el.querySelector('.bq-canh'), sh = el.querySelector('.bq-stage .doll3 .shd'), dl = el.querySelector('.bq-stage .doll3');
      if (!nen || !sh || !dl) return;
      const R = el.getBoundingClientRect(), S = sh.getBoundingClientRect(), D = dl.getBoundingClientRect();
      if (!R.width || !R.height) return;
      const cx = S.left + S.width / 2 - R.left, sy = S.top + S.height / 2 - R.top;
      // cỡ ảnh theo tỉ lệ bản mẫu (nhân vật / nền); chỉ cần phủ bề ngang và phía trên, phía dưới đã có các thẻ che
      // ảnh đủ rộng để tâm bậc thềm trùng đúng chỗ ngồi mà vẫn phủ kín hai bên (không cần dịch ngang ảnh)
      const phu = Math.max(cx / NEN.x, (R.width - cx) / (1 - NEN.x));
      const ih = Math.max(R.width * NEN.h / NEN.w, phu * NEN.h / NEN.w, sy / NEN.y, D.width / NEN.rong * NEN.h / NEN.w);
      const iw = ih * NEN.w / NEN.h;
      const x0 = cx - NEN.x * iw, y0 = sy - NEN.y * ih;
      Object.assign(nen.style, { width: iw + 'px', height: ih + 'px', left: x0 + 'px', top: y0 + 'px' });
    };
    go();
    const t = setTimeout(go, 60);
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(go) : null;
    if (ro) ro.observe(el);
    return () => { clearTimeout(t); if (ro) ro.disconnect(); };
  });
}

// Nền: chỉ ảnh phong cảnh có bậc thềm (đã bỏ lớp phủ màu theo giờ và dòng giờ)
function TroiBeQuan() {
  return <div className="bq-sky"><div className="bq-canh"><img className="bq-nen" src={I('nen-tu-luyen')} alt="" /></div></div>;
}

// Thanh tiến độ: tu vi và lịch luyện
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

function KhungBeQuan({ m, cls, children }) {
  const r = PS.G.run, s = PS.S(), tm = r.tamma || 0, cn = PS.curNode();
  const ready = PS.btReadyTv(), voK = PS.voKnown();
  const root = useRef(null);
  useCanhNen(root);
  const dt = PS.rateOf('tam', s.tam, 'muc');
  const notes = ghiChu(cn);
  return (
    <div ref={root} className={'mbox bq bq-home' + (cls ? ' ' + cls : '')}>
      <TroiBeQuan />
      <div className="bq-top">
        <Tabs m={m} />
        <button className="xb" data-act="modalX" aria-label="Đóng"><Ic n="close" /></button>
      </div>
      <div className="bq-stage">
        <NhanVatThien nut={<NutHatChau cn={cn} />} />
        <div className="orbb l" {...tip('Đạo tâm: ' + dt.t + '\nChống ảo cảnh, tâm ma; giúp đột phá.')}>
          <div className="o"><img src={I('cau-kiep')} alt="" /><b>Đạo Tâm</b></div><small>Đạo tâm {Math.round(s.tam)}</small>
        </div>
        <button className={'orbb r' + (tm >= 60 ? ' hi' : '')} data-act="bqTab" data-arg="tt" {...tip('Tâm ma ' + Math.round(tm) + '/100: ' + PS.tmWord(tm).toLowerCase() + '\nĐầy sẽ phải đối mặt với chính mình. Tĩnh toạ để giảm.')}>
          <div className="o"><img src={I('cau-ma')} alt="" /><b>Tâm Ma</b></div><small>Tâm ma {Math.round(tm)}/100</small>
        </button>
      </div>
      <div className="bq-cult">
        <span className="rb" {...tip('Linh căn: ' + PS.rootLabel(r) + (PS.rootElsLabel(r) ? ': ' + PS.rootElsLabel(r) : ''))}><i><img src={I('cau-tu')} alt="" /></i>Linh căn</span>
        <div className="mid">
          <b>{PS.realmLabel()}</b>
          {!voK && <>
            <ThanhBQ n="Tu vi" v={PS.tvShow()} cls="tv" note={ready ? 'Viên mãn' : PS.tvShow() + '%'} t={'Tu vi ' + PS.tvShow() + '%\nĐầy thì đủ sức đột phá.'} />
            <ThanhBQ n="Lịch luyện" v={PS.llShow()} cls="ll" t={'Lịch luyện ' + PS.llShow() + '%\nCó được nhờ thực chiến, tới nơi mới, quen người mới, làm xong việc.\nTu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần. Muốn đột phá cần lịch luyện đầy.'} />
          </>}
          {notes.map(([c, t], i) => <p key={i} className={'bq-note ' + c}>{t}</p>)}
        </div>
        <button className="rb" data-act="bqTab" data-arg="cg"><i><img src={I('it-bi-kip')} alt="" /></i>Cảnh giới</button>
      </div>
      <div className="bq-pan">{children}</div>
    </div>
  );
}

// thanh trượt bế quan (không khóa theo React để kéo mượt; game tự cập nhật số liệu)
function ThanhTruot({ y, mx, capP }) {
  const ref = useRef(null);
  useLayoutEffect(() => { if (ref.current && +ref.current.value !== y) ref.current.value = y; }, [y]);
  return <input ref={ref} type="range" id="bqR" min="0" max={mx} step="0.25" defaultValue={y} style={{ '--cap': capP + '%', '--val': (mx > 0 ? y / mx * 100 : 0) + '%' }} />;
}

// ô nhập số năm (bế quan dùng năm, tĩnh toạ đổi ra tháng)
function NhapNam({ id, v, max, onSet }) {
  const ref = useRef(null);
  useLayoutEffect(() => { if (ref.current && document.activeElement !== ref.current) ref.current.value = +(+v).toFixed(2); }, [v]);
  return (
    <label className="bq-nam">
      <input ref={ref} id={id} type="number" min="0.25" max={max} step="0.25" defaultValue={+(+v).toFixed(2)} inputMode="decimal"
        onChange={e => { const x = +e.target.value; if (x > 0) onSet(Math.min(max, x)); }}
        onBlur={e => { e.target.value = +(+v).toFixed(2); }} />
      <span>năm</span>
    </label>
  );
}

function Dong({ n, children, id, cls }) {
  return <div className="bq-dong"><span>{n}</span><b id={id} className={cls}>{children}</b></div>;
}

function TheBeQuan({ m }) {
  const { HY } = PS;
  const In = PS.bqInfo(), maxY = Math.max(0.25, Math.floor(In.maxY * 4) / 4);
  const y = PS.clamp(m.y == null ? Math.min(1, maxY) : m.y, 0, maxY); m.y = y;
  const mx = Math.min(maxY, Math.max(5, Math.ceil(y)));
  const cn = PS.curNode(), B = PS.bqBits(y, In), cap = PS.bqCapY();
  const capP = cap != null && mx > 0 ? Math.min(100, cap / mx * 100) : 100;
  const sgLabel = PS.sgOn() && PS.sgGate() < PS.sgTh().length ? 'Tới đầy ' + (PS.lkOn() ? 'tầng' : 'kỳ') : null;
  const need = PS.bqNeedY();
  const datY = v => { PS.ACT.bqSet(v); PS.render(); };
  return (
    <KhungBeQuan m={m}>
      <ChonKieu tt={false} />
      <div className="bq-tg">
        <span className="bq-tgn">Bế quan trong</span>
        <NhapNam id="bqYn" v={y} max={maxY} onSet={datY} />
        <b id="bqY" className="bq-tgc">{y > 0 ? PS.durH(y * HY) : '0 tháng'}</b>
      </div>
      <ThanhTruot y={y} mx={mx} capP={capP} />
      <div className="hbtns">
        <button data-act="bqSet" data-arg="0.25">3 tháng</button>
        <button data-act="bqSet" data-arg="0.5" disabled={maxY < 0.5}>6 tháng</button>
        <button data-act="bqSet" data-arg="1" disabled={maxY < 1}>1 năm</button>
        <button data-act="bqSet" data-arg={Math.min(maxY, isFinite(need) ? need : maxY)} disabled={!!In.full || !isFinite(need)}>{sgLabel || 'Tới viên mãn'}</button>
      </div>
      <div className="bq-kq">
        <Dong n="Tu vi nhận được" id="bqG" cls="tu-c">{B.g}</Dong>
        <Dong n="Thọ nguyên còn lại sau đó" id="bqL" cls={B.lc}>{B.l}</Dong>
        <Dong n={sgLabel ? sgLabel + ' còn' : 'Tới viên mãn còn'} id="bqN">{B.n}</Dong>
        <Dong n="Nơi bế quan"><Html style={{ display: 'contents' }} h={PS.lkTag(cn)} /></Dong>
      </div>
      <p className={'bq-ll ' + B.sc} id="bqS">{B.s}</p>
      <p className="hint" id="bqHint">{B.h}</p>
      {y > 0 && y * 12 >= PS.ttLeftM() && <p className="bad"><b>Vượt thọ nguyên:</b> sẽ tọa hóa trước khi xuất quan.</p>}
      {!!m.warn && (
        <div className="bq-warn">
          <p><b>Lịch luyện không đủ</b></p>
          <p>Bế quan quá {PS.durH(cap * HY)} thì gần như không tăng thêm tu vi nữa. Nên ra ngoài lịch luyện trước.</p>
          <p>Vẫn tiếp tục bế quan {PS.durH(y * HY)}?</p>
          <div className="mb-f"><button className="btn" data-act="bqWarnX">Thôi</button><button className="btn pri" data-act="bqWarnOk">Xác nhận, tiếp tục</button></div>
        </div>
      )}
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" id="bqGoB" data-act="bqGo" disabled={!(y > 0 && !PS.bqFullNow())}>Nhập định</button></div>
    </KhungBeQuan>
  );
}

// Tĩnh toạ: giống bế quan (nhập số năm, kéo thanh trượt), tính bằng tháng
function TheTinhToa({ m }) {
  const left = PS.ttLeftM(), why = PS.ttWhy();
  const mx = Math.max(1, Math.min(PS.TT_MAXM, left + 1));
  const v = Math.max(1, Math.min(mx, m.tt || 3)); m.tt = v;
  const P = PS.ttPreview(v), s = PS.S(), r = PS.G.run;
  const datT = t => { m.tt = Math.max(1, Math.min(mx, Math.round(t))); PS.render(); };
  return (
    <KhungBeQuan m={m}>
      <ChonKieu tt />
      <div className="bq-tg">
        <span className="bq-tgn">Tĩnh toạ trong</span>
        <NhapNam id="ttYn" v={v / 12} max={mx / 12} onSet={x => datT(x * 12)} />
        <b className="bq-tgc">{PS.durH(v * PS.HM)}</b>
      </div>
      <input type="range" id="ttR" min="1" max={mx} step="1" value={v} onChange={e => datT(+e.target.value)} style={{ '--val': (v / mx * 100) + '%' }} />
      <div className="hbtns">
        {[[1, '1 tháng'], [3, '3 tháng'], [6, '6 tháng'], [12, '1 năm']].map(([t, n]) => <button key={t} onClick={() => datT(t)} disabled={t > mx}>{n}</button>)}
      </div>
      <div className="bq-kq">
        <Dong n="Khí huyết">+{P.hp} <small>({Math.round(r.hp)}/{s.maxHp})</small></Dong>
        {!PS.isPham() && <Dong n="Linh lực">+{P.mp}</Dong>}
        <Dong n="Tâm ma">−{P.tamma}</Dong>
        <Dong n="Thọ nguyên còn lại" cls={P.over ? 'bad' : ''}>{PS.durH(left * PS.HM)}</Dong>
      </div>
      <p className="hint">Hồi nhanh gấp {PS.TT_MUL} lần bình thường. Thời gian vẫn trôi.</p>
      {P.over && <p className="bad"><b>Vượt thọ nguyên:</b> sẽ tọa hóa trước khi xả toạ.</p>}
      {!!why && <p className="bad">{why}</p>}
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act="ttGo" data-arg={v} disabled={!!why}>{P.over ? 'Vẫn tĩnh toạ' : 'Tĩnh toạ'}</button></div>
    </KhungBeQuan>
  );
}

export function BeQuan({ m }) {
  if (!PS.G.run) return null;
  if (m.tab === 'tt') return <TheTinhToa m={m} />;
  if (m.tab === 'cg') return (
    <KhungBeQuan m={m} cls="cgbox">
      <Html style={{ display: 'contents' }} h={PS.cgTabHTML()} />
      <div className="mb-f"><span className="grow"></span><button className="btn" data-act="modalX">Đóng</button></div>
    </KhungBeQuan>
  );
  return <TheBeQuan m={m} />;
}
