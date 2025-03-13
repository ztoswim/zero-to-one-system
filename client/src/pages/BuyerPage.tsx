import React, { useEffect, useState } from 'react';
import { getBuyers, createBuyer, updateBuyer, deleteBuyer } from '../api/buyerAPI'; // 引入 buyerAPI
import BuyerForm from '../components/BuyerForm';
import ReactModal from 'react-modal';

// 设置 Modal 的根元素
ReactModal.setAppElement('#root');

interface Address {
  addressLine0: string;
  addressLine1?: string;
  addressLine2?: string;
  postalZone?: string;
  cityName: string;
  state: string;
  country: string;
}

interface Buyer {
  _id: string;
  name: string;
  tin: string;
  registrationNumber: string;
  registrationScheme: string;
  sst: string;
  email?: string;
  contact: string;
  address: Address;
}

const BuyerPage: React.FC = () => {
  const [buyers, setBuyers] = useState<Buyer[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBuyer, setEditingBuyer] = useState<Buyer | null>(null);

  // 获取买家列表
  const fetchBuyers = async () => {
    try {
      const data = await getBuyers(); // 使用 buyerAPI 获取数据
      setBuyers(data);
    } catch (error) {
      console.error('获取买家列表失败', error);
    }
  };

  // 创建新买家
  const handleCreateBuyer = async (newBuyer: Buyer) => {
    try {
      await createBuyer(newBuyer); // 使用 buyerAPI 创建买家
      fetchBuyers(); // 刷新列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('创建买家失败', error);
    }
  };

  // 编辑买家
  const handleEditBuyer = async (buyer: Buyer) => {
    try {
      if (!buyer._id) {
        throw new Error('买家ID不存在');
      }
      await updateBuyer(buyer._id, buyer); // 使用 buyerAPI 更新买家
      fetchBuyers(); // 刷新列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('编辑买家失败', error);
    }
  };

  // 删除买家
  const handleDeleteBuyer = async (buyerId: string) => {
    try {
      await deleteBuyer(buyerId); // 使用 buyerAPI 删除买家
      fetchBuyers(); // 刷新列表
      setShowModal(false); // 关闭 Modal
    } catch (error) {
      console.error('删除买家失败', error);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  // 新建买家，清空编辑数据
  const handleCreateNew = () => {
    setEditingBuyer(null); // 清空表单数据
    setShowModal(true); // 显示新建表单
  };

  return (
    <div style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        <h1>买家列表</h1>
        <button onClick={handleCreateNew} style={{ padding: '10px', backgroundColor: 'green', color: 'white', border: 'none', borderRadius: '5px' }}>添加新买家</button>
      </div>

      {/* 买家列表 */}
      {Array.isArray(buyers) && buyers.length > 0 ? (
        <ul style={{ listStyleType: 'none', padding: '0' }}>
          {buyers.map((buyer) => (
            <li key={buyer._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
              <span
                onClick={() => { setEditingBuyer(buyer); setShowModal(true); }}
                style={{ cursor: 'pointer', color: 'blue', fontWeight: 'bold' }}
              >
                {buyer.name}
              </span>
            </li>
          ))}
        </ul>
      ) : (
        <p>没有买家数据</p>
      )}

      {/* 买家表单 Modal */}
      <ReactModal
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        contentLabel="买家表单"
      >
        <BuyerForm
          buyer={editingBuyer}
          onSubmit={editingBuyer ? handleEditBuyer : handleCreateBuyer}
          onClose={() => setShowModal(false)}
          onDelete={editingBuyer ? handleDeleteBuyer : undefined} // 删除按钮只在编辑时显示
        />
      </ReactModal>
    </div>
  );
};

export default BuyerPage;
