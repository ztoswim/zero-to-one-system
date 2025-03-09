import { login } from "./api/userApi";

// 登录用户
export const loginUser = async (username: string, password: string) => {
  try {
    const { token, role } = await login({ username, password });
    // 存储 token 和 role 到 localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("role", role);
    return role; // 返回 role 以便页面跳转
  } catch (error: any) {
    console.error("登录失败:", error?.response?.data?.message || error.message);
    throw new Error(error?.response?.data?.message || "登录失败，请重试");
  }
};

// 获取认证 Token
export const getAuthToken = () => {
  const token = localStorage.getItem("token");
  return token ? token : null; // 返回 token 或 null
};

// 获取用户角色
export const getUserRole = () => {
  const role = localStorage.getItem("role");
  return role ? role : null; // 返回 role 或 null
};

// 注销用户
export const logoutUser = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("role");
  console.log("用户已退出");
};
