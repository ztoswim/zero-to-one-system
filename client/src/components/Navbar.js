import { useState, useEffect, useRef } from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../assets/Logo.png";

const Navbar = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

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

      <button onClick={() => setIsMenuOpen(!isMenuOpen)}><FaBars /></button>

      {isMenuOpen && (
        <div ref={menuRef} className="absolute top-14 right-4 bg-white text-black shadow-md rounded-lg w-48">
          {["/dashboard", "/profile", "/logout"].map((path, i) => (
            <button key={i} onClick={() => navigate(path)}
              className="block w-full text-left p-3 hover:bg-gray-200">
              {path === "/logout" ? "退出" : path === "/profile" ? "个人资料" : "Dashboard"}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
