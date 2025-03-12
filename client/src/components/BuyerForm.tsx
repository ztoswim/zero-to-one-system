import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { createBuyer, updateBuyer } from '../api/buyerAPI';  // 引入 API

interface BuyerFormProps {
  selectedBuyer: any | null;
  onClose: () => void;
  onSuccess: () => void;
}

const BuyerForm = ({ selectedBuyer, onClose, onSuccess }: BuyerFormProps) => {
  const [buyerData, setBuyerData] = useState({
    name: '',
    tin: '',
    registrationNumber: '',
    registrationScheme: '',
    sst: '',
    email: '',
    contact: '',
    address: ''
  });

  // 如果是编辑买家，则设置表单数据
  useEffect(() => {
    if (selectedBuyer) {
      setBuyerData(selectedBuyer);
    }
  }, [selectedBuyer]);

  // 表单提交
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (selectedBuyer) {
        // 编辑已有买家
        await updateBuyer(selectedBuyer.id, buyerData);
        toast.success('买家信息更新成功');
      } else {
        // 新建买家
        await createBuyer(buyerData);
        toast.success('新建买家成功');
      }

      onSuccess();  // 成功后刷新买家列表
      onClose();  // 关闭表单
    } catch (error) {
      console.error('提交失败', error);
      toast.error('提交失败，请重试');
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-semibold mb-4">{selectedBuyer ? '编辑买家' : '新建买家'}</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">姓名</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={buyerData.name}
              onChange={(e) => setBuyerData({ ...buyerData, name: e.target.value })}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">TIN</label>
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded"
              value={buyerData.tin}
              onChange={(e) => setBuyerData({ ...buyerData, tin: e.target.value })}
            />
          </div>

          {/* 其他表单字段... */}

          <div className="flex justify-between">
            <button type="button" className="px-4 py-2 bg-gray-500 text-white rounded" onClick={onClose}>取消</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">保存</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BuyerForm;
