// Màn chính "Động phủ" (giao diện mới, theo kiểu game tu tiên điện thoại):
// trên: thẻ nhân vật (trái), bảng tài nguyên (phải), lưới chức năng phụ; giữa: trăng, nhân vật ngồi thiền,
// hai quả cầu Độ kiếp / Tâm ma; dưới: hiệu suất tu luyện, nút Bế quan, hai nút thoi; hàng nút tròn; nhật ký.
import { Html, PS } from '../html';
import { tip } from '../chung';
import { TanThu } from '../chung/TanThu';

// đường dẫn ảnh giao diện (ảnh 2D trong src/assets/ui); nếu mở từ thư mục khác thì thử đường thứ hai
export const anh = n => 'src/assets/ui/' + n + '.webp';
export function Anh({ n, cls, alt }) {
  return <img className={cls} src={anh(n)} alt={alt || ''} draggable="false"
    onError={e => { const i = e.currentTarget; if (!i.dataset.f) { i.dataset.f = 1; i.src = 'assets/ui/' + n + '.webp'; } }} />;
}

// Nút tròn có ảnh + chữ dưới
export function NutAnh({ n, l, act, arg, dot, dis, t, cls }) {
  return (
    <button className={'z-nut ' + (cls || '')} data-act={act} data-arg={arg} disabled={!!dis} {...tip(t)}>
      <Anh n={n} cls="z-nut-a" /><span className="z-nut-l">{l}</span>{dot && <i className="z-dot" />}
    </button>
  );
}

function DongTien({ l, v, bad }) {
  return <div className="z-tn"><span>{l}</span><b className={bad ? 'bad' : ''}>{v}</b></div>;
}

export function TrangChu() {
  const { G, clamp } = PS;
  const r = G.run, s = PS.S(), t = PS.W().t;
  const tv = PS.tvShow(), vo = PS.voKnown(), brk = PS.canBreak(), st = PS.btState(), bqNo = PS.bqCan();
  const tvv = vo ? 0 : clamp(tv, 0, 100), llv = PS.llShow();
  const n = PS.nodeById(r.at), evs = n && !n.wp ? PS.nodeEvs(n).length : 0;
  const nu = r.g === 'nu', dem = PS.partOf(t) === 'dem';
  const quest = r.quests.some(q => q.state === 'open');
  const W0 = PS.wounds();
  const hurt = W0.length ? PS.WOUND[W0[0].k].n : r.hp < s.maxHp * 0.35 ? 'Khí huyết cạn' : '';
  const kiepL = st === 'bc' ? 'Bình cảnh' : st === 'xk' || (brk && PS.isPham()) ? 'Xung kích' : brk ? 'Đột phá' : 'Độ kiếp';
  const log = (r.log || []).slice(-4);
  return (
    <div className="z-home">
      <Anh n={dem ? 'nen-dong-phu-dem' : 'nen-dong-phu'} cls="z-nen" />

      {/* --- tầng 1: thẻ nhân vật + tài nguyên --- */}
      <div className="z-top">
        <button className="z-the" data-act="panel" data-arg="char" {...tip('Mở bảng nhân vật')}>
          <Html className="z-av" h={PS.assetImg('hero', 'me', `<span class="av-txt">${PS.esc((r.ten.split(' ').pop() || '?')[0])}</span>`)} />
          <span className="z-the-t">
            <b>{r.ten}</b>
            <small>{PS.kiepName(r.kiep)} · {Math.floor(r.age)} tuổi</small>
            <em>{PS.realmLabel()}</em>
          </span>
          {hurt && <i className="z-hurt">{hurt}</i>}
        </button>
        <div className="z-tai" {...tip('Linh thạch: ' + PS.ltTxt(r) + '\nTiền phàm: ' + PS.fmtBac(r.bac || 0))}>
          <DongTien l="Linh thạch" v={PS.fmtN(r.st)} />
          <DongTien l="Tiền phàm" v={PS.fmtBacS(r.bac || 0)} bad={(r.bac || 0) < 0} />
          <DongTien l="Thọ nguyên" v={Math.max(0, Math.floor(s.life - r.age)) + ' năm'} bad={s.life - r.age < s.life * 0.12} />
        </div>
      </div>

      {/* --- tầng 2: lưới chức năng phụ --- */}
      <div className="z-luoi">
        <NutAnh n="nut-so-tay" l="Sổ tay" act="panel" arg="journal" dot={quest} />
        <NutAnh n="nut-giao-tinh" l="Giao tình" act="panel" arg="bonds" />
        <NutAnh n="nut-thien-ha" l="Thiên hạ" act="panel" arg="affairs" />
        <NutAnh n="nut-canh-gioi" l="Cảnh giới" act="cgOpen" />
        <NutAnh n="nut-cai-dat" l="Cài đặt" act="panel" arg="more" />
        <NutAnh n="nut-thu" l="Thư tín" act="sapCo" arg="Thư tín" cls="soon" />
        <NutAnh n="nut-xep-hang" l="Xếp hạng" act="sapCo" arg="Phong vân bảng" cls="soon" />
        <NutAnh n="nut-ky-su" l="Kỷ sự" act="sapCo" arg="Kỷ sự" cls="soon" />
      </div>
      {n && !n.wp && <button className="z-noi" data-act="enter" {...tip(PS.ENTER_L[n.type] || 'Vào')}>
        <Anh n="nut-ky-ngo" cls="z-noi-a" /><span><small>Đang ở</small><b>{n.name}</b></span>{evs > 0 && <i className="z-dot">{evs}</i>}
      </button>}

      {/* --- tầng 3: nhân vật và hai quả cầu --- */}
      <div className="z-giua">
        <Anh n="dai-da" cls="z-dai" />
        <Anh n={nu ? 'nhan-vat-nu' : 'nhan-vat-nam'} cls={'z-nguoi' + (brk ? ' sang' : '')} />
        <Anh n="cau-tu" cls="z-cau-tu" />
        <button className={'z-qc trai' + (brk ? ' on' : '')} data-act="hudBq" disabled={!!bqNo || vo}
          {...tip(vo ? 'Vô linh căn: chưa thể tu luyện' : st === 'bc' ? 'Bình cảnh: tu vi đã đầy, cần lịch luyện thêm' : brk ? 'Đủ điều kiện: vào bế quan để ' + kiepL.toLowerCase() : 'Tu vi chưa đầy')}>
          <Anh n="cau-kiep" cls="z-qc-a" /><b className="z-qc-t">{kiepL}</b>
          <small>{PS.realmLabel()}<br />Tu vi {tvv}%</small>
        </button>
        <div className={'z-qc phai' + (r.tamma >= 60 ? ' on' : '')} {...tip('Tâm ma: ' + PS.tmWord(r.tamma).toLowerCase() + '\nĐủ 100 sẽ phải đối mặt với chính mình. Tĩnh tọa, dưỡng thương, bế quan để giảm.')}>
          <Anh n="cau-ma" cls="z-qc-a" /><b className="z-qc-t">Tâm ma</b>
          <small>{PS.tmWord(r.tamma)}<br />{Math.round(r.tamma || 0)}/100</small>
        </div>
      </div>

      {/* --- tầng 4: tu luyện --- */}
      <div className="z-tu">
        <NutAnh n="thoi-linh-can" l="Linh căn" act="moBang" arg="char:base" cls="thoi" />
        <div className="z-tu-g">
          <p>Hiệu suất tu luyện: <b>{PS.rateOf('bq', PS.bqReal(), 'toc').t}</b></p>
          <i className="z-bar"><b style={{ width: tvv + '%' }} /><span>Tu vi {tvv}%</span></i>
          <p className="z-ll">Lịch luyện {llv}%</p>
          <button className="z-bq" data-act="hudBq" disabled={!!bqNo || vo} {...tip(vo ? 'Vô linh căn: chưa thể bế quan' : bqNo || 'Bế quan tu luyện ngay tại đây')}>
            <Anh n={bqNo || vo ? 'nut-xam' : 'nut-vang'} cls="z-bq-a" /><span>Bế quan</span>
          </button>
        </div>
        <NutAnh n="thoi-cong-phap" l="Công pháp" act="moBang" arg="char:hoc" cls="thoi" />
      </div>

      {/* --- tầng 5: hàng nút chính --- */}
      <nav className="z-hang">
        <NutAnh n="nut-tui" l="Túi đồ" act="bagOpen" />
        <NutAnh n="nut-luyen-che" l="Luyện chế" act="panel" arg="craft" />
        <NutAnh n="nut-hanh-tau" l="Hành tẩu" act="xemMap" cls="lon" t="Mở bản đồ để đi lại" />
        <NutAnh n="nut-mon-phai" l="Tông môn" act="panel" arg="tong" />
        <NutAnh n="nut-linh-thu" l="Linh thú" act="panel" arg="pets" dot={r.eggs && r.eggs.length > 0} />
      </nav>

      {/* --- nhật ký --- */}
      {log.length > 0 && <div className="z-log">
        {log.map((x, i) => <Html as="p" key={i} h={'<i>[' + x.a + ' tuổi]</i> ' + PS.txt(String(x.t))} />)}
      </div>}
      <div className="z-tut"><TanThu /></div>
    </div>
  );
}
