// ================= THẦN THỨC TRÊN BẢN ĐỒ =================
// Tầm nhìn (senseR) theo cảnh giới nhân với thần thức: mỗi điểm trên 10 rộng thêm 3% (thấp nhất 70%, cao nhất gấp đôi).
// Nút "Phóng thần thức": trong TK_DUR giờ tầm nhìn gấp TK_MUL, tốn TK_MP% linh lực, chờ TK_CD ngày mới dùng lại.
// Giao tranh: thỉnh thoảng có người tu tiên đánh nhau gần đó; chỉ thấy trên bản đồ khi nằm trong tầm thần thức. Tới nơi thì dính vào chuyện tranh bảo vật.
const TK_DUR=48,TK_MUL=1.8,TK_MP=30,TK_CD=30;
ENT_T.giaotranh={n:'Giao tranh',i:'⚔️',sp:0,w:0,life:[2,6]};
function tkActive(){const r=G.run;return !!(r&&r.tkUntil&&r.tkUntil>W().t);}
function tkWait(){const r=G.run;return r&&r.tkCd&&r.tkCd>W().t?r.tkCd-W().t:0;}
function tkWhy(){const r=G.run;if(!r)return '-';if(isPham())return contentText("core2_30-than-thuc_js.tkWhy.001");if(tkActive())return contentText("core2_30-than-thuc_js.tkWhy.002");const w=tkWait();if(w>0)return contentText("core2_30-than-thuc_js.tkWhy.003")+durH(w)+'.';if(r.mp<Math.ceil(S().maxMp*TK_MP/100))return contentText("core2_30-than-thuc_js.tkWhy.004");return '';}
function tkMul(){const s=S();return clamp(1+((s.than||10)-10)*0.03,0.7,2)*(tkActive()?TK_MUL:1);}
{const _sr=senseR;senseR=function(){return Math.round(_sr()*tkMul());};}
function tkUse(){const r=G.run;const w=tkWhy();if(w){note(w,'dn');return false;}
  r.mp-=Math.ceil(S().maxMp*TK_MP/100);r.tkUntil=W().t+TK_DUR;r.tkCd=W().t+TK_CD*HD;sense();
  const n=entsHere(r.region).filter(e=>{const p=entXY(e),q=playerXY();return Math.hypot(p[0]-q[0],p[1]-q[1])<=senseR();}).length;
  note(contentText("core2_30-than-thuc_js.tkUse.005")+senseR()+' dặm'+(n?contentText("core2_30-than-thuc_js.tkUse.006")+n+contentText("core2_30-than-thuc_js.tkUse.007"):'.'),'up');dbg('tk.use',{R:senseR(),n});return true;}
// sinh giao tranh gần người chơi (mỗi tháng có thể)
function gtSpawn(){const r=G.run;if(!r||isPham()&&r.age<17)return;const w=W();if(entsHere(r.region).some(e=>e.type==='giaotranh'))return;if(!chance(.3))return;
  const [x,y]=playerXY();const R0=senseR()*1.6;const L=regionOf(r.region).nodes.filter(n=>!['tran','thanh','ai','tong'].includes(n.type)&&n.id!==r.at&&Math.hypot(n.x-x,n.y-y)<=R0);if(!L.length)return;
  const a=pick(L);const T0=ENT_T.giaotranh;const e={id:(w.eid=(w.eid||0)+1),type:'giaotranh',r:r.region,name:contentText("core2_30-than-thuc_js.gtSpawn.008")+a.name,icon:T0.i,at:a.id,to:null,prog:0,route:[],speed:0,until:w.t+ri(T0.life[0],T0.life[1])*HD,data:{},wait:0};
  w.ents.push(e);dbg('gt.spawn',{at:a.name,seen:Math.hypot(a.x-x,a.y-y)<=senseR()});}
{const _at=advanceTime;advanceTime=function(h){const o=_at.apply(this,arguments);const r=G.run;if(r&&h>0){r.gtAcc=(r.gtAcc||0)+h;if(r.gtAcc>=HM){r.gtAcc=0;gtSpawn();}}return o;};}
{const _me=meetEnt;meetEnt=function(e){if(e&&e.type==='giaotranh'){const r=G.run;e.met=r.kiep+':'+Math.floor(W().t/HD);if(r.moving)r.moving=null;if(EVMAP.tranh_bao){if(!startEvent('tranh_bao',{eid:e.id,en:e.name}))return;r.scene.back=null;}removeEnt(e);dbg('gt.meet',{});return;}return _me(e);};}
