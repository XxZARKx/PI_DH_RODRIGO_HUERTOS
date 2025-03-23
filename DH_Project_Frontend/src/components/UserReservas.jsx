import React, { useEffect, useState } from "react";
import { getReservationsByUserId } from "../provider/reservation/getReservationUser";
import { getAuthenticatedUser } from "../provider/user/getAuthUser";
import { deleteReservation } from "../provider/reservation/deleteReservation";
import { updateVehicleStatus } from "../provider/reservation/updateVehicleStatus";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";

const MisReservas = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Función para ajustar una fecha sumando un día
  const adjustDate = (date) => {
    const adjustedDate = new Date(date);
    adjustedDate.setDate(adjustedDate.getDate() + 1); // Sumar un día
    return adjustedDate;
  };

  // Obtener las reservas del usuario autenticado
  useEffect(() => {
    const fetchReservations = async () => {
      try {
        // Obtener el usuario autenticado
        const user = await getAuthenticatedUser(navigate);
        if (!user || !user.id) {
          throw new Error("Usuario no autenticado o ID no disponible.");
        }

        // Obtener las reservas del usuario
        const userReservations = await getReservationsByUserId(user.id);
        setReservations(userReservations);
      } catch (error) {
        console.error("Error al obtener las reservas:", error);
        Swal.fire({
          icon: "error",
          title: "Error",
          text: error.message || "No se pudieron cargar las reservas.",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchReservations();
  }, [navigate]);

  // Función para cancelar una reserva
  const handleCancelReservation = async (reservationId, vehicleId) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¿Quieres cancelar esta reserva?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, cancelar",
      cancelButtonText: "No, mantener reserva",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          // Validar que el ID del vehículo esté presente
          if (!vehicleId) {
            throw new Error("ID del vehículo no disponible.");
          }

          // Eliminar la reserva
          await deleteReservation(reservationId);

          // Actualizar el estado del vehículo a "Disponible"
          await updateVehicleStatus({ id: vehicleId, status: "Disponible" });

          // Refrescar las reservas
          const updatedReservations = reservations.filter(
            (res) => res.id !== reservationId
          );
          setReservations(updatedReservations);

          Swal.fire({
            icon: "success",
            title: "Reserva cancelada",
            text: "La reserva ha sido cancelada exitosamente.",
          });
        } catch (error) {
          console.error("Error al cancelar la reserva:", error);
          Swal.fire({
            icon: "error",
            title: "Error",
            text:
              error.message ||
              "Hubo un problema al cancelar la reserva. Por favor, intenta nuevamente.",
          });
        }
      }
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-lg font-medium text-gray-700">
          Cargando reservas...
        </p>
      </div>
    );
  }

  if (reservations.length === 0) {
    return (
      <div className="min-h-screen flex flex-col bg-gray-100">
        {/* Header */}
        <Header />

        {/* Contenido principal */}
        <div className="flex-grow flex items-center justify-center p-6">
          <div className="bg-white p-8 rounded-lg shadow-md text-center max-w-md w-full">
            <h2 className="text-xl font-semibold text-gray-700 mb-4">
              No tienes reservas realizadas
            </h2>
            <p className="text-gray-500 mb-6">
              Actualmente no tienes ninguna reserva registrada. ¿Te gustaría
              hacer una nueva?
            </p>
            <button
              className="bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              onClick={() => navigate("/vehicles")}
            >
              Hacer una nueva reserva
            </button>
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Header */}
      <Header />

      {/* Contenido principal */}
      <div className="container mx-auto p-6 flex-grow">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">Mis Reservas</h1>

        {/* Lista de reservas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reservations.map((reserva) => (
            <div
              key={reserva.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              {/* Imagen del vehículo */}
              <div className="mb-4">
                <img
                  src={reserva.vehiculo.imagenUrl || "/default-image.jpg"}
                  alt={`${reserva.vehiculo.marca} ${reserva.vehiculo.modelo}`}
                  className="w-full h-40 object-cover rounded-md"
                />
              </div>

              {/* Detalles del vehículo */}
              <div className="mb-2">
                <strong className="block text-sm font-medium text-gray-600">
                  Vehículo:
                </strong>
                <p className="text-lg font-semibold">
                  {reserva.vehiculo.marca} {reserva.vehiculo.modelo}
                </p>
              </div>
              <div className="mb-2">
                <strong className="block text-sm font-medium text-gray-600">
                  Fecha de reserva:
                </strong>
                <p>{adjustDate(reserva.fechaReserva).toLocaleDateString()}</p>
              </div>
              <div className="mb-2">
                <strong className="block text-sm font-medium text-gray-600">
                  Fecha de devolución:
                </strong>
                <p>
                  {adjustDate(reserva.fechaDevolucion).toLocaleDateString()}
                </p>
              </div>
              <div className="mb-4">
                <strong className="block text-sm font-medium text-gray-600">
                  Total:
                </strong>
                <p className="text-lg font-semibold text-green-600">
                  ${reserva.total}
                </p>
              </div>

              {/* Botón para cancelar la reserva */}
              <button
                onClick={() =>
                  handleCancelReservation(reserva.id, reserva.vehiculo.id)
                }
                className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 transition duration-300"
              >
                Cancelar Reserva
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default MisReservas;
