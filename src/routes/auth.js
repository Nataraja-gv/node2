const express = require("express");
const authRouter = express.Router();
const ValidSignUp = require("../utils/validateSignup");
const bcrypt = require("bcrypt");
const User = require("../models/user")


authRouter.post("/signup", async (req, res) => {
    try {
        ValidSignUp(req)
        const { name, photoUrl, email, password, address } = req.body;
        const passwordHash = await bcrypt.hash(password, 10);
        const userData = new User(
            {
                name,
                photoUrl,
                email,
                password: passwordHash,
                address
            }
        );
        const user = await userData.save();
        const token = await user.getJWT()
        res.cookie("token", token,);
        return res.json({ data: user });

    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }


})

authRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email: email });
        if (!user) {
            throw new Error("invalid User")
        }

        const isPasswordValid = await user.ValidPassword(password);
        if (!isPasswordValid) {
            throw new Error("invalid password")
        }
        else {
            const token = await user.getJWT()
            res.cookie("token", token,);
            return res.json({ data: user })

        }


    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }

})

module.exports = authRouter
