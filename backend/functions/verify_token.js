const User = require("../schemas/userSchema");

const verify = async (req, res) => {
  try {
    const userId = req.user?.id || req.user?._id || req.user?.userId;

    if (!userId) {
      return res.status(401).json({ 
        success: false, 
        message: "Invalid session or token payload" 
      });
    }

    const user = await User.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ 
        success: false, 
        message: "User not found" 
      });
    }

    return res.status(200).json({
      success: true,
      valid: true,
      user
    });
  } catch (error) {
    if (global.logger) {
      global.logger.warn({ error: error.message }, "Unauthorized access in verify endpoint");
    } else {
      console.warn("Unauthorized access:", error.message);
    }
    return res.status(401).json({ success: false, message: error.message });
  }
};

module.exports = verify;