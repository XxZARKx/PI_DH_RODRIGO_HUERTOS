import api from "../../../api/api";

export const getVehicleById = async (id) => {
  try {
    // Obtener los datos del vehículo
    const { data: vehicleData, error: vehicleError } = await api.get(`/vehiculos/${id}`);

    if (vehicleError) {
      throw new Error(vehicleError.message);
    }

    // Obtener todas las categorías disponibles
    const { data: allCategories, error: categoriesError } = await api.get("/categorias");

    if (categoriesError) {
      throw new Error(categoriesError.message);
    }

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
    console.error("Error al obtener el vehículo:", error);
    return null;
  }
};