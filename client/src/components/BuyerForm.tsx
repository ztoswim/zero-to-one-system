import { useState, useEffect } from 'react';

interface BuyerFormProps {
  selectedBuyer: any | null;
  onClose: () => void;
  onSuccess: () => void;
  onSubmit: (buyerId: string, buyerData: any) => Promise<void>;
}

const BuyerForm = ({ selectedBuyer, onClose, onSuccess, onSubmit }: BuyerFormProps) => {
  const [buyerData, setBuyerData] = useState<any>({
    name: '',
    tin: '',
    registrationNumber: 'NA',
    registrationScheme: 'NRIC',
    sst: 'NA',
    email: 'NA',
    contact: 'NA',
    address: {
      addressLine0: 'NA',
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
      setBuyerData(selectedBuyer);  // 如果是编辑，设置表单值
    }
  }, [selectedBuyer]);

  // 处理基本信息字段变化
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBuyerData({
      ...buyerData,
      [name]: value,
    });
  };

  // 处理地址字段变化
  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const field = name.split('.')[1]; // 获取地址字段的名称
    setBuyerData({
      ...buyerData,
      address: {
        ...buyerData.address,
        [field]: value,
      },
    });
  };

  // 提交表单
  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSubmit(buyerData.id || '', buyerData);  // 新建时没有 id，编辑时有
    onSuccess();  // 提交成功后调用 onSuccess 更新列表
    onClose();  // 关闭表单
  };

  const handleDelete = () => {
    // Handle delete logic here
    // For example, make a delete request to API and call onSuccess
    onSuccess();
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold mb-4">{selectedBuyer ? '编辑买家' : '新建买家'}</h2>
          <button onClick={onClose} className="text-red-500 text-xl">&times;</button>
        </div>

        <form onSubmit={handleFormSubmit} className="flex gap-8">
          {/* 左边：基本信息 */}
          <div className="flex-1 space-y-4">
            <div>
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

            <div>
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

            <div>
              <label>注册号</label>
              <input
                type="text"
                name="registrationNumber"
                value={buyerData.registrationNumber}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div>
              <label>注册方案</label>
              <input
                type="text"
                name="registrationScheme"
                value={buyerData.registrationScheme}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div>
              <label>SST</label>
              <input
                type="text"
                name="sst"
                value={buyerData.sst}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div>
              <label>邮箱</label>
              <input
                type="email"
                name="email"
                value={buyerData.email}
                onChange={handleInputChange}
                className="input"
              />
            </div>

            <div>
              <label>联系方式</label>
              <input
                type="text"
                name="contact"
                value={buyerData.contact}
                onChange={handleInputChange}
                className="input"
              />
            </div>
          </div>

          {/* 右边：地址信息 */}
          <div className="flex-1 space-y-4">
            <div>
              <label>地址行 0</label>
              <input
                type="text"
                name="address.addressLine0"
                value={buyerData.address.addressLine0}
                onChange={handleAddressChange}
                className="input"
              />
            </div>

            <div>
              <label>地址行 1</label>
              <input
                type="text"
                name="address.addressLine1"
                value={buyerData.address.addressLine1}
                onChange={handleAddressChange}
                className="input"
              />
            </div>

            <div>
              <label>地址行 2</label>
              <input
                type="text"
                name="address.addressLine2"
                value={buyerData.address.addressLine2}
                onChange={handleAddressChange}
                className="input"
              />
            </div>

            <div>
              <label>邮政区号</label>
              <input
                type="text"
                name="address.postalZone"
                value={buyerData.address.postalZone}
                onChange={handleAddressChange}
                className="input"
              />
            </div>

            <div>
              <label>城市</label>
              <input
                type="text"
                name="address.cityName"
                value={buyerData.address.cityName}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>

            <div>
              <label>州/省</label>
              <input
                type="text"
                name="address.state"
                value={buyerData.address.state}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>

            <div>
              <label>国家</label>
              <input
                type="text"
                name="address.country"
                value={buyerData.address.country}
                onChange={handleAddressChange}
                className="input"
                required
              />
            </div>
          </div>
        </form>

        <div className="flex justify-between mt-4">
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded" onClick={handleFormSubmit}>
            提交
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="px-4 py-2 bg-red-500 text-white rounded"
          >
            删除
          </button>
        </div>
      </div>
    </div>
  );
};

export default BuyerForm;
