import React, { useEffect, useState } from 'react';
import { getProducts, createProduct, updateProduct, deleteProduct } from '../api/productAPI'; // 引入商品API
import ProductForm from '../components/ProductForm';
import ReactModal from 'react-modal';

// 设置 Modal 的根元素
ReactModal.setAppElement('#root');

interface Product {
  _id: string;
  description: string;
  classification: string;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  taxType: string;
  taxAmount: number;
  totalExcludingTax: number;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // 获取商品列表
  const fetchProducts = async () => {
    try {
      const data = await getProducts(); // 使用商品API获取数据
      setProducts(data);
    } catch (error) {
      console.error('获取商品列表失败', error);
    }
  };

  // 创建新商品
  const handleCreateProduct = async (newProduct: Product) => {
    try {
      await createProduct(newProduct); // 使用商品API创建商品
      fetchProducts(); // 刷新商品列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('创建商品失败', error);
    }
  };

  // 编辑商品
  const handleEditProduct = async (product: Product) => {
    try {
      if (!product._id) {
        throw new Error('商品ID不存在');
      }
      await updateProduct(product._id, product); // 使用商品API更新商品
      fetchProducts(); // 刷新商品列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('编辑商品失败', error);
    }
  };

  // 删除商品
  const handleDeleteProduct = async (productId: string) => {
    try {
      await deleteProduct(productId); // 使用商品API删除商品
      fetchProducts(); // 刷新商品列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('删除商品失败', error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // 新建商品，清空编辑数据
  const handleCreateNew = () => {
    setEditingProduct(null); // 清空表单数据
    setShowModal(true); // 显示新建表单
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>商品列表</h1>
        <button onClick={handleCreateNew} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>添加新商品</button>
      </div>

      {/* 商品列表 */}
      {Array.isArray(products) && products.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {products.map((product) => (
            <li key={product._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span
                onClick={() => { setEditingProduct(product); setShowModal(true); }}
                style={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}
              >
                {product.description}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>没有商品数据</p>
      )}

      {/* 商品表单 Modal */}
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="商品表单"
      >
        <ProductForm
          product={editingProduct}
          onSubmit={editingProduct ? handleEditProduct : handleCreateProduct}
          onClose={() => setShowModal(false)}
          onDelete={editingProduct ? handleDeleteProduct : undefined} // 删除按钮只在编辑时显示
        />
      </ReactModal>
    </div>
  );
};

export default ProductPage;
