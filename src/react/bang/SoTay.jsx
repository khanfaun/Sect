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

const Dong = ({ a, t }) => <p><span>{a}</span>{t}</p>;

export function SoTay() {
  const { G, UI } = PS;
  const r = G.run, w = PS.W(), TABS = ccCo() ? TABS0.concat([['cc', 'Cơ duyên']]) : TABS0;
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
  if (tab === 'chron') {
    const C = w.chron.slice().reverse();
    body = C.length ? <div className="logl">{C.map((l, i) => <Dong key={i} a={'năm ' + l.y} t={l.t} />)}</div> : <p className="empty">Thế gian còn yên ả.</p>;
  }
  return <Win title="Sổ tay" cls="tall"><Tabs k="journal" list={TABS} cur={tab} />{body}</Win>;
}

export function BangThienHa() {
  return <Win title="Thiên hạ" cls="tall"><ThienHa /></Win>;
}
