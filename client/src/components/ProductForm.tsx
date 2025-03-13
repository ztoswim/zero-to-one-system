import React, { useState, useEffect } from 'react';

interface ProductFormProps {
  product: { _id: string; description: string; classification: string; quantity: number; unitPrice: number; subtotal: number; taxType: string; taxAmount: number; totalExcludingTax: number } | null;
  onSubmit: (product: any) => void;
  onClose: () => void;
  onDelete?: (productId: string) => void; // 可选的删除函数
}

const ProductForm: React.FC<ProductFormProps> = ({ product, onSubmit, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    _id: '',
    description: '',
    classification: '',
    quantity: 0,
    unitPrice: 0,
    subtotal: 0,
    taxType: '',
    taxAmount: 0,
    totalExcludingTax: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        _id: product._id,
        description: product.description,
        classification: product.classification,
        quantity: product.quantity,
        unitPrice: product.unitPrice,
        subtotal: product.subtotal,
        taxType: product.taxType,
        taxAmount: product.taxAmount,
        totalExcludingTax: product.totalExcludingTax,
      });
    }
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // 提交表单
  };

  const handleDelete = () => {
    if (onDelete && product) {
      onDelete(product._id); // 调用删除函数
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px' }}>
      {/* 左侧商品信息 */}
      <div style={{ flex: 1 }}>
        <h3>商品信息</h3>
        <label>描述:
          <input type="text" name="description" value={formData.description} onChange={handleChange} required />
        </label>
        <label>分类:
          <input type="text" name="classification" value={formData.classification} onChange={handleChange} required />
        </label>
        <label>数量:
          <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} required />
        </label>
        <label>单价:
          <input type="number" name="unitPrice" value={formData.unitPrice} onChange={handleChange} required />
        </label>
        <label>小计:
          <input type="number" name="subtotal" value={formData.subtotal} onChange={handleChange} required />
        </label>
        <label>税务类型:
          <input type="text" name="taxType" value={formData.taxType} onChange={handleChange} required />
        </label>
        <label>税额:
          <input type="number" name="taxAmount" value={formData.taxAmount} onChange={handleChange} required />
        </label>
        <label>不含税总额:
          <input type="number" name="totalExcludingTax" value={formData.totalExcludingTax} onChange={handleChange} required />
        </label>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button type="submit">{product ? '更新商品' : '创建商品'}</button>
        {product && onDelete && (
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            删除
          </button>
        )}
        <button type="button" onClick={onClose}>关闭</button>
      </div>
    </form>
  );
};

export default ProductForm;
