const Chat = require("../models/chat.model")
const User = require("../models/user.model")
const asyncHandler = require("express-async-handler");




module.exports = {

    //TEST COMMAND
    // testTest: (req, res) => {
    //     res.json({msg: "ITS WORKING!!!"})
    // },

    // function for requesting one chat
    accessChat: asyncHandler(async (req, res) => {
        const { userId } = req.body

        if (!userId) {
            console.log("UserId param not sent with request");
            return res.sendStatus(400);
        }

        var isChat = await Chat.find({
            isGroupChat: false,
            //"$and" makes sure that both of the requests are true.
            $and: [
                { users: { $elemMatch: { $eq: req.user._id } } },
                { users: { $elemMatch: { $eq: userId } } },
            ],
        }).populate("users", "-password")
            .populate("latestMessage")

        isChat = await User.populate(isChat, {
            path: "latestMessage.sender",
            select: "name profilePic email",
        });

        if (isChat.length > 0) {
            res.send(isChat[0]);
        } else {
            var chatData = {
                chatName: "sender",
                isGroupChat: false,
                users: [req.user._id, userId],
            };
            try {
                const createChat = await Chat.create(chatData);

                const FullChat = await Chat.findOne({ _id: createChat._id }).populate("users", "-password");

                res.status(200).send(FullChat);
            } catch (error) {
                res.status(400);
                throw new Error(error.message);
            }
        }
    })
};






