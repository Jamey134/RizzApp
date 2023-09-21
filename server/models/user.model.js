const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    email: {
        type: String,
        required: true,
    },

    password: {
        type: String,
        required: true,
    },
    confirmPassword: {
        type: String,
        required: true,
    },

    profilePic: {
        type: String,
        required: true,
        default: "https://static.thenounproject.com/png/5163895-200.png"
    }


},
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);

module.exports = User