const mongoose=require("mongoose");

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        required:[true, "Username is required"],
        minlength:[5, "Username must be atleast 5 letters"],
    },
    email:{
        type:String,
        lowercase:true,
        required:[true, "email is requried"],
        time:true,
        match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ]
    },
    password:{
        type:String,
        required:[true, "Password is required"],
        minlength:[6, "Minimum 6 characters required for password"]
    },
    emailUpdates:{
        type:Boolean,
        default:false
    }
},
{
    timestamps: true, 
  }
)

module.exports=mongoose.model("User", userSchema);