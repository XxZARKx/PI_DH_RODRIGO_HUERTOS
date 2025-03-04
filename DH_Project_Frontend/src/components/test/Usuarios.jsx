// Ejemplo: Listar usuarios
import React, { useEffect, useState } from "react";
import api from "../../../api/api";

const Usuarios = () => {
  const [vehiculos, setVehiculos] = useState([]);

  useEffect(() => {
    api
      .get("/vehiculos")
      .then((response) => setVehiculos(response.data))
      .catch((error) => console.error(error));
  }, []);

  return (
    <div>
      <h2>vehiculos</h2>
      <ul>
        {vehiculos.map((u) => (
          <li key={u.id}>
            {u.marca} {u.modelo}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Usuarios;
