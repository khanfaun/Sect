# Soát bố cục một quận TRƯỚC khi vẽ: khoanh vùng tranh (elip) từng nơi lên nền, cắt phóng to từng nơi ở độ phân giải gốc.
# python tools/bo-cuc-xem.py <quận>  -> work/quan-<q>/xem-bocuc.png, zoom-<id>.png, zoom-luoi-<k>.png
import json, sys, os, glob, io
sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')
from PIL import Image, ImageDraw
q = int(sys.argv[1]); d = f'work/quan-{q}/'; CO = 1.6  # khớp VE_LUAT.co ở core2/33
for f in glob.glob(d + 'zoom-*.png'): os.remove(f)
B = json.load(open(d + 'bocuc.json', encoding='utf-8')); K = B['K']; S2 = 3.0
nen = Image.open(d + 'nen.png').convert('RGB'); E = []
for n in B['noi']:
    R = {1: 0, 7: 1, 19: 2, 37: 3}.get(n['o'], 0); cx, cy = n['c'][0] * S2 - K[0] * 512, n['c'][1] * S2 - K[1] * 512
    rx = (2 * R + 1) * 30 * S2 * 0.62 * (1 if R else CO); cao = rx * (2.6 if n['t'] == 'tong' else 1.5); day = cy + (R + 0.8) * 26 * S2
    E.append((n, cx, day - cao / 2, rx, cao / 2))
ov = nen.copy(); dr = ImageDraw.Draw(ov)
for (n, x, y, a, b) in E:
    dr.ellipse((x - a, y - b, x + a, y + b), outline=(220, 0, 0), width=5); dr.text((x - 30, y + b + 4), f"{n['t']} {n['id']} ({n['o']})", fill=(0, 0, 0))
ov.thumbnail((1600, 1600)); ov.save(d + 'xem-bocuc.png')
nho = []
for (n, cx, ey, ax, ay) in E:
    h = max(ax, ay) + 170; box = (int(cx - h), int(ey - h), int(cx + h), int(ey + h)); im = nen.crop(box); z = ImageDraw.Draw(im)
    for (m, x2, y2, a2, b2) in E: z.ellipse((x2 - a2 - box[0], y2 - b2 - box[1], x2 + a2 - box[0], y2 + b2 - box[1]), outline=(220, 0, 0) if m is n else (0, 90, 220), width=3)
    z.text((8, 8), f"{n['id']} {n['t']} ({n['o']})", fill=(255, 0, 0)); im.save(d + f"zoom-{n['id']}.png")
    if im.size[0] < 700: nho.append(n['id'])
    else: print('lớn', n['id'], n['t'], im.size)
for g in range(0, len(nho), 4):
    O = Image.new('RGB', (1160, 1160), 'white')
    for j, i in enumerate(nho[g:g + 4]): O.paste(Image.open(d + f'zoom-{i}.png').resize((573, 573)), ((j % 2) * 585, (j // 2) * 585))
    O.save(d + f'zoom-luoi-{g // 4}.png')
print([(n['id'], n['t'], n['o']) for n, *_ in E])
