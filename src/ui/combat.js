// ---------- màn chiến đấu ----------
const STI={stance:['Thủ','Thủ thế đỡ đòn: đứng chờ đòn, giảm khoảng 20–30% sát thương, tốn 30% thể lực'],block:['Hộ','Hộ thể: chặn sát thương'],poison:['Độc','Độc: mất khí huyết mỗi khi về mốc đầu, giảm dần'],burn:['Thiêu','Thiêu: mất khí huyết mỗi khi về mốc đầu, giảm một nửa'],weak:['Suy','Suy nhược: sát thương gây ra giảm 30%'],vuln:['Phá','Phá giáp: nhận thêm 30% sát thương'],rage:['Nộ','Cuồng nộ: mỗi tầng +12% sát thương'],regen:['Hồi','Hồi xuân: hồi 6% khí huyết mỗi khi về mốc đầu'],evade:['Độn','Ảnh độn: né trọn đòn kế tiếp']};
function stIcons(st){let o='';for(const k in STI){const v=st[k];if(v>0)o+=`<span class="si si-${k}"${ta(STI[k][1])}>${STI[k][0]}<b>${v}</b></span>`;}if(st.uyap)o+=`<span class="si si-uyap"${ta('Bị uy áp: đối thủ hơn hẳn một đại cảnh giới. Đòn đánh gần như vô dụng, đòn nhận vào nặng hơn nhiều.')}>Uy áp</span>`;if(st.soul>0)o+=`<span class="si si-soul"${ta('Đốt nguyên thần: đòn đánh xuyên 25% thủ, hút 10% sát thương')}>Thần<b>${st.soul}</b></span>`;return o?`<div class="sts">${o}</div>`:'';}
function unitKind(u){if(u.kind==='kiep')return 'kiep'+(u.kk?'-'+u.kk:'');if(u.side==='A')return 'nhan';return u.f==='nhan'?'ma':(u.f||'vat');}
function trackHTML(sc){
  let h='<div class="track"><i class="mk m0"></i><i class="mk m50"><em>ra chiêu</em></i><i class="mk m75"><em>phát lực</em></i><i class="mk m100"></i>';
  for(const u of sc.units){if(u.hp<=0&&!u.immune)continue;h+=`<span class="av ${u.side}${u.isMain?' me':''}" id="av${u.id}" style="left:${Math.min(100,u.pos)}%">${u.immune?u.icon:uAvatar(u)}</span>`;}
  return h+'</div>';
}
// thanh chỉ số trong trận: khí huyết đổi màu theo mức (xanh, vàng, đỏ)
function hpCls(u){const p=u.hp/Math.max(1,u.max);return p>0.5?'hp':p>0.2?'hp mid':'hp low';}
function cBar(cur,max,cls){return `<div class="cbar ${cls}"><i style="width:${clamp(cur/Math.max(1,max)*100,0,100)}%"></i></div>`;}
function phBadge(u){return u.dazed?`<span class="ph dz"${ta('Cạn định lực: mất lượt kế tiếp')}>choáng</span>`:u.phase==='charge'?`<span class="ph"${ta('Đang tụ lực: tới mốc phát lực thì tung chiêu')}>tụ lực</span>`:u.phase==='guard'?`<span class="ph"${ta('Đang thủ thế: bị đánh trước mốc phát lực thì đỡ được một lần')}>thủ thế</span>`:u.stunT>0?'<span class="ph dz">choáng</span>':'';}
function dlOf(u){return u.dl==null?100:u.dl;}
function uAvatar(u){const foe=u.side==='B';return u.isMain?assetImg('hero','me',u.icon):foe?assetImg('foe',u.boss?'_boss':ASSET.foe[u.k]?u.k:'_'+(u.f||'thu'),u.icon):assetImg('pet',u.k||u.name,u.icon);}
// thẻ kẻ địch / đồng hành. compact: chỉ avatar ở giữa, thanh khí huyết, thanh định lực, trạng thái
function unitCard(sc,u,pickMode,compact){
  const dead=u.hp<=0&&!u.immune;const foe=u.side==='B';const tgt=pickMode&&foe&&!dead&&!u.immune;
  const cls=`ucard ${foe?'foe':'ally'}${dead?' dead':''}${tgt?' tg':''}${sc.cur===u.id?' cur':''}${compact?' cmp':''}`;
  const sub=u.sub||(foe?(sc.elite?'Tinh anh':sc.boss?'Thủ lĩnh':'Đối thủ'):'Đồng hành');
  let bars;
  if(u.immune)bars=`<small class="u-s">${sc.kiep?'Đạo '+Math.min(sc.kiep.n,sc.kiep.done+1)+'/'+sc.kiep.n+(sc.kiep.waves>1?' · đợt '+sc.kiep.wave:''):''}${sc.kiep&&sc.kiep.uy<1?' · uy '+Math.round(sc.kiep.uy*100)+'%':''}</small>`;
  else bars=`<div class="brow"${ta('Khí huyết '+pctOf(Math.max(0,u.hp),u.max))}>${cBar(Math.max(0,u.hp),u.max,hpCls(u))}${compact?'':`<b>${pctOf(Math.max(0,u.hp),u.max)}</b>`}</div><div class="brow thin"${ta('Định lực '+Math.round(dlOf(u))+'%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt.')}>${cBar(dlOf(u),100,'dl')}</div>`;
  const th=u.fpt?100:clamp(u.than||0,0,100),RC=2*Math.PI*29;const fring=foe&&!u.immune?`<svg class="tl-ring ${u.fpt?'burn':th>=100?'full':''}" viewBox="0 0 64 64"><circle class="bg" cx="32" cy="32" r="29"/><circle class="fg" cx="32" cy="32" r="29" stroke-dasharray="${(RC*th/100).toFixed(1)} ${RC.toFixed(1)}"/></svg>`:'';
  const av=`<span class="u-av${foe?' fav':' al'}${u.fpt?' fpt':''}"${ta(foe&&!u.immune?(u.fpt?u.fpt.n+'\nLượt tới nó sẽ tung đòn tối thượng!':'Thần lực '+Math.round(th)+'%\nĐầy thì hiển hóa pháp tướng, lượt sau tung đòn tối thượng.'):(compact?u.name+'\n'+sub:''))}>${fring}<span class="fav-in">${uAvatar(u)}</span>${phBadge(u)}${u.fpt?'<i class="flame"></i>':''}</span>`;
  if(compact)return `<div class="${cls}" id="uc${u.id}"${tgt?` data-act="tgt" data-arg="${u.id}"`:''}>${av}${bars}${stIcons(u.st)}</div>`;
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
    <div class="brow"${ta('Khí huyết')}><span class="bl">${ic('heart')}</span>${cBar(Math.max(0,u.hp),u.max,hpCls(u))}<b>${pctOf(Math.max(0,u.hp),u.max)}</b></div>
    <div class="brow2 mpnl"><span${ta('Linh lực '+(u.maxMp?pctOf(u.mp,u.maxMp):'chưa có')+'\nThi triển pháp thuật')}><span class="bl">${ic('drop')}</span>${cBar(u.mp,u.maxMp,'mp')}<b>${u.maxMp?pctOf(u.mp,u.maxMp):'—'}</b></span><span${ta('Niệm lực '+pctOf(u.nl||0,u.maxNl||1)+'\nSức thần thức trong trận. Dùng vật phẩm, tế pháp bảo, đòn thần thức đều tốn niệm lực.\nVào trận thì đầy.')}><span class="bl">${ic('brain')}</span>${cBar(u.nl||0,u.maxNl||1,'nl')}<b>${pctOf(u.nl||0,u.maxNl||1)}</b></span></div>
    <div class="brow2"><span${ta('Thể lực '+Math.round(u.tl)+'%\nNé tốn 25%, đỡ được đòn tốn 30%.\nHồi 20% mỗi khi về mốc đầu')}><span class="bl">${ic('run')}</span>${cBar(u.tl,100,'tl')}</span><span${ta('Định lực '+Math.round(dlOf(u))+'%\nTrúng đòn thì giảm. Về 0: choáng, mất một lượt, rồi hồi đầy.')}><span class="bl">${ic('lotus')}</span>${cBar(dlOf(u),100,'dl')}</span></div>
    ${stIcons(u.st)}</div></div>`;
}
// pháp tướng khổng lồ đứng sau lưng nhân vật trong khung cảnh
function ptFigSVG(){return `<svg viewBox="0 0 200 240" preserveAspectRatio="xMidYMax meet"><defs><linearGradient id="ptg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="var(--fc)" stop-opacity=".9"/><stop offset=".65" stop-color="var(--fc)" stop-opacity=".45"/><stop offset="1" stop-color="var(--fc)" stop-opacity="0"/></linearGradient>
  <radialGradient id="pth" cx=".5" cy=".5" r=".5"><stop offset=".55" stop-color="var(--fl)" stop-opacity="0"/><stop offset=".8" stop-color="var(--fl)" stop-opacity=".55"/><stop offset="1" stop-color="var(--fl)" stop-opacity="0"/></radialGradient></defs>
  <circle class="pt-halo" cx="100" cy="64" r="58" fill="url(#pth)"/>
  <g class="pt-halo" fill="none" stroke="var(--fl)" opacity=".75"><circle cx="100" cy="64" r="44" stroke-width="2"/><circle cx="100" cy="64" r="52" stroke-width="1" stroke-dasharray="2 6"/></g>
  <g fill="url(#ptg)">
   <path d="M93 34c0-6 3-10 7-10s7 4 7 10z"/>
   <ellipse cx="100" cy="56" rx="17" ry="20"/>
   <path d="M86 74c-4 4-6 8-6 12h40c0-4-2-8-6-12z"/>
   <path d="M100 82c-30 2-48 16-56 40l-14 118h140l-14-118c-8-24-26-38-56-40z"/>
   <path d="M58 104c-14 10-26 30-30 58 10 4 22 2 30-6 2-18 4-34 10-46z" opacity=".85"/>
   <path d="M142 104c14 10 26 30 30 58-10 4-22 2-30-6-2-18-4-34-10-46z" opacity=".85"/>
   <path d="M86 138c4-8 10-12 14-12s10 4 14 12c-4 6-9 8-14 8s-10-2-14-8z" opacity=".9"/>
  </g>
  <g fill="none" stroke="var(--fl)" stroke-width="1.6" opacity=".7"><path d="M100 84v150M80 96c-6 30-8 80-6 140M120 96c6 30 8 80 6 140"/><path d="M70 120c10 6 50 6 60 0"/></g>
  <g fill="#fff" opacity=".9"><path d="M90 56c2-1.2 5-1.2 7 0"/><path d="M103 56c2-1.2 5-1.2 7 0"/><circle cx="100" cy="44" r="1.8"/></g>
  <g stroke="#fff" stroke-width="1.6" fill="none" opacity=".85"><path d="M90 56q3.5 2 7 0M103 56q3.5 2 7 0"/></g></svg>`;}
function vCombat(sc){
  const r=G.run;const me=mainUnit(sc);const rp=readyPlayer(sc);const pickMode=!!(rp&&UI.pendSk);
  const foes=sc.units.filter(u=>u.side==='B'),al=sc.units.filter(u=>u.side==='A');
  const figs=[];al.forEach((u,i)=>figs.push(['nhan',0.3-i*0.13,0.5-(u.isMain?0:0.12),0,u.name].join(':')));foes.forEach((u,i)=>figs.push([unitKind(u),0.72+i*0.12-(foes.length-1)*0.06,u.kind==='kiep'?0.95:0.5-(foes.length>1?0.08:0),1,u.name].join(':')));
  const n=curNode();
  const party=al.filter(u=>!u.isMain);const fc=foes.length>1;
  let h=`<section class="cb">${trackHTML(sc)}<div class="cb-foes${fc?' many':''}">${foes.map(u=>unitCard(sc,u,pickMode,fc)).join('')}</div>
   <div class="cb-art" id="cbArt" data-nf="${foes.length}"><span class="cspd cspd-art">${[1,2,3].map(n=>`<button class="${(CFG.cspeed||1)===n?'on':''}" data-act="cspd" data-arg="${n}"${ta('Tốc độ trận ×'+n)}>×${n}</button>`).join('')}</span>${sceneCv('cb'+r.at+sc.en.n,r.region,n?n.type:'',"",figs.join(','))}${sc.pt?`<div class="pt-fig el-${sc.pt.el}"${ta(sc.pt.n)}>${ptFigSVG()}<b>${esc(sc.pt.n)}</b></div>`:''}</div>
   <div class="cb-ally">${meCard(sc,me)}${party.length?`<div class="cb-party">${party.map(u=>unitCard(sc,u,false,true)).join('')}</div>`:''}</div>`;
  const lg=sc.log.slice(-3);
  h+=`<div class="clog" data-act="clog"${ta('Chạm để xem toàn bộ diễn biến')}>${lg.map((l,i)=>`<p class="${l.c?'lg-'+l.c:''} ${i<lg.length-1?'old':''}">${esc(l.t)}</p>`).join('')}</div>`;
  if(!sc.done&&injured()&&!sc.spar&&!sc.kiep)h+=`<p class="cb-warn">Đang mang thương: thua trận này là chết.</p>`;
  if(sc.done){
    const t={win:'Thắng trận',lose:'Bại trận',flee:'Thoát thân',dead:sc.kiep?'Ngươi tan biến trong thiên kiếp':'Ngươi đã ngã xuống'}[sc.over];
    return h+`<div class="cb-end ${sc.over}"><b>${t}</b>${sc.llGain?`<span class="chip up">⚔ +${llShowGain(sc.llGain/(tvPts(G.run.realm)/100))}% lịch luyện</span>`:''}${goBtn('cont','Tiếp tục')}</div></section>`;
  }
  h+='<div class="cb-cmd">';
  if(rp&&!CFG.autoFight){
    if(rp.dazed){h+=`<p class="cb-warn">Định lực cạn: ngươi choáng váng, buộc phải bỏ lượt này.</p><div class="skills main4"><button class="sk hl" data-act="skill" data-arg="_wait"><span class="cbi">${ic('skip')}</span><span class="sn">Qua lượt</span></button></div>`;}
    else if(pickMode){h+=`<p class="hint">Chạm vào kẻ địch để tung ${esc(pSkill(UI.pendSk).sk.n)}</p><div class="skills"><button class="sk" data-act="cancelSk"><span class="sn">Thôi</span></button></div>`;}
    else{
      const btn=(id,sk,lv,tip)=>{const c=skillCost(sk);const no=me.mp<c||(isPham()&&String(id)[0]!=='_');const d=sk.fx.p?Math.round(sk.fx.p*100)+'% uy lực':'';return `<button class="sk${(sk.t!=null&&String(sk.id||'')[0]!=='_')?' qk':''}" data-act="skill" data-arg="${id}"${no?' disabled':''} style="${(sk.t!=null&&String(sk.id||'')[0]!=='_')?pcs(sk.t):''}"${ta(tip||skillTip(sk,lv))}>${elSeal(sk.el)}<span class="sn"><span class="${(sk.t!=null&&String(sk.id||'')[0]!=='_')?'qt':''}">${esc(sk.n)}</span>${lv>1?' <i>'+'Ⅰ Ⅱ Ⅲ'.split(' ')[lv-1]+'</i>':''}<small>${[d,c?c+' linh lực':'',sk.fx.charge?'tụ lực':''].filter(Boolean).join(' · ')}</small></span></button>`;};
      const cp=r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].w!=='bt');const m=UI.menu;
      const back='<button class="sk mback" data-act="menu" data-arg=""><span class="sn">Quay lại</span></button>';
      if(m==='atk'){h+='<div class="skills">'+btn('_atk',BASIC,1,'Đánh thường bằng chân khí\nKhông tốn linh lực');for(const id of atkSlots()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}if(mindArt()){h+=`<button class="sk" data-act="mind"${!nlOk(me,NL_MIND)?' disabled':''}${ta('Đánh vào thức hải đối phương.\nThần thức của ngươi: '+rateOf('than',S().than).t.toLowerCase()+'. Hơn đối thủ thì làm nó choáng.')}><span class="el">Thần</span><span class="sn">Thần Thức Thứ<small>${pctOf(NL_MIND,me.maxNl||1)} niệm lực · làm choáng</small></span></button>`;}(r.dd||[]).forEach((d,j)=>{const used=sc.ddUsed&&sc.ddUsed[j];h+=`<button class="sk" data-act="dd" data-arg="${j}"${used||!nlOk(me,NL_DD)?' disabled':''}${ta('Tế '+d.rel.name+' từ đan điền ra đánh.\nMỗi trận một lần, không tốn linh lực.')}>${elSeal(d.rel.el||'vo')}<span class="sn" style="color:${PCOL[d.rel.tier||0]}">Tế ${esc(d.rel.name)}<small>${used?'đã dùng trận này':'uẩn dưỡng · mỗi trận một lần'}</small></span></button>`;});h+=back+'</div>';}
      else if(m==='def'){h+='<div class="skills">'+`<button class="sk" data-act="skill" data-arg="_block"${me.tl<TL_BLOCK?' disabled':''}${ta('Đỡ đòn: thủ thế, chạy dần từ mốc ra chiêu tới mốc phát lực.\nTrong quãng đó bị đánh thì đỡ được một lần: giảm khoảng 20–30% sát thương, tốn 30% thể lực.\nKhông ai đánh thì không có gì xảy ra.')}><span class="el">Đỡ</span><span class="sn">Đỡ đòn<small>30% thể lực</small></span></button>`;
        h+=btn('_guard',GUARD_SK,1,'Vận khí thủ thế\nĐược hộ thể và hồi 30% linh lực');for(const id of defSkills()){const k=r.skills.find(x=>x.id===id);h+=btn(id,SK[id],k.lv);}
        h+=back+'</div>';}
      else if(m==='bag'){h+=`<div class="skills">${cp.map(({p,i})=>`<button class="sk qk" data-act="cpill" data-arg="${i}"${nlOk(me,NL_PILL)?'':' disabled'} style="${pcs(p.q)}"${ta(pillTip(p.id,p.q)+'\nDùng trong trận tốn '+pctOf(NL_PILL,me.maxNl||1)+' niệm lực')}><span class="el">${PILL[p.id].i}</span><span class="sn qt">${esc(PILL[p.id].n)}</span></button>`).join('')}${back}</div>${cp.length?'':'<p class="hint">Túi không có gì dùng được trong trận.</p>'}`;}
      else h+=`<div class="skills main4"><button class="sk" data-act="menu" data-arg="atk"><span class="cbi">${ic('sword')}</span><span class="sn">Tấn công</span></button><button class="sk" data-act="menu" data-arg="def"><span class="cbi">${ic('shield')}</span><span class="sn">Phòng thủ</span></button><button class="sk" data-act="menu" data-arg="bag"${cp.length?'':' disabled'}><span class="cbi">${ic('bag')}</span><span class="sn">Túi đồ<small>${cp.length} món · ${pctOf(NL_PILL,me.maxNl||1)} niệm lực</small></span></button><button class="sk" data-act="skill" data-arg="_wait"${ta('Qua lượt: không làm gì, nhường lượt')}><span class="cbi">${ic('skip')}</span><span class="sn">Qua lượt</span></button></div>`;
    }
  } else h+=`<p class="hint cwait">${sc.dodge?(sc.dodge.lit||sc.dodge.blk?'Chạm “Đỡ” đúng lúc vòng khép lại':'Đòn đánh tới! Chạm “Né” đúng lúc vòng khép lại'):sc.qte?'Chạm đúng lúc vạch vào vùng vàng':CFG.autoFight?'Đang tự đánh…':'…'}</p>`;
  h+='</div>';
  // né: phủ tối cả màn hình, nút né nằm trên cùng; nghỉ một nhịp ngắn rồi vòng mới thu lại
  if(sc.dodge)h+=`<div class="dodge-ov" id="dodgeOv"><p>${sc.dodge.lit?'Lôi giáng!':sc.dodge.blk?'Đỡ đòn!':'Đòn đánh tới!'}${sc.dodge.n>1?' · '+sc.dodge.n+' nhát':''}</p><div class="dg-wrap"><span class="dg-ring" style="animation-duration:${sc.dodge.T}s;animation-delay:${DG_LEAD}s;animation-iteration-count:${sc.dodge.n}"></span><button id="dodgeBtn" class="dodge2">${sc.dodge.lit||sc.dodge.blk?'Đỡ':'Né'}</button></div><small>Chờ vòng vàng thu lại, chạm đúng lúc nó khép vào nút</small></div>`;
  if(sc.critQ)h+=`<div id="critq" class="qte critq"><b class="cq-t">Chí mạng!</b><div class="qbar"><i class="cqg"></i><span class="cqm"></span></div><p>Chạm khi vạch chạy vào vùng xanh. Trượt thì đòn vẫn trúng nhưng không chí mạng.</p></div>`;
  if(sc.qte)h+=`<div id="qte" class="qte"><div class="qbar"><i class="qg"></i><i class="qy"></i><span class="qm"></span></div><p>Chạm để tung chiêu</p></div>`;
  const sp=CFG.cspeed||1;
  // hàng nút ngoài: thiêu đốt thọ nguyên, thoát thân, nhận thua (chỉ khi đấu với người), rồi tự đánh, tốc độ, diễn biến
  const rdy=readyPlayer(sc)&&!CFG.autoFight&&!readyPlayer(sc).dazed;const bi=burnInfo(sc);
  let bx='';
  if(!(sc.kiep||sc.spar)){
    const dz=readyPlayer(sc)&&readyPlayer(sc).dazed;const used=rdy&&mainUnit(sc).burnedTurn;
    const pop=UI.burnOpen&&!sc.done?`<div class="burnpop">${bi.L.map(o=>`<div class="bp-o"><b>${esc(o.n)}</b><ul>${o.d.map(x=>`<li>${esc(x)}</li>`).join('')}<li class="bad">${esc(o.cost)}</li></ul>${o.ok?'':`<p class="bad">${esc(o.why)}</p>`}<button class="btn burnb" data-act="burn" data-arg="${o.k}"${rdy&&o.ok&&!used?'':' disabled'}>${ic('flame')} ${esc(o.n)}</button></div>`).join('')}${used?'<p class="bad">Lượt này đã dùng huyết thuật.</p>':''}${bi.done?'<p class="bad">Đã dùng hết huyết thuật trong trận này.</p>':''}<p class="hint">Mỗi lượt một lần. Đốt tinh huyết xong mới đốt được thọ nguyên. Huyết tế mỗi trận một lần.</p></div>`:'';
    bx+=`<span class="burnw">${pop}<button class="btn sm burn${UI.burnOpen?' on':''}" data-act="burnOpen"${bi.done||dz?' disabled':''}>${ic('flame')} ${bi.label}</button></span>`;}
  if(!(sc.boss||sc.kiep||sc.noFlee))bx+=`<button class="btn sm" data-act="flee"${rdy?'':' disabled'}${ta('Cả đội bỏ chạy\nThành công dựa vào thân pháp')}>${ic('run')} Thoát thân</button>`;
  if(fightsHuman(sc)&&!(sc.kiep||sc.spar||sc.en.n==='Tâm Ma'))bx+=`<button class="btn sm" data-act="yield"${rdy&&!injured()?'':' disabled'}${ta(injured()?'Đang mang thương, đối phương không tha: nhận thua cũng chết.':'Buông tay chịu thua.\nNgươi sẽ bị thương vài tháng và bị đối phương lục lấy một phần linh thạch, vài món đồ.')}>${ic('flag')} Nhận thua</button>`;
  h+=`<div class="cb-bot cb-ext">${bx}<button class="btn sm${CFG.autoFight?' on':''}" data-act="autoFight"${ta('Tự đánh: máy tự chọn chiêu và tự né ở mức khá.\nTắt đi để tự tay điều khiển.')}>${ic('bolt')} Tự đánh</button></div></section>`;
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
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return;if(sc.fxq&&sc.fxq.length)fxDrain(sc);
  if(sc.done||UI.panel||UI.modal||document.hidden||now<(UI.fxHold||0))return;
  if(sc.dodge){
    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now+DG_LEAD*1000,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[],lit:sc.dodge.lit,blk:sc.dodge.blk};}
    const d=UI.dg;if(now>d.t0+d.n*d.T+250){const o=[];for(let k=0;k<d.n;k++)o.push(d.offs[k]==null?null:d.offs[k]);UI.dg=null;dodgeResolve(o);after();}
    return;
  }
  if(sc.critQ){
    if(!UI.cq||UI.cq.id!==sc.critQ.id)UI.cq={id:sc.critQ.id,t0:now};
    if(CFG.autoFight){UI.cq=null;critResolve(chance(.7));after();return;}
    if(now>UI.cq.t0+CQ_T*2){UI.cq=null;critResolve(false);after();}
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
  if(d.pressed)return;d.pressed=1;
  {const me=mainUnit(G.run.scene);const used=d.offs.filter(x=>x!=null).length;if(!d.lit&&!d.blk&&me&&me.tl-used*TL_DODGE<TL_DODGE){const b=$('#dodgeBtn');if(b)b.textContent='Kiệt sức';return;}}
  d.offs[k]=(now-(d.t0+(k+1)*d.T))/1000;
  const b=$('#dodgeBtn');if(b){b.classList.add('hit');const a=Math.abs(d.offs[k]);b.textContent=a<=0.09?'Chuẩn!':a<=0.25?'Khá':'Hụt';}
}
// thanh trượt chí mạng: vạch chạy qua lại (mỗi lượt đi về CQ_T ms), vùng xanh ở giữa rộng 18%
const CQ_T=1800,CQ_G=[0.41,0.59];
function critPress(){const q=UI.cq;if(!q)return;const ph=((performance.now()-q.t0)%CQ_T)/CQ_T;const x=ph<0.5?ph*2:2-ph*2;UI.cq=null;critResolve(x>=CQ_G[0]&&x<=CQ_G[1]);after();}
function qtePress(){const q=UI.qt;if(!q)return;const ph=((performance.now()-q.t0)/1200);const x=ph<0.5?ph*2:2-ph*2;UI.qt=null;qteResolve(qteMult(clamp(x,0,1)));after();}
document.addEventListener('pointerdown',e=>{if(e.target.closest('#dodgeBtn,#dodgeOv')){e.preventDefault();dodgePress();}else if(e.target.closest('#critq')){e.preventDefault();critPress();}else if(e.target.closest('#qte')){e.preventDefault();qtePress();}},true);

// ---------- chuẩn bị trước trận: xem hai phe, chỉnh chiêu, dùng đồ (không tốn niệm lực), rồi bấm Bắt đầu ----------
{const _scU=startCombat;startCombat=function(spec,after){const res=_scU(spec,after);const sc=G.run&&G.run.scene;
  if(sc&&sc.type==='combat'&&!sc.kiep&&!UI.noPrep)sc.prep=1;return res;};}
// lực chiến dùng để so trong màn chuẩn bị (nhân vật chính lấy theo chỉ số hiện tại)
function pLc(u){return u.isMain?lucChien():lcCalc(u);}
// ai bị người này nghiền ép (khác phe, lực chiến kém từ 3 lần)
function crushVictims(sc,u){const o=sc.units.filter(x=>x.side!==u.side&&x.kind!=='kiep'&&x.hp>0);const a=pLc(u);return o.filter(x=>a>=pLc(x)*NE_T);}
function prepUnitRow(u,me,cmp){const foe=u.side==='B';const sub=me?realmLabel():u.sub||(foe?'Đối thủ':'Đồng hành');const S0=me?S():null;const sc=G.run.scene;
  let st=me?[['Khí huyết',pctOf(G.run.hp,S0.maxHp)],['Linh lực',S0.maxMp?pctOf(G.run.mp,S0.maxMp):'—'],['Niệm lực',RT('nl',S0.nl)],['Công',RT('atk',Math.max(S0.atk,S0.matk))],['Thủ',RT('def',S0.def)],['Thân pháp',RT('tp',S0.tp,'toc')]]
    :[['Khí huyết',RT('maxHp',u.max,'ben')],['Công',RT('atk',Math.max(u.atk,u.matk||0))],['Thủ',RT('def',u.def)],['Thân pháp',RT('tp',u.tp,'toc')],['Chí mạng',RT('crit',u.crit,'muc')]];
  if(cmp)st=st.filter(x=>['Khí huyết','Công','Thủ','Thân pháp'].includes(x[0]));
  const V=sc?crushVictims(sc,u):[];
  const tag=V.length?`<b class="lc-c ne"${ta('Nghiền ép '+V.map(x=>x.isMain?'ngươi':x.name).join(', ')+': lực chiến hơn hẳn một đại cảnh giới.\nBên bị nghiền ép chịu uy áp, đòn đánh vào người này gần như vô dụng.')}><span class="ne-i">${ic('skull')}</span>Nghiền ép</b>`:'';
  if(cmp)return `<div class="pp-u${foe?' foe':''}"><span class="u-av">${uAvatar(u)}</span><div class="pp-t"><div class="pp-nl"><span class="pp-n">${esc(u.name)}<small class="pp-sub">${elSeal(u.el||'vo')} ${esc(sub)}</small></span>${tag}</div>
   <div class="pp-st">${st.map(([a,b])=>`<span><small>${a}</small> ${b}</span>`).join('')}</div></div></div>`;
  return `<div class="pp-u${foe?' foe':''}"><span class="u-av">${uAvatar(u)}</span><div class="pp-t"><div class="pp-nl"><span class="pp-n">${esc(u.name)}</span>${tag}</div><small>${elSeal(u.el||'vo')} ${esc(sub)}</small>
   <div class="pp-st">${st.map(([a,b])=>`<span><small>${a}</small>${b}</span>`).join('')}</div></div></div>`;}
// so sức hai đội theo tổng lực chiến
function teamCmp(sc){const A=sc.units.filter(u=>u.side==='A'),B=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');const ta=A.reduce((s,u)=>s+pLc(u),0),tb=B.reduce((s,u)=>s+pLc(u),0);const q=tb/Math.max(1,ta);
  return q>=1.35?{side:'B',t:'Mạnh hơn',c:'st'}:q<=0.75?{side:'A',t:'Mạnh hơn',c:'st'}:{side:'B',t:'Vừa sức',c:'ev'};}
function vCbPrep(sc){const r=G.run;const A=sc.units.filter(u=>u.side==='A'),B=sc.units.filter(u=>u.side==='B');
  const cat=[['atk','Công'],['move','Thân pháp'],['def','Thủ'],['ult','Thần thông']];
  const kn=r.kn||{};const cp=r.pills.filter(p=>PILL[p.id].w!=='bt').length;
  const cmp=A.length+B.length>2;const T=teamCmp(sc);
  const solo=!cmp&&(T.side==='A'?A:B).some(u=>crushVictims(sc,u).length); // 1 đấu 1 đã có nghiền ép thì khỏi nhãn đội
  const lab=side=>T.side===side&&!solo?`<b class="lc-c ${T.c}"${ta(cmp?'So tổng lực chiến hai đội':'So lực chiến hai bên')}>${T.t}</b>`:'';
  const hd=(n,side,L)=>`<p class="pp-h"><span>${n}${cmp?' · '+L.length+' người':''}</span>${lab(side)}</p>`;
  let b=`<div class="pp-sides${cmp?' pp-cmp':''}"><div>${hd('Phe ta','A',A)}${A.map(u=>prepUnitRow(u,u.isMain,cmp)).join('')}</div><div>${hd('Phe địch','B',B)}${B.map(u=>prepUnitRow(u,false,cmp)).join('')}</div></div>`;
  b+=`<div class="pp-quick">${crushAny(sc)?`<button class="btn sm cb-quick" data-act="cbQuick"${ta('Bỏ qua trận đánh: hệ thống tự đánh thay ngươi và tính kết quả.\nKhí huyết, linh lực, đồ dùng, chiến lợi phẩm vẫn thay đổi như đánh thật.')}>Tốc chiến</button>`:''}</div>`;
  b+=`<p class="pp-h">Chiêu thức đang gắn</p><div class="pp-kn">${cat.map(([c,n])=>`<div><small>${n}</small>${(kn[c]||[]).length?(kn[c]).map(id=>SK[id]?`<span>${elSeal(SK[id].el)} ${esc(SK[id].n)}</span>`:'').join(''):'<span class="hint">trống</span>'}</div>`).join('')}</div>`;
  b+=`<div class="pp-act"><button class="btn" data-act="prepKn">${ic('scroll')} Chỉnh chiêu thức</button><button class="btn" data-act="prepBag">${ic('bag')} Túi đồ · ${cp} món</button></div>`;
  b+=`<p class="hint">Dùng đồ lúc này không tốn niệm lực. Vào trận rồi, mỗi lần dùng tốn ${pctOf(NL_PILL,S().nl||1)} niệm lực.</p>`;
  return card('Sắp giao chiến',sc.en.n+(sc.boss?' · thủ lĩnh':sc.elite?' · tinh anh':''),b,{cls:'tall cbprep',foot:`<span class="grow"></span><button class="btn pri big" data-act="cbGo">Bắt đầu</button><span class="grow"></span>`});}
// tốc chiến: tự đánh tới hết trận, không hiện quá trình
function quickFight(){const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return;prepGo();const o=G.meta.opt=G.meta.opt||{};const ad=o.autoDodge,aq=o.autoQte;o.autoDodge=true;o.autoQte=true;
  try{for(let i=0;i<40000&&G.run&&G.run.scene===sc&&!sc.done;i++){
    if(sc.dodge){dodgeResolve('auto');continue;}if(sc.critQ){critResolve(chance(.7));continue;}if(sc.qte){qteResolve(qteMult(0.5+Math.random()*0.3));continue;}
    if(readyPlayer(sc)){autoPick(sc);continue;}combatStep(0.05);}}
  finally{o.autoDodge=ad;o.autoQte=aq;}
  if(G.run&&G.run.scene===sc){sc.fxq=[];sc.quick=1;}UI.fxHold=0;UI.dg=null;UI.cq=null;UI.qt=null;}
SCENE_V.combat=vCbPrep;
function prepGo(){const sc=G.run&&G.run.scene;if(!sc||!sc.prep)return;const me=mainUnit(sc),f=playerUnit();
  for(const k of ['hp','max','mp','maxMp','atk','matk','def','crit','critDmg','hoTam','tp','cx','ne','hoi','skills','nl','maxNl','el'])me[k]=f[k];
  sc.prep=0;UI.panel=null;UI.menu=null;sc.rev=(sc.rev||0)+1;}
