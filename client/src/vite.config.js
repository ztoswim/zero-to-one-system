import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173, // 确保这里是 5173
    open: true, // 启动后自动打开浏览器
  },
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
