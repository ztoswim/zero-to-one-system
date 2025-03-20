import { useState, useEffect } from "react";
import api from "../api/apiConfig"; // 引入配置好的 axios 实例

const SaleInvoices = () => {
  const [invoices, setInvoices] = useState<any[]>([]); // 存储发票列表
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [error, setError] = useState<string>(""); // 错误状态
  const [page, setPage] = useState<number>(1); // 当前页
  const [filter, setFilter] = useState<string>(""); // 筛选条件
  const [searchQuery, setSearchQuery] = useState<string>(""); // 搜索条件

  // 格式化日期：将日期从 "yyyy-mm-dd" 转换为 "dd/mm/yy"
  const formatDate = (date: string) => {
    const formattedDate = new Date(date);
    return formattedDate.toLocaleDateString("en-GB"); // 返回 "dd/mm/yyyy" 格式
  };

  useEffect(() => {
    const fetchInvoices = async () => {
      setLoading(true);
      setError(""); // 清除之前的错误

      try {
        const response = await api.get("/biztory/sale-invoices", {
          params: {
            _q: searchQuery, // 搜索条件
            filter: filter, // 筛选条件
            page: page, // 当前页
          },
        });
        setInvoices(response.data.data); // 更新发票列表
      } catch (error: any) {
        setError("无法获取销售发票列表");
        console.error("获取销售发票失败", error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvoices(); // 获取发票列表
  }, [searchQuery, filter, page]); // 依赖项：搜索条件、筛选条件、分页

  const handlePageChange = (newPage: number) => {
    setPage(newPage); // 更新页码
  };

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-5">销售发票列表</h2>

      {/* 搜索框 */}
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="搜索发票..."
        className="mb-4 p-2 border rounded"
      />

      {/* 筛选框 */}
      <select
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        className="mb-4 p-2 border rounded"
      >
        <option value="">所有状态</option>
        <option value="unpaid">未支付</option>
        <option value="undelivered">未交付</option>
        <option value="archived">已归档</option>
      </select>

      {loading && <p>加载中...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <table className="w-full border-collapse mt-4">
        <thead>
          <tr>
            <th className="border px-4 py-2">ID</th>
            <th className="border px-4 py-2">Invoice No.</th>
            <th className="border px-4 py-2">Invoice Date</th>
            <th className="border px-4 py-2">Name</th>
            <th className="border px-4 py-2">Payment Term</th>
            <th className="border px-4 py-2">Total</th>
            <th className="border px-4 py-2">Paid</th>
            <th className="border px-4 py-2">Due (Overdue)</th>
          </tr>
        </thead>
        <tbody>
          {invoices.length > 0 ? (
            invoices.map((invoice: any) => (
              <tr key={invoice.id}>
                <td className="border px-4 py-2">{invoice.id}</td>
                <td className="border px-4 py-2">{invoice.ref_num}</td>
                <td className="border px-4 py-2">{formatDate(invoice.invoice_date)}</td> {/* 格式化发票日期 */}
                <td className="border px-4 py-2">{invoice.payee}</td>
                <td className="border px-4 py-2">{invoice.payment_term}</td>
                <td className="border px-4 py-2">{invoice.total}</td>
                <td className="border px-4 py-2">{invoice.paid}</td>
                <td className="border px-4 py-2">{invoice.due}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="border px-4 py-2 text-center">
                没有数据
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* 分页 */}
      <div className="mt-4 flex justify-between">
        <button onClick={() => handlePageChange(page - 1)} disabled={page <= 1}>
          上一页
        </button>
        <span>第 {page} 页</span>
        <button onClick={() => handlePageChange(page + 1)}>下一页</button>
      </div>
    </div>
  );
};

export default SaleInvoices;
