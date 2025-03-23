import React from "react";
import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold mb-4">Acceso Denegado</h1>
      <p className="mb-6 text-center">
        No tienes los permisos necesarios para acceder a esta página.
      </p>
      <Link
        to="/"
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
      >
        Regresar al Inicio
      </Link>
    </div>
  );
};

export default AccessDenied;
