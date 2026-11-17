// Nguồn chuẩn của TT_DEST. description chỉ mô tả tác dụng thật; story dùng cho truyện, lore giữ lời tựa nhập.
const TT_DEST={
  "than_the_khoe_manh": {
    "id": "than_the_khoe_manh",
    "name": "Thân Thể Khỏe Mạnh",
    "description": "Thủ tăng nhẹ; Khí huyết tăng nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 2
      },
      "attributeChangePercent": {
        "physicalBody": 1
      }
    },
    "lore": "Bẩm sinh khỏe mạnh hơn người thường.",
    "story": "Bẩm sinh khỏe mạnh hơn người thường."
  },
  "tinh_than_minh_man": {
    "id": "tinh_than_minh_man",
    "name": "Tinh Thần Minh Mẫn",
    "description": "Thần thức tăng nhẹ; Đạo tâm tăng nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "primaryStatChangePercent": {
        "maxMentalState": 2
      },
      "attributeChangePercent": {
        "spiritualSense": 1
      }
    },
    "lore": "Đầu óc lanh lợi, thần hồn sáng suốt.",
    "story": "Đầu óc lanh lợi, thần hồn sáng suốt."
  },
  "khi_luc_doi_dao": {
    "id": "khi_luc_doi_dao",
    "name": "Khí Lực Dồi Dào",
    "description": "Thân pháp tăng nhẹ; Khí huyết tăng nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "primaryStatChangePercent": {
        "maxStamina": 2
      },
      "attributeChangePercent": {
        "agility": 1
      }
    },
    "lore": "Thể lực bẩm sinh tốt.",
    "story": "Thể lực bẩm sinh tốt."
  },
  "gia_canh_kha_gia": {
    "id": "gia_canh_kha_gia",
    "name": "Gia Cảnh Khá Giả",
    "description": "Đầu thai mang thêm 3–6 linh thạch.",
    "rank": 1,
    "cost": 10,
    "lore": "Xuất thân từ gia đình giàu có.",
    "story": "Xuất thân từ gia đình giàu có."
  },
  "ke_ngoc": {
    "id": "ke_ngoc",
    "name": "Kẻ Ngốc",
    "description": "Ngộ tính giảm nhẹ; Thủ tăng nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "attributeChangePercent": {
        "aptitude": -1,
        "physicalBody": 2
      }
    },
    "lore": "Tư chất kém nhưng bù lại thân thể tráng kiện.",
    "story": "Tư chất kém nhưng bù lại thân thể tráng kiện."
  },
  "yeu_menh": {
    "id": "yeu_menh",
    "name": "Yểu Mệnh",
    "description": "Ngộ tính tăng khá; Thọ nguyên giảm khá; Khí huyết giảm nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "primaryStatChangePercent": {
        "lifespan": -5,
        "maxHp": -2
      },
      "attributeChangePercent": {
        "aptitude": 2
      }
    },
    "lore": "Sinh ra đã yếu ớt, tuổi thọ ngắn ngủi nhưng ngộ tính khá cao.",
    "story": "Sinh ra đã yếu ớt, tuổi thọ ngắn ngủi nhưng ngộ tính khá cao."
  },
  "mu_mau": {
    "id": "mu_mau",
    "name": "Mù Màu",
    "description": "Thần thức giảm nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": -1
      }
    },
    "lore": "Khó phân biệt màu sắc, nhưng tai rất thính.",
    "story": "Khó phân biệt màu sắc, nhưng tai rất thính."
  },
  "tay_chan_long_ngong": {
    "id": "tay_chan_long_ngong",
    "name": "Tay Chân Lóng Ngóng",
    "description": "Thân pháp giảm nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "attributeChangePercent": {
        "agility": -1
      }
    },
    "lore": "Vụng về, thân pháp kém.",
    "story": "Vụng về, thân pháp kém."
  },
  "so_do_cao": {
    "id": "so_do_cao",
    "name": "Sợ Độ Cao",
    "description": "Đạo tâm giảm nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "primaryStatChangePercent": {
        "maxMentalState": -2
      }
    },
    "lore": "Không dám bay cao, ảnh hưởng tâm cảnh khi phi hành.",
    "story": "Không dám bay cao, ảnh hưởng tâm cảnh khi phi hành."
  },
  "ngu_hanh_khuyet_moc": {
    "id": "ngu_hanh_khuyet_moc",
    "name": "Ngũ Hành Khuyết Mộc",
    "description": "Linh căn nghiêng về Mộc (khuyết).",
    "rank": 1,
    "cost": 10,
    "effects": {
      "nguHanhBonus": {
        "moc": -1
      }
    },
    "lore": "Thiên sinh không thể cảm nhận Mộc khí.",
    "story": "Thiên sinh không thể cảm nhận Mộc khí."
  },
  "vo_can": {
    "id": "vo_can",
    "name": "Vô Căn",
    "description": "Ngộ tính giảm nhẹ; Công phép giảm nhẹ.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "attributeChangePercent": {
        "aptitude": -3,
        "magicPower": -3
      }
    },
    "lore": "Không có linh căn, con đường tu tiên vô cùng gian nan.",
    "story": "Không có linh căn, con đường tu tiên vô cùng gian nan."
  },
  "thien_luong_chi_nhan": {
    "id": "thien_luong_chi_nhan",
    "name": "Thiện Lương Chi Nhân",
    "description": "Thiên về thiện.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "amDuongBonus": {
        "chinh": 5
      }
    },
    "lore": "Bản tính hiền lành, ít khi làm điều ác.",
    "story": "Bản tính hiền lành, ít khi làm điều ác."
  },
  "tieu_nhan_bi_oi": {
    "id": "tieu_nhan_bi_oi",
    "name": "Tiểu Nhân Bỉ Ổi",
    "description": "Mua đồ rẻ tăng nhẹ; Thiên về ác.",
    "rank": 1,
    "cost": 10,
    "effects": {
      "amDuongBonus": {
        "ta": 5
      }
    },
    "lore": "Lòng dạ hẹp hòi, hay tính toán chi li.",
    "story": "Lòng dạ hẹp hòi, hay tính toán chi li."
  },
  "sat_phat_qua_duyet": {
    "id": "sat_phat_qua_duyet",
    "name": "Sát Phạt Quả Quyết",
    "description": "Công vật lý tăng nhẹ; Chí mạng tăng nhẹ; Sát thương lên kẻ dưới khí huyết tăng mạnh · rất mạnh.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 3,
        "critChance": 1
      }
    },
    "lore": "Ra tay tàn nhẫn, có duyên với sát đạo.",
    "story": "Ra tay tàn nhẫn, có duyên với sát đạo."
  },
  "linh_khi_than_hoa": {
    "id": "linh_khi_than_hoa",
    "name": "Linh Khí Thân Hòa",
    "description": "Công phép tăng nhẹ; Linh lực tăng khá; Linh lực tiêu hao giảm khá.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "primaryStatChangePercent": {
        "maxSpiritPower": 3
      },
      "attributeChangePercent": {
        "magicPower": 2
      }
    },
    "lore": "Thân thể dễ dàng tương thích và hấp thụ linh khí.",
    "story": "Thân thể dễ dàng tương thích và hấp thụ linh khí."
  },
  "thien_co_thong_minh": {
    "id": "thien_co_thong_minh",
    "name": "Thiên Tư Thông Minh",
    "description": "Ngộ tính tăng nhẹ; Tu vi nhận thêm tăng khá.",
    "rank": 2,
    "cost": 20,
    "expPerTurn": 1,
    "effects": {
      "attributeChangePercent": {
        "aptitude": 3
      }
    },
    "lore": "Tư chất hơn người, học nhanh.",
    "story": "Tư chất hơn người, học nhanh."
  },
  "da_day_hon_sat": {
    "id": "da_day_hon_sat",
    "name": "Da Dày Hơn Sắt",
    "description": "Thủ tăng nhẹ.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "attributeChangePercent": {
        "physicalBody": 3
      }
    },
    "lore": "Thân thể cứng cáp.",
    "story": "Thân thể cứng cáp."
  },
  "benh_tat_quan_than": {
    "id": "benh_tat_quan_than",
    "name": "Bệnh Tật Quấn Thân",
    "description": "Thần thức tăng khá; Công phép tăng nhẹ; Khí huyết giảm nhẹ.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": -3
      },
      "attributeChangePercent": {
        "spiritualSense": 3,
        "magicPower": 2
      }
    },
    "lore": "Thân thể yếu đuối nhưng thần hồn mạnh mẽ.",
    "story": "Thân thể yếu đuối nhưng thần hồn mạnh mẽ."
  },
  "duyen_voi_nuoc": {
    "id": "duyen_voi_nuoc",
    "name": "Duyên Với Nước",
    "description": "Linh căn nghiêng về Thủy.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "nguHanhBonus": {
        "thuy": 1
      }
    },
    "lore": "Thích nước, bơi lội giỏi.",
    "story": "Thích nước, bơi lội giỏi."
  },
  "thich_lua": {
    "id": "thich_lua",
    "name": "Thích Lửa",
    "description": "Linh căn nghiêng về Hỏa.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "nguHanhBonus": {
        "hoa": 1
      }
    },
    "lore": "Không sợ nóng, thích nghịch lửa.",
    "story": "Không sợ nóng, thích nghịch lửa."
  },
  "yeu_cay_co": {
    "id": "yeu_cay_co",
    "name": "Yêu Cây Cỏ",
    "description": "Linh căn nghiêng về Mộc.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "nguHanhBonus": {
        "moc": 1
      }
    },
    "lore": "Mát tay trồng trọt.",
    "story": "Mát tay trồng trọt."
  },
  "cung_dau": {
    "id": "cung_dau",
    "name": "Cứng Đầu",
    "description": "Thủ tăng nhẹ; Linh căn nghiêng về Thổ.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "nguHanhBonus": {
        "tho": 1
      },
      "attributeChangePercent": {
        "physicalBody": 2
      }
    },
    "lore": "Tính tình cố chấp, vững như đá.",
    "story": "Tính tình cố chấp, vững như đá."
  },
  "sac_ben": {
    "id": "sac_ben",
    "name": "Sắc Bén",
    "description": "Công vật lý tăng nhẹ; Linh căn nghiêng về Kim.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "nguHanhBonus": {
        "kim": 1
      },
      "attributeChangePercent": {
        "physicalStrength": 2
      }
    },
    "lore": "Khí chất sắc bén như kim loại.",
    "story": "Khí chất sắc bén như kim loại."
  },
  "thu_sinh": {
    "id": "thu_sinh",
    "name": "Thư Sinh",
    "description": "Thần thức tăng khá; Công vật lý giảm nhẹ.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 3,
        "physicalStrength": -2
      }
    },
    "lore": "Dáng vẻ nho nhã, tinh thần tốt nhưng yếu ớt.",
    "story": "Dáng vẻ nho nhã, tinh thần tốt nhưng yếu ớt."
  },
  "hanh_hiep_truong_nghia": {
    "id": "hanh_hiep_truong_nghia",
    "name": "Hành Hiệp Trượng Nghĩa",
    "description": "Công vật lý tăng nhẹ; Thiên về thiện.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "amDuongBonus": {
        "chinh": 10
      },
      "attributeChangePercent": {
        "physicalStrength": 2
      }
    },
    "lore": "Thấy chuyện bất bình chẳng tha, khí khái hào hùng.",
    "story": "Thấy chuyện bất bình chẳng tha, khí khái hào hùng."
  },
  "tu_loi_vi_ban": {
    "id": "tu_loi_vi_ban",
    "name": "Tư Lợi Vi Bản",
    "description": "Ngộ tính tăng nhẹ; Mua đồ rẻ tăng nhẹ; Thiên về ác.",
    "rank": 2,
    "cost": 20,
    "effects": {
      "amDuongBonus": {
        "ta": 10
      },
      "attributeChangePercent": {
        "aptitude": 2
      }
    },
    "lore": "Luôn đặt lợi ích bản thân lên trên hết.",
    "story": "Luôn đặt lợi ích bản thân lên trên hết."
  },
  "thien_ly_nhan": {
    "id": "thien_ly_nhan",
    "name": "Thiên Lý Nhãn",
    "description": "Thần thức tăng khá; Phép thử tăng khá.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 5
      }
    },
    "lore": "Tầm nhìn xa, thần thức mạnh mẽ.",
    "story": "Tầm nhìn xa, thần thức mạnh mẽ."
  },
  "phong_hanh_giả": {
    "id": "phong_hanh_giả",
    "name": "Phong Hành Giả",
    "description": "Thân pháp tăng khá.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "agility": 5,
        "attackSpeed": 2
      }
    },
    "lore": "Thân nhẹ như yến, tốc độ hơn người.",
    "story": "Thân nhẹ như yến, tốc độ hơn người."
  },
  "dai_khi_van": {
    "id": "dai_khi_van",
    "name": "Đại Khí Vận",
    "description": "Chí mạng tăng nhẹ; Khí vận tăng khá.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "critChance": 4
      }
    },
    "lore": "Khí vận hơn người, thường gặp may mắn.",
    "story": "Khí vận hơn người, thường gặp may mắn."
  },
  "van_du_thien_ha": {
    "id": "van_du_thien_ha",
    "name": "Vân Du Thiên Hạ",
    "description": "Thân pháp tăng nhẹ; Thần thức tăng nhẹ.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "agility": 4,
        "spiritualSense": 2
      }
    },
    "lore": "Thích ngao du sơn thủy, thân pháp tốt.",
    "story": "Thích ngao du sơn thủy, thân pháp tốt."
  },
  "cuu_duong": {
    "id": "cuu_duong",
    "name": "Cửu Dương",
    "description": "Đòn đánh gây thiêu; Sát thương hệ Hỏa tăng khá; Linh căn nghiêng về Hỏa.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "hoa": 2
      }
    },
    "lore": "Thân thể phụ thuộc Hỏa, tăng khả năng Hỏa linh khí.",
    "story": "Thân thể phụ thuộc Hỏa, tăng khả năng Hỏa linh khí."
  },
  "nhuoc_thuy": {
    "id": "nhuoc_thuy",
    "name": "Nhược Thủy",
    "description": "Linh căn nghiêng về Thủy.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "thuy": 2
      }
    },
    "lore": "Thân thể phụ thuộc Thủy, tăng khả năng Thủy linh khí.",
    "story": "Thân thể phụ thuộc Thủy, tăng khả năng Thủy linh khí."
  },
  "at_moc": {
    "id": "at_moc",
    "name": "Ất Mộc",
    "description": "Linh căn nghiêng về Mộc.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "moc": 2
      }
    },
    "lore": "Thân thể phụ thuộc Mộc, tăng khả năng Mộc linh khí.",
    "story": "Thân thể phụ thuộc Mộc, tăng khả năng Mộc linh khí."
  },
  "canh_kim": {
    "id": "canh_kim",
    "name": "Canh Kim",
    "description": "Linh căn nghiêng về Kim.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "kim": 2
      }
    },
    "lore": "Thân thể phụ thuộc Kim, tăng khả năng Kim linh khí.",
    "story": "Thân thể phụ thuộc Kim, tăng khả năng Kim linh khí."
  },
  "hau_tho": {
    "id": "hau_tho",
    "name": "Hậu Thổ",
    "description": "Linh căn nghiêng về Thổ.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "tho": 2
      }
    },
    "lore": "Thân thể phụ thuộc Thổ, tăng khả năng Thổ linh khí.",
    "story": "Thân thể phụ thuộc Thổ, tăng khả năng Thổ linh khí."
  },
  "vo_si": {
    "id": "vo_si",
    "name": "Võ Sĩ",
    "description": "Công vật lý tăng nhẹ; Thân pháp tăng nhẹ.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 4,
        "agility": 2
      }
    },
    "lore": "Quen với việc rèn luyện thân thể.",
    "story": "Quen với việc rèn luyện thân thể."
  },
  "kiem_phach": {
    "id": "kiem_phach",
    "name": "Kiếm Phách",
    "description": "Công vật lý tăng nhẹ; Sát thương hệ Kim tăng khá; Linh căn nghiêng về Kim.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "kim": 2
      },
      "attributeChangePercent": {
        "physicalStrength": 5
      }
    },
    "lore": "Có thiên phú với kiếm đạo.",
    "story": "Có thiên phú với kiếm đạo."
  },
  "duoc_dong": {
    "id": "duoc_dong",
    "name": "Dược Đồng",
    "description": "Thần thức tăng khá; Linh căn nghiêng về Mộc, Hỏa.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "nguHanhBonus": {
        "moc": 1,
        "hoa": 1
      },
      "attributeChangePercent": {
        "spiritualSense": 4
      }
    },
    "lore": "Có khiếu làm luyện đan sư.",
    "story": "Có khiếu làm luyện đan sư."
  },
  "mi_cot": {
    "id": "mi_cot",
    "name": "Mị Cốt",
    "description": "Thần thức tăng khá; Mua đồ rẻ tăng khá.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 5
      }
    },
    "lore": "Trời sinh quyến rũ, dễ dàng thu phục lòng người.",
    "story": "Trời sinh quyến rũ, dễ dàng thu phục lòng người."
  },
  "tam_nhu_chi_thuy": {
    "id": "tam_nhu_chi_thuy",
    "name": "Tâm Như Chỉ Thủy",
    "description": "Đạo tâm tăng mạnh; Kháng tâm ma tăng mạnh; Thiên về thiện.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "amDuongBonus": {
        "chinh": 15
      },
      "primaryStatChangePercent": {
        "maxMentalState": 5
      }
    },
    "lore": "Lòng lặng như nước, không bị ngoại vật quấy nhiễu.",
    "story": "Lòng lặng như nước, không bị ngoại vật quấy nhiễu."
  },
  "tam_ma_xam_thuc": {
    "id": "tam_ma_xam_thuc",
    "name": "Tâm Ma Xâm Thực",
    "description": "Thần thức tăng khá; Đạo tâm giảm nhẹ; Thiên về ác.",
    "rank": 3,
    "cost": 30,
    "effects": {
      "amDuongBonus": {
        "ta": 20
      },
      "attributeChangePercent": {
        "spiritualSense": 5
      },
      "primaryStatChangePercent": {
        "maxMentalState": -4
      }
    },
    "lore": "Dễ bị cảm xúc tiêu cực chi phối, nhưng sức mạnh tinh thần bùng nổ.",
    "story": "Dễ bị cảm xúc tiêu cực chi phối, nhưng sức mạnh tinh thần bùng nổ."
  },
  "dai_tri_nhuoc_ngu": {
    "id": "dai_tri_nhuoc_ngu",
    "name": "Đại Trí Nhược Ngu",
    "description": "Ngộ tính tăng khá; Tu vi nhận thêm tăng khá.",
    "rank": 4,
    "cost": 40,
    "expPerTurn": 2,
    "effects": {
      "attributeChangePercent": {
        "aptitude": 8
      }
    },
    "lore": "Bề ngoài khờ khạo nhưng ngộ tính kinh người.",
    "story": "Bề ngoài khờ khạo nhưng ngộ tính kinh người."
  },
  "cuong_vong_tu_dai": {
    "id": "cuong_vong_tu_dai",
    "name": "Cuồng Vọng Tự Đại",
    "description": "Công vật lý tăng khá; ST chí mạng tăng khá; Thủ giảm nhẹ.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 8,
        "critDamage": 10,
        "physicalBody": -5
      }
    },
    "lore": "Kiêu ngạo, tấn công mạnh nhưng nhục thân yếu.",
    "story": "Kiêu ngạo, tấn công mạnh nhưng nhục thân yếu."
  },
  "dao_ma_chuyen_the": {
    "id": "dao_ma_chuyen_the",
    "name": "Đạo Ma Chuyển Thế",
    "description": "Công vật lý tăng khá; Công phép tăng khá; Thủ tăng khá.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 6,
        "magicPower": 6,
        "physicalBody": 6
      }
    },
    "lore": "Sở hữu tiềm năng của cả Đạo và Ma.",
    "story": "Sở hữu tiềm năng của cả Đạo và Ma."
  },
  "hon_nguyen_dao": {
    "id": "hon_nguyen_dao",
    "name": "Hỗn Nguyên Đạo",
    "description": "Linh căn nghiêng về ngũ hành; Ép thành Cực linh căn.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "nguHanhBonus": {
        "all": 2
      }
    },
    "lore": "Dung nạp ngũ hành, ép phẩm chất lên Cực Linh Căn.",
    "story": "Dung nạp ngũ hành, ép phẩm chất lên Cực Linh Căn."
  },
  "chinh_khi_lam_nhiet": {
    "id": "chinh_khi_lam_nhiet",
    "name": "Chính Khí Lẫm Liệt",
    "description": "Thủ tăng khá; Thiên về thiện.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "chinh": 20
      },
      "attributeChangePercent": {
        "physicalBody": 8
      }
    },
    "lore": "Một lòng hướng đạo, tà ma bất xâm.",
    "story": "Một lòng hướng đạo, tà ma bất xâm."
  },
  "ma_tinh_tham_tang": {
    "id": "ma_tinh_tham_tang",
    "name": "Ma Tính Thâm Tàng",
    "description": "Chí mạng tăng nhẹ; Thần thức tăng khá; Thiên về ác.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "ta": 20
      },
      "attributeChangePercent": {
        "critChance": 5,
        "spiritualSense": 5
      }
    },
    "lore": "Ngoài mặt bình thường nhưng tâm địa thâm sâu.",
    "story": "Ngoài mặt bình thường nhưng tâm địa thâm sâu."
  },
  "quy_nhan": {
    "id": "quy_nhan",
    "name": "Quỷ Nhãn",
    "description": "Thần thức tăng mạnh; Thiên về ác.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 8
      },
      "amDuongBonus": {
        "ta": 10
      }
    },
    "lore": "Đôi mắt nhìn thấu âm dương.",
    "story": "Đôi mắt nhìn thấu âm dương."
  },
  "phat_tu": {
    "id": "phat_tu",
    "name": "Phật Tử",
    "description": "Đạo tâm tăng khá; Thiên về thiện.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "chinh": 20
      },
      "primaryStatChangePercent": {
        "maxMentalState": 10
      }
    },
    "lore": "Có duyên với Phật pháp.",
    "story": "Có duyên với Phật pháp."
  },
  "huyet_ma": {
    "id": "huyet_ma",
    "name": "Huyết Ma",
    "description": "Công vật lý tăng khá; Thiên về ác.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "ta": 20
      },
      "attributeChangePercent": {
        "physicalStrength": 8
      }
    },
    "lore": "Thích máu tanh, thiên hướng tà đạo.",
    "story": "Thích máu tanh, thiên hướng tà đạo."
  },
  "diet_ma_chi_tam": {
    "id": "diet_ma_chi_tam",
    "name": "Diệt Ma Chi Tâm",
    "description": "Thân pháp tăng nhẹ; Thiên về thiện.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "chinh": 30,
        "ta": -10
      },
      "attributeChangePercent": {
        "attackSpeed": 5
      }
    },
    "lore": "Thề diệt hết ma quái trong thiên hạ, chấp niệm quá sâu.",
    "story": "Thề diệt hết ma quái trong thiên hạ, chấp niệm quá sâu."
  },
  "nhan_qua_dao": {
    "id": "nhan_qua_dao",
    "name": "Nhân Quả Đạo",
    "description": "Thần thức tăng mạnh.",
    "rank": 4,
    "cost": 40,
    "effects": {
      "amDuongBonus": {
        "chinh": 20,
        "ta": 20
      },
      "attributeChangePercent": {
        "spiritualSense": 10
      }
    },
    "lore": "Hiểu thấu nhân quả, thiện ác song hành.",
    "story": "Hiểu thấu nhân quả, thiện ác song hành."
  },
  "son_ha_xa_tac": {
    "id": "son_ha_xa_tac",
    "name": "Sơn Hà Xã Tắc",
    "description": "Thủ tăng khá; Khí huyết tăng khá; Linh căn nghiêng về Thổ, Mộc.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 12
      },
      "attributeChangePercent": {
        "physicalBody": 10
      },
      "nguHanhBonus": {
        "tho": 1,
        "moc": 1
      }
    },
    "lore": "Thân thể bền bỉ như đất, sức sống như cây.",
    "story": "Thân thể bền bỉ như đất, sức sống như cây."
  },
  "kiem_khi_truong_giang": {
    "id": "kiem_khi_truong_giang",
    "name": "Kiếm Khí Trường Giang",
    "description": "Công vật lý tăng khá; Công phép tăng khá; Linh căn nghiêng về Kim, Thủy.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 10,
        "magicPower": 10
      },
      "nguHanhBonus": {
        "kim": 1,
        "thuy": 1
      }
    },
    "lore": "Kiếm khí như nước chảy.",
    "story": "Kiếm khí như nước chảy."
  },
  "thuong_long_at_moc": {
    "id": "thuong_long_at_moc",
    "name": "Thương Long Ất Mộc",
    "description": "Thần thức tăng mạnh; Hồi khí huyết mỗi lượt tăng nhẹ; Linh lực tăng khá; Khí huyết tăng nhẹ; Linh căn nghiêng về Thủy, Mộc.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "primaryStatChangePercent": {
        "maxSpiritPower": 12,
        "maxStamina": 12
      },
      "attributeChangePercent": {
        "spiritualSense": 8,
        "hpRegen": 5
      },
      "nguHanhBonus": {
        "thuy": 1,
        "moc": 1
      }
    },
    "lore": "Sinh sôi nảy nở, hồi phục mạnh mẽ.",
    "story": "Sinh sôi nảy nở, hồi phục mạnh mẽ."
  },
  "chu_tuoc_phan_thien": {
    "id": "chu_tuoc_phan_thien",
    "name": "Chu Tước Phần Thiên",
    "description": "Công phép tăng khá; Chí mạng tăng khá; Sát thương hệ Hỏa tăng khá; Linh căn nghiêng về Mộc, Hỏa.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "magicPower": 12,
        "critChance": 8,
        "dmgFire": 10
      },
      "nguHanhBonus": {
        "moc": 1,
        "hoa": 1
      }
    },
    "lore": "Lửa bùng cháy, bạo phát mạnh mẽ.",
    "story": "Lửa bùng cháy, bạo phát mạnh mẽ."
  },
  "dia_tam_hoa_lien": {
    "id": "dia_tam_hoa_lien",
    "name": "Địa Tâm Hỏa Liên",
    "description": "Thủ tăng mạnh; Linh căn nghiêng về Hỏa, Thổ.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "physicalBody": 12,
        "counterDamage": 8
      },
      "nguHanhBonus": {
        "hoa": 1,
        "tho": 1
      }
    },
    "lore": "Sức chịu đựng và phản kích.",
    "story": "Sức chịu đựng và phản kích."
  },
  "tuyet_vuc_bang_tam": {
    "id": "tuyet_vuc_bang_tam",
    "name": "Tuyết Vực Băng Tâm",
    "description": "Thần thức tăng mạnh; Hộ tâm tăng mạnh; Đạo tâm tăng mạnh; Linh căn nghiêng về Thủy, Kim.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "primaryStatChangePercent": {
        "maxMentalState": 15
      },
      "attributeChangePercent": {
        "spiritualSense": 10,
        "critResist": 10
      },
      "nguHanhBonus": {
        "thuy": 1,
        "kim": 1
      }
    },
    "lore": "Tâm lặng như băng, kháng hiệu ứng.",
    "story": "Tâm lặng như băng, kháng hiệu ứng."
  },
  "phuong_hoang_niet_ban": {
    "id": "phuong_hoang_niet_ban",
    "name": "Phượng Hoàng Niết Bàn",
    "description": "Công phép tăng khá; Thân pháp tăng khá; Hồi khí huyết mỗi lượt tăng nhẹ; Thọ nguyên tăng mạnh; Linh căn nghiêng về Hỏa.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "primaryStatChangePercent": {
        "lifespan": 15
      },
      "attributeChangePercent": {
        "magicPower": 10,
        "agility": 8,
        "attackSpeed": 5,
        "hpRegen": 10
      },
      "nguHanhBonus": {
        "hoa": 2
      }
    },
    "lore": "Tuổi thọ cao, thiên phú hỏa pháp.",
    "story": "Tuổi thọ cao, thiên phú hỏa pháp."
  },
  "loi_dinh_ba": {
    "id": "loi_dinh_ba",
    "name": "Lôi Đình Bá",
    "description": "Công vật lý tăng khá; ST chí mạng tăng mạnh; Sát thương hệ Lôi tăng khá; Linh căn hóa Lôi (biến dị).",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 12,
        "critDamage": 15,
        "dmgLightning": 10
      }
    },
    "lore": "Thân thể chứa lôi đình. Tự động kích hoạt Lôi Linh Căn.",
    "story": "Thân thể chứa lôi đình."
  },
  "bang_tam_ngoc_cot": {
    "id": "bang_tam_ngoc_cot",
    "name": "Băng Tâm Ngọc Cốt",
    "description": "Công phép tăng khá; Thủ tăng khá; Linh căn hóa Băng (biến dị).",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "magicPower": 10,
        "physicalBody": 10
      }
    },
    "lore": "Cốt tủy băng giá. Tự động kích hoạt Băng Linh Căn.",
    "story": "Cốt tủy băng giá."
  },
  "huyen_anh_phong_than": {
    "id": "huyen_anh_phong_than",
    "name": "Huyễn Ảnh Phong Thân",
    "description": "Thân pháp tăng mạnh; Né tránh tăng rất mạnh; Linh căn hóa Phong (biến dị).",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "agility": 12,
        "attackSpeed": 8,
        "evasion": 8
      }
    },
    "lore": "Thân như gió. Tự động kích hoạt Phong Linh Căn.",
    "story": "Thân như gió."
  },
  "bang_phach": {
    "id": "bang_phach",
    "name": "Băng Phách",
    "description": "Công phép tăng khá; Sát thương hệ Băng tăng khá; Linh căn hóa Băng (biến dị).",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "magicPower": 12,
        "dmgIce": 10
      }
    },
    "lore": "Linh hồn lạnh giá, ép linh căn thành Băng dị chủng.",
    "story": "Linh hồn lạnh giá, ép linh căn thành Băng dị chủng."
  },
  "phong_than": {
    "id": "phong_than",
    "name": "Phong Thần",
    "description": "Thân pháp tăng khá; Sát thương hệ Phong tăng khá; Linh căn hóa Phong (biến dị).",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "agility": 12,
        "dmgWind": 10
      }
    },
    "lore": "Con của gió, ép linh căn thành Phong dị chủng.",
    "story": "Con của gió, ép linh căn thành Phong dị chủng."
  },
  "thien_sat_co_tinh": {
    "id": "thien_sat_co_tinh",
    "name": "Thiên Sát Cô Tinh",
    "description": "Công vật lý tăng mạnh; Thủ giảm khá; Chí mạng tăng khá; Thọ nguyên tăng khá.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 15,
        "physicalBody": -8,
        "critChance": 10,
        "armorPen": 10
      },
      "primaryStatChangePercent": {
        "lifespan": 10
      }
    },
    "lore": "Số phận cô độc, khắc người thân nhưng sức mạnh vượt trội.",
    "story": "Số phận cô độc, khắc người thân nhưng sức mạnh vượt trội."
  },
  "hao_nhien_chinh_khi": {
    "id": "hao_nhien_chinh_khi",
    "name": "Hạo Nhiên Chính Khí",
    "description": "Thủ tăng khá; Thần thức tăng mạnh; Hộ tâm tăng mạnh; Thiên về thiện.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "amDuongBonus": {
        "chinh": 50,
        "ta": -20
      },
      "attributeChangePercent": {
        "physicalBody": 12,
        "spiritualSense": 10,
        "critResist": 10
      }
    },
    "lore": "Chính khí ngút trời, tà ma tránh xa.",
    "story": "Chính khí ngút trời, tà ma tránh xa."
  },
  "vo_tinh_sat_dao": {
    "id": "vo_tinh_sat_dao",
    "name": "Vô Tình Sát Đạo",
    "description": "ST chí mạng tăng mạnh; Công vật lý tăng mạnh; Thiên về ác.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "amDuongBonus": {
        "ta": 50,
        "chinh": -20
      },
      "attributeChangePercent": {
        "critDamage": 20,
        "physicalStrength": 12,
        "armorPen": 10
      }
    },
    "lore": "Diệt tuyệt thất tình lục dục, chỉ còn sát đạo.",
    "story": "Diệt tuyệt thất tình lục dục, chỉ còn sát đạo."
  },
  "ta_than_nghich_tu": {
    "id": "ta_than_nghich_tu",
    "name": "Tà Thần Nghịch Tử",
    "description": "Công phép tăng mạnh; Hút máu tăng nhẹ; Thiên về ác.",
    "rank": 5,
    "cost": 50,
    "effects": {
      "amDuongBonus": {
        "ta": 40,
        "chinh": -40
      },
      "attributeChangePercent": {
        "magicPower": 15,
        "lifeSteal": 10
      }
    },
    "lore": "Kẻ phản nghịch, chà đạp luân thường đạo lý.",
    "story": "Kẻ phản nghịch, chà đạp luân thường đạo lý."
  },
  "thien_menh_chi_tu": {
    "id": "thien_menh_chi_tu",
    "name": "Thiên Mệnh Chi Tử",
    "description": "Công vật lý tăng mạnh; Công phép tăng mạnh; Thủ tăng rất mạnh; Thân pháp tăng mạnh; Thần thức tăng rất mạnh; Ngộ tính tăng rất mạnh; Tu vi nhận thêm tăng khá; Linh căn nghiêng về ngũ hành.",
    "rank": 6,
    "cost": 80,
    "expPerTurn": 3,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 20,
        "magicPower": 20,
        "physicalBody": 20,
        "agility": 15,
        "spiritualSense": 20,
        "aptitude": 20,
        "attackSpeed": 10,
        "damageReduction": 10,
        "armorPen": 10
      },
      "nguHanhBonus": {
        "all": 3
      }
    },
    "lore": "Kẻ được thiên mệnh ưu ái, tư chất toàn diện.",
    "story": "Kẻ được thiên mệnh ưu ái, tư chất toàn diện."
  },
  "ngu_hanh_hop_nhat": {
    "id": "ngu_hanh_hop_nhat",
    "name": "Ngũ Hành Hợp Nhất",
    "description": "Công phép tăng mạnh; Ngộ tính tăng rất mạnh; Linh căn nghiêng về ngũ hành; Ép thành Cực linh căn.",
    "rank": 6,
    "cost": 60,
    "effects": {
      "nguHanhBonus": {
        "all": 2
      },
      "attributeChangePercent": {
        "magicPower": 25,
        "aptitude": 25
      }
    },
    "lore": "Ngũ hành tương sinh, ép phẩm chất thành Cực Linh Căn.",
    "story": "Ngũ hành tương sinh, ép phẩm chất thành Cực Linh Căn."
  },
  "loi_than_giang_the": {
    "id": "loi_than_giang_the",
    "name": "Lôi Thần Giáng Thế",
    "description": "Công vật lý tăng mạnh; ST chí mạng tăng rất mạnh; Thân pháp tăng khá; Sát thương hệ Lôi tăng mạnh; Linh căn hóa Lôi (biến dị).",
    "rank": 6,
    "cost": 70,
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 25,
        "critDamage": 30,
        "attackSpeed": 15,
        "dmgLightning": 20
      }
    },
    "lore": "Hóa thân của sấm sét, ép linh căn thành Lôi dị chủng cực phẩm.",
    "story": "Hóa thân của sấm sét, ép linh căn thành Lôi dị chủng cực phẩm."
  },
  "van_khi_nghich_thien": {
    "id": "van_khi_nghich_thien",
    "name": "Vận Khí Nghịch Thiên",
    "description": "Chí mạng tăng mạnh; Né tránh tăng rất mạnh; Khí vận tăng mạnh.",
    "rank": 6,
    "cost": 80,
    "effects": {
      "attributeChangePercent": {
        "critChance": 15,
        "evasion": 15
      }
    },
    "lore": "May mắn đến mức nghịch thiên, đi đường cũng nhặt được bảo vật.",
    "story": "May mắn đến mức nghịch thiên, đi đường cũng nhặt được bảo vật."
  },
  "nguoi_xuyen_viet": {
    "id": "nguoi_xuyen_viet",
    "name": "Người Xuyên Việt",
    "description": "Ngộ tính tăng rất mạnh; Thần thức tăng rất mạnh; Đạo tâm tăng rất mạnh.",
    "rank": 6,
    "cost": 60,
    "effects": {
      "primaryStatChangePercent": {
        "maxMentalState": 30
      },
      "attributeChangePercent": {
        "aptitude": 25,
        "spiritualSense": 25
      }
    },
    "lore": "Linh hồn đến từ thế giới khác, tâm trí kiên định, kiến thức rộng mở.",
    "story": "Linh hồn đến từ thế giới khác, tâm trí kiên định, kiến thức rộng mở."
  },
  "thien_ma_hang_the": {
    "id": "thien_ma_hang_the",
    "name": "Thiên Ma Hàng Thế",
    "description": "Công phép tăng mạnh; Thần thức tăng rất mạnh; Hút máu tăng khá; Công vật lý tăng khá; Thiên về ác.",
    "rank": 6,
    "cost": 80,
    "effects": {
      "amDuongBonus": {
        "ta": 80,
        "chinh": -50
      },
      "attributeChangePercent": {
        "magicPower": 25,
        "spiritualSense": 20,
        "lifeSteal": 15,
        "armorPen": 15
      }
    },
    "lore": "Ma chủ tái sinh, vạn ma thần phục.",
    "story": "Ma chủ tái sinh, vạn ma thần phục."
  }
};
