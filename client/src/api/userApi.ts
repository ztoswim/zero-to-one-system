import api from "./apiConfig";

// 用户注册（顾客）
export const registerCustomer = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await api.post("/auth/register/customer", data);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "注册顾客失败");
  }
};

// 用户注册（员工）
export const registerEmployee = async (data: {
  email: string;
  username: string;
  password: string;
  role: string;
}) => {
  try {
    const response = await api.post("/auth/register/employee", data);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "注册员工失败");
  }
};

// 用户登录
export const login = async (data: { username: string; password: string }) => {
  try {
    const response = await api.post("/auth/login", data);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "登录失败");
  }
};

// 忘记密码
export const forgotPassword = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await api.post("/auth/forgot-password", data);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "忘记密码失败");
  }
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  try {
    const response = await api.get("/user/me");
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "获取用户信息失败");
  }
};

// 更新用户信息
export const updateUser = async (id: string, data: { username: string }) => {
  try {
    const response = await api.put(`/user/${id}`, data);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "更新用户信息失败");
  }
};

// 删除用户
export const deleteUser = async (id: string) => {
  try {
    const response = await api.delete(`/user/${id}`);
    return response.data;  // 返回数据部分
  } catch (error: any) {
    console.error(error);
    throw new Error(error?.response?.data?.message || "删除用户失败");
  }
};
