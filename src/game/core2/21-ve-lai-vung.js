// ================= VỀ LẠI VÙNG CŨ =================
// Ở điểm vào của một vùng (từ vùng 2 trở đi) có thể quay về vùng trước, đến thẳng quan ải của vùng đó.
// Đã qua rồi nên không cần lệnh bài hay tu vi; đường đi tốn thời gian bằng lúc vượt ải.
function canGoBack(n){const r=G.run;return !!(r&&n&&r.region>0&&n.id===regionOf(r.region).entry);}
{const _pa=placeActs;placeActs=function(n){const L=_pa(n);if(canGoBack(n)){const k=G.run.region-1;L.push({a:'goback',i:'↩️',l:contentText("core2_21-ve-lai-vung_js.001")+REG[k].n,h:3,tip:contentText("core2_21-ve-lai-vung_js.002")+CROSS_M[G.run.region]+contentText("core2_21-ve-lai-vung_js.003"),dis:false});}return L;};}
{const _pc=placeAct;placeAct=function(a){const r=G.run,sc=r&&r.scene;if(a==='goback'&&sc&&sc.type==='place'){const n=nodeById(sc.id);if(canGoBack(n))doGoBack();return;}return _pc(a);};}
function doGoBack(){
  const r=G.run;const from=r.region,k=from-1;const mo=CROSS_M[from];
  advanceTime(mo*HM);if(!G.run)return;
  r.region=k;r.moving=null;const R0=regionOf(k);arrive(R0.pass!=null?R0.pass:R0.entry);
  log(contentText("core2_21-ve-lai-vung_js.doGoBack.004", [REG[k].n]));bio(contentText("core2_21-ve-lai-vung_js.doGoBack.005", [Math.floor(r.age),REG[k].n]));
  r.scene={type:'region',text:contentText("core2_21-ve-lai-vung_js.doGoBack.006"),sub:contentText("core2_21-ve-lai-vung_js.doGoBack.007", [mo])};
}
