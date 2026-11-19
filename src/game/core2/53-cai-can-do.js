// Sửa-H (câu 32, 36): đồ cải căn có phẩm, đồ dởm, cộng dồn sau thất bại, dị tượng Địa/Thiên, lô cải căn ở đấu giá thường.
// Bảng CC_DO, CC_LV, CC_DOCFG: content/rules/cai-can.js · chữ: content/text/cai-can.json (khoá ccd.*)
// Vật trong túi (r.qitems): 'ccd_<p>' thật chưa thẩm định · 'cct_<p>' thật đã thẩm định · 'ccg_<p>' dởm chưa lộ (cùng tên với ccd) · 'ccx_<p>' dởm đã lộ.
// G.meta.ccBon: phần cộng thêm vào tỉ lệ thành sau mỗi lần hỏng (đồ hay đường), có trần, giữ qua các kiếp; thành công thì về 0.
// W().dgCc[nút]={m,mua:{p:1}}: lô đã bán trong buổi đấu giá tháng đó.
function ccDoQ(k,p){return k+'_'+p;}
function ccDoParse(q){const m=/^cc([dtgx])_([1-5])$/.exec(String(q||''));return m?{k:m[1],p:+m[2]}:null;}
for(const p in CC_DO){const D=CC_DO[p];
  CAT.byId[ccDoQ('ccd',p)]={id:ccDoQ('ccd',p),n:D.n,i:D.i,d:contentText('ccd.tip',[contentText('ccd.lv.'+p)]),use:contentText('ccd.use')};
  CAT.byId[ccDoQ('ccg',p)]=Object.assign({},CAT.byId[ccDoQ('ccd',p)],{id:ccDoQ('ccg',p)});
  CAT.byId[ccDoQ('cct',p)]={id:ccDoQ('cct',p),n:D.n+' '+contentText('ccd.that'),i:D.i,d:contentText('ccd.tip',[contentText('ccd.lv.'+p)]),use:contentText('ccd.use')};
  CAT.byId[ccDoQ('ccx',p)]={id:ccDoQ('ccx',p),n:D.n+' '+contentText('ccd.gia'),i:'🪨',d:contentText('ccd.giaTip')};}
// ---------- cộng dồn sau thất bại ----------
function ccBon(){return Math.min(CC_DOCFG.bonMax,Math.max(0,+((G.meta&&G.meta.ccBon)||0)));}
function ccBonFail(){if(!G.meta)return;G.meta.ccBon=Math.round(Math.min(CC_DOCFG.bonMax,ccBon()+CC_DOCFG.bon)*1000)/1000;dbg('cc.bon',{v:G.meta.ccBon});}
function ccBonOk(){if(G.meta)G.meta.ccBon=0;}
function ccOkP(p){return Math.min(0.95,p+ccBon());}
// ---------- dị tượng khi cải thành Địa / Thiên linh căn; tông môn kinh động ----------
function ccRootFx(ch){const r=G.run;const k=tlFxKind(r.root);if(!k)return;r.tlFx={k,id:Date.now()+Math.floor(Math.random()*1e3),cach:'caican'};
  const w=W();const sn=typeof contentSectName==='function'?contentSectName():null;let si=sn?w.sects.findIndex(s=>s.n===sn):-1;if(si<0)si=tlSectIdx('');
  if(si>=0){const ppl=tlSectFav(si,k);r.tlFx.sect=w.sects[si].n;r.tlFx.ppl=ppl;if(ch)ch.push(chip('🔔',contentText('tlfx.sectChip',[w.sects[si].n]),contentText('tlfx.sectTip',[ppl.join(', ')]),'up'));}
  log(contentText('tlfx.log.'+k));if(typeof bio==='function')bio(contentText('tlfx.bio.'+k,[Math.floor(r.age),r.ten]));dbg('cc.fx',{k,sect:si});}
// Địa linh căn: một cặp tương sinh (như lúc sinh ra)
{const _mr=ccMakeRoot;ccMakeRoot=function(o,id){const R=_mr.apply(this,arguments);if(R&&R.id==='dia'&&!(o&&o.els))R.els=pick([['kim','thuy'],['thuy','moc'],['moc','hoa'],['hoa','tho'],['tho','kim']]).slice();return R;};}
// đường cải căn: cộng dồn vào tỉ lệ nghi thức, hỏng thì cộng thêm, thành thì về 0 và có dị tượng nếu ra Địa/Thiên
{const _rt=ccRite;ccRite=function(P,st){const r=G.run;const was=!!r.ccOk;const res=_rt.call(this,P,Object.assign({},st,{ok:ccOkP(st.ok)}));
  if(G.run===r&&!was&&r.ccOk){ccBonOk();ccRootFx(res&&res.ch);}else if(!was&&!(G.run===r&&r.ccOk))ccBonFail();
  return res;};}
{const _rd=ccRiteD;ccRiteD=function(P,st){return _rd.call(this,P,Object.assign({},st,{ok:ccOkP(st.ok)}))+(ccBon()>0?' '+contentText('ccd.bonD'):'');};}
// ---------- dùng đồ cải căn ----------
function ccCurLv(r){r=r||G.run;return isVo(r)?0:(CC_LV[r.root&&r.root.id]!=null?CC_LV[r.root.id]:2);}
function ccDoWhy(p,r){r=ccSt(r);const D=CC_DO[p];if(!D||!r)return '?';
  if(!rootKnown(r))return contentText('ccd.chuaTrac');if(r.ccOk)return contentText('cc.daOk');
  if((r.ccWait||0)>W().t)return contentText('cc.cho',[durH(r.ccWait-W().t)]);
  if(ccCurLv(r)>=D.lv)return contentText('ccd.khongHop');if(woundLv()>=2)return contentText('cc.trongThuong');return '';}
function ccDoOutTxt(p){const D=CC_DO[p];return D.to.pick?contentText('ccd.lv.'+p):(ROOT.find(x=>x.id===D.to.id)||{n:''}).n;}
// dùng một món trong túi (q là mã vật). Trả {t,ch} hoặc false khi bị từ chối.
function ccDoUse(q){const r=ccSt();const P=ccDoParse(q);if(!P||P.k==='x')return false;const i=r.qitems.indexOf(q);if(i<0)return false;
  const D=CC_DO[P.p];const why=ccDoWhy(P.p,r);if(why){note(why,'dn');return false;}
  r.qitems.splice(i,1);const ch=[];
  if(P.k==='g'){dbg('ccd.dom',{p:P.p});log(contentText('ccd.domLog',[D.n]));note(contentText('ccd.domNote',[D.n]),'dn');return {t:contentText('ccd.domT',[D.n]),ch:[chip('🪨',D.n,contentText('ccd.giaTip'),'dn')]};}
  if(r.cc){dbg('cc.bo',{id:r.cc.id,why:'ccd'});r.cc=null;}
  const okP=ccOkP(D.ok);const ok=CC_FORCE!=null?!!CC_FORCE:chance(okP);
  if(ok){const to=D.to.pick?pick(D.to.pick.filter(x=>CC_LV[x]>ccCurLv(r))):D.to.id;
    r.root=ccMakeRoot({id:to||'tu',q:'thuong'},null);r.rootKnown=1;r.ccOk=1;ccBonOk();
    log(contentText('cc.okLog',[D.n,rootLabel(r)]));bio(contentText('cc.okBio',[D.n,rootLabel(r)]));dbg('ccd.ok',{p:P.p,root:r.root.id,okP});
    ch.push(chip('🌱',rootLabel(r),contentText('tl.chipTip'),'up'));ccRootFx(ch);clampHp();saveSoon();return {t:contentText('ccd.okT',[D.n]),ch};}
  r.ccWait=W().t+CC_CFG.cho*HY;ccBonFail();log(contentText('cc.failLog',[D.n]));dbg('ccd.fail',{p:P.p,okP});
  const f=D.fail||{};if(f.die&&(CC_FORCE===0?false:chance(f.die))){dbg('cc.chet',{p:P.p});die('caican',{n:D.n});return {t:'',ch:[]};}
  ccFx(f,ch);saveSoon();return {t:contentText('ccd.failT',[D.n]),ch};}
{const _bi=bagItems;bagItems=function(){const L=_bi.apply(this,arguments);for(const it of L){const P=it.ref&&it.ref.t==='qi'&&ccDoParse(it.ref.id);if(P){it.tier=P.p;if(P.k!=='x')it.use=1;}}return L;};}
{const _bu=bagUse;bagUse=function(key,n){const P=typeof key==='string'&&key[0]==='v'&&ccDoParse(key.slice(1));if(!P)return _bu.apply(this,arguments);
  const res=ccDoUse(key.slice(1));if(!res)return 0;if(res.t&&G.run)note(res.t,P.k==='g'?'dn':'');return 1;};}
// ---------- nhận đồ: đồ dởm có thể bị nhìn ra ngay nhờ khảo vật / nhận dược ----------
function ccNhanP(){const v=Math.max(nangV('khao'),nangV('duoc'))/100;return v<CC_DOCFG.nhan?0:Math.min(CC_DOCFG.nhanMax,(v-CC_DOCFG.nhan)/(1-CC_DOCFG.nhan)*CC_DOCFG.nhanMax+0.1);}
function ccDoAdd(p,fake,why){const r=ccSt();let q=ccDoQ(fake?'ccg':'ccd',p);let lo=0;
  if(fake&&chance(ccNhanP())){q=ccDoQ('ccx',p);lo=1;note(contentText('ccd.nhanRa',[CC_DO[p].n]),'');}
  r.qitems.push(q);dbg('ccd.add',{p,fake:fake?1:0,lo,why:why||''});return q;}
// thẩm định (thành / trấn): biết thật giả
function ccTdOk(n){return !!n&&['thanh','tran','ma'].includes(n.type)&&n.state!=='ruin';}
function ccTdGia(){return G.run.pham?{bac:CC_DOCFG.tdBac}:{st:CC_DOCFG.tdSt};}
function ccTdOpts(n){const r=G.run;const L=[];if(!r||!ccTdOk(n))return L;const seen={};
  for(const q of r.qitems||[]){const P=ccDoParse(q);if(!P||P.k==='t'||P.k==='x'||seen[P.p])continue;seen[P.p]=1;const g=ccTdGia();
    L.push({id:'td:'+P.p,l:contentText('ccd.td',[CC_DO[P.p].n]),d:contentText('ccd.tdD'),h:2,st:g.st||0,bac:g.bac||0,no:ccGiaCan(g)?'':g.st?contentText('cc.thieuSt'):contentText('tien.khongDu')});}
  return L;}
function ccTd(p){const r=G.run;const i=r.qitems.findIndex(q=>{const P=ccDoParse(q);return P&&P.p===+p&&(P.k==='d'||P.k==='g');});if(i<0)return false;
  const g=ccTdGia();if(!ccGiaPay(g,'thamdinh'))return false;const P=ccDoParse(r.qitems[i]);r.qitems[i]=ccDoQ(P.k==='d'?'cct':'ccx',p);ccTime(2);
  if(G.run)nangAdd('khao',0.3,'thamdinh');dbg('ccd.td',{p,that:P.k==='d'?1:0});
  return ccRes(contentText(P.k==='d'?'ccd.tdThat':'ccd.tdGiaT',[CC_DO[p].n]),[ccGiaChip(g)]);}
{const _op=ccOpts;ccOpts=function(n){const L=_op.apply(this,arguments);return L.concat(ccTdOpts(n));};}
{const _sh=ccShow;ccShow=function(n){if(G.run&&feat('cc')&&ccTdOpts(n).length)return true;return _sh.apply(this,arguments);};}
{const _do=ccDo;ccDo=function(n,oid){if(String(oid).startsWith('td:')){const o=ccTdOpts(n).find(x=>x.id===oid);if(!o||o.no)return false;return ccTd(oid.slice(3));}return _do.apply(this,arguments);};}
// kẻ bán đồ giả ở bước kiểm chứng: giờ trao một món "đồ cải căn" dởm (trông như thật)
function ccLuaP(id){const L=CC_DOCFG.luaP;const h=ncHash('lua|'+id+'|'+(G.run.kiep||0));let a=0;const tot=L.reduce((x,y)=>x+y,0);for(let k=0;k<L.length;k++){a+=L[k]/tot;if(h<a)return k+1;}return 1;}
{const _do=ccDo;ccDo=function(n,oid){const r=G.run;const id=r&&r.cc&&r.cc.id;const res=_do.apply(this,arguments);
  if(oid==='lua'&&res&&id&&G.run&&G.run.cc&&G.run.cc.lua){const p=ccLuaP(id);ccDoAdd(p,1,'lua');res.ch=(res.ch||[]).concat([chip(CC_DO[p].i,CC_DO[p].n,contentText('ccd.luaTip'),'')]);}
  return res;};}
// kỳ ngộ hiếm: một món đồ cải căn thật (đã biết căn, chưa cải thành trong kiếp)
{const _cm=ccMonth;ccMonth=function(){_cm.apply(this,arguments);const r=G.run;if(!r||r.ccOk||!rootKnown(r)||ccCurLv(r)>=5)return;
  if(!chance(CC_DOCFG.ky))return;const ps=Object.keys(CC_DO).filter(p=>CC_DO[p].lv>ccCurLv(r));if(!ps.length)return;
  const p=+wpick(ps,p=>CC_DO[p].ky);ccDoAdd(p,0,'ky');log(contentText('ccd.kyLog',[CC_DO[p].n]));note(contentText('cc.kyNote',[CC_DO[p].n]),'up');};}
// ---------- đấu giá thường: lô cải căn, vật càng quý càng ra cuối buổi ----------
function dgCcLots(nid,m){const L=[];if(nid==null)return L;m=m==null?ncMonth():m;
  for(const p in CC_DO)if(CC_FORCE===1||ncHash('dgcc|'+nid+'|'+m+'|'+p)<CC_DO[p].dg)L.push(+p);return L;}
function dgCcBought(nid,p){const w=W();const T=w.dgCc&&w.dgCc[nid];return !!(T&&T.m===ncMonth()&&T.mua&&T.mua[p]);}
function dgCcGia(p){return Math.round(CC_DO[p].st*(1+0.15*(+p)));}
// thứ tự các lô trong buổi (ra trước → ra sau): món nhỏ, lô cải căn phẩm thấp tăng dần, món chót; Địa/Thiên là vật áp trục, ra sau cùng
function dgLots(nid){const cc=dgCcLots(nid);const lo=cc.filter(p=>p<=3).sort((a,b)=>a-b),ap=cc.filter(p=>p>3).sort((a,b)=>a-b);
  return ['nho'].concat(lo.map(p=>'cc'+p),['chot'],ap.map(p=>'cc'+p));}
function dgLotVal(k){if(k==='nho')return 30;if(k==='chot')return 55;return dgCcGia(+k.slice(2));}
{const E=EVMAP.dau_gia;if(E&&Array.isArray(E.c)){
  const find=f=>E.c.find(c=>c.e&&f(c.e));const chot=find(e=>e.pill),nho=find(e=>e.relic!=null),rest=E.c.filter(c=>c!==chot&&c!==nho);
  const lot=p=>({i:CC_DO[p].i,l:'{$cc'+p+'}',t:contentText('ccd.dgT',[CC_DO[p].n]),e:{dgCc:p},
    req:r=>{const at=r&&r.at;return !r.pham&&dgCcLots(at).includes(p)&&!dgCcBought(at,p)&&ltGet(0)>=dgCcGia(p)&&bagCap()-bagStacks()>0;}});
  E.c=[nho].concat([1,2,3].map(lot),[chot],[4,5].map(lot),rest).filter(Boolean);
  const _v=E.v;E.v=function(r){const v=_v?_v.apply(this,arguments):{};for(const p in CC_DO)v['cc'+p]=contentText(p>3?'ccd.dgApTruc':'ccd.dgLo',[CC_DO[p].n,dgCcGia(p)]);return v;};}}
{const _ae=applyE;applyE=function(e,v){if(!e||e.dgCc==null)return _ae.apply(this,arguments);const p=+e.dgCc;const r=G.run;const nid=r.at;const g=dgCcGia(p);const ch=[];
  const e2=Object.assign({},e);delete e2.dgCc;const base=Object.keys(e2).length?_ae.call(this,e2,v):[];
  if(ltGet(0)<g)return base;ltAdd(0,-g,'daugia');ch.push(ltChip(0,-g));ccDoAdd(p,0,'daugia');ch.push(chip(CC_DO[p].i,CC_DO[p].n,contentText('ccd.dgTip'),'up'));
  const w=W();w.dgCc=w.dgCc||{};const m=ncMonth();if(!w.dgCc[nid]||w.dgCc[nid].m!==m)w.dgCc[nid]={m,mua:{}};w.dgCc[nid].mua[p]=1;dbg('ccd.dg',{p,g});
  return (base||[]).concat(ch);};}
