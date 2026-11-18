// ĐỢT 5.2: khung nghề (Đại đạo ba ngàn, HN B §7.1). Bảng NGHE, NG_MAX, NG_EV_P: content/rules/nghe.js; chữ: content/text/nghe.json
// r.paths={mã:{xp,bac,last,phai,wait,n:số việc đã làm}} — tối đa NG_MAX đường đang theo; đường thứ tư làm đường lâu không làm nhất phai (ngừng tăng).
// Việc của nghề hiện trong hộp Mưu sinh (Đ3.7) theo nơi và mùa. Đủ kinh nghiệm → kỳ ngộ thăng bậc; xong kỳ ngộ mới lên bậc.
// Sự kiện nghề (content/events/nghe/*.json) mang nhãn "nghe:<mã>" và "nghe-tang:<0|1|2>" (nhập môn / giữa đường / đỉnh cao).
FEAT.nghe=1;
function ngPaths(r){r=r||G.run;if(!r)return {};if(!r.paths||typeof r.paths!=='object'||Array.isArray(r.paths))r.paths={};return r.paths;}
function ngActive(r){const P=ngPaths(r);return Object.keys(P).filter(k=>NGHE[k]&&!P[k].phai);}
function ngMul(r){r=r||G.run;return isVo(r)?1.2:r.pham?1:0.7;}
function ngheBac(ma,r){const p=ngPaths(r)[ma];return p?p.bac|0:0;}
// bắt đầu / làm lại một đường: quá NG_MAX thì đường lâu không làm nhất phai
function ngStart(ma){const r=G.run,P=ngPaths(r);let p=P[ma];if(p&&!p.phai)return p;
  const act=ngActive(r).filter(k=>k!==ma);
  if(act.length>=NG_MAX){const old=act.sort((a,b)=>(P[a].last||0)-(P[b].last||0))[0];P[old].phai=1;note(contentText('ng.phai',[NGHE[old].n.toLowerCase()]),'dn');dbg('nghe.phai',{ma:old});}
  if(!p){p=P[ma]={xp:0,bac:0,last:W().t};note(contentText('ng.vao',[NGHE[ma].n.toLowerCase()]),'up');dbg('nghe.vao',{ma});if(typeof tutTick==='function')tutTick('role');}
  else p.phai=0;
  return p;}
function ngXp(ma,x){const r=G.run;if(!r||!NGHE[ma]||!(x>0))return 0;const p=ngStart(ma);const g=Math.round(x*ngMul(r)*10)/10;p.xp=(p.xp||0)+g;p.last=W().t;dbg('nghe.xp',{ma,x:g,xp:p.xp});return g;}
// lên bậc: đủ kinh nghiệm thì mở kỳ ngộ (nếu đang rảnh); từ chối thì đợi một tháng
function ngReady(ma){const p=ngPaths()[ma],N=NGHE[ma];if(!p||p.phai||!N)return false;const nb=(p.bac|0)+1;return nb<N.ranks.length&&(p.xp||0)>=N.xp[nb]&&!(p.wait&&W().t<p.wait);}
function ngCheck(ma){const r=G.run;if(!r||!ngReady(ma))return false;if(r.scene&&r.scene.type!=='place')return false;
  const nb=(ngPaths()[ma].bac|0)+1;const ev=KYNGO.find(x=>x.id==='ng_'+ma+'_'+nb);if(!ev)return false;kyStart(ev);dbg('nghe.ky',{ma,nb});return true;}
function ngUp(ma,nb){const p=ngPaths()[ma];if(!p||(p.bac|0)!==nb-1)return {t:''};p.bac=nb;p.wait=0;const N=NGHE[ma];
  log(contentText('ng.upLog',[N.ranks[nb],N.n.toLowerCase()]));dbg('nghe.up',{ma,bac:nb});saveSoon();
  return {t:contentText('ng.upOkT',[N.ranks[nb]]),ch:[chip('🧭',N.ranks[nb],N.n,'up')]};}
for(const ma in NGHE){const N=NGHE[ma];for(let k=1;k<N.ranks.length;k++){const id='ng_'+ma+'_'+k;if(KYNGO.some(x=>x.id===id))continue;
  const key='ng.'+ma+'.up'+k;const t=CONTENT_TEXT[key]?contentText(key):contentText('ng.upT',[N.ranks[k]]);
  KYNGO.push({id,n:contentText('ng.upN',[N.ranks[k]]),t,sp:1,c:[{l:contentText('ng.upOk'),go:()=>ngUp(ma,k)},{l:contentText('ng.upLui'),go:()=>{const p=ngPaths()[ma];if(p)p.wait=W().t+HM;return {t:contentText('ng.upLuiT')};}}]});}}

// ----- việc của nghề: hiện trong hộp Mưu sinh -----
function ngAct(ma,aid){const N=NGHE[ma];return N&&N.acts.find(a=>a.id===aid);}
function ngWhy(ma,a,n){const r=G.run,s=S(),N=NGHE[ma];if(!n||!a.noi.includes(n.type)||n.state==='ruin')return contentText('vt.khongNoi');
  if(N.dk&&N.dk.vo&&voBac(r)<N.dk.vo)return contentText('ng.can',[voBacN(N.dk.vo)]);
  if(a.min&&ngheBac(ma)<a.min)return contentText('ng.canBac',[N.ranks[a.min]]);
  for(const k in (a.stat||{}))if((s[k]||0)<a.stat[k])return contentText('vt.can',[STAT_N[k]||k,a.stat[k]]);
  if(a.mua&&!a.mua.includes(seasonOf(W().t)))return contentText('vt.traiMua');
  if(a.h<=VT_NGAY&&vtUsed(r)+a.h>VT_NGAY)return contentText('vt.met');
  if(a.von&&!bacCan(a.von[0]))return contentText('tien.khongDu');
  if(r.scene&&r.scene.type==='combat')return contentText('vt.ban');return '';}
function ngCong(ma,a){const t=NGHE[ma].thu[ngheBac(ma)]||1;return [Math.round(a.cong[0]*t),Math.round(a.cong[1]*t)];}
function ngList(n){const L=[];if(!n||!feat('nghe'))return L;for(const ma in NGHE){const N=NGHE[ma];for(const a of N.acts){if(!a.noi.includes(n.type))continue;if(a.min&&ngheBac(ma)<a.min-1)continue;
  L.push({id:'ng:'+ma+':'+a.id,ma,n:a.l+' · '+N.n,h:a.h,cong:a.von?[0,0]:ngCong(ma,a),von:a.von||null,an:!!a.an,ngu:false,rui:!!a.ruiRo,why:ngWhy(ma,a,n)});}}return L;}
{const _vl=vtList;vtList=function(n){const L=_vl.apply(this,arguments);return L.concat(ngList(n));};}
function ngDo(ma,aid){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);const a=ngAct(ma,aid);if(!a||ngWhy(ma,a,n))return false;
  let von=0;if(a.von){von=ri(a.von[0],a.von[1]);von=Math.min(von,r.bac||0);if(!bacPay(von,'nghe.von'))return false;}
  const d0=vtDay(),u0=vtUsed(r);if(a.an)VT_AN=1;try{advanceTime(a.h);}finally{VT_AN=0;}if(!G.run)return true;
  if(a.h<=VT_NGAY){const d=vtDay();r.lamNgay=d===d0?{d,h:u0+a.h}:{d,h:Math.max(0,u0+a.h-24*(d-d0))};}
  const ch=[],msg=[contentText('ng.xong',[a.l.toLowerCase()])];let lost=false;
  if(a.ruiRo&&chance(a.ruiRo.p)){const H=a.ruiRo.hau||{};const s=S();if(H.wound)addWound(H.wound,'nghe');if(H.hpLoss)r.hp=Math.max(1,r.hp-Math.round(s.maxHp*H.hpLoss/100));
    if(H.bacLoss)bacAdd(-Math.round((r.bac||0)*H.bacLoss/100),'mat');if(H.mat){lost=true;msg.push(contentText('ng.lo'));}
    const k='ng.rui.'+ma+'.'+aid;if(CONTENT_TEXT[k])msg.push(contentText(k));dbg('nghe.rui',{ma,id:aid});}
  let c;if(a.von)c=lost?0:Math.round(von*(1+a.lai[0]+R()*(a.lai[1]-a.lai[0]))*((NGHE[ma].thu[ngheBac(ma)]||1)/2+0.5));
  else{const cg=ngCong(ma,a);c=ri(cg[0],cg[1]);if(typeof anState==='function'&&['la','kiet'].includes(anState(r)))c=Math.round(c*0.7);}
  if(c>0)bacAdd(c,'nghe:'+ma);if(c-von!==0||c>0)ch.push(bacChip(c-von));ch.push(chip('⏳',durH(a.h),contentText('vt.gio'),''));
  if(a.an){r.anFree=1;anFed(r,'viec');}
  const g=ngXp(ma,a.xp);{const p=ngPaths(r)[ma];if(p)p.n=(p.n||0)+1;}if(g>0)ch.push(chip('🧭',NGHE[ma].n,contentText('ng.chipTip',[NGHE[ma].n.toLowerCase()]),'up'));
  if(typeof tutTick==='function')tutTick('job');
  const s2=G.run.scene;if(s2===sc){sc.msg=msg;sc.chips=ch;sc.seq=(sc.seq||0)+1;}
  dbg('nghe.lam',{ma,id:aid,c,von});
  if(G.run&&G.run.scene===sc){if(!ngCheck(ma)&&chance(NG_EV_P))ngEvent(ma);}
  saveSoon();return true;}
{const _vd=vtDo;vtDo=function(id){if(typeof id==='string'&&id.startsWith('ng:')){const [,ma,aid]=id.split(':');return ngDo(ma,aid);}return _vd.apply(this,arguments);};}
{const _pa=placeActs;placeActs=function(n){const L=_pa.apply(this,arguments);if(feat('nghe')&&feat('tien')&&n&&n.state!=='ruin'&&!L.some(x=>x.a==='muusinh')&&ngList(n).length)
  L.push({a:'muusinh',i:'🧺',l:contentText('vt.act'),h:0,tip:contentText('vt.tip'),dis:false,x:''});return L;};}

// ----- sự kiện nghề: chỉ hiện khi đang theo nghề và đúng tầng bậc -----
function ngEvTags(d){const T=(d&&d.tags)||[];const m=T.find(x=>/^nghe:/.test(x));if(!m)return null;const t=T.find(x=>/^nghe-tang:/.test(x));return {ma:m.slice(5),tang:t?+t.slice(10):null};}
function ngEvOk(d){const g=ngEvTags(d);if(!g)return true;const p=ngPaths()[g.ma];if(!p||p.phai)return false;return g.tang==null||Math.min(2,Math.floor((p.bac|0)/2))===g.tang;}
{const _ct=contentTriggerOk;contentTriggerOk=function(d){if(!_ct.apply(this,arguments))return false;return !G.run||ngEvOk(d);};}
function ngEvent(ma){const r=G.run;const n=nodeById(r.at);const type=n&&(typeof tAs==='function'?tAs(n.type):n.type);
  const L=EVS.filter(e=>e.content&&ngEvTags(e.content)&&ngEvTags(e.content).ma===ma&&contentPoolOk(e,type,e.src||'explore',!!e.spec));
  if(!L.length)return false;const e=pick(L);dbg('nghe.ev',{ma,id:e.id});startEvent(e.id);return true;}
// hiệu ứng sự kiện: bac (đồng, có thể âm), nxp [mã nghề, kinh nghiệm]
{const _ae=applyE;applyE=function(e,v){const has=e&&(e.bac!=null||e.nxp);const ch=_ae.apply(this,[has?Object.assign({},e,{bac:undefined,nxp:undefined}):e,v]);if(!has||!G.run)return ch;const out=Array.isArray(ch)?ch:[];
  if(e.bac){const d=e.bac<0?-Math.min(G.run.bac||0,-e.bac):e.bac;bacAdd(d,'ev');if(d)out.push(bacChip(d));}
  if(Array.isArray(e.nxp)&&NGHE[e.nxp[0]]){const g=ngXp(e.nxp[0],e.nxp[1]);if(g>0)out.push(chip('🧭',NGHE[e.nxp[0]].n,contentText('ng.chipTip',[NGHE[e.nxp[0]].n.toLowerCase()]),'up'));}
  return out;};}

// ----- Đạo đồ: tên đường, danh vị, tiến độ bằng chữ -----
function ngView(){const r=G.run;if(!r)return [];const P=ngPaths(r);return Object.keys(P).filter(k=>NGHE[k]).map(ma=>{const p=P[ma],N=NGHE[ma],b=p.bac|0;
  return {ma,n:N.n,rank:N.ranks[b],txt:p.phai?contentText('ng.phaiTxt'):ngReady(ma)?contentText('ng.sapLen'):contentText('ng.tien.'+b),phai:!!p.phai};}).sort((a,b)=>a.phai-b.phai);}
// HD17 (tân thủ): theo một nghề hoặc nhập lưu võ học cũng tính là đã nhận một vai
{const _tr=tutRole;tutRole=function(r){return _tr.apply(this,arguments)||Object.values(ngPaths(r)).some(p=>(p.n||0)>0)||voBac(r)>=1;};}
// xuất thân vào nghề sẵn; bản lưu cũ có r.paths rỗng
{const _nr=newRun;newRun=function(c){const res=_nr.apply(this,arguments);const r=G.run;if(r){r.paths={};for(const ma in NGHE)if((NGHE[ma].og||[]).includes(r.origin))r.paths[ma]={xp:NGHE[ma].xp[1]/2,bac:0,last:W().t};r._ngV1=1;}return res;};}
{const _r=run2;run2=function(){const r=_r.apply(this,arguments);if(r&&!r._ngV1){r._ngV1=1;ngPaths(r);}return r;};}
