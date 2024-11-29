const express = require("express")
const app = express()

// json request accept krne ke liye
app.use(express.json()) 

const frontendRoutes = require("./routers/frontendRoutes")
const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/mernproject")



app.use(express.static("Public"))
app.use("/backend", frontendRoutes)
app.listen(5000, ()=>{
    console.log("server is running on port 5000")
});