// ================= NHẬT KÝ GỠ LỖI =================
// Ghi lại các sự kiện chính của game vào một bộ nhớ vòng (tối đa NK.max dòng) để kiểm tra bằng chữ thay vì chụp màn hình.
// Mặc định TẮT. Bật bằng: mở game với ?debug=1 trên địa chỉ, hoặc NK.on=true (trong bài kiểm tra), hoặc nút trong Cấu hình.
// Đọc: NK.dump() trả về chuỗi nhiều dòng; NK.clear() xoá; NK.last(n) lấy n dòng cuối.
// Thêm dòng mới ở bất kỳ đâu trong lõi: dbg('nhóm.tên',{khoá:giá_trị}). Khi tắt, dbg không làm gì nên không tốn máy.
const NK={on:false,max:800,buf:[],seq:0,
  clear(){this.buf.length=0;},
  last(n){return this.buf.slice(-(n||40));},
  line(e){let d='';try{d=e.d===undefined?'':' '+JSON.stringify(e.d);}catch(x){d=' [không ghi được]';}return `#${e.n} ${e.w} ${e.tag}${d}`;},
  dump(n){return (n?this.buf.slice(-n):this.buf).map(e=>this.line(e)).join('\n');},
  count(tag){return this.buf.filter(e=>e.tag===tag||e.tag.startsWith(tag+'.')).length;}};
try{if(typeof location!=='undefined'&&/[?&]debug(=1)?(&|$)/.test(location.search))NK.on=true;
  else if(typeof localStorage!=='undefined'&&localStorage.getItem('ps_debug')==='1')NK.on=true;}catch(e){}
function dbg(tag,d){if(!NK.on)return;let w='';try{const t=W().t;w='n'+Math.floor(t/HY)+'.'+Math.floor((t%HY)/HM);}catch(e){}
  NK.buf.push({n:++NK.seq,w,tag,d});if(NK.buf.length>NK.max)NK.buf.splice(0,NK.buf.length-NK.max);}
function nkSet(on){NK.on=!!on;try{localStorage.setItem('ps_debug',on?'1':'0');}catch(e){}}
if(typeof window!=='undefined'){window.NK=NK;
  window.addEventListener('error',e=>{dbg('LOI',{msg:String(e.message).slice(0,200),at:(e.filename||'').split('/').pop()+':'+e.lineno});});
  window.addEventListener('unhandledrejection',e=>{dbg('LOI.promise',{msg:String(e.reason).slice(0,200)});});}

// ---- các móc ghi: chỉ quan sát, không đổi kết quả ----
{const _f=startCombat;startCombat=function(spec,after){const x=_f.apply(this,arguments);
  try{const sc=G.run&&G.run.scene;if(sc&&sc.type==='combat')dbg('combat.start',{foes:sc.units.filter(u=>u.side==='B').map(u=>u.name),boss:!!sc.boss,elite:!!sc.elite,kiep:!!sc.kiep,hp:G.run.hp});}catch(e){}return x;};}
{const _f=uyApSet;uyApSet=function(sc){const x=_f.apply(this,arguments);
  try{const me=mainUnit(sc);dbg('combat.uyap',{meCrushed:!!(me&&me.st.uyap),foesCrushed:sc.units.filter(u=>u.side==='B'&&u.st&&u.st.uyap).map(u=>u.name)});}catch(e){}return x;};}
{const _f=combatContinue;combatContinue=function(){const sc=G.run&&G.run.scene;
  try{if(sc&&sc.type==='combat')dbg('combat.end',{over:sc.over,llGain:sc.llGain||0,hp:G.run.hp});}catch(e){}return _f.apply(this,arguments);};}
{const _f=playerAct;playerAct=function(id,tid){const ok=_f.apply(this,arguments);dbg('skill',{id,ok:!!ok,locked:ok?undefined:skLocked(id)});return ok;};}
{const _f=consumeOnceSkill;consumeOnceSkill=function(sc,id){dbg('skill.once.consumed',{id});return _f.apply(this,arguments);};}
{const _f=btFail;btFail=function(){const x=_f.apply(this,arguments);dbg('bt.fail',{btFail:G.run&&G.run.btFail});return x;};}
{const _f=btFinish;btFinish=function(){dbg('bt.ok',{realmBefore:G.run&&G.run.realm});return _f.apply(this,arguments);};}
{const _f=kyStart;kyStart=function(ev){dbg('kyngo',{ev:ev&&ev.id,van:S().van,mul:+kyMul().toFixed(2)});return _f.apply(this,arguments);};}
{const _f=kyBigOpen;kyBigOpen=function(){const o=_f.apply(this,arguments);dbg('kyngo.big',{open:o,van:S().van});return o;};}
{const _f=llAdd;llAdd=function(x,why,quiet){const b=G.run&&G.run.ll;const o=_f.apply(this,arguments);dbg('ll',{in:+(+x).toFixed(2),mulNgo:+ngoLlMul().toFixed(3),why,ll:G.run&&G.run.ll,from:b});return o;};}
{const _f=doGoBack;doGoBack=function(){const from=G.run&&G.run.region;const x=_f.apply(this,arguments);dbg('region.back',{from,to:G.run&&G.run.region});return x;};}
{const _f=doCross;doCross=function(k,how){dbg('region.cross',{to:k,how});return _f.apply(this,arguments);};}
{const _f=die;die=function(cause){dbg('die',{cause,age:G.run&&Math.floor(G.run.age),realm:G.run&&G.run.realm});return _f.apply(this,arguments);};}
{const _f=advanceTime;advanceTime=function(h){if(h>=HM)dbg('time',{months:+(h/HM).toFixed(2)});return _f.apply(this,arguments);};}
