// ĐỢT 2.7: Tuế biến — thể chất, khí vận, mệnh cách đổi theo năm (HN A.6, B §12). Bảng TUE: content/rules/tue-bien.js
// Mỗi lần nhân vật thêm một tuổi chạy một mốc; nhảy nhiều năm thì chạy đủ từng mốc; tải lại không chạy lại (r.tue.last).
FEAT.tue=1;
function tueDef(id){if(TUE[id])return [id,TUE[id]];if(id&&id.startsWith('mc_')&&TUE[id.slice(3)])return [id.slice(3),TUE[id.slice(3)]];return [id,null];}
function tueSrc(r){return [].concat((r.the||[]).map(id=>({id,k:'the'})),(r.kv||[]).map(id=>({id,k:'kv'})),r.trait&&r.trait!=='none'?[{id:r.trait,k:'tr'}]:[]);}
function tueName(id){const p=TT_PHYS.find(x=>x.id===id);if(p)return p.name||p.n;const d=TT_DEST[id];if(d)return d.name;const t=TRAIT.find(x=>x.id===id);return t?t.n:id;}
function tueInit(r){if(!r.tue||typeof r.tue!=='object')r.tue={last:ageY(r),sum:{},src:{},n:{},k0:r.kills||0};const T=r.tue;T.sum=T.sum||{};T.src=T.src||{};T.n=T.n||{};return T;}
function tueCapKey(k){return k.startsWith('elP_')?'elP':k;}
// cộng v vào khóa k của nguồn id: trần/sàn riêng của nguồn (D.cap) rồi trần/sàn chung (TUE_CAP, TUE_FLOOR)
function tueAdd(r,id,D,k,v){const T=tueInit(r);if(isVo(r)&&(k==='mpP'||k==='tvP'))return 0;const S0=T.src[id]||(T.src[id]={});
  const own=(D.cap||{})[k];const cur=S0[k]||0;let nx=cur+v;
  if(v>0&&own!=null&&own>0)nx=Math.min(nx,own);if(v<0&&own!=null&&own<0)nx=Math.max(nx,own);
  let d=nx-cur;const tot=T.sum[k]||0;const ck=tueCapKey(k);const hi=TUE_CAP[ck]??Infinity,lo=TUE_FLOOR[ck]??-Infinity;
  const nt=clamp(tot+d,Math.min(lo,tot),Math.max(hi,tot));d=nt-tot;if(!d)return 0;
  S0[k]=+(cur+d).toFixed(3);T.sum[k]=+nt.toFixed(3);return d;}
function tueOldAt(r,s){let at=s.life*TUE_OLD.at;if(isPham()||isVo(r))at=Math.min(at,TUE_OLD.pham);
  if(tueSrc(r).some(x=>{const D=tueDef(x.id)[1];return D&&D.oldMul;}))at*=1.1;return at;}
function tueYear(age){const r=G.run;if(!r)return;const T=tueInit(r);const s=S();const old=age>=tueOldAt(r,s);const lines=[];const groups={},seen=new Set();
  const killed=(r.kills||0)>(T.k0||0);
  for(const x of tueSrc(r)){const [id,D]=tueDef(x.id);if(!D)continue;const g=D.same||id;groups[g]=(groups[g]||0)+1;}
  for(const x of tueSrc(r)){const [id,D]=tueDef(x.id);if(!D)continue;const g=D.same||id;if(seen.has(g))continue;seen.add(g);
    if(D.y&&!old){const n=T.n[id]||0;if(!D.capY||n<D.capY){let any=false;
      for(const [k,v] of Object.entries(D.y)){const ev=typeof D.every==='object'?(D.every[k]||1):(D.every||1);if(age%ev!==0)continue;tueAdd(r,id,D,k,v);any=true;}
      if(any)T.n[id]=n+1;}}
    for(const E0 of [].concat(D.ev||[])){if(!G.run)return;let E=E0;
      if(E.season&&seasonOf(W().t)!==E.season)continue;if(E.minAge&&age<E.minAge)continue;if(E.maxAge&&age>E.maxAge)continue;if(E.ifKill&&!killed)continue;
      if(!chance(Math.min(1,E.p*(groups[g]>1?1.1:1))))continue;if(E.alt)E=Object.assign({},E,pick(E.alt));
      tueEv(E,id,D);if(!E.quiet&&!lines.includes(id))lines.push(id);}}
  if(!G.run)return;if(old)tueOld(r,age,s);T.k0=r.kills||0;
  if(lines.length)log(contentText('tue.log',[age,lines.map(tueName).join(', ')]));
  dbg('tue.year',{age,ev:lines.join(',')});}
function tueEv(E,id,D){const r=G.run;const s=S();
  if(E.tamma)r.tamma=clamp((r.tamma||0)+ri(E.tamma[0],E.tamma[1]),0,100);
  if(E.healHp)r.hp=Math.min(s.maxHp,r.hp+Math.round(s.maxHp*ri(E.healHp[0],E.healHp[1])/100));
  if(E.healMp&&!isVo(r))r.mp=Math.min(s.maxMp,r.mp+Math.round(s.maxMp*ri(E.healMp[0],E.healMp[1])/100));
  if(E.tvPct&&!isVo(r)&&!isPham())addTv(E.tvPct);
  if(E.st)r.st+=ri(E.st[0],E.st[1]);if(E.stPct)r.st+=Math.max(1,Math.round((r.st||0)*E.stPct/100));
  if(E.cure)cureWound(['ngoai','bong','doc']);if(E.wound)addWound(E.wound,'tue');
  if(E.hpLoss)r.hp=Math.max(1,r.hp-Math.round(s.maxHp*E.hpLoss/100));
  if(E.add)for(const [k,v] of Object.entries(E.add))tueAdd(r,id,D,k,v);
  if(E.hd)hdAdd(E.hd.p||0,E.hd.t||0,'tue');
  if(E.sp==='vocan'&&isVo(r)){if(typeof hasTp==='function'&&hasTp())r.tamma=clamp((r.tamma||0)+2,0,100);else if(r.age-r.birthAge>=3)tueAdd(r,id,Object.assign({},D,{cap:{tam:3}}),'tam',1);}
  if(E.sp==='daoma'){const h=hdSum(r);if(h.P<h.T)hdAdd(2,0,'tue');else hdAdd(0,2,'tue');}
  clampHp();dbg('tue.ev',{id});}
// tuổi già (HN B §12.6)
function tueOld(r,age,s){const T=tueInit(r);T.sum.hpOld=Math.max(TUE_OLD.hpFloor,(T.sum.hpOld||0)+TUE_OLD.hpP);
  if(age%TUE_OLD.tpEvery===0)T.sum.tpOld=Math.max(TUE_OLD.tpFloor,(T.sum.tpOld||0)-1);
  if(r.age>=s.life*TUE_OLD.sick&&chance(TUE_OLD.pSick))addWound('ngoai','gia');}
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.tue=null;tueInit(r);}return res;};}
// mốc "qua năm": đúng một lần cho mỗi tuổi, kể cả khi nhảy nhiều năm; chết giữa chừng thì dừng
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);if(!G.run||!feat('tue'))return o;tueInit(G.run);let guard=0;
  while(G.run&&ageY(G.run)>G.run.tue.last&&guard++<6000){G.run.tue.last++;tueYear(G.run.tue.last);}return o;};}
// cộng tuế biến vào chỉ số
{const _ag=aggFx;aggFx=function(){const fx=_ag.apply(this,arguments);const r=G.run;if(!r||!r.tue||!r.tue.sum)return fx;
  for(const [k,v] of Object.entries(r.tue.sum)){if(!v||k==='lifeY')continue;if(k.startsWith('elP_')){const e=k.slice(4);fx.elP=fx.elP||{};fx.elP[e]=(fx.elP[e]||0)+v;}
    else if(k==='hpOld')fx.hpP=(fx.hpP||0)+v;else if(k==='tpOld')fx.tp=(fx.tp||0)+v;else fx[k]=(fx[k]||0)+v;}return fx;};}
{const _S=S;S=function(){const s=_S.apply(this,arguments);const r=G.run;if(r&&r.tue&&r.tue.sum&&r.tue.sum.lifeY)s.life=Math.round(s.life+r.tue.sum.lifeY);return s;};}
// dòng "Theo năm tháng" cho tooltip
function tueTxt(id){const D=tueDef(id)[1];return D&&D.txt?contentText('tue.tip',[D.txt]):'';}
