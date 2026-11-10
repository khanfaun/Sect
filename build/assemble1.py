import re,sys
src=open('phu-sinh-v1.html',encoding='utf-8').read().split('\n')
# dòng 1407..1567 (1-based) -> thay bằng khối mới
head=src[:1406]; tail=src[1567:]
mid=open('build/core_map.js',encoding='utf-8').read()+'\n'+open('build/core_enc.js',encoding='utf-8').read()
s='\n'.join(head)+'\n'+mid+'\n'.join(tail)
def rep(a,b,cnt=1):
    global s
    n=s.count(a)
    if n!=cnt: sys.exit(f'!! {n} lần: {a[:70]}')
    s=s.replace(a,b)
rep("const R = Math.random;","""function hashS(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
let RS=null; // khi khác null: mọi phép ngẫu nhiên dùng bộ sinh có hạt giống (mulberry32)
const R = ()=>RS?RS():Math.random();
function seeded(seed,fn){const o=RS;RS=mul(hashS(seed));try{return fn();}finally{RS=o;}}""")
rep("const STEPS = 10; // nút 1..9 + thủ lĩnh ở nút 10\n","")
rep("""function hashS(s){let h=2166136261;for(const c of String(s)){h^=c.charCodeAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function mul(a){return()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function scape""","function scape")
rep("""function placeName(type){
  if(type==='tong') return pick(G.meta.world.sects).n;""","""function placeName(type,w){
  if(type==='tong') return pick((w||G.meta.world).sects).n;""")
rep("""function genWorld(){
  const used""","""function genWorld(seed){
  seed=seed||Math.floor(Math.random()*1e9);
  return seeded('w'+seed,()=>{const w=genWorld0();w.seed=seed;w.t=0;w.bangY=1010;w.ents=[];w.legacy=[];w.nemesis=null;w.chron=[];w.lastBirth=null;
    w.regions=[0,1,2,3,4].map(k=>seeded(seed+':r'+k,()=>genRegion(k,w)));return w;});
}
function genWorld0(){
  const used""")
rep("function newMeta(){return {v:1,","function newMeta(){return {v:SAVE_V,")
rep("const U = id=>","const SAVE_V=1;\nconst U = id=>")
# đầu thai
rep("""    cards.push({ten:genName(g),g,origin:og.id,trait:tr.id,root:genRoot(),que:placeName(pick(['tran','tran','thanh'])),""","""    const home=birthNode();
    cards.push({ten:genName(g),g,origin:og.id,trait:tr.id,root:genRoot(),que:home.name,at:home.id,""")
rep("function genBirth(){","""function birthNode(){const w=W();let pool=regionOf(0).nodes.filter(n=>n.type==='tran'&&n.id!==w.lastBirth);if(!pool.length)pool=regionOf(0).nodes.filter(n=>n.type==='tran'||n.type==='thanh');return pick(pool);}
function genBirth(){""")
rep("""    age:16+(og.age||0),realm:0,""","""    age:16+(og.age||0),birthAge:16+(og.age||0),bornT:G.meta.world.t,at:c.at,moving:null,reveal:[],passes:[],bossDone:[0,0,0,0,0],tvMinor:0,maxRegion:0,party:[],quests:[],dao:0,quality:[0,0,0,0,0],speed:1,realm:0,""")
rep("region:0,step:1,kills:0,","region:0,kills:0,")
rep("lifeAdj:0,btFail:0,danQ:0,revived:false,nextBang:20,news:[],bang:null,place:{n:c.que,t:'tran'},","lifeAdj:0,btFail:0,danQ:0,revived:false,news:[],bang:null,place:{n:c.que,t:'tran'},")
rep("""  G.birth=null;G.screen='run';
  r.scene={type:'region',text:T(REG[0].intro,{que:r.que})};""","""  G.birth=null;G.screen='map';G.meta.world.lastBirth=c.at;
  arrive(c.at);
  r.scene={type:'region',text:T(REG[0].intro,{que:r.que})};""")
# bỏ advance cũ
rep("""function advance(yBase){
  const r=G.run;const dy=yBase*TS[r.region];
  r.age+=dy;worldTick(dy);
  const s=S();
  if(r.age>=s.life){die('toahoa');return true;}
  return false;
}
""","")
rep("function pushNews(t){const r=G.run;","function pushNews(t,quiet){const r=G.run;if(!r)return;if(TICK_OUT&&!quiet)TICK_OUT.push(t);")
rep("""function worldTick(dy){
  const r=G.run,w=G.meta.world;""","""function worldTick(dy){
  const r=G.run,w=G.meta.world;if(!r)return;""")
rep("""  if(r.age>=r.nextBang){r.nextBang=r.age+10*Math.max(1,TS[r.region]/2);publishBang();}
""","")
rep("r.bang={nam:Math.floor(r.age),ds:ds.slice(0,6)};","r.bang={nam:Math.floor(r.age),y:tYear(w.t),ds:ds.slice(0,6)};")
# hiệu ứng
rep("""  if(e.tv){const x=e.tv>0?tvGain(e.tv):e.tv;""","""  if(e.tv){let x=e.tv>0?tvGain(e.tv):e.tv;if(x>0&&!e.tvMajor){const room=Math.max(0,40-(r.tvMinor||0));x=Math.min(x,room);r.tvMinor=(r.tvMinor||0)+x;}""")
rep("""  if(e.age){const dy=e.age*TS[r.region];ch.push(chip('⏳',dur(dy),'Thời gian trôi qua',''));if(advance(e.age))return ch;}""","""  if(e.h){ch.push(chip('⏳',durH(e.h),'Thời gian trôi qua',''));advanceTime(e.h);if(!G.run)return ch;}""")
rep("r.seeds.push({t:'an',ten:n.ten,hn:n.hn,d,r:r.region,s:r.step});","r.seeds.push({t:'an',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});")
rep("r.seeds.push({t:'oan',ten:n.ten,hn:n.hn,d,r:r.region,s:r.step});","r.seeds.push({t:'oan',ten:n.ten,hn:n.hn,d,r:r.region,at:G.meta.world.t});")
# sự kiện: chọn theo nguồn + thời điểm
rep("""function evOk(e,type){
  const r=G.run;""","""function whenOk(e){if(!e.when)return true;const t=W().t;if(e.when.part&&!e.when.part.includes(partOf(t)))return false;if(e.when.season&&!e.when.season.includes(seasonOf(t)))return false;return true;}
function srcOk(e,src){const s=e.src||'explore';if(!src)return true;if(s===src)return true;if(src==='explore'&&!ENT_ON&&s.startsWith('ent:'))return true;return false;}
let ENT_ON=false;
function evOk(e,type,src){
  const r=G.run;if(!srcOk(e,src)||!whenOk(e))return false;""")
rep("""function pickEvent(type){
  const r=G.run;
  // sự kiện đặc biệt
  const sp=EVS.filter(e=>e.spec&&""","""function pickEvent(type,src){
  const r=G.run;src=src||'explore';
  // sự kiện đặc biệt
  const sp=src!=='explore'?[]:EVS.filter(e=>e.spec&&srcOk(e,src)&&whenOk(e)&&""")
rep("""  let pool=EVS.filter(e=>evOk(e,type));
  if(!pool.length)pool=EVS.filter(e=>evOk(e,null));
  if(!pool.length)pool=EVS.filter(e=>!e.spec&&!e.once&&(!e.r||e.r.includes(r.region)));""","""  let pool=EVS.filter(e=>evOk(e,type,src));
  if(!pool.length)pool=EVS.filter(e=>evOk(e,null,src));
  if(!pool.length)pool=EVS.filter(e=>!e.spec&&!e.once&&srcOk(e,src)&&(!e.r||e.r.includes(r.region)));
  if(!pool.length)return null;""")
rep("""  const story=[T(e.t,v)];
  r.scene={type:'event',id,v,story,cur:['c'],phase:'choose',chips:[],news:takeNews()};""","""  const story=[T(e.t,v)];const back=sceneBack();
  r.scene={type:'event',id,v,story,cur:['c'],phase:'choose',chips:[],news:takeNews(),back};""")
# kẻ địch theo mức nguy hiểm
rep("*(1+Math.max(0,r.step-1)*0.035)*(spec.elite?1.0:1);","*(1+curDanger()*0.1);")
rep("const m=1+(STEPS-1)*0.035;","const m=1.3;")
# chiến đấu: trở về
rep("const sc={type:'combat',en,ps:{},turn:1,log:[],after,","const sc={type:'combat',en,ps:{},turn:1,log:[],after,back:sceneBack(),")
rep("""  const r=G.run,sc=r.scene;const res=sc.over;const af=sc.after||{kind:'node'};
  if(res==='dead'){die(sc.en.n==='Tâm Ma'?'tamma':'combat',sc.en);return;}
  if(af.rest){r.scene=af.rest;const rs=r.scene;if(res==='win'){rs.chips=(rs.chips||[]).concat(applyE({tv:6,st:8}));rs.story.push('Kẻ phá quan đã nằm xuống. Ngươi ngồi lại, nhưng tâm cảnh khó mà tĩnh như trước.');}else{rs.story.push('Ngươi bỏ động phủ mà chạy.');}rs.phase='done';return;}""","""  const r=G.run,sc=r.scene;const res=sc.over;const af=sc.after||{kind:'node'};
  if(res==='dead'){die(sc.en.n==='Tâm Ma'?'tamma':'combat',sc.en);return;}
  advanceTime(1);if(!G.run)return;
  if(af.kind==='place'){openPlace(r.at);const ps=r.scene;ps.msg=af.msg||[];if(res==='win'){ps.chips=applyE({tv:6,st:8});ps.msg.push('Kẻ phá quan đã nằm xuống. Ngươi ngồi lại, nhưng tâm cảnh khó mà tĩnh như trước.');}else{ps.msg.push('Ngươi bỏ động phủ mà chạy.');}return;}
  if(af.kind==='cross'){if(res==='win'){r.scene=null;doCross(af.k,'fight');}else{r.scene={type:'pass',id:r.at,back:r.at,k:af.k,text:'Ngươi bị đánh bật trở lại. Kẻ gác ải đứng chắn trên cổng, cười lạnh.'};}return;}""")
rep("""  if(res==='flee'){nextNode();return;}
  if(res==='lose'){nextNode();return;}
  // thắng ở nút chiến đấu / thủ lĩnh
  if(af.kind==='boss'){r.bossKills++;bio(T(`Năm ${Math.floor(r.age)} tuổi, đánh bại ${en.n} ở ${r.place.n}.`));log(`Đánh bại ${en.n}.`);rewardScene('boss',en);return;}""","""  if(res==='flee'||res==='lose'){r.scene={type:'combat',back:sc.back};endScene();return;}
  // thắng ở nút chiến đấu / thủ lĩnh
  if(af.kind==='boss'){r.bossKills++;r.bossDone[r.region]=1;bio(T(`Năm ${Math.floor(r.age)} tuổi, đánh bại ${en.n} ở ${r.place.n}.`));log(`Đánh bại ${en.n}.`);rewardScene('boss',en);return;}""")
rep("""  r.scene={type:'reward',kind,text,chips,picks,taken:-1};""","""  if(kind==='boss'&&r.region<4&&!r.passes.includes(r.region+1)){r.passes.push(r.region+1);chips.push(chip('🎫','Lệnh bài thông quan','Trình ở quan ải để sang '+REG[r.region+1].n,'item'));}
  r.scene={type:'reward',kind,text,chips,picks,taken:-1,back:sceneBack()};""")
rep("function rewardContinue(){const r=G.run,sc=r.scene;if(sc.kind==='boss'){regionEnd();return;}nextNode();}","function rewardContinue(){const r=G.run,sc=r.scene;if(sc.kind==='boss'&&r.region>=4){victory();return;}endScene();}")
rep("""  if(sc.back==='res'){r.scene=sc.res;return;}
  nextNode();""","""  if(sc.back==='res'){r.scene=sc.res;return;}
  r.scene={type:'swap',back:typeof sc.back==='number'?sc.back:null};endScene();""")
# chết: hạ sương mù thành ký ức
rep("  G.run=null;G.screen='over';saveSoon();","  fogToMemory();\n  G.run=null;G.screen='over';saveSoon();")
rep("function retire(){die('quyan');}","""function fogToMemory(){for(const R0 of W().regions)for(const n of R0.nodes){if(n.fog>=2){n.fog=1;n.memory=true;}else if(n.fog===1&&!n.memory){n.fog=0;}}}
function retire(){die('quyan');}""")
open('phu-sinh.html','w',encoding='utf-8').write(s)
print('ok',len(s))
