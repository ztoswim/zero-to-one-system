import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth, logout } from "../auth"; // 合并导入
import { FaUser, FaLock } from "react-icons/fa"; 
import logo from "../assets/Logo.png"; 
import "../styles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    logout(); // 清理旧的 Token 和 Role

    try {
      const { token, role } = await login(username, password);
      saveUserAuth(token, role); // 保存新的 Token 和 Role
      console.log("登录成功，角色:", role);

      setTimeout(() => navigate(`/${role}`), 500); // 根据角色跳转
    } catch (err) {
      setError(err.message || "登录失败"); // 显示错误信息
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <img src={logo} alt="Logo" className="login-logo" />
        {error && <p className="error-message">{error}</p>} {/* 显示错误信息 */}
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
