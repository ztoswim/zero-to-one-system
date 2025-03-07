import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  console.error("API_BASE_URL is not defined. Please check your .env file.");
}

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// 请求拦截器：自动添加 Authorization 头
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 响应拦截器：统一处理错误
apiClient.interceptors.response.use(
  (response) => response.data, // 直接返回 response.data
  (error) => {
    const errorMessage = error.response?.data?.message || "请求失败";
    return Promise.reject(new Error(errorMessage));
  }
);

export { API_BASE_URL, apiClient };
