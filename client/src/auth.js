import { jwtDecode } from "jwt-decode";

// 获取 Token
export const getToken = () => localStorage.getItem("token");

// 获取用户角色
export const getUserRole = () => {
  return localStorage.getItem("role") || null;
};

// 保存 Token & 角色
export const saveUserAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// 检查 Token 是否有效
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // 确保 Token 没过期
  } catch (error) {
    return false;
  }
};

// auth.js 中的 logout 函数
export const logout = () => {
  try {
    // 删除本地存储的 token 和角色信息
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("username");
  } catch (error) {
    console.error("登出时清除信息失败", error);
  }
};

