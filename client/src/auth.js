import { jwtDecode } from "jwt-decode"; // ✅ 使用命名导入

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// 获取当前用户角色
export const getUserRole = () => {
    const token = localStorage.getItem("token"); // 从 localStorage 读取 Token
    if (!token) return null;
  
    try {
      const decoded = jwtDecode(token); // 解码 Token
      return decoded.role || null; // 确保有 role 字段
    } catch (error) {
      console.error("Token 解析错误:", error);
      return null;
    }
  };

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // 存在 token 说明已登录
  };