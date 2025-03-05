import { jwtDecode } from "jwt-decode";

// 保存 Token & 角色
export const saveUserAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
};

// 获取 Token
export const getToken = () => localStorage.getItem("token");

// 获取用户角色
export const getUserRole = () => {
  return localStorage.getItem("role") || null;
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

// 退出登录（清除 Token 和 角色）
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
