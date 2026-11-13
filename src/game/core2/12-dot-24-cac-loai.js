// ================= ĐỢT 24: CÁC LOẠI THIÊN KIẾP =================
// Cảnh giới quyết định có bao nhiêu kiếp; loại kiếp tùy nhân vật (linh căn, nhân quả). Các kiếp tới lần lượt, từng trận một.
//  Trúc Cơ: không có · Kết Đan: tâm ma · Nguyên Anh: kiếp riêng 6 đạo · Hóa Thần: kiếp riêng 9 đạo rồi tâm ma
//  Phi thăng: Tam Tai (Âm Hỏa, Bị Phong) rồi Cửu Trùng Lôi Kiếp (9 đợt, mỗi đợt 4 đạo, đợt sau mạnh hơn đợt trước).
// Mỗi loại thử một mặt khác nhau:
//  Thiên Lôi: sát thương thuần · Tử Tiêu Thần Lôi (linh căn Lôi): mạnh hơn 10%
//  Ngũ Hành Thần Lôi (tạp linh căn): mỗi đạo mang một hành, kèm ngẫu nhiên hiệu ứng của các kiếp khác
//  Âm Hỏa: đốt khí huyết từng lượt · Nghiệp Hỏa (nhân quả ác nặng): đốt mạnh hơn, mỗi đạo thêm tâm ma
//  Bị Phong: gió cắt rút thể lực, khó thủ thế đỡ đòn · Âm Hàn: rút linh lực
const KIEP={loi:{n:'Thiên Lôi Kiếp',u:'Đạo lôi',i:'🌩️',el:'loi',d:'Sấm sét thuần túy, chỉ đỡ được, không né được.'},
 tutieu:{n:'Tử Tiêu Thần Lôi Kiếp',u:'Đạo tử lôi',i:'🌩️',el:'loi',m:1.1,d:'Lôi tím của người mang linh căn Lôi: mạnh hơn lôi thường 10%.'},
 nguhanh:{n:'Ngũ Hành Thần Lôi Kiếp',u:'Đạo ngũ hành lôi',i:'🌈',el:'loi',m:0.92,d:'Mỗi đạo mang một hành, kèm ngẫu nhiên lửa đốt, gió cắt hoặc hàn khí.'},
 hoa:{n:'Âm Hỏa Kiếp',u:'Luồng âm hỏa',i:'🔥',el:'hoa',m:0.75,d:'Lửa bốc từ lòng bàn chân, sát thương nhẹ hơn nhưng thiêu đốt khí huyết từng lượt.'},
 nghiep:{n:'Nghiệp Hỏa Kiếp',u:'Luồng nghiệp hỏa',i:'🔥',el:'hoa',m:0.75,d:'Lửa của sát nghiệp: thiêu đốt dữ dội, mỗi đạo thêm tâm ma.'},
 phong:{n:'Bị Phong Kiếp',u:'Cơn cương phong',i:'🌪️',el:'phong',m:0.97,d:'Gió cắt thổi từ thóp đầu, rút thể lực, khó thủ thế đỡ đòn.'},
 am:{n:'Âm Hàn Kiếp',u:'Luồng âm hàn',i:'❄️',el:'bang',m:0.97,d:'Hàn khí thấu xương, rút linh lực.'},
 cuu:{n:'Cửu Trùng Lôi Kiếp',u:'Đạo lôi',i:'⚡',el:'loi',d:'Chín đợt lôi kiếp, đợt sau mạnh hơn đợt trước. Giữa các đợt hồi lại được một hơi.'}};
const KIEP_EL={kim:'hoa',moc:'phong',thuy:'am',hoa:'am',tho:'loi',bang:'hoa',phong:'phong',loi:'tutieu'};
function kiepKind(){const r=G.run;if((r.karma||0)<=-30)return 'nghiep';if(r.root.els.includes('loi'))return 'tutieu';if(r.root.els.length>=5)return 'nguhanh';return KIEP_EL[r.root.els[0]]||'loi';}
btStages=function(to){if(isPham())return [];const k=kiepKind();
  return to===1?[]:to===2?['tamma']:to===3?[{n:6,kind:k}]:to===4?[{n:9,kind:k},'tamma']:[{n:6,kind:'hoa'},{n:6,kind:'phong'},{n:4,waves:9,kind:'cuu'}];};
function stageName(x){if(x==='tamma')return 'Tâm ma kiếp';const K=KIEP[x.kind||'loi'];return K.n+' · '+(x.waves>1?x.waves+' đợt × '+x.n+' đạo':x.n+' đạo');}
btNextStage=function(){const r=G.run;const b=r.bt;if(!b)return;const st=b.stages[b.si];
  if(st==='tamma'){startCombat({k:'tamma'},{kind:'bt'});r.scene.noFlee=1;clog(r.scene,'Tâm ma kiếp: bóng tối trong lòng ngươi đứng dậy.','en');return;}
  const n=Math.max(1,st.n-(b.kiepCut||0));startCombat({kiep:{n,waves:st.waves||1,block:b.kiepHp,kind:st.kind||'loi'}},{kind:'bt'});};
{const _sc24=startCombat;startCombat=function(spec,after){const res=_sc24(spec,after);const sc=G.run&&G.run.scene;
  if(spec&&spec.kiep&&sc&&sc.kiep){const kd=spec.kiep.kind||'loi';const K=KIEP[kd];sc.kiep.kind=kd;sc.en.n=K.n;sc.en.i=K.i;sc.en.el=K.el;const u=sc.units.find(x=>x.kind==='kiep');if(u){u.icon=K.i;u.el=K.el;u.kk=kd;u.name=K.n;}
    sc.log=sc.log.filter(x=>!/^Mây kiếp vần vũ/.test(x.t));clog(sc,K.n+': '+K.d+' '+capS(numVi(sc.kiep.n))+' '+K.u.toLowerCase()+(sc.kiep.waves>1?', chia làm '+numVi(sc.kiep.waves)+' đợt,':'')+' sắp giáng xuống.','en');}
  return res;};}
{const _kh24=kiepHit;kiepHit=function(sc,k,off){const K=sc.kiep;const kd=K&&K.kind||'loi';const me=mainUnit(sc);const KD=KIEP[kd];
  let m=KD.m||1;if(kd==='cuu')m*=1.1+0.12*(K.wave-1);K.uy*=m;const n0=sc.log.length;_kh24(sc,k,off);
  const last=sc.log[sc.log.length-1];if(last&&sc.log.length>n0&&KD.u!=='Đạo lôi')last.t=last.t.replace(/^Đạo lôi/,KD.u);
  if(me.hp<=0)return;let fx=kd;if(kd==='nguhanh'){const e=pick(['kim','moc','thuy','hoa','tho']);fx=pick(['hoa','phong','am',null]);if(last)last.t=last.t.replace(KD.u,KD.u+' hệ '+EL[e].n);}
  if(fx==='hoa'||fx==='nghiep'){const b=Math.round(me.max*(fx==='nghiep'?0.036:0.028));me.st.burn=(me.st.burn||0)+b;clog(sc,'Lửa bám vào người: mỗi lượt thiêu thêm.','en');if(fx==='nghiep'){G.run.tamma=Math.min(100,(G.run.tamma||0)+2);}}
  if(fx==='phong'){me.tl=Math.max(0,(me.tl||0)-35);clog(sc,'Cương phong cắt da, thể lực tụt mạnh.','en');}
  if(fx==='am'){const v=Math.round(me.maxMp*0.25);me.mp=Math.max(0,me.mp-v);if(v)clog(sc,'Hàn khí đông cứng kinh mạch, linh lực bị rút mất một mảng.','en');}};}

// ================= ĐỢT 25: TIÊN THIÊN KHÍ VẬN, TIÊN THIÊN THỂ CHẤT =================
// ----- dữ liệu chép từ khanfaun/Thienmenh (physiques.ts, effects.ts) -----
const TT_PHYS=[] = [
    // === RANK 6: CHÍ TÔN (Supreme) ===
    {
        id: 'hon_don_the',
        name: 'Hỗn Độn Đạo Thể',
        rank: 6,
        description: 'Vạn cổ đệ nhất thể chất. Dung nạp vạn vật, chuyển hóa ngũ hành, phá vỡ mọi quy tắc. Cần có đại cơ duyên "Hỗn Nguyên Đạo" để dung hợp ngũ hành tạp loạn thành hỗn độn chi lực.',
        effects: {
            primaryStatChangePercent: { maxHp: 20, maxSpiritPower: 20, maxStamina: 20, maxMentalState: 15, lifespan: 15 },
            attributeChangePercent: { physicalStrength: 20, magicPower: 20, physicalBody: 20, agility: 15, spiritualSense: 20, aptitude: 20, critChance: 10, critDamage: 20, damageReduction: 10, armorPen: 10, evasion: 10, critResist: 10 },
            expPerTurn: 20
        }
    },
    {
        id: 'hoang_co_thanh_the',
        name: 'Hoang Cổ Thánh Thể',
        rank: 6,
        description: 'Thể chất cái thế của Nhân tộc, nhục thân vô địch, máu huyết vàng ròng. Khắc chế mọi tà ma ngoại đạo, vạn pháp bất xâm. Yêu cầu tâm tính quang minh chính đại.',
        effects: {
            primaryStatChangePercent: { maxHp: 25, maxStamina: 20 },
            attributeChangePercent: { physicalBody: 25, physicalStrength: 20, critDamage: 15, damageReduction: 15, critResist: 15 },
            expPerTurn: 5 // Tốn tài nguyên
        }
    },
    {
        id: 'tien_thien_dao_thai',
        name: 'Tiên Thiên Đạo Thai',
        rank: 6,
        description: 'Con cưng của đại đạo, sinh ra đã hòa hợp với thiên địa. Ngộ tính nghịch thiên, tu luyện pháp thuật như uống nước. Tâm cảnh luôn ở trạng thái "Minh Kính Chỉ Thủy".',
        effects: {
            primaryStatChangePercent: { maxSpiritPower: 25, maxMentalState: 20 },
            attributeChangePercent: { magicPower: 20, spiritualSense: 25, aptitude: 25, msRegen: 15, mpRegen: 15 },
            expPerTurn: 25
        }
    },
    {
        id: 'van_co_ma_the',
        name: 'Vạn Cổ Ma Thể',
        rank: 6,
        description: 'Thể chất cấm kỵ của Ma Đạo. Lấy oán khí làm thức ăn, lấy sát lục làm đường tu. Tâm tính vặn vẹo, tàn nhẫn nhưng sức mạnh hủy thiên diệt địa.',
        effects: {
            attributeChangePercent: { physicalStrength: 25, magicPower: 15, critChance: 15, critDamage: 30, physicalBody: -10, lifeSteal: 10, armorPen: 10 },
            primaryStatChangePercent: { maxMentalState: -15 }
        }
    },
    {
        id: 'cuu_khieu_linh_lung',
        name: 'Cửu Khiếu Linh Lung Thể',
        rank: 6,
        description: 'Trái tim có chín lỗ, thấu hiểu vạn vật, nhìn thấu hồng trần. Trí tuệ siêu phàm, có khả năng suy diễn thiên cơ.',
        effects: {
            attributeChangePercent: { spiritualSense: 30, accuracy: 15, aptitude: 25 },
            primaryStatChangePercent: { maxMentalState: 25 }
        }
    },

    // === RANK 5: CỰC PHẨM (Legendary) ===
    {
        id: 'thuong_thien_ba_the',
        name: 'Thương Thiên Bá Thể',
        rank: 5,
        description: 'Bá đạo vô song, lấy chiến nuôi chiến. Tính cách cuồng ngạo, không chịu khuất phục.',
        effects: {
            attributeChangePercent: { physicalStrength: 12, physicalBody: 12, critChance: 8, armorPen: 8, damageReduction: 5 },
            primaryStatChangePercent: { maxHp: 15 }
        }
    },
    {
        id: 'thai_duong_the',
        name: 'Thái Dương Thần Thể',
        rank: 5,
        description: 'Chí dương chí cương, như mặt trời ban trưa. Yêu cầu Hỏa linh căn cực thịnh và tâm tính hướng dương.',
        effects: {
            attributeChangePercent: { magicPower: 12, physicalStrength: 8, dmgFire: 15, resFire: 15 },
            primaryStatChangePercent: { maxSpiritPower: 15 }
        }
    },
    {
        id: 'thai_am_the',
        name: 'Thái Âm Ngọc Thể',
        rank: 5,
        description: 'Chí âm chí hàn, như trăng lạnh lẽo. Yêu cầu Thủy linh căn cực thịnh và tâm tính lãnh đạm.',
        effects: {
            attributeChangePercent: { magicPower: 12, spiritualSense: 10, dmgWater: 15, resWater: 15 },
            primaryStatChangePercent: { maxSpiritPower: 15 }
        }
    },
    {
        id: 'thien_yeu_the',
        name: 'Thiên Yêu Hoàng Thể',
        rank: 5,
        description: 'Thể chất của Yêu tộc hoàng giả. Tốc độ và sức mạnh kinh người, thường xuất hiện ở người có tính cách hoang dã.',
        effects: {
            attributeChangePercent: { agility: 12, physicalBody: 10, attackSpeed: 10, evasion: 10, hpRegen: 10 },
            primaryStatChangePercent: { maxHp: 15, maxStamina: 15 }
        }
    },
    {
        id: 'loi_dinh_chien_the',
        name: 'Lôi Đình Chiến Thể',
        rank: 5,
        description: 'Thân thể như lôi điện, bộc phát sức mạnh hủy diệt trong nháy mắt. Cần có dị linh căn Lôi.',
        effects: {
            attributeChangePercent: { physicalStrength: 12, magicPower: 8, critDamage: 15, attackSpeed: 10, dmgLightning: 15, resLightning: 15 }
        }
    },
    {
        id: 'hu_khong_chi_the',
        name: 'Hư Không Chi Thể',
        rank: 5,
        description: 'Hòa mình vào hư không, xuất quỷ nhập thần. Cần tâm tính tự do, không bị trói buộc.',
        effects: {
            attributeChangePercent: { agility: 15, spiritualSense: 10, evasion: 15 },
            primaryStatChangePercent: { maxStamina: -8 }
        }
    },
    {
        id: 'duoc_linh_thanh_the',
        name: 'Dược Linh Thánh Thể',
        rank: 5,
        description: 'Cơ thể là lò luyện đan sống, bách độc bất xâm, hấp thu đan dược không để lại tạp chất.',
        effects: {
            primaryStatChangePercent: { maxHp: 15, lifespan: 15 },
            attributeChangePercent: { physicalBody: 10, hpRegen: 15, resWood: 15 },
            expPerTurn: 10
        }
    },

    // === RANK 4: THƯỢNG PHẨM (Epic) ===
    {
        id: 'ngu_hanh_linh_the',
        name: 'Ngũ Hành Linh Thể',
        rank: 4,
        description: 'Ngũ hành cân bằng, sinh sinh bất tức. Tuy không bá đạo nhưng đường tu vững chắc.',
        effects: {
            attributeChangePercent: { aptitude: 8, magicPower: 6 },
            expPerTurn: 10
        }
    },
    {
        id: 'vo_cau_kiem_the',
        name: 'Vô Cấu Kiếm Thể',
        rank: 4,
        description: 'Trời sinh kiếm cốt, tâm như kiếm sắc. Sát thương kiếm pháp tăng mạnh.',
        effects: {
            attributeChangePercent: { physicalStrength: 8, critDamage: 8, attackSpeed: 5, armorPen: 6 }
        }
    },
    {
        id: 'huyet_sat_ma_the',
        name: 'Huyết Sát Ma Thể',
        rank: 4,
        description: 'Thích giết chóc, lấy máu nuôi thân. Càng giết nhiều sát khí càng nặng.',
        effects: {
            attributeChangePercent: { physicalStrength: 6, critChance: 5, lifeSteal: 5 },
            primaryStatChangePercent: { maxMentalState: -5 } // Dễ tẩu hỏa
        }
    },
    {
        id: 'bang_co_ngoc_cot',
        name: 'Băng Cơ Ngọc Cốt',
        rank: 4,
        description: 'Da như băng tuyết, xương như ngọc. Kháng hàn, tăng cường thần thức.',
        effects: {
            attributeChangePercent: { physicalBody: 6, spiritualSense: 8, resIce: 10, dmgIce: 8 }
        }
    },
    {
        id: 'tat_phong_linh_the',
        name: 'Tật Phong Linh Thể',
        rank: 4,
        description: 'Thân nhẹ như gió, đi lại vô hình. Tốc độ là sở trường tuyệt đối.',
        effects: {
            attributeChangePercent: { agility: 10, attackSpeed: 5, evasion: 5, dmgWind: 8 }
        }
    },
    {
        id: 'cuu_duong_chi_the',
        name: 'Cửu Dương Chi Thể',
        rank: 4,
        description: 'Dương khí dồi dào, khắc chế âm tà, tu luyện hỏa pháp cực nhanh.',
        effects: {
            attributeChangePercent: { magicPower: 8, physicalStrength: 5, dmgFire: 8, resFire: 8 }
        }
    },
    {
        id: 'huyen_am_chi_the',
        name: 'Huyền Âm Chi Thể',
        rank: 4,
        description: 'Âm khí cực thịnh, thích hợp làm lô đỉnh hoặc tu luyện mị thuật, âm công.',
        effects: {
            attributeChangePercent: { magicPower: 8, spiritualSense: 5, dmgWater: 8, resWater: 8 }
        }
    },

    // === RANK 3: TRUNG PHẨM (Rare) ===
    {
        id: 'kim_cuong_bat_hoai',
        name: 'Kim Cương Bất Hoại',
        rank: 3,
        description: 'Thân thể cứng như kim cương, đao thương bất nhập ở mức độ nhất định.',
        effects: { attributeChangePercent: { physicalBody: 5, damageReduction: 4, counterDamage: 4 } }
    },
    {
        id: 'moc_linh_chi_the',
        name: 'Mộc Linh Chi Thể',
        rank: 3,
        description: 'Thân thiện với cây cỏ, hồi phục sinh lực nhanh.',
        effects: { primaryStatChangePercent: { maxHp: 5 }, attributeChangePercent: { physicalBody: 4 } }
    },
    {
        id: 'am_sat_the',
        name: 'Ám Sát Thể',
        rank: 3,
        description: 'Thích hợp đi trong bóng tối, giỏi che giấu khí tức.',
        effects: { attributeChangePercent: { agility: 5, critChance: 4 } }
    },
    {
        id: 'cuong_chien_the',
        name: 'Cuồng Chiến Thể',
        rank: 3,
        description: 'Càng đánh càng hăng, máu càng ít đánh càng đau. Tính cách nóng nảy.',
        effects: { attributeChangePercent: { physicalStrength: 5, physicalBody: 4 } }
    },
    {
        id: 'tho_linh_the',
        name: 'Thổ Linh Chi Thể',
        rank: 3,
        description: 'Sức chịu đựng cao, chân đạp đất thì sức mạnh vô cùng.',
        effects: { primaryStatChangePercent: { maxStamina: 5 }, attributeChangePercent: { physicalBody: 5 } }
    },
    {
        id: 'thuy_linh_the',
        name: 'Thủy Linh Chi Thể',
        rank: 3,
        description: 'Linh lực dẻo dai, bền bỉ, thiên về công pháp hệ Thủy.',
        effects: { primaryStatChangePercent: { maxSpiritPower: 5 }, attributeChangePercent: { magicPower: 4 } }
    },
    {
        id: 'hoa_linh_the',
        name: 'Hỏa Linh Chi Thể',
        rank: 3,
        description: 'Sức công phá mạnh, thiên về công pháp hệ Hỏa.',
        effects: { attributeChangePercent: { magicPower: 5, critChance: 3 } }
    },
    {
        id: 'kim_linh_the',
        name: 'Kim Linh Chi Thể',
        rank: 3,
        description: 'Thân thể cứng cáp, thiên về công pháp hệ Kim.',
        effects: { attributeChangePercent: { physicalStrength: 4, physicalBody: 4 } }
    },

    // === RANK 2: HẠ PHẨM (Uncommon) ===
    {
        id: 'man_luc_the',
        name: 'Man Hoang Lực Thể',
        rank: 2,
        description: 'Sức mạnh cơ bắp hơn người thường một chút.',
        effects: { attributeChangePercent: { physicalStrength: 3 } }
    },
    {
        id: 'thong_tue_the',
        name: 'Thông Tuệ Thể',
        rank: 2,
        description: 'Đầu óc linh hoạt, học tập nhanh hơn.',
        effects: { attributeChangePercent: { aptitude: 3 } }
    },
    {
        id: 'kien_nhan_the',
        name: 'Kiên Nhan Thể',
        rank: 2,
        description: 'Sức chịu đựng dẻo dai, không dễ bỏ cuộc.',
        effects: { primaryStatChangePercent: { maxStamina: 3, maxMentalState: 3 } }
    },
    {
        id: 'linh_cam_the',
        name: 'Linh Cảm Thể',
        rank: 2,
        description: 'Giác quan nhạy bén hơn người thường.',
        effects: { attributeChangePercent: { spiritualSense: 3 } }
    },
    {
        id: 'truong_tho_the',
        name: 'Trường Thọ Thể',
        rank: 2,
        description: 'Sống lâu hơn người thường, ít bệnh tật.',
        effects: { primaryStatChangePercent: { lifespan: 3, maxHp: 3 } }
    },

    // === RANK 1: PHÀM PHẨM (Common) ===
    {
        id: 'pham_the',
        name: 'Phàm Thể',
        rank: 1,
        description: 'Thân thể người thường, cân bằng, không có gì đặc sắc.',
        effects: {
            attributeChangePercent: { physicalStrength: 1, magicPower: 1, physicalBody: 1, agility: 1, spiritualSense: 1, aptitude: 1 }
        }
    }
];
const TT_DEST={
    // --- RANK 1 (White) ---
    'than_the_khoe_manh': { id: 'than_the_khoe_manh', name: 'Thân Thể Khỏe Mạnh', description: 'Bẩm sinh khỏe mạnh hơn người thường.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxHp: 2 }, attributeChangePercent: { physicalBody: 1 } } },
    'tinh_than_minh_man': { id: 'tinh_than_minh_man', name: 'Tinh Thần Minh Mẫn', description: 'Đầu óc lanh lợi, thần hồn sáng suốt.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxMentalState: 2 }, attributeChangePercent: { spiritualSense: 1 } } },
    'khi_luc_doi_dao': { id: 'khi_luc_doi_dao', name: 'Khí Lực Dồi Dào', description: 'Thể lực bẩm sinh tốt.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxStamina: 2 }, attributeChangePercent: { agility: 1 } } },
    'gia_canh_kha_gia': { id: 'gia_canh_kha_gia', name: 'Gia Cảnh Khá Giả', description: 'Xuất thân từ gia đình giàu có.', rank: 1, cost: 10 },
    'ke_ngoc': { id: 'ke_ngoc', name: 'Kẻ Ngốc', description: 'Tư chất kém nhưng bù lại thân thể tráng kiện.', rank: 1, cost: 10, effects: { attributeChangePercent: { aptitude: -1, physicalBody: 2 } } },
    'yeu_menh': { id: 'yeu_menh', name: 'Yểu Mệnh', description: 'Sinh ra đã yếu ớt, tuổi thọ ngắn ngủi nhưng ngộ tính khá cao.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { lifespan: -5, maxHp: -2 }, attributeChangePercent: { aptitude: 2 } } },
    'mu_mau': { id: 'mu_mau', name: 'Mù Màu', description: 'Khó phân biệt màu sắc, nhưng tai rất thính.', rank: 1, cost: 10, effects: { attributeChangePercent: { spiritualSense: -1, accuracy: 2 } } },
    'tay_chan_long_ngong': { id: 'tay_chan_long_ngong', name: 'Tay Chân Lóng Ngóng', description: 'Vụng về, thân pháp kém.', rank: 1, cost: 10, effects: { attributeChangePercent: { agility: -1 } } },
    'so_do_cao': { id: 'so_do_cao', name: 'Sợ Độ Cao', description: 'Không dám bay cao, ảnh hưởng tâm cảnh khi phi hành.', rank: 1, cost: 10, effects: { primaryStatChangePercent: { maxMentalState: -2 } } },
    'ngu_hanh_khuyet_moc': { id: 'ngu_hanh_khuyet_moc', name: 'Ngũ Hành Khuyết Mộc', description: 'Thiên sinh không thể cảm nhận Mộc khí.', rank: 1, cost: 10, effects: { nguHanhBonus: { moc: -1 } } },
    'vo_can': { id: 'vo_can', name: 'Vô Căn', description: 'Không có linh căn, con đường tu tiên vô cùng gian nan.', rank: 1, cost: 10, effects: { attributeChangePercent: { aptitude: -3, magicPower: -3 } } },
    // NEW ALIGNMENT DESTINIES (Rank 1)
    'thien_luong_chi_nhan': { id: 'thien_luong_chi_nhan', name: 'Thiện Lương Chi Nhân', description: 'Bản tính hiền lành, ít khi làm điều ác.', rank: 1, cost: 10, effects: { amDuongBonus: { chinh: 5 } } },
    'tieu_nhan_bi_oi': { id: 'tieu_nhan_bi_oi', name: 'Tiểu Nhân Bỉ Ổi', description: 'Lòng dạ hẹp hòi, hay tính toán chi li.', rank: 1, cost: 10, effects: { amDuongBonus: { ta: 5 } } },

    // --- RANK 2 (Green) ---
    'sat_phat_qua_duyet': { id: 'sat_phat_qua_duyet', name: 'Sát Phạt Quả Quyết', description: 'Ra tay tàn nhẫn, có duyên với sát đạo.', rank: 2, cost: 20, effects: { attributeChangePercent: { physicalStrength: 3, critChance: 1 } } },
    'linh_khi_than_hoa': { id: 'linh_khi_than_hoa', name: 'Linh Khí Thân Hòa', description: 'Thân thể dễ dàng tương thích và hấp thụ linh khí.', rank: 2, cost: 20, effects: { primaryStatChangePercent: { maxSpiritPower: 3 }, attributeChangePercent: { magicPower: 2 } } },
    'thien_co_thong_minh': { id: 'thien_co_thong_minh', name: 'Thiên Tư Thông Minh', description: 'Tư chất hơn người, học nhanh.', rank: 2, cost: 20, expPerTurn: 1, effects: { attributeChangePercent: { aptitude: 3 } } },
    'da_day_hon_sat': { id: 'da_day_hon_sat', name: 'Da Dày Hơn Sắt', description: 'Thân thể cứng cáp.', rank: 2, cost: 20, effects: { attributeChangePercent: { physicalBody: 3 } } },
    'benh_tat_quan_than': { id: 'benh_tat_quan_than', name: 'Bệnh Tật Quấn Thân', description: 'Thân thể yếu đuối nhưng thần hồn mạnh mẽ.', rank: 2, cost: 20, effects: { primaryStatChangePercent: { maxHp: -3 }, attributeChangePercent: { spiritualSense: 3, magicPower: 2 } } },
    'duyen_voi_nuoc': { id: 'duyen_voi_nuoc', name: 'Duyên Với Nước', description: 'Thích nước, bơi lội giỏi.', rank: 2, cost: 20, effects: { nguHanhBonus: { thuy: 1 } } },
    'thich_lua': { id: 'thich_lua', name: 'Thích Lửa', description: 'Không sợ nóng, thích nghịch lửa.', rank: 2, cost: 20, effects: { nguHanhBonus: { hoa: 1 } } },
    'yeu_cay_co': { id: 'yeu_cay_co', name: 'Yêu Cây Cỏ', description: 'Mát tay trồng trọt.', rank: 2, cost: 20, effects: { nguHanhBonus: { moc: 1 } } },
    'cung_dau': { id: 'cung_dau', name: 'Cứng Đầu', description: 'Tính tình cố chấp, vững như đá.', rank: 2, cost: 20, effects: { nguHanhBonus: { tho: 1 }, attributeChangePercent: { physicalBody: 2 } } },
    'sac_ben': { id: 'sac_ben', name: 'Sắc Bén', description: 'Khí chất sắc bén như kim loại.', rank: 2, cost: 20, effects: { nguHanhBonus: { kim: 1 }, attributeChangePercent: { physicalStrength: 2 } } },
    'thu_sinh': { id: 'thu_sinh', name: 'Thư Sinh', description: 'Dáng vẻ nho nhã, tinh thần tốt nhưng yếu ớt.', rank: 2, cost: 20, effects: { attributeChangePercent: { spiritualSense: 3, physicalStrength: -2 } } },
    // NEW ALIGNMENT DESTINIES (Rank 2)
    'hanh_hiep_truong_nghia': { id: 'hanh_hiep_truong_nghia', name: 'Hành Hiệp Trượng Nghĩa', description: 'Thấy chuyện bất bình chẳng tha, khí khái hào hùng.', rank: 2, cost: 20, effects: { amDuongBonus: { chinh: 10 }, attributeChangePercent: { physicalStrength: 2 } } },
    'tu_loi_vi_ban': { id: 'tu_loi_vi_ban', name: 'Tư Lợi Vi Bản', description: 'Luôn đặt lợi ích bản thân lên trên hết.', rank: 2, cost: 20, effects: { amDuongBonus: { ta: 10 }, attributeChangePercent: { aptitude: 2 } } },

    // --- RANK 3 (Blue) ---
    'thien_ly_nhan': { id: 'thien_ly_nhan', name: 'Thiên Lý Nhãn', description: 'Tầm nhìn xa, thần thức mạnh mẽ.', rank: 3, cost: 30, effects: { attributeChangePercent: { spiritualSense: 5 } } },
    'phong_hanh_giả': { id: 'phong_hanh_giả', name: 'Phong Hành Giả', description: 'Thân nhẹ như yến, tốc độ hơn người.', rank: 3, cost: 30, effects: { attributeChangePercent: { agility: 5, attackSpeed: 2 } } },
    'dai_khi_van': { id: 'dai_khi_van', name: 'Đại Khí Vận', description: 'Khí vận hơn người, thường gặp may mắn.', rank: 3, cost: 30, effects: { attributeChangePercent: { critChance: 4 } } },
    'van_du_thien_ha': { id: 'van_du_thien_ha', name: 'Vân Du Thiên Hạ', description: 'Thích ngao du sơn thủy, thân pháp tốt.', rank: 3, cost: 30, effects: { attributeChangePercent: { agility: 4, spiritualSense: 2 } } },
    'cuu_duong': { id: 'cuu_duong', name: 'Cửu Dương', description: 'Thân thể phụ thuộc Hỏa, tăng khả năng Hỏa linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { hoa: 2 } } },
    'nhuoc_thuy': { id: 'nhuoc_thuy', name: 'Nhược Thủy', description: 'Thân thể phụ thuộc Thủy, tăng khả năng Thủy linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { thuy: 2 } } },
    'at_moc': { id: 'at_moc', name: 'Ất Mộc', description: 'Thân thể phụ thuộc Mộc, tăng khả năng Mộc linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { moc: 2 } } },
    'canh_kim': { id: 'canh_kim', name: 'Canh Kim', description: 'Thân thể phụ thuộc Kim, tăng khả năng Kim linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { kim: 2 } } },
    'hau_tho': { id: 'hau_tho', name: 'Hậu Thổ', description: 'Thân thể phụ thuộc Thổ, tăng khả năng Thổ linh khí.', rank: 3, cost: 30, effects: { nguHanhBonus: { tho: 2 } } },
    'vo_si': { id: 'vo_si', name: 'Võ Sĩ', description: 'Quen với việc rèn luyện thân thể.', rank: 3, cost: 30, effects: { attributeChangePercent: { physicalStrength: 4, agility: 2 } } },
    'kiem_phach': { id: 'kiem_phach', name: 'Kiếm Phách', description: 'Có thiên phú với kiếm đạo.', rank: 3, cost: 30, effects: { nguHanhBonus: { kim: 2 }, attributeChangePercent: { physicalStrength: 5 } } },
    'duoc_dong': { id: 'duoc_dong', name: 'Dược Đồng', description: 'Có khiếu làm luyện đan sư.', rank: 3, cost: 30, effects: { nguHanhBonus: { moc: 1, hoa: 1 }, attributeChangePercent: { spiritualSense: 4 } } },
    'mi_cot': { id: 'mi_cot', name: 'Mị Cốt', description: 'Trời sinh quyến rũ, dễ dàng thu phục lòng người.', rank: 3, cost: 30, effects: { attributeChangePercent: { spiritualSense: 5 } } },
    // NEW ALIGNMENT DESTINIES (Rank 3)
    'tam_nhu_chi_thuy': { id: 'tam_nhu_chi_thuy', name: 'Tâm Như Chỉ Thủy', description: 'Lòng lặng như nước, không bị ngoại vật quấy nhiễu.', rank: 3, cost: 30, effects: { amDuongBonus: { chinh: 15 }, primaryStatChangePercent: { maxMentalState: 5 } } },
    'tam_ma_xam_thuc': { id: 'tam_ma_xam_thuc', name: 'Tâm Ma Xâm Thực', description: 'Dễ bị cảm xúc tiêu cực chi phối, nhưng sức mạnh tinh thần bùng nổ.', rank: 3, cost: 30, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { spiritualSense: 5 }, primaryStatChangePercent: { maxMentalState: -4 } } },

    // --- RANK 4 (Purple) ---
    'dai_tri_nhuoc_ngu': { id: 'dai_tri_nhuoc_ngu', name: 'Đại Trí Nhược Ngu', description: 'Bề ngoài khờ khạo nhưng ngộ tính kinh người.', rank: 4, cost: 40, expPerTurn: 2, effects: { attributeChangePercent: { aptitude: 8 } } },
    'cuong_vong_tu_dai': { id: 'cuong_vong_tu_dai', name: 'Cuồng Vọng Tự Đại', description: 'Kiêu ngạo, tấn công mạnh nhưng nhục thân yếu.', rank: 4, cost: 40, effects: { attributeChangePercent: { physicalStrength: 8, critDamage: 10, physicalBody: -5 } } },
    'dao_ma_chuyen_the': { id: 'dao_ma_chuyen_the', name: 'Đạo Ma Chuyển Thế', description: 'Sở hữu tiềm năng của cả Đạo và Ma.', rank: 4, cost: 40, effects: { attributeChangePercent: { physicalStrength: 6, magicPower: 6, physicalBody: 6 } } },
    'hon_nguyen_dao': { id: 'hon_nguyen_dao', name: 'Hỗn Nguyên Đạo', description: 'Dung nạp ngũ hành, ép phẩm chất lên Cực Linh Căn.', rank: 4, cost: 40, effects: { nguHanhBonus: { all: 2 } } },
    'chinh_khi_lam_nhiet': { id: 'chinh_khi_lam_nhiet', name: 'Chính Khí Lẫm Liệt', description: 'Một lòng hướng đạo, tà ma bất xâm.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20 }, attributeChangePercent: { physicalBody: 8 } } },
    'ma_tinh_tham_tang': { id: 'ma_tinh_tham_tang', name: 'Ma Tính Thâm Tàng', description: 'Ngoài mặt bình thường nhưng tâm địa thâm sâu.', rank: 4, cost: 40, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { critChance: 5, spiritualSense: 5 } } },
    'quy_nhan': { id: 'quy_nhan', name: 'Quỷ Nhãn', description: 'Đôi mắt nhìn thấu âm dương.', rank: 4, cost: 40, effects: { attributeChangePercent: { spiritualSense: 8 }, amDuongBonus: { ta: 10 } } },
    'phat_tu': { id: 'phat_tu', name: 'Phật Tử', description: 'Có duyên với Phật pháp.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20 }, primaryStatChangePercent: { maxMentalState: 10 } } },
    'huyet_ma': { id: 'huyet_ma', name: 'Huyết Ma', description: 'Thích máu tanh, thiên hướng tà đạo.', rank: 4, cost: 40, effects: { amDuongBonus: { ta: 20 }, attributeChangePercent: { physicalStrength: 8 } } },
    // NEW ALIGNMENT DESTINIES (Rank 4)
    'diet_ma_chi_tam': { id: 'diet_ma_chi_tam', name: 'Diệt Ma Chi Tâm', description: 'Thề diệt hết ma quái trong thiên hạ, chấp niệm quá sâu.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 30, ta: -10 }, attributeChangePercent: { attackSpeed: 5 } } },
    'nhan_qua_dao': { id: 'nhan_qua_dao', name: 'Nhân Quả Đạo', description: 'Hiểu thấu nhân quả, thiện ác song hành.', rank: 4, cost: 40, effects: { amDuongBonus: { chinh: 20, ta: 20 }, attributeChangePercent: { spiritualSense: 10 } } },

    // --- RANK 5 (Orange) ---
    'son_ha_xa_tac': { id: 'son_ha_xa_tac', name: 'Sơn Hà Xã Tắc', description: 'Thân thể bền bỉ như đất, sức sống như cây.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxHp: 12 }, attributeChangePercent: { physicalBody: 10 }, nguHanhBonus: { tho: 1, moc: 1 } } },
    'kiem_khi_truong_giang': { id: 'kiem_khi_truong_giang', name: 'Kiếm Khí Trường Giang', description: 'Kiếm khí như nước chảy.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 10, magicPower: 10 }, nguHanhBonus: { kim: 1, thuy: 1 } } },
    'thuong_long_at_moc': { id: 'thuong_long_at_moc', name: 'Thương Long Ất Mộc', description: 'Sinh sôi nảy nở, hồi phục mạnh mẽ.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxSpiritPower: 12, maxStamina: 12 }, attributeChangePercent: { spiritualSense: 8, hpRegen: 5, spRegen: 5 }, nguHanhBonus: { thuy: 1, moc: 1 } } },
    'chu_tuoc_phan_thien': { id: 'chu_tuoc_phan_thien', name: 'Chu Tước Phần Thiên', description: 'Lửa bùng cháy, bạo phát mạnh mẽ.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 12, critChance: 8, dmgFire: 10 }, nguHanhBonus: { moc: 1, hoa: 1 } } },
    'dia_tam_hoa_lien': { id: 'dia_tam_hoa_lien', name: 'Địa Tâm Hỏa Liên', description: 'Sức chịu đựng và phản kích.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalBody: 12, counterDamage: 8 }, nguHanhBonus: { hoa: 1, tho: 1 } } },
    'tuyet_vuc_bang_tam': { id: 'tuyet_vuc_bang_tam', name: 'Tuyết Vực Băng Tâm', description: 'Tâm lặng như băng, kháng hiệu ứng.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { maxMentalState: 15 }, attributeChangePercent: { spiritualSense: 10, critResist: 10 }, nguHanhBonus: { thuy: 1, kim: 1 } } },
    'phuong_hoang_niet_ban': { id: 'phuong_hoang_niet_ban', name: 'Phượng Hoàng Niết Bàn', description: 'Tuổi thọ cao, thiên phú hỏa pháp.', rank: 5, cost: 50, effects: { primaryStatChangePercent: { lifespan: 15 }, attributeChangePercent: { magicPower: 10, agility: 8, attackSpeed: 5, hpRegen: 10 }, nguHanhBonus: { hoa: 2 } } },
    'loi_dinh_ba': { id: 'loi_dinh_ba', name: 'Lôi Đình Bá', description: 'Thân thể chứa lôi đình. Tự động kích hoạt Lôi Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 12, critDamage: 15, dmgLightning: 10 } } },
    'bang_tam_ngoc_cot': { id: 'bang_tam_ngoc_cot', name: 'Băng Tâm Ngọc Cốt', description: 'Cốt tủy băng giá. Tự động kích hoạt Băng Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 10, physicalBody: 10, resIce: 10 } } },
    'huyen_anh_phong_than': { id: 'huyen_anh_phong_than', name: 'Huyễn Ảnh Phong Thân', description: 'Thân như gió. Tự động kích hoạt Phong Linh Căn.', rank: 5, cost: 50, effects: { attributeChangePercent: { agility: 12, attackSpeed: 8, evasion: 8 } } },
    'bang_phach': { id: 'bang_phach', name: 'Băng Phách', description: 'Linh hồn lạnh giá, ép linh căn thành Băng dị chủng.', rank: 5, cost: 50, effects: { attributeChangePercent: { magicPower: 12, dmgIce: 10 } } },
    'phong_than': { id: 'phong_than', name: 'Phong Thần', description: 'Con của gió, ép linh căn thành Phong dị chủng.', rank: 5, cost: 50, effects: { attributeChangePercent: { agility: 12, dmgWind: 10 } } },
    'thien_sat_co_tinh': { id: 'thien_sat_co_tinh', name: 'Thiên Sát Cô Tinh', description: 'Số phận cô độc, khắc người thân nhưng sức mạnh vượt trội.', rank: 5, cost: 50, effects: { attributeChangePercent: { physicalStrength: 15, physicalBody: -8, critChance: 10, armorPen: 10 }, primaryStatChangePercent: { lifespan: 10 } } },
    // NEW ALIGNMENT DESTINIES (Rank 5)
    'hao_nhien_chinh_khi': { id: 'hao_nhien_chinh_khi', name: 'Hạo Nhiên Chính Khí', description: 'Chính khí ngút trời, tà ma tránh xa.', rank: 5, cost: 50, effects: { amDuongBonus: { chinh: 50, ta: -20 }, attributeChangePercent: { physicalBody: 12, spiritualSense: 10, critResist: 10 } } },
    'vo_tinh_sat_dao': { id: 'vo_tinh_sat_dao', name: 'Vô Tình Sát Đạo', description: 'Diệt tuyệt thất tình lục dục, chỉ còn sát đạo.', rank: 5, cost: 50, effects: { amDuongBonus: { ta: 50, chinh: -20 }, attributeChangePercent: { critDamage: 20, physicalStrength: 12, armorPen: 10 } } },
    'ta_than_nghich_tu': { id: 'ta_than_nghich_tu', name: 'Tà Thần Nghịch Tử', description: 'Kẻ phản nghịch, chà đạp luân thường đạo lý.', rank: 5, cost: 50, effects: { amDuongBonus: { ta: 40, chinh: -40 }, attributeChangePercent: { magicPower: 15, lifeSteal: 10 } } },

    // --- RANK 6 (Red) ---
    'thien_menh_chi_tu': { id: 'thien_menh_chi_tu', name: 'Thiên Mệnh Chi Tử', description: 'Kẻ được thiên mệnh ưu ái, tư chất toàn diện.', rank: 6, cost: 80, expPerTurn: 3, effects: { attributeChangePercent: { physicalStrength: 20, magicPower: 20, physicalBody: 20, agility: 15, spiritualSense: 20, aptitude: 20, attackSpeed: 10, damageReduction: 10, armorPen: 10 }, nguHanhBonus: { all: 3 } } },
    'ngu_hanh_hop_nhat': { id: 'ngu_hanh_hop_nhat', name: 'Ngũ Hành Hợp Nhất', description: 'Ngũ hành tương sinh, ép phẩm chất thành Cực Linh Căn.', rank: 6, cost: 60, effects: { nguHanhBonus: { all: 2 }, attributeChangePercent: { magicPower: 25, aptitude: 25 } } },
    'loi_than_giang_the': { id: 'loi_than_giang_the', name: 'Lôi Thần Giáng Thế', description: 'Hóa thân của sấm sét, ép linh căn thành Lôi dị chủng cực phẩm.', rank: 6, cost: 70, effects: { attributeChangePercent: { physicalStrength: 25, critDamage: 30, attackSpeed: 15, dmgLightning: 20 } } },
    'van_khi_nghich_thien': { id: 'van_khi_nghich_thien', name: 'Vận Khí Nghịch Thiên', description: 'May mắn đến mức nghịch thiên, đi đường cũng nhặt được bảo vật.', rank: 6, cost: 80, effects: { attributeChangePercent: { critChance: 15, evasion: 15 } } },
    'nguoi_xuyen_viet': { id: 'nguoi_xuyen_viet', name: 'Người Xuyên Việt', description: 'Linh hồn đến từ thế giới khác, tâm trí kiên định, kiến thức rộng mở.', rank: 6, cost: 60, effects: { primaryStatChangePercent: { maxMentalState: 30 }, attributeChangePercent: { aptitude: 25, spiritualSense: 25 } } },
    // NEW ALIGNMENT DESTINIES (Rank 6)
    'thien_ma_hang_the': { id: 'thien_ma_hang_the', name: 'Thiên Ma Hàng Thế', description: 'Ma chủ tái sinh, vạn ma thần phục.', rank: 6, cost: 80, effects: { amDuongBonus: { ta: 80, chinh: -50 }, attributeChangePercent: { magicPower: 25, spiritualSense: 20, lifeSteal: 15, armorPen: 15 } } },
};
// Khí vận tiên thiên: mỗi kiếp rút 1–3 cái lúc đầu thai, phẩm càng cao càng hiếm.
// Khí vận có hành (Cửu Dương, Nhược Thủy, Canh Kim…) kéo linh căn về hành đó; một số ép linh căn thành biến dị (Lôi, Băng, Phong)
// hoặc Cực linh căn (đủ ngũ hành, tương sinh); Ngũ Hành Khuyết Mộc thì không cảm được Mộc khí.
// Thể chất tiên thiên: suy ra từ linh căn (tỉ lệ hành), khí vận, nhân quả (chính tà) và tính tình (theo xuất thân, mệnh cách), lấy tối đa ba cái phẩm cao nhất,
// không khớp gì thì là Phàm Thể. Tất cả đều cộng vào chỉ số.
delete TT_DEST.vo_can; // không có linh căn thì không tu được: bỏ
const TT_RW=[0,40,28,17,9,4.5,1.5];
const TT_RANK=['','Phàm','Lương','Hiếm','Quý','Cực hiếm','Nghịch thiên'],TT_COL=['','#8d8672','#4f8a4a','#4a6fae','#7b56a8','#c97a2b','#b8302a'];
function ttRoll(){const n=wpick([1,2,3],x=>[40,45,15][x-1]);const L=[];const all=Object.values(TT_DEST);
  for(let i=0;i<n;i++){const rk=wpick([1,2,3,4,5,6],x=>TT_RW[x]);const pool=all.filter(d=>d.rank===rk&&!L.includes(d.id));if(pool.length)L.push(pick(pool).id);}return L;}
const TT_FORCE={loi_dinh_ba:'loi',loi_than_giang_the:'loi',bang_tam_ngoc_cot:'bang',bang_phach:'bang',huyen_anh_phong_than:'phong',phong_than:'phong'};
ROOT.push({id:'cuc',n:'Cực linh căn',m:1.5,w:0,k:5,d:'Đủ ngũ hành, tương sinh không khắc. Hiếm tới mức chỉ khí vận nghịch thiên mới ép ra được.'});
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
const TT_TRAITS={dote:['Tàn nhẫn'],mahuyet:['Cuồng tà','Căm thù'],khat:['Tự do'],linh:['Hiếu chiến'],mieu:['Nhân hậu'],thusinh:['Thận trọng'],buon:['Thực dụng'],hat:['Quái gở'],thegia:['Bảo thủ'],tran:['Thông tuệ'],daodong:['Thận trọng'],nong:['Chính trực'],ren:['Chính trực'],chai:['Tự do'],duoc:['Nhân hậu'],
 sattinh:['Sát phạt','Hiếu chiến'],chithuy:['Lạnh lùng'],linhnhan:['Thông tuệ'],thiendo:['Thông tuệ'],luoi:['Thực dụng'],thanluc:['Hiếu chiến'],bangco:['Lạnh lùng'],kiemtam:['Hào sảng']};
function ttPhys(r){const els=r.root.els.filter(e=>NGUHANH.includes(e));const pct=e=>els.includes(e)?Math.round(100/Math.max(1,els.length)):0;const D=r.kv||[];const has=k=>D.includes(k);
  const T=(TT_TRAITS[r.origin]||[]).concat(TT_TRAITS[r.trait]||[]);const hasT=t=>T.includes(t);const anyT=L=>L.some(hasT);
  const k=r.karma||0;const pureR=k>=40,pureE=k<=-40,neutral=Math.abs(k)<20;const lc=r.root.id==='cuc'?'Cực Linh Căn':r.root.id==='thien'?'Thiên Linh Căn':'';
  const evil=['Độc ác','Tàn nhẫn','Thâm độc','Cuồng tà','Vị kỷ','Căm thù'],wild=['Cuồng tà','Quái gở','Tự do'];const bal5=els.length===5;
  const C={hon_don_the:bal5&&lc==='Cực Linh Căn'&&neutral&&(has('ngu_hanh_hop_nhat')||(has('hon_nguyen_dao')&&D.some(q=>q!=='hon_nguyen_dao'&&TT_DEST[q].rank>=5))),hoang_co_thanh_the:pct('tho')>=80&&(has('son_ha_xa_tac')||has('da_day_hon_sat'))&&pureR&&!anyT(evil),
   van_co_ma_the:pureE&&(has('sat_phat_qua_duyet')||has('dao_ma_chuyen_the'))&&anyT(evil),tien_thien_dao_thai:!!lc&&has('dai_tri_nhuoc_ngu')&&!pureE,
   cuu_khieu_linh_lung:(has('thien_co_thong_minh')||has('thien_ly_nhan'))&&anyT(['Thận trọng','Thực dụng','Thông tuệ']),
   thuong_thien_ba_the:(pct('tho')>=60||pct('kim')>=60)&&!pureR&&(anyT(wild)||has('cuong_vong_tu_dai')),thai_duong_the:pct('hoa')>=80&&has('cuu_duong')&&!hasT('Lạnh lùng'),
   thai_am_the:pct('thuy')>=80&&has('nhuoc_thuy'),thien_yeu_the:(pct('moc')>=60||has('huyen_anh_phong_than'))&&anyT(wild),loi_dinh_chien_the:has('loi_dinh_ba')&&anyT(wild.concat(['Hào sảng','Hiếu chiến'])),
   hu_khong_chi_the:has('huyen_anh_phong_than')&&hasT('Tự do'),duoc_linh_thanh_the:pct('moc')+pct('hoa')>=60&&(has('duoc_linh_the')||has('chu_tuoc_phan_thien')||r.origin==='duoc'),
   ngu_hanh_linh_the:bal5,vo_cau_kiem_the:pct('kim')>=60&&has('kiem_khi_truong_giang'),huyet_sat_ma_the:pct('thuy')>=40&&k<-60&&anyT(['Độc ác','Tàn nhẫn','Sát phạt']),
   bang_co_ngoc_cot:has('bang_tam_ngoc_cot')&&hasT('Lạnh lùng'),tat_phong_linh_the:pct('moc')>=40&&pct('thuy')>=20&&has('phong_hanh_giả'),cuu_duong_chi_the:pct('hoa')>=60&&has('cuu_duong'),
   huyen_am_chi_the:pct('thuy')>=60&&has('nhuoc_thuy'),kim_cuong_bat_hoai:pct('kim')>=50&&pct('tho')>=50,kim_linh_the:pct('kim')>=70,moc_linh_chi_the:pct('moc')>=70,thuy_linh_the:pct('thuy')>=70,
   hoa_linh_the:pct('hoa')>=70,tho_linh_the:pct('tho')>=70,am_sat_the:k<=-50&&hasT('Thâm độc'),cuong_chien_the:hasT('Cuồng tà')||(hasT('Hiếu chiến')&&['vo_si','sat_phat_qua_duyet','huyet_ma','cuong_vong_tu_dai','than_the_khoe_manh'].some(has)),man_luc_the:has('than_the_khoe_manh'),
   thong_tue_the:has('tinh_than_minh_man'),kien_nhan_the:has('khi_luc_doi_dao'),linh_cam_the:has('thien_ly_nhan'),truong_tho_the:has('thien_menh_chi_tu')||pct('moc')>=50};
  const L=TT_PHYS.filter(p=>C[p.id]).sort((a,b)=>b.rank-a.rank).slice(0,3).map(p=>p.id);return L.length?L:['pham_the'];}
function ttPhysOf(id){return TT_PHYS.find(p=>p.id===id);}
// đổi hiệu ứng của Thienmenh sang chỉ số của game này
const TT_MAP={physicalStrength:['atkP',1],magicPower:['matkP',1],physicalBody:['defP',1],damageReduction:['defP',1],counterDamage:['defP',0.5],armorPen:['atkP',0.5],
 agility:['tp',0.25],attackSpeed:['tp',0.2],spiritualSense:['than',0.5],aptitude:['ngo',0.34],critChance:['crit',1],critDamage:['critDmg',1],evasion:['dodge',1],critResist:['hoTam',0.5],
 lifeSteal:['drain',0.5],hpRegen:['regenHp',0.2],maxHp:['hpP',1],maxSpiritPower:['mpP',1],maxStamina:['hpP',0.3],maxMentalState:['tam',0.34],lifespan:['lifeP',1]};
const TT_ELD={dmgFire:'hoa',dmgLightning:'loi',dmgIce:'bang',dmgWind:'phong'};
function ttFx(def){const o={};if(!def)return o;const E=def.effects||{};const add=(k,v)=>{if(!v)return;o[k]=(o[k]||0)+v;};
  for(const grp of [E.attributeChangePercent,E.primaryStatChangePercent])for(const [k,v] of Object.entries(grp||{})){if(TT_ELD[k]){o.elP=o.elP||{};o.elP[TT_ELD[k]]=(o.elP[TT_ELD[k]]||0)+v;continue;}const m=TT_MAP[k];if(!m)continue;
    let x=v*m[1];x=['tp','ngo','tam','than','hoTam','drain','regenHp'].includes(m[0])?Math.sign(x)*Math.max(1,Math.round(Math.abs(x))):Math.round(x);add(m[0],x);}
  const ex=(E.expPerTurn||0)+(def.expPerTurn||0)*3;if(ex)add('tvP',ex);return o;}
const TT_FXN={atkP:'Công vật lý {v}%',matkP:'Công phép {v}%',defP:'Thủ {v}%',hpP:'Khí huyết {v}%',mpP:'Linh lực {v}%',tp:'Thân pháp {v}',than:'Thần thức {v}',ngo:'Ngộ tính {v}',tam:'Đạo tâm {v}',crit:'Chí mạng {v}%',critDmg:'ST chí mạng {v}%',dodge:'Né tránh {v}',hoTam:'Hộ tâm {v}',drain:'Hút máu {v}%',regenHp:'Hồi khí huyết mỗi lượt {v}%',lifeP:'Thọ nguyên {v}%',tvP:'Tu vi nhận thêm {v}%'};
function ttFxText(def){const o=ttFx(def);const L=[];for(const [k,v] of Object.entries(o)){if(k==='elP'){for(const [e,x] of Object.entries(v))L.push('Sát thương hệ '+EL[e].n+' '+(x>0?'+':'')+x+'%');continue;}if(TT_FXN[k])L.push(TT_FXN[k].replace('{v}',(v>0?'+':'')+v));}
  const E=def.effects||{};if(E.nguHanhBonus)L.push('Linh căn nghiêng về '+Object.keys(E.nguHanhBonus).map(e=>e==='all'?'ngũ hành':(EL[e]||{n:e}).n).join(', ')+(Object.values(E.nguHanhBonus).some(v=>v<0)?' (khuyết)':''));
  if(TT_FORCE[def.id])L.push('Linh căn hóa '+EL[TT_FORCE[def.id]].n+' (biến dị)');if(def.id==='hon_nguyen_dao'||def.id==='ngu_hanh_hop_nhat')L.push('Ép thành Cực linh căn');
  if(E.amDuongBonus){const d=Math.round(((E.amDuongBonus.chinh||0)-(E.amDuongBonus.ta||0))/2);if(d)L.push('Nhân quả '+(d>0?'+':'')+d);}return L;}
{const _ag25=aggFx;aggFx=function(){const fx=_ag25();const r=G.run;if(!r)return fx;const add=src=>{for(const [k,v] of Object.entries(src)){if(k==='elP'){fx.elP=fx.elP||{};for(const [e,x] of Object.entries(v))fx.elP[e]=(fx.elP[e]||0)+x;}else fx[k]=(fx[k]||0)+v;}};
  for(const k of r.kv||[])add(ttFx(TT_DEST[k]));for(const k of r.the||[])add(ttFx(ttPhysOf(k)));return fx;};}
{const _nr25=newRun;newRun=function(c){const res=_nr25(c);const r=G.run;if(r){r.kv=(c.kv||[]).slice();r.karma=clamp((r.karma||0)+(c.karmaAdj||0),-100,100);r.the=ttPhys(r);const s=S();r.hp=s.maxHp;r.mp=s.maxMp;}return res;};}
// câu chuyện mở đầu: nhắc tới thể chất nổi bật (từ phẩm Hiếm trở lên)
{const _nr25b=newRun;newRun=function(c){const res=_nr25b(c);const r=G.run;if(r&&r.story&&r.the){const p=ttPhysOf(r.the[0]);if(p&&p.rank>=3){const w=r.ten.split(' ');const h2=w.length>2&&NAME.ho2.includes(w[0]+' '+w[1]);const nm=w.slice(h2?2:1).join(' ')||r.ten;
  r.story.splice(Math.max(1,r.story.length-2),0,'Có lần một lão đạo sĩ đi ngang, nhìn '+nm+' rất lâu rồi lẩm bẩm: “'+p.name+'…” '+p.description);}}return res;};}
