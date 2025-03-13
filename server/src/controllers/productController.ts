import { Request, Response } from 'express';
import ProductItem from '../models/ProductItem';

// 获取商品项列表
export const getAllProductItems = async (req: Request, res: Response): Promise<void> => {
  try {
    const productItems = await ProductItem.find();
    res.json(productItems);
  } catch (error) {
    console.error('无法获取商品项列表', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '无法获取商品项列表', error: errorMessage });
  }
};

// 创建新商品项
export const createProductItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const {
      id,
      description,
      classification,
      productTariffCode,
      countryOfOrigin,
      quantity,
      measurementUnit,
      unitPrice,
      subtotal,
      discountAmount,
      discountRate,
      feeChargeAmount,
      feeChargeRate,
      taxType,
      taxRate,
      taxAmount,
      amountExemptedFromTax,
      taxExemptionReason,
      totalExcludingTax,
    } = req.body;

    // 确保所有必需的字段存在
    if (!id || !description || !classification || !quantity || !unitPrice || !subtotal || !taxType || !taxAmount || !totalExcludingTax) {
      res.status(400).json({ message: '所有必需的字段必须提供' });
      return;
    }

    // 创建并保存新商品项
    const newProductItem = new ProductItem({
      id,
      description,
      classification,
      productTariffCode,
      countryOfOrigin,
      quantity,
      measurementUnit,
      unitPrice,
      subtotal,
      discountAmount,
      discountRate,
      feeChargeAmount,
      feeChargeRate,
      taxType,
      taxRate,
      taxAmount,
      amountExemptedFromTax,
      taxExemptionReason,
      totalExcludingTax,
    });

    await newProductItem.save();
    res.status(201).json(newProductItem);
  } catch (error) {
    console.error('创建商品项失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '创建商品项失败', error: errorMessage });
  }
};

// 编辑商品项
export const updateProductItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const { productId } = req.params;
    const {
      id,
      description,
      classification,
      productTariffCode,
      countryOfOrigin,
      quantity,
      measurementUnit,
      unitPrice,
      subtotal,
      discountAmount,
      discountRate,
      feeChargeAmount,
      feeChargeRate,
      taxType,
      taxRate,
      taxAmount,
      amountExemptedFromTax,
      taxExemptionReason,
      totalExcludingTax,
    } = req.body;

    // 确保所有必需的字段存在
    if (!id || !description || !classification || !quantity || !unitPrice || !subtotal || !taxType || !taxAmount || !totalExcludingTax) {
      res.status(400).json({ message: '所有必需的字段必须提供' });
      return;
    }

    const updatedProductItem = await ProductItem.findByIdAndUpdate(
      productId,
      {
        id,
        description,
        classification,
        productTariffCode,
        countryOfOrigin,
        quantity,
        measurementUnit,
        unitPrice,
        subtotal,
        discountAmount,
        discountRate,
        feeChargeAmount,
        feeChargeRate,
        taxType,
        taxRate,
        taxAmount,
        amountExemptedFromTax,
        taxExemptionReason,
        totalExcludingTax,
      },
      { new: true }
    );

    if (!updatedProductItem) {
      res.status(404).json({ message: '商品项未找到' });
      return;
    }

    res.status(200).json(updatedProductItem);
  } catch (error) {
    console.error('更新商品项失败:', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '更新商品项失败', error: errorMessage });
  }
};

// 删除商品项
export const deleteProductItem = async (req: Request, res: Response): Promise<void> => {
  try {
    const productItem = await ProductItem.findByIdAndDelete(req.params.productId);
    if (!productItem) {
      res.status(404).json({ message: '商品项未找到' });
      return;
    }

    res.json({ message: '商品项删除成功' });
  } catch (error) {
    console.error('删除商品项失败', error);
    const errorMessage = error instanceof Error ? error.message : '未知错误';
    res.status(500).json({ message: '删除商品项失败', error: errorMessage });
  }
};
