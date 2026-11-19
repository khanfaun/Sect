// Sổ tay: nhiệm vụ, chuyện đời này, thiên hạ (các chuyện đang xảy ra), tin đồn, biên niên thế giới.
import { Html, PS } from '../html';
import { Tabs } from '../chung';
import { Win } from './Khung';
import { TheNhiemVu } from '../chung/TheNhiemVu';

const TABS0 = [['quest', 'Nhiệm vụ'], ['log', 'Đời này'], ['aff', 'Thiên hạ'], ['news', 'Tin đồn'], ['nq', 'Nghiệp duyên'], ['chron', 'Biên niên']];
// Thẻ "Cơ duyên" (Đ6 cải căn) chỉ hiện khi đã nghe dấu vết hoặc đang lần theo
const ccCo = () => { const v = PS.ccView && PS.ccView(); return !!v && (v.act || v.heard.length || v.ok); };

// Cơ duyên: đường cải căn đang lần theo, bước hiện tại và lời gợi ý; các dấu vết đã nghe
function CoDuyen() {
  const v = PS.ccView(), T = PS.contentText;
  return <div className="cc-so">
    {v.ok && <p className="hint">{T('cc.vOk')}</p>}
    {v.act && <><h4>{T('cc.vHead')}</h4>
      <div className="row cc-act"><span className="r-i">🌱</span><span className="r-t"><b>{v.act.n}</b><small>{v.act.noi} · {v.act.buoc}</small><small>{v.act.goi}</small></span></div></>}
    {v.vt.length > 0 && <><h4>{T('cc.vVt')}</h4><p>{v.vt.map(x => x.n + ' ×' + x.k).join(', ')}</p></>}
    <h4>{T('cc.vNghe')}</h4>
    {v.heard.length ? <div className="rows">{v.heard.map(x => <div key={x.id} className="row cc-nghe"><span className="r-t"><b>{x.n}</b><small>{x.noi} · {x.t}</small></span></div>)}</div> : <p className="empty">{T('cc.vRong')}</p>}
  </div>;
}

// Danh sách chuyện thiên hạ, lọc theo loại; chạm một dòng để xem trên bản đồ
export function ThienHa() {
  const { UI, AFF_CAT } = PS;
  const L = PS.affairs(), f = UI.filter || 'all';
  const cnt = k => k === 'all' ? L.length : L.filter(x => x.cat === k).length;
  const M = L.filter(x => f === 'all' || x.cat === f);
  const loc = PS.ddSel('affCat', 'Loại tin', Object.keys(AFF_CAT).map(k => ({ v: k, h: PS.esc(AFF_CAT[k]) + ` <small>${cnt(k)}</small>` })), f);
  return <>
    <Html as="div" className="bfil one" h={loc} />
    {M.length ? <>
      <div className="rows">
        {M.map((x, i) => (
          <button key={i} className="row" data-act="affGo" data-arg={x.x != null ? Math.round(x.x) + ',' + Math.round(x.y) + ',' + (x.node != null ? x.node : '') : ''} disabled={x.x == null}>
            <span className="r-i">{x.i}</span>
            <span className="r-t"><b>{x.n}</b><small>{x.sub}{x.old ? ' · nghe ' + PS.durH(x.old) + ' trước' : ''}</small></span>
            <span className="r-x">{x.left != null ? 'còn chừng ' + PS.durH(Math.max(1, x.left)) : ''}</span>
          </button>
        ))}
      </div>
      <p className="hint">Chạm một dòng để xem chỗ đó trên bản đồ. Chỉ hiện những chuyện ngươi tự thấy hoặc đã nghe tin.</p>
    </> : <p className="empty">Chưa nghe ngóng được gì. Ghé trà lâu, hoặc đi xa hơn.</p>}
  </>;
}

// Sửa-J câu 44: thẻ "Mệnh thư" — tuyến đang đi, mốc hiện tại, hạn bằng chữ, mở lại lời mời chưa trả lời
function MenhThu() {
  const T = PS.contentText, L = (PS.tuyenView && PS.tuyenView()) || [];
  if (!L.length) return <p className="empty">{T('ty.rong')}</p>;
  return <div className="rows menh-thu">{L.map(x => (
    <div key={x.id} className="row ty-the">
      <span className="r-i">📜</span>
      <span className="r-t"><b>{x.ten}</b>
        {x.ket ? <small>{x.ket}</small> : <small>{[x.nut, x.noi, x.han, x.cho ? T('ty.choTraLoi') : ''].filter(Boolean).join(' · ')}</small>}
        {x.moNo && <small className="no">{x.moNo}</small>}
      </span>
      {x.moLai ? <button className="btn sm pri" data-act="tyMoLai" data-arg={x.id}>{T('ty.moLaiNut')}</button> : null}
    </div>))}</div>;
}

// Đ9 (câu 40): người đã gặp — tên hiện tại của vai, nơi, thiện cảm bằng chữ, còn sống / đã mất, người kế
function NguoiDaGap() {
  const T = PS.contentText, L = (PS.soVaiView && PS.soVaiView()) || [];
  if (!L.length) return <p className="empty so-ng">{T('so.vRong')}</p>;
  return <div className="rows so-ng">{L.map(x => (
    <div key={x.ma} className={'row so-vai' + (x.song ? '' : ' mat')}>
      <span className="r-i">{x.song ? '👤' : '🕯️'}</span>
      <span className="r-t"><b>{x.ten}</b>
        <small>{[x.vai, x.noi, x.tinh, x.qh].filter(Boolean).join(' · ')}</small>
        {x.ke && <small>{x.ke}</small>}
        <small className="dim">{x.gap}</small>
      </span>
    </div>))}</div>;
}

// Đ9 (câu 40): mười thế lực — tình trạng bằng chữ, người đứng đầu, quan hệ / danh tiếng với mình, sổ cống hiến
function TheLuc() {
  const T = PS.contentText, L = (PS.soFaView && PS.soFaView()) || [];
  return <div className="rows so-fa">{L.map(x => (
    <div key={x.id} className={'row so-the-luc' + (x.diet ? ' mat' : '')}>
      <span className="r-i">🏯</span>
      <span className="r-t"><b>{x.n}</b>
        <small>{[x.noi, x.trang, x.chu ? T('so.faChu', [x.chu]) : T('so.faKhongChu')].join(' · ')}</small>
        <small>{[x.qh, x.danh ? T('so.faDanh', [x.danh]) : '', x.cong].filter(Boolean).join(' · ')}</small>
      </span>
    </div>))}</div>;
}

const Dong = ({ a, t }) => <p><span>{a}</span>{t}</p>;

export function SoTay() {
  const { G, UI } = PS;
  const r = G.run, w = PS.W();
  // Đ8: Sử lược (chuyện lớn của thế giới, kể cả khi người chơi vắng mặt) — chỉ hiện khi đã có
  const TY = (PS.tuyenView && PS.tuyenView()) || [];
  const TABS = TABS0.concat(TY.length ? [['ty', PS.contentText('ty.the')]] : [], [['ng', PS.contentText('so.theNg')], ['fa', PS.contentText('so.theFa')]], ccCo() ? [['cc', 'Cơ duyên']] : [], (w.suLuoc || []).length ? [['su', 'Sử lược']] : []);
  let tab = UI.tab.journal || 'quest'; if (!TABS.some(t => t[0] === tab)) tab = 'quest';
  let body = null;
  if (tab === 'aff') body = <ThienHa />;
  if (tab === 'log') body = <div className="logl">{r.log.slice().reverse().map((l, i) => <Dong key={i} a={l.a + ' tuổi'} t={l.t} />)}</div>;
  if (tab === 'quest') {
    const L = r.quests.slice().reverse(); UI.qOpen = UI.qOpen || {};
    body = L.length ? <div className="rows">{L.map(q => <TheNhiemVu key={q.id} q={q} />)}</div> : <p className="empty">Chưa nhận nhiệm vụ nào. Tìm bảng treo thưởng ở thôn trấn.</p>;
  }
  if (tab === 'news') body = (
    <div className="logl">
      {r.news.length ? r.news.slice().reverse().map((l, i) => <Dong key={i} a={l.a + ' tuổi'} t={l.t} />) : <p className="empty">Chưa nghe được gì. Ghé trà lâu mà hỏi.</p>}
    </div>
  );
  if (tab === 'nq') {
    const L = PS.nqSo(80);
    body = L.length ? <div className="logl nq-so">{L.map((l, i) => <Dong key={i} a={l.y + ' tuổi'} t={l.t + ' — ' + l.k} />)}</div> : <p className="empty">Sổ còn trắng. Chưa có ai mang ơn, cũng chưa ai mang oán.</p>;
  }
  if (tab === 'cc') body = <CoDuyen />;
  if (tab === 'ty') body = <MenhThu />;
  if (tab === 'ng') body = <NguoiDaGap />;
  if (tab === 'fa') body = <TheLuc />;
  if (tab === 'su') {
    const C = (w.suLuoc || []).slice().reverse(), A = (PS.clkView && PS.clkView()) || [];
    body = <div className="su-luoc">
      {A.length > 0 && <><h4>Đang diễn ra</h4><div className="rows">{A.map(x => <div key={x.id} className="row"><span className="r-t"><b>{x.n}</b><small>{x.giai}</small></span></div>)}</div></>}
      <div className="logl">{C.map((l, i) => <Dong key={i} a={l.k === 'gop' ? 'thế kỷ' : 'năm ' + l.y} t={l.t} />)}</div>
    </div>;
  }
  if (tab === 'chron') {
    const C = w.chron.slice().reverse();
    body = C.length ? <div className="logl">{C.map((l, i) => <Dong key={i} a={'năm ' + l.y} t={l.t} />)}</div> : <p className="empty">Thế gian còn yên ả.</p>;
  }
  return <Win title="Sổ tay" cls="tall"><Tabs k="journal" list={TABS} cur={tab} />{body}</Win>;
}

export function BangThienHa() {
  return <Win title="Thiên hạ" cls="tall"><ThienHa /></Win>;
}
