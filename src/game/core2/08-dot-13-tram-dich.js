// ================= ĐỢT 13: TRẠM DỊCH MỚI, HÀNG CÓ SỐ LƯỢNG =================
// Phương tiện: mỗi loại có 5 phẩm. Mỗi trạm dịch bày ngẫu nhiên 3–5 món (loại, phẩm, số lượng), ba tháng thay hàng một lần.
// Thuê: dùng được một tháng. Mua: dùng mãi. Giá cao hơn trước nhiều.
// Bảng VEH_T: content/world/veh-t.js
const TRAM_RESET=3*HM;
function vehMake(k,tier){const T=VEH_T.find(x=>x.k===k);return {k,tier,n:T.n[tier],m:Math.round(T.m*(1+0.22*tier)*10)/10,realm:T.realm,ic:T.ic,p:T.p*Math.pow(1.9,tier)*1.8};}
function vehBuy(v){return price(v.p);}function vehRent(v){return Math.max(2,Math.round(price(v.p)*0.08));}
function tramStock(n){const r=G.run,w=W();const q=Math.floor(w.t/TRAM_RESET);
  if(!n.tram||n.tram.q!==q||n.tram.kiep!==r.kiep){const T=VEH_T.filter(x=>x.realm<=rT()+1);const L=[];const cnt=ri(3,5);
    for(let i=0;i<cnt;i++){const t=pick(T);const roll=R();const tier=clamp(Math.floor(roll*roll*3+rT()*0.6+(chance(.1)?1:0)),0,4);L.push(Object.assign(vehMake(t.k,tier),{qty:ri(1,3)}));}
    L.sort((a,b)=>a.p-b.p);n.tram={q,kiep:r.kiep,L};}
  return n.tram.L;}
function tramResetIn(){return TRAM_RESET-(W().t%TRAM_RESET);}
mountOf=function(){const r=G.run;if(!r)return null;const w=W();const own=r.veh||(r.mount?MOUNT.find(x=>x.id===r.mount):null);
  const rent=r.rent&&r.rent.until>w.t?r.rent.v:null;if(rent&&(!own||rent.m>=own.m))return Object.assign({},rent,{rented:1});return own;};
function vehTake(i,mode){const r=G.run,sc=r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const L=tramStock(n);const v=L[i];if(!v||v.qty<=0||r.realm<v.realm)return false;
  const c=mode==='buy'?vehBuy(v):vehRent(v);if(r.st<c)return false;r.st-=c;v.qty--;const o={k:v.k,tier:v.tier,n:v.n,m:v.m,realm:v.realm,ic:v.ic,p:v.p,cid:v.cid,minUserLevel:v.minUserLevel,magic:v.magic};
  if(mode==='buy'){r.veh=o;r.mount=null;log('Mua '+v.n+'.');note(contentText("core2_08-dot-13-tram-dich_js.vehTake.001")+v.n,'up');}else{r.rent={v:o,until:W().t+HM};log('Thuê '+v.n+contentText("core2_08-dot-13-tram-dich_js.vehTake.002"));note(contentText("core2_08-dot-13-tram-dich_js.vehTake.003")+v.n+contentText("core2_08-dot-13-tram-dich_js.vehTake.004"),'up');}return true;}
// xe chuyến cũng đắt hơn
{const _sl13=stageList;stageList=function(n){return _sl13(n).map(x=>Object.assign(x,{c:x.c*2}));};}
// các tiệm: mỗi món có số lượng, hết thì thôi; một tháng thay hàng
{const _os13=openShop;openShop=function(n){_os13(n);const sc=G.run&&G.run.scene;if(sc&&sc.type==='shop')for(const it of sc.items)if(it.qty==null)it.qty=it.k==='pill'?ri(1,3):1;};}
{const _by13=buy;buy=function(i){const sc=G.run&&G.run.scene;const it=sc&&sc.items&&sc.items[i];if(!it||it.sold)return _by13(i);const q=it.qty==null?1:it.qty;_by13(i);if(it.sold){it.qty=q-1;if(it.qty>0)it.sold=0;}};}
function shopResetIn(){return HM-(W().t%HM);}
// tiệm tạp hóa: vào xem không tốn thời gian
{const _pa13=placeActs;placeActs=function(n){const L=_pa13(n);for(const a of L)if(a.a==='taphoa')a.h=0;return L;};}
{const _pc13=placeAct;placeAct=function(a){if(a==='taphoa'){const sc=G.run&&G.run.scene;if(sc&&sc.type==='place'){openShop(nodeById(sc.id));return;}}return _pc13(a);};}
// ----- nhiệm vụ: phẩm theo độ khó, trả lại có phạt -----
// Bảng QGRADE: content/rules/qgrade.js
function questGrade(q){if(q.grade!=null)return q.grade;const n=nodeById(q.node);return clamp((n?n.danger:0)+(q.kind==='diet'?1:0),0,4);}
{const _ob13=openBoard;openBoard=function(n){_ob13(n);if(n&&n.board)for(const q of n.board.list)if(q.grade==null){q.grade=questGrade(q);q.reward.st=Math.round(q.reward.st*(1+q.grade*0.25));}};}
{const _tq13=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];const k=r.quests.length;_tq13(i);if(b&&r.quests.length>k){const q=r.quests[r.quests.length-1];q.grade=questGrade(b);q.d=b.kind==='diet'?contentText("core2_08-dot-13-tram-dich_js.005"):contentText("core2_08-dot-13-tram-dich_js.006");}};}
function questPenalty(q){const st=Math.round((q.reward.st||0)*0.5);return feat('nq')?{st,deed:'that_hua'}:{st,karma:-2};}
function questCancel(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q)return false;const P=questPenalty(q);
  q.state='fail';q.dropped=1;r.st=Math.max(0,r.st-P.st);applyE(P.deed?{deed:P.deed}:{karma:P.karma});log(contentText("core2_08-dot-13-tram-dich_js.questCancel.007", [q.text,P.st]));
  const fn=nodeById(q.from);if(fn&&fn.board){const b=fn.board.list.find(x=>x.id===q.id);if(b)b.taken=false;}return true;}
// ----- nhiệm vụ: hạn chót đủ rộng -----
// Hạn cũ chỉ bằng thời gian đi đường cộng 3–8 ngày nên gần như luôn trễ. Nay: gấp rưỡi thời gian đi đường cộng 15–40 ngày.
{const _ob14=openBoard;openBoard=function(n){_ob14(n);if(n&&n.board)for(const q of n.board.list)if(!q.v2){const p=findPath(n.id,q.node);const tH=p?travelHours(p):24*30;q.days=Math.ceil(tH*1.5/24)+ri(15,40);q.v2=1;}};}
// việc đang nhận từ bản cũ: nới hạn thêm một lần
{const _adv14=advanceTime;advanceTime=function(h){const r=G.run;if(r&&r.quests&&!r.qfix14){for(const q of r.quests)if(q.state==='open')q.due+=60*HD;r.qfix14=1;}return _adv14(h);};}
// đi xe chuyến tới nơi cũng tính là đã tới
{const _sg14=stageGo;stageGo=function(id){const r=G.run;const a=r&&r.at;_sg14(id);if(G.run&&G.run.at!==a)questArrive(G.run.at);};}

{const _pa15=placeAct;placeAct=function(a){const sc=G.run&&G.run.scene;const res=_pa15(a);const s2=G.run&&G.run.scene;if(s2&&s2===sc)s2.seq=(s2.seq||0)+1;return res;};}

// ================= ĐỢT 15: NHIỆM VỤ LÀM TẠI CHỖ, PHẦN THƯỞNG THEO PHẨM, THÔNG BÁO =================
// Tới nơi không tự xong: vào địa điểm, mục "Nhiệm vụ" có việc riêng. Đưa tin thì giao tận tay; diệt yêu thì phải đánh.
// Đánh thua hoặc bỏ chạy: nhiệm vụ thất bại. Quá hạn: thất hứa.
// Phần thưởng: ít linh thạch (Dễ 3–5 ... Tử nạn 30–40), thêm đan dược, vật liệu, pháp bảo theo phẩm, và lịch luyện.
// Bảng QST: content/rules/qst.js
function questRewardGen(g,reg){const st=Math.round(ri(QST[g][0],QST[g][1])*(1+0.5*reg));const it=[];
  if(g===0&&chance(.5))it.push({k:'pill',id:pick(['hoixuan','tukhi']),q:0});
  if(g>=1)it.push({k:'pill',id:rollPill(),q:g>=3?1:0});
  if(g>=2)it.push({k:'mat',m:pick(['thao','khoang']),n:ri(1,2)+g-2});
  if(g>=3)it.push({k:'relic',tier:clamp(reg+(g>=4?1:0),0,4)});
  if(g>=4)it.push({k:'pill',id:btPill(),q:g>=5?2:1});
  if(g>=5)it.push({k:'relic',tier:clamp(reg+2,0,4)});
  return {st,ll:3+g*3,it,v:2};}
{const _ob15=openBoard;openBoard=function(n){_ob15(n);if(n&&n.board)for(const q of n.board.list)if(!q.reward||q.reward.v!==2){q.grade=questGrade(q);q.reward=questRewardGen(q.grade,rT());}};}
function questRewardOf(q){if(q.reward&&q.reward.v===2)return q.reward;return {st:Math.min(40,Math.max(3,Math.round((q.reward&&q.reward.st||10)*ECON))),ll:3+questGrade(q)*3,it:[],v:2};}
function questRewardChips(q){const R0=questRewardOf(q);const L=[chip('💎','+'+R0.st,contentText("core2_08-dot-13-tram-dich_js.questRewardChips.008"),'up'),chip('⚔','+'+Math.round(R0.ll*(typeof LL_MUL==='number'?LL_MUL:1))+contentText("core2_08-dot-13-tram-dich_js.questRewardChips.009"),contentText("core2_08-dot-13-tram-dich_js.questRewardChips.010"),'up')];
  const tt=(av,n,sub,d,t)=>`<div class="tt-it" style="${t!=null?'--pc:'+QCOL[clamp(t,0,5)]:''}"><span class="tt-av">${av}</span><div><b>${n}</b><small>${sub}</small><p>${d}</p></div></div>`;
  for(const x of R0.it){let c;if(x.k==='pill'){const P0=PILL[x.id];c=chip(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,pillTip(x.id,x.q),'item');c.h=tt(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,contentText("core2_08-dot-13-tram-dich_js.questRewardChips.011"),P0.d.replace('{x}',pillX(x.id,x.q)),x.q||0);}
    else if(x.k==='mat'){const M0=MAT[x.m];c=chip(M0.i,x.n+' '+M0.n.toLowerCase(),M0.n+'\n'+M0.d,'item');c.h=tt(M0.i,M0.n+' × '+x.n,contentText("core2_08-dot-13-tram-dich_js.questRewardChips.012"),M0.d);}
    else if(x.k==='relic'){c=chip('🏺',contentText("core2_08-dot-13-tram-dich_js.questRewardChips.013")+GRADE[x.tier].toLowerCase(),contentText("core2_08-dot-13-tram-dich_js.questRewardChips.014")+GRADE[x.tier]+contentText("core2_08-dot-13-tram-dich_js.questRewardChips.015"),'item');c.h=tt('?',contentText("core2_08-dot-13-tram-dich_js.questRewardChips.016"),GRADE[x.tier],contentText("core2_08-dot-13-tram-dich_js.questRewardChips.017"),x.tier);}
    if(c)L.push(c);}
  return L;}
function questGive(q){const r=G.run;const R0=questRewardOf(q);const ch=[];r.st+=R0.st;ch.push(chip('💎','+'+R0.st,contentText("core2_08-dot-13-tram-dich_js.questGive.018"),'up'));
  for(const x of R0.it){if(x.k==='pill'){const c=gainPill(x.id,x.q);if(c)ch.push(c);}else if(x.k==='mat'){run2().mats[x.m]=(run2().mats[x.m]||0)+x.n;ch.push(chip(MAT[x.m].i,'+'+x.n+' '+MAT[x.m].n.toLowerCase(),contentText("core2_08-dot-13-tram-dich_js.questGive.019"),'up'));}
    else if(x.k==='relic'){const rel=genRelic(x.tier);r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));}}
  llChipMerge(ch,llAdd(R0.ll,null,true));applyE(feat('nq')?{deed:'giu_loi'}:{karma:2});return ch;}
function qPop(kind,q,ch){G.qpop=G.qpop||[];G.qpop.push({kind,text:q.text,grade:questGrade(q),ch:ch||[]});}
// tới nơi: chỉ báo, không tự xong
questArrive=function(id){const r=G.run;for(const q of r.quests)if(q.state==='open'&&q.node===id&&!q.arrNote){q.arrNote=1;note(contentText("core2_08-dot-13-tram-dich_js.020"));}};
// làm nhiệm vụ tại chỗ
function questDo(id){const r=G.run,sc=r.scene;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q||!sc||sc.type!=='place'||q.node!==sc.id)return false;
  if(q.kind==='den'){advanceTime(1);if(!G.run)return true;q.state='done';const ch=questGive(q);log(contentText("core2_08-dot-13-tram-dich_js.questDo.021", [q.text]));pushNews(contentText("core2_08-dot-13-tram-dich_js.questDo.022")+q.text,true);
    sc.msg=[pick([contentText("core2_08-dot-13-tram-dich_js.questDo.023"),contentText("core2_08-dot-13-tram-dich_js.questDo.024"),contentText("core2_08-dot-13-tram-dich_js.questDo.025")])];sc.chips=ch;sc.seq=(sc.seq||0)+1;qPop('done',q,ch);return true;}
  advanceTime(2);if(!G.run||G.run.scene!==sc)return true;const n=nodeById(sc.id);
  encounter({type:n.danger>=3?'elite':'combat'});r.scene.quest=q.id;r.scene.text=contentText("core2_08-dot-13-tram-dich_js.questDo.026")+r.scene.text;return true;}
// thắng: xong (phần thưởng mới); thua hay chạy: thất bại
questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(!q)return [];q.state='done';log(contentText("core2_08-dot-13-tram-dich_js.027", [q.text]));const ch=questGive(q);qPop('done',q,ch);return ch;};
{const _cc15=combatContinue;combatContinue=function(){const sc=G.run&&G.run.scene;const qid=sc&&sc.after&&sc.after.quest;const res=sc&&sc.over;
  if(qid&&(res==='lose'||res==='flee')){const q=G.run.quests.find(x=>x.id===qid&&x.state==='open');if(q){q.state='fail';q.lost=1;if(feat('nq'))deed('that_hua',{why:q.text});else G.run.karma=clamp(G.run.karma-2,-100,100);log(contentText("core2_08-dot-13-tram-dich_js.028")+q.text);qPop('fail',q,[]);}}
  return _cc15();};}
// quá hạn: thất hứa
{const _adv15=advanceTime;advanceTime=function(h){const r=G.run;const open=r&&r.quests?r.quests.filter(q=>q.state==='open'):[];const o=_adv15(h);if(G.run)for(const q of open)if(q.state==='fail'&&!q.dropped&&!q.lost&&!q.popd){q.popd=1;qPop('late',q,[]);}return o;};}

// ================= ĐỢT 16: SỰ KIỆN DỌC ĐƯỜNG CỦA NHIỆM VỤ, NGƯỜI DẪN ĐẦU THƯƠNG ĐỘI =================
// Đang mang hàng/thư cho nhiệm vụ: thỉnh thoảng bị chặn đường (6% mỗi chặng, cách nhau ít nhất 15 ngày),
// hoặc bị chặn ngay trước cửa người nhận (12% lúc giao). Thắng: giữ được hàng, đi tiếp. Thua hoặc bỏ chạy: nhiệm vụ thất bại.
// Bảng QAMB_T: content/narration/qamb-t.js
function questAmbush(q,text){const r=G.run;r.qAmbT=W().t;q.amb=1;encounter({type:'combat'});const sc=r.scene;sc.quest=q.id;sc.back=sc.back!=null?sc.back:null;sc.text=text+' '+sc.text;}
{const _qw16=questWin;questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(q&&q.amb){q.amb=0;return [chip('📜',contentText("core2_08-dot-13-tram-dich_js.029"),contentText("core2_08-dot-13-tram-dich_js.030"),'up')];}return _qw16(qid);};}
{const _se16=spawnEnt;spawnEnt=function(type,k,o){const e=_se16(type,k,o);if(e&&type==='thuong'&&!e.lead)e.lead=npc('thuong').ten;return e;};}

// ----- sự kiện dọc đường của nhiệm vụ: nhiều loại, có lựa chọn, đều dính tới việc đang làm -----
// Mỗi chặng đường: 7% (cách nhau ít nhất 15 ngày). Lúc giao hàng: 15%.
// Kết quả có thể: giữ được hàng, mất một phần thưởng, thêm thưởng, đổi nơi giao, thất bại, phải đánh nhau.
function qCut(q,f){const R0=questRewardOf(q);R0.st=Math.max(1,Math.round(R0.st*f));q.reward=R0;}
const QEV=[]; // content/events/quests/
function qevStart(q,ev){const r=G.run;r.qAmbT=W().t;r.scene={type:'qev',q:q.id,ev:ev.id,text:ev.t(q),back:null,res:null,chips:[]};}
function qevPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='qev'||sc.res)return;const q=r.quests.find(x=>x.id===sc.q);const ev=QEV.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!q||!c)return;
  if(c.req&&(S()[c.req[0]]||0)<c.req[1])return;if(c.st){if(r.st<c.st)return;r.st-=c.st;}
  if(c.fight){q.amb=1;encounter({type:'combat'});r.scene.quest=q.id;r.scene.back=null;r.scene.text=sc.text+' '+r.scene.text;return;}
  if(c.h){advanceTime(c.h);if(!G.run)return;}
  const o=c.go(q)||{};let ch=(o.ch||[]).slice();if(c.st)ch.unshift(chip('💎','−'+c.st,contentText("core2_08-dot-13-tram-dich_js.qevPick.031"),'dn'));if(c.h)ch.push(chip('⏳',durH(c.h),contentText("core2_08-dot-13-tram-dich_js.qevPick.032"),''));
  if(o.e)ch=ch.concat(applyE(o.e));if(o.ll)llChipMerge(ch,llAdd(o.ll,null,true));sc.res={l:c.l,t:o.t};sc.chips=ch;}
function qevOpts(sc){const ev=QEV.find(x=>x.id===sc.ev);const s=S();return ev.c.map(c=>({l:c.l,st:c.st||0,h:c.h||0,fight:!!c.fight,lack:c.req&&(s[c.req[0]]||0)<c.req[1]?c.req[2]+' cần '+c.req[1]:'',no:!!(c.st&&G.run.st<c.st)}));}
{const _rr17=roadRoll;roadRoll=function(a,b){const r=G.run;const qs=r&&r.quests.filter(x=>x.state==='open');
  if(qs&&qs.length&&!r.scene&&chance(.07)&&W().t-(r.qAmbT||-1e9)>15*HD){const q=pick(qs);const L=QEV.filter(e=>e.k.includes(q.kind));if(L.length){r.place={n:contentText("core2_08-dot-13-tram-dich_js.033")+nodeById(b).name,t:nodeById(b).type};qevStart(q,pick(L));return;}}
  return _rr17(a,b);};}
// lúc giao hàng: đôi khi có chuyện trước cửa
const QDOOR=[]; // content/events/quests/
{const _qd17=questDo;questDo=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');
  if(q&&q.kind==='den'&&!q.ambDoor&&chance(.15)){q.ambDoor=1;const D=pick(QDOOR);const res=D.go(q);if(!G.run)return true;
    if(res==='fight'){const back=r.scene&&r.scene.id;questAmbush(q,D.t);r.scene.back=back;return true;}
    const ok=_qd17(id);const sc=G.run.scene;if(sc&&sc.msg)sc.msg.unshift(D.t);return ok;}
  return _qd17(id);};}
