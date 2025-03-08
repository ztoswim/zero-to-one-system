import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/userApi";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, role } = await login({ username, password });
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      navigate(`/${role}-dashboard`);
    } catch (error) {
      console.error("登录失败", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-2xl font-bold mb-4">登录</h1>
      <form onSubmit={handleLogin} className="flex flex-col gap-4">
        <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} className="border p-2 rounded" />
        <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} className="border p-2 rounded" />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">登录</button>
      </form>
    </div>
  );
};

export default Login;
