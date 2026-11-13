// Chiến lợi phẩm (chọn một món), phường thị (mua, trị thương), lĩnh ngộ công pháp mới (quên bớt môn cũ).
import { Html, PS } from '../html';
import { Chips, Stone, Tabs, pcs, tip } from '../chung';
import { Card, ChoiceBtn, GoBtn } from './Khung';

export function ChienLoiPham({ sc }) {
  const r = PS.G.run;
  return (
    <Card title={sc.kind === 'boss' ? 'Chiến thắng' : 'Chiến lợi phẩm'} sub={r.place.n}
      foot={<GoBtn act="rcont" label={sc.picks.length && sc.taken < 0 ? 'Bỏ qua' : 'Tiếp tục'} />}>
      <div className="story"><Html as="p" className="new" h={PS.txt(sc.text)} /></div>
      <Chips list={sc.chips} />
      {sc.picks.length > 0 && <>
        <p className="hint">{sc.taken < 0 ? 'Chọn một món' : 'Đã chọn'}</p>
        <div className="rows">
          {sc.picks.map((p, i) => {
            const v = PS.itemView(p), cls = sc.taken === i ? ' taken' : sc.taken >= 0 ? ' dim' : '';
            return (
              <button key={i} className={'row prow' + cls} data-act="pick" data-arg={i} disabled={sc.taken >= 0} style={v.t != null ? pcs(v.t) : undefined} {...tip(v.tip)}>
                <Html className="qi" h={v.ic} />
                <span className="r-t"><b className={v.t != null ? 'qt' : ''}>{v.n}</b><small>{v.sub}</small></span>
              </button>
            );
          })}
        </div>
      </>}
    </Card>
  );
}

export function PhuongThi({ sc }) {
  const { G, UI } = PS;
  const r = G.run, tab = UI.tab.shop || 'buy';
  return (
    <Card title="Phường thị" sub={r.place.n} cls="tall" x
      foot={<><span className="grow">Trong túi: <Stone v={r.st} /></span><GoBtn act="next" label="Rời đi" arg="" cls="pri" /></>}>
      <p className="shop-top">{sc.text}</p>
      <Tabs k="shop" list={[['buy', 'Mua'], ['svc', 'Việc khác']]} cur={tab} />
      {tab === 'buy' ? <>
        <div className="grid">
          {sc.items.map((it, i) => {
            const v = PS.itemView(it), no = it.sold || r.st < it.p;
            return (
              <button key={i} className={'cell qc' + (it.sold ? ' sold' : '')} data-act="buy" data-arg={i} disabled={!!no} style={v.t != null ? pcs(v.t) : undefined} {...tip(v.tip || v.n)}>
                <Html className="c-i" h={v.ic} />
                <span className={'c-n' + (v.t != null ? ' qt' : '')}>{v.n}</span>
                <span className="c-p">{it.sold ? 'hết hàng' : <Stone v={it.p} />}</span>
                {!it.sold && it.qty != null && <span className="c-q">còn {it.qty}</span>}
              </button>
            );
          })}
        </div>
        <p className="hint">Chạm giữ một món để xem công dụng. Chạm để mua. Hàng mới sau {PS.durH(PS.shopResetIn())}.</p>
      </> : (
        <div className="rows">
          <button className="row" data-act="heal" disabled={!!(sc.healed || r.st < sc.heal)} {...tip('Hồi đầy khí huyết và linh lực')}>
            <span className="r-i">🩹</span>
            <span className="r-t"><b>Mời y sư trị thương</b><small>Hồi đầy khí huyết, linh lực</small></span>
            <span className="r-x">{sc.healed ? 'xong' : <Stone v={sc.heal} />}</span>
          </button>
        </div>
      )}
    </Card>
  );
}

export function LinhNgo({ sc }) {
  const r = PS.G.run, SK = PS.SK, sk = SK[sc.id];
  return (
    <Card title="Lĩnh ngộ" sub="">
      <div className="story"><p>Ngươi lĩnh ngộ được <b className="qt" style={pcs(sk.t)} {...tip(PS.skillTip(sk, 1))}>{sk.n}</b>. Nhưng tâm trí chỉ chứa nổi bốn môn. Quên đi môn nào?</p></div>
      <div className="choices">
        {r.skills.map((k, i) => {
          const s0 = SK[k.id];
          return <ChoiceBtn key={i} n={PS.elSeal(s0.el)} act="swap" arg={i} label={<b className="qt" style={pcs(s0.t)}>{s0.n}</b>} extra={<span className="cx">quên</span>} t={PS.skillTip(s0, k.lv)} />;
        })}
        <ChoiceBtn n="·" act="swap" arg={-1} label={'Không học ' + sk.n} cls="soft" />
      </div>
    </Card>
  );
}
