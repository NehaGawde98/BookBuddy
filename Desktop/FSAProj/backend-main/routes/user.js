const router = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const {authenticateToken} = require('./userAuth')

//Sign up
router.post('/signup', async(req, res) => {
    try { 
        const {username, email, password} = req.body

    //check username already exists 
     const existingUsername = await User.findOne({username : username})
        if (existingUsername)
        {
            return res.status(400).json({message: 'Username already exists'})
        }

        //check email already exists 
        const existingEmail= await User.findOne({email : email})
        if (existingEmail)
        {
            return res.status(400).json({message: 'Email already exists'})
        } 
 

        const hashPass = await bcrypt.hash(password, 10);

        const newUser = new User ({
            username: username,
            email: email,
            password: hashPass,

        })

        await newUser.save()
        return res.status(200).json({message: "Sign-up successful"})
    }
    catch(error) {
        res.status(500).json({message: 'Internal server error'})
    }
}
)

//Login
router.post('/login', async (req, res) => {
    try {
        const { username, password} = req.body 

        const existingUser = await User.findOne({ username})
        if (!existingUser)
            {
                res.status(400).json({message: 'Invalid credentials'})
            }

        await bcrypt.compare(password, existingUser.password, (err,data) => {
            if (data)
            {
                const authClaims = [
                    { name: existingUser.username},
                ]
                const token = jwt.sign({authClaims}, 'bookstore123', {expiresIn: '30d'})
                res.status(200).json({id: existingUser._id, token: token})
            }
            else {
                res.status(400).json({message: 'Invalid credentials'})
            }
        })
    }
    catch(error) {
        res.status(500).json({message: 'Internal server error'})
    }
})

//Get user info
router.get('/get-user-info', authenticateToken, async (req, res) => {
    try {
        const { id } = req.headers
        const data = await User.findById(id).select('-password')
        return res.status(200).json(data)
    }
    catch(error) 
    {
        res.status(500).json({message: 'Internal server error'})
    }
})

//Password recvery
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    secure: false, // True for 465, false for other ports
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })

router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found with that email address' });
      }
  
      // Create a reset token
      const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      // Set the reset token and its expiration date on the user record
      user.resetPasswordToken = resetToken;
      user.resetPasswordExpires = Date.now() + 3600000; // 1 hour expiration
      await user.save();
  
      // Send reset password email
      const resetUrl = `http://localhost:1000/reset-password/${resetToken}`;
  
      const mailOptions = {
        to: user.email,
        from: process.env.SMTP_USER,
        subject: 'Password Reset Request',
        text: `You requested a password reset. Click the link below to reset your password: \n\n${resetUrl}`,
      };
  
      transporter.sendMail(mailOptions, (err, info) => {
        if (err) {
          return res.status(500).json({ message: 'Error sending email', error: err });
        }
        return res.status(200).json({ message: 'Password reset email sent' });
      });
  
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
}
)


module.exports = router