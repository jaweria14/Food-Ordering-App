
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import type { User } from "@/type";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Decode JWT payload safely
const decodeTokenPayload = (accessToken: string) => {
  const tokenParts = accessToken.split(".");
  const payload = tokenParts[1];

  if (!payload) {
    throw new Error("Invalid access token");
  }

  const base64 = payload.replace(/-/g, "+").replace(/_/g, "/");
  const decodedPayload = atob(base64);

  return JSON.parse(decodedPayload);
};

// Get current user
export const useGetMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const getMyUserRequest = async (): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    return response.json();
  };

  const {
    data: currentUser,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["fetchCurrentUser"],
    queryFn: getMyUserRequest,
  });

  if (error) {
    toast.error(error.message);
  }

  return { currentUser, isLoading };
};

// Create user request type
type CreateUserRequest = {
  auth0Id: string;
  email: string;
  name: string;
};

// Create current user
export const useCreateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const createMyUserRequest = async (user: CreateUserRequest) => {
    const audience = import.meta.env.VITE_AUTH0_AUDIENCE;

    const accessToken = await getAccessTokenSilently({
      authorizationParams: {
        audience,
      },
    });

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const payload = decodeTokenPayload(accessToken);

    console.log("Token audience:", payload.aud);
    console.log("Token issuer:", payload.iss);
    console.log("Requested audience:", audience);

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const responseData = await response.text();

    console.log("API status:", response.status);
    console.log("API response:", responseData);

    if (!response.ok) {
      throw new Error(responseData || "Failed to create user");
    }

    return responseData;
  };

  const {
    mutateAsync: createUser,
    isPending: isLoading,
    isError,
    isSuccess,
  } = useMutation({
    mutationFn: createMyUserRequest,
  });

  return {
    createUser,
    isLoading,
    isError,
    isSuccess,
  };
};

// Update user request type
type UpdateMyUserRequest = {
  name: string;
  addressLine1: string;
  city: string;
  country: string;
};

// Update current user
export const useUpdateMyUser = () => {
  const { getAccessTokenSilently } = useAuth0();

  const updateMyUserRequest = async (
    formData: UpdateMyUserRequest
  ): Promise<User> => {
    const accessToken = await getAccessTokenSilently();

    if (!accessToken) {
      throw new Error("Access token is missing");
    }

    const response = await fetch(`${API_BASE_URL}/api/my/user`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (!response.ok) {
      throw new Error("Failed to update user");
    }

    return response.json();
  };

  const {
    mutateAsync: updateUser,
    isPending: isLoading,
    isSuccess,
    error,
    reset,
  } = useMutation({
    mutationFn: updateMyUserRequest,
  });

  if (isSuccess) {
    toast.success("User profile updated!");
  }

  if (error) {
    toast.error(error.message);
    reset();
  }

  return { updateUser, isLoading };
};
