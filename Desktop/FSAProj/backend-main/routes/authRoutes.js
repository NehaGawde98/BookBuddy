const router = require('express').Router()

// Reset password route
router.post('/reset-password/:token', async (req, res) => {
    const { token } = req.params;
    const { password } = req.body;
  
    try {
      // Verify the reset token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
  
      const user = await User.findOne({
        _id: decoded.id,
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() }, // Check if the token is still valid (not expired)
      });
  
      if (!user) {
        return res.status(400).json({ message: 'Invalid or expired password reset token' });
      }
  
      // Hash the new password
      const hashedPassword = await bcrypt.hash(password, 12);
  
      // Update the user's password and clear the reset token
      user.password = hashedPassword;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;
      await user.save();
  
      return res.status(200).json({ message: 'Password has been successfully reset' });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

  module.exports = router
  