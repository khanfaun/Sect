// Thẻ trạng thái trên cùng: ảnh nhân vật (vòng khí huyết/linh lực), tên, cảnh giới, tuổi, đồng hồ, các chỉ số nhanh.
import { Html, PS } from '../html';
import { Ic, Rt, tip } from '../chung';
import { TanThu } from '../chung/TanThu';
import { useState } from 'react';
import { CumTien } from './NutBanDo';

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

// Ô chỉ số nhỏ trong dải cuộn ngang
function O({ cls, ic, l, children, t, act, onClick }) {
  const P = { className: 'x-o ' + (cls || ''), ...tip(t) };
  if (onClick) return <button className={P.className} onClick={onClick}><Ic n={ic} /><span className="x-o-t"><small>{l}</small><b>{children}</b></span></button>;
  const body = <><Ic n={ic} /><span className="x-o-t"><small>{l}</small><b>{children}</b></span></>;
  return act ? <button {...P} data-act={act}>{body}</button> : <span {...P}>{body}</span>;
}

// Thanh tiến độ có nhãn (tu vi, lịch luyện)
function Thanh({ cls, l, v, t }) {
  return (
    <div className={'x-bar ' + cls} {...tip(t)}>
      <span className="x-bar-l">{l}</span>
      <i className="x-bar-r"><b style={{ width: v + '%' }} /></i>
      <span className="x-bar-v">{v}%</span>
    </div>
  );
}

export function Hud() {
  const { G, clamp } = PS;
  const r = G.run, s = PS.S(), t = PS.W().t;
  const left = s.life - r.age, warn = left < s.life * 0.12, pa = PS.PART[PS.partOf(t)];
  const W0 = PS.wounds();
  const hurt = W0.length ? PS.WOUND[W0[0].k].n + (W0.length > 1 ? ' +' + (W0.length - 1) : '') : r.hp < s.maxHp * 0.35 ? 'Khí huyết cạn' : '';
  const hp = clamp(r.hp / Math.max(1, s.maxHp), 0, 1), mp = clamp(r.mp / Math.max(1, s.maxMp), 0, 1);
  const tal = PS.playerTal(), tm = r.tamma, tv = PS.tvShow();
  const [mo, setMo] = useState(false), [vi, setVi] = useState(false);
  const vo = PS.voKnown(), rk = PS.rootKnown();
  const an = PS.anShow ? PS.anShow(r) : PS.needFood && PS.needFood(r);
  const tienTip = 'Hầu bao\nLinh thạch: ' + PS.ltTxt(r) + '\nTiền phàm: ' + PS.fmtBac(r.bac || 0) + '\nThưởng Lệnh: ' + (r.thuongLenh || 0) + (PS.noTip ? PS.noTip(r) : '');
  const tvv = vo ? 0 : clamp(tv, 0, 100), llv = PS.llShow();
  return <div className="x-hud">
    <div className="x-vien">
      <button className="sk-cap" onClick={() => setVi(!vi)}><i className="rh"></i>{PS.fmtN(r.st)}</button>
      <button className="sk-cap" onClick={() => setVi(!vi)}><em className={(r.bac || 0) < 0 ? 'bad' : ''}>{PS.fmtBacS(r.bac || 0)}</em></button>
      <Html as="div" className="sk-cap x-clk" id="clk" {...tip(PS.dateText(t) + '\nBuổi ' + pa.n + ', mùa ' + PS.SEASON[PS.seasonOf(t)])} h={PS.clkStr(t)} />
    </div>
    {vi && <div className="sk-card x-vi" onClick={() => setVi(false)} {...tip(tienTip)}><CumTien r={r} /></div>}
    <div className="x-the">
      <button className={'x-av' + PS.talCls(tal)} data-act="panel" data-arg="char" aria-label="Nhân vật"
        {...tip('Khí huyết ' + PS.pctOf(r.hp, s.maxHp) + ' (nửa trên)\n' + PS.mpName() + ' ' + (s.maxMp ? PS.pctOf(r.mp, s.maxMp) : 'chưa có') + ' (nửa dưới)\nChạm để mở nhân vật')}>
        <Vong hp={hp} mp={mp} />
        <Html className="x-av-i" h={PS.assetImg('hero', 'me', `<span class="av-txt">${PS.esc((r.ten.split(' ').pop() || '?')[0])}</span>`)} />
        {tal && tal.tier >= 0 && <Html className="tfr" h={PS.talFrameSVG(tal, 'hudtf')} />}
      </button>
      <button className="sk-the x-the-t" onClick={() => setMo(!mo)} aria-label="Xem chỉ số">
        <b className="x-rl"><TenCanhGioi /></b>
        <span className="x-nm">{r.ten}</span>
        <span className="x-mini"><i className="x-mb tv"><b style={{ width: tvv + '%' }} /></i><i className="x-mb ll"><b style={{ width: llv + '%' }} /></i></span>
        {hurt && <small className="bad">{hurt}</small>}
      </button>
    </div>
    {mo && <div className="x-so" onClick={e => { if (e.target === e.currentTarget) setMo(false); }}>
      <div className="sk-card x-so-k">
        <Thanh cls="tv" l="Tu vi" v={tvv} t={vo ? 'Vô linh căn — chưa thể tu luyện' : !rk ? 'Chưa biết mình có tiên duyên hay không' : 'Tu vi ' + tv + '%: đầy thì đột phá / xung kích'} />
        <Thanh cls="ll" l="Lịch luyện" v={llv} t={'Lịch luyện ' + llv + '%\nTăng khi đánh trận, tới nơi mới, quen người mới, làm việc.'} />
        <p className={'x-tho' + (warn ? ' bad' : '')}>{Math.floor(r.age)} tuổi · thọ còn {Math.max(0, Math.floor(left))} năm</p>
        <div className="x-os">
          <O ic="sword" l="Lực chiến" t={'Lực chiến: ' + PS.rateOf('lc', PS.lucChien()).t + '\nSo với người cùng cảnh giới.'}><Rt k="lc" v={PS.lucChien()} /></O>
          <O ic="seat" l="Tốc tu" t={'Tốc độ tu luyện khi bế quan ở đây: ' + PS.rateOf('bq', PS.bqReal(), 'toc').t + '\nThổ nạp: ' + PS.rateOf('thonap', PS.thonapPct(), 'toc').t}><Rt k="bq" v={PS.bqReal()} kind="toc" /></O>
          <O cls={tm >= 60 ? 'hi' : ''} ic="skull" l="Tâm ma" t={'Tâm ma: ' + PS.tmWord(tm).toLowerCase() + '\nĐầy sẽ phải đối mặt với chính mình'}>{PS.tmWord(tm)}</O>
          <O ic="lotus" l="Đạo tâm" t={'Đạo tâm: ' + PS.rateOf('tam', s.tam, 'muc').t + '\nChống ảo cảnh, giúp đột phá'}><Rt k="tam" v={s.tam} kind="muc" /></O>
          {an && <O cls={'an' + (PS.anState(r) !== 'no' ? ' hi' : '')} ic="clover" l="Cái ăn" act="anMuc" t={'Cái ăn: ' + PS.contentText('an.' + PS.anState(r)) + (r.doi ? ' (' + r.doi + ' ngày thiếu ăn)' : '') + '\nMức ăn: ' + PS.anMuc(r).n + ' · ' + PS.fmtBac(PS.anCost(r) * 30) + '/tháng\nChạm để đổi mức ăn'}>{PS.anState(r) !== 'no' ? PS.contentText('an.' + PS.anState(r)) : PS.anMuc(r).n}</O>}
        </div>
      </div>
    </div>}
    <TanThu />
  </div>;
}
