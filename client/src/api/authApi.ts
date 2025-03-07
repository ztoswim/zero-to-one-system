import { jwtDecode } from "jwt-decode";
import { apiClient } from "./apiConfig";
import { saveUserAuth, UserRole } from "../auth";

const AUTH_API_URL = "/auth";

export const login = async (
  username: string, 
  password: string
): Promise<{ token: string; role: UserRole }> => {
  const { data } = await apiClient.post<{ token: string }>(`${AUTH_API_URL}/login`, { username, password });

  console.log("API 返回的数据:", data); // 打印数据，确保 token 被正确返回

  if (!data || !data.token) {
    throw new Error("没有返回有效的 token");
  }

  // ✅ 确保 jwtDecode 正确解析 token
  const decoded = jwtDecode<{ role: string }>(data.token);

  // 🚨 修正类型，确保 role 是 "boss" | "admin" | "coach" | "customer"
  if (!["boss", "admin", "coach", "customer"].includes(decoded.role)) {
    throw new Error("服务器返回的角色信息无效");
  }

  // ✅ 传递正确类型的 role
  saveUserAuth(decoded.role as UserRole, data.token);

  return { token: data.token, role: decoded.role as UserRole };
};

export const registerCustomer = async (
  email: string, 
  username: string, 
  password: string
): Promise<string> => {
  const { data } = await apiClient.post<{ message: string }>(`${AUTH_API_URL}/register/customer`, { email, username, password });
  return data.message;
};

export const registerEmployee = async (
  username: string, 
  password: string, 
  role: string
): Promise<string> => {
  const { data } = await apiClient.post<{ message: string }>(`${AUTH_API_URL}/register/employee`, { username, password, role });
  return data.message;
};

export const resetPassword = async (
  email: string, 
  username: string, 
  newPassword: string
): Promise<string> => {
  const { data } = await apiClient.put<{ message: string }>(`${AUTH_API_URL}/reset-password`, { email, username, newPassword });
  return data.message;
};
