// ---------------- ĐỘT PHÁ: CHUẨN BỊ → XUNG QUAN → THIÊN KIẾP ----------------
const QNAME=['Phàm','Nhân đạo','Địa đạo','Thiên đạo'];
const QPRE=['','Nhân Đạo','Địa Đạo','Thiên Đạo'];
const QMUL=[1,1.06,1.13,1.22],QLIFE=[0,5,10,20];
const BT_BASE=[0.62,0.52,0.46,0.40,0.35];
function qOf(p){return p>=10?3:p>=6?2:p>=3?1:0;}
function qNext(p){return p<3?3:p<6?6:p<10?10:null;}
function qualName(realm,q){return (q?QPRE[q]+' ':'')+REALM[realm];}
function qMulAll(r){let m=1;for(let i=1;i<=Math.min(r.realm,4);i++)m*=QMUL[(r.quality||[])[i]||0];return m;}
function btTarget(){const r=G.run;return r.realm>=4?5:r.realm+1;}
function btStages(to){return to===1?[]:to===2?['tamma']:to===3?[{n:6}]:to===4?[{n:9},'tamma']:[{n:9,waves:3}];}
function btItems(){const r=G.run;return r.pills.map((p,i)=>({p,i})).filter(x=>PILL[x.p.id].bt&&(PILL[x.p.id].realm==null||PILL[x.p.id].realm===r.realm));}
function btEff(slots){
  const r=G.run;const o={rate:0,guard:0,kiepHp:0,kiepCut:0,dao:0};
  for(const i of slots){const it=r.pills[i];if(!it)continue;const b=PILL[it.id].bt;const m=PQM[it.q||0];
    if(b.rate)o.rate+=Math.round(b.rate*m);if(b.guard)o.guard=1;if(b.kiepHp)o.kiepHp+=b.kiepHp;if(b.kiepCut)o.kiepCut+=b.kiepCut;if(b.dao)o.dao+=b.dao;}
  return o;
}
function btRate(slots){
  const r=G.run,s=S();const e=btEff(slots||[]);
  const p=BT_BASE[Math.min(4,r.realm)]+(s.ngo-10)*0.012+(s.tam-10)*0.012-r.tamma*0.004+(r.btFail||0)*0.08+e.rate/100;
  return clamp(p,0.05,0.97);
}
function btChance(){return btRate([]);}
function canBreak(){const r=G.run;return r.tv>=100&&(r.realm<4||(r.realm===4&&r.region===4));}
function openPrep(n){const r=G.run;r.scene={type:'prep',slots:[],back:n.id,id:n.id};}
function prepToggle(i){
  const sc=G.run.scene;if(!sc||sc.type!=='prep')return;i=+i;
  const k=sc.slots.indexOf(i);if(k>=0){sc.slots.splice(k,1);return;}
  if(sc.slots.length>=3)return;if(!btItems().some(x=>x.i===i))return;sc.slots.push(i);
}
function prepView(){const sc=G.run.scene;const e=btEff(sc.slots);const p=G.run.dao+e.dao;return {rate:btRate(sc.slots),e,dao:p,q:qOf(p),next:qNext(p)};}
function prepStart(){
  const r=G.run,sc=r.scene;if(!sc||sc.type!=='prep'||!canBreak())return;
  const to=btTarget();const e=btEff(sc.slots);const p=btRate(sc.slots);
  // tiêu hao đúng một lần, trước khi gieo số
  const idx=sc.slots.slice().sort((a,b)=>b-a);const used=idx.map(i=>r.pills[i]).filter(Boolean).map(x=>PILL[x.id].n);for(const i of idx)r.pills.splice(i,1);
  sc.slots=[];
  advanceTime(HM);if(!G.run)return;
  const back=sc.back;
  r.bt={to,guard:e.guard,kiepHp:e.kiepHp,kiepCut:e.kiepCut,dao:e.dao,si:0,stages:btStages(to),hpLeft:null,used};
  if(R()<p){
    const txt=to===5?'Ngươi ngẩng nhìn trời. Mây đen đã kéo tới từ bốn phương, xoáy thành một con mắt khổng lồ.':T(['Linh khí cuộn trào, quan ải đầu tiên đã phá. Nhưng trời đất còn chưa chịu buông tha.','Xung quan thành công. Ngươi thở ra một hơi, rồi nghe thấy tiếng sấm rền phía chân trời.']);
    r.scene={type:'btres',back,ok:true,text:txt,chips:used.map(n=>chip('⚗️',n,'Đã dùng','')),stage:0};
    if(!r.bt.stages.length){btFinish();return;}
  } else btFail(back,used);
}
function btFail(back,used){
  const r=G.run;const g=r.bt&&r.bt.guard;
  r.btFail=(r.btFail||0)+1;r.dao-=2;
  let ch=(used||[]).map(n=>chip('⚗️',n,'Đã dùng',''));
  if(g){ch=ch.concat(applyE({tamma:5}));}else ch=ch.concat(applyE({hp:'-40%',tv:-25,tamma:10}));
  ch.push(chip('☯️','đạo cơ −2','Thất bại làm tổn hại đạo cơ','dn'));
  log('Đột phá thất bại.');r.bt=null;
  r.scene={type:'btres',back,ok:false,text:T(REST_T.btf)+(g?' May có vật hộ mệnh, kinh mạch không tổn hại.':''),chips:ch,done:1};
}
function btNextStage(){
  const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,'Tâm ma kiếp: bóng tối trong lòng ngươi đứng dậy.','en');return;}
  let n=st.n-(b.kiepCut||0);n=Math.max(1,n);
  startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp}},{kind:'bt'});
}
function btAfterStage(res){
  const r=G.run,sc=r.scene,b=r.bt;const back=sc.back;
  const me=mainUnit(sc);
  if(res!=='win'){
    if(b&&b.guard){r.hp=1;r.scene=null;btFail(back,[]);r.scene.text='Ngươi gục giữa kiếp. Vật hộ mệnh vỡ tan, giữ lại cho ngươi một hơi thở. Đột phá thất bại.';return;}
    r.bt=null;die(b&&b.stages[b.si]==='tamma'?'tamma':'kiep',{n:'Thiên kiếp'});return;
  }
  if(sc.kiep)b.hpLeft=Math.min(b.hpLeft==null?1:b.hpLeft,me.hp/me.max);
  r.hp=Math.max(1,me.hp);b.si++;
  if(b.si<b.stages.length){r.scene={type:'btres',back,ok:true,text:'Một kiếp đã qua. Trời vẫn còn chưa yên.',chips:[],stage:b.si};return;}
  r.scene={type:'btres',back,ok:true,text:'',chips:[]};btFinish();
}
function btFinish(){
  const r=G.run,sc=r.scene,b=r.bt;const to=b.to;
  if(to===5){r.bt=null;victory();return;}
  let pts=r.dao+b.dao;const kiepBonus=b.hpLeft!=null&&b.hpLeft>=0.5;if(kiepBonus)pts+=2;
  const q=qOf(pts);
  r.realm=to;r.quality[to]=q;r.tv=0;r.btFail=0;r.tvMinor=0;r.dao=0;r.daoSk=0;r.daoPill=0;r.maxRealm=Math.max(r.maxRealm,r.realm);
  const s1=S();r.hp=s1.maxHp;r.mp=s1.maxMp;
  const name=qualName(to,q);
  sc.text=T(REST_T.bt[to-1])+' '+['','Đạo cơ vững vàng hơn người thường.','Đạo cơ rắn như đá núi, trời đất cũng phải ghi nhận.','Thiên Đạo ban phẩm! Mưa hoa rơi khắp động phủ, mây lành ngũ sắc kéo tới.'][q];
  sc.ok=true;sc.done=1;
  sc.chips=[chip('☯️',name,'Đại cảnh giới mới.\nPhẩm chất: '+QNAME[q]+'\nHệ số chỉ số ×'+String(QMUL[q]).replace('.',',')+', thọ nguyên +'+QLIFE[q]+'%','up'),chip('⏳','thọ '+s1.life,'Thọ nguyên mới','up')];
  if(kiepBonus)sc.chips.push(chip('🌩️','đạo cơ +2','Qua thiên kiếp với hơn nửa khí huyết','up'));
  log(`Đột phá ${name}.`);bio(`Năm ${Math.floor(r.age)} tuổi, đột phá ${name} ở ${r.place.n}.`);
  ach(['','tc','kd','na','ht'][to]);if(q===3&&to===2)ach('vokhuyet');
  r.bt=null;sense();
}
function btContinue(){const r=G.run,sc=r.scene;if(r.bt&&!sc.done&&r.bt.si<r.bt.stages.length){btNextStage();return;}endScene();}
// điểm đạo cơ
function addDao(x,src){
  const r=G.run;if(!x)return 0;
  if(src==='skill'){if((r.daoSk||0)>=2)return 0;r.daoSk=(r.daoSk||0)+1;}
  if(src==='pill'){const room=4-(r.daoPill||0);x=Math.max(0,Math.min(x,room));r.daoPill=(r.daoPill||0)+x;}
  r.dao=(r.dao||0)+x;return x;
}
