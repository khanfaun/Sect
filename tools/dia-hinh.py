# Phân loại địa hình từng ô lục giác từ ảnh bản đồ (chạy một lần, ra src/game/core2/03b-dia-hinh-du-lieu.js)
# Dùng: python3 tools/dia-hinh.py [--debug thư_mục]
import sys, math
from PIL import Image, ImageDraw, ImageFilter
import numpy as np
ROOT=__file__.rsplit('/tools/',1)[0]
WW,WH=3556,2000; HEXW=30; HEXP=HEXW*0.8660254; HC=118; HR=77
sd=Image.open(ROOT+'/src/assets-goc/ban-do/Summer-day.webp').convert('RGB').resize((WW//2,WH//2))
bk=Image.open(ROOT+'/src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('L').resize((WW//2,WH//2))
A=np.asarray(sd).astype(float); L=np.asarray(bk).astype(float)
R,G,B=A[...,0],A[...,1],A[...,2]; mx=A.max(-1); mn=A.min(-1); sat=(mx-mn)/(mx+1)
bc=np.asarray(Image.open(ROOT+'/src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB').resize((WW//2,WH//2))).astype(float)
water=(((bc[...,0]-bc[...,2])<40)&(bc.mean(-1)>125)).astype(float)
sky=((B>R+30)&(mx<175)).astype(float)
cloud=((mx>185)&(sat<0.17)).astype(float)
cloud2=((mx>150)&(sat<0.12)&(B>=R)).astype(float)
cloud=np.maximum(np.maximum(cloud,cloud2)*(1-water),sky)
dark=(255-L)/255.0
Lb=np.asarray(bk.filter(ImageFilter.GaussianBlur(10))).astype(float)
std=np.abs(L-Lb)/255.0
lum=(0.3*R+0.59*G+0.11*B)
def center(i):
    c=i%HC; r=i//HC; return ((c+0.5+(r%2)*0.5)*HEXW,(r+2/3)*HEXP)
N=HC*HR; F=np.zeros((N,6))
for i in range(N):
    x,y=center(i); X,Y=int(x/2),int(y/2); s=7
    a,b=max(0,Y-s),min(WH//2,Y+s); c,d=max(0,X-s),min(WW//2,X+s)
    F[i]=[water[a:b,c:d].mean(),cloud[a:b,c:d].mean(),dark[a:b,c:d].mean(),std[a:b,c:d].mean(),lum[a:b,c:d].std()/255,G[a:b,c:d].mean()-R[a:b,c:d].mean()]
def nb(i):
    c=i%HC; r=i//HC; d=1 if r%2 else -1; o=[]
    for x,y in [(c-1,r),(c+1,r),(c,r-1),(c+d,r-1),(c,r+1),(c+d,r+1)]:
        if 0<=x<HC and 0<=y<HR: o.append(y*HC+x)
    return o
def smooth(v,k=1):
    v=v.copy()
    for _ in range(k):
        w=v.copy()
        for i in range(N):
            n=nb(i); w[i]=(v[i]*2+sum(v[j] for j in n))/(2+len(n))
        v=w
    return v
rough=smooth(F[:,2]*0.6+F[:,3]*2.2+F[:,4]*1.2,3)   # độ gồ ghề vùng rộng ~ độ cao
dk=F[:,2]
# 0 vân hải (không đi được), 1 đồng bằng, 2 rừng, 3 núi cao, 4 sông, 5 hồ, 6 đồi, 7 đầm lầy
ter=np.ones(N,dtype=int)
q_hi=np.quantile(rough,0.80); q_mid=np.quantile(rough,0.55)
for i in range(N):
    x,y=center(i)
    edge=x<135 or x>WW-135 or y<120 or y>WH-120
    w,cl=F[i,0],F[i,1]
    if edge or (cl>0.55 and w<0.2): ter[i]=0; continue
    if w>0.33: ter[i]=4; continue
    if rough[i]>q_hi: ter[i]=3
    elif rough[i]>q_mid: ter[i]=6
    elif dk[i]>0.42 or F[i,3]>0.075: ter[i]=2
    else: ter[i]=1
# mây giữa đất liền (không nối ra rìa) không phải vân hải: cạnh nước thành nước, còn lại là núi mù sương
from collections import deque
reach=np.zeros(N,bool);dq=deque()
for i in range(N):
    c=i%HC;r=i//HC
    if ter[i]==0 and (c==0 or r==0 or c==HC-1 or r==HR-1): reach[i]=True;dq.append(i)
while dq:
    u=dq.popleft()
    for v in nb(u):
        if ter[v]==0 and not reach[v]: reach[v]=True;dq.append(v)
for _ in range(4):
    for i in range(N):
        if ter[i]==0 and not reach[i]:
            ter[i]=4 if sum(1 for j in nb(i) if ter[j]==4)>=2 else (3 if rough[i]>q_mid else 1)
# sông vs hồ: nước có nhiều nước xung quanh (2 vòng) là hồ
for i in range(N):
    if ter[i]!=4: continue
    ring=set(nb(i))
    for j in list(ring): ring|=set(nb(j))
    ring.discard(i)
    if sum(1 for j in ring if ter[j]==4)>=11: ter[i]=5
# đầm lầy: đất thấp ven nhiều nước
for i in range(N):
    if ter[i] in (1,2) and sum(1 for j in nb(i) if ter[j] in (4,5))>=3: ter[i]=7
# độ cao 0..9
el=np.clip((rough-rough.min())/(np.quantile(rough,0.99)-rough.min())*9,0,9).round().astype(int)
for i in range(N):
    if ter[i] in (4,5,7): el[i]=0
# đại khu vực: 0 Trung Châu,1 Đông,2 Nam,3 Tây,4 Bắc — theo vị trí, ranh uốn theo nhiễu
rng=np.random.default_rng(7)
reg=np.full(N,-1)
cx,cy=WW*0.47,WH*0.52
for i in range(N):
    if ter[i]==0: continue
    x,y=center(i); dx=(x-cx)/(WW*0.5); dy=(y-cy)/(WH*0.5)
    wob=0.07*math.sin(x/170)+0.06*math.cos(y/140)+0.04*math.sin((x+y)/90)
    if dx*dx/0.36+dy*dy/0.30<1+wob*3: reg[i]=0; continue
    ang=math.atan2(dy,dx)+wob*1.5
    a=math.degrees(ang)
    reg[i]=1 if -40<=a<45 else 2 if 45<=a<135 else 3 if (a>=135 or a<-140) else 4
out=''.join(str(t) for t in ter)
eo=''.join(str(e) for e in el)
ro=''.join('x' if r<0 else str(r) for r in reg)
js='// Sinh tự động bởi tools/dia-hinh.py từ ảnh bản đồ. Đừng sửa tay.\n'
js+='const MAPD={hc:%d,hr:%d,ter:"%s",el:"%s",reg:"%s"};\n'%(HC,HR,out,eo,ro)
open(ROOT+'/src/game/core2/03b-dia-hinh-du-lieu.js','w').write(js)
print('đếm loại',{k:int((ter==k).sum()) for k in range(8)},'vùng',{k:int((reg==k).sum()) for k in range(-1,5)})
if '--debug' in sys.argv:
    d=sys.argv[sys.argv.index('--debug')+1]
    im=Image.open(ROOT+'/src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB').resize((WW//2,WH//2))
    ov=Image.new('RGBA',im.size,(0,0,0,0)); dr=ImageDraw.Draw(ov)
    C={0:(255,255,255,150),1:(240,230,80,70),2:(0,120,0,110),3:(120,60,20,150),4:(0,120,255,140),5:(0,0,200,160),6:(200,120,40,100),7:(0,160,140,130)}
    for i in range(N):
        x,y=center(i); x/=2;y/=2; r=HEXW/2/2
        pts=[(x+r*math.cos(math.radians(a)),y+r*math.sin(math.radians(a))) for a in range(-90,270,60)]
        dr.polygon(pts,fill=C[ter[i]])
    Image.alpha_composite(im.convert('RGBA'),ov).convert('RGB').save(d+'/ter.jpg',quality=82)
    ov=Image.new('RGBA',im.size,(0,0,0,0)); dr=ImageDraw.Draw(ov)
    RC=[(255,0,0,90),(0,0,255,90),(0,200,0,90),(255,200,0,90),(200,0,200,90)]
    for i in range(N):
        if reg[i]<0: continue
        x,y=center(i); x/=2;y/=2; r=HEXW/4
        pts=[(x+r*math.cos(math.radians(a)),y+r*math.sin(math.radians(a))) for a in range(-90,270,60)]
        dr.polygon(pts,fill=RC[reg[i]])
    Image.alpha_composite(im.convert('RGBA'),ov).convert('RGB').save(d+'/reg.jpg',quality=82)
