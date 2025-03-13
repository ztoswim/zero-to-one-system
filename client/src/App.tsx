import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from "react-router-dom";
import { useEffect, useState, JSX } from "react";
import { ToastContainer, toast } from "react-toastify"; // 引入 ToastContainer 和 toast
import "react-toastify/dist/ReactToastify.css"; // 引入样式

// 引入布局和页面组件
import DashboardLayout from "./components/DashboardLayout";
import BossDashboard from "./pages/BossDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import CoachDashboard from "./pages/CoachDashboard";
import CustomerDashboard from "./pages/CustomerDashboard";
import Login from "./pages/Login";
import ProductPage from "./pages/ProductPage";
import InvoicePage from "./pages/InvoicePage"; // 引入发票页面
import BuyerPage from "./pages/BuyerPage"; // 引入买家管理页面

const App = () => {
  const [role, setRole] = useState<string | null>(localStorage.getItem("role"));

  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // 角色验证组件
  const ProtectedRoute = ({ children, roleRequired }: { children: JSX.Element, roleRequired: string }) => {
    if (role !== roleRequired) {
      toast.error("您没有权限访问此页面，请先登录！");
      return <Navigate to="/login" />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        {/* 登录页面 */}
        <Route path="/login" element={<Login setRole={setRole} />} />

        {/* 根路径跳转 */}
        <Route path="/" element={<Navigate to={role ? `/${role}-dashboard` : "/login"} />} />

        {/* Dashboard 页面，角色验证 */}
        {role ? (
          <Route element={<DashboardLayout><Outlet /></DashboardLayout>}>
            {/* Boss 和 Admin 角色的 dashboard 页面 */}
            <Route
              path="/boss-dashboard"
              element={<ProtectedRoute roleRequired="boss"><BossDashboard /></ProtectedRoute>}
            />
            <Route
              path="/admin-dashboard"
              element={<ProtectedRoute roleRequired="admin"><AdminDashboard /></ProtectedRoute>}
            />
            <Route
              path="/coach-dashboard"
              element={<ProtectedRoute roleRequired="coach"><CoachDashboard /></ProtectedRoute>}
            />
            <Route
              path="/customer-dashboard"
              element={<ProtectedRoute roleRequired="customer"><CustomerDashboard /></ProtectedRoute>}
            />

            {/* 发票管理页面，只允许 boss 和 admin 角色访问 */}
            <Route
              path="/invoices"
              element={<ProtectedRoute roleRequired="boss"><InvoicePage /></ProtectedRoute>}
            />
            <Route
              path="/invoices"
              element={<ProtectedRoute roleRequired="admin"><InvoicePage /></ProtectedRoute>}
            />

            {/* 买家管理页面，只允许 boss 和 admin 角色访问 */}
            <Route
              path="/buyers"
              element={<ProtectedRoute roleRequired="boss"><BuyerPage /></ProtectedRoute>}
            />
            <Route
              path="/buyers"
              element={<ProtectedRoute roleRequired="admin"><BuyerPage /></ProtectedRoute>}
            />
          </Route>
        ) : null}

        {/* 角色特定的页面 */}
        <Route
          path="/products"
          element={<ProtectedRoute roleRequired="boss"><ProductPage /></ProtectedRoute>}
        />

        {/* 404 页面，默认回到登录 */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>

      {/* ToastContainer 用于显示 toast 消息 */}
      <ToastContainer />
    </Router>
  );
};

export default App;
