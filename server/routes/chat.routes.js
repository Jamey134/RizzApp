const ChatController = require('../controllers/chat.controller');
const { protect } = require('../middleware/authMiddleware');
const { accessChat } = require("../controllers/chat.controller");

module.exports = app => {
    app.post("/api/chat", protect, ChatController.accessChat),

//     app.get("/api/chat", protect, ChatController.fetchChats),

//     app.post("api/chat/group", protect, ChatController.getGroupChats)

//     app.put("api/chat/renameGroup", protect, ChatController.renameGroup)

//     app.put("api/chat/removeGroup", protect, ChatController.removeFromGroup),

//     app.put("api/chat/addGroup", protect, ChatController.addToGroup)
};




