# Đo từng ô lục giác trên ẢNH bản đồ đã khám phá xem có phải đất bằng trống (đặt được thành / trấn) không:
# ít nét mực (không vách núi, không rừng), không phải nước. Ra src/game/core2/03c-o-phang.js (O_PHANG: chuỗi '0'/'1' theo chỉ số ô).
# python tools/o-phang.py [--xem tệp.png]
import json, re, sys
import numpy as np
from PIL import Image, ImageFilter, ImageDraw
MAP = Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('L')
MW, MH = MAP.size
src = open('content/rules/mapd.js', encoding='utf-8').read()
HC = int(re.search(r'hc:(\d+)', src).group(1)); HR = int(re.search(r'hr:(\d+)', src).group(1))
TER = re.search(r'ter:"([^"]+)"', src).group(1)
HEXW = 30; HEXP = HEXW * 0.8660254
g = np.asarray(MAP, np.float32)
# nét mực: độ lệch so với nền mờ (vách núi, cây, mái nhà đều nhiều nét)
blur = np.asarray(MAP.filter(ImageFilter.GaussianBlur(6)), np.float32)
net = np.abs(g - blur)
toi = g < 95  # mực đậm
from skimage import color as skc
LAB = skc.rgb2lab(np.asarray(Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB').resize((MW // 4, MH // 4)), np.float32) / 255)
vang = np.asarray(Image.fromarray(LAB[..., 2].astype(np.float32)).resize((MW, MH)))  # b*: đất vàng nâu cao, nước / vách đá xám xanh thấp
sx, sy = MW / 3556, MH / 2000
R = HEXW / np.sqrt(3) * sx * 0.8
yy, xx = np.mgrid[-int(R) - 1:int(R) + 2, -int(R) - 1:int(R) + 2]; dia = (xx ** 2 + yy ** 2) <= R * R
diem = np.zeros(HC * HR); dam = np.zeros(HC * HR); bv = np.zeros(HC * HR)
for i in range(HC * HR):
    c, r = i % HC, i // HC
    cx = (c + 0.5 + (r % 2) * 0.5) * HEXW * sx; cy = (r + 2 / 3) * HEXP * sy
    x0, y0 = int(cx) - int(R) - 1, int(cy) - int(R) - 1
    if x0 < 0 or y0 < 0 or x0 + dia.shape[1] > MW or y0 + dia.shape[0] > MH: diem[i] = 99; continue
    diem[i] = net[y0:y0 + dia.shape[0], x0:x0 + dia.shape[1]][dia].mean()
    bv[i] = vang[y0:y0 + dia.shape[0], x0:x0 + dia.shape[1]][dia].mean()
    dam[i] = toi[y0:y0 + dia.shape[0], x0:x0 + dia.shape[1]][dia].mean()
VANG = float(sys.argv[sys.argv.index('--vang') + 1]) if '--vang' in sys.argv else 12.0
NGUONG = float(sys.argv[sys.argv.index('--nguong') + 1]) if '--nguong' in sys.argv else 11.0
# màu đất mỗi vùng khác nhau (nam ẩm xanh hơn, bắc tuyết nhạt hơn): so với trung vị màu các ô ít nét quanh đó (bán kính ~10 ô)
it = (diem < NGUONG) & (dam < 0.04); B2 = bv.reshape(HR, HC); I2 = it.reshape(HR, HC); locm = np.zeros(HC * HR)
for r in range(HR):
    for c in range(HC):
        sb = B2[max(0, r - 10):r + 11, max(0, c - 10):c + 11][I2[max(0, r - 10):r + 11, max(0, c - 10):c + 11]]
        locm[r * HC + c] = np.median(sb) if sb.size else 25
ph = ''.join('1' if it[i] and bv[i] > max(VANG, locm[i] - 6) and TER[i] not in '45' else '0' for i in range(HC * HR))
print('b* đất bằng', np.percentile(bv[(diem < NGUONG)], [10, 50, 90]))
print('ô bằng', ph.count('1'), '/', len(ph), 'trung vị điểm nét', np.median(diem[diem < 99]))
for t in '1234567': idx = [i for i in range(len(ph)) if TER[i] == t]; print('loại đất', t, len(idx), 'bằng', sum(ph[i] == '1' for i in idx))
# ô bị che: bản đồ vẽ phối cảnh nhìn chéo; ô mà nền phải là đất bằng / đồi / rừng / đầm (theo dữ liệu địa hình) nhưng ẢNH lại vẽ khối núi
# hoặc rừng dày đè lên -> mặt đất ô đó đã bị vật phía trước che. Ô núi (3) là sườn / đỉnh núi thật: vẫn xây được (thôn núi, tông môn trên đỉnh).
def che(i): return ph[i] == '0' and TER[i] in '1267'
oche = ''.join('1' if che(i) else '0' for i in range(HC * HR))
print('ô bị che', oche.count('1'))
open('src/game/core2/03c-o-phang.js', 'w', encoding='utf-8').write(
    "// Đo từ ảnh bản đồ + độ cao (tools/o-phang.py).\n// O_PHANG '1' = đất bằng trống (ít nét mực, màu đất, không nước): thành / trấn ưu tiên đặt ở đây.\n"
    "// O_CHE '1' = bị núi cao / rừng ngay phía trước che (phối cảnh nhìn chéo): không đặt thành / trấn / tông môn.\nconst O_PHANG='" + ph + "';\nconst O_CHE='" + oche + "';\n")
if '--xem' in sys.argv:
    o = Image.open('src/assets-goc/ban-do/Hidden-map - Backup.webp').convert('RGB'); d = ImageDraw.Draw(o, 'RGBA')
    for i in range(HC * HR):
        c, r = i % HC, i // HC; cx = (c + 0.5 + (r % 2) * 0.5) * HEXW * sx; cy = (r + 2 / 3) * HEXP * sy
        if ph[i] == '1': d.ellipse((cx - 6, cy - 6, cx + 6, cy + 6), fill=(0, 160, 0, 150))
        if oche[i] == '1': d.ellipse((cx - 6, cy - 6, cx + 6, cy + 6), fill=(220, 0, 0, 170))
    o.save(sys.argv[sys.argv.index('--xem') + 1])
