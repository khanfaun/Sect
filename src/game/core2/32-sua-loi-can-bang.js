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
// 5) Bí tịch rơi ra không vượt quá cảnh giới kế tiếp (đang Luyện Khí thì không gặp bí tịch Kết Đan)
function artReqCap(){const r=G.run;return isPham()?0:(r.realm||0)+1;}
{const _ga32=genArt;genArt=function(type,tier,sid,o){if(o||!G.run)return _ga32.apply(this,arguments);const cap=artReqCap();let a=_ga32(type,tier,sid,o);
  for(let i=0;i<8&&a.req>cap;i++)a=_ga32(type,i<4?tier:Math.max(0,tier-1),sid,o);
  if(a.req>cap){dbg('art.cap',{req:a.req,cap});a=_ga32(type,Math.min(tier,cap+1),sid,{req:cap});}return a;};}
// 6) Bậc thiên phú: lực chiến bằng người sàn là Bình phàm (trước bị tính là Bất phàm)
const TAL_RT=[0.9,1.25,1.7,2.4]; // Phế vật · Bình phàm · Bất phàm · Tinh anh · Thiên kiêu
function talLvQ(q){let lv=0;for(const x of TAL_RT)if(q>=x-1e-9)lv++;return lv;}
{const _pt32=playerTal;playerTal=function(){const t=_pt32();if(!t||!t.lc)return t;return Object.assign({},t,{tier:talLvQ(t.score)});};}
{const _ut32=unitTal;unitTal=function(u){const t=_ut32(u);if(!t||!u||u.isMain||t.p)return t;return {tier:talLvQ(t.score),score:t.score};};}
// 7) Phần trăm lịch luyện báo ra không vượt 100% của một tầng/kỳ (tránh "+101%" do làm tròn)
{const _lsg32=llShowGain;llShowGain=function(x){const v=_lsg32(x);return sgOn()?Math.min(100,v):v;};}
// 8) Tầng Luyện Khí hẹp hơn kỳ của các cảnh giới sau rất nhiều: lịch luyện nhận được co theo bề rộng tầng,
//    để mỗi tầng cần chừng ấy công sức như một kỳ (trước đây quen một người là đầy cả tầng).
const LL_KY_W=100/3;
function llTangMul(){const r=G.run;if(!r||!sgOn()||r.realm!==0)return 1;return sgW(sgGate())/LL_KY_W;}
// 9) Nhịp lịch luyện: thắng một trận chỉ chừng 15–20% thanh (phàm nhân, mỗi tầng hay mỗi kỳ)
const LL_RATE_PHAM=0.5,LL_RATE=0.2;
function llRate(){return isPham()?LL_RATE_PHAM:LL_RATE;}
{const _la32=llAdd;llAdd=function(x,why,quiet){return _la32(x>0?x*llTangMul()*llRate():x,why,quiet);};}
