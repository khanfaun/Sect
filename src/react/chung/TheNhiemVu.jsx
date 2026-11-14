// Thẻ một nhiệm vụ (sổ tay, bảng treo thưởng): mở rộng xem chi tiết, dẫn đường, hủy.
import { PS } from '../html';
import { Chips, Ic, tip } from './index';

export function TheNhiemVu({ q }) {
  const { UI, QGRADE } = PS;
  const w = PS.W(), g = PS.questGrade(q), op = q.state === 'open', ex = UI.qOpen[q.id];
  const tg = PS.nodeById(q.node), fn = PS.nodeById(q.from), pen = PS.questPenalty(q);
  return (
    <div className={'qcard' + (op ? '' : ' dim') + (g >= 5 ? ' q5' : '')} style={{ '--pc': PS.qpc(g).replace(/^--pc:/, '') }}>
      <div className="qc-h">
        <span className="r-i"><Ic n={q.state === 'done' ? 'check' : q.state === 'fail' ? 'close' : 'hour'} /></span>
        <span className="r-t"><b>{q.text}</b><small><span className="qgr">{QGRADE[g]}</span> · {op ? 'còn ' + PS.durH(Math.max(0, q.due - w.t)) : q.state === 'done' ? 'đã xong' : q.dropped ? 'đã trả lại' : 'thất hứa'}</small></span>
        <span className="qc-b">
          <button className="icb" data-act="qExp" data-arg={q.id} {...tip(ex ? 'Thu gọn' : 'Xem thêm')}><Ic n={ex ? 'up' : 'down'} /></button>
          {op && <>
            <button className="icb" data-act="qNav" data-arg={q.id} {...tip('Dẫn đường: đưa bản đồ tới nơi cần tới')}><Ic n="target" /></button>
            <button className="icb" data-act="qDrop" data-arg={q.id} {...tip('Hủy nhiệm vụ')}><Ic n="trash" /></button>
          </>}
        </span>
      </div>
      {ex && (
        <div className="qc-d">
          <p>{q.d || (q.kind === 'diet' ? 'Tới nơi, vào mục Nhiệm vụ trong địa điểm để lùng tìm và hạ mục tiêu.' : 'Tới nơi, vào mục Nhiệm vụ trong địa điểm để giao tận tay.')}</p>
          <div className="kv">
            <div><span>Nơi tới</span><b>{tg && tg.fog >= 1 ? tg.name : 'chưa rõ'}</b></div>
            <div><span>Nhận ở</span><b>{fn ? fn.name : ''}</b></div>
            <div className="qrw-row"><span>Phần thưởng</span><b className="qrw"><Chips list={PS.questRewardChips(q)} /></b></div>
            <div><span>Hủy thì phạt</span><b className="bad">mất {pen.st} linh thạch, nhân quả {pen.karma}</b></div>
          </div>
        </div>
      )}
    </div>
  );
}
