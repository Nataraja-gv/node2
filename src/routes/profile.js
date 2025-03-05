const express = require("express");
const ValidProfileData = require("../utils/profileValidData");
const UserAuth = require("../middleware/userAuth");
const bcrypt = require("bcrypt")


const profileRoute = express.Router();


profileRoute.patch("/profile/update", UserAuth, async (req, res) => {
    try {
        if (!ValidProfileData(req)) {
            throw new Error("invalid edit field")
        }
        const isAllowed = req.user;
        Object.keys(req.body).forEach(key => (isAllowed[key] = req.body[key]));

        const resdata = await isAllowed.save();
        res.json({ data: resdata })
    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }

})

profileRoute.get("/profile/view", UserAuth, async (req, res) => {
    try {
        const user = req.user;
        if (user) {
            res.json({ data: { user } })

        }

    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }
});

profileRoute.patch("/profile/password", UserAuth, async (req, res) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!oldPassword || !newPassword) {
            throw new Error("old password and new password required")
        };

        const user = req.user;

        if (!user) {
            throw new Error("user invalid")
        };

        const oldvalidPassword = await bcrypt.compare(oldPassword, user.password)
        if (!oldvalidPassword) {
            throw new Error("invalid old password")
        }


        const newpasswordhash = await bcrypt.hash(newPassword, 10);
        user.password = newpasswordhash;
        await user.save();
        res.json({ "message": "new password successfully" })






    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }
})

module.exports = profileRoute