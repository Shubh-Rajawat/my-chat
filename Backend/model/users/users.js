const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please enter a Username'],
        trim: true,
    },
    email: {
        type: String,
        unique: true,
        match: /\S+@\S+\.\S+/,
        required: [true, "required"],
    },
    password: {
        type: String,
        required: [true, "required"],
    },
    image: {
        type: String,
    },
    status: {
        type: Boolean,
        default: false
    }
}, { timestamps: true })
const User = new mongoose.model('users', userSchema)
module.exports = User;