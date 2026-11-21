// ---------------- NGUY HIỂM ĐỘNG Ở NƠI CÓ NGƯỜI (chỉ thế giới mới, w.v2; bảng NHD: content/rules/nguy-hiem-dong.js) ----------------
// Thành trấn có thế lực nắm: cơ bản an toàn. Có người mạnh hơn ngươi ≥1 cảnh giới: hơi nguy hiểm.
// Thế lực nắm nơi đó có địch ý (đang truy nã ngươi ở đó, hoặc chính tà trái nhau): nguy hiểm.
// Có địch ý và có người mạnh hơn ≥2 cảnh giới: tử địa. Giữ mức cũ nếu mức cũ cao hơn.
function nhdMe(r){r=r||G.run;return r.pham?-1:(r.realm||0);}
function nhdManh(n){const v=NHD.manh[n.type];return v==null?null:v;}
// phe của nơi: 'chinh' | 'ta' | null (tông môn theo bảng sects; thành tu sĩ theo chủ n.fa là tông môn)
function nhdPhe(n){let tong=null;if(n.type==='tong')tong=n;else if(n.fa&&String(n.fa).startsWith('tong:'))tong=nodeById(+String(n.fa).slice(5));
  if(tong){const s=W().sects.find(x=>x.n===tong.owner);const al=s&&s.al;return al==='ma'||al==='ta'?'ta':al==='chinh'?'chinh':null;}
  return n.fa&&NHD.faTa.includes(n.fa)?'ta':null;}
// địch ý: 0 không, 1 có, 2 nặng
function nhdDich(n){const r=G.run;let d=0;
  if(typeof tnaOn==='function'&&tnaOn()){try{const m=Math.max(tnaMuc(tnaK(n)),tnaMuc(tnaQ(n)));if(m>=NHD.tnaNang)d=2;else if(m>=1)d=1;}catch(e){}}
  const p=nhdPhe(n),k=r.karma||0;
  if(p==='chinh'&&k<=-NHD.karma||p==='ta'&&k>=NHD.karma)d=Math.max(d,k<=-NHD.karmaNang||k>=NHD.karmaNang?2:1);
  return d;}
function nhdLv(n){const r=G.run;if(!r||!n||!W()||!W().v2||!SETTLE.includes(n.type)||n.state==='ruin')return null;
  const m=nhdManh(n);const gap=m==null?0:m-nhdMe(r);const d=nhdDich(n);
  const lv=d&&gap>=2?3:d?2:gap>=1?1:0;return {lv,gap,d};}
{const _dt=dangerTag;dangerTag=function(n){const v=_dt.apply(this,arguments);const o=nhdLv(n);return o?Math.max(v,o.lv):v;};}
{const _dw=dangerWhy;dangerWhy=function(n){const o=nhdLv(n);if(!o||o.lv===0||dangerTag(n)!==o.lv)return _dw.apply(this,arguments);
  return contentText(o.lv===3?'nhd.tuDia':o.lv===2?'nhd.dich':'nhd.manh');};}
