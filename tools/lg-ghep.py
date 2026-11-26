# Ghép bản đồ lục giác 3D cho một quận từ ảnh của tools/lg-comfy.py (docs/thiet-ke/ban-do-luc-giac-3d.md).
#   python tools/lg-ghep.py <quận.json> [--dd] [--xem tệp.jpg]
#   quận.json: xuất từ game (ô, độ cao, sinh thái, địa điểm), xem cách xuất trong tài liệu.
#   Ra: src/assets/luc-giac/quan-<số>.webp (mặt đất + cây + núi, nền trong suốt) và .json (khung đặt trên bản đồ).
#   --dd: vẽ luôn địa điểm vào ảnh (chỉ để xem thử; trong game địa điểm vẽ riêng vì đổi theo kiếp).
import json, math, os, sys, random
import numpy as np
from PIL import Image, ImageDraw, ImageFilter, ImageEnhance
ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..')
A = os.path.join(ROOT, 'src/assets-goc/luc-giac/')
HC, HR, HEXW = 118, 77, 30; HEXP = HEXW * 0.8660254
S = 72                      # bề ngang một ô trong ảnh ra (px); trong game một ô rộng HEXW=30 -> ảnh nét gấp 2.4 lần
K = S / HEXW
RT = S / math.sqrt(3)       # bán kính lục giác (đỉnh nhọn)
GAP = 0.93                  # thu nhỏ mặt ô để chừa khe
DAY = S * 0.16              # bề dày khối
NANG = S * 0.035            # nâng mỗi bậc độ cao

# sinh thái (BIO_N, content/rules/sinh-thai.js) -> tấm mặt đất
DAT = {0: None, 1: 'dong', 2: 'rung', 3: 'nui', 4: 'song', 5: 'song', 6: 'doi', 7: 'dam', 12: 'samac', 13: 'hmda', 14: 'dado',
       15: 'dong', 16: 'nhietdoi', 17: 'truc', 18: 'dong', 19: 'rung', 21: 'hosen'}
NUOC = {4, 5, 11, 21}
DIU = {'samac': 0.72, 'dado': 0.85, 'dong': 0.85, 'truc': 0.85}  # giảm độ rực của vài loại

def hc(i):
    c = i % HC; r = i // HC
    return ((c + 0.5 + (r % 2) * 0.5) * HEXW, (r + 2 / 3) * HEXP)
def nb(i):
    c = i % HC; r = i // HC; o = r % 2
    for dc, dr in ((-1, 0), (1, 0), (-1 + o, -1), (o, -1), (-1 + o, 1), (o, 1)):
        cc, rr = c + dc, r + dr
        if 0 <= cc < HC and 0 <= rr < HR: yield rr * HC + cc
def hexpts(cx, cy, r): return [(cx + r * math.cos(math.radians(a)), cy + r * math.sin(math.radians(a))) for a in (-90, -30, 30, 90, 150, 210)]

TEX = {}
def tex(k):
    if k not in TEX:
        L = []
        for j in range(2):
            p = A + 'dat/%s-%d.png' % (k, j)
            if os.path.exists(p): L.append(Image.open(p).convert('RGB'))
        TEX[k] = L
    return TEX[k]
VAT = {}
def vat(k):
    if k not in VAT:
        p = A + 'vat/' + k + '.png'
        if not os.path.exists(p): VAT[k] = None
        else:
            im = Image.open(p).convert('RGBA'); VAT[k] = im.crop(im.getchannel('A').point(lambda v: 255 if v > 24 else 0).getbbox())
    return VAT[k]

def mat_o(k, rnd, nuoc):
    """mặt trên một ô: cắt chỗ ngẫu nhiên, xoay, chỉnh sáng nhẹ -> RGBA cỡ (2RT, 2RT)"""
    L = tex(k)
    if not L: return None
    im = L[rnd.randrange(len(L))]; W = im.width
    cs = int(W * 0.34)                                   # một ô ~ 1/3 tấm
    lo, hi = (int(W * 0.3), int(W * 0.7) - cs) if nuoc else (0, W - cs)   # nước: chỉ lấy giữa (rìa có bờ cỏ)
    if hi < lo: lo = hi = (W - cs) // 2
    x, y = rnd.randint(lo, hi), rnd.randint(lo, hi)
    t = im.crop((x, y, x + cs, y + cs)).rotate(rnd.choice((0, 60, 120, 180, 240, 300)), resample=Image.BICUBIC)
    m = int(cs * 0.14); t = t.crop((m, m, cs - m, cs - m))   # bỏ góc đen do xoay
    n = int(RT * 2 + 2); t = t.resize((n, n), Image.LANCZOS)
    t = ImageEnhance.Brightness(t).enhance(rnd.uniform(0.9, 1.08)); t = ImageEnhance.Color(t).enhance(rnd.uniform(0.9, 1.1) * DIU.get(k, 0.92))
    return t

def ve(q, dd=False, game=False):
    """game=True: không dán cây/núi vào ảnh mà trả danh sách để game vẽ lúc chạy (bỏ qua ô có địa điểm, vì địa điểm đổi theo thế giới)."""
    cells = q['cells']; EL = q['el']; BIO = q['bio']; dset = set(cells)
    rnd = random.Random(q['q'] * 7919)
    xs = [hc(i)[0] for i in cells]; ys = [hc(i)[1] for i in cells]
    pad = HEXW * 2.2
    X0, Y0 = min(xs) - pad, min(ys) - pad * 1.6; X1, Y1 = max(xs) + pad, max(ys) + pad
    Wd, Hd = int((X1 - X0) * K), int((Y1 - Y0) * K)
    img = Image.new('RGBA', (Wd, Hd), (0, 0, 0, 0))
    P = lambda i: ((hc(i)[0] - X0) * K, (hc(i)[1] - Y0) * K)
    nang = lambda i: -S * 0.06 if BIO[i] in NUOC else EL[i] * NANG
    # nền khe: bóng tối dưới cả quận
    sh = Image.new('L', (Wd, Hd), 0); d = ImageDraw.Draw(sh)
    for i in cells:
        x, y = P(i); d.polygon(hexpts(x, y - nang(i) + DAY * 0.5, RT * 1.02), fill=255)
    sh = sh.filter(ImageFilter.GaussianBlur(S * 0.06))
    img.paste(Image.new('RGBA', (Wd, Hd), (28, 30, 26, 255)), (0, 0), sh.point(lambda v: int(v * 0.85)))
    # ô: từ trên xuống dưới (hàng sau đè hàng trước)
    mau = {}
    for i in sorted(cells, key=lambda i: (i // HC, i % HC)):
        k = DAT.get(BIO[i]) or 'dong'; x, y = P(i); y -= nang(i)
        t = mat_o(k, rnd, BIO[i] in NUOC)
        if t is None: continue
        avg = np.asarray(t.resize((8, 8))).reshape(-1, 3).mean(0); mau[i] = avg
        r = RT * GAP; pts = hexpts(x, y, r)
        # mặt bên: 3 cạnh dưới kéo xuống
        day = DAY + max(0, nang(i))
        side = Image.new('RGBA', (Wd, Hd), (0, 0, 0, 0)); sd = ImageDraw.Draw(side)
        for a, b, f in ((1, 2, 0.62), (2, 3, 0.5), (3, 4, 0.44), (4, 5, 0.56)):
            pa, pb = pts[a], pts[b]
            sd.polygon([pa, pb, (pb[0], pb[1] + day), (pa[0], pa[1] + day)], fill=tuple(int(c * f) for c in avg) + (255,))
        img.alpha_composite(side)
        # mặt trên
        m = Image.new('L', t.size, 0); ImageDraw.Draw(m).polygon(hexpts(t.width / 2, t.height / 2, r), fill=255)
        m = m.filter(ImageFilter.GaussianBlur(0.6))
        img.paste(t, (int(x - t.width / 2), int(y - t.height / 2)), m)
        # viền sáng trên-trái, tối dưới-phải
        ed = ImageDraw.Draw(img)
        ed.line([pts[4], pts[5], pts[0], pts[1]], fill=(255, 255, 240, 70), width=max(1, int(S * 0.025)))
        ed.line([pts[1], pts[2], pts[3]], fill=(0, 0, 0, 60), width=max(1, int(S * 0.02)))
    # ---- vật trên ô ----
    vl = []  # (y chân, ảnh, x, chiều cao px, ô, cha)
    o_dd = set()
    if not game:
        for p in q['P']:
            for c in p['c']: o_dd.add(c)
    def them(k, x, y, h, i=-1, cha=-1):
        im = vat(k)
        if im is not None: vl.append((y, k, x, h, i, cha)); return len(vl) - 1
    def diem(i, rr=0.45):  # điểm ngẫu nhiên trong ô
        x, y = P(i); y -= nang(i); a = rnd.uniform(0, 6.283); d = rnd.uniform(0, RT * rr)
        return x + math.cos(a) * d, y + math.sin(a) * d * 0.8
    # núi: cụm ô núi -> núi to ở ô cao nhất, núi nhỏ lấp chỗ trống
    for loai, keys in ((3, ('nui-0', 'nui-1', 'nui-2')), (14, ('nuido-0', 'nuido-1'))):
        nui = [i for i in cells if BIO[i] == loai and i not in o_dd]; phu = set()
        for i in sorted(nui, key=lambda i: -EL[i] - rnd.random()):
            if i in phu: continue
            vung = [j for j in nb(i) if j in nui and j not in phu]
            to = len(vung) >= 3
            x, y = P(i); y -= nang(i)
            cha = them(rnd.choice(keys), x + rnd.uniform(-4, 4), y + RT * (0.55 if to else 0.4), S * (rnd.uniform(1.7, 2.1) if to else rnd.uniform(0.95, 1.15)), i)
            phu.add(i)
            if to:
                phu.update(vung)
                if game:  # núi nhỏ dự phòng cho ô bị núi to phủ: game chỉ vẽ khi núi to bị bỏ (ô gốc có địa điểm)
                    for j in vung:
                        x2, y2 = P(j); them(rnd.choice(keys), x2, y2 - nang(j) + RT * 0.4, S * rnd.uniform(0.95, 1.15), j, cha)
    for i in cells:
        if i in o_dd: continue
        b = BIO[i]
        if b in (2, 19): ks, n, h = ('cay-la-0', 'cay-la-1', 'cay-la-2'), rnd.choice((2, 3)), 0.62
        elif b == 16: ks, n, h = ('cay-nd-0', 'cay-nd-1', 'cay-nd-2', 'cay-nd-3'), rnd.choice((2, 3)), 0.66
        elif b == 17: ks, n, h = ('truc-0', 'truc-1'), rnd.choice((2, 3)), 0.6
        elif b == 6:
            u = rnd.random()
            if u < 0.3: ks, n, h = ('doi-0', 'doi-1'), 1, rnd.uniform(0.34, 0.5)
            elif u < 0.6: ks, n, h = ('cay-la-0', 'cay-la-1', 'cay-la-2', 'da-1'), 1, 0.5
            else: continue
        elif b == 7: ks, n, h = ('say-0', 'say-1'), 2, 0.34
        elif b == 13: ks, n, h = ('da-0', 'da-1'), rnd.choice((0, 1)), 0.3
        elif b in (1, 18, 15): ks, n, h = ('cay-la-0', 'cay-la-2', 'cay-nd-3'), 1 if rnd.random() < 0.18 else 0, 0.5
        else: continue
        for _ in range(n):
            x, y = diem(i, 0.5 if n > 1 else 0.25)
            them(rnd.choice(ks), x, y + RT * 0.25, S * h * rnd.uniform(0.85, 1.15), i)
    if dd:
        for p in q['P']:
            pts = [P(c) for c in p['c']]; cx = sum(a for a, _ in pts) / len(pts); cy = max(b for _, b in pts)
            w = (max(a for a, _ in pts) - min(a for a, _ in pts)) + S
            k = {'tong': 'dd-tong-lon' if len(p['c']) >= 9 else 'dd-tong', 'thanh': 'dd-thanh', 'tuthanh': 'dd-thanh', 'tran': 'dd-tran', 'tutran': 'dd-tran'}.get(p['t'])
            if k: vl.append((cy + RT * 0.6, k, cx, None, -1, -1, w * 1.25))
    # vẽ theo chân từ trên xuống
    if game:  # toạ độ thế giới, xếp theo chân
        keys = sorted(set(v[1] for v in vl)); od = sorted(range(len(vl)), key=lambda j: vl[j][0]); pos = {j: n for n, j in enumerate(od)}
        L = [[vl[j][4], keys.index(vl[j][1]), round(X0 + vl[j][2] / K, 1), round(Y0 + vl[j][0] / K, 1), round(vl[j][3] / K, 1), pos.get(vl[j][5], -1)] for j in od]
        return img, (X0, Y0, X1 - X0, Y1 - Y0), keys, L
    for it in sorted(vl, key=lambda v: v[0]):
        yb, k, x, h = it[:4]; im = vat(k)
        if h is None: sc = it[6] / im.width
        else: sc = h / im.height
        w2, h2 = max(1, int(im.width * sc)), max(1, int(im.height * sc))
        s = im.resize((w2, h2), Image.LANCZOS)
        bo = Image.new('RGBA', (w2, max(2, h2 // 6)), (0, 0, 0, 0)); ImageDraw.Draw(bo).ellipse((w2 * 0.1, 0, w2 * 0.95, bo.height), fill=(0, 0, 0, 70))
        bo = bo.filter(ImageFilter.GaussianBlur(2))
        img.alpha_composite(bo, (int(x - w2 / 2 + w2 * 0.06), int(yb - bo.height * 0.6)))
        img.alpha_composite(s, (int(x - w2 / 2), int(yb - h2)))
    return img, (X0, Y0, X1 - X0, Y1 - Y0)

if __name__ == '__main__':
    f = sys.argv[1]; q = json.load(open(f, encoding='utf-8'))
    dd = '--dd' in sys.argv
    game = '--xem' not in sys.argv
    R = ve(q, dd, game); img, box = R[0], R[1]
    if '--xem' in sys.argv:
        o = sys.argv[sys.argv.index('--xem') + 1]; bg = Image.new('RGBA', img.size, (236, 228, 208, 255)); bg.alpha_composite(img); bg.convert('RGB').save(o, quality=88); print('xem', o, img.size)
    else:
        out = os.path.join(ROOT, 'src/assets/luc-giac/'); os.makedirs(out, exist_ok=True)
        # ảnh địa điểm 3D cho game
        for k in ('dd-tong-lon', 'dd-tong', 'dd-thanh', 'dd-tran'):
            im = vat(k)
            if im is not None:
                im = im.copy(); im.thumbnail((512, 512), Image.LANCZOS); im.save(out + k + '.webp', 'WEBP', quality=88, method=6)
        img.save(out + 'quan-%d.webp' % q['q'], 'WEBP', quality=88, method=6)
        # khung đặt ảnh trên bản đồ (toạ độ thế giới) -> content/rules/luc-giac.js
        lp = os.path.join(ROOT, 'content/rules/luc-giac.js'); Q = {}
        if os.path.exists(lp):
            t = open(lp, encoding='utf-8').read(); a = t.index('LG_QUAN=') + 8; Q = json.loads(t[a:t.index(';', a)])
        Q[str(q['q'])] = {'x': round(box[0], 1), 'y': round(box[1], 1), 'w': round(box[2], 1), 'h': round(box[3], 1), 'o': sorted(q['cells'])}
        # cây, núi… vẽ lúc chạy: ảnh v-<tên>.webp + danh sách [ô, ảnh, x, y chân, cao, cha] (cha: chỉ vẽ khi núi to đó bị bỏ)
        keys, L = R[2], R[3]; V = {'k': [], 'q': {}}
        if os.path.exists(lp) and 'LG_VAT=' in t: V = json.loads(t[t.index('LG_VAT=') + 7:t.index(';', t.index('LG_VAT='))])
        for k in keys:
            if k not in V['k']: V['k'].append(k)
            im = vat(k).copy(); im.thumbnail((320, 320), Image.LANCZOS); im.save(out + 'v-' + k + '.webp', 'WEBP', quality=86, method=6)
        V['q'][str(q['q'])] = [[c, V['k'].index(keys[ki]), x, y, h, cha] for c, ki, x, y, h, cha in L]
        open(lp, 'w', encoding='utf-8').write('// Sinh tự động bởi tools/lg-ghep.py: quận đã có ảnh lục giác 3D (src/assets/luc-giac/quan-<số>.webp) và khung đặt trên bản đồ.\n'
                                             '// Vẽ ở src/game/ui/05-gfx.js (lgDraw). o: các ô có trong ảnh. LG_DD: ảnh địa điểm 3D đã có. Đừng sửa tay.\n'
                                             'const LG_QUAN=' + json.dumps(Q) + ';\n'
                                             'const LG_DD=' + json.dumps(sorted(f[:-5] for f in os.listdir(out) if f.startswith('dd-'))) + ';\n'
                                             'const LG_VAT=' + json.dumps(V, separators=(',', ':')) + ';\n')
        print('ra', out + 'quan-%d.webp' % q['q'], img.size, os.path.getsize(out + 'quan-%d.webp' % q['q']) // 1024, 'KB')
