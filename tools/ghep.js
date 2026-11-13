// Ghép các tệp nhỏ trong src/game/ (theo thứ tự trong src/game/thu-tu.json) thành một trang HTML duy nhất.
// Dùng chung cho tools/build.js, tools/build-thu.js, tools/run.js và vite.config.js.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
const order = () => JSON.parse(rd('src/game/thu-tu.json'));
// nhom: chỉ lấy các nhóm này (vd ['core','core2'] cho phần luật chơi không giao diện)
function script(nhom) {
  const files = order().filter(f => !nhom || nhom.includes(f.split('/')[0]));
  const s = files.map(f => rd('src/game/' + f)).join('\n');
  if (s.includes('</script')) throw new Error('mã chứa thẻ đóng script');
  return s;
}
function html(title) {
  let h = rd('src/index.html');
  if (title) h = h.replace('<title>Phù Sinh</title>', `<title>${title}</title>`);
  return h.replace('/*STYLE*/', () => rd('src/game/style.css')).replace('/*SCRIPT*/', () => script());
}
module.exports = { root, order, script, html };
