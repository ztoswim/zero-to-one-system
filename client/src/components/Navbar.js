import { useState, useEffect, useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { useNavigate, useLocation } from "react-router-dom";
import menuItems from "./menuConfig";
import { getUserRole, logout } from "../auth";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [role, setRole] = useState(getUserRole());
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="navbar">
      <button className="menu-toggle" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        {isMenuOpen ? <FaTimes /> : <FaBars />}
      </button>
      <nav ref={menuRef} className={`nav-menu ${isMenuOpen ? "open" : ""}`}>
        <ul>
          {menuItems
            .filter(item => item.roles.includes(role))
            .map(({ label, icon: Icon, path }) => (
              <li key={path} className={location.pathname === path ? "active" : ""}>
                <button className="nav-button" onClick={() => { navigate(path); setIsMenuOpen(false); }}>
                  <Icon className="nav-icon" />
                  <span className="nav-label">{label}</span>
                </button>
              </li>
            ))}
          <li>
            <button className="nav-button logout" onClick={logout}>
              退出
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
