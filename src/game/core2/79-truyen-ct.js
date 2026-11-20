// ---------------- VIỆC 7: SANG KIẾP — TRUYỀN CÔNG TRÌNH, THÀNH TRẤN ĐANG NẮM ----------------
// Lúc chết: còn người thân sống → ô đất/công trình về tay người thân (chu {k:'than',ten,qh}). Không có người thân:
//   thành trấn phàm → về Hoàng quốc nắm nơi đó; thành trấn tu sĩ → dân tự trị. Nếu ngươi là chủ một thế lực (r.chuFa) → về tay thế lực đó (người trong thế lực quản).
// Thành trấn ngươi nắm quyền (n.quyen) đi theo cùng luật: người thân giữ tiếp (vẫn ghi quyền nhưng không còn là của ngươi), không thì trả về chủ cũ / tự trị / thế lực của ngươi.
function tcNguoiThan(r){return (r.family||[]).find(f=>f.song&&!['cha','me'].includes(f.qh))||(r.family||[]).find(f=>f.song)||null;}
function tcChuMoi(r,n){const fa=(r.chuFa||[])[0];if(fa)return {k:'fa',id:fa};const t=tcNguoiThan(r);if(t)return {k:'than',ten:t.ten,qh:t.qh};
  if(n.type==='tran'||n.type==='thanh')return n.fa&&!String(n.fa).startsWith('tong:')?{k:'fa',id:n.fa}:{k:'dan'};return {k:'dan'};}
function tcTruyen(r){if(!r||!W()||typeof datStore!=='function')return 0;const D=datStore()||{};let k=0;
  for(const id in D){const n=nodeById(+id);if(!n)continue;(D[id].o||[]).forEach(c=>{if(!(c.chu&&c.chu.k==='ta'))return;c.chu=tcChuMoi(r,n);delete c.thueNo;delete c.thueKy;delete c.noQuan;k++;});}
  for(const R0 of W().regions)for(const n of R0.nodes){if(!(n.quyen&&n.quyen.k==='ta'))continue;const c=tcChuMoi(r,n);
    if(c.k==='than')n.quyen={k:'than',ten:c.ten,t:W().t,fa0:n.quyen.fa0};else{if(c.k==='fa')n.fa=c.id;else if(isTuT(n.type))n.fa='tutri';delete n.quyen;}k++;}
  r.hopThu=[];if(k)dbg('tc.truyen',{k,than:!!tcNguoiThan(r),fa:(r.chuFa||[])[0]||''});return k;}
{const _d=die;die=function(){const r=G.run;try{if(r&&W())tcTruyen(r);}catch(e){dbg('tc.loi',{m:String(e.message||e)});}return _d.apply(this,arguments);};}
{const _ct=datChuTen;datChuTen=function(chu){if(chu&&chu.k==='than')return contentText('tc.than',[chu.ten]);return _ct.apply(this,arguments);};}
{const _cT=chuTen;chuTen=function(f){if(f==='tutri')return contentText('tc.tuTri');return _cT.apply(this,arguments);};}
{const _pm=placeMeta;placeMeta=function(n){const o=_pm.apply(this,arguments);if(o&&n&&n.quyen&&n.quyen.k==='than')o.luc=contentText('tc.than',[n.quyen.ten]);return o;};}
