// ================= GIAO DIỆN =================
// ---------- nền tảng: tiện ích, cấu hình, biểu tượng ----------
const $=s=>document.querySelector(s);
const $$=s=>Array.from(document.querySelectorAll(s));
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const ta=s=>s?` data-tip="${esc(String(s)[0].toUpperCase()+String(s).slice(1))}"`:'';
const UI={panel:null,tab:{},sel:null,cardMin:false,hudOpen:true,modal:null,confirm:null,lastStory:0,menu:null,pendSk:null,speed:1,paused:false,narr:null,intro:null,filter:'all'};

// ---------- cấu hình (lưu riêng theo từng máy) ----------
const CFG_KEY='phusinh_cfg_v1';
const CFG_DEF={gfx:'auto',fps:30,dpr:0,fx:true,clouds:true,daynight:true,anim:true,showFps:false,
  names:true,roads:true,grid:true,ents:true,ring:true,notes:true,terrain:true,
  font:'m',theme:'light',cspeed:1,autoFight:false,confirmDanger:true,clockIdle:true};
let CFG=Object.assign({},CFG_DEF);
function cfgLoad(){try{const o=JSON.parse(localStorage.getItem(CFG_KEY)||'null');if(o)CFG=Object.assign({},CFG_DEF,o);else{try{const t=localStorage.getItem('phusinh_theme');if(t)CFG.theme=t;}catch(e){}}}catch(e){}CFG.theme='light';cfgApply();}
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
  hour:'M6 3h12M6 21h12M7 3c0 5 5 6 5 9s-5 4-5 9M17 3c0 5-5 6-5 9s5 4 5 9',
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
  pen:'M4 20h4L19 9l-4-4L4 16zM13.5 6.5l4 4M4 20l1-4',
  seat:'M12 6a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM7 13c0-3 2-5 5-5s5 2 5 5M3 20c3-4 6-5 9-5s6 1 9 5M7 13l-2 4M17 13l2 4',
};
function ib(n,c){return `<span class="ib${c?' ib-'+c:''}">${ic(n)}</span>`;}
const STAT_IC={'Tu vi':['spark','gold'],'Khí huyết':['heart','jade'],'Linh lực':['drop','acc'],'Thọ':['hour','ink'],'Tuổi':['hour','ink'],'Linh thạch':['gem','jade'],'Cảnh giới':['yin','acc'],'Tu luyện':['seat','acc'],'Đi lại':['walk','ink'],'Thần thức':['eye','acc'],'Xuất thân':['scroll','ink'],'Mệnh cách':['star','gold'],'Đạo cơ':['lotus','gold'],'Nhân quả':['scale','ink'],'Tâm ma':['skull','seal'],'Cống hiến':['medal','gold'],'Linh căn':['root','jade'],'Công vật lý':['sword','seal'],'Công phép':['wand','vio'],'Thủ':['shield','acc'],'Chí mạng':['crit','seal'],'Sát thương chí mạng':['bolt','seal'],'Hộ tâm':['heart','acc'],'Thân pháp':['wind','jade'],'Chính xác':['target','ink'],'Né':['feather','jade'],'Hồi phục':['cycle','jade'],'Ngộ tính':['brain','vio'],'Niệm lực':['eye','vio'],'Đạo tâm':['lotus','acc'],'Khí vận':['clover','jade'],'Đã hạ':['skull','ink']};
function sib(label){const x=STAT_IC[label];return x?ic(x[0],'sic'):'';}
function ic(n,cls){return `<svg class="ic${cls?' '+cls:''}" viewBox="0 0 24 24" aria-hidden="true"><path d="${ICP[n]||ICP.info}"/></svg>`;}

// ---------- mẩu nhỏ dùng chung ----------
function chipsHTML(ch){if(!ch||!ch.length)return '';return `<div class="chips">${ch.map(c=>`<span class="chip ${c.c||''}"${ta(c.tip)}>${c.i} ${esc(c.t)}</span>`).join('')}</div>`;}
function elSeal(e){const E=EL[e]||EL.vo;return `<span class="el el-${e}"${ta('Hệ '+E.n+(KHAC[e]?'\nKhắc '+EL[KHAC[e]].n:''))}>${E.c}</span>`;}
function bar(cur,max,cls){const p=Math.max(0,Math.min(100,cur/Math.max(1,max)*100));return `<div class="hb ${cls||''}"><i style="width:${p}%"></i></div>`;}
function tabsHTML(key,list,cur){return `<div class="tabs">${list.map(([k,n])=>`<button data-act="tab" data-arg="${key}:${k}" class="${k===cur?'on':''}">${n}</button>`).join('')}</div>`;}
function numVN(x){return String(Math.round(x*10)/10).replace('.',',');}
function stoneHTML(v){return `<span class="stone"><i></i>${v}</span>`;}
function win(title,body,o){o=o||{};return `<section class="win ${o.cls||''}"><header class="win-h"><h2>${title}</h2>${o.extra||''}${o.noClose?'':`<button class="xb" data-act="${o.close||'closePanel'}" aria-label="Đóng">${ic('close')}</button>`}</header><div class="win-b">${body}</div>${o.foot?`<footer class="win-f">${o.foot}</footer>`:''}</section>`;}
function toastFlush(){const L=G.toasts;if(!L||!L.length)return;const box=$('#toast');if(!box)return;
  for(const t of L){const d=document.createElement('div');d.className='toast '+(t.c||'');d.textContent=t.t;box.appendChild(d);setTimeout(()=>d.remove(),3600);}
  G.toasts=[];while(box.children.length>3)box.firstChild.remove();}
