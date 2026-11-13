// ===== Chỉ số khi lên cảnh giới: căn cốt bẩm sinh gần như đứng yên, cái luyện ra thì tăng mạnh =====
// ngộ tính: rất ít (+1 mỗi 2 đại cảnh giới); đạo tâm, khí vận, tư chất: không đổi theo cảnh giới;
// thần thức (thần lực) và thân pháp: tăng rất mạnh; chỉ số chiến đấu: như cũ (tăng mạnh); chí mạng, bạo thương: tăng ít.
{const _Sx=S;S=function(){const s=_Sx();const r=G.run;if(!r)return s;const R0=r.realm||0,t=tieu();
  s.ngo+=Math.floor(R0/2)-R0*2;s.tam-=R0*2;
  s.tp+=R0*6+t;s.ne+=R0*6+t;
  s.than=Math.round(s.than-2*R0+15*R0+t*1.5);s.nl=Math.round(s.than*3);
  s.crit+=R0*0.6;s.critDmg+=R0*4;
  // đại viên mãn: +5% khí huyết, linh lực, công, thủ
  if(dvm()){for(const k of ['maxHp','maxMp','atk','def','matk'])s[k]=Math.round(s[k]*1.05);s.dvm=1;}
  return s;};}
// bù cho tỉ lệ đột phá (trước đây ngộ tính, đạo tâm tự tăng theo cảnh giới và góp vào tỉ lệ)
{const _brx=btRate;btRate=function(slots){const r=G.run;const R0=r.realm||0;return clamp(_brx(slots)+(R0*4-Math.floor(R0/2))*0.012,0.05,0.97);};}
// tâm ma giảm nhẹ khi xung kích tiểu cảnh giới / đột phá đại cảnh giới
{const _xk=lkXk;lkXk=function(){const ok=_xk.apply(this,arguments);const r=G.run;if(ok&&r)r.tamma=Math.max(0,(r.tamma||0)-2);return ok;};}
{const _bfz=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bfz.apply(this,arguments);const r2=G.run;if(r2&&r2.realm>rl)r2.tamma=Math.max(0,(r2.tamma||0)-5);return res;};}

// ===== Tiểu cảnh giới: sơ kỳ → trung kỳ → hậu kỳ → đỉnh phong (đầy tu vi) → đại viên mãn =====
TIEU[3]='đỉnh phong';
// Luyện Khí: tầng 1–3 sơ, 4–6 trung, 7–9 hậu, 10–12 đỉnh phong, 13 bán bộ Trúc Cơ
{const _ti=tieu;tieu=function(){if(typeof lkOn==='function'&&lkOn()){const g=lkTang();return g>=10?3:g>=7?2:g>=4?1:0;}return _ti();};}
function dinhPhong(){const r=G.run;return !!(r&&!isPham()&&r.realm<5&&tieu()===3);}
const DVM_TAMMA=25,DVM_TAM=12; // đại viên mãn: tâm ma dưới 25, đạo tâm từ 12 (mức Cao)
function dvmTam(){const r=G.run;return r.base.tam+(r.bon.tam||0)+((aggFx().tam)||0);}
function dvmWhy(){const r=G.run;if(!dinhPhong())return 'chưa tới đỉnh phong';const L=[];if(injured())L.push('đang trọng thương');if((r.tamma||0)>=DVM_TAMMA)L.push('tâm ma từ '+DVM_TAMMA+' trở lên');if(dvmTam()<DVM_TAM)L.push('đạo tâm chưa đủ cao');return L.join(', ');}
let _dvmIn=0;function dvm(){if(_dvmIn)return false;_dvmIn=1;try{return dinhPhong()&&!dvmWhy();}finally{_dvmIn=0;}}

// ===== Bán bộ: dùng được đồ của cảnh giới sau, chỉ số vẫn như cũ =====
//  · tạm thời: xung quan thành công, đang vượt thiên kiếp/tâm ma kiếp
//  · lâu dài: Luyện Khí tầng 13; hoặc đang đỉnh phong và vận hành tâm pháp của cảnh giới sau
function chuRaw(){const r=G.run;const n=chuSlots();const L=[];for(let i=0;i<n;i++){const a=r.chu[i]&&artBy(r.chu[i].u);if(a)L.push(a);}return L;}
function bbTemp(){const r=G.run;return !!(r&&r.bt&&r.bt.stages&&r.bt.stages.length&&r.bt.to===r.realm+1);}
function bbKind(){const r=G.run;if(!r||isPham()||r.realm>=5)return '';if(bbTemp())return 'temp';if(lkOn()&&lkTang()>=13)return 'lk13';
  if(dinhPhong()&&chuRaw().some(a=>a.type==='tp'&&a.req===r.realm+1))return 'tp';return '';}
function bb(){return !!bbKind();}
function effRealm(){const r=G.run;return (r.realm||0)+(bb()?1:0);}
{const _plv=plv;plv=function(){return _plv()+(G.run&&!isPham()&&bb()?1:0);};}
// tầng công pháp và học bí tịch theo cảnh giới hiệu lực
artOpen=function(a,i){const x=a.lines[i];return i<a.lv&&effRealm()>=x.req;};
artNextWhy=function(a){if(a.lv>=a.lines.length)return 'Đã tham ngộ hết các tầng.';const x=a.lines[a.lv];if(effRealm()<x.req)return 'Tầng kế tiếp cần '+reqName(x.req)+'.';return '';};
// ngộ tính vượt xa người thường: đọc hiểu được công pháp/tâm pháp của cảnh giới kế tiếp (mức Tinh anh, Thiên kiêu)
const NGO_BB={1:20,2:24,3:28,4:32};
function ngoLearn(req){const r=G.run;return req===r.realm+1&&NGO_BB[req]!=null&&S().ngo>=NGO_BB[req];}
{const _lw=learnWhy;learnWhy=function(rel){const r=G.run;const w=_lw(rel);if(!w||!rel||!rel.art||!/mới đọc hiểu/.test(w))return w;const q=rel.art.req;
  if(effRealm()>=q||ngoLearn(q))return '';return w+(q===r.realm+1&&NGO_BB[q]?' Hoặc ngộ tính từ '+NGO_BB[q]+' (đang có '+S().ngo+').':'');};}
// công pháp/tâm pháp vượt cảnh giới: học được nhưng chưa chắc dùng được
function artUseWhy(a){const r=G.run;if(!a||a.req<=effRealm())return '';if(a.req===r.realm+1&&a.type==='tp'){return dinhPhong()?'':'Tâm pháp '+reqName(a.req)+': phải tới đỉnh phong mới vận hành được.';}
  return 'Cần '+reqName(a.req)+' (hoặc bán bộ '+reqName(a.req)+') mới dùng được.';}
{const _aa=activeArts;activeArts=function(){return _aa().filter(a=>!artUseWhy(a));};}
// Thiên đạo Trúc Cơ: chắc chắn gặp 3 đạo lôi kiếp
{const _bs=btStages;btStages=function(to){const L=_bs(to);const r=G.run;if(to===1&&tcOn()&&tcQual(r._tcDan,r.dao||0).q===3)return [{n:3}];return L;};}
// tên cảnh giới hiển thị
{const _rl=realmLabel;realmLabel=function(){const r=G.run;if(!r||isPham())return _rl();const k=bbKind();if(k&&k!=='temp'&&r.realm<5)return 'Bán bộ '+REALM[r.realm+1];if(k==='temp')return 'Bán bộ '+REALM[r.realm+1]+' (đang độ kiếp)';
  const b=_rl();return dvm()?b.replace(/đỉnh phong$/,'')+(lkOn()?' · đại viên mãn':'đại viên mãn'):b;};}
// ===== Cưỡng ép lĩnh ngộ trước khi độ kiếp (đang bán bộ tạm thời) =====
WOUND.thanbb={n:'Thức hải trọng thương',m:[1,3],fx:{ngo:-3,tam:-2},d:'Cưỡng ép lĩnh ngộ công pháp cảnh giới trên để độ kiếp. Thần thức và niệm lực chỉ còn bốn phần mười.'};
const BB_THAN=0.4;
{const _Sb=S;S=function(){const s=_Sb();const r=G.run;if(r&&(r.wounds||[]).some(x=>x.k==='thanbb')){s.than=Math.round(s.than*BB_THAN);s.nl=Math.round(s.than*3);}return s;};}
function bbBooks(){const r=G.run;if(!r||!bbTemp())return [];return r.relics.map((x,i)=>({x,i})).filter(o=>o.x.k==='book'&&o.x.art&&o.x.art.req===r.realm+1&&!arts().some(a=>a.n===o.x.art.n&&a.type===o.x.art.type));}
function bbForceLearn(i){const r=G.run;const rel=r.relics[i];if(!rel||rel.k!=='book'||!bbTemp())return null;const a=rel.art;normArt(a);
  if(arts().filter(x=>x.type===a.type).length>=artCap(a.type))return 'Đã đủ ô '+(a.type==='cp'?'công pháp':'tâm pháp')+', không chứa thêm được.';
  r.relics.splice(i,1);r.arts.push(a);const n=chuSlots();for(let j=0;j<n;j++)if(!r.chu[j]){r.chu[j]={k:'a',u:a.u};break;}
  addWound('thanbb','cưỡng ép lĩnh ngộ');log(`Cưỡng ép lĩnh ngộ ${a.n} trước giờ độ kiếp, thức hải rạn nứt.`);syncSkills();clampHp();saveSoon();return '';}
// ===== Thần thức trong trận: đủ thì dò được khí huyết, linh lực, định lực… của đối phương =====
function unitLv(u){const r=G.run;if(u.kind==='kiep')return (r.bt&&r.bt.to)||r.realm+1;if(r.bt&&u.k==='tamma')return r.bt.to||r.realm+1;return (r.region||0)+(u.boss?1:u.elite?0.5:0);}
function seeNeed(u){return Math.round(10+10.5*unitLv(u));}
function canSee(u){if(!u||u.side!=='B')return true;return S().than>=seeNeed(u);}
// ===== Độ kiếp thành công: hồi đầy, xóa thương tích và trạng thái bất lợi =====
{const _bfk=btFinish;btFinish=function(){const r=G.run;const k=!!(r&&r.bt&&r.bt.stages&&r.bt.stages.length);const rl=r&&r.realm;const res=_bfk.apply(this,arguments);const r2=G.run;
  if(k&&r2&&r2.realm>rl){r2.wounds=(r2.wounds||[]).filter(x=>x.perm);r2.inj=null;r2.ht=[];const s=S();r2.hp=s.maxHp;r2.mp=s.maxMp;const sc=r2.scene;if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('✨','thân thể như mới','Độ kiếp thành công: hồi đầy, mọi thương tích và trạng thái bất lợi đều tan','up'));}
  return res;};}
// ===== Thần thức trong trận (bản mới): vượt cấp thì hầu như không thấy, trừ khi thần thức thật cao =====
// mức cần = thần thức của người bình thường ở cấp đối phương: 12 + 15 × cấp
unitLv=function(u){const r=G.run;if(u.kind==='kiep')return (r.bt&&r.bt.to)||r.realm+1;if(r.bt&&u.k==='tamma')return r.bt.to||r.realm+1;return (r.region||0)+(u.boss?0.6:u.elite?0.3:0);};
seeNeed=function(u){return Math.round(12+15*unitLv(u));};
// lý lịch (tên, chức vụ…) của người lạ: chỉ biết khi quen biết hoặc đã có tin tức
function knownNames(){const r=G.run,w=W();const K=new Set(r.known||[]);for(const x of r.rivals||[]){const wr=w.rivals[x.i];if(wr)K.add(wr.ten);}for(const s of r.seeds||[])K.add(s.ten);for(const p of r.party||[])K.add(p.ten);if(w.nemesis)K.add(w.nemesis.n);return K;}
function isHumanFoe(u){return u&&u.side==='B'&&u.kind!=='kiep'&&u.k!=='tamma'&&(u.f==='nhan'||u.kind==='nhan');}
function knowUnit(u){if(!isHumanFoe(u))return true;const n=u.realName||u.name;return knownNames().has(n);}
function addKnown(n){const r=G.run;if(!r||!n)return;r.known=r.known||[];if(!r.known.includes(n)){r.known.push(n);if(r.known.length>200)r.known.shift();}}
// trận đánh: người lạ hiện là "???"; đánh xong thì biết mặt biết tên
{const _scK=startCombat;startCombat=function(spec,after){const res=_scK(spec,after);const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat')for(const u of sc.units)if(isHumanFoe(u)&&!knowUnit(u)){if(sc.en&&sc.en.n===u.name){sc.en.realN=sc.en.n;sc.en.n='???';}u.realName=u.name;u.realSub=u.sub;u.name='???';u.sub='???';}return res;};}
{const _fcK=finishCombat;finishCombat=function(sc){if(sc&&sc.en&&sc.en.realN){sc.en.n=sc.en.realN;delete sc.en.realN;}if(sc&&sc.units)for(const u of sc.units)if(u.realName){addKnown(u.realName);u.name=u.realName;u.sub=u.realSub;}return _fcK(sc);};}
{const _me=meetEnt;meetEnt=function(e){if(e&&e.name)addKnown(e.name);return _me(e);};}

// ===== Học gấp cuốn thứ hai trước giờ độ kiếp: cần vật bảo mệnh và thần thức đủ, không thì thần thức tan vỡ mà chết =====
function bbGuards(){const r=G.run;return r.pills.map((p,i)=>({p,i})).filter(o=>PILL[o.p.id]&&PILL[o.p.id].bt&&PILL[o.p.id].bt.guard);}
function bb2Need(){const r=G.run;return Math.round((12+15*((r.bt&&r.bt.to)||r.realm+1))*0.5);}
function bbCount(){const r=G.run;return (r.bt&&r.bt.bbN)||0;}
{const _bfl=bbForceLearn;bbForceLearn=function(i){const r=G.run;const e=_bfl(i);if(e===''&&r.bt)r.bt.bbN=(r.bt.bbN||0)+1;return e;};}
// gi: chỉ số vật bảo mệnh trong túi đan (-1 = không dùng)
function bbForceLearn2(i,gi){const r=G.run;const rel=r.relics[i];if(!rel||!bbTemp())return null;
  const g=gi>=0?r.pills[gi]:null;const ok=g&&PILL[g.id].bt&&PILL[g.id].bt.guard&&S().than>=bb2Need();
  if(g&&PILL[g.id].bt&&PILL[g.id].bt.guard)r.pills.splice(gi,1);
  if(!ok){r.bt=null;die('thanvo',{n:'Thần thức tan vỡ'});return 'dead';}
  const e=bbForceLearn(i);if(e)return e;r.tamma=Math.min(100,(r.tamma||0)+10);log(`Lấy ${PILL[g.id].n} hộ thần thức, cưỡng ép lĩnh ngộ thêm ${rel.art?rel.art.n:'một môn'}.`);return '';}
// ===== Hậu thiên khí vận: cơ duyên có được sau mỗi lần đột phá đại cảnh giới (chọn 1 trong 3) =====
const HT_RANK=['','Hạ phẩm','Trung phẩm','Thượng phẩm','Cực phẩm'];
const HT_RW={1:40,2:33,3:20,4:7};
const HTKV=[
 {id:'ht_kiemy',r:1,n:'Kiếm Ý Sơ Thành',fx:{atkP:6,crit:1},d:'Công +6%, chí mạng +1%',st:'Lúc linh khí cuộn trào, {ten} bỗng thấy kiếm khí trong người tự tìm đường đi. Từ đó vung tay một cái, gió cũng phải nhường lối.'},
 {id:'ht_kimcot',r:1,n:'Kim Cốt Sơ Hiện',fx:{defP:7,hpP:3},d:'Thủ +7%, khí huyết +3%',st:'Xương cốt rèn qua thiên kiếp ánh lên sắc vàng nhạt. {ten} gõ nhẹ lên cánh tay mình, nghe như gõ vào chuông đồng.'},
 {id:'ht_linhtuyen',r:1,n:'Linh Tuyền Đan Điền',fx:{mpP:8},d:'Linh lực +8%',st:'Đan điền mở rộng như một mạch suối ngầm. Linh lực chảy vào không ngớt, rót mãi không đầy.'},
 {id:'ht_khinhthan',r:1,n:'Khinh Thân Như Yến',fx:{tp:2,dodge:2},d:'Thân pháp +2, né +2',st:'Thân thể nhẹ bẫng, {ten} đứng dậy mà ngỡ mình sắp bay lên. Gió núi lướt qua, áo không động.'},
 {id:'ht_tinhtam',r:1,n:'Tĩnh Tâm Như Thủy',fx:{tam:1,tammaRes:15},d:'Đạo tâm +1, kháng tâm ma +15%',st:'Sau cơn bão, lòng {ten} lặng như mặt hồ thu. Những tạp niệm cũ trôi qua như mây, không còn vướng lại.'},
 {id:'ht_tuluc',r:1,n:'Tụ Linh Chi Thể',fx:{tvP:6},d:'Tốc độ tu luyện +6%',st:'Linh khí quanh động phủ như có mắt, tự tìm tới thân {ten}. Ngồi yên một khắc bằng người khác ngồi nửa ngày.'},
 {id:'ht_lohoa',r:2,n:'Lô Hỏa Thuần Thanh',fx:{matkP:10,mpP:4},d:'Pháp công +10%, linh lực +4%',st:'Chân hỏa trong đan điền chuyển từ đỏ sang xanh. {ten} búng tay, đốm lửa nhỏ bay ra cháy mãi không tắt.'},
 {id:'ht_banthach',r:2,n:'Bàn Thạch Chi Khu',fx:{defP:10,hpP:8},d:'Thủ +10%, khí huyết +8%',st:'Thiên lôi đánh xuống mà thân thể chỉ hơi tê. {ten} biết từ nay mình đã có một tấm thân như đá tảng giữa dòng.'},
 {id:'ht_thanthuc',r:2,n:'Thức Hải Khai Khoát',fx:{than:6,ngo:1},d:'Thần thức +6, ngộ tính +1',st:'Thức hải rộng ra như biển sau mưa. Nhắm mắt lại, {ten} nghe được cả tiếng lá rơi ngoài trăm trượng.'},
 {id:'ht_trudiem',r:2,n:'Trường Sinh Chi Mạch',fx:{lifeP:8,hpP:4},d:'Thọ nguyên +8%, khí huyết +4%',st:'Một sợi sinh cơ xanh biếc quấn quanh tâm mạch. Tóc mai {ten} đen lại, khóe mắt bớt đi mấy nếp nhăn.'},
 {id:'ht_phong',r:2,n:'Ngự Phong Thân Pháp',fx:{tp:4,dodge:3},d:'Thân pháp +4, né +3',st:'Gió trên đỉnh núi như quen biết từ lâu. {ten} bước một bước, người đã ở ngoài mười trượng.'},
 {id:'ht_satkhi',r:2,n:'Sát Khí Ngưng Hình',fx:{atkP:9,critDmg:15},d:'Công +9%, bạo thương +15%',st:'Sát khí tích bao năm chiến đấu ngưng lại thành một luồng lạnh buốt. Thú dữ quanh núi im bặt khi {ten} bước ra.'},
 {id:'ht_ngodao',r:3,n:'Ngộ Đạo Linh Quang',fx:{ngo:2,tvP:10},d:'Ngộ tính +2, tốc độ tu luyện +10%',st:'Trong khoảnh khắc lôi quang tắt lịm, {ten} chợt thấy một tia linh quang. Bao điều trước nay mù mờ bỗng rõ như ban ngày.'},
 {id:'ht_hutien',r:3,n:'Hư Tiên Cốt',fx:{atkP:8,defP:8,hpP:8,mpP:8},d:'Công, thủ, khí huyết, linh lực +8%',st:'Thân thể được thiên kiếp tôi luyện từ trong ra ngoài. Mỗi tấc da thịt của {ten} đều ánh lên một tầng ánh ngọc nhàn nhạt.'},
 {id:'ht_thanthong',r:3,n:'Thần Thức Hóa Kiếm',fx:{than:12,crit:3},d:'Thần thức +12, chí mạng +3%',st:'Thần thức của {ten} sắc như lưỡi kiếm. Chỉ một ánh nhìn, kẻ yếu bóng vía đã thấy đầu óc ong ong.'},
 {id:'ht_bathu',r:3,n:'Bất Hủ Chi Tâm',fx:{tam:2,tammaRes:30,lifeP:6},d:'Đạo tâm +2, kháng tâm ma +30%, thọ nguyên +6%',st:'Qua kiếp nạn, lòng {ten} cứng như kim cương. Tâm ma gõ cửa, chỉ nghe thấy một khoảng lặng.'},
 {id:'ht_lucdao',r:4,n:'Lục Đạo Luân Hồi Ấn',fx:{atkP:14,defP:12,hpP:12,mpP:12,tvP:8},d:'Công +14%, thủ, khí huyết, linh lực +12%, tu luyện +8%',st:'Giữa lôi vân hiện ra một ấn ký sáu cánh, lặng lẽ in vào giữa trán {ten}. Trời đất như cúi đầu một khắc.'},
 {id:'ht_thienco',r:4,n:'Thiên Cơ Khai Nhãn',fx:{ngo:3,than:15,crit:4},d:'Ngộ tính +3, thần thức +15, chí mạng +4%',st:'Đôi mắt {ten} chợt nhìn thấu những sợi tơ vô hình giăng khắp thiên địa. Đó là thiên cơ, mấy ai được thấy một lần.'},
 {id:'ht_vanco',r:4,n:'Vạn Cổ Trường Thanh',fx:{lifeP:20,hpP:15,tammaRes:25},d:'Thọ nguyên +20%, khí huyết +15%, kháng tâm ma +25%',st:'Một gốc tùng cổ hiện ra trong thức hải {ten}, rễ cắm sâu vào hư không. Năm tháng từ nay trôi chậm hẳn quanh người.'},
];
const HTMAP={};for(const x of HTKV)HTMAP[x.id]=x;
function htOffer(n,to){const r=G.run;const own=r.htkv||[];const L=[];for(let i=0;i<n;i++){const left=HTKV.filter(x=>!own.includes(x.id)&&!L.includes(x.id));if(!left.length)break;
  const rk=wpick([1,2,3,4].filter(k=>left.some(x=>x.r===k)),k=>HT_RW[k]*Math.pow(1.5,((to||1)-1)*(k-1)/2));L.push(pick(left.filter(x=>x.r===rk)).id);}return L;}
function htChoose(i){const r=G.run;if(!r||!r.htPick)return null;const id=r.htPick[+i];r.htPick=null;if(!HTMAP[id])return null;(r.htkv=r.htkv||[]).push(id);log(`Nhận hậu thiên khí vận: ${HTMAP[id].n}.`);if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} được ${HTMAP[id].n} sau lần đột phá.`);const s=S();r.hp=s.maxHp;r.mp=s.maxMp;return id;}
{const _agH=aggFx;aggFx=function(){const fx=_agH();const r=G.run;if(r&&r.htkv)for(const id of r.htkv){const x=HTMAP[id];if(x)for(const k in x.fx)fx[k]=(fx[k]||0)+x.fx[k];}return fx;};}
// đột phá đại cảnh giới: thay lựa chọn tiên thiên khí vận bằng hậu thiên khí vận
{const _bfH=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const res=_bfH.apply(this,arguments);const r2=G.run;if(r2&&r2.realm>rl&&r2.realm<5){r2.kvPick=null;const o=htOffer(3,r2.realm);if(o.length)r2.htPick=o;}return res;};}