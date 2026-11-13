// Chạm trán kẻ địch ngoài đường, và sào huyệt thủ lĩnh vùng.
import { Html, PS } from '../html';
import { Chips, Stone, tip } from '../chung';
import { Card, ChoiceBtn, FoeLine, GoBtn } from './Khung';

export function ChamTran({ sc }) {
  const r = PS.G.run, en = sc.en, title = sc.elite ? 'Hung địa' : 'Chạm trán';
  const story = <>
    <FoeLine en={en} />
    <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} />{sc.res && <Html as="p" className="new" h={PS.txt(sc.res)} />}</div>
  </>;
  if (sc.done) return (
    <Card title={title} sub={r.place.n} foot={<GoBtn act="next" label="Tiếp tục" />}>
      {story}<Chips list={sc.paid ? [PS.chip('💎', '−' + sc.paid, 'Linh thạch', 'dn')] : []} />
    </Card>
  );
  const p = Math.round(PS.encSneak(sc) * 100), pay = Math.round(12 * PS.SC[r.region]);
  return (
    <Card title={title} sub={r.place.n}>
      {story}
      {PS.injured() && <p className="cb-warn">Đang mang thương: thua trận này là chết.</p>}
      <div className="choices">
        <ChoiceBtn n="1." act="enc" arg="fight" label="Xuất thủ" extra={<span className="cx">giao chiến</span>} />
        <ChoiceBtn n="2." act="enc" arg="sneak" label="Lẩn tránh" extra={<span className="cx chk" {...tip('Dựa vào thân pháp\nThất bại thì vẫn phải đánh')}>thân pháp {p}%</span>} />
        {en.f === 'nhan' && !sc.elite && !PS.encLawful(en) &&
          <ChoiceBtn n="3." act="enc" arg="pay" label="Nộp tiền mãi lộ" extra={<span className="cx"><Stone v={pay} /></span>} dis={r.st < pay} />}
      </div>
    </Card>
  );
}

export function SaoHuyet({ sc }) {
  const r = PS.G.run;
  return (
    <Card title="Sào huyệt" sub={r.place.n} foot={<GoBtn act="bossFight" label="Nghênh chiến" />}>
      <FoeLine en={sc.b} big sub={'Thủ lĩnh vùng ' + PS.REG[r.region].n} />
      <div className="story"><p className="new">{sc.text}</p></div>
    </Card>
  );
}
