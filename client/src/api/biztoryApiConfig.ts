import axios from "axios";

// Biztory API 基础 URL
const BIZTORY_API_BASE_URL = "https://zerotooone.biztory.com.my/api_v1";

// 创建 Biztory API 实例
const biztoryApi = axios.create({
  baseURL: BIZTORY_API_BASE_URL,
  headers: {
    "Content-Type": "application/json", // 设置默认请求头
  },
});

// 请求拦截器（自动添加 Biztory API 认证信息）
biztoryApi.interceptors.request.use(
  (config) => {
    // 获取 Biztory 账户信息
    const biztoryAccount = localStorage.getItem("biztoryAccount");
    if (biztoryAccount) {
      const account = JSON.parse(biztoryAccount);
      // 如果有 Biztory API 账户信息，添加到请求头中
      config.headers["Api-key"] = account.biztoryApiKey; // Biztory API Key
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default biztoryApi;
