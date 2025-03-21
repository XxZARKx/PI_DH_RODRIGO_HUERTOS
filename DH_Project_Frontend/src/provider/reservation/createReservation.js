import api from "../../../api/api";

export const createReservation = async (reservationData) => {
	const { data, error } = await api.post("/reservas", reservationData);
  
	if (error) {
	  throw new Error(error.message);
	}
  
	return data;
  };
