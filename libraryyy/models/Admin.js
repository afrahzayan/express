const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
    username: String,
    password: String,Number
});

 const Admin = module.exports = mongoose.model("Admin", adminSchema);