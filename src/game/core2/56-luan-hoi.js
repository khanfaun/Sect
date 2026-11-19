// ĐỢT 8.5: thời gian luân hồi (3 năm – 5.000 năm) và tua thế giới theo thập kỷ. Bảng LH_KHOANG, LH_CFG: content/rules/luan-hoi.js.
// gapRoll: ba kiếp đầu chỉ khoảng Gần (giữ nguyên phép tung cũ ri(3,30)); sau đó bốn khoảng theo tỉ lệ, chỉnh theo nghiệp chướng và chấp niệm.
function gapRoll(r){if(!r||(r.kiep||1)<=LH_CFG.dau)return ri(3,30);
  const open=(r.seeds||[]).some(s=>s&&(s.t==='oan'||s.t==='duyen'));if(open&&chance(LH_CFG.chap)){dbg('lh.chap',{});return ri(3,30);}
  const nb=typeof ngBacB==='function'?ngBacB(r):0;
  const K=wpick(LH_KHOANG,x=>x.p*(nb>=LH_CFG.ngBac&&LH_CFG.ngMul[x.k]?LH_CFG.ngMul[x.k]:1));const y=ri(K.a,K.b);dbg('lh.gap',{k:K.k,y,nb});return y;}
function gapKhoang(y){return LH_KHOANG.find(x=>y<=x.b)||LH_KHOANG[LH_KHOANG.length-1];}
function gapLoi(y){return gapKhoang(y||0).loi;}
// tua: ngắn thì như cũ (từng tháng); dài thì theo thập kỷ (L6), phần lẻ chạy từng tháng
function worldGap(yrs){const w=W();if(yrs<=LH_CFG.tua){worldCoarse(yrs*12);rivalsCoarse(yrs*12);worldYearsTo(w);}
  else{const D=Math.floor(yrs/10),rem=yrs-D*10;worldDecades(D);if(rem){worldCoarse(rem*12);rivalsCoarse(rem*12);worldYearsTo(w);}}
  worldCoarseEnts();legacyGap(yrs);dbg('lh.tua',{yrs});}
// mỗi thập kỷ: một lần đổi chủ (xác suất), nơi hoang hồi lại, gộp mười năm thế giới (đồng hồ ngắn chỉ chạy năm cuối), thiên kiêu già đi và được thay mỗi lần
function worldDecades(D){const w=W();
  for(let d=0;d<D;d++){w.t+=10*HY;if(chance(LH_CFG.lat))flipNode();nodeRecover();worldYearsTo(w,{gop:1});
    rivalsCoarse(120);for(let i=0;i<w.rstate.length;i++)if(!w.rstate[i].alive)newRival(i,true);}}
// ân oán với người phàm sau khoảng dài: một nửa chuyển sang hậu duệ, còn lại khép; huyết thù rất lâu thành oán hồn (HN B §14.8)
function legacyGap(yrs){const w=W();if(yrs<=LH_CFG.hauTu||!w.legacy)return;
  for(const L of w.legacy){if(L.done)continue;if(L.t!=='an'&&L.t!=='oan')continue;
    if(L.feud&&yrs>LH_CFG.oanHon){L.oanHon=1;continue;}
    if(chance(LH_CFG.hau)){L.ten0=L.ten0||L.ten;L.ten=contentText('lh.hau',[L.ten0]);L.hau=(L.hau||0)+1;}else L.done=1;}}
