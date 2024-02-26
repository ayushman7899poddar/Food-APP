const express = require("express");
const foodModel = require("../models/foodModel");
const orderModel = require("../models/orderModel");

const createFoodController = async(req,res) =>{
    try {
        const {title,description,price,imageUrl,foodTags,category,code,isAvailable,restaurant,rating} = req.body;

        //validation:
        if(!title || !description || !price || !restaurant){
            return res.status(500).send({
                success:false,
                message:"Please Provide All fields",
            });
        }

        const newFood = new foodModel({
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating,
        });

        await newFood.save();
        console.log(newFood);

        res.status(201).send({
            success:true,
            message:"New Food Item Created",
            newFood,
        })

    } catch (error) {
        console.log(error),
        res.status(500).send({
            success:false,
            message:"Error in create food APi",
            error,
        })
    }
}

const getAllFoodsController = async(req,res) =>{
    try {
        const food = await foodModel.find({});

        if(!food)
        {
            return res.status(404).send({
                success:false,
                message:"no food items was found",
            });
        }
        res.status(200).send({
            success:true,
            totalCount:food.length,
            food
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get all food api",
            error,
        })
    }
}

const getFoodByIdcontroller = async(req,res) =>{
    try {
        const {id} = req.params;

        if(!id){
            return res.status(404).send({
                success:false,
                message:"Please Provide ID"
            });
        }
        const foodById = await foodModel.findById(id);

        if(!foodById){
            return res.status(404).send({
                success:false,
                message:"No food available with this id",
            });
        }
        res.status(200).send({
            success:true,
            message:"Foods are : ",
            foodById,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in get single food API",
            error,
        })
    }
}

//get food by restaurant:
const getFoodByResturantController = async (req, res) => {
    try {
      const resturantId = req.params.id;
      if (!resturantId) {
        return res.status(404).send({
          success: false,
          message: "please provide id",
        });
      }
      const food = await foodModal.find({ restaurant: resturantId });
      if (!food) {
        return res.status(404).send({
          success: false,
          message: "No Food Found with htis id",
        });
      }
      res.status(200).send({
        success: true,
        message: "food base on restuatrn",
        food,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In get SIngle Food API",
        error,
      });
    }
  }

const updateFoodController = async(req,res) =>{
    try {
        const foodId = req.params.id;
        if(!foodId)
        {
            return res.status(404).send({
                success:false,
                message:"No food ID was found",
            });
        }

        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No Food Found"
            })
        }
        const {
            title,
            description,
            price,
            imageUrl,
            foodTags,
            category,
            code,
            isAvailable,
            restaurant,
            rating
        } = req.body;

            const updateFood = await foodModel.findByIdAndUpdate(foodId, {title,
                description,
                price,
                imageUrl,
                foodTags,
                category,
                code,
                isAvailable,
                restaurant,
                rating}, {new:true});

                console.log(updateFood);

            res.status(200).send({
                success:true,
                message:"Food Item was Updated Succefully",
            });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Update unsuccessfull",
            error,
        })
    }
}

//delete food ||delete:
const deleteFoodController = async(req,res) =>{
    try {
        const foodId = req.params.id;
        if(!foodId){
            return res.status(404).find({
                success:false,
                message:"Provide food id",
            });
        }

        const food = await foodModel.findById(foodId);
        if(!food){
            return res.status(404).send({
                success:false,
                message:"No Food Found with this ID",
            });
        }

        const deleteFood = await foodModel.findByIdAndDelete(foodId);
        res.status(200).send({
            success:true,
            message:"Food Item Deleted Successfully",
        });  
    }

         catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete food API",
            error,
        });
    }
}

//place order function:
const placeOrderController = async(req,res) =>{
    try {
        const {cart,payment} = req.body;

        if(!cart){
            return res.status(500).send({
                success:false,
                message:"please food cart or payment method",
            });
        }

        let total = 0;
        //calculate total cart value:
        cart.map((i) => {
            total+=i.price;
        });

        const newOrder = new orderModel({
            foods:cart,
            payment : total,
            buyer:req.body.id,
        });

        await newOrder.save();

        console.log(newOrder);

        res.status(201).send({
            success:true,
            message:"order placed successfully",
            newOrder,   
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in place order API",
            error,
        })
    }
}

//function for order status:
const orderStatusController = async(req,res) =>{
    try {
        const orderId = req.params.id;

        if(!orderId){
            return res.status(404).send({
                success:false,
                message:"Please Provide valid order Id"
            });
        }

        const {status} = req.body;

        const order = await orderModel.findByIdAndUpdate(orderId, {status}, {new:true});

        res.status(200).send({
            success:true,
            message:"Order Status Updated"
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in order status API",
            error
        })
    }
}

module.exports = {createFoodController,getAllFoodsController,getFoodByIdcontroller,getFoodByResturantController,updateFoodController,deleteFoodController,placeOrderController,orderStatusController};