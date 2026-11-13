# Chuyển file cốt truyện sự kiện (markdown) thành dữ liệu game: src/data/su_kien.js
# - Nhân vật [Vai A] → tên do game sinh, giữ nguyên qua các phần của một chuỗi.
# - [thị trấn này]/[thôn này] → tên nơi đang đứng, [tông môn] → tên tông môn, [quê nhà ngươi] → quê.
# - Thưởng phạt: suy từ nhãn lựa chọn và câu kết quả (giúp người / làm lợi cho mình / bỏ đi),
#   rồi chỉnh tay bằng bảng SUA ở cuối tệp.
# Dùng: python3 tools/su_kien_chuyen.py [file.md] [--xem VÙNG]
import json, os, re, sys, unicodedata
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))
from su_kien_tach import tach

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SRC = next((a for a in sys.argv[1:] if a.endswith('.md')), os.path.join(ROOT, 'docs/nhap/phu-sinh-su-kien.md'))
OUT = os.path.join(ROOT, 'src/data/su_kien.js')
HD, HM, HY = 24, 720, 8640

def slug(s):
    s = unicodedata.normalize('NFD', s.replace('đ', 'd').replace('Đ', 'D'))
    s = ''.join(c for c in s if unicodedata.category(c) != 'Mn').lower()
    return re.sub(r'[^a-z0-9]+', '_', s).strip('_')[:28]

# ---------- nơi chốn → loại địa điểm ----------
PLACE = [(r'biển|bãi|đảo|cảng|triều|thuyền|bè|cửa biển|rạn|san hô|muối', 'bien'), (r'sông|bến|mương|lạch|đê|hồ|đầm|thác|suối|cầu', 'song'),
         (r'rừng|gò cỏ|bờ ruộng|ruộng|đồng', 'rung'), (r'núi|đèo|vách|ải|dốc|đỉnh|bậc đá|hành lang', 'nui'), (r'hang|động|mỏ|ngách|hầm', 'dong'),
         (r'tông|sơn môn|kiếm|tàng|phòng luyện|điện|lò đan|đạo trường|giám luật|đệ tử', 'tong'), (r'miếu|phế|tàn|đổ nát|mộ|nghĩa địa|an táng', 'phe'),
         (r'thành|phố|quan đạo|kho lương', 'thanh'), (r'chợ|thị trấn|thôn|xóm|làng|sân|nhà|bếp|xưởng|lò|lầu|lán|cổng|ngõ|hiên|kho', 'tran'),
         (r'ma|thi|huyết|tro|u minh|quỷ', 'ma'), (r'cổ lộ|thiên|mây|trời|tinh|hư không', 'thien')]
REG_TYPES = [['tran', 'rung', 'nui', 'song', 'phe', 'thanh'], ['tong', 'nui', 'rung', 'thanh', 'dong', 'phe'], ['bien', 'song', 'dong', 'rung', 'hoang', 'thanh'],
             ['ma', 'hoang', 'phe', 'dong', 'thanh'], ['thien', 'phe', 'hoang', 'nui']]
def tags(place, reg):
    p = place.lower(); out = []
    for pat, t in PLACE:
        if re.search(pat, p) and t not in out: out.append(t)
    out = [t for t in out if t in REG_TYPES[reg] or t in ('tran', 'thanh', 'tong')] or REG_TYPES[reg][:3]
    if 'tran' in out and 'thanh' not in out: out.append('thanh')
    if reg >= 1 and 'tong' not in out and re.search(r'tông|đệ tử|sơn môn', p): out.append('tong')
    return out[:4]

# ---------- nhân vật ----------
NU = r'^(cô|bà|người mẹ|mẹ|nàng|thị|người vợ|vợ|cô gái|con gái|góa phụ|ni|thím|chị|em gái|tiểu thư|nữ|bà lão|cô thợ|cô bé|thánh nữ|sư tỷ|sư muội)\b'
def roles_of(scenes):
    R = {}
    for e in scenes:
        for txt in [e['intro']] + [c['l'] + ' ' + c['t'] for c in e['c']]:
            for role, L in re.findall(r'\[([^\]]+?) ([A-E])\]', txt):
                k = L.lower()
                if k not in R: R[k] = {'g': 'nu' if re.search(NU, role.lower()) else 'nam', 'role': role}
    return R

GEN = {'thị trấn này': '{$pl}', 'thôn này': '{$pl}', 'tông môn': '{$sect}', 'Tông môn': '{$sect}', 'tông môn ma đạo': '{$sectM}', 'quê nhà ngươi': '{$que}'}
def fill(txt, seen):
    """[Vai A] → 'Vai {$a.ten}' lần đầu trong cảnh, sau đó chỉ tên."""
    def rep(m):
        role, L = m.group(1), m.group(2)
        k = L.lower()
        if k in seen: return '{$' + k + '.ten}'
        seen.add(k); return role + ' {$' + k + '.ten}'
    txt = re.sub(r'\[([^\]]+?) ([A-E])\]', rep, txt)
    for a, b in GEN.items(): txt = txt.replace('[' + a + ']', b)
    return re.sub(r'\[([^\]]+)\]', r'\1', txt)

# ---------- thời gian chờ giữa các phần ----------
def delay(cond):
    c = (cond or '').lower()
    for pat, h in [(r'vài ngày', 5 * HD), (r'vài tuần', 21 * HD), (r'sang tháng', HM), (r'vài tháng', 3 * HM), (r'vài năm', 3 * HY), (r'năm sau|một năm', HY),
                   (r'đầu xuân|sang xuân|đầu đông|mùa sau|mùa lạnh|mùa gió|mùa triều|mùa muối|mùa biển|mùa hanh', 6 * HM)]:
        if re.search(pat, c): return h
    return 2 * HM

# ---------- thưởng phạt ----------
EARN_L = r'^(mua .*(để (đem )?bán|rồi thu)|cho .*làm thuê|đòi|nhận tiền|nhận mẻ|nhận phần tiền|bán|niêm|thu |thu phần|thu tiếng|giao |cho .*vay|khuyên .*bán|lấy tiền|đổi im lặng|cho bán|cho luyện tiếp|mua chỗ|giữ phần|mua trọn|kê cối lại|đánh theo nhịp|để .*giữ quyền|giữ riêng)'
EARN_T = r'có linh thạch|kiếm (được )?ít tiền|trả tiền cho ngươi|dúi cho ngươi|tiền môi giới|có lời|thưởng bạc|chia tiền công|hũ bạc|mối làm ăn|chia tiền|hoa hồng|bù thêm tiền|ngươi có tiền|giá cao cho ngươi'
PAY_L = r'^(mua|trả|thuê|đặt|góp|chuộc|chia|bù|đổi tiền|đứng ra nộp|đứng tên|nhận phần đền|cho mượn|cho .*làm thuê)'
INJ = r'rạn xương|gãy tay|chảy máu|bị thương|rách da|lạnh buốt|rát lòng|đau buốt|đau nhức|bỏng|ngất|ho ra máu|mất máu|tê dại|rướm máu'
SELF_L = r'^(mua|thuê) .*(cho ngươi|cho mình)|^mua tấm|^mua chỗ'
TIME = r'đến sáng|gần sáng|tới khi tối|tối hẳn|mấy ngày|hết buổi|lỡ chuyến|ngủ ngoài|nhiều ngày|cả đêm|suốt đêm|bỏ buổi'
INSIGHT = r'ngộ ra|vận khí|tìm ra cách|hiểu ra|lĩnh hội|nhập định|đạo tâm'
MANA = r'linh lực|pháp lực|chân khí'
LIFE = r'thọ nguyên|tuổi thọ|năm sống'
WARM = {'Cảm động', 'Ấm áp', 'Bi thương', 'Xót xa', 'Lãng mạn', 'Dịu dàng', 'Day dứt', 'Lắng dịu'}
DARK = {'Kinh dị', 'Bất an'}

def effects(e, c, idx):
    L, T = c['l'].lower(), c['t'].lower()
    if L.startswith('bỏ đi'): return {'leave': 1}
    o = {'e': {}}; E = o['e']
    earn = re.search(EARN_L, L) or (re.search(EARN_T, T) and not re.search(PAY_L, L))
    if earn:
        E['st'] = 14 + 4 * e['reg']; E['karma'] = -3
        if e['emo'] in DARK or re.search(r'tà vật|oán niệm|oan hồn|\bhồn\b|xác chết|thi thể|luyện thi|âm khí', T): E['tamma'] = 4
        elif e['emo'] in ('Phẫn nộ', 'Xót xa', 'Bi thương', 'Uất ức'): E['tamma'] = 2
    elif re.search(SELF_L, L):
        o['cost'] = {'st': 10 + 3 * e['reg']}
    else:
        E['karma'] = 4
        if re.search(PAY_L, L): o['cost'] = {'st': 10 + 3 * e['reg']}
        if re.search(MANA, T): o['cost'] = dict(o.get('cost', {}), mp='20%')
        if re.search(INJ, T): E['hp'] = '-15%'
        if re.search(TIME, T): E['h'] = 24
        if re.search(r'mất một lá bùa|lá bùa hộ thân|giấy bùa', T): E['dropPill'] = 1
        if re.search(LIFE, T + ' ' + L): E['lifeCut'] = 3
        if re.search(INSIGHT, T): E['tv'] = 4
        if idx == 0 and e['emo'] in WARM and re.search(r'\[[^\]]+ A\]', e['intro']): E['an'] = ['a', e['title'][0].lower() + e['title'][1:]]
        if e['emo'] in DARK and not re.search(MANA, T): E['tamma'] = -3
    if re.search(INSIGHT, T) and earn: E['tv'] = 3
    m = re.search(r'Thắng, (.+?) Thua, (.+)$', c['t'])
    if m:  # lựa chọn thử sức: chia hai kết quả
        o['chk'] = ['tp', 9 + 2 * e['reg']]; o['ok'] = {'t': m.group(1).strip(), 'e': {'karma': 4}}; o['no'] = {'t': 'Thua, ' + m.group(2).strip(), 'e': {'hp': '-20%'}}
        del o['e']
    return o

ICON_L = [(r'^bỏ đi', '🚶'), (r'^(mua|trả|thuê|đặt|chuộc|bù|đổi tiền|nhận phần đền|đứng ra nộp)', '💎'), (r'^(đòi|nhận tiền|bán|thu|giao|lấy tiền|cho .*vay|nhận mẻ)', '💰'),
          (r'^(góp|chia|cho mượn|nhường)', '🤲'), (r'^(thách|đánh|chặn|chống)', '⚔️'), (r'^(ngồi|quan sát|hỏi|nghe|gõ cửa)', '👁️'), (r'^(khuyên|dẫn|gọi|đưa)', '🗣️')]
def icon(l):
    for p, i in ICON_L:
        if re.search(p, l.lower()): return i
    return '✋'

# ---------- dựng dữ liệu ----------
S = tach(SRC)
chains = {}
for e in S:
    if e['chain']: chains.setdefault(e['chain'], []).append(e)
out = []
for i, e in enumerate(S):
    cid = slug(e['chain']) if e['chain'] else None
    sid = ('ch_' + cid + '_' + e['part']) if cid else 'gk_' + slug(e['title'])
    R = roles_of(chains[e['chain']] if cid else [e])
    seen = set()
    intro = fill(e['intro'], seen)
    if e['rumor']: intro += ' Người qua lại bàn tán: ' + e['rumor']
    C = []
    for j, c in enumerate(e['c']):
        x = effects(e, c, j)
        cs = set(seen)
        row = {'i': icon(c['l']), 'l': fill(c['l'], cs), 't': fill(c['t'], cs)}
        row.update({k: v for k, v in x.items() if k != 'e'})
        if 'e' in x and x['e']: row['e'] = x['e']
        if 'ok' in row: row['ok']['t'] = fill(row['ok']['t'], set(seen)); row['no']['t'] = fill(row['no']['t'], set(seen)); row.pop('t', None)
        C.append(row)
    d = {'id': sid, 'n': e['title'], 'reg': e['reg'], 'emo': e['emo'], 'tg': tags(e['place'], e['reg']), 'roles': {k: v['g'] for k, v in R.items()}, 't': intro, 'c': C}
    if cid:
        d['chain'] = cid; d['part'] = e['part']
        if e['part'] != '1':
            labels = re.findall(r'“([^”]+)”', e['cond'] or '')
            d['wait'] = delay(e['cond'])
            if e['part'] in ('2', '2b'):
                p1 = next(x for x in chains[e['chain']] if x['part'] == '1')
                d['need'] = [j for j, c in enumerate(p1['c']) if c['l'] in labels]
            elif e['part'] == '4':
                p3 = next(x for x in chains[e['chain']] if x['part'] == '3')
                d['need'] = [j for j, c in enumerate(p3['c']) if c['l'] in labels] or [j for j, c in enumerate(p3['c']) if not c['l'].startswith('Bỏ đi')]
    out.append(d)

# ---------- chỉnh tay ----------
# Mỗi dòng: 'id_cảnh số_lựa_chọn: lệnh lệnh…'. Lệnh:
#  loi = làm lợi (linh thạch +, nhân quả −3) · loi0 = làm ăn đàng hoàng (linh thạch +, không trừ nhân quả)
#  mua = bỏ tiền cho mình (tốn linh thạch, không cộng nhân quả) · tra = bỏ tiền giúp người (tốn linh thạch, nhân quả +4)
#  giup = giúp không tốn tiền (nhân quả +4) · xoa = xóa hết thưởng phạt tự suy
#  k=N đặt nhân quả · tm=N tâm ma · hp=N (% âm) · tv=N · h=N giờ · mp (tốn 20% linh lực) · tho=N (% thọ mất)
#  st=N linh thạch nhận · gia=N giá tiền · an / oan (ân, oán với nhân vật A) · dan (một viên đan) · do (một món đồ) · bitich (một môn công pháp)
#  van=N tam=N ngo=N tp=N (cộng vĩnh viễn) · lore=<mã>
SUA_TXT = open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'su_kien_sua.txt'), encoding='utf-8').read() if os.path.exists(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'su_kien_sua.txt')) else ''
BYID = {d['id']: d for d in out}
for line in SUA_TXT.splitlines():
    line = line.split('#')[0].strip()
    if not line: continue
    head, cmds = line.split(':', 1); sid, j = head.split(); j = int(j)
    d = BYID.get(sid)
    if not d: raise SystemExit('chỉnh tay: không có cảnh ' + sid)
    c = d['c'][j]; reg = d['reg']; E = c.setdefault('e', {})
    for cmd in cmds.split():
        k, _, v = cmd.partition('=')
        if k == 'xoa': c['e'] = E = {}; c.pop('cost', None)
        elif k == 'loi': E.update(st=14 + 4 * reg, karma=-3); c.pop('cost', None)
        elif k == 'loi0': E.update(st=14 + 4 * reg); E.pop('karma', None); c.pop('cost', None)
        elif k == 'mua': c['cost'] = dict(c.get('cost', {}), st=10 + 3 * reg); E.pop('karma', None); E.pop('st', None)
        elif k == 'tra': c['cost'] = dict(c.get('cost', {}), st=10 + 3 * reg); E['karma'] = 4; E.pop('st', None)
        elif k == 'giup': E['karma'] = 4; E.pop('st', None); c.pop('cost', None) if 'st' in c.get('cost', {}) and len(c['cost']) == 1 else None
        elif k == 'k': E['karma'] = int(v)
        elif k == 'tm': E['tamma'] = int(v)
        elif k == 'hp': E['hp'] = '-' + v + '%'
        elif k == 'tv': E['tv'] = int(v)
        elif k == 'h': E['h'] = int(v)
        elif k == 'mp': c['cost'] = dict(c.get('cost', {}), mp='20%')
        elif k == 'tho': E['lifeCut'] = int(v)
        elif k == 'st': E['st'] = int(v)
        elif k == 'gia': c['cost'] = dict(c.get('cost', {}), st=int(v))
        elif k == 'an': E['an'] = ['a', d['n'][0].lower() + d['n'][1:]]
        elif k == 'oan': E['oan'] = ['a', d['n'][0].lower() + d['n'][1:]]
        elif k == 'dan': E['pill'] = 1
        elif k == 'do': E['relic'] = 0
        elif k == 'bitich': E['skill'] = 1
        elif k in ('van', 'tam', 'ngo', 'tp'): E[k] = int(v)
        elif k == 'lore': E['lore'] = v
        elif k.startswith('-'): E.pop(k[1:], None)
        else: raise SystemExit('chỉnh tay: lệnh lạ ' + cmd + ' ở ' + line)
        if E.get('karma') == 0: E.pop('karma')
    if not c['e']: c.pop('e')

ids = [d['id'] for d in out]
dup = {x for x in ids if ids.count(x) > 1}
if dup: raise SystemExit('ID trùng: ' + ', '.join(dup))
if '--xem' in sys.argv:
    g = int(sys.argv[sys.argv.index('--xem') + 1])
    for d in out:
        if d['reg'] != g: continue
        print(f"\n{d['id']} [{d['emo']}] tg={d['tg']}" + (f" need={d.get('need')} wait={d.get('wait')}" if d.get('part', '1') != '1' else ''))
        for j, c in enumerate(d['c']):
            print(f"  {j} {c['l'][:60]} | " + json.dumps({k: v for k, v in c.items() if k in ('e', 'cost', 'chk', 'leave')}, ensure_ascii=False))
    sys.exit()
os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, 'w', encoding='utf-8') as f:
    f.write('// TỆP SINH TỰ ĐỘNG từ docs/nhap/phu-sinh-su-kien.md bằng tools/su_kien_chuyen.py. Đừng sửa tay.\n')
    f.write('const SU_KIEN_DATA=' + json.dumps(out, ensure_ascii=False, separators=(',', ':')) + ';\n')
print('Đã ghi', OUT, '|', len(out), 'cảnh,', len({d['chain'] for d in out if d.get('chain')}), 'chuỗi')
