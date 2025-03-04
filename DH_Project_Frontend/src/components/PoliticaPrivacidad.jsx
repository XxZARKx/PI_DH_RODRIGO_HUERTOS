import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const PoliticaPrivacidad = () => {
  return (
    <div className="bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-12 sm:py-16">
        <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-md p-6 sm:p-8">
          <h1 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-6">
            Política de Privacidad
          </h1>

          <div className="space-y-8">
            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                1. Información que recopilamos
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Recopilamos la siguiente información personal cuando utilizas
                nuestro sitio web o servicios:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 text-sm sm:text-base">
                <li>
                  Nombre, dirección de correo electrónico y número de teléfono.
                </li>
                <li>
                  Información de pago, incluyendo detalles de tarjetas de
                  crédito o débito.
                </li>
                <li>
                  Información relacionada con tus reservas, como la fecha y el
                  vehículo alquilado.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                2. Uso de la información
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Utilizamos tu información personal para:
              </p>
              <ul className="list-disc pl-6 mt-2 space-y-1 text-gray-600 text-sm sm:text-base">
                <li>Procesar y gestionar tus reservas.</li>
                <li>Enviarte actualizaciones sobre tu reserva.</li>
                <li>
                  Mejorar nuestros servicios y realizar análisis internos.
                </li>
                <li>Cumplir con nuestras obligaciones legales.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                3. Protección de la información
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Tomamos medidas de seguridad para proteger tu información
                personal. Usamos cifrado SSL para garantizar que tus datos estén
                protegidos durante la transmisión.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                4. Compartir información
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                No compartimos tu información personal con terceros, excepto
                cuando sea necesario para procesar pagos o cumplir con la ley.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                5. Tus derechos
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Tienes derecho a acceder, corregir o eliminar la información
                personal que tenemos sobre ti. Si deseas ejercer estos derechos,
                por favor contáctanos a través de nuestro correo electrónico.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                6. Cookies
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Utilizamos cookies para mejorar tu experiencia en nuestro sitio
                web. Las cookies nos permiten reconocer tu navegador y recopilar
                información sobre el uso de nuestro sitio.
              </p>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-semibold text-gray-700 mb-3">
                7. Cambios en la Política de Privacidad
              </h2>
              <p className="text-gray-600 text-sm sm:text-base">
                Podemos actualizar esta política ocasionalmente. Te
                notificaremos cualquier cambio publicando la versión actualizada
                en este sitio.
              </p>
            </section>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default PoliticaPrivacidad;
