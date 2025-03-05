import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role") || null);

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role) {
      setUserRole(role); // **确保 useState 更新**
    }
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setUserRole={setUserRole} />} />
        <Route path="/" element={userRole ? <Navigate to={`/${userRole}`} /> : <Navigate to="/login" />} />
        <Route path="/boss" element={userRole === "boss" ? <BossDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin" element={userRole === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/coach" element={userRole === "coach" ? <CoachDashboard /> : <Navigate to="/login" />} />
        <Route path="/customer" element={userRole === "customer" ? <CustomerDashboard /> : <Navigate to="/login" />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
