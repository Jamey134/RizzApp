const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const generateToken = require("../config/generateToken")

const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password, profilePic } = req.body;

    console.log(req.body)

    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Please Enter the Required Fields.");
    }
    // "await" operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or at the top level of a module.
    const userExists = await User.findOne({ email });

    if (userExists) {
        res.status(400);
        throw new Error("User already exists");
    }

    const user = await User.create({
        name,
        email,
        password,
        profilePic,
    })

    if (user) {
        // status(201) means "successful"
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,

            // A JSON web token(JWT) is JSON Object which is used to securely transfer information over the web(between two parties). It can be used for an authentication system and can also be used for information exchange.
            token: generateToken(user._id),
        })
    } else {
        res.status(400);
        throw new Error("Failed to create User")
    }

})


const authUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && await user.matchPassword(password)) {
        res.json({
            _id: user._id,
            name: user.name,
            email: user.email,
            profilePic: user.profilePic,
            token: generateToken(user._id)
        })
    }
        else {
            res.status(401);
            throw new Error("Invalid Email or Password. Please Try Again.");
        }



})

module.exports = { registerUser, authUser };