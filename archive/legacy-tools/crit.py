import sys
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
# chỉ số người chơi
rep("  s.crit=5+s.van*0.5+(fx.crit||0);","""  s.matk=Math.round(lerp(TAB.atk)*(1+((fx.matkP||0)+(fx.mpP||0)*0.4+(b.matkP||0))/100)*dq);
  s.crit=5+s.van*0.5+(fx.crit||0); s.critDmg=150+(fx.critDmg||0); s.hoTam=R0*2+(fx.hoTam||0);""")
rep("hp:r.hp,max:s.maxHp,mp:r.mp,maxMp:s.maxMp,atk:s.atk","realm:r.realm,matk:s.matk,critDmg:s.critDmg,hoTam:s.hoTam,hp:r.hp,max:s.maxHp,mp:r.mp,maxMp:s.maxMp,atk:s.atk")
rep("ne:en.ne||tp,hoi:en.hoi||cx,crit:5,","ne:en.ne||tp,hoi:en.hoi||cx,crit:5+reg*1.5+(en.elite?3:0)+(en.boss?5:0),critDmg:150,hoTam:reg*2+(en.elite?4:0)+(en.boss?8:0),realm:reg+(en.boss?1:0)+(en.elite?0.5:0),matk:Math.round(en.atk*f*0.85),")
rep("{id,side:'A',ctrl:'ai',ally:p.id,","{realm:r.realm,matk:Math.round(s.matk*m),critDmg:150,hoTam:s.hoTam,id,side:'A',ctrl:'ai',ally:p.id,")
# vật lý hay phép
rep("const SK_CHARGE=[","const SK_PHYS=['ngukiem','kimcham','duekim','canhkim','phanquang','vankiem','trutien','phongnhan','luuvan','tieudao','thaicuc','phanhuyet','huyetma','lacthach','transon','daidia','banco'];\nconst SK_CHARGE=[")
rep("  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0};});","  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0,dt:SK_PHYS.includes(id)?'vl':'phep'};});")
rep("const BASIC = {id:'_atk',n:'Xuất chiêu',el:'vo',t:0,c:0,fx:{p:1.0},f:''};","const BASIC = {id:'_atk',n:'Đánh thường',el:'vo',t:0,c:0,fx:{p:1.0},f:'',dt:'vl'};")
# né theo chỉ số
rep("""  const base=clamp(0.25+(def.ne-att.cx)*0.02,0.05,0.70);
  if(!isMain)return {p:base*0.5,q:null};
  if(off==='auto')return {p:clamp(base+0.20-0.10,0.02,0.95),q:'kha'};
  if(off==null||Math.abs(off)>0.25)return {p:clamp(base*0.4,0.02,0.95),q:null};
  if(Math.abs(off)<=0.09)return {p:clamp(base+0.45,0.02,0.95),q:'chuan'};
  return {p:clamp(base+0.20,0.02,0.95),q:'kha'};""","""  // tỉ lệ né dựa vào Né của bên bị đánh và Chính xác của bên đánh
  const base=clamp(0.35+(def.ne-att.cx)*0.025,0.05,0.80);
  if(!isMain)return {p:base*0.5,q:null};
  if(off==='auto')return {p:base*0.8,q:'kha'};
  if(off==null||Math.abs(off)>0.25)return {p:base*0.3,q:null}; // không nhấn né
  return {p:base,q:Math.abs(off)<=0.09?'chuan':'kha'};""")
# chí mạng và loại sát thương
rep("        const crit=chance(((u.crit||5)+(f.crit||0))/100);if(crit)mult*=1.6;\n        let d=dmgCalc(u.atk,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);",
    """        const magic=(sk.dt?sk.dt==='phep':(!isP&&(u.f==='quy'||u.f==='vat')));const av=magic?(u.matk||u.atk):u.atk;
        const crit=chance(((u.crit||5)+(f.crit||0))/100);if(crit){mult*=Math.max(1.1,((u.critDmg||150)-(t.hoTam||0))/100);crits++;}
        let d=dmgCalc(av,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);""")
rep("if(t._blk===1)d=Math.max(1,Math.round(d*(1-BLOCK_CUT)));}","if(t._blk===1)d=Math.max(1,Math.round(d*(1-blockCut(u,t))));}")
rep("  let total=0,hits=0,dod=0,blk=0,msg=sk.n;","  let total=0,hits=0,dod=0,blk=0,crits=0,msg=sk.n;")
rep("  if(dod)msg+=` · né ${dod}`;","  if(crits)msg+=' · chí mạng!';if(dod)msg+=` · né ${dod}`;")
rep("+(blk?' · ngươi đỡ được':'')","+(crits?' · chí mạng!':'')+(blk?' · ngươi đỡ được':'')")
rep("  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-BLOCK_CUT));}","  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-0.25));}")
rep("function endStance(sc,u,msg){","""// đỡ đòn: giảm khoảng 20–30%, tùy chênh lệch cảnh giới và lực chiến hai bên
function power(u){return Math.sqrt(Math.max(1,u.max)*Math.max(1,(u.atk+(u.matk||u.atk))/2+(u.def||0)));}
function blockCut(att,def){const rd=(def.realm||0)-(att.realm||0);return clamp(0.25+0.03*rd+0.08*Math.log(power(def)/power(att)),0.15,0.35);}
function endStance(sc,u,msg){""")
# chú thích, hiệu ứng mới
rep("const FXT={atkP:'⚔️ Công +{v}%',","const FXT={matkP:'🔮 Sát thương phép +{v}%',critDmg:'💥 Sát thương chí mạng +{v}%',hoTam:'🫀 Hộ tâm +{v}',atkP:'⚔️ Sát thương vật lý +{v}%',")
rep("crit:'🎯 Bạo kích +{v}%'","crit:'🎯 Tỉ lệ chí mạng +{v}%'")
rep("  if(f.p)L.push(`Sát thương ${Math.round(f.p*m*100)}% công`+(f.h?` × ${f.h} lần`:''));","  if(f.p)L.push(`Sát thương ${Math.round(f.p*m*100)}% ${sk.dt==='vl'?'sát thương vật lý':'sát thương phép'}`+(f.h?` × ${f.h} lần`:''));")
rep("  if(f.crit)L.push(`Bạo kích +${f.crit}%`);","  if(f.crit)L.push(`Tỉ lệ chí mạng +${f.crit}%`);")
rep("  {k:'dao',b:['Đao','Trảm Mã Đao','Đoản Đao'],fx:{atkP:7,crit:5}},","  {k:'dao',b:['Đao','Trảm Mã Đao','Đoản Đao'],fx:{atkP:7,crit:5,critDmg:10}},\n  {k:'hotam',b:['Hộ Tâm Phù','Hộ Tâm Ngọc','Hộ Tâm Kính'],fx:{hoTam:6,defP:5}},\n  {k:'phap',b:['Pháp Trượng','Phất Trần','Bảo Châu'],fx:{matkP:12}},")
rep("  {k:'nhan',b:['Nhẫn','Ban Chỉ'],fx:{van:3,crit:3}},","  {k:'nhan',b:['Nhẫn','Ban Chỉ'],fx:{van:3,crit:3,critDmg:8}},")
# bảng nhân vật
rep("    ${row('⚔️','Công',s.atk,'Sát thương gây ra')}${row('🛡️','Thủ',s.def,'Giảm sát thương nhận vào')}",
    "    ${row('⚔️','Sát thương vật lý',s.atk,'Dùng cho đánh thường và kiếm pháp, quyền cước')}${row('🔮','Sát thương phép',s.matk,'Dùng cho pháp thuật')}\n    ${row('🛡️','Thủ',s.def,'Giảm sát thương nhận vào')}${row('🎯','Tỉ lệ chí mạng',Math.round(s.crit)+'%','Dùng chung cho đòn vật lý và đòn phép')}\n    ${row('💥','Sát thương chí mạng',s.critDmg+'%','Đòn chí mạng gây sát thương bằng chừng này phần trăm')}${row('🫀','Hộ tâm',s.hoTam,'Giảm sát thương chí mạng nhận vào (mỗi điểm bớt 1%)')}")
rep("${row('🍀','Khí vận',s.van,'Bạo kích '+Math.round(s.crit)+'%, may mắn')}","${row('🍀','Khí vận',s.van,'Tăng tỉ lệ chí mạng, may mắn')}")
rep("'Đỡ đòn: như tụ lực, đứng ở mốc 75 chờ đối thủ ra đòn.\\nBị đánh: giảm 60% sát thương,","'Đỡ đòn: như tụ lực, đứng ở mốc 75 chờ đối thủ ra đòn.\\nBị đánh: giảm khoảng 20–30% sát thương (tùy cảnh giới và lực chiến),")
rep("const STI={stance:['盾','Thủ thế đỡ đòn: đứng chờ đòn, giảm 60% sát thương, tốn 30% thể lực'],","const STI={stance:['盾','Thủ thế đỡ đòn: đứng chờ đòn, giảm khoảng 20–30% sát thương, tốn 30% thể lực'],")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
