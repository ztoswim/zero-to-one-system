import api from "./apiConfig";

// ✅ 处理后端的错误消息
export const registerCustomer = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  try {
    const response = await api.post("/auth/register/customer", data);
    return response.data;
  } catch (error: any) {
    // ✅ 获取后端返回的错误信息
    const errorMessage = error.response?.data?.error || "注册失败，请稍后再试";
    throw new Error(errorMessage); // 抛出具体的错误信息，前端可捕获
  }
};

// 用户注册（员工）
export const registerEmployee = async (data: {
  email: string;
  username: string;
  password: string;
  role: string;
}) => {
  const response = await api.post("/auth/register/employee", data);
  return response.data;
};

// 用户登录
export const login = async (data: { username: string; password: string }) => {
  const response = await api.post("/auth/login", data);

  // 保存用户信息（包括 Biztory 账号信息）
  const { token, role, biztoryAccount } = response.data;

  // 存储 token 和 role
  localStorage.setItem("authToken", token);
  localStorage.setItem("role", role);

  // 如果有 Biztory 账号信息，将其存储
  if (biztoryAccount) {
    localStorage.setItem("biztoryAccount", JSON.stringify(biztoryAccount));
  }

  return response.data;
};

// 忘记密码
export const forgotPassword = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/auth/forgot-password", data);
  return response.data;
};

// 获取所有用户
export const getAllUsers = async () => {
  const response = await api.get("/users/list");
  return response.data;
};

// 获取当前用户信息
export const getCurrentUser = async () => {
  const response = await api.get("/users/me");
  return response.data;
};

export const updateUser = async (id: string, data: { username: string; role: string }) => {
  const response = await api.put(`/users/${id}`, data);
  return response.data;
};

// 删除用户
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};
