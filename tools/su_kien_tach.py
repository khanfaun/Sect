# Tách file cốt truyện sự kiện (markdown GPT viết) thành dữ liệu có cấu trúc.
# Dùng như thư viện: from su_kien_tach import tach; hoặc chạy để in danh sách gọn từng vùng:
#   python3 tools/su_kien_tach.py docs/nhap/phu-sinh-su-kien.md [số vùng 0-4]
import re, sys, json

VUNG = ['Phàm Trần', 'Linh Sơn Vạn Lĩnh', 'Đông Hải Yêu Vực', 'Cửu U Ma Vực', 'Cửu Thiên Cổ Lộ']


def tach(path):
    s = open(path, encoding='utf-8').read()
    out = []; reg = -1; chain = None
    for blk in re.split(r'^(?=#{2,4} )', s, flags=re.M):
        h = blk.split('\n', 1)[0]
        if h.startswith('## '):
            name = h[3:].split(' · ')[0].strip()
            if name in VUNG: reg = VUNG.index(name)
            chain = None; continue
        if h.startswith('### '):
            m = re.match(r'### CHUỖI: (.+?)\s+\(', h)
            chain = m.group(1).strip() if m else None; continue
        if not h.startswith('#### '): continue
        title = h[5:].strip(); cond = None; part = None
        m = re.match(r'Phần (\w+) – (.+?)\s+\(điều kiện: (.+)\)\s*$', title)
        if m: part, title, cond = m.group(1), m.group(2).strip(), m.group(3).strip()
        body = blk.split('\n', 1)[1] if '\n' in blk else ''
        meta = re.search(r'^\*\(([^)]*)\)\*', body, re.M)
        emo, cat, place = (meta.group(1).split(' · ') + ['', '', ''])[:3] if meta else ('', '', '')
        main = body.split('**Ngươi có thể**')[0]
        paras = [p.strip() for p in main.split('\n\n') if p.strip() and not p.strip().startswith('*(')]
        rumor = None; intro = []
        for p in paras:
            if p.startswith('*Tin đồn*'): rumor = p.split('—', 1)[1].strip() if '—' in p else p
            else: intro.append(p)
        ch = []
        for lab, res in re.findall(r'^- \*\*(.+?)\*\*\s*→\s*(.+)$', body, re.M):
            ch.append({'l': lab.strip(), 't': res.strip()})
        out.append({'reg': reg, 'chain': chain, 'part': part, 'cond': cond, 'title': title, 'emo': emo.strip(), 'cat': cat.strip(), 'place': place.strip(),
                    'intro': ' '.join(intro), 'rumor': rumor, 'c': ch})
    return out


if __name__ == '__main__':
    E = tach(sys.argv[1])
    if len(sys.argv) > 2:
        g = int(sys.argv[2])
        for i, e in enumerate(E):
            if e['reg'] != g: continue
            tag = (e['chain'] + ' / P' + e['part']) if e['chain'] else 'LẺ'
            print(f"\n#{i} [{tag}] {e['title']} ({e['emo']} · {e['place']})" + (f" ĐK: {e['cond']}" if e['cond'] else ''))
            print('  ' + e['intro'])
            if e['rumor']: print('  ĐỒN: ' + e['rumor'])
            for j, c in enumerate(e['c']): print(f"  {j}. {c['l']} → {c['t']}")
    else:
        print(len(E), 'cảnh;', sum(len(e['c']) for e in E), 'lựa chọn')
