// ================= ĐỢT 17: BẢNG TREO THƯỞNG THAY HÀNG NGẪU NHIÊN, HẠN NHẬN, VIỆC ĐẶC BIỆT =================
// Mỗi bảng giữ 20–60 ngày rồi thay việc mới (mỗi nơi một nhịp). Việc thường: nhận lúc nào cũng được tới khi bảng thay.
// Việc đặc biệt (chừng 1/5 số bảng): khó hơn một bậc, thưởng hậu, chỉ nhận được trong 1–4 ngày và hạn làm rất gấp.
// Vật phẩm thưởng giấu là "???" cho tới khi nhận. Việc đã hủy thì không nhận lại được.
{const _ob17=openBoard;openBoard=function(n){const w=W();
  if(n&&n.board){if(n.board.until&&w.t>n.board.until)n.board=null;else if(n.board.until)n.board.m=Math.floor(w.t/HM);}
  _ob17(n);if(!n||!n.board)return;const B=n.board;
  if(!B.until){B.until=w.t+ri(20,60)*HD;
    if(chance(.22)){const ns=regionOf(G.run.region).nodes.filter(x=>{if(x.id===n.id||x.type==='ai'||x.danger<1)return false;const p0=findPath(n.id,x.id);return p0&&travelHours(p0)<=90*24;});const tgt=ns.length?pick(ns):null; // việc gấp chỉ nhắm nơi đi tới trong chừng ba tháng
      if(tgt){const p=findPath(n.id,tgt.id);const tH=p?travelHours(p):24*30;const g=clamp(questGrade({node:tgt.id,kind:'diet'})+(chance(.25)?2:1),1,5);
        const q={id:'qs'+n.id+'_'+Math.floor(w.t),text:pick(['Gấp: diệt yêu vật đang tàn sát ở ','Gấp: bắt kẻ cướp đang trốn ở ','Gấp: cứu người bị bắt vào '])+tgt.name,node:tgt.id,kind:'diet',days:Math.ceil(tH*1.1/24)+ri(2,6),special:1,acc:w.t+ri(1,4)*HD,grade:g,v2:1,taken:false};
        q.reward=questRewardGen(g,G.run.region);q.reward.st=Math.round(q.reward.st*1.3);hearOf(tgt);B.list.unshift(q);}}}};}
function boardLeft(n){return n&&n.board&&n.board.until?Math.max(0,n.board.until-W().t):0;}
{const _tq17=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];
  if(!b||b.cancelled||(b.acc&&W().t>b.acc))return;const k=r.quests.length;_tq17(i);if(r.quests.length>k){const q=r.quests[r.quests.length-1];q.reward=b.reward;q.grade=b.grade;if(b.special)q.special=1;}};}
{const _qc17=questCancel;questCancel=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id);const ok=_qc17(id);if(ok&&q){const fn=nodeById(q.from);const b=fn&&fn.board&&fn.board.list.find(x=>x.id===q.id);if(b){b.taken=true;b.cancelled=1;}}return ok;};}
// phần thưởng chưa nhận: chỉ biết linh thạch và lịch luyện, vật phẩm là "???" có khung màu phẩm
function questRewardChipsHidden(q){const R0=questRewardOf(q);const L=questRewardChips(q).slice(0,2);
  for(const x of R0.it){const t=x.k==='relic'?x.tier:x.k==='pill'?(x.q||0):Math.max(0,questGrade(q)-2);const c=chip('','???','Vật phẩm bí ẩn · '+GRADE[clamp(t,0,4)]+'\nNhận việc rồi mới biết là gì.','item');c.t2=t;
    c.h=`<div class="tt-it" style="--pc:${QCOL[clamp(t,0,5)]}"><span class="tt-av">?</span><div><b>???</b><small>${GRADE[clamp(t,0,4)]}</small><p>Vật phẩm bí ẩn. Nhận việc rồi mới biết là gì.</p></div></div>`;c.c='item hid q'+clamp(t,0,5);L.push(c);}
  return L;}

// màu phẩm nhiệm vụ: Dễ xám, Thường lục, Khó lam, Hiểm tím, Tử nạn cam, Tuyệt cảnh đỏ
const QCOL=['#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#b8302a'];function qpc(g){return '--pc:'+QCOL[clamp(g||0,0,5)];}

// ================= ĐỢT 18: KỲ NGỘ HIẾM =================
// Hai loại, xác suất rất thấp, mỗi ngày trong game gieo một lần (cách nhau ít nhất nửa năm):
//  - Tần suất mỗi ngày: có giá 1/8000, hữu duyên 1/12000, vớ vẩn 1/9000 (cộng lại chừng 11 lần mỗi trăm năm).
//  - Kỳ ngộ có giá: muốn có thì phải trả: thọ nguyên, vật phẩm, chỉ số mất vĩnh viễn, linh thạch.
//  - Kỳ ngộ hữu duyên (~1/1000 mỗi ngày): không mất gì, gặp là được.
// Chỉ xảy ra khi đang ở ngoài bản đồ (không trong địa điểm hay trận đánh), không xảy ra trong lúc bế quan dài.
function lifeLose(y){const r=G.run;r.lifeAdj-=y;return chip('⏳','thọ −'+y+' năm','Thọ nguyên mất vĩnh viễn','dn');}
function lifeGain(y){const r=G.run;r.lifeAdj+=y;return chip('⏳','thọ +'+y+' năm','Thọ nguyên tăng','up');}
const KYNGO=[
 {id:'doitho',paid:1,n:'Lão nhân đổi thọ',t:'Bên vách đá có lão nhân tóc bạc ngồi đánh cờ một mình. Lão ngẩng lên: “Ngươi có muốn thông tuệ hơn người? Ta lấy của ngươi tám năm thọ.”',
  c:[{l:'Đổi tám năm thọ lấy ngộ tính',cost:'−8 năm thọ nguyên',go:()=>{const ch=[lifeLose(8)];return {t:'Lão chạm hai ngón tay lên trán ngươi. Đầu óc bỗng sáng như gương. Lúc tỉnh lại, lão đã biến mất, tóc mai ngươi điểm bạc.',ch:ch.concat(applyE({ngo:3}))};}},{l:'Cúi chào rồi đi',go:()=>({t:'Lão cười khà, tiếp tục ván cờ dang dở.'})}]},
 {id:'huyette',paid:1,n:'Huyết tế pháp bảo',t:'Một tế đàn cổ phủ rêu, trên khắc: “Hiến một bảo vật, đổi lấy một bảo vật.” Rãnh máu vẫn còn ướt.',
  c:[{l:'Hiến một pháp bảo trong túi',cost:'mất một pháp bảo ngẫu nhiên',need:()=>G.run.relics.length>0?'':'Không có pháp bảo nào',go:()=>{const r=G.run;const i=Math.floor(R()*r.relics.length);const old=r.relics.splice(i,1)[0];const nw=genRelic(clamp((old.tier||0)+1,0,4));r.relics.push(nw);clampHp();
    return {t:'Món '+old.name+' tan vào tế đàn. Khói đỏ cuộn lên, rồi một bảo vật khác từ từ hiện ra.',ch:[chip('🏺','mất '+old.name,'Đã hiến','dn'),chip('🏺',nw.name,relicTip(nw),'item',nw.tier)]};}},{l:'Không dám, rời đi',go:()=>({t:'Ngươi lùi lại. Sau lưng như có tiếng ai thở dài.'})}]},
 {id:'linhtuyen',paid:1,n:'Linh tuyền cấm địa',t:'Giữa hẻm núi có một dòng suối xanh biếc, linh khí đặc quánh. Nhưng nước lạnh thấu xương, ngấm vào là tổn kinh mạch.',
  c:[{l:'Ngâm mình trong linh tuyền',cost:'khí huyết tối đa −10% vĩnh viễn',go:()=>({t:'Ngươi run lên từng cơn. Khi bước ra, linh lực trong người dồi dào gấp bội, còn thân thể thì yếu đi trông thấy.',ch:applyE({hpP:-10,mpP:25,tv:6,tvMajor:1})})},{l:'Chỉ vốc một ngụm',go:()=>({t:'Một ngụm nước lạnh buốt. Tinh thần tỉnh táo hẳn.',ch:applyE({tamma:-5})})}]},
 {id:'mataam',paid:1,n:'Ma tâm kinh',t:'Trong hốc cây cháy đen có cuốn sách da người. Chữ trong đó như đang bò, thì thầm hứa hẹn sức mạnh.',
  c:[{l:'Đọc hết cuốn sách',cost:'đạo tâm −3 vĩnh viễn, tâm ma +15',go:()=>({t:'Từng chữ khắc vào xương. Ngươi thấy mình mạnh lên, nhưng giấc ngủ không còn yên.',ch:applyE({tam:-3,tamma:15,atkP:15})})},{l:'Đốt nó đi',go:()=>({t:'Lửa bén vào, sách kêu lên như người. Lòng ngươi thanh thản.',ch:applyE({karma:3,tam:1})})}]},
 {id:'cuoc',paid:1,n:'Đánh cược với tiên nhân',t:'Một gã say mặc đạo bào rách, tay cầm hồ lô: “Cược không? Ngươi đặt một nửa linh thạch, ta đặt một viên đan đột phá.”',
  c:[{l:'Đặt cược một nửa linh thạch',cost:'mất một nửa linh thạch đang có',need:()=>G.run.st>=4?'':'Không đủ linh thạch',go:()=>{const r=G.run;const v=Math.floor(r.st/2);r.st-=v;const ch=[chip('💎','−'+v,'Linh thạch','dn')];
    if(chance(.5)){const c=gainPill(btPill(),2);if(c)ch.push(c);return {t:'Gã lắc hồ lô, đổ ra ba hạt xúc xắc. Ngươi thắng. Gã cười ha hả, ném viên đan qua.',ch};}return {t:'Ba hạt xúc xắc lăn tròn. Ngươi thua. Gã cười, ôm túi linh thạch, biến vào mây.',ch};}},{l:'Lắc đầu đi tiếp',go:()=>({t:'Gã nhún vai, ngửa cổ tu một ngụm.'})}]},
 {id:'saoroi',n:'Sao rơi trước mặt',t:'Đêm ấy một vệt sáng rạch trời, rơi ngay bãi cỏ trước mặt ngươi. Trong hố còn ấm, một món đồ đang tỏa quang.',
  c:[{l:'Nhặt lên',go:()=>{const nw=genRelic(clamp(G.run.region+1,0,4));G.run.relics.push(nw);clampHp();return {t:'Là một pháp bảo, còn vương hơi nóng của trời cao. Hữu duyên mới gặp.',ch:[chip('🏺',nw.name,relicTip(nw),'item',nw.tier)]};}}]},
 {id:'mongtien',n:'Tiên nhân báo mộng',t:'Trong giấc ngủ, ngươi thấy mình đứng giữa biển mây. Một bóng người áo trắng giảng một đoạn kinh rồi tan biến.',
  c:[{l:'Ngồi dậy ghi nhớ',go:()=>({t:'Lời kinh vẫn còn văng vẳng. Ngươi ngộ ra thêm đôi điều.',ch:applyE({ngo:1,tv:4,tvMajor:1})})}]},
 {id:'linhchi',n:'Linh chi ngàn năm',t:'Dưới gốc cây cổ thụ đổ, một cây linh chi to bằng chiếc nón lá, vân đỏ như máu.',
  c:[{l:'Hái và ăn ngay',go:()=>({t:'Vị đắng chát, rồi một luồng ấm chạy khắp thân. Ngươi thấy mình trẻ ra.',ch:[lifeGain(3)].concat(applyE({hpP:5}))})}]},
 {id:'lakhach',n:'Kiếm khách vô danh',t:'Một kiếm khách lướt qua, dừng lại nhìn ngươi hồi lâu: “Căn cốt không tệ.” Rồi múa một đường kiếm cho ngươi xem.',
  c:[{l:'Chăm chú xem',go:()=>({t:'Đường kiếm như nước chảy. Ngươi nhìn mà thấy tay mình ngứa ngáy.',ch:applyE({atkP:5,van:1})})}]},
];
function kyStart(ev){const r=G.run;r.kyT=W().t;r.scene={type:'kyngo',ev:ev.id,text:ev.t,res:null,chips:[],back:r.moving?null:r.at};if(r.moving)r.moving.halt=1;}
function kyOpts(sc){const ev=KYNGO.find(x=>x.id===sc.ev);return ev.c.map(c=>({l:c.l,cost:c.cost||'',no:c.need?c.need():''}));}
function kyPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='kyngo'||sc.res)return;const ev=KYNGO.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!c||(c.need&&c.need()))return;
  const o=c.go()||{};sc.res={l:c.l,t:o.t};sc.chips=o.ch||[];log('Kỳ ngộ: '+ev.n+'.');if(G.run&&r.age>=S().life)die('toahoa');}
{const _adv18=advanceTime;advanceTime=function(h){const o=_adv18(h);const r=G.run;if(!r||h>48)return o;r.kyAcc=(r.kyAcc||0)+h;
  while(r.kyAcc>=HD){r.kyAcc-=HD;if(r.scene||G.screen!=='map'||W().t-(r.kyT||-1e9)<HY/2)continue;
    const roll=R();if(roll<KY_P[0]){kyStart(pick(KYNGO.filter(x=>x.paid)));break;}if(roll<KY_P[0]+KY_P[1]){kyStart(pick(KYNGO.filter(x=>!x.paid&&!x.joke&&!x.sp)));break;}if(roll<KY_P[0]+KY_P[1]+KY_P[2]){kyStart(pick(KYNGO.filter(x=>x.joke)));break;}}
  return o;};}

const KY_P=[1/8000,1/12000,1/9000];
// kỳ ngộ vớ vẩn: trông như hữu duyên, hóa ra đồ dởm hoặc bị lừa
function junkRelic(n){const x=genRelic(0);x.name=n;x.k='kiem';for(const k in x.fx)x.fx[k]=x.fx[k]>0?1:x.fx[k];x.lore='Chuôi khắc chữ “Hàng thịt chợ Đông”. Thái thịt thì tốt.';return x;}
KYNGO.push(
 {id:'bikip',joke:1,n:'Bí kíp gia truyền',t:'Một gã mặt mũi bí hiểm kéo ngươi vào góc: “Bí kíp tuyệt thế của tổ tiên ta. Thấy ngươi có duyên, chỉ lấy ba linh thạch.”',
  c:[{l:'Mua ngay kẻo lỡ',need:()=>G.run.st>=3?'':'Không đủ linh thạch',go:()=>{G.run.st-=3;return {t:'Về mở ra đọc: “Món kho cá ngon nhất làng.” Trang cuối còn ghi: “Thêm chút đường.” Ngươi bật cười, lòng nhẹ hẳn.',ch:[chip('💎','−3','Linh thạch','dn')].concat(applyE({tamma:-2}))};}},{l:'Mỉm cười từ chối',go:()=>({t:'Gã lắc đầu tiếc rẻ rồi chạy sang mời người khác.'})}]},
 {id:'tiendan',joke:1,n:'Tiên đan giá rẻ',t:'Đạo sĩ dạo bày bán “Cửu Chuyển Kim Đan, uống vào thành tiên”, giá chỉ năm linh thạch một viên. Đan đen bóng, mùi hơi lạ.',
  c:[{l:'Mua một viên, uống thử',need:()=>G.run.st>=5?'':'Không đủ linh thạch',go:()=>{G.run.st-=5;const s=S();G.run.hp=Math.max(1,G.run.hp-Math.round(s.maxHp*0.1));return {t:'Uống xong ngươi đau bụng cả buổi chiều. Tới lúc nhìn kỹ viên thứ hai mới nhận ra: là phân dê vo tròn, lăn qua bột than.',ch:[chip('💎','−5','Linh thạch','dn'),chip('❤️','−10%','Khí huyết','dn')]};}},{l:'Hỏi đan làm từ gì',go:()=>({t:'Đạo sĩ ấp úng, thu sạp chạy mất.'})}]},
 {id:'anmay',joke:1,n:'Cao nhân ăn mày',t:'Lão ăn mày rách rưới nắm áo ngươi: “Ta là ẩn thế cao nhân. Cúi đầu lại gần, ta truyền công cho.”',
  c:[{l:'Cúi đầu lại gần',go:()=>{const v=Math.min(G.run.st,ri(2,4));G.run.st-=v;return {t:'Lão vỗ “bốp” một cái lên trán ngươi, hét: “Ngộ chưa!” Ngươi còn đang choáng thì lão đã cắp túi linh thạch chạy biến.',ch:v?[chip('💎','−'+v,'Bị móc túi','dn')]:[]};}},{l:'Cho lão cái bánh rồi đi',go:()=>({t:'Lão nhai ngấu nghiến, gật gù: “Hậu sinh khả úy.”',ch:applyE({karma:1})})}]},
 {id:'thanbinh',joke:1,n:'Thần binh dưới bùn',t:'Dưới đáy ao cạn, một thanh binh khí cắm thẳng, quanh chuôi như có ánh sáng mờ.',
  c:[{l:'Lội xuống rút lên',go:()=>{const x=junkRelic('Dao phay rỉ sét');G.run.relics.push(x);clampHp();return {t:'Rút mãi mới ra. Ánh sáng là do mặt trời phản chiếu. Chuôi còn khắc chữ “Hàng thịt chợ Đông”.',ch:[chip('🏺',x.name,relicTip(x),'item',x.tier)]};}}]},
 {id:'khobau',joke:1,n:'Kho báu dưới gốc đa',t:'Ngươi nhặt được tấm bản đồ rách, đánh dấu chữ thập đỏ dưới gốc đa đầu làng: “Kho báu ở đây.”',
  c:[{l:'Đào suốt đêm',h:8,go:()=>{advanceTime(8);return {t:'Gần sáng, xẻng chạm vào một cái hũ. Mở ra: dưa muối, còn khá ngon. Dưới đáy hũ có mảnh giấy: “Bà để dành cho cháu.”',ch:[chip('⏳','8 giờ','Thời gian trôi qua','')].concat(applyE({tamma:-3}))};}},{l:'Vứt bản đồ đi',go:()=>({t:'Gió thổi tấm bản đồ bay mất. Có lẽ là duyên chưa tới, hoặc là may.'})}]}
);
// ----- kho công pháp: tháo một môn ra khỏi ô đã học thì cất vào kho riêng (không về túi đồ), lắp lại lúc nào cũng được nếu còn ô -----
function artKho(){const r=G.run;return r.artKho||(r.artKho=[]);}
function artStash(u){const r=G.run;const a=arts().find(x=>x.u===u);if(!a)return false;r.arts=r.arts.filter(x=>x!==a);for(let j=0;j<8;j++)if(r.chu[j]&&r.chu[j].u===u)r.chu[j]=null;artKho().push(a);syncSkills();clampHp();saveSoon();return true;}
function artUnstash(u){const r=G.run;const a=artKho().find(x=>x.u===u);if(!a)return false;if(arts().filter(x=>x.type===a.type).length>=artCap(a.type))return false;r.artKho=artKho().filter(x=>x!==a);r.arts.push(a);syncSkills();saveSoon();return true;}

// ================= ĐỢT 19: PHÀM NHÂN =================
// Nhân vật mới sinh ra là phàm nhân: chưa dẫn khí nhập thể. Đây là bậc trước Luyện Khí.
// Cần 50 tu vi (mọi nguồn tu vi lúc này nhân 10, vì thang chỉ 50 thay vì 500). Đủ thì tự dẫn khí nhập thể, bước vào Luyện Khí sơ kỳ.
// Phàm nhân: khí huyết −20%, linh lực −50%, công −15%; không cần lịch luyện hay động phủ để bước qua bậc này.
// Nhân vật trong bản lưu cũ (không có cờ) coi như đã qua bậc phàm nhân.
const PHAM_TVP=50,PHAM_MUL=500/PHAM_TVP;
function isPham(){const r=G.run;return !!(r&&r.pham);}
{const _nr19=newRun;newRun=function(c){const res=_nr19(c);if(G.run){G.run.pham=1;G.run.tv=0;}return res;};}
{const _tp19=tvPts;tvPts=function(realm){return isPham()&&realm===G.run.realm?PHAM_TVP:_tp19(realm);};}
{const _br19=bqReal;bqReal=function(){return _br19()*(isPham()?PHAM_MUL:1);};}
{const _tn19=thonapPct;thonapPct=function(){return _tn19()*(isPham()?PHAM_MUL:1);};}
{const _at19=addTv;addTv=function(x){const r=G.run;if(!r||!r.pham||!(x>0))return _at19(x);
  const res=_at19(x*(G._phEv?3:PHAM_MUL));return res;};}
// tu vi từ sự kiện (uống rượu với cao nhân, ngộ đạo…) chỉ nhân 3 cho phàm nhân: một chuyện kỳ ngộ không đủ thay cả quãng tu luyện
{const _ae19=applyE;applyE=function(e,v){if(!(e&&e.tv>0&&!e.tvMajor&&isPham()))return _ae19(e,v);G._phEv=1;try{return _ae19(e,v);}finally{G._phEv=0;}};}
// dẫn khí nhập thể: gọi khi đột phá thành công (tu vi, lịch luyện đều đầy)
function phamUp(){if(G.run&&G.run.pham&&G.run.tv>=100&&llOf()>=LL_BT){const g=G.run;g.pham=0;g.tv=0;g.tvAcc=0;g.ll=Math.max(0,(g.ll||0)-100)*0.2;const s=S();g.hp=s.maxHp;g.mp=s.maxMp;
    log(`Năm ${Math.floor(g.age)} tuổi, dẫn khí nhập thể, bước vào Luyện Khí.`);if(typeof bio==='function')bio(`Năm ${Math.floor(g.age)} tuổi, ${g.ten} dẫn khí nhập thể, bước vào Luyện Khí.`);}}
// phàm nhân không có lịch luyện ràng buộc
{const _le19=llEff;llEff=function(tv){return isPham()?1:_le19(tv);};}
{const _S19=S;S=function(){const s=_S19();if(isPham()){s.maxHp=Math.round(s.maxHp*0.8);s.maxMp=Math.round(s.maxMp*0.5);s.atk=Math.round(s.atk*0.85);s.matk=Math.round(s.matk*0.85);}return s;};}
// tên cảnh giới
{const _rl19=realmLabel;realmLabel=function(){return isPham()?'Phàm nhân':_rl19();};}
{const _rt19=realmText;realmText=function(r){r=r||G.run;return r===G.run&&isPham()?'Phàm nhân':_rt19(r);};}
function realmName(){return isPham()?'Phàm nhân':REALM[G.run.realm];}
{const _ae19=applyE;applyE=function(e,v){const was=isPham();const ch=_ae19(e,v);if(was&&G.run&&!isPham()&&Array.isArray(ch)){const i=ch.findIndex(c=>c&&c.i==='✨');if(i>=0)ch.splice(i,1);ch.push(chip('✨','dẫn khí nhập thể','Bước vào Luyện Khí tầng 1','up'));}return ch;};}