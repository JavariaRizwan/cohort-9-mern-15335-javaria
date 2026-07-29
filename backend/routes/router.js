
const express=require("express");
const router = express.Router();
const {saveUser, login, logout, createNewNote, changeDeleteStatus, changePinStatus}=require("../functions/postFunctions");
const authenticate = require("../middleware/authenticate");
const verify=require("../functions/verify_token");
const {getNotesPerUser, getNotePerUser}= require("../functions/getFunctions");


router.post('/save-user', saveUser);
router.post('/login-user', login);
router.get("/verify", authenticate, verify)
router.post('/logout', logout);
router.post('/create-note',authenticate, createNewNote);
router.get("/user-notes", authenticate, getNotePerUser);
router.post('/pin-note/:noteId', authenticate, changePinStatus);
router.post('/delete-note/:noteId', authenticate, changeDeleteStatus);


module.exports=router;