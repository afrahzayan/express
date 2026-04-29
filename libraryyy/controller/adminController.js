const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
require("dotenv").config()
const Admin = require("../models/Admin")


const registrationController = async (req, res) => {
    try {
        const { username, password } = req.body;

        const existingAdmin = await Admin.findOne({ username });

        if (existingAdmin) {
            return res.status(400).json({ message: "Admin already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newAdmin = await Admin.create({
            username,
            password: hashedPassword
        });

        res.json({ message: "Admin added successfully", newAdmin });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
   




const loginController = async(req,res) => {
    const{username,password} = req.body

    const adminCheck = await Admin.findOne({username})

    if(!adminCheck){
        return res.status(404).json({message: "admin not found"})
    }

    const passwordCheck = await bcrypt.compare(password,adminCheck.password)

    if(!passwordCheck){
        res.status(401).json({message:"invalid password"})
    }


    const token = jwt.sign({id : adminCheck._id},process.env.JWT_SECRET)
      res.json({token})
}

module.exports={registrationController,loginController}