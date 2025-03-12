export interface InvoiceLineItem {
  id: number;
  description: string;
  classification: string;
  productTariffCode?: string;
  countryOfOrigin?: string;
  quantity: number;
  measurementUnit?: string;
  unitPrice: number;
  subtotal: number;
  discountAmount?: number;
  discountRate?: number;
  feeChargeAmount?: number;
  feeChargeRate?: number;
  taxType: string;
  taxRate?: number;
  taxAmount: number;
  amountExemptedFromTax?: number;
  taxExemptionReason?: string;
  totalExcludingTax: number;
}

/**
 * **生成发票行项目 JSON**
 * @param item 发票行对象
 * @returns JSON 结构
 */
export function generateInvoiceLineJSON(item: InvoiceLineItem): any {
  return {
    id: item.id,
    description: item.description,
    classification: item.classification,
    productTariffCode: item.productTariffCode || "",
    countryOfOrigin: item.countryOfOrigin || "",
    quantity: item.quantity,
    measurementUnit: item.measurementUnit || "EA",
    unitPrice: item.unitPrice.toFixed(2),
    subtotal: item.subtotal.toFixed(2),
    discountAmount: item.discountAmount ? item.discountAmount.toFixed(2) : "0.00",
    discountRate: item.discountRate ? item.discountRate.toFixed(2) : "0.00",
    feeChargeAmount: item.feeChargeAmount ? item.feeChargeAmount.toFixed(2) : "0.00",
    feeChargeRate: item.feeChargeRate ? item.feeChargeRate.toFixed(2) : "0.00",
    taxType: item.taxType,
    taxRate: item.taxRate ? item.taxRate.toFixed(2) : "0.00",
    taxAmount: item.taxAmount.toFixed(2),
    amountExemptedFromTax: item.amountExemptedFromTax ? item.amountExemptedFromTax.toFixed(2) : "0.00",
    taxExemptionReason: item.taxExemptionReason || "",
    totalExcludingTax: item.totalExcludingTax.toFixed(2),
  };
}
