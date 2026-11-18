// Kiểm tra toàn bộ nguồn độc lập với giao diện, không chạy bot.
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(ROOT,p),'utf8'));
function validateContent(){const failures=[],ok=(c,s)=>{if(!c)failures.push(s);};const policy=read('content/rules/content-policy.json');const manifest=read('content/events/manifest.json');const all=manifest.files.flatMap(p=>{const x=read(p);ok(x.schemaVersion===1,p+': version');return x.events.map(d=>({d,p}));});const ids=new Set(),chains={};
 const hooksSource=fs.readFileSync(path.join(ROOT,'content/hooks.js'),'utf8');const hooks=new Set([...hooksSource.matchAll(/^,?"([\w]+)":/gm)].map(x=>x[1]));
 const cats=Object.fromEntries(read('content/catalog/manifest.json').collections.map(k=>[k,read('content/catalog/'+k+'.json')]));const catIds=new Set();
 for(const[k,L]of Object.entries(cats))if(Array.isArray(L))for(const x of L){ok(typeof x.id==='string'&&!catIds.has(x.id),k+': ID trùng/thiếu '+x.id);catIds.add(x.id);ok(!!x.n||!!x.nb?.length,k+' thiếu tên '+x.id);}
 const realmVM=require('node:vm');const DEEDS=realmVM.runInNewContext(fs.readFileSync(path.join(ROOT,'content/rules/deed.js'),'utf8')+';DEED',{});const slots=realmVM.runInNewContext(fs.readFileSync(path.join(ROOT,'content/items/kslot.js'),'utf8')+';KSLOT',{});for(const x of cats.relics)if(!slots[x.k])ok(x.req>=policy.minimumSlotUserLevel.phapbao,x.id+': yêu cầu pháp bảo thấp hơn ô mở');
 const call=(x,p)=>{if(!x||typeof x!=='object')return;if(x.$hook)ok(hooks.has(x.$hook),p+': hook không tồn tại '+x.$hook);else for(const[k,v]of Object.entries(x))call(v,p+'.'+k);};
 const effects=new Set('petNew hp mp tv tvMajor h st karma deed deedO hd ng tamma life lifeCut atkP matkP defP hpP mpP crit critDmg tp ngo tam van than relic namedRelic namedMat skill pill pill2 lore dao flag shop dropPill party partyRv partyP nemDone entGone patronDone graveItems ach an oan rumor rival rmRelic item rmItem chainMark soldPillValue thao khoang dan wounds bac nxp'.split(' '));
 function choices(L,p){ok(Array.isArray(L)&&L.length>0,p+': không có lựa chọn');for(const[i,c]of (L||[]).entries()){
  ok(typeof c.l==='string',p+'.'+i+': thiếu nhãn');if(c.chk)ok(c.ok&&c.no,p+'.'+i+': phép thử thiếu thắng/thua');if(c.fight&&c.fight!==1)ok(c.win,p+'.'+i+': trận đánh thiếu kết quả thắng');
  if(c.cost){if(c.cost.mp)ok(parseFloat(c.cost.mp)>0&&parseFloat(c.cost.mp)<=100,p+': chi phí linh lực');if(c.cost.st!=null)ok(Number.isFinite(c.cost.st)&&c.cost.st>=0,p+': giá tiền');}
  walkOutcome(c,p+'.'+i);
 }}
 function walkOutcome(c,p){if(!c||typeof c!=='object')return;if(c.e)for(const[k,v]of Object.entries(c.e)){ok(effects.has(k),p+': hiệu ứng không hỗ trợ '+k);if(k==='deed')ok(Object.prototype.hasOwnProperty.call(DEEDS,v),p+': mã hành vi không có trong DEED '+v);if(k==='item'||k==='rmItem')for(const id of [].concat(v))ok(cats.qitems.some(x=>x.id===id),p+': vật truyện không có '+id);if(k==='namedMat')ok(cats.mats.some(x=>x.id===v),p+': nguyên liệu không có '+v);}
  if(c.c)choices(c.c,p+'.c');for(const k of ['ok','no','win','lose'])if(c[k])walkOutcome(c[k],p+'.'+k);if(c.o)c.o.forEach((x,i)=>walkOutcome(x,p+'.o'+i));
 }
 for(const {d,p}of all){ok(!ids.has(d.id),'Sự kiện ID trùng '+d.id);ids.add(d.id);ok(!!d.name&&!!d.kind,p+': tên/loại');const t=d.trigger;ok(t&&policy.sources.includes(t.source),d.id+': nguồn kích hoạt');ok(t.places?.length&&t.places.every(x=>x==='*'||policy.places.includes(x)),d.id+': nơi');ok(!t.levels||t.levels.every(x=>Number.isInteger(x)&&x>=0&&x<=4),d.id+': tầng nội dung');ok(!t.time.part||t.time.part.every(x=>['sang','chieu','toi','dem'].includes(x)),d.id+': giờ');ok(!t.time.season||t.time.season.every(x=>['xuan','ha','thu','dong'].includes(x)),d.id+': mùa');if(t.source==='venue')ok(t.venues?.length,d.id+': thiếu quán');call(d,d.id);
  if(d.kind!=='quest-door')choices(d.choices,d.id);
  if(d.chain)(chains[d.chain.id]||(chains[d.chain.id]=[])).push(d);
 }
 for(const [id,ds]of Object.entries(chains)){for(const part of ['1','2','2b','3','4'])ok(ds.filter(d=>d.chain.part===part).length===1,id+': thiếu/trùng phần '+part);
  for(const d of ds){for(const paths of d.chain.paths||[])for(const p of paths){const [part,j,result]=p.split(':'),prev=ds.find(x=>x.chain.part===part);ok(prev&&prev.choices[+j],d.id+': nhánh tới lựa chọn không có '+p);if(result)ok(prev&&(prev.choices[+j]?.chk||prev.choices[+j]?.fight),d.id+': kết quả phép thử không tồn tại '+p);}}
 }
 return {failures,counts:{events:all.length,chains:Object.keys(chains).length,catalog:Object.fromEntries(Object.entries(cats).map(([k,v])=>[k,Array.isArray(v)?v.length:Object.keys(v).length]))},events:all.map(x=>x.d),catalog:cats};
}
module.exports={validateContent};if(require.main===module){const r=validateContent();if(r.failures.length){console.error(r.failures.join('\n'));process.exitCode=1;}else console.log('Đạt cấu trúc:',r.counts.events,'mục;',r.counts.chains,'chuỗi.');}
