import React from "react";
import HeroVideo from "../assets/307837.mp4";

export default function Hero() {
  return (
    <div className="min-h-screen relative px-4 md:px-16 lg:px-24 xl:px-32 flex w-full items-center overflow-hidden">

      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        src={HeroVideo}
        autoPlay
        loop
        muted
        playsInline
      />

      {/* Dark Overlay */}
      <div className="absolute top-0 left-0 w-full h-full bg-black/40"></div>

      {/* Content */}
      <div className="relative z-10">

        <h5 className="inline-block text-sm bg-[#F4512C] text-white px-3 py-2 rounded-full">
          Get <span className="font-bold">20%</span> Off On The First Order
        </h5>

        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-5xl pt-8 pb-2 font-bold text-white">
          Satisfy Your Cravings
        </h1>

        <p className="w-full max-w-[480px] text-base sm:text-lg md:text-xl text-white">
          From quick bites to unforgettable meals, discover delicious food
          from the best restaurants around you.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-7">

          {/* Explore Food */}
          <button className="bg-[#F4512C] hover:bg-[#d93f20] text-white font-semibold px-6 py-2 rounded-md transition duration-300">
            Explore Food
          </button>

          {/* Find Restaurants */}
          <button className="border-2 border-white text-white hover:bg-white hover:text-black font-semibold px-6 py-2 rounded-md transition duration-300">
            Find Restaurants
          </button>

        </div>

      </div>

    </div>
  );
}