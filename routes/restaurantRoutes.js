const express = require("express");

const authMiddleware = require("../middlewares/authMiddleware");

const {createRestaurantContoller,getAllRestaurantController, getRestaurantByIdController, deleteRestaurantController} = require("../controllers/restaurantController");

const router = express.Router();

//create restaurant || POST:
router.post("/create",authMiddleware,createRestaurantContoller);

//Get All Restaurant || GET:
router.get("/getAll",getAllRestaurantController);

//Get Restaurant by Id || GET:
router.get("/get/:id",getRestaurantByIdController);

//Delete Restaurant || delete:
router.delete("/delete/:id",authMiddleware,deleteRestaurantController);

module.exports = router;