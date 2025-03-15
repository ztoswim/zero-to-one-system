import { useState, useEffect } from "react";
import biztoryApi from "../api/biztoryApiConfig"; // 引入 Biztory API 配置

const BanksList = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchBanks = async () => {
      setLoading(true);
      try {
        // 调用 Biztory API 获取银行列表
        const response = await biztoryApi.get("/account/bank/all");
        setBanks(response.data); // 更新银行列表
      } catch (error) {
        console.error("无法获取银行列表", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBanks(); // 调用函数获取银行列表
  }, []);

  if (loading) return <p>加载银行列表...</p>;

  return (
    <div>
      <h2>所有银行</h2>
      <ul>
        {banks.map((bank) => (
          <li key={bank.id}>
            {bank.name} (ID: {bank.id})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BanksList;
