const mongoose = require ('mongoose')

const book = new mongoose.Schema ({
    url: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    desc: {
        type: String,
        required: true,
    },
    avail_status: {
        type: String,
        required: true,
    },
},
    {timestamps: true}
)

module.exports = mongoose.model('book', book)

