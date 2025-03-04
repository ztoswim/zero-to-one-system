import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import Sidebar from "./components/Sidebar";
import { getUserRole } from "./auth";

const App = () => {
  const role = getUserRole();

  return (
    <Router>
      <div style={styles.container}>
        {/* 只有登录后才显示 Sidebar */}
        {role && <Sidebar />}

        <div style={styles.content}>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Navigate to="/dashboard" />} />

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
        </div>
      </div>
    </Router>
  );
};

const styles = {
  container: {
    display: "flex",
  },
  content: {
    flexGrow: 1,
    padding: "20px",
    background: "#f4f4f4",
    minHeight: "100vh",
  },
};

export default App;
