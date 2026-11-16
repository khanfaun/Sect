// ---------- đồ họa: bản đồ canvas và tranh mực sinh bằng mã ----------
// Nguyên tắc nhẹ máy: địa hình và sương vẽ một lần vào bộ đệm, mỗi khung chỉ dán lại;
// không có gì chuyển động thì không vẽ; số khung hình mỗi giây có trần do người chơi chọn.
function cssVar(n){return getComputedStyle(document.documentElement).getPropertyValue(n).trim()||'#888';}
function hexA(h,a){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return `rgba(${n>>16&255},${n>>8&255},${n&255},${a})`;}
function hexRGB(h){h=h.replace('#','');if(h.length===3)h=h.split('').map(c=>c+c).join('');const n=parseInt(h,16);return [n>>16&255,n>>8&255,n&255];}
function mixHex(a,b,t){const x=hexRGB(a),y=hexRGB(b);return '#'+x.map((v,i)=>Math.round(v+(y[i]-v)*t).toString(16).padStart(2,'0')).join('');}
// nhiễu giá trị hai chiều, có hạt giống
const GLYPH={
  tran:'M3 20V11l5-4 5 4v9M13 20v-6l4-3 4 3v6M2 20h20',
  thanh:'M4 20V8h3v3h3V6h4v5h3V8h3v12M2 20h20M10 20v-4h4v4',
  rung:'M8 20v-4M4 16l4-6 4 6zM5 10l3-5 3 5M17 20v-3M14 17l3-5 3 5z',
  nui:'M2 20l7-13 4 7 2-3 7 9zM9 7l-2 6',
  song:'M3 9c3-3 5 3 9 0s5 3 9 0M3 15c3-3 5 3 9 0s5 3 9 0',
  phe:'M5 20V9M5 9l3-2M10 20V5h3v15M17 20v-8l3 2v6M3 20h18',
  dong:'M3 20c0-9 4-15 9-15s9 6 9 15zM9 20c0-4 1-7 3-7s3 3 3 7',
  tong:'M3 7c6 2 12 2 18 0M5 11h14M7 7v13M17 7v13M12 4v3',
  bien:'M2 18c3-2 5 2 8 0s5 2 8 0 3-1 4 0M7 14c1-5 6-7 10-3M12 14V8',
  hoang:'M2 18c4-6 7-6 10 0 2-4 5-5 10 0M15 5a2 2 0 100 4 2 2 0 000-4z',
  ma:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',
  thien:'M6 17a4 4 0 010-8 5 5 0 0110-1 4 4 0 012 9z',
  ai:'M4 20V6l8-3 8 3v14M4 11h16M9 20v-5h6v5',
  sao:'M3 20l4-10 3 5 2-9 2 9 3-5 4 10z',
  linhdia:'M12 20c-5 0-8-3-8-7 3 0 5 1 8 4 3-3 5-4 8-4 0 4-3 7-8 7zM12 15c-2-3-2-7 0-11 2 4 2 8 0 11z',
  khoang:'M4 20l9-9M11 5c4 0 7 2 9 6M13 11l2 2M4 20h6',
  duoc:'M5 19c0-8 5-13 14-14 0 9-5 14-14 14zM5 19l9-9',
  cho:'M3 10l2-5h14l2 5M4 10v10h16V10M3 10h18M9 20v-5h6v5',
  ancu:'M3 12l9-8 9 8M6 11v9h12v-9M10 20v-4h4v4',
  dam:'M3 19c3-2 5 2 8 0s5 2 8 0M8 16V7M8 7c-1-2-1-3 0-4 1 1 1 2 0 4M15 15V9M15 9c-1-2-1-3 0-4 1 1 1 2 0 4',
  ruin:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
  me:'M12 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 13c0-3 2-5 5-5s5 2 5 5M3 20c3-4 6-5 9-5s6 1 9 5',
};
const P2D={};function p2d(k){return P2D[k]||(P2D[k]=new Path2D(GLYPH[k]||GLYPH.tran));}
const NODE_CAT={tran:'gold',thanh:'gold',tong:'acc',rung:'jade',nui:'jade',song:'jade',bien:'jade',hoang:'jade',thien:'acc',phe:'vio',dong:'vio',ma:'seal',sao:'seal',ai:'ink',linhdia:'acc',khoang:'vio',duoc:'jade',cho:'gold',ancu:'acc',dam:'jade'};

const HERO_IMG={};function heroImg(){const u=ASSET.hero.me;if(!u||typeof Image==='undefined')return null;if(!HERO_IMG[u]){const im=new Image();im.onload=()=>Map2.invalidate();im.src=u;HERO_IMG[u]=im;}return HERO_IMG[u];}
const ENT_GLYPH={thutrieu:'paw',di:'star'};const ICPATH={};function icPath(k){return ICPATH[k]||(ICPATH[k]=new Path2D(ICP[k]));}
function entCol(t,C){return ['thutrieu','truysat'].includes(t)?C.seal:t==='di'?C.vio:t==='thuong'?C.gold:C.acc;}
function avLetter(name){const w=String(name||'?').trim().split(/\s+/);return (w[w.length-1]||'?')[0].toUpperCase();}
function mapNode(n){const k=Math.floor(n.id/100);return mapXY(k,n.x,n.y);}
const Map2=(()=>{
  // lưới ô và các đường ranh: dựng một lần thành nét vẽ sẵn, mỗi khung chỉ tô lại
  let HX=null,hov=null,pcam=null,pse=null;
  function hexPaths(){const g=geo();if(HX&&HX.seed===g.seed)return HX;
    const grid=new Path2D(),macro=new Path2D(),dist=new Path2D(),coast=new Path2D(),dp={};
    for(let i=0;i<HN;i++){const v=hexVerts(i),a=g.reg[i],c=i%HCOLS,r=(i-c)/HCOLS;
      if(a>=0){grid.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)grid.lineTo(v[k][0],v[k][1]);grid.closePath();
        const d=g.dist[i],P=dp[d]||(dp[d]=new Path2D());P.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)P.lineTo(v[k][0],v[k][1]);P.closePath();}
      // ba cạnh đông, đông nam, tây nam: mỗi cạnh chung chỉ xét một lần
      const nb=[[c+1,r,1,2],[r%2?c+1:c,r+1,2,3],[r%2?c:c-1,r+1,3,4]];
      for(const [x,y,p,q] of nb){const j=x>=0&&x<HCOLS&&y>=0&&y<HROWS?y*HCOLS+x:-1;const b=j<0?-1:g.reg[j];let T=null;
        if(a!==b)T=a>=0&&b>=0?macro:coast;else if(a>=0&&g.dist[i]!==g.dist[j])T=dist;
        if(T){T.moveTo(v[p][0],v[p][1]);T.lineTo(v[q][0],v[q][1]);}}}
    return HX={seed:g.seed,grid,macro,dist,coast,dp};}
  function cellAt(sx,sy){return hexAt((sx-W0/2)/cam.z+cam.x,(sy-H0/2)/cam.z+cam.y);}
  function hexPoly(i){const v=hexVerts(i);ctx.beginPath();ctx.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)ctx.lineTo(v[k][0],v[k][1]);ctx.closePath();}
  const MOBILE=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  let cv=null,ctx=null,W0=0,H0=0,dpr=1;
  const cam={x:500,y:500,z:0.8,follow:true,reg:-1};
  const DT_Z=1.6,DTC={};let dtWant='',dtTimer=0; // mảnh địa hình chi tiết khi phóng to sâu
  let terr=null,terrKey='',fogC=null,fogKey='',C={},cloudSpr=null;
  let fogS=null,fogKey2='',holeSpr=null;
  let lastAct=performance.now(),dirty=true,soft=false,ema=0,slow=0,fpsT=0,fpsN=0,fpsShow=0,lastT=0,lastDraw=0;
  const parts=[],clouds=[];let pos=null;
  const ptr=new Map();let drag=null,pinch=null;

  function colors(){C={bg:cssVar('--bg'),bg2:cssVar('--bg2'),paper:cssVar('--paper'),ink:cssVar('--ink'),ink2:cssVar('--ink2'),ink3:cssVar('--ink3'),line:cssVar('--line'),
    acc:cssVar('--acc'),seal:cssVar('--seal'),jade:cssVar('--jade'),gold:cssVar('--gold'),vio:cssVar('--vio'),water:cssVar('--water'),dark:document.documentElement.dataset.theme==='dark'};}
  const TC={},FC={};
  function invalidate(all){dirty=true;if(all){for(const k in TC)delete TC[k];for(const k in FC)delete FC[k];colors();}}
  function attach(el){if(cv===el)return;cv=el;ctx=cv?cv.getContext('2d',{alpha:false}):null;if(cv){bind();resize();}}
  function resize(){if(!cv)return;const r=cv.getBoundingClientRect();if(!r.width)return;const lv=gfxLv();
    dpr=Math.min(window.devicePixelRatio||1,CFG.dpr||(MOBILE?[1,1.25,1.5]:[1,1.5,2])[lv]);W0=r.width;H0=r.height;
    const w=Math.round(W0*dpr),h=Math.round(H0*dpr);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}dirty=true;}
  function resetAll(){for(const k in DTC)delete DTC[k];dtWant='';CMP.key='';CMP.c=null;CMP.base='';TR.on=false;TR.from=null;clouds.length=0;parts.length=0;terr=null;terrKey='';fogC=null;fogKey='';fogS=null;fogKey2='';cloudSpr=null;invalidate(true);resize();}
  function zMin(){return Math.max(W0/WORLD_W,H0/WORLD_H);}
  function clampCam(){cam.z=clamp(cam.z,zMin(),1.6);const hw=W0/2/cam.z,hh=H0/2/cam.z;const zf0=clamp(Math.log(cam.z/zMin())/Math.log(1.6/zMin()),0,1),px=W0*0.42*zf0/cam.z,py=H0*0.45*zf0/cam.z;cam.x=clamp(cam.x,hw-px,Math.max(hw,WORLD_W-hw)+px);cam.y=clamp(cam.y,hh-py,Math.max(hh,WORLD_H-hh)+py);} // cho kéo quá mép nửa màn hình để điểm sát rìa vẫn kéo ra giữa được
  function center(){const r=G.run;if(!r)return;const w0=playerXY(),p=mapXY(r.region,w0[0],w0[1]);cam.x=p[0];cam.y=p[1];cam.follow=true;cam.reg=r.region;clampCam();dirty=true;}
  function focus(x,y){const p=mapXY(clamp(Math.floor(x/1000),0,4),x,y);cam.x=p[0];cam.y=p[1];cam.follow=false;clampCam();dirty=true;}
  function zoom(f,sx,sy){const z0=cam.z;cam.z=clamp(cam.z*f,zMin(),2.4);if(sx!=null){const wx=(sx-W0/2)/z0+cam.x,wy=(sy-H0/2)/z0+cam.y;cam.x=wx-(sx-W0/2)/cam.z;cam.y=wy-(sy-H0/2)/cam.z;cam.follow=false;}clampCam();dirty=true;}
  const SX=x=>(x-cam.x)*cam.z+W0/2,SY=y=>(y-cam.y)*cam.z+H0/2;
  // mức thu phóng 0..1 (0: thu nhỏ hết cỡ)
  function zfNow(){return clamp(Math.log(cam.z/zMin())/Math.log(1.6/zMin()),0,1);}

  // ----- nền bản đồ: ảnh vẽ sẵn theo mùa và buổi (ngày 5h–19h) -----
  // chỗ đã thấy: ảnh mùa; chỗ chưa tới: bản đồ cổ (Hidden-map); mép giữa hai bên: giấy cũ (Transition-map), nhòe mềm
  const MI={};
  function mapImg(k){const A=window.PS_ANH||{};const u=A[k];if(!u||typeof Image==='undefined')return null;let im=MI[k];if(!im){im=MI[k]=new Image();im.onload=()=>{CMP.key='';invalidate();};im.src=u;}return im.complete&&im.naturalWidth?im:null;}
  const SEAS={xuan:'Spring',ha:'Summer',thu:'Autumn',dong:'Winter'};
  function mapKey(){const t=W().t,h=tHour(t);return SEAS[seasonOf(t)]+'-'+(h>=5&&h<19?'day':'night');}
  const CMP={key:'',c:null,t:0,base:'',lv:-1,kiep:-1};
  const TR={on:false,from:null,t0:0,dur:2800,noise:null,tmp:null,mk:null}; // chuyển buổi/mùa: ảnh mới loang ra như mực trên ảnh cũ
  const SH={base:''}; // tên ảnh đang hiển thị; khi đang đi thì giữ nguyên, dừng lại mới đổi
  const MK=5; // mặt nạ: 1 điểm ảnh = 5 đơn vị thế giới
  const MW=Math.ceil(WORLD_W/MK),MH=Math.ceil(WORLD_H/MK);
  function cvs(w,h){const c=document.createElement('canvas');c.width=w;c.height=h;return c;}
  function seenMask(){const m=cvs(MW,MH);const g=m.getContext('2d');g.fillStyle='#fff';
    const a=seenArr(),rr=HEXW*0.75/MK;for(let i=0;i<HN;i++){if(!((a[i>>3]>>(i&7))&1))continue;const p=hexCenter(i);g.beginPath();g.arc(p[0]/MK,p[1]/MK,rr,0,6.3);g.fill();}return m;}
  // phình mặt nạ d điểm ảnh (vẽ chồng lệch tám hướng)
  function grow(m,d){const c=cvs(m.width,m.height),g=c.getContext('2d');for(let k=0;k<8;k++){const a=k/8*6.283;g.drawImage(m,Math.cos(a)*d,Math.sin(a)*d);}g.drawImage(m,0,0);return c;}
  // làm nhòe bằng thu nhỏ rồi phóng lại (chạy được trên mọi trình duyệt)
  function smooth(m,f){const w=Math.max(2,Math.round(m.width/f)),h=Math.max(2,Math.round(m.height/f));const a=cvs(w,h),ga=a.getContext('2d');ga.imageSmoothingEnabled=true;ga.imageSmoothingQuality='high';ga.drawImage(m,0,0,w,h);
    const b=cvs(m.width,m.height),gb=b.getContext('2d');gb.imageSmoothingEnabled=true;gb.imageSmoothingQuality='high';gb.drawImage(a,0,0,m.width,m.height);return b;}
  // nhiễu cố định cho mép mực (theo hạt giống thế giới, tính một lần)
  let INK=null;
  function inkNoise(){const sd=W().seed;if(INK&&INK.seed===sd)return INK.n;const z1=makeNoise(hashS('mre'+sd)),z2=makeNoise(hashS('mrf'+sd)),n=new Float32Array(MW*MH);
    for(let y=0;y<MH;y++)for(let x=0;x<MW;x++){const u=x/MW,v=y/MH;n[y*MW+x]=0.55*z1(u*2.4,v*1.4)+0.3*z2(u*6+3,v*3.4+1)+0.15*z2(u*15+7,v*8.5+4);}
    INK={seed:sd,n};return n;}
  const ss=(a,b,x)=>{const t=Math.min(1,Math.max(0,(x-a)/(b-a)));return t*t*(3-2*t);};
  // ba lớp mực từ mặt nạ đã thấy: ảnh mùa (lõi), giấy chuyển tiếp (vành rộng), vết mực sẫm (viền loang)
  function inkLayers(m0,lv){const n=inkNoise();const f1=smooth(grow(m0,2),lv?5:3);const d=f1.getContext('2d').getImageData(0,0,MW,MH).data;
    const mk=()=>{const c=cvs(MW,MH);return [c,c.getContext('2d').createImageData(MW,MH)];};
    const [cc,ci]=mk(),[cw,wi]=mk(),[cs,si]=mk();
    for(let i=0;i<MW*MH;i++){const f=d[i*4+3]/255,nz=(n[i]-0.5)*0.95;
      const core=ss(0.5+nz-0.1,0.5+nz+0.1,f);           // lõi: mép lởm chởm tự nhiên
      const wide=ss(0.1+nz*0.8-0.14,0.1+nz*0.8+0.14,f);       // vành giấy rộng hơn
      const stain=Math.max(0,wide-core)*Math.min(1,wide*1.6);  // vết mực ở khoảng giữa
      ci.data[i*4]=ci.data[i*4+1]=ci.data[i*4+2]=255;ci.data[i*4+3]=core*255;
      wi.data[i*4]=wi.data[i*4+1]=wi.data[i*4+2]=255;wi.data[i*4+3]=wide*255;
      si.data[i*4]=70;si.data[i*4+1]=48;si.data[i*4+2]=28;si.data[i*4+3]=Math.pow(stain,1.1)*70;}
    cc.getContext('2d').putImageData(ci,0,0);cw.getContext('2d').putImageData(wi,0,0);cs.getContext('2d').putImageData(si,0,0);return {core:cc,wide:cw,stain:cs};}
  function buildComposite(key){const lv=gfxLv();const CW=[1000,1600,2400][lv],CH=Math.round(CW*WORLD_H/WORLD_W);
    const base=mapImg(key.split('|')[0]),hid=mapImg('Hidden-map'),tr=mapImg('Transition-map');if(!base||!hid)return null;
    const c=cvs(CW,CH),g=c.getContext('2d');g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(hid,0,0,CW,CH);
    const L=inkLayers(seenMask(),lv);
    const t=cvs(CW,CH),tg=t.getContext('2d');tg.imageSmoothingEnabled=true;tg.imageSmoothingQuality='high';
    if(tr&&lv>0){tg.drawImage(tr,0,0,CW,CH);tg.globalCompositeOperation='destination-in';tg.drawImage(L.wide,0,0,CW,CH);g.drawImage(t,0,0);
      tg.globalCompositeOperation='source-over';tg.clearRect(0,0,CW,CH);g.globalCompositeOperation='multiply';g.drawImage(L.stain,0,0,CW,CH);g.globalCompositeOperation='source-over';}
    tg.drawImage(base,0,0,CW,CH);tg.globalCompositeOperation='destination-in';tg.drawImage(L.core,0,0,CW,CH);g.drawImage(t,0,0);
    return c;}
  // mặt nạ chuyển cảnh: mực loang từ giữa màn hình ra, mép lởm chởm; p từ 0 đến 1
  function trMask(p){const NW=192,NH=108;if(!TR.noise){const z1=makeNoise(hashS('trn1')),z2=makeNoise(hashS('trn2'));TR.noise=new Float32Array(NW*NH);
      for(let y=0;y<NH;y++)for(let x=0;x<NW;x++){const u=x/NW,v=y/NH,r=Math.hypot(u-0.5,(v-0.5)*0.6)*1.25;TR.noise[y*NW+x]=0.45*(0.6*z1(u*3,v*2)+0.4*z2(u*9+2,v*5+1))+0.55*r;}
      TR.mk=cvs(NW,NH);TR.id=TR.mk.getContext('2d').createImageData(NW,NH);}
    const t=p*1.35-0.2,w=0.14,d=TR.id.data;for(let i=0;i<NW*NH;i++){d[i*4]=d[i*4+1]=d[i*4+2]=255;d[i*4+3]=ss(0,1,(t-TR.noise[i])/w+0.5)*255;}
    TR.mk.getContext('2d').putImageData(TR.id,0,0);return TR.mk;}
  function cloudSprite(){const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');const gr=g.createRadialGradient(64,64,6,64,64,64);gr.addColorStop(0,'rgba(255,255,255,.9)');gr.addColorStop(1,'rgba(255,255,255,0)');g.fillStyle=gr;g.fillRect(0,0,128,128);return c;}

  // ----- một khung hình -----
  function badge(x,y,s,col,glyph,o){o=o||{};ctx.save();ctx.translate(x,y);ctx.globalAlpha=o.alpha||1;
    const h=s/2,rr=s*0.2;ctx.beginPath();ctx.roundRect?ctx.roundRect(-h,-h,s,s,rr):ctx.rect(-h,-h,s,s);
    ctx.fillStyle=col;ctx.fill();ctx.lineWidth=o.sel?2:1;ctx.strokeStyle=o.sel?C.ink:hexA(C.ink,o.hollow?0.7:0.45);if(o.dash)ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);
    if(glyph==='?'){ctx.fillStyle=C.dark?'#10151b':'#fbf7ea';ctx.font=`700 ${Math.round(s*0.6)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',0,1);}
    else{ctx.scale(s/30,s/30);ctx.translate(-12,-12);ctx.strokeStyle=o.hollow?col:(C.dark?'#10151b':'#fbf7ea');ctx.lineWidth=1.7;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(p2d(glyph));}
    ctx.restore();}
  function label(t,x,y,o){o=o||{};ctx.font=`${o.b?700:600} ${o.s||12}px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='top';ctx.lineWidth=3;ctx.strokeStyle=hexA(C.paper,0.85);ctx.lineJoin='round';ctx.strokeText(t,x,y);ctx.fillStyle=o.c||C.ink;ctx.fillText(t,x,y);}
  let FONT='serif';
  function draw(now,dt){
    const r=G.run;if(!r||!ctx||!W0)return;
    if(!C.paper)colors();
    const reg=r.region,lv=gfxLv(),w=W();
    if(cam.kz!==r.kiep){cam.kz=r.kiep;cam.reg=reg;cam.z=clamp(Math.max(Math.min(W0/340,1.15),zMin()*Math.pow(1.6/zMin(),0.62)),zMin(),1.6);center();pos=null;}
    const lastR=r.reveal[r.reveal.length-1];const base=lv+':'+CFG.theme+':'+w.seed,fbase=base+':'+r.kiep+':'+r.reveal.length+':'+(lastR?lastR.join(','):'');
    // vị trí người chơi được làm mượt giữa các nhịp đồng hồ
    const pw=playerXY(),pp=mapXY(reg,pw[0],pw[1]);if(!pos||Math.hypot(pos[0]-pp[0],pos[1]-pp[1])>120)pos=[pp[0],pp[1]];else{const f=r.moving?1:1-Math.pow(0.002,dt);pos[0]+=(pp[0]-pos[0])*f;pos[1]+=(pp[1]-pos[1])*f;}
    if(cam.follow&&r.moving){cam.x=pos[0];cam.y=pos[1];clampCam();}
    const z=cam.z,X0=reg*1000;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.dark?C.bg2:mixHex(C.paper,C.bg2,0.55);ctx.fillRect(0,0,W0,H0);
    {const mv=!!r.moving&&!r.halt;if(!mv||!SH.base)SH.base=mapKey();const stable=SH.base;const k=stable+'|'+(r.visN||0)+'|'+lv+'|'+r.kiep;const nw=performance.now();
      if(CMP.key!==k){const chg=CMP.c&&CMP.base!==stable;
        if(!CMP.c||chg||nw-CMP.t>300){const c=buildComposite(k);if(c){if(chg&&CMP.lv===lv&&CMP.kiep===r.kiep){TR.on=true;TR.from=CMP.c;TR.t0=nw;if(typeof dbg==='function')dbg('map.doi',{tu:CMP.base,den:stable});}CMP.c=c;CMP.key=k;CMP.t=nw;CMP.base=stable;CMP.lv=lv;CMP.kiep=r.kiep;}}else soft=true;}
      if(CMP.c&&CFG.terrain!==false){ctx.imageSmoothingEnabled=true;ctx.imageSmoothingQuality=z>0.8?'high':'medium';const dx=SX(0),dy=SY(0),dw=WORLD_W*z,dh=WORLD_H*z;
        if(TR.on){const p=(nw-TR.t0)/TR.dur;if(p>=1){TR.on=false;TR.from=null;}}
        if(TR.on&&TR.from){const p=(nw-TR.t0)/TR.dur;ctx.drawImage(TR.from,dx,dy,dw,dh);
          if(!TR.tmp)TR.tmp=cvs(2,2);if(TR.tmp.width!==W0||TR.tmp.height!==H0){TR.tmp.width=W0;TR.tmp.height=H0;}
          const tg=TR.tmp.getContext('2d');tg.globalCompositeOperation='source-over';tg.clearRect(0,0,W0,H0);tg.imageSmoothingEnabled=true;tg.drawImage(CMP.c,dx,dy,dw,dh);
          tg.globalCompositeOperation='destination-in';tg.imageSmoothingQuality='high';tg.drawImage(trMask(Math.min(1,p)),0,0,W0,H0);tg.globalCompositeOperation='source-over';
          ctx.drawImage(TR.tmp,0,0,W0,H0);dirty=true;}
        else ctx.drawImage(CMP.c,dx,dy,dw,dh);}}
    ctx.globalAlpha=1;
    // lưới lục giác, ranh quận, ranh đại khu vực, ô đang rê chuột hoặc đang chọn
    {const hx=hexPaths(),g0=geo();ctx.save();ctx.translate(W0/2-cam.x*z,H0/2-cam.y*z);ctx.scale(z,z);ctx.lineJoin='round';ctx.lineCap='round';
      const hc=CFG.grid&&zfNow()>0.02?(UI.cell!=null?UI.cell:hov):null;
      if(hc!=null&&g0.reg[hc]>=0&&hx.dp[g0.dist[hc]]){ctx.fillStyle=hexA(C.gold,0.09);ctx.fill(hx.dp[g0.dist[hc]]);}
      if(CFG.grid){if(z>0.45){ctx.strokeStyle=hexA(C.ink,C.dark?0.13:0.075);ctx.lineWidth=0.6/z;ctx.stroke(hx.grid);}
        ctx.strokeStyle=hexA(C.ink,0.24);ctx.lineWidth=0.9/z;ctx.setLineDash([6/z,5/z]);ctx.stroke(hx.dist);ctx.setLineDash([]);
        ctx.strokeStyle=hexA(C.water,0.4);ctx.lineWidth=0.8/z;ctx.stroke(hx.coast);}
      ctx.strokeStyle=hexA(C.paper,0.6);ctx.lineWidth=3/z;ctx.stroke(hx.macro);ctx.strokeStyle=hexA(C.seal,0.45);ctx.lineWidth=1.2/z;ctx.stroke(hx.macro);
      
      // đường định đi tới điểm đang chọn
      const sn=UI.sel!=null&&!r.moving&&nodeById(UI.sel);
      if(sn&&sn.id!==r.at&&sn.fog>=1){const hp=hexPath(nodeHex(nodeById(r.at)),hexAt(...mapNode(sn)),flyMode());ctx.beginPath();hp.cells.forEach((c,i)=>{const p=hexCenter(c);if(i)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});ctx.strokeStyle=hexA(C.acc,0.6);ctx.lineWidth=2.5/z;ctx.setLineDash([2/z,7/z]);ctx.stroke();ctx.setLineDash([]);}
      if(r.moving){const m=r.moving;ctx.beginPath();ctx.moveTo(pos[0],pos[1]);
        for(let i=m.seg;i<m.path.length-1;i++){const hp=hexPath(nodeHex(nodeById(m.path[i])),nodeHex(nodeById(m.path[i+1])),flyMode());const t=i===m.seg?m.prog*(hp.cum[hp.cum.length-1]||1):-1;hp.cells.forEach((c,j)=>{if(hp.cum[j]<=t)return;const p=hexCenter(c);ctx.lineTo(p[0],p[1]);});}
        ctx.strokeStyle=hexA(C.seal,0.85);ctx.lineWidth=2.5/z;ctx.setLineDash([6/z,5/z]);ctx.stroke();ctx.setLineDash([]);}
      ctx.restore();}
    // mức thu phóng 0..1 (0: thu nhỏ hết cỡ, 1: phóng to hết cỡ), theo thang log cho khớp lăn chuột
    //  0–20%: tên đại khu vực ở giữa khu vực, mờ dần khi phóng to · 12–50%: tên quận ở giữa quận · từ 50%: mọi icon (chỉ nhân vật chính thì lúc nào cũng hiện)
    const zf=zfNow();const showIc=zf>=0.5;
    {const gc=geo();if(!gc.cent){const rs={},ds={};for(let i=0;i<gc.reg.length;i++){const k=gc.reg[i];if(k<0)continue;const p=hexCenter(i);const a=rs[k]||(rs[k]=[0,0,0]);a[0]+=p[0];a[1]+=p[1];a[2]++;const d=gc.dist[i];const b=ds[d]||(ds[d]=[0,0,0]);b[0]+=p[0];b[1]+=p[1];b[2]++;}gc.cent={rs,ds};}
     ctx.textAlign='center';ctx.textBaseline='middle';
     const ra=clamp(1-zf/0.2,0,1);const SERIF='"Cormorant Garamond","Noto Serif",Georgia,serif';if(ra>0){ctx.font=`600 ${Math.round(clamp(z*80,17,30))}px ${SERIF}`;for(const [k,a] of Object.entries(gc.cent.rs)){const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);ctx.fillStyle=hexA(C.paper,0.7*ra);const nm=khuName(+k).toUpperCase().split('').join(' ');ctx.fillText(nm,x+1,y+1);ctx.fillStyle=hexA(C.ink,0.75*ra);ctx.fillText(nm,x,y);}}
     const da=Math.min(clamp((zf-0.12)/0.08,0,1),clamp((0.5-zf)/0.08,0,1));if(da>0){ctx.font=`italic 600 ${Math.round(clamp(z*46,13,19))}px ${SERIF}`;for(const [d,a] of Object.entries(gc.cent.ds)){const nm=gc.dnames[d];if(!nm)continue;const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);if(x<-80||y<-30||x>W0+80||y>H0+30)continue;ctx.fillStyle=hexA(C.paper,0.7*da);ctx.fillText(nm,x+1,y+1);ctx.fillStyle=hexA(C.ink2,0.9*da);ctx.fillText(nm,x,y);}}}
    if(false&&CFG.ring){ctx.beginPath();ctx.arc(SX(pos[0]),SY(pos[1]),senseR()*z,0,6.3);ctx.strokeStyle=hexA(C.acc,0.28);ctx.lineWidth=1;ctx.setLineDash([3,5]);ctx.stroke();ctx.setLineDash([]);}
    // điểm
    const s0=clamp(10.5*Math.sqrt(z/0.8),5,13)*(CFG.font==='xl'?1.15:1);const small=z<0.5;const notes=w.notes||{};
    const HT=CFG.hideT||{},HE=CFG.hideE||{},DC=[C.jade,C.gold,C.seal,C.vio];const QN=new Set((r.quests||[]).filter(q=>q.state==='open').map(q=>q.node));
    // một ô lục giác có cả địa điểm lẫn người (ngươi, hoặc thực thể đang dừng chân): địa điểm lùi sang trái, người sang phải, cả hai nhỏ lại cho khỏi đè nhau
    const HW=HEXW/2*z;const OCC=new Set();if(!r.moving&&!HT._me)OCC.add(r.at);
    if(CFG.ents){for(const e of entsHere()){if(HE[e.type]||e.to!=null)continue;const p=entXY(e);if(canSee(p[0],p[1]))OCC.add(e.at);}}
    if(showIc)for(const R0 of w.regions)for(const n of R0.nodes){if(n.fog<1)continue;if(HT[n.type])continue;const [nx,ny]=mapNode(n);let x=SX(nx),y=SY(ny);if(x<-60||y<-60||x>W0+60||y>H0+60)continue;const under=OCC.has(n.id);const sN=under?Math.min(s0,HW*0.7):s0;
      const sure=n.fog>=2||n.memory;const old=n.fog>=2&&n.seenT>=0&&w.t-n.seenT>HY;const ruin=(n.vstate||'ok')==='ruin'&&n.fog>=2;const sel=UI.sel===n.id;
      const col=C[NODE_CAT[n.type]||'ink'];
      if(sel){ctx.beginPath();ctx.arc(x,y,s0*0.95,0,6.3);ctx.fillStyle=hexA(C.acc,0.16);ctx.fill();ctx.strokeStyle=C.acc;ctx.lineWidth=1.5;ctx.stroke();}
      badge(x,y,sN,ruin?C.ink3:(sure?DC[dangerTag(n)]:col),sure?(ruin?'ruin':n.type):'?',{hollow:!sure,dash:!sure,sel});if(under){if(CFG.names)label(n.name,SX(nx),SY(ny)+s0/2+5,{c:C.ink,s:CFG.font==='m'?12:14});continue;}
      if(n.dp&&n.fog>=3){ctx.beginPath();ctx.arc(x+s0/2-1,y-s0/2+1,2.4,0,6.3);ctx.fillStyle=C.jade;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(n.grave&&n.fog>=1){ctx.fillStyle=C.ink2;ctx.fillRect(x-s0/2-1,y-s0/2-1,3,4);}
      if(QN.has(n.id)){const qx=x+s0/2,qy=y+s0/2;ctx.beginPath();ctx.arc(qx,qy,4,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1;ctx.stroke();ctx.fillStyle='#fffaf0';ctx.font='700 6px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('!',qx,qy+0.5);}
      if(CFG.notes&&notes[n.id]){ctx.beginPath();ctx.arc(x-s0/2+1,y+s0/2-1,2.6,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(CFG.names&&(!small||sel||n.id===r.at||n.type==='thanh'||n.type==='ai')&&(z>=0.3||sel||n.id===r.at)){label(n.name+(sure?'':'?'),x,y+s0/2+3,{c:sure?C.ink:C.ink3,s:CFG.font==='m'?12:14});if(old)label('tin cũ',x,y+s0/2+18,{c:C.ink3,s:10});}}
    // thực thể qua lại
    if(CFG.ents&&showIc){for(const e of entsHere()){if(HE[e.type])continue;const p=entXY(e);const see=canSee(p[0],p[1]);
      if(!see&&!e.heard)continue;const q=see?p:[e.heard.x,e.heard.y];const parked=see&&e.to==null;const x=SX(q[0])+(parked?HW*0.64:0),y=SY(q[1]);const er=parked?Math.min(5,HW*0.28):5;if(x<-30||y<-30||x>W0+30||y>H0+30)continue;
      const bad=e.type==='thutrieu'||e.type==='truysat';ctx.globalAlpha=see?1:0.55;const ec=entCol(e.type,C);const gk=ENT_GLYPH[e.type];
      if(e.type==='thuong'){ // xe ngựa, trên đầu là ảnh nhỏ người dẫn đầu
        const wi=wagonImg();if(wi&&wi.complete&&wi.naturalWidth){ctx.drawImage(wi,x-7.5,y-4.5,15,8.75);}else{ctx.save();ctx.translate(x-5.5,y-4.5);ctx.scale(11/24,11/24);ctx.lineWidth=2;ctx.strokeStyle=ec;ctx.stroke(icPath('cart'));ctx.restore();}
        ctx.beginPath();ctx.arc(x+3,y-6,2.6,0,6.3);ctx.fillStyle=C.paper;ctx.fill();ctx.lineWidth=1;ctx.strokeStyle=ec;ctx.stroke();ctx.font=`500 3.5px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.ink;ctx.fillText(avLetter(e.lead||e.name),x+3,y-5.8);}
      else{const tg=talGrad(ctx,x,y,er,entTal(e));ctx.beginPath();ctx.arc(x,y,er,0,6.3);ctx.fillStyle=C.paper;ctx.fill();ctx.lineWidth=tg?2:1.3;ctx.strokeStyle=tg||ec;if(!see)ctx.setLineDash([2,2]);ctx.stroke();ctx.setLineDash([]);
        if(gk){const gs=er*1.3;ctx.save();ctx.translate(x-gs/2,y-gs/2);ctx.scale(gs/24,gs/24);ctx.lineWidth=2.2;ctx.strokeStyle=ec;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(icPath(gk));ctx.restore();}
        else{ctx.font=`500 5.5px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.ink;ctx.fillText(avLetter(ENT_T[e.type].n),x,y+0.5);}}
      ctx.globalAlpha=1;
      }}
    // người chơi: con dấu son
    if(!HT._me){// đứng ở địa điểm: địa điểm giữ ở tâm ô, nhân vật nằm ngay phía trên, cách một khe nhỏ
      const nd=!r.moving&&showIc&&!HT[(nodeById(r.at)||{}).type]?nodeById(r.at):null;const nS=Math.min(s0,HW*0.7);const rr=nd?Math.min(s0*0.5,HW*0.36):s0*0.62;const x=SX(pos[0]),y=SY(pos[1])-(nd?nS/2+2+rr+1.5:0);
      if(UI.lvGlow){const nw=performance.now(),G0=UI.lvGlow;if(nw<G0.t1){const p=(nw-G0.t0)/(G0.t1-G0.t0),fa=p<0.15?p/0.15:1-Math.max(0,(p-0.6)/0.4);ctx.save();
        const dn=G0.c==='down';const C1=dn?'150,20,20':'255,224,130',C2=dn?'120,10,30':'240,196,80',C3=dn?'90,0,0':'255,240,190';const pg=ctx.createLinearGradient(x,y-rr*9,x,y);pg.addColorStop(0,`rgba(${C1},0)`);pg.addColorStop(1,`rgba(${C1},${0.55*fa})`);ctx.fillStyle=pg;ctx.fillRect(x-rr*1.1,y-rr*9,rr*2.2,rr*9);
        for(let k=0;k<3;k++){const q=((p*2.4)+k/3)%1;ctx.beginPath();ctx.arc(x,y,rr+q*rr*2.6,0,6.3);ctx.strokeStyle=`rgba(${C2},${(1-q)*0.8*fa})`;ctx.lineWidth=2.5*(1-q)+0.5;ctx.stroke();}
        const rg=ctx.createRadialGradient(x,y,rr*0.5,x,y,rr*2.4);rg.addColorStop(0,`rgba(${C3},${0.6*fa})`);rg.addColorStop(1,`rgba(${C3},0)`);ctx.fillStyle=rg;ctx.beginPath();ctx.arc(x,y,rr*2.4,0,6.3);ctx.fill();ctx.restore();}else UI.lvGlow=null;}
      {const tg=talGrad(ctx,x,y,rr+2,playerTal());ctx.beginPath();ctx.arc(x,y,rr+(tg?2:1.5),0,6.3);ctx.fillStyle=tg||C.seal;ctx.fill();}ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.fillStyle=C.paper;ctx.fill();
      const hi=heroImg();if(hi&&hi.complete&&hi.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.clip();ctx.drawImage(hi,x-rr,y-rr,rr*2,rr*2);ctx.restore();}
      else{ctx.fillStyle=C.ink;ctx.font=`500 ${Math.round(rr*1.05)}px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(avLetter(r.ten),x,y+1);}
}
    // mây trôi, hạt theo mùa, sắc trời theo buổi
    if(lv>0&&CFG.clouds){if(!cloudSpr)cloudSpr=cloudSprite();if(!clouds.length)for(let i=0;i<[0,9,16][lv];i++)clouds.push({x:Math.random()*(WORLD_W+500)-250,y:Math.random()*2500-250,s:160+Math.random()*220,v:6+Math.random()*10});
      ctx.globalAlpha=C.dark?0.06:0.5;for(const c of clouds){c.x+=c.v*dt;if(c.x>WORLD_W+300)c.x=-500;const x=SX(c.x),y=SY(c.y),s=c.s*z*2;if(x+s<0||x>W0||y+s<0||y>H0)continue;ctx.drawImage(cloudSpr,x,y,s,s*0.6);}ctx.globalAlpha=1;}
    UI.dnMv=0;
    if(lv>0&&CFG.fx){if(!(r.moving&&!r.halt)||!pse)pse=[seasonOf(w.t),partOf(w.t)==='dem'];const se=pse[0],night=pse[1];const want=se==='ha'&&!night?0:[0,16,38][lv];
      while(parts.length<want)parts.push({x:Math.random()*W0,y:Math.random()*H0,v:10+Math.random()*24,a:Math.random()*6.3,s:1.5+Math.random()*2.5});
      if(parts.length>want)parts.length=want;
      const col=se==='xuan'?'#e8a0b0':se==='thu'?'#c98a3c':se==='dong'?(C.dark?'#e8eef4':'#9fb1c2'):'#f0d060';
      const cdx=(cam.x-(pcam?pcam[0]:cam.x))*z,cdy=(cam.y-(pcam?pcam[1]:cam.y))*z;pcam=[cam.x,cam.y];
      ctx.fillStyle=col;for(const q of parts){q.x-=cdx;q.y-=cdy;if(q.x<-5)q.x+=W0+10;if(q.y<-5)q.y+=H0+10;q.a+=dt*1.6;if(se==='ha'){q.x+=Math.cos(q.a)*8*dt;q.y+=Math.sin(q.a*0.7)*8*dt;ctx.globalAlpha=0.45+0.4*Math.sin(q.a*2);}
        else{q.y+=q.v*dt*(se==='dong'?1.2:0.8);q.x+=Math.sin(q.a)*14*dt+6*dt;ctx.globalAlpha=0.75;}
        if(q.y>H0+5){q.y=-5;q.x=Math.random()*W0;}if(q.x>W0+5)q.x=-5;
        ctx.beginPath();if(se==='dong'||se==='ha')ctx.arc(q.x,q.y,q.s*0.7,0,6.3);else ctx.ellipse(q.x,q.y,q.s*1.3,q.s*0.6,q.a,0,6.3);ctx.fill();}ctx.globalAlpha=1;}
    if(false&&CFG.showFps){ctx.font='11px monospace';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillStyle=C.ink2;ctx.fillText(fpsShow+' khung/giây · mức '+['tiết kiệm','cân bằng','đẹp'][lv],8,H0-6);}
  }
  function animating(){const r=G.run;if(!r)return false;const lv=gfxLv();return TR.on||(!!r.moving&&!r.halt)||(lv>0&&(CFG.fx||CFG.clouds))||(pos&&(()=>{const w0=playerXY(),q=mapXY(r.region,w0[0],w0[1]);return Math.hypot(pos[0]-q[0],pos[1]-q[1])>0.5;})());}
  // gọi mỗi nhịp rAF; tự bỏ khung để giữ đúng trần khung hình
  function frame(now){
    if(!cv||!G.run||document.hidden||!cv.isConnected)return;
    const mv=!!G.run.moving&&!G.run.halt,gapU=1000/(CFG.fps||30);
    const an=animating()&&!UI.panel&&!UI.modal&&!(G.run.scene&&G.run.scene.type==='combat');
    // đứng yên mà chỉ có mây/hạt thì vẽ thưa hơn (24 khung, lâu không chạm thì 10 khung) để máy đỡ nóng
    const idle=performance.now()-lastAct,gapA=mv?gapU:Math.max(gapU,idle>30000?100:42);
    if(!dirty&&!soft&&!an)return;
    if(now-lastT<(dirty||mv?gapU:gapA)-2)return; // trần khung hình áp cho mọi lần vẽ, cả khi kéo bản đồ
    soft=false;
    const dt=Math.min(0.1,(now-lastT)/1000)||0.016;lastT=now;dirty=false;
    const t0=performance.now();try{draw(now,dt);}catch(e){console.error(e);}const c=performance.now()-t0;
    ema=ema?ema*0.9+c*0.1:c;lastDraw=performance.now();fpsN++;if(now-fpsT>1000){fpsShow=Math.round(fpsN*1000/(now-fpsT));fpsN=0;fpsT=now;}
    // tự hạ mức đồ họa khi máy đuối
    if(CFG.gfx==='auto'&&an){if(ema>12)slow++;else slow=Math.max(0,slow-1);if(slow>60&&GFX_AUTO>0){GFX_AUTO--;slow=0;ema=0;cfgApply();resetAll();if(typeof note==='function'){note('Máy hơi nóng: đã tự hạ mức đồ họa.');toastFlush();}}}
  }
  // ----- thao tác -----
  function hit(sx,sy){const r=G.run;let best=null,bd=14;const HT=CFG.hideT||{};for(let k=0;k<5;k++)for(const n of regionOf(k).nodes){if(n.fog<1||HT[n.type])continue;const [nx,ny]=mapNode(n);const d=Math.hypot(SX(nx)-sx,SY(ny)-sy);if(d<bd){bd=d;best=n;}}return best;}
  function bind(){
    if(!window._psAct){window._psAct=1;['pointerdown','pointermove','keydown','wheel','touchstart'].forEach(t=>document.addEventListener(t,()=>{lastAct=performance.now();},{passive:true}));}
    cv.addEventListener('pointerdown',e=>{cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[e.offsetX,e.offsetY]);
      if(ptr.size===1)drag={x:e.offsetX,y:e.offsetY,cx:cam.x,cy:cam.y,moved:false};
      else if(ptr.size===2){const [a,b]=[...ptr.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:cam.z};drag=null;}});
    cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;ptr.set(e.pointerId,[e.offsetX,e.offsetY]);
      if(pinch&&ptr.size===2){const [a,b]=[...ptr.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);cam.z=clamp(pinch.z*d/Math.max(20,pinch.d),zMin(),2.4);cam.follow=false;clampCam();dirty=true;return;}
      if(drag){const dx=e.offsetX-drag.x,dy=e.offsetY-drag.y;if(Math.abs(dx)+Math.abs(dy)>7)drag.moved=true;if(drag.moved){cam.x=drag.cx-dx/cam.z;cam.y=drag.cy-dy/cam.z;cam.follow=false;clampCam();dirty=true;}}});
    const up=e=>{const d=drag;ptr.delete(e.pointerId);if(ptr.size<2)pinch=null;if(e.type==='pointerup'&&d&&!d.moved&&ptr.size===0&&pos&&Math.abs(SX(pos[0])-e.offsetX)<20&&e.offsetY>SY(pos[1])-44&&e.offsetY<SY(pos[1])+4&&G.run&&!G.run.scene){UI.panel='char';UI.tab.char='base';after();}else if(e.type==='pointerup'&&d&&!d.moved&&ptr.size===0){const c=cellAt(e.offsetX,e.offsetY);let n=hexNode(c);if(n&&(CFG.hideT||{})[n.type])n=null;if(!n)n=hit(e.offsetX,e.offsetY);mapTap(n,c);}if(ptr.size===0)drag=null;};
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    cv.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||drag||!G.run||G.run.scene)return;const c=cellAt(e.offsetX,e.offsetY);if(zfNow()<=0.02){if(hov!=null){hov=null;dirty=true;}hideTip();return;}if(c!==hov){hov=c;dirty=true;}hexTip(c,e.clientX,e.clientY);});
    cv.addEventListener('pointerleave',()=>{if(hov!=null){hov=null;dirty=true;}hideTip();});
    cv.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.15:1/1.15,e.offsetX,e.offsetY);},{passive:false});
  }
  return {attach,resize,invalidate,soft(){soft=true;},frame,center,focus,zoom,cam,reset:resetAll,get fps(){return performance.now()-lastDraw>1500?0:fpsShow;},get dpr(){return dpr;},get dtc(){return Object.keys(DTC).filter(k=>DTC[k]).length;},setFont:f=>{FONT=f;},get lv(){return gfxLv();},get mapKey(){return CMP.key;},get trOn(){return TR.on;},zf:()=>zfNow(),get hov(){return hov;}};
})();
