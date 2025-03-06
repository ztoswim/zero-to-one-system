import { useState, useEffect, useRef } from "react";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { getUserRole, logout } from "../auth";
import menuConfig from "./menuConfig";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const role = getUserRole();

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) setIsMenuOpen(false);
    };
    if (isMenuOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMenuOpen]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="lg:hidden flex items-center justify-between bg-gray-900 text-white p-4 shadow-lg">
  {/* Logo and Title */}
  <div className="flex items-center">
    <img src={logo} alt="Logo" className="w-10" />
    <span className="ml-2 text-lg">Zero To One</span>
  </div>

  {/* Menu Toggle Button */}
  <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
    <FaBars className="text-white text-2xl" />
  </button>

  {/* Dropdown Menu for small screens */}
  {isMenuOpen && (
    <div ref={menuRef} className="absolute top-14 right-4 bg-gray-900 text-white shadow-lg rounded-lg w-48 p-2">
      {/* Menu Items */}
      {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
        <button
          key={path}
          onClick={() => navigate(path)}
          className={`flex items-center p-3 w-full text-left rounded hover:bg-gray-700 ${window.location.pathname === path ? "bg-gray-700" : ""}`}
        >
          <span className="text-xl">{icon}</span>
          <span className="ml-3">{label}</span>
        </button>
      ))}
      {/* Logout Button */}
      <button onClick={handleLogout} className="flex items-center p-3 w-full text-left rounded hover:bg-red-600 mt-2">
        <FaSignOutAlt className="text-xl" />
        <span className="ml-3">退出</span>
      </button>
    </div>
  )}
</nav>

  );
};

export default Navbar;
