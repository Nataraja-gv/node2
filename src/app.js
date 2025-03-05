const express = require("express");
const connectDB = require("./config/database")
const authRouter = require("./routes/auth")
const app = express();


app.use(express.json());



app.use("/", authRouter)


connectDB().then(() => {
    console.log("DataBase connected")
    app.listen(7777, () => { console.log("server  connected successfully") })
}).catch((error) => console.log("Error :" + error))
