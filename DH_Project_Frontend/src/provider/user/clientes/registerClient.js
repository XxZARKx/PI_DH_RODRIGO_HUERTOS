import { supabase } from "../../../../api/supabaseClient";

export const registerClient = async (clientData) => {
	const { nombre, apellido, dni, correo, contraseña, tipo } = clientData;

	const { data: existingUser, error: checkError } = await supabase
		.from("usuario")
		.select("correo")
		.eq("correo", correo);

	if (checkError) {
		console.error("Error al verificar el correo:", checkError);
		return { success: false, message: checkError.message || checkError };
	}

	if (existingUser.length > 0) {
		return { success: false, message: "El correo ya está registrado." };
	}

	// Si el correo no está registrado, proceder con el registro
	const { user, error: authError } = await supabase.auth.signUp({
		email: correo,
		password: contraseña,
		options: {
			data: {
				nombre,
				apellido,
				tipo,
			},
		},
	});

	if (authError) {
		console.error("Error al registrar el cliente:", authError);
		return { success: false, message: authError.message || authError };
	}

	// Insertar los datos adicionales del cliente en la tabla 'usuario'
	const { data, error } = await supabase.from("usuario").insert([
		{
			nombre,
			apellido,
			dni,
			correo,
			contraseña,
			tipo,
		},
	]);

	if (error) {
		console.error("Error al insertar datos en la base de datos:", error);
		return { success: false, message: error.message || error };
	}

	console.log("Cliente registrado con éxito:", data);
	return {
		success: true,
		message:
			"Cliente registrado con éxito. Revisa tu correo para confirmar la cuenta.",
	};
};
