import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth } from "../auth";
import "../styles/Login.css"; // ✅ 引入 CSS
import logo from "../assets/Logo.png"; // ✅ 引入 Logo

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { token, role } = await login(username, password);
      saveUserAuth(token, role);

      console.log("登录成功，角色:", role);
      setTimeout(() => {
        navigate(`/${role}`);
      }, 500);
    } catch (err) {
      setError(err.message || "登录失败");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        <h2>登录</h2>
        {error && <p className="login-error">{error}</p>}
        <form onSubmit={handleLogin}>
          <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
          <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
