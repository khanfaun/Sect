import sys,glob,os
from PIL import Image
q=sys.argv[1];fs=sorted(glob.glob(f'work/quan-{q}/so-*.png'))
for i in range(0,len(fs),4):
    ims=[]
    for f in fs[i:i+4]:
        a=Image.open(f);w,h=a.size;g=a.crop((0,0,w//3,h));r=a.crop((2*w//3,0,w,h))
        s=min(1,520/h);g=g.resize((int(g.width*s),int(h*s)));r=r.resize((int(r.width*s),int(h*s)))
        c=Image.new('RGB',(g.width*2+6,g.height),'red');c.paste(g,(0,0));c.paste(r,(g.width+6,0));ims.append((os.path.basename(f),c))
    W=max(c.width for _,c in ims);H=sum(c.height+4 for _,c in ims)
    o=Image.new('RGB',(W,H),'white');y=0
    for n,c in ims:o.paste(c,(0,y));y+=c.height+4
    o.save(f'{sys.argv[2]}/soat-{q}-{i//4}.png');print(f'soat-{q}-{i//4}.png',[n for n,_ in ims])
