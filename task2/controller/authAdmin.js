const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const Admin = require("../model/adminModel")
require("dotenv").config()

const registerController = async (req, res) => {
    try {
        const { username, password } = req.body

        const existingAdmin = await Admin.findOne({username})

        if(existingAdmin){
            return res.status(500).json({message: "Admin already exists!!"})
        }

        const hashedPassword = await bcrypt.hash(password, 10)

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword
        })

        res.json({ message: "Admin added successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}
const loginController = async (req, res) => {
    const { username, password } = req.body

    const adminCheck = await Admin.findOne({ username })

    if (!adminCheck) {
        return res.status(404).json({ message: "User not found" })
    }

    const passwordCheck = await bcrypt.compare(password, adminCheck.password)

    if (!passwordCheck) {
        return res.status(401).json({ message: "Invalid password" })
    }

    const token = jwt.sign({ id: adminCheck._id }, process.env.JWT_TOKEN)

    res.json({ token })
}

module.exports = { registerController, loginController };