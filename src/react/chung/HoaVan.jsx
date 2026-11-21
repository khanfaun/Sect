// Bộ hoạ tiết 2D vẽ bằng SVG cho giao diện mới: mây cuộn, góc viền, núi xa, con dấu, quả cầu tu luyện.
// Tất cả dùng màu theo biến CSS (--g vàng kim, --j ngọc bích) nên tự đổi theo chủ đề.

// Mây cuộn (tường vân) — đặt làm hoạ tiết chìm ở đầu bảng, nền nút
export function May({ cls }) {
  return (
    <svg className={'hv-may ' + (cls || '')} viewBox="0 0 120 40" aria-hidden="true">
      <path d="M4 30c0-7 6-11 12-9 1-7 9-11 15-7 3-6 13-6 16 1 6-3 13 1 13 8h-9c0-4-4-6-7-4-1-5-8-6-11-2-3-3-9-1-9 3-4-1-7 2-7 5z" />
      <path d="M62 30c0-5 4-8 9-7 1-6 9-9 14-5 3-5 12-4 14 2 5-1 10 3 10 10h-8c0-3-3-5-6-4-1-4-7-5-10-1-3-2-8 0-8 3-3-1-6 1-6 2z" />
      <path d="M30 36h60" />
    </svg>
  );
}

// Góc viền kiểu hồi văn — 4 góc của khung lớn
export function GocVien() {
  const g = <path d="M1 22V7a6 6 0 0 1 6-6h15M6 22V12a6 6 0 0 1 6-6h10M11 16a5 5 0 0 1 5-5" />;
  return <>
    <svg className="hv-goc tl" viewBox="0 0 24 24" aria-hidden="true">{g}</svg>
    <svg className="hv-goc tr" viewBox="0 0 24 24" aria-hidden="true">{g}</svg>
    <svg className="hv-goc bl" viewBox="0 0 24 24" aria-hidden="true">{g}</svg>
    <svg className="hv-goc br" viewBox="0 0 24 24" aria-hidden="true">{g}</svg>
  </>;
}

// Phông nền màn ngoài: trăng, các lớp núi xa mờ dần, mây trôi, chim bay
export function CanhNui() {
  return (
    <svg className="hv-nui" viewBox="0 0 400 700" preserveAspectRatio="xMidYMax slice" aria-hidden="true">
      <defs>
        <radialGradient id="hvTrang" cx="50%" cy="50%" r="50%">
          <stop offset="0" stopColor="#fff4d6" /><stop offset=".55" stopColor="#f1d9a0" stopOpacity=".85" /><stop offset="1" stopColor="#f1d9a0" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="hvTroi" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#070910" /><stop offset=".55" stopColor="#0f1524" /><stop offset="1" stopColor="#1a2236" />
        </linearGradient>
        <linearGradient id="hvSuong" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a9b6d4" stopOpacity="0" /><stop offset="1" stopColor="#a9b6d4" stopOpacity=".22" />
        </linearGradient>
      </defs>
      <rect width="400" height="700" fill="url(#hvTroi)" />
      <circle className="hv-trang" cx="318" cy="96" r="90" fill="url(#hvTrang)" opacity=".5" />
      <circle cx="318" cy="96" r="30" fill="#f6e7c1" opacity=".92" />
      <g className="hv-chim" fill="none" stroke="#e8dcc0" strokeWidth="1.4" strokeLinecap="round" opacity=".7">
        <path d="M70 140q5-5 10 0q5-5 10 0" /><path d="M98 122q4-4 8 0q4-4 8 0" /><path d="M58 112q3-3 6 0q3-3 6 0" />
      </g>
      <path d="M0 430L40 380 70 400 120 320 160 370 190 340 240 280 280 350 320 320 360 360 400 330V700H0Z" fill="#26324a" opacity=".55" />
      <rect y="360" width="400" height="120" fill="url(#hvSuong)" />
      <path d="M0 500L30 470 80 430 120 470 150 450 200 400 250 460 300 420 340 450 400 410V700H0Z" fill="#1b2438" opacity=".8" />
      <g className="hv-maytroi" fill="#cfe2d8" opacity=".14">
        <ellipse cx="80" cy="470" rx="90" ry="10" /><ellipse cx="320" cy="440" rx="110" ry="9" />
      </g>
      <path d="M0 590L50 540 90 560 140 500 190 560 230 540 280 580 330 530 400 570V700H0Z" fill="#121929" />
      <path d="M140 500l4 14m-8-4h8" stroke="#121929" strokeWidth="3" />
      <path d="M0 650q100-30 200-10t200-10V700H0Z" fill="#0a0e18" />
    </svg>
  );
}

// Con dấu son vuông, chữ dọc
export function ConDau({ t, cls }) {
  return <span className={'hv-dau ' + (cls || '')}><i>{[...t].map((c, i) => <b key={i}>{c}</b>)}</i></span>;
}

// Quả cầu tu luyện ở giữa thanh dưới: vòng hào quang + hoa sen + thái cực nhỏ
export function CauTuLuyen() {
  return (
    <svg className="hv-cau" viewBox="0 0 48 48" aria-hidden="true">
      <circle className="hv-cau-v" cx="24" cy="24" r="21" />
      <path className="hv-cau-s" d="M24 13c3 4 3 9 0 13-3-4-3-9 0-13zM14 19c5 0 8 3 10 7-5 1-9-2-10-7zM34 19c-5 0-8 3-10 7 5 1 9-2 10-7zM12 29c4-2 8-1 12 1-4 3-9 3-12-1zM36 29c-4-2-8-1-12 1 4 3 9 3 12-1z" />
      <path className="hv-cau-d" d="M15 34q9 5 18 0" />
    </svg>
  );
}

// Dải hoạ tiết ngang mảnh dùng làm vạch chia
export function VachChia() {
  return (
    <svg className="hv-vach" viewBox="0 0 200 10" preserveAspectRatio="none" aria-hidden="true">
      <path d="M0 5H86M114 5H200" /><path d="M100 1l4 4-4 4-4-4z" /><circle cx="90" cy="5" r="1.4" /><circle cx="110" cy="5" r="1.4" />
    </svg>
  );
}
