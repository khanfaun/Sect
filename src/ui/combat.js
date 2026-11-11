// ---------- màn chiến đấu ----------
const STI={stance:['Thủ','Thủ thế đỡ đòn: đứng chờ đòn, giảm khoảng 20–30% sát thương, tốn 30% thể lực'],block:['Hộ','Hộ thể: chặn sát thương'],poison:['Độc','Độc: mất khí huyết mỗi khi về mốc đầu, giảm dần'],burn:['Thiêu','Thiêu: mất khí huyết mỗi khi về mốc đầu, giảm một nửa'],weak:['Suy','Suy nhược: sát thương gây ra giảm 30%'],vuln:['Phá','Phá giáp: nhận thêm 30% sát thương'],rage:['Nộ','Cuồng nộ: mỗi tầng +12% sát thương'],regen:['Hồi','Hồi xuân: hồi 6% khí huyết mỗi khi về mốc đầu'],evade:['Độn','Ảnh độn: né trọn đòn kế tiếp']};
function stIcons(st){let o='';for(const k in STI){const v=st[k];if(v>0)o+=`<span class="si si-${k}"${ta(STI[k][1])}>${STI[k][0]}<b>${v}</b></span>`;}if(st.soul>0)o+=`<span class="si si-soul"${ta('Đốt nguyên thần: đòn đánh xuyên 25% thủ, hút 10% sát thương')}>Thần<b>${st.soul}</b></span>`;return o?`<div class="sts">${o}</div>`:'';}
function unitKind(u){if(u.kind==='kiep')return 'kiep';if(u.side==='A')return 'nhan';return u.f==='nhan'?'ma':(u.f||'vat');}
function trackHTML(sc){
  let h='<div class="track"><i class="mk m0"></i><i class="mk m50"><em>ra chiêu</em></i><i class="mk m75"><em>phát lực</em></i><i class="mk m100"></i>';
  for(const u of sc.units){if(u.hp<=0&&!u.immune)continue;h+=`<span class="av ${u.side}${u.isMain?' me':''}" id="av${u.id}" style="left:${Math.min(100,u.pos)}%">${u.icon}</span>`;}
  return h+'</div>';
}
// thanh chỉ số trong trận: khí huyết đổi màu theo mức (xanh, vàng, đỏ)
function hpCls(u){const p=u.hp/Math.max(1,u.max);return p>0.5?'hp':p>0.2?'hp mid':'hp low';}
function cBar(cur,max,cls,gid){const p=clamp(cur/Math.max(1,max)*100,0,100);return `<div class="cbar ${cls}">${gid!=null?`<em id="gh${gid}" style="width:${ghPct(gid,p)}%"></em>`:''}<i style="width:${p}%"></i></div>`;}
function phBadge(u){return u.dazed?`<span class="ph dz"${ta('Cạn định lực: mất lượt kế tiếp')}>choáng</span>`:u.phase==='charge'?`<span class="ph"${ta('Đang tụ lực: tới mốc phát lực thì tung chiêu')}>tụ lực</span>`:u.phase==='guard'?`<span class="ph"${ta('Đang thủ thế: bị đánh trước mốc phát lực thì đỡ được một lần')}>thủ thế</span>`:u.stunT>0?'<span class="ph dz">choáng</span>':'';}
function dlOf(u){return u.dl==null?100:u.dl;}
function uAvatar(u){const foe=u.side==='B';return u.isMain?assetImg('hero','me',u.icon):foe?assetImg('foe',u.k||u.name,u.icon):assetImg('pet',u.k||u.name,u.icon);}
// thẻ kẻ địch / đồng hành. compact: chỉ avatar ở giữa, thanh khí huyết, thanh định lực, trạng thái
function unitCard(sc,u,pickMode,compact){
  const dead=u.hp<=0&&!u.immune;const foe=u.side==='B';const tgt=pickMode&&foe&&!dead&&!u.immune;
  const cls=`ucard ${foe?'foe':'ally'}${dead?' dead':''}${tgt?' tg':''}${sc.cur===u.id?' cur':''}${compact?' cmp':''}`;
  const sub=u.sub||(foe?(sc.elite?'Tinh anh':sc.boss?'Thủ lĩnh':'Đối thủ'):'Đồng hành');
  let bars;
  if(u.immune)bars=`<small class="u-s">${sc.kiep?'Đạo '+Math.min(sc.kiep.n,sc.kiep.done+1)+'/'+sc.kiep.n+(sc.kiep.waves>1?' · đợt '+sc.kiep.wave:''):''}${sc.kiep&&sc.kiep.uy<1?' · uy '+Math.round(sc.kiep.uy*100)+'%':''}</small>`;
  else bars=`<div class="brow"${ta('Khí huyết '+Math.max(0,Math.round(u.hp))+' / '+u.max)}>${cBar(Math.max(0,u.hp),u.max,hpCls(u),u.id)}${compact?'':`<b>${Math.max(0,Math.round(u.hp))}</b>`}</div><div class="brow thin"${ta('Định lực '+Math.round(dlOf(u))+'%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt.')}>${cBar(dlOf(u),100,'dl')}</div>`;
  const av=`<span class="u-av${foe?'':' al'}"${compact?ta(u.name+'\n'+sub):''}>${uAvatar(u)}${phBadge(u)}</span>`;
  if(compact)return `<div class="${cls}" id="uc${u.id}"${tgt?` data-act="tgt" data-arg="${u.id}"`:''}>${av}<b class="u-cn">${esc(u.name)}${u.immune?'':`<small>${Math.max(0,Math.round(u.hp))}</small>`}</b>${bars}${stIcons(u.st)}</div>`;
  return `<div class="${cls}" id="uc${u.id}"${tgt?` data-act="tgt" data-arg="${u.id}"`:''}>${av}<div class="u-b"><div class="u-nm"><b>${esc(u.name)}</b><small>${elSeal(u.el||'vo')} ${esc(sub)}</small></div>${bars}${stIcons(u.st)}</div></div>`;
}
// thẻ nhân vật chính: avatar có vòng thần lực (chạm để hiển hóa pháp tướng / tung đòn tối thượng)
function meCard(sc,u){
  const than=sc.pt?100:clamp(u.than||0,0,100);const full=than>=100;const rp=readyPlayer(sc);const V=ptPreview();const C=2*Math.PI*29;
  const st=sc.pt?'burn':full?'full':'';
  const tip=sc.kiep?'Trong thiên kiếp không hiển hóa được pháp tướng.':sc.pt?(sc.pt.n+(sc.pt.left>0?' · còn '+sc.pt.left+' lượt':' · tới hết trận')+'\n'+PT[sc.pt.el].d+(sc.pt.sk?'\n\nChạm để tung đòn tối thượng: '+SK[sc.pt.sk].n+'\nTung xong, pháp tướng tan và thần lực về 0.':'\n\nChưa gắn thần thông nên không có đòn tối thượng.')):('Thần lực '+Math.round(than)+'%\nĐánh trúng hoặc bị đánh trúng thì nạp.\n'+(full?'Đã đầy: chạm để hiển hóa ':'Đầy thì chạm để hiển hóa ')+V.P.n+'\n'+V.P.d+(V.P.turns?' · '+V.P.turns+' lượt':' · tới hết trận')+(V.sk?'\nĐòn tối thượng: '+V.sk.n:''));
  const ok=rp&&!u.dazed&&!CFG.autoFight&&!sc.kiep&&(sc.pt?!!sc.pt.sk:full);
  const ring=`<svg class="tl-ring ${st}" viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="29"/><circle class="fg" cx="32" cy="32" r="29" stroke-dasharray="${(C*than/100).toFixed(1)} ${C.toFixed(1)}"/></svg>`;
  return `<div class="ucard me${sc.cur===u.id?' cur':''}" id="uc${u.id}">
   <button class="ult-av ${st}${ok?' ok':''}" data-act="ult"${ok?'':' aria-disabled="true"'}${ta(tip)}>${ring}${sc.pt?'<i class="flame"></i><i class="flame f2"></i>':''}<span class="ult-in">${uAvatar(u)}</span>${phBadge(u)}</button>
   <div class="u-b"><div class="u-nm"><b>${esc(u.name)}</b><small>${esc(realmLabel())}</small></div>
    <div class="brow"${ta('Khí huyết')}><span class="bl">${ic('heart')}</span>${cBar(Math.max(0,u.hp),u.max,hpCls(u),u.id)}<b>${Math.max(0,Math.round(u.hp))} / ${u.max}</b></div>
    <div class="brow"${ta('Linh lực')}><span class="bl">${ic('drop')}</span>${cBar(u.mp,u.maxMp,'mp')}<b>${Math.round(u.mp)} / ${u.maxMp}</b></div>
    <div class="brow2"><span${ta('Thể lực '+Math.round(u.tl)+'%\nNé tốn 25%, đỡ được đòn tốn 30%.\nHồi 20% mỗi khi về mốc đầu')}><i class="bt">Thể lực</i>${cBar(u.tl,100,'tl')}</span><span${ta('Định lực '+Math.round(dlOf(u))+'%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt, rồi hồi đầy.')}><i class="bt">Định lực</i>${cBar(dlOf(u),100,'dl')}</span></div>
    ${stIcons(u.st)}</div></div>`;
}
// pháp tướng khổng lồ đứng sau lưng nhân vật trong khung cảnh
function ptFigSVG(){return `<svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet"><defs><linearGradient id="ptg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--fc)" stop-opacity=".95"/><stop offset=".7" stop-color="var(--fc)" stop-opacity=".5"/><stop offset="1" stop-color="var(--fc)" stop-opacity="0"/></linearGradient></defs>
  <g class="pt-halo" fill="none" stroke="var(--fc)"><circle cx="100" cy="66" r="56" stroke-width="3" opacity=".8"/><circle cx="100" cy="66" r="66" stroke-width="1.5" stroke-dasharray="4 8" opacity=".7"/>${Array.from({length:16},(_,i)=>{const a=i*Math.PI/8;return `<line x1="${(100+Math.cos(a)*72).toFixed(1)}" y1="${(66+Math.sin(a)*72).toFixed(1)}" x2="${(100+Math.cos(a)*(i%2?82:92)).toFixed(1)}" y2="${(66+Math.sin(a)*(i%2?82:92)).toFixed(1)}" stroke-width="2" opacity=".6"/>`;}).join('')}</g>
  <g fill="url(#ptg)"><path d="M82 48L88 26l12 14 12-14 6 22z"/><circle cx="100" cy="62" r="19"/><path d="M100 82C62 84 42 108 36 148L18 240h164l-18-92c-6-40-26-64-64-66z"/>
  <path d="M44 122C14 112 2 84 8 58l9-3c-3 22 8 42 34 50z"/><path d="M156 122c30-10 42-38 36-64l-9-3c3 22-8 42-34 50z"/><path d="M56 100C36 78 34 50 46 30l8 4c-9 17-6 38 10 56z"/><path d="M144 100c20-22 22-50 10-70l-8 4c9 17 6 38-10 56z"/></g>
  <g fill="#fff" opacity=".85"><ellipse cx="92" cy="60" rx="3.2" ry="1.6"/><ellipse cx="108" cy="60" rx="3.2" ry="1.6"/><circle cx="100" cy="50" r="1.8"/></g></svg>`;}
function vCombat(sc){
  const r=G.run;const me=mainUnit(sc);const rp=readyPlayer(sc);const pickMode=!!(rp&&UI.pendSk);
  const foes=sc.units.filter(u=>u.side==='B'),al=sc.units.filter(u=>u.side==='A');
  const figs=[];al.forEach((u,i)=>figs.push(['nhan',0.3-i*0.13,0.5-(u.isMain?0:0.12),0,u.name].join(':')));foes.forEach((u,i)=>figs.push([unitKind(u),0.72+i*0.12-(foes.length-1)*0.06,u.kind==='kiep'?0.95:0.5-(foes.length>1?0.08:0),1,u.name].join(':')));
  const n=curNode();
  const party=al.filter(u=>!u.isMain);const fc=foes.length>1;
  let h=`<section class="cb">${trackHTML(sc)}<div class="cb-foes${fc?' many':''}">${foes.map(u=>unitCard(sc,u,pickMode,fc)).join('')}</div>
   <div class="cb-art" id="cbArt" data-nf="${foes.length}">${sceneCv('cb'+r.at+sc.en.n,r.region,n?n.type:'',"",'')}${sc.pt?`<div class="pt-fig el-${sc.pt.el}"${ta(sc.pt.n)}>${ptFigSVG()}<b>${esc(sc.pt.n)}</b></div>`:''}</div>
   <div class="cb-ally">${meCard(sc,me)}${party.length?`<div class="cb-party">${party.map(u=>unitCard(sc,u,false,true)).join('')}</div>`:''}</div>`;
  const lg=sc.log.slice(-3);
  h+=`<div class="clog" data-act="clog"${ta('Chạm để xem toàn bộ diễn biến')}>${lg.map((l,i)=>`<p class="${l.c?'lg-'+l.c:''} ${i<lg.length-1?'old':''}">${esc(l.t)}</p>`).join('')}</div>`;
  if(!sc.done&&injured()&&!sc.spar&&!sc.kiep)h+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  if(sc.done){
    const t={win:'Thắng trận',lose:'Bại trận',flee:'Thoát thân',dead:sc.kiep?'Ngươi tan biến trong lôi kiếp':'Ngươi đã ngã xuống'}[sc.over];
    return h+`<div class="cb-end ${sc.over}"><b>${t}</b>${goBtn('cont','Tiếp tục')}</div></section>`;
  }
  h+='<div class="cb-cmd">';
  if(rp&&!CFG.autoFight){
    if(rp.dazed){h+=`<p class="cb-warn">Định lực cạn: ngươi choáng váng, buộc phải bỏ lượt này.</p><div class="skills main4"><button class="sk hl" data-act="skill" data-arg="_wait"><span class="cbi">${ic('skip')}</span><span class="sn">Qua lượt</span></button></div>`;}
    else if(pickMode){h+=`<p class="hint">Chạm vào kẻ địch để tung ${esc(pSkill(UI.pendSk).sk.n)}</p><div class="skills"><button class="sk" data-act="cancelSk"><span class="sn">Thôi</span></button></div>`;}
    else{
      const btn=(id,sk,lv,tip)=>{const c=skillCost(sk);const no=me.mp<c;const d=sk.fx.p?Math.round(sk.fx.p*100)+'% uy lực':'';return `<button class="sk${(sk.t!=null&&String(sk.id||'')[0]!=='_')?' qk':''}" data-act="skill" data-arg="${id}"${no?' disabled':''} style="${(sk.t!=null&&String(sk.id||'')[0]!=='_')?pcs(sk.t):''}"${ta(tip||skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn"><span class="${(sk.t!=null&&String(sk.id||'')[0]!=='_')?'qt':''}">${esc(sk.n)}</span>${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}<small>${[d,c?c+' linh lực':'',sk.fx.charge?'tụ lực':''].filter(Boolean).join(' · ')}</small></span></button>`;};
      const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');const m=UI.menu;
      const back='<button class="sk mback" data-act="menu" data-arg=""><span class="sn">Quay lại</span></button>';
      if(m==='atk'){h+='<div class="skills">'+btn('_atk',BASIC,1,'Đánh thường bằng chân khí\nKhông tốn linh lực');for(const id of atkSlots()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}if(mindArt()){const cost=Math.ceil(me.maxMp*0.3);h+=`<button class="sk" data-act="mind"${me.mp<cost?' disabled':''}${ta('Đánh vào thức hải đối phương.\nNiệm lực của ngươi '+S().than+': hơn đối thủ thì làm nó choáng.')}><span class="el">Thần</span><span class="sn">Thần Thức Thứ<small>${cost} linh lực · làm choáng</small></span></button>`;}(r.dd||[]).forEach((d,j)=>{const used=sc.ddUsed&&sc.ddUsed[j];h+=`<button class="sk" data-act="dd" data-arg="${j}"${used?' disabled':''}${ta('Tế '+d.rel.name+' từ đan điền ra đánh.\nMỗi trận một lần, không tốn linh lực.')}>${elSeal(d.rel.el||'vo')}<span class="sn" style="color:${PCOL[d.rel.tier||0]}">Tế ${esc(d.rel.name)}<small>${used?'đã dùng trận này':'uẩn dưỡng · mỗi trận một lần'}</small></span></button>`;});h+=back+'</div>';}
      else if(m==='def'){h+='<div class="skills">'+`<button class="sk" data-act="skill" data-arg="_block"${me.tl<TL_BLOCK?' disabled':''}${ta('Đỡ đòn: thủ thế, chạy dần từ mốc ra chiêu tới mốc phát lực.\nTrong quãng đó bị đánh thì đỡ được một lần: giảm khoảng 20–30% sát thương, tốn 30% thể lực.\nKhông ai đánh thì không có gì xảy ra.')}><span class="el">Đỡ</span><span class="sn">Đỡ đòn<small>30% thể lực</small></span></button>`;
        h+=btn('_guard',GUARD_SK,1,'Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực');for(const id of defSkills()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}
        h+=back+'</div>';}
      else if(m==='bag'){h+=`<div class="skills">${cp.map(({p,i})=>`<button class="sk qk" data-act="cpill" data-arg="${i}" style="${pcs(p.q)}"${ta(pillTip(p.id,p.q))}><span class="el">${PILL[p.id].i}</span><span class="sn qt">${esc(PILL[p.id].n)}</span></button>`).join('')}${back}</div>${cp.length?'':'<p class="hint">Túi không có gì dùng được trong trận.</p>'}`;}
      else h+=`<div class="skills main4"><button class="sk" data-act="menu" data-arg="atk"><span class="cbi">${ic('sword')}</span><span class="sn">Tấn công</span></button><button class="sk" data-act="menu" data-arg="def"><span class="cbi">${ic('shield')}</span><span class="sn">Phòng thủ</span></button><button class="sk" data-act="menu" data-arg="bag"${cp.length?'':' disabled'}><span class="cbi">${ic('bag')}</span><span class="sn">Túi đồ<small>${cp.length} món</small></span></button><button class="sk" data-act="skill" data-arg="_wait"${ta('Qua lượt: không làm gì, nhường lượt')}><span class="cbi">${ic('skip')}</span><span class="sn">Qua lượt</span></button></div>`;
    }
  } else h+=`<p class="hint cwait">${sc.dodge?(sc.dodge.lit?'Lôi giáng! Chạm “Đỡ” đúng lúc vòng khép lại':'Đòn đánh tới! Chạm “Né” đúng lúc vòng khép lại'):sc.qte?'Chạm đúng lúc vạch vào vùng vàng':CFG.autoFight?'Đang tự đánh…':'…'}</p>`;
  h+='</div>';
  // né: phủ tối cả màn hình, nút né nằm trên cùng; nghỉ một nhịp ngắn rồi vòng mới thu lại
  if(sc.dodge)h+=`<div class="dodge-ov" id="dodgeOv"><p>${sc.dodge.lit?'Lôi giáng!':'Đòn đánh tới!'}${sc.dodge.n>1?' · '+sc.dodge.n+' nhát':''}</p><div class="dg-wrap"><span class="dg-ring" style="animation-duration:${sc.dodge.T}s;animation-delay:${DG_LEAD}s;animation-iteration-count:${sc.dodge.n}"></span><button id="dodgeBtn" class="dodge2">${sc.dodge.lit?'Đỡ':'Né'}</button></div><small>Chờ vòng vàng thu lại, chạm đúng lúc nó khép vào nút</small></div>`;
  if(sc.qte)h+=`<div id="qte" class="qte"><div class="qbar"><i class="qg"></i><i class="qy"></i><span class="qm"></span></div><p>Chạm để tung chiêu</p></div>`;
  const sp=CFG.cspeed||1;
  // hàng nút ngoài: thiêu đốt thọ nguyên, thoát thân, nhận thua (chỉ khi đấu với người), rồi tự đánh, tốc độ, diễn biến
  const rdy=readyPlayer(sc)&&!CFG.autoFight&&!readyPlayer(sc).dazed;const bi=burnInfo(sc);
  let bx='';
  if(!(sc.kiep||sc.spar)){
    const pop=UI.burnOpen&&!sc.done?`<div class="burnpop"><ul>${bi.done?'':bi.k===0?`<li><b>Đốt huyết</b>: hồi <b>60%</b> linh lực, đầy thể lực; giải độc, bỏng, suy yếu</li><li>Không mất lượt</li>`:`<li><b>Đốt nguyên thần</b>: 3 lượt tới mỗi đòn xuyên <b>25%</b> thủ, hút <b>10%</b> sát thương</li><li>Hết 3 lượt: <span class="bad">suy yếu 2 lượt</span></li>`}${bi.done?'':`<li>Mất vĩnh viễn <b>${bi.y} năm</b> thọ nguyên, còn <b>${bi.left} năm</b></li>`}<li class="hint">Tối đa 2 lần mỗi trận, mỗi lượt 1 lần · đã dùng ${bi.k}</li></ul>${bi.done?'<p class="bad">Đã thiêu đốt hai lần.</p>':!bi.ok?'<p class="bad">Thọ nguyên không đủ.</p>':''}${rdy&&mainUnit(sc).burnedTurn?'<p class="bad">Lượt này đã thiêu đốt.</p>':''}<button class="btn burnb" data-act="burn"${rdy&&!bi.done&&bi.ok&&!mainUnit(sc).burnedTurn?'':' disabled'}>${ic('flame')} ${bi.done?'Hết lượt':'Thiêu đốt '+bi.y+' năm'}</button></div>`:'';
    bx+=`<span class="burnw">${pop}<button class="btn sm burn${UI.burnOpen?' on':''}" data-act="burnOpen"${bi.done||(readyPlayer(sc)&&readyPlayer(sc).dazed)?' disabled':''}>${ic('flame')} Thiêu đốt${bi.done?'':' · '+bi.y+' năm'}</button></span>`;}
  if(!(sc.boss||sc.kiep||sc.noFlee))bx+=`<button class="btn sm" data-act="flee"${rdy?'':' disabled'}${ta('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}>${ic('run')} Thoát thân</button>`;
  if(fightsHuman(sc)&&!(sc.kiep||sc.spar||sc.en.n==='Tâm Ma'))bx+=`<button class="btn sm" data-act="yield"${rdy&&!injured()?'':' disabled'}${ta(injured()?'Đang mang thương, đối phương không tha: nhận thua cũng chết.':'Buông tay chịu thua.\nNgươi sẽ bị thương vài tháng và bị đối phương lục lấy một phần linh thạch, vài món đồ.')}>${ic('flag')} Nhận thua</button>`;
  h+=`<div class="cb-bot cb-ext">${bx}<button class="btn sm${CFG.autoFight?' on':''}" data-act="autoFight"${ta('Tự đánh: máy tự chọn chiêu và tự né ở mức khá.\nTắt đi để tự tay điều khiển.')}>${ic('bolt')} Tự đánh</button><button class="btn sm" data-act="cspeed"${ta('Tốc độ trận')}>${ic('ff')} ×${sp}</button></div></section>`;
  return h;
}
// máy đánh thay khi bật "Tự đánh"
function autoPick(sc){
  const r=G.run,me=mainUnit(sc),s=S();
  if(me.dazed){playerAct('_wait');return;}
  if(!sc.kiep){if(!sc.pt&&(me.than||0)>=100)playerUlt();if(sc.pt&&sc.pt.sk&&(sc.pt.left===1||(sc.pt.left<0&&me.hp<me.max*0.5))){if(playerUlt())return;}}
  if(me.hp<me.max*0.35){const i=r.pills.findIndex(p=>p.id==='hoixuan'||p.id==='baohuyet');if(i>=0){playerPillAct(i);return;}}
  let best='_atk',bp=BASIC.fx.p;
  for(const id of atkSlots()){const sk=SK[id];if(skillCost(sk)<=me.mp&&(sk.fx.p||0)>bp){bp=sk.fx.p;best=id;}}
  if(me.mp<me.maxMp*0.15&&best==='_atk'&&Math.random()<0.3)best='_guard';
  playerAct(best);
}
function combatFrame(now,dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return;if(sc.fxq&&sc.fxq.length)fxDrain(sc);figSync();ghTick(dt);
  if(sc.done||UI.panel||UI.modal||document.hidden||now<(UI.fxHold||0))return;
  if(sc.dodge){
    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now+DG_LEAD*1000,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[],lit:sc.dodge.lit};}
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
const DG_LEAD=1.0; // giây nghỉ trước khi vòng né bắt đầu thu lại
function dodgePress(){
  const d=UI.dg;if(!d)return;const now=performance.now();if(now<d.t0)return;
  let k=Math.round((now-d.t0)/d.T)-1;k=clamp(k,0,d.n-1);
  if(d.offs[k]!=null)return;
  {const me=mainUnit(G.run.scene);const used=d.offs.filter(x=>x!=null).length;if(!d.lit&&me&&me.tl-used*TL_DODGE<TL_DODGE){const b=$('#dodgeBtn');if(b)b.textContent='Kiệt sức';return;}}
  d.offs[k]=(now-(d.t0+(k+1)*d.T))/1000;
  const b=$('#dodgeBtn');if(b){b.classList.add('hit');const a=Math.abs(d.offs[k]);b.textContent=a<=0.09?'Chuẩn!':a<=0.25?'Khá':'Hụt';}
}
function qtePress(){const q=UI.qt;if(!q)return;const ph=((performance.now()-q.t0)/1200);const x=ph<0.5?ph*2:2-ph*2;UI.qt=null;qteResolve(qteMult(clamp(x,0,1)));after();}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#dodgeBtn,#dodgeOv')){e.preventDefault();dodgePress();}else if(e.target.closest('#qte')){e.preventDefault();qtePress();}},true);
