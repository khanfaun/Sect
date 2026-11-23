// Giao diện mới (kiểu Ngọc Hành Trình): nút "Nhân vật" ở thanh dưới mở bảng nhân vật ở thẻ Căn cơ
// (nếu đang ở thẻ Túi đồ thì chuyển thẻ chứ không đóng bảng).
ACT.navChar=()=>{if(UI.panel==='char'&&UI.tab.char!=='bag'){UI.panel=null;return;}UI.panel='char';if(UI.tab.char==='bag')UI.tab.char='base';UI.code=null;UI.msg=null;dbg('gd.nav',{k:'char',tab:UI.tab.char||'base'});};
// Mọi thông báo (toast, chữ nhỏ nhận/mất vật, thiện cảm) hiện ở trên, ngay dưới thanh đầu đang thấy
// (thẻ trạng thái trên bản đồ, đầu bảng, đầu màn địa điểm, đầu màn bế quan), không ở dưới chân nữa.
function tbTop(){if(typeof document==='undefined')return 60;const app=document.getElementById('app');const A=app?app.getBoundingClientRect():{top:0};
  let b=0;for(const s of ['#modal .bq-top','#sheet .pl-top','#panel .win-h','#hud']){const e=document.querySelector(s);if(!e||e.closest('[hidden]'))continue;const r=e.getBoundingClientRect();if(r.width>0&&r.height>0){b=r.bottom;break;}}
  return Math.round(b-A.top+8);}
function tbDat(){const t=tbTop();const tb=document.getElementById('toast');if(tb)tb.style.top=t+'px';
  const A=document.getElementById('app'),at=A?A.getBoundingClientRect().top:0;
  const hn=document.getElementById('hnote');if(hn)hn.style.top=(t+at)+'px';
  const fp=document.getElementById('favpop');if(fp){fp.style.top=(t+at+(tb&&tb.children.length?tb.offsetHeight+4:0))+'px';fp.style.bottom='auto';}
  dbg('tb.dat',{top:t});}
{const _tf=toastFlush;toastFlush=function(){if(G.toasts&&G.toasts.length)tbDat();return _tf.apply(this,arguments);};}
{const _hn=hnote;hnote=function(){const x=_hn.apply(this,arguments);tbDat();return x;};}
{const _fp=favPop;favPop=function(){const x=_fp.apply(this,arguments);tbDat();return x;};}
// bế quan: kéo thanh trượt thì ô nhập số năm đổi theo
{const _bu=bqUpd;bqUpd=function(y){_bu.apply(this,arguments);const e=document.getElementById('bqYn');if(e&&document.activeElement!==e)e.value=+(+y).toFixed(2);};}
// ---------- máy tính: giao diện riêng (thanh trên, cột trái nhân vật + menu, cột phải nhiệm vụ) ----------
// Chỉ khi màn đủ rộng; bản đồ / cảnh dùng bố cục máy tính (React: src/react/may-tinh), trận và màn ngoài vẫn khung điện thoại.
function laPC(){return typeof window!=='undefined'&&window.innerWidth>=1000&&window.innerHeight>=600;}
{const _r=render;render=function(){if(typeof document!=='undefined'){const d=document.documentElement;if(laPC())d.dataset.pc='1';else delete d.dataset.pc;}return _r.apply(this,arguments);};}
if(typeof window!=='undefined'){let _pc=laPC();window.addEventListener('resize',()=>{const v=laPC();if(v!==_pc){_pc=v;render();}});
  // phím tắt trên máy tính: 1–7 mở các mục, B bế quan, M bản đồ
  const PK={'1':'bagOpen','2':'navChar','3':['panel','tong'],'4':'closePanel','5':['panel','pets'],'6':['panel','journal'],'7':['panel','bonds'],b:'hudBq',m:'closePanel'};
  document.addEventListener('keydown',e=>{if(!laPC()||e.ctrlKey||e.metaKey||e.altKey)return;const t=e.target;if(t&&(t.tagName==='INPUT'||t.tagName==='TEXTAREA'||t.tagName==='SELECT'||t.isContentEditable))return;
    if(G.screen!=='map'||!G.run||UI.modal||(G.run.scene&&G.run.scene.type==='combat'))return;const k=PK[e.key.toLowerCase()];if(!k)return;
    const [a,arg]=Array.isArray(k)?k:[k];if(!ACT[a])return;if(a==='hudBq'&&bqCan())return;e.preventDefault();ACT[a](arg);render();dbg('pc.phim',{k:e.key,a});});}
