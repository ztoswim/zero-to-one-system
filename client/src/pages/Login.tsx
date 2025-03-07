import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi"; // API 请求
import { saveUserAuth } from "../auth"; // 存储 Token
import { User, Lock } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/Logo.png";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const { token, role } = await login(username, password);
      if (!token) throw new Error("服务器返回数据不完整");

      saveUserAuth(token);
      navigate(`/${role}`);

    } catch (err: any) {
      console.error("登录失败:", err);
      setError(err.response?.data?.message || "用户名或密码错误");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <img src={logo} alt="Logo" className="w-3/4 max-w-xs mx-auto mb-4 hover:scale-110 transition-transform" />
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <User className="text-gray-500 mr-2" size={20} />
            <Input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none border-none shadow-none focus:ring-0"
            />
          </div>

          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <Lock className="text-gray-500 mr-2" size={20} />
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none border-none shadow-none focus:ring-0"
            />
          </div>

          <Button type="submit" className="w-full max-w-xs py-3" disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
