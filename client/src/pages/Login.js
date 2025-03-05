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

      console.log("登录成功，角色:", role); // ✅ 调试
      switch (role) {
        case "boss":
          navigate("/dashboard/boss");
          break;
        case "admin":
          navigate("/dashboard/admin");
          break;
        case "coach":
          navigate("/dashboard/coach");
          break;
        case "customer":
          navigate("/dashboard/customer");
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
