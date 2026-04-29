const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true },
  genre: { type: String, required: true },
  publishedYear: { type: Number },
  available:{type: Boolean, default:0}
});

const bookModel= mongoose.model("book", bookSchema);

module.exports=bookModel;


