
const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcrypt");


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    photoUrl: {
        type: String,
        default: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg",
        validate: {
            validator: (value) => validator.isURL(value),
            message: "Photo URL is not valid"
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (value) => validator.isEmail(value),
            message: "Email is not valid"
        }
    },
    phoneNumber: {
        type: String,

        validate: {
            validator: function (value) {
                return !value || validator.isMobilePhone(value, "any");
            },
            message: "Invalid phone number"
        }
    },
    password: {
        type: String,
        required: true,
        validate: {
            validator: (value) => validator.isStrongPassword(value),
            message: "Password must be stronger"
        }
    },
    address: {
        type: String,
        required: true
    }
}, { timestamps: true });


userSchema.methods.getJWT = async function () {
    const user = this;
    const token = await jwt.sign({
        _id: user._id
    }, "ecommerce@123", { expiresIn: "2d" })
    return token
}

userSchema.methods.ValidPassword = async function(password){
    const user = this
    const validpassword =await bcrypt.compare(password,user.password);
    return validpassword;
}

const User = mongoose.model("Users", userSchema);



module.exports = User;
