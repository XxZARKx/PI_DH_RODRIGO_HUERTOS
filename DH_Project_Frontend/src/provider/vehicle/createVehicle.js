import api from "../../../api/api";

export const createVehicle = async (vehicle) => {
  const formattedVehicle = {
    ...vehicle,
    cantidadPersonas: vehicle.cantidadpersonas, // Nombre correcto
    imagenUrl: vehicle.imagen_url, // Nombre correcto
    precio: Number(vehicle.precio), // Convertir a número
  };

  delete formattedVehicle.cantidadpersonas;
  delete formattedVehicle.imagen_url;

  try {
    const { data } = await api.post("/vehiculos", formattedVehicle);
    console.log("Vehículo creado con éxito:", data);
    return true;
  } catch (error) {
    console.error("Error al crear el vehículo:", error.response?.data || error.message);
    return false;
  }
};
