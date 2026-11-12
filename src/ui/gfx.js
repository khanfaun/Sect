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
  let cv=null,ctx=null,W0=0,H0=0,dpr=1;
  const cam={x:500,y:500,z:0.8,follow:true,reg:-1};
  let terr=null,terrKey='',fogC=null,fogKey='',C={},cloudSpr=null;
  let fogS=null,fogKey2='',holeSpr=null;
  let dirty=true,ema=0,slow=0,fpsT=0,fpsN=0,fpsShow=0,lastT=0;
  const parts=[],clouds=[];let pos=null;
  const ptr=new Map();let drag=null,pinch=null;

  function colors(){C={bg:cssVar('--bg'),bg2:cssVar('--bg2'),paper:cssVar('--paper'),ink:cssVar('--ink'),ink2:cssVar('--ink2'),ink3:cssVar('--ink3'),line:cssVar('--line'),
    acc:cssVar('--acc'),seal:cssVar('--seal'),jade:cssVar('--jade'),gold:cssVar('--gold'),vio:cssVar('--vio'),water:cssVar('--water'),dark:document.documentElement.dataset.theme==='dark'};}
  const TC={},FC={};
  function invalidate(all){dirty=true;if(all){for(const k in TC)delete TC[k];for(const k in FC)delete FC[k];colors();}}
  function attach(el){if(cv===el)return;cv=el;ctx=cv?cv.getContext('2d',{alpha:false}):null;if(cv){bind();resize();}}
  function resize(){if(!cv)return;const r=cv.getBoundingClientRect();if(!r.width)return;const lv=gfxLv();
    dpr=Math.min(window.devicePixelRatio||1,CFG.dpr||[1,1.5,2][lv]);W0=r.width;H0=r.height;
    const w=Math.round(W0*dpr),h=Math.round(H0*dpr);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}dirty=true;}
  function zMin(){return Math.max(W0/WORLD_W,H0/WORLD_H);}
  function clampCam(){cam.z=clamp(cam.z,zMin(),1.6);const hw=W0/2/cam.z,hh=H0/2/cam.z;const px=W0*0.42/cam.z,py=H0*0.45/cam.z;cam.x=clamp(cam.x,hw-px,Math.max(hw,WORLD_W-hw)+px);cam.y=clamp(cam.y,hh-py,Math.max(hh,WORLD_H-hh)+py);} // cho kéo quá mép nửa màn hình để điểm sát rìa vẫn kéo ra giữa được
  function center(){const r=G.run;if(!r)return;const w0=playerXY(),p=mapXY(r.region,w0[0],w0[1]);cam.x=p[0];cam.y=p[1];cam.follow=true;cam.reg=r.region;clampCam();dirty=true;}
  function focus(x,y){const p=mapXY(clamp(Math.floor(x/1000),0,4),x,y);cam.x=p[0];cam.y=p[1];cam.follow=false;clampCam();dirty=true;}
  function zoom(f,sx,sy){const z0=cam.z;cam.z=clamp(cam.z*f,zMin(),2.4);if(sx!=null){const wx=(sx-W0/2)/z0+cam.x,wy=(sy-H0/2)/z0+cam.y;cam.x=wx-(sx-W0/2)/cam.z;cam.y=wy-(sy-H0/2)/cam.z;cam.follow=false;}clampCam();dirty=true;}
  const SX=x=>(x-cam.x)*cam.z+W0/2,SY=y=>(y-cam.y)*cam.z+H0/2;

  // ----- địa hình: vẽ một lần cho mỗi vùng -----
  function buildTerr(reg){
    const lv=gfxLv(),S=[768,1152,1536][lv],k=S/1500,X0=reg*1000,R0=reg<5?regionOf(reg):{nodes:[],terr:[],edges:[]},RG=REG[reg<5?reg:2],CL=CELL[reg];
    const c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');
    const seed=hashS('terr'+W().seed+':'+reg),rnd=mul(seed),nz=makeNoise(hashS('terr'+W().seed));
    const px=x=>(x-X0+250)*k,py=y=>(y+250)*k;
    g.fillStyle=C.paper;g.fillRect(0,0,S,S);
    // trường cao độ, nắn theo loại điểm: sông biển thì trũng, núi thì cao
    const N=lv?176:128,F=new Float32Array(N*N);const wet=RG.types.includes('bien')?0.46:RG.types.includes('song')?0.3:0.22;
    const bumps=R0.nodes.map(n=>({x:(n.x-X0+250)/1500,y:(n.y+250)/1500,v:n.type==='bien'?-0.34:n.type==='song'?-0.2:(n.type==='nui'||n.type==='dong'||n.type==='sao')?0.3:0.16,s:n.type==='bien'?0.11:0.07}));
    // cao độ tính theo tọa độ trên đại lục nên các ô liền mạch; ra khỏi bờ thì là biển, đường bờ uốn theo nhiễu
    const sdLand=(X,Y)=>{let m=1e9;for(let c=0;c<5;c++){const C0=CELL[c];const dx=Math.max(C0.ox+30-X,0,X-(C0.ox+970)),dy=Math.max(C0.oy+30-Y,0,Y-(C0.oy+970));const d=Math.hypot(dx,dy);if(d<m)m=d;}return m;};
    for(let j=0;j<N;j++)for(let i=0;i<N;i++){const u=i/N,v=j/N;const lx=u*1500-250,ly=v*1500-250;const X=CL.ox+(CL.mx?1000-lx:lx),Y=CL.oy+ly;
      let e=nz(X/1500,Y/1500);for(const b of bumps){const d=((u-b.x)**2+(v-b.y)**2)/(b.s*b.s);if(d<4)e+=b.v*Math.exp(-d);}
      const sh=sdLand(X,Y)-(nz(X/620+5.3,Y/620+9.1)-0.42)*300;if(sh>0)e=Math.min(e,wet-0.03-Math.min(0.3,sh/380));
      F[j*N+i]=e;}
    const elev=(x,y)=>{const i=clamp(Math.floor((x-X0+250)/1500*N),0,N-1),j=clamp(Math.floor((y+250)/1500*N),0,N-1);return F[j*N+i];};
    const tc=document.createElement('canvas');tc.width=tc.height=N;const tg=tc.getContext('2d'),img=tg.createImageData(N,N);
    const cw=hexRGB(C.water),c0=hexRGB(C.dark?mixHex(RG.tint[2],C.paper,0.55):RG.tint[0]),c1=hexRGB(C.dark?mixHex(RG.tint[1],C.paper,0.3):RG.tint[1]),c2=hexRGB(C.dark?RG.tint[0]:RG.tint[2]);
    for(let i=0;i<N*N;i++){const e=F[i];let col,a;
      if(e<wet){col=cw;a=clamp((wet-e)*7,0.15,0.62);}
      else if(e<wet+0.04){col=c2;a=0.3;} // bờ nước
      else if(e>0.72){col=c2;a=clamp((e-0.72)*2.4,0,0.5);}
      else if(e>0.56){col=c1;a=clamp((e-0.56)*2.2,0,0.4);}
      else{col=c0;a=0.16+(e-wet)*0.25;}
      img.data[i*4]=col[0];img.data[i*4+1]=col[1];img.data[i*4+2]=col[2];img.data[i*4+3]=Math.round(a*255);}
    tg.putImageData(img,0,0);g.imageSmoothingEnabled=true;g.imageSmoothingQuality='high';g.drawImage(tc,0,0,S,S);
    // sông
    g.lineCap='round';g.lineJoin='round';
    for(const t of R0.terr)if(t.k==='r'){const P0=t.p;const path=()=>{g.beginPath();g.moveTo(px(P0[0][0]),py(P0[0][1]));for(let i=1;i<P0.length;i++){const a=P0[i-1],b=P0[i];g.quadraticCurveTo(px(a[0]),py(a[1]),px((a[0]+b[0])/2),py((a[1]+b[1])/2));}const L=P0[P0.length-1];g.lineTo(px(L[0]),py(L[1]));};
      path();g.strokeStyle=hexA(C.water,0.5);g.lineWidth=16*k;g.stroke();path();g.strokeStyle=hexA(C.water,0.55);g.lineWidth=7*k;g.stroke();
      path();g.strokeStyle=hexA(C.ink,0.18);g.lineWidth=1.2;g.setLineDash([10*k,14*k]);g.stroke();g.setLineDash([]);}
    // núi: nét mực có mảng loang
    const mtn=(x,y,s)=>{const X=px(x),Y=py(y),w=s*k,h=s*k*(0.9+rnd()*0.5);
      const gr=g.createLinearGradient(0,Y-h,0,Y+h*0.3);gr.addColorStop(0,hexA(C.ink,0.5));gr.addColorStop(0.55,hexA(C.ink,0.14));gr.addColorStop(1,hexA(C.ink,0));
      g.beginPath();g.moveTo(X-w,Y+h*0.3);g.quadraticCurveTo(X-w*0.45,Y-h*0.35,X-w*0.08,Y-h);g.quadraticCurveTo(X+w*0.1,Y-h*0.75,X+w*0.3,Y-h*0.45);g.quadraticCurveTo(X+w*0.6,Y-h*0.2,X+w,Y+h*0.3);g.closePath();g.fillStyle=gr;g.fill();
      g.beginPath();g.moveTo(X-w*0.75,Y-h*0.05);g.quadraticCurveTo(X-w*0.4,Y-h*0.45,X-w*0.08,Y-h);g.quadraticCurveTo(X+w*0.1,Y-h*0.75,X+w*0.3,Y-h*0.45);g.strokeStyle=hexA(C.ink,0.55);g.lineWidth=Math.max(1,1.6*k);g.stroke();};
    const ML=[];for(const t of R0.terr)if(t.k==='m')ML.push([t.x,t.y,t.s]);
    for(const n of R0.nodes)if(['nui','dong','sao','ai','tong'].includes(n.type))for(let i=0;i<3;i++)ML.push([n.x+ri2(rnd,-70,70),n.y+ri2(rnd,-75,-20),ri2(rnd,28,60)]);
    const extra=[10,26,44][lv];for(let i=0,t=0;i<extra&&t<800;t++){const x=X0-200+rnd()*1400,y=-200+rnd()*1400;if(elev(x,y)>0.66){ML.push([x,y,ri2(rnd,22,48)]);i++;}}
    ML.sort((a,b)=>a[1]-b[1]);for(const m of ML)mtn(m[0],m[1],m[2]);
    // rừng: cụm cây nhỏ
    const tree=(x,y,s)=>{const X=px(x),Y=py(y),r0=s*k;g.fillStyle=hexA(C.dark?C.jade:mixHex(C.jade,C.ink,0.45),0.5);
      g.beginPath();g.moveTo(X,Y-r0*2.1);g.lineTo(X-r0,Y);g.lineTo(X+r0,Y);g.closePath();g.fill();g.fillStyle=hexA(C.ink,0.4);g.fillRect(X-r0*0.12,Y,r0*0.24,r0*0.6);};
    const TL=[];for(const n of R0.nodes)if(n.type==='rung')for(let i=0;i<[10,22,40][lv];i++){const a=rnd()*6.28,d=30+rnd()*95;TL.push([n.x+Math.cos(a)*d,n.y+Math.sin(a)*d*0.8,5+rnd()*5]);}
    const tn=[70,190,420][lv];for(let i=0,t=0;i<tn&&t<4000;t++){const x=X0-220+rnd()*1440,y=-220+rnd()*1440,e=elev(x,y);if(e>wet+0.08&&e<0.6&&nz(x/300+9,y/300+4)>0.5){TL.push([x,y,4+rnd()*5]);i++;}}
    TL.sort((a,b)=>a[1]-b[1]);for(const t of TL)if(elev(t[0],t[1])>wet+0.03)tree(t[0],t[1],t[2]);
    // nét riêng theo loại điểm
    for(const n of R0.nodes){const X=px(n.x),Y=py(n.y);
      if(n.type==='ma'||n.type==='sao'){const gr=g.createRadialGradient(X,Y,0,X,Y,120*k);gr.addColorStop(0,hexA(C.seal,0.22));gr.addColorStop(1,hexA(C.seal,0));g.fillStyle=gr;g.fillRect(X-120*k,Y-120*k,240*k,240*k);}
      if(n.type==='bien'||n.type==='song'){g.strokeStyle=hexA(C.ink,0.25);g.lineWidth=1;for(let i=0;i<[3,6,9][lv];i++){const x=X+ri2(rnd,-80,80)*k,y=Y+ri2(rnd,-70,70)*k,w=(6+rnd()*8)*k;g.beginPath();g.moveTo(x-w,y);g.quadraticCurveTo(x-w/2,y-w/2,x,y);g.quadraticCurveTo(x+w/2,y-w/2,x+w,y);g.stroke();}}
      if(n.type==='hoang'||n.type==='thien'){g.fillStyle=hexA(C.ink,0.22);for(let i=0;i<[12,30,60][lv];i++){g.beginPath();g.arc(X+ri2(rnd,-90,90)*k,Y+ri2(rnd,-80,80)*k,0.9*k+0.4,0,6.3);g.fill();}}
      if(n.type==='phe'){g.strokeStyle=hexA(C.ink,0.4);g.lineWidth=Math.max(1,1.4*k);for(let i=0;i<4;i++){const x=X+ri2(rnd,-55,55)*k,y=Y+ri2(rnd,-50,40)*k,h=(8+rnd()*12)*k;g.beginPath();g.moveTo(x,y);g.lineTo(x,y-h);g.lineTo(x+4*k,y-h+3*k);g.stroke();}}}
    // hạt giấy
    const sp=[0,1400,3600][lv];for(let i=0;i<sp;i++){g.fillStyle=hexA(C.ink,0.03+rnd()*0.05);g.fillRect(rnd()*S,rnd()*S,1+rnd()*1.5,1);}
    // hai mép mờ dần để vùng này hòa vào vùng bên cạnh
    g.globalCompositeOperation='destination-in';const m=250*k;const fd=g.createLinearGradient(0,0,S,0);fd.addColorStop(0,'rgba(0,0,0,0)');fd.addColorStop(m/S,'rgba(0,0,0,1)');fd.addColorStop(1-m/S,'rgba(0,0,0,1)');fd.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=fd;g.fillRect(0,0,S,S);
    const fv=g.createLinearGradient(0,0,0,S);fv.addColorStop(0,'rgba(0,0,0,0)');fv.addColorStop(m/S*0.8,'rgba(0,0,0,1)');fv.addColorStop(1-m/S*0.8,'rgba(0,0,0,1)');fv.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=fv;g.fillRect(0,0,S,S);g.globalCompositeOperation='source-over';
    return c;}
  function ri2(rnd,a,b){return a+rnd()*(b-a);}
  // ----- sương: lớp phủ bị khoét ở chỗ đã thấy -----
  function buildFog(reg){const r=G.run,lv=gfxLv(),S=[384,512,768][lv],k=S/1500,X0=reg*1000,CL=CELL[reg];
    const c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d');
    g.globalCompositeOperation='source-over';g.fillStyle=C.dark?C.bg2:mixHex(C.paper,C.bg2,0.55);g.fillRect(0,0,S,S);
    g.globalCompositeOperation='destination-out';
    for(const p of r.reveal){const d=mapXY(r.region,p[0],p[1]);const lx=CL.mx?1000-(d[0]-CL.ox):d[0]-CL.ox,ly=d[1]-CL.oy;if(lx<-400||lx>1400||ly<-400||ly>1400)continue;const x=(lx+250)*k,y=(ly+250)*k,rr=p[2]*k;const gr=g.createRadialGradient(x,y,rr*0.55,x,y,rr);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');g.fillStyle=gr;g.beginPath();g.arc(x,y,rr,0,6.3);g.fill();}
    g.globalCompositeOperation='source-over';return c;}
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
    if(cam.reg!==reg||cam.kz!==r.kiep){cam.kz=r.kiep;cam.reg=reg;cam.z=clamp(Math.max(Math.min(W0/340,1.15),zMin()*Math.pow(1.6/zMin(),0.62)),zMin(),1.6);center();pos=null;}
    const lastR=r.reveal[r.reveal.length-1];const base=lv+':'+CFG.theme+':'+w.seed,fbase=base+':'+r.kiep+':'+r.reveal.length+':'+(lastR?lastR.join(','):'');
    // vị trí người chơi được làm mượt giữa các nhịp đồng hồ
    const pw=playerXY(),pp=mapXY(reg,pw[0],pw[1]);if(!pos||Math.hypot(pos[0]-pp[0],pos[1]-pp[1])>120)pos=[pp[0],pp[1]];else{const f=r.moving?1:1-Math.pow(0.002,dt);pos[0]+=(pp[0]-pos[0])*f;pos[1]+=(pp[1]-pos[1])*f;}
    if(cam.follow&&r.moving){cam.x=pos[0];cam.y=pos[1];clampCam();}
    const z=cam.z,X0=reg*1000;
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.dark?C.bg2:mixHex(C.paper,C.bg2,0.55);ctx.fillRect(0,0,W0,H0);
    const sz=1500*z;
    // các ô của đại lục đang lọt vào khung nhìn
    const VR=[];for(let k=0;k<6;k++){const c=CELL[k];if(SX((c.ox+1250)*XS)<0||SX((c.ox-250)*XS)>W0||SY(c.oy+1250)<0||SY(c.oy-250)>H0)continue;VR.push(k);}
    const cdist=k=>Math.hypot((CELL[k].ox+500)*XS-cam.x,CELL[k].oy+500-cam.y);
    const blit=(c,k)=>{const C0=CELL[k];if(C0.mx){ctx.save();ctx.translate(SX((C0.ox+1250)*XS),SY(C0.oy-250));ctx.scale(-1,1);ctx.drawImage(c,0,0,sz*XS,sz);ctx.restore();}else ctx.drawImage(c,SX((C0.ox-250)*XS),SY(C0.oy-250),sz*XS,sz);};
    for(const k of VR){let t=TC[k];if(!t||t.key!==base){const ks=Object.keys(TC).filter(q=>!VR.includes(+q));if(Object.keys(TC).length>=4&&ks.length){ks.sort((a,b)=>cdist(+b)-cdist(+a));delete TC[ks[0]];}t=TC[k]={key:base,c:buildTerr(k)};}
      if(CFG.terrain)blit(t.c,k);}
    // sương: một lớp phủ kín màn hình, khoét lỗ mềm ở những chỗ đã thấy; hình đất chưa tới vẫn hiện mờ bên dưới
    {const fw=Math.max(2,Math.round(W0/2)),fh=Math.max(2,Math.round(H0/2));if(!fogS){fogS=document.createElement('canvas');}
      const fkey=fw+'x'+fh+':'+CFG.theme+':'+r.kiep+':'+r.reveal.length+':'+(lastR?lastR.join(','):'')+':'+cam.x.toFixed(1)+':'+cam.y.toFixed(1)+':'+z.toFixed(4);
      if(fogKey2!==fkey){fogKey2=fkey;if(fogS.width!==fw||fogS.height!==fh){fogS.width=fw;fogS.height=fh;}const g=fogS.getContext('2d');if(!holeSpr){holeSpr=document.createElement('canvas');holeSpr.width=holeSpr.height=128;const hg=holeSpr.getContext('2d');const gr=hg.createRadialGradient(64,64,64*0.5,64,64,64);gr.addColorStop(0,'rgba(0,0,0,1)');gr.addColorStop(1,'rgba(0,0,0,0)');hg.fillStyle=gr;hg.fillRect(0,0,128,128);}
        g.globalCompositeOperation='source-over';g.fillStyle=C.dark?C.bg2:mixHex(C.paper,C.bg2,0.55);g.fillRect(0,0,fw,fh);g.globalCompositeOperation='destination-out';
        for(const p of r.reveal){const d=mapXY(reg,p[0],p[1]);const x=SX(d[0])/2,y=SY(d[1])/2,rr=p[2]*z/2;if(x+rr<0||y+rr<0||x-rr>fw||y-rr>fh)continue;g.drawImage(holeSpr,x-rr,y-rr,rr*2,rr*2);}
        g.globalCompositeOperation='source-over';}
      ctx.globalAlpha=C.dark?0.86:0.76;ctx.drawImage(fogS,0,0,W0,H0);}
    ctx.globalAlpha=1;
    // lưới lục giác, ranh quận, ranh đại khu vực, ô đang rê chuột hoặc đang chọn
    {const hx=hexPaths(),g0=geo();ctx.save();ctx.translate(W0/2-cam.x*z,H0/2-cam.y*z);ctx.scale(z,z);ctx.lineJoin='round';ctx.lineCap='round';
      const hc=CFG.grid?(UI.cell!=null?UI.cell:hov):null;
      if(hc!=null&&g0.reg[hc]>=0&&hx.dp[g0.dist[hc]]){ctx.fillStyle=hexA(C.gold,0.09);ctx.fill(hx.dp[g0.dist[hc]]);}
      if(CFG.grid){if(z>0.2){ctx.strokeStyle=hexA(C.ink,C.dark?0.13:0.075);ctx.lineWidth=0.6/z;ctx.stroke(hx.grid);}
        ctx.strokeStyle=hexA(C.ink,0.24);ctx.lineWidth=0.9/z;ctx.setLineDash([6/z,5/z]);ctx.stroke(hx.dist);ctx.setLineDash([]);
        ctx.strokeStyle=hexA(C.water,0.4);ctx.lineWidth=0.8/z;ctx.stroke(hx.coast);}
      ctx.strokeStyle=hexA(C.paper,0.6);ctx.lineWidth=3/z;ctx.stroke(hx.macro);ctx.strokeStyle=hexA(C.seal,0.45);ctx.lineWidth=1.2/z;ctx.stroke(hx.macro);
      
      // đường định đi tới điểm đang chọn
      const sn=UI.sel!=null&&!r.moving&&nodeById(UI.sel);
      if(sn&&sn.id!==r.at&&Math.floor(sn.id/100)===reg&&sn.fog>=1){const hp=hexPath(nodeHex(nodeById(r.at)),hexAt(...mapNode(sn)));ctx.beginPath();hp.cells.forEach((c,i)=>{const p=hexCenter(c);if(i)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});ctx.strokeStyle=hexA(C.acc,0.6);ctx.lineWidth=2.5/z;ctx.setLineDash([2/z,7/z]);ctx.stroke();ctx.setLineDash([]);}
      if(r.moving){const m=r.moving;ctx.beginPath();ctx.moveTo(pos[0],pos[1]);
        for(let i=m.seg;i<m.path.length-1;i++){const hp=hexPath(nodeHex(nodeById(m.path[i])),nodeHex(nodeById(m.path[i+1])));const t=i===m.seg?m.prog*(hp.cum[hp.cum.length-1]||1):-1;hp.cells.forEach((c,j)=>{if(hp.cum[j]<=t)return;const p=hexCenter(c);ctx.lineTo(p[0],p[1]);});}
        ctx.strokeStyle=hexA(C.seal,0.85);ctx.lineWidth=2.5/z;ctx.setLineDash([6/z,5/z]);ctx.stroke();ctx.setLineDash([]);}
      ctx.restore();}
    // mức thu phóng 0..1 (0: thu nhỏ hết cỡ, 1: phóng to hết cỡ), theo thang log cho khớp lăn chuột
    //  0–20%: tên đại khu vực ở giữa khu vực, mờ dần khi phóng to · 12–50%: tên quận ở giữa quận · từ 50%: mọi icon (chỉ nhân vật chính thì lúc nào cũng hiện)
    const zf=clamp(Math.log(z/zMin())/Math.log(1.6/zMin()),0,1);const showIc=zf>=0.5;
    {const gc=geo();if(!gc.cent){const rs={},ds={};for(let i=0;i<gc.reg.length;i++){const k=gc.reg[i];if(k<0)continue;const p=hexCenter(i);const a=rs[k]||(rs[k]=[0,0,0]);a[0]+=p[0];a[1]+=p[1];a[2]++;const d=gc.dist[i];const b=ds[d]||(ds[d]=[0,0,0]);b[0]+=p[0];b[1]+=p[1];b[2]++;}gc.cent={rs,ds};}
     ctx.textAlign='center';ctx.textBaseline='middle';
     const ra=clamp(1-zf/0.2,0,1);if(ra>0){ctx.font=`600 ${Math.round(clamp(z*70,15,26))}px ${FONT}`;for(const [k,a] of Object.entries(gc.cent.rs)){const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);ctx.fillStyle=hexA(C.paper,0.7*ra);ctx.fillText(REG[k].n.toUpperCase().split('').join(' '),x+1,y+1);ctx.fillStyle=hexA(C.ink,0.75*ra);ctx.fillText(REG[k].n.toUpperCase().split('').join(' '),x,y);}}
     const da=Math.min(clamp((zf-0.12)/0.08,0,1),clamp((0.5-zf)/0.08,0,1));if(da>0){ctx.font=`italic 500 ${Math.round(clamp(z*40,11,16))}px ${FONT}`;for(const [d,a] of Object.entries(gc.cent.ds)){const nm=gc.dnames[d];if(!nm)continue;const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);if(x<-80||y<-30||x>W0+80||y>H0+30)continue;ctx.fillStyle=hexA(C.paper,0.7*da);ctx.fillText(nm,x+1,y+1);ctx.fillStyle=hexA(C.ink2,0.9*da);ctx.fillText(nm,x,y);}}}
    if(false&&CFG.ring){ctx.beginPath();ctx.arc(SX(pos[0]),SY(pos[1]),senseR()*z,0,6.3);ctx.strokeStyle=hexA(C.acc,0.28);ctx.lineWidth=1;ctx.setLineDash([3,5]);ctx.stroke();ctx.setLineDash([]);}
    // điểm
    const s0=clamp(21*Math.sqrt(z/0.8),7,24)*(CFG.font==='xl'?1.15:1);const small=z<0.5;const notes=w.notes||{};
    const HT=CFG.hideT||{},HE=CFG.hideE||{},DC=[C.jade,C.gold,C.seal,C.vio];const QN=new Set((r.quests||[]).filter(q=>q.state==='open').map(q=>q.node));
    // một ô lục giác có cả địa điểm lẫn người (ngươi, hoặc thực thể đang dừng chân): địa điểm lùi sang trái, người sang phải, cả hai nhỏ lại cho khỏi đè nhau
    const HW=HEXW/2*z;const OCC=new Set();if(!r.moving&&!HT._me)OCC.add(r.at);
    if(CFG.ents){const sr0=senseR();for(const e of entsHere(reg)){if(HE[e.type]||e.to!=null)continue;const p=entXY(e);if(Math.hypot(p[0]-pw[0],p[1]-pw[1])<=sr0)OCC.add(e.at);}}
    for(const k of VR)if(k<5&&showIc)for(const n of regionOf(k).nodes){if(n.fog<1)continue;if(HT[n.type])continue;const [nx,ny]=mapNode(n);let x=SX(nx),y=SY(ny);if(x<-60||y<-60||x>W0+60||y>H0+60)continue;const under=OCC.has(n.id);const sN=under?Math.min(s0,HW*0.7):s0;
      const sure=n.fog>=2||n.memory;const old=n.fog>=2&&n.seenT>=0&&w.t-n.seenT>HY;const ruin=(n.vstate||'ok')==='ruin'&&n.fog>=2;const sel=UI.sel===n.id;
      const col=C[NODE_CAT[n.type]||'ink'];
      if(sel){ctx.beginPath();ctx.arc(x,y,s0*0.95,0,6.3);ctx.fillStyle=hexA(C.acc,0.16);ctx.fill();ctx.strokeStyle=C.acc;ctx.lineWidth=1.5;ctx.stroke();}
      badge(x,y,sN,ruin?C.ink3:(sure&&k===reg?DC[dangerTag(n)]:col),sure?(ruin?'ruin':n.type):'?',{hollow:!sure,dash:!sure,sel});if(under){if(CFG.names)label(n.name,SX(nx),SY(ny)+s0/2+5,{c:C.ink,s:CFG.font==='m'?12:14});continue;}
      if(n.dp&&n.fog>=3){ctx.beginPath();ctx.arc(x+s0/2-1,y-s0/2+1,4,0,6.3);ctx.fillStyle=C.jade;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(n.grave&&n.fog>=1){ctx.fillStyle=C.ink2;ctx.fillRect(x-s0/2-2,y-s0/2-2,5,7);}
      if(QN.has(n.id)){const qx=x+s0/2,qy=y+s0/2;ctx.beginPath();ctx.arc(qx,qy,6.5,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#fffaf0';ctx.font='700 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('!',qx,qy+0.5);}
      if(CFG.notes&&notes[n.id]){ctx.beginPath();ctx.arc(x-s0/2+1,y+s0/2-1,4.5,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(CFG.names&&(!small||sel||n.id===r.at||n.type==='thanh'||n.type==='ai')&&(z>=0.3||sel||n.id===r.at)){label(n.name+(sure?'':'?'),x,y+s0/2+3,{c:sure?C.ink:C.ink3,s:CFG.font==='m'?12:14});if(old)label('tin cũ',x,y+s0/2+18,{c:C.ink3,s:10});}}
    // thực thể qua lại
    if(CFG.ents&&showIc){const sr=senseR();for(const e of entsHere(reg)){if(HE[e.type])continue;const p=entXY(e);const see=Math.hypot(p[0]-pw[0],p[1]-pw[1])<=sr;
      if(!see&&!e.heard)continue;const q=mapXY(reg,see?p[0]:e.heard.x,see?p[1]:e.heard.y);const parked=see&&e.to==null;const x=SX(q[0])+(parked?HW*0.64:0),y=SY(q[1]);const er=parked?Math.min(10,HW*0.28):10;if(x<-30||y<-30||x>W0+30||y>H0+30)continue;
      const bad=e.type==='thutrieu'||e.type==='truysat';ctx.globalAlpha=see?1:0.55;const ec=entCol(e.type,C);const gk=ENT_GLYPH[e.type];
      if(e.type==='thuong'){ // xe ngựa, trên đầu là ảnh nhỏ người dẫn đầu
        const wi=wagonImg();if(wi&&wi.complete&&wi.naturalWidth){ctx.drawImage(wi,x-15,y-9,30,17.5);}else{ctx.save();ctx.translate(x-11,y-9);ctx.scale(22/24,22/24);ctx.lineWidth=2;ctx.strokeStyle=ec;ctx.stroke(icPath('cart'));ctx.restore();}
        ctx.beginPath();ctx.arc(x+6,y-12,4.5,0,6.3);ctx.fillStyle=C.paper;ctx.fill();ctx.lineWidth=1.5;ctx.strokeStyle=ec;ctx.stroke();ctx.font=`500 6px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.ink;ctx.fillText(avLetter(e.lead||e.name),x+6,y-11.6);}
      else{ctx.beginPath();ctx.arc(x,y,er,0,6.3);ctx.fillStyle=C.paper;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=ec;if(!see)ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
        if(gk){const gs=er*1.3;ctx.save();ctx.translate(x-gs/2,y-gs/2);ctx.scale(gs/24,gs/24);ctx.lineWidth=2.2;ctx.strokeStyle=ec;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(icPath(gk));ctx.restore();}
        else{ctx.font=`500 10px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.ink;ctx.fillText(avLetter(ENT_T[e.type].n),x,y+1);}}
      ctx.globalAlpha=1;
      }}
    // người chơi: con dấu son
    if(!HT._me){// đứng ở địa điểm: địa điểm giữ ở tâm ô, nhân vật nằm ngay phía trên, cách một khe nhỏ
      const nd=!r.moving&&showIc&&!HT[(nodeById(r.at)||{}).type]?nodeById(r.at):null;const nS=Math.min(s0,HW*0.7);const rr=nd?Math.min(s0*0.5,HW*0.36):s0*0.62;const x=SX(pos[0]),y=SY(pos[1])-(nd?nS/2+3+rr+2.5:0);
      ctx.beginPath();ctx.arc(x,y,rr+2.5,0,6.3);ctx.fillStyle=C.seal;ctx.fill();ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.fillStyle=C.paper;ctx.fill();
      const hi=heroImg();if(hi&&hi.complete&&hi.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.clip();ctx.drawImage(hi,x-rr,y-rr,rr*2,rr*2);ctx.restore();}
      else{ctx.fillStyle=C.ink;ctx.font=`500 ${Math.round(rr*1.05)}px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(avLetter(r.ten),x,y+1);}
}
    // mây trôi, hạt theo mùa, sắc trời theo buổi
    if(lv>0&&CFG.clouds){if(!cloudSpr)cloudSpr=cloudSprite();if(!clouds.length)for(let i=0;i<[0,9,16][lv];i++)clouds.push({x:Math.random()*(WORLD_W+500)-250,y:Math.random()*2500-250,s:160+Math.random()*220,v:6+Math.random()*10});
      ctx.globalAlpha=C.dark?0.06:0.5;for(const c of clouds){c.x+=c.v*dt;if(c.x>WORLD_W+300)c.x=-500;const x=SX(c.x),y=SY(c.y),s=c.s*z*2;if(x+s<0||x>W0||y+s<0||y>H0)continue;ctx.drawImage(cloudSpr,x,y,s,s*0.6);}ctx.globalAlpha=1;}
    if(CFG.daynight&&!(r.moving&&!r.halt)){const p=partOf(w.t);const t=p==='dem'?['#0f1c3a',C.dark?0.2:0.16]:p==='toi'?['#7a3a4a',0.1]:p==='sang'?['#f2c078',0.07]:['#fff3c4',0.035];if(t){ctx.fillStyle=hexA(t[0],t[1]);ctx.fillRect(0,0,W0,H0);}}
    if(lv>0&&CFG.fx){if(!(r.moving&&!r.halt)||!pse)pse=[seasonOf(w.t),partOf(w.t)==='dem'];const se=pse[0],night=pse[1];const want=se==='ha'&&!night?0:[0,16,38][lv];
      while(parts.length<want)parts.push({x:Math.random()*W0,y:Math.random()*H0,v:10+Math.random()*24,a:Math.random()*6.3,s:1.5+Math.random()*2.5});
      if(parts.length>want)parts.length=want;
      const col=se==='xuan'?'#e8a0b0':se==='thu'?'#c98a3c':se==='dong'?(C.dark?'#e8eef4':'#9fb1c2'):'#f0d060';
      const cdx=(cam.x-(pcam?pcam[0]:cam.x))*z,cdy=(cam.y-(pcam?pcam[1]:cam.y))*z;pcam=[cam.x,cam.y];
      ctx.fillStyle=col;for(const q of parts){q.x-=cdx;q.y-=cdy;if(q.x<-5)q.x+=W0+10;if(q.y<-5)q.y+=H0+10;q.a+=dt*1.6;if(se==='ha'){q.x+=Math.cos(q.a)*8*dt;q.y+=Math.sin(q.a*0.7)*8*dt;ctx.globalAlpha=0.45+0.4*Math.sin(q.a*2);}
        else{q.y+=q.v*dt*(se==='dong'?1.2:0.8);q.x+=Math.sin(q.a)*14*dt+6*dt;ctx.globalAlpha=0.75;}
        if(q.y>H0+5){q.y=-5;q.x=Math.random()*W0;}if(q.x>W0+5)q.x=-5;
        ctx.beginPath();if(se==='dong'||se==='ha')ctx.arc(q.x,q.y,q.s*0.7,0,6.3);else ctx.ellipse(q.x,q.y,q.s*1.3,q.s*0.6,q.a,0,6.3);ctx.fill();}ctx.globalAlpha=1;}
    if(CFG.showFps){ctx.font='11px monospace';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillStyle=C.ink2;ctx.fillText(fpsShow+' khung/giây · mức '+['tiết kiệm','cân bằng','đẹp'][lv],8,H0-6);}
  }
  function animating(){const r=G.run;if(!r)return false;const lv=gfxLv();return (!!r.moving&&!r.halt)||(lv>0&&(CFG.fx||CFG.clouds))||(pos&&(()=>{const w0=playerXY(),q=mapXY(r.region,w0[0],w0[1]);return Math.hypot(pos[0]-q[0],pos[1]-q[1])>0.5;})());}
  // gọi mỗi nhịp rAF; tự bỏ khung để giữ đúng trần khung hình
  function frame(now){
    if(!cv||!G.run||document.hidden||!cv.isConnected)return;
    const gap=1000/(CFG.fps||30);const an=animating()&&!UI.panel&&!(G.run.scene&&G.run.scene.type==='combat');
    if(!dirty&&!an)return;if(!dirty&&now-lastT<gap-2)return;
    const dt=Math.min(0.1,(now-lastT)/1000)||0.016;lastT=now;dirty=false;
    const t0=performance.now();try{draw(now,dt);}catch(e){console.error(e);}const c=performance.now()-t0;
    ema=ema?ema*0.9+c*0.1:c;fpsN++;if(now-fpsT>1000){fpsShow=fpsN;fpsN=0;fpsT=now;}
    // tự hạ mức đồ họa khi máy đuối
    if(CFG.gfx==='auto'&&an){if(ema>16)slow++;else slow=Math.max(0,slow-1);if(slow>90&&GFX_AUTO>0){GFX_AUTO--;slow=0;ema=0;clouds.length=0;parts.length=0;cfgApply();if(typeof note==='function'){note('Máy hơi nóng: đã tự hạ mức đồ họa.');toastFlush();}}}
  }
  // ----- thao tác -----
  function hit(sx,sy){const r=G.run;let best=null,bd=14;const HT=CFG.hideT||{};for(let k=0;k<5;k++)for(const n of regionOf(k).nodes){if(n.fog<1||HT[n.type])continue;const [nx,ny]=mapNode(n);const d=Math.hypot(SX(nx)-sx,SY(ny)-sy);if(d<bd){bd=d;best=n;}}return best;}
  function bind(){
    cv.addEventListener('pointerdown',e=>{cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[e.offsetX,e.offsetY]);
      if(ptr.size===1)drag={x:e.offsetX,y:e.offsetY,cx:cam.x,cy:cam.y,moved:false};
      else if(ptr.size===2){const [a,b]=[...ptr.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:cam.z};drag=null;}});
    cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;ptr.set(e.pointerId,[e.offsetX,e.offsetY]);
      if(pinch&&ptr.size===2){const [a,b]=[...ptr.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);cam.z=clamp(pinch.z*d/Math.max(20,pinch.d),zMin(),2.4);cam.follow=false;clampCam();dirty=true;return;}
      if(drag){const dx=e.offsetX-drag.x,dy=e.offsetY-drag.y;if(Math.abs(dx)+Math.abs(dy)>7)drag.moved=true;if(drag.moved){cam.x=drag.cx-dx/cam.z;cam.y=drag.cy-dy/cam.z;cam.follow=false;clampCam();dirty=true;}}});
    const up=e=>{const d=drag;ptr.delete(e.pointerId);if(ptr.size<2)pinch=null;if(e.type==='pointerup'&&d&&!d.moved&&ptr.size===0&&pos&&Math.abs(SX(pos[0])-e.offsetX)<20&&e.offsetY>SY(pos[1])-44&&e.offsetY<SY(pos[1])+4&&G.run&&!G.run.scene){UI.panel='char';UI.tab.char='base';after();}else if(e.type==='pointerup'&&d&&!d.moved&&ptr.size===0){const c=cellAt(e.offsetX,e.offsetY);let n=hexNode(c);if(n&&(CFG.hideT||{})[n.type])n=null;if(!n)n=hit(e.offsetX,e.offsetY);mapTap(n,c);}if(ptr.size===0)drag=null;};
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    cv.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||drag||!G.run||G.run.scene)return;const c=cellAt(e.offsetX,e.offsetY);if(c!==hov){hov=c;dirty=true;}hexTip(c,e.clientX,e.clientY);});
    cv.addEventListener('pointerleave',()=>{if(hov!=null){hov=null;dirty=true;}hideTip();});
    cv.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.15:1/1.15,e.offsetX,e.offsetY);},{passive:false});
  }
  return {attach,resize,invalidate,frame,center,focus,zoom,cam,setFont:f=>{FONT=f;},get lv(){return gfxLv();}};
})();

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
