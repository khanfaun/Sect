// Đ10: nút ở Bến Vong Xuyên (màn hết kiếp), màn kết, mục "Đại sự" trong nhóm Việc khác
Object.assign(ACT,{benUong:()=>{benUong();saveSoon();},benDoi:()=>{benDoi();saveSoon();},benTiep:()=>{benTiep();saveSoon();},
  tanMong:()=>{if(UI.confirm!=='tanMong'){UI.confirm='tanMong';return;}UI.confirm=null;dmTanMong();UI.panel=null;UI.modal=null;UI.sel=null;UI.bag=null;syncDodge();saveSoon();}});
{const g=PGROUP.find(x=>x[0]==='Việc khác');if(g&&!g[1].includes('daisu'))g[1].push('daisu');}
// hành trình đã khép (END04/05/07/08): không đầu thai tiếp trong hồ sơ này, chỉ Tân Mộng
{const _b=ACT.birth;ACT.birth=function(){if(G.meta&&G.meta.ketHet){G.screen='ket';return;}return _b.apply(this,arguments);};}
KEEP_CONFIRM.tanMong=1;
