import { jwtDecode } from "jwt-decode"; // ✅ 使用命名导入

export const setToken = (token) => {
  localStorage.setItem("token", token);
};

export const getToken = () => {
  return localStorage.getItem("token");
};

export const getUserRole = () => {
  const token = getToken();
  if (!token) return null;

  try {
    const decoded = jwtDecode(token);
    return decoded.role; // JWT 里需要包含 role
  } catch (error) {
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