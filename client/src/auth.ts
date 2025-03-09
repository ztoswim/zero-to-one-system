import { login } from "./api/userApi";

export const loginUser = async (username: string, password: string) => {
  try {
    const { token, role } = await login({ username, password });
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    return role; // 返回 role 以便页面跳转
  } catch (error) {
    console.error("登录失败", error);
    throw error;
  }
};

export const getAuthToken = () => localStorage.getItem("token");
export const getUserRole = () => localStorage.getItem("role");
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
};
