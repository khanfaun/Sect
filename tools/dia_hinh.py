# Phân loại địa hình từng ô lục giác cho bản đồ ảnh (src/assets/ban-do).
# Nền: đo màu ảnh Summer-day (rừng tối hơn xung quanh, đồi gồ ghề); sông hồ, núi, mây: vẽ tay bằng đa giác/đường (toạ độ điểm ảnh 2752x1536).
# Chạy: python3 tools/dia_hinh.py [--xem tệp.jpg]  -> ghi src/game/core2/32-dia-hinh-du-lieu.js
import sys, math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
ROOT='src/assets/ban-do/'
WW,WH=3556,1985
HEXW=30; HEXP=HEXW*0.8660254
HCOLS=int(math.ceil(WW/HEXW)); HROWS=int((WH-HEXP*2/3)//HEXP)+1; HN=HCOLS*HROWS
# loại: 0 Vân hải (mây, không đi được), 1 Đồng bằng, 2 Rừng, 3 Đồi, 4 Núi cao, 5 Sông, 6 Hồ, 7 Đầm lầy, 8 Suối, 9 Bến đò/cầu
day=Image.open(ROOT+'Summer-day.webp').convert('RGB'); IW,IH=day.size; S=IW/WW
A=np.asarray(day).astype(np.float32)/255; V=A.mean(2)
Vb=np.asarray(Image.fromarray((V*255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(60))).astype(np.float32)/255
blur=np.asarray(day.filter(ImageFilter.GaussianBlur(3))).astype(np.float32)/255; RO=np.abs(A-blur).mean(2)
def center(i):
    c=i%HCOLS; r=i//HCOLS; return ((c+0.5+(r%2)*0.5)*HEXW,(r+2/3)*HEXP)
def mask(draw_fn):
    m=Image.new('L',(IW,IH),0); draw_fn(ImageDraw.Draw(m)); return np.asarray(m)>0
CLOUD=[[(0,0),(2752,0),(2752,470),(2600,465),(2450,410),(2300,320),(2100,245),(1950,195),(1800,185),(1600,185),(1450,190),(1300,180),(1100,175),(950,165),(800,150),(650,120),(500,160),(350,195),(200,250),(100,320),(0,320)],
 [(0,320),(95,330),(110,450),(80,560),(55,700),(95,850),(55,1000),(115,1150),(200,1250),(300,1270),(380,1300),(380,1536),(0,1536)],
 [(1380,1536),(1400,1430),(1600,1410),(1800,1400),(2000,1430),(2000,1536)],
 [(2752,250),(2640,300),(2600,380),(2650,470),(2752,500)],[(2752,600),(2700,640),(2690,760),(2752,800)]]
MTN=[[(95,330),(330,170),(520,95),(900,135),(1000,250),(990,400),(900,445),(760,395),(700,375),(560,340),(450,410),(420,470),(320,500),(200,520),(110,520)],
 [(110,520),(320,490),(470,505),(560,555),(640,600),(690,680),(700,760),(760,800),(860,820),(905,900),(880,990),(760,1010),(640,1000),(610,1050),(625,1140),(600,1190),(450,1190),(380,1150),(300,1200),(200,1250),(115,1150),(55,1000),(95,850),(55,700),(80,560)],
 [(1060,330),(1120,215),(1200,165),(1290,210),(1320,300),(1340,400),(1300,480),(1180,490),(1060,500),(1000,450)],
 [(1300,330),(1400,175),(1500,120),(1600,195),(1700,225),(1850,235),(1950,330),(1900,470),(1950,560),(1900,640),(1800,700),(1700,790),(1600,800),(1500,850),(1400,800),(1350,700),(1360,550),(1300,480)],
 [(950,1536),(980,1420),(1100,1390),(1250,1370),(1380,1280),(1500,1260),(1620,1300),(1700,1370),(1600,1420),(1400,1430),(1380,1536)],
 [(2000,1536),(2050,1400),(2150,1320),(2350,1300),(2450,1350),(2450,1536)],
 [(2450,1536),(2450,1100),(2500,900),(2550,820),(2700,780),(2752,780),(2752,1536)],
 [(2300,560),(2450,470),(2600,500),(2752,520),(2752,800),(2550,820),(2450,700),(2350,650)]]
LAKE=[[(440,420),(470,395),(520,360),(560,345),(640,348),(700,372),(740,395),(790,420),(850,440),(878,455),(860,472),(800,472),(740,465),(700,495),(660,507),(615,492),(560,472),(505,457),(455,447)]]
ELL=[(1245,530,55,25),(1300,875,95,50)]
DELTA=[[(380,1300),(450,1225),(560,1245),(640,1215),(720,1235),(800,1250),(860,1262),(920,1290),(1000,1320),(1080,1290),(1150,1310),(1100,1360),(980,1395),(930,1440),(900,1536),(380,1536)]]
RIVER=[([(700,490),(718,540),(718,585),(745,612),(800,628),(850,648),(890,675),(905,710),(940,745),(1000,770),(1050,800),(1075,840),(1060,890),(1010,935),(950,975),(900,1010),(870,1060),(855,1110),(850,1160),(870,1200),(840,1240)],34),
 ([(1080,875),(1110,890),(1150,870),(1170,830),(1140,800),(1100,760),(1085,730)],26),
 ([(480,950),(495,1000),(530,1050),(580,1080),(610,1110),(620,1150),(600,1190),(560,1215),(500,1225)],30)]
CREEK=[([(1235,420),(1240,480),(1245,505)],14)]
BRIDGE=[(1150,860),(728,575),(850,1085),(905,712),(1068,860),(600,1105),(1000,950)]
mC=mask(lambda d:[d.polygon(p,fill=1) for p in CLOUD])
mM=mask(lambda d:[d.polygon(p,fill=1) for p in MTN])
mL=mask(lambda d:([d.polygon(p,fill=1) for p in LAKE],[d.ellipse((x-a,y-b,x+a,y+b),fill=1) for x,y,a,b in ELL]))
mD=mask(lambda d:[d.polygon(p,fill=1) for p in DELTA])
mR=mask(lambda d:[d.line(p,fill=1,width=w,joint='curve') for p,w in RIVER])
mK=mask(lambda d:[d.line(p,fill=1,width=w,joint='curve') for p,w in CREEK])
ter=np.zeros(HN,np.uint8); elev=np.zeros(HN,np.float32)
rad=int(HEXW*0.42*S)
def frac(m,sl): return float(m[sl].mean())
for i in range(HN):
    x,y=center(i); px,py=int(x*S),int(y*S)
    x0,x1=max(0,px-rad),min(IW,px+rad+1); y0,y1=max(0,py-rad),min(IH,py+rad+1)
    if x0>=x1 or y0>=y1: ter[i]=0; continue
    sl=(slice(y0,y1),slice(x0,x1))
    v=float(V[sl].mean()); vb=float(Vb[sl].mean()); ro=float(RO[sl].mean())
    if frac(mC,sl)>0.5: t=0
    elif frac(mR,sl)>0.3: t=5
    elif frac(mL,sl)>0.45: t=6
    elif frac(mK,sl)>0.25: t=8
    elif frac(mD,sl)>0.5: t=7
    elif frac(mM,sl)>0.5: t=4 if (ro>0.025 or v<vb-0.02) else 3
    else:
        dv=v-vb
        if dv<-0.07: t=2
        elif ro>0.04 or dv<-0.035: t=3
        else: t=1
    ter[i]=t
# cầu, bến đò ở chỗ đường cắt sông
def hexAt(x,y):
    r0=round(y/HEXP-2/3); best=0; bd=1e18
    for r in range(max(0,r0-1),min(HROWS-1,r0+1)+1):
        c0=round(x/HEXW-0.5-(r%2)*0.5)
        for c in range(max(0,c0-1),min(HCOLS-1,c0+1)+1):
            cx,cy=(c+0.5+(r%2)*0.5)*HEXW,(r+2/3)*HEXP; d=(x-cx)**2+(y-cy)**2
            if d<bd: bd=d; best=r*HCOLS+c
    return best
def nb(i):
    c=i%HCOLS; r=i//HCOLS; d=1 if r%2 else -1
    for x,y in ((c-1,r),(c+1,r),(c,r-1),(c+d,r-1),(c,r+1),(c+d,r+1)):
        if 0<=x<HCOLS and 0<=y<HROWS: yield y*HCOLS+x
for bx,by in BRIDGE:
    X,Y=bx/S,by/S
    for i in range(HN):
        cx,cy=center(i)
        if ter[i] in (5,6) and (cx-X)**2+(cy-Y)**2<=26**2: ter[i]=9
PASS=lambda t:t not in (0,5,6)
# vùng đất bị cô lập: nối bằng bến đò ngắn nhất
def comps():
    lab=-np.ones(HN,int); cs=[]
    for i in range(HN):
        if lab[i]>=0 or not PASS(ter[i]): continue
        st=[i]; lab[i]=len(cs); L=[i]
        while st:
            a=st.pop()
            for b in nb(a):
                if lab[b]<0 and PASS(ter[b]): lab[b]=len(cs); st.append(b); L.append(b)
        cs.append(L)
    return lab,cs
for it in range(30):
    lab,cs=comps(); main=max(range(len(cs)),key=lambda k:len(cs[k]))
    small=[k for k in range(len(cs)) if k!=main]
    if not small: break
    k=min(small,key=lambda k:-len(cs[k]))
    if len(cs[k])<4:
        for a in cs[k]: ter[a]=6 if ter[a]!=0 else 0
        continue
    # BFS qua ô nước tới vùng chính
    prev={a:None for a in cs[k]}; fr=list(cs[k]); hit=None
    while fr and hit is None:
        nx=[]
        for a in fr:
            for b in nb(a):
                if b in prev: continue
                if ter[b] in (5,6): prev[b]=a; nx.append(b)
                elif PASS(ter[b]) and lab[b]==main: prev[b]=a; hit=b; break
            if hit is not None: break
        fr=nx
    if hit is None:
        for a in cs[k]: ter[a]=0
        continue
    a=prev[hit]
    while a is not None and ter[a] in (5,6): ter[a]=9; a=prev[a]
lab,cs=comps(); print('bến đò:',int((ter==9).sum()),'vùng đất liền:',sorted([len(c) for c in cs],reverse=True)[:5])
cnt=np.bincount(ter,minlength=10); print('đếm loại:',list(cnt))
s=''.join(chr(48+t) for t in ter)
open('src/game/core2/32-dia-hinh-du-lieu.js','w').write(
 '// Sinh bởi tools/dia_hinh.py từ ảnh bản đồ. Mỗi ký tự là loại địa hình một ô lục giác (hàng ngang, %d cột x %d hàng).\n'
 '// 0 Vân hải, 1 Đồng bằng, 2 Rừng, 3 Đồi, 4 Núi cao, 5 Sông, 6 Hồ, 7 Đầm lầy, 8 Suối, 9 Bến đò\n'
 'const MAP_TER=%r;\n'%(HCOLS,HROWS,s))
if '--xem' in sys.argv:
    out=sys.argv[sys.argv.index('--xem')+1]
    col=[(255,255,255),(240,230,90),(20,120,30),(170,120,60),(110,60,40),(30,90,255),(0,40,200),(90,180,170),(120,200,255),(255,0,255)]
    im=day.copy().convert('RGBA'); ov=Image.new('RGBA',im.size,(0,0,0,0)); d=ImageDraw.Draw(ov)
    for i in range(HN):
        x,y=center(i); r=HEXW*0.5*S
        d.regular_polygon((x*S,y*S,r),6,rotation=30,fill=col[ter[i]]+(110,))
    O=Image.alpha_composite(im,ov).convert("RGB"); O.resize((1376,768)).save(out,quality=85); O.crop((380,330,1200,1300)).save(out.replace(".jpg","-c.jpg"),quality=80)
