# Vẽ địa điểm THẲNG VÀO ảnh bản đồ đã khám phá (không còn ảnh rời trên bản đồ).
# Bản đồ chia 5x3 mảnh; mỗi mảnh có nhiều biến thể bố cục (mỗi hạt giống bố cục = một biến thể, xuất bằng tools/dd-xuat.js).
# Mỗi địa điểm: cắt khung quanh cụm ô, viền đỏ cụm ô làm dấu, Qwen 2.1 đầy đủ vẽ đúng phong cách (ảnh 2 = mẫu phong cách),
# rồi chỉ dán lại phần trong cụm ô (mép mờ) lên bản đồ gốc -> chỗ giáp mảnh luôn là bản đồ gốc, ghép biến thể nào cũng khớp.
# python tools/dd-ve-ban-do.py ve <hạt> <mảnh>      (mảnh = cột+hàng*5, 0..14)
# python tools/dd-ve-ban-do.py xem <mảnh> <hạt> [<hạt> ...]   (ghép thử các biến thể của một mảnh ra ảnh so sánh)
import json, os, sys, time, urllib.request, importlib.util
import numpy as np
from PIL import Image, ImageDraw, ImageFilter
sp = importlib.util.spec_from_file_location('dd2', 'tools/dd2-comfy.py'); dd2 = importlib.util.module_from_spec(sp); sp.loader.exec_module(dd2)
nv = dd2.nv
D = 'src/assets-goc/ban-do/dd/'; os.makedirs(D, exist_ok=True)
GOC = dd2.MAP; MW, MH = GOC.size
COT, HANG = 5, 3
N, CROP = 1536, 576; K = N / CROP
# loại tự nhiên: bản đồ đã có sẵn núi, rừng, sông… -> không vẽ thêm
TU_NHIEN = {'nui', 'rung', 'hoang', 'dam', 'song', 'bien', 'ho'}
THEM = {'yeusao': 'a demon beast den: jagged dark rocks, bones and a cave hollow', 'tutran': None}
# tông môn / thế lực tu sĩ: hoành tráng, tiên hiệp (lầu các trên không, núi nhỏ lơ lửng, mây mù)
TG = [  # theo kiểu người dùng thích: cả quả núi phủ kín điện các, bậc đá chạy thẳng lên đỉnh, đảo đá bay có lầu và thác nước, mây mù dày quanh
    'an immortal cultivation sect covering a small rocky peak: tiers of temple halls with sweeping curved roofs climbing the slope, a long straight stone stairway up the middle to a main hall on the summit, pine trees between, one small floating rock island with a pavilion above it, drifting mist',
    'an immortal cultivation sect covering a whole rocky mountain: many tiers of halls, pagodas and pavilions on terraces from the foot to the summit, a long straight stone stairway up the middle, a grand main hall on top, two floating rock islands with pavilions and thin waterfalls hovering above, thick clouds and mist around',
    'a majestic grand immortal sect ruling a whole great mountain: the entire mountain covered from foot to summit by countless palace halls, many-storied pagodas and pavilions on dozens of terraces, a monumental stairway and a huge mountain gate archway at the foot, a vast golden-roofed palace crowning the peak, several large floating rock islands carrying palaces and long waterfalls pouring into a sea of clouds, iron chains and rope bridges linking them to the peak, cranes flying',
    'the supreme immortal sect of the world, overwhelming and majestic: a colossal mountain entirely covered by palaces, pagodas and pavilions on endless terraces, a monumental mountain gate and stairway, a towering palace on the summit piercing the clouds, many large floating mountains with their own palaces, forests and long waterfalls hovering high above in a sea of clouds, chains and bridges between them, distant peaks fading in mist']
TT = ['a small walled cultivator town: pale wall with a gate tower, an elegant tiered pagoda and a few curved-roof halls, faint spirit mist',
      'a walled cultivator town: pale walls with gate towers, a tiered pagoda and curved-roof halls, one pavilion floating in the air above among clouds',
      'a walled immortal cultivator city: pale walls with gate towers, pagodas and palace halls on a terrace, a round array platform, a floating rock island with a pavilion hovering above among clouds']
TU = ['a tiny cultivator market: three shops with banners and a lantern pavilion, faint spirit mist', 'a small cultivator market: about five shops with banners and a pagoda-roofed hall, a small pavilion floating above in mist',
      'a cultivator trading town: shops and halls with curved roofs scattered irregularly, an alchemy pavilion with smoke, a pavilion floating above among clouds']
TU_SI = {'tong', 'tuthanh', 'tutran'}
P = ("Picture 2 is a style reference: six pieces cut from this same map. Picture 1 is a hand-painted old sepia ink-wash fantasy world map seen from a high oblique bird's-eye view, "
     "with thin red hexagon outlines marking a group of land cells. In picture 1, paint {t} on the land inside those red hexagons, at the same scale as the trees and mountains around.{bay} "
     "The red hexagon grid marks exactly the land cells to build on: cover those cells, remove the red lines completely and do not draw a wall or fence along it unless one is described. "
     "Paint it EXACTLY in the style of picture 2 and of the surrounding map, as if the same artist painted it with the same brush at the same time: loose brown-black ink lines, the same brush texture, "
     "ONLY the map's colors: sepia, warm brown and faded grey-green washes on the same aged paper. No grey stone, no blue, no saturated colors, not a 3D render, not a detailed illustration. "
     "The same viewing angle as the trees and mountains, each building drawn with a few confident ink strokes. Crisp clear edges, the settlement ends with clear ink lines: no fading, no vignette, no soft dissolve. Keep everything else exactly unchanged. No text.")
BAY = " Things floating in the sky may rise above the hexagons."
def bo(hat): return json.load(open(f'{D}bo-{hat}.json', encoding='utf-8'))
def manh_cua(p, B):
    x = sum(a for a, b in p['xy']) / len(p['xy']); y = sum(b for a, b in p['xy']) / len(p['xy'])
    return min(COT - 1, int(x / (B['ww'] / COT))) + COT * min(HANG - 1, int(y / (B['wh'] / HANG)))
def loi_ta(p):
    t, h = p['t'], p['h']
    if t == 'tong':
        n = int(h[:-1]) if h != '1' else 3; v = dd2.tang(TG, n, [4, 7, 9])
        return v + (', sitting on the summit and upper slopes of this mountain' if p['ter'] == 3 else ', built on a low rocky hill')
    if t in ('thanh', 'tuthanh', 'tran', 'tutran') and p.get('phang', 1) * 2 < len(p['cells']):  # dựng trên sườn / đỉnh núi
        return {'thanh': 'a fortress town built into the mountain: grey-brown stone walls following the ridge, houses on stepped terraces up the slope, a gate tower',
                'tuthanh': 'an immortal mountain city: halls and pagodas on terraces up the mountain slope, stone stairways, a pavilion floating above among clouds',
                'tran': 'a mountain hamlet: a few thatched houses scattered on small terraces along the slope and near the summit, a winding stone path',
                'tutran': 'a small cultivator mountain market: a few shops and a pavilion on terraces of the slope, banners, faint spirit mist'}[t]
    if t in ('thanh', 'tuthanh', 'tran', 'tutran'):
        n = len(p['cells']); L = {'thanh': (dd2.TH, [4, 7]), 'tuthanh': (TT, [3, 4]), 'tran': (dd2.TR, [1, 2, 3]), 'tutran': (TU, [1, 2])}[t]
        return dd2.tang(L[0], n, L[1])
    if THEM.get(t): return THEM[t]
    k = f'{t}-1'
    return dd2.V[k][2] if k in dd2.V else None
def px(x, y): return x * MW / 3556, y * MH / 2000
R_O = 30 / np.sqrt(3) * MW / 3556   # bán kính ô lục giác (điểm ảnh bản đồ gốc)
def mat_na(p, x0, y0, sc, no=0.0, sz=N):
    m = Image.new('L', (sz, sz), 0); d = ImageDraw.Draw(m); R = R_O * sc * (1 + no)
    for wx, wy in p['xy']:
        cx, cy = px(wx, wy); cx = (cx - x0) * sc; cy = (cy - y0) * sc
        d.polygon([(cx + R * np.cos(np.radians(a)), cy + R * np.sin(np.radians(a))) for a in (-90, -30, 30, 90, 150, 210)], fill=255)
    return m
def hoa_mau(a, nen, k=0.85):
    """Tô lại sắc độ phần vẽ theo bảng màu bản đồ quanh đó (mỗi độ sáng -> màu trung bình của bản đồ ở độ sáng đó); nhà xám / màu lạ thành nâu đỏ giấy cũ."""
    from skimage import color
    A = color.rgb2lab(np.asarray(a) / 255.0); Nn = color.rgb2lab(np.asarray(nen) / 255.0)
    bins = np.clip((Nn[..., 0] / 5).astype(int), 0, 20); la = np.zeros(21); lb = np.zeros(21); cnt = np.zeros(21)
    np.add.at(la, bins, Nn[..., 1]); np.add.at(lb, bins, Nn[..., 2]); np.add.at(cnt, bins, 1)
    ok = cnt > 30; xs = np.nonzero(ok)[0]
    la = np.interp(np.arange(21), xs, la[ok] / cnt[ok]); lb = np.interp(np.arange(21), xs, lb[ok] / cnt[ok])
    L = A[..., 0]; L = L * 0.4 + np.interp(L, np.percentile(L, [5, 50, 95]), np.percentile(Nn[..., 0], [5, 50, 95])) * 0.6
    t = np.clip(L / 5, 0, 20); i0 = np.floor(t).astype(int); i1 = np.minimum(i0 + 1, 20); f = t - i0
    out = np.dstack([L, A[..., 1] * (1 - k) + (la[i0] * (1 - f) + la[i1] * f) * k, A[..., 2] * (1 - k) + (lb[i0] * (1 - f) + lb[i1] * f) * k])
    return Image.fromarray((np.clip(color.lab2rgb(out), 0, 1) * 255).astype(np.uint8))
os.makedirs(D + 'tho/', exist_ok=True)
def luoi(nen, p, x0, y0):
    """Ảnh gửi ComfyUI: bản đồ + viền đỏ từng ô lục giác được chọn."""
    o = nen.copy(); d = ImageDraw.Draw(o); R = R_O * K
    for wx, wy in p['xy']:
        cx, cy = px(wx, wy); cx = (cx - x0) * K; cy = (cy - y0) * K
        v = [(cx + R * np.cos(np.radians(a)), cy + R * np.sin(np.radians(a))) for a in (-90, -30, 30, 90, 150, 210)]
        d.line(v + [v[0]], fill=(210, 40, 30), width=4)
    return o
def vung_ve(p, x0, y0, khac=()):
    """Vùng cho phép mô hình vẽ (khung CROP): cụm ô nới 0.9 ô, tu sĩ nới cao lên trời cho lầu các / núi bay. Ngoài vùng giữ nguyên tuyệt đối."""
    from scipy import ndimage as ndi
    v = np.asarray(mat_na(p, x0, y0, 1, 0.9, CROP)) > 0
    cao = int(R_O * ({'tong': 5.5 + max(0, len(p['cells']) - 4) * 0.5, 'tuthanh': 3.5, 'tutran': 2.5}.get(p['t'], 1.2))); t2 = v.copy()
    for dy in range(2, cao, 2): t2[:-dy] |= v[dy:]
    # tranh được lấn ra vòng ô trống quanh nơi này (và lên trời), nhưng không đè lên ô của nơi khác
    for q in khac:
        if q['id'] == p['id']: continue
        cx, cy = px(*q['xy'][0])
        if abs(cx - x0 - CROP / 2) > CROP or abs(cy - y0 - CROP / 2) > CROP: continue
        t2 &= ~(np.asarray(mat_na(q, x0, y0, 1, 0.15, CROP)) > 0)
    return t2 | (np.asarray(mat_na(p, x0, y0, 1, 0, CROP)) > 0)
def kiem(a, goc, p, x0, y0, v):
    """Bỏ ảnh còn sót viền đỏ hoặc gần như không vẽ gì trong cụm ô."""
    from scipy import ndimage as ndi
    from skimage import color
    o0 = np.asarray(mat_na(p, x0, y0, 1, 0, CROP)) > 0
    lo = color.rgb2lab(np.asarray(a) / 255.0); do = (lo[..., 1] > 28) & (lo[..., 0] > 25)
    if (do & v).sum() > 40: return 'con vien do'
    D = ndi.gaussian_filter(np.abs(np.asarray(a, np.float32) - np.asarray(goc, np.float32)).max(2), 2.0)
    if (D[o0] > 20).mean() < 0.3: return 've qua it'
    return None
def chay_wf(w, ra):
    """Gửi một workflow, chờ, trả ảnh RGB (None nếu lỗi)."""
    pid = nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']
    while True:
        hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
        if hi and hi.get('outputs'): break
        if hi and hi.get('status', {}).get('status_str') == 'error': return None
        time.sleep(2)
    f = hi['outputs']['15']['images'][0]
    return Image.open(urllib.request.urlopen(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output")).convert('RGB')
def full(w, denoise=1.0):
    w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
    w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': denoise}, '_meta': {'title': 'Scheduler'}}
    w['8']['inputs']['resolution'] = N; return w
P_MEP = ("Picture 1 is a hand-painted old sepia ink-wash fantasy map. Make the painting perfectly seamless and continuous: join every ink line, mountain contour, "
         "road and wash across the picture so nothing looks cut or pasted. Keep all buildings, floating islands, mountains and trees exactly as they are. No text.")
def ve_tudo(nen, p, x0, y0, v, mau, seed, ten):
    """Cách 'tự do' (người dùng thích): Qwen vẽ lại cả khung (đẹp, hùng tráng) -> lấy phần trong vùng đặt lên bản đồ sạch
    -> lượt nhẹ (vẽ bù dải mép, denoise 0.5) để nối liền nét. Trả ảnh 1536 đã ghép."""
    from scipy import ndimage as ndi
    fn = nv.upload(f'{ten}.png', luoi(nen, p, x0, y0))
    A = chay_wf(full(nv.wf(fn, P.format(t=loi_ta(p), bay=BAY if p['t'] in TU_SI else ''), seed, ten, mau)), ten)
    if A is None: return None, None
    A = A.resize((N, N), Image.LANCZOS)
    V = np.asarray(Image.fromarray((v * 255).astype(np.uint8)).resize((N, N), Image.NEAREST)) > 0
    C = Image.composite(A, nen, Image.fromarray((V * 255).astype(np.uint8)))
    dai = ndi.binary_dilation(V, iterations=28) & ~ndi.binary_erosion(V, iterations=28)
    mk = Image.fromarray((dai * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(10)).convert('RGB')
    fc = nv.upload(f'{ten}-ghep.png', C); fm = nv.upload(f'{ten}-mep.png', mk)
    w = full(nv.wf(fc, P_MEP, seed + 7, ten + '-mep'), 0.5)
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    w['18'] = T('VAEEncode', {'pixels': ['6', 0], 'vae': ['5', 0]}, 'Encode ghep')
    w['19'] = T('LoadImageMask', {'image': fm, 'channel': 'red'}, 'Dai mep'); w['20'] = T('SetLatentNoiseMask', {'samples': ['18', 0], 'mask': ['19', 0]}, 'Chi mep')
    w['21'] = T('DifferentialDiffusion', {'model': ['2', 0]}, 'Noi mep')
    w['9']['inputs']['model'] = ['21', 0]; w['12']['inputs']['model'] = ['21', 0]; w['13']['inputs']['latent_image'] = ['20', 0]
    R = chay_wf(w, ten + '-mep')
    if R is None: return None, None
    A.save(f'{D}tho/{ten}-tudo.png'); R = R.resize((N, N), Image.LANCZOS)
    vung = ndi.binary_dilation(V, iterations=30)
    return R, vung
CACH = os.environ.get('CACH', 'tudo')
def ve(hat, manh, seed0=900, chi=None):
    B = bo(hat); L = [p for p in B['noi'] if p['t'] not in TU_NHIEN and manh_cua(p, B) == manh and loi_ta(p) and (chi is None or p['id'] in chi)]
    L.sort(key=lambda p: -len(p['cells']))
    out = f'{D}ve-{hat}-m{manh}.png'
    M = Image.open(out).convert('RGB') if os.path.exists(out) else GOC.copy()
    xong = set(json.load(open(out + '.json')) if os.path.exists(out + '.json') else [])
    if chi:  # vẽ lại: trả vùng vẽ cũ về bản đồ gốc rồi vẽ lại từ đầu
        for p in L:
            if p['id'] not in xong: continue
            cx = sum(px(*q)[0] for q in p['xy']) / len(p['xy']); cy = sum(px(*q)[1] for q in p['xy']) / len(p['xy'])
            x0 = int(min(max(cx - CROP / 2, 0), MW - CROP)); y0 = int(min(max(cy - CROP / 2, 0), MH - CROP))
            v = Image.fromarray((vung_ve(p, x0, y0, B['noi']) * 255).astype(np.uint8)).filter(ImageFilter.MaxFilter(9))
            M.paste(GOC.crop((x0, y0, x0 + CROP, y0 + CROP)), (x0, y0), v); xong.discard(p['id'])
    mau = nv.upload('dd2-mau.png', dd2.mau())
    print('mảnh', manh, 'hạt', hat, len(L), 'nơi, đã có', len(xong), flush=True)
    for i, p in enumerate(L):
        if p['id'] in xong: continue
        cx = sum(px(*q)[0] for q in p['xy']) / len(p['xy']); cy = sum(px(*q)[1] for q in p['xy']) / len(p['xy'])
        x0 = int(min(max(cx - CROP / 2, 0), MW - CROP)); y0 = int(min(max(cy - CROP / 2, 0), MH - CROP))
        nen = M.crop((x0, y0, x0 + CROP, y0 + CROP)).resize((N, N), Image.LANCZOS)
        da = 0
        for thu in range(3):
            if CACH == 'tudo':
                v = vung_ve(p, x0, y0, B['noi']); goc = M.crop((x0, y0, x0 + CROP, y0 + CROP))
                R, vung = ve_tudo(nen, p, x0, y0, v, mau, seed0 + p['id'] + 1000 * thu, f'ddt-{hat}-{p["id"]}')
                if R is None: print('loi', p['id'], flush=True); break
                a = R.resize((CROP, CROP), Image.LANCZOS); a.save(f'{D}tho/{hat}-{p["id"]}.png')
                ly = kiem(a, goc, p, x0, y0, v)
                if ly: print('bo', p['id'], ly, flush=True); continue
                mm = Image.fromarray((vung * 255).astype(np.uint8)).resize((CROP, CROP), Image.LANCZOS)
                a = Image.composite(hoa_mau(a, goc), a, mm.filter(ImageFilter.GaussianBlur(6)))
                M.paste(a, (x0, y0), mm); da = 1; break
            vao = luoi(nen, p, x0, y0)  # lưới lục giác của đúng các ô được chọn (viền đỏ từng ô)
            fn = nv.upload(f'ddv-{hat}-{p["id"]}.png', vao)
            v = vung_ve(p, x0, y0, B['noi'])
            mk = Image.fromarray((v * 255).astype(np.uint8)).resize((N, N), Image.NEAREST).filter(ImageFilter.GaussianBlur(6)).convert('RGB')
            fs = nv.upload(f'ddv-{hat}-{p["id"]}-sach.png', nen); fm = nv.upload(f'ddv-{hat}-{p["id"]}-mn.png', mk)
            w = nv.wf(fn, P.format(t=loi_ta(p), bay=BAY if p['t'] in TU_SI else ''), seed0 + p['id'] + 1000 * thu, f'ddv-{hat}-{p["id"]}', mau)
            w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
            w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
            w['8']['inputs']['resolution'] = N
            # vẽ bù (inpaint): bắt đầu từ chính bản đồ sạch, chỉ vùng mặt nạ được đổi -> mép do mô hình tự nối, không cắt dán
            T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
            w['17'] = T('LoadImage', {'image': fs}, 'Ban do sach'); w['18'] = T('VAEEncode', {'pixels': ['17', 0], 'vae': ['5', 0]}, 'Encode sach')
            w['19'] = T('LoadImageMask', {'image': fm, 'channel': 'red'}, 'Vung ve'); w['20'] = T('SetLatentNoiseMask', {'samples': ['18', 0], 'mask': ['19', 0]}, 'Chi ve trong vung')
            w['21'] = T('DifferentialDiffusion', {'model': ['2', 0]}, 'Noi mep')
            w['9']['inputs']['model'] = ['21', 0]; w['12']['inputs']['model'] = ['21', 0]; w['13']['inputs']['latent_image'] = ['20', 0]
            pid = nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']
            while True:
                hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
                if hi and hi.get('outputs'): break
                if hi and hi.get('status', {}).get('status_str') == 'error': hi = None; break
                time.sleep(2)
            if not hi: print('loi', p['id'], flush=True); break
            f = hi['outputs']['15']['images'][0]
            a = Image.open(urllib.request.urlopen(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output")).convert('RGB').resize((CROP, CROP), Image.LANCZOS)
            a.save(f'{D}tho/{hat}-{p["id"]}.png')
            goc = M.crop((x0, y0, x0 + CROP, y0 + CROP))
            ly = kiem(a, goc, p, x0, y0, v)
            if ly: print('bo', p['id'], ly, flush=True); continue
            mm = Image.fromarray((v * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(2))
            a = Image.composite(hoa_mau(a, goc), a, mm.filter(ImageFilter.GaussianBlur(6)))  # chỉnh màu trong vùng vẽ
            M.paste(a, (x0, y0), mm); da = 1; break
        if not da: continue
        xong.add(p['id'])
        M.save(out); json.dump(sorted(xong), open(out + '.json', 'w'))
        print('xong', i + 1, '/', len(L), p['t'], len(p['cells']), 'ô', flush=True)
def khung(manh, le=60):
    c, r = manh % COT, manh // COT; w, h = MW / COT, MH / HANG
    return int(max(0, c * w - le)), int(max(0, r * h - le)), int(min(MW, (c + 1) * w + le)), int(min(MH, (r + 1) * h + le))
def xem(manh, hats):
    b = khung(manh); ims = [GOC.crop(b)] + [Image.open(f'{D}ve-{h}-m{manh}.png').convert('RGB').crop(b) for h in hats]
    W, H = ims[0].size; o = Image.new('RGB', (W, H * len(ims) + 40 * len(ims)), 'white'); d = ImageDraw.Draw(o)
    for i, (im, ten) in enumerate(zip(ims, ['goc'] + [f'bien the {h}' for h in hats])):
        o.paste(im, (0, i * (H + 40) + 40)); d.text((8, i * (H + 40) + 12), ten, fill='black')
    f = f'{D}xem-m{manh}.png'; o.save(f); print(f)
if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == 've': ve(int(a[1]), int(a[2]))
    elif a[0] == 'velai': ve(int(a[1]), int(a[2]), seed0=1900, chi={int(x) for x in a[3:]})
    elif a[0] == 'xem': xem(int(a[1]), [int(x) for x in a[2:]])
    elif a[0] == 'dem':
        for hat in a[1:]:
            B = bo(int(hat)); from collections import Counter
            print(hat, sorted(Counter(manh_cua(p, B) for p in B['noi'] if p['t'] not in TU_NHIEN and loi_ta(p)).items()))
