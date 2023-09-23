const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');

const registerUser = asyncHandler( async () => {
    const { name, email, password, profilePic} = req.body;
    
    console.log(req.body)

    if (!name || !email || !password){
        res.status(400);
        throw new Error("Please Enter the Required Fields.");
    }
    const userExists = await User // "await" operator is used to wait for a Promise and get its fulfillment value. It can only be used inside an async function or at the top level of a module.
})