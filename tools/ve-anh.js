// Vẽ bộ ảnh 2D cho giao diện (ảnh WebP thật, không phải SVG) bằng canvas trong trình duyệt không màn hình.
// Dùng: node tools/ve-anh.js            → ghi vào src/assets/ui/
//       node tools/ve-anh.js nen cau    → chỉ vẽ vài nhóm
// Cảnh nền cắt từ tranh bản đồ có sẵn (src/assets-goc/ban-do). Các ảnh khác tô bằng dải màu, nhiễu, đổ bóng, phát sáng.
// Nhân vật ngồi thiền ở đây chỉ là ảnh TẠM: thay bằng tranh thật cùng tên tệp (nhan-vat-nam.webp / nhan-vat-nu.webp).
const { chromium } = require('playwright');
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..'), OUT = path.join(root, 'src/assets/ui');
const only = process.argv.slice(2);
fs.mkdirSync(OUT, { recursive: true });

// Mã vẽ chạy trong trang. Mỗi hàm trả về một canvas.
const PAGE = String.raw`
const rnd=(s=>()=>(s=(s*16807)%2147483647)/2147483647)(7);
function cv(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
// nhiễu mịn nhiều tầng (giá trị 0..1) cho hạt giấy / mây / lửa
function noise(w,h,scale,oct,seed){const g=cv(w,h),x=g.getContext('2d');let s=seed||1;const R=()=>(s=(s*16807)%2147483647)/2147483647;
  for(let o=0;o<oct;o++){const n=Math.max(2,Math.round(scale*Math.pow(2,o))),t=cv(n,n),tx=t.getContext('2d'),d=tx.createImageData(n,n);
    for(let i=0;i<n*n;i++){const v=R()*255;d.data[i*4]=d.data[i*4+1]=d.data[i*4+2]=v;d.data[i*4+3]=255;}tx.putImageData(d,0,0);
    x.globalAlpha=1/(o+1.3);x.imageSmoothingQuality='high';x.drawImage(t,0,0,w,h);}x.globalAlpha=1;return g;}
function grain(ctx,w,h,a,seed){const n=noise(w,h,w/3,1,seed);ctx.save();ctx.globalCompositeOperation='overlay';ctx.globalAlpha=a;ctx.drawImage(n,0,0);ctx.restore();}
function img(src){return new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=src;});}

// ---------- cảnh nền động phủ 780x1688 ----------
async function nen(mapSrc,dem){const W=780,H=1688,c=cv(W,H),x=c.getContext('2d');const M=await img(mapSrc);
  const sky=x.createLinearGradient(0,0,0,H);
  if(dem){sky.addColorStop(0,'#33496a');sky.addColorStop(.45,'#7790ab');sky.addColorStop(1,'#cfd9df');}
  else{sky.addColorStop(0,'#bcd3e3');sky.addColorStop(.4,'#e3edf2');sky.addColorStop(1,'#f3f5f1');}
  x.fillStyle=sky;x.fillRect(0,0,W,H);
  // trăng lớn
  const mx=W/2,my=470,mr=250;let g=x.createRadialGradient(mx,my,mr*.7,mx,my,mr*1.9);g.addColorStop(0,'rgba(255,248,226,.85)');g.addColorStop(1,'rgba(255,248,226,0)');x.fillStyle=g;x.fillRect(0,0,W,H);
  g=x.createRadialGradient(mx-40,my-50,20,mx,my,mr);g.addColorStop(0,'#ffffff');g.addColorStop(.8,'#fdf8ea');g.addColorStop(1,'#f6ecd2');x.fillStyle=g;x.beginPath();x.arc(mx,my,mr,0,7);x.fill();
  x.save();x.beginPath();x.arc(mx,my,mr,0,7);x.clip();x.globalAlpha=.05;x.globalCompositeOperation='multiply';x.drawImage(noise(W,H,10,3,5),0,0);x.restore();
  // núi lấy từ tranh bản đồ: dải núi xa (mờ, tông xanh) và dải gần
  const band=(sx,sy,sw,sh,dy,dh,alpha,tint,blur)=>{const t=cv(W,dh),tx=t.getContext('2d');tx.filter=(blur?'blur('+blur+'px) ':'')+'saturate(.55) contrast(1.05)';tx.drawImage(M,sx,sy,sw,sh,0,0,W,dh);tx.filter='none';
    tx.globalCompositeOperation='color';tx.fillStyle=tint;tx.globalAlpha=.45;tx.fillRect(0,0,W,dh);tx.globalAlpha=1;
    tx.globalCompositeOperation='destination-in';const f=tx.createLinearGradient(0,0,0,dh);f.addColorStop(0,'rgba(0,0,0,0)');f.addColorStop(.22,'rgba(0,0,0,1)');f.addColorStop(.72,'rgba(0,0,0,1)');f.addColorStop(1,'rgba(0,0,0,0)');tx.fillStyle=f;tx.fillRect(0,0,W,dh);
    x.globalAlpha=alpha;x.drawImage(t,0,dy);x.globalAlpha=1;};
  band(80,40,1300,560,560,520,.55,'#7f9fb8',2);
  band(150,500,1100,600,900,560,.9,'#6f93ab',0);
  // sương phủ
  for(const [y,h,a] of [[760,180,.55],[1080,220,.6],[1330,360,.9]]){const f=x.createLinearGradient(0,y,0,y+h);f.addColorStop(0,'rgba(248,250,250,0)');f.addColorStop(.5,'rgba(248,250,250,'+a+')');f.addColorStop(1,'rgba(248,250,250,0)');x.fillStyle=f;x.fillRect(0,y,W,h);}
  x.filter='blur(18px)';x.fillStyle='rgba(255,255,255,.75)';for(let i=0;i<14;i++){x.beginPath();x.ellipse(rnd()*W,820+rnd()*600,120+rnd()*160,18+rnd()*20,0,0,7);x.fill();}x.filter='none';
  const b=x.createLinearGradient(0,1440,0,H);b.addColorStop(0,'rgba(246,248,247,0)');b.addColorStop(1,'rgba(246,248,247,1)');x.fillStyle=b;x.fillRect(0,1440,W,H-1440);
  grain(x,W,H,.05,3);return c;}

// ---------- đài đá dưới chân nhân vật 640x220 ----------
function dai(){const W=640,H=220,c=cv(W,H),x=c.getContext('2d');
  x.filter='blur(10px)';x.fillStyle='rgba(40,60,80,.28)';x.beginPath();x.ellipse(W/2,H-50,280,34,0,0,7);x.fill();x.filter='none';
  let g=x.createLinearGradient(0,40,0,H-30);g.addColorStop(0,'#9fb3c2');g.addColorStop(.5,'#6d8597');g.addColorStop(1,'#4f6576');
  x.fillStyle=g;x.beginPath();x.moveTo(40,110);x.bezierCurveTo(80,50,220,36,320,38);x.bezierCurveTo(440,36,570,52,606,104);x.bezierCurveTo(620,150,560,178,460,184);x.lineTo(180,186);x.bezierCurveTo(80,180,20,150,40,110);x.fill();
  g=x.createLinearGradient(0,38,0,110);g.addColorStop(0,'#e2ebf0');g.addColorStop(1,'#a9bccb');x.fillStyle=g;x.beginPath();x.ellipse(W/2,82,268,44,0,0,7);x.fill();
  x.save();x.globalCompositeOperation='source-atop';x.globalAlpha=.35;x.drawImage(noise(W,H,18,4,9),0,0);x.restore();
  x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=3;x.beginPath();x.ellipse(W/2,80,262,40,0,Math.PI*1.05,Math.PI*1.95);x.stroke();
  return c;}

// ---------- quả cầu phát sáng 320x320 ----------
function cau(C,seed){const W=320,c=cv(W,W),x=c.getContext('2d'),m=W/2,r=88;
  let g=x.createRadialGradient(m,m,r*.6,m,m,m);g.addColorStop(0,C.glow+'cc');g.addColorStop(.55,C.glow+'44');g.addColorStop(1,C.glow+'00');x.fillStyle=g;x.fillRect(0,0,W,W);
  // tia sáng
  x.save();x.translate(m,m);x.globalCompositeOperation='lighter';for(let i=0;i<14;i++){x.rotate(Math.PI*2/14+rnd()*.2);const l=r*1.2+rnd()*40;const lg=x.createLinearGradient(0,0,l,0);lg.addColorStop(0,C.glow+'66');lg.addColorStop(1,C.glow+'00');x.fillStyle=lg;x.beginPath();x.moveTo(0,-5);x.lineTo(l,0);x.lineTo(0,5);x.fill();}x.restore();
  // thân cầu
  g=x.createRadialGradient(m-r*.35,m-r*.4,r*.1,m,m,r);g.addColorStop(0,C.c[0]);g.addColorStop(.35,C.c[1]);g.addColorStop(.75,C.c[2]);g.addColorStop(1,C.c[3]);
  x.fillStyle=g;x.beginPath();x.arc(m,m,r,0,7);x.fill();
  // xoáy bên trong
  x.save();x.beginPath();x.arc(m,m,r,0,7);x.clip();const n=noise(W,W,6,4,seed);x.globalCompositeOperation='overlay';x.globalAlpha=.85;
  x.translate(m,m);for(let i=0;i<3;i++){x.rotate(.9);x.drawImage(n,-m,-m);}x.restore();
  x.save();x.globalCompositeOperation='lighter';x.strokeStyle=C.c[0];x.lineCap='round';for(let k=0;k<3;k++){x.globalAlpha=.55-k*.12;x.lineWidth=4-k;x.beginPath();x.arc(m,m,r*(.45+k*.16),k*2.1,k*2.1+2.4);x.stroke();}x.restore();
  // viền sáng và đốm phản chiếu
  x.strokeStyle='rgba(255,255,255,.6)';x.lineWidth=2;x.beginPath();x.arc(m,m,r-1,0,7);x.stroke();
  x.fillStyle='rgba(255,255,255,.75)';x.beginPath();x.ellipse(m-r*.38,m-r*.45,r*.22,r*.12,-.6,0,7);x.fill();
  return c;}

// ---------- khung nút tròn 168x168 (đĩa ngà, viền vàng đồng) ----------
function vienTron(ctx,m,r,gold){let g=ctx.createLinearGradient(0,m-r,0,m+r);
  g.addColorStop(0,gold?'#fff1c4':'#ffffff');g.addColorStop(.45,gold?'#d9a84f':'#c9d2d8');g.addColorStop(1,gold?'#8a5a1c':'#7f8c96');ctx.fillStyle=g;ctx.beginPath();ctx.arc(m,m,r,0,7);ctx.fill();}
function nutTron(icon,kieu){const W=168,c=cv(W,W),x=c.getContext('2d'),m=W/2;
  x.filter='blur(6px)';x.fillStyle='rgba(30,45,60,.35)';x.beginPath();x.arc(m,m+6,70,0,7);x.fill();x.filter='none';
  vienTron(x,m,72,kieu!=='bac');vienTron(x,m,66,false);
  let g=x.createRadialGradient(m-16,m-22,8,m,m,62);g.addColorStop(0,'#ffffff');g.addColorStop(.6,'#eef3f5');g.addColorStop(1,'#cfdbe2');x.fillStyle=g;x.beginPath();x.arc(m,m,61,0,7);x.fill();
  x.save();x.beginPath();x.arc(m,m,61,0,7);x.clip();x.globalAlpha=.15;x.globalCompositeOperation='multiply';x.drawImage(noise(W,W,12,3,11),0,0);x.restore();
  if(icon){const p=new Path2D(icon.d);x.save();x.translate(m-48,m-48);x.scale(4,4);x.lineCap='round';x.lineJoin='round';
    x.shadowColor='rgba(255,255,255,.9)';x.shadowBlur=0;x.lineWidth=3.6;x.strokeStyle='#ffffff';x.stroke(p);
    const ig=x.createLinearGradient(0,0,0,24);ig.addColorStop(0,icon.c[0]);ig.addColorStop(1,icon.c[1]);x.lineWidth=2.1;x.strokeStyle=ig;x.shadowColor='rgba(0,0,0,.25)';x.shadowBlur=3;x.shadowOffsetY=1;x.stroke(p);x.restore();}
  x.fillStyle='rgba(255,255,255,.55)';x.beginPath();x.ellipse(m-14,m-36,30,10,-.3,0,7);x.fill();
  return c;}

// ---------- nút hình thoi 176x176 ----------
function nutThoi(icon){const W=176,c=cv(W,W),x=c.getContext('2d'),m=W/2;const d=(r)=>{x.beginPath();x.moveTo(m,m-r);x.lineTo(m+r,m);x.lineTo(m,m+r);x.lineTo(m-r,m);x.closePath();};
  x.filter='blur(6px)';x.fillStyle='rgba(30,45,60,.35)';d(74);x.translate(0,5);x.fill();x.translate(0,-5);x.filter='none';
  let g=x.createLinearGradient(0,m-78,0,m+78);g.addColorStop(0,'#fff1c4');g.addColorStop(.5,'#c99640');g.addColorStop(1,'#7a4c15');x.fillStyle=g;d(78);x.fill();
  g=x.createLinearGradient(0,m-70,0,m+70);g.addColorStop(0,'#4d6a82');g.addColorStop(1,'#1f3346');x.fillStyle=g;d(68);x.fill();
  x.save();d(68);x.clip();x.globalAlpha=.25;x.globalCompositeOperation='overlay';x.drawImage(noise(W,W,8,4,21),0,0);x.restore();
  if(icon){const p=new Path2D(icon.d);x.save();x.translate(m-40,m-44);x.scale(3.4,3.4);x.lineCap='round';x.lineJoin='round';x.lineWidth=2.2;x.strokeStyle='#ffe9b8';x.shadowColor='rgba(255,220,150,.9)';x.shadowBlur=8;x.stroke(p);x.restore();}
  return c;}

// ---------- ô đồ theo phẩm 136x136 ----------
function oPham(k){const P=[['#c9cfd4','#8d959c','#6f7880'],['#cfe8c8','#6fae66','#3e7a3a'],['#cfe0f7','#5d93d8','#2d5ea8'],['#ead6fb','#a273d6','#6a3aa6'],['#ffe6c2','#f0a040','#b0601a'],['#fff3b8','#f3c63f','#c2861a'],['#ffd0c8','#e0503c','#9a2418']][k];
  const W=136,c=cv(W,W),x=c.getContext('2d');const rr=(a,b,w,h,r)=>{x.beginPath();x.moveTo(a+r,b);x.arcTo(a+w,b,a+w,b+h,r);x.arcTo(a+w,b+h,a,b+h,r);x.arcTo(a,b+h,a,b,r);x.arcTo(a,b,a+w,b,r);x.closePath();};
  let g=x.createLinearGradient(0,4,0,W-4);g.addColorStop(0,P[1]);g.addColorStop(1,P[2]);x.fillStyle=g;rr(4,4,W-8,W-8,14);x.fill();
  g=x.createRadialGradient(W/2,W/2-10,6,W/2,W/2,W*.62);g.addColorStop(0,P[0]);g.addColorStop(.7,P[1]);g.addColorStop(1,P[2]);x.fillStyle=g;rr(10,10,W-20,W-20,10);x.fill();
  x.save();rr(10,10,W-20,W-20,10);x.clip();x.globalAlpha=.2;x.globalCompositeOperation='overlay';x.drawImage(noise(W,W,8,3,30+k),0,0);x.restore();
  x.strokeStyle='rgba(255,255,255,.65)';x.lineWidth=2;rr(10,10,W-20,W-20,10);x.stroke();
  if(k>=4){x.save();x.globalCompositeOperation='lighter';x.strokeStyle=P[0];x.globalAlpha=.6;x.lineWidth=3;x.shadowColor=P[1];x.shadowBlur=10;rr(6,6,W-12,W-12,13);x.stroke();x.restore();}
  return c;}
// ô trống (ô trang bị chưa đeo)
function oTrong(){const W=136,c=cv(W,W),x=c.getContext('2d');let g=x.createLinearGradient(0,0,0,W);g.addColorStop(0,'#dbe7ee');g.addColorStop(1,'#a9bfcd');x.fillStyle=g;x.beginPath();x.roundRect(6,6,W-12,W-12,12);x.fill();
  x.strokeStyle='rgba(255,255,255,.8)';x.lineWidth=3;x.stroke();x.globalAlpha=.15;x.drawImage(noise(W,W,8,3,44),0,0);return c;}

// ---------- ruy băng tiêu đề 560x96 ----------
function ruyBang(){const W=560,H=96,c=cv(W,H),x=c.getContext('2d');
  const tail=(s)=>{x.save();if(s<0){x.translate(W,0);x.scale(-1,1);}let g=x.createLinearGradient(0,20,0,86);g.addColorStop(0,'#a8783a');g.addColorStop(1,'#6b4518');x.fillStyle=g;x.beginPath();x.moveTo(8,30);x.lineTo(78,30);x.lineTo(78,84);x.lineTo(8,84);x.lineTo(30,57);x.closePath();x.fill();x.fillStyle='#4e300d';x.beginPath();x.moveTo(60,84);x.lineTo(78,84);x.lineTo(78,72);x.fill();x.restore();};
  tail(1);tail(-1);
  let g=x.createLinearGradient(0,12,0,76);g.addColorStop(0,'#fff0c6');g.addColorStop(.35,'#e3bb6c');g.addColorStop(1,'#a8752e');x.fillStyle=g;x.beginPath();x.moveTo(60,14);x.quadraticCurveTo(W/2,2,W-60,14);x.lineTo(W-60,72);x.quadraticCurveTo(W/2,60,60,72);x.closePath();x.fill();
  x.strokeStyle='rgba(255,255,255,.7)';x.lineWidth=2;x.beginPath();x.moveTo(66,22);x.quadraticCurveTo(W/2,10,W-66,22);x.stroke();
  x.strokeStyle='rgba(110,70,20,.6)';x.beginPath();x.moveTo(66,64);x.quadraticCurveTo(W/2,52,W-66,64);x.stroke();
  x.globalCompositeOperation='source-atop';x.globalAlpha=.2;x.drawImage(noise(W,H,20,3,50),0,0);return c;}

// ---------- nút vàng 360x104 ----------
function nutVang(xam){const W=360,H=104,c=cv(W,H),x=c.getContext('2d');x.filter='blur(5px)';x.fillStyle='rgba(60,40,10,.3)';x.beginPath();x.roundRect(14,18,W-28,H-26,40);x.fill();x.filter='none';
  let g=x.createLinearGradient(0,8,0,H-8);if(xam){g.addColorStop(0,'#f2f4f5');g.addColorStop(1,'#a9b3ba');}else{g.addColorStop(0,'#fff4cc');g.addColorStop(.45,'#efc366');g.addColorStop(1,'#b97d26');}
  x.fillStyle=g;x.beginPath();x.roundRect(10,8,W-20,H-22,40);x.fill();x.strokeStyle=xam?'#8a959d':'#8a5a1c';x.lineWidth=3;x.stroke();
  x.strokeStyle='rgba(255,255,255,.75)';x.lineWidth=2;x.beginPath();x.roundRect(18,14,W-36,H-36,34);x.stroke();
  x.fillStyle='rgba(255,255,255,.45)';x.beginPath();x.roundRect(30,16,W-60,22,12);x.fill();return c;}

// ---------- nền giấy xanh cho bảng 512x512 ----------
function giay(){const W=512,c=cv(W,W),x=c.getContext('2d');x.fillStyle='#eef3f5';x.fillRect(0,0,W,W);x.globalAlpha=.5;x.globalCompositeOperation='multiply';x.drawImage(noise(W,W,24,5,61),0,0);
  x.globalAlpha=.3;x.globalCompositeOperation='screen';x.drawImage(noise(W,W,64,2,62),0,0);x.globalAlpha=1;x.globalCompositeOperation='source-over';
  // làm liền mép khi lát
  const t=cv(W,W),tx=t.getContext('2d');tx.drawImage(c,0,0);x.globalAlpha=.5;x.drawImage(t,W/2,0);x.drawImage(t,-W/2,0);x.drawImage(t,0,W/2);x.drawImage(t,0,-W/2);return c;}

// ---------- nhân vật ngồi thiền 600x660 (ẢNH TẠM) ----------
async function nguoi(svg){const W=600,H=660,c=cv(W,H),x=c.getContext('2d');const i=await img('data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg));
  x.drawImage(i,0,0,W,H);
  // tô bóng mềm: phủ một lớp nhiễu nhẹ lên thân, làm sáng mép trên như ánh trăng
  x.save();x.globalCompositeOperation='source-atop';x.globalAlpha=.12;x.drawImage(noise(W,H,30,4,81),0,0);
  const l=x.createLinearGradient(0,0,0,H);l.addColorStop(0,'rgba(255,250,235,.35)');l.addColorStop(.5,'rgba(255,250,235,0)');l.addColorStop(1,'rgba(40,60,90,.18)');x.globalAlpha=1;x.fillStyle=l;x.fillRect(0,0,W,H);x.restore();
  return c;}

// ---------- cảnh trận đấu 780x620 (tranh núi tông xám xanh) ----------
async function tran(mapSrc){const W=780,H=620,c=cv(W,H),x=c.getContext('2d');const M=await img(mapSrc);
  let g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'#cfdde6');g.addColorStop(1,'#eef2ef');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.filter='grayscale(.6) contrast(1.1) brightness(1.05)';x.globalAlpha=.8;x.drawImage(M,60,700,1100,875,0,40,W,H-40);x.filter='none';x.globalAlpha=1;
  g=x.createLinearGradient(0,0,0,H);g.addColorStop(0,'rgba(240,245,247,.9)');g.addColorStop(.3,'rgba(240,245,247,0)');g.addColorStop(.75,'rgba(240,245,247,0)');g.addColorStop(1,'rgba(240,245,247,.95)');x.fillStyle=g;x.fillRect(0,0,W,H);
  x.filter='blur(20px)';x.fillStyle='rgba(255,255,255,.8)';for(let i=0;i<8;i++){x.beginPath();x.ellipse(rnd()*W,300+rnd()*280,140,24,0,0,7);x.fill();}x.filter='none';grain(x,W,H,.15,71);return c;}
`;

// Biểu tượng của nút: lấy đường nét từ bảng ICP của game
const ICP = (() => { const s = fs.readFileSync(path.join(root, 'src/game/ui/01-base.js'), 'utf8'); const i = s.indexOf('const ICP={'); const j = s.indexOf('};', i); return Function('return ' + s.slice(i + 10, j + 1))(); })();
const MAU = { nau: ['#9a5a1e', '#5a3010'], xanh: ['#2f7fbf', '#1c4a7a'], luc: ['#3a9a5a', '#1f5c33'], do: ['#d0503c', '#8a2418'], tim: ['#8a4ac8', '#4a1c8a'] };
const NUT = { // tên tệp: [biểu tượng, màu]
  'nut-tui': ['bag', 'nau'], 'nut-hanh-tau': ['walk', 'xanh'], 'nut-mon-phai': ['flag', 'do'], 'nut-linh-thu': ['paw', 'luc'], 'nut-luyen-che': ['flask', 'tim'],
  'nut-so-tay': ['book', 'nau'], 'nut-giao-tinh': ['people', 'xanh'], 'nut-thien-ha': ['globe', 'luc'], 'nut-canh-gioi': ['yin', 'tim'], 'nut-cai-dat': ['gear', 'nau'],
  'nut-ky-ngo': ['star', 'do'], 'nut-thu': ['scroll', 'xanh'], 'nut-xep-hang': ['medal', 'nau'], 'nut-ky-su': ['feather', 'luc'], 'nut-quay-lai': ['left', 'nau'],
  'nut-nhan-vat': ['user', 'xanh'], 'nut-ban-do': ['globe', 'xanh'], 'nut-ve-cho': ['target', 'do'], 'nut-chu-giai': ['list', 'nau'], 'nut-than-thuc': ['eye', 'tim'],
};
const THOI = { 'thoi-linh-can': 'root', 'thoi-cong-phap': 'scroll' };
const CAU = {
  'cau-kiep': { c: ['#fffbe0', '#ffc24a', '#f2662a', '#a51d14'], glow: '#ff9a3c' },
  'cau-ma': { c: ['#fff0ff', '#e88ff5', '#9a3fd6', '#4b1c8f'], glow: '#c06cff' },
  'cau-tu': { c: ['#ffffff', '#a8ecff', '#3f8ff0', '#2a3fb0'], glow: '#7fd2ff' },
};

(async () => {
  const b = await chromium.launch();
  const p = await b.newPage();
  await p.setContent('<html><body></body></html>');
  await p.addScriptTag({ content: PAGE });
  const mapB64 = 'data:image/webp;base64,' + fs.readFileSync(path.join(root, 'src/assets-goc/ban-do/Spring-day.webp')).toString('base64');
  const save = async (name, expr, arg, q = 0.86) => {
    if (only.length && !only.some(o => name.startsWith(o))) return;
    const url = await p.evaluate(async ([e, a, q]) => { const c = await eval(e); return c.toDataURL('image/webp', q); }, [expr, arg, q]);
    fs.writeFileSync(path.join(OUT, name + '.webp'), Buffer.from(url.split(',')[1], 'base64'));
    console.log(name + '.webp', Math.round(fs.statSync(path.join(OUT, name + '.webp')).size / 1024) + ' KB');
  };
  await p.evaluate(m => { window.MAP = m; }, mapB64);
  await save('nen-dong-phu', 'nen(MAP,0)', null, 0.82);
  await save('nen-dong-phu-dem', 'nen(MAP,1)', null, 0.82);
  await save('nen-tran', 'tran(MAP)', null, 0.82);
  await save('dai-da', 'dai()');
  { // dựng SVG nhân vật từ src/react/chung/HoaVan.jsx
    const esb = require('esbuild'); const React = require('react'), RS = require('react-dom/server');
    const code = esb.transformSync(fs.readFileSync(path.join(root, 'src/react/chung/HoaVan.jsx'), 'utf8').replace("import { PS } from '../html';", 'const PS={ICP:{}};'), { loader: 'jsx', format: 'cjs', jsx: 'transform' }).code;
    const m = { exports: {} }; Function('module', 'exports', 'require', 'React', code)(m, m.exports, require, React);
    for (const [k, nu] of [['nhan-vat-nam', false], ['nhan-vat-nu', true]]) {
      const svg = RS.renderToStaticMarkup(React.createElement(m.exports.NguoiNgoiThien, { nu })).replace('<svg ', '<svg xmlns="http://www.w3.org/2000/svg" width="600" height="660" ');
      await save(k, `nguoi(${JSON.stringify(svg)})`);
    }
  }
  for (const [k, C] of Object.entries(CAU)) await save(k, `cau(${JSON.stringify(C)},${k.length * 7})`);
  for (const [k, [ic, m]] of Object.entries(NUT)) await save(k, `nutTron(${JSON.stringify({ d: ICP[ic], c: MAU[m] })})`);
  await save('nut-trong', 'nutTron(null)');
  for (const [k, ic] of Object.entries(THOI)) await save(k, `nutThoi(${JSON.stringify({ d: ICP[ic] })})`);
  for (let k = 0; k < 7; k++) await save('o-pham-' + k, `oPham(${k})`);
  await save('o-trong', 'oTrong()');
  await save('ruy-bang', 'ruyBang()');
  await save('nut-vang', 'nutVang(0)');
  await save('nut-xam', 'nutVang(1)');
  await save('giay', 'giay()', null, 0.8);
  await b.close();
})();
