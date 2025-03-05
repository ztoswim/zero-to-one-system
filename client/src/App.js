import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import { getUserRole } from "./auth"; // 确保路径正确

const App = () => {
  const userRole = getUserRole(); // 从 Token 解析用户角色

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={userRole ? `/${userRole}` : "/login"} />} />

        {/* 保护所有 Dashboard 页面 */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/boss" element={<BossDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/coach" element={<CoachDashboard />} />
          <Route path="/customer" element={<CustomerDashboard />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
