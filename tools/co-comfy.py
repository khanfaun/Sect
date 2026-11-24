# Vẽ lại cổ cho từng bộ áo bằng ComfyUI (inpaint vùng cằm -> cổ áo), xuất lớp cổ riêng.
# Áo giữ nguyên ảnh gốc; lớp ch-neck-<áo> vẽ giữa áo và đầu.
#   python tools/co-comfy.py gen   [áo ...]  : ghép áo + đầu đúng tuổi, gửi ComfyUI (127.0.0.1:8000), lưu kết quả ở ch-goc/co/
#   python tools/co-comfy.py ghep  [áo ...]  : từ kết quả, cắt theo mặt nạ -> src/assets/ui/ch-neck-<áo>.webp
#   python tools/co-comfy.py xem   <ảnh.png> : ảnh ghép toàn bộ để soát
# Cần: qwen_image_edit_2511_fp8mixed + Lightning 8 bước + qwen_2.5_vl_7b + qwen_image_vae.
import glob, io, json, os, sys, time, urllib.request, uuid
import numpy as np
from PIL import Image
from scipy import ndimage as ndi

G = 'src/assets-goc/ch-goc/'; O = 'src/assets/ui/'; R = G + 'co/'
URL = 'http://127.0.0.1:8000'
N = 1024  # cỡ gửi lên model
FIX = {'t1': 't1', 'm1': 'm1', 'e1': 'e1', 'hero': 'r1'}
def dau(ao): return FIX.get(ao) or {'t': 't1', 'y': 'r1', 'm': 'm1', 'e': 'e1'}[ao[-1]]
def ds(): return sorted(os.path.basename(f)[6:-5] for f in glob.glob(G + 'ch-of-*.webp'))
def rgba(p): return np.array(Image.open(p).convert('RGBA'))

def skin(a):
    r, g, b, al = [a[..., i].astype(float) for i in range(4)]
    mx = a[..., :3].max(2).astype(float); mn = a[..., :3].min(2).astype(float)
    d = mx - mn + 1e-6; s = (mx - mn) / (mx + 1e-6)
    h = np.where(mx == r, ((g - b) / d) % 6, 0) * 60
    return (al > 128) & (r > g) & (g > b) & (h > 8) & (h < 36) & (s > .12) & (s < .6) & (mx > 110)

def co_ao(a):
    """Thành phần da cao nhất (cổ / ngực hở) ở giữa áo."""
    m = skin(a); m[:, :250] = 0; m[:, 390:] = 0
    lab, n = ndi.label(m); best = None
    for i in range(1, n + 1):
        c = lab == i; ys = np.where(c.any(1))[0]
        if c.sum() > 200 and (best is None or ys[0] < best[0]): best = (ys[0], c)
    return best[1]

def mat_na(ao):
    """Vùng vẽ lại: từ nửa dưới mặt xuống hết phần da cổ áo (bao lồi), nới vài điểm ảnh để ăn vào mép cổ áo."""
    a = rgba(G + 'ch-of-' + ao + '.webp'); h = rgba(G + 'ch-head-' + dau(ao) + '.webp')
    c = co_ao(a)
    if ao == 'hero':  # áo này dính sẵn một cái đầu: vẽ lại cả vùng đầu đó (đầu thật sẽ đè lên)
        c = ndi.binary_fill_holes(ndi.binary_dilation(c, iterations=3))
    hs = skin(h); ys = np.where(hs.any(1))[0]; cb = ys[-1]
    cam = hs.copy(); cam[:cb - 30] = 0  # cằm + quai hàm
    pts = np.argwhere(cam | c)
    from scipy.spatial import ConvexHull
    from matplotlib.path import Path
    hull = pts[ConvexHull(pts).vertices]
    yy, xx = np.mgrid[0:640, 0:640]
    m = Path(hull[:, ::-1]).contains_points(np.c_[xx.ravel(), yy.ravel()]).reshape(640, 640)
    m |= c
    m = ndi.binary_dilation(m, iterations=6)
    return m, a, h

def post(path, data, ct):
    return json.load(urllib.request.urlopen(urllib.request.Request(URL + path, data, {'Content-Type': ct})))

def upload(name, img):
    b = io.BytesIO(); img.save(b, 'PNG'); bd = uuid.uuid4().hex
    body = (f'--{bd}\r\nContent-Disposition: form-data; name="image"; filename="{name}"\r\nContent-Type: image/png\r\n\r\n').encode() + b.getvalue() + \
           (f'\r\n--{bd}\r\nContent-Disposition: form-data; name="overwrite"\r\n\r\ntrue\r\n--{bd}--\r\n').encode()
    return post('/upload/image', body, 'multipart/form-data; boundary=' + bd)['name']

PROMPT = ("Repaint only the neck area so the head joins the body naturally: a real human neck with the same skin tone, "
          "lighting and soft painted style as the face, gentle shadow under the jaw, neck width in proportion to the head, "
          "neck goes down into the robe collar. Keep the face, hair and the clothing exactly as they are. "
          "No necklace, no extra hair, no seams, no color patches.")

TRE = (" The neck is smooth, young and clean-shaven: absolutely no beard, no stubble, no hair on chin or neck.")

def wf(img, msk, seed, pre, them=''):
    T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
    return {
        '1': T('UNETLoader', {'unet_name': 'qwen_image_edit_2511_fp8mixed.safetensors', 'weight_dtype': 'default'}, 'Edit model'),
        '2': T('LoraLoaderModelOnly', {'model': ['1', 0], 'lora_name': 'Qwen-Image-Edit-2511-Lightning-8steps-V1.0-bf16.safetensors', 'strength_model': 1.0}, 'Lightning'),
        '3': T('ModelSamplingAuraFlow', {'model': ['2', 0], 'shift': 3.0}, 'Shift'),
        '4': T('CLIPLoader', {'clip_name': 'qwen_2.5_vl_7b_fp8_scaled.safetensors', 'type': 'qwen_image', 'device': 'default'}, 'Text encoder'),
        '5': T('VAELoader', {'vae_name': 'qwen_image_vae.safetensors'}, 'VAE'),
        '6': T('LoadImage', {'image': img}, 'Composite'),
        '7': T('LoadImageMask', {'image': msk, 'channel': 'red'}, 'Neck mask'),
        '8': T('TextEncodeQwenImageEditPlus', {'clip': ['4', 0], 'vae': ['5', 0], 'image1': ['6', 0], 'prompt': PROMPT + them}, 'Positive'),
        '9': T('TextEncodeQwenImageEditPlus', {'clip': ['4', 0], 'vae': ['5', 0], 'image1': ['6', 0], 'prompt': ''}, 'Negative'),
        '10': T('VAEEncode', {'pixels': ['6', 0], 'vae': ['5', 0]}, 'Encode'),
        '11': T('SetLatentNoiseMask', {'samples': ['10', 0], 'mask': ['7', 0]}, 'Only repaint neck'),
        '12': T('KSampler', {'model': ['3', 0], 'positive': ['8', 0], 'negative': ['9', 0], 'latent_image': ['11', 0], 'seed': seed,
                             'steps': 8, 'cfg': 1.0, 'sampler_name': 'euler', 'scheduler': 'simple', 'denoise': 1.0}, 'Sample'),
        '13': T('VAEDecode', {'samples': ['12', 0], 'vae': ['5', 0]}, 'Decode'),
        '14': T('SaveImage', {'images': ['13', 0], 'filename_prefix': pre}, 'Save'),
    }

def gen(aos, seed=7):
    os.makedirs(R, exist_ok=True); ids = {}
    for ao in aos:
        m, a, h = mat_na(ao)
        L = Image.new('RGBA', (640, 640), (128, 134, 134, 255))
        L.alpha_composite(Image.fromarray(a)); L.alpha_composite(Image.fromarray(h))
        L = L.convert('RGB').resize((N, N), Image.LANCZOS)
        M = Image.fromarray((m * 255).astype(np.uint8)).resize((N, N), Image.NEAREST)
        L.save(R + ao + '-vao.png'); M.save(R + ao + '-mat.png')
        i = upload('co-' + ao + '.png', L); k = upload('co-' + ao + '-m.png', M)
        ids[ao] = post('/prompt', json.dumps({'prompt': wf(i, k, seed, 'co-' + ao, TRE if dau(ao) in ('r1', 't1') else '')}).encode(), 'application/json')['prompt_id']
        print('gui', ao, flush=True)
    for ao, pid in ids.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit('loi ' + ao)
            time.sleep(2)
        f = hi['outputs']['14']['images'][0]
        urllib.request.urlretrieve(f"{URL}/view?filename={f['filename']}&type=output", R + ao + '-ra.png')
        print('xong', ao, flush=True)

def ghep(aos):
    for ao in aos:
        m, a, h = mat_na(ao)
        g = np.array(Image.open(R + ao + '-ra.png').convert('RGB').resize((640, 640), Image.LANCZOS))
        nen = (np.abs(g.astype(int) - (128, 134, 134)).max(2) < 14)  # nền xám -> bỏ
        giu = m & ~nen
        al = ndi.gaussian_filter(ndi.binary_erosion(giu, iterations=2).astype(float), 1.5)
        nk = np.zeros((640, 640, 4), np.uint8); nk[..., :3] = g; nk[..., 3] = (np.clip(al, 0, 1) * 255).astype(np.uint8)
        Image.fromarray(nk).save(O + 'ch-neck-' + ao + '.webp', quality=92, method=6)
        Image.fromarray(a).save(O + 'ch-of-' + ao + '.webp', quality=92, method=6)  # áo trả về bản gốc
        print('lop', ao)

def xem(out, aos):
    w, hh = 240, 300; cols = 7; im = Image.new('RGB', (w * cols, hh * ((len(aos) + cols - 1) // cols)), (90, 110, 110))
    for i, ao in enumerate(aos):
        L = Image.new('RGBA', (640, 640))
        for f in ['ch-of-' + ao, 'ch-neck-' + ao, 'ch-head-' + dau(ao)]:
            L.alpha_composite(Image.open(O + f + '.webp').convert('RGBA'))
        L = L.crop((200, 20, 440, 320)); im.paste(L, ((i % cols) * w, (i // cols) * hh), L)
    im.save(out)

if __name__ == '__main__':
    cmd = sys.argv[1]; rest = sys.argv[2:]
    if cmd == 'gen': gen(rest or ds())
    elif cmd == 'ghep': ghep(rest or ds())
    elif cmd == 'xem': xem(rest[0], rest[1:] or ds())
