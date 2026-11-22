
import type { Restaurant} from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

//get all the resturant

export const useGetAllRestaurants = () => {
     const { getAccessTokenSilently } = useAuth0();
  const getAllRestaurantsRequest = async (): Promise<Restaurant[]> => {
      const accessToken = await getAccessTokenSilently();
    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurants");
    }

    return response.json();
  };

  const {
    data: restaurants,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchAllRestaurants"],
    queryFn: getAllRestaurantsRequest,
  });

  return {
    restaurants,
    isLoading,
    error,
  };
};

//get returant by id 
export const useGetRestaurant = (restaurantId?: string) => {
  const getRestaurantByIdRequest = async (): Promise<Restaurant> => {
    const response = await fetch(
      `${API_BASE_URL}/api/my/resturant/${restaurantId}`
    );

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

const { data: restaurant, isLoading,error } = useQuery({
  queryKey: ["fetchRestaurant", restaurantId],
  queryFn: getRestaurantByIdRequest,
  enabled: !!restaurantId,
});

  return { restaurant, isLoading,  error, };
};
