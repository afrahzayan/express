const User = require("../model/userModel")

const createUser = async (req, res) => {

    try {
        const { name, email, username } = req.body

        const newUser = await User.create({
            name,
            email,
            username,
            photo: req.file ? req.file.path : null
        })

        res.json(newUser)
    } catch (err) {
        res.status(500).json({error: err.message})
    }
}


const getUsers = async (req,res) => {
    const users = await User.find()
    res.json(users)
}


const getUserById = async(req, res) => {
    try{
        const user = await User.findById(req.params.id)
        res.json(user)
    }catch (err){
        res.status(404).json({error: "User not found"})
    }
}


const updateUser = async(req,res) => {
    try{
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username
        }

        if(req.file){
            updateData.photo = req.body.path
        }

        const user = await User.findByIdAndUpdate(
            req.params.id,
            updateData,
            {new: true}
        );
        res.json(user)
    }catch(err) {
        res.status(500).json({error: err.message})
    }
}


const deleteUser = async(req,res) => {
    try{
        const user = await User.findByIdAndDelete(req.params.id)
        res.json({message: "User deleted"})
    }catch(err){
        res.status(500).json({error: err.message})
    }
}


module.exports = {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
}