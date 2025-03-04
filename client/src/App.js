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
  const [isLoggedIn, setIsLoggedIn] = useState(false);

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
      setIsLoggedIn(true);
    }

    setIsLoading(false);
  }, [navigate]);

  useEffect(() => {
    if (!isLoading && !isLoggedIn && location.pathname !== "/") {
      navigate("/"); // 未登录且不在登录页，跳转到登录页面
    }
  }, [isLoading, isLoggedIn, location.pathname, navigate]);

  useEffect(() => {
    if (user?.role) {
      navigateToDashboard(user.role);
    }
  }, [user]);

  const navigateToDashboard = (role) => {
    const dashboardRoutes = {
      boss: "/dashboard-boss",
      admin: "/dashboard-admin",
      coach: "/dashboard-coach",
      customer: "/dashboard-customer",
    };
    navigate(dashboardRoutes[role] || "/");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsLoggedIn(false);
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
        <Route path="/dashboard-boss" element={<BossDashboard />} />
        <Route path="/dashboard-admin" element={<AdminDashboard />} />
        <Route path="/dashboard-coach" element={<CoachDashboard />} />
        <Route path="/dashboard-customer" element={<CustomerDashboard />} />
      </Routes>
    </div>
  );
}

export default App;
