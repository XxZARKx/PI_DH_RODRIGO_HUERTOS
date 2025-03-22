import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "@assets/logo.svg";
import Avatar from "@assets/avatarUser.png";
import UserMenu from "./UserMenu";

const getUserFromSessionStorage = () => {
  try {
    const userData = sessionStorage.getItem("user");
    return userData ? JSON.parse(userData) : null;
  } catch (error) {
    console.error("Error al analizar los datos del usuario:", error);
    return null;
  }
};

const Header = () => {
  const [user, setUser] = useState(getUserFromSessionStorage);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    setUser(null);
    window.location.href = "/";
  };

  useEffect(() => {
    const syncUserFromStorage = () => setUser(getUserFromSessionStorage());
    window.addEventListener("storage", syncUserFromStorage);
    return () => window.removeEventListener("storage", syncUserFromStorage);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  return (
    <div className="min-h-[10vh] z-30">
      <div className="px-4 md:px-10 z-50 py-2 flex fixed items-center justify-between max-w-full w-full min-h-[10%] bg-[#9C9C9C]">
        <Link to="/">
          <img
            src={logo}
            alt="logo"
            className="w-20 h-20 md:w-32 md:h-32 object-cover cursor-pointer"
          />
        </Link>

        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-black text-2xl focus:outline-none"
          >
            ☰
          </button>
        </div>

        {isMenuOpen && (
          <div className="fixed pt-8 top-0 left-0 w-screen h-full bg-[#9C9C9C] z-50 text-black flex flex-col p-4">
            <div className="flex justify-between items-center mb-4">
              {user ? (
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <img src={Avatar} className="rounded-full" />
                  </div>
                  <span className="font-semibold">
                    {user?.nombre} {user?.apellido}
                  </span>
                </div>
              ) : (
                <span className="text-lg font-semibold">Menú</span>
              )}
              <button onClick={toggleMenu} className="text-2xl">
                ✕
              </button>
            </div>

            <ul className="flex flex-col gap-4 text-lg">
              {user?.rol?.id === 1 && (
                <>
                  <li>
                    <Link to="/vehicles/register" onClick={toggleMenu}>
                      Registrar Vehículo
                    </Link>
                  </li>
                  <li>
                    <Link to="/admin/panel/usuarios" onClick={toggleMenu}>
                      Panel
                    </Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/vehicles" onClick={toggleMenu}>
                  Nuestros Autos
                </Link>
              </li>
              {user ? (
                <UserMenu user={user} onLogout={handleLogout} isMobile />
              ) : (
                <UserMenu user={null} onLogout={handleLogout} isMobile />
              )}
            </ul>
          </div>
        )}

        <ul className="hidden md:flex gap-8 items-center text-base text-white">
          {user?.rol?.id === 1 && (
            <>
              <li>
                <Link to="/vehicles/register">Registrar Vehículo</Link>
              </li>
              <li>
                <Link to="/admin/panel/usuarios">Panel</Link>
              </li>
            </>
          )}
          <li>
            <Link to="/vehicles">Nuestros Autos</Link>
          </li>
          {!user ? (
            <>
              <li>
                <Link to="/register">Registrarse</Link>
              </li>
              <li>
                <Link to="/login">Iniciar Sesión</Link>
              </li>
            </>
          ) : (
            <UserMenu user={user} onLogout={handleLogout} />
          )}
        </ul>
      </div>
    </div>
  );
};

export default Header;
