const express = require("express")
const app = express();
const cors = require("cors");
const path = require("path");
require("dotenv").config({
  path: "./config/.env"
});
const port = process.env.PORT || 5000
const userRoute = require("./routes/userRoutes");

app.use(cors());
app.use(express.json({
    limit: "50mb",
}));
app.use(express.urlencoded({ extended: true }))

app.use("/api/users",userRoute);

app.listen(port,()=>{
    console.log(`Server is running on port : ${port}`);
})