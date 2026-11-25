// ================= ĐỊA ĐIỂM CỐ ĐỊNH =================
// Vị trí, loại, quy mô (cụm ô) của mọi địa điểm luôn giống nhau ở mọi thế giới: sinh theo hạt giống cố định DD_HAT,
// vì thành / trấn / tông môn được vẽ thẳng vào ảnh bản đồ (tools/dd-ve-ban-do.py).
// Tên địa điểm, tên tông môn, thiên kiêu, quốc hiệu vẫn ngẫu nhiên theo hạt giống của thế giới.
const DD_HAT=20261125;
function ddTenMoi(w,seed){
  seeded('ten'+seed,()=>{
    // tông môn: giữ hậu tố (Kiếm Tông, Đan Các…), đổi tiền tố
    const doi={},dung=new Set();
    for(const s of w.sects){const L0=(SECT_PRE[s.al]||[]).filter(x=>s.n.startsWith(x+' ')).sort((a,b)=>b.length-a.length)[0];const duoi=L0?s.n.slice(L0.length+1):s.n.split(' ').slice(-2).join(' ');let tien,k=0;
      const L=SECT_PRE[s.al]||NAME.ho2;do{tien=pick(L);}while(dung.has(tien)&&k++<30);dung.add(tien);
      const moi=tien+' '+duoi;doi[s.n]=moi;s.n=moi;}
    for(const R0 of w.regions){const dung2=new Set();
      for(const n of R0.nodes){
        if(n.anchor){dung2.add(n.name);continue;} // nơi neo cốt truyện giữ tên riêng
        if(n.owner&&doi[n.owner]){n.owner=doi[n.owner];n.name=n.owner;}
        else if(doi[n.name])n.name=doi[n.name];
        else{let nm,k=0;do{nm=(NEWT[n.type]&&!PLACE.sfx[n.type])?pick(NAME_PRE)+' '+pick(NEWT[n.type].sfx):placeName(n.type,w);}while(dung2.has(nm)&&k++<30);n.name=nm;}
        dung2.add(n.name);}}
    // thiên kiêu: tên, linh căn, tính tình mới
    const dungT=new Set();
    for(const rv of w.rivals){const s=w.sects[rv.s]||{};let ten,k=0;do{ten=s.kind==='phat'?tangName():genName(rv.g,true);}while(dungT.has(ten)&&k++<20);dungT.add(ten);
      rv.ten=ten;rv.el=pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']);rv.tinh=s.al==='ma'?pick(['hiem','hiem','loi']):pick(['nghia','nghia','loi','hiem']);rv.tal=rnd1(0.85+R()*0.55);}
    const v=genWorld0();w.quoc=v.quoc;
  });
}
let ddBoCuc;
{const _gw=genWorld;ddBoCuc=h=>seeded('dd'+h,()=>_gw(h)); // một bố cục địa điểm hoàn chỉnh theo hạt giống h
 genWorld=function(seed){seed=seed||Math.floor(Math.random()*1e9);
  const w=ddBoCuc(DD_HAT);w.seed=seed;w.ddCoDinh=DD_HAT;ddTenMoi(w,seed);dbg('dd.codinh',{seed,n:w.regions.reduce((s,R0)=>s+R0.nodes.length,0)});return w;};}
// ranh giới quận cũng cố định theo DD_HAT (địa điểm phân theo quận), chỉ tên quận theo thế giới
{const _gf=geoFor;geoFor=function(w){if(!w||!w.ddCoDinh)return _gf(w);if(GEO&&GEO.seed===w.seed&&GEO.dd)return GEO;
  const g=_gf({seed:w.ddCoDinh});const rnd=mul(hashS('quan'+w.seed)),pool=QUAN_N.slice();
  g.dnames=g.dnames.map(x=>{const j=Math.floor(rnd()*pool.length);return (pool.splice(j,1)[0]||x.replace(' Quận',''))+' Quận';});
  g.seed=w.seed;g.dd=1;g.paths={};g.nodeAt=null;return GEO=g;};}
