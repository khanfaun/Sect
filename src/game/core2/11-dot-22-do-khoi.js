// ================= ĐỢT 22: ĐỒ KHỞI ĐẦU NGẪU NHIÊN, CÂU CHUYỆN MỞ ĐẦU KIẾP =================
// Không còn mặc định Hồi Xuân Đan và một công pháp. Mỗi kiếp có thể có 0 tới 2 món phổ thông (thường phàm phẩm,
// hiếm lắm mới hoàng phẩm), mỗi món kèm nguồn gốc để kể trong trang mở đầu.
const START_IT=[
 {w:4,k:'pill',id:'hoixuan',s:['Bà lang đầu làng thương tình cho một viên Hồi Xuân Đan, dặn chỉ dùng lúc nguy cấp.','Dưới đáy rương cũ của ông nội còn sót một viên Hồi Xuân Đan, gói kỹ trong giấy dầu.']},
 {w:2,k:'pill',id:'giaidoc',s:['Một người hái thuốc đi ngang xin bát nước, lúc đi để lại một viên Giải Độc Đan coi như trả ơn.']},
 {w:1,k:'pill',id:'tukhi',s:['Đổi được một viên Tụ Khí Đan của gã bán hàng rong, tới giờ vẫn chưa biết dùng vào việc gì.']},
 {w:3,k:'relic',s:['Món {n} treo trên vách nhà từ đời nào chẳng ai nhớ, nay thuộc về {ten}.','Sau trận lũ năm ấy, {ten} nhặt được {n} dưới bãi bồi, lau sạch bùn vẫn còn dùng được.','Người thợ già cuối làng trước lúc dọn đi để lại cho {ten} món {n}.']},
 {w:2,k:'book',s:['Ở chợ phiên mua được quyển {n} rách bìa, chữ mờ, giá bằng hai cái bánh bao.','Trong gác xép nhà kho có quyển {n} bị chuột gặm mất góc, {ten} đọc lén suốt mấy mùa đông.']},
 {w:2,k:'st',s:['Dành dụm mấy năm được {v} viên linh thạch vụn, khâu kín trong lót áo.']}];
function startItems(){const r=G.run;const out=[];const n=chance(.55)?(chance(.25)?2:1):0;
  for(let i=0;i<n;i++){const it=wpick(START_IT.filter(x=>!out.some(o=>o.it===x)),x=>x.w);if(!it)break;const o={it,s:pick(it.s)};
    if(it.k==='pill'){r.pills.push({id:it.id,q:0});o.n=PILL[it.id].n;}
    else if(it.k==='relic'){const x=genRelic(chance(.08)?1:0);r.relics.push(x);o.n=x.name;}
    else if(it.k==='book'){const b=bookOf(genArt('cp',chance(.08)?1:0));r.relics.push(b);o.n=b.art.n;}
    else {o.v=ri(1,3);r.st+=o.v;}
    out.push(o);}
  return out;}
// ----- câu chuyện: thơ ấu tới hiện tại, dựa trên xuất thân, mệnh cách, linh căn (chỉ gợi, không gọi tên), chỉ số nổi bật, đồ mang theo -----
const LS_OG={
 nong:['{ten} sinh ra trong một gian nhà tranh ven ruộng ở {que}. Tiếng khóc đầu đời lẫn trong tiếng ếch nhái mùa mưa.','Lên bảy đã theo cha ra đồng, chân lấm bùn từ sớm tới tối, chưa từng nghĩ tới chuyện gì xa hơn bờ ruộng.'],
 tran:['Họ {ho} ở {que} từng có tiếng về trận pháp. Tới đời cha {ten} thì chỉ còn lại một gian thư phòng ẩm mốc và mấy cuộn trận đồ rách.','Thuở nhỏ {ten} hay ngồi xếp sỏi thành hình. Cha nhìn thấy, không khen, chỉ lặng lẽ thở dài.'],
 dote:['Lò mổ nhà họ {ho} nằm ở đầu chợ {que}. {ten} lớn lên giữa mùi máu và tiếng dao chặt xương.','Mười tuổi đã tự tay cầm dao, mắt không chớp. Bạn cùng lứa thấy là tránh xa.'],
 thusinh:['{ten} là con nhà nghèo ở {que}. Cả nhà ăn cháo loãng để dành tiền cho một người đèn sách.','Ba lần lều chõng lên kinh, ba lần trượt. Lần cuối trở về, trong tay chỉ còn một bọc sách cũ.'],
 khat:['Không ai biết {ten} sinh ở đâu. Từ khi nhớ được, đã ngủ dưới mái hiên chợ {que}, giành ăn với chó hoang.','Bị đánh nhiều tới mức học được cách chạy nhanh hơn bất cứ ai.'],
 thegia:['{ten} là con thứ của {ho} gia ở {que}. Nhà cao cửa rộng, nhưng chẳng có chỗ nào thật sự là của mình.','Anh cả được mời thầy dạy võ dạy chữ, còn {ten} chỉ được đứng ngoài cửa nghe lỏm.'],
 mieu:['Một đêm đông, lão từ giữ miếu hoang ở {que} nghe tiếng trẻ khóc trước cửa. Trong chiếc giỏ tre là {ten}, quấn trong mảnh vải không thêu tên.','Lớn lên bên mõ gỗ và khói hương: sáng quét sân, tối ngồi nghe lão tụng kinh tới khi ngủ gật.'],
 ren:['Lò rèn nhà họ {ho} đỏ lửa quanh năm ở {que}. {ten} lớn lên trong tiếng búa nện lên đe.','Năm lên tám đã kéo bễ, tay chai sần, vai rộng hơn hẳn bạn cùng lứa.'],
 daodong:['Cha mẹ mất sớm, {ten} được gửi vào một đạo quán nhỏ trên núi gần {que}, làm đạo đồng quét sân.','Đạo trưởng già lẩm cẩm, nhưng sáng nào cũng bắt ngồi thẳng lưng mà thở, miệng đọc mấy câu pháp quyết.'],
 linh:['{ten} sinh ở {que}. Năm mười tuổi bị bắt lính, theo quân trấn thủ biên ải {quoc}.','Sáu năm chinh chiến, trở về với ba vết sẹo, mấy đồng bạc vụn và những giấc ngủ không bao giờ yên.'],
 buon:['Nhà họ {ho} buôn vải ở {que}, giàu chẳng bằng ai nhưng cũng chưa từng thiếu ăn.','{ten} biết tính toán trước khi biết chữ, mặc cả còn giỏi hơn cả cha.'],
 chai:['{ten} sinh ra trên một chiếc thuyền nan neo ở bến {que}.','Chưa biết đi đã biết bơi, theo cha quăng lưới từ khi còn chưa cao bằng mái chèo.'],
 duoc:['Mồ côi từ nhỏ, {ten} được một hiệu thuốc ở {que} nhận về làm dược đồng.','Ngày ngày phơi thuốc tán thuốc, thuộc lòng trăm vị thảo dược trước khi thuộc mặt chữ.'],
 mahuyet:['Đêm {ten} chào đời ở {que}, trời không trăng, chó cả làng sủa tới sáng.','Đôi mắt đỏ như máu khiến dân làng gọi là con quỷ. Trẻ con ném đá, người lớn quay mặt đi.'],
 hat:['{ten} sinh ra sau cánh gà của một gánh hát rong.','Theo gánh hát đi khắp {quoc}, hôm làm vua, mai làm ăn mày, sớm học được cách nhìn mặt người mà đoán lòng.']};
const LS_EL={kim:'mê tiếng chuông đồng, món đồ sắt nào cầm vào tay cũng không muốn buông',moc:'thích vào rừng nằm dưới gốc cây cả buổi, cây tự tay trồng cây nào cũng xanh tốt',
 thuy:'thích nước, mùa mưa đứng ngoài sân hứng mưa mãi không chán, xuống sông là bơi như cá',hoa:'không biết lạnh là gì, mùa đông vẫn đi chân trần, ngồi nhìn bếp lửa tới quên ăn',
 tho:'thích nặn đất thành người thành vật, đi đâu chân cũng vững như đóng cọc',loi:'không sợ sấm, đêm giông trẻ con trốn trong chăn, còn mình chạy ra hiên ngửa mặt nhìn trời',
 bang:'chịu lạnh giỏi, mùa đông lại khỏe hơn mùa hè, thích ngắm băng đóng trên mặt ao',phong:'thích trèo lên chỗ cao nhất làng đứng hứng gió, chạy nhanh tới mức người lớn đuổi không kịp'};
const LS_ELN={kim:'tiếng chuông',moc:'cây cỏ',thuy:'nước',hoa:'lửa',tho:'đất đá'};
const LS_TR={kiemtam:'Có lần nhặt được một thanh kiếm gãy, {ten} giữ khư khư, đêm ngủ cũng ôm bên mình.',thanluc:'Mười tuổi đã vác nổi bao thóc của người lớn, sức như trâu non.',
 menhcung:'Mấy lần ốm thập tử nhất sinh, thầy lang đã lắc đầu, vậy mà lần nào cũng gượng dậy được.',chithuy:'Tính trầm lặng, chuyện lớn chuyện nhỏ đều không làm mặt mày đổi sắc.',
 linhnhan:'Đôi mắt sáng lạ thường, nhìn đâu cũng thấy những thứ người khác bỏ qua.',luoi:'Miệng lưỡi lanh lợi, nói ngọt tới mức bà bán bánh đầu chợ lần nào cũng cho thêm một cái.',
 yeuhuyet:'Vết thương trên người lành nhanh lạ thường, sáng trầy da, tối đã kín miệng.',thiendo:'Sáng dạ hơn người nhưng thân thể ốm yếu. Thầy tướng xem qua chỉ nói một câu: “Trời ghen.”',
 phuctinh:'Số may lạ: rơi xuống giếng cũng có người đi ngang, lạc trong rừng cũng tìm được đường về.',hoalinh:'Có lần bếp bén lửa, {ten} xông vào bê nồi ra, tay không hề bỏng.',
 bangco:'Da trắng như ngọc mà rắn như đá, ngã đâu cũng chẳng gãy xương.',truongtho:'Bà đỡ xem chỉ tay, cười bảo: “Đứa này sống dai lắm.”',
 bachdoc:'Mấy lần ăn nhầm nấm độc, người khác nằm liệt giường, {ten} chỉ đau bụng một đêm.',ngodao:'Thứ gì học cũng nhanh, như thể trước đây đã từng biết.',
 khotu:'Tính lì, việc gì đã làm là làm tới cùng, ngồi một chỗ cả ngày không biết chán.',sattinh:'Trong mắt có một luồng sát khí, chó dữ trong làng gặp cũng cụp đuôi.',
 mongdu:'Đêm nào cũng mơ thấy những tòa lầu trên mây. Tỉnh dậy kể lại, chẳng ai tin.',huyenco:'Đôi khi ngồi yên lại thấy trong người có gì đó chảy như suối nhỏ. Hỏi ai cũng không ai biết.'};
const LS_TPG={thegia:'Ngày rời nhà, mẹ dúi vào tay {ten} một quyển sách mỏng bọc vải: {n}, tâm pháp truyền đời của {ho} gia, vốn chẳng bao giờ tới lượt con thứ.',
 tran:'Trước lúc mất, cha để lại quyển {n}, dặn: “Trận pháp không học cũng được, cái này thì phải học.”',daodong:'Mấy câu đạo trưởng bắt đọc mỗi sáng, hóa ra là {n}, một bài tâm pháp nhập môn.',
 mieu:'Lão từ trước khi viên tịch truyền lại {n}, bảo đó là thứ duy nhất lão mang theo từ thuở còn trẻ.'};
function lifeStory(r,items,region){const og=ORIGIN.find(o=>o.id===r.origin);const s=S();const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const ho=h2?w.slice(0,2).join(' '):w[0],ten2=w.slice(h2?2:1).join(' ')||r.ten;
  const v={ten:r.ten,ho,que:r.que,quoc:G.meta.world.quoc};const f=t=>lsFill(t,v);const L=[];
  const O=LS_OG[r.origin]||[og.bio];L.push(f(O[0]));v.ten=ten2;
  // linh căn: chỉ gợi qua sở thích thuở nhỏ
  const els=r.root.els.filter(e=>LS_EL[e]);
  if(els.length>=4)L.push(f('Thứ gì {ten} cũng thích một chút: '+els.map(e=>LS_ELN[e]).filter(Boolean).join(', ')+'… mà chẳng thứ gì thật sự gắn bó lâu.'));
  else if(els.length===1)L.push(f('Từ bé {ten} đã '+LS_EL[els[0]]+', như thể trời sinh ra đã thuộc về thứ ấy.'));
  else if(els.length)L.push(f('Từ bé {ten} đã '+LS_EL[els[0]]+'; lại '+LS_EL[els[1]]+'.'));
  if(O[1])L.push(f(O[1]));
  if(LS_TR[r.trait])L.push(f(LS_TR[r.trait]));
  // chỉ số nổi bật
  const tr=TRAIT.find(t=>t.id===r.trait)||{};const fx=Object.assign({},og.fx||{});for(const k in tr.fx||{})if(typeof tr.fx[k]==='number')fx[k]=(fx[k]||0)+tr.fx[k];
  const body=(fx.atkP||0)+(fx.hpP||0)+(fx.defP||0)/2;const ngo=s.ngo,tam=s.tam,van=s.van,tp=s.tp;const P=[];
  if(ngo<=9&&body>=10)P.push('Đọc sách thì ngủ gật, chữ vào tai này ra tai kia; nhưng sức lực dồi dào, khí huyết cuồn cuộn, một mình gánh nổi việc của hai người.');
  else if(ngo>=13&&body<0)P.push('Đọc sách một lần là thuộc, câu khó hiểu mấy cũng nghĩ ra; chỉ là thân thể mảnh khảnh, đi đường xa đã thở dốc.');
  else if(ngo>=13)P.push('Sách vở đọc một lần là nhớ, thầy đồ trong làng từng nói đứa trẻ này nên đi thi.');
  else if(ngo<=8)P.push('Đọc sách thì ngủ gật, thầy đồ dạy mười câu nhớ được một.');
  else if(body>=10)P.push('Thân thể cường tráng, khí huyết sung mãn, ít khi ốm đau.');
  if(tam>=12)P.push('Lòng dạ vững vàng, chuyện gì đã quyết thì khó ai lay chuyển được.');else if(tam<=7)P.push('Tính khí nóng nảy, gặp chuyện bất bình là máu nóng dồn lên mặt.');
  if(P.length<2&&van>=7)P.push('Vận khí cũng tốt, đi chợ nhặt được tiền, đi rừng gặp nấm quý.');else if(P.length<2&&tp>=9)P.push('Chân tay nhanh nhẹn, trèo cây leo núi chẳng ai theo kịp.');
  for(const x of P.slice(0,2))L.push(f(x));
  // đồ mang theo và nguồn gốc
  for(const a of arts()){if(a.type==='tp'){if(a.src==='gia truyền'&&LS_TPG[r.origin])L.push(lsFill(LS_TPG[r.origin],Object.assign({n:a.n},v)));else if(a.src==='ký ức kiếp trước')L.push(f('Có những đêm trong mơ vang lên một bài khẩu quyết. Tỉnh dậy vẫn nhớ từng chữ: '+a.n+'. Chẳng ai dạy, như thể mang theo từ kiếp trước.'));}
    else if(a.type==='cp'){const sk=(r.skills||[]).find(k=>a.lines.some(x=>x.sk===k.id));const src=sk&&sk.src;
      if(src==='xuat')L.push(f('Đạo trưởng còn dạy thêm môn '+a.n+' để phòng thân, bảo: “Trên núi nhiều thú dữ.”'));else if(src==='ky')L.push(f('Đôi khi tay chân tự múa thành chiêu, như đã luyện từ kiếp nào: '+a.n+'.'));}}
  if(r.origin==='thegia')L.push(f('Lão quản gia thương tình, lén cho thêm một túi linh thạch và một viên Hồi Xuân Đan.'));
  if(r.origin==='duoc')L.push(f('Ông chủ hiệu thuốc cho mang theo một viên Hồi Xuân Đan và một viên Giải Độc Đan, coi như tiền công mấy năm.'));
  if(r.origin==='buon')L.push(f('Lúc {ten} đi, cha đưa cho một túi linh thạch, dặn tiêu cho khéo.'));
  if(r.origin==='khat')L.push(f('Ngày rời {que}, trong túi không có lấy một đồng.'));
  for(const o of items)L.push(lsFill(o.s,Object.assign({n:o.n,v:o.v},v)));
  // hiện tại
  L.push(f('Năm nay {ten} '+Math.floor(r.age)+' tuổi.'+(region?' '+region.replace(/\b[Nn]gươi\b/g,ten2):'')));
  L.push(f(tuArt()?'Trong tay có một bài tâm pháp và đôi chân của mình. Đường tu còn dài, chẳng ai biết sẽ đi tới đâu.':'{ten} vẫn là phàm nhân, chưa biết cách dẫn một sợi linh khí vào thân. Nhưng đường thì vẫn ở trước mặt.'));
  return L;}
{const _nr22=newRun;newRun=function(c){const res=_nr22(c);const r=G.run;if(!r)return res;const items=startItems();
  const reg=r.scene&&r.scene.type==='region'?r.scene.text:'';if(r.scene&&r.scene.type==='region')r.scene=null;
  r.story=lifeStory(r,items,reg);syncSkills();saveSoon();return res;};}
function lsFill(t,v){return String(t).replace(/\{(\w+)\}/g,(m,k)=>v[k]!=null?v[k]:m);}

// ================= ĐỢT 23: ĐỘT PHÁ =================
// Bỏ giới hạn cảnh giới theo phẩm tâm pháp: phẩm tâm pháp chỉ ảnh hưởng tốc độ tu luyện và tỉ lệ đột phá.
tuCapWhy=function(){return '';};
// Tu vi đầy mà lịch luyện chưa đầy: bình cảnh. Cả hai đầy: đột phá (kể cả phàm nhân dẫn khí nhập thể, không còn tự động).
function btState(){const r=G.run;if(!r||r.tv<100)return '';return canBreak()?'dp':'bc';}
{const _bt23=btTarget;btTarget=function(){return isPham()?0:_bt23();};}
{const _bs23=btStages;btStages=function(to){return isPham()?[]:_bs23(to);};}
{const _bi23=btItems;btItems=function(){return isPham()?G.run.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&PILL[x.p.id].realm==null):_bi23();};}
// Tỉ lệ thành công: cộng từ nhiều nguồn, mỗi nguồn hiện riêng trong màn chuẩn bị
const BT_ROOT={thien:6,bien:4,song:2,tam:0,tu:-3,tap:-6},BT_LK=[-6,-2,2,6];
function btParts(slots){const r=G.run,s=S();const e=btEff(slots||[]);const to=btTarget();const n=nodeById(r.at);const L=[];const add=(t,v,tip)=>{v=Math.round(v*10)/10;if(v)L.push({t,v,tip});};
  add(isPham()?'Dẫn khí nhập thể':'Cơ bản · '+REALM[to],(isPham()?0.75:BT_BASE[Math.min(4,r.realm)])*100,'Cảnh giới càng cao càng khó');
  add('Ngộ tính',(s.ngo-10)*1.2,'Mỗi điểm trên 10: +1,2%');add('Đạo tâm',(s.tam-10)*1.2,'Mỗi điểm trên 10: +1,2%');
  if(r.tamma)add('Tâm ma',-r.tamma*0.4,'Mỗi điểm tâm ma: −0,4%');
  add('Linh căn',BT_ROOT[r.root.id]||0,rootView(r.root).n);
  const a=tuArt();if(a){const d=a.tier-Math.max(0,to);add('Tâm pháp '+PHAM[a.tier],d<0?d*6:Math.min(d,3)*3,d<0?'Phẩm tâm pháp thấp so với cảnh giới muốn lên':'Tâm pháp vững, dẫn khí xung quan dễ hơn');
    if(a.el!=='vo')add(r.root.els.includes(a.el)?'Tâm pháp hợp linh căn':'Tâm pháp lệch linh căn',r.root.els.includes(a.el)?4:-4,'Hệ tâm pháp '+(EL[a.el]||EL.vo).n);}
  const cps=(isPham()?[]:activeArts()).filter(x=>x.type==='cp'&&x.el!=='vo');const bad=cps.filter(x=>!r.root.els.includes(x.el)).length;
  if(cps.length)add(bad?'Công pháp lệch linh căn ('+bad+')':'Công pháp hợp linh căn',bad?-Math.min(6,bad*2):3,'Công pháp đang vận hành trong Khí Hải so với linh căn');
  add('Linh khí: '+LK_N[lkOf(n)],BT_LK[lkOf(n)],'Linh khí nơi đột phá');
  if(llOf()>100)add('Lịch luyện dư',Math.min(10,(llOf()-100)*0.2),'Lịch luyện vượt mức: tối đa +10%');
  if(r.btFail)add('Thất bại trước '+r.btFail+' lần',r.btFail*8,'Rút kinh nghiệm từ lần trước');
  const w=wounds().filter(x=>!x.perm).length;if(w)add('Đang mang thương',-5*w,'Mỗi vết thương: −5%');
  if(r.hp<S().maxHp*0.5)add('Khí huyết dưới một nửa',-5,'');
  if(e.rate)add('Đan dược, linh vật',e.rate,'Vật phẩm đặt vào ô chuẩn bị');
  return L;}
btRate=function(slots){return clamp(btParts(slots).reduce((a,x)=>a+x.v,0)/100,0.05,0.97);};
// Đạo cơ (phẩm chất cảnh giới): ngoài đạo cơ tích lũy và linh dược, lúc đột phá còn cộng thêm
function daoParts(){const r=G.run;if(isPham())return [];const to=btTarget();const L=[];const a=tuArt();const n=nodeById(r.at);
  if(a&&a.tier>=to+1)L.push({t:'Tâm pháp '+PHAM[a.tier]+' vượt cảnh giới',v:a.tier>=to+2?2:1});
  if(['thien','bien'].includes(r.root.id))L.push({t:rootView(r.root).n,v:1});
  if(lkOf(n)>=3)L.push({t:'Linh khí dồi dào',v:1});
  if(llOf()>=130)L.push({t:'Lịch luyện dư dả',v:1});
  if(!r.tamma)L.push({t:'Tâm không vướng ma',v:1});
  return L;}
{const _be23=btEff;btEff=function(slots){const o=_be23(slots);o.dao+=daoParts().reduce((a,x)=>a+x.v,0);return o;};}
// phàm nhân: đột phá thành dẫn khí nhập thể, không có thiên kiếp, không có phẩm chất
{const _ps23=prepStart;prepStart=function(){const r=G.run,sc=r&&r.scene;if(!isPham())return _ps23();if(!sc||sc.type!=='prep'||!canBreak())return;
  const p=btRate(sc.slots);const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);sc.slots=[];
  advanceTime(7*HD);if(!G.run)return;const back=sc.back;r.bt={to:0,stages:[],si:0,used};
  if(R()<p){r.bt=null;phamUp();r.scene={type:'btres',back,ok:true,done:1,text:'Theo nhịp thở, một sợi linh khí mảnh như tơ len vào kinh mạch, chảy xuống đan điền rồi cuộn lại ở đó. Thân thể nhẹ bẫng, tai nghe rõ tiếng lá rơi ngoài trăm bước. Từ hôm nay, không còn là phàm nhân nữa.',
    chips:used.map(n=>chip('⚗️',n,'Đã dùng','')).concat([chip('☯️','Luyện Khí tầng 1','Dẫn khí nhập thể, bước vào Luyện Khí tầng 1','up')])};}
  else btFail(back,used);};}
// phàm nhân dẫn khí nhập thể ở đâu cũng được, không cần động phủ
{const _pa23=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;if(a==='bt'&&isPham()&&canBreak()&&sc&&sc.type==='place'){openPrep(nodeById(sc.id));return;}return _pa23(a);};}
