const express=require("express");
const router = express.Router();
const {saveUser}=require("../functions/postFunctions");


router.post('save-user', saveUser);


module.exports=router;