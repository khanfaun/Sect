// Vite: `npm run dev` mở game trên máy để sửa, tự tải lại khi lưu tệp.
// `npm run build` ra phu-sinh.html một tệp duy nhất (gồm cả phần React).
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { viteSingleFile } from 'vite-plugin-singlefile';
import { createRequire } from 'module';
import path from 'path';
const require = createRequire(import.meta.url);
const ghepPath = path.resolve('tools/ghep.js');

// Ghép các tệp src/game/ (mã game kiểu cũ, chạy chung một phạm vi) vào trang.
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
  plugins: [phuSinh(), react(), viteSingleFile()],
  server: { port: 5173, host: true },
  build: { outDir: '../dist', emptyOutDir: true },
});
