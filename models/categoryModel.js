const mongoose = require("mongoose");

// category schema:
const categorySchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "category title is required"],
    },
    imageUrl:{
        type:String,
        default:"https://tse3.mm.bing.net/th?id=OIP.AuiIAi2xX18p_aBllb_nkwHaH_&pid=Api&P=0&h=220"
    },
},
    {timestamps:true}
);

//export the schema:
module.exports = mongoose.model("Category",categorySchema);