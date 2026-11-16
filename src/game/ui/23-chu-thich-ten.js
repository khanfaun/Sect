// ===== Chú thích tên riêng trong lời kể: tông môn, thiên kiêu, địa danh có gạch chân, rê/chạm để xem =====
// Chạy sau chú thích từ ngữ chung (GLOSS). Chỉ thay trong phần chữ, không đụng vào thẻ hay chú thích đã có.
const AL_N={chinh:'chính đạo',ta:'tà đạo',ma:'ma đạo',trung:'trung lập',phat:'Phật môn'};
const NODE_N={tran:'Thị trấn',thanh:'Thành trì',rung:'Rừng',nui:'Núi',song:'Sông',phe:'Phế tích',dong:'Hang động',tong:'Tông môn',bien:'Bờ biển',hoang:'Hoang mạc',ma:'Ma địa',thien:'Thiên cảnh',ai:'Quan ải',sao:'Sào huyệt'};
let _gnKey='',_gnMap=null,_gnRe=null;
function glossNames(){const g=G.meta&&G.meta.world;if(!g)return null;const r=G.run;const key=(g.year||0)+'|'+((r&&r.rivals||[]).map(x=>x.realm).join(''))+'|'+(r&&r.region);
  if(key===_gnKey)return _gnMap;const M={};
  (g.sects||[]).forEach(s=>{if(s&&s.n)M[s.n]='Tông môn '+(AL_N[s.al]||'')+'.';});
  (g.rivals||[]).forEach((w,i)=>{if(!w||!w.ten)return;const rv=r&&(r.rivals||[]).find(x=>x.i===i);const sect=(g.sects[w.s]||{}).n;
    M[w.ten]=(w.tt?w.tt.charAt(0).toUpperCase()+w.tt.slice(1):'Thiên kiêu')+(sect?' của '+sect:'')+(rv&&REALM[rv.realm]?', cảnh giới '+REALM[rv.realm]:'')+'.';});
  try{for(let k=0;k<5;k++){const reg=regionOf(k);for(const n of (reg&&reg.nodes)||[])if(n&&n.name&&!M[n.name])M[n.name]=(NODE_N[n.type]||'Địa danh')+'.';}}catch(e){}
  const ks=Object.keys(M).filter(k=>k.length>=3).sort((a,b)=>b.length-a.length).map(k=>k.replace(/[.*+?^${}()|[\]\\]/g,'\\$&'));
  _gnKey=key;_gnMap=M;_gnRe=ks.length?new RegExp('(^|[^\\p{L}])('+ks.join('|')+')(?![\\p{L}])','gu'):null;return M;}
{const _gl23=gloss;gloss=function(h){const out=_gl23(h);let M=null;try{M=glossNames();}catch(e){}if(!M||!_gnRe)return out;
  // bỏ qua thẻ và các chú thích đã gắn, chỉ thay phần chữ trơn
  return String(out).split(/(<span class="gl"[^>]*>[\s\S]*?<\/span>|<[^>]+>)/).map((part,i)=>i%2?part:part.replace(_gnRe,(m,pre,w)=>`${pre}<span class="gl" data-tip="${esc(w+': '+M[w])}">${w}</span>`)).join('');};}
