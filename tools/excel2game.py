# Chuyển Excel danh mục (docs/vat-pham.xlsx) thành dữ liệu game (src/game/data/01-catalog-du-lieu.js).
# Kiểm tra lỗi từng dòng; dòng lỗi nặng bị bỏ qua, lỗi nhẹ được sửa và ghi vào báo cáo
# docs/bao-cao-vat-pham.md.
# Dùng: python3 tools/excel2game.py   (rồi node tools/build.js)
import json, os, re, sys, collections
import openpyxl

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from excel_chung import DANG_K, K_SHEET, EQ_SHEETS, PHAM, VUNG, CG, HE, N_TYPE, sheet_rows

XLSX = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ROOT, 'docs/vat-pham.xlsx')
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ROOT, 'src/game/data/01-catalog-du-lieu.js')
REPORT = sys.argv[3] if len(sys.argv) > 3 else os.path.join(ROOT, 'docs/bao-cao-vat-pham.md')

EQ_FX = set('lifeP atkP matkP defP hpP mpP crit critDmg dodge tp ngo tam van tvP regenHp regenMp startBlock blockTurn reflect poisonHit stunP elX pillP mpCost shopP stonesP lifeP drain execute healAfter firstEvade weakStart vulnStart pillSlot tammaRes hoTam craftP bqSafe bqP'.split())
TRAIT_FX = EQ_FX | {'burnHit', 'chkP', 'poisonImm'}
ART_FX = EQ_FX | {'than', 'rageTurn', 'moveP', 'atkStage', 'hpStage', 'defStage', 'matkStage'}
SK_FX = {'p', 'h', 'pierce', 'crit', 'poison', 'burn', 'stun', 'weak', 'vuln', 'drain', 'heal', 'regen', 'block', 'evade', 'rage', 'selfHp', 'cleanse', 'bonusIf'}
PAT = {'atk', 'multi', 'charge', 'heavy', 'poison', 'drain', 'block', 'rage', 'weak', 'vuln', 'heal', 'burn'}
# trần cho trang bị (con số người chơi thấy) theo phẩm Thần
CAP = {'crit': 20, 'tp': 12, 'regenHp': 6, 'regenMp': 12, 'startBlock': 30, 'drain': 20, 'tammaRes': 60, 'firstEvade': 3, 'weakStart': 3, 'vulnStart': 3, 'pillSlot': 4, 'tvP': 80, 'bqP': 80}
# GPT đã tăng số công pháp/tâm pháp theo phẩm; game cũng tự nhân theo phẩm → quy về mức gốc
ART_NORM = [0.7, 1, 1.12, 1.27, 1.46, 1.69, 1.87]

msgs = collections.defaultdict(list)   # trang → [(dòng, mức, nội dung)]
def warn(sh, row, t): msgs[sh].append((row, 'sửa', t))
def err(sh, row, t): msgs[sh].append((row, 'BỎ', t))

def num(v):
    if v is None or v == '': return None
    if isinstance(v, (int, float)): return v
    try: return float(str(v).replace(',', '.'))
    except ValueError: return None

def code_of(d):
    m = re.search(r'mã:\s*([\w:]+)', str(d.get('Ghi chú') or ''))
    return m.group(1) if m else None

def idx(lst, v, sh, row, col, default=0):
    if v in lst: return lst.index(v)
    warn(sh, row, f'{col} "{v}" không hợp lệ, dùng "{lst[default]}"'); return default

def region_of(v):
    if v is None: return 0
    m = re.match(r'\s*(\d)', str(v)); return int(m.group(1)) if m else 0

def realm_of(v):  # "Cảnh giới cần" → chỉ số cảnh giới trong game (0 = Luyện Khí)
    return max(0, CG.index(v) - 1) if v in CG else 0

def fx_from(d, sh, row, allowed, ncol, kcol='Chỉ số {}', vcol='Giá trị {}', cap=True):
    fx = {}
    for i in range(1, ncol + 1):
        k, v = d.get(kcol.format(i)), num(d.get(vcol.format(i)))
        if not k: continue
        if v is None: warn(sh, row, f'chỉ số {k} không có số, bỏ'); continue
        m = re.match(r'elP\s+(\w+)', k)
        if m:
            if m.group(1) not in HE: warn(sh, row, f'hệ {m.group(1)} lạ'); continue
            fx.setdefault('elP', {})[m.group(1)] = v; continue
        if k not in allowed: warn(sh, row, f'mã chỉ số lạ "{k}", bỏ'); continue
        if cap and k in CAP and v > CAP[k]: warn(sh, row, f'{k} {v} vượt trần, hạ về {CAP[k]}'); v = CAP[k]
        fx[k] = fx.get(k, 0) + v
    return fx

wb = openpyxl.load_workbook(XLSX, data_only=True)
C = {'relics': [], 'pre': {}, 'base': {}, 'skills': [], 'arts': [], 'pills': [], 'mounts': [], 'mats': [], 'beasts': [], 'origins': [], 'qitems': []}
seen_id = {}

def take_id(d, sh, row):
    i = d.get('ID')
    if not i: err(sh, row, 'thiếu ID'); return None
    if not re.fullmatch(r'[a-z0-9_]+', i): warn(sh, row, f'ID "{i}" có ký tự lạ')
    if i in seen_id: err(sh, row, f'ID trùng với {seen_id[i]}'); return None
    seen_id[i] = f'{sh} dòng {row}'; return i

# ---------- trang bị và vật tùy thân (luật mới: phẩm = số dòng, cảnh giới cần = độ lớn) ----------
REL_X = [0, 1, 1, 2, 2, 3, 4]
POOL = set('atkP matkP defP hpP mpP tp crit critDmg dodge van tam ngo tvP'.split())
NT = set('firstEvade startBlock blockTurn weakStart vulnStart poisonHit stunP reflect execute drain regenHp regenMp healAfter hoTam pillP stonesP pillSlot shopP tammaRes elX craftP bqSafe bqP'.split())
KFX = {'kiem': ['atkP'], 'dao': ['atkP', 'crit', 'critDmg'], 'hotam': ['hoTam', 'defP'], 'phap': ['matkP'], 'giap': ['defP'], 'bao': ['hpP'], 'boi': ['mpP'], 'ngoa': ['tp', 'dodge'],
       'linh': ['startBlock'], 'hoan': ['regenMp'], 'dinh': ['pillP'], 'phien': ['poisonHit'], 'chau': ['regenHp'], 'kinh': ['reflect'], 'gian': ['tvP'], 'an': ['stunP'], 'tram': ['dodge'],
       'holo': ['healAfter'], 'thap': ['defP', 'blockTurn'], 'tan': ['firstEvade'], 'cam': ['weakStart'], 'xich': ['vulnStart'], 'but': ['ngo'], 'tui': ['stonesP', 'pillSlot'],
       'nhan': ['van', 'crit', 'critDmg'], 'lenh': ['tam', 'shopP'], 'dang': ['tam', 'tammaRes'], 'cot': ['execute'], 'huyet': ['drain'], 'phu': ['hpP', 'defP'], 'hap': ['elX'],
       'non': ['tam', 'defP'], 'gang': ['atkP', 'crit'], 'dai': ['hpP', 'tp'], 'hoa': ['craftP'], 'tran': ['bqP', 'bqSafe']}
pending = collections.Counter()
KBASE = {'kiem': {'atkP': 10}, 'dao': {'atkP': 7, 'crit': 5, 'critDmg': 10}, 'hotam': {'hoTam': 6, 'defP': 5}, 'phap': {'matkP': 12}, 'giap': {'defP': 20}, 'bao': {'hpP': 12},
         'boi': {'mpP': 18}, 'ngoa': {'tp': 3, 'dodge': 3}, 'linh': {'startBlock': 12}, 'hoan': {'regenMp': 6}, 'dinh': {'pillP': 30}, 'phien': {'poisonHit': 0.15},
         'chau': {'regenHp': 3}, 'kinh': {'reflect': 15}, 'gian': {'tvP': 15}, 'an': {'stunP': 8}, 'tram': {'dodge': 6}, 'holo': {'healAfter': 10}, 'thap': {'defP': 8, 'blockTurn': 4},
         'tan': {'firstEvade': 1}, 'cam': {'weakStart': 1}, 'xich': {'vulnStart': 1}, 'but': {'ngo': 3}, 'tui': {'stonesP': 20, 'pillSlot': 2}, 'nhan': {'van': 3, 'crit': 3, 'critDmg': 8},
         'lenh': {'tam': 3, 'shopP': 8}, 'dang': {'tam': 2, 'tammaRes': 30}, 'cot': {'execute': 20}, 'huyet': {'drain': 8}, 'phu': {'hpP': 6, 'defP': 8}, 'hap': {'elX': 20},
         'non': {'tam': 2, 'defP': 6}, 'gang': {'atkP': 5, 'crit': 2}, 'dai': {'hpP': 6, 'tp': 1}, 'hoa': {'craftP': 6}, 'tran': {'bqP': 8, 'bqSafe': 15}}
PBASE = {'atkP': 5, 'matkP': 6, 'defP': 8, 'hpP': 6, 'mpP': 8, 'tp': 1, 'crit': 3, 'critDmg': 8, 'dodge': 3, 'van': 1, 'tam': 1, 'ngo': 1, 'tvP': 5, 'lifeP': 5}
NBASE = {'firstEvade': 1, 'startBlock': 12, 'blockTurn': 4, 'weakStart': 1, 'vulnStart': 1, 'poisonHit': 0.15, 'stunP': 8, 'reflect': 15, 'execute': 20, 'drain': 8, 'regenHp': 3,
         'regenMp': 6, 'healAfter': 10, 'hoTam': 6, 'pillP': 30, 'stonesP': 20, 'pillSlot': 2, 'shopP': 8, 'tammaRes': 30, 'elX': 20, 'craftP': 6, 'bqSafe': 15, 'bqP': 8}
REL_M = [1, 1.3, 1.7, 2.2, 2.8, 3.5, 4.3]
COUNTK = {'firstEvade', 'weakStart', 'vulnStart', 'pillSlot'}
def limit(sh, row, k, v, base, req, uniq):
    """không cho vượt số của game ở cảnh giới đó quá 25% (đồ độc nhất 40%); dạng đếm tối đa 3"""
    if k in ('tp', 'ngo', 'tam', 'van'): v = max(1, round(v)) if v > 0 else min(-1, round(v))
    if v <= 0: return v
    top = 3 if k in COUNTK else base * (1 if k in COUNTK else REL_M[req]) * (1.4 if uniq else 1.25) * 1.02
    if k in ('tp', 'ngo', 'tam', 'van'): top = -(-top // 1)   # chỉ số điểm: làm tròn lên
    if v > top + 0.5:
        nv = round(top, 2) if k == 'poisonHit' else (int(top) if k in COUNTK else round(top, 1))
        warn(sh, row, f'{k} {v} quá cao so với cảnh giới, hạ về {nv}'); return nv
    return v
for sh in EQ_SHEETS:
    for row, d in sheet_rows(wb[sh]):
        if code_of(d): continue   # đồ có sẵn trong game: chỉ để tra
        cid = take_id(d, sh, row)
        if not cid or not d.get('Tên'): continue
        k = DANG_K.get(d.get('Dạng'))
        if not k or K_SHEET[k][0] != sh: err(sh, row, f'Dạng "{d.get("Dạng")}" không thuộc trang này'); continue
        if not any(d.get(f'Số gốc {i}') not in (None, '') for i in (1, 2, 3)): pending[sh] += 1; continue
        if d.get('Cảnh giới cần') not in CG: err(sh, row, 'thiếu Cảnh giới cần'); continue
        req = CG.index(d['Cảnh giới cần']); t = idx(PHAM, d.get('Phẩm'), sh, row, 'Phẩm', 1); reg = region_of(d.get('Vùng xuất hiện')); uniq = d.get('Độc nhất') == 'Có'
        if not (reg <= req <= reg + 1) and not (uniq and reg == 4 and req == 6): warn(sh, row, f'Cảnh giới cần {d["Cảnh giới cần"]} lệch với vùng {reg}')
        fx = fx_from(d, sh, row, EQ_FX, 3, 'Gốc {}', 'Số gốc {}', cap=False)
        for k2 in list(fx):
            if k2 not in KBASE[k]: warn(sh, row, f'mã gốc {k2} không thuộc dạng này, bỏ'); del fx[k2]
        for k2, b in KBASE[k].items():
            if k2 not in fx:
                fx[k2] = b if k2 in COUNTK else (round(b * REL_M[req], 2) if k2 == 'poisonHit' else max(1, round(b * REL_M[req])))
                warn(sh, row, f'thiếu mã gốc {k2}, đã bù theo số của game: {fx[k2]}')
        sub = fx_from(d, sh, row, EQ_FX, 4, 'Phụ {}', 'Số phụ {}', cap=False)
        neg = [k2 for k2, v in sub.items() if v < 0]
        if len(neg) > 1 or (neg and not uniq): warn(sh, row, 'chỉ đồ Độc nhất được 1 dòng âm, bỏ dòng âm thừa'); [sub.pop(k2) for k2 in (neg if not uniq else neg[1:])]; neg = neg[:1] if uniq else []
        for k2 in list(sub):
            ok = k2 in POOL or (k2 in neg and k2 == 'lifeP')
            if not ok or k2 in fx: warn(sh, row, f'dòng phụ {k2} không hợp lệ (ngoài 13 mã phụ hoặc trùng mã gốc), bỏ'); del sub[k2]
        npos = sum(1 for v in sub.values() if v > 0)
        if npos != REL_X[t]: warn(sh, row, f'{PHAM[t]} cần {REL_X[t]} dòng phụ, đang có {npos}')
        ex = fx_from(d, sh, row, EQ_FX, 1, 'Nội tại thêm', 'Số nội tại thêm', cap=False) if d.get('Nội tại thêm') else {}
        for k2 in list(ex):
            if k2 not in NT: warn(sh, row, f'"{k2}" không phải nội tại, bỏ'); del ex[k2]
            elif not uniq or any(x in NT for x in fx): warn(sh, row, 'chỉ đồ Độc nhất có dạng chưa có nội tại mới được thêm nội tại, bỏ'); del ex[k2]
        for k2 in fx: fx[k2] = limit(sh, row, k2, fx[k2], KBASE[k][k2], req, uniq)
        for k2 in sub: sub[k2] = limit(sh, row, k2, sub[k2], PBASE.get(k2, 5), req, uniq)
        for k2 in ex: ex[k2] = limit(sh, row, k2, ex[k2], NBASE.get(k2, 10), req, True)
        allfx = dict(fx)
        for k2, v in list(sub.items()) + list(ex.items()): allfx[k2] = allfx.get(k2, 0) + v
        el = d.get('Hệ') if d.get('Hệ') in HE else 'vo'
        if t == 6 and not uniq: warn(sh, row, 'Thần phẩm phải là đồ độc nhất, đặt Độc nhất = Có'); uniq = True
        C['relics'].append({'id': cid, 'n': d['Tên'], 'k': k, 'el': el, 't': t, 'req': req, 'reg': reg, 'u': 1 if uniq else 0, 'fx': allfx,
                            'lore': d.get('Mô tả / lời tựa') or '', 'src': d.get('Nguồn gặp') or ''})

# ---------- tên ghép ----------
sh = 'TB Tên ghép'
for row, d in sheet_rows(wb[sh]):
    w = d.get('Từ mới')
    if not w: continue
    if d.get('Loại') == 'Tiền tố':
        el = d.get('Hệ (với tiền tố)')
        if el not in HE: err(sh, row, f'tiền tố thiếu hệ'); continue
        C['pre'].setdefault(el, []).append(w)
    elif d.get('Loại') == 'Tên gốc':
        k = DANG_K.get(d.get('Dạng (với tên gốc)'))
        if not k: err(sh, row, f'Dạng "{d.get("Dạng (với tên gốc)")}" lạ'); continue
        C['base'].setdefault(k, []).append(w)
for D in (C['pre'], C['base']):
    for k in D: D[k] = list(dict.fromkeys(D[k]))

# ---------- chiêu thức ----------
sh = 'BT Chiêu thức'; sk_name = {}
for row, d in sheet_rows(wb[sh]):
    cid = take_id(d, sh, row)
    if not cid or not d.get('Tên'): continue
    code = code_of(d); gid = code or cid
    fx = {}
    for i in range(1, 5):
        k, v = d.get(f'Hiệu ứng {i}'), d.get(f'Số {i}')
        if not k: continue
        if k not in SK_FX: warn(sh, row, f'hiệu ứng lạ "{k}", bỏ'); continue
        if k == 'bonusIf': fx[k] = 'dot'; continue
        v = num(v)
        if v is None: warn(sh, row, f'hiệu ứng {k} không có số, bỏ'); continue
        fx[k] = v
    if not fx: err(sh, row, 'chiêu không có hiệu ứng'); continue
    t = int(num(d.get('Bậc (1–4)')) or 1); t = min(4, max(1, t))
    el = d.get('Hệ') if d.get('Hệ') in HE else 'vo'
    cat = 'Thân pháp' if fx.get('evade') else 'Phòng thủ' if not fx.get('p') else 'Thần thông' if t >= 3 else 'Tấn công'
    if d.get('Loại') and d.get('Loại') != cat: warn(sh, row, f'ghi "{d.get("Loại")}" nhưng theo luật game là "{cat}" (game xếp theo hiệu ứng và bậc)')
    s = {'id': gid, 'n': d['Tên'], 'el': el, 't': t, 'c': int(num(d.get('Linh lực tốn')) or 0), 'fx': fx, 'f': d.get('Câu tả khi xuất chiêu') or '',
         'vl': 1 if d.get('Kiểu sát thương') == 'Vật lý' else 0, 'ch': 1 if d.get('Tụ lực') == 'Có' else 0, 'aoe': 1 if d.get('Diện rộng') == 'Có' else 0,
         'dao': 1 if d.get('Đạo pháp') == 'Có' else 0}
    sk_name[d['Tên'].lower()] = gid; sk_name[cid] = gid; sk_name[gid] = gid
    if not code: C['skills'].append(s)

# ---------- công pháp, tâm pháp ----------
for sh, typ in [('BT Công pháp', 'cp'), ('BT Tâm pháp', 'tp')]:
    for row, d in sheet_rows(wb[sh]):
        cid = take_id(d, sh, row)
        if not cid or not d.get('Tên'): continue
        t = idx(PHAM, d.get('Phẩm'), sh, row, 'Phẩm', 1); req = realm_of(d.get('Cảnh giới cần để học'))
        el = d.get('Hệ') if d.get('Hệ') in HE else 'vo'
        lines = []
        for i in range(1, 10):
            v = d.get(f'Dòng {i}')
            if not v: continue
            v = str(v); lr = req
            m = re.search(r'\(cần\s+([^)]+)\)', v)
            if m:
                if m.group(1).strip() in CG: lr = max(req, realm_of(m.group(1).strip()))
                v = v[:m.start()].strip()
            if v.startswith('đòn thần thức'):
                if typ == 'cp': warn(sh, row, 'công pháp không có đòn thần thức, đổi thành tâm pháp mới có'); continue
                lines.append({'mind': 1, 'req': lr}); continue
            m = re.match(r'chiêu:\s*(.+)', v)
            if m:
                if typ == 'tp': warn(sh, row, f'tâm pháp không mang chiêu, bỏ dòng {i}'); continue
                s = sk_name.get(m.group(1).strip().lower()) or sk_name.get(m.group(1).strip())
                if not s: warn(sh, row, f'không tìm thấy chiêu "{m.group(1)}", bỏ dòng {i}'); continue
                lines.append({'sk': s, 'req': lr}); continue
            m = re.match(r'chỉ số:\s*(\w+)\s+([-\d.,]+)', v)
            if m and m.group(1) in ART_FX:
                k = m.group(1); x = num(m.group(2)) / ART_NORM[t]
                lines.append({'fx': k, 'v': round(x, 2), 'req': lr, **({'stage': 1} if k.endswith('Stage') else {})}); continue
            warn(sh, row, f'dòng {i} "{v[:40]}" không đọc được, bỏ')
        if not lines: err(sh, row, 'không có dòng nào dùng được'); continue
        if typ == 'cp' and not any('sk' in x for x in lines): warn(sh, row, 'công pháp không có chiêu nào')
        C['arts'].append({'id': cid, 'type': typ, 'n': d['Tên'], 'el': el, 't': t, 'req': req, 'lines': lines, 'd': d.get('Mô tả') or '', 'dang': d.get('Dạng') or ''})

# ---------- đan dược ----------
EFF = {'Hồi khí huyết %': 'hoixuan', 'Hồi linh lực %': 'tukhi', 'Giải độc + hồi khí huyết %': 'giaidoc', 'Giảm tâm ma': 'dinhthan', 'Tăng tu vi %': 'tinhnguyen',
       'Tăng khí huyết tối đa vĩnh viễn %': 'taytuy', 'Tăng ngộ tính vĩnh viễn': 'khaitri', 'Tăng thọ nguyên %': 'dientho', 'Tăng đạo cơ': 'linhnhu',
       'Tăng cuồng nộ': 'baohuyet', 'Hộ thể % khí huyết': 'kimcang', 'Đánh một đòn % công': 'loiphu', 'Chắc chắn thoát thân': 'thanhanh'}
EFF_D = {'hoixuan': 'Hồi {x}% khí huyết', 'tukhi': 'Hồi {x}% linh lực', 'giaidoc': 'Giải độc và thiêu, hồi {x}% khí huyết', 'dinhthan': 'Tâm ma −{x}',
         'tinhnguyen': 'Tu vi +{x}%', 'taytuy': 'Khí huyết tối đa +{x}% vĩnh viễn', 'khaitri': 'Ngộ tính +{x}', 'dientho': 'Thọ nguyên +{x}%',
         'linhnhu': 'Đạo cơ +{x} (tối đa 4 điểm mỗi cảnh giới từ đan dược)', 'baohuyet': 'Cuồng nộ +{x} trong trận', 'kimcang': 'Hộ thể {x}% khí huyết',
         'thanhanh': 'Chắc chắn thoát thân (trừ thủ lĩnh)'}
ELN = {'kim': 'Kim', 'moc': 'Mộc', 'thuy': 'Thủy', 'hoa': 'Hỏa', 'tho': 'Thổ', 'loi': 'Lôi', 'bang': 'Băng', 'phong': 'Phong', 'am': 'Âm', 'phat': 'Phật', 'vo': 'Vô'}
BT_FOR = ['Luyện Khí → Trúc Cơ', 'Trúc Cơ → Kết Đan', 'Kết Đan → Nguyên Anh', 'Nguyên Anh → Hóa Thần', 'Hóa Thần → Độ Kiếp']
for sh in ['DD Đan dược', 'DD Phù lục', 'DD Đột phá']:
    for row, d in sheet_rows(wb[sh]):
        cid = take_id(d, sh, row)
        if not cid or not d.get('Tên'): continue
        x = num(d.get('Mức tác dụng')) or 0; tac = d.get('Tác dụng')
        p = {'id': cid, 'n': d['Tên'], 'i': d.get('Biểu tượng') or '💊', 'x': x, 'p': int(num(d.get('Giá (linh thạch)')) or 20),
             'reg': region_of(d.get('Vùng xuất hiện')), 'lore': d.get('Mô tả') or ''}
        if sh == 'DD Đột phá':
            p['w'] = 'bt'
            bt = {'Tăng tỉ lệ đột phá %': {'rate': x}, 'Hộ mệnh (thất bại không mất tu vi)': {'guard': 1}, 'Bớt một đạo lôi kiếp': {'kiepCut': max(1, int(x))},
                  'Hộ thể khi vào kiếp %': {'kiepHp': x}, 'Tăng đạo cơ khi đột phá': {'dao': x}}.get(tac)
            if not bt: err(sh, row, f'tác dụng lạ "{tac}"'); continue
            p['bt'] = bt
            p['d'] = {'rate': 'Đột phá +{x}%', 'guard': 'Hộ mệnh: thất bại không mất tu vi, không trọng thương; gục giữa kiếp vẫn sống', 'kiepCut': 'Trợ kiếp: bớt {x} đạo lôi',
                      'kiepHp': 'Trợ kiếp: vào kiếp được hộ thể {x}% khí huyết', 'dao': 'Phẩm chất: đạo cơ +{x} khi đột phá'}[list(bt)[0]]
            if d.get('Cho cảnh giới') in BT_FOR: p['realm'] = BT_FOR.index(d['Cho cảnh giới']); p['reg'] = min(4, p['realm'])
            if 'kiepCut' in bt: p['x'] = bt['kiepCut']
        else:
            e = EFF.get(tac)
            if not e: err(sh, row, f'tác dụng lạ "{tac}"'); continue
            p['eff'] = e; p['w'] = 'combat' if sh == 'DD Phù lục' else 'any'
            if e == 'loiphu':
                el = d.get('Hệ (nếu đánh)') if d.get('Hệ (nếu đánh)') in HE else 'loi'; p['el'] = el; p['d'] = 'Đánh một đòn {x}% công, hệ ' + ELN[el]
            else: p['d'] = EFF_D[e]
            if e == 'linhnhu': p['dao'] = x
        code = code_of(d)
        if code: continue
        C['pills'].append(p)

# ---------- phương tiện ----------
sh = 'VT Phương tiện'
for row, d in sheet_rows(wb[sh]):
    if code_of(d): continue
    cid = take_id(d, sh, row)
    if not cid or not d.get('Tên'): continue
    m = num(d.get('Tốc độ (gấp mấy lần đi bộ)'))
    if not m or m < 1: err(sh, row, 'tốc độ không hợp lệ'); continue
    item = {'id': code_of(d) or cid, 'n': d['Tên'], 'm': min(9, m), 'p': int(num(d.get('Giá (linh thạch)')) or 50), 'realm': realm_of(d.get('Cảnh giới cần')),
            'd': d.get('Mô tả / lời tựa') or '', 'old': 1 if code_of(d) else 0}
    C['mounts'].append(item)

# ---------- nguyên liệu ----------
for sh, cat in [('VL Linh dược', 'thao'), ('VL Khoáng sản', 'khoang'), ('VL Vật liệu yêu thú', 'dan')]:
    for row, d in sheet_rows(wb[sh]):
        cid = take_id(d, sh, row)
        if not cid or not d.get('Tên') or code_of(d): continue
        C['mats'].append({'id': cid, 'n': d['Tên'], 'cat': cat, 'i': d.get('Biểu tượng') or '', 't': idx(PHAM, d.get('Phẩm'), sh, row, 'Phẩm', 0),
                          'reg': region_of(d.get('Vùng xuất hiện')), 'el': d.get('Hệ') or 'vo', 'where': d.get('Nơi kiếm') or '', 'use': d.get('Dùng để luyện') or '', 'd': d.get('Mô tả') or ''})

# ---------- linh thú (loài yêu thú) ----------
sh = 'LT Linh thú'
for row, d in sheet_rows(wb[sh]):
    cid = take_id(d, sh, row)
    if not cid or not d.get('Tên loài') or code_of(d): continue
    nb = [x.strip() for x in str(d.get('Các tên gọi (cách nhau dấu phẩy)') or d['Tên loài']).split(',') if x.strip()]
    els = [x.strip() for x in str(d.get('Hệ có thể có') or 'vo').split(',') if x.strip() in HE] or ['vo']
    pat = [x.strip() for x in str(d.get('Nhịp đánh') or 'atk').split(',') if x.strip()]
    bad = [x for x in pat if x not in PAT]
    if bad: warn(sh, row, f'nhịp đánh lạ {bad}, bỏ'); pat = [x for x in pat if x in PAT]
    fixed = []
    for j, x in enumerate(pat):   # tụ lực phải đi liền đòn nặng
        fixed.append(x)
        if x == 'charge' and (j + 1 >= len(pat) or pat[j + 1] != 'heavy'): fixed.append('heavy'); warn(sh, row, 'charge không có heavy theo sau, đã thêm')
    pat = fixed or ['atk']
    pl = [N_TYPE[x.strip()] for x in str(d.get('Nơi sống') or '').split(',') if x.strip() in N_TYPE] or ['*']
    regs = sorted({int(x) for x in re.findall(r'\d', str(d.get('Vùng xuất hiện') or '0')) if int(x) <= 4}) or [0]
    st = [num(d.get(c)) or 1 for c in ('Khí huyết', 'Công', 'Thủ')]
    st = [min(1.8, max(0.5, x)) for x in st]
    C['beasts'].append({'id': cid, 'i': d.get('Biểu tượng') or '🐾', 'nb': nb, 'el': els, 'hp': st[0], 'atk': st[1], 'def': st[2], 'pat': pat, 'pl': pl, 'regs': regs, 'd': d.get('Mô tả') or ''})

# ---------- nhiệm vụ & kỳ vật ----------
sh = 'NV Nhiệm vụ & kỳ vật'
for row, d in sheet_rows(wb[sh]):
    cid = take_id(d, sh, row)
    if not cid or not d.get('Tên') or code_of(d): continue
    C['qitems'].append({'id': cid, 'n': d['Tên'], 'i': d.get('Biểu tượng') or '📜', 'dang': d.get('Dạng') or '', 'use': d.get('Dùng trong (sự kiện / chuỗi nào)') or '', 'd': d.get('Mô tả') or ''})

# ---------- xuất thân, thiên phú ----------
pill_by_name = {}
for p in C['pills']: pill_by_name[p['n'].lower()] = p['id']
OLD_PILL = {'Hồi Xuân Đan': 'hoixuan', 'Tụ Khí Đan': 'tukhi', 'Giải Độc Đan': 'giaidoc', 'Định Thần Đan': 'dinhthan', 'Tinh Nguyên Đan': 'tinhnguyen', 'Bạo Huyết Đan': 'baohuyet', 'Kim Cang Phù': 'kimcang', 'Chưởng Lôi Phù': 'loiphu'}
for k, v in OLD_PILL.items(): pill_by_name[k.lower()] = v
sh = 'NV Xuất thân'
for row, d in sheet_rows(wb[sh]):
    cid = take_id(d, sh, row)
    if not cid or not d.get('Tên'): continue
    o = {'id': code_of(d) or cid, 'n': d['Tên'], 'i': d.get('Biểu tượng') or '🧑', 'fx': fx_from(d, sh, row, TRAIT_FX, 2), 'd': d.get('Mô tả ngắn (hiện khi chọn)') or '',
         'bio': (d.get('Câu tiểu sử') or '').replace('{que}', '{$que}').replace('{quoc}', '{$quoc}')}
    for col, key in [('Linh thạch thêm', 'st'), ('Nhân quả', 'karma'), ('Tâm ma ban đầu', 'tamma'), ('Nhập đạo muộn (năm)', 'age')]:
        v = num(d.get(col))
        if v: o[key] = int(v)
    ps = [pill_by_name.get(x.strip().lower()) for x in str(d.get('Đan dược tặng') or '').split(',') if x.strip()]
    if None in ps: warn(sh, row, 'có đan tặng không tìm thấy, bỏ'); ps = [x for x in ps if x]
    if ps: o['pill'] = ps[0]
    if len(ps) > 1: o['pill2'] = ps[1]
    if not o['bio']: err(sh, row, 'thiếu câu tiểu sử'); continue
    ls = [x.replace('{que}', '{que}') for x in (d.get('Chuyện thơ ấu 1'), d.get('Chuyện thơ ấu 2')) if x]
    if len(ls) < 2: warn(sh, row, 'thiếu chuyện thơ ấu (trang mở đầu kiếp chỉ hiện câu tiểu sử)')
    if ls: o['ls'] = ls
    TINH = {'Bảo thủ', 'Chính trực', 'Cuồng tà', 'Căm thù', 'Hiếu chiến', 'Hào sảng', 'Lạnh lùng', 'Nhân hậu', 'Quái gở', 'Sát phạt', 'Thông tuệ', 'Thận trọng', 'Thực dụng', 'Tàn nhẫn', 'Tự do', 'Độc ác', 'Thâm độc', 'Vị kỷ'}
    tinh = [x.strip() for x in str(d.get('Tính tình') or '').split(',') if x.strip()]
    bad = [x for x in tinh if x not in TINH]
    if bad: warn(sh, row, f'tính tình lạ {bad}, bỏ')
    tinh = [x for x in tinh if x in TINH]
    if tinh: o['tinh'] = tinh
    elif not code_of(d): warn(sh, row, 'thiếu tính tình')
    tp = d.get('Tâm pháp gia truyền')
    if tp in ('Phàm phẩm', 'Hoàng phẩm'):
        o['tp'] = PHAM.index(tp)
        if d.get('Câu kể tâm pháp'): o['tpc'] = d['Câu kể tâm pháp']
        else: warn(sh, row, 'có tâm pháp gia truyền nhưng thiếu câu kể')
    if not code_of(d): C['origins'].append(o)
# ---------- ghi ra ----------
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('// TỆP SINH TỰ ĐỘNG từ docs/vat-pham.xlsx bằng tools/excel2game.py. Đừng sửa tay: sửa Excel rồi chạy lại công cụ.\n')
    f.write('const CATALOG_DATA=' + json.dumps(C, ensure_ascii=False, separators=(',', ':')) + ';\n')

cnt = {k: len(v) for k, v in C.items()}
nerr = sum(1 for L in msgs.values() for x in L if x[1] == 'BỎ'); nw = sum(len(L) for L in msgs.values()) - nerr
with open(REPORT, 'w', encoding='utf-8') as f:
    f.write('# Báo cáo chuyển Excel vào game\n\nTệp sinh tự động mỗi lần chạy `tools/excel2game.py`.\n\n')
    f.write('## Số lượng đưa vào game\n\n| Nhóm | Số mục |\n|---|---|\n')
    N = {'relics': 'Trang bị, vật tùy thân mới (đã có chỉ số theo luật mới)', 'pre': 'Hệ có tiền tố', 'base': 'Dạng có tên gốc', 'skills': 'Chiêu thức mới',
         'arts': 'Công pháp + tâm pháp viết sẵn', 'pills': 'Đan dược, phù lục, đan đột phá mới', 'mounts': 'Phương tiện mới', 'mats': 'Nguyên liệu có tên',
         'beasts': 'Loài yêu thú mới', 'origins': 'Xuất thân mới', 'qitems': 'Vật nhiệm vụ'}
    for k, v in cnt.items(): f.write(f'| {N[k]} | {v} |\n')
    if pending: f.write('\nTrang bị CHƯA có chỉ số theo luật mới (chờ GPT viết, chưa đưa vào game): ' + ', '.join(f'{k} {v}' for k, v in pending.items()) + f' · tổng {sum(pending.values())}\n')
    f.write('\nDòng tô xanh (đồ có sẵn trong game) chỉ để tra, công cụ không đè lên game.\n')
    f.write(f'\nTiền tố: {sum(len(v) for v in C["pre"].values())} · Tên gốc: {sum(len(v) for v in C["base"].values())}\n')
    f.write(f'\n## Lỗi và chỗ đã sửa ({nerr} dòng bị bỏ, {nw} chỗ tự sửa)\n\n"BỎ" = dòng không đưa vào game. "sửa" = vẫn đưa vào, đã chỉnh như mô tả.\n')
    for sh, L in msgs.items():
        f.write(f'\n### {sh}\n\n')
        for r, lv, t in L: f.write(f'- dòng {r} · **{lv}** · {t}\n')
print('Đã ghi', OUT, '|', ', '.join(f'{k}={v}' for k, v in cnt.items()))
print(f'Bỏ {nerr} dòng, tự sửa {nw} chỗ, trang bị chờ viết {sum(pending.values())}. Xem {REPORT}')
