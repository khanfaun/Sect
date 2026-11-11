// ---------- hiệu ứng trận đấu: phần luật ghi sự kiện vào sc.fxq, ở đây lấy ra vẽ lên lớp #fx ----------
const FXC={kim:['#fff1b8','#d9a520'],moc:['#d6f8bf','#3c9a52'],thuy:['#d6f1ff','#3d8ecf'],hoa:['#ffe58f','#f0521f'],tho:['#f0d9a8','#96682a'],loi:['#f6eaff','#9a5cf0'],bang:['#ecfcff','#5cc3e0'],phong:['#e6ffec','#5fb07c'],am:['#dccbff','#5a2d91'],phat:['#fff5c9','#e0a81c'],vo:['#ffffff','#b9b2a0']};
function fxEl(html,x,y,ms,cls,style){const L=$('#fx');if(!L)return null;const d=document.createElement('div');d.className='fxn '+(cls||'');d.style.cssText=`left:${x}px;top:${y}px;${style||''}`;d.innerHTML=html;L.appendChild(d);setTimeout(()=>d.remove(),ms);return d;}
function fxPos(sc,id){const u=sc.units.find(x=>x.id===id);const a=$('#cbArt');const r=a&&a.getBoundingClientRect();
  if(u&&r&&r.height>60){let x,y=0.62;if(u.side==='A'){const al=sc.units.filter(z=>z.side==='A');x=0.3-al.indexOf(u)*0.13;}else{const f=sc.units.filter(z=>z.side==='B');x=0.72+f.indexOf(u)*0.12-(f.length-1)*0.06;if(u.kind==='kiep')y=0.2;}return [r.left+r.width*x,r.top+r.height*y];}
  const c=document.getElementById('uc'+id);if(c){const q=c.getBoundingClientRect();return [q.left+Math.min(q.width/2,60),q.top+q.height/2];}return [innerWidth/2,innerHeight/2];}
function fxShake(big){const f=$('#full');if(!f)return;const c=big?'shk2':'shk';f.classList.remove('shk','shk2');void f.offsetWidth;f.classList.add(c);setTimeout(()=>f.classList.remove(c),big?650:340);}
function fxNum(x,y,t,cls){fxEl(`<b>${t}</b>`,x+(Math.random()*30-15),y-34,1100,'fx-num '+(cls||''));}
function fxSlash(x,y,el,big){const c=FXC[el]||FXC.vo;const rot=Math.round(-50+Math.random()*100);const s=big?1.5:1;
  fxEl(`<svg viewBox="0 0 160 160" style="transform:rotate(${rot}deg) scale(${s})"><path d="M6 96Q78 14 154 58Q78 44 6 96Z" fill="#fff"/><path d="M22 122Q92 60 150 92Q88 82 22 122Z" fill="${c[0]}" opacity=".85"/></svg>`,x,y,420,'fx-slash',`--c:${c[1]}`);}
function fxBurst(x,y,el,big){const c=FXC[el]||FXC.vo;const S0=big?190:120;
  fxEl('',x,y,520,'fx-core',`--c0:${c[0]};--c1:${c[1]};width:${S0}px;height:${S0}px`);
  fxEl('',x,y,560,'fx-ring',`--c0:${c[0]};--c1:${c[1]};width:${S0*0.8}px;height:${S0*0.8}px`);
  if(el==='thuy'||el==='bang')setTimeout(()=>fxEl('',x,y,560,'fx-ring',`--c0:${c[0]};--c1:${c[1]};width:${S0*1.1}px;height:${S0*1.1}px`),120);
  const n=big?18:10;let h='';
  for(let i=0;i<n;i++){const a=Math.random()*6.283,d=(big?90:55)+Math.random()*(big?90:50);let dx=Math.cos(a)*d,dy=Math.sin(a)*d;
    if(el==='hoa')dy=-Math.abs(dy)*1.3;if(el==='tho')dy=Math.abs(dy)*0.9+10;
    h+=`<i class="fx-p p-${el}" style="--dx:${dx.toFixed(0)}px;--dy:${dy.toFixed(0)}px;--r:${Math.round(Math.random()*720-360)}deg;animation-delay:${(Math.random()*0.08).toFixed(2)}s"></i>`;}
  fxEl(h,x,y,800,'fx-ps',`--c0:${c[0]};--c1:${c[1]}`);
  if(el==='loi'){let px=0,pts='0,-260';for(let yy=-220;yy<=0;yy+=36){px=yy===0?0:px+(Math.random()*44-22);pts+=` ${px.toFixed(0)},${yy}`;}
    fxEl(`<svg viewBox="-80 -260 160 270" width="160" height="270"><polyline points="${pts}" fill="none" stroke="${c[1]}" stroke-width="9" opacity=".6"/><polyline points="${pts}" fill="none" stroke="#fff" stroke-width="3.5"/></svg>`,x,y,380,'fx-bolt');}
  if(el==='kim')fxEl('<i></i><i></i>',x,y,420,'fx-spark',`--c0:${c[0]}`);
  if(el==='am')fxEl('',x,y,620,'fx-vortex',`--c1:${c[1]};width:${S0}px;height:${S0}px`);
  if(el==='phong')fxEl(`<svg viewBox="0 0 120 120" width="${S0}" height="${S0}"><path d="M10 60A50 50 0 0 1 100 30M110 60A50 50 0 0 1 20 90" fill="none" stroke="${c[0]}" stroke-width="5" stroke-linecap="round"/><path d="M30 60A30 30 0 0 1 84 42M90 60A30 30 0 0 1 36 78" fill="none" stroke="#fff" stroke-width="3" stroke-linecap="round"/></svg>`,x,y,560,'fx-wind');
  if(el==='phat')fxEl(Array.from({length:8},(_,i)=>`<i style="transform:rotate(${i*45}deg) translateY(-${S0*0.36}px)"></i>`).join(''),x,y,700,'fx-lotus',`--c0:${c[0]};--c1:${c[1]}`);
}
function fxShield(x,y){fxEl(`<svg viewBox="0 0 100 110" width="110" height="120"><path d="M50 4L92 20v34c0 26-18 42-42 52C26 96 8 80 8 54V20z" fill="rgba(120,190,255,.28)" stroke="#bfe3ff" stroke-width="4"/><path d="M50 18L80 30v24c0 18-12 30-30 38-18-8-30-20-30-38V30z" fill="none" stroke="#ffe9a8" stroke-width="2"/></svg>`,x,y,560,'fx-shield');}
function fxOne(sc,e){if(!G.run||G.run.scene!==sc)return;const fx=CFG.anim!==false;const t=sc.units.find(u=>u.id===e.id);const [x,y]=fxPos(sc,e.id);const me=t&&t.isMain;
  if(e.k==='hit'){if(fx){fxSlash(x,y,e.el,e.big);fxBurst(x,y,e.el,e.big);if(e.blk)fxShield(x,y);if(me){fxShake(e.big||e.crit);if(!e.blk&&e.d>0)fxEl('',0,0,450,'fx-vig');}else if(e.big||e.crit)fxShake(false);}
    if(e.blk)fxNum(x,y-26,'Đỡ!','blk');fxNum(x,y,e.d>0?(e.crit?'Bạo kích ':'')+'−'+e.d:'Hộ thể',e.d>0?(e.crit?'crit':me?'dmg me':'dmg'):'blk');
    const c=document.getElementById('uc'+e.id);if(c){c.classList.remove('hitf');void c.offsetWidth;c.classList.add('hitf');}}
  else if(e.k==='dodge'){fxNum(x,y,'Né!','ev');if(fx)fxEl('<i></i><i></i><i></i>',x,y,420,'fx-dash');}
  else if(e.k==='heal'){fxNum(x,y,'+'+e.d,'heal');if(fx)fxEl(Array.from({length:6},(_,i)=>`<i style="left:${(Math.random()*80-40).toFixed(0)}px;animation-delay:${(i*0.07).toFixed(2)}s">+</i>`).join(''),x,y,900,'fx-heal');}
  else if(e.k==='shield'){if(fx)fxShield(x,y);}
  else if(e.k==='daze'){fxNum(x,y-20,'Choáng!','dz');if(fx)fxEl('<i>✦</i><i>✦</i><i>✦</i>',x,y-46,900,'fx-daze');}
}
// hiển hóa pháp tướng: màn hình tối lại, tia tốc độ xoay, pháp tướng khổng lồ trồi lên, tên viết lớn
function fxUlt(el,name){hideTip();const c=FXC[el]||FXC.vo;if(CFG.anim===false){fxNum(innerWidth/2,innerHeight/2,name,'crit');return;}
  fxEl(`<div class="cine-bg"></div><div class="cine-lines"></div><div class="cine-fig">${ptFigSVG()}</div><div class="cine-bar"></div><div class="cine-txt"><small>Thần lực viên mãn</small><b>${esc(name)}</b></div><div class="cine-flash"></div>`,0,0,1750,'fx-cine',`--fc:${c[1]};--fl:${c[0]}`);
  setTimeout(()=>fxShake(true),250);}
// đòn tối thượng: chớp đen, một vệt sáng xé ngang màn hình, sóng xung kích, rung mạnh
function fxStrike(el,name){hideTip();const c=FXC[el]||FXC.vo;if(CFG.anim===false){fxNum(innerWidth/2,innerHeight/2,name,'crit');return;}
  fxEl(`<div class="cine-bg"></div><div class="cine-lines"></div><div class="st-beam"></div><div class="st-beam b2"></div><div class="st-ring"></div><div class="st-ring r2"></div><div class="st-ring r3"></div><div class="cine-txt st"><b>${esc(name)}</b></div><div class="cine-flash late"></div>`,0,0,1500,'fx-cine strike',`--fc:${c[1]};--fl:${c[0]}`);
  setTimeout(()=>fxShake(true),620);setTimeout(()=>fxShake(true),900);}
function fxDrain(sc){const q=sc.fxq;sc.fxq=[];if(!$('#fx')||!q||!q.length)return;const now=performance.now();let delay=0,nh=0;
  for(const e of q){
    if(e.k==='ult'){fxUlt(e.el,e.n);UI.fxHold=now+1500;continue;}
    if(e.k==='strike'){fxStrike(e.el,e.n);delay+=950;UI.fxHold=now+1550;continue;}
    if(e.k==='ptend')continue;
    const d=delay+nh*110;if(e.k==='hit'||e.k==='dodge')nh++;
    if(d)setTimeout(()=>fxOne(sc,e),d);else fxOne(sc,e);}
}
