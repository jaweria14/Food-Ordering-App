import express from "express";
import { param } from "express-validator";
import multer from "multer";
import MyRestaurantController from "../controllers/MyResturantController.ts";
import ResturantController from "../controllers/ResturantController.ts";
import { jwtCheck, jwtParse } from "../middleware/auth.ts";
import { validateMyRestaurantRequest } from "../middleware/validation.ts";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage, 
  limits: {
    fileSize: 5 * 1024 * 1024, //5mb
  },
});

// router.get(
//   "/order",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.getMyRestaurantOrders
// );

// router.patch(
//   "/order/:orderId/status",
//   jwtCheck,
//   jwtParse,
//   MyRestaurantController.updateOrderStatus
// );


 //get all resrurant 
 router.get("/", jwtCheck, jwtParse, ResturantController.getAllRestaurants);

//get resturant by id 

router.get(
  "/:restaurantId",
  param("restaurantId")
    .isString()
    .trim()
    .notEmpty()
    .withMessage("RestaurantId paramenter must be a valid string"),
  ResturantController.getRestaurantById
);
router.post(
  "/",
    jwtCheck,
  jwtParse,
  upload.single("imageFile"),
   validateMyRestaurantRequest,
  MyRestaurantController.createMyRestaurant
);


router.put(
  "/",
  jwtCheck,
  jwtParse,
  upload.single("imageFile"),
  validateMyRestaurantRequest,
  MyRestaurantController.updateMyRestaurant
);

export default router;