import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // 管理员面板组件
import CoachDashboard from "./CoachDashboard"; // 教练面板组件
import CustomerDashboard from "./CustomerDashboard"; // 客户面板组件
import BossDashboard from "./BossDashboard"; // Boss 面板组件

const Dashboard = () => {
  const { isAuthenticated, loading, role } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return <div>加载中...</div>;
  }

  if (!isAuthenticated) {
    navigate("/login");
    return null;
  }

  switch (role) {
    case "admin":
      return <AdminDashboard />;
    case "coach":
      return <CoachDashboard />;
    case "customer":
      return <CustomerDashboard />;
    case "boss":
      return <BossDashboard />;
    default:
      return <div>未定义角色，无法显示 dashboard。</div>;
  }
};

export default Dashboard;
