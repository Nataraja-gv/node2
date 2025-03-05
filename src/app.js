const express = require("express");
const connectDB = require("./config/database")
const authRouter = require("./routes/auth");
const cookieParser = require('cookie-parser')
const profileRoute = require("./routes/profile");
const app = express();


app.use(express.json());
app.use(cookieParser())


app.use("/", authRouter)
app.use("/", profileRoute)


connectDB().then(() => {
    console.log("DataBase connected")
    app.listen(7777, () => { console.log("server  connected successfully") })
}).catch((error) => console.log("Error :" + error))
