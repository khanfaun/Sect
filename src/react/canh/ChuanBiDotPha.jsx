// Chuẩn bị đột phá: ô đặt đan dược, khả năng thành công tách theo từng nguồn, đạo cơ, thiên kiếp sắp tới.
import { Html, PS } from '../html';
import { tip } from '../chung';
import { Card } from './Khung';

function DongDan({ p, i, taken }) {
  const PILL = PS.PILL;
  return (
    <button className={'row' + (taken ? ' taken' : '')} data-act="prep" data-arg={i} {...tip(PS.pillTip(p.id, p.q))}>
      <Html className="r-i" h={PILL[p.id].i} />
      <span className="r-t"><b>{p.q ? PS.PQ[p.q] + ' ' : ''}{PILL[p.id].n}</b><small>{PILL[p.id].d.replace('{x}', PS.pillX(p.id, p.q))}</small></span>
    </button>
  );
}

export function ChuanBiDotPha({ sc }) {
  const { G, PILL, QNAME } = PS;
  const r = G.run, v = PS.prepView(), to = PS.btTarget(), ph = PS.isPham();
  const P = PS.btParts(sc.slots), D = PS.daoParts(), e0 = PS.btEff(sc.slots), dD = D.reduce((a, x) => a + x.v, 0);
  const stg = PS.btStages(to).map(PS.stageName).join(' → ') || 'Không có thiên kiếp';
  const L = PS.btItems();
  const DL = ph ? [] : [{ t: 'Đạo cơ tích lũy', v: r.dao || 0 }].concat(e0.dao - dD ? [{ t: 'Linh dược trong ô', v: e0.dao - dD }] : []).concat(D);
  const tcTip = v.tcWhy ? tip('Phẩm Trúc Cơ tính theo tầng Luyện Khí lúc đột phá.' + (v.tcWhy.length ? '\nChưa lên phẩm cao hơn vì: ' + v.tcWhy.join(', ') + '.' : '')) : {};
  return (
    <Card title={ph ? 'Xung kích Luyện Khí tầng 1' : to === 5 ? 'Độ kiếp phi thăng' : 'Đột phá ' + PS.REALM[to]} sub={r.place.n} cls="tall"
      foot={<><button className="btn" data-act="next">Để sau</button><span className="grow"></span><button className="btn pri" data-act="prepGo">Bắt đầu</button></>}>
      <div className="story"><p>{ph ? 'Ngồi yên, theo tâm pháp dẫn sợi linh khí đầu tiên vào thân. Thành thì bước vào Luyện Khí; bại thì tổn thương kinh mạch, mất một phần tu vi.' : 'Chọn tối đa năm vật phẩm đặt vào ô chuẩn bị. Vật phẩm bị tiêu hao khi bắt đầu, dù thành hay bại.'}</p></div>
      <div className="slots">
        {[0, 1, 2, 3, 4].map(k => {
          const i = sc.slots[k], it = i != null && r.pills[i];
          return it
            ? <button key={k} className="slot on" data-act="prep" data-arg={i} {...tip(PS.pillTip(it.id, it.q))}>{PILL[it.id].i}<small>{PILL[it.id].n}</small></button>
            : <span key={k} className="slot">＋</span>;
        })}
      </div>
      <div className="bt-sum">
        <div><small>Khả năng thành công</small><b>{PS.btWord(v.rate)}</b></div>
        {!ph && <div {...tcTip}><small>Phẩm chất dự kiến</small><b>{QNAME[v.q]}</b></div>}
      </div>
      <div className="hrow tvrow" {...tip('Mỗi lần đột phá thất bại tích thêm một điểm cảm ngộ. Đủ ' + PS.CN_MAX + ' điểm thì lần sau chắc chắn thành công. Đột phá thành công thì cảm ngộ về 0.')}>
        <span className="hn">Cảm ngộ</span>
        <div className="hb tv"><i style={{ width: Math.min(100, PS.camNgo() / PS.CN_MAX * 100) + '%' }} /></div>
        <span className="hv">{PS.camNgo()}/{PS.CN_MAX}</span>
      </div>
      <h4 className="sgrp">Khả năng thành công</h4>
      <div className="bt-parts">
        {P.map((x, i) => (
          <div key={i} {...tip(x.tip || '')}><span>{x.t}</span><b className={i === 0 ? '' : x.v > 0 ? 'good' : 'bad'}>{i === 0 ? PS.btWord(x.v / 100) : PS.partWord(x.v)}</b></div>
        ))}
        <div className="tot"><span>Tổng</span><b>{PS.btWord(v.rate)}</b></div>
      </div>
      {!ph && <>
        <h4 className="sgrp">Đạo cơ · phẩm chất</h4>
        <div className="bt-parts">
          {DL.filter(x => x.v).map((x, i) => <div key={i}><span>{x.t}</span><b className={x.v > 0 ? 'good' : 'bad'}>{x.v > 0 ? '▲' : '▼'}</b></div>)}
          <div><span>Qua thiên kiếp còn trên nửa khí huyết</span><b className="good">▲</b></div>
        </div>
        <p className="hint">Đạo cơ càng vững, phẩm chất càng cao: Nhân Đạo, Địa Đạo rồi Thiên Đạo. Phẩm chất càng cao, chỉ số càng mạnh, thọ nguyên càng dài.</p>
      </>}
      <div className="kv">
        <div {...tip('Xung quan thành công thì các kiếp lần lượt kéo tới, từng cái một. Gục giữa kiếp là chết.')}><span>Thiên kiếp</span><b>{stg}</b></div>
        {!!v.e.guard && <div><span>Hộ mệnh</span><b>Có</b></div>}
      </div>
      <h4 className="sgrp">Túi đồ dùng được</h4>
      <div className="rows">
        {L.length ? L.map(({ p, i }) => <DongDan key={i} p={p} i={i} taken={sc.slots.includes(i)} />) : <p className="hint">Không có vật phẩm nào dùng được.</p>}
      </div>
    </Card>
  );
}
