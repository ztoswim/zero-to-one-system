import api from "./apiConfig";

// 用户注册（顾客）
export const registerCustomer = async (data: {
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}) => {
  const response = await api.post("/auth/register/customer", data);
  return response.data;
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

// 获取当前用户信息
export const getCurrentUser = async () => {
  const response = await api.get("/user/me");
  return response.data;
};

// 更新用户信息
export const updateUser = async (id: string, data: { username: string }) => {
  const response = await api.put(`/user/${id}`, data);
  return response.data;
};

// 删除用户
export const deleteUser = async (id: string) => {
  const response = await api.delete(`/user/${id}`);
  return response.data;
};
