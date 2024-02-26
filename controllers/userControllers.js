const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
//for get the user data:
const getUserController = async(req,res) => {
    try {
        //find user:
        const user = await userModel.findById({_id:req.body.id});

        //validation:
        if(!user)
        {
            return res.status(404).send({
                success:false,
                message:"User Not Found",
            });
        }

        // hide apssword:
        // user.password = undefined;

        //send response:
        res.status(200).send({
            success:true,
            message:"User get Successfully",
            user,
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Get User API",
            error
        })
    }
}

//for update the user data:
const updateUserController = async(req,res) =>{
    try {
        //find user:
        const user = await userModel.findById({_id: req.body.id});

        //validation:
        if(!user)
        {
            return res.status(404).sned({
                success:false,
                message:"User Not found"
            });
        }

        //update user data:
        const {username,address,phone} = req.body;

        if(username){
            user.username = username; 
        }
        if(address){
            user.address = address;
        }
        if(user.phone){
            user.phone = phone;
        }
        //save user:
        await user.save();
        console.log(user);
        
        res.status(200).send({
            success:true,
            message:"User Updated Successfully"
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Updated User API",
            error,
        });
    }
};

// UPDATE USER PASSWORD:
const updatePasswordController = async (req, res) => {
    try {
      //find user
      const user = await userModel.findById({ _id: req.body.id });

      //valdiation
      if (!user) {
        return res.status(404).send({
          success: false,
          message: "Usre Not Found",
        });
      }
      // get data from user
      const { oldPassword, newPassword } = req.body;

      if (!oldPassword || !newPassword) 
      {
        return res.status(500).send({
          success: false,
          message: "Please Provide Old or New PasswOrd",
        });
      }

      //check user password  | compare password
      const isMatch = await bcrypt.compare(oldPassword, user.password);

      if (!isMatch) {
        return res.status(500).send({
          success: false,
          message: "Invalid old password",
        });
      }
      //hashing password
      var salt = bcrypt.genSaltSync(10);
      const hashedPassword = await bcrypt.hash(newPassword, salt);

      user.password = hashedPassword;

      await user.save();

      console.log(user);

      res.status(200).send({
        success: true,
        message: "Password Updated!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Error In Password Update API",
        error,
      });
    }
  };

  //RESET PASSWORD:
  const resetPasswordController = async(req,res) =>{
    try {
        const {email, newPassword, answer} = req.body;

        if(!email || !newPassword || !answer){
            return res.status(500).send({
                success:false,
                message:"Please Provide ALl fields"
            })
        }

        const user = await userModel.findOne({email,answer});

        if(!user)
        {
            return res.status(500).send({
                success:false,
                message:"User Not Found or Invalid answer"
            });
        }

        //hashing password:
        var salt = bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hash(newPassword,salt);

        user.password = hashedPassword;

        await user.save();

        res.status(200).send({
            success:true,
            message:"Password reset successfully",
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error in Password Reset API",
            error,
        })
    };
  }

  //DELETE PROFILE ACCOUNT:
const deleteProfileController = async(req,res) =>{
    try {
        const id = req.params.id;
        await userModel.findByIdAndDelete(id);

        return res.status(200).send({
            success:true,
            message:"Your account has been deleted",
        });
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success:false,
            message:"Error In Delete Profile API",
            error,
        });
    }
}



module.exports = {getUserController,updateUserController,updatePasswordController,resetPasswordController,deleteProfileController};