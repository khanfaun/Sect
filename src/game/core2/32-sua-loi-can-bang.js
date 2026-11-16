// ================= ĐỢT 32: SỬA LỖI VÀ CÂN BẰNG =================
// 1) Lịch luyện như tu vi: không vượt quá đỉnh tầng/kỳ đang mở; xung kích lên tầng/kỳ mới hay đột phá đều về 0.
function llCap(){const r=G.run;if(!r||!sgOn())return LL_MAX;return Math.min(LL_MAX,sgEnd(sgGate()));}
{const _xk32=lkXk;lkXk=function(){const r=G.run;const g0=r&&sgGate();const s0=r&&S();const ok=_xk32.apply(this,arguments);const r2=G.run;
  if(ok&&r2&&sgOn()&&sgGate()>g0){r2.ll=sgTh()[sgGate()-1];const s1=S();r2.hp+=Math.max(0,s1.maxHp-s0.maxHp);r2.mp+=Math.max(0,s1.maxMp-s0.maxMp);clampHp();dbg('xk.ll',{g:sgGate(),ll:r2.ll});}return ok;};}
{const _bf32=btFinish;btFinish=function(){const rl=G.run&&G.run.realm;const res=_bf32.apply(this,arguments);if(G.run&&G.run.realm>rl){G.run.ll=0;dbg('bt.ll',{realm:G.run.realm});}return res;};}
// 2) Phàm nhân dẫn khí nhập thể cũng hiện bảng "lên cảnh giới" như xung kích
{const _pu32=phamUp;phamUp=function(){const r=G.run;const was=r&&isPham();const pre=was&&ascSnap(),from=was&&realmLabel();const res=_pu32.apply(this,arguments);const r2=G.run;
  if(was&&r2&&!isPham()){r2.ll=0;r2.asc={k:'xk',from,to:realmLabel(),diff:ascDiff(pre,ascSnap())};dbg('pham.up',{});}return res;};}
// 3) Bế quan chỉ còn một nửa tu vi (đẩy người chơi ra ngoài lịch luyện)
const BQ_TV_MUL=0.5;
{const _br32=bqReal;bqReal=function(){return _br32()*BQ_TV_MUL;};}
// 4) Pháp bảo: chỉ từ Trúc Cơ trở lên mới dùng được, và hiếm hơn hẳn trang bị, vũ khí
const PB_KEEP=0.2,PB_MIN_REQ=2; // giữ lại 20% số pháp bảo rơi ra; yêu cầu tối thiểu Trúc Cơ
function isPB(x){return !!x&&x.k!=='book'&&x.k!=='linhthu'&&slotOf(x)==='phapbao';}
{const _gr32b=genRelic;genRelic=function(t){let x=_gr32b(t);
  for(let i=0;i<12&&isPB(x)&&(relReq(x)<PB_MIN_REQ||!chance(PB_KEEP));i++)x=_gr32b(t);
  if(isPB(x)&&relReq(x)<PB_MIN_REQ){for(let i=0;i<30&&isPB(x);i++)x=_gr32b(t);}
  if(isPB(x)&&relReq(x)<PB_MIN_REQ)x.req=PB_MIN_REQ;return x;};}
// 5) Từ Kết Đan, phần thưởng bớt bí tịch (một nửa đổi thành đan dược hoặc linh thạch)
{const _gp32=genPicks;genPicks=function(kind){const L=_gp32.apply(this,arguments);const r=G.run;if(!r||(r.realm||0)<2)return L;
  return L.map(o=>{if(o.k!=='skill'||!chance(0.5))return o;return chance(0.5)?{k:'pill',id:rollPill(),q:r.region>=3?ri(1,2):r.region>=1?ri(0,1):0}:{k:'st',n:Math.max(1,Math.round(ri(18,30)*SC[r.region]))};});};}
// 6) Bậc thiên phú: lực chiến bằng người sàn là Bình phàm (trước bị tính là Bất phàm)
const TAL_RT=[0.9,1.25,1.7,2.4]; // Phế vật · Bình phàm · Bất phàm · Tinh anh · Thiên kiêu
function talLvQ(q){let lv=0;for(const x of TAL_RT)if(q>=x-1e-9)lv++;return lv;}
{const _pt32=playerTal;playerTal=function(){const t=_pt32();if(!t||!t.lc)return t;return Object.assign({},t,{tier:talLvQ(t.score)});};}
{const _ut32=unitTal;unitTal=function(u){const t=_ut32(u);if(!t||!u||u.isMain||t.p)return t;return {tier:talLvQ(t.score),score:t.score};};}
