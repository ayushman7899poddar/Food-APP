const express = require("express");
const categoryModel = require("../models/categoryModel");

//function for create category:
const createCatController = async(req,res) =>{
    try {
        const {title, imageUrl} = req.body;

        //validation:
        if(!title)
        {
            return re.status(500).send({
                success:false,
                message:"Please provide category title or image",
            });
        }

        const newCategory = new categoryModel({title,imageUrl});

        await newCategory.save();
        
        console.log(newCategory);
    
        res.status(201).send({
            success:true,
            message:"category created",
            newCategory,
        });

    } catch (error) {
        console.log(error);
        res.status(201).send({
            success:false,
            message:"Error in create category API",
            error,
        });
    }
}

//function for get all category:
const getAllCatController = async(req,res) =>{
    try {
        const categories = await categoryModel.find({})
        if(!categories)
        {
            return res.status(404).send({
                success:false,
                message:"No Categories found"
            })
        }
        res.status(200).send({
            success:true,
            totalCat : categories.length,
            categories,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in get All Category API",
            error
        })
    }
}

//function for update the category:
const updateCatController = async(req,res) =>{
    try {
        const {id} = req.params;
        const {title,imageUrl} = req.body;

        const updateCategory = await categoryModel.findByIdAndUpdate(id, {title, imageUrl}, {new : true});

        if(!updateCategory){
            return res.status(500).send({
                success:false,
                message:"No Category Found",
            });
        }
        res.status(200).send({
            success:true,
            message:"Category Updated Successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in update category API",
            error,
        })
    }
}

//function for delete category:
const deleteCatController = async(req,res) =>{
    try {
        const {id} = req.params;
        if(!id){
            return res.status(500).send({
                success:false,
                message:"please provide category ID",
            });
        }

        const category = await categoryModel.findById(id);

        if(!category)
        {
            return res.status(500).send({
                success:false,
                message:"No Category Found with this id",
            });
        }

        await categoryModel.findByIdAndDelete(id);
        res.status(200).send({
            success:true,
            message:"Category deleted successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"error in delete category API",
            error,
        })
    }
}


module.exports = {createCatController,getAllCatController,updateCatController,deleteCatController};