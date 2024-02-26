const restaurantModel = require("../models/restaurantModel");

//create restaurant:
const createRestaurantContoller = async(req,res) =>{
   try {
    const {title,imageUrl,foods,time,pickup,delivery,isOpen,logo,logUrl,rating,ratingCOunt,code,coords} = req.body;

    //validation:
    if(!title || !coords)
    {
        return res.status(500).send({
            success:false,
            message:"Please Provide title and address",
        });
    }

    const newRestaurant = new restaurantModel({
        title,imageUrl,foods,time,pickup,delivery,isOpen,logo,logUrl,rating,ratingCOunt,code,coords
    });

    await newRestaurant.save();
    
    console.log(newRestaurant);

    res.status(201).send({
        success:true,
        message:"New Restaurant created successfully",
    })

   } catch (error) {
     console.log(error);
     res.status(500).send({
        success:false,
        message:"Error in create Restaurant API",
        error,
     });
   }
}

//function for get all restaurants:
const getAllRestaurantController = async(req,res) =>{
    try {
        const restaurants = await restaurantModel.find({});

        if(!restaurants)
        {
            return res.status(404).send({
                success:false,
                message:"No Restaurant Available",
            });
        }

        console.log(restaurants);
        res.status(200).send({
            success:true,
            message:"Available Restaurants are",
            totalCount: restaurants.length,
            restaurants,
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Get All Restaurant API",
            error,
        })
    }
}

//function for get a single Restaurant By id:
const getRestaurantByIdController = async(req,res) =>{
    try {
        const restaurantId = req.params.id;
        if(!restaurantId)
        {
            return res.status(404).send({
                success:false,
                message:"Please Provide Restaurant ID",
            });
        }
        //find restaurant:
        const restaurant = await restaurantModel.findById(restaurantId);

        if(!restaurant)
        {
            return res.status(404).send({
                success:false,
                message:"No Restaurant Found",
            });
        }

        console.log(restaurant);

        res.status(200).send({
            success:true,
            restaurant
        })

    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get Restaurant By Id API",error
        });
    }
}

//function for delete the restaurant:
const deleteRestaurantController = async(req,res) =>{
    try {
        const restaurantId = req.params.id;

        if(!restaurantId)
        {
            return res.status(404).send({
                success:false,
                message:"No Restaurant Found OR Provide Restaurant ID"
            });
        }

        const restaurantData = await restaurantModel.findByIdAndDelete(restaurantId);

        res.status(200).send({
            success:true,
            message:"Restaurant Deleted Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in delete Restaurant API",
            error
        });
    }
}


module.exports = {createRestaurantContoller,getAllRestaurantController,getRestaurantByIdController,deleteRestaurantController};