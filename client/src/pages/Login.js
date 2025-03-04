import React, { useState } from "react";
import { login } from "../api/userApi";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(username, password);
      localStorage.setItem("token", data.token); // 存储 JWT 令牌
      localStorage.setItem("role", data.role);   // 存储用户角色
      navigate("/dashboard");                   // 跳转到 dashboard
    } catch (err) {
      setError("登录失败，请检查用户名或密码");
    }
  };

  return (
    <div className="login-container">
      <h2>登录</h2>
      {error && <p className="error">{error}</p>}
      <form onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="用户名"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="密码"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default Login;
