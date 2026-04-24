const express = require("express")

const userRouter = require("./Router/userRouter")
const adminRouter = require("./Router/adminRouter")

const connectDB = require("./config/db")

const app = express()

app.use(express.json())

app.use("/api/auth", adminRouter)
app.use("/api", userRouter)

const serverStarted = async () => {
    try {
        await connectDB()

        app.listen(5000, () => {
            console.log("Server running on port 5000")
        })
    }catch(err){
        console.log("Server connection failed", err.message)
    }
}

serverStarted()