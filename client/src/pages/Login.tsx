import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { User, Lock } from "lucide-react"; // 替换 FaUser 和 FaLock
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import logo from "../assets/Logo.png";

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false); // 添加 loading 状态
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const role = await login(username, password);
      setUserRole(role);
      navigate(`/${role}`);
    } catch (err) {
      setError(err.message || "登录失败");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 text-center">
        <img src={logo} alt="Logo" className="w-3/4 max-w-xs mx-auto mb-4 transition-transform duration-300 hover:scale-110" />
        {error && <p className="text-red-500 mb-3">{error}</p>}

        <form className="flex flex-col items-center" onSubmit={handleLogin}>
          {/* 用户名输入框 */}
          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <User className="text-gray-500 mr-2" size={20} />
            <Input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full outline-none text-base border-none shadow-none focus:ring-0"
            />
          </div>

          {/* 密码输入框 */}
          <div className="flex items-center w-full max-w-xs bg-white border border-gray-300 rounded-md p-2 mb-3 focus-within:border-blue-500">
            <Lock className="text-gray-500 mr-2" size={20} />
            <Input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full outline-none text-base border-none shadow-none focus:ring-0"
            />
          </div>

          {/* 登录按钮 */}
          <Button type="submit" className="w-full max-w-xs py-3" disabled={loading}>
            {loading ? (
              <>
                <svg
                  className="animate-spin h-5 w-5 mr-2"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8v4l3.5-3.5L12 0v4a8 8 0 01-8 8z"
                  ></path>
                </svg>
                登录中...
              </>
            ) : (
              "登录"
            )}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Login;
