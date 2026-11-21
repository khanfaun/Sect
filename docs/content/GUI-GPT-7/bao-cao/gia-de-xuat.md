# Đề xuất giá cả Phù Sinh

Đối chiếu nhánh Claude tại commit `6ecc6cd`. Bảng dùng **xu** cho giá phàm và **linh thạch Hạ phẩm cơ sở** cho giá tu sĩ. Khi mua qua cơ chế `price()`, game còn nhân hệ số theo tầng người chơi và áp dụng giảm giá phù hợp. Một số cửa hàng tính thêm nhu cầu địa phương. Cột giá đề xuất là giá cần thử trước các hệ số đó, trừ khi hàng ghi rõ giá tới tay người chơi.

Mốc so sánh từ `content/rules/tien.js`, `an-uong.js` và `content/venues/viec-thue.js`. Một lượng bạc là 1.000 xu, một lượng vàng là 10.000 xu. Một linh thạch Hạ phẩm có giá trị **quy ước** 1.000.000 xu, khác với giá trả thay trong từng dịch vụ. Bốc vác trả 18–22 xu cho 8 giờ, gánh nước 9–11 xu cho 6 giờ, làm ruộng 25–29 xu cho 10 giờ và có cơm. Với giá ăn thường 20 xu, một ca bốc vác chỉ vừa đủ nuôi người ngày đó. Nhà nghèo khởi đầu 150–300 xu, nhóm khá giả 5.000–20.000 xu.

## Đan và phù

Đối chiếu từng mục danh mục với món cùng hiệu ứng, nhóm lưu hành, điều kiện dùng và cùng loại hộ mệnh hay trợ kiếp. Nếu một món rẻ hơn ít nhất khoảng một phần năm và có hiệu lực ngang hoặc cao hơn, đề xuất hạ mức giá về khoảng giá của món đó. Mức giữ nguyên là mốc thử, vì chênh giá còn có thể đến từ nguồn hàng hay độ hiếm. Giá hồi phục tính theo phần trăm, do đó một món bán ở tầng thấp vẫn có thể hữu dụng khi khí huyết tối đa tăng.

| Tệp | Mã | Tên | Giá hiện tại | Giá đề xuất | Lý do |
|---|---|---|---:|---:|---|
| content/catalog/pills.json | dan_loi_diep_hoi_mach_dan | Lôi Diệp Hồi Mạch Đan | 33 | 33 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_sa_tuy_hoi_mach_dan | Sa Tủy Hồi Mạch Đan | 29 | 20 | Cùng nhóm dùng, Tịnh Đăng Hồi Mạch Đan giá 19 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_tinh_dang_hoi_mach_dan | Tịnh Đăng Hồi Mạch Đan | 19 | 19 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_moc_mien_hoi_mach_dan | Mộc Miên Hồi Mạch Đan | 95 | 80 | Cùng nhóm dùng, Hồn Đăng Hồi Mạch Đan giá 76 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_mai_ngoi_hoi_mach_dan | Mái Ngói Hồi Mạch Đan | 96 | 96 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hon_dang_hoi_mach_dan | Hồn Đăng Hồi Mạch Đan | 76 | 76 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bach_lang_hoi_mach_dan | Bạch Lãng Hồi Mạch Đan | 176 | 176 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hoa_tuy_hoi_mach_dan | Hỏa Tủy Hồi Mạch Đan | 194 | 194 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_chim_von_hoi_mach_dan | Chim Vờn Hồi Mạch Đan | 165 | 165 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bang_vu_hoi_mach_dan | Băng Vũ Hồi Mạch Đan | 641 | 641 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_cuong_mat_hoi_mach_dan | Cương Mạt Hồi Mạch Đan | 831 | 595 | Cùng nhóm dùng, Bách Thực Hồi Mạch Đan giá 595 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_bach_thuc_hoi_mach_dan | Bách Thực Hồi Mạch Đan | 595 | 595 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tan_dang_hoi_mach_dan | Tàn Đăng Hồi Mạch Đan | 1.815 | 1.815 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_han_mac_hoi_mach_dan | Hàn Mặc Hồi Mạch Đan | 1.389 | 1.389 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_vu_tinh_hoan_linh_dan | Vũ Tinh Hoàn Linh Đan | 21 | 21 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_dien_tuy_hoan_linh_dan | Điện Tủy Hoàn Linh Đan | 29 | 25 | Cùng nhóm dùng, Vũ Tinh Hoàn Linh Đan giá 21 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_hon_dang_hoan_linh_dan | Hồn Đăng Hoàn Linh Đan | 30 | 25 | Cùng nhóm dùng, Vũ Tinh Hoàn Linh Đan giá 21 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_day_gai_hoan_linh_dan | Dây Gai Hoàn Linh Đan | 62 | 62 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_kim_tuoc_hoan_linh_dan | Kim Tước Hoàn Linh Đan | 61 | 61 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_suong_dong_hoan_linh_dan | Sương Đóng Hoàn Linh Đan | 66 | 66 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tan_tinh_hoan_linh_dan | Tẫn Tinh Hoàn Linh Đan | 171 | 171 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_dang_sa_hoan_linh_dan | Đằng Sa Hoàn Linh Đan | 251 | 251 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_gio_lua_hoan_linh_dan | Gió Lùa Hoàn Linh Đan | 241 | 241 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hoang_ngoa_hoan_linh_dan | Hoàng Ngõa Hoàn Linh Đan | 407 | 407 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_phan_chung_hoan_linh_dan | Phạn Chung Hoàn Linh Đan | 607 | 607 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hoa_lan_hoan_linh_dan | Hỏa Lân Hoàn Linh Đan | 2.314 | 2.314 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bo_tuyen_hoan_linh_dan | Bồ Tuyền Hoàn Linh Đan | 1.521 | 1.521 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bach_lang_tan_doc_dan | Bạch Lãng Tán Độc Đan | 36 | 20 | Cùng nhóm dùng, Lưỡi Đồng Tán Độc Đan giá 17 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_dao_suong_tan_doc_dan | Đào Sương Tán Độc Đan | 26 | 20 | Cùng nhóm dùng, Lưỡi Đồng Tán Độc Đan giá 17 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_luoi_dong_tan_doc_dan | Lưỡi Đồng Tán Độc Đan | 17 | 17 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bang_vu_tan_doc_dan | Băng Vũ Tán Độc Đan | 89 | 55 | Cùng nhóm dùng, Nham Phấn Tán Độc Đan giá 51 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_phong_dang_tan_doc_dan | Phong Đăng Tán Độc Đan | 73 | 55 | Cùng nhóm dùng, Nham Phấn Tán Độc Đan giá 51 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_nham_phan_tan_doc_dan | Nham Phấn Tán Độc Đan | 51 | 51 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tan_dang_tan_doc_dan | Tàn Đăng Tán Độc Đan | 177 | 177 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_day_may_tan_doc_dan | Dây Mây Tán Độc Đan | 237 | 180 | Cùng nhóm dùng, Tàn Đăng Tán Độc Đan giá 177 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_thien_thach_tan_doc_dan | Thiền Thạch Tán Độc Đan | 732 | 732 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tu_dien_tan_doc_dan | Tử Điện Tán Độc Đan | 465 | 465 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_da_liem_tan_doc_dan | Dạ Liêm Tán Độc Đan | 1.940 | 1.940 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_anh_giap_tan_doc_dan | Ảnh Giáp Tán Độc Đan | 1.980 | 1.980 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_vien_am_an_mong_dan | Viên Âm An Mộng Đan | 33 | 33 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_dia_cot_an_mong_dan | Địa Cốt An Mộng Đan | 28 | 28 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_sam_mu_an_mong_dan | Sấm Mù An Mộng Đan | 31 | 31 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tuyet_vi_an_mong_dan | Tuyết Vĩ An Mộng Đan | 71 | 71 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_ngo_dong_an_mong_dan | Ngô Đồng An Mộng Đan | 54 | 54 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hoa_lan_an_mong_dan | Hỏa Lân An Mộng Đan | 159 | 159 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tinh_chung_an_mong_dan | Tinh Chung An Mộng Đan | 163 | 163 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_da_liem_an_mong_dan | Dạ Liêm An Mộng Đan | 587 | 587 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_phong_tang_an_mong_dan | Phong Tàng An Mộng Đan | 725 | 725 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_vu_tuyen_an_mong_dan | Vũ Tuyền An Mộng Đan | 1.755 | 1.755 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_vet_son_an_mong_dan | Vết Son An Mộng Đan | 2.108 | 2.108 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_giay_gio_dan_tu_dan | Giấy Gió Dẫn Tu Đan | 30 | 20 | Cùng nhóm dùng, Phong Nha Dẫn Tu Đan giá 20 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_phong_nha_dan_tu_dan | Phong Nha Dẫn Tu Đan | 20 | 20 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_loi_tue_dan_tu_dan | Lôi Tuế Dẫn Tu Đan | 71 | 71 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hoa_cat_dan_tu_dan | Hoa Cát Dẫn Tu Đan | 100 | 100 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_nhat_ke_dan_tu_dan | Nhất Kệ Dẫn Tu Đan | 260 | 260 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tho_vu_dan_tu_dan | Thổ Vũ Dẫn Tu Đan | 222 | 222 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_noan_sa_dan_tu_dan | Noãn Sa Dẫn Tu Đan | 477 | 477 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_thuy_liem_dan_tu_dan | Thủy Liêm Dẫn Tu Đan | 661 | 480 | Cùng nhóm dùng, Noãn Sa Dẫn Tu Đan giá 477 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_thiec_reu_dan_tu_dan | Thiếc Rêu Dẫn Tu Đan | 1.687 | 1.687 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bang_ti_dan_tu_dan | Băng Ti Dẫn Tu Đan | 2.456 | 1.690 | Cùng nhóm dùng, Thiếc Rêu Dẫn Tu Đan giá 1.687 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_hoa_cat_boi_huyet_dan | Hoa Cát Bồi Huyết Đan | 594 | 594 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_da_liem_boi_huyet_dan | Dạ Liêm Bồi Huyết Đan | 1.770 | 1.770 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_lang_hoi_boi_huyet_dan | Lãng Hồi Bồi Huyết Đan | 1.671 | 1.671 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_bang_lan_boi_huyet_dan | Băng Lân Bồi Huyết Đan | 5.658 | 5.658 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_dang_tuy_boi_huyet_dan | Đăng Tủy Bồi Huyết Đan | 6.897 | 5.325 | Cùng nhóm dùng, Lôi Diệp Bồi Huyết Đan giá 5.325 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_loi_diep_boi_huyet_dan | Lôi Diệp Bồi Huyết Đan | 5.325 | 5.325 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_co_nham_minh_ngo_dan | Cổ Nham Minh Ngộ Đan | 618 | 618 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_cot_dong_minh_ngo_dan | Cốt Đồng Minh Ngộ Đan | 2.538 | 2.538 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tuyet_cham_minh_ngo_dan | Tuyết Châm Minh Ngộ Đan | 2.199 | 2.199 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_hac_yem_minh_ngo_dan | Hắc Yểm Minh Ngộ Đan | 3.915 | 3.915 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tinh_dang_minh_ngo_dan | Tịnh Đăng Minh Ngộ Đan | 4.986 | 3.915 | Cùng nhóm dùng, Hắc Yểm Minh Ngộ Đan giá 3.915 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_phat_ke_duong_tho_dan | Phật Kệ Dưỡng Thọ Đan | 453 | 453 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tao_huyen_duong_tho_dan | Tảo Huyền Dưỡng Thọ Đan | 1.998 | 1.998 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_u_huong_duong_tho_dan | U Hương Dưỡng Thọ Đan | 1.452 | 1.452 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_mai_ngoi_duong_tho_dan | Mái Ngói Dưỡng Thọ Đan | 7.638 | 4.330 | Cùng nhóm dùng, Hàn Tảo Dưỡng Thọ Đan giá 4.329 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | dan_han_tao_duong_tho_dan | Hàn Tảo Dưỡng Thọ Đan | 4.329 | 4.329 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tam_trieu_duong_co_dan | Tam Triều Dưỡng Cơ Đan | 570 | 570 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tung_tam_duong_co_dan | Tùng Tâm Dưỡng Cơ Đan | 1.998 | 1.998 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_chop_dong_duong_co_dan | Chớp Đọng Dưỡng Cơ Đan | 1.779 | 1.779 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | dan_tuyet_sa_duong_co_dan | Tuyết Sa Dưỡng Cơ Đan | 6.750 | 6.750 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_phan_am_thuc_huyet_phu | Phạn Âm Thúc Huyết Phù | 38 | 30 | Cùng nhóm dùng, Băng Ti Thúc Huyết Phù giá 28 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_bang_ti_thuc_huyet_phu | Băng Ti Thúc Huyết Phù | 28 | 28 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_loi_mach_thuc_huyet_phu | Lôi Mạch Thúc Huyết Phù | 65 | 65 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_bui_trau_thuc_huyet_phu | Bụi Trấu Thúc Huyết Phù | 59 | 59 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_phong_mien_thuc_huyet_phu | Phong Miên Thúc Huyết Phù | 79 | 79 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_diem_nha_thuc_huyet_phu | Diệm Nha Thúc Huyết Phù | 95 | 95 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_hac_trieu_thuc_huyet_phu | Hắc Triều Thúc Huyết Phù | 130 | 130 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_dao_suong_thuc_huyet_phu | Đào Sương Thúc Huyết Phù | 120 | 120 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_luoi_dong_thuc_huyet_phu | Lưỡi Đồng Thúc Huyết Phù | 191 | 130 | Cùng nhóm dùng, Trầm Ba Thúc Huyết Phù giá 129 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_tram_ba_thuc_huyet_phu | Trầm Ba Thúc Huyết Phù | 129 | 129 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_han_tao_ke_giap_phu | Hàn Tảo Kê Giáp Phù | 25 | 25 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_thiet_yen_ke_giap_phu | Thiết Yến Kê Giáp Phù | 23 | 23 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_son_nau_ke_giap_phu | Sơn Nâu Kê Giáp Phù | 39 | 39 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_da_vu_ke_giap_phu | Dạ Vũ Kê Giáp Phù | 58 | 58 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_loi_tam_ke_giap_phu | Lôi Tằm Kê Giáp Phù | 86 | 50 | Cùng nhóm dùng, Phong Đăng Kê Giáp Phù giá 49 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_phong_dang_ke_giap_phu | Phong Đăng Kê Giáp Phù | 49 | 49 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_diem_vi_ke_giap_phu | Diệm Vĩ Kê Giáp Phù | 126 | 126 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_hon_tram_ke_giap_phu | Hồn Trầm Kê Giáp Phù | 124 | 124 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_ngo_dong_ke_giap_phu | Ngô Đồng Kê Giáp Phù | 109 | 109 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_ne_tam_ke_giap_phu | Nê Tâm Kê Giáp Phù | 156 | 156 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_bo_tuyen_ke_giap_phu | Bồ Tuyền Kê Giáp Phù | 122 | 122 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_loi_vi_ke_giap_phu | Lôi Vĩ Kê Giáp Phù | 225 | 225 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tinh_huong_ke_giap_phu | Tịnh Hương Kê Giáp Phù | 235 | 235 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_dang_sa_khai_an_phu | Đằng Sa Khai Ấn Phù | 25 | 25 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_gio_lua_khai_an_phu | Gió Lùa Khai Ấn Phù | 44 | 44 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_giay_gio_khai_an_phu | Giấy Gió Khai Ấn Phù | 44 | 44 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tinh_vu_khai_an_phu | Tinh Vũ Khai Ấn Phù | 26 | 26 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tuyet_tu_khai_an_phu | Tuyết Tụ Khai Ấn Phù | 55 | 55 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tu_dien_khai_an_phu | Tử Điện Khai Ấn Phù | 74 | 55 | Cùng nhóm dùng, Tuyết Tụ Khai Ấn Phù giá 55 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_nhat_ke_khai_an_phu | Nhất Kệ Khai Ấn Phù | 76 | 55 | Cùng nhóm dùng, Tuyết Tụ Khai Ấn Phù giá 55 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_tho_vu_khai_an_phu | Thổ Vũ Khai Ấn Phù | 70 | 55 | Cùng nhóm dùng, Tuyết Tụ Khai Ấn Phù giá 55 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_sa_nhan_khai_an_phu | Sa Nhận Khai Ấn Phù | 106 | 106 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_dang_tuy_khai_an_phu | Đăng Tủy Khai Ấn Phù | 134 | 90 | Cùng nhóm dùng, Trúc Châm Khai Ấn Phù giá 90 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_u_to_khai_an_phu | U Tơ Khai Ấn Phù | 136 | 90 | Cùng nhóm dùng, Trúc Châm Khai Ấn Phù giá 90 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_truc_cham_khai_an_phu | Trúc Châm Khai Ấn Phù | 90 | 90 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_thanh_duc_khai_an_phu | Thanh Dực Khai Ấn Phù | 130 | 130 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_u_huong_khai_an_phu | U Hương Khai Ấn Phù | 193 | 130 | Cùng nhóm dùng, Thanh Dực Khai Ấn Phù giá 130 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_mai_ngoi_khai_an_phu | Mái Ngói Khai Ấn Phù | 118 | 118 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_van_tao_khai_an_phu | Vân Tảo Khai Ấn Phù | 182 | 182 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_thiet_yen_khai_an_phu | Thiết Yến Khai Ấn Phù | 223 | 223 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tuyet_sa_khai_an_phu | Tuyết Sa Khai Ấn Phù | 132 | 132 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tu_dien_thoat_dau_phu | Tử Điện Thoát Dấu Phù | 39 | 39 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_dia_mien_thoat_dau_phu | Địa Miên Thoát Dấu Phù | 37 | 37 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_thiet_tam_thoat_dau_phu | Thiết Tằm Thoát Dấu Phù | 86 | 86 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_bang_lan_thoat_dau_phu | Băng Lân Thoát Dấu Phù | 78 | 78 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_truc_tuy_thoat_dau_phu | Trúc Tủy Thoát Dấu Phù | 105 | 105 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_ao_toi_thoat_dau_phu | Áo Tơi Thoát Dấu Phù | 132 | 105 | Cùng nhóm dùng, Trúc Tủy Thoát Dấu Phù giá 105 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | phu_diem_sa_thoat_dau_phu | Diệm Sa Thoát Dấu Phù | 136 | 136 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_tinh_dang_thoat_dau_phu | Tịnh Đăng Thoát Dấu Phù | 146 | 146 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | phu_u_huong_thoat_dau_phu | U Hương Thoát Dấu Phù | 226 | 226 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_u_to_mo_mach_dan | U Tơ Mở Mạch Đan | 125 | 75 | Cùng nhóm dùng, Liễu Nhung Mở Mạch Đan giá 74 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_sam_tat_giu_nguyen_tan | Sấm Tắt Giữ Nguyên Tán | 81 | 65 | Cùng nhóm dùng, Thau Bạc Giữ Nguyên Tán giá 64 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_tuyet_tuy_lech_kiep_phu | Tuyết Tủy Lệch Kiếp Phù | 68 | 68 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tich_thien_don_sam_dan | Tịch Thiền Đón Sấm Đan | 123 | 85 | Cùng nhóm dùng, Lôi Tuế Đón Sấm Đan giá 83 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_lieu_nhung_mo_mach_dan | Liễu Nhung Mở Mạch Đan | 74 | 74 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_thau_bac_giu_nguyen_tan | Thau Bạc Giữ Nguyên Tán | 64 | 64 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_day_gai_lech_kiep_phu | Dây Gai Lệch Kiếp Phù | 81 | 81 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phong_trao_don_sam_dan | Phong Trạo Đón Sấm Đan | 114 | 85 | Cùng nhóm dùng, Lôi Tuế Đón Sấm Đan giá 83 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_tram_nham_lap_co_hoan | Trầm Nham Lập Cơ Hoàn | 64 | 64 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tan_tinh_mo_mach_dan | Tẫn Tinh Mở Mạch Đan | 74 | 74 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_thach_tuy_mo_mach_dan | Thạch Tủy Mở Mạch Đan | 116 | 75 | Cùng nhóm dùng, Liễu Nhung Mở Mạch Đan giá 74 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_suong_dong_giu_nguyen_tan | Sương Đóng Giữ Nguyên Tán | 91 | 65 | Cùng nhóm dùng, Thau Bạc Giữ Nguyên Tán giá 64 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_phong_lac_lech_kiep_phu | Phong Lạc Lệch Kiếp Phù | 99 | 70 | Cùng nhóm dùng, Tuyết Tủy Lệch Kiếp Phù giá 68 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_cuong_mat_don_sam_dan | Cương Mạt Đón Sấm Đan | 87 | 87 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_chi_quan_mo_mach_dan | Chỉ Quán Mở Mạch Đan | 111 | 111 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_giay_gio_giu_nguyen_tan | Giấy Gió Giữ Nguyên Tán | 124 | 65 | Cùng nhóm dùng, Thau Bạc Giữ Nguyên Tán giá 64 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_mo_dang_lech_kiep_phu | Mộ Đăng Lệch Kiếp Phù | 126 | 70 | Cùng nhóm dùng, Tuyết Tủy Lệch Kiếp Phù giá 68 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_loi_tue_don_sam_dan | Lôi Tuế Đón Sấm Đan | 83 | 83 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_o_diem_lap_co_hoan | Ô Diệm Lập Cơ Hoàn | 114 | 65 | Cùng nhóm dùng, Trầm Nham Lập Cơ Hoàn giá 64 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_lan_giap_mo_mach_dan | Lan Giáp Mở Mạch Đan | 117 | 117 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tuyet_tu_mo_mach_dan | Tuyết Tụ Mở Mạch Đan | 318 | 318 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_o_diem_giu_nguyen_tan | Ô Diệm Giữ Nguyên Tán | 279 | 279 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_dia_mien_lech_kiep_phu | Địa Miên Lệch Kiếp Phù | 322 | 322 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_loi_cot_don_sam_dan | Lôi Cốt Đón Sấm Đan | 190 | 190 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_sa_nhan_mo_mach_dan | Sa Nhận Mở Mạch Đan | 290 | 290 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_truc_tuy_giu_nguyen_tan | Trúc Tủy Giữ Nguyên Tán | 241 | 241 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phong_truc_lech_kiep_phu | Phong Trúc Lệch Kiếp Phù | 269 | 269 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phat_ke_don_sam_dan | Phật Kệ Đón Sấm Đan | 185 | 185 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_vong_anh_lap_co_hoan | Vọng Ảnh Lập Cơ Hoàn | 293 | 293 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_bui_trau_mo_mach_dan | Bụi Trấu Mở Mạch Đan | 311 | 311 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_truc_cham_mo_mach_dan | Trúc Châm Mở Mạch Đan | 770 | 590 | Cùng nhóm dùng, Địa Cốt Mở Mạch Đan giá 590 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_tuyet_tuy_giu_nguyen_tan | Tuyết Tủy Giữ Nguyên Tán | 730 | 730 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tich_thien_lech_kiep_phu | Tịch Thiền Lệch Kiếp Phù | 590 | 590 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_da_kien_don_sam_dan | Dạ Kiển Đón Sấm Đan | 633 | 633 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_canh_lau_mo_mach_dan | Cành Lau Mở Mạch Đan | 633 | 633 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_bach_lang_giu_nguyen_tan | Bạch Lãng Giữ Nguyên Tán | 659 | 659 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_loi_sa_lech_kiep_phu | Lôi Sa Lệch Kiếp Phù | 487 | 487 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_mieu_diem_don_sam_dan | Miêu Diệm Đón Sấm Đan | 632 | 632 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phong_lac_lap_co_hoan | Phong Lạc Lập Cơ Hoàn | 669 | 669 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_dia_cot_mo_mach_dan | Địa Cốt Mở Mạch Đan | 590 | 590 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_da_vu_mo_mach_dan | Dạ Vũ Mở Mạch Đan | 1.608 | 1.608 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_dem_canh_giu_nguyen_tan | Đêm Canh Giữ Nguyên Tán | 1.404 | 1.404 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_dang_sa_lech_kiep_phu | Đằng Sa Lệch Kiếp Phù | 1.187 | 1.187 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_gio_lua_don_sam_dan | Gió Lùa Đón Sấm Đan | 1.662 | 1.662 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_thiem_quang_mo_mach_dan | Thiểm Quang Mở Mạch Đan | 1.448 | 1.448 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_xich_dinh_giu_nguyen_tan | Xích Đinh Giữ Nguyên Tán | 1.571 | 1.571 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_am_tran_lech_kiep_phu | Âm Trần Lệch Kiếp Phù | 1.441 | 1.441 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_thach_kien_don_sam_dan | Thạch Kiển Đón Sấm Đan | 1.470 | 1.470 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_nhat_ke_lap_co_hoan | Nhất Kệ Lập Cơ Hoàn | 1.624 | 1.624 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tuyet_nha_mo_mach_dan | Tuyết Nha Mở Mạch Đan | 1.364 | 1.364 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_hac_nhung_mo_mach_dan | Hắc Nhung Mở Mạch Đan | 3.603 | 2.565 | Cùng nhóm dùng, Thủy Liêm Mở Mạch Đan giá 2.561 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_lan_giap_giu_nguyen_tan | Lan Giáp Giữ Nguyên Tán | 4.184 | 4.184 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_loi_cot_lech_kiep_phu | Lôi Cốt Lệch Kiếp Phù | 3.271 | 2.315 | Cùng nhóm dùng, Đồng Mưa Lệch Kiếp Phù giá 2.315 và hiệu lực ngang hoặc cao hơn. |
| content/catalog/pills.json | bt_co_nham_don_sam_dan | Cổ Nham Đón Sấm Đan | 2.322 | 2.322 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_thuy_liem_mo_mach_dan | Thủy Liêm Mở Mạch Đan | 2.561 | 2.561 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phan_am_giu_nguyen_tan | Phạn Âm Giữ Nguyên Tán | 3.599 | 3.599 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_dong_mua_lech_kiep_phu | Đồng Mưa Lệch Kiếp Phù | 2.315 | 2.315 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_tuyet_tuy_don_sam_dan | Tuyết Tủy Đón Sấm Đan | 2.603 | 2.603 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_bui_trau_lap_co_hoan | Bụi Trấu Lập Cơ Hoàn | 4.857 | 4.857 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/catalog/pills.json | bt_phong_mien_mo_mach_dan | Phong Miên Mở Mạch Đan | 3.073 | 3.073 | Giữ mốc hiện tại theo nhóm hiệu ứng và tầng bán. |
| content/items/pill.js | hoixuan | Hồi Xuân Đan | 22 | 20 | Hạ nhẹ giá hồi máu cơ bản cho giai đoạn nhập môn. |
| content/items/pill.js | tukhi | Tụ Khí Đan | 18 | 18 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | baohuyet | Bạo Huyết Đan | 28 | 28 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | kimcang | Kim Cang Phù | 24 | 24 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | loiphu | Chưởng Lôi Phù | 30 | 30 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | giaidoc | Giải Độc Đan | 16 | 16 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | thanhanh | Thần Hành Phù | 26 | 26 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | dinhthan | Định Thần Đan | 30 | 30 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | tinhnguyen | Tinh Nguyên Đan | 45 | 45 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | taytuy | Tẩy Tủy Đan | 60 | 60 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | khaitri | Khai Trí Đan | 55 | 55 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | luanhoi | Luân Hồi Đan | 120 | 120 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | dientho | Diên Thọ Đan | 70 | 70 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | phacanh | Phá Cảnh Đan | 55 | 55 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | homach | Hộ Mạch Đan | 70 | 70 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | bode | Bồ Đề Tử | 90 | 70 | Cùng cờ hộ mệnh với Hộ Mạch Đan. Chỉ giữ giá cao nếu nguồn Bồ Đề Tử hiếm hơn có chủ đích. |
| content/items/pill.js | tiloi | Tị Lôi Phù | 65 | 65 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | duongnguyen | Dưỡng Nguyên Đan | 50 | 50 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | thiendao | Thiên Đạo Quả | 140 | 140 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | diamach | Địa Mạch Linh Nhũ | 100 | 100 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | nhanhoang | Nhân Hoàng Thảo | 70 | 70 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | linhnhu | Linh Nhũ Ngưng Thần | 60 | 60 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | trucco | Trúc Cơ Đan | 80 | 80 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | ngungkim | Ngưng Kim Đan | 90 | 90 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | phaanh | Toái Đan Thành Anh Đan | 100 | 100 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/items/pill.js | hoathan | Hóa Thần Đan | 110 | 110 | Giữ mốc để so với đan cùng tác dụng trong danh mục và phần thưởng nhiệm vụ. |
| content/rules/sua-e.js | SUAE.tc | Tích Cốc Đan | 8 | 12 | Dùng được từ Trúc Cơ, đủ no 1.095 ngày. Thử giá cao hơn vừa phải vì bậc này vốn tiêu phần ăn rất chậm. |

## Pháp bảo và trang bị

Danh mục có 814 mẫu, không có giá bán riêng từng ID. Giá tại quầy dùng công thức theo phẩm. Cần thử cả chênh lệch giữa mua, bán và đấu giá trước khi đặt giá cho từng món.

| Tệp | Mã | Tên | Giá hiện tại | Giá đề xuất | Lý do |
|---|---|---|---:|---:|---|
| content/catalog/relics.json | t=0 | Trang bị Phàm | 70 mua / 25 bán | 70 mua / 25 bán | Giữ công thức chung khi chưa có dữ liệu thu nhập theo phẩm và ô trang bị. |
| content/catalog/relics.json | t=1 | Trang bị Hoàng | 115 mua / 55 bán | 115 mua / 55 bán | Giữ công thức chung khi chưa có dữ liệu thu nhập theo phẩm và ô trang bị. |
| content/catalog/relics.json | t=2 | Trang bị Huyền | 160 mua / 85 bán | 160 mua / 85 bán | Giữ công thức chung khi chưa có dữ liệu thu nhập theo phẩm và ô trang bị. |
| content/catalog/relics.json | t=3 | Trang bị Địa | 205 mua / 115 bán | 205 mua / 115 bán | Giữ công thức chung khi chưa có dữ liệu thu nhập theo phẩm và ô trang bị. |
| content/catalog/relics.json | t=4 | Trang bị Thiên | 250 mua / 145 bán | 250 mua / 145 bán | Giữ công thức chung khi chưa có dữ liệu thu nhập theo phẩm và ô trang bị. |
| content/catalog/relics.json | t=5 | Trang bị Tiên | 295 mua / 175 bán | 295 mua / 175 bán | Mức theo công thức nếu có kênh bán. Hàng tạo thường ở quầy giới hạn tới phẩm Thiên. |
| content/catalog/relics.json | t=6 | Trang bị Thần | 340 mua / 205 bán | 340 mua / 205 bán | Mức theo công thức nếu có kênh bán. Hàng tạo thường ở quầy giới hạn tới phẩm Thiên. |
| content/rules/am-hoi.js | AM_HOI.relic | Định giá pháp bảo đấu giá | 40 × 3^phẩm | Thử 30 × 2,5^phẩm | Phẩm Thiên đang được định giá 3.240 Hạ phẩm ở bảng hội trước nhu cầu, trong khi giá bán ở tiệm có cơ sở 145. Thu nhỏ độ dốc và so tiền trả thực tế trước khi chốt. |
| content/rules/am-hoi.js | AM_HOI.gia0 / buoc | Giá mở và bước trả | 60% / 10% giá trị | 60% / 10% giá trị | Giữ khi thử thay hệ số định giá. Bước trả tính theo giá trị món. |
| content/rules/sua-e.js | SUAE.dg.nhan / trungMax | Đấu giá gửi bán | 150% giá bán tiệm, đổi tối đa 5 Trung phẩm | 150%, giữ giới hạn hiện tại | Giữ chênh lệch cho kênh bán có điều kiện thời điểm. Theo dõi nguồn Trung phẩm riêng. |

## Thú cưỡi và phương tiện

Ba nhóm giá dưới đây có đường đọc khác nhau. Danh mục nhập lưu giá tham chiếu. Trạm dịch dùng bảng `VEH_T` để sinh hàng, còn `MOUNT` phục vụ các lối mua và dữ liệu cưỡi cũ. Chỉ so tốc độ trong cùng bậc và cùng khả năng phi hành.

| Tệp | Mã | Tên | Giá hiện tại | Giá đề xuất | Lý do |
|---|---|---|---:|---:|---|
| content/catalog/mounts.json | pt_lua_got_xam | Lừa Gót Xám | 30 | 30 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_xe_mui_tre_xep | Xe Mui Tre Xếp | 23 | 23 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_thuyen_van_ghep_lau | Thuyền Ván Ghép Lau | 20 | 20 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_dieu_vai_do_nguoi | Diều Vải Đỡ Người | 26 | 26 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_phi_kiem_can_dau | Phi Kiếm Cán Dâu | 33 | 33 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_co_lung_bac | Cò Lưng Bạc | 53 | 53 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_huou_may_dau_bo | Hươu Mây Đầu Bờ | 55 | 55 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_lac_da_bo_cat | Lạc Đà Bờ Cát | 55 | 55 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_xe_banh_thau | Xe Bánh Thau | 59 | 59 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_ghe_canh_manh | Ghe Cánh Mành | 42 | 42 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_be_giay_do_suong | Bè Giấy Dò Sương | 155 | 155 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_kiem_ranh_hung_gio | Kiếm Rãnh Hứng Gió | 234 | 155 | Cùng cảnh giới và loại di chuyển, Bè Giấy Dò Sương nhanh ngang hoặc hơn, giá 155. |
| content/catalog/mounts.json | pt_nhan_nguc_dom_trang | Nhạn Ngực Đốm Trắng | 271 | 195 | Cùng cảnh giới và loại di chuyển, Hươu Đầm Mặn nhanh ngang hoặc hơn, giá 191. |
| content/catalog/mounts.json | pt_de_cuon_may_thap | Dê Cuộn Mây Thấp | 252 | 252 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_huou_dam_man | Hươu Đầm Mặn | 191 | 191 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_xe_rut_nan_dong | Xe Rút Nan Đồng | 1.153 | 1.153 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_thuyen_vo_kinh | Thuyền Vỏ Kình | 1.078 | 1.078 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_dang_cong_qua_bien | Đăng Cõng Qua Biển | 1.142 | 615 | Cùng cảnh giới và loại di chuyển, Kiếm Bay Lòng Rỗng nhanh ngang hoặc hơn, giá 612. |
| content/catalog/mounts.json | pt_kiem_bay_long_rong | Kiếm Bay Lòng Rỗng | 612 | 612 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_hac_gay_khi_mua | Hạc Gáy Khi Mưa | 1.038 | 1.038 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_trau_nuong_may_thap | Trâu Nương Mây Thấp | 3.769 | 2.405 | Cùng cảnh giới và loại di chuyển, Xe Che Mưa Nghiêng nhanh ngang hoặc hơn, giá 2.402. |
| content/catalog/mounts.json | pt_bao_bon_mong_suong | Báo Bốn Móng Sương | 2.572 | 2.572 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_xe_che_mua_nghieng | Xe Che Mưa Nghiêng | 2.402 | 2.402 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_thuyen_chong_song_nguoc | Thuyền Chống Sóng Ngược | 2.876 | 2.876 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_long_nang_qua_khe | Lọng Nâng Qua Khe | 2.132 | 2.132 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_phi_kiem_khe_chop | Phi Kiếm Khe Chớp | 6.315 | 6.315 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_dieu_dau_mep_troi | Điêu Đậu Mép Trời | 7.910 | 7.910 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_kinh_may_vuot_trieu | Kình Mây Vượt Triều | 5.179 | 5.179 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_hac_mo_suong_day | Hạc Mở Sương Dày | 5.641 | 5.641 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/catalog/mounts.json | pt_thuyen_trang_bang_to | Thuyền Trăng Bằng Tơ | 12.936 | 12.936 | Giữ giá tham chiếu. Cần đối chiếu nguồn nhận và khả năng dùng qua địa hình. |
| content/world/mount.js | ngua | Tuấn mã | 30 | 30 | Giữ mốc đường mua và dữ liệu cũ. Trạm dịch sinh hàng qua bảng riêng. |
| content/world/mount.js | thuyen | Phi chu | 220 | 220 | Giữ mốc đường mua và dữ liệu cũ. Trạm dịch sinh hàng qua bảng riêng. |
| content/world/mount.js | kiem | Ngự kiếm phi hành | 900 | 900 | Giữ mốc đường mua và dữ liệu cũ. Trạm dịch sinh hàng qua bảng riêng. |
| content/world/veh-t.js | ngua | Ngựa thồ | 60 gốc; 108 mua / 9 thuê ở phẩm đầu trước hệ số tầng | 60 gốc | Giữ khi thử cơ chế mua và thuê. Phẩm sau nhân 1,9 mỗi bậc, trong khi tốc độ chỉ cộng 22% tốc độ gốc. |
| content/world/veh-t.js | loc | Linh lộc | 90 gốc; 162 mua / 13 thuê ở phẩm đầu trước hệ số tầng | 90 gốc | Giữ khi thử cơ chế mua và thuê. Phẩm sau nhân 1,9 mỗi bậc, trong khi tốc độ chỉ cộng 22% tốc độ gốc. |
| content/world/veh-t.js | hac | Bạch hạc | 260 gốc; 468 mua / 37 thuê ở phẩm đầu trước hệ số tầng | 260 gốc | Giữ khi thử cơ chế mua và thuê. Phẩm sau nhân 1,9 mỗi bậc, trong khi tốc độ chỉ cộng 22% tốc độ gốc. |
| content/world/veh-t.js | chu | Phi chu | 500 gốc; 900 mua / 72 thuê ở phẩm đầu trước hệ số tầng | 500 gốc | Giữ khi thử cơ chế mua và thuê. Phẩm sau nhân 1,9 mỗi bậc, trong khi tốc độ chỉ cộng 22% tốc độ gốc. |
| content/world/veh-t.js | kiem | Phi kiếm | 1.600 gốc; 2.880 mua / 230 thuê ở phẩm đầu trước hệ số tầng | 1.600 gốc | Giữ khi thử cơ chế mua và thuê. Phẩm sau nhân 1,9 mỗi bậc, trong khi tốc độ chỉ cộng 22% tốc độ gốc. |
| src/game/core2/08-dot-13-tram-dich.js | vehRent | Thuê phương tiện trong một tháng | 8% giá mua đã tính hệ số, tối thiểu 2 Hạ phẩm | 8%, giữ sàn hiện tại | Đủ rẻ cho chuyến ngắn. So tiền thuê liên tục với mua sau khoảng 12–13 tháng. |
| src/game/core2/08-dot-13-tram-dich.js | stageList | Đi xe chuyến | 2 × price(1 + làm tròn quãng đường / 60) | Giữ cho tu sĩ; thử chuyến phàm 25–60 xu | Thêm kênh trả tiền phàm nếu muốn phàm nhân tự dùng. Tầm giá bằng khoảng một đến ba ca bốc vác. |

## Đồ phàm, thức ăn và dịch vụ

`content/items/pham.js` là tên phẩm, `pham-m.js` là hệ số phẩm. Giá đồ phàm thực tế trong `TIEN2.hang`, `SUAE.vk` và bảng dịch vụ. Cột đề xuất dùng xu nếu chưa ghi đơn vị khác.

| Tệp | Mã | Tên | Giá hiện tại | Giá đề xuất | Lý do |
|---|---|---|---:|---:|---|
| content/rules/tien.js | kim_sang_duoc | Kim Sang Dược | 120 | 100 | Khoảng năm ca bốc vác tính trên công trước tiền ăn. Giảm nhẹ để thuốc chữa thương có thể dùng trước lúc tích đủ tiền thầy lang. |
| content/rules/tien.js | huong_an_than | Hương An Thần | 60 | 60 | Bằng ba bữa thường, tác dụng tình huống. |
| content/rules/an-uong.js / tien.js | AN.lkBac / TIEN2.hang.luong_kho | Gói lương khô | 70 | 1.080 nếu giữ 90 ngày ăn | Giá hiện khoảng 0,78 xu/ngày ăn, kém xa 12 xu của mức đạm bạc. Phương án dễ tiếp cận hơn là gói ngắn 15 ngày giá 240 xu, cần đổi cả dung lượng và phần thưởng dùng cùng ID. |
| content/rules/an-uong.js | AN.muc.dam | Ăn đạm bạc | 12/ngày | 12/ngày | Còn dư khoảng 6–10 xu từ một ca bốc vác khi chưa tính chỗ ngủ. |
| content/rules/an-uong.js | AN.muc.thuong | Ăn thường | 20/ngày | 20/ngày | Giữ mốc sinh hoạt, cân cùng công việc có cơm và chỗ ngủ. |
| content/rules/an-uong.js | AN.muc.kha | Ăn khá | 40/ngày | 40/ngày | Mức tùy chọn cao hơn nhờ lợi ích hồi phục và tâm ma. |
| content/rules/sua-e.js | vk_thiet_kiem | Thiết kiếm phàm | 14.000 mua / 10.000 cầm | 7.000 mua / 3.500 cầm | Tiền mua hiện bằng 700 ca bốc vác tính lương gộp; lợi ích chỉ áp dụng cho phàm nhân. |
| content/rules/sua-e.js | vk_cuong_dao | Cương đao phàm | 12.000 mua / 9.000 cầm | 6.000 mua / 3.000 cầm | Giữ dưới kiếm vì mức tăng công thấp hơn. Hạ giá cầm cùng giá mua để tránh mua rẻ rồi cầm có lời khi nhu cầu lệch. |
| content/rules/tien.js | TIEN.yBac | Thầy lang | 150 | 120 | Bằng sáu ca bốc vác và vẫn cao hơn Kim Sang Dược. |
| content/rules/tien.js | TIEN.tpBac | Bản chép tay tâm pháp | 800 | 600 | Có thể dành dụm bằng việc có cơm, vẫn là khoản lớn với người mới. |
| content/rules/tien.js | TIEN.tlBac | Trắc Linh Thạch | 9.900 | 4.800 | Cửa xác định linh căn hiện ngốn gần hết mức tiền của nhà khá ở khoảng thấp. Đối chiếu kênh Thưởng Các trước khi thử. |
| content/venues/thuong-cac.js | trac_linh_thach | Trắc Linh Thạch ở Thưởng Các | 3 Thưởng Lệnh | 3 Thưởng Lệnh | Giữ đường tích lệnh cho người ít tiền mặt, giới hạn theo kiếp đã có. |
| content/rules/sua-e.js | SUAE.cam.ltPer | Cầm đồ tu sĩ | 60% giá bán tiệm trước nhu cầu cầm đồ | 60% | Thanh toán Hạ phẩm và có hạn nhận. Không dùng hệ số 200 xu ở nhánh xử lý cũ như giá hiện hành. |
| content/rules/sua-e.js | SUAE.cam.pham | Cầm thuốc, hương, lương khô | 60 / 30 / 35 | 50 / 30 / 35 | Đổi mức cầm thuốc cùng giá mua. Giữ giá cầm lương khô thấp để phần thưởng hiện vật không thay thẳng thành tiền mặt. |
| content/rules/no-nha.js | NO.vay.v1 | Vay ngắn | 1.000 → trả 1.180 | Giữ | Thử với công có cơm, vì khoản lãi đã định sẵn theo kỳ. |
| content/rules/no-nha.js | NO.vay.v3 | Vay vừa | 3.000 → trả 3.540 | Giữ | Giữ cùng tỷ lệ với khoản vay ngắn. |
| content/rules/no-nha.js | NO.vay.v10 | Vay lớn | 10.000 → trả 13.000 | Giữ | Dùng cho kế hoạch có nguồn thu chắc, không dùng để đo khả năng mua của người chỉ làm công nhật. |
| content/venues/services.json | service_tea_nghe | Gọi ấm trà, ngồi nghe chuyện | 5 xu | 5 xu | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_tea_hoi | Cho tiểu nhị ít tiền để hỏi đường | 10 xu / 1 Hạ phẩm cơ sở | 10 xu / 1 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_tea_tinh | Ngồi yên thưởng trà, tĩnh tâm | 8 xu / 1 Hạ phẩm cơ sở | 8 xu / 1 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_inn_phong | Thuê phòng thường, ngủ một đêm | 12 xu / 4 Hạ phẩm cơ sở | 12 xu / 4 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_inn_giuong | Ngủ giường tập thể một đêm | 6 xu | 6 xu | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_inn_thuong | Thuê phòng thượng hạng có tụ linh trận | 10 Hạ phẩm cơ sở | 10 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_inn_an | Ngồi sảnh dưới ăn một bữa | 13 xu / 1 Hạ phẩm cơ sở | 13 xu / 1 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_tuu_chen | Uống vài chén, nghe chuyện | 15 xu / 2 Hạ phẩm cơ sở | 15 xu / 2 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |
| content/venues/services.json | service_tuu_moi | Mời cả bàn một vò rượu ngon | 120 xu / 6 Hạ phẩm cơ sở | 90 xu / 6 Hạ phẩm cơ sở | Mời rượu đang bằng sáu bữa cơm thường. Hạ phía tiền phàm để còn là lựa chọn xã giao ít gặp. |
| content/venues/services.json | service_tuu_ca | Nghe ca kỹ đàn hát | 30 xu / 3 Hạ phẩm cơ sở | 30 xu / 3 Hạ phẩm cơ sở | Giữ mốc theo công dụng tại quán. Tiền phàm và giá tu sĩ là các mức trả theo ngữ cảnh. |

## Đất, nhà và thuế

Giá dưới đây tính trên ô của dân, trừ khi hàng ghi rõ hệ số. Mua ô có công trình cộng phụ phí trước khi nhân theo chủ. Giá bán tính trên giá gốc cộng phụ phí đủ điều kiện, bỏ hệ số theo chủ.

| Tệp | Mã | Tên | Giá hiện tại | Giá đề xuất | Lý do |
|---|---|---|---:|---:|---|
| content/rules/dat-dai.js | DAT.mua.gia.tran | Đất trấn | 30.000 | 20.000 | Chừa đường tích lũy dài hạn cho nhà phàm. Kèm nhà riêng đề xuất thành 38.000 xu, vẫn là tài sản lớn. |
| content/rules/dat-dai.js | DAT.mua.gia.thanh | Đất thành | 80.000 | 60.000 | Vẫn đắt hơn đất trấn vì dịch vụ và vị trí. |
| content/rules/dat-dai.js | DAT.mua.gia.cho | Đất chợ | 20.000 | 16.000 | Giữ chênh lệch với trấn, nơi có nhiều lựa chọn nghỉ và sống. |
| content/rules/dat-dai.js | DAT.mua.gia.ancu | Đất nơi ẩn cư | 10.000 | 9.000 | Giữ mốc đầu vào thấp nhất, có ít dịch vụ công. |
| content/rules/dat-dai.js | CONG_TRINH.nha_rieng.xay.bac | Dựng nhà riêng | 25.000 | 18.000 | Nên cân cùng giá đất và thuê. Nhà riêng có thể là đích nhiều năm, vượt khoản thuê ngắn hạn. |
| content/rules/no-nha.js | NHA.thue.tran / thanh | Thuê nhà theo tháng | 150 trấn / 300 thành | 150 / 300 | Tiền ngủ mỗi tháng thấp hơn tiền ăn cơ bản. Giữ đường thuê cho nhân vật ít vốn. |
| content/rules/dat-dai.js | DAT.mua.chu | Phụ giá theo chủ | 1 / 1,3 / 1,6 | 1 / 1,3 / 1,6 | Giữ khi thử các giá gốc, so người dân với vai NPC và thế lực. |
| content/rules/dat-dai.js | DAT.mua.ban | Bán đất | 50% giá gốc đủ điều kiện | 50% | Giữ chênh lệch mua–bán và ghi rõ thuế nợ bị trừ trước khi nhận tiền. |
| content/rules/dat-dai.js | DAT.mua.lt | Linh thạch trả thay tiền mua và thuế | 200 xu nghĩa vụ / Hạ phẩm | Tạm giữ 200, kiểm thử cùng giá đất | Đây là mức trả cho đất, không phải tỷ giá đổi tự do. Nên thử số tháng kiếm nhà của phàm nhân so với số hợp đồng của tu sĩ. |
| content/rules/dat-dai.js | DAT.thue.ty.tran | Thuế đất trấn theo năm | 900 tại giá 30.000 | 600 tại giá 20.000, giữ 3% | Thấp hơn thuê cả năm 1.800 xu, vẫn là chi phí đáng kể. |
| content/rules/dat-dai.js | DAT.thue.ty.thanh | Thuế đất thành theo năm | 4.000 tại giá 80.000 | 1.800 tại giá 60.000 và thuế suất 3% | Thuế riêng hiện đã vượt tiền thuê thành cả năm là 3.600 xu. Nếu đó là chủ đích đánh thuế tài sản, giữ mức 5% và ghi rõ mục tiêu. |
| content/rules/dat-dai.js | DAT.mua.ct._ |   | 20.000 | 20.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.khach_diem | khach diem | 40.000 | 40.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.tra_lau | tra lau | 25.000 | 25.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.tuu_lau | tuu lau | 30.000 | 30.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.bang_thuong | bang thuong | 10.000 | 10.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.thuong_cac | thuong cac | 40.000 | 40.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.tien_trang | tien trang | 60.000 | 60.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.tap_hoa | tap hoa | 15.000 | 15.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.lai_buon | lai buon | 15.000 | 15.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.phuong_thi | phuong thi | 80.000 | 80.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.quy_thi | quy thi | 60.000 | 60.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.am_hoi | am hoi | 80.000 | 80.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.doi_lt | doi lt | 60.000 | 60.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.cam_do | cam do | 30.000 | 30.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.tram_dich | tram dich | 40.000 | 40.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.loi_dai | loi dai | 50.000 | 50.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.thao_lu | thao lu | 5.000 | 5.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |
| content/rules/dat-dai.js | DAT.mua.ct.nha_rieng | nha rieng | 25.000 | 18.000 | Giữ phụ phí mua nhà nhất quán với giá xây đề xuất. |
| content/rules/dat-dai.js | DAT.mua.ct.tran_phap | tran phap | 20.000 | 20.000 | Giữ phí công trình khi thử giá nền đất, vì công trình vẫn hoạt động sau khi mua. |

## Nhận xét tổng

- Ưu tiên xử lý lương khô trước. Giá 70 xu bằng khoảng ba ca rưỡi bốc vác mà thay được 90 ngày ăn ở mức phàm, trong khi 90 ngày cơm thường là 1.800 xu.
- Đo giá đồ phàm bằng tiền **dư sau khi ăn và ngủ**, không dùng nguyên lương ngày. Dùng cả xuất thân nghèo và khá để thử khả năng mua binh khí, thuốc và Trắc Linh Thạch.
- Cân mỗi nhóm đan theo tác dụng thật và điều kiện dùng. Ví dụ Băng Vũ Hồi Mạch hồi 49% với giá 641, còn Cương Mạt cùng tầng hồi 42% với giá 831.
- Cân giá thuê và giá mua nhà theo số năm sở hữu. Thuế thành hiện cao hơn tiền thuê năm, chưa kể vốn mua đất và dựng nhà.
- Kiểm tra cả đường bán lại và cầm đồ trước khi giảm giá mua. Nhu cầu địa phương có thể làm giá của hai giao dịch lệch theo hướng ngược nhau.
- So thú cưỡi theo cảnh giới, phi hành và tuyến đi. Rà riêng giá trạm dịch với giá các mẫu nhập để không đặt giá dựa trên một bảng khác đường đọc.
- Theo dõi thu nhập từ nhiệm vụ và giá trả thật ở Ám Hội trước khi giảm đồng loạt giá tu sĩ. Chênh giữa giá định giá và tiền thực nhận phụ thuộc kênh bán.
- Giữ tiền phàm, linh thạch và Thưởng Lệnh là các thước đo riêng. Giá trị quy ước và các mức trả thay tại một dịch vụ không tạo thành tỷ giá đổi chung.
