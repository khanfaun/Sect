// Ghép các tệp nhỏ trong src/game/ (theo thứ tự trong src/game/thu-tu.json) thành một trang HTML duy nhất.
// Dùng chung cho tools/build.js, tools/build-thu.js, tools/run.js và vite.config.js.
const fs = require('fs'), path = require('path');
const root = path.join(__dirname, '..');
const rd = f => fs.readFileSync(path.join(root, f), 'utf8');
const order = () => JSON.parse(rd('src/game/thu-tu.json'));
// nhom: chỉ lấy các nhóm này (vd ['core','core2'] cho phần luật chơi không giao diện)
function script(nhom) {
  require('./content-build').buildContent();
  const files = order().filter(f => !nhom || nhom.includes(f.split('/')[0]) || (f.startsWith('content/') && nhom.includes('data')));
  const s = files.map(f => f.startsWith('nap:') ? nap(f) : rd(f.startsWith('content/') ? f : 'src/game/' + f)).join('\n');
  if (s.includes('</script')) throw new Error('mã chứa thẻ đóng script');
  return s;
}
// "nap:devBotNap": não máy tự chơi (dùng chung với bot.js) gói trong một hàm, chỉ nạp khi bấm Dev test > Tự chơi.
// Khai báo bên trong là của riêng hàm (không đụng tên trong game); gán lại hàm của game (placeAct=…) vẫn có tác dụng như bot.js.
function nap(f) {
  const ten = f.slice(4);
  const L = ['src/game/dev/01-bot-loi.js', 'tools/bot-ext.js', 'tools/bot-smart.js'];
  return `var DEV_BOT=null;\nfunction ${ten}(){if(DEV_BOT)return DEV_BOT;\n` + L.map(rd).join('\n') +
    `\nDEV_BOT={buoc:function(){botManage();if(G.run){if(G.run.scene)botScene();else botPlan();}},bc:function(){return typeof botReport==='function'?botReport():'';}};return DEV_BOT;}`;
}
function html(title) {
  let h = rd('src/index.html');
  title = title || process.env.PS_TITLE;
  if (title) h = h.replace('<title>Phù Sinh</title>', `<title>${title}</title>`);
  return h.replace('/*STYLE*/', () => rd('src/game/style.css')).replace('/*SCRIPT*/', () => script());
}
module.exports = { root, order, script, html };
