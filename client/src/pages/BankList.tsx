import { useState, useEffect } from "react";
import api from "../api/apiConfig"; // 引入配置好的 axios 实例

const BankAndWallet = () => {
  const [banks, setBanks] = useState<any[]>([]);
  const [wallets, setWallets] = useState<any[]>([]);
  const [newWallet, setNewWallet] = useState({
    name: "",
    desc: "",
    in_cashflow: true,
    reconcilable: true,
    type: "bank", // 可选值：cash, bank, others
    coa: 0,
    bank_id: 0,
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");
      try {
        const bankResponse = await api.get("/biztory/bank-list");
        setBanks(bankResponse.data);

        const walletResponse = await api.get("/biztory/wallet-list");
        setWallets(walletResponse.data);
      } catch (error: any) {
        setError("无法获取数据，请稍后再试");
        console.error("获取数据失败", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCreateWallet = async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.post("/biztory/create-wallet", newWallet);
      alert("新钱包创建成功！");
      setWallets([...wallets, response.data.data]); // 将新钱包添加到钱包列表中
    } catch (error: any) {
      setError("无法创建钱包，请稍后再试");
      console.error("创建钱包失败", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-xl font-semibold mb-5">银行与钱包列表</h2>

      {loading && <p>加载中...</p>}

      {error && <p className="text-red-500">{error}</p>}

      <div>
        <h3>银行列表</h3>
        <ul>
          {banks.map((bank: any) => (
            <li key={bank.id}>
              {bank.name} (ID: {bank.id})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>钱包列表</h3>
        <ul>
          {wallets.map((wallet: any) => (
            <li key={wallet.id}>
              {wallet.name} (ID: {wallet.id})
            </li>
          ))}
        </ul>
      </div>

      <div>
        <h3>新增钱包</h3>
        <input
          type="text"
          placeholder="钱包名称"
          value={newWallet.name}
          onChange={(e) => setNewWallet({ ...newWallet, name: e.target.value })}
        />
        <button onClick={handleCreateWallet} disabled={loading}>
          创建钱包
        </button>
      </div>
    </div>
  );
};

export default BankAndWallet;
