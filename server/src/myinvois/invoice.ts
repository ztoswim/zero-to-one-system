import { generateInvoiceLineJSON } from './invoiceLineItem';  // 引入发票行项生成函数
import { generateDigitalSignature } from './signature/generateDigitalSignature';  // 引入数字签名生成函数
import { fixedSupplier, generateSupplierJSON } from './supplier';  // 引入固定供应商信息和生成函数
import { generateBuyerJSON } from './buyer';  // 引入买家信息生成函数

export interface Invoice {
  id: string; // 发票号
  issueDate: string; // 开票日期（自动）
  issueTime: string; // 开票时间（自动）
  paymentMode: string; // 付款方式（前端选择）
  totalExcludingTax: number; // 税前总额
  totalIncludingTax: number; // 税后总额
  totalPayableAmount: number; // 应付总额
  totalTaxAmount: number; // 总税额
  invoiceLines: any[]; // 发票明细
  buyer: any; // 买家信息
}

/**
 * 生成 UBL 1.1 格式的发票 JSON
 * @param invoice Invoice 对象
 * @returns 完整的 JSON 格式的发票数据
 */
export function generateInvoiceJSON(invoice: Invoice): object {
  // 将每一项发票行项转化为 JSON
  const invoiceLinesJson = invoice.invoiceLines.map(generateInvoiceLineJSON);

  // 生成供应商和买家的信息（避免重复生成）
  const supplierJson = generateSupplierJSON(fixedSupplier); // 固定供应商信息
  const buyerJson = generateBuyerJSON(invoice.buyer); // 买家信息

  // 构建完整的 JSON 发票结构
  const invoiceJson = {
    "UBLDocumentSignatures": {
      "SignatureInformation": generateDigitalSignature(invoice) // 添加数字签名
    },
    "cbc:InvoiceTypeCode": {
      "listVersionID": "1.1",
      "value": "01" // 发票类型为01
    },
    "cbc:ID": invoice.id,
    "cbc:IssueDate": invoice.issueDate,
    "cbc:IssueTime": invoice.issueTime,
    "cac:AccountingSupplierParty": supplierJson, // 供应商信息
    "cac:AccountingCustomerParty": buyerJson, // 买家信息
    "cbc:DocumentCurrencyCode": "MYR", // 货币代码
    "cac:InvoiceLine": invoiceLinesJson, // 发票行项目
    "cac:PaymentMeans": [
      {
        "cbc:PaymentMeansCode": invoice.paymentMode // 付款方式
      },
      {
        "cac:PayeeFinancialAccount": {
          "cbc:ID": "21901015533" // 固定银行账号
        }
      }
    ],
    "cac:TaxTotal": [
      {
        "cac:TaxSubtotal": {
          "cbc:TaxAmount": {
            "currencyID": "MYR",
            "value": invoice.totalTaxAmount.toFixed(2) // 总税额
          }
        }
      },
      {
        "cbc:TaxAmount": {
          "currencyID": "MYR",
          "value": invoice.totalTaxAmount.toFixed(2) // 总税额
        }
      }
    ],
    "cac:LegalMonetaryTotal": [
      {
        "cbc:TaxExclusiveAmount": {
          "currencyID": "MYR",
          "value": invoice.totalExcludingTax.toFixed(2) // 税前总额
        }
      },
      {
        "cbc:TaxInclusiveAmount": {
          "currencyID": "MYR",
          "value": invoice.totalIncludingTax.toFixed(2) // 税后总额
        }
      },
      {
        "cbc:PayableAmount": {
          "currencyID": "MYR",
          "value": invoice.totalPayableAmount.toFixed(2) // 应付总额
        }
      }
    ]
  };

  return invoiceJson;
}
