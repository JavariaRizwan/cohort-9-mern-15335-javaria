const Notes=require("../schemas/noteSchema");
const User=require("../schemas/userSchema")
const Category=require("../schemas/categorySchema");


const getNotePerUser=async(req, res)=>{
    const userId = req.user?.userId;
try {
    if(!userId){
        return res.status(403).json({
            success:false,
            message: "User not found"
        });
    }
    const userData=await User.findById(userId).select("username email createdAt lastLogin");
    if(!userData){
        return res.status(401).json({
            success:false,
            message:"User profile not found"
        })
    }
    const notesData = await Notes.find({userId}).populate('category').sort({createdAt: -1});
    return res.status(200).json({
        success:true,
        count: notesData.length,
        notes: notesData,
        user: userData
    })
} catch (error) {
    logger.warn("Error happened",error.message);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
}



const getAllCategories=async(req, res)=>{
const userId=req.user?.userId
  try {
const response = await Category.find({ userId: userId });
 
    return res.status(200).json({
        success:true,
        message:"All Categories loaded successfully",
        response
    });
  } catch (error) {
    return res.status(500).json({
      success:false,
      message:error.message
    })
  }
}


// const getUserCredentials=async(req, res)=>{
//     const user_id=req.user?.userId;
//     try {
//         if(!user_id){
//             return res.status(401).json({
//                 success:false,
//                 message:"User not found. Try again"
//             })
//         }
//         const response=await Notes.find({user_id});
           
//         return res.status(200).json({
//                 success:true,
//                 message:"The details of user notes found",
//                 data: response
//             })
        
//     } catch (error) {
//         return res.status(500).json({
//             success:false,
//             message:error.message
//         })
//     }
// }



module.exports = {getNotePerUser, getAllCategories};