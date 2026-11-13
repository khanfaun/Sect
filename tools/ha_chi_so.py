# Nhân đều chỉ số trang bị viết sẵn trong docs/vat-pham.xlsx với một hệ số (mặc định 0.9 = hạ 10%).
# Không đụng dòng xanh (đồ có sẵn trong game), dòng âm, và nội tại dạng đếm (né đòn, suy nhược, phá giáp, thêm ô túi).
# Dùng: python3 tools/ha_chi_so.py [hệ_số]
import os, sys
import openpyxl
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from excel_chung import sheet_rows, header_of, EQ_SHEETS

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
XLSX = os.path.join(ROOT, 'docs/vat-pham.xlsx')
F = float(sys.argv[1]) if len(sys.argv) > 1 else 0.9
COUNT = {'firstEvade', 'weakStart', 'vulnStart', 'pillSlot'}
POINT = {'tp', 'ngo', 'tam', 'van'}
PAIRS = [('Gốc 1', 'Số gốc 1'), ('Gốc 2', 'Số gốc 2'), ('Gốc 3', 'Số gốc 3'), ('Phụ 1', 'Số phụ 1'), ('Phụ 2', 'Số phụ 2'),
         ('Phụ 3', 'Số phụ 3'), ('Phụ 4', 'Số phụ 4'), ('Nội tại thêm', 'Số nội tại thêm')]

wb = openpyxl.load_workbook(XLSX)
n = 0
for sh in EQ_SHEETS:
    ws = wb[sh]; hr, h = header_of(ws)
    for i, d in sheet_rows(ws):
        if 'Có trong game' in str(d.get('Ghi chú') or ''): continue
        for kc, vc in PAIRS:
            k, v = d.get(kc), d.get(vc)
            if not k or not isinstance(v, (int, float)) or v <= 0 or k in COUNT: continue
            x = v * F
            x = max(1, round(x)) if k in POINT else round(x, 2) if k == 'poisonHit' else round(x, 1)
            if x != v: ws.cell(i, h.index(vc) + 1, x); n += 1
wb.save(XLSX)
print(f'Đã nhân {n} ô với {F}')
