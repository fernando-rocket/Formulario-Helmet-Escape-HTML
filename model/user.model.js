const mongoose = require('mongoose')

const UserSchema = mongoose.Schema(
    {
        name:{
            type: String,
            required: [true, "Please enter product name"]
        },
        password:{
            type: String,
            required: [true, "Please enter product name"]
        },
        birthday:{
            type: String,
            required: true,
            default: 0
        }
    },
    {
        timestamps: true
    }
)

const User = mongoose.model("User", UserSchema)

module.exports = User