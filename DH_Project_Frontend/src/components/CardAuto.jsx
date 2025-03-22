import React from "react";
import Tooltip from "@mui/material/Tooltip";
import { Link } from "react-router-dom";

const CardAuto = ({ vehicle }) => {
  return (
    <div className="w-full bg-[#ffffff] h-full border-solid border flex flex-col items-center justify-between p-5 rounded-2xl cardAuto transition-all ease-in-out duration-[.7s]">
      <img
        className="w-[50%] h-[80px] object-fill"
        src={vehicle.imagenUrl}
        alt={vehicle.marca}
      />
      <p className="py-2">{vehicle.marca}</p>
      <div className="flex flex-wrap justify-between w-[80%] text-base gap-x-10 gap-y-4 py-4">
        <Tooltip title={"Cantidad de personas"}>
          <p className="flex items-center gap-x-2 w-[20%]">
            <i className="fa-solid fa-user" />
            {vehicle.cantidadPersonas}
          </p>
        </Tooltip>
        <Tooltip title={"Puertas"}>
          <p className="flex items-center gap-x-2 w-[20%]">
            <i className="fa-solid fa-door-closed" />
            {vehicle.puertas}
          </p>
        </Tooltip>
        <Tooltip title={"Cantidad de equipaje"}>
          <p className="flex items-center gap-x-2 w-[20%]">
            <i className="fa-solid fa-suitcase" />
            {vehicle.equipaje}
          </p>
        </Tooltip>
      </div>
      <div className="flex w-full justify-between mt-2 items-center">
        <p className="text-xs">S/{vehicle.precio} /dia</p>
        <Link to={`/vehicles/${vehicle.id}`}>
          <button className="text-xs text-[#ffffff] bg-[#566C85] py-2 px-4 rounded-3xl">
            Ver detalles
          </button>
        </Link>
      </div>
    </div>
  );
};

export default CardAuto;
