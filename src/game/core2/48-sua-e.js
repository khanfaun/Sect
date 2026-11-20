// Sửa-E (người dùng chốt đợt 2): câu 17 cầm đồ/giá bán; 18 nguồn linh thạch phẩm cao; 19 Tích Cốc Đan; 20 trả trước nợ vay; 23 thương lượng.
// Bảng: SUAE ở content/rules/sua-e.js.

// ---------- câu 17: hiệu cầm đồ — đồ phàm trả xu, đồ tu sĩ trả linh thạch (không ra tiền phàm) ----------
function camPhamGia(id){const C=SUAE.cam;if(C.pham[id])return C.pham[id];if(String(id).startsWith('bt_')&&typeof VO_HOC!=='undefined'){const h=VO_HOC.find(x=>'bt_'+x.id===id);if(h&&h.bac)return Math.round(h.bac*C.btPer);}return 0;}
function camLt(n,it){return Math.max(1,Math.round((it.p0!=null?it.p0:it.p)*SUAE.cam.ltPer*ncGet(n.id,'cam')));}
function camPhamList(n){const r=G.run;const L=[],seen={};(r.qitems||[]).forEach((id,i)=>{const g=camPhamGia(id);if(!g||seen[id])return;seen[id]=1;
  L.push({id:'q:'+i,l:contentText('cam.l',[CAT.byId[id].n]),d:contentText('cam.dPham'),h:0,st:0,g:{txt:fmtBac(Math.max(1,Math.round(g*ncGet(n.id,'cam'))))},no:''});});return L;}
function camLeftE(n){const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{})[n.id];return Math.max(0,SUAE.cam.thang-(T&&T.m===m?T.n:0));}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='camdo')return _vo.apply(this,arguments);const left=camLeftE(n);
  const L=camPhamList(n).concat(sellList().map(it=>({id:it.k+':'+it.i,l:contentText('cam.l',[it.n]),d:contentText('cam.d'),h:0,st:0,g:{txt:'+'+camLt(n,it)+' '+ltName(0)},no:left?'':contentText('cam.het')})));
  return L.length?L:[{id:'none',l:contentText('cam.khong'),d:'',h:0,st:0,no:contentText('cam.khong')}];};}
camDo=function(n,id){const r=G.run;const [k,is]=id.split(':');
  if(k==='q'){const i=+is,qid=(r.qitems||[])[i];const g0=camPhamGia(qid);if(!g0)return false;const g=Math.max(1,Math.round(g0*ncGet(n.id,'cam')));
    r.qitems.splice(i,1);bacAdd(g,'camdo');dbg('cam.pham',{id:qid,g});return [bacChip(g)];}
  if(!camLeftE(n))return false;const it=sellList().find(x=>x.k===k&&x.i===+is);if(!it)return false;const g=camLt(n,it);
  if(k==='r'){const rel=r.relics[it.i];r.relics.splice(it.i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(it.i,1);
  ltAdd(0,g,'camdo');const w=W(),m=ncMonth();const T=(w.camdo=w.camdo||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;ncPush(n.id,'cam',-TIEN2.nc.day);dbg('cam.do',{n:it.n,lt:g});
  return [chip('💎','+'+g+' '+ltName(0),'Linh thạch','up')];};
// binh khí phàm: bày ở tạp hóa thành; phàm nhân mang theo thì đánh mạnh hơn
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const sc=G.run&&G.run.scene;
  if(sc&&sc.type==='shop'&&n&&n.type==='thanh'&&feat('tien')&&!sc._vk){sc._vk=1;const ids=Object.keys(SUAE.vk);const id=ids[Math.floor(ncHash('vk|'+n.id+'|'+ncMonth())*ids.length)];
    if(!sc.items.some(x=>x.k==='qi'&&x.id===id)){const it={k:'qi',id,bac:SUAE.vk[id].bac,p:0,qty:1,nc:'qi:'+id,b0:SUAE.vk[id].bac};shopPrice(n.id,it);sc.items.push(it);}}
  return o;};}
function vkAtkP(r){r=r||G.run;if(!r||!r.pham)return 0;let b=0;for(const id of r.qitems||[])if(SUAE.vk[id])b=Math.max(b,SUAE.vk[id].atkP);return b;}
{const _S=S;S=function(){const s=_S.apply(this,arguments);const b=vkAtkP();if(b)s.atk=Math.round(s.atk*(1+b/100));return s;};}

// ---------- câu 18: nguồn linh thạch Trung/Thượng/Cực ----------
function ltChip(k,x){return chip('💠',(x>0?'+':'')+x+' '+ltName(k),contentText('lt.chip'),x>0?'up':'dn');}
// lăn bảng SUAE.ltRoll[tên]; Hạ phẩm trả qua hiệu ứng st (nhân hệ số vùng), phẩm cao cộng thẳng vào r.lt
function ltRollDo(name,why){const T=SUAE.ltRoll[name];const r=G.run;if(!T||!r||r.pham)return {st:0,ch:[]};const ch=[];let st=0;
  for(const [k,p,a,b] of T){if(R()>=p)continue;const x=a+Math.floor(R()*(b-a+1));if(k===0)st+=x;else{ltAdd(k,x,why||name);ch.push(ltChip(k,x));}}
  dbg('lt.roll',{name,st,lt:ltArr(r).slice()});return st?{st,ch}:{st:0,ch};}
{const _ae=applyE;applyE=function(e,v){if(!e||(e.ltRoll==null&&e.dgBan==null&&e.lt==null))return _ae.apply(this,arguments);const e2=Object.assign({},e);delete e2.ltRoll;delete e2.dgBan;delete e2.lt;
  let extra=[];
  if(e.ltRoll){const o=ltRollDo(e.ltRoll);if(o.st)e2.st=(e2.st||0)+o.st;extra=extra.concat(o.ch);}
  if(Array.isArray(e.lt))e.lt.forEach((x,i)=>{if(x){const d=ltAdd(i+1,x,'ev');if(d)extra.push(ltChip(i+1,d));}});
  if(e.dgBan)extra=extra.concat(dgBan());
  return _ae.call(this,e2,v).concat(extra);};}
// đấu giá thường: gửi bán món giá trị nhất, thu Hạ/Trung phẩm
function dgBan(){const r=G.run;const L=sellList();if(!L.length){note(contentText('dg.khong'),'');return [];}
  const it=L.reduce((a,b)=>(b.p0!=null?b.p0:b.p)>(a.p0!=null?a.p0:a.p)?b:a);const v=Math.round((it.p0!=null?it.p0:it.p)*SUAE.dg.nhan);
  const trung=Math.min(SUAE.dg.trungMax,Math.floor(v/100)),ha=v-trung*100;
  if(it.k==='r'){const rel=r.relics[it.i];r.relics.splice(it.i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();}else r.pills.splice(it.i,1);
  const ch=[];if(ha){ltAdd(0,ha,'daugia');ch.push(ltChip(0,ha));}if(trung){ltAdd(1,trung,'daugia');ch.push(ltChip(1,trung));}
  log(contentText('dg.ban',[it.n]));dbg('dg.ban',{n:it.n,v,ha,trung});return ch;}
// kỳ ngộ: cơ duyên lớn có thể ra Cực phẩm (nơi ra nhiều nhất)
{const _kp=kyPick;kyPick=function(i){const r=G.run,sc=r&&r.scene;const ok0=sc&&sc.type==='kyngo'&&!sc.res;const ev=ok0&&KYNGO.find(x=>x.id===sc.ev);const res=_kp.apply(this,arguments);
  if(ev&&!ev.joke&&!ev.sp&&G.run&&G.run===r&&sc.res&&!r.pham){const o=ltRollDo(ev.paid?'coduyen':'huuduyen','kyngo');if(o.ch.length)sc.chips=(sc.chips||[]).concat(o.ch);}
  return res;};}
// U Minh Ám Hội: trong quỷ thị (thành, ma tu) lúc quỷ thị mở
VENUE_N.amhoi=contentText('am.n');VENUE_IN.amhoi=[contentText('am.in1'),contentText('am.in2')];
function amOpen(n){return !!n&&((isTuK(n.type)&&isThanhT(n.type))||n.type==='ma')&&n.state!=='ruin'&&G.run&&!G.run.pham&&(typeof svcOpen!=='function'||svcOpen('ghost'));}
function amLeft(n){const w=W(),m=ncMonth();const T=(w.amhoi=w.amhoi||{})[n.id];return Math.max(0,SUAE.am.thang-(T&&T.m===m?T.n:0));}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(amOpen(n)&&!L.some(x=>x.a==='amhoi'))L.push({a:'amhoi',i:'🎭',l:contentText('am.n'),h:1,tip:contentText('am.tip'),dis:false,x:''});return L;};}
function amOpts(n){const r=G.run,A=SUAE.am;const left=amLeft(n);const L=[];
  r.relics.forEach((x,i)=>{const t=x.tier||0;if(t<A.minT)return;
    L.push({id:'bao:'+i+':2',l:contentText('am.giao',[x.name,(t-1)+' '+ltName(2)]),d:contentText('am.giaoD'),h:1,st:0,g:{txt:'+'+(t-1)+' '+ltName(2)},no:left?'':contentText('am.het')});
    if(t>=A.cucT)L.push({id:'bao:'+i+':3',l:contentText('am.giao',[x.name,'1 '+ltName(3)]),d:contentText('am.giaoD'),h:1,st:0,g:{txt:'+1 '+ltName(3)},no:left?'':contentText('am.het')});});
  L.push({id:'mua:2',l:contentText('am.mua',[A.thuong+' '+ltName(2),contentText('am.baoMoi')]),d:contentText('am.muaD'),h:1,st:0,g:{txt:GRADE[clamp(rT()+A.len,0,4)]},no:!left?contentText('am.het'):ltGet(2)<A.thuong?contentText('am.thieu'):''});
  L.push({id:'mua:3',l:contentText('am.mua',['1 '+ltName(3),contentText('am.danMoi',[A.cucDan])]),d:contentText('am.muaD'),h:1,st:0,g:{txt:A.cucDan+' 💊'},no:!left?contentText('am.het'):ltGet(3)<1?contentText('am.thieu'):''});
  return L;}
function amDo(n,id){const o=amOpts(n).find(x=>x.id===id);if(!o||o.no)return false;const r=G.run,A=SUAE.am;const p=id.split(':');let ch=[];
  if(p[0]==='bao'){const i=+p[1],k=+p[2];const rel=r.relics[i];if(!rel)return false;const x=k===3?1:(rel.tier||0)-1;r.relics.splice(i,1);const c=run2().chu;for(let j=0;j<8;j++)if(c[j]&&c[j].k==='r'&&c[j].n===rel.name)c[j]=null;clampHp();ltAdd(k,x,'amhoi');ch=[chip('🏺','−'+rel.name,'Pháp bảo','dn'),ltChip(k,x)];}
  else if(p[1]==='2'){ltAdd(2,-A.thuong,'amhoi');ch=[ltChip(2,-A.thuong)].concat(applyE({relic:clamp(rT()+A.len,0,4)}));}
  else{ltAdd(3,-1,'amhoi');ch=[ltChip(3,-1)];for(let j=0;j<A.cucDan;j++)ch=ch.concat(applyE({pill:['taytuy','phacanh']}));}
  const w=W(),m=ncMonth();const T=(w.amhoi=w.amhoi||{});if(!T[n.id]||T[n.id].m!==m)T[n.id]={m,n:0};T[n.id].n++;dbg('am.do',{id});return ch;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v!=='amhoi')return _vo.apply(this,arguments);return amOpts(n);};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='amhoi')return _vd.apply(this,arguments);const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place')return false;
  const n=nodeById(sc.id);if(!amOpen(n))return false;const ch=amDo(n,id);if(!ch)return false;sc.msg=[contentText('am.xong')];sc.chips=ch;sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;};}

// ---------- câu 19: Tích Cốc Đan (Trúc Cơ+) — no trong SUAE.tc.ngay ngày ----------
// bế quan ×⅓, sau bế quan ×½ (39-tien-te.js, đã có); tĩnh toạ không giảm. r.tichCoc = thời điểm hết no (giờ thế giới).
function tcCon(r){r=r||G.run;return r&&(r.tichCoc||0)>W().t?Math.ceil((r.tichCoc-W().t)/HD):0;}
{const _ar=anRate;anRate=function(r){if(tcCon(r))return 0;return _ar.apply(this,arguments);};}
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const sc=G.run&&G.run.scene;const C=SUAE.tc;
  if(sc&&sc.type==='shop'&&n&&feat('an')&&C.noi.includes(n.type)&&!sc._tc&&(n.type!=='tong'||(G.run.flags.tongmon&&typeof contentOwnSect==='function'&&contentOwnSect(n)))){sc._tc=1;
    if(!sc.items.some(x=>x.k==='qi'&&x.id===C.id)){const it={k:'qi',id:C.id,bac:0,p:price(C.st),qty:C.qty,nc:'qi:'+C.id};it.p0=it.p;shopPrice(n.id,it);sc.items.push(it);}}
  return o;};}
// mua vật trong túi bằng linh thạch (vật có p, không có bac)
{const _by=buy;buy=function(i){const r=G.run,sc=r&&r.scene;const it=sc&&sc.items&&sc.items[i];if(!it||it.k!=='qi'||it.bac||!it.p||it.sold)return _by.apply(this,arguments);
  if((r.st||0)<it.p)return;r.st-=it.p;(r.qitems=r.qitems||[]).push(it.id);if(it.qty!=null){it.qty--;if(it.qty<=0)it.sold=1;}else it.sold=1;
  log(contentText('tien.muaVat',[CAT.byId[it.id].n]));if(it.nc){const nid=sc.node!=null?sc.node:r.at;ncPush(nid,it.nc,TIEN2.nc.day);shopPrice(nid,it);}dbg('tc.mua',{id:it.id,p:it.p});};}
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L)if(it.ref&&it.ref.t==='qi'&&it.ref.id===SUAE.tc.id)it.use=1;return L;};}
{const _bu=bagUse;bagUse=function(key,n){const id=String(key).slice(1);if(key[0]!=='v'||id!==SUAE.tc.id)return _bu.apply(this,arguments);const r=G.run;
  if(r.pham||(r.realm||0)<1){note(contentText('tc.khong'),'dn');return 0;}const i=(r.qitems||[]).indexOf(id);if(i<0)return 0;r.qitems.splice(i,1);
  r.tichCoc=Math.max(r.tichCoc||0,W().t)+SUAE.tc.ngay*HD;if(typeof anFed==='function')anFed(r,'tichcoc');r.anPart=0;log(contentText('tc.dung'));dbg('tc.dung',{den:r.tichCoc});return 1;};}

// ---------- câu 20: trả trước một phần khoản vay ----------
function vayTtList(r){r=r||G.run;const V=r&&r.vay;if(!V||!(V.tra>1))return [];const S2=new Set(SUAE.traTruoc.filter(x=>x<V.tra));const h=Math.floor(V.tra/2);if(h>0)S2.add(h);return [...S2].sort((a,b)=>a-b);}
{const _vo=venueOpts;venueOpts=function(n,v){const L=_vo.apply(this,arguments);if(v!=='vay'||!G.run||!G.run.vay)return L;const r=G.run;const i=L.findIndex(x=>x.id==='tra');
  const add=vayTtList(r).map(x=>({id:'tt:'+x,l:contentText('no.ttL',[fmtBac(x)]),d:contentText('no.ttD',[fmtBac(r.vay.tra-x)]),h:0,st:0,g:{txt:fmtBac(x)},no:(r.bac||0)>=x?'':contentText('no.khongDu')}));
  L.splice(i<0?0:i+1,0,...add);return L;};}
{const _vd=venueDo;venueDo=function(v,id){if(v!=='vay'||!String(id).startsWith('tt:'))return _vd.apply(this,arguments);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place'||!r.vay)return false;
  const x=+id.slice(3);if(!vayTtList(r).includes(x)||(r.bac||0)<x)return false;bacAdd(-x,'vay.tt');r.vay.tra-=x;dbg('no.vayTt',{x,con:r.vay.tra});
  sc.msg=[contentText('no.traXong',[fmtBac(x)])];sc.chips=[bacChip(-x)];sc.venue=null;sc.seq=(sc.seq||0)+1;saveSoon();return true;};}

// ---------- câu 23: thương lượng giảm giá hàng tiệm một chút (tối đa ~5%) ----------
function macGiam(){const r=G.run;if(!r||typeof nangV!=='function')return 0;const M=SUAE.mac;return clamp(M.max*(nangV('thuong')-M.tu)/(100-M.tu),0,M.max);}
{const _sp=shopPrice;shopPrice=function(nid,it){_sp.apply(this,arguments);const g=macGiam();if(!g)return;
  if(it.bac)it.bac=Math.max(1,Math.round(it.bac*(1-g)));else if(it.p)it.p=Math.max(1,Math.round(it.p*(1-g)));};}
// mỗi lần mở tiệm tính lại theo năng lực hiện tại
{const _os=openShop;openShop=function(n){const o=_os.apply(this,arguments);const sc=G.run&&G.run.scene;if(sc&&sc.type==='shop'&&Array.isArray(sc.items)){const nid=n?n.id:G.run.at;
  for(const it of sc.items)if(it.nc!=null&&!it.sold&&(it.b0||it.p0))shopPrice(nid,it);dbg('mac.giam',{g:Math.round(macGiam()*1000)/10});}return o;};}
