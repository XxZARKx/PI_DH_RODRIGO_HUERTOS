import React from "react";
import logo from "@assets/logo.svg";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div
      className="py-4 px-6 flex flex-col items-center justify-between w-full min-h-[10%]"
      style={{ backgroundColor: "#9C9C9C" }}
    >
      <nav className="w-full flex flex-col md:flex-row items-center justify-between">
        <div className="flex flex-col md:flex-row items-center justify-between w-full md:w-[30%]">
          <Link to={"/"} className="mb-4 md:mb-0">
            <img
              src={logo}
              alt="logo"
              className="w-24 h-24 object-cover cursor-pointer md:w-32 md:h-32"
            />
          </Link>
          <div className="flex flex-col items-center text-center">
            <h3 className="text-lg md:text-xl text-[#ffffff] pb-2 underline">
              Encuentranos en:
            </h3>
            <ul className="flex gap-4 justify-center text-2xl md:text-3xl text-[#ffffff]">
              <li>
                <a
                  href="https://facebook.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa-brands fa-facebook"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa-brands fa-x-twitter"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i
                    className="fa-brands fa-instagram"
                    style={{ color: "#ffffff" }}
                  ></i>
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-4 md:mt-0 text-[#ffffff] text-base md:text-lg">
          <Link to={"/politicaPrivacidad"}>
            <h3 className="cursor-pointer">Política de privacidad</h3>
          </Link>
          <Link to={"/terminosYcondiciones"}>
            <h3 className="cursor-pointer">Términos y condiciones</h3>
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default Footer;
