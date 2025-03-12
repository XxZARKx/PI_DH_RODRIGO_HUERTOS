import React from "react";
import { useQuery } from "@tanstack/react-query"; // Importa useQuery
import Header from "./Header";
import Banner from "./Banner";
import CardAuto from "./CardAuto";
import CarrouselColabs from "./CarrouselColabs";
import CustomizedAccordions from "./PreguntasAcordeon";
import Footer from "./Footer";
import { getVehicles } from "../provider/vehicle/getVehicles";

const Home = () => {
  const {
    data: vehicles,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["vehicles"],
    queryFn: getVehicles,
  });

  return (
    <div className="min-h-screen max-w-screen">
      <div className="max-h-screen h-full overflow-hidden mb-10">
        <Header />
        <Banner />
      </div>
      <section className="pb-10 text-xl font-bold">
        <h2 className="text-center pb-10">
          RESERVA AUTOS A LOS MEJORES PRECIOS
        </h2>
        <div className="">
          <ul className="flex flex-wrap justify-center max-w-1280 mx-auto gap-8">
            {isLoading ? (
              <li>Cargando vehículos...</li>
            ) : isError ? (
              <li>Error: {error.message}</li>
            ) : vehicles.length > 0 ? (
              vehicles.slice(0, 6).map((vehicle) => (
                <li
                  key={vehicle.id}
                  className="w-full sm:w-[48%] lg:w-[30%] max-w-[300px] flex-grow-0 flex-shrink-0"
                >
                  <CardAuto vehicle={vehicle} />
                </li>
              ))
            ) : (
              <li>No hay vehículos disponibles.</li> // Muestra un mensaje si no hay datos
            )}
          </ul>
        </div>
      </section>
      <section>
        <h2 className="text-center pt-20 font-bold text-xl">
          NUESTROS ALIADOS
        </h2>
        <CarrouselColabs />
      </section>
      <section>
        <h2 className="text-center pt-10 font-bold text-xl">
          PREGUNTAS FRECUENTES
        </h2>
        <div className="max-w-[80%] mx-auto py-10">
          <CustomizedAccordions />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Home;
