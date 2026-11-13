// Thẻ trạng thái trên cùng: ảnh nhân vật (vòng khí huyết/linh lực), tên, cảnh giới, tuổi, đồng hồ, các chỉ số nhanh.
import { Html, PS } from '../html';
import { Ic, Rt, tip } from '../chung';

// Nhãn đột phá / xung kích / bình cảnh cạnh tên
function NhanDotPha() {
  const st = PS.btState();
  if (!st) return null;
  const r = PS.G.run;
  if (st === 'bc') {
    const lk = !PS.canBreak() && PS.lkXkState() && PS.lkXkState().ll;
    return <span className="hbt hbc" {...tip('Bình cảnh: tu vi đã đầy, không tăng thêm được.\nLịch luyện ' + PS.llShow() + '%: ' + (lk ? 'cần chừng 65% mới xung kích được.' : 'cần đầy mới đột phá được.') + '\nHãy ra ngoài lịch luyện: đánh trận, tới nơi mới, quen người mới, làm việc.')}>Bình cảnh</span>;
  }
  if (st === 'xk') return <button className="hbt dp" data-act="hudBq" {...tip('Tu vi ' + PS.sgName(PS.sgTang()) + ' đã đầy: có thể xung kích lên ' + PS.lkXkState().nx + '.\nMở bế quan rồi chọn Xung kích.')}>Xung kích</button>;
  const ph = PS.isPham();
  return <button className="hbt dp" data-act="hudBq" {...tip(ph ? 'Tu vi và lịch luyện đều đầy: có thể xung kích Luyện Khí tầng 1.\nBế quan ở bất cứ đâu để dẫn khí nhập thể.' : 'Có thể đột phá ' + (r.realm >= 4 ? 'phi thăng' : PS.REALM[r.realm + 1]) + '.\nTới nơi có động phủ, mở bế quan rồi chọn Đột phá.')}>{ph ? 'Xung kích' : 'Đột phá'}</button>;
}

// Vòng quanh ảnh: nửa trên khí huyết (xanh, vàng, đỏ theo %), nửa dưới linh lực
function Vong({ hp, mp }) {
  const HC = Math.PI * 27, hc = hp > 0.5 ? 'ok' : hp > 0.2 ? 'mid' : 'low';
  return (
    <svg className="hud-ring" viewBox="0 0 64 64">
      <path className="bg" d="M5 32A27 27 0 0 1 59 32" /><path className="bg" d="M5 32A27 27 0 0 0 59 32" />
      <path className={'hp ' + hc} d="M5 32A27 27 0 0 1 59 32" strokeDasharray={(HC * hp).toFixed(1) + ' ' + HC.toFixed(1)} />
      <path className="mp" d="M5 32A27 27 0 0 0 59 32" strokeDasharray={(HC * mp).toFixed(1) + ' ' + HC.toFixed(1)} />
    </svg>
  );
}

// Tên cảnh giới; khi vừa đổi cảnh giới thì chạy hiệu ứng chữ cũ trôi đi, chữ mới hiện ra
function TenCanhGioi() {
  const A = PS.UI.realmAnim;
  if (!A) return PS.realmLabel();
  return <span className={'rl-anim' + (A.down ? ' dn' : '')}><i className="o">{A.from}</i><i className="n">{A.to}</i></span>;
}

export function Hud() {
  const { G, clamp } = PS;
  const r = G.run, s = PS.S(), t = PS.W().t;
  const left = s.life - r.age, warn = left < s.life * 0.12, pa = PS.PART[PS.partOf(t)];
  const W0 = PS.wounds();
  const hurt = W0.length ? PS.WOUND[W0[0].k].n + (W0.length > 1 ? ' +' + (W0.length - 1) : '') : r.hp < s.maxHp * 0.35 ? 'Khí huyết cạn' : '';
  const hp = clamp(r.hp / Math.max(1, s.maxHp), 0, 1), mp = clamp(r.mp / Math.max(1, s.maxMp), 0, 1);
  const tal = PS.playerTal(), tm = r.tamma, tv = PS.tvShow();
  return <>
    <div className="hud-top">
      <button className={'hud-av hud-av2' + PS.talCls(tal)} data-act="panel" data-arg="char" aria-label="Nhân vật"
        {...tip('Khí huyết ' + PS.pctOf(r.hp, s.maxHp) + ' (nửa trên)\nLinh lực ' + (s.maxMp ? PS.pctOf(r.mp, s.maxMp) : 'chưa có') + ' (nửa dưới)\nChạm để mở nhân vật')}>
        <Vong hp={hp} mp={mp} />
        <Html className="hud-avi" h={PS.assetImg('hero', 'me', `<span class="av-txt">${PS.esc((r.ten.split(' ').pop() || '?')[0])}</span>`)} />
        {tal && tal.tier >= 0 && <Html className="tfr" h={PS.talFrameSVG(tal, 'hudtf')} />}
      </button>
      <div className="hud-id">
        <span className="nmrow"><b className="nm">{r.ten}</b><NhanDotPha /></span>
        <span className="rl" {...tip(PS.realmLabel() + '\nTu vi ' + tv + '%\n' + PS.rootView(r.root).n + ': ' + r.root.els.map(e => PS.EL[e].n).join(', '))}><TenCanhGioi /></span>
        <small className={warn ? 'bad' : ''} {...tip('Tuổi / thọ nguyên ' + s.life + (warn ? '\nThọ nguyên sắp cạn!' : ''))}>
          {Math.floor(r.age)} tuổi · còn {Math.max(0, Math.floor(left))} năm{hurt && <> · <b className="bad">{hurt}</b></>}
        </small>
      </div>
      <Html as="div" className="hud-clk3" id="clk" {...tip(PS.dateText(t) + '\nBuổi ' + pa.n + ', mùa ' + PS.SEASON[PS.seasonOf(t)])} h={PS.clkStr(t)} />
    </div>
    <div className="hud-stats">
      <span className="hs lc" {...tip('Lực chiến: ' + PS.rateOf('lc', PS.lucChien()).t + '\nSo với người cùng cảnh giới, tính từ chỉ số chiến đấu và trang bị.')}><Ic n="sword" /><Rt k="lc" v={PS.lucChien()} /></span>
      <span className="hs tu" {...tip('Tốc độ tu luyện khi bế quan ở đây: ' + PS.rateOf('bq', PS.bqReal(), 'toc').t + '\nThổ nạp: ' + PS.rateOf('thonap', PS.thonapPct(), 'toc').t)}><Ic n="seat" /><Rt k="bq" v={PS.bqReal()} kind="toc" /></span>
      <span className={'hs tm' + (tm >= 60 ? ' hi' : '')} {...tip('Tâm ma: ' + PS.tmWord(tm).toLowerCase() + '\nĐầy sẽ phải đối mặt với chính mình')}><Ic n="skull" />{PS.tmWord(tm)}</span>
      <span className="hs dt" {...tip('Đạo tâm: ' + PS.rateOf('tam', s.tam, 'muc').t + '\nChống ảo cảnh, giúp đột phá')}><Ic n="lotus" /><Rt k="tam" v={s.tam} kind="muc" /></span>
      <span className="hs st" {...tip('Linh thạch')}><i className="rh"></i>{PS.fmtN(r.st)}</span>
    </div>
    <i className="hud-tv" style={{ width: clamp(tv, 0, 100) + '%' }} {...tip('Tu vi ' + tv + '%')} />
    <i className="hud-ll" style={{ width: PS.llShow() + '%' }} {...tip('Lịch luyện ' + PS.llShow() + '%')} />
  </>;
}
