import React, { useState, useEffect } from 'react';

interface BuyerFormProps {
  selectedBuyer: any;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (buyerId: string, buyerData: any) => Promise<void>;
}

const BuyerForm = ({ selectedBuyer, onClose, onSuccess, onSubmit }: BuyerFormProps) => {
  const [buyerData, setBuyerData] = useState<any>(selectedBuyer || {
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
    if (selectedBuyer) {
      setBuyerData(selectedBuyer);
    }
  }, [selectedBuyer]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerData({ ...buyerData, [name]: value });
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerData({
      ...buyerData,
      address: {
        ...buyerData.address,
        [name]: value
      }
    });
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(buyerData.id || '', buyerData);  // 新建时没有 id，编辑时有
    onSuccess();
    onClose();
  };

  return (
    <div className="modal">
      <form onSubmit={handleFormSubmit} className="space-y-4 flex flex-col md:flex-row">
        {/* 买家信息部分 */}
        <div className="flex-1 md:mr-4">
          <h2 className="text-xl font-semibold">{selectedBuyer ? '编辑买家' : '新建买家'}</h2>

          <div className="my-2">
            <label>姓名</label>
            <input
              type="text"
              name="name"
              value={buyerData.name}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>TIN</label>
            <input
              type="text"
              name="tin"
              value={buyerData.tin}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>注册号</label>
            <input
              type="text"
              name="registrationNumber"
              value={buyerData.registrationNumber}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>注册方案</label>
            <input
              type="text"
              name="registrationScheme"
              value={buyerData.registrationScheme}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>SST</label>
            <input
              type="text"
              name="sst"
              value={buyerData.sst}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>邮箱</label>
            <input
              type="email"
              name="email"
              value={buyerData.email}
              onChange={handleInputChange}
              className="input"
            />
          </div>

          <div className="my-2">
            <label>联系方式</label>
            <input
              type="text"
              name="contact"
              value={buyerData.contact}
              onChange={handleInputChange}
              className="input"
              required
            />
          </div>
        </div>

        {/* 地址信息部分 */}
        <div className="flex-1 md:ml-4">
          <h3 className="font-semibold">地址信息</h3>

          <div className="my-2">
            <label>地址行 0</label>
            <input
              type="text"
              name="addressLine0"
              value={buyerData.address.addressLine0}
              onChange={handleAddressChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>地址行 1</label>
            <input
              type="text"
              name="addressLine1"
              value={buyerData.address.addressLine1}
              onChange={handleAddressChange}
              className="input"
            />
          </div>

          <div className="my-2">
            <label>地址行 2</label>
            <input
              type="text"
              name="addressLine2"
              value={buyerData.address.addressLine2}
              onChange={handleAddressChange}
              className="input"
            />
          </div>

          <div className="my-2">
            <label>邮政区号</label>
            <input
              type="text"
              name="postalZone"
              value={buyerData.address.postalZone}
              onChange={handleAddressChange}
              className="input"
            />
          </div>

          <div className="my-2">
            <label>城市</label>
            <input
              type="text"
              name="cityName"
              value={buyerData.address.cityName}
              onChange={handleAddressChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>州/省</label>
            <input
              type="text"
              name="state"
              value={buyerData.address.state}
              onChange={handleAddressChange}
              className="input"
              required
            />
          </div>

          <div className="my-2">
            <label>国家</label>
            <input
              type="text"
              name="country"
              value={buyerData.address.country}
              onChange={handleAddressChange}
              className="input"
              required
            />
          </div>
        </div>

        {/* 提交和取消按钮 */}
        <div className="mt-4 flex justify-between">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            提交
          </button>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded ml-2"
          >
            取消
          </button>
        </div>
      </form>
    </div>
  );
};

export default BuyerForm;
