// Bộ trang bị (bản đầu): một số trang bị mặc trên người thuộc một "bộ"; mặc đủ 2 / 4 món cùng bộ thì được thêm hiệu ứng.
// Trang bị mới sinh có khả năng thuộc một bộ (rel.bo = id). Bản lưu cũ: đồ không có rel.bo thì không thuộc bộ nào.
// Sau này làm lại nội dung bộ thì sửa BO_TB (tên, hiệu ứng) và BO_TL (tỉ lệ rơi đồ có bộ).
const BO_TB={
  thanhphong:{n:'Bộ Thanh Phong',el:'phong',h:{2:{atkP:8},4:{dodge:10,tp:4}}},
  huyengiap: {n:'Bộ Huyền Giáp', el:'tho',  h:{2:{defP:10},4:{hpP:12,hoTam:6}}},
  linhtuyen: {n:'Bộ Linh Tuyền', el:'thuy', h:{2:{mpP:10},4:{tvP:8,tam:4}}},
  xichdiem:  {n:'Bộ Xích Diễm',  el:'hoa',  h:{2:{crit:5},4:{critDmg:25,matkP:8}}},
};
const BO_TL=0.3;
// ô trang bị trên người (không tính pháp bảo, pháp khí tùy thân)
function boOSlot(rel){return SLOTS.some(([k])=>k===slotOf(rel));}
{const _gr=genRelic;genRelic=function(){const x=_gr.apply(this,arguments);try{if(x&&!x.bo&&boOSlot(x)&&chance(BO_TL)){const L=Object.keys(BO_TB);x.bo=pick(L);dbg('bo.sinh',{n:x.name,bo:x.bo});}}catch(e){}return x;};}
// đếm số món mỗi bộ đang mặc
function boDem(){const r=G.run;if(!r)return {};const E=eqOf(),c={};for(const k in E){const x=E[k];if(x&&x.bo&&BO_TB[x.bo])c[x.bo]=(c[x.bo]||0)+1;}return c;}
// danh sách bộ đang có ít nhất một món mặc: {id,n,co,muc:[{can,fx,on}]}
function boView(){const c=boDem();return Object.keys(c).map(id=>{const B=BO_TB[id];return {id,n:B.n,co:c[id],tong:4,muc:Object.keys(B.h).map(Number).sort((a,b)=>a-b).map(can=>({can,fx:B.h[can],on:c[id]>=can}))};});}
{const _agB=aggFx;aggFx=function(){const fx=_agB.apply(this,arguments);try{for(const b of boView())for(const m of b.muc)if(m.on)for(const k in m.fx)fx[k]=(fx[k]||0)+m.fx[k];}catch(e){}return fx;};}
// ---- tổng hợp chỉ số trang bị cho (bằng chữ: tăng nhẹ / vừa / mạnh, giảm …) ----
const TB_PCT=['atkP','matkP','defP','hpP','mpP','tvP','lifeP','critDmg','drain','shopP'];
function tbMuc(k,v){const a=Math.abs(v),pc=TB_PCT.includes(k)||/P$/.test(k);const [n1,n2]=pc?[8,20]:[4,10];
  const w=a<n1?'nhẹ':a<n2?'vừa':'mạnh';return (v>0?'Tăng ':'Giảm ')+w;}
function tbTen(k){const L=(typeof TT_FXN!=='undefined'&&TT_FXN[k])||(typeof FX_N!=='undefined'&&FX_N[k]);if(!L)return null;return L.replace(/\s*[+−-]?\{v\}%?/,'').replace(/\s+thêm$/,'').trim();}
// cộng fx của mọi thứ đang mang (trang bị, pháp bảo, pháp khí, đồ uẩn dưỡng) + hiệu ứng bộ
function tbTongHop(){const r=G.run;if(!r)return [];const E=eqOf(),fx={};const add=f=>{if(!f)return;for(const k in f)if(typeof f[k]==='number')fx[k]=(fx[k]||0)+f[k];};
  for(const k in E)if(E[k])add(relicFx(E[k]));for(const d of r.dd||[])if(d&&d.rel)add(relicFx(d.rel));
  for(const b of boView())for(const m of b.muc)if(m.on)add(m.fx);
  return Object.keys(fx).filter(k=>Math.abs(fx[k])>=0.5&&tbTen(k)).map(k=>({k,n:tbTen(k),v:fx[k],t:tbMuc(k,fx[k]),tang:fx[k]>0}));}
