// Bấm ra ngoài để đóng: hộp nổi có nút X (CO_X ở src/react/main.jsx) hoặc hộp tu luyện, bảng đang mở trên máy tính.
// Bấm vào nền mờ của #modal (ngoài .mbox) → đóng hộp; trên máy tính bấm vào bản đồ khi đang mở bảng → đóng bảng.
// Cú bấm đó bị nuốt luôn (UI.suppress) để bản đồ không chọn nhầm ô / địa điểm.
function dongNgoaiDuoc(md){const box=md&&md.querySelector('.mbox');if(!box||!UI.modal)return false;
  return !!box.querySelector(':scope > .mb-x')||UI.modal.k==='bq'||/^(cg|tt)/.test(UI.modal.k||'');}
if(typeof document!=='undefined')document.addEventListener('pointerdown',e=>{
  if(!G.run||e.button>0)return;const t=e.target;if(!t||!t.closest)return;
  const md=document.getElementById('modal');
  if(UI.modal&&md&&md.contains(t)&&!t.closest('.mbox')){
    if(!dongNgoaiDuoc(md))return;
    e.preventDefault();e.stopPropagation();UI.suppress=true;const k=UI.modal.k;ACT.modalX();dbg('ngoai.hop',{k});render();return;}
  if(UI.panel&&laPC()&&!UI.modal&&t.closest('#mapcv,#mapui,#dock')&&!t.closest('#panel')){
    e.preventDefault();e.stopPropagation();UI.suppress=true;const k=UI.panel;ACT.closePanel();dbg('ngoai.bang',{k});render();}
},true);
