// ĐỢT 5.5: rà chéo đợt 5 với Sửa-A..D. Chữ: content/text/nang.json (khoá rc5.*)
// 1) Tặng lễ: phàm nhân không có linh thạch → trả bằng xu (giá linh thạch × TIEN.evXu, như sự kiện phàm), không mua chịu.
function giftXu(n){return giftCost(n)*TIEN.evXu;}
function giftPham(){return isPham()&&feat('tien');}
{const _fg=favGift;favGift=function(n){const r=G.run;if(!r||!giftPham())return _fg.apply(this,arguments);
  const c=giftXu(n);if((r.bac||0)<c)return contentText('tien.khongDu');const st0=r.st||0;r.st=st0+giftCost(n);let why;
  try{why=_fg.apply(this,arguments);}finally{if(G.run)G.run.st=Math.min(G.run.st,st0);}
  if(!why){bacAdd(-c,'tang');dbg('rc5.gift',{n,c});}return why;};}
function giftTxt(n){return giftPham()?fmtBac(giftXu(n)):giftCost(n)+' '+contentText('rc5.lt');}
// 2) Việc buôn có vốn: vốn phải có thật, không lấy tiền mua chịu ở quê làm vốn (trước đây vốn có thể âm khi nợ)
{const _w=ngWhy;ngWhy=function(ma,a,n){const w=_w.apply(this,arguments);if(w)return w;if(a&&a.von&&(G.run.bac||0)<a.von[0])return contentText('tien.khongDu');return '';};}
