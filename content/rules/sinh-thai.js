// Nguồn chuẩn: địa hình theo khí hậu (sinh thái) của từng ô. Dữ liệu ô: content/rules/mapd-bio.js (tools/sinh-thai.py).
// Luật xử lý ở src/game/core2/04-luoi-luc-giac.js (g.bio). g.ter (8 loại gốc) vẫn giữ để các luật cũ chạy như trước.
// BIO_GOC: loại gốc trong TER_N; BIO_COST: công đi bộ vào ô (thay TER_COST).
const BIO_N=['Vân hải','Đồng bằng','Rừng','Núi cao','Sông','Hồ','Đồi','Đầm lầy',
  'Tuyết nguyên','Rừng lá kim','Núi tuyết','Hồ băng','Sa mạc','Hoang mạc đá','Núi đá đỏ','Ốc đảo',
  'Rừng nhiệt đới','Trúc lâm','Thảo nguyên','Rừng nguyên sinh','Đồi tuyết','Hồ sen'];
const BIO_GOC=[0,1,2,3,4,5,6,7, 1,2,3,5,1,6,3,1, 2,2,1,2,6,5];
const BIO_COST=[40,1,1.4,3,3.5,30,1.8,2.2, 1.6,1.6,3.8,30,1.7,1.9,3.2,1, 1.8,1.5,0.9,2,2.2,30];
