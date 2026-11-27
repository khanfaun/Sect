# Vẽ địa điểm của MỘT QUẬN vào bản đồ đã khám phá, ở độ phân giải cao, rồi cắt thành ô ảnh nhiều mức phóng.
# Ảnh sinh bằng ComfyUI (Qwen Image 2.1 bản đầy đủ, 25 bước) qua comfy-mcp; tệp này chỉ chuẩn bị đầu vào / ghép kết quả.
#
#   python tools/quan-ve.py chuan-bi <quận>    -> work/quan-<q>/: bố cục, nền phóng lớn, ảnh mẫu phong cách, workflow vẽ mẫu địa điểm (mau-*.json)
#   (chạy mau-*.json bằng comfy-mcp, tải kết quả về work/quan-<q>/mau/)
#   python tools/quan-ve.py dan <quận>         -> dán mẫu vào đúng chỗ từng địa điểm, dựng bản đồ độ mạnh vẽ lại, workflow khung 0
#   python tools/quan-ve.py khung <quận> <k> <ảnh ra>  -> ghép kết quả khung k vào bản lớn, viết workflow khung k+1
#   python tools/quan-ve.py xuat <quận>        -> cắt ô ảnh src/assets/ban-do/o/<mức>/<x>-<y>.webp + bảng O_ANH (core2/03d-o-anh.js)
#
# Toạ độ: mức 2 = 3 điểm ảnh / đơn vị thế giới (bản đồ ảo 10668×6000), mức 1 = 1,5, mức 0 = 0,75. Ô ảnh 512.
import json, os, sys, subprocess, math
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
from scipy import ndimage as ndi

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
os.chdir(ROOT)
GOC = 'src/assets-goc/ban-do/Hidden-map - Backup.webp'
WW, WH = 3556, 2000
S2 = 3.0; TS = 512; N = int(os.environ.get('KHUNG', 1280)); BG = float(os.environ.get('BG', 0.62))
MUC = {0: 0.75, 1: 1.5, 2: 3.0}
MODEL = 'qwen-image-2.1-UC-int8_convrot.safetensors'
XAY = ('tong', 'thanh', 'tuthanh', 'tran', 'tutran', 'ancu', 'khoang', 'ditich', 'dongthien', 'linhdia', 'como', 'bicanh', 'duoc', 'sao', 'cho', 'phe')

def D(q): d = f'work/quan-{q}/'; os.makedirs(d + 'mau', exist_ok=True); os.makedirs(d + 'ra', exist_ok=True); return d

# ---------- bố cục quận (lấy từ luật chơi) ----------
def bo_cuc(q):
    js = f'''(()=>{{const w=ddBoCuc(DD_HAT);const g=geoFor(w);const o=[];
      for(const R0 of w.regions)for(const n of R0.nodes){{if(g.dist[n.hex]!=={q})continue;const L=placeCells(n);
        o.push({{id:n.id,t:n.type,quy:n.quy||0,hex:n.hex,o:L.length,c:hexCenter(n.hex),xy:L.map(c=>hexCenter(c))}});}}
      const qc=[];for(let i=0;i<HN;i++)if(g.dist[i]==={q})qc.push(hexCenter(i));return JSON.stringify({{noi:o,quan:qc}});}})()'''
    out = subprocess.run(['node', 'tools/run.js', js], capture_output=True, text=True, encoding='utf-8').stdout
    return json.loads(out)

def khung_quan(B):
    xs = [p[0] for p in B['quan']]; ys = [p[1] for p in B['quan']]
    m = 90  # lề quanh quận (đơn vị thế giới)
    tx0 = int((min(xs) - m) * S2 // TS); tx1 = int(math.ceil((max(xs) + m) * S2 / TS))
    ty0 = int((min(ys) - m) * S2 // TS); ty1 = int(math.ceil((max(ys) + m) * S2 / TS))
    tx0, ty0 = max(0, tx0), max(0, ty0); tx1 = min(tx1, int(math.ceil(WW * S2 / TS))); ty1 = min(ty1, int(math.ceil(WH * S2 / TS)))
    return tx0, ty0, tx1, ty1

def px(K, x, y): return (x * S2 - K[0] * TS, y * S2 - K[1] * TS)

# ---------- workflow Qwen 2.1 đầy đủ ----------
def wf(img1, prompt, seed, pre, img2=None, mask=None, res=N):
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    enc = {'clip': ['4', 0], 'vae': ['5', 0], 'prompt': prompt, 'negative_prompt': '', 'resolution': res, 'images.image_1': ['6', 0]}
    if img2: enc['images.image_2'] = ['16', 0]
    w = {'1': T('UNETLoader', {'unet_name': MODEL, 'weight_dtype': 'default'}, 'Qwen 2.1 full'),
         '2': T('QwenImage21Cache', {'model': ['1', 0], 'device': 'auto', 'dtype': 'default'}, 'Cache'),
         '4': T('CLIPLoader', {'clip_name': 'qwen3vl_8b_int8_convrot.safetensors', 'type': 'qwen_image', 'device': 'default'}, 'Text encoder'),
         '5': T('VAELoader', {'vae_name': 'qwen_image_2.1_vae_bf16.safetensors'}, 'VAE'),
         '6': T('LoadImage', {'image': img1}, 'Picture 1'),
         '8': T('TextEncodeQwenImage21', enc, 'Encode'),
         '9': T('CFGGuider', {'model': ['2', 0], 'positive': ['8', 0], 'negative': ['8', 1], 'cfg': 1.0}, 'Guider'),
         '10': T('RandomNoise', {'noise_seed': seed}, 'Noise'),
         '11': T('KSamplerSelect', {'sampler_name': 'euler'}, 'Sampler'),
         '12': T('BasicScheduler', {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, '25 steps'),
         '13': T('SamplerCustomAdvanced', {'noise': ['10', 0], 'guider': ['9', 0], 'sampler': ['11', 0], 'sigmas': ['12', 0], 'latent_image': ['8', 2]}, 'Sample'),
         '14': T('VAEDecode', {'samples': ['13', 0], 'vae': ['5', 0]}, 'Decode'),
         '15': T('SaveImage', {'images': ['14', 0], 'filename_prefix': pre}, 'Save')}
    if img2: w['16'] = T('LoadImage', {'image': img2}, 'Picture 2')
    if mask:  # vẽ bù: độ xám của mặt nạ = độ mạnh vẽ lại từng điểm ảnh (DifferentialDiffusion)
        w['18'] = T('VAEEncode', {'pixels': ['6', 0], 'vae': ['5', 0]}, 'Encode map')
        w['19'] = T('LoadImageMask', {'image': mask, 'channel': 'red'}, 'Strength map')
        w['20'] = T('SetLatentNoiseMask', {'samples': ['18', 0], 'mask': ['19', 0]}, 'Noise mask')
        w['21'] = T('DifferentialDiffusion', {'model': ['2', 0]}, 'Differential diffusion')
        w['9']['inputs']['model'] = ['21', 0]; w['12']['inputs']['model'] = ['21', 0]; w['13']['inputs']['latent_image'] = ['20', 0]
    return w

def wf_lp(img1, prompt, seed, pre, mask, mo='klein', res=N, buoc=None, refs=()):
    """Vẽ bù bằng LanPaint (lấy mẫu chuyên cho inpaint: vùng khoanh vẽ mới, mép tự nối) trên Klein 9B hoặc Qwen 2.1."""
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    w = {'6': T('LoadImage', {'image': img1}, 'Map crop'),
         '19': T('LoadImageMask', {'image': mask, 'channel': 'red'}, 'Inpaint mask'),
         '10': T('RandomNoise', {'noise_seed': seed}, 'Noise'),
         '11': T('KSamplerSelect', {'sampler_name': 'euler'}, 'Sampler'),
         '18': T('VAEEncode', {'pixels': ['6', 0], 'vae': ['5', 0]}, 'Encode map'),
         '20': T('SetLatentNoiseMask', {'samples': ['18', 0], 'mask': ['19', 0]}, 'Noise mask'),
         '13': T('LanPaint_SamplerCustomAdvanced', {'noise': ['10', 0], 'guider': ['9', 0], 'sampler': ['11', 0], 'sigmas': ['12', 0], 'latent_image': ['20', 0],
                 'LanPaint_NumSteps': int(os.environ.get('LP', 2)), 'LanPaint_Lambda': 4.0, 'LanPaint_StepSize': 0.15, 'LanPaint_Beta': 1.0, 'LanPaint_Friction': 15.0,
                 'LanPaint_PromptMode': 'Image First', 'LanPaint_EarlyStop': 1, 'LanPaint_Info': '', 'LanPaint_InnerThreshold': 0.02, 'LanPaint_InnerPatience': 1}, 'LanPaint sample'),
         '14': T('VAEDecode', {'samples': ['13', 0], 'vae': ['5', 0]}, 'Decode'),
         '15': T('SaveImage', {'images': ['14', 0], 'filename_prefix': pre}, 'Save')}
    if mo == 'klein':
        w.update({'1': T('UNETLoader', {'unet_name': 'flux-2-klein-9b-kv-fp8.safetensors', 'weight_dtype': 'default'}, 'FLUX.2 Klein 9B'),
                  '4': T('CLIPLoader', {'clip_name': 'qwen_3_8b_fp8mixed.safetensors', 'type': 'flux2', 'device': 'default'}, 'Text encoder'),
                  '5': T('VAELoader', {'vae_name': 'flux2-vae.safetensors'}, 'VAE'),
                  '7': T('CLIPTextEncode', {'clip': ['4', 0], 'text': prompt}, 'Prompt'),
                  '8': T('ReferenceLatent', {'conditioning': ['7', 0], 'latent': ['18', 0]}, 'Map as reference'),
                  **{f'3{i}': T('LoadImage', {'image': r}, f'Style ref {i + 1}') for i, r in enumerate(refs)},
                  **{f'4{i}': T('VAEEncode', {'pixels': [f'3{i}', 0], 'vae': ['5', 0]}, f'Encode ref {i + 1}') for i, r in enumerate(refs)},
                  **{f'5{i}': T('ReferenceLatent', {'conditioning': ['8' if i == 0 else f'5{i - 1}', 0], 'latent': [f'4{i}', 0]}, f'Style ref {i + 1}') for i, r in enumerate(refs)},
                  '21': T('ConditioningZeroOut', {'conditioning': ['7', 0]}, 'Negative'),
                  '9': T('CFGGuider', {'model': ['1', 0], 'positive': [f'5{len(refs) - 1}' if refs else '8', 0], 'negative': ['21', 0], 'cfg': 1.0}, 'Guider'),
                  '12': T('Flux2Scheduler', {'steps': buoc or 8, 'width': res, 'height': res}, 'Scheduler')})
    else:
        enc = {'clip': ['4', 0], 'vae': ['5', 0], 'prompt': prompt, 'negative_prompt': '', 'resolution': res, 'images.image_1': ['6', 0]}
        w.update({'1': T('UNETLoader', {'unet_name': MODEL, 'weight_dtype': 'default'}, 'Qwen 2.1 full'),
                  '2': T('QwenImage21Cache', {'model': ['1', 0], 'device': 'auto', 'dtype': 'default'}, 'Cache'),
                  '4': T('CLIPLoader', {'clip_name': 'qwen3vl_8b_int8_convrot.safetensors', 'type': 'qwen_image', 'device': 'default'}, 'Text encoder'),
                  '5': T('VAELoader', {'vae_name': 'qwen_image_2.1_vae_bf16.safetensors'}, 'VAE'),
                  '8': T('TextEncodeQwenImage21', enc, 'Encode'),
                  '9': T('CFGGuider', {'model': ['2', 0], 'positive': ['8', 0], 'negative': ['8', 1], 'cfg': 1.0}, 'Guider'),
                  '12': T('BasicScheduler', {'model': ['2', 0], 'scheduler': 'simple', 'steps': buoc or 25, 'denoise': 1.0}, 'Scheduler')})
    return w

# ---------- lời tả ----------
GOC_NHIN = ("seen from a high oblique bird's-eye view, about 40 degrees down, from the front (south), facades facing the viewer, "
            "like the mountains and trees of the map; NOT a top-down plan view, NOT isometric")
PHONG = ("Picture 1 shows pieces of a hand-painted antique Chinese fantasy world map. Use it ONLY as the style reference: the same fine brown-black ink pen lines, "
         "the same sepia, ochre and muted grey-green ink washes, the same shading of trees, rocks and roofs. ")
NEN = " Plain white paper background around it; the ground under it fades out softly into the white at the edges. Nothing else in the picture."
MAU = {
    'tong': ("Paint a NEW picture of a grand, majestic immortal cultivation sect, centered, " + GOC_NHIN + ": a cluster of steep rock peaks crowned with many tiers of palace halls, "
             "pagodas and pavilions joined by long stone stairways and arched bridges, a great hall on the highest summit; several small mountains FLOATING in the air above and "
             "around it, each carrying pavilions, with thin waterfalls pouring from them and chains linking them to the peaks; wide bands of white cloud drifting horizontally "
             "across the middle of the peaks, so the sect looks immensely tall and towering." + NEN),
    'thanh': ("Paint a NEW picture of a walled ancient Chinese city, centered, " + GOC_NHIN + ": a square of grey stone walls with crenellations, a gate tower in the front wall, "
              "corner towers, streets packed with tiled roofs, a palace hall in the middle." + NEN),
    'nho': ("Paint a NEW sheet of 9 SEPARATE small map icons arranged in a 3 by 3 grid with plenty of white space between them, every icon " + GOC_NHIN + ". "
            "Top row: a farming village of a few thatched houses with small fields; a small cultivators' market town with a two-storey pavilion and stalls; a tiny walled immortal town with a tall pagoda tower. "
            "Middle row: a hermit's bamboo hut beside pines; a mine entrance in a rocky hill with wooden scaffolding and carts; ancient ruins of a broken temple with fallen pillars. "
            "Bottom row: a mountain grotto cave-heaven with a glowing entrance and mist; a sacred spirit land with an old giant tree and standing stones; an ancient tomb mound with a stone gate and stone guardians."
            " Each icon stands on its own small patch of ground that fades into the white paper." ),
}
NHO_O = {'tran': 0, 'cho': 0, 'tutran': 1, 'duoc': 1, 'tuthanh': 2, 'ancu': 3, 'khoang': 4, 'ditich': 5, 'phe': 5, 'dongthien': 6, 'bicanh': 6, 'linhdia': 7, 'sao': 7, 'como': 8}

def ref_phong(K):
    """Ảnh 1 cho vẽ mẫu: bốn mảnh bản đồ đã khám phá (chỗ nhiều núi, cây, nhà) ghép 2×2."""
    G = Image.open(GOC).convert('RGB'); s = G.size[0] / WW
    o = Image.new('RGB', (N, N), 'white')
    for k, (x, y) in enumerate([(1230, 560), (1560, 600), (900, 1500), (2560, 1700)]):
        c = G.crop((int((x - 160) * s), int((y - 160) * s), int((x + 160) * s), int((y + 160) * s))).resize((N // 2, N // 2), Image.LANCZOS)
        o.paste(c, ((k % 2) * N // 2, (k // 2) * N // 2))
    return o

def chuan_bi(q):
    d = D(q); B = bo_cuc(q); K = khung_quan(B); B['K'] = K
    json.dump(B, open(d + 'bocuc.json', 'w', encoding='utf-8'))
    G = Image.open(GOC).convert('RGB'); s = G.size[0] / WW
    wx0, wy0 = K[0] * TS / S2, K[1] * TS / S2; W, H = (K[2] - K[0]) * TS, (K[3] - K[1]) * TS
    nen = G.crop((round(wx0 * s), round(wy0 * s), round((wx0 + W / S2) * s), round((wy0 + H / S2) * s))).resize((W, H), Image.LANCZOS)
    nen.save(d + 'nen.png'); ref_phong(K).save(d + 'ref-phong.png')
    for k, p in MAU.items():
        json.dump(wf(f'qv{q}-ref-phong.png', PHONG + p, 1000 + len(k), f'qv{q}-mau-{k}'), open(d + f'mau-{k}.json', 'w'))
    print('khung ô', K, 'cỡ', W, H, 'nơi', len(B['noi']), 'xây', sum(1 for n in B['noi'] if n['t'] in XAY))

# ---------- dán mẫu ----------
def tach(im):
    """Ảnh mẫu nền trắng -> RGBA. Thân hình (vùng mực đặc, lấp cả lỗ: mây trắng trong tông môn vẫn giữ) đục hẳn;
    phần đất loang quanh chân: tách màu khỏi giấy trắng (unmix), nên trong dần đúng theo độ nhạt, không còn quầng trắng."""
    a = np.asarray(im.convert('RGB'), np.float32)
    au = np.clip((255 - a.min(2)) / 255 * 1.25, 0, 1)
    un = 255 - (255 - a) / np.maximum(au, 1e-3)[..., None]; un = np.clip(un, 0, 255)
    sol = ndi.binary_closing(au > 0.3, iterations=4); sol = ndi.binary_fill_holes(sol)
    lab, nl = ndi.label(sol)
    if nl:
        sz = ndi.sum(np.ones_like(au), lab, range(1, nl + 1)); sol = np.isin(lab, 1 + np.where(sz > au.size * 0.003)[0])
    sol = ndi.gaussian_filter(ndi.binary_erosion(sol, iterations=2).astype(np.float32), 2.5)
    al = np.maximum(au * ndi.binary_dilation(sol > 0.05, iterations=40), sol)
    col = a * sol[..., None] + un * (1 - sol[..., None])
    return Image.fromarray(np.dstack([col, al * 255]).astype(np.uint8))

def cat_nho(im):
    """Cắt bảng 3×3 nơi nhỏ thành 9 ảnh (theo lưới, rồi cắt sát phần có mực)."""
    w, h = im.size; L = []
    for k in range(9):
        c = im.crop(((k % 3) * w // 3, (k // 3) * h // 3, (k % 3 + 1) * w // 3, (k // 3 + 1) * h // 3))
        t = tach(c); bb = t.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox(); L.append(t.crop(bb) if bb else t)
    return L

def dan(q):
    d = D(q); B = json.load(open(d + 'bocuc.json', encoding='utf-8')); K = B['K']
    nen = Image.open(d + 'nen.png').convert('RGB'); W, H = nen.size
    lop = Image.new('RGBA', (W, H), (0, 0, 0, 0))
    manh = np.full((H, W), BG, np.float32)  # độ mạnh vẽ lại: nền chỉ làm nét lại
    MT = {k: tach(Image.open(d + f'mau/{k}.png')) for k in ('tong', 'thanh') if os.path.exists(d + f'mau/{k}.png')}
    for k, t in MT.items():
        bb = t.getchannel('A').point(lambda v: 255 if v > 20 else 0).getbbox(); MT[k] = t.crop(bb)
    NHO = cat_nho(Image.open(d + 'mau/nho.png')) if os.path.exists(d + 'mau/nho.png') else []
    vung = np.zeros((H, W), np.float32)
    noi = sorted([n for n in B['noi'] if n['t'] in XAY], key=lambda n: n['c'][1])  # vẽ từ sau ra trước
    for i, n in enumerate(noi):
        R = {1: 0, 7: 1, 19: 2, 37: 3}.get(n['o'], 0)
        rong = (2 * R + 1) * 30 * S2 * (1.3 if n['t'] == 'tong' else 1.15)  # bề ngang hình vẽ (đ.ả) — to hơn cụm ô một chút
        if n['t'] == 'tong' and 'tong' in MT: a = MT['tong']; rong = min(rong, (2 * R + 1) * 30 * S2 * 1.0 * MT['tong'].size[0] / MT['tong'].size[1] * 1.25)  # không cao quá ~1,25 bề ngang cụm: khỏi đè nơi phía sau
        elif n['t'] in ('thanh',) and 'thanh' in MT: a = MT['thanh']
        elif NHO: a = NHO[NHO_O.get(n['t'], 0)]; rong = max(rong, 30 * S2 * (1.6 if n['o'] == 1 else 1.2))
        else: continue
        if i % 2: a = a.transpose(Image.FLIP_LEFT_RIGHT)  # nơi cùng loại trông khác nhau chút
        sc = rong / a.size[0]; a = a.resize((max(1, round(a.size[0] * sc)), max(1, round(a.size[1] * sc))), Image.LANCZOS)
        cx, cy = px(K, *n['c'])
        # chân hình vẽ đặt ở mép dưới cụm ô; phần cao (núi bay, mây) vươn lên trên
        day = cy + R * 26 * S2 + 14 * S2
        x0, y0 = round(cx - a.size[0] / 2), round(day - a.size[1])
        lop.alpha_composite(a, (max(0, x0), max(0, y0)), (max(0, -x0), max(0, -y0)))
        m = np.zeros((H, W), np.float32); A = np.asarray(a.getchannel('A'), np.float32) / 255
        ys, xs = slice(max(0, y0), min(H, y0 + a.size[1])), slice(max(0, x0), min(W, x0 + a.size[0]))
        m[ys, xs] = A[ys.start - y0:ys.stop - y0, xs.start - x0:xs.stop - x0]
        vung = np.maximum(vung, m)
    # độ mạnh (ngưỡng sigma của DifferentialDiffusion; Qwen dịch lịch sigma nên số phải cao): trong hình vẽ 0.9 (giữ bố cục mẫu, vẽ lại nét theo bản đồ),
    # vòng chuyển tiếp 0.8 (cây / đồi bồi phía trước chân), xa dần về nền BG
    trong = ndi.gaussian_filter((vung > 0.15).astype(np.float32), 6)
    ngoai = ndi.gaussian_filter(ndi.binary_dilation(vung > 0.15, iterations=int(18 * S2)).astype(np.float32), 14 * S2)
    truoc = ndi.gaussian_filter(np.roll(ndi.binary_dilation(vung > 0.15, iterations=int(6 * S2)), int(10 * S2), axis=0).astype(np.float32), 8 * S2)  # dải phía trước chân
    manh = np.maximum.reduce([manh, BG + (0.8 - BG) * ngoai, 0.84 * truoc, 0.9 * trong])
    out = nen.convert('RGBA'); out.alpha_composite(lop); out = out.convert('RGB')
    out.save(d + 'dan.png'); out.save(d + 'lam.png')
    np.save(d + 'manh.npy', manh); Image.fromarray((manh * 255).astype(np.uint8)).save(d + 'manh.png')
    np.save(d + 'xong.npy', np.zeros((H, W), np.uint8))
    print('dán', len(noi), 'nơi; cỡ', W, H, '; khung:', khung_ds(W, H))
    viet_khung(q, 0)

def khung_ds(W, H):
    xs = sorted(set([0, W - N] + list(range(0, W - N, N // 2)))); ys = sorted(set([0, H - N] + list(range(0, H - N, N * 2 // 3))))
    return sorted([(x, y) for y in ys for x in xs], key=lambda p: math.hypot(p[0] + N / 2 - W / 2, p[1] + N / 2 - H * 0.6))  # từ giữa (tông môn) ra ngoài

PK = ("Repaint this piece of a hand-painted antique Chinese fantasy world map at higher quality and sharper resolution, with crisp confident brown-black ink linework, "
      "natural brush strokes, soft sepia, ochre and faded grey-green ink washes on aged paper. Keep the composition EXACTLY: every mountain, ridge, river, lake, road, tree, "
      "building and town stays at the same position, same size and same shape; do not move anything. "
      "The towns, ruins and the immortal sect on the floating mountains were pasted in from another drawing: repaint them in the very same ink and colours as the rest of the map, "
      "so they look drawn by the same hand, keeping their shapes and their high oblique bird's-eye view; remove any white halo or white patch around them and let their ground blend "
      "seamlessly into the surrounding land; where a building stands right behind a hill or a wood, let a few trees or a low hill overlap the front of its base. "
      "The floating mountains of the sect stay floating in the sky with soft white clouds drifting across them. No text, no labels.")

def viet_khung(q, k):
    d = D(q); lam = Image.open(d + 'lam.png'); W, H = lam.size; L = khung_ds(W, H)
    if k >= len(L): print('HẾT KHUNG — chạy: python tools/quan-ve.py xuat', q); return
    x, y = L[k]; manh = np.load(d + 'manh.npy'); xong = np.load(d + 'xong.npy')
    cr = lam.crop((x, y, x + N, y + N)); m = manh[y:y + N, x:x + N].copy()
    # chỗ khung trước đã vẽ: chỉ làm nhẹ, mép giáp nối giữ nguyên (đường nối liền)
    xg = ndi.gaussian_filter(xong[y:y + N, x:x + N].astype(np.float32), 40)
    m = m * (1 - xg) + 0.0 * xg
    cr.save(d + f'ra/qv{q}-k{k}-vao.png'); Image.fromarray((np.clip(m, 0, 1) * 255).astype(np.uint8)).convert('RGB').save(d + f'ra/qv{q}-k{k}-mn.png')
    # Qwen 2.1 (mô hình sửa ảnh) dùng mặt nạ mềm thì gần như chép y ảnh vào -> mặc định sửa cả khung (giữ bố cục, vẽ lại nét); mặt nạ chỉ còn để ghép mềm mép
    json.dump(wf(f'qv{q}-k{k}-vao.png', PK, 500 + k, f'qv{q}-k{k}', mask=f'qv{q}-k{k}-mn.png' if os.environ.get('MN') else None), open(d + f'ra/k{k}.json', 'w'))
    print(f'khung {k}/{len(L)} tại', (x, y), '->', os.path.abspath(d + f'ra/k{k}.json'))

def nan_khop(vao, ra):
    """Mô hình đôi khi xê dịch / giãn nhẹ cả khung (tới vài chục điểm ảnh). Đo độ lệch dày đặc (optical flow, ảnh thu 1/4, làm trơn mạnh)
    rồi kéo ảnh ra về đúng vị trí ảnh vào, để núi sông khớp dữ liệu ô và khớp các khung bên cạnh."""
    from skimage.registration import optical_flow_tvl1
    f = 4; A = np.asarray(vao.convert('L').resize((N // f, N // f), Image.LANCZOS), np.float32) / 255
    B = np.asarray(ra.convert('L').resize((N // f, N // f), Image.LANCZOS), np.float32) / 255
    A = ndi.gaussian_filter(A, 1.5); B = ndi.gaussian_filter(B, 1.5)
    v, u = optical_flow_tvl1(A, B, attachment=8, tightness=0.3, num_warp=8, num_iter=30)
    v = ndi.gaussian_filter(v, 10) * f; u = ndi.gaussian_filter(u, 10) * f
    v = ndi.zoom(v, f, order=1); u = ndi.zoom(u, f, order=1)
    yy, xx = np.mgrid[0:N, 0:N].astype(np.float32)
    R = np.asarray(ra, np.float32); out = np.stack([ndi.map_coordinates(R[..., c], [yy + v, xx + u], order=1, mode='nearest') for c in range(3)], 2)
    return Image.fromarray(np.clip(out, 0, 255).astype(np.uint8)), float(np.hypot(v, u).max())

def duong_cat(cost):
    """Đường cắt dọc (mỗi hàng một cột) ít khác biệt nhất qua bảng cost (H×B), bước ±1 cột (quy hoạch động)."""
    H, B = cost.shape; acc = cost.copy(); bk = np.zeros((H, B), np.int8)
    for i in range(1, H):
        p = acc[i - 1]; L = np.r_[np.inf, p[:-1]]; R = np.r_[p[1:], np.inf]; st = np.stack([L, p, R]); j = st.argmin(0)
        acc[i] += st[j, np.arange(B)]; bk[i] = j - 1
    c = np.zeros(H, int); c[-1] = int(acc[-1].argmin())
    for i in range(H - 1, 0, -1): c[i - 1] = c[i] + bk[i, c[i]]
    return c

def ghep_khung(lam, xong, x, y, ra, BAND=384):
    """Dán kết quả một khung vào bản lớn. Chỗ khung trước đã vẽ (xong) chỉ bị thay tới đường cắt ít khác biệt nhất
    trong dải BAND sát mép vùng cũ, nên hai lần vẽ hơi lệch nhau cũng không lộ đường nối."""
    cu = np.asarray(lam.crop((x, y, x + N, y + N)), np.float32); mo = np.asarray(ra, np.float32)
    Dn = xong[y:y + N, x:x + N] > 0; moi = np.ones((N, N), bool)
    diff = ndi.gaussian_filter(np.abs(cu - mo).sum(2), 2)
    col = Dn.mean(0) > 0.9; row = Dn.mean(1) > 0.9
    def dai(m, nguoc):  # số cột / hàng đầy liên tiếp từ mép
        m = m[::-1] if nguoc else m; n = 0
        while n < len(m) and m[n]: n += 1
        return n
    # vùng cũ là các dải sát mép (trái/phải/trên/dưới); mỗi dải một đường cắt; điểm ảnh mới phải nằm phía "mới" của MỌI đường cắt (góc chữ L)
    for ben, dd in (('trai', dai(col, False)), ('phai', dai(col, True)), ('tren', dai(row, False)), ('duoi', dai(row, True))):
        if dd == 0 or dd >= N: continue
        b = min(BAND, dd)
        if ben in ('trai', 'phai'):
            c0 = dd - b if ben == 'trai' else N - dd; c = duong_cat(diff[:, c0:c0 + b]) + c0; xx = np.arange(N)[None, :]
            moi &= (xx > c[:, None]) if ben == 'trai' else (xx < c[:, None])
        else:
            r0 = dd - b if ben == 'tren' else N - dd; c = duong_cat(diff[r0:r0 + b, :].T) + r0; yy = np.arange(N)[:, None]
            moi &= (yy > c[None, :]) if ben == 'tren' else (yy < c[None, :])
    a = ndi.gaussian_filter(moi.astype(np.float32), 5)
    lam.paste(Image.fromarray((cu * (1 - a[..., None]) + mo * a[..., None]).astype(np.uint8)), (x, y))
    xong[y:y + N, x:x + N] = 1

def khung(q, k, anh):
    d = D(q); lam = Image.open(d + 'lam.png').convert('RGB'); W, H = lam.size; x, y = khung_ds(W, H)[k]
    xong = np.load(d + 'xong.npy'); ra, dl = nan_khop(Image.open(d + f'ra/qv{q}-k{k}-vao.png').convert('RGB'), Image.open(anh).convert('RGB').resize((N, N), Image.LANCZOS))
    print('nắn tối đa', round(dl), 'đ.ả'); ghep_khung(lam, xong, x, y, ra)
    lam.save(d + 'lam.png'); np.save(d + 'xong.npy', xong)
    viet_khung(q, k + 1)

def ghep_lai(q, den=99):
    """Ghép lại cả quận từ ảnh dán (dan.png) và kết quả các khung đã vẽ (ra/k<k>-ra.png), không vẽ lại."""
    d = D(q); lam = Image.open(d + 'dan.png').convert('RGB'); W, H = lam.size; xong = np.zeros((H, W), np.uint8)
    for k, (x, y) in enumerate(khung_ds(W, H)[:den]):
        f = d + f'ra/k{k}-ra.png'
        if not os.path.exists(f): print('thiếu', f); break
        ra, dl = nan_khop(Image.open(d + f'ra/qv{q}-k{k}-vao.png').convert('RGB'), Image.open(f).convert('RGB').resize((N, N), Image.LANCZOS))
        ghep_khung(lam, xong, x, y, ra); print('ghép khung', k, (x, y), 'nắn tối đa', round(dl), 'đ.ả')
    lam.save(d + 'lam.png'); np.save(d + 'xong.npy', xong)

# ---------- vẽ bù thẳng lên tấm bản đồ (không vẽ mẫu riêng) ----------
KIEU = ("Use EXACTLY the map's own style and colours: the same brown-black ink lines, the same warm sepia, ochre and faded grey-green washes with the same darkness and contrast "
        "as the surrounding mountains and trees, the same paper; nothing paler, greyer or hazier than the rest of the map. ")
NOI_VB = ("It grows naturally out of the surrounding land, with trees and low hills of the map overlapping its base; no border, no halo, no pale patch. "
          "Keep everything outside the blurred area exactly as it is. No text.")
P_VB = {
    'tong': ("Inpaint the blurred area of this hand-painted antique Chinese fantasy world map. Paint there, directly on the map, a grand and majestic immortal "
             "cultivation sect: a cluster of steep rock peaks crowned with many tiers of palace halls, pagodas and pavilions joined by long stone stairways and arched bridges, "
             "a great hall on the highest summit; several small mountains FLOATING in the sky above and around it carrying pavilions, with thin waterfalls pouring from them and "
             "chains linking them to the peaks; bands of soft cloud drifting horizontally across the middle of the peaks, so it looks immensely tall. "
             "Seen from the same high oblique bird's-eye view as the mountains of the map (not top-down). " + KIEU + NOI_VB),
    'thanh': ("Inpaint the blurred area of this hand-painted antique Chinese fantasy world map. Paint there, directly on the map, a walled ancient Chinese city: "
              "stone walls with crenellations following the lie of the land, a gate tower in the front wall, corner towers, streets packed with tiled roofs, a palace hall in the middle. "
              "Seen from the same high oblique bird's-eye view as the mountains of the map (not top-down). " + KIEU + NOI_VB),
}

def bao_ve(q, pid, x0, y0, n):
    """Vùng đã vẽ của các nơi KHÁC trong khung (x0,y0,n), nới 24 đ.ả, mềm mép: không cho nơi mới đè lên."""
    import glob, re; d = D(q); bv = np.zeros((n, n), np.float32)
    for f in glob.glob(d + 'ra/v*.json'):
        b = os.path.basename(f)
        if not re.fullmatch(r'v\d+\.json', b): continue
        v = json.load(open(f)); kk = int(b[1:-5])
        if v.get('id') == pid or not os.path.exists(d + f'ra/qv{q}-v{kk}-mn.png') or not os.path.exists(d + f'ra/done-{kk}') and kk != 0: continue
        fm = d + f'ra/qv{q}-v{kk}-nd.png'  # nét thật sự đã vẽ (khác nền gốc), không phải cả vùng khoanh
        m = np.asarray(Image.open(fm if os.path.exists(fm) else d + f'ra/qv{q}-v{kk}-mn.png').convert('L'), np.float32) / 255; h = m.shape[0]
        ox, oy = v['x'] - x0, v['y'] - y0; xa, ya, xb, yb = max(0, ox), max(0, oy), min(n, ox + h), min(n, oy + h)
        if xa < xb and ya < yb: bv[ya:yb, xa:xb] = np.maximum(bv[ya:yb, xa:xb], m[ya - oy:yb - oy, xa - ox:xb - ox])
    bv = ndi.grey_dilation((bv > 0.3).astype(np.float32), size=(25, 25))
    return ndi.gaussian_filter(bv, 8)

def ve_k(q, k, loai, seed=71, pid=None):
    """Khung k: 1536 ở mức 2 (cỡ thật khi phóng sát), cắt thẳng từ bản đang vẽ (lam.png; khung 0 từ nền gốc).
    Vùng nơi đó chỉ làm nhoè (giữ tông màu tại chỗ, mô hình vẽ mới chứ không chép), mặt nạ vẽ bù 1.0, mép mềm. Khung sau thấy cả phần khung trước đã vẽ."""
    d = D(q); B = json.load(open(d + 'bocuc.json', encoding='utf-8')); K = B['K']
    src = d + ('lam.png' if k > 0 and os.path.exists(d + 'lam.png') else 'nen.png')
    nen = Image.open(src).convert('RGB'); W, H = nen.size
    if k == 0: nen.save(d + 'lam.png')
    n = [x for x in B['noi'] if x['id'] == pid][0] if pid else max([x for x in B['noi'] if x['t'] == loai], key=lambda x: x['o'])
    R = {1: 0, 7: 1, 19: 2, 37: 3}.get(n['o'], 0); cx, cy = px(K, *n['c'])
    rx = (2 * R + 1) * 30 * S2 * 0.62 * (float(os.environ.get('ESC', 1)) if R == 0 else 1); day = cy + (R + 0.8) * 26 * S2
    cao = rx * (2.6 if loai == 'tong' else 1.5)  # tông môn vươn cao (núi bay), thành thấp
    x0 = int(min(max(0, cx - N / 2), W - N)); y0 = int(min(max(0, day + 160 - N), H - N))
    cr = nen.crop((x0, y0, x0 + N, y0 + N))
    yy, xx = np.mgrid[0:N, 0:N].astype(np.float32); X, Y = xx + x0, yy + y0
    rng = np.random.default_rng(seed + k); nz = ndi.gaussian_filter(rng.standard_normal((N, N)), 45); nz /= np.abs(nz).max()
    tamy = day - cao / 2; dy = (Y - tamy) / (cao / 2); dx = (X - cx) / rx
    # cọ mềm nhưng không phải elip đơn điệu: 3-5 chỗ lồi / lõm theo các hướng ngẫu nhiên + gợn mép to nhỏ
    goc_ = np.arctan2(dy, dx); bk = np.ones_like(dx)
    for _ in range(int(rng.integers(3, 6))):
        th0 = rng.uniform(-np.pi, np.pi); w_ = rng.uniform(0.35, 0.8); a_ = rng.uniform(0.12, 0.32) * (1 if rng.random() < 0.7 else -0.6)
        dth = np.angle(np.exp(1j * (goc_ - th0))); bk = bk + a_ * np.exp(-(dth / w_) ** 2)
    nz2 = ndi.gaussian_filter(rng.standard_normal((N, N)), 14); nz2 /= np.abs(nz2).max()
    mk = (np.sqrt(dx * dx + dy * dy) / bk + 0.18 * nz + 0.06 * nz2) < 1
    f_ = max(4, N // 160)   # vùng vẽ trắng ĐẶC 100% bên trong, chỉ mềm một viền mảnh f_ đ.ả (mép nhoè rộng làm nơi vẽ mờ nhạt)
    di_ = ndi.distance_transform_edt(mk) - ndi.distance_transform_edt(~mk); mm = np.clip((di_ + f_) / (2 * f_), 0, 1)
    bv = bao_ve(q, n['id'], x0, y0, N)
    mm = mm * (1 - bv); mk = mk & (bv < 0.5)
    lo = ndi.gaussian_filter(ndi.binary_erosion(mk, iterations=30).astype(np.float32), 20) * (1 - bv)
    a = np.asarray(cr, np.float32); mo = ndi.gaussian_filter(a, (24, 24, 0))
    vao = a * (1 - lo[..., None]) + mo * lo[..., None]
    Image.fromarray(vao.astype(np.uint8)).save(d + f'ra/qv{q}-v{k}-vao.png')
    Image.fromarray((np.clip(mm * 1.15, 0, 1) * 255).astype(np.uint8)).convert('RGB').save(d + f'ra/qv{q}-v{k}-mn.png')
    json.dump({'x': x0, 'y': y0, 'id': n['id']}, open(d + f'ra/v{k}.json', 'w'))
    json.dump(wf(f'qv{q}-v{k}-vao.png', P_VB[loai], seed, f'qv{q}-v{k}', mask=f'qv{q}-v{k}-mn.png'), open(d + f'ra/v{k}-wf.json', 'w'))
    print('khung', k, (x0, y0), 'nơi', n['t'], n['o'], 'ô ->', os.path.abspath(d + f'ra/v{k}-wf.json'))

def khop_mau(ra, goc, m):
    """Chỉnh màu vùng vừa vẽ theo chính chỗ đó trên bản đồ: độ sáng, độ tương phản, sắc vàng / đỏ (LAB) về gần bản gốc,
    tính trên vùng mặt nạ, áp dần theo mặt nạ (mép giữ nguyên)."""
    from skimage import color as skc
    A = skc.rgb2lab(np.asarray(ra, np.float32) / 255); G = skc.rgb2lab(np.asarray(goc, np.float32) / 255)
    w = m[..., 0] > 0.5; out = A.copy()
    vanh = ndi.binary_dilation(w, iterations=120) & ~ndi.binary_dilation(w, iterations=10)  # vành đất quanh nơi đó
    wg = vanh if vanh.sum() > 2000 else w
    for c, st in ((0, float(os.environ.get('KM_L', 0.35))), (1, 0.9), (2, 0.9)):
        ma, sa = A[..., c][w].mean(), A[..., c][w].std() + 1e-3; mg, sg = G[..., c][wg].mean(), G[..., c][wg].std() + 1e-3
        mt = ma + (mg - ma) * st; s_ = max(sa, sg) if c == 0 else sa
        out[..., c] = (A[..., c] - ma) * (s_ / sa) + mt
    rgb = np.clip(skc.lab2rgb(out), 0, 1) * 255
    return rgb * m + np.asarray(ra, np.float32) * (1 - m)

def loang(mk_vung, seed=5, rong=110):
    """Độ trong ghép kiểu mực loang: theo khoảng cách tới mép vùng vẽ, cộng nhiễu nhiều tầng (méo không đều) và sợi toả theo hướng ra ngoài,
    nên mép là vệt mực thấm giấy chứ không phải mép mờ đều. rong: bề rộng dải chuyển tiếp (đ.ả)."""
    vung = mk_vung > 0.5
    din = ndi.distance_transform_edt(vung); dout = ndi.distance_transform_edt(~vung); dd = din - dout  # >0 trong vùng
    H, W = vung.shape; rng = np.random.default_rng(seed)
    nz = sum(ndi.gaussian_filter(rng.standard_normal((H, W)), s) * w for s, w in ((60, 1.0), (22, 0.55), (7, 0.3)))
    nz /= np.abs(nz).max() + 1e-6
    gy, gx = np.gradient(ndi.gaussian_filter(dd, 8)); an = np.arctan2(gy, gx)
    fib = ndi.gaussian_filter(rng.standard_normal((H, W)), 1.2); fib = ndi.gaussian_filter(fib, (6 * np.abs(np.sin(an)).mean() + 2, 2))  # sợi mảnh
    fib /= np.abs(fib).max() + 1e-6
    t = (dd + rong * 0.55 * nz + rong * 0.12 * fib) / rong
    a = np.clip(t + 0.5, 0, 1); a = a * a * (3 - 2 * a)
    return ndi.gaussian_filter(a, 1.5)

def khop_giay(mo, cu, mk, o=11):
    """Màu GIẤY (nền sáng giữa các nét) của bản vẽ phải trùng bản đồ tại chỗ: bản vẽ thường sáng / bạc hơn (sân trắng, quầng nhạt).
    Đo theo ô nhỏ (ảnh thu 1/4): L lấy phân vị 75 (giấy, bỏ nét), a* b* lấy trung vị; dịch cả bản vẽ theo chênh lệch, nét giữ độ đậm tương đối."""
    from skimage import color as skc
    A = skc.rgb2lab(np.clip(mo, 0, 255) / 255); C = skc.rgb2lab(np.clip(cu, 0, 255) / 255)
    h, w = mk.shape; f = 4; sm = lambda x: x[::f, ::f]
    d = np.zeros((len(range(0, h, f)), len(range(0, w, f)), 3), np.float32)
    d[..., 0] = ndi.percentile_filter(sm(C[..., 0]), 75, size=o) - ndi.percentile_filter(sm(A[..., 0]), 75, size=o)
    for c in (1, 2): d[..., c] = ndi.median_filter(sm(C[..., c]), size=o) - ndi.median_filter(sm(A[..., c]), size=o)
    d = np.stack([ndi.zoom(d[..., c], (h / d.shape[0], w / d.shape[1]), order=1)[:h, :w] for c in range(3)], -1)
    d = ndi.gaussian_filter(d, (6, 6, 0)) * np.clip(mk * 2, 0, 1)[..., None]
    return np.clip(skc.lab2rgb(A + d), 0, 1) * 255

def ghep_mem(cu, mo, mk, rong=110, giu_cay=None):
    """cu: nền gốc, mo: kết quả (float HxWx3), mk: mặt nạ vẽ bù (HxW 0..1). Khớp màu cả vùng, rồi trong dải chuyển tiếp kéo dần mảng màu lớn
    (nhoè 40 đ.ả) của bản vẽ về mảng màu của nền -> chuyển tông mượt, nét giữ nguyên; cuối cùng ghép theo mép loang mực."""
    m3 = mk[..., None]
    # vật mới vẽ (nhà, tường...): chỗ bản mới khác hẳn bản gốc trong vùng khoanh
    lum0 = lambda x: x @ np.array([0.299, 0.587, 0.114], np.float32)
    Lm = lum0(mo); chi = np.abs(Lm - ndi.gaussian_filter(Lm, 4))  # nét / chi tiết của bản vẽ (sân trống phẳng thì không tính)
    vat = ((chi > 9) | (Lm < lum0(cu) - 25)) & (mk > 0.15)
    vat = ndi.binary_closing(ndi.binary_opening(vat, iterations=1), iterations=6)
    vat = np.clip(ndi.gaussian_filter(ndi.binary_dilation(vat, iterations=3).astype(np.float32), 2) * 1.5, 0, 1) * np.clip(mk * 3, 0, 1)
    mo = khop_mau(Image.fromarray(np.clip(mo, 0, 255).astype(np.uint8)), Image.fromarray(cu.astype(np.uint8)), m3)
    GIAY = os.environ.get('GIAY', '0') == '1'  # người dùng thấy ghép cũ (không khớp màu giấy) đẹp hơn: mặc định tắt
    if GIAY: mo = khop_giay(mo, cu, mk)
    a = loang(mk, rong=rong)
    sau = np.clip(ndi.distance_transform_edt(a > 0.02) / (rong * 2.2), 0, 1)  # 0 ở mép -> 1 sâu bên trong
    lo_c = ndi.gaussian_filter(cu, (40, 40, 0)); lo_m = ndi.gaussian_filter(mo, (40, 40, 0))
    keo = (1 - sau)[..., None] ** 1.5
    # chống quầng nhạt: đất trống quanh vật (không có vật mới) lấy đúng mảng màu lớn của bản gốc, chỉ giữ nét nhỏ của bản vẽ
    mo = mo + (lo_c - lo_m) * keo
    nen_trong = (1 - ndi.gaussian_filter(ndi.binary_dilation(vat > 0.3, iterations=2).astype(np.float32), 3))[..., None]
    lc2 = ndi.gaussian_filter(cu, (10, 10, 0)); lm2 = ndi.gaussian_filter(mo, (10, 10, 0))
    if GIAY: mo = mo + (lc2 - lm2) * nen_trong * 0.95  # đất trống / sân: tông màu bản gốc (mịn 10 đ.ả), chỉ giữ nét nhỏ của bản vẽ
    # càng ra rìa càng bớt vàng: sắc độ (a*, b* LAB) không được đậm hơn đất bản đồ quanh đó, kéo dần về sắc độ nền; thêm giảm bão hoà nhẹ theo rìa
    from skimage import color as skc
    L = skc.rgb2lab(np.clip(mo, 0, 255) / 255); Lc = skc.rgb2lab(cu / 255)
    nen_ab = ndi.gaussian_filter(Lc[..., 1:], (60, 60, 0))
    vr = np.clip((1 - sau) * 1.25, 0, 1)[..., None]  # 1 ở mép, 0 sâu bên trong
    ab = L[..., 1:]; tran = np.sign(nen_ab) * np.minimum(np.abs(ab), np.abs(nen_ab) + 1.5)  # không vượt sắc độ nền
    ab = ab * (1 - vr) + tran * vr
    ab = ab * (1 - 0.18 * vr)  # bớt bão hoà thêm ở rìa
    L[..., 1:] = ab; mo = np.clip(skc.lab2rgb(L), 0, 1) * 255
    if giu_cay is None: giu_cay = os.environ.get('GIU_CAY', '1') != '0'  # tuỳ nơi: GIU_CAY=0 để tắt (vd khi nét gốc lấp ló qua mây / thân nơi đó)
    a = np.maximum(a, vat)  # vật mới phải đặc: mép loang / giữ cây không làm nó trong suốt
    if not giu_cay:
        a3 = a[..., None]; return np.clip(cu * (1 - a3) + mo * a3, 0, 255), a
    # giữ cây cối của bản đồ: (1) cụm cây dày ở phía trước (dưới) chân nơi đó thì bản gốc phủ lên, (2) trong dải chuyển tiếp nét gốc đậm hơn thì thắng
    lum = lambda x: x @ np.array([0.299, 0.587, 0.114], np.float32)
    Lg = lum(cu); muc = np.clip((ndi.gaussian_filter(Lg, 25) - Lg) / 35, 0, 1)        # nét mực của bản gốc (cây, mép núi)
    day = ndi.gaussian_filter(muc, 14); cum = np.clip((day - 0.18) / 0.15, 0, 1)    # cụm nét dày = cụm cây
    ys = np.nonzero(mk > 0.5)[0]; y0, y1 = (np.percentile(ys, 55), ys.max()) if ys.size else (0, 1)
    duoi = np.clip((np.arange(mk.shape[0], dtype=np.float32) - y0) / max(1.0, (y1 - y0) * 0.5), 0, 1)[:, None]  # nửa dưới vùng vẽ = phía trước
    truoc = ndi.gaussian_filter(cum * duoi * np.clip(1 - sau * 0.6, 0, 1), 4)
    a = a * (1 - truoc * (1 - vat))
    a3 = a[..., None]
    out = cu * (1 - a3) + mo * a3
    dai = np.clip((1 - sau) * 1.4, 0, 1) * (a > 0.01)                                  # dải chuyển tiếp
    Lo = lum(out); thang = np.clip((Lo - Lg) / 25, 0, 1) * muc * dai                  # gốc đậm hơn ở chỗ có nét -> giữ nét gốc
    thang = thang * (1 - vat)
    out = out * (1 - thang[..., None]) + cu * thang[..., None]
    return np.clip(out, 0, 255), a

def luu_nd(q, k, truoc, sau):
    """Lưu vùng có nét mới (khác hẳn trước khi vẽ) của nơi k: để nơi vẽ sau tránh, nhưng vẫn được vẽ lên chỗ trống trong vùng khoanh cũ."""
    df = ndi.gaussian_filter(np.abs(np.asarray(sau, np.float32) - np.asarray(truoc, np.float32)).sum(2), 6)
    nd = ndi.binary_opening(df > 45, iterations=3); nd = ndi.binary_closing(nd, iterations=6)
    Image.fromarray((nd * 255).astype(np.uint8)).save(D(q) + f'ra/qv{q}-v{k}-nd.png')

def ghep_k(q, k, anh, xuat_ngay=True):
    d = D(q); v = json.load(open(d + f'ra/v{k}.json')); lam = Image.open(d + 'lam.png').convert('RGB')
    ra = Image.open(anh).convert('RGB').resize((N, N), Image.LANCZOS)
    m = np.asarray(Image.open(d + f'ra/qv{q}-v{k}-mn.png').convert('L'), np.float32)[..., None] / 255
    cu = np.asarray(lam.crop((v['x'], v['y'], v['x'] + N, v['y'] + N)), np.float32)
    ra_ = np.asarray(ra, np.float32); out, _ = ghep_mem(cu, ra_, m[..., 0], rong=int(max(16, N * 0.03)))  # mép loang hẹp theo cỡ khung (110 cũ làm nhoè cả nơi nhỏ)
    lam.paste(Image.fromarray(out.astype(np.uint8)), (v['x'], v['y'])); lam.save(d + 'lam.png')
    luu_nd(q, k, cu, out)
    if not xuat_ngay: return
    xuat_ve(q, k)

def ghep_lai_ve(q, ds_k):
    """Ghép lại cả quận từ nền gốc theo thứ tự ds_k, dùng ảnh đã vẽ (ra/g-v<k>-tot.png, hoặc -nhe) và mặt nạ đã lưu: đổi cách ghép không phải vẽ lại."""
    global N
    d = D(q); shutil_ = __import__('shutil'); shutil_.copy(d + 'nen.png', d + 'lam.png')
    for k in ds_k:
        f = next((d + f'ra/g-v{k}-{t}.png' for t in ('tot', 'nhe') if os.path.exists(d + f'ra/g-v{k}-{t}.png')), None)
        if not f: print('thiếu ảnh', k); continue
        N = Image.open(d + f'ra/qv{q}-v{k}-mn.png').size[0]; ghep_k(q, k, f, xuat_ngay=False); print('ghép lại', k, N)

def xuat_ve(q, k=999):
    d = D(q); import shutil, glob, re; shutil.rmtree('src/assets/ban-do/o', ignore_errors=True)
    if os.path.exists('src/game/core2/03d-o-anh.js'): os.remove('src/game/core2/03d-o-anh.js')
    ids = {json.load(open(f))['id'] for f in glob.glob(d + 'ra/v*.json') if re.fullmatch(r'v(\d+)\.json', os.path.basename(f)) and int(re.findall(r'\d+', os.path.basename(f))[0]) <= k}
    B = json.load(open(d + 'bocuc.json', encoding='utf-8')); B['noi'] = [x for x in B['noi'] if x['id'] in ids]; json.dump(B, open(d + 'bocuc-ve.json', 'w', encoding='utf-8'))
    xuat(q, d + 'bocuc-ve.json')

# ---------- cắt ô ảnh ----------
def xuat(q, bc=None):
    d = D(q); B = json.load(open(bc or d + 'bocuc.json', encoding='utf-8')); K = B['K']
    lam = Image.open(d + 'lam.png').convert('RGB'); W, H = lam.size
    # mép khung quận mờ dần vào bản đồ nền (màu đã vẽ lại hơi khác bản nền)
    f = 160; yy, xx = np.mgrid[0:H, 0:W]
    a = np.minimum.reduce([xx, W - 1 - xx, yy, H - 1 - yy]).astype(np.float32) / f
    a = np.clip(a, 0, 1); a = a * a * (3 - 2 * a)
    goc = lam.convert('RGBA'); goc.putalpha(Image.fromarray((a * 255).astype(np.uint8)))
    ds = {}
    for lv, sc in MUC.items():
        r = sc / S2; im = goc.resize((round(W * r), round(H * r)), Image.LANCZOS)
        ox, oy = K[0] * TS * r, K[1] * TS * r  # toạ độ góc khung ở mức này
        tx0, ty0 = int(ox // TS), int(oy // TS); tx1, ty1 = int(math.ceil((ox + im.size[0]) / TS)), int(math.ceil((oy + im.size[1]) / TS))
        od = f'src/assets/ban-do/o/{lv}/'; os.makedirs(od, exist_ok=True); L = []
        for ty in range(ty0, ty1):
            for tx in range(tx0, tx1):
                sx, sy = tx * TS - ox, ty * TS - oy
                c = im.crop((round(sx), round(sy), round(sx) + TS, round(sy) + TS))
                fn = od + f'{tx}-{ty}.webp'
                if os.path.exists(fn):  # ô đã có (quận khác vẽ trước): chồng lên
                    o = Image.open(fn).convert('RGBA'); o.alpha_composite(c); c = o
                if c.getchannel('A').getbbox() is None: continue
                c.save(fn, 'WEBP', quality=86, method=6); L.append(f'{tx}-{ty}')
        ds[lv] = L
    # bảng O_ANH: các ô ảnh có ở từng mức (gộp với bảng cũ)
    p = 'src/game/core2/03d-o-anh.js'; cu = {}; ve = set()
    if os.path.exists(p):
        import re
        m = re.search(r'O_ANH=(\{.*\});', open(p, encoding='utf-8').read())
        if m: j = json.loads(m.group(1)); cu = j.get('o', {}); ve = set(j.get('ve', []))
    for lv, L in ds.items(): cu[str(lv)] = sorted(set(cu.get(str(lv), [])) | set(L))
    ve |= {n['id'] for n in B['noi'] if n['t'] in XAY}  # nơi đã vẽ vào ảnh: game không chồng ảnh rời lên
    open(p, 'w', encoding='utf-8', newline='\n').write(
        '// Sinh bởi tools/quan-ve.py xuat. Đừng sửa tay.\n'
        '// Ô ảnh bản đồ chi tiết (src/assets/ban-do/o/<mức>/<x>-<y>.webp, 512×512): mức 0/1/2 = 0,75 / 1,5 / 3 điểm ảnh mỗi đơn vị thế giới.\n'
        '// Phóng tới đâu tải ô ảnh tới đó (ui/05-gfx.js oAnh), chỗ chưa có ô ảnh thì dùng ảnh bản đồ liền.\n'
        'const O_ANH=' + json.dumps({'t': TS, 's': [MUC[0], MUC[1], MUC[2]], 'o': cu, 've': sorted(ve)}, separators=(',', ':')) + ';\n')
    print({k: len(v) for k, v in ds.items()})

# Bước 2 (Qwen 2.1 vẽ lại nét) — bản nhẹ đã duyệt: 8 bước, vẽ lại 60 phần trăm, LanPaint 2 vòng, khung 1280 (nơi nhỏ/trấn/thành nhỏ dùng KHUNG=1024).
P_Q2 = {'tong': "Inpaint the blurred area of this hand-painted antique Chinese fantasy world map with a grand immortal sect: steep rock peaks crowned with tiers of palace halls and pagodas joined by stone stairways, small floating mountains with pavilions, chains and thin waterfalls, bands of soft cloud. Drawn in exactly the same ink style as this map: the same brown-black ink pen lines, warm sepia, ochre and faded grey-green washes, same darkness and contrast, same high oblique bird's-eye view; no bright colours, no illustration look. Its ground merges seamlessly into the surrounding land. Keep everything outside the blurred area exactly as it is. No text."}
def wf_qwen2(q, k, loai, seed=73, buoc=8, dn=0.6):
    """Qwen bắt đầu từ bản Klein (qv<q>-v<k>-klein-vao.png), ảnh mẫu là bản đồ gốc (qv<q>-v<k>-vao.png)."""
    w = wf_lp(f'qv{q}-v{k}-vao.png', P_Q2.get(loai, P_VB[loai]), seed, f'qv{q}-v{k}-nhe', f'qv{q}-v{k}-mn.png', 'qwen', res=N, buoc=buoc)
    w['22'] = {'class_type': 'LoadImage', 'inputs': {'image': f'qv{q}-v{k}-klein-vao.png'}, '_meta': {'title': 'Klein start'}}
    w['18']['inputs']['pixels'] = ['22', 0]; w['12']['inputs']['denoise'] = dn
    return w

if __name__ == '__main__':
    a = sys.argv[1:]
    if a[0] == 'chuan-bi': chuan_bi(int(a[1]))
    elif a[0] == 'dan': dan(int(a[1]))
    elif a[0] == 'khung': khung(int(a[1]), int(a[2]), a[3])
    elif a[0] == 'viet': viet_khung(int(a[1]), int(a[2]))
    elif a[0] == 'ghep-lai': ghep_lai(int(a[1]), int(a[2]) if len(a) > 2 else 99)
    elif a[0] == 'xuat': xuat(int(a[1]))
    elif a[0] == 've': ve_k(int(a[1]), int(a[2]), a[3], int(a[4]) if len(a) > 4 else 71)
    elif a[0] == 'lp':  # lp <q> <k> <loai> <klein|qwen>: workflow LanPaint cho khung đã chuẩn bị bằng 've'
        q_, k_, lo_, mo_ = int(a[1]), int(a[2]), a[3], a[4]; d_ = D(q_)
        json.dump(wf_lp(f'qv{q_}-v{k_}-vao.png', P_VB[lo_], 71, f'qv{q_}-v{k_}-{mo_}', f'qv{q_}-v{k_}-mn.png', mo_), open(d_ + f'ra/v{k_}-{mo_}.json', 'w'))
        print(os.path.abspath(d_ + f'ra/v{k_}-{mo_}.json'))
    elif a[0] == 'lpref':  # lpref <q> <k> <loai>: Klein + LanPaint + 2 ảnh mẫu phong cách tông môn (ref-1/2 đã duyệt)
        q_, k_, lo_ = int(a[1]), int(a[2]), a[3]; d_ = D(q_)
        p_ = P_VB[lo_].replace('Inpaint the blurred area', 'Image 1 is a piece of a world map. Inpaint the blurred area of image 1') + (
            " Draw the sect in exactly the drawing style of images 2 and 3 (their ink linework, the way palaces, rocks, floating islands, waterfalls and clouds are drawn, their colours), "
            "but do not copy their layout and do not paste them: paint a new sect fitted into the blurred area of image 1, blending into image 1's land.")
        json.dump(wf_lp(f'qv{q_}-v{k_}-vao.png', p_, 71, f'qv{q_}-v{k_}-kref', f'qv{q_}-v{k_}-mn.png', 'klein', refs=(f'qv{q_}-ref-tong-1.png', f'qv{q_}-ref-tong-2.png')), open(d_ + f'ra/v{k_}-kref.json', 'w'))
        print(os.path.abspath(d_ + f'ra/v{k_}-kref.json'))
    elif a[0] == 'qwen2':  # qwen2 <q> <k> <loai>: workflow Qwen bước 2 (sau khi tải bản Klein về thành qv<q>-v<k>-klein-vao.png và upload)
        q_, k_, lo_ = int(a[1]), int(a[2]), a[3]; d_ = D(q_)
        json.dump(wf_qwen2(q_, k_, lo_), open(d_ + f'ra/v{k_}-nhe.json', 'w')); print(os.path.abspath(d_ + f'ra/v{k_}-nhe.json'))
    elif a[0] == 'ghepk': ghep_k(int(a[1]), int(a[2]), a[3])
