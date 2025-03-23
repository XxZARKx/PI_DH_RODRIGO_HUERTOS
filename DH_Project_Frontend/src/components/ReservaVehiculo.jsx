import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery, useMutation } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../provider/user/getAuthUser";
import { createReservation } from "../provider/reservation/createReservation";
import { getVehicleById } from "../provider/vehicle/getVehicleById";
import { updateVehicleStatus } from "../provider/reservation/updateVehicleStatus";
import { getSucursales } from "../provider/vehicle/getSucursales";
import Swal from "sweetalert2";
import Header from "./Header";
import Footer from "./Footer";

const ReservaVehiculo = () => {
  const { id: vehicleId } = useParams(); // ID del vehículo
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [startDate, setStartDate] = useState(new Date()); // Fecha de inicio
  const [endDate, setEndDate] = useState(new Date()); // Fecha de fin
  const [selectedSucursal, setSelectedSucursal] = useState(null); // Estado para la sucursal seleccionada

  // Obtener la fecha mínima permitida (hoy)
  const getMinDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, "0");
    const day = String(today.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  // Consulta para obtener los datos del vehículo
  const {
    data: vehicle,
    isLoading: isLoadingVehicle,
    error: vehicleError,
  } = useQuery({
    queryKey: ["vehicle", vehicleId],
    queryFn: () => getVehicleById(vehicleId),
    enabled: !!vehicleId,
    retry: 3, // Intentar hasta 3 veces si falla
    staleTime: 1000 * 60 * 5, // Mantener los datos frescos durante 5 minutos
    refetchOnWindowFocus: false, // Evitar recargar al cambiar de ventana
  });

  // Consulta para obtener las sucursales
  const {
    data: sucursales,
    isLoading: isLoadingSucursales,
    error: sucursalesError,
  } = useQuery({
    queryKey: ["sucursales"],
    queryFn: getSucursales,
    retry: 3, // Intentar hasta 3 veces si falla
    staleTime: 1000 * 60 * 5, // Mantener los datos frescos durante 5 minutos
    refetchOnWindowFocus: false, // Evitar recargar al cambiar de ventana
  });

  // Mutación para crear la reserva
  const createReservationMutation = useMutation({
    mutationFn: createReservation,
    onSuccess: () => {
      Swal.fire("Éxito", "Reserva realizada con éxito.", "success");
      navigate("/vehicles"); // Redirigir a la lista de vehículos
    },
    onError: (error) => {
      console.error("Error al realizar la reserva:", error);
      Swal.fire("Error", "Error al realizar la reserva.", "error");
    },
  });

  // Mutación para actualizar el estado del vehículo
  const updateVehicleStatusMutation = useMutation({
    mutationFn: updateVehicleStatus,
    onSuccess: () => {
      console.log("Estado del vehículo actualizado correctamente.");
    },
    onError: (error) => {
      console.error("Error al actualizar el estado del vehículo:", error);
      Swal.fire(
        "Error",
        "No se pudo actualizar el estado del vehículo.",
        "error"
      );
    },
  });

  // Calcular los días de reserva basados en las fechas seleccionadas
  const calculateDays = () => {
    if (!startDate || !endDate) return 0;
    const diffTime = Math.abs(endDate.getTime() - startDate.getTime());
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1; // Incluye ambos días
  };

  const days = calculateDays();

  // Lógica para realizar la reserva
  const handleReservation = async () => {
    setLoading(true);
    try {
      const user = await getAuthenticatedUser(navigate); // Obtener usuario autenticado
      if (!user) {
        Swal.fire(
          "Inicia sesión",
          "Debes iniciar sesión para realizar una reserva.",
          "warning"
        );
        setLoading(false);
        return;
      }
      if (!selectedSucursal) {
        Swal.fire("Error", "Por favor, selecciona una sucursal.", "warning");
        setLoading(false);
        return;
      }
      const userId = user.id; // ID del usuario
      const vehicleIdInt = vehicle.id; // ID del vehículo

      // Formatear fechas (opcional, dependiendo del backend)
      const formatDate = (date) => date.toISOString().split(".")[0] + "Z";

      // Crear los datos de la reserva
      const reservation = {
        vehiculo: { id: vehicleIdInt }, // Enviar el objeto Vehiculo con el ID
        usuario: { id: userId }, // Enviar el objeto Usuario con el ID
        dias: days,
        total: vehicle.precio * days,
        fechaReserva: formatDate(startDate),
        fechaDevolucion: formatDate(endDate),
        sucursal: { id: parseInt(selectedSucursal, 10) }, // Enviar el objeto Sucursal con el ID
      };
      console.log("Datos de la reserva:", reservation); // Depuración

      // Crear la reserva
      await createReservationMutation.mutateAsync(reservation);

      // Actualizar el estado del vehículo a "Reservado"
      await updateVehicleStatusMutation.mutateAsync({
        id: vehicleIdInt,
        status: "Reservado",
      });
    } catch (error) {
      console.error("Error al realizar la reserva:", error);

      // Manejar errores específicos
      let errorMessage = "Error desconocido.";
      if (error.message === "No has iniciado sesión.") {
        errorMessage = "Debes iniciar sesión para realizar esta acción.";
      } else if (error.response?.status === 401) {
        // Si el token ha expirado o es inválido
        sessionStorage.removeItem("token"); // Limpiar la sesión
        sessionStorage.removeItem("user");

        errorMessage =
          "Tu sesión ha expirado. Por favor, inicia sesión nuevamente.";
        Swal.fire({
          icon: "warning",
          title: "Sesión expirada",
          text: errorMessage,
          showCancelButton: true,
          confirmButtonText: "Ir al login",
          cancelButtonText: "Cerrar",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/login"); // Redirigir al login
          }
        });
      } else if (error.response?.data?.message) {
        errorMessage = error.response.data.message; // Mensaje específico del backend
      } else if (error.message) {
        errorMessage = error.message; // Mensaje genérico del error
      }

      Swal.fire("Error", errorMessage, "error");
    }
    setLoading(false);
  };

  // Manejo de estados de carga y errores
  if (isLoadingVehicle || isLoadingSucursales) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (vehicleError || sucursalesError) {
    const errorMessage =
      vehicleError?.message ||
      sucursalesError?.message ||
      "Error desconocido al cargar los datos.";
    return (
      <div className="text-center py-10 text-xl text-red-600">
        Error al cargar los datos: {errorMessage}
      </div>
    );
  }

  return (
    <div>
      <Header />
      <div className="flex flex-col pt-28 pb-4 items-center justify-center min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Reservar Vehículo</h1>
        <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-4">
          {/* Imagen del vehículo */}
          <div className="text-center">
            <img
              className="w-full h-64 object-contain rounded-lg"
              src={vehicle.imagenUrl}
              alt={`${vehicle.marca} ${vehicle.modelo}`}
            />
          </div>

          {/* Detalles del vehículo */}
          <div className="text-lg">
            <p>
              <strong>Marca:</strong> {vehicle.marca}
            </p>
            <p>
              <strong>Modelo:</strong> {vehicle.modelo}
            </p>
            <p>
              <strong>Matrícula:</strong> {vehicle.matricula}
            </p>
            <p>
              <strong>Precio por día:</strong> S/ {vehicle.precio}
            </p>
          </div>

          {/* Fecha de inicio */}
          <div>
            <label
              htmlFor="startDate"
              className="block text-sm font-medium mb-2"
            >
              Fecha de inicio:
            </label>
            <input
              id="startDate"
              type="date"
              value={startDate.toISOString().split("T")[0]}
              onChange={(e) => setStartDate(new Date(e.target.value))}
              min={getMinDate()} // Restringir fechas pasadas
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Fecha de fin */}
          <div>
            <label htmlFor="endDate" className="block text-sm font-medium mb-2">
              Fecha de fin:
            </label>
            <input
              id="endDate"
              type="date"
              value={endDate.toISOString().split("T")[0]}
              onChange={(e) => setEndDate(new Date(e.target.value))}
              min={startDate.toISOString().split("T")[0]} // Fecha mínima es la fecha de inicio
              className="w-full border rounded px-3 py-2"
            />
          </div>

          {/* Selección de sucursal */}
          <div>
            <label
              htmlFor="sucursal"
              className="block text-sm font-medium mb-2"
            >
              Sucursal:
            </label>
            <select
              id="sucursal"
              value={selectedSucursal || ""}
              onChange={(e) => setSelectedSucursal(e.target.value)}
              className="w-full border rounded px-3 py-2"
            >
              <option value="">Selecciona una sucursal</option>
              {sucursales?.map((sucursal) => (
                <option key={sucursal.id} value={sucursal.id}>
                  {sucursal.nombreSucursal}
                </option>
              ))}
            </select>
          </div>

          {/* Total estimado */}
          <div className="text-lg">
            <p>
              <strong>Total estimado:</strong> S/ {vehicle.precio * days}
            </p>
          </div>

          {/* Botones */}
          <div className="flex gap-4">
            <button
              onClick={handleReservation}
              disabled={loading || days <= 0 || !selectedSucursal}
              className={`bg-blue-500 text-white px-6 py-2 rounded ${
                loading || days <= 0 || !selectedSucursal
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-blue-600"
              }`}
            >
              {loading ? "Reservando..." : "Confirmar"}
            </button>
            <button
              onClick={() => navigate(-1)}
              className="bg-gray-500 text-white px-6 py-2 rounded hover:bg-gray-600"
            >
              Cancelar
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ReservaVehiculo;
