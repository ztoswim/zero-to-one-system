import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../api/authApi";
import { saveUserAuth } from "../auth";

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

      // 根据角色跳转到相应 Dashboard
      switch (role) {
        case "boss":
          navigate("/boss");
          break;
        case "admin":
          navigate("/admin");
          break;
        case "coach":
          navigate("/coach");
          break;
        case "customer":
          navigate("/customer");
          break;
        default:
          navigate("/dashboard");
      }
    } catch (err) {
      setError(err.message || "登录失败");
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
