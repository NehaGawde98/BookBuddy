const express = require('express')
const app = express()
require('dotenv').config()
require('./conn/conn')
const User = require('./routes/user')
const Books = require('./routes/book')
const cors = require('cors')
const authRoutes = require('./routes/authRoutes')

app.use(cors())
app.use(express.json())

//routes 
app.use('/api/v1', User)
app.use('/api/v1', Books)
app.use('/api/v1', authRoutes)

//create port
app.listen(process.env.PORT, () => {
    console.log(`Server started at port ${process.env.PORT}`)
})