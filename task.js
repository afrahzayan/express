const express = require("express")
const app = express()

app.use(express.json())

let users = [];


app.post("/users", (req,res) => {
    const {name, email, username} = req.body;

    const newUser = {
        id: users.length + 1,
        name,
        email,
        username
    };

    const splitName = name.split(" ").join("")

    if(splitName.length < 3){
        return res.status(400).json({message: "Name must be atleast 4 character"})
    }



    users.push(newUser)

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});


app.get("/users", (req, res) => {
    res.json(users)
})


app.get("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if(!user){
        return res.status(404).json({ message: "User not found"})
    }

    res.json(user);
})


app.put("/users/:id", (req,res) => {
    const id = parseInt(req.params.id);
    const {name, email, username} = req.body;

    const user = users.find(u => u.id === id);

    if(!user) {
        return res.status(404).json({ message: "User not found"})
    }

    user.name = name 
    user.email = email 
    user.username = username

    res.json({
        message: "User updated successfully",
        user
    })
})



app.patch("/users/:id",(req,res) => {
    const id = parseInt(req.params.id)
    const {name,email,username} = req.body

    const user = users.find(u => u.id === id)

    if(!user){
        return res.status(404).json({message : "not found"})
    }

    if(name !== undefined) user.name = name
    if(email !== undefined) user.email = email
    if(username !== undefined) user.username = username


    res.json({message : "user updated", user})
})



app.delete("/users/:id",(req,res) => {
    const id = parseInt(req.params.id);
    const index = users.findIndex(u => u.id === id)

    if(index === -1){
        return res.status(404).json({message:"not found" } )
    }

    const deleteduser = users.splice(index,1);

    res.json({message: "user deleted successfull", user : deleteduser[0]})
})


app.listen(3000,() => {
    console.log("server running");
    
})