# Ảnh địa điểm NGUYÊN KHỐI trên bản đồ: Qwen Image 2.1 (bản đầy đủ) vẽ thẳng lên mảnh bản đồ đã khám phá,
# rồi chỉ giữ phần nhà cửa / vật được vẽ thêm (không nền đất) -> src/assets/ui/map-<loại>-<hình>.webp (vd map-thanh-7a)
# Vẽ ĐÚNG vào cụm ô theo hình mẫu (HINH) mà game dùng khi đặt địa điểm; cỡ 64 điểm ảnh mỗi ô, tâm ảnh = tâm ô gốc (ui/05-gfx.js).
# python tools/dd2-comfy.py [khoá ...]     |   python tools/dd2-comfy.py tach [khoá ...]  (tách lại, không vẽ lại)
import json, os, sys, time, urllib.request, importlib.util
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
sp = importlib.util.spec_from_file_location('nv', 'tools/nv-comfy.py'); nv = importlib.util.module_from_spec(sp); sp.loader.exec_module(nv)
G = 'src/assets-goc/dia-diem/v2/'; os.makedirs(G, exist_ok=True)
MAP = Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB')
N = 1536; CROP = 576; K = N / CROP; CELL = 30 * MAP.size[0] / 3556 * K   # một ô bản đồ = CELL điểm ảnh trong khung 1024
NEN = {'bang': (3040, 1420), 'nui': (2594, 998)}
# tấm mẫu phong cách: 6 mảnh cắt từ chính bản đồ (núi, rừng, sông, đồi, mái đình nhỏ), cỡ thật -> ảnh 2
MAU_DIEM = [(720, 990), (3000, 1290), (1350, 1260), (2340, 990), (3600, 1500), (2145, 1500)]
def mau():
    o = Image.new('RGB', (1536, 1024))
    for i, (x, y) in enumerate(MAU_DIEM): o.paste(MAP.crop((x - 256, y - 256, x + 256, y + 256)), ((i % 3) * 512, (i // 3) * 512))
    return o
def nen(k):
    x, y = NEN[k]; return MAP.crop((x - CROP // 2, y - CROP // 2, x + CROP // 2, y + CROP // 2)).resize((N, N), Image.LANCZOS)
P = ("Picture 2 is a style reference: six pieces cut from this same map. Picture 1 is a hand-painted old sepia ink-wash fantasy world map seen from a high oblique bird's-eye view. "
     "In picture 1, paint {t} in the CENTER of the picture, about {w}% of the picture width, the same scale as the trees and mountains around. Paint it EXACTLY in the style of picture 2 and of the surrounding map, as if the same artist painted it with the same brush at the same time: the same brown-black ink lines, the same loose brush texture, "
     "muted sepia and faded grey-green washes, the same viewing angle and perspective as the trees and mountains, each building clearly drawn with a few confident ink strokes, not a dense grid. "
     "Do not repaint or recolor the ground, trees or mountains around it; keep everything else in the picture exactly unchanged. No circle, no outline, no frame. No text.")
# Hình mẫu cụm ô (toạ độ trục q,r so với ô gốc) — PHẢI khớp HINH ở src/game/core2/33-the-gioi-mo.js
HINH = {2: {'a': [[0, 0], [1, 0]], 'b': [[0, 0], [0, 1]]}, 3: {'a': [[0, 0], [1, 0], [0, 1]], 'b': [[0, 0], [-1, 0], [1, 0]]},
        4: {'a': [[0, 0], [1, 0], [-1, 1], [0, 1]], 'b': [[0, 0], [-1, 0], [1, 0], [0, 1]]},
        5: {'a': [[0, 0], [-1, 0], [1, 0], [-1, 1], [0, 1]], 'b': [[0, 0], [1, 0], [0, -1], [-1, 1], [0, 1]]},
        7: {'a': [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [-1, 1]], 'b': [[0, 0], [-1, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1]]},
        9: {'a': [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [-1, 1], [2, 0], [-2, 0]], 'b': [[0, 0], [0, -1], [1, -1], [-1, 0], [1, 0], [2, 0], [-1, 1], [0, 1], [1, 1]]},
        12: {'a': [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [-1, 1], [2, 0], [-2, 0], [2, -1], [-2, 1], [1, 1]], 'b': [[0, 0], [1, 0], [-1, 0], [0, -1], [1, -1], [0, 1], [-1, 1], [2, 0], [-2, 0], [-1, -1], [1, 1], [0, 2]]}}
def o_hinh(h): return [[0, 0]] if h == '1' else HINH[int(h[:-1])][h[-1]]
V = {}  # khoá ảnh (map-<khoá>.webp) -> (hình cụm ô, nền, lời tả)
def tang(L, n, buc): return L[min(len(L) - 1, sum(n > x for x in buc))]
TH = ['a small walled Chinese town: grey stone city wall with a gate tower, about ten tiled-roof buildings inside',
      'a walled Chinese town: grey stone city wall with corner towers and a gate tower, about fifteen tiled-roof buildings and a central hall inside',
      'a walled Chinese city: grey stone city walls with several gate towers, a palace hall with a big curved roof and a pagoda among many tiled-roof buildings inside']
TT = ['a small walled cultivator town: pale stone wall with a gate tower, an elegant tiered pagoda and a few curved-roof halls inside',
      'a walled cultivator town: pale stone wall with gate towers, an elegant tiered pagoda and about ten curved-roof halls inside',
      'a walled immortal cultivator city: pale stone walls with gate towers, two tiered pagodas, palace halls on a terrace and a round array platform inside']
TR = ['a tiny hamlet of three thatched cottages and a bamboo clump',
      'a small hamlet of four or five thatched cottages with a small field',
      'a small village of about seven houses with tiled and thatched roofs scattered irregularly among willow trees',
      'a village of about ten houses with tiled roofs scattered irregularly along a road, a small temple and a pailou gate']
TU = ['a tiny cultivator market: three shops with banners', 'a small cultivator market: about five shops with banners and a pagoda-roofed hall, irregular layout',
      'a cultivator trading town: about ten shops and halls with curved roofs scattered irregularly, an alchemy pavilion with smoke, a small pagoda']
TG = ['a small cultivation sect: two temple halls with curved roofs and a stairway', 'a cultivation sect: several temple halls on terraces, a long stone stairway, a bell tower',
      'a large cultivation sect: many halls and pavilions on terraces, a tall pagoda, long stairways',
      'a supreme cultivation sect: a great palace complex of many halls, pagodas and pavilions on terraces, grand stairways and a mountain gate']
for h in ['4a', '4b', '5a', '5b', '7a', '7b']: V[f'thanh-{h}'] = (h, 'bang', tang(TH, int(h[0]), [4, 5]))
for h in ['3a', '3b', '4a', '4b', '5a', '5b']: V[f'tuthanh-{h}'] = (h, 'bang', tang(TT, int(h[0]), [3, 4]))
for h in ['1', '2a', '2b', '3a', '3b', '4a', '4b']: V[f'tran-{h}'] = (h, 'bang', tang(TR, int(h[0]), [1, 2, 3]))
for h in ['1', '2a', '2b', '3a', '3b']: V[f'tutran-{h}'] = (h, 'bang', tang(TU, int(h[0]), [1, 2]))
for h in ['3a', '3b', '5a', '5b', '7a', '7b', '9a', '9b']:
    t = tang(TG, int(h[0]), [3, 5, 7])
    V[f'tongnui-{h}'] = (h, 'nui', t + ', sitting on the summit and upper slopes of this mountain')
    V[f'tong-{h}'] = (h, 'bang', t + ', built on a low rocky hill')
for t, nn, txt in [('cho', 'bang', 'a roadside open-air market with a few tents and stalls'), ('ancu', 'nui', 'a hermit thatched hut with bamboo'),
                   ('ai', 'nui', 'a stone fortress gate tower guarding a mountain pass'), ('dongthien', 'nui', 'a cave grotto with a small shrine and a thin waterfall'),
                   ('thien', 'nui', 'a long stone stairway climbing to a small pavilion'), ('dong', 'nui', 'a dark cave mouth in the rock'),
                   ('bicanh', 'bang', 'a mysterious stone arch portal with swirling mist'), ('ditich', 'bang', 'ancient ruins: broken stone pillars and a sunken altar'),
                   ('como', 'bang', 'an old graveyard with tombstones and a stone stele'), ('phe', 'bang', 'a ruined abandoned village with collapsed roofs'),
                   ('khoang', 'bang', 'a small mine entrance in a rocky outcrop with wooden supports'), ('duoc', 'bang', 'terraced spirit herb gardens with a small herb hut'),
                   ('linhdia', 'bang', 'a spirit spring pond surrounded by old stones'), ('ma', 'bang', 'twisted black rocks and dead trees in a dark haze'),
                   ('sao', 'bang', 'a monster lair: jagged rocks, bones and a dark den')]:
    V[f'{t}-1'] = ('1', nn, txt)
for t, h, txt in [('thanh', '5a', 'the ruins of a walled city: broken walls, burnt and collapsed roofs'),
                  ('tran', '3a', 'a burnt destroyed village: charred house frames'), ('tong', '5a', 'ruins of a sect: collapsed halls and a broken stairway')]:
    V[f'{t}-ruin'] = (h, 'bang', txt)
P = ("Picture 2 is a style reference: six pieces cut from this same map. Picture 1 is a hand-painted old sepia ink-wash fantasy world map seen from a high oblique bird's-eye view, "
     "with a thin red outline marking a piece of land. In picture 1, paint {t} on the land inside the red outline, filling it, at the same scale as the trees and mountains around. "
     "The red outline is only a guide: remove it completely and do not draw a wall or fence along it unless one is described. "
     "Paint it EXACTLY in the style of picture 2 and of the surrounding map, as if the same artist painted it with the same brush at the same time: the same brown-black ink lines, the same loose brush texture, "
     "muted sepia and faded grey-green washes, the same viewing angle and perspective as the trees and mountains, each building drawn with a few confident ink strokes. "
     "Keep everything outside the outline exactly unchanged. No text.")
def vung(h, no=0.0):
    """Mặt nạ cụm ô (ô gốc ở giữa khung); no = nới thêm (đơn vị ô)."""
    m = Image.new('L', (N, N), 0); d = ImageDraw.Draw(m); R = CELL / np.sqrt(3) * (1 + no); c = N / 2
    for q, r in o_hinh(h):
        x, y = c + CELL * (q + r / 2), c + CELL * 0.8660254 * r
        d.polygon([(x + R * np.cos(np.radians(a)), y + R * np.sin(np.radians(a))) for a in (-90, -30, 30, 90, 150, 210)], fill=255)
    return m
def lam(k, seed):
    h, nn, txt = V[k]; b = nen(nn); m = b.copy()
    U = vung(h); vien = Image.fromarray(((np.asarray(U.filter(ImageFilter.MaxFilter(7))) > 0) & (np.asarray(U) == 0)).astype(np.uint8) * 255)
    m.paste((210, 40, 30), (0, 0, N, N), vien)
    fn = nv.upload(f'dd2-{k}.png', m)
    global MAU_FN
    if 'MAU_FN' not in globals(): MAU_FN = nv.upload('dd2-mau.png', mau())
    w = nv.wf(fn, P.format(t=txt), seed, f'dd2-{k}', MAU_FN)
    w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
    w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
    w['8']['inputs']['resolution'] = N
    return k, nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']
def lay(k, pid):
    while True:
        hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
        if hi and hi.get('outputs'): break
        if hi and hi.get('status', {}).get('status_str') == 'error': print('loi', k); return
        time.sleep(3)
    f = hi['outputs']['15']['images'][0]
    urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G + k + '.png')
    tach(k)
def tach(k):
    """Cắt theo VẬT được vẽ (tường, mái, cây…), giới hạn trong cụm ô nới ra một chút; mép gọn, không khoét bầu dục."""
    from scipy import ndimage as ndi
    h, nn, _ = V[k]; b = nen(nn).filter(ImageFilter.GaussianBlur(1.5))
    a0 = Image.open(G + k + '.png').convert('RGB').resize((N, N), Image.LANCZOS); a = a0.filter(ImageFilter.GaussianBlur(1.5))
    d = np.abs(np.asarray(a, np.float32) - np.asarray(b, np.float32)).max(2)
    vat = d > 24
    vat = ndi.binary_closing(vat, iterations=2); vat = ndi.binary_opening(vat, iterations=1)  # không lấp lỗ: đất giữa các nhà không đổi thì trong suốt
    lab, nl = ndi.label(vat)
    if nl:
        sz = ndi.sum(vat, lab, range(1, nl + 1)); vat = np.isin(lab, 1 + np.nonzero(sz >= 300)[0])
    trong = np.asarray(vung(h, 0.3 if h != '1' else 0.8).filter(ImageFilter.GaussianBlur(CELL * 0.18)), np.float32) / 255  # trong cụm ô, mép mờ dần (núi tô lại hoà vào núi thật)
    m = vat.astype(np.float32) * np.clip(trong * 1.4, 0, 1)
    al = np.asarray(Image.fromarray((m * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(1.6)), np.float32) / 255
    o = Image.fromarray(np.dstack([np.asarray(a0), (np.clip(al, 0, 1) * 255).astype(np.uint8)]))
    c = N / 2; bb = o.getchannel('A').point(lambda v: 255 if v > 10 else 0).getbbox() or (int(c) - 8, int(c) - 8, int(c) + 8, int(c) + 8)
    e = int(max(c - bb[0], bb[2] - c, c - bb[1], bb[3] - c)) + 4  # vuông, tâm = tâm ô gốc
    o = o.crop((int(c - e), int(c - e), int(c + e), int(c + e)))
    s = max(8, round(2 * e / CELL * 64)); o = o.resize((s, s), Image.LANCZOS)
    o.save(f'src/assets/ui/map-{k}.webp', 'WEBP', quality=88, method=6); print('xong', k, s, flush=True)
# ---- Lượt 2: Qwen xoá nền bản đồ, chỉ giữ nhà cửa -> PNG trong suốt (sạch hơn cắt theo độ đổi) ----
P_NEN = ("Remove the background map completely: delete the paper, ground, fields, roads, and any trees or mountains that are not part of the settlement. "
         "Keep ONLY the buildings, walls, stairways and the trees growing among them, exactly as they are drawn (same ink lines, same colors, same positions, same size). "
         "Transparent background, output a PNG.")
G2 = G + 'trong/'; os.makedirs(G2, exist_ok=True)
def khung(h):
    """Ô vuông quanh ô gốc đủ chứa cụm ô (nới 0.8 ô), trong khung N."""
    bb = vung(h, 0.8 if h != '1' else 1.6).getbbox(); c = N / 2
    e = int(max(c - bb[0], bb[2] - c, c - bb[1], bb[3] - c)); return int(c - e), int(c - e), int(c + e), int(c + e)
def xoa_nen(ids):
    job = []
    for i, k in enumerate(ids):
        h = V[k][0]; x0, y0, x1, y1 = khung(h)
        a0 = Image.open(G + k + '.png').convert('RGB').resize((N, N), Image.LANCZOS).crop((x0, y0, x1, y1)).resize((1024, 1024), Image.LANCZOS)
        fn = nv.upload(f'dd2n-{k}.png', a0)
        w = nv.wf(fn, P_NEN, 77 + i, f'dd2n-{k}')
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        job.append((k, nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']))
    for k, pid in job:
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': print('loi', k); break
            time.sleep(3)
        if not (hi and hi.get('outputs')): continue
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G2 + k + '.png')
        xuat(k)
def xuat(k):
    """Ảnh trong suốt -> map-<k>.webp: vuông, tâm = tâm ô gốc, 64 điểm ảnh mỗi ô."""
    h = V[k][0]; x0, y0, x1, y1 = khung(h)
    o = Image.open(G2 + k + '.png').convert('RGBA').resize((x1 - x0, x1 - x0), Image.LANCZOS)
    c = (x1 - x0) / 2; bb = o.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox() or (int(c) - 8, int(c) - 8, int(c) + 8, int(c) + 8)
    e = int(max(c - bb[0], bb[2] - c, c - bb[1], bb[3] - c)) + 4
    o = o.crop((int(c - e), int(c - e), int(c + e), int(c + e)))
    s = max(8, round(2 * e / CELL * 64)); o.resize((s, s), Image.LANCZOS).save(f'src/assets/ui/map-{k}.webp', 'WEBP', quality=88, method=6)
    print('xong', k, s, flush=True)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a[:1] == ['nen']:  # lượt 2: xoá nền các ảnh đã vẽ
        xoa_nen(a[1:] or [x for x in V if os.path.exists(G + x + '.png')]); sys.exit()
    if a[:1] == ['xuat']:
        for k in a[1:] or [x for x in V if os.path.exists(G2 + x + '.png')]: xuat(k)
        sys.exit()
    if a[:1] == ['tach']:
        for k in a[1:] or [x for x in V if os.path.exists(G + x + '.png')]: tach(k)
        sys.exit()
    ids = a or list(V); seed = int(os.environ.get('SEED', 0))
    job = [lam(k, 500 + i + seed) for i, k in enumerate(ids)]
    for j in job: lay(*j)
