// make habit to use async functions in mongoDB.

const asyncHandler = require("express-async-handler"); // so, No need to use try and catch it automatically paas the res to errorHandler.
const Contact = require("../models/contactModel");
// @desc Get all contacts
// @route GET /api/contact
//@access private
const getContacts = asyncHandler(async function(req, res){
    
    Contact.find({user_id: req.user._id}).then(function(cnt){
        res.status(200).json(cnt);
    }).catch(function(err){
        res.json(err);
    });

    //way - 2
    // const cnt = await Contact.find();
    // if(!cnt)
    // {
    //     res.status(404);
    //     throw new Error("contacts not found");
    // }
    // else
    // {
    //     res.status(200).json(cnt);
    // }
});

// @desc Create contact
// @route POST /api/contact
//@access private
const createContact = asyncHandler(async function(req, res){
    console.log(req.body);
    const { name, email, phone } = req.body;
    if(!name || !email || !phone){
        res.status(400);
        throw new Error("All fields are mandatory !");
    }

    const newContact = new Contact({
        user_id: req.user._id,
        name: name,
        email: email,
        phone: phone
    });

    newContact.save();
    res.status(201).json({message: `Create contact`});    
});

// @desc Get contact
// @route GET /api/contact/:id
//@access private
const getContact = asyncHandler(async function(req, res){
    const cnt = await Contact.find({user_id: req.user._id, _id: req.params.id});
        if(!cnt)
        {
            res.status(404);            
            throw new Error("contact not found");
        }
        res.json(cnt);
    });


//error handlin in below code not working, because asyncHandler only works with async functions not callback functions
// const getContact = asyncHandler(function(req, res){
//     Contact.find({_id: req.params.id}).then(function(cnt){
//         if(cnt.length === 0)
//         {
//             res.status(404);            
//             throw new Error("contact not found");
//         }
//         res.json(cnt);
//     }).catch(function(err){
//         res.json(err);
//     });
//     });

// @desc Update contact
// @route PUT /api/contact/:id
//@access private
const updateContact = asyncHandler(async function(req, res){
    const { name, email, phone } = req.body;
    const cnt = await Contact.find({user_id: req.user._id, _id: req.params.id});
    if(!cnt)
    {
        res.status(404);            
        throw new Error("contact not found");
    }

    if(cnt.length === 0)
    {
        res.status(403);
        throw new Error("user don't have permission to update other user's contact");
    }

    Contact.updateMany({user_id: req.user._id, _id: req.params.id} ,{name: name, email: email, phone: phone}).then(function(){
        res.json({message: `Update contact ${req.params.id}`});
    }).catch(function(err){
        res.send(err);
    });
});

// @desc Delete contact
// @route DELETE /api/contact/:id
//@access private
const deleteContact = asyncHandler(async function(req, res){
    const cnt = await Contact.find({user_id: req.user._id, _id: req.params.id});  
    if(cnt.length === 0)
    {
        res.status(403);
        throw new Error("user don't have permission to delete other user's contact");
    }
    Contact.deleteOne({user_id: req.user._id, _id: req.params.id}).then(function(){
        res.json({message: `Delete contact ${req.params.id}`});
    }).catch(function(err){
        res.send(err);
    });
});

module.exports = {
    getContacts,
    createContact,
    getContact,
    updateContact,
    deleteContact
}

