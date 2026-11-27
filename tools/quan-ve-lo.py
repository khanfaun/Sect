# Vẽ lần lượt nhiều nơi của một quận, gọi thẳng ComfyUI (127.0.0.1:8000): Klein dựng bố cục -> Qwen 2.1 vẽ lại nét -> ghép vào bản đồ; xuất ô ảnh một lần ở cuối.
# Dùng: python tools/quan-ve-lo.py <quận> [loại|id ...]   (không ghi gì = mọi nơi trừ tông môn/núi; tông môn đã vẽ riêng)
import sys, os, json, time, importlib.util, requests, shutil
from PIL import Image
import numpy as np
sp = importlib.util.spec_from_file_location('qv', 'tools/quan-ve.py'); m = importlib.util.module_from_spec(sp); sp.loader.exec_module(m)
H = 'http://127.0.0.1:8000'
HD = ("Inpaint the blurred area of this hand-painted antique Chinese fantasy world map. Paint there, directly on the map, ")
TAIL = " Seen from the same high oblique bird's-eye view as the mountains of the map (not top-down). " + m.KIEU + m.NOI_VB
ICON = "a single compact map landmark that fills the whole blurred area, drawn with bold dark brown-black ink lines and clear shading as dense as the trees and mountains around it (not faint, not pale): "
m.P_VB.update({
 'tran': HD + ICON + "a small market town: eight to ten tiled-roof houses packed together along a street with a wooden memorial gateway at the entrance; houses, not hills, not trees." + TAIL,
 'tutran': HD + ICON + "a small cultivators' town: tiled houses around a two-storey pavilion with a tall slender pagoda tower rising above, a few stalls." + TAIL,
 'ancu': HD + ICON + "a hermit's thatched bamboo hut (a small building with a thatched roof and a fence) beside one or two pines; the hut is clearly visible." + TAIL,
 'khoang': HD + ICON + "a mine entrance in a rocky hill, wooden scaffolding and props, a couple of ore carts and spoil heaps." + TAIL,
 'ditich': HD + ICON + "ancient ruins of a broken temple: fallen pillars, a half-collapsed hall and a toppled stone stele, weeds." + TAIL,
 'tuthanh': HD + ICON + "a small walled town of cultivators: a ring of grey stone walls with a gate tower, five or six tiled-roof buildings inside and one tall pagoda. Buildings and walls, not trees." + TAIL,
 'dongthien': HD + ICON + "a mystical cave-heaven: a cave mouth in a cliff drawn with dark ink, a small pavilion with a curved roof on a ledge beside it, a thin waterfall and a few pines; no white glow." + TAIL,
 'linhdia': HD + ICON + "a sacred spirit land: a little shrine pavilion beside a spring pool among ancient trees, soft mist drifting over it." + TAIL,
 'phe': HD + ICON + "an abandoned ruined village: a few roofless broken houses with collapsed walls, a toppled gate, weeds and a dead tree." + TAIL,
 'bicanh': HD + ICON + "the hidden entrance of a secret realm: an ancient carved stone archway half sunk among rocks and old trees, faint mist coming out of it." + TAIL,
 'como': "an ancient tomb: a grass-covered burial mound with a stone gate, a stele and a few gnarled cypress trees." + TAIL,
})
m.P_VB['thanh'] = (HD + "a compact walled ancient Chinese city at the foot of the mountain, big and clearly readable: a ring of grey stone walls with crenellations, "
  "a large double-roofed gate tower in the front (south) wall, two corner watchtowers, inside about a dozen LARGE tiled-roof halls with sweeping eaves and one tall palace hall at the back, "
  "a few pines between them. Every building is large and clearly drawn, like the halls of a sect on the same map, not a crowd of tiny roofs. Painted like the buildings of a Chinese landscape scroll, seen from the front and above "
  "like the mountains of the map; NOT isometric, NOT a game asset, NOT a technical drawing, no people, no bare white courtyard. Bold brown-black ink lines and warm sepia washes, "
  "as dark and dense as the trees around it." + TAIL)
m.P_Q2.update({t: p for t, p in m.P_VB.items() if t != 'tong'})
KICH = {'thanh': 768, 'tong': 1280}  # cỡ khung; mặc định 640 cho nơi 1 ô
CHE_DO = {'tong': 'kq'}; MAC_DINH = os.environ.get('CHE_DO', 'klein')  # người dùng chốt: nơi nhỏ lẻ / thành / trấn chỉ Klein; chỉ tông môn (thế lực) mới thêm Qwen ('kq')
REF_TONG = ('qv5-ref-tong-1.png', 'qv5-ref-tong-2.png')  # 2 ảnh mẫu phong cách đã duyệt (dd/thu-moi/ref-1, ref-2)
REF = {}  # mọi nơi dùng REF_TONG cho Klein (đừng lấy bản Klein cũ làm mẫu: ra kiểu game)
ESC_T = {}  # cỡ tranh nơi 1 ô = VE_LUAT.co (1,6) ở core2/33, đúng vùng đã giữ chỗ trong bố cục (to hơn thì đè nơi bên cạnh)  # trấn cần vùng to hơn 1 ô mới ra dáng trấn
BO_QUA = {int(x) for x in os.environ.get('BO_QUA', '').split(',') if x}  # nơi bỏ qua (vd nằm lọt trong tranh tông môn)  # ảnh mẫu phong cách cho Klein: phần tông môn đã duyệt
def up(f):
    with open(f, 'rb') as fh: r = requests.post(H + '/upload/image', files={'image': (os.path.basename(f), fh)}, data={'overwrite': 'true'}); r.raise_for_status()
def chay(w, ra):
    pid = requests.post(H + '/prompt', json={'prompt': w}).json()
    if 'prompt_id' not in pid: raise RuntimeError(json.dumps(pid)[:600])
    pid = pid['prompt_id']
    while True:
        h = requests.get(H + '/history/' + pid).json()
        if pid in h and h[pid].get('outputs'): break
        if pid in h and h[pid].get('status', {}).get('status_str') == 'error': raise RuntimeError(str(h[pid]['status'])[:800])
        time.sleep(1.5)
    o = [i for v in h[pid]['outputs'].values() for i in v.get('images', [])][0]
    b = requests.get(H + '/view', params={'filename': o['filename'], 'subfolder': o['subfolder'], 'type': o['type']}).content
    open(ra, 'wb').write(b)
if __name__ == '__main__':
    q = int(sys.argv[1]); sel = sys.argv[2:]; d = m.D(q); B = json.load(open(d + 'bocuc.json', encoding='utf-8'))
    ds = [x for x in B['noi'] if x['t'] not in ('nui', 'song', 'rung', 'hoang', 'bien') and x['id'] not in BO_QUA and (not sel or x['t'] in sel or str(x['id']) in sel)]
    ds.sort(key=lambda x: (x['t'] != 'tong', x['t'] != 'thanh', x['c'][1]))  # tông môn trước (lớn nhất), rồi thành
    k0 = 100; t0 = time.time()
    import glob, re; KCO = {json.load(open(f))['id']: int(os.path.basename(f)[1:-5]) for f in glob.glob(d + 'ra/v*.json') if re.fullmatch(r'v\d{3}\.json', os.path.basename(f))}
    for i, n in enumerate(ds):
        k = KCO.get(n['id']) or max([k0 - 1, *KCO.values()]) + 1; KCO[n['id']] = k; lo = n['t']; sd0 = int(os.environ.get('SEED', 71)) + k; ts = time.time()
        if os.path.exists(d + f'ra/v{k}.json') and os.path.exists(d + f'ra/done-{k}'): continue
        m.N = KICH.get(lo, 640); N = m.N
        os.environ['ESC'] = str(ESC_T.get(lo, float(os.environ.get('ESC_MD', 1.6)))); lam0 = Image.open(d + 'lam.png').convert('RGB')
        tot = None
        for lan in range(3):  # tự chấm: vùng giữa phải đổi đủ rõ, không thì thử hạt giống khác
            sd = sd0 + lan * 1000
            m.ve_k(q, k, lo, sd, pid=n['id'])
            for f in (f'qv{q}-v{k}-vao.png', f'qv{q}-v{k}-mn.png'): up(d + 'ra/' + f)
            che = CHE_DO.get(lo, MAC_DINH); rf = REF.get(lo, REF_TONG)
            if che == 'qwen':
                chay(m.wf_lp(f'qv{q}-v{k}-vao.png', m.P_VB[lo], sd, f'qv{q}-v{k}-q', f'qv{q}-v{k}-mn.png', 'qwen', res=N, buoc=int(os.environ.get('QB', 14))), d + f'ra/g-v{k}-nhe.png')
            else:
                pk = m.P_VB[lo] + (" Images 2 and 3 show other parts of the same kind of map: draw in exactly their drawing style (fine brown-black ink pen lines, sepia and ochre washes, the way roofs, walls, rocks and trees are drawn), seen from the front and above like the map, not isometric; do not copy their content. The ground around it keeps the same colour as the surrounding map, no pale or white patch." if rf else "")
                chay(m.wf_lp(f'qv{q}-v{k}-vao.png', pk, sd, f'qv{q}-v{k}-klein', f'qv{q}-v{k}-mn.png', 'klein', res=N, refs=rf), d + f'ra/g-v{k}-klein.png')
                if che != 'kq': shutil.copy(d + f'ra/g-v{k}-klein.png', d + f'ra/g-v{k}-nhe.png')
                else:
                    shutil.copy(d + f'ra/g-v{k}-klein.png', d + f'ra/qv{q}-v{k}-klein-vao.png'); up(d + f'ra/qv{q}-v{k}-klein-vao.png')
                    chay(m.wf_qwen2(q, k, lo, seed=sd + 2), d + f'ra/g-v{k}-nhe.png')
            mk = np.asarray(Image.open(d + f'ra/qv{q}-v{k}-mn.png').convert('L'), np.float32) > 200
            g = np.asarray(Image.open(d + f'ra/qv{q}-v{k}-vao.png').convert('L'), np.float32); r = np.asarray(Image.open(d + f'ra/g-v{k}-nhe.png').convert('L').resize((N, N)), np.float32)
            muc = float(np.percentile(np.abs(r - g)[mk], 80)) if mk.sum() > 500 else 0; tt = float(r[mk].std()) if mk.sum() > 500 else 0
            from scipy import ndimage as ndi_
            chi = np.abs(r - ndi_.gaussian_filter(r, 4)); net = float(((chi > 9) & mk).sum() / max(1, mk.sum()))  # tỉ lệ vùng vẽ có nét mới (nhà / tường); 1 cái cây thì thấp
            print(f'   lần {lan + 1}: đổi {muc:.0f}, tương phản {tt:.0f}, nét {net:.2f}', flush=True)
            muc = muc if net >= float(os.environ.get('NET_MIN', 0.15)) else 0
            if tot is None or muc + tt > tot[0]: tot = (muc + tt, lan); shutil.copy(d + f'ra/g-v{k}-nhe.png', d + f'ra/g-v{k}-tot.png'); shutil.copy(d + f'ra/qv{q}-v{k}-mn.png', d + f'ra/qv{q}-v{k}-mn-tot.png')
            if muc >= 40 and tt >= 30: break
        shutil.copy(d + f'ra/qv{q}-v{k}-mn-tot.png', d + f'ra/qv{q}-v{k}-mn.png')
        lam0.save(d + 'lam.png'); v = json.load(open(d + f'ra/v{k}.json')); A = lam0.crop((v['x'], v['y'], v['x'] + N, v['y'] + N))
        m.ghep_k(q, k, d + f'ra/g-v{k}-tot.png', xuat_ngay=False)
        B2 = Image.open(d + 'lam.png').convert('RGB').crop((v['x'], v['y'], v['x'] + N, v['y'] + N))
        o = Image.new('RGB', (N * 2 + 10, N), 'white'); o.paste(A, (0, 0)); o.paste(B2, (N + 10, 0)); o.save(d + f'ra/so-{k}.png')
        open(d + f'ra/done-{k}', 'w').write('1'); print(f'[{i + 1}/{len(ds)}] {lo} id {n["id"]} xong (lần tốt nhất {tot[1] + 1}) {time.time() - ts:.0f}s (tổng {time.time() - t0:.0f}s)', flush=True)
    m.xuat_ve(q); print('XONG, đã xuất ô ảnh')
