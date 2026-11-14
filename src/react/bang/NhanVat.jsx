// Bảng nhân vật: căn cơ (thân thế, tu luyện, chiến đấu), túi đồ, sở học, kỹ năng.
// Túi đồ, sở học, kỹ năng và thẻ tiềm chất vẫn dùng bản HTML cũ (sẽ chuyển sau).
import { Html, PS } from '../html';
import { Ib, Ic, Tabs, tip } from '../chung';
import { Win } from './Khung';
import { TuiDo } from './TuiDo';
import { SoHoc, KyNang } from './SoHoc';

// Một dòng tên — giá trị (giống kvRow()). v là chuỗi HTML (mức đánh giá có màu…)
function Kv({ n, v, t, cls }) {
  return (
    <div className={'kr ' + (cls || '')} {...tip(t)}>
      <span><Html style={{ display: 'contents' }} h={PS.sib(n)} />{n}</span>
      <Html as="b" h={String(v)} />
    </div>
  );
}

// Hộp thu gọn được (giống sgBoxC()); trạng thái mở lưu trong UI.ccOpen
function HopGon({ k, icon, name, children }) {
  const o = PS.UI.ccOpen = PS.UI.ccOpen || {}, open = o[k] !== false;
  return (
    <details className="sgbox cbstat" open={open}>
      <summary className="sgrp" data-act="ccOpen" data-arg={k}><Ib n={icon} c="soft" />{name}<i className="cc-ch" aria-label={open ? 'Thu gọn' : 'Mở rộng'}><Ic n={open ? 'up' : 'down'} /></i></summary>
      <div className="kvl">{children}</div>
    </details>
  );
}

function Thanh({ n, v, cls, t }) {
  const p = Math.max(0, Math.min(100, v));
  return (
    <div className="hrow tvrow" {...tip(t)}>
      <span className="hn"><Html style={{ display: 'contents' }} h={PS.sib(n)} />{n}</span>
      <div className={'hb ' + cls}><i style={{ width: p + '%' }} /></div>
      <span className="hv">{v}%</span>
    </div>
  );
}

const esc = s => PS.esc(s);
const RT = (k, v, kind) => PS.RT(k, v, kind);

function CanCo() {
  const { G, UI, ORIGIN, TRAIT, ROOT, TT_DEST, PCOL, TC_N, REALM, QNAME } = PS;
  const r = G.run, s = PS.S();
  const og = ORIGIN.find(o => o.id === r.origin), tr = TRAIT.find(t => t.id === r.trait), R0 = PS.rootView(r.root);
  const R1 = ROOT.find(x => x.id === r.root.id), tc = s.tuchat, left = Math.max(0, Math.floor(s.life - r.age));
  const lcV = `<span class="lc2"><small>${esc(R0.n)}</small><span class="lc-els">${r.root.els.map(PS.elSeal).join('')}</span></span>`;
  const tvTip = 'Tu vi ' + PS.tvShow() + '%' + (PS.dinhPhong() ? (PS.dvm() ? '\nĐại viên mãn: khí huyết, linh lực, công, thủ +5%.' : '\nChưa đại viên mãn: ' + PS.dvmWhy() + '.\n(Cần: không trọng thương, tâm ma dưới ' + PS.DVM_TAMMA + ', đạo tâm từ ' + PS.DVM_TAM + ')') : '')
    + (PS.bbKind() ? '\nBán bộ ' + REALM[r.realm + 1] + ': dùng được đồ, công pháp, tâm pháp của ' + REALM[r.realm + 1] + '; chỉ số vẫn như cũ.' : '');
  const e = PS.llEff(r.tv);
  const hs = e > 1.001 ? ['rt4', 'Ngộ đạo'] : e >= 0.99 ? ['rt3', 'Đầy đủ'] : e >= 0.7 ? ['rt2', 'Hơi giảm'] : e >= 0.35 ? ['rt1', 'Giảm'] : e >= 0.1 ? ['rt0', 'Giảm mạnh'] : ['bad', 'Bình cảnh'];
  const cbOpen = UI.cbOpen !== false;
  return <>
    <Html style={{ display: 'contents' }} h={PS.talCardHTML()} />
    <div className="basegrid">
      <HopGon k="than" icon="flag" name="Thân thế">
        <Kv n="Xuất thân" v={esc(og.n)} t={og.d} />
        {tr && tr.id !== 'none' && <Kv n="Mệnh cách" v={esc(tr.n)} t={tr.d} />}
        <Kv n="Linh căn" v={lcV} t={R1.d + '\nLinh căn là số đường dẫn linh khí vào thân. Càng ít hệ càng thuần, tu càng nhanh (×' + PS.numVN(R1.m) + ').'} />
        <Html style={{ display: 'contents' }} h={PS.ttRow('Tiên thiên khí vận', (r.kv || []).map(k => TT_DEST[k]), 'Khí vận định sẵn lúc đầu thai. Có cái kéo linh căn về một hành, có cái ép linh căn biến dị, có cái quyết định thể chất.')} />
        <Html style={{ display: 'contents' }} h={PS.htRow()} />
        <Html style={{ display: 'contents' }} h={PS.ttRow('Tiên thiên thể chất', (r.the || []).map(PS.ttPhysOf), 'Suy ra từ linh căn, khí vận, nhân quả và tính tình lúc sinh ra. Tối đa ba thể chất, phẩm cao nhất trước.')} />
        <Kv n="Tư chất" v={`<span style="color:${PCOL[Math.max(0, 4 - TC_N.findIndex(x => tc >= x[0]))]}">${PS.tcName(tc)}</span>`}
          t={'Độ tinh thuần của linh căn, định sẵn lúc sinh.\nCùng một loại linh căn, tư chất cao thì hấp thu linh khí nhanh hơn.\nHệ số tu luyện ×' + PS.numVN(Math.round(PS.tcMult(tc) * 100) / 100) + ' (từ ×0,7 tới ×1,3).'} />
        <Kv n="Ngộ tính" v={RT('ngo', s.ngo, 'muc')} t="Tu luyện nhanh hơn, giải đố, đột phá, luyện chế" />
        <Kv n="Đạo tâm" v={RT('tam', s.tam, 'muc')} t="Chống ảo cảnh, đột phá" />
        <Kv n="Khí vận" v={RT('van', s.van, 'muc')} t="Chí mạng, may mắn" />
        <Kv n="Mị lực" v={`<span class="mi-v">${PS.miName()}</span>`} t={'Dung mạo, phong thái. Ảnh hưởng giá mua bán, các phép thử thuyết phục, ấn tượng ban đầu của người lạ, việc kết giao, bái sư, kết đạo lữ.\nQuá nổi bật đôi khi cũng chuốc lấy ghen ghét.'} />
        <Kv n="Nhân quả" v={PS.karmaName(r.karma)} t="Thiện ác đều có báo" />
        <Kv n="Tuổi" v={Math.floor(r.age) + ' · còn ' + left + ' năm'} t={'Thọ nguyên ' + s.life + '. Hết thọ nguyên là tọa hóa'} />
      </HopGon>
      <HopGon k="tu" icon="yin" name="Tu luyện">
        <Kv n="Cảnh giới" v={esc(PS.realmLabel()) + ` <span class="qhelp" data-act="cgOpen" data-tip="Mở hệ thống cảnh giới">?</span>`} t={tvTip} />
        <Thanh n="Tu vi" v={PS.tvShow()} cls="tv" />
        <Thanh n="Lịch luyện" v={PS.llShow()} cls="ll" t={'Lịch luyện ' + PS.llShow() + '%\nCó được nhờ thực chiến (thắng nhiều, thua ít, đánh kẻ mạnh hơn được nhiều hơn), tới nơi mới, quen người mới, làm xong việc.\nTu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần. Lịch luyện tính theo tầng/kỳ đang ở: chừng 65% là xung kích được, đột phá đại cảnh giới thì cần đầy.'} />
        <Kv n="Tốc độ tu" v={RT('bq', PS.bqReal(), 'toc')} t={'Tu vi nhận được mỗi tháng BẾ QUAN ở nơi đang đứng. Không bế quan thì không tăng theo chỉ số này. Hên xui trong khoảng này.\nPhụ thuộc linh căn, tư chất, ngộ tính, Khí Hải và linh khí nơi bế quan.'} />
        <Kv n="Thổ nạp" v={RT('thonap', PS.thonapPct(), 'toc')} t={'Thân thể tự hít thở linh khí: không cần bế quan, tu vi vẫn tự tăng theo thời gian, kể cả lúc đi đường hay bế quan.\nRất ít, chừng 5% tốc độ bế quan. Theo linh căn, tư chất, ngộ tính, công pháp, tâm pháp, trang bị, mệnh cách và linh khí nơi đang đứng.'} />
        <Kv n="Hiệu suất tu" v={`<span class="${hs[0]}">${hs[1]}</span>`} t={'Phần tu vi thực nhận so với lẽ ra được nhận, do chênh lệch tu vi và lịch luyện.\nTu vi càng bỏ xa lịch luyện thì nhận càng ít, tới mức bình cảnh gần như đứng yên.\nLịch luyện cao hơn tu vi thì được ngộ đạo, nhận thêm một ít.'} />
        <Kv n="Đạo cơ" v={QNAME[PS.qOf(r.dao || 0)]} t={'Đạo cơ quyết định phẩm chất khi đột phá.' + (PS.qNext(r.dao || 0) ? '' : '\nĐã đạt Thiên đạo')} />
        <Kv n="Tâm ma" v={`<span class="${['rt3', 'rt3', 'rt2', 'bad', 'bad'][Math.min(4, Math.floor((r.tamma || 0) / 20))]}">${PS.tmWord(r.tamma)}</span>`} t="Tâm ma đầy thì phải đối mặt với chính mình" cls={r.tamma >= 60 ? 'bad' : ''} />
        <Kv n="Thần thức" v={RT('than', s.than, 'luc')} t={'Sức mạnh thần thức. Hơn đối thủ thì đòn thần thức làm choáng được. Tầm thần thức là tầm nhìn trên bản đồ.\nTăng theo cảnh giới, ngộ tính và tâm pháp.'} />
        <Kv n="Niệm lực" v={RT('nl', s.nl, 'luc')} t={'Kho sức thần thức dùng trong trận, bằng ba lần Thần thức. Vào trận thì đầy.\nDùng vật phẩm, tế pháp bảo, đòn thần thức đều tốn niệm lực.'} />
        <Kv n="Thân pháp" v={RT('tp', s.tp, 'toc')} t="Nhanh nhẹn. Trong trận là tốc độ chạy trên nửa đầu thanh hành động; ngoài trận đi lại cũng nhanh hơn." />
      </HopGon>
      <details className="sgbox cbstat" open={cbOpen}>
        <summary className="sgrp" data-act="cbOpen"><Ib n="sword" c="soft" />Chiến đấu<i className="cc-ch" aria-label={cbOpen ? 'Thu gọn' : 'Mở rộng'}><Ic n={cbOpen ? 'up' : 'down'} /></i></summary>
        <div className="kvl">
          <Kv n="Lực chiến" v={RT('lc', PS.lucChien(), 'luc')} t="Lực chiến: tính từ chỉ số chiến đấu và trang bị" cls="lcrow" />
          <Kv n="Khí huyết" v={RT('maxHp', s.maxHp, 'ben')} t="Khí huyết tối đa dày hay mỏng. Về 0 là chết" />
          <Kv n="Linh lực" v={RT('maxMp', s.maxMp, 'ben')} t="Thi triển pháp thuật" />
          <Kv n="Công vật lý" v={RT('atk', s.atk)} t="Dùng cho đánh thường và kiếm pháp, quyền cước" />
          <Kv n="Công phép" v={RT('matk', s.matk)} t="Dùng cho pháp thuật" />
          <Kv n="Chí mạng" v={RT('crit', s.crit, 'muc')} t="Tỉ lệ chí mạng" />
          <Kv n="ST chí mạng" v={RT('critDmg', s.critDmg)} t="Sát thương khi chí mạng" />
          <Kv n="Chính xác" v={RT('cx', s.cx, 'muc')} t="Đối phương né khó hơn" />
          <Kv n="Thủ" v={RT('def', s.def)} t="Giảm sát thương nhận vào" />
          <Kv n="Hộ tâm" v={RT('hoTam', s.hoTam)} t="Giảm sát thương chí mạng nhận vào" />
          <Kv n="Né" v={RT('ne', s.ne, 'muc')} t="Phải bấm Né đúng lúc mới phát huy hết" />
          <Kv n="Hồi phục" v={RT('hoi', s.hoi, 'toc')} t="Tốc độ trên nửa sau thanh hành động" />
        </div>
      </details>
    </div>
  </>;
}

const TABS = [['base', 'Căn cơ'], ['bag', 'Túi đồ'], ['hoc', 'Sở học'], ['kn', 'Kỹ năng']];

export function NhanVat() {
  const { G, UI } = PS;
  let tab = UI.tab.char || 'base';
  if (tab === 'chu') tab = 'hoc';
  return (
    <Win title={G.run.ten} cls="tall wide">
      <Tabs k="char" list={TABS} cur={tab} />
      {tab === 'base' && <CanCo />}
      {tab === 'bag' && <TuiDo />}
      {tab === 'hoc' && <SoHoc />}
      {tab === 'kn' && <KyNang />}
    </Win>
  );
}
