// Quan ải, kết quả đột phá, bảng treo thưởng, chôn đồ.
import { Html, PS } from '../html';
import { Chips, Ic, pcs, tip } from '../chung';
import { Card, ChoiceBtn, GoBtn } from './Khung';

export function QuanAi({ sc }) {
  const r = PS.G.run;
  let k = 1;
  return (
    <Card title={'Quan ải → ' + PS.REG[sc.k].n} sub={r.place.n} foot={<GoBtn act="next" label="Quay lại" arg="" cls="" />}>
      <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} /><p className="hint">Qua ải mất khoảng {PS.CROSS_M[sc.k]} tháng đường.</p></div>
      <div className="choices">
        {PS.passOpts().map(o => (
          <ChoiceBtn key={o.a} n={(k++) + '.'} act="pass" arg={o.a} label={o.l} dis={!o.ok} t={o.tip}
            extra={o.x ? <Html className="cx" h={PS.emoTxt(PS.esc(String(o.x)))} /> : null} />
        ))}
      </div>
    </Card>
  );
}

export function KetQuaDotPha({ sc }) {
  const r = PS.G.run;
  const more = r.bt && !sc.done && r.bt.si < r.bt.stages.length;
  let hint = null;
  if (more) { const st = r.bt.stages[r.bt.si]; hint = st === 'tamma' ? 'Tâm ma kiếp: đánh một trận với chính mình.' : PS.stageName(st) + ': ' + PS.KIEP[st.kind || 'loi'].d + ' Gục là chết thật.'; }
  return (
    <Card title={sc.ok ? 'Đột phá' : 'Thất bại'} sub={r.place.n} foot={<GoBtn act="btGo" label={more ? 'Nghênh kiếp' : 'Tiếp tục'} />}>
      <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} /></div>
      <Chips list={sc.chips} />
      {hint && <p className="hint">{hint}</p>}
    </Card>
  );
}

export function BangTreoThuong({ sc }) {
  const { G, UI } = PS;
  const r = G.run, n = PS.nodeById(sc.id), now = PS.W().t;
  const open = r.quests.filter(q => q.state === 'open').length;
  const mine = r.quests.filter(q => q.state === 'open' && q.from === n.id);
  UI.qOpen = UI.qOpen || {};
  return (
    <Card title="Bảng treo thưởng" sub={n.name} x
      foot={<><button className="btn" data-act="next">Quay lại</button><span className="grow"></span><button className="btn pri" data-act="openJournal"><Ic n="book" /> Sổ tay</button></>}>
      <div className="story">
        <p>Mấy tờ cáo thị dán chồng lên nhau, giấy đã ngả vàng. Nhận việc thì phải xong trước hạn, thất hứa thì mang tiếng.</p>
        <p className="hint">Bảng thay việc mới sau {PS.durH(PS.boardLeft(n))}.</p>
      </div>
      <div className="choices">
        {n.board.list.map((q, i) => {
          const g = PS.questGrade(q), exp = q.acc && now > q.acc, dis = q.taken || open >= 3 || exp;
          return (
            <div key={i} role="button" className={'ch qrow' + (dis ? ' qdis' : '') + (g >= 5 ? ' q5' : '')} data-act={dis ? undefined : 'quest'} data-arg={dis ? undefined : i}
              style={{ '--pc': PS.qpc(g).replace(/^--pc:/, '') }} {...tip(q.kind === 'diet' ? 'Tới nơi rồi lùng tìm, đánh hạ mục tiêu' : 'Tới nơi rồi giao tận tay')}>
              <span className="ct">{q.text}</span>
              <span className="qmeta">
                <span className="qgr">{PS.QGRADE[g]}</span>
                {!!q.special && <span className="qsp">Đặc biệt</span>}
                <span className="qdl" {...tip('Thời gian để làm xong, tính từ lúc nhận')}>làm trong {PS.durH(q.days * PS.HD)}</span>
                {!!q.acc && !q.taken && <span className={'qdl' + (exp ? '' : ' hot')} {...tip('Phải nhận trước hạn này')}>{exp ? 'hết hạn nhận' : 'hạn nhận còn ' + PS.durH(q.acc - now)}</span>}
                {q.cancelled ? <span className="qtk">đã hủy, không nhận lại được</span> : q.taken ? <span className="qtk">đã nhận</span> : null}
              </span>
              <span className="qrw"><Chips list={q.taken ? PS.questRewardChips(q) : PS.questRewardChipsHidden(q)} /></span>
            </div>
          );
        })}
      </div>
      <p className="hint">Đang nhận {open}/3 việc.</p>
      {mine.length > 0 && <>
        <h4 className="sgrp">Việc đã nhận ở đây</h4>
        <Html as="div" className="rows" h={mine.map(q => PS.questCardHTML(q)).join('')} />
      </>}
    </Card>
  );
}

export function ChonDo({ sc }) {
  const r = PS.G.run, n = PS.nodeById(sc.id), PILL = PS.PILL;
  return (
    <Card title="Chôn đồ" sub={n.name} cls="tall"
      foot={<><button className="btn" data-act="next">Thôi</button><span className="grow"></span><button className="btn pri" data-act="buryGo" disabled={!sc.sel.length}>Chôn</button></>}>
      <div className="story"><p>Chọn tối đa ba món. Kiếp sau tới đúng chỗ này, thăm dò sẽ tìm thấy.</p></div>
      <div className="rows">
        {r.relics.map((x, i) => (
          <button key={'r' + i} className={'row prow' + (sc.sel.includes('r' + i) ? ' taken' : '')} data-act="bsel" data-arg={'r' + i} style={pcs(x.tier)} {...tip(PS.relicTip(x))}>
            <Html className="qi" h={PS.relIcon(x)} /><span className="r-t"><b className="qt">{x.name}</b><small>{PS.GRADE[x.tier]}</small></span>
          </button>
        ))}
        {r.pills.map((x, i) => (
          <button key={'p' + i} className={'row' + (sc.sel.includes('p' + i) ? ' taken' : '')} data-act="bsel" data-arg={'p' + i} {...tip(PS.pillTip(x.id, x.q))}>
            <Html className="r-i" h={PILL[x.id].i} /><span className="r-t"><b>{PILL[x.id].n}</b></span>
          </button>
        ))}
      </div>
    </Card>
  );
}
