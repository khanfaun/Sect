// Đ3: hộp thoại Thưởng Các, Mưu sinh (luật ở core2/39-tien-te.js)
{const _p=ACT.pact;ACT.pact=function(a){if(a==='thuongcac'||a==='muusinh'){UI.modal={k:a};return;}return _p.apply(this,arguments);};}
ACT.tcBuy=i=>{tcBuy(+i);};
// chạm ô cái ăn trên HUD: đổi mức ăn đạm bạc → thường → khá
ACT.anMuc=()=>{const r=G.run;if(!r)return;const L=Object.keys(AN.muc);r.anMuc=L[(L.indexOf(r.anMuc||'thuong')+1)%L.length];note(contentText('an.mucDoi',[AN.muc[r.anMuc].n,fmtBac(anCost(r))]),'');};
