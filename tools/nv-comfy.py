# Ảnh nhân vật ngồi thiền NGUYÊN VẸN (không ghép lớp) bằng ComfyUI (Qwen Image 2.1 Turbo, 127.0.0.1:8000), xuất PNG trong suốt (RGBA).
#   python tools/nv-comfy.py goc [tuổi ...]        : ảnh gốc mỗi độ tuổi (mặt + tóc chuẩn) -> src/assets-goc/nv/goc-<tuổi>.png
#   python tools/nv-comfy.py ao  [tuổi ...] [--ao a,b]: từ ảnh gốc, thay áo (giữ mặt, tóc) -> nv/<tuổi>-<áo>.png
#   python tools/nv-comfy.py toc [--ao a,b]         : thanh niên: thêm 3 kiểu tóc (bạc búi, đen xoã, bạc xoã)
#   python tools/nv-comfy.py khop [lọc]      : ghép lớp tay, cho Qwen vẽ lại miệng ống tay áo ôm cổ tay, rồi xoá tay khỏi ảnh thân -> nv/<tên>.png
#   python tools/nv-comfy.py cat                    : thu nhỏ ảnh trong suốt -> src/assets/ui/nv-<tuổi>-<áo>[-<tóc>].webp
#   python tools/nv-comfy.py xem <ảnh.png> [lọc]    : bảng soát
import glob, io, json, os, sys, time, urllib.request, uuid
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

G = 'src/assets-goc/nv/'; O = 'src/assets/ui/'; CU = 'src/assets/ui/'
URL = 'http://127.0.0.1:8000'; N = 1024; NEN = (255, 255, 255)
TUOI = ['teen', 'young', 'middle', 'elder']
CU_LOP = {'teen': ('t1', 't1'), 'young': ('hero', 'r1'), 'middle': ('m1', 'm1'), 'elder': ('e1', 'e1')}
TOC = ['den-bui', 'bac-bui', 'den-xoa', 'bac-xoa']  # thanh niên; ảnh gốc = đen búi

KHUNG = ("Same hand-drawn Chinese ink illustration style as image 1: bold black ink outlines, ink hatching, muted colors. "
         "Ancient Chinese xianxia clothing only (hanfu), nothing modern. Fully transparent background, no ground, no shadow. Output a PNG image with transparency.")
GOC = {
 'teen':   "A boy about 15 years old, smooth youthful face, black hair tied in a small high topknot with a simple wooden pin.",
 'young':  "A handsome young man about 22 years old with exactly the face of the person in image 2: same eyes, nose, lips, jaw, skin. "
           "Long straight black hair, upper part tied in a topknot bun with a small gold hair crown and gold hairpin (like image 2), the rest falling down his back and shoulders.",
 'middle': "A man about 50 years old, calm stern face, short neat black beard and moustache, black hair in a topknot bun with a dark jade pin.",
 'elder':  "An old man about 80 years old, kind wrinkled face, long white hair, long flowing white beard and eyebrows, small jade crown on his head.",
}
AO = {
 'pho':   "Plain coarse undyed hemp hanfu: short cross-collar jacket tied with a cloth sash, loose trousers, cloth shoes; patched, humble peasant clothing, muted beige and grey.",
 'tho':   "Ancient Chinese craftsman (blacksmith) clothing: short brown cross-collar hemp robe with sleeves bound by cloth wraps at the forearm, wide leather belt, a worn leather apron in front of the robe, loose dark trousers, cloth shoes. Rugged ancient look, no modern clothes, no buttons, no zipper.",
 'thu':   "Ancient Chinese scholar robe: long flowing pale blue-white cross-collar hanfu with wide sleeves, darker blue trim, simple cloth belt with a jade pendant, elegant and refined.",
 'duoc':  "Taoist priest robe (dao pao): long grey-blue Taoist robe with black edged wide sleeves and collar, yin-yang trigram embroidery, simple sash, serene Taoist cultivator look.",
 'khach': "Wandering swordsman travelling clothes: dark green-brown cross-collar robe tucked for travel, leather bracers on forearms, rope belt with a small gourd, dusty cape-free look, ancient Chinese wuxia style.",
 'gia':   "Rich noble clan heir clothing: layered luxurious hanfu of white and jade green silk with gold embroidered borders, wide sleeves, ornate gold belt with jade pendants and tassel.",
 'ma':    "Demonic cultivator clothing: layered black and deep crimson hanfu with dark red patterns, black leather bracers, ornate dark belt. He also has a small crimson flame mark on his forehead and a faint red demonic aura; when eyes open they would be red.",
}
GIU = ("Keep the face, head, hairstyle, hair color, body pose, ink line art style, size and position EXACTLY the same as image 1, and keep the sleeve openings at the knees exactly where they are. "
       "He has NO hands: the sleeve openings stay empty, never draw hands. "
       "Only change the clothing to: ")
TOC_P = {
 'bac-bui': "Change ONLY the hair color to shiny silver-white (all of the hair). Keep the same hairstyle with the topknot bun and gold crown, same face, same clothes, same pose, same background.",
 'den-xoa': "Change ONLY the hairstyle: no bun, no hair crown, no hairpin; the long straight black hair hangs loose and free down his back and over his shoulders, with a center part. Keep the same face, same clothes, same pose, same background.",
 'bac-xoa': "Change the hairstyle and color: no bun, no hair crown, no hairpin; long straight shiny silver-white hair hangs loose and free down his back and over his shoulders, with a center part. Keep the same face, same clothes, same pose, same background.",
}

def post(path, data, ct):
    return json.load(urllib.request.urlopen(urllib.request.Request(URL + path, data, {'Content-Type': ct})))

def upload(name, img):
    b = io.BytesIO(); img.save(b, 'PNG'); bd = uuid.uuid4().hex
    body = (f'--{bd}\r\nContent-Disposition: form-data; name="image"; filename="{name}"\r\nContent-Type: image/png\r\n\r\n').encode() + b.getvalue() + \
           (f'\r\n--{bd}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{bd}--\r\n').encode()
    return post('/upload/image', body, 'multipart/form-data; boundary=' + bd)['name']

def wf(img, prompt, seed, pre, img2=None):
    """Qwen Image 2.1 Turbo sửa ảnh (theo mẫu image_qwen_image_2_1_turbo_image_edit, bỏ bộ viết lại prompt)."""
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    enc = {'clip': ['4', 0], 'vae': ['5', 0], 'prompt': prompt, 'negative_prompt': '', 'resolution': 0, 'images.image_1': ['6', 0]}
    if img2: enc['images.image_2'] = ['16', 0]
    w = {
        '1': T('UNETLoader', {'unet_name': 'qwen_image_2.1_turbo_int8_convrot.safetensors', 'weight_dtype': 'default'}, 'Qwen 2.1 Turbo'),
        '2': T('QwenImage21Cache', {'model': ['1', 0], 'device': 'auto', 'dtype': 'default'}, 'Cache'),
        '4': T('CLIPLoader', {'clip_name': 'qwen3vl_8b_int8_convrot.safetensors', 'type': 'qwen_image', 'device': 'default'}, 'Text encoder'),
        '5': T('VAELoader', {'vae_name': 'qwen_image_2.1_vae_bf16.safetensors'}, 'VAE'),
        '6': T('LoadImage', {'image': img}, 'Input'),
        '8': T('TextEncodeQwenImage21', enc, 'Encode'),
        '9': T('CFGGuider', {'model': ['2', 0], 'positive': ['8', 0], 'negative': ['8', 1], 'cfg': 1.0}, 'Guider'),
        '10': T('RandomNoise', {'noise_seed': seed}, 'Noise'),
        '11': T('KSamplerSelect', {'sampler_name': 'euler'}, 'Sampler'),
        '12': T('ManualSigmas', {'sigmas': '1.0, 0.978453, 0.95418, 0.926626, 0.89508, 0.845148, 0.704534, 0.414568, 0'}, 'Turbo sigmas'),
        '13': T('SamplerCustomAdvanced', {'noise': ['10', 0], 'guider': ['9', 0], 'sampler': ['11', 0], 'sigmas': ['12', 0], 'latent_image': ['8', 2]}, 'Sample'),
        '14': T('VAEDecode', {'samples': ['13', 0], 'vae': ['5', 0]}, 'Decode'),
        '15': T('SaveImage', {'images': ['14', 0], 'filename_prefix': pre}, 'Save'),
    }
    if img2: w['16'] = T('LoadImage', {'image': img2}, 'Face reference')
    return w

def nen_trang(im):
    im = im.convert('RGBA'); L = Image.new('RGBA', im.size, NEN + (255,)); L.alpha_composite(im); return L.convert('RGB')

def chay(viec):
    """viec: list (tên_ra, ảnh_PIL, prompt, seed, ảnh2|None). Gửi hết rồi chờ."""
    ids = {}
    for ra, im, p, seed, im2 in viec:
        i = upload('nv-' + ra.replace('/', '_') + '.png', nen_trang(im).resize((N, N), Image.LANCZOS))
        j = upload('nv-' + ra.replace('/', '_') + '-ref.png', im2.convert('RGB')) if im2 is not None else None
        ids[ra] = post('/prompt', json.dumps({'prompt': wf(i, p, seed, 'nv-' + ra.replace('/', '_'), j)}).encode(), 'application/json')['prompt_id']
    for ra, pid in ids.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit('loi ' + ra)
            time.sleep(2)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", G + ra + '.png')
        print('xong', ra, flush=True)
    con = [ra for ra in ids if Image.open(G + ra + '.png').convert('RGBA').getextrema()[3][0] > 0]
    if con and not getattr(chay, 'dang', 0):  # ảnh còn nền -> cho Qwen 2.1 tách nền
        chay.dang = 1
        try: chay([(ra, Image.open(G + ra + '.png'), 'Remove the background, and output a PNG image', 1, None) for ra in con])
        finally: chay.dang = 0

def anh_cu(tuoi):
    a, h = CU_LOP[tuoi]; L = Image.new('RGBA', (640, 640), NEN + (255,))
    for f in ['ch-of-' + a, 'ch-neck-' + a, 'ch-head-' + h, 'ch-hands']:
        p = CU + f + '.webp'
        if os.path.exists(p): L.alpha_composite(Image.open(p).convert('RGBA'))
    return L

def arg(k):
    if k in sys.argv: i = sys.argv.index(k); v = sys.argv[i + 1]; del sys.argv[i:i + 2]; return v.split(',')
    return None

def seed_of():
    s = arg('--seed'); return int(s[0]) if s else 11

if __name__ == '__main__':
    os.makedirs(G, exist_ok=True)
    aos = arg('--ao') or list(AO); seed = seed_of(); cmd = sys.argv[1]; rest = sys.argv[2:]
    if cmd == 'goc':
        v = []
        for t in rest or TUOI:
            ref = Image.open(G + 'mat-mau.png') if t == 'young' else None
            v.append(('goc-' + t, anh_cu(t), 'Redraw image 1 as: ' + KHUNG + ' ' + GOC[t], seed, ref))
        chay(v)
    elif cmd == 'ao':
        v = []
        for t in rest or TUOI:
            b = Image.open(G + 'than-' + t + '.png')
            for a in aos: v.append((t + '-' + a, b, GIU + AO[a] + ' ' + KHUNG, seed, None))
        chay(v)
    elif cmd == 'toc':
        v = []
        for a in aos:
            b = Image.open(G + 'young-' + a + '.png')
            for k, p in TOC_P.items(): v.append(('young-' + a + '-' + k, b, p + ' No hands, keep the sleeve openings empty. Fully transparent background, output a PNG image with transparency.', seed, None))
        chay(v)
    elif cmd == 'khop':
        L = Image.open(G + 'lop-tay.png').convert('RGBA'); la = np.array(L)[..., 3] > 200
        P = ("Fix ONLY the ends of the two sleeves so each sleeve opening wraps naturally around the wrist of the hand next to it, with the wrist going into the sleeve and no gap. "
             "Do NOT change the hands at all, and do not change anything else: face, hair, robe, pose, colors, ink style, size and position stay exactly the same. "
             "Fully transparent background, output a PNG image with transparency.")
        loc = rest[0] if rest else ''
        ds = [os.path.basename(f)[:-4] for f in sorted(glob.glob(G + '*-*.png'))]
        ds = [n for n in ds if n.startswith(tuple(TUOI)) and loc in n]
        v = []
        for n in ds:
            b = Image.open(G + n + '.png').convert('RGBA'); b.alpha_composite(L); v.append(('khop/' + n, b, P, 2, None))
        os.makedirs(G + 'khop', exist_ok=True); chay(v)
        for n in ds:
            print('khop', n)  # ảnh dùng là khop/<tên>.png (đủ áo + tay)
    elif cmd == 'cat':
        for f in sorted(glob.glob(G + 'khop/*-*.png')):
            n = os.path.basename(f)[:-4]
            if not n.startswith(tuple(TUOI)): continue
            if n.startswith('young-') and n.count('-') == 1: n += '-den-bui'  # ảnh gốc thanh niên = tóc đen búi
            im = Image.open(f)
            if im.mode != 'RGBA': print('!! khong trong suot', n)
            out = np.array(im.convert('RGBA').resize((640, 640), Image.LANCZOS))
            Image.fromarray(out).save(O + 'nv-' + n + '.webp', quality=90, method=6)
            print('cat', n)
    elif cmd == 'xem':
        out = rest[0]; loc = rest[1] if len(rest) > 1 else ''
        fs = [f for f in sorted(glob.glob(G + '*.png')) if loc in os.path.basename(f) and 'mat-mau' not in f]
        w = 256; cols = 7; im = Image.new('RGB', (w * cols, w * ((len(fs) + cols - 1) // cols)), (40, 120, 90))
        for i, f in enumerate(fs): x = Image.open(f).convert('RGBA').resize((w, w)); im.paste(x, ((i % cols) * w, (i // cols) * w), x)
        im.save(out)
