import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

// 获取 Token & 角色
export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role") || null;

// 存储 Token & 角色
export const saveUserAuth = (token: string, role: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  window.dispatchEvent(new Event("storage")); // 触发 storage 事件，通知组件更新
};

// 检查 Token 是否有效
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    const decoded: any = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// 退出登录
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("storage"));
};

// 自定义 Hook：监听用户角色
export const useAuth = (): [string | null, (role: string | null) => void] => {
  const [userRole, setUserRoleState] = useState(getUserRole());

  useEffect(() => {
    const updateRole = () => setUserRoleState(getUserRole());
    window.addEventListener("storage", updateRole);
    return () => window.removeEventListener("storage", updateRole);
  }, []);

  // 确保 setUserRole 也会存入 localStorage
  const setUserRole = (role: string | null) => {
    if (role) {
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("role");
    }
    setUserRoleState(role);
    window.dispatchEvent(new Event("storage"));
  };

  return [userRole, setUserRole];
};
