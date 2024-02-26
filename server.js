const express = require("express");
const colors = require("colors");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const connectDb = require("./config/db");


//dotenv configuration:
dotenv.config();

//connection database:
connectDb()


const app = express();

//middlewares:
app.use(cors());
app.use(express.json());
app.use(morgan("dev")) ;

const PORT = process.env.PORT || 3000;


app.use("/api/v1/test", require("./routes/testRoutes"));
app.use("/api/v1/auth", require("./routes/authRoutes"));
app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/restaurant",require("./routes/restaurantRoutes"));
app.use("/api/v1/category",require("./routes/categoryRoutes"));
app.use("/api/v1/food", require("./routes/foodRoutes"));

app.get("/", (req,res) => {
    return res
    .status(200)
    .send("<h1>welcom to my restaurant</h1>");
});

app.listen(PORT, ()=>{
    console.log(`server is running at port no : ${PORT}`.bgMagenta);
});
