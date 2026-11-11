// ---------- màn chiến đấu ----------
const STI={stance:['Thủ','Thủ thế đỡ đòn: đứng chờ đòn, giảm khoảng 20–30% sát thương, tốn 30% thể lực'],block:['Hộ','Hộ thể: chặn sát thương'],poison:['Độc','Độc: mất khí huyết mỗi khi về mốc đầu, giảm dần'],burn:['Thiêu','Thiêu: mất khí huyết mỗi khi về mốc đầu, giảm một nửa'],weak:['Suy','Suy nhược: sát thương gây ra giảm 30%'],vuln:['Phá','Phá giáp: nhận thêm 30% sát thương'],rage:['Nộ','Cuồng nộ: mỗi tầng +12% sát thương'],regen:['Hồi','Hồi xuân: hồi 6% khí huyết mỗi khi về mốc đầu'],evade:['Độn','Ảnh độn: né trọn đòn kế tiếp']};
function stIcons(st){let o='';for(const k in STI){const v=st[k];if(v>0)o+=`<span class="si si-${k}"${ta(STI[k][1])}>${STI[k][0]}<b>${v}</b></span>`;}return o?`<div class="sts">${o}</div>`:'';}
function unitKind(u){if(u.kind==='kiep')return 'kiep';if(u.side==='A')return 'nhan';return u.f==='nhan'?'ma':(u.f||'vat');}
function trackHTML(sc){
  let h='<div class="track"><i class="mk m0"></i><i class="mk m50"><em>ra chiêu</em></i><i class="mk m75"><em>tụ lực</em></i><i class="mk m100"></i>';
  for(const u of sc.units){if(u.hp<=0&&!u.immune)continue;h+=`<span class="av ${u.side}${u.isMain?' me':''}" id="av${u.id}" style="left:${Math.min(100,u.pos)}%">${u.icon}</span>`;}
  return h+'</div>';
}
function unitCard(sc,u,pickMode){
  const dead=u.hp<=0&&!u.immune;const me=u.isMain;const foe=u.side==='B';
  const it=foe&&u.intent&&!u.immune&&!dead?INTENT[u.intent]:null;const pv=it?intentPreview(u):'';
  const tgt=pickMode&&foe&&!dead&&!u.immune;
  const ph=u.phase==='charge'?`<span class="ph"${ta('Đang tụ lực, chờ đối phương ra tay')}>tụ lực</span>`:u.stunT>0?'<span class="ph">choáng</span>':'';
  let body;
  if(u.immune)body=`<small class="u-s">${sc.kiep?'Đạo '+Math.min(sc.kiep.n,sc.kiep.done+1)+'/'+sc.kiep.n+(sc.kiep.waves>1?' · đợt '+sc.kiep.wave:''):''}${sc.kiep&&sc.kiep.uy<1?' · uy '+Math.round(sc.kiep.uy*100)+'%':''}</small>`;
  else body=`<div class="u-bar"><span>Khí huyết</span>${bar(Math.max(0,u.hp),u.max,'hp')}<b>${Math.max(0,u.hp)} / ${u.max}</b></div>`+(u.maxMp?`<div class="u-bar"><span>Linh lực</span>${bar(u.mp,u.maxMp,'mp')}<b>${u.mp} / ${u.maxMp}</b></div>`:'')+(u.tl!=null?`<div class="u-bar"${ta('Thể lực '+Math.round(u.tl)+'%\nNé tốn 25%, đỡ được đòn tốn 30%.\nHồi 20% mỗi khi về mốc đầu')}><span>Thể lực</span>${bar(u.tl,100,'tl')}<b>${Math.round(u.tl)}%</b></div>`:'');
  return `<div class="ucard ${foe?'foe':'ally'}${dead?' dead':''}${me?' me':''}${tgt?' tg':''}${sc.cur===u.id?' cur':''}"${tgt?` data-act="tgt" data-arg="${u.id}"`:''}>
   <div class="u-h"><span class="u-i av-r">${me?assetImg('hero','me',u.icon):foe?assetImg('foe',u.k||u.name,u.icon):assetImg('pet',u.k||u.name,u.icon)}${me&&sc.dodge?`<span class="ring" style="animation-duration:${sc.dodge.T}s;animation-iteration-count:${sc.dodge.n}"></span>`:''}</span><div class="u-n"><small>${esc(u.sub||(foe?(sc.elite?'Tinh anh':sc.boss?'Thủ lĩnh':'Đối thủ'):me?realmLabel():'Đồng hành'))}</small><b>${esc(u.name)}</b></div>${ph}</div>${it?`<div class="intent"${ta('Sắp tới: '+it.n+(pv?'\nƯớc tính '+pv+' sát thương':''))}>sắp ra: ${esc(it.n)}${pv?' · chừng '+pv:''}</div>`:''}
   ${body}${stIcons(u.st)}</div>`;
}
function vCombat(sc){
  const r=G.run;const me=mainUnit(sc);const rp=readyPlayer(sc);const pickMode=!!(rp&&UI.pendSk);
  const foes=sc.units.filter(u=>u.side==='B'),al=sc.units.filter(u=>u.side==='A');
  const figs=[];al.forEach((u,i)=>figs.push(['nhan',0.3-i*0.13,0.5-(u.isMain?0:0.12),0,u.name].join(':')));foes.forEach((u,i)=>figs.push([unitKind(u),0.72+i*0.12-(foes.length-1)*0.06,u.kind==='kiep'?0.95:0.5-(foes.length>1?0.08:0),1,u.name].join(':')));
  const n=curNode();
  let h=`<section class="cb">${trackHTML(sc)}<div class="cb-foes">${foes.map(u=>unitCard(sc,u,pickMode)).join('')}</div>
   <div class="cb-art">${sceneCv('cb'+r.at+sc.en.n,r.region,n?n.type:'',"",figs.join(','))}<span class="cb-rd">${esc(sc.en.n)}</span></div>
   <div class="cb-ally">${al.map(u=>unitCard(sc,u,false)).join('')}</div>`;
  const lg=sc.log.slice(-3);
  h+=`<div class="clog" data-act="clog"${ta('Chạm để xem toàn bộ diễn biến')}>${lg.map((l,i)=>`<p class="${l.c?'lg-'+l.c:''} ${i<lg.length-1?'old':''}">${esc(l.t)}</p>`).join('')}</div>`;
  if(!sc.done&&injured()&&!sc.spar&&!sc.kiep)h+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  if(sc.done){
    const t={win:'Thắng trận',lose:'Bại trận',flee:'Thoát thân',dead:sc.kiep?'Ngươi tan biến trong lôi kiếp':'Ngươi đã ngã xuống'}[sc.over];
    return h+`<div class="cb-end ${sc.over}"><b>${t}</b>${goBtn('cont','Tiếp tục')}</div></section>`;
  }
  h+='<div class="cb-cmd">';
  if(rp&&!CFG.autoFight){
    if(pickMode){h+=`<p class="hint">Chạm vào kẻ địch để tung ${esc(pSkill(UI.pendSk).sk.n)}</p><div class="skills"><button class="sk" data-act="cancelSk"><span class="sn">Thôi</span></button></div>`;}
    else{
      const btn=(id,sk,lv,tip)=>{const c=skillCost(sk);const no=me.mp<c;const d=sk.fx.p?Math.round(sk.fx.p*100)+'% uy lực':'';return `<button class="sk${sk.t!=null?' qk':''}" data-act="skill" data-arg="${id}"${no?' disabled':''} style="${sk.t!=null?pcs(sk.t):''}"${ta(tip||skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn"><span class="${sk.t!=null?'qt':''}">${esc(sk.n)}</span>${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}<small>${[d,c?c+' linh lực':'',sk.fx.charge?'tụ lực':''].filter(Boolean).join(' · ')}</small></span></button>`;};
      const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');const m=UI.menu;
      const back='<button class="sk mback" data-act="menu" data-arg=""><span class="sn">Quay lại</span></button>';
      if(m==='atk'){h+='<div class="skills">'+btn('_atk',BASIC,1,'Đánh thường bằng chân khí\nKhông tốn linh lực');for(const id of atkSlots()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}if(mindArt()){const cost=Math.ceil(me.maxMp*0.3);h+=`<button class="sk" data-act="mind"${me.mp<cost?' disabled':''}${ta('Đánh vào thức hải đối phương.\nNiệm lực của ngươi '+S().than+': hơn đối thủ thì làm nó choáng.')}><span class="el">Thần</span><span class="sn">Thần Thức Thứ<small>${cost} linh lực · làm choáng</small></span></button>`;}(r.dd||[]).forEach((d,j)=>{const used=sc.ddUsed&&sc.ddUsed[j];h+=`<button class="sk" data-act="dd" data-arg="${j}"${used?' disabled':''}${ta('Tế '+d.rel.name+' từ đan điền ra đánh.\nMỗi trận một lần, không tốn linh lực.')}>${elSeal(d.rel.el||'vo')}<span class="sn" style="color:${PCOL[d.rel.tier||0]}">Tế ${esc(d.rel.name)}<small>${used?'đã dùng trận này':'uẩn dưỡng · mỗi trận một lần'}</small></span></button>`;});h+=back+'</div>';}
      else if(m==='def'){h+='<div class="skills">'+`<button class="sk" data-act="skill" data-arg="_block"${me.tl<TL_BLOCK?' disabled':''}${ta('Đỡ đòn: như tụ lực, đứng ở mốc 75 chờ đối thủ ra đòn.\nBị đánh: giảm khoảng 20–30% sát thương, tốn 30% thể lực, rồi chạy tiếp.\nĐối thủ không đánh mình: không tốn gì.')}><span class="el">Đỡ</span><span class="sn">Đỡ đòn<small>30% thể lực</small></span></button>`;
        h+=btn('_guard',GUARD_SK,1,'Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực');for(const id of defSkills()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}
        h+=back+'</div>';}
      else if(m==='bag'){h+=`<div class="skills">${cp.map(({p,i})=>`<button class="sk qk" data-act="cpill" data-arg="${i}" style="${pcs(p.q)}"${ta(pillTip(p.id,p.q))}><span class="el">${PILL[p.id].i}</span><span class="sn qt">${esc(PILL[p.id].n)}</span></button>`).join('')}${back}</div>${cp.length?'':'<p class="hint">Túi không có gì dùng được trong trận.</p>'}`;}
      else h+=`<div class="skills main4"><button class="sk" data-act="menu" data-arg="atk"><span class="cbi">${ic('sword')}</span><span class="sn">Tấn công</span></button><button class="sk" data-act="menu" data-arg="def"><span class="cbi">${ic('shield')}</span><span class="sn">Phòng thủ</span></button><button class="sk" data-act="menu" data-arg="bag"${cp.length?'':' disabled'}><span class="cbi">${ic('bag')}</span><span class="sn">Túi đồ<small>${cp.length} món</small></span></button><button class="sk" data-act="skill" data-arg="_wait"${ta('Qua lượt: không làm gì, nhường lượt')}><span class="cbi">${ic('skip')}</span><span class="sn">Qua lượt</span></button></div>`;
    }
  } else h+=`<p class="hint cwait">${sc.dodge?(sc.dodge.lit?'Lôi giáng! Chạm “Đỡ” đúng lúc vòng khép lại':'Đòn đánh tới! Chạm “Né” đúng lúc vòng khép lại'):sc.qte?'Chạm đúng lúc vạch vào vùng vàng':CFG.autoFight?'Đang tự đánh…':'…'}</p>`;
  h+='</div>';
  if(sc.dodge)h+=`<button id="dodgeBtn" class="dodge">${sc.dodge.lit?'Đỡ':'Né'}</button>`;
  if(sc.qte)h+=`<div id="qte" class="qte"><div class="qbar"><i class="qg"></i><i class="qy"></i><span class="qm"></span></div><p>Chạm để tung chiêu</p></div>`;
  const sp=CFG.cspeed||1;
  // hàng nút ngoài: thiêu đốt thọ nguyên, thoát thân, nhận thua (chỉ khi đấu với người), rồi tự đánh, tốc độ, diễn biến
  const rdy=readyPlayer(sc)&&!CFG.autoFight;const bi=burnInfo(sc);
  let bx='';
  if(!(sc.kiep||sc.spar)){
    const pop=UI.burnOpen&&!sc.done?`<div class="burnpop"><ul>${bi.done?'':bi.k===0?`<li><b>Đốt huyết</b>: linh lực, thể lực hồi đầy; giải độc, bỏng, suy yếu</li><li>Không mất lượt</li>`:`<li><b>Đốt nguyên thần</b>: 3 lượt tới mỗi đòn xuyên <b>40%</b> thủ, hút <b>15%</b> sát thương</li><li>Hết 3 lượt: <span class="bad">suy yếu 2 lượt</span></li>`}${bi.done?'':`<li>Mất vĩnh viễn <b>${bi.y} năm</b> thọ nguyên, còn <b>${bi.left} năm</b></li>`}<li class="hint">Tối đa 2 lần mỗi trận · đã dùng ${bi.k}</li></ul>${bi.done?'<p class="bad">Đã thiêu đốt hai lần.</p>':!bi.ok?'<p class="bad">Thọ nguyên không đủ.</p>':''}<button class="btn burnb" data-act="burn"${rdy&&!bi.done&&bi.ok?'':' disabled'}>${ic('flame')} ${bi.done?'Hết lượt':'Thiêu đốt '+bi.y+' năm'}</button></div>`:'';
    bx+=`<span class="burnw">${pop}<button class="btn sm burn${UI.burnOpen?' on':''}" data-act="burnOpen"${bi.done?' disabled':''}>${ic('flame')} Thiêu đốt${bi.done?'':' · '+bi.y+' năm'}</button></span>`;}
  if(!(sc.boss||sc.kiep||sc.noFlee))bx+=`<button class="btn sm" data-act="flee"${rdy?'':' disabled'}${ta('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}>${ic('run')} Thoát thân</button>`;
  if(fightsHuman(sc)&&!(sc.kiep||sc.spar||sc.en.n==='Tâm Ma'))bx+=`<button class="btn sm" data-act="yield"${rdy&&!injured()?'':' disabled'}${ta(injured()?'Đang mang thương, đối phương không tha: nhận thua cũng chết.':'Buông tay chịu thua.\nNgươi sẽ bị thương vài tháng và bị đối phương lục lấy một phần linh thạch, vài món đồ.')}>${ic('flag')} Nhận thua</button>`;
  h+=`<div class="cb-bot cb-ext">${bx}<button class="btn sm${CFG.autoFight?' on':''}" data-act="autoFight"${ta('Tự đánh: máy tự chọn chiêu và tự né ở mức khá.\nTắt đi để tự tay điều khiển.')}>${ic('bolt')} Tự đánh</button><button class="btn sm" data-act="cspeed"${ta('Tốc độ trận')}>${ic('ff')} ×${sp}</button><button class="btn sm" data-act="clog">Diễn biến</button></div></section>`;
  return h;
}
// máy đánh thay khi bật "Tự đánh"
function autoPick(sc){
  const r=G.run,me=mainUnit(sc),s=S();
  if(me.hp<me.max*0.35){const i=r.pills.findIndex(p=>p.id==='hoixuan'||p.id==='baohuyet');if(i>=0){playerPillAct(i);return;}}
  let best='_atk',bp=BASIC.fx.p;
  for(const id of atkSlots()){const sk=SK[id];if(skillCost(sk)<=me.mp&&(sk.fx.p||0)>bp){bp=sk.fx.p;best=id;}}
  if(me.mp<me.maxMp*0.15&&best==='_atk'&&Math.random()<0.3)best='_guard';
  playerAct(best);
}
function combatFrame(now,dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat'||sc.done||UI.panel||UI.modal||document.hidden)return;
  if(sc.dodge){
    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[],lit:sc.dodge.lit};}
    const d=UI.dg;if(now>d.t0+d.n*d.T+250){const o=[];for(let k=0;k<d.n;k++)o.push(d.offs[k]==null?null:d.offs[k]);UI.dg=null;dodgeResolve(o);after();}
    return;
  }
  if(sc.qte){
    if(!UI.qt||UI.qt.id!==sc.qte.id)UI.qt={id:sc.qte.id,t0:now};
    if(CFG.autoFight){UI.qt=null;qteResolve(qteMult(0.5+Math.random()*0.3));after();return;}
    if(now>UI.qt.t0+1200){UI.qt=null;qteResolve(null);after();}
    return;
  }
  if(CFG.autoFight&&readyPlayer(sc)){if(!UI.autoT)UI.autoT=now;if(now-UI.autoT>260/(CFG.cspeed||1)){UI.autoT=0;UI.menu=null;UI.pendSk=null;autoPick(sc);after();}return;}
  UI.autoT=0;
  const rev=sc.rev;const sp=CFG.cspeed||1;for(let i=0;i<sp;i++){combatStep(Math.min(dt,0.05));if(!G.run||G.run.scene!==sc||sc.rev!==rev)break;}
  if(!G.run||G.run.scene!==sc||sc.rev!==rev){after();return;}
  for(const u of sc.units){const e=document.getElementById('av'+u.id);if(e)e.style.left=Math.min(100,u.pos)+'%';}
}
function dodgePress(){
  const d=UI.dg;if(!d)return;const now=performance.now();
  let k=Math.round((now-d.t0)/d.T)-1;k=clamp(k,0,d.n-1);
  if(d.offs[k]!=null)return;
  {const me=mainUnit(G.run.scene);const used=d.offs.filter(x=>x!=null).length;if(!d.lit&&me&&me.tl-used*TL_DODGE<TL_DODGE){const b=$('#dodgeBtn');if(b)b.textContent='Kiệt sức';return;}}
  d.offs[k]=(now-(d.t0+(k+1)*d.T))/1000;
  const b=$('#dodgeBtn');if(b){b.classList.add('hit');const a=Math.abs(d.offs[k]);b.textContent=a<=0.09?'Chuẩn!':a<=0.25?'Khá':'Hụt';}
}
function qtePress(){const q=UI.qt;if(!q)return;const ph=((performance.now()-q.t0)/1200);const x=ph<0.5?ph*2:2-ph*2;UI.qt=null;qteResolve(qteMult(clamp(x,0,1)));after();}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#dodgeBtn')){e.preventDefault();dodgePress();}else if(e.target.closest('#qte')){e.preventDefault();qtePress();}},true);
