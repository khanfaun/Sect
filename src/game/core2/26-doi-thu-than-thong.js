// ================= ĐỐI THỦ BIẾT DÙNG CHIÊU MẠNH =================
// Luật đơn giản: kẻ địch xuống dưới 30% khí huyết thì liều mạng một lần: dùng chiêu mạnh nhất nó có
// (có chiêu hồi phục thì một nửa khả năng hồi trước), thần lực từ nửa trở lên thì bung pháp tướng luôn.
const FOE_DESP=0.3;
function foeBest(u){let b='atk',bp=0;for(const it of u.pat||[]){const k=it==='charge'?'heavy':it;const p=(EN_SK[k]&&EN_SK[k].fx.p)||0;const h=EN_SK[k]&&EN_SK[k].fx.h||1;if(p*h>bp){bp=p*h;b=k;}}return b;}
{const _ni=nextIntent;nextIntent=function(u){_ni(u);
  if(!u||u.side!=='B'||u.immune||u.kind==='kiep'||u._desp||u.hp<=0||u.hp>u.max*FOE_DESP)return;
  u._desp=1;const sc=G.run&&G.run.scene;
  const heal=(u.pat||[]).includes('heal')&&chance(.5);u.intent=heal?'heal':foeBest(u);
  if(sc&&sc.type==='combat'){clog(sc,`${u.name} bị dồn vào đường cùng, ${heal?'vận công hồi phục':'dồn sức tung đòn mạnh nhất'}!`,'en');
    if(!u.fpt&&(u.than||0)>=50&&!sc.kiep&&!sc.spar&&typeof foePtStart==='function')foePtStart(sc,u);}
  dbg('foe.desp',{n:u.name,it:u.intent});};}
