import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./auth";
import { Dispatch, SetStateAction } from "react";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import LoginComponent from "./pages/Login";

interface LoginProps {
  setUserRole: Dispatch<SetStateAction<string | null>>;
}

const App: React.FC<LoginProps> = ({ setUserRole }) => {
  const [userRole] = useAuth(); // ✅ 直接使用 Hook 获取角色

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginComponent setUserRole={setUserRole} />} />
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
