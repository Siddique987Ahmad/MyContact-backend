const asyncHandler=require('express-async-handler')
const Contact=require('../models/contact.model.js')
//const User=require('../models/user.model.js')


//Get All Contacts
const getContact = asyncHandler(async(req, res) => {
    const contacts=await Contact.find({user_id:req.user.id})
    res.status(200).json(contacts)
})
//Get Contact through Id
const getSpecificContact =asyncHandler(async(req, res) => {

    const {id}=req.params
    const contact=await Contact.findById(id)

    res.status(200).json(contact)
})
//Create Contacts
const createContact = asyncHandler(async(req, res) => {
    try {
        console.log("request from client", req.body)
        const {name,email,phone}=req.body
        if(!name || !email || !phone)
        {
            res.status(400)
            throw new Error("All fields are required");
            
        }
const contact=await Contact.create({
    name,
    email,
    phone
})

        res.status(201).json(contact)
    } catch (error) {
        console.log(error.message)
        res.status(500).json({message:error.message})
    }
})
//Update Contact
const updateContact = asyncHandler(async(req, res) => {
    const {id}=req.params
    const contacts=await Contact.findByIdAndUpdate(id,req.body)
    if(!contacts)
    {
        res.status(404).json({message:"Contact Not found"})
    }
    const updatedContact=await Contact.findById(id)
    res.status(200).json(updatedContact)
})
//Delete Contact
const deleteContact = asyncHandler(async(req, res) => {
    const {id}=req.params
    const contact=await Contact.findByIdAndDelete(id)
    if (!contact) {
        res.status(404).json("Contact not found")
    }
    res.status(200).json(contact)
})

module.exports = {
    getContact,
    getSpecificContact,
    createContact,
    updateContact,
    deleteContact
}