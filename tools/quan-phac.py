# Vẽ cả một quận theo cách PHÁC VECTOR + QWEN: phác bố cục từng nơi (tools/phac-mau.py, né / nằm sau tiền cảnh) lên chính bản đồ,
# rồi Qwen 2.1 + LanPaint vẽ lại 90% bắt đầu từ bản phác (ảnh mẫu là bản đồ gốc), ghép kiểu cũ; đo thời gian từng nơi.
# python tools/quan-phac.py <quận> phac [id...]   -> chỉ phác (xem work/quan-<q>/phac-<k>.png), không chạy GPU
# python tools/quan-phac.py <quận> ve [id...]     -> phác + Qwen + ghép; cuối cùng xuất ô ảnh
import sys, os, io, json, time, glob, re, importlib.util, numpy as np
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from PIL import Image
from scipy import ndimage as ndi
def nap(ten, f): sp = importlib.util.spec_from_file_location(ten, f); m_ = importlib.util.module_from_spec(sp); sp.loader.exec_module(m_); return m_
_argv = sys.argv; sys.argv = ['x']; lo = nap('lo', 'tools/quan-ve-lo.py'); sys.argv = _argv
m = lo.m; pm = nap('pm', 'tools/phac-mau.py')

TA = {'tong': "a grand and majestic immortal cultivation sect built on these mountains: many tiers of palace halls and pagodas on the summit and terraces, a long stone stairway from a memorial gateway at the foot, pavilions on the peaks behind, small mountains FLOATING in the sky with pavilions, waterfalls and iron chains to the summit, bands of white cloud drifting across",
      'thanh': "a large walled ancient Chinese city: crenellated grey stone walls, a big gate tower in the front wall, corner towers, a three-storey imperial palace and a tall pagoda at the back, rows of tiled roofs packed inside, pines",
      'tuthanh': "a small walled town of cultivators with a tall pagoda, a few halls and a gate tower",
      'tran': "a small market town: tiled-roof houses clustered around a street, a two-storey hall at the back, a memorial gateway at the entrance, trees between the houses",
      'tutran': "a cultivators' town: tiled-roof houses around a tall pagoda, a memorial gateway at the entrance, trees",
      'ancu': "a hermit's thatched hut with a fence between two old pines, a thin wisp of smoke",
      'khoang': "a mine: a rocky outcrop with a dark mine entrance braced with timber, ore carts and spoil heaps",
      'phe': "the ruins of an abandoned village: roofless broken walls, rubble and a dead tree",
      'ditich': "ancient ruins: broken walls and toppled pillars, rubble and a dead tree",
      'bicanh': "the hidden entrance of a secret realm: an ancient carved stone gate between rocks with mist coming out of it",
      'dongthien': "a cave-heaven: a carved stone gate in the rocks with mist, an old pine"}
KHUNG = {'tong': 1280, 'thanh': 768}
P = lambda t: ("Image 1 is a piece of an antique hand-painted Chinese fantasy world map. Paint into it " + TA[t] + ", following the composition already blocked in on the map "
               "(the positions, sizes and shapes of every building, wall, tower, tree and rock). Painted in exactly the map's own style: fine brown-black ink pen lines, warm sepia, ochre and faded grey-green washes, "
               "the same darkness and contrast as the mountains and trees around it. Seen from the front and above like the map, not isometric. Trees and rocks in front stay in front. "
               "Keep everything outside it exactly as it is. No text.")

def m_tong_17(box, goc_size):
    """Tông môn 17 (quận 5): dựng theo khối núi thật trong khung 1280 (toạ độ đo trên bản đồ)."""
    s = 1280 / 900; Q = lambda x, y: (x * s, y * s); L = []
    def them(y, f): L.append((Q(0, y)[1], f))
    them(70, lambda d: pm.nha(d, *Q(510, 76), 58, tang=3))                              # đình đỉnh xa
    them(196, lambda d: pm.thap(d, *Q(470, 196), 34, tang=7))                            # tháp trên đỉnh nhọn giữa
    them(720, lambda d: pm.dao_bay(d, *Q(285, 225), 125, tang=3))                        # đảo bay lớn bên trái (cao hơn cụm điện đỉnh trái)
    them(720, lambda d: pm.dao_bay(d, *Q(430, 160), 85))                                 # đảo bay nhỏ trên
    them(720, lambda d: pm.dao_bay(d, *Q(600, 195), 95))  # đảo bay lơ lửng phía trước núi: không bị núi sau che                                # đảo bay nhỏ phải
    them(160, lambda d: (pm.xich(d, Q(345, 230), Q(500, 400)), pm.xich(d, Q(445, 165), Q(530, 380)), pm.xich(d, Q(590, 200), Q(570, 390))))
    them(372, lambda d: (pm.nen_da(d, *Q(330, 372), 160), pm.nha(d, *Q(345, 372), 120, tang=2), pm.nha(d, *Q(285, 380), 60), pm.tung(d, *Q(395, 378), 55)))   # cụm điện đỉnh trái
    them(330, lambda d: pm.may(d, *Q(220, 0)[:1], Q(430, 0)[0], Q(0, 335)[1], 34))       # mây cao bên trái
    them(470, lambda d: pm.thap(d, *Q(600, 440), 40, tang=8))                            # tháp cao sau đỉnh chính (điểm nhấn lệch trục)
    them(478, lambda d: (pm.nen_da(d, *Q(545, 478), 230), pm.nha(d, *Q(545, 470), 140, tang=3), pm.nha(d, *Q(470, 486), 85, tang=2), pm.nha(d, *Q(622, 486), 85, tang=2), pm.nha(d, *Q(420, 496), 50), pm.nha(d, *Q(672, 496), 50)))  # đại điện đỉnh chính (cụm hình tháp)
    them(560, lambda d: (pm.nen_da(d, *Q(470, 560), 150), pm.nha(d, *Q(470, 560), 100, tang=2), pm.nha(d, *Q(415, 568), 55)))   # tầng giữa trái
    them(552, lambda d: (pm.nen_da(d, *Q(625, 552), 150), pm.nha(d, *Q(625, 552), 100, tang=2), pm.nha(d, *Q(680, 560), 55)))   # tầng giữa phải
    them(540, lambda d: pm.may(d, Q(590, 0)[0], Q(760, 0)[0], Q(0, 530)[1], 30))          # mây giữa bên phải
    them(640, lambda d: (pm.nen_da(d, *Q(560, 640), 120), pm.nha(d, *Q(560, 640), 80)))  # tầng dưới
    them(700, lambda d: pm.bac_da(d, [Q(500, 722), Q(540, 670), Q(515, 615), Q(548, 560), Q(545, 490)], 26))
    them(730, lambda d: pm.cong_chao(d, *Q(500, 728), 95))
    them(600, lambda d: d.line((*Q(705, 470), *Q(712, 620)), fill=pm.NUOC, width=9))      # thác từ vách phải đỉnh chính
    return L

def lam_mot(q, n, k, che_do, seed):
    d = m.D(q); t = n['t']; N = KHUNG.get(t, 640); m.N = N; os.environ['ESC'] = '1.6'
    m.ve_k(q, k, t, seed, pid=n['id'])                                                     # khung + vùng khoanh (tránh nơi đã vẽ)
    v = json.load(open(d + f'ra/v{k}.json')); goc = Image.open(d + 'lam.png').convert('RGB').crop((v['x'], v['y'], v['x'] + N, v['y'] + N)); goc.save(d + f'ra/qv{q}-v{k}-goc.png')
    mk = np.asarray(Image.open(d + f'ra/qv{q}-v{k}-mn.png').convert('L'), np.float32) / 255
    ys, xs = np.nonzero(mk > 0.5); bw, bh = xs.max() - xs.min(), ys.max() - ys.min(); box = (xs.min() + bw * 0.12, ys.min() + bh * 0.1, xs.max() - bw * 0.12, ys.max() - bh * 0.06)  # bố cục nằm hẳn trong lõi vùng khoanh
    blob, chan = pm.tien_canh(goc)
    if t == 'tong' and n['id'] == 17: lop = m_tong_17(box, N)
    else:
        mau = lambda b: pm.MAU.get(t, pm.MAU['phe'])(b, None); box = pm.ne_tien_canh(goc, mau, box, chan, mk); lop = mau(box)   # né tiền cảnh
        if pm.ti_le_che(lop, chan, N) > 0.45: chan = np.zeros_like(chan); blob = np.zeros_like(blob); print('   nằm lọt trong rừng: vẽ thành khoảng trống, không cho cây che', flush=True)
    phac = pm.ve_lop(goc, lop, chan)
    loi = ndi.gaussian_filter(ndi.binary_erosion(mk > 0.9, iterations=max(4, N // 80)).astype(np.float32), 3)[..., None]   # chỉ dán phác vào lõi đặc: mép vùng khoanh LanPaint giữ ảnh vào -> sót nét phác
    phac = Image.fromarray((np.asarray(goc, np.float32) * (1 - loi) + np.asarray(phac, np.float32) * loi).astype(np.uint8)); phac.save(d + f'ra/qv{q}-v{k}-phac.png')
    yy = np.arange(N)[:, None]; giu = ndi.binary_dilation(blob & (yy > box[3] - (box[3] - box[1]) * (0.05 if t == 'tong' else 0.22)), iterations=3)   # cây tiền cảnh ở chân: giữ nguyên
    mk2 = np.clip(mk * (1 - ndi.gaussian_filter(giu.astype(np.float32), 2.5)), 0, 1); Image.fromarray((mk2 * 255).astype(np.uint8)).convert('RGB').save(d + f'ra/qv{q}-v{k}-mn.png')
    c = (int(max(0, xs.min() - 50)), int(max(0, ys.min() - 50)), int(min(N, xs.max() + 50)), int(min(N, ys.max() + 50)))
    o = Image.new('RGB', ((c[2] - c[0]) * 2 + 10, c[3] - c[1]), 'white'); o.paste(goc.crop(c), (0, 0)); o.paste(phac.crop(c), (c[2] - c[0] + 10, 0)); o.save(d + f'phac-{k}.png')
    if che_do == 'phac': return 0
    t0 = time.time()
    for f in (f'qv{q}-v{k}-phac.png', f'qv{q}-v{k}-mn.png', f'qv{q}-v{k}-goc.png'): lo.up(d + 'ra/' + f)
    w = m.wf_lp(f'qv{q}-v{k}-goc.png', P(t), seed, f'qv{q}-v{k}-qp', f'qv{q}-v{k}-mn.png', 'qwen', res=N, buoc=int(os.environ.get('QB', 14))); w['12']['inputs']['denoise'] = float(os.environ.get('DN', 0.85 if t == 'tong' else 0.9))  # tông môn 85%: bám phác hơn (90% dồn cả quần thể lên đỉnh)
    w['22'] = {'class_type': 'LoadImage', 'inputs': {'image': f'qv{q}-v{k}-phac.png'}, '_meta': {'title': 'Sketch start'}}; w['18']['inputs']['pixels'] = ['22', 0]
    lo.chay(w, d + f'ra/g-v{k}-tot.png'); tg = time.time() - t0
    lam0 = Image.open(d + 'lam.png').convert('RGB'); m.ghep_k(q, k, d + f'ra/g-v{k}-tot.png', xuat_ngay=False)
    sau = Image.open(d + 'lam.png').convert('RGB').crop((v['x'], v['y'], v['x'] + N, v['y'] + N))
    o = Image.new('RGB', ((c[2] - c[0]) * 3 + 20, c[3] - c[1]), 'white'); o.paste(goc.crop(c), (0, 0)); o.paste(phac.crop(c), (c[2] - c[0] + 10, 0)); o.paste(sau.crop(c), (2 * (c[2] - c[0]) + 20, 0)); o.save(d + f'so-{k}.png')
    open(d + f'ra/done-{k}', 'w').write(str(round(tg)))
    return tg

if __name__ == '__main__':
    q, che_do = int(sys.argv[1]), sys.argv[2]; sel = sys.argv[3:]; d = m.D(q); B = json.load(open(d + 'bocuc.json', encoding='utf-8'))
    ds = [x for x in B['noi'] if x['t'] not in ('nui', 'song', 'rung', 'hoang', 'bien') and (not sel or str(x['id']) in sel or x['t'] in sel)]
    ds.sort(key=lambda x: (x['t'] != 'tong', x['t'] != 'thanh', x['c'][1]))
    KCO = {json.load(open(f))['id']: int(os.path.basename(f)[1:-5]) for f in glob.glob(d + 'ra/v*.json') if re.fullmatch(r'v\d{3}\.json', os.path.basename(f))}
    T = []; t_all = time.time()
    for i, n in enumerate(ds):
        k = KCO.get(n['id']) or max([99, *KCO.values()]) + 1; KCO[n['id']] = k
        if che_do == 've' and os.path.exists(d + f'ra/done-{k}'): continue
        tg = lam_mot(q, n, k, che_do, int(os.environ.get('SEED', 900)) + k); T.append((n['t'], n['id'], k, round(tg)))
        print(f'[{i + 1}/{len(ds)}] {n["t"]} id {n["id"]} khung {k}: {tg:.0f}s', flush=True)
    if che_do == 've': m.xuat_ve(q)
    print('TỔNG', round(time.time() - t_all), 's; Qwen', sum(x[3] for x in T), 's;', json.dumps(T, ensure_ascii=False))
