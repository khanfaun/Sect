// Các mảnh dùng chung cho mọi cảnh hiện đè lên bản đồ: khung thẻ, lời kể, nút lựa chọn.
import { Html, PS } from '../html';
import { Ic, Stone, tip } from '../chung';

// Khung thẻ cảnh: tiêu đề, phụ đề, thân, chân. x: nút đóng hẳn về bản đồ.
export function Card({ title, sub, cls, art, head, x, foot, children }) {
  return (
    <section className={'scard ' + (cls || '')}>
      {art}
      <header className="sc-h">
        <h2>{title}</h2>
        {sub && <small>{sub}</small>}
        {head}
        {x && <button className="xb sc-x" data-act="closeAll" aria-label="Đóng" {...tip('Đóng hẳn, về bản đồ')}><Ic n="close" /></button>}
      </header>
      <div className="sc-b">{children}</div>
      {foot && <footer className="sc-f">{foot}</footer>}
    </section>
  );
}

export function GoBtn({ act, label, arg, cls }) {
  return <button className={'btn ' + (cls || 'pri') + ' wide'} data-act={act} data-arg={arg}>{label}</button>;
}

// Nút lựa chọn đánh số: n là số thứ tự (hoặc HTML con dấu), label là chữ (hoặc nút React)
export function ChoiceBtn({ n, act, arg, label, extra, dis, cls, t }) {
  return (
    <button className={'ch' + (cls ? ' ' + cls : '')} data-act={act} data-arg={arg} disabled={!!dis} {...tip(t)}>
      {typeof n === 'string' && n.startsWith('<') ? <Html className="cn" h={n} /> : <span className="cn">{n}</span>}
      <span className="ct">{label}</span>
      {extra}
    </button>
  );
}

// Phần chú thích bên phải lựa chọn: tốn linh thạch / linh lực / khí huyết, có giao chiến
export function ChoiceExtra({ c }) {
  const r = PS.G.run, out = [];
  if (c.cost) {
    if (c.cost.st) { const v = Math.round(c.cost.st * PS.SC[r.region]); out.push(<span key="st" className={'cx' + (r.st < v ? ' no' : '')} {...tip('Tốn linh thạch')}><Stone v={v} /></span>); }
    if (c.cost.mp) out.push(<span key="mp" className="cx" {...tip('Tốn linh lực')}>linh lực {c.cost.mp}</span>);
    if (c.cost.hp) out.push(<span key="hp" className="cx" {...tip('Tốn khí huyết')}>khí huyết {c.cost.hp}</span>);
  }
  if (c.fight) out.push(<span key="f" className="cx" {...tip('Sẽ phải giao chiến' + (c.fight.spar ? ' (luận võ, thua không chết)' : ''))}>giao chiến</span>);
  return out;
}

// Lời kể: đoạn cũ mờ đi, đoạn mới hiện dần; câu hỏi của người chơi in nghiêng
export function Story({ story }) {
  const UI = PS.UI;
  return story.map((x, i) => {
    const old = i < story.length - 1 ? ' old' : '', neu = i >= UI.lastStory ? ' new' : '';
    if (typeof x === 'object') return <p key={i} className={'q' + old}>{x.q}</p>;
    return <Html as="p" key={i} className={old + neu} h={PS.txt(x)} />;
  });
}

// Một dòng kẻ địch: ảnh, tên, hệ, mô tả ngắn
export function FoeLine({ en, big, sub }) {
  return (
    <div className={'foe-l' + (big ? ' big' : '')}>
      <Html className="foe-i" h={big ? PS.assetImg('foe', '_boss', en.i) : PS.assetImg('foe', en.k || en.n, en.i)} />
      <div><b>{en.n}</b>{big ? <small>{sub}</small> : <Html as="small" h={PS.elSeal(en.el) + ' ' + PS.esc(en.sub || '')} />}</div>
    </div>
  );
}
