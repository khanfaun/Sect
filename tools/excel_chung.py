# Bảng tra dùng chung cho các công cụ đọc/ghi Excel vật phẩm.

PHAM = ['Phàm phẩm', 'Hoàng phẩm', 'Huyền phẩm', 'Địa phẩm', 'Thiên phẩm', 'Tiên phẩm', 'Thần phẩm']
VUNG = ['0 Phàm Trần', '1 Linh Sơn', '2 Đông Hải', '3 Ma Vực', '4 Cổ Lộ']
CG = ['Phàm nhân', 'Luyện Khí', 'Trúc Cơ', 'Kết Đan', 'Nguyên Anh', 'Hóa Thần', 'Độ Kiếp']
HE = ['kim', 'moc', 'thuy', 'hoa', 'tho', 'loi', 'bang', 'phong', 'am', 'phat', 'vo']

# Dạng ghi trong Excel → loại món trong game (quyết định ô mặc và ảnh)
DANG_K = {
    'Kiếm': 'kiem', 'Đao': 'dao', 'Pháp trượng': 'phap', 'Phất trần': 'phap', 'Bảo châu': 'phap', 'Bút': 'but',
    'Quan': 'non', 'Đấu lạp': 'non', 'Ngọc quan': 'non', 'Trâm': 'tram', 'Thoa': 'tram', 'Bộ diêu': 'tram',
    'Ngọc bội': 'boi', 'Ngọc quyết': 'boi', 'Ngọc bài': 'boi', 'Hộ tâm phù': 'hotam', 'Hộ tâm ngọc': 'hotam', 'Hộ tâm kính': 'hotam',
    'Hộ thủ': 'gang', 'Quyền sáo': 'gang', 'Thủ giáp': 'gang', 'Hoàn': 'hoan', 'Thủ trạc': 'hoan',
    'Giáp': 'giap', 'Nhuyễn giáp': 'giap', 'Đạo bào': 'bao', 'Pháp y': 'bao', 'Phi phong': 'bao',
    'Nhẫn': 'nhan', 'Ban chỉ': 'nhan', 'Đai': 'dai', 'Ngọc đái': 'dai', 'Yêu đái': 'dai',
    'Ngoa': 'ngoa', 'Vân hài': 'ngoa', 'Đạp vân ngoa': 'ngoa',
    'Chuông': 'linh', 'Khánh': 'linh', 'Phiên': 'phien', 'Cờ lệnh': 'phien', 'Châu': 'chau', 'Kính': 'kinh', 'Ngọc giản': 'gian',
    'Ấn': 'an', 'Hồ lô': 'holo', 'Tịnh bình': 'holo', 'Tháp': 'thap', 'Tán': 'tan', 'Cầm': 'cam', 'Địch': 'cam', 'Tiêu': 'cam',
    'Xích': 'xich', 'Khổn tiên thằng': 'xich', 'Lệnh bài': 'lenh', 'Đăng': 'dang', 'Yêu nha': 'cot', 'Thú cốt': 'cot',
    'Huyết ngọc': 'huyet', 'Hộ mệnh phù': 'phu', 'Kiếm hạp': 'hap',
    'Càn khôn đại': 'tui', 'Trữ vật đại': 'tui', 'Trữ vật giới': 'tui',
    'Hỏa chủng': 'hoa', 'Địa tâm hỏa': 'hoa', 'Linh hỏa': 'hoa', 'Thú hỏa': 'hoa',
    'Đỉnh': 'dinh', 'Đan lô': 'dinh', 'Lư hương': 'dinh', 'Trận bàn': 'tran', 'Trận kỳ': 'tran', 'Trận đồ': 'tran',
}
_PB = ['linh', 'phien', 'chau', 'kinh', 'gian', 'an', 'holo', 'thap', 'tan', 'cam', 'xich', 'lenh', 'dang', 'cot', 'huyet', 'phu', 'hap']
K_SHEET = {'kiem': ('TB Vũ khí', 'vk_'), 'dao': ('TB Vũ khí', 'vk_'), 'phap': ('TB Vũ khí', 'vk_'), 'but': ('TB Vũ khí', 'vk_'),
           'non': ('TB Nón', 'non_'), 'tram': ('TB Nón', 'non_'), 'boi': ('TB Ngọc bội', 'boi_'), 'hotam': ('TB Ngọc bội', 'boi_'),
           'gang': ('TB Găng', 'gang_'), 'hoan': ('TB Găng', 'gang_'), 'giap': ('TB Giáp', 'giap_'), 'bao': ('TB Áo choàng', 'ao_'),
           'nhan': ('TB Trang sức', 'nhan_'), 'dai': ('TB Đai lưng', 'dai_'), 'ngoa': ('TB Giày', 'giay_'),
           'tui': ('VT Trữ vật', 'tui_'), 'hoa': ('VT Hỏa chủng', 'hoa_'), 'dinh': ('VT Lô đỉnh', 'dinh_'), 'tran': ('VT Trận pháp', 'tran_')}
for _k in _PB: K_SHEET[_k] = ('TB Pháp bảo', 'pb_')
EQ_SHEETS = sorted({v[0] for v in K_SHEET.values()})

TYPE_N = {'tran': 'thôn trấn', 'thanh': 'thành trì', 'rung': 'rừng sâu', 'nui': 'núi non', 'song': 'sông hồ', 'phe': 'phế tích', 'dong': 'hang động',
          'tong': 'sơn môn', 'bien': 'biển khơi', 'hoang': 'hoang nguyên', 'ma': 'ma địa', 'thien': 'thiên lộ',
          'linhdia': 'phúc địa', 'khoang': 'mỏ linh khoáng', 'duoc': 'dược cốc', 'cho': 'chợ phiên tu sĩ', 'ancu': 'thảo lư ẩn sĩ', 'dam': 'đầm lầy'}
N_TYPE = {v: k for k, v in TYPE_N.items()}


def header_of(ws):
    """Trả về (số dòng tiêu đề, danh sách tên cột). Dòng tiêu đề là dòng đầu có ô 'ID'/'Loại'/'Mã'/'Trang'."""
    for i in range(1, 4):
        v = ws.cell(i, 1).value
        if v in ('ID', 'Loại', 'Mã', 'Trang'):
            return i, [ws.cell(i, j).value for j in range(1, ws.max_column + 1)]
    raise ValueError('Không thấy dòng tiêu đề ở trang ' + ws.title)


def sheet_rows(ws):
    """Lặp các dòng dữ liệu: (số dòng Excel, dict cột → giá trị)."""
    hr, hdr = header_of(ws)
    for i in range(hr + 1, ws.max_row + 1):
        vals = [ws.cell(i, j).value for j in range(1, len(hdr) + 1)]
        if any(v not in (None, '') for v in vals):
            yield i, {h: (v.strip() if isinstance(v, str) else v) for h, v in zip(hdr, vals) if h}
