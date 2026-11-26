# Ảnh cho bản đồ lục giác 3D (docs/thiet-ke/ban-do-luc-giac-3d.md), vẽ bằng ComfyUI (Qwen Image 2.1 Turbo, vẽ thẳng từ chữ).
#   python tools/lg-comfy.py dat [loại ...]   mặt đất nhìn thẳng từ trên (mỗi loại 2 tấm), code cắt thành ô
#   python tools/lg-comfy.py vat [tên ...]    cây, núi, đá, địa điểm… nền trong suốt
#   SEED=n đổi hạt giống.
# Ảnh gốc: src/assets-goc/luc-giac/<dat|vat>/<tên>.png (không lưu git).
import json, os, sys, time, urllib.request, importlib.util
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
 'nhietdoi': 'tropical jungle floor: dense dark green ferns, moss and broad leaves',
 'truc':     'bamboo grove floor: light green grass covered with fallen dry bamboo leaves',
 'rung':     'temperate forest floor: green moss, fallen leaves and small plants',
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
 # địa điểm (quay mặt về người nhìn)
 'dd-tong-lon': ('huge xianxia cultivation sect: golden-roofed Chinese palaces and tall pagodas built on top of a floating mountain island in the sky, '
                 'waterfalls pouring off its edges, smaller floating rocks with pavilions around it, swirling white clouds around its base, front view facing the viewer'),
 'dd-tong': ('Chinese mountain cultivation sect: temples, halls and a pagoda with tiled roofs on a green mountain, stone stairs, white clouds around, front view facing the viewer'),
 'dd-thanh': 'ancient Chinese walled city seen from the front at a low 30 degree angle: tall grey brick wall with a big red gate tower facing the viewer, many bright tiled roofs and a palace rising behind the wall, a few trees at the sides',
 'dd-tran': 'small ancient Chinese village: a few tiled-roof wooden houses, a well, small fields and trees, front facing the viewer',
}
P_VAT = ('A single {t}, isometric 3/4 view from above like a 3D strategy game asset, stylized hand-painted realistic game art like Civilization VI, '
         'soft sunny lighting from the upper left, clean silhouette, centered, whole object visible. '
         'No square base, no tile, no platform, no diorama block under it: only the object itself with a small irregular natural bit of ground at its foot. '
         'Fully transparent background, no ground plane, no shadow, no text. Output a PNG image with transparency.')

def t2i(prompt, seed, pre, w=1024, h=1024):
    """Qwen 2.1 Turbo vẽ thẳng từ chữ: bỏ ảnh đầu vào của nv.wf, dùng latent rỗng."""
    x = nv.wf('x.png', prompt, seed, pre); del x['6']; e = x['8']['inputs']; del e['images.image_1']; e['resolution'] = max(w, h)
    x['20'] = {'class_type': 'EmptySD3LatentImage', 'inputs': {'width': w, 'height': h, 'batch_size': 1}, '_meta': {'title': 'Empty latent'}}
    x['13']['inputs']['latent_image'] = ['20', 0]; return x

def gui(viec, sub):
    """viec: list (tên, prompt, seed). Gửi hết lên ComfyUI rồi chờ, lưu vào G/sub/tên.png"""
    os.makedirs(G + sub, exist_ok=True); ids = {}
    for ten, p, seed in viec:
        ids[ten] = nv.post('/prompt', json.dumps({'prompt': t2i(p, seed, 'lg-' + ten)}).encode(), 'application/json')['prompt_id']
    for ten, pid in ids.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit('loi ' + ten)
            time.sleep(1.5)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G + sub + '/' + ten + '.png')
        print('xong', sub, ten, flush=True)

if __name__ == '__main__':
    lenh, ds = sys.argv[1], sys.argv[2:]
    s0 = int(os.environ.get('SEED', 0))
    if lenh == 'dat':
        gui([(f'{k}-{j}', P_DAT.format(t=DAT[k]), 500 + j * 17 + s0) for k in ds or list(DAT) for j in range(2)], 'dat')
    elif lenh == 'vat':
        gui([(k, P_VAT.format(t=VAT[k][0]) if isinstance(VAT[k], tuple) else P_VAT.format(t=VAT[k]), 700 + i + s0) for i, k in enumerate(ds or list(VAT))], 'vat')
