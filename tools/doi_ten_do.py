# Đổi các tên đồ có đuôi như câu thơ ("Quyền Sáo Đếm Hộ Người Xa") thành tên ngắn đúng kiểu đồ vật.
# Sửa thẳng docs/vat-pham.xlsx, đổi đồng loạt ở mọi trang nếu tên đó xuất hiện chỗ khác. Chạy lại không làm gì thêm.
import openpyxl, hashlib, sys
X = 'docs/vat-pham.xlsx'
CLAUSES = ['Trả Về Bến Cũ','Đếm Hộ Người Xa','Vén Một Góc Rèm','Gói Trong Vạt Áo','Chừa Một Đường Khâu','Giấu Một Lời Dặn',
 'Quên Cất Vào Nhà','Đi Qua Chỗ Gió Lùa','Nghe Thấy Tiếng Về','Nhặt Sau Hồi Mõ','Tìm Về Qua Mưa','Giữ Chỗ Bên Hiên',
 'Đợi Sau Canh','Nhớ Ngày Đóng Cửa','Cất Một Tiếng Thở','Giữ Hơi Tay Cũ','Chưa Kịp Qua Cầu','Mượn Đỡ Một Đêm',
 'Chôn Cạnh Mái Nhà','Chừa Nửa Bát Cơm','Bỏ Quên Dưới Mành','Gọi Về Từ Ngõ','Đỡ Lấy Mùa Rét','Để Lại Bên Bếp',
 'Dành Phần Người Vắng','Qua Cửa Khi Trời Tối','Chờ Đến Tàn Đèn','Đem Trả Hôm Sau','Rời Tay Lúc Rạng Đông',
 'Đợi Chân Người Về','Đem Theo Khi Xuống Núi','Giữ Dấu Chân Sau','Cất Vào Ngày Mưa','Không Đề Tên',
 'Rơi Trong Lần Chia Tay','Chờ Thuyền Đón','Chôn Dưới Thềm','Đưa Qua Mấy Bận Đò','Để Dành Đến Sáng']
POOL = ['Thanh Sương','Hàn Ngọc','Cổ Mộc','Huyền Thiết','Bạch Lộ','Xích Hỏa','Thạch Tâm','Vân Văn','Nguyệt Ảnh','Tuyết Linh',
 'Phong Vũ','Lôi Văn','Thanh Đồng','Tử Trúc','Hắc Thạch','Kim Tuyến','Thu Thủy','Hà Quang','Minh Châu','Tàn Dương','Mộc Tâm',
 'Sa Liên','Cốt Văn','Ngân Hà','Đan Sa','Tinh Sa','Lam Điện','Thiên Ti','Lưu Ly','Ô Kim','Thanh Phong','Hồng Diệp','Ngọc Lộ',
 'Cửu Văn','Huyết Tuyến','Trầm Hương','Mặc Ngọc','Thúy Vũ','Bích Ba','Lạc Hà','Hàn Tinh','Long Lân','Linh Đằng','Ngọc Tủy',
 'Xuân Sinh','Thu Sương','Đông Tàng','Hạ Viêm','Ảnh Nguyệt','Phi Vũ','Thanh Liên','Tử Hà','Bạch Ngọc','Huyền Quang','Thiên Mộc',
 'Địa Văn','Hoàng Sa','Thương Lan','Bạch Hạc','Chu Tước','Huyền Quy','Thanh Long','Tuyết Diệp','Liệt Diễm','Cô Nguyệt','Đạm Mặc']
wb = openpyxl.load_workbook(X)
allnames = set()
for ws in wb:
    for row in ws.iter_rows():
        for c in row:
            if isinstance(c.value, str): allnames.add(c.value.strip())
ren = {}
for ws in wb:
    if ws.title[:2] not in ('TB','VT') or 'Tên ghép' in ws.title: continue
    for r in range(1, ws.max_row + 1):
        v = ws.cell(r, 2).value
        if not isinstance(v, str): continue
        for cl in CLAUSES:
            if v.endswith(' ' + cl):
                base = v[:-len(cl) - 1]
                h = int(hashlib.md5(v.encode()).hexdigest(), 16)
                for k in range(len(POOL)):
                    d = POOL[(h + k) % len(POOL)]
                    cand = base + ' ' + d
                    if cand not in allnames and cand not in ren.values():
                        ren[v] = cand; break
                break
print('đổi', len(ren), 'tên')
n = 0
for ws in wb:
    for row in ws.iter_rows():
        for c in row:
            if isinstance(c.value, str):
                s = c.value
                for o, nw in ren.items():
                    if o in s: s = s.replace(o, nw)
                if s != c.value: c.value = s; n += 1
print('ô được sửa', n)
wb.save(X)
open('docs/doi-ten-do.txt', 'w', encoding='utf8').write('\n'.join(f'{o} -> {nw}' for o, nw in ren.items()) + '\n')
