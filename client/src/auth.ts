import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

// Token 结构
interface DecodedToken {
  exp: number;
  role: string;
}

// 获取 Token & 角色
export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");

// 存储 Token & 角色
export const saveUserAuth = (token: string) => {
  try {
    const decoded: DecodedToken = jwtDecode(token);
    localStorage.setItem("token", token);
    localStorage.setItem("role", decoded.role);
    window.dispatchEvent(new Event("storage")); // 通知其他组件
  } catch (error) {
    console.error("解析 Token 失败:", error);
  }
};

// 检查是否已认证
export const checkAuth = () => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now(); // 过期时间是秒，转为毫秒比较
  } catch {
    return false;
  }
};

// 退出登录
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("storage")); // 通知组件状态更新
};

// 自定义 Hook：全局管理认证状态
export const useAuth = () => {
  const [userRole, setUserRole] = useState<string | null>(getUserRole());
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(checkAuth());

  useEffect(() => {
    const updateAuth = () => {
      setUserRole(getUserRole());
      setIsAuthenticated(checkAuth());
    };

    window.addEventListener("storage", updateAuth);
    return () => window.removeEventListener("storage", updateAuth);
  }, []);

  return { userRole, isAuthenticated, logout };
};
