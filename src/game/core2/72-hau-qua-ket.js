// Câu 86, 88 và hai kỳ ngộ Đại Mộng (gói GPT lần 4, docs/content/GUI-GPT-4/ban-thao → content/dai-mong/hau-qua, content/dai-mong/ky-ngo).
// Bảng: DM_HQ, DM_KY (content/rules/dai-mong.js) · chữ: DM_DATA.hq, DM_DATA.ky (content/dai-mong/**) · lời ngắn: content/text/dai-mong.json (dm.*).
// 88. Hậu quả thế giới của END02 (Nhân Hoàng), END03 (Ma chủ), END06 (Truyền một ngọn đèn): từ đời SAU kiếp đạt kết —
//     tin đồn ở quán trà / tin tức (contentRumor, worldTick), tả nơi đổi thay trên thẻ địa điểm (placeMeta.desc của nơi neo),
//     Sử lược ghi ngay lúc kết (bản lưu cũ ghi bù khi vào kiếp mới, cờ W().hqSu), hồi ức "muon" một lần ở màn hết kiếp đời sau (G.meta.hqMuon).
// 86. Khép hành trình: thêm dòng "Phàm giới" vào hậu truyện màn kết; màn kết dẫn về màn mở đầu kèm lời "Linh giới đang trong quá trình phát triển" (ui/32).
// Kỳ ngộ A1 (Mộng du tiên cảnh: tu sĩ tĩnh tọa nơi hoang) và A2 (Người chèo đò quen: đã có Mộng Ấn, ở nơi sông nước); mỗi kiếp một lần mỗi cái (r.kyA1, r.kyA2).
// Bản lưu cũ: mọi cờ đọc kiểu x||0.
function hqD(id){const D=dmD().hq||{};return D[id]||null;}
// các kết có hậu quả đang thấy được: đã đạt ở một kiếp trước kiếp đang sống
function hqNay(){if(!feat('mong')||!G.meta)return [];const M=dmM(),k=dmKiep();return DM_HQ.ket.filter(id=>hqD(id)&&M.ends.some(e=>e.id===id&&(e.kiep||1)<k));}
function hqTin(){const L=hqNay();if(!L.length)return '';const D=hqD(pick(L));const t=pick(D.tin||[]);return t?contentText('runtime.05-content-runtime.10')+dmT(t):'';}
function hqNoi(n){if(!n||!n.anchor)return '';const L=[];for(const id of hqNay())for(const x of hqD(id).noi||[])if(x.loc===n.anchor)L.push(dmT(x.t));return L.join(' ');}
// Sử lược: ghi một lần cho mỗi kết (theo thế giới)
function hqSu(){const w=W();if(!w||!G.meta)return 0;const M=dmM();const S0=w.hqSu||(w.hqSu={});let c=0;
  for(const id of DM_HQ.ket){const D=hqD(id);if(!D||S0[id]||!M.ends.some(e=>e.id===id))continue;S0[id]=1;for(const s of D.su||[]){suLuocAdd(dmT(s),'ket',w);c++;}dbg('hq.su',{id});}
  return c;}
{const _k=dmKetDoi;dmKetDoi=function(id){const x=_k.apply(this,arguments);try{if(x)hqSu();}catch(e){dbg('dm.loi',{m:String(e.message||e)});}return x;};}
{const _nr=newRun;newRun=function(){const x=_nr.apply(this,arguments);try{hqSu();}catch(e){dbg('dm.loi',{m:String(e.message||e)});}return x;};}
// tin đồn: quán trà, tin tức tự đến
{const _cr=contentRumor;contentRumor=function(){if(hqNay().length&&R()<DM_HQ.tin){const t=hqTin();if(t){dbg('hq.tin',{});return t;}}return _cr.apply(this,arguments);};}
{const _wt=worldTick;worldTick=function(dy){const o=_wt.apply(this,arguments);if(G.run&&hqNay().length&&R()<Math.min(0.5,DM_HQ.nam*(dy||0))){const t=hqTin();if(t){pushNews(t);dbg('hq.tinNam',{});}}return o;};}
// thẻ địa điểm: tả nơi đổi thay
{const _pm=placeMeta;placeMeta=function(n){const o=_pm.apply(this,arguments);try{const t=hqNoi(n);if(t&&o)o.desc=(o.desc?o.desc+' ':'')+t;}catch(e){dbg('dm.loi',{m:String(e.message||e)});}return o;};}
// hồi ức đời sau: một lần ở màn hết kiếp
{const _d=die;die=function(cause){const r=G.run;const k=r?(r.kiep||1):0;const x=_d.apply(this,arguments);const o=G.over;if(!o||!r||!feat('mong'))return x;
  try{const M=dmM();M.hqMuon=M.hqMuon||{};const L=[];for(const id of DM_HQ.ket){const D=hqD(id);if(!D||!D.muon||M.hqMuon[id])continue;
      if(M.ends.some(e=>e.id===id&&(e.kiep||1)<k)){M.hqMuon[id]=1;L.push(dmT(D.muon));}}
    if(L.length){o.hqMuon=L;dbg('hq.muon',{n:L.length});}}catch(e){dbg('dm.loi',{m:String(e.message||e)});}
  return x;};}
// 86: khép hành trình — hậu truyện nhắc Phàm giới; màn mở đầu đọc dmLinhGioi()
{const _kh=dmKetHet;dmKetHet=function(){const x=_kh.apply(this,arguments);const K=G.meta&&G.meta.ketHet;if(K){K.hau=(K.hau||[]).concat(contentText('dm.ketHau'));dbg('dm.phamKhep',{id:K.id});}return x;};}
function dmLinhGioi(){const K=G.meta&&G.meta.ketHet;if(!K)return null;return {khep:contentText('dm.phamKhep'),linh:contentText('dm.linhGioi'),n:KET_THUC[K.id]?KET_THUC[K.id].n:K.id,ten:K.ten};}
// ---------- kỳ ngộ A1 / A2 ----------
function kyD(ma){const D=dmD().ky||{};return D[ma]||null;}
function kyDmEv(ma){const id='dm_ky_'+ma,D=kyD(ma);if(!D)return null;let ev=KYNGO.find(x=>x.id===id);if(!ev){ev={id,sp:1,n:'',t:'',c:[]};KYNGO.push(ev);}
  ev.n=D.ten;ev.t=(D.text||[]).map(s=>dmT(s)).join('\n\n');ev.c=(D.c||[]).map((c,i)=>({l:c.l,go:()=>kyDmChon(ma,i)}));return ev;}
for(const ma in DM_KY)kyDmEv(ma); // đăng ký sẵn để tải lại giữa kỳ ngộ vẫn còn lựa chọn
// câu 82: đang bị truy nã / lùng bắt thì kỳ ngộ ngẫu nhiên tạm hoãn — hai kỳ ngộ này chỉ đơn giản là chưa tới (lần sau thử lại)
function kyDmMo(ma){const r=G.run;const ev=kyDmEv(ma);if(!r||!ev)return false;if(typeof tnaHoan==='function'&&tnaHoan()){dbg('dm.kyHoan',{ma});return false;}r['ky'+ma]=1;dbg('dm.ky',{ma});kyStart(ev);return true;}
function kyDmChon(ma,i){const D=kyD(ma),E=((DM_KY[ma]||{}).e||[])[i]||{};const r=G.run,s=S();const ch=[];
  if(E.tm){const x=Math.min(r.tamma||0,E.tm);r.tamma=Math.max(0,(r.tamma||0)-E.tm);if(x)ch.push(chip('🧘','−'+x,contentText('dm.kyTm'),'up'));}
  if(E.hp){const d=Math.round(s.maxHp*E.hp);const h0=r.hp;r.hp=clamp(r.hp+d,1,s.maxHp);const dd=r.hp-h0;if(dd)ch.push(chip('❤️',(dd<0?'−':'+')+Math.abs(dd),contentText('dm.kyHp'),dd<0?'dn':'up'));}
  if(E.mp&&!isPham()){const d=Math.round(s.maxMp*E.mp);const m0=r.mp;r.mp=clamp(r.mp+d,0,s.maxMp);const dd=r.mp-m0;if(dd)ch.push(chip('💧',(dd<0?'−':'+')+Math.abs(dd),contentText('dm.kyMp'),dd<0?'dn':'up'));}
  dbg('dm.kyChon',{ma,i});return {t:dmT((D&&D.c[i]&&D.c[i].t)||''),ch};}
// A1: tu sĩ tĩnh tọa ở nơi hoang (không phải nơi có dân, không phải tông môn)
function kyA1Thu(){const r=G.run;if(!r||!feat('mong')||r.kyA1||!kyD('A1')||isPham()||r.moving)return false;const n=nodeById(r.at);
  if(!n||DAT_SETTLE.includes(n.type)||(r.scene&&r.scene.type!=='place'))return false;if(!(R()<DM_KY.A1.p))return false;return kyDmMo('A1');}
{const _tt=tinhToa;tinhToa=function(m){const o=_tt.apply(this,arguments);if(o&&G.run)kyA1Thu();return o;};}
// A2: đã có Mộng Ấn, đang ở nơi sông nước; thử mỗi ngày
function kyA2Thu(){const r=G.run;if(!r||!feat('mong')||r.kyA2||!kyD('A2')||r.scene||r._inBq||G.screen!=='map')return false;if(!dmM().mong.length)return false;
  const n=nodeById(r.at);if(!n||!DM_KY.A2.noi.includes(n.type))return false;if(!(R()<DM_KY.A2.p))return false;return kyDmMo('A2');}
{const _adv=advanceTime;advanceTime=function(h){const o=_adv.apply(this,arguments);const r=G.run;if(!r||!(h>0)||h>48||!feat('mong'))return o;
  r.kyA2Acc=(r.kyA2Acc||0)+h;while(r.kyA2Acc>=HD&&G.run){r.kyA2Acc-=HD;if(kyA2Thu())break;}return o;};}
