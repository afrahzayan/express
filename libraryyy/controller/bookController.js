const bookModel = require("../models/book")


const addBook = async (req, res) => {
    try {
        const { title, author, genre, publishedYear, available } = req.body;

        const book = await bookModel.create({
            title,
            author,
            genre,
            publishedYear,
            available
        });

        res.status(201).json({ message: "Book created", book });

    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};




const getAllbook = async(req,res)=> {
    const book = await bookModel.find()
    res.status(200).json({message:"get books",book})
}





const getbookById= async(req,res)=>{
    try{
    const book = await bookModel.findById(req.params.id)
    res.status(200).json({message:"get book",book})
    } catch(err){
        res.json(err)
    }
}




const updatebook= async(req,res) => {
    const updateData = {
        title: req.body.title,
        author: req.body.author,
        genre:req.body.author,
        publishedYear: req.body.publishedYear,
        available:req.body.available
    }

    const book = await bookModel.findByIdAndUpdate(
        req.params.id,
        updateData,
        {new:true}
    )

    res.json(book)
}





const deletebook = async (req, res) => {
  try {
    const book = await bookModel.findByIdAndDelete(req.params.id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    res.json({ message: "Book deleted", book });
  } catch (err) {
    res.status(500).json({ message: "Error deleting book", error: err.message });
  }
};


module.exports={addBook,getAllbook,getbookById,updatebook,deletebook}