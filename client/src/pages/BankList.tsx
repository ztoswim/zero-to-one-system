import { useState, useEffect } from "react";
import api from "../api/apiConfig"; // 引入配置好的 axios 实例

const BankList = () => {
  const [banks, setBanks] = useState<any[]>([]); // 存储银行列表
  const [loading, setLoading] = useState<boolean>(false); // 加载状态
  const [error, setError] = useState<string>(""); // 错误状态

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      setError(""); // 清除之前的错误

      try {
        const response = await api.get("/biztory/bank-list"); // 请求后端获取银行列表
        console.log("Banks from API:", response.data); // 查看获取的数据
        setBanks(response.data); // 更新银行列表
      } catch (error: any) {
        setError("无法获取银行列表，请稍后再试");
        console.error("获取银行列表失败", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks(); // 获取银行列表
  }, []);

  return (
    <div className="container mx-auto mt-5">
      <h2 className="text-xl font-semibold mb-5">银行列表</h2>
      {loading ? (
        <p>加载中...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ul>
          {banks.length > 0 ? (
            banks.map((bank: any) => (
              <li key={bank.id} className="py-2 px-4 border-b">
                {bank.name} (ID: {bank.id})
              </li>
            ))
          ) : (
            <p>没有银行数据。</p> // 如果没有银行数据
          )}
        </ul>
      )}
    </div>
  );
};

export default BankList;
