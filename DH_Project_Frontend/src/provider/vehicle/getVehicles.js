import api from "../../../api/api";

export const getVehicles = async () => {
	try {
	  const response = await api.get("/vehiculos");
	  return response.data;
	} catch (error) {
	  console.error("Error al obtener los vehículos:", error.response?.data || error.message);
	  throw error; // Lanza el error para que el componente lo maneje
	}
  };

  export const getAvailableVehicles = async (startDate, endDate, selectedBrand = "") => {
	try {
	  // Formatear las fechas correctamente
	  const formattedStartDate = startDate.toISOString().split(".")[0]; // Elimina los milisegundos y la Z
	  const formattedEndDate = endDate.toISOString().split(".")[0];
  
	  const response = await api.get("/vehiculos/disponibles", {
		params: {
		  fechaInicio: formattedStartDate,
		  fechaFin: formattedEndDate,
		  marca: selectedBrand || undefined, // Envía la marca solo si existe
		},
	  });
	  return response.data; // Retorna directamente los datos
	} catch (error) {
	  console.error("Error al obtener los vehículos disponibles:", error);
	  throw new Error("No se pudieron cargar los vehículos disponibles"); // Lanza un error para que el componente lo maneje
	}
  };