// ---------- chữ nhỏ báo thiện cảm đổi (góc trái dưới, ngay trên chân trang) ----------
// Mọi thay đổi thiện cảm NPC đi qua favAdd (core2/18) và rv.rel (core/05 applyE): bọc favAdd, applyE gọi favPop.
// Mức: đổi 1–3 điểm = 1 mũi tên, 4–9 = 2, từ 10 = 3. Tăng: mũi lên xanh; giảm: mũi xuống đỏ (dùng lớp .chev như chỉ số tăng/giảm).
function favLvArrows(d){const a=Math.abs(d);return a>=10?3:a>=4?2:1;}
function favPop(name,d){
  if(typeof document==='undefined'||!name||!d)return;
  const n=favLvArrows(d),dn=d<0;
  let box=document.getElementById('favpop');if(!box){box=document.createElement('div');box.id='favpop';document.body.appendChild(box);}
  // đặt ngay trên chân trang: lấy mép trên của thanh nav / dock đang hiện ở nửa dưới màn hình
  let top=window.innerHeight;
  for(const s of ['#nav','#dock > *']){document.querySelectorAll(s).forEach(e=>{const r=e.getBoundingClientRect();if(r.width>0&&r.height>0&&r.top>window.innerHeight*0.5&&r.left<window.innerWidth*0.5)top=Math.min(top,r.top);});}
  box.style.bottom=Math.round(window.innerHeight-top+8)+'px';
  while(box.children.length>=5)box.firstChild.remove();
  const row=document.createElement('div');row.className='favrow '+(dn?'dn':'up');
  row.innerHTML=`<span class="chev gain c${n}${dn?' dn':''}">${'<svg viewBox="0 0 20 13"><path d="M1 7L10 1L19 7V12L10 6L1 12Z"/></svg>'.repeat(n)}</span><b>${esc(name)}</b>`;
  box.appendChild(row);
  setTimeout(()=>row.classList.add('out'),1500);setTimeout(()=>row.remove(),1950);
  if(typeof dbg==='function')dbg('thiencam.hien',{n:name,d,mui:n});
}
{const _fa=favAdd;favAdd=function(n,d,why){const x=_fa.apply(this,arguments);if(x)favPop(n,x);return x;};}
