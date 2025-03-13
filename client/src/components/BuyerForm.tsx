import React, { useState, useEffect } from 'react';

interface Address {
  addressLine0: string;
  addressLine1?: string;
  addressLine2?: string;
  postalZone?: string;
  cityName: string;
  state: string;
  country: string;
}

interface BuyerFormProps {
  buyer: { _id: string; name: string; tin: string; registrationNumber: string; registrationScheme: string; sst: string; email?: string; contact: string; address: Address } | null;
  onSubmit: (buyer: any) => void;
  onClose: () => void;
  onDelete?: (buyerId: string) => void; // 可选的删除函数
}

const BuyerForm: React.FC<BuyerFormProps> = ({ buyer, onSubmit, onClose, onDelete }) => {
  const [formData, setFormData] = useState({
    _id: '',
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

  useEffect(() => {
    if (buyer) {
      setFormData({
        _id: buyer._id,
        name: buyer.name,
        tin: buyer.tin,
        registrationNumber: buyer.registrationNumber,
        registrationScheme: buyer.registrationScheme,
        sst: buyer.sst,
        email: buyer.email || '',
        contact: buyer.contact,
        address: {
          addressLine0: buyer.address.addressLine0,
          addressLine1: buyer.address.addressLine1 || '',
          addressLine2: buyer.address.addressLine2 || '',
          postalZone: buyer.address.postalZone || '',
          cityName: buyer.address.cityName,
          state: buyer.address.state,
          country: buyer.address.country
        }
      });
    }
  }, [buyer]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    setFormData((prev) => ({
      ...prev,
      address: {
        ...prev.address,
        [field]: e.target.value
      }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData); // 提交表单
  };

  const handleDelete = () => {
    if (onDelete && buyer) {
      onDelete(buyer._id); // 调用删除函数
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '20px' }}>
      {/* 左侧个人信息 */}
      <div style={{ flex: 1 }}>
        <h3>个人信息</h3>
        <label>姓名:
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>TIN:
          <input type="text" name="tin" value={formData.tin} onChange={handleChange} required />
        </label>
        <label>注册号:
          <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
        </label>
        <label>注册方案:
          <input type="text" name="registrationScheme" value={formData.registrationScheme} onChange={handleChange} required />
        </label>
        <label>SST:
          <input type="text" name="sst" value={formData.sst} onChange={handleChange} required />
        </label>
        <label>邮箱:
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
        </label>
        <label>联系方式:
          <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
        </label>
      </div>

      {/* 右侧地址信息 */}
      <div style={{ flex: 1 }}>
        <h3>地址信息</h3>
        <label>地址行0:
          <input type="text" value={formData.address.addressLine0} onChange={(e) => handleAddressChange(e, 'addressLine0')} required />
        </label>
        <label>地址行1:
          <input type="text" value={formData.address.addressLine1} onChange={(e) => handleAddressChange(e, 'addressLine1')} />
        </label>
        <label>地址行2:
          <input type="text" value={formData.address.addressLine2} onChange={(e) => handleAddressChange(e, 'addressLine2')} />
        </label>
        <label>邮政区号:
          <input type="text" value={formData.address.postalZone} onChange={(e) => handleAddressChange(e, 'postalZone')} />
        </label>
        <label>城市:
          <input type="text" value={formData.address.cityName} onChange={(e) => handleAddressChange(e, 'cityName')} required />
        </label>
        <label>州/省:
          <input type="text" value={formData.address.state} onChange={(e) => handleAddressChange(e, 'state')} required />
        </label>
        <label>国家:
          <input type="text" value={formData.address.country} onChange={(e) => handleAddressChange(e, 'country')} required />
        </label>
      </div>

      <div style={{ marginTop: '20px', display: 'flex', gap: '10px' }}>
        <button type="submit">{buyer ? '更新买家' : '创建买家'}</button>
        {buyer && onDelete && (
          <button type="button" onClick={handleDelete} style={{ backgroundColor: 'red', color: 'white' }}>
            删除
          </button>
        )}
        <button type="button" onClick={onClose}>关闭</button>
      </div>
    </form>
  );
};

export default BuyerForm;
