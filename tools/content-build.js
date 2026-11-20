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
 // Đ9.1: tuyến (content/tuyen/*.json) — kiểm rồi mới ghép; lỗi thì dừng build.
 const ty=require('./kiem-tra-tuyen').kiemTuyen();if(ty.loi.length)throw Error('Tuyến sai (chạy npm run content:tuyen để xem):\n'+ty.loi.join('\n'));
 write('src/game/data/06-tuyen-du-lieu.js','// SINH TỰ ĐỘNG từ content/tuyen/*.json. Không sửa tệp này.\nconst TUYEN_DATA='+JSON.stringify(ty.tuyen)+';\n');
 // đợt GPT-2: quả chín, nghề phàm, cải căn dọc đường, cảnh kể — kiểm rồi mới ghép.
 const n2=require('./kiem-tra-noi-dung-2').kiemNoiDung2();if(n2.loi.length)throw Error('Nội dung đợt hai sai (chạy npm run content:gpt để xem):\n'+n2.loi.join('\n'));
 write('src/game/data/07-noi-dung-2-du-lieu.js','// SINH TỰ ĐỘNG từ content/qua-chin, content/nghe-pham, content/cai-can, content/canh. Không sửa tệp này.\nconst ND2_DATA='+JSON.stringify(n2.data)+';\n');
 // Đ10: lời văn Đại Mộng (content/dai-mong/**) — kiểm rồi mới ghép; thiếu tệp thì game dùng lời dự phòng.
 const dm=require('./kiem-tra-dai-mong').kiemDaiMong();if(dm.loi.length)throw Error('Lời văn Đại Mộng sai (chạy npm run content:mong để xem):\n'+dm.loi.join('\n'));
 write('src/game/data/08-dai-mong-du-lieu.js','// SINH TỰ ĐỘNG từ content/dai-mong/**. Không sửa tệp này.\nconst DM_DATA='+JSON.stringify(dm.data)+';\n');
 // gói GPT đợt năm (L1–L6): sự kiện và kết cục sáu nghề tu mở rộng (content/nghe-tu/*.json) — kiểm rồi mới ghép.
 const nt=require('./kiem-tra-nghe-tu').kiemNgheTu();if(nt.loi.length)throw Error('Sự kiện nghề tu sai (chạy npm run content:nghe để xem):\n'+nt.loi.join('\n'));
 write('src/game/data/09-nghe-tu-du-lieu.js','// SINH TỰ ĐỘNG từ content/nghe-tu/*.json. Không sửa tệp này.\nconst NTU_DATA='+JSON.stringify(nt.data)+';\n');
 return {events:events.length,stories:story.length,catalog:cat,tuyen:ty.tuyen.length};
}
module.exports={buildContent};if(require.main===module){const r=buildContent();console.log('Content:',r.events,'mục sự kiện;',r.stories,'cảnh truyện.');}
