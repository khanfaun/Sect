# Nén ảnh bản đồ: đọc bản gốc ở src/assets-goc/ban-do, ghi bản nhẹ vào src/assets/ban-do (bản này mới được nhúng vào game).
# Chạy: python3 tools/nen_anh.py [rộng=2400] [chất_lượng=68]
import sys,glob,os
from PIL import Image
W=int(sys.argv[1]) if len(sys.argv)>1 else 2400; Q=int(sys.argv[2]) if len(sys.argv)>2 else 68
tot=0
for f in sorted(glob.glob('src/assets-goc/ban-do/*.webp')):
    if 'Backup' in f: continue
    im=Image.open(f).convert('RGB'); im=im.resize((W,round(im.height*W/im.width)),Image.LANCZOS)
    o='src/assets/ban-do/'+os.path.basename(f); im.save(o,'WEBP',quality=Q,method=6); tot+=os.path.getsize(o)
print('tổng ảnh bản đồ: %.2f MB'%(tot/1e6))
