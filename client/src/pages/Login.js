import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Register from "./Register"; // 导入注册组件
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // 控制注册弹窗
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await fetch("http://localhost:3001/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (response.ok && data.user) {
        localStorage.setItem("user", JSON.stringify(data.user));  // ✅ 存整个 user 对象
        localStorage.setItem("role", data.user.role);  // ✅ 确保 role 也存进去
        setUser(data.user);
        navigateToDashboard(data.user.role);
      } else {
        setError(data.message || "登录失败，请检查账号或密码！");
      }
    } catch (err) {
      setError("服务器错误，请稍后再试！");
      console.error("登录请求错误:", err);
    }
  };  

  const navigateToDashboard = (role) => {
    const routes = {
      boss: "/boss-dashboard",
      admin: "/admin-dashboard",
      coach: "/coach-dashboard",
      customer: "/customer-dashboard",
    };
    navigate(routes[role] || "/");
  };

  return (
    <div className="login-container">
      {/* 注册弹窗 */}
      <Register isOpen={showRegister} onClose={() => setShowRegister(false)} isLoginRegister={true} />

      <div className="login-box">
        <img src="/Logo.png" alt="LOGO" className="logo-img" />
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="账号"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div className="input-group">
            <FaLock className="icon" />
            <input
              type="password"
              placeholder="密码"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="login-button">登录</button>
        </form>
        <button className="register-button" onClick={() => setShowRegister(true)}>注册</button> {/* 注册按钮 */}
      </div>
    </div>
  );
};

export default Login;
