// Ảnh trong src/assets: khi dựng (npm run build) được nhúng thẳng vào phu-sinh.html.
// window.PS_ANH['Summer-day'] = địa chỉ ảnh; lớp nền hộp thoại dùng biến CSS --tex-*.
const M = import.meta.glob('../assets/**/*.webp', { eager: true, query: '?url', import: 'default' });
const A = {};
for (const [k, v] of Object.entries(M)) A[k.split('/').pop().replace(/\.webp$/, '')] = v;
window.PS_ANH = A;
const css = document.documentElement.style;
if (A['Texture-Horizon']) css.setProperty('--tex-h', `url("${A['Texture-Horizon']}")`);
if (A['Texture-Vertical']) css.setProperty('--tex-v', `url("${A['Texture-Vertical']}")`);
if (A['Texture-Square']) css.setProperty('--tex-sq', `url("${A['Texture-Square']}")`);
