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
