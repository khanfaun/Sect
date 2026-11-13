// ================= ĐỢT 13: TRẠM DỊCH MỚI, HÀNG CÓ SỐ LƯỢNG =================
// Phương tiện: mỗi loại có 5 phẩm. Mỗi trạm dịch bày ngẫu nhiên 3–5 món (loại, phẩm, số lượng), ba tháng thay hàng một lần.
// Thuê: dùng được một tháng. Mua: dùng mãi. Giá cao hơn trước nhiều.
const VEH_T=[{k:'ngua',n:['Ngựa thồ','Tuấn mã','Hãn huyết mã','Long câu','Thiên lý long câu'],m:1.7,p:60,realm:0,ic:'run'},
  {k:'loc',n:['Linh lộc','Bạch lộc','Ngọc giác lộc','Cửu sắc lộc','Thần lộc'],m:1.9,p:90,realm:0,ic:'tree'},
  {k:'hac',n:['Bạch hạc','Tiên hạc','Huyền hạc','Đan đỉnh hạc','Cửu thiên hạc'],m:2.8,p:260,realm:1,ic:'feather'},
  {k:'chu',n:['Phi chu','Mộc lan chu','Thanh vân chu','Bích lạc chu','Càn khôn chu'],m:3.6,p:500,realm:1,ic:'cart'},
  {k:'kiem',n:['Phi kiếm','Thanh phong kiếm','Lưu quang kiếm','Tử điện kiếm','Tru tiên kiếm'],m:6,p:1600,realm:2,ic:'sword'}];
const TRAM_RESET=3*HM;
function vehMake(k,tier){const T=VEH_T.find(x=>x.k===k);return {k,tier,n:T.n[tier],m:Math.round(T.m*(1+0.22*tier)*10)/10,realm:T.realm,ic:T.ic,p:T.p*Math.pow(1.9,tier)*1.8};}
function vehBuy(v){return price(v.p);}function vehRent(v){return Math.max(2,Math.round(price(v.p)*0.08));}
function tramStock(n){const r=G.run,w=W();const q=Math.floor(w.t/TRAM_RESET);
  if(!n.tram||n.tram.q!==q||n.tram.kiep!==r.kiep){const T=VEH_T.filter(x=>x.realm<=r.region+1);const L=[];const cnt=ri(3,5);
    for(let i=0;i<cnt;i++){const t=pick(T);const roll=R();const tier=clamp(Math.floor(roll*roll*3+r.region*0.6+(chance(.1)?1:0)),0,4);L.push(Object.assign(vehMake(t.k,tier),{qty:ri(1,3)}));}
    L.sort((a,b)=>a.p-b.p);n.tram={q,kiep:r.kiep,L};}
  return n.tram.L;}
function tramResetIn(){return TRAM_RESET-(W().t%TRAM_RESET);}
mountOf=function(){const r=G.run;if(!r)return null;const w=W();const own=r.veh||(r.mount?MOUNT.find(x=>x.id===r.mount):null);
  const rent=r.rent&&r.rent.until>w.t?r.rent.v:null;if(rent&&(!own||rent.m>=own.m))return Object.assign({},rent,{rented:1});return own;};
function vehTake(i,mode){const r=G.run,sc=r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const L=tramStock(n);const v=L[i];if(!v||v.qty<=0||r.realm<v.realm)return false;
  const c=mode==='buy'?vehBuy(v):vehRent(v);if(r.st<c)return false;r.st-=c;v.qty--;const o={k:v.k,tier:v.tier,n:v.n,m:v.m,realm:v.realm,ic:v.ic,p:v.p};
  if(mode==='buy'){r.veh=o;r.mount=null;log('Mua '+v.n+'.');note('Đã mua '+v.n,'up');}else{r.rent={v:o,until:W().t+HM};log('Thuê '+v.n+' một tháng.');note('Đã thuê '+v.n+' một tháng','up');}return true;}
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
const QGRADE=['Dễ','Thường','Khó','Hiểm','Tử nạn','Tuyệt cảnh'];
function questGrade(q){if(q.grade!=null)return q.grade;const n=nodeById(q.node);return clamp((n?n.danger:0)+(q.kind==='diet'?1:0),0,4);}
{const _ob13=openBoard;openBoard=function(n){_ob13(n);if(n&&n.board)for(const q of n.board.list)if(q.grade==null){q.grade=questGrade(q);q.reward.st=Math.round(q.reward.st*(1+q.grade*0.25));}};}
{const _tq13=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];const k=r.quests.length;_tq13(i);if(b&&r.quests.length>k){const q=r.quests[r.quests.length-1];q.grade=questGrade(b);q.d=b.kind==='diet'?'Tới nơi, vào mục Nhiệm vụ trong địa điểm để lùng tìm và hạ mục tiêu.':'Tới nơi, vào mục Nhiệm vụ trong địa điểm để giao tận tay.';}};}
function questPenalty(q){return {st:Math.round((q.reward.st||0)*0.5),karma:-2};}
function questCancel(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q)return false;const P=questPenalty(q);
  q.state='fail';q.dropped=1;r.st=Math.max(0,r.st-P.st);applyE({karma:P.karma});log(`Trả lại việc: ${q.text}. Mất ${P.st} linh thạch, mang tiếng thất hứa.`);
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
const QST=[[3,5],[6,10],[12,18],[20,28],[30,40],[45,60]];
function questRewardGen(g,reg){const st=Math.round(ri(QST[g][0],QST[g][1])*(1+0.5*reg));const it=[];
  if(g===0&&chance(.5))it.push({k:'pill',id:pick(['hoixuan','tukhi']),q:0});
  if(g>=1)it.push({k:'pill',id:rollPill(),q:g>=3?1:0});
  if(g>=2)it.push({k:'mat',m:pick(['thao','khoang']),n:ri(1,2)+g-2});
  if(g>=3)it.push({k:'relic',tier:clamp(reg+(g>=4?1:0),0,4)});
  if(g>=4)it.push({k:'pill',id:btPill(),q:g>=5?2:1});
  if(g>=5)it.push({k:'relic',tier:clamp(reg+2,0,4)});
  return {st,ll:3+g*3,it,v:2};}
{const _ob15=openBoard;openBoard=function(n){_ob15(n);if(n&&n.board)for(const q of n.board.list)if(!q.reward||q.reward.v!==2){q.grade=questGrade(q);q.reward=questRewardGen(q.grade,G.run.region);}};}
function questRewardOf(q){if(q.reward&&q.reward.v===2)return q.reward;return {st:Math.min(40,Math.max(3,Math.round((q.reward&&q.reward.st||10)*ECON))),ll:3+questGrade(q)*3,it:[],v:2};}
function questRewardChips(q){const R0=questRewardOf(q);const L=[chip('💎','+'+R0.st,'Linh thạch','up'),chip('⚔','+'+Math.round(R0.ll*(typeof LL_MUL==='number'?LL_MUL:1))+'% lịch luyện','Lịch luyện','up')];
  const tt=(av,n,sub,d,t)=>`<div class="tt-it" style="${t!=null?'--pc:'+QCOL[clamp(t,0,5)]:''}"><span class="tt-av">${av}</span><div><b>${n}</b><small>${sub}</small><p>${d}</p></div></div>`;
  for(const x of R0.it){let c;if(x.k==='pill'){const P0=PILL[x.id];c=chip(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,pillTip(x.id,x.q),'item');c.h=tt(P0.i,(x.q?PQ[x.q]+' ':'')+P0.n,'Đan dược',P0.d.replace('{x}',pillX(x.id,x.q)),x.q||0);}
    else if(x.k==='mat'){const M0=MAT[x.m];c=chip(M0.i,x.n+' '+M0.n.toLowerCase(),M0.n+'\n'+M0.d,'item');c.h=tt(M0.i,M0.n+' × '+x.n,'Vật liệu luyện chế',M0.d);}
    else if(x.k==='relic'){c=chip('🏺','pháp bảo '+GRADE[x.tier].toLowerCase(),'Pháp bảo '+GRADE[x.tier]+'\nChưa rõ là món gì, nhận rồi mới biết.','item');c.h=tt('?','Pháp bảo ?',GRADE[x.tier],'Chưa rõ là món gì. Nhận rồi mới biết.',x.tier);}
    if(c)L.push(c);}
  return L;}
function questGive(q){const r=G.run;const R0=questRewardOf(q);const ch=[];r.st+=R0.st;ch.push(chip('💎','+'+R0.st,'Linh thạch','up'));
  for(const x of R0.it){if(x.k==='pill'){const c=gainPill(x.id,x.q);if(c)ch.push(c);}else if(x.k==='mat'){run2().mats[x.m]=(run2().mats[x.m]||0)+x.n;ch.push(chip(MAT[x.m].i,'+'+x.n+' '+MAT[x.m].n.toLowerCase(),'Vật liệu','up'));}
    else if(x.k==='relic'){const rel=genRelic(x.tier);r.relics.push(rel);clampHp();ch.push(chip('🏺',rel.name,relicTip(rel),'item',rel.tier));}}
  llChipMerge(ch,llAdd(R0.ll,null,true));applyE({karma:2});return ch;}
function qPop(kind,q,ch){G.qpop=G.qpop||[];G.qpop.push({kind,text:q.text,grade:questGrade(q),ch:ch||[]});}
// tới nơi: chỉ báo, không tự xong
questArrive=function(id){const r=G.run;for(const q of r.quests)if(q.state==='open'&&q.node===id&&!q.arrNote){q.arrNote=1;note('Đã tới nơi của nhiệm vụ. Vào địa điểm, mục Nhiệm vụ.');}};
// làm nhiệm vụ tại chỗ
function questDo(id){const r=G.run,sc=r.scene;const q=r.quests.find(x=>x.id===id&&x.state==='open');if(!q||!sc||sc.type!=='place'||q.node!==sc.id)return false;
  if(q.kind==='den'){advanceTime(1);if(!G.run)return true;q.state='done';const ch=questGive(q);log(`Xong việc: ${q.text}.`);pushNews('Xong việc: '+q.text,true);
    sc.msg=[pick(['Người nhận mở thư, đọc xong thì thở phào, rút tiền công trả ngươi.','Món hàng tới tay người nhận nguyên vẹn. Họ cảm tạ rối rít.','Ngươi trao tận tay. Người nhận gật đầu, đưa tiền công cùng ít quà cảm tạ.'])];sc.chips=ch;sc.seq=(sc.seq||0)+1;qPop('done',q,ch);return true;}
  advanceTime(2);if(!G.run||G.run.scene!==sc)return true;const n=nodeById(sc.id);
  encounter({type:n.danger>=3?'elite':'combat'});r.scene.quest=q.id;r.scene.text='Ngươi lần theo dấu vết trong tờ cáo thị và tìm ra mục tiêu. '+r.scene.text;return true;}
// thắng: xong (phần thưởng mới); thua hay chạy: thất bại
questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(!q)return [];q.state='done';log(`Xong việc: ${q.text}.`);const ch=questGive(q);qPop('done',q,ch);return ch;};
{const _cc15=combatContinue;combatContinue=function(){const sc=G.run&&G.run.scene;const qid=sc&&sc.after&&sc.after.quest;const res=sc&&sc.over;
  if(qid&&(res==='lose'||res==='flee')){const q=G.run.quests.find(x=>x.id===qid&&x.state==='open');if(q){q.state='fail';q.lost=1;G.run.karma=clamp(G.run.karma-2,-100,100);log('Thất bại: '+q.text);qPop('fail',q,[]);}}
  return _cc15();};}
// quá hạn: thất hứa
{const _adv15=advanceTime;advanceTime=function(h){const r=G.run;const open=r&&r.quests?r.quests.filter(q=>q.state==='open'):[];const o=_adv15(h);if(G.run)for(const q of open)if(q.state==='fail'&&!q.dropped&&!q.lost&&!q.popd){q.popd=1;qPop('late',q,[]);}return o;};}

// ================= ĐỢT 16: SỰ KIỆN DỌC ĐƯỜNG CỦA NHIỆM VỤ, NGƯỜI DẪN ĐẦU THƯƠNG ĐỘI =================
// Đang mang hàng/thư cho nhiệm vụ: thỉnh thoảng bị chặn đường (6% mỗi chặng, cách nhau ít nhất 15 ngày),
// hoặc bị chặn ngay trước cửa người nhận (12% lúc giao). Thắng: giữ được hàng, đi tiếp. Thua hoặc bỏ chạy: nhiệm vụ thất bại.
const QAMB_T=['Bọn cướp đã nghe phong thanh về món hàng ngươi mang theo. Chúng chặn ngay giữa đường.','Một kẻ bịt mặt bám theo ngươi từ mấy dặm trước, giờ mới ra mặt: “Để món hàng lại.”','Có kẻ được thuê để chặn tay ngươi trước khi món hàng tới nơi.'];
function questAmbush(q,text){const r=G.run;r.qAmbT=W().t;q.amb=1;encounter({type:'combat'});const sc=r.scene;sc.quest=q.id;sc.back=sc.back!=null?sc.back:null;sc.text=text+' '+sc.text;}
{const _qw16=questWin;questWin=function(qid){const r=G.run;const q=r.quests.find(x=>x.id===qid&&x.state==='open');if(q&&q.amb){q.amb=0;return [chip('📜','giữ được món hàng','Nhiệm vụ vẫn tiếp tục: tới nơi rồi giao tận tay','up')];}return _qw16(qid);};}
{const _se16=spawnEnt;spawnEnt=function(type,k,o){const e=_se16(type,k,o);if(e&&type==='thuong'&&!e.lead)e.lead=npc('thuong').ten;return e;};}

// ----- sự kiện dọc đường của nhiệm vụ: nhiều loại, có lựa chọn, đều dính tới việc đang làm -----
// Mỗi chặng đường: 7% (cách nhau ít nhất 15 ngày). Lúc giao hàng: 15%.
// Kết quả có thể: giữ được hàng, mất một phần thưởng, thêm thưởng, đổi nơi giao, thất bại, phải đánh nhau.
function qCut(q,f){const R0=questRewardOf(q);R0.st=Math.max(1,Math.round(R0.st*f));q.reward=R0;}
const QEV=[
 {id:'cuop',k:['den','diet'],t:q=>pick(QAMB_T),c:[{l:'Rút binh khí nghênh chiến',fight:1},{l:'Bỏ ra ít linh thạch cho qua',st:3,go:q=>({t:'Bọn chúng đếm tiền, cười khẩy rồi tránh đường.'})}]},
 {id:'mua',k:['den'],t:q=>'Mưa lớn ập tới. Bọc hàng của nhiệm vụ bắt đầu thấm nước.',c:[{l:'Tìm chỗ trú, đợi tạnh hẳn',h:HD,go:q=>({t:'Ngươi ngồi dưới mái đình hoang cả ngày. Hàng khô ráo, chỉ mất chút thời gian.'})},
   {l:'Che tạm, đi tiếp',go:q=>chance(.45)?(qCut(q,0.5),{t:'Tới chặng sau mới thấy một góc hàng đã ướt sũng. Người nhận chắc sẽ trả ít đi.',ch:[chip('📜','thưởng giảm một nửa','Hàng bị hỏng một phần','dn')]}):{t:'May mắn, lớp vải dầu che kín. Hàng vẫn nguyên.'}}]},
 {id:'muagia',k:['den'],t:q=>'Một thương nhân áo gấm chặn ngươi lại: “Món hàng đó, ta trả gấp rưỡi. Ai biết đâu mà.”',c:[{l:'Từ chối, giữ chữ tín',go:q=>({t:'Hắn nhún vai bỏ đi. Lòng ngươi thanh thản.',e:{karma:1}})},
   {l:'Bán cho hắn',go:q=>{const v=Math.round(questRewardOf(q).st*1.5);G.run.st+=v;q.state='fail';q.lost=1;G.run.karma=clamp(G.run.karma-4,-100,100);qPop('fail',q,[]);return {t:'Linh thạch nặng tay. Nhưng tiếng thất tín sẽ theo ngươi một thời gian.',ch:[chip('💎','+'+v,'Linh thạch','up')]};}}]},
 {id:'doinoi',k:['den'],t:q=>'Một người quen của người nhận báo tin: họ đã dọn đi nơi khác.',c:[{l:'Hỏi nơi ở mới',go:q=>{const n0=nodeById(q.node);const ns=regionOf(G.run.region).nodes.filter(x=>x.id!==q.node&&(x.type==='tran'||x.type==='thanh'||x.type==='ancu')).sort((a,b)=>Math.hypot(a.x-n0.x,a.y-n0.y)-Math.hypot(b.x-n0.x,b.y-n0.y));const t=ns[0];if(!t)return {t:'Không ai biết họ đi đâu. Ngươi đành tới chỗ cũ xem sao.'};q.node=t.id;hearOf(t);q.due+=20*HD;q.text=q.text.replace(n0.name,t.name);return {t:'Họ đã chuyển tới '+t.name+'. Hạn được nới thêm hai mươi ngày.'};}}]},
 {id:'nho',k:['den'],t:q=>'Một bà lão nghe nói ngươi đi về phía ấy, nhờ mang thêm một gói thuốc cho cháu.',c:[{l:'Nhận lời',h:2,go:q=>{const R0=questRewardOf(q);R0.it.push({k:'pill',id:pick(['hoixuan','tukhi']),q:0});q.reward=R0;return {t:'Bà lão cảm tạ. Người nhận chắc sẽ hậu tạ thêm.',e:{karma:1}};}},{l:'Từ chối khéo',go:q=>({t:'Bà lão gật đầu, không nói gì.'})}]},
 {id:'cam',k:['den'],t:q=>'Đêm nghỉ chân, bọc hàng của nhiệm vụ bỗng phát ra ánh sáng xanh mờ. Có cấm chế lạ bám trên đó.',c:[{l:'Thử giải cấm chế',req:['ngo',12,'Ngộ tính'],go:q=>({t:'Ngươi lần theo trận văn, gỡ từng nút. Cấm chế tan, lòng ngươi lĩnh hội thêm chút ít.',ll:3})},{l:'Mặc kệ, ngủ tiếp',go:q=>({t:'Cả đêm ngươi mơ thấy những tiếng thì thầm.',e:{tamma:3}})}]},
 {id:'manhmoi',k:['diet'],t:q=>'Một người sống sót kể lại cách mục tiêu của nhiệm vụ ra tay.',c:[{l:'Ngồi nghe kỹ',h:2,go:q=>({t:'Ngươi ghi nhớ thói quen của nó. Trận tới sẽ chủ động hơn.',ll:3})},{l:'Cho người ấy ít thuốc',go:q=>({t:'Người ấy cảm tạ, chỉ thêm đường tắt.',e:{karma:2}})}]},
 {id:'tho',k:['diet'],t:q=>'Một thợ săn già cũng đang lùng mục tiêu của nhiệm vụ, muốn chia đôi phần thưởng nếu hợp sức.',c:[{l:'Đồng ý chia đôi',go:q=>{qCut(q,0.5);q.helper=1;return {t:'Lão chỉ cho ngươi chỗ nó hay lui tới. Thưởng chia đôi, nhưng dễ tìm hơn hẳn.',ll:2,ch:[chip('📜','thưởng giảm một nửa','Chia cho thợ săn','dn')]};}},{l:'Tự làm một mình',go:q=>({t:'Lão nhún vai: “Tùy ngươi.”'})}]},
];
function qevStart(q,ev){const r=G.run;r.qAmbT=W().t;r.scene={type:'qev',q:q.id,ev:ev.id,text:ev.t(q),back:null,res:null,chips:[]};}
function qevPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='qev'||sc.res)return;const q=r.quests.find(x=>x.id===sc.q);const ev=QEV.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!q||!c)return;
  if(c.req&&(S()[c.req[0]]||0)<c.req[1])return;if(c.st){if(r.st<c.st)return;r.st-=c.st;}
  if(c.fight){q.amb=1;encounter({type:'combat'});r.scene.quest=q.id;r.scene.back=null;r.scene.text=sc.text+' '+r.scene.text;return;}
  if(c.h){advanceTime(c.h);if(!G.run)return;}
  const o=c.go(q)||{};let ch=(o.ch||[]).slice();if(c.st)ch.unshift(chip('💎','−'+c.st,'Linh thạch','dn'));if(c.h)ch.push(chip('⏳',durH(c.h),'Thời gian trôi qua',''));
  if(o.e)ch=ch.concat(applyE(o.e));if(o.ll)llChipMerge(ch,llAdd(o.ll,null,true));sc.res={l:c.l,t:o.t};sc.chips=ch;}
function qevOpts(sc){const ev=QEV.find(x=>x.id===sc.ev);const s=S();return ev.c.map(c=>({l:c.l,st:c.st||0,h:c.h||0,fight:!!c.fight,lack:c.req&&(s[c.req[0]]||0)<c.req[1]?c.req[2]+' cần '+c.req[1]:'',no:!!(c.st&&G.run.st<c.st)}));}
{const _rr17=roadRoll;roadRoll=function(a,b){const r=G.run;const qs=r&&r.quests.filter(x=>x.state==='open');
  if(qs&&qs.length&&!r.scene&&chance(.07)&&W().t-(r.qAmbT||-1e9)>15*HD){const q=pick(qs);const L=QEV.filter(e=>e.k.includes(q.kind));if(L.length){r.place={n:'đường tới '+nodeById(b).name,t:nodeById(b).type};qevStart(q,pick(L));return;}}
  return _rr17(a,b);};}
// lúc giao hàng: đôi khi có chuyện trước cửa
const QDOOR=[{t:'Người nhận vắng nhà. Hàng xóm bảo chiều mai mới về. Ngươi đành đợi một ngày.',go:q=>{advanceTime(HD);return 'wait';}},{t:'Ngay trước cửa nhà người nhận, một gã lạ mặt chặn ngươi lại, đòi món hàng.',go:q=>'fight'},{t:'Người nhận mừng rỡ, nhất quyết giữ ngươi lại ăn bữa cơm, dúi thêm quà.',go:q=>{const R0=questRewardOf(q);R0.st+=2;q.reward=R0;return 'bonus';}}];
{const _qd17=questDo;questDo=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id&&x.state==='open');
  if(q&&q.kind==='den'&&!q.ambDoor&&chance(.15)){q.ambDoor=1;const D=pick(QDOOR);const res=D.go(q);if(!G.run)return true;
    if(res==='fight'){const back=r.scene&&r.scene.id;questAmbush(q,D.t);r.scene.back=back;return true;}
    const ok=_qd17(id);const sc=G.run.scene;if(sc&&sc.msg)sc.msg.unshift(D.t);return ok;}
  return _qd17(id);};}
