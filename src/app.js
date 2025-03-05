const express = require("express");

const app = express();

app.use("/", (req, res) => {
    res.send("welcome")
})

app.listen(7777, () => { console.log("server  connected successfully") })