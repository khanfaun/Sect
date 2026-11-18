// ================= ĐỢT 24: CÁC LOẠI THIÊN KIẾP =================
// Cảnh giới quyết định có bao nhiêu kiếp; loại kiếp tùy nhân vật (linh căn, nhân quả). Các kiếp tới lần lượt, từng trận một.
//  Trúc Cơ: không có · Kết Đan: tâm ma · Nguyên Anh: kiếp riêng 6 đạo · Hóa Thần: kiếp riêng 9 đạo rồi tâm ma
//  Phi thăng: Tam Tai (Âm Hỏa, Bị Phong) rồi Cửu Trùng Lôi Kiếp (9 đợt, mỗi đợt 4 đạo, đợt sau mạnh hơn đợt trước).
// Mỗi loại thử một mặt khác nhau:
//  Thiên Lôi: sát thương thuần · Tử Tiêu Thần Lôi (linh căn Lôi): mạnh hơn 10%
//  Ngũ Hành Thần Lôi (tạp linh căn): mỗi đạo mang một hành, kèm ngẫu nhiên hiệu ứng của các kiếp khác
//  Âm Hỏa: đốt khí huyết từng lượt · Nghiệp Hỏa (nhân quả ác nặng): đốt mạnh hơn, mỗi đạo thêm tâm ma
//  Bị Phong: gió cắt rút thể lực, khó thủ thế đỡ đòn · Âm Hàn: rút linh lực
// Bảng KIEP: content/rules/kiep.js
// Bảng KIEP_EL: content/rules/kiep-el.js
function kiepKind(){const r=G.run;if(feat('nq')?ngB(r)>=15:(r.karma||0)<=-30)return 'nghiep';if(r.root.els.includes('loi'))return 'tutieu';if(r.root.els.length>=5)return 'nguhanh';return KIEP_EL[r.root.els[0]]||'loi';}
btStages=function(to){if(isPham())return [];const k=kiepKind();
  return to===1?[]:to===2?['tamma']:to===3?[{n:6,kind:k}]:to===4?[{n:9,kind:k},'tamma']:[{n:6,kind:'hoa'},{n:6,kind:'phong'},{n:4,waves:9,kind:'cuu'}];};
function stageName(x){if(x==='tamma')return contentText("core2_12-dot-24-cac-loai_js.stageName.001");const K=KIEP[x.kind||'loi'];return K.n+' · '+(x.waves>1?x.waves+contentText("core2_12-dot-24-cac-loai_js.stageName.002")+x.n+' đạo':x.n+' đạo');}
btNextStage=function(){const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,contentText("core2_12-dot-24-cac-loai_js.003"),'en');return;}
  const n=Math.max(1,st.n-(b.kiepCut||0));startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp,kind:st.kind||'loi'}},{kind:'bt'});};
{const _sc24=startCombat;startCombat=function(spec,after){const res=_sc24(spec,after);const sc=G.run&&G.run.scene;
  if(spec&&spec.kiep&&sc&&sc.kiep){const kd=spec.kiep.kind||'loi';const K=KIEP[kd];sc.kiep.kind=kd;sc.en.n=K.n;sc.en.i=K.i;sc.en.el=K.el;const u=sc.units.find(x=>x.kind==='kiep');if(u){u.icon=K.i;u.el=K.el;u.kk=kd;u.name=K.n;}
    sc.log=sc.log.filter(x=>!/^Mây kiếp vần vũ/.test(x.t));clog(sc,K.n+': '+K.d+' '+capS(numVi(sc.kiep.n))+' '+K.u.toLowerCase()+(sc.kiep.waves>1?contentText("core2_12-dot-24-cac-loai_js.004")+numVi(sc.kiep.waves)+' đợt,':'')+contentText("core2_12-dot-24-cac-loai_js.005"),'en');}
  return res;};}
{const _kh24=kiepHit;kiepHit=function(sc,k,off){const K=sc.kiep;const kd=K&&K.kind||'loi';const me=mainUnit(sc);const KD=KIEP[kd];
  let m=KD.m||1;if(kd==='cuu')m*=1.1+0.12*(K.wave-1);K.uy*=m;const n0=sc.log.length;_kh24(sc,k,off);
  const last=sc.log[sc.log.length-1];if(last&&sc.log.length>n0&&KD.u!==contentText("core2_12-dot-24-cac-loai_js.006"))last.t=last.t.replace(/^Đạo lôi/,KD.u);
  if(me.hp<=0)return;let fx=kd;if(kd==='nguhanh'){const e=pick(['kim','moc','thuy','hoa','tho']);fx=pick(['hoa','phong','am',null]);if(last)last.t=last.t.replace(KD.u,KD.u+' hệ '+EL[e].n);}
  if(fx==='hoa'||fx==='nghiep'){const b=Math.round(me.max*(fx==='nghiep'?0.036:0.028));me.st.burn=(me.st.burn||0)+b;clog(sc,contentText("core2_12-dot-24-cac-loai_js.007"),'en');if(fx==='nghiep'){G.run.tamma=Math.min(100,(G.run.tamma||0)+2);}}
  if(fx==='phong'){me.tl=Math.max(0,(me.tl||0)-35);clog(sc,contentText("core2_12-dot-24-cac-loai_js.008"),'en');}
  if(fx==='am'){const v=Math.round(me.maxMp*0.25);me.mp=Math.max(0,me.mp-v);if(v)clog(sc,contentText("core2_12-dot-24-cac-loai_js.009"),'en');}};}

// ================= ĐỢT 25: TIÊN THIÊN KHÍ VẬN, TIÊN THIÊN THỂ CHẤT =================
// ----- dữ liệu chép từ khanfaun/Thienmenh (physiques.ts, effects.ts) -----
// Bảng TT_PHYS: content/characters/tt-phys.js
// Bảng TT_DEST: content/characters/tt-dest.js
// Khí vận tiên thiên: mỗi kiếp rút 1–3 cái lúc đầu thai, phẩm càng cao càng hiếm.
// Khí vận có hành (Cửu Dương, Nhược Thủy, Canh Kim…) kéo linh căn về hành đó; một số ép linh căn thành biến dị (Lôi, Băng, Phong)
// hoặc Cực linh căn (đủ ngũ hành, tương sinh); Ngũ Hành Khuyết Mộc thì không cảm được Mộc khí.
// Thể chất tiên thiên: suy ra từ linh căn (tỉ lệ hành), khí vận, nhân quả (chính tà) và tính tình (theo xuất thân, mệnh cách), lấy tối đa ba cái phẩm cao nhất,
// không khớp gì thì là Phàm Thể. Tất cả đều cộng vào chỉ số.
delete TT_DEST.vo_can; // không có linh căn thì không tu được: bỏ
// Bảng TT_RW: content/rules/tt-rw.js
// Bảng TT_RANK, TT_COL: content/rules/tt-rank.js
function ttRoll(){const n=wpick([1,2,3],x=>[40,45,15][x-1]);const L=[];const all=Object.values(TT_DEST);
  for(let i=0;i<n;i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(pick(pool).id);}return L;}
// Bảng TT_FORCE: content/rules/tt-force.js
ROOT.push({id:'cuc',n:contentText("core2_12-dot-24-cac-loai_js.012"),m:1.5,w:0,k:5,d:contentText("core2_12-dot-24-cac-loai_js.013")});
function ttShape(root,ids){const els=root.els.slice();let id=root.id;
  for(const k of ids){if(TT_FORCE[k])return {id:'bien',els:[TT_FORCE[k]]};}
  if(ids.some(k=>k==='hon_nguyen_dao'||k==='ngu_hanh_hop_nhat'))return {id:'cuc',els:NGUHANH.slice()};
  if(id==='bien')return root;
  for(const k of ids){const nb=(TT_DEST[k].effects||{}).nguHanhBonus;if(!nb)continue;
    for(const [e,v] of Object.entries(nb)){if(e==='all'||v<=0||els.includes(e))continue;if(v>=2||chance(.5)){const out=els.filter(x=>!ids.some(q=>((TT_DEST[q].effects||{}).nguHanhBonus||{})[x]>0));if(out.length)els[els.indexOf(pick(out))]=e;}}}
  if(ids.includes('ngu_hanh_khuyet_moc')&&els.includes('moc')){if(els.length>=5){els.splice(els.indexOf('moc'),1);id='tu';}else{const o=NGUHANH.filter(x=>!els.includes(x));els[els.indexOf('moc')]=pick(o);}}
  return {id,els};}
{const _gb25=genBirth;genBirth=function(){_gb25();for(const c of G.birth.cards){c.kv=ttRoll(c.root&&c.root.els);c.root=ttShape(c.root,c.kv);
  for(const k of c.kv){const a=(TT_DEST[k].effects||{}).amDuongBonus;if(a)c.karmaAdj=(c.karmaAdj||0)+Math.round(((a.chinh||0)-(a.ta||0))/2);}}};}
// tính tình theo xuất thân và mệnh cách (Thienmenh xét thể chất theo tính tình)
// Bảng TT_TRAITS: content/characters/tt-traits.js
function ttPhys(r){const els=r.root.els.filter(e=>NGUHANH.includes(e));const pct=e=>els.includes(e)?Math.round(100/Math.max(1,els.length)):0;const D=r.kv||[];const has=k=>D.includes(k);
  const T=(TT_TRAITS[r.origin]||[]).concat(TT_TRAITS[r.trait]||[]);const hasT=t=>T.includes(t);const anyT=L=>L.some(hasT);
  const k=r.karma||0;let pureR,pureE,neutral;if(feat('nq')){if(!r.hd||!(r.hd.log||[]).length)nqFromLegacy(r,r.karma||0);const L=hdLvIdx(r);pureR=L<=1;pureE=L>=3;neutral=L===2;}else{pureR=k>=40;pureE=k<=-40;neutral=Math.abs(k)<20;}const lc=r.root.id==='cuc'?contentText("core2_12-dot-24-cac-loai_js.ttPhys.014"):r.root.id==='thien'?contentText("core2_12-dot-24-cac-loai_js.ttPhys.015"):'';
  const evil=[contentText("core2_12-dot-24-cac-loai_js.ttPhys.016"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.017"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.018"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.019"),'Vị kỷ',contentText("core2_12-dot-24-cac-loai_js.ttPhys.020")],wild=[contentText("core2_12-dot-24-cac-loai_js.ttPhys.021"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.022"),'Tự do'];const bal5=els.length===5;
  const C={hon_don_the:bal5&&lc===contentText("core2_12-dot-24-cac-loai_js.ttPhys.023")&&neutral&&(has('ngu_hanh_hop_nhat')||(has('hon_nguyen_dao')&&D.some(q=>q!=='hon_nguyen_dao'&&TT_DEST[q].rank>=5))),hoang_co_thanh_the:pct('tho')>=80&&(has('son_ha_xa_tac')||has('da_day_hon_sat'))&&pureR&&!anyT(evil),
   van_co_ma_the:pureE&&(has('sat_phat_qua_duyet')||has('dao_ma_chuyen_the'))&&anyT(evil),tien_thien_dao_thai:!!lc&&has('dai_tri_nhuoc_ngu')&&!pureE,
   cuu_khieu_linh_lung:(has('thien_co_thong_minh')||has('thien_ly_nhan'))&&anyT([contentText("core2_12-dot-24-cac-loai_js.ttPhys.024"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.025"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.026")]),
   thuong_thien_ba_the:(pct('tho')>=60||pct('kim')>=60)&&!pureR&&(anyT(wild)||has('cuong_vong_tu_dai')),thai_duong_the:pct('hoa')>=80&&has('cuu_duong')&&!hasT(contentText("core2_12-dot-24-cac-loai_js.ttPhys.027")),
   thai_am_the:pct('thuy')>=80&&has('nhuoc_thuy'),thien_yeu_the:(pct('moc')>=60||has('huyen_anh_phong_than'))&&anyT(wild),loi_dinh_chien_the:has('loi_dinh_ba')&&anyT(wild.concat([contentText("core2_12-dot-24-cac-loai_js.ttPhys.028"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.029")])),
   hu_khong_chi_the:has('huyen_anh_phong_than')&&hasT('Tự do'),duoc_linh_thanh_the:pct('moc')+pct('hoa')>=60&&(has('duoc_linh_the')||has('chu_tuoc_phan_thien')||r.origin==='duoc'),
   ngu_hanh_linh_the:bal5,vo_cau_kiem_the:pct('kim')>=60&&has('kiem_khi_truong_giang'),huyet_sat_ma_the:pct('thuy')>=40&&k<-60&&anyT([contentText("core2_12-dot-24-cac-loai_js.ttPhys.030"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.031"),contentText("core2_12-dot-24-cac-loai_js.ttPhys.032")]),
   bang_co_ngoc_cot:has('bang_tam_ngoc_cot')&&hasT(contentText("core2_12-dot-24-cac-loai_js.ttPhys.033")),tat_phong_linh_the:pct('moc')>=40&&pct('thuy')>=20&&has(contentText("core2_12-dot-24-cac-loai_js.ttPhys.034")),cuu_duong_chi_the:pct('hoa')>=60&&has('cuu_duong'),
   huyen_am_chi_the:pct('thuy')>=60&&has('nhuoc_thuy'),kim_cuong_bat_hoai:pct('kim')>=50&&pct('tho')>=50,kim_linh_the:pct('kim')>=70,moc_linh_chi_the:pct('moc')>=70,thuy_linh_the:pct('thuy')>=70,
   hoa_linh_the:pct('hoa')>=70,tho_linh_the:pct('tho')>=70,am_sat_the:k<=-50&&hasT(contentText("core2_12-dot-24-cac-loai_js.ttPhys.035")),cuong_chien_the:hasT(contentText("core2_12-dot-24-cac-loai_js.ttPhys.036"))||(hasT(contentText("core2_12-dot-24-cac-loai_js.ttPhys.037"))&&['vo_si','sat_phat_qua_duyet','huyet_ma','cuong_vong_tu_dai','than_the_khoe_manh'].some(has)),man_luc_the:has('than_the_khoe_manh'),
   thong_tue_the:has('tinh_than_minh_man'),kien_nhan_the:has('khi_luc_doi_dao'),linh_cam_the:has('thien_ly_nhan'),truong_tho_the:has('thien_menh_chi_tu')||pct('moc')>=50};
  const L=TT_PHYS.filter(p=>C[p.id]).sort((a,b)=>b.rank-a.rank).slice(0,3).map(p=>p.id);return L.length?L:['pham_the'];}
function ttPhysOf(id){return TT_PHYS.find(p=>p.id===id);}
// đổi hiệu ứng của Thienmenh sang chỉ số của game này
// Bảng TT_MAP: content/characters/tt-map.js
// Bảng TT_ELD: content/characters/tt-eld.js
function ttFx(def){const o={};if(!def)return o;const E=def.effects||{};const add=(k,v)=>{if(!v)return;o[k]=(o[k]||0)+v;};
  for(const grp of [E.attributeChangePercent,E.primaryStatChangePercent])for(const [k,v] of Object.entries(grp||{})){if(TT_ELD[k]){o.elP=o.elP||{};o.elP[TT_ELD[k]]=(o.elP[TT_ELD[k]]||0)+v;continue;}const m=TT_MAP[k];if(!m)continue;
    let x=v*m[1];x=['tp','ngo','tam','than','hoTam','drain','regenHp'].includes(m[0])?Math.sign(x)*Math.max(1,Math.round(Math.abs(x))):Math.round(x);add(m[0],x);}
  const ex=(E.expPerTurn||0)+(def.expPerTurn||0)*3;if(ex)add('tvP',ex);return o;}
// Bảng TT_FXN: content/characters/tt-fxn.js
function ttFxText(def){const o=ttFx(def);const L=[];for(const [k,v] of Object.entries(o)){if(k==='elP'){for(const [e,x] of Object.entries(v))L.push(contentText("core2_12-dot-24-cac-loai_js.ttFxText.038")+EL[e].n+' '+(x>0?'+':'')+x+'%');continue;}if(TT_FXN[k])L.push(TT_FXN[k].replace('{v}',(v>0?'+':'')+v));}
  const E=def.effects||{};if(E.nguHanhBonus)L.push(contentText("core2_12-dot-24-cac-loai_js.ttFxText.039")+Object.keys(E.nguHanhBonus).map(e=>e==='all'?contentText("core2_12-dot-24-cac-loai_js.ttFxText.040"):(EL[e]||{n:e}).n).join(', ')+(Object.values(E.nguHanhBonus).some(v=>v<0)?contentText("core2_12-dot-24-cac-loai_js.ttFxText.041"):''));
  if(TT_FORCE[def.id])L.push(contentText("core2_12-dot-24-cac-loai_js.ttFxText.042")+EL[TT_FORCE[def.id]].n+contentText("core2_12-dot-24-cac-loai_js.ttFxText.043"));if(def.id==='hon_nguyen_dao'||def.id==='ngu_hanh_hop_nhat')L.push(contentText("core2_12-dot-24-cac-loai_js.ttFxText.044"));
  if(E.amDuongBonus){const d=Math.round(((E.amDuongBonus.chinh||0)-(E.amDuongBonus.ta||0))/2);if(d)L.push(contentText("core2_12-dot-24-cac-loai_js.ttFxText.045")+(d>0?'+':'')+d);}return L;}
{const _ag25=aggFx;aggFx=function(){const fx=_ag25();const r=G.run;if(!r)return fx;const add=src=>{for(const [k,v] of Object.entries(src)){if(k==='elP'){fx.elP=fx.elP||{};for(const [e,x] of Object.entries(v))fx.elP[e]=(fx.elP[e]||0)+x;}else fx[k]=(fx[k]||0)+v;}};
  for(const k of r.kv||[])add(ttFx(TT_DEST[k]));for(const k of r.the||[])add(ttFx(ttPhysOf(k)));return fx;};}
{const _nr25=newRun;newRun=function(c){const res=_nr25(c);const r=G.run;if(r){r.kv=(c.kv||[]).slice();r.karma=clamp((r.karma||0)+(c.karmaAdj||0),-100,100);r.the=ttPhys(r);const s=S();r.hp=s.maxHp;r.mp=s.maxMp;}return res;};}
// câu chuyện mở đầu: nhắc tới thể chất nổi bật (từ phẩm Hiếm trở lên)
{const _nr25b=newRun;newRun=function(c){const res=_nr25b(c);const r=G.run;if(r&&r.story&&r.the){const p=ttPhysOf(r.the[0]);if(p&&p.rank>=3){const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;
  r.story.splice(Math.max(1,r.story.length-2),0,contentText("core2_12-dot-24-cac-loai_js.046")+nm+contentText("core2_12-dot-24-cac-loai_js.047")+p.name+'…” '+(p.story||p.description));}}return res;};}
