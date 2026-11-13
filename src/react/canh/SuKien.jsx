// Cảnh sự kiện (kỳ ngộ): lời kể / hội thoại, tin đồn, các lựa chọn kèm điều kiện.
import { Html, PS } from '../html';
import { Chips, Ic, tip } from '../chung';
import { Card, ChoiceBtn, ChoiceExtra, GoBtn, Story } from './Khung';

function CacLuaChon({ sc }) {
  const VC = PS.visChoices(sc);
  const anyOk = VC.some(({ c }) => !PS.needList(c).some(x => !x.ok) && (!c.chk || PS.chkChance(c.chk) >= 0.5));
  let k = 1;
  return (
    <div className="choices">
      {VC.map(({ c, i }) => {
        const bad = PS.needList(c).filter(x => !x.ok);
        const ck = c.chk ? (PS.chkChance(c.chk) >= 0.5 || !anyOk) : true;
        const dis = bad.length > 0 || !ck;
        const bw = bad.filter(x => !/^linh thạch/.test(x.t));
        return [
          <ChoiceBtn key={'b' + i} n={(k++) + '.'} act="choose" arg={i} label={PS.T(c.l, sc.v)} extra={<ChoiceExtra c={c} />} dis={dis} cls={dis ? 'soft' : ''} />,
          bw.length > 0 && <p key={'w' + i} className="why">({bw.map(x => x.t).join(', ')})</p>,
          c.chk && <p key={'c' + i} className={'chreq ' + (ck ? 'ok' : 'bad')}>{PS.CHKN[c.chk[0]]} {ck ? 'đạt yêu cầu' : 'chưa đạt yêu cầu'}</p>,
        ];
      })}
    </div>
  );
}

export function SuKien({ sc }) {
  const { G, UI } = PS;
  const r = G.run, e = PS.EVMAP[sc.id], st = sc.story;
  const qi = st.findIndex(x => typeof x === 'object');
  const choose = sc.phase === 'choose';
  return (
    <Card title={e && e.n || 'Kỳ ngộ'} sub={r.place.n}
      head={choose ? <button className="pl-tg" data-act="evMin" {...tip('Tạm gác lại để xem bản đồ, túi đồ… rồi quay lại chọn sau')}>Để sau <Ic n="down" /></button> : null}
      foot={choose ? null : <GoBtn act="next" label="Tiếp tục" />}>
      {qi < 0 ? <div className="story"><Story story={st} /></div> : <>
        <div className="story"><Story story={st.slice(0, qi)} /></div>
        <div className="dlg" id="dlg">
          {st.slice(qi).map((x, i) => typeof x === 'object'
            ? <p key={i} className="dq">› {x.q}</p>
            : <Html as="p" key={i} className={qi + i >= UI.lastStory ? 'new' : ''} h={PS.txt(x)} />)}
        </div>
      </>}
      {/* tin đồn chỉ hiện lúc đang chọn, ghi rõ là tin đồn để không lẫn vào lời kể */}
      {sc.news && choose && <p className="news"><b>Tin đồn giang hồ:</b> {sc.news}</p>}
      <Chips list={sc.chips} />
      {choose && <CacLuaChon sc={sc} />}
    </Card>
  );
}

// Màn giới thiệu khi tới vùng mới
export function GioiThieuVung({ sc }) {
  const r = PS.G.run, og = PS.ORIGIN.find(o => o.id === r.origin);
  return (
    <div className="intro" data-act="regionGo">
      <div className="in-b">
        <small>{PS.kiepName(r.kiep)}</small><h1>{r.ten}</h1>
        <p className="in-o">{og.n} · quê ở {r.que}</p>
        <p className="in-t">{sc.text}</p>
        {sc.sub && <p className="hint">{sc.sub}</p>}
        <p className="hint tap">Chạm để lên đường</p>
      </div>
    </div>
  );
}
