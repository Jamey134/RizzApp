// const ChatController = require('../controllers/chat.controller');
const { protect } = require('../middleware/authMiddleware');

module.exports = app => {
    app.post("/api/message", protect, sendMessage)

    //app.get("/api/message/:chatId", protect, allMessages)



};