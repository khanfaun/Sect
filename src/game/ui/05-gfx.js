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
  tutran:'M3 20V12l5-4 5 4v8M13 20v-5l4-3 4 3v5M2 20h20M8 5v3M8 3l1.5 1.5L8 6 6.5 4.5z',
  tuthanh:'M4 20V9h3v3h3V7h4v5h3V9h3v11M2 20h20M10 20v-4h4v4M12 2l1.2 2.6L16 5l-2 2 .5 2.8L12 8.4 9.5 9.8 10 7 8 5l2.8-.4z',
  bicanh:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7a5 5 0 105 5M12 11a1.5 1.5 0 101.5 1.5',
  dongthien:'M3 20c0-9 4-15 9-15s9 6 9 15zM12 8l1 2.5 2.5 1-2.5 1L12 15l-1-2.5-2.5-1 2.5-1z',
  como:'M7 20V9a5 5 0 0110 0v11zM12 10v6M9.5 12.5h5M3 20h18',
  yeusao:'M3 20c0-6 4-10 9-10s9 4 9 10zM8 14l1-3 1 3M14 14l1-3 1 3M10 18h4',
  ditich:'M4 20V8M4 8h5M9 8v12M14 20V12h6v8M12 20h10M3 20h5',
  ruin:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
  me:'M12 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 13c0-3 2-5 5-5s5 2 5 5M3 20c3-4 6-5 9-5s6 1 9 5',
};
const P2D={};function p2d(k){return P2D[k]||(P2D[k]=new Path2D(GLYPH[k]||GLYPH.tran));}
const NODE_CAT={tran:'gold',thanh:'gold',tong:'acc',rung:'jade',nui:'jade',song:'jade',bien:'jade',hoang:'jade',thien:'acc',phe:'vio',dong:'vio',ma:'seal',sao:'seal',ai:'ink',linhdia:'acc',khoang:'vio',duoc:'jade',cho:'gold',ancu:'acc',dam:'jade',tutran:'acc',tuthanh:'acc',bicanh:'vio',dongthien:'vio',como:'seal',yeusao:'seal',ditich:'vio'};

const HERO_IMG={};function heroImg(){const u=ASSET.hero.me;if(!u||typeof Image==='undefined')return null;if(!HERO_IMG[u]){const im=new Image();im.onload=()=>Map2.invalidate();im.src=u;HERO_IMG[u]=im;}return HERO_IMG[u];}
const ENT_GLYPH={thutrieu:'paw',di:'star',tuantra:'shield',thienkieu:'medal',truysat:'sword',khach:'walk'};const ICPATH={};function icPath(k){return ICPATH[k]||(ICPATH[k]=new Path2D(ICP[k]));}
function entCol(t,C){return ['thutrieu','truysat'].includes(t)?C.seal:t==='di'?C.vio:t==='thuong'?C.gold:C.acc;}
function avLetter(name){const w=String(name||'?').trim().split(/\s+/);return (w[w.length-1]||'?')[0].toUpperCase();}
function mapNode(n){const k=idReg(n.id);return mapXY(k,n.x,n.y);}
const Map2=(()=>{
  // lưới ô và các đường ranh: dựng một lần thành nét vẽ sẵn, mỗi khung chỉ tô lại
  let HX=null,hov=null,pcam=null,pse=null;
  function hexPaths(){const g=geo();if(HX&&HX.seed===g.seed)return HX;
    const grid=new Path2D(),macro=new Path2D(),dist=new Path2D(),coast=new Path2D(),dp={},rp=[0,1,2,3,4].map(()=>new Path2D());
    for(let i=0;i<HN;i++){const v=hexVerts(i),a=g.reg[i],c=i%HCOLS,r=(i-c)/HCOLS;
      if(a>=0){grid.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)grid.lineTo(v[k][0],v[k][1]);grid.closePath();
        const d=g.dist[i],P=dp[d]||(dp[d]=new Path2D());P.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)P.lineTo(v[k][0],v[k][1]);P.closePath();
        if(a<5){const R=rp[a];R.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)R.lineTo(v[k][0],v[k][1]);R.closePath();}}
      // ba cạnh đông, đông nam, tây nam: mỗi cạnh chung chỉ xét một lần
      const nb=[[c+1,r,1,2],[r%2?c+1:c,r+1,2,3],[r%2?c:c-1,r+1,3,4]];
      for(const [x,y,p,q] of nb){const j=x>=0&&x<HCOLS&&y>=0&&y<HROWS?y*HCOLS+x:-1;const b=j<0?-1:g.reg[j];let T=null;
        if(a!==b)T=a>=0&&b>=0?macro:coast;else if(a>=0&&g.dist[i]!==g.dist[j])T=dist;
        if(T){T.moveTo(v[p][0],v[p][1]);T.lineTo(v[q][0],v[q][1]);}}}
    return HX={seed:g.seed,grid,macro,dist,coast,dp,rp};}
  function aimAt(sx,sy,first){const c=cellAt(sx,sy);let n=hexNode(c);if(n&&(CFG.hideT||{})[n.type])n=null;if(!n)n=hit(sx,sy);mapHold(n,c,worldAt(sx,sy),first);dirty=true;}
  function cellAt(sx,sy){return hexAt((sx-W0/2)/cam.z+cam.x,(sy-VCY)/cam.z+cam.y);}
  function hexPoly(i){const v=hexVerts(i);ctx.beginPath();ctx.moveTo(v[0][0],v[0][1]);for(let k=1;k<6;k++)ctx.lineTo(v[k][0],v[k][1]);ctx.closePath();}
  const MOBILE=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  let cv=null,ctx=null,W0=0,H0=0,dpr=1,uz=1; // uz: hệ số phóng giao diện máy tính (--dz trong CSS)
  const cam={x:500,y:500,z:0.8,follow:true,reg:-1};
  const ZMAX=1.5,DT_Z=99,DTC={};let dtWant='',dtTimer=0; // mảnh địa hình chi tiết khi phóng to sâu
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
  function resize(){if(!cv)return;const r=cv.getBoundingClientRect();if(!r.width)return;const lv=gfxLv();uz=parseFloat(getComputedStyle(document.documentElement).getPropertyValue('--dz'))||1;H0=r.height/uz;insets();
    dpr=Math.min(window.devicePixelRatio||1,CFG.dpr||(MOBILE?[1,1.25,1.5]:[1,1.5,2])[lv])*uz;W0=r.width/uz;H0=r.height/uz;
    const w=Math.round(W0*dpr),h=Math.round(H0*dpr);if(cv.width!==w||cv.height!==h){cv.width=w;cv.height=h;}GW=document.documentElement.dataset.pc?1.7:1;dirty=true;if(cam&&cam.z)clampCam();}
  function resetAll(){INK=null;LCV=null;BGK='';for(const k in DTC)delete DTC[k];dtWant='';clouds.length=0;parts.length=0;terr=null;terrKey='';fogC=null;fogKey='';fogS=null;fogKey2='';cloudSpr=null;invalidate(true);resize();}
  let TOPI=0,BOTI=0,VCY=0,wide=false,GW=1;
  const AREA_COL=['#d9a441','#58a46f','#4797bb','#9a74c9','#8196b3'];
  // phần bản đồ thật sự nhìn thấy: dưới header (#hud), trên footer (#nav). Thu nhỏ hết cỡ thì cạnh trên bản đồ chạm header, cạnh dưới chạm footer.
  function insets(){if(!cv)return false;if(document.documentElement.dataset.pc){const ch=TOPI!==0||BOTI!==0;TOPI=0;BOTI=0;VCY=H0/2;return ch;}const cr=cv.getBoundingClientRect();let t=TOPI,b=BOTI;const vis=e=>e&&!e.hidden&&getComputedStyle(e).display!=='none';
    const h=document.getElementById('hud'),n=document.getElementById('nav');if(vis(h)&&h.getBoundingClientRect().width>cr.width*0.8){t=Math.max(0,Math.round((h.getBoundingClientRect().bottom-cr.top)/uz));}
    if(vis(n)&&n.getBoundingClientRect().top>cr.top+cr.height/2){b=Math.max(0,Math.round((cr.bottom-n.getBoundingClientRect().top)/uz));}
    if(vis(h)&&h.getBoundingClientRect().width<=cr.width*0.8)t=0;if(vis(n)&&n.getBoundingClientRect().top<=cr.top+cr.height/2)b=0;const ch=t!==TOPI||b!==BOTI;TOPI=t;BOTI=b;VCY=t+(H0-t-b)/2;return ch;}
  function viewH(){return Math.max(60,H0-TOPI-BOTI);}
  function zFit(){return Math.min(viewH()/WORLD_H,W0/WORLD_W);}
  function zMin(){return Math.max(viewH()/WORLD_H,W0/WORLD_W);} // phủ kín khung nhìn, không lòi mép
  function zDeep(){return Math.min(zFit(),zMin()*0.6);}
  let bT=0,bN=0;function bump(){const n=performance.now();if(n-bT>1500)bN=0;if(n-bT>150||bN===0)bN++;bT=n;if(bN>=2&&!wide){wide=true;}}
  function zFloor(){return wide?zDeep():zMin();} // lăn chuột chỉ tới zMin; sau khi bấm nút thu nhỏ thì tạm xuống tới mức bản đồ rộng bằng màn hình
  function zfNow(){return clamp(Math.log(cam.z/zMin())/Math.log(ZMAX/zMin()),0,1);}
  function worldAt(sx,sy){return [(sx-W0/2)/cam.z+cam.x,(sy-VCY)/cam.z+cam.y];}
  function clampCam(){if(wide&&cam.z>=zMin()*0.9999)wide=false;cam.z=clamp(cam.z,zFloor(),ZMAX);const hw=W0/2/cam.z,hh=viewH()/2/cam.z;const ov=zfNow();const px=0,py=0;
    const rx=2*hw>=WORLD_W?[WORLD_W/2,WORLD_W/2]:[hw,WORLD_W-hw],ry=2*hh>=WORLD_H-0.5?[WORLD_H/2,WORLD_H/2]:[hh,WORLD_H-hh];
    cam.x=clamp(cam.x,rx[0]-px,rx[1]+px);cam.y=clamp(cam.y,ry[0]-py,ry[1]+py);} // cho kéo quá mép để điểm sát rìa vẫn kéo ra giữa được
  function center(){const r=G.run;if(!r)return;const w0=playerXY(),p=mapXY(r.region,w0[0],w0[1]);cam.x=p[0];cam.y=p[1];cam.follow=true;cam.reg=r.region;clampCam();dirty=true;}
  function zAt(f){const m=zMin();return clamp(m*Math.pow(ZMAX/m,f),zFloor(),ZMAX);}
  function zoomOutAll(){wide=true;cam.z=zFloor();cam.follow=false;cam.x=WORLD_W/2;cam.y=WORLD_H/2;clampCam();dirty=true;}
  function locate(){cam.z=zAt(0.53);center();dirty=true;}
  function focus(x,y){const p=mapXY(clamp(Math.floor(x/1000),0,4),x,y);cam.x=p[0];cam.y=p[1];cam.follow=false;clampCam();dirty=true;}
  function zoom(f,sx,sy){const z0=cam.z;if(f<1&&cam.z<=zMin()*1.001&&!wide)bump();cam.z=clamp(cam.z*f,zFloor(),ZMAX);if(sx!=null){const wx=(sx-W0/2)/z0+cam.x,wy=(sy-VCY)/z0+cam.y;cam.x=wx-(sx-W0/2)/cam.z;cam.y=wy-(sy-VCY)/cam.z;cam.follow=false;}clampCam();dirty=true;}
  const SX=x=>(x-cam.x)*cam.z+W0/2,SY=y=>(y-cam.y)*cam.z+VCY;

  // ----- địa hình: vẽ một lần cho mỗi vùng -----
  // o (tuỳ chọn): vẽ chi tiết một mảnh {S: cỡ ảo của cả vùng, ox,oy,w,h: mảnh cần vẽ (điểm ảnh thật)} để phóng to tối đa vẫn nét
  function buildTerr(reg,o){
    const lv=o?2:gfxLv(),S=o?o.S:[768,1152,1536][lv],k=S/1500,X0=reg*1000,R0=reg<5?regionOf(reg):{nodes:[],terr:[],edges:[]},RG=REG[reg<5?reg:2],CL=CELL[reg];
    const c=document.createElement('canvas');if(o){c.width=o.w;c.height=o.h;}else c.width=c.height=S;const g=c.getContext('2d');if(o)g.setTransform(XS,0,0,1,-o.ox,-o.oy);
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
  // ----- ảnh bản đồ: mức Tiết kiệm dùng ảnh nén (src/assets), mức khác dùng ảnh gốc (src/assets-goc) -----
  const MIMG={};
  function mapImg(key){const q=gfxLv()===0?'assets':'assets-goc';const f={hid:'Hidden-map.webp',bk:'Hidden-map - Backup.webp',tr:'Transition-map.webp'}[key];const id=q+'/'+key;
    let o=MIMG[id];if(!o){const im=new Image();o=MIMG[id]={im,ok:false,i:0};const B=['src/'+q+'/ban-do/',q+'/ban-do/'];const go=()=>{im.src=B[o.i]+encodeURIComponent(f);};
      im.onload=()=>{o.ok=true;invalidate();};im.onerror=()=>{o.i++;if(o.i<B.length)go();};go();}
    return o.ok?o.im:null;}
  let LCV=null;function layerCv(){const w=Math.max(1,Math.round(W0*dpr)),h=Math.max(1,Math.round(H0*dpr));if(!LCV)LCV=document.createElement('canvas');if(LCV.width!==w||LCV.height!==h){LCV.width=w;LCV.height=h;}return LCV;}
  // ----- mặt nạ "đã thấy": mỗi ô đã thấy là một vệt mực; ô mới thấy loang dần ra -----
  let INK=null;const INK_MS=1700,INK_ST=8;
  // Mực loang: mỗi ô có 4 hình × 8 bậc loang, mép là nhiễu nhiều tầng + sợi giấy toả ra, có dải viền mực đậm hơn ở mép đang lan
  function inkBlots(){const out=[];const S=96;
    for(let v=0;v<4;v++){const nz=makeNoise(hashS('inkn'+v)),stages=[];
      for(let st=0;st<INK_ST;st++){const p=(st+1)/INK_ST,R=0.2+0.72*(1-Math.pow(1-p,2));
        const c=document.createElement('canvas');c.width=c.height=S;const g=c.getContext('2d'),im=g.createImageData(S,S);
        const rc=document.createElement('canvas');rc.width=rc.height=S;const rg=rc.getContext('2d'),rim=rg.createImageData(S,S);
        for(let y=0;y<S;y++)for(let x=0;x<S;x++){const dx=(x+.5)/S*2-1,dy=(y+.5)/S*2-1,d=Math.hypot(dx,dy),an=Math.atan2(dy,dx);
          const u=(x+.5)/S*3.9,w=(y+.5)/S*3.9;
          const n1=nz(u+v*0.7,w),n2=nz(u*2.6+1.3,w*2.6+0.7),n3=nz(u*6.5+2.1,w*6.5+4.4);
          const fib=nz(Math.cos(an)*1.9+2,Math.sin(an)*1.9+v+1); // sợi toả theo hướng bán kính
          const warp=(n1-.5)*.5+(n2-.5)*.3+(n3-.5)*.18+(fib-.5)*.6*(0.3+0.7*p);
          const f=d-R*(1+warp);const soft=0.04+0.05*(1-p);
          let a=clamp(0.5-f/soft,0,1);if(f>-0.1)a*=0.78+0.22*n3; // mép ngấm không đều
          const i4=(y*S+x)*4;im.data[i4+3]=Math.round(a*255);
          const e=Math.exp(-Math.pow((f+0.012)/0.04,2))*(n2>0.4?1:0.35);rim.data[i4]=74;rim.data[i4+1]=44;rim.data[i4+2]=20;rim.data[i4+3]=Math.round(clamp(e*a*0.9,0,1)*150);}
        g.putImageData(im,0,0);rg.putImageData(rim,0,0);stages.push({c,rim:rc});}
      out.push(stages);}
    return out;}
  function inkMask(now){if(!VIS)return null;const lv=gfxLv(),SC=[5,3,2][lv];const key=lv+':'+((G.run.rid||'')+G.run.kiep);
    if(!INK||INK.key!==key){const w=Math.ceil(WORLD_W/SC),h=Math.ceil(WORLD_H/SC);const mk=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;return c;};
      INK={key,SC,w,h,inner:mk(),outer:mk(),ci:mk(),co:mk(),ri:mk(),done:new Uint8Array(HN),blots:(INK&&INK.blots)||inkBlots(),n:-1,any:false};}
    const I=INK,t=performance.now(),gi=I.inner.getContext('2d'),go=I.outer.getContext('2d');const anim=[];
    const spr=(i,st)=>I.blots[i&3][st];
    const put=(g,i,st,a,k,rim)=>{const p=hexCenter(i),R0=HEXW*k/I.SC;g.globalAlpha=a;g.drawImage(rim?spr(i,st).rim:spr(i,st).c,p[0]/I.SC-R0,p[1]/I.SC-R0,R0*2,R0*2);};
    if(I.n!==VIS_N||I.anim){I.n=VIS_N;I.anim=false;
      for(let i=0;i<HN;i++){if(!VIS[i]||I.done[i])continue;const age=t-(VT[i]||0);if(age>=INK_MS||!VT[i]){I.done[i]=1;I.any=true;put(gi,i,INK_ST-1,1,1.3,0);put(go,i,INK_ST-1,1,2.4,0);}else anim.push([i,age/INK_MS]);}
      gi.globalAlpha=1;go.globalAlpha=1;}
    if(!I.any&&!anim.length)return null;
    if(!anim.length)return {inner:I.inner,outer:I.outer};
    // các ô đang loang: vẽ lên bản sao, mép lan dần, chuyển mượt giữa hai bậc liền kề
    I.anim=true;soft=true;const ci=I.ci.getContext('2d'),co=I.co.getContext('2d'),cr=I.ri.getContext('2d');ci.clearRect(0,0,I.w,I.h);co.clearRect(0,0,I.w,I.h);cr.clearRect(0,0,I.w,I.h);ci.drawImage(I.inner,0,0);co.drawImage(I.outer,0,0);
    for(const [i,f] of anim){const e=1-Math.pow(1-f,2.2),q=e*(INK_ST-1),s0=Math.floor(q),fr=q-s0,s1=Math.min(INK_ST-1,s0+1),al=Math.min(1,f*5);
      for(const [g,k] of [[ci,1.3],[co,2.4]]){put(g,i,s0,al,k,0);if(s1!==s0)put(g,i,s1,fr*al,k,0);}
      put(cr,i,s0,(1-fr)*(1-f*0.6),1.3,1);if(s1!==s0)put(cr,i,s1,fr*(1-f*0.6),1.3,1);}
    ci.globalAlpha=1;co.globalAlpha=1;cr.globalAlpha=1;return {inner:I.ci,outer:I.co,rim:I.ri};}
  // vùng đang thấy (sáng): vẽ lại khi tầm nhìn đổi
  let NWC=null,NWK='';
  function nowMask(){if(!VNOW||!INK)return null;const key=VIS_N+':'+INK.key;if(NWC&&NWK===key)return NWC;NWK=key;if(!NWC){NWC=document.createElement('canvas');}NWC.width=INK.w;NWC.height=INK.h;const g=NWC.getContext('2d');
    for(let i=0;i<HN;i++)if(VNOW[i]){const p=hexCenter(i),R0=HEXW*1.5/INK.SC;g.drawImage(INK.blots[i&3][INK_ST-1].c,p[0]/INK.SC-R0,p[1]/INK.SC-R0,R0*2,R0*2);}return NWC;}
  let BGC=null,BGK='';
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
  function badge(x,y,s,col,glyph,o){o=o||{};ctx.save();ctx.translate(x,y);
    const R0=s/1.732;ctx.beginPath();for(let q=0;q<6;q++){const a=-Math.PI/2+q*Math.PI/3;q?ctx.lineTo(Math.cos(a)*R0,Math.sin(a)*R0):ctx.moveTo(Math.cos(a)*R0,Math.sin(a)*R0);}ctx.closePath();if(o.hollow)col=C.paper;
    ctx.fillStyle=col;ctx.fill();ctx.lineWidth=o.sel?2:1;ctx.strokeStyle=o.sel?C.ink:hexA(C.ink,o.hollow?0.7:0.45);if(o.dash)ctx.setLineDash([4,3]);ctx.stroke();ctx.setLineDash([]);
    if(glyph==='?'){ctx.fillStyle=C.dark?'#10151b':'#fbf7ea';ctx.font=`700 ${Math.round(s*0.6)}px serif`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('?',0,1);}
    else{ctx.scale(s/36,s/36);ctx.translate(-12,-12);ctx.strokeStyle=o.hollow?C.ink2:(C.dark?'#10151b':'#fbf7ea');ctx.lineWidth=1.7;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(p2d(glyph));}
    ctx.restore();}
  // ảnh công trình 2D thay huy hiệu (ASSET.map do giao-dien/anh.js gắn: map-<loại>-<bậc>, map-<loại>-ruin). Loại chưa có ảnh -> null -> vẫn vẽ huy hiệu cũ
  const MAPIC={},MAP_AL={yeusao:'sao'};
  function mapKey(n,ruin){const M=ASSET.map;if(!M)return null;let t=MAP_AL[n.type]||n.type;
    if(ruin){const b=isThanhT(n.type)?'thanh':n.type==='tong'?'tong':(isTownT(n.type)||n.type==='cho')?'tran':null;return b&&M['map-'+b+'-ruin']?'map-'+b+'-ruin':null;}
    for(let c=capOf(n);c>=1;c--)if(M['map-'+t+'-'+c])return 'map-'+t+'-'+c;
    return M['map-'+t]?'map-'+t:null;}
  function mapIc(k){let o=MAPIC[k];if(!o){const im=new Image();o=MAPIC[k]={im,ok:false};im.onload=()=>{o.ok=true;dirty=true;if(typeof dbg==='function')dbg('map.anh',{k,w:im.naturalWidth});};im.onerror=()=>{o.bad=true;if(typeof dbg==='function')dbg('map.anh',{k,loi:1});};im.src=ASSET.map[k];}
    return o.ok?o.im:null;}
  function label(t,x,y,o){o=o||{};ctx.font=`${o.b?700:600} ${o.s||12}px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='top';ctx.lineWidth=3;ctx.strokeStyle=hexA(C.paper,0.85);ctx.lineJoin='round';ctx.strokeText(t,x,y);ctx.fillStyle=o.c||C.ink;ctx.fillText(t,x,y);}
  let FONT='serif';
  function draw(now,dt){
    const r=G.run;if(!r||!ctx||!W0)return;
    if(!C.paper)colors();
    if(insets())clampCam();const reg=r.region,lv=gfxLv(),w=W();visLoad();const imgN=Object.values(MIMG).filter(o=>o.ok).length;
    if(cam.kz!==(r.rid||'')+r.kiep){cam.kz=(r.rid||'')+r.kiep;cam.reg=reg;cam.z=clamp(zMin()*Math.pow(ZMAX/zMin(),0.62),zMin(),ZMAX);center();pos=null;}
    const lastR=r.reveal[r.reveal.length-1];const base=lv+':'+CFG.theme+':'+w.seed,fbase=base+':'+(r.rid||'')+r.kiep+':'+r.reveal.length+':'+(lastR?lastR.join(','):'');
    // vị trí người chơi được làm mượt giữa các nhịp đồng hồ
    const pw=playerXY(),pp=mapXY(reg,pw[0],pw[1]);if(!pos||Math.hypot(pos[0]-pp[0],pos[1]-pp[1])>120)pos=[pp[0],pp[1]];else{const f=r.moving?1:1-Math.pow(0.002,dt);pos[0]+=(pp[0]-pos[0])*f;pos[1]+=(pp[1]-pos[1])*f;}
    if(cam.follow&&r.moving){cam.x=pos[0];cam.y=pos[1];clampCam();}
    const z=cam.z,X0=reg*1000;
    // nền + lưới chỉ vẽ lại khi camera, tầm nhìn, ô chọn đổi; còn lại (mây, hạt, đi đường) chỉ dán lại ảnh đệm
    const bgKey=[cam.x.toFixed(2),cam.y.toFixed(2),z.toFixed(5),W0,H0,dpr,VIS_N,CFG.grid,CFG.terrain,CFG.theme,hov,UI.sel,UI.cell,UI.mark&&UI.mark.k,UI.hold&&UI.hold.c,lv,imgN].join('|');
    const bgHit=BGK===bgKey&&BGC&&!(INK&&INK.anim);const realCtx=ctx;ctx.setTransform(dpr,0,0,dpr,0,0);
    if(!bgHit){if(!BGC)BGC=document.createElement('canvas');const bw=Math.round(W0*dpr),bh=Math.round(H0*dpr);if(BGC.width!==bw||BGC.height!==bh){BGC.width=bw;BGC.height=bh;}ctx=BGC.getContext('2d');}
    if(!bgHit){ctx.setTransform(dpr,0,0,dpr,0,0);ctx.fillStyle=C.dark?C.bg2:mixHex(C.paper,C.bg2,0.55);ctx.fillRect(0,0,W0,H0);
    // nền: ảnh "chưa tới" phủ cả bản đồ; chỗ đã đi qua hoặc đang thấy hiện ảnh chi tiết, viền chuyển tiếp là giấy loang mực
    {const hid=mapImg('hid'),bk=mapImg('bk'),tr=mapImg('tr');const X=SX(0),Y=SY(0),Wd=WORLD_W*z,Hd=WORLD_H*z;
      if(!CFG.terrain){if(bk)ctx.drawImage(bk,X,Y,Wd,Hd);}
      else{if(hid)ctx.drawImage(hid,X,Y,Wd,Hd);
        const M=inkMask(now);if(M&&bk){const L=layerCv();const g=L.getContext('2d');g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,L.width,L.height);g.setTransform(dpr,0,0,dpr,0,0);
          if(tr){g.globalCompositeOperation='source-over';g.drawImage(tr,X,Y,Wd,Hd);g.globalCompositeOperation='destination-in';g.drawImage(M.outer,X,Y,Wd,Hd);
            g.globalCompositeOperation='source-over';ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=0.9;ctx.drawImage(L,0,0);ctx.restore();g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,L.width,L.height);g.setTransform(dpr,0,0,dpr,0,0);}
          g.globalCompositeOperation='source-over';g.drawImage(bk,X,Y,Wd,Hd);g.globalCompositeOperation='destination-in';g.drawImage(M.inner,X,Y,Wd,Hd);g.globalCompositeOperation='source-over';
          ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(L,0,0);ctx.restore();
          if(M.rim)ctx.drawImage(M.rim,X,Y,Wd,Hd);
          const NW=nowMask();if(NW){g.setTransform(1,0,0,1,0,0);g.clearRect(0,0,L.width,L.height);g.setTransform(dpr,0,0,dpr,0,0);g.globalCompositeOperation='source-over';
            g.drawImage(M.inner,X,Y,Wd,Hd);g.globalCompositeOperation='source-in';g.fillStyle=C.dark?'rgba(0,0,0,1)':'rgba(40,26,12,1)';g.fillRect(SX(0),SY(0),Wd,Hd);
            g.globalCompositeOperation='destination-out';g.drawImage(NW,X,Y,Wd,Hd);g.globalCompositeOperation='source-over';
            ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.globalAlpha=C.dark?0.32:0.2;ctx.drawImage(L,0,0);ctx.restore();
}}}
      }}
    ctx.globalAlpha=1;
    // lưới lục giác, ranh quận, ranh đại khu vực, ô đang rê chuột hoặc đang chọn
    const zf=clamp(Math.log(z/zMin())/Math.log(ZMAX/zMin()),0,1);const showIc=zf>=0.5;const zTop=zf>=0.96;
    // thu nhỏ: ranh đại khu vực · tầm thấy tên quận: ranh quận (nét đứt) · tầm thấy địa điểm: chỉ sáng địa điểm đang rê hoặc chọn; không bao giờ phủ cả lưới
    const fillA=clamp(1-(cam.z-zDeep())/Math.max(1e-6,zMin()-zDeep()),0,1),macroA=Math.max(fillA,clamp(1-(zf-0.12)/0.12,0,1)),distA=Math.min(clamp((zf-0.12)/0.1,0,1),clamp((0.5-zf)/0.1,0,1));
    {const hx=hexPaths(),g0=geo();ctx.save();ctx.translate(W0/2-cam.x*z,VCY-cam.y*z);ctx.scale(z,z);ctx.lineJoin='round';ctx.lineCap='round';
      if(!bgHit){const BR=C.dark?'#e6d6b4':'#5b3d22'; // nâu mực, hợp màu giấy bản đồ
        const sel=CFG.grid&&!zTop?(UI.cell!=null?UI.cell:null):null;
        if(fillA>0.01){for(let k=0;k<5;k++){ctx.fillStyle=hexA(AREA_COL[k],0.2*fillA);ctx.fill(hx.rp[k]);}}
        if(macroA>0.01){ctx.strokeStyle=hexA(BR,0.5*macroA);ctx.lineWidth=1/z;ctx.setLineDash([7/z,5/z]);ctx.stroke(hx.macro);ctx.setLineDash([]);}
        if(CFG.grid&&distA>0.01){ctx.strokeStyle=hexA(C.dark?'#10151b':'#fff4d6',0.6*distA);ctx.lineWidth=2.6/z;ctx.stroke(hx.dist);ctx.stroke(hx.macro); // viền sáng (ranh đại khu vực cũng là ranh quận) để ranh quận không chìm vào nền đã khám phá
          ctx.strokeStyle=hexA(BR,0.85*distA);ctx.lineWidth=GW/z;ctx.setLineDash([5/z,4/z]);ctx.stroke(hx.dist);ctx.stroke(hx.macro);ctx.setLineDash([]);
          const d=sel!=null&&g0.reg[sel]>=0?g0.dist[sel]:-1;
          if(d>=0&&hx.dp[d]){ctx.fillStyle=hexA(C.dark?'#ffffff':'#fff6dc',(C.dark?0.1:0.34)*distA);ctx.fill(hx.dp[d]);ctx.globalCompositeOperation=C.dark?'source-over':'multiply';ctx.strokeStyle=hexA(BR,0.32*distA);ctx.lineWidth=GW*0.5/z;ctx.setLineDash([2/z,2.5/z]);ctx.stroke(hx.dp[d]);ctx.setLineDash([]);ctx.globalCompositeOperation='source-over';}}
        // địa điểm: tô các ô của nó bằng màu icon (phủ overlay, rất nhạt), nếu bật lưới thì có thêm đường ô mảnh
        {const hn=hov!=null&&showIc?hexNode(hov):null;const L=[];const sn0=UI.sel!=null?nodeById(UI.sel):null;
          // đích đang ngắm / đã đánh dấu: cả cụm địa điểm sáng lên, viền đỏ quanh cụm; ô đất trống thì viền đỏ riêng ô đó
          const tgC=r.moving?null:UI.hold?UI.hold.c:UI.mark?UI.mark.th:null,tgN0=r.moving?null:UI.hold?(UI.hold.n!=null?nodeById(UI.hold.n):null):(UI.mark&&UI.mark.k[0]==='n'?nodeById(+UI.mark.k.slice(1)):null);
          const tgN=tgN0&&(tgN0.fog>=2||tgN0.memory)&&!tgN0.wp?tgN0:null;
          if(tgN)L.push([tgN,1,1]);if(sn0&&sn0!==tgN&&(sn0.fog>=2||sn0.memory))L.push([sn0,1]);if(hn&&hn!==sn0&&hn!==tgN)L.push([hn,0.65]);
          const DC0=[C.jade,C.gold,C.seal,C.vio];
          for(const [n,a,red] of L){const cs=placeCells(n),set=new Set(cs);const cp=new Path2D(),op=new Path2D();
            for(const c of cs){const v=hexVerts(c);cp.moveTo(v[0][0],v[0][1]);for(let q=1;q<6;q++)cp.lineTo(v[q][0],v[q][1]);cp.closePath();const [cx,cy]=hexCenter(c);
              for(let q=0;q<6;q++){const A=v[q],B=v[(q+1)%6];if(!set.has(hexAt(A[0]+B[0]-cx,A[1]+B[1]-cy))){op.moveTo(A[0],A[1]);op.lineTo(B[0],B[1]);}}}
            const sure=n.fog>=2||n.memory;const col=sure?DC0[dangerTag(n)]:C[NODE_CAT[n.type]||'ink'];
            ctx.globalCompositeOperation='overlay';ctx.fillStyle=hexA(col,0.7*a);ctx.fill(cp);ctx.globalCompositeOperation='source-over';
            ctx.fillStyle=hexA(C.dark?'#ffffff':'#fff8e4',0.3*a);ctx.fill(cp);ctx.fillStyle=hexA(col,0.14*a);ctx.fill(cp);
            if(CFG.grid){ctx.strokeStyle=hexA(BR,0.3*a);ctx.lineWidth=GW*0.5/z;ctx.setLineDash([2/z,2.5/z]);ctx.stroke(cp);ctx.setLineDash([]);}
            if(red){ctx.strokeStyle=hexA('#f0b81c',0.98);ctx.lineWidth=2.2/z;ctx.stroke(op);}else{ctx.strokeStyle=hexA(C.dark?'#fff1d0':mixHex(col,BR,0.5),0.95*a);ctx.lineWidth=1.6/z;ctx.setLineDash([4/z,3/z]);ctx.stroke(op);ctx.setLineDash([]);}}
          if(tgC!=null&&tgC>=0&&!tgN){hexPoly(tgC);ctx.strokeStyle=hexA('#f0b81c',0.98);ctx.lineWidth=2/z;ctx.stroke();}
          if(sel!=null&&showIc&&!hn&&!(UI.sel!=null)){hexPoly(sel);ctx.strokeStyle=hexA(BR,0.6);ctx.lineWidth=0.7/z;ctx.stroke();}}}
      ctx.restore();if(!bgHit){ctx=realCtx;BGK=bgKey;}
      ctx.save();ctx.setTransform(1,0,0,1,0,0);ctx.drawImage(BGC,0,0);ctx.restore();
      ctx.save();ctx.translate(W0/2-cam.x*z,VCY-cam.y*z);ctx.scale(z,z);ctx.lineJoin='round';ctx.lineCap='round';
      // đường định đi tới điểm đang chọn
      const sn=UI.sel!=null&&!r.moving&&nodeById(UI.sel);
      {const h0=nodeHex(nodeById(r.at)),th=r.moving?null:(UI.hold?(UI.hold.n!=null?hexAt(...mapNode(nodeById(UI.hold.n))):UI.hold.c):UI.mark?UI.mark.th:(sn&&sn.id!==r.at&&sn.fog>=1?hexAt(...mapNode(sn)):null));
        if(th!=null&&th!==h0){const hp=hexPath(h0,th);ctx.beginPath();hp.cells.forEach((c,i)=>{const p=hexCenter(c);if(i)ctx.lineTo(p[0],p[1]);else ctx.moveTo(p[0],p[1]);});
          ctx.strokeStyle=UI.mark||UI.hold?hexA('#f0b81c',0.98):hexA(C.acc,0.6);ctx.lineWidth=(UI.mark||UI.hold?2.8:2.5)/z;ctx.setLineDash(UI.mark||UI.hold?[5/z,4/z]:[2/z,7/z]);ctx.stroke();ctx.setLineDash([]);
          if(UI.mark||UI.hold){const q=hexCenter(th),w=Math.max(HEXW*0.3,13/z),hh=Math.max(HEXW*0.62,28/z),y0=q[1]-HEXW*0.12;ctx.beginPath();ctx.moveTo(q[0],y0);ctx.lineTo(q[0]+w,y0-hh*0.5);ctx.lineTo(q[0]+w*0.38,y0-hh*0.5);ctx.lineTo(q[0]+w*0.38,y0-hh);ctx.lineTo(q[0]-w*0.38,y0-hh);ctx.lineTo(q[0]-w*0.38,y0-hh*0.5);ctx.lineTo(q[0]-w,y0-hh*0.5);ctx.closePath();ctx.lineWidth=1.4/z;ctx.strokeStyle=hexA('#59616d',0.95);ctx.stroke();ctx.fillStyle=hexA('#d9dee6',0.97);ctx.fill();}}}
      if(r.moving){const m=r.moving;ctx.beginPath();ctx.moveTo(pos[0],pos[1]);
        for(let i=m.seg;i<m.path.length-1;i++){const hp=hexPath(nodeHex(nodeById(m.path[i])),nodeHex(nodeById(m.path[i+1])));const t=i===m.seg?m.prog*(hp.cum[hp.cum.length-1]||1):-1;hp.cells.forEach((c,j)=>{if(hp.cum[j]<=t)return;const p=hexCenter(c);ctx.lineTo(p[0],p[1]);});}
        ctx.strokeStyle=hexA(C.seal,0.85);ctx.lineWidth=2.5/z;ctx.setLineDash([6/z,5/z]);ctx.stroke();ctx.setLineDash([]);}
      ctx.restore();}
    // mây trôi, hạt theo mùa, sắc trời theo buổi
    if(lv>0&&CFG.clouds){if(!cloudSpr)cloudSpr=cloudSprite();if(!clouds.length)for(let i=0;i<[0,9,16][lv];i++)clouds.push({x:Math.random()*(WORLD_W+500)-250,y:Math.random()*2500-250,s:160+Math.random()*220,v:6+Math.random()*10});
      const cA=clamp((0.55-zf)/0.1,0,1);ctx.globalAlpha=(C.dark?0.06:0.5)*cA;if(cA>0.01)for(const c of clouds){c.x+=c.v*dt;if(c.x>WORLD_W+300)c.x=-500;const x=SX(c.x),y=SY(c.y),s=c.s*z*2;if(x+s<0||x>W0||y+s<0||y>H0)continue;ctx.drawImage(cloudSpr,x,y,s,s*0.6);}ctx.globalAlpha=1;}
    if(fillA>0.02&&fillA<0.98&&cloudSpr){const p=1-fillA,pe=p*p*(3-2*p),a=Math.sin(p*Math.PI)*(C.dark?0.125:0.4),vh=viewH();ctx.save();
      const rnd=n=>{const x=Math.sin(n*127.1+311.7)*43758.5453;return x-Math.floor(x);};
      for(let k=0;k<30;k++){const side=k%2?1:-1,r1=rnd(k+1),r2=rnd(k*3+7),r3=rnd(k*5+2),r4=rnd(k*7+11);
        const w=W0*(0.22+r1*0.5),h=vh*(0.05+r2*0.11),yy=VCY+(r3-0.5)*vh*1.05,dist=W0*(0.05+r4*0.25)+pe*W0*(0.55+r1*0.5);
        const cx=W0/2+side*dist,sk=(r2-0.5)*0.25,al=a*(0.45+0.55*r3)*Math.min(1,p*5);
        ctx.globalAlpha=al;ctx.save();ctx.translate(cx,yy);ctx.rotate(sk*0.2);
        for(let q=0;q<3;q++){const ox=(q-1)*w*0.3*(0.6+rnd(k+q)),oy=(rnd(k*2+q)-0.5)*h*0.6,ww=w*(0.5+rnd(k+q*9)*0.5);ctx.drawImage(cloudSpr,ox-ww/2,oy-h/2,ww,h);}
        ctx.restore();}
      ctx.restore();}
    {const va=clamp((0.55-zf)/0.1,0,1)*(1-fillA);if(va>0.02){if(!cloudSpr)cloudSpr=cloudSprite();const t=performance.now()/1000;ctx.save();ctx.globalAlpha=va*(C.dark?0.08:0.22);for(let k=0;k<6;k++){const sz=W0*(0.3+(k%3)*0.08),sp=26+k*9,span=W0+sz,xx=((t*sp+k*span/6)%span)-sz,yy=VCY+((k*5%6)/6-0.5)*viewH()*0.9-sz*0.3+Math.sin(t*0.25+k*1.7)*viewH()*0.04,sc=1+Math.sin(t*0.18+k)*0.08;ctx.globalAlpha=va*(C.dark?0.16:0.5)*(0.75+0.25*Math.sin(t*0.3+k*2.1));ctx.drawImage(cloudSpr,xx,yy,sz*sc*1.5,sz*0.28*sc);}ctx.restore();dirty=true;}}
    {const on=CFG.daynight&&!(r.moving&&!r.halt);const tg=on?dnTint(tHour(w.t),C.dark).slice():[0,0,0,0];tg[3]*=1.5;const c=UI.dnCur||(UI.dnCur=tg.slice());let mv=0;
      for(let i=0;i<4;i++){const d=tg[i]-c[i];if(Math.abs(d)>(i<3?0.5:0.0008)){c[i]+=d*0.06;mv=1;}else c[i]=tg[i];}
      if(c[3]>0.002){ctx.fillStyle=`rgba(${c[0]|0},${c[1]|0},${c[2]|0},${c[3].toFixed(3)})`;ctx.fillRect(0,0,W0,H0);}if(mv)UI.dnMv=1;else UI.dnMv=0;}
    if(lv>0&&CFG.fx){if(!(r.moving&&!r.halt)||!pse)pse=[seasonOf(w.t),partOf(w.t)==='dem'];const se=pse[0],night=pse[1];const want=se==='ha'&&!night?0:[0,16,38][lv];
      while(parts.length<want)parts.push({x:Math.random()*W0,y:Math.random()*H0,v:10+Math.random()*24,a:Math.random()*6.3,s:1.5+Math.random()*2.5});
      if(parts.length>want)parts.length=want;
      const col=se==='xuan'?'#e8a0b0':se==='thu'?'#c98a3c':se==='dong'?(C.dark?'#e8eef4':'#9fb1c2'):'#f0d060';
      const cdx=(cam.x-(pcam?pcam[0]:cam.x))*z,cdy=(cam.y-(pcam?pcam[1]:cam.y))*z;pcam=[cam.x,cam.y];
      ctx.fillStyle=col;for(const q of parts){q.x-=cdx;q.y-=cdy;if(q.x<-5)q.x+=W0+10;if(q.y<-5)q.y+=H0+10;q.a+=dt*1.6;if(se==='ha'){q.x+=Math.cos(q.a)*8*dt;q.y+=Math.sin(q.a*0.7)*8*dt;ctx.globalAlpha=0.45+0.4*Math.sin(q.a*2);}
        else{q.y+=q.v*dt*(se==='dong'?1.2:0.8);q.x+=Math.sin(q.a)*14*dt+6*dt;ctx.globalAlpha=0.75;}
        if(q.y>H0+5){q.y=-5;q.x=Math.random()*W0;}if(q.x>W0+5)q.x=-5;
        ctx.beginPath();if(se==='dong'||se==='ha')ctx.arc(q.x,q.y,q.s*0.7,0,6.3);else ctx.ellipse(q.x,q.y,q.s*1.3,q.s*0.6,q.a,0,6.3);ctx.fill();}ctx.globalAlpha=1;}
    // mức thu phóng 0..1 (0: thu nhỏ hết cỡ, 1: phóng to hết cỡ), theo thang log cho khớp lăn chuột
    //  0–20%: tên đại khu vực ở giữa khu vực, mờ dần khi phóng to · 12–50%: tên quận ở giữa quận · từ 50%: mọi icon (chỉ nhân vật chính thì lúc nào cũng hiện)
    {const gc=geo();if(!gc.cent){const rs={},ds={};for(let i=0;i<gc.reg.length;i++){const k=gc.reg[i];if(k<0)continue;const p=hexCenter(i);const a=rs[k]||(rs[k]=[0,0,0]);a[0]+=p[0];a[1]+=p[1];a[2]++;const d=gc.dist[i];const b=ds[d]||(ds[d]=[0,0,0]);b[0]+=p[0];b[1]+=p[1];b[2]++;}gc.cent={rs,ds};}
     ctx.textAlign='center';ctx.textBaseline='middle';
     const ra=clamp(1-zf/0.2,0,1);const SERIF='"Cormorant Garamond","Noto Serif",Georgia,serif';if(ra>0){ctx.font=`600 ${Math.round(clamp(z*80,17,30))}px ${SERIF}`;for(const [k,a] of Object.entries(gc.cent.rs)){const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);ctx.fillStyle=hexA(C.ink2,0.5*ra);ctx.fillText(REG[k].n.toUpperCase().split('').join(' '),x,y);}}
     const da=Math.min(clamp((zf-0.12)/0.08,0,1),clamp((0.5-zf)/0.08,0,1));if(da>0){ctx.font=`italic 600 ${Math.round(clamp(z*46,13,19))}px ${SERIF}`;for(const [d,a] of Object.entries(gc.cent.ds)){const nm=gc.dnames[d];if(!nm)continue;const x=SX(a[0]/a[2]),y=SY(a[1]/a[2]);if(x<-80||y<-30||x>W0+80||y>H0+30)continue;{const tw=ctx.measureText(nm).width,fh=Math.round(clamp(z*46,13,19)),pw2=7,ph=3;ctx.fillStyle=hexA(C.paper,0.42*da);ctx.beginPath();if(ctx.roundRect)ctx.roundRect(x-tw/2-pw2,y-fh*0.5-ph-1,tw+pw2*2,fh+ph*2+2,5);else ctx.rect(x-tw/2-pw2,y-fh*0.5-ph-1,tw+pw2*2,fh+ph*2+2);ctx.fill();}ctx.fillStyle=hexA(C.ink,da);ctx.fillText(nm,x,y);}}}
    if(false&&CFG.ring){ctx.beginPath();ctx.arc(SX(pos[0]),SY(pos[1]),senseR()*z,0,6.3);ctx.strokeStyle=hexA(C.acc,0.28);ctx.lineWidth=1;ctx.setLineDash([3,5]);ctx.stroke();ctx.setLineDash([]);}
    // điểm
    const s0=Math.max(10,HEXW*z*0.97);const small=z<0.5;const notes=w.notes||{};
    const HT=CFG.hideT||{},HE=CFG.hideE||{},DC=[C.jade,C.gold,C.seal,C.vio];const QN=new Set((r.quests||[]).filter(q=>q.state==='open').map(q=>q.node));
    // một ô lục giác có cả địa điểm lẫn người (ngươi, hoặc thực thể đang dừng chân): địa điểm lùi sang trái, người sang phải, cả hai nhỏ lại cho khỏi đè nhau
    const HW=HEXW/2*z;const OCC=new Set();if(!r.moving&&!HT._me)OCC.add(r.at);
    if(CFG.ents){const sr0=senseR();for(const e of entsHere(reg)){if(HE[e.type]||e.to!=null)continue;const p=entXY(e);if(Math.hypot(p[0]-pw[0],p[1]-pw[1])<=sr0)OCC.add(e.at);}}
    UI._mapImN=0;UI._mapBadgeN=0;
    if(showIc)for(const R0 of w.regions)for(const n of R0.nodes){const k=R0.k;if(n.fog<1)continue;if(HT[n.type])continue;const [nx,ny]=mapNode(n);let x=SX(nx),y=SY(ny);if(x<-60||y<-60||x>W0+60||y>H0+60)continue;const under=OCC.has(n.id);const sN=s0;
      const sure=n.fog>=2||n.memory;const old=n.fog>=2&&n.seenT>=0&&w.t-n.seenT>HY;const ruin=(n.vstate||'ok')==='ruin'&&n.fog>=2;const sel=UI.sel===n.id;
      const col=C[NODE_CAT[n.type]||'ink'];
      
      {const ik=sure?mapKey(n,ruin):null,im=ik&&mapIc(ik);
        if(im){const cp=capOf(n),sz=sN*(1.3+0.1*(cp-1)),fy=y+sN*0.42,dg=dangerTag(n);ctx.save();if(old)ctx.globalAlpha=0.72;
          if(dg>0||sel){ctx.beginPath();ctx.ellipse(x,fy-sz*0.04,sz*0.42,sz*0.13,0,0,6.3);ctx.fillStyle=hexA(sel?C.gold:DC[dg],sel?0.55:0.45);ctx.fill();}
          if(sel&&lv>0){ctx.shadowColor=C.gold;ctx.shadowBlur=10;}ctx.drawImage(im,x-sz/2,fy-sz,sz,sz);ctx.restore();UI._mapImN=(UI._mapImN||0)+1;}
        else{badge(x,y,sN,ruin?C.ink3:(sure?DC[dangerTag(n)]:col),sure?(ruin?'ruin':n.type):'?',{hollow:!sure,dash:!sure,sel});UI._mapBadgeN=(UI._mapBadgeN||0)+1;}}if(under){if(CFG.names)label(n.name,SX(nx),SY(ny)+s0/2+5,{c:C.ink,s:CFG.font==='m'?12:14});continue;}
      if(n.dp&&n.fog>=3){ctx.beginPath();ctx.arc(x+s0/2-1,y-s0/2+1,4,0,6.3);ctx.fillStyle=C.jade;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(n.grave&&n.fog>=1){ctx.fillStyle=C.ink2;ctx.fillRect(x-s0/2-2,y-s0/2-2,5,7);}
      if(QN.has(n.id)){const qx=x+s0/2,qy=y+s0/2;ctx.beginPath();ctx.arc(qx,qy,6.5,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();ctx.fillStyle='#fffaf0';ctx.font='700 10px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText('!',qx,qy+0.5);}
      if(CFG.notes&&notes[n.id]){ctx.beginPath();ctx.arc(x-s0/2+1,y+s0/2-1,4.5,0,6.3);ctx.fillStyle=C.gold;ctx.fill();ctx.strokeStyle=C.paper;ctx.lineWidth=1.5;ctx.stroke();}
      if(CFG.names&&(!small||sel||n.id===r.at||isThanhT(n.type)||n.type==='ai')&&(z>=0.3||sel||n.id===r.at)){label(n.name+(sure?'':'?'),x,y+s0/2+3,{c:sure?C.ink:C.ink3,s:CFG.font==='m'?12:14});if(old)label('tin cũ',x,y+s0/2+18,{c:C.ink3,s:10});}}
    // thực thể qua lại
    if(CFG.ents&&showIc){const sr=senseR();for(const e of entsHere(reg)){if(HE[e.type])continue;const p=entXY(e);const see=Math.hypot(p[0]-pw[0],p[1]-pw[1])<=sr;
      if(!see&&!e.heard)continue;const q=mapXY(reg,see?p[0]:e.heard.x,see?p[1]:e.heard.y);const parked=see&&e.to==null;const x=SX(q[0])+(parked?HW*0.64:0),y=SY(q[1]);const er=Math.max(6,HW*0.52);if(x<-30||y<-30||x>W0+30||y>H0+30)continue;
      const bad=e.type==='thutrieu'||e.type==='truysat';ctx.globalAlpha=see?1:0.55;const ec=entCol(e.type,C);const gk=ENT_GLYPH[e.type];
      if(e.type==='thuong'){ // xe ngựa, trên đầu là ảnh nhỏ người dẫn đầu
        const wi=wagonImg();if(wi&&wi.complete&&wi.naturalWidth){{const ww=Math.max(18,HW*1.5);ctx.drawImage(wi,x-ww/2,y-ww*0.3,ww,ww*0.59);}}else{ctx.save();ctx.translate(x-11,y-9);ctx.scale(22/24,22/24);ctx.lineWidth=2;ctx.strokeStyle=ec;ctx.stroke(icPath('cart'));ctx.restore();}
      }
      else{ctx.beginPath();ctx.arc(x,y,er,0,6.3);ctx.fillStyle=C.paper;ctx.fill();ctx.lineWidth=2;ctx.strokeStyle=ec;if(!see)ctx.setLineDash([3,3]);ctx.stroke();ctx.setLineDash([]);
        if(gk){const gs=er*1.3;ctx.save();ctx.translate(x-gs/2,y-gs/2);ctx.scale(gs/24,gs/24);ctx.lineWidth=2.2;ctx.strokeStyle=ec;ctx.lineCap='round';ctx.lineJoin='round';ctx.stroke(icPath(gk));ctx.restore();}
        else{ctx.font=`500 10px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillStyle=C.ink;ctx.fillText(avLetter(ENT_T[e.type].n),x,y+1);}}
      ctx.globalAlpha=1;
      }}
    // người chơi: con dấu son
    if(!HT._me){// đứng ở địa điểm: địa điểm giữ ở tâm ô, nhân vật nằm ngay phía trên, cách một khe nhỏ
      const nd=!r.moving&&showIc&&!HT[(nodeById(r.at)||{}).type]?nodeById(r.at):null;const nS=s0;const rr=Math.max(8,HW*0.8);const x=SX(pos[0]),y=SY(pos[1])-(nd?nS/2+3+rr+2.5:0);
      if(UI.lvGlow){const nw=performance.now(),G0=UI.lvGlow;if(nw<G0.t1){const p=(nw-G0.t0)/(G0.t1-G0.t0),fa=p<0.15?p/0.15:1-Math.max(0,(p-0.6)/0.4);ctx.save();
        const dn=G0.c==='down';const C1=dn?'150,20,20':'255,224,130',C2=dn?'120,10,30':'240,196,80',C3=dn?'90,0,0':'255,240,190';const pg=ctx.createLinearGradient(x,y-rr*9,x,y);pg.addColorStop(0,`rgba(${C1},0)`);pg.addColorStop(1,`rgba(${C1},${0.55*fa})`);ctx.fillStyle=pg;ctx.fillRect(x-rr*1.1,y-rr*9,rr*2.2,rr*9);
        for(let k=0;k<3;k++){const q=((p*2.4)+k/3)%1;ctx.beginPath();ctx.arc(x,y,rr+q*rr*2.6,0,6.3);ctx.strokeStyle=`rgba(${C2},${(1-q)*0.8*fa})`;ctx.lineWidth=2.5*(1-q)+0.5;ctx.stroke();}
        const rg=ctx.createRadialGradient(x,y,rr*0.5,x,y,rr*2.4);rg.addColorStop(0,`rgba(${C3},${0.6*fa})`);rg.addColorStop(1,`rgba(${C3},0)`);ctx.fillStyle=rg;ctx.beginPath();ctx.arc(x,y,rr*2.4,0,6.3);ctx.fill();ctx.restore();}else UI.lvGlow=null;}
      {const tg=talGrad(ctx,x,y,rr+3.5,playerTal());ctx.beginPath();ctx.arc(x,y,rr+(tg?3.5:2.5),0,6.3);ctx.fillStyle=tg||C.seal;ctx.fill();}ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.fillStyle=C.paper;ctx.fill();
      const hi=heroImg();if(hi&&hi.complete&&hi.naturalWidth){ctx.save();ctx.beginPath();ctx.arc(x,y,rr,0,6.3);ctx.clip();ctx.drawImage(hi,x-rr,y-rr,rr*2,rr*2);ctx.restore();}
      else{ctx.fillStyle=C.ink;ctx.font=`500 ${Math.round(rr*1.05)}px ${FONT}`;ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(avLetter(r.ten),x,y+1);}
}
    // thẻ chú thích gắn theo địa điểm / đại khu vực: bám vị trí trên bản đồ, nằm trên icon, hết chỗ thì xuống dưới
    if(UI.mark&&!r.moving){const h0=nodeHex(nodeById(r.at));if(UI.mark.th!==h0){const q=hexCenter(UI.mark.th),hr=hexPath(h0,UI.mark.th).len/walkSpeed();label(durH(hr),SX(q[0]),SY(q[1])-Math.max(HEXW*z*0.8,26)-22,{c:'#d4281c',s:17,b:1});}}
    {const el=document.querySelector('#dock .np');if(el){const ax=+el.dataset.ax,ay=+el.dataset.ay;
      if(el.dataset.area&&zf>=0.2){el.style.visibility='hidden';}
      else{const w=el.offsetWidth,h=el.offsetHeight;const cr=cv.getBoundingClientRect(),dr=el.parentElement.getBoundingClientRect();const sx=SX(ax),sy=SY(ay);const ic=el.dataset.ic?+el.dataset.ic:el.dataset.area?4:Math.max(10,HEXW*z*0.6);
        let left=clamp(sx-w/2,6,Math.max(6,W0-w-6)),top=sy-ic-h-8;if(top<TOPI+4)top=sy+ic+8;top=clamp(top,TOPI+4,Math.max(TOPI+4,H0-BOTI-h-4));
        el.style.left=Math.round(left+(cr.left-dr.left)/uz)+'px';el.style.top=Math.round(top+(cr.top-dr.top)/uz)+'px';el.style.visibility='visible';}}}
    if(false&&CFG.showFps){ctx.font='11px monospace';ctx.textAlign='left';ctx.textBaseline='bottom';ctx.fillStyle=C.ink2;ctx.fillText(fpsShow+' khung/giây · mức '+['tiết kiệm','cân bằng','đẹp'][lv],8,H0-6);}
  }
  function animating(){const r=G.run;if(!r)return false;const lv=gfxLv();return (!!r.moving&&!r.halt)||(lv>0&&(CFG.fx||CFG.clouds))||(pos&&(()=>{const w0=playerXY(),q=mapXY(r.region,w0[0],w0[1]);return Math.hypot(pos[0]-q[0],pos[1]-q[1])>0.5;})());}
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
    cv.addEventListener('pointerdown',e=>{cv.setPointerCapture&&cv.setPointerCapture(e.pointerId);ptr.set(e.pointerId,[(e.offsetX/uz),(e.offsetY/uz)]);
      if(ptr.size===1){drag={x:(e.offsetX/uz),y:(e.offsetY/uz),cx:cam.x,cy:cam.y,moved:false,aim:false};const R=G.run;if(R&&!R.scene&&!R.moving&&zfNow()>=0.5&&typeof mapHold==='function'){const dd=drag,ox=(e.offsetX/uz),oy=(e.offsetY/uz);dd.t=setTimeout(()=>{if(drag!==dd||dd.moved||ptr.size!==1)return;dd.aim=true;aimAt(ox,oy,true);},170);}}
      else if(ptr.size===2){const [a,b]=[...ptr.values()];pinch={d:Math.hypot(a[0]-b[0],a[1]-b[1]),z:cam.z};if(drag){clearTimeout(drag.t);if(drag.aim&&typeof mapHoldEnd==='function')mapHoldEnd();}drag=null;}});
    cv.addEventListener('pointermove',e=>{if(!ptr.has(e.pointerId))return;ptr.set(e.pointerId,[(e.offsetX/uz),(e.offsetY/uz)]);
      if(pinch&&ptr.size===2){const [a,b]=[...ptr.values()];const d=Math.hypot(a[0]-b[0],a[1]-b[1]);if(pinch.z*d/Math.max(20,pinch.d)<cam.z&&cam.z<=zMin()*1.001&&!wide)bump();cam.z=clamp(pinch.z*d/Math.max(20,pinch.d),zFloor(),ZMAX);cam.follow=false;clampCam();dirty=true;return;}
      if(drag&&drag.aim){aimAt((e.offsetX/uz),(e.offsetY/uz),false);return;}
      if(drag){const dx=(e.offsetX/uz)-drag.x,dy=(e.offsetY/uz)-drag.y;if(Math.abs(dx)+Math.abs(dy)>7&&!drag.moved){drag.moved=true;clearTimeout(drag.t);}if(drag.moved){cam.x=drag.cx-dx/cam.z;cam.y=drag.cy-dy/cam.z;cam.follow=false;clampCam();dirty=true;}}});
    const up=e=>{const d=drag;ptr.delete(e.pointerId);if(ptr.size<2)pinch=null;if(d)clearTimeout(d.t);if(d&&d.aim){if(typeof mapAimEnd==='function')mapAimEnd(e.type==='pointerup');}else if(e.type==='pointerup'&&d&&!d.moved&&ptr.size===0){const c=cellAt((e.offsetX/uz),(e.offsetY/uz));let n=hexNode(c);if(n&&(CFG.hideT||{})[n.type])n=null;if(!n)n=hit((e.offsetX/uz),(e.offsetY/uz));mapTap(n,c,worldAt((e.offsetX/uz),(e.offsetY/uz)),zfNow());}if(ptr.size===0)drag=null;};
    cv.addEventListener('pointerup',up);cv.addEventListener('pointercancel',up);
    cv.addEventListener('pointermove',e=>{if(e.pointerType!=='mouse'||drag||!G.run||G.run.scene)return;const c=cellAt((e.offsetX/uz),(e.offsetY/uz));if(c!==hov){hov=c;dirty=true;}if(cam.z>=ZMAX*0.97)hideTip();else hexTip(c,e.clientX,e.clientY);});
    cv.addEventListener('pointerleave',()=>{if(hov!=null){hov=null;dirty=true;}hideTip();});
    cv.addEventListener('wheel',e=>{e.preventDefault();zoom(e.deltaY<0?1.15:1/1.15,(e.offsetX/uz),(e.offsetY/uz));},{passive:false});
  }
  return {attach,resize,invalidate,soft(){soft=true;},frame,center,focus,zoom,cam,zoomOutAll,locate,reset:resetAll,get fps(){return performance.now()-lastDraw>1500?0:fpsShow;},get dpr(){return dpr;},get zf(){return zfNow();},worldAt,get wide(){return wide;},get dtc(){return Object.keys(DTC).filter(k=>DTC[k]).length;},get imgOk(){return Object.values(MIMG).filter(o=>o.ok).length;},get ink(){return !!(INK&&INK.any);},get zmax(){return ZMAX;},setFont:f=>{FONT=f;},get lv(){return gfxLv();}};
})();
