// Bảng "Thêm": mục lục, lớp bản đồ, chú giải ký hiệu, ghi chú đã ghim, cách chơi, cấu hình.
// Và bảng Tông môn (đang xây dựng).
import { Html, PS } from '../html';
import { Ib, Ic, Tabs, tip } from '../chung';
import { Win } from './Khung';
import { CauHinh, OnOff, SetRow } from './CauHinh';

const MENU = [['cfg', 'gear', 'Cấu hình', 'Đồ họa, khung hình, hiển thị, lối chơi'], ['layer', 'layers', 'Lớp bản đồ', 'Bật tắt tên, thực thể qua lại'], ['legend', 'list', 'Chú giải', 'Ý nghĩa các ký hiệu trên bản đồ'], ['notes', 'pin', 'Ghi chú', 'Các điểm ngươi đã ghim'], ['help', 'info', 'Cách chơi', 'Tóm tắt luật chơi']];

function MucLuc() {
  const c = PS.UI.confirm === 'newGame';
  return (
    <div className="menu">
      {MENU.map(([k, i, n, d]) => <button key={k} className="row" data-act="tab" data-arg={'more:' + k}><span className="r-i"><Ic n={i} /></span><span className="r-t"><b>{n}</b><small>{d}</small></span></button>)}
      <button className="row" data-act="newGame"><span className="r-i"><Ic n="cycle" /></span><span className="r-t"><b className={c ? 'bad' : ''}>{c ? 'Bấm lần nữa để chơi lại từ đầu' : 'Chơi mới từ đầu'}</b><small>Xóa kiếp này, thế giới và mọi tích lũy, đầu thai lại. Không hoàn tác.</small></span></button>
      <button className="row" data-act="screen" data-arg="title"><span className="r-i"><Ic n="home" /></span><span className="r-t"><b>Về màn hình đầu</b><small>Kiếp này vẫn được giữ lại</small></span></button>
    </div>
  );
}

function LopBanDo() {
  return (
    <div className="sets">
      <SetRow n="Tên địa danh"><OnOff k="names" /></SetRow>
      <SetRow n="Thực thể qua lại" t="Thương đội, thú triều, đệ tử tuần tra, thiên kiêu, dị tượng… đang di chuyển trên bản đồ"><OnOff k="ents" /></SetRow>
      <SetRow n="Lưới ô lục giác" t="Lưới ô và ranh giới các quận. Ranh giới đại khu vực luôn hiện."><OnOff k="grid" /></SetRow>
      <SetRow n="Dấu ghi chú"><OnOff k="notes" /></SetRow>
      <SetRow n="Địa hình vẽ tay" t="Tắt đi thì bản đồ chỉ còn nền giấy trơn, nhẹ máy nhất"><OnOff k="terrain" /></SetRow>
    </div>
  );
}

const NHOM = [['Nơi có người', ['tran', 'thanh', 'cho', 'tong', 'ancu', 'ai']], ['Hoang dã', ['rung', 'nui', 'song', 'bien', 'hoang', 'dam', 'thien']], ['Tài nguyên', ['linhdia', 'duoc', 'khoang', 'dong']], ['Hiểm địa', ['phe', 'ma', 'sao']]];

// Một ô chọn ẩn/hiện trong chú giải
function O({ act, k, on, children }) {
  return <button className={'lgc' + (on ? ' on' : '')} data-act={act} data-arg={k}><i className="ckb">{on && <Ic n="check" />}</i>{children}</button>;
}

function ChuGiai() {
  const { CFG, GLYPH, ENT_T, ENT_DESC, ENT_GLYPH, DTAG, LK_N } = PS;
  const HT = CFG.hideT || {}, HE = CFG.hideE || {}, any = Object.keys(HT).length + Object.keys(HE).length > 0;
  const gi = k => <svg className="lgi" viewBox="0 0 24 24" style={{ background: 'var(--ink2)' }}><path d={GLYPH[k]} /></svg>;
  return <>
    <p className="hint">Bỏ chọn loại nào thì loại đó ẩn khỏi bản đồ.</p>
    <div className="hbtns"><button data-act="legAll">{any ? 'Chọn hết' : 'Bỏ chọn hết'}</button></div>
    <h4 className="sgrp">Nhân vật</h4>
    <div className="lgg"><O act="legT" k="_me" on={!HT._me}><span className="lav me">{PS.avLetter(PS.G.run ? PS.G.run.ten : '?')}</span>Ngươi</O></div>
    {NHOM.map(([name, ks]) => [
      <h4 key={'h' + name} className="sgrp">{name}</h4>,
      <div key={'d' + name} className="lgg">{ks.map(k => <O key={k} act="legT" k={k} on={!HT[k]}>{gi(k)}{PS.capS(PS.TYPE_NAME[k])}</O>)}</div>,
    ])}
    <h4 className="sgrp">Người, vật qua lại</h4>
    <p className="hint">Ô tròn có chữ là người. Dấu chân là bầy thú. Ngôi sao là dị tượng (cơ duyên, không phải người hay thú). Xe là thương đội.</p>
    <div className="lgg">
      {Object.keys(ENT_T).map(k => (
        <O key={k} act="legE" k={k} on={!HE[k]}>
          <span className={'lav e-' + k} {...tip(ENT_DESC[k] || '')}>
            {k === 'thuong' ? <img className="lwag" src={PS.WAGON_URI} alt="" /> : ENT_GLYPH[k] ? <Ic n={ENT_GLYPH[k]} /> : PS.avLetter(ENT_T[k].n)}
          </span>{ENT_T[k].n}
        </O>
      ))}
    </div>
    <h4 className="sgrp">Màu nền biểu tượng · mức nguy hiểm so với ngươi</h4>
    <div className="lgg">{DTAG.map((d, i) => <div key={i} className={'nc-g dg' + i}><i></i>{d}</div>)}</div>
    <h4 className="sgrp">Linh khí</h4>
    <p className="hint">{LK_N.join(' · ')}: xem trong thẻ địa điểm. Linh khí càng dồi dào, bế quan càng nhanh.</p>
    <h4 className="sgrp">Dấu phụ</h4>
    <div className="lg">
      <div><i className="sq hollow"></i>Nghe đồn, chưa tận mắt thấy</div>
      <div><i className="sq" style={{ background: 'var(--ink3)', opacity: 0.6 }}></i>Ký ức kiếp trước hoặc tin đã cũ</div>
      <div><i className="dt" style={{ background: 'var(--jade)' }}></i>Có động phủ</div>
      <div><i className="dt" style={{ background: 'var(--gold)' }}></i>Có ghi chú của ngươi</div>
      <div><i className="dt qd">!</i>Nơi cần tới của nhiệm vụ đang nhận</div>
      <div><i className="sq" style={{ background: 'var(--ink2)', width: 8, height: 11 }}></i>Có mộ cũ</div>
      <div><i className="rd dash"></i>Thực thể chỉ nghe tin, vị trí lúc nghe</div>
    </div>
  </>;
}

function GhiChuDaGhim() {
  const N = PS.G.meta.world.notes || {}, ks = Object.keys(N);
  return <>
    <p className="hint">Chạm một điểm trên bản đồ rồi bấm “Ghi chú” để ghim. Ghim chỉ để nhớ, giữ qua các kiếp. {ks.length}/50</p>
    {ks.length ? (
      <div className="rows">
        {ks.map(k => {
          const n = PS.nodeById(+k);
          return <button key={k} className="row" data-act="noteGo" data-arg={k}><span className="r-i"><Ic n="pin" /></span><span className="r-t"><b>{n && n.fog >= 1 ? n.name : 'Một nơi kiếp trước'}</b><small>{N[k]}</small></span></button>;
        })}
      </div>
    ) : <p className="empty">Chưa ghim chỗ nào.</p>}
  </>;
}

function CachChoi() {
  return (
    <div className="story help">
      <p><b>Mục tiêu.</b> Tu luyện, đột phá qua các cảnh giới trước khi hết thọ nguyên. Chết thì luân hồi, thế giới vẫn tiếp tục già đi.</p>
      <p><b>Thời gian.</b> Đứng ở bản đồ, 1 giây = 1 giờ. Đi đường, bế quan, đột phá, vượt ải ngốn tháng năm. Mở bảng nào đó thì thời gian dừng.</p>
      <p><b>Bản đồ.</b> Chạm một điểm để xem, bấm “Đi tới”. Tới nơi bấm “Vào” để thăm dò, nghỉ ngơi, mua bán. Chấm xanh ngọc là nơi có động phủ: bế quan và đột phá ở đó.</p>
      <p><b>Chiến đấu.</b> Mỗi bên chạy trên thanh hành động; tới mốc giữa thì ra chiêu. Bị đánh thì bấm “Né” đúng lúc vòng khép lại. Lười thì bật “Tự đánh”.</p>
      <p><b>Vòng chu thiên.</b> Trong bảng Nhân vật: xếp công pháp, pháp bảo quanh đan điền sao cho hệ trước sinh hệ sau.</p>
      <p><b>Linh thú, luyện chế.</b> Hạ yêu thú có khi được trứng và yêu đan. Thăm dò nơi hoang dã được linh thảo, linh khoáng để luyện đan, luyện khí.</p>
    </div>
  );
}

const TABS = [['menu', 'Mục lục'], ['layer', 'Bản đồ'], ['legend', 'Chú giải'], ['notes', 'Ghi chú'], ['cfg', 'Cấu hình']];
const THAN = { menu: MucLuc, layer: LopBanDo, legend: ChuGiai, notes: GhiChuDaGhim, help: CachChoi, cfg: CauHinh };

export function Them() {
  const tab = PS.UI.tab.more || 'menu', Body = THAN[tab];
  return <Win title="Thêm" cls="tall"><Tabs k="more" list={TABS} cur={tab} />{Body && <Body />}</Win>;
}

const AL = { chinh: 'chính đạo', ta: 'tà đạo', ma: 'ma đạo', trung: 'trung lập', phat: 'Phật môn' };
export function TongMon() {
  const R = PS.relations();
  return (
    <Win title="Tông môn" cls="tall">
      <div className="soon"><Ib n="flag" c="soft" /><b>Tông môn</b><p className="hint">Phần này đang được xây dựng: lập tông, chiêu đệ tử, xây điện các.</p></div>
      <p className="hint">{R.mine ? 'Ngươi là đệ tử tông môn.' : 'Ngươi là tán tu, chưa vào tông môn nào.'}</p>
      <div className="rows">
        {R.sects.map((s, i) => <div key={i} className="row"><span className="r-i sect-i"><img src={PS.sectPic(s.n, s.al)} alt="" /></span><span className="r-t"><b>{s.n}</b><small>{AL[s.al] || s.al || ''}</small></span></div>)}
      </div>
    </Win>
  );
}
