import sys
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
rep("const BLOCK_SK={id:'_block',n:'Đỡ đòn',el:'vo',t:0,c:0,fx:{stance:1},f:'',rec:.8};","const BLOCK_SK={id:'_block',n:'Đỡ đòn',el:'vo',t:0,c:0,fx:{stance:1,steady:true},f:'',rec:.8};")
# vào thế đỡ: như tụ lực, đứng ở 75 chờ đối thủ
rep("  if(sk.fx.charge){","""  if(sk.fx.stance){
    u.phase='charge';u.pos=75;u.chargeT=0;u.pending={sk,lv,tid:null,block:1};u.st.stance=1;
    u.waitSet=alive(sc,foeSide(u.side)).filter(x=>!x.immune||sc.kiep).map(x=>x.id);
    clog(sc,(u.ctrl==='player'?'Ngươi':u.name)+' thủ thế, chờ đòn.',u.side==='A'?'me':'en');doneAct(sc,u);return;
  }
  if(sk.fx.charge){""")
# hết chờ mà không bị đánh: chạy tiếp từ 75
rep("  const ch=sc.units.find(u=>u.phase==='charge'&&u.hp>0&&(u.waitSet.length===0||u.chargeT>=CHARGE_MAX));",
    """  for(const u of sc.units)if(u.phase==='charge'&&u.pending&&u.pending.block&&u.hp>0&&(u.waitSet.length===0||u.chargeT>=CHARGE_MAX)){endStance(sc,u,'Không ai ra đòn. '+(u.ctrl==='player'?'Ngươi':u.name)+' buông thế đỡ.');}
  const ch=sc.units.find(u=>u.phase==='charge'&&u.hp>0&&(u.waitSet.length===0||u.chargeT>=CHARGE_MAX));""")
rep("function toRecover(sc,u,rec){","function endStance(sc,u,msg){u.st.stance=0;u._blk=0;toRecover(sc,u,BLOCK_SK.rec);u.pos=75;if(msg)clog(sc,msg,'fl');sc.rev=(sc.rev||0)+1;}\nfunction toRecover(sc,u,rec){")
# bị đánh trong thế đỡ: đỡ xong thì hết thế, chạy tiếp từ 75
rep("    if(total&&(f.drain||(isP&&fx.drain)))","    for(const t of tg)if(t.st.stance&&t.pending&&t.pending.block&&t.hp>0)endStance(sc,t,null);\n    if(total&&(f.drain||(isP&&fx.drain)))")
rep("  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-BLOCK_CUT));}","  if(me.st.stance&&me.tl>=TL_BLOCK){me.tl-=TL_BLOCK;d=Math.round(d*(1-BLOCK_CUT));}\n  if(me.st.stance&&me.pending&&me.pending.block)endStance(sc,me,null);")
rep("'Đỡ đòn: tốn một lượt\\nTới lượt kế tiếp, mỗi đòn đỡ được giảm 60% sát thương, tốn 30% thể lực.\\nĐịch không đánh thì không tốn.'",
    "'Đỡ đòn: như tụ lực, đứng ở mốc 75 chờ đối thủ ra đòn.\\nBị đánh: giảm 60% sát thương, tốn 30% thể lực, rồi chạy tiếp.\\nĐối thủ ra tay mà không đánh mình: không tốn gì, chạy tiếp tới mốc kết thúc.'")
rep("const STI={stance:['盾','Thủ thế đỡ đòn: giảm 60% sát thương mỗi đòn, tốn thể lực'],","const STI={stance:['盾','Thủ thế đỡ đòn: đứng chờ đòn, giảm 60% sát thương, tốn 30% thể lực'],")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
