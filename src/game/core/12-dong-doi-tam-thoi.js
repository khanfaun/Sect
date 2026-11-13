// ---------------- ĐỒNG ĐỘI TẠM THỜI ----------------
function addParty(v,days,pow){
  const r=G.run;r.party=r.party||[];if(r.party.length>=2)return null;
  const s=S();const p={id:(r.pid=(r.pid||0)+1),ten:v.ten,icon:v.g==='nu'?'👩':'🧑',hp:Math.round(s.maxHp*(pow||0.6)),pow:pow||0.6,until:W().t+(days||30)*HD,el:'vo',sub:typeof v.realm==='number'?REALM[clamp(v.realm,0,5)]:typeof v.realm==='string'&&v.realm?v.realm:(typeof realmName==='function'?realmName():REALM[r.realm])};
  r.party.push(p);log(`${v.ten} đi cùng ngươi ${days||30} ngày.`);return chip('🤝',v.ten+' đồng hành','Đi cùng và chiến đấu bên ngươi '+(days||30)+' ngày','up');
}

// ---------------- NỐI CÁC KIẾP ----------------
function rivalsCoarse(months){
  const w=W();for(const rv of w.rstate){if(!rv.alive)continue;const dy=months/12;rv.age=(rv.age||18)+dy;const wr=w.rivals[rv.i];
    let left=dy;while(left>0&&rv.realm<4){const step=Math.min(left,1);rv.prog+=step*wr.tal*[14,6,2.6,1.2,.5][rv.realm];left-=step;if(rv.prog>=100){rv.realm++;rv.prog=ri(0,15);}}
    if(rv.age>LIFE[rv.realm]*0.95||(rv.age>60&&rv.realm<1)){rv.alive=false;rv.died=tYear(w.t);}}
}
function newRival(i,from){
  const w=W();const s=w.sects[w.rivals[i].s];const g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
  const old=w.rivals[i];const ten=s.kind==='phat'?tangName():genName(g,true);
  const rel=from&&chance(.3)?(chance(.5)?'đệ tử của '+old.ten:'hậu duệ của '+old.ten):null;
  const tt={kiem:g==='nam'?'kiếm tử':'kiếm tiên tử',dan:g==='nam'?'đan tử':'đan tiên tử',phat:'phật tử',ma:g==='nam'?'ma tử':'yêu nữ',am:g==='nam'?'quỷ tử':'âm nữ',the:g==='nam'?'thiếu chủ':'đại tiểu thư',thu:g==='nam'?'thú vương tử':'linh thú tiên tử'}[s.kind]||(g==='nam'?'thánh tử':'thánh nữ');
  w.rivals[i]={ten,g,s:old.s,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:old.tinh,tal:rnd1(0.85+R()*0.55),rel};
  w.rstate[i]={i,realm:0,prog:ri(5,40),alive:true,age:ri(16,20)};
  if(rel)chron(`${ten}, ${rel}, bước vào hàng thiên kiêu.`);
}
function afterlife(r,cause,info){
  const w=W();
  // 2. mộ tại điểm đang đứng (chết trên đường: điểm vừa rời)
  let at=r.at;if(r.moving&&r.moving.seg<r.moving.path.length-1)at=r.moving.path[r.moving.seg];
  const n=nodeById(at);
  if(cause!=='phithang'&&n){const items=shuffle(r.relics.slice()).slice(0,2);n.grave={ten:r.ten,tuoi:Math.floor(r.age),realmName:qualName(r.realm,(r.quality||[])[r.realm]||0),t:w.t,items,r:n.r};
    const gs=[];for(const R0 of w.regions)for(const x of R0.nodes)if(x.grave)gs.push(x);gs.sort((a,b)=>a.grave.t-b.grave.t);while(gs.length>12){gs.shift().grave=null;}}
  // 3. sương mù thành ký ức (đã gọi fogToMemory)
  // 4. ân oán còn lại vào legacy
  for(const s of r.seeds)w.legacy.push({t:s.t,ten:s.ten,d:s.d,hn:s.hn,who:r.ten,r:s.r});
  while(w.legacy.length>20)w.legacy.shift();
  w.rstate=r.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,died:x.died}));
  // kẻ đã giết người chơi
  if(cause==='combat'&&info&&!info.boss&&info.k&&info.k!=='kiep'){const old=w.nemesis&&w.nemesis.n===info.n?w.nemesis.lv:0;w.nemesis={n:info.n,k:info.k,i:info.i,el:info.el,r:r.region,lv:old+1,kiep:r.kiep,who:r.ten};}
  // 5. năm tháng trôi qua
  const yrs=ri(3,30);G.lastGap=yrs;
  worldCoarse(yrs*12);rivalsCoarse(yrs*12);
  // 6. thế hệ
  for(let i=0;i<w.rstate.length;i++){if(!w.rstate[i].alive)newRival(i,true);}
  const keep=[];
  for(const L of w.legacy){
    if(L.done){continue;}
    if(L.t==='an'&&chance(.5)){const pool=[];for(const R0 of w.regions.slice(0,Math.max(1,(r.maxRegion||0)+1)))for(const x of R0.nodes)if(['tran','thanh','tong'].includes(x.type)&&!x.patron)pool.push(x);
      if(pool.length){const x=pick(pool);x.patron={ten:L.ten,who:L.who,d:L.d,role:x.type==='tong'?'trưởng lão':'chưởng quỹ'};continue;}}
    if(L.t==='oan'&&chance(.5)){L.feud=1;keep.push(L);continue;}
    if(L.t==='oan'&&!L.feud)continue;
    keep.push(L);
  }
  w.legacy=keep.slice(-20);
  if(w.chron.length>60)w.chron=w.chron.slice(-60);
}
// tin đồn về các kiếp trước
const RUMOR_KIEP=['Trà lâu vẫn kể chuyện {$a}, người năm {$y} từng {$v}. Có kẻ bảo người ấy chưa chết, chỉ đổi một cái tên.','Ở {$pl} có tấm bia khắc tên {$a}. Người qua đường vẫn dừng lại vái một vái.','“Thời {$a} còn sống ấy à…” Lão già lắc đầu. “Bây giờ không còn ai như thế nữa.”'];
function rumorKiep(){const L=G.meta.lives.filter(x=>x.hero);if(!L.length)return null;const x=pick(L);return T(RUMOR_KIEP,{a:x.ten,y:x.y||tYear(W().t)-20,v:x.hero,pl:placeName(pick(['nui','thanh','tran']))});}
function shopExtra(items,n){const r=G.run;if(n&&W().ents.some(e=>e.type==='di'&&e.data.k==='daugia'&&e.at===n.id)&&r.region<4)items.push({k:'pass',reg:r.region+1,n:'Lệnh bài thông quan '+REG[r.region+1].n,p:price(90)});}

// lưu (được UI gán)
let saveSoon=()=>{};

// ================= SỰ KIỆN 1: GIANG HỒ, PHÀM TRẦN =================
ev({id:'lao_gia',src:'road',n:'Lão nhân hấp hối',tg:['*'],r:[0,1,2],w:3,v:()=>({a:npc('gia')}),
 t:['{mo} Bên vệ đường, một lão nhân {$a.look} nằm co ro dưới gốc cây, hơi thở đứt quãng. Thấy ngươi, {$a.hn} gắng nhấc tay: “{$a.goi}… nước…”',
    'Ngươi suýt vấp phải một người nằm giữa lối. Là một lão nhân {$a.look}, ngực áo loang máu đã thâm đen. Bên hông {$a.hn} là một túi trữ vật thêu chỉ bạc.',
    '{$canh} Dưới mái đình đổ, có người đang ho ra máu. {$a.ten}, một tán tu {$a.look}, ngẩng lên nhìn ngươi bằng ánh mắt của kẻ biết mình sắp chết.'],
 c:[
  {i:'🤲',l:'Đỡ dậy, truyền chút linh lực',cost:{mp:'30%'},o:[
    {w:3,t:'{$a.hn} nắm chặt tay ngươi, cười khà: “Không ngờ cuối đời còn gặp được người tốt.” {$a.hn} nhét vào tay ngươi một cuốn sách nhàu nát, rồi nhắm mắt. Gió thổi, mái tóc bạc khẽ lay.',e:{skill:1,karma:5}},
    {w:2,t:'{$a.hn} gắng gượng kể về một khe đá sau núi, rồi tắt thở. Ngươi chôn cất tử tế. Theo lời {$a.hn}, ngươi tìm được mấy túi linh thạch giấu kỹ.',e:{st:25,karma:5,tv:4}},
    {w:1,t:'Bàn tay khô héo bỗng siết lại như gọng kìm. {$a.hn} ngẩng lên, mắt đỏ ngầu: “Thân thể trẻ thật…” Là ma tu muốn đoạt xá!',fight:{k:'matu',n:'{$a.ten}',m:1.1},win:{t:'Lão ma tan thành khói đen. Trong túi còn ít linh thạch và một viên đan.',e:{st:20,pill:1}}}]},
  {i:'🎒',l:'Lấy túi trữ vật',o:[
    {w:2,t:'Ngươi giật lấy túi. {$a.hn} trợn mắt nhìn ngươi, muốn nói gì đó mà không thành tiếng. Đi xa rồi, ngươi vẫn thấy ánh mắt ấy sau gáy.',e:{st:35,karma:-8,tamma:6}},
    {w:1,t:'Túi có cấm chế. Vừa chạm vào, một luồng hắc khí xộc lên tay. {$a.hn} cười khàn khàn rồi tắt thở.',e:{hp:'-20%',karma:-5,st:15}}]},
  {i:'🚶',l:'Bước qua',t:'Ngươi bước qua. Sau lưng có tiếng thở dài, rồi im bặt. Tu tiên giới mỗi ngày đều có người chết như vậy.',e:{tamma:2}}
 ]});

ev({id:'thuong_doan',src:'road',n:'Thương đội gặp nạn',tg:['rung','nui','hoang','song','bien'],w:2,v:()=>({a:npc('thuong')}),
 t:['{mo} Phía trước có tiếng la hét. Một đoàn xe thương lái bị chặn giữa đường, {$a.ten} đang quỳ lạy một đám người bịt mặt.',
    'Tiếng ngựa hí, tiếng hàng hóa đổ loảng xoảng. Một thương đội bị cướp chặn đánh, hộ vệ đã ngã quá nửa. {$a.ten}, {$a.look}, co rúm sau bánh xe.'],
 c:[
  {i:'⚔️',l:'Ra tay tương trợ',fight:{k:'sontac'},win:{t:'{$a.ten} lạy ngươi như tế sao: “Ân nhân! Ân nhân!” Gã nhất quyết dúi vào tay ngươi một túi linh thạch, hứa sau này gặp lại sẽ báo đáp.',e:{st:30,karma:6,an:['a','cứu khỏi tay bọn cướp']}}},
  {i:'👀',l:'Đứng xem, chờ ngư ông đắc lợi',chk:['tp',10],
    ok:{t:'Hai bên đánh nhau tan tác. Ngươi lặng lẽ nhặt mấy thứ rơi vãi rồi biến mất trước khi ai kịp để ý.',e:{st:25,karma:-3,pill:1}},
    no:{t:'Một tên cướp phát hiện ra ngươi. “Còn một con chuột!” Cả đám quay sang.',fight:{k:'sontac'},win:{t:'Bọn cướp chạy tán loạn. Thương đội đã bỏ đi từ lúc nào.',e:{st:10}}}},
  {i:'🚶',l:'Đi đường vòng',t:'Chuyện của người ta, ngươi không xen vào. Đi vòng mất thêm nửa ngày.',e:{h:36}}
 ]});

ev({id:'ke_bi_duoi',src:'road',n:'Kẻ bị truy sát',tg:['*'],w:2,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Một bóng người lao ra từ bụi rậm, suýt đâm sầm vào ngươi. Là {$a.ten}, {$a.look}, vai cắm một mũi tên. “Cứu… người của {$sect} đang đuổi theo!”',
    'Có tiếng bước chân dồn dập. {$a.ten} chạy tới, sắc mặt trắng bệch: “{$a.goi}, xin che giấu giúp {$a.xung}! {$sect} muốn giết người diệt khẩu!”'],
 c:[
  {i:'🛡️',l:'Đứng chắn phía trước',fight:{k:'detu',n:'{$b.ten}'},win:{t:'{$a.ten} cúi đầu thật sâu: “Ơn này {$a.xung} khắc cốt.” Trước khi đi, {$a.hn} để lại cho ngươi một viên đan.',e:{pill:1,karma:5,an:['a','cứu khỏi tay truy binh']}}},
  {i:'🌿',l:'Giấu vào bụi rậm, đánh lạc hướng',chk:['tam',10],
    ok:{t:'Đám đệ tử {$sect} hỏi, ngươi chỉ bừa sang hướng khác, mặt không đổi sắc. Chúng đi rồi, {$a.ten} bò ra, run rẩy cảm tạ.',e:{karma:5,tv:3,an:['a','che giấu khỏi truy binh']}},
    no:{t:'“Nói dối không chớp mắt nhỉ?” Kẻ cầm đầu cười lạnh, rút kiếm.',fight:{k:'detu',n:'{$b.ten}'},win:{t:'Đuổi được bọn chúng, nhưng {$a.ten} đã biến mất, chỉ để lại vệt máu và một miếng ngọc bội.',e:{relic:0}}}},
  {i:'👉',l:'Chỉ chỗ cho kẻ đuổi',t:'Ngươi chỉ tay. {$a.ten} nhìn ngươi bằng ánh mắt mà ngươi sẽ còn nhớ rất lâu. Đệ tử {$sect} ném cho ngươi túi linh thạch như ném xương cho chó.',e:{st:30,karma:-8,tamma:5,oan:['a','chỉ chỗ cho kẻ thù']}}
 ]});

ev({id:'linh_thao',n:'Linh thảo trên vách',tg:['nui','rung','dong'],w:2,
 t:['{$canh} Trên vách đá dựng đứng, một gốc linh thảo lá đỏ như son tỏa ánh sáng nhạt. Ít nhất cũng trăm năm tuổi.',
    'Ngươi ngửi thấy mùi hương ngọt lịm. Ngẩng lên, một đóa hoa trắng muốt mọc nơi kẽ đá cao mấy chục trượng, có con rắn nhỏ quấn quanh thân.',
    'Giữa khe đá ẩm ướt mọc một cây nấm màu tím, tán to bằng cái nón. Quanh đó không có cọng cỏ nào, như mọi thứ đều nhường chỗ cho nó.'],
 c:[
  {i:'🧗',l:'Leo lên hái',chk:['tp',9],ok:{t:['Ngươi bám từng mỏm đá mà lên. Lúc chạm được linh thảo, mồ hôi đã ướt đẫm lưng. Đáng giá.','Một chân trượt, một tay bám, ngươi treo lơ lửng giữa không trung một hồi lâu. Nhưng cuối cùng, linh thảo đã nằm trong tay.'],e:{pill:'tinhnguyen',tv:4}},
    no:{t:'Đá vụn dưới tay vỡ ra. Ngươi rơi xuống, lăn mấy vòng mới dừng. Ngẩng lên, linh thảo vẫn đung đưa trên cao như trêu ngươi.',e:{hp:'-25%'}}},
  {i:'🪄',l:'Dùng pháp thuật hái từ xa',cost:{mp:'40%'},t:'Linh lực hóa thành bàn tay vô hình, nhẹ nhàng nhổ cả gốc. Ngươi thở ra, mệt nhưng hài lòng.',e:{pill:'hoixuan',tv:3}},
  {i:'🐍',l:'Chờ thủ hộ thú lộ diện',fight:{k:'mang'},win:{t:'Thủ hộ thú chết. Ngươi thong thả hái linh thảo, lại được thêm cái mật.',e:{pill:'tinhnguyen',st:8}}}
 ]});

ev({id:'thi_the',src:'road',n:'Thi thể bên đường',tg:['*'],w:2,
 t:['Một thi thể nằm sấp bên đường, áo đệ tử {$sect} đã bạc màu. Bên hông vẫn còn túi trữ vật.',
    'Dưới gốc cây có một bộ xương còn mặc đạo bào. Tay xương ôm chặt một hộp gỗ, như sợ ai lấy mất.',
    '{$canh} Mùi tử khí xộc vào mũi. Một tu sĩ chết chưa lâu, mắt vẫn mở, như đang nhìn thứ gì phía sau ngươi.'],
 c:[
  {i:'🔍',l:'Lục soát',o:[
    {w:3,t:'Ngươi tìm được ít linh thạch và một viên đan còn nguyên trong lọ.',e:{st:18,pill:1}},
    {w:2,t:'Trong hộp là một cuộn bí tịch dính máu. Chữ viết run rẩy, như được chép trong cơn hấp hối.',e:{skill:1}},
    {w:1,t:'Túi có độc. Ngón tay ngươi tím tái lại, phải vận công nửa ngày mới ép ra được.',e:{hp:'-15%',st:10}},
    {w:1,t:'Thi thể bỗng co giật, rồi ngồi bật dậy!',fight:{k:'cuongthi'},win:{t:'Lần này thì nó nằm yên thật. Trong túi còn ít linh thạch.',e:{st:20}}}]},
  {i:'⚱️',l:'Chôn cất tử tế',t:['Ngươi đào huyệt, đặt thi thể xuống, cắm một cành cây làm bia. Đêm ấy ngươi mơ thấy một người cúi đầu cảm tạ.','Ngươi khép mắt người chết lại, đắp đất thành nấm. Không biết tên, ngươi khắc lên đá: “Người đi đường”.'],e:{karma:6,tam:1,van:1}},
  {i:'🚶',l:'Không đụng vào',t:'Người chết rồi, ân oán nên chết theo. Ngươi đi tiếp.'}
 ]});

ev({id:'tranh_bao',n:'Tranh đoạt bảo vật',tg:['nui','rung','phe','dong','hoang','bien'],w:2,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Kiếm quang và hỏa quang va vào nhau trên không trung. {$a.ten} và {$b.ten} đang tranh nhau một chiếc hộp ngọc, cả hai đều đã bị thương.',
    'Một bảo vật vừa xuất thế, hào quang chiếu sáng nửa sườn núi. Bên dưới, hai nhóm tu sĩ đang đánh nhau sống chết.'],
 c:[
  {i:'🎣',l:'Đợi cả hai kiệt sức rồi ra tay',chk:['tp',11],
    ok:{t:'Lúc cả hai cùng thở dốc, ngươi lao ra chộp lấy hộp ngọc rồi độn thổ. Sau lưng là tiếng chửi rủa vang trời.',e:{relic:0,karma:-3,oan:['a','cướp bảo vật trước mắt']}},
    no:{t:'Cả hai đều quay lại nhìn ngươi. Có lẽ đó là lần duy nhất họ đồng lòng.',fight:{k:'tantu',m:1.2},win:{t:'Ngươi đánh lui cả hai. Bảo vật về tay ngươi, dù cái giá không nhỏ.',e:{relic:0}}}},
  {i:'🤝',l:'Giúp {$a.ten}',fight:{k:'tantu',n:'{$b.ten}'},win:{t:'{$a.ten} chia cho ngươi một nửa chiến lợi phẩm, còn kéo ngươi đi uống rượu tới khuya.',e:{st:25,pill:1,an:['a','giúp giữ bảo vật']}}},
  {i:'🚶',l:'Không dính vào',t:'Bảo vật nhiều kẻ tranh thường là mồi câu. Ngươi rời đi.',e:{tv:2}}
 ]});

ev({id:'sap_ban',n:'Sạp hàng đồ cổ',tg:['tran','thanh'],w:2,v:()=>({a:npc('thuong')}),
 t:['Một sạp hàng nhỏ bày la liệt đồ cũ. {$a.ten}, {$a.look}, vừa thấy ngươi đã nhoẻn cười: “{$a.goi} xem thử, toàn đồ thượng cổ cả!”',
    'Ở góc chợ, một gã bán hàng rong đang thề sống thề chết rằng cái bát mẻ trên tay từng là bát cơm của tiên nhân.'],
 c:[
  {i:'🎲',l:'Mua đại một món',cost:{st:22},o:[
    {w:2,t:'Về nhìn kỹ, hóa ra là đồ thật!',e:{relic:0}},
    {w:2,t:'Là một viên đan không rõ tên, ngửi thấy thơm. Ngươi đánh liều cất đi.',e:{pill:1}},
    {w:2,t:'Đồ giả. Rõ ràng là đồ giả. Ngươi cười khổ, coi như học phí.'}]},
  {i:'🗣️',l:'Mặc cả',chk:['van',8],ok:{t:'Ngươi nói một hồi, gã bán hàng mặt tái mét, cuối cùng đưa ngươi một món gần như cho không.',e:{relic:0,st:-6}},no:{t:'Gã cười hề hề, không bớt một đồng. Ngươi bỏ đi.'}},
  {i:'🔎',l:'Vạch trần đồ giả',chk:['ngo',10],ok:{t:'Ngươi chỉ ra từng vết keo dán. Đám đông cười ồ, gã phải bồi thường cho mấy người bị lừa trước đó, lại dúi cho ngươi chút tiền để im miệng.',e:{st:15,karma:2}},no:{t:'Ngươi nói sai. Món đó là thật. Cả chợ cười ngươi.',e:{tamma:2}}}
 ]});

ev({id:'thu_con',n:'Thú non lạc mẹ',tg:['rung','nui','dong','hoang'],w:2,
 t:['Trong hốc cây, một con hồ ly nhỏ lông trắng đang run rẩy, chân bị kẹp. Nó kêu ư ử khi thấy ngươi.',
    'Tiếng kêu non nớt dẫn ngươi tới một con hồ ly con, lông đỏ như lửa, mắt đen láy. Mẹ nó nằm chết cách đó không xa, trên mình cắm ba mũi tên.'],
 c:[
  {i:'🐾',l:'Cứu và nuôi nó',req:r=>!(r.pets&&r.pets.length>=3)&&!r.relics.find(x=>x.u==='linhthu'),t:'Ngươi ôm nó lên, lau sạch bùn đất, băng chỗ bị thương. Con thú nhỏ liếm tay ngươi rồi chui vào ngực áo, từ đó không chịu rời.',e:{petNew:'holy',karma:4}},
  {i:'🗡️',l:'Lấy yêu đan',t:'Ngươi xuống tay dứt khoát. Yêu đan nhỏ như hạt đậu, vẫn còn ấm.',e:{tv:6,karma:-5,tamma:3}},
  {i:'🔙',l:'Đưa về hang',o:[
    {w:2,t:'Ngươi đặt nó trước cửa hang. Một con thú lớn hiện ra, nhìn ngươi rất lâu, rồi đẩy ra một viên ngọc sáng.',e:{relic:0,karma:4}},
    {w:1,t:'Thú mẹ tưởng ngươi bắt con nó, gầm lên lao tới!',fight:{k:'beast'},win:{t:'Ngươi đánh lui thú mẹ. Hai mẹ con chạy vào rừng sâu. Ngươi đứng đó, không biết nên vui hay buồn.',e:{tv:3}}}]}
 ]});

ev({id:'thac_ngo',n:'Ngộ đạo dưới thác',tg:['nui','song','rung'],w:2,
 t:['Thác nước trắng xóa đổ xuống từ trăm trượng. Ngươi ngồi xuống tảng đá bên dưới, tiếng nước gầm như sấm mà lòng lại tĩnh lạ thường.',
    '{$canh} Tiếng nước chảy có nhịp, như có ai đang gảy đàn. Ngươi bỗng nhớ tới một câu khẩu quyết chưa từng hiểu.'],
 c:[
  {i:'🧘',l:'Ngồi xuống ngộ đạo',chk:['ngo',9],ok:{t:'{tvgain} Khi mở mắt, trăng đã lên tới đỉnh. Ngươi ngồi đó nửa năm.',e:{dao:2,tv:14,tam:1,h:360}},no:{t:'Càng nghĩ càng rối. Tiếng nước như tiếng cười nhạo. Ngươi đứng dậy, đầu đau như búa bổ.',e:{tamma:4,tv:3,h:216}}},
  {i:'🏊',l:'Đứng dưới thác luyện thể',t:'Nước đập vào lưng như búa tạ. Ngươi nghiến răng chịu đựng ba ngày ba đêm, da thịt tím bầm rồi lại lành.',e:{hp:'-15%',hpP:5}},
  {i:'🚶',l:'Ngắm một lúc rồi đi',t:'Cảnh đẹp, nhưng đường còn dài.',e:{tamma:-3}}
 ]});

ev({id:'bia_co',n:'Bia đá cổ',tg:['phe','nui','hoang','thien'],w:2,
 t:['Một tấm bia đá cao ba trượng, chữ khắc như rồng bay phượng múa. Nhìn lâu, ngươi thấy chữ như đang chuyển động.',
    'Giữa đống đổ nát có tấm bia gãy. Nửa trên đã mất, nửa dưới còn mấy hàng chữ cổ, nét nào cũng sâu như kiếm khắc.'],
 c:[
  {i:'👁️',l:'Tham ngộ',chk:['ngo',11],ok:{t:'Chữ trên bia hóa thành kiếm, thành lửa, thành nước, rồi tụ lại trong đầu ngươi thành một môn pháp thuật.',e:{dao:2,skill:1,lore:'doan_thien'}},no:{t:'Chữ trên bia đâm vào thức hải như kim. Ngươi ôm đầu lùi lại, mũi chảy máu.',e:{hp:'-10%',tamma:3}}},
  {i:'📜',l:'Chép lại để bán',t:'Mất ba ngày mới chép xong. Ít ra cũng có thứ để bán cho đám thư sinh hiếu kỳ.',e:{st:18,h:36}},
  {i:'🔨',l:'Đập bia lấy linh thạch bên trong',t:'Bia vỡ. Trong lõi đá quả có linh thạch, nhưng ngươi có cảm giác vừa làm một chuyện không nên làm.',e:{st:35,karma:-4}}
 ]});

ev({id:'ao_tran',n:'Ảo trận',tg:['rung','phe','dong','nui','ma'],w:2,
 t:['Sương mù dâng lên. Khi tan đi, ngươi thấy mình đứng giữa sân nhà cũ ở {$que}. Có tiếng gọi vào ăn cơm.',
    'Bước thêm một bước, cảnh vật đổi khác. Ngươi đứng trên đài cao, bên dưới hàng vạn người quỳ lạy, gọi ngươi là Tiên Tôn.',
    'Đi mãi vẫn quay về gốc cây ấy. Lần thứ ba, ngươi khắc một dấu lên thân cây. Lần thứ tư, dấu khắc đã ở đó trước khi ngươi khắc.'],
 c:[
  {i:'🪷',l:'Giữ vững bản tâm',chk:['tam',10],ok:{t:'Ngươi nhắm mắt, niệm một câu tĩnh tâm. Ảo cảnh vỡ như gương. Trận nhãn hiện ra, bên trong còn sót linh thạch.',e:{st:20,tam:1,tv:5}},no:{t:'Ngươi chìm trong ảo cảnh mấy tháng trời. Khi tỉnh lại, người gầy rộc, tóc dài chấm vai.',e:{h:432,tamma:6}}},
  {i:'💥',l:'Dùng sức phá trận',cost:{mp:'40%'},t:'Ngươi tung toàn lực vào hư không. Ảo trận nứt toác, nhưng phản chấn khiến ngươi hộc máu.',e:{hp:'-15%',tv:4}},
  {i:'😌',l:'Ở lại thêm chút nữa',t:'Biết là giả, ngươi vẫn ngồi xuống ăn hết bát cơm. Rời đi, ngươi khóc như đứa trẻ. Lòng nhẹ đi nhiều.',e:{tamma:-10,h:72}}
 ]});

ev({id:'linh_tuyen',n:'Linh tuyền',tg:['nui','rung','dong','song'],w:2,
 t:['Giữa khe núi có một hồ nước nhỏ, mặt nước bốc hơi trắng, linh khí nồng đến mức đọng thành giọt.','{$canh} Ngươi tìm thấy một dòng suối nước ấm, đáy suối lấp lánh như rải ngọc vụn.'],
 c:[
  {i:'🛁',l:'Ngâm mình',t:'Nước thấm vào từng lỗ chân lông. Xương cốt kêu răng rắc, rồi nhẹ bẫng.',e:{dao:1,hp:'100%',hpP:4}},
  {i:'🫗',l:'Uống vài ngụm',t:'Nước ngọt lịm, đi tới đâu mát tới đó. Linh lực trong người như được rửa sạch.',e:{mp:'100%',mpP:5}},
  {i:'🏺',l:'Đóng vào bình',t:'Ngươi đổ đầy hai bình. Thứ nước này luyện đan rất tốt.',e:{pill:['hoixuan','tukhi']}}
 ]});

ev({id:'do_thach',n:'Đổ thạch',tg:['thanh','tran'],r:[0,1,2],w:2,v:()=>({a:npc('thuong')}),
 t:['Phường đổ thạch đông nghịt. Những khối đá thô xếp thành đống, mở ra có thể là linh ngọc, cũng có thể chỉ là đá.','“Một đao nghèo, một đao giàu!” {$a.ten} hét lớn, tay vỗ lên khối đá đen sì.'],
 c:[
  {i:'🪨',l:'Mua một khối nhỏ',cost:{st:15},o:[{w:3,t:'Đá. Chỉ là đá.'},{w:2,t:'Có một mạch linh thạch nhỏ, đủ hoàn vốn và lời chút ít.',e:{st:25}},{w:1,t:'Lớp vỏ vỡ, ánh xanh tràn ra. Cả phường lặng đi. Một khối linh tủy!',e:{st:60,van:1}}]},
  {i:'💰',l:'Chơi lớn',cost:{st:40},o:[{w:3,t:'Đá. Ngươi nghe tiếng ai đó cười khúc khích sau lưng.'},{w:2,t:'Một mạch linh thạch dày bằng ngón tay. Đám đông xuýt xoa.',e:{st:80}},{w:1,t:'Bên trong là một món pháp bảo bị phong ấn trong đá!',e:{relic:1}}]},
  {i:'👁️',l:'Dùng thần thức dò trước',chk:['ngo',12],ok:{t:'Thần thức len qua lớp vỏ đá. Trong một khối xấu xí ở góc, một mạch linh ngọc đang ẩn hiện. Chủ sạp không hay biết, chỉ ra giá như đá thường.',
    c:[{i:'💰',l:'Mua khối đá ấy',cost:{st:20},t:'Ngươi trả tiền, ôm khối đá ra một góc. Đao bổ xuống, ánh xanh tràn ra, cả phường im bặt.',e:{st:55}},
       {i:'🚶',l:'Thôi, không mua',t:'Ngươi lặng lẽ đi ra. Khối đá vẫn nằm đó, chờ một kẻ có duyên khác.'}]},
   no:{t:'Thần thức vừa chạm vào đã bị cấm chế đánh bật. Bị phát hiện dò trộm, ngươi bị mời ra ngoài.',e:{tamma:2}}}
 ]});

ev({id:'hac_diem',n:'Quán trọ đen',tg:['tran','rung','song','hoang'],w:2,
 t:['Quán trọ ven đường đèn đóm lờ mờ. Bà chủ cười rất tươi, rót rượu rất đầy.','Trời tối, chỉ có một khách điếm giữa rừng. Tiểu nhị nhìn túi trữ vật của ngươi lâu hơn nhìn mặt ngươi.'],
 c:[
  {i:'🍶',l:'Uống rượu, nghỉ đêm',chk:['ngo',10],
    ok:{t:'Rượu có mùi lạ. Ngươi vờ uống, đợi nửa đêm cả bọn mò vào thì…',fight:{k:'sontac',n:'Chủ quán đen'},win:{t:'Hắc điếm bị dẹp. Dưới hầm có cả đống đồ của khách bị hại.',e:{st:30,karma:4,pill:1}}},
    no:{t:'Tỉnh dậy, ngươi nằm ngoài bãi tha ma, túi trữ vật nhẹ bẫng, đầu đau như búa bổ.',e:{st:'-30%',hp:'-10%'}}},
  {i:'🗡️',l:'Ra tay trước',fight:{k:'sontac',n:'Chủ quán đen'},win:{t:'Ngươi đoán không sai. Dưới hầm toàn xương người. Ngươi phóng hỏa đốt quán, mang theo số tiền chúng cướp được.',e:{st:28,karma:3}}},
  {i:'🌙',l:'Ngủ ngoài trời',t:'Ngươi gác kiếm ngủ dưới gốc cây. Nửa đêm nghe tiếng bước chân lảng vảng, rồi xa dần.',e:{hp:'15%'}}
 ]});

ev({id:'tra_lau',n:'Trà lâu',tg:['tran','thanh'],w:3,
 t:['Trà lâu chật kín người. Tiên sinh kể chuyện vỗ thước gỗ xuống bàn: “Hôm nay, ta kể chuyện Ngũ Tổ chém Yêu Hoàng!”','Ngồi góc trà lâu, ngươi nghe đủ chuyện thiên hạ. Người ta bàn về {$rv}, về {$sect}, về giá linh thạch lên xuống.'],
 c:[
  {i:'👂',l:'Ngồi nghe',t:'Kể tới chỗ máu Yêu Hoàng bắn lên cửa trời, cả trà lâu nín thở. Câu chuyện ấy ai cũng thuộc, mà vẫn nghe.',e:{lore:'ngu_to',rumor:2}},
  {i:'📢',l:'Lên kể chuyện kiếm tiền',chk:['ngo',8],ok:{t:'Ngươi kể chuyện mình đánh nhau với yêu thú, thêm thắt chút ít. Khách vỗ tay, quăng tiền lên bục.',e:{st:15}},no:{t:'Ngươi kể lộn đầu lộn đuôi, khách ném vỏ lạc lên bục. Ba tối được đúng ít tiền lẻ.',e:{st:3}}},
  {i:'🍵',l:'Uống trà rồi đi',t:'Trà ngon. Vậy là đủ.',e:{hp:'10%',tamma:-2}}
 ]});

ev({id:'cao_thi',n:'Cáo thị truy nã',tg:['tran','thanh'],w:2,v:()=>({a:npc('ma')}),
 t:['Trên tường thành dán cáo thị: truy nã {$a.ten}, kẻ đã giết cả nhà một vị huyện lệnh. Thưởng hậu.','Bảng cáo thị ở cổng trấn có tờ mới: {$a.ten}, ma tu, đang lẩn trốn quanh {$pl}. Bên dưới có hàng chữ đỏ: “Sống chết không cần.”'],
 c:[
  {i:'📜',l:'Bóc cáo thị',fight:{k:'matu',n:'{$a.ten}',m:1.15},win:{t:'Ngươi mang đầu {$a.ten} về phủ nha. Quan phủ thưởng linh thạch theo lệ, dân chúng đốt pháo mừng.',e:{st:45,karma:5,tv:4}}},
  {i:'🚶',l:'Không phải việc của ta',t:'Ngươi đi qua. Phía sau có người thở dài: “Lại một tu sĩ chẳng quan tâm.”'}
 ]});

ev({id:'xem_tuong',n:'Thầy bói',tg:['tran','thanh','song'],r:[0,1,2,3],w:2,v:()=>({a:npc('dao')}),
 t:['Một lão đạo ngồi dưới lá phướn ghi bốn chữ “Thiết khẩu trực đoán”. Thấy ngươi, lão nheo mắt: “{$a.goi}, mệnh có kiếp nạn đấy.”','Bàn bói dựng bên đường. Thầy bói là {$a.ten}, {$a.look}. Lão gọi giật ngươi lại: “Đứng đó. Ấn đường của ngươi có khí đen.”'],
 c:[
  {i:'🪙',l:'Trả tiền xem quẻ',cost:{st:10},o:[
    {w:2,t:'Lão gieo ba đồng xu, nhìn rất lâu rồi nói: “Đi phương nào cũng gặp quý nhân, chỉ cần đừng tham.” Lòng ngươi bỗng nhẹ nhõm.',e:{van:2}},
    {w:2,t:'Lão rùng mình, đẩy tiền lại: “Quẻ này ta không dám nói. Ngươi tự bảo trọng.”',e:{st:10,tamma:2}},
    {w:1,t:'Lão phán ngươi sống không quá ba mươi. Ngươi cười. Lão không cười.',e:{tam:1}}]},
  {i:'🙅',l:'Vạch mặt kẻ lừa đảo',chk:['ngo',9],ok:{t:'Ngươi chỉ ra ba chỗ sai trong lời lão. Lão đạo nhìn ngươi một lúc lâu, rồi cười ha hả, tặng ngươi một lá bùa.',e:{pill:'kimcang'}},no:{t:'Lão cười nhạt, nói đúng ba chuyện cũ của ngươi mà ngươi chưa từng kể với ai. Ngươi lạnh gáy.',e:{tamma:3}}}
 ]});

ev({id:'an_may',n:'Kẻ ăn mày lạ',tg:['tran','thanh','song'],w:2,v:()=>({a:npc('gia')}),
 t:['Một lão ăn mày {$a.look} chìa cái bát mẻ về phía ngươi. “{$a.goi}, cho xin miếng ăn.”','Ở góc phố, một kẻ ăn mày nằm ngáy pho pho, bên cạnh là bầu rượu rỗng. Thấy ngươi, {$a.hn} mở một mắt: “Có rượu không?”'],
 c:[
  {i:'🍚',l:'Cho tiền mua đồ ăn',cost:{st:8},o:[
    {w:2,t:'{$a.hn} ăn ngấu nghiến, xong chùi tay vào áo, móc từ trong ngực ra một cuốn sách nhàu nát: “Giấy lau tay, cho ngươi.” Ngươi lật vài trang, tay run lên.',e:{skill:1,karma:3}},
    {w:3,t:'{$a.hn} cảm tạ rối rít, chúc ngươi sống lâu. Chỉ vậy thôi. Nhưng ngươi thấy vui.',e:{karma:4,van:1}}]},
  {i:'🍶',l:'Mời rượu, ngồi nói chuyện',cost:{st:12},t:'Hai người uống tới khuya. {$a.hn} kể chuyện trên trời dưới đất, có mấy câu nghe như khẩu quyết. Sáng ra, {$a.hn} biến mất.',e:{tv:8,ngo:1}},
  {i:'🙅',l:'Lắc đầu đi qua',t:'{$a.hn} nhìn theo, khẽ thở dài: “Lại một kẻ không có duyên.”'}
 ]});

ev({id:'tre_ban_hoa',n:'Đứa trẻ bán hoa',tg:['tran','thanh'],w:2,v:()=>({a:npc('hai')}),
 t:['Một đứa trẻ {$a.look} đứng nép bên đường bán từng bó hoa dại. “Mua hoa đi {$a.goi}, mẹ cháu ốm nặng lắm…”','{$a.ten}, một đứa trẻ {$a.look}, quỳ trước tiệm thuốc, trán dập xuống đất đã rớm máu. Chủ tiệm đứng khoanh tay.'],
 c:[
  {i:'💎',l:'Cho linh thạch',cost:{st:12},t:'Ngươi đặt linh thạch vào tay đứa trẻ. {$a.hn} sững sờ, rồi òa khóc, rồi chạy biến đi. Ngươi không biết nó có mua được thuốc không.',e:{karma:6,an:['a','cho tiền mua thuốc']}},
  {i:'🌿',l:'Theo về xem bệnh',cost:{mp:'30%'},t:'Người bệnh bị âm khí xâm thể. Ngươi truyền linh lực đẩy âm khí ra ngoài. Người đỡ dần, cả nhà quỳ lạy ngươi.',e:{karma:8,tv:3,an:['a','chữa bệnh cho người nhà']}},
  {i:'🚶',l:'Thế gian khổ nhiều, giúp không xuể',t:'Ngươi bước đi. Tiếng rao non nớt đuổi theo mãi một đoạn đường.',e:{tamma:2}}
 ]});

ev({id:'kiem_khach',n:'Kiếm khách say',tg:['tran','thanh'],w:2,v:()=>({a:npc('nam')}),
 t:['Trên lan can tửu lâu, một kiếm khách {$a.look} đang ngửa cổ tu rượu. Thấy ngươi đứng nhìn, hắn cười lớn: “Đấu một trận không?”','Giữa cầu đá có kẻ say nằm chắn ngang, kiếm đặt trên bụng. Hắn không nhúc nhích: “Muốn qua cầu, đỡ ta ba kiếm.”'],
 c:[
  {i:'⚔️',l:'Nhận lời',fight:{k:'kiemtu',n:'{$a.ten}',spar:1},win:{t:'Hắn tỉnh rượu hẳn, chắp tay: “Hay! Hay!” Rồi tặng ngươi nửa bầu rượu và một câu kiếm quyết.',e:{tv:6,atkP:3}},lose:{t:'Ba kiếm. Ngươi đỡ được hai. Hắn thu kiếm, vỗ vai ngươi: “Không tệ.”',e:{tv:4}}},
  {i:'🍶',l:'Uống cùng hắn',cost:{st:8},t:'Hai người uống từ trưa tới tối. Hắn kể về một người con gái đã chết, về thanh kiếm hắn chưa từng rút khỏi vỏ. Lúc chia tay, hắn cười rất buồn.',e:{tam:2,an:['a','uống rượu nghe chuyện']}},
  {i:'🚶',l:'Đi đường khác',t:'Kẻ say rượu, nói chuyện với hắn làm gì.'}
 ]});

ev({id:'hoa_duyen',n:'Tăng nhân hóa duyên',tg:['tran','thanh','song','nui'],w:2,v:()=>({a:npc('tang')}),
 t:['Một vị hòa thượng {$a.look} đứng trước mặt ngươi, chắp tay: “A di đà Phật. Thí chủ có thể bố thí cho bần tăng một bữa chay?”','Tiếng mõ lốc cốc. {$a.ten}, vị tăng khổ hạnh, đi chân đất qua cổng trấn. Đi tới đâu, chó dữ cũng im.'],
 c:[
  {i:'🙏',l:'Bố thí',cost:{st:6},t:'Vị tăng nhận, rồi đặt tay lên đỉnh đầu ngươi. Một luồng ấm áp lan xuống, những ý nghĩ đen tối trong lòng tan như sương.',e:{tamma:-12,karma:3}},
  {i:'💬',l:'Hỏi đạo',chk:['ngo',10],ok:{t:'“Thí chủ hỏi trường sinh để làm gì?” Ngươi á khẩu. Vị tăng cười, đọc cho ngươi một đoạn kinh. Về sau ngươi mới hiểu, đó là tâm pháp.',e:{tam:3,tv:5}},no:{t:'Hai bên nói chuyện như gà với vịt. Vị tăng chắp tay cáo từ.'}},
  {i:'⚔️',l:'Thử bản lĩnh vị tăng',fight:{k:'votang',n:'{$a.ten}',spar:1},win:{t:'Vị tăng thu tay, mỉm cười: “Thí chủ võ công cao, chỉ tiếc tâm còn nóng.”',e:{tv:6,karma:-2}},lose:{t:'“Thí chủ, nóng giận hại thân.” Vị tăng đỡ ngươi dậy, phủi bụi cho ngươi.',e:{tamma:-5,tv:3}}}
 ]});

ev({id:'ho_ly',n:'Thiếu nữ trong rừng',tg:['rung','tran','phe'],r:[0,1,2],w:2,v:()=>({a:npc('nu')}),
 t:['Giữa rừng sâu lại có một thiếu nữ ngồi khóc bên suối. Nàng {$a.look}, nói bị lạc đường, xin ngươi đưa về nhà.','Đêm mưa, có người gõ cửa miếu nơi ngươi trú. Một nữ tử ướt sũng, cười e lệ: “Cho tiểu nữ trú nhờ một đêm được không?”'],
 c:[
  {i:'🏮',l:'Đưa nàng về',chk:['ngo',10],ok:{t:'Đi một đoạn, ngươi để ý thấy chân nàng không chạm đất. Ngươi dừng lại. Nàng cũng dừng lại, cười: “Đạo hữu tinh mắt thật.” Rồi hóa thành hồ ly, để lại một món quà.',e:{relic:0,tv:4}},no:{t:'Nàng dẫn ngươi vào một tòa nhà lộng lẫy. Sáng ra ngươi tỉnh dậy giữa bãi tha ma, người mệt lả như bị rút hết sinh khí.',e:{hp:'-25%',tv:-6}}},
  {i:'👁️',l:'Vạch mặt yêu tinh',fight:{k:'holy',n:'Hồ yêu {$a.ten}'},win:{t:'Hồ yêu bỏ chạy, để lại cái đuôi gãy và một viên yêu đan nhỏ.',e:{tv:5,st:10}}},
  {i:'🙈',l:'Giả vờ không thấy',t:'Ngươi quay lưng đi. Sau lưng có tiếng cười khúc khích, như tiếng chuông gió.'}
 ]});

ev({id:'co_mo',n:'Cổ mộ',tg:['phe','nui','hoang','dong'],w:2,v:()=>({}),
 t:['Mưa lở núi, để lộ cửa một ngôi cổ mộ. Trên cửa đá khắc hình thú đầu người, mắt khảm hai viên hồng ngọc.','Dưới chân ngươi có tiếng rỗng. Đào xuống ba thước, lộ ra bậc đá dẫn sâu vào lòng đất, hơi lạnh phả lên tận mặt.'],
 c:[
  {i:'🔦',l:'Vào trong',t:'Hành lang dài hun hút. Đi được trăm bước, trước mặt có ba cánh cửa: một cửa vẽ rồng, một cửa vẽ hổ, một cửa không vẽ gì.',c:[
    {i:'🐉',l:'Cửa rồng',t:'Bên trong là kho báu, nhưng cũng là chỗ của thủ mộ khôi lỗi.',fight:{k:'khoiloi',m:1.1},win:{t:'Khôi lỗi đổ sập. Kho báu là của ngươi.',e:{relic:1,st:25}}},
    {i:'🐯',l:'Cửa hổ',chk:['tp',11],ok:{t:'Tên tẩm độc bắn ra từ bốn phía. Ngươi lăn qua làn mưa tên. Cuối phòng là một hộp gỗ, bên trong có bí tịch.',e:{skill:1}},no:{t:'Ba mũi tên găm vào vai. Ngươi lết ra, chỉ kịp vơ được ít linh thạch.',e:{hp:'-30%',st:15}}},
    {i:'⬜',l:'Cửa trơn',t:'Căn phòng trống, chỉ có một bộ xương ngồi xếp bằng. Trên vách khắc mấy dòng di ngôn: kẻ đến sau, chớ tham.',e:{tam:2,tv:8,lore:'thien_dao'}}]},
  {i:'🪨',l:'Lấp cửa mộ lại',t:'Người chết cần yên nghỉ. Ngươi lăn tảng đá chặn cửa, vái ba vái.',e:{karma:3,van:1}}
 ]});

ev({id:'dong_phu_cu',n:'Động phủ tiền bối',tg:['nui','dong','rung'],w:2,
 t:['Sau thác nước có một động phủ bị bỏ hoang. Cấm chế ở cửa đã yếu, chỉ còn lớp màng mờ như bong bóng.','Ngươi phát hiện một động phủ ẩn sau dây leo. Trên cửa treo tấm biển gỗ: “{$who} bế quan, kẻ tự tiện vào, chết.” Chữ đã mốc meo.'],
 c:[
  {i:'✋',l:'Phá cấm chế',chk:['ngo',10],ok:{t:'Cấm chế tan. Bàn ghế đá phủ bụi dày, trên bồ đoàn có một túi trữ vật.',e:{dao:2,relic:0,pill:1}},no:{t:'Cấm chế phản phệ, một đạo kiếm quang bắn ra sượt qua vai ngươi.',e:{hp:'-20%'}}},
  {i:'🙇',l:'Vái ba vái rồi mới vào',o:[{w:2,t:'Cấm chế tự tan như đáp lễ. Trên bàn đá có một ngọc giản, bên trong là truyền thừa của chủ nhân.',e:{skill:1,karma:2}},{w:1,t:'Không có chuyện gì xảy ra. Có lẽ chủ nhân đã đi quá lâu. Ngươi vào lấy vài thứ còn dùng được.',e:{st:20}}]},
  {i:'🚶',l:'Rời đi',t:'Động phủ của người khác, ngươi không đụng vào.'}
 ]});

ev({id:'bi_canh',src:'ent:di',n:'Bí cảnh mở cửa',tg:['*'],once:1,w:2,
 t:['Trên trời bỗng mở ra một khe nứt ngũ sắc. Tu sĩ khắp nơi đổ về: bí cảnh trăm năm mới mở một lần!','Mặt hồ phẳng lặng bỗng xoáy thành vòng tròn, ánh sáng từ đáy hồ chiếu lên. Lối vào bí cảnh đã mở.'],
 c:[
  {i:'🌀',l:'Xông vào',o:[
    {w:2,t:'Một con thủ hộ thú chặn ngay lối vào.',fight:{elite:1},win:{t:'Thủ hộ thú gục xuống. Phía sau là một bệ đá, trên đó có bảo vật đang phát sáng.',e:{relic:1}}},
    {w:2,t:'Bí cảnh là một vườn thuốc bỏ hoang. Ngươi hái mỏi tay.',e:{pill:['tinhnguyen','hoixuan','taytuy'],h:144}},
    {w:1,t:'Bí cảnh sụp đổ khi ngươi mới vào được nửa đường. Ngươi chạy thục mạng ra ngoài, chỉ kịp vơ lấy một thứ.',e:{relic:0,hp:'-20%'}}]},
  {i:'⏳',l:'Chờ ở cửa, cướp kẻ đi ra',chk:['tp',11],ok:{t:'Mấy kẻ lảo đảo đi ra, mình đầy thương tích. Ngươi ra tay nhanh gọn.',e:{st:40,karma:-6}},no:{t:'Kẻ đi ra đầu tiên lại là kẻ mạnh nhất.',fight:{k:'tantu',elite:1},win:{t:'Hắn gục. Túi trữ vật của hắn nặng trịch.',e:{st:30,karma:-3}}}},
  {i:'🚶',l:'Không tham gia',t:'Nơi nhiều người tranh, thường lắm kẻ chết. Ngươi đi tiếp.'}
 ]});

ev({id:'sao_roi',src:'ent:di',n:'Sao rơi',tg:['nui','hoang','rung','bien','thien'],w:1,
 t:['Đêm qua có sao băng rơi xuống phía tây, đất rung ba lần. Sáng nay khói vẫn còn bốc lên.','Một quả cầu lửa vạch ngang trời rồi đâm xuống thung lũng gần đó. Tiếng nổ làm chim chóc bay rợp trời.'],
 c:[
  {i:'🔥',l:'Tới xem',o:[
    {w:2,t:'Giữa hố sâu là một khối sắt đỏ rực, tỏa ra kiếm khí lạnh buốt.',e:{relic:'tinhthiet'}},
    {w:2,t:'Ngươi tới sau. Đã có kẻ đứng giữa hố.',fight:{k:'tantu'},win:{t:'Kẻ kia bỏ chạy. Khối sắt sao vẫn nằm đó, còn nóng hổi.',e:{relic:'tinhthiet'}}},
    {w:1,t:'Thứ rơi xuống không phải sắt. Nó đang cử động.',fight:{k:'tinhthu',m:1.15},win:{t:'Tinh thú tan thành bụi sao. Trong lòng bàn tay ngươi còn đọng lại mấy hạt sáng.',e:{tv:10,st:25}}}]},
  {i:'🙅',l:'Kệ nó',t:'Trời rơi xuống thứ gì, kệ trời.'}
 ]});

ev({id:'loi_moc',n:'Cây bị sét đánh',tg:['rung','nui'],w:1,
 t:['Cây tùng cổ thụ trên đỉnh đồi bị sét đánh toạc làm đôi, lõi cây đen bóng, vẫn còn tia điện nhảy lách tách.'],
 c:[
  {i:'🪓',l:'Lấy lõi gỗ',o:[{w:2,t:'Ngươi bị giật tê dại cả người, nhưng lấy được.',e:{hp:'-15%',relic:'loimoc'}},{w:1,t:'Lõi gỗ tan thành tro ngay khi chạm tay. Chỉ còn lại cảm giác tê rần ở đầu ngón.',e:{mpP:3}}]},
  {i:'🧘',l:'Ngồi dưới gốc cảm ngộ lôi ý',chk:['ngo',11],ok:{t:'Trong đầu ngươi vang lên tiếng sấm. Khi tĩnh lại, lòng bàn tay đã có thể tóe ra tia điện.',e:{tv:8,skill:'chuongloi'}},no:{t:'Tia điện còn sót lại chui vào kinh mạch. Ngươi giật nảy, tóc dựng đứng cả ngày.',e:{hp:'-10%'}}}
 ]});

ev({id:'bi_cuop',src:'road',n:'Cướp đường',tg:['rung','nui','hoang','song','tran'],w:2,v:()=>({a:npc('nam')}),
 t:['“Núi này ta mở, cây này ta trồng…” Một đám sơn tặc nhảy ra chặn đường, kẻ cầm đầu {$a.look}.','Dây thừng bật lên từ mặt đất, suýt quật ngã ngươi. Mấy gã đàn ông mặt mũi bặm trợn bước ra từ hai bên đường.'],
 c:[
  {i:'⚔️',l:'Đánh',fight:{k:'sontac',n:'{$a.ten}'},win:{t:'Bọn cướp chạy tán loạn, bỏ lại cả của cướp được.',e:{st:20,karma:2}}},
  {i:'💎',l:'Nộp tiền mãi lộ',cost:{st:12},t:'Bọn chúng cười hô hố, nhường đường. Ngươi nuốt cục tức xuống bụng.',e:{tamma:3}},
  {i:'😤',l:'Tỏa uy áp dọa chúng',chk:['tam',9],ok:{t:'Ngươi chỉ hừ một tiếng. Cả bọn quỳ rạp, dập đầu xin tha, còn dâng cả của cướp được.',e:{st:15}},no:{t:'Uy áp của ngươi như gió thoảng. Cả bọn cười rồ lên rồi xông vào.',fight:{k:'sontac',n:'{$a.ten}'},win:{t:'Lần sau chúng sẽ biết sợ.',e:{st:12}}}}
 ]});

ev({id:'lo_dan_no',n:'Lò đan nổ',tg:['tran','thanh','tong','nui'],w:2,v:()=>({a:npc('tre')}),
 t:['Một tiếng nổ lớn. Khói đen bốc lên từ căn nhà gỗ ven đường. {$a.ten} chạy ra, mặt đen thui, tóc dựng đứng: “Lò… lò của ta!”','Mùi khét lẹt bay khắp phố. Một đan sư trẻ ngồi bệt giữa đống đổ nát, ôm cái lò đan nứt đôi mà khóc.'],
 c:[
  {i:'🧯',l:'Giúp dập lửa',t:'Lửa tắt. {$a.ten} cảm kích, tặng ngươi mấy viên đan còn sót lại sau vụ nổ.',e:{pill:['hoixuan','tukhi'],karma:3,an:['a','giúp dập lửa lò đan']}},
  {i:'🔍',l:'Nhặt đan dược văng ra',chk:['tp',9],ok:{t:'Ngươi nhanh tay vơ được mấy viên lăn lóc ngoài đường.',e:{pill:[1,1],karma:-2}},no:{t:'Một viên đan cháy dở nổ ngay trong tay ngươi.',e:{hp:'-15%'}}},
  {i:'🗨️',l:'Chỉ ra chỗ sai trong phối dược',chk:['ngo',11],ok:{t:'{$a.ten} sững người, rồi vỗ đùi: “Đúng rồi! Phải cho Huyết Linh Chi vào sau Cửu Diệp Thảo!” Lần luyện sau thành công, {$a.hn} chia cho ngươi một nửa.',e:{pill:'taytuy',an:['a','chỉ cách luyện đan']}},no:{t:'{$a.hn} nhìn ngươi như nhìn kẻ ngốc.'}}
 ]});

ev({id:'hon_phien',n:'Hồn phiên vô chủ',tg:['phe','hoang','ma','dong'],once:1,w:1,
 t:['Giữa bãi chiến trường cũ cắm một lá cờ đen, gió không thổi mà vẫn bay phần phật. Trên mặt cờ thêu trăm khuôn mặt người, mặt nào cũng đang nhìn ngươi.','Ngươi nghe tiếng khóc ri rỉ. Lần theo, chỉ thấy một lá hồn phiên cắm trên mỏm đá, quanh đó cỏ không mọc nổi.'],
 c:[
  {i:'✊',l:'Nhổ lấy',t:'Cán cờ lạnh như băng. Tiếng khóc im bặt, như chờ chủ nhân mới ra lệnh.',e:{relic:'honphien',karma:-8,tamma:8}},
  {i:'🔥',l:'Thiêu hủy, siêu độ vong hồn',fight:{k:'amhon',m:1.1},win:{t:'Lá cờ cháy rụi. Trăm luồng khói trắng bay lên, khẽ cúi đầu với ngươi rồi tan vào trời.',e:{karma:10,tv:6,tam:2}}},
  {i:'🚶',l:'Tránh xa',t:'Thứ này không nên đụng vào.'}
 ]});

ev({id:'nhan_cu',n:'Chiếc nhẫn cũ',tg:['*'],r:[0,1],once:1,w:1,
 t:['Ở sạp đồ cũ có một chiếc nhẫn sắt đen sì, giá chỉ ba đồng. Lúc ngươi chạm vào, nó khẽ ấm lên.','Đêm ấy, chiếc nhẫn sắt nhặt được ở bờ sông bỗng phát sáng mờ mờ. Có giọng ai khàn khàn vang lên trong đầu: “Ngủ lâu quá…”'],
 c:[
  {i:'💍',l:'Giữ lấy',t:'Ngươi đeo nhẫn vào tay. Từ đó, những đêm tu luyện, ngươi luôn có cảm giác có người nhìn qua vai mình, thỉnh thoảng hừ một tiếng khi ngươi vận khí sai.',e:{relic:'nhancu',flag:'nhancu'}},
  {i:'🗑️',l:'Vứt đi',t:'Đồ cũ thì có gì tốt. Ngươi ném nó xuống sông. Mặt nước gợn lên một vòng, rồi thôi.'}
 ]});
ev({id:'nhan_tinh',n:'Hồn trong nhẫn',spec:1,once:1,cond:r=>r.flags.nhancu&&r.region>=1&&r.relics.some(x=>x.u==='nhancu'),
 t:['Chiếc nhẫn cũ nóng rực lên. Lần này giọng nói ấy rõ ràng: “{$p.tt}, ta là {$lao}, ba nghìn năm trước từng đứng đầu một phương. Giờ chỉ còn tàn hồn này. Ngươi giúp ta một việc, ta giúp ngươi một đời.”'],
 c:[
  {i:'🤝',l:'Đồng ý giúp',o:[
    {w:2,t:'Lão chỉ ngươi đến một mộ cổ, lấy lại thứ lão giấu năm xưa. Đổi lại, lão truyền cho ngươi tâm pháp cả đời.',e:{skill:2,tv:12}},
    {w:1,t:'“Việc ấy” là thân thể của ngươi. Thần hồn lão tràn ra từ chiếc nhẫn, muốn đoạt xá!',fight:{k:'amhon',n:'{$lao}',m:1.3,elite:1},win:{t:'Tàn hồn tan biến. Chiếc nhẫn vỡ đôi, nhưng ký ức tu luyện của lão đọng lại trong đầu ngươi.',e:{tv:18,ngo:3,rmRelic:'nhancu'}}}]},
  {i:'🔥',l:'Luyện hóa tàn hồn',chk:['tam',12],ok:{t:'Lão gào thét rồi im bặt. Sức mạnh ba nghìn năm chảy vào kinh mạch ngươi, lạnh và đắng.',e:{tv:18,tamma:8,karma:-6,rmRelic:'nhancu'}},no:{t:'Tàn hồn phản kích, suýt nữa chiếm luôn thức hải của ngươi.',e:{hp:'-30%',tamma:6}}},
  {i:'🙏',l:'Mời lão đi đầu thai',t:'Lão im lặng rất lâu. “Ba nghìn năm… cũng mệt rồi.” Ánh sáng tắt. Chiếc nhẫn trở lại là sắt vụn, nhưng ngươi giữ nó lại.',e:{karma:8,van:3,lore:'luan_hoi'}}
 ]});

ev({id:'thu_khan',n:'Thư khẩn',tg:['tran','thanh'],w:1,v:()=>({a:npc('pham')}),
 t:['Trạm dịch hỗn loạn. Ngựa trạm chết dọc đường, mà bức thư khẩn về phủ thành phải tới trong ba ngày. Dịch thừa {$a.ten} vò đầu bứt tai.'],
 c:[
  {i:'📨',l:'Nhận đưa thư',chk:['tp',8],ok:{t:'Ba ngày ba đêm không ngủ, tới cổng phủ thì hai bàn chân ngươi rộp cả. Thư tới kịp, quan phủ thưởng linh thạch theo lệ.',e:{st:30,karma:3}},no:{t:'Ngươi tới trễ nửa ngày. Quan phủ lắc đầu, chỉ thưởng chút ít.',e:{st:8}}},
  {i:'🚶',l:'Không rảnh',t:'Việc của phàm nhân, để phàm nhân lo.'}
 ]});

ev({id:'tho_san',n:'Thợ săn đặt bẫy',tg:['rung','nui'],w:2,v:()=>({a:npc('pham')}),
 t:['Ngươi suýt giẫm phải bẫy kẹp. Gần đó, thợ săn {$a.ten} đang kéo một con hươu sừng ngọc bị thương nặng.','Một thợ săn chặn ngươi lại: “Đừng đi lối đó, ta đặt bẫy yêu thú. Mà nếu {$a.goi} rảnh, giúp ta một tay?”'],
 c:[
  {i:'🤝',l:'Giúp săn yêu thú',fight:{k:'beast'},win:{t:'{$a.ten} chia cho ngươi một nửa da thịt và yêu đan, còn chỉ cho ngươi lối tắt qua núi.',e:{st:18}}},
  {i:'🦌',l:'Mua con hươu rồi thả',cost:{st:10},t:'Con hươu nhìn ngươi một cái rồi nhảy vào rừng. Sừng ngọc của nó lấp lánh như sao.',e:{karma:5,van:2}},
  {i:'🚶',l:'Đi tiếp',t:'Ngươi gật đầu chào rồi đi.'}
 ]});

ev({id:'chay_rung',n:'Rừng thuốc cháy',tg:['rung','nui'],w:1,v:()=>({a:npc('pham')}),
 t:['Khói đen bốc lên từ thung lũng. Cả một rừng thuốc đang cháy, tiếng người kêu cứu lẫn trong tiếng lửa reo.'],
 c:[
  {i:'💧',l:'Dập lửa cứu người',cost:{mp:'50%'},t:'Ngươi dốc hết linh lực gọi mưa, lửa tắt dần. Mấy người hái thuốc quỳ xuống lạy ngươi như lạy thần.',e:{karma:10,tv:4,an:['a','cứu khỏi đám cháy']}},
  {i:'🌿',l:'Tranh thủ hái linh dược',t:'Lửa lan nhanh, ngươi vơ vội được mấy gốc linh thảo quý. Tiếng kêu cứu sau lưng nhỏ dần.',e:{pill:['tinhnguyen','hoixuan'],karma:-5}},
  {i:'🔍',l:'Tìm kẻ phóng hỏa',fight:{k:'matu'},win:{t:'Kẻ phóng hỏa là ma tu cần tro linh thảo để luyện độc. Hắn không còn cơ hội luyện nữa.',e:{karma:6,st:20}}}
 ]});

ev({id:'khach_diem',n:'Khách điếm',tg:['tran','thanh','song'],w:3,v:()=>({a:npc('tre')}),
 t:['Khách điếm ở {$pl} đông đúc. Ngươi gọi một bình rượu, ngồi bên cửa sổ nhìn mưa.','Đêm ấy ngươi nghỉ ở khách điếm. Phòng bên có tiếng đàn, réo rắt đến tận canh ba.'],
 c:[
  {i:'🛏️',l:'Nghỉ ngơi',cost:{st:5},t:'Một giấc ngủ không mộng mị. Sáng ra, người nhẹ bẫng.',e:{hp:'60%',mp:'60%'}},
  {i:'🎶',l:'Sang làm quen người đánh đàn',o:[
    {w:2,t:'Người đánh đàn là {$a.ten}. Hai người nói chuyện tới sáng, hóa ra cùng có một giấc mơ thời thơ ấu.',e:{tam:2,an:['a','nghe đàn suốt đêm']}},
    {w:1,t:'Ngươi gõ cửa, tiếng đàn tắt. Phòng trống không, chỉ có cây đàn đứt dây và một mùi hương lạ.',e:{tamma:3,relic:0}}]},
  {i:'🍶',l:'Nghe ngóng tin tức',t:'Dưới nhà, mấy tay buôn đang bàn chuyện thiên hạ. Ngươi mời một bình rượu, nghe được không ít.',e:{rumor:2,st:-2}}
 ]});

ev({id:'co_tu',n:'Cổ tự hoang',tg:['phe','nui','rung','tran'],w:2,
 t:['Ngôi cổ tự bỏ hoang, tượng Phật sứt mũi nhìn xuống với nụ cười không đổi. Trời tối rồi, ngươi đành trú lại.','Chùa không còn sư, chỉ còn tiếng gió lùa qua khung cửa. Trên bàn thờ có ai mới thắp một nén nhang, khói còn nghi ngút.'],
 c:[
  {i:'🕯️',l:'Thắp nến, tụng kinh',t:'Đêm yên ả. Gần sáng ngươi nghe tiếng chuông, mà chùa không có chuông.',e:{dao:1,tamma:-8,tam:1}},
  {i:'🔦',l:'Khám phá hậu điện',o:[{w:1,t:'Trong bóng tối có thứ đang chờ ngươi.',fight:{k:'quy'},win:{t:'Âm vật tan biến. Dưới chỗ nó đứng có một hộp gỗ.',e:{relic:0}}},{w:2,t:'Dưới bệ tượng có một ngăn bí mật, bên trong là cuốn kinh chép tay.',e:{skill:1}}]},
  {i:'😴',l:'Ngủ một giấc',o:[{w:2,t:'Ngươi ngủ một mạch tới sáng.',e:{hp:'40%'}},{w:1,t:'Nửa đêm có kẻ tới trước chỗ ngươi nằm.',fight:{},win:{t:'Ngươi ngủ tiếp tới sáng, cạnh cái xác.',e:{hp:'20%'}}}]}
 ]});

ev({id:'son_mon',n:'Tông môn tuyển đồ',tg:['tong','tran','thanh','nui'],r:[0,1],once:1,w:3,cond:r=>!r.flags.tongmon,v:()=>({a:npc('tre')}),
 t:['{$sectC} mở sơn môn thu nhận đệ tử. Thiếu niên khắp nơi nô nức kéo về, xếp hàng dài dưới chân núi. Đệ tử canh cổng {$a.ten} mặt lạnh như tiền.','Cáo thị dán khắp thành trấn: {$sectC} tuyển đồ. Ba đường vào cửa: trắc linh thạch, vấn tâm lộ, hoặc dâng lễ làm tạp dịch.'],
 c:[
  {i:'💠',l:'Thi trắc linh thạch',chk:['root',0],ok:{t:'Viên trắc linh thạch sáng rực lên. {$a.ten} sững sờ, rồi cúi đầu: “Mời {$p.sd} vào.”',e:{relic:'lenhtong',flag:'tongmon',skill:1}},no:{t:'Viên đá chỉ lóe lên mờ mờ. {$a.ten} lắc đầu: “Linh căn thế này, tông ta không thu thẳng.”',e:{tamma:3}}},
  {i:'🪜',l:'Đi vấn tâm lộ',chk:['tam',11],ok:{t:'Ba nghìn bậc thang, mỗi bậc một ảo cảnh. Tới bậc cuối, ngươi chỉ còn lại chính mình. Trưởng lão vuốt râu gật đầu.',e:{relic:'lenhtong',flag:'tongmon',tam:2}},no:{t:'Tới bậc thứ chín trăm, ngươi gục xuống, mơ thấy nỗi sợ lớn nhất đời mình. Tỉnh dậy đã ở chân núi.',e:{tamma:5}}},
  {i:'🎁',l:'Dâng lễ làm tạp dịch',cost:{st:40},t:'Ngươi gánh nước bổ củi hai năm, rảnh thì lén nghe giảng đạo. Cuối cùng cũng được ghi tên vào sổ.',e:{relic:'lenhtong',flag:'tongmon',tv:12,h:1080}}
 ]});

ev({id:'dai_bi',n:'Tông môn đại bỉ',tg:['tong','thanh'],r:[0,1,2],w:2,
 t:['{$sect} mở kỳ đại bỉ: đệ tử lên lôi đài thi đấu, người thắng được vào Tàng Kinh Các chọn một môn công pháp.','Lôi đài dựng giữa quảng trường {$sect}. Khán đài chật kín, ai cũng muốn xem thiên kiêu năm nay là ai.'],
 c:[
  {i:'🥋',l:'Ghi danh',fight:{k:'detu',m:1.15,spar:1},win:{t:'Ngươi thắng liền ba trận, tiếng hò reo vang dội. Phần thưởng là một lượt vào Tàng Kinh Các.',e:{skill:2,st:20}},lose:{t:'Ngươi thua ở trận thứ hai. Nhưng một vị trưởng lão đã nhớ mặt ngươi.',e:{tv:5}}},
  {i:'👀',l:'Đứng xem học hỏi',t:'Mỗi trận đấu là một bài học. Ngươi ghi nhớ từng chiêu.',e:{tv:6}}
 ]});

ev({id:'dau_gia',src:'ent:dauGia',n:'Hội đấu giá',tg:['thanh'],r:[0,1,2,3],w:2,
 t:['Đại hội đấu giá của Vạn Bảo Thương Hội. Món cuối cùng được bưng ra, phủ khăn đỏ. Người dẫn chương trình mỉm cười: “{$dan}, giá khởi điểm…”','Ngươi chen được vào hội đấu giá ở {$pl}. Đèn lồng vạn ngọn, người tu tiên ngồi kín ba tầng lầu.'],
 c:[
  {i:'💎',l:'Ra giá món chót',cost:{st:55},t:'Tiếng búa gõ xuống. Món đồ là của ngươi. Mấy ánh mắt hằm hằm nhìn theo.',e:{pill:'@bt',lore:'van_bao'}},
  {i:'🏺',l:'Mua một món nhỏ hơn',cost:{st:30},t:'Một món pháp bảo không ai để ý. Ngươi mua với giá hời.',e:{relic:0}},
  {i:'👀',l:'Chỉ xem',t:'Xem người ta tranh nhau, ngươi hiểu ra giá trị thật của mọi thứ trên đời.',e:{rumor:1,lore:'van_bao'}}
 ]});

ev({id:'loi_dai',n:'Lôi đài',tg:['thanh','tran'],w:2,
 t:['Lôi đài dựng giữa quảng trường, ai thắng được ba trận liền thì nhận cả hũ linh thạch. Đám đông gào thét.'],
 c:[
  {i:'🥊',l:'Lên đài',fight:{k:'human',spar:1,m:1.05},win:{t:'Ngươi giơ hũ linh thạch lên cao. Đám đông gọi tên ngươi.',e:{st:35,van:1}},lose:{t:'Ngươi bị đánh văng khỏi đài. Có người huýt sáo chế giễu.',e:{tamma:2}}},
  {i:'🎰',l:'Đặt cược',cost:{st:15},o:[{t:'Ngươi thắng cược!',e:{st:32}},{t:'Ngươi thua. Đời là vậy.'}]},
  {i:'🚶',l:'Đi qua',t:'Tiếng hò reo nhỏ dần sau lưng.'}
 ]});

ev({id:'yeu_quai_lang',n:'Thôn bị yêu quấy',tg:['tran'],r:[0,1,2],w:2,v:()=>({a:npc('pham')}),
 t:['Cả thôn treo bùa đỏ khắp cửa. {$a.ten} quỳ xuống trước mặt ngươi: “Tiên sư cứu mạng! Đêm nào cũng có người mất tích, gia súc chết khô.”','Thôn {$pl} vắng tanh giữa ban ngày. Một bà lão lén hé cửa, thì thào: “Đi đi, đêm nay nó lại tới.”'],
 c:[
  {i:'🌙',l:'Đêm nay canh gác',o:[
    {w:2,t:'Nửa đêm, gió lạnh thổi tắt mọi ngọn đèn. Nó tới.',fight:{k:'quy',m:1.1},win:{t:'Yêu vật gục ngã. Dân làng mổ lợn ăn mừng ba ngày liền.',e:{st:25,karma:8,tv:6}}},
    {w:1,t:'Thứ xuất hiện là một con hồ ly già. Nó không tấn công, chỉ dẫn ngươi tới cái giếng cuối làng. Dưới đáy giếng có ánh lửa. Hóa ra nó mới là kẻ bảo vệ thôn.',c:[
      {i:'⚔️',l:'Xuống giếng',fight:{k:'luyenthi',m:1.15},win:{t:'Tên luyện thi nhân chết dưới đáy giếng. Con hồ ly ngồi trên miệng giếng nhìn ngươi, rồi lặng lẽ bỏ đi.',e:{st:30,karma:10,tv:8}}},
      {i:'🦊',l:'Nghi ngờ con hồ ly',fight:{k:'holy'},win:{t:'Ngươi giết con hồ ly. Đêm hôm sau, lại có người mất tích.',e:{karma:-8,tamma:8}}}]}]},
  {i:'💎',l:'Đòi thù lao trước',t:'{$a.ten} gom góp được ít linh thạch, run run đưa cho ngươi. Đêm ấy, nó tới.',e:{st:12,karma:-2},fight:{k:'quy'},win:{t:'Việc đã xong. Dân làng không ăn mừng, chỉ đóng cửa im lặng.',e:{tv:5}}},
  {i:'🚶',l:'Bỏ đi',t:'Ngươi đi khỏi thôn. Đêm ấy, ngươi nằm mãi không ngủ được.',e:{tamma:4}}
 ]});

ev({id:'thuy_quy',when:{part:['toi','dem']},n:'Bến đò đêm',tg:['song'],w:2,v:()=>({a:npc('pham')}),
 t:['Lái đò {$a.ten} nhất quyết không chở ai qua sông sau giờ Dậu. “Dưới sông có thứ kéo người xuống, năm nay đã mất bảy mạng.”','Đò ra giữa dòng thì nước bỗng đen kịt. Một bàn tay trắng bệch bám lên mạn thuyền.'],
 c:[
  {i:'⚔️',l:'Diệt thủy quỷ',fight:{k:'thuyquy'},win:{t:'Mặt nước lặng dần. Lái đò quỳ lạy ngươi, nước mắt giàn giụa.',e:{karma:6,st:15}}},
  {i:'🪔',l:'Thả đèn cầu siêu',chk:['tam',9],ok:{t:'Ngọn đèn hoa sen trôi đi. Mặt nước lặng dần. Từ đó bến đò không còn ai chết đuối.',e:{karma:8,tam:1}},no:{t:'Đèn bị một bàn tay dìm xuống. Nó không muốn đi.',fight:{k:'thuyquy'},win:{t:'Nó đi rồi. Lần này thì thật.',e:{karma:4}}}},
  {i:'🏊',l:'Tìm chỗ khác qua sông',chk:['tp',8],ok:{t:'Ngươi tìm được chỗ cạn, lội qua an toàn.'},no:{t:'Nước xiết hơn ngươi tưởng. Ngươi bị cuốn đi mấy dặm mới bám được vào bờ.',e:{hp:'-15%'}}}
 ]});

ev({id:'hoa_bi',n:'Cô dâu mới',tg:['tran','thanh'],r:[0,1,2,3],w:1,
 t:['Nhà phú hộ trong trấn vừa cưới vợ ba. Từ đó, cứ cách mấy đêm lại có gia nhân chết, tim bị moi mất.','Ngươi đi ngang một nhà giàu, thấy yêu khí lẩn khuất trên mái ngói. Cô dâu mới đứng tựa cửa sổ, nhìn ngươi cười.'],
 c:[
  {i:'🔍',l:'Điều tra',chk:['ngo',10],ok:{t:'Ngươi tìm thấy tấm da người treo trong tủ. Đêm ấy, cô dâu không có da để mặc.',fight:{k:'hoabi'},win:{t:'Họa bì cháy thành tro. Nhà phú hộ tạ ơn hậu hĩnh.',e:{karma:8,st:30,relic:0}}},no:{t:'Ngươi không tìm ra gì. Đêm ấy, chính ngươi suýt bị moi tim.',fight:{k:'hoabi',m:1.2},win:{t:'Nguy hiểm thật. Ngươi chạm tay lên ngực, tim vẫn còn đập.',e:{karma:6,st:15}}}},
  {i:'🚶',l:'Không xen vào',t:'Chuyện nhà người ta. Nhưng nụ cười ấy đi theo ngươi vào giấc ngủ.',e:{tamma:2}}
 ]});

ev({id:'lao_ngu',n:'Cá chép vàng',tg:['song','bien'],w:1,v:()=>({a:npc('gia')}),
 t:['Ông lão đánh cá kéo lưới lên, trong lưới là một con cá chép vàng to bằng đứa trẻ, mắt rưng rưng như người khóc.'],
 c:[
  {i:'💎',l:'Mua lại rồi thả',cost:{st:15},t:'Ngươi thả cá xuống sông. Nó quẫy đuôi ba lần như lạy rồi lặn mất. Đêm ấy, có viên ngọc trai sáng rực đặt ở đầu giường ngươi.',e:{relic:0,karma:5,van:2}},
  {i:'🍲',l:'Mua về nấu',cost:{st:10},t:'Thịt cá ngọt như mật, ăn vào nóng rực cả người. Nửa đêm, ngươi mơ thấy có ai đứng khóc ở cửa.',e:{hpP:4,tv:6,karma:-3}},
  {i:'🚶',l:'Đi qua',t:'Ông lão xách con cá ra chợ. Ngươi không ngoảnh lại.'}
 ]});

ev({id:'chuong_xac',when:{part:['dem']},n:'Chuông dẫn xác',tg:['hoang','phe','rung'],w:1,
 t:['Tiếng chuông lắc leng keng giữa đêm. Một đoàn xác chết dán bùa vàng nhảy cò cò trên đường, dẫn đầu là một đạo sĩ áo đen.','Trên cành cây khô treo một chiếc chuông đồng nhỏ, gió thổi lại kêu. Dưới gốc cây là bảy cái xác không tên.'],
 c:[
  {i:'🙇',l:'Nhường đường',t:'Đạo sĩ cản thi gật đầu cảm ơn. Đoàn xác đi qua, mùi đất ẩm thoảng lại rất lâu.',e:{van:1}},
  {i:'⚔️',l:'Chặn lại xem xét',fight:{k:'luyenthi'},win:{t:'Hóa ra đây là luyện thi nhân bắt người sống luyện thi. Ngươi chôn cất bảy cái xác.',e:{karma:6,st:20}}},
  {i:'🔔',l:'Lấy cái chuông',t:'Chuông nằm trong tay ngươi, không còn kêu nữa. Nhưng đêm nào ngươi cũng nghe thấy nó.',e:{relic:0,tamma:4}}
 ]});

ev({id:'cho_que',n:'Con chó vàng',tg:['tran'],w:1,
 t:['Một con chó vàng cứ lẽo đẽo theo ngươi từ đầu trấn tới cuối trấn. Ngươi dừng, nó dừng. Ngươi đi, nó đi.'],
 c:[
  {i:'🍖',l:'Mua cho nó cái bánh',cost:{st:2},t:'Nó vẫy đuôi ăn hết, rồi chạy biến. Hôm sau, ngươi nhặt được một túi linh thạch ai đánh rơi ngay chỗ nó nằm.',e:{van:2,st:10}},
  {i:'🚶',l:'Đuổi đi',t:'Nó cụp đuôi bỏ đi. Ngươi thấy hơi áy náy.'}
 ]});

ev({id:'hoi_den',when:{season:['xuan']},n:'Hội hoa đăng',tg:['tran','thanh','song'],w:1,
 t:['{$pl} mở hội hoa đăng. Trẻ con chạy khắp phố, đèn giấy thả trôi trên sông như một dải ngân hà nhỏ.'],
 c:[
  {i:'🏮',l:'Thả một ngọn đèn',t:'Ngươi viết lên đèn một cái tên. Đèn trôi đi. Lòng nhẹ hẳn.',e:{tamma:-10,tam:1}},
  {i:'🍡',l:'Ăn uống thỏa thích',cost:{st:5},t:'Bánh trôi, kẹo hồ lô, rượu nếp. Lâu lắm rồi ngươi mới thấy mình là người.',e:{hp:'50%',van:1}}
 ]});

ev({id:'thu_nha',n:'Thư nhà',tg:['*'],r:[0,1],once:1,w:1,cond:r=>{const h=W().regions.flatMap(R=>R.nodes).find(n=>n.name===r.que);return !h||h.state!=='ruin';}, // quê đang hoang tàn thì không có thư "vẫn ổn"
 t:['Một người phu trạm đường xa hỏi thăm mãi mới tìm được ngươi, trao một lá thư gói trong giấy dầu. Thư từ {$que}.'],
 c:[
  {i:'📜',l:'Đọc thư',o:[
    {w:2,t:'Thư viết: ở nhà vẫn ổn, năm nay được mùa, đừng lo. Cuối thư có vẽ một bông hoa xiêu vẹo.',e:{tam:2,tamma:-8}},
    {w:1,t:'Thư báo tin người thân của ngươi đã mất từ mùa thu. Ngươi đọc đi đọc lại ba lần. Rồi ngươi ngồi xuống, rất lâu.',e:{tamma:6,tam:2,tv:5}}]},
  {i:'🔥',l:'Đốt đi không đọc',t:'Đã bước lên tiên lộ, không quay đầu. Tro giấy bay theo gió.',e:{tam:1,tamma:3}}
 ]});

ev({id:'xin_lam_do',n:'Đứa trẻ xin bái sư',tg:['tran','thanh'],w:1,v:()=>({a:npc('hai')}),
 t:['{$a.ten}, một đứa trẻ {$a.look}, đòi bái ngươi làm sư phụ. Quỳ trước cửa ba ngày không chịu đứng dậy.'],
 c:[
  {i:'🧑‍🏫',l:'Nhận làm đệ tử',t:'Nửa năm dạy nó luyện khí. Lúc chia tay, nó khóc như mưa, hứa sau này nổi danh sẽ đi tìm ngươi.',e:{karma:4,tam:2,h:288,an:['a','nhận làm đệ tử']}},
  {i:'🍚',l:'Cho ít tiền rồi khuyên về',cost:{st:5},t:'Nó cầm tiền, cúi đầu đi. Có lẽ làm phàm nhân yên ổn cũng là một cái phúc.',e:{karma:1}},
  {i:'😠',l:'Mắng cho về',t:'Nó đứng dậy, mắt đỏ hoe. Ngươi biết nó sẽ không quên ngày hôm nay.',e:{oan:['a','đuổi đi như đuổi chó']}}
 ]});

ev({id:'hoa_su',n:'Họa sư',tg:['tran','thanh','song','nui'],w:1,v:()=>({a:npc('tre')}),
 t:['Một họa sư {$a.look} xin vẽ chân dung ngươi. “{$a.goi} có tướng lạ, {$a.xung} vẽ không lấy tiền.”'],
 c:[
  {i:'🖼️',l:'Ngồi làm mẫu',t:'Bức họa giống đến kỳ lạ, chỉ có đôi mắt là già hơn ngươi. Họa sư nói người trong tranh sau này sẽ nổi danh. Ngươi cười.',e:{van:1,tam:1}},
  {i:'🚶',l:'Từ chối',t:'Ngươi không muốn lưu lại dấu vết gì ở thế gian này.'}
 ]});

ev({id:'tuyet_son',when:{season:['dong']},n:'Người ngồi trong tuyết',tg:['nui'],w:1,
 t:['Trên đỉnh núi tuyết có người ngồi thiền, tuyết phủ tới vai. Người dưới núi nói người ấy đã ngồi đó ba năm.'],
 c:[
  {i:'🧘',l:'Ngồi xuống bên cạnh',t:'Ngươi ngồi một năm. Tuyết phủ lên vai ngươi. Ngày ngươi đứng dậy, người kia cũng mở mắt, khẽ gật đầu với ngươi, rồi đi xuống núi.',e:{dao:2,tv:14,tam:2,h:720}},
  {i:'🔥',l:'Đốt lửa sưởi cho người ấy',t:'Ngọn lửa cháy tới sáng. Người ấy không động đậy, nhưng tuyết trên vai đã tan.',e:{karma:3,tamma:-5}}
 ]});

ev({id:'ga_quay',n:'Tranh nhau con gà',tg:['tran','thanh'],w:1,v:()=>({a:npc('tre'),b:npc('tre')}),
 t:['Giữa chợ, hai tu sĩ Trúc Cơ đánh nhau tới bụi mù chỉ vì một con gà quay. Con gà vẫn nằm trên mẹt, bốc khói thơm lừng.'],
 c:[
  {i:'🍗',l:'Lấy con gà rồi chạy',chk:['tp',9],ok:{t:'Lúc hai người nhận ra thì ngươi đã ngồi gặm đùi gà ở đầu phố bên kia. Ngon thật.',e:{hp:'20%',van:1}},no:{t:'Hai người cùng dừng tay, cùng quay sang ngươi.',fight:{k:'tantu',n:'{$a.ten}'},win:{t:'Ngươi ăn con gà trước mặt cả hai.',e:{hp:'20%'}}}},
  {i:'⚖️',l:'Đứng ra phân xử',chk:['ngo',9],ok:{t:'Ngươi chia đôi con gà, mỗi người một nửa, rồi thu phí phân xử. Cả hai cùng chửi ngươi, nhưng cùng trả tiền.',e:{st:10}},no:{t:'Hai người cùng bảo ngươi lo chuyện bao đồng.',e:{tamma:1}}}
 ]});
