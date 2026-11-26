# Sinh địa hình theo khí hậu (bắc lạnh, tây khô, nam ẩm, đông hoang dã) từ MAPD -> content/rules/mapd-bio.js
# Dùng: python tools/sinh-thai.py [thư_mục_ảnh_xem_trước]
import json,math,sys,random
from PIL import Image,ImageDraw
from collections import Counter
S=sys.argv[1] if len(sys.argv)>1 else None  # thư mục ảnh xem trước (tuỳ chọn)
import re,os
ROOT=os.path.join(os.path.dirname(os.path.abspath(__file__)),'..')
src=open(os.path.join(ROOT,'content/rules/mapd.js'),encoding='utf-8').read()
f=lambda k:re.search(k+r':"([^"]*)"',src).group(1)
T=[int(x) for x in f('ter')];E=[int(x) for x in f('el')];RG=[-1 if x=='x' else int(x) for x in f('reg')]
HC,HR=118,77;N=HC*HR
# 0 Vân hải 1 Đồng bằng 2 Rừng 3 Núi cao 4 Sông 5 Hồ 6 Đồi 7 Đầm lầy
NAMES=['Vân hải','Đồng bằng','Rừng','Núi cao','Sông','Hồ','Đồi','Đầm lầy',
 'Tuyết nguyên','Rừng lá kim','Núi tuyết','Hồ băng','Sa mạc','Hoang mạc đá','Núi đá đỏ','Ốc đảo','Rừng nhiệt đới','Trúc lâm','Thảo nguyên','Rừng nguyên sinh','Đồi tuyết','Hồ sen']
def nb(i):
  c=i%HC;r=i//HC;o=r%2
  for dc,dr in ([(-1,0),(1,0),(-1+o,-1),(o,-1),(-1+o,1),(o,1)]):
    cc,rr=c+dc,r+dr
    if 0<=cc<HC and 0<=rr<HR: yield rr*HC+cc
def vn(x,y,s,seed):
  def h(a,b):
    random.seed(a*7919+b*104729+seed);return random.random()
  x/=s;y/=s;x0,y0=int(x),int(y);fx,fy=x-x0,y-y0
  fx=fx*fx*(3-2*fx);fy=fy*fy*(3-2*fy)
  a=h(x0,y0)*(1-fx)+h(x0+1,y0)*fx;b=h(x0,y0+1)*(1-fx)+h(x0+1,y0+1)*fx
  return a*(1-fy)+b*fy
def fbm(x,y,seed): return 0.6*vn(x,y,9,seed)+0.4*vn(x,y,4,seed+5)
# region centroids -> soft climate
cold=[0]*N;dry=[0]*N;wet=[0]*N;east=[0]*N
water=set(i for i in range(N) if T[i] in (4,5))
dw=[99]*N
from collections import deque
q=deque()
for i in water: dw[i]=0;q.append(i)
while q:
  i=q.popleft()
  for j in nb(i):
    if dw[j]>dw[i]+1: dw[j]=dw[i]+1;q.append(j)
for i in range(N):
  c=i%HC;r=i//HC;nx=c/HC;ny=r/HR;n1=fbm(c,r,11)-0.5;n2=fbm(c,r,23)-0.5;n3=fbm(c,r,37)-0.5
  cold[i]=(0.42-ny)*2.2+n1*0.9+(0.35 if RG[i]==4 else 0)+E[i]*0.03
  dry[i]=(0.30-nx)*2.6+n2*0.9+(0.45 if RG[i]==3 else 0)-(0.5 if dw[i]<=1 else 0)
  wet[i]=(ny-0.62)*2.4+n3*0.8+(0.4 if RG[i]==2 else 0)+(0.35 if dw[i]<=2 else 0)-E[i]*0.03
  east[i]=(nx-0.62)*2.4+n1*0.6+(0.4 if RG[i]==1 else 0)
B=T[:]
for i in range(N):
  t=T[i];c=i%HC;r=i//HC;nz=fbm(c,r,51)
  if t==0: continue
  if t in (1,6) and dw[i]<=1 and E[i]<=3 and r/HR>0.72 and nz>0.3: B[i]=7; continue
  if cold[i]>0.45:
    B[i]={1:8,2:9,3:10,6:20,5:11,7:8}.get(t,t)
  elif cold[i]>0.15:
    B[i]={2:9,3:10 if E[i]>=7 else 3,6:20 if nz>0.55 else 6}.get(t,t)
  elif dry[i]>0.45:
    B[i]={1:12,6:13,3:14,2:13 if nz>0.4 else 2,7:12}.get(t,t)
    if B[i] in (12,13) and dw[i]==1: B[i]=15
  elif dry[i]>0.2:
    B[i]={1:13 if nz>0.5 else 1,6:13,3:14 if nz>0.55 else 3}.get(t,t)
  elif wet[i]>0.35:
    B[i]={2:16,1:7 if (dw[i]<=1 and E[i]<=3) else (16 if nz>0.72 else 1),5:21,6:17 if nz>0.65 else 6}.get(t,t)
  elif east[i]>0.3:
    B[i]={1:18 if nz<0.55 else 19 if nz>0.7 else 18,2:19}.get(t,t)
  else:
    if t==2 and nz>0.6 and (RG[i]in(0,2)): B[i]=17
  if t==3 and E[i]>=9 and B[i]==3 and cold[i]>-0.15: B[i]=10  # đỉnh cao có tuyết
oas=[]
for i in sorted(range(N),key=lambda i:-fbm(i%HC,i//HC,77)):
  if B[i]==12 and all(abs(i%HC-o%HC)+abs(i//HC-o//HC)>14 for o in oas): oas.append(i)
  if len(oas)>=5: break
for o in oas:
  B[o]=15
  for j in nb(o):
    if B[j] in (12,13) and fbm(j%HC,j//HC,9)>0.45: B[j]=15
B36='0123456789abcdefghijklmnopqrstuvwxyz'
open(os.path.join(ROOT,'content/rules/mapd-bio.js'),'w',encoding='utf-8').write(
  '// Sinh tự động bởi tools/sinh-thai.py từ MAPD (địa hình theo khí hậu từng vùng). Đừng sửa tay.\n'
  '// Mỗi ký tự (cơ số 36) là chỉ số trong BIO_N (content/rules/sinh-thai.js).\n'
  'const MAPD_BIO="'+''.join(B36[b] for b in B)+'";\n')
if not S:
  for reg in range(-1,5): print(reg,[(NAMES[k],v) for k,v in Counter(B[i] for i in range(N) if RG[i]==reg).most_common(8)])
  sys.exit(0)
col={0:(205,215,232),1:(165,200,105),2:(45,115,50),3:(125,112,100),4:(60,125,210),5:(40,95,185),6:(160,155,85),7:(85,115,85),
 8:(225,235,240),9:(30,80,70),10:(250,252,255),11:(170,215,235),12:(232,200,120),13:(190,155,100),14:(170,90,60),15:(90,190,140),16:(20,140,60),17:(120,175,80),18:(195,205,95),19:(15,75,30),20:(195,205,200),21:(110,170,200)}
W=14;P=W*0.866
im=Image.new('RGB',(int((HC+1)*W),int((HR+1)*P)+150),'white');dr=ImageDraw.Draw(im)
for i in range(N):
  c=i%HC;r=i//HC;x=(c+.5+(r%2)*.5)*W;y=(r+2/3)*P;k=0.8+0.03*E[i]
  pts=[(x+W/1.732*math.cos(math.pi/6+a*math.pi/3)*0.92,y+W/1.732*math.sin(math.pi/6+a*math.pi/3)*0.92) for a in range(6)]
  dr.polygon(pts,fill=tuple(max(0,min(255,int(v*k))) for v in col[B[i]]))
from PIL import ImageFont
try: f=ImageFont.truetype('arial.ttf',15)
except: f=None
cnt=Counter(B);y0=int((HR+1)*P)+8
for k,n in enumerate(NAMES):
  x=10+(k%6)*275;y=y0+(k//6)*32
  dr.rectangle([x,y,x+22,y+22],fill=col[k],outline='black');dr.text((x+28,y+3),f'{n} ({cnt.get(k,0)})',fill='black',font=f)
im.save(S+'/sinh-thai.png')
for reg in range(-1,5): print(reg,[(NAMES[k],v) for k,v in Counter(B[i] for i in range(N) if RG[i]==reg).most_common(8)])
