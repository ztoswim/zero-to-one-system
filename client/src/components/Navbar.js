import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";
import { getUserRole } from "../auth";
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

  return (
    <nav className="flex lg:hidden items-center justify-between bg-gray-900 text-white p-4">
      <div className="flex items-center">
        <img src={logo} alt="Logo" className="w-10" />
        <span className="ml-2 text-lg">Zero To One</span>
      </div>

      <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="p-2">
        <FaBars />
      </button>

      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-14 right-4 bg-white text-black shadow-md rounded-lg w-48">
          {menuConfig.filter(({ role: r }) => r.includes(role)).map(({ label, icon, path }) => (
            <button key={path} onClick={() => navigate(path)}
              className={`flex items-center p-3 w-full text-left rounded hover:bg-gray-700 ${window.location.pathname === path ? "bg-gray-700" : ""}`}>
              <span className="text-xl">{icon}</span>
              <span className="ml-3">{label}</span>
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
