import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@assets/avatarUser.png";

const UserMenu = ({ user: propUser, onLogout, isMobile = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const user = propUser || JSON.parse(sessionStorage.getItem("user")) || null;

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleNavigation = (path) => {
    closeMenu();
    navigate(path);
  };

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    closeMenu();
    onLogout?.();
    navigate("/");
    window.location.reload();
  };

  const renderDesktopMenu = () =>
    user && (
      <div className="relative inline-block text-left">
        <div
          className="flex items-center cursor-pointer space-x-2"
          onClick={toggleMenu}
        >
          <span className="font-normal capitalize">
            {user?.nombre ?? "Usuario"} {user?.apellido ?? ""}
          </span>
          <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
        </div>
        {menuOpen && (
          <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
            {user?.rol?.id === 1 && (
              <button
                className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => handleNavigation("/register/admin")}
              >
                Registrar Empleado
              </button>
            )}
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => handleNavigation("/mis-reservas")}
            >
              Mis Reservas
            </button>
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={handleLogout}
            >
              Salir
            </button>
          </div>
        )}
      </div>
    );

  const renderMobileMenu = () => (
    <ul className="flex flex-col gap-4 text-lg">
      {user ? (
        <>
          {user?.rol?.id === 1 && (
            <li>
              <button onClick={() => handleNavigation("/register/admin")}>
                Registrar Empleado
              </button>
            </li>
          )}
          <li>
            <button onClick={() => handleNavigation("/mis-reservas")}>
              Mis Reservas
            </button>
          </li>
          <li>
            <button onClick={handleLogout}>Salir</button>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="/register" onClick={closeMenu}>
              Registrarse
            </Link>
          </li>
          <li>
            <Link to="/login" onClick={closeMenu}>
              Iniciar Sesión
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return isMobile ? renderMobileMenu() : renderDesktopMenu();
};

export default UserMenu;
