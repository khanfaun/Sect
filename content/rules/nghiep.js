// Nguồn chuẩn: NQ_MUC, NQ_YD, NQ_TN, NQ_LV_G, NQ_LV_B. Luật xử lý ở src/game/core2/35-hanh-dao-nghiep.js.
const NQ_MUC={nho:1,vua:3,lon:8,mang:15};             // mức tổn hại / ân nghĩa
const NQ_YD={chu_dich:1,phot_lo:0.7,tai_nan:0.25,cuong_buc:0.1}; // ý định
const NQ_TN={truc_tiep:1,ra_lenh:1,tiep_tay:0.5,dung_xem:0};     // phạm vi trách nhiệm
const NQ_LV_G=[[60,'Ân nghĩa sâu dày'],[20,'Thiện duyên nối dài'],[5,'Có người còn nhớ'],[0,'Ít mối nương tựa']];
const NQ_LV_B=[[60,'Nghiệp hải trùng trùng'],[20,'Oán nghiệp quấn thân'],[5,'Vướng nợ trần duyên'],[0,'Ít điều vướng bận']];
// Bậc Nghiệp Duyên (ý người dùng: trong cùng một bậc tác dụng như nhau). Mốc tính trên ngB()/ngG().
// Sửa-C.1: mốc nới ra — một lần giết người vô tội (15) chỉ tới bậc 1, hai lần mới bậc 2; cứu ba người (24) lên bậc 2 thiện duyên.
const NQ_BAC=[0,5,20,60,120,250];                         // bậc 0..5
const NQ_BAC_KIEP=[1,1.05,1.12,1.25,1.4,1.6];             // sức thiên kiếp theo bậc nghiệp chướng
const NQ_BAC_KBON=[0,0.01,0.03,0.06,0.10,0.10];           // thưởng tôi thể khi vượt kiếp
// hoàn cảnh đầu thai theo bậc ròng = bậc thiện duyên − bậc nghiệp chướng (−5..5): [bấp bênh, được nâng đỡ]
const NQ_BAC_HC={'-5':[0.70,0.05],'-4':[0.60,0.08],'-3':[0.50,0.10],'-2':[0.40,0.15],'-1':[0.32,0.20],'0':[0.25,0.25],
  '1':[0.20,0.32],'2':[0.15,0.40],'3':[0.12,0.45],'4':[0.10,0.50],'5':[0.10,0.55]};
