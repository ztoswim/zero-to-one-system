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
  const [isLoading, setIsLoading] = useState(true); // 默认是加载中
  const [isLoggedIn, setIsLoggedIn] = useState(false); // 用来确定是否已登录

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setIsLoading(false);
      navigate("/"); // 没有 token，跳转到登录页
      return;
    }

    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
      setIsLoggedIn(true); // 设置为已登录
    }

    setIsLoading(false); // 加载完毕
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && location.pathname !== "/") {
      navigate("/"); // 未登录且不在登录页，跳转到登录页面
    }
  }, [isLoading, isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    if (user?.role) {
      navigateToDashboard(user.role); // 跳转到相应的 Dashboard
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
    setIsLoggedIn(false); // 设置为未登录
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
