// Bảng linh thú: con đang theo / thả, trứng đang ấp, cho ăn.
import { Html, PS } from '../html';
import { Stone, Tabs, tip } from '../chung';
import { Win } from './Khung';

function Bar({ cur, max, cls }) {
  const p = Math.max(0, Math.min(100, cur / Math.max(1, max) * 100));
  return <div className={'hb ' + (cls || '')}><i style={{ width: p + '%' }} /></div>;
}

function TheoBenMinh({ r, w }) {
  const { UI } = PS;
  return <>
    <p className="hint">Linh thú mang theo sẽ vào trận cùng ngươi và cho một lợi ích nhỏ. Giữ được tối đa {PS.PET_MAX} con.</p>
    {r.pets.length ? (
      <div className="rows">
        {r.pets.map((p, i) => {
          const on = r.petOut === i, rest = p.rest > w.t;
          return (
            <div key={i} className={'row' + (on ? ' taken' : '')}>
              <Html className="r-i big av-r" h={PS.assetImg('pet', p.k, p.i)} />
              <span className="r-t">
                <b>{p.n} · bậc {p.lv}/{PS.petCap()}</b>
                <small><Html style={{ display: 'contents' }} h={PS.elSeal(p.el)} /> {PS.petFxText(p)} · sức bằng {Math.round(PS.petPow(p) * 100)}% chủ{rest && <> · <span className="bad">dưỡng thương còn {PS.durH(p.rest - w.t)}</span></>}</small>
                <Bar cur={p.exp} max={p.lv * 3} cls="tv" />
              </span>
              <span className="r-x col">
                <button className={'btn sm' + (on ? ' on' : '')} data-act="petSet" data-arg={i}>{on ? 'đang theo' : 'mang theo'}</button>
                <button className="btn sm" data-act="petFree" data-arg={i}>{UI.confirm === 'free' + i ? 'chắc chứ?' : 'thả'}</button>
              </span>
            </div>
          );
        })}
      </div>
    ) : <p className="empty">Chưa có con nào theo ngươi. Hạ yêu thú, đôi khi sẽ nhặt được trứng trong ổ của nó.</p>}
  </>;
}

function TrungVaChoAn({ r, w }) {
  const PILL = PS.PILL, gia = PS.price(10);
  const cur = r.petOut != null && r.pets[r.petOut];
  return <>
    <h4 className="sgrp">Trứng đang ấp</h4>
    {r.eggs.length ? (
      <div className="rows">
        {r.eggs.map((e, i) => (
          <div key={i} className="row">
            <span className="r-i big">🥚</span>
            <span className="r-t"><b>Trứng {e.n}</b><small>{e.t > w.t ? 'còn ' + PS.durH(e.t - w.t) + ' nữa thì nở' : 'sắp nở'}</small></span>
            <button className="btn sm" data-act="petHatch" data-arg={i} disabled={r.st < gia || r.pets.length >= PS.PET_MAX} {...tip('Dùng linh thạch thúc trứng nở ngay')}>Thúc nở <Stone v={gia} /></button>
          </div>
        ))}
      </div>
    ) : <p className="hint">Không có trứng nào.</p>}
    <h4 className="sgrp">Cho ăn{cur ? ' · ' + cur.n : ''}</h4>
    {cur ? (r.pills.length ? (
      <div className="rows">
        {r.pills.map((p, i) => (
          <button key={i} className="row" data-act="petFeed" data-arg={i} {...tip('Linh thú lớn nhanh hơn. Đang dưỡng thương thì khỏi ngay.')}>
            <span className="r-i">{PILL[p.id].i}</span>
            <span className="r-t"><b>{PILL[p.id].n}</b><small>cho {cur.n} ăn</small></span>
          </button>
        ))}
      </div>
    ) : <p className="hint">Túi không có đan dược nào.</p>) : <p className="hint">Chọn một con mang theo trước đã.</p>}
  </>;
}

export function LinhThu() {
  const r = PS.run2(), w = PS.W(), tab = PS.UI.tab.pets || 'out';
  return (
    <Win title="Linh thú" cls="tall">
      <Tabs k="pets" list={[['out', 'Theo bên mình'], ['egg', 'Trứng · Nuôi']]} cur={tab} />
      {tab === 'out' ? <TheoBenMinh r={r} w={w} /> : <TrungVaChoAn r={r} w={w} />}
    </Win>
  );
}
