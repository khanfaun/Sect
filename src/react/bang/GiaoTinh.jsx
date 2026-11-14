// Bảng giao tình: nhân mạch (quan hệ, quen biết, đồng hành, ân, oán, kẻ thù truyền kiếp),
// Thiên Kiêu Bảng, các tông môn. Từng dòng người (bondRow) vẫn dùng bản HTML cũ.
import { Html, PS } from '../html';
import { Ic, Tabs } from '../chung';
import { Win } from './Khung';

const AL = { chinh: 'chính đạo', ta: 'tà đạo', ma: 'ma đạo', trung: 'trung lập', phat: 'Phật môn' };
// danh sách dòng người (chuỗi HTML từ bondRow)
const Rows = ({ h }) => <Html as="div" className="rows" h={h} />;

function NhanMach({ R, w }) {
  const { G, REL_T, ENT_T, REG } = PS;
  const r = G.run, B = PS.bonds(), N = r.npcs || {};
  const rel = Object.keys(B).map(n => PS.bondRow(n, null, REL_T[B[n]].n, '', [], false)).join('');
  const known = Object.values(N).filter(o => !B[o.n] && !/^@/.test(o.n) && o.met).slice(-20).reverse()
    .map(o => PS.bondRow(o.n, o.g, o.type && ENT_T[o.type] ? ENT_T[o.type].n : 'Người quen', '', [], false)).join('');
  const seed = (s, cls) => PS.bondRow(s.ten, null, cls === 'an' ? 'Chịu ơn ngươi' : 'Mang thù với ngươi', '', [['Chuyện cũ', s.d], ['Vùng', REG[s.r || 0].n]]);
  return <>
    <h4 className="sgrp">Quan hệ <small>{Object.keys(B).length}</small></h4>
    {rel ? <Rows h={rel} /> : <p className="hint">Chưa kết nghĩa, bái sư hay kết đạo lữ với ai.</p>}
    <h4 className="sgrp">Quen biết</h4>
    {known ? <Rows h={known} /> : <p className="hint">Chưa quen ai trên đường.</p>}
    <h4 className="sgrp">Đồng hành</h4>
    {R.party.length ? <Rows h={R.party.map(p => PS.bondRow(p.ten, null, 'Đồng hành', '', [['Còn đi cùng', PS.durH(Math.max(0, p.until - w.t))]])).join('')} /> : <p className="hint">Đang đi một mình.</p>}
    <h4 className="sgrp">Ân tình <small>{R.an.length}</small></h4>
    {R.an.length ? <Rows h={R.an.map(s => seed(s, 'an')).join('')} /> : <p className="hint">Chưa ai nợ ngươi điều gì.</p>}
    <h4 className="sgrp">Oán thù <small>{R.oan.length}</small></h4>
    {R.oan.length ? <Rows h={R.oan.map(s => seed(s, 'oan')).join('')} /> : <p className="hint">Chưa kết oán với ai.</p>}
    {R.nemesis && <>
      <h4 className="sgrp">Kẻ thù truyền kiếp</h4>
      <div className="rows"><div className="row"><span className="r-i">{R.nemesis.i || '🗡️'}</span><span className="r-t"><b>{R.nemesis.n}</b><small>kẻ đã kết liễu một kiếp trước của ngươi, nay mạnh hơn xưa</small></span></div></div>
    </>}
  </>;
}

function ThienKieuBang({ R, w }) {
  const { G, REALM, EL } = PS;
  const r = G.run;
  return <>
    {r.bang ? <>
      <p className="hint">Công bố năm {r.bang.y || ''}, khi ngươi {r.bang.nam} tuổi</p>
      <div className="rows">
        {r.bang.ds.map((x, i) => <div key={i} className={'row' + (x.i < 0 ? ' taken' : '')}><span className="r-i">{i + 1}</span><span className="r-t"><b>{x.ten}</b></span><span className="r-x">{REALM[x.realm]}</span></div>)}
      </div>
    </> : <p className="hint">Thiên Kiêu Bảng chưa tới kỳ công bố (năm {w.bangY}).</p>}
    <h4 className="sgrp">Thiên kiêu đương thời</h4>
    <Rows h={R.rivals.map(x => PS.bondRow(x.ten, x.g, x.tt + ' của ' + x.sect, x.alive ? REALM[x.realm] : 'đã mất',
      [['Danh hiệu', x.tt], ['Tông môn', x.sect], ['Cảnh giới', x.alive ? REALM[x.realm] : 'đã mất'], ['Thuộc tính', x.el && EL[x.el] ? EL[x.el].n : '']], !x.alive)).join('')} />
  </>;
}

function TongMon({ R }) {
  const realm = Math.min(5, (PS.G.run.realm || 0) + 2);
  return <>
    <p className="hint">{R.mine ? 'Ngươi là đệ tử tông môn.' : 'Ngươi là tán tu, chưa vào tông môn nào.'}</p>
    <div className="rows">
      {R.sects.map((s, i) => {
        const L = PS.favLv(PS.sectFav(i));
        const people = PS.sectElders(i).map(e => PS.bondRow('@' + i + ':' + e.t, null, e.t, '', [], false, { disp: e.ten, realm })).join('')
          + PS.sectDisciples(i).slice(0, 6).map(n => PS.bondRow(n, null, 'Đệ tử', '', [], false)).join('');
        return (
          <details key={i} className="bond">
            <summary className="row">
              <span className="r-i sect-i"><img src={PS.sectPic(s.n, s.al)} alt="" /></span>
              <span className="r-t"><b>{s.n}</b><small>{AL[s.al] || s.al || ''}</small></span>
              <span className={'fav f-' + L[2]}>{L[1]}</span>
              <i className="cc-ch"><Ic n="down" /></i>
            </summary>
            <Html as="div" className="bond-d" h={'<p class="hint">Hảo cảm của tông môn tính từ cao tầng (nặng hơn) và đệ tử.</p>' + people} />
          </details>
        );
      })}
    </div>
  </>;
}

export function GiaoTinh() {
  const R = PS.relations(), w = PS.W(), tab = PS.UI.tab.bonds || 'an';
  return (
    <Win title="Giao tình" cls="tall">
      <Tabs k="bonds" list={[['an', 'Nhân mạch'], ['bang', 'Thiên Kiêu Bảng'], ['tong', 'Tông môn']]} cur={tab} />
      {tab === 'an' && <NhanMach R={R} w={w} />}
      {tab === 'bang' && <ThienKieuBang R={R} w={w} />}
      {tab === 'tong' && <TongMon R={R} />}
    </Win>
  );
}
