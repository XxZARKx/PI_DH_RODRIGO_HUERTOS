import React from "react";
import bgImage from "@assets/banner.jpg";

const Banner = () => {
  return (
    <div className="w-full h-[25vh] sm:h-[30vh] md:h-[40vh] lg:h-[40vh] 1100px:h-[60vh] xl:h-screen relative">
      <img
        src={bgImage}
        alt="Banner"
        className="absolute top-0 left-0 w-full h-full object-fill"
      />
    </div>
  );
};

export default Banner;
