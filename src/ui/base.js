// ================= GIAO DIỆN =================
// ---------- nền tảng: tiện ích, cấu hình, biểu tượng ----------
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
// chú thích dạng HTML (vật phẩm, công pháp...): data-tiph chứa mã HTML đã thoát ký tự
// ảnh asset: điền đường dẫn ảnh vào đây là game tự dùng, chưa có thì hiện hình vẽ tạm.
// item: ảnh vuông PNG không nền (khóa: loại món như 'kiem', 'pill:hoi', 'mat:thao'); npc, hero, pet, foe: ảnh tròn; place: ảnh ngang theo loại nơi
const ASSET={item:{},art:{},npc:{},hero:{},pet:{},foe:{},place:{}};
function assetImg(kind,id,fb){const u=ASSET[kind]&&id!=null&&ASSET[kind][id];return u?`<img class="asset as-${kind}" src="${esc(u)}" alt="" loading="lazy" draggable="false">`:fb;}
const tah=h=>h?` data-tip="1" data-tiph="${esc(h)}"`:'';
const ta=s=>s?` data-tip="${esc(String(s)[0].toUpperCase()+String(s).slice(1))}"`:'';
const UI={panel:null,tab:{},sel:null,cardMin:false,hudOpen:true,modal:null,confirm:null,lastStory:0,menu:null,pendSk:null,speed:1,paused:false,narr:null,intro:null,filter:'all'};

// ---------- cấu hình (lưu riêng theo từng máy) ----------
const CFG_KEY='phusinh_cfg_v1';
const CFG_DEF={tfStyle:'hang',gfx:'auto',fps:30,dpr:0,fx:true,clouds:true,daynight:true,anim:true,showFps:false,
  names:true,roads:true,grid:true,ents:true,ring:true,notes:true,terrain:true,
  font:'m',theme:'light',cspeed:1,autoFight:false,confirmDanger:true,clockIdle:true};
let CFG=Object.assign({},CFG_DEF);
function cfgLoad(){try{const o=JSON.parse(localStorage.getItem(CFG_KEY)||'null');if(o)CFG=Object.assign({},CFG_DEF,o);else{try{const t=localStorage.getItem('phusinh_theme');if(t)CFG.theme=t;}catch(e){}}}catch(e){}CFG.theme='light';CFG.autoFight=false;CFG.cspeed=1;cfgApply();}
function cfgSave(){try{localStorage.setItem(CFG_KEY,JSON.stringify(CFG));}catch(e){}}
// mức đồ họa thực tế: 0 tiết kiệm, 1 cân bằng, 2 đẹp
let GFX_AUTO=1;
function gfxDetect(){const c=navigator.hardwareConcurrency||4,m=navigator.deviceMemory||4;const mob=/Android|iPhone|iPad|Mobile/i.test(navigator.userAgent);
  GFX_AUTO=(c<=4||m<=3)?0:(mob||c<=6||m<=4)?1:2;
  try{if(matchMedia('(prefers-reduced-motion: reduce)').matches)GFX_AUTO=Math.min(GFX_AUTO,1);}catch(e){}}
function gfxLv(){return CFG.gfx==='low'?0:CFG.gfx==='mid'?1:CFG.gfx==='high'?2:GFX_AUTO;}
function cfgApply(){const d=document.documentElement;d.dataset.theme=CFG.theme;d.dataset.font=CFG.font;d.dataset.gfx=['low','mid','high'][gfxLv()];d.dataset.anim=CFG.anim&&gfxLv()>0?'1':'0';
  if(typeof Map2!=='undefined')Map2.invalidate(true);}
function cfgSet(k,v){CFG[k]=v;cfgSave();cfgApply();}

// ---------- biểu tượng nét mảnh ----------
const ICP={
  user:'M12 12a4 4 0 100-8 4 4 0 000 8zM4 21c0-4 4-6 8-6s8 2 8 6',
  paw:'M12 13c-3 0-5 2.5-5 5 0 1.5 1.2 2 2.5 2 1 0 1.5-.5 2.5-.5s1.5.5 2.5.5c1.3 0 2.5-.5 2.5-2 0-2.5-2-5-5-5zM6 11a1.6 2 0 100-4 1.6 2 0 000 4zM18 11a1.6 2 0 100-4 1.6 2 0 000 4zM9.5 7a1.6 2 0 100-4 1.6 2 0 000 4zM14.5 7a1.6 2 0 100-4 1.6 2 0 000 4z',
  book:'M5 4h11a3 3 0 013 3v13H8a3 3 0 01-3-3V4zM5 17a3 3 0 013-3h11M9 8h6',
  globe:'M12 3a9 9 0 100 18 9 9 0 000-18zM3 12h18M12 3c3 3 3 15 0 18M12 3c-3 3-3 15 0 18',
  people:'M9 11a3 3 0 100-6 3 3 0 000 6zM3 20c0-3 3-5 6-5s6 2 6 5M16 11a3 3 0 100-6M18 15c2 .5 3 2.5 3 5',
  more:'M5 12h.01M12 12h.01M19 12h.01',
  close:'M6 6l12 12M18 6L6 18',
  gear:'M12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3M5 5l2 2M17 17l2 2M19 5l-2 2M7 17l-2 2',
  info:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 11v6M12 7.5v.5',
  down:'M6 9l6 6 6-6',up:'M6 15l6-6 6 6',left:'M15 6l-6 6 6 6',right:'M9 6l6 6-6 6',
  target:'M12 5a7 7 0 100 14 7 7 0 000-14zM12 2v4M12 18v4M2 12h4M18 12h4',
  plus:'M12 5v14M5 12h14',minus:'M5 12h14',
  pause:'M8 5v14M16 5v14',play:'M7 5l12 7-12 7z',ff:'M4 5l8 7-8 7zM13 5l8 7-8 7z',
  pin:'M12 21s7-6.5 7-12a7 7 0 10-14 0c0 5.5 7 12 7 12zM12 11.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z',
  layers:'M12 3l9 5-9 5-9-5 9-5zM3 13l9 5 9-5',
  list:'M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01',
  sword:'M14 4h6v6L9 21l-2-2-3 1 1-3-2-2L14 4zM6 15l3 3',
  flask:'M9 3h6M10 3v6l-5 9a2 2 0 002 3h10a2 2 0 002-3l-5-9V3M7.5 14h9',
  bolt:'M13 2L4 14h7l-1 8 9-12h-7l1-8z',
  sun:'M12 8a4 4 0 100 8 4 4 0 000-8zM12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M6.5 17.5L5 19',
  moon:'M20 14A8 8 0 019 4a8 8 0 1011 10z',
  hour:'M3 12a9 9 0 1 0 18 0a9 9 0 1 0-18 0M12 7v5l3.2 2',
  bag:'M6 8h12l1 12H5L6 8zM9 8V6a3 3 0 016 0v2',
  hex:'M12 2l8.7 5v10L12 22l-8.7-5V7z',
  heart:'M12 20s-7-4.6-7-10.2A4.3 4.3 0 0112 7.2a4.3 4.3 0 017 2.6C19 15.4 12 20 12 20z',
  drop:'M12 3s6 7 6 11.5a6 6 0 01-12 0C6 10 12 3 12 3z',
  spark:'M12 3l1.8 5.6L19.5 10l-5.7 1.4L12 17l-1.8-5.6L4.5 10l5.7-1.4zM19 16l.7 2 2 .6-2 .7-.7 2-.6-2-2-.7 2-.6z',
  gem:'M6 4h12l4 6-10 11L2 10l4-6zM2 10h20M9 4l-2 6 5 11 5-11-2-6',
  wand:'M4 20L16 8M14 4l1 2.5L17.5 7.5 15 8.5 14 11l-1-2.5L10.5 7.5 13 6.5zM19 13l.6 1.4L21 15l-1.4.6L19 17l-.6-1.4L17 15l1.4-.6z',
  shield:'M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z',
  wind:'M3 9h11a3 3 0 10-3-3M3 14h15a3 3 0 11-3 3M3 19h7',
  feather:'M20 4c-8 0-13 5-13 12v4M7 16c6 0 10-3 11-8M7 20l5-5',
  cycle:'M4 12a8 8 0 0114-5l2-2v6h-6l2-2M20 12a8 8 0 01-14 5l-2 2v-6h6l-2 2',
  brain:'M9 4a3 3 0 00-3 3 3 3 0 00-2 5 3 3 0 002 5 3 3 0 006 0V7a3 3 0 00-3-3zM15 4a3 3 0 013 3 3 3 0 012 5 3 3 0 01-2 5 3 3 0 01-6 0',
  lotus:'M12 20c-5 0-8-3-8-7 3 0 5 1 8 4 3-3 5-4 8-4 0 4-3 7-8 7zM12 15c-2-3-2-7 0-11 2 4 2 8 0 11z',
  clover:'M12 11a3 3 0 110-6 3 3 0 010 6zM13 12a3 3 0 116 0 3 3 0 01-6 0zM12 13a3 3 0 110 6 3 3 0 010-6zM11 12a3 3 0 11-6 0 3 3 0 016 0zM14 14l4 6',
  skull:'M6 12a6 6 0 1112 0v3l-2 1v3H8v-3l-2-1zM9.5 12.5h.01M14.5 12.5h.01',
  yin:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 3a4.5 4.5 0 000 9 4.5 4.5 0 010 9M12 7.5h.01M12 16.5h.01',
  scale:'M12 4v16M6 20h12M5 8h14M5 8l-3 6a3 3 0 006 0zM19 8l-3 6a3 3 0 006 0z',
  walk:'M13 4a2 2 0 100 4 2 2 0 000-4zM11 9l-3 5 3 2v5M12 11l3 3h3M8 21l2-4',
  scroll:'M6 4h11a2 2 0 012 2v12a2 2 0 01-2 2H8a2 2 0 01-2-2V4zM6 4a2 2 0 00-2 2v1h2M9 9h7M9 13h7',
  star:'M12 3l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17l-5.4 2.8 1.1-6.1L3.2 9.4l6.1-.8z',
  medal:'M12 14a5 5 0 100-10 5 5 0 000 10zM9 13l-2 8 5-3 5 3-2-8',
  gate:'M3 7c6 2 12 2 18 0M5 11h14M7 7v13M17 7v13M12 4v3',
  tea:'M5 9h11v5a5 5 0 01-5 5h-1a5 5 0 01-5-5zM16 10h2a2 2 0 010 5h-2M8 3v3M12 3v3',
  cart:'M3 6h12v9H3zM15 9h4l2 3v3h-6M7 18a2 2 0 100-.01M17 18a2 2 0 100-.01',
  tree:'M8 20v-4M4 16l4-6 4 6zM5 10l3-5 3 5M17 20v-3M14 17l3-5 3 5z',
  bell:'M6 16V11a6 6 0 0112 0v5l2 2H4zM10 20a2 2 0 004 0',
  crit:'M12 5a7 7 0 100 14 7 7 0 000-14zM12 9a3 3 0 100 6 3 3 0 000-6zM12 2v3M12 19v3M2 12h3M19 12h3',
  root:'M12 3v8M12 11c-4 0-6 3-6 6M12 11c4 0 6 3 6 6M12 11v10M8 21h8',
  ring:'M12 3a9 9 0 100 18 9 9 0 000-18zM12 7a5 5 0 100 10 5 5 0 000-10z',
  home:'M4 11l8-7 8 7M6 10v10h12V10',
  trash:'M5 7h14M9 7V4h6v3M7 7l1 13h8l1-13',
  flag:'M6 21V4M6 5h11l-2 4 2 4H6',
  eye:'M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12zM12 9a3 3 0 100 6 3 3 0 000-6z',
  check:'M5 12l5 5 9-10',
  lock:'M7 11V8a5 5 0 0110 0v3M5 11h14v10H5zM12 15v2',
  unlock:'M7 11V8a5 5 0 019.6-2M5 11h14v10H5zM12 15v2',
  flame:'M12 3c1 4 5 5 5 10a5 5 0 01-10 0c0-2 1-3 2-4 0 2 1 3 2 3 0-3-1-5 1-9z',
  run:'M13 4a1.5 1.5 0 100 .01M9 20l3-6 3 2v5M7 12l3-4h4l3 3 3-1M12 14l-2-3',
  skip:'M5 5l8 7-8 7zM15 5v14M19 5v14',
  pen:'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4M4 20l1-4',
  seat:'M12 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 13c0-3 2-5 5-5s5 2 5 5M3 20c3-4 6-5 9-5s6 1 9 5M7 13l-2 4M17 13l2 4',
};
function ib(n,c){return `<span class="ib${c?' ib-'+c:''}">${ic(n)}</span>`;}
const STAT_IC={'Tiên thiên khí vận':['star','gold'],'Tiên thiên thể chất':['heart','seal'],'Lịch luyện':['sword','gold'],'Thổ nạp':['wind','jade'],'Hiệu suất tu':['cycle','acc'],'Tư chất':['gem','gold'],'Tốc độ tu':['seat','acc'],'ST chí mạng':['bolt','seal'],'Tu vi':['spark','gold'],'Khí huyết':['heart','jade'],'Linh lực':['drop','acc'],'Thọ':['hour','ink'],'Tuổi':['hour','ink'],'Linh thạch':['gem','jade'],'Cảnh giới':['yin','acc'],'Tu luyện':['seat','acc'],'Đi lại':['walk','ink'],'Thần thức':['eye','acc'],'Xuất thân':['scroll','ink'],'Mệnh cách':['star','gold'],'Đạo cơ':['lotus','gold'],'Nhân quả':['scale','ink'],'Tâm ma':['skull','seal'],'Cống hiến':['medal','gold'],'Linh căn':['root','jade'],'Công vật lý':['sword','seal'],'Công phép':['wand','vio'],'Thủ':['shield','acc'],'Chí mạng':['crit','seal'],'Sát thương chí mạng':['bolt','seal'],'Hộ tâm':['heart','acc'],'Thân pháp':['wind','jade'],'Chính xác':['target','ink'],'Né':['feather','jade'],'Hồi phục':['cycle','jade'],'Ngộ tính':['brain','vio'],'Niệm lực':['brain','vio'],'Đạo tâm':['lotus','acc'],'Khí vận':['clover','jade'],'Đã hạ':['skull','ink']};
function sib(label){if(label==='Linh thạch')return '<i class="rh sic"></i>';const x=STAT_IC[label];return x?ic(x[0],'sic'):'';}
function ic(n,cls){return `<svg class="ic${cls?' '+cls:''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICP[n]||ICP.info}"/></svg>`;}

// ---------- mẩu nhỏ dùng chung ----------
// mỗi loại một biểu tượng duy nhất: các biểu tượng cũ dạng emoji trong nhãn được đổi sang bộ biểu tượng nét mảnh
const EMO_IC={'⏳':'hour','🏺':'ring','❤️':'heart','📖':'book','☯️':'yin','🤝':'people','💧':'drop','✨':'spark','⚗️':'flask','⚔':'sword','⚔️':'sword','🗡️':'sword','😈':'skull','🗺️':'pin','📜':'scroll','🏅':'medal','🎫':'flag','🍃':'clover','🍀':'clover','🌩️':'bolt','☁️':'sun','🛡️':'shield','🌀':'wind','🧠':'brain','🪷':'lotus','🌕':'moon'};
function emoIc(e){if(e==='?')return '<i class="qmk">?</i>';if(e==='💎')return '<i class="rh"></i>';const k=EMO_IC[e];return k?ic(k):e;}
function emoTxt(h){return String(h).replace(/💎/g,'<i class="rh"></i>').replace(/⏳/g,ic('hour'));}
function chipsHTML(ch){if(!ch||!ch.length)return '';return `<div class="chips">${ch.map(c=>`<span class="chip ${c.c||''}"${ta(c.tip)}${c.h?` data-tiph="${esc(c.h)}"`:''}>${emoIc(c.i)} ${emoTxt(esc(c.t))}</span>`).join('')}</div>`;}
function elSeal(e){const E=EL[e]||EL.vo;return `<span class="el el-${e}"${ta('Hệ '+E.n+(KHAC[e]?'\nKhắc '+EL[KHAC[e]].n:''))}>${E.c}</span>`;}
function bar(cur,max,cls){const p=Math.max(0,Math.min(100,cur/Math.max(1,max)*100));return `<div class="hb ${cls||''}"><i style="width:${p}%"></i></div>`;}
function tabsHTML(key,list,cur){return `<div class="tabs">${list.map(([k,n])=>`<button data-act="tab" data-arg="${key}:${k}" class="${k===cur?'on':''}">${n}</button>`).join('')}</div>`;}
function numVN(x){return String(Math.round(x*10)/10).replace('.',',');}
function stoneHTML(v){return `<span class="stone"><i class="rh"></i>${v}</span>`;}
function win(title,body,o){o=o||{};return `<section class="win ${o.cls||''}"><header class="win-h"><h2>${title}</h2>${o.extra||''}${o.noClose?'':`<button class="xb" data-act="${o.close||'closePanel'}" aria-label="Đóng">${ic('close')}</button>`}</header><div class="win-b">${body}</div>${o.foot?`<footer class="win-f">${o.foot}</footer>`:''}</section>`;}
function toastFlush(){const L=G.toasts;if(!L||!L.length)return;const box=$('#toast');if(!box)return;
  for(const t of L){const d=document.createElement('div');d.className='toast '+(t.c||'');d.textContent=t.t;box.appendChild(d);setTimeout(()=>d.remove(),3600);}
  G.toasts=[];while(box.children.length>3)box.firstChild.remove();}

// ---------- từ điển: thuật ngữ trong lời kể có gạch chân đứt, chạm vào xem giải thích ----------
const GLOSS={
  'tu sĩ':'Người tu luyện để cầu trường sinh, hấp thu linh khí trời đất vào thân.',
  'tán tu':'Tu sĩ không thuộc tông môn nào, tự tu tự lo, tự do mà thiếu chỗ dựa.',
  'tông môn':'Môn phái tu tiên. Có công pháp truyền thừa, động phủ, tài nguyên; đệ tử phải làm việc, đóng góp cống hiến.',
  'sơn môn':'Cổng chính và cũng là cách gọi một tông môn tu tiên.',
  'ma tu':'Tu sĩ đi đường tà: luyện bằng máu thịt, hồn phách hay tà thuật. Mạnh nhanh nhưng dễ bị tâm ma cắn trả.',
  'linh thạch':'Đá chứa linh khí, vừa là tiền tệ vừa là tài nguyên tu luyện của giới tu tiên. Rất quý.',
  'linh khí':'Khí tinh túy của trời đất. Tu sĩ hút linh khí vào thân để tăng tu vi. Nơi linh khí dồi dào tu nhanh hơn.',
  'linh căn':'Căn cơ bẩm sinh quyết định có tu được hay không và hợp với hệ nào (Kim, Mộc, Thủy, Hỏa, Thổ...). Càng ít hệ càng thuần.',
  'tư chất':'Độ tinh thuần của linh căn, định sẵn lúc sinh. Tư chất cao thì hấp thu linh khí nhanh hơn.',
  'tu vi':'Mức tích lũy tu luyện trong cảnh giới hiện tại. Đầy thì có thể đột phá.',
  'lịch luyện':'Kinh nghiệm thực chiến, đi lại giang hồ. Tu vi bỏ xa lịch luyện thì tu luyện chậm lại; đủ lịch luyện mới đột phá được.',
  'cảnh giới':'Các bậc tu luyện: Luyện Khí, Trúc Cơ, Kết Đan, Nguyên Anh, Hóa Thần, Độ Kiếp.',
  'luyện khí':'Cảnh giới đầu tiên: dẫn linh khí vào thân, luyện thành chân khí.',
  'trúc cơ':'Cảnh giới thứ hai: xây nền móng đạo cơ. Thọ nguyên tăng, ngự được pháp khí.',
  'kết đan':'Cảnh giới thứ ba: chân khí ngưng thành kim đan trong đan điền.',
  'nguyên anh':'Cảnh giới thứ tư: kim đan hóa thành nguyên anh, thân chết mà nguyên anh còn thì còn đường sống.',
  'hóa thần':'Cảnh giới thứ năm: thần thức hòa với trời đất, gần chạm tới phi thăng.',
  'độ kiếp':'Vượt thiên kiếp cuối cùng để phi thăng thành tiên.',
  'đột phá':'Vượt lên cảnh giới mới khi tu vi viên mãn. Cần ở động phủ, đủ lịch luyện, có thể phải chịu thiên kiếp.',
  'thiên kiếp':'Kiếp nạn trời giáng khi tu sĩ đột phá cảnh giới lớn: lôi, hỏa, phong, hàn khí hay tâm ma, tùy người. Các kiếp tới lần lượt. Vượt được thì lên, không thì tan thành tro.',
  'lôi kiếp':'Sấm sét trời giáng thử thách tu sĩ khi đột phá. Chỉ đỡ được, không né được.',
  'bế quan':'Đóng cửa tu luyện liền mạch nhiều tháng năm ở động phủ, tu vi tăng mạnh nhưng thời gian trôi qua.',
  'động phủ':'Hang động, chỗ ở có cấm chế của tu sĩ. Nơi bế quan và đột phá.',
  'tâm ma':'Tạp niệm, oán hận tích tụ trong lòng. Đủ 100 thì phải đối mặt với chính mình.',
  'đạo tâm':'Sự vững vàng của lòng cầu đạo. Chống ảo cảnh, giúp đột phá.',
  'ngộ tính':'Khả năng lĩnh hội. Ngộ tính cao thì tu nhanh, giải đố giỏi, luyện chế dễ.',
  'khí vận':'Vận may. Ảnh hưởng chí mạng và những cơ duyên bất ngờ.',
  'nhân quả':'Thiện ác đã làm. Thiện có thiện báo, ác có ác báo, kiếp này hoặc kiếp sau.',
  'thọ nguyên':'Tuổi thọ tối đa. Hết thọ nguyên là tọa hóa. Đột phá cảnh giới để sống lâu hơn.',
  'thần thức':'Ý thức tỏa ra ngoài thân để dò xét. Thần thức mạnh thì thấy xa và đánh thần thức được.',
  'niệm lực':'Sức thần thức dùng trong trận: dùng vật phẩm, tế pháp bảo, đánh thần thức đều tốn.',
  'pháp tướng':'Hình bóng khổng lồ của thần thông hiện sau lưng khi thần lực viên mãn, tăng sức chiến đấu.',
  'pháp bảo':'Vật phẩm tu sĩ luyện chế hoặc tìm được: binh khí, áo giáp, nhẫn, ngọc bội... tăng chỉ số khi mang.',
  'pháp khí':'Bảo vật cấp thấp hơn pháp bảo, dùng để phi hành, chứa đồ, phòng thân.',
  'đan dược':'Thuốc luyện từ linh thảo: hồi phục, tăng tu vi, hỗ trợ đột phá.',
  'linh thảo':'Cỏ cây hấp thu linh khí lâu năm, nguyên liệu luyện đan.',
  'linh khoáng':'Khoáng thạch chứa linh khí, nguyên liệu luyện khí.',
  'yêu thú':'Thú vật tu luyện thành tinh, có sức mạnh và trí khôn. Yêu đan trong bụng là bảo vật.',
  'yêu đan':'Viên đan kết trong bụng yêu thú, chứa tinh hoa tu luyện của nó.',
  'phù lục':'Lá bùa vẽ trận văn, xé ra là phát tác pháp thuật.',
  'cấm chế':'Trận pháp nhỏ bảo vệ một nơi hay một vật.',
  'trận pháp':'Bố trí linh thạch, trận văn để tạo hiệu ứng: phòng ngự, tụ linh, mê hoặc, sát phạt.',
  'phường thị':'Chợ của tu sĩ, mua bán đan dược, pháp bảo, bí tịch.',
  'quỷ thị':'Chợ đêm của kẻ không dám ra ánh sáng. Hàng lạ, giá lạ.',
  'bí cảnh':'Tiểu thế giới ẩn, chỉ mở cửa trong thời gian ngắn. Nhiều cơ duyên, nhiều hiểm nguy.',
  'cơ duyên':'Dịp may hiếm có trên đường tu: bảo vật, truyền thừa, kỳ ngộ.',
  'luân hồi':'Chết đi rồi đầu thai kiếp khác. Chỉ điểm luân hồi khắc trong chân linh là còn mang theo.',
  'chân linh':'Phần bản ngã sâu nhất, theo người qua các kiếp luân hồi.',
  'phi thăng':'Rời nhân gian lên tiên giới, đích đến cuối cùng của tu sĩ.',
  'đan điền':'Nơi chứa chân khí dưới rốn, gốc rễ của tu vi.',
  'chân khí':'Linh khí đã luyện hóa trong thân, dùng để thi triển pháp thuật, võ công.',
  'công pháp':'Phương pháp tu luyện và chiêu thức chiến đấu được truyền lại.',
  'tâm pháp':'Công pháp nội tu, giúp tu luyện nhanh hơn hoặc tăng chỉ số.',
  'bí tịch':'Sách ghi chép công pháp. Đọc hiểu thì học được.',
  'thiên kiêu':'Thiên tài trẻ tuổi xuất chúng của các tông môn.',
};
let GLOSS_RE=null;
function gloss(h){if(!GLOSS_RE){const ks=Object.keys(GLOSS).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));GLOSS_RE=new RegExp('(^|[^\\p{L}])('+ks.join('|')+')(?![\\p{L}])','giu');}
  const seen=new Set();return String(h).replace(GLOSS_RE,(m,pre,w)=>{const k=w.toLowerCase();if(seen.has(k))return m;seen.add(k);return `${pre}<span class="gl" data-tip="${esc(w.charAt(0).toUpperCase()+w.slice(1)+': '+GLOSS[k])}">${w}</span>`;});}
function txt(s){return gloss(esc(s));}

// hình xe ngựa của thương đội (đồ họa 2D vẽ tay)
const WAGON_URI='data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxMjAgNzAiPjxlbGxpcHNlIGN4PSI2MiIgY3k9IjY0IiByeD0iNTQiIHJ5PSI0IiBmaWxsPSIjMDAwIiBvcGFjaXR5PSIuMTgiLz48ZyBzdHJva2U9IiMzYjI0MTQiIHN0cm9rZS13aWR0aD0iMS42IiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBzdHJva2UtbGluZWNhcD0icm91bmQiPjxwYXRoIGQ9Ik0yNyA0NmwtMiAxNWgzLjVsMi0xM00zNCA0N2wxIDE0aDMuNWwtLjUtMTRNNDQgNDdsMSAxNGgzLjVsLS41LTE0TTQ5IDQ1bDMgMTZoMy41bC0yLjUtMTYiIGZpbGw9IiM3YTRhMjYiLz48cGF0aCBkPSJNMjQgMzdjMC03IDYtMTAgMTQtMTBoOGM2IDAgMTAgMyAxMCA5IDAgNi00IDExLTEyIDExSDMzYy02IDAtOS00LTktMTB6IiBmaWxsPSIjOGE1YTMyIi8+PHBhdGggZD0iTTI4IDMxYy0yLTUtNC0xMC05LTE0bC02IDJjLTIgMS0zIDMtMiA1bDIgMmMyIDAgMy0xIDQtMiAyIDIgNCA2IDUgMTB6IiBmaWxsPSIjOGE1YTMyIi8+PHBhdGggZD0iTTE4IDE2bDEtNSAzIDQiIGZpbGw9IiM4YTVhMzIiLz48cGF0aCBkPSJNMjEgMTVjNCAyIDcgNyA5IDEzbC0zIDJjLTItNS00LTktNy0xMnoiIGZpbGw9IiM0YTJjMTYiIHN0cm9rZT0ibm9uZSIvPjxwYXRoIGQ9Ik01NiAzNGM0IDEgNiA0IDYgOSIgZmlsbD0ibm9uZSIgc3Ryb2tlPSIjNGEyYzE2IiBzdHJva2Utd2lkdGg9IjIuNCIvPjxjaXJjbGUgY3g9IjE1LjUiIGN5PSIxOSIgcj0iMSIgZmlsbD0iIzFiMGYwOCIgc3Ryb2tlPSJub25lIi8+PHBhdGggZD0iTTI0IDMzaDI4IiBzdHJva2U9IiNjMDNhMmIiIHN0cm9rZS13aWR0aD0iMS42Ii8+PHBhdGggZD0iTTUyIDM0aDExIiBzdHJva2U9IiM1YzNhMWUiIHN0cm9rZS13aWR0aD0iMiIvPjxwYXRoIGQ9Ik02MiAyMmg0OHYyNEg2MnoiIGZpbGw9IiNhODc0M2YiLz48cGF0aCBkPSJNNjIgMzBoNDhNNjIgMzhoNDgiIHN0cm9rZT0iIzdhNGYyNyIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48cGF0aCBkPSJNNjAgMjJjNC0xNCA0Ni0xNCA1MiAweiIgZmlsbD0iI2U4ZGNjMCIvPjxwYXRoIGQ9Ik03MCAyMWMyLTggOC0xMSAxNS0xMU05NSAyMWMtMS03LTUtMTAtMTAtMTEiIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2I5YTk4NiIgc3Ryb2tlLXdpZHRoPSIxLjIiLz48cGF0aCBkPSJNNTggMjJoNTYiIHN0cm9rZT0iIzVjM2ExZSIgc3Ryb2tlLXdpZHRoPSIyLjQiLz48Y2lyY2xlIGN4PSI3NCIgY3k9IjUxIiByPSIxMCIgZmlsbD0iIzZiNDIyMiIvPjxjaXJjbGUgY3g9Ijc0IiBjeT0iNTEiIHI9IjYuNSIgZmlsbD0iI2M5OWE1YiIvPjxwYXRoIGQ9Ik03NCA0MXYyME02NCA1MWgyME02NyA0NGwxNCAxNE04MSA0NGwtMTQgMTQiIHN0cm9rZT0iIzZiNDIyMiIgc3Ryb2tlLXdpZHRoPSIxLjQiLz48Y2lyY2xlIGN4PSIxMDIiIGN5PSI1MSIgcj0iMTAiIGZpbGw9IiM2YjQyMjIiLz48Y2lyY2xlIGN4PSIxMDIiIGN5PSI1MSIgcj0iNi41IiBmaWxsPSIjYzk5YTViIi8+PHBhdGggZD0iTTEwMiA0MXYyME05MiA1MWgyME05NSA0NGwxNCAxNE0xMDkgNDRsLTE0IDE0IiBzdHJva2U9IiM2YjQyMjIiIHN0cm9rZS13aWR0aD0iMS40Ii8+PGNpcmNsZSBjeD0iNzQiIGN5PSI1MSIgcj0iMiIgZmlsbD0iIzNiMjQxNCIvPjxjaXJjbGUgY3g9IjEwMiIgY3k9IjUxIiByPSIyIiBmaWxsPSIjM2IyNDE0Ii8+PHJlY3QgeD0iODQiIHk9IjI1IiB3aWR0aD0iMTAiIGhlaWdodD0iNyIgcng9IjEiIGZpbGw9IiNjMDNhMmIiIHN0cm9rZT0iIzdhMWYxNiIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9nPjwvc3ZnPg==';let WAGON_IMG=null;function wagonImg(){if(!WAGON_IMG&&typeof Image!=='undefined'){WAGON_IMG=new Image();WAGON_IMG.onload=()=>{if(typeof Map2!=='undefined')Map2.invalidate();};WAGON_IMG.src=WAGON_URI;}return WAGON_IMG;}
