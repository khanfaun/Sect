// ---------- màn chiến đấu ----------
const STI={stance:['Thủ','Thủ thế đỡ đòn: đứng chờ đòn, giảm khoảng 20–30% sát thương, tốn 30% thể lực'],block:['Hộ','Hộ thể: chặn sát thương'],poison:['Độc','Độc: mất khí huyết mỗi khi về mốc đầu, giảm dần'],burn:['Thiêu','Thiêu: mất khí huyết mỗi khi về mốc đầu, giảm một nửa'],weak:['Suy','Suy nhược: sát thương gây ra giảm 30%'],vuln:['Phá','Phá giáp: nhận thêm 30% sát thương'],rage:['Nộ','Cuồng nộ: mỗi tầng +12% sát thương'],regen:['Hồi','Hồi xuân: hồi 6% khí huyết mỗi khi về mốc đầu'],evade:['Độn','Ảnh độn: né trọn đòn kế tiếp']};
function stIcons(st){let o='';for(const k in STI){const v=st[k];if(v>0)o+=`<span class="si si-${k}"${ta(STI[k][1])}>${STI[k][0]}<b>${v}</b></span>`;}if(st.tap)o+=`<span class="si si-uyap"${ta('Khí thế bị lấn át: kém '+(st.tap>1?'từ hai bậc':'một bậc')+', công và thủ giảm '+(st.tap>1?'khá':'nhẹ'))}>Áp<b>${st.tap}</b></span>`;if(st.uyap)o+=`<span class="si si-uyap"${ta('Bị uy áp: đối thủ hơn hẳn một đại cảnh giới. Đòn đánh gần như vô dụng, đòn nhận vào nặng hơn nhiều.')}>Uy áp</span>`;if(st.soul>0)o+=`<span class="si si-soul"${ta('Đốt nguyên thần: đòn đánh xuyên 25% thủ, hút 10% sát thương')}>Thần<b>${st.soul}</b></span>`;return o?`<div class="sts">${o}</div>`:'';}
function unitKind(u){if(u.kind==='kiep')return 'kiep'+(u.kk?'-'+u.kk:'');if(u.side==='A')return 'nhan';return u.f==='nhan'?'ma':(u.f||'vat');}

// thanh chỉ số trong trận: khí huyết đổi màu theo mức (xanh, vàng, đỏ)
function hpCls(u){const p=u.hp/Math.max(1,u.max);return p>0.5?'hp':p>0.2?'hp mid':'hp low';}
function cBar(cur,max,cls){return `<div class="cbar ${cls}"><i style="width:${clamp(cur/Math.max(1,max)*100,0,100)}%"></i></div>`;}
function phBadge(u){return u.dazed?`<span class="ph dz"${ta('Cạn định lực: mất lượt kế tiếp')}>choáng</span>`:u.phase==='charge'?`<span class="ph"${ta('Đang tụ lực: tới mốc phát lực thì tung chiêu')}>tụ lực</span>`:u.phase==='guard'?`<span class="ph"${ta('Đang thủ thế: bị đánh trước mốc phát lực thì đỡ được một lần')}>thủ thế</span>`:u.stunT>0?'<span class="ph dz">choáng</span>':'';}
function dlOf(u){return u.dl==null?100:u.dl;}
function uAvatar(u){const foe=u.side==='B';return u.isMain?(typeof avatarMe==='function'?avatarMe():assetImg('hero','me',u.icon)):foe?assetImg('foe',u.boss?'_boss':ASSET.foe[u.k]?u.k:'_'+(u.f||'thu'),u.icon):assetImg('pet',u.k||u.name,u.icon);}
// thẻ kẻ địch / đồng hành. compact: chỉ avatar ở giữa, thanh khí huyết, thanh định lực, trạng thái

// thẻ nhân vật chính: avatar có vòng thần lực (chạm để hiển hóa pháp tướng / tung đòn tối thượng)

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

// máy đánh thay khi bật "Tự đánh"
function autoPick(sc){
  const r=G.run,me=mainUnit(sc),s=S();
  if(me.dazed){playerAct('_wait');return;}
  if(!sc.kiep){if(!sc.pt&&(me.than||0)>=100)playerUlt();if(sc.pt&&sc.pt.sk&&(sc.pt.left===1||(sc.pt.left<0&&me.hp<me.max*0.5))){if(playerUlt())return;}}
  if(me.hp<me.max*0.35){const i=r.pills.findIndex(p=>p.id==='hoixuan'||p.id==='baohuyet');if(i>=0){playerPillAct(i);return;}}
  let best='_atk',bp=BASIC.fx.p;
  for(const id of atkSlots()){const sk=SK[id];if(skLocked(id))continue;if(skillCost(sk)<=me.mp&&(sk.fx.p||0)>bp){bp=sk.fx.p;best=id;}}
  if(me.mp<me.maxMp*0.15&&best==='_atk'&&Math.random()<0.3)best='_guard';
  playerAct(best);
}
function combatFrame(now,dt){
  const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return;if(sc.fxq&&sc.fxq.length)fxDrain(sc);
  if(sc.done||UI.panel||UI.modal||document.hidden||now<(UI.fxHold||0))return;
  if(sc.dodge){
    if(!UI.dg||UI.dg.id!==sc.dodge.id){UI.dg={id:sc.dodge.id,t0:now+DG_LEAD*1000,n:sc.dodge.n,T:sc.dodge.T*1000,offs:[],lit:sc.dodge.lit,blk:sc.dodge.blk};}
    const d=UI.dg;
    if(!d.pressed&&(d.lit||d.blk?CFG.autoBlk:CFG.autoDg)){if(d.autoAt==null){const r0=Math.random();const j=r0<0.45?(Math.random()*2-1)*0.08:r0<0.8?(0.1+Math.random()*0.14)*(Math.random()<0.5?-1:1):r0<0.92?0.3+Math.random()*0.2:null;d.autoAt=j==null?-1:d.t0+d.T+j*1000;}
      if(d.autoAt>0&&now>=d.autoAt)dodgePress();}if(now>d.t0+d.n*d.T+250){const o=[];for(let k=0;k<d.n;k++)o.push(d.offs[k]==null?null:d.offs[k]);UI.dg=null;dodgeResolve(o);after();}
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
  {const me=mainUnit(G.run.scene);const used=d.offs.filter(x=>x!=null).length;if(!d.lit&&!d.blk&&me&&me.tl-used*tlD(me)<tlD(me)){const b=$('#dodgeBtn');if(b)b.textContent='Kiệt sức';return;}}
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
  if(sc&&sc.type==='combat'&&(!sc.kiep||bbTemp())&&!UI.noPrep)sc.prep=1;
  if(sc&&sc.prep&&bbTemp()){const r=G.run;const k='bbAsk'+r.bt.si;if(!r.bt[k]&&bbBooks().length){r.bt[k]=1;UI.modal={k:'bbLearn'};}}return res;};}
// lực chiến dùng để so trong màn chuẩn bị (nhân vật chính lấy theo chỉ số hiện tại)
function pLc(u){return u.isMain?lucChien():lcCalc(u);}
// ai bị người này nghiền ép (khác phe, lực chiến kém từ 3 lần)
function crushVictims(sc,u){const o=sc.units.filter(x=>x.side!==u.side&&x.kind!=='kiep'&&x.hp>0);const a=pLc(u);return o.filter(x=>a>=pLc(x)*NE_T);}
function prepUnitRow(u,me,cmp){const foe=u.side==='B';const kp=u.kind==='kiep';const sub=me?realmLabel():kp?'Thiên kiếp':u.sub||(foe?'Đối thủ':'Đồng hành');const sc=G.run.scene;
  const S0=me?S():null;const hp=me?G.run.hp:u.hp,mh=me?S0.maxHp:u.max,mp=me?G.run.mp:(u.mp||0),mm=me?S0.maxMp:(u.maxMp||0);
  const V=sc?crushVictims(sc,u):[];
  const tag=V.length?`<b class="lc-c ne"${ta('Nghiền ép '+V.map(x=>x.isMain?'ngươi':x.name).join(', ')+': lực chiến hơn hẳn một đại cảnh giới.\nBên bị nghiền ép chịu uy áp: đòn đánh gần như vô dụng, và không né, không đỡ được đòn của kẻ nghiền ép.')}><span class="ne-i">${ic('skull')}</span>Nghiền ép</b>`:'';
  const lc=kp?'<b class="lc-c st">Gục là chết</b>':RT('lc',pLc(u)); // thiên kiếp không so lực chiến như một đối thủ
  return `<div class="pp-u${foe?' foe':''}"><span class="u-av"${unitTal(u)?ta('Tiềm chất: '+TAL_N[unitTal(u).tier]):''}>${uAvatar(u)}</span><div class="pp-t"><div class="pp-nl"><span class="pp-n">${esc(u.name)}<small class="pp-sub">${elSeal(u.el||'vo')} ${esc(sub)}</small></span>${tag}</div>
   <div class="pp-row2"><div class="pp-bars"><span${ta('Khí huyết')}>${ic('heart')}${cBar(hp,mh,'hp'+(hp<mh*0.3?' low':hp<mh*0.6?' mid':''))}</span><span${ta(mm?'Linh lực':'Chưa có linh lực')}>${ic('drop')}${cBar(mp,mm||1,'mp')}</span></div>
   <div class="pp-lc"${ta(foe?'Lực chiến của kẻ này, so với người ở cảnh giới của ngươi':'Lực chiến so với người cùng cảnh giới')}>${lc}</div></div></div></div>`;}
// so sức hai đội theo tổng lực chiến
function teamCmp(sc){const A=sc.units.filter(u=>u.side==='A'),B=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');if(sc.units.some(u=>u.kind==='kiep'))return {side:'',t:'',c:''};const ta=A.reduce((s,u)=>s+pLc(u),0),tb=B.reduce((s,u)=>s+pLc(u),0);const q=tb/Math.max(1,ta);
  return q>=1.35?{side:'B',t:'Mạnh hơn',c:'st'}:q<=0.75?{side:'A',t:'Mạnh hơn',c:'st'}:{side:'B',t:'Vừa sức',c:'ev'};}

// tốc chiến: tự đánh tới hết trận, không hiện quá trình
function quickFight(){const sc=G.run&&G.run.scene;if(!sc||sc.type!=='combat')return;prepGo();const o=G.meta.opt=G.meta.opt||{};const ad=o.autoDodge,aq=o.autoQte;o.autoDodge=true;o.autoQte=true;
  try{for(let i=0;i<40000&&G.run&&G.run.scene===sc&&!sc.done;i++){
    if(sc.dodge){dodgeResolve('auto');continue;}if(sc.critQ){critResolve(chance(.7));continue;}if(sc.qte){qteResolve(qteMult(0.5+Math.random()*0.3));continue;}
    if(readyPlayer(sc)){autoPick(sc);continue;}combatStep(0.05);}}
  finally{o.autoDodge=ad;o.autoQte=aq;}
  if(G.run&&G.run.scene===sc){sc.fxq=[];sc.quick=1;}UI.fxHold=0;UI.dg=null;UI.cq=null;UI.qt=null;}

function prepGo(){const sc=G.run&&G.run.scene;if(!sc||!sc.prep)return;const me=mainUnit(sc),f=playerUnit();
  for(const k of ['hp','max','mp','maxMp','atk','matk','def','crit','critDmg','hoTam','tp','cx','ne','hoi','skills','nl','maxNl','el'])me[k]=f[k];
  sc.prep=0;UI.panel=null;UI.menu=null;sc.rev=(sc.rev||0)+1;}
// màn chuẩn bị: thần thức không đủ thì không thấy khí huyết, linh lực, lực chiến của đối phương
{const _pur=prepUnitRow;prepUnitRow=function(u,me,cmp){if(u.side==='B'&&!canSee(u))return `<div class="pp-u foe"><span class="u-av"${ta('Thần thức không đủ để dò xét')}>${uAvatar(u)}</span><div class="pp-t"><div class="pp-nl"><span class="pp-n">${esc(u.name)}</span></div><small class="u-s nosee">Thần thức không dò thấu</small></div></div>`;return _pur(u,me,cmp);};}
{const _tc=teamCmp;teamCmp=function(sc){if(sc.units.some(u=>u.side==='B'&&!canSee(u)))return {side:'B',t:'Không rõ',c:'ev'};return _tc(sc);};}
