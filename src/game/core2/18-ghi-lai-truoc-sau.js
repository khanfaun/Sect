// ===== Ghi lại trước/sau khi xung kích, đột phá để giao diện diễn hiệu ứng lột xác =====
// Bảng ASC_K: content/rules/asc-k.js
function ascSnap(){const s=S();const o={};for(const [k] of ASC_K)o[k]=s[k]||0;return o;}
function ascDiff(a,b){const L=[];for(const [k,n] of ASC_K){const x=a[k]||0,y=b[k]||0;if(y<=x+1e-6)continue;const p=x>0?(y-x)/x:1;L.push({k,n,lv:p>=0.8?3:p>=0.3?2:1});}return L;}
{const _psA=prepStart;prepStart=function(){const r=G.run;if(r){r._ascPre=ascSnap();r._ascFrom=realmLabel();}return _psA.apply(this,arguments);};}
{const _bfA=btFinish;btFinish=function(){const r=G.run;const rl=r&&r.realm;const pre=r&&r._ascPre,from=r&&r._ascFrom;const stg=(r&&r.bt&&r.bt.stages)||[];const kiep=stg.some(x=>x&&x!=='tamma')?'loi':stg.includes('tamma')?'tamma':'';const res=_bfA.apply(this,arguments);const r2=G.run;
  if(r2&&r2.realm>rl&&pre){r2.asc={k:'bt',kiep,from,to:realmLabel(),realm:r2.realm,diff:ascDiff(pre,ascSnap()),place:(r2.place&&r2.place.t)||'dong'};}if(r2){r2._ascPre=null;}return res;};}
{const _xkA=lkXk;lkXk=function(){const r=G.run;const pre=r&&ascSnap(),from=r&&realmLabel();const ok=_xkA.apply(this,arguments);const r2=G.run;if(ok&&r2&&pre)r2.asc={k:'xk',from,to:realmLabel(),diff:ascDiff(pre,ascSnap())};return ok;};}

// hậu thiên khí vận: mô tả bằng chữ (tăng nhẹ/khá/mạnh/rất mạnh), không lộ con số
const HT_FXN=Object.assign({},TT_FXN,{tammaRes:contentText("core2_18-ghi-lai-truoc-sau_js.009"),tvP:contentText("core2_18-ghi-lai-truoc-sau_js.010")});
function htFxText(x){const L=[];for(const [k,v] of Object.entries(x.fx||{})){const t=HT_FXN[k];if(t)L.push(numWords(t.replace('{v}',(v>0?'+':'')+v)));}return L;}

// ===== Bậc (trước gọi là thiên phú) nay chủ yếu theo lực chiến so với người cùng cảnh giới =====
playerTal=function(){const r=G.run;if(!r)return null;const p=playerTalProfile(r);const lc=lucChien();const f=floorStats();const fl=f?lcCalc(f):0;
  const lv=rateOf('lc',lc).lv;return {tier:clamp(lv,0,4),score:fl>0?lc/fl:1,p,lc:1};};
// đơn vị trong trận: so lực chiến với mức thường của cấp đó (mỗi đại cảnh giới chừng ×2,2)
const TAL_LV_G=2.2;
{const _ut=unitTal;unitTal=function(u){if(!u)return null;if(u.isMain)return playerTal();if(u.kind==='kiep'||u.immune)return null;if(u.f&&u.f!=='nhan'&&u.side==='B')return null;
  const r=G.run;const f=floorStats();if(!f)return _ut(u);const fl=lcCalc(f);const L=u.side==='A'?r.realm:unitLv(u);const exp=fl*Math.pow(TAL_LV_G,L-(r.realm||0));const q=lcCalc(u)/Math.max(1,exp);
  let lv=0;for(const x of RATE_T)if(q>=x-1e-9)lv++;return {tier:clamp(lv,0,4),score:q};};}
// Uy áp theo bậc: bên thấp hơn bị giảm công và thủ (kém 1 bậc 6%, kém từ 2 bậc 12%)
// Bảng TAP_P: content/rules/tap-p.js
{const _ua=uyApSet;uyApSet=function(sc){_ua(sc);const me=mainUnit(sc);if(!me)return;const mt=unitTal(me);if(!mt)return;
  for(const b of sc.units.filter(u=>u.side==='B'&&u.kind!=='kiep'&&!u.immune)){const bt=unitTal(b);if(!bt)continue;const d=bt.tier-mt.tier;
    const lo=d>0?me:d<0?b:null;if(!lo)continue;const k=Math.min(2,Math.abs(d));if((lo.st.tap||0)>=k)continue;const prev=lo.st.tap||0;const m=(1-TAP_P[k])/(1-TAP_P[prev]);
    lo.atk=Math.round(lo.atk*m);lo.def=Math.round(lo.def*m);if(lo.matk)lo.matk=Math.round(lo.matk*m);lo.st.tap=k;
    clog(sc,lo===me?contentText("core2_18-ghi-lai-truoc-sau_js.011", [b.name,k>1?' hẳn hai bậc':'']):contentText("core2_18-ghi-lai-truoc-sau_js.012", [b.name,k>1?' hẳn hai bậc':'']),lo===me?'en':'me');}};}

// ===================== MỊ LỰC =====================
// con số ẩn, người chơi thấy mức chữ. Ảnh hưởng: giá mua bán, phép thử thuyết phục, ấn tượng ban đầu của NPC,
// dễ được nhận làm đồ đệ / vào tông, mặt trái: dễ bị ghen ghét.
// Bảng MI_N: content/characters/mi-n.js
function miBase(r){r=r||G.run;if(r.mi==null){const h=hashS('mi'+r.ten+r.kiep+(r.bornT||0));r.mi=clamp(3+(h%7)+((h>>>5)%7),2,18);}return r.mi;}
function miOf(){const r=G.run;if(!r)return 10;return Math.round(miBase(r)+((aggFx().mi)||0));}
function miName(v){if(v==null)v=miOf();for(const [t,n] of MI_N)if(v>=t)return n;return contentText("core2_18-ghi-lai-truoc-sau_js.miName.019");}
// giá: mỗi điểm trên 10 giảm 0,8% giá mua (tối đa 10%), dưới 10 thì đắt lên (tối đa 6%)
function miShop(){return clamp((miOf()-10)*0.8,-6,10);}
{const _agM=aggFx;aggFx=function(){const fx=_agM();if(G.run&&!G.run._miIn){G.run._miIn=1;try{fx.shopP=(fx.shopP||0)+miShop();}finally{G.run._miIn=0;}}return fx;};}
// bán đồ: giá bán tăng theo mị lực thay vì giảm
{const _sl=sellList;sellList=function(){const L=_sl();const b=miShop();const m=(1+Math.max(-6,b)/100)/Math.max(0.6,1-Math.min(40,(aggFx().shopP||0))/100);for(const x of L)x.p=Math.max(1,Math.round(x.p*m));return L;};}
// phép thử thuyết phục: cộng theo mị lực
const MI_RX=/thuyết|xin |mời|nói |hỏi|khuyên|năn nỉ|dỗ|làm quen|kết giao|cầu|thương lượng|mặc cả|trả giá/i;
CHKN.mi=contentText("core2_18-ghi-lai-truoc-sau_js.020");
{const _cc=chkChance;chkChance=function(chk){if(chk&&chk[0]==='mi'){const s=S();return clamp(0.5+(miOf()-chk[1]-rT())*0.05+s.van*0.004,0.08,0.95);}return _cc(chk);};}
{const _ch=choose;choose=function(i){const r=G.run,sc=r&&r.scene;let bump=0;if(sc&&sc.type==='event'){const e=EVMAP[sc.id];const L=resolveP(e,sc.cur)||[];const c=L[i];if(c&&c.chk&&(MI_RX.test(c.l||'')||sc.id==='son_mon')){bump=clamp((miOf()-10)*0.012,-0.06,0.12);}}
  if(!bump)return _ch(i);const _cc2=chkChance;chkChance=function(k){return clamp(_cc2(k)+bump,0.05,0.97);};try{return _ch(i);}finally{chkChance=_cc2;}};}

// ===================== HẢO CẢM (gộp) =====================
// -100 … 100. Mức: Tử địch, Thù địch, Ghét bỏ, Xa lạ, Quen biết, Thân thiện, Tri kỷ, Đồng minh
// Bảng FAV_N: content/characters/fav-n.js
function favLv(v){for(const x of FAV_N)if(v>=x[0])return x;return FAV_N[FAV_N.length-1];}
function npcs(){const r=G.run;return r.npcs||(r.npcs={});}
function favKey(n){return String(n||'');}
function npcRec(n,info){const N=npcs();const k=favKey(n);if(!k)return null;let o=N[k];if(!o){o=N[k]={n:k,fav:0,met:0};
  // ấn tượng ban đầu theo mị lực
  o.fav=clamp(Math.round((miOf()-10)*0.8),-8,12);}
  if(info)for(const x in info)if(info[x]!=null)o[x]=info[x];return o;}
function favOf(n){const r=G.run;const o=npcs()[favKey(n)];if(o)return o.fav;
  const s=(r.seeds||[]).find(x=>x.ten===n);if(s)return s.t==='an'?45:-60;
  const w=W();const ri=(w.rivals||[]).findIndex(x=>x.ten===n);if(ri>=0){const rv=(r.rivals||[]).find(x=>x.i===ri);return clamp(Math.round(((rv&&rv.rel)||0)*10),-100,100);}
  if((r.party||[]).some(p=>p.ten===n))return 40;return 0;}
function favAdd(n,d,why){if(!n||!d)return 0;const o=npcRec(n);if(o.fav===0&&!o.met)o.fav=favOf(n)||o.fav;const b=o.fav;o.fav=clamp(o.fav+d,-100,100);const L0=favLv(b),L1=favLv(o.fav);
  if(L0[1]!==L1[1]&&typeof note==='function')note(`${n}: ${L1[1].toLowerCase()}`,o.fav>b?'up':'dn');if(why)log(`${n} ${o.fav>b?contentText("core2_18-ghi-lai-truoc-sau_js.favAdd.028"):contentText("core2_18-ghi-lai-truoc-sau_js.favAdd.029")} (${why}).`);return o.fav-b;}
// đồng bộ từ hệ thống cũ: ân tình, oán thù, thiên kiêu
{const _sd=typeof addSeed==='function'?addSeed:null;}
// gặp NPC trên bản đồ: ghi nhận, kẻ thù thì tấn công, người thân thì tặng quà
{const _me2=meetEnt;meetEnt=function(e){const r=G.run;if(e&&e.name&&['khach','tuantra','truysat','thuong','thienkieu'].includes(e.type)){
    const o=npcRec(e.name,{type:e.type,g:e.data&&e.data.g,sect:e.data&&e.data.s});o.met=(o.met||0)+1;if(o.met===1&&e.type!=='truysat')o.fav=Math.max(o.fav,favOf(e.name));
    const f=o.fav;
    if(f<=-50&&e.type!=='thienkieu'&&!r.moving){note(contentText("core2_18-ghi-lai-truoc-sau_js.030", [e.name]),'dn');startCombat({cnt:1},{kind:'node'});const sc=G.run.scene;if(sc&&sc.units){const u=sc.units.find(x=>x.side==='B');if(u){u.name=e.name;if(u.realName)u.realName=e.name;}}return;}
    if(f>=35&&chance(f>=60?0.5:0.3)){const g=f>=60?ri(15,40):ri(5,15);const v=Math.round(g*SC[rT()]);r.st+=v;note(contentText("core2_18-ghi-lai-truoc-sau_js.031", [e.name,v]),'up');}
    else favAdd(e.name,2);}
  return _me2(e);};}
// đánh người: kẻ bại thêm hận
{const _fcF=finishCombat;finishCombat=function(sc){const r=G.run;if(sc&&sc.units&&sc.over==='win'&&!sc.spar)for(const u of sc.units)if(u.side==='B'&&isHumanFoe(u)){const n=u.realName||u.name;if(n&&n!=='???')favAdd(n,-35);}
  if(sc&&sc.spar&&sc.units)for(const u of sc.units)if(u.side==='B'){const n=u.realName||u.name;if(n&&n!=='???')favAdd(n,sc.over==='win'?6:3);}return _fcF(sc);};}
// tặng lễ: tốn linh thạch, tăng hảo cảm (càng thân càng khó tăng)
function giftCost(n){return Math.max(5,Math.round(12*SC[rT()]));}
function favGift(n){const r=G.run;const c=giftCost(n);if(r.st<c)return contentText("core2_18-ghi-lai-truoc-sau_js.favGift.032");r.st-=c;const f=favOf(n);const d=f>=60?3:f>=35?5:f>=0?8:6;favAdd(n,d+Math.max(0,Math.round((miOf()-10)/5)));advanceTime(2);return '';}

// ===================== HẢO CẢM TÔNG MÔN =====================
// = 60% cao tầng (chưởng môn, trưởng lão) + 40% đệ tử (thiên kiêu và đệ tử đã gặp của tông đó)
// Bảng ELDER_T: content/rules/elder-t.js
function sectElders(i){const w=W();const s=w.sects[i];if(!s)return [];if(!s.eld){const R1=seedRng('eld:'+s.n);s.eld=ELDER_T.map((t,k)=>({t,ten:(NAME&&NAME.ho?NAME.ho[Math.floor(R1()*NAME.ho.length)]:'Lý')+' '+(k===0?contentText("core2_18-ghi-lai-truoc-sau_js.sectElders.036"):['Huyền','Thanh','Vân','Mặc',contentText("core2_18-ghi-lai-truoc-sau_js.sectElders.037")][Math.floor(R1()*5)]+' '+['Tử','Tôn','Lão'][Math.floor(R1()*3)])}));}return s.eld;}
function sectDisciples(i){const w=W();const r=G.run;const L=[];(w.rivals||[]).forEach((x,k)=>{if(x.s===i)L.push(x.ten);});for(const o of Object.values(npcs()))if(o.sect===i&&!L.includes(o.n))L.push(o.n);return L;}
function sectFav(i){const r=G.run;const E=sectElders(i).map(e=>favOf('@'+i+':'+e.t));const D=sectDisciples(i).map(favOf);const avg=a=>a.length?a.reduce((x,y)=>x+y,0)/a.length:0;
  const base=(r.sfav&&r.sfav[i])||0;return clamp(Math.round(avg(E)*0.6+avg(D)*0.4+base),-100,100);}
function sectFavAdd(i,d){const r=G.run;r.sfav=r.sfav||{};r.sfav[i]=clamp((r.sfav[i]||0)+d,-100,100);}

// ===================== MỐI QUAN HỆ =====================
// kết nghĩa (huynh đệ/tỷ muội), nghĩa phụ/nghĩa mẫu, sư đồ (bái sư / thu đồ), phu thê, đạo lữ
// Bảng REL_T: content/characters/rel-t.js
function bonds(){const r=G.run;return r.bonds||(r.bonds={});}
function relOfNpc(n){return bonds()[favKey(n)]||null;}
// điều kiện từng mối quan hệ; trả '' nếu được
function relWhy(n,k,info){const r=G.run;const T=REL_T[k];const f=favOf(n);info=info||{};const B=bonds();
  if(B[favKey(n)])return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.049")+REL_T[B[favKey(n)]].n+'.';if(f<T.need)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.050")+favLv(T.need)[1]+'.';
  const has=x=>Object.values(B).includes(x);const myR=isPham()?-1:r.realm;const hisR=info.realm!=null?info.realm:null;
  if(k==='sp'){if(has('sp'))return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.051");if(hisR==null||hisR<myR+1)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.052");}
  if(k==='dd'){if(hisR!=null&&hisR>=myR)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.053");if(myR<1)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.054");}
  if(k==='np'){if(hisR==null||hisR<myR)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.055");}
  if(k==='pt'||k==='dl'){if(has('pt')||has('dl'))return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.056")+(has('pt')?contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.057"):contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.058"))+'.';if(info.g&&info.g===r.g)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.059");if(miOf()<5)return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.060");
    if(k==='dl'&&(isPham()||hisR==null||Math.abs(hisR-myR)>1))return contentText("core2_18-ghi-lai-truoc-sau_js.relWhy.061");}
  return '';}
function relMake(n,k,info){const w=relWhy(n,k,info);if(w)return w;bonds()[favKey(n)]=k;favAdd(n,5);log(contentText("core2_18-ghi-lai-truoc-sau_js.relMake.062", [REL_T[k].n.toLowerCase(),n]));if(typeof bio==='function')bio(contentText("core2_18-ghi-lai-truoc-sau_js.relMake.063", [Math.floor(G.run.age),G.run.ten,n,REL_T[k].n.toLowerCase()]));return '';}
function relBreak(n){const B=bonds();const k=B[favKey(n)];if(!k)return;delete B[favKey(n)];favAdd(n,-40,contentText("core2_18-ghi-lai-truoc-sau_js.relBreak.064"));}
{const _agR=aggFx;aggFx=function(){const fx=_agR();const r=G.run;if(r&&r.bonds)for(const k of Object.values(r.bonds)){const T=REL_T[k];if(T)for(const x in T.fx)fx[x]=(fx[x]||0)+T.fx[x];}return fx;};}
// mặt trái mị lực: rất đẹp thì đôi khi bị kẻ xấu để mắt (thêm hận nhẹ với người lạ gặp lần đầu)
{const _nr=npcRec;npcRec=function(n,info){const N=npcs();const fresh=!N[favKey(n)];const o=_nr(n,info);if(fresh&&o&&miOf()>=20&&chance(0.12))o.fav-=25;return o;};}
