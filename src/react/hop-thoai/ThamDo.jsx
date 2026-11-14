// Thăm dò: ở thôn trấn/thành thì xem có gì để kiếm, ở nơi hoang thì xem yêu ma, tỉ lệ, vật liệu.
import { PS } from '../html';
import { Tabs } from '../chung';

const Bang = ({ L }) => <div className="kv">{L.map((x, i) => <div key={i}><span>{x[0]}</span><b>{x[1]}</b></div>)}</div>;

function ThamDoThiTran({ n }) {
  const X = PS.townStats(n), tb = PS.UI.tab.ex || 'L';
  return (
    <div className="mbox">
      <h3>{n.name}</h3>
      <Tabs k="ex" list={[['L', 'Kiếm được · ' + X.L.length], ['M', 'Có thể gặp · ' + (X.M.length + X.evs.length)]]} cur={tb} />
      {tb === 'L' ? <>
        <p className="hint">Những thứ chắc chắn có ở đây. Hàng trên kệ đổi theo tháng, không phải lúc nào cũng đủ.</p><Bang L={X.L} />
      </> : <>
        <p className="hint">Chỉ gặp khi có duyên; thường là đồ tốt hơn hàng bày sẵn.</p><Bang L={X.M} />
        {X.evs.length > 0 && <><h4 className="sgrp">Chuyện, người có thể gặp</h4><div className="foes">{X.evs.map((t, i) => <span key={i} className="chip">{t}</span>)}</div></>}
      </>}
      <div className="mb-f"><button className="btn" data-act="modalX">Đóng</button><button className="btn pri" data-act="exGo">Dạo một vòng · 2 giờ</button></div>
    </div>
  );
}

export function ThamDo() {
  const { G, MAT } = PS;
  const n = PS.nodeById(G.run.at);
  if (PS.SETTLE.includes(n.type)) return <ThamDoThiTran n={n} />;
  const X = PS.exploreStats(n), fp = Math.round(X.fp * 100);
  return (
    <div className="mbox">
      <h3>Thăm dò · {n.name}</h3>
      <div className="kv">
        <div><span>So với ngươi</span><b>{PS.DTAG[PS.dangerTag(n)]}</b></div>
        <div><span>Linh khí</span><b>{PS.LK_N[PS.lkOf(n)]}</b></div>
        <div><span>Lục soát mà đụng yêu ma</span><b>{fp}%</b></div>
        <div><span>Gặp cơ duyên, kỳ ngộ</span><b>{100 - fp}%</b></div>
        <div><span>Lục soát lần này trong tháng</span><b>{n.exploreT === Math.floor(PS.W().t / PS.HM) ? Math.min(3, n.explore) : 0} / 3</b></div>
      </div>
      <h4 className="sgrp">Yêu ma có thể gặp</h4>
      {X.foes.length
        ? <div className="foes">{X.foes.map((E, i) => <span key={i} className="chip">{E.i} {(E.nb && E.nb[0]) || (E.t && E.t[0]) || 'Yêu vật'}</span>)}</div>
        : <p className="hint">Chưa nghe nói tới.</p>}
      <h4 className="sgrp">Có thể nhận được</h4>
      <div className="kv">
        {X.mat && <div><span>{MAT[X.mat].i} {MAT[X.mat].n}</span><b>50% mỗi lần lục soát</b></div>}
        <div><span>{MAT.dan.i} Yêu đan</span><b>60% khi hạ yêu thú</b></div>
        <div><span>🥚 Trứng linh thú</span><b>{Math.round(X.egg * 100)}% khi hạ yêu thú</b></div>
        <div><span>Đan dược, pháp bảo, công pháp</span><b>tùy kỳ ngộ</b></div>
      </div>
      <div className="mb-f"><button className="btn" data-act="modalX">Đóng</button><button className="btn pri" data-act="exGo">Lục soát · 2 giờ</button></div>
    </div>
  );
}
