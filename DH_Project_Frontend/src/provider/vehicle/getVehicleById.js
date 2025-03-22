import api from "../../../api/api";

export const getVehicleById = async (id) => {
  try {
    // Obtener los datos del vehículo
    const vehicleResponse = await api.get(`/vehiculos/${id}`);
    if (!vehicleResponse.data) {
      throw new Error("No se encontraron datos del vehículo.");
    }

    // Obtener todas las categorías disponibles
    const categoriesResponse = await api.get("/categorias");
    if (!categoriesResponse.data) {
      throw new Error("No se pudieron cargar las categorías.");
    }

    const vehicleData = vehicleResponse.data;
    const allCategories = categoriesResponse.data;

    // Filtrar las categorías usando los IDs del vehículo
    if (vehicleData.categoriaIds && vehicleData.categoriaIds.length > 0) {
      vehicleData.categorias = allCategories.filter((cat) =>
        vehicleData.categoriaIds.includes(cat.id)
      );
    } else {
      vehicleData.categorias = []; // Si no hay categorías, asignar un array vacío
    }

    return vehicleData;
  } catch (error) {
    console.error("Error al obtener el vehículo:", error.message || error);
    throw new Error(error.response?.data?.message || "Error desconocido al obtener el vehículo.");
  }
};