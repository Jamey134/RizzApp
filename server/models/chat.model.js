const mongoose = require('mongoose');

const ChatSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, "Please provide a title"]
        
    },
    price: {
        type: Number,
        required: [true, "Please provide a price"]
    },
    description: {
        type: String,
        required: [true, "Please provide a description"],
        maxlength: [200, "Description should be under 200 characters"]
        
    }

},
    { timestamps: true }
);

const Chat = mongoose.model('Chat', ChatSchema);

module.exports = Chat