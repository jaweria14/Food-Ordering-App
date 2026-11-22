
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";
import LoadingButton from "@/components/LoadingButton";
import { Button } from "@/components/ui/button";
import type { User } from "@/type";
import { useEffect } from "react";

const formSchema = z.object({
  email: z.string().optional(),
  name: z.string().trim().min(1, "Name is required"),
  addressLine1: z
    .string()
    .trim()
    .min(1, "Address Line 1 is required"),
  city: z.string().trim().min(1, "City is required"),
  country: z.string().trim().min(1, "Country is required"),
});

export type UserFormData = z.infer<typeof formSchema>;

type Props = {
  currentUser: User;
  onSave: (userProfileData: UserFormData) => void;
  isLoading: boolean;
  title?: string;
  buttonText?: string;
};

const UserProfileForm = ({
  onSave,
  isLoading,
  currentUser,
  title = "User Profile",
  buttonText = "Submit",
}: Props) => {
  const form = useForm<UserFormData>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      email: currentUser.email ?? "",
      name: currentUser.name ?? "",
      addressLine1: currentUser.addressLine1 ?? "",
      city: currentUser.city ?? "",
      country: currentUser.country ?? "",
    },
  });

  useEffect(() => {
    form.reset({
      email: currentUser.email ?? "",
      name: currentUser.name ?? "",
      addressLine1: currentUser.addressLine1 ?? "",
      city: currentUser.city ?? "",
      country: currentUser.country ?? "",
    });
  }, [currentUser, form]);

  return (
    
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSave)}
        noValidate
        className="mx-auto h-auto w-full max-w-3xl space-y-6 rounded-xl bg-gray-50 p-6 shadow-sm md:p-8"
      >
        <div>
          <h2 className="text-2xl font-bold">{title}</h2>

          <FormDescription>
            View and change your profile information here
          </FormDescription>
        </div>

        {/* Email Field */}
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">
                Email
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  disabled
                  className="h-12 border-gray-300 bg-gray-100 px-4"
                />
              </FormControl>
            </FormItem>
          )}
        />

        {/* Name Field */}
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel
                className={
                  fieldState.error
                    ? "text-red-500"
                    : "text-black"
                }
              >
                Name
              </FormLabel>

              <FormControl>
                <Input
                  {...field}
                  aria-invalid={!!fieldState.error}
                  className={`h-12 bg-white px-4 ${
                    fieldState.error
                      ? "border-red-500 focus-visible:ring-red-500"
                      : "border-gray-300"
                  }`}
                />
              </FormControl>

              <FormMessage className="text-red-500" />
            </FormItem>
          )}
        />

        {/* Address, City and Country */}
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Address Field */}
          <FormField
            control={form.control}
            name="addressLine1"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel
                  className={
                    fieldState.error
                      ? "text-red-500"
                      : "text-black"
                  }
                >
                  Address Line 1
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className={`h-12 bg-white px-4 ${
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* City Field */}
          <FormField
            control={form.control}
            name="city"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel
                  className={
                    fieldState.error
                      ? "text-red-500"
                      : "text-black"
                  }
                >
                  City
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className={`h-12 bg-white px-4 ${
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />

          {/* Country Field */}
          <FormField
            control={form.control}
            name="country"
            render={({ field, fieldState }) => (
              <FormItem className="flex-1">
                <FormLabel
                  className={
                    fieldState.error
                      ? "text-red-500"
                      : "text-black"
                  }
                >
                  Country
                </FormLabel>

                <FormControl>
                  <Input
                    {...field}
                    aria-invalid={!!fieldState.error}
                    className={`h-12 bg-white px-4 ${
                      fieldState.error
                        ? "border-red-500 focus-visible:ring-red-500"
                        : "border-gray-300"
                    }`}
                  />
                </FormControl>

                <FormMessage className="text-red-500" />
              </FormItem>
            )}
          />
        </div>

        {/* Submit Button */}
        {isLoading ? (
          <LoadingButton />
        ) : (
          <Button
            type="submit"
            className="bg-orange-500 px-8 py-5 font-bold text-white hover:bg-orange-600"
          >
            {buttonText}
          </Button>
        )}
      </form>
    </Form>
 
  );
};

export default UserProfileForm;
