import api from "../../../api/api";

export const getVehicles = async () => {
	try {
	  const response = await api.get("/vehiculos");
	  return response.data;
	} catch (error) {
	  console.error("Error al obtener los vehículos:", error.response?.data || error.message);
  
	  // Propagar un mensaje específico basado en el error
	  if (error.response && error.response.status === 404) {
		throw new Error("No se encontraron vehículos.");
	  }
  
	  if (error.response && error.response.status >= 500) {
		throw new Error("Error en el servidor. Por favor, intenta nuevamente más tarde.");
	  }
  
	  throw new Error("Error desconocido al cargar los vehículos.");
	}
  };

  export const getAvailableVehicles = async (startDate, endDate, selectedBrand = "") => {
	try {
	  const formattedStartDate = startDate.toISOString().split(".")[0]; // Elimina los milisegundos
	  const formattedEndDate = endDate.toISOString().split(".")[0];
  
	  console.log("Fechas enviadas al backend:", { formattedStartDate, formattedEndDate });
  
	  const response = await api.get("/vehiculos/disponibles", {
		params: {
		  fechaInicio: formattedStartDate,
		  fechaFin: formattedEndDate,
		  marca: selectedBrand || undefined,
		},
	  });
	  return response.data;
	} catch (error) {
	  console.error("Error al obtener los vehículos disponibles:", error);
	  throw new Error("No se pudieron cargar los vehículos disponibles");
	}
  };