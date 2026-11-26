// Lưu bố cục địa điểm cố định (DD_HAT) thành dữ liệu: src/game/core2/03e-bo-cuc-co-dinh.js (DD_BOCUC).
// Game đọc bố cục từ đây (core2/91 ddBoCuc), không sinh lại -> vị trí địa điểm luôn khớp ảnh bản đồ đã vẽ.
// node tools/dd-luu.js   (chạy lại khi muốn đổi bố cục; sau đó phải vẽ lại ảnh các quận đã vẽ: tools/quan-ve.py)
const fs = require('fs'), vm = require('vm'), path = require('path');
const out = path.join(__dirname, '../src/game/core2/03e-bo-cuc-co-dinh.js');
fs.writeFileSync(out, 'const DD_BOCUC=null;\n'); // sinh từ đầu, không đọc bản cũ
const ctx = vm.createContext({ console, Math, JSON, Date, performance: { now: () => Date.now() } });
vm.runInContext(require('./ghep').script(['core', 'core2', 'data']), ctx, { filename: 'luat-choi.js' });
const s = vm.runInContext('JSON.stringify(ddSinh(DD_HAT))', ctx);
fs.writeFileSync(out, '// Sinh bởi tools/dd-luu.js. Đừng sửa tay.\n// Bố cục địa điểm cố định (hạt giống DD_HAT): mọi thế giới dùng chung, chỉ đổi tên (core2/91 ddTenMoi).\nconst DD_BOCUC=' + s + ';\n');
console.log('đã lưu', s.length, 'ký tự,', JSON.parse(s).regions.reduce((a, R) => a + R.nodes.length, 0), 'nơi');
