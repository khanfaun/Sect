// ----- thiêu đốt thọ nguyên: mỗi trận tối đa hai lần, lần sau đắt và dữ hơn -----
// Lần 1 · Đốt huyết: mất ~7% thọ tối đa, hồi 60% linh lực, đầy thể lực, giải độc, bỏng, suy yếu. Không mất lượt.
// Lần 2 · Đốt nguyên thần: mất ~14%; 3 lượt tới đòn đánh xuyên 25% thủ và hút 10% sát thương; hết thì suy yếu 2 lượt.
// Mỗi lượt chỉ thiêu đốt một lần.
const BURN=[{n:'Đốt huyết',m:0.07},{n:'Đốt nguyên thần',m:0.14}];
function burnInfo(sc){const r=G.run;const k=(sc&&sc.burnN)||0;if(k>=2)return {k,done:true};const y=Math.max(4*(k+1),Math.round(LIFE[r.realm]*BURN[k].m));const left=Math.floor(S().life-r.age);return {k,y,left,ok:left>y+1};}
function playerBurn(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;const b=burnInfo(sc);if(b.done||!b.ok||u.burnedTurn||u.dazed)return false;const r=G.run;u.burnedTurn=1;
  r.lifeAdj-=b.y;sc.burnN=b.k+1;
  if(b.k===0){u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*0.6));u.tl=100;u.st.poison=0;u.st.burn=0;u.st.weak=0;clog(sc,`Ngươi thiêu đốt thọ nguyên. Huyết khí sôi trào: linh lực hồi phục quá nửa, thể lực sung mãn, độc tố tiêu tan.`,'me');}
  else{u.st.soul=3;clog(sc,`Ngươi đốt cả nguyên thần, thọ nguyên hao tổn. Ba lượt tới mỗi đòn xuyên giáp, hút máu.`,'me');}
  syncMain(sc);sc.rev=(sc.rev||0)+1;log(`Thiêu đốt thọ nguyên trong trận.`);return true;}
{const _rs=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){if(u.ctrl==='player'&&sk.fx&&sk.fx.p){let pi=0,dr=0;if(u.st&&u.st.soul>0){pi+=0.25;dr+=10;}if(sc.pt&&PT[sc.pt.el].drain)dr+=PT[sc.pt.el].drain;
  if(pi||dr)sk=Object.assign({},sk,{fx:Object.assign({},sk.fx,{pierce:Math.min(1,(sk.fx.pierce||0)+pi),drain:(sk.fx.drain||0)+dr})});}return _rs(sc,u,sk,lv,tg,qm,offs);};}
{const _oz=onZero;onZero=function(sc,u){const had=u.st&&u.st.soul>0;_oz(sc,u);if(had&&u.st){u.st.soul--;if(!u.st.soul){u.st.weak=Math.max(u.st.weak||0,2);clog(sc,'Nguyên thần cạn kiệt: ngươi suy yếu hai lượt.','en');}}};}
function fightsHuman(sc){return (sc.en&&sc.en.f==='nhan')||sc.units.some(u=>u.side==='B'&&u.hp>0&&u.f==='nhan');}
// ----- Khí Hải: đại huyệt (ô đặt công pháp) mở theo cảnh giới; 12 tiểu huyệt quanh đan điền khai dần bằng tu vi và linh thạch -----
// Mỗi tiểu huyệt mang một hành (Mộc Hỏa Thổ Kim Thủy lặp lại), khai rồi cho một chỉ số nhỏ;
// nếu đại huyệt gần nó đang vận hành môn cùng hành thì môn đó mạnh thêm 8%.
chuSlots=function(){return CHU_N[G.run.realm]||4;};chuBlocked=function(){return 0;};
const TH_N=12,TH_EL=['moc','hoa','tho','kim','thuy'],TH_MAX=[3,5,7,9,11,12];
const TH_FX={kim:['atkP',2,'Công vật lý +{v}%'],moc:['hpP',3,'Khí huyết +{v}%'],thuy:['mpP',4,'Linh lực +{v}%'],hoa:['matkP',2.5,'Công phép +{v}%'],tho:['defP',3,'Thủ +{v}%']};
function thEl(i){return TH_EL[i%5];}
function thList(){const r=G.run;return r.th||(r.th=[]);}
function thNear(i,n){return Math.round((i+0.5)/TH_N*n)%n;}
function thCost(){const n=thList().length;return {tv:8+n*2,st:price(6+n*3),h:3*HM};}
function thWhy(i){const r=G.run;if(thList().includes(i))return 'Đã khai.';if(thList().length>=TH_MAX[clamp(r.realm,0,5)])return realmName()+' chỉ khai được '+TH_MAX[clamp(r.realm,0,5)]+' tiểu huyệt.';
  const c=thCost();if(r.scene||r.moving)return 'Phải đứng yên ngoài bản đồ.';if(r.tv<c.tv)return 'Cần '+c.tv+'% tu vi.';if(r.st<c.st)return 'Cần '+c.st+' linh thạch.';return '';}
function thOpenAct(i){const r=G.run;if(thWhy(i))return false;const c=thCost();r.tv-=c.tv;r.st-=c.st;thList().push(i);advanceTime(c.h);if(!G.run)return true;log('Khai thông một tiểu huyệt hành '+EL[thEl(i)].n+'.');clampHp();saveSoon();return true;}
{const _cf=chuFx;chuFx=function(fx){_cf(fx);const r=G.run;if(!r||!r.th)return;for(const i of r.th){const f=TH_FX[thEl(i)];fx[f[0]]=(fx[f[0]]||0)+f[1];}};}
{const _cp=chuPot;chuPot=function(v,i){let p=_cp(v,i);const it=v.it[i];if(it&&G.run.th){const el=chuBase(it.el);for(const j of G.run.th)if(thNear(j,v.n)===i&&thEl(j)===el)p+=0.08;}return Math.round(p*100)/100;};}

// ================= ĐỢT 6: ĐỊNH LỰC, THẦN LỰC, PHÁP TƯỚNG =================
// hiệu ứng hình ảnh: phần luật chỉ ghi sự kiện vào hàng đợi, giao diện tự lấy ra vẽ
function cfx(sc,o){const q=sc.fxq||(sc.fxq=[]);q.push(o);if(q.length>24)q.shift();}
// Định lực: mỗi bên vào trận đều 100. Trúng đòn thì giảm; về 0 thì choáng, mất lượt kế tiếp, rồi hồi đầy.
// Thần lực: chỉ nhân vật chính có. Đánh trúng hoặc bị đánh trúng thì nạp; đầy thì hiển hóa pháp tướng.
function onHit(sc,u,t,d,crit,blocked,sk){
  cfx(sc,{k:'hit',id:t.id,from:u.id,d,crit:crit?1:0,blk:blocked?1:0,el:(sk.el&&sk.el!=='vo')?sk.el:(u.ctrl==='player'?'vo':u.el||'vo'),big:(sk.t>=3||sk.fx.charge)?1:0});
  if(d<=0||t.immune||t.kind==='kiep')return;
  if(t.dl==null)t.dl=100;
  if(!t.dazed){let loss=clamp(d/Math.max(1,t.max)*220,8,45);if(blocked)loss*=0.5;if(t.boss)loss*=0.5;if(crit)loss*=1.3;t.dl=Math.max(0,t.dl-loss);
    if(t.dl<=0){t.dazed=1;clog(sc,(t.isMain?'Ngươi':t.name)+' bị đánh cho đầu óc quay cuồng, nhất thời không ra tay được.',t.side==='A'?'en':'me');cfx(sc,{k:'daze',id:t.id});
      if(t.phase==='charge'&&!(t.pending&&t.pending.sk.fx.steady)){toRecover(sc,t,1);doneAct(sc,t);}}}
  if(!sc.pt){const me=mainUnit(sc);if(me&&me.hp>0){if(u===me)me.than=Math.min(100,(me.than||0)+12);else if(t===me)me.than=Math.min(100,(me.than||0)+17);}}
}
function dazeClear(sc,u){u.dazed=0;u.dl=100;clog(sc,(u.isMain?'Ngươi':u.name)+' vẫn còn choáng váng, đứng chôn chân tại chỗ.',u.side==='A'?'en':'me');}
{const _ai=aiAct;aiAct=function(sc,u){if(u&&u.hp>0&&u.dazed){dazeClear(sc,u);toRecover(sc,u,1);doneAct(sc,u);return;}return _ai(sc,u);};}
{const _pa=playerAct;playerAct=function(id,tid){const sc=G.run.scene;const u=readyPlayer(sc);if(!u)return false;
  if(u.dazed){const ok=_pa('_wait');if(ok)dazeClear(sc,u);return ok;}
  if(!sc._ult&&G.run.kn&&G.run.kn.ult&&G.run.kn.ult.includes(id))return false; // thần thông chỉ tung qua pháp tướng
  return _pa(id,tid);};}
{const _pp=playerPillAct;playerPillAct=function(i){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return playerAct('_wait');return _pp(i);};}
{const _pf=playerFlee;playerFlee=function(){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return playerAct('_wait');return _pf();};}
{const _pd=playerDD;playerDD=function(j,t){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _pd(j,t);};}
{const _pm=playerMind;playerMind=function(t){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _pm(t);};}
{const _py=playerYield;playerYield=function(){const u=readyPlayer(G.run.scene);if(u&&u.dazed)return false;return _py();};}
// ----- Pháp tướng: thần lực đầy thì hiển hóa (không mất lượt), được tăng sức theo hệ của thần thông đang gắn.
// Khi pháp tướng còn, ra tay lần nữa để tung đòn tối thượng (nếu có gắn thần thông): tung xong pháp tướng tan, thần lực về 0.
const PT={
  kim:{n:'Canh Kim Pháp Tướng',d:'Công +30%',atk:.3,turns:3},moc:{n:'Thanh Đế Pháp Tướng',d:'Thủ +20%, mỗi lượt hồi 6% khí huyết',def:.2,regen:1,turns:4},
  thuy:{n:'Huyền Vũ Pháp Tướng',d:'Linh lực hồi đầy, công +20%',mp:1,atk:.2,turns:3},hoa:{n:'Chu Tước Pháp Tướng',d:'Công +40%, thủ −10%',atk:.4,def:-.1,turns:3},
  tho:{n:'Hậu Thổ Pháp Tướng',d:'Thủ +60%, hộ thể bằng 20% khí huyết',def:.6,block:.2,turns:4},loi:{n:'Lôi Tổ Pháp Tướng',d:'Chí mạng +25%, công +15%',crit:25,atk:.15,turns:3},
  bang:{n:'Băng Phách Pháp Tướng',d:'Thủ +40%, mọi kẻ địch suy yếu 2 lượt',def:.4,weak:2,turns:3},phong:{n:'Cự Phong Pháp Tướng',d:'Né trọn 2 đòn kế tiếp, công +20%',evade:2,atk:.2,turns:3},
  am:{n:'U Minh Pháp Tướng',d:'Công +25%, đòn đánh hút 10% sát thương',atk:.25,drain:10,turns:3},phat:{n:'Kim Thân Pháp Tướng',d:'Thủ +30%, mỗi lượt hồi 6% khí huyết',def:.3,regen:1,turns:0},
  vo:{n:'Chân Nguyên Pháp Tướng',d:'Công +20%, thủ +20%',atk:.2,def:.2,turns:0}};
function ultSkill(){const r=G.run;const id=r.kn&&r.kn.ult&&r.kn.ult[0];const own=id&&r.skills.find(k=>k.id===id);return own?{sk:SK[id],lv:own.lv}:null;}
function ptPreview(){const U0=ultSkill();const el=U0&&PT[U0.sk.el]?U0.sk.el:'vo';return {el,P:PT[el],sk:U0&&U0.sk};}
function ptEnd(sc,u,msg){const p=sc.pt;if(!p)return;const o=p.undo;u.atk=o.atk;u.matk=o.matk;u.def=o.def;u.crit=o.crit;sc.pt=null;u.than=0;if(msg)clog(sc,msg,'fl');cfx(sc,{k:'ptend'});sc.rev=(sc.rev||0)+1;}
function playerUlt(){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.dazed||sc.kiep)return false;
  if(!sc.pt){if((u.than||0)<100)return false;const V=ptPreview(),P=V.P;
    sc.pt={el:V.el,n:P.n,left:P.turns||-1,sk:V.sk?V.sk.id:null,undo:{atk:u.atk,matk:u.matk,def:u.def,crit:u.crit}};
    if(P.atk){u.atk=Math.round(u.atk*(1+P.atk));u.matk=Math.round((u.matk||u.atk)*(1+P.atk));}if(P.def)u.def=Math.round(u.def*(1+P.def));if(P.crit)u.crit=(u.crit||5)+P.crit;
    if(P.mp)u.mp=u.maxMp;if(P.block)u.st.block=(u.st.block||0)+Math.round(u.max*P.block);if(P.evade)u.st.evade=(u.st.evade||0)+P.evade;if(P.regen)u.st.regen=Math.max(u.st.regen||0,1);
    if(P.weak)for(const t of alive(sc,'B'))if(!t.immune)t.st.weak=Math.max(t.st.weak||0,P.weak);
    clog(sc,`Thần lực viên mãn! ${P.n} hiển hóa sau lưng ngươi: ${numWords(P.d)}${P.turns?' trong '+numVi(P.turns)+' lượt':' tới hết trận'}.`,'me');
    cfx(sc,{k:'ult',el:V.el,n:P.n});syncMain(sc);sc.rev=(sc.rev||0)+1;return true;}
  // đòn tối thượng
  if(!sc.pt.sk||!SK[sc.pt.sk])return false;const U0=ultSkill();const base=SK[sc.pt.sk];const lv=U0&&U0.sk===base?U0.lv:1;
  const fx=Object.assign({},base.fx,{p:(base.fx.p||1.5)*1.6});delete fx.charge;delete fx.selfHp;const sk=Object.assign({},base,{c:0,fx});
  cfx(sc,{k:'strike',el:base.el,n:base.n});clog(sc,`Pháp tướng dồn hết thần uy vào một đòn: ${base.n}!`,'me');
  sc._ult=1;let ok=false;try{const foes=alive(sc,'B');runAct(sc,()=>beginSkill(sc,u,sk,lv,foes.length?foes.slice().sort((a,b)=>b.hp-a.hp)[0].id:null));ok=true;}finally{sc._ult=0;}
  ptEnd(sc,u,'Pháp tướng tan đi, thần lực cạn sạch.');return ok;}
{const _oz2=onZero;onZero=function(sc,u){if(u.isMain&&sc.pt&&PT[sc.pt.el].regen)u.st.regen=Math.max(u.st.regen||0,1);_oz2(sc,u);
  if(u.isMain&&sc.pt&&sc.pt.left>0&&u.hp>0){sc.pt.left--;if(sc.pt.left<=0)ptEnd(sc,u,'Hết thời hạn, pháp tướng tan đi.');}};}

// ================= ĐỢT 7: TƯ CHẤT, NIỆM LỰC, THẦN LỰC CỦA ĐỐI THỦ =================
// Tư chất: độ tinh thuần của linh căn (1–100), định sẵn lúc sinh. Linh căn là "mấy đường ống" dẫn linh khí,
// tư chất là "ống to hay nhỏ": cùng là tam linh căn nhưng tư chất cao vẫn tu nhanh hơn hẳn.
// Linh căn càng ít hệ thì tư chất thường càng cao. Hệ số tu luyện từ 0,7 (tư chất 0) tới 1,3 (tư chất 100).
const TC_BIAS={thien:15,bien:12,song:6,tam:0,tu:-4,tap:-8};
const TC_N=[[90,'Thiên tư'],[75,'Cực phẩm'],[55,'Thượng phẩm'],[35,'Trung phẩm'],[0,'Hạ phẩm']];
function tuChat(){const r=G.run;if(!r)return 50;if(r.tuchat==null){const h=hashS('tuchat'+r.ten+r.kiep+(r.bornT||0));r.tuchat=clamp((h%41)+((h>>>7)%41)+10+(TC_BIAS[r.root.id]||0),5,100);}return r.tuchat;}
function tcName(v){return (TC_N.find(x=>v>=x[0])||TC_N[4])[1];}
function tcMult(v){return 0.7+v*0.006;}
// Niệm lực: kho sức thần thức dùng trong trận, bằng ba lần chỉ số Thần thức. Vào trận thì đầy.
// Dùng vật phẩm, tế pháp bảo, đánh thần thức đều tốn niệm lực. Dùng đồ lúc chuẩn bị trước trận thì không tốn.
const NL_PILL=10,NL_DD=15,NL_MIND=20;
{const _S7=S;S=function(){const s=_S7();if(G.run){s.tuchat=tuChat();s.tvM*=tcMult(s.tuchat);s.nl=Math.round(s.than*3);}return s;};}
{const _pu=playerUnit;playerUnit=function(){const u=_pu();const n=S().nl;u.nl=n;u.maxNl=n;return u;};}
function nlOk(u,c){return u&&(u.maxNl==null||(u.nl||0)>=c);}
function nlUse(u,c){if(u&&u.maxNl!=null)u.nl=Math.max(0,(u.nl||0)-c);}
{const _pp7=playerPillAct;playerPillAct=function(i){const sc=G.run.scene;const u=readyPlayer(sc);if(u&&!u.dazed&&!nlOk(u,NL_PILL))return false;const ok=_pp7(i);if(ok&&u&&!u.dazed)nlUse(u,NL_PILL);return ok;};}
{const _pd7=playerDD;playerDD=function(j,t){const u=readyPlayer(G.run.scene);if(!nlOk(u,NL_DD))return false;const ok=_pd7(j,t);if(ok)nlUse(u,NL_DD);return ok;};}
// đòn thần thức: nay tốn niệm lực thay cho linh lực
{const _pm7=playerMind;playerMind=function(t){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.dazed||!nlOk(u,NL_MIND))return false;const add=Math.ceil(u.maxMp*0.3);u.mp+=add;const ok=_pm7(t);if(ok)nlUse(u,NL_MIND);else u.mp-=add;return ok;};}
// Thần lực của đối thủ: cũng nạp khi đánh trúng hoặc bị trúng. Đầy thì hiển hóa pháp tướng theo hệ của nó,
// lượt sau dồn hết vào một đòn tối thượng (uy lực ×1,6), đánh xong pháp tướng tan, thần lực về 0.
{const _oh7=onHit;onHit=function(sc,u,t,d,crit,blocked,sk){_oh7(sc,u,t,d,crit,blocked,sk);if(d<=0||sc.kiep)return;
  const add=(x,v)=>{if(x&&x.side==='B'&&!x.immune&&x.hp>0&&!x.fpt)x.than=Math.min(100,(x.than||0)+v);};add(t,12);add(u,9);};}
function foePtStart(sc,u){const P=PT[u.el]||PT.vo;u.fpt={n:P.n,el:PT[u.el]?u.el:'vo',undo:{atk:u.atk,matk:u.matk,def:u.def,crit:u.crit}};
  if(P.atk){u.atk=Math.round(u.atk*(1+P.atk));u.matk=Math.round((u.matk||u.atk)*(1+P.atk));}if(P.def)u.def=Math.round(u.def*(1+P.def));if(P.crit)u.crit=(u.crit||5)+P.crit;
  if(P.block)u.st.block=(u.st.block||0)+Math.round(u.max*P.block);if(P.evade)u.st.evade=(u.st.evade||0)+P.evade;
  clog(sc,`${u.name} thần lực viên mãn! ${P.n} hiển hóa sau lưng nó.`,'en');cfx(sc,{k:'ult',el:u.fpt.el,n:u.name+' · '+P.n});sc.rev=(sc.rev||0)+1;}
function foePtEnd(sc,u){const o=u.fpt&&u.fpt.undo;if(!o)return;u.atk=o.atk;u.matk=o.matk;u.def=o.def;u.crit=o.crit;u.fpt=null;u.than=0;u._ult=0;clog(sc,`Pháp tướng của ${u.name} tan đi.`,'fl');sc.rev=(sc.rev||0)+1;}
{const _ai7=aiAct;aiAct=function(sc,u){
  if(u&&u.side==='B'&&u.hp>0&&!u.immune&&!u.dazed&&!sc.kiep&&!sc.spar){
    if(u.fpt)u._ult=1;else if((u.than||0)>=100)foePtStart(sc,u);}
  return _ai7(sc,u);};}
{const _rs7=resolveSkill;resolveSkill=function(sc,u,sk,lv,tg,qm,offs){
  if(u&&u._ult&&u.fpt&&sk&&sk.fx&&sk.fx.p){u._ult=0;cfx(sc,{k:'strike',el:u.fpt.el,n:sk.n});clog(sc,`${u.name} dồn hết thần uy vào một đòn: ${sk.n}!`,'en');
    sk=Object.assign({},sk,{fx:Object.assign({},sk.fx,{p:sk.fx.p*1.6})});const res=_rs7(sc,u,sk,lv,tg,qm,offs);foePtEnd(sc,u);return res;}
  return _rs7(sc,u,sk,lv,tg,qm,offs);};}

// ================= ĐỢT 9: LỰC CHIẾN, TU VI TÍNH BẰNG ĐIỂM, BẾ QUAN HÊN XUI =================
// Lực chiến = căn bậc hai của (sức đánh × sức chịu đòn) × hệ số tốc độ × 2.
// Lấy căn bậc hai nên khí huyết gấp đôi thì lực chiến chỉ tăng khoảng 1,4 lần, không vọt lên vì máu nhiều.
// Trang bị, công pháp đã nằm sẵn trong các chỉ số nên được tính luôn.
function lcCalc(o){const atk=Math.max(o.atk||0,o.matk||0);
  const off=atk*(1+(o.crit||0)/100*Math.max(0,(o.critDmg||150)-100)/100)*(1+((o.cx||10)-10)*0.01);
  const surv=((o.maxHp||o.max||1)+0.3*(o.maxMp||0))*(1+Math.max(0,o.def||0)/40)*(1+(o.ne||0)*0.01)*(1+(o.hoTam||0)*0.005);
  const spd=Math.max(0.6,1+(((o.tp||10)+(o.hoi||10))/2-10)*0.02);return Math.round(Math.sqrt(Math.max(0,off*surv))*spd*2);}
function lucChien(){return lcCalc(S());}
// Thang điểm tu vi: tu vi vẫn lưu theo %, đổi ra điểm để hiển thị. Đầy một cảnh giới = số năm bế quan chuẩn × 8640 giờ × 5 điểm.
// Một giây đồng hồ trong game là một giờ, nên "tu vi/giây" là số điểm mỗi giờ bế quan.
const TV_K=5,BQ_LO=0.6,BQ_HI=1.4;
const TVP=[500,1500,4000,10000,25000,60000]; // tu vi cần để đầy mỗi cảnh giới (lịch luyện cùng thang)
function tvPts(realm){return TVP[clamp(realm,0,5)];}
// tu vi thực nhận khi bế quan còn nhân thêm hệ số tu luyện một lần nữa lúc cộng vào (luật cũ), nên con số hiển thị tính cả lần đó
function bqReal(){return bqRate()*S().tvM;}
function bqNeedY(){const r=G.run;return r.tv>=100?0:Math.max(0.25,Math.ceil((100-r.tv)/bqReal()*4)/4);}
function tvPerMonth(){const avg=bqReal()/100*tvPts(G.run.realm)/12;return [Math.max(0,Math.floor(avg*BQ_LO)),Math.max(1,Math.ceil(avg*BQ_HI))];}
function bqSpan(y){const r=G.run;if(!(y>0))return [0,0];const base=bqReal()*y*(y<1?0.9:1),pas=thonapPct()*y*12;const P=tvPts(r.realm)/100;
  return [Math.floor(tvSimAdd(base*BQ_LO+pas)*P),Math.ceil(tvSimAdd(base*BQ_HI+pas)*P)];}
function fmtN(n){return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g,'.');}
// mỗi lần bế quan rút một hệ số may rủi từ 0,6 tới 1,4: trung bình vẫn như cũ
{const _bc9=bqCustom;bqCustom=function(y){const f=BQ_LO+Math.random()*(BQ_HI-BQ_LO);const _r=bqRate;bqRate=function(){return _r()*f;};try{return _bc9(y);}finally{bqRate=_r;}};}
