import React from "react";
import Slider from "react-slick";
import socioImage from "@assets/colab1.svg";
import { colabsLogo } from "../utils/colabsLogo";

function CarrouselColabs() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4500,
    arrows: true,
    pauseOnHover: true,
    prevArrow: <div className="slick-prev custom-arrow md:block hidden" />,
    nextArrow: <div className="slick-next custom-arrow md:block hidden" />,
  };

  return (
    <div className="pX-[50px] mx-auto max-w-[500px]">
      <Slider {...settings}>
        {
          colabsLogo.map((colab) => (
            <div key={colab.id}>
              <img className="h-full w-full" src={colab.url} alt={colab.alt} />
            </div>
          ))
        }
      </Slider>
    </div>
  );
}

export default CarrouselColabs;
