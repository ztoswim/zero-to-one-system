import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import { getUserRole } from "./auth";

const App = () => {
  const [userRole, setUserRole] = useState(getUserRole());

  useEffect(() => {
    const checkRole = () => {
      const role = getUserRole();
      if (role !== userRole) {
        setUserRole(role);
      }
    };

    window.addEventListener("storage", checkRole);
    return () => window.removeEventListener("storage", checkRole);
  }, [userRole]);

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={userRole ? <Navigate to={`/${userRole}`} /> : <Login />}
        />
        <Route path="/" element={<Navigate to={userRole ? `/${userRole}` : "/login"} />} />
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
