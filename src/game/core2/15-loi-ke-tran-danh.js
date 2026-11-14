// ----- lời kể trận đánh: ai ra đòn, đòn ra sao, đối phương chịu thế nào -----
const EL_FL={kim:['kiếm khí sắc lạnh xé gió lao đi','kim quang lóe lên như chớp giật'],moc:['dây leo linh mộc cuộn trào lao tới','lá xanh hóa thành phi đao bay vút ra'],thuy:['sóng nước cuộn trào ập tới','từng giọt nước hóa thành băng tiễn'],
 hoa:['hỏa diễm bùng lên rực trời','một con hỏa long gầm thét lao ra'],tho:['đất đá rung chuyển, núi đá ầm ầm đè xuống','cát bụi cuộn thành bão'],loi:['lôi quang chớp lóe, tiếng sấm nổ vang','một đạo thiểm điện giáng xuống'],
 bang:['hàn khí ngưng thành băng trùy','sương giá phủ trắng một vùng'],phong:['cuồng phong gào thét cuốn tới','gió sắc như dao cắt tới'],am:['âm khí đen kịt cuộn tới','quỷ ảnh rít lên lao ra'],phat:['Phật quang tỏa rạng, kim chưởng giáng xuống','tiếng chuông Phật ngân vang chấn động'],vo:['chân khí cuộn trào','kình lực ầm ầm ập tới']};
const ATK_P=['Ngươi vận chân khí, tung một chưởng về phía {T}','Ngươi lướt tới như cơn gió, quyền phong rít lên nhắm thẳng {T}','Ngươi điểm ngón tay, một luồng chỉ phong bắn về phía {T}','Ngươi xoay người, tung một cước quét ngang về phía {T}'];
// phàm nhân chưa có chân khí: đánh bằng tay chân, gậy gộc
const ATK_PHAM=['Ngươi vung nắm đấm nhắm thẳng {T}','Ngươi chộp lấy khúc gỗ gần đó, quật mạnh vào {T}','Ngươi xoay người, tung một cước quét ngang về phía {T}','Ngươi lao tới, dồn hết sức vào một cú đấm về phía {T}'];
function cbNarr(o){const {u,sk,f,isP,tgN}=o;let a='';const P=[];
  if(isP){
    if(f.guard)a='Ngươi vận khí điều tức, dựng một tầng hộ thể quanh thân'+(o.guardG?', linh lực dần hồi lại':'');
    else if(f.stance)a='Ngươi thu thế, chăm chú chờ đối phương ra đòn';
    else if(sk.id==='_atk')a=pick(isPham()?ATK_PHAM:ATK_P);
    else if(f.p)a='Ngươi bấm quyết thi triển '+sk.n+', '+pick(EL_FL[sk.el]||EL_FL.vo);
    else{a='Ngươi bấm quyết thi triển '+sk.n;const e=[];if(o.heal)e.push('sinh cơ tràn về, vết thương dần khép lại');if(f.block)e.push('một tầng hộ thể lóe sáng quanh thân');if(f.evade)e.push('thân hình nhòe đi thành tàn ảnh');if(f.rage)e.push('sát khí bốc lên ngùn ngụt');if(f.cleanse)e.push('độc tố trong người tiêu tan');if(f.regen)e.push('linh khí thấm dần vào kinh mạch');if(e.length)a+=', '+e.join(', ');}
  }else{const V=VERB[u.f]||VERB.vat;const it=sk.it;
    if(sk.fx&&sk.fx.charge)a=pick(V.heavy);else if(V[it])a=pick(V[it]);else a=VERB2[it]||'{e} ra tay';a=a.replace('{e}',u.name);}
  if(f.p&&o.hits>1&&o.total)a+=', liền '+numVi(o.hits)+' đòn như mưa sa';
  if(f.p){
    if(o.kiep){if(o.total)P.push('Mây kiếp chấn động, kiếp uy yếu bớt.');}
    else if(!o.total&&o.dod)P.push(pick(['{T} nghiêng mình tránh thoát.','{T} lách người, đòn đánh trượt qua trong gang tấc.','Thân ảnh {T} chợt lóe, né được trong đường tơ kẽ tóc.']));
    else if(!o.total&&o.hits)P.push(pick(['Hộ thể của {T} lóe sáng, đỡ trọn đòn.','Đòn đánh vào hộ thể của {T} như đá ném xuống hồ, không suy suyển.']));
    else if(o.total){if(o.crits)P.push(pick(['Trúng ngay yếu huyệt!','Đánh trúng chỗ sơ hở!']));if(o.blk)P.push('{T} kịp đưa tay đỡ, hóa giải bớt lực đạo.');P.push(hitPh(o.r,'{T}',o.tf)+'.');if(o.dod)P.push('{T} né được '+(o.dod>1?'vài':'một')+' đòn.');}
    for(const n of o.stunL||[])P.push(n+' bị chấn cho choáng váng.');}
  return capS((a+'.'+(P.length?' '+P.join(' '):'')).replace(/\{T\}/g,tgN));}
// lời kể phát ra giữa lúc ra đòn (gục ngã, choáng…) xếp sau câu ra đòn; số nhỏ đổi thành chữ
{const _cl=clog;clog=function(sc,t,c){t=String(t).replace(/\b(\d{1,2})\b(?!\s*%)/g,(m,n)=>+n<=15?numVi(+n):m);if(sc&&sc._dq){sc._dq.push([t,c]);return;}return _cl(sc,t,c);};}

// ----- Luyện Khí tầng 13: không phải ai cũng tu tới. Mặc định kẹt ở đỉnh tầng 12 (bình cảnh). Mở ra nhờ:
//  · tâm pháp đang vận hành từ Huyền phẩm trở lên (căn cơ công pháp đủ sâu);
//  · đốn ngộ khi bế quan lúc đang kẹt (năm càng dài, ngộ tính càng cao càng dễ);
//  · gặp linh tuyền tẩy tủy khi thăm dò nơi linh khí dồi dào (nơi trung bình thì hiếm hơn).
const LK_CAP=100;
function lk13Open(){const r=G.run;const a=typeof tuArt==='function'&&tuArt();return !!(r&&(r.lk13||(a&&a.tier>=2)));}
function lkCapped(){return lkOn()&&lkGate()===12&&lkFull()&&!lk13Open();}
{const _at34=addTv;addTv=function(x){const res=_at34(x);const r=G.run;if(r&&lkOn()&&!lk13Open()&&r.tv>LK_CAP)r.tv=LK_CAP;return res;};}
function lk13Unlock(why,txt){const r=G.run;if(!r||r.lk13)return;r.lk13=1;log('Bình cảnh tầng 12 đã phá: '+why+'.');if(typeof bio==='function')bio(`Năm ${Math.floor(r.age)} tuổi, ${r.ten} ${why}, phá bình cảnh Luyện Khí tầng 12.`);note('✨ '+txt,'up');}
{const _bc34=bqCustom;bqCustom=function(y){const cap=lkCapped();const res=_bc34(y);const r=G.run;
  if(res&&r&&cap&&lkOn()&&!r.lk13&&y>=0.5&&chance(Math.min(0.35,0.05*y*Math.max(0.5,S().ngo/10)))){lk13Unlock('đốn ngộ khi bế quan','Trong lúc nhập định, một tia linh quang chợt lóe: bình cảnh tầng 12 vỡ tan. Từ nay có thể tu lên tầng 13.');
    const sc=r.scene;if(sc&&Array.isArray(sc.chips))sc.chips.push(chip('✨','đốn ngộ','Phá bình cảnh Luyện Khí tầng 12, có thể tu lên tầng 13','up'));}
  return res;};}
{const _pa34=placeAct;placeAct=function(a){const r=G.run;const sc=r&&r.scene;const n=sc&&sc.type==='place'?nodeById(sc.id):null;const cap=a==='explore'&&lkOn()&&lkTang()>=12&&!lk13Open();
  const res=_pa34(a);
  if(cap&&G.run&&n&&!G.run.lk13){const lv=lkOf(n);if(chance(lv>=3?0.12:lv>=2?0.04:0))lk13Unlock('gặp linh tuyền tẩy tủy ở '+n.name,'Sâu trong '+n.name+' có một mạch linh tuyền. Ngâm mình ba ngày ba đêm, kinh mạch được gột rửa: từ nay có thể tu lên tầng 13.');}
  return res;};}

// tên kiếp: kiếp đầu tiên, kiếp thứ 2…
function kiepName(k){return +k===1?'Kiếp đầu tiên':'Kiếp thứ '+k;}

// phần đã tu của tầng Luyện Khí đang ở (đầy 100% là trọn tầng)
function lkPct(tv){const r=G.run;if(tv==null)tv=r.tv;const g=lkTang(tv);const a=LK_TH[g-1],b=lkEnd(g);return Math.floor(clamp((tv-a)/(b-a),0,1)*100+1e-6);}

// ----- Luyện Khí: chặn tu vi ở đỉnh tầng đang mở; xung kích lên tầng kế -----
{const _at36=addTv;addTv=function(x){const res=_at36(x);const r=G.run;if(r&&lkOn()&&r.tv>lkEnd(lkGate()))r.tv=lkEnd(lkGate());return res;};}
{const _ts36=tvSimAdd;tvSimAdd=function(raw){const v=_ts36(raw);if(!lkOn())return v;return Math.max(0,Math.min(v,lkEnd(lkGate())-G.run.tv));};}
{const _bn36=bqNeedY;bqNeedY=function(){if(!lkOn())return _bn36();const r=G.run;const left=lkEnd(lkGate())-r.tv;return left<=1e-6?0:Math.max(0.25,Math.ceil(left/bqReal()*4)/4);};}
function lkXkState(){if(!lkOn()||lkTang()<9)return null;const g=lkGate();if(g>=13)return null;if(!lkFull())return {ok:false,why:'Tu vi tầng '+g+' chưa đầy, chưa đủ sức xung kích.'};if(g===12&&!lk13Open())return {ok:false,why:'Linh lực xông mãi vẫn không qua được.'};return {ok:true,why:''};}
function lkXk(){const S0=lkXkState();if(!S0||!S0.ok)return false;const r=G.run;r.lkG=lkGate()+1;advanceTime(HM);if(!G.run)return true;const t='Ngươi dồn hết linh lực xông thẳng qua kinh mạch. Một tiếng “rắc” khẽ vang trong người: đã lên Luyện Khí tầng '+r.lkG+'.';log('Xung kích lên Luyện Khí tầng '+r.lkG+'.');note('✨ Lên Luyện Khí tầng '+r.lkG,'up');const sc=r.scene;if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('✨','tầng '+r.lkG,'Xung kích thành công','up')];}return true;}
{const _pa36=placeActs;placeActs=function(n){const L=_pa36(n);const X=lkXkState();if(X&&n.type!=='ai'&&n.type!=='sao'){const g=lkGate();L.push({a:'xk',i:'✨',l:'Xung kích tầng '+(g+1),h:HM,tip:X.ok?(X.why?X.why+'\n':'')+'Dồn linh lực phá quan, lên Luyện Khí tầng '+(g+1)+'.\nTầng càng cao, đột phá Trúc Cơ càng được nhiều lợi.':X.why,dis:!X.ok,x:''});}return L;};}
{const _pa37=placeAct;placeAct=function(a){if(a==='xk'){lkXk();return;}return _pa37(a);};}
// hiện tu vi: ở Luyện Khí là phần trăm của tầng đang ở
function tvShow(){return lkOn()?lkPct():Math.floor(G.run.tv);}
function lkW(g){g=g||lkTang();return lkEnd(g)-LK_TH[g-1];}
function lkShowGain(x){return lkOn()?x*LK_MUL/lkW()*100:x;} // % tu vi (thang cảnh giới) → % của tầng đang ở
function btReadyTv(){return lkOn()?(lkTang()>=10||(lkTang()===9&&lkFull())):G.run.tv>=100;}
// ở Luyện Khí, mất tu vi (đột phá hỏng…) không làm rớt tầng
{const _at38=addTv;addTv=function(x){const r=G.run;if(r&&lkOn()&&x<0){const f=LK_TH[lkTang()-1];const res=_at38(x);if(G.run&&G.run.tv<f)G.run.tv=f;return res;}return _at38(x);};}
{const _bi38=bqInfo;bqInfo=function(){const o=_bi38();if(lkOn())o.full=lkFull();return o;};}

// ================= ĐỢT 37: XUNG KÍCH TIỂU CẢNH GIỚI, ĐỘT PHÁ ĐẠI CẢNH GIỚI =================
// Trong một đại cảnh giới, mỗi tầng (Luyện Khí) hay mỗi kỳ (sơ, trung, hậu) có thanh tu vi riêng 0–100%.
// Đầy thanh thì tu vi dừng lại; muốn lên tầng/kỳ kế phải tự xung kích. Lên đại cảnh giới mới gọi là đột phá.
// Phàm nhân lên Luyện Khí tầng 1 cũng là xung kích.
const SG_TH=[0,100/3,200/3];
function sgOn(){const r=G.run;return !!r&&!r.pham;}
function sgTh(){return G.run.realm===0?LK_TH:SG_TH;}
function sgNat(tv){let n=0;for(const t of sgTh())if(tv>=t-1e-6)n++;return Math.max(1,n);}
function sgGate(){const r=G.run;if(!r)return 1;if(r.sg==null)r.sg=r.realm===0&&r.lkG?r.lkG:sgNat(r.tv); // bản lưu cũ: lấy theo tu vi đang có
  return r.sg;}
function sgEnd(g){const th=sgTh();return g<th.length?th[g]:100;}
function sgTang(tv){if(tv==null)tv=G.run.tv;return Math.min(sgNat(tv),sgGate());}
function sgFull(){return sgOn()&&G.run.tv>=sgEnd(sgGate())-0.15;} // tu vi làm tròn tới 0,1: sát mốc là tính đầy
function sgW(g){g=g||sgTang();return sgEnd(g)-sgTh()[g-1];}
function sgPct(tv){const r=G.run;if(tv==null)tv=r.tv;const g=sgTang(tv);return Math.floor(clamp((tv-sgTh()[g-1])/sgW(g),0,1)*100+1e-6);}
function sgName(g){return G.run.realm===0?'tầng '+g:TIEU[g-1];}
// Luyện Khí dùng chung
function lkGate(){return sgGate();}
function lkTang(tv){return sgTang(tv);}
function lkEnd(g){return sgEnd(g);}
function lkFull(){return lkOn()&&sgFull();}
function lkW(g){return sgW(g);}
function lkPct(tv){return sgPct(tv);}
function tvShow(){return sgOn()?sgPct():Math.floor(G.run.tv);}
function lkShowGain(x){return sgOn()?x*(lkOn()?LK_MUL:1)/sgW()*100:x;}
// xung kích
function lkXkState(){if(!sgOn())return null;const r=G.run;const g=sgGate();const last=sgTh().length;if(g>=last)return null;
  const nx=r.realm===0?'Luyện Khí tầng '+(g+1):REALM[r.realm]+' '+TIEU[g];
  if(!sgFull())return {ok:false,nx,why:'Tu vi '+sgName(g)+' chưa đầy, chưa đủ sức xung kích.'};
  if(r.realm===0&&g===12&&!lk13Open())return {ok:false,nx,why:'Linh lực xông mãi vẫn không qua được.'};return {ok:true,nx,why:r.realm===0&&g>=9?'Tầng truyền thuyết: khả năng thành chừng '+Math.round(lkXkRate()*100)+'%.':''};}
// Luyện Khí tầng 10–12 là chuyện truyền thuyết: xung kích có thể thất bại (ngộ tính, đạo tâm giúp; mỗi lần trượt lần sau dễ hơn)
function lkXkRate(){const r=G.run;const g=sgGate();if(!r||r.realm!==0||g<9)return 1;const s=S();const F=r.lkFail||{};
  return clamp([0.45,0.35,0.25][Math.min(2,g-9)]+clamp(((s.ngo||0)+(s.tam||0)-22)*0.015,-0.1,0.25)+0.1*(F[g]||0),0.05,0.95);}
function lkXk(){const X=lkXkState();if(!X||!X.ok)return false;const r=G.run;
  {const g=sgGate();const p=lkXkRate();if(p<1&&!chance(p)){advanceTime(HM);if(!G.run)return true;const F=r.lkFail||(r.lkFail={});F[g]=(F[g]||0)+1;
    const lo=LK_TH[g-1],w=sgEnd(g)-lo;r.tv=Math.max(lo,r.tv-w*0.35);r.tamma=Math.min(100,(r.tamma||0)+6);
    const t='Linh lực dồn tới quan ải rồi dội ngược lại, kinh mạch đau như bị kim châm. Tầng '+(g+1)+' vẫn đóng chặt. Ngươi mất một phần tu vi, nhưng đã biết chỗ hiểm của quan ải này.';
    log('Xung kích Luyện Khí tầng '+(g+1)+' thất bại.');note('Xung kích thất bại','dn');const sc=r.scene;if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('💥','thất bại','Mất 35% tu vi tầng này, tâm ma tăng. Lần sau dễ thành hơn.','dn')];}return false;}}
  r.sg=sgGate()+1;if(r.realm===0)r.lkG=r.sg;advanceTime(HM);if(!G.run)return true;
  const s=S();r.hp=Math.max(r.hp,0);clampHp();
  const t='Ngươi dồn hết linh lực xông thẳng qua kinh mạch. Một tiếng “rắc” khẽ vang trong người: đã lên '+X.nx+'.';log('Xung kích lên '+X.nx+'.');note('✨ Lên '+X.nx,'up');
  const sc=r.scene;if(sc&&sc.type==='place'){sc.msg=[t];sc.chips=[chip('✨',X.nx,'Xung kích thành công','up')];}return true;}
// đổi đại cảnh giới (đột phá, dẫn khí nhập thể): về tầng/kỳ đầu
{const _bf37=btFinish;btFinish=function(){const rl=G.run&&G.run.realm;const res=_bf37.apply(this,arguments);if(G.run&&G.run.realm!==rl){G.run.sg=1;G.run.lkG=null;}return res;};}
{const _pu37=phamUp;phamUp=function(){const was=isPham();const res=_pu37.apply(this,arguments);if(was&&G.run&&!isPham()){G.run.sg=1;G.run.lkG=null;}return res;};}
// chặn tu vi ở đỉnh tầng/kỳ đang mở; mất tu vi không rớt tầng/kỳ
{const _at37=addTv;addTv=function(x){const r=G.run;if(!r||!sgOn())return _at37(x);const f=sgTh()[sgTang()-1];const res=_at37(x);const r2=G.run;if(r2&&sgOn()){if(r2.tv>=sgEnd(sgGate())-0.15)r2.tv=sgEnd(sgGate());if(x<0&&r2.tv<f)r2.tv=f;}return res;};}
{const _ts37=tvSimAdd;tvSimAdd=function(raw){const v=_ts37(raw);if(!sgOn())return v;return Math.max(0,Math.min(v,sgEnd(sgGate())-G.run.tv));};}
{const _bn37=bqNeedY;bqNeedY=function(){if(!sgOn())return _bn37();const r=G.run;const left=sgEnd(sgGate())-r.tv;return left<=1e-6?0:Math.max(0.25,Math.ceil(left/bqReal()*4)/4);};}
{const _bi37=bqInfo;bqInfo=function(){const o=_bi37();if(sgOn())o.full=sgFull();return o;};}
// nhãn trên thanh đầu: thêm "xung kích" khi tầng/kỳ đã đầy
function btState(){const r=G.run;if(!r)return '';if(canBreak())return 'dp';const X=lkXkState();if(X&&X.ok)return 'xk';if((isPham()?r.tv>=100:btReadyTv())&&llOf()<llNeedBt())return 'bc';return '';}
// phàm nhân: nút ghi "Xung kích Luyện Khí tầng 1"
{const _pa39=placeActs;placeActs=function(n){const L=_pa39(n);if(isPham())for(const a of L)if(a.a==='bt'){a.l='Xung kích Luyện Khí tầng 1';a.tip='Dẫn khí nhập thể, bước vào Luyện Khí tầng 1.';}return L;};}

// ================= ĐỢT 38: NGHIỀN ÉP, UY ÁP, TỐC CHIẾN =================
// Lực chiến chênh từ 3 lần trở lên (hơn một đại cảnh giới) thì bên mạnh nghiền ép bên yếu:
// bên yếu bị uy áp, đòn đánh chỉ sượt được chút da (1–2 khí huyết); bên mạnh ra đòn nặng gấp rưỡi hơn.
const NE_T=3,NE_UP=2.5;
function uLc(u){return u._lc||lcCalc(u);}
function crushPair(a,b){if(!a||!b||a.kind==='kiep'||b.kind==='kiep')return 0;const x=uLc(a),y=uLc(b);return x>=y*NE_T?1:y>=x*NE_T?-1:0;}
function crushD(u,t,d){const c=crushPair(u,t);if(c>0)return Math.round(d*NE_UP);if(c<0)return d>0?ri(1,2):d;return d;}
function uyApSet(sc){const A=sc.units.filter(u=>u.side==='A'),Bs=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');
  for(const u of sc.units){u._lc=lcCalc(u);if(u.st)u.st.uyap=0;}
  for(const a of A)for(const b of Bs){const c=crushPair(a,b);if(c>0)b.st.uyap=1;if(c<0)a.st.uyap=1;}
  const me=mainUnit(sc);
  {const bi=me&&me.st.uyap?['Bị nghiền ép!','bad']:Bs.some(b=>b.st.uyap)?['Nghiền ép!','good']:[sc.boss?'Thủ lĩnh xuất hiện!':'Giao chiến!',''];cfx(sc,{k:'banner',t:bi[0],c:bi[1]});}
  if(me&&me.st.uyap){const f=Bs.find(b=>crushPair(b,me)>0);clog(sc,`Uy áp của ${f.name} ập xuống như núi đè. Linh lực trong người ngươi trì trệ hẳn, ra tay chẳng khác gì gãi ngứa.`,'en');}
  const low=Bs.filter(b=>b.st.uyap);if(low.length)clog(sc,`Uy áp của ngươi tỏa ra, ${low.map(b=>b.name).join(', ')} run rẩy, khí thế tan nát.`,'me');}
{const _cs38=combatStep;combatStep=function(dt){const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat'&&!sc.prep&&!sc._ua&&!sc.kiep){sc._ua=1;uyApSet(sc);}return _cs38(dt);};}
// so sánh một kẻ địch với nhân vật chính (màn chuẩn bị)
function foeCmp(f,meLc){const q=lcCalc(f)/Math.max(1,meLc);return q>=NE_T?{t:'Nghiền ép',c:'ne'}:q>=1.35?{t:'Mạnh hơn',c:'rt1'}:q>0.75?{t:'Vừa sức',c:'rt2'}:{t:'Yếu hơn',c:'rt3'};}
function meCrushes(sc,meLc){const Bs=sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep');return Bs.length&&Bs.every(b=>meLc>=lcCalc(b)*NE_T);}
function crushAny(sc){return typeof crushVictims==='function'&&sc.units.some(u=>u.kind!=='kiep'&&crushVictims(sc,u).length);}
