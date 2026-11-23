// Tên sinh ngẫu nhiên không lặp chữ liền nhau: "Lăng Lăng", "Chung Ly Ly" (họ trùng tên), "Hắc Thoa Thoa" (tiền tố trùng tên gốc pháp bảo).
// Tên đôi cố ý như "Tiêm Tiêm" vẫn giữ (chỉ xét chỗ nối họ – tên, tiền tố – gốc).
function tenBoLap(s){const w=String(s||'').split(' ');const o=[];for(const x of w)if(!o.length||o[o.length-1].toLowerCase()!==x.toLowerCase())o.push(x);return o.join(' ');}
{const _gn=genName;genName=function(g,rare){let n=_gn.apply(this,arguments);
  for(let i=0;i<6;i++){const w=String(n).split(' ');const ho=w.length>2&&NAME.ho2&&NAME.ho2.includes(w[0]+' '+w[1])?2:1;
    if(!w[ho]||w[ho-1].toLowerCase()!==w[ho].toLowerCase())break;dbg('ten.lap',{n});n=_gn.apply(this,arguments);}
  return n;};}
{const _gr=genRelic;genRelic=function(){const x=_gr.apply(this,arguments);if(x&&x.name){const n=tenBoLap(x.name);if(n!==x.name){dbg('ten.lap',{n:x.name});x.name=n;}}return x;};}
{const _ga=genArt;genArt=function(){const a=_ga.apply(this,arguments);if(a&&a.n){const n=tenBoLap(a.n);if(n!==a.n){dbg('ten.lap',{n:a.n});a.n=n;}}return a;};}
