// Đ8b — Đất đai (phần 2): xây / phá công trình, chủ đất và hậu quả, nơi neo được che chở.
// Mục "Đất đai" (venue datdai, nhóm Việc khác) liệt kê các ô; chọn một việc thì hộp xác nhận ghi rõ hậu quả (o.d) trước khi làm.
// - Công trình tự nhiên: không xây được, phá được. Công trình nhân tạo có pha thì phá được; Sơn môn điện thì không.
// - Đất hoang không chủ: tu sĩ xây được động phủ, trận pháp (giá, giờ trong CONG_TRINH.xay).
// - Ô có chủ (vai NPC / thế lực / dân / tông môn): xây hay phá đều bị phạt theo DAT.phat (thiện cảm, quan hệ thế lực, danh tiếng,
//   có thể bị truy đuổi theo hệ Sửa-K, ở thôn trấn / thành có thể bị quan phủ truy nã).
// - Nơi lõi (LOC_LOI: LOC05, LOC12, LOC15): không phá được công trình cốt lõi. Nơi neo khác: công trình cốt lõi chỉ hư tạm DAT.hu tháng.
VENUE_N.datdai=contentText('dat.n');VENUE_IN.datdai=[contentText('dat.in1'),contentText('dat.in2')];
function datLoai(n){return n.type==='thanh'?'thanh':'tran';}
function datLoi(n){return !!(n&&n.anchor&&typeof LOC_LOI!=='undefined'&&LOC_LOI.includes(n.anchor));}
// hậu quả (bằng chữ) khi động vào ô có chủ; apply=true thì áp luôn và trả về các dòng đã xảy ra
function datPhat(n,c,apply){const chu=c&&c.chu;const L=[];if(!chu||chu.k==='ta')return L;const r=G.run,P=DAT.phat;
  const truyAp=(p,ten)=>{if(!apply||!(R()<p))return;if(typeof truyStart==='function'&&truyStart('cuop',{n:ten,i:'😠',ek:'tantu',d:0}))L.push(contentText('dat.biTruy',[ten]));};
  const faAp=(id,d)=>{if(!id||!d)return;if(apply){r.faQh=r.faQh||{};r.faQh[id]=(r.faQh[id]||0)+d;}};
  if(chu.k==='vai'){const v=vaiNow(chu.id),fa=VAI_NP[chu.id]&&VAI_NP[chu.id].fa,ten=datChuTen(chu);
    if(!apply){L.push(contentText('dat.hFav',[ten]));if(fa)L.push(contentText('dat.hFa',[THE_LUC[fa].n]));L.push(contentText('dat.hTruy',[ten]));return L;}
    if(v&&v.song){favAdd(v.ten,P.vai.fav,'dat');if(typeof gapNguoi==='function')gapNguoi(v.ten,'noi');}faAp(fa,P.vai.fa);truyAp(P.vai.truy,ten);return L;}
  if(chu.k==='fa'){const ten=datChuTen(chu);if(!apply){L.push(contentText('dat.hFa',[ten]));L.push(contentText('dat.hTruy',[contentText('dat.nguoiCua',[ten])]));return L;}
    faAp(chu.id,P.fa.fa);truyAp(P.fa.truy,contentText('dat.nguoiCua',[ten]));return L;}
  if(chu.k==='tong'){if(!apply){L.push(contentText('dat.hTong',[datChuTen(chu)]));L.push(contentText('dat.hTruy',[contentText('dat.deTu',[datChuTen(chu)])]));return L;}
    const si=typeof danhSectIdx==='function'?danhSectIdx(n):-1;if(si>=0)danhPut('sect:'+si,P.tong.danh);truyAp(P.tong.truy,contentText('dat.deTu',[datChuTen(chu)]));return L;}
  // đất của dân ở thôn trấn / thành: tiếng xấu cả khu, có thể bị truy nã
  const k=datLoai(n),D=P.dan;
  if(!apply){L.push(contentText(k==='thanh'?'dat.hDanThanh':'dat.hDan'));L.push(contentText('dat.hNa'));return L;}
  const reg='reg:'+(n.r!=null?n.r:(r.region||0));danhPut(reg,D.danh[k]);
  if(R()<D.na[k]){const cur=danhGet(reg);if(cur>D.naDanh)danhPut(reg,D.naDanh-cur);
    if(typeof truyStart==='function')truyStart('quan',{n:contentText('dat.quanTen'),i:'👮',ek:'sontac',d:0});L.push(contentText('dat.biNa'));dbg('dat.truyNa',{id:n.id});}
  return L;}
function datHauText(n,c,cuaCt){const H=[];if(cuaCt&&cuaCt.hau)H.push(cuaCt.hau);H.push(...datPhat(n,c,false));return H.join('\n');}
// các lựa chọn trong mục Đất đai
function datOpts(n){const d=datOf(n);if(!d)return [];const r=G.run,t=W().t,L=[];
  d.o.forEach((c,i)=>{const C=datCt(c),chuT=datChuTen(c.chu);
    if(C){if(!C.pha)return;const loi=c.goc&&datLoi(n),hu=c.hu>t,tam=c.goc&&n.anchor&&!loi;
      L.push({id:'pha:'+i,l:contentText('dat.oPha',[i+1,C.n,chuT]),
        d:contentText(tam?'dat.dPhaTam':'dat.dPha',[C.n,chuT,DAT.hu])+'\n'+datHauText(n,c,tam?null:C),h:C.pha.h,st:0,g:{txt:contentText('dat.gPha')},
        no:loi?contentText('dat.loiKhoa'):hu?contentText('dat.dangHu'):''});return;}
    for(const id in CONG_TRINH){const X=CONG_TRINH[id].xay;if(!X||!X.noi.includes(n.type))continue;
      if(id==='dong_phu'&&(n.dp||d.o.some(z=>z.ct==='dong_phu')))continue;
      if(L.some(o=>o.xct===id))continue; // mỗi loại chỉ gợi ý trên ô trống đầu tiên
      const no=X.tu&&isPham()?contentText('dat.canTu'):(r.st||0)<X.st?contentText('dat.thieuLt'):'';
      L.push({id:'xay:'+i+':'+id,xct:id,l:contentText('dat.oXay',[i+1,CONG_TRINH[id].n,chuT]),
        d:contentText('dat.dXay',[CONG_TRINH[id].n,chuT])+(c.chu?'\n'+datPhat(n,c,false).join('\n'):''),h:X.h,st:X.st,g:{txt:contentText('dat.gXay')},no});}});
  if(!L.length)L.push({id:'xem',l:contentText('dat.xem'),d:datView(n).map(v=>contentText('dat.dong',[v.i+1,v.ten,v.chuTen])).join('\n'),h:0,st:0,g:{},no:''});
  return L;}
{const _vo=venueOpts;venueOpts=function(n,v){if(v==='datdai')return datOpts(n);return _vo.apply(this,arguments);};}
{const _vd=venueDo;venueDo=function(v,id){if(v==='datdai')return datDo(id);return _vd.apply(this,arguments);};}
function datDo(id){const r=G.run,sc=r&&r.scene;if(!sc||sc.type!=='place')return false;const n=nodeById(sc.id);
  const o=datOpts(n).find(x=>x.id===id);if(!o||o.no||o.id==='xem')return false;const p=id.split(':');const i=+p[1];
  const res=p[0]==='pha'?datPha(n,i):datXay(n,i,p[2]);if(!res)return false;
  if(G.run&&G.run.scene===sc){sc.msg=res.msg;sc.chips=res.ch||[];sc.venue=null;sc.seq=(sc.seq||0)+1;}
  saveSoon();return true;}
// phá công trình ở ô i (trả {msg,ch} hoặc null)
function datPha(n,i){const d=datOf(n);const c=d&&d.o[i];const C=datCt(c);if(!C||!C.pha)return null;const t0=W().t;
  if(c.goc&&datLoi(n)){dbg('dat.chan',{id:n.id,ct:c.ct});return null;}if(c.hu>t0)return null;
  advanceTime(C.pha.h);if(!G.run)return {msg:[]};
  const tam=c.goc&&n.anchor;const ct=c.ct;
  if(tam){c.hu=W().t+DAT.hu*HM;}else{c.ct=null;d.pha[ct]=(d.pha[ct]||0)+1;if(C.dp)n.dp=0;
    if(C.tu){c.cu=ct;c.moc=W().t+(DAT.moc[0]+R()*(DAT.moc[1]-DAT.moc[0]))*HY;}} // Sửa-O câu 76: tự nhiên thì mọc lại
  const P=datPhat(n,c,true);
  dbg('dat.pha',{id:n.id,i,ct,tam:tam?1:0,chu:c.chu?c.chu.k:''});
  const msg=[contentText(tam?'dat.xongPhaTam':'dat.xongPha',[C.n])].concat(P);log(msg[0]);
  return {msg,ch:[chip('⏳',durH(C.pha.h),contentText('dat.gPha'),'')]};}
// xây công trình ct trên ô trống i
function datXay(n,i,ct){const d=datOf(n);const c=d&&d.o[i];const C=CONG_TRINH[ct],X=C&&C.xay;const r=G.run;
  if(!c||c.ct||!X||!X.noi.includes(n.type))return null;if(X.tu&&isPham())return null;if((r.st||0)<X.st)return null;
  r.st-=X.st;advanceTime(X.h);if(!G.run)return {msg:[]};
  c.ct=ct;c.goc=0;delete c.cu;delete c.moc;if(C.dp)n.dp=1;const P=datPhat(n,c,true);if(!c.chu)c.chu={k:'ta'};
  dbg('dat.xay',{id:n.id,i,ct,st:X.st});
  const msg=[contentText('dat.xongXay',[C.n])].concat(P);log(msg[0]);
  return {msg,ch:[chip('💎','−'+X.st,contentText('dat.gXay'),'dn'),chip('⏳',durH(X.h),contentText('dat.gXay'),'')]};}
// nơi lõi: hư tạm cũng không có; nơi neo: công trình cốt lõi hư xong thì dựng lại (đọc c.hu, không cần dọn)

// ---------- để sẵn cho mua nhà / đất (chưa mở) ----------
// Người chơi sở hữu ô: chu={k:'ta'}. Ô của mình thì xây / phá không bị phạt (datPhat bỏ qua k:'ta').
// Sau này: datMua(n,i) trả giá cho chủ (vai / thế lực / dân) rồi datSoHuu; xây trên ô mình được mọi công trình có xay
// (thêm loại nơi vào CONG_TRINH[x].xay.noi, hoặc cờ xay.cuaTa cho quán, tiệm…). Bán lại: datSoHuu(n,i,null).
function datSoHuu(n,i,chu){const d=datOf(n);const c=d&&d.o[i];if(!c)return false;c.chu=chu===undefined?{k:'ta'}:chu;dbg('dat.soHuu',{id:n.id,i,k:c.chu?c.chu.k:''});return true;}
function datCuaTa(){const D=datStore()||{},L=[];for(const id in D)(D[id].o||[]).forEach((c,i)=>{if(c.chu&&c.chu.k==='ta')L.push({node:+id,i,ct:c.ct});});return L;}
function datMua(){return false;} // chưa mở: mua bán đất làm ở đợt sau
