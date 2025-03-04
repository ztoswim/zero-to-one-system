import axios from "axios";
import API_URL from "../config"; // ✅ 直接引入 API 配置

const USER_API = `${API_URL}/api/users`; // 统一 API 地址

// 获取本地存储的 token
const getToken = () => {
  return localStorage.getItem("token");
};

// 设置默认请求头，添加 Authorization 头
const apiInstance = axios.create();
apiInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔹 用户登录
export const loginUser = async (userData) => {
  try {
    const response = await apiInstance.post(`${USER_API}/login`, userData);
    return response.data;
  } catch (error) {
    console.error("登录失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 学生注册（仅限 student_info 里存在的邮箱）
export const registerStudent = async (userData) => {
  try {
    const response = await apiInstance.post(`${USER_API}/register-student`, userData);
    return response.data;
  } catch (error) {
    console.error("学生注册失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 Boss 创建用户
export const registerAdmin = async (userData) => {
  try {
    const response = await apiInstance.post(`${USER_API}/register-admin`, userData);
    return response.data;
  } catch (error) {
    console.error("管理员注册失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 获取所有用户
export const getUsers = async () => {
  try {
    const response = await apiInstance.get(USER_API);
    return response.data;
  } catch (error) {
    console.error("获取用户列表失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 获取单个用户
export const getUserByUsername = async (username) => {
  try {
    const response = await apiInstance.get(`${USER_API}/${username}`);
    return response.data;
  } catch (error) {
    console.error("获取用户失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 更新用户信息
export const updateUser = async (username, userData) => {
  try {
    const response = await apiInstance.put(`${USER_API}/${username}`, userData);
    return response.data;
  } catch (error) {
    console.error("更新用户失败:", error.response?.data || error.message);
    throw error;
  }
};

// 🔹 删除用户（Boss 不能删除）
export const deleteUser = async (username) => {
  try {
    const response = await apiInstance.delete(`${USER_API}/${username}`);
    return response.data; // ✅ 确保前端能接收删除成功的信息
  } catch (error) {
    console.error("删除用户失败:", error.response?.data || error.message);
    throw error;
  }
};
