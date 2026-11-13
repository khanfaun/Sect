// ---------------- QUAN ẢI ----------------
function openPass(n){
  const r=G.run;const k=r.region+1;if(k>4)return;
  r.scene={type:'pass',id:n.id,back:n.id,k,text:T(['Cửa ải xây bằng đá xanh, cao chín trượng. Lính gác khoanh tay nhìn ngươi từ trên xuống dưới: “Đi đâu? Giấy tờ đâu?”','Quan ải nằm giữa hai vách núi, chỉ một lối đi. Bên kia là {$reg}. Kẻ gác ải không có ý định để ai qua dễ dàng.'],{reg:REG[k].n}),res:null};
}
function passOpts(){
  const r=G.run,sc=r.scene,k=sc.k;const o=[];
  const gp=price(45);const an=r.seeds.findIndex(s=>s.t==='an');
  o.push({a:'realm',i:'☯️',l:'Lấy tu vi mà qua',ok:r.realm>=k,tip:'Cảnh giới từ '+REALM[k]+' trở lên thì không ai dám cản'});
  o.push({a:'pass',i:'🎫',l:'Trình lệnh bài thông quan',ok:r.passes.includes(k),tip:'Lệnh bài rơi từ thủ lĩnh vùng, hoặc mua ở đấu giá'});
  o.push({a:'guide',i:'🧭',l:'Thuê người dẫn đường lén qua',ok:r.st>=gp,tip:'Tốn 💎'+gp,x:'💎'+gp});
  if(an>=0)o.push({a:'favor',i:'🤝',l:'Nhờ '+r.seeds[an].ten+' dẫn đường',ok:true,tip:'Dùng một ân tình đã gieo'});
  o.push({a:'fight',i:'⚔️',l:'Liều mạng xông qua',ok:true,tip:'Đánh một trận với kẻ gác ải rất mạnh'});
  return o;
}
function passAct(a){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='pass')return;const o=passOpts().find(x=>x.a===a);if(!o||!o.ok)return;
  if(a==='guide'){r.st-=price(45);}
  if(a==='favor'){const i=r.seeds.findIndex(s=>s.t==='an');r.seeds.splice(i,1);}
  if(a==='fight'){startCombat({k:'human',m:1.6,n:'Tướng gác ải',sub:'Kẻ giữ quan ải',elite:1},{kind:'cross',k:sc.k});return;}
  doCross(sc.k,a);
}
function doCross(k,how){
  const r=G.run;const mo=CROSS_M[k];
  advanceTime(mo*HM);if(!G.run)return;
  r.region=k;const R0=regionOf(k);r.moving=null;arrive(R0.entry);r.maxRegion=Math.max(r.maxRegion||0,k);
  log(`Vượt ải, tới ${REG[k].n}.`);bio(`Năm ${Math.floor(r.age)} tuổi, vượt ải tới ${REG[k].n}.`);
  r.scene={type:'region',text:T(REG[k].intro,baseV()),sub:`Đường đi mất ${mo} tháng`};
}

function forceTamma(){
  const r=G.run;const v=baseV();
  r.scene={type:'event',id:'tam_ma_xam',v,story:['Tâm ma đã lớn tới mức không thể đè nén. Đêm ấy, nó bước ra khỏi thân thể ngươi, khoác khuôn mặt của ngươi, và mỉm cười.'],cur:['force'],phase:'choose',chips:[],back:r.lastBack!=null?r.lastBack:null};
}
const ENC_T={
  thu:['{mo} Bụi cây rung lên. {$e} hiện ra, mắt đăm đăm nhìn ngươi.','Mùi tanh hôi xộc tới trước khi ngươi kịp thấy nó. {$e} chặn ngay giữa lối.','{$canh} Yêu khí ập tới sát bên. {$e} đã theo dấu ngươi từ lâu.','Đàn chim vụt bay. {$e} lao ra từ chỗ tối, nhắm thẳng vào ngươi.','Ngươi giẫm phải lãnh địa của {$e}. Nó không định để ngươi đi.','{$canh} Trên mặt đất có dấu vết còn mới. Rồi {$e} xuất hiện.'],
  nhan:['“Đứng lại!” {$e} chặn đường, ánh mắt dán vào túi trữ vật của ngươi.','{$e} từ trên cây nhảy xuống, cười nhạt: “Giao đồ ra, ta cho ngươi chết toàn thây.”','Có kẻ bám theo ngươi đã ba ngày. Hôm nay, {$e} không giấu nữa.','{$canh} {$e} ngồi chờ sẵn ở ngã ba, như biết ngươi sẽ đi qua.','“{$p.tt}, giết ngươi cũng chẳng oan đâu.” {$e} nói, giọng như bàn chuyện thời tiết.','{mo} Ngươi vừa dừng chân thì {$e} đã chắn trước mặt, tay đặt lên chuôi binh khí.'],
  // người không phải phường cướp (đệ tử chính đạo, võ tăng, kiếm khách, đạo sĩ): động thủ vì hiểu lầm, truy bắt hay thử tài, không đòi mãi lộ
  nhanChinh:['{$e} chặn ngươi lại, mắt nhìn chằm chằm: “Trên người ngươi có mùi huyết khí. Theo ta về tra hỏi!” Chưa kịp phân trần, đòn đã tới.','{mo} {$e} đứng chắn giữa đường, ôm quyền: “Nghe danh đã lâu, xin chỉ giáo vài chiêu.” Ánh mắt kẻ này chẳng có chút gì là nương tay.','{$canh} {$e} đang truy một kẻ bỏ trốn, thấy ngươi liền quát: “Đồng bọn của hắn?” rồi xuất thủ.','{$e} rút binh khí: “Có kẻ lạ phá cấm chế quanh đây mấy hôm nay. Là ngươi?” Không đợi ngươi trả lời, kiếm quang đã lóe lên.'],
  quy:['Nhiệt độ hạ xuống đột ngột, hơi thở ngươi hóa thành sương. {$e} trôi ra từ bóng tối.','{mo} Tiếng khóc than vẳng tới, càng lúc càng gần. Rồi {$e} hiện ra, ngay sau lưng ngươi.','Đuốc trong tay ngươi tắt phụt. Khi thắp lại, {$e} đã đứng đó.','{$canh} Có tiếng cười khanh khách. {$e} ngồi vắt vẻo trên cành cây chết, nhìn ngươi.'],
  vat:['Mặt đất rung lên. {$e} từ từ chuyển động, như vừa tỉnh dậy sau giấc ngủ ngàn năm.','Không tiếng động, không dấu hiệu. {$e} đã ở đó, chặn đường ngươi.','{$canh} Từ khe nứt hư không, {$e} chui ra.'],
};
function sceneBack(){const r=G.run,sc=r.scene;if(!sc)return null;if(sc.type==='place')return sc.id;return sc.back!=null?sc.back:null;}
function encounter(o){
  const r=G.run;const back=sceneBack();const en=o.en||mkEnemy({elite:o.type==='elite'});
  const v=baseV();v.e=en.n;
  let text=T(encLawful(en)?ENC_T.nhanChinh:(ENC_T[en.f]||ENC_T.vat),v);
  if(o.type==='elite')text+=' '+T(['Khí tức của nó đè nặng lên vai ngươi. Kẻ này mạnh hơn hẳn những gì ngươi từng gặp.','Ngươi cảm thấy tử khí. Trận này không dễ.','Uy áp tỏa ra khiến cỏ cây quanh đó rạp xuống.']);
  r.scene={type:'enc',en,elite:o.type==='elite',text,v,back};
}
function encAct(a){
  const r=G.run,sc=r.scene;
  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node',quest:sc.quest});return;}
  if(a==='sneak'){const ok=R()<encSneak(sc);if(ok){sc.res=T(['Ngươi nín thở, lùi vào bóng tối. Nó đi qua, không phát hiện ra.','Ngươi đi vòng qua một quãng xa. Thoát được.','Ngươi ẩn mình sau tảng đá cho tới khi bóng nó khuất hẳn.']);sc.done=1;}else{sc.failSneak=1;encAct('fight');clog(G.run.scene,'Bị phát hiện!','en');}return;}
  if(a==='pay'){const c=Math.max(1,Math.round(12*SC[r.region]));if(r.st<c)return;r.st-=c;sc.res=T(['Ngươi ném túi linh thạch qua. {$e} cân thử, cười khẩy rồi tránh đường.','“Biết điều đấy.” {$e} cất linh thạch, phẩy tay cho ngươi đi.'],{e:sc.en.n});sc.paid=c;sc.done=1;return;}
}
// kẻ chặn đường có phải phường cướp bóc không: đệ tử tông chính đạo, Phật môn, võ tăng, kiếm khách, đạo sĩ thì không
function encLawful(en){if(!en||en.f!=='nhan')return false;if(['votang','kiemtu','phusu'].includes(en.k))return true;
  if(en.k==='detu'){const ss=(G.meta&&G.meta.world&&G.meta.world.sects)||[];const s0=ss.find(x=>en.sub&&en.sub.includes(x.n)||en.n&&en.n.includes(x.n));return !s0||s0.al!=='ma';}return false;}
function encSneak(sc){const s=S();return clamp(0.35+(s.tp-8-G.run.region*3)*0.05,0.1,0.85)*(sc.elite?0.5:1);}
function bossIntro(){
  const r=G.run;const back=sceneBack();const pool=BOSS[r.region];const b=pick(pool);r.bossDef=b;r.bossV={nick:pick(NAME.ma1),sect:pick(G.meta.world.sects.filter(s=>s.al==='chinh')).n,ten:genName('nam')};
  const v=Object.assign(baseV(),r.bossV);
  r.scene={type:'boss',text:T(b.t,v),b:{i:b.i,n:T(b.n,v)},back};
}
function bossFight(){startCombat('boss',{kind:'boss'});}

// ---------------- PHƯỜNG THỊ ----------------
function price(base){const fx=aggFx();return Math.max(1,Math.round(base*SC[G.run.region]*(1-Math.min(40,fx.shopP||0)/100)));}
function openShop(n){
  const r=G.run;const back=sceneBack();const a=npc('thuong');const v=Object.assign(baseV(),{a});
  const text=!n?T(['{$a.ten} lật tấm bạt, bày từng món lên mặt hòm: “{$a.goi} xem đi, đường xa nên giá có nhỉnh hơn chút.”','Hàng hóa xếp trên mấy cỗ xe, mùi da thuộc lẫn mùi hương liệu. {$a.ten} gõ gõ nắp hòm: “Món nào cũng có lai lịch.”'],v):T(['{$a.ten}, {$a.look}, xoa tay cười: “{$a.goi} cần gì? Hàng ở đây không giả.”','Tiệm tạp hóa nhỏ, hàng bày lộn xộn. {$a.ten} ngáp dài: “Xem thoải mái. Mua thì trả tiền.”','Chi nhánh Vạn Bảo Thương Hội. Tiểu nhị cúi chào tới tận đất, mắt liếc túi trữ vật của ngươi.','Một tán tu bày sạp ven đường, vừa thấy ngươi đã mời mọc rối rít.','Phường thị đông nghịt. Ngươi chen vào một sạp hàng có tấm biển viết: “Không trả giá.”'],v);
  const m=Math.floor(W().t/HM);
  if(n&&n.shop&&n.shop.m===m&&n.shop.kiep===r.kiep){r.scene={type:'shop',text,items:n.shop.items,heal:n.shop.heal,back,node:n.id};return;}
  const items=[];
  for(let i=0;i<3;i++){const id=rollPill();const q=r.region>=2?ri(0,2):r.region>=1?ri(0,1):0;items.push({k:'pill',id,q,p:price(PILL[id].p*PQM[q])});}
  if((chance(.6)||r.realm>=r.region)&&!(n&&n.type==='tran'))items.push({k:'pill',id:btPill(),q:0,p:price(PILL[btPill()].p)}); // tạp hóa thôn quê không có đan đột phá
  for(let i=0;i<2;i++){const id=rollSkill();items.push({k:'skill',id,p:price(40+SK[id].t*28)});}
  const rel=genRelic(clamp(r.region+(chance(.2)?1:0),0,4));items.push({k:'relic',rel,p:price(70+rel.tier*45)});
  if(typeof shopExtra==='function')shopExtra(items,n);
  const heal=price(10);
  if(n)n.shop={m,kiep:r.kiep,items,heal};
  r.scene={type:'shop',text,items,heal,back,node:n?n.id:null};
}
function buy(i){
  const r=G.run,sc=r.scene;if(sc.type!=='shop')return;const it=sc.items[i];if(!it||it.sold||r.st<it.p)return;
  if(it.k==='pill'&&r.pills.length>=S().pillMax)return;
  r.st-=it.p;it.sold=1;
  if(it.k==='pill')gainPill(it.id,it.q);else if(it.k==='skill')gainSkill(it.id);else if(it.k==='pass'){if(!r.passes.includes(it.reg))r.passes.push(it.reg);log(`Mua được ${it.n}.`);}else{r.relics.push(it.rel);clampHp();log(`Mua được ${it.rel.name}.`);}
  if(r.pendingSkill){r.scene={type:'swap',id:r.pendingSkill,back:'shop',shop:sc};}
}
function healBuy(){const r=G.run,sc=r.scene;if(r.st<sc.heal)return;r.st-=sc.heal;const s=S();r.hp=s.maxHp;r.mp=s.maxMp;sc.healed=1;}

// ---------------- ĐỘNG PHỦ ----------------
const REST_T={
  tinh:['Ngươi ngồi xếp bằng, vận khí một chu thiên. Mệt mỏi tan dần như sương dưới nắng.','Gió nhẹ, lá rơi. Ngươi điều tức nửa ngày, thương thế lành quá nửa.','Một nén nhang, rồi hai nén. Hơi thở ngươi dài ra, chậm lại, hòa vào tiếng côn trùng.'],
  bqTown:['Ngươi thuê một gian phòng sau khách điếm, cài then, ngồi xếp bằng. Tiếng rao ngoài phố xa dần rồi tắt hẳn.','Ngươi đóng cửa phòng trọ, dặn chủ quán đừng gõ cửa. Ngày tháng trôi qua như nước chảy dưới cầu.','Ngươi mở mắt, bên ngoài đã đổi mùa mấy lượt. Chủ trọ nhìn ngươi như nhìn người từ cõi khác về.','Bế quan lần này ngươi mơ rất nhiều. Tỉnh dậy, ngoài cửa sổ phố xá vẫn ồn ã như chưa từng có ai ngồi đó.'],
  bq:['Ngươi bố trí cấm chế, ngồi vào chỗ sâu nhất của động phủ. Ngày tháng trôi qua như nước chảy dưới cầu.','Đá phủ rêu, rêu khô rồi lại xanh. Ngươi mở mắt, bên ngoài đã đổi mùa mấy lượt.','Bế quan lần này ngươi mơ rất nhiều. Có giấc mơ là kiếp trước, có giấc mơ là kiếp sau.','Linh khí trong động bị ngươi hút cạn, vách đá bạc trắng như vôi. Ngươi đứng dậy, xương cốt kêu răng rắc.','Ngươi quên cả ngày đêm. Lúc xuất quan, có con chim đã làm tổ trên vai.'],
  bqint:['Đang ngồi thì có động, đành xuất quan giữa chừng. Có kẻ tới trước chỗ ngươi ngồi.','Cấm chế vỡ tan. Ngươi bừng mắt: kẻ xâm nhập đã đứng ngay cửa động.'],
  bt:[['Linh khí trong đan điền ngưng tụ thành một đài sen, vững như núi. Đạo cơ đã thành.','Ngươi nghe trong người có tiếng nổ nhẹ như măng mọc. Rồi mọi thứ lắng lại. Trúc Cơ.'],
      ['Chân nguyên xoay tròn, nén lại, nén nữa, cho đến khi hóa thành một viên kim đan lấp lánh như sao.','Ba ngày ba đêm, đan điền như lò lửa. Sáng ngày thứ tư, một viên đan vàng lặng lẽ thành hình.'],
      ['Kim đan vỡ ra. Từ trong đó, một hài nhi nhỏ bằng ngón tay mở mắt, giống ngươi như đúc. Nguyên Anh xuất thế.','Đau như xé xác. Rồi một tiếng khóc trẻ thơ vang lên trong đan điền. Ngươi bật cười giữa nước mắt.'],
      ['Nguyên anh hòa vào thiên địa. Trong một khoảnh khắc, ngươi là gió, là núi, là tất cả. Rồi ngươi lại là ngươi, nhưng không còn như trước.','Thần thức lan ra ngàn dặm. Ngươi nghe được tiếng lá rơi ở một khu rừng chưa từng tới.']],
  btf:['Linh khí cuộn ngược, kinh mạch như bị dao cắt. Ngươi phun ra một ngụm máu. Đột phá thất bại.','Tới bước cuối cùng thì tâm thần dao động. Một tiếng “phựt” khẽ, công sức tan thành mây khói.','Tâm ma hiện lên đúng lúc then chốt, cười vào mặt ngươi. Ngươi lỡ nhịp. Thất bại.'],
};

// ---------------- KẾT THÚC KIẾP ----------------
function lifeSummary(cause,info){
  const r=G.run;const age=Math.floor(r.age);
  const lines=r.bio.length>6?[r.bio[0]].concat(r.bio.slice(-5)):r.bio.slice(); // giữ dòng xuất thân và những chuyện gần nhất (cảnh giới cao nhất thường ở cuối)
  let end='';
  if(cause==='combat')end=`Năm ${age} tuổi, ${r.ten} chết dưới tay ${info.n} ở ${r.place.n}.`;
  else if(cause==='toahoa')end=`Năm ${age} tuổi, thọ nguyên cạn kiệt, ${r.ten} tọa hóa ở ${r.place.n}.`;
  else if(cause==='tamma')end=`Năm ${age} tuổi, ${r.ten} tẩu hỏa nhập ma.`;
  else if(cause==='thanvo')end=`Năm ${age} tuổi, ${r.ten} cưỡng ép lĩnh ngộ trước giờ độ kiếp, thức hải vỡ nát, thần hồn tan biến ở ${r.place.n}.`;
  else if(cause==='kiep')end=`Năm ${age} tuổi, ${r.ten} tan thành tro bụi dưới thiên kiếp ở ${r.place.n}.`;
  else if(cause==='quyan')end=`Năm ${age} tuổi, ${r.ten} gác kiếm quy ẩn ở ${r.place.n}, từ đó không hỏi tới chuyện tu hành, sống nốt quãng đời còn lại trong yên lặng.`;
  else if(cause==='phithang')end=`Năm ${age} tuổi, ${r.ten} vượt Cửu Trùng Lôi Kiếp, phá không phi thăng.`;
  lines.push(end+(cause==='combat'||cause==='toahoa'?' '+pick(['Một đời tu tiên, như bao người khác.','Không ai kịp nhớ tên.','Người đời nhắc tới vài năm, rồi quên.','Tiên lộ dài, chân người ngắn.']):''));
  return lines;
}
function calcPts(cause){
  const r=G.run;const o=[];
  o.push(['Cảnh giới',r.maxRealm*12+Math.floor(r.tv/25)]);
  o.push(['Vùng đất đã qua',r.region*6]);
  o.push(['Thủ lĩnh bị hạ',r.bossKills*8]);
  o.push(['Kẻ địch bị hạ',Math.floor(r.kills/3)]);
  o.push(['Kỳ ngộ đã trải',Math.floor(r.evDone/4)]);
  if(cause==='phithang')o.push(['Phi thăng',80]);
  if(cause==='quyan')o.push(['Quy ẩn an lành',4]);
  return o.filter(x=>x[1]>0);
}
function die(cause,info){
  const r=G.run;if(!r)return;
  const pts=calcPts(cause);const tot=pts.reduce((a,b)=>a+b[1],0)+1;
  const lines=lifeSummary(cause,info);
  const ep=T('{epitaph}');
  const life={_mr:r.maxRegion||0,k:r.kiep,ten:r.ten,g:r.g,tuoi:Math.floor(r.age),realm:qualName(r.maxRealm,(r.quality||[])[r.maxRealm]||0),cause,lines,ep,pts:tot,origin:r.origin};
  const M=G.meta;M.lives.unshift(life);if(M.lives.length>40)M.lives.pop();
  M.pts+=tot;M.total+=tot;
  M.last={grave:cause!=='phithang'?{ten:r.ten,tuoi:Math.floor(r.age),r:r.region}:null,killer:cause==='combat'&&info&&!info.boss&&info.k?{n:info.n,k:info.k,i:info.i,el:info.el,r:r.region}:(cause==='combat'&&info&&info.boss?{n:info.n,k:'boss',i:info.i,el:info.el,r:r.region}:null),ten:r.ten};
  ach('chet1');if(cause==='toahoa')ach('toahoa');if(cause==='quyan')ach('quyan');if(cause==='phithang'){ach('phithang');gainLore('chan_tuong');}
  if(M.nlife>=5)ach('kiep5');
  G.over={life,pts,cause,title:{combat:'Tử trận',kiep:'Hồn phi phách tán',toahoa:'Tọa hóa',tamma:'Tẩu hỏa nhập ma',quyan:'Quy ẩn',phithang:'Phi thăng'}[cause]};
  life.y=tYear(W().t);if(r.bossKills)life.hero='hạ '+r.bossKills+' thủ lĩnh';else if(r.bangTop)life.hero='đứng đầu Thiên Kiêu Bảng';
  fogToMemory();
  G.run=null;afterlife(r,cause,info);G.over.gap=G.lastGap;G.screen='over';saveSoon();
}
function fogToMemory(){for(const R0 of W().regions)for(const n of R0.nodes){if(n.fog>=2){n.fog=1;n.memory=true;}else if(n.fog===1&&!n.memory){n.fog=0;}}}
function retire(){die('quyan');}
function victory(){die('phithang');}
