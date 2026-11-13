// Màn mở đầu: tiếp tục kiếp đang dở, hoặc kể lại kiếp trước rồi luân hồi.
import { Html, PS, Tranh } from '../html';

export function ManMoDau() {
  const { G, UI, ASSET } = PS;
  const M = G.meta, run = G.run, last = M.lives[0];
  let mid;
  if (run) {
    mid = <>
      <p className="t-sub">Một kiếp tu tiên. Vạn kiếp luân hồi.</p>
      <div className="t-btn">
        <button className="btn pri big" data-act="resume">Tiếp tục {PS.kiepName(run.kiep).toLowerCase()}</button>
        <p className="hint">{run.ten} · {PS.realmLabel()} · {Math.floor(run.age)} tuổi</p>
      </div>
    </>;
  } else if (last) {
    const N = [`Kiếp trước, có một người tên ${last.ten}.`, ...last.lines.slice(-4),
      `Hồn phách qua cầu Nại Hà. Bát canh Mạnh Bà xóa đi tên họ, xóa đi ân oán, chỉ ${M.pts} điểm luân hồi còn khắc trong chân linh.`];
    mid = <>
      <div className={'narr' + (UI.narrSkip ? ' skip' : '')} data-act="narrSkip">
        {N.map((t, i) => <Html as="p" key={i} style={{ animationDelay: i * 1.1 + 's' }} h={PS.txt(t)} />)}
        <p className="k" style={{ animationDelay: N.length * 1.1 + 's' }}>{PS.kiepName(M.nlife + 1)} bắt đầu.</p>
      </div>
      <div className="t-btn" style={{ animationDelay: (UI.narrSkip ? 0 : N.length * 1.1 + 0.6) + 's' }}>
        <button className="btn pri big" data-act="birth">Luân hồi</button>
        <button className="btn" data-act="screen" data-arg="meta">Lên Bến Vong Xuyên · {M.pts} điểm</button>
        <p className="hint">Đã trải {M.nlife} kiếp</p>
      </div>
    </>;
  } else {
    mid = <>
      <p className="t-sub">Một kiếp tu tiên. Vạn kiếp luân hồi.</p>
      <div className="t-btn">
        <button className="btn pri big" data-act="birth">Nhập thế</button>
        <p className="hint">Thế gian không chờ ai. Chết rồi lại sinh, mang theo chút gì còn khắc trong chân linh.</p>
      </div>
    </>;
  }
  return (
    <div className="title">
      {ASSET.title
        ? <img className="t-art t-ink" src={ASSET.title} alt="" />
        : <Tranh seed={'phusinh-title' + M.nlife} reg={Math.min(4, last ? last._mr || 0 : 0)} type="song" cls="t-art" />}
      <div className="t-seal">Phù</div>
      <h1>Phù Sinh</h1>
      {mid}
      <div className="t-foot">
        {run && M.nlife > 1 && <button className="lnk" data-act="screen" data-arg="meta">Bến Vong Xuyên · {M.pts} điểm</button>}
        <button className="lnk" data-act="titleCfg">Cấu hình</button>
      </div>
    </div>
  );
}
