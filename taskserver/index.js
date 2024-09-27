const express = require("express");
require('dotenv').config();
const PORT = process.env.PORT;
const mongoose = require("mongoose");
const allroutes = require("../taskserver/Router/routes")
const cors = require("cors")

const app = express();
app.use(cors());
app.use(express.json());
app.use(allroutes)


mongoose.connect(process.env.MONGO_URI).then(()=>{
    app.listen(PORT,()=>{
        console.log("Server is running on port and connected to db",PORT)
    })
    
}).catch((error)=>{
    console.log(error);
})