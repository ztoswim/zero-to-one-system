import { useState, useEffect } from "react";
import api from "../api/apiConfig"; // 引入配置好的 api

const BankList = () => {
  const [banks, setBanks] = useState<any[]>([]); // 存储银行列表
  const [loading, setLoading] = useState<boolean>(false); // 加载状态

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        const response = await api.get("/biztory/bank-list"); // 请求后端获取银行列表
        setBanks(response.data); // 更新银行列表
      } catch (error) {
        console.error("无法获取银行列表", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks(); // 获取银行列表
  }, []);

  if (loading) return <p>加载银行列表...</p>;

  return (
    <div>
      <h2>银行列表</h2>
      <ul>
        {banks.map((bank: any) => (
          <li key={bank.id}>{bank.name} (ID: {bank.id})</li> // 渲染银行信息
        ))}
      </ul>
    </div>
  );
};

export default BankList;
