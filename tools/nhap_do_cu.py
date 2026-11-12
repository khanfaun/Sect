# Nhập mọi thứ đang có sẵn trong code game vào Excel gốc (docs/vat-pham.xlsx),
# để Excel luôn là danh mục đầy đủ nhất. Dòng nhập từ game được tô xanh và ghi
# "Có trong game · mã: <mã>" ở cột Ghi chú. Chạy lại nhiều lần không sinh dòng trùng.
# Dùng: python3 tools/nhap_do_cu.py [file_excel_vao] [file_excel_ra]
import json, os, subprocess, sys, tempfile
import openpyxl
from openpyxl.styles import PatternFill

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'docs/vat-pham.xlsx')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'docs/vat-pham.xlsx')
GREEN = PatternFill('solid', fgColor='DCEBD2')
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from excel_chung import DANG_K, K_SHEET, PHAM, VUNG, CG, TYPE_N, sheet_rows, header_of

# ---- lấy dữ liệu thật từ game (chạy phần lõi trong node) ----
subprocess.run(['node', os.path.join(ROOT, 'tools/build.js')], check=True, stdout=subprocess.DEVNULL)
js = r'''
const fs=require('fs'),vm=require('vm');
const html=fs.readFileSync(process.argv[2],'utf8');
const a=html.indexOf('<script>')+8,b=html.indexOf('// ================= GIAO DIỆN');
const ctx=vm.createContext({console,Math,JSON,Date,performance:{now:()=>Date.now()}});
vm.runInContext(html.slice(a,b),ctx);
process.stdout.write(JSON.stringify(vm.runInContext(`({RELIC_UNIQUE,RELIC_K,RELIC_PRE,PILL,SK_RAW,SK,MOUNT,MAT,EN,ORIGIN,REG_EN,LS_OG,LS_TPG,TT_TRAITS,TP_ORIGIN})`,ctx)));
'''
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f:
    f.write(js); jsf = f.name
G = json.loads(subprocess.run(['node', jsf, os.path.join(ROOT, 'phu-sinh.html')], check=True, capture_output=True, text=True).stdout)
os.unlink(jsf)

wb = openpyxl.load_workbook(SRC)
added = {}

def upsert(sheet, row, code, keycol='Tên'):
    """Tìm dòng cùng tên (hoặc đã ghi mã) trong trang; có thì đánh dấu, chưa có thì thêm."""
    ws = wb[sheet]; hr, hdr = header_of(ws)
    tag = 'Có trong game · mã: ' + code
    note_c = hdr.index('Ghi chú') + 1
    key_c = hdr.index(keycol) + 1
    for i in range(hr + 1, ws.max_row + 1):
        name = ws.cell(i, key_c).value; note = ws.cell(i, note_c).value or ''
        if ('mã: ' + code + ' ') in (note + ' ') or (name and str(name).strip().lower() == str(row[keycol]).strip().lower()):
            for k, v in row.items():
                if k in hdr and v not in (None, '') and k != 'ID':
                    if ws.cell(i, hdr.index(k) + 1).value in (None, ''): ws.cell(i, hdr.index(k) + 1, v)
            ws.cell(i, note_c, tag)
            for j in range(1, len(hdr) + 1): ws.cell(i, j).fill = GREEN
            return
    i = ws.max_row + 1
    for k, v in row.items():
        if k in hdr: ws.cell(i, hdr.index(k) + 1, v)
    ws.cell(i, note_c, tag)
    for j in range(1, len(hdr) + 1): ws.cell(i, j).fill = GREEN
    added[sheet] = added.get(sheet, 0) + 1

def fx_cols(fx, n=4):
    out = {}; j = 1
    for k, v in fx.items():
        if k == 'elP':
            for e, x in v.items(): out[f'Chỉ số {j}'] = 'elP ' + e; out[f'Giá trị {j}'] = x; j += 1
        else: out[f'Chỉ số {j}'] = k; out[f'Giá trị {j}'] = v; j += 1
    return out

K_DANG = {}
for d, k in DANG_K.items(): K_DANG.setdefault(k, d)
ICON = {'kiem': '🗡️', 'phien': '🏴', 'boi': '💠', 'nhan': '💍', 'kinh': '🪞', 'giap': '🐉', 'hap': '🧰', 'lenh': '🪪'}

# 1. pháp bảo độc nhất
for code, u in G['RELIC_UNIQUE'].items():
    k = u['k']; dang = K_DANG[k]
    row = {'ID': K_SHEET[k][1] + code, 'Tên': u['name'], 'Dạng': dang, 'Hệ': u.get('el', 'vo'), 'Phẩm': 'Hoàng phẩm', 'Cảnh giới cần': 'Phàm nhân',
           'Vùng xuất hiện': VUNG[0], 'Độc nhất': 'Có', 'Biểu tượng': ICON.get(k, '🏺'), 'Mô tả / lời tựa': u.get('lore', ''), 'Nguồn gặp': 'Sự kiện'}
    for j, (kk, vv) in enumerate(u['fx'].items(), 1): row[f'Gốc {j}'] = kk; row[f'Số gốc {j}'] = vv
    upsert(K_SHEET[k][0], row, code)

# 2. tên ghép: tên gốc theo dạng và tiền tố theo hệ
for K in G['RELIC_K']:
    k = K['k']
    for b in K['b']:
        d = next((x for x, kk in DANG_K.items() if kk == k and x.lower() == b.lower()), K_DANG[k])
        upsert('TB Tên ghép', {'Loại': 'Tên gốc', 'Dạng (với tên gốc)': d, 'Từ mới': b}, 'goc:' + k + ':' + b, keycol='Từ mới')
for el, L in G['RELIC_PRE'].items():
    for p in L: upsert('TB Tên ghép', {'Loại': 'Tiền tố', 'Hệ (với tiền tố)': el, 'Từ mới': p}, 'pre:' + el + ':' + p, keycol='Từ mới')

# 3. đan dược
EFF_ANY = {'hoixuan': 'Hồi khí huyết %', 'tukhi': 'Hồi linh lực %', 'giaidoc': 'Giải độc + hồi khí huyết %', 'dinhthan': 'Giảm tâm ma',
           'tinhnguyen': 'Tăng tu vi %', 'taytuy': 'Tăng khí huyết tối đa vĩnh viễn %', 'khaitri': 'Tăng ngộ tính vĩnh viễn', 'dientho': 'Tăng thọ nguyên %', 'linhnhu': 'Tăng đạo cơ'}
EFF_CB = {'baohuyet': 'Tăng cuồng nộ', 'kimcang': 'Hộ thể % khí huyết', 'loiphu': 'Đánh một đòn % công', 'thanhanh': 'Chắc chắn thoát thân'}
BT_FOR = ['Luyện Khí → Trúc Cơ', 'Trúc Cơ → Kết Đan', 'Kết Đan → Nguyên Anh', 'Nguyên Anh → Hóa Thần', 'Hóa Thần → Độ Kiếp']
for code, p in G['PILL'].items():
    if code in EFF_ANY:
        upsert('DD Đan dược', {'ID': 'dan_' + code, 'Tên': p['n'], 'Tác dụng': EFF_ANY[code], 'Mức tác dụng': p['x'], 'Giá (linh thạch)': p['p'],
                               'Vùng xuất hiện': VUNG[1 if code in ('taytuy', 'khaitri', 'dientho') else 0], 'Biểu tượng': p['i'], 'Mô tả': p['d'].replace('{x}', str(p['x'])), 'Nguồn gặp': 'Tiệm, luyện đan'}, code)
    elif code in EFF_CB:
        upsert('DD Phù lục', {'ID': 'phu_' + code, 'Tên': p['n'], 'Tác dụng': EFF_CB[code], 'Mức tác dụng': p['x'], 'Hệ (nếu đánh)': 'loi' if code == 'loiphu' else None,
                              'Giá (linh thạch)': p['p'], 'Vùng xuất hiện': VUNG[0], 'Biểu tượng': p['i'], 'Mô tả': p['d'].replace('{x}', str(p['x'])), 'Nguồn gặp': 'Tiệm'}, code)
    else:
        bt = p.get('bt', {})
        eff = 'Tăng tỉ lệ đột phá %' if 'rate' in bt else 'Hộ mệnh (thất bại không mất tu vi)' if 'guard' in bt else 'Bớt một đạo lôi kiếp' if 'kiepCut' in bt else 'Hộ thể khi vào kiếp %' if 'kiepHp' in bt else 'Tăng đạo cơ khi đột phá'
        upsert('DD Đột phá', {'ID': 'bt_' + code, 'Tên': p['n'], 'Tác dụng': eff, 'Mức tác dụng': p['x'] or 1,
                              'Cho cảnh giới': BT_FOR[p['realm']] if 'realm' in p else 'Mọi cảnh giới', 'Giá (linh thạch)': p['p'], 'Biểu tượng': p['i'],
                              'Mô tả': p['d'].replace('{x}', str(p['x'])), 'Nguồn gặp': 'Tiệm, đấu giá'}, code)

# 4. chiêu thức (giữ số gốc trước khi game nhân thêm cho chiêu tụ lực)
for s in G['SK_RAW']:
    code, n, el, t, c, fx, f = s; S = G['SK'][code]
    cat = 'Thân pháp' if fx.get('evade') else 'Phòng thủ' if not fx.get('p') else 'Thần thông' if t >= 3 else 'Tấn công'
    row = {'ID': 'sk_' + code, 'Tên': n, 'Loại': cat, 'Hệ': el, 'Bậc (1–4)': t, 'Linh lực tốn': c, 'Kiểu sát thương': 'Vật lý' if S['dt'] == 'vl' else 'Phép',
           'Tụ lực': 'Có' if S['fx'].get('charge') else 'Không', 'Diện rộng': 'Có' if S['fx'].get('aoe') else 'Không', 'Đạo pháp': 'Có' if S.get('dao') else 'Không',
           'Câu tả khi xuất chiêu': f}
    for j, (k, v) in enumerate(fx.items(), 1):
        row[f'Hiệu ứng {j}'] = k; row[f'Số {j}'] = v if v is not True else 1
    upsert('BT Chiêu thức', row, code)

# 5. phương tiện
for m in G['MOUNT']:
    upsert('VT Phương tiện', {'ID': 'pt_' + m['id'], 'Tên': m['n'], 'Tốc độ (gấp mấy lần đi bộ)': m['m'], 'Giá (linh thạch)': m['p'], 'Cảnh giới cần': CG[m.get('realm', -1) + 1] if 'realm' in m else 'Phàm nhân', 'Mô tả / lời tựa': m['d']}, m['id'])

# 6. nguyên liệu chung
for code, sh, dang, el in [('thao', 'VL Linh dược', 'Thảo', 'moc'), ('khoang', 'VL Khoáng sản', 'Đá', 'tho'), ('dan', 'VL Vật liệu yêu thú', 'Yêu đan', 'vo')]:
    m = G['MAT'][code]
    upsert(sh, {'ID': {'thao': 'thao_', 'khoang': 'khoang_', 'dan': 'vl_'}[code] + 'chung', 'Tên': m['n'], 'Dạng': dang, 'Hệ': el, 'Phẩm': 'Phàm phẩm', 'Vùng xuất hiện': VUNG[0],
                'Nơi kiếm': m['d'], 'Biểu tượng': m['i'], 'Dùng để luyện': 'Mọi công thức luyện chế', 'Mô tả': m['d']}, code)

# 7. linh thú (loài yêu thú)
for code, e in G['EN'].items():
    if e.get('f') != 'thu': continue
    regs = [str(i) for i, L in enumerate(G['REG_EN']) if code in L]
    upsert('LT Linh thú', {'ID': 'thu_' + code, 'Tên loài': e['nb'][0], 'Các tên gọi (cách nhau dấu phẩy)': ', '.join(e['nb']), 'Hệ có thể có': ', '.join(e['el']),
                           'Biểu tượng': e['i'], 'Khí huyết': e['hp'], 'Công': e['atk'], 'Thủ': e['def'], 'Nhịp đánh': ', '.join(e['pat']),
                           'Nơi sống': ', '.join(TYPE_N.get(p, p) for p in e['pl']), 'Vùng xuất hiện': ', '.join(regs) or '0'}, code, keycol='Tên loài')

# 8. xuất thân (kèm chuyện thơ ấu, tính tình, tâm pháp gia truyền)
PH = ['Phàm phẩm', 'Hoàng phẩm']
for o in G['ORIGIN']:
    ls = G['LS_OG'].get(o['id'], [])
    row = {'ID': 'xt_' + o['id'], 'Tên': o['n'], 'Biểu tượng': o['i'], 'Linh thạch thêm': o.get('st', 0),
           'Đan dược tặng': ', '.join(G['PILL'][p]['n'] for p in [o.get('pill'), o.get('pill2')] if p), 'Nhân quả': o.get('karma', 0), 'Tâm ma ban đầu': o.get('tamma', 0),
           'Nhập đạo muộn (năm)': o.get('age', 0), 'Mô tả ngắn (hiện khi chọn)': o['d'], 'Câu tiểu sử': o['bio'].replace('{$que}', '{que}').replace('{$quoc}', '{quoc}'),
           'Chuyện thơ ấu 1': ls[0] if ls else None, 'Chuyện thơ ấu 2': ls[1] if len(ls) > 1 else None, 'Tính tình': ', '.join(G['TT_TRAITS'].get(o['id'], [])) or None,
           'Tâm pháp gia truyền': PH[G['TP_ORIGIN'][o['id']]] if o['id'] in G['TP_ORIGIN'] else 'Không', 'Câu kể tâm pháp': G['LS_TPG'].get(o['id'])}
    row.update(fx_cols(o.get('fx', {}), 2))
    upsert('NV Xuất thân', row, o['id'])

# 9. vật nhiệm vụ có sẵn
upsert('NV Nhiệm vụ & kỳ vật', {'ID': 'nv_lenhbai_thongquan', 'Tên': 'Lệnh bài thông quan', 'Dạng': 'Lệnh bài', 'Biểu tượng': '🎫', 'Dùng trong (sự kiện / chuỗi nào)': 'Trình ở quan ải để sang vùng kế tiếp', 'Mô tả': 'Rơi từ thủ lĩnh vùng, hoặc mua ở hội đấu giá.'}, 'pass')

# chú thích màu xanh ở trang hướng dẫn
ws = wb['00 Hướng dẫn']
if not any((c.value or '').startswith('MÀU DÒNG') for c in ws['A']):
    r = ws.max_row + 2
    ws.cell(r, 1, 'MÀU DÒNG: xanh lá = món đang có sẵn trong game (ghi mã ở cột Ghi chú, đừng đổi mã) · kem = ví dụ mẫu · trắng = món mới.')
    ws.cell(r, 1).fill = GREEN
wb.save(OUT)
print('Đã thêm dòng mới:', added)
