// ================= ĐỢT 26: ĐỠ ĐÒN CÓ VÒNG BẤM, CHÍ MẠNG CÓ THANH TRƯỢT =================
// Đang thủ thế mà địch đánh tới: vòng bấm hiện nút "Đỡ" thay cho "Né". Không né nữa mà đỡ: bấm chuẩn thì đỡ thêm 25%,
// bấm khá thêm 10%, không bấm hoặc hụt thì đỡ kém đi 10%. Thủ thế mà địch không đánh thì không hiện gì.
{const _ds26=doSkill;doSkill=function(sc,u,sk,lv,tid,qm){const had=sc.dodge;const res=_ds26(sc,u,sk,lv,tid,qm);const me=mainUnit(sc);if(sc.dodge&&sc.dodge!==had&&!sc.dodge.kiep&&me&&me.st.stance){sc.dodge.blk=1;sc.rev++;}return res;};}
{const _dr26=dodgeResolve;dodgeResolve=function(offs){const sc=G.run&&G.run.scene;const d=sc&&sc.dodge;if(!d||!d.blk)return _dr26(offs);const me=mainUnit(sc);
  const L=(offs||[]).filter(x=>x!=null).map(Math.abs);const a=L.length?Math.min(...L):null;const q=a==null?-0.1:a<=0.09?0.25:a<=0.25?0.1:-0.1;
  me._bq=q;clog(sc,q>=0.25?'Ngươi đón đỡ đúng lúc, hóa giải phần lớn lực đạo.':q>0?'Ngươi kịp giơ tay đỡ đòn.':'Ngươi đỡ chậm nửa nhịp, lực đòn dội thẳng vào người.',q>0?'me':'en');
  try{return _dr26([]);}finally{me._bq=0;}};}
{const _bc26=blockCut;blockCut=function(att,def){const b=_bc26(att,def);return def&&def._bq?clamp(b+def._bq,0.05,0.75):b;};}
// Chí mạng: khi đòn của ngươi gieo trúng chí mạng, thanh trượt chạy qua lại; chạm đúng vùng xanh thì mới chí mạng,
// trượt thì đòn vẫn trúng nhưng không chí mạng. Tự đánh thì máy tự bấm (trúng khoảng 70%).
{const _ds26b=doSkill;doSkill=function(sc,u,sk,lv,tid,qm){if(u&&u._critF!=null)return _ds26b(sc,u,sk,lv,tid,qm);
  if(u&&u.isMain&&u.ctrl==='player'&&sk&&sk.fx&&sk.fx.p&&!sc.kiep&&!sc.critQ){const p=((u.crit||5)+(sk.fx.crit||0))/100;
    if(chance(p)){if((typeof CFG!=='undefined'&&CFG.autoFight)||(G.meta.opt&&G.meta.opt.autoQte)||typeof document==='undefined'){u._critF=chance(.7);try{return _ds26b(sc,u,sk,lv,tid,qm);}finally{u._critF=null;}}
      sc.critQ={id:(sc.cqid=(sc.cqid||0)+1),uid:u.id,sk,lv,tid,qm};sc.rev++;return;}
    u._critF=false;try{return _ds26b(sc,u,sk,lv,tid,qm);}finally{u._critF=null;}}
  return _ds26b(sc,u,sk,lv,tid,qm);};}
function critResolve(ok){const sc=G.run&&G.run.scene;if(!sc||!sc.critQ)return;const c=sc.critQ;sc.critQ=null;const u=U_(sc,c.uid);if(!u){return;}
  runAct(sc,()=>{clog(sc,ok?'Ngươi nhìn ra sơ hở của đối phương!':'Sơ hở thoáng qua, ngươi không kịp nắm lấy.',ok?'me':'fl');u._critF=!!ok;try{doSkill(sc,u,c.sk,c.lv,c.tid,c.qm);}finally{u._critF=null;}});}

// ================= ĐỢT 27: THIÊU ĐỐT TINH HUYẾT, THỌ NGUYÊN, HUYẾT TẾ =================
// Nút "Huyết thuật" trong trận mở bảng chọn:
//  · Thiêu đốt tinh huyết (lần 1): mất 20% khí huyết tối đa từ khí huyết hiện tại (không mất thọ); hồi 60% linh lực, đầy thể lực, giải độc, bỏng, suy yếu.
//  · Thiêu đốt thọ nguyên (chỉ sau khi đã đốt tinh huyết): như "đốt nguyên thần" cũ, mất 20% thọ tối đa (tối thiểu 10 năm), nhiều hơn bản cũ.
//  · Huyết tế (mỗi trận một lần): hiến 20% khí huyết tối đa. Trong trận: công +25%. Khí huyết tối đa thiếu hụt suốt 15 tháng,
//    sau đó mới bắt đầu hồi dần trong 12 tháng. Dùng cho trận pháp, pháp bảo sẽ phát triển sau.
// Mỗi lượt chỉ dùng một huyết thuật.
const HT_P=0.2,HT_HOLD=15,HT_REC=12;
function htPen(){const r=G.run;if(!r||!r.ht||!r.ht.length)return 0;const t=W().t;r.ht=r.ht.filter(x=>t<x.re);let p=0;for(const x of r.ht)p+=x.p*(t<x.rs?1:(x.re-t)/(x.re-x.rs));return Math.min(0.6,p);}
{const _S27=S;S=function(){const s=_S27();const p=htPen();if(p>0)s.maxHp=Math.max(1,Math.round(s.maxHp*(1-p)));return s;};}
function burnOpts(sc){const r=G.run;const u=mainUnit(sc);const L=[];const left=Math.floor(S().life-r.age);
  if(!sc.tinh){const c=Math.round(u.max*0.2);L.push({k:'tinh',n:'Thiêu đốt tinh huyết',d:['Linh lực hồi quá nửa, thể lực sung mãn trở lại','Độc, bỏng, suy yếu đều tan','Không mất lượt, không tổn thọ'],cost:'Đổi lại hao mất một mảng khí huyết đang có',ok:u.hp>c+1,why:'Khí huyết không đủ để đốt'});}
  else if(!sc.tho){const y=Math.max(10,Math.round(LIFE[r.realm]*0.2));L.push({k:'tho',n:'Thiêu đốt thọ nguyên',y,d:['Ba lượt tới, mỗi đòn xuyên qua phòng ngự, hút máu đối thủ','Hết ba lượt, nguyên thần cạn kiệt: suy yếu hai lượt'],cost:'Mất vĩnh viễn '+y+' năm thọ nguyên',ok:left>y+1,why:'Thọ nguyên không đủ'});}
  if(!sc.ht){const c=Math.round(u.max*HT_P);L.push({k:'ht',n:'Huyết tế',d:['Hiến tinh huyết cho sát khí: công lực tăng vọt tới hết trận','Mỗi trận chỉ một lần'],cost:'Căn cơ khí huyết hao tổn hơn một năm, sau đó mới hồi lại dần',ok:u.hp>c+1,why:'Khí huyết không đủ để hiến'});}
  return L;}
function burnInfo(sc){const L=burnOpts(sc);return {done:!L.length,L,label:sc.tinh?'Thiêu đốt thọ nguyên':'Huyết thuật'};}
function playerBurn(k){const sc=G.run.scene;const u=readyPlayer(sc);if(!u||u.burnedTurn||u.dazed)return false;const o=burnOpts(sc).find(x=>x.k===k);if(!o||!o.ok)return false;const r=G.run;u.burnedTurn=1;
  if(k==='tinh'){const c=Math.round(u.max*0.2);u.hp=Math.max(1,u.hp-c);sc.tinh=1;u.mp=Math.min(u.maxMp,u.mp+Math.round(u.maxMp*0.6));u.tl=100;u.st.poison=0;u.st.burn=0;u.st.weak=0;
    clog(sc,`Ngươi thiêu đốt tinh huyết, khí huyết hao đi một mảng. Huyết khí sôi trào: linh lực hồi phục quá nửa, thể lực sung mãn, độc tố tiêu tan.`,'me');log('Thiêu đốt tinh huyết trong trận.');}
  else if(k==='tho'){r.lifeAdj-=o.y;sc.tho=1;u.st.soul=3;clog(sc,`Ngươi thiêu đốt thọ nguyên, tóc mai bạc thêm mấy sợi. Ba lượt tới mỗi đòn xuyên giáp, hút máu.`,'me');log(`Thiêu đốt thọ nguyên trong trận.`);}
  else{const c=Math.round(u.max*HT_P);sc.ht=1;const t=W().t;(r.ht=r.ht||[]).push({p:HT_P,rs:t+HT_HOLD*HM,re:t+(HT_HOLD+HT_REC)*HM});u.max=Math.max(1,u.max-c);u.hp=Math.min(u.hp,u.max);u.atk=Math.round(u.atk*1.25);u.matk=Math.round((u.matk||u.atk)*1.25);
    clog(sc,`Ngươi huyết tế, hiến một phần căn cơ khí huyết. Máu tươi hóa thành sát khí: công lực tăng vọt tới hết trận.`,'me');log('Huyết tế: căn cơ khí huyết hao tổn, hơn một năm sau mới bắt đầu hồi lại.');}
  syncMain(sc);sc.rev=(sc.rev||0)+1;return true;}
// ----- khí vận có tác dụng riêng ngoài chỉ số (bổ sung cho bản Thienmenh): khí vận, giá mua, gia cảnh -----
const TT_EXTRA={dai_khi_van:{van:2},van_khi_nghich_thien:{van:5},mi_cot:{shopP:10},tieu_nhan_bi_oi:{shopP:5},tu_loi_vi_ban:{shopP:5}};
{const _tf27=ttFx;ttFx=function(def){const o=_tf27(def);const x=def&&TT_EXTRA[def.id];if(x)for(const [k,v] of Object.entries(x))o[k]=(o[k]||0)+v;return o;};}
Object.assign(TT_FXN,{van:'Khí vận {v}',shopP:'Mua đồ rẻ {v}%'});
{const _ft27=ttFxText;ttFxText=function(def){const L=_ft27(def);if(def&&def.id==='gia_canh_kha_gia')L.push('Đầu thai mang theo thêm linh thạch');return L;};}
// câu chuyện mở đầu: khí vận nổi bật nhất, gia cảnh khá giả thì có thêm linh thạch
{const _nr27=newRun;newRun=function(c){const res=_nr27(c);const r=G.run;if(!r||!r.story||!r.kv)return res;
  const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;const at=Math.max(1,r.story.length-2);
  if(r.kv.includes('gia_canh_kha_gia')){const v=ri(3,6);r.st+=v;r.story.splice(at,0,'Nhà vẫn còn chút của để dành. Lúc '+nm+' ra đi, trong tay nải có thêm '+v+' viên linh thạch.');}
  const top=r.kv.map(k=>TT_DEST[k]).filter(d=>d&&d.rank>=2&&d.id!=='gia_canh_kha_gia'&&!d.mc&&!d.tr&&!/linh căn|kích hoạt|tự động/i.test(d.description)).sort((a,b)=>b.rank-a.rank)[0];
  if(top){const d=top.description.replace(/\.$/,'');r.story.splice(Math.max(1,r.story.length-2),0,'Người quen ai cũng nói về '+nm+': '+d.charAt(0).toLowerCase()+d.slice(1)+'.');}
  saveSoon();return res;};}

// ================= ĐỢT 28: GỘP MỆNH CÁCH VÀO TIÊN THIÊN KHÍ VẬN =================
// 18 mệnh cách cũ thành khí vận phẩm Hiếm (giữ nguyên tác dụng riêng: thiêu, miễn độc, bế quan, mua rẻ, kết liễu…), đổi tên cho ra dáng khí vận.
// Nhân vật mới không còn mệnh cách riêng; bản lưu cũ vẫn giữ mệnh cách đang có.
const MC_REN={kiemtam:['Kiếm Duyên','Từ nhỏ đã có duyên với kiếm, cầm kiếm như cầm đũa.'],thanluc:['Thiên Sinh Thần Lực','Sinh ra đã khỏe hơn người.'],
 menhcung:['Mệnh Cứng','Số mệnh cứng cỏi, mấy lần cận kề cái chết vẫn sống.'],chithuy:['Tâm Bình Khí Hòa','Lòng dạ bình thản, khó bị ngoại vật lay động.'],
 linhnhan:['Mắt Sáng Hơn Người','Nhìn đâu cũng thấy điều người khác bỏ qua.'],luoi:['Ba Tấc Lưỡi','Ăn nói khéo léo, mua bán ít khi chịu thiệt.'],
 yeuhuyet:['Huyết Mạch Yêu Tộc','Trong máu có chút huyết mạch yêu tộc, vết thương lành rất nhanh.'],thiendo:['Thiên Đố Anh Tài','Thông minh hơn người, nhưng trời ghen nên khó sống lâu.'],
 phuctinh:['Phúc Tinh Cao Chiếu','Sao phúc chiếu mệnh, gặp dữ hóa lành.'],hoalinh:['Mệnh Hỏa Vượng','Sinh vào giờ hỏa vượng, có duyên với lửa.'],
 bangco:['Sinh Nơi Băng Tuyết','Sinh ra giữa mùa băng tuyết, thân thể cứng cỏi, hợp với hàn khí.'],truongtho:['Tướng Thọ','Mang tướng mạo của người sống lâu.'],
 bachdoc:['Bách Độc Bất Xâm','Trời sinh không sợ độc.'],ngodao:['Duyên Ngộ Đạo','Có duyên với đạo, tu luyện nhanh hơn người.'],
 khotu:['Bền Chí Khổ Tu','Chịu được cô quạnh, ngồi yên tu luyện bao lâu cũng được.'],sattinh:['Sát Tinh Chiếu Mệnh','Sát khí nặng, ra tay với kẻ yếu thế không chút nương tay.'],
 mongdu:['Mộng Du Tiên Cảnh','Đêm nào cũng mơ thấy tiên cảnh.'],huyenco:['Kinh Mạch Thông Suốt','Kinh mạch thông suốt, linh lực vận hành trơn tru.']};
for(const t of TRAIT){const m=MC_REN[t.id];if(!m)continue;const id='mc_'+t.id;TT_DEST[id]={id,name:m[0],description:m[1],rank:3,mc:t.id};}
TRAIT.push({id:'none',n:'Không',i:'',fx:{},d:''});
{const _tf28=ttFx;ttFx=function(def){if(def&&def.mc){const t=TRAIT.find(x=>x.id===def.mc);return JSON.parse(JSON.stringify((t&&t.fx)||{}));}return _tf28(def);};}
{const _ft28=ttFxText;ttFxText=function(def){if(def&&def.mc){const t=TRAIT.find(x=>x.id===def.mc);return t?[t.d]:[];}return _ft28(def);};}
// thêm lượt rút khí vận nhờ nâng cấp Thiên mệnh ở Bến Vong Xuyên
{const u=UPG.find(x=>x.id==='menh');if(u){u.n='Thiên mệnh';u.d='Đầu thai rút thêm một tiên thiên khí vận';}}
{const _tr28=ttRoll;ttRoll=function(){const L=_tr28();const all=Object.values(TT_DEST);for(let i=0;i<U('menh');i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(pick(pool).id);}return L;};}
{const _gb28=genBirth;genBirth=function(){_gb28();for(const c of G.birth.cards)c.trait='none';};}
// tính tình (xét thể chất) lấy từ xuất thân và khí vận gốc mệnh cách
{const _tp28=ttPhys;ttPhys=function(r){const keep=r.trait;const mc=(r.kv||[]).map(k=>TT_DEST[k]&&(TT_DEST[k].mc||TT_DEST[k].tr)).filter(Boolean);
  const save={};for(const m of mc){save[m]=1;}const extra=mc.flatMap(m=>TT_TRAITS[m]||[]);const o=TT_TRAITS[r.origin];TT_TRAITS[r.origin]=(o||[]).concat(extra);try{return _tp28(r);}finally{TT_TRAITS[r.origin]=o;if(!o)delete TT_TRAITS[r.origin];}};}
// câu chuyện mở đầu: khí vận gốc mệnh cách kể bằng câu cũ của mệnh cách
{const _nr28=newRun;newRun=function(c){const res=_nr28(c);const r=G.run;if(!r||!r.story||!r.kv)return res;const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;
  let at=Math.min(3,r.story.length-2);for(const k of r.kv){const d=TT_DEST[k];const tk=d&&(d.mc||d.tr);if(tk&&LS_TR[tk]){r.story.splice(at++,0,lsFill(LS_TR[tk],{ten:nm}));}}return res;};}

// bản lưu cũ: nhẫn thứ hai và pháp bảo ở ô chưa mở thì cất về túi
function eqFix(){const r=G.run;if(!r||!r.eq)return;const E=r.eq;const back=k=>{if(E[k]){E[k].seen=1;r.relics.push(E[k]);E[k]=null;}};back('nhan2');PB_SLOTS.forEach((k,j)=>{if(j>=pbOpen())back(k);});}
{const _r228=run2;run2=function(){const r=_r228();if(r&&!r._eq3){r._eq3=1;eqFix();}return r;};}

// ================= ĐỢT 29: GỘP KHÍ VẬN TRÙNG NGHĨA, GIẢM BUFF =================
// Mệnh cách cũ trùng tên hoặc trùng nghĩa với khí vận của Thienmenh: bỏ bản mệnh cách, dồn tác dụng riêng (đã giảm) vào khí vận kia.
// Câu chuyện mở đầu và tính tình (xét thể chất) vẫn dùng câu cũ của mệnh cách đó.
const TT_MERGE={kiemtam:['kiem_phach',{elP:{kim:10}}],chithuy:['tam_nhu_chi_thuy',{tam:2,tammaRes:25}],linhnhan:['thien_ly_nhan',{chkP:6}],
 thiendo:['yeu_menh',{ngo:2,lifeP:-6}],phuctinh:['dai_khi_van',{van:1}],hoalinh:['cuu_duong',{elP:{hoa:10},burnHit:0.08}],
 ngodao:['thien_co_thong_minh',{tvP:8}],sattinh:['sat_phat_qua_duyet',{execute:15}],huyenco:['linh_khi_than_hoa',{mpP:8,mpCost:-8}]};
for(const [mc,[to,fx]] of Object.entries(TT_MERGE)){delete TT_DEST['mc_'+mc];const d=TT_DEST[to];if(!d)continue;d.tr=mc;
  const X=TT_EXTRA[to]||(TT_EXTRA[to]={});for(const [k,v] of Object.entries(fx)){if(k==='elP'){X.elP=X.elP||{};for(const [e,x] of Object.entries(v))X.elP[e]=(X.elP[e]||0)+x;}else X[k]=(X[k]||0)+v;}}
// Yểu Mệnh mang luôn tên Thiên Đố Anh Tài: trời ghen người tài
Object.assign(TT_DEST.yeu_menh,{name:'Thiên Đố Anh Tài',description:'Thông minh hơn người, nhưng trời ghen nên thân thể yếu ớt, khó sống lâu.',rank:2});
// ttFx cộng thêm elP từ TT_EXTRA (bản trước chỉ cộng số)
{const _tf29=ttFx;ttFx=function(def){if(def&&!def.mc&&TT_EXTRA[def.id]&&TT_EXTRA[def.id].elP){const bak=TT_EXTRA[def.id];const {elP,...rest}=bak;TT_EXTRA[def.id]=rest;let o;try{o=_tf29(def);}finally{TT_EXTRA[def.id]=bak;}o.elP=o.elP||{};for(const [e,x] of Object.entries(elP))o.elP[e]=(o.elP[e]||0)+x;return o;}return _tf29(def);};}
Object.assign(TT_FXN,{chkP:'Phép thử {v}%',tammaRes:'Kháng tâm ma {v}%',execute:'Sát thương lên kẻ dưới 30% khí huyết {v}%',burnHit:'Đòn đánh gây thiêu',mpCost:'Linh lực tiêu hao {v}%',bqP:'Hiệu quả bế quan {v}%',regenHp:'Hồi khí huyết mỗi lượt {v}%'});
// Mệnh cách còn lại (không trùng): giảm buff cho cân bằng với khí vận khác cùng phẩm
const MC_NERF={thanluc:[{atkP:8},'Công +8%'],menhcung:[{hpP:10},'Khí huyết +10%'],luoi:[{shopP:12},'Mua đồ rẻ 12%'],yeuhuyet:[{regenHp:2},'Mỗi lượt hồi 2% khí huyết'],
 bangco:[{defP:10,elP:{thuy:8,bang:8}},'Thủ +10%, Thủy và Băng +8%'],truongtho:[{lifeP:12},'Thọ nguyên +12%'],bachdoc:[{poisonImm:1,hpP:3},'Miễn nhiễm độc, khí huyết +3%'],
 khotu:[{bqP:25},'Bế quan hiệu quả hơn 25%'],mongdu:[{tvP:6,tam:1},'Tu vi +6%, đạo tâm +1']};
for(const [id,[fx,d]] of Object.entries(MC_NERF)){const t=TRAIT.find(x=>x.id===id);if(t){t.fx=fx;t.d=d;}}
// các mệnh cách đã gộp: bản lưu cũ còn giữ thì tác dụng cũng giảm theo
for(const [mc,[,fx]] of Object.entries(TT_MERGE)){const t=TRAIT.find(x=>x.id===mc);if(t){t.fx=JSON.parse(JSON.stringify(fx));}}

// ================= ĐỢT 30: YÊU CẦU CẢNH GIỚI CHO MỌI VẬT PHẨM DÙNG ĐƯỢC =================
// Bậc người dùng: 0 Phàm nhân, 1 Luyện Khí, 2 Trúc Cơ, 3 Kết Đan, 4 Nguyên Anh, 5 Hóa Thần, 6 Độ Kiếp.
// Trang bị, pháp bảo, pháp khí tùy thân: phẩm nào cần bậc nấy (phàm phẩm: phàm nhân dùng được; hoàng phẩm: Luyện Khí; huyền phẩm: Trúc Cơ…).
// Công pháp, tâm pháp đã có yêu cầu riêng (cần cảnh giới mới đọc hiểu, từng tầng có cảnh giới mở). Phương tiện đã có yêu cầu riêng ở trạm dịch.
const LV_NAME=['Phàm nhân'].concat(REALM);
function plv(){const r=G.run;if(!r)return 0;return isPham()?0:clamp((r.realm||0)+1,1,6);}
function relReq(rel){if(!rel||rel.k==='book')return 0;return rel.req!=null?rel.req:clamp(rel.tier||0,0,6);}
function relOk(rel){return plv()>=relReq(rel);}
function relWhy(rel){return relOk(rel)?'':'Cần '+LV_NAME[relReq(rel)]+' mới dùng được '+(rel.name||'món này')+'.';}
phamLock=function(rel){return !!rel&&rel.k!=='book'&&!relOk(rel);};
{const _e30=equip;equip=function(i){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return;}return _e30(i);};}
{const _et30=equipTo;equipTo=function(i,s){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return;}return _et30(i,s);};}
{const _dp30=ddPut;ddPut=function(i){const rel=G.run.relics[i];if(rel&&!relOk(rel)){note(relWhy(rel));return false;}return _dp30(i);};}
{const _ea30=eqAuto;eqAuto=function(){const r=G.run;if(!r)return _ea30();const keep=r.relics.filter(x=>!x.seen&&x.k!=='book'&&!relOk(x));keep.forEach(x=>x.seen=1);return _ea30();};}
// đồ đang mặc mà chưa đủ cảnh giới (bản lưu cũ): cất về túi
{const _ef30=eqFix;eqFix=function(){_ef30();const r=G.run;if(!r||!r.eq)return;for(const k in r.eq){const x=r.eq[k];if(x&&!relOk(x)){x.seen=1;r.relics.push(x);r.eq[k]=null;}}
  r.dd=(r.dd||[]).filter(d=>{if(relOk(d.rel))return true;d.rel.seen=1;r.relics.push(d.rel);return false;});};}
{const _r230=run2;run2=function(){const r=_r230();if(r&&!r._eq4){r._eq4=1;eqFix();}return r;};}