import React from "react";
import { Link } from "react-router-dom";

type Props = {
  id:string,
  image: string;
  name: string;
  rating: number;
  timing: string;
  title: string;
  catagory: string;
  badgeTitle: string;
};

export default function ResturauntCards({
  id,
  image,
  name,
  rating,
  timing,
  title,
  catagory,
  badgeTitle,
}: Props) {
  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300 border border-gray-100 border-t-[3px] border-t-[#F4512C]">

      {/* Image */}
      <div className="relative">
        <img
          src={image}
          alt={name}
          className="w-full h-52 object-cover"
        />

        {/* Badge */}
        <span className="absolute top-3 left-3 bg-[#FFB703] text-white text-sm font-semibold px-3 py-1 rounded-full">
          {badgeTitle}
        </span>
      </div>

      {/* Content */}
      <div className="p-4">

        {/* Restaurant Name + Rating */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-bold text-[#1F2933]">
            {name}
          </h3>

          <span className="flex items-center gap-1 text-sm font-semibold text-[#F4512C]">
            ⭐ {rating}
          </span>
        </div>

        {/* Title */}
        <p className="text-[#6B7280] mt-2 text-sm">
          {title}
        </p>

        {/* Category + Timing */}
        <div className="flex items-center justify-between mt-4 text-sm">

          <span className="text-[#6B7280]">
            🍴 {catagory}
          </span>

          <span className="text-[#6B7280]">
            🕒 {timing}
          </span>

        </div>

        {/* Button */}
       <Link to={`/detail/${id}`}>
        <button className="w-full mt-5 bg-[#F4512C] hover:bg-[#d93f20] text-white font-semibold py-2.5 rounded-lg transition duration-300">
          View Restaurant
        </button>
        </Link>

      </div>
    </div>
  );
}