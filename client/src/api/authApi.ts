import { jwtDecode } from "jwt-decode";
import { apiClient } from "./apiConfig";
import { saveUserAuth } from "../auth";

const AUTH_API_URL = "/auth";

export const login = async (username: string, password: string) => {
  try {
    const { data } = await apiClient.post<{ token: string }>(`${AUTH_API_URL}/login`, { username, password });

    saveUserAuth(data.token);
    const decoded = jwtDecode<{ role: string }>(data.token);
    return { token: data.token, role: decoded.role }; // ✅ 返回 token 和 role
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "登录失败");
  }
};

export const registerCustomer = async (email: string, username: string, password: string) => {
  try {
    const { data } = await apiClient.post(`${AUTH_API_URL}/register/customer`, { email, username, password });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "注册失败");
  }
};

export const registerEmployee = async (username: string, password: string, role: string, token: string) => {
  try {
    const { data } = await apiClient.post(
      `${AUTH_API_URL}/register/employee`,
      { username, password, role },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "员工注册失败");
  }
};

export const resetPassword = async (email: string, username: string, newPassword: string) => {
  try {
    const { data } = await apiClient.put(`${AUTH_API_URL}/reset-password`, { email, username, newPassword });
    return data;
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "密码重置失败");
  }
};