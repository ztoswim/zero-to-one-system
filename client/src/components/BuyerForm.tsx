import React, { useState, useEffect } from 'react';

interface BuyerFormProps {
  selectedBuyer: any | null;
  onClose: () => void;
  onSuccess: () => Promise<void>;
  onSubmit: (buyerId: string, buyerData: any) => Promise<void>;
}

const BuyerForm = ({ selectedBuyer, onClose, onSuccess, onSubmit }: BuyerFormProps) => {
  // 初始化表单数据
  const [formData, setFormData] = useState<any>({
    name: '',
    tin: '',
    registrationNumber: '',
    registrationScheme: '',
    sst: '',
    email: '',
    contact: '',
    address: {
      addressLine0: '',
      addressLine1: '',
      addressLine2: '',
      postalZone: '',
      cityName: '',
      state: '',
      country: ''
    }
  });

  // 初始化表单数据（编辑模式时）
  useEffect(() => {
    if (selectedBuyer) {
      setFormData({ ...selectedBuyer }); // 编辑时填充数据
    }
  }, [selectedBuyer]);

  // 表单输入变化时更新 state
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev: typeof formData) => ({
      ...prev, // 保持之前的值不变
      [name]: value // 更新当前字段的值
    }));
  };

  // 提交表单
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSubmit(selectedBuyer?.id, formData); // 调用父组件传递的 onSubmit 函数
      await onSuccess(); // 调用成功后的回调
      onClose(); // 关闭表单
    } catch (error) {
      console.error('提交失败', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div>
          <label>姓名</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>TIN</label>
          <input
            type="text"
            name="tin"
            value={formData.tin}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>注册号</label>
          <input
            type="text"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>注册方案</label>
          <input
            type="text"
            name="registrationScheme"
            value={formData.registrationScheme}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>SST</label>
          <input
            type="text"
            name="sst"
            value={formData.sst}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>电子邮件</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>联系方式</label>
          <input
            type="text"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
          />
        </div>
        <h3>地址</h3>
        <div>
          <label>地址行 1</label>
          <input
            type="text"
            name="addressLine0"
            value={formData.address.addressLine0}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>地址行 2</label>
          <input
            type="text"
            name="addressLine1"
            value={formData.address.addressLine1 || ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>城市</label>
          <input
            type="text"
            name="cityName"
            value={formData.address.cityName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>州/省</label>
          <input
            type="text"
            name="state"
            value={formData.address.state}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>国家</label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleChange}
          />
        </div>
        <button type="submit">提交</button>
        <button type="button" onClick={onClose}>关闭</button>
      </form>
    </div>
  );
};

export default BuyerForm;
