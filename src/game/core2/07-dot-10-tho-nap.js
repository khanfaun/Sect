// ================= ĐỢT 10: THỔ NẠP VÀ LỊCH LUYỆN =================
// Thổ nạp: thân thể tự hít thở linh khí, không cần bế quan, tu vi vẫn nhích lên theo thời gian.
// Rất ít: chừng 5% tốc độ bế quan. Theo hệ số tu luyện (linh căn, tư chất, ngộ tính từ xuất thân,
// tu vi +% từ công pháp, tâm pháp, trang bị, mệnh cách) và linh khí nơi đang đứng.
function thonapPct(){const r=G.run;if(!r)return 0;const n=nodeById(r.at);return 100/(BQ_Y[clamp(r.realm,0,5)]*12)*0.05*S().tvM*LK_M[lkOf(n)];} // % tu vi mỗi tháng
function thonapPts(){return Math.round(thonapPct()*12/100*tvPts(G.run.realm));} // tu vi mỗi năm
{const _adv10=advanceTime;let dep=0;advanceTime=function(h){dep++;let o;try{o=_adv10(h);}finally{dep--;}
  if(!dep&&G.run&&h>0&&G.run.tv<100){const add=thonapPct()*h/HM/(lkOn()?LK_MUL:1);if(add>0)addTv(add);}return o;};}
// Lịch luyện: như tu vi nhưng chỉ có được nhờ thực chiến và đi lại giang hồ. Lưu theo % như tu vi.
// Tu vi bỏ xa lịch luyện thì tu vi thực nhận giảm dần (mọi nguồn, kể cả đan dược):
// vượt dưới 20% nhận đủ; 30% còn 70%; 40% còn 35%; 60% còn 10%; từ 70% trở lên chỉ còn 2% (bình cảnh).
// Lịch luyện cao hơn tu vi thì được ngộ đạo: nhận thêm tối đa 15%.
// Muốn đột phá phải có lịch luyện ít nhất 70%. Đột phá xong lịch luyện về 0, giữ lại 20% phần vượt quá 100%.
const LL_T=[[20,1],[30,.7],[40,.35],[60,.1],[70,.02]],LL_BT=100,LL_MAX=150,LL_CAPE=0.05; // dưới 5% coi như chạm đáy
function llOf(){return (G.run&&G.run.ll)||0;}
function llEff(tv){const ll=llOf();const gap=tv-ll;if(gap<0)return 1+Math.min(0.15,-gap/100*0.5);if(gap<=LL_T[0][0])return 1;
  for(let i=1;i<LL_T.length;i++){const [g1,e1]=LL_T[i-1],[g2,e2]=LL_T[i];if(gap<=g2)return e1+(e2-e1)*(gap-g1)/(g2-g1);}return LL_T[LL_T.length-1][1];}
function tvSimAdd(raw){const r=G.run;let add=0,rem=raw;while(rem>1e-9&&r.tv+add<100){const st=Math.min(rem,0.5);add+=st*llEff(r.tv+add);rem-=st;}return Math.min(add,100-r.tv);}
// tu vi luôn cộng theo số nguyên: phần lẻ dồn lại cho lần sau
{const _at10=addTv;addTv=function(x){const r=G.run;if(!(x>0)||!r)return _at10(x);const P=tvPts(r.realm)/100;const raw=tvSimAdd(x)*P+(r.tvAcc||0);const pts=Math.floor(raw+1e-9);r.tvAcc=raw-pts;if(pts<=0)return;
  const res=_at10(pts/P);if(G.run&&G.run.tv<100)G.run.tv=Math.round(G.run.tv*P)/P;return res;};}
// bế quan tới mức nào thì chạm đáy (chỉ còn 2%): trả về số năm, hoặc null nếu 5 năm vẫn chưa chạm
function bqCapY(){const r=G.run;if(r.tv>=100)return null;for(let y=0.25;y<=5;y+=0.25){const raw=bqReal()*y*(y<1?0.9:1)+thonapPct()*y*12;if(llEff(r.tv+tvSimAdd(raw))<=LL_CAPE)return y;}return null;}
function llPtsOf(){return Math.round(llOf()/100*tvPts(G.run.realm));}
function llAdd(x,why,quiet){const r=G.run;if(!r||!(x>0))return 0;const P=tvPts(r.realm)/100;const pts=Math.max(1,Math.round(x*P));const b=r.ll||0;r.ll=Math.min(LL_MAX,Math.round((b*P+pts))/P);const d=Math.round((r.ll-b)*P);
  if(d>0&&!quiet){const dp=llShowGain(d/P);if(why)log(`Lịch luyện +${dp}% (${why}).`);const sc=r.scene;if(sc&&sc.type==='combat')sc.llGain=(sc.llGain||0)+d;else if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('⚔','+'+dp+'% lịch luyện','Lịch luyện: '+why,'up'));else note('+'+dp+'% lịch luyện · '+why);}return d;}
{const _cb10=canBreak;canBreak=function(){return _cb10()&&llOf()>=llNeedBt();};}
{const _bf10=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bf10.apply(this,arguments);if(G.run&&G.run.realm>rl)G.run.ll=Math.max(0,(G.run.ll||0)-100)*0.2;return res;};}
// nguồn lịch luyện
{const _fc10=finishCombat;finishCombat=function(sc){const res=_fc10(sc);try{const r=G.run;if(r&&!sc.spar&&!sc.kiep&&sc.en&&sc.en.k!=='tamma'&&sc.over!=='dead'){
  const foes=sc.units.filter(u=>u.side==='B'&&!u.immune);const fl=foes.reduce((a,u)=>a+lcCalc(u),0);const ratio=clamp(fl/Math.max(1,lucChien()),0.15,2);
  const me=mainUnit(sc);const k=sc.en.k||sc.en.n;r.llSeen=r.llSeen||{};const cnt=r.llSeen[k]||0;r.llSeen[k]=cnt+1;
  let g=(sc.over==='win'?9:sc.over==='lose'?3:1)*Math.pow(ratio,0.8)/(1+0.25*cnt);if(sc.over==='win'&&me&&me.hp<me.max*0.2)g*=1.5;
  llAdd(g,sc.over==='win'?'thắng trận':'trận thua');}}catch(e){console.error(e);}return res;};}
{const _op10=openPlace;openPlace=function(id){_op10(id);const r=G.run;if(!r||!r.scene)return;r.llP=r.llP||[];const k=r.scene.id;if(!r.llP.includes(k)){r.llP.push(k);llAdd(4,'tới nơi mới');}};}
{const _me10=meetEnt;meetEnt=function(e){const res=_me10(e);const r=G.run;if(r&&e){r.llN=r.llN||[];const k=e.name||e.id;if(!r.llN.includes(k)){r.llN.push(k);llAdd(3,'quen người mới');}}return res;};}
{const _qw10=questWin;questWin=function(q){const res=_qw10(q);if(res&&res.length)llAdd(5,'xong việc');return res;};}

// ================= ĐỢT 12: ĐÁNH NHAU KHÔNG CHO TU VI; LỰA CHỌN Ở TRÀ LÂU, KHÁCH ĐIẾM, TỬU PHƯỜNG =================
// Trong lúc xử lý kết quả một trận, mọi phần thưởng tu vi đổi thành lịch luyện (một nửa).
let FIGHT_OUT=0;
function llChipMerge(L,d){if(!(d>0))return;d=Math.max(1,Math.round(d/(tvPts(G.run.realm)/100)));const c=L.find(x=>x&&x.i==='⚔');if(c){c.t='+'+(parseInt(c.t.replace(/\D/g,''))+d)+'% lịch luyện';}else L.unshift(chip('⚔','+'+d+'% lịch luyện','Lịch luyện: có được nhờ thực chiến','up'));}
{const _ae12=applyE;applyE=function(e,v){if(FIGHT_OUT&&e&&e.tv>0){e=Object.assign({},e);const x=e.tv*0.5;delete e.tv;const ch=_ae12(e,v);llChipMerge(ch,llAdd(x,null,true));return ch;}return _ae12(e,v);};}
{const _cc12=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const g=sc0&&sc0.llGain||0;FIGHT_OUT=1;let res;try{res=_cc12();}finally{FIGHT_OUT=0;}
  const sc=G.run&&G.run.scene;if(g&&sc&&sc!==sc0){if(!Array.isArray(sc.chips))sc.chips=[];llChipMerge(sc.chips,g);}return res;};}

// Trà lâu, khách điếm, tửu phường: chạm vào thì hiện vài lựa chọn. Mỗi lựa chọn có giá (giờ, linh thạch),
// có thể đòi chỉ số (ngộ tính, đạo tâm...), và đôi khi có chuyện đặc biệt chỉ còn trong ít giờ.
const VENUE_N={tea:'Trà lâu',inn:'Khách điếm',tuu:'Tửu phường'};
const VENUE_IN={tea:['Trà lâu ồn ào tiếng quạt giấy và chén sứ. Tiểu nhị đon đả chạy ra.','Mùi trà mới pha thơm lừng. Bàn nào cũng có người bàn chuyện thiên hạ.'],
  inn:['Chưởng quầy ngẩng lên khỏi bàn tính, cười: “Khách quan nghỉ chân hay ở trọ?”','Khách điếm hai tầng, dưới ăn trên ngủ. Tiếng bát đũa lách cách.'],
  tuu:['Tửu phường nồng mùi rượu và mồ hôi. Giữa phòng có người đang vỗ bàn ca hát.','Vò rượu xếp chồng tận trần. Tửu khách nhìn ngươi từ đầu tới chân.']};
const VENUE_SP={tea:{id:'doicau',l:'Thi đối câu đối của lão tú tài',d:'Lão tú tài treo giải: ai đối được vế của lão thì nhận một túi linh thạch.',h:1,req:['ngo',14,'Ngộ tính'],g:{st:12,ll:2}},
  inn:{id:'hotong',l:'Nhận lời hộ tống một thương nhân',d:'Một thương nhân đang tìm người hộ tống qua đoạn đường vắng. Trả công hậu, nhưng dễ đụng cướp.',h:4,g:{st:15},fight:1},
  tuu:{id:'gaysu',l:'Dạy cho gã say gây sự một bài học',d:'Một gã say đập bàn, chửi bới, giật đồ của tửu khách. Không ai dám can.',h:1,g:{st:6,karma:1},fight:1}};
function venueSpec(n,v){const r=G.run,w=W();if(!n.vsp||n.vsp.k!==r.kiep||n.vsp.v!==v||w.t>n.vsp.until){n.vsp={k:r.kiep,v,until:chance(.35)?w.t+ri(4,12):-1};}return n.vsp.until>w.t?n.vsp.until-w.t:0;}
function venueOpts(n,v){const s=S(),r=G.run;const hp=s.maxHp,L=[];const add=o=>L.push(o);
  if(v==='tea'){add({id:'nghe',l:'Gọi ấm trà, ngồi nghe chuyện',d:'Ngồi một góc, nghe bàn bên kể chuyện: biết thêm một nơi chưa tới quanh đây và tin tức giang hồ.',h:1,g:{info:1}});
    add({id:'hoi',l:'Dúi tiền hỏi tiểu nhị đường đi',d:'Tiểu nhị chạy bàn khắp nơi, biết nhiều. Cho ít tiền, hắn chỉ cho ngươi hai nơi quanh vùng.',h:1,st:price(1),g:{info:2}});
    add({id:'co',l:'Đánh một ván cờ với khách lạ',d:'Ông khách áo xám bày sẵn bàn cờ. Thắng được thì ông ta kể cho nghe chuyện đi đường, coi như lịch luyện.',h:2,req:['ngo',12,'Ngộ tính'],g:{ll:3,tamma:-2}});
    add({id:'tinh',l:'Ngồi yên thưởng trà, tĩnh tâm',d:'Không nghe, không nói, chỉ ngồi uống trà nhìn người qua lại. Lòng lắng xuống.',h:2,st:price(1),g:{tamma:-4}});}
  if(v==='inn'){add({id:'phong',l:'Thuê phòng thường, ngủ một đêm',d:'Phòng chật nhưng sạch. Ngủ một giấc là hồi đầy khí huyết, linh lực.',h:8,st:price(4),g:{hp:hp-r.hp,mp:s.maxMp-r.mp,tamma:-2}});
    add({id:'thuong',l:'Thuê phòng thượng hạng có tụ linh trận',d:'Phòng tốt nhất, dưới sàn khắc tụ linh trận nhỏ. Ngủ dậy hồi đầy, tâm lắng hẳn, tu vi nhích lên chút ít.',h:8,st:price(10),g:{hp:hp-r.hp,mp:s.maxMp-r.mp,tamma:-6,tv:1}});
    add({id:'an',l:'Ngồi sảnh dưới ăn một bữa',d:'Bát cơm nóng, đĩa thịt kho. Ăn no thì khí huyết hồi một ít.',h:1,st:price(1),g:{hp:Math.min(hp-r.hp,Math.round(hp*0.15))}});
    add({id:'chuong',l:'Hỏi chưởng quầy có chuyện gì lạ',d:'Chưởng quầy gặp đủ loại khách, nghe đủ loại chuyện. Hỏi thì biết thêm tin tức.',h:1,g:{info:1}});}
  if(v==='tuu'){add({id:'chen',l:'Uống vài chén, nghe chuyện',d:'Rượu nhạt mà cay. Uống xong thì người ấm lên, tâm ma nguôi bớt, nghe được ít tin tức.',h:3,st:price(2),g:{hp:Math.min(hp-r.hp,Math.round(hp*0.1)),tamma:-4,info:1}});
    add({id:'moi',l:'Mời cả bàn một vò rượu ngon',d:'Bỏ tiền mời rượu, làm quen tửu khách khắp nơi. Nghe được chuyện giang hồ, coi như lịch luyện.',h:3,st:price(6),g:{tamma:-5,ll:3,info:1}});
    add({id:'dau',l:'Đấu rượu với gã tửu khách to con',d:'Gã to con thách ai uống thắng được hắn thì lấy hết tiền cược trên bàn. Cần đạo tâm vững để không gục.',h:2,req:['tam',11,'Đạo tâm'],g:{st:price(5),ll:1}});
    add({id:'ca',l:'Nghe ca kỹ đàn hát',d:'Một khúc tì bà, giọng hát trong veo. Lòng nhẹ hẳn đi.',h:2,st:price(3),g:{tamma:-8}});}
  const left=venueSpec(n,v);if(left>0){const o=Object.assign({},VENUE_SP[v],{spec:left});if(o.id==='gaysu'||o.id==='hotong')o.g=Object.assign({},o.g);add(o);}
  for(const o of L){o.st=o.st||0;o.no=r.st<o.st?'Không đủ linh thạch':'';if(o.req&&(s[o.req[0]]||0)<o.req[1])o.lack=o.req[2]+' cần '+o.req[1]+', ngươi có '+(s[o.req[0]]||0);}
  return L;}
function venueDo(v,id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const o=venueOpts(n,v).find(x=>x.id===id);if(!o||o.no||o.lack)return false;
  r.st-=o.st;advanceTime(o.h);if(!G.run||G.run.scene!==sc)return true;sc.msg=[];let ch=[];
  if(o.st)ch.push(chip('💎','−'+o.st,'Linh thạch','dn'));ch.push(chip('⏳',durH(o.h),'Thời gian trôi qua',''));
  const g=o.g||{};
  if(o.fight){n.vsp.until=-1;sc.venue=null;if(o.id==='gaysu')sc.msg=['Ngươi đứng dậy, gõ nhẹ lên bàn gã say. Gã quay lại, mắt đỏ ngầu.'];else sc.msg=['Đi được nửa đường, một toán cướp nhảy ra chặn xe.'];
    startCombat({cnt:o.id==='hotong'?2:1},{kind:'node'});const cs=G.run.scene;if(cs)cs.venueWin=g;return true;}
  if(o.spec)n.vsp.until=-1;
  if(g.info){if(v==='tea'&&id==='nghe'||v==='tuu'||v==='inn'){teaHouse(n);}else{for(let i=0;i<g.info;i++){const c=regionOf(r.region).nodes.filter(x=>x.fog===0);if(c.length){const x=pick(c);hearOf(x);sc.msg.push('Tiểu nhị chỉ đường tới '+x.name+'.');}}}}
  const LEAD={tea:{nghe:[''],hoi:['Tiểu nhị nhận tiền, ghé tai nói nhỏ.','Tiểu nhị đút tiền vào tay áo, kéo ngươi ra góc khuất.','“Khách quan hỏi đúng người rồi.” Tiểu nhị cười hề hề.'],
      co:['Ván cờ kéo dài tới khi trà nguội. Ông khách thua, cười khà, kể cho ngươi nghe chuyện đi đường.','Hai bên giằng co từng nước. Cuối cùng ông khách buông quân, kể chuyện một chuyến vượt núi năm xưa.','Ông khách đi nước nào cũng chậm rãi. Thua rồi, ông ta chỉ cho ngươi mấy mẹo sống sót nơi hoang dã.'],
      tinh:['Ngươi ngồi yên, nhìn khói trà bay lên. Lòng lắng như mặt hồ.','Tiếng ồn quanh quán dần xa. Chỉ còn hơi trà ấm trong tay.','Nắng xiên qua song cửa. Ngươi uống cạn chén, thấy lòng nhẹ hẳn.'],doicau:['Ngươi viết vế đối. Lão tú tài đọc đi đọc lại, rồi vỗ đùi: “Hay!”']},
    inn:{phong:['Phòng chật nhưng sạch, chăn có mùi nắng. Ngươi ngủ một giấc ngon.','Đêm nay mưa rơi lộp độp trên mái. Ngươi ngủ say tới sáng.','Phòng cũ, giường kêu cót két. Nhưng mệt quá, ngươi vẫn ngủ một mạch.'],
      thuong:['Tụ linh trận rì rầm suốt đêm. Sáng ra ngươi thấy tinh thần sảng khoái lạ thường.','Linh khí trong phòng đặc như sương. Ngươi ngủ mà như đang tĩnh tọa.','Hương trầm thoảng nhẹ, trận văn dưới sàn lấp lánh. Ngươi thức dậy, thân thể nhẹ bẫng.'],
      an:['Cơm nóng, canh ngọt. Ăn xong thấy người khỏe ra.','Hôm nay quán có cá kho. Ngươi ăn hết hai bát.','Bánh bao nóng hổi, trà gừng cay cay. Người ấm hẳn lên.'],chuong:['Chưởng quầy hạ giọng kể chuyện mấy vị khách lạ.','Chưởng quầy lật sổ, chỉ vào vài cái tên lạ mới ghi tuần trước.','“Chuyện thì nhiều, khách quan muốn nghe chuyện gì?” Chưởng quầy rót thêm trà.']},
    tuu:{chen:['Ba chén vào bụng, lòng nhẹ đi đôi chút.','Rượu nhạt mà cay. Bàn bên to tiếng, ngươi nghe được vài câu.','Chưởng quầy rót đầy chén, kể chuyện không ai hỏi.'],moi:['Cả bàn nâng chén. Người nào cũng có một chuyện để kể.','“Đạo hữu hào sảng!” Mấy tửu khách xúm lại, kể chuyện giang hồ tới khuya.','Vò rượu ngon vừa mở, cả quán quay sang. Ngươi làm quen thêm mấy gã giang hồ.'],
      dau:['Chén thứ mười hai, gã to con gục xuống bàn. Cả quán vỗ tay.','Gã to con uống tới chén thứ chín thì lăn ra ngủ. Tiền cược về tay ngươi.','Hai bên uống tới khi trời sáng. Gã to con chịu thua, móc túi trả cược.'],
      ca:['Khúc nhạc dứt, ngươi mới nhận ra mình đã ngồi rất lâu.','Ca kỹ hát một khúc biệt ly. Cả quán lặng đi.','Tiếng tì bà như mưa rơi trên lá chuối. Lòng ngươi dịu lại.']}};
  sc.lastL=sc.lastL||{};const pool=(LEAD[v]&&LEAD[v][id])||[''];const cands=pool.filter(x=>x!==sc.lastL[v+id]);const lead=pick(cands.length?cands:pool);sc.lastL[v+id]=lead;
  if(lead)sc.msg.unshift(lead);
  if(g.hp>0)r.hp=Math.min(S().maxHp,r.hp+g.hp);if(g.mp>0)r.mp=Math.min(S().maxMp,r.mp+g.mp);if(g.hp>0)ch.push(chip('❤️','+'+g.hp,'Khí huyết','up'));
  if(g.tamma<0&&r.tamma<=0)sc.msg.push('Lòng ngươi vốn đã yên, chẳng còn tâm ma nào để gột.');
  const e={};if(g.tamma)e.tamma=g.tamma;if(g.st)e.st=g.st;if(g.karma)e.karma=g.karma;if(g.tv)e.tv=g.tv;ch=ch.concat(applyE(e));
  if(g.ll){const d=llAdd(g.ll,null,true);llChipMerge(ch,d);}
  if(!sc.msg.length)sc.msg=['Trà nhạt, chuyện cũng nhạt.'];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;return true;}
// chuyện đặc biệt có đánh nhau: thắng thì nhận công
{const _cc12b=combatContinue;combatContinue=function(){const sc0=G.run&&G.run.scene;const vw=sc0&&sc0.venueWin;const win=sc0&&sc0.over==='win';const res=_cc12b();
  if(vw&&win&&G.run&&G.run.scene){const ps=G.run.scene;const ch=applyE({st:vw.st||0,karma:vw.karma||0});ps.chips=(ps.chips||[]).concat(ch);}return res;};}
// khách điếm, tửu phường giờ có nhiều lựa chọn giá khác nhau: không khóa ô vì thiếu tiền
{const _pa12=placeActs;placeActs=function(n){const L=_pa12(n);const r=G.run;for(const a of L){if(a.a==='inn'||a.a==='tuu'){a.dis=false;a.x='';a.h=0;}if(a.a==='tea')a.h=0;}return L;};}
{const _pa12b=placeAct;placeAct=function(a){if(VENUE_N[a]){const sc=G.run&&G.run.scene;if(sc)sc.venue=a;return;}return _pa12b(a);};}
// Chiến lợi phẩm: rớt ngẫu nhiên, không cho chọn. Thường 0–1 món, tinh anh 1–2, thủ lĩnh 2.
{const _rw13=rewardScene;rewardScene=function(kind,en){_rw13(kind,en);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='reward'||!sc.picks||!sc.picks.length)return;
  const n=kind==='boss'?2:kind==='elite'?ri(1,2):1;const P=sc.picks.slice();const got=[];
  for(let k=0;k<n&&P.length;k++){const i=Math.floor(R()*P.length);got.push(P.splice(i,1)[0]);}
  sc.picks=got;for(let i=0;i<got.length;i++){sc.taken=-1;takePick(i);}sc.picks=[];sc.taken=0;};}
