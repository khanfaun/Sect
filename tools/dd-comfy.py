# Ảnh địa điểm (biểu tượng trên bản đồ, nền cảnh địa điểm, công trình) theo phong cách thuỷ mặc của bản đồ.
# Dùng ComfyUI Qwen Image 2.1 Turbo (127.0.0.1:8000), ảnh 1 = mẫu phong cách cắt từ bản đồ.
# python tools/dd-comfy.py <id ...>   (không ghi id = làm hết)   ra src/assets-goc/dia-diem/<id>.png
import json, os, sys, time, urllib.request, importlib.util
from PIL import Image
spec = importlib.util.spec_from_file_location('nv', os.path.join(os.path.dirname(__file__), 'nv-comfy.py'))
nv = importlib.util.module_from_spec(spec); sys.argv_bak = sys.argv; sys.argv = ['x']; spec.loader.exec_module(nv); sys.argv = sys.argv_bak
OUT = 'src/assets-goc/dia-diem/'; os.makedirs(OUT, exist_ok=True)
MAP = Image.open('src/assets-goc/ban-do/Spring-day.webp').convert('RGB')

STYLE = ('Traditional Chinese ink-wash painting (shui-mo) game art, soft muted jade-green and grey-sage palette, delicate ink outlines, '
         'light watercolor washes, misty, hand-painted 2D, NOT 3D, NOT isometric render, no text, no labels. '
         'Match the painting style, brushwork and colors of image 1 exactly.')
ICON = (' Single small map landmark seen from a high three-quarter bird view, like a settlement drawn on an old painted map. '
        'The ground under it fades softly into transparency with ragged ink-wash edges so it blends seamlessly onto the map (no hard base, no floating island, no disc). '
        'Buildings and rocks drawn with crisp dark ink outlines and clear contrast, roofs dark grey-green, readable details like the trees and mountains in image 1; not faded, not hazy, no mist over the subject. '
        'Plain white background around it.')
BG = (' Wide horizontal side-view scene, camera level with the ground like a 2D side-scrolling game background, layered depth: '
      'distant misty peaks, mid-ground, foreground terraces/platforms with several EMPTY flat ledges where buildings can be placed later. '
      'No buildings on the empty ledges, no people.')
BLD = (' One single building isolated, front three-quarter side view, sitting on a small piece of stone/earth base, '
       'painted in the same ink-wash game style with slightly richer color accents. Transparent background, output a PNG.')

V = {
  # biểu tượng bản đồ: (crop bản đồ để làm mẫu, câu tả, kiểu)
  'map-thanh-a': ('A large walled city: thick grey stone rampart square, big gate tower with tiered roof, dense tiled rooftops and a central palace hall inside.', ICON),
  'map-thanh-b': ('A large city built against a hillside: stone walls climbing the slope, pagoda tower, many grey tile roofs, river bridge at its gate.', ICON),
  'map-tran-a':  ('A small market town: a cluster of a dozen wooden houses with dark tile roofs along a dirt road, a short wooden palisade, a pailou archway, willow trees.', ICON),
  'map-thon-a':  ('A tiny rural hamlet: four thatched-roof cottages, small rice paddy, bamboo grove, a well.', ICON),
  'map-tong-a':  ('A cultivation sect on a steep misty mountain peak: temple halls with upturned eaves stacked on terraces, long stone stairway, a waterfall, pine trees.', ICON),
  # nền cảnh địa điểm
  'nen-thanh-a': ('Interior view of a grand cultivation city: stone terraces and stairs rising toward misty mountains, city walls on the sides, waterfalls.', BG),
  'nen-thanh-tuyet': ('A city on a frozen snowy highland: snow-covered stone terraces and steps, frozen lake in the foreground, snowy peaks behind, light snowfall.', BG),
  # công trình
  'ct-tuu-lau': ('A two-storey tavern with red lanterns and a wine banner.', BLD),
  'ct-phuong-thi': ('A wide market shop building with open stalls and goods on display.', BLD),
}
# ---- bộ biểu tượng bản đồ: map-<loại>-<bậc>-<biến thể> (bậc theo số ô, xem mapKey ở ui/05-gfx.js) ----
MAPS = {
  'thanh': ['A walled mortal city of medium size: grey stone rampart, one gate tower, a few hundred tile roofs, a drum tower in the middle.',
            'A large walled city: square stone ramparts with corner towers, two gate towers, dense streets of grey tile roofs, a palace hall in the centre, a moat.',
            'A vast capital city: double ring of high walls, many gate towers, a grand palace complex with golden-green roofs on a raised platform, a pagoda, river through the city.'],
  'tuthanh': ['A cultivator city: jade-tinted walls, floating lanterns, a tall spirit pagoda, terraced halls on a hill, a faint glowing array circle at its gate.',
              'A great immortal city on stepped plateaus: tall walls, several pagodas, a sky bridge, a glowing teleport array platform, waterfalls, clouds around it.'],
  'tran': ['A tiny village hamlet: four or five thatched cottages, small rice paddies, bamboo grove, a well, a dirt path.',
           'A small market town: a dozen wooden houses with dark tile roofs along a crossroads, short wooden palisade, a pailou archway, willow trees.',
           'A busy river town: twenty houses with grey tile roofs, a stone bridge over a stream, a small temple, a low earthen wall with a gate.'],
  'tutran': ['A small cultivator market town: a few shops and a pagoda-roofed hall, banners, a glowing lantern line, on a gentle hill.',
             'A prosperous cultivator trading town: rows of shops with green roofs, a tall alchemy pavilion with smoke, an array platform, walls of pale stone.'],
  'tong': ['A small cultivation sect: two or three temple halls with upturned eaves on a hilltop terrace, a stone stairway, pine trees.',
           'A sect on a misty mountain: several halls on stacked terraces, a long stairway, a waterfall, a bell tower.',
           'A great sect spread over two peaks: many halls and pavilions on terraces, a rope bridge between peaks, waterfalls, cranes.',
           'A supreme sect: a cluster of floating mountain peaks with palaces and pagodas, sky bridges, waterfalls into clouds, a grand gate pailou at the foot.'],
  'cho': ['A roadside open-air market: tents and stalls with cloth awnings, carts, lanterns.'],
  'ancu': ['A hermit thatched hut beside bamboo and a small pond on a quiet mountain slope.'],
  'nui': ['A cluster of steep ink-wash mountain peaks with pines and mist.'], 'rung': ['A dense patch of dark pine and broadleaf forest.'],
  'song': ['A bend of a river with reeds, rocks and a small wooden pier.'], 'bien': ['A rocky sea coast with waves and a lone rock islet.'],
  'hoang': ['Open dry wilderness: sparse grass, scattered rocks, a dead tree.'], 'thien': ['A stone stairway path climbing into clouds between cliffs.'],
  'dong': ['A dark cave mouth in a mossy cliff.'], 'khoang': ['A mine entrance in a rocky hill with wooden supports and ore carts.'],
  'duoc': ['A valley of spirit herbs: terraced herb gardens, glowing flowers, a small herb hut.'], 'linhdia': ['A spirit spring: a glowing pond with mist, old stones and a waterfall.'],
  'dam': ['A marsh: reeds, shallow pools, twisted trees, fog.'], 'ma': ['A demonic land: twisted black rocks, dead trees, dark red mist.'],
  'sao': ['A monster lair: jagged rocks, bones, a dark den in a hill.'], 'phe': ['Ruins of an old village: broken walls, collapsed roofs, weeds.'],
  'ai': ['A mountain pass fortress: a stone gate tower blocking a narrow gorge.'], 'bicanh': ['A secret realm portal: a glowing stone arch among floating rocks.'],
  'dongthien': ['A grotto paradise: a cave in a cliff with a waterfall curtain and glowing light.'], 'ditich': ['Ancient ruins: broken stone pillars and a sunken altar overgrown with vines.'],
  'como': ['An old graveyard: tombstones, a stone stele, cypress trees.'],
}
RUIN = {'thanh': 'Ruins of a walled city: broken ramparts, burnt roofs, collapsed gate tower, smoke.', 'tran': 'A burnt destroyed village: charred house frames, broken fence, smoke.',
        'tong': 'Ruins of a sect on a mountain: collapsed halls, broken stairway, burnt pines.'}
TO = {'tong': ' The sect buildings are LARGE and are the main subject filling most of the picture; the mountain is only a compact rocky base under them.',
      'tuthanh': ' The buildings are large, clear and the main subject.'}
for t, L in MAPS.items():
    for b, txt in enumerate(L):
        txt = txt + TO.get(t, '')
        for v in 'ab': V[f'map-{t}-{b+1}-{v}'] = (txt + (' Variation with different layout.' if v == 'b' else ''), ICON)
for t, txt in RUIN.items(): V[f'map-{t}-ruin'] = (txt, ICON)

# ---- ảnh TỪNG Ô lục giác (o-<tên>): ghép nhiều ô thành một nơi; tường thành vẽ riêng theo mép cụm ô (ui/05-gfx.js) ----
TILE = (' A single small map tile that fills ONE hexagonal map cell, seen from a high three-quarter bird view like an old painted map. '
        'Draw ONLY the subject itself with a thin patch of ground directly under it; everything else is pure white paper (no surrounding landscape, no fields, no hills around). No walls around it, no border, no frame, no circle, NO hexagon outline, no tile edge: the bit of ground under it dissolves softly into the white paper with no line. '
        'Crisp dark ink outlines, clear contrast, not hazy. Plain white background.')
O = {
  # thành
  'pho-1': 'A loose cluster of six city houses with dark grey tile roofs and narrow lanes.',
  'pho-2': 'A city block: courtyard houses with grey tile roofs around small yards, a few trees.',
  'pho-3': 'A city street block: two rows of two-storey shops with tile roofs, a lantern string.',
  'dien': 'A grand palace hall with double-eaved dark green tile roof on a stone platform with steps, small courtyard.',
  'thap': 'A tall multi-storey drum tower / pagoda with upturned eaves, surrounded by a few roofs.',
  'cho': 'A city market square: many cloth-awning stalls, carts, lanterns, a few shop houses around.',
  'mieu': 'A temple courtyard: main shrine hall, incense burner, two old pine trees.',
  'phu': 'A rich mansion compound: several halls around courtyards, a garden pond.',
  'linhthap': 'A slender jade spirit pagoda with faint glowing lanterns, cultivator style.',
  'trphap': 'A round stone teleport array platform with glowing green runes and four stone pillars.',
  # trấn, thôn
  'ngoi-1': 'Three small village houses with grey tile roofs, a vegetable garden, a willow tree.',
  'ngoi-2': 'Four wooden houses with dark tile roofs along a dirt road, a wooden fence.',
  'tranh-1': 'Three thatched-roof cottages, a haystack, a bamboo clump.',
  'tranh-2': 'Two thatched cottages beside a well and a small bamboo grove.',
  'ruong': 'A few small irregular rice paddy plots with a small field hut.',
  'dinh': 'A village communal hall with tile roof and a big banyan tree beside it.',
  'chonho': 'A small village market: a few stalls with awnings and a teahouse.',
  # tông môn
  'tdien': 'A sect main hall with sweeping eaves on a rocky outcrop, stone stairs leading up.',
  'tgac': 'Two elegant sect pavilions on stacked stone terraces with pines.',
  'tthap': 'A tall sect pagoda on a rock with a small waterfall beside it.',
  'tvo': 'A sect training plaza: a square stone arena with weapon racks and a banner pole.',
  'tdan': 'An alchemy pavilion with a big bronze cauldron in front, thin smoke rising.',
  'tnui': 'A small steep rocky peak with a tiny pavilion on top and pines.',
  'tcong': 'A sect mountain gate: a tall stone pailou archway at the foot of long stone stairs.',
  # hoang dã
  'ho': 'A small lake with reeds and lotus.', 'song': 'A short stretch of river with rocks and reeds.',
  'rung-1': 'A loose clump of pine trees, like the trees on the map.', 'rung-2': 'A grove of broadleaf trees and bamboo.',
  'nui-1': 'A steep ink-wash mountain peak with pines.', 'nui-2': 'Two rocky hills with mist at their feet.',
  'hang': 'A dark cave mouth in a mossy rocky cliff.', 'dam': 'A marsh with reeds, shallow pools and twisted trees.',
  'duoc': 'A patch of spirit herbs with glowing flowers and a tiny herb hut.', 'hoang': 'Dry wasteland with sparse grass, rocks and a dead tree.',
  'mo': 'An old graveyard: tombstones, a stone stele, cypress trees.', 'phe': 'Ruins: broken walls and collapsed roofs overgrown with weeds.',
  'ltuyen': 'A glowing spirit spring pool among old stones.', 'khoang': 'A mine entrance in a rocky hill with wooden supports and an ore cart.',
  'sao': 'A monster lair: jagged rocks, bones and a dark den.', 'ma': 'A few twisted black rocks and two dead trees with a faint red haze, on the open ground.',
  'ai': 'A mountain pass fortress gate tower in a narrow gorge.', 'bicanh': 'A glowing stone arch portal among floating rocks.',
  'ancu': 'A hermit thatched hut with bamboo and a small pond.', 'thien': 'A stone stairway climbing up a cliff into clouds.',
  'bien': 'A rocky sea shore with waves.', 'dthien': 'A rounded ink-painted rocky hill like the hills on the map, with a dark cave opening and a thin white waterfall.',
  'chay': 'Burnt ruins of houses with charred beams and smoke.',
}
for k, t in O.items(): V['o-' + k] = (t, TILE)

def crop(kind):
    w, h = MAP.size
    if kind is BG: return MAP.crop((w//2-1000, h//2-500, w//2+1000, h//2+500)).resize((1536, 768))
    return MAP.crop((w//2-500, h//2-500, w//2+500, h//2+500)).resize((512, 512) if kind is TILE else (1024, 1024))

def main(ids):
    ids = ids or list(V)
    if ids == ['o']: ids = [k for k in V if k.startswith('o-')]
    if ids == ['map']: ids = [k for k in V if k.startswith('map-') and (k.count('-') == 3 or k.endswith('-ruin'))]
    pend = {}
    for i, k in enumerate(ids):
        txt, kind = V[k]
        ref = crop(kind); fn = nv.upload('dd-ref-' + ('bg' if kind is BG else 'o' if kind is TILE else 'sq') + '.png', ref)
        p = STYLE + ' ' + txt + kind
        pend[k] = nv.post('/prompt', json.dumps({'prompt': nv.wf(fn, p, 1000 + i * 7 + int(os.environ.get('SEED', 0)), 'dd-' + k)}).encode(), 'application/json')['prompt_id']
    for k, pid in pend.items():
        while True:
            hi = json.load(urllib.request.urlopen(f'{nv.URL}/history/{pid}')).get(pid)
            if hi and hi.get('outputs'): break
            if hi and hi.get('status', {}).get('status_str') == 'error': raise SystemExit('loi ' + k)
            time.sleep(2)
        f = hi['outputs']['15']['images'][0]
        urllib.request.urlretrieve(f"{nv.URL}/view?filename={f['filename']}&subfolder={f.get('subfolder','')}&type=output", OUT + k + '.png')
        print('xong', k, flush=True)
def bo_trang(im, cut=0.07):
    """Nền trắng -> trong suốt kiểu 'nhân' (multiply): vùng nhạt mờ dần vào bản đồ, mép loang tự nhiên."""
    import numpy as np
    a = np.asarray(im.convert('RGB')).astype(np.float32) / 255
    al = np.clip((1 - a.min(axis=2) - cut) / 0.28, 0, 1) ** 1.2
    h, w = al.shape; yy, xx = np.mgrid[0:h, 0:w]; ys, xs = np.nonzero(al > 0.3)
    if len(xs):  # mờ dần ra rìa cụm hình, không để lại quầng sáng
        cx, cy, rx, ry = xs.mean(), ys.mean(), (xs.max() - xs.min()) / 2 + 1, (ys.max() - ys.min()) / 2 + 1
        d = np.sqrt(((xx - cx) / rx) ** 2 + ((yy - cy) / ry) ** 2); al = al * np.clip((1.05 - d) / 0.3, 0, 1)
    c = np.where(al[..., None] > 0.01, 1 - (1 - a) / np.maximum(al[..., None], 1e-3), 1)
    out = np.dstack([np.clip(c, 0, 1), al]) * 255
    return Image.fromarray(out.astype(np.uint8))

def cat(ids):
    """PNG gốc -> src/assets/ui/<tên>.webp. Biểu tượng bản đồ bỏ nền trắng, thu về 320px."""
    import glob
    fs = [OUT + k + '.png' for k in ids] if ids else sorted(glob.glob(OUT + 'map-*-*-*.png') + glob.glob(OUT + 'map-*-ruin.png'))
    for f in fs:
        k = os.path.basename(f)[:-4]; im = Image.open(f)
        if k.startswith(('map-', 'ct-', 'o-')):
            im = bo_trang(im, 0.13 if k.startswith('o-') else 0.07) if im.convert('RGBA').getextrema()[3][0] > 0 else im.convert('RGBA')
            bb = im.getchannel('A').point(lambda x: 255 if x > 8 else 0).getbbox()
            if bb:  # cắt sát rồi đệm lại thành vuông, chân ảnh ở đáy
                im = im.crop(bb); m = max(im.size); sq = Image.new('RGBA', (m, m)); sq.paste(im, ((m - im.size[0]) // 2, m - im.size[1])); im = sq
            im = im.resize((192, 192) if k.startswith('o-') else (320, 320) if k.startswith('map-') else (384, 384), Image.LANCZOS)
        im.save('src/assets/ui/' + k + '.webp', 'WEBP', quality=86, method=6); print('cat', k)

if __name__ == '__main__':
    a = sys.argv[1:]
    cat(a[1:]) if a[:1] == ['cat'] else main(a)
