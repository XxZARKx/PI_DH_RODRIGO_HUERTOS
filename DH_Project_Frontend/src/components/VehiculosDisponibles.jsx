import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getVehicles } from "../provider/vehicle/getVehicles";
import CardAuto from "./CardAuto";

const VehiculosDisponibles = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const vehiclesPerPage = 6;

  const {
    data: vehicles = [],
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
    retry: 3, // Intentar hasta 3 veces si falla
    staleTime: 1000 * 60 * 5, // Mantener los datos frescos durante 5 minutos
    refetchOnWindowFocus: false, // Evitar recargar al cambiar de ventana
  });

  const availableVehicles = vehicles.filter(
    (vehicle) => vehicle.estado !== "En mantenimiento"
  );

  const totalPages = Math.ceil(availableVehicles.length / vehiclesPerPage);
  const currentVehicles = availableVehicles.slice(
    (currentPage - 1) * vehiclesPerPage,
    currentPage * vehiclesPerPage
  );

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Cargando vehículos...</p>
      </div>
    );
  }

  if (isError) {
    const errorMessage =
      error?.message || "Error desconocido al cargar los vehículos.";
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>{errorMessage}</p>
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="min-h-screen flex items-center justify-center pb-10 pt-28 w-full sm:w-[90%] mx-auto px-6">
        <div className="bg-white shadow-lg rounded-lg p-6 w-full sm:w-[80%] flex items-center justify-center flex-col relative pb-24 lg:pb-18">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-700 text-center mb-6">
            Vehículos Disponibles
          </h2>
          <ul className="flex flex-wrap justify-center gap-6 sm:gap-10 w-full items-start">
            {currentVehicles.length > 0 ? (
              currentVehicles.map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="w-full sm:w-[48%] lg:w-[30%] max-w-[300px]"
                >
                  <CardAuto vehicle={vehicle} />
                </li>
              ))
            ) : (
              <li className="text-gray-600">No hay vehículos disponibles.</li>
            )}
          </ul>
          <div className="flex justify-center mt-6 absolute bottom-5 w-full px-4">
            {Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 mx-1 rounded ${
                  currentPage === index + 1
                    ? "bg-blue-500 text-white"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default VehiculosDisponibles;
