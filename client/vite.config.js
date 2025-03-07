import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // 插件配置：集成 React 插件
  plugins: [react()],

  // 开发服务器配置
  server: {
    port: 5173, // 设置开发服务器端口
    open: true, // 启动时自动打开浏览器
  },

  // 解析配置，设置路径别名
  resolve: {
    alias: {
      "@": "/src", // 将 "@" 别名指向 "src" 目录，简化导入路径
    },
  },
});
