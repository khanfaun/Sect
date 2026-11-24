# Tách cổ ra thành lớp riêng. Đọc ảnh gốc ở src/assets-goc/ch-goc, ghi ra src/assets/ui:
#  - ch-of-<áo>.webp  : áo đã bỏ phần cổ/da (để trống)
#  - ch-neck-<áo>.webp: mặt nạ cổ (vẽ dưới áo, tô màu da của đầu bằng CSS)
#  - in ra màu da từng đầu để dán vào SKIN trong NhanVatThien.jsx
import glob,os,numpy as np
from PIL import Image
from scipy import ndimage as ndi
G='src/assets-goc/ch-goc/';O='src/assets/ui/'
def skin(a):
    r,g,b,al=[a[...,i].astype(float) for i in range(4)]
    mx=a[...,:3].max(2).astype(float);mn=a[...,:3].min(2).astype(float)
    d=mx-mn+1e-6;s=(mx-mn)/(mx+1e-6)
    h=np.where(mx==r,((g-b)/d)%6,0)*60
    return (al>128)&(r>g)&(g>b)&(h>10)&(h<34)&(s>.15)&(s<.55)&(mx>130)
def comp(a):
    lab,n=ndi.label(skin(a));best=None
    for i in range(1,n+1):
        m=lab==i;ys=np.where(m.any(1))[0]
        if m.sum()>300 and (best is None or ys[0]<best[0]):best=(ys[0],m)
    return best[1]
U=None  # hợp mọi lỗ cổ của các áo
for f in sorted(glob.glob(G+'ch-of-*.webp')):
    name=os.path.basename(f)[6:-5]
    a=np.array(Image.open(f).convert('RGBA'));m=comp(a)
    if name=='hero': m=ndi.binary_fill_holes(ndi.binary_dilation(m,iterations=3))  # áo này có cả đầu hói dính sẵn
    cut=ndi.binary_dilation(m,iterations=2)
    neck=ndi.binary_dilation(m,iterations=5)
    neck[:,:270]=False;neck[:,370:]=False
    if name=='hero': neck[:125]=False  # chỉ giữ phần cổ, bỏ phần đầu
    ys=np.where(neck.any(1))[0];top=ys[0]
    # kéo cổ lên trên để chui dưới cằm (đầu vẽ đè lên)
    row=neck[top+2].copy()
    for y in range(95,top+2): neck[y]=row
    U=neck if U is None else (U|neck)
    a2=a.copy();a2[cut,3]=0
    Image.fromarray(a2).save(O+'ch-of-'+name+'.webp',quality=92,method=6)
    print('ao',name,'cổ từ y',top)
# Cổ cho từng đầu: ảnh gen bằng ComfyUI (Qwen Image Edit 2511, đầu trên nền xám -> thêm cổ, vai trần),
# lưu ở ch-goc/neck-gen-<đầu>.png (1024px). Lấy phần nằm trong hợp các lỗ cổ, vẽ dưới áo, đầu đè lên.
al=ndi.gaussian_filter(U.astype(float),1.0)
for f in sorted(glob.glob(G+'neck-gen-*.png')):
    t=os.path.basename(f)[9:-4]
    g=np.array(Image.open(f).convert('RGB').resize((640,640),Image.LANCZOS))
    h=np.array(Image.open(G+'ch-head-'+t+'.webp').convert('RGBA'));ys=np.where(skin(h).any(1))[0]
    a2=al.copy();a2[:max(0,ys[-1]-45)]=0  # chỉ từ dưới cằm lên chút (đầu che), không lòi ra quanh tóc
    nk=np.zeros((640,640,4),np.uint8);nk[...,:3]=g;nk[...,3]=(a2*255).astype(np.uint8)
    Image.fromarray(nk).save(O+'ch-neck-'+t+'.webp',quality=92,method=6)
    print('co',t)
