import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    open: true,
  },
  publicDir: "public", // 确保 Vite 使用 public/index.html
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
