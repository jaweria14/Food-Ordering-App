
import Text from "./Text";
import CatagoryCard from "./CatagoryCard";

import Burger from "../assets/freepalestine_loverespect-burger-10287306_1920.jpg";
import Pizza from "../assets/ragabz-pizza-6156566_1920.jpg";
import Salad from "../assets/u_fjkzu3t8rd-salad-7726869.jpg";
import Dessert from "../assets/pexels-cake-1284548.jpg";

export default function Categories() {

  const categories = [
    {
      title: "Burgers",
      image: Burger,
    },
    {
      title: "Pizza",
      image: Pizza,
    },
    {
      title: "Salad",
      image: Salad,
    },
    {
      title: "Dessert",
      image: Dessert,
    },
  ];

  return (
    <div className="flex flex-col py-18  px-4 md:px-16 lg:px-24 xl:px-32 w-full items-center justify-center bg-white">

      <Text
        heading="Popular Categories"
        subheading="Discover delicious food from popular categories."
      />

      {/* Category Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">

        {categories.map((category, index) => (
          <CatagoryCard
            key={index}
            image={category.image}
            title={category.title}
          />
        ))}

      </div>

    </div>
  );
}