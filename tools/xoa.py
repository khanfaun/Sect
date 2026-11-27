# xoá vùng vẽ của khung k về nền: python work/xoa.py <q> <k> [k...]
import sys,json,os,numpy as np
from PIL import Image
from scipy import ndimage as ndi
q=sys.argv[1];d=f'work/quan-{q}/'
lam=np.asarray(Image.open(d+'lam.png').convert('RGB')).copy();nen=np.asarray(Image.open(d+'nen.png').convert('RGB'))
for k in sys.argv[2:]:
    v=json.load(open(d+f'ra/v{k}.json'));m=np.asarray(Image.open(d+f'ra/qv{q}-v{k}-mn.png').convert('L'))>8
    m=ndi.gaussian_filter(ndi.binary_dilation(m,iterations=24).astype(np.float32),6)[...,None]
    x,y=v['x'],v['y'];h,w=m.shape[:2]
    a=lam[y:y+h,x:x+w].astype(np.float32);b=nen[y:y+h,x:x+w].astype(np.float32)
    lam[y:y+h,x:x+w]=(a*(1-m)+b*m).astype(np.uint8)
    if os.path.exists(d+f'ra/done-{k}'):os.remove(d+f'ra/done-{k}')
    print('xoá',q,k,v['id'])
Image.fromarray(lam).save(d+'lam.png')
