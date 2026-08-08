const mongoose = require("mongoose");
require('dotenv').config();

const connectDB=async()=>{
try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Mongodb connected successfully");
 
} catch (error) {
    console.error("Mongodb Connection failed",error.message);
//    process.exit(1)
}
}

module.exports=connectDB
