// ================= NGỘ TÍNH → LỊCH LUYỆN, KHÍ VẬN → KỲ NGỘ =================
// Ngộ tính cao thì mỗi lần lịch luyện tăng được nhiều hơn: +2,5% cho mỗi điểm trên 10, tối đa +50%.
const NGO_LL_PER=0.025,NGO_LL_MAX=0.5;
function ngoLlMul(){const r=G.run;if(!r)return 1;return 1+clamp((S().ngo-10)*NGO_LL_PER,0,NGO_LL_MAX);}
{const _la=llAdd;llAdd=function(x,why,quiet){return _la(x>0?x*ngoLlMul():x,why,quiet);};}
// Khí vận cao thì dễ gặp kỳ ngộ: +12% cơ hội cho mỗi điểm trên 4 (mức khởi đầu), thấp nhất 60%, cao nhất 300%.
// Kỳ ngộ lớn (loại hiếm nhất) chỉ mở khi khí vận từ KY_BIG_VAN trở lên.
const KY_BIG_VAN=8;
function kyMul(){const r=G.run;if(!r)return 1;return clamp(1+(S().van-4)*0.12,0.6,3);}
function kyBigOpen(){const r=G.run;if(!r)return false;if(S().van>=KY_BIG_VAN)return true;
  if(!r.kyBigMiss){r.kyBigMiss=1;log('Một cơ duyên lớn lướt qua trước mặt, nhưng khí vận chưa đủ để ngươi nhìn thấy nó.');}return false;}

// chiêu dùng một lần đã tiêu hao thì không được dựng lại từ công pháp
{const _ka=knAvail;knAvail=function(cat){const m=_ka(cat);const u=G.run&&G.run.skUsed;if(u)for(const id in u)delete m[id];return m;};}
