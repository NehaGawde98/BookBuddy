const router = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const {authenticateToken} = require('./userAuth')
const Book = require('../models/book')

//add book
router.post('/add-book', authenticateToken, async (req,res) => {
    try {
        const { id } = req.headers
        //const user = await User.findById(id)
        //await User.findById(id)
        const book = new Book ({
            url : req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre : req.body.genre,
            desc : req.body.desc,
            avail_status: req.body.avail_status,
        })

        await book.save()
        res.status(200).json({message: 'Book added successfully'})

    }
    catch(error) {
        res.status(500).json({message: 'Internal server error' })
    }
})

//update book
router.put('/update-book', authenticateToken, async (req,res) => {
    try {
        const { bookid } = req.headers
        await Book.findByIdAndUpdate(bookid, {
            url : req.body.url,
            title: req.body.title,
            author: req.body.author,
            genre : req.body.genre,
            desc : req.body.desc,
            avail_status: req.body.avail_status,
        })

        res.status(200).json({message: 'Book updated successfully'})

    }
    catch(error) {
        res.status(500).json({message: 'Error occured' })
    }
})

//delete book
router.delete('/delete-book', authenticateToken, async (req,res) => {
    try {
        const {bookid} = req.headers
        await Book.findByIdAndDelete(bookid)
        return res.status(200).json({message: 'Book deleted successfully'})
    }
    catch(error){
        return res.status(500).json({message: 'Error occured'})
    }
})

//get all books
router.get('/get-all-books', async (req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1})
        return res.json({ status: 'Success', data: books})
    }
    catch(error) {
        return res.status(500).json({ message: 'Error occured'})
    }
})

//get book by id
router.get('/get-book-by-id/:id', async (req,res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        return res.json({ status: 'Success', data: book})
    }
    catch(error) {
        return res.status(500).json({ message: 'Error occured'})
    }
})


module.exports = router