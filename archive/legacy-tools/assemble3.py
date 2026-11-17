import sys
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
# chèn lõi thế giới sống và sự kiện mới
rep("// lưu (được UI gán)",open('build/world3.js',encoding='utf-8').read()+"\n// lưu (được UI gán)")
rep("// ================= GIAO DIỆN",open('build/events3.js',encoding='utf-8').read()+"\n// ================= GIAO DIỆN")
# hiệu ứng mới
rep("  if(e.flag) r.flags[e.flag]=1;","""  if(e.flag) r.flags[e.flag]=1;
  if(e.shop)r.goShop=1;
  if(e.dropPill&&r.pills.length){const i=Math.floor(R()*r.pills.length);const p=r.pills.splice(i,1)[0];ch.push(chip(PILL[p.id].i,'mất '+PILL[p.id].n,'Đã trao đi','dn'));}
  if(e.party&&v&&v[e.party.k]){const c=addParty(v[e.party.k],e.party.days);if(c)ch.push(c);}
  if(e.partyRv&&v&&v.rv){const c=addParty({ten:v.rv.ten,g:v.rv.hn==='nàng'?'nu':'nam'},e.partyRv,0.9);if(c)ch.push(c);}
  if(e.partyP&&v&&v.p){const c=addParty({ten:v.p.ten,g:'nam'},e.partyP,0.7);if(c)ch.push(c);}
  if(e.entGone&&v&&v.eid!=null){const x=W().ents.find(z=>z.id===v.eid);if(x)removeEnt(x);}
  if(e.patronDone&&v&&v.pn!=null){const n=nodeById(v.pn);if(n)n.patron=null;}
  if(e.graveItems&&v){graveTake(v).forEach(c=>ch.push(c));}""")
rep("function endScene(){\n  const r=G.run;if(!r)return;const sc=r.scene;const back=sc&&sc.back!=null?sc.back:null;\n  r.lastBack=back;r.scene=null;",
    "function endScene(){\n  const r=G.run;if(!r)return;const sc=r.scene;const back=sc&&sc.back!=null?sc.back:null;\n  r.lastBack=back;r.scene=null;\n  if(r.goShop){r.goShop=0;openShop(null);r.scene.back=back;return;}")
# đi đường: gặp thực thể, nhiệm vụ
rep("      m.seg++;m.prog=0;arrive(b);ch=true;\n      if(m.seg>=m.path.length-1)r.moving=null;\n      roadRoll(a,b);",
    "      m.seg++;m.prog=0;arrive(b);ch=true;\n      if(m.seg>=m.path.length-1)r.moving=null;\n      questArrive(b);\n      if(!entMeetAt(b,a))roadRoll(a,b);")
rep("      if(CACHE_ON&&n.cache&&n.cache.items&&n.cache.items.length){findCache(n);return;}","      if(CACHE_ON&&n.cache&&n.cache.items&&n.cache.items.length){findCache(n);return;}\n      if(questExplore(n))return;")
rep("  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node'});return;}","  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node',quest:sc.quest});return;}")
rep("  const chips=applyE({tv:base.tv,st:base.st+ri(-3,4)});","  const chips=applyE({tv:base.tv,st:base.st+ri(-3,4)});\n  {const af=r.scene&&r.scene.after;if(af&&af.quest)questWin(af.quest).forEach(c=>chips.push(c));}")
# mô phỏng thô: dọn thực thể, sinh lại
rep("    if(m>0)worldCoarse(m);","    if(m>0){worldCoarse(m);worldCoarseEnts();if(G.run)director();}")
# thiên kiêu già đi; tin đồn kiếp trước
rep("    const wr=w.rivals[rv.i];\n    rv.prog+=","    const wr=w.rivals[rv.i];rv.age=(rv.age||18)+dy;\n    rv.prog+=")
rep("  if(chance(Math.min(.6,dy*0.06))){const rv=pick(r.rivals);pushNews(T(RUMOR.the,rumorV(rv)));}","  if(chance(Math.min(.6,dy*0.06))){if(chance(.12)){const k=rumorKiep();if(k){pushNews(k);return;}}const rv=pick(r.rivals);pushNews(T(RUMOR.the,rumorV(rv)));}")
rep("    rivals:G.meta.world.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,rel:0,fate:null})),",
    "    rivals:(G.meta.world.rstate||G.meta.world.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:18}))).map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,rel:0})),")
rep("    w.regions=[0,1,2,3,4].map(k=>seeded(seed+':r'+k,()=>genRegion(k,w)));return w;});",
    "    w.regions=[0,1,2,3,4].map(k=>seeded(seed+':r'+k,()=>genRegion(k,w)));w.rstate=w.rivals.map((x,i)=>({i,realm:0,prog:ri(10,60),alive:true,age:ri(16,22)}));return w;});")
# kiếp mới: kẻ thù truyền kiếp thành hạt giống oán
rep("  G.birth=null;G.screen='map';G.meta.world.lastBirth=c.at;","""  for(const L of (G.meta.world.legacy||[]))if(L.feud&&!L.used&&chance(.5)){L.used=1;r.seeds.push({t:'oan',ten:L.ten,hn:L.hn,d:L.d+' (kiếp trước, khi ngươi còn là '+L.who+')',r:0,at:G.meta.world.t-60*HD});}
  G.birth=null;G.screen='map';G.meta.world.lastBirth=c.at;""")
# chết: mộ, ân oán, năm tháng, thế hệ
rep("  fogToMemory();\n  G.run=null;G.screen='over';saveSoon();","  life.y=tYear(W().t);if(r.bossKills)life.hero='hạ '+r.bossKills+' thủ lĩnh';else if(r.bangTop)life.hero='đứng đầu Thiên Kiêu Bảng';\n  fogToMemory();\n  G.run=null;afterlife(r,cause,info);G.over.gap=G.lastGap;G.screen='over';saveSoon();")
rep("if(me===0){ach('bang1');","if(me===0){ach('bang1');r.bangTop=1;")
# sự kiện cũ chỉnh nguồn
rep("ev({id:'mo_kiep_truoc',n:'Nấm mộ quen',spec:1,once:1,cond:r=>G.meta.last&&G.meta.last.grave&&r.region<=G.meta.last.grave.r&&r.kiep>1,v:()=>({g:G.meta.last.grave}),",
    "ev({id:'mo_kiep_truoc',n:'Nấm mộ quen',spec:1,cond:()=>false,v:r=>{const n=nodeById(r.at);return {g:n.grave||{ten:'vô danh',tuoi:'?'},gnode:n.id};},")
rep("e:{relic:'mocu',st:30,karma:-2,lore:'luan_hoi'}","e:{graveItems:1,relic:'mocu',st:10,karma:-2,lore:'luan_hoi'}")
rep("ev({id:'no_kiep_truoc',n:'Nợ kiếp trước',spec:1,once:1,cond:r=>{const k=G.meta.last&&G.meta.last.killer;return k&&r.kiep>1&&r.region>=Math.min(k.r,3)&&r.evDone>=3;},\n v:()=>{const k=G.meta.last.killer;return {k:k.n,kk:k.k==='boss'?'kiemtu':k.k,ki:k.i};},",
    "ev({id:'no_kiep_truoc',src:'ent:truysat',n:'Nợ kiếp trước',spec:1,cond:()=>!!W().nemesis,\n v:()=>{const k=W().nemesis;return {k:k.n,kk:k.k==='boss'||!EN[k.k]?'kiemtu':k.k,ki:k.i,km:1.25+0.15*(k.lv||1)};},")
rep("fight:{n:'{$k}',m:1.25,elite:1,nem:1},win:{t:'Nợ cũ đã trả.","fight:{n:'{$k}',mv:'km',elite:1,nem:1},win:{t:'Nợ cũ đã trả.")
rep("e:{tv:10,tamma:-15,ach:'baothu',relic:1}}}","e:{tv:10,tamma:-15,ach:'baothu',relic:1,nemDone:1}}}")
rep("  if(e.entGone&&v&&v.eid!=null)","  if(e.nemDone)W().nemesis=null;\n  if(e.entGone&&v&&v.eid!=null)")
# gặp thực thể loại khác dùng chung pool; dị tượng theo dk
rep("  else if(e.type==='truysat')id=e.data.nem?'no_kiep_truoc':(r.seeds.some(s=>s.t==='oan')?'bao_oan':null);\n  else{const L=EVS.filter(x=>x.src==='ent:'+e.type&&",
    "  else if(e.type==='truysat'&&e.data.nem)id='no_kiep_truoc';\n  if(!id){const L=EVS.filter(x=>x.src==='ent:'+e.type&&(e.type!=='di'||!x.dk||x.dk===e.data.k)&&(e.type!=='truysat'||x.id!=='no_kiep_truoc')&&")
rep("  if(e.type==='di')id=DI_K[e.data.k].ev;","  if(e.type==='di'&&chance(.6))id=DI_K[e.data.k].ev;")
rep("const SAVE_V=2;","const SAVE_V=3;")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
