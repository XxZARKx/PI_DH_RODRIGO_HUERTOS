import React from "react";
import Header from "./Header";
import Footer from "./Footer";

const TerminosYCondiciones = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
            Términos y Condiciones
          </h1>
          <p className="text-gray-600 text-sm sm:text-base text-center mb-8">
            Última actualización: 5 de febrero de 2025
          </p>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                1. Aceptación de los términos
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Al utilizar nuestro sitio web y realizar una reserva, aceptas
                estos Términos y Condiciones. Si no estás de acuerdo con alguna
                parte de estos términos, no debes utilizar nuestros servicios.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                2. Requisitos para alquilar un vehículo
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Para alquilar un vehículo con AutoRent Peru, debes ser mayor de
                edad y poseer una licencia de conducir válida. El alquiler de
                vehículos está sujeto a disponibilidad y confirmación por parte
                de nuestro equipo.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                3. Tarifas y pagos
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Los precios de los vehículos de alquiler son indicados en
                nuestro sitio web y pueden estar sujetos a cambios. Los pagos
                deben realizarse en su totalidad al momento de la reserva o en
                el punto de entrega del vehículo.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                4. Cancelaciones
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Puedes cancelar tu reserva con un mínimo de 24 horas de
                antelación para obtener un reembolso completo. Las cancelaciones
                realizadas después de este plazo pueden estar sujetas a cargos
                adicionales.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                5. Responsabilidad del cliente
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                El cliente es responsable de la conducción segura del vehículo
                durante el alquiler. Cualquier daño al vehículo durante el
                alquiler será responsabilidad del cliente y se le cobrará por
                los costos asociados.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                6. Seguro
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                El alquiler de vehículos incluye un seguro básico, pero se
                recomienda contratar un seguro adicional para cobertura completa
                en caso de accidentes o daños.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                7. Uso del sitio web
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Te comprometes a usar nuestro sitio web únicamente para fines
                legales y de acuerdo con las leyes locales, nacionales e
                internacionales aplicables.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                8. Modificación de los Términos y Condiciones
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Nos reservamos el derecho de modificar estos Términos y
                Condiciones en cualquier momento. Cualquier cambio será
                publicado en esta página y entrará en vigencia inmediatamente.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                9. Limitación de responsabilidad
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                No nos hacemos responsables de ningún daño o pérdida que pueda
                surgir del uso de nuestros servicios o del sitio web,
                incluyendo, pero no limitado a, daños directos, indirectos,
                incidentales, especiales o consecuentes.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TerminosYCondiciones;
