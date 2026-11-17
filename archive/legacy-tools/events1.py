import re,sys
s=open('phu-sinh.html',encoding='utf-8').read()
a=s.index('// ================= SỰ KIỆN 1'); b=s.index('// ================= GIAO DIỆN')
ev=s[a:b]
n0=len(re.findall(r'\bage:(\.?[0-9][0-9.]*)',ev))
ev=re.sub(r'\bage:(\.?[0-9][0-9.]*)',lambda m:'h:%d'%round(float(m.group(1))*720),ev)
print('đổi e.age -> e.h:',n0)
def tag(i,extra):
    global ev
    k="ev({id:'%s',"%i
    if ev.count(k)!=1: sys.exit('thiếu '+i)
    ev=ev.replace(k,k+extra)
for i in ['lao_gia','thuong_doan','ke_bi_duoi','thi_the','bi_cuop','yeu_toc']: tag(i,"src:'road',")
tag('thien_kieu',"src:'ent:thienkieu',")
tag('bao_oan',"src:'ent:truysat',")
for i in ['bi_canh','sao_roi']: tag(i,"src:'ent:di',")
tag('dau_gia',"src:'ent:dauGia',")
tag('thuy_quy',"when:{part:['toi','dem']},")
tag('chuong_xac',"when:{part:['dem']},")
tag('thuyen_ma',"when:{part:['dem']},")
tag('quy_thi',"when:{part:['dem']},")
tag('hoi_den',"when:{season:['xuan']},")
tag('tuyet_son',"when:{season:['dong']},")
ev=ev.replace("r.step-s.s>=4","G.meta.world.t-(s.at||0)>=HM")
assert "r.step" in ev
ev=ev.replace("r.step>=3","r.evDone>=3")
assert "r.step" not in ev, 'còn r.step'
s=s[:a]+ev+s[b:]
open('phu-sinh.html','w',encoding='utf-8').write(s)
