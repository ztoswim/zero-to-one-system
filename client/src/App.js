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
import StudentList from "./pages/StudentList";
import "./styles/index.css";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSidebarPinned, setIsSidebarPinned] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
        console.log("✅ 读取用户数据:", parsedUser);
      }
    } catch (error) {
      console.warn("⚠️ 无法解析本地存储的用户数据:", error);
      localStorage.removeItem("user");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!isLoading && !user && location.pathname !== "/") {
      navigate("/");
    }
  }, [isLoading, user, location.pathname, navigate]);

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
    if (dashboardRoutes[role] && location.pathname === "/") {
      navigate(dashboardRoutes[role]);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    navigate("/");
  };

  if (isLoading) {
    return <div className="loading">加载中...</div>;
  }

  return (
    <div className={`app-container ${isSidebarOpen || isSidebarPinned ? "sidebar-expanded" : ""}`}>
      {user && <Navbar user={user} onLogout={handleLogout} setIsSidebarOpen={setIsSidebarOpen} isSidebarOpen={isSidebarOpen} />}
      {user && (
        <Sidebar
          user={user}
          onLogout={handleLogout}
          isPinned={isSidebarPinned}
          setIsPinned={setIsSidebarPinned}
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
      )}
      <div className="content">
        <Routes>
          <Route path="/" element={<Login setUser={(u) => { setUser(u); localStorage.setItem("user", JSON.stringify(u)); }} />} />
          <Route path="/accountmanage" element={<AccountManage />} />
          <Route path="/boss-dashboard" element={<BossDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/coach-dashboard" element={<CoachDashboard />} />
          <Route path="/customer-dashboard" element={<CustomerDashboard />} />
          <Route path="/studentlist" element={<StudentList />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
