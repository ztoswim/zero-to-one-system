import React, { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import AccountManage from "./pages/AccountManage";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import "./styles/index.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 从 localStorage 获取 token
    const token = localStorage.getItem("token");
    
    // 如果没有 token，跳转到登录页面
    if (!token) {
      navigate("/");
      return;
    }
    
    // 如果有 token，获取用户信息
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, [navigate]);

  // 如果没有用户数据且路径不是登录页面，跳转到登录页面
  useEffect(() => {
    if (!isLoading && !user && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoading, user, location.pathname, navigate]);

  // 根据用户角色跳转到对应的 Dashboard
  useEffect(() => {
    if (user?.role) {
      navigateToDashboard(user.role);
    }
  }, [user]);

  const navigateToDashboard = (role) => {
    const dashboardRoutes = {
      boss: "/boss-dashboard",
      admin: "/admin-dashboard",
      coach: "/coach-dashboard",
      customer: "/customer-dashboard",
    };
    navigate(dashboardRoutes[role] || "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (isLoading) {
    return <div>加载中...</div>;
  }

  return (
    <div className="app-container">
      {user && <Navbar user={user} onLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<Login setUser={(u) => { setUser(u); localStorage.setItem("user", JSON.stringify(u)); }} />} />
        <Route path="/accountmanage" element={<AccountManage />} />
        <Route path="/boss-dashboard" element={<BossDashboard />} />
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/coach-dashboard" element={<CoachDashboard />} />
        <Route path="/customer-dashboard" element={<CustomerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
