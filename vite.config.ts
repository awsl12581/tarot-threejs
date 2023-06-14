import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
// https://vitejs.dev/config/
export default defineConfig({
  //数据位置
  plugins: [
    vue(),
  ],
  base:'./',
  // 配置前端服务地址和端口
  server: {
    host: '0.0.0.0',
    port: 8991,
    // 是否开启 https
    https: false,
  },
  build: {
    emptyOutDir: false, // 默认情况下，若 outDir 在 root 目录下，则 Vite 会在构建时清空该目录
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
