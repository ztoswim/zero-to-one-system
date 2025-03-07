import { jwtDecode } from "jwt-decode";
import { apiClient } from "./apiConfig";
import { saveUserAuth } from "../auth";

const AUTH_API_URL = "/auth";

// 定义错误处理函数
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

export const login = async (username: string, password: string): Promise<{ token: string; role: string }> => {
  try {
    const { data } = await apiClient.post<{ token: string }>(`${AUTH_API_URL}/login`, { username, password });

    saveUserAuth(data.token);
    const decoded = jwtDecode<{ role: string }>(data.token);
    return { token: data.token, role: decoded.role }; 
  } catch (error) {
    throw new Error(handleApiError(error, "登录失败"));
  }
};

export const registerCustomer = async (email: string, username: string, password: string): Promise<any> => {
  try {
    const { data } = await apiClient.post(`${AUTH_API_URL}/register/customer`, { email, username, password });
    return data;
  } catch (error) {
    throw new Error(handleApiError(error, "注册失败"));
  }
};

export const registerEmployee = async (
  username: string, 
  password: string, 
  role: string, 
  token: string
): Promise<any> => {
  try {
    const { data } = await apiClient.post(
      `${AUTH_API_URL}/register/employee`,
      { username, password, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error) {
    throw new Error(handleApiError(error, "员工注册失败"));
  }
};

export const resetPassword = async (email: string, username: string, newPassword: string): Promise<any> => {
  try {
    const { data } = await apiClient.put(`${AUTH_API_URL}/reset-password`, { email, username, newPassword });
    return data;
  } catch (error) {
    throw new Error(handleApiError(error, "密码重置失败"));
  }
};
