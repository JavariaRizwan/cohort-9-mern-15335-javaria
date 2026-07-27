const bcrypt=require("bcryptjs")

const hashPassword=async(password)=>{
    try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
        
    } catch (error) {
    logger.warn(`Password hashing failed: ${error.message}`);        
    }
}

module.exports=hashPassword;