// ================= CẢM NGỘ: thất bại đột phá nhiều lần thì chắc chắn qua =================
// Mỗi lần đột phá thất bại cộng một điểm cảm ngộ (btFail). Đủ CN_MAX điểm thì lần sau chắc chắn thành công,
// để người chơi không bị kẹt mãi. Đột phá thành công (đại cảnh giới hay dẫn khí nhập thể) thì cảm ngộ về 0.
const CN_MAX=5;
function camNgo(){const r=G.run;return r?Math.max(0,r.btFail||0):0;}
function camNgoFull(){return camNgo()>=CN_MAX;}
// hiển thị trong bảng "Khả năng thành công"
{const _bp=btParts;btParts=function(slots){const L=_bp(slots);if(camNgoFull())L.push({t:'Cảm ngộ đã đầy ('+CN_MAX+'/'+CN_MAX+')',v:100,tip:'Thất bại đủ nhiều lần, lần này chắc chắn qua.'});return L;};}
{const _br=btRate;btRate=function(slots){return camNgoFull()?1:_br(slots);};}
// thành công thì xoá cảm ngộ (trước đây không bao giờ xoá, cộng dồn sang cả cảnh giới sau)
{const _bf=btFinish;btFinish=function(){const x=_bf.apply(this,arguments);if(G.run)G.run.btFail=0;return x;};}
{const _pu=phamUp;phamUp=function(){const x=_pu.apply(this,arguments);if(G.run&&!G.run.pham)G.run.btFail=0;return x;};}
