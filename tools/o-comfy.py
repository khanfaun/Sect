# Ảnh từng ô lục giác VẼ ĐÈ LÊN BẢN ĐỒ THẬT: cắt mảnh bản đồ, vẽ khung lục giác đỏ, Qwen vẽ vật vào trong khung,
# rồi giữ phần đã đổi (so trước/sau) trong lục giác -> ảnh trong suốt hoà vào mọi chỗ trên bản đồ.
# python tools/o-comfy.py [tên ...]   -> src/assets-goc/dia-diem/o2/<tên>.png (gốc) và src/assets/ui/o-<tên>.webp
import json, os, sys, time, urllib.request, importlib.util
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
def nap(f):
    sp = importlib.util.spec_from_file_location(f, os.path.join(os.path.dirname(__file__), f + '.py')); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return m
nv = nap('nv-comfy'); dd = nap('dd-comfy')
G = 'src/assets-goc/dia-diem/o2/'; os.makedirs(G, exist_ok=True)
MAP = Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp')  # bản đồ đã khám phá trong game (mapImg 'bk', ui/05-gfx.js).convert('RGB')
N = 512; R = 120  # bán kính lục giác (đỉnh nhọn) trong khung 512
def hexpts(cx, cy, r): return [(cx + r * np.cos(np.radians(a)), cy + r * np.sin(np.radians(a))) for a in (-90, -30, 30, 90, 150, 210)]
# chỗ lấy nền: điểm (x,y) trên ảnh bản đồ gốc theo loại đất cần nền
NEN = {'dong': (2300, 860), 'nui': (1540, 700), 'rung': (1200, 1125), 'nuoc': (1300, 872)}
def nen(k):
    x, y = NEN[k]; s = 46  # ~2 ô bản đồ mỗi bên -> phóng lên 512
    return MAP.crop((x - s, y - s, x + s, y + s)).resize((N, N), Image.BICUBIC).filter(ImageFilter.SMOOTH)
P = ('Image 1 is an old sepia parchment ink-wash fantasy world map with a red hexagon outline drawn on it. Paint {t} INSIDE the red hexagon, '
     'in exactly the same painting style, colors and brushwork as the surrounding map, as if it was always part of this painted map. '
     'The painted things have a natural organic outline (NOT a hexagon-shaped block), with small gaps of map ground between them. Remove the red outline completely. Keep everything outside the hexagon unchanged. High bird view. No text.')
def lam(ten, txt, loai, seed):
    b = nen(loai); m = b.copy(); ImageDraw.Draw(m).polygon(hexpts(N / 2, N / 2, R), outline=(230, 20, 20), width=5)
    fn = nv.upload('o2-' + ten + '.png', m)
    pid = nv.post('/prompt', json.dumps({'prompt': nv.wf(fn, P.format(t=txt), seed, 'o2-' + ten)}).encode(), 'application/json')['prompt_id']
    return ten, b, pid
def lay(ten, b, pid):
    while True:
        hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
        if hi and hi.get('outputs'): break
        time.sleep(1.5)
    f = hi['outputs']['15']['images'][0]
    urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G + ten + '.png')
    tach(ten, b)
def tach(ten, b):
    a = Image.open(G + ten + '.png').convert('RGB').resize((N, N))
    # mặt nạ: lục giác nới 12%, mép mờ; nhân với độ đổi màu so với nền (chỗ không vẽ gì -> trong suốt)
    hm = Image.new('L', (N, N), 0); ImageDraw.Draw(hm).polygon(hexpts(N / 2, N / 2, R * 1.12), fill=255); hm = np.asarray(hm.filter(ImageFilter.GaussianBlur(14))) / 255
    d = np.abs(np.asarray(a, np.float32) - np.asarray(b, np.float32)).max(axis=2)
    d = np.asarray(Image.fromarray(np.clip(d * 3, 0, 255).astype(np.uint8)).filter(ImageFilter.MinFilter(9)).filter(ImageFilter.MaxFilter(13)).filter(ImageFilter.GaussianBlur(4)), np.float32) / 255
    al = np.clip(hm * np.clip(d * 1.6, 0, 1), 0, 1)
    o = Image.fromarray(np.dstack([np.asarray(a), (al * 255).astype(np.uint8)]))
    c = int(R * 1.3); o = o.crop((N // 2 - c, N // 2 - c - 10, N // 2 + c, N // 2 + c - 10)).resize((192, 192), Image.LANCZOS)
    o.save('src/assets/ui/o-' + ten + '.webp', 'WEBP', quality=86, method=6); print('xong', ten, flush=True)
O = {k: v for k, v in dd.O.items()}
LOAI = {'ho': 'nuoc', 'song': 'nuoc', 'bien': 'nuoc', 'dam': 'nuoc', 'nui-1': 'nui', 'nui-2': 'nui', 'hang': 'nui', 'khoang': 'nui', 'tnui': 'nui', 'ai': 'nui', 'thien': 'nui', 'dthien': 'nui', 'rung-1': 'rung', 'rung-2': 'rung'}
if __name__ == '__main__':
    if sys.argv[1:2] == ['tach']:  # chỉ tách lại từ PNG đã có
        for k in sys.argv[2:] or list(O): tach(k, nen(LOAI.get(k, 'dong')))
        sys.exit()
    ids = sys.argv[1:] or list(O)
    job = [lam(k, O[k], LOAI.get(k, 'dong'), 300 + i + int(os.environ.get('SEED', 0))) for i, k in enumerate(ids)]
    for j in job: lay(*j)
