import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/userApi";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser({ email, password });
      login(res.data.token);
      
      // 根据角色跳转到对应 Dashboard
      const role = res.data.user.role;
      const dashboardRoutes = {
        boss: "/dashboard/boss",
        admin: "/dashboard/admin",
        coach: "/dashboard/coach",
        customer: "/dashboard/customer",
      };
      navigate(dashboardRoutes[role] || "/");
    } catch (err) {
      alert(err.response?.data?.message || "登录失败");
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input type="email" placeholder="邮箱" value={email} onChange={(e) => setEmail(e.target.value)} required />
      <input type="password" placeholder="密码" value={password} onChange={(e) => setPassword(e.target.value)} required />
      <button type="submit">登录</button>
    </form>
  );
};

export default Login;
