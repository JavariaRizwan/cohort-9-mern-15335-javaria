const User=require("../schemas/userSchema");
const hashFunction= require("./hashPassword");

const saveUser=async(req, res)=>{
    const {usernanme, email, password, emailUpdates}=req.body;
    try {
        if(!username || !password || !email){
            logger.warn("Signup failed: Missing required fields");
            return res.status(400).json({
                success:false,
                message:"Please fill all the required fields for signup"
            })
        };
        const existingUser=await User.findOne({email:email.toLowerCase()});
        if(existingUser){
            logger.warn({email}, "SignUp failed! Email already exists");
            return res.status(400).json({success: false, 
        message: "User with this email already exists." 
      });


      const hashedPassword= await hashFunction(password);
        const newUser= await User.create({
            username: username,
            email:email,
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
        }
    } catch (error) {
        
    }
}

module.exports={saveUser}