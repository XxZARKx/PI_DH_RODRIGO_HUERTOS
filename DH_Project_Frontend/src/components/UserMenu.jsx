import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Avatar from "@assets/avatarUser.png";

const UserMenu = ({ user, onLogout, isMobile = false }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMenu = () => setMenuOpen(!menuOpen);
  const closeMenu = () => setMenuOpen(false);

  const handleLogout = () => {
    closeMenu();
    onLogout();
  };

  const goToReservations = () => {
    closeMenu();
    navigate("/mis-reservas");
  };

  const goToRegisterAdmin = () => {
    closeMenu();
    navigate("/register/admin");
  };

  const renderDesktopMenu = () => (
    <div className="relative inline-block text-left">
      <div
        className="flex items-center cursor-pointer space-x-2"
        onClick={toggleMenu}
      >
        <span className="font-normal capitalize">
          {user.nombre} {user.apellido}
        </span>
        <img src={Avatar} alt="Avatar" className="w-10 h-10 rounded-full" />
      </div>

      {menuOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-20">
          {user.tipo === 1 && (
            <button
              className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
              onClick={goToRegisterAdmin}
            >
              Registrar Empleado
            </button>
          )}
          <button
            className="block w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100"
            onClick={goToReservations}
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
          {user.tipo === 1 && (
            <li>
              <button onClick={goToRegisterAdmin}>Registrar Empleado</button>
            </li>
          )}
          <li>
            <button onClick={goToReservations}>Mis Reservas</button>
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
