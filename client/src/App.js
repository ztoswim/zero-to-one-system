import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { FaUser, FaLock } from "react-icons/fa";
import logo from "../assets/Logo.png";
import "../styles/Login.css";

const Login = ({ setUserRole }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const role = await login(username, password);

      setUserRole(role); // **立刻更新 App.js 的 userRole**
      navigate(`/${role}`);
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
            <input type="text" placeholder="用户名" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </div>
          <div className="input-group">
            <FaLock className="input-icon" />
            <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </div>
          <button type="submit">登录</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
