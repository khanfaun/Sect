# Bộ MẪU PHÁC bố cục cho từng loại địa điểm (vẽ vector lên mảnh bản đồ, rồi Qwen 2.1 vẽ lại 90% theo phác).
# Nguyên tắc bố cục: khối hình tháp (cao, to ở giữa phía sau; thấp, nhỏ dần ra trước và hai bên), trục giữa (cổng -> sân -> điện -> tháp),
# một điểm nhấn cao lệch trục, mái chồng lớp cho dày, cây / mây xen để có chiều sâu. Góc nhìn như bản đồ: chính diện, từ trên cao.
# Mỗi mẫu trả về danh sách (chân_y, hàm_vẽ): vẽ từ xa (chân nhỏ) tới gần; tiền cảnh có chân thấp hơn sẽ che (ve_lop).
import math, random, numpy as np
from PIL import Image, ImageDraw
from scipy import ndimage as ndi

MUC = (52, 38, 28); GO = (168, 146, 112); MAI = (92, 82, 70); MAI2 = (112, 100, 86); TUONG = (156, 146, 126); SAN = (192, 168, 128)
CAY = (86, 96, 70); DA = (176, 158, 126); DA2 = (140, 124, 98); MAY = (238, 230, 210); NUOC = (226, 230, 224); TOI = (40, 30, 22)

def lw(w): return max(1, int(round(w / 55)))

def mai(d, cx, y, w, m, fill=MAI):
    """Mái chùa / điện: hình thang, hai đầu vểnh, có hàng ngói."""
    p = [(cx - w * 0.56, y + m * 0.12), (cx - w * 0.5, y - m * 0.08), (cx - w * 0.3, y - m), (cx + w * 0.3, y - m), (cx + w * 0.5, y - m * 0.08), (cx + w * 0.56, y + m * 0.12)]
    d.polygon(p, fill=fill, outline=MUC); d.line(p, fill=MUC, width=lw(w) + 1)
    n = max(4, int(w / 9))
    for i in range(1, n): x = cx - w * 0.46 + i * w * 0.92 / n; d.line((x, y - 1, cx - w * 0.28 + i * w * 0.56 / n, y - m + 2), fill=MUC, width=1)
    d.line((cx - w * 0.3, y - m, cx + w * 0.3, y - m), fill=MUC, width=lw(w) + 1)

def nha(d, cx, day, w, tang=1, cao=None):
    """Toà nhà: thân gỗ có cột + mái; nhiều tầng thì mỗi tầng hẹp lại."""
    h = cao or w * 0.32; y = day
    for t in range(tang):
        ww = w * (1 - 0.16 * t); th = h * (0.5 if t == 0 else 0.32)
        d.rectangle((cx - ww * 0.4, y - th, cx + ww * 0.4, y), fill=GO, outline=MUC, width=lw(w))
        for i in range(1, 5): x = cx - ww * 0.4 + i * ww * 0.16; d.line((x, y - th, x, y), fill=MUC, width=1)
        y -= th; m = h * (0.62 if t == 0 else 0.48); mai(d, cx, y, ww, m, MAI if t % 2 == 0 else MAI2); y -= m * 0.8

def thap(d, cx, day, w, tang=7):
    """Tháp nhiều tầng: hẹp, cao, mái vểnh từng tầng, chóp nhọn."""
    y = day; tw = w
    for t in range(tang):
        th = w * 0.28; d.rectangle((cx - tw * 0.32, y - th, cx + tw * 0.32, y), fill=GO, outline=MUC, width=lw(w))
        y -= th; mai(d, cx, y, tw * 1.05, w * 0.22, MAI if t % 2 == 0 else MAI2); y -= w * 0.16; tw *= 0.9
    d.line((cx, y, cx, y - w * 0.6), fill=MUC, width=lw(w) + 1)

def tung(d, x, day, h):
    """Cây thông: thân cong, tán xếp tầng ngang."""
    d.line((x, day, x - h * 0.05, day - h * 0.7), fill=MUC, width=max(2, int(h / 18)))
    for i, (dy, ww) in enumerate(((0.95, 0.35), (0.75, 0.55), (0.55, 0.45))):
        yy = day - h * dy; d.ellipse((x - h * ww, yy - h * 0.1, x + h * ww * 0.7, yy + h * 0.08), fill=CAY, outline=MUC)

def cay_tron(d, x, day, h):
    d.line((x, day, x, day - h * 0.5), fill=MUC, width=max(2, int(h / 15)))
    for dx, dy, r in ((0, 0.75, 0.38), (-0.28, 0.6, 0.3), (0.28, 0.6, 0.3)): d.ellipse((x + dx * h - r * h, day - dy * h - r * h, x + dx * h + r * h, day - dy * h + r * h), fill=CAY, outline=MUC)

def tuong(d, a, b, hh, w):
    (ax, ay), (bx, by) = a, b; d.polygon([(ax, ay), (bx, by), (bx, by - hh), (ax, ay - hh)], fill=TUONG, outline=MUC)
    n = max(3, int(math.hypot(bx - ax, by - ay) / max(8, hh * 0.9)))
    for i in range(n):
        t0, t1 = i / n, (i + 0.55) / n; p0 = (ax + (bx - ax) * t0, ay + (by - ay) * t0 - hh); p1 = (ax + (bx - ax) * t1, ay + (by - ay) * t1 - hh)
        d.rectangle((min(p0[0], p1[0]), min(p0[1], p1[1]) - hh * 0.35, max(p0[0], p1[0]), max(p0[1], p1[1])), fill=TUONG, outline=MUC)

def cong_chao(d, cx, day, w):
    h = w * 0.75
    for x in (cx - w * 0.42, cx - w * 0.15, cx + w * 0.15, cx + w * 0.42): d.rectangle((x - w * 0.03, day - h, x + w * 0.03, day), fill=(110, 82, 58), outline=MUC)
    mai(d, cx, day - h * 0.95, w * 1.1, w * 0.18); mai(d, cx, day - h * 0.62, w * 0.75, w * 0.14, MAI2)

def nen_da(d, cx, day, w, h=None):
    h = h or w * 0.16; d.polygon([(cx - w * 0.58, day), (cx - w * 0.5, day + h), (cx + w * 0.5, day + h), (cx + w * 0.58, day)], fill=DA, outline=MUC)

def may(d, x0, x1, y, h):
    x = x0; i = 0
    while x < x1:
        r = h * (0.75 + 0.25 * math.sin(i * 1.9)); d.ellipse((x - r, y - r * 0.6, x + r * 1.25, y + r * 0.45), fill=MAY, outline=(130, 110, 90), width=2)
        d.arc((x - r * 0.45, y - r * 0.35, x + r * 0.55, y + r * 0.2), 180, 360, fill=(130, 110, 90), width=1); x += r * 1.15; i += 1

def dao_bay(d, cx, cy, w, tang=2):
    h = w * 0.95
    d.polygon([(cx - w / 2, cy), (cx - w * 0.32, cy + h * 0.45), (cx - w * 0.04, cy + h), (cx + w * 0.16, cy + h * 0.62), (cx + w * 0.36, cy + h * 0.32), (cx + w / 2, cy)], fill=DA2, outline=MUC)
    for i in range(4): d.line((cx - w * 0.36 + i * w * 0.2, cy + 4, cx - w * 0.2 + i * w * 0.12, cy + h * (0.4 + 0.12 * i)), fill=MUC, width=2)
    d.ellipse((cx - w / 2, cy - w * 0.08, cx + w / 2, cy + w * 0.08), fill=DA, outline=MUC, width=2)
    tung(d, cx - w * 0.32, cy, w * 0.3); nha(d, cx + w * 0.05, cy, w * 0.5, tang)
    d.line((cx + w * 0.42, cy + 6, cx + w * 0.4, cy + h * 1.5), fill=NUOC, width=max(3, int(w * 0.05)))

def xich(d, p, q, vong=0.1):
    (x0, y0), (x1, y1) = p, q; n = int(math.hypot(x1 - x0, y1 - y0) / 7)
    for i in range(n):
        t = i / n; x = x0 + (x1 - x0) * t; y = y0 + (y1 - y0) * t + math.sin(math.pi * t) * math.hypot(x1 - x0, y1 - y0) * vong
        d.ellipse((x - 2.5, y - 2, x + 2.5, y + 2), outline=MUC, width=1)

def bac_da(d, pts, w):
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        d.polygon([(x0 - w / 2, y0), (x1 - w / 2, y1), (x1 + w / 2, y1), (x0 + w / 2, y0)], fill=(196, 182, 152), outline=MUC)
        for i in range(int(abs(y0 - y1) / 6) + 1): t = i / (int(abs(y0 - y1) / 6) + 1); x = x0 + (x1 - x0) * t; y = y0 + (y1 - y0) * t; d.line((x - w / 2, y, x + w / 2, y), fill=MUC, width=1)

# ---------------- mẫu theo loại (box = x0, y0, x1, y1 của vùng khoanh; chân ở y1) ----------------
def m_thanh(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    fy = y1 - H * 0.06; by = y0 + H * 0.36; fl, fr = x0 + W * 0.05, x1 - W * 0.05; bl, br = x0 + W * 0.17, x1 - W * 0.17; th = H * 0.075
    L = []
    L.append((by - 1, lambda d: (d.polygon([(fl, fy), (bl, by), (br, by), (fr, fy)], fill=SAN), tuong(d, (bl, by), (br, by), th * 0.8, W))))
    L.append((by + 1, lambda d: (tuong(d, (fl, fy), (bl, by), th, W), tuong(d, (br, by), (fr, fy), th, W))))
    # điểm nhấn: hoàng cung 3 tầng giữa sau + tháp cao lệch trái; hàng sau dày, hàng giữa, hàng trước thưa
    L.append((by + H * 0.16, lambda d: nha(d, cx, by + H * 0.16, W * 0.34, tang=3)))
    L.append((by + H * 0.10, lambda d: thap(d, x0 + W * 0.27, by + H * 0.10, W * 0.085, tang=7)))
    for i, (fx, s, t) in enumerate(((0.34, 0.2, 2), (0.66, 0.2, 2), (0.82, 0.16, 1), (0.18, 0.16, 1))):
        L.append((by + H * 0.2, lambda d, fx=fx, s=s, t=t: nha(d, x0 + W * fx, by + H * 0.2, W * s, tang=t)))
    for fx in (0.22, 0.4, 0.6, 0.78):
        L.append((by + H * 0.36, lambda d, fx=fx: nha(d, x0 + W * fx, by + H * 0.36, W * 0.17)))
    for fx in (0.31, 0.69):
        L.append((by + H * 0.27, lambda d, fx=fx: nha(d, x0 + W * fx, by + H * 0.27, W * 0.15)))
    for fx in (0.25, 0.75): L.append((fy - H * 0.14, lambda d, fx=fx: nha(d, x0 + W * fx, fy - H * 0.14, W * 0.17)))
    for fx in (0.44, 0.56): L.append((fy - H * 0.2, lambda d, fx=fx: tung(d, x0 + W * fx, fy - H * 0.2, H * 0.12)))
    L.append((fy, lambda d: tuong(d, (fl, fy), (fr, fy), th * 1.1, W)))
    L.append((fy + 1, lambda d: (nha(d, cx, fy - th * 0.5, W * 0.17, tang=2), d.chord((cx - W * 0.03, fy - th * 1.1, cx + W * 0.03, fy + th * 0.2), 180, 360, fill=TOI))))
    for x in (fl, fr): L.append((fy + 1, lambda d, x=x: nha(d, x, fy - th * 0.6, W * 0.08, tang=2)))
    return L

def m_tu_thanh(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    fy = y1 - H * 0.08; by = y0 + H * 0.45; th = H * 0.09
    L = [(by, lambda d: (d.polygon([(x0 + W * 0.08, fy), (x0 + W * 0.2, by), (x1 - W * 0.2, by), (x1 - W * 0.08, fy)], fill=SAN), tuong(d, (x0 + W * 0.2, by), (x1 - W * 0.2, by), th * 0.8, W),
                                tuong(d, (x0 + W * 0.08, fy), (x0 + W * 0.2, by), th, W), tuong(d, (x1 - W * 0.2, by), (x1 - W * 0.08, fy), th, W)))]
    L.append((by + H * 0.12, lambda d: thap(d, cx + W * 0.05, by + H * 0.12, W * 0.12, tang=7)))
    L.append((by + H * 0.2, lambda d: nha(d, x0 + W * 0.3, by + H * 0.2, W * 0.2, tang=2)))
    L.append((by + H * 0.28, lambda d: nha(d, x1 - W * 0.27, by + H * 0.28, W * 0.18)))
    L.append((fy, lambda d: (tuong(d, (x0 + W * 0.08, fy), (x1 - W * 0.08, fy), th * 1.1, W), nha(d, cx, fy - th * 0.5, W * 0.2, tang=2))))
    return L

def m_tran(box, rnd, tu=False):
    """Trấn: cụm nhà hình tháp (to, cao ở giữa sau; nhỏ dần ra trước / hai bên), so le, mái chồng lên nhau; đường vào giữa, cổng chào trước; trấn tu sĩ có tháp làm điểm nhấn."""
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2; r = rnd or __import__('random').Random(7)
    L = [(y0, lambda d: d.polygon([(cx - W * 0.07, y1), (cx - W * 0.035, y0 + H * 0.5), (cx + W * 0.035, y0 + H * 0.5), (cx + W * 0.07, y1)], fill=SAN))]
    if tu: L.append((y0 + H * 0.46, lambda d: thap(d, cx + W * 0.06, y0 + H * 0.46, W * 0.15, tang=5)))
    L.append((y0 + H * 0.5, lambda d: nha(d, cx - (W * 0.12 if tu else 0), y0 + H * 0.5, W * 0.36, tang=2)))
    hang = [(0.6, [(-0.33, 0.28, 1), (0.34, 0.28, 2 if tu else 1)]), (0.74, [(-0.42, 0.25, 1), (-0.17, 0.26, 1), (0.18, 0.26, 1), (0.42, 0.25, 1)]), (0.88, [(-0.3, 0.25, 1), (0.3, 0.25, 1)])]
    for fy, ds in hang:
        for fx, s_, t in ds:
            jx, jy = r.uniform(-0.03, 0.03), r.uniform(-0.03, 0.03)
            L.append((y0 + H * (fy + jy), lambda d, fx=fx + jx, s_=s_, t=t, fy=fy + jy: nha(d, cx + W * fx, y0 + H * fy, W * s_, tang=t)))
    for fx, fy in ((-0.5, 0.62), (0.5, 0.78), (-0.05, 0.62)): L.append((y0 + H * fy + 1, lambda d, fx=fx, fy=fy: cay_tron(d, cx + W * fx, y0 + H * fy, H * 0.26)))
    L.append((y1, lambda d: cong_chao(d, cx, y1, W * 0.22)))
    return L

def m_am_cu(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    return [(y0 + H * 0.7, lambda d: tung(d, cx - W * 0.3, y0 + H * 0.7, H * 0.55)), (y0 + H * 0.66, lambda d: tung(d, cx + W * 0.32, y0 + H * 0.66, H * 0.45)),
            (y0 + H * 0.8, lambda d: (nha(d, cx, y0 + H * 0.8, W * 0.42), d.line((cx + W * 0.08, y0 + H * 0.3, cx + W * 0.12, y0 + H * 0.05), fill=(200, 196, 186), width=3))),
            (y1 - H * 0.08, lambda d: [d.line((cx - W * 0.4 + i * W * 0.08, y1 - H * 0.08, cx - W * 0.4 + i * W * 0.08, y1 - H * 0.16), fill=MUC, width=2) for i in range(11)] and d.line((cx - W * 0.4, y1 - H * 0.13, cx + W * 0.4, y1 - H * 0.13), fill=MUC, width=2))]

def m_khoang(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    def f(d):
        d.polygon([(x0 + W * 0.05, y1 - H * 0.15), (x0 + W * 0.25, y0 + H * 0.15), (cx, y0 + H * 0.05), (x1 - W * 0.2, y0 + H * 0.2), (x1 - W * 0.05, y1 - H * 0.15)], fill=DA2, outline=MUC)
        for i in range(6): d.line((x0 + W * (0.15 + i * 0.13), y0 + H * 0.2, x0 + W * (0.1 + i * 0.14), y1 - H * 0.2), fill=MUC, width=2)
        d.chord((cx - W * 0.16, y0 + H * 0.38, cx + W * 0.16, y1 - H * 0.1), 180, 360, fill=TOI); d.rectangle((cx - W * 0.16, y0 + H * 0.62, cx + W * 0.16, y1 - H * 0.2), fill=TOI)
        for x in (cx - W * 0.2, cx + W * 0.2): d.line((x, y1 - H * 0.2, x, y0 + H * 0.4), fill=(120, 90, 60), width=4)
        d.line((cx - W * 0.22, y0 + H * 0.42, cx + W * 0.22, y0 + H * 0.42), fill=(120, 90, 60), width=4)
    return [(y1 - H * 0.15, f), (y1, lambda d: (d.rectangle((cx + W * 0.24, y1 - H * 0.16, cx + W * 0.38, y1 - H * 0.06), fill=(120, 90, 60), outline=MUC),
                                                 d.polygon([(x0 + W * 0.05, y1), (x0 + W * 0.18, y1 - H * 0.14), (x0 + W * 0.32, y1)], fill=DA, outline=MUC)))]

def m_phe(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    def f(d):
        for fx, h in ((-0.3, 0.35), (0.05, 0.45), (0.3, 0.3)):
            x = cx + W * fx; d.polygon([(x - W * 0.12, y1 - H * 0.2), (x - W * 0.12, y1 - H * (0.2 + h)), (x - W * 0.02, y1 - H * (0.2 + h * 0.7)), (x + W * 0.05, y1 - H * (0.2 + h * 0.9)), (x + W * 0.12, y1 - H * (0.2 + h * 0.5)), (x + W * 0.12, y1 - H * 0.2)], fill=TUONG, outline=MUC)
            d.rectangle((x - W * 0.04, y1 - H * (0.2 + h * 0.45), x + W * 0.02, y1 - H * 0.2), fill=TOI)
        d.line((cx + W * 0.38, y1 - H * 0.15, cx + W * 0.36, y0 + H * 0.2), fill=MUC, width=3)
        for a in (-0.6, -0.2, 0.3, 0.7): d.line((cx + W * 0.37, y0 + H * 0.4, cx + W * 0.37 + math.sin(a) * W * 0.12, y0 + H * 0.4 - math.cos(a) * H * 0.18), fill=MUC, width=2)
    return [(y1 - H * 0.2, f), (y1, lambda d: [d.ellipse((cx + W * fx - 6, y1 - H * 0.12 - 4, cx + W * fx + 6, y1 - H * 0.12 + 4), fill=DA, outline=MUC) for fx in (-0.35, -0.1, 0.12, 0.25)])]

def m_bi_canh(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    def f(d):
        for fx, s in ((-0.32, 0.3), (0.34, 0.26)): d.polygon([(cx + W * (fx - s / 2), y1 - H * 0.1), (cx + W * (fx - s / 4), y0 + H * 0.3), (cx + W * fx, y0 + H * 0.22), (cx + W * (fx + s / 2), y1 - H * 0.1)], fill=DA2, outline=MUC)
        d.rectangle((cx - W * 0.2, y0 + H * 0.3, cx + W * 0.2, y1 - H * 0.12), fill=DA, outline=MUC, width=2); d.chord((cx - W * 0.12, y0 + H * 0.42, cx + W * 0.12, y1 - H * 0.02), 180, 360, fill=(230, 230, 222)); d.rectangle((cx - W * 0.12, y0 + H * 0.62, cx + W * 0.12, y1 - H * 0.12), fill=(230, 230, 222))
        mai(d, cx, y0 + H * 0.3, W * 0.5, H * 0.12)
    return [(y1 - H * 0.1, f), (y1, lambda d: may(d, cx - W * 0.3, cx + W * 0.3, y1 - H * 0.12, H * 0.08))]

MAU = {'thanh': m_thanh, 'tuthanh': m_tu_thanh, 'tran': m_tran, 'tutran': lambda b, r: m_tran(b, r, tu=True), 'ancu': m_am_cu, 'khoang': m_khoang,
       'phe': m_phe, 'ditich': m_phe, 'bicanh': m_bi_canh, 'dongthien': m_bi_canh}

# ---------------- tiền cảnh + ghép lớp ----------------
def tien_canh(goc):
    """Khối mực đặc (cây, mặt núi tối) và 'chân' từng điểm (điểm thấp nhất của khối theo cột)."""
    g = np.asarray(goc.convert('RGB'), np.float32); L = g @ np.array([.299, .587, .114], np.float32)
    toi = np.clip((140 - ndi.gaussian_filter(L, 3)) / 50, 0, 1); tex = ndi.gaussian_filter(np.abs(L - ndi.gaussian_filter(L, 2)), 4)
    blob = ndi.binary_opening(ndi.gaussian_filter(toi, 5) * np.clip(tex / 6, 0, 1.5) > 0.35, iterations=max(2, g.shape[0] // 210)); blob = ndi.binary_closing(blob, iterations=4)
    H, W = blob.shape; chan = np.zeros((H, W), np.int32)
    for x in range(W):
        col = blob[:, x]; b = -1
        for y in range(H - 1, -1, -1):
            if col[y]:
                if b < 0: b = y
                chan[y, x] = b
            else: b = -1
    return blob, chan

def ve_lop(goc, lop, chan, che_min=12):
    im = goc.convert('RGBA')
    for day, f in sorted(lop, key=lambda t: t[0]):
        l = Image.new('RGBA', im.size, (0, 0, 0, 0)); f(ImageDraw.Draw(l))
        a = np.asarray(l)[..., 3].astype(np.float32) / 255; che = ndi.gaussian_filter((chan > day + che_min).astype(np.float32), 1.2)
        l.putalpha(Image.fromarray((a * (1 - che) * 255).astype(np.uint8))); im = Image.alpha_composite(im, l)
    return im.convert('RGB')

def ne_tien_canh(goc, mau, box, chan, mk, buoc=7, che_min=12):
    """Thử dịch cả bố cục (tối đa ~22% bề rộng / 18% bề cao vùng) để phần phác bị tiền cảnh che ít nhất, nhưng vẫn nằm trong vùng khoanh."""
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; tot = None
    loi = ndi.binary_erosion(mk > 0.9, iterations=max(4, mk.shape[0] // 80)).astype(np.float32)
    for dy in (0.0, -0.1, -0.2, -0.3, -0.4, 0.06):
        for dx in np.linspace(-0.3, 0.3, buoc):
            b = (x0 + dx * W, y0 + dy * H, x1 + dx * W, y1 + dy * H); lop = mau(b)
            a_ = np.zeros(chan.shape, np.float32); che = np.zeros(chan.shape, np.float32)
            for day, f in lop:
                l = Image.new('L', (chan.shape[1], chan.shape[0]), 0); dd = ImageDraw.Draw(l)
                f(_Gom(dd)); m_ = np.asarray(l, np.float32) / 255
                a_ = np.maximum(a_, m_); che = np.maximum(che, m_ * (chan > day + che_min))
            if a_.sum() < 1: continue
            ngoai = (a_ * (loi < 0.5)).sum() / a_.sum(); diem = che.sum() / a_.sum() + ngoai * 6 + abs(dx) * 0.5 + abs(dy) * 0.4  # ở hẳn trong lõi; chỉ dịch khi thật bị che
            if tot is None or diem < tot[0]: tot = (diem, b)
    return tot[1] if tot else box

class _Gom:
    """ImageDraw giả: mọi lệnh vẽ đều tô trắng lên mặt nạ (để đo phần phác bị che)."""
    def __init__(self, d): self.d = d
    def __getattr__(self, k):
        f = getattr(self.d, k)
        def g(*a, **kw):
            kw = {x: y for x, y in kw.items() if x not in ('fill', 'outline')}
            if k in ('polygon', 'rectangle', 'ellipse', 'chord'): kw['fill'] = 255
            else: kw['fill'] = 255
            return f(*a, **kw)
        return g

def ti_le_che(lop, chan, n, che_min=12):
    a_ = np.zeros(chan.shape, np.float32); che = np.zeros(chan.shape, np.float32)
    for day, f in lop:
        l = Image.new('L', (chan.shape[1], chan.shape[0]), 0); f(_Gom(ImageDraw.Draw(l))); m_ = np.asarray(l, np.float32) / 255
        a_ = np.maximum(a_, m_); che = np.maximum(che, m_ * (chan > day + che_min))
    return che.sum() / max(1, a_.sum())

def m_tong(box, rnd):
    """Tông môn tự động: quần thể hình tháp leo núi — điện đỉnh 3 tầng + tháp cao lệch trục, hai tầng sân giữa, nhà dưới, bậc đá zíc zắc từ cổng,
    hai đảo bay (coi như tiền cảnh: không bị núi sau che) nối xích về đỉnh, hai dải mây ngang so le, một thác."""
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2; L = []
    sy = y0 + 0.34 * H
    L.append((sy, lambda d: (nen_da(d, cx, sy, W * 0.5), nha(d, cx, sy - 2, W * 0.3, tang=3), nha(d, cx - W * 0.2, sy + H * 0.02, W * 0.16, tang=2), nha(d, cx + W * 0.2, sy + H * 0.02, W * 0.16, tang=2))))
    L.append((sy - 1, lambda d: thap(d, cx + W * 0.25, y0 + 0.3 * H, W * 0.06, tang=8)))
    for fx, fy, s_ in ((-0.2, 0.55, 0.2), (0.21, 0.5, 0.19)):
        L.append((y0 + fy * H, lambda d, fx=fx, fy=fy, s_=s_: (nen_da(d, cx + W * fx, y0 + fy * H, W * s_ * 1.4), nha(d, cx + W * fx, y0 + fy * H, W * s_, tang=2), nha(d, cx + W * (fx + 0.13 * (1 if fx > 0 else -1)), y0 + (fy + 0.02) * H, W * s_ * 0.5))))
    L.append((y0 + 0.75 * H, lambda d: (nen_da(d, cx + W * 0.08, y0 + 0.75 * H, W * 0.24), nha(d, cx + W * 0.08, y0 + 0.75 * H, W * 0.17))))
    L.append((y0 + 0.9 * H, lambda d: bac_da(d, [(cx, y1 - 0.02 * H), (cx + 0.05 * W, y0 + 0.82 * H), (cx - 0.04 * W, y0 + 0.66 * H), (cx + 0.02 * W, y0 + 0.46 * H), (cx, y0 + 0.35 * H)], max(10, W * 0.04))))
    L.append((y1, lambda d: cong_chao(d, cx, y1 - 0.01 * H, W * 0.16)))
    for (fx, fy, s_) in ((0.13, 0.17, 0.22), (0.86, 0.12, 0.16)):
        L.append((1e6, lambda d, fx=fx, fy=fy, s_=s_: (dao_bay(d, x0 + W * fx, y0 + H * fy, W * s_), xich(d, (x0 + W * fx + W * s_ * 0.3 * (1 if fx < 0.5 else -1), y0 + H * fy), (cx + W * 0.12 * (-1 if fx < 0.5 else 1), sy - H * 0.06)))))
    L.append((y0 + 0.47 * H, lambda d: may(d, x0 + W * 0.04, cx - W * 0.12, y0 + 0.46 * H, H * 0.035)))
    L.append((y0 + 0.63 * H, lambda d: may(d, cx + W * 0.12, x1 - W * 0.04, y0 + 0.62 * H, H * 0.03)))
    L.append((y0 + 0.62 * H, lambda d: d.line((cx + W * 0.33, y0 + 0.4 * H, cx + W * 0.335, y0 + 0.62 * H), fill=NUOC, width=max(4, int(W * 0.012)))))
    return L

def m_dam(box, rnd):
    x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0; cx = (x0 + x1) / 2
    def f(d):
        for i in range(5): d.line((cx - W * 0.3 + i * W * 0.12, y1 - H * 0.12, cx - W * 0.3 + i * W * 0.12, y1 - H * 0.3), fill=(110, 82, 58), width=3)
        nha(d, cx, y1 - H * 0.3, W * 0.5)
        for i in range(9): x = x0 + W * (0.05 + i * 0.11); d.line((x, y1, x + W * 0.02, y1 - H * 0.2), fill=CAY, width=2)
    return [(y1, f)]

MAU.update({'tong': m_tong, 'dong': m_khoang, 'cho': lambda b, r: m_tran(b, r), 'duoc': m_am_cu, 'dam': m_dam})
