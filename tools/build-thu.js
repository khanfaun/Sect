// Ráp BẢN THỬ: phu-sinh-thu.html (cùng nội dung bản chính, khác tiêu đề).
// Dùng: python3 tools/excel2game.py && node tools/build-thu.js
process.env.PS_TITLE = 'Phù Sinh (bản thử)';
process.argv[2] = 'phu-sinh-thu.html';
require('./build.js');
