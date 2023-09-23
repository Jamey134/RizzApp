const UserController = require('../controllers/user.controller');

module.exports = app => {
    app.get("/", UserController.registerUser)

    app.post("/login", authUser)

    

}