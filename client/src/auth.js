import { jwtDecode } from "jwt-decode"; // ✅ 使用命名导入

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

// 获取用户角色
export const getUserRole = () => {
    return localStorage.getItem("role") || null;
  };
  
  // 保存用户 Token & 角色
  export const saveUserAuth = (token, role) => {
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
  };
  
  // 清除用户信息
  export const clearUserAuth = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
  };

export const logout = () => {
  localStorage.removeItem("token");
};

export const isAuthenticated = () => {
    const token = localStorage.getItem("token");
    return !!token; // 存在 token 说明已登录
  };