# THỬ: Qwen 2.1 chỉ học phong cách (ảnh 1: mảnh bản đồ, ảnh 2: những nơi đã vẽ vào bản đồ trước đó)
# rồi VẼ MỚI một vật riêng, nền trong suốt ngay từ lần chạy đầu (không vẽ đè lên bản đồ). Sau đó ghép thử lên bản đồ.
# python tools/thu-ve-moi.py
import json, os, sys, time, urllib.request, importlib.util, glob
from PIL import Image, ImageDraw, ImageFilter
sp = importlib.util.spec_from_file_location('dv', 'tools/dd-ve-ban-do.py'); dv = importlib.util.module_from_spec(sp); sp.loader.exec_module(dv)
nv = dv.nv; D = dv.D + 'thu-moi/'; os.makedirs(D, exist_ok=True)
def ref_ve():
    """Ảnh 2: những nơi đã vẽ trước đó (ảnh gốc ComfyUI ở tho/, mới nhất trước, ưu tiên ảnh vẽ tự do)."""
    L = sorted(glob.glob(dv.D + 'tho/*-tudo.png'), key=os.path.getmtime, reverse=True) + sorted(glob.glob(dv.D + 'tho/*.png'), key=os.path.getmtime, reverse=True)
    o = Image.new('RGB', (1536, 1024), 'white')
    for k, f in enumerate(dict.fromkeys(L).__iter__()):
        if k >= 6: break
        im = Image.open(f).convert('RGB'); w, h = im.size; c = im.crop((w // 6, h // 8, w * 5 // 6, h * 7 // 8)).resize((512, 512))
        o.paste(c, ((k % 3) * 512, (k // 3) * 512))
    return o
TONG = ('a grand immortal cultivation sect covering a whole rocky mountain: many tiers of palace halls, pagodas and pavilions on terraces from foot to summit, '
        'a long straight stone stairway up the middle, a great palace on the summit, several floating rock islands carrying palaces with thin waterfalls hovering above, wisps of cloud and mist')
P0 = ("Picture 1 shows pieces of a hand-painted old sepia ink-wash fantasy world map; picture 2 shows places already painted on that map. "
      "Use them ONLY as a style reference: the same brown-black loose ink lines, the same muted sepia, warm brown and faded grey-green washes, the same high oblique bird's-eye view. "
      "Paint a completely NEW image of {t}, alone, isolated, centered. {nen} Transparent background, output a PNG.")
VIEC = {'khong-nen': P0.format(t=TONG, nen='No ground, no terrain around it, no grass, no shadow, no paper texture, no background at all: only the mountain with the sect and the floating islands.'),
        'nen-loang': P0.format(t=TONG, nen='Its mountain stands on a patch of sepia ground with a few trees and paths; that ground fades out gradually toward the edges like ink and water bleeding into paper, '
                                         'with irregular soft ink-wash edges and a wide fade, until it disappears completely into transparency. No paper texture or background beyond the fade.')}
def chay():
    f1 = nv.upload('tvm-1.png', dv.dd2.mau()); f2 = nv.upload('tvm-2.png', ref_ve()); job = {}
    for i, (k, t) in enumerate(VIEC.items()):
        w = nv.wf(f1, t, 4242 + i, f'tvm-{k}', f2)
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        w['8']['inputs']['resolution'] = 1024
        job[k] = nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']
    for k, pid in job.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': print('loi', k); break
            time.sleep(2)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", D + k + '.png')
        im = Image.open(D + k + '.png'); print(k, im.mode, im.size, flush=True)
def ghep():
    """Ghép thử lên bản đồ gốc ở chỗ đất bằng (thành) và sườn núi (tông môn), cỡ theo số ô; ảnh so sánh trên nền ô caro + trên bản đồ."""
    G = dv.GOC; ra = []
    for k, (x, y, o) in {'khong-nen': (2470, 1170, 12), 'nen-loang': (2470, 1170, 12)}.items():
        im = Image.open(D + k + '.png').convert('RGBA'); bb = im.getchannel('A').point(lambda v: 255 if v > 12 else 0).getbbox(); im = im.crop(bb)
        w = int(dv.R_O * 2 * (o ** 0.5) * 1.6); im = im.resize((w, int(im.height * w / im.width)), Image.LANCZOS)
        c = G.crop((x - 220, y - 220, x + 220, y + 220)).convert('RGBA'); c.alpha_composite(im, (220 - w // 2, 220 - im.height // 2))
        ca = Image.new('RGBA', im.size, (255, 255, 255, 255)); d = ImageDraw.Draw(ca)
        for yy in range(0, im.height, 16):
            for xx in range(0, im.width, 16):
                if (xx // 16 + yy // 16) % 2: d.rectangle((xx, yy, xx + 15, yy + 15), fill=(205, 205, 205, 255))
        ca.alpha_composite(im); ra.append((ca.convert('RGB'), G.crop((x - 220, y - 220, x + 220, y + 220)), c.convert('RGB')))
    o = Image.new('RGB', (440 * 3 + 20, 440 * 2 + 10), 'white')
    for r, (a, b, c) in enumerate(ra):
        o.paste(a.resize((min(440, a.width), int(a.height * min(440, a.width) / a.width))), (0, r * 450)); o.paste(b, (450, r * 450)); o.paste(c, (900, r * 450))
    o.save(D + 'ghep.png'); print(D + 'ghep.png')
def tach_loang(src, ra, rong=0.18, seed=3, mau_nen=None, nen=(1.0, 1.0, 1.0)):
    """Tách nền trắng của bản 'nền loang' cho mượt, tự nhiên:
    - trắng (giấy, mây trắng) -> trong suốt theo độ trắng (không còn viền trắng quanh núi);
    - phần trung / đậm (núi, nhà, cây, đảo bay) giữ đặc, không bị trong mờ;
    - mảng đất quanh chân nhạt dần ra mép trên dải rộng, mép đứt gãy như mực thấm giấy;
    - màu chỗ trong dần: gỡ phần trắng trộn vào nhưng dịu (không thành viền cam)."""
    import numpy as np
    from scipy import ndimage as ndi
    c = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
    H, W = c.shape[:2]; L = c.mean(2)
    bg = np.array(nen, np.float32); a_tr = np.clip(np.abs(c - bg).max(2) / 0.5, 0, 1)   # theo độ khác màu nền (trắng / be)
    dac = np.clip((min(0.80, bg.mean() - 0.05) - L) / 0.18, 0, 1)   # trung / đậm (so với nền) -> đặc
    co = ndi.binary_fill_holes(ndi.gaussian_filter(a_tr, 3) > 0.12)
    lab, n = ndi.label(co)
    if n: sz = ndi.sum(co, lab, range(1, n + 1)); co = np.isin(lab, 1 + np.nonzero(sz >= 0.002 * H * W)[0])  # giữ cả đảo bay tách rời
    d = ndi.distance_transform_edt(co); r = rong * min(H, W)
    rng = np.random.default_rng(seed)
    nz = ndi.gaussian_filter(rng.standard_normal((H, W)), 16); nz /= np.abs(nz).max() + 1e-6
    nz2 = ndi.gaussian_filter(rng.standard_normal((H, W)), 5); nz2 /= np.abs(nz2).max() + 1e-6
    t = np.clip(d / r + 0.4 * nz + 0.12 * nz2, 0, 1); loang = t * t * (3 - 2 * t)  # mép mực thấm
    vat = ndi.gaussian_filter((dac > 0.55).astype(np.float32), 2) * np.clip(d / (r * 0.25), 0, 1)  # vật đậm (núi, nhà, đảo bay): đặc, chỉ mềm sát mép
    a = np.clip(np.maximum(a_tr * np.maximum(dac, 0.55) * loang, vat * dac), 0, 1)
    a3 = np.maximum(a_tr[..., None], 0.2)
    go = np.clip((c - bg * (1 - a3)) / a3, 0, 1)
    col = c * 0.45 + go * 0.55
    rgb = Image.fromarray((np.clip(col, 0, 1) * 255).astype(np.uint8))
    if mau_nen is not None: rgb = dv.hoa_mau(rgb, mau_nen, k=0.7)   # đưa sắc độ về bảng màu nâu đỏ của bản đồ
    Image.fromarray(np.dstack([np.asarray(rgb), (a * 255).astype(np.uint8)])).save(ra)

# ---- lần 2: theo đúng 2 ảnh người dùng thích (ref-1, ref-2) ----
BE = (221, 186, 139)  # màu giấy bản đồ (trung vị vùng đất trống)
P2 = ("Pictures 1 and 2 are style references: hand-painted old sepia ink-wash map art of immortal sects. Paint a completely NEW image EXACTLY in the style of pictures 1 and 2 "
      "(same ink lines, same detail, same colors, same high oblique bird's-eye view): a grand immortal cultivation sect covering a whole rocky mountain, many tiers of palace halls, "
      "pagodas and pavilions on terraces from foot to summit, a long straight stone stairway up the middle, a great palace on the summit, and several LARGE floating rock islands "
      "carrying palaces with waterfalls, drawn clearly with dark ink, hovering above among clouds, one linked by iron chains. "
      "The mountain stands on a patch of sepia ground with trees and paths; that ground fades out gradually toward the edges like ink bleeding into paper, with a wide irregular fade. {nen}")
VIEC2 = {'ref-trong': P2.format(nen='Beyond the fade: nothing. Transparent background, output a PNG.'),
         'ref-be': P2.format(nen=f'Beyond the fade: a plain flat solid beige-yellow background, color RGB{BE}, exactly like old map paper, no texture, no other objects.')}
def chay2():
    f1 = nv.upload('tvm-ref1.png', Image.open(D + 'ref-1.webp').convert('RGB')); f2 = nv.upload('tvm-ref2.png', Image.open(D + 'ref-2.webp').convert('RGB'))
    for i, (k, t) in enumerate(VIEC2.items()):
        w = nv.wf(f1, t, 5151 + i, f'tvm-{k}', f2)
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        w['8']['inputs']['resolution'] = 1024
        im = dv.chay_wf(w, k)
        if im is None: print('loi', k); continue
        im.save(D + k + '-goc.png'); print(k, 'xong', flush=True)
    G = dv.GOC; m = G.crop((2600, 1000, 3500, 1700))
    tach_loang(D + 'ref-trong-goc.png', D + 'ref-trong.png', mau_nen=m)
    tach_loang(D + 'ref-be-goc.png', D + 'ref-be.png', mau_nen=m, nen=tuple(v / 255 for v in BE))

P3 = ("Picture 1 is a piece of a hand-painted old sepia ink-wash fantasy world map. Picture 2 is only a rough idea for the subject and layout, NOT for colors or line weight. "
      "In picture 1, on the open land in the center, paint a grand immortal cultivation sect like the idea in picture 2: a mountain covered with palace halls, a long straight stairway, "
      "a main palace on the summit, floating rock islands with chains and waterfalls, large, about half the width of picture 1. "
      "Paint it with EXACTLY the same ink as the rest of picture 1: the same dark brown-black ink lines, the same strong contrast and the same dark ink shading as the trees and mountains around it, "
      "not pale, not faded, not grey. Its ground and trees blend seamlessly into the surrounding map land, with no edge, no circle, no white. "
      "Keep the rest of the map unchanged. Same high oblique bird's-eye view. No text.")
def chay3(x=3040, y=1420, kc=1024, seeds=(71, 72), rr=0.36):
    """Ghép tông môn (ảnh mẫu ref-trong-goc = ảnh 2) vào khu đất của bản đồ bằng VẼ BÙ (inpaint):
    bắt đầu từ chính mảnh bản đồ, chỉ vùng mặt nạ (vệt loang quanh khu đất, rộng ~2/3 khung, nới lên trên cho đảo bay) được vẽ lại;
    ngoài mặt nạ giữ nguyên, mép do mô hình tự nối. Xong dán về bản đồ, lưu ảnh so sánh."""
    import numpy as np
    from scipy import ndimage as ndi
    G = dv.GOC; N = 1536; nen = G.crop((x - kc // 2, y - kc // 2, x + kc // 2, y + kc // 2)).resize((N, N), Image.LANCZOS)
    yy, xx = np.mgrid[0:N, 0:N].astype(np.float32) / N
    rng = np.random.default_rng(9); nz = ndi.gaussian_filter(rng.standard_normal((N, N)), 40); nz /= np.abs(nz).max()
    dx = (xx - 0.5) / rr; dy = (yy - 0.52) / (rr * np.where(yy < 0.52, 1.25, 0.95))   # cao hơn ở trên (đảo bay, đỉnh núi)
    mk = (np.sqrt(dx * dx + dy * dy) + 0.18 * nz) < 1
    mkI = Image.fromarray((mk * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(14))
    f1 = nv.upload('tvm-p3-nen.png', nen); f2 = nv.upload('tvm-p3-tong.png', Image.open(D + 'ref-trong-goc.png').convert('RGB').resize((512, 512), Image.LANCZOS))
    fm = nv.upload('tvm-p3-mn.png', mkI.convert('RGB'))
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    for sd in seeds:
        w = nv.wf(f1, P3, sd, f'tvm-p3-{sd}', f2)
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['21', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        w['8']['inputs']['resolution'] = N
        w['18'] = T('VAEEncode', {'pixels': ['6', 0], 'vae': ['5', 0]}, 'Encode ban do')
        w['19'] = T('LoadImageMask', {'image': fm, 'channel': 'red'}, 'Vung ve'); w['20'] = T('SetLatentNoiseMask', {'samples': ['18', 0], 'mask': ['19', 0]}, 'Chi ve trong vung')
        w['21'] = T('DifferentialDiffusion', {'model': ['2', 0]}, 'Noi mep')
        w['9']['inputs']['model'] = ['21', 0]; w['13']['inputs']['latent_image'] = ['20', 0]
        im = dv.chay_wf(w, f'p3-{sd}')
        if im is None: print('loi', sd); continue
        im = im.resize((N, N), Image.LANCZOS); im.save(D + f'ghep-ban-do-{sd}-goc.png')
        ra = Image.composite(im, nen, mkI.filter(ImageFilter.GaussianBlur(4))).resize((kc, kc), Image.LANCZOS)  # cỡ thật trên bản đồ
        ra.save(D + f'ghep-ban-do-{sd}.png'); print('xong', sd, flush=True)
    nen.resize((kc, kc), Image.LANCZOS).save(D + 'ghep-ban-do-nen.png'); mkI.save(D + 'ghep-ban-do-mn.png')
if __name__ == '__main__':
    if sys.argv[1:] == ['ghep']: ghep()
    elif sys.argv[1:] == ['ref']: chay2()
    elif sys.argv[1:] == ['p3']: chay3()
    else: chay(); ghep()
def tach2(src, ra, nen=(1.0, 1.0, 1.0), rong=0.13, seed=5, giu_nen=False):
    """Tách theo VÙNG (không theo từng điểm): bóng cả cụm (núi + đất + đảo bay) -> mép loang rộng, đứt gãy kiểu mực thấm.
    Mỗi đảo bay / cụm rời có độ loang theo cỡ của nó (đảo nhỏ không bị mờ mất).
    nền trắng: chỗ trắng trong vùng (mây) trong dần theo độ trắng; nền be (giu_nen): giữ nguyên màu be trong vùng (gần màu giấy bản đồ)."""
    import numpy as np
    from scipy import ndimage as ndi
    c = np.asarray(Image.open(src).convert('RGB')).astype(np.float32) / 255
    H, W = c.shape[:2]; bg = np.array(nen, np.float32)
    diff = np.abs(c - bg).max(2); L = c.mean(2)
    tex = ndi.gaussian_filter(np.abs(L - ndi.gaussian_filter(L, 2)), 3)
    ve = (ndi.gaussian_filter(diff, 2) > 0.07) | (tex > 0.012)
    sil = ndi.binary_fill_holes(ndi.binary_closing(ve, iterations=3))
    lab, n = ndi.label(sil); sz = ndi.sum(sil, lab, range(1, n + 1)) if n else []
    sil = np.isin(lab, 1 + np.nonzero(np.asarray(sz) >= 0.001 * H * W)[0]); lab, n = ndi.label(sil)
    d = ndi.distance_transform_edt(sil); dmax = ndi.maximum(d, lab, range(1, n + 1)) if n else []
    r = np.zeros_like(d)
    for i in range(n): r[lab == i + 1] = min(rong * min(H, W), 0.55 * dmax[i])
    # loang chủ yếu ở mảng đất phía dưới; phía trên (đỉnh núi, đảo bay, trời) chỉ mềm sát mép
    yy = np.arange(H, dtype=np.float32)[:, None] / H
    r = r * np.clip((yy - 0.35) / 0.35, 0.12, 1)
    rng = np.random.default_rng(seed)
    nz = ndi.gaussian_filter(rng.standard_normal((H, W)), 18); nz /= np.abs(nz).max() + 1e-6
    nz2 = ndi.gaussian_filter(rng.standard_normal((H, W)), 5); nz2 /= np.abs(nz2).max() + 1e-6
    t = np.clip(d / np.maximum(r, 1) + 0.38 * nz + 0.12 * nz2, 0, 1) * sil
    a = t * t * (3 - 2 * t)
    if not giu_nen:
        a = a * np.clip(diff / 0.22, 0, 1) ** 0.7       # mây trắng trong vùng: trong dần, không thành viền trắng
        a3 = np.maximum(np.clip(diff / 0.5, 0, 1)[..., None], 0.25)
        c = np.clip(c * 0.5 + np.clip((c - bg * (1 - a3)) / a3, 0, 1) * 0.5, 0, 1)
    Image.fromarray(np.dstack([(c * 255).astype(np.uint8), (np.clip(a, 0, 1) * 255).astype(np.uint8)])).save(ra)
