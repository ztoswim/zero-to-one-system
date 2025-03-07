import { apiClient } from "./apiConfig";

const USER_API_URL = "/users";

interface UserProfile {
  username: string;
  role: string;
}

export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("token");
    const { data } = await apiClient.get<UserProfile>(`${USER_API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);

    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "获取用户信息失败");
  }
};

export const updateEmployee = async (userId: string, role: string, token: string) => {
  try {
    const { data } = await apiClient.put(
      `${USER_API_URL}/update-employee`,
      { userId, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "更新员工信息失败");
  }
};

export const deleteUser = async (userId: string, token: string) => {
  try {
    const { data } = await apiClient.delete(`${USER_API_URL}/${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "删除用户失败");
  }
};