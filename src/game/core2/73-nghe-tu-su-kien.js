// Gói GPT đợt năm (L1–L6): 12 sự kiện + 4 kết cục cho sáu nghề tu mở rộng (Cổ sư, Thi tu, Phật tu, Nho tu, Thiên cơ sư, Thương tu).
// Chữ + hiệu ứng lựa chọn: content/nghe-tu/TUxx.json → NTU_DATA (data/09-nghe-tu-du-lieu.js). Luật: TU_SK, TU_KET (content/rules/nghe-tu-mo-rong.js).
// Sự kiện: mỗi tháng, khi đang theo nghề (chính hoặc phụ), rảnh, không bị truy nã hoãn — lấy sự kiện kế tiếp chưa gặp nếu đủ tầng nghề / cảnh giới;
//   cách nhau ít nhất TU_SK.gap tháng (kể cả từ lúc mới vào nghề), khả năng TU_SK.p. Mỗi kiếp mỗi sự kiện một lần. Hộp thoại dùng khung kỳ ngộ (sp:1).
// Kết cục: hết kiếp → xét TU_KET theo thứ tự cho nghề chính rồi nghề phụ, hiện ở màn hết kiếp (G.over.tuKet), cạnh kết cục nghề phàm.
// Trường lưu (bản lưu cũ không có vẫn chạy): r.ntu={c:{'TUxx.Syy': chỉ số lựa chọn (−1 đang mở)}, t: lúc sự kiện cuối, b:{TUxx: lúc bắt đầu đếm}, vo: văn tâm đã vỡ, tk: số lần thiên khiển}
FEAT.ntu=1;
const NTU=typeof NTU_DATA!=='undefined'&&NTU_DATA?NTU_DATA:{};
function ntT(k,a){return contentText('ntu.'+k,a);}
function ntSt(r){r=r||G.run;if(!r)return null;if(!r.ntu||typeof r.ntu!=='object')r.ntu={};const S=r.ntu;
  if(!S.c||typeof S.c!=='object')S.c={};if(!S.b||typeof S.b!=='object')S.b={};return S;}
function ntSu(id,r){const S=ntSt(r);return Object.keys(S.c).filter(k=>k.startsWith(id+'.')).length;}
// ---------- hộp thoại (đăng ký sẵn để tải lại giữa chừng vẫn còn lựa chọn) ----------
function ntEv(id,i){const s=NTU[id]&&NTU[id].sk[i];if(!s)return null;const eid='ntu_'+id+'_'+s.ma;let ev=KYNGO.find(x=>x.id===eid);
  if(!ev){ev={id:eid,sp:1,n:s.ten,t:'',c:s.c.map((c,j)=>({l:c.l,go:()=>ntChon(id,i,j)}))};KYNGO.push(ev);}return ev;}
for(const id in NTU)NTU[id].sk.forEach((_,i)=>ntEv(id,i));
function ntMo(id,i){const r=G.run,ev=ntEv(id,i);if(!r||!ev)return false;const s=NTU[id].sk[i],S=ntSt();
  S.c[id+'.'+s.ma]=-1;S.t=W().t;ev.n=tyT(s.ten);ev.t=s.text.map(x=>tyT(x)).join('\n\n');ev.c.forEach((c,j)=>{c.l=tyT(s.c[j].l);});
  dbg('ntu.mo',{id,ma:s.ma});kyStart(ev);return true;}
function ntChon(id,i,j){const s=NTU[id].sk[i],c=s.c[j];const S=ntSt();if(!S)return {t:''};S.c[id+'.'+s.ma]=j;
  const ch=ntE(c.e,id);dbg('ntu.chon',{id,ma:s.ma,j});return {t:tyT(c.t),ch};}
// hiệu ứng nhỏ của lựa chọn: tv hp mp st tamma (applyE) · hd [chính, tà] · deed · danh (dân vùng) · res (tài nguyên nghề) · xp (tiến bộ nghề) · wound · tho (năm thọ) · khien (thiên khiển)
function ntE(e,id){const r=G.run;let ch=[];if(!e||!r)return ch;
  const base={};for(const k of ['tv','hp','mp','st','tamma'])if(e[k]!=null)base[k]=e[k];
  if(Object.keys(base).length)ch=ch.concat(applyE(base)||[]);if(!G.run)return ch;
  if(e.hd){hdAdd(e.hd[0],e.hd[1],'ntu:'+id);ch.push(nqChip(e.hd[0],e.hd[1]));}
  if(e.deed)ch=ch.concat(deed(e.deed,{why:'ntu'})||[]);
  if(e.danh){const n=nodeById(r.at);const reg=n&&n.r!=null?n.r:(r.region||0);danhPut('reg:'+reg,e.danh);ch.push(chip('🗣️',ntT(e.danh>0?'danhUp':'danhDn'),ntT('danhTip'),e.danh>0?'up':'dn'));}
  if(e.res){r.tuRes=r.tuRes||{};const b=r.tuRes[id]|0;if(e.res>0)mrResAdd(id,e.res);else r.tuRes[id]=Math.max(0,b+e.res);
    const d=(r.tuRes[id]|0)-b;if(d)ch.push(chip('🔮',(d>0?'+':'−')+Math.abs(d),ntT('resTip',[TU_NGHE[id].res]),d>0?'up':'dn'));}
  if(e.xp){const g=tuXp(id,e.xp);if(g)ch.push(chip('📘','+'+g,ntT('xpTip',[TU_NGHE[id].n]),'up'));}
  if(e.wound&&WOUND[e.wound]){addWound(e.wound,'ntu');ch.push(chip('🩸',WOUND[e.wound].n,ntT('woundTip'),'dn'));}
  if(e.khien){addWound('than','tk');note(mrT('thienKhien'),'dn');ch.push(chip('🩸',WOUND.than.n,mrT('thienKhien'),'dn'));}
  if(e.tho)ch=ch.concat(mrTho(e.tho)||[]);
  dbg('ntu.e',{id,k:Object.keys(e).join()});return ch;}
// đếm thiên khiển (cả từ thuật tổn thọ) · ghi văn tâm vỡ (Nho tu mất pháp môn nhưng kết cục vẫn tính)
{const _w=addWound;addWound=function(k,by){const o=_w.apply(this,arguments);if(by==='tk'&&G.run){const S=ntSt();S.tk=(S.tk||0)+1;dbg('ntu.khien',{n:S.tk});}return o;};}
{const _b=mrBo;mrBo=function(id){if(id==='TU20'&&G.run){ntSt().vo=1;dbg('ntu.vo',{});}return _b.apply(this,arguments);};}
// ---------- mỗi tháng ----------
// sự kiện kế tiếp chưa gặp của nghề (theo thứ tự S01…S12); chưa đủ tầng / cảnh giới thì chờ
function ntNext(id,r){r=r||G.run;const D=NTU[id];if(!D||!tuArtOf(id,r))return -1;const S=ntSt(r),tg=tuK(id,r).tang||0;
  for(let i=0;i<D.sk.length;i++){if(S.c[id+'.'+D.sk[i].ma]!=null)continue;
    const B=(TU_SK.rieng&&TU_SK.rieng[id])||TU_SK;if(tg<(B.tang[i]||1)||(r.realm||0)<(B.canh[i]||0))return -1;return i;}
  return -1;}
function ntTick(){const r=G.run;if(!r||!feat('ntu')||!W()||!tuCanTu(r)||ndBusy())return false;const S=ntSt(),t=W().t,gap=TU_SK.gap*HM;
  for(const id of tuList(r)){if(!NTU[id]||!tuArtOf(id,r))continue;if(S.b[id]==null){S.b[id]=t;dbg('ntu.batDau',{id});}}
  if(S.t!=null&&t-S.t<gap)return false;
  for(const id of tuList(r)){if(S.b[id]==null||t-S.b[id]<gap)continue;const i=ntNext(id,r);if(i<0)continue;
    if(typeof tnaHoan==='function'&&tnaHoan()){dbg('ntu.hoan',{id});return false;}
    if(!chance(TU_SK.p))return false;return ntMo(id,i);}
  return false;}
{const _m=ccMonth;ccMonth=function(){const out=_m.apply(this,arguments);try{ntTick();}catch(e){dbg('ntu.loi',{m:String(e.message||e)});}return out;};}
// ---------- kết cục ----------
function ntDk1(dk,id,r,cause){const S=ntSt(r),k=(tuSt(r).k||{})[id]||{};
  if(dk.tang!=null&&(k.tang||0)<dk.tang)return false;if(dk.canh!=null&&(r.realm||0)<dk.canh)return false;
  if(dk.su!=null&&ntSu(id,r)<dk.su)return false;
  if(dk.chon)for(const m in dk.chon)if(S.c[id+'.'+m]!==dk.chon[m])return false;
  if(dk.chonMot&&!dk.chonMot.some(([m,i])=>S.c[id+'.'+m]===i))return false;
  if(dk.hd){const h=hdSum(r);if(dk.hd==='chinh'&&!(h.P>h.T))return false;if(dk.hd==='ta'&&!(h.T>h.P))return false;}
  if(dk.tamma!=null&&(r.tamma||0)<dk.tamma)return false;
  if(dk.mong!=null){const M=typeof dmM==='function'?dmM():null;if(!M||M.mong.length<dk.mong)return false;}
  if(dk.chet&&!dk.chet.includes(cause))return false;if(dk.st!=null&&(r.st||0)<dk.st)return false;
  if(dk.coDoi&&!((r.tuCoDoi||0)>0))return false;if(dk.phaGioi&&!((r.tuPhatTat||0)>0))return false;
  if(dk.vo&&!S.vo)return false;if(dk.khien!=null&&(S.tk||0)<dk.khien)return false;if(dk.khuy&&!r.tuKhuy)return false;
  return true;}
function ntDk(dk,id,r,cause){return Array.isArray(dk)?dk.some(d=>ntDk1(d,id,r,cause)):ntDk1(dk||{},id,r,cause);}
function ntKet(r,cause){r=r||G.run;if(!r||!feat('ntu'))return null;const S=ntSt(r);
  const L=tuList(r).filter(id=>TU_KET[id]);if(S.vo&&!L.includes('TU20'))L.push('TU20');
  for(const id of L){const D=NTU[id];if(!D)continue;
    for(const x of TU_KET[id]){const K=D.ket[x.ma];if(!K||!ntDk(x.dk,id,r,cause))continue;
      return {id,ma:x.ma,n:TU_NGHE[id].n,ten:tyT(K.ten),canh:K.canh.map(s=>tyT(s))};}}
  return null;}
{const _d=die;die=function(cause){let K=null;try{K=ntKet(G.run,cause);}catch(e){K=null;dbg('ntu.loi',{m:String(e.message||e)});}
  if(K){log(ntT('ketLog',[K.n,K.ten]));dbg('ntu.ket',{id:K.id,ma:K.ma,cause});}
  const res=_d.apply(this,arguments);if(G.over&&K)G.over.tuKet=K;return res;};}
