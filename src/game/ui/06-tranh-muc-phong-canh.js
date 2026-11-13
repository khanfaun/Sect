// ---------- tranh mực: phong cảnh và bóng nhân vật, vẽ bằng mã rồi giữ lại ----------
const Art=(()=>{
  const cache=new Map();
  function ridge(g,W,H,base,amp,rnd,col,alpha,step){let x=-20;const pts=[];while(x<W+40){pts.push([x,base-amp*Math.pow(rnd(),1.4)*(0.5+rnd()*0.5)]);x+=step*(0.6+rnd());}
    g.beginPath();g.moveTo(-30,H);g.lineTo(pts[0][0],pts[0][1]);for(let i=1;i<pts.length;i++){const p=pts[i-1],q=pts[i];g.quadraticCurveTo((p[0]+q[0])/2,Math.min(p[1],q[1])-amp*0.1*rnd(),q[0],q[1]);}g.lineTo(W+40,H);g.closePath();
    const gr=g.createLinearGradient(0,base-amp,0,H);gr.addColorStop(0,hexA(col,alpha));gr.addColorStop(1,hexA(col,alpha*0.15));g.fillStyle=gr;g.fill();}
  function pine(g,x,y,h,ink){g.strokeStyle=hexA(ink,0.75);g.lineWidth=Math.max(1,h*0.035);g.beginPath();g.moveTo(x,y);g.quadraticCurveTo(x+h*0.08,y-h*0.5,x-h*0.05,y-h);g.stroke();g.fillStyle=hexA(ink,0.6);for(let i=0;i<4;i++){const yy=y-h*(0.45+i*0.16),w=h*(0.34-i*0.06);g.beginPath();g.ellipse(x+(i%2?w*0.3:-w*0.3),yy,w,h*0.06,i%2?-0.15:0.15,0,6.3);g.fill();}}
  function paint(g,W,H,seed,reg,type,night){
    const rnd=mul(hashS(seed));const paper=cssVar('--paper'),ink=cssVar('--ink'),seal=cssVar('--seal'),water=cssVar('--water');const RG=REG[reg]||REG[0];const dark=document.documentElement.dataset.theme==='dark';
    const sky=g.createLinearGradient(0,0,0,H);sky.addColorStop(0,dark?mixHex(paper,'#000',0.2):mixHex(RG.sky,paper,0.4));sky.addColorStop(1,paper);g.fillStyle=sky;g.fillRect(0,0,W,H);
    const sx=W*(0.15+rnd()*0.7),sy=H*(0.18+rnd()*0.14),sr=H*(0.07+rnd()*0.04);g.beginPath();g.arc(sx,sy,sr,0,6.3);g.fillStyle=hexA(night?(dark?'#e8e2c8':'#8a93a8'):seal,night?0.5:0.55);g.fill();
    const tint=dark?RG.tint.map(t=>mixHex(t,'#0c1016',0.35)):RG.tint;
    ridge(g,W,H,H*0.52,H*0.36,rnd,tint[0],0.5,W*0.13);
    const m1=g.createLinearGradient(0,H*0.4,0,H*0.62);m1.addColorStop(0,hexA(paper,0));m1.addColorStop(1,hexA(paper,0.75));g.fillStyle=m1;g.fillRect(0,H*0.4,W,H*0.25);
    ridge(g,W,H,H*0.68,H*0.3,rnd,tint[1],0.7,W*0.1);
    const m2=g.createLinearGradient(0,H*0.6,0,H*0.8);m2.addColorStop(0,hexA(paper,0));m2.addColorStop(1,hexA(paper,0.7));g.fillStyle=m2;g.fillRect(0,H*0.6,W,H*0.22);
    if(type==='song'||type==='bien'){g.fillStyle=hexA(water,0.35);g.fillRect(0,H*0.8,W,H*0.2);g.strokeStyle=hexA(ink,0.3);g.lineWidth=1;for(let i=0;i<9;i++){const x=rnd()*W,y=H*(0.83+rnd()*0.14),w=10+rnd()*24;g.beginPath();g.moveTo(x,y);g.lineTo(x+w,y);g.stroke();}
      const bx=W*(0.3+rnd()*0.4),by=H*0.88;g.fillStyle=hexA(ink,0.75);g.beginPath();g.moveTo(bx-22,by);g.quadraticCurveTo(bx,by+9,bx+24,by);g.lineTo(bx+16,by+5);g.lineTo(bx-15,by+5);g.closePath();g.fill();g.fillRect(bx-2,by-16,1.5,16);}
    else{ridge(g,W,H,H*0.9,H*0.16,rnd,dark?tint[0]:tint[2],0.85,W*0.09);}
    if(['rung','nui','tong','dong','thien'].includes(type)||!type){for(let i=0;i<3+Math.floor(rnd()*3);i++)pine(g,W*(0.05+rnd()*0.9),H*(0.9+rnd()*0.1),H*(0.22+rnd()*0.2),ink);}
    if(type==='tran'||type==='thanh'||type==='tong'||type==='ai'){const n=type==='tran'?3:5;let x=W*(0.25+rnd()*0.2);g.fillStyle=hexA(ink,0.7);for(let i=0;i<n;i++){const w=W*(0.05+rnd()*0.04),h=H*(type==='tran'?0.1:0.14+rnd()*0.1),y=H*0.9;g.fillRect(x,y-h,w,h);g.beginPath();g.moveTo(x-w*0.25,y-h);g.quadraticCurveTo(x+w/2,y-h-h*0.35,x+w*1.25,y-h);g.lineTo(x+w,y-h+3);g.lineTo(x,y-h+3);g.closePath();g.fill();x+=w*1.5;}}
    if(type==='phe'||type==='ma'||type==='sao'){g.strokeStyle=hexA(ink,0.7);g.lineWidth=3;for(let i=0;i<5;i++){const x=W*(0.1+rnd()*0.8),h=H*(0.1+rnd()*0.2);g.beginPath();g.moveTo(x,H*0.93);g.lineTo(x+rnd()*4-2,H*0.93-h);g.stroke();}if(type!=='phe'){g.fillStyle=hexA(seal,0.12);g.fillRect(0,0,W,H);}}
    for(let b=0;b<2+Math.floor(rnd()*3);b++){const bx=W*(0.1+rnd()*0.8),by=H*(0.1+rnd()*0.25),w=4+rnd()*4;g.strokeStyle=hexA(ink,0.4);g.lineWidth=1;g.beginPath();g.moveTo(bx-w,by);g.quadraticCurveTo(bx-w/2,by-w/2,bx,by);g.quadraticCurveTo(bx+w/2,by-w/2,bx+w,by);g.stroke();}
    if(night){g.fillStyle='rgba(15,28,58,.09)';g.fillRect(0,0,W,H);}
    const fade=g.createLinearGradient(0,H*0.82,0,H);fade.addColorStop(0,hexA(paper,0));fade.addColorStop(1,hexA(paper,0.9));g.fillStyle=fade;g.fillRect(0,H*0.82,W,H*0.18);}
  // bóng mực: người, thú, quỷ, vật
  function figure(g,x,y,h,kind,seed,flip){const rnd=mul(hashS(seed));const ink=cssVar('--ink'),seal=cssVar('--seal');g.save();g.translate(x,y);if(flip)g.scale(-1,1);const u=h/100;g.fillStyle=hexA(ink,0.86);g.strokeStyle=hexA(ink,0.86);g.lineCap='round';
    const sh=g.createRadialGradient(0,0,2,0,0,46*u);sh.addColorStop(0,hexA(ink,0.28));sh.addColorStop(1,hexA(ink,0));g.save();g.scale(1,0.22);g.fillStyle=sh;g.beginPath();g.arc(0,0,46*u,0,6.3);g.fill();g.restore();
    if(kind==='thu'){g.beginPath();g.ellipse(0,-34*u,34*u,19*u,0,0,6.3);g.fill();g.beginPath();g.ellipse(30*u,-50*u,14*u,12*u,-0.3,0,6.3);g.fill();
      g.beginPath();g.moveTo(34*u,-60*u);g.lineTo(40*u,-74*u);g.lineTo(28*u,-62*u);g.fill();g.lineWidth=7*u;for(const lx of[-22,-8,10,22]){g.beginPath();g.moveTo(lx*u,-24*u);g.lineTo((lx+rnd()*6-3)*u,0);g.stroke();}
      g.lineWidth=5*u;g.beginPath();g.moveTo(-32*u,-40*u);g.quadraticCurveTo(-54*u,-60*u,-46*u,-78*u);g.stroke();g.fillStyle=seal;g.beginPath();g.arc(36*u,-52*u,2.2*u,0,6.3);g.fill();}
    else if(kind==='quy'){g.globalAlpha=0.8;g.beginPath();g.moveTo(-20*u,0);g.quadraticCurveTo(-34*u,-50*u,-12*u,-86*u);g.quadraticCurveTo(0,-104*u,14*u,-86*u);g.quadraticCurveTo(34*u,-50*u,22*u,0);g.quadraticCurveTo(12*u,-12*u,6*u,0);g.quadraticCurveTo(-2*u,-12*u,-8*u,0);g.quadraticCurveTo(-14*u,-10*u,-20*u,0);g.fill();g.globalAlpha=1;g.fillStyle=cssVar('--paper');g.beginPath();g.arc(-6*u,-74*u,3*u,0,6.3);g.arc(8*u,-74*u,3*u,0,6.3);g.fill();}
    else if(kind==='vat'){g.beginPath();g.moveTo(-30*u,0);g.lineTo(-36*u,-52*u);g.lineTo(-14*u,-92*u);g.lineTo(18*u,-88*u);g.lineTo(36*u,-48*u);g.lineTo(28*u,0);g.closePath();g.fill();g.strokeStyle=hexA(cssVar('--paper'),0.5);g.lineWidth=1.5*u;g.beginPath();g.moveTo(-10*u,-80*u);g.lineTo(4*u,-50*u);g.lineTo(-8*u,-20*u);g.stroke();g.fillStyle=seal;g.beginPath();g.arc(6*u,-64*u,3*u,0,6.3);g.fill();}
    else if(kind.slice(0,4)==='kiep'){const KC={hoa:'#d2572b',nghiep:'#a3241c',phong:'#6f9c8f',am:'#5b7fb8',tutieu:'#8a4fc0',nguhanh:'#c9a227'};g.globalAlpha=0.7;for(let i=0;i<6;i++){g.beginPath();g.ellipse((rnd()*80-40)*u,(-78-rnd()*20)*u,(22+rnd()*14)*u,(10+rnd()*6)*u,0,0,6.3);g.fill();}g.globalAlpha=1;g.strokeStyle=KC[kind.slice(5)]||cssVar('--gold');g.lineWidth=3*u;g.beginPath();g.moveTo(0,-70*u);g.lineTo(-10*u,-44*u);g.lineTo(4*u,-40*u);g.lineTo(-8*u,-6*u);g.stroke();}
    else{ // người tu hành: áo bào, tóc búi, kiếm đeo lưng
      g.beginPath();g.moveTo(-17*u,0);g.quadraticCurveTo(-24*u,-34*u,-12*u,-66*u);g.lineTo(10*u,-66*u);g.quadraticCurveTo(26*u,-36*u,20*u,0);g.quadraticCurveTo(2*u,-6*u,-17*u,0);g.fill();
      g.beginPath();g.arc(-1*u,-76*u,9.5*u,0,6.3);g.fill();g.beginPath();g.arc(-2*u,-88*u,4*u,0,6.3);g.fill();
      g.beginPath();g.moveTo(8*u,-60*u);g.quadraticCurveTo(34*u,-48*u,30*u,-22*u);g.quadraticCurveTo(22*u,-30*u,10*u,-34*u);g.fill();
      g.lineWidth=2.4*u;g.beginPath();g.moveTo(-20*u,-24*u);g.lineTo(18*u,-96*u);g.stroke();g.strokeStyle=seal;g.lineWidth=2*u;g.beginPath();g.moveTo(-12*u,-40*u);g.lineTo(12*u,-36*u);g.stroke();
      if(kind==='ma'){g.fillStyle=hexA(seal,0.85);g.beginPath();g.arc(3*u,-77*u,1.8*u,0,6.3);g.fill();}}
    g.restore();}
  function key(c){return c.dataset.scene+'|'+c.width+'x'+c.height+'|'+CFG.theme;}
  function fill(c){const d=Math.min(window.devicePixelRatio||1,gfxLv()?1.5:1);const r=c.getBoundingClientRect();const W=Math.max(60,Math.round((r.width||320)*d)),H=Math.max(40,Math.round((r.height||140)*d));if(c.width!==W||c.height!==H){c.width=W;c.height=H;}
    const k=key(c);let src=cache.get(k);
    if(!src){src=document.createElement('canvas');src.width=W;src.height=H;const g=src.getContext('2d');const [seed,reg,type,night,figs]=c.dataset.scene.split('~');paint(g,W,H,seed,+reg||0,type||'',night==='1');
      if(figs)figs.split(',').forEach(f=>{const [kind,fx,fs,flip,sd]=f.split(':');figure(g,W*(+fx),H*0.93,H*(+fs),kind,sd||seed,flip==='1');});
      cache.set(k,src);if(cache.size>14)cache.delete(cache.keys().next().value);}
    c.getContext('2d').drawImage(src,0,0);}
  function fillAll(root){(root||document).querySelectorAll('canvas[data-scene]').forEach(c=>{try{fill(c);}catch(e){console.error(e);}});}
  return {fillAll,clear:()=>cache.clear(),figure};
})();
function sceneCv(seed,reg,type,cls,figs){const night=G.meta&&G.meta.world&&partOf(W().t)==='dem'?1:0;return `<canvas class="art ${cls||''}" data-scene="${esc([seed,reg,type||'',night,figs||''].join('~'))}"></canvas>`;}

// khung thiên phú trên bản đồ: Tinh anh ánh bạc, Thiên kiêu ánh kim
function talGrad(ctx,x,y,r,t){if(!t||t.tier<0)return null;const g=ctx.createLinearGradient(x-r,y-r,x+r,y+r);const S={4:['#ffffff','#9fd8ff','#f2f8ff','#6a74d8','#cfe9ff'],3:['#fff4c2','#d9a521','#fff0a8','#9a6a08','#ffd75e'],2:['#ffffff','#9aa4ae','#f4f7fa','#6f7984','#dfe5ea'],1:['#ffe2c4','#c07a40','#f5c9a0','#6e3a18','#d9945a'],0:['#a8382a','#3a0a06','#6a1810','#1a0404','#5a1410']}[t.tier];S.forEach((c,i)=>g.addColorStop(i/(S.length-1),c));return g;}

// màu phủ theo giờ: nội suy giữa các mốc để chuyển buổi êm, không giật
const DN_K=[[0,'#0f1c3a',.16],[4.5,'#0f1c3a',.16],[6.5,'#f2c078',.07],[10,'#fff3c4',.035],[16,'#fff3c4',.035],[18,'#7a3a4a',.1],[20.5,'#0f1c3a',.16],[24,'#0f1c3a',.16]];
function dnTint(h,dark){h=((h%24)+24)%24;let a=DN_K[0],b=DN_K[1];for(let i=0;i<DN_K.length-1;i++)if(h>=DN_K[i][0]&&h<=DN_K[i+1][0]){a=DN_K[i];b=DN_K[i+1];break;}
  const f=(h-a[0])/Math.max(1e-6,b[0]-a[0]);const rgb=x=>[parseInt(x.slice(1,3),16),parseInt(x.slice(3,5),16),parseInt(x.slice(5,7),16)];const A=rgb(a[1]),B=rgb(b[1]);
  let al=a[2]+(b[2]-a[2])*f;if(dark&&a[1]==='#0f1c3a'&&b[1]==='#0f1c3a')al=0.2;return [A[0]+(B[0]-A[0])*f,A[1]+(B[1]-A[1])*f,A[2]+(B[2]-A[2])*f,al];}
