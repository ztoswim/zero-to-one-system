import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth, isAuthenticated } from "./auth";
import Login from "./pages/Login";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

// 受保护的路由组件
const ProtectedRoute = ({ role, children }: { role: string; children: React.ReactNode }) => {
  const [userRole] = useAuth();
  if (!isAuthenticated() || userRole !== role) {
    return <Navigate to="/login" />;
  }
  return children;
};

const App: React.FC = () => {
  const [userRole, setUserRole] = useAuth(); // ✅ 直接使用 Hook 获取角色

  return (
    <Router>
      <Routes>
        {/* 登录页，传递 setUserRole */}
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />

        {/* 自动重定向到对应的 Dashboard */}
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
