
import React from "react";
import Text from "./Text";
import ResturauntCards from "./ResturauntCards";
import { useGetAllRestaurants } from "@/api/RestaurantApi";

export default function Restaurants() {
  const { restaurants, isLoading, error } = useGetAllRestaurants();

  // Keep dummy data for other card properties
  const dummyRestaurants = [
    {
      rating: 4.8,
      title: "Luxury dining & comfortable stay",
      catagory: "Luxury",
      badgeTitle: "Popular",
    },
    {
      rating: 4.6,
      title: "Delicious food & premium rooms",
      catagory: "5 Star",
      badgeTitle: "Top Rated",
    },
    {
      rating: 4.7,
      title: "Fine dining & luxury experience",
      catagory: "Luxury",
      badgeTitle: "Featured",
    },
    {
      rating: 4.9,
      title: "Premium dining & relaxing stay",
      catagory: "Premium",
      badgeTitle: "Best Choice",
    },
  ];

  if (isLoading) {
    return <p className="text-center py-10">Loading restaurants...</p>;
  }

  if (error) {
    return <p className="text-center py-10">Failed to load restaurants.</p>;
  }

  return (
    <div className="flex flex-col py-18 px-4 md:px-16 lg:px-24 xl:px-32 w-full items-center justify-center">

      <Text
        heading="Popular Hotels"
        subheading="Discover the best hotels and restaurants around you."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-8">

        {restaurants?.map((restaurant, index) => {
          const dummy =
            dummyRestaurants[index % dummyRestaurants.length];

          return (
            <ResturauntCards
              key={restaurant._id}
               id={restaurant._id}
              // API DATA
              name={restaurant.restaurantName}
              timing={`${restaurant.estimatedDeliveryTime} mins`}
              image={restaurant.imageUrl}

              // DUMMY DATA
              rating={dummy.rating}
              title={dummy.title}
              catagory={dummy.catagory}
              badgeTitle={dummy.badgeTitle}
            />
          );
        })}

      </div>
    </div>
  );
}
