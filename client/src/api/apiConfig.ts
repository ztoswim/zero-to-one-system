import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// 请求拦截器（自动添加 Token）
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器（处理统一响应格式）
api.interceptors.response.use(
  (response) => {
    // 假设后端返回数据都包含 success, message, data
    if (response.data.success) {
      return response.data; // 返回数据（结构：{ success, message, data }）
    } else {
      return Promise.reject(response.data.message || "请求失败");
    }
  },
  (error) => {
    // 错误处理（例如：网络错误，404，500 等）
    if (error.response) {
      // 请求已发出，服务器返回状态码非2xx
      return Promise.reject(error.response.data.message || "服务器错误");
    } else if (error.request) {
      // 请求已发出，但没有收到响应
      return Promise.reject("网络错误，请稍后再试");
    } else {
      // 发生错误时
      return Promise.reject("请求失败");
    }
  }
);

export default api;
