const validate = require("validator");

const ValidSignUp = (req) => {
    const { name, photoUrl, email, password, address } = req.body
    if (!name || !photoUrl || !email || !password || !address) {
        throw new Error("all fields are required")
    }
    else if (!validate.isEmail(email)) {
        throw new Error("email is invalid")
    }
    else if (!validate.isStrongPassword(password)) {
        throw new Error("password make strong")
    }

}


module.exports = ValidSignUp;