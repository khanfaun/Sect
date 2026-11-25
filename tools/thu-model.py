# So sánh mô hình: vẽ thành / tông môn / xóm lên một mảnh bản đồ thật (đã khám phá) ở độ phân giải cao.
# python tools/thu-model.py turbo full h3   -> scratchpad/thu-<model>.png
import json, os, sys, time, urllib.request, importlib.util
from PIL import Image, ImageDraw
sp = importlib.util.spec_from_file_location('nv', 'tools/nv-comfy.py'); nv = importlib.util.module_from_spec(sp); sp.loader.exec_module(nv)
OUT = os.environ.get('OUT', '.') + '/'
M = Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB')
X0, Y0, W, H, K = 1700, 640, 540, 360, 1536 / 540
base = M.crop((X0, Y0, X0 + W, Y0 + H)).resize((1536, 1024), Image.LANCZOS)
MARK = [((140, 125), (58, 36)), ((55, 70), (42, 36)), ((260, 322), (36, 22))]
mk = base.copy(); d = ImageDraw.Draw(mk)
for (cx, cy), (rx, ry) in MARK: d.ellipse(((cx - rx) * K, (cy - ry) * K, (cx + rx) * K, (cy + ry) * K), outline=(220, 30, 30), width=6)
mk.save(OUT + 'thu-dau-vao.png')
P = ('This is a hand-painted old sepia ink-wash fantasy world map seen from a high oblique bird\'s-eye view. There are three red oval marks. '
     'Inside the large red oval in the plain, paint a small walled Chinese town: grey stone city wall with a gate tower, tiled roofs packed inside. '
     'On the mountain inside the upper-left red oval, paint a cultivation sect: a few temple halls with curved roofs on terraces and a stairway. '
     'Inside the small red oval at the bottom, paint a tiny hamlet of four thatched cottages. '
     'Paint them exactly in the style of this map: the same brown-black ink lines, the same loose brush texture, the same muted sepia and faded grey-green washes, '
     'the same viewing angle and perspective as the trees and mountains, the same scale (buildings small like the trees). '
     'Remove the red marks completely, keep everything else unchanged. No text.')
T = lambda ct, ins, t: {'class_type': ct, 'inputs': ins, '_meta': {'title': t}}
def wf_qwen(img, seed, full):
    w = nv.wf(img, P, seed, 'thu-' + ('full' if full else 'turbo'))
    if full:
        w['1']['inputs']['unet_name'] = 'qwen-image-2.1-UC-int8_convrot.safetensors'
        w['12'] = T('BasicScheduler', {'model': ['2', 0], 'scheduler': 'simple', 'steps': 25, 'denoise': 1.0}, 'Scheduler')
    w['8']['inputs']['resolution'] = 1536
    return w
def wf_h3(img, seed):
    return {
        '29': T('UNETLoader', {'unet_name': 'PinkCherry_fl2va_MiniMax_H3_int8_convrot-beta-0.6.safetensors', 'weight_dtype': 'default'}, 'H3'),
        '30': T('CLIPLoader', {'clip_name': 'qwen3vl_32b_heretic_minimax_h3_nvfp4.safetensors', 'type': 'minimax', 'device': 'default'}, 'Text encoder'),
        '31': T('VAELoader', {'vae_name': 'minimax_h3_t1_image_vae_step1597.safetensors'}, 'VAE'),
        '45': T('LoadImage', {'image': img}, 'Input'),
        '32': T('MiniMaxH3ImageConditioning', {'clip': ['30', 0], 'vae': ['31', 0], 'prompt': P.replace('This is', '<Picture 1> is'), 'width': 1536, 'height': 1024, 'images.image_1': ['45', 0]}, 'Cond'),
        '33': T('ConditioningZeroOut', {'conditioning': ['32', 0]}, 'Neg'),
        '38': T('KSampler', {'model': ['29', 0], 'positive': ['32', 0], 'negative': ['33', 0], 'latent_image': ['32', 1], 'seed': seed, 'control_after_generate': 'fixed', 'steps': 12, 'cfg': 1, 'sampler_name': 'euler', 'scheduler': 'simple', 'denoise': 1}, 'Sample'),
        '42': T('VAEDecode', {'samples': ['38', 0], 'vae': ['31', 0]}, 'Decode'),
        '15': T('SaveImage', {'images': ['42', 0], 'filename_prefix': 'thu-h3'}, 'Save'),
    }
fn = nv.upload('thu-dau-vao.png', mk)
for m in sys.argv[1:]:
    w = wf_h3(fn, 7) if m == 'h3' else wf_qwen(fn, 7, m == 'full')
    w = {k: v for k, v in w.items()}
    for v in w.values(): v['inputs'].pop('control_after_generate', None)
    try: r = nv.post('/prompt', json.dumps({'prompt': w}).encode(), 'application/json')
    except urllib.error.HTTPError as e: r = {'err': e.read().decode()[:900]}
    if 'prompt_id' not in r: print(m, 'LOI', json.dumps(r)[:600]); continue
    pid = r['prompt_id']; t = time.time()
    while True:
        hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
        if hi and hi.get('outputs'): break
        if hi and hi.get('status', {}).get('status_str') == 'error': print(m, 'LOI', json.dumps(hi['status'])[:800]); break
        time.sleep(3)
    if hi and hi.get('outputs'):
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", OUT + 'thu-' + m + '.png')
        print(m, 'xong', int(time.time() - t), 's', flush=True)
