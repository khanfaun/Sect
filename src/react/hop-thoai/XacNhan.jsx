// Hộp thoại xác nhận trước khi làm một việc: tốn gì, được gì. Gồm việc ở địa điểm, ở trà lâu/khách điếm,
// làm nhiệm vụ, hủy nhiệm vụ.
import { PS } from '../html';
import { Chips, Cost, Ic, tip } from '../chung';

// Biểu tượng phần nhận được: chỉ biểu tượng và con số (giống gainHTML())
export function NhanDuoc({ g }) {
  if (!g) return null;
  const S = PS.S(), L = [];
  if (g.hp > 0) L.push(['heart', 'hp', '+' + Math.max(1, Math.round(g.hp / Math.max(1, S.maxHp) * 100)) + '%', 'Khí huyết']);
  if (g.hpTxt) L.push(['heart', 'hp', g.hpTxt, 'Khí huyết']);
  if (g.mp > 0) L.push(['drop', 'mp', '+' + Math.max(1, Math.round(g.mp / Math.max(1, S.maxMp) * 100)) + '%', 'Linh lực']);
  if (g.mpTxt) L.push(['drop', 'mp', g.mpTxt, 'Linh lực']);
  if (g.tamma) L.push(['skull', 'tm', g.tamma > 0 ? '▲' : '▼', 'Tâm ma']);
  if (g.tmTxt) L.push(['skull', 'tm', g.tmTxt, 'Tâm ma']);
  if (g.tv) L.push(['spark', 'tv', '+' + Math.max(1, Math.round(PS.lkShowGain(PS.tvGain(g.tv)))) + '%', 'Tu vi']);
  if (g.ll) L.push(['sword', 'll', '+' + Math.max(1, Math.round(g.ll * (typeof PS.LL_MUL === 'number' ? PS.LL_MUL : 1))) + '%', 'Lịch luyện']);
  if (g.st) L.push(['rh', 'st', '+' + g.st, 'Linh thạch']);
  if (g.info) L.push(['eye', 'in', 'tin tức', 'Biết thêm nơi chốn, tin giang hồ']);
  if (g.txt) L.push(['star', 'in', g.txt, '']);
  return (
    <div className="gains">
      {L.map(([i, c, t, tp], k) => <span key={k} className={'gn ' + c} {...tip(tp)}>{i === 'rh' ? <i className="rh"></i> : <Ic n={i} />}{t}</span>)}
    </div>
  );
}

function KhungXacNhan({ title, d, h, st, g, act, arg }) {
  return (
    <div className="mbox pconf">
      <h3>{title}</h3><p>{d}</p>
      {(h || st) ? <div className="pc-row"><small>Tốn</small><span className="cost"><Cost h={h} st={st} /></span></div> : null}
      {g && <div className="pc-row"><small>Nhận được</small><NhanDuoc g={g} /></div>}
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act={act} data-arg={arg}>Đồng ý</button></div>
    </div>
  );
}

export function XacNhanViec({ m }) {
  const r = PS.G.run;
  if (!r || !r.scene) return null;
  const n = PS.nodeById(r.scene.id), a = PS.placeActs(n).find(x => x.a === m.a);
  if (!a) return null;
  const I = PS.PA_INFO[m.a] || { d: a.tip || '' }, g = typeof I.g === 'function' ? I.g() : I.g;
  return <KhungXacNhan title={PS.PL_N[m.a] || a.l} d={I.d} h={a.h} st={0} g={g} act="pactGo" arg={m.a} />;
}

export function XacNhanNoiChon({ m }) {
  const r = PS.G.run;
  if (!r || !r.scene) return null;
  const n = PS.nodeById(r.scene.id), o = PS.venueOpts(n, m.v).find(x => x.id === m.id);
  if (!o) return null;
  if (m.k === 'vreq') return (
    <div className="mbox pconf">
      <h3>{o.l}</h3><p>{o.d}</p>
      <div className="pc-row bad"><small>Chưa đủ</small><span>{o.lack || o.no}</span></div>
      <div className="mb-f"><button className="btn pri" data-act="modalX">Đã hiểu</button></div>
    </div>
  );
  return <KhungXacNhan title={o.l} d={o.d} h={o.h} st={o.st} g={o.fight ? { st: o.g.st, txt: 'phải đánh một trận' } : o.g} act="vgo" arg={m.v + ':' + m.id} />;
}

export function LamNhiemVu({ m }) {
  const r = PS.G.run, q = r && r.quests.find(x => x.id === m.id);
  if (!q) return null;
  const den = q.kind === 'den';
  return (
    <div className="mbox pconf">
      <h3>{den ? 'Giao tận tay' : 'Lùng tìm mục tiêu'}</h3>
      <p>{q.text}.</p>
      <p>{den ? 'Tìm đúng người nhận, trao tận tay rồi lấy tiền công.' : 'Lần theo dấu vết trong tờ cáo thị. Tìm ra thì phải đánh một trận. Thắng thì xong việc; thua hoặc bỏ chạy thì nhiệm vụ thất bại.'}</p>
      <div className="pc-row"><small>Tốn</small><span className="cost"><Cost h={den ? 1 : 2} st={0} /></span></div>
      <div className="pc-row"><small>Nhận được</small><span className="qrw"><Chips list={PS.questRewardChips(q)} /></span></div>
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act="qDoGo" data-arg={q.id}>{den ? 'Giao' : 'Đi tìm'}</button></div>
    </div>
  );
}

export function HuyNhiemVu({ m }) {
  const r = PS.G.run, q = r && r.quests.find(x => x.id === m.id);
  if (!q) return null;
  const P = PS.questPenalty(q);
  return (
    <div className="mbox pconf">
      <h3>Hủy nhiệm vụ?</h3><p>{q.text}</p>
      <p>Đã nhận lời thì phải giữ chữ tín. Bỏ ngang thì phải đền một nửa tiền thưởng và mang tiếng thất hứa.</p>
      <div className="pc-row"><small>Bị phạt</small><span className="gains"><span className="gn st"><i className="rh"></i>−{P.st}</span><span className="gn in">nhân quả {P.karma}</span></span></div>
      <div className="mb-f"><button className="btn" data-act="modalX">Thôi</button><button className="btn pri" data-act="qDropGo" data-arg={q.id}>Hủy nhiệm vụ</button></div>
    </div>
  );
}
