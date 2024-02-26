const express = require("express");
const router = express.Router();

const authMiddleware = require("../middlewares/authMiddleware");
const {createCatController, getAllCatController, updateCatController, deleteCatController} = require("../controllers/categoryController");

//create category: || POST:
router.post("/create", authMiddleware,createCatController);

//get all category: || GET:
router.get("/getAll",getAllCatController);

//update category || PUT:
router.put("/update/:id",authMiddleware,updateCatController);

//Delete category || DELETE:
router.delete("/delete/:id", authMiddleware, deleteCatController);

module.exports = router;