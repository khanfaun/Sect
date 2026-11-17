// Ráp BẢN THỬ: phu-sinh-thu.html (cùng nội dung bản chính, khác tiêu đề).
// Dùng: node tools/build-thu.js
process.env.PS_TITLE = 'Phù Sinh (bản thử)';
process.argv[2] = 'phu-sinh-thu.html';
require('./build.js');
