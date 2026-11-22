// ================= DEV TEST: nút bấm của các tab =================
// Luật: core2/83-dev-test.js. Giao diện: src/react/hop-thoai/DevTest.jsx. Não máy tự chơi: dev/01-bot-loi.js + tools/bot-ext.js + tools/bot-smart.js (nạp khi bấm Tự chơi).
function devSt(){if(!UI.dev)UI.dev={tab:'ai',loai:'pb',kv:'tt',sel:{},q:'',re:0,g:1,cb:{A:[{v:'main',re:null}],B:[]},cbAdd:'en:lang',cbRe:0};return UI.dev;}
ACT.devTab=t=>{devSt().tab=t;};
// ---- tự chơi: máy điều khiển nhân vật chính theo chiến lược thông minh nhất (bot smart) ----
let DEV_AI=null;
function devAiStop(msg){if(DEV_AI){clearInterval(DEV_AI.h);DEV_AI=null;}if(msg)note(msg);render();}
function devAiOn(){return !!DEV_AI;}
function devAiInfo(){return DEV_AI?{buoc:DEV_AI.n,toc:DEV_AI.toc,loi:DEV_AI.loi}:null;}
ACT.devAiGo=toc=>{const B=devBotNap();if(!B){note('Không nạp được máy tự chơi.');return;}if(DEV_AI)clearInterval(DEV_AI.h);
  toc=Math.max(1,+toc||1);UI.modal=null;UI.panel=null;
  DEV_AI={n:0,toc,loi:'',h:setInterval(()=>{if(!G.run||G.screen==='over'||G.screen==='title'){devAiStop('Tự chơi dừng: nhân vật đã hết kiếp.');return;}
    try{for(let i=0;i<toc&&G.run&&G.screen!=='over';i++){B.buoc();DEV_AI&&DEV_AI.n++;}}catch(e){console.error(e);const m=String(e&&e.message||e);devAiStop('Tự chơi dừng vì lỗi: '+m);return;}
    render();},toc>=20?60:180)};
  dbg('dev.ai',{toc});note('Máy đang tự chơi (nhanh ×'+toc+'). Bấm nút Dev test để dừng.');};
ACT.devAiStop=()=>devAiStop('Đã dừng tự chơi.');
// mở hộp Dev test khi máy đang chơi: dừng máy trước
{const _o=ACT.devOpen;ACT.devOpen=function(){if(DEV_AI){devAiStop('Đã dừng tự chơi.');}return _o.apply(this,arguments);};}
// ---- cảnh giới ----
ACT.devRe=v=>{const d=devSt();d.re=+v;d.g=1;};
ACT.devG=v=>{devSt().g=+v;};
ACT.devReGo=()=>{const d=devSt();if(devSetRealm(d.re,d.g))note('Đã đổi cảnh giới: '+(d.re<0?'Phàm nhân':REALM[d.re]+' · '+(d.re===0?'tầng '+d.g:TIEU[d.g-1]))+'.','up');};
// ---- bản đồ ----
ACT.devMap=()=>{const n=devMoMap();note('Đã mở toàn bộ bản đồ ('+n+' địa điểm mới hiện ra).','up');};
// ---- vật phẩm ----
ACT.devLoai=l=>{const d=devSt();d.loai=l;d.sel={};};
ACT.devQ=(v,el)=>{devSt().q=String(el&&el.value!=null?el.value:v||'');};
ACT.devSel=id=>{const d=devSt();if(d.sel[id])delete d.sel[id];else d.sel[id]=1;};
ACT.devSelAll=()=>{const d=devSt();const L=devLoc();const all=L.every(x=>d.sel[x.id]);d.sel={};if(!all)for(const x of L)d.sel[x.id]=1;};
ACT.devGive=()=>{const d=devSt();const ids=Object.keys(d.sel);if(!ids.length){note('Chưa chọn món nào.');return;}const n=devGiveMany(d.loai,ids);d.sel={};note('Đã nhận '+n+' món.','up');};
ACT.devGiveAll=()=>{const d=devSt();const n=devGiveMany(d.loai,devLoc().map(x=>x.id));note('Đã nhận '+n+' món.','up');};
function devLoc(){const d=devSt();const q=(d.q||'').toLowerCase().trim();const L=devList(d.loai);return q?L.filter(x=>x.n.toLowerCase().includes(q)):L;}
// ảnh đại diện từng món
function devIcon(loai,x){const bem=e=>`<span class="bem">${esc(e||'❔')}</span>`;
  if(loai==='pb'){const c=CAT.byId[x.id];return c?relIcon(catRelic(c)):slotIcon('phapbao');}
  if(loai==='cp')return assetImg('item','book',slotIcon('book'));
  if(loai==='dan')return assetImg('item','pill:'+x.id,bem(x.em));
  if(loai==='lieu')return assetImg('item','mat:'+x.id,bem(x.em));
  if(loai==='vat')return assetImg('item',x.id,bem(x.em));
  if(loai==='xe')return ASSET.veh&&ASSET.veh[x.id]?`<img class="asset" src="${esc(ASSET.veh[x.id])}" alt="">`:bem('🐎');
  if(loai==='trung')return bem(x.em||'🥚');return bem('❔');}
// ---- khí vận, thể chất ----
ACT.devKv=k=>{devSt().kv=k;};
ACT.devKvAdd=id=>{const d=devSt();if(devKvAdd(d.kv,id))note('Đã thêm.','up');};
ACT.devKvDel=id=>{const d=devSt();if(devKvDel(d.kv,id))note('Đã xoá.','dn');};
// ---- thương thế ----
ACT.devWAdd=k=>{devWAdd(k);};
ACT.devWDel=k=>{if(devWDel(k||null))note('Đã chữa.','up');};
// ---- dàn trận ----
ACT.devCbPick=v=>{devSt().cbAdd=v;};
ACT.devCbRePick=v=>{devSt().cbRe=+v;};
ACT.devCbAdd=side=>{const d=devSt();const L=d.cb[side];if(L.length>=4){note('Mỗi phe tối đa 4.');return;}
  if(d.cbAdd==='main'){if(side!=='A'){note('Nhân vật chính chỉ đứng phe ta.');return;}if(L.some(x=>x.v==='main'))return;L.unshift({v:'main',re:null});return;}
  L.push({v:d.cbAdd,re:d.cbRe});};
ACT.devCbDel=x=>{const [s,i]=String(x).split(':');devSt().cb[s].splice(+i,1);};
ACT.devCbRe=(v,el)=>{const [s,i]=String(el&&el.dataset.arg||'').split(':');const it=devSt().cb[s]&&devSt().cb[s][+i];if(it)it.re=v===''?null:+v;};
ACT.devCbGo=()=>{const d=devSt();const A=d.cb.A.map(x=>x.v==='main'?{v:'main',re:x.re}:x);
  if(!A.length){note('Phe ta chưa có ai.');return;}if(!d.cb.B.length){note('Phe địch chưa có ai.');return;}
  if(G.run.scene&&G.run.scene.type==='combat'){note('Đang trong trận khác.');return;}
  UI.modal=null;if(!devCombat(A,d.cb.B))note('Không dựng được trận.');};
// ô tìm món: gõ tới đâu lọc tới đó
document.addEventListener('input',e=>{const el=e.target;if(!el||!el.matches||!el.matches('input[data-devq]'))return;devSt().q=el.value;render();});
// thẻ Nhân vật (ngoại hình): độ tuổi, tuổi, tóc, áo, hạt châu
ACT.devNhTuoi=k=>{nhDoTuoiSet(k);};
ACT.devNhAge=a=>{nhTuoiSet(+a);};
ACT.devNhToc=v=>{nhSet('toc',v);};ACT.devNhAo=v=>{nhSet('ao',v);};ACT.devNhChau=v=>{nhSet('chau',v);};
