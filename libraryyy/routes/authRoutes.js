const express = require("express");
const jwt = require("jsonwebtoken");
const {registrationController,loginController} = require("../controller/adminController")

const router = express.Router();


router.post("/registration",registrationController)
router.post("/login", loginController );




module.exports = router;