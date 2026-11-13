// Vite: `npm run dev` mở game trên máy để sửa, tự tải lại khi lưu tệp trong src/game/.
// `npm run build` ra phu-sinh.html một tệp duy nhất.
import { defineConfig } from 'vite';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const ghepPath = path.resolve('tools/ghep.js');

function phuSinh() {
  return {
    name: 'phu-sinh-ghep',
    transformIndexHtml: { order: 'pre', handler() { delete require.cache[ghepPath]; return require(ghepPath).html(); } },
    configureServer(server) {
      server.watcher.add(path.resolve('src/game'));
      server.watcher.on('change', f => { if (f.includes(path.join('src', 'game'))) server.ws.send({ type: 'full-reload' }); });
    },
  };
}

export default defineConfig({
  root: 'src',
  plugins: [phuSinh()],
  server: { port: 5173, host: true },
  build: { outDir: '../dist', emptyOutDir: true, assetsInlineLimit: 1e9 },
});
