# Vẽ PHÁC bằng vector (đa giác, nét mực) hình dạng một nơi lên mảnh bản đồ, để Qwen vẽ lại theo bản phác.
# Góc nhìn như bản đồ: chính diện, từ trên cao (~40°): mặt trước nằm ngang, mặt sau cao hơn và hẹp lại một chút.
import sys, json, math, numpy as np
from PIL import Image, ImageDraw

MUC = (58, 40, 28); TUONG = (150, 140, 120); MAI = (95, 85, 72); MAI2 = (120, 108, 92); SAN = (196, 170, 128); CAY = (90, 98, 70)

def mai_nha(d, cx, day, w, h, cao_mai=None, tang=1):
    """Một toà nhà nhìn chính diện từ trên cao: thân (chữ nhật) + mái chữ nhật cong vểnh hai đầu, có thể nhiều tầng."""
    cao_mai = cao_mai or h * 0.9
    y = day
    for t in range(tang):
        ww = w * (1 - 0.18 * t); th = h * (0.55 if t == 0 else 0.4)
        d.rectangle((cx - ww * 0.42, y - th, cx + ww * 0.42, y), fill=(170, 150, 120), outline=MUC, width=2)
        for i in range(1, 4): d.line((cx - ww * 0.42 + i * ww * 0.21, y - th, cx - ww * 0.42 + i * ww * 0.21, y), fill=MUC, width=1)
        y -= th; m = cao_mai * (1 if t == 0 else 0.75)
        # mái: hình thang, hai đầu vểnh
        p = [(cx - ww * 0.62, y + 4), (cx - ww * 0.55, y - 2), (cx - ww * 0.32, y - m), (cx + ww * 0.32, y - m), (cx + ww * 0.55, y - 2), (cx + ww * 0.62, y + 4)]
        d.polygon(p, fill=MAI if t == 0 else MAI2, outline=MUC); d.line(p, fill=MUC, width=2)
        for i in range(1, 7): x = cx - ww * 0.5 + i * ww / 7; d.line((x, y - 1, cx - ww * 0.3 + i * ww * 0.6 / 7, y - m + 2), fill=MUC, width=1)
        d.line((cx - ww * 0.32, y - m, cx + ww * 0.32, y - m), fill=MUC, width=3)
        y -= m * 0.85

def cay(d, x, y, r):
    for dx, dy, rr in ((0, 0, r), (-r * 0.6, r * 0.3, r * 0.7), (r * 0.6, r * 0.3, r * 0.7)):
        d.ellipse((x + dx - rr, y + dy - rr - r, x + dx + rr, y + dy + rr - r), fill=CAY, outline=MUC)
    d.line((x, y - r * 0.2, x, y + r * 0.6), fill=MUC, width=2)

def thanh(im, box):
    """Thành có tường bao: box = (x0, y0, x1, y1) vùng khoanh. Mặt trước ở dưới, mặt sau ở trên (hẹp hơn)."""
    d = ImageDraw.Draw(im, 'RGBA'); x0, y0, x1, y1 = box; W = x1 - x0; H = y1 - y0
    fy = y1 - H * 0.08; by = y0 + H * 0.30; fl, fr = x0 + W * 0.04, x1 - W * 0.04; bl, br = x0 + W * 0.20, x1 - W * 0.20; th = H * 0.10
    d.polygon([(fl, fy), (bl, by), (br, by), (fr, fy)], fill=SAN)                       # sân trong
    def tuong(a, b, hh):
        (ax, ay), (bx, by_) = a, b; d.polygon([(ax, ay), (bx, by_), (bx, by_ - hh), (ax, ay - hh)], fill=TUONG, outline=MUC)
        n = max(3, int(math.hypot(bx - ax, by_ - ay) / 12))
        for i in range(n):                                                                 # lỗ châu mai
            t0, t1 = i / n, (i + 0.5) / n; p0 = (ax + (bx - ax) * t0, ay + (by_ - ay) * t0 - hh); p1 = (ax + (bx - ax) * t1, ay + (by_ - ay) * t1 - hh)
            d.rectangle((min(p0[0], p1[0]), min(p0[1], p1[1]) - 5, max(p0[0], p1[0]), max(p0[1], p1[1])), fill=TUONG, outline=MUC)
    tuong((bl, by), (br, by), th * 0.7)                                                     # tường sau
    tuong((fl, fy), (bl, by), th * 0.85); tuong((br, by), (fr, fy), th * 0.85)             # hai tường bên
    # nhà trong thành: điện chính phía sau giữa, hai dãy hai bên, vài nhà nhỏ
    mai_nha(d, (x0 + x1) / 2, by + H * 0.14, W * 0.24, H * 0.09, tang=2)                  # điện chính (sau, giữa)
    for cx, cy, w in ((x0 + W * 0.27, by + H * 0.30, W * 0.15), (x1 - W * 0.27, by + H * 0.30, W * 0.15),   # hai dãy giữa
                      (x0 + W * 0.22, fy - H * 0.16, W * 0.14), (x1 - W * 0.22, fy - H * 0.16, W * 0.14),   # hai nhà trước
                      (x0 + W * 0.40, by + H * 0.06, W * 0.10), (x1 - W * 0.40, by + H * 0.06, W * 0.10)):  # hai nhà nhỏ sau
        mai_nha(d, cx, cy, w, H * 0.065)
    for cx, cy in ((x0 + W * 0.5, by + H * 0.42), (x0 + W * 0.38, fy - H * 0.2), (x1 - W * 0.38, fy - H * 0.2)): cay(d, cx, cy, W * 0.025)
    tuong((fl, fy), (fr, fy), th)                                                           # tường trước (vẽ sau cùng, che bên trong)
    mai_nha(d, (x0 + x1) / 2, fy - 2, W * 0.13, H * 0.09, tang=2)                            # lầu cổng
    d.chord(((x0 + x1) / 2 - W * 0.025, fy - th * 0.8, (x0 + x1) / 2 + W * 0.025, fy + th * 0.4), 180, 360, fill=(40, 30, 22))
    for x in (fl, fr): mai_nha(d, x, fy - th * 0.6, W * 0.07, H * 0.05)                    # tháp góc trước
    return im

if __name__ == '__main__':
    src, mn, out = sys.argv[1:4]
    im = Image.open(src).convert('RGB'); m = np.asarray(Image.open(mn).convert('L')) > 128
    ys, xs = np.nonzero(m); box = (xs.min() + 8, ys.min() + 4, xs.max() - 8, ys.max() - 4)
    thanh(im, box).save(out); print('box', box)

# ---------------- tông môn lớn: vẽ theo lớp (xa -> gần), phần nào có tiền cảnh đứng trước thì bị che ----------------
DA = (178, 160, 128); DA2 = (150, 134, 106); MAY = (236, 226, 204); NUOC = (225, 228, 222)

def lop_moi(size): return Image.new('RGBA', size, (0, 0, 0, 0))

def dao_bay(d, cx, cy, w):
    """Đảo đá bay: mặt trên phẳng, đáy là khối đá nhọn chúc xuống; trên có đình; thác nước rơi từ mép."""
    h = w * 0.9
    d.polygon([(cx - w / 2, cy), (cx - w * 0.3, cy + h * 0.45), (cx - w * 0.05, cy + h), (cx + w * 0.15, cy + h * 0.6), (cx + w * 0.35, cy + h * 0.35), (cx + w / 2, cy)], fill=DA2, outline=MUC)
    for i in range(4): d.line((cx - w * 0.35 + i * w * 0.2, cy + 4, cx - w * 0.2 + i * w * 0.12, cy + h * (0.4 + 0.12 * i)), fill=MUC, width=2)
    d.ellipse((cx - w / 2, cy - w * 0.08, cx + w / 2, cy + w * 0.08), fill=DA, outline=MUC, width=2)
    mai_nha(d, cx, cy, w * 0.45, w * 0.18, tang=2)
    d.line((cx + w * 0.4, cy + 6, cx + w * 0.38, cy + h * 1.6), fill=NUOC, width=max(3, int(w * 0.05)))  # thác

def xich(d, p, q, vong=0.12):
    (x0, y0), (x1, y1) = p, q; n = int(math.hypot(x1 - x0, y1 - y0) / 7)
    for i in range(n):
        t = i / n; x = x0 + (x1 - x0) * t; y = y0 + (y1 - y0) * t + math.sin(math.pi * t) * math.hypot(x1 - x0, y1 - y0) * vong
        d.ellipse((x - 2.5, y - 2, x + 2.5, y + 2), outline=MUC, width=1)

def may(d, x0, x1, y, h):
    """Dải mây ngang: chuỗi cuộn mây chồng nhau, viền mực mảnh."""
    x = x0; i = 0
    while x < x1:
        r = h * (0.7 + 0.3 * math.sin(i * 1.7)); d.ellipse((x - r, y - r * 0.7, x + r * 1.2, y + r * 0.5), fill=MAY, outline=(120, 100, 80), width=2)
        d.arc((x - r * 0.5, y - r * 0.45, x + r * 0.6, y + r * 0.25), 180, 360, fill=(120, 100, 80), width=1); x += r * 1.1; i += 1

def cau_thang(d, pts, w):
    for (x0, y0), (x1, y1) in zip(pts, pts[1:]):
        d.polygon([(x0 - w / 2, y0), (x1 - w / 2, y1), (x1 + w / 2, y1), (x0 + w / 2, y0)], fill=(200, 186, 156), outline=MUC)
        n = int(abs(y0 - y1) / 6) + 1
        for i in range(n): t = i / n; x = x0 + (x1 - x0) * t; y = y0 + (y1 - y0) * t; d.line((x - w / 2, y, x + w / 2, y), fill=MUC, width=1)

def nen_da(d, cx, day, w):  # nền đá / sân dưới toà nhà trên sườn núi
    d.polygon([(cx - w * 0.6, day), (cx - w * 0.5, day + w * 0.18), (cx + w * 0.5, day + w * 0.18), (cx + w * 0.6, day)], fill=DA, outline=MUC)

def cong_chao(d, cx, day, w):
    h = w * 0.7
    for x in (cx - w * 0.42, cx - w * 0.14, cx + w * 0.14, cx + w * 0.42): d.rectangle((x - 3, day - h, x + 3, day), fill=(120, 90, 60), outline=MUC)
    for yy, ww in ((day - h, w * 1.05), (day - h * 0.72, w * 0.95)):
        d.polygon([(cx - ww / 2, yy + 4), (cx - ww * 0.42, yy - 8), (cx + ww * 0.42, yy - 8), (cx + ww / 2, yy + 4)], fill=MAI, outline=MUC)

def ve_tong_mon(goc, cac, chan, che_min=25):
    """cac: danh sách (chân y, hàm vẽ lên ImageDraw). Vẽ từ xa (chân nhỏ) tới gần; mỗi lớp bị che ở chỗ tiền cảnh có chân thấp hơn chân lớp + che_min."""
    im = goc.convert('RGBA'); H = im.size[1]
    for day, f in sorted(cac, key=lambda t: t[0]):
        l = lop_moi(im.size); f(ImageDraw.Draw(l))
        a = np.asarray(l)[..., 3].astype(np.float32) / 255
        che = (chan > day + che_min).astype(np.float32); che = ndi_gauss(che, 1.5)
        l.putalpha(Image.fromarray((a * (1 - che) * 255).astype(np.uint8))); im = Image.alpha_composite(im, l)
    return im.convert('RGB')

def ndi_gauss(a, s):
    from scipy import ndimage as ndi
    return ndi.gaussian_filter(a, s)
