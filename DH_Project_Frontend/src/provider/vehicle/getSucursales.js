import api from "../../../api/api";

export const getSucursales = async () => {
    const { data, error } = await api.get("/sucursales");
  
    if (error) {
      throw new Error(error.message);
    }
  
    return data;
  };