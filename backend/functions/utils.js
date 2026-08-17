const bcrypt=require("bcryptjs")

const hashFunction=async(password)=>{
    try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
        
    } catch (error) {
    logger.warn(`Password hashing failed: ${error.message}`);
    throw new Error(`Password hashing failed: ${error.message}`);       
    }
}

module.exports={hashFunction};