// src/utils/biztoryUtils.ts
import axios from "axios";
import md5 from "md5";
import dotenv from "dotenv";

dotenv.config();

// 从 .env 中获取 Biztory 相关的环境变量
const { BIZTORY_SUBDOMAIN, BIZTORY_API_KEY, BIZTORY_ADMIN_USERNAME, BIZTORY_BOSS_USERNAME, BIZTORY_ADMIN_USER_ID, BIZTORY_BOSS_USER_ID } = process.env;

// 扩展 Role 类型以支持所有角色
type Role = "admin" | "boss" | "coach" | "customer";

// 定义 biztoryAccounts 对象的类型
const biztoryAccounts: Record<"admin" | "boss", { username: string; apiKey: string; userId: string }> = {
  admin: {
    username: BIZTORY_ADMIN_USERNAME!,
    apiKey: BIZTORY_API_KEY!,
    userId: BIZTORY_ADMIN_USER_ID!,
  },
  boss: {
    username: BIZTORY_BOSS_USERNAME!,
    apiKey: BIZTORY_API_KEY!,
    userId: BIZTORY_BOSS_USER_ID!,
  },
};

// 登录 Biztory
export const loginToBiztory = async (role: "admin" | "boss") => {
  const biztoryAccount = biztoryAccounts[role];

  if (!biztoryAccount) {
    throw new Error("无效的角色");
  }

  const { username: biztoryUsername, apiKey, userId } = biztoryAccount;

  // 使用 MD5 加密用户名和 API 密钥
  const encryptedPassword = md5(biztoryUsername + apiKey);
  const finalPassword = `${userId}_${encryptedPassword}`;

  try {
    const response = await axios.post(
      `https://${BIZTORY_SUBDOMAIN}.biztory.com.my/api_v1/api_login?api_key=${apiKey}`,
      {
        name: biztoryUsername,
        password: finalPassword,
      }
    );

    if (response.status === 200) {
      return { message: "登录成功！" };
    } else {
      throw new Error("Biztory 登录失败");
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(`请求 Biztory 失败: ${error.message}`);
    } else {
      throw new Error("请求 Biztory 失败: 未知错误");
    }
  }
};
