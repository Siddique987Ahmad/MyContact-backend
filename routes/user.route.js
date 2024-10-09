const express=require("express")
const { userRegister, userLogin, getCurrentUser } = require("../controllers/user.controller.js")
const validateToken = require("../middleware/validateTokenHandler.js")

const router=express.Router()

router.post('/register',userRegister)
router.post('/login',userLogin)
router.get('/current',validateToken,getCurrentUser)

module.exports=router 