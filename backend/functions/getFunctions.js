const Notes=require("../schemas/noteSchema");

const getNotePerUser=async(req, res)=>{
    const userId = req.user?.userId;
try {
    if(!userId){
        return res.status(403).send("User not found");
    }
    const response = await Notes.find({userId}).sort({createdAt: -1});
    return res.status(200).json({
        success:true,
        count: response.length,
        response
    })
} catch (error) {
    logger.warn("Error happened",error.message);
    return res.status(500).json({
        success:false,
        message:error.message,
    })
}
}

module.exports = {getNotePerUser};