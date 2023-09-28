const UserController = require('../controllers/user.controller');
const { registerUser } = require("../controllers/user.controller");


module.exports = app => {
    app.get("/api/user/test", UserController.testTest);
    
    app.post("/api/user", UserController.registerUser);

    app.post("/api/user/login", UserController.authUser);

    app.get("/", UserController.allUsers);
}