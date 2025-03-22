import React from "react";
import { Link, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getVehicleById } from "../provider/vehicle/getVehicleById";
import Header from "./Header";
import Footer from "./Footer";
import { ArrowLeft } from "lucide-react";

const DetallesVehiculo = () => {
  const { id } = useParams();
  const {
    data: vehicle,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["vehicle", id],
    queryFn: () => getVehicleById(id),
    enabled: !!id,
  });

  if (isLoading) {
    return <div className="text-center py-10 text-xl">Cargando...</div>;
  }

  if (error) {
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error al obtener los datos del vehículo.
      </div>
    );
  }

  if (!vehicle) {
    return (
      <div className="text-center py-10 text-xl">
        No se encontraron datos del vehículo.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F9FB]">
      <Header />
      <header className="w-full bg-white shadow-md pb-4 pt-28 px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-[#1E3A8A]">
          Detalles del Vehículo
        </h1>
        <Link
          onClick={() => window.history.back()}
          className="text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft size={32} />
        </Link>
      </header>

      <div className="flex flex-col items-center py-10 px-5">
        <div className="bg-white max-w-4xl w-full rounded-2xl shadow-xl p-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex justify-center">
              <img
                className="w-full max-w-md h-auto object-contain rounded-lg shadow-lg border-4 border-[#D1D1D1]"
                src={vehicle.imagenUrl}
                alt={vehicle.marca}
              />
            </div>
            <div>
              <h1 className="text-4xl font-bold text-[#1E3A8A] capitalize mb-4">
                {vehicle.marca} {vehicle.modelo}
              </h1>
              <div className="space-y-4 mt-6">
                <p>
                  <strong className="text-[#566C85]">Precio/día:</strong> S/{" "}
                  {vehicle.precio}
                </p>
                <p>
                  <strong className="text-[#566C85]">Matrícula:</strong>{" "}
                  {vehicle.matricula}
                </p>
                <p>
                  <strong className="text-[#566C85]">Puertas:</strong>{" "}
                  {vehicle.puertas}
                </p>
                <p>
                  <strong className="text-[#566C85]">Personas:</strong>{" "}
                  {vehicle.cantidadPersonas}
                </p>
                <p>
                  <strong className="text-[#566C85]">Equipaje:</strong>{" "}
                  {vehicle.equipaje}
                </p>
                <div>
                  <strong className="text-[#566C85]">Categorías:</strong>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {/* Verifica los datos en la consola */}
                    {vehicle?.categorias?.map((categoria) => (
                      <div
                        key={categoria.id}
                        className="flex items-center bg-blue-100 rounded-full px-3 py-1"
                      >
                        <i
                          className={`${categoria.iconoClass} mr-2 text-blue-500`}
                        ></i>
                        <span className="text-sm text-blue-800">
                          {categoria.nombre}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex mt-8">
                {vehicle.estado === "Disponible" ? (
                  <Link
                    to={`/reservation/${vehicle.id}`}
                    className="bg-green-500 hover:bg-green-600 text-white text-lg py-3 px-8 rounded-full transition duration-300 transform hover:scale-105"
                  >
                    Reservar
                  </Link>
                ) : (
                  <button
                    disabled
                    className="bg-gray-400 cursor-not-allowed text-white text-lg py-3 px-8 rounded-full"
                  >
                    No Disponible
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DetallesVehiculo;
