import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";

// 定义 Token 结构
interface DecodedToken {
  exp: number;
  [key: string]: any; // 允许其他 JWT 字段
}

// 获取 Token & 角色
export const getToken = (): string | null => localStorage.getItem("token");
export const getUserRole = (): string | null => localStorage.getItem("role");

// 存储 Token & 角色
export const saveUserAuth = (token: string, role: string) => {
  localStorage.setItem("token", token);
  localStorage.setItem("role", role);
  window.dispatchEvent(new Event("storage")); // 通知其他组件
};

// 检查 Token 是否有效
export const isAuthenticated = (): boolean => {
  const token = getToken();
  if (!token) return false;

  try {
    const decoded: DecodedToken = jwtDecode(token);
    return decoded.exp * 1000 > Date.now();
  } catch (error) {
    console.error("Token 解析失败:", error);
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
  const [userRole, setUserRoleState] = useState<string | null>(getUserRole());

  useEffect(() => {
    const updateRole = () => setUserRoleState(getUserRole());
    window.addEventListener("storage", updateRole);

    // 在页面加载时同步状态
    updateRole();

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
