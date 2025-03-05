import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth, logout, getToken, getUserRole } from "../auth"; // 引入简化后的函数
import { FaUser, FaLock } from "react-icons/fa"; 
import logo from "../assets/Logo.png"; 
import "../styles/Login.css"; 

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

   // 检查是否已登录，已登录则直接跳转到相应页面
   useEffect(() => {
    const token = getToken();
    const role = getUserRole();

    if (token && role) {
      navigate(`/${role}`); // 已登录则跳转到对应角色的页面
    }
  }, [navigate]); // 依赖空数组，组件加载时检查登录状态

  const handleLogin = async (e) => {
    e.preventDefault();

    // 清理旧的 token 和 role
    logout();

    try {
      const { token, role } = await login(username, password);

      // 保存新的 token 和 role
      saveUserAuth(token, role);

      // 强制刷新状态（通过 useEffect 监听）
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
