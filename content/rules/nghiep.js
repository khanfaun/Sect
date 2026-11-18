// Nguồn chuẩn: NQ_MUC, NQ_YD, NQ_TN, NQ_LV_G, NQ_LV_B. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
const NQ_MUC={nho:1,vua:3,lon:8,mang:15};             // mức tổn hại / ân nghĩa
const NQ_YD={chu_dich:1,phot_lo:0.7,tai_nan:0.25,cuong_buc:0.1}; // ý định
const NQ_TN={truc_tiep:1,ra_lenh:1,tiep_tay:0.5,dung_xem:0};     // phạm vi trách nhiệm
const NQ_LV_G=[[50,'Ân nghĩa sâu dày'],[15,'Thiện duyên nối dài'],[3,'Có người còn nhớ'],[0,'Ít mối nương tựa']];
const NQ_LV_B=[[50,'Nghiệp hải trùng trùng'],[15,'Oán nghiệp quấn thân'],[3,'Vướng nợ trần duyên'],[0,'Ít điều vướng bận']];
