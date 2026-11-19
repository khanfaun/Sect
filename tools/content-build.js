// Biên dịch nguồn chuẩn content/ thành lớp dữ liệu tương thích luật game.
const fs=require('fs'),path=require('path');const root=path.resolve(__dirname,'..');
const read=p=>JSON.parse(fs.readFileSync(path.join(root,p),'utf8'));
function buildContent(){
 const validation=require('./content-validate').validateContent();if(validation.failures.length)throw Error(validation.failures.join('\n'));
 const policy=read('content/rules/content-policy.json');
 const manifest=read('content/events/manifest.json'),events=manifest.files.flatMap(p=>read(p).events);const ids=new Set();
 for(const d of events){if(ids.has(d.id))throw Error('ID sự kiện trùng: '+d.id);ids.add(d.id);if(!d.trigger||!d.kind||!d.name)throw Error('Thiếu cấu trúc '+d.id);}
 const texts=Object.assign({},...read('content/text/manifest.json').files.map(read),...events.map(d=>d.scriptText||{}));
 const cat=Object.fromEntries(read('content/catalog/manifest.json').collections.map(k=>[k,read('content/catalog/'+k+'.json')]));
 const write=(p,s)=>{p=path.join(root,p);fs.mkdirSync(path.dirname(p),{recursive:true});if(!fs.existsSync(p)||fs.readFileSync(p,'utf8')!==s)fs.writeFileSync(p,s);};
 write('src/game/data/00-content-text.js','// SINH TỰ ĐỘNG từ content/text và scriptText của sự kiện.\nconst CONTENT_POLICY='+JSON.stringify(policy)+';\nconst CONTENT_TEXT='+JSON.stringify(texts)+';\nfunction contentText(id,args){const s=CONTENT_TEXT[id];if(s==null)throw Error("Thiếu lời kể: "+id);return args?s.replace(/\\{\\{(\\d+)\\}\\}/g,(_,i)=>String(args[+i])):s;}\n');
 write('src/game/data/01-catalog-du-lieu.js','// SINH TỰ ĐỘNG từ content/catalog/. Không sửa tệp này.\nconst CATALOG_DATA='+JSON.stringify(cat)+';\n');
 function js(v){if(v&&typeof v==='object'&&v.$hook){if(!/^[\w]+$/.test(v.$hook))throw Error('Hook không hợp lệ');return 'CONTENT_HOOKS['+JSON.stringify(v.$hook)+']';}if(Array.isArray(v))return '['+v.map(js).join(',')+']';if(v&&typeof v==='object')return '{'+Object.entries(v).map(([k,x])=>JSON.stringify(k)+':'+js(x)).join(',')+'}';return JSON.stringify(v);}
 const story=events.filter(d=>d.kind==='story').map(d=>({id:d.id,n:d.name,reg:d.trigger.levels[0],emo:d.tags[0],tg:d.trigger.places,roles:Object.fromEntries(Object.entries(d.actors).map(([k,v])=>[k,v.gender])),t:d.text,c:d.choices,trigger:d.trigger,...d.chain?{chain:d.chain.id,part:d.chain.part,wait:d.chain.waitHours,need:d.chain.needs,paths:d.chain.paths}:{} }));
 write('src/game/data/03-su_kien-du-lieu.js','// SINH TỰ ĐỘNG từ content/events/. Không sửa tệp này.\nconst CONTENT_EVENTS='+js(events)+';\nconst SU_KIEN_DATA='+js(story)+';\n');
 // Đ9.1: tuyến (content/tuyen/*.json)
 const tdir=path.join(root,'content/tuyen');const ty={tuyen:fs.existsSync(tdir)?fs.readdirSync(tdir).filter(f=>f.endsWith('.json')).sort().map(f=>read('content/tuyen/'+f)):[]};
 write('src/game/data/06-tuyen-du-lieu.js','// SINH TỰ ĐỘNG từ content/tuyen/*.json. Không sửa tệp này.\nconst TUYEN_DATA='+JSON.stringify(ty.tuyen)+';\n');
 return {events:events.length,stories:story.length,catalog:cat,tuyen:ty.tuyen.length};
}
module.exports={buildContent};if(require.main===module){const r=buildContent();console.log('Content:',r.events,'mục sự kiện;',r.stories,'cảnh truyện.');}
