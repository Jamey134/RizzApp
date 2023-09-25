const UserController = require('../controllers/user.controller');
const { registerUser } = require("../controllers/user.controller");


module.exports = app => {
    //app.route("/").post(registerUser)

    app.post('/api/users', UserController.registerUser);

    
    
    // app.post("/login", authUser)

    

}