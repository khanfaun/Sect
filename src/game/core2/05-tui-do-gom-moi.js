// ----- túi đồ: gom mọi thứ mang theo thành các ô, cùng loại thì chồng lên nhau -----
// Bảng BAG_CAT: content/rules/bag-cat.js
function bagItems(){const r=run2();eqOf();const L=[];
  r.relics.forEach((x,i)=>L.push({key:'r'+i,cat:'eq',n:x.name,tier:x.tier||0,cnt:1,el:x.el||'vo',slot:slotOf(x),ref:{t:'rel',i},tip:fxLines(relicFx(x),x).join('\n')+'\n\n'+(x.lore||'')}));
  const st={};r.pills.forEach((p,i)=>{const k='p'+p.id+':'+(p.q||0);if(!st[k])L.push(st[k]={key:k,cat:'dan',n:PILL[p.id].n,tier:p.q||0,cnt:0,em:PILL[p.id].i,ref:{t:'pill',id:p.id,q:p.q||0},use:PILL[p.id].w==='any',tip:pillTip(p.id,p.q)});st[k].cnt++;});
  const M={thao:'duoc',khoang:'khoang',dan:'vl'};for(const k in MAT)if(r.mats[k]>0)L.push({key:'m'+k,cat:M[k],n:MAT[k].n,tier:0,cnt:r.mats[k],em:MAT[k].i,ref:{t:'mat',k},tip:MAT[k].d});
  r.eggs.forEach((e,i)=>L.push({key:'e'+i,cat:'trung',n:contentText("core2_05-tui-do-gom-moi_js.bagItems.008")+e.n,tier:1,cnt:1,em:'🥚',ref:{t:'egg',i},tip:e.t>W().t?'Còn '+durH(e.t-W().t)+contentText("core2_05-tui-do-gom-moi_js.bagItems.009"):contentText("core2_05-tui-do-gom-moi_js.bagItems.010")}));
  r.passes.forEach(g=>L.push({key:'q'+g,cat:'nv',n:contentText("core2_05-tui-do-gom-moi_js.bagItems.011")+REG[g].n,tier:2,cnt:1,em:'🎫',ref:{t:'pass'},tip:contentText("core2_05-tui-do-gom-moi_js.bagItems.012")+REG[g].n+'.'}));
  return L;}
function bagUse(key,n){const r=G.run;const it=bagItems().find(x=>x.key===key);if(!it||!it.use)return 0;let c=0;
  for(let k=0;k<n;k++){const i=r.pills.findIndex(p=>p.id===it.ref.id&&(p.q||0)===it.ref.q);if(i<0)break;const m=usePill(i,false);if(!G.run)break;if(m===false||r.pills[i]&&r.pills.filter(p=>p.id===it.ref.id&&(p.q||0)===it.ref.q).length===it.cnt-c)break;c++;}
  if(c&&G.run)log('Dùng '+c+' '+it.n+'.');return c;}
function bagDrop(key,n){const r=G.run;const it=bagItems().find(x=>x.key===key);if(!it)return 0;if(it.ref.t==='rel'?r.relics[it.ref.i].lock:(r.locks&&r.locks[key]))return 0;const R0=it.ref;let c=0;
  if(R0.t==='rel'){r.relics.splice(R0.i,1);c=1;}
  else if(R0.t==='pill'){for(let k=0;k<n;k++){const i=r.pills.findIndex(p=>p.id===R0.id&&(p.q||0)===R0.q);if(i<0)break;r.pills.splice(i,1);c++;}}
  else if(R0.t==='mat'){c=Math.min(n,r.mats[R0.k]);r.mats[R0.k]-=c;}
  else if(R0.t==='egg'){r.eggs.splice(R0.i,1);c=1;}
  if(c)log('Vứt '+c+' '+it.n+'.');saveSoon();return c;}

// ================= ĐỢT 5: CÔNG PHÁP, TÂM PHÁP, SỞ HỌC, KỸ NĂNG =================
// Công pháp: cộng chỉ số theo hệ và mang 1–3 chiêu. Tâm pháp: toàn nội tại, đôi khi có đòn thần thức.
// Học từ bí tịch; chỉ môn đang đặt trong vòng vận công mới vận hành.
function skCat(sk){return sk.fx.evade?'move':!sk.fx.p?'def':sk.t>=3?'ult':'atk';}
// Bảng CAT_N, CAT_MAX: content/rules/cat-n.js
// Bảng ART_SFX: content/items/art-sfx.js
// Bảng EL_FX: content/rules/el-fx.js
// Bảng PAS: content/items/pas.js
// Bảng FX_N: content/items/fx-n.js
SLOT_N.book=contentText("core2_05-tui-do-gom-moi_js.025");KSLOT.book='book';BAG_CAT.bitich=contentText("core2_05-tui-do-gom-moi_js.026");
// ----- công pháp, tâm pháp theo "dòng": mỗi dòng là một chỉ số hoặc một chiêu; tham ngộ lên tầng mới mở dòng kế tiếp,
// và dòng nào ghi cảnh giới thì phải đủ cảnh giới mới có tác dụng. Bản thân môn cũng đòi cảnh giới mới học được.
// Bảng ART_REQ: content/items/art-req.js               // cảnh giới tối thiểu thường gặp theo phẩm
// Bảng ART_LINES: content/items/art-lines.js             // số dòng theo phẩm
// Bảng LV_N: content/rules/lv-n.js
// Bảng STAGE_FX: content/rules/stage-fx.js
function reqName(q){return q?REALM[q]:contentText("core2_05-tui-do-gom-moi_js.reqName.040");}
function artReqMul(req){return 1+0.12*(req||0);}
// trần cho các chỉ số dễ vỡ cân bằng
// Bảng FX_CAP: content/items/fx-cap.js
function genArt(type,tier,sid,o){const r=G.run;o=o||{};r.aid=(r.aid||0)+1;tier=clamp(Math.round(tier),0,6);
  const req=o.req!=null?o.req:clamp(ART_REQ[tier]+(chance(.25)?1:0),0,5);
  const nL=ART_LINES[tier];const span=tier>=4?2:tier>=2?1:(chance(.5)?1:0);
  let el,sks=[];
  if(type==='cp'){const sk0=SK[sid]||SK[rollSkill(clamp(tier,1,4))];el=sk0.el;const want=tier<=1?1:tier<=3?2:3;sks=[sk0.id];const cats=new Set([skCat(sk0)]);
    for(const id of shuffle(SK_RAW.filter(s=>(s[2]===el||s[2]==='vo')&&s[3]<=clamp(tier+1,1,5)&&s[0]!==sk0.id).map(s=>s[0]))){if(sks.length>=want)break;const c=skCat(SK[id]);if(cats.has(c))continue;cats.add(c);sks.push(id);}}
  else el=o.el||(chance(.6)?pick(r.root.els):pick(['vo','kim','moc','thuy','hoa','tho']));
  // xếp dòng: dòng 1 là chỉ số chính; chiêu rải đều, chiêu mạnh nhất ở cuối
  const L=[];const pas=shuffle(Object.keys(PAS));let pi=0;
  const statLine=()=>{if(chance(.18)&&!L.some(x=>x.fx&&STAGE_FX[x.fx])){const k=pick(Object.keys(STAGE_FX));return {fx:k,v:1.5,stage:1};}const p=PAS[pas[(pi++)%pas.length]];return {fx:p.fx,v:p.v,n:p.n,d:p.d,int:p.int};};
  if(type==='cp'){const e=EL_FX[el]||EL_FX.vo;L.push({fx:e[0],v:e[1]});}else L.push(statLine());
  const skPos=type==='cp'?(sks.length===1?[1]:sks.length===2?[1,nL-1]:[1,Math.floor(nL/2),nL-1]):[];
  const sorted=sks.slice().sort((a,b)=>SK[a].t-SK[b].t);
  const mind=type==='tp'&&chance(tier>=3?.45:.15)?Math.max(1,nL-1):-1;
  for(let i=1;i<nL;i++){const j=skPos.indexOf(i);if(j>=0)L.push({sk:sorted[j]});else if(i===mind)L.push({mind:1});else L.push(statLine());}
  L.forEach((x,i)=>{x.req=clamp(req+Math.floor(i*span/Math.max(1,nL-1)+(i===nL-1&&span?0.01:0)),0,5);});
  const a={u:r.aid,type,n:pick(RELIC_PRE[el]||RELIC_PRE.vo)+' '+pick(ART_SFX[type]),el,tier,req,lv:1,lines:L,v:2};
  return a;}
// bản lưu cũ: đổi môn kiểu cũ (sk, pas, lv 1–3) sang kiểu dòng
function normArt(a){if(!a||a.v===2)return a;const L=[];
  if(a.type==='cp'){const e=EL_FX[a.el]||EL_FX.vo;L.push({fx:e[0],v:e[1]});}
  for(const id of a.sk||[])L.push({sk:id});for(const k of a.pas||[]){const p=PAS[k];if(p)L.push({fx:p.fx,v:p.v,n:p.n,d:p.d,int:p.int});}if(a.mind)L.push({mind:1});
  const req=ART_REQ[a.tier]||0;L.forEach(x=>x.req=req);a.req=req;a.lines=L;a.lv=a.lv>=3?L.length:Math.min(L.length,(a.lv||1)+1);a.v=2;return a;}
function artOpen(a,i){const r=G.run;const x=a.lines[i];return i<a.lv&&r.realm>=x.req;}
function artSk(a){return a.lines.filter((x,i)=>x.sk&&artOpen(a,i)).map(x=>x.sk);}
function artMind(a){return a.lines.some((x,i)=>x.mind&&artOpen(a,i));}
function skLvOf(a){return clamp(1+Math.floor((a.lv-1)/3),1,3);}
function artAff(a){const r=G.run;return a.el==='vo'||r.root.els.includes(a.el)?1:0.8;}
function artScale(a,pot){return Math.pow(PHAM_M[a.tier],0.85)*artReqMul(a.req)*artAff(a)*(pot==null?1:pot);}
function lineVal(a,x,pot){const r=G.run;let v=x.v*artScale(a,pot);if(x.stage)v=x.v*(1+a.tier*0.4)*artAff(a)*(pot==null?1:pot)*(r.realm+1);else if(FX_CAP[x.fx])v=Math.min(FX_CAP[x.fx],v);return x.int?Math.max(1,Math.round(v)):Math.round(v*10)/10;}
function lineText(a,x,pot){if(x.sk){const s=SK[x.sk];return contentText("core2_05-tui-do-gom-moi_js.lineText.041")+s.n+' ('+CAT_N[skCat(s)].toLowerCase()+')';}if(x.mind)return contentText("core2_05-tui-do-gom-moi_js.lineText.042");
  const v=numFx(lineVal(a,x,pot));if(x.stage)return STAGE_FX[x.fx].replace('{v}',numFx(Math.round(x.v*(1+a.tier*0.4)*artAff(a)*(pot==null?1:pot)*10)/10))+contentText("core2_05-tui-do-gom-moi_js.lineText.043")+v+'%)';return (x.n?x.n+': ':'')+(x.d||FX_N[x.fx]||x.fx).replace('{v}',v);}
// chỉ các dòng chỉ số đã mở mới có tác dụng
function artFxList(a,pot){const L=[];a.lines.forEach((x,i)=>{if(!x.fx||!artOpen(a,i))return;const k=x.stage?x.fx.replace('Stage','P'):x.fx;L.push({k,v:lineVal(a,x,pot),t:x.stage?STAGE_FX[x.fx]:(x.d||FX_N[x.fx]),n:x.n});});return L;}
function artLines(a,pot){return a.lines.map((x,i)=>artOpen(a,i)?lineText(a,x,pot):null).filter(Boolean);}
function numFx(v){return String(v).replace('.',',');}
function artDesc(a){return (a.type==='cp'?contentText("core2_05-tui-do-gom-moi_js.artDesc.044"):contentText("core2_05-tui-do-gom-moi_js.artDesc.045"))+' hệ '+(EL[a.el]||EL.vo).n+contentText("core2_05-tui-do-gom-moi_js.artDesc.046")+reqName(a.req)+'.\n'+a.lines.map((x,i)=>'• '+lineText(a,x)).join('\n');}
function artNextWhy(a){const r=G.run;if(a.lv>=a.lines.length)return contentText("core2_05-tui-do-gom-moi_js.artNextWhy.047");const x=a.lines[a.lv];if(r.realm<x.req)return contentText("core2_05-tui-do-gom-moi_js.artNextWhy.048")+reqName(x.req)+'.';return '';}
function studyTime(a){return Math.round((2+a.lv)*2*(1+a.tier*0.25))*HM;}
function bookOf(a){return {name:contentText("core2_05-tui-do-gom-moi_js.bookOf.049")+a.n,k:'book',tier:a.tier,el:a.el,fx:{},lore:artDesc(a),art:a,seen:1};}
function gainSkill(id){const r=G.run,sk=SK[id];if(!sk)return null;run2();const a=genArt('cp',sk.t,id);const b=bookOf(a);r.relics.push(b);log('Được '+b.name+'.');
  return chip('📖',b.name,PHAM[a.tier]+'\n'+b.lore+contentText("core2_05-tui-do-gom-moi_js.gainSkill.050"),'item',a.tier);}
function gainBookTp(tier){const r=G.run;run2();const b=bookOf(genArt('tp',tier));r.relics.push(b);return b;}
function arts(){const r=G.run;if(!r.arts)r.arts=[];for(const a of r.arts)if(a.v!==2)normArt(a);return r.arts;}
function artBy(u){return arts().find(a=>a.u===u);}
function learnTime(a){return (a.tier+1)*2*HM;}
// Bảng ART_MAX, ART_CAP: content/items/art-max.js
function artCap(type){const r=G.run;return ART_CAP[type][clamp(r.realm,0,5)];}
function learnWhy(rel){const r=G.run;if(rel&&rel.art&&!arts().some(x=>x.n===rel.art.n&&x.type===rel.art.type)&&arts().filter(x=>x.type===rel.art.type).length>=artCap(rel.art.type))return contentText("core2_05-tui-do-gom-moi_js.learnWhy.051")+artCap(rel.art.type)+' ô '+(rel.art.type==='cp'?contentText("core2_05-tui-do-gom-moi_js.learnWhy.052"):contentText("core2_05-tui-do-gom-moi_js.learnWhy.053"))+contentText("core2_05-tui-do-gom-moi_js.learnWhy.054");if((r.scene&&r.scene.type!=='place')||r.moving)return contentText("core2_05-tui-do-gom-moi_js.learnWhy.055");normArt(rel.art);if(r.realm<rel.art.req)return 'Cần '+reqName(rel.art.req)+contentText("core2_05-tui-do-gom-moi_js.learnWhy.056");return '';}
function learnBook(i){const r=G.run;const rel=r.relics[i];if(!rel||rel.k!=='book'||learnWhy(rel))return null;const a=rel.art;r.relics.splice(i,1);
  const old=arts().find(x=>x.n===a.n&&x.type===a.type);advanceTime(learnTime(a));if(!G.run)return null;let t;
  if(old){if(old.lv<old.lines.length)old.lv++;t=contentText("core2_05-tui-do-gom-moi_js.learnBook.057", [a.n,LV_N[old.lv-1]]);}
  else{r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}t=contentText("core2_05-tui-do-gom-moi_js.learnBook.058", [a.n]);if(a.lines.some(x=>x.sk&&SK[x.sk].dao)&&addDao(3,'skill'))t+=contentText("core2_05-tui-do-gom-moi_js.learnBook.059");}
  log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function studyArt(u){const r=G.run;const a=artBy(u);if(!a||artNextWhy(a)||(r.scene&&r.scene.type!=='place')||r.moving)return null;advanceTime(studyTime(a));if(!G.run)return null;a.lv++;const t=contentText("core2_05-tui-do-gom-moi_js.studyArt.060", [a.n,LV_N[a.lv-1]]);log(t);syncSkills();clampHp();autoCheck();saveSoon();return t;}
function dropArt(u){const r=G.run;r.arts=arts().filter(a=>a.u!==u);for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].u===u)r.chu[j]=null;syncSkills();clampHp();saveSoon();}
function learnAll(){const r=G.run;if(!r||(r.scene&&r.scene.type!=='place')||r.moving)return;for(let i=r.relics.length-1;i>=0&&G.run;i--)if(r.relics[i]&&r.relics[i].k==='book'&&!learnWhy(r.relics[i]))learnBook(i);}
// ----- vòng vận công: giờ đặt công pháp, tâm pháp. Có huyệt (mạnh gấp rưỡi) và ô tắc phải đả thông -----
function chuKey(c){return c?'a:'+c.u:'';}
function chuItem(c){if(!c||c.k!=='a')return null;const a=artBy(c.u);return a?{k:'a',u:a.u,n:a.n,el:a.el,tier:a.tier,type:a.type,lv:a.lv}:null;}
function chuPool(){const r=run2();const used=new Set(r.chu.filter(Boolean).map(c=>c.u));return arts().filter(a=>!used.has(a.u)).map(a=>({k:'a',u:a.u}));}
function chuSlots(){const r=G.run;if(!r.chuOpen)r.chuOpen=4;return Math.min(r.chuOpen,CHU_N[r.realm]||4);}
function chuBlocked(){const r=G.run;return Math.max(0,(CHU_N[r.realm]||4)-chuSlots());}
function chuUnblock(){const r=G.run;if(!chuBlocked()||r.tv<15||r.scene||r.moving)return false;r.tv-=15;advanceTime(6*HM);if(!G.run)return true;r.chuOpen=chuSlots()+1;log(contentText("core2_05-tui-do-gom-moi_js.chuUnblock.061"));autoCheck();saveSoon();return true;}
function chuHuyet(){const r=G.run;const h=hashS('huyet'+r.ten+r.kiep);const a=h%8;let b=(h>>>3)%8;if(b===a)b=(b+3)%8;return [a,b];}
function chuPot(v,i){const n=v.n;const lin=v.links[(i-1+n)%n];return Math.max(0.3,1+(lin===1?0.15:lin===-1?-0.15:lin===2?0.08:0)+(chuHuyet().includes(i)?0.5:0)+(v.dai?0.2:0));}
function chuFx(fx){const r=G.run;if(!r||!r.chu||!r.arts)return;const v=chuView();
  for(let i=0;i<v.n;i++){const it=v.it[i];if(!it)continue;const a=artBy(it.u);for(const x of artFxList(a,chuPot(v,i)))fx[x.k]=(fx[x.k]||0)+x.v;
    const l=v.links[(i-1+v.n)%v.n];if(l)fx.elP[it.el]=(fx.elP[it.el]||0)+(l===1?6:l===2?3:-5);}
  if(v.dai)fx.tvP=(fx.tvP||0)+10;}
function activeArts(){const r=run2();const n=chuSlots();const L=[];for(let i=0;i<n;i++){const a=r.chu[i]&&artBy(r.chu[i].u);if(a)L.push(a);}return L;}
// ----- kỹ năng: gắn chiêu của các môn đang vận hành vào ô dùng trong trận -----
function knAvail(cat){const m={};for(const a of activeArts()){const lv=skLvOf(a);for(const id of artSk(a))if(skCat(SK[id])===cat&&(!m[id]||m[id]<lv))m[id]=lv;}return m;}
function syncSkills(){const r=G.run;if(!r||!r.arts)return;if(!r.kn)r.kn={atk:[],def:[],move:[],ult:[]};const out=[];
  for(const c in CAT_MAX){const av=knAvail(c);let L=(r.kn[c]||[]).filter((id,i,A)=>av[id]&&A.indexOf(id)===i).slice(0,CAT_MAX[c]);
    if(!r.knManual||!r.knManual[c])for(const id of Object.keys(av).sort((x,y)=>SK[y].t-SK[x].t)){if(L.length>=CAT_MAX[c])break;if(!L.includes(id))L.push(id);}
    r.kn[c]=L;for(const id of L)out.push({id,lv:av[id]});}
  r.skills=out;r.atkSlots=r.kn.atk.slice();r.pendingSkill=null;}
function knSet(cat,i,id){const r=G.run;syncSkills();r.knManual=r.knManual||{};r.knManual[cat]=1;const L=r.kn[cat];if(id==null)L.splice(i,1);else{const j=L.indexOf(id);if(j>=0)L.splice(j,1);if(i<L.length)L[i]=id;else L.push(id);}syncSkills();saveSoon();}
function atkSlots(){const r=G.run;if(!r.kn)return [];return r.kn.atk.concat(r.kn.move).filter(id=>r.skills.find(k=>k.id===id));}
function defSkills(){const r=G.run;return r.kn?r.kn.def.filter(id=>r.skills.find(k=>k.id===id)):[];}
// đòn thần thức của một số tâm pháp: niệm lực hơn đối thủ thì làm choáng
function mindArt(){return activeArts().find(a=>artMind(a));}
function foeThan(sc,t){const r=G.run;return 8+3*rT()+(sc.elite?3:0)+(sc.boss?6:0)+(t&&t.realm||0);}
function playerMind(tid){const r=G.run,sc=r.scene;const u=readyPlayer(sc);if(!u||!mindArt())return false;const cost=Math.ceil(u.maxMp*0.3);if(u.mp<cost)return false;
  const foes=alive(sc,'B').filter(x=>!x.immune);if(!foes.length)return false;const t=(tid!=null&&U_(sc,+tid)&&U_(sc,+tid).hp>0)?U_(sc,+tid):foes[0];const mine=S().than,his=foeThan(sc,t);
  u.mp-=cost;const sk={id:'_mind',n:contentText("core2_05-tui-do-gom-moi_js.playerMind.062"),el:'vo',t:0,c:0,fx:{p:0.45},f:contentText("core2_05-tui-do-gom-moi_js.playerMind.063"),dt:'ph'};
  if(mine>his){t.stunT=Math.max(t.stunT||0,(typeof STUN_S==='number'?STUN_S:2)*1.5);clog(sc,contentText("core2_05-tui-do-gom-moi_js.playerMind.064", [t.name]),'me');}else clog(sc,contentText("core2_05-tui-do-gom-moi_js.playerMind.065", [t.name]),'en');
  runAct(sc,()=>beginSkill(sc,u,sk,1,t.id));return true;}
{const _S5=S;S=function(){const s=_S5();const r=G.run;s.than=Math.round(10+2*r.realm+s.ngo/4+(s.fx.than||0));return s;};}
{const _agg5=aggFx;aggFx=function(){const fx=_agg5();if(fx.atkStage){const k=fx.atkStage*tieu();fx.atkP=(fx.atkP||0)+k;fx.matkP=(fx.matkP||0)+k;}return fx;};}
{const _oz=onZero;onZero=function(sc,u){_oz(sc,u);if(u.isMain&&G.run){const v=aggFx().rageTurn;if(v&&u.hp>0){sc.rageAcc=(sc.rageAcc||0)+v;while(sc.rageAcc>=1&&(u.st.rage||0)<5){sc.rageAcc-=1;u.st.rage=(u.st.rage||0)+1;}}}};}
{const _sc5=startCombat;startCombat=function(spec,after){run2();syncSkills();return _sc5(spec,after);};}
{const _ws=walkSpeed;walkSpeed=function(){return _ws()*(1+(aggFx().moveP||0)/100);};}
{const _eq5=equip;equip=function(i){const rel=G.run.relics[i];if(rel&&rel.k==='book')return;_eq5(i);};}
{const _bi=bagItems;bagItems=function(){const r=G.run;const L=_bi();for(const x of L)if(x.ref.t==='rel'&&r.relics[x.ref.i].k==='book'){x.cat='bitich';x.em='📖';x.tip=r.relics[x.ref.i].lore;}return L;};}
{const _se=shopExtra;shopExtra=function(items,n){_se(items,n);const r=G.run;if(chance(.55)){const b=bookOf(genArt('tp',clamp(rT()+(chance(.3)?1:0),0,4)));items.push({k:'relic',rel:b,p:price(45+b.tier*40)});}};}
// chuyển nhân vật cũ sang hệ mới: mỗi pháp thuật thành một công pháp, thêm một tâm pháp nhập môn
{const _r2=run2;run2=function(){const r=_r2();if(!r||r.arts)return r;r.arts=[];
  // khởi đầu: một công pháp, một tâm pháp phàm phẩm, cảnh giới phàm nhân cũng học được
  for(const s0 of (r.skills||[]).filter(k=>SK[k.id])){const c0=genArt('cp',0,s0.id,{req:0});c0.lines.forEach(x=>x.req=0);c0.src=s0.src||'';r.arts.push(c0);}
  const t0=genArt('tp',0,null,{req:0,el:'vo'});t0.n=contentText("core2_05-tui-do-gom-moi_js.066");t0.start=1;t0.lines[0]={fx:'tvP',v:6,n:contentText("core2_05-tui-do-gom-moi_js.067"),d:contentText("core2_05-tui-do-gom-moi_js.068"),req:0};t0.lines.forEach(x=>x.req=0);r.arts.push(t0);
  r.chu=[null,null,null,null,null,null,null,null];r.chuOpen=4;r.arts.slice(0,4).forEach((a,i)=>{r.chu[i]={k:'a',u:a.u};});r.kn=null;syncSkills();return r;};}