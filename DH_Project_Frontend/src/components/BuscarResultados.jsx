import React from "react";
import { useLocation } from "react-router-dom";
import CardAuto from "./CardAuto";
import Header from "./Header";
import Footer from "./Footer";
import { useQuery } from "@tanstack/react-query";
import { getAvailableVehicles } from "../provider/vehicle/getVehicles";

const BuscarResultados = () => {
  const location = useLocation();
  const {
    startDate: rawStartDate,
    endDate: rawEndDate,
    selectedBrand,
  } = location.state || {};

  // Convertir las fechas de string ISO a objetos Date
  const startDate = rawStartDate ? new Date(rawStartDate) : null;
  const endDate = rawEndDate ? new Date(rawEndDate) : null;

  const {
    data: vehicles,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["availableVehicles", startDate, endDate],
    queryFn: () => getAvailableVehicles(startDate, endDate),
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    enabled: !!startDate && !!endDate, // Solo ejecutar si hay fechas válidas
  });

  // Filtrar los vehículos por marca
  const filteredVehicles = vehicles?.filter((vehicle) =>
    selectedBrand ? vehicle.marca === selectedBrand : true
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 p-6 max-w-6xl mx-auto">
        <h2 className="text-2xl font-bold text-center mb-6">
          Resultados de Búsqueda
        </h2>
        <p className="text-center mb-4 text-gray-600">
          {selectedBrand
            ? `Vehículos disponibles para ${selectedBrand} del ${rawStartDate} al ${rawEndDate}`
            : `Todos los vehículos disponibles del ${rawStartDate} al ${rawEndDate}`}
        </p>
        {isLoading ? (
          <p className="text-center">Cargando vehículos...</p>
        ) : isError ? (
          <p className="text-center text-red-600">
            Error al cargar los vehículos.
          </p>
        ) : filteredVehicles?.length > 0 ? (
          <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {filteredVehicles.map((vehicle) => (
              <li key={vehicle.id}>
                <CardAuto vehicle={vehicle} />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-600">
            No hay vehículos disponibles para la búsqueda.
          </p>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default BuscarResultados;
