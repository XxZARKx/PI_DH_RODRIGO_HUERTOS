import React, { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAuthenticatedUser } from "../provider/user/getAuthUser";
import { getReservationsByUserId } from "../provider/reservation/getReservationUser";
import { getVehicleById } from "../provider/vehicle/getVehicleById";
// import { supabase } from "../../api/supabaseClient";
import Header from "./Header";
import Footer from "./Footer";
import Swal from "sweetalert2"; // Importa SweetAlert2

const MisReservas = () => {
  // const [userId, setUserId] = useState(null);
  // const [isDataLoaded, setIsDataLoaded] = useState(false); // Estado para controlar si los datos están completamente cargados
  // const queryClient = useQueryClient();
  // // Obtener el usuario autenticado
  // useEffect(() => {
  //   const fetchUser = async () => {
  //     try {
  //       const user = await getAuthenticatedUser();
  //       if (user) {
  //         setUserId(user.id); // Establecer el ID del usuario autenticado
  //       }
  //     } catch (error) {
  //       console.error("Error al obtener el usuario autenticado:", error);
  //     }
  //   };
  //   fetchUser();
  // }, []);
  // // Consultar las reservas del usuario autenticado
  // const {
  //   data: reservations,
  //   isLoading: loadingReservations,
  //   error: reservationsError,
  // } = useQuery({
  //   queryKey: ["reservations", userId],
  //   queryFn: () => getReservationsByUserId(userId),
  //   enabled: !!userId, // Activar la consulta solo si userId está disponible
  // });
  // // Consultar los datos de los vehículos relacionados con las reservas
  // const fetchVehicleData = async (reservations) => {
  //   const vehicleDataPromises = reservations.map((reservation) =>
  //     getVehicleById(reservation.vehiculo_id)
  //   );
  //   return Promise.all(vehicleDataPromises);
  // };
  // const {
  //   data: vehicles,
  //   isLoading: loadingVehicles,
  //   error: vehiclesError,
  // } = useQuery({
  //   queryKey: ["vehicles", reservations],
  //   queryFn: () => fetchVehicleData(reservations),
  //   enabled: !!reservations && reservations.length > 0,
  // });
  // // Función para cancelar la reserva
  // const cancelReservationMutation = useMutation({
  //   mutationFn: async (reservationId) => {
  //     // Eliminar la reserva
  //     await supabase.from("reserva").delete().eq("id", reservationId);
  //     // Cambiar el estado del vehículo a "Disponible"
  //     const reservation = reservations.find((res) => res.id === reservationId);
  //     await supabase
  //       .from("vehiculo")
  //       .update({ estado: "Disponible" })
  //       .eq("id", reservation.vehiculo_id);
  //     return reservationId;
  //   },
  //   onSuccess: (reservationId) => {
  //     queryClient.invalidateQueries(["reservations", userId]);
  //     Swal.fire({
  //       icon: "success",
  //       title: "Reserva cancelada",
  //       text: "La reserva se ha cancelado exitosamente.",
  //     });
  //   },
  //   onError: (error) => {
  //     Swal.fire({
  //       icon: "error",
  //       title: "Error",
  //       text: "Hubo un error al cancelar la reserva: " + error.message,
  //     });
  //   },
  // });
  // const handleCancelReservation = (reservationId) => {
  //   // Confirmación antes de cancelar
  //   Swal.fire({
  //     title: "¿Estás seguro?",
  //     text: "¿Quieres cancelar esta reserva?",
  //     icon: "warning",
  //     showCancelButton: true,
  //     confirmButtonText: "Sí, cancelar",
  //     cancelButtonText: "No, mantener reserva",
  //   }).then((result) => {
  //     if (result.isConfirmed) {
  //       cancelReservationMutation.mutate(reservationId);
  //     }
  //   });
  // };
  // // Verificar si todos los datos están cargados
  // useEffect(() => {
  //   if (
  //     !loadingReservations &&
  //     !loadingVehicles &&
  //     reservations !== undefined &&
  //     vehicles !== undefined
  //   ) {
  //     setIsDataLoaded(true); // Marcar como cargado cuando ambos datos estén listos
  //   }
  // }, [loadingReservations, loadingVehicles, reservations, vehicles]);
  // // Si los datos aún no están cargados, mostrar un mensaje de carga
  // if (!isDataLoaded) {
  //   return <div>Cargando reservas...</div>;
  // }
  // // Manejo de errores
  // if (reservationsError || vehiclesError) {
  //   return (
  //     <div>
  //       Error al cargar los datos:{" "}
  //       {reservationsError?.message || vehiclesError?.message}
  //     </div>
  //   );
  // }
  // // Si no hay reservas, mostrar el mensaje correspondiente
  // if (!reservations || reservations.length === 0) {
  //   return (
  //     <div className="min-h-screen flex flex-col justify-center items-center bg-gray-50">
  //       <div className="bg-white p-6 rounded-lg shadow-lg max-w-md text-center">
  //         <h2 className="text-xl font-semibold text-gray-700">
  //           No tienes reservas realizadas
  //         </h2>
  //         <p className="text-gray-500 mt-2">
  //           Actualmente no tienes ninguna reserva registrada. ¿Te gustaría hacer
  //           una nueva?
  //         </p>
  //         <div className="mt-4">
  //           <button
  //             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
  //             onClick={() => (window.location.href = "/vehicles")} // Cambia la URL por la correspondiente
  //           >
  //             Hacer una nueva reserva
  //           </button>
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }
  // // Renderizar las reservas
  // return (
  //   <div className="min-h-screen flex flex-col justify-between">
  //     <Header />
  //     <div className="container mx-auto p-6">
  //       <h1 className="text-2xl font-bold mb-4">Mis Reservas</h1>
  //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
  //         {reservations.map((reservation, index) => {
  //           const vehicle = vehicles[index];
  //           const fechaReserva = new Date(reservation.fecha_reserva);
  //           const fechaDevolucion = new Date(fechaReserva);
  //           fechaDevolucion.setDate(fechaReserva.getDate() + reservation.dias); // Calculamos la fecha de devolución
  //           return (
  //             <div
  //               key={reservation.id}
  //               className="border rounded-lg p-4 shadow-md bg-white"
  //             >
  //               <img
  //                 src={vehicle.imagen_url}
  //                 alt={`${vehicle.marca} ${vehicle.modelo}`}
  //                 className="w-full h-40 object-contain rounded-md mb-4"
  //               />
  //               <h2 className="text-lg font-bold mb-2">
  //                 {vehicle.marca} {vehicle.modelo}
  //               </h2>
  //               <p>
  //                 <strong>Matricula:</strong> {vehicle.matricula}
  //               </p>
  //               <p>
  //                 <strong>Categoría:</strong> {vehicle.categoria}
  //               </p>
  //               <p>
  //                 <strong>Días reservados:</strong> {reservation.dias}
  //               </p>
  //               <p>
  //                 <strong>Precio por día:</strong> S/ {vehicle.precio}
  //               </p>
  //               <p>
  //                 <strong>Total:</strong> S/ {reservation.total}
  //               </p>
  //               <p>
  //                 <strong>Fecha de reserva:</strong>{" "}
  //                 {fechaReserva.toLocaleDateString()}
  //               </p>
  //               <p>
  //                 <strong>Fecha de devolución:</strong>{" "}
  //                 {fechaDevolucion.toLocaleDateString()}
  //               </p>
  //               <button
  //                 onClick={() => handleCancelReservation(reservation.id)}
  //                 className="mt-4 bg-red-500 text-white px-4 py-2 rounded-lg"
  //               >
  //                 Cancelar Reserva
  //               </button>
  //             </div>
  //           );
  //         })}
  //       </div>
  //     </div>
  //     <Footer />
  //   </div>
  // );
};

export default MisReservas;
