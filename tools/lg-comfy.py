# Ảnh cho bản đồ lục giác 3D (docs/thiet-ke/ban-do-luc-giac-3d.md), vẽ bằng ComfyUI (Qwen Image 2.1 bản đầy đủ, 25 bước, vẽ thẳng từ chữ).
#   python tools/lg-comfy.py dat [loại ...]   mặt đất nhìn thẳng từ trên (mỗi loại 2 tấm), code cắt thành ô
#   python tools/lg-comfy.py vat [tên ...]    cây, núi, đá, địa điểm… nền trong suốt
#   SEED=n đổi hạt giống.
# Ảnh gốc: src/assets-goc/luc-giac/<dat|vat>/<tên>.png (không lưu git).
import json, os, sys, time, urllib.request, importlib.util
from PIL import Image
def nap(f):
    sp = importlib.util.spec_from_file_location(f, os.path.join(os.path.dirname(__file__), f + '.py')); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m); return m
nv = nap('nv-comfy')
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
G = os.path.join(ROOT, 'src/assets-goc/luc-giac/')

# ---- mặt đất ----
DAT = {
 'dong':     'lush green meadow grass with small wild flower clumps and a few worn patches',
 'doi':      'grassy hill ground with patches of bare brown earth and small scattered stones',
 'nui':      'grey mountain rock surface with cracks, gravel and a little sparse moss',
 'song':     'clear shallow river water, blue-green, gentle ripples, pebbles visible on the bottom',
 'dam':      'swamp: murky green water mixed with mud banks, reeds, algae and duckweed',
 'hmda':     'rocky desert: dry cracked tan earth with pebbles and small stones',
 'dado':     'red sandstone rock ground with layered cracks and red dust',
 'samac':    'golden desert sand with soft wind ripples',
 'nhietdoi': 'lush tropical green grass with small ferns and low leafy bushes, a few darker patches',
 'truc':     'light green grass with small clumps of low plants and some fallen yellow-green leaves',
 'rung':     'green grass with moss patches, small bushes and a few fallen leaves',
 'lat':      'pale grey stone paving slabs of a temple courtyard, neatly fitted, a little moss in the joints',
 'datnen':   'packed light brown earth of a village yard with a few small stones and tufts of grass',
 'hosen':    'calm pond water covered with green lotus pads and a few pink lotus flowers',
}
P_DAT = ('A square top-down orthographic terrain texture of {t}, seen straight down from high above. '
         'Stylized hand-painted 3D strategy game art like the terrain of Civilization VI: vibrant but natural colors, soft sunny lighting, clean readable shapes, '
         'some natural large-scale variation (lighter and darker areas, clumps), evenly filling the whole image. Not a photo. '
         'No horizon, no sky, no trees, no buildings, no people, no text, no border.')

# ---- vật trên ô (cây, núi, đá…) ----
VAT = {
 # cây theo khí hậu
 'cay-nd-0': 'tall tropical coconut palm tree', 'cay-nd-1': 'tropical banana plant cluster with huge green leaves',
 'cay-nd-2': 'big lush tropical rainforest tree with a wide dark green canopy', 'cay-nd-3': 'tropical tree with a round bright green canopy and hanging vines',
 'cay-la-0': 'broadleaf deciduous tree with a round green canopy', 'cay-la-1': 'old oak-like tree with a wide green canopy',
 'cay-la-2': 'slender young broadleaf tree with light green leaves',
 'truc-0': 'dense clump of tall green bamboo stalks', 'truc-1': 'small grove of green bamboo, leaning slightly',
 # núi, đá, cỏ
 'nui-0': 'large rugged grey rocky mountain peak with a few green pine trees on its lower slopes, no snow',
 'nui-1': 'wide grey rocky mountain with two peaks and green grassy lower slopes, no snow',
 'nui-2': 'tall sharp karst limestone mountain pillar with green bushes, Chinese landscape style',
 'nuido-0': 'red sandstone mesa rock formation with flat top', 'nuido-1': 'cluster of red sandstone rock spires',
 'doi-0': 'low rounded grassy hill mound with a few stones', 'doi-1': 'gentle green grassy hill with a rocky outcrop',
 'da-0': 'small cluster of tan desert rocks with a dry shrub', 'da-1': 'few weathered boulders with dry grass',
 'say-0': 'clump of swamp reeds and cattails', 'say-1': 'small marsh shrub with reeds and a few lily pads',
 # ---- công trình TỪNG Ô của địa điểm nhiều ô (mỗi ô một công trình, ghép thành cả nơi; ui/05-gfx.js lgDiem) ----
 # tông môn tiên hiệp
 'o-tong-chinh': 'A grand xianxia sect main hall: a large multi-tiered palace with sweeping golden roofs on a white stone terrace with stairs, compact footprint',
 'o-tong-dinh': 'A floating rocky mountain island with a golden-roofed palace and a pagoda on its top and a thin waterfall falling from its underside',
 'o-tong-cong': 'A sect mountain gate: a tall ornate stone paifang archway with a golden plaque and stone stairs leading up, two stone lions',
 'o-tong-thap': 'A tall slender seven-story Chinese pagoda with golden roofs',
 'o-tong-lau': 'A two-story Chinese scripture pavilion tower with red pillars and golden roofs',
 'o-tong-dien': 'A Chinese side hall with red walls and a golden tiled roof on a small stone terrace',
 'o-tong-dan': 'An alchemy pavilion: an open hall with a huge bronze cauldron in front, smoke and a faint magical glow',
 'o-tong-vo': 'A martial training plaza: a square raised stone platform with weapon racks, banners and a big bronze bell',
 'o-tong-xa': 'Disciple quarters: a row of small Chinese houses with grey tiled roofs and a little courtyard',
 'o-tong-dao': 'A small floating rock island with a tiny pavilion on top',
 'o-tong-nui': 'A steep green rocky peak with pine trees and a tiny pavilion on top',
 'o-tong-ho': 'A small round lotus pond with pink lotus flowers and a little arched white stone bridge over it',
 'o-tong-thac': 'A mossy rock cliff with a waterfall falling into a small round pool',
 'o-tong-tung': 'A cluster of three old twisted pine trees',
 # thành
 'o-thanh-cung': 'An imperial Chinese palace with a grand double-eaved golden roof on a high stone platform with red walls',
 'o-thanh-cong': 'A Chinese city gate tower: a thick grey brick gate with a red arched door and a two-story tower with tiled roof on top',
 'o-thanh-nha-0': 'A block of several Chinese city houses with grey tiled roofs and white walls',
 'o-thanh-nha-1': 'A block of two-story Chinese shophouses with dark tiled roofs and red lanterns',
 'o-thanh-nha-2': 'A Chinese courtyard residence with grey roofs and a tree inside',
 'o-thanh-cho': 'A busy Chinese market street with stalls, colorful cloth awnings and lanterns',
 'o-thanh-lau': 'A Chinese drum tower on a brick base with a red wooden upper floor',
 'o-thanh-mieu': 'A Chinese temple with a red gate, incense burner and a curved golden roof',
 'o-thanh-phu': 'A rich Chinese mansion with a walled courtyard and a two-story main building',
 # trấn, thôn
 'o-tran-lang': 'A tiny Chinese village: three small wooden houses with dark tiled roofs close together and a tree',
 'o-tran-chinh': 'A large Chinese village head house with a dark tiled roof, red door and a courtyard wall',
 'o-tran-nha-0': 'A small Chinese farmhouse with a thatched roof and a fence',
 'o-tran-nha-1': 'Two small Chinese wooden houses with grey tiled roofs side by side',
 'o-tran-ruong': 'A small patch of green rice paddies with a scarecrow and a dirt path',
 'o-tran-gieng': 'A village stone well under a big leafy tree with a wooden bench',
 'o-tran-mieu': 'A small Chinese village shrine with a curved roof and a stone lantern',
 # cảnh quanh nơi hoang dã 7 ô
 'o-bia': 'A few old stone steles and weathered gravestones with dry grass',
 'o-duoc': 'Small beds of glowing medicinal herbs and lingzhi mushrooms with a bamboo fence',
 'o-khoang': 'A rocky outcrop with glowing blue spirit ore crystals and a mining cart',
 'o-linh': 'A cluster of glowing jade-green spirit crystals rising from mossy rocks',
 # địa điểm (mặt chính quay về người nhìn, không đế)
 'dd-bicanh': 'A mysterious secret realm portal: a glowing purple swirling gateway inside an ancient carved stone arch overgrown with vines, a few floating rune stones',
 'dd-como': 'An ancient tomb: a weathered stone burial mound with a carved stone door facing the viewer, stone guardian statues and a stele, dead tree',
 'dd-duoc': 'A spirit herb garden: terraced beds of glowing medicinal herbs and lingzhi mushrooms with a small wooden herb hut and a bamboo fence',
 'dd-dongthien': 'A mystic grotto cave entrance in a mossy jade-green cliff facing the viewer, a small waterfall and mist, a carved stone plaque above the cave mouth',
 'dd-ancu': 'A secluded hermit retreat: a small thatched wooden hut with a stone path, a pine tree and a tiny pond',
 'dd-rung': 'An ancient spirit forest: a cluster of huge old trees with glowing leaves and twisted roots',
}
# Phối cảnh như bản đồ trong game: máy quay nhìn thẳng từ phía nam, chếch xuống ~35°, mặt chính quay về người xem (KHÔNG isometric, không nhìn chéo góc).
GOC = ('Camera: a straight FRONT view from the south, looking slightly down at about 35 degrees, like objects on a 2D strategy map; '
       'NOT isometric, NOT seen from a corner, no diagonal view; horizontal lines stay horizontal, the front faces the viewer directly. ')
P_VAT = ('A single {t}. ' + GOC +
         'Highly detailed hand-painted fantasy game art, Chinese xianxia style, soft sunny light from the upper left, clean silhouette, centered, the whole object visible with margin. '
         'Nothing under it: no base, no tile, no platform, no ground patch, no grass disc. Fully transparent background, no shadow, no text. Output a PNG image with transparency.')
P_DD = ('{t}. ' + GOC +
        'Highly detailed hand-painted xianxia fantasy game art like the world map of a Chinese cultivation game: jade-green and teal mountains, golden and red roofs, soft ink-wash shading, '
        'soft sunny light from the upper left, centered, the whole thing visible with margin. '
        'Nothing around it: no ground base, no square or round platform, no landscape or mountains behind it. Fully transparent background, no shadow, no text. Output a PNG image with transparency.')

# công trình MỘT Ô: vật 3D render, chỉ có vật thể (đế lục giác do game vẽ: ui/05-gfx.js lgDe), góc xiên ~45° từ phía trước, mặt chính quay về camera
GOC45 = ('Camera: from the FRONT and above, looking down at about 45 degrees (a three-quarter view from the front, like a strategy game camera): '
         'not straight top-down, not a side view, not from a corner, not isometric. The object is perfectly FRONT-FACING and symmetrical: '
         'its front wall runs exactly horizontally across the image, parallel to the bottom edge; we see the front facade and the top of the roof, '
         'but not its left or right side walls. ')
P_O = ('A 3D render of {t}, a game asset. ' + GOC45 +
       'Clean stylized 3D rendering with crisp clean edges, soft even daylight from the upper left, rich colors, no ink wash, no painterly bleeding, no outlines. '
       'ONLY the object itself: no background, no ground, no grass, no rocks, no base, no platform, no clouds, no mist, no shadow. '
       'Centered, the whole object visible with margin. Fully transparent background. Output a PNG image with transparency.')
CANH = ()  # (trước đây ô cảnh vẽ kiểu tranh; nay mọi ô địa điểm cùng kiểu 3D render P_O)
def loi(k):
    if k.startswith(('o-', 'dd-')): return P_O
    return P_DD if k.startswith(('dd-', 'o-')) else P_VAT

FULL = os.environ.get('TURBO') != '1'  # mặc định Qwen 2.1 bản đầy đủ (UC, 25 bước); TURBO=1 dùng bản nhanh 8 bước
def t2i(prompt, seed, pre, w=1024, h=1024):
    """Qwen 2.1 vẽ thẳng từ chữ: bỏ ảnh đầu vào của nv.wf, dùng latent rỗng."""
    x = nv.wf('x.png', prompt, seed, pre); del x['6']; e = x['8']['inputs']; del e['images.image_1']; e['resolution'] = max(w, h)
    x['20'] = {'class_type': 'EmptySD3LatentImage', 'inputs': {'width': w, 'height': h, 'batch_size': 1}, '_meta': {'title': 'Empty latent'}}
    x['13']['inputs']['latent_image'] = ['20', 0]
    if FULL:
        x['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        x['12'] = {'class_type': 'BasicScheduler', 'inputs': {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '_meta': {'title': 'Scheduler'}}
        x['9']['inputs']['cfg'] = float(os.environ.get('CFG', '1.0'))
    return x

# ---- Juggernaut XL v9 Lightning (SDXL): MODEL=jugg. Không ra nền trong suốt -> vẽ trên nền trắng rồi xoá nền nối với mép (tach_trang) ----
JUG = os.environ.get('MODEL') == 'jugg'
P_JUG = ('3D render of {t}, single game asset, camera in front and above looking down at 45 degrees, front facade facing the camera, symmetrical, '
         'clean stylized 3D rendering, crisp edges, soft daylight, highly detailed, isolated on a pure flat white background')
N_JUG = ('ground, grass, terrain, landscape, sky, clouds, mist, fog, shadow, text, watermark, isometric, side view, top-down view, blurry, painting, ink, sketch, frame, border')
def jug(prompt, seed, pre):
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    return {'1': T('CheckpointLoaderSimple', {'ckpt_name': 'juggernautXL_v9Rdphoto2Lightning.safetensors'}, 'Juggernaut XL'),
            '2': T('CLIPTextEncode', {'clip': ['1', 1], 'text': prompt}, 'Positive'), '3': T('CLIPTextEncode', {'clip': ['1', 1], 'text': N_JUG}, 'Negative'),
            '4': T('EmptyLatentImage', {'width': 1024, 'height': 1024, 'batch_size': 1}, 'Latent'),
            '5': T('KSampler', {'model': ['1', 0], 'positive': ['2', 0], 'negative': ['3', 0], 'latent_image': ['4', 0], 'seed': seed, 'steps': 6, 'cfg': 1.8,
                                 'sampler_name': 'dpmpp_sde', 'scheduler': 'karras', 'denoise': 1.0}, 'Sample'),
            '6': T('VAEDecode', {'samples': ['5', 0], 'vae': ['1', 2]}, 'Decode'), '15': T('SaveImage', {'images': ['6', 0], 'filename_prefix': pre}, 'Save')}
def tach_trang(path, tol=26):
    """xoá nền trắng nối với mép ảnh (loang từ mép), giữ phần trắng bên trong vật; mép mềm 1px"""
    import numpy as np
    from collections import deque
    im = Image.open(path).convert('RGB'); a = np.asarray(im).astype(np.int16); H, W = a.shape[:2]
    nen = (np.abs(a - 255).max(axis=2) <= tol); seen = np.zeros((H, W), bool); q = deque()
    for x in range(W):
        for y in (0, H - 1):
            if nen[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    for y in range(H):
        for x in (0, W - 1):
            if nen[y, x] and not seen[y, x]: seen[y, x] = True; q.append((y, x))
    while q:
        y, x = q.popleft()
        for dy, dx in ((1, 0), (-1, 0), (0, 1), (0, -1)):
            yy, xx = y + dy, x + dx
            if 0 <= yy < H and 0 <= xx < W and nen[yy, xx] and not seen[yy, xx]: seen[yy, xx] = True; q.append((yy, xx))
    from PIL import ImageFilter
    al = Image.fromarray(np.where(seen, 0, 255).astype(np.uint8)).filter(ImageFilter.MinFilter(3)).filter(ImageFilter.GaussianBlur(0.8))
    o = im.convert('RGBA'); o.putalpha(al); o.save(path)

def gui(viec, sub):
    """viec: list (tên, prompt, seed). Gửi hết lên ComfyUI rồi chờ, lưu vào G/sub/tên.png"""
    os.makedirs(G + sub, exist_ok=True); ids = {}
    for ten, p, seed in viec:
        w = jug(P_JUG.format(t=p), seed, 'lg-' + ten) if (JUG and sub != 'dat') else t2i(p, seed, 'lg-' + ten)
        ids[ten] = nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')['prompt_id']
    for ten, pid in ids.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit('loi ' + ten)
            time.sleep(1.5)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G + sub + '/' + ten + '.png')
        if JUG and sub != 'dat': tach_trang(G + sub + '/' + ten + '.png')
        print('xong', sub, ten, flush=True)
    if sub != 'dat' and not JUG:  # ảnh vật phải trong suốt: còn nền thì vẽ lại với hạt giống khác (tối đa 2 lần)
        con = [(t, p, sd + 101) for t, p, sd in viec if Image.open(G + sub + '/' + t + '.png').convert('RGBA').getextrema()[3][0] > 0]
        if con and getattr(gui, 'lan', 0) < 2:
            print('con nen, ve lai:', [c[0] for c in con], flush=True); gui.lan = getattr(gui, 'lan', 0) + 1
            try: gui(con, sub)
            finally: gui.lan -= 1

if __name__ == '__main__':
    lenh, ds = sys.argv[1], sys.argv[2:]
    s0 = int(os.environ.get('SEED', 0))
    if lenh == 'dat':
        gui([(f'{k}-{j}', P_DAT.format(t=DAT[k]), 500 + j * 17 + s0) for k in ds or list(DAT) for j in range(2)], 'dat')
    elif lenh == 'vat':
        gui([(k, (VAT[k] if JUG else loi(k).format(t=VAT[k])), 700 + i + s0) for i, k in enumerate(ds or list(VAT))], os.environ.get('SUB', 'vat'))
