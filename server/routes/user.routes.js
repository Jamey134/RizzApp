const UserController = require('../controllers/user.controller');
const { registerUser } = require("../controllers/user.controller");


module.exports = app => {
    app.post("/api/user", UserController.registerUser);

    app.post("/api/user/login", UserController.authUser);

    app.get("/api/user/test", UserController.testTest);

}