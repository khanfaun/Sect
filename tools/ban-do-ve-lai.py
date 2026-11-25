# Vẽ lại bản đồ đã khám phá bằng Qwen Image 2.1 (bản đầy đủ) theo từng mảnh có gối, giữ nguyên vị trí địa hình,
# phóng 1.5 lần; bản chưa khám phá làm ra từ bản mới (nét mờ) cho đồng bộ.
# python tools/ban-do-ve-lai.py ve [i ...]   -> src/assets-goc/ban-do/ve/<i>.png  (mảnh)
# python tools/ban-do-ve-lai.py ghep          -> ghép mảnh thành ảnh mới (scratchpad/OUT)
import json, os, sys, time, urllib.request, importlib.util
import numpy as np
from PIL import Image
sp = importlib.util.spec_from_file_location('nv', 'tools/nv-comfy.py'); nv = importlib.util.module_from_spec(sp); sp.loader.exec_module(nv)
AN = os.environ.get('BAN') == 'an'  # BAN=an: vẽ lại bản CHƯA khám phá từ chính nó (giữ kiểu phác mờ và hình trang trí)
SRC = 'src/assets-goc/ban-do/' + ('Hidden-map.webp' if AN else 'Hidden-map - Backup.webp'); TMP = 'src/assets-goc/ban-do/' + ('ve-an/' if AN else 've/'); os.makedirs(TMP, exist_ok=True)
W, H, T, OV = 4128, 2304, 1024, 160
xs = list(range(0, W - T, T - OV)) + [W - T]; ys = list(range(0, H - T, T - OV)) + [H - T]
TILES = [(x, y) for y in ys for x in xs]
P = ('Repaint this piece of a hand-painted old sepia parchment ink-wash fantasy map at higher quality and sharper resolution. '
     'Keep the composition EXACTLY: every mountain, ridge, river, lake, road, tree and cloud stays at the same position, same size and same shape; do not add or remove anything, do not move anything. '
     'Use crisp, confident brown-black ink linework with natural brush strokes, soft sepia and faded grey-green ink washes on aged paper, consistent with a classical Chinese shan-shui map. No text.')
if AN: P = ('Repaint this piece of a faded old sepia parchment sketch map at higher quality and sharper resolution. '
     'Keep the composition EXACTLY: every mountain, river, tree, building, creature and ornament stays at the same position, same size and same shape; do not add or remove anything. '
     'Keep it a light, faded, delicate pencil-and-ink sketch on stained aged paper: thin pale brown lines, very light washes, low contrast, same pale colors as the original. No new text.')
def ve(ids):
    big = Image.open(SRC).convert('RGB').resize((W, H), Image.BICUBIC)
    pend = []
    for i in ids:
        x, y = TILES[i]; fn = nv.upload(f'bd-ve-{"an-" if AN else ""}{i}.png', big.crop((x, y, x + T, y + T)))
        w = nv.wf(fn, P, 900 + i, f'bd-ve-{"an-" if AN else ""}{i}')
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        w['8']['inputs']['resolution'] = T
        pend.append((i, nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']))
    for i, pid in pend:
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit(f'loi {i}')
            time.sleep(3)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", TMP + f'{i}.png')
        print('xong', i, Image.open(TMP + f'{i}.png').size, flush=True)
def mo(a, r=24):
    from PIL import ImageFilter
    return np.asarray(Image.fromarray(a.astype(np.uint8)).filter(ImageFilter.GaussianBlur(r)), np.float32)
def ghep(out):
    big = np.asarray(Image.open(SRC).convert('RGB').resize((W, H), Image.BICUBIC), np.float32)
    acc = np.zeros((H, W, 3), np.float32); wt = np.zeros((H, W, 1), np.float32)
    r = np.minimum(np.arange(T) + 1, T - np.arange(T)).astype(np.float32); r = np.clip(r / OV, 0.02, 1)
    m = (r[:, None] * r[None, :])[..., None]
    for i, (x, y) in enumerate(TILES):
        t = np.asarray(Image.open(TMP + f'{i}.png').convert('RGB').resize((T, T), Image.LANCZOS), np.float32)
        g = big[y:y + T, x:x + T]; t = t - mo(t) + mo(g)  # giữ tông màu mảng lớn của bản cũ, lấy nét mới
        acc[y:y + T, x:x + T] += t * m; wt[y:y + T, x:x + T] += m
    Image.fromarray(np.clip(acc / wt, 0, 255).astype(np.uint8)).save(out)
def an(src, out):
    """Bản chưa khám phá: nét của bản mới in mờ lên giấy trơn (Transition-map), không màu."""
    a = np.asarray(Image.open(src).convert('RGB'), np.float32) / 255
    L = a @ np.array([0.3, 0.59, 0.11], np.float32)
    nen = mo(L[..., None].repeat(3, 2) * 255, 40)[..., 0] / 255
    muc = np.clip((nen - L) / np.maximum(nen, 0.2), 0, 1) ** 0.9   # độ đậm nét so với giấy quanh nó
    giay = np.asarray(Image.open('src/assets-goc/ban-do/Transition-map.webp').convert('RGB').resize((a.shape[1], a.shape[0]), Image.BICUBIC), np.float32) / 255
    mau = np.array([0.33, 0.24, 0.15], np.float32)  # mực nâu nhạt
    o = giay * (1 - 0.62 * muc[..., None]) + mau * 0.62 * muc[..., None] * 0.35
    Image.fromarray(np.clip(o * 255, 0, 255).astype(np.uint8)).save(out)
if __name__ == '__main__':
    c = sys.argv[1]
    if c == 've': ve([int(a) for a in sys.argv[2:]] or list(range(len(TILES))))
    elif c == 'ghep': ghep(sys.argv[2])
    elif c == 'an': an(sys.argv[2], sys.argv[3])
    print(len(TILES), 'manh')
