import { apiClient } from "./apiConfig";

const USER_API_URL = "/users";

export interface UserProfile {
  _id?: string; // MongoDB ID
  username: string;
  role: string;
  email: string;
}

// 🔹 获取当前登录用户的信息
export const getUserProfile = async (): Promise<UserProfile> => {
  const { data } = await apiClient.get<UserProfile>(`${USER_API_URL}/profile`);
  
  // ✅ 统一存储到 localStorage，方便全局管理
  localStorage.setItem("username", data.username);
  localStorage.setItem("role", data.role);
  localStorage.setItem("email", data.email);

  return data;
};

// 🔹 Boss 编辑员工角色
export const updateEmployee = async (userId: string, role: string): Promise<string> => {
  const { data } = await apiClient.put<{ message: string }>(`${USER_API_URL}/edit`, { userId, role });
  return data.message;
};

// 🔹 Boss 删除用户
export const deleteUser = async (userId: string): Promise<string> => {
  const { data } = await apiClient.delete<{ message: string }>(`${USER_API_URL}/delete/${userId}`);
  return data.message;
};
