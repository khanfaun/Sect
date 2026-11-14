// Màn chiến đấu: thanh hành động, kẻ địch, khung cảnh (pháp tướng, hào quang), phe ta, diễn biến,
// bảng lệnh (tấn công / phòng thủ / túi đồ / qua lượt), lớp né / chí mạng / ra chiêu, hàng nút phụ.
import { Html, PS } from '../html';
import { Ic, Tranh, pcs, tip } from '../chung';
import { ThanhHanhDong, TheMinh, TheNguoi } from './TheNguoi';

const H = ({ h }) => <Html style={{ display: 'contents' }} h={h} />;
const PT_SVG = () => PS.ptFigSVG();

function KhungCanh({ sc, me, foes, al }) {
  const { G, CFG } = PS;
  const r = G.run, n = PS.curNode();
  const figs = [];
  al.forEach((u, i) => figs.push(['nhan', 0.3 - i * 0.13, 0.5 - (u.isMain ? 0 : 0.12), 0, u.name].join(':')));
  foes.forEach((u, i) => figs.push([PS.unitKind(u), 0.72 + i * 0.12 - (foes.length - 1) * 0.06, u.kind === 'kiep' ? 0.95 : 0.5 - (foes.length > 1 ? 0.08 : 0), 1, u.name].join(':')));
  const aura = (sc.ht ? ' ht' : '') + (me && me.st && me.st.soul > 0 ? ' soul' : '');
  return (
    <div className="cb-art" id="cbArt" data-nf={foes.length}>
      <button className="cb-more" data-act="panel" data-arg="more" aria-label="Thêm"><Ic n="more" /></button>
      <span className="cspd cspd-art">
        {[1, 2, 3].map(k => <button key={k} className={(CFG.cspeed || 1) === k ? 'on' : ''} data-act="cspd" data-arg={k} {...tip('Tốc độ trận ×' + k)}>×{k}</button>)}
      </span>
      <Tranh seed={'cb' + r.at + sc.en.n} reg={r.region} type={n ? n.type : ''} cls="" figs={figs.join(',')} />
      {aura && me.hp > 0 && <div className={'cb-aura' + aura} style={{ left: '30%', top: '72%' }}><i></i><i></i><i></i><i></i><i></i><b></b></div>}
      {!!sc.pt && <div className={'pt-fig el-' + sc.pt.el} {...tip(sc.pt.n)}><H h={PT_SVG()} /><b>{sc.pt.n}</b></div>}
    </div>
  );
}

// Một nút chiêu
function NutChieu({ id, sk, lv, t, me }) {
  const c = PS.skillCost(sk), no = me.mp < c || (PS.isPham() && String(id)[0] !== '_');
  const d = sk.fx.p ? Math.round(sk.fx.p * 100) + '% uy lực' : '';
  const q = sk.t != null && String(sk.id || '')[0] !== '_';
  return (
    <button className={'sk' + (q ? ' qk' : '')} data-act="skill" data-arg={id} disabled={no} style={q ? pcs(sk.t) : undefined} {...tip(t || PS.skillTip(sk, lv))}>
      <H h={PS.elSeal(sk.el)} />
      <span className="sn"><span className={q ? 'qt' : ''}>{sk.n}</span>{lv > 1 && <> <i>{'Ⅰ Ⅱ Ⅲ'.split(' ')[lv - 1]}</i></>}<small>{[d, c ? c + ' linh lực' : '', sk.fx.charge ? 'tụ lực' : ''].filter(Boolean).join(' · ')}</small></span>
    </button>
  );
}

function BangLenh({ sc, me, rp, pickMode }) {
  const { G, UI, CFG, PILL, SK, PCOL } = PS;
  const r = G.run;
  if (!(rp && !CFG.autoFight)) {
    const t = sc.dodge ? (sc.dodge.lit || sc.dodge.blk ? 'Chạm “Đỡ” đúng lúc vòng khép lại' : 'Đòn đánh tới! Chạm “Né” đúng lúc vòng khép lại') : sc.qte ? 'Chạm đúng lúc vạch vào vùng vàng' : CFG.autoFight ? 'Đang tự đánh…' : '…';
    return <p className="hint cwait">{t}</p>;
  }
  if (rp.dazed) return <>
    <p className="cb-warn">Định lực cạn: ngươi choáng váng, buộc phải bỏ lượt này.</p>
    <div className="skills main4"><button className="sk hl" data-act="skill" data-arg="_wait"><span className="cbi"><Ic n="skip" /></span><span className="sn">Qua lượt</span></button></div>
  </>;
  if (pickMode) return <>
    <p className="hint">Chạm vào kẻ địch để tung {PS.pSkill(UI.pendSk).sk.n}</p>
    <div className="skills"><button className="sk" data-act="cancelSk"><span className="sn">Thôi</span></button></div>
  </>;
  const cp = r.pills.map((p, i) => ({ p, i })).filter(x => PILL[x.p.id].w !== 'bt'), m = UI.menu;
  const back = <button key="back" className="sk mback" data-act="menu" data-arg=""><span className="sn">Quay lại</span></button>;
  const nl = PS.pctOf(PS.NL_PILL, me.maxNl || 1);
  if (m === 'atk') return (
    <div className="skills">
      <NutChieu id="_atk" sk={PS.BASIC} lv={1} t={'Đánh thường bằng chân khí\nKhông tốn linh lực'} me={me} />
      {PS.atkSlots().map(id => { const k = r.skills.find(x => x.id === id); return <NutChieu key={id} id={id} sk={SK[id]} lv={k.lv} me={me} />; })}
      {PS.mindArt() && (
        <button className="sk" data-act="mind" disabled={!PS.nlOk(me, PS.NL_MIND)} {...tip('Đánh vào thức hải đối phương.\nThần thức của ngươi: ' + PS.rateOf('than', PS.S().than).t.toLowerCase() + '. Hơn đối thủ thì làm nó choáng.')}>
          <span className="el">Thần</span><span className="sn">Thần Thức Thứ<small>{PS.pctOf(PS.NL_MIND, me.maxNl || 1)} niệm lực · làm choáng</small></span>
        </button>
      )}
      {(r.dd || []).map((d, j) => {
        const used = sc.ddUsed && sc.ddUsed[j];
        return (
          <button key={'dd' + j} className="sk" data-act="dd" data-arg={j} disabled={!!used || !PS.nlOk(me, PS.NL_DD)} {...tip('Tế ' + d.rel.name + ' từ đan điền ra đánh.\nMỗi trận một lần, không tốn linh lực.')}>
            <H h={PS.elSeal(d.rel.el || 'vo')} /><span className="sn" style={{ color: PCOL[d.rel.tier || 0] }}>Tế {d.rel.name}<small>{used ? 'đã dùng trận này' : 'uẩn dưỡng · mỗi trận một lần'}</small></span>
          </button>
        );
      })}
      {back}
    </div>
  );
  if (m === 'def') return (
    <div className="skills">
      <button className="sk" data-act="skill" data-arg="_block" disabled={me.tl < PS.TL_BLOCK} {...tip('Đỡ đòn: thủ thế, chạy dần từ mốc ra chiêu tới mốc phát lực.\nTrong quãng đó bị đánh thì đỡ được một lần: giảm khoảng 20–30% sát thương, tốn 30% thể lực.\nKhông ai đánh thì không có gì xảy ra.')}>
        <span className="el">Đỡ</span><span className="sn">Đỡ đòn<small>30% thể lực</small></span>
      </button>
      <NutChieu id="_guard" sk={PS.GUARD_SK} lv={1} t={'Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực'} me={me} />
      {PS.defSkills().map(id => { const k = r.skills.find(x => x.id === id); return <NutChieu key={id} id={id} sk={SK[id]} lv={k.lv} me={me} />; })}
      {back}
    </div>
  );
  if (m === 'bag') return <>
    <div className="skills">
      {cp.map(({ p, i }) => (
        <button key={i} className="sk qk" data-act="cpill" data-arg={i} disabled={!PS.nlOk(me, PS.NL_PILL)} style={pcs(p.q)} {...tip(PS.pillTip(p.id, p.q) + '\nDùng trong trận tốn ' + nl + ' niệm lực')}>
          <span className="el">{PILL[p.id].i}</span><span className="sn qt">{PILL[p.id].n}</span>
        </button>
      ))}
      {back}
    </div>
    {!cp.length && <p className="hint">Túi không có gì dùng được trong trận.</p>}
  </>;
  return (
    <div className="skills main4">
      <button className="sk" data-act="menu" data-arg="atk"><span className="cbi"><Ic n="sword" /></span><span className="sn">Tấn công</span></button>
      <button className="sk" data-act="menu" data-arg="def"><span className="cbi"><Ic n="shield" /></span><span className="sn">Phòng thủ</span></button>
      <button className="sk" data-act="menu" data-arg="bag" disabled={!cp.length}><span className="cbi"><Ic n="bag" /></span><span className="sn">Túi đồ<small>{cp.length} món · {nl} niệm lực</small></span></button>
      <button className="sk" data-act="skill" data-arg="_wait" {...tip('Qua lượt: không làm gì, nhường lượt')}><span className="cbi"><Ic n="skip" /></span><span className="sn">Qua lượt</span></button>
    </div>
  );
}

// Lớp né / đỡ (phủ cả màn hình), thanh chí mạng, thanh ra chiêu. key theo lượt để hiệu ứng chạy lại từ đầu.
function CacLop({ sc }) {
  const DG = PS.DG_LEAD, d = sc.dodge;
  return <>
    {!!d && (
      <div key={'dg' + d.id} className="dodge-ov" id="dodgeOv">
        <p>{d.lit ? 'Lôi giáng!' : d.blk ? 'Đỡ đòn!' : 'Đòn đánh tới!'}{d.n > 1 ? ' · ' + d.n + ' nhát' : ''}</p>
        <div className="dg-wrap">
          <span className="dg-ring" style={{ animationDuration: d.T + 's', animationDelay: DG + 's', animationIterationCount: d.n }}></span>
          {/* chữ trên nút được game đổi thẳng khi bấm (Chuẩn!/Khá/Hụt) */}
          <button id="dodgeBtn" className="dodge2">{d.lit || d.blk ? 'Đỡ' : 'Né'}</button>
        </div>
        <small>Chờ vòng vàng thu lại, chạm đúng lúc nó khép vào nút</small>
      </div>
    )}
    {!!sc.critQ && (
      <div key={'cq' + sc.critQ.id} id="critq" className="qte critq">
        <b className="cq-t">Chí mạng!</b><div className="qbar"><i className="cqg"></i><span className="cqm"></span></div>
        <p>Chạm khi vạch chạy vào vùng xanh. Trượt thì đòn vẫn trúng nhưng không chí mạng.</p>
      </div>
    )}
    {!!sc.qte && <div key={'qt' + sc.qte.id} id="qte" className="qte"><div className="qbar"><i className="qg"></i><i className="qy"></i><span className="qm"></span></div><p>Chạm để tung chiêu</p></div>}
  </>;
}

// Hàng nút phụ: huyết thuật (đốt tinh huyết / thọ nguyên), thoát thân, nhận thua, tự động
function HangNutPhu({ sc }) {
  const { UI, CFG } = PS;
  const rp = PS.readyPlayer(sc), rdy = rp && !CFG.autoFight && !rp.dazed, bi = PS.burnInfo(sc);
  let burn = null;
  if (!(sc.kiep || sc.spar)) {
    const dz = rp && rp.dazed, used = rdy && PS.mainUnit(sc).burnedTurn;
    burn = (
      <span className="burnw">
        {!!UI.burnOpen && !sc.done && (
          <div className="burnpop">
            {bi.L.map(o => (
              <div key={o.k} className="bp-o">
                <b>{o.n}</b>
                <ul>{o.d.map((x, i) => <li key={i}>{x}</li>)}<li className="bad">{o.cost}</li></ul>
                {!o.ok && <p className="bad">{o.why}</p>}
                <button className="btn burnb" data-act="burn" data-arg={o.k} disabled={!(rdy && o.ok && !used)}><Ic n="flame" /> {o.n}</button>
              </div>
            ))}
            {!!used && <p className="bad">Lượt này đã dùng huyết thuật.</p>}
            {!!bi.done && <p className="bad">Đã dùng hết huyết thuật trong trận này.</p>}
            <p className="hint">Mỗi lượt một lần. Đốt tinh huyết xong mới đốt được thọ nguyên. Huyết tế mỗi trận một lần.</p>
          </div>
        )}
        <button className={'btn sm burn' + (UI.burnOpen ? ' on' : '')} data-act="burnOpen" disabled={!!(bi.done || dz)}><Ic n="flame" /> {bi.label}</button>
      </span>
    );
  }
  const inj = PS.injured();
  const AUTO = [['autoFight', 'Tự đánh', 'Máy tự chọn chiêu'], ['autoBlk', 'Tự đỡ', 'Máy tự bấm Đỡ khi vòng khép, lúc trúng lúc trượt'], ['autoDg', 'Tự né', 'Máy tự bấm Né khi vòng khép, lúc trúng lúc trượt']];
  return (
    <div className="cb-bot cb-ext">
      {burn}
      {!(sc.boss || sc.kiep || sc.noFlee) && <button className="btn sm" data-act="flee" disabled={!rdy} {...tip('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}><Ic n="run" /> Thoát thân</button>}
      {PS.fightsHuman(sc) && !(sc.kiep || sc.spar || sc.en.n === 'Tâm Ma') && (
        <button className="btn sm" data-act="yield" disabled={!(rdy && !inj)} {...tip(inj ? 'Đang mang thương, đối phương không tha: nhận thua cũng chết.' : 'Buông tay chịu thua.\nNgươi sẽ bị thương vài tháng và bị đối phương lục lấy một phần linh thạch, vài món đồ.')}><Ic n="flag" /> Nhận thua</button>
      )}
      <span className="autow">
        {!!UI.autoOpen && (
          <div className="autopop">
            {AUTO.map(([k, n, t]) => <button key={k} className={'ap-o' + (CFG[k] ? ' on' : '')} data-act="autoTg" data-arg={k} {...tip(t)}><i className="ap-ck">{CFG[k] ? '✓' : ''}</i>{n}</button>)}
          </div>
        )}
        <button className={'btn sm' + ((CFG.autoFight || CFG.autoBlk || CFG.autoDg) ? ' on' : '')} data-act="autoOpen"><Ic n="bolt" /> Tự động</button>
      </span>
    </div>
  );
}

export function TranDau() {
  const { G, UI } = PS;
  const sc = G.run.scene, me = PS.mainUnit(sc), rp = PS.readyPlayer(sc), pickMode = !!(rp && UI.pendSk);
  const foes = sc.units.filter(u => u.side === 'B'), al = sc.units.filter(u => u.side === 'A');
  const party = al.filter(u => !u.isMain), fc = foes.length > 1, lg = sc.log.slice(-3);
  const head = <>
    <ThanhHanhDong sc={sc} />
    <div className={'cb-foes' + (fc ? ' many' : '')}>{foes.map(u => <TheNguoi key={u.id} sc={sc} u={u} pickMode={pickMode} compact={fc} />)}</div>
    <KhungCanh sc={sc} me={me} foes={foes} al={al} />
    <div className="cb-ally">
      <TheMinh sc={sc} u={me} />
      {party.length > 0 && <div className="cb-party">{party.map(u => <TheNguoi key={u.id} sc={sc} u={u} pickMode={false} compact />)}</div>}
    </div>
    <div className="clog" data-act="clog" {...tip('Chạm để xem toàn bộ diễn biến')}>
      {lg.map((l, i) => <p key={sc.log.length - lg.length + i} className={(l.c ? 'lg-' + l.c : '') + ' ' + (i < lg.length - 1 ? 'old' : '')}>{l.t}</p>)}
    </div>
    {!sc.done && PS.injured() && !sc.spar && !sc.kiep && <p className="cb-warn">Đang mang thương: thua trận này là chết.</p>}
  </>;
  if (sc.done) {
    const t = { win: 'Thắng trận', lose: 'Bại trận', flee: 'Thoát thân', dead: sc.kiep ? 'Ngươi tan biến trong thiên kiếp' : 'Ngươi đã ngã xuống' }[sc.over];
    return (
      <section className="cb">
        {head}
        <div className={'cb-end ' + sc.over}>
          <b>{t}</b>
          {!!sc.llGain && <span className="chip up">⚔ +{PS.llShowGain(sc.llGain / (PS.tvPts(G.run.realm) / 100))}% lịch luyện</span>}
          <button className="btn pri wide" data-act="cont">Tiếp tục</button>
        </div>
      </section>
    );
  }
  return (
    <section className="cb">
      {head}
      <div className="cb-cmd"><BangLenh sc={sc} me={me} rp={rp} pickMode={pickMode} /></div>
      <CacLop sc={sc} />
      <HangNutPhu sc={sc} />
    </section>
  );
}
