const userModel = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


// REGISTER
const registerController = async (req, res) => {
  try {
    const { username, email, password, phone, address,answer} = req.body;
    
    //validation
    if (!username || !email || !password || !address || !phone || !answer) 
    {
      return res.status(500).send({
        success: false,
        message: "Please Provide All Fields",
      });
    }

    // check user:
    const exisiting = await userModel.findOne({ email:email, password:password});
    if (exisiting) 
    {
      return res.status(500).send({
        success: false,
        message: "Email Already Registerd please Login",
      });
    }

    // hashing password:
    var salt = bcrypt.genSaltSync(10);
    // salt is used for number of times of encryption: 
    var hashPassword = await bcrypt.hash(password,salt);
    
    // create a new user:
    const user = await userModel.create({
      username,
      email,
      password : hashPassword,
      address,
      phone,
      answer, 
    });

    console.log(user);

    res.status(201).send({
      success: true,
      message: "Successfully Registered",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Error In Register API",
      error,
    });
  }
};

// LOGIN
const loginController = async (req, res) => 
{
    try {
        const {email, password} = req.body
        //validification:
        if(!email || !password)
        {
          return res.status(500).send({
            success:false,
            message:"Please Provide Email Or Password"
          })
        }

        //check user:
        const user = await userModel.findOne({email});

        if(!user)
        {
            return res.status(404).send({
              success:false,
              message:"user not found",
            });
        }

        // check user password || compare password:
        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch)
        {
          return res.status(500).send({
            success:false,
            message:"Invalid credentials",
          });
        }
      
        //for encrypt-> we use sign.
        //for decrypt-> we use verify.

        const token = jwt.sign({id: user._id},process.env.SECRET_KEY, {
          expiresIn:"7d",
        });

        console.log("token is : ",token);

        user.password = undefined;

        res.status(200).send({
          success:true,
          message:"Login Successfully",
          token,
          user,
        })

    } catch (error) {
      console.log(error);
      res.status(500).send({
        success:false,
        message:"Error in Login API",
        error
      })
    }
};

module.exports = { registerController, loginController};