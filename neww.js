const express = require('express')
const app = express()

// app.get('/', (req,res) => {
//     res.send({name: "afrah"})
// })

// app.listen(3000, () => {
//     console.log("server running on port");
    
// })

 app.use(express.json())

app.post("/user", (req,res)=> {
    const {name, age , email} = req.body;

    res.status(201).json({
        message : "user created",
        user : {name,age , email}
    })
})

app.listen(3000, () => {
    console.log("server running on port");
    
})

