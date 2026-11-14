// ================= TRANH THỦY MẶC (bộ mới) =================
// Màn mở đầu, ảnh địa điểm Thôn trấn, chân dung nhân vật, khung avatar 5 bậc thiên phú, và nền bản đồ.
// Tệp này nạp sau cùng nên ghi đè bộ hình cũ. Muốn dùng ảnh riêng thì cứ điền vào ASSET như trước, ảnh riêng luôn được ưu tiên
// (ASSET.title, ASSET.place.tran, ASSET.hero.me, ASSET.heroG).
const IKC={ink:'#26221d',ink2:'#4b4538',mist:'#ece3cd',seal:'#a8322a',gold:'#c9962a',jade:'#3f8a6e',indigo:'#34567a'};
function ikRng(s){s=s|0;return()=>{s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
const ikE=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
const ikf=n=>(Math.round(n*10)/10);
// bộ lọc: r = bờ loang như mực thấm giấy, b = nét bút lông rung nhẹ, m = sương mờ, d = nét bút khô (phi bạch)
function ikDefs(p,w,h){return `<defs>
<filter id="${p}r" x="-8%" y="-8%" width="116%" height="116%"><feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="3" seed="4" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="10"/><feGaussianBlur stdDeviation=".8"/></filter>
<filter id="${p}b" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency="${w<=100?1.1:.7}" numOctaves="2" seed="2" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="${w<=100?.5:1.7}"/></filter>
<filter id="${p}m" x="-20%" y="-100%" width="140%" height="300%"><feGaussianBlur stdDeviation="9"/></filter>
<filter id="${p}s" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="3"/></filter>
<filter id="${p}d" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".5 .03" numOctaves="2" seed="9" result="t"/><feColorMatrix in="t" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 15 0 0 0 -6.4" result="a"/><feComposite in="SourceGraphic" in2="a" operator="in"/></filter>
<linearGradient id="${p}g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${IKC.ink}" stop-opacity=".14"/><stop offset="1" stop-color="${IKC.ink}" stop-opacity="0"/></linearGradient>
<linearGradient id="${p}g2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${IKC.ink}" stop-opacity=".42"/><stop offset=".7" stop-color="${IKC.ink}" stop-opacity=".1"/><stop offset="1" stop-color="${IKC.ink}" stop-opacity="0"/></linearGradient>
<linearGradient id="${p}g3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${IKC.ink}" stop-opacity=".88"/><stop offset=".6" stop-color="${IKC.ink}" stop-opacity=".42"/><stop offset="1" stop-color="${IKC.ink}" stop-opacity=".05"/></linearGradient>
<radialGradient id="${p}sun" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${IKC.seal}" stop-opacity=".32"/><stop offset="1" stop-color="${IKC.seal}" stop-opacity="0"/></radialGradient>
<linearGradient id="${p}fv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".3" stop-color="#fff"/><stop offset=".86" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<linearGradient id="${p}fh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".07" stop-color="#fff"/><stop offset=".93" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient>
<mask id="${p}mv"><rect width="${w}" height="${h}" fill="url(#${p}fv)"/></mask><mask id="${p}mh"><rect width="${w}" height="${h}" fill="url(#${p}fh)"/></mask>
</defs>`;}
// ---- mảnh ghép chung ----
// đường núi nhấp nhô: nhiều đỉnh, sườn dốc bên trái thoải bên phải
function ikRidge(R,x0,x1,base,amp,peaks,step,seedPk){const pk=[];for(let i=0;i<peaks;i++)pk.push([x0+(x1-x0)*(i+.5+(R()-.5)*.55)/peaks,amp*(.5+R()*.65),(x1-x0)/peaks*(.42+R()*.4)]);
  const pts=[];for(let x=x0;x<=x1+.1;x+=step){let h=0;for(const [c,a,w] of pk){const d=(x-c)/w;h=Math.max(h,a*Math.exp(-d*d*(d>0?1.25:.95)));}const tp=Math.min(1,(x-x0)/((x1-x0)*.16),(x1-x)/((x1-x0)*.16));h=h*Math.max(0,Math.min(1,tp))+(R()-.3)*amp*.06;pts.push([x,base-h]);}
  return {pts,pk};}
function ikFill(pts,bot){return 'M'+pts[0][0]+' '+bot+pts.map(p=>'L'+ikf(p[0])+' '+ikf(p[1])).join('')+'L'+pts[pts.length-1][0]+' '+bot+'Z';}
// nét "cun" cào theo sườn núi + điểm thái (chấm rêu) trên đường sống
function ikCun(R,pts,n,col,len,o){o=o||{};let s='';for(let i=0;i<n;i++){const k=1+Math.floor(R()*(pts.length-2)),p=pts[k];const dx=(R()-.35)*len*.7,dy=len*(.5+R()*.8);
  s+=`M${ikf(p[0]+(R()-.5)*8)} ${ikf(p[1]+R()*dy*.5)}q${ikf(dx*.5)} ${ikf(dy*.5)} ${ikf(dx)} ${ikf(dy)}`;}
  return `<path d="${s}" fill="none" stroke="${col}" stroke-width="${o.w||.7}" stroke-linecap="round" opacity="${o.op||.3}"/>`;}
function ikMoss(R,pts,n,col,op){let s='';for(let i=0;i<n;i++){const p=pts[1+Math.floor(R()*(pts.length-2))];s+=`<ellipse cx="${ikf(p[0]+(R()-.5)*10)}" cy="${ikf(p[1]+3+R()*12)}" rx="${ikf(.8+R()*1.4)}" ry="${ikf(.5+R()*.8)}"/>`;}
  return `<g fill="${col}" opacity="${op||.5}">${s}</g>`;}
const ikMist=(p,x,y,rx,ry,o)=>`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${IKC.mist}" opacity="${o||.85}" filter="url(#${p}m)"/>`;
// thông: thân cong, tán xòe thành từng tầng
function ikPine(p,R,x,y,s,col){col=col||IKC.ink;let t='';const lean=(R()-.5)*8;
  t+=`<path d="M0 0q${ikf(lean)} -14 ${ikf(lean*.6)} -34" fill="none" stroke="${col}" stroke-width="2.2" stroke-linecap="round"/>`;
  [[-1,-13,13],[1,-20,11],[-.5,-27,9],[0,-33,6]].forEach(([dx,dy,w],i)=>{const wx=w*(.85+R()*.3);t+=`<path d="M${ikf(dx*3-wx)} ${dy}q${ikf(wx*.5)} ${-5-i} ${ikf(wx)} ${-1}q${ikf(wx*.5)} ${-4} ${ikf(wx)} ${1}q${ikf(-wx)} 4 ${ikf(-wx*2)} 0z" fill="${col}" opacity="${.78+R()*.2}"/>`;});
  t+=`<path d="M-10 -12l-3 2M10 -19l3 2M-8 -26l-3 1M8 -26l3 1M-4 -33l-2 -2M4 -33l2 -2" stroke="${col}" stroke-width=".8" opacity=".7"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)">${t}</g>`;}
function ikTree(p,R,x,y,s,col){col=col||IKC.ink;return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)"><path d="M0 0q-1 -8 1 -14" fill="none" stroke="${col}" stroke-width="1.6" stroke-linecap="round"/><ellipse cx="0" cy="-17" rx="8" ry="6" fill="${col}" opacity=".7"/><ellipse cx="-4" cy="-14" rx="5" ry="4" fill="${col}" opacity=".7"/><ellipse cx="4" cy="-15" rx="5" ry="4" fill="${col}" opacity=".6"/></g>`;}
function ikBirds(x,y,n,s){let t='';for(let i=0;i<n;i++){const a=x+i*14*s+(i%2)*5,b=y-i*5*s+(i%3)*3;t+=`<path d="M${ikf(a)} ${ikf(b)}q${ikf(3*s)} ${ikf(-3*s)} ${ikf(6*s)} 0q${ikf(3*s)} ${ikf(-3*s)} ${ikf(6*s)} 0" fill="none" stroke="${IKC.ink}" stroke-width="1" stroke-linecap="round"/>`;}return `<g opacity=".72">${t}</g>`;}
function ikSun(p,x,y,r){return `<circle cx="${x}" cy="${y}" r="${r*2.4}" fill="url(#${p}sun)"/><circle cx="${x}" cy="${y}" r="${r}" fill="${IKC.seal}" opacity=".9" filter="url(#${p}r)"/>`;}
function ikBoat(p,x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)"><path d="M-16 0q16 6 32 0l-3 3q-13 3 -26 0z" fill="${IKC.ink}"/><path d="M-4 0v-11" stroke="${IKC.ink}" stroke-width="1"/><path d="M-4 -11q8 2 9 9z" fill="${IKC.ink}" opacity=".3"/><circle cx="2" cy="-7" r="1.7" fill="${IKC.ink}"/><path d="M2 -5l-1 5" stroke="${IKC.ink}" stroke-width="1.6"/><path d="M-1 -9q3 -3 6 0z" fill="${IKC.ink2}"/><path d="M6 -1l14 -6" stroke="${IKC.ink}" stroke-width=".8"/></g>`;}
function ikRipples(R,x0,x1,y0,y1,n,s){let t='';for(let i=0;i<n;i++){const x=x0+R()*(x1-x0),y=y0+R()*(y1-y0),w=(8+R()*22)*s;t+=`M${ikf(x)} ${ikf(y)}h${ikf(w)}`;}return `<path d="${t}" fill="none" stroke="${IKC.ink}" stroke-width=".8" stroke-linecap="round" opacity=".3"/>`;}
// tường vân: mây cuộn
function ikCloud(x,y,s,flip,col,w){col=col||IKC.ink;return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" fill="none" stroke="${col}" stroke-width="${w||1.2}" stroke-linecap="round" stroke-linejoin="round"><path d="M0 0c-5 0 -8 -4 -5 -7c3 -3 8 -1 7 3c-1 3 -5 3 -5 0"/><path d="M-5 -3c-6 1 -10 -2 -8 -5"/><path d="M0 0c6 1 12 0 16 -3c3 -3 1 -6 -2 -5"/><path d="M6 0c4 1 9 1 12 3"/></g>`;}
// người tu tiên đứng nhìn xa: áo bay, kiếm sau lưng, dải lụa đỏ
function ikFigure(p,x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)"><path d="M3 -28l9 -10" stroke="${IKC.ink}" stroke-width="1.1"/><path d="M-5 0l3 -18l8 0l5 18q-8 2 -16 0z" fill="${IKC.ink}"/><path d="M-5 0q-9 -2 -13 4q6 -1 10 -2z" fill="${IKC.ink}" opacity=".85"/><path d="M6 -17q8 3 12 12" fill="none" stroke="${IKC.seal}" stroke-width="1.6" stroke-linecap="round"/><path d="M-1 -17l1 -4h4l-1 4z" fill="${IKC.ink}"/><circle cx="1.5" cy="-24" r="3.4" fill="#e9dcc0" stroke="${IKC.ink}" stroke-width=".8"/><path d="M-2 -25q3 -6 7 -2l-1 -3q-4 -3 -7 2z" fill="${IKC.ink}"/><ellipse cx="1.5" cy="-30" rx="2" ry="2.3" fill="${IKC.ink}"/></g>`;}

// ---- mảnh ghép chi tiết (bản 2) ----
// vệt cọ khô rộng chạy dọc đường sống núi: tạo mảng loang có thớ như bút lông kéo ngang
function ikBand(p,pts,col,w,op,dy){return `<path d="M${pts.map(q=>ikf(q[0])+' '+ikf(q[1]+(dy||8))).join('L')}" fill="none" stroke="${col}" stroke-width="${w}" opacity="${op}" stroke-linejoin="round" filter="url(#${p}d)"/>`;}
// hạc bay: thân trắng, đầu cánh đen, cổ dài, chân duỗi sau
function ikCrane(p,x,y,s,rot){const w='#f6efdc',k=IKC.ink;return `<g transform="translate(${x} ${y}) rotate(${rot||0}) scale(${s})" filter="url(#${p}b)"><path d="M-10 0q10 -4 20 -1q-9 5 -20 1z" fill="${w}" stroke="${k}" stroke-width=".7"/><path d="M-2 -1q-6 -12 -20 -15q8 6 10 15z" fill="${w}" stroke="${k}" stroke-width=".7"/><path d="M-22 -16q-6 0 -9 3q6 -1 10 1z" fill="${k}"/><path d="M0 1q4 10 16 12q-8 -3 -12 -12z" fill="${w}" stroke="${k}" stroke-width=".6" opacity=".9"/><path d="M9 -1q6 -2 8 -7" fill="none" stroke="${k}" stroke-width="1" stroke-linecap="round"/><path d="M17 -8l5 0" stroke="${k}" stroke-width=".8"/><circle cx="17.6" cy="-8.4" r=".9" fill="${IKC.seal}"/><path d="M-10 1l-14 4" stroke="${k}" stroke-width=".6"/></g>`;}
// ngói: nhà tranh vách, mái ngói cong có hàng ngói, cột, cửa chấn song, đèn lồng
function ikHouse2(p,x,y,s,o){o=o||{};const k=IKC.ink,roof=o.roof||IKC.ink2;let t=`<path d="M-15 0V-10h30V0z" fill="#efe5cc" stroke="${k}" stroke-width=".9"/><path d="M-15 -10h30M-15 -5h30" stroke="${k}" stroke-width=".4" opacity=".25"/>`;
  [-15,-5,5,15].forEach(cx=>t+=`<path d="M${cx} 0V-11" stroke="${k}" stroke-width="1.3"/>`);
  t+=`<path d="M-3.5 0v-7.5h7V0z" fill="${k}" opacity=".85"/><path d="M-12 -4v-4h6v4zM6 -4v-4h6v4z" fill="${k}" opacity=".6"/><path d="M-9 -8v4M-12 -6h6M9 -8v4M6 -6h6" stroke="#efe5cc" stroke-width=".5"/>`;
  t+=`<path d="M-24 -9Q-14 -12 -10 -18T0 -24Q6 -22 10 -18T24 -9Q12 -9 0 -11Q-12 -9 -24 -9z" fill="${roof}"/><path d="M-20 -10l3 -3M-14 -12l3 -4M-8 -14l2 -6M-2 -15v-6M4 -15l-1 -6M10 -13l-3 -5M16 -11l-4 -3" stroke="#efe5cc" stroke-width=".5" opacity=".5"/><path d="M-6 -24q6 -3 12 0" stroke="${k}" stroke-width="1.6" fill="none"/>`;
  if(o.lantern)t+=`<path d="M-9 -9v2" stroke="${k}" stroke-width=".5"/><ellipse cx="-9" cy="-5.6" rx="1.6" ry="2" fill="${IKC.seal}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)">${t}</g>`;}
function ikFence(x,y,n,s){let t='';for(let i=0;i<n;i++)t+=`M${x+i*5*s} ${y}v${-7*s}`;return `<path d="${t}M${x} ${y-4*s}h${(n-1)*5*s}" stroke="${IKC.ink}" stroke-width="1" fill="none" opacity=".7" stroke-linecap="round"/>`;}
function ikLotusPond(p,R,cx,cy,rx,ry){let t=`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${IKC.ink}" opacity=".11" filter="url(#${p}r)"/>`;
  for(let i=0;i<9;i++){const x=cx+(R()-.5)*rx*1.6,y=cy+(R()-.5)*ry*1.3,r=4+R()*5;t+=`<ellipse cx="${ikf(x)}" cy="${ikf(y)}" rx="${ikf(r)}" ry="${ikf(r*.35)}" fill="${IKC.jade}" opacity=".35"/><path d="M${ikf(x-r)} ${ikf(y)}h${ikf(r*2)}" stroke="${IKC.ink}" stroke-width=".5" opacity=".4"/>`;if(i%3===0)t+=`<path d="M${ikf(x)} ${ikf(y)}v-9" stroke="${IKC.ink}" stroke-width=".8" opacity=".6"/><path d="M${ikf(x)} ${ikf(y-9)}q-4 -2 -3 -6q3 1 3 6q3 -5 4 -5q1 3 -4 5z" fill="#f4d9d4" stroke="${IKC.ink}" stroke-width=".5"/>`;}
  return `<g filter="url(#${p}b)">${t}</g>`;}
function ikDuck(x,y,s){return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M-5 0q5 4 10 0q1 -3 -1 -4q-2 -4 -5 -3q-3 -1 -4 3q-1 3 0 4z" fill="#f2ead4" stroke="${IKC.ink}" stroke-width=".6"/><circle cx="5" cy="-5" r="1.8" fill="${IKC.ink}"/><path d="M6.6 -5l2.4 .6" stroke="${IKC.seal}" stroke-width=".9"/></g>`;}
// người cấy lúa: lưng cong, nón lá
function ikFarmer(p,x,y,s,flip){const k=IKC.ink;return `<g transform="translate(${x} ${y}) scale(${flip?-s:s} ${s})" filter="url(#${p}b)"><path d="M-5 -8l5 -5l5 5z" fill="${IKC.ink2}"/><path d="M-3 -8q3 3 6 0l1 4q-4 3 -8 0z" fill="#e3d6b8"/><path d="M-5 -4q6 -3 12 1l2 8l-3 6h-8l-3 -6z" fill="${k}" opacity=".9"/><path d="M5 -1q6 5 8 10" stroke="${k}" stroke-width="1.6" fill="none" stroke-linecap="round"/><path d="M-2 11l-2 6M4 11l2 6" stroke="${k}" stroke-width="2" stroke-linecap="round"/></g>`;}
// thác + bọt nước chân thác
function ikFall(p,x,y,len,wd){return `<g filter="url(#${p}b)"><path d="M${ikf(x-wd/2)} ${y}q${-wd*.5} ${len*.5} ${-wd*.3} ${len*.9}l${wd*1.8} 0q${wd*.6} ${-len*.4} ${wd*.2} ${-len*.9}z" fill="#f4ecd6" opacity=".78" filter="url(#${p}s)"/><path d="M${x-wd*.2} ${y+4}v${len*.9}M${x+wd*.25} ${y+2}v${len}M${x+wd*.6} ${y+6}v${len*.85}" stroke="${IKC.mist}" stroke-width=".7" opacity=".9"/></g>`;}
// đảo bay: mặt cỏ, đình, thác chảy, rễ buông, chân đá thon dần vào mây
function ikIsland(p,R,x,y,s){const k=IKC.ink;let t=`<path d="M-40 0q40 -10 80 0q-6 10 -14 22q-10 16 -26 30q-16 -14 -26 -30q-8 -12 -14 -22z" fill="url(#${p}g3)"/><path d="M-40 0q40 -10 80 0q-40 8 -80 0z" fill="${k}" opacity=".85"/>`;
  for(let i=0;i<7;i++){const a=-30+i*10;t+=`<path d="M${a} 3q${(R()-.5)*6} ${14+R()*14} ${(R()-.5)*8} ${24+R()*20}" stroke="${k}" stroke-width=".7" fill="none" opacity=".3"/>`;}
  t+=`<path d="M-30 -1q-2 -12 2 -22q4 8 2 22M-22 -1q0 -10 4 -18q2 8 0 18" fill="${k}" opacity=".7"/><g transform="translate(8 -2)"><path d="M-10 0v-9h20v9z" fill="#efe5cc" stroke="${k}" stroke-width=".7"/><path d="M-15 -8Q-8 -10 -5 -16T0 -22T5 -16T15 -8Q8 -7 0 -8Q-8 -7 -15 -8z" fill="${k}"/><path d="M0 -22v-5" stroke="${k}"/></g><path d="M30 8v34" stroke="#f4ecd6" stroke-width="3" opacity=".85" filter="url(#${p}s)"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)">${t}</g>`+ikMist(p,x,y+44*s,60*s,9*s,.8);}
// tiên nhân ngự kiếm: kiếm dài, áo và dải lụa tung bay, vệt mây phía sau
function ikFlyer(p,x,y,s){const k=IKC.ink;return `<g transform="translate(${x} ${y}) scale(${s})" filter="url(#${p}b)"><path d="M-22 6l44 -6l4 2l-4 2z" fill="${k}"/><path d="M-22 6l-2 1l2 1" stroke="${k}"/><path d="M-8 3l2 -14l8 -2l3 16z" fill="${k}"/><path d="M-8 -9q-14 2 -20 12q10 -4 18 -4z" fill="${k}" opacity=".7"/><path d="M4 -10q10 -4 16 4" stroke="${IKC.seal}" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="-1" cy="-17" r="3.2" fill="#e9dcc0" stroke="${k}" stroke-width=".7"/><path d="M-4 -18q3 -6 7 -2l-1 -3q-4 -3 -7 2z" fill="${k}"/><ellipse cx="-1" cy="-22" rx="1.8" ry="2" fill="${k}"/><path d="M-30 9q-20 2 -40 -2M-34 5q-24 -3 -44 -1" stroke="${k}" stroke-width=".8" fill="none" opacity=".25"/></g>`;}

// ================= MÀN MỞ ĐẦU =================
const ik=(cls,body,h)=>`<g class="ik ${cls.split(' ').map(c=>'ik-'+c).join(' ')}" data-ik="${cls.split(' ')[0]}">${h?`<circle cx="${h[0]}" cy="${h[1]}" r="${h[2]}" fill="transparent" pointer-events="all"/>`:''}${body}</g>`;
function inkTitleSVG(){const W=480,H=640,p='t',R=ikRng(88);let s=ikDefs(p,W,H);
  let g='';
  g+=ik('sun',ikSun(p,354,206,22),[354,206,40]);
  // đảo bay + tiên nhân ngự kiếm + hạc trên trời
  g+=ik('isl1',ikIsland(p,R,128,128,.7),[128,150,48])+ik('isl2',ikIsland(p,R,404,92,.38),[404,100,26])+ik('fly',ikFlyer(p,296,150,.9),[296,150,32])+ik('cr cr1',ikCrane(p,196,168,.8,-4),[200,166,26])+ik('cr cr2',ikCrane(p,232,184,.55,-2),[234,182,20])+ik('birds',ikBirds(236,86,4,.9),[252,80,30]);
  // núi xa
  const A=ikRidge(R,-20,500,362,150,4,5);g+=`<path d="${ikFill(A.pts,410)}" fill="url(#${p}g1)" filter="url(#${p}r)"/>`+ikBand(p,A.pts,IKC.ink,10,.05,10)+ikCun(R,A.pts,70,IKC.ink,24,{op:.09});
  g+=ik('mist',ikMist(p,240,362,340,16,.9));
  // núi giữa bên trái: đỉnh cao có chùa, bậc đá ngoằn ngoèo
  const B=ikRidge(R,-40,340,440,260,2,4);g+=`<path d="${ikFill(B.pts,480)}" fill="url(#${p}g2)" filter="url(#${p}r)"/>`+ikBand(p,B.pts,IKC.ink,14,.16,12)+ikCun(R,B.pts,170,IKC.ink,24,{op:.2,w:.7})+ikMoss(R,B.pts,60,IKC.ink,.45);
  const tp=B.pts.filter(q=>q[0]>50&&q[0]<300).reduce((a,b)=>b[1]<a[1]?b:a);
  const hall=(x,y,sc)=>`<g transform="translate(${ikf(x)} ${ikf(y)}) scale(${sc})" filter="url(#${p}b)"><path d="M-10 0v-8h20v8z" fill="#efe5cc" stroke="${IKC.ink}" stroke-width=".7"/><path d="M-4 0v-6h8v6z" fill="${IKC.ink}"/><path d="M-17 -7Q-10 -9 -6 -15T0 -20T6 -15T17 -7Q9 -6 0 -7Q-9 -6 -17 -7z" fill="${IKC.ink}"/></g>`;
  const pag=(x,y,sc)=>`<g transform="translate(${ikf(x)} ${ikf(y)}) scale(${sc})" filter="url(#${p}b)" fill="${IKC.ink}"><path d="M-6 0v-8h12v8z" opacity=".9"/><path d="M-10 -8q10 -6 20 0l-3 -3q-7 -2 -14 0z"/><path d="M-5 -11v-7h10v7z" opacity=".9"/><path d="M-9 -18q9 -5 18 0l-3 -3q-6 -2 -12 0z"/><path d="M-4 -21v-6h8v6z"/><path d="M-7 -27q7 -5 14 0l-2 -2q-5 -2 -10 0z"/><path d="M0 -29v-7" stroke="${IKC.ink}" stroke-width="1"/></g>`;
  g+=ik('pag',pag(tp[0],tp[1]+5,1.4)+hall(tp[0]+30,tp[1]+52,.9)+hall(tp[0]-26,tp[1]+84,.75),[tp[0],tp[1]-10,30]);
  g+=`<path d="M${ikf(tp[0]+4)} ${ikf(tp[1]+8)}q16 10 4 18t8 16q-18 10 -6 18" fill="none" stroke="#efe5cc" stroke-width="1.6" opacity=".7" filter="url(#${p}b)"/>`;
  g+=ik('mist m2',ikMist(p,170,418,260,18,.9));
  // núi gần bên phải: thác nước đổ xuống, thông trên vách
  const C=ikRidge(R,230,540,500,310,2,4);g+=`<path d="${ikFill(C.pts,550)}" fill="url(#${p}g3)" filter="url(#${p}r)"/>`+ikBand(p,C.pts,'#f1e8d2',10,.14,6)+ikBand(p,C.pts,IKC.ink,12,.3,22)+ikCun(R,C.pts,170,'#f1e8d2',34,{op:.16,w:.9})+ikCun(R,C.pts,150,IKC.ink,30,{op:.38,w:.8})+ikMoss(R,C.pts,70,IKC.ink,.7);
  const ct=C.pts.filter(q=>q[0]>290).reduce((a,b)=>b[1]<a[1]?b:a);const fx=ct[0]-34;const fyy=(C.pts.find(q=>q[0]>=fx)||ct)[1];const fy=fyy+40;
  g+=ik('fall',ikFall(p,fx,fy,150,8)+ikMist(p,fx,fy+158,84,14,.95),[fx,fy+70,22]);
  [-6,-9,-12].forEach((i,k)=>{const q=C.pts[C.pts.length+i];g+=ik('pine',ikPine(p,R,q[0],ikf(q[1]+4),1.5+k*.2,IKC.ink),[q[0],q[1]-30,22]);});
  g+=ik('mist m3',ikMist(p,360,482,300,15,.85));
  // vách đá trước mặt: thông cổ thụ và người tu tiên
  const D=ikRidge(R,-50,270,612,210,1,4);g+=`<path d="${ikFill(D.pts,640)}" fill="${IKC.ink}" opacity=".93" filter="url(#${p}r)"/>`+ikBand(p,D.pts,'#f1e8d2',8,.1,16)+ikCun(R,D.pts,120,'#f1e8d2',30,{op:.13,w:.8})+ikMoss(R,D.pts,30,'#000',.4);
  const top=D.pts.reduce((a,b)=>b[1]<a[1]?b:a);
  g+=ik('pine',ikPine(p,R,top[0]-46,top[1]+10,2.4)+ikPine(p,R,top[0]-84,top[1]+36,1.6)+ikPine(p,R,top[0]-18,top[1]+14,1.2),[top[0]-48,top[1]-40,34])+ik('fig',ikFigure(p,top[0]+10,top[1]+3,1.4),[top[0]+10,top[1]-22,26])+ik('cl cl1',ikCloud(top[0]+100,top[1]-30,1.1,0,IKC.ink2,1.1),[top[0]+112,top[1]-34,24])+ik('cl cl2',ikCloud(top[0]+196,top[1]+50,.85,1,IKC.ink2,1),[top[0]+190,top[1]+44,22]);
  // sông, thuyền, đá
  g+=`<path d="M0 566c100 -6 200 -8 300 -3s130 4 180 0v90H0z" fill="${IKC.ink}" opacity=".08" filter="url(#${p}r)"/>`+ikRipples(R,120,450,572,630,22,1)+ik('boat',ikBoat(p,326,596,1.7),[326,590,34])+`<path d="M286 612q4 -10 12 -10t10 10z" fill="${IKC.ink}" opacity=".5" filter="url(#${p}b)"/>`+ikMist(p,240,562,320,10,.7);
  s+=`<g mask="url(#${p}mv)"><g mask="url(#${p}mh)">${g}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" preserveAspectRatio="xMidYMax meet">${s}</svg>`;}

// ================= ẢNH ĐỊA ĐIỂM: THÔN TRẤN PHÀM TRẦN =================
function ikBamboo(p,R,x,y,n){let t='';for(let i=0;i<n;i++){const dx=x+i*9+(R()-.5)*6,h=64+R()*44,l=(R()-.5)*5;t+=`<path d="M${ikf(dx)} ${y}q${ikf(l)} ${-h/2} ${ikf(l*1.4)} ${-h}" fill="none" stroke="${IKC.ink}" stroke-width="${ikf(1.6+R())}" stroke-linecap="round" opacity="${.55+R()*.4}"/>`;for(let k=1;k<5;k++){const yy=y-h*k/5,xx=dx+l*k/3.5;t+=`<path d="M${ikf(xx-1.6)} ${ikf(yy)}h3.2" stroke="${IKC.ink}" stroke-width=".9" opacity=".7"/><path d="M${ikf(xx)} ${ikf(yy)}l${ikf(9+R()*7)} ${ikf(-3-R()*3)}M${ikf(xx)} ${ikf(yy)}l${ikf(7+R()*6)} ${ikf(1+R()*2)}M${ikf(xx)} ${ikf(yy)}l${ikf(-9-R()*7)} ${ikf(-3-R()*3)}M${ikf(xx)} ${ikf(yy)}l${ikf(-7-R()*6)} ${ikf(1+R()*2)}" stroke="${IKC.ink}" stroke-width="2.2" stroke-linecap="round" opacity=".55"/>`;}}
  return `<g filter="url(#${p}b)">${t}</g>`;}
function ikSmoke(x,y,s){return `<path d="M${x} ${y}q${ikf(-5*s)} ${ikf(-8*s)} 0 ${ikf(-14*s)}q${ikf(6*s)} ${ikf(-6*s)} ${ikf(-1*s)} ${ikf(-14*s)}q${ikf(-4*s)} ${ikf(-6*s)} ${ikf(3*s)} ${ikf(-12*s)}q${ikf(5*s)} ${ikf(-6*s)} ${ikf(1*s)} ${ikf(-12*s)}" fill="none" stroke="${IKC.ink}" stroke-width="2" stroke-linecap="round" opacity=".18"/>`;}
function inkVillageSVG(){const W=640,H=360,p='v',R=ikRng(21);let s=ikDefs(p,W,H);let g='';
  g+=ikSun(p,520,66,19)+ikBirds(110,56,4,1)+ikCrane(p,300,50,.5,-6)+ikCrane(p,338,64,.38,-4);
  const A=ikRidge(R,-10,650,200,100,5,5);g+=`<path d="${ikFill(A.pts,260)}" fill="url(#${p}g1)" filter="url(#${p}r)"/>`+ikBand(p,A.pts,IKC.ink,8,.05,8);
  const B=ikRidge(R,-10,650,236,74,4,5);g+=`<path d="${ikFill(B.pts,270)}" fill="url(#${p}g2)" filter="url(#${p}r)"/>`+ikBand(p,B.pts,IKC.ink,9,.12,9)+ikCun(R,B.pts,100,IKC.ink,24,{op:.22})+ikMoss(R,B.pts,24,IKC.ink,.4)+ikMist(p,320,216,380,10,.9);
  // ruộng: dải xanh nhạt + vạch bậc thang
  g+=`<path d="M0 244Q160 230 320 240T640 234V308H0z" fill="${IKC.jade}" opacity=".1" filter="url(#${p}r)"/>`;
  let tr='';for(let i=0;i<8;i++){const y=240+i*7;tr+=`M0 ${y}Q${ikf(160+R()*60)} ${y-6} ${ikf(320+R()*40)} ${y-2}T640 ${y-3}`;}g+=`<path d="${tr}" fill="none" stroke="${IKC.ink}" stroke-width=".8" opacity=".2"/>`;
  let sp='';for(let i=0;i<70;i++){const x=R()*640,y=244+R()*56;sp+=`M${ikf(x)} ${ikf(y)}l-1 -4M${ikf(x)} ${ikf(y)}l1 -4`;}g+=`<path d="${sp}" stroke="${IKC.jade}" stroke-width=".8" opacity=".5"/>`;
  // làng: hai hàng nhà, khói bếp, rào, đèn lồng
  [[48,250,1.0,0],[104,256,1.2,1],[160,246,1.35,0],[218,256,1.05,1],[270,250,1.2,0]].forEach(([x,y,sc,l],i)=>{g+=ikHouse2(p,x,y,sc,{lantern:l,roof:i%2?IKC.ink:IKC.ink2})+(i%2?'':ikSmoke(x+4,y-26*sc,1));});
  g+=ikTree(p,R,128,262,1.5)+ikTree(p,R,244,264,1.3)+ikTree(p,R,10,268,1.5)+ikTree(p,R,300,262,1.1)+ikFence(30,272,8,1.2)+ikFence(190,274,7,1.1);
  g+=ikMist(p,180,268,260,8,.75);
  // ao sen + vịt, bờ sông
  g+=ikLotusPond(p,R,150,300,70,14)+ikDuck(120,298,1)+ikDuck(176,303,.9);
  // dòng sông uốn, cầu đá vòm có lan can
  g+=`<path d="M300 296c60 -10 120 -6 180 -8s110 6 160 -2v76H300z" fill="${IKC.ink}" opacity=".1" filter="url(#${p}r)"/>`+ikRipples(R,300,630,304,350,18,1.1);
  g+=`<g filter="url(#${p}b)" transform="translate(440 306)"><path d="M-70 4q70 -42 140 0v-5q-70 -44 -140 0z" fill="${IKC.ink}" opacity=".88"/><path d="M-54 2q54 -32 108 0v8h-108z" fill="${IKC.ink2}" opacity=".35"/><path d="M-28 8q28 -24 56 0" fill="#e9dfc6" opacity=".7"/><path d="M-28 8q28 -24 56 0" fill="none" stroke="${IKC.ink}" stroke-width="1.4"/><path d="M-54 -9v-6M-36 -20v-6M-18 -27v-6M0 -30v-6M18 -27v-6M36 -20v-6M54 -9v-6" stroke="${IKC.ink}" stroke-width="1.2"/><path d="M-56 -15q56 -38 112 0" fill="none" stroke="${IKC.ink}" stroke-width="1"/><path d="M-60 6h8M52 6h8" stroke="${IKC.ink}" stroke-width="1" opacity=".4"/></g>`;
  // liễu rủ
  g+=`<g filter="url(#${p}b)" transform="translate(356 304)"><path d="M0 0q-2 -22 -1 -44" stroke="${IKC.ink}" stroke-width="3.4" fill="none" stroke-linecap="round"/>${Array.from({length:24},(_,i)=>{const a=-34+i*2.9+(R()-.5)*3;return `<path d="M-1 ${-42+R()*4}q${ikf(a)} 4 ${ikf(a*1.3)} ${ikf(28+R()*22)}" stroke="${IKC.ink}" stroke-width=".9" fill="none" opacity="${ikf(.35+R()*.45)}"/>`;}).join('')}</g>`;
  g+=ikBamboo(p,R,566,312,7)+ikBamboo(p,R,608,320,4);
  // ruộng trước mặt: người cấy lúa, trâu, người đội nón dắt trâu
  g+=`<path d="M0 332c90 -18 190 -22 300 -10s220 12 340 4v40H0z" fill="${IKC.ink}" opacity=".16" filter="url(#${p}r)"/>`;
  g+=ikFarmer(p,60,326,1.2)+ikFarmer(p,96,330,1.05,1)+ikFarmer(p,136,324,1.1);
  g+=`<g transform="translate(262 344)" filter="url(#${p}b)"><ellipse cx="0" cy="-17" rx="21" ry="9.5" fill="${IKC.ink}"/><path d="M16 -22q7 -5 12 -3l5 3q4 3 2 7q-3 4 -9 2q-5 -1 -10 -3z" fill="${IKC.ink}"/><path d="M28 -26q-3 -8 -10 -9M30 -24q4 -9 -2 -13" fill="none" stroke="${IKC.ink}" stroke-width="1.8" stroke-linecap="round"/><path d="M-18 -12v12M-9 -9v9M7 -9v9M16 -12v12" stroke="${IKC.ink}" stroke-width="3" stroke-linecap="round"/><path d="M-21 -21q-9 2 -9 13" fill="none" stroke="${IKC.ink}" stroke-width="1.6"/><path d="M33 -19l10 4" stroke="${IKC.ink2}" stroke-width=".9"/></g>`;
  g+=`<g transform="translate(316 344)" filter="url(#${p}b)"><path d="M-12 -34l12 -10l12 10z" fill="${IKC.ink2}"/><path d="M-5 -34q5 6 10 0l1 5q-6 5 -12 0z" fill="#d9ceb0"/><path d="M-6 -29l-4 29h14l-2 -29z" fill="${IKC.ink}"/><path d="M-6 -27l-8 8M6 -27l10 10" stroke="${IKC.ink}" stroke-width="2.4" stroke-linecap="round"/><path d="M-4 0l-3 4M3 0l5 4" stroke="${IKC.ink}" stroke-width="2.4"/><path d="M-14 -19q-8 5 -22 8" fill="none" stroke="${IKC.ink2}" stroke-width=".9"/></g>`;
  g+=ikMist(p,320,356,420,8,.7);
  s+=`<g mask="url(#${p}mh)"><g mask="url(#${p}mv)">${g}</g></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}">${s}</svg>`;}

// ================= CHÂN DUNG NHÂN VẬT (100x100) =================
function inkHeroSVG(g){const nu=g==='nu',p='h'+(nu?'n':'m'),R=ikRng(nu?5:9),k=IKC.ink,k2=IKC.ink2;let s=ikDefs(p,100,100);
  const rA=nu?'#b8707c':'#4a6580',rB=nu?'#7c4452':'#273a4f',rC=nu?'#f0d8d0':'#e9e2cf';
  s=s.replace('</defs>',`<radialGradient id="${p}sk" cx=".45" cy=".38" r=".75"><stop offset="0" stop-color="${nu?'#fbebd8':'#f8e4c8'}"/><stop offset=".7" stop-color="${nu?'#f2d6bb':'#eccfa8'}"/><stop offset="1" stop-color="#d9b48a"/></radialGradient>
  <radialGradient id="${p}bg" cx=".5" cy=".4" r=".7"><stop offset="0" stop-color="#f3eacf"/><stop offset="1" stop-color="#d9cca6"/></radialGradient>
  <linearGradient id="${p}rb" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${rA}"/><stop offset="1" stop-color="${rB}"/></linearGradient>
  <clipPath id="${p}cc"><circle cx="50" cy="50" r="50"/></clipPath></defs>`);
  let b=`<g clip-path="url(#${p}cc)"><circle cx="50" cy="50" r="50" fill="url(#${p}bg)"/>`;
  // nền: núi xa, trăng/hoa, sương
  b+=`<g filter="url(#${p}s)" opacity=".6"><path d="M-6 66L12 38l10 12 14 -22 16 26 12 -14 18 24 20 -10v30H-6z" fill="${k}" opacity=".3"/></g><circle cx="${nu?78:22}" cy="22" r="9" fill="#fbf4de" opacity=".85"/><circle cx="${nu?78:22}" cy="22" r="9" fill="none" stroke="${k}" stroke-width=".4" opacity=".3"/>`;
  b+=nu?`<g filter="url(#${p}b)" stroke="${k}" fill="none" opacity=".6"><path d="M96 10q-18 8 -26 26" stroke-width="1.2"/>${[[88,16],[80,24],[74,32]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.6" fill="#f2c9d0" stroke-width=".4"/>`).join('')}</g>`:`<g filter="url(#${p}b)" stroke="${k}" opacity=".5" fill="none"><path d="M4 70q4 -20 3 -40M12 74q2 -24 6 -44" stroke-width="1.2"/><path d="M7 50l9 -4M7 40l-6 -4M18 54l8 -4" stroke-width="2.4" stroke-linecap="round"/></g>`;
  b+=ikMist(p,50,76,60,8,.8).replace('stdDeviation','stdDeviation');
  // tóc sau (nữ: xõa dài phía sau vai)
  if(nu)b+=`<g filter="url(#${p}b)"><path d="M26 50C20 28 28 10 50 10S80 28 74 50C72 62 76 78 80 100H20C24 78 28 62 26 50z" fill="${k}"/><path d="M30 40q-3 24 -6 56M36 46q-4 20 -6 50M70 40q3 24 6 56M64 46q4 20 6 50" stroke="#fff" stroke-width=".5" fill="none" opacity=".18"/></g>`;
  // áo ngoài
  b+=`<g filter="url(#${p}b)"><path d="M2 100C4 82 22 74 50 74s46 8 48 26z" fill="url(#${p}rb)"/><path d="M2 100C4 82 20 75 36 74c-4 10 -14 20 -26 26z" fill="${rB}" opacity=".5"/><path d="M98 100C96 82 80 75 64 74c4 10 14 20 26 26z" fill="#fff" opacity=".07"/>`;
  // nếp áo = nét khô
  b+=`<path d="M16 96q8 -12 20 -18M84 96q-8 -12 -20 -18M26 100q6 -10 14 -14M74 100q-6 -10 -14 -14M10 90q4 -4 10 -8" stroke="${k}" stroke-width=".9" fill="none" opacity=".45" stroke-linecap="round"/>`;
  // họa tiết mây thêu trên vai
  b+=`<g opacity=".7">${ikCloud(22,90,.7,0,IKC.gold,.9)}${ikCloud(78,90,.7,1,IKC.gold,.9)}</g>`;
  // cổ áo ba lớp: trắng trong, viền đỏ, xanh ngoài
  b+=`<path d="M36 74l14 22l14 -22l-5 -3l-9 13l-9 -13z" fill="${rC}" stroke="${k}" stroke-width=".7"/><path d="M33 73l17 26l17 -26" fill="none" stroke="${IKC.seal}" stroke-width="1.4" opacity=".85"/><path d="M30 74l20 30l20 -30" fill="none" stroke="${rA}" stroke-width="3" opacity=".9"/><path d="M42 80l8 12l8 -12" fill="none" stroke="${k}" stroke-width=".5" opacity=".4"/><path d="M26 100q24 -10 48 0" stroke="${IKC.gold}" stroke-width="2" fill="none" opacity=".8"/></g>`;
  // cổ
  b+=`<g filter="url(#${p}b)"><path d="M43 60v16q7 6 14 0V60z" fill="url(#${p}sk)" stroke="${k2}" stroke-width=".6"/><path d="M43 66q7 6 14 0v5q-7 5 -14 0z" fill="${k}" opacity=".13"/></g>`;
  // tai + mặt
  b+=`<g filter="url(#${p}b)"><ellipse cx="32.5" cy="45" rx="2.8" ry="5" fill="url(#${p}sk)" stroke="${k2}" stroke-width=".6"/><ellipse cx="67.5" cy="45" rx="2.8" ry="5" fill="url(#${p}sk)" stroke="${k2}" stroke-width=".6"/><path d="M33 42C33 28 40 19 50 19C60 19 67 28 67 42C67 56 60 66 50 68C40 66 33 56 33 42z" fill="url(#${p}sk)" stroke="${k2}" stroke-width=".8"/><path d="M34 52q6 14 16 15q-12 -2 -16 -15z" fill="${k}" opacity=".08"/></g>`;
  // tóc trước
  if(nu)b+=`<g filter="url(#${p}b)"><path d="M32 44C29 26 38 15 50 15S71 26 68 44C66 36 64 32 60 29C55 34 45 34 40 29C36 32 34 36 32 44z" fill="${k}"/><path d="M38 24q8 -6 18 -2M42 20q8 -3 14 0" stroke="#fff" stroke-width=".7" fill="none" opacity=".35"/><ellipse cx="50" cy="12" rx="9" ry="6.5" fill="${k}"/><path d="M44 10q6 -5 12 0" stroke="#fff" stroke-width=".6" fill="none" opacity=".3"/><path d="M56 10l12 -3" stroke="${IKC.gold}" stroke-width="1.8" stroke-linecap="round"/><circle cx="69" cy="6.6" r="2.4" fill="${IKC.seal}"/><path d="M69 9q2 8 -1 14" stroke="${IKC.gold}" stroke-width=".7" fill="none"/>${[[36,14],[40,10],[33,19]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="2.8" fill="#f2c0c8" stroke="${k}" stroke-width=".4"/><circle cx="${x}" cy="${y}" r=".8" fill="${IKC.gold}"/>`).join('')}</g>`;
  else b+=`<g filter="url(#${p}b)"><path d="M32 43C29 25 38 15 50 15S71 25 68 43C67 35 65 31 62 28C57 33 43 33 38 28C35 31 33 35 32 43z" fill="${k}"/><path d="M36 26q6 -7 16 -6M41 22q7 -3 13 0M60 24q4 2 6 8" stroke="#fff" stroke-width=".7" fill="none" opacity=".3"/><path d="M32 43q-1 10 1 15M68 43q1 10 -1 15" stroke="${k}" stroke-width="1.6" fill="none" stroke-linecap="round"/><ellipse cx="50" cy="12" rx="6.4" ry="6" fill="${k}"/><path d="M45 10q5 -4 10 0M46 14q4 2 8 0" stroke="#fff" stroke-width=".5" fill="none" opacity=".3"/><path d="M42 19h16l-1.6 -6h-12.8z" fill="${IKC.gold}" stroke="${k}" stroke-width=".6"/><circle cx="50" cy="16" r="1.5" fill="${IKC.jade}"/><path d="M38 12h24" stroke="${IKC.jade}" stroke-width="1.5" stroke-linecap="round"/></g>`;
  // ngũ quan: mày thon, mắt hạnh nhân có mí, mũi, môi
  const eye=(cx,f)=>`<g transform="translate(${cx} 46) scale(${f*.72} .72)"><path d="M-6 0q6 -5 12 .5q-6 3 -12 -.5z" fill="#fbf6ea" stroke="${k}" stroke-width=".4"/><circle cx="0" cy="-.5" r="2.2" fill="${k2}"/><circle cx="0" cy="-.5" r="1.1" fill="${k}"/><circle cx=".7" cy="-1.4" r=".7" fill="#fff"/><path d="M-6.6 .2q6.6 -6 13.4 .6" fill="none" stroke="${k}" stroke-width="1.5" stroke-linecap="round"/><path d="M6.8 .8l1.8 -1.2" stroke="${k}" stroke-width=".8" stroke-linecap="round"/><path d="M-4 2q4 1.6 8 0" stroke="${k2}" stroke-width=".4" fill="none" opacity=".5"/><path d="M-5 -4.6q5 -2 10 -.2" stroke="${k2}" stroke-width=".4" fill="none" opacity=".4"/></g>`;
  b+=`<g filter="url(#${p}b)">${eye(41.4,1)}${eye(58.6,-1)}<path d="M35 39q7 -5 14 -2.4q-7 -.4 -14 2.4zM65 39q-7 -5 -14 -2.4q7 -.4 14 2.4z" fill="${k}" opacity=".9"/><path d="M50 48q-1.6 5 -.6 7q1.4 1.2 3.4 0" fill="none" stroke="${k2}" stroke-width=".7" stroke-linecap="round"/><path d="M47.4 55q-1 .8 0 1.4M52.6 55q1 .8 0 1.4" stroke="${k2}" stroke-width=".5" fill="none"/><path d="M43.6 60.6q6.4 -2.4 12.8 0q-6.4 4 -12.8 0z" fill="${IKC.seal}" opacity=".82"/><path d="M43.6 60.6q6.4 .8 12.8 0" stroke="${k}" stroke-width=".4" fill="none" opacity=".6"/><path d="M46 66q4 1.4 8 0" stroke="${k}" stroke-width=".4" fill="none" opacity=".2"/>${nu?`<ellipse cx="38.4" cy="53" rx="5" ry="2.8" fill="${IKC.seal}" opacity=".15"/><ellipse cx="61.6" cy="53" rx="5" ry="2.8" fill="${IKC.seal}" opacity=".15"/><path d="M50 27l2.2 2.6l-2.2 2.6l-2.2 -2.6z" fill="${IKC.seal}" opacity=".85"/><circle cx="32.5" cy="52" r="1.4" fill="${IKC.gold}"/><path d="M32.5 53.4v6" stroke="${IKC.gold}" stroke-width=".6"/><circle cx="67.5" cy="52" r="1.4" fill="${IKC.gold}"/><path d="M67.5 53.4v6" stroke="${IKC.gold}" stroke-width=".6"/>`:`<path d="M44 64q6 5 12 0" stroke="${k}" stroke-width=".6" fill="none" opacity=".5"/><path d="M46 62q4 5 8 0" stroke="${k}" stroke-width=".35" fill="none" opacity=".35"/>`}</g>`;
  // ấn đỏ
  b+=`<rect x="78" y="76" width="9" height="9" rx="1" fill="${IKC.seal}" opacity=".9" transform="rotate(-6 82 80)"/><path d="M80 78.4h5M80 82.6h5M82.5 77.6v6.6" stroke="#f6eedd" stroke-width=".9" transform="rotate(-6 82 80)"/></g>`;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">${s}${b}</svg>`;}

// ================= KHUNG AVATAR 5 BẬC =================
// 0 Phế vật: vòng đứt, mực nhạt, nứt · 1 Bình phàm: một vòng mực · 2 Bất phàm: hai vòng, trúc và ngọc
// 3 Tinh anh: bạc, sen và mây · 4 Thiên kiêu: vàng kim, mây cuộn, ấn son
function ikRing(R,r,w,col,o){o=o||{};const n=o.n||72,a0=o.a0||0,a1=o.a1==null?6.2832:o.a1,ph=R()*6;let d='';
  for(let i=0;i<=n;i++){const a=a0+(a1-a0)*i/n;const rr=r+(R()-.5)*(o.j||.5)+Math.sin(a*3+ph)*(o.w2||.45);d+=(i?'L':'M')+ikf(50+Math.cos(a)*rr)+' '+ikf(50+Math.sin(a)*rr);}
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${o.op?` opacity="${o.op}"`:''}${o.f?` filter="url(#${o.f})"`:''}/>`;}
function ikSeal(x,y,s,col,glyph){let m='';
  if(glyph==='tian')m='M-3.4 -2.6h6.8M-4.4 .4h8.8M0 -2.6l-3.8 6.6M0 .4l4 3.8';
  else m='M-3.6 -2.4h7.2M-3.6 2.4h7.2M0 -4v8M-3 -.2h6';
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-5.4" y="-5.4" width="10.8" height="10.8" rx="1" fill="${col}"/><path d="${m}" stroke="#f6eedd" stroke-width="1.1" fill="none" stroke-linecap="round"/></g>`;}
function ikLotus(x,y,s,fill,stroke){const pt=(a,l)=>`<path transform="rotate(${a})" d="M0 0C-3 -3 -3 ${-l+2} 0 ${-l}C3 ${-l+2} 3 -3 0 0z" fill="${fill}" stroke="${stroke}" stroke-width=".7"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${pt(-56,7)}${pt(56,7)}${pt(-28,9)}${pt(28,9)}${pt(0,10)}</g>`;}
// ---- khung 5 bậc, kiểu cánh + huy hiệu + ngọc như khung Liên Quân, nhưng bằng mực và màu khoáng ----
const IKP={0:{a:'#cfc9bd',b:'#8f897d',c:'#5a554b'},1:{a:'#8d867a',b:'#4b4538',c:'#26221d'},2:{a:'#d2efe2',b:'#58a888',c:'#26503f'},3:{a:'#ffffff',b:'#b4c1cf',c:'#34567a'},4:{a:'#fff3bd',b:'#e3b13c',c:'#8a5a05'}};
const ikGradDef=(id,P)=>`<linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset=".5" stop-color="${P.b}"/><stop offset="1" stop-color="${P.c}"/></linearGradient>`;
// một lông cánh: gốc ở (0,0), chỉ về +x, xoay ang độ (âm = hướng lên)
const ikFeather=(L,w,ang,fill,line)=>`<g transform="rotate(${ang})"><path d="M0 0C${ikf(L*.3)} ${ikf(-w)} ${ikf(L*.72)} ${ikf(-w*.95)} ${L} ${ikf(-L*.14)}C${ikf(L*.74)} ${ikf(w*.12)} ${ikf(L*.34)} ${ikf(w*.5)} 0 0z" fill="${fill}" stroke="${line}" stroke-width=".7" stroke-linejoin="round"/><path d="M${ikf(L*.1)} ${ikf(-w*.08)}Q${ikf(L*.55)} ${ikf(-w*.55)} ${ikf(L*.92)} ${ikf(-L*.12)}" fill="none" stroke="#fff" stroke-width=".5" opacity=".65"/></g>`;
// cánh bên phải, gốc (x,y); n lông, dài L, xòe spread độ, ngẩng lên base độ
function ikWing(n,L,w,spread,base,fill,line,x,y){let t='';for(let i=n-1;i>=0;i--){const f=n>1?i/(n-1):0;t+=ikFeather(L*(1-f*.42),w*(1-f*.2),-(base+f*spread),fill,line);}return `<g transform="translate(${x} ${y})">${t}</g>`;}
const ikMirror=(g,w)=>`<g transform="translate(${w} 0) scale(-1 1)">${g}</g>`;
function ikGem(x,y,r,fill,line){return `<path d="M${x} ${y-r}L${x+r*.8} ${y}L${x} ${y+r}L${x-r*.8} ${y}Z" fill="${fill}" stroke="${line||IKC.ink}" stroke-width=".8" stroke-linejoin="round"/><path d="M${x} ${y-r}L${x-r*.2} ${y-r*.1}L${x} ${y+r*.9}" fill="none" stroke="#fff" stroke-width=".5" opacity=".6"/>`;}
function ikFrameInner(t){const R=ikRng(30+t),ink=IKC.ink,P=IKP[t],gid='ikg'+t,gf=`url(#${gid})`;let s=`<defs>${ikGradDef(gid,P)}</defs>`;
  if(t===0){const gap=[[.3,1.9],[2.2,3.7],[4.1,5.9]];s+=gap.map(([a,b])=>ikRing(R,41,2.2,'#6f685c',{a0:a,a1:b,n:20,j:1.2,op:.75})).join('')+gap.map(([a,b])=>ikRing(R,41.6,.8,ink,{a0:a+.1,a1:b-.2,n:16,j:1.6,op:.35})).join('');
    s+=`<g stroke="${ink}" fill="none" stroke-linecap="round" opacity=".5"><path d="M50 8.6l-1.6 4 2 3M88 62l-5 1 -2 3.6M22 80l2 -3.4 -1 -4"/></g><g fill="${ink}" opacity=".3"><circle cx="9" cy="56" r="1.3"/><circle cx="91" cy="38" r="1.1"/><circle cx="80" cy="84" r=".8"/></g>`;
    s+=`<g fill="none" stroke="#6f685c" stroke-linecap="round" opacity=".8"><path d="M44 94q4 -3 8 -1q4 3 8 1" stroke-width="1"/><path d="M52 93q-1 4 -5 6M52 93q2 4 7 5" stroke-width=".9"/><path d="M47 99q-3 1 -4 -2q3 -1 4 2zM59 98q3 -1 3 -4q-3 0 -3 4z" fill="#8f897d" stroke="none" opacity=".7"/></g>`;}
  else if(t===1){s+=ikRing(R,41,3.2,ink,{j:.7,op:.92})+ikRing(R,41.4,1.3,ink,{j:1.1,op:.4,w2:.8});
    const w=ikWing(3,9,3.2,22,8,'#e9e1cc',ink,90,54);s+=w+ikMirror(w,100);
    s+=`<path d="M50 9l-3 -4.4h6z" fill="${ink}"/><path d="M50 91.6l-3 4.2 3 4.2 3 -4.2z" fill="${ink}" opacity=".85"/>`;}
  else if(t===2){const J=IKC.jade;s+=ikRing(R,41,3,ink,{j:.7,op:.92})+ikRing(R,37.6,1,J,{j:.4,op:.85})+ikRing(R,44.6,.7,ink,{j:.9,op:.35,a0:.4,a1:5.6,n:40});
    const w=ikWing(4,13,3.8,30,6,gf,ink,90,56);s+=w+ikMirror(w,100);
    s+=ikGem(50,5,4.4,gf)+`<path d="M50 9.4v3" stroke="${ink}" stroke-width=".8"/>`+ikGem(50,93,4.2,gf)+`<g fill="${J}" stroke="${ink}" stroke-width=".6" opacity=".95"><path d="M45 94q-8 -1 -10 -6q7 0 10 6zM55 94q8 -1 10 -6q-7 0 -10 6z"/></g>`;}
  else if(t===3){const A=IKC.indigo;s+=ikRing(R,41.4,4,ink,{j:.5,op:.95})+ikRing(R,41.2,1.6,'#dfe6ec',{j:.5,op:.9,w2:.3,n:80})+ikRing(R,46,.9,A,{j:.8,op:.8,a0:-.5,a1:3.6,n:44})+ikRing(R,46,.9,A,{j:.8,op:.8,a0:3.9,a1:5.8,n:20})+ikRing(R,37.7,.8,A,{j:.4,op:.8});
    const w=ikWing(5,14,4,38,6,gf,A,91,52);s+=w+ikMirror(w,100);
    s+=`<g>${ikLotus(50,10,1.05,gf,A)}</g>`+ikGem(50,6,3,'#fff',A).replace('M','M')+`<g>${ikCloud(30,91,1.1,1,A,1.4)}${ikCloud(70,91,1.1,0,A,1.4)}</g>`+ikGem(50,93,5,gf,A)+`<path d="M50 98.6v3" stroke="${A}" stroke-width=".8"/>`;}
  else{const G=IKC.gold;s+=`<circle cx="50" cy="50" r="47" fill="none" stroke="${G}" stroke-width=".7" stroke-dasharray="1.6 3.2" opacity=".75"/>`+ikRing(R,41.6,5,ink,{j:.4,op:.97,w2:.3})+ikRing(R,41.6,3.2,gf,{j:.3,op:1,w2:.3,n:90})+ikRing(R,41.4,1.1,'#fff1b0',{j:.3,op:.85,a0:3.3,a1:5.7,n:40})+ikRing(R,37.4,.9,G,{j:.4,op:.9});
    const w=ikWing(6,16,4.4,44,4,gf,ink,92,50);s+=w+ikMirror(w,100);
    s+=`<path d="M50 8.6l-5 -3.4l1 -4l4 2l4 -2l1 4z" fill="${gf}" stroke="${ink}" stroke-width=".8" stroke-linejoin="round"/><circle cx="50" cy="4.6" r="2" fill="${IKC.seal}" stroke="${ink}" stroke-width=".5"/>`;
    s+=`<g>${ikCloud(24,90,1.3,1,ink,1.8)}${ikCloud(76,90,1.3,0,ink,1.8)}${ikCloud(24,90,1.3,1,G,.8)}${ikCloud(76,90,1.3,0,G,.8)}</g>`+ikSeal(50,93,.98,IKC.seal,'tian');}
  return s;}
// ô Thiên phú ở tab Căn cơ: mào cánh ở giữa viền trên, kẹp góc, ngọc dưới đáy; bậc càng cao cánh càng dài
function ikCrest(t){const P=IKP[t],ink=IKC.ink,gid='ikc'+t,gf=`url(#${gid})`;let s=`<defs>${ikGradDef(gid,P)}</defs>`;
  if(t===0)s+=`<g fill="none" stroke="#6f685c" stroke-linecap="round" opacity=".8"><path d="M86 50q8 -6 14 -2q6 -4 14 2" stroke-width="1.4"/><path d="M96 49l-2 -8M104 49l2 -6" stroke-width="1"/></g>`;
  else if(t===1){const w=ikWing(3,26,4,20,6,'#e9e1cc',ink,106,44);s+=w+ikMirror(w,200)+`<path d="M100 50l-6 -8l6 -8l6 8z" fill="${ink}"/>`;}
  else if(t===2){const w=ikWing(4,46,6,28,5,gf,ink,108,44);s+=w+ikMirror(w,200)+ikGem(100,36,9,gf)+`<path d="M92 44h16" stroke="${ink}" stroke-width="1.2"/>`;}
  else if(t===3){const w=ikWing(5,66,7,36,4,gf,IKC.indigo,110,42);s+=w+ikMirror(w,200)+ikLotus(100,50,1.4,gf,IKC.indigo)+ikGem(100,28,7,'#fff',IKC.indigo);}
  else{const w=ikWing(7,86,8.5,46,3,gf,ink,112,42);s+=w+ikMirror(w,200)+`<path d="M100 52l-14 -8l-2 -12l8 4l8 -8l8 8l8 -4l-2 12z" fill="${gf}" stroke="${ink}" stroke-width="1" stroke-linejoin="round"/><circle cx="100" cy="34" r="4.4" fill="${IKC.seal}" stroke="${ink}" stroke-width=".7"/><circle cx="98.6" cy="32.8" r="1.2" fill="#fff" opacity=".7"/>`;}
  return `<svg class="ikp-top" viewBox="0 0 200 56" aria-hidden="true">${s}</svg>`;}
function ikCorner(t){const P=IKP[t],ink=IKC.ink,gid='ikn'+t,gf=`url(#${gid})`;let s=`<defs>${ikGradDef(gid,P)}</defs>`;
  if(t===0)s+=`<path d="M3 18V6l4 -3h6M7 3l3 5" fill="none" stroke="#6f685c" stroke-width="1.6" stroke-linecap="round"/>`;
  else if(t===1)s+=`<path d="M3 24V5q0 -2 2 -2h19" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/><circle cx="5" cy="5" r="2" fill="${ink}"/>`;
  else if(t===2)s+=`<path d="M3 28V6q0 -3 3 -3h22" fill="none" stroke="${ink}" stroke-width="2.4" stroke-linecap="round"/><path d="M8 24V9q0 -1 1 -1h15" fill="none" stroke="${IKC.jade}" stroke-width="1.2"/>${ikGem(6,6,5,gf)}<path d="M13 3q4 -3 8 0M3 13q-3 4 0 8" fill="none" stroke="${IKC.jade}" stroke-width="1.4" stroke-linecap="round"/>`;
  else if(t===3)s+=`<path d="M3 32V7q0 -4 4 -4h25" fill="none" stroke="${ink}" stroke-width="2.6" stroke-linecap="round"/><path d="M8 28V10q0 -2 2 -2h18" fill="none" stroke="${IKC.indigo}" stroke-width="1.2"/>${ikGem(7,7,6,gf,IKC.indigo)}${ikCloud(22,8,.8,0,IKC.indigo,1.2)}<g transform="rotate(90 8 8) translate(2 -8)">${ikCloud(12,16,.8,0,IKC.indigo,1.2)}</g>`;
  else s+=`<path d="M3 36V8q0 -5 5 -5h28" fill="none" stroke="${ink}" stroke-width="3.2" stroke-linecap="round"/><path d="M3 36V8q0 -5 5 -5h28" fill="none" stroke="${gf}" stroke-width="1.8" stroke-linecap="round"/>${ikGem(8,8,7,gf)}<circle cx="8" cy="8" r="2" fill="${IKC.seal}"/>${ikFeather(18,4,-4,gf,ink).replace('<g ','<g transform-origin="0 0" ')}<g transform="translate(6 20) rotate(94)">${ikFeather(14,3.4,-4,gf,ink)}</g><g transform="translate(20 6)">${ikFeather(14,3.2,-8,gf,ink)}</g>`;
  return `<svg class="ikp-c" viewBox="0 0 40 40" aria-hidden="true">${s}</svg>`;}
function ikBottom(t){const P=IKP[t],ink=IKC.ink,gid='ikb'+t,gf=`url(#${gid})`;let s=`<defs>${ikGradDef(gid,P)}</defs>`;
  if(t===0)return '';
  if(t===1)s+=`<path d="M40 12h40" stroke="${ink}" stroke-width="1.4"/><circle cx="60" cy="12" r="2.4" fill="${ink}"/>`;
  else if(t===2)s+=`<path d="M30 12h22M68 12h22" stroke="${ink}" stroke-width="1.4"/>${ikGem(60,12,6,gf)}`;
  else if(t===3){const w=ikWing(3,24,3.2,16,6,gf,IKC.indigo,66,12);s+=w+ikMirror(w,120)+ikGem(60,12,6.4,gf,IKC.indigo)+`<path d="M14 12h24M82 12h24" stroke="${IKC.indigo}" stroke-width="1.2"/>`;}
  else{const w=ikWing(4,34,3.6,20,4,gf,ink,68,12);s+=w+ikMirror(w,120)+ikGem(60,12,7.6,gf)+`<circle cx="60" cy="12" r="2.2" fill="${IKC.seal}"/>`;}
  return `<svg class="ikp-bot" viewBox="0 0 120 24" aria-hidden="true">${s}</svg>`;}
function ikPlaque(t){const n=t.tier;return `<span class="ikp ikp${n}">${ikCrest(n)}<i class="tl">${ikCorner(n)}</i><i class="tr">${ikCorner(n)}</i><i class="bl">${ikCorner(n)}</i><i class="br">${ikCorner(n)}</i>${ikBottom(n)}</span>`;}
const IK_FR={};
function ikFrameSvgFull(t){if(IK_FR[t])return IK_FR[t];const p='f'+t;
  return IK_FR[t]=`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><filter id="${p}b" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="${t+3}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.2"/></filter></defs><g filter="url(#${p}b)">${ikFrameInner(t)}</g></svg>`;}
function ikTalFrame(t,id){return t&&t.tier>=0?`<svg viewBox="0 0 100 100" aria-hidden="true"><defs><filter id="${id||'tfi'}${t.tier}" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".6" numOctaves="2" seed="${t.tier+3}" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="1.2"/></filter></defs><g filter="url(#${id||'tfi'}${t.tier})">${ikFrameInner(t.tier)}</g></svg>`:'';}

talFrameSVG=ikTalFrame;
talCardOrn=ikPlaque; // panels.js gán lại talFrameSVG ở cuối tệp, nên phải gán đè ở đây

// ================= NỀN BẢN ĐỒ: giấy dó loang mực =================
// vệt loang nhạt + sợi giấy; vẽ lên mặt đất đã dựng
function ikPaperWash(g,S,rnd,k,C){const ink=C.ink||IKC.ink;
  for(let i=0;i<26;i++){const x=rnd()*S,y=rnd()*S,r=(60+rnd()*220)*k;const gr=g.createRadialGradient(x,y,0,x,y,r);const a=.018+rnd()*.03;gr.addColorStop(0,hexA(rnd()<.5?ink:C.gold,a));gr.addColorStop(1,hexA(ink,0));g.fillStyle=gr;g.fillRect(x-r,y-r,r*2,r*2);}
  g.lineWidth=.6;for(let i=0;i<(S>1000?320:150);i++){const x=rnd()*S,y=rnd()*S,l=(6+rnd()*22),a=rnd()*6.28;g.strokeStyle=hexA(ink,.025+rnd()*.035);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+Math.cos(a)*l*.6+rnd()*4,y+Math.sin(a)*l*.6+rnd()*4,x+Math.cos(a)*l,y+Math.sin(a)*l);g.stroke();}}
// núi thủy mặc: mảng loang đậm nhạt, nét sống núi, nét cun cào sườn, chấm rêu, sương dưới chân
function ikMountain(g,X,Y,w,h,rnd,k,C){const ink=C.ink||IKC.ink;
  const pk=[[-1,.28],[-.62,.52],[-.3,.78],[-.06,1],[.16,.82],[.42,.52],[.72,.3],[1,0]];const top=y=>Y+h*.3-h*y*1.3;
  const pts=pk.map(([a,b],i)=>[X+a*w*(1+(rnd()-.5)*.1),i===0||i===pk.length-1?Y+h*.3:Y+h*.3-h*b*1.25*(1+(rnd()-.5)*.12)]);
  const path=()=>{g.beginPath();g.moveTo(pts[0][0],Y+h*.34);for(let i=0;i<pts.length;i++){const a=pts[i],b=pts[i+1]||a;if(i===0)g.lineTo(a[0],a[1]);else{const pr=pts[i-1];g.quadraticCurveTo(pr[0]+(a[0]-pr[0])*.2,pr[1]+(a[1]-pr[1])*.75,(pr[0]+a[0])/2,(pr[1]+a[1])/2);g.lineTo(a[0],a[1]);}}g.lineTo(pts[pts.length-1][0],Y+h*.34);g.closePath();};
  const gr=g.createLinearGradient(0,Y-h,0,Y+h*.34);gr.addColorStop(0,hexA(ink,.5));gr.addColorStop(.55,hexA(ink,.16));gr.addColorStop(1,hexA(ink,0));path();g.fillStyle=gr;g.fill();
  // nửa tối bên phải
  g.save();path();g.clip();const sh=g.createLinearGradient(X,0,X+w,0);sh.addColorStop(0,hexA(ink,0));sh.addColorStop(1,hexA(ink,.22));g.fillStyle=sh;g.fillRect(X-w,Y-h,w*2.4,h*1.6);
  g.lineCap='round';g.strokeStyle=hexA(ink,.22);g.lineWidth=Math.max(.6,.9*k);const n=Math.round(14+w/k/3);
  for(let i=0;i<n;i++){const p=pts[1+Math.floor(rnd()*(pts.length-2))];const x=p[0]+(rnd()-.5)*w*.35,y=p[1]+rnd()*h*.25,l=h*(.18+rnd()*.3);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x-l*.15,y+l*.5,x-l*.3*(rnd()-.2),y+l);g.stroke();}
  g.fillStyle=hexA(ink,.38);for(let i=0;i<10;i++){const p=pts[1+Math.floor(rnd()*(pts.length-2))];g.beginPath();g.ellipse(p[0]+(rnd()-.5)*w*.25,p[1]+rnd()*h*.18+2,(1+rnd()*1.6)*k+.3,(.6+rnd())*k+.3,0,0,6.3);g.fill();}
  g.restore();
  // nét sống núi
  g.strokeStyle=hexA(ink,.6);g.lineWidth=Math.max(1,1.5*k);g.beginPath();g.moveTo(pts[0][0]+w*.2,pts[0][1]+h*.14);pts.slice(1,-1).forEach(p=>g.lineTo(p[0],p[1]));g.stroke();
  // sương quanh chân
  const m=g.createLinearGradient(0,Y+h*.05,0,Y+h*.4);m.addColorStop(0,hexA(C.paper,0));m.addColorStop(1,hexA(C.paper,.6));g.fillStyle=m;g.fillRect(X-w*1.1,Y+h*.05,w*2.2,h*.4);}
function ikTreeMap(g,X,Y,r0,rnd,C){const ink=C.ink||IKC.ink;g.fillStyle=hexA(ink,.4);g.strokeStyle=hexA(ink,.5);g.lineWidth=Math.max(.6,r0*.18);g.lineCap='round';
  if(rnd()<.45){g.beginPath();g.moveTo(X,Y+r0*.5);g.lineTo(X,Y-r0*1.5);g.stroke();for(let i=0;i<3;i++){const yy=Y-r0*(.2+i*.6),ww=r0*(1-i*.22);g.beginPath();g.moveTo(X-ww,yy+r0*.3);g.quadraticCurveTo(X,yy-r0*.5,X+ww,yy+r0*.3);g.stroke();}}
  else{g.beginPath();g.ellipse(X,Y-r0,r0*.95,r0*.7,0,0,6.3);g.fill();g.beginPath();g.moveTo(X,Y-r0*.4);g.lineTo(X,Y+r0*.5);g.stroke();}}

// ================= GẮN VÀO GAME =================
const INK_TITLE_LIVE=inkTitleSVG(),INK_TITLE_URL=ikE(INK_TITLE_LIVE);
(function(){
  try{
    ASSET.title=INK_TITLE_URL;
    ASSET.place.tran=ikE(inkVillageSVG());
    ASSET.heroG={nam:ikE(inkHeroSVG('nam')),nu:ikE(inkHeroSVG('nu'))};
    // khung avatar nhỏ (bản đồ chiến đấu, thẻ đơn vị): vòng mực phủ ngoài
    const st=document.createElement('style');st.id='ink-frames';
    let css='';for(let t=0;t<5;t++)css+=`:root{--ikf${t}:url("${ikFrameSvgFull(t).replace(/"/g,"'")}")}`;
    css=css.replace(/url\("data:image\/svg\+xml[^"]*"\)/g,m=>m);
    let rules='';for(let t=0;t<5;t++){const u='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(ikFrameSvgFull(t));
      rules+=`.u-av.tf${t}::after,.av.tf${t}::after{background-image:url("${u}")}`;}
    st.textContent=rules;document.head.appendChild(st);
    // màn mở đầu: rê chuột hoặc chạm vào đâu thì chỗ đó động đậy; chạm nền thì mực loang
    const hit=e=>{const c=e.target.closest&&e.target.closest('.t-ink2');if(!c)return;const el=e.target.closest('[data-ik]');
      if(el){if(el.classList.contains('hit'))return;el.classList.add('hit');clearTimeout(el._t);el._t=setTimeout(()=>{el.classList.remove('hit');if(el.classList.contains('ik-cr')){el.classList.add('back');setTimeout(()=>el.classList.remove('back'),900);}},el.classList.contains('ik-cr')?1700:1300);}
      else if(e.type==='pointerdown'){const r=c.getBoundingClientRect(),i=document.createElement('i');i.className='ink-rp';i.style.left=(e.clientX-r.left)+'px';i.style.top=(e.clientY-r.top)+'px';c.appendChild(i);setTimeout(()=>i.remove(),2300);}};
    document.addEventListener('pointerover',hit);document.addEventListener('pointerdown',hit);
  }catch(e){console.error('ink',e);}
})();
