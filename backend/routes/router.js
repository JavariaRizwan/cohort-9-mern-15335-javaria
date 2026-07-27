
const express=require("express");
const router = express.Router();
const {saveUser, login, logout, createNewNote}=require("../functions/postFunctions");
const authenticate = require("../middleware/authenticate");
const verify=require("../functions/verify_token");

router.post('/save-user', saveUser);
router.post('/login-user', login);
router.get("/verify", authenticate, verify)
router.post('/logout', logout);
router.post('/create-note',authenticate, createNewNote);


module.exports=router;