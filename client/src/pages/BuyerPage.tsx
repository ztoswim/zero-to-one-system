import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { getBuyers, createBuyer, updateBuyer, deleteBuyer } from '../api/buyerAPI';  // 引入 API
import BuyerForm from '../components/BuyerForm';  // 引入 BuyerForm 组件

const BuyerPage = () => {
  const [buyers, setBuyers] = useState<any[]>([]);  // 存储买家列表
  const [selectedBuyer, setSelectedBuyer] = useState<any | null>(null);  // 用于编辑买家的表单
  const [showForm, setShowForm] = useState(false);  // 控制表单的显示与隐藏
  const [loading, setLoading] = useState(true);  // 控制加载状态

  // 获取买家列表
  const fetchBuyers = async () => {
    try {
      const response = await getBuyers();  // 使用 API 获取买家数据
      setBuyers(response);
      setLoading(false);  // 数据加载完成，隐藏加载状态
    } catch (error) {
      setLoading(false);  // 数据加载失败，隐藏加载状态
      toast.error('获取买家列表失败');
    }
  };

  // 添加新买家
  const handleAddBuyer = async (buyerData: any) => {
    try {
      const newBuyer = await createBuyer(buyerData);  // 调用 API 创建新买家
      setBuyers([...buyers, newBuyer]);  // 更新买家列表
      toast.success('新建买家成功！');
    } catch (error) {
      console.error('添加买家失败', error);
      toast.error('添加买家失败，请重试');
    }
  };

  // 编辑买家
  const handleEditBuyer = async (buyerId: string, buyerData: any) => {
    try {
      const updatedBuyer = await updateBuyer(buyerId, buyerData);  // 调用 API 更新买家
      setBuyers(buyers.map((buyer) => (buyer.id === buyerId ? updatedBuyer : buyer)));  // 更新买家列表
      toast.success('编辑买家成功！');
    } catch (error) {
      console.error('编辑买家失败', error);
      toast.error('编辑买家失败，请重试');
    }
  };

  // 删除买家
  const handleDeleteBuyer = async (buyerId: string) => {
    try {
      await deleteBuyer(buyerId);  // 调用 API 删除买家
      setBuyers(buyers.filter((buyer) => buyer.id !== buyerId));  // 从列表中删除该买家
      toast.success('删除买家成功！');
    } catch (error) {
      console.error('删除买家失败', error);
      toast.error('删除买家失败，请重试');
    }
  };

  // 加载时获取买家列表
  useEffect(() => {
    fetchBuyers();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-semibold mb-4">买家管理</h1>

      {/* 按钮显示添加新买家 */}
      <button
        onClick={() => setShowForm(true)}  // 显示新建买家的表单
        className="px-4 py-2 bg-blue-500 text-white rounded mb-4"
      >
        新建买家
      </button>

      {/* 加载中提示 */}
      {loading ? (
        <div className="text-center">加载中...</div>
      ) : (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">买家列表</h2>
          <table className="min-w-full table-auto border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2">姓名</th>
                <th className="border border-gray-300 px-4 py-2">TIN</th>
                <th className="border border-gray-300 px-4 py-2">注册号</th>
                <th className="border border-gray-300 px-4 py-2">操作</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td className="border border-gray-300 px-4 py-2">{buyer.name}</td>
                  <td className="border border-gray-300 px-4 py-2">{buyer.tin}</td>
                  <td className="border border-gray-300 px-4 py-2">{buyer.registrationNumber}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {/* 编辑按钮 */}
                    <button
                      onClick={() => {
                        setSelectedBuyer(buyer);  // 选中要编辑的买家
                        setShowForm(true);  // 显示编辑表单
                      }}
                      className="text-blue-500"
                    >
                      编辑
                    </button>
                    {/* 删除按钮 */}
                    <button
                      onClick={() => handleDeleteBuyer(buyer.id)}
                      className="text-red-500 ml-2"
                    >
                      删除
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 显示新建或编辑买家表单 */}
      {showForm && (
        <BuyerForm
          selectedBuyer={selectedBuyer}  // 如果是编辑，则传递当前买家的信息
          onClose={() => setShowForm(false)}  // 关闭表单
          onSuccess={fetchBuyers}  // 成功后重新获取买家列表
          onSubmit={selectedBuyer ? handleEditBuyer : handleAddBuyer} // 根据是否编辑来选择方法
        />
      )}
    </div>
  );
};

export default BuyerPage;
