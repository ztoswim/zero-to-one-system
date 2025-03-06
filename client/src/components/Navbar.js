import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";
import { logout } from "../auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <button onClick={() => navigate("/")}>🏠 主页</button>
      <button onClick={handleLogout}>
        <FaSignOutAlt /> 退出
      </button>
    </nav>
  );
};

export default Navbar;
