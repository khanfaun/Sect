// ---------------- ĐỒNG ĐỘI TẠM THỜI ----------------
function addParty(v,days,pow){
  const r=G.run;r.party=r.party||[];if(r.party.length>=2)return null;
  const s=S();const p={id:(r.pid=(r.pid||0)+1),ten:v.ten,icon:v.g==='nu'?'👩':'🧑',hp:Math.round(s.maxHp*(pow||0.6)),pow:pow||0.6,until:W().t+(days||30)*HD,el:'vo',sub:typeof v.realm==='number'?REALM[clamp(v.realm,0,5)]:typeof v.realm==='string'&&v.realm?v.realm:(typeof realmName==='function'?realmName():REALM[r.realm])};
  r.party.push(p);log(contentText("core_12-dong-doi-tam-thoi_js.addParty.001", [v.ten,days||30]));return chip('🤝',v.ten+contentText("core_12-dong-doi-tam-thoi_js.addParty.002"),contentText("core_12-dong-doi-tam-thoi_js.addParty.003")+(days||30)+' ngày','up');
}

// ---------------- NỐI CÁC KIẾP ----------------
function rivalsCoarse(months){
  const w=W();for(const rv of w.rstate){if(!rv.alive)continue;const dy=months/12;rv.age=(rv.age||18)+dy;const wr=w.rivals[rv.i];
    let left=dy;while(left>0&&rv.realm<4){const step=Math.min(left,1);rv.prog+=step*wr.tal*[14,6,2.6,1.2,.5][rv.realm];left-=step;if(rv.prog>=100){rv.realm++;rv.prog=ri(0,15);}}
    if(rv.age>LIFE[rv.realm]*0.95||(rv.age>60&&rv.realm<1)){rv.alive=false;rv.died=tYear(w.t);}}
}
function newRival(i,from){
  const w=W();const s=w.sects[w.rivals[i].s];const g=s.kind==='phat'?'nam':(chance(.5)?'nam':'nu');
  const old=w.rivals[i];const ten=s.kind==='phat'?tangName():genName(g,true);
  const rel=from&&chance(.3)?(chance(.5)?contentText("core_12-dong-doi-tam-thoi_js.newRival.004")+old.ten:contentText("core_12-dong-doi-tam-thoi_js.newRival.005")+old.ten):null;
  const tt={kiem:g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.006"):contentText("core_12-dong-doi-tam-thoi_js.newRival.007"),dan:g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.008"):contentText("core_12-dong-doi-tam-thoi_js.newRival.009"),phat:contentText("core_12-dong-doi-tam-thoi_js.newRival.010"),ma:g==='nam'?'ma tử':contentText("core_12-dong-doi-tam-thoi_js.newRival.011"),am:g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.012"):'âm nữ',the:g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.013"):contentText("core_12-dong-doi-tam-thoi_js.newRival.014"),thu:g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.015"):contentText("core_12-dong-doi-tam-thoi_js.newRival.016")}[s.kind]||(g==='nam'?contentText("core_12-dong-doi-tam-thoi_js.newRival.017"):contentText("core_12-dong-doi-tam-thoi_js.newRival.018"));
  w.rivals[i]={ten,g,s:old.s,tt,el:pick(['kim','moc','thuy','hoa','tho','loi','bang','phong']),tinh:old.tinh,tal:rnd1(0.85+R()*0.55),rel};
  w.rstate[i]={i,realm:0,prog:ri(5,40),alive:true,age:ri(16,20)};
  if(rel)chron(contentText("core_12-dong-doi-tam-thoi_js.newRival.019", [ten,rel]));
}
function afterlife(r,cause,info){
  const w=W();
  // 2. mộ tại điểm đang đứng (chết trên đường: điểm vừa rời)
  let at=r.at;if(r.moving&&r.moving.seg<r.moving.path.length-1)at=r.moving.path[r.moving.seg];
  const n=nodeById(at);
  if(cause!=='phithang'&&n){const items=shuffle(r.relics.slice()).slice(0,2);n.grave={ten:r.ten,tuoi:Math.floor(r.age),realmName:qualName(r.realm,(r.quality||[])[r.realm]||0),t:w.t,items,r:n.r};
    const gs=[];for(const R0 of w.regions)for(const x of R0.nodes)if(x.grave)gs.push(x);gs.sort((a,b)=>a.grave.t-b.grave.t);while(gs.length>12){gs.shift().grave=null;}}
  // 3. sương mù thành ký ức (đã gọi fogToMemory)
  // 4. ân oán còn lại vào legacy
  for(const s of r.seeds)w.legacy.push({t:s.t,ten:s.ten,d:s.d,hn:s.hn,who:r.ten,r:s.r});
  while(w.legacy.length>20)w.legacy.shift();
  w.rstate=r.rivals.map(x=>({i:x.i,realm:x.realm,prog:x.prog,alive:x.alive,age:x.age||18,died:x.died}));
  // kẻ đã giết người chơi
  if(cause==='combat'&&info&&!info.boss&&info.k&&info.k!=='kiep'){const old=w.nemesis&&w.nemesis.n===info.n?w.nemesis.lv:0;w.nemesis={n:info.n,k:info.k,i:info.i,el:info.el,r:r.region,lv:old+1,kiep:r.kiep,who:r.ten};}
  // 5. năm tháng trôi qua
  const yrs=gapRoll(r);G.lastGap=yrs;
  worldGap(yrs); // Đ8.5: khoảng dài thì tua theo thập kỷ (core2/56-luan-hoi.js)
  // 6. thế hệ
  for(let i=0;i<w.rstate.length;i++){if(!w.rstate[i].alive)newRival(i,true);}
  const keep=[];
  for(const L of w.legacy){
    if(L.done){continue;}
    if(L.t==='an'&&chance(.5)){const pool=[];for(const R0 of w.regions.slice(0,Math.max(1,(r.maxRegion||0)+1)))for(const x of R0.nodes)if((isTownT(x.type)||x.type==='tong')&&!x.patron)pool.push(x);
      if(pool.length){const x=pick(pool);x.patron={ten:L.ten,who:L.who,d:L.d,role:x.type==='tong'?contentText("core_12-dong-doi-tam-thoi_js.afterlife.020"):contentText("core_12-dong-doi-tam-thoi_js.afterlife.021")};continue;}}
    if(L.t==='oan'&&chance(.5)){L.feud=1;keep.push(L);continue;}
    if(L.t==='oan'&&!L.feud)continue;
    keep.push(L);
  }
  w.legacy=keep.slice(-20);
  if(w.chron.length>60)w.chron=w.chron.slice(-60);
}
// tin đồn về các kiếp trước
// Bảng RUMOR_KIEP: content/narration/rumor-kiep.js
function rumorKiep(){const L=G.meta.lives.filter(x=>x.hero);if(!L.length)return null;const x=pick(L);return T(RUMOR_KIEP,{a:x.ten,y:x.y||tYear(W().t)-20,v:x.hero,pl:placeName(pick(['nui','thanh','tran']))});}
function shopExtra(items,n){const r=G.run;if(n&&W().ents.some(e=>e.type==='di'&&e.data.k==='daugia'&&e.at===n.id)&&false)items.push({k:'pass',reg:r.region+1,n:contentText("core_12-dong-doi-tam-thoi_js.shopExtra.022")+REG[r.region+1].n,p:price(90)});}

// lưu (được UI gán)
let saveSoon=()=>{};

// ================= SỰ KIỆN 1: GIANG HỒ, PHÀM TRẦN =================
// Nội dung sự kiện: content/events/ (tra ID lao_gia).

// Nội dung sự kiện: content/events/ (tra ID thuong_doan).

// Nội dung sự kiện: content/events/ (tra ID ke_bi_duoi).

// Nội dung sự kiện: content/events/ (tra ID linh_thao).

// Nội dung sự kiện: content/events/ (tra ID thi_the).

// Nội dung sự kiện: content/events/ (tra ID tranh_bao).

// Nội dung sự kiện: content/events/ (tra ID sap_ban).

// Nội dung sự kiện: content/events/ (tra ID thu_con).

// Nội dung sự kiện: content/events/ (tra ID thac_ngo).

// Nội dung sự kiện: content/events/ (tra ID bia_co).

// Nội dung sự kiện: content/events/ (tra ID ao_tran).

// Nội dung sự kiện: content/events/ (tra ID linh_tuyen).

// Nội dung sự kiện: content/events/ (tra ID do_thach).

// Nội dung sự kiện: content/events/ (tra ID hac_diem).

// Nội dung sự kiện: content/events/ (tra ID tra_lau).

// Nội dung sự kiện: content/events/ (tra ID cao_thi).

// Nội dung sự kiện: content/events/ (tra ID xem_tuong).

// Nội dung sự kiện: content/events/ (tra ID an_may).

// Nội dung sự kiện: content/events/ (tra ID tre_ban_hoa).

// Nội dung sự kiện: content/events/ (tra ID kiem_khach).

// Nội dung sự kiện: content/events/ (tra ID hoa_duyen).

// Nội dung sự kiện: content/events/ (tra ID ho_ly).

// Nội dung sự kiện: content/events/ (tra ID co_mo).

// Nội dung sự kiện: content/events/ (tra ID dong_phu_cu).

// Nội dung sự kiện: content/events/ (tra ID bi_canh).

// Nội dung sự kiện: content/events/ (tra ID sao_roi).

// Nội dung sự kiện: content/events/ (tra ID loi_moc).

// Nội dung sự kiện: content/events/ (tra ID bi_cuop).

// Nội dung sự kiện: content/events/ (tra ID lo_dan_no).

// Nội dung sự kiện: content/events/ (tra ID hon_phien).

// Nội dung sự kiện: content/events/ (tra ID nhan_cu).
// Nội dung sự kiện: content/events/ (tra ID nhan_tinh).

// Nội dung sự kiện: content/events/ (tra ID thu_khan).

// Nội dung sự kiện: content/events/ (tra ID tho_san).

// Nội dung sự kiện: content/events/ (tra ID chay_rung).

// Nội dung sự kiện: content/events/ (tra ID khach_diem).

// Nội dung sự kiện: content/events/ (tra ID co_tu).

// Nội dung sự kiện: content/events/ (tra ID son_mon).

// Nội dung sự kiện: content/events/ (tra ID dai_bi).

// Nội dung sự kiện: content/events/ (tra ID dau_gia).

// Nội dung sự kiện: content/events/ (tra ID loi_dai).

// Nội dung sự kiện: content/events/ (tra ID yeu_quai_lang).

// Nội dung sự kiện: content/events/ (tra ID thuy_quy).

// Nội dung sự kiện: content/events/ (tra ID hoa_bi).

// Nội dung sự kiện: content/events/ (tra ID lao_ngu).

// Nội dung sự kiện: content/events/ (tra ID chuong_xac).

// Nội dung sự kiện: content/events/ (tra ID cho_que).

// Nội dung sự kiện: content/events/ (tra ID hoi_den).

// Nội dung sự kiện: content/events/ (tra ID thu_nha).

// Nội dung sự kiện: content/events/ (tra ID xin_lam_do).

// Nội dung sự kiện: content/events/ (tra ID hoa_su).

// Nội dung sự kiện: content/events/ (tra ID tuyet_son).

// Nội dung sự kiện: content/events/ (tra ID ga_quay).
