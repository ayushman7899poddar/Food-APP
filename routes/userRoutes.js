const express = require("express");

const {getUserController, updateUserController, updatePasswordController, resetPasswordController, deleteProfileController} = require("../controllers/userControllers");

const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router(); 

//get user:
router.get("/getUser",authMiddleware,getUserController);

//update user data:
router.put("/updateUser",authMiddleware,updateUserController);

//password update:
router.post("/updatePassword", authMiddleware, updatePasswordController);

//Reset password:
router.post("/resetPassword",authMiddleware,resetPasswordController);

//Delete user:
router.delete("/deleteUser/:id",authMiddleware,deleteProfileController)


module.exports = router; 