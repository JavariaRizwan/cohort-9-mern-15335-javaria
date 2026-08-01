const User=require("../schemas/userSchema");
const {hashFunction}= require("./utils");
const bcrypt=require("bcryptjs");
const jwt=require("jsonwebtoken");
require('dotenv').config();
const Notes=require("../schemas/noteSchema")

const saveUser=async(req, res)=>{
    try {
      const {username, email, password, emailUpdates}=req.body;

        if(!username || !password || !email){
            logger.warn("Signup failed: Missing required fields");
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields for signup"
            })
        };
        const normalEmail=email.toLowerCase(); 
        const existingUser=await User.findOne({email:normalEmail});
        if(existingUser){
            logger.warn("SignUp failed! Email already exists");
            return res.status(400).json({success: false, 
        message: "User with this email already exists." 
      });

    }
      const hashedPassword= await hashFunction(password);
      
      const newUser= await User.create({
            username: username,
            email:normalEmail,
            password : hashedPassword,
            emailUpdates:emailUpdates
        })

        logger.info({userId: newUser._id},"SignUp successful. User saved!");
        return res.status(201).json({
            success: true,
        message: "User registered successfully",
        user: {
        id: newUser._id,
        username: newUser.username,
        email: newUser.email,
        createdAt: newUser.createdAt,
      },
        })
        
    } catch (error) {
logger.warn({ error }, "Something unexpected happened during signup");
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
    }
}


const login=async(req, res)=>{
try {
    const {usernameOrEmail, password} = req.body;
    if(!usernameOrEmail || !password){
        logger.warn("Email/Username and Password both are required.");
        return res.status(400).json({
        success: false,
        message: "Username/Email and password are required.",
      });
    }
    const identifier = usernameOrEmail.trim();
    const user=await User.findOne({
        $or:[
            {username:identifier},
            {email: identifier.toLowerCase()}
        ]
    });
    if(!user){
        logger.warn("No user found with these credentials");
        return res.status(401).json({
            message:"Invalid Credentials",
            success:false
        })
    }
    const isPassword=await bcrypt.compare(password, user.password);
    if(!isPassword){
       logger.warn("Password not matched");
        return res.status(401).json({
        message: "Invalid credentials",
        success: false,
      });
    }

    const token=jwt.sign(
        {   userId:user._id,
            username:user.username,
        },
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )


    res.cookie("token",token, {
        httpOnly:true,
        secure: process.env.NODE_ENV==='production',
        sameSite:"lax"
    })

    return res.status(200).json({
        success:true,
        message:"Login successful",
        token,
        user:{
            userId:user._id,
            username:user.username,
        }
    });

} catch (error) {
    logger.warn({error}, "Something unexpected happened.");
    return res.status(500).json({
        message:"Something went wrong. Please try again.",
        success:false
    })
}
}


const logout=async(req, res)=>{
    try {
        res.clearCookie('token',{
            httpOnly:true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
        })
        return res.status(200).json({ 
    success: true, 
    message: 'Logged out successfully' 
  });
}
     catch (error) {
        logger.warn(error.message);
        return res.status(500).json({
            success:false,
            message:"Logout failed!"
        })
    }
}



const createNewNote=async(req, res)=>{
const userId = req.user?.userId;
 const {title, description, category, subCategory}=req.body;
    try {

        if (!userId) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized! Token is missing or invalid."
      });
    }
    if (!title?.trim() || !description?.trim()) {
      return res.status(400).json({
        success: false,
        message: "Title and description are required!"
      });
    }
    if(!category || !subCategory){
        return res.status(400).json({
        success: false,
        message: "Category and subCategory are required!"
      });
    }
    const newNote = await Notes.create({
        userId,
        title,
        description,
        category,
        subCategory
    });
    return res.status(201).json({
    message:"Note created successfully",
    success:true,
    note:{
        id:newNote._id,
        userId: newNote.userId,
        title: newNote.title,
        description: newNote.description,
        category: newNote.category,
        subCategory: newNote.subCategory
    }
})
} catch (error) {
    logger.warn(error.message);
    return res.status(500).json({
        success:false,
        message:"Some error happened in the backend"
    })
}
}


const changePinStatus = async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const currentUserId = req.user?.userId || req.user?._id || req.user?.id;

    const note = await Notes.findOne({ 
      _id: noteId, 
      userId: currentUserId 
    });

    if (!note) {
      return res.status(404).json({ success: false, message: "Note not found or unauthorized" });
    }

    note.isPinned = !note.isPinned;
    await note.save();

    return res.status(200).json({
      success: true,
      message: `Note ${note.isPinned ? "pinned" : "unpinned"} successfully`,
      response: note,
    });
  } catch (error) {
    logger.warn(error.message);
    return res.status(500).json({ success: false, message: "Something went wrong. Please try again." });
  }
};



const changeDeleteStatus = async (req, res) => {
  try {
    const { noteId } = req.params;

    const updatedNote = await Notes.findOneAndUpdate(
      { _id: noteId, userId: req.user?.userId },
      { 
        $set: { 
          isDeleted: true,
          isPinned: false 
        } 
      },
      { new: true } 
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found or unauthorized",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Note moved to trash successfully",
      response: updatedNote, 
    });

  } catch (error) {
    logger.warn(error.message);
    return res.status(500).json({
      success: false,
      message: "Something went wrong. Please try again.",
    });
  }
};


const editNote=async(req, res)=>{
 const {noteId}=req.params;
 const userId=req.user?.userId;
 const {title, description}=req.body;
  try {
    
    const response=await Notes.findOneAndUpdate({_id:noteId, userId: userId}, {
      title: title,
      description:description
    },
  {new:true}
);
if(!response){
  return res.status(404).json({
    success:false,
    message:"Note not found or unauthorized"
  })
}
  return res.status(200).json({
    success:true,
    message:"Note updated successfully",
    note:response
  })
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}



module.exports={saveUser, login, logout, createNewNote, changePinStatus, changeDeleteStatus, editNote};