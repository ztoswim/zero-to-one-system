import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  return (
    <nav className="navbar lg:hidden">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Zero To One Academy</span>
      </div>
      <button onClick={() => navigate("/menu")} className="navbar-menu-button">
        <FaBars />
      </button>
    </nav>
  );
};

export default Navbar;
