# Sắp xếp lại docs/vat-pham.xlsx theo luật vật phẩm mới của main (phẩm = số dòng, cảnh giới cần = độ lớn,
# nội tại duy nhất, 1 ô trang sức, khí vận thay thiên phú, thể chất, chuyện thơ ấu của xuất thân).
# Chạy một lần. Chỉ số cũ của trang bị bị xóa để GPT viết lại; tên, lời tựa, phẩm, vùng được giữ.
# Dùng: python3 tools/excel_v2.py
import json, os, subprocess, sys, tempfile
import openpyxl
from openpyxl.styles import Font, PatternFill, Alignment, Border, Side
from openpyxl.worksheet.datavalidation import DataValidation
from openpyxl.utils import get_column_letter

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from excel_chung import sheet_rows, header_of, PHAM, VUNG, CG, HE

XLSX = os.path.join(ROOT, 'docs/vat-pham.xlsx')
HEAD = PatternFill('solid', fgColor='3A3226'); SEC = PatternFill('solid', fgColor='E2D3B0'); GREEN = PatternFill('solid', fgColor='DCEBD2')
WH = Font(bold=True, color='FFFFFF'); B = Font(bold=True)
thin = Side(style='thin', color='BBAA88'); BOX = Border(left=thin, right=thin, top=thin, bottom=thin)
WRAP = Alignment(wrap_text=True, vertical='top')

# ---- dữ liệu luật mới lấy thẳng từ game ----
subprocess.run(['node', os.path.join(ROOT, 'tools/build.js')], check=True, stdout=subprocess.DEVNULL)
js = r'''
const fs=require('fs'),vm=require('vm');const html=fs.readFileSync(process.argv[2],'utf8');
const a=html.indexOf('<script>')+8,b=html.indexOf('// ================= GIAO DIỆN');
const ctx=vm.createContext({console,Math,JSON,Date,performance:{now:()=>Date.now()}});vm.runInContext(html.slice(a,b),ctx);
process.stdout.write(JSON.stringify(vm.runInContext(`({RELIC_K,REL_POOL,NT_KEYS,NT_NAME,REL_M,REL_X,FXT,RELIC_UNIQUE,
 KV:Object.values(TT_DEST).map(d=>({id:d.id,n:d.name,rank:d.rank,d:d.description,fx:ttFx(d),mc:d.mc||d.tr||null})),
 TH:TT_PHYS.map(d=>({id:d.id,n:d.name,rank:d.rank,d:d.description,fx:ttFx(d)})),LS_OG,LS_TPG,LS_TR,TT_TRAITS,TP_ORIGIN,ORIGIN,TT_RANK})`,ctx)));
'''
with tempfile.NamedTemporaryFile('w', suffix='.js', delete=False) as f: f.write(js); jsf = f.name
G = json.loads(subprocess.run(['node', jsf, os.path.join(ROOT, 'phu-sinh.html')], check=True, capture_output=True, text=True).stdout); os.unlink(jsf)
KFX = {K['k']: K['fx'] for K in G['RELIC_K']}
NT = set(G['NT_KEYS']); POOL = G['REL_POOL']; M = G['REL_M']; X = G['REL_X']
COUNT = {'firstEvade', 'weakStart', 'vulnStart', 'pillSlot'}  # không nhân theo cảnh giới
def label(k):
    t = G['FXT'].get(k) or k
    return t.split(' ', 1)[1] if t[0] not in 'ABCDEFGHIJKLMNOPQRSTUVWXYZĐÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂƯƠ' and ' ' in t else t
LABEL = {'pillSlot': 'Túi đồ thêm {v} ô', 'elX': 'Pháp thuật cùng hệ món đồ mạnh thêm {v}%', 'craftP': 'Luyện chế dễ thành hơn {v}%', 'bqSafe': 'Bế quan ít bị quấy nhiễu hơn {v}%', 'bqP': 'Bế quan hiệu quả hơn {v}%'}
def lab(k): return LABEL.get(k) or label(k)

wb = openpyxl.load_workbook(XLSX)

def style_head(ws, r, n):
    for j in range(1, n + 1):
        c = ws.cell(r, j); c.font = WH; c.fill = HEAD; c.alignment = WRAP; c.border = BOX
def add_dv(ws, col_idx, first_row, lst):
    if len(lst) > 250: return
    L = get_column_letter(col_idx); d = DataValidation(type='list', formula1='"' + lst + '"', allow_blank=True)
    ws.add_data_validation(d); d.add(f'{L}{first_row}:{L}3000')
def new_sheet(title, idx, cols, note, widths=None):
    if title in wb.sheetnames: del wb[title]
    ws = wb.create_sheet(title, idx)
    ws.cell(1, 1, note).font = Font(italic=True, color='6B5B3E'); ws.cell(1, 1).alignment = WRAP
    ws.merge_cells(start_row=1, start_column=1, end_row=1, end_column=len(cols)); ws.row_dimensions[1].height = 62
    for j, c in enumerate(cols, 1): ws.cell(2, j, c)
    style_head(ws, 2, len(cols)); ws.freeze_panes = 'C3'
    for j, c in enumerate(cols, 1):
        ws.column_dimensions[get_column_letter(j)].width = (widths or {}).get(c, 13 if len(c) < 12 else len(c) + 1)
    return ws

# ================= 1. TRANG BỊ & VẬT TÙY THÂN =================
EQ_COLS = ['ID', 'Tên', 'Dạng', 'Hệ', 'Phẩm', 'Vùng xuất hiện', 'Cảnh giới cần', 'Độc nhất', 'Biểu tượng',
           'Gốc 1', 'Số gốc 1', 'Gốc 2', 'Số gốc 2', 'Gốc 3', 'Số gốc 3',
           'Phụ 1', 'Số phụ 1', 'Phụ 2', 'Số phụ 2', 'Phụ 3', 'Số phụ 3', 'Phụ 4', 'Số phụ 4',
           'Nội tại thêm', 'Số nội tại thêm', 'Mô tả / lời tựa', 'Nguồn gặp', 'Ghi chú']
EQ_W = {'ID': 20, 'Tên': 24, 'Mô tả / lời tựa': 60, 'Nguồn gặp': 18, 'Ghi chú': 30}
EQ_NOTE = ('LUẬT MỚI. Phẩm quyết định SỐ DÒNG, Cảnh giới cần quyết định ĐỘ LỚN. '
           'Gốc: đúng các mã gốc của Dạng (xem trang 02, bảng A). Phụ: đúng số dòng theo phẩm (Phàm 0 · Hoàng 1 · Huyền 1 · Địa 2 · Thiên 2 · Tiên 3 · Thần 4), mã chọn trong 13 mã phụ (bảng B), không trùng mã gốc. '
           'Nội tại thêm: chỉ đồ Độc nhất mà Dạng chưa có nội tại mới được thêm 1 (bảng C); mỗi món tối đa 1 nội tại. '
           'Ghi số người chơi sẽ thấy ở đúng Cảnh giới cần (= số gốc × hệ số cảnh giới, lệch được ±25%; đồ Độc nhất tới +40%).')
EQ_TITLES = {'TB Nhẫn': 'TB Trang sức'}
DANG_OF = {}
for ws in list(wb.worksheets):
    if not (ws.title.startswith('TB ') or ws.title.startswith('VT ')) or ws.title in ('TB Tên ghép', 'VT Phương tiện'): continue
    hr, hdr = header_of(ws)
    dv_dang = None
    for dv in ws.data_validations.dataValidation:
        col = str(dv.sqref).split(':')[0].rstrip('0123456789')
        if hdr[openpyxl.utils.column_index_from_string(col) - 1] == 'Dạng': dv_dang = dv.formula1.strip('"')
    rows = list(sheet_rows(ws)); idx = wb.sheetnames.index(ws.title); title = EQ_TITLES.get(ws.title, ws.title)
    del wb[ws.title]
    nw = new_sheet(title, idx, EQ_COLS, EQ_NOTE, EQ_W)
    for i, (_, d) in enumerate(rows, 3):
        old = 'Có trong game' in str(d.get('Ghi chú') or '')
        keep = {'ID': d.get('ID'), 'Tên': d.get('Tên'), 'Dạng': d.get('Dạng'), 'Hệ': d.get('Hệ'), 'Phẩm': d.get('Phẩm'), 'Vùng xuất hiện': d.get('Vùng xuất hiện'),
                'Độc nhất': d.get('Độc nhất'), 'Biểu tượng': d.get('Biểu tượng'), 'Mô tả / lời tựa': d.get('Mô tả / lời tựa'), 'Nguồn gặp': d.get('Nguồn gặp'), 'Ghi chú': d.get('Ghi chú')}
        if old:  # đồ độc nhất cũ: game vẫn tính theo luật cũ, ghi lại đúng số đang có
            j = 1
            for n in range(1, 5):
                k = d.get(f'Chỉ số {n}')
                if k: keep[f'Gốc {j}'] = k; keep[f'Số gốc {j}'] = d.get(f'Giá trị {n}'); j += 1
            keep['Cảnh giới cần'] = 'Phàm nhân'
            keep['Ghi chú'] = (d.get('Ghi chú') or '') + ' · game vẫn tính món này theo luật cũ (nhân theo vùng)'
        for k, v in keep.items():
            if v not in (None, ''): nw.cell(i, EQ_COLS.index(k) + 1, v)
        for j in range(1, len(EQ_COLS) + 1):
            c = nw.cell(i, j); c.alignment = WRAP; c.border = BOX
            if old: c.fill = GREEN
    for col, lst in [('Hệ', ','.join(HE)), ('Phẩm', ','.join(PHAM)), ('Vùng xuất hiện', ','.join(VUNG)), ('Cảnh giới cần', ','.join(CG)), ('Độc nhất', 'Có,Không')] + ([('Dạng', dv_dang)] if dv_dang else []):
        add_dv(nw, EQ_COLS.index(col) + 1, 3, lst)
    add_dv(nw, EQ_COLS.index('Nội tại thêm') + 1, 3, ','.join(sorted(NT)))
    for n in range(1, 5): add_dv(nw, EQ_COLS.index(f'Phụ {n}') + 1, 3, ','.join(POOL))

# ================= 2. BẢNG CHỈ SỐ =================
DANG = {}
from excel_chung import DANG_K
for d, k in DANG_K.items(): DANG.setdefault(k, []).append(d)
ws = wb['02 Bảng chỉ số']; idx = wb.sheetnames.index(ws.title); del wb[ws.title]
ws = wb.create_sheet('02 Bảng chỉ số', idx)
r = 1
def title(t):
    global r
    ws.cell(r, 1, t).font = Font(bold=True, size=12); ws.cell(r, 1).fill = SEC; r += 1
def table(cols, rows):
    global r
    for j, c in enumerate(cols, 1): ws.cell(r, j, c)
    style_head(ws, r, len(cols)); r += 1
    for row in rows:
        for j, v in enumerate(row, 1):
            c = ws.cell(r, j, v); c.alignment = WRAP; c.border = BOX
        r += 1
    r += 1
CGH = CG
title('Hệ số theo Cảnh giới cần: số người chơi thấy = số gốc × hệ số (riêng nội tại dạng đếm: né đòn, suy nhược, phá giáp, thêm ô túi đồ thì KHÔNG nhân)')
table(['Cảnh giới cần'] + CGH, [['Hệ số'] + M])
title('Số dòng theo Phẩm: 1 nhóm gốc (theo Dạng) + số dòng phụ dưới đây')
table(['Phẩm'] + PHAM, [['Số dòng phụ'] + X])
title('A. Mã gốc theo Dạng (số gốc ở mức Phàm nhân; các cột sau đã nhân sẵn theo cảnh giới)')
rows = []
for k, fx in KFX.items():
    if k not in DANG: continue
    for key, v in fx.items():
        cnt = key in COUNT
        rows.append([', '.join(DANG[k]), key, lab(key).replace('{v}', '…'), 'Nội tại: ' + G['NT_NAME'][key] if key in NT else ''] + [v if cnt else (round(v * m, 2) if key == 'poisonHit' else max(1, round(v * m))) for m in M])
table(['Dạng', 'Mã gốc', 'Ý nghĩa', 'Nội tại?'] + CGH, rows)
title('B. 13 mã dòng phụ (số gốc ở mức Phàm nhân và đã nhân theo cảnh giới)')
table(['Mã phụ', 'Ý nghĩa'] + CGH, [[k, lab(k).replace('{v}', '…')] + [max(1, round(v * m)) for m in M] for k, v in POOL.items()])
title('C. Nội tại: duy nhất, mặc nhiều món cùng nội tại chỉ tính món mạnh nhất. Mỗi món tối đa 1 nội tại.')
NT_BASE = {'firstEvade': 1, 'startBlock': 12, 'blockTurn': 4, 'weakStart': 1, 'vulnStart': 1, 'poisonHit': 0.15, 'stunP': 8, 'reflect': 15, 'execute': 20, 'drain': 8, 'regenHp': 3, 'regenMp': 6,
           'healAfter': 10, 'hoTam': 6, 'pillP': 30, 'stonesP': 20, 'pillSlot': 2, 'shopP': 8, 'tammaRes': 30, 'elX': 20, 'craftP': 6, 'bqSafe': 15, 'bqP': 8}
table(['Mã nội tại', 'Tên nội tại', 'Ý nghĩa', 'Số gốc (Phàm nhân)', 'Nhân theo cảnh giới?'],
      [[k, G['NT_NAME'][k], lab(k).replace('{v}', '…'), NT_BASE.get(k, ''), 'Không (dạng đếm)' if k in COUNT else 'Có'] for k in G['NT_KEYS']])
title('Mã cho xuất thân (chỉ số cộng thẳng, không nhân): atkP matkP defP hpP mpP crit critDmg dodge tp ngo tam van tvP lifeP shopP tammaRes execute regenHp bqP chkP poisonImm burnHit "elP <hệ>"')
ws.column_dimensions['A'].width = 34; ws.column_dimensions['B'].width = 14; ws.column_dimensions['C'].width = 44
for j in range(4, 12): ws.column_dimensions[get_column_letter(j)].width = 12

# ================= 3. BỎ THIÊN PHÚ, THÊM KHÍ VẬN, THỂ CHẤT =================
if 'NV Thiên phú' in wb.sheetnames: del wb['NV Thiên phú']
def fxcells(fx, n):
    out = []
    for k, v in fx.items():
        if k == 'elP':
            for e, x in v.items(): out += ['elP ' + e, x]
        else: out += [k, v]
    out = out[:2 * n]; return out + [None] * (2 * n - len(out))
KV_COLS = ['ID', 'Tên', 'Bậc', 'Mô tả', 'Chỉ số 1', 'Số 1', 'Chỉ số 2', 'Số 2', 'Chỉ số 3', 'Số 3', 'Chỉ số 4', 'Số 4', 'Chỉ số 5', 'Số 5', 'Câu kể mở đầu', 'Tính tình', 'Ghi chú']
ws = new_sheet('NV Khí vận', len(wb.sheetnames), KV_COLS, 'Tiên thiên khí vận (thay cho thiên phú/mệnh cách). Lúc đầu thai rút 1–3 cái theo bậc. Hiện CHỈ ĐỂ TRA: dữ liệu có sẵn trong game, chưa đưa từ Excel vào game.', {'Tên': 24, 'Mô tả': 50, 'Câu kể mở đầu': 50, 'ID': 22})
for i, d in enumerate(sorted(G['KV'], key=lambda x: (x['rank'], x['n'])), 3):
    row = [d['id'], d['n'], G['TT_RANK'][d['rank']], d['d']] + fxcells(d['fx'], 5) + [G['LS_TR'].get(d['mc'] or '', None), ', '.join(G['TT_TRAITS'].get(d['mc'] or '', [])) or None, 'Có trong game · mã: ' + d['id']]
    for j, v in enumerate(row, 1):
        c = ws.cell(i, j, v); c.fill = GREEN; c.alignment = WRAP; c.border = BOX
TH_COLS = ['ID', 'Tên', 'Bậc', 'Mô tả', 'Chỉ số 1', 'Số 1', 'Chỉ số 2', 'Số 2', 'Chỉ số 3', 'Số 3', 'Chỉ số 4', 'Số 4', 'Chỉ số 5', 'Số 5', 'Ghi chú']
ws = new_sheet('NV Thể chất', len(wb.sheetnames), TH_COLS, 'Thể chất tiên thiên: game tự suy ra từ linh căn, khí vận, chính tà và tính tình. Hiện CHỈ ĐỂ TRA: dữ liệu có sẵn trong game.', {'Tên': 24, 'Mô tả': 60, 'ID': 22})
for i, d in enumerate(sorted(G['TH'], key=lambda x: (x['rank'], x['n'])), 3):
    row = [d['id'], d['n'], G['TT_RANK'][d['rank']], d['d']] + fxcells(d['fx'], 5) + ['Có trong game · mã: ' + d['id']]
    for j, v in enumerate(row, 1):
        c = ws.cell(i, j, v); c.fill = GREEN; c.alignment = WRAP; c.border = BOX

# ================= 4. XUẤT THÂN: chuyện thơ ấu, tính tình, tâm pháp gia truyền =================
ws = wb['NV Xuất thân']; hr, hdr = header_of(ws)
NEW = ['Chuyện thơ ấu 1', 'Chuyện thơ ấu 2', 'Tính tình', 'Tâm pháp gia truyền', 'Câu kể tâm pháp']
if NEW[0] not in hdr:
    at = hdr.index('Ghi chú') + 1
    ws.insert_cols(at, len(NEW))
    for j, c in enumerate(NEW): ws.cell(hr, at + j, c)
    style_head(ws, hr, len(hdr) + len(NEW))
    hdr = [ws.cell(hr, j).value for j in range(1, ws.max_column + 1)]
    for j, c in enumerate(NEW): ws.column_dimensions[get_column_letter(at + j)].width = 50 if 'Chuyện' in c or 'Câu' in c else 18
TINH = ['Bảo thủ', 'Chính trực', 'Cuồng tà', 'Căm thù', 'Hiếu chiến', 'Hào sảng', 'Lạnh lùng', 'Nhân hậu', 'Quái gở', 'Sát phạt', 'Thông tuệ', 'Thận trọng', 'Thực dụng', 'Tàn nhẫn', 'Tự do', 'Độc ác', 'Thâm độc', 'Vị kỷ']
add_dv(ws, hdr.index('Tâm pháp gia truyền') + 1, hr + 1, 'Không,Phàm phẩm,Hoàng phẩm')
OG = {o['id']: o for o in G['ORIGIN']}
for i, d in sheet_rows(ws):
    note = str(d.get('Ghi chú') or '')
    if 'mã: ' not in note: continue
    code = note.split('mã: ')[1].split()[0]
    og = OG.get(code)
    if not og: continue
    ls = G['LS_OG'].get(code, [])
    vals = {'Chuyện thơ ấu 1': ls[0] if ls else None, 'Chuyện thơ ấu 2': ls[1] if len(ls) > 1 else None, 'Tính tình': ', '.join(G['TT_TRAITS'].get(code, [])) or None,
            'Tâm pháp gia truyền': PHAM[G['TP_ORIGIN'][code]] if code in G['TP_ORIGIN'] else 'Không', 'Câu kể tâm pháp': G['LS_TPG'].get(code), 'Mô tả ngắn (hiện khi chọn)': og['d']}
    for k, v in vals.items():
        c = ws.cell(i, hdr.index(k) + 1, v); c.fill = GREEN; c.alignment = WRAP; c.border = BOX
ws.cell(1, 1).value = ('Câu tiểu sử nối sau tên nhân vật. Chuyện thơ ấu: 2 câu cho trang mở đầu kiếp, dùng {ten} (tên), {que} (quê), {ho} (họ). '
                       'Tính tình: 1–2 giá trị trong: ' + ', '.join(TINH) + ' (dùng để xét thể chất). Tâm pháp gia truyền: Không / Phàm phẩm / Hoàng phẩm; '
                       'nếu có thì Câu kể tâm pháp dùng {ten}, {n} (tên tâm pháp), {ho}. Linh thạch thêm: -10 đến 70. Nhân quả: -10 đến +10.')

# ================= 5. DANH MỤC, HƯỚNG DẪN =================
ws = wb['01 Danh mục']; hr, hdr = header_of(ws)
rows = [[ws.cell(i, j).value for j in range(1, 7)] for i in range(hr + 1, ws.max_row + 1) if ws.cell(i, 1).value]
fixed = []
for row in rows:
    if row[0] == 'NV Thiên phú': continue
    if row[0] == 'TB Nhẫn': row = ['TB Trang sức', 'Trang bị (1 ô)', 'Trang sức: nhẫn, ban chỉ', 'nhan_', row[4], row[5]]
    if row[0] == 'TB Pháp bảo': row[1] = 'Pháp bảo (3 ô, mở ở Trúc Cơ, Kết Đan, Nguyên Anh)'
    fixed.append(row)
fixed += [['NV Khí vận', 'Nhân vật', 'Tiên thiên khí vận (thay thiên phú), 6 bậc', 'kv_', len(G['KV']), 'Chỉ để tra'],
          ['NV Thể chất', 'Nhân vật', 'Thể chất tiên thiên, game tự suy ra', 'tc_', len(G['TH']), 'Chỉ để tra']]
for i in range(hr + 1, ws.max_row + 1):
    for j in range(1, 7): ws.cell(i, j).value = None
for i, row in enumerate(fixed, hr + 1):
    for j, v in enumerate(row, 1):
        c = ws.cell(i, j, v); c.alignment = WRAP; c.border = BOX

ws = wb['00 Hướng dẫn']
for i in range(1, ws.max_row + 1):
    v = ws.cell(i, 1).value or ''
    if v.startswith('Phàm phẩm → Hoàng phẩm'):
        ws.cell(i, 1).value = ('Phàm phẩm → Hoàng → Huyền → Địa → Thiên → Tiên → Thần phẩm. LUẬT MỚI CHO TRANG BỊ: phẩm quyết định SỐ DÒNG chỉ số, '
                               'Cảnh giới cần (Phàm nhân → Độ Kiếp) quyết định ĐỘ LỚN. Phẩm nào cũng gặp được ở mọi cảnh giới. Đan dược và công pháp vẫn như cũ.')
    if v.startswith('Luyện Khí (vùng 0'):
        ws.cell(i, 1).value = ('Nhân vật bắt đầu là Phàm nhân, dẫn khí nhập thể lên Luyện Khí. Vùng 0 Phàm Trần → 1 Linh Sơn Vạn Lĩnh → 2 Đông Hải Yêu Vực → 3 Cửu U Ma Vực → 4 Cửu Thiên Cổ Lộ. '
                               'Cảnh giới cần của trang bị theo vùng: vùng 0 → Phàm nhân/Luyện Khí, vùng 1 → Luyện Khí/Trúc Cơ, vùng 2 → Trúc Cơ/Kết Đan, vùng 3 → Kết Đan/Nguyên Anh, vùng 4 → Nguyên Anh/Hóa Thần.')

wb.save(XLSX)
print('Đã sắp xếp lại', XLSX, '| trang:', len(wb.sheetnames))
