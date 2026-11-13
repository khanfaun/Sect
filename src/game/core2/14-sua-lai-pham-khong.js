// ----- sửa lại: phẩm không gắn với cảnh giới. Mỗi món có yêu cầu cảnh giới riêng, theo nơi nó xuất hiện -----
// Vùng 1 (Phàm Trần): cần Phàm nhân hoặc Luyện Khí; vùng 2: Luyện Khí hoặc Trúc Cơ; vùng 3: Trúc Cơ hoặc Kết Đan… Phẩm nào cũng có thể gặp ở mọi yêu cầu.
// Món cũ chưa có yêu cầu (bản lưu trước): coi như Phàm nhân dùng được.
function relReqRoll(){const r=G.run;const k=clamp((r&&r.region)||0,0,4);return clamp(k+(chance(k===0?0.4:0.5)?1:0),0,6);}
{const _gr31=genRelic;genRelic=function(t){const x=_gr31(t);if(x&&x.req==null)x.req=relReqRoll();return x;};}
relReq=function(rel){if(!rel||rel.k==='book')return 0;return rel.req!=null?rel.req:0;};
// ----- phẩm quyết định SỐ dòng chỉ số, cảnh giới yêu cầu quyết định ĐỘ LỚN chỉ số -----
// Mỗi món giữ chỉ số gốc theo loại (kiếm: công, giáp: thủ…); phẩm càng cao càng thêm nhiều dòng phụ:
//  phàm 0 · hoàng 1 · huyền 1 · địa 2 · thiên 2 · tiên 3 · thần 4 dòng phụ.
// Mọi dòng (gốc và phụ) nhân theo cảnh giới yêu cầu: Phàm nhân ×1 · Luyện Khí ×1,3 · Trúc Cơ ×1,7 · Kết Đan ×2,2 · Nguyên Anh ×2,8 · Hóa Thần ×3,5 · Độ Kiếp ×4,3.
// Nên món thần phẩm cần Trúc Cơ: nhiều dòng, số vừa; món phàm phẩm cần Hóa Thần: một loại chỉ số nhưng số rất lớn.
const REL_X=[0,1,1,2,2,3,4],REL_M=[1,1.3,1.7,2.2,2.8,3.5,4.3];
const REL_POOL={atkP:5,matkP:6,defP:8,hpP:6,mpP:8,tp:1,crit:3,critDmg:8,dodge:3,hoTam:3,van:1,tam:1,ngo:1,regenHp:1,regenMp:2,drain:3,tvP:5};
{const _gr32=genRelic;genRelic=function(t){const x=_gr32(t);if(!x)return x;const n=REL_X[clamp(x.tier||0,0,6)];const keys=Object.keys(REL_POOL).filter(k=>!(k in x.fx));x.fx2={};
  for(const k of shuffle(keys).slice(0,n))x.fx2[k]=REL_POOL[k];x.v2=1;return x;};}
{const _rf32=relicFx;relicFx=function(rel){if(!rel||!rel.v2)return _rf32(rel);const m=REL_M[clamp(rel.req||0,0,6)];const o=_rf32(Object.assign({},rel,{tier:0}));
  for(const k in o){if(['firstEvade','weakStart','vulnStart','pillSlot'].includes(k))continue;o[k]=k==='poisonHit'?Math.round(o[k]*m*100)/100:o[k]<0?Math.min(-1,Math.round(o[k]*m)):Math.max(1,Math.round(o[k]*m));}
  for(const [k,v] of Object.entries(rel.fx2||{})){const x=v*m;o[k]=(o[k]||0)+(['tp','van','tam','ngo','regenHp','regenMp'].includes(k)?Math.max(1,Math.round(x)):Math.round(x));}
  return o;};}
// "thêm ô đan dược" (pillSlot) trên vật phẩm: đan dược đã dùng chung túi đồ, nên đổi thành thêm ô túi đồ (chỉ tính đồ đang mặc, đang uẩn dưỡng)
FXT.pillSlot='👝 Túi đồ thêm {v} ô';
{const _bc33=bagCap;bagCap=function(){const r=G.run;const b=_bc33();if(!r)return b;const E=eqOf();let add=0;for(const x of Object.values(E))if(x)add=Math.max(add,relicFx(x).pillSlot||0);for(const d of r.dd||[])add=Math.max(add,relicFx(d.rel).pillSlot||0);return Math.min(BAG_MAX,b+add);};}

// ================= ĐỢT 31: NỘI TẠI CỦA VẬT PHẨM =================
// Chỉ số đặc biệt trên vật phẩm gọi là nội tại. Nội tại là duy nhất: mang nhiều món cùng nội tại thì chỉ tính món mạnh nhất, không cộng dồn.
// (Nội tại cùng loại từ tiên thiên khí vận, thể chất vẫn cộng bình thường.) Dòng phụ ngẫu nhiên không bao giờ là nội tại.
const NT_KEYS=['firstEvade','startBlock','blockTurn','weakStart','vulnStart','poisonHit','stunP','reflect','execute','drain','regenHp','regenMp','healAfter','hoTam','pillP','stonesP','pillSlot','shopP','tammaRes','elX','craftP','bqSafe','bqP'];
for(const k of ['hoTam','drain','regenHp','regenMp'])delete REL_POOL[k];
function relActive(){const r=G.run;if(!r)return [];const E=eqOf();const L=Object.values(E).filter(Boolean).map(x=>({rel:x,m:1}));for(const d of r.dd||[]){const m=ddMul(d),fx={};for(const k in d.rel.fx)fx[k]=typeof d.rel.fx[k]==='number'?d.rel.fx[k]*m:d.rel.fx[k];L.push({rel:Object.assign({},d.rel,{fx}),m:1});}return L;}
{const _ag34=aggFx;aggFx=function(){const fx=_ag34();const r=G.run;if(!r||!r.eq)return fx;const A=relActive();
  for(const k of NT_KEYS){if(k==='elX')continue;let sum=0,max=0;for(const {rel,m} of A){const v=(relicFx(rel)[k]||0)*m;sum+=v;if(v>max)max=v;}if(sum>max)fx[k]=(fx[k]||0)-sum+max;}
  const byEl={};for(const {rel,m} of A){const v=(relicFx(rel).elX||0)*m;if(!v)continue;const e=rel.el;const o=byEl[e]||(byEl[e]={s:0,x:0});o.s+=v;o.x=Math.max(o.x,v);}
  for(const [e,o] of Object.entries(byEl))if(o.s>o.x&&fx.elP)fx.elP[e]=(fx.elP[e]||0)-o.s+o.x;
  // nội tại dạng đếm (né mấy đòn, mấy lượt suy nhược…) luôn là số nguyên
  for(const k of ['firstEvade','weakStart','vulnStart'])if(fx[k])fx[k]=Math.floor(fx[k]+1e-9);
  return fx;};}
// tên gọi của từng nội tại (nội tại cùng tên không cộng dồn)
const NT_NAME={firstEvade:'Tàn Ảnh',startBlock:'Kim Chung Tráo',blockTurn:'Huyền Vũ Thuẫn',weakStart:'Nhiếp Hồn Âm',vulnStart:'Khổn Tiên Tác',poisonHit:'Vạn Độc Phệ',
 stunP:'Phiên Thiên Ấn',reflect:'Phản Chiếu',execute:'Đoạn Mệnh',drain:'Thôn Huyết',regenHp:'Sinh Sinh Bất Tức',regenMp:'Linh Tuyền',healAfter:'Cam Lộ',hoTam:'Hộ Tâm Kính',
 pillP:'Đan Hỏa',stonesP:'Tụ Bảo',pillSlot:'Càn Khôn',shopP:'Thương Hội Lệnh',tammaRes:'Thanh Tâm',elX:'Linh Dẫn',craftP:'Thiên Công',bqSafe:'Hộ Pháp Trận',bqP:'Tụ Linh Trận'};
// ----- cân lại lịch luyện: đột phá cần đầy 100% (trước là 70%) nên mọi nguồn lịch luyện nhân 1,45;
// đánh lại cùng loại địch giảm chậm hơn (mỗi lần trước −25%, nay −12%) -----
const LL_MUL=1.45;
{const _la35=llAdd;llAdd=function(x,why,quiet){return _la35(x>0?x*LL_MUL:x,why,quiet);};}
{const _fc35=finishCombat;finishCombat=function(sc){const r=G.run;const k=sc&&sc.en&&(sc.en.k||sc.en.n);let keep=null;
  if(r&&k&&r.llSeen&&r.llSeen[k]){keep=r.llSeen[k];r.llSeen[k]=Math.floor(keep*0.48);}const res=_fc35(sc);if(G.run&&keep!=null&&G.run.llSeen)G.run.llSeen[k]=keep+1;return res;};}
// lên cảnh giới mới (kể cả dẫn khí nhập thể): nơi đã tới, người đã quen, địch đã đánh đều được "nhìn bằng con mắt mới", lại cho lịch luyện như lần đầu
function llFresh(){const r=G.run;if(!r)return;r.llP=[];r.llN=[];r.llSeen={};}
{const _pu35=phamUp;phamUp=function(){const was=G.run&&G.run.pham;const res=_pu35.apply(this,arguments);if(was&&G.run&&!G.run.pham)llFresh();return res;};}
{const _bf35=btFinish;btFinish=function(){const rl=G.run&&G.run.realm;const res=_bf35.apply(this,arguments);if(G.run&&G.run.realm>rl)llFresh();return res;};}
// ----- món độc nhất (Kiếm Gãy Vô Danh, Nhẫn Sắt Cũ…): theo luật mới -----
// Có cảnh giới yêu cầu theo nơi nhận được (lệnh bài đệ tử, di vật kiếp trước, linh thú: ai cũng dùng được);
// chỉ số nhân theo cảnh giới yêu cầu như mọi món khác; không thêm dòng phụ (chỉ số của chúng đã là độc nhất).
{const _ur36=uniqueRelic;uniqueRelic=function(id){const x=_ur36(id);if(!x)return x;x.req=['lenhtong','mocu','linhthu'].includes(id)?0:relReqRoll();x.v2=1;x.fx2={};return x;};}
// chỉ số âm hiện "−3" thay vì "+-3"
{const _fl36=fxLines;fxLines=function(fx,rel){return _fl36(fx,rel).map(s=>s.replace(/\+-/g,'−'));};}

// ================= ĐỢT 32: CHỈ SỐ SÀN VÀ ĐÁNH GIÁ 5 MỨC =================
// Chỉ số sàn: chỉ số của một nhân vật chuẩn ở ĐÚNG đại cảnh giới và tiểu cảnh giới hiện tại (phàm nhân tính riêng):
// không đồ, không công pháp, không khí vận, thể chất, không nâng cấp Bến Vong Xuyên, không phẩm chất cảnh giới;
// tam linh căn, tư chất trung bình (50), các chỉ số gốc trung bình, tâm pháp phàm phẩm, đứng ở cùng nơi với nhân vật (linh khí nơi bế quan hiện riêng).
// Đánh giá = chỉ số thật / sàn: dưới 0,7 rất kém · 0,7–0,9 kém · 0,9–1,25 bình thường · 1,25–1,7 tốt · từ 1,7 rất tốt.
// Hệ thống vẫn tính bằng số; đánh giá chỉ để hiển thị.
const RATE_T=[0.7,0.9,1.25,1.7];
const RATE_W={luc:['Rất yếu','Yếu','Bình thường','Mạnh','Rất mạnh'],toc:['Rất chậm','Chậm','Bình thường','Nhanh','Rất nhanh'],muc:['Rất thấp','Thấp','Bình thường','Cao','Rất cao'],
 ben:['Rất mỏng','Mỏng','Bình thường','Dày','Rất dày'],xa:['Rất gần','Gần','Bình thường','Xa','Rất xa']};
const RATE_COL=['#8d8672','#a5835a','var(--ink)','#3f8a4a','#b8902a'];
// tốc độ tu, thổ nạp nhân dồn nhiều thứ (linh căn, tư chất, ngộ tính, khí vận) nên mốc rộng hơn
const RATE_TK={bq:[0.6,0.85,1.4,2.3],thonap:[0.6,0.85,1.4,2.3]};
function rateLv(v,f,T){T=T||RATE_T;if(!(f>0))return v>0?3:2;const x=v/f;let i=0;while(i<T.length&&x>=T[i]-1e-9)i++;return i;}
let FLOOR_C={k:null,v:null};
function floorKey(){const r=G.run;return [r.kiep,r.realm,tieu(),r.pham?1:0,r.region,r.at,G.bqRoom?1:0].join('|');}
function floorStats(){const r=G.run;if(!r)return null;const k=floorKey();if(FLOOR_C.k===k)return FLOOR_C.v;
  const F=JSON.parse(JSON.stringify(r));const tp={u:-999,type:'tp',tier:0,el:'vo',lines:[],lv:1,v:2,req:0,n:'chuẩn'};
  Object.assign(F,{relics:[],eq:{},dd:[],arts:[tp],artKho:[],chu:[{k:'a',u:-999},null,null,null,null,null,null,null],chuOpen:4,kv:[],the:[],origin:'__none',trait:'none',
    root:{id:'tam',els:['kim','moc','thuy']},bon:{atkP:0,defP:0,hpP:0,mpP:0,tp:0,ngo:0,van:0,tam:0,matkP:0},base:{tp:6,ngo:10,van:4,tam:9},tuchat:50,lifeAdj:0,quality:[0,0,0,0,0,0],
    tamma:0,ht:[],wounds:[],inj:null,pets:[],petOut:null,th:[],scene:null,moving:null,_avgTT:1});
  const keepR=G.run,keepU=G.meta.upg,keepRoom=G.bqRoom;let v=null;
  try{G.run=F;G.meta.upg={};G.bqRoom=false;const s=S();
    v={maxHp:s.maxHp,maxMp:s.maxMp,atk:s.atk,matk:s.matk,def:s.def,tp:s.tp,ne:s.ne,ngo:s.ngo,tam:s.tam,van:s.van,than:s.than,nl:s.nl,crit:s.crit,critDmg:s.critDmg,
      cx:s.cx,hoi:s.hoi,hoTam:s.hoTam,lc:lucChien(),bq:bqReal(),thonap:thonapPct(),walk:walkSpeed(),sense:SENSE[F.realm]||1};}
  catch(e){console.error(e);}finally{G.run=keepR;G.meta.upg=keepU;G.bqRoom=keepRoom;}
  FLOOR_C={k,v};return v;}
// đánh giá một chỉ số của người chơi: trả về {lv, t (chữ), c (màu)}
function rateOf(key,val,kind){const f=floorStats();const lv=rateLv(val,f?f[key]:0,RATE_TK[key]);const W=RATE_W[kind||'luc'];return {lv,t:W[lv],c:RATE_COL[lv]};}
function pctOf(a,b){return Math.round(clamp(a/Math.max(1,b),0,1)*100)+'%';}
// ----- mô tả chỉ số bằng chữ: "+29%" → "tăng mạnh", "Ngộ tính +3" → "Ngộ tính tăng khá" -----
// Số kiểu đếm (né 1 đòn, 2 lượt, thêm 2 ô, năm, tháng…) giữ nguyên vì đó là số lượng.
// Mốc: chỉ số tính theo % (dưới 6 nhẹ, dưới 15 khá, dưới 30 mạnh, còn lại rất mạnh); chỉ số điểm (dưới 2 nhẹ, dưới 4 khá, dưới 7 mạnh).
function magW(v,pct){const b=pct?[6,15,30]:[2,4,7];return v<b[0]?'nhẹ':v<b[1]?'khá':v<b[2]?'mạnh':'rất mạnh';}
const NUM_KEEP=/^\s*(đòn|lượt|ô|năm|tháng|ngày|giờ|linh thạch|viên|lần|đạo|đợt)/;
function numWords(str){str=String(str);
  str=str.replace(/([+−-])\s?(\d+(?:[.,]\d+)?)(\s?%)?/g,(m,sg,n,pc,off,all)=>{if(NUM_KEEP.test(all.slice(off+m.length)))return m;const v=parseFloat(n.replace(',','.'));return (sg==='+'?'tăng ':'giảm ')+magW(v,!!pc);});
  let tail='';str=str.replace(/(\d+(?:[.,]\d+)?)\s?%\s?/g,(m,n,off,all)=>{if(NUM_KEEP.test(all.slice(off+m.length)))return m;tail=magW(parseFloat(n.replace(',','.')),true);return '';});
  return (tail?str.replace(/\s+$/,'')+' · '+tail:str).replace(/\s{2,}/g,' ');}
{const _fl37=fxLines;fxLines=function(fx,rel){return _fl37(fx,rel).map(numWords);};}
{const _lt37=lineText;lineText=function(a,x,pot){const t=_lt37(a,x,pot);return x&&(x.sk||x.mind)?t:numWords(t.replace(/\s*\(đang [^)]*\)/,''));};}
{const _tt37=ttFxText;ttFxText=function(def){return _tt37(def).map(x=>/^Nhân quả/.test(x)?(/[−-]/.test(x)?'Thiên về ác':'Thiên về thiện'):numWords(x));};}

// khả năng đột phá bằng chữ; từng nguồn cộng trừ bằng chữ
function btWord(p){return p<0.3?'Rất khó':p<0.5?'Khó':p<0.7?'Ngang tay':p<0.85?'Dễ':'Gần như chắc chắn';}
function partWord(v){const a=Math.abs(v);return (v>0?'▲ ':'▼ ')+(a<3?'ít':a<8?'vừa':'nhiều');}

// tâm ma bằng chữ (không hiện số)
function tmWord(v){return ['Rất thấp','Thấp','Bình thường','Cao','Rất cao'][Math.min(4,Math.floor((v||0)/20))];}

// ----- nhật ký trận không hiện số: mô tả mức trúng đòn bằng lời -----
const NUM_VI=['không','một','hai','ba','bốn','năm','sáu','bảy','tám','chín','mười','mười một','mười hai','mười ba','mười bốn','mười lăm'];
function numVi(n){return NUM_VI[n]||String(n);}
function cbTgName(tg){const L=(tg||[]).filter(Boolean);if(!L.length)return 'đối phương';if(L.length>1)return L.every(t=>t.side==='A')?'phe ngươi':'đối phương';return L[0].isMain?'ngươi':L[0].name;}
function hitPh(r,X,f){
  // khôi lỗi, vật thể không chảy máu; âm hồn không có sắc mặt; yêu thú không "rên khẽ, tái mặt"
  if(f==='vat'&&r>=0.1){const Q=r<0.2?['{X} rung lên, một vết nứt chạy dọc thân']:r<0.35?['{X} vỡ một mảng, đá vụn bắn tung tóe','linh quang trên thân {X} chập chờn']:['{X} nứt toác, gần như vỡ làm đôi'];return pick(Q).replace('{X}',X);}
  if(f==='quy'&&r>=0.1){const Q=r<0.2?['{X} rú lên, âm khí tan bớt một mảng']:r<0.35?['thân hình {X} mờ đi như khói gặp gió']:['{X} gào thét, hồn thể gần như tan rã'];return pick(Q).replace('{X}',X);}
  if(f==='thu'&&r>=0.1&&r<0.2)return pick(['{X} trúng đòn nặng, loạng choạng suýt ngã','{X} rú lên một tiếng đau đớn']).replace('{X}',X);
  const P=r<0.04?['{X} chỉ khẽ lắc người, chẳng hề hấn gì','đòn ấy chỉ sượt qua vạt áo {X}']:r<0.1?['{X} trúng đòn, lùi lại mấy bước','{X} hơi chao đảo, khí tức thoáng rối']:r<0.2?['{X} trúng đòn nặng, loạng choạng suýt ngã','{X} rên khẽ một tiếng, sắc mặt tái đi']:r<0.35?['{X} hộc ra một ngụm máu tươi','khí huyết {X} cuộn trào, máu rỉ nơi khóe miệng']:['{X} bị đánh bay ra xa, máu tươi phun thành vòi','{X} trọng thương, gần như không đứng vững nổi'];return pick(P).replace('{X}',X);}

// ================= ĐỢT 33: LUYỆN KHÍ 13 TẦNG, KHÍ VẬN SAU ĐỘT PHÁ =================
// Luyện Khí chia 13 tầng. Thanh tu vi Luyện Khí kéo tới tầng 13 (100%). Tầng 9 nằm ở 50%: tới đó là đột phá Trúc Cơ được.
// Tầng 1–9 tốn tu vi như cả Luyện Khí cũ; tầng 10–13 mỗi tầng một khó hơn. Tu lên tầng 10–12 thì đột phá được thêm chỉ số,
// tầng 13 thêm một tiên thiên khí vận ngẫu nhiên. Lịch luyện chỉ cần theo kịp tu vi (không cần đầy) mới đột phá được.
// Mỗi tầng một thanh tu vi riêng 0–100% (bên trong vẫn lưu một thang chung cho cả Luyện Khí, chỉ đổi cách hiện).
// Tầng 1–8 đầy thì tự lên tầng sau. Từ tầng 9: đầy thanh thì dừng lại; muốn lên tầng kế phải tự "xung kích".
// Đầy tầng 9 mới được đột phá Trúc Cơ; từ tầng 10 trở đi đột phá lúc nào cũng được.
const LK_TH=[0,50/9,100/9,150/9,200/9,250/9,300/9,350/9,400/9,50,58,68,80],LK_MUL=0.5; // mốc bắt đầu mỗi tầng; tầng 13 đầy ở 100
function lkEnd(g){return g<13?LK_TH[g]:100;}
function lkGate(){return (G.run&&G.run.lkG)||9;}
function lkFull(){return lkOn()&&G.run.tv>=lkEnd(lkGate())-1e-6;}
// tầng đã tu trọn (đầy thanh): đang giữa tầng 11 thì mới trọn tầng 10
function lkDone(){return lkPct()>=100?lkTang():lkTang()-1;}
function lkOn(){const r=G.run;return !!r&&r.realm===0&&!r.pham;}
function lkTang(tv){if(tv==null)tv=G.run.tv;let n=0;for(const t of LK_TH)if(tv>=t-1e-6)n++;return Math.min(n,lkGate());}
function llNeedBt(){return lkOn()?LK_TH[9]:LL_BT;} // Luyện Khí: từ tầng 9 trở lên, đủ lịch luyện của tầng 9 là đột phá được bất cứ lúc nào
{const _tp33=tvPts;tvPts=function(realm){const r=G.run;return realm===0&&r&&r.realm===0&&!r.pham?_tp33(0)/LK_MUL:_tp33(realm);};}
{const _br33=bqReal;bqReal=function(){return _br33()*(lkOn()?LK_MUL:1);};}
{const _tn33=thonapPct;thonapPct=function(){return _tn33()*(lkOn()?LK_MUL:1);};}
{const _at33=addTv;addTv=function(x){return _at33(lkOn()&&x?x*LK_MUL:x);};}
{const _rl33=realmLabel;realmLabel=function(){if(lkOn()){const r=G.run;return qualName(0,(r.quality||[])[0]||0)+' tầng '+lkTang();}return _rl33();};}
{const _rt33=realmText;realmText=function(r){r=r||G.run;if(r===G.run&&lkOn())return REALM[0]+' tầng '+lkTang();return _rt33(r);};}
// thưởng khi đột phá Trúc Cơ từ tầng 10 trở lên
const LK_BON={10:{p:5,n:1,tp:0},11:{p:10,n:2,tp:0},12:{p:15,n:3,tp:1},13:{p:20,n:4,tp:2}};
// khí vận có thể nhận sau khi sinh: bỏ những cái chỉ có nghĩa lúc đầu thai (đổi linh căn, gia cảnh, tính tình)
function kvPool(){const r=G.run;const own=r.kv||[];return Object.values(TT_DEST).filter(d=>!own.includes(d.id)&&!d.mc&&!d.tr&&!TT_FORCE[d.id]&&!['hon_nguyen_dao','ngu_hanh_hop_nhat','ngu_hanh_khuyet_moc','gia_canh_kha_gia'].includes(d.id)&&!/linh căn/i.test(d.description||'')&&!(d.effects||{}).nguHanhBonus);}
function kvOffer(n,to){const L=[];const pool=kvPool();for(let i=0;i<n;i++){const left=pool.filter(d=>!L.includes(d.id));if(!left.length)break;
  const rk=wpick([1,2,3,4,5,6].filter(x=>left.some(d=>d.rank===x)),x=>TT_RW[x]*Math.pow(1.6,((to||1)-1)*(x-1)/2));L.push(wpick(left.filter(d=>d.rank===rk),d=>kvAff(d,G.run&&G.run.root&&G.run.root.els)).id);}return L;}
function kvGain(id,why){const r=G.run;if(!r||!id||!TT_DEST[id])return;r.kv=(r.kv||[]).concat(id);const d=TT_DEST[id];{const a=(d.effects||{}).amDuongBonus;if(a)r.karma=clamp((r.karma||0)+Math.round(((a.chinh||0)-(a.ta||0))/2),-100,100);}log(`Nhận tiên thiên khí vận: ${d.name}${why?' ('+why+')':''}.`);if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} được khí vận ${d.name}.`);const s=S();r.hp=Math.min(r.hp,s.maxHp);r.mp=Math.min(r.mp,s.maxMp);}
function kvChoose(i){const r=G.run;if(!r||!r.kvPick)return;const id=r.kvPick[+i];r.kvPick=null;kvGain(id,'đột phá');}
{const _bf33=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const g=r&&rl===0&&!r.pham?lkDone():0;const res=_bf33.apply(this,arguments);const r2=G.run;
  if(r2&&r2.realm>rl&&r2.realm<5){const sc=r2.scene;const ch=sc&&Array.isArray(sc.chips)?sc.chips:null;
    const B=LK_BON[g];if(B){const b=r2.bon;for(const k of ['hpP','mpP','atkP','defP','matkP'])b[k]=(b[k]||0)+B.p;b.ngo=(b.ngo||0)+B.n;b.tam=(b.tam||0)+B.n;b.tp=(b.tp||0)+B.tp;
      const s=S();r2.hp=s.maxHp;r2.mp=s.maxMp;log(`Tu trọn Luyện Khí tầng ${g} rồi mới đột phá: căn cơ vững hơn người thường.`);
      if(ch)ch.push(chip('🏯','trọn tầng '+g+' · căn cơ ▲','Tu trọn Luyện Khí tầng '+g+' rồi mới đột phá.\nKhí huyết, linh lực, công, thủ tăng '+magW(B.p,1)+'; ngộ tính, đạo tâm tăng'+(B.tp?', thân pháp tăng':'')+'.','up'));
      if(g>=13){const id=kvOffer(1,1)[0];if(id){kvGain(id,'tu trọn Luyện Khí tầng 13');if(ch)ch.push(chip('✨',TT_DEST[id].name,'Tu trọn tầng 13 mới đột phá: trời ban một tiên thiên khí vận.\n'+TT_DEST[id].description,'up'));}}}
    const o=kvOffer(3,r2.realm);if(o.length)r2.kvPick=o;}
  return res;};}
