
import {
  useCreateMyRestaurant,
  useGetMyRestaurant,
  useUpdateMyRestaurant,
} from "@/api/MyRestaurantApi";

import ManageRestaurantForm from "@/forms/Manage-Resturant-Form/ManageResturantform.tsx";

const ManageRestaurantPage = () => {
  const { createRestaurant, isLoading: isCreateLoading } =
    useCreateMyRestaurant();

  const { restaurant } = useGetMyRestaurant();

  const { updateRestaurant, isLoading: isUpdateLoading } =
    useUpdateMyRestaurant();

  const isEditing = !!restaurant;
const handleSave = async (formData: FormData): Promise<void> => {
  if (isEditing) {
    updateRestaurant(formData);
  } else {
    createRestaurant(formData);
  }
};

  return (
    <div className="px-4 md:px-15 lg:px-20 xl:px-25 pt-28 pb-10">
    <ManageRestaurantForm
      restaurant={restaurant}
      onSave={handleSave}
      isLoading={isCreateLoading || isUpdateLoading}
    
    />
      </div>
  );
};

export default ManageRestaurantPage;
