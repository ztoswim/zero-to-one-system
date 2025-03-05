import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth } from "../auth";
import { FaUser, FaLock } from "react-icons/fa"; // ✅ 引入图标
import logo from "../assets/Logo.png"; // ✅ Logo 位置
import "../styles/Login.css"; // ✅ 引入样式

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const { token } = await login(username, password); // 只返回 token
    saveUserAuth(token); // 只保存 token，无需角色

    console.log("登录成功");
    setTimeout(() => {
      navigate(/＄{role}); 
    }, 500);
  } catch (err) {
    setError(err.message || "登录失败");
  }
};

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        {error && <p className="error-message">{error}</p>}
        <form className="login-form" onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="用户名"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
