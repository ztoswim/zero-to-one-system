import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Register from "./Register"; // ✅ 导入注册组件
import { loginUser } from "../api/userApi"; // ✅ 统一 API 调用
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showRegister, setShowRegister] = useState(false); // ✅ 控制注册弹窗
  const [loading, setLoading] = useState(false); // ✅ 增加 loading 状态
  const navigate = useNavigate();

  // 角色对应的跳转路径
  const navigateToDashboard = (role) => {
    const routes = {
      boss: "/boss-dashboard",
      admin: "/admin-dashboard",
      coach: "/coach-dashboard",
      customer: "/customer-dashboard",
    };
    navigate(routes[role] || "/");
  };

  // 处理登录逻辑
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true); // ✅ 开始加载

    try {
      const data = await loginUser({ username, password });

      if (data?.user) {
        localStorage.setItem("user", JSON.stringify(data.user)); // ✅ 存储用户信息
        localStorage.setItem("role", data.user.role); // ✅ 存储角色
        setUser(data.user);
        navigateToDashboard(data.user.role);
      } else {
        setError(data.message || "账号或密码错误，请重新输入！");
      }
    } catch (err) {
      console.error("登录请求错误:", err);
      setError(
        err.response?.data?.message ||
          "服务器繁忙，请稍后再试！"
      );
    } finally {
      setLoading(false); // ✅ 结束加载
    }
  };

  return (
    <div className="login-container">
      {/* 注册弹窗 */}
      {showRegister && (
        <Register isOpen={showRegister} onClose={() => setShowRegister(false)} isLoginRegister={true} />
      )}

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
              disabled={loading} // ✅ 登录时禁用输入框
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
              disabled={loading} // ✅ 登录时禁用输入框
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </button>
        </form>

        <button className="register-button" onClick={() => setShowRegister(true)} disabled={loading}>
          {loading ? "请稍后..." : "注册"}
        </button>
      </div>
    </div>
  );
};

export default Login;
