// src/controllers/invoiceController.ts

import { generateInvoiceJSON } from "../myinvois/invoice";  // 生成发票 JSON 的函数
import { submitInvoice } from "../services/myinvoisService"; // 提交发票的函数

// 提交发票的处理函数
export const submitInvoiceHandler = async (req: any, res: any): Promise<void> => {
  try {
    const invoiceData = req.body; // 从请求体中获取发票数据

    // 生成发票的 JSON 数据
    const invoiceJson = generateInvoiceJSON(invoiceData);

    // 调用 MyInvois API 提交发票
    const response = await submitInvoice(invoiceJson);

    // 返回成功的结果
    res.status(200).json({
      success: true,
      message: "发票提交成功",
      data: response
    });
  } catch (error: any) {
    // 错误处理
    res.status(500).json({
      success: false,
      message: error.message || "提交发票失败"
    });
  }
};
