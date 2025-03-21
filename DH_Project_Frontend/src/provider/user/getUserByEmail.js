import api from "../../../api/api"; 

export const getUserByEmail = async (email) => {
	try {
		if (!email || email === "undefined") {
			throw new Error("El correo electrónico es inválido.");
		}

		const { data, error } = await api.get(`/usuario/email/${email}`);

		if (error) {
			throw new Error(error.message);
		}

		return data;
	} catch (err) {
		throw new Error(err.message);
	}
};
