const express = require("express");
const bookModel = require("../models/book");
const auth = require("../middleware/authMiddleware");
const {addBook,
       getAllbook,
       getbookById,
       updatebook,
       deletebook}=require("../controller/bookController")

const router = express.Router();


router.post("/books", auth,addBook)
router.get("/books", auth, getAllbook)
router.get("/books/:id", auth,getbookById)
router.put("/books/:id", auth, updatebook);
router.delete("/books/:id", auth,deletebook )

module.exports = router;