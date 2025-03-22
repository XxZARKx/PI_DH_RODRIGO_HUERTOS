import api from "../../../api/api";

export const createVehicle = async (vehicle) => {
  const formattedVehicle = {
    ...vehicle,
    cantidadPersonas: vehicle.cantidadpersonas,
    imagenUrl: vehicle.imagen_url,
    precio: Number(vehicle.precio),
    categorias: vehicle.categorias.map((id) => ({ id })), 
  };

  delete formattedVehicle.cantidadpersonas;
  delete formattedVehicle.imagen_url;

  try {
    const { data } = await api.post("/vehiculos", formattedVehicle);
    return true;
  } catch (error) {
    console.error("Error al crear el vehículo:", error.response?.data || error.message);
    return false;
  }
};