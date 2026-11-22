import { Request, Response } from "express";
import Restaurant from "../model/resturants.ts";
import { v2 as cloudinary } from "cloudinary";
import mongoose from "mongoose";

//get all resturant 
const getAllRestaurants = async (req: Request, res: Response) => {
  try {
    const restaurants = await Restaurant.find();

    if (restaurants.length === 0) {
      return res.status(404).json({
        message: "Restaurants not found",
      });
    }

    return res.status(200).json(restaurants);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
}; 

//get resturant by id 
const getRestaurantById = async (req: Request, res: Response) => {
  try {
    const restaurantId = req.params.restaurantId;

  if (typeof restaurantId !== "string") {
  return res.status(400).json({
    message: "Invalid restaurant ID",
  });
}

    const restaurant = await Restaurant.findById(restaurantId);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    return res.status(200).json(restaurant);
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export default {
    getAllRestaurants,
  getRestaurantById,
};