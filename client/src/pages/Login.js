import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth } from "../auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login(username, password);
      saveUserAuth(res.token, res.role);
      navigate(`/${res.role}`); // 登录后跳转到对应 Dashboard
    } catch (error) {
      console.error("登录失败", error);
    }
  };  

  return (
    <div>
      <h2>登录</h2>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <form onSubmit={handleLogin}>
        <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
        <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
        <button type="submit">登录</button>
      </form>
    </div>
  );
};

export default Login;
