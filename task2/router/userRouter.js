const express = require("express")

const {
    createUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser
} = require("../controller/authUser");

const upload = require("../config/multer");
const authMiddleware = require("../middleware/authmiddleware");

const router = express.Router()

router.use(authMiddleware)

router.post("/users", upload.single("photo"), createUser)
router.get("/users", getUsers)
router.get("/users/:id", getUserById)
router.put("/users/:id", upload.single("photo"), updateUser)
router.delete("/users/:id", deleteUser)                    

module.exports = router