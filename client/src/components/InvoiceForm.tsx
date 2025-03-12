// src/components/InvoiceForm.tsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 付款方式的映射
const paymentMethods = [
  { code: '01', description: 'Cash' },
  { code: '02', description: 'Cheque' },
  { code: '03', description: 'Bank Transfer' },
  { code: '04', description: 'Credit Card' },
  { code: '05', description: 'Debit Card' },
  { code: '06', description: 'e-Wallet / Digital Wallet' },
  { code: '07', description: 'Digital Bank' },
  { code: '08', description: 'Others' }
];

interface InvoiceLineItem {
  id: number;
  description: string;
  quantity: number;
  unitPrice: number;
}

interface Invoice {
  id: string; // 发票号
  issueDate: string; // 开票日期（自动）
  issueTime: string; // 开票时间（自动）
  paymentMode: string; // 付款方式（前端选择）
  totalExcludingTax: number; // 税前总额
  totalIncludingTax: number; // 税后总额
  totalPayableAmount: number; // 应付总额
  totalTaxAmount: number; // 总税额
  invoiceLines: InvoiceLineItem[]; // 发票明细
  buyer: string; // 买家信息
}

const InvoiceForm = () => {
  // 表单数据
  const [invoice, setInvoice] = useState<Invoice>({
    id: '',
    issueDate: '',
    issueTime: '',
    paymentMode: '',
    buyer: '',
    totalExcludingTax: 0,
    totalIncludingTax: 0,
    totalTaxAmount: 0,
    totalPayableAmount: 0,
    invoiceLines: []
  });

  const [buyers, setBuyers] = useState<string[]>([]);  // 存储买家列表

  // 获取买家列表
  const fetchBuyers = async () => {
    try {
      const response = await axios.get('/api/buyers'); // 假设后端有此API接口
      setBuyers(response.data.map((buyer: { name: string }) => buyer.name)); // 假设返回数据是买家的 name
    } catch (error) {
      console.error('获取买家列表失败', error);
    }
  };

  // 生成发票号：INVYYYYMMDD-001
  const generateInvoiceId = () => {
    const date = new Date();
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `INV${year}${month}${day}-001`;  // 按规则生成发票号
  };

  useEffect(() => {
    // 获取买家列表
    fetchBuyers();

    // 初始化发票号和日期
    const newInvoice = { 
      ...invoice, 
      id: generateInvoiceId(),
      issueDate: new Date().toISOString().split('T')[0],
      issueTime: getMalaysiaTime() // 获取马来西亚时间
    };
    setInvoice(newInvoice);

    // 设置定时器，更新 issueTime 实时显示当前时间
    const timeInterval = setInterval(() => {
      const currentTime = getMalaysiaTime();
      setInvoice(prevInvoice => ({
        ...prevInvoice,
        issueTime: currentTime
      }));
    }, 1000); // 每秒更新一次时间

    // 清理定时器
    return () => clearInterval(timeInterval);
  }, []);

  // 获取马来西亚时间并转为UTC格式（HH:mm:ssZ）
  const getMalaysiaTime = () => {
    const malaysiaTime = new Date();
    malaysiaTime.setHours(malaysiaTime.getHours() + 8); // 将本地时间转换为马来西亚时间（UTC+8）

    const hours = malaysiaTime.getHours().toString().padStart(2, '0');
    const minutes = malaysiaTime.getMinutes().toString().padStart(2, '0');
    const seconds = malaysiaTime.getSeconds().toString().padStart(2, '0');
    
    return `${hours}:${minutes}:${seconds}`;  // 直接返回 HH:mm:ss 格式
  };

  // 计算总金额
  const calculateTotal = () => {
    let totalExcludingTax = 0;
    let totalTaxAmount = 0;

    invoice.invoiceLines.forEach(item => {
      totalExcludingTax += item.quantity * item.unitPrice;
      totalTaxAmount += (item.quantity * item.unitPrice) * 0.18;  // 假设税率为18%
    });

    const totalIncludingTax = totalExcludingTax + totalTaxAmount;

    setInvoice({
      ...invoice,
      totalExcludingTax,
      totalTaxAmount,
      totalIncludingTax
    });
  };

  // 选择买家
  const handleBuyerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const buyer = e.target.value;
    setInvoice({
      ...invoice,
      buyer
    });
  };

  // 选择付款方式
  const handlePaymentModeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setInvoice({
      ...invoice,
      paymentMode: e.target.value
    });
  };

  // 添加发票行项目
  const addInvoiceLineItem = () => {
    const newLine: InvoiceLineItem = {
      id: invoice.invoiceLines.length + 1,
      description: '',
      quantity: 1,
      unitPrice: 0
    };

    setInvoice({
      ...invoice,
      invoiceLines: [...invoice.invoiceLines, newLine]
    });
  };

  // 修改发票行项目
  const handleInvoiceLineChange = (id: number, field: keyof InvoiceLineItem, value: any) => {
    const updatedInvoiceLines = invoice.invoiceLines.map(item => {
      if (item.id === id) {
        return { ...item, [field]: value };
      }
      return item;
    });

    setInvoice({
      ...invoice,
      invoiceLines: updatedInvoiceLines
    });

    calculateTotal();
  };

  // 提交发票
  const submitInvoice = async () => {
    try {
      // 假设发票数据生成正确，发送到后端
      const response = await axios.post('/api/submit-invoice', invoice);
      console.log('发票提交成功', response.data);
    } catch (error) {
      console.error('提交失败', error);
    }
  };

  return (
    <div>
      <h1>发票表单</h1>

      {/* 发票信息 */}
      <div>
        <label>发票号:</label>
        <input type="text" value={invoice.id} disabled />
      </div>

      <div>
        <label>开票日期:</label>
        <input type="date" value={invoice.issueDate} disabled />
      </div>

      <div>
        <label>开票时间:</label>
        <input type="text" value={invoice.issueTime} disabled />
      </div>

      {/* 买家选择 */}
      <div>
        <label>买家:</label>
        <select value={invoice.buyer} onChange={handleBuyerChange}>
          {buyers.map((buyer, index) => (
            <option key={index} value={buyer}>
              {buyer}
            </option>
          ))}
        </select>
      </div>

      {/* 付款方式选择 */}
      <div>
        <label>付款方式:</label>
        <select value={invoice.paymentMode} onChange={handlePaymentModeChange}>
          {paymentMethods.map((method) => (
            <option key={method.code} value={method.code}>
              {method.description}
            </option>
          ))}
        </select>
      </div>

      {/* 发票行项目 */}
      <div>
        <h3>发票行项目</h3>
        {invoice.invoiceLines.map((item) => (
          <div key={item.id}>
            <input
              type="text"
              placeholder="商品描述"
              value={item.description}
              onChange={(e) => handleInvoiceLineChange(item.id, 'description', e.target.value)}
            />
            <input
              type="number"
              placeholder="数量"
              value={item.quantity}
              onChange={(e) => handleInvoiceLineChange(item.id, 'quantity', e.target.value)}
            />
            <input
              type="number"
              placeholder="单价"
              value={item.unitPrice}
              onChange={(e) => handleInvoiceLineChange(item.id, 'unitPrice', e.target.value)}
            />
          </div>
        ))}
        <button onClick={addInvoiceLineItem}>添加行项目</button>
      </div>

      {/* 总金额 */}
      <div>
        <label>税前总额:</label>
        <input type="text" value={invoice.totalExcludingTax} disabled />
      </div>
      <div>
        <label>税额:</label>
        <input type="text" value={invoice.totalTaxAmount} disabled />
      </div>
      <div>
        <label>税后总额:</label>
        <input type="text" value={invoice.totalIncludingTax} disabled />
      </div>
      <div>
        <label>应付总额:</label>
        <input type="text" value={invoice.totalPayableAmount} disabled />
      </div>

      {/* 提交按钮 */}
      <button onClick={submitInvoice}>提交发票</button>
    </div>
  );
};

export default InvoiceForm;
