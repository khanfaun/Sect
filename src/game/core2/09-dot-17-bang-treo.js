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
        const q={id:'qs'+n.id+'_'+Math.floor(w.t),text:pick([contentText("core2_09-dot-17-bang-treo_js.001"),contentText("core2_09-dot-17-bang-treo_js.002"),contentText("core2_09-dot-17-bang-treo_js.003")])+tgt.name,node:tgt.id,kind:'diet',days:Math.ceil(tH*1.1/24)+ri(2,6),special:1,acc:w.t+ri(1,4)*HD,grade:g,v2:1,taken:false};
        q.reward=questRewardGen(g,rT());q.reward.st=Math.round(q.reward.st*1.3);hearOf(tgt);B.list.unshift(q);}}}};}
function boardLeft(n){return n&&n.board&&n.board.until?Math.max(0,n.board.until-W().t):0;}
{const _tq17=takeQuest;takeQuest=function(i){const r=G.run,sc=r.scene;const n=sc&&nodeById(sc.id);const b=n&&n.board&&n.board.list[+i];
  if(!b||b.cancelled||(b.acc&&W().t>b.acc))return;const k=r.quests.length;_tq17(i);if(r.quests.length>k){const q=r.quests[r.quests.length-1];q.reward=b.reward;q.grade=b.grade;if(b.special)q.special=1;}};}
{const _qc17=questCancel;questCancel=function(id){const r=G.run;const q=r.quests.find(x=>x.id===id);const ok=_qc17(id);if(ok&&q){const fn=nodeById(q.from);const b=fn&&fn.board&&fn.board.list.find(x=>x.id===q.id);if(b){b.taken=true;b.cancelled=1;}}return ok;};}
// phần thưởng chưa nhận: chỉ biết linh thạch và lịch luyện, vật phẩm là "???" có khung màu phẩm
function questRewardChipsHidden(q){const R0=questRewardOf(q);const L=questRewardChips(q).slice(0,2);
  for(const x of R0.it){const t=x.k==='relic'?x.tier:x.k==='pill'?(x.q||0):Math.max(0,questGrade(q)-2);const c=chip('','???',contentText("core2_09-dot-17-bang-treo_js.questRewardChipsHidden.004")+GRADE[clamp(t,0,4)]+contentText("core2_09-dot-17-bang-treo_js.questRewardChipsHidden.005"),'item');c.t2=t;
    c.h=contentText("core2_09-dot-17-bang-treo_js.questRewardChipsHidden.006", [QCOL[clamp(t,0,5)],GRADE[clamp(t,0,4)]]);c.c='item hid q'+clamp(t,0,5);L.push(c);}
  return L;}

// màu phẩm nhiệm vụ: Dễ xám, Thường lục, Khó lam, Hiểm tím, Tử nạn cam, Tuyệt cảnh đỏ
// Bảng QCOL: content/rules/qcol.jsfunction qpc(g){return '--pc:'+QCOL[clamp(g||0,0,5)];}

// ================= ĐỢT 18: KỲ NGỘ HIẾM =================
// Hai loại, xác suất rất thấp, mỗi ngày trong game gieo một lần (cách nhau ít nhất nửa năm):
//  - Tần suất mỗi ngày: có giá 1/8000, hữu duyên 1/12000, vớ vẩn 1/9000 (cộng lại chừng 11 lần mỗi trăm năm).
//  - Kỳ ngộ có giá: muốn có thì phải trả: thọ nguyên, vật phẩm, chỉ số mất vĩnh viễn, linh thạch.
//  - Kỳ ngộ hữu duyên (~1/1000 mỗi ngày): không mất gì, gặp là được.
// Chỉ xảy ra khi đang ở ngoài bản đồ (không trong địa điểm hay trận đánh), không xảy ra trong lúc bế quan dài.
function lifeLose(y){const r=G.run;r.lifeAdj-=y;return chip('⏳','thọ −'+y+' năm',contentText("core2_09-dot-17-bang-treo_js.lifeLose.007"),'dn');}
function lifeGain(y){const r=G.run;r.lifeAdj+=y;return chip('⏳','thọ +'+y+' năm',contentText("core2_09-dot-17-bang-treo_js.lifeGain.008"),'up');}
const KYNGO=[]; // content/events/opportunities/
function kyStart(ev){if(!ev)return;const r=G.run;r.kyT=W().t;r.scene={type:'kyngo',ev:ev.id,text:ev.t,res:null,chips:[],back:r.moving?null:r.at};if(r.moving)r.moving.halt=1;}
function kyOpts(sc){const ev=KYNGO.find(x=>x.id===sc.ev);return ev.c.map(c=>({l:c.l,cost:c.cost||'',no:c.need?c.need():''}));}
function kyPick(i){const r=G.run,sc=r.scene;if(!sc||sc.type!=='kyngo'||sc.res)return;const ev=KYNGO.find(x=>x.id===sc.ev);const c=ev&&ev.c[i];if(!c||(c.need&&c.need()))return;
  const o=c.go()||{};sc.res={l:c.l,t:o.t};sc.chips=o.ch||[];log(contentText("core2_09-dot-17-bang-treo_js.kyPick.009")+ev.n+'.');if(G.run&&r.age>=S().life)die('toahoa');}
{const _adv18=advanceTime;advanceTime=function(h){const o=_adv18(h);const r=G.run;if(!r||h>48)return o;r.kyAcc=(r.kyAcc||0)+h;
  while(r.kyAcc>=HD){r.kyAcc-=HD;if(r.scene||G.screen!=='map'||W().t-(r.kyT||-1e9)<HY/2)continue;
    const roll=R()/kyMul();if(roll<KY_P[0]){if(kyBigOpen())kyStart(pick(contentOpportunityPool(x=>x.paid)));break;}if(roll<KY_P[0]+KY_P[1]){kyStart(pick(contentOpportunityPool(x=>!x.paid&&!x.joke&&!x.sp)));break;}if(roll<KY_P[0]+KY_P[1]+KY_P[2]){kyStart(pick(contentOpportunityPool(x=>x.joke)));break;}}
  return o;};}

// Bảng KY_P: content/rules/ky-p.js
// kỳ ngộ vớ vẩn: trông như hữu duyên, hóa ra đồ dởm hoặc bị lừa
function junkRelic(n){const x=genRelic(0);x.name=n;x.k='kiem';for(const k in x.fx)x.fx[k]=x.fx[k]>0?1:x.fx[k];x.lore=contentText("core2_09-dot-17-bang-treo_js.junkRelic.010");return x;}
// Kỳ ngộ/hộp thoại: content/events/opportunities/.
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
    log(contentText("core2_09-dot-17-bang-treo_js.phamUp.011", [Math.floor(g.age)]));if(typeof bio==='function')bio(contentText("core2_09-dot-17-bang-treo_js.phamUp.012", [Math.floor(g.age),g.ten]));}}
// phàm nhân không có lịch luyện ràng buộc
{const _le19=llEff;llEff=function(tv){return isPham()?1:_le19(tv);};}
{const _S19=S;S=function(){const s=_S19();if(isPham()){s.maxHp=Math.round(s.maxHp*0.8);s.maxMp=Math.round(s.maxMp*0.5);s.atk=Math.round(s.atk*0.85);s.matk=Math.round(s.matk*0.85);}return s;};}
// tên cảnh giới
{const _rl19=realmLabel;realmLabel=function(){return isPham()?contentText("core2_09-dot-17-bang-treo_js.013"):_rl19();};}
{const _rt19=realmText;realmText=function(r){r=r||G.run;return r===G.run&&isPham()?contentText("core2_09-dot-17-bang-treo_js.014"):_rt19(r);};}
function realmName(){return isPham()?contentText("core2_09-dot-17-bang-treo_js.realmName.015"):REALM[G.run.realm];}
{const _ae19=applyE;applyE=function(e,v){const was=isPham();const ch=_ae19(e,v);if(was&&G.run&&!isPham()&&Array.isArray(ch)){const i=ch.findIndex(c=>c&&c.i==='✨');if(i>=0)ch.splice(i,1);ch.push(chip('✨',contentText("core2_09-dot-17-bang-treo_js.016"),contentText("core2_09-dot-17-bang-treo_js.017"),'up'));}return ch;};}