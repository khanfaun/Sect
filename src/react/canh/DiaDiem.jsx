// Cảnh đang ở trong một địa điểm: lời kể, nhiệm vụ, chuyện lớn, chuyện trước mắt, việc thường nhật theo nhóm.
import { Html, PS } from '../html';
import { Tranh } from '../html';
import { Chips, Cost, Ib, Ic, tip } from '../chung';
import { Card } from './Khung';
import { NoiChonViec } from './NoiChonViec';
import { anhCongTrinh } from '../giao-dien/cong-trinh';

// Một nút việc làm ở địa điểm
function NutViec({ a, n, num }) {
  const { G, UI, VENUE_N, PL_N, PNOW } = PS;
  const r = G.run, w = PS.W();
  const qa = a.a === 'quyan' && UI.confirm === 'quyan';
  let x;
  if (VENUE_N[a.a]) x = <span className="cx">{a.dis ? 'đang đóng cửa' : 'chọn việc'}</span>;
  else x = <>
    {!!a.x && !/^(💎|linh thạch )/.test(a.x) && <span className="cx">{String(a.x).replace(/✨/g, 'tu vi ').replace(/🌕/g, 'thành công ')}</span>}
    {!!a.h && !a.dis && a.a !== 'bt' && <span className="cx tm" {...tip('Thời gian sẽ trôi qua')}>{PS.durH(a.h)}</span>}
  </>;
  const cls = 'ch' + (a.a === 'bt' ? ' hl big' : PNOW.includes(a.a) ? ' big' : '') + (a.a === 'quyan' || a.dis ? ' soft' : '');
  const hot = VENUE_N[a.a] && n.vsp && n.vsp.k === r.kiep && n.vsp.v === a.a && n.vsp.until > w.t;
  const label = qa ? 'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc' : (PL_N[a.a] && a.l.length > PL_N[a.a].length + 6 ? PL_N[a.a] : a.l);
  return (
    <button className={cls} data-act="pact" data-arg={a.a} disabled={!!a.dis} {...tip(a.tip)}>
      <span className="cn">{num}.</span>
      {hot && <span className="ex" {...tip('Đang có chuyện đặc biệt, không chờ lâu')}>!</span>}
      <span className="ct">{label}</span>{x}
    </button>
  );
}

// Một công trình (toà nhà / vật) trên màn địa điểm: bấm = chọn việc đó (như chọn một mục trong bảng địa điểm cũ).
// Nơi chọn việc (trà lâu, khách điếm…) thì mở danh sách lựa chọn của nơi đó ở bảng dưới.
function CongTrinh({ a, n, nhom, on }) {
  const { G, VENUE_N, PL_N } = PS;
  const r = G.run, w = PS.W(), A = anhCongTrinh(a.a, nhom);
  const hot = VENUE_N[a.a] && n.vsp && n.vsp.k === r.kiep && n.vsp.v === a.a && n.vsp.until > w.t;
  const qa = a.a === 'quyan' && PS.UI.confirm === 'quyan';
  const ten = qa ? 'Chắc chắn gác kiếm? Kiếp này sẽ kết thúc' : PL_N[a.a] || VENUE_N[a.a] || a.l;
  const sub = VENUE_N[a.a] ? (a.dis ? 'đang đóng cửa' : '') : (a.h && !a.dis ? PS.durH(a.h) : '');
  return (
    <button className={'ct-b' + (A.nho ? ' nho' : '') + (on ? ' on' : '') + (a.dis ? ' dis' : '') + (a.a === 'quyan' ? ' soft' : '')} data-act="pact" data-arg={a.a} disabled={!!a.dis}
      data-anh={A.ten} {...tip((ten !== a.l ? a.l + '\n' : '') + (a.tip || ''))}>
      <span className="ct-i"><img src={A.src} alt="" draggable="false" /></span>
      {hot && <span className="ex" {...tip('Đang có chuyện đặc biệt, không chờ lâu')}>!</span>}
      <span className="ct-n">{ten}</span>{sub && <small className="ct-s">{sub}</small>}
    </button>
  );
}

// Ghi lại lịch sử: mỗi lần chọn một việc, giữ lựa chọn và kết quả (giống hộp thoại sự kiện).
// Chạy một lần mỗi lần vẽ, như bản cũ.
function ghiLichSu(sc) {
  const UI = PS.UI;
  sc.hist = sc.hist || [];
  if ((sc.msg && sc.msg.length) || (sc.chips && sc.chips.length)) {
    const key = (sc.seq || 0) + JSON.stringify(sc.msg) + JSON.stringify((sc.chips || []).map(c => c.t));
    if (sc.histK !== key) { sc.hist.push({ q: UI.lastQ || null, m: sc.msg.slice(), c: (sc.chips || []).slice() }); sc.histK = key; if (sc.hist.length > 12) sc.hist.shift(); }
  }
  UI.lastQ = null;
}

function LoiKe({ sc }) {
  const tm = !!PS.UI.descHide, HL = tm ? sc.hist.slice(-1) : sc.hist;
  return (
    <div className={'pl-talkw' + (tm ? ' min' : '')}>
      <button className="pl-tg2" data-act="descTg" {...tip(tm ? 'Mở rộng hội thoại' : 'Thu gọn hội thoại: chỉ giữ diễn biến mới nhất')} aria-label={tm ? 'Mở rộng' : 'Thu gọn'}><Ic n={tm ? 'down' : 'up'} /></button>
      <div className="pl-talk" id="plTalk" data-n={sc.hist.length}>
        <div className="story">
          {!(tm && HL.length) && <Html as="p" h={PS.txt(sc.intro)} />}
          {HL.map((h, i) => [
            h.q ? <div key={'q' + i} className="ev-q"><p className="ev-c">› {h.q}</p>{h.m.map((m, j) => <Html as="p" key={j} h={PS.txt(m)} />)}</div>
              : h.m.map((m, j) => <Html as="p" key={i + '-' + j} h={PS.txt(m)} />),
            <Chips key={'c' + i} list={h.c} />,
          ])}
        </div>
      </div>
    </div>
  );
}

export function DiaDiem({ sc }) {
  const { G, ASSET, PGROUP, GRP_IC, PNOW, VENUE_N, ENT_T, EVMAP } = PS;
  const r = G.run, n = PS.nodeById(sc.id), w = PS.W();
  const acts = PS.placeActs(n).filter(a => !['bq1', 'bq3', 'explore', 'xk', 'bt'].includes(a.a));
  const by = k => acts.find(a => a.a === k);
  let k = 0;
  ghiLichSu(sc);
  const ents = PS.entsHere(r.region).filter(e => e.to == null && e.at === n.id);
  const qs = r.quests.filter(q => q.state === 'open' && q.node === n.id);
  const big = PNOW.map(by).filter(Boolean);
  const evs = PS.nodeEvs(n);
  const groups = PGROUP.map(([name, ks]) => [name, ks.map(by).filter(Boolean)]).filter(([, L]) => L.length);
  const M = PS.placeMeta(n), dg = PS.dangerTag(n);
  // đánh số theo đúng thứ tự hiện trên màn hình (giống bản cũ)
  const num = () => ++k;
  const bigBtns = big.map(a => <NutViec key={a.a} a={a} n={n} num={num()} />);
  const entBtns = ents.map(e => (
    <button key={e.id} className="ch big" data-act="meet" data-arg={e.id} {...tip(ENT_T[e.type].n + ' đang dừng chân ở đây.\nChạm để tới gặp. Họ sẽ rời đi sau ' + PS.durH(Math.max(1, e.until - w.t)) + '.')}>
      <span className="cn">{num()}.</span><span className="ct">Gặp {e.name}</span><span className="cx">{ENT_T[e.type].n.toLowerCase()}</span>
    </button>
  ));
  const evBtns = evs.map((id, i) => (
    <button key={i} className="ch now" data-act="evGo" data-arg={i} {...tip('Chạm để dính vào chuyện này. Tốn 2 giờ.')}>
      <span className="cn">{num()}.</span><span className="ex">!</span><span className="ct">{EVMAP[id].n || 'Một chuyện lạ'}</span>
    </button>
  ));
  const pimg = ASSET.place[n.type] || ASSET.place[(PS.NEWT[n.type] || {}).as];
  const ctrinh = groups.flatMap(([name, L]) => L.map(a => <CongTrinh key={a.a} a={a} n={n} nhom={name} on={sc.venue === a.a} />));
  const specials = qs.length + big.length + ents.length + evs.length;
  return (
    <section className="scard tall place pl-home" data-n={ctrinh.length}>
      <div className="pl-nen">{pimg ? <img src={pimg} alt="" /> : <Tranh seed={n.name} reg={r.region} type={n.type} cls="strip" />}</div>
      <header className="sc-h pl-top">
        <h2>{n.name}</h2>
        <button className="xb sc-x" data-act="leave" {...tip('Đóng, rời khỏi nơi này')} aria-label="Đóng"><Ic n="close" /></button>
        <div className="pl-meta">
          <span className={'nc-g dg' + dg} {...tip(PS.dangerWhy(n))}><i></i>{PS.DTAG[dg]}</span>
          <span>{PS.capS(PS.TYPE_NAME[n.type])}</span><span>{PS.REG[r.region].n}</span>
          <span>Linh khí {PS.LK_N[PS.lkOf(n)].toLowerCase()}</span>
        </div>
        {M && <div className="pl-kv"><div><small>Tọa trấn</small><span>{M.luc}</span></div><div><small>Quy mô</small><span>{M.quy}</span></div>{PS.SETTLE.includes(n.type) && <div><small>Danh tiếng nơi này</small><span>{PS.danhName(n)}</span></div>}</div>}
      </header>
      <div className="pl-pho">
        {ctrinh.length ? <div className="pl-ct">{ctrinh}</div> : <p className="hint pl-trong">Nơi này không có công trình nào để vào.</p>}
      </div>
      <div className={'pl-pan' + (sc.venue ? ' vn' : '')}>
        {sc.venue && VENUE_N[sc.venue] && <NoiChonViec n={n} v={sc.venue} />}
        <LoiKe sc={sc} />
        {qs.length > 0 && <>
          <h3 className="grp big"><Ib n="scroll" c="gold" />Nhiệm vụ</h3>
          <div className="choices">
            {qs.map(q => (
              <button key={q.id} className="ch qrow qdo" data-act="qDo" data-arg={q.id} style={{ '--pc': PS.qpc(PS.questGrade(q)).replace(/^--pc:/, '') }}>
                <span className="ct">{q.kind === 'den' ? 'Giao tận tay' : 'Lùng tìm mục tiêu'} · {q.text}</span>
                <span className="qmeta"><span className="qgr">{PS.QGRADE[PS.questGrade(q)]}</span><Cost h={q.kind === 'den' ? 1 : 2} st={0} /></span>
              </button>
            ))}
          </div>
        </>}
        {(big.length > 0 || ents.length > 0) && <>
          <h3 className="grp big"><Ib n="flag" c="gold" />Chuyện lớn</h3>
          <div className="choices">{bigBtns}{entBtns}</div>
        </>}
        {evs.length > 0 && <>
          <h3 className="grp now"><Ib n="bell" c="seal" />Trước mắt<i {...tip('Những chuyện này không chờ ai. Bỏ mặc lâu thì tự mất.')}>biến mất sau chừng {Math.max(1, Math.round((n.evs.until - w.t) / PS.HY))} năm</i></h3>
          <div className="choices">{evBtns}</div>
        </>}
        {!sc.venue && !specials && <p className="hint pl-goi">Chạm vào một công trình để vào.</p>}
      </div>
      <footer className="sc-f">
        {n.type !== 'ai' && <button className="btn" data-act="exStat" {...tip('Xem nơi này có gì: yêu ma, vật liệu, tỉ lệ')}>Thăm dò</button>}
        <span className="grow"></span><button className="btn" data-act="leave">Rời đi</button>
      </footer>
    </section>
  );
}
