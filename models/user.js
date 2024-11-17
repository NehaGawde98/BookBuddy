const mongoose = require ('mongoose')


const user = new mongoose.Schema ({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    resetPasswordToken: { 
        type: String, 
        default: null 
    },
    resetPasswordExpires: { 
        type: Date, 
        default: null 
    }
    /* role: {
        type: String,
        default: 'user',
    },
    avatar: {
        type: String,
        default: 'https://static.vecteezy.com/system/resources/thumbnails/002/318/271/small/user-profile-icon-free-vector.jpg'
    }, */
},
{timestamps: true}
)




module.exports = mongoose.model('user', user)