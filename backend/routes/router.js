
const express=require("express");
const router = express.Router();
const {saveUser, login, logout, createNewNote, 
    changeDeleteStatus, changePinStatus, editNote}=require("../functions/postFunctions");
const authenticate = require("../middleware/authenticate");
const verify=require("../functions/verify_token");
const { getNotePerUser}= require("../functions/getFunctions");


router.post('/save-user', saveUser);
router.post('/login-user', login);
router.get("/verify", authenticate, verify)
router.post('/logout', logout);
router.post('/create-note',authenticate, createNewNote);
router.get("/user-notes", authenticate, getNotePerUser);
router.post('/pin-note/:noteId', authenticate, changePinStatus);
router.put('/delete-note/:noteId', authenticate, changeDeleteStatus);
router.put('/edit-note/:noteId', authenticate, editNote);


module.exports=router;