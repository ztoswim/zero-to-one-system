import { apiClient } from "./apiConfig";

const USER_API_URL = "/users";

interface UserProfile {
  username: string;
  role: string;
  email: string; // ✅ 新增 email 字段
}

interface ApiResponse<T> {
  message: string;
  data?: T;
}

// 统一错误处理
const handleApiError = (error: unknown, defaultMessage: string) => {
  if (error instanceof Error) {
    return error.message;
  }
  if (typeof error === "object" && error !== null && "response" in error) {
    const axiosError = error as { response?: { data?: { message?: string } } };
    return axiosError.response?.data?.message || defaultMessage;
  }
  return defaultMessage;
};

// 获取用户信息
export const getUserProfile = async (): Promise<UserProfile> => {
  try {
    const token = localStorage.getItem("token");
    if (!token) throw new Error("用户未登录");

    const { data } = await apiClient.get<UserProfile>(`${USER_API_URL}/profile`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    // ✅ 存储 email 到 localStorage
    localStorage.setItem("username", data.username);
    localStorage.setItem("role", data.role);
    localStorage.setItem("email", data.email);

    return data;
  } catch (error) {
    throw new Error(handleApiError(error, "获取用户信息失败"));
  }
};
