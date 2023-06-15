const asyncHandler = require("express-async-handler"); // so, No need to use try and catch it automatically paas the res to errorHandler.
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// @desc register the user
// @route POST /api/user/register
//@access public
const registerUser = asyncHandler(async (req, res) =>{
    const {username, email, password} = req.body;
    if(!username||!email||!password)
    {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const availableUser = await User.findOne({email});
    if(availableUser)
    {
        res.status(400);
        throw new Error("Email already registered");
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("hashed password", hashedPassword);
    const newUser = new User({
        username: username,
        email: email,
        password: hashedPassword
    });

    newUser.save().then(function(){
        res.send({_id: newUser._id, email: newUser.email});
    }).catch(function(err){
        res.send(err);
    })

    // console.log(newUser);
    // if(newUser)
    // {
        
    // }
    // else
    // {
    //     res.status(400);
    //     throw new Error("user data is not valid");
    // }
    // res.json({message: "register the user"});
});

// @desc login user
// @route POST /api/user/login
//@access public
const loginUser = asyncHandler(async function(req, res){
    const {email, password} = req.body;

    if(!email||!password)
    {
        res.status(400);
        throw new Error("All feilds are mandatory");
    }
    const user = await User.findOne({email});

    if(user && await bcrypt.compare(password, user.password))
    {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                _id: user._id
            }
        },process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: "15m"
        }
        ) ;
        res.status(200).json({accessToken});
    }
    else
    {
        res.status(401);
        throw new Error("Email or Password is not valid");
    }
});

// @desc current user
// @route GET /api/user/current
//@access private
const currentUser = asyncHandler( function(req, res){
    res.json({message: "current user information"}); 
});

module.exports = {registerUser, loginUser, currentUser};