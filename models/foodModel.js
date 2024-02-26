const mongoose = require("mongoose");

const foodSchema = new mongoose.Schema({
    title:{
        type:String,
        required: [true,"Food Title is required"],
    },
    description:{
        type:String,
        required:[true, "Food description is required"],
    },
    price:{
        type:Number,
        required:[true, "Food price is required"]
    },
    imageUrl:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.AuiIAi2xX18p_aBllb_nkwHaH_&pid=Api&P=0&h=220"
    },
    foodTags:{
        type:String,
    },
    category:{
        type:String,
    },
    code:{
        type:String,
    },
    isAvailable:{
        type:Boolean,
        default:true
    },
    restaurant:{
        type:mongoose.Schema.ObjectId,
        ref:"Restaurant"
    },
    rating:{
        type:Number,
        default:5,
        min:1,
        max:5,
    },
    ratingCount:{
        type:String,
    }
},
    {timestamps:true}
);

//export the collection:
module.exports = mongoose.model("Food",foodSchema);
