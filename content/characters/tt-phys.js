// Nguồn chuẩn của TT_PHYS. description chỉ mô tả tác dụng thật; story dùng cho truyện, lore giữ lời tựa nhập.
const TT_PHYS=[
  {
    "id": "hon_don_the",
    "name": "Hỗn Độn Đạo Thể",
    "rank": 6,
    "description": "Công vật lý tăng mạnh; Công phép tăng mạnh; Thủ tăng rất mạnh; Thân pháp tăng mạnh; Thần thức tăng rất mạnh; Ngộ tính tăng rất mạnh; Chí mạng tăng khá; ST chí mạng tăng mạnh; Né tránh tăng rất mạnh; Hộ tâm tăng mạnh; Khí huyết tăng mạnh; Linh lực tăng mạnh; Đạo tâm tăng mạnh; Thọ nguyên tăng mạnh; Tu vi nhận thêm tăng mạnh.",
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 20,
        "maxSpiritPower": 20,
        "maxStamina": 20,
        "maxMentalState": 15,
        "lifespan": 15
      },
      "attributeChangePercent": {
        "physicalStrength": 20,
        "magicPower": 20,
        "physicalBody": 20,
        "agility": 15,
        "spiritualSense": 20,
        "aptitude": 20,
        "critChance": 10,
        "critDamage": 20,
        "damageReduction": 10,
        "armorPen": 10,
        "evasion": 10,
        "critResist": 10
      },
      "expPerTurn": 20
    },
    "lore": "Vạn cổ đệ nhất thể chất. Dung nạp vạn vật, chuyển hóa ngũ hành, phá vỡ mọi quy tắc. Cần có đại cơ duyên \"Hỗn Nguyên Đạo\" để dung hợp ngũ hành tạp loạn thành hỗn độn chi lực.",
    "story": "Vạn cổ đệ nhất thể chất."
  },
  {
    "id": "hoang_co_thanh_the",
    "name": "Hoang Cổ Thánh Thể",
    "rank": 6,
    "description": "Thủ tăng rất mạnh; Công vật lý tăng mạnh; ST chí mạng tăng mạnh; Hộ tâm tăng rất mạnh; Khí huyết tăng rất mạnh; Tu vi nhận thêm tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 25,
        "maxStamina": 20
      },
      "attributeChangePercent": {
        "physicalBody": 25,
        "physicalStrength": 20,
        "critDamage": 15,
        "damageReduction": 15,
        "critResist": 15
      },
      "expPerTurn": 5
    },
    "lore": "Thể chất cái thế của Nhân tộc, nhục thân vô địch, máu huyết vàng ròng. Khắc chế mọi tà ma ngoại đạo, vạn pháp bất xâm. Yêu cầu tâm tính quang minh chính đại.",
    "story": "Thể chất cái thế của Nhân tộc, nhục thân vô địch, máu huyết vàng ròng."
  },
  {
    "id": "tien_thien_dao_thai",
    "name": "Tiên Thiên Đạo Thai",
    "rank": 6,
    "description": "Công phép tăng mạnh; Thần thức tăng rất mạnh; Ngộ tính tăng rất mạnh; Linh lực tăng mạnh; Đạo tâm tăng rất mạnh; Tu vi nhận thêm tăng mạnh.",
    "effects": {
      "primaryStatChangePercent": {
        "maxSpiritPower": 25,
        "maxMentalState": 20
      },
      "attributeChangePercent": {
        "magicPower": 20,
        "spiritualSense": 25,
        "aptitude": 25
      },
      "expPerTurn": 25
    },
    "lore": "Con cưng của đại đạo, sinh ra đã hòa hợp với thiên địa. Ngộ tính nghịch thiên, tu luyện pháp thuật như uống nước. Tâm cảnh luôn ở trạng thái \"Minh Kính Chỉ Thủy\".",
    "story": "Con cưng của đại đạo, sinh ra đã hòa hợp với thiên địa."
  },
  {
    "id": "van_co_ma_the",
    "name": "Vạn Cổ Ma Thể",
    "rank": 6,
    "description": "Công vật lý tăng rất mạnh; Công phép tăng mạnh; Chí mạng tăng mạnh; ST chí mạng tăng rất mạnh; Thủ giảm khá; Hút máu tăng nhẹ; Đạo tâm giảm mạnh.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 25,
        "magicPower": 15,
        "critChance": 15,
        "critDamage": 30,
        "physicalBody": -10,
        "lifeSteal": 10,
        "armorPen": 10
      },
      "primaryStatChangePercent": {
        "maxMentalState": -15
      }
    },
    "lore": "Thể chất cấm kỵ của Ma Đạo. Lấy oán khí làm thức ăn, lấy sát lục làm đường tu. Tâm tính vặn vẹo, tàn nhẫn nhưng sức mạnh hủy thiên diệt địa.",
    "story": "Thể chất cấm kỵ của Ma Đạo."
  },
  {
    "id": "cuu_khieu_linh_lung",
    "name": "Cửu Khiếu Linh Lung Thể",
    "rank": 6,
    "description": "Thần thức tăng rất mạnh; Ngộ tính tăng rất mạnh; Đạo tâm tăng rất mạnh.",
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 30,
        "aptitude": 25
      },
      "primaryStatChangePercent": {
        "maxMentalState": 25
      }
    },
    "lore": "Trái tim có chín lỗ, thấu hiểu vạn vật, nhìn thấu hồng trần. Trí tuệ siêu phàm, có khả năng suy diễn thiên cơ.",
    "story": "Trái tim có chín lỗ, thấu hiểu vạn vật, nhìn thấu hồng trần."
  },
  {
    "id": "thuong_thien_ba_the",
    "name": "Thương Thiên Bá Thể",
    "rank": 5,
    "description": "Công vật lý tăng mạnh; Thủ tăng mạnh; Chí mạng tăng khá; Khí huyết tăng mạnh.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 12,
        "physicalBody": 12,
        "critChance": 8,
        "armorPen": 8,
        "damageReduction": 5
      },
      "primaryStatChangePercent": {
        "maxHp": 15
      }
    },
    "lore": "Bá đạo vô song, lấy chiến nuôi chiến. Tính cách cuồng ngạo, không chịu khuất phục.",
    "story": "Bá đạo vô song, lấy chiến nuôi chiến."
  },
  {
    "id": "thai_duong_the",
    "name": "Thái Dương Thần Thể",
    "rank": 5,
    "description": "Công phép tăng khá; Công vật lý tăng khá; Sát thương hệ Hỏa tăng mạnh; Linh lực tăng mạnh.",
    "effects": {
      "attributeChangePercent": {
        "magicPower": 12,
        "physicalStrength": 8,
        "dmgFire": 15
      },
      "primaryStatChangePercent": {
        "maxSpiritPower": 15
      }
    },
    "lore": "Chí dương chí cương, như mặt trời ban trưa. Yêu cầu Hỏa linh căn cực thịnh và tâm tính hướng dương.",
    "story": "Chí dương chí cương, như mặt trời ban trưa."
  },
  {
    "id": "thai_am_the",
    "name": "Thái Âm Ngọc Thể",
    "rank": 5,
    "description": "Công phép tăng khá; Thần thức tăng mạnh; Linh lực tăng mạnh.",
    "effects": {
      "attributeChangePercent": {
        "magicPower": 12,
        "spiritualSense": 10
      },
      "primaryStatChangePercent": {
        "maxSpiritPower": 15
      }
    },
    "lore": "Chí âm chí hàn, như trăng lạnh lẽo. Yêu cầu Thủy linh căn cực thịnh và tâm tính lãnh đạm.",
    "story": "Chí âm chí hàn, như trăng lạnh lẽo."
  },
  {
    "id": "thien_yeu_the",
    "name": "Thiên Yêu Hoàng Thể",
    "rank": 5,
    "description": "Thân pháp tăng mạnh; Thủ tăng khá; Né tránh tăng rất mạnh; Hồi khí huyết mỗi lượt tăng nhẹ; Khí huyết tăng mạnh.",
    "effects": {
      "attributeChangePercent": {
        "agility": 12,
        "physicalBody": 10,
        "attackSpeed": 10,
        "evasion": 10,
        "hpRegen": 10
      },
      "primaryStatChangePercent": {
        "maxHp": 15,
        "maxStamina": 15
      }
    },
    "lore": "Thể chất của Yêu tộc hoàng giả. Tốc độ và sức mạnh kinh người, thường xuất hiện ở người có tính cách hoang dã.",
    "story": "Thể chất của Yêu tộc hoàng giả."
  },
  {
    "id": "loi_dinh_chien_the",
    "name": "Lôi Đình Chiến Thể",
    "rank": 5,
    "description": "Công vật lý tăng khá; Công phép tăng khá; ST chí mạng tăng mạnh; Thân pháp tăng khá; Sát thương hệ Lôi tăng mạnh.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 12,
        "magicPower": 8,
        "critDamage": 15,
        "attackSpeed": 10,
        "dmgLightning": 15
      }
    },
    "lore": "Thân thể như lôi điện, bộc phát sức mạnh hủy diệt trong nháy mắt. Cần có dị linh căn Lôi.",
    "story": "Thân thể như lôi điện, bộc phát sức mạnh hủy diệt trong nháy mắt."
  },
  {
    "id": "hu_khong_chi_the",
    "name": "Hư Không Chi Thể",
    "rank": 5,
    "description": "Thân pháp tăng mạnh; Thần thức tăng mạnh; Né tránh tăng rất mạnh; Khí huyết giảm nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "agility": 15,
        "spiritualSense": 10,
        "evasion": 15
      },
      "primaryStatChangePercent": {
        "maxStamina": -8
      }
    },
    "lore": "Hòa mình vào hư không, xuất quỷ nhập thần. Cần tâm tính tự do, không bị trói buộc.",
    "story": "Hòa mình vào hư không, xuất quỷ nhập thần."
  },
  {
    "id": "duoc_linh_thanh_the",
    "name": "Dược Linh Thánh Thể",
    "rank": 5,
    "description": "Thủ tăng khá; Hồi khí huyết mỗi lượt tăng nhẹ; Khí huyết tăng mạnh; Thọ nguyên tăng mạnh; Tu vi nhận thêm tăng khá.",
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 15,
        "lifespan": 15
      },
      "attributeChangePercent": {
        "physicalBody": 10,
        "hpRegen": 15
      },
      "expPerTurn": 10
    },
    "lore": "Cơ thể là lò luyện đan sống, bách độc bất xâm, hấp thu đan dược không để lại tạp chất.",
    "story": "Cơ thể là lò luyện đan sống, bách độc bất xâm, hấp thu đan dược không để lại tạp chất."
  },
  {
    "id": "ngu_hanh_linh_the",
    "name": "Ngũ Hành Linh Thể",
    "rank": 4,
    "description": "Ngộ tính tăng khá; Công phép tăng khá; Tu vi nhận thêm tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "aptitude": 8,
        "magicPower": 6
      },
      "expPerTurn": 10
    },
    "lore": "Ngũ hành cân bằng, sinh sinh bất tức. Tuy không bá đạo nhưng đường tu vững chắc.",
    "story": "Ngũ hành cân bằng, sinh sinh bất tức."
  },
  {
    "id": "vo_cau_kiem_the",
    "name": "Vô Cấu Kiếm Thể",
    "rank": 4,
    "description": "Công vật lý tăng khá; ST chí mạng tăng khá; Thân pháp tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 8,
        "critDamage": 8,
        "attackSpeed": 5,
        "armorPen": 6
      }
    },
    "lore": "Trời sinh kiếm cốt, tâm như kiếm sắc. Sát thương kiếm pháp tăng mạnh.",
    "story": "Trời sinh kiếm cốt, tâm như kiếm sắc."
  },
  {
    "id": "huyet_sat_ma_the",
    "name": "Huyết Sát Ma Thể",
    "rank": 4,
    "description": "Công vật lý tăng khá; Chí mạng tăng nhẹ; Hút máu tăng nhẹ; Đạo tâm giảm khá.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 6,
        "critChance": 5,
        "lifeSteal": 5
      },
      "primaryStatChangePercent": {
        "maxMentalState": -5
      }
    },
    "lore": "Thích giết chóc, lấy máu nuôi thân. Càng giết nhiều sát khí càng nặng.",
    "story": "Thích giết chóc, lấy máu nuôi thân."
  },
  {
    "id": "bang_co_ngoc_cot",
    "name": "Băng Cơ Ngọc Cốt",
    "rank": 4,
    "description": "Thủ tăng khá; Thần thức tăng mạnh; Sát thương hệ Băng tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "physicalBody": 6,
        "spiritualSense": 8,
        "dmgIce": 8
      }
    },
    "lore": "Da như băng tuyết, xương như ngọc. Kháng hàn, tăng cường thần thức.",
    "story": "Da như băng tuyết, xương như ngọc."
  },
  {
    "id": "tat_phong_linh_the",
    "name": "Tật Phong Linh Thể",
    "rank": 4,
    "description": "Thân pháp tăng mạnh; Né tránh tăng mạnh; Sát thương hệ Phong tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "agility": 10,
        "attackSpeed": 5,
        "evasion": 5,
        "dmgWind": 8
      }
    },
    "lore": "Thân nhẹ như gió, đi lại vô hình. Tốc độ là sở trường tuyệt đối.",
    "story": "Thân nhẹ như gió, đi lại vô hình."
  },
  {
    "id": "cuu_duong_chi_the",
    "name": "Cửu Dương Chi Thể",
    "rank": 4,
    "description": "Công phép tăng khá; Công vật lý tăng nhẹ; Sát thương hệ Hỏa tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "magicPower": 8,
        "physicalStrength": 5,
        "dmgFire": 8
      }
    },
    "lore": "Dương khí dồi dào, khắc chế âm tà, tu luyện hỏa pháp cực nhanh.",
    "story": "Dương khí dồi dào, khắc chế âm tà, tu luyện hỏa pháp cực nhanh."
  },
  {
    "id": "huyen_am_chi_the",
    "name": "Huyền Âm Chi Thể",
    "rank": 4,
    "description": "Công phép tăng khá; Thần thức tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "magicPower": 8,
        "spiritualSense": 5
      }
    },
    "lore": "Âm khí cực thịnh, thích hợp làm lô đỉnh hoặc tu luyện mị thuật, âm công.",
    "story": "Âm khí cực thịnh, thích hợp làm lô đỉnh hoặc tu luyện mị thuật, âm công."
  },
  {
    "id": "kim_cuong_bat_hoai",
    "name": "Kim Cương Bất Hoại",
    "rank": 3,
    "description": "Thủ tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "physicalBody": 5,
        "damageReduction": 4,
        "counterDamage": 4
      }
    },
    "lore": "Thân thể cứng như kim cương, đao thương bất nhập ở mức độ nhất định.",
    "story": "Thân thể cứng như kim cương, đao thương bất nhập ở mức độ nhất định."
  },
  {
    "id": "moc_linh_chi_the",
    "name": "Mộc Linh Chi Thể",
    "rank": 3,
    "description": "Thủ tăng nhẹ; Khí huyết tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "maxHp": 5
      },
      "attributeChangePercent": {
        "physicalBody": 4
      }
    },
    "lore": "Thân thiện với cây cỏ, hồi phục sinh lực nhanh.",
    "story": "Thân thiện với cây cỏ, hồi phục sinh lực nhanh."
  },
  {
    "id": "am_sat_the",
    "name": "Ám Sát Thể",
    "rank": 3,
    "description": "Thân pháp tăng nhẹ; Chí mạng tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "agility": 5,
        "critChance": 4
      }
    },
    "lore": "Thích hợp đi trong bóng tối, giỏi che giấu khí tức.",
    "story": "Thích hợp đi trong bóng tối, giỏi che giấu khí tức."
  },
  {
    "id": "cuong_chien_the",
    "name": "Cuồng Chiến Thể",
    "rank": 3,
    "description": "Công vật lý tăng nhẹ; Thủ tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 5,
        "physicalBody": 4
      }
    },
    "lore": "Càng đánh càng hăng, máu càng ít đánh càng đau. Tính cách nóng nảy.",
    "story": "Càng đánh càng hăng, máu càng ít đánh càng đau."
  },
  {
    "id": "tho_linh_the",
    "name": "Thổ Linh Chi Thể",
    "rank": 3,
    "description": "Thủ tăng nhẹ; Khí huyết tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "maxStamina": 5
      },
      "attributeChangePercent": {
        "physicalBody": 5
      }
    },
    "lore": "Sức chịu đựng cao, chân đạp đất thì sức mạnh vô cùng.",
    "story": "Sức chịu đựng cao, chân đạp đất thì sức mạnh vô cùng."
  },
  {
    "id": "thuy_linh_the",
    "name": "Thủy Linh Chi Thể",
    "rank": 3,
    "description": "Công phép tăng nhẹ; Linh lực tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "maxSpiritPower": 5
      },
      "attributeChangePercent": {
        "magicPower": 4
      }
    },
    "lore": "Linh lực dẻo dai, bền bỉ, thiên về công pháp hệ Thủy.",
    "story": "Linh lực dẻo dai, bền bỉ, thiên về công pháp hệ Thủy."
  },
  {
    "id": "hoa_linh_the",
    "name": "Hỏa Linh Chi Thể",
    "rank": 3,
    "description": "Công phép tăng nhẹ; Chí mạng tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "magicPower": 5,
        "critChance": 3
      }
    },
    "lore": "Sức công phá mạnh, thiên về công pháp hệ Hỏa.",
    "story": "Sức công phá mạnh, thiên về công pháp hệ Hỏa."
  },
  {
    "id": "kim_linh_the",
    "name": "Kim Linh Chi Thể",
    "rank": 3,
    "description": "Công vật lý tăng nhẹ; Thủ tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 4,
        "physicalBody": 4
      }
    },
    "lore": "Thân thể cứng cáp, thiên về công pháp hệ Kim.",
    "story": "Thân thể cứng cáp, thiên về công pháp hệ Kim."
  },
  {
    "id": "man_luc_the",
    "name": "Man Hoang Lực Thể",
    "rank": 2,
    "description": "Công vật lý tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 3
      }
    },
    "lore": "Sức mạnh cơ bắp hơn người thường một chút.",
    "story": "Sức mạnh cơ bắp hơn người thường một chút."
  },
  {
    "id": "thong_tue_the",
    "name": "Thông Tuệ Thể",
    "rank": 2,
    "description": "Ngộ tính tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "aptitude": 3
      }
    },
    "lore": "Đầu óc linh hoạt, học tập nhanh hơn.",
    "story": "Đầu óc linh hoạt, học tập nhanh hơn."
  },
  {
    "id": "kien_nhan_the",
    "name": "Kiên Nhan Thể",
    "rank": 2,
    "description": "Khí huyết tăng nhẹ; Đạo tâm tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "maxStamina": 3,
        "maxMentalState": 3
      }
    },
    "lore": "Sức chịu đựng dẻo dai, không dễ bỏ cuộc.",
    "story": "Sức chịu đựng dẻo dai, không dễ bỏ cuộc."
  },
  {
    "id": "linh_cam_the",
    "name": "Linh Cảm Thể",
    "rank": 2,
    "description": "Thần thức tăng khá.",
    "effects": {
      "attributeChangePercent": {
        "spiritualSense": 3
      }
    },
    "lore": "Giác quan nhạy bén hơn người thường.",
    "story": "Giác quan nhạy bén hơn người thường."
  },
  {
    "id": "truong_tho_the",
    "name": "Trường Thọ Thể",
    "rank": 2,
    "description": "Thọ nguyên tăng nhẹ; Khí huyết tăng nhẹ.",
    "effects": {
      "primaryStatChangePercent": {
        "lifespan": 3,
        "maxHp": 3
      }
    },
    "lore": "Sống lâu hơn người thường, ít bệnh tật.",
    "story": "Sống lâu hơn người thường, ít bệnh tật."
  },
  {
    "id": "pham_the",
    "name": "Phàm Thể",
    "rank": 1,
    "description": "Công vật lý tăng nhẹ; Công phép tăng nhẹ; Thủ tăng nhẹ; Thân pháp tăng nhẹ; Thần thức tăng nhẹ; Ngộ tính tăng nhẹ.",
    "effects": {
      "attributeChangePercent": {
        "physicalStrength": 1,
        "magicPower": 1,
        "physicalBody": 1,
        "agility": 1,
        "spiritualSense": 1,
        "aptitude": 1
      }
    },
    "lore": "Thân thể người thường, cân bằng, không có gì đặc sắc.",
    "story": "Thân thể người thường, cân bằng, không có gì đặc sắc."
  }
];
