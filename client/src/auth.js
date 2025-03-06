import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

// 获取 Token & 角色
export const getToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role") || "";

// 存储 Token & 角色
export const saveUserAuth = (token, role) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  window.dispatchEvent(new Event("storage")); // 触发 storage 事件
};

// 检查 Token 是否有效
export const isAuthenticated = () => {
  const token = getToken();
  if (!token) return false;
  try {
    return jwtDecode(token).exp * 1000 > Date.now();
  } catch {
    return false;
  }
};

// 退出登录
export const logout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  window.dispatchEvent(new Event("storage")); // 触发 storage 事件
};

// 🔥 自定义 Hook：自动监听用户角色变化
export const useAuth = () => {
  const [userRole, setUserRole] = useState(getUserRole()); // ✅ 确保初始值是字符串

  useEffect(() => {
    const handleStorageChange = () => {
      const newRole = getUserRole();
      console.log("用户角色更新:", newRole);
      setUserRole(newRole);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  return userRole;
};
