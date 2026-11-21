// ĐỢT 1.4: Danh tiếng theo nơi chốn (khu vực, tông môn). G.run.danh = {'reg:<khu>':{v}, 'sect:<tông>':{v}, trieu:{v}}
const DANH_LO=['tran','thanh','tutran','tuthanh','cho','tong'];
function danhSectIdx(n){if(!n||!n.owner)return -1;return W().sects.findIndex(x=>x.n===n.owner);}
function danhGet(k){const r=G.run;if(!r)return 0;nqInit(r);return (r.danh[k]||{}).v||0;}
function danhPut(k,d){const r=G.run;if(!r||!d)return;nqInit(r);const o=r.danh[k]||(r.danh[k]={v:0});o.v=clamp(o.v+d,-100,100);}
function danhMa(i){const s=W().sects[i];return !!s&&(s.al==='ma'||s.al==='ta');}
// chính tà của việc làm chỉ vang danh khi bị lộ (o.lo=1, hoặc mặc định đang ở nơi đông người)
function danhDeed(id,D,o){const r=G.run;if(!r)return;o=o||{};const n=nodeById(r.at);
  const lo=o.lo===1||(o.lo!==0&&n&&DANH_LO.includes(n.type));if(!lo)return;
  const d=2*(D.p?HD_W[D.p]:0)-2*(D.t?HD_W[D.t]:0);if(!d)return;
  const reg=n&&n.r!=null?n.r:(r.region||0);danhPut('reg:'+reg,d);
  const si=danhSectIdx(n);if(si>=0)danhPut('sect:'+si,danhMa(si)?-d:d);
  dbg('danh.deed',{id,d,reg,si});}
// giá trị danh tiếng của một nút (khu + tông); tông ma/tà nhìn ngược tiếng khu vực
function danhOf(n){if(!n)return 0;const reg=danhGet('reg:'+(n.r!=null?n.r:0));const si=danhSectIdx(n);
  if(si<0)return reg;return clamp((danhMa(si)?-reg:reg)+danhGet('sect:'+si),-100,100);}
function danhName(n){const v=danhOf(n);return contentText('danh.'+(v>=60?0:v>=25?1:v>-25?2:v>-60?3:4));}
{const _dt=dangerTag;dangerTag=function(n){const r=G.run;if(!feat('nq')||!n||!r||!SETTLE.includes(n.type))return _dt.apply(this,arguments);
  const v=danhOf(n);if(n.type==='ancu')return v<=-60?2:(n.state==='ruin'&&n.fog>=2)?1:0;
  if(v<=-60)return 3;if(v<=-25)return 2;return (n.type!=='tong'&&n.state==='ruin'&&n.fog>=2)?1:0;};}
