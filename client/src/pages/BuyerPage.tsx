import { useState, useEffect } from 'react';
import { getBuyers, createBuyer, updateBuyer, deleteBuyer } from '../api/buyerAPI';
import BuyerForm from '../components/BuyerForm';
import { toast } from 'react-toastify';

const BuyerPage = () => {
  const [buyers, setBuyers] = useState<any[]>([]);
  const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(true);

  // 获取买家列表
  const fetchBuyers = async () => {
    try {
      const response = await getBuyers();
      setBuyers(response);
      setLoading(false);
    } catch (error) {
      toast.error('获取买家列表失败');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBuyers();
  }, []);

  // 提交新买家或编辑买家
  const handleSubmit = async (buyerId: string, buyerData: any) => {
    try {
      if (buyerId) {
        // 编辑
        await updateBuyer(buyerId, buyerData);
        toast.success('编辑买家成功！');
      } else {
        // 新建
        await createBuyer(buyerData);
        toast.success('新建买家成功！');
      }
      fetchBuyers(); // 成功后重新获取买家列表
      setShowForm(false); // 关闭表单
    } catch (error) {
      toast.error('操作失败，请重试');
    }
  };

  const handleDelete = async (buyerId: string) => {
    try {
      await deleteBuyer(buyerId);
      setBuyers(buyers.filter(buyer => buyer._id !== buyerId)); // 确保删除使用 _id
      toast.success('买家删除成功');
    } catch (error) {
      toast.error('删除买家失败');
    }
  };

  return (
    <div>
      <h1>买家管理</h1>
      <button onClick={() => { setSelectedBuyer(null); setShowForm(true); }} className="btn btn-primary mb-4">
        新建买家
      </button>
      
      {loading ? <div>加载中...</div> : (
        <div className="flex flex-wrap">
          {buyers.map((buyer) => (
            <button
              key={buyer._id} // 确保每个按钮有唯一的 key
              onClick={() => { setSelectedBuyer(buyer); setShowForm(true); }}
              className="btn btn-secondary m-2"
              onDoubleClick={() => handleDelete(buyer._id)} // 使用 _id 进行删除
            >
              {buyer.name}
            </button>
          ))}
        </div>
      )}

      {showForm && (
        <BuyerForm
          selectedBuyer={selectedBuyer}
          onClose={() => setShowForm(false)}
          onSuccess={fetchBuyers}
          onSubmit={handleSubmit}  // 传递 onSubmit 函数
        />
      )}
    </div>
  );
};

export default BuyerPage;
