// ----- khung Tinh anh / Thiên kiêu kiểu khung hạng: vòng kim loại nổi, ngọc và đôi cánh ở đỉnh, ngọc nhỏ ở đáy -----
const TF_PAL={1:{a:'#ffe2c4',b:'#d08a4e',c:'#7a4320',d:'#3a1e0c',gem:['#ffe0c8','#d0642a','#5a2008'],glow:'rgba(210,130,70,.45)'},
  2:{a:'#ffffff',b:'#c9d2db',c:'#7e8994',d:'#3d4650',gem:['#d8f0ff','#3f8fd8','#123a6e'],glow:'rgba(170,190,210,.5)'},
  3:{a:'#fff6c9',b:'#f1c232',c:'#a8720c',d:'#4a2c00',gem:['#ffd6d0','#e0302a','#5a0a08'],glow:'rgba(255,200,60,.6)'},
  4:{a:'#ffffff',b:'#bfe6ff',c:'#7a86e0',d:'#232a6a',gem:['#ffffff','#7fd8ff','#3346c8'],glow:'rgba(150,200,255,.75)'}};
function tfWing(P,id,flip){return `<path transform="${flip?'translate(100 0) scale(-1 1)':''}" d="M42 12C34 4 22 2 12 6C19 7 24 9 27 12C20 11 14 12 9 15C16 15 22 16 26 19C21 19 17 20 14 23C22 23 30 21 36 17Z" fill="url(#${id}m)" stroke="${P.d}" stroke-width=".8"/>`;}
function talFrameHang(t,id){const P=TF_PAL[t.tier];if(!P)return '';id=id||'tf'+t.tier;
  return `<svg viewBox="0 0 100 100" aria-hidden="true" class="tf-rot"><defs>
   <linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset=".3" stop-color="${P.b}"/><stop offset=".55" stop-color="${P.c}"/><stop offset=".75" stop-color="${P.b}"/><stop offset="1" stop-color="${P.c}"/></linearGradient>
   <radialGradient id="${id}g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${P.gem[0]}"/><stop offset=".45" stop-color="${P.gem[1]}"/><stop offset="1" stop-color="${P.gem[2]}"/></radialGradient></defs>
   <circle cx="50" cy="50" r="40.6" fill="none" stroke="${P.d}" stroke-width="10.8"/>
   <circle cx="50" cy="50" r="40.6" fill="none" stroke="url(#${id}m)" stroke-width="9"/>
   <circle cx="50" cy="50" r="44.2" fill="none" stroke="${P.a}" stroke-opacity=".7" stroke-width=".7"/>
   <circle cx="50" cy="50" r="36.9" fill="none" stroke="${P.d}" stroke-opacity=".8" stroke-width=".9"/>
   <path d="M17 32A38 38 0 0 1 50 11" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" stroke-linecap="round"/>
   ${tfWing(P,id,0)}${tfWing(P,id,1)}
   <path d="M50 1L57 9L50 17L43 9Z" fill="url(#${id}g)" stroke="${P.d}" stroke-width="1"/><path d="M50 3.5L53 7.5L50 9L47 7.5Z" fill="#fff" fill-opacity=".7"/>
   <path d="M50 86L54 91L50 96L46 91Z" fill="url(#${id}g)" stroke="${P.d}" stroke-width=".8"/></svg>`;}

function talWingsHang(t,flip){const P=TF_PAL[t.tier];const id='tcw'+t.tier+(flip?'r':'l');return `<svg class="tcw${flip?' r':''}" viewBox="0 0 48 26" aria-hidden="true"><defs><linearGradient id="${id}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset=".4" stop-color="${P.b}"/><stop offset=".75" stop-color="${P.c}"/><stop offset="1" stop-color="${P.b}"/></linearGradient></defs>
  <path d="M46 13C38 3 24 0 10 4C18 5 23 7 26 10C18 9 10 10 4 13C10 13 18 14 24 16C18 16 12 18 8 22C20 24 34 21 46 13Z" fill="url(#${id})" stroke="${P.d}" stroke-width=".8"/>
  <path d="M42 13L46 9L50 13L46 17Z" transform="translate(-4 0)" fill="${P.gem[1]}" stroke="${P.d}" stroke-width=".7"/></svg>`;}

// ----- kiểu thủy mặc: vòng nét bút lông (đậm nhạt, đứt ở một chỗ như nét viên tướng), triện son ở góc -----
const TF_INK={3:{ink:'#5b6570',wash:'#9aa4ae',seal:'#4a6f8f',ch:'英'},4:{ink:'#1d1712',wash:'#6b5a40',seal:'#b8302a',ch:'天',leaf:'#c9a227'}};
function talFrameInk(t,id){const P=TF_INK[t.tier];if(!P)return '';id=id||'ti'+t.tier;
  return `<svg viewBox="0 0 100 100" aria-hidden="true"><defs><filter id="${id}r"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="2.4"/></filter></defs>
   <g filter="url(#${id}r)" fill="none" stroke-linecap="round">
    <circle cx="50" cy="50" r="41" stroke="${P.wash}" stroke-opacity=".35" stroke-width="10"/>
    <path d="M58 9.8A41 41 0 1 1 38 10.7" stroke="${P.ink}" stroke-width="7.5" stroke-opacity=".88"/>
    <path d="M60 12.5A38 38 0 1 1 34 13.5" stroke="${P.ink}" stroke-width="1.6" stroke-opacity=".5"/>
    <path d="M30 86A41 41 0 0 1 12 64" stroke="${P.ink}" stroke-width="3.5" stroke-opacity=".45"/>
    ${P.leaf?`<path d="M74 22A38 38 0 0 1 88 47" stroke="${P.leaf}" stroke-width="2" stroke-opacity=".9" stroke-dasharray="3 4"/>`:''}
   </g>
   <g transform="translate(70 72) rotate(-8)"><rect x="0" y="0" width="22" height="22" rx="2" fill="${P.seal}"/><rect x="2" y="2" width="18" height="18" rx="1" fill="none" stroke="#f6eedd" stroke-width="1.2"/>
    <text x="11" y="16.5" text-anchor="middle" font-size="14" font-weight="700" fill="#f6eedd" font-family="serif">${P.ch}</text></g></svg>`;}
function talWingsInk(t,flip){const P=TF_INK[t.tier];return `<svg class="tcw${flip?' r':''}" viewBox="0 0 48 26" aria-hidden="true"><path d="M46 14C34 9 20 10 4 15C16 12 30 12 46 16Z" fill="${P.ink}" fill-opacity=".8"/><path d="M40 19C30 17 20 18 10 21C20 19 30 19.5 40 21Z" fill="${P.ink}" fill-opacity=".45"/></svg>`;}
function talFrameSVG(t,id){return t.tier===4?talFrameHang(t,id):t.tier===3?talFrameSen(t,id):t.tier>=1?talFramePlain(t,id):'';} // Thiên kiêu: cánh · Tinh anh: sen · Trung tài: 2 ngọc · Phàm tài: 1 ngọc dưới
function talWings(t,flip){return talWingsHang(t,flip);}

// vòng kim loại dùng chung cho các kiểu khung
function tfRing(P,id){return `<defs><linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset=".3" stop-color="${P.b}"/><stop offset=".55" stop-color="${P.c}"/><stop offset=".75" stop-color="${P.b}"/><stop offset="1" stop-color="${P.c}"/></linearGradient>
  <radialGradient id="${id}g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${P.gem[0]}"/><stop offset=".45" stop-color="${P.gem[1]}"/><stop offset="1" stop-color="${P.gem[2]}"/></radialGradient></defs>
  <circle cx="50" cy="50" r="40.6" fill="none" stroke="${P.d}" stroke-width="10.8"/><circle cx="50" cy="50" r="40.6" fill="none" stroke="url(#${id}m)" stroke-width="9"/>
  <circle cx="50" cy="50" r="44.2" fill="none" stroke="${P.a}" stroke-opacity=".7" stroke-width=".7"/><circle cx="50" cy="50" r="36.9" fill="none" stroke="${P.d}" stroke-opacity=".8" stroke-width=".9"/>
  <path d="M17 32A38 38 0 0 1 50 11" fill="none" stroke="#fff" stroke-opacity=".75" stroke-width="1.6" stroke-linecap="round"/>`;}
const tfGem=(id,P,x,y,s)=>`<path d="M${x} ${y-s}L${x+s*.8} ${y}L${x} ${y+s}L${x-s*.8} ${y}Z" fill="url(#${id}g)" stroke="${P.d}" stroke-width=".9"/>`;
// Liên hoa: đài sen năm cánh đỡ dưới đáy, ngọc nhỏ trên đỉnh
function talFrameSen(t,id){const P=TF_PAL[t.tier];if(!P)return '';id=id||'ts'+t.tier;const pet=(a,l)=>`<path transform="rotate(${a} 50 92)" d="M50 92C44 84 44 ${92-l} 50 ${86-l}C56 ${92-l} 56 84 50 92Z" fill="url(#${id}m)" stroke="${P.d}" stroke-width=".8"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${tfRing(P,id)}${pet(-64,8)}${pet(64,8)}${pet(-32,12)}${pet(32,12)}${pet(0,14)}${tfGem(id,P,50,88,4.5)}${tfGem(id,P,50,9,5)}</svg>`;}
// Tường vân: hai cụm mây cuộn ôm hai bên đáy, ngọc giữa đáy và đỉnh
function talFrameVan(t,id){const P=TF_PAL[t.tier];if(!P)return '';id=id||'tv'+t.tier;
  const cl=f=>`<path transform="${f?'translate(100 0) scale(-1 1)':''}" d="M47 93C38 98 22 96 16 86C11 78 16 69 24 70C31 71 32 79 26 80C22 81 21 76 24 75C19 76 20 85 28 86C36 87 38 78 34 72C42 78 42 88 47 93Z" fill="url(#${id}m)" stroke="${P.d}" stroke-width=".8"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${tfRing(P,id)}${cl(0)}${cl(1)}${tfGem(id,P,50,92,6)}${tfGem(id,P,50,9,4.5)}</svg>`;}

// khung tròn đơn: Trung tài 2 ngọc, Phàm tài 1 ngọc dưới
function talFramePlain(t,id){const P=TF_PAL[t.tier];id=id||'tp'+t.tier;return `<svg viewBox="0 0 100 100" aria-hidden="true">${tfRing(P,id)}${tfGem(id,P,50,92,5)}${t.tier>=2?tfGem(id,P,50,8,5):''}</svg>`;}
// trang trí ô Thiên phú: ngọc trên viền trên; dưới viền dưới là cánh (Thiên kiêu) / sen (Tinh anh) / ngọc
function talCardOrn(t){const P=TF_PAL[t.tier];const id='tco'+t.tier;const defs=`<defs><linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.a}"/><stop offset=".3" stop-color="${P.b}"/><stop offset=".55" stop-color="${P.c}"/><stop offset=".75" stop-color="${P.b}"/><stop offset="1" stop-color="${P.c}"/></linearGradient><radialGradient id="${id}g" cx=".35" cy=".3" r=".8"><stop offset="0" stop-color="${P.gem[0]}"/><stop offset=".45" stop-color="${P.gem[1]}"/><stop offset="1" stop-color="${P.gem[2]}"/></radialGradient></defs>`;
  const top=t.tier>=2?`<svg class="tco-top" viewBox="0 0 20 24">${defs}${tfGem(id,P,10,12,6)}</svg>`:'';
  // đôi cánh Thiên kiêu: dài, dẹt, ba lớp lông vũ xếp chồng
  const wing=f=>{const g=(d,o)=>`<path d="${d}" fill="url(#${id}m)" fill-opacity="${o}" stroke="${P.d}" stroke-width=".7"/>`;
    return `<g transform="${f?'translate(160 0) scale(-1 1)':''}">${g('M72 16C60 9 40 6 4 8C22 10 34 12 44 14C30 14 18 16 8 19C24 19 38 19 50 18C40 20 30 23 22 27C40 26 58 22 72 16Z',1)}
     ${g('M70 16C58 12 44 11 26 12C36 13 44 14 50 15C42 16 34 18 28 20C42 20 56 19 70 16Z',.9)}${g('M68 16C60 14 52 13.5 42 14C48 15 54 16 68 16Z',.8)}
     <path d="M10 9C28 10 44 12 66 15M14 19C32 18 48 17 66 16M26 26C42 23 56 19 66 17" fill="none" stroke="${P.a}" stroke-opacity=".6" stroke-width=".6"/></g>`;};
  const pet=(a,l)=>`<path transform="rotate(${a} 80 18)" d="M80 18C74 10 74 ${18-l} 80 ${12-l}C86 ${18-l} 86 10 80 18Z" fill="url(#${id}m)" stroke="${P.d}" stroke-width=".8"/>`;
  const bot=t.tier===4?wing(0)+wing(1):t.tier===3?pet(-64,8)+pet(64,8)+pet(-32,12)+pet(32,12)+pet(0,14):'';
  return `${top}<svg class="tco-bot" viewBox="0 0 160 32">${defs}${bot}${tfGem(id,P,80,t.tier===3?14:16,7.5)}</svg>`;}

// ===== bộ khung chi tiết (vẽ lại từ bản khung vuông): bảng màu theo bậc =====
const TFX={1:{hi:'#ffe6cc',lo:'#5a2c10',m1:'#e0a06a',m2:'#9a5a2c',m3:'#c98552',dk:'#2e1608',gem:['#fff0e0','#e06a2a','#6a1e06'],acc:'#7a3a18',glow:'rgba(230,140,70,.4)'},
 2:{hi:'#ffffff',lo:'#3a434e',m1:'#eef2f6',m2:'#8a96a3',m3:'#c4ccd5',dk:'#1e252d',gem:['#e8f6ff','#3f9be0','#0e2f66'],acc:'#506274',glow:'rgba(180,200,225,.45)'},
 3:{hi:'#fff8d8',lo:'#5a3600',m1:'#ffe27a',m2:'#b8800e',m3:'#f1c232',dk:'#2e1a00',gem:['#ffe0da','#e6302a','#5a0806'],acc:'#8a1a14',glow:'rgba(255,200,60,.6)'},
 4:{hi:'#ffffff',lo:'#2a2f7a',m1:'#e8f6ff',m2:'#7d86e6',m3:'#b8e2ff',dk:'#14174a',gem:['#ffffff','#8fe0ff','#4a3fd8'],acc:'#6a4ad8',glow:'rgba(140,200,255,.85)'}};
function tfxDefs(P,id){return `<defs><linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.hi}"/><stop offset=".22" stop-color="${P.m1}"/><stop offset=".45" stop-color="${P.m2}"/><stop offset=".6" stop-color="${P.m3}"/><stop offset=".8" stop-color="${P.m2}"/><stop offset="1" stop-color="${P.m1}"/></linearGradient>
 <linearGradient id="${id}v" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.hi}"/><stop offset=".35" stop-color="${P.m3}"/><stop offset=".7" stop-color="${P.m2}"/><stop offset="1" stop-color="${P.lo}"/></linearGradient>
 <radialGradient id="${id}g" cx=".35" cy=".3" r=".85"><stop offset="0" stop-color="${P.gem[0]}"/><stop offset=".4" stop-color="${P.gem[1]}"/><stop offset="1" stop-color="${P.gem[2]}"/></radialGradient></defs>`;}
const tfxGem=(id,P,cx,cy,r)=>`<path d="M${cx} ${cy-r}L${cx+r*.78} ${cy}L${cx} ${cy+r}L${cx-r*.78} ${cy}Z" fill="url(#${id}g)" stroke="${P.dk}" stroke-width="${r>6?1:.7}"/><path d="M${cx} ${cy-r*.7}L${cx+r*.35} ${cy-r*.15}L${cx} ${cy}L${cx-r*.35} ${cy-r*.15}Z" fill="#fff" fill-opacity=".7"/>`;
const tfxStar=(x,y,r)=>`<path d="M${x} ${y-r*2.4}L${x+r*.5} ${y-r*.5}L${x+r*2.4} ${y}L${x+r*.5} ${y+r*.5}L${x} ${y+r*2.4}L${x-r*.5} ${y+r*.5}L${x-r*2.4} ${y}L${x-r*.5} ${y-r*.5}Z" fill="#fff" opacity=".9"/>`;
// vương miện (tâm cx, chân ở y, rộng W)
function tfxCrown(id,P,t,cx,y,sc){const n=t===4?5:t===3?3:t===2?1:0;if(!n)return '';const W=(t===4?34:t===3?24:0)*sc;let sp='';
  for(let i=0;i<n;i++){const x=n===1?cx:cx-W/2+i*W/(n-1);const mid=i===(n-1)/2;const h=(mid?14:i%2?8:10)*sc;sp+=`<path d="M${x-4*sc} ${y}L${x} ${y-h}L${x+4*sc} ${y}Z" fill="url(#${id}v)" stroke="${P.dk}" stroke-width=".7"/>`;}
  const bw=W/2+7*sc;return `${sp}<path d="M${cx-bw} ${y+3*sc}C${cx-W/4} ${y-4*sc} ${cx+W/4} ${y-4*sc} ${cx+bw} ${y+3*sc}C${cx+W/4} ${y}  ${cx-W/4} ${y} ${cx-bw} ${y+3*sc}Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".7"/>${tfxGem(id,P,cx,y-2*sc,(t>=3?7:5.5)*sc)}`;}
// đáy theo bậc (tâm cx, cy)
function tfxBottom(id,P,t,cx,cy,sc,wide){if(t===4){const wing=f=>{let w='';const L=[[52,0,1],[46,4,.92],[39,7,.85],[31,10,.78]];const k=wide||1;
    for(const [len0,dy,o] of L){const len=len0*k;w+=`<path d="M0 0C${-len*.35} ${-(6-dy*.3)*sc} ${-len*.75} ${-(7-dy*.4)*sc} ${-len} ${-(3.5-dy*.6)*sc}C${-len*.7} ${-(1-dy*.2)*sc} ${-len*.4} ${(1+dy*.2)*sc} 0 ${3.5*sc}Z" transform="translate(0 ${dy*.25*sc})" fill="url(#${id}m)" fill-opacity="${o}" stroke="${P.dk}" stroke-width=".6"/>`;}
    return `<g transform="translate(${cx} ${cy}) scale(${f*sc} ${1})">${w}<path d="M-4 -1C-16 -3 -32 -4 -${48*k} -3" fill="none" stroke="${P.hi}" stroke-opacity=".7" stroke-width=".5"/></g>`;};return wing(1)+wing(-1)+tfxGem(id,P,cx,cy+1*sc,7.5*sc);}
  if(t===3){const pet=(a,l,w)=>`<path transform="rotate(${a} ${cx} ${cy+6*sc})" d="M${cx} ${cy+6*sc}C${cx-w*sc} ${cy+6*sc-l*.45*sc} ${cx-w*.6*sc} ${cy+6*sc-l*sc} ${cx} ${cy+6*sc-(l+2.5)*sc}C${cx+w*.6*sc} ${cy+6*sc-l*sc} ${cx+w*sc} ${cy+6*sc-l*.45*sc} ${cx} ${cy+6*sc}Z" fill="url(#${id}v)" stroke="${P.dk}" stroke-width=".6"/>`;
    return pet(-78,12,5)+pet(78,12,5)+pet(-52,15,5.5)+pet(52,15,5.5)+pet(-26,17,5.5)+pet(26,17,5.5)+pet(0,18,6)+tfxGem(id,P,cx,cy-1*sc,6*sc);}
  if(t===2)return `<path d="M${cx} ${cy}L${cx-24*sc} ${cy-5*sc}L${cx-17*sc} ${cy+1*sc}L${cx-25*sc} ${cy+7*sc}L${cx} ${cy+4*sc}Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".6"/><path d="M${cx} ${cy}L${cx+24*sc} ${cy-5*sc}L${cx+17*sc} ${cy+1*sc}L${cx+25*sc} ${cy+7*sc}L${cx} ${cy+4*sc}Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".6"/>`+tfxGem(id,P,cx,cy+1*sc,6*sc);
  return `<path d="M${cx-12*sc} ${cy}H${cx+12*sc}L${cx+9*sc} ${cy+3.5*sc}H${cx-9*sc}Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".6"/>`+tfxGem(id,P,cx,cy+1.5*sc,5*sc);}
// móng cong ôm vòng ở 4 góc chéo
function tfxClaw(id,P,t,a){return `<g transform="rotate(${a} 50 50) translate(50 6.5)"><path d="M-9 4C-6 -1 -2 -3 0 -3C2 -3 6 -1 9 4C5 2 2 1.5 0 3.5C-2 1.5 -5 2 -9 4Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".6"/>${t>=2?`<path d="M0 -1.2L1.3 .6L0 2.4L-1.3 .6Z" fill="url(#${id}g)"/>`:''}</g>`;}
// khung tròn chi tiết cho avatar
function talFrameX(t,id){const P=TFX[t.tier];if(!P)return '';id=id||'tx'+t.tier;
  let s=tfxDefs(P,id)+`<circle cx="50" cy="50" r="41" fill="none" stroke="${P.glow}" stroke-width="12" style="filter:blur(3px)"/>`;
  s+=`<circle cx="50" cy="50" r="40.6" fill="none" stroke="${P.dk}" stroke-width="11"/><circle cx="50" cy="50" r="40.6" fill="none" stroke="url(#${id}m)" stroke-width="8.6"/>
   <circle cx="50" cy="50" r="44.3" fill="none" stroke="${P.hi}" stroke-opacity=".75" stroke-width=".7"/><circle cx="50" cy="50" r="37.2" fill="none" stroke="${P.dk}" stroke-width="1"/><circle cx="50" cy="50" r="36" fill="none" stroke="${P.acc}" stroke-opacity=".85" stroke-width=".8"/>
   <path d="M18 30A37 37 0 0 1 44 13" fill="none" stroke="#fff" stroke-opacity=".8" stroke-width="1.4" stroke-linecap="round"/>`;
  for(const a of [45,135,225,315])s+=tfxClaw(id,P,t.tier,a);
  if(t.tier>=3)s+=tfxGem(id,P,9.4,50,3.4)+tfxGem(id,P,90.6,50,3.4);
  s+=tfxCrown(id,P,t.tier,50,11,.62)+tfxBottom(id,P,t.tier,50,92,.62,1.25);
  if(t.tier===4)s+=tfxStar(14,18,1.4)+tfxStar(88,24,1.1)+tfxStar(92,70,1.3)+tfxStar(8,78,1)+tfxStar(70,3,1);
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${s}</svg>`;}
talFrameSVG=function(t,id){return !t?'':t.tier===0?talFrame0(id):talFrameX(t,id);};
// ô Thiên phú: vương miện trên viền trên, móng ở 4 góc, ngọc hai bên, đáy theo bậc
talCardOrn=function(t){if(t.tier===0)return talCard0();const P=TFX[t.tier];const id='tcx'+t.tier;const d=tfxDefs(P,id);
  const top=`<svg class="tcx-top" viewBox="0 0 80 30">${d}${t.tier>=2?tfxCrown(id,P,t.tier,40,22,1):''}</svg>`;
  const bot=`<svg class="tcx-bot" viewBox="0 0 200 40">${d}${tfxBottom(id,P,t.tier,100,16,1,1.9)}</svg>`;
  const cl=(c)=>`<svg class="tcx-cl ${c}" viewBox="0 0 26 26">${d}<path d="M-1 22C-2 10 3 1 15 -2C11 3 10 7 11 11C14 6 19 3 26 -3C24 7 19 13 12 16C16 17 19 19 21 23C12 23 6 23 -1 22Z" fill="url(#${id}m)" stroke="${P.dk}" stroke-width=".8"/>${t.tier>=2?`<path d="M8 8L10.5 10.5L8 13L5.5 10.5Z" fill="url(#${id}g)" stroke="${P.dk}" stroke-width=".5"/>`:''}</svg>`;
  const side=t.tier>=3?`<svg class="tcx-sd l" viewBox="0 0 12 12">${d}${tfxGem(id,P,6,6,5)}</svg><svg class="tcx-sd r" viewBox="0 0 12 12">${d}${tfxGem(id,P,6,6,5)}</svg>`:'';
  const st=t.tier===4?`<svg class="tcx-st" viewBox="0 0 300 80">${tfxStar(30,12,2)}${tfxStar(270,20,1.6)}${tfxStar(250,70,1.8)}${tfxStar(48,66,1.4)}${tfxStar(200,6,1.3)}</svg>`:'';
  return top+bot+(t.tier>=2?cl('tl')+cl('tr')+cl('bl')+cl('br'):'')+side+st+(t.tier===4?talCardT4(id,P):'');};

// Thiên kiêu: thêm lớp — vòng ngoài khía răng, vương miện sau, cánh phụ, hoa văn hai bên
const _tfx0=talFrameX;
talFrameX=function(t,id){const base=_tfx0(t,id);if(t.tier!==4)return base;const P=TFX[4];id=id||'tx4';
  const back=`<circle cx="50" cy="50" r="47.6" fill="none" stroke="${P.dk}" stroke-width="2.6"/><circle cx="50" cy="50" r="47.6" fill="none" stroke="url(#${id}m)" stroke-width="1.6" stroke-dasharray="2.2 1.6"/>`
   +[30,60,120,150,210,240,300,330].map(a=>`<g transform="rotate(${a} 50 50)"><path d="M50 0.5L52.2 4.5L50 6L47.8 4.5Z" fill="url(#${id}v)" stroke="${P.dk}" stroke-width=".5"/></g>`).join('')
   +`<g transform="translate(50 9)"><path d="M-14 2L-17 -9L-9 -1L-5 -12L0 -3L5 -12L9 -1L17 -9L14 2Z" fill="url(#${id}m)" fill-opacity=".75" stroke="${P.dk}" stroke-width=".6"/></g>`
   +[[-1],[1]].map(([f])=>`<g transform="translate(50 93) scale(${f} 1)"><path d="M6 -2C14 -10 24 -12 34 -10C27 -8 22 -6 19 -3C24 -4 29 -3 33 -1C25 0 16 0 6 -2Z" fill="url(#${id}v)" stroke="${P.dk}" stroke-width=".5"/></g>`).join('');
  return base.replace('<svg viewBox="0 0 100 100" aria-hidden="true">','<svg viewBox="0 0 100 100" aria-hidden="true">'+tfxDefs(P,id)+back);};
// ô Thiên phú Thiên kiêu: viền đôi ngoài khía răng, hoa văn mây hai bên chữ
function talCardT4(id,P){return `<svg class="tcx-t4" viewBox="0 0 300 80" preserveAspectRatio="none">${tfxDefs(P,id+'b')}<rect x="3" y="3" width="294" height="74" rx="7" fill="none" stroke="url(#${id}bm)" stroke-width="1.6" stroke-dasharray="3 2"/></svg>
  <svg class="tcx-fl l" viewBox="0 0 40 16">${tfxDefs(P,id+'f')}<path d="M40 8C30 2 18 2 8 6C14 6 18 7 20 8C14 9 10 11 6 14C18 14 30 13 40 8Z" fill="url(#${id}fm)" stroke="${P.dk}" stroke-width=".6"/><circle cx="4" cy="8" r="2" fill="url(#${id}fg)"/></svg>
  <svg class="tcx-fl r" viewBox="0 0 40 16">${tfxDefs(P,id+'r')}<path d="M40 8C30 2 18 2 8 6C14 6 18 7 20 8C14 9 10 11 6 14C18 14 30 13 40 8Z" fill="url(#${id}rm)" stroke="${P.dk}" stroke-width=".6"/><circle cx="4" cy="8" r="2" fill="url(#${id}rg)"/></svg>`;}

// Phế vật: vòng sắt cháy sém, nứt vỡ, lửa âm u đỏ thẫm liếm lên từ đáy, tàn tro bay
const TF0={dk:'#140404',m1:'#5a1410',m2:'#2a0806',hi:'#a8382a',fl:['#ff8a3a','#c0281a','#4a0606']};
function tf0Defs(id){return `<defs><linearGradient id="${id}m" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${TF0.hi}"/><stop offset=".4" stop-color="${TF0.m1}"/><stop offset=".75" stop-color="${TF0.m2}"/><stop offset="1" stop-color="${TF0.m1}"/></linearGradient>
 <linearGradient id="${id}f" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="${TF0.fl[2]}"/><stop offset=".45" stop-color="${TF0.fl[1]}"/><stop offset="1" stop-color="${TF0.fl[0]}" stop-opacity=".9"/></linearGradient></defs>`;}
const tf0Flame=(id,x,y,h,w,tilt)=>{const f=(H,W,c)=>`<path d="M${x-W} ${y}C${x-W} ${y-H*.35} ${x-W*.35} ${y-H*.45} ${x-W*.55} ${y-H*.85}C${x-W*.1} ${y-H*.62} ${x-W*.05} ${y-H*.72} ${x+W*.05} ${y-H}C${x+W*.25} ${y-H*.68} ${x+W*.45} ${y-H*.58} ${x+W*.62} ${y-H*.78}C${x+W*.68} ${y-H*.48} ${x+W} ${y-H*.36} ${x+W} ${y}Z" fill="${c}"/>`;
  return `<g transform="rotate(${tilt} ${x} ${y})">${f(h,w,`url(#${id}f)`)}${f(h*.55,w*.5,'rgba(230,100,40,.65)')}</g>`;};
function talFrame0(id){id=id||'tf0';let s=tf0Defs(id);
  s+=`<circle cx="50" cy="50" r="42" fill="none" stroke="rgba(120,10,0,.45)" stroke-width="12" style="filter:blur(3px)"/>`;
  // vòng sắt đứt khúc (các đoạn gãy)
  s+=`<circle cx="50" cy="50" r="40.6" fill="none" stroke="${TF0.dk}" stroke-width="10" stroke-dasharray="40 3 22 4 55 2.5 30 5 60 3"/><circle cx="50" cy="50" r="40.6" fill="none" stroke="url(#${id}m)" stroke-width="7.6" stroke-dasharray="40 3 22 4 55 2.5 30 5 60 3"/>`;
  // vết nứt
  for(const [a,l] of [[20,1],[95,-1],[160,1],[250,-1],[310,1]])s+=`<g transform="rotate(${a} 50 50)"><path d="M50 6.5L51.5 9L49.5 11L51 13.5" fill="none" stroke="${TF0.dk}" stroke-width=".9"/><path d="M51.5 9L${53*l>0?54:47} 9.5" fill="none" stroke="${TF0.dk}" stroke-width=".6"/></g>`;
  // lửa âm u liếm lên từ đáy
  // (bỏ lửa dưới đáy)
  // tàn tro
  for(const [x,y,r] of [[22,70,1],[80,62,.8],[44,74,.7],[66,80,.9],[14,50,.6],[88,46,.7]])s+=`<circle cx="${x}" cy="${y}" r="${r}" fill="#ff7a3a" opacity=".8"/>`;
  return `<svg viewBox="0 0 100 100" aria-hidden="true">${s}</svg>`;}
function talCard0(){const id='tc0';return `<svg class="tc0-fl" viewBox="0 0 200 40" preserveAspectRatio="none">${tf0Defs(id)}${[20,46,74,100,126,154,180].map((x,i)=>tf0Flame(id,x,40,i%2?22:30,9,(i-3)*6)).join('')}</svg>
  <svg class="tc0-ash" viewBox="0 0 300 80" preserveAspectRatio="none">${[[30,20,1.4],[260,30,1.2],[90,10,1],[200,14,1.1],[150,6,.9],[240,60,1]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="#ff7a3a" opacity=".85"/>`).join('')}</svg>
  <svg class="tc0-ck" viewBox="0 0 300 80" preserveAspectRatio="none"><path d="M0 18L14 24L10 34L22 40M300 60L284 54L290 44L276 38M120 0L126 10L118 16" fill="none" stroke="#140404" stroke-width="1.6"/></svg>`;}
// khung avatar ở thanh đầu: viền mỏng hơn, cách avatar một khoảng nhỏ
{const _tfH=talFrameX;talFrameX=function(t,id){let s=_tfH(t,id);if(id!=='hudtf')return s;
  return s.replace(/r="41" fill="none" stroke="([^"]+)" stroke-width="12"/,'r="44" fill="none" stroke="$1" stroke-width="5.6"')
   .replace(/r="40\.6"([^>]*?)stroke-width="11"/,'r="44"$1stroke-width="4.6"').replace(/r="40\.6"([^>]*?)stroke-width="8\.6"/,'r="44"$1stroke-width="3.4"')
   .replace('r="44.3"','r="46.6"').replace('r="37.2"','r="41.8"').replace(/r="36" ([^>]*?)stroke-width="\.8"/,'r="41" $1stroke-width=".5"');};}
// ----- avatar và thẻ chú thích cho nhân vật, vật phẩm có trong dữ liệu -----
function npcAv(name,g){const u=ASSET.heroG&&ASSET.heroG[g==='nu'?'nu':g==='nam'?'nam':null];return u?`<img class="asset as-hero" src="${esc(u)}" alt="">`:`<span class="av-txt">${esc(avLetter(name))}</span>`;}
function npcTip(o){return `<div class="tp"><div class="tp-h"><span class="qi npc-qi">${npcAv(o.n,o.g)}</span><span><b>${esc(o.n)}</b>${o.sub?`<small>${esc(o.sub)}</small>`:''}</span></div>${(o.lines&&o.lines.length)||o.d?`<div class="tp-b">${o.lines&&o.lines.length?'<ul>'+o.lines.map(l=>'<li>'+esc(l)+'</li>').join('')+'</ul>':''}${o.d?'<p>'+esc(o.d)+'</p>':''}</div>`:''}</div>`;}
function entIndex(){const r=G.run;if(!r)return null;const w=W();const M={};
  const add=(n,h)=>{if(n&&String(n).length>=3&&!M[n])M[n]=h;};
  for(const x of r.rivals||[]){const wr=w.rivals[x.i];if(!wr)continue;add(wr.ten,npcTip({n:wr.ten,g:wr.g,sub:(wr.tt||'')+' · '+(w.sects[wr.s]?w.sects[wr.s].n:''),lines:[x.alive?'Cảnh giới: '+REALM[x.realm]:'Đã mất']}));}
  for(const s of r.seeds||[])add(s.ten,npcTip({n:s.ten,sub:s.t==='an'?'Chịu ơn ngươi':'Mang thù với ngươi',d:s.d}));
  for(const p of r.party||[])add(p.ten,npcTip({n:p.ten,sub:'Đồng hành'}));
  for(const s of w.sects||[])add(s.n,`<div class="tp"><div class="tp-h"><span class="qi"><img src="${sectPic(s.n,s.al)}" alt=""></span><span><b>${esc(s.n)}</b><small>Tông môn</small></span></div></div>`);
  for(const rel of r.relics||[]){if(rel.k==='book'&&rel.art)add(rel.art.n,relTip(rel));else add(rel.name,relTip(rel));}
  for(const a of (typeof arts==='function'?arts():[]))add(a.n,artTipH(a));
  return M;}
let ENT_C=null;function entIdxC(){const t=Date.now();if(!ENT_C||t-ENT_C.t>400||ENT_C.run!==G.run){ENT_C={t,run:G.run,M:entIndex()};}return ENT_C.M;}
{const _tx=txt;txt=function(s){let h=_tx(s);const M=entIdxC();if(!M)return h;const ks=Object.keys(M).sort((a,b)=>b.length-a.length);if(!ks.length)return h;
  const re=new RegExp('(^|[^\\p{L}])('+ks.map(k=>esc(k).replace(/[.*+?^${}()|[\]\\]/g,'\\$&')).join('|')+')(?![\\p{L}])','gu');
  const seen=new Set();
  // không chạm vào phần đã nằm trong thẻ
  return h.split(/(<[^>]+>)/).map(part=>part[0]==='<'?part:part.replace(re,(m,pre,w)=>{if(seen.has(w))return m;seen.add(w);const k=ks.find(x=>esc(x)===w);return `${pre}<span class="gl ent"${tah(M[k])}>${w}</span>`;})).join('');};}

function bondRow(n,g,sub,x,kv,dim,o){o=o||npcInfo(n);g=g||o.g;const F=favOf(n),L=favLv(F),rk=relOfNpc(n);const dn=o.disp||n;return `<details class="bond${dim?' dim':''}"${UI.bondOpen===n?' open':''}><summary class="row"><span class="r-i bav">${npcAv(dn,g)}</span><span class="r-t"><b>${esc(dn)}${rk?` <em class="rel-tag">${REL_T[rk].n}</em>`:''}</b><small>${esc(sub)}</small></span>${x?`<span class="r-x">${esc(x)}</span>`:''}<span class="fav f-${L[2]}">${L[1]}</span><i class="cc-ch">${ic('down')}</i></summary><div class="kvl bond-d"><div class="kr"><span>Hảo cảm</span><b class="fav f-${L[2]}">${L[1]}</b></div>${kv.filter(k=>k[1]).map(k=>`<div class="kr"><span>${esc(k[0])}</span><b>${esc(k[1])}</b></div>`).join('')}${bondActs(n,o)}</div></details>`;}

// hậu thiên khí vận trong tab Căn cơ
const HT_COLR={1:2,2:3,3:4,4:5};
function htTipH(x){const c=TT_COL[HT_COLR[x.r]];return `<div class="tt-it" style="--pc:${c}"><div><b>${esc(x.n)}</b><small>${HT_RANK[x.r]} · hậu thiên</small><p>${htFxText(x).map(esc).join('<br>')}</p></div></div>`;}
function htRow(){const r=G.run;const L=(r.htkv||[]).map(id=>HTMAP[id]).filter(Boolean);
  const v=L.length?`<span class="ttl">${L.map(x=>`<span class="ttc r${HT_COLR[x.r]}" style="--pc:${TT_COL[HT_COLR[x.r]]}"${tah(htTipH(x))}>${esc(x.n)}</span>`).join('')}</span>`:'<span class="hint">Chưa có</span>';
  return kvRow('Hậu thiên khí vận',v,'Cơ duyên có được sau mỗi lần đột phá đại cảnh giới.');}
STAT_IC['Hậu thiên khí vận']=['spark','jade'];

TFX[0]={hi:'#ffb3a8',lo:'#3a0606',m1:'#c0392b',m2:'#6e1410',m3:'#9a2a20',dk:'#1e0404',gem:['#ffd0c8','#b01e1e','#3a0404'],acc:'#5a0e0e',glow:'rgba(160,20,20,.35)'};
function tfAs1(t,fn){const sv=TFX[1];TFX[1]=TFX[0];try{return fn(Object.assign({},t,{tier:1}));}finally{TFX[1]=sv;}}
talFrameSVG=function(t,id){if(!t||t.tier<0||t.tier===1)return '';if(t.tier===0)return tfAs1(t,x=>talFrameX(x,id));return talFrameX(t,id);};
{const _tco=talCardOrn;talCardOrn=function(t){if(t.tier===1)return '';if(t.tier===0)return tfAs1(t,x=>_tco(x)).replace(/tcx1/g,'tcx0');return _tco(t);};}

// thông tin NPC để xét điều kiện quan hệ
function npcInfo(n){const r=G.run,w=W();const k=(w.rivals||[]).findIndex(x=>x.ten===n);if(k>=0){const rv=(r.rivals||[]).find(x=>x.i===k);return {g:w.rivals[k].g,realm:rv?rv.realm:r.realm,sect:w.rivals[k].s};}
  const o=(r.npcs||{})[n];if(o)return {g:o.g,realm:o.realm!=null?o.realm:Math.max(0,(r.region||0)),sect:o.sect};const m=/^@(\d+):/.exec(n);if(m)return {realm:Math.min(5,(r.realm||0)+2)};return {};}
function bondActs(n,o){const rk=relOfNpc(n);const B=k=>{const w=relWhy(n,k,o);return `<button class="btn sm" data-act="relMake" data-arg="${esc(n)}|${k}"${w?' disabled':''}${ta(REL_T[k].d+(w?'\n\nChưa được: '+w:''))}>${REL_T[k].n}</button>`;};
  return `<div class="bond-a"><button class="btn sm" data-act="favGift" data-arg="${esc(n)}"${ta('Tặng lễ vật: tốn '+giftCost(n)+' linh thạch, 2 giờ. Tăng hảo cảm.')}>Tặng lễ</button>${rk?`<button class="btn sm bad" data-act="relBreak" data-arg="${esc(n)}">Cắt đứt ${REL_T[rk].n.toLowerCase()}</button>`:['kn','np','sp','dd','pt','dl'].map(B).join('')}</div>`;}
// tab Nhân mạch: thêm Quan hệ và Quen biết
{const _pb=pBonds;pBonds=function(){const h=_pb();const tab=UI.tab.bonds||'an';if(tab!=='an')return h;const r=G.run;const B=bonds();const N=r.npcs||{};
  const rel=Object.keys(B).map(n=>bondRow(n,null,REL_T[B[n]].n,'',[],false)).join('');
  const known=Object.values(N).filter(o=>!B[o.n]&&!/^@/.test(o.n)&&o.met).slice(-20).reverse().map(o=>bondRow(o.n,o.g,o.type&&ENT_T[o.type]?ENT_T[o.type].n:'Người quen','',[],false)).join('');
  const add=`<h4 class="sgrp">Quan hệ <small>${Object.keys(B).length}</small></h4>${rel?`<div class="rows">${rel}</div>`:'<p class="hint">Chưa kết nghĩa, bái sư hay kết đạo lữ với ai.</p>'}<h4 class="sgrp">Quen biết</h4>${known?`<div class="rows">${known}</div>`:'<p class="hint">Chưa quen ai trên đường.</p>'}`;
  const i=h.indexOf('<h4 class="sgrp">Đồng hành</h4>');return i<0?h:h.slice(0,i)+add+h.slice(i);};}
STAT_IC['Mị lực']=['heart','vio'];

PANEL_V.bonds=pBonds;
