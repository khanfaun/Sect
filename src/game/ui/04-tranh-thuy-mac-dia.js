// ================= TRANH THỦY MẶC: địa điểm và màn khởi đầu =================
// Mực đen loang nhiều tầng đậm nhạt trên nền giấy, nét có rung nhẹ như bút lông, sương trắng ngang,
// điểm son đỏ. Viền tranh mờ dần vào nền (mặt nạ), nên đặt lên giấy nào cũng hòa.
const INK='#2b2620',SEAL='#9c2a22';
function inkSvg(w,h,body,fade){fade=fade||'all';const m=fade==='bottom'
  ?`<linearGradient id="fv" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fff" stop-opacity="0"/><stop offset=".38" stop-color="#fff"/><stop offset=".85" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><linearGradient id="fh" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#000"/><stop offset=".12" stop-color="#fff"/><stop offset=".88" stop-color="#fff"/><stop offset="1" stop-color="#000"/></linearGradient>`
  :`<radialGradient id="fv" cx=".5" cy=".55" r=".62"><stop offset=".55" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>`;
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}"><defs>
  <filter id="br" x="-5%" y="-5%" width="110%" height="110%"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" seed="3"/><feDisplacementMap in="SourceGraphic" scale="1.6"/></filter>
  <filter id="wa" x="-10%" y="-10%" width="120%" height="120%"><feTurbulence type="fractalNoise" baseFrequency=".05" numOctaves="3" seed="7" result="n"/><feDisplacementMap in="SourceGraphic" in2="n" scale="5" result="d"/><feGaussianBlur in="d" stdDeviation=".9"/></filter>
  <filter id="mi"><feGaussianBlur stdDeviation="3"/></filter>
  <linearGradient id="mt" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${INK}" stop-opacity=".75"/><stop offset="1" stop-color="${INK}" stop-opacity=".05"/></linearGradient>
  <linearGradient id="mf" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${INK}" stop-opacity=".32"/><stop offset="1" stop-color="${INK}" stop-opacity="0"/></linearGradient>
  ${m}<mask id="fm"><rect width="${w}" height="${h}" fill="url(#fv)"/>${fade==='bottom'?`<rect width="${w}" height="${h}" fill="url(#fh)" style="mix-blend-mode:multiply"/>`:''}</mask></defs>
  <g mask="url(#fm)">${body}</g></svg>`);}
// các mảnh ghép
const iFar=(d)=>`<path d="${d}" fill="url(#mf)" filter="url(#wa)"/>`;
const iMid=(d)=>`<path d="${d}" fill="url(#mt)" filter="url(#wa)"/>`;
const iMist=(y,o)=>`<ellipse cx="80" cy="${y}" rx="95" ry="6" fill="#f4ecd8" opacity="${o||.85}" filter="url(#mi)"/>`;
const iTree=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" filter="url(#br)"><path d="M0 0v-14" stroke="${INK}" stroke-width="1.4"/><path d="M0-16c-6 0-8 4-6 6 2 0 4-2 6-2 2 0 4 2 6 2 2-2 0-6-6-6zM0-22c-4 0-6 3-4 5h8c2-2 0-5-4-5z" fill="${INK}" opacity=".8"/></g>`;
const iPine=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" filter="url(#br)"><path d="M0 0v-22" stroke="${INK}" stroke-width="1.6"/><path d="M-9-6h18l-9-6zM-8-12h16l-8-6zM-6-18h12l-6-6z" fill="${INK}" opacity=".85"/></g>`;
const iHouse=(x,y,s,o)=>`<g transform="translate(${x} ${y}) scale(${s})" filter="url(#br)" opacity="${o||1}"><path d="M-10 0V-7h20V0" fill="#f4ecd8" stroke="${INK}" stroke-width="1"/><path d="M-14-6c6-5 22-5 28 0l-3-4c-6-3-16-3-22 0z" fill="${INK}"/><path d="M-2 0v-4h4v4" fill="${INK}"/></g>`;
const iPav=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" filter="url(#br)"><path d="M-8 0v-8h16V0" fill="#f4ecd8" stroke="${INK}" stroke-width="1"/><path d="M-14-7c7-4 21-4 28 0l-3-3c-7-3-15-3-22 0z" fill="${INK}"/><path d="M-11-12c6-3 16-3 22 0l-3-3c-5-2-11-2-16 0z" fill="${INK}"/><path d="M0-16v-3" stroke="${INK}"/></g>`;
const iBoat=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})" filter="url(#br)"><path d="M-12 0c6 3 18 3 24 0z" fill="${INK}"/><path d="M-2 0v-9" stroke="${INK}" stroke-width=".8"/><circle cx="-2" cy="-10" r="1.6" fill="${INK}"/><path d="M2-1l12-6" stroke="${INK}" stroke-width=".6"/></g>`;
const iSun=(x,y,r)=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${SEAL}" opacity=".85" filter="url(#wa)"/>`;
const iBirds=(x,y)=>`<g fill="none" stroke="${INK}" stroke-width=".8" opacity=".7"><path d="M${x} ${y}q2-2 4 0q2-2 4 0"/><path d="M${x+10} ${y-4}q1.5-1.5 3 0q1.5-1.5 3 0"/></g>`;
const iWater=(y)=>`<g stroke="${INK}" stroke-width=".7" opacity=".45" fill="none"><path d="M20 ${y}h30M70 ${y+4}h40M30 ${y+8}h22M100 ${y+9}h30"/></g>`;
const iReed=(x,y)=>`<g stroke="${INK}" stroke-width=".9" fill="none" filter="url(#br)"><path d="M${x} ${y}v-16M${x+3} ${y}l2-13M${x-3} ${y}l-2-12"/><ellipse cx="${x}" cy="${y-17}" rx="1.2" ry="3" fill="${INK}"/></g>`;
const iRock=(x,y,s)=>`<path transform="translate(${x} ${y}) scale(${s})" d="M-12 0c0-8 6-12 12-12s12 4 12 12z" fill="${INK}" opacity=".55" filter="url(#wa)"/>`;
const GROUND=`<path d="M0 74c30-5 60-6 90-3s50 2 70-1v20H0z" fill="${INK}" opacity=".12" filter="url(#wa)"/>`;
const INK_PLACE={
  tran:iFar('M0 50c20-12 40-16 60-10s40-14 60-10 30 6 40 4v56H0z')+iMist(56)+iHouse(48,66,1.1)+iHouse(78,63,1.4)+iHouse(108,68,1)+iTree(26,70,1.1)+iTree(130,70,.9)+GROUND+iBirds(110,20),
  thanh:iFar('M0 46c30-10 60-12 90-6s50-8 70-6v56H0z')+`<g filter="url(#br)"><path d="M14 68V46h132v22" fill="#f4ecd8" stroke="${INK}" stroke-width="1.2"/><path d="M14 46h132" stroke="${INK}" stroke-width="2"/>${[20,34,48,104,118,132].map(x=>`<path d="M${x} 46v-3h6v3" fill="${INK}"/>`).join('')}<path d="M66 68V36h28v32" fill="#f4ecd8" stroke="${INK}"/><path d="M58 37c12-6 32-6 44 0l-4-5c-10-4-26-4-36 0z" fill="${INK}"/><path d="M74 68v-12a6 6 0 0 1 12 0v12" fill="${INK}"/></g>`+iMist(74,.7)+iSun(132,22,6),
  tong:iMid('M10 74L40 24l14 18 10-14 30 46z')+iFar('M70 74l30-52 20 20 16-10 24 42z')+iPav(98,30,1)+iPav(46,30,.7)+`<path d="M60 70c10-12 24-22 34-34" fill="none" stroke="${INK}" stroke-width=".8" stroke-dasharray="2 2" opacity=".6"/>`+iMist(50,.8)+iMist(66,.6)+iBirds(20,16),
  cho:iFar('M0 54c30-8 60-8 90-4s50-4 70-2v52H0z')+[24,64,104].map(x=>`<g filter="url(#br)"><path d="M${x} 68V56h32v12" fill="#f4ecd8" stroke="${INK}"/><path d="M${x-4} 56l6-8h28l6 8z" fill="${INK}" opacity=".85"/></g>`).join('')+`<path d="M78 44v-8l8 3-8 3" fill="${SEAL}"/>`+GROUND,
  ancu:iMid('M70 74l30-48 20 22 16-12 30 38z')+iMist(52)+`<g filter="url(#br)"><path d="M40 70V58h24v12" fill="#f4ecd8" stroke="${INK}"/><path d="M34 59c6-8 30-8 36 0l-6-6c-6-4-18-4-24 0z" fill="${INK}" opacity=".8"/></g>`+iPine(22,72,1)+iPine(84,72,.8)+iSun(130,20,5),
  ai:iMid('M0 74L24 26l18 20 18-22v50z')+iMid('M160 74L136 26l-18 20-18-22v50z')+`<g filter="url(#br)"><path d="M58 74V34h44v40" fill="#f4ecd8" stroke="${INK}" stroke-width="1.2"/><path d="M52 34c10-5 46-5 56 0l-4-5c-10-4-38-4-48 0z" fill="${INK}"/><path d="M72 74V56a8 8 0 0 1 16 0v18" fill="${INK}"/><path d="M80 28V16l9 3-9 3" fill="${SEAL}"/></g>`+iMist(68,.7),
  rung:iFar('M0 50c20-8 50-10 80-6s50-6 80-4v50H0z')+[8,22,36,52,68,84,100,116,132,148].map((x,i)=>iPine(x,70+(i%3)*3,1.1+(i%2)*.4)).join('')+iMist(60,.5),
  nui:iFar('M0 74L30 30l14 14 18-26 24 30 20-20 30 32 24-10v24z')+iMid('M20 74l26-34 12 12 16-18 26 40z')+iMist(48,.85)+iMist(64,.6)+iBirds(118,18)+iSun(134,20,5),
  song:iFar('M0 48c30-10 60-8 90-2s50-6 70-4v58H0z')+iMist(54,.7)+iPine(18,62,1)+iTree(146,64,1)+iBoat(80,66,1.2)+iWater(70),
  bien:iFar('M0 54c40-6 80-6 160 0v36H0z')+iSun(124,26,9)+`<g fill="none" stroke="${INK}" stroke-width="1" opacity=".55" filter="url(#br)"><path d="M10 64c8-5 16 5 24 0s16 5 24 0M70 70c8-5 16 5 24 0s16 5 24 0M110 60c6-4 12 4 18 0"/></g>`+iBoat(50,58,.8),
  hoang:iFar('M0 58c40-8 80-8 160-2v34H0z')+iSun(116,26,10)+[16,46,82,124].map(x=>`<g stroke="${INK}" stroke-width=".8" fill="none" opacity=".6" filter="url(#br)"><path d="M${x} 72c1-6 3-9 5-10M${x+4} 72c0-6 2-9 3-11M${x+8} 72c-1-5 0-8 2-9"/></g>`).join('')+iBirds(40,24),
  dam:iFar('M0 54c40-6 80 2 160 0v36H0z')+[10,22,34,112,126,140].map(x=>iReed(x,72)).join('')+iWater(66)+iMist(58,.7),
  thien:iMist(40,.9)+iMist(60,.9)+`<g filter="url(#br)"><path d="M42 74V30h4v44M112 74V26h4v48" stroke="${INK}" stroke-width="1.2" fill="none"/><path d="M36 30h16M106 26h16" stroke="${INK}" stroke-width="2.4"/></g><path d="M44 58c22-14 48-20 70-30" fill="none" stroke="${SEAL}" stroke-width="1.6" opacity=".8"/>`+iFar('M0 80c30-10 60-10 90-4s50-6 70-2v16H0z'),
  linhdia:iFar('M0 52c30-8 60-8 90-2s50-6 70-4v54H0z')+`<ellipse cx="80" cy="66" rx="30" ry="6" fill="${INK}" opacity=".18" filter="url(#wa)"/><path d="M80 62c-3-10 0-20 0-28M72 60c-4-6-3-14-1-20M88 60c4-6 3-14 1-20" fill="none" stroke="${INK}" stroke-width=".8" opacity=".5" filter="url(#br)"/>`+iPine(22,68,1)+iPine(136,70,.9)+iSun(80,26,4),
  duoc:iMid('M90 74l26-38 16 16 28-10v32z')+[26,42,58,74].map(x=>`<g filter="url(#br)"><path d="M${x} 72V60" stroke="${INK}"/><path d="M${x} 62c-5-2-6-6-5-8 4 0 5 4 5 8zM${x} 60c5-2 6-6 5-8-4 0-5 4-5 8z" fill="${INK}" opacity=".8"/><circle cx="${x}" cy="57" r="1.6" fill="${SEAL}"/></g>`).join('')+iMist(54,.6),
  khoang:iMid('M10 74l40-44 20 16 18-20 40 48z')+`<g filter="url(#br)"><path d="M66 74V58a12 10 0 0 1 24 0v16" fill="${INK}"/><path d="M62 58h32" stroke="${INK}" stroke-width="2"/></g>`+iRock(120,72,.8)+iMist(48,.6),
  dong:iMid('M8 74C18 36 50 22 80 22s62 14 72 52z')+`<path d="M54 74c0-18 12-28 26-28s26 10 26 28z" fill="${INK}" opacity=".9" filter="url(#wa)"/>`+iMist(70,.5)+iTree(20,72,.9),
  phe:iFar('M0 54c40-6 80-4 160 0v36H0z')+`<g filter="url(#br)" fill="#f4ecd8" stroke="${INK}"><path d="M22 72V40h8v32M60 72V46h8v26M104 72V36h8v36"/><path d="M18 40h16M100 36h16" stroke-width="2"/></g>`+iRock(132,74,.9)+iRock(80,74,.6)+iMist(62,.6),
  ma:`<rect width="160" height="90" fill="${INK}" opacity=".18"/>`+iMid('M0 74c30-12 60-14 90-6s50-4 70-6v28H0z')+iSun(124,24,8)+[22,58,100,140].map(x=>`<g stroke="${INK}" stroke-width="1.8" fill="none" filter="url(#br)"><path d="M${x} 72V44l-6-8M${x} 50l7-7M${x} 58l-5-3"/></g>`).join(''),
  sao:`<rect width="160" height="90" fill="${INK}" opacity=".1"/>`+iMid('M12 74C24 34 56 20 80 20s58 14 70 54z')+`<path d="M54 74c0-18 12-28 26-28s26 10 26 28z" fill="${INK}" filter="url(#wa)"/><circle cx="72" cy="58" r="2" fill="${SEAL}"/><circle cx="88" cy="58" r="2" fill="${SEAL}"/>`+iRock(26,74,.7)+iRock(136,74,.8),
};
(function(){for(const k in INK_PLACE)ASSET.place[k]=inkSvg(160,90,INK_PLACE[k],'all');
  // màn khởi đầu: dãy núi trùng điệp, sông, thuyền, trăng son, sương
  const tm=(y,o,rx)=>`<ellipse cx="300" cy="${y}" rx="${rx||340}" ry="14" fill="#f4ecd8" opacity="${o}" filter="url(#mi2)"/>`;
  ASSET.title=inkSvg(600,260,
    '<defs><filter id="mi2" x="-20%" y="-200%" width="140%" height="500%"><feGaussianBlur stdDeviation="9"/></filter></defs>'+
    iSun(470,70,20)+iBirds(150,64)+iBirds(380,92)+
    iFar('M0 170L50 110l30 30 40-62 34 44 30-30 44 56 34-36 46 46 40-32 46 42 50-28 56 34v200H0z')+tm(140,.85)+
    iMid('M-10 230L60 128l34 34 28-40 52 84 34-26 56 68z')+iMid('M300 230l70-110 36 40 32-26 46 58 34-22 60 60z')+tm(196,.9)+
    `<path d="M0 236c100-10 200-12 300-6s170 4 300 0v30H0z" fill="${INK}" opacity=".1" filter="url(#wa)"/>`+
    iBoat(300,228,1.6)+iWater(236).replace(/M20 /,'M220 ').replace(/M70 /,'M330 ').replace(/M30 /,'M250 ').replace(/M100 /,'M360 ')+
    iPine(40,246,2)+iPine(560,248,1.7),'bottom');
})();
