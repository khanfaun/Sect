// Nguồn chuẩn cho Sửa-L câu 49: "tạm giữ bên người" khi túi đầy. Luật: src/game/core2/61-tam-giu.js · chữ: content/text/tam-giu.json (khoá tg.*).
// Túi đầy (người chơi lẫn NPC) mà nhận thêm đồ (Ám Hội, đấu giá, nhặt, phần thưởng, cải căn…) thì món mới nằm ở "tạm giữ" — ngoài các ô túi,
// không dùng/bán/đem ra bàn được cho tới khi cất vào túi. Quá han ngày chưa cất thì mất; bao ngày trước khi mất thì báo trước một lần.
// Thay cách "gửi lại tại chỗ" của Sửa-G cho món mới (món đã gửi trong bản lưu cũ vẫn lấy lại được ở nơi gửi).
const TAM_GIU={han:365,bao:30};
