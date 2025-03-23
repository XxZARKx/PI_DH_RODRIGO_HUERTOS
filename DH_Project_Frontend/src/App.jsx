import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/AutenticacionUsuario/Login";
import Register from "./components/AutenticacionUsuario/Register";
import RegistrarVehiculo from "./components/RegistrarVehiculo";
import VehiculosDisponibles from "./components/VehiculosDisponibles";
import DetallesVehiculo from "./components/DetallesVehiculo";
import PanelAdmin from "./components/PanelAdmin";
import ProtectedRoute from "./components/ProtectedRoute";
import AccessDenied from "./components/AccessDenied";
import ReservaVehiculo from "./components/ReservaVehiculo";
import MisReservas from "./components/UserReservas";
import PoliticaPrivacidad from "./components/PoliticaPrivacidad";
import TerminosYCondiciones from "./components/TerminosYCondiciones";
import BuscarResultados from "./components/BuscarResultados";
import { useNavigate } from "react-router-dom";

const getUserFromSessionStorage = () => {
  try {
    const userData = sessionStorage.getItem("user");
    if (!userData) return null;
    return JSON.parse(userData);
  } catch (error) {
    console.error("Error al analizar los datos del usuario:", error);
    return null;
  }
};

// Función combinada para detectar dispositivos móviles
const isMobileDevice = () => {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Primero, verifica el User-Agent
  const isMobileUserAgent =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(
      userAgent.toLowerCase()
    );

  // Luego, verifica el ancho de la pantalla como respaldo
  const isMobileScreen = window.matchMedia("(max-width: 768px)").matches;

  return isMobileUserAgent || isMobileScreen;
};

// Componente para la página /access-denied-mobile
const AccessDeniedMobile = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">
          Acceso Denegado
        </h2>
        <p className="text-gray-500 mb-6">
          El panel de administración no está disponible en dispositivos móviles.
          Por favor, acceda desde una computadora.
        </p>
        <button
          className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
          onClick={() => navigate("/")}
        >
          Volver
        </button>
      </div>
    </div>
  );
};

function App() {
  const user = getUserFromSessionStorage();

  return (
    <div className="bg-[#E4E4E4]">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/register"
            element={<Register tipo={2} titulo="Registrar Cliente" />}
          />
          <Route
            path="/register/admin"
            element={
              <ProtectedRoute user={user} requiredTipo={1}>
                <Register tipo={1} titulo="Registrar Empleado" />
              </ProtectedRoute>
            }
          />
          <Route path="/vehicles" element={<VehiculosDisponibles />} />
          <Route path="/politicaPrivacidad" element={<PoliticaPrivacidad />} />
          <Route
            path="/terminosYcondiciones"
            element={<TerminosYCondiciones />}
          />

          <Route path="/vehicles/:id" element={<DetallesVehiculo />} />
          <Route path="/reservation/:id" element={<ReservaVehiculo />} />
          <Route path="/mis-reservas" element={<MisReservas />} />

          <Route
            path="/vehicles/register"
            element={
              <ProtectedRoute user={user} requiredTipo={1}>
                <RegistrarVehiculo />
              </ProtectedRoute>
            }
          />
          <Route
            path="/buscar-resultados"
            element={<BuscarResultados />}
          ></Route>

          {/* Validación para dispositivos móviles en el panel de admin */}
          <Route
            path="/admin/panel"
            element={
              isMobileDevice() ? (
                <Navigate to="/access-denied-mobile" />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <PanelAdmin />
                </ProtectedRoute>
              )
            }
          />
          <Route
            path="/admin/panel/:pestania"
            element={
              isMobileDevice() ? (
                <Navigate to="/access-denied-mobile" />
              ) : (
                <ProtectedRoute user={user} requiredTipo={1}>
                  <PanelAdmin />
                </ProtectedRoute>
              )
            }
          />

          <Route path="*" element={<div>Página no encontrada</div>} />
          <Route path="/access-denied" element={<AccessDenied />} />
          {/* Nueva ruta para mostrar el mensaje de acceso denegado en móviles */}
          <Route
            path="/access-denied-mobile"
            element={<AccessDeniedMobile />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
