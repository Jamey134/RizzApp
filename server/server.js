require('dotenv').config();
require('./config/mongoose.config');
const cors = require('cors');

const express = require('express');
const app = express();
const port = process.env.PORT;

app.use( express.json() ); //Allows app to accept json
app.use( express.urlencoded({ extended: true }) ); //Allows app to read json
app.use(cors())

//connects ther server to the routes section. Therefore, attaching all of the routes.
const routeBridge = require("./routes/chat.routes") 
routeBridge(app)

app.listen(port, () => console.log("---------> SERVER IS ONLINE!!! port = ", port));