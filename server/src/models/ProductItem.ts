import mongoose, { Schema, Document } from 'mongoose';

// 定义接口，描述商品项的结构
export interface IProductItem extends Document {
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

// 创建 Mongoose Schema
const productItemSchema = new Schema<IProductItem>({
  id: { type: Number, required: true },
  description: { type: String, required: true },
  classification: { type: String, required: true },
  productTariffCode: { type: String },
  countryOfOrigin: { type: String },
  quantity: { type: Number, required: true },
  measurementUnit: { type: String },
  unitPrice: { type: Number, required: true },
  subtotal: { type: Number, required: true },
  discountAmount: { type: Number },
  discountRate: { type: Number },
  feeChargeAmount: { type: Number },
  feeChargeRate: { type: Number },
  taxType: { type: String, required: true },
  taxRate: { type: Number },
  taxAmount: { type: Number, required: true },
  amountExemptedFromTax: { type: Number },
  taxExemptionReason: { type: String },
  totalExcludingTax: { type: Number, required: true },
});

// 创建 Mongoose Model
const ProductItem = mongoose.model<IProductItem>('ProductItem', productItemSchema);

export default ProductItem;
