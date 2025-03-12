import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const { CLIENT_ID, CLIENT_SECRET, IDENTITY_API_URL } = process.env;

if (!CLIENT_ID || !CLIENT_SECRET || !IDENTITY_API_URL) {
  throw new Error("❌ Missing MyInvois API credentials in .env");
}

// **缓存 Token，减少 API 请求**
let cachedToken: string | null = null;
let tokenExpiry: number = 0;

/**
 * **获取 MyInvois API 访问令牌**
 */
export const getMyInvoisToken = async (): Promise<string> => {
  try {
    const now = Math.floor(Date.now() / 1000);

    // ✅ **如果 Token 仍然有效，直接返回**
    if (cachedToken && now < tokenExpiry) {
      return cachedToken;
    }

    console.log("🔑 获取新的 MyInvois 访问令牌...");

    const response = await axios.post<{ access_token: string; expires_in: number }>(
      IDENTITY_API_URL as string,
      new URLSearchParams({
        grant_type: "client_credentials",
        client_id: CLIENT_ID as string,
        client_secret: CLIENT_SECRET as string,
        scope: "InvoicingAPI"
      }),
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    // ✅ **缓存 Token**
    cachedToken = response.data.access_token;
    tokenExpiry = now + response.data.expires_in - 30;

    console.log("✅ MyInvois Token 获取成功！");
    return cachedToken;
  } catch (error: any) {
    console.error("❌ 获取 MyInvois 访问令牌失败:", error.response?.data || error.message);
    throw new Error("无法获取 MyInvois 访问令牌");
  }
};
