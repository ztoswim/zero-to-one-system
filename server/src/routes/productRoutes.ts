import express from 'express';
import { createProductItem, getAllProductItems, updateProductItem, deleteProductItem } from '../controllers/productController';

const router = express.Router();

// 获取所有商品项
router.get('/', getAllProductItems);

// 创建新的商品项
router.post('/', createProductItem);

// 编辑商品项
router.put('/:productId', updateProductItem);

// 删除商品项
router.delete('/:productId', deleteProductItem);

export default router;
