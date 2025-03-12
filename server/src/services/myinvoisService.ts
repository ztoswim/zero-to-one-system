// myinvoisService.ts

import axios from "axios";
import { getMyInvoisToken } from "./myinvoisTokenService"; // 引入获取 token 的函数
import dotenv from "dotenv";

dotenv.config();

const { INVOICE_API_URL, ONBEHALFOF } = process.env;

if (!INVOICE_API_URL || !ONBEHALFOF) {
  throw new Error("Missing MyInvois API settings in .env");
}

/**
 * 提交发票到 MyInvois
 * @param invoiceData 发票数据
 */
export const submitInvoice = async (invoiceData: object) => {
  try {
    // 获取访问令牌
    const token = await getMyInvoisToken();
    
    // 使用获取到的 token 提交发票
    const response = await axios.post(
      `${INVOICE_API_URL}/api/v1.0/documentsubmissions/`,
      invoiceData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          "On-Behalf-Of": ONBEHALFOF as string
        }
      }
    );

    return response.data;
  } catch (error: any) {
    console.error("提交发票失败:", error.response?.data || error.message);
    throw new Error("发票提交失败");
  }
};
