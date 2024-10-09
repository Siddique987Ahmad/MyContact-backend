const express = require("express")
const { getContact, getSpecificContact, createContact, updateContact, deleteContact } = require('../controllers/contact.controller.js')
const validateToken = require("../middleware/validateTokenHandler.js")

const router = express.Router()
router.use(validateToken) 
router.route('/').get(getContact).post(createContact)
router.route('/:id').get(getSpecificContact).put(updateContact).delete(deleteContact)




module.exports = router