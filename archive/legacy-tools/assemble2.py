import sys,re
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
def cut(a,b,new):
    global s
    i=s.index(a); j=s.index(b,i)
    s=s[:i]+new+s[j:]
cut('// ---------------- CHIẾN ĐẤU ----------------','// ---------------- THƯỞNG ----------------',open('build/combat.js',encoding='utf-8').read()+'\n'+open('build/bt.js',encoding='utf-8').read()+'\n')
# bỏ doBreak cũ và btChance cũ
cut('function doBreak(sc){','function teaHouse(n){','')
i=s.index('function btChance(){\n  const r=G.run,s=S();\n  let p=[0.62');j=s.index('\n}\n',i)+3;s=s[:i]+s[j:]
rep("    case 'bt':{if(!doBreak(sc))return;return;}","    case 'bt':{openPrep(n);return;}")
rep("if(r.tv>=100&&r.realm<4)add('bt','🌕','Đột phá '+REALM[r.realm+1],HM,'Cần ở động phủ, tu vi viên mãn.\\nThất bại: trọng thương, mất tu vi',false,'🌕'+Math.round(btChance()*100)+'%');",
    "if(canBreak())add('bt','🌕',r.realm>=4?'Độ kiếp phi thăng':'Đột phá '+REALM[r.realm+1],HM,'Cần ở động phủ, tu vi viên mãn.\\nChuẩn bị vật phẩm, xung quan, rồi vượt thiên kiếp nếu có.',false,'🌕'+Math.round(btChance()*100)+'%');")
# S(): phẩm chất, chỉ số mới
rep("  const dq=r.realm>=2?[1,1.05,1.12,1.25][r.danQ||0]:1;","  const dq=qMulAll(r); // hệ số phẩm chất nhân dồn, chỉ nhân ở đây")
rep("  s.crit=5+s.van*0.5+(fx.crit||0); s.dodge=Math.min(40,s.tp*0.8+(fx.dodge||0));\n  s.life=Math.round(LIFE[R0]*(1+(fx.lifeP||0)/100)+r.lifeAdj);",
    "  s.crit=5+s.van*0.5+(fx.crit||0);\n  s.cx=10+2*R0; s.ne=s.tp+Math.round((fx.dodge||0)*0.5); s.hoi=10+2*R0;\n  s.life=Math.round(LIFE[R0]*(1+(fx.lifeP||0)/100+QLIFE[(r.quality||[])[R0]||0]/100)+r.lifeAdj);")
rep("function realmLabel(){return REALM[G.run.realm]+' '+TIEU[tieu()];}","function realmLabel(){const r=G.run;return qualName(r.realm,(r.quality||[])[r.realm]||0)+' '+TIEU[tieu()];}")
rep("lifeAdj:0,btFail:0,danQ:0,","lifeAdj:0,btFail:0,daoSk:0,daoPill:0,")
# đan dược trong trận dùng đơn vị nhân vật
rep("    case 'baohuyet':sc.ps.rage=(sc.ps.rage||0)+x;break;\n    case 'kimcang':sc.ps.block=(sc.ps.block||0)+Math.round(s.maxHp*x/100);break;\n    case 'loiphu':{const d=hitEnemy(s.atk*x/100,'loi',{});msg+=': '+d;break;}\n    case 'giaidoc':if(sc&&sc.ps){sc.ps.poison=0;sc.ps.burn=0;}r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;",
"""    case 'baohuyet':{const me=mainUnit(sc);me.st.rage=(me.st.rage||0)+x;break;}
    case 'kimcang':{const me=mainUnit(sc);me.st.block=(me.st.block||0)+Math.round(s.maxHp*x/100);break;}
    case 'loiphu':{const t=alive(sc,'B').filter(u=>!u.immune).sort((a,b)=>a.hp-b.hp)[0];if(t){let d=Math.max(s.atk*x/100*0.25,s.atk*x/100-t.def*0.7);if(t.st.vuln)d*=1.3;if(KHAC.loi===t.el)d*=1.5;d=absorb(t.st,Math.round(d));t.hp-=d;msg+=': '+d;if(t.hp<=0){down(sc,t);checkEnd(sc);}}break;}
    case 'giaidoc':if(sc&&sc.type==='combat'){const me=mainUnit(sc);me.st.poison=0;me.st.burn=0;}r.hp=Math.min(s.maxHp,r.hp+s.maxHp*x/100);break;""")
rep("    case 'khaitri':r.bon.ngo+=x;break;","    case 'khaitri':r.bon.ngo+=x;break;\n    case 'linhnhu':break;")
rep("  r.hp=Math.round(r.hp);r.mp=Math.round(r.mp);clampHp();\n  return msg;","  if(p.dao){const g=addDao(p.dao,'pill');if(g)msg+=' (đạo cơ +'+g+')';}\n  r.hp=Math.round(r.hp);r.mp=Math.round(r.mp);clampHp();\n  return msg;")
# vật phẩm đột phá
rep("  phacanh:{n:'Phá Cảnh Đan',i:'🌕',x:15,d:'Lần đột phá tới +{x}%',w:'bt',p:55},","""  phacanh:{n:'Phá Cảnh Đan',i:'🌕',x:15,d:'Đặt vào ô chuẩn bị: đột phá +{x}%',w:'bt',p:55,bt:{rate:15}},
  homach:{n:'Hộ Mạch Đan',i:'🛡️',x:0,d:'Hộ mệnh: thất bại không mất tu vi, không trọng thương; gục giữa kiếp vẫn sống',w:'bt',p:70,bt:{guard:1}},
  bode:{n:'Bồ Đề Tử',i:'📿',x:0,d:'Hộ mệnh khi đột phá, giữ mạng khi gục giữa kiếp',w:'bt',p:90,bt:{guard:1}},
  tiloi:{n:'Tị Lôi Phù',i:'🪬',x:0,d:'Trợ kiếp: bớt một đạo lôi',w:'bt',p:65,bt:{kiepCut:1}},
  duongnguyen:{n:'Dưỡng Nguyên Đan',i:'🍵',x:20,d:'Trợ kiếp: vào kiếp được hộ thể {x}% khí huyết',w:'bt',p:50,bt:{kiepHp:20}},
  thiendao:{n:'Thiên Đạo Quả',i:'🍎',x:4,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:140,bt:{dao:4}},
  diamach:{n:'Địa Mạch Linh Nhũ',i:'🥛',x:3,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:100,bt:{dao:3}},
  nhanhoang:{n:'Nhân Hoàng Thảo',i:'🌿',x:2,d:'Phẩm chất: đạo cơ +{x} khi đột phá',w:'bt',p:70,bt:{dao:2}},
  linhnhu:{n:'Linh Nhũ Ngưng Thần',i:'💧',x:2,d:'Đạo cơ +{x} (tối đa 4 điểm mỗi cảnh giới từ đan dược)',w:'any',p:60,dao:2},""")
for k in ['trucco','ngungkim','phaanh','hoathan']:
    rep(f"  {k}:{{n:",f"  {k}:{{bt:{{rate:30}},n:")
rep("d:'Đột phá Trúc Cơ +{x}%'","d:'Đặt vào ô chuẩn bị: đột phá Trúc Cơ +{x}%'")
rep("taytuy:{n:'Tẩy Tủy Đan',","taytuy:{dao:1,n:'Tẩy Tủy Đan',")
rep("khaitri:{n:'Khai Trí Đan',","khaitri:{dao:1,n:'Khai Trí Đan',")
rep("function rollPill(){const r=G.run;const pool=['hoixuan','hoixuan','tukhi','baohuyet','kimcang','loiphu','giaidoc','thanhanh','dinhthan','tinhnguyen'];",
    "function rollPill(){const r=G.run;const pool=['hoixuan','hoixuan','tukhi','baohuyet','kimcang','loiphu','giaidoc','thanhanh','dinhthan','tinhnguyen','linhnhu'];if(chance(.25))pool.push(pick(['homach','tiloi','duongnguyen','nhanhoang','diamach','thiendao','bode']));")
rep("${p.w==='combat'?'Dùng trong trận':p.w==='bt'?'Tự dùng khi đột phá':'Dùng bất cứ lúc nào'}","${p.w==='combat'?'Dùng trong trận':p.w==='bt'?'Đặt vào ô chuẩn bị đột phá':'Dùng bất cứ lúc nào'}${p.dao?'\\nĐạo cơ +'+p.dao:''}")
# công pháp: tụ lực, đánh cả phe, đạo
rep("SK_RAW.forEach(([id,n,el,t,c,fx,f])=>SK[id]={id,n,el,t,c,fx,f});","""const SK_CHARGE=['cuutieu','thienha','banco','thienphat','phanthien','daidia','voluong'];
const SK_AOE=['vankiem','trutien','lietdiem','docchuong','phanthien','nhiephon','bangphong'];
const SK_DAO=['vankiem','truongsinh','tammuoi','daibi','trutien','vanco','tieudao','thaicuc'];
SK_RAW.forEach(([id,n,el,t,c,fx,f])=>{fx=Object.assign({},fx);
  if(SK_CHARGE.includes(id)){fx.charge=true;if(fx.p)fx.p=Math.round(fx.p*1.35*100)/100;}
  if(SK_AOE.includes(id))fx.aoe=true;
  SK[id]={id,n,el,t,c,fx,f,dao:SK_DAO.includes(id)?1:0};});""")
rep("  if(r.skills.length<4){r.skills.push({id,lv:1});log(`Lĩnh ngộ ${sk.n}.`);return chip('📖',sk.n,skillTip(sk,1),'item');}",
    "  if(r.skills.length<4){r.skills.push({id,lv:1});log(`Lĩnh ngộ ${sk.n}.`);if(sk.dao&&addDao(3,'skill'))log('Đạo cơ +3.');return chip('📖',sk.n+(sk.dao?' ☯':''),skillTip(sk,1),'item');}")
rep("  if(f.selfHp)L.push(`Tốn ${f.selfHp}% khí huyết`);if(f.bonusIf)L.push('+50% nếu địch đang trúng độc hoặc thiêu');",
    "  if(f.selfHp)L.push(`Tốn ${f.selfHp}% khí huyết`);if(f.bonusIf)L.push('+50% nếu địch đang trúng độc hoặc thiêu');\n  if(f.charge)L.push('⏳ Tụ lực: đứng chờ ở mốc 75 tới khi mọi kẻ địch ra tay');if(f.aoe)L.push('🌐 Đánh cả phe địch (60% uy lực)');if(sk.dao)L.push('☯ Học được: đạo cơ +3');\n  L.push('Độ nặng ×'+String(skRec(sk)).replace('.',','));")
rep("if(f.weak)L.push(`🥀 Suy nhược ${f.weak} lượt`);if(f.vuln)L.push(`💔 Phá giáp ${f.vuln} lượt`);","if(f.weak)L.push(`🥀 Suy nhược ${f.weak} vòng`);if(f.vuln)L.push(`💔 Phá giáp ${f.vuln} vòng`);")
rep("if(f.regen)L.push(`🌱 Hồi xuân ${f.regen} lượt`);","if(f.regen)L.push(`🌱 Hồi xuân ${f.regen} vòng`);")
rep("  if(f.stun)L.push(`💫 ${f.stun}% gây choáng`);","  if(f.stun)L.push(`💫 ${f.stun}% gây choáng 2 giây`);")
# e.dao
rep("  if(e.lore){const c=gainLore(e.lore);if(c)ch.push(c);}","  if(e.lore){const c=gainLore(e.lore);if(c)ch.push(c);}\n  if(e.dao){const g=addDao(e.dao,'ev');if(g)ch.push(chip('☯️','đạo cơ +'+g,'Điểm đạo cơ: quyết định phẩm chất khi đột phá','up'));}")
# thủ lĩnh cuối: phi thăng thay thế
rep("""    {id:'thienkiep',i:'⚡',n:'Cửu Trùng Lôi Kiếp',sub:'Thiên đạo khảo nghiệm',el:'loi',pat:['atk','multi','stun','charge','heavy','rage','multi','charge','heavy'],hp:5.5,atk:1.25,def:1.2,esc:1,
      t:['Mây kiếp kéo đến từ bốn phương, xoáy thành một con mắt khổng lồ ngay trên đỉnh đầu ngươi. Thiên đạo đang nhìn.','Trời đất im bặt. Rồi đạo sét đầu tiên giáng xuống, to như cột chống trời.']},""",
"""    {id:'thumon',i:'🗿',n:'Thủ Môn Thiên Tướng',sub:'Kẻ giữ cửa trời',el:'kim',pat:['atk','multi','stun','charge','heavy','rage','block'],hp:5.2,atk:1.25,def:1.3,esc:1,
      t:['Một pho tượng đá cao trăm trượng đứng chắn cổ lộ. Khi ngươi tới gần, đôi mắt đá từ từ mở ra.','“Vạn năm qua, chưa ai qua được cửa này.” Giọng nói vang lên từ trong đá, nặng như núi.']},""")
rep("function rewardContinue(){const r=G.run,sc=r.scene;if(sc.kind==='boss'&&r.region>=4){victory();return;}endScene();}","function rewardContinue(){endScene();}")
rep("  if(kind==='boss'&&r.region<4&&!r.passes.includes(r.region+1)){","  if(kind==='boss'&&r.region>=4){chips.push(chip('☁️','cửa trời mở','Đạt Hóa Thần viên mãn, độ kiếp ở động phủ để phi thăng','item'));const p=gainPill('thiendao',2);if(p)chips.push(p);}\n  if(kind==='boss'&&r.region<4&&!r.passes.includes(r.region+1)){")
# chết vì thiên kiếp
rep("  else if(cause==='tamma')end=`Năm ${age} tuổi, ${r.ten} tẩu hỏa nhập ma.`;","  else if(cause==='tamma')end=`Năm ${age} tuổi, ${r.ten} tẩu hỏa nhập ma.`;\n  else if(cause==='kiep')end=`Năm ${age} tuổi, ${r.ten} tan thành tro bụi dưới lôi kiếp ở ${r.place.n}.`;")
rep("{combat:'Tử trận',toahoa:'Tọa hóa',tamma:'Tẩu hỏa nhập ma',","{combat:'Tử trận',kiep:'Hồn phi phách tán',toahoa:'Tọa hóa',tamma:'Tẩu hỏa nhập ma',")
rep("const life={k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:REALM[r.maxRealm],","const life={k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:qualName(r.maxRealm,(r.quality||[])[r.maxRealm]||0),")
rep("ds.push({i:-1,ten:r.ten,realm:r.realm,sc:r.realm*100+r.tv*0.9});","ds.push({i:-1,ten:r.ten,realm:r.realm,q:(r.quality||[])[r.realm]||0,sc:r.realm*100+r.tv*0.9});")
rep("const SAVE_V=1;","const SAVE_V=2;")
rep("function newMeta(){return {v:SAVE_V,","function newMeta(){return {opt:{},v:SAVE_V,")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
