
import type { Restaurant } from "@/type";
import { useAuth0 } from "@auth0/auth0-react";
import {
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import { toast } from "sonner";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// GET MY RESTAURANT
export const useGetMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyRestaurantRequest = async (): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to get restaurant");
    }

    return response.json();
  };

  const { data: restaurant, isLoading } = useQuery<
    Restaurant,
    Error
  >({
    queryKey: ["fetchMyRestaurant"],
    queryFn: getMyRestaurantRequest,
  });

  return { restaurant, isLoading };
};

// CREATE MY RESTAURANT
export const useCreateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const createMyRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to create restaurant");
    }

    return response.json();
  };

  const {
    mutate: createRestaurant,
    isPending: isLoading,
  } = useMutation<Restaurant, Error, FormData>({
    mutationFn: createMyRestaurantRequest,

    onSuccess: () => {
      toast.success("Restaurant created!");

      queryClient.invalidateQueries({
        queryKey: ["fetchMyRestaurant"],
      });
    },

    onError: () => {
      toast.error("Unable to create restaurant");
    },
  });

  return { createRestaurant, isLoading };
};

// UPDATE MY RESTAURANT
export const useUpdateMyRestaurant = () => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();

  const updateRestaurantRequest = async (
    restaurantFormData: FormData
  ): Promise<Restaurant> => {
    const accessToken = await getAccessTokenSilently();

    const response = await fetch(`${API_BASE_URL}/api/my/resturant`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      body: restaurantFormData,
    });

    if (!response.ok) {
      throw new Error("Failed to update restaurant");
    }

    return response.json();
  };

  const {
    mutate: updateRestaurant,
    isPending: isLoading,
  } = useMutation<Restaurant, Error, FormData>({
    mutationFn: updateRestaurantRequest,

    onSuccess: () => {
      toast.success("Restaurant updated!");

      queryClient.invalidateQueries({
        queryKey: ["fetchMyRestaurant"],
      });
    },

    onError: () => {
      toast.error("Unable to update restaurant");
    },
  });

  return { updateRestaurant, isLoading };
};

// // GET MY RESTAURANT ORDERS
// export const useGetMyRestaurantOrders = () => {
//   const { getAccessTokenSilently } = useAuth0();

//   const getMyRestaurantOrdersRequest = async (): Promise<Order[]> => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order`,
//       {
//         method: "GET",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch orders");
//     }

//     return response.json();
//   };

//   const { data: orders, isLoading } = useQuery<Order[], Error>({
//     queryKey: ["fetchMyRestaurantOrders"],
//     queryFn: getMyRestaurantOrdersRequest,
//   });

//   return { orders, isLoading };
// };

// // UPDATE ORDER STATUS
// type UpdateOrderStatusRequest = {
//   orderId: string;
//   status: string;
// };

// export const useUpdateMyRestaurantOrder = () => {
//   const { getAccessTokenSilently } = useAuth0();
//   const queryClient = useQueryClient();

//   const updateMyRestaurantOrder = async (
//     updateStatusOrderRequest: UpdateOrderStatusRequest
//   ) => {
//     const accessToken = await getAccessTokenSilently();

//     const response = await fetch(
//       `${API_BASE_URL}/api/my/restaurant/order/${updateStatusOrderRequest.orderId}/status`,
//       {
//         method: "PATCH",
//         headers: {
//           Authorization: `Bearer ${accessToken}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           status: updateStatusOrderRequest.status,
//         }),
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to update status");
//     }

//     return response.json();
//   };

//   const {
//     mutateAsync: updateRestaurantStatus,
//     isLoading,
//   } = useMutation({
//     mutationFn: updateMyRestaurantOrder,

//     onSuccess: () => {
//       toast.success("Order updated");

//       queryClient.invalidateQueries({
//         queryKey: ["fetchMyRestaurantOrders"],
//       });
//     },

//     onError: () => {
//       toast.error("Unable to update order");
//     },
//   });

//   return { updateRestaurantStatus, isLoading };
// };
