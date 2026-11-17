// Kiểm tra từng dữ liệu, từng nhánh lời kể và các bất biến content. Không tự chơi.
const assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('fs');
require('./content-build').buildContent();const checked=require('./content-validate').validateContent();assert.deepEqual(checked.failures,[]);
const ctx=vm.createContext({console,performance:{now:()=>0}});vm.runInContext(require('./ghep').script(['core','core2','data']),ctx);const run=s=>vm.runInContext(`(()=>{${s}})()`,ctx);
run(`RS=mul(4217);G={meta:newMeta(),run:null,birth:null,over:null,screen:'title'};genBirth();newRun(G.birth.cards[0]);G.run.pham=0;G.run.realm=4;G.run.st=1e9;G.run.scene=null;`);
ctx.baseline=run('return JSON.stringify(G)');
function fresh(){run(`G=JSON.parse(baseline);RS=mul(71);const r=G.run;r.mp=S().maxMp;r.hp=S().maxHp;r.relics=[catRelic(CAT.relics.find(x=>x.k==='kiem'&&!x.u))];r.pills=[{id:'hoixuan',q:0},{id:'tukhi',q:0}];r.qitems=[];
 r.seeds=[{t:'an',ten:'Người mang ơn',hn:'hắn',r:-1,at:-1e8},{t:'oan',ten:'Người oán hận',hn:'hắn',r:-1,at:-1e8}];
 W().nemesis={n:'Kẻ thù kiếp trước',k:'matu',lv:1,realm:4};G.meta.lives=[{ten:'Người kiếp trước',tuoi:50,age:50,realm:2,pts:7,cause:'toahoa'}];
 const n=nodeById(r.at);n.patron={ten:'Người đợi ân nhân',hn:'hắn',d:'ân cũ'};n.grave={ten:'Người kiếp trước',tuoi:50,realm:2,items:[]};r.flags.tongmon=1;r.sectName=W().sects[0].n;n.owner=r.sectName;`);}
let rendered=0;const gaps=[];
for(const d of checked.events.filter(d=>['event','story'].includes(d.kind))){fresh();ctx.eventId=d.id;try{run(`const e=EVMAP[eventId],r=G.run;r.realm=(e.content.trigger.levels||[4])[0];r.pham=0;r.mp=S().maxMp;r.place={n:'Địa điểm kiểm tra',t:e.tg[0]==='*'?'tran':e.tg[0],owner:r.sectName};const n=nodeById(r.at);n.type=r.place.t;n.owner=r.sectName;if(e.content.trigger.venues)r.scene={type:'place',id:n.id,venue:e.content.trigger.venues[0]};for(let i=0;i<1600&&!contentTriggerOk(e.content);i++)W().t+=6;startEvent(eventId);
 const sc=r.scene;function visit(x){if(!x||typeof x!=='object')return;
 for(const k of ['l','t'])for(const s of [].concat(x[k]||[])){if(typeof s!=='string')continue;for(const m of s.matchAll(/\{\$([\w.]+)\}/g))if(gp(sc.v,m[1])==null)throw Error('Thiếu biến '+m[1]+' trong '+s);T(s,sc.v);}
 for(const k of ['c','o'])if(x[k])x[k].forEach(visit);for(const k of ['ok','no','win','lose'])if(x[k])visit(x[k]);}
 visit(e);if(e.force)e.force.forEach(visit);`);rendered++;}catch(e){gaps.push(d.id+': '+e.message);}}
assert.deepEqual(gaps,[],'Biến lời kể của toàn bộ EVS');
let callbacks=0;
for(const d of checked.events.filter(d=>['opportunity','initiation'].includes(d.kind))){for(let i=0;i<d.choices.length;i++){fresh();ctx.cid=d.id;ctx.ci=i;run(`const ev=KYNGO.find(x=>x.id===cid);kyStart(ev);const c=ev.c[ci];if(c.need&&c.need())throw Error('Thiếu fixture để thử lựa chọn '+cid+': '+c.need());const o=c.go();if(!o||typeof o.t!=='string')throw Error('Kỳ ngộ thiếu kết quả '+cid);`);callbacks++;}}
for(const d of checked.events.filter(d=>d.kind==='quest')){for(let i=0;i<d.choices.length;i++){fresh();ctx.cid=d.id;ctx.ci=i;run(`const q={id:'kiemtra',kind:'den',node:G.run.at,due:W().t+HY,state:'open',reward:{st:10,it:[]},grade:0,text:'Giao hàng kiểm tra',from:G.run.at};G.run.quests=[q];const e=QEV.find(x=>x.id===cid);q.kind=e.k[0];qevStart(q,e);qevPick(ci);`);callbacks++;}}
for(const d of checked.events.filter(d=>d.kind==='quest-door')){fresh();ctx.cid=d.id;run(`const q={reward:{st:10,it:[]},grade:0,kind:'den',node:G.run.at};const e=QDOOR.find(x=>x.id===cid);if(!['wait','fight','bonus'].includes(e.go(q)))throw Error('Kết quả giao hàng không hỗ trợ');`);callbacks++;}
// Toàn bộ danh mục và bảng gốc được đối chiếu với hệ thống đã nạp xong.
fresh();const catalogResult=run(`let count=0;const issues=[];const bad=(x,m)=>issues.push(x.id+': '+m);const ids=new Set();
 for(const k of ['relics','skills','arts','pills','mounts','mats','beasts','origins','qitems'])for(const x of CAT[k]){count++;if(ids.has(x.id))bad(x,'ID trùng');ids.add(x.id);}
 for(const x of CAT.relics){const y=catRelic(x);if(slotOf(y)==='phapbao'&&x.req<2)bad(x,'pháp bảo dưới Trúc Cơ');if(!Number.isInteger(x.req)||x.req<0||x.req>6)bad(x,'yêu cầu');if(!RELIC_K.some(k=>k.k===x.k))bad(x,'loại đồ');for(const [k,v]of Object.entries(x.fx))if(typeof v!=='number'||!Number.isFinite(v))bad(x,'chỉ số '+k);}
 for(const x of CAT.skills){if(!SK[x.id])bad(x,'không nạp vào SK');if(x.t<0||x.t>4)bad(x,'bậc chiêu');for(const v of Object.values(x.fx))if(typeof v==='number'&&!Number.isFinite(v))bad(x,'chỉ số không hữu hạn');}
 for(const x of CAT.arts){if(!['cp','tp'].includes(x.type))bad(x,'loại bí tịch');if(x.req<0||x.req>5)bad(x,'yêu cầu');for(const l of x.lines){if(l.req<x.req||l.req>5)bad(x,'cảnh giới mở dòng');if(l.sk&&!SK[l.sk])bad(x,'chiêu không tồn tại '+l.sk);}const y=catArt(x);if(y.lines.length!==x.lines.length)bad(x,'dòng bị bỏ khi nạp');}
 for(const x of CAT.pills){if(!PILL[x.id]||(x.eff?!PILL[x.eff]:x.w!=='bt'||!x.bt))bad(x,'thuốc gốc không có');if(x.w==='bt'&&x.realm!=null&&(x.realm<0||x.realm>4))bad(x,'đan đột phá sai bậc');}
 for(const x of CAT.mounts){if(!(x.m>1&&x.p>0&&x.realm>=0&&x.realm<=5))bad(x,'phương tiện');if(x.magic&&x.minUserLevel<2)bad(x,'phi hành dưới Trúc Cơ');}
 for(const x of CAT.mats)if(!MAT[x.cat])bad(x,'nhóm nguyên liệu');
 for(const x of CAT.beasts){if(!EN[x.id])bad(x,'loài chưa nạp');if(x.regs.some(g=>!REG_EN[g]?.includes(x.id)))bad(x,'không vào danh sách gặp');}
 for(const x of CAT.origins){if(!ORIGIN.some(o=>o.id===x.id))bad(x,'xuất thân chưa nạp');if(x.pill&&!PILL[x.pill])bad(x,'thuốc xuất thân');}
 for(const [id,x]of Object.entries(RELIC_UNIQUE)){const y=uniqueRelic(id);if(slotOf(y)==='phapbao'&&y.req<2)issues.push(id+': pháp bảo độc nhất dưới Trúc Cơ');}
 return {count,issues};`);assert.equal(catalogResult.issues.length,0,catalogResult.issues.join("\n"));
// Hết nội dung hợp cảnh thì trả null, không kéo truyện ở biển vào thành.
fresh();assert.equal(run(`G.run.place.t='tran';const n=nodeById(G.run.at);n.type='tran';for(const e of EVS)G.run.evCount[e.id]=2;return pickEvent('tran','explore');`),null);
fresh();assert.equal(run(`G.run.pham=1;G.run.mp=0;return costOk({mp:'20%'});`),false);
fresh();assert.equal(run(`G.run.pills=[{id:'trucco',q:0}];return costOk({pillGroup:'healing'});`),false);
fresh();run(`G.run.pills=[{id:'trucco',q:0},{id:'hoixuan',q:0}];costChips({pillGroup:'healing'});if(G.run.pills.length!==1||G.run.pills[0].id!=='trucco')throw Error('Tiêu sai thuốc');`);
fresh();run(`G.run.realm=1;G.run.pham=0;const d=CONTENT_EVENTS.find(d=>d.id==='tang_kinh');const n=nodeById(G.run.at);n.type='tong';n.owner=W().sects[1].n;G.run.place={n:n.name,t:'tong'};if(contentTriggerOk(d))throw Error('Vào nội môn tông khác');n.owner=G.run.sectName;if(!contentTriggerOk(d))throw Error('Không vào được tông mình');`);
fresh();run(`const rv=G.run.rivals[2];G.run.metRival=G.run.rivals[0].i;meetEnt({id:900,type:'thienkieu',name:W().rivals[rv.i].ten,data:{rv:rv.i}});const v=G.run.scene.v;if(v.rvi!==rv.i||v.rv.ten!==W().rivals[rv.i].ten)throw Error('Đổi người giữa lời kể và thực thể');`);
fresh();run(`for(const rv of G.run.rivals){rv.alive=true;W().rivals[rv.i].tinh='nghia';}for(let i=0;i<200;i++){const t=contentRumor();if(/giết người đoạt bảo|phản .*trước khi đi|tử trận|độ kiếp thất bại|không trở ra nữa/.test(t))throw Error('Tin đồn trái trạng thái '+t);}`);
// Mọi đoạn truyện giao đấu dùng trận thật, xử lý thắng/thua và lưu/tải giữa trận.
let storyBattles=0;
for(const d of checked.events.filter(d=>d.kind==='story'))for(let j=0;j<d.choices.length;j++)if(d.choices[j].fight){
 for(const result of ['win','lose','flee']){fresh();ctx.battleCase={id:d.id,j,result};run(`const x=battleCase,d=CONTENT_EVENTS.find(d=>d.id===x.id),r=G.run,n=nodeById(r.at);r.realm=d.trigger.levels?.[0]||0;r.pham=0;r.mp=S().maxMp;r.place={n:n.name,t:d.trigger.places[0]};n.type=r.place.t;for(let t=0;t<1600&&!contentTriggerOk(d);t++)W().t+=6;if(!startEvent(d.id))throw Error('Sai bối cảnh fixture '+d.id);choose(x.j);
 if(G.run.scene.type!=='combat')throw Error('Chưa mở trận thật '+d.id);G=JSON.parse(JSON.stringify(G));G.run.scene.over=x.result;combatContinue();if(d.chain){const state=skChains()[d.chain.id];if(x.result==='flee'?!state.end:state.results[d.chain.part]!==(x.result==='win'))throw Error('Sai lịch sử trận '+d.id);}`);storyBattles++;}
}
// Cả dịch vụ tông môn và kỷ vật dùng đúng điều kiện dữ liệu.
fresh();run(`const r=G.run,n=nodeById(r.at);n.type='tong';n.owner=W().sects[1].n;r.scene={type:'place',id:n.id};r.place={n:n.name,t:'tong'};if(placeActs(n).some(a=>CONTENT_MEMBER_ACTIONS.includes(a.a)&&!a.dis))throw Error('Mở dịch vụ nội bộ tông khác');`);
fresh();run(`G.run.qitems=['nv_thu_chuadua'];if(!bagUnits().some(x=>x.t==='qi'))throw Error('Kỷ vật không chiếm ô túi');`);
fresh();run(`for(const p of ['tran','thanh','rung','nui','song','bien','ma','thien']){G.run.place.t=p;for(let i=0;i<20;i++){const e=mkEnemy({k:'beast'});if(e.f!=='thu'||!EN[e.k].pl.includes('*')&&!EN[e.k].pl.includes(p))throw Error('Sinh sai loài ở '+p);}}`);
fresh();run(`G.run.realm=0;G.run.pham=0;for(let i=0;i<500;i++){const x=genRelic(1);if(isPB(x)&&x.req<2)throw Error('Đối tượng pháp bảo sinh ra còn req dưới Trúc Cơ');}`);
const result={events:checked.events.length,renderedEvents:rendered,scriptedChoices:callbacks,catalogEntries:catalogResult.count,storyBattleCases:storyBattles,chains:checked.counts.chains};console.log('Đạt content:',JSON.stringify(result));
if(process.argv.includes('--report')){fs.mkdirSync('docs/content/reports',{recursive:true});fs.writeFileSync('docs/content/reports/validation.json',JSON.stringify(result,null,2)+'\n');}
