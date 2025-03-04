import React, { useState } from "react";
import { FaUser, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi"; // 统一的登录 API 调用
import "../styles/Login.css";

const Login = ({ setUser }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const data = await loginUser({ username, password });

      if (data?.user) {
        console.log("登录成功, 用户信息:", data.user);
        localStorage.setItem("user", JSON.stringify(data.user)); // 存储用户信息
        localStorage.setItem("token", data.token); // 存储 token

        setUser(data.user); // 更新用户信息
        
        // 跳转到用户对应的 dashboard 页面
        navigate(`/dashboard-${data.user.role}`); // 使用用户的 role 来确定跳转的页面
      } else {
        setError(data.message || "账号或密码错误，请重新输入！");
      }
    } catch (err) {
      console.error("登录请求错误:", err);
      setError(err.response?.data?.message || "服务器繁忙，请稍后再试！");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
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
              disabled={loading}
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
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "登录中..." : "登录"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
