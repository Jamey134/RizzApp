require('dotenv').config();
require('./config/mongoose.config');

const cors = require('cors');
const express = require('express');
const app = express();
const port = process.env.PORT;

const { notFound, errorHandler } = require("../server/middleware/errorMiddleware")


app.use(express.json()); //Allows app to accept json
app.use(express.urlencoded({ extended: true })); //Allows app to read json
app.use(cors())




//connects ther server to the routes section. Therefore, attaching all of the routes.

const routeBridgeUser = require("./routes/user.routes")
routeBridgeUser(app);
const routeBridgeChat = require("./routes/chat.routes")
routeBridgeChat(app);
const routeBridgeMessage = require("./routes/message.routes")
routeBridgeMessage(app);

app.use(notFound);
app.use(errorHandler);

// socket.io setup
const server = app.listen(port, () => console.log("---------> SERVER IS ONLINE!!! port = ", port));

const io = require("socket.io")(server, {
    
    pingTimeout: 60000, // pingTimeout is the amount of time it will wait while being inactive, thus closing the connection to save bandwidth
    cors: {
        origin: "http://localhost:3000",
    },
});

io.on("connection", (socket) => {
    console.log("CONNECTED TO SOCKET.IO");
})