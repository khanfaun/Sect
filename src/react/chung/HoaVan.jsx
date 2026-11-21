// Bộ tranh 2D vẽ bằng SVG cho giao diện mới (phong cách game tu tiên điện thoại: sương xanh, trăng lớn,
// nhân vật ngồi thiền giữa cảnh, quả cầu phát sáng, nút tròn viền vàng).
import { PS } from '../html';

// Cảnh nền động phủ: trời sương xanh nhạt, trăng lớn, núi xa nhiều lớp, mây trôi, thông, đá tảng
export function CanhDongPhu({ dem }) {
  return (
    <svg className="y-canh" viewBox="0 0 400 760" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <linearGradient id="yTroi" x1="0" y1="0" x2="0" y2="1">
          {dem ? <><stop offset="0" stopColor="#3d5674" /><stop offset=".5" stopColor="#7d97b0" /><stop offset="1" stopColor="#c9d6df" /></>
            : <><stop offset="0" stopColor="#c6d9e6" /><stop offset=".45" stopColor="#e6eef2" /><stop offset="1" stopColor="#f4f6f3" /></>}
        </linearGradient>
        <radialGradient id="yTrang" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fffdf4" /><stop offset=".62" stopColor="#fbf3dc" /><stop offset=".8" stopColor="#f6ead0" stopOpacity=".55" /><stop offset="1" stopColor="#f6ead0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="yNui1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#a8bfce" /><stop offset="1" stopColor="#dbe6ec" stopOpacity="0" /></linearGradient>
        <linearGradient id="yNui2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#7f9db3" /><stop offset="1" stopColor="#cfdde5" stopOpacity=".2" /></linearGradient>
        <linearGradient id="yNui3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#5d7f98" /><stop offset=".7" stopColor="#a9c0cf" stopOpacity=".5" /><stop offset="1" stopColor="#e8eef0" stopOpacity="0" /></linearGradient>
        <linearGradient id="ySuong" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#fff" stopOpacity="0" /><stop offset=".5" stopColor="#fff" stopOpacity=".75" /><stop offset="1" stopColor="#fff" stopOpacity="0" /></linearGradient>
        <linearGradient id="yDa" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#6f8798" /><stop offset="1" stopColor="#c3d1da" /></linearGradient>
        <filter id="yMo" x="-20%" y="-20%" width="140%" height="140%"><feGaussianBlur stdDeviation="6" /></filter>
        <filter id="yMo2"><feGaussianBlur stdDeviation="2" /></filter>
      </defs>
      <rect width="400" height="760" fill="url(#yTroi)" />
      {/* trăng */}
      <circle cx="200" cy="250" r="180" fill="url(#yTrang)" />
      <circle cx="200" cy="250" r="118" fill="#fffaf0" opacity=".9" />
      <g opacity=".08" fill="#c7b58a"><circle cx="160" cy="220" r="22" /><circle cx="236" cy="286" r="14" /><circle cx="228" cy="206" r="9" /></g>
      {/* núi xa */}
      <path d="M-10 380C30 340 60 300 95 318S150 270 180 300 230 250 262 286 320 300 350 270 400 290 410 300V520H-10Z" fill="url(#yNui1)" />
      <path d="M-10 430C20 400 40 360 70 372S110 330 140 360 168 350 190 372 240 330 270 360 330 350 360 330 410 360V560H-10Z" fill="url(#yNui2)" />
      <rect y="380" width="400" height="120" fill="url(#ySuong)" />
      {/* vách núi hai bên */}
      <path d="M-10 300C10 290 30 320 40 360S60 420 50 470 70 520 60 560H-10Z" fill="url(#yNui3)" />
      <path d="M410 280C385 290 372 330 365 370S340 430 352 480 336 540 345 580H410Z" fill="url(#yNui3)" />
      {/* cây thông nghiêng bên phải */}
      <g fill="#46657c" opacity=".75">
        <path d="M368 372c-8-10-30-12-44-6 12 2 22 6 30 12-14-2-30 2-40 10 16-2 32 0 46 6z" />
        <path d="M378 330c-10-8-28-8-40-2 10 2 18 5 26 10-12 0-24 4-32 11 14-3 28-2 40 3z" />
        <path d="M372 400l4-80 3 0-2 84z" />
      </g>
      {/* mây trôi */}
      <g className="y-may" fill="#fff" opacity=".85" filter="url(#yMo)">
        <ellipse cx="60" cy="470" rx="90" ry="16" /><ellipse cx="330" cy="440" rx="100" ry="14" /><ellipse cx="200" cy="520" rx="160" ry="18" />
      </g>
      {/* đá thiền ở giữa */}
      <path d="M90 600C110 572 160 560 200 562S292 574 312 602C320 626 300 646 260 652S140 656 108 646 82 620 90 600Z" fill="url(#yDa)" />
      <path d="M112 600C140 584 180 580 210 582S280 592 296 606" fill="none" stroke="#e9f0f3" strokeWidth="2" opacity=".7" />
      {/* sương phủ chân */}
      <rect y="600" width="400" height="160" fill="#f4f7f6" opacity=".55" filter="url(#yMo)" />
      <path d="M-10 690C60 660 120 680 200 668S330 650 410 676V770H-10Z" fill="#f6f8f6" opacity=".9" />
    </svg>
  );
}

// Nhân vật ngồi thiền (kiểu tranh chibi thanh tú), tóc búi; nữ có hai lọn tóc và trâm hoa.
export function NguoiNgoiThien({ nu, sang }) {
  const ao = nu ? ['#fdfcf7', '#d7e7d2', '#7fae8e'] : ['#fbfcfd', '#cfdcea', '#7d9ec2'];
  return (
    <svg className={'y-nguoi' + (sang ? ' sang' : '')} viewBox="0 0 300 330" aria-hidden="true">
      <defs>
        <radialGradient id="yHao" cx="50%" cy="55%" r="50%">
          <stop offset="0" stopColor="#bfe9ff" stopOpacity=".85" /><stop offset=".45" stopColor="#bfe0ff" stopOpacity=".35" /><stop offset="1" stopColor="#bfe0ff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="yAo" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={ao[0]} /><stop offset=".6" stopColor={ao[1]} /><stop offset="1" stopColor={ao[2]} /></linearGradient>
        <linearGradient id="yAoTrong" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor={nu ? '#5f8f73' : '#3f5f88'} /><stop offset="1" stopColor={nu ? '#2f5a45' : '#22385a'} /></linearGradient>
        <linearGradient id="yToc" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stopColor="#2a2f3a" /><stop offset="1" stopColor="#11141b" /></linearGradient>
        <radialGradient id="yCau" cx="40%" cy="35%" r="65%"><stop offset="0" stopColor="#ffffff" /><stop offset=".35" stopColor="#9fe6ff" /><stop offset=".75" stopColor="#3f8ff0" /><stop offset="1" stopColor="#2a4fd0" /></radialGradient>
        <radialGradient id="yCauHao" cx="50%" cy="50%" r="50%"><stop offset="0" stopColor="#bff3ff" stopOpacity=".9" /><stop offset="1" stopColor="#7fc7ff" stopOpacity="0" /></radialGradient>
      </defs>
      <ellipse className="y-hao" cx="150" cy="190" rx="150" ry="140" fill="url(#yHao)" />
      {/* tóc dài phía sau */}
      <path d="M118 96C104 130 100 180 108 220L192 220C200 180 196 130 182 96Z" fill="url(#yToc)" />
      {/* thân áo ngồi kiết già */}
      <path d="M30 300C40 262 78 246 104 240L196 240C222 246 260 262 270 300C276 316 262 326 240 326H60C38 326 24 316 30 300Z" fill="url(#yAo)" />
      <path d="M60 300C90 290 120 296 150 300S214 290 240 300" fill="none" stroke={ao[2]} strokeWidth="1.5" opacity=".6" />
      {/* thân trên */}
      <path d="M112 146C100 150 90 170 92 196L98 248H202L208 196C210 170 200 150 188 146C172 140 128 140 112 146Z" fill="url(#yAo)" />
      {/* tay áo rủ */}
      <path d="M96 160C70 178 60 230 70 270C82 286 112 282 130 272L138 250C120 246 108 230 106 206Z" fill="url(#yAo)" />
      <path d="M204 160C230 178 240 230 230 270C218 286 188 282 170 272L162 250C180 246 192 230 194 206Z" fill="url(#yAo)" />
      <path d="M76 262C90 274 112 274 128 266M224 262C210 274 188 274 172 266" fill="none" stroke={ao[2]} strokeWidth="1.4" opacity=".7" />
      {/* cổ áo + áo trong */}
      <path d="M134 146L150 196L166 146C160 142 140 142 134 146Z" fill="url(#yAoTrong)" />
      <path d="M128 148L150 204L172 148" fill="none" stroke="#fff" strokeWidth="3" />
      <rect x="112" y="214" width="76" height="12" rx="3" fill="url(#yAoTrong)" />
      <path d="M150 226l-6 26M150 226l7 24" stroke={nu ? '#2f5a45' : '#22385a'} strokeWidth="3" strokeLinecap="round" />
      {/* cổ + đầu */}
      <path d="M140 128h20v20h-20z" fill="#f1d6c4" />
      <ellipse cx="150" cy="110" rx="25" ry="29" fill="#f7e4d6" />
      <ellipse cx="136" cy="120" rx="5" ry="3" fill="#f3b9a6" opacity=".5" /><ellipse cx="164" cy="120" rx="5" ry="3" fill="#f3b9a6" opacity=".5" />
      <path d="M137 111q5 3 10 0M153 111q5 3 10 0" fill="none" stroke="#3a2c2a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M135 102q6-3 11-1M154 101q6-2 11 1" fill="none" stroke="#2a2f3a" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M146 127q4 2 8 0" fill="none" stroke="#c97a6f" strokeWidth="1.6" strokeLinecap="round" />
      {/* tóc trước + búi */}
      <path d="M124 108C122 86 136 76 150 76S178 86 176 108C170 96 160 92 150 94S130 96 124 108Z" fill="url(#yToc)" />
      <path d="M125 104C122 118 124 132 128 140C126 126 128 114 133 104Z" fill="url(#yToc)" />
      <path d="M175 104C178 118 176 132 172 140C174 126 172 114 167 104Z" fill="url(#yToc)" />
      <ellipse cx="150" cy="70" rx="14" ry="11" fill="url(#yToc)" />
      {nu ? <>
        <ellipse cx="124" cy="78" rx="9" ry="8" fill="url(#yToc)" /><ellipse cx="176" cy="78" rx="9" ry="8" fill="url(#yToc)" />
        <circle cx="168" cy="66" r="4" fill="#f2a9b8" /><circle cx="173" cy="70" r="3" fill="#f7c9d3" />
      </> : <path d="M136 66h28v5h-28z" fill="#e6c26e" />}
      <path d="M150 60v-6" stroke="#e6c26e" strokeWidth="2" />
      {/* quả cầu linh khí trong tay */}
      <circle className="y-cau-hao" cx="150" cy="252" r="34" fill="url(#yCauHao)" />
      <circle cx="150" cy="252" r="16" fill="url(#yCau)" />
      <path d="M150 238a7 7 0 0 1 0 14a7 7 0 0 0 0 14" fill="none" stroke="#fff" strokeWidth="1.4" opacity=".8" />
      <path d="M126 262C134 270 166 270 174 262" fill="#f7e4d6" />
    </svg>
  );
}

// Quả cầu lớn hai bên (Độ kiếp: lửa cam đỏ; Tâm ma: tím hồng)
export function QuaCau({ loai }) {
  const C = loai === 'ma' ? ['#fff0ff', '#e88ff5', '#9a3fd6', '#4b1c8f'] : loai === 'kiep' ? ['#fffbe0', '#ffc24a', '#f2662a', '#a51d14'] : ['#ffffff', '#cfe9ff', '#7fa8d8', '#4a6aa0'];
  const id = 'yQc' + loai;
  return (
    <svg className={'y-qc ' + loai} viewBox="0 0 100 100" aria-hidden="true">
      <defs>
        <radialGradient id={id} cx="42%" cy="38%" r="62%"><stop offset="0" stopColor={C[0]} /><stop offset=".3" stopColor={C[1]} /><stop offset=".7" stopColor={C[2]} /><stop offset="1" stopColor={C[3]} /></radialGradient>
        <radialGradient id={id + 'h'} cx="50%" cy="50%" r="50%"><stop offset=".5" stopColor={C[1]} stopOpacity=".6" /><stop offset="1" stopColor={C[1]} stopOpacity="0" /></radialGradient>
      </defs>
      <circle className="y-qc-h" cx="50" cy="50" r="50" fill={'url(#' + id + 'h)'} />
      <circle cx="50" cy="50" r="30" fill={'url(#' + id + ')'} />
      <path className="y-qc-x" d="M28 50c6-14 24-20 36-12M72 50c-6 14-24 20-36 12" fill="none" stroke={C[0]} strokeWidth="2" strokeLinecap="round" opacity=".8" />
      <ellipse cx="40" cy="38" rx="9" ry="5" fill="#fff" opacity=".7" transform="rotate(-30 40 38)" />
    </svg>
  );
}

// Nút tròn viền vàng có biểu tượng (hàng nút đáy, lưới chức năng)
export function NutTron({ ic, mau }) {
  return (
    <span className={'y-nt' + (mau ? ' ' + mau : '')}>
      <svg viewBox="0 0 24 24" aria-hidden="true"><path d={PS.ICP[ic] || PS.ICP.info} /></svg>
    </span>
  );
}

// Hoa văn mây cuộn nhỏ cho đầu bảng
export function May({ cls }) {
  return (
    <svg className={'hv-may ' + (cls || '')} viewBox="0 0 120 40" aria-hidden="true">
      <path d="M4 30c0-7 6-11 12-9 1-7 9-11 15-7 3-6 13-6 16 1 6-3 13 1 13 8h-9c0-4-4-6-7-4-1-5-8-6-11-2-3-3-9-1-9 3-4-1-7 2-7 5z" />
      <path d="M62 30c0-5 4-8 9-7 1-6 9-9 14-5 3-5 12-4 14 2 5-1 10 3 10 10h-8c0-3-3-5-6-4-1-4-7-5-10-1-3-2-8 0-8 3-3-1-6 1-6 2z" />
    </svg>
  );
}

// Con dấu son (màn mở đầu)
export function ConDau({ t, cls }) {
  return <span className={'hv-dau ' + (cls || '')}><i>{[...t].map((c, i) => <b key={i}>{c}</b>)}</i></span>;
}
export function VachChia() {
  return (
    <svg className="hv-vach" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 5H86M114 5H200" /><path d="M100 1l4 4-4 4-4-4z" /><circle cx="90" cy="5" r="1.4" /><circle cx="110" cy="5" r="1.4" />
    </svg>
  );
}
// giữ tên cũ cho chỗ còn gọi
export const CanhNui = () => <CanhDongPhu />;
export const CauTuLuyen = () => <QuaCau loai="tu" />;
