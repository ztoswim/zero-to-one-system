import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  esbuild: {
    loader: {
      '.js': 'jsx',  // 设置 .js 文件使用 JSX 语法
    },
  },
  server: {
    open: true, // 启动时自动打开浏览器
  }
});
