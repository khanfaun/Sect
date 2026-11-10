import sys
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
# ---- lõi: thể lực, đỡ đòn, qua lượt
rep("const WAIT_SK={id:'_wait',n:'Đứng yên',","""const TL_DODGE=25,TL_BLOCK=30,TL_REGEN=20,BLOCK_CUT=0.6;
const BLOCK_SK={id:'_block',n:'Đỡ đòn',el:'vo',t:0,c:0,fx:{stance:1},f:'',rec:.8};
const WAIT_SK={id:'_wait',n:'Qua lượt',""")
rep("skills:r.skills.map(x=>({id:x.id,lv:x.lv})),st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0};\n}",
    "skills:r.skills.map(x=>({id:x.id,lv:x.lv})),st:{},pos:0,phase:'run',pending:null,waitSet:[],stunT:0,rec:1,chargeT:0,tl:100};\n}")
rep("if(id==='_wait')return {sk:WAIT_SK,lv:1};","if(id==='_wait')return {sk:WAIT_SK,lv:1};if(id==='_block')return {sk:BLOCK_SK,lv:1};")
# hồi thể lực khi về mốc 0
rep("  if(u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*(0.05+(fx.regenMp||0)/100)));",
    "  if(u.maxMp)u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*(0.05+(fx.regenMp||0)/100)));\n  if(u.tl!=null)u.tl=Math.min(100,u.tl+TL_REGEN);")
# tư thế đỡ hết khi tới lượt mình hành động
rep("function beginSkill(sc,u,sk,lv,tid){\n  const cost=skillCost(sk);","function beginSkill(sc,u,sk,lv,tid){\n  const cost=skillCost(sk);u.st.stance=0;")
rep("  if(f.guard){","  if(f.stance){u.st.stance=1;msg='Thủ thế đỡ đòn';}\n  if(f.guard){")
# né tốn thể lực: chỉ tính lần nhấn khi còn đủ
rep("    const tg=d.tids.map(i=>U_(sc,i)).filter(x=>x&&x.hp>0);","""    const me=mainUnit(sc);if(Array.isArray(offs))offs=offs.map(o=>{if(o==null)return null;if(me.tl>=TL_DODGE){me.tl-=TL_DODGE;return o;}return null;});
    const tg=d.tids.map(i=>U_(sc,i)).filter(x=>x&&x.hp>0);""")
rep("  resolveSkill(sc,u,sk,lv,tg,qm,autoD?'auto':null);\n}","  let ao=autoD?'auto':null;if(ao&&tg.includes(me)&&u.side==='B'){if(me.tl>=TL_DODGE)me.tl-=TL_DODGE;else ao=[];}\n  resolveSkill(sc,u,sk,lv,tg,qm,ao);\n}")
# đỡ thành công: giảm sát thương, tốn 30% thể lực (một lần mỗi đòn)
rep("        let d=dmgCalc(u.atk,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);\n        d=absorb(t.st,d);",
    "        let d=dmgCalc(u.atk,u.st.rage,u.st.weak,t.def,t.st.vuln,f.p,mult,f.pierce);\n        if(t.st.stance){if(!t._blk){if((t.tl==null?100:t.tl)>=TL_BLOCK){if(t.tl!=null)t.tl-=TL_BLOCK;t._blk=1;blk++;}else t._blk=2;}if(t._blk===1)d=Math.max(1,Math.round(d*(1-BLOCK_CUT)));}\n        d=absorb(t.st,d);")
rep("  let total=0,hits=0,dod=0,msg=sk.n;","  let total=0,hits=0,dod=0,blk=0,msg=sk.n;for(const t of tg)t._blk=0;")
rep("  if(dod)msg+=` · né ${dod}`;","  if(dod)msg+=` · né ${dod}`;if(blk)msg+=' · bị đỡ';")
rep("+(dod?' (né '+dod+')':'')+(f.p&&!total&&!dod?' · bị chặn':'');","+(dod?' (né '+dod+')':'')+(blk?' · ngươi đỡ được':'')+(f.p&&!total&&!dod?' · bị chặn':'');")
rep("  let d=Math.round(me.max*(0.14+0.03*i)*K.uy);K.uy=1;","  let d=Math.round(me.max*(0.14+0.03*i)*K.uy);K.uy=1;\n  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-BLOCK_CUT));}")
# ô kỹ năng tấn công do người chơi chọn
rep("function needTarget(sc,id){","function atkSlots(){const r=G.run;const at=r.skills.filter(k=>SK[k.id].fx.p).map(k=>k.id);let L=(r.atkSlots||[]).filter(id=>at.includes(id));for(const id of at){if(L.length>=3)break;if(!L.includes(id))L.push(id);}return L.slice(0,3);}\nfunction defSkills(){return G.run.skills.filter(k=>!SK[k.id].fx.p).map(k=>k.id);}\nfunction toggleAtkSlot(id){const r=G.run;let L=atkSlots();if(L.includes(id))L=L.filter(x=>x!==id);else{if(L.length>=3)L.shift();L.push(id);}r.atkSlots=L;}\nfunction needTarget(sc,id){")
# ---- giao diện
i=s.index("      h+='<div class=\"skills\">';\n      const btn=(id,sk,lv)")
j=s.index("    }\n  } else h+=`<p class=\"hint cwait\">")
s=s[:i]+r"""      const btn=(id,sk,lv,tip)=>{const c=skillCost(sk);const no=me.mp<c;return `<button class="sk" data-act="skill" data-arg="${id}"${no?' disabled':''}${ta(tip||skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn">${esc(sk.n)}${sk.fx.charge?' ⏳':''}${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}</span><small>${c?'💧'+c:''}</small></button>`;};
      const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');const m=UI.menu;
      const back='<button class="sk mback" data-act="menu" data-arg="">↩ Quay lại</button>';
      if(m==='atk'){h+='<div class="skills">'+btn('_atk',BASIC,1,'Đánh thường bằng chân khí\nKhông tốn linh lực');for(const id of atkSlots()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}h+=back+'</div><p class="hint">Chọn kỹ năng đặt ở đây trong 🎒 Hành trang.</p>';}
      else if(m==='def'){h+='<div class="skills">'+`<button class="sk" data-act="skill" data-arg="_block"${me.tl<TL_BLOCK?' disabled':''}${ta('Đỡ đòn: tốn một lượt\nTới lượt kế tiếp, mỗi đòn đỡ được giảm 60% sát thương, tốn 30% thể lực.\nĐịch không đánh thì không tốn.')}><span class="el">盾</span><span class="sn">Đỡ đòn</span><small>💪30</small></button>`;
        h+=btn('_guard',GUARD_SK,1,'Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực');for(const id of defSkills()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}
        if(!(sc.boss||sc.kiep||sc.noFlee))h+=`<button class="sk" data-act="flee"${ta('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}><span class="el">走</span><span class="sn">Bỏ chạy</span></button>`;h+=back+'</div>';}
      else if(m==='bag'){h+=`<div class="skills">${cp.map(({p,i})=>`<button class="sk" data-act="cpill" data-arg="${i}"${ta(pillTip(p.id,p.q))}><span>${PILL[p.id].i}</span><span class="sn">${esc(PILL[p.id].n)}</span></button>`).join('')}${back}</div>${cp.length?'':'<p class="hint">Túi không có gì dùng được trong trận.</p>'}`;}
      else h+=`<div class="skills main4"><button class="sk" data-act="menu" data-arg="atk"><span class="el el-hoa">攻</span><span class="sn">Tấn công</span></button><button class="sk" data-act="menu" data-arg="def"><span class="el el-thuy">守</span><span class="sn">Phòng thủ</span></button><button class="sk" data-act="menu" data-arg="bag"${cp.length?'':' disabled'}><span class="el el-tho">囊</span><span class="sn">Túi đồ</span><small>${cp.length}</small></button><button class="sk" data-act="skill" data-arg="_wait"${ta('Qua lượt: không làm gì, nhường lượt')}><span class="el">過</span><span class="sn">Qua lượt</span></button></div>`;
"""+s[j:]
rep("  cancelSk:()=>{UI.pendSk=null;},","  cancelSk:()=>{UI.pendSk=null;},\n  menu:m=>{UI.menu=m||null;},\n  atkslot:id=>toggleAtkSlot(id),")
rep("  skill:id=>{UI.pillTray=false;","  skill:id=>{UI.pillTray=false;UI.menu=null;")
rep("  cpill:i=>{UI.pillTray=false;","  cpill:i=>{UI.pillTray=false;UI.menu=null;")
# thanh thể lực trên ô nhân vật
rep("bar(Math.max(0,u.hp),u.max,'hp')+(u.maxMp?bar(u.mp,u.maxMp,'mp'):'')}","bar(Math.max(0,u.hp),u.max,'hp')+(u.maxMp?bar(u.mp,u.maxMp,'mp'):'')+(u.tl!=null?`<div${ta('Thể lực '+Math.round(u.tl)+'%\\nNé tốn 25%, đỡ được đòn tốn 30%.\\nHồi 20% mỗi khi về mốc 0')}>${bar(u.tl,100,'tl')}</div>`:'')}")
rep("  const STI={block:","  const STI0=0;const STI={block:",0) if False else None
rep("const STI={block:['🛡️','Hộ thể: chặn sát thương'],","const STI={stance:['盾','Thủ thế đỡ đòn: giảm 60% sát thương mỗi đòn, tốn thể lực'],block:['🛡️','Hộ thể: chặn sát thương'],")
rep(".hb.hp i{background:var(--red)}.hb.mp i{background:var(--blue)}",".hb.hp i{background:var(--red)}.hb.mp i{background:var(--blue)}.hb.tl i{background:var(--jade)}\n.skills.main4 .sk{justify-content:center;padding:14px 10px;font-size:1rem}.sk.mback{color:var(--ink2)}")
# nút Né: báo kiệt sức
rep("  if(d.offs[k]!=null)return; // chỉ nhận lần nhấn đầu tiên của mỗi vòng","  if(d.offs[k]!=null)return; // chỉ nhận lần nhấn đầu tiên của mỗi vòng\n  {const me=mainUnit(G.run.scene);const used=d.offs.filter(x=>x!=null).length;if(!d.lit&&me&&me.tl-used*TL_DODGE<TL_DODGE){const b=$('#dodgeBtn');if(b)b.textContent='Kiệt sức';return;}}")
rep("    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[]};}","    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[],lit:sc.dodge.lit};}")
# hành trang: chọn kỹ năng cho ô tấn công
rep("    h+=r.skills.map(x=>{const sk=SK[x.id];return `<div class=\"li\"${ta(skillTip(sk,x.lv))}>${elSeal(sk.el)}<span>${esc(sk.n)}${x.lv>1?' <i>bậc '+x.lv+'</i>':''}</span><small>💧${skillCost(sk)}</small></div>`;}).join('')+'</div>';",
    "    const AS=atkSlots();h+=r.skills.map(x=>{const sk=SK[x.id];const on=AS.includes(x.id);return `<div class=\"li\"${ta(skillTip(sk,x.lv))}>${elSeal(sk.el)}<span>${esc(sk.n)}${x.lv>1?' <i>bậc '+x.lv+'</i>':''}</span><small>💧${skillCost(sk)}</small>${sk.fx.p?`<button class=\"buy\" data-act=\"atkslot\" data-arg=\"${x.id}\"${ta('Đặt vào nút Tấn công (tối đa 3)')}>${on?'⚔ đã đặt':'⚔ đặt'}</button>`:'<small>phòng thủ</small>'}</div>`;}).join('')+'</div>';")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
