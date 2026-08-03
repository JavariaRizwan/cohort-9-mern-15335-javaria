const express=require("express");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const logger=require("../src/config/logger");


const authenticate=async(req, res, next)=>{

try {
    
    const token=req.cookies.token;
    
    if(!token){
      return  res.status(401).json({
        message:"No token found. Access denied!",
        success:false
        })
    }
    const decoded=jwt.verify(token, process.env.JWT_SECRET);
    req.user=decoded;
    next();

} catch (error) {
    logger.warn({error}, "Invalid or expired token");
    return res.status(403).json({
        success:false,
        message:error.message
    })
}
}

module.exports=authenticate;