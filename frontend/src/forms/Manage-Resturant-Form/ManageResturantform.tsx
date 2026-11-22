import { Form } from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DetailsSection from "./DetailsSection.tsx";
import { Separator } from "@/components/ui/separator";
import CuisinesSection from "./CuisinesSection.tsx";
import MenuSection from "./MenuSection.tsx";
import ImageSection from "./ImageSection.tsx";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { Restaurant } from "@/type";
import { useEffect } from "react";

const formSchema = z
  .object({
  restaurantName: z.string().trim().min(1, "Restaurant name is required"),

city: z.string().trim().min(1, "City is required"),

country: z.string().trim().min(1, "Country is required"),
deliveryPrice: z.coerce.number({
  error: "Delivery price must be a valid number",
}),
  estimatedDeliveryTime: z.coerce.number({
  error: "Estimated delivery time must be a valid number",
}),
    cuisines: z.array(z.string()).nonempty({
      message: "please select at least one item",
    }),
    menuItems: z.array(
      z.object({
        name: z.string().min(1, "name is required"),
        price: z.coerce.number().min(1, "price is required"),
      })
    ),
    imageUrl: z.string().optional(),
    imageFile: z.instanceof(File, { message: "image is required" }).optional(),
  })
  .refine((data) => data.imageUrl || data.imageFile, {
    message: "Either image URL or image File must be provided",
    path: ["imageFile"],
  });

type RestaurantFormInput = z.input<typeof formSchema>;
type RestaurantFormData = z.output<typeof formSchema>;

type Props = {
  restaurant: Restaurant | undefined;
  onSave: (formData: FormData) => void;
  isLoading: boolean;
};

const ManageRestaurantForm = ({ onSave, isLoading, restaurant }: Props) => {
const form = useForm<RestaurantFormInput, unknown, RestaurantFormData>({
  resolver: zodResolver(formSchema),
  defaultValues: {
      restaurantName: "",
    city: "",
    country: "",
    deliveryPrice: 0,
    estimatedDeliveryTime: 0,
    cuisines: [],
    menuItems: [{ name: "", price: 0 }],
    imageUrl: "",
  },
});

useEffect(() => {
  if (!restaurant) return;

  const updatedRestaurant = {
    restaurantName: restaurant.restaurantName ?? "",
    city: restaurant.city ?? "",
    country: restaurant.country ?? "",

    deliveryPrice: Number(
      ((restaurant.deliveryPrice ?? 0) / 100).toFixed(2)
    ),

    estimatedDeliveryTime: restaurant.estimatedDeliveryTime ?? 0,

    cuisines: restaurant.cuisines ?? [],

    menuItems: (restaurant.menuItems ?? []).map((item) => ({
      name: item.name ?? "",
      price: Number(((item.price ?? 0) / 100).toFixed(2)),
    })),

    imageUrl: restaurant.imageUrl ?? "",
  };

  form.reset(updatedRestaurant);
}, [restaurant, form]);

  const onSubmit = (formDataJson: RestaurantFormData) => {
    const formData = new FormData();

    formData.append("restaurantName", formDataJson.restaurantName);
    formData.append("city", formDataJson.city);
    formData.append("country", formDataJson.country);

    formData.append(
      "deliveryPrice",
      (formDataJson.deliveryPrice * 100).toString()
    );
    formData.append(
      "estimatedDeliveryTime",
      formDataJson.estimatedDeliveryTime.toString()
    );
    formDataJson.cuisines.forEach((cuisine, index) => {
      formData.append(`cuisines[${index}]`, cuisine);
    });
    formDataJson.menuItems.forEach((menuItem, index) => {
      formData.append(`menuItems[${index}][name]`, menuItem.name);
      formData.append(
        `menuItems[${index}][price]`,
        (menuItem.price * 100).toString()
      );
    });

    if (formDataJson.imageFile) {
      formData.append(`imageFile`, formDataJson.imageFile);
    }

    onSave(formData);
  };

  return (
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-8 p-10 rounded-lg"
      >
        <DetailsSection />
        <Separator />
        <CuisinesSection />
        <Separator />
        <MenuSection />
        <Separator />
        <ImageSection />
        {isLoading ? <LoadingButton/> : <Button type="submit"  className="py-4 px-3 bg-[#F4512C] py-4 px-3 rounded-md text-white cursor-pointer">Submit</Button>}
      </form>
    </Form>
   
  );
};

export default ManageRestaurantForm;