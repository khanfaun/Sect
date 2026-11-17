// Nối nguồn content/ với các bộ xử lý hiện có; không dùng eval khi chơi.
// Dùng chung điều kiện cho cảnh thường, phần tiếp theo và danh sách địa điểm.
function contentLocation(){const r=G.run;if(!r)return {};const sc=r.scene;return {node:typeof nodeById==='function'?nodeById(r.at):null,venue:sc&&sc.type==='place'?sc.venue:null};}
function contentTriggerOk(d){
 const r=G.run;if(!r)return false;const tr=d.trigger||d;const loc=contentLocation();const n=loc.node;
 if(tr.enabled===false)return false;
 const place=(r.place&&r.place.t)||(n&&n.type);if(tr.places&&!tr.places.includes('*')&&!tr.places.includes(place)&&!tr.places.includes(typeof tAs==='function'?tAs(place):place))return false;
 if(tr.levels&&tr.levels.length&&!tr.levels.includes(rT()))return false;
 if(tr.geography&&n&&!tr.geography.includes(n.r==null?r.region:n.r))return false;
 if(tr.venues&&(!loc.venue||!tr.venues.includes(loc.venue)))return false;
 if(tr.membership==='own'&&(!r.flags.tongmon||!n||n.type!=='tong'||(n.owner||n.name)!==contentSectName()))return false;
 if(tr.membership==='any'&&!r.flags.tongmon)return false;
 if(tr.minUserLevel!=null&&plv()<tr.minUserLevel)return false;
 if(tr.time&&tr.time.part&&!tr.time.part.includes(partOf(W().t)))return false;
 if(tr.time&&tr.time.season&&!tr.time.season.includes(seasonOf(W().t)))return false;
 if(tr.cooldownHours&&W().t-((r.contentLast||{})[d.id]??-Infinity)<tr.cooldownHours)return false;
 if(tr.requiresItem&&!hasItem(tr.requiresItem))return false;
 return true;
}
function contentNative(d){const tr=d.trigger,L=d.logic||{};return {id:d.id,n:d.name,t:d.text,c:d.choices,tg:tr.places,r:tr.levels||undefined,src:tr.source,w:tr.weight,once:tr.once?1:0,spec:tr.special?1:0,when:tr.time,v:L.variables,force:L.force,dk:L.dk,content:d,cond:r=>contentTriggerOk(d)&&(!L.condition||L.condition(r))};}
for(const d of CONTENT_EVENTS){
 if(d.kind==='event')ev(contentNative(d));
 else if(d.kind==='opportunity')KYNGO.push({id:d.id,n:d.name,t:d.text,c:d.choices,paid:d.logic.paid,joke:d.logic.joke,sp:d.logic.system,pop:d.logic.pop,content:d});
 else if(d.kind==='initiation'){tpGv(d.id,d.name,d.text,d.logic.pop,d.logic.tp,d.choices);KYNGO[KYNGO.length-1].content=d;}
 else if(d.kind==='quest')QEV.push({id:d.id,n:d.name,k:d.logic.questKinds,t:d.text,c:d.choices,content:d});
 else if(d.kind==='quest-door')QDOOR.push({id:d.id,t:d.text,go:d.logic.run,content:d});
}
// Mọi lần chọn đều qua bộ lọc; không bỏ ngữ cảnh khi kho hợp lệ đã hết.
{const _se=startEvent;startEvent=function(id,extra){const r=G.run;if(!r||!EVMAP[id])return false;_se(id,extra);(r.contentLast||(r.contentLast={}))[id]=W().t;return true;};}
function contentPoolOk(e,type,src,allowSpecial){
 const r=G.run;if(!srcOk(e,src)||!whenOk(e))return false;
 if(e.r&&!e.r.includes(rT()))return false;
 if(type&&e.tg&&!e.tg.includes('*')&&!e.tg.includes(type))return false;
 if(e.once&&r.evCount[e.id])return false;
 if((r.evCount[e.id]||0)>=2||r.evRecent.includes(e.id))return false;
 if(e.cond&&!e.cond(r))return false;
 if(e.content&&!contentTriggerOk(e.content))return false;
 return !!e.spec===!!allowSpecial;
}
pickEvent=function(type,src){src=src||'explore';type=typeof tAs==='function'?tAs(type):type;
 const sp=src==='explore'?EVS.filter(e=>contentPoolOk(e,type,src,true)):[];
 if(sp.length&&chance(.55))return pick(sp).id;
 const pool=EVS.filter(e=>contentPoolOk(e,type,src,false));
 if(!pool.length)return null;
 return wpick(pool,e=>(e.w||1)/(1+(G.run.evCount[e.id]||0)*2)).id;
};
evOk=function(e,type,src){return contentPoolOk(e,type,src||'explore',false);};
// Kỳ ngộ cũng cần đúng buổi và sinh cảnh.
function contentOpportunityPool(test){return KYNGO.filter(e=>test(e)&&(!e.content||contentTriggerOk(e.content))&&(!e.content||!e.content.trigger.places||e.content.trigger.places.includes('*')||e.content.trigger.places.includes(tAs(nodeById(G.run.at).type))));}

// Danh tính tông môn và nhân vật dùng chung giữa lời kể, quan hệ và trận đánh.
function contentSectName(){const r=G.run;if(!r||!r.flags.tongmon)return null;if(r.sectName)return r.sectName;
 const n=nodeById(r.at),ss=G.meta.world.sects;const s=ss.find(s=>n&&n.type==='tong'&&s.n===(n.owner||n.name))||ss.find(s=>s.al==='chinh')||ss[0];
 return r.sectName=s?s.n:null;
}
{const _bv=baseV;baseV=function(type){const v=_bv(type);if(G.run&&G.run.flags.tongmon&&contentSectName())v.homeSect=contentSectName();return v;};}
{const _ae=applyE;applyE=function(e,v){const r=G.run;if(!r)return [];const joined=e&&e.flag==='tongmon';const ch=_ae(e,v);if(!G.run||!e)return ch;
 if(joined){const n=nodeById(r.at);r.sectName=v&&v.sect||(n&&n.owner)||contentSectName();}
 if(e.namedRelic){const spec=e.namedRelic,req=Math.max(relReqRoll(),KSLOT[spec.k]?0:2);const pool=CAT.relics.filter(x=>x.k===spec.k&&!x.u&&x.req>=req&&x.req<=Math.max(req,plv()+1));
  let x;if(pool.length){x=catRelic(pick(pool));delete x.cid;delete x.u;}else{const k=RELIC_K.find(x=>x.k===spec.k);if(!k)throw Error(contentText("runtime.05-content-runtime.1")+spec.k);x={k:spec.k,tier:1,req,el:'vo',fx:Object.assign({},k.fx),fx2:{},v2:1};}
  x.name=spec.name;x.lore=spec.lore||'';r.relics.push(x);ch.push(chip('🏺',x.name,relicTip(x),'item',x.tier));}
 if(e.namedMat){const m=CAT.byId[e.namedMat];if(!m||!m.cat)throw Error(contentText("runtime.05-content-runtime.2")+e.namedMat);catMatSync();r.mats[m.cat]=(r.mats[m.cat]||0)+1;(r.matN||(r.matN={}))[m.id]=(r.matN[m.id]||0)+1;ch.push(chip(m.i,m.n,m.d,'item',m.t));}
 if(e.soldPillValue){const sc=r.scene,amount=sc&&sc.soldPillValue||0;if(amount){r.st+=amount;ch.push(chip('💎','+'+amount,contentText("runtime.05-content-runtime.3"),'up'));delete sc.soldPillValue;}}
 return ch;};}
// "Yêu cầu sử dụng" tách khỏi phẩm và khu vực. Mọi lối sinh đồ đặc biệt tuân cùng sàn ô.
{const _rq=relReq;relReq=function(x){return Math.max(_rq(x),x&&x.k!=='book'&&x.k!=='linhthu'&&slotOf(x)==='phapbao'?CONTENT_POLICY.minimumSlotUserLevel.phapbao:0);};}
{const _ur=uniqueRelic;uniqueRelic=function(id){const x=_ur(id);if(x)x.req=relReq(x);return x;};}
{const _cr=catRelic;catRelic=function(x){const r=_cr(x);r.req=relReq(r);return r;};}
// Bản lưu cũ không giữ đồ ở ô đã khóa hoặc có yêu cầu không hợp lệ.
{const _r2=run2;run2=function(){const r=_r2();if(r&&!r._contentV1){r._contentV1=1;for(const x of (r.relics||[]))x.req=relReq(x);for(const x of Object.values(r.eq||{}))if(x)x.req=relReq(x);for(const d of r.dd||[])d.rel.req=relReq(d.rel);eqFix();}return r;};}
function contentPillIndex(group){const r=G.run;let pool=r.pills.map((x,i)=>({x,i,p:PILL[x.id]})).filter(x=>x.p&&(!unitLocked('p',x.i)));
 if(group==='healing')pool=pool.filter(x=>['hoixuan','baohuyet'].includes(x.p.eff||x.x.id));
 else if(group==='any')pool=pool.filter(x=>!x.p.bt);
 else pool=pool.filter(x=>x.x.id===group);
 pool.sort((a,b)=>(a.p.p||0)*PQM[a.x.q||0]-(b.p.p||0)*PQM[b.x.q||0]);return pool.length?pool[0].i:-1;
}
{const _co=costOk;costOk=function(c){if(c&&c.mp&&S().maxMp<=0)return false;if(c&&c.pillGroup&&contentPillIndex(c.pillGroup)<0)return false;return _co(c);};}
{const _cc=costChips;costChips=function(c){const ch=_cc(c);if(c&&c.pillGroup){const i=contentPillIndex(c.pillGroup);if(i>=0){const x=G.run.pills.splice(i,1)[0],p=PILL[x.id];if(G.run.scene)G.run.scene.soldPillValue=Math.max(1,Math.round(p.p*PQM[x.q||0]*SC[rT()]*.45));ch.push(chip(p.i,'−1 '+p.n,contentText("runtime.05-content-runtime.4"),'dn'));}}return ch;};}
{const _nl=needList;needList=function(c){const L=_nl(c);if(c.cost&&c.cost.pillGroup)L.push({ok:contentPillIndex(c.cost.pillGroup)>=0,t:c.cost.pillGroup==='healing'?contentText("runtime.05-content-runtime.5"):contentText("runtime.05-content-runtime.6")});if(c.cost&&c.cost.mp&&S().maxMp<=0)L.push({ok:false,t:contentText("runtime.05-content-runtime.7")});return L;};}
// Đi vào trà lâu/khách điếm/tửu phường mới có nhóm truyện của quán đó.
{const _vo=venueOpts;venueOpts=function(n,v){const L=_vo(n,v);if(!G.run.scene)return L;const tr=G.run.scene.venue;G.run.scene.venue=v;try{const pool=EVS.filter(e=>e.src==='venue'&&contentPoolOk(e,tAs(n.type),'venue',false));if(pool.length)L.push({id:'content-story',l:contentText("runtime.05-content-runtime.8"),d:contentText("runtime.05-content-runtime.9"),h:0,st:0,g:{}});}finally{G.run.scene.venue=tr;}return L;};}
{const _vd=venueDo;venueDo=function(v,id){if(id!=='content-story')return _vd(v,id);const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;sc.venue=v;const n=nodeById(sc.id),eid=pickEvent(tAs(n.type),'venue');if(!eid)return false;return startEvent(eid);};}
// Không gán một người hiền thành cướp vì dùng chung mẫu gặp người trên đường.
{const _me=meetEnt;meetEnt=function(e){if(!e||!G.run)return;const r=G.run;if(e.type==='thienkieu')r.metRival=e.data.rv;
 const previous=r.contentEntity;r.contentEntity=e;
 try{return _me(e);}finally{if(G.run)r.contentEntity=previous;}
};}
{const _se=startEvent;startEvent=function(id,extra){const r=G.run,e=EVMAP[id];if(!r||!e)return false;const ent=r.contentEntity;let add=Object.assign({},extra);
 if(ent&&ent.type==='thienkieu'){const rv=r.rivals.find(x=>x.i===ent.data.rv&&x.alive);if(!rv)return false;add.rv=rivalView(rv);add.rvi=rv.i;}
 if(ent&&ent.type==='tuantra'){const base=nodeById(ent.data.home);if(base&&base.owner)add.sect=base.owner;}
 if(ent&&ent.type==='khach'&&id!=='kh_cuop'){
  const generated=e.v?e.v(r):{};ent.data.person=ent.data.person||generated.a;
  if(ent.data.person){add.a=ent.data.person;add.en=add.a.ten;ent.name=add.a.ten;}
 }
 if(ent&&ent.type==='tuantra'){const generated=e.v?e.v(r):{};ent.data.leader=ent.data.leader||generated.a;if(ent.data.leader)add.a=ent.data.leader;}
 const ok=_se(id,add);
 return ok;};}

function contentRumor(){const r=G.run,w=W();const rv=pick(r.rivals);if(!rv)return '';
 const record=w.rivals[rv.i];const kinds=rv.alive?(record.tinh==='nghia'?['tien','the']:['tien','the','ma']):['tu','the'];
 return contentText("runtime.05-content-runtime.10")+T(RUMOR[pick(kinds)],rumorV(rv));
}
// Danh mục phương tiện viết sẵn tham gia kho trạm dịch đang hoạt động.
{const _ts=tramStock;tramStock=function(n){const L=_ts(n);if(!n.tram.contentVersion){n.tram.contentVersion=1;
 const pool=CAT.mounts.filter(x=>x.realm<=rT()+1);for(const x of shuffle(pool.slice()).slice(0,2))L.push({k:x.magic?'kiem':'ngua',cid:x.id,n:x.n,m:x.m,p:x.p,realm:x.realm,minUserLevel:x.minUserLevel,magic:x.magic,tier:clamp(x.realm,0,4),ic:x.magic?'sword':'run',qty:1});L.sort((a,b)=>a.p-b.p);}
 return L;};}
{const _vt=vehTake;vehTake=function(i,mode){const sc=G.run&&G.run.scene;if(!sc||sc.type!=='place')return false;const v=tramStock(nodeById(sc.id))[i];if(v&&v.minUserLevel!=null&&plv()<v.minUserLevel)return false;return _vt(i,mode);};}
{const _mo=mountOf;mountOf=function(){const x=_mo();return x&&x.minUserLevel!=null&&plv()<x.minUserLevel?null:x;};}

{const _ks=kyStart;kyStart=function(ev){if(!ev||ev.content&&ev.content.trigger.source!=='system'&&!contentTriggerOk(ev.content))return false;const out=_ks(ev);if(G.run&&ev.content)(G.run.contentLast||(G.run.contentLast={}))[ev.id]=W().t;return out;};}
// Danh sách "chuyện trước mắt" hết hiệu lực khi giờ, mùa, cảnh giới hoặc điều kiện đổi.
nodeEvs=function(n){const r=G.run,w=W();if(!n||n.type==='ai')return [];
 const original=r.place;r.place={n:n.name,t:n.type,owner:n.owner};
 try{const stamp=[r.kiep,rT(),partOf(w.t),seasonOf(w.t),Math.floor(w.t/HM)].join(':');
  const cached=n.evs&&n.evs.stamp===stamp?n.evs.L.filter(id=>EVMAP[id]&&contentPoolOk(EVMAP[id],tAs(n.type),'explore',!!EVMAP[id].spec)):[];
  if(cached.length){n.evs.L=cached;return cached;}
  const L=[],count=isWild(n)?3:2;for(let i=0;i<12&&L.length<count;i++){const id=pickEvent(n.type,'explore');if(id&&!L.includes(id))L.push(id);}n.evs={stamp,kiep:r.kiep,until:w.t+HM,L};return L;
 }finally{r.place=original;}
};
{const _se=startEvent;startEvent=function(id,extra){const e=EVMAP[id];if(e&&e.content&&!contentTriggerOk(e.content))return false;return _se(id,extra);};}
// Dịch vụ nội bộ dùng cùng danh tính tông môn như các sự kiện nội môn.
function contentOwnSect(n){n=n||nodeById(G.run.at);return !!(n&&n.type==='tong'&&G.run.flags.tongmon&&(n.owner||n.name)===contentSectName());}
const CONTENT_MEMBER_ACTIONS=['lib','tongviec','conghien','tinhthat'];
{const _pa=placeActs;placeActs=function(n){const L=_pa(n);if(n.type==='tong'&&!contentOwnSect(n))for(const a of L)if(CONTENT_MEMBER_ACTIONS.includes(a.a)){a.dis=true;a.x=contentText("runtime.05-content-runtime.11");}return L;};}
{const _pa=placeAct;placeAct=function(a){if(CONTENT_MEMBER_ACTIONS.includes(a)&&!contentOwnSect())return false;return _pa(a);};}
// Kỷ vật truyện cũng chiếm ô túi và chịu khóa, như các vật phẩm khác.
{const _bu=bagUnits;bagUnits=function(){return _bu().concat((G.run.qitems||[]).map((id,i)=>({t:'qi',i})));};}
{const _bi=bagItems;bagItems=function(){const L=_bi();for(const it of L)if(it.ref&&it.ref.t==='qi'){const i=(G.run.qitems||[]).indexOf(it.ref.id);it.locked=unitLocked('qi',i);const sl=bagLayout().slots.find(s=>s.unit&&s.unit.t==='qi'&&s.unit.i===i);if(sl)it.bsrc=sl.src;}return L;};}
{const _bd=bagDrop;bagDrop=function(key,n){if(key[0]==='v'&&unitLocked('qi',(G.run.qitems||[]).indexOf(key.slice(1)))){bagLockNote();return 0;}return _bd(key,n);};}

// Bỏ chạy khỏi trận của một chuỗi là rút khỏi câu chuyện; không để phần tiếp theo bị treo.
{const _cc=combatContinue;combatContinue=function(){const sc=G.run&&G.run.scene;const d=sc&&sc.type==='combat'&&sc.after&&sc.after.kind==='ev'&&CONTENT_EVENTS.find(d=>d.id===sc.after.ev.id);const fled=sc&&sc.over==='flee';const out=_cc();if(fled&&d&&d.chain&&G.run)applyE({chainMark:[d.chain.id,d.chain.part,-1]});return out;};}
// Ghi sàn vào đối tượng được sinh, không chỉ làm đẹp yêu cầu khi hiển thị.
{const _gr=genRelic;genRelic=function(t){const x=_gr(t);if(x)x.req=relReq(x);return x;};}
