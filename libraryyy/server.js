const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();;


const authRoute=require("./routes/authRoutes");
const bookRoute=require("./routes/bookRoutes")

const app = express();

app.use(express.json());



app.use("/api/auth", authRoute);
app.use("/api",bookRoute);


mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});