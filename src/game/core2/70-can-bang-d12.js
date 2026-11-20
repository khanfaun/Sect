// ================= Đ12: ÁP SỐ ĐỘ KHÓ BAN ĐẦU (HN B §4.2) =================
// Bảng BT_BASE, BT_CAP: content/rules/bt-base.js · D12_BQ, D12_LL, D12_EN: content/rules/can-bang-d12.js
// 1) Trần tỉ lệ đột phá: bọc ngoài cùng (sau Cảm ngộ ở core2/19) nên phải chừa Cảm ngộ đầy — khi đó vẫn chắc chắn qua.
{const _br70=btRate;btRate=function(slots){const p=_br70(slots);if(camNgoFull())return p;return Math.min(BT_CAP,p);};}
// 2) Tu vi bế quan ×D12_BQ
{const _bq70=bqReal;bqReal=function(){return _bq70.apply(this,arguments)*D12_BQ;};}
// 3) Lịch luyện nhận được ×D12_LL (chỉ phần cộng)
{const _la70=llAdd;llAdd=function(x,why,quiet){return _la70(x>0?x*D12_LL:x,why,quiet);};}
// 4) Kẻ địch mạnh hơn ×D12_EN (tâm ma dựng từ chỉ số người chơi nên giữ nguyên)
function d12Foe(e){if(!e)return e;for(const k of ['hp','max','atk','def'])if(typeof e[k]==='number')e[k]=Math.round(e[k]*D12_EN);dbg('d12.foe',{n:e.n,hp:e.hp,atk:e.atk,def:e.def});return e;}
{const _me70=mkEnemy;mkEnemy=function(spec){const e=_me70.apply(this,arguments);if(spec&&spec.k==='tamma')return e;return d12Foe(e);};}
{const _mb70=mkBoss;mkBoss=function(){return d12Foe(_mb70.apply(this,arguments));};}
