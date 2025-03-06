import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import "../styles/Navbar.css"; // 引入 CSS

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsMenuOpen(false);
      }
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  return (
    <nav className="navbar">
      <div className="navbar-content">
        <img src={logo} alt="Logo" className="navbar-logo" />
        <span className="navbar-title">Zero To One</span>
      </div>

      <button className="navbar-menu-button" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        <FaBars />
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className="navbar-menu">
          {[
            { path: "/dashboard", label: "Dashboard" },
            { path: "/profile", label: "个人资料" },
            { path: "/logout", label: "退出" },
          ].map(({ path, label }) => (
            <button key={path} onClick={() => navigate(path)} className="navbar-menu-item">
              {label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
