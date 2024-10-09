const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/user.model.js')
//Register User
const userRegister = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body
    if (!username || !email || !password) {
        res.status(400)
        throw new Error("Fields required");
    }
    const userAvailable = await User.findOne({ email })
    if (userAvailable) {
        res.status(400)
        throw new Error("User Already Registered");
    }
    //Hash Password
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("Hashed password", hashedPassword)

    //create
    const user = await User.create(
        {
            username,
            email,
            password: hashedPassword
        }
    )

    console.log("user created:", user)
    if (user) {
        res.status(200).json({ _id: user.id, email: user.email })
    } else {
        res.status(400).json("User Data not valid")
    }

    res.status(201).json({ message: "user Registered" })

})
//Login User
const userLogin = asyncHandler(async (req, res) => {

    const { email, password } = req.body
    if (!email || !password) {
        res.status(400).json("All fields required")
    }
    const user = await User.findOne({ email })
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: "20m" }
        )
        res.status(200).json({ accessToken })
    }
    else {
        res.status(401)
        throw new Error("email and password not valid");

    }


})

const getCurrentUser = asyncHandler(async (req, res) => {
    res.json(req.user)


})

module.exports = {
    userRegister,
    userLogin,
    getCurrentUser
}