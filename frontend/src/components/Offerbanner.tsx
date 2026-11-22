
import React from "react";
import banner from "../assets/wide_clean_graphic_promotional_banner_background.png";

export default function Offerbanner() {
  return (
    <div
      className="min-h-130 relative w-full bg-cover bg-center bg-no-repeat px-4 md:px-16 lg:px-24 xl:px-32 flex items-center overflow-hidden"
      style={{ backgroundImage: `url(${banner})` }}
    >
      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/25"></div>

      {/* Content */}
      <div className="relative z-10">
       

        <h1 className="w-full max-w-[480px]  text-3xl sm:text-4xl md:text-5xl lg:text-5xl pt-8 pb-2 font-extrabold text-white">
        <span className="text-[#F4512C]">20% Off</span> Your First Order!
        </h1>

        <p className="w-full max-w-[470px] text-base sm:text-lg md:text-xl text-white">
          Craving something delicious? Your first meal is on us—well, 20% of it.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-7">
          {/* Explore Food */}
          <button className="bg-[#F4512C] hover:bg-[#d93f20] text-white font-semibold px-6 py-3 rounded-md transition duration-300">
            Get the Offer
          </button>


        </div>
      </div>
    </div>
  );
}

