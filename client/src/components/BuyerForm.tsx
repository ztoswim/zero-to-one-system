import { useState, useEffect } from 'react';

interface BuyerFormProps {
  selectedBuyer: any;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (buyerId: string, buyerData: any) => Promise<void>;
}

const BuyerForm = ({ selectedBuyer, onClose, onSuccess, onSubmit }: BuyerFormProps) => {
  const [buyerData, setBuyerData] = useState<any>(selectedBuyer || {});

  useEffect(() => {
    if (selectedBuyer) {
      setBuyerData(selectedBuyer);  // 如果是编辑，加载现有买家数据
    } else {
      setBuyerData({});  // 新建买家时，表单为空
    }
  }, [selectedBuyer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerData({ ...buyerData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(buyerData.id || '', buyerData);  // 提交数据
    onSuccess();  // 提交成功后调用 onSuccess 更新列表
    onClose();  // 关闭表单
  };

  return (
    <div className="modal">
      <form onSubmit={handleFormSubmit}>
        <label>姓名</label>
        <input
          type="text"
          name="name"
          value={buyerData.name || ''}
          onChange={handleInputChange}
        />

        <label>TIN</label>
        <input
          type="text"
          name="tin"
          value={buyerData.tin || ''}
          onChange={handleInputChange}
        />

        <label>注册号</label>
        <input
          type="text"
          name="registrationNumber"
          value={buyerData.registrationNumber || ''}
          onChange={handleInputChange}
        />

        <button type="submit">提交</button>
        <button type="button" onClick={onClose}>取消</button>
      </form>
    </div>
  );
};

export default BuyerForm;
