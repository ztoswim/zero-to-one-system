import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Login from "./pages/Login";

const App = () => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const storedRole = localStorage.getItem("role");
    if (storedRole) setRole(storedRole);
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to={role ? `/${role}-dashboard` : "/login"} />} />
        <Route path="/boss-dashboard" element={role === "boss" ? <BossDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin-dashboard" element={role === "admin" ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/coach-dashboard" element={role === "coach" ? <CoachDashboard /> : <Navigate to="/login" />} />
        <Route path="/customer-dashboard" element={role === "customer" ? <CustomerDashboard /> : <Navigate to="/login" />} />
      </Routes>
    </Router>
  );
};

export default App;
