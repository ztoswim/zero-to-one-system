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
  buyer: { name: string; tin: string; registrationNumber: string; registrationScheme: string; sst: string; email?: string; contact: string; address: Address } | null;
  onSubmit: (buyer: any) => void;
  onClose: () => void;
}

const BuyerForm: React.FC<BuyerFormProps> = ({ buyer, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
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
      // 如果是编辑模式，填充表单
      setFormData({
        name: buyer.name,
        tin: buyer.tin,
        registrationNumber: buyer.registrationNumber,
        registrationScheme: buyer.registrationScheme,
        sst: buyer.sst,
        email: buyer.email || '', // 确保 email 是字符串类型，即使 buyer.email 为空
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
    onSubmit(formData); // 调用传入的 onSubmit 方法，提交表单
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{buyer ? '编辑买家' : '添加买家'}</h2>
      <label>
        姓名:
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </label>
      <label>
        TIN:
        <input type="text" name="tin" value={formData.tin} onChange={handleChange} required />
      </label>
      <label>
        注册号:
        <input type="text" name="registrationNumber" value={formData.registrationNumber} onChange={handleChange} required />
      </label>
      <label>
        注册方案:
        <input type="text" name="registrationScheme" value={formData.registrationScheme} onChange={handleChange} required />
      </label>
      <label>
        SST:
        <input type="text" name="sst" value={formData.sst} onChange={handleChange} required />
      </label>
      <label>
        邮箱:
        <input type="email" name="email" value={formData.email} onChange={handleChange} />
      </label>
      <label>
        联系方式:
        <input type="text" name="contact" value={formData.contact} onChange={handleChange} required />
      </label>
      <h3>地址</h3>
      <label>
        地址行0:
        <input type="text" value={formData.address.addressLine0} onChange={(e) => handleAddressChange(e, 'addressLine0')} required />
      </label>
      <label>
        地址行1:
        <input type="text" value={formData.address.addressLine1} onChange={(e) => handleAddressChange(e, 'addressLine1')} />
      </label>
      <label>
        地址行2:
        <input type="text" value={formData.address.addressLine2} onChange={(e) => handleAddressChange(e, 'addressLine2')} />
      </label>
      <label>
        邮政区号:
        <input type="text" value={formData.address.postalZone} onChange={(e) => handleAddressChange(e, 'postalZone')} />
      </label>
      <label>
        城市:
        <input type="text" value={formData.address.cityName} onChange={(e) => handleAddressChange(e, 'cityName')} required />
      </label>
      <label>
        州/省:
        <input type="text" value={formData.address.state} onChange={(e) => handleAddressChange(e, 'state')} required />
      </label>
      <label>
        国家:
        <input type="text" value={formData.address.country} onChange={(e) => handleAddressChange(e, 'country')} required />
      </label>
      <button type="submit">{buyer ? '更新买家' : '创建买家'}</button>
      <button type="button" onClick={onClose}>关闭</button>
    </form>
  );
};

export default BuyerForm;
