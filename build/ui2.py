import sys
s=open('phu-sinh.html',encoding='utf-8').read()
def rep(x,y,c=1):
    global s
    n=s.count(x)
    if n!=c: sys.exit(f'!! {n}: {x[:90]}')
    s=s.replace(x,y)
i=s.index('function vCombat(sc){');j=s.index('function pickHTML(')
s=s[:i]+open('build/ui_combat.js',encoding='utf-8').read()+'\n'+s[j:]
rep("""  skill:id=>{UI.pillTray=false;playerSkill(id);},
  guard:()=>{UI.pillTray=false;playerGuard();},""","""  skill:id=>{UI.pillTray=false;const sc=G.run.scene;if(needTarget(sc,id)){UI.pendSk=id;return;}UI.pendSk=null;playerAct(id);},
  tgt:id=>{const k=UI.pendSk;UI.pendSk=null;if(k)playerAct(k,+id);},
  cancelSk:()=>{UI.pendSk=null;},
  guard:()=>{UI.pillTray=false;playerAct('_guard');},
  prep:i=>prepToggle(i),
  prepGo:()=>prepStart(),
  btGo:()=>btContinue(),
  autoDodge:()=>{const o=G.meta.opt=G.meta.opt||{};o.autoDodge=!o.autoDodge;},""")
rep("  cpill:i=>{UI.pillTray=false;playerPill(+i);},","  cpill:i=>{UI.pillTray=false;playerPillAct(+i);},")
rep("  if(clockOn()&&!UI.drag){","  if(G.run&&G.run.scene&&G.run.scene.type==='combat'){try{combatFrame(now,dt);}catch(e){console.error(e);}}\n  if(clockOn()&&!UI.drag){")
rep("""  if(typeof migrateX==='function')migrateX(d);""","""  if(d.v<2&&d.run){const r=d.run;r.dao=r.dao||0;r.daoSk=0;r.daoPill=0;r.quality=r.quality||[0,0,0,0,0];
    if(r.realm>=2&&r.danQ)r.quality[2]=r.danQ;delete r.danQ;
    if(r.scene&&(r.scene.type==='combat'||r.scene.type==='rest'))r.scene=null; // trận theo lượt cũ: bỏ, về bản đồ
  }
  if(d.meta&&!d.meta.opt)d.meta.opt={};
  if(typeof migrateX==='function')migrateX(d);""")
rep("  if(d.run&&d.run.scene&&d.run.scene.type==='combat'&&d.run.scene.dodge)d.run.scene.dodge=null;\n","")
rep("""  if(!G.meta.world)G.meta.world=genWorld();}""","""  if(!G.meta.world)G.meta.world=genWorld();
  // tải lại giữa lúc đang hiện vòng né hoặc thanh tụ lực: coi như chưa nhấn
  const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat'){if(sc.dodge)dodgeResolve(null);if(sc.qte)qteResolve(null);}}""")
# bảng nhân vật
rep("""    ${row('🌀','Thân pháp',s.tp,'Né tránh '+Math.round(s.dodge)+'%, dễ lẩn tránh và thoát thân')}""","""    ${row('☯️','Đạo cơ',(r.dao||0)+' · '+QNAME[qOf(r.dao||0)],'Điểm đạo cơ quyết định phẩm chất khi đột phá.'+(qNext(r.dao||0)?'\\nMốc kế tiếp: '+qNext(r.dao||0)+' điểm ('+QNAME[qOf(qNext(r.dao||0))]+')':'\\nĐã đạt Thiên đạo'))}
    ${row('🌀','Thân pháp',s.tp,'Tốc độ chạy trên nửa đầu thanh hành động')}${row('🎯','Chính xác',s.cx,'Đánh trúng. Đối phương né khó hơn')}
    ${row('🍃','Né',s.ne,'Né đòn. Nhấn đúng lúc để né dễ hơn')}${row('🔄','Hồi phục',s.hoi,'Tốc độ trên nửa sau thanh hành động')}""")
rep("""  <button class="ch" data-act="exp">""","""  <button class="ch" data-act="autoDodge"><span class="ci">🍃</span><span class="ct">Tự né: ${G.meta.opt&&G.meta.opt.autoDodge?'bật':'tắt'}</span><span class="cx"${ta('Bật thì không cần nhấn nút Né.\\nLuôn tính như né ở mức khá, trừ đi 10%.')}>?</span></button>
  <button class="ch" data-act="exp">""")
rep("const STI={","const STI_OLD={")
rep("function stIcons(st){","const STI={block:['🛡️','Hộ thể: chặn sát thương'],poison:['☠️','Độc: mất khí huyết mỗi khi về mốc 0, giảm dần'],burn:['🔥','Thiêu: mất khí huyết mỗi khi về mốc 0, giảm một nửa'],weak:['🥀','Suy nhược: sát thương gây ra giảm 30%'],vuln:['💔','Phá giáp: nhận thêm 30% sát thương'],rage:['💢','Cuồng nộ: mỗi tầng +12% sát thương'],regen:['🌱','Hồi xuân: hồi 6% khí huyết mỗi khi về mốc 0'],evade:['🍃','Ảnh độn: né trọn đòn kế tiếp']};\nfunction stIcons(st){")
rep("#tip{position:fixed;","""/* chiến đấu: thanh hành động */
.cb{display:flex;gap:10px;margin-top:10px}
.abar{position:relative;flex:0 0 44px;min-height:440px;border-radius:22px;background:linear-gradient(var(--bg2),var(--paper));box-shadow:inset 0 0 0 1px var(--line)}
.abar .mk{position:absolute;left:4px;right:4px;height:2px;background:var(--gold)}.abar .m50{bottom:50%}.abar .m75{bottom:75%;background:var(--ink3);opacity:.6}
.av{position:absolute;width:26px;height:26px;margin-bottom:-13px;display:grid;place-items:center;font-size:17px;border-radius:50%;background:var(--paper);box-shadow:0 0 0 1px var(--line);transition:bottom .05s linear}
.av.A{left:-6px}.av.B{right:-6px}.av.me{box-shadow:0 0 0 2px var(--red)}
.cmain{flex:1;min-width:0}
.urow{display:flex;gap:6px;justify-content:center}
.ut{flex:1;max-width:120px;text-align:center;padding:6px 4px;border-radius:12px;font-size:.78rem}
.ut.dead{opacity:.35}.ut.cur{box-shadow:inset 0 0 0 1px var(--gold)}.ut.tg{cursor:pointer;box-shadow:inset 0 0 0 2px var(--red)}
.ui-c{position:relative;display:grid;place-items:center;width:58px;height:58px;margin:0 auto 2px;font-size:2rem;border-radius:50%;background:radial-gradient(circle,var(--paper) 55%,var(--bg2));box-shadow:inset 0 0 0 1px var(--gold2)}
.ut.me .ui-c{box-shadow:inset 0 0 0 2px var(--red)}
.ui-n{font-weight:500;line-height:1.2;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}.ui-s{color:var(--ink2)}
.ut .hb{height:4px;margin:3px 4px 0}.ut .sts{min-height:16px;margin-top:2px}
.ph{position:absolute;left:-4px;top:-4px;font-size:.9rem}
.ut .intent{right:-24px;top:-6px;font-size:.72rem;padding:1px 6px}
.ring{position:absolute;inset:-40px;border-radius:50%;border:3px solid var(--red);animation-name:shrink;animation-timing-function:linear;pointer-events:none}
@keyframes shrink{from{transform:scale(1);opacity:.4}to{transform:scale(.48);opacity:1}}
.cb .clog{min-height:74px;font-size:.86rem;margin:8px 0}
.cb .skills{grid-template-columns:1fr 1fr}
.cwait{text-align:center;min-height:2em}
.dodge{position:fixed;left:50%;bottom:calc(16px + env(safe-area-inset-bottom,0px));transform:translateX(-50%);z-index:15;width:min(320px,88vw);min-height:72px;border:0;border-radius:999px;background:var(--red);color:#F8EBD6;font:600 1.8rem var(--disp);box-shadow:0 8px 24px rgba(60,20,10,.3);touch-action:manipulation}
.dodge.hit{background:var(--gold)}
.qte{position:fixed;left:0;right:0;bottom:calc(20px + env(safe-area-inset-bottom,0px));z-index:15;padding:14px 22px;text-align:center;font-size:.9rem;color:var(--ink2);cursor:pointer}
.qbar{position:relative;height:30px;margin:0 auto;max-width:420px;border-radius:15px;background:var(--paper);box-shadow:inset 0 0 0 1px var(--gold2);overflow:hidden}
.qg{position:absolute;left:30%;width:40%;top:0;bottom:0;background:var(--jade);opacity:.35}.qy{position:absolute;left:43%;width:14%;top:0;bottom:0;background:var(--sun)}
.qm{position:absolute;top:-2px;bottom:-2px;width:4px;background:var(--red);animation:qrun 1.2s linear both}
@keyframes qrun{0%{left:0}50%{left:calc(100% - 4px)}100%{left:0}}
.slots{display:flex;gap:10px;justify-content:center;margin:6px 0 16px}
.slot{width:84px;height:84px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:4px;border-radius:14px;border:1px dashed var(--ink3);background:none;font-size:1.6rem;color:var(--ink3)}
.slot.on{border:1px solid var(--gold);color:var(--ink);background:var(--paper)}.slot small{font-size:.66rem;line-height:1.1;padding:0 4px}
h4.sub{font:600 1.1rem var(--disp);margin:14px 0 4px;color:var(--ink2)}
button.li{width:100%;background:none;border:0;border-bottom:1px solid var(--line);text-align:left}
#tip{position:fixed;""")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok')
