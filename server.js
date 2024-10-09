const express = require("express")
const errorHandler = require("./middleware/errorHandler.js")
const dbConnection = require("./config/dbConnection.js")
const dotenv = require('dotenv').config()

const app = express()

// app.get('/',(req,res)=>{
//     res.send("heloo")
// })
//middleware
app.use(express.json())
dbConnection()

const port = process.env.PORT || 3002


app.use('/api/contacts',require('./routes/contact.route.js'))
app.use('/api/users',require('./routes/user.route.js'))
app.use(errorHandler)


app.listen(port, () => {
    console.log(`server is running on ${port} `)
})

