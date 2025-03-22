import React, { useState, useEffect } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import Header from "./Header";
import Banner from "./Banner";
import CardAuto from "./CardAuto";
import CarrouselColabs from "./CarrouselColabs";
import CustomizedAccordions from "./PreguntasAcordeon";
import Footer from "./Footer";
import { getVehicles } from "../provider/vehicle/getVehicles";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState("");
  const [recommendedVehicles, setRecommendedVehicles] = useState([]);

  const {
    data: vehicles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
    staleTime: 1000 * 60 * 5,
    cacheTime: 1000 * 60 * 10,
    retry: 3,
    onError: (err) => {
      console.error("Error al obtener vehículos:", err);
    },
  });

  // Almacena los vehículos recomendados una vez que se cargan
  useEffect(() => {
    if (vehicles && vehicles.length > 0) {
      const shuffledVehicles = [...vehicles]
        .sort(() => Math.random() - 0.5)
        .slice(0, 10); // Limitar a 10 vehículos
      setRecommendedVehicles(shuffledVehicles);
    }
  }, [vehicles]);

  const uniqueBrands = vehicles
    ? [...new Set(vehicles.map((vehicle) => vehicle.marca).filter(Boolean))]
    : [];

  useEffect(() => {
    queryClient.invalidateQueries(["vehicles"]);
  }, []);

  const handleSearch = () => {
    if (!startDate || !endDate) {
      alert("Por favor, selecciona un rango de fechas.");
      return;
    }

    const formattedStartDate = startDate.toISOString().split(".")[0]; // Elimina los milisegundos
    const formattedEndDate = endDate.toISOString().split(".")[0];

    navigate(
      `/buscar-resultados?startDate=${formattedStartDate}&endDate=${formattedEndDate}&brand=${encodeURIComponent(
        selectedBrand
      )}`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Encabezado */}
      <div className="bg-gradient-to-b from-blue-700 to-blue-500 text-white">
        <Header />
        <Banner />
      </div>

      {/* Bloque de búsqueda */}
      <section className="p-8 bg-white rounded-lg shadow-md max-w-4xl mx-auto my-10 space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          Encuentra el auto ideal para tu viaje
        </h2>
        <p className="text-center text-gray-600">
          Selecciona el rango de fechas y la marca del vehículo que necesitas.
        </p>
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Fecha de inicio */}
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            selectsStart
            startDate={startDate}
            endDate={endDate}
            minDate={new Date()}
            placeholderText="Fecha de inicio"
            className="p-3 border border-gray-300 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {/* Fecha de fin */}
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            selectsEnd
            startDate={startDate}
            endDate={endDate}
            minDate={startDate || new Date()}
            placeholderText="Fecha de fin"
            className="p-3 border border-gray-300 rounded-md w-full sm:w-auto focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Selector de marca */}
        <select
          value={selectedBrand}
          onChange={(e) => setSelectedBrand(e.target.value)}
          className="p-3 border border-gray-300 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="">Selecciona una marca</option>
          {uniqueBrands.map((brand) => (
            <option key={brand} value={brand}>
              {brand}
            </option>
          ))}
        </select>
        {/* Botón de búsqueda */}
        <button
          onClick={handleSearch}
          disabled={!startDate || !endDate}
          className={`w-full px-6 py-3 rounded-md font-bold transition duration-300 ${
            startDate && endDate
              ? "bg-blue-600 text-white hover:bg-blue-700"
              : "bg-gray-400 text-gray-700 cursor-not-allowed"
          }`}
        >
          Realizar búsqueda
        </button>
      </section>

      {/* Vehículos Recomendados */}
      <section className="pb-10 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-8">
          VEHÍCULOS RECOMENDADOS
        </h2>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-8 justify-center max-w-6xl mx-auto">
          {isLoading ? (
            // Spinner mientras se cargan los datos
            <li className="col-span-full flex justify-center items-center h-48">
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
            </li>
          ) : isError ? (
            // Mensaje de error si falla la carga
            <li className="col-span-full text-red-500">
              Error: {error.message}
            </li>
          ) : recommendedVehicles.length > 0 ? (
            // Mostrar los vehículos recomendados
            recommendedVehicles.map((vehicle) => (
              <li key={vehicle.id} className="max-w-[300px] mx-auto">
                <CardAuto vehicle={vehicle} />
              </li>
            ))
          ) : (
            // Mensaje cuando no hay vehículos disponibles
            <li className="col-span-full text-gray-600">
              No hay vehículos recomendados disponibles.
            </li>
          )}
        </ul>
      </section>

      {/* Nuestros Aliados */}
      <section className="py-16 bg-gray-100">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          NUESTROS ALIADOS
        </h2>
        <div className="max-w-6xl mx-auto">
          <CarrouselColabs />
        </div>
      </section>

      {/* Preguntas Frecuentes */}
      <section className="py-16 bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          PREGUNTAS FRECUENTES
        </h2>
        <div className="max-w-4xl mx-auto">
          <CustomizedAccordions />
        </div>
      </section>

      {/* Pie de página */}
      <Footer />
    </div>
  );
};

export default Home;
