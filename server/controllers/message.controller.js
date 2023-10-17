const asyncHandler = require("express-async-handler");
const Message = require("../models/message.model");
const User = require("../models/user.model");
const Chat = require("../models/chat.model");

module.exports = {
    sendMessage: asyncHandler(async (req, res) => {
        const { content, chatId } = req.body;

        // Correct the conditional check to ensure both content and chatId are missing
        if (!content || !chatId) {
            console.log("Invalid data passed into request");
            return res.status(400).json({ error: "Invalid data passed into the request" });
        }

        var newMessage = {
            sender: req.user._id,
            content: content,
            chat: chatId,
        };

        try {
            var message = await Message.create(newMessage);

            message = await message.populate("sender", "name profilePic");
            message = await message.populate("chat");
            message = await User.populate(message, {
                path: "chat.users",
                select: "name email profilePic",
            });

            await Chat.findByIdAndUpdate(req.body.chatId, {
                latestMessage: message,
            });

            res.json(message);

        } catch (error) {
            // Set the status code and provide an error response
            res.status(400).json({ error: error.message });
        }
    }),
};
