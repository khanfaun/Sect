function forceTamma(){
  const r=G.run;const v=baseV();
  r.scene={type:'event',id:'tam_ma_xam',v,story:['Tâm ma đã lớn tới mức không thể đè nén. Đêm ấy, nó bước ra khỏi thân thể ngươi, khoác khuôn mặt của ngươi, và mỉm cười.'],cur:['force'],phase:'choose',chips:[],back:r.lastBack!=null?r.lastBack:null};
}
const ENC_T={
  thu:['{mo} Bụi cây rung lên. {$e} bước ra, mắt xanh lè, nước dãi nhỏ giọt.','Mùi tanh hôi xộc tới trước khi ngươi kịp thấy nó. {$e} chặn ngay giữa lối, gầm gừ.','{$canh} Tiếng gầm vang lên sát bên tai. {$e} đã theo dấu ngươi từ lâu.','Đàn chim vụt bay. {$e} lao ra từ chỗ tối, nhắm thẳng vào ngươi.','Ngươi giẫm phải lãnh địa của {$e}. Nó không định để ngươi đi.','{$canh} Trên mặt đất có dấu chân to bằng cái nong, còn mới. Rồi {$e} xuất hiện.'],
  nhan:['“Đứng lại!” {$e} chặn đường, ánh mắt dán vào túi trữ vật của ngươi.','{$e} từ trên cây nhảy xuống, cười nhạt: “Giao đồ ra, ta cho ngươi chết toàn thây.”','Có kẻ bám theo ngươi đã ba ngày. Hôm nay, {$e} không giấu nữa.','{$canh} {$e} ngồi chờ sẵn ở ngã ba, như biết ngươi sẽ đi qua.','“{$p.tt}, giết ngươi cũng chẳng oan đâu.” {$e} nói, giọng như bàn chuyện thời tiết.','{mo} Ngươi vừa dừng chân thì {$e} đã chắn trước mặt, tay đặt lên chuôi binh khí.'],
  quy:['Nhiệt độ hạ xuống đột ngột, hơi thở ngươi hóa thành sương. {$e} trôi ra từ bóng tối.','{mo} Tiếng khóc than vẳng tới, càng lúc càng gần. Rồi {$e} hiện ra, ngay sau lưng ngươi.','Đuốc trong tay ngươi tắt phụt. Khi thắp lại, {$e} đã đứng đó.','{$canh} Có tiếng cười khanh khách. {$e} ngồi vắt vẻo trên cành cây chết, nhìn ngươi.'],
  vat:['Mặt đất rung lên. {$e} từ từ chuyển động, như vừa tỉnh dậy sau giấc ngủ ngàn năm.','Không tiếng động, không dấu hiệu. {$e} đã ở đó, chặn đường ngươi.','{$canh} Từ khe nứt hư không, {$e} chui ra.'],
};
function sceneBack(){const r=G.run,sc=r.scene;if(!sc)return null;if(sc.type==='place')return sc.id;return sc.back!=null?sc.back:null;}
function encounter(o){
  const r=G.run;const back=sceneBack();const en=o.en||mkEnemy({elite:o.type==='elite'});
  const v=baseV();v.e=en.n;
  let text=T(ENC_T[en.f]||ENC_T.vat,v);
  if(o.type==='elite')text+=' '+T(['Khí tức của nó đè nặng lên vai ngươi. Kẻ này mạnh hơn hẳn những gì ngươi từng gặp.','Ngươi cảm thấy tử khí. Trận này không dễ.','Uy áp tỏa ra khiến cỏ cây quanh đó rạp xuống.']);
  r.scene={type:'enc',en,elite:o.type==='elite',text,v,back};
}
function encAct(a){
  const r=G.run,sc=r.scene;
  if(a==='fight'){startCombat({pre:sc.en,elite:sc.elite},{kind:'node'});return;}
  if(a==='sneak'){const ok=R()<encSneak(sc);if(ok){sc.res=T(['Ngươi nín thở, lùi vào bóng tối. Nó đi qua, không phát hiện ra.','Ngươi đi vòng qua một quãng xa. Thoát được.','Ngươi ẩn mình sau tảng đá cho tới khi bóng nó khuất hẳn.']);sc.done=1;}else{sc.failSneak=1;encAct('fight');clog(G.run.scene,'Bị phát hiện!','en');}return;}
  if(a==='pay'){const c=Math.round(12*SC[r.region]);if(r.st<c)return;r.st-=c;sc.res=T(['Ngươi ném túi linh thạch qua. {$e} cân thử, cười khẩy rồi tránh đường.','“Biết điều đấy.” {$e} cất linh thạch, phẩy tay cho ngươi đi.'],{e:sc.en.n});sc.paid=c;sc.done=1;return;}
}
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
  const text=T(['{$a.ten}, {$a.look}, xoa tay cười: “{$a.goi} cần gì? Hàng ở đây không giả.”','Tiệm tạp hóa nhỏ, hàng bày lộn xộn. {$a.ten} ngáp dài: “Xem thoải mái. Mua thì trả tiền.”','Chi nhánh Vạn Bảo Thương Hội. Tiểu nhị cúi chào tới tận đất, mắt liếc túi trữ vật của ngươi.','Một tán tu bày sạp ven đường, vừa thấy ngươi đã mời mọc rối rít.','Phường thị đông nghịt. Ngươi chen vào một sạp hàng có tấm biển viết: “Không trả giá.”'],v);
  const m=Math.floor(W().t/HM);
  if(n&&n.shop&&n.shop.m===m&&n.shop.kiep===r.kiep){r.scene={type:'shop',text,items:n.shop.items,heal:n.shop.heal,back,node:n.id};return;}
  const items=[];
  for(let i=0;i<3;i++){const id=rollPill();const q=r.region>=2?ri(0,2):r.region>=1?ri(0,1):0;items.push({k:'pill',id,q,p:price(PILL[id].p*PQM[q])});}
  if(chance(.6)||r.realm>=r.region)items.push({k:'pill',id:btPill(),q:0,p:price(PILL[btPill()].p)});
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
  bq:['Ngươi bố trí cấm chế, ngồi vào chỗ sâu nhất của động phủ. Ngày tháng trôi qua như nước chảy dưới cầu.','Đá phủ rêu, rêu khô rồi lại xanh. Ngươi mở mắt, bên ngoài đã đổi mùa mấy lượt.','Bế quan lần này ngươi mơ rất nhiều. Có giấc mơ là kiếp trước, có giấc mơ là kiếp sau.','Linh khí trong động bị ngươi hút cạn, vách đá bạc trắng như vôi. Ngươi đứng dậy, xương cốt kêu răng rắc.','Ngươi quên cả ngày đêm. Lúc xuất quan, có con chim đã làm tổ trên vai.'],
  bqint:['Đang ngồi thì có động, đành xuất quan giữa chừng. Có kẻ tới trước chỗ ngươi ngồi.','Cấm chế vỡ tan. Ngươi bừng mắt: kẻ xâm nhập đã đứng ngay cửa động.'],
  bt:[['Linh khí trong đan điền ngưng tụ thành một đài sen, vững như núi. Đạo cơ đã thành.','Ngươi nghe trong người có tiếng nổ nhẹ như măng mọc. Rồi mọi thứ lắng lại. Trúc Cơ.'],
      ['Chân nguyên xoay tròn, nén lại, nén nữa, cho đến khi hóa thành một viên kim đan lấp lánh như sao.','Ba ngày ba đêm, đan điền như lò lửa. Sáng ngày thứ tư, một viên đan vàng lặng lẽ thành hình.'],
      ['Kim đan vỡ ra. Từ trong đó, một hài nhi nhỏ bằng ngón tay mở mắt, giống ngươi như đúc. Nguyên Anh xuất thế.','Đau như xé xác. Rồi một tiếng khóc trẻ thơ vang lên trong đan điền. Ngươi bật cười giữa nước mắt.'],
      ['Nguyên anh hòa vào thiên địa. Trong một khoảnh khắc, ngươi là gió, là núi, là tất cả. Rồi ngươi lại là ngươi, nhưng không còn như trước.','Thần thức lan ra ngàn dặm. Ngươi nghe được tiếng lá rơi ở một khu rừng chưa từng tới.']],
  btf:['Linh khí cuộn ngược, kinh mạch như bị dao cắt. Ngươi phun ra một ngụm máu. Đột phá thất bại.','Tới bước cuối cùng thì tâm thần dao động. Một tiếng “phựt” khẽ, công sức tan thành mây khói.','Tâm ma hiện lên đúng lúc then chốt, cười vào mặt ngươi. Ngươi lỡ nhịp. Thất bại.'],
};
function btChance(){
  const r=G.run,s=S();
  let p=[0.62,0.52,0.46,0.4,0.35][r.realm]+(s.ngo-10)*0.012+(s.tam-10)*0.012-r.tamma*0.004+r.btFail*0.08;
  const pid=btPill();const has=r.pills.findIndex(x=>x.id===pid);const has2=r.pills.findIndex(x=>x.id==='phacanh');
  if(has>=0)p+=pillX(pid,r.pills[has].q)/100;if(has2>=0)p+=pillX('phacanh',r.pills[has2].q)/100;
  return clamp(p,0.05,0.97);
}
