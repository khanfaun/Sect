"""Xuất bản đọc Excel từ nguồn chuẩn; tệp xuất không phải nguồn để build."""
import json, csv, sys
from pathlib import Path
from openpyxl import Workbook
from openpyxl.styles import Font, PatternFill, Alignment
root=Path(__file__).resolve().parents[1]
read=lambda p:json.loads((root/p).read_text())
out=Path(sys.argv[1]) if len(sys.argv)>1 else root/'work/content-review.xlsx'
out.parent.mkdir(parents=True,exist_ok=True)
w=Workbook();w.remove(w.active)

def sheet(name,headers,rows):
 s=w.create_sheet(name);s.append(headers)
 for row in rows:s.append([str(x)[:32760] if isinstance(x,(dict,list)) else x for x in row])
 s.freeze_panes='A2';s.auto_filter.ref=s.dimensions
 for c in s[1]:c.fill=PatternFill('solid',fgColor='254B45');c.font=Font(bold=True,color='FFFFFF')
 for row in s.iter_rows(min_row=2):
  for c in row:c.alignment=Alignment(vertical='top',wrap_text=True)
 for col in s.columns:
  letter=col[0].column_letter;s.column_dimensions[letter].width=min(70,max(16,max(len(str(c.value or '')) for c in list(col)[:80])//2))
 return s
all=[dict(e,file=p) for p in read('content/events/manifest.json')['files'] for e in read(p)['events']]
sheet('Bắt đầu',['Mục','Giá trị'],[['Ngày','17/11/2026'],['Nguồn truyện','8b9c479'],['Luật nền','d9ab301'],['Tổng tương tác',len(all)],['Kho EVS',349],['Chuỗi',20],['Hướng dẫn','docs/content/GUIDELINE.md'],['Sửa dữ liệu','Sửa nguồn content/, không sửa tệp xuất này để build.'],['Reference','Dữ liệu dự trữ chưa nối sự kiện trao/thu.'],['Giới hạn','Bảng kiểm xác nhận bất biến và tham chiếu; cân bằng dài hạn cần thử chơi riêng.']])
sheet('Tất cả tương tác',['ID','Tên','Loại','Chủ đề','Cảm xúc','Nguồn kích hoạt','Nơi','Bậc nội dung','Buổi-mùa','Chuỗi','Bối cảnh','Văn mở','Lựa chọn','Nguồn chuẩn'],[[e['id'],e['name'],e['kind'],e.get('theme'),e.get('emotion'),e['trigger']['source'],', '.join(e['trigger']['places']),str(e['trigger']['levels']),json.dumps(e['trigger']['time'],ensure_ascii=False),json.dumps(e.get('chain',{}),ensure_ascii=False),e.get('setting',{}).get('description'),json.dumps(e['text'],ensure_ascii=False),json.dumps(e['choices'],ensure_ascii=False),e['file']] for e in all])
for k in read('content/catalog/manifest.json')['collections']:
 a=read('content/catalog/'+k+'.json')
 if not isinstance(a,list):continue
 sheet(k,['ID','Tên','Trạng thái','Yêu cầu/loại','Thông tin đầy đủ','Nguồn chuẩn'],[[x['id'],x.get('n') or ' / '.join(x.get('nb',[])),x.get('status','active'),str({f:x[f] for f in ['k','type','t','req','realm','minUserLevel','reg','regs'] if f in x}),json.dumps(x,ensure_ascii=False),'content/catalog/'+k+'.json'] for x in a])
for key,name in [('catalog-audit','Kiểm từng ID'),('event-audit','Kiểm từng tương tác')]:
 with (root/('docs/content/reports/'+key+'.csv')).open(encoding='utf-8-sig') as f:
  a=list(csv.DictReader(f));sheet(name,list(a[0]),[list(x.values()) for x in a])
for key in ['catalog-changes','semantic-changes','location-changes','combat-changes']:
 a=read('docs/content/reports/'+key+'.json');sheet(key[:31],['ID','Nhóm','Chi tiết'],[[x.get('id'),x.get('kind'),json.dumps(x,ensure_ascii=False)] for x in a])
sheet('Sửa luật nội dung',['Phần','Thay đổi'],[[x['area'],x['change']] for x in read('docs/content/reports/runtime-fixes.json')])
birth=read('docs/content/reports/birth-changes.json')
sheet('Khí vận-Thể chất',['Loại','ID','Tên','Tác dụng đã rà'],[[x['kind'],x['id'],x['name'],x['description']] for x in birth['descriptions']])
sheet('Trường nhập đã bỏ',['Loại','ID','Trường','Giá trị','Lý do'],[[x['kind'],x['id'],x['field'],x['value'],x['reason']] for x in birth['removed']])
sheet('Sổ nguồn bảng nền',['Bảng','Nhóm','Nguồn chính','Nơi xử lý'],[[', '.join(x['symbols']),x['category'],x['file'],x['original']] for x in read('content/manifest.json')['tables']])
w.save(out);print(out)
