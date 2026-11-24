# Ảnh nhân vật ngồi thiền NGUYÊN VẸN bằng ComfyUI (Qwen Image 2.1 Turbo, 127.0.0.1:8000), PNG trong suốt.
# HƯỚNG DẪN ĐẦY ĐỦ: docs/thiet-ke/anh-nhan-vat.md
#   python tools/nv-comfy.py cg [id ...] [--lai] : tạo trọn bộ áo (thay áo -> khớp tay + tóc, 2 lượt vẽ) -> src/assets-goc/nv/khop/
#   python tools/nv-comfy.py cat                 : khop/*.png -> src/assets/nv/nv-*.webp (640px)
# Các lệnh cũ (goc, ao, toc, toc5, khop, bac-tn, xem) giữ để tham khảo, không dùng cho bộ ảnh hiện tại.
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
# Áo theo cảnh giới (bảng 3x3 trong src/assets-goc/nv): id -> (bảng, hàng, cột)
CG = {'lk1': ('ao-cg-luyenkhi', 0, 0), 'lk2': ('ao-cg-luyenkhi', 1, 0), 'lk3': ('ao-cg-luyenkhi', 1, 2),
      'tc1': ('ao-cg-trucco', 0, 0), 'tc2': ('ao-cg-trucco', 0, 2), 'tc3': ('ao-cg-trucco', 1, 1),
      'kd1': ('ao-cg-ketdan', 0, 0), 'kd2': ('ao-cg-ketdan', 0, 2), 'kd3': ('ao-cg-ketdan', 1, 1),
      'na1': ('ao-cg-nguyenanh', 0, 0), 'na2': ('ao-cg-nguyenanh', 0, 2), 'na3': ('ao-cg-nguyenanh', 1, 1), 'na4': ('ao-cg-nguyenanh', 2, 1)}
CG.update({'ht%d' % (k + 1): ('ao-cg2-hoathan', k // 3, k % 3) for k in range(9)})
CG.update({'dk%d' % (k + 1): ('ao-cg2-dokiep', k // 3, k % 3) for k in range(9)})
MAU = {'bac': 'shiny silver-white', 'den': 'jet black'}
O5 = {'duoi': (0, 2), 'bui': (1, 1), 'xoa': (0, 0), 'mai': (1, 0), 'song': (2, 0)}
THEM = {'duoi': 'A high ponytail tied with a metal band. No gold crown.',
        'bui': 'A top bun held by a small silver hair crown with a hairpin, long hair hanging down the back. No gold crown.',
        'xoa': 'REMOVE the bun, the gold crown and the hairpin completely: all the hair hangs loose and straight with a center part, nothing on top of the head.',
        'mai': 'REMOVE the bun, the gold crown and the hairpin completely: all the hair hangs loose, with two long front locks framing the face, nothing on top of the head.',
        'song': 'REMOVE the bun, the gold crown and the hairpin completely: long wavy flowing hair hanging loose over the shoulders, nothing on top of the head.'}
GIU_T = ("Keep his face, head size, clothes, sleeves, hands, pose, line work, size and position EXACTLY the same as image 1, keep the image clean and smooth. "
         "Fully transparent background, output a PNG image with transparency.")
for _k in ('ht7', 'dk1', 'dk4'): CG.pop(_k, None)   # người dùng bỏ 3 bộ này
EO = 'Keep his body as broad and solid as in image 1: normal adult male waist and torso width, not slim, not narrow-waisted. '
KHONG_TAY = 'Absolutely NO hands and no fingers anywhere: no hands resting on the knees or thighs, the sleeve openings are empty. '
THEM_AO = {'khach': (KHONG_TAY, 77), 'ma': (KHONG_TAY, 77), 'dk6': (EO, 57), 'dk8': (EO, 57), 'dk9': (EO, 57)}   # chỉnh riêng từng bộ: (câu thêm, seed)
KHONG_REF = set()   # bộ nào chỉ tả bằng chữ (không dùng ảnh mẫu)
CG_TXT = {
 'lk1': 'an ivory-white cross-collar robe with green trim and a dark green sash with a jade pendant',
 'lk2': 'a light green cross-collar robe with darker green trim and a dark sash with a jade pendant',
 'lk3': 'a slate-blue cross-collar robe with dark blue trim and a dark sash with a jade pendant',
 'tc1': 'a two-layer ivory and pale gold silk robe with gold embroidered collar, a long open outer robe and a gold tassel belt',
 'tc2': 'a two-layer dark green silk robe with a sleeveless dark green outer vest, gold trim and a gold tassel belt',
 'tc3': 'a two-layer navy blue and silver-grey silk robe with a sleeveless navy outer vest, silver trim and tassel belt',
 'kd1': 'a luxurious layered ivory and gold silk robe with long wide sleeves, gold crane embroidery and a long embroidered front panel',
 'kd2': 'a luxurious layered deep forest-green silk robe with long wide sleeves, gold embroidery and an ornate jade belt',
 'kd3': 'a luxurious layered navy-blue silk robe with silver-white inner layers, gold embroidery and an ornate belt with tassels',
 'na1': 'grand ivory and gold ceremonial robes with small gold shoulder guards, long sweeping sleeves and dense gold filigree',
 'na2': 'grand dark emerald-green ceremonial robes with gold shoulder guards, long sweeping sleeves and dense gold filigree',
 'na3': 'grand azure-blue ceremonial robes with silver shoulder guards, flowing ribbons and dense silver filigree',
 'na4': 'grand midnight navy and black ceremonial robes with dark gold shoulder guards, flowing dark ribbons and gold filigree',
 'ht1': 'a vermilion and gold phoenix-feather robe with flame-shaped shoulder plates',
 'ht2': 'a deep violet and silver robe with crescent-moon shoulder pieces',
 'ht3': 'a dark teal and bronze robe with an ancient beast-mask chest plate',
 'ht4': 'a snow-white and pale gold robe with crane-wing shoulder pieces',
 'ht5': 'an obsidian black and crimson robe with jagged spiky shoulder ornaments',
 'ht6': 'a turquoise and silver robe with flowing water-wave filigree and translucent ribbons',
 'ht7': 'an amber and dark brown robe with tiger-stripe patterns and armor collar',
 'ht8': 'an indigo robe embroidered with silver star constellations',
 'ht9': 'a rose-gold and ivory robe with peony embroidery and pearl chains',
 'dk1': 'radiant sun-gold glowing regalia with a high sunburst collar and glowing runes',
 'dk2': 'lightning-blue and silver glowing regalia with crackling thunder patterns',
 'dk3': 'cosmic black regalia full of glowing galaxies and stars',
 'dk4': 'pure white glowing regalia of translucent layered silk like wings of light',
 'dk5': 'blood-red and black demon-emperor regalia with glowing red cracks and spiky collar',
 'dk6': 'jade-green celestial regalia with a translucent jade dragon coiling around it',
 'dk7': 'purple and gold nebula regalia with floating ribbons of violet light',
 'dk8': 'silver-white frost regalia with ice crystal armor pieces',
 'dk9': 'prismatic rainbow-pearl regalia shimmering like aurora'}
KIEU_CG = {'lk': 'duoi', 'tc': 'bui', 'kd': 'bui', 'na': 'xoa', 'ht': 'mai', 'dk': 'song'}
BAC_TN = ("Change ONLY the hair color to silver-white with a few grey strands (hair, beard and moustache). Keep exactly the same hairstyle, beard shape, face, clothes, hands, pose, size and position, keep the image clean and smooth. "
          "Fully transparent background, output a PNG image with transparency.")
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
    # tạo thẳng nền trong suốt; ảnh nào còn nền thì vẽ lại cả ảnh với seed khác (không qua bước tách nền)
    con = [x for x in viec if Image.open(G + x[0] + '.png').convert('RGBA').getextrema()[3][0] > 0]
    lan = getattr(chay, 'lan', 0)
    if con and lan < 3:
        print('con nen, ve lai:', [x[0] for x in con], flush=True)
        chay.lan = lan + 1
        try: chay([(ra, im, p, seed + 101, im2) for ra, im, p, seed, im2 in con])
        finally: chay.lan = lan
    elif con: print('CANH BAO van con nen:', [x[0] for x in con], flush=True)

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
    elif cmd == 'toc5':
        # 5 kiểu tóc thanh niên theo cảnh giới (mẫu: ô trên bảng toc-bac-9-7.png, 3x3) x 2 màu, trên ảnh khop/young-<áo>.png
        bang = Image.open(G + 'toc-bac-9-7.png').convert('RGBA'); c = bang.size[0] // 3
        kieus = arg('--kieu') or list(O5); maus = arg('--mau') or list(MAU)
        if 'bac' in maus:   # bước 1: tóc bạc theo mẫu
            v = []
            for a in aos:
                b = Image.open(G + 'khop/young-' + a + '.png')
                for k in kieus:
                    y, x = O5[k]; mau = nen_trang(bang.crop((x * c, y * c, x * c + c, y * c + c)))
                    v.append(('khop/young-' + a + '-bac-' + k, b, "Change ONLY the hairstyle of the man in image 1 to exactly the hairstyle shown in image 2, with shiny silver-white hair. " + THEM[k] + ' ' + GIU_T, seed, mau))
            chay(v)
        if 'den' in maus:   # bước 2: nhuộm đen từ bản bạc, giữ nguyên kiểu
            v = [('khop/young-' + a + '-den-' + k, Image.open(G + 'khop/young-' + a + '-bac-' + k + '.png'),
                  "Change ONLY the hair color to jet black (all of the hair). Keep exactly the same hairstyle, hair shape and accessories. " + GIU_T, seed, None)
                 for a in aos for k in kieus]
            chay(v)
        v = []
        os.makedirs(G + 'khop', exist_ok=True); chay(v)
    elif cmd == 'cg':
        # Áo theo cảnh giới: CG[id] = (bảng, hàng, cột). Mỗi bộ: thay áo trên thân không tay 4 tuổi -> khớp tay áo -> 10 kiểu tóc thanh niên -> tóc bạc trung niên.
        LAI = '--lai' in rest; rest = [x for x in rest if x != '--lai']
        ids = [i for i in (rest or list(AO) + list(CG)) if i in CG or i in AO]   # 7 áo phàm nhân + 31 áo cảnh giới
        L = Image.open(G + 'lop-tay.png').convert('RGBA')
        PK = ("Fix ONLY the ends of the two sleeves so each sleeve opening wraps naturally around the wrist of the hand next to it, with the wrist going into the sleeve and no gap. "
              "Do NOT change the hands at all, and do not change anything else: face, hair, robe, pose, colors, size and position stay exactly the same. "
              "Fully transparent background, output a PNG image with transparency.")
        PK2 = ("Fix the ends of the two sleeves so each sleeve opening wraps naturally around the wrist of the hand next to it, with the wrist going into the sleeve and no gap; do NOT change the hands. ")
        for i in ids:
            if i in CG and i not in KHONG_REF:
                bang, hg, cot = CG[i]; B = Image.open(G + bang + '.png').convert('RGBA'); c = B.size[0] // 3
                mau = nen_trang(B.crop((cot * c, hg * c, cot * c + c, hg * c + c))); mo = CG_TXT[i]
            else: mau = None; mo = CG_TXT[i] if i in CG else AO[i]   # áo phàm nhân: chỉ tả bằng chữ
            v = []
            for t in TUOI:
                pa = ("Completely REPLACE the clothes of the man in image 1 with " + ("the outfit shown in image 2: " if mau else "this outfit: ") + mo + ". "
                      "None of his old robe may remain; the colors of his clothes must match the description. The whole robe must stay fully inside the image with margins on both sides. Adapt the outfit to his cross-legged seated meditation pose, legs crossed flat on the ground. "
                      "Keep his face, head, hairstyle, hair color, body pose, ink line art style, size and position EXACTLY the same, keep the sleeve openings at the knees where they are, NO hands. "
                      "Fully transparent background, output a PNG image with transparency.")
                ta, sd = THEM_AO.get(i, ('', 23))
                v.append((t + '-' + i, Image.open(G + 'than-' + t + '.png'), ta + pa, sd, mau))
            if not LAI: chay(v)
            # lượt 2 (gộp): ghép lớp tay + khớp ống tay, cùng lượt đổi tóc -> mỗi ảnh chỉ qua 2 lượt vẽ, đỡ sần
            k = KIEU_CG.get(i[:2], 'duoi'); y, x = O5[k]; bt = Image.open(G + 'toc-bac-9-7.png').convert('RGBA'); cc = bt.size[0] // 3
            mt = nen_trang(bt.crop((x * cc, y * cc, x * cc + cc, y * cc + cc)))
            tay = {}
            for t in TUOI:
                b = Image.open(G + t + '-' + i + '.png').convert('RGBA'); b.alpha_composite(L); tay[t] = b
            v = [('khop/' + t + '-' + i, tay[t], PK, 2, None) for t in ('teen', 'middle', 'elder')]
            v += [('khop/young-' + i + '-' + m + '-' + k, tay['young'],
                   PK2 + "Also change the hairstyle to exactly the hairstyle shown in image 2, with " + MAU[m] + " hair. " + THEM[k] + ' ' + GIU_T, 23, mt)
                  for m in ('bac', 'den')]
            v += [('khop/middle-' + i + '-bac', tay['middle'], PK2 + BAC_TN, 11, None)]
            chay(v)
            print('XONG BO', i, flush=True)
    elif cmd == 'bac-tn':
        # trung niên tóc bạc (giữ râu, kiểu tóc; chỉ đổi màu)
        aos2 = rest or list(AO)
        chay([('khop/middle-' + a + '-bac', Image.open(G + 'khop/middle-' + a + '.png'), BAC_TN, 11, None) for a in aos2])
    elif cmd == 'khop':
        L = Image.open(G + 'lop-tay.png').convert('RGBA'); la = np.array(L)[..., 3] > 200
        P = ("Fix ONLY the ends of the two sleeves so each sleeve opening wraps naturally around the wrist of the hand next to it, with the wrist going into the sleeve and no gap. "
             "Do NOT change the hands at all, and do not change anything else: face, hair, robe, pose, colors, size and position stay exactly the same. "
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
            if n.startswith('young-') and n.count('-') == 1: continue      # ảnh gốc thanh niên chỉ để đổi tóc
            if n.startswith('middle-') and n.count('-') == 1: n += '-den'  # trung niên gốc = tóc đen
            im = Image.open(f)
            if im.mode != 'RGBA': print('!! khong trong suot', n)
            out = np.array(im.convert('RGBA').resize((640, 640), Image.LANCZOS))
            os.makedirs('src/assets/nv', exist_ok=True); Image.fromarray(out).save('src/assets/nv/nv-' + n + '.webp', quality=88, method=4)
            print('cat', n)
    elif cmd == 'xem':
        out = rest[0]; loc = rest[1] if len(rest) > 1 else ''
        fs = [f for f in sorted(glob.glob(G + '*.png')) if loc in os.path.basename(f) and 'mat-mau' not in f]
        w = 256; cols = 7; im = Image.new('RGB', (w * cols, w * ((len(fs) + cols - 1) // cols)), (40, 120, 90))
        for i, f in enumerate(fs): x = Image.open(f).convert('RGBA').resize((w, w)); im.paste(x, ((i % cols) * w, (i // cols) * w), x)
        im.save(out)
