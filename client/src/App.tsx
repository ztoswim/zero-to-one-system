import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import Login from "./pages/Login";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// 受保护的路由组件
const ProtectedRoute = ({ role, children }: { role: string; children: React.ReactNode }) => {
  const { userRole } = useAuth();

  if (!userRole) return <Navigate to="/login" />;
  return userRole === role ? children : <Navigate to={`/${userRole}`} />;
};

const App: React.FC = () => {
  const { userRole } = useAuth();

  return (
    <Router>
      <Routes>
        {/* 登录页 */}
        <Route path="/login" element={<Login />} />

        {/* 根路径，根据用户角色跳转 */}
        <Route path="/" element={userRole ? <Navigate to={`/${userRole}`} /> : <Navigate to="/login" />} />

        {/* 受保护的 Dashboard 路由 */}
        <Route path="/boss" element={<ProtectedRoute role="boss"><BossDashboard /></ProtectedRoute>} />
        <Route path="/admin" element={<ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/coach" element={<ProtectedRoute role="coach"><CoachDashboard /></ProtectedRoute>} />
        <Route path="/customer" element={<ProtectedRoute role="customer"><CustomerDashboard /></ProtectedRoute>} />

        {/* 兜底路由 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
