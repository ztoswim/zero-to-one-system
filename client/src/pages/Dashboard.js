import React from "react";
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import AdminDashboard from "./AdminDashboard"; // 管理员面板组件
import CoachDashboard from "./CoachDashboard"; // 教练面板组件
import CustomerDashboard from "./CustomerDashboard"; // 客户面板组件
import BossDashboard from "./BossDashboard"; // Boss 面板组件

const Dashboard = () => {
  const { user } = useAuth(); // 获取当前用户信息
  const navigate = useNavigate();

  // 如果没有用户信息，跳转到登录页面
  if (!user) {
    navigate("/login");
    return null; // 不渲染其他内容
  }

  // 根据角色渲染不同的 dashboard 内容
  switch (user.role) {
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
