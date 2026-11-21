// Tâm trí NPC (độ khôn): luật ở src/game/core2/82-tri-npc.js.
// NPC có tên có đủ chỉ số như nhân vật chính (linh căn, tư chất, ngộ tính, đạo tâm, khí vận, thân pháp, thể chất, đạo cơ).
// Tâm trí 0–100 = ngộ tính (chính) + tiềm chất + đạo tâm, cộng chút lệch riêng mỗi người.
const TRI={
  // trọng số khi gộp ra tâm trí (cộng lại = 1)
  w:{ngo:0.5,tal:0.3,tam:0.2},lech:8,
  // bậc tâm trí: [mốc, tên]
  bac:[[85,'Đa mưu túc trí'],[65,'Mưu trí'],[45,'Lanh lợi'],[25,'Tầm thường'],[0,'Ngu độn']],
  ngu:25,khon:45,muu:65, // mốc dùng trong luật: dưới ngu là dại; từ khon trở lên biết tính; từ muu trở lên mưu mẹo
  // ---- đánh nhau ----
  tran:{
    danhBua:0.35,      // kẻ dại: tỉ lệ bỏ chiêu, đánh thường vào một người bất kỳ
    hoiMau:0.35,       // máu dưới mức này: kẻ biết tính có chiêu hồi thì hồi
    thuThe:0.9,        // kẻ biết tính thấy mình bị tụ lực nhắm vào: tỉ lệ thủ thế = tâm trí/100 × hệ số này
    chay:{mau:0.2,p:0.6,taMau:0.5} // kẻ mưu trí: máu dưới 20%, đối phương còn trên nửa máu → 60% bỏ chạy (không áp cho trùm, tỉ thí)
  },
  // ---- ngoài thế giới (thiên kiêu, mỗi năm) ----
  doi:{
    tuMin:0.7,tuMax:1.3, // tư chất 0 → tu ×0,7; tư chất 100 → ×1,3 (như nhân vật chính)
    ngoMoi:60,           // mỗi điểm ngộ tính trên 10 thêm 1/60 tốc độ
    cho:20,              // kẻ khôn tích thêm tới chừng này phần trăm rồi mới đột phá
    dpGoc:0.62,dpTri:0.33,dpCho:0.15, // tỉ lệ đột phá = gốc + tâm trí×dpTri + (đã chờ đủ ? dpCho : 0)
    hong:[25,45],        // đột phá hỏng: mất chừng này phần trăm tiến độ
    tauHoa:0.12,         // kẻ dại (dưới mốc ngu) đột phá hỏng: tỉ lệ tẩu hỏa mà chết
    coDuyen:0.08,        // mỗi năm: tỉ lệ gặp cơ duyên = tâm trí/100 × hệ số này
    coDuyenTd:[6,16],    // cơ duyên thêm chừng này phần trăm tiến độ
    thoatChet:1.2,       // kẻ khôn gặp nạn: tỉ lệ thoát = (tâm trí − 50)/100 × hệ số này
    lieu:0.012           // kẻ dại liều mạng: mỗi năm thêm tỉ lệ bỏ mạng = hệ số × (50 − tâm trí)/50
  },
  // ---- với người chơi ----
  nguoi:{
    thuyet:0.002,lua:2,  // thuyết phục kẻ có tên: tỉ lệ − (tâm trí−50)×thuyet; lừa gạt thì gấp lua lần
    ketGiao:{nam:1,rel:1}, // kẻ khôn thấy ngươi mạnh hơn, không thù: chủ động kết giao (mỗi năm một lần, +rel)
    thu:-50              // hảo cảm từ mức này trở xuống là thù: gặp là tính chuyện ra tay
  },
  txt:{
    chay:'{0} thấy thế không xong, bỏ chạy mất dạng.',
    thu:'{0} nhận ra thế tụ lực, vội thu mình thủ thế.',
    hoi:'{0} lùi lại nửa bước, vận công trị thương.',
    bua:'{0} nóng nảy vung đòn bừa bãi.',
    tranh:'{0} trông thấy ngươi, ánh mắt lạnh đi, nhưng tự biết chưa phải đối thủ nên lặng lẽ tránh đường.',
    raTay:'{0} chặn đường ngươi: "Nợ cũ hôm nay tính cho xong!"',
    lieu:'{0} chẳng cân nhắc gì, lao thẳng tới gây sự.',
    ketGiao:'{0} chủ động chắp tay chào hỏi, ý muốn kết giao với ngươi.',
    tauHoa:'Nghe nói {0} nóng vội đột phá, tẩu hỏa nhập ma, không qua khỏi.',
    hong:'Nghe nói {0} xung kích bình cảnh thất bại, phải bế quan dưỡng thương.',
    coDuyen:'Nghe nói {0} tìm được một chỗ cơ duyên, tu vi tiến nhanh.'
  }
};
