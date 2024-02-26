const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");
const {createFoodController,getAllFoodsController, getFoodByIdcontroller, getFoodByResturantController, updateFoodController, deleteFoodController, placeOrderController, orderStatusController} = require("../controllers/foodController");
const adminMiddleware = require("../middlewares/adminMiddleware");

const router = express.Router();

//create food || POST:
router.post("/create",authMiddleware,createFoodController);

//get all foods || GET:
router.get("/getAll", getAllFoodsController);

//get single food by id: ||GET:
router.get("/get/:id", getFoodByIdcontroller);

//get food by restaurant || GET:
router.get("/getByRestaurant/:id",getFoodByResturantController );

//update food ||PUT:
router.put("/update/:id",authMiddleware,updateFoodController);

//delete food || DELETE:
router.delete("/delete/:id",authMiddleware,deleteFoodController);

//place order
router.post("/placeOrder",authMiddleware,placeOrderController);

//order status: || POST:
router.post("/orderStatus/:id",authMiddleware,adminMiddleware,orderStatusController);

module.exports = router;