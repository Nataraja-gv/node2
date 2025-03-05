const JWT = require("jsonwebtoken");
const User = require("../models/user");

const UserAuth = async (req, res, next) => {
    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error(" Please Login!!!")
        }

        const decodedobject = await JWT.verify(token, "ecommerce@123");
        const { _id } = decodedobject
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("invalid user")
        }

        req.user = user;
        next()


    }
    catch (error) {
        res.status(400).json({ "message": error.message })
    }
}

module.exports = UserAuth;