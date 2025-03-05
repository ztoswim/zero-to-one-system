import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_BASE_URL from "../api/apiConfig";
import { getUserRole } from "../auth";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(`${API_BASE_URL}/users/login`, { username, password });
      const { token } = res.data;

      if (token) {
        localStorage.setItem("token", token); // 存 Token
        const role = getUserRole(); // 获取角色
        redirectToDashboard(role); // 跳转到相应 Dashboard
      }
    } catch (err) {
      setError("登录失败，请检查用户名和密码");
    }
  };

  const redirectToDashboard = (role) => {
    const rolePaths = {
      boss: "/boss",
      admin: "/admin",
      coach: "/coach",
      customer: "/customer",
    };
    navigate(rolePaths[role] || "/login");
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
